const xc = 34, kc = 10;
function Qi(e, t = 24) {
  const i = new Map(e.map((s) => [s.id, { x: s.x, y: s.y }]));
  for (let s = 0; s < 80; s++) {
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
  const n = /* @__PURE__ */ new Map();
  for (const s of e) {
    const o = i.get(s.id);
    (Math.abs(o.x - s.x) > 0.5 || Math.abs(o.y - s.y) > 0.5) && n.set(s.id, o);
  }
  return n;
}
function oo(e, t = { w: 160, h: 90 }) {
  let i = t.w, n = t.h;
  for (const s of e)
    i = Math.max(i, 2 * (Math.abs(s.dx) + s.w / 2 + 10)), n = Math.max(
      n,
      2 * (34 + s.h / 2 - s.dy),
      // child's top edge below the header band
      2 * (10 + s.h / 2 + s.dy)
      // child's bottom edge above the inset
    );
  return { w: i, h: n };
}
function zi(e, t, i) {
  let n = t.w / 2, s = t.w / 2, o = t.h / 2, a = t.h / 2;
  for (const d of i)
    n = Math.max(n, -d.dx + d.w / 2 + 10), s = Math.max(s, d.dx + d.w / 2 + 10), o = Math.max(o, -d.dy + d.h / 2 + 34), a = Math.max(a, d.dy + d.h / 2 + 10);
  return {
    x: e.x + (s - n) / 2,
    y: e.y + (a - o) / 2,
    w: n + s,
    h: o + a
  };
}
function Jt(e) {
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
  const n = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", s = e ? n : t;
  return { form: s, collapsed: un[e ? t : n] > un[s] };
}
function ss(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.moduleId === t && i.has(n.apiId)).map((n) => ({
    id: it(n.apiId, n.moduleId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
const os = 34, as = 14, co = 14, Pe = 108, Te = 32, rs = 12, ds = 10, zt = 2, po = zt * Pe + (zt - 1) * rs + 2 * as;
function uo(e, t) {
  return `rel:${e}->${t}`;
}
function mo(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function St(e, t) {
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
  const t = Math.max(1, Math.ceil(e / zt)), i = t * Te + (t - 1) * ds;
  return { w: po, h: os + i + co };
}
function ri(e, t) {
  const i = e % zt, n = Math.floor(e / zt);
  return {
    x: -t.w / 2 + as + i * (Pe + rs) + Pe / 2,
    y: -t.h / 2 + os + n * (Te + ds) + Te / 2
  };
}
function fo(e, t, i, n, s, o, a = !1) {
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
    return [{ ...n, x: i.x, y: i.y, w: je, h: Ye }];
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
      return cs(i, n, g, m, s, o);
    }
  }
  return Tt(i, n, c, s, o);
}
function cs(e, t, i, n, s, o, a = /* @__PURE__ */ new Set()) {
  const d = o[t.id] ?? qi(i.length + n.length), c = i.map((h, r) => {
    const u = s[h.id] ?? ri(r, d), f = a.has(h.id) ? [] : h.ops, k = o[h.id] ?? qi(f.length), A = f.map((T, x) => s[T.id] ?? ri(x, k)), R = zi(
      { x: u.x, y: u.y },
      k,
      A.map((T) => ({ dx: T.x, dy: T.y, w: Pe, h: Te }))
    );
    return { a: h, off: u, ops: f, opOffs: A, fit: R };
  }), p = n.map(
    (h, r) => s[h.id] ?? ri(i.length + r, d)
  ), g = Qi(
    [
      ...c.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...n.map((h, r) => ({
        id: h.id,
        x: p[r].x,
        y: p[r].y,
        w: Pe,
        h: Te
      }))
    ],
    24
  );
  for (const h of c) {
    const r = g.get(h.a.id);
    r && (h.off = { x: h.off.x + (r.x - h.fit.x), y: h.off.y + (r.y - h.fit.y) }, h.fit = { ...h.fit, x: r.x, y: r.y });
  }
  n.forEach((h, r) => {
    const u = g.get(h.id);
    u && (p[r] = { x: u.x, y: u.y });
  });
  const m = zi(e, d, [
    ...c.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...p.map((h) => ({ dx: h.x, dy: h.y, w: Pe, h: Te }))
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
        h: Te,
        tooltip: `${Ui[h.a.opKind]}: ${r.name}`
      });
    });
  return n.forEach((h, r) => {
    const u = ls[h.kind];
    y.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + p[r].x,
      y: e.y + p[r].y,
      w: Pe,
      h: Te,
      symbol: u.symbol,
      fill: u.fill,
      stroke: u.stroke,
      parentId: t.id,
      tooltip: `${Ui[h.kind]} ${h.name}`
    });
  }), y;
}
function Tt(e, t, i, n, s) {
  const o = s[t.id] ?? qi(i.length), a = i.map((m, y) => n[m.id] ?? ri(y, o)), d = Qi(
    i.map((m, y) => ({ id: m.id, x: a[y].x, y: a[y].y, w: Pe, h: Te })),
    10
  );
  i.forEach((m, y) => {
    const h = d.get(m.id);
    h && (a[y] = { x: h.x, y: h.y });
  });
  const c = zi(
    e,
    o,
    a.map((m) => ({ dx: m.x, dy: m.y, w: Pe, h: Te }))
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
      h: Te,
      symbol: r.symbol,
      fill: r.fill,
      stroke: r.stroke,
      parentId: t.id,
      tooltip: `${m.policy ? "Policy" : Ui[m.kind]} ${m.name}`
    };
  });
  return [p, ...g];
}
function go(e, t, i = "contexts", n = {}, s = /* @__PURE__ */ new Set()) {
  const o = s, a = i !== "contexts", d = i === "operations", c = new Set(e.externalSystems.map((l) => l.id)), p = (e.apis ?? []).filter(
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
  ], r = h.flatMap((l, O) => {
    const H = t[l.ref.id] ?? St(O, h.length);
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
        const qe = (e.apis ?? []).find((ht) => ht.id === j.targetApiId), Fe = (qe == null ? void 0 : qe.operations) ?? [];
        if (Fe.length > 0)
          return Tt(
            H,
            de,
            Fe.map((ht) => ({
              id: tt(ht.id, j.id),
              name: ht.name,
              kind: "api-op-occurrence"
            })),
            t,
            n
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
      return (s.has(j.id) ? !a : a) && j.operations.length > 0 ? Tt(
        H,
        { ...de, collapsible: !0, collapsed: !1 },
        j.operations.map(
          (Fe) => ({ id: Fe.id, name: Fe.name, kind: "api-operation" })
        ),
        t,
        n
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
      }, qe = p.filter((pe) => pe.publishedByExternalSystemId === j.id), Fe = m.filter((pe) => pe.publishedByExternalSystemId === j.id), ht = Fe.map(
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
      ], Ei = qe.length > 0 || Fe.length > 0, Si = Ei || $i.length > 0, { form: Qt, collapsed: Ci } = mn(
        s.has(j.id),
        a ? "full" : Ei ? "coarse" : "compact",
        $i.length > 0 || d && Ei
      ), cn = [
        ...ht,
        ...Qt === "full" ? $i : []
      ], Ai = d && Qt === "full" ? Fe.filter((pe) => {
        const $t = pe.targetApiId ? (e.apis ?? []).find((ye) => ye.id === pe.targetApiId) : void 0;
        return (($t == null ? void 0 : $t.operations) ?? []).length > 0;
      }) : [];
      if (d && Qt === "full" && (qe.length > 0 || Ai.length > 0)) {
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
            ops: (ye.operations ?? []).map((Et) => ({ id: Et.id, name: Et.name }))
          })),
          ...Ai.map((ye) => {
            const Et = (e.apis ?? []).find((Zt) => Zt.id === ye.targetApiId);
            return {
              id: ye.id,
              name: ye.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${ye.name} — proxy/cache de ${Et.name}`,
              opKind: "api-op-occurrence",
              ops: (Et.operations ?? []).map((Zt) => ({
                id: tt(Zt.id, ye.id),
                name: Zt.name
              }))
            };
          })
        ], $t = new Set(Ai.map((ye) => ye.id));
        return cs(
          H,
          { ...de, collapsible: !0, collapsed: Ci },
          pe,
          cn.filter((ye) => !$t.has(ye.id)),
          t,
          n,
          o
        );
      }
      const pn = Qt === "compact" ? [] : [
        ...qe.map((pe) => ({ id: pe.id, name: pe.name, kind: "api" })),
        ...cn
      ];
      return pn.length > 0 ? Tt(
        H,
        { ...de, collapsible: Si, collapsed: Ci },
        pn,
        t,
        n
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
    }, Me = ss(e, Z.id), kt = (e.aggregates ?? []).some((j) => j.moduleId === Z.id) || (Z.useCases ?? []).length > 0 || (Z.domainEvents ?? []).length > 0 || (Z.applicationEvents ?? []).length > 0 || (Z.readModels ?? []).length > 0 || (Z.domainServices ?? []).length > 0 || (Z.queryServices ?? []).length > 0 || (Z.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((j) => j.ownerModuleId === Z.id) || (e.notifications ?? []).some((j) => j.ownerModuleId === Z.id) || (e.documents ?? []).some((j) => j.ownerModuleId === Z.id), Ze = kt || Me.length > 0, { form: _t, collapsed: mt } = mn(
      s.has(Z.id),
      a ? "full" : Me.length > 0 ? "coarse" : "compact",
      kt
    );
    return _t === "full" && Ze ? fo(
      e,
      Z,
      H,
      { ...ce, collapsible: !0, collapsed: mt },
      t,
      n,
      d
    ) : _t === "coarse" && Me.length > 0 ? Tt(
      H,
      { ...ce, collapsible: Ze, collapsed: mt },
      Me,
      t,
      n
    ) : [{
      ...ce,
      collapsible: Ze,
      collapsed: Ze && mt,
      x: H.x,
      y: H.y,
      w: je,
      h: Ye
    }];
  }), u = h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((l, O) => {
    const H = t[l.id] ?? St(h.length + O, u);
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
  }), (e.aiAgents ?? []).forEach((l, O) => {
    const H = t[l.id] ?? St(h.length + (e.actors ?? []).length + O, u);
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
  }), (e.mcpGateways ?? []).forEach((l, O) => {
    const H = t[l.id] ?? St(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + O,
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
  (e.rags ?? []).forEach((l, O) => {
    const H = t[l.id] ?? St(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + O,
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
  }), r.sort((l, O) => (l.parentId ? 1 : 0) - (O.parentId ? 1 : 0));
  const k = e.relations.map((l) => ({
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
    var Me, kt, Ze, _t, mt, j;
    const O = mo(e, l), H = a ? e.modules.find((de) => de.id === l.sourceId) : void 0, Z = ((Me = H == null ? void 0 : H.domainEvents) == null ? void 0 : Me.find((de) => de.name === l.triggerEvent)) ?? ((kt = H == null ? void 0 : H.applicationEvents) == null ? void 0 : kt.find((de) => de.name === l.triggerEvent)), K = a && l.readModelName ? (_t = (Ze = e.modules.find((de) => de.id === l.targetId)) == null ? void 0 : Ze.readModels) == null ? void 0 : _t.find((de) => de.name === l.readModelName) : void 0, ce = a && l.targetUseCaseId ? (j = (mt = e.modules.find((de) => de.id === l.targetId)) == null ? void 0 : mt.useCases) == null ? void 0 : j.find((de) => de.id === l.targetUseCaseId) : void 0;
    return {
      id: `flow:${l.id}`,
      sourceId: (Z == null ? void 0 : Z.id) ?? l.sourceId,
      targetId: (ce == null ? void 0 : ce.id) ?? (K == null ? void 0 : K.id) ?? l.targetId,
      kind: "flow",
      label: l.name,
      color: lo[O],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${l.name} [${l.archetype}] — ${O}`
    };
  }), R = new Map((e.apis ?? []).map((l) => [l.id, l])), T = new Set(e.modules.map((l) => l.id)), x = (e.apiImplementations ?? []).filter(
    (l) => R.has(l.apiId) && T.has(l.moduleId)
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
  })).filter(({ p: l, source: O }) => O && l.readModelId).filter(({ p: l, source: O }) => w.has(O) && w.has(l.readModelId)).map(({ p: l, source: O }) => ({
    id: `proj:${l.id}`,
    sourceId: O,
    targetId: l.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: l.sourceAggregateId ? `Proyección ${l.name}: el estado del agregado se materializa en ${l.readModelName ?? l.readModelId}` : `Proyección ${l.name}: polling hacia ${l.readModelName ?? l.readModelId}`
  })) : [], D = (e.apis ?? []).flatMap(
    (l) => l.operations.flatMap((O) => {
      const H = a && O.targetUseCaseId && w.has(O.targetUseCaseId) ? O.targetUseCaseId : O.targetModuleId && w.has(O.targetModuleId) ? O.targetModuleId : (O.targetUseCaseId && !a, null);
      if (!H) return [];
      const Z = a && w.has(O.id) ? O.id : l.id;
      return w.has(Z) ? [
        {
          id: `apiwire:${O.id}`,
          sourceId: Z,
          targetId: H,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${O.name} la implementa ${H}`
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
      const O = w.has(l.id) ? l.id : l.ownerModuleId && w.has(l.ownerModuleId) ? l.ownerModuleId : null;
      return O ? [{
        id: `idpsvc:${l.id}`,
        sourceId: O,
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
  })), b = new Map([
    ...(e.apis ?? []).filter((l) => l.publishedByExternalSystemId).map((l) => [l.id, l.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((l) => l.publishedByExternalSystemId).map((l) => [l.id, l.publishedByExternalSystemId])
  ]), _ = (l) => w.has(l) ? l : b.get(l) ?? l, $ = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((l) => ({
        sourceId: l.sourceId,
        targetId: _(l.targetId),
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
    for (const O of l.useCases ?? []) M.set(O.id, l.id);
    for (const O of l.domainEvents ?? []) M.set(O.id, l.id);
    for (const O of l.applicationEvents ?? []) M.set(O.id, l.id);
    for (const O of l.queryServices ?? []) M.set(O.id, l.id);
  }
  const C = (l) => w.has(l) ? l : M.get(l) ?? l, N = /* @__PURE__ */ new Map();
  for (const l of e.modules) {
    for (const O of l.domainEvents ?? []) N.set(O.name, O.id);
    for (const O of l.applicationEvents ?? []) N.set(O.name, O.id);
  }
  const B = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (l) => (l.steps ?? []).filter((O) => O.targetUseCaseId).map((O) => ({ sourceId: l.id, targetId: C(O.targetUseCaseId) }))
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
      (e.workflows ?? []).filter((l) => l.triggerEvent && N.has(l.triggerEvent)).map((l) => ({
        sourceId: C(N.get(l.triggerEvent)),
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
    for (const O of l.tables ?? []) re.set(O.id, l.id);
  const oe = (e.notifications ?? []).flatMap((l) => {
    var Z;
    const O = w.has(l.id) ? l.id : l.ownerModuleId && w.has(l.ownerModuleId) ? l.ownerModuleId : null;
    if (!O) return [];
    const H = [];
    if (l.eventId) {
      const K = w.has(l.eventId) ? l.eventId : M.get(l.eventId);
      K && w.has(K) && K !== O && H.push({
        id: `notif:${l.id}`,
        sourceId: K,
        targetId: O,
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
        sourceId: O,
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
    const O = w.has(l.id) ? l.id : l.ownerModuleId && w.has(l.ownerModuleId) ? l.ownerModuleId : null;
    if (!O || !l.queryServiceId) return [];
    const H = w.has(l.queryServiceId) ? l.queryServiceId : M.get(l.queryServiceId);
    return !H || !w.has(H) || H === O ? [] : [{
      id: `docq:${l.id}`,
      sourceId: H,
      targetId: O,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${l.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), X = (e.etlFlows ?? []).flatMap(
    (l) => (l.steps ?? []).flatMap((O) => {
      const H = w.has(l.id) ? l.id : l.ownerModuleId && w.has(l.ownerModuleId) ? l.ownerModuleId : null;
      if (!H) return [];
      const Z = O.externalTableId ?? O.operationId ?? O.apiId ?? O.eventId;
      if (!Z) return [];
      let K = Z;
      if (!w.has(K) && O.operationId && O.apiId && (K = O.apiId), !w.has(K) && O.externalTableId && (K = re.get(O.externalTableId) ?? K), w.has(K) || (K = _(K)), w.has(K) || (K = M.get(Z) ?? K), !w.has(K) || K === H) return [];
      const ce = O.type.startsWith("SOURCE");
      return [{
        id: `etl:${l.id}:${O.id}`,
        sourceId: ce ? K : H,
        targetId: ce ? H : K,
        kind: ce ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: O.type === "SOURCE_PULL" ? "pull" : O.type === "SOURCE_CONSUMER" ? "consume" : O.type === "WRITE_API" ? "api" : O.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: ce ? `${l.name} lee de aquí (${O.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${l.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), W = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (l) => (l.sourceExternalTableIds ?? []).map((O) => ({
          sourceId: w.has(O) ? O : re.get(O) ?? O,
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
        (l) => (l.sourceApiIds ?? []).map((O) => ({
          sourceId: _(O),
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
  ], be = [
    ...new Map(
      (e.rags ?? []).flatMap((l) => [
        ...(l.sourceExternalSystemIds ?? []).map((O) => ({ sourceId: O, targetId: l.id, name: l.name })),
        ...(l.sourceModuleIds ?? []).map((O) => ({ sourceId: O, targetId: l.id, name: l.name }))
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
  ], xe = [
    ...new Map(
      (e.agentApiUses ?? []).map((l) => ({ sourceId: l.agentId, targetId: _(l.apiId) })).filter((l) => w.has(l.sourceId) && w.has(l.targetId)).map((l) => [
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
    (l) => l.triggerEvent ? (e.workflows ?? []).filter((O) => O.id !== l.id && Ae(O) === l.triggerEvent).filter((O) => w.has(O.id) && w.has(l.id)).map((O) => ({
      id: `wfchain:${O.id}->${l.id}`,
      sourceId: O.id,
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
      (e.proxyApis ?? []).filter((l) => l.targetApiId).map((l) => ({ sourceId: _(l.id), targetId: _(l.targetApiId) })).filter(
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
  ], Kt = x.flatMap((l) => {
    const O = it(l.apiId, l.moduleId);
    if (!w.has(O)) return [];
    const H = [];
    for (const Z of (e.proxyApis ?? []).filter((K) => K.targetApiId === l.apiId)) {
      const K = _(Z.id);
      w.has(K) && K !== O && H.push({
        id: `pxr:${K}->${O}`,
        sourceId: K,
        targetId: O,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return H;
  }), ut = (e.proxyOperationRoutes ?? []).flatMap((l) => {
    const O = (e.proxyApis ?? []).find((K) => K.id === l.proxyId);
    if (!(O != null && O.targetApiId)) return [];
    const H = tt(l.operationId, l.proxyId), Z = l.targetSiteId === O.targetApiId ? O.targetApiId : it(O.targetApiId, l.targetSiteId);
    return !w.has(H) || !w.has(Z) ? [] : [{
      id: `oproute:${H}->${Z}`,
      sourceId: H,
      targetId: Z,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Xt = [
    ...new Map(
      (e.externalOperationUses ?? []).map((l) => {
        if (!w.has(l.externalSystemId)) return null;
        const O = (e.apis ?? []).find(
          (ce) => ce.operations.some((Me) => Me.id === l.operationId)
        );
        if (!O) return null;
        const H = l.siteId === O.id, Z = H ? l.operationId : tt(l.operationId, l.siteId);
        let K = w.has(Z) ? Z : null;
        if (!K)
          if (H || (e.proxyApis ?? []).some((ce) => ce.id === l.siteId))
            K = _(l.siteId);
          else {
            const ce = it(O.id, l.siteId);
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
    const O = w.has(tt(l.operationId, l.moduleId)) ? tt(l.operationId, l.moduleId) : w.has(it(l.apiId, l.moduleId)) ? it(l.apiId, l.moduleId) : w.has(_(l.moduleId)) ? _(l.moduleId) : null;
    return O ? [{
      id: `apiimplwire:${l.operationId}@${l.moduleId}`,
      sourceId: O,
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
    (l) => (l.sourceReadModelIds ?? []).filter((O) => w.has(O)).map((O) => ({
      id: `ragsrc:${l.id}->${O}`,
      sourceId: l.id,
      targetId: O,
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
    ].filter((O) => w.has(l.id) && w.has(O)).map((O) => ({
      id: `gwx:${l.id}->${O}`,
      sourceId: l.id,
      targetId: O,
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
      ...k,
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
      ...Kt,
      ...ut,
      ...Xt,
      ...Hs,
      ...B,
      ...V,
      ...we,
      ...xe,
      ...W,
      ...te,
      ...be,
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
}, yo = 176, vo = 60, wo = 140, bo = 40;
function xo(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const a = 220 + o * 340;
    i.filter((c) => c.moduleId === s.id).forEach((c, p) => {
      const g = n.filter((y) => y.aggregateId === c.id).length, m = 140 + p * (170 + g * 60);
      t[c.id] = { x: a, y: m }, n.filter((y) => y.aggregateId === c.id).forEach((y, h) => {
        t[y.id] = { x: a + 60, y: m + 100 + h * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function ko(e, t) {
  const i = xo(e), n = (p) => t[p] ?? i[p] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((p) => [p.id, p])), o = (e.aggregates ?? []).map((p) => {
    const g = s.get(p.moduleId), m = (g == null ? void 0 : g.subdomainType) ?? "GENERIC", y = n(p.id);
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
    const g = n(p.id);
    return {
      id: p.id,
      label: p.name,
      x: g.x,
      y: g.y,
      w: wo,
      h: bo,
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
const _o = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, $o = 150, Eo = 44, So = 190, Co = 56, Ao = 160, Mo = 48;
function Po(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function To(e, t) {
  const i = e.flows, n = [], s = [], o = /* @__PURE__ */ new Set(), a = (d) => {
    var c, p;
    return ((p = (c = e.aggregates) == null ? void 0 : c.find((g) => g.id === d)) == null ? void 0 : p.name) ?? d ?? "?";
  };
  return i.forEach((d, c) => {
    const p = 120 + c * 130, g = _o[d.archetype] ?? "#475569", m = d.triggerAggregateId ?? d.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const f = t[m] ?? { x: 160, y: p };
      n.push({
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
    n.push({
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
      n.push({
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
    s.push({
      id: `fe:${d.id}:in`,
      sourceId: m,
      targetId: y,
      kind: "flow-trigger",
      label: d.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: d.triggerEvent ? `Evento: ${d.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${d.id}:out`,
      sourceId: y,
      targetId: u,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const Oo = 190, Ro = 56, Mi = 170, No = 52;
function hn(e, t) {
  const i = [], n = [], s = (o) => {
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
      w: Oo,
      h: Ro,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
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
        h: No,
        kind: "process-step",
        symbol: y ? "person" : "gear",
        fill: y ? "#fef3c7" : "#ffffff",
        stroke: y ? "#d97706" : "#64748b",
        badge: y ? `HUMAN${g.roleId ? ` · ${g.roleId}` : ""}${g.deadline ? ` · ⏱ ${g.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${g.name}${g.useCaseId ? ` — use case ${g.useCaseId}` : ""}${g.deadline ? ` · deadline ${g.deadline}` : ""}`
      }), n.push({
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
        }), n.push({
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
      }), n.push({
        id: `pd:${o.id}`,
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
const di = globalThis, Zi = di.ShadowRoot && (di.ShadyCSS === void 0 || di.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ji = Symbol(), fn = /* @__PURE__ */ new WeakMap();
let ps = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Ji) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Zi && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = fn.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && fn.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Do = (e) => new ps(typeof e == "string" ? e : e + "", void 0, Ji), ct = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new ps(i, e, Ji);
}, Lo = (e, t) => {
  if (Zi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = di.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, gn = Zi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Do(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: zo, defineProperty: Uo, getOwnPropertyDescriptor: qo, getOwnPropertyNames: Fo, getOwnPropertySymbols: Bo, getPrototypeOf: Wo } = Object, Qe = globalThis, In = Qe.trustedTypes, Ho = In ? In.emptyScript : "", Pi = Qe.reactiveElementPolyfillSupport, Nt = (e, t) => e, mi = { toAttribute(e, t) {
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
} }, en = (e, t) => !zo(e, t), yn = { attribute: !0, type: String, converter: mi, reflect: !1, useDefault: !1, hasChanged: en };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Qe.litPropertyMetadata ?? (Qe.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let gt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = yn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && Uo(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = qo(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: s, set(a) {
      const d = s == null ? void 0 : s.call(this);
      o == null || o.call(this, a), this.requestUpdate(t, d, n);
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
      const i = this.properties, n = [...Fo(i), ...Bo(i)];
      for (const s of n) this.createProperty(s, i[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, s] of i) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const s = this._$Eu(i, n);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n) i.unshift(gn(s));
    } else t !== void 0 && i.push(gn(t));
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
    return Lo(t, this.constructor.elementStyles), t;
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
    var o;
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const a = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : mi).toAttribute(i, n.type);
      this._$Em = t, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, a;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const d = n.getPropertyOptions(s), c = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((o = d.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? d.converter : mi;
      this._$Em = s;
      const p = c.fromAttribute(i, d.type);
      this[s] = p ?? ((a = this._$Ej) == null ? void 0 : a.get(s)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    var a;
    if (t !== void 0) {
      const d = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = d.getPropertyOptions(t)), !((n.hasChanged ?? en)(o, i) || n.useDefault && n.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(d._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: s, wrapped: o }, a) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? i ?? this[t]), o !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, a] of s) {
        const { wrapped: d } = a, c = this[o];
        d !== !0 || this._$AL.has(o) || c === void 0 || this.C(o, void 0, a, c);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (n = this._$EO) == null || n.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(i)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i;
    (i = this._$EO) == null || i.forEach((n) => {
      var s;
      return (s = n.hostUpdated) == null ? void 0 : s.call(n);
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
gt.elementStyles = [], gt.shadowRootOptions = { mode: "open" }, gt[Nt("elementProperties")] = /* @__PURE__ */ new Map(), gt[Nt("finalized")] = /* @__PURE__ */ new Map(), Pi == null || Pi({ ReactiveElement: gt }), (Qe.reactiveElementVersions ?? (Qe.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = globalThis, vn = (e) => e, hi = Dt.trustedTypes, wn = hi ? hi.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, us = "$lit$", Xe = `lit$${Math.random().toFixed(9).slice(2)}$`, ms = "?" + Xe, Vo = `<${ms}>`, rt = document, Ut = () => rt.createComment(""), qt = (e) => e === null || typeof e != "object" && typeof e != "function", tn = Array.isArray, Go = (e) => tn(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Ti = `[ 	
\f\r]`, Ct = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, bn = /-->/g, xn = />/g, Je = RegExp(`>|${Ti}(?:([^\\s"'>=/]+)(${Ti}*=${Ti}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), kn = /'/g, _n = /"/g, hs = /^(?:script|style|textarea|title)$/i, fs = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), E = fs(1), J = fs(2), vt = Symbol.for("lit-noChange"), ie = Symbol.for("lit-nothing"), $n = /* @__PURE__ */ new WeakMap(), nt = rt.createTreeWalker(rt, 129);
function gs(e, t) {
  if (!tn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return wn !== void 0 ? wn.createHTML(t) : t;
}
const jo = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Ct;
  for (let d = 0; d < i; d++) {
    const c = e[d];
    let p, g, m = -1, y = 0;
    for (; y < c.length && (a.lastIndex = y, g = a.exec(c), g !== null); ) y = a.lastIndex, a === Ct ? g[1] === "!--" ? a = bn : g[1] !== void 0 ? a = xn : g[2] !== void 0 ? (hs.test(g[2]) && (s = RegExp("</" + g[2], "g")), a = Je) : g[3] !== void 0 && (a = Je) : a === Je ? g[0] === ">" ? (a = s ?? Ct, m = -1) : g[1] === void 0 ? m = -2 : (m = a.lastIndex - g[2].length, p = g[1], a = g[3] === void 0 ? Je : g[3] === '"' ? _n : kn) : a === _n || a === kn ? a = Je : a === bn || a === xn ? a = Ct : (a = Je, s = void 0);
    const h = a === Je && e[d + 1].startsWith("/>") ? " " : "";
    o += a === Ct ? c + Vo : m >= 0 ? (n.push(p), c.slice(0, m) + us + c.slice(m) + Xe + h) : c + Xe + (m === -2 ? d : h);
  }
  return [gs(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Ft {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, a = 0;
    const d = t.length - 1, c = this.parts, [p, g] = jo(t, i);
    if (this.el = Ft.createElement(p, n), nt.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = nt.nextNode()) !== null && c.length < d; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(us)) {
          const y = g[a++], h = s.getAttribute(m).split(Xe), r = /([.?@])?(.*)/.exec(y);
          c.push({ type: 1, index: o, name: r[2], strings: h, ctor: r[1] === "." ? Ko : r[1] === "?" ? Xo : r[1] === "@" ? Qo : bi }), s.removeAttribute(m);
        } else m.startsWith(Xe) && (c.push({ type: 6, index: o }), s.removeAttribute(m));
        if (hs.test(s.tagName)) {
          const m = s.textContent.split(Xe), y = m.length - 1;
          if (y > 0) {
            s.textContent = hi ? hi.emptyScript : "";
            for (let h = 0; h < y; h++) s.append(m[h], Ut()), nt.nextNode(), c.push({ type: 2, index: ++o });
            s.append(m[y], Ut());
          }
        }
      } else if (s.nodeType === 8) if (s.data === ms) c.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(Xe, m + 1)) !== -1; ) c.push({ type: 7, index: o }), m += Xe.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = rt.createElement("template");
    return n.innerHTML = t, n;
  }
}
function wt(e, t, i = e, n) {
  var a, d;
  if (t === vt) return t;
  let s = n !== void 0 ? (a = i._$Co) == null ? void 0 : a[n] : i._$Cl;
  const o = qt(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((d = s == null ? void 0 : s._$AO) == null || d.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = wt(e, s._$AS(e, t.values), s, n)), t;
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? rt).importNode(i, !0);
    nt.currentNode = s;
    let o = nt.nextNode(), a = 0, d = 0, c = n[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let p;
        c.type === 2 ? p = new Gt(o, o.nextSibling, this, t) : c.type === 1 ? p = new c.ctor(o, c.name, c.strings, this, t) : c.type === 6 && (p = new Zo(o, this, t)), this._$AV.push(p), c = n[++d];
      }
      a !== (c == null ? void 0 : c.index) && (o = nt.nextNode(), a++);
    }
    return nt.currentNode = rt, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Gt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = ie, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = wt(this, t, i), qt(t) ? t === ie || t == null || t === "" ? (this._$AH !== ie && this._$AR(), this._$AH = ie) : t !== this._$AH && t !== vt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Go(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== ie && qt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(rt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Ft.createElement(gs(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(i);
    else {
      const a = new Yo(s, this), d = a.u(this.options);
      a.p(i), this.T(d), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = $n.get(t.strings);
    return i === void 0 && $n.set(t.strings, i = new Ft(t)), i;
  }
  k(t) {
    tn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new Gt(this.O(Ut()), this.O(Ut()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = vn(t).nextSibling;
      vn(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class bi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, o) {
    this.type = 1, this._$AH = ie, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = ie;
  }
  _$AI(t, i = this, n, s) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = wt(this, t, i, 0), a = !qt(t) || t !== this._$AH && t !== vt, a && (this._$AH = t);
    else {
      const d = t;
      let c, p;
      for (t = o[0], c = 0; c < o.length - 1; c++) p = wt(this, d[n + c], i, c), p === vt && (p = this._$AH[c]), a || (a = !qt(p) || p !== this._$AH[c]), p === ie ? t = ie : t !== ie && (t += (p ?? "") + o[c + 1]), this._$AH[c] = p;
    }
    a && !s && this.j(t);
  }
  j(t) {
    t === ie ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ko extends bi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === ie ? void 0 : t;
  }
}
class Xo extends bi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== ie);
  }
}
class Qo extends bi {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = wt(this, t, i, 0) ?? ie) === vt) return;
    const n = this._$AH, s = t === ie && n !== ie || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== ie && (n === ie || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Zo {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    wt(this, t);
  }
}
const Oi = Dt.litHtmlPolyfillSupport;
Oi == null || Oi(Ft, Gt), (Dt.litHtmlVersions ?? (Dt.litHtmlVersions = [])).push("3.3.3");
const Jo = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new Gt(t.insertBefore(Ut(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ot = globalThis;
class Ne extends gt {
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
    return vt;
  }
}
var ns;
Ne._$litElement$ = !0, Ne.finalized = !0, (ns = ot.litElementHydrateSupport) == null || ns.call(ot, { LitElement: Ne });
const Ri = ot.litElementPolyfillSupport;
Ri == null || Ri({ LitElement: Ne });
(ot.litElementVersions ?? (ot.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ea = { attribute: !0, type: String, converter: mi, reflect: !1, hasChanged: en }, ta = (e = ea, t, i) => {
  const { kind: n, metadata: s } = i;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), n === "accessor") {
    const { name: a } = i;
    return { set(d) {
      const c = t.get.call(this);
      t.set.call(this, d), this.requestUpdate(a, c, e, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(a, void 0, e, d), d;
    } };
  }
  if (n === "setter") {
    const { name: a } = i;
    return function(d) {
      const c = this[a];
      t.call(this, d), this.requestUpdate(a, c, e, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function se(e) {
  return (t, i) => typeof i == "object" ? ta(e, t, i) : ((n, s, o) => {
    const a = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), a ? Object.getOwnPropertyDescriptor(s, o) : void 0;
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
function xi(e) {
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
  var t = xi(e);
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
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], a = o.length, d = n[s] = new Array(a), c, p, g = 0; g < a; ++g)
      (c = o[g]) && (p = e.call(c, c.__data__, g, o)) && ("__data__" in c && (p.__data__ = c.__data__), d[g] = p);
  return new Ee(n, this._parents);
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
  for (var t = this._groups, i = t.length, n = [], s = [], o = 0; o < i; ++o)
    for (var a = t[o], d = a.length, c, p = 0; p < d; ++p)
      (c = a[p]) && (n.push(e.call(c, c.__data__, p, a)), s.push(c));
  return new Ee(n, s);
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
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], a = o.length, d = n[s] = [], c, p = 0; p < a; ++p)
      (c = o[p]) && e.call(c, c.__data__, p, o) && d.push(c);
  return new Ee(n, this._parents);
}
function bs(e) {
  return new Array(e.length);
}
function va() {
  return new Ee(this._enter || this._groups.map(bs), this._parents);
}
function fi(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
fi.prototype = {
  constructor: fi,
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
function ba(e, t, i, n, s, o) {
  for (var a = 0, d, c = t.length, p = o.length; a < p; ++a)
    (d = t[a]) ? (d.__data__ = o[a], n[a] = d) : i[a] = new fi(e, o[a]);
  for (; a < c; ++a)
    (d = t[a]) && (s[a] = d);
}
function xa(e, t, i, n, s, o, a) {
  var d, c, p = /* @__PURE__ */ new Map(), g = t.length, m = o.length, y = new Array(g), h;
  for (d = 0; d < g; ++d)
    (c = t[d]) && (y[d] = h = a.call(c, c.__data__, d, t) + "", p.has(h) ? s[d] = c : p.set(h, c));
  for (d = 0; d < m; ++d)
    h = a.call(e, o[d], d, o) + "", (c = p.get(h)) ? (n[d] = c, c.__data__ = o[d], p.delete(h)) : i[d] = new fi(e, o[d]);
  for (d = 0; d < g; ++d)
    (c = t[d]) && p.get(y[d]) === c && (s[d] = c);
}
function ka(e) {
  return e.__data__;
}
function _a(e, t) {
  if (!arguments.length) return Array.from(this, ka);
  var i = t ? xa : ba, n = this._parents, s = this._groups;
  typeof e != "function" && (e = wa(e));
  for (var o = s.length, a = new Array(o), d = new Array(o), c = new Array(o), p = 0; p < o; ++p) {
    var g = n[p], m = s[p], y = m.length, h = $a(e.call(g, g && g.__data__, p, n)), r = h.length, u = d[p] = new Array(r), f = a[p] = new Array(r), k = c[p] = new Array(y);
    i(g, m, u, f, k, h, t);
    for (var A = 0, R = 0, T, x; A < r; ++A)
      if (T = u[A]) {
        for (A >= R && (R = A + 1); !(x = f[R]) && ++R < r; ) ;
        T._next = x || null;
      }
  }
  return a = new Ee(a, n), a._enter = d, a._exit = c, a;
}
function $a(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ea() {
  return new Ee(this._exit || this._groups.map(bs), this._parents);
}
function Sa(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function Ca(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, a = Math.min(s, o), d = new Array(s), c = 0; c < a; ++c)
    for (var p = i[c], g = n[c], m = p.length, y = d[c] = new Array(m), h, r = 0; r < m; ++r)
      (h = p[r] || g[r]) && (y[r] = h);
  for (; c < s; ++c)
    d[c] = i[c];
  return new Ee(d, this._parents);
}
function Aa() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], a; --s >= 0; )
      (a = n[s]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function Ma(e) {
  e || (e = Pa);
  function t(m, y) {
    return m && y ? e(m.__data__, y.__data__) : !m - !y;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var a = i[o], d = a.length, c = s[o] = new Array(d), p, g = 0; g < d; ++g)
      (p = a[g]) && (c[g] = p);
    c.sort(t);
  }
  return new Ee(s, this._parents).order();
}
function Pa(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ta() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Oa() {
  return Array.from(this);
}
function Ra() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length; s < o; ++s) {
      var a = n[s];
      if (a) return a;
    }
  return null;
}
function Na() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Da() {
  return !this.node();
}
function La(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], o = 0, a = s.length, d; o < a; ++o)
      (d = s[o]) && e.call(d, d.__data__, o, s);
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
  var i = xi(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? Ua : za : typeof t == "function" ? i.local ? Wa : Ba : i.local ? Fa : qa)(i, t));
}
function xs(e) {
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
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function Ya(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Va : typeof t == "function" ? ja : Ga)(e, t, i ?? "")) : bt(this.node(), e);
}
function bt(e, t) {
  return e.style.getPropertyValue(t) || xs(e).getComputedStyle(e, null).getPropertyValue(t);
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
function ks(e) {
  return e.trim().split(/^|\s+/);
}
function sn(e) {
  return e.classList || new _s(e);
}
function _s(e) {
  this._node = e, this._names = ks(e.getAttribute("class") || "");
}
_s.prototype = {
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
  for (var i = sn(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function Es(e, t) {
  for (var i = sn(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
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
  var i = ks(e + "");
  if (arguments.length < 2) {
    for (var n = sn(this.node()), s = -1, o = i.length; ++s < o; ) if (!n.contains(i[s])) return !1;
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
  var i = typeof e == "function" ? e : Is(e), n = t == null ? gr : typeof t == "function" ? t : nn(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
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
function br() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function xr(e) {
  return this.select(e ? br : wr);
}
function kr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function _r(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function $r(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function Er(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, o; i < s; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++n] = o;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function Sr(e, t, i) {
  return function() {
    var n = this.__on, s, o = _r(t);
    if (n) {
      for (var a = 0, d = n.length; a < d; ++a)
        if ((s = n[a]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = o, s.options = i), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), s = { type: e.type, name: e.name, value: t, listener: o, options: i }, n ? n.push(s) : this.__on = [s];
  };
}
function Cr(e, t, i) {
  var n = $r(e + ""), s, o = n.length, a;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var c = 0, p = d.length, g; c < p; ++c)
        for (s = 0, g = d[c]; s < o; ++s)
          if ((a = n[s]).type === g.type && a.name === g.name)
            return g.value;
    }
    return;
  }
  for (d = t ? Sr : Er, s = 0; s < o; ++s) this.each(d(n[s], t, i));
  return this;
}
function Ss(e, t, i) {
  var n = xs(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
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
function* Tr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length, a; s < o; ++s)
      (a = n[s]) && (yield a);
}
var Cs = [null];
function Ee(e, t) {
  this._groups = e, this._parents = t;
}
function jt() {
  return new Ee([[document.documentElement]], Cs);
}
function Or() {
  return this;
}
Ee.prototype = jt.prototype = {
  constructor: Ee,
  select: oa,
  selectAll: la,
  selectChild: ma,
  selectChildren: Ia,
  filter: ya,
  data: _a,
  enter: va,
  exit: Ea,
  join: Sa,
  merge: Ca,
  selection: Or,
  order: Aa,
  sort: Ma,
  call: Ta,
  nodes: Oa,
  node: Ra,
  size: Na,
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
  clone: xr,
  datum: kr,
  on: Cr,
  dispatch: Pr,
  [Symbol.iterator]: Tr
};
function Oe(e) {
  return typeof e == "string" ? new Ee([[document.querySelector(e)]], [document.documentElement]) : new Ee([[e]], Cs);
}
function Rr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function et(e, t) {
  if (e = Rr(e), t === void 0 && (t = e.currentTarget), t) {
    var i = t.ownerSVGElement || t;
    if (i.createSVGPoint) {
      var n = i.createSVGPoint();
      return n.x = e.clientX, n.y = e.clientY, n = n.matrixTransform(t.getScreenCTM().inverse()), [n.x, n.y];
    }
    if (t.getBoundingClientRect) {
      var s = t.getBoundingClientRect();
      return [e.clientX - s.left - t.clientLeft, e.clientY - s.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
var Nr = { value: () => {
} };
function on() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new li(i);
}
function li(e) {
  this._ = e;
}
function Dr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
li.prototype = on.prototype = {
  constructor: li,
  on: function(e, t) {
    var i = this._, n = Dr(e + "", i), s, o = -1, a = n.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((s = (e = n[o]).type) && (s = Lr(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < a; )
      if (s = (e = n[o]).type) i[s] = Sn(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = Sn(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new li(e);
  },
  call: function(e, t) {
    if ((s = arguments.length - 2) > 0) for (var i = new Array(s), n = 0, s, o; n < s; ++n) i[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (o = this._[e], n = 0, s = o.length; n < s; ++n) o[n].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var n = this._[e], s = 0, o = n.length; s < o; ++s) n[s].value.apply(t, i);
  }
};
function Lr(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function Sn(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = Nr, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Bi = { capture: !0, passive: !1 };
function Wi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function zr(e) {
  var t = e.document.documentElement, i = Oe(e).on("dragstart.drag", Wi, Bi);
  "onselectstart" in t ? i.on("selectstart.drag", Wi, Bi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Ur(e, t) {
  var i = e.document.documentElement, n = Oe(e).on("dragstart.drag", null);
  t && (n.on("click.drag", Wi, Bi), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function an(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function As(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function Yt() {
}
var Bt = 0.7, gi = 1 / Bt, yt = "\\s*([+-]?\\d+)\\s*", Wt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ze = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", qr = /^#([0-9a-f]{3,8})$/, Fr = new RegExp(`^rgb\\(${yt},${yt},${yt}\\)$`), Br = new RegExp(`^rgb\\(${ze},${ze},${ze}\\)$`), Wr = new RegExp(`^rgba\\(${yt},${yt},${yt},${Wt}\\)$`), Hr = new RegExp(`^rgba\\(${ze},${ze},${ze},${Wt}\\)$`), Vr = new RegExp(`^hsl\\(${Wt},${ze},${ze}\\)$`), Gr = new RegExp(`^hsla\\(${Wt},${ze},${ze},${Wt}\\)$`), Cn = {
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
an(Yt, Ht, {
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
function Ht(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = qr.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Pn(t) : i === 3 ? new ke(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? ei(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? ei(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Fr.exec(e)) ? new ke(t[1], t[2], t[3], 1) : (t = Br.exec(e)) ? new ke(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Wr.exec(e)) ? ei(t[1], t[2], t[3], t[4]) : (t = Hr.exec(e)) ? ei(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Vr.exec(e)) ? Rn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Gr.exec(e)) ? Rn(t[1], t[2] / 100, t[3] / 100, t[4]) : Cn.hasOwnProperty(e) ? Pn(Cn[e]) : e === "transparent" ? new ke(NaN, NaN, NaN, 0) : null;
}
function Pn(e) {
  return new ke(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ei(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new ke(e, t, i, n);
}
function Kr(e) {
  return e instanceof Yt || (e = Ht(e)), e ? (e = e.rgb(), new ke(e.r, e.g, e.b, e.opacity)) : new ke();
}
function Hi(e, t, i, n) {
  return arguments.length === 1 ? Kr(e) : new ke(e, t, i, n ?? 1);
}
function ke(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
an(ke, Hi, As(Yt, {
  brighter(e) {
    return e = e == null ? gi : Math.pow(gi, e), new ke(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Bt : Math.pow(Bt, e), new ke(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ke(at(this.r), at(this.g), at(this.b), Ii(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Tn,
  // Deprecated! Use color.formatHex.
  formatHex: Tn,
  formatHex8: Xr,
  formatRgb: On,
  toString: On
}));
function Tn() {
  return `#${st(this.r)}${st(this.g)}${st(this.b)}`;
}
function Xr() {
  return `#${st(this.r)}${st(this.g)}${st(this.b)}${st((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function On() {
  const e = Ii(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${at(this.r)}, ${at(this.g)}, ${at(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ii(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function at(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function st(e) {
  return e = at(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Rn(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Re(e, t, i, n);
}
function Ms(e) {
  if (e instanceof Re) return new Re(e.h, e.s, e.l, e.opacity);
  if (e instanceof Yt || (e = Ht(e)), !e) return new Re();
  if (e instanceof Re) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), a = NaN, d = o - s, c = (o + s) / 2;
  return d ? (t === o ? a = (i - n) / d + (i < n) * 6 : i === o ? a = (n - t) / d + 2 : a = (t - i) / d + 4, d /= c < 0.5 ? o + s : 2 - o - s, a *= 60) : d = c > 0 && c < 1 ? 0 : a, new Re(a, d, c, e.opacity);
}
function Qr(e, t, i, n) {
  return arguments.length === 1 ? Ms(e) : new Re(e, t, i, n ?? 1);
}
function Re(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
an(Re, Qr, As(Yt, {
  brighter(e) {
    return e = e == null ? gi : Math.pow(gi, e), new Re(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Bt : Math.pow(Bt, e), new Re(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new ke(
      Ni(e >= 240 ? e - 240 : e + 120, s, n),
      Ni(e, s, n),
      Ni(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new Re(Nn(this.h), ti(this.s), ti(this.l), Ii(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ii(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Nn(this.h)}, ${ti(this.s) * 100}%, ${ti(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Nn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function ti(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Ni(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Ps = (e) => () => e;
function Zr(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Jr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function ed(e) {
  return (e = +e) == 1 ? Ts : function(t, i) {
    return i - t ? Jr(t, i, e) : Ps(isNaN(t) ? i : t);
  };
}
function Ts(e, t) {
  var i = t - e;
  return i ? Zr(e, i) : Ps(isNaN(e) ? t : e);
}
const Dn = (function e(t) {
  var i = ed(t);
  function n(s, o) {
    var a = i((s = Hi(s)).r, (o = Hi(o)).r), d = i(s.g, o.g), c = i(s.b, o.b), p = Ts(s.opacity, o.opacity);
    return function(g) {
      return s.r = a(g), s.g = d(g), s.b = c(g), s.opacity = p(g), s + "";
    };
  }
  return n.gamma = e, n;
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
  var i = Vi.lastIndex = Di.lastIndex = 0, n, s, o, a = -1, d = [], c = [];
  for (e = e + "", t = t + ""; (n = Vi.exec(e)) && (s = Di.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), d[a] ? d[a] += o : d[++a] = o), (n = n[0]) === (s = s[0]) ? d[a] ? d[a] += s : d[++a] = s : (d[++a] = null, c.push({ i: a, x: Ke(n, s) })), i = Di.lastIndex;
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
function Os(e, t, i, n, s, o) {
  var a, d, c;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (c = e * i + t * n) && (i -= e * c, n -= t * c), (d = Math.sqrt(i * i + n * n)) && (i /= d, n /= d, c /= d), e * n < t * i && (e = -e, t = -t, c = -c, a = -a), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * Ln,
    skewX: Math.atan(c) * Ln,
    scaleX: a,
    scaleY: d
  };
}
var ii;
function sd(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Gi : Os(t.a, t.b, t.c, t.d, t.e, t.f);
}
function od(e) {
  return e == null || (ii || (ii = document.createElementNS("http://www.w3.org/2000/svg", "g")), ii.setAttribute("transform", e), !(e = ii.transform.baseVal.consolidate())) ? Gi : (e = e.matrix, Os(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Rs(e, t, i, n) {
  function s(p) {
    return p.length ? p.pop() + " " : "";
  }
  function o(p, g, m, y, h, r) {
    if (p !== m || g !== y) {
      var u = h.push("translate(", null, t, null, i);
      r.push({ i: u - 4, x: Ke(p, m) }, { i: u - 2, x: Ke(g, y) });
    } else (m || y) && h.push("translate(" + m + t + y + i);
  }
  function a(p, g, m, y) {
    p !== g ? (p - g > 180 ? g += 360 : g - p > 180 && (p += 360), y.push({ i: m.push(s(m) + "rotate(", null, n) - 2, x: Ke(p, g) })) : g && m.push(s(m) + "rotate(" + g + n);
  }
  function d(p, g, m, y) {
    p !== g ? y.push({ i: m.push(s(m) + "skewX(", null, n) - 2, x: Ke(p, g) }) : g && m.push(s(m) + "skewX(" + g + n);
  }
  function c(p, g, m, y, h, r) {
    if (p !== m || g !== y) {
      var u = h.push(s(h) + "scale(", null, ",", null, ")");
      r.push({ i: u - 4, x: Ke(p, m) }, { i: u - 2, x: Ke(g, y) });
    } else (m !== 1 || y !== 1) && h.push(s(h) + "scale(" + m + "," + y + ")");
  }
  return function(p, g) {
    var m = [], y = [];
    return p = e(p), g = e(g), o(p.translateX, p.translateY, g.translateX, g.translateY, m, y), a(p.rotate, g.rotate, m, y), d(p.skewX, g.skewX, m, y), c(p.scaleX, p.scaleY, g.scaleX, g.scaleY, m, y), p = g = null, function(h) {
      for (var r = -1, u = y.length, f; ++r < u; ) m[(f = y[r]).i] = f.x(h);
      return m.join("");
    };
  };
}
var ad = Rs(sd, "px, ", "px)", "deg)"), rd = Rs(od, ", ", ")", ")"), dd = 1e-12;
function zn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function ld(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function cd(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const pd = (function e(t, i, n) {
  function s(o, a) {
    var d = o[0], c = o[1], p = o[2], g = a[0], m = a[1], y = a[2], h = g - d, r = m - c, u = h * h + r * r, f, k;
    if (u < dd)
      k = Math.log(y / p) / t, f = function(P) {
        return [
          d + P * h,
          c + P * r,
          p * Math.exp(t * P * k)
        ];
      };
    else {
      var A = Math.sqrt(u), R = (y * y - p * p + n * u) / (2 * p * i * A), T = (y * y - p * p - n * u) / (2 * y * i * A), x = Math.log(Math.sqrt(R * R + 1) - R), w = Math.log(Math.sqrt(T * T + 1) - T);
      k = (w - x) / t, f = function(P) {
        var U = P * k, D = zn(x), z = p / (i * A) * (D * cd(t * U + x) - ld(x));
        return [
          d + z * h,
          c + z * r,
          p * D / zn(t * U + x)
        ];
      };
    }
    return f.duration = k * 1e3 * t / Math.SQRT2, f;
  }
  return s.rho = function(o) {
    var a = Math.max(1e-3, +o), d = a * a, c = d * d;
    return e(a, d, c);
  }, s;
})(Math.SQRT2, 2, 4);
var xt = 0, Ot = 0, At = 0, Ns = 1e3, yi, Rt, vi = 0, dt = 0, ki = 0, Vt = typeof performance == "object" && performance.now ? performance : Date, Ds = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function rn() {
  return dt || (Ds(ud), dt = Vt.now() + ki);
}
function ud() {
  dt = 0;
}
function wi() {
  this._call = this._time = this._next = null;
}
wi.prototype = Ls.prototype = {
  constructor: wi,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? rn() : +i) + (t == null ? 0 : +t), !this._next && Rt !== this && (Rt ? Rt._next = this : yi = this, Rt = this), this._call = e, this._time = i, ji();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, ji());
  }
};
function Ls(e, t, i) {
  var n = new wi();
  return n.restart(e, t, i), n;
}
function md() {
  rn(), ++xt;
  for (var e = yi, t; e; )
    (t = dt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --xt;
}
function Un() {
  dt = (vi = Vt.now()) + ki, xt = Ot = 0;
  try {
    md();
  } finally {
    xt = 0, fd(), dt = 0;
  }
}
function hd() {
  var e = Vt.now(), t = e - vi;
  t > Ns && (ki -= t, vi = e);
}
function fd() {
  for (var e, t = yi, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : yi = i);
  Rt = e, ji(n);
}
function ji(e) {
  if (!xt) {
    Ot && (Ot = clearTimeout(Ot));
    var t = e - dt;
    t > 24 ? (e < 1 / 0 && (Ot = setTimeout(Un, e - Vt.now() - ki)), At && (At = clearInterval(At))) : (At || (vi = Vt.now(), At = setInterval(hd, Ns)), xt = 1, Ds(Un));
  }
}
function qn(e, t, i) {
  var n = new wi();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var gd = on("start", "end", "cancel", "interrupt"), Id = [], zs = 0, Fn = 1, Yi = 2, ci = 3, Bn = 4, Ki = 5, pi = 6;
function _i(e, t, i, n, s, o) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (i in a) return;
  yd(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
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
  if (i.state > ci) throw new Error("too late; already running");
  return i;
}
function De(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function yd(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = Ls(o, 0, i.time);
  function o(p) {
    i.state = Fn, i.timer.restart(a, i.delay, i.time), i.delay <= p && a(p - i.delay);
  }
  function a(p) {
    var g, m, y, h;
    if (i.state !== Fn) return c();
    for (g in n)
      if (h = n[g], h.name === i.name) {
        if (h.state === ci) return qn(a);
        h.state === Bn ? (h.state = pi, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete n[g]) : +g < t && (h.state = pi, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete n[g]);
      }
    if (qn(function() {
      i.state === ci && (i.state = Bn, i.timer.restart(d, i.delay, i.time), d(p));
    }), i.state = Yi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Yi) {
      for (i.state = ci, s = new Array(y = i.tween.length), g = 0, m = -1; g < y; ++g)
        (h = i.tween[g].value.call(e, e.__data__, i.index, i.group)) && (s[++m] = h);
      s.length = m + 1;
    }
  }
  function d(p) {
    for (var g = p < i.duration ? i.ease.call(null, p / i.duration) : (i.timer.restart(c), i.state = Ki, 1), m = -1, y = s.length; ++m < y; )
      s[m].call(e, g);
    i.state === Ki && (i.on.call("end", e, e.__data__, i.index, i.group), c());
  }
  function c() {
    i.state = pi, i.timer.stop(), delete n[t];
    for (var p in n) return;
    delete e.__transition;
  }
}
function ui(e, t) {
  var i = e.__transition, n, s, o = !0, a;
  if (i) {
    t = t == null ? null : t + "";
    for (a in i) {
      if ((n = i[a]).name !== t) {
        o = !1;
        continue;
      }
      s = n.state > Yi && n.state < Ki, n.state = pi, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[a];
    }
    o && delete e.__transition;
  }
}
function vd(e) {
  return this.each(function() {
    ui(this, e);
  });
}
function wd(e, t) {
  var i, n;
  return function() {
    var s = Ue(this, e), o = s.tween;
    if (o !== i) {
      n = i = o;
      for (var a = 0, d = n.length; a < d; ++a)
        if (n[a].name === t) {
          n = n.slice(), n.splice(a, 1);
          break;
        }
    }
    s.tween = n;
  };
}
function bd(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Ue(this, e), a = o.tween;
    if (a !== n) {
      s = (n = a).slice();
      for (var d = { name: t, value: i }, c = 0, p = s.length; c < p; ++c)
        if (s[c].name === t) {
          s[c] = d;
          break;
        }
      c === p && s.push(d);
    }
    o.tween = s;
  };
}
function xd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = De(this.node(), i).tween, s = 0, o = n.length, a; s < o; ++s)
      if ((a = n[s]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? wd : bd)(i, e, t));
}
function ln(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = Ue(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return De(s, n).value[t];
  };
}
function Us(e, t) {
  var i;
  return (typeof t == "number" ? Ke : t instanceof Ht ? Dn : (i = Ht(t)) ? (t = i, Dn) : nd)(e, t);
}
function kd(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function _d(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function $d(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var a = this.getAttribute(e);
    return a === s ? null : a === n ? o : o = t(n = a, i);
  };
}
function Ed(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === s ? null : a === n ? o : o = t(n = a, i);
  };
}
function Sd(e, t, i) {
  var n, s, o;
  return function() {
    var a, d = i(this), c;
    return d == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), c = d + "", a === c ? null : a === n && c === s ? o : (s = c, o = t(n = a, d)));
  };
}
function Cd(e, t, i) {
  var n, s, o;
  return function() {
    var a, d = i(this), c;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), c = d + "", a === c ? null : a === n && c === s ? o : (s = c, o = t(n = a, d)));
  };
}
function Ad(e, t) {
  var i = xi(e), n = i === "transform" ? rd : Us;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Cd : Sd)(i, n, ln(this, "attr." + e, t)) : t == null ? (i.local ? _d : kd)(i) : (i.local ? Ed : $d)(i, n, t));
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
function Td(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && Pd(e, o)), i;
  }
  return s._value = t, s;
}
function Od(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && Md(e, o)), i;
  }
  return s._value = t, s;
}
function Rd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = xi(e);
  return this.tween(i, (n.local ? Td : Od)(n, t));
}
function Nd(e, t) {
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
  return arguments.length ? this.each((typeof e == "function" ? Nd : Dd)(t, e)) : De(this.node(), t).delay;
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
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], a = o.length, d = n[s] = [], c, p = 0; p < a; ++p)
      (c = o[p]) && e.call(c, c.__data__, p, o) && d.push(c);
  return new He(n, this._parents, this._name, this._id);
}
function Gd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), a = new Array(n), d = 0; d < o; ++d)
    for (var c = t[d], p = i[d], g = c.length, m = a[d] = new Array(g), y, h = 0; h < g; ++h)
      (y = c[h] || p[h]) && (m[h] = y);
  for (; d < n; ++d)
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
  var n, s, o = jd(t) ? dn : Ue;
  return function() {
    var a = o(this, e), d = a.on;
    d !== n && (s = (n = d).copy()).on(t, i), a.on = s;
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
  for (var n = this._groups, s = n.length, o = new Array(s), a = 0; a < s; ++a)
    for (var d = n[a], c = d.length, p = o[a] = new Array(c), g, m, y = 0; y < c; ++y)
      (g = d[y]) && (m = e.call(g, g.__data__, y, d)) && ("__data__" in g && (m.__data__ = g.__data__), p[y] = m, _i(p[y], t, i, y, p, De(g, i)));
  return new He(o, this._parents, t, i);
}
function Jd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = ys(e));
  for (var n = this._groups, s = n.length, o = [], a = [], d = 0; d < s; ++d)
    for (var c = n[d], p = c.length, g, m = 0; m < p; ++m)
      if (g = c[m]) {
        for (var y = e.call(g, g.__data__, m, c), h, r = De(g, i), u = 0, f = y.length; u < f; ++u)
          (h = y[u]) && _i(h, t, i, u, y, r);
        o.push(y), a.push(g);
      }
  return new He(o, a, t, i);
}
var el = jt.prototype.constructor;
function tl() {
  return new el(this._groups, this._parents);
}
function il(e, t) {
  var i, n, s;
  return function() {
    var o = bt(this, e), a = (this.style.removeProperty(e), bt(this, e));
    return o === a ? null : o === i && a === n ? s : s = t(i = o, n = a);
  };
}
function qs(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function nl(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var a = bt(this, e);
    return a === s ? null : a === n ? o : o = t(n = a, i);
  };
}
function sl(e, t, i) {
  var n, s, o;
  return function() {
    var a = bt(this, e), d = i(this), c = d + "";
    return d == null && (c = d = (this.style.removeProperty(e), bt(this, e))), a === c ? null : a === n && c === s ? o : (s = c, o = t(n = a, d));
  };
}
function ol(e, t) {
  var i, n, s, o = "style." + t, a = "end." + o, d;
  return function() {
    var c = Ue(this, e), p = c.on, g = c.value[o] == null ? d || (d = qs(t)) : void 0;
    (p !== i || s !== g) && (n = (i = p).copy()).on(a, s = g), c.on = n;
  };
}
function al(e, t, i) {
  var n = (e += "") == "transform" ? ad : Us;
  return t == null ? this.styleTween(e, il(e, n)).on("end.style." + e, qs(e)) : typeof t == "function" ? this.styleTween(e, sl(e, n, ln(this, "style." + e, t))).each(ol(this._id, e)) : this.styleTween(e, nl(e, n, t), i).on("end.style." + e, null);
}
function rl(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function dl(e, t, i) {
  var n, s;
  function o() {
    var a = t.apply(this, arguments);
    return a !== s && (n = (s = a) && rl(e, a, i)), n;
  }
  return o._value = t, o;
}
function ll(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, dl(e, t, i ?? ""));
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
  function n() {
    var s = e.apply(this, arguments);
    return s !== i && (t = (i = s) && ml(s)), t;
  }
  return n._value = e, n;
}
function fl(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, hl(e));
}
function gl() {
  for (var e = this._name, t = this._id, i = Fs(), n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var a = n[o], d = a.length, c, p = 0; p < d; ++p)
      if (c = a[p]) {
        var g = De(c, t);
        _i(c, e, i, p, a, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new He(n, this._parents, e, i);
}
function Il() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, a) {
    var d = { value: a }, c = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var p = Ue(this, n), g = p.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(d), t._.interrupt.push(d), t._.end.push(c)), p.on = t;
    }), s === 0 && o();
  });
}
var yl = 0;
function He(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function Fs() {
  return ++yl;
}
var Be = jt.prototype;
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
  attrTween: Rd,
  style: al,
  styleTween: ll,
  text: ul,
  textTween: fl,
  remove: Qd,
  tween: xd,
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
function bl(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function xl(e) {
  var t, i;
  e instanceof He ? (t = e._id, e = e._name) : (t = Fs(), (i = wl).time = rn(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var a = n[o], d = a.length, c, p = 0; p < d; ++p)
      (c = a[p]) && _i(c, e, t, p, a, i || bl(c, t));
  return new He(n, this._parents, e, t);
}
jt.prototype.interrupt = vd;
jt.prototype.transition = xl;
const ni = (e) => () => e;
function kl(e, {
  sourceEvent: t,
  target: i,
  transform: n,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: n, enumerable: !0, configurable: !0 },
    _: { value: s }
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
var Lt = new We(1, 0, 0);
We.prototype;
function Li(e) {
  e.stopImmediatePropagation();
}
function Mt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function _l(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function $l() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Wn() {
  return this.__zoom || Lt;
}
function El(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Sl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Cl(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], a = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function Al() {
  var e = _l, t = $l, i = Cl, n = El, s = Sl, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, c = pd, p = on("start", "zoom", "end"), g, m, y, h = 500, r = 150, u = 0, f = 10;
  function k(I) {
    I.property("__zoom", Wn).on("wheel.zoom", U, { passive: !1 }).on("mousedown.zoom", D).on("dblclick.zoom", z).filter(s).on("touchstart.zoom", L).on("touchmove.zoom", q).on("touchend.zoom touchcancel.zoom", le).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  k.transform = function(I, S, v, b) {
    var _ = I.selection ? I.selection() : I;
    _.property("__zoom", Wn), I !== _ ? x(I, S, v, b) : _.interrupt().each(function() {
      w(this, arguments).event(b).start().zoom(null, typeof S == "function" ? S.apply(this, arguments) : S).end();
    });
  }, k.scaleBy = function(I, S, v, b) {
    k.scaleTo(I, function() {
      var _ = this.__zoom.k, $ = typeof S == "function" ? S.apply(this, arguments) : S;
      return _ * $;
    }, v, b);
  }, k.scaleTo = function(I, S, v, b) {
    k.transform(I, function() {
      var _ = t.apply(this, arguments), $ = this.__zoom, M = v == null ? T(_) : typeof v == "function" ? v.apply(this, arguments) : v, C = $.invert(M), N = typeof S == "function" ? S.apply(this, arguments) : S;
      return i(R(A($, N), M, C), _, a);
    }, v, b);
  }, k.translateBy = function(I, S, v, b) {
    k.transform(I, function() {
      return i(this.__zoom.translate(
        typeof S == "function" ? S.apply(this, arguments) : S,
        typeof v == "function" ? v.apply(this, arguments) : v
      ), t.apply(this, arguments), a);
    }, null, b);
  }, k.translateTo = function(I, S, v, b, _) {
    k.transform(I, function() {
      var $ = t.apply(this, arguments), M = this.__zoom, C = b == null ? T($) : typeof b == "function" ? b.apply(this, arguments) : b;
      return i(Lt.translate(C[0], C[1]).scale(M.k).translate(
        typeof S == "function" ? -S.apply(this, arguments) : -S,
        typeof v == "function" ? -v.apply(this, arguments) : -v
      ), $, a);
    }, b, _);
  };
  function A(I, S) {
    return S = Math.max(o[0], Math.min(o[1], S)), S === I.k ? I : new We(S, I.x, I.y);
  }
  function R(I, S, v) {
    var b = S[0] - v[0] * I.k, _ = S[1] - v[1] * I.k;
    return b === I.x && _ === I.y ? I : new We(I.k, b, _);
  }
  function T(I) {
    return [(+I[0][0] + +I[1][0]) / 2, (+I[0][1] + +I[1][1]) / 2];
  }
  function x(I, S, v, b) {
    I.on("start.zoom", function() {
      w(this, arguments).event(b).start();
    }).on("interrupt.zoom end.zoom", function() {
      w(this, arguments).event(b).end();
    }).tween("zoom", function() {
      var _ = this, $ = arguments, M = w(_, $).event(b), C = t.apply(_, $), N = v == null ? T(C) : typeof v == "function" ? v.apply(_, $) : v, B = Math.max(C[1][0] - C[0][0], C[1][1] - C[0][1]), V = _.__zoom, re = typeof S == "function" ? S.apply(_, $) : S, oe = c(V.invert(N).concat(B / V.k), re.invert(N).concat(B / re.k));
      return function(G) {
        if (G === 1) G = re;
        else {
          var X = oe(G), W = B / X[2];
          G = new We(W, N[0] - X[0] * W, N[1] - X[1] * W);
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
      var S = Oe(this.that).datum();
      p.call(
        I,
        this.that,
        new kl(I, {
          sourceEvent: this.sourceEvent,
          target: k,
          transform: this.that.__zoom,
          dispatch: p
        }),
        S
      );
    }
  };
  function U(I, ...S) {
    if (!e.apply(this, arguments)) return;
    var v = w(this, S).event(I), b = this.__zoom, _ = Math.max(o[0], Math.min(o[1], b.k * Math.pow(2, n.apply(this, arguments)))), $ = et(I);
    if (v.wheel)
      (v.mouse[0][0] !== $[0] || v.mouse[0][1] !== $[1]) && (v.mouse[1] = b.invert(v.mouse[0] = $)), clearTimeout(v.wheel);
    else {
      if (b.k === _) return;
      v.mouse = [$, b.invert($)], ui(this), v.start();
    }
    Mt(I), v.wheel = setTimeout(M, r), v.zoom("mouse", i(R(A(b, _), v.mouse[0], v.mouse[1]), v.extent, a));
    function M() {
      v.wheel = null, v.end();
    }
  }
  function D(I, ...S) {
    if (y || !e.apply(this, arguments)) return;
    var v = I.currentTarget, b = w(this, S, !0).event(I), _ = Oe(I.view).on("mousemove.zoom", N, !0).on("mouseup.zoom", B, !0), $ = et(I, v), M = I.clientX, C = I.clientY;
    zr(I.view), Li(I), b.mouse = [$, this.__zoom.invert($)], ui(this), b.start();
    function N(V) {
      if (Mt(V), !b.moved) {
        var re = V.clientX - M, oe = V.clientY - C;
        b.moved = re * re + oe * oe > u;
      }
      b.event(V).zoom("mouse", i(R(b.that.__zoom, b.mouse[0] = et(V, v), b.mouse[1]), b.extent, a));
    }
    function B(V) {
      _.on("mousemove.zoom mouseup.zoom", null), Ur(V.view, b.moved), Mt(V), b.event(V).end();
    }
  }
  function z(I, ...S) {
    if (e.apply(this, arguments)) {
      var v = this.__zoom, b = et(I.changedTouches ? I.changedTouches[0] : I, this), _ = v.invert(b), $ = v.k * (I.shiftKey ? 0.5 : 2), M = i(R(A(v, $), b, _), t.apply(this, S), a);
      Mt(I), d > 0 ? Oe(this).transition().duration(d).call(x, M, b, I) : Oe(this).call(k.transform, M, b, I);
    }
  }
  function L(I, ...S) {
    if (e.apply(this, arguments)) {
      var v = I.touches, b = v.length, _ = w(this, S, I.changedTouches.length === b).event(I), $, M, C, N;
      for (Li(I), M = 0; M < b; ++M)
        C = v[M], N = et(C, this), N = [N, this.__zoom.invert(N), C.identifier], _.touch0 ? !_.touch1 && _.touch0[2] !== N[2] && (_.touch1 = N, _.taps = 0) : (_.touch0 = N, $ = !0, _.taps = 1 + !!g);
      g && (g = clearTimeout(g)), $ && (_.taps < 2 && (m = N[0], g = setTimeout(function() {
        g = null;
      }, h)), ui(this), _.start());
    }
  }
  function q(I, ...S) {
    if (this.__zooming) {
      var v = w(this, S).event(I), b = I.changedTouches, _ = b.length, $, M, C, N;
      for (Mt(I), $ = 0; $ < _; ++$)
        M = b[$], C = et(M, this), v.touch0 && v.touch0[2] === M.identifier ? v.touch0[0] = C : v.touch1 && v.touch1[2] === M.identifier && (v.touch1[0] = C);
      if (M = v.that.__zoom, v.touch1) {
        var B = v.touch0[0], V = v.touch0[1], re = v.touch1[0], oe = v.touch1[1], G = (G = re[0] - B[0]) * G + (G = re[1] - B[1]) * G, X = (X = oe[0] - V[0]) * X + (X = oe[1] - V[1]) * X;
        M = A(M, Math.sqrt(G / X)), C = [(B[0] + re[0]) / 2, (B[1] + re[1]) / 2], N = [(V[0] + oe[0]) / 2, (V[1] + oe[1]) / 2];
      } else if (v.touch0) C = v.touch0[0], N = v.touch0[1];
      else return;
      v.zoom("touch", i(R(M, C, N), v.extent, a));
    }
  }
  function le(I, ...S) {
    if (this.__zooming) {
      var v = w(this, S).event(I), b = I.changedTouches, _ = b.length, $, M;
      for (Li(I), y && clearTimeout(y), y = setTimeout(function() {
        y = null;
      }, h), $ = 0; $ < _; ++$)
        M = b[$], v.touch0 && v.touch0[2] === M.identifier ? delete v.touch0 : v.touch1 && v.touch1[2] === M.identifier && delete v.touch1;
      if (v.touch1 && !v.touch0 && (v.touch0 = v.touch1, delete v.touch1), v.touch0) v.touch0[1] = this.__zoom.invert(v.touch0[0]);
      else if (v.end(), v.taps === 2 && (M = et(M, this), Math.hypot(m[0] - M[0], m[1] - M[1]) < f)) {
        var C = Oe(this).on("dblclick.zoom");
        C && C.apply(this, arguments);
      }
    }
  }
  return k.wheelDelta = function(I) {
    return arguments.length ? (n = typeof I == "function" ? I : ni(+I), k) : n;
  }, k.filter = function(I) {
    return arguments.length ? (e = typeof I == "function" ? I : ni(!!I), k) : e;
  }, k.touchable = function(I) {
    return arguments.length ? (s = typeof I == "function" ? I : ni(!!I), k) : s;
  }, k.extent = function(I) {
    return arguments.length ? (t = typeof I == "function" ? I : ni([[+I[0][0], +I[0][1]], [+I[1][0], +I[1][1]]]), k) : t;
  }, k.scaleExtent = function(I) {
    return arguments.length ? (o[0] = +I[0], o[1] = +I[1], k) : [o[0], o[1]];
  }, k.translateExtent = function(I) {
    return arguments.length ? (a[0][0] = +I[0][0], a[1][0] = +I[1][0], a[0][1] = +I[0][1], a[1][1] = +I[1][1], k) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, k.constrain = function(I) {
    return arguments.length ? (i = I, k) : i;
  }, k.duration = function(I) {
    return arguments.length ? (d = +I, k) : d;
  }, k.interpolate = function(I) {
    return arguments.length ? (c = I, k) : c;
  }, k.on = function() {
    var I = p.on.apply(p, arguments);
    return I === p ? k : I;
  }, k.clickDistance = function(I) {
    return arguments.length ? (u = (I = +I) * I, k) : Math.sqrt(u);
  }, k.tapDistance = function(I) {
    return arguments.length ? (f = +I, k) : f;
  }, k;
}
var Ml = Object.defineProperty, Pl = Object.getOwnPropertyDescriptor, fe = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Pl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && Ml(t, i, s), s;
};
function Tl(e, t, i, n) {
  const s = t.x - e.x, o = t.y - e.y, a = n.x - i.x, d = n.y - i.y, c = s * d - o * a;
  if (Math.abs(c) < 1e-9) return null;
  const p = ((i.x - e.x) * d - (i.y - e.y) * a) / c, g = ((i.x - e.x) * o - (i.y - e.y) * s) / c;
  return p <= 0.02 || p >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + p * s, y: e.y + p * o, t: p };
}
function Ol(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, o = n * n + s * s || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / o)), d = t.x + a * n, c = t.y + a * s;
  return { dist: Math.hypot(e.x - d, e.y - c), t: a };
}
function Rl(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], a = e[s + 1], d = Math.hypot(a.x - o.x, a.y - o.y) || 1, c = (a.x - o.x) / d, p = (a.y - o.y) / d, g = t.map(([y, h]) => Tl(o, a, y, h)).filter((y) => y !== null).filter((y) => y.t * d > i + 2 && (1 - y.t) * d > i + 2).sort((y, h) => y.t - h.t);
    let m = -1 / 0;
    for (const y of g)
      y.t * d - i <= m + 2 || (n += ` L ${y.x - c * i} ${y.y - p * i}`, n += ` A ${i} ${i} 0 0 1 ${y.x + c * i} ${y.y + p * i}`, m = y.t * d + i);
    n += ` L ${a.x} ${a.y}`;
  }
  return n;
}
const It = {
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
let me = class extends Ne {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Lt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
            const s = this.scene.nodes.filter((o) => this.selectedIds.includes(o.id)).map((o) => ({ id: o.id, kind: o.kind }));
            s.length && this.emit("delete-selection-requested", { items: s });
            return;
          }
          if (this._selectedWaypoint) {
            const s = this.scene.edges.find((o) => o.id === this._selectedWaypoint.edgeId);
            s && (e.preventDefault(), this.removeWaypoint(s, this._selectedWaypoint.index), this._selectedWaypoint = null);
            return;
          }
          if (!this.selectedId) return;
          const t = this.scene.edges.find((s) => s.id === this.selectedId), i = this.scene.nodes.find((s) => s.id === this.selectedId);
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
    this._zoomBehavior = Al().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), Oe(e).call(this._zoomBehavior);
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
    const s = this.fitInsets.left ?? 0, o = this.fitInsets.right ?? 0, a = this.fitInsets.top ?? 0, d = this.fitInsets.bottom ?? 0, c = Math.max(80, n.width - s - o), p = Math.max(80, n.height - a - d), g = Math.min(...t.map((f) => f.x - f.w / 2)) - e, m = Math.max(...t.map((f) => f.x + f.w / 2)) + e, y = Math.min(...t.map((f) => f.y - f.h / 2)) - e, h = Math.max(...t.map((f) => f.y + f.h / 2)) + e, r = Math.max(0.15, Math.min(c / (m - g), p / (h - y), 1.25)), u = Lt.translate(
      s + c / 2 - r * (g + m) / 2,
      a + p / 2 - r * (y + h) / 2
    ).scale(r);
    Oe(i).call(this._zoomBehavior.transform, u);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(Oe(t), e);
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
    var i, n, s;
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    const t = (i = this._dragGroup) == null ? void 0 : i.get(e.id);
    if (t) return t;
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    for (let o = e.parentId; o; o = (n = this.scene.nodes.find((a) => a.id === o)) == null ? void 0 : n.parentId) {
      const a = this.scene.nodes.find((c) => c.id === o);
      if (!a) break;
      if (this._dragPos && this._dragPos.id === o)
        return { x: e.x + (this._dragPos.x - a.x), y: e.y + (this._dragPos.y - a.y) };
      const d = (s = this._dragGroup) == null ? void 0 : s.get(o);
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
      const n = this.scene.nodes.find((s) => s.id === e.parentId);
      if (n) {
        const s = this.nodePos(n), o = s.x - n.w / 2 + 10 + e.w / 2, a = s.x + n.w / 2 - 10 - e.w / 2, d = s.y - n.h / 2 + 34 + e.h / 2, c = s.y + n.h / 2 - 10 - e.h / 2;
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
    var n, s;
    const i = ((n = this.shadowRoot) == null ? void 0 : n.elementsFromPoint(e, t)) ?? [];
    for (const o of i) {
      const a = (s = o.closest) == null ? void 0 : s.call(o, "[data-node-id]");
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
    const i = this.toScene(e), n = this.nodePos(t);
    let s = !1;
    const o = new Set(this.selectedIds), a = o.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (f) => o.has(f.id) && !(f.parentId && o.has(f.parentId))
    ) : null, d = a ? new Map(a.map((f) => [f.id, this.nodePos(f)])) : null, c = (f) => (f.shiftKey || f.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a, p = a ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = p !== null, m = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], y = () => {
      const f = [], k = p === "menu" ? this.scene.nodes.filter((A) => A.kind === "ui-app") : this.scene.nodes.filter((A) => A.id === t.parentId);
      for (const A of k) {
        const R = this.scene.nodes.filter((P) => P.parentId === A.id && m.includes(P.kind ?? "") && P.id !== t.id).sort((P, U) => P.y - U.y), T = A.x - A.w / 2 + 10, x = A.x + A.w / 2 - 10;
        for (const P of R) f.push({ x1: T, x2: x, y: P.y - P.h / 2 - 3, appId: A.id, beforeId: P.id });
        const w = R[R.length - 1];
        f.push({
          x1: T,
          x2: x,
          y: w ? w.y + w.h / 2 + 3 : A.y - A.h / 2 + 34 + 8,
          appId: A.id,
          beforeId: null
        });
      }
      return f;
    }, h = (f) => {
      const k = this.nodeIdAt(f), A = k && k !== t.id ? this.scene.nodes.find((R) => R.id === k) : void 0;
      return A ? A.kind === "external-system" ? A.id : A.parentId ?? null : null;
    }, r = (f) => {
      if ((f.buttons & 1) === 0) {
        u(f);
        return;
      }
      const k = this.toScene(f), A = k.x - i.x, R = k.y - i.y;
      if (!(!s && Math.hypot(A, R) < 3 / this._t.k))
        if (s = !0, a && d) {
          const T = /* @__PURE__ */ new Map();
          for (const x of a) {
            const w = d.get(x.id), P = this.clampToParent(x, w.x + A, w.y + R);
            T.set(x.id, { x: P.x, y: P.y });
          }
          this._dragGroup = T;
        } else if (g) {
          this._dragPos = { id: t.id, x: n.x + A, y: n.y + R }, this._menuSlots || (this._menuSlots = { slots: y(), active: null, nestRowId: null });
          const T = this.scene.nodes.filter(
            (w) => m.includes(w.kind ?? "") && w.id !== t.id && Math.abs(k.x - w.x) <= w.w / 2 + 8
          ), x = p === "menu" ? T.find((w) => Math.abs(k.y - w.y) < w.h * 0.28) : void 0;
          if (x)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: x.id }, this._hoverNodeId = x.id;
          else {
            let w = -1, P = 14;
            this._menuSlots.slots.forEach((U, D) => {
              if (k.x < U.x1 - 24 || k.x > U.x2 + 24) return;
              const z = Math.abs(k.y - U.y);
              z < P && (P = z, w = D);
            }), this._menuSlots = { ...this._menuSlots, active: w >= 0 ? w : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else c(f) ? (this._dragPos = { id: t.id, x: n.x + A, y: n.y + R }, this._hoverNodeId = h(f)) : (this._dragPos = this.clampToParent(t, n.x + A, n.y + R), this._hoverNodeId = null);
    }, u = (f) => {
      if (window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", u), s && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([k, A]) => ({ id: k, x: A.x, y: A.y }))
        });
      else if (s && this._dragPos && g) {
        const k = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const A = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (k != null && k.nestRowId)
          this.emit(A, { id: t.id, nestRowId: k.nestRowId });
        else if (k && k.active !== null) {
          const R = k.slots[k.active];
          this.emit(A, { id: t.id, appId: R.appId, beforeId: R.beforeId });
        }
        return;
      } else if (s && this._dragPos) {
        if (c(f)) {
          const k = h(f);
          if (f.ctrlKey && t.kind === "api") {
            k && k !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: k,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (k !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: k,
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
  onResizePointerDown(e, t, i, n) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation(), this.focus();
    const s = 160, o = 90, a = { x: t.x, y: t.y, w: t.w, h: t.h }, d = this.scene.nodes.filter((u) => u.parentId === t.id), c = Math.min(...d.map((u) => u.x - u.w / 2)), p = Math.max(...d.map((u) => u.x + u.w / 2)), g = Math.min(...d.map((u) => u.y - u.h / 2)), m = Math.max(...d.map((u) => u.y + u.h / 2)), y = oo(
      d.map((u) => ({ dx: u.x - a.x, dy: u.y - a.y, w: u.w, h: u.h })),
      { w: s, h: o }
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
      const k = a.x - i * a.w / 2, A = a.y - n * a.h / 2, R = i > 0 ? Math.max(f.x, k + s, d.length ? p + 10 : -1 / 0) : Math.min(f.x, k - s, d.length ? c - 10 : 1 / 0), T = n > 0 ? Math.max(f.y, A + o, d.length ? m + 10 : -1 / 0) : Math.min(f.y, A - o, d.length ? g - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (k + R) / 2,
        y: (A + T) / 2,
        w: Math.abs(R - k),
        h: Math.abs(T - A)
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
    const n = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: n.x, y: n.y };
    const s = (a) => {
      if ((a.buttons & 1) === 0) {
        window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const d = this.toScene(a);
      this._pendingLink = { sourceId: t.id, x: d.x, y: d.y }, this._hoverNodeId = this.nodeIdAt(a);
    }, o = (a) => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o);
      const d = this.nodeIdAt(a);
      d && d !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: d,
        x: a.clientX,
        y: a.clientY,
        connectKind: i
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: s } = this.nodePos(e), o = t - n, a = i - s, d = e.w / 2, c = e.h / 2;
    if (o === 0 && a === 0) return { x: n, y: s };
    const p = 1 / Math.max(Math.abs(o) / d, Math.abs(a) / c);
    return { x: n + o * p, y: s + a * p };
  }
  // ---- rendering -----------------------------------------------------------
  /** Perpendicular offset so edges sharing a node pair don't overlap. */
  edgeOffset(e) {
    const t = [e.sourceId, e.targetId].sort().join("|"), i = this.scene.edges.filter(
      (s) => [s.sourceId, s.targetId].sort().join("|") === t
    );
    return i.length < 2 ? 0 : (i.findIndex((s) => s.id === e.id) - (i.length - 1) / 2) * 20;
  }
  /** Full polyline of an edge: border point → waypoints → border point. */
  edgePolyline(e) {
    const t = this.scene.nodes.find((g) => g.id === e.sourceId), i = this.scene.nodes.find((g) => g.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), o = this.nodePos(i), a = n[0] ?? o, d = n[n.length - 1] ?? s;
    let c = this.borderPoint(t, a.x, a.y), p = this.borderPoint(i, d.x, d.y);
    if (!n.length) {
      const g = this.edgeOffset(e);
      if (g !== 0) {
        const m = Math.hypot(p.x - c.x, p.y - c.y) || 1, y = -(p.y - c.y) / m * g, h = (p.x - c.x) / m * g;
        c = { x: c.x + y, y: c.y + h }, p = { x: p.x + y, y: p.y + h };
      }
    }
    return [c, ...n, p];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let n = !1;
    const s = (a) => {
      if (!this._wpDrag) return;
      n = !0;
      const d = this.toScene(a), c = [...this._wpDrag.points];
      c[this._wpDrag.index] = d, this._wpDrag = { ...this._wpDrag, points: c };
    }, o = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), this._wpDrag && n && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: s } = Ol(t, e[n], e[n + 1]);
      s < i.dist && (i = { seg: n, dist: s });
    }
    return i.seg;
  }
  /** Insert a new bend on `edge` at scene point `at`, selecting it. */
  addWaypointAt(e, t, i) {
    const n = this.nearestSegment(t, i), s = [...this.edgePoints[e.id] ?? []];
    s.splice(n, 0, i), this._selectedWaypoint = { edgeId: e.id, index: n }, this.emit("edge-points-changed", { id: e.id, points: s });
  }
  /**
   * Dragging along a selected edge splits it: a bend is born once the pointer
   * actually moves, then follows the cursor. A plain click (no movement) leaves
   * the line alone so it just selects — and so a double-click can add a point.
   */
  onEdgeHitPointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0 || this.selectedId !== t.id) return;
    e.stopPropagation();
    const n = this.toScene(e), s = this.nearestSegment(i, n);
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
          g[s] = p, this._wpDrag = { ...this._wpDrag, points: g };
        }
      } else {
        if (Math.hypot(p.x - n.x, p.y - n.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const g = [...this.edgePoints[t.id] ?? []];
        g.splice(s, 0, p), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: g, index: s };
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
    const i = t.map((n) => `${n.x},${n.y}`).join(" ");
    return J`
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
    const n = e.color ?? "#64748b", s = this.selectedId === e.id, o = s || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), a = Math.floor((t.length - 1) / 2), d = {
      x: (t[a].x + t[a + 1].x) / 2,
      y: (t[a].y + t[a + 1].y) / 2
    }, c = t.slice(1, -1);
    return J`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${Rl(t, i)}
              fill="none"
              stroke=${n} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? J`<text x=${d.x} y=${d.y - 6} text-anchor="middle"
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
        ${s ? c.map((p, g) => {
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
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, a = !!e.parentId, d = ((y = this._resize) == null ? void 0 : y.id) === e.id ? this._resize.w : e.w, c = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.h : e.h, p = d / 2, g = c / 2, m = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return J`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${s ? " scale(1.06)" : ""}"
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
              stroke=${s || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || s ? 2.5 : 1.4}
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
        ${e.symbol && It[e.symbol] && !a ? J`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-g + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${It[e.symbol]}
              </g>` : ""}
        ${a && e.symbol && It[e.symbol] ? J`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${It[e.symbol]}
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
        ${n && this.connectable && (a ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [p, 0],
      [-p, 0],
      [0, g],
      [0, -g]
    ].map(
      ([f, k]) => J`
                <circle data-handle cx=${f} cy=${k} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(A) => this.onHandlePointerDown(A, e)}>
                  <title>${a ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${n && this.connectable && ((u = e.extraHandles) != null && u.length) ? e.extraHandles.map(
      (f, k) => J`
                <g transform="translate(${-p + 24 + k * 20}, ${-g})">
                  <circle data-handle r="7" fill=${f.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(A) => this.onHandlePointerDown(A, e, f.kind)}>
                    <title>${f.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([f, k]) => J`
                <rect data-resize x=${f * p - 6.5} y=${k * g - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${f * k > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(A) => this.onResizePointerDown(A, e, f, k)}>
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
    const n = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", n), this._rubber = null;
    }, s = (a) => {
      if ((a.buttons & 1) === 0) {
        n();
        return;
      }
      const d = this.toScene(a);
      !i && Math.hypot(d.x - t.x, d.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: d });
    }, o = () => {
      if (window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a, b: d } = this._rubber, c = Math.min(a.x, d.x), p = Math.max(a.x, d.x), g = Math.min(a.y, d.y), m = Math.max(a.y, d.y), y = this.scene.nodes.filter((h) => {
          const r = this.nodePos(h);
          return r.x >= c && r.x <= p && r.y >= g && r.y <= m;
        }).map((h) => h.id);
        this.emit("nodes-boxed", { ids: y });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", n);
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
    const i = Math.min(...t.map((a) => a.x - a.w / 2)) - e, n = Math.max(...t.map((a) => a.x + a.w / 2)) + e, s = Math.min(...t.map((a) => a.y - a.h / 2)) - e, o = Math.max(...t.map((a) => a.y + a.h / 2)) + e;
    return { minX: i, minY: s, w: n - i, h: o - s };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), s = this._t.k, o = Lt.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    Oe(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return E``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, d = s.width / this._t.k, c = s.height / this._t.k;
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
      this.onMinimapPointer(p, e, n);
    }}
        @pointermove=${(p) => {
      var g, m;
      (m = (g = p.currentTarget).hasPointerCapture) != null && m.call(g, p.pointerId) && this.onMinimapPointer(p, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((p) => {
      const g = this.nodePos(p);
      return J`<rect
              x=${(g.x - p.w / 2 - e.minX) * n}
              y=${(g.y - p.h / 2 - e.minY) * n}
              width=${Math.max(2, p.w * n)}
              height=${Math.max(2, p.h * n)}
              rx="1" fill=${p.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * n}
            y=${(a - e.minY) * n}
            width=${d * n}
            height=${c * n}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((s) => s.color ?? "#64748b"))], t = [], i = [], n = [];
    return this.scene.edges.forEach((s) => {
      const o = this.edgePolyline(s);
      if (o) {
        i.push(this.renderEdgeHit(s, o)), n.push(this.renderEdgeInk(s, o, [...t]));
        for (let a = 0; a < o.length - 1; a++) t.push([o[a], o[a + 1]]);
      }
    }), E`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(s) => {
      const o = s.target;
      o.closest("[data-node-id]") || o.closest("[data-edge-id]") || this._spaceDown || s.button !== 0 || (s.buttons & 1) !== 0 && this.startRubberBand(s);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (s) => J`
              <marker id="arrow-${this.markerId(s)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${s}></path>
              </marker>`
    )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${i}
          ${this.scene.nodes.filter((s) => !s.parentId).map((s) => this.renderNode(s))}
          ${this.scene.nodes.filter((s) => s.parentId).map((s) => this.renderNode(s))}
          ${n}
          ${this._menuSlots ? J`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (s, o) => J`
                    <line x1=${s.x1} y1=${s.y} x2=${s.x2} y2=${s.y}
                          stroke=${o === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${o === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${o === this._menuSlots.active ? J`<circle cx=${s.x1} cy=${s.y} r="3.5" fill="#0284c7"></circle>
                          <circle cx=${s.x2} cy=${s.y} r="3.5" fill="#0284c7"></circle>` : ""}`
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
me.styles = ct`
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
  pt("modux-canvas")
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
const ft = (e) => e.trim().toLowerCase();
function Nl(e, t) {
  var D, z, L, q, le;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((I) => [I.id, I.name])), s = e.modules.flatMap(
    (I) => (I.useCases ?? []).map((S) => ({ ...S, moduleId: I.id }))
  ), o = new Set(s.map((I) => I.id)), a = e.aggregates ?? [], d = new Set(
    e.modules.flatMap((I) => (I.domainServices ?? []).map((S) => S.id))
  ), c = e.modules.flatMap(
    (I) => (I.domainEvents ?? []).map((S) => ({ ...S, moduleId: I.id, application: !1 }))
  ), p = e.modules.flatMap(
    (I) => (I.applicationEvents ?? []).map((S) => ({ ...S, moduleId: I.id, application: !0 }))
  ), g = e.modules.flatMap(
    (I) => (I.readModels ?? []).map((S) => ({ ...S, moduleId: I.id }))
  );
  for (const I of s)
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
      tooltip: I.policy ? `${I.name} — policy de ${n.get(I.moduleId) ?? I.moduleId} (reacción, no caso de negocio)` : `${I.name} — caso de uso de ${n.get(I.moduleId) ?? I.moduleId}`
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
      tooltip: `${I.name} — agregado de ${n.get(I.moduleId) ?? I.moduleId}`
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
      tooltip: `${I.name} — evento de ${n.get(I.moduleId) ?? I.moduleId}`
    }), m.set(ft(I.name), I.id);
  const y = (I) => {
    if (!I || !I.trim()) return null;
    const S = m.get(ft(I));
    if (S) return S;
    const v = `evname:${ft(I)}`;
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
    const S = g.find((b) => b.id === I.id) ?? g.find((b) => I.name && ft(b.name) === ft(I.name)), v = (S == null ? void 0 : S.id) ?? (I.id || (I.name ? `rm:${ft(I.name)}` : null));
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
    const S = (e.agentUses ?? []).filter((M) => M.agentId === I.id), v = (e.agentExternalUses ?? []).filter((M) => M.agentId === I.id), b = (e.agentRags ?? []).filter((M) => M.agentId === I.id), _ = (e.agentMcpUses ?? []).filter((M) => M.agentId === I.id), $ = (e.agentGatewayUses ?? []).some((M) => M.agentId === I.id) || (e.agentApiOpUses ?? []).some((M) => M.agentId === I.id) || (e.agentQueryUses ?? []).some((M) => M.agentId === I.id) || (e.agentDelegations ?? []).some((M) => M.agentId === I.id) || (e.agentTriggers ?? []).some((M) => M.agentId === I.id);
    if (!(!S.length && !v.length && !b.length && !_.length && !$)) {
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
        const N = (D = (C.useCases ?? []).find((B) => B.id === M.externalUseCaseId)) == null ? void 0 : D.name;
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
          label: N,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: N ? `Llama a ${N} del sistema externo` : void 0
        });
      }
      for (const M of _) {
        const C = e.externalSystems.find(
          (B) => (B.mcpServers ?? []).some((V) => V.id === M.mcpServerId)
        );
        if (!C) continue;
        const N = (z = (C.mcpServers ?? []).find((B) => B.id === M.mcpServerId)) == null ? void 0 : z.name;
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
          label: N,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: N ? `Consume las herramientas del servidor MCP ${N}` : void 0
        });
      }
      for (const M of b) {
        const C = (e.rags ?? []).find((N) => N.id === M.ragId);
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
          for (const N of C.sourceReadModelIds ?? []) {
            const B = h({ id: N });
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
      (_) => (_.useCases ?? []).some(($) => $.id === I.targetId)
    ), v = S ? r(S.id) : null;
    if (!v) continue;
    const b = (L = ((S == null ? void 0 : S.useCases) ?? []).find((_) => _.id === I.targetId)) == null ? void 0 : L.name;
    ue(i, {
      id: `es-extout:${I.sourceId}->${I.targetId}`,
      sourceId: I.sourceId,
      targetId: v,
      kind: "es-command-external",
      label: b,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: b ? `Llama a ${b} del sistema externo` : void 0
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
  const f = (I, S, v, b, _, $) => ($e(i, {
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
    badge: b,
    tooltip: _
  }), I), k = (I, S) => {
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
    k(I.eventName, S);
    for (const v of I.actions ?? []) {
      if (v.type === "CallUseCase" && A(S, v.useCaseId), v.type === "StartSaga" && v.sagaId) {
        const b = `saga:${v.sagaId}`;
        f(b, v.sagaId, "saga", "SAGA"), ue(i, {
          id: `es-saga:${S}->${b}`,
          sourceId: S,
          targetId: b,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (v.type === "UpdateProjection" && v.projectionId) {
        const b = (e.projections ?? []).find((_) => _.id === v.projectionId);
        b && ue(i, {
          id: `es-feeds:${S}->${b.id}`,
          sourceId: S,
          targetId: b.id,
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
    for (const _ of I.handledEventIds) {
      const $ = i.nodes.has(_) ? _ : null;
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
      const _ = e.externalSystems.find(
        (M) => (M.useCases ?? []).some((C) => C.id === v) || (M.tables ?? []).some((C) => C.id === v)
      ), $ = _ ? r(_.id) : null;
      if ($) {
        const M = ((q = (_.useCases ?? []).find((C) => C.id === v)) == null ? void 0 : q.name) ?? ((le = (_.tables ?? []).find((C) => C.id === v)) == null ? void 0 : le.name);
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
    const b = h({ id: I.readModelId, name: I.readModelName });
    b && ue(i, {
      id: `es-projects:${S}->${b}`,
      sourceId: S,
      targetId: b,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const I of e.flows) {
    if (I.archetype === "MATERIALIZES") {
      const v = y(I.triggerEvent), b = h({ name: I.readModelName ?? `${I.triggerEvent}View` });
      v && b && ue(i, {
        id: `es-mat:${I.id}`,
        sourceId: v,
        targetId: b,
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
    if (k(I.triggerEvent, S), A(S, I.targetUseCaseId), !I.targetUseCaseId) {
      const v = r(I.targetId), b = v ?? `tgt:${I.targetId}`;
      !v && n.has(I.targetId) && $e(i, {
        id: b,
        label: n.get(I.targetId) ?? I.targetId,
        x: 0,
        y: 0,
        w: Q.module.w,
        h: Q.module.h,
        kind: "module",
        symbol: "component",
        fill: Q.module.fill,
        stroke: Q.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(b) && ue(i, {
        id: `es-deliver:${I.id}`,
        sourceId: S,
        targetId: b,
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
    k(I.triggerEvent, S);
    for (const b of I.steps) A(S, b.useCaseId);
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
    k(I.triggerEvent, S);
    for (const b of I.steps ?? []) {
      A(S, b.targetUseCaseId);
      for (const _ of [b.emittedEventName, b.completionEventName]) {
        const $ = y(_);
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
  const R = [...i.nodes.values()], T = /* @__PURE__ */ new Map();
  for (const I of i.edges)
    T.has(I.targetId) || T.set(I.targetId, []), T.get(I.targetId).push(I.sourceId);
  const x = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Set(), P = (I) => {
    const S = x.get(I);
    if (S !== void 0) return S;
    if (w.has(I)) return 0;
    w.add(I);
    const v = T.get(I) ?? [], b = v.length ? 1 + Math.max(...v.map(P)) : 0;
    return w.delete(I), x.set(I, b), b;
  }, U = /* @__PURE__ */ new Map();
  for (const I of R) {
    const S = t[I.id];
    if (S) {
      I.x = S.x, I.y = S.y;
      continue;
    }
    const v = P(I.id), b = U.get(v) ?? 0;
    U.set(v, b + 1), I.x = 140 + v * 260, I.y = 110 + b * 110;
  }
  return { nodes: R, edges: i.edges };
}
const Dl = 190, Ll = 56, Hn = 180, zl = 56, Ul = 150, ql = 44, Vn = 250, Gn = 100;
function Fl(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((d) => t.get(d)).filter(Boolean), a = o.length ? 1 + Math.max(...o.map(n)) : 0;
    return i.delete(s.id), a;
  };
  return n(e);
}
function Bl(e, t) {
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
function Wl(e, t) {
  const i = [], n = [], s = /* @__PURE__ */ new Set(), o = (d) => {
    var c;
    return (c = e.modules.flatMap((p) => p.useCases ?? []).find((p) => p.id === d)) == null ? void 0 : c.name;
  };
  let a = 140;
  return (e.workflows ?? []).forEach((d) => {
    var f;
    const c = new Map(d.steps.map((k) => [k.id, k])), p = new Map(d.steps.map((k) => [k.id, Fl(k, c)])), g = /* @__PURE__ */ new Map();
    for (const k of d.steps) {
      const A = p.get(k.id) ?? 0;
      g.set(A, (g.get(A) ?? 0) + 1);
    }
    const m = Math.max(1, ...g.values()), y = Bl(e, d);
    if (y && !s.has(y.id)) {
      s.add(y.id);
      const k = t[y.id] ?? { x: 140, y: a };
      i.push({
        id: y.id,
        label: y.label,
        x: k.x,
        y: k.y,
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
    }), y && n.push({
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
    for (const k of d.steps) {
      const A = p.get(k.id) ?? 0;
      u = Math.max(u, A);
      const R = r.get(A) ?? 0;
      r.set(A, R + 1);
      const T = t[k.id] ?? {
        x: h.x + (A + 1) * Vn,
        y: a + (R - (g.get(A) - 1) / 2) * Gn
      }, x = o(k.targetUseCaseId);
      i.push({
        id: k.id,
        label: k.name,
        x: T.x,
        y: T.y,
        w: Hn,
        h: zl,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: x ? `→ ${x}` : "∅ sin use case",
        tooltip: `${k.name}${k.emittedEventName ? ` · emite ${k.emittedEventName}` : ""}${x ? ` · lanza ${x}` : ""}${k.completionEventName ? ` · espera ${k.completionEventName}` : ""}`
      });
      const w = (k.dependsOnStepIds ?? []).filter((P) => c.has(P));
      w.length === 0 && n.push({
        id: `wfs:${d.id}:${k.id}`,
        sourceId: d.id,
        targetId: k.id,
        kind: "workflow-start",
        label: k.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const P of w)
        n.push({
          id: `wfdep:${P}->${k.id}`,
          sourceId: P,
          targetId: k.id,
          kind: "workflow-dependency",
          label: k.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${k.name} espera a ${((f = c.get(P)) == null ? void 0 : f.name) ?? P}`
        });
    }
    if (d.onCompletionEventName) {
      const k = `done:${d.id}`, A = t[k] ?? { x: h.x + (u + 2) * Vn, y: a };
      i.push({
        id: k,
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
      const R = new Set(d.steps.flatMap((x) => x.dependsOnStepIds ?? [])), T = d.steps.filter((x) => !R.has(x.id));
      for (const x of T.length ? T : [])
        n.push({
          id: `wfd:${d.id}:${x.id}`,
          sourceId: x.id,
          targetId: k,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      d.steps.length || n.push({
        id: `wfd:${d.id}`,
        sourceId: d.id,
        targetId: k,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    a += Math.max(2, m + 1) * Gn + 60;
  }), { nodes: i, edges: n };
}
const jn = 250, Ge = 30, si = 6, Hl = 16, Yn = 190, Vl = 60, Gl = 170, oi = 44;
function jl(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function ge(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Yl(e) {
  const t = [], i = (n, s, o) => {
    for (const a of n ?? []) {
      const d = [...s, a.label];
      t.push({ entry: a, path: d, depth: o }), i(a.children ?? [], d, o + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Kl(e, t) {
  var k, A, R, T;
  const i = [], n = [], s = e.uiApps ?? [], o = e.pages ?? [], a = (x) => {
    var w;
    return ((w = e.modules.flatMap((P) => P.useCases ?? []).find((P) => P.id === x)) == null ? void 0 : w.name) ?? x;
  }, d = (x) => {
    var w;
    return ((w = e.modules.flatMap((P) => P.queryServices ?? []).find((P) => P.id === x)) == null ? void 0 : w.name) ?? x;
  }, c = /* @__PURE__ */ new Map();
  let p = 160;
  for (const x of s) {
    const w = Yl(x), P = Math.max(
      90,
      54 + w.length * (Ge + si)
    ), U = t[x.id] ?? { x: 190, y: p + P / 2 };
    p = U.y + P / 2 + 70;
    const D = x.type ?? "APP";
    i.push({
      id: x.id,
      label: x.title || x.name,
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
      tooltip: D === "ORCHESTRATOR" ? `${x.name} — orquesta y mantiene estado; solo enseña páginas hijas` : D === "MASTER_DETAIL" ? `${x.name} — cabecera + pestañas (ambas son páginas)` : `App: ${x.name}`
    }), x.modelId && (c.set(x.modelId, {
      label: ((k = (e.models ?? []).find((q) => q.id === x.modelId)) == null ? void 0 : k.name) ?? x.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), n.push({
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
    for (const [q, le, I, S, v] of [
      [x.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [x.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      q && n.push({
        id: `${le === "app-view" ? "appview" : "appedit"}:${x.id}->${q}`,
        sourceId: x.id,
        targetId: q,
        kind: le,
        color: S,
        label: I,
        arrow: !0,
        tooltip: v
      });
    const z = x.homePageId ?? x.homeAppId;
    z && n.push({
      id: `apphome:${x.id}->${z}`,
      sourceId: x.id,
      targetId: z,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: x.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), D === "MASTER_DETAIL" && x.headerPageId && n.push({
      id: `appheader:${x.id}->${x.headerPageId}`,
      sourceId: x.id,
      targetId: x.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let L = U.y - P / 2 + 34 + 10 + Ge / 2;
    for (const { entry: q, path: le, depth: I } of w) {
      const S = jl(x.id, q, le), v = I * Hl;
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
        fill: (R = q.children) != null && R.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: x.id,
        tooltip: (T = q.children) != null && T.length ? "Agrupador (con submenú): no puede abrir nada" : q.pageId ? `Abre ${q.pageId}` : q.uiAdapterId ? `Abre la app ${q.uiAdapterId}` : q.useCaseId ? `Lanza ${q.useCaseId}` : q.aggregateId ? `CRUD inferido sobre ${q.aggregateId}` : q.queryOperationId ? `Listado con filtros de ${q.queryOperationId}` : "Entrada de menú sin destino"
      }), L += Ge + si, q.uiAdapterId && s.some((b) => b.id === q.uiAdapterId) && n.push({
        id: `menuapp:${S}->${q.uiAdapterId}`,
        sourceId: S,
        targetId: q.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), q.useCaseId && e.modules.some((_) => (_.useCases ?? []).some(($) => $.id === q.useCaseId)) && (c.set(q.useCaseId, {
        label: a(q.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), n.push({
        id: `menuuc:${S}->${q.useCaseId}`,
        sourceId: S,
        targetId: q.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), q.aggregateId && (e.aggregates ?? []).some((b) => b.id === q.aggregateId)) {
        const b = (e.aggregates ?? []).find((_) => _.id === q.aggregateId);
        c.set(b.id, { label: b.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), n.push({
          id: `menuagg:${S}->${b.id}`,
          sourceId: S,
          targetId: b.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (q.queryOperationId) {
        const b = e.modules.flatMap(($) => $.queryServices ?? []).find(($) => $.id === q.queryServiceId), _ = ((b == null ? void 0 : b.operations) ?? []).find(($) => $.id === q.queryOperationId);
        b && _ && (c.set(_.id, {
          label: `${_.name} (${b.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), n.push({
          id: `menuqop:${S}->${_.id}`,
          sourceId: S,
          targetId: _.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      q.pageId && o.some((b) => b.id === q.pageId) && n.push({
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
  const m = (x) => {
    var w;
    return ((w = o.find((P) => P.id === x)) == null ? void 0 : w.name) ?? x;
  };
  for (const x of o) {
    const w = t[x.id] ?? { x: 640, y: g }, P = x.type === "WIZARD" ? x.wizardSteps ?? [] : [], U = P.length ? 54 + P.length * (Ge + si) : Vl;
    g = w.y + U + 90, i.push({
      id: x.id,
      label: x.name,
      x: w.x,
      y: w.y,
      w: Yn,
      h: U,
      kind: "page",
      symbol: "interface",
      badge: x.type ?? "PAGE",
      container: P.length > 0,
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
    let D = w.y - U / 2 + 34 + 10 + Ge / 2;
    P.forEach((z, L) => {
      const q = z.id ?? z.pageId ?? String(L);
      i.push({
        id: `wizrow:${x.id}:${q}`,
        label: `${L + 1}. ${z.label ?? (z.pageId ? m(z.pageId) : "Paso")}${z.pageId ? "" : " ⌁"}`,
        x: w.x,
        y: D,
        w: Yn - 20,
        h: Ge,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: z.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: x.id,
        tooltip: z.pageId ? `Paso ${L + 1}: ${m(z.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${L + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), D += Ge + si;
    });
    for (const [z, L, q, le] of [
      [x.crudDetailPageId ?? x.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [x.crudCreatePageId ?? x.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      z && n.push({
        id: `${L === "crud-detail" ? "cruddetail" : "crudnew"}:${x.id}->${z}`,
        sourceId: x.id,
        targetId: z,
        kind: L,
        color: le,
        label: q,
        dashed: !0,
        arrow: !0,
        tooltip: L === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let z = 0; z < (x.wizardSteps ?? []).length; z++) {
      const L = (x.wizardSteps ?? [])[z];
      if (!L.pageId) continue;
      const q = L.id ?? L.pageId;
      n.push({
        id: `wizstep:${x.id}:${q}`,
        sourceId: `wizrow:${x.id}:${q}`,
        targetId: L.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${z + 1} — Supr desmapea`
      });
    }
    x.modelId && (c.set(x.modelId, {
      label: x.modelName ?? x.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), n.push({
      id: `pgmodel:${x.id}->${x.modelId}`,
      sourceId: x.id,
      targetId: x.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const z of x.buttons ?? [])
      z.useCaseId && (c.set(z.useCaseId, {
        label: a(z.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), n.push({
        id: `pgbtn:${x.id}->${z.useCaseId}`,
        sourceId: x.id,
        targetId: z.useCaseId,
        kind: "page-button",
        label: z.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: z.mappingId ? `Botón «${z.label}» — mapping ${z.mappingId}` : `Botón «${z.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    x.listingQueryServiceId && (c.set(x.listingQueryServiceId, {
      label: d(x.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), n.push({
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
  let y = 160;
  for (const x of e.models ?? [])
    c.has(x.id) || c.set(x.id, { label: x.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [x, w] of c) {
    const P = t[x] ?? { x: 1050, y };
    y = P.y + oi + 46, i.push({
      id: x,
      label: w.label,
      x: P.x,
      y: P.y,
      w: Gl,
      h: oi,
      kind: w.kind,
      symbol: w.symbol,
      fill: "#ffffff",
      stroke: w.stroke
    });
  }
  let h = 120;
  for (const x of e.identityProviders ?? []) {
    const w = t[x.id] ?? { x: -320, y: h };
    h = w.y + 70 + 40, i.push({
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
  for (const x of s)
    x.identityProviderId && (e.identityProviders ?? []).some((w) => w.id === x.identityProviderId) && n.push({
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
  const r = (e.actorAppUses ?? []).filter(
    (x) => s.some((w) => w.id === x.appId) && (e.actors ?? []).some((w) => w.id === x.actorId)
  ), u = [...new Set(r.map((x) => x.actorId))];
  let f = 160;
  for (const x of u) {
    const w = (e.actors ?? []).find((U) => U.id === x), P = t[x] ?? { x: -60, y: f };
    f = P.y + oi + 46, i.push({
      id: x,
      label: w.name,
      x: P.x,
      y: P.y,
      w: 150,
      h: oi,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const x of r)
    n.push({
      id: `actorapp:${x.actorId}->${x.appId}`,
      sourceId: x.actorId,
      targetId: x.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  return { nodes: i, edges: n };
}
const Xl = 168, Ql = 48;
function Zl(e, t) {
  const i = [], n = [], s = e.models ?? [], o = e.modelMappings ?? [], a = (m) => {
    var y;
    return ((y = s.find((h) => h.id === m)) == null ? void 0 : y.name) ?? m ?? "?";
  };
  s.forEach((m, y) => {
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
    !m.sourceModelId || !m.targetModelId || !d.has(m.sourceModelId) || !d.has(m.targetModelId) || n.push({
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
        c.has(r) || g.has(r) || (g.add(r), !(!d.has(m.modelId) || !d.has(h.inputModelId)) && n.push({
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
  return { nodes: i, edges: n };
}
async function Jl(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((c) => c.e), n = new i(), o = {
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
  }, a = await n.layout(o), d = {};
  for (const c of a.children ?? [])
    d[c.id] = {
      x: (c.x ?? 0) + (c.width ?? 0) / 2,
      y: (c.y ?? 0) + (c.height ?? 0) / 2
    };
  return d;
}
var ec = Object.defineProperty, tc = Object.getOwnPropertyDescriptor, Le = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? tc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && ec(t, i, s), s;
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
let Se = class extends Ne {
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
      const n = e.shiftKey || this._space || e.button === 1, s = n ? null : this.plateAt(e);
      this._drag = {
        mode: s ? "node" : n ? "pan" : "orbit",
        x: e.clientX,
        y: e.clientY,
        rx: this._rx,
        rz: this._rz,
        pan: { ...this._pan },
        nodeId: s == null ? void 0 : s.dataset.nodeId,
        nodeKind: s == null ? void 0 : s.dataset.kind,
        moved: !1
      };
    }, this.onMove = (e) => {
      var n, s;
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, i = e.clientY - this._drag.y;
      if (this._drag.mode === "connect" && this._connect) {
        const o = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - o.left, y2: e.clientY - o.top };
        const a = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), d = (s = a == null ? void 0 : a.closest) == null ? void 0 : s.call(a, ".n3"), c = (d == null ? void 0 : d.dataset.nodeId) ?? null;
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
          const i = (t = this._connect) == null ? void 0 : t.sourceId, n = this._hoverTargetId;
          this._connect = null, this._hoverTargetId = null, i && n && n !== i && this.emit("connect-requested", { sourceId: i, targetId: n });
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
      var n, s;
      const t = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), i = ((s = t == null ? void 0 : t.closest) == null ? void 0 : s.call(t, ".n3")) ?? this.plateAt(e);
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
    const i = e / this._kUsed, n = t / this._kUsed / Math.cos(this._rx * Math.PI / 180), s = this._rz * Math.PI / 180;
    return {
      x: i * Math.cos(s) + n * Math.sin(s),
      y: -i * Math.sin(s) + n * Math.cos(s)
    };
  }
  /** The plate under a client point, if any (drops arrive as plain mouse coords). */
  nodeIdAtClient(e, t) {
    var n, s, o;
    const i = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e, t);
    return ((o = (s = i == null ? void 0 : i.closest) == null ? void 0 : s.call(i, ".n3")) == null ? void 0 : o.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), n = i.width * 0.5, s = i.height * 0.42, o = new DOMMatrix();
    o.m34 = -1 / 1600;
    const a = new DOMMatrix().translate(n, s).multiply(o).translate(-n, -s).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), d = a.transformPoint(new DOMPoint(0, 0, 0, 1)), c = a.transformPoint(new DOMPoint(1, 0, 0, 0)), p = a.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - i.left, m = t - i.top, y = c.x - g * c.w, h = p.x - g * p.w, r = c.y - m * c.w, u = p.y - m * p.w, f = g * d.w - d.x, k = m * d.w - d.y, A = y * u - h * r;
    return A ? { x: (f * u - h * k) / A, y: (y * k - f * r) / A } : { ...this._center };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((n) => [n.id, n])), t = /* @__PURE__ */ new Map(), i = (n) => {
      const s = t.get(n.id);
      if (s !== void 0) return s;
      const o = n.parentId ? e.get(n.parentId) : void 0, a = o ? i(o) + 1 : 0;
      return t.set(n.id, a), a;
    };
    for (const n of this.scene.nodes) i(n);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return E`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((f) => [f.id, f])), n = Math.min(...e.map((f) => f.x - f.w / 2)) - 60, s = Math.max(...e.map((f) => f.x + f.w / 2)) + 60, o = Math.min(...e.map((f) => f.y - f.h / 2)) - 60, a = Math.max(...e.map((f) => f.y + f.h / 2)) + 60, d = (n + s) / 2, c = (o + a) / 2, p = this.getBoundingClientRect(), g = p.width ? Math.min(p.width / (s - n), p.height / (a - o), 1) * 0.9 : 0.5, m = this._k * g;
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
            style="left: ${n}px; top: ${o}px"
            width=${s - n}
            height=${a - o}
            viewBox="${n} ${o} ${s - n} ${a - o}"
          >
            ${this.scene.edges.map((f) => {
      const k = i.get(f.sourceId), A = i.get(f.targetId);
      return !k || !A ? "" : J`<line
                x1=${r(k)} y1=${u(k)} x2=${r(A)} y2=${u(A)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((f) => {
      const k = i.get(f.sourceId), A = i.get(f.targetId);
      if (!k || !A) return "";
      const R = (t.get(k.id) ?? 0) * y + 2, T = (t.get(A.id) ?? 0) * y + 2, x = r(A) - r(k), w = u(A) - u(k), P = T - R, U = Math.hypot(x, w), D = Math.hypot(U, P), z = Math.atan2(w, x) * 180 / Math.PI, L = Math.atan2(P, U) * 180 / Math.PI, q = f.color ?? "#64748b", le = f.dashed ? `repeating-linear-gradient(90deg, ${q} 0 6px, transparent 6px 10px)` : q;
      return E`<div
              class="edge3"
              style="
                left: ${r(k)}px; top: ${u(k)}px; width: ${D}px; height: 1.7px;
                transform: translateZ(${R}px) rotateZ(${z}deg) rotateY(${-L}deg);
                background: ${le};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((f) => {
      const k = t.get(f.id) ?? 0, A = f.container || k === 0, R = this._hoverTargetId === f.id;
      return E`
              <div
                class="n3 ${f.container ? "container3" : ""} ${this.selectedId === f.id ? "selected3" : ""} ${R ? "hover3" : ""}"
                data-node-id=${f.id}
                data-kind=${f.kind}
                title=${f.tooltip ?? f.label}
                style="
                  left: ${r(f) - f.w / 2}px; top: ${u(f) - f.h / 2}px;
                  width: ${f.w}px; height: ${f.h}px;
                  transform: translateZ(${k * y + (R ? 8 : 0)}px)${R ? " scale(1.06)" : ""};
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
      const k = (t.get(f.id) ?? 0) * y + 4;
      return [
        [r(f) + f.w / 2, u(f)],
        [r(f) - f.w / 2, u(f)],
        [r(f), u(f) + f.h / 2],
        [r(f), u(f) - f.h / 2]
      ].map(
        ([R, T]) => E`<div
                class="h3"
                data-source-id=${f.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${R}px; top: ${T}px; transform: translateZ(${k}px)"
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
Se.styles = ct`
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
  pt("modux-tilt")
], Se);
var nc = Object.defineProperty, sc = Object.getOwnPropertyDescriptor, he = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? sc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && nc(t, i, s), s;
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
let ae = class extends Ne {
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
    var n;
    let t = null;
    const i = (s) => {
      for (const o of s ?? [])
        o.id === e && (t = o), i(o.children);
    };
    return i((n = this.page) == null ? void 0 : n.content), t;
  }
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var n;
    let t = null;
    const i = (s, o) => {
      for (const a of s ?? [])
        a.id === e && (t = o), i(a.children, a);
    };
    return i((n = this.page) == null ? void 0 : n.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var o;
    let i = !1;
    const n = (a) => {
      a.id === e && (i = !0);
      for (const d of a.children ?? []) n(d);
    }, s = (a) => {
      for (const d of a ?? [])
        d.id === t ? n(d) : s(d.children);
    };
    return s((o = this.page) == null ? void 0 : o.content), i;
  }
  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  nextSiblingOf(e) {
    var s;
    const t = this.parentOf(e), i = t ? t.children ?? [] : ((s = this.page) == null ? void 0 : s.content) ?? [], n = i.findIndex((o) => o.id === e);
    return n >= 0 ? i[n + 1] ?? null : null;
  }
  /** Sibling slot vs inside, from where the pointer is over the node's box. */
  dropPosFor(e, t) {
    if (e.kind === "tab") return "into";
    const i = t.currentTarget.getBoundingClientRect(), n = (t.clientY - i.top) / Math.max(1, i.height);
    return ae.LEAF_KINDS.has(e.kind) ? n < 0.5 ? "before" : "after" : n < 0.2 ? "before" : n > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var s;
    if (t === "into" && e.kind === "tabLayout") {
      const o = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((o == null ? void 0 : o.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const a = (e.children ?? []).filter((c) => c.kind === "tab"), d = a.find((c) => c.id === this._activeTabs[e.id]) ?? a[0];
      d && (e = d);
    }
    if (t === "into" && !ae.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), n = t === "after" ? ((s = this.nextSiblingOf(e.id)) == null ? void 0 : s.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: n };
  }
  onCmpDrop(e, t, i) {
    var o, a;
    const n = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !n) {
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
    if (n === e.id || this.isWithin(e.id, n)) return;
    const s = this.slotFor(e, t);
    s.beforeComponentId !== n && this.emitEvent("component-moved", { componentId: n, ...s });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var c, p, g;
    const t = e.children ?? [], i = (m) => m.map((y) => this.renderComponent(y)), n = E`<div class="placeholder">suelta componentes aquí</div>`;
    let s;
    switch (e.kind) {
      case "horizontalLayout":
        s = E`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "splitLayout": {
        const m = t.slice(0, Math.ceil(t.length / 2)), y = t.slice(Math.ceil(t.length / 2));
        s = E`<div class="row-lay">
          <div class="col-lay">${m.length ? i(m) : n}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${y.length ? i(y) : n}</div>
        </div>`;
        break;
      }
      case "formLayout":
        s = E`<div class="grid-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        s = E`<div class="grid3-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "tabLayout": {
        const m = t.filter((h) => h.kind === "tab"), y = m.find((h) => h.id === this._activeTabs[e.id]) ?? m[0];
        s = E`
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
            var f, k;
            u.stopPropagation(), this._dragCmpId = h.id, (k = u.dataTransfer) == null || k.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (f = this.page) == null ? void 0 : f.id, componentId: h.id })
            );
          }}
                @dragover=${(u) => {
            var f;
            ((f = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : f.kind) === "tab" && (u.preventDefault(), u.stopPropagation());
          }}
                @drop=${(u) => {
            var T, x;
            const f = this._dragCmpId;
            if (!f || f === h.id || ((T = this.nodeById(f)) == null ? void 0 : T.kind) !== "tab") return;
            u.preventDefault(), u.stopPropagation();
            const k = u.currentTarget.getBoundingClientRect(), R = u.clientX - k.left < k.width / 2 ? h.id : ((x = m[r + 1]) == null ? void 0 : x.id) ?? null;
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
          ${y ? this.renderComponent(y) : n}`;
        break;
      }
      case "tab":
        s = E`<div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "accordionLayout":
        s = E`<div class="col-lay">
          ${t.length ? t.map(
          (m, y) => E`
                  <div class="acc-bar"><span>${m.title ?? m.label ?? "Sección"}</span><span>${y === 0 ? "▾" : "▸"}</span></div>
                  ${y === 0 ? this.renderComponent(m) : ie}
                `
        ) : n}
        </div>`;
        break;
      case "card":
        s = E`<div class="card-box">
          ${e.title ? E`<div class="card-title">${e.title}</div>` : ie}
          <div class="col-lay">${t.length ? i(t) : n}</div>
        </div>`;
        break;
      case "boardLayout":
        s = E`<div class="grid3-lay">
          ${t.length ? t.map((m) => E`<div class="board-col">${this.renderComponent(m)}</div>`) : n}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [m, ...y] = t;
        s = E`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${m ? this.renderComponent(m) : E`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${y.length ? i(y) : E`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        s = E`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "carouselLayout":
        s = E`<div class="row-lay">${t.length ? i(t) : n}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        s = E`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : n}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const y = e.modelId && e.modelId === ((c = this.page) == null ? void 0 : c.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        s = y.length ? E`<div class="grid-lay">
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
        s = E`<table>
            <tr>${m.length ? m.map((y) => E`<th>${y.label ?? y.name}</th>`) : E`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => E`<tr>${(m.length ? m : [1, 2, 3]).map(() => E`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? ie : E`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        s = E`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const m = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        s = E`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(m)}`;
        break;
      }
      case "text":
        s = E`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        s = E`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        s = E`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        s = E`<div class="col-lay">${t.length ? i(t) : n}</div>`;
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
      ${s}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, i) {
    return E`
        ${i ? E`<table>
              <tr>${t.slice(0, 4).map((n) => E`<th>${n.label ?? n.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => E`<tr>${t.slice(0, 4).map(() => E`<td>···</td>`)}</tr>`)}
            </table>` : ie}
        ${t.length ? E`<div class="grid">
              ${t.map(
      (n) => E`
                  <div
                    class="field ${n.colspan === 2 ? "span2" : ""} ${this._overId === n.fieldId ? "dropping" : ""}"
                    draggable="true"
                    data-field-id=${n.fieldId}
                    title="Click: editar declaración · arrastra para reordenar"
                    @click=${() => this.onFieldClick(n)}
                    @dragstart=${(s) => {
        s.stopPropagation(), this._dragId = n.fieldId;
      }}
                    @dragover=${(s) => {
        s.preventDefault(), this._overId = n.fieldId;
      }}
                    @dragleave=${() => this._overId = null}
                    @drop=${(s) => {
        s.preventDefault(), s.stopPropagation(), this.onDrop(n.fieldId);
      }}
                  >
                    <label>${n.label ?? n.name}</label>
                    ${this.control(n)}
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
    var s, o, a, d;
    const e = this._cmp;
    if (!e) return ie;
    const t = (c) => this._cmp = { ...this._cmp, ...c }, i = e.kind, n = [
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
      ${n ? E`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(c) => t({ title: c.target.value })} />` : ie}
      ${i === "text" ? E`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(c) => t({ text: c.target.value })} />` : ie}
      ${i === "button" || i === "field" ? E`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(c) => t({ label: c.target.value })} />` : ie}
      ${i === "button" ? E`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? E`<span class="chip">${((s = this.useCases.find((c) => c.id === e.useCaseId)) == null ? void 0 : s.name) ?? e.useCaseId}</span>
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
    const i = (this.page.viewmodelFields ?? []).map((o) => o.fieldId), n = i.indexOf(t), s = i.indexOf(e);
    n < 0 || s < 0 || (i.splice(s, 0, ...i.splice(n, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return ie;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId, n = e.type === "WIZARD";
    return E`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? E`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(s) => this._rename = s.target.value}
              @keydown=${(s) => {
      s.key === "Enter" && this.applyRename(), s.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : E`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        <select
          class="type"
          title="Tipo de página: Página (el contenido decide), CRUD (listado + ficha) o Wizard (pasos)"
          @change=${(s) => this.emitEvent("page-type-changed", { pageType: s.target.value })}
        >
          ${(() => {
      const s = e.type ?? "PAGE", o = [
        ["PAGE", "Página"],
        ["CRUD", "CRUD"],
        ["WIZARD", "Wizard"]
      ];
      return s === "FORM" && o.splice(1, 0, ["FORM", "Form (legado)"]), s === "DASHBOARD" && o.push(["DASHBOARD", "Dashboard (legado)"]), o.map(
        ([a, d]) => E`<option value=${a} ?selected=${s === a}>${d}</option>`
      );
    })()}
        </select>
        ${this._route !== null ? E`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(s) => this._route = s.target.value}
              @keydown=${(s) => {
      s.key === "Enter" && this.applyRoute(), s.key === "Escape" && (this._route = null);
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
        ${(e.buttons ?? []).filter((s) => (s.bar ?? "toolbar") === "toolbar").map(
      (s) => E`<span
            class="btn"
            data-btn-uc=${s.useCaseId ?? ""}
            title=${s.mappingId ? `${s.useCaseId} · mapping ${s.mappingId}` : `${s.useCaseId ?? ""} — suelta un mapeado del Catálogo para transformar el viewmodel`}
            @click=${() => this._btn = {
        useCaseId: s.useCaseId ?? "",
        label: s.label ?? "",
        mappingId: s.mappingId ?? "",
        bar: s.bar ?? "toolbar"
      }}
            >${s.label}</span
          >`
    )}
        ${(e.buttons ?? []).some((s) => (s.bar ?? "toolbar") === "toolbar") ? ie : E`<span class="zoneph">suelta un caso de uso aquí</span>`}
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
        ${n ? E`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((s, o) => {
      const a = (e.wizardSteps ?? []).map((c, p) => c.id ?? c.pageId ?? String(p)), d = a[o];
      return E`<span
                      class=${o === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${o + 1}${s.pageId ? "" : " (sin página)"} — arrastra para reordenar"
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
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[o] ?? `${o + 1}.`} ${s.label ?? "Paso"}${s.pageId ? "" : " ⌁"}</span
                    >`;
    }) : E`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : ie}
        ${(e.content ?? []).length ? E`<div class="col-lay">${(e.content ?? []).map((s) => this.renderComponent(s))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((s) => s.bar === "bottom").map(
      (s) => E`<span
              class="btn"
              data-btn-uc=${s.useCaseId ?? ""}
              title=${s.mappingId ? `${s.useCaseId} · mapping ${s.mappingId}` : `${s.useCaseId ?? ""} — suelta un mapeado del Catálogo para transformar el viewmodel`}
              @click=${() => this._btn = {
        useCaseId: s.useCaseId ?? "",
        label: s.label ?? "",
        mappingId: s.mappingId ?? "",
        bar: "bottom"
      }}
              >${s.label}</span
            >`
    )}
        ${(e.buttons ?? []).some((s) => s.bar === "bottom") ? ie : E`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var o, a, d;
      const s = (((o = this.page) == null ? void 0 : o.buttons) ?? []).some((c) => c.useCaseId === this._btn.useCaseId);
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
                ${s ? E`<button
                      @click=${() => {
        const c = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: c });
      }}
                    >
                      Quitar
                    </button>` : ie}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(s)}>Aplicar</button>
              </div>
            </div>`;
    })() : ie}
      ${this._editing ? E`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(s) => this._editing = { ...this._editing, stereotype: s.target.value }}
            >
              ${Kn.map(
      (s) => E`<option value=${s} ?selected=${s === this._editing.stereotype}>${s}</option>`
    )}
            </select>
            <label>Ancho</label>
            <select
              @change=${(s) => this._editing = { ...this._editing, colspan: Number(s.target.value) }}
            >
              <option value="1" ?selected=${this._editing.colspan !== 2}>media columna</option>
              <option value="2" ?selected=${this._editing.colspan === 2}>fila entera</option>
            </select>
            <label>Etiqueta</label>
            <input
              style="grid-column: 2 / -1"
              placeholder="(el nombre del campo)"
              .value=${this._editing.label}
              @input=${(s) => this._editing = { ...this._editing, label: s.target.value }}
            />
            <div class="actions">
              <button @click=${() => this._editing = null}>Cancelar</button>
              <button class="ok" @click=${this.applyEdit}>Aplicar</button>
            </div>
          </div>` : ie}
    `;
  }
};
ae.styles = ct`
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
  pt("modux-page-designer")
], ae);
var oc = Object.defineProperty, ac = Object.getOwnPropertyDescriptor, _e = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? ac(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && oc(t, i, s), s;
};
const Bs = 460, rc = 540, dc = 660;
let ve = class extends Ne {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((s) => {
        var o;
        return (o = s.classList) == null ? void 0 : o.contains("frame-grip");
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
      const n = t.find((s) => {
        var o;
        return (o = s.classList) == null ? void 0 : o.contains("frame-title");
      });
      if (n) {
        const o = n.closest(".frame").dataset.pageId;
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
      if (!t.some((s) => s.tagName === "MODUX-PAGE-DESIGNER")) {
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
      const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, s = e.deltaY < 0 ? 1.1 : 1 / 1.1, o = Math.max(0.2, Math.min(2.5, this._t.k * s));
      this._t = {
        k: o,
        x: i - (i - this._t.x) / this._t.k * o,
        y: n - (n - this._t.y) / this._t.k * o
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
    const i = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), n = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, ".frame");
    if (!n) return null;
    const s = n.dataset.pageId, o = n.querySelector("modux-page-designer"), a = (y = o == null ? void 0 : o.shadowRoot) == null ? void 0 : y.elementFromPoint(e, t), d = (h = a == null ? void 0 : a.closest) == null ? void 0 : h.call(a, "[data-btn-uc]");
    if (d != null && d.dataset.btnUc) return `btn:${s}:${d.dataset.btnUc}`;
    const c = (r = a == null ? void 0 : a.closest) == null ? void 0 : r.call(a, "[data-bar]");
    if (c != null && c.dataset.bar) return `bar:${s}:${c.dataset.bar}`;
    const p = (u = a == null ? void 0 : a.closest) == null ? void 0 : u.call(a, "[data-cmp-id]");
    return p ? `cmp:${s}:${p.dataset.cmpId}` : s;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var y, h, r, u;
    const i = (y = this.shadowRoot) == null ? void 0 : y.elementFromPoint(e, t), n = (h = i == null ? void 0 : i.closest) == null ? void 0 : h.call(i, ".frame");
    if (!n) return null;
    const s = n.dataset.pageId, o = n.querySelector("modux-page-designer"), a = (r = o == null ? void 0 : o.shadowRoot) == null ? void 0 : r.elementFromPoint(e, t), d = (u = a == null ? void 0 : a.closest) == null ? void 0 : u.call(a, "[data-cmp-id]");
    if (!d) return { pageId: s, componentId: null, pos: "into" };
    const c = d.dataset.cmpKind ?? "", p = d.getBoundingClientRect(), g = (t - p.top) / Math.max(1, p.height), m = ae.LEAF_KINDS.has(c) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: s, componentId: d.dataset.cmpId, pos: m };
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
      var s;
      const i = this.posOf(e.id, t), n = this.sizeOf(e.id);
      return E`
            <div
              class="frame ${this.selectedId === e.id || this.selectedIds.includes(e.id) ? "selected" : ""}"
              data-page-id=${e.id}
              style="left: ${i.x}px; top: ${i.y}px; width: ${n.w}px"
            >
              <div class="frame-title">
                ${e.name}
                <span class="route">${e.route ?? ""} · ${e.type ?? "PAGE"}</span>
              </div>
              <modux-page-designer
                framed
                style="height: ${n.h}px; width: ${n.w}px"
                .page=${e}
                .selectedCmpId=${((s = this.selectedCmp) == null ? void 0 : s.pageId) === e.id ? this.selectedCmp.componentId : null}
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
ve.styles = ct`
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
_e([
  se({ attribute: !1 })
], ve.prototype, "pages", 2);
_e([
  se({ attribute: !1 })
], ve.prototype, "layout", 2);
_e([
  se({ attribute: !1 })
], ve.prototype, "sizes", 2);
_e([
  se({ attribute: !1 })
], ve.prototype, "selectedId", 2);
_e([
  se({ attribute: !1 })
], ve.prototype, "selectedIds", 2);
_e([
  se({ attribute: !1 })
], ve.prototype, "models", 2);
_e([
  se({ attribute: !1 })
], ve.prototype, "mappings", 2);
_e([
  se({ attribute: !1 })
], ve.prototype, "useCases", 2);
_e([
  se({ attribute: !1 })
], ve.prototype, "queryOps", 2);
_e([
  se({ attribute: !1 })
], ve.prototype, "selectedCmp", 2);
_e([
  F()
], ve.prototype, "_t", 2);
_e([
  F()
], ve.prototype, "_live", 2);
_e([
  F()
], ve.prototype, "_liveSize", 2);
ve = _e([
  pt("modux-figma")
], ve);
var lc = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, Ws = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? cc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && lc(t, i, s), s;
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
}, Qn = [30, 20, 13, 9.5, 7.5], Zn = [0, 180, 118, 80, 58], mc = 0.055, Jn = 0.86, hc = 2600, ai = 240, es = 0.16, ts = 0.015;
let lt = class extends Ne {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.raf = 0, this.t = 0, this.cam = { x: 0, y: 0, k: 1 }, this.panning = !1, this.downAt = { x: 0, y: 0 }, this.moved = !1, this.reducedMotion = !1, this.prevByKey = /* @__PURE__ */ new Map(), this.frame = 0;
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
      for (const n of i.children ?? []) t(n);
    };
    t(this.root);
    try {
      sessionStorage.setItem(lt.STORE_KEY, JSON.stringify({ cam: this.cam, nodes: e }));
    } catch {
    }
  }
  loadState() {
    try {
      const e = sessionStorage.getItem(lt.STORE_KEY);
      if (!e) return;
      const t = JSON.parse(e);
      t.cam && t.cam.k > 0 && (this.cam = t.cam);
      for (const [i, n] of Object.entries(t.nodes ?? {})) {
        const s = {
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
        this.prevByKey.has(i) || this.prevByKey.set(i, s);
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
    let t = 1 / 0, i = 1 / 0, n = -1 / 0, s = -1 / 0;
    for (const m of e)
      t = Math.min(t, m.x), i = Math.min(i, m.y), n = Math.max(n, m.x), s = Math.max(s, m.y);
    const o = 70, a = this.clientWidth || 800, d = this.clientHeight || 600, c = n - t + o * 2, p = s - i + o * 2, g = Math.min(1.5, Math.max(0.25, Math.min(a / c, d / p)));
    this.cam.k = g, this.cam.x = a / 2 - (t + n) / 2 * g, this.cam.y = d / 2 - (i + s) / 2 * g;
  }
  updated(e) {
    e.has("model") && this.buildTree();
  }
  resize() {
    var n;
    if (!this.canvas) return;
    const e = window.devicePixelRatio || 1, t = this.clientWidth || 800, i = this.clientHeight || 600;
    this.canvas.width = t * e, this.canvas.height = i * e, (n = this.ctx) == null || n.setTransform(e, 0, 0, e, 0, 0), this.cam.x === 0 && this.cam.y === 0 && (this.cam.x = t / 2, this.cam.y = i / 2);
  }
  // ── Tree construction (lazy children per node kind) ──────────────────
  buildTree() {
    this.root && this.rememberSubtree(this.root), this.root = this.makeNode("root", "root", "Sistema", 0, void 0), this.root.x = 0, this.root.y = 0, this.prevByKey.has(this.root.key) || (this.root.expanded = !0), this.materialize(this.root);
  }
  rememberSubtree(e) {
    this.prevByKey.set(e.key, e);
    for (const t of e.children ?? []) this.rememberSubtree(t);
  }
  makeNode(e, t, i, n, s) {
    const o = `${(s == null ? void 0 : s.key) ?? ""}/${e}:${t}`, a = this.prevByKey.get(o), d = () => (Math.random() - 0.5) * 10;
    return {
      key: o,
      refId: t,
      kind: e,
      label: i,
      color: pc[e] ?? "#64748b",
      depth: n,
      parent: s,
      expanded: (a == null ? void 0 : a.expanded) ?? !1,
      x: (a == null ? void 0 : a.x) ?? (s ? s.x + d() : 0),
      y: (a == null ? void 0 : a.y) ?? (s ? s.y + d() : 0),
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
    const t = this.model, i = e.depth + 1, n = (s, o, a) => this.makeNode(s, o, a, i, e);
    switch (e.kind) {
      case "root":
        return [
          ...t.modules.map((s) => n("module", s.id, s.name)),
          ...t.externalSystems.map((s) => n("external-system", s.id, s.name)),
          ...(t.uiApps ?? []).map((s) => n("ui-app", s.id, s.name)),
          ...(t.actors ?? []).map((s) => n("actor", s.id, s.name)),
          ...(t.aiAgents ?? []).filter((s) => !s.external).map((s) => n("ai-agent", s.id, s.name)),
          ...(t.workflows ?? []).map((s) => n("workflow", s.id, s.name)),
          ...(t.identityProviders ?? []).map((s) => n("identity-provider", s.id, s.name))
        ];
      case "module": {
        const s = t.modules.find((o) => o.id === e.refId);
        return s ? [
          ...(t.aggregates ?? []).filter((o) => o.moduleId === e.refId).map((o) => n("aggregate", o.id, o.name)),
          ...(s.useCases ?? []).map((o) => n(o.policy ? "policy" : "use-case", o.id, o.name)),
          ...(s.domainEvents ?? []).map((o) => n("domain-event", o.id, o.name)),
          ...(s.applicationEvents ?? []).map((o) => n("application-event", o.id, o.name)),
          ...(s.readModels ?? []).map((o) => n("read-model", o.id, o.name)),
          ...(s.domainServices ?? []).map((o) => n("domain-service", o.id, o.name)),
          ...(s.queryServices ?? []).map((o) => n("query-service", o.id, o.name)),
          ...(s.scheduledTriggers ?? []).map((o) => n("scheduled-trigger", o.id, o.name)),
          ...(t.etlFlows ?? []).filter((o) => o.ownerModuleId === e.refId).map((o) => n("etl-flow", o.id, o.name)),
          ...(t.notifications ?? []).filter((o) => o.ownerModuleId === e.refId).map((o) => n("notification", o.id, o.name)),
          ...(t.documents ?? []).filter((o) => o.ownerModuleId === e.refId).map((o) => n("document", o.id, o.name))
        ] : [];
      }
      case "aggregate":
        return (t.entities ?? []).filter((s) => s.aggregateId === e.refId).map((s) => n("entity", s.id, s.name));
      case "external-system": {
        const s = t.externalSystems.find((o) => o.id === e.refId);
        return s ? [
          ...(t.apis ?? []).filter((o) => o.publishedByExternalSystemId === e.refId).map((o) => n("api", o.id, o.name)),
          ...(s.useCases ?? []).map((o) => n("external-use-case", o.id, o.name)),
          ...(s.tables ?? []).map((o) => n("external-table", o.id, o.name)),
          ...(s.mcpServers ?? []).map((o) => n("mcp-server", o.id, o.name))
        ] : [];
      }
      case "api": {
        const s = (t.apis ?? []).find((o) => o.id === e.refId);
        return ((s == null ? void 0 : s.operations) ?? []).map((o) => n("api-operation", o.id, o.name));
      }
      case "ui-app": {
        const s = (t.uiApps ?? []).find((d) => d.id === e.refId);
        if (!s) return [];
        const o = /* @__PURE__ */ new Set(), a = (d) => {
          for (const c of d ?? [])
            c.pageId && o.add(c.pageId), a(c.children);
        };
        a(s.menuItems);
        for (const d of [s.headerPageId, s.homePageId, s.viewPageId, s.editPageId])
          d && o.add(d);
        return [...o].map((d) => (t.pages ?? []).find((c) => c.id === d)).filter((d) => !!d).map((d) => n("page", d.id, d.name));
      }
      default:
        return [];
    }
  }
  // ── Simulation ────────────────────────────────────────────────────────
  visible() {
    const e = [], t = (i) => {
      if (e.push(i), i.expanded) for (const n of i.children ?? []) t(n);
    };
    return this.root && t(this.root), e;
  }
  tick() {
    this.t += 1 / 60;
    const e = this.visible();
    this.step(e), this.draw(e), (this.frame = (this.frame + 1) % 60) === 0 && this.saveState(), this.raf = requestAnimationFrame(() => this.tick());
  }
  step(e) {
    var i;
    const t = this.t;
    for (const n of e) {
      if (n.parent) {
        const s = (Zn[Math.min(n.depth, Zn.length - 1)] ?? 60) + Math.min(60, ((((i = n.parent.children) == null ? void 0 : i.length) ?? 1) - 1) * 2.5);
        let o = n.x - n.parent.x, a = n.y - n.parent.y, d = Math.hypot(o, a);
        if (d < 0.01) {
          const m = Math.random() * Math.PI * 2;
          o = Math.cos(m) * 0.1, a = Math.sin(m) * 0.1, d = 0.1;
        }
        const c = mc * (d - s), p = o / d * c, g = a / d * c;
        n.vx -= p, n.vy -= g, n.parent.vx += p * 0.4, n.parent.vy += g * 0.4;
      } else
        n.vx -= n.x * ts, n.vy -= n.y * ts;
      this.reducedMotion || (n.vx += Math.sin(t * n.f1 * Math.PI * 2 + n.p1) * es, n.vy += Math.cos(t * n.f2 * Math.PI * 2 + n.p2) * es);
    }
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      for (let o = n + 1; o < e.length; o++) {
        const a = e[o], d = a.x - s.x, c = a.y - s.y;
        if (Math.abs(d) > ai || Math.abs(c) > ai) continue;
        const p = d * d + c * c;
        if (p > ai * ai || p < 0.01) continue;
        const g = Math.sqrt(p), m = s.depth <= 1 && a.depth <= 1 ? 3 : 1, y = hc * m / p, h = d / g * y, r = c / g * y;
        s.vx -= h, s.vy -= r, a.vx += h, a.vy += r;
      }
    }
    for (const n of e) {
      if (n === this.dragNode) {
        n.vx = 0, n.vy = 0;
        continue;
      }
      n.vx *= Jn, n.vy *= Jn;
      const s = Math.hypot(n.vx, n.vy);
      s > 14 && (n.vx = n.vx / s * 14, n.vy = n.vy / s * 14), n.x += n.vx, n.y += n.vy;
      const o = n === this.hover ? 1.75 : 1;
      n.scale += (o - n.scale) * 0.18;
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
    const i = this.clientWidth, n = this.clientHeight;
    t.clearRect(0, 0, i, n), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), t.lineWidth = 1.3 / this.cam.k;
    for (const a of e)
      a.parent && (t.strokeStyle = a.color + "55", t.beginPath(), t.moveTo(a.parent.x, a.parent.y), t.lineTo(a.x, a.y), t.stroke());
    const s = (a) => `${a}px system-ui, sans-serif`;
    for (const a of e) {
      const d = this.radiusOf(a);
      t.beginPath(), t.arc(a.x, a.y, d, 0, Math.PI * 2), t.fillStyle = a.expanded ? a.color + "22" : "#ffffff", t.fill(), t.lineWidth = (a === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = a.color, t.stroke(), this.drawGlyph(t, a, d);
      const c = ((o = a.children) == null ? void 0 : o.length) ?? 0;
      if (!a.expanded && c > 0) {
        const g = Math.max(7, d * 0.42), m = a.x + d * 0.75, y = a.y + d * 0.75;
        t.beginPath(), t.arc(m, y, g, 0, Math.PI * 2), t.fillStyle = a.color, t.fill(), t.fillStyle = "#ffffff", t.font = s(g * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(c), m, y + 0.5);
      }
      if (a.depth <= 1 || a === this.hover || this.cam.k > 0.65) {
        const g = a.label.length > 22 ? a.label.slice(0, 21) + "…" : a.label;
        t.font = a === this.hover ? `600 ${s(12)}` : s(a.depth <= 1 ? 12 : 10.5), t.fillStyle = a === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(g, a.x, a.y + d + 4);
      }
    }
    t.restore(), this.hover && this.drawCard(t, this.hover, i, n);
  }
  /** A tiny kind glyph inside the circle, so the tree reads without hovering. */
  drawGlyph(e, t, i) {
    const n = i * 0.42;
    if (n < 3.2) return;
    const { x: s, y: o } = t;
    switch (e.save(), e.strokeStyle = t.color, e.fillStyle = t.color, e.lineWidth = Math.max(1, n * 0.22), e.lineCap = "round", e.lineJoin = "round", e.beginPath(), t.kind) {
      case "root":
        e.arc(s, o, n, 0, Math.PI * 2), e.moveTo(s + n * 0.35, o), e.arc(s, o, n * 0.35, 0, Math.PI * 2), e.stroke();
        break;
      case "module":
        for (const [a, d] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(s + a * n + n * 0.3, o + d * n), e.arc(s + a * n, o + d * n, n * 0.3, 0, Math.PI * 2);
        e.fill();
        break;
      case "aggregate":
        e.moveTo(s, o - n), e.lineTo(s + n, o), e.lineTo(s, o + n), e.lineTo(s - n, o), e.closePath(), e.stroke();
        break;
      case "entity":
      case "external-table":
      case "read-model":
        e.rect(s - n, o - n * 0.8, n * 2, n * 1.6), e.moveTo(s - n, o - n * 0.25), e.lineTo(s + n, o - n * 0.25), e.stroke();
        break;
      case "use-case":
      case "external-use-case":
        e.moveTo(s - n * 0.6, o - n * 0.85), e.lineTo(s + n * 0.85, o), e.lineTo(s - n * 0.6, o + n * 0.85), e.closePath(), e.stroke();
        break;
      case "policy":
      case "domain-event":
      case "application-event":
        e.moveTo(s + n * 0.3, o - n), e.lineTo(s - n * 0.5, o + n * 0.15), e.lineTo(s + n * 0.05, o + n * 0.15), e.lineTo(s - n * 0.3, o + n), e.lineTo(s + n * 0.5, o - n * 0.15), e.lineTo(s - n * 0.05, o - n * 0.15), e.closePath(), e.stroke();
        break;
      case "domain-service":
      case "etl-flow": {
        e.arc(s, o, n * 0.5, 0, Math.PI * 2);
        for (let a = 0; a < 6; a++) {
          const d = a * Math.PI / 3;
          e.moveTo(s + Math.cos(d) * n * 0.55, o + Math.sin(d) * n * 0.55), e.lineTo(s + Math.cos(d) * n, o + Math.sin(d) * n);
        }
        e.stroke();
        break;
      }
      case "query-service":
        e.arc(s - n * 0.25, o - n * 0.25, n * 0.6, 0, Math.PI * 2), e.moveTo(s + n * 0.25, o + n * 0.25), e.lineTo(s + n, o + n), e.stroke();
        break;
      case "scheduled-trigger":
        e.arc(s, o, n, 0, Math.PI * 2), e.moveTo(s, o - n * 0.55), e.lineTo(s, o), e.lineTo(s + n * 0.45, o + n * 0.25), e.stroke();
        break;
      case "notification":
        e.moveTo(s - n * 0.85, o + n * 0.45), e.quadraticCurveTo(s - n * 0.85, o - n, s, o - n), e.quadraticCurveTo(s + n * 0.85, o - n, s + n * 0.85, o + n * 0.45), e.closePath(), e.moveTo(s + n * 0.25, o + n * 0.75), e.arc(s, o + n * 0.75, n * 0.25, 0, Math.PI), e.stroke();
        break;
      case "document":
        e.moveTo(s - n * 0.7, o - n), e.lineTo(s + n * 0.25, o - n), e.lineTo(s + n * 0.7, o - n * 0.55), e.lineTo(s + n * 0.7, o + n), e.lineTo(s - n * 0.7, o + n), e.closePath(), e.moveTo(s + n * 0.25, o - n), e.lineTo(s + n * 0.25, o - n * 0.55), e.lineTo(s + n * 0.7, o - n * 0.55), e.stroke();
        break;
      case "workflow":
        for (const a of [-0.7, 0.1])
          e.moveTo(s + a * n, o - n * 0.7), e.lineTo(s + (a + 0.6) * n, o), e.lineTo(s + a * n, o + n * 0.7);
        e.stroke();
        break;
      case "identity-provider":
        e.arc(s - n * 0.45, o - n * 0.45, n * 0.45, 0, Math.PI * 2), e.moveTo(s - n * 0.1, o - n * 0.1), e.lineTo(s + n * 0.9, o + n * 0.9), e.moveTo(s + n * 0.45, o + n * 0.45), e.lineTo(s + n * 0.85, o + n * 0.05), e.stroke();
        break;
      case "actor":
        e.arc(s, o - n * 0.5, n * 0.42, 0, Math.PI * 2), e.moveTo(s - n * 0.8, o + n), e.quadraticCurveTo(s, o - n * 0.1, s + n * 0.8, o + n), e.stroke();
        break;
      case "ai-agent":
        for (let a = 0; a < 4; a++) {
          const d = a * Math.PI / 2 + Math.PI / 4;
          e.moveTo(s, o), e.lineTo(s + Math.cos(d) * n, o + Math.sin(d) * n), e.moveTo(s, o), e.lineTo(s + Math.cos(d + Math.PI / 4) * n * 0.5, o + Math.sin(d + Math.PI / 4) * n * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(s - n * 0.45, o + n * 0.15, n * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(s + n * 0.1, o - n * 0.35, n * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(s + n * 0.55, o + n * 0.2, n * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [a, d] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(s + a * n, o + d * n, n * 0.85, n * 0.85);
        e.stroke();
        break;
      case "page":
        e.rect(s - n, o - n * 0.8, n * 2, n * 1.6), e.moveTo(s - n, o - n * 0.35), e.lineTo(s + n, o - n * 0.35), e.stroke(), e.beginPath(), e.arc(s - n * 0.7, o - n * 0.57, n * 0.09, 0, Math.PI * 2), e.fill();
        break;
      case "api":
        e.moveTo(s - n * 0.25, o - n), e.lineTo(s - n, o), e.lineTo(s - n * 0.25, o + n), e.moveTo(s + n * 0.25, o - n), e.lineTo(s + n, o), e.lineTo(s + n * 0.25, o + n), e.stroke();
        break;
      case "api-operation":
        e.moveTo(s - n, o), e.lineTo(s + n * 0.7, o), e.moveTo(s + n * 0.1, o - n * 0.5), e.lineTo(s + n * 0.8, o), e.lineTo(s + n * 0.1, o + n * 0.5), e.stroke();
        break;
      case "mcp-server":
        e.arc(s, o + n * 0.25, n * 0.6, 0, Math.PI), e.closePath(), e.moveTo(s - n * 0.35, o + n * 0.25), e.lineTo(s - n * 0.35, o - n * 0.7), e.moveTo(s + n * 0.35, o + n * 0.25), e.lineTo(s + n * 0.35, o - n * 0.7), e.stroke();
        break;
      default:
        e.arc(s, o, n * 0.3, 0, Math.PI * 2), e.fill();
    }
    e.restore();
  }
  /** Hover card: what the node is, what it holds, how to enter. Screen space, clamped to the canvas. */
  drawCard(e, t, i, n) {
    var A, R;
    const s = /* @__PURE__ */ new Map();
    for (const T of t.children ?? []) s.set(T.kind, (s.get(T.kind) ?? 0) + 1);
    const o = [];
    for (const [T, x] of s)
      if (o.push(`${x} ${x === 1 ? (Xn[T] ?? T).toLowerCase() : uc[T] ?? T}`), o.length === 5) {
        const w = [...s.keys()].length - 5;
        w > 0 && (o[4] += ` (+${w} tipos más)`);
        break;
      }
    const a = t.label, d = Xn[t.kind] ?? t.kind, c = ((A = t.children) != null && A.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((R = t.children) != null && R.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const p = e.measureText(a).width;
    e.font = "11px system-ui, sans-serif";
    const g = Math.max(
      e.measureText(d).width,
      ...o.map((T) => e.measureText(T).width),
      e.measureText(c).width
    ), m = Math.min(280, Math.max(p, g) + 24), y = 40 + o.length * 15 + (c ? 18 : 0), h = this.radiusOf(t) * this.cam.k, r = this.cam.x + t.x * this.cam.k, u = this.cam.y + t.y * this.cam.k;
    let f = r + h + 14;
    f + m > i - 8 && (f = r - h - 14 - m), f = Math.max(8, Math.min(f, i - m - 8));
    const k = Math.max(8, Math.min(u - 10, n - y - 8));
    e.translate(f, k), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, m, y, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(a, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(d, 12, 25), e.fillStyle = "#475569", o.forEach((T, x) => e.fillText(T, 12, 41 + x * 15)), c && (e.fillStyle = "#94a3b8", e.fillText(c, 12, y - 16)), e.restore();
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
    for (let n = i.length - 1; n >= 0; n--) {
      const s = i[n], o = this.radiusOf(s) + 4 / this.cam.k;
      if ((e - s.x) ** 2 + (t - s.y) ** 2 <= o * o) return s;
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
      const i = e.parent ? Math.atan2(e.y - e.parent.y, e.x - e.parent.x) : Math.random() * Math.PI * 2, n = e.parent ? Math.PI * 1.25 : Math.PI * 2, s = e.children;
      s.forEach((o, a) => {
        this.materialize(o.parent);
        const d = i - n / 2 + n * (a + 0.5) / s.length;
        o.x = e.x + Math.cos(d) * 6, o.y = e.y + Math.sin(d) * 6, o.vx = Math.cos(d) * 7, o.vy = Math.sin(d) * 7, o.children || (o.children = this.childrenOf(o));
      }), e.vx -= Math.cos(i) * 2, e.vy -= Math.sin(i) * 2;
    }
  }
  onDblClick(e) {
    const t = this.getBoundingClientRect(), i = (e.clientX - t.left - this.cam.x) / this.cam.k, n = (e.clientY - t.top - this.cam.y) / this.cam.k, s = this.nodeAt(i, n);
    !s || s.kind === "root" || this.dispatchEvent(
      new CustomEvent("node-activated", {
        detail: { id: s.refId, kind: s.kind },
        bubbles: !0,
        composed: !0
      })
    );
  }
  onWheel(e) {
    e.preventDefault();
    const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, s = Math.exp(-e.deltaY * 12e-4), o = Math.min(2.5, Math.max(0.25, this.cam.k * s)), a = o / this.cam.k;
    this.cam.x = i - (i - this.cam.x) * a, this.cam.y = n - (n - this.cam.y) * a, this.cam.k = o;
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
lt.styles = ct`
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
lt.STORE_KEY = "modux-explorer-state";
Ws([
  se({ attribute: !1 })
], lt.prototype, "model", 2);
lt = Ws([
  pt("modux-explorer")
], lt);
var fc = Object.defineProperty, gc = Object.getOwnPropertyDescriptor, ee = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? gc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && fc(t, i, s), s;
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
function Pt(e, t, i) {
  const n = i.x - i.w / 2, s = i.x + i.w / 2, o = i.y - i.h / 2, a = i.y + i.h / 2;
  let d = 0, c = 1;
  const p = t.x - e.x, g = t.y - e.y;
  for (const [m, y] of [
    [-p, e.x - n],
    [p, s - e.x],
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
  const n = new Map(e.nodes.map((g) => [g.id, g])), s = (g) => {
    var y;
    const m = /* @__PURE__ */ new Set();
    for (let h = g; h; h = (y = n.get(h)) == null ? void 0 : y.parentId) m.add(h);
    return m;
  }, o = e.nodes, a = (g) => g.parentId ? Math.min(i, 6) : i, d = /* @__PURE__ */ new Map(), c = (g, m, y) => {
    const h = a(y), r = { x: y.x, y: y.y, w: y.w + 2 * h, h: y.h + 2 * h }, u = y.w / 2 + h * 1.5, f = y.h / 2 + h * 1.5, k = { x: y.x - u, y: y.y - f }, A = { x: y.x + u, y: y.y - f }, R = { x: y.x - u, y: y.y + f }, T = { x: y.x + u, y: y.y + f }, x = [];
    for (const w of [k, A, R, T])
      !Pt(g, w, r) && !Pt(w, m, r) && x.push([w]);
    for (const [w, P] of [
      [k, A],
      [A, k],
      [A, T],
      [T, A],
      [T, R],
      [R, T],
      [R, k],
      [k, R]
    ])
      !Pt(g, w, r) && !Pt(P, m, r) && x.push([w, P]);
    return x;
  };
  for (const g of e.edges) {
    if ((p = t[g.id]) != null && p.length) continue;
    const m = n.get(g.sourceId), y = n.get(g.targetId);
    if (!m || !y) continue;
    const h = /* @__PURE__ */ new Set([...s(m.id), ...s(y.id)]), r = [
      { x: m.x, y: m.y },
      { x: y.x, y: y.y }
    ];
    for (let u = 0; u < 12; u++) {
      let f = !1;
      e: for (let k = 0; k < r.length - 1; k++)
        for (const A of o) {
          if (h.has(A.id)) continue;
          const R = a(A), T = { x: A.x, y: A.y, w: A.w + 2 * R, h: A.h + 2 * R };
          if (!Pt(r[k], r[k + 1], T)) continue;
          const x = c(r[k], r[k + 1], A);
          if (!x.length) continue;
          const w = (U) => o.some(
            (D) => D !== A && !h.has(D.id) && Math.abs(U.x - D.x) < D.w / 2 + a(D) / 2 && Math.abs(U.y - D.y) < D.h / 2 + a(D) / 2
          ), P = (U) => {
            let D = 0;
            const z = [r[k], ...U, r[k + 1]];
            for (let L = 0; L < z.length - 1; L++)
              D += Math.hypot(z[L + 1].x - z[L].x, z[L + 1].y - z[L].y);
            return D + (U.some(w) ? 1e4 : 0);
          };
          x.sort((U, D) => P(U) - P(D)), r.splice(k + 1, 0, ...x[0]), f = !0;
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
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let Y = class extends Ne {
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
      const n = this.renderRoot.querySelector("modux-canvas"), s = (a) => {
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
          e.preventDefault(), n == null || n.fit(), (o = this.renderRoot.querySelector("modux-explorer")) == null || o.fit();
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
          s("level:contexts");
          break;
        case "2":
          s("level:detail");
          break;
        case "3":
          s("level:operations");
          break;
        case "4":
          s("view:aggregates");
          break;
        case "5":
          s("view:flows");
          break;
        case "6":
          s("view:processes");
          break;
        case "7":
          s("view:workflows");
          break;
        case "8":
          s("view:ui");
          break;
        case "9":
          s("view:design");
          break;
        case "?":
          e.preventDefault(), this._helpOpen = !this._helpOpen;
          break;
        case "Escape":
          this._helpOpen && (this._helpOpen = !1);
          break;
      }
    }, this.onMenuSlotRequested = (e) => {
      const { id: t, appId: i, beforeId: n, nestRowId: s } = e.detail, o = ge(t);
      if (!(o != null && o.itemId)) return;
      const a = this.menuEntryIn(o.appId, o.itemId);
      if (!a) return;
      const d = (c, p) => (c ?? []).some((g) => g.id === p || d(g.children, p));
      if (s) {
        const c = ge(s);
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
      if (n) {
        const c = ge(n);
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
      const { id: t, beforeId: i } = e.detail, n = /^wizrow:([^:]+):(.+)$/.exec(t);
      if (!n) return;
      const s = i ? ((o = /^wizrow:[^:]+:(.+)$/.exec(i)) == null ? void 0 : o[1]) ?? null : null;
      this.moveWizardStep(n[1], n[2], s);
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
      const { fromPageId: t, toPageId: i, componentId: n, toParentId: s, beforeComponentId: o } = e.detail, a = this.componentIn(t, n);
      if (!a || t === i) return;
      const d = JSON.parse(JSON.stringify(a.node)), { ops: c } = this.rebuildComponentOps(i, d, s ?? void 0, o);
      for (const p of c) this.command(p, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: n }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: n },
        ...this.rebuildComponentOps(t, d, a.parentId ?? void 0, a.beforeId).ops
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
    return Jt(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = Jt(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, n = Jt(this.layout[i]);
    this._detail = e, !Object.keys(n.nodes).length && !Object.keys(n.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const s = Jt(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...s, detail: e } }, this.emit("layout-changed", { layout: this.layout });
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
  inverseOf(e) {
    var t, i, n, s, o, a, d, c, p, g, m, y, h;
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
          const k = (A) => {
            for (const R of A ?? [])
              R.modelId === e.id && u.push({ kind: "set-page-component", pageId: f.id, componentId: R.id, modelId: e.id }), k(R.children);
          };
          k(f.content);
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
        const r = (((n = (this.model.pages ?? []).find((u) => u.id === e.pageId)) == null ? void 0 : n.wizardSteps) ?? []).find((u) => (u.id ?? u.pageId) === e.targetId);
        return r ? [{
          kind: "add-page-wizard-step",
          pageId: e.pageId,
          targetId: r.pageId ?? null,
          label: r.label,
          itemId: r.id
        }] : null;
      }
      case "delete-ui-app": {
        const r = (this.model.uiApps ?? []).find((k) => k.id === e.id);
        if (!r) return null;
        const u = [{ kind: "create-ui-app", id: r.id, name: r.name, type: r.type }];
        r.headerPageId && u.push({ kind: "set-app-header-page", appId: r.id, pageId: r.headerPageId }), r.modelId && u.push({ kind: "set-app-model", appId: r.id, modelId: r.modelId }), r.viewPageId && u.push({ kind: "set-app-view-page", appId: r.id, pageId: r.viewPageId }), r.editPageId && u.push({ kind: "set-app-edit-page", appId: r.id, pageId: r.editPageId }), (r.homePageId || r.homeAppId) && u.push({
          kind: "set-app-home-page",
          appId: r.id,
          pageId: r.homePageId ?? null,
          toAppId: r.homeAppId ?? null
        });
        const f = (k, A) => {
          for (const R of k ?? [])
            u.push({
              kind: "add-menu-item",
              appId: r.id,
              label: R.label,
              itemId: R.id,
              parentId: A == null ? void 0 : A.id,
              parentLabel: A && !A.id ? A.label : void 0,
              pageId: R.pageId ?? null
            }), R.uiAdapterId && u.push({ kind: "set-menu-app", appId: r.id, toAppId: R.uiAdapterId, itemId: R.id, label: R.label }), R.useCaseId && u.push({ kind: "set-menu-use-case", appId: r.id, useCaseId: R.useCaseId, itemId: R.id, label: R.label }), R.aggregateId && u.push({ kind: "set-menu-aggregate", appId: r.id, aggregateId: R.aggregateId, itemId: R.id, label: R.label }), R.queryOperationId && u.push({
              kind: "set-menu-query-operation",
              appId: r.id,
              queryServiceId: R.queryServiceId ?? null,
              queryOperationId: R.queryOperationId,
              itemId: R.id,
              label: R.label
            }), f(R.children, R);
        };
        f(r.menuItems);
        for (const k of this.model.actorAppUses ?? [])
          k.appId === e.id && u.push({ kind: "add-actor-app", actorId: k.actorId, appId: e.id });
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
        const r = (this.model.uiApps ?? []).find((k) => k.id === e.appId), u = (k) => {
          for (const A of k ?? []) {
            if (e.itemId ? A.id === e.itemId : A.label === e.label) return A;
            const R = u(A.children);
            if (R) return R;
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
        const r = (this.model.pages ?? []).find((T) => T.id === e.pageId);
        let u = null, f = null, k = null;
        const A = (T, x) => {
          var P;
          const w = T ?? [];
          for (let U = 0; U < w.length; U++)
            w[U].id === e.componentId && (u = w[U], f = x, k = ((P = w[U + 1]) == null ? void 0 : P.id) ?? null), A(w[U].children, w[U]);
        };
        if (A(r == null ? void 0 : r.content, null), !u) return null;
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
          beforeComponentId: k
        }] : this.rebuildComponentOps(
          e.pageId,
          R,
          f === null ? void 0 : f.id,
          k
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
        const r = (((s = (this.model.pages ?? []).find((u) => u.id === e.pageId)) == null ? void 0 : s.viewmodelFields) ?? []).find((u) => u.fieldId === e.fieldId);
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
          (f) => (f.scheduledTriggers ?? []).some((k) => k.id === e.id)
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
        const r = (this.model.processes ?? []).find((k) => k.id === e.processId), u = (r == null ? void 0 : r.steps.findIndex((k) => k.id === e.id)) ?? -1;
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
        const r = (this.model.workflows ?? []).find((k) => k.id === e.workflowId), u = (r == null ? void 0 : r.steps.findIndex((k) => k.id === e.id)) ?? -1;
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
          ...r.steps.filter((k) => k.id !== e.id && (k.dependsOnStepIds ?? []).includes(e.id)).map(
            (k) => ({
              kind: "add-workflow-dependency",
              workflowId: e.workflowId,
              id: k.id,
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
    const { id: t, x: i, y: n } = e.detail, s = this._view, o = this.viewLayout(s), a = o.nodes[t] ?? null;
    let d = { x: i, y: n };
    const c = this.sceneFor(s), p = c.nodes.find((m) => m.id === t);
    if (p != null && p.parentId) {
      const m = c.nodes.find((y) => y.id === p.parentId);
      m && (d = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: d } });
    const g = [{ kind: "move-node", view: s, id: t, pos: a }];
    if (s === "processes") {
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
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((r) => r.id === t) ?? (this.model.proxyApis ?? []).find((r) => r.id === t);
    if (!o || i && !this.model.externalSystems.some((r) => r.id === i)) return;
    const a = o.publishedByExternalSystemId ?? "", d = i ?? "";
    if (d === a) return;
    const c = this._view, p = this.viewLayout(c), g = this.sceneFor(c), m = d ? g.nodes.find((r) => r.id === d) : void 0, y = m ? { x: n - m.x, y: s - m.y } : { x: n, y: s }, h = [
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
    const { id: t, targetId: i, x: n, y: s } = e.detail, o = (this.model.apis ?? []).find((r) => r.id === t), a = this.model.externalSystems.find((r) => r.id === i);
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
      nodes: { ...g.nodes, [c]: { x: n - y.x, y: s - y.y } }
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
    const n = await i.text(), s = this.selectedApiId(), o = s ? null : ((c = this.model.externalSystems.find((g) => g.id === this._selectedId)) == null ? void 0 : c.id) ?? null, a = s || o ? null : ((p = this.model.modules.find((g) => g.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
    if (!s && !o && !a) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: n,
      fileName: i.name,
      apiId: s,
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
    const { id: t } = e.detail, i = this._view, n = this.viewLayout(i), s = new Set(n.collapsed ?? []);
    s.has(t) ? s.delete(t) : s.add(t), this.writeViewLayout(i, { ...n, collapsed: [...s] });
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), s = this.sceneFor(i), o = { ...n.nodes }, a = [];
    for (const { id: d, x: c, y: p } of t) {
      a.push({ kind: "move-node", view: i, id: d, pos: n.nodes[d] ?? null });
      let g = { x: c, y: p };
      const m = s.nodes.find((y) => y.id === d);
      if (m != null && m.parentId) {
        const y = s.nodes.find((h) => h.id === m.parentId);
        y && (g = { x: c - y.x, y: p - y.y });
      }
      o[d] = g;
    }
    if (this.writeViewLayout(i, { ...n, nodes: o }), i === "processes")
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
    const { id: t, x: i, y: n, w: s, h: o } = e.detail, a = this._view, d = this.viewLayout(a), c = this.sceneFor(a).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((g = d.sizes) == null ? void 0 : g[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: d.nodes[t] ?? null },
      ...c.map((m) => ({ kind: "move-node", view: a, id: m.id, pos: d.nodes[m.id] ?? null }))
    ]);
    const p = { ...d.nodes, [t]: { x: i, y: n } };
    for (const m of c) p[m.id] = { x: m.x - i, y: m.y - n };
    this.writeViewLayout(a, {
      ...d,
      nodes: p,
      sizes: { ...d.sizes ?? {}, [t]: { w: s, h: o } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, n = this._view, s = this.viewLayout(n);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: n, id: t, points: s.edges[t] ?? null }
    ]);
    const o = { ...s.edges };
    i.length ? o[t] = i : delete o[t], this.writeViewLayout(n, { ...s, edges: o });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = hn(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((a) => [a.id, a.x])), s = [...t.steps].sort(
      (a, d) => (n.get(a.id) ?? 0) - (n.get(d.id) ?? 0)
    );
    if (s.every((a, d) => a.id === t.steps[d].id)) return null;
    const o = s.findIndex((a) => a.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: o > 0 ? s[o - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: n, y: s, connectKind: o } = e.detail;
    this.applyConnection(t, i, n, s, o);
  }
  /** The whole gesture vocabulary, callable from drags AND from palette drops. */
  applyConnection(e, t, i, n, s) {
    var q, le, I, S;
    if (this._view === "workflows") {
      const v = this.owningWorkflowOf(e), b = this.owningWorkflowOf(t);
      if (!v || v !== b || e === t) return;
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
      const v = this.model.pages ?? [], b = this.model.uiApps ?? [], _ = (W) => b.some((te) => te.id === W), $ = (W) => v.some((te) => te.id === W);
      if (s === "home" && _(e) && ($(t) || _(t))) {
        if (t === e) return;
        this.command(
          $(t) ? { kind: "set-app-home-page", appId: e, pageId: t } : { kind: "set-app-home-page", appId: e, pageId: null, toAppId: t }
        );
        return;
      }
      if (s === "header" && _(e) && $(t)) {
        this.command({ kind: "set-app-header-page", appId: e, pageId: t });
        return;
      }
      if ((s === "crud-detail" || s === "crud-create") && $(e) && ($(t) || _(t)) && t !== e) {
        const W = s === "crud-detail" ? "set-crud-detail" : "set-crud-create";
        this.command(
          $(t) ? { kind: W, pageId: e, targetId: t, toAppId: null } : { kind: W, pageId: e, targetId: null, toAppId: t }
        );
        return;
      }
      if (s === "viewmodel" && $(e)) {
        (this.model.models ?? []).some((W) => W.id === t) ? this.command({ kind: "set-page-model", pageId: e, modelId: t }) : this.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
        return;
      }
      if ((s === "view" || s === "edit") && _(e) && $(t)) {
        this.command({
          kind: s === "view" ? "set-app-view-page" : "set-app-edit-page",
          appId: e,
          pageId: t
        });
        return;
      }
      if (s) return;
      const M = (W) => /^wizrow:([^:]+):(.+)$/.exec(W), C = M(e) ?? M(t);
      if (C) {
        const W = M(e) ? t : e;
        $(W) && W !== C[1] && this.command({ kind: "set-wizard-step-page", pageId: C[1], itemId: C[2], targetId: W });
        return;
      }
      const N = v.find((W) => W.id === t && W.type === "WIZARD");
      if ($(e) && N && e !== N.id) {
        (N.wizardSteps ?? []).some((W) => W.pageId === e) || this.command({ kind: "add-page-wizard-step", pageId: N.id, targetId: e });
        return;
      }
      if ($(e) && _(t)) {
        const W = v.find((be) => be.id === e), te = b.find((be) => be.id === t);
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
        _(te) ? this.command({ kind: "set-identity-provider", id: te, targetId: W }) : this.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
        return;
      }
      const re = (W) => (this.model.models ?? []).some((te) => te.id === W);
      if (re(e) || re(t)) {
        const W = re(e) ? e : t, te = re(e) ? t : e;
        if ($(te)) {
          this.command({ kind: "set-page-model", pageId: te, modelId: W });
          return;
        }
        if (_(te)) {
          this.command({ kind: "set-app-model", appId: te, modelId: W });
          return;
        }
        return;
      }
      const oe = ge(e);
      if (oe != null && oe.itemId && ((q = ge(t)) != null && q.itemId || _(t))) {
        const W = ge(t), te = this.menuEntryIn(oe.appId, oe.itemId);
        if (!te) return;
        if (W != null && W.itemId) {
          const be = this.menuEntryIn(W.appId, W.itemId);
          if (!be) return;
          const xe = (ut) => (ut ?? []).some((Xt) => Xt.id === W.itemId || xe(Xt.children));
          if (oe.appId === W.appId && (W.itemId === oe.itemId || xe(te.entry.children)))
            return;
          const Ae = (le = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : le.renderRoot.querySelector(`g[data-node-id="${t}"]`), we = Ae == null ? void 0 : Ae.getBoundingClientRect(), Ve = we && n !== void 0 ? (n - we.top) / Math.max(1, we.height) : 0.5, Kt = Ve < 0.3 ? "before" : Ve > 0.7 ? "after" : "nest";
          if (Kt === "nest")
            this.command({
              kind: "move-menu-item",
              appId: oe.appId,
              toAppId: W.appId,
              itemId: oe.itemId,
              parentId: W.itemId
            });
          else {
            const ut = Kt === "before" ? W.itemId : be.beforeId ?? void 0;
            if (oe.appId === W.appId && be.parentId === te.parentId && ut === oe.itemId) return;
            this.command({
              kind: "move-menu-item",
              appId: oe.appId,
              toAppId: W.appId,
              itemId: oe.itemId,
              parentId: be.parentId ?? void 0,
              beforeItemId: ut
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
        const be = this.model.modules.some(
          (we) => (we.useCases ?? []).some((Ve) => Ve.id === te)
        ), xe = (this.model.aggregates ?? []).some((we) => we.id === te), Ae = this.model.modules.flatMap((we) => we.queryServices ?? []).find((we) => (we.operations ?? []).some((Ve) => Ve.id === te));
        $(te) ? this.command({ kind: "set-menu-page", pageId: te, ...G }) : _(te) && te !== G.appId ? this.command({ kind: "set-menu-app", toAppId: te, ...G }) : be ? this.command({ kind: "set-menu-use-case", useCaseId: te, ...G }) : xe ? this.command({ kind: "set-menu-aggregate", aggregateId: te, ...G }) : Ae && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: Ae.id,
          queryOperationId: te,
          ...G
        });
        return;
      }
      if ((this.model.actors ?? []).some((W) => W.id === e) && _(t)) {
        (this.model.actorAppUses ?? []).some((W) => W.actorId === e && W.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const X = $(e) ? { pageId: e, other: t } : $(t) ? { pageId: t, other: e } : null;
      if (X) {
        const W = new Set(
          this.model.modules.flatMap((xe) => (xe.useCases ?? []).map((Ae) => Ae.id))
        ), te = new Set(
          this.model.modules.flatMap((xe) => (xe.queryServices ?? []).map((Ae) => Ae.id))
        ), be = v.find((xe) => xe.id === X.pageId);
        W.has(X.other) ? (be.buttons ?? []).some((xe) => xe.useCaseId === X.other) || this.command({ kind: "add-page-button", pageId: X.pageId, useCaseId: X.other }) : te.has(X.other) && this.command({ kind: "set-page-listing", pageId: X.pageId, queryServiceId: X.other });
      }
      return;
    }
    if (this._view === "mappings") {
      const v = this.model.models ?? [];
      if (!v.some((N) => N.id === e) || !v.some((N) => N.id === t) || e === t || (this.model.modelMappings ?? []).some((N) => N.sourceModelId === e && N.targetModelId === t))
        return;
      const b = v.find((N) => N.id === e), _ = v.find((N) => N.id === t), $ = (N) => N.replace(/[^a-zA-Z0-9]/g, ""), M = new Set((this.model.modelMappings ?? []).map((N) => N.id));
      let C = `mapping-${ne(b.name)}-${ne(_.name)}`;
      for (let N = 2; M.has(C); N++) C = `mapping-${ne(b.name)}-${ne(_.name)}-${N}`;
      this.command({
        kind: "add-model-mapping",
        id: C,
        name: `${$(b.name)}2${$(_.name)}`,
        sourceId: e,
        targetId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const o = /^apiop:(.+)@(.+)$/.exec(e);
    if (o) {
      const [, v, b] = o, _ = (this.model.proxyApis ?? []).find((B) => B.id === b), $ = (_ == null ? void 0 : _.targetApiId) ?? ((S = (this.model.apiImplementations ?? []).find(
        (B) => B.moduleId === b && (this.model.apis ?? []).some(
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
          moduleId: b,
          targetUseCaseId: t
        });
        return;
      }
      if (!(_ != null && _.targetApiId)) return;
      let C = null;
      if (t === _.targetApiId)
        C = _.targetApiId;
      else {
        const B = /^apiimpl:(.+)@(.+)$/.exec(t);
        B && B[1] === _.targetApiId ? C = B[2] : this.model.modules.some((V) => V.id === t) && (this.model.apiImplementations ?? []).some(
          (V) => V.apiId === _.targetApiId && V.moduleId === t
        ) && (C = t);
      }
      if (!C) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (B) => B.proxyId === _.id && B.operationId === v && B.targetSiteId === C
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: _.id,
        operationId: v,
        targetSiteId: C
      });
      return;
    }
    const a = new Set((this.model.aiAgents ?? []).map((v) => v.id));
    if (a.has(e)) {
      if (new Set(
        this.model.modules.flatMap((C) => (C.useCases ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (N) => N.agentId === e && N.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.useCases ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (N) => N.agentId === e && N.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((C) => (C.mcpServers ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (N) => N.agentId === e && N.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((C) => C.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (N) => N.agentId === e && N.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((C) => C.operations.map((N) => N.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (N) => N.agentId === e && N.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((C) => C.id === t) || (this.model.proxyApis ?? []).some((C) => C.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (N) => N.agentId === e && N.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((C) => (C.queryServices ?? []).map((N) => N.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (N) => N.agentId === e && N.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (a.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (N) => N.agentId === e && N.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((C) => C.id === t) && ((this.model.agentRags ?? []).some(
        (N) => N.agentId === e && N.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === e)) {
      const v = (this.model.mcpGateways ?? []).find(($) => $.id === e), b = this.model.externalSystems.some(($) => ($.mcpServers ?? []).some((M) => M.id === t)) || (this.model.apis ?? []).some(($) => $.id === t) || (this.model.apis ?? []).some(($) => $.operations.some((M) => M.id === t)) || this.model.modules.some(($) => ($.useCases ?? []).some((M) => M.id === t)) || (this.model.rags ?? []).some(($) => $.id === t), _ = [
        ...v.mcpServerIds ?? [],
        ...v.apiIds ?? [],
        ...v.apiOperationIds ?? [],
        ...v.useCaseIds ?? [],
        ...v.ragIds ?? []
      ].includes(t);
      b && !_ && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((v) => v.id === t)) return;
    const d = (this.model.rags ?? []).find((v) => v.id === e);
    if (d) {
      if (new Set(
        this.model.modules.flatMap((_) => (_.readModels ?? []).map(($) => $.id))
      ).has(t) && !(d.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((_) => (_.tables ?? []).map(($) => $.id))
      ).has(t) && !(d.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((_) => _.id === t) || (this.model.proxyApis ?? []).some((_) => _.id === t)) && !(d.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((_) => _.id === t) && !(d.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((_) => _.id === t) && !(d.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
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
      const _ = this.model.modules.flatMap(($) => $.useCases ?? []).find(($) => $.id === t);
      if (_ && !(v.steps ?? []).some((M) => M.targetUseCaseId === t)) {
        const M = `wfs-${ne(_.name)}`;
        let C = M;
        for (let N = 2; (v.steps ?? []).some((B) => B.id === C); N++)
          C = `${M}-${N}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: C,
          name: _.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((v) => v.id === t)) {
      const v = this.model.modules.flatMap(($) => $.domainEvents ?? []).find(($) => $.id === e), b = this.model.modules.flatMap(($) => $.applicationEvents ?? []).find(($) => $.id === e), _ = v ?? b;
      if (_) {
        const $ = (this.model.emissions ?? []).find((B) => B.domainEventId === e), M = new Set((this.model.aggregates ?? []).map((B) => B.id)), C = new Set(
          this.model.modules.flatMap((B) => (B.domainServices ?? []).map((V) => V.id))
        ), N = new Set(
          this.model.modules.flatMap((B) => (B.useCases ?? []).map((V) => V.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: _.name,
          triggerAggregateId: $ && M.has($.sourceId) ? $.sourceId : void 0,
          triggerDomainServiceId: $ && C.has($.sourceId) ? $.sourceId : void 0,
          triggerUseCaseId: $ && N.has($.sourceId) ? $.sourceId : void 0
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
          (_) => _.apiId === v.targetApiId && _.moduleId === t
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
    if (a.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((b) => (b.domainEvents ?? []).map((_) => _.id)),
        ...this.model.modules.flatMap((b) => (b.applicationEvents ?? []).map((_) => _.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (_) => _.eventId === e && _.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!c.has(e)) return;
    }
    if (c.has(e)) {
      const v = new Set(
        this.model.modules.flatMap((_) => (_.useCases ?? []).map(($) => $.id))
      ), b = new Set(
        this.model.modules.flatMap((_) => (_.queryServices ?? []).map(($) => $.id))
      );
      if (v.has(t) || b.has(t)) {
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
        this.model.modules.flatMap((b) => (b.useCases ?? []).map((_) => _.id))
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
        ($) => [...$.domainEvents ?? [], ...$.applicationEvents ?? []].some((M) => M.id === b)
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
    const m = (v) => (this.model.documents ?? []).find((b) => b.id === v);
    if (m(e) || m(t)) {
      const v = m(e) ?? m(t), b = m(e) ? t : e;
      if ((this.model.models ?? []).find((C) => C.id === b)) {
        this.command({ kind: "set-document-model", id: v.id, modelId: b });
        return;
      }
      const $ = this.model.modules.flatMap((C) => C.queryServices ?? []).find((C) => C.id === b), M = this.model.modules.flatMap((C) => (C.queryServices ?? []).flatMap((N) => (N.operations ?? []).map((B) => ({ op: B, qs: N })))).find(({ op: C }) => C.id === b);
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
    const y = this.model.identityProviders ?? [], h = (v) => y.find((b) => b.id === v);
    if (h(e) || h(t)) {
      const v = h(e) ?? h(t), b = h(e) ? t : e;
      if (h(e) && this.model.externalSystems.some((M) => M.id === b)) {
        v.publishedByExternalSystemId !== b && this.command({ kind: "set-idp-publisher", id: v.id, targetId: b });
        return;
      }
      const _ = this.model.modules.some((M) => M.id === b), $ = (this.model.etlFlows ?? []).some((M) => M.id === b);
      if (_ || $) {
        this.command({ kind: "set-identity-provider", id: b, targetId: v.id });
        return;
      }
      this.emit("modux-notice", {
        message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
      });
      return;
    }
    const r = this.model.etlFlows ?? [], u = (v) => r.find((b) => b.id === v);
    if (u(e) || u(t)) {
      const v = u(e) ?? u(t), b = u(e) ? t : e, _ = !u(e), $ = new Set(this.model.externalSystems.flatMap((X) => (X.tables ?? []).map((W) => W.id))), M = /* @__PURE__ */ new Set([
        ...(this.model.apis ?? []).map((X) => X.id),
        ...(this.model.proxyApis ?? []).map((X) => X.id)
      ]), C = (this.model.apis ?? []).find((X) => X.operations.some((W) => W.id === b)), N = new Set(
        this.model.modules.flatMap((X) => [
          ...(X.domainEvents ?? []).map((W) => W.id),
          ...(X.applicationEvents ?? []).map((W) => W.id)
        ])
      );
      let B = null, V = {};
      if ($.has(b) ? (B = _ ? "SOURCE_PULL" : "WRITE_DB", V = { externalTableId: b }) : C ? (B = _ ? "SOURCE_PULL" : "WRITE_API", V = { apiId: C.id, operationId: b }) : M.has(b) ? (B = _ ? "SOURCE_PULL" : "WRITE_API", V = { apiId: b }) : N.has(b) && (B = _ ? "SOURCE_CONSUMER" : "WRITE_EVENT", V = { targetId: b }), !B) {
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
    const f = this.model.externalSystems.flatMap((v) => v.useCases ?? []).find((v) => v.id === e), k = this.model.externalSystems.flatMap((v) => v.tables ?? []).find((v) => v.id === e);
    if (f || k) {
      const v = (f ?? k).name, b = f ? { externalUseCaseId: e } : { externalTableId: e }, _ = (C) => f ? C.sourceExternalUseCaseId === e : C.sourceExternalTableId === e, $ = this.model.modules.flatMap((C) => C.readModels ?? []).find((C) => C.id === t);
      if ($) {
        (this.model.projections ?? []).some(
          (N) => _(N) && N.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(v)}-${ne($.name)}`,
          name: `${$.name}Projection`,
          ...b,
          targetId: t
        });
        return;
      }
      const M = this.model.modules.find((C) => C.id === t);
      if (M) {
        (this.model.projections ?? []).some(
          (N) => _(N) && N.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(v)}-${ne(M.name)}`,
          name: `${v}ViewProjection`,
          ...b,
          moduleId: t,
          readModelName: `${v}View`
        });
        return;
      }
      return;
    }
    const A = (this.model.aggregates ?? []).find((v) => v.id === e);
    if (A) {
      const v = this.model.modules.flatMap((_) => _.readModels ?? []).find((_) => _.id === t);
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
      const b = this.model.modules.find((_) => _.id === t);
      if (b) {
        (this.model.projections ?? []).some(
          ($) => $.sourceAggregateId === e && $.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(A.name)}-${ne(b.name)}`,
          name: `${A.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${A.name}View`
        });
        return;
      }
    }
    const R = new Set(
      this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((b) => b.id))
    ), T = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((v) => v.id),
      ...this.model.modules.flatMap((v) => (v.domainServices ?? []).map((b) => b.id))
    ]), x = new Set(
      this.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((b) => b.id))
    ), w = new Set(this.model.modules.flatMap((v) => (v.useCases ?? []).map((b) => b.id))), P = new Set(
      this.model.modules.flatMap((v) => (v.queryServices ?? []).map((b) => b.id))
    );
    if (w.has(e) && P.has(t)) {
      (this.model.queryCalls ?? []).some(
        (b) => b.sourceId === e && b.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const U = new Set(
      this.model.externalSystems.flatMap((v) => (v.useCases ?? []).map((b) => b.id))
    );
    if (w.has(e) && U.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (b) => b.sourceId === e && b.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (w.has(e) && w.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (b) => b.sourceId === e && b.targetId === t
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
        (b) => b.sourceId === e && b.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (T.has(e) && R.has(t) || w.has(e) && x.has(t)) {
      (this.model.emissions ?? []).some(
        (b) => b.sourceId === e && b.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (R.has(e) || x.has(e)) {
      const v = x.has(e), b = this.model.modules.flatMap((G) => (v ? G.applicationEvents : G.domainEvents) ?? []).find((G) => G.id === e), _ = this.model.modules.flatMap((G) => (G.useCases ?? []).map((X) => ({ u: X, module: G }))).find(({ u: G }) => G.id === t), $ = this.model.modules.flatMap((G) => (G.readModels ?? []).map((X) => ({ rm: X, module: G }))).find(({ rm: G }) => G.id === t), M = this.model.modules.find((G) => G.id === t) ?? ($ == null ? void 0 : $.module) ?? (_ == null ? void 0 : _.module);
      if (!b || !M) return;
      const C = new Set((this.model.aggregates ?? []).map((G) => G.id)), N = new Set(
        this.model.modules.flatMap((G) => (G.domainServices ?? []).map((X) => X.id))
      ), B = (this.model.emissions ?? []).find(
        (G) => G.domainEventId === e && (v ? w.has(G.sourceId) : C.has(G.sourceId) || N.has(G.sourceId))
      );
      if (!B) {
        this.emit("modux-notice", {
          message: v ? `Declara primero qué caso de uso publica ${b.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${b.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const V = !v && C.has(B.sourceId);
      if (_) {
        if (this.model.flows.some(
          (X) => X.archetype === "TRIGGERS" && X.triggerEvent === b.name && X.targetUseCaseId === _.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ne(b.name)}-${ne(_.u.name)}`,
          name: _.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: V ? B.sourceId : "",
          triggerDomainServiceId: !v && !V ? B.sourceId : void 0,
          triggerUseCaseId: v ? B.sourceId : void 0,
          triggerEvent: b.name,
          targetId: M.id,
          targetUseCaseId: _.u.id
        });
        return;
      }
      const re = ($ == null ? void 0 : $.rm.name) ?? `${b.name}View`;
      if (this.model.flows.some(
        (G) => G.archetype === "MATERIALIZES" && G.triggerEvent === b.name && G.targetId === M.id && G.readModelName === re
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${ne(b.name)}-${ne(re)}`,
        name: re,
        archetype: "MATERIALIZES",
        triggerAggregateId: V ? B.sourceId : "",
        triggerDomainServiceId: !v && !V ? B.sourceId : void 0,
        triggerUseCaseId: v ? B.sourceId : void 0,
        triggerEvent: b.name,
        targetId: M.id,
        readModelName: re
      });
      return;
    }
    const z = /* @__PURE__ */ new Set([
      ...T,
      ...w,
      ...P,
      ...this.model.modules.flatMap((v) => (v.readModels ?? []).map((b) => b.id))
    ]);
    if (z.has(e) || z.has(t) || R.has(t) || x.has(t))
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
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: n ?? 0 };
        return;
      }
      const b = (this.model.apis ?? []).find(
        (M) => M.operations.some((C) => C.id === t)
      ), _ = /^apiop:(.+)@(.+)$/.exec(t), $ = b ? { operationId: t, siteId: b.id } : _ ? { operationId: _[1], siteId: _[2] } : null;
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
      const s = this.memberIdOf(i, n), o = (this.model.views ?? []).find((a) => a.id === this._activeViewId);
      if (s && (o != null && o.memberIds.includes(s))) {
        this._deletePicker = { elementType: t, id: i, kind: n, memberId: s };
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
  performDelete(e, t, i) {
    var n;
    if (this._view === "ui") {
      if (e === "edge") {
        let s;
        if (s = /^idpauth:(.+)$/.exec(t))
          this.command({ kind: "set-identity-provider", id: s[1], targetId: null });
        else if (s = /^appheader:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-header-page", appId: s[1], pageId: null });
        else if (s = /^apphome:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-home-page", appId: s[1], pageId: null });
        else if (s = /^appmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-model", appId: s[1], modelId: null });
        else if (s = /^appview:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-view-page", appId: s[1], pageId: null });
        else if (s = /^appedit:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-app-edit-page", appId: s[1], pageId: null });
        else if (s = /^cruddetail:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-crud-detail", pageId: s[1], targetId: null, toAppId: null });
        else if (s = /^crudnew:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-crud-create", pageId: s[1], targetId: null, toAppId: null });
        else if (s = /^wizstep:([^:]+):(.+)$/.exec(t))
          this.command({ kind: "set-wizard-step-page", pageId: s[1], itemId: s[2], targetId: null });
        else if (s = /^pgbtn:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-page-button", pageId: s[1], useCaseId: s[2] });
        else if (s = /^pglist:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-listing", pageId: s[1], queryServiceId: null });
        else if (s = /^pgmodel:(.+)->(.+)$/.exec(t))
          this.command({ kind: "set-page-model", pageId: s[1], modelId: null });
        else if (s = /^actorapp:(.+)->(.+)$/.exec(t))
          this.command({ kind: "remove-actor-app", actorId: s[1], appId: s[2] });
        else if (s = /^menupage:(.+)->[^>]+$/.exec(t)) {
          const o = ge(s[1]);
          o && this.command({ kind: "set-menu-page", pageId: null, ...o });
        } else if (s = /^menuapp:(.+)->[^>]+$/.exec(t)) {
          const o = ge(s[1]);
          o && this.command({ kind: "set-menu-app", toAppId: null, ...o });
        } else if (s = /^menuuc:(.+)->[^>]+$/.exec(t)) {
          const o = ge(s[1]);
          o && this.command({ kind: "set-menu-use-case", useCaseId: null, ...o });
        } else if (s = /^menuagg:(.+)->[^>]+$/.exec(t)) {
          const o = ge(s[1]);
          o && this.command({ kind: "set-menu-aggregate", aggregateId: null, ...o });
        } else if (s = /^menuqop:(.+)->[^>]+$/.exec(t)) {
          const o = ge(s[1]);
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
        const s = ge(t);
        s && this.command({ kind: "remove-menu-item", ...s });
        return;
      }
      if (i === "wizard-step-row") {
        const s = /^wizrow:([^:]+):(.+)$/.exec(t);
        s && this.command({ kind: "remove-page-wizard-step", pageId: s[1], targetId: s[2] });
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
      const s = /^mapping:(.+)$/.exec(t);
      s && (this._selectedId = null, this.command({ kind: "remove-model-mapping", id: s[1] }));
      return;
    }
    if (this._view === "workflows" && e === "edge" && i === "workflow-dependency") {
      const s = /^wfdep:(.+)->(.+)$/.exec(t);
      if (!s) return;
      const o = this.owningWorkflowOf(s[2]);
      if (!o) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: o.id,
        id: s[2],
        dependsOnStepId: s[1]
      });
      return;
    }
    if (e === "node" && i === "workflow") {
      this._selectedId = null, this.command({ kind: "remove-workflow", id: t });
      return;
    }
    if (e === "node" && i === "workflow-step") {
      const s = this.owningWorkflowOf(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-workflow-step", workflowId: s.id, id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "api-impl-wire") {
      const s = /^apiimplwire:(.+)@(.+)$/.exec(t);
      if (!s) return;
      const [, o, a] = s, d = (n = (this.model.apis ?? []).find(
        (c) => c.operations.some((p) => p.id === o)
      )) == null ? void 0 : n.id;
      if (!d) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation-implementation", apiId: d, operationId: o, moduleId: a });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-op-use") {
      const s = /^extopuse:(.+)->(.+)@(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({
        kind: "remove-external-operation-use",
        sourceId: s[1],
        operationId: s[2],
        targetSiteId: s[3]
      });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "op-route") {
      const s = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(t);
      if (!s) return;
      const [, o, a, d] = s, c = /^apiimpl:.+@(.+)$/.exec(d), p = c ? c[1] : d;
      this._selectedId = null, this.command({ kind: "remove-proxy-operation-route", proxyId: a, operationId: o, targetSiteId: p });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "relation") {
      const s = /^rel:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-relation", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "emission") {
      const s = /^emit:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-emission", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "projection") {
      const s = /^proj:(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-projection", id: s[1] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "uc-call") {
      const s = /^uccall:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-use-case-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "notification-trigger") {
      const s = /^notif:(.+)$/.exec(t);
      s && (this._selectedId = null, this.command({ kind: "set-notification-event", id: s[1], targetId: null }));
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "notification-recipient") {
      const s = /^notifto:([^:]+):(.+)$/.exec(t);
      s && (this._selectedId = null, this.command({ kind: "remove-notification-recipient", id: s[1], roleId: s[2] }));
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "document-query") {
      const s = /^docq:(.+)$/.exec(t);
      s && (this._selectedId = null, this.command({ kind: "set-document-query", id: s[1], queryServiceId: null, queryOperationId: null }));
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
      const s = /^idp(?:trust|svc):(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "set-identity-provider", id: s[1], targetId: null });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "idp-federation") {
      const s = /^idpfed:(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "set-idp-publisher", id: s[1], targetId: null });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "identity-provider") {
      this._selectedId = null, this.command({ kind: "remove-identity-provider", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && (i === "etl-source" || i === "etl-write")) {
      const s = /^etl:([^:]+):(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-etl-step", etlFlowId: s[1], id: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "etl-flow") {
      this._selectedId = null, this.command({ kind: "remove-etl-flow", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "st-fire") {
      const s = /^stfire:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "set-scheduled-trigger-target", id: s[1], targetUseCaseId: null });
      return;
    }
    if (this._view === "context-map" && e === "node" && i === "scheduled-trigger") {
      this._selectedId = null, this.command({ kind: "remove-scheduled-trigger", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agg-call") {
      const s = /^aggcall:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-aggregate-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "qs-call") {
      const s = /^qscall:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-query-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "external-call") {
      const s = /^extcall:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-external-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-uc-call") {
      const s = /^extuccall:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-external-uc-call", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-use") {
      const s = /^mcp:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-use", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-external-use") {
      const s = /^mcpx:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-external-use", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-mcp") {
      const s = /^mcpsv:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-mcp", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "gateway-exposure") {
      const s = /^gwx:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-gateway-exposure", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-gateway") {
      const s = /^aggw:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-gateway", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-api-op") {
      const s = /^agapi:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-api-operation", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-query") {
      const s = /^agqs:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-query", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-delegate") {
      const s = /^agag:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-delegate", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-agent") {
      const s = /^useag:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-actor-agent", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-trigger") {
      const s = /^evag:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-trigger", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (e === "node" && i === "mcp-gateway") {
      this._selectedId = null, this.command({ kind: "remove-mcp-gateway", id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-rag") {
      const s = /^agrag:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-rag", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "rag-source") {
      const s = /^ragsrc:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-rag-source", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && (i === "rag-table" || i === "rag-api" || i === "rag-coarse")) {
      const s = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-rag-source", sourceId: s[2], targetId: s[1] });
      return;
    }
    if (e === "node" && i === "rag") {
      this._selectedId = null, this.command({ kind: "remove-rag", id: t });
      return;
    }
    if (e === "node" && i === "rag-content-source") {
      const s = /^ragcs:(.+?):(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-rag-content-source", sourceId: s[1], uri: s[2] });
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
      const s = /^apiwire:(.+)$/.exec(t), o = s ? this.owningApiOf(s[1]) : null;
      if (!s || !o) return;
      this._selectedId = null, this.command({ kind: "set-api-operation-target", apiId: o.id, id: s[1] });
      return;
    }
    if (e === "node" && i === "api") {
      this._selectedId = null, this.command({ kind: "remove-api", id: t });
      return;
    }
    if (e === "node" && i === "api-impl") {
      const s = /^apiimpl:(.+)@(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-api-implementation", apiId: s[1], moduleId: s[2] });
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
      const s = this.owningApiOf(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-api-operation", apiId: s.id, id: t });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-use") {
      const s = /^use:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-actor-use", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "actor-ext") {
      const s = /^extdep:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-actor-external", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "ext-dep") {
      const s = /^xdep:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-external-dependency", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "wf-chain") {
      const s = /^wfchain:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "set-workflow-trigger", id: s[2], triggerEvent: "" });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "agent-api") {
      const s = /^agapi:(.+)->(.+)$/.exec(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-agent-api", sourceId: s[1], targetId: s[2] });
      return;
    }
    if (this._view === "context-map" && e === "edge" && i === "proxy-target") {
      const s = /^pxt:(.+)->(.+)$/.exec(t);
      if (!s || !(this.model.proxyApis ?? []).some((o) => o.id === s[1])) return;
      this._selectedId = null, this.command({ kind: "set-proxy-target", id: s[1], targetId: "" });
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
      const s = this.owningProcessOf(t);
      if (!s) return;
      this._selectedId = null, this.command({ kind: "remove-process-step", processId: s.id, id: t });
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
    const { id: t, kind: i, name: n } = e.detail;
    (i === "module" || i === "aggregate" || i === "entity" || i === "process-step" || i === "workflow" || i === "workflow-step" || i === "domain-event" || i === "read-model" || i === "domain-service" || i === "query-service" || i === "use-case" || i === "external-use-case" || i === "external-table" || i === "mcp-server" || i === "mcp-gateway" || i === "application-event" || i === "external-system" || i === "actor" || i === "ai-agent" || i === "rag" || i === "api" || i === "proxy-api" || i === "api-operation") && this.command({ kind: "rename-element", type: i, id: t.replace(/^tgt:/, ""), name: n });
  }
  addStepFromToolbar() {
    const e = this._newStepName.trim();
    if (!e || !this._selectedId) return;
    const t = (this.model.processes ?? []).find((s) => s.id === this._selectedId), i = t ?? this.owningProcessOf(this._selectedId);
    if (!i) return;
    const n = t ? void 0 : this._selectedId;
    this.command({
      kind: "add-process-step",
      processId: i.id,
      id: `step-${ne(e)}`,
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
    const e = (this.model.views ?? []).find((s) => s.id === this._activeViewId);
    if (!e) return "";
    const t = new Set(e.memberIds), i = (s, o, a = {}) => E`
      <label
        class="${a.child ? "child" : ""} ${a.implicit && !t.has(s) ? "implicit" : ""}"
        title=${a.implicit && !t.has(s) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(s)}
          @change=${(d) => this.toggleViewMember(s, d.target.checked)}
        />
        ${o}
      </label>
    `, n = (s, o) => o.length ? E`<h4>${s}</h4>${o}` : "";
    return E`
      <aside class="view-tree" @pointerdown=${(s) => s.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${n(
      "Contextos",
      this.model.modules.flatMap((s) => [
        i(s.id, s.name),
        ...(this.model.aggregates ?? []).filter((o) => o.moduleId === s.id).map((o) => i(o.id, o.name, { child: !0, implicit: t.has(s.id) }))
      ])
    )}
        ${n(
      "Sistemas externos",
      this.model.externalSystems.map((s) => i(s.id, s.name))
    )}
        ${n("APIs", (this.model.apis ?? []).map((s) => i(s.id, s.name)))}
        ${n("Actores", (this.model.actors ?? []).map((s) => i(s.id, s.name)))}
        ${n("Agentes IA", (this.model.aiAgents ?? []).map((s) => i(s.id, s.name)))}
        ${n("Gateways MCP", (this.model.mcpGateways ?? []).map((s) => i(s.id, s.name)))}
        ${n("RAGs", (this.model.rags ?? []).map((s) => i(s.id, s.name)))}
        ${n("Flows", this.model.flows.map((s) => i(s.id, s.name)))}
        ${n("Procesos", (this.model.processes ?? []).map((s) => i(s.id, s.name)))}
        ${n("Workflows", (this.model.workflows ?? []).map((s) => i(s.id, s.name)))}
      </aside>
    `;
  }
  onElementSelected(e) {
    var t, i;
    if (this._selectedId = e.detail.id, this._multi = [], e.detail.kind === "process-step") {
      const n = (t = this.owningProcessOf(e.detail.id)) == null ? void 0 : t.steps.find((s) => s.id === e.detail.id);
      this._editStepRole = (n == null ? void 0 : n.roleId) ?? "", this._editStepDeadline = (n == null ? void 0 : n.deadline) ?? "", this._editStepComp = (n == null ? void 0 : n.compensationUseCaseId) ?? "";
    }
    if (e.detail.kind === "workflow-step") {
      const n = (i = this.owningWorkflowOf(e.detail.id)) == null ? void 0 : i.steps.find((s) => s.id === e.detail.id);
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
      const n = e.nodes.find((s) => s.id === i);
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
            const s = ge(i);
            s && t.add(s.appId);
            break;
          }
          case "flow":
            t.add(i.replace(/^flow:/, ""));
            break;
          case "process-step": {
            const s = this.owningProcessOf(i);
            s && t.add(s.id);
            break;
          }
          case "workflow-step": {
            const s = this.owningWorkflowOf(i);
            s && t.add(s.id);
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
    const t = new Set(e.memberIds), i = this.model.modules.filter((h) => t.has(h.id)), n = new Set(i.map((h) => h.id)), s = this.model.externalSystems.filter((h) => t.has(h.id)), o = new Set(s.map((h) => h.id)), a = (this.model.aggregates ?? []).filter(
      (h) => t.has(h.id) || n.has(h.moduleId)
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
      externalSystems: s,
      relations: this.model.relations.filter(
        (h) => n.has(h.sourceId) && n.has(h.targetId)
      ),
      flows: this.model.flows.filter(
        (h) => t.has(h.id) || (n.has(h.sourceId) || o.has(h.sourceId)) && (n.has(h.targetId) || o.has(h.targetId))
      ),
      aggregates: a,
      entities: (this.model.entities ?? []).filter((h) => d.has(h.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (h) => d.has(h.sourceAggregateId) && d.has(h.targetAggregateId)
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
    const n = `mi-${ne(e)}`;
    let s = n;
    for (let o = 2; t.has(s); o++) s = `${n}-${o}`;
    return s;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const i = (this.model.pages ?? []).find((o) => o.id === e);
    let n = null;
    const s = (o, a) => {
      var c;
      const d = o ?? [];
      for (let p = 0; p < d.length; p++)
        d[p].id === t && (n = { node: d[p], parentId: a, beforeId: ((c = d[p + 1]) == null ? void 0 : c.id) ?? null }), s(d[p].children, d[p].id);
    };
    return s(i == null ? void 0 : i.content, null), n;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, n, s = !1, o) {
    const a = o ?? this.allComponentIds(), d = (m) => {
      if (!s) return m.id;
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
    return n && c.push({
      kind: "move-page-component",
      pageId: e,
      componentId: g,
      parentComponentId: i ?? null,
      beforeComponentId: n
    }), { ops: c, rootId: g };
  }
  allComponentIds() {
    const e = /* @__PURE__ */ new Set(), t = (i) => {
      for (const n of i ?? [])
        e.add(n.id), t(n.children);
    };
    return (this.model.pages ?? []).forEach((i) => t(i.content)), e;
  }
  newComponentId(e) {
    const t = /* @__PURE__ */ new Set(), i = (o) => {
      for (const a of o ?? [])
        t.add(a.id), i(a.children);
    };
    (this.model.pages ?? []).forEach((o) => i(o.content));
    const n = `cmp-${ne(e)}`;
    let s = n;
    for (let o = 2; t.has(s) || t.has(`${s}-tab-1`); o++) s = `${n}-${o}`;
    return s;
  }
  /** Re-slots a wizard step unless it already sits exactly there. */
  moveWizardStep(e, t, i) {
    var o;
    if (i === t) return;
    const n = (((o = (this.model.pages ?? []).find((a) => a.id === e)) == null ? void 0 : o.wizardSteps) ?? []).map((a) => a.id ?? a.pageId), s = n.indexOf(t);
    s >= 0 && (i ? n[s + 1] === i : s === n.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: i });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((o) => o.id === e);
    let n = null;
    const s = (o, a) => {
      var c;
      const d = o ?? [];
      for (let p = 0; p < d.length; p++)
        d[p].id === t && (n = { entry: d[p], parentId: a, beforeId: ((c = d[p + 1]) == null ? void 0 : c.id) ?? null }), s(d[p].children, d[p].id ?? null);
    };
    return s(i == null ? void 0 : i.menuItems, null), n;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var a;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, i, n = null;
    if (this._selectedCmp) {
      const d = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!d) return;
      t = this._selectedCmp.pageId, ae.LEAF_KINDS.has(d.node.kind) ? (i = d.parentId ?? void 0, n = d.beforeId) : i = d.node.kind === "tabLayout" && e.kind !== "tab" ? (a = (d.node.children ?? [])[0]) == null ? void 0 : a.id : d.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((d) => d.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: s, rootId: o } = this.rebuildComponentOps(t, e, i, n, !0);
    for (const d of s) this.command(d, !1);
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
      const { id: i, w: n, h: s } = t.detail, o = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: i, size: ((a = o.sizes) == null ? void 0 : a[i]) ?? null }
      ]), this.writeViewLayout("design", {
        ...o,
        sizes: { ...o.sizes ?? {}, [i]: { w: n, h: s } }
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
      const { pageId: i, componentId: n, ...s } = t.detail;
      this.command({ kind: "set-page-component", pageId: i, componentId: n, ...s });
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
      const { pageId: i, fieldId: n, stereotype: s, colspan: o, label: a } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: n, stereotype: s, colspan: o, label: a });
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
          (n) => (n.scheduledTriggers ?? []).map((s) => ({ id: s.id, name: s.name }))
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
        items: e.modules.flatMap((n) => (n.useCases ?? []).map((s) => ({ id: s.id, name: s.name })))
      },
      {
        label: "Eventos",
        symbol: "event",
        color: "#f59e0b",
        items: e.modules.flatMap((n) => [
          ...(n.domainEvents ?? []).map((s) => ({ id: s.id, name: s.name })),
          ...(n.applicationEvents ?? []).map((s) => ({ id: s.id, name: s.name }))
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
        items: e.modules.flatMap((n) => (n.readModels ?? []).map((s) => ({ id: s.id, name: s.name })))
      },
      {
        label: "Operaciones de consulta",
        symbol: "lens",
        color: "#0284c7",
        items: e.modules.flatMap(
          (n) => (n.queryServices ?? []).flatMap(
            (s) => (s.operations ?? []).map((o) => ({ id: o.id, name: `${o.name} (${s.name})` }))
          )
        )
      },
      {
        label: "Query services",
        symbol: "lens",
        color: "#0284c7",
        items: e.modules.flatMap((n) => (n.queryServices ?? []).map((s) => ({ id: s.id, name: s.name })))
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
          ...(n.useCases ?? []).map((s) => ({ id: s.id, name: s.name })),
          ...(n.tables ?? []).map((s) => ({ id: s.id, name: s.name })),
          ...(n.mcpServers ?? []).map((s) => ({ id: s.id, name: s.name }))
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
        items: (e.apis ?? []).flatMap((n) => n.operations.map((s) => ({ id: s.id, name: s.name })))
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
      items: i ? n.items.filter((s) => s.name.toLowerCase().includes(i)) : n.items
    })).filter((n) => n.items.length > 0);
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
    const n = i.sceneFromClient(e.clientX, e.clientY), s = i.nodeIdAtClient(e.clientX, e.clientY), o = this._view === "design" && "dropSlotAtClient" in i ? i.dropSlotAtClient(e.clientX, e.clientY) : null;
    let a;
    try {
      a = JSON.parse(t);
    } catch {
      return;
    }
    a.new ? this.createFromPalette(a.new, n, s, o) : a.existing && this.placeExistingFromPalette(a.existing, n, s, e.clientX, e.clientY, o);
  }
  /**
   * A name (and its slug id, WITH the kind's prefix) that does not collide with
   * anything already in the model. The pool sweeps every element: testing the raw
   * slug against a partial pool once made a second «Caso de uso» silently reuse
   * the first one's id — and the backend ignores duplicate adds.
   */
  uniquePaletteName(e, t) {
    const i = new Set(this.sceneFor(this._view).nodes.map((s) => s.id)), n = this.model;
    for (const s of [
      n.modules.map((o) => o.id),
      n.modules.flatMap((o) => (o.useCases ?? []).map((a) => a.id)),
      n.modules.flatMap((o) => (o.domainEvents ?? []).map((a) => a.id)),
      n.modules.flatMap((o) => (o.applicationEvents ?? []).map((a) => a.id)),
      n.modules.flatMap((o) => (o.readModels ?? []).map((a) => a.id)),
      n.modules.flatMap((o) => (o.domainServices ?? []).map((a) => a.id)),
      n.modules.flatMap((o) => (o.queryServices ?? []).map((a) => a.id)),
      n.modules.flatMap((o) => (o.scheduledTriggers ?? []).map((a) => a.id)),
      (n.aggregates ?? []).map((o) => o.id),
      (n.entities ?? []).map((o) => o.id),
      (n.actors ?? []).map((o) => o.id),
      n.externalSystems.map((o) => o.id),
      n.externalSystems.flatMap((o) => (o.useCases ?? []).map((a) => a.id)),
      n.externalSystems.flatMap((o) => (o.tables ?? []).map((a) => a.id)),
      n.externalSystems.flatMap((o) => (o.mcpServers ?? []).map((a) => a.id)),
      (n.apis ?? []).map((o) => o.id),
      (n.apis ?? []).flatMap((o) => (o.operations ?? []).map((a) => a.id)),
      (n.proxyApis ?? []).map((o) => o.id),
      (n.aiAgents ?? []).map((o) => o.id),
      (n.mcpGateways ?? []).map((o) => o.id),
      (n.rags ?? []).map((o) => o.id),
      (n.workflows ?? []).map((o) => o.id),
      (n.workflows ?? []).flatMap((o) => (o.steps ?? []).map((a) => a.id)),
      (n.etlFlows ?? []).map((o) => o.id),
      (n.identityProviders ?? []).map((o) => o.id),
      (n.notifications ?? []).map((o) => o.id),
      (n.documents ?? []).map((o) => o.id),
      (n.uiApps ?? []).map((o) => o.id),
      (n.pages ?? []).map((o) => o.id)
    ])
      s.forEach((o) => i.add(o));
    for (let s = 1; ; s++) {
      const o = s === 1 ? e : `${e} ${s}`, a = `${t}${ne(o)}`;
      if (!i.has(a)) return { id: a, name: o };
    }
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var o, a;
    if (!t) return null;
    const i = this.sceneFor(this._view), n = [];
    for (let d = t; d; )
      n.push(d), d = (o = i.nodes.find((c) => c.id === d)) == null ? void 0 : o.parentId;
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
    ].includes(e)) return n.find((d) => this.model.modules.some((c) => c.id === d)) ?? null;
    if (e === "read-model") {
      const d = n.find((p) => (this.model.aggregates ?? []).some((g) => g.id === p));
      if (d) return d;
      const c = n.find((p) => this.model.modules.some((g) => g.id === p));
      return ((a = (this.model.aggregates ?? []).find((p) => p.moduleId === c)) == null ? void 0 : a.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return n.find((d) => this.model.externalSystems.some((c) => c.id === d)) ?? null;
    if (e === "use-case-step")
      return n.find(
        (d) => this.model.modules.some((c) => (c.useCases ?? []).some((p) => p.id === d))
      ) ?? null;
    if (e === "api-operation") {
      for (const d of n) {
        if ((this.model.apis ?? []).some((g) => g.id === d)) return d;
        const c = /^apiimpl:(.+)@(.+)$/.exec(d);
        if (c && (this.model.apis ?? []).some((g) => g.id === c[1])) return c[1];
        const p = (this.model.proxyApis ?? []).find((g) => g.id === d);
        if (p != null && p.targetApiId) return p.targetApiId;
      }
      return null;
    }
    return e === "api" ? n.find((d) => this.model.externalSystems.some((c) => c.id === d)) ?? n.find((d) => this.model.modules.some((c) => c.id === d)) ?? null : null;
  }
  createFromPalette(e, t, i, n = null) {
    var h, r, u, f, k, A, R;
    const s = Y.PALETTE_NEW.find((T) => T.type === e);
    if (!s) return;
    if (e.startsWith("cmp:")) {
      const T = e.slice(4), x = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, w = x ? x[1] : i && (this.model.pages ?? []).some((L) => L.id === i) ? i : null;
      if (!w) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let P = x ? x[2] : void 0, U = null;
      if (T === "tab") {
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
      if (n != null && n.componentId && n.pos !== "into") {
        const L = this.componentIn(w, n.componentId);
        L && L.node.kind === "tab" ? P = L.node.id : L && (P = L.parentId ?? void 0, U = n.pos === "before" ? n.componentId : L.beforeId);
      } else if (P) {
        const L = ((h = this.componentIn(w, P)) == null ? void 0 : h.node) ?? null;
        (L == null ? void 0 : L.kind) === "tabLayout" && (L.children ?? [])[0] && (P = (L.children ?? [])[0].id);
      }
      const D = this.newComponentId(T), z = {
        kind: "add-page-component",
        pageId: w,
        componentId: D,
        componentKind: T,
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
    const o = this._view, a = this.sceneFor(o), d = (T, x) => {
      const w = this.viewLayout(o), P = x ? a.nodes.find((D) => D.id === x) : void 0, U = P ? { x: Math.round(t.x - P.x), y: Math.round(t.y - P.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(o, { ...w, nodes: { ...w.nodes, [T]: U } }), { kind: "move-node", view: o, id: T, pos: null };
    }, c = (T, x, w) => {
      const P = this.inverseOf(T) ?? [];
      this.command(T, !1);
      const U = d(x, w);
      this.pushUndoEntry([...P, U]);
    };
    if (!s.child) {
      const T = {
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
      }, { id: x, name: w } = this.uniquePaletteName(s.label, T[e] ?? ""), P = e === "module" ? { kind: "add-module", id: x, name: w, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: x, name: w } : e === "external-system" ? { kind: "add-external-system", id: x, name: w } : e === "ai-agent" ? { kind: "add-ai-agent", id: x, name: w } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: x, name: w, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: x, name: w } : e === "rag" ? { kind: "add-rag", id: x, name: w } : e === "api" ? { kind: "add-api", id: x, name: w } : e === "proxy-api" ? { kind: "add-proxy-api", id: x, name: w } : e === "ui-app" ? { kind: "create-ui-app", id: x, name: w } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: x, name: w, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: x, name: w, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: x, name: w, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: x, name: w } : e === "identity-provider" ? { kind: "add-identity-provider", id: x, name: w } : {
        kind: "add-workflow",
        id: x,
        name: w,
        completionEventName: `${w.replace(/\s+/g, "")}Completado`
      };
      c(P, x);
      return;
    }
    if (e === "ui-wizard-step") {
      const T = [];
      for (let D = i ?? void 0; D; )
        T.push(D), D = (r = a.nodes.find((z) => z.id === D)) == null ? void 0 : r.parentId;
      const x = T.map((D) => {
        var z;
        return ((z = /^wizrow:([^:]+):/.exec(D)) == null ? void 0 : z[1]) ?? D;
      }).find((D) => (this.model.pages ?? []).some((z) => z.id === D && z.type === "WIZARD"));
      if (!x) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const w = ((u = (this.model.pages ?? []).find((D) => D.id === x)) == null ? void 0 : u.wizardSteps) ?? [], P = new Set(w.map((D) => D.id ?? D.pageId));
      let U = w.length + 1;
      for (; P.has(`wzs-${U}`); ) U++;
      this.command({ kind: "add-page-wizard-step", pageId: x, itemId: `wzs-${U}`, label: `Paso ${U}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const T = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", x = T === "CRUD" ? "CRUD" : T === "WIZARD" ? "Wizard" : "Página", { id: w, name: P } = this.uniquePaletteName(x, "page-"), U = [];
      for (let L = i ?? void 0; L; )
        U.push(L), L = (f = a.nodes.find((q) => q.id === L)) == null ? void 0 : f.parentId;
      const D = U.find((L) => (this.model.uiApps ?? []).some((q) => q.id === L)), z = U.map((L) => {
        var q;
        return ((q = /^wizrow:([^:]+):/.exec(L)) == null ? void 0 : q[1]) ?? L;
      }).find((L) => (this.model.pages ?? []).some((q) => q.id === L && q.type === "WIZARD"));
      if (z) {
        const L = a.nodes.find((le) => le.id === z);
        L && (t.x = L.x + L.w / 2 + 160, t.y = L.y - L.h / 2 + 40), this.command({ kind: "create-ui-page", id: w, name: P, pageType: T }, !1), this.command({ kind: "add-page-wizard-step", pageId: z, targetId: w }, !1);
        const q = d(w);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: w }, q]), this.emit("modux-notice", { message: `${P} creada como paso del wizard` });
        return;
      }
      if (D) {
        const L = a.nodes.find((q) => q.id === D);
        L && (t.x = L.x + L.w / 2 + 160, t.y = L.y - L.h / 2 + 40);
      }
      c(
        D ? { kind: "create-ui-page", id: w, name: P, pageType: T, appId: D, menuLabel: P } : { kind: "create-ui-page", id: w, name: P, pageType: T },
        w
      );
      return;
    }
    if (e === "menu-item") {
      const T = [];
      for (let z = i ?? void 0; z; )
        T.push(z), z = (k = a.nodes.find((L) => L.id === z)) == null ? void 0 : k.parentId;
      const x = T.find((z) => (this.model.uiApps ?? []).some((L) => L.id === z));
      if (!x) {
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
      const D = T.map((z) => ge(z)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: x,
        label: U,
        itemId: this.newMenuItemId(U),
        parentId: D == null ? void 0 : D.itemId,
        parentLabel: D != null && D.itemId || D == null ? void 0 : D.label
      });
      return;
    }
    if (e === "etl-transform") {
      const T = [];
      for (let U = i ?? void 0; U; )
        T.push(U), U = (A = a.nodes.find((D) => D.id === U)) == null ? void 0 : A.parentId;
      const x = T.map((U) => (this.model.etlFlows ?? []).find((D) => D.id === U)).find(Boolean);
      if (!x) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const w = new Set((x.steps ?? []).map((U) => U.id));
      let P = (x.steps ?? []).length + 1;
      for (; w.has(`ets-${P}`); ) P++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: x.id,
        id: `ets-${P}`,
        name: `Transformación ${P}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "workflow-step") {
      const T = this.model.workflows ?? [], x = [];
      for (let L = i ?? void 0; L; )
        x.push(L), L = (R = a.nodes.find((q) => q.id === L)) == null ? void 0 : R.parentId;
      const w = x.map((L) => T.find((q) => q.id === L)).find(Boolean), P = x.map((L) => {
        const q = T.find((le) => (le.steps ?? []).some((I) => I.id === L));
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
      const T = this.dropContainerFor("api", i);
      if (!T) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: x, name: w } = this.uniquePaletteName("API", "api-"), P = { kind: "add-api", id: x, name: w }, U = this.inverseOf(P) ?? [];
      this.command(P, !1), this.model.externalSystems.some((q) => q.id === T) ? this.command({ kind: "set-api-publisher", id: x, targetId: T }, !1) : this.command({ kind: "add-api-implementation", apiId: x, moduleId: T }, !1);
      const D = this.viewLayout(this._view), z = this.sceneFor(this._view).nodes.find((q) => q.id === T), L = z ? { x: Math.round(t.x - z.x), y: Math.round(t.y - z.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...D, nodes: { ...D.nodes, [x]: L } }), this.pushUndoEntry([...U, { kind: "move-node", view: this._view, id: x, pos: null }]);
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
    }, { id: m, name: y } = this.uniquePaletteName(s.label, g[e] ?? "");
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
      const T = (this.model.aggregates ?? []).find((x) => x.id === p);
      c({ kind: "add-read-model", id: m, name: y, aggregateId: p }, m, (T == null ? void 0 : T.moduleId) ?? p);
    } else if (e === "api-operation") {
      const T = (this.model.apis ?? []).find((D) => D.id === p), x = new Set(((T == null ? void 0 : T.operations) ?? []).map((D) => D.id));
      let w = y, P = `apiop-${p.replace(/^api-/, "")}-${ne(w)}`;
      for (let D = 2; x.has(P); D++)
        w = `${s.label} ${D}`, P = `apiop-${p.replace(/^api-/, "")}-${ne(w)}`;
      c({ kind: "add-api-operation", apiId: p, id: P, name: w }, P, p), a.nodes.some(
        (D) => D.parentId === p && (D.kind === "api-operation" || D.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(T == null ? void 0 : T.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const T = this.model.modules.flatMap((U) => U.useCases ?? []).find((U) => U.id === p), x = new Set((T == null ? void 0 : T.stepIds) ?? []);
      let w = y, P = `step-${ne(w)}`;
      for (let U = 2; x.has(P); U++)
        w = `${s.label} ${U}`, P = `step-${ne(w)}`;
      c({ kind: "add-use-case-step", useCaseId: p, id: P, name: w }, P, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(T == null ? void 0 : T.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
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
    const n = t ? /^btn:([^:]+):(.+)$/.exec(t) : null;
    if (n) {
      const h = (this.model.modelMappings ?? []).find((u) => u.id === e);
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
      const r = this.model.modules.flatMap((u) => u.useCases ?? []).find((u) => u.id === e);
      if (r) {
        if (e === n[2]) return;
        const u = (this.model.pages ?? []).find((k) => k.id === n[1]), f = ((u == null ? void 0 : u.buttons) ?? []).find((k) => k.useCaseId === n[2]);
        if (!f) return;
        if (((u == null ? void 0 : u.buttons) ?? []).some((k) => k.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: n[1], useCaseId: n[2] }, !1), this.command(
          { kind: "add-page-button", pageId: n[1], useCaseId: e, label: f.label, type: f.bar },
          !1
        ), f.mappingId && this.command(
          { kind: "set-page-button", pageId: n[1], useCaseId: e, label: null, mappingId: f.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: n[1], useCaseId: e },
          { kind: "add-page-button", pageId: n[1], useCaseId: n[2], label: f.label, type: f.bar },
          ...f.mappingId ? [{ kind: "set-page-button", pageId: n[1], useCaseId: n[2], label: null, mappingId: f.mappingId }] : []
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${r.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const s = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (s) {
      const h = this.model.modules.flatMap((u) => u.useCases ?? []).find((u) => u.id === e);
      if (!h) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const r = (this.model.pages ?? []).find((u) => u.id === s[1]);
      if (((r == null ? void 0 : r.buttons) ?? []).some((u) => u.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: s[1], useCaseId: e, type: s[2] }), this.emit("modux-notice", { message: `Botón de ${h.name} en la barra ${s[2] === "bottom" ? "de abajo" : "superior"}` });
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
  placeExistingFromPalette(e, t, i, n, s, o = null) {
    if (this._view === "design") {
      this.dropCatalogOnDesign(e, i, o);
      return;
    }
    if (i && i !== e) {
      this.applyConnection(e, i, n, s);
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
      (n) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(n.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider"].includes(n.type) : this._view === "design" ? n.type === "page" || n.type.startsWith("cmp:") : !["ui-app", "page", "menu-item"].includes(n.type) && !n.type.startsWith("cmp:")) && (!e || n.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return E`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(n) => this._paletteFilter = n.target.value}
          />
          ${i === "new" ? E`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${Y.PALETTE_GROUPS.map((n) => {
      const s = t.filter((o) => o.group === n);
      return s.length ? E`
                        <div class="palette-g">${n}</div>
                        ${s.map(
        (o) => E`
                            <div
                              class="palette-item ${o.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${o.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : o.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(a) => this.onPaletteDragStart(a, { new: o.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${o.color}">
                                ${It[o.symbol]}
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
      (n) => E`
                    <div class="palette-g">${n.label}</div>
                    ${n.items.map(
        (s) => E`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(o) => this.onPaletteDragStart(o, { existing: s.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${n.color}">
                            ${It[n.symbol]}
                          </svg>
                          <span class="pal-label">${s.name}</span>
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
    var t, i, n, s, o, a, d;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const c = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!c) return;
        this.command({ kind: "add-aggregate", id: `agg-${ne(e)}`, name: e, moduleId: c });
      } else if (this._view === "flows") {
        const c = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), p = this._newTargetId || ((s = this.model.modules[0]) == null ? void 0 : s.id), g = this._newTriggerEvent.trim();
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
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? ko(i, t.nodes) : e === "flows" ? To(i, t.nodes) : e === "processes" ? hn(i, t.nodes) : e === "workflows" ? Wl(i, t.nodes) : e === "ui" ? Kl(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "mappings" ? Zl(i, t.nodes) : e === "eventstorming" ? Nl(i, t.nodes) : go(
      i,
      t.nodes,
      this._detail,
      t.sizes ?? {},
      new Set(t.collapsed ?? [])
    );
    if (this.diff)
      for (const s of n.nodes) {
        const o = this.diff[s.id] ?? this.diff[s.id.replace(/^(tgt:|flow:)/, "")];
        o && (s.diffKind = o);
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
    var c;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((p) => !p.parentId), n = new Set(i.map((p) => p.id)), s = {
      nodes: i,
      edges: t.edges.filter((p) => n.has(p.sourceId) && n.has(p.targetId))
    }, a = await Jl(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), d = this.viewLayout(e);
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
    var s;
    const t = e.target, i = e.type === "change" && t instanceof HTMLSelectElement, n = e.type === "click" && !!t.closest("button");
    !i && !n || (s = this.renderRoot.querySelector("modux-canvas")) == null || s.focus();
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
        var i, n;
        return E`<option
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
      const i = t.detail.kind === "policy" ? "use-case" : t.detail.kind, n = is(t.detail.id, i);
      n && this.emit("modux-activate", n);
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
      (s) => s.sourceId === e.sourceId && s.targetId === e.targetId
    )) == null ? void 0 : n.type, i = [
      { type: "DEPENDS", abbr: "DEP", name: "Dependencia simple" },
      { type: "CQRS", abbr: "CQRS", name: "CQRS — consulta sobre sus datos" }
    ];
    return E`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (s) => E`
            <button
              class="picker-item ${s.type === (t ?? "") ? "current" : ""}"
              title=${s.name}
              @click=${() => this.pickExtDepType(s.type)}
            >
              <span class="abbr">${s.abbr}</span>
              <span class="name">${s.name}</span>
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
      (n) => n.sourceId === e.sourceId && n.targetId === e.targetId
    )) == null ? void 0 : i.type : this._relationType;
    return E`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Ic.map(
      (n) => E`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${Xi[n].abbr}</span>
              <span class="name">${Xi[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
Y.styles = ct`
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
  pt("modux-editor")
], Y);
var wc = Object.defineProperty, bc = Object.getOwnPropertyDescriptor, Ce = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? bc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (n ? a(t, i, s) : a(s)) || s);
  return n && s && wc(t, i, s), s;
};
let Ie = class extends Ne {
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
    ], t = (n) => Ie.TYPE_LABELS[n] ?? n;
    return E`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: n, title: s, mark: o, cls: a }) => {
      const d = this._diff.changes.filter((c) => c.kind === n);
      return d.length ? E`
            <div class="diff-group">${s} (${d.length})</div>
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
      const i = JSON.parse(localStorage.getItem("mateu-app-context") ?? "{}"), n = JSON.parse(localStorage.getItem("mateu-app-context-labels") ?? "{}");
      i.model = e, n.model = t, localStorage.setItem("mateu-app-context", JSON.stringify(i)), localStorage.setItem("mateu-app-context-labels", JSON.stringify(n));
    } catch {
    }
  }
  /** create / discard / status / merge against the solutions API, then reload. */
  async solutionOp(e, t) {
    var s, o, a;
    const i = (s = this._workspace) == null ? void 0 : s.current;
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
    const n = (o = this._workspace) == null ? void 0 : o.current;
    if (n && n !== i) {
      const d = ((a = this._workspace.solutions.find((c) => c.branch === n)) == null ? void 0 : a.name) ?? n.replace(/^solution\//, "");
      this.syncModelContext(
        n,
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
    const { content: t, fileName: i, apiId: n, homeExternalId: s, homeModuleId: o } = e.detail;
    await this.trackWrite(async () => {
      try {
        const a = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: n })
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
        const { apiId: d } = await a.json(), c = s ? { kind: "set-api-publisher", id: d, targetId: s } : o ? { kind: "add-api-implementation", apiId: d, moduleId: o } : null;
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
          let n = `El servidor rechazó el comando (${t.status})`;
          try {
            const s = await t.json();
            s != null && s.message && (n = s.message);
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
      const i = (n) => this._diff.changes.filter((s) => s.kind === n).length;
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
      var n;
      const i = (n = this._workspace.solutions.find(
        (s) => s.branch === this._workspace.current
      )) == null ? void 0 : n.status;
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
Ie.styles = ct`
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
  pt("modux-editor-connected")
], Ie);
export {
  xc as CONTAINER_HEADER,
  kc as CONTAINER_INSET,
  me as ModuxCanvas,
  Y as ModuxEditor,
  Ie as ModuxEditorConnected,
  ko as aggregatesScene,
  it as apiImplNodeId,
  tt as apiOpOccurrenceId,
  zi as containerFit,
  oo as containerMinSize,
  go as contextMapScene,
  mo as flowCoherence,
  To as flowsScene,
  Jt as normalizeViewLayout,
  hn as processesScene,
  uo as relationEdgeId,
  Qi as resolveOverlaps
};
