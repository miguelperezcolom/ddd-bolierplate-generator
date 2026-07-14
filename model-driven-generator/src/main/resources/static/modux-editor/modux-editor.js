const Oc = 34, Nc = 10;
function ra(e, t = 24) {
  const n = new Map(e.map((o) => [o.id, { x: o.x, y: o.y }]));
  for (let o = 0; o < 80; o++) {
    let s = !1;
    for (let a = 0; a < e.length; a++)
      for (let r = a + 1; r < e.length; r++) {
        const l = e[a], p = e[r], g = n.get(l.id), f = n.get(p.id), m = f.x - g.x, y = f.y - g.y, I = (l.w + p.w) / 2 + t - Math.abs(m), c = (l.h + p.h) / 2 + t - Math.abs(y);
        if (!(I <= 0 || c <= 0))
          if (s = !0, I < c) {
            const d = (m >= 0 ? 1 : -1) * I / 2;
            g.x -= d, f.x += d;
          } else {
            const d = (y >= 0 ? 1 : -1) * c / 2;
            g.y -= d, f.y += d;
          }
      }
    if (!s) break;
  }
  const i = /* @__PURE__ */ new Map();
  for (const o of e) {
    const s = n.get(o.id);
    (Math.abs(s.x - o.x) > 0.5 || Math.abs(s.y - o.y) > 0.5) && i.set(o.id, s);
  }
  return i;
}
function da(e, t = { w: 160, h: 90 }) {
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
function Rc(e, t, n) {
  let i = t.w / 2, o = t.w / 2, s = t.h / 2, a = t.h / 2;
  for (const r of n)
    i = Math.max(i, -r.dx + r.w / 2 + 10), o = Math.max(o, r.dx + r.w / 2 + 10), s = Math.max(s, -r.dy + r.h / 2 + 34), a = Math.max(a, r.dy + r.h / 2 + 10);
  return {
    x: e.x + (o - i) / 2,
    y: e.y + (a - s) / 2,
    w: i + o,
    h: s + a
  };
}
function at(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return {
      nodes: t.nodes ?? {},
      edges: t.edges ?? {},
      sizes: t.sizes ?? {},
      detail: t.detail,
      collapsed: t.collapsed,
      expanded: t.expanded,
      flat: t.flat
    };
  }
  return { nodes: e, edges: {}, sizes: {} };
}
const la = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, ri = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, ca = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Ke = 168, Xe = 56;
function ct(e, t) {
  return `apiimpl:${e}@${t}`;
}
function pt(e, t) {
  return `apiop:${e}@${t}`;
}
function to(e, t) {
  const n = new Map((e.apis ?? []).map((i) => [i.id, i]));
  return (e.apiImplementations ?? []).filter((i) => i.boundedContextId === t && n.has(i.apiId)).map((i) => ({
    id: ct(i.apiId, i.boundedContextId),
    name: n.get(i.apiId).name,
    kind: "api-impl"
  }));
}
function pa(e, t) {
  const n = t.targetApiId ? (e.apis ?? []).find((i) => i.id === t.targetApiId) : void 0;
  return (n == null ? void 0 : n.operations) ?? [];
}
const ua = 108, ma = 32;
function fa(e, t) {
  return `rel:${e}->${t}`;
}
function ha(e, t) {
  const n = new Set(e.externalSystems.map((i) => i.id));
  return t.sourceId === t.targetId ? "INTERNAL" : n.has(t.sourceId) || n.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (i) => i.sourceId === t.sourceId && i.targetId === t.targetId && i.declared
  ) ? "OK" : e.relations.some(
    (i) => i.sourceId === t.targetId && i.targetId === t.sourceId && i.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function no(e, t = "unified") {
  const n = /* @__PURE__ */ new Map();
  if (t === "distribution") {
    for (const o of e.boundedContexts) {
      const s = (e.modules ?? []).filter((a) => a.boundedContextId === o.id);
      if (!(s.length <= 1))
        for (const a of s) {
          n.set(a.id, o.id);
          for (const r of a.elementIds ?? []) n.set(r, a.id);
        }
    }
    return n;
  }
  const i = (o, s, a) => {
    const r = (e.apis ?? []).find((l) => l.id === o);
    for (const l of (r == null ? void 0 : r.operations) ?? [])
      n.set(s ? pt(l.id, s) : l.id, a);
  };
  for (const o of e.boundedContexts) {
    for (const s of zn(e, o)) n.set(s.id, o.id);
    for (const s of to(e, o.id)) {
      n.set(s.id, o.id);
      const a = /^apiimpl:(.+)@(.+)$/.exec(s.id);
      a && i(a[1], a[2], s.id);
    }
  }
  for (const o of e.externalSystems) {
    o.parentExternalSystemId && n.set(o.id, o.parentExternalSystemId);
    for (const s of o.useCases ?? []) n.set(s.id, o.id);
    for (const s of o.tables ?? []) n.set(s.id, o.id);
    for (const s of o.mcpServers ?? []) n.set(s.id, o.id);
  }
  for (const o of e.apis ?? [])
    o.publishedByExternalSystemId && n.set(o.id, o.publishedByExternalSystemId), i(o.id, null, o.id);
  for (const o of e.proxyApis ?? [])
    o.publishedByExternalSystemId && n.set(o.id, o.publishedByExternalSystemId), o.targetApiId && i(o.targetApiId, o.id, o.id);
  return n;
}
function st(e, t) {
  const n = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(n),
    y: 340 + 240 * Math.sin(n)
  };
}
const ga = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, ya = {
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
  "ui-app": { symbol: "component", fill: "#f0f9ff", stroke: "#0ea5e9" },
  module: { symbol: "component", fill: "#ffffff", stroke: "#334155" }
}, ba = {
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
  "ui-app": "App — la UI de este bounded context (sus páginas se detallan en la vista UI)",
  module: "Módulo — unidad de distribución; arrastra el asa de un elemento hasta él para empaquetarlo"
};
function zn(e, t) {
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
function Ia(e, t, n = {}, i = /* @__PURE__ */ new Set(), o = !1) {
  return io(e, t, "unified", n, i, o);
}
function va(e, t, n = {}, i = /* @__PURE__ */ new Set(), o = !1) {
  return io(e, t, "distribution", n, i, o);
}
function io(e, t, n, i = {}, o = /* @__PURE__ */ new Set(), s = !1) {
  const a = n === "distribution";
  if (s) {
    const u = new Set(o);
    for (const T of e.boundedContexts) u.add(T.id);
    for (const T of e.externalSystems) u.add(T.id);
    for (const T of e.apis ?? []) u.add(T.id);
    for (const T of e.proxyApis ?? []) u.add(T.id);
    for (const T of e.apiImplementations ?? [])
      u.add(ct(T.apiId, T.boundedContextId));
    for (const T of e.modules ?? []) u.add(T.id);
    o = u;
  }
  const r = !a, l = new Set(e.externalSystems.map((u) => u.id)), p = (e.apis ?? []).filter(
    (u) => u.publishedByExternalSystemId && l.has(u.publishedByExternalSystemId)
  ), g = new Set(p.map((u) => u.id)), f = (e.proxyApis ?? []).filter(
    (u) => u.publishedByExternalSystemId && l.has(u.publishedByExternalSystemId)
  ), m = new Set(f.map((u) => u.id)), y = new Map((e.apis ?? []).map((u) => [u.id, u])), I = new Map((e.proxyApis ?? []).map((u) => [u.id, u])), c = (u, T) => {
    var z;
    if (a) {
      if (T === "boundedContext") {
        const F = (e.modules ?? []).filter((U) => U.boundedContextId === u);
        return F.length <= 1 ? [] : F.map((U) => ({ id: U.id, name: U.name, kind: "module" }));
      }
      if (T === "module") {
        const F = (e.modules ?? []).find((ue) => ue.id === u), U = e.boundedContexts.find((ue) => ue.id === (F == null ? void 0 : F.boundedContextId));
        if (!F || !U) return [];
        const Q = new Map(zn(e, U).map((ue) => [ue.id, ue]));
        return (F.elementIds ?? []).map((ue) => Q.get(ue)).filter((ue) => !!ue);
      }
      return [];
    }
    switch (T) {
      case "boundedContext": {
        const F = e.boundedContexts.find((U) => U.id === u);
        return F ? [...to(e, u), ...zn(e, F)] : [];
      }
      case "external-system": {
        const F = e.externalSystems.find((U) => U.id === u);
        return [
          ...e.externalSystems.filter((U) => U.parentExternalSystemId === u).map((U) => ({ id: U.id, name: U.name, kind: "external-system" })),
          ...p.filter((U) => U.publishedByExternalSystemId === u).map((U) => ({ id: U.id, name: U.name, kind: "api" })),
          ...f.filter((U) => U.publishedByExternalSystemId === u).map((U) => ({ id: U.id, name: U.name, kind: "proxy-api" })),
          ...((F == null ? void 0 : F.useCases) ?? []).map(
            (U) => ({ id: U.id, name: U.name, kind: "external-use-case" })
          ),
          ...((F == null ? void 0 : F.tables) ?? []).map(
            (U) => ({ id: U.id, name: U.name, kind: "external-table" })
          ),
          ...((F == null ? void 0 : F.mcpServers) ?? []).map(
            (U) => ({ id: U.id, name: U.name, kind: "mcp-server" })
          )
        ];
      }
      case "api":
        return (((z = y.get(u)) == null ? void 0 : z.operations) ?? []).map(
          (F) => ({ id: F.id, name: F.name, kind: "api-operation" })
        );
      case "api-impl": {
        const F = /^apiimpl:(.+)@(.+)$/.exec(u), U = F ? y.get(F[1]) : void 0;
        return ((U == null ? void 0 : U.operations) ?? []).map(
          (Q) => ({
            id: pt(Q.id, F[2]),
            name: Q.name,
            kind: "api-op-occurrence"
          })
        );
      }
      case "proxy-api": {
        const F = I.get(u);
        return F ? pa(e, F).map(
          (U) => ({
            id: pt(U.id, u),
            name: U.name,
            kind: "api-op-occurrence"
          })
        ) : [];
      }
      default:
        return [];
    }
  }, d = [], h = [], x = (u, T, z) => {
    const F = -Math.PI / 2 + 2 * Math.PI * T / Math.max(z, 1), U = 160 + 12 * Math.min(z, 14);
    return { x: u.x + U * Math.cos(F), y: u.y + U * Math.sin(F) };
  }, _ = (u, T, z, F) => {
    const U = c(u, T);
    U.forEach((Q, ue) => {
      const ze = t[Q.id] ?? x(F, ue, U.length), ie = c(Q.id, Q.kind), be = o.has(Q.id) && ie.length > 0, Pe = Q.policy ? ga : ya[Q.kind], Ue = Q.kind === "external-system";
      d.push({
        id: Q.id,
        label: Q.name,
        kind: Q.kind,
        x: ze.x,
        y: ze.y,
        w: Ue ? 150 : ua + 12,
        h: Ue ? 44 : ma + 4,
        symbol: Pe.symbol,
        fill: Pe.fill,
        stroke: Pe.stroke,
        dashed: Ue || void 0,
        ownerId: u,
        collapsible: ie.length > 0,
        collapsed: ie.length > 0 && !be,
        tooltip: `${Q.policy ? "Policy" : ba[Q.kind]} ${Q.name} — parte de ${z}`
      }), h.push({
        id: `contains:${u}->${Q.id}`,
        sourceId: u,
        targetId: Q.id,
        kind: "contains",
        color: "#94a3b8",
        tooltip: `${z} contiene ${Q.name}`
      }), be && _(Q.id, Q.kind, Q.name, ze);
    });
  }, A = [
    ...e.boundedContexts.map((u) => ({ ref: u, external: !1, api: !1, proxy: !1 })),
    ...(a ? [] : e.externalSystems).filter((u) => !u.parentExternalSystemId || !l.has(u.parentExternalSystemId)).map((u) => ({ ref: u, external: !0, api: !1, proxy: !1 })),
    ...a ? [] : (e.apis ?? []).filter((u) => !g.has(u.id)).map((u) => ({ ref: u, external: !1, api: !0, proxy: !1 })),
    ...a ? [] : (e.proxyApis ?? []).filter((u) => !m.has(u.id)).map((u) => ({ ref: u, external: !1, api: !1, proxy: !0 })),
    ...a ? [] : (e.workflows ?? []).map((u) => ({
      ref: u,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones enter through their context.
    ...a ? [] : (e.etlFlows ?? []).filter((u) => !u.ownerBoundedContextId).map((u) => ({
      ref: u,
      external: !1,
      api: !1,
      proxy: !1,
      etl: !0
    })),
    ...(e.identityProviders ?? []).map((u) => ({
      ref: u,
      external: !1,
      api: !1,
      proxy: !1,
      idp: !0
    }))
  ];
  A.forEach((u, T) => {
    const z = t[u.ref.id] ?? st(T, A.length);
    if ("idp" in u && u.idp) {
      const ie = u.ref, be = !!ie.publishedByExternalSystemId;
      d.push({
        id: ie.id,
        label: ie.name,
        kind: "identity-provider",
        symbol: "key",
        fill: be ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: be,
        badge: ie.type ?? "IDP",
        tooltip: `${ie.name} — emite las identidades que el sistema confía${be ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: z.x,
        y: z.y,
        w: Ke,
        h: Xe
      });
      return;
    }
    if ("etl" in u && u.etl) {
      const ie = u.ref;
      d.push({
        id: ie.id,
        label: ie.name,
        kind: "etl-flow",
        symbol: "gear",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        dashed: !0,
        badge: "ETL",
        tooltip: `${ie.name} — integrador: fuentes (pull/consumidor) → transformación → escrituras (API/BD/evento)`,
        x: z.x,
        y: z.y,
        w: Ke,
        h: Xe
      });
      return;
    }
    if ("workflow" in u && u.workflow) {
      const ie = u.ref;
      d.push({
        id: ie.id,
        label: ie.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${ie.name} — workflow${ie.triggerEvent ? ` · arranca con ${ie.triggerEvent}` : ""}`,
        x: z.x,
        y: z.y,
        w: Ke,
        h: Xe
      });
      return;
    }
    if (u.proxy) {
      const ie = u.ref, be = c(ie.id, "proxy-api"), Pe = o.has(ie.id) && be.length > 0;
      d.push({
        id: ie.id,
        label: ie.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${ie.name} — proxy/cache de una API, consumible como ella`,
        collapsible: be.length > 0,
        collapsed: be.length > 0 && !Pe,
        x: z.x,
        y: z.y,
        w: Ke,
        h: Xe
      }), Pe && _(ie.id, "proxy-api", ie.name, z);
      return;
    }
    if (u.api) {
      const ie = u.ref, be = c(ie.id, "api"), Pe = o.has(ie.id) && be.length > 0;
      d.push({
        id: ie.id,
        label: ie.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${ie.name} — API publicada (sus operaciones apuntan a quien las implementa)`,
        collapsible: be.length > 0,
        collapsed: be.length > 0 && !Pe,
        x: z.x,
        y: z.y,
        w: Ke,
        h: Xe
      }), Pe && _(ie.id, "api", ie.name, z);
      return;
    }
    if (u.external) {
      const ie = u.ref, be = c(ie.id, "external-system"), Pe = o.has(ie.id) && be.length > 0, Ue = i[ie.id];
      d.push({
        id: ie.id,
        label: ie.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: ie.referencedRepositoryId ? "PROYECTO" : "EXTERNAL",
        tooltip: ie.referencedRepositoryId ? `${ie.name} — otro proyecto modux (repositorio ${ie.referencedRepositoryId}), referenciado del catálogo` : `${ie.name} (sistema externo)`,
        collapsible: be.length > 0,
        collapsed: be.length > 0 && !Pe,
        resizable: !0,
        x: z.x,
        y: z.y,
        w: (Ue == null ? void 0 : Ue.w) ?? Ke,
        h: (Ue == null ? void 0 : Ue.h) ?? Xe
      }), Pe && _(ie.id, "external-system", ie.name, z);
      return;
    }
    const F = u.ref, U = F.subdomainType ?? "GENERIC", Q = c(F.id, "boundedContext"), ue = o.has(F.id) && Q.length > 0, ze = i[F.id];
    d.push({
      id: F.id,
      label: F.name,
      kind: "boundedContext",
      symbol: "component",
      fill: la[U],
      stroke: "#94a3b8",
      badge: U,
      tooltip: a && Q.length === 0 ? `${F.name} — un solo módulo (el principal): el servicio lo despliega entero. Añade un módulo desde la paleta para repartir sus elementos` : `${F.name} — subdominio ${U}`,
      collapsible: Q.length > 0,
      collapsed: Q.length > 0 && !ue,
      resizable: !0,
      x: z.x,
      y: z.y,
      w: (ze == null ? void 0 : ze.w) ?? Ke,
      h: (ze == null ? void 0 : ze.h) ?? Xe
    }), ue && _(F.id, "boundedContext", F.name, z);
  });
  const L = a ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, O = A.length + L.actors.length + L.aiAgents.length + L.rags.length + L.mcpGateways.length;
  L.actors.forEach((u, T) => {
    const z = t[u.id] ?? st(A.length + T, O);
    d.push({
      id: u.id,
      label: u.name,
      x: z.x,
      y: z.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${u.name} (actor)`
    });
  }), L.aiAgents.forEach((u, T) => {
    const z = t[u.id] ?? st(A.length + (e.actors ?? []).length + T, O);
    d.push({
      id: u.id,
      label: u.name,
      x: z.x,
      y: z.y,
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
  }), L.mcpGateways.forEach((u, T) => {
    const z = t[u.id] ?? st(
      A.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + T,
      O
    );
    d.push({
      id: u.id,
      label: u.name,
      x: z.x,
      y: z.y,
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
  const R = [];
  if (L.rags.forEach((u, T) => {
    const z = t[u.id] ?? st(
      A.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + T,
      O
    );
    d.push({
      id: u.id,
      label: u.name,
      x: z.x,
      y: z.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${u.name} (base de conocimiento — retrieval para agentes)`
    }), (u.contentSources ?? []).forEach((F, U) => {
      const Q = `ragcs:${u.id}:${F.uri}`, ue = t[Q] ?? { x: z.x + 170, y: z.y - 30 + U * 44 };
      d.push({
        id: Q,
        label: F.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: ue.x,
        y: ue.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: F.type,
        tooltip: `${F.type}: ${F.uri}`
      }), R.push({
        id: `ragcse:${u.id}:${F.uri}`,
        sourceId: Q,
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
    u.forEach((z, F) => {
      const U = t[z.id] ?? st(A.length + F, A.length + u.length);
      d.push({
        id: z.id,
        label: z.name,
        kind: "service",
        symbol: "gear",
        fill: "#f8fafc",
        stroke: "#334155",
        badge: "SERVICIO",
        tooltip: `${z.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
        x: U.x,
        y: U.y,
        w: Ke,
        h: Xe
      });
    });
    const T = [];
    [...new Set(u.filter((z) => z.database).map((z) => z.database))].forEach((z) => T.push({
      id: `infra-db:${z}`,
      label: z,
      badge: "BD",
      symbol: "readmodel",
      tooltip: `Base de datos ${z} — la usan los servicios que declaran database=${z}`
    })), u.some((z) => z.outboxEnabled) && T.push({
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
    }), T.forEach((z, F) => {
      const U = t[z.id] ?? st(
        A.length + u.length + F,
        A.length + u.length + T.length
      );
      d.push({
        id: z.id,
        label: z.label,
        kind: "infrastructure",
        symbol: z.symbol,
        fill: "#fffbeb",
        stroke: "#92400e",
        dashed: !0,
        badge: z.badge,
        tooltip: z.tooltip,
        x: U.x,
        y: U.y,
        w: Ke,
        h: Xe
      });
    });
  }
  d.sort((u, T) => (u.parentId ? 1 : 0) - (T.parentId ? 1 : 0));
  const W = e.relations.map((u) => ({
    id: fa(u.sourceId, u.targetId),
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "relation",
    label: u.type ? ri[u.type] : u.inferredType ? `≈${ri[u.inferredType]}` : "?",
    color: u.declared ? "#475569" : "#94a3b8",
    dashed: !u.declared,
    arrow: !0,
    tooltip: u.type ? `${u.type} (${u.sourceId} upstream → ${u.targetId} downstream)${u.reasons ? ` — ${u.reasons}` : ""}` : u.inferredType ? `≈ ${u.inferredType} INFERIDO de las dependencias — doble click para declararlo (o corregirlo)${u.reasons ? ` — ${u.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${u.reasons ? ` — ${u.reasons}` : ""}`
  })), v = e.flows.map((u) => {
    var ue, ze, ie, be, Pe, Ue;
    const T = ha(e, u), z = r ? e.boundedContexts.find((qe) => qe.id === u.sourceId) : void 0, F = ((ue = z == null ? void 0 : z.domainEvents) == null ? void 0 : ue.find((qe) => qe.name === u.triggerEvent)) ?? ((ze = z == null ? void 0 : z.applicationEvents) == null ? void 0 : ze.find((qe) => qe.name === u.triggerEvent)), U = r && u.readModelName ? (be = (ie = e.boundedContexts.find((qe) => qe.id === u.targetId)) == null ? void 0 : ie.readModels) == null ? void 0 : be.find((qe) => qe.name === u.readModelName) : void 0, Q = r && u.targetUseCaseId ? (Ue = (Pe = e.boundedContexts.find((qe) => qe.id === u.targetId)) == null ? void 0 : Pe.useCases) == null ? void 0 : Ue.find((qe) => qe.id === u.targetUseCaseId) : void 0;
    return {
      id: `flow:${u.id}`,
      sourceId: (F == null ? void 0 : F.id) ?? u.sourceId,
      targetId: (Q == null ? void 0 : Q.id) ?? (U == null ? void 0 : U.id) ?? u.targetId,
      kind: "flow",
      label: u.name,
      color: ca[T],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${u.name} [${u.archetype}] — ${T}`
    };
  }), B = new Map((e.apis ?? []).map((u) => [u.id, u])), K = new Set(e.boundedContexts.map((u) => u.id)), de = (e.apiImplementations ?? []).filter(
    (u) => B.has(u.apiId) && K.has(u.boundedContextId)
  ), Y = new Set(d.map((u) => u.id)), b = no(e, n), P = /* @__PURE__ */ new Map(), $ = (u) => {
    const T = P.get(u);
    if (T !== void 0) return T;
    let z = u;
    for (let F = 0; z && F < 16; F++) {
      if (Y.has(z))
        return P.set(u, z), z;
      z = b.get(z);
    }
    return P.set(u, null), null;
  }, C = { has: (u) => $(u) !== null }, w = (u) => {
    const T = /* @__PURE__ */ new Set(), z = [];
    for (const F of u) {
      if (F.kind === "contains" || F.targetId.startsWith("edgeanchor:")) {
        z.push(F);
        continue;
      }
      const U = $(F.sourceId), Q = $(F.targetId);
      if (!U || !Q || U === Q) continue;
      if (U === F.sourceId && Q === F.targetId) {
        z.push(F);
        continue;
      }
      const ue = `${F.kind}|${U}|${Q}`;
      T.has(ue) || (T.add(ue), z.push({
        ...F,
        sourceId: U,
        targetId: Q,
        tooltip: `${F.tooltip ?? F.kind} — de un elemento plegado dentro`
      }));
    }
    return z;
  }, k = a ? [
    ...(e.services ?? []).flatMap(
      (u) => (u.moduleIds ?? []).map((T) => {
        var F;
        if (!C.has(u.id)) return null;
        const z = C.has(T) ? T : (F = (e.modules ?? []).find((U) => U.id === T)) == null ? void 0 : F.boundedContextId;
        return !z || !C.has(z) ? null : {
          id: `deploy:${u.id}->${T}`,
          sourceId: u.id,
          targetId: z,
          kind: "deploys",
          color: "#334155",
          dashed: !0,
          arrow: !0,
          tooltip: `desplegado en ${u.name} — Supr lo desconecta`
        };
      }).filter((T) => T !== null)
    ),
    ...(e.services ?? []).flatMap((u) => {
      const T = [];
      return u.database && C.has(`infra-db:${u.database}`) && C.has(u.id) && T.push({
        id: `infradb:${u.id}`,
        sourceId: u.id,
        targetId: `infra-db:${u.database}`,
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} persiste en ${u.database}`
      }), u.outboxEnabled && C.has("infra-broker") && C.has(u.id) && T.push({
        id: `infrabroker:${u.id}`,
        sourceId: u.id,
        targetId: "infra-broker",
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} publica eventos por el outbox`
      }), T;
    })
  ] : [], E = r ? (e.emissions ?? []).filter((u) => C.has(u.sourceId) && C.has(u.domainEventId)).map((u) => ({
    id: `emit:${u.sourceId}->${u.domainEventId}`,
    sourceId: u.sourceId,
    targetId: u.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], S = r ? (e.projections ?? []).map((u) => ({
    p: u,
    source: u.sourceAggregateId ?? u.sourceExternalUseCaseId ?? u.sourceExternalTableId
  })).filter(({ p: u, source: T }) => T && u.readModelId).filter(({ p: u, source: T }) => C.has(T) && C.has(u.readModelId)).map(({ p: u, source: T }) => ({
    id: `proj:${u.id}`,
    sourceId: T,
    targetId: u.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: u.sourceAggregateId ? `Proyección ${u.name}: el estado del agregado se materializa en ${u.readModelName ?? u.readModelId}` : `Proyección ${u.name}: polling hacia ${u.readModelName ?? u.readModelId}`
  })) : [], D = (e.apis ?? []).flatMap(
    (u) => u.operations.flatMap((T) => {
      const z = r && T.targetUseCaseId && C.has(T.targetUseCaseId) ? T.targetUseCaseId : T.targetBoundedContextId && C.has(T.targetBoundedContextId) ? T.targetBoundedContextId : (T.targetUseCaseId && !r, null);
      if (!z) return [];
      const F = r && C.has(T.id) ? T.id : u.id;
      return C.has(F) ? [
        {
          id: `apiwire:${T.id}`,
          sourceId: F,
          targetId: z,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${T.name} la implementa ${z}`
        }
      ] : [];
    })
  ), N = r ? (e.useCaseCalls ?? []).filter((u) => C.has(u.sourceId) && C.has(u.targetId)).map((u) => ({
    id: `uccall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], j = [
    ...e.boundedContexts.filter((u) => u.identityProviderId && C.has(u.id) && C.has(u.identityProviderId)).map((u) => ({
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
    ...(e.etlFlows ?? []).filter((u) => u.identityProviderId && C.has(u.identityProviderId)).flatMap((u) => {
      const T = C.has(u.id) ? u.id : u.ownerBoundedContextId && C.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
      return T ? [{
        id: `idpsvc:${u.id}`,
        sourceId: T,
        targetId: u.identityProviderId,
        kind: "idp-service",
        color: "#ca8a04",
        label: "identidad de servicio",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} corre con una identidad de servicio de este IdP`
      }] : [];
    }),
    ...(e.identityProviders ?? []).filter((u) => u.publishedByExternalSystemId && C.has(u.id) && C.has(u.publishedByExternalSystemId)).map((u) => ({
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
  ], V = r ? e.boundedContexts.flatMap((u) => u.scheduledTriggers ?? []).filter((u) => u.useCaseId && C.has(u.id) && C.has(u.useCaseId)).map((u) => ({
    id: `stfire:${u.id}->${u.useCaseId}`,
    sourceId: u.id,
    targetId: u.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: u.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${u.cronExpression ?? "cron"}`
  })) : [], X = r ? (e.aggregateCalls ?? []).filter((u) => C.has(u.sourceId) && C.has(u.targetId)).map((u) => ({
    id: `aggcall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], le = r ? (e.queryCalls ?? []).filter((u) => C.has(u.sourceId) && C.has(u.targetId)).map((u) => ({
    id: `qscall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], fe = r ? (e.actorUses ?? []).filter((u) => C.has(u.actorId) && C.has(u.targetId)).map((u) => ({
    id: `use:${u.actorId}->${u.targetId}`,
    sourceId: u.actorId,
    targetId: u.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], H = (e.actorExternalDependencies ?? []).filter((u) => C.has(u.actorId) && C.has(u.externalSystemId)).map((u) => ({
    id: `extdep:${u.actorId}->${u.externalSystemId}`,
    sourceId: u.actorId,
    targetId: u.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), J = new Map([
    ...(e.apis ?? []).filter((u) => u.publishedByExternalSystemId).map((u) => [u.id, u.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((u) => u.publishedByExternalSystemId).map((u) => [u.id, u.publishedByExternalSystemId])
  ]), ce = (u) => C.has(u) ? u : J.get(u) ?? u, ye = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((u) => ({
        sourceId: u.sourceId,
        targetId: ce(u.targetId),
        cqrs: u.type === "CQRS"
      })).filter(
        (u) => C.has(u.sourceId) && C.has(u.targetId) && u.sourceId !== u.targetId
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
  ], ke = /* @__PURE__ */ new Map();
  for (const u of e.boundedContexts) {
    for (const T of u.useCases ?? []) ke.set(T.id, u.id);
    for (const T of u.domainEvents ?? []) ke.set(T.id, u.id);
    for (const T of u.applicationEvents ?? []) ke.set(T.id, u.id);
    for (const T of u.queryServices ?? []) ke.set(T.id, u.id);
  }
  const _e = (u) => C.has(u) ? u : ke.get(u) ?? u, G = /* @__PURE__ */ new Map();
  for (const u of e.boundedContexts) {
    for (const T of u.domainEvents ?? []) G.set(T.name, T.id);
    for (const T of u.applicationEvents ?? []) G.set(T.name, T.id);
  }
  const ne = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (u) => (u.steps ?? []).filter((T) => T.targetUseCaseId).map((T) => ({ sourceId: u.id, targetId: _e(T.targetUseCaseId) }))
      ).filter((u) => C.has(u.sourceId) && C.has(u.targetId)).map((u) => [
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
  ], Ce = [
    ...new Map(
      (e.workflows ?? []).filter((u) => u.triggerEvent && G.has(u.triggerEvent)).map((u) => ({
        sourceId: _e(G.get(u.triggerEvent)),
        targetId: u.id,
        label: u.triggerEvent
      })).filter((u) => C.has(u.sourceId) && C.has(u.targetId)).map((u) => [
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
  ], Se = /* @__PURE__ */ new Map();
  for (const u of e.externalSystems)
    for (const T of u.tables ?? []) Se.set(T.id, u.id);
  const Be = (e.notifications ?? []).flatMap((u) => {
    var F;
    const T = C.has(u.id) ? u.id : u.ownerBoundedContextId && C.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
    if (!T) return [];
    const z = [];
    if (u.eventId) {
      const U = C.has(u.eventId) ? u.eventId : ke.get(u.eventId);
      U && C.has(U) && U !== T && z.push({
        id: `notif:${u.id}`,
        sourceId: U,
        targetId: T,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const U of u.recipientRoleIds ?? [])
      C.has(U) && z.push({
        id: `notifto:${u.id}:${U}`,
        sourceId: T,
        targetId: U,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((F = (u.channels ?? [])[0]) == null ? void 0 : F.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} avisa a este rol — Supr lo quita`
      });
    return z;
  }), Oe = (e.documents ?? []).flatMap((u) => {
    const T = C.has(u.id) ? u.id : u.ownerBoundedContextId && C.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
    if (!T || !u.queryServiceId) return [];
    const z = C.has(u.queryServiceId) ? u.queryServiceId : ke.get(u.queryServiceId);
    return !z || !C.has(z) || z === T ? [] : [{
      id: `docq:${u.id}`,
      sourceId: z,
      targetId: T,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${u.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), et = (e.etlFlows ?? []).flatMap(
    (u) => (u.steps ?? []).flatMap((T) => {
      const z = C.has(u.id) ? u.id : u.ownerBoundedContextId && C.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
      if (!z) return [];
      const F = T.externalTableId ?? T.operationId ?? T.apiId ?? T.eventId;
      if (!F) return [];
      let U = F;
      if (!C.has(U) && T.operationId && T.apiId && (U = T.apiId), !C.has(U) && T.externalTableId && (U = Se.get(T.externalTableId) ?? U), C.has(U) || (U = ce(U)), C.has(U) || (U = ke.get(F) ?? U), !C.has(U) || U === z) return [];
      const Q = T.type.startsWith("SOURCE");
      return [{
        id: `etl:${u.id}:${T.id}`,
        sourceId: Q ? U : z,
        targetId: Q ? z : U,
        kind: Q ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: T.type === "SOURCE_PULL" ? "pull" : T.type === "SOURCE_CONSUMER" ? "consume" : T.type === "WRITE_API" ? "api" : T.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: Q ? `${u.name} lee de aquí (${T.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${u.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), vt = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (u) => (u.sourceExternalTableIds ?? []).map((T) => ({
          sourceId: C.has(T) ? T : Se.get(T) ?? T,
          targetId: u.id,
          name: u.name
        }))
      ).filter((u) => C.has(u.sourceId) && C.has(u.targetId)).map((u) => [
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
  ], Kt = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (u) => (u.sourceApiIds ?? []).map((T) => ({
          sourceId: ce(T),
          targetId: u.id,
          name: u.name
        }))
      ).filter((u) => C.has(u.sourceId) && C.has(u.targetId)).map((u) => [
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
  ], zo = [
    ...new Map(
      (e.rags ?? []).flatMap((u) => [
        ...(u.sourceExternalSystemIds ?? []).map((T) => ({ sourceId: T, targetId: u.id, name: u.name })),
        ...(u.sourceBoundedContextIds ?? []).map((T) => ({ sourceId: T, targetId: u.id, name: u.name }))
      ]).filter((u) => C.has(u.sourceId) && C.has(u.targetId)).map((u) => [
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
  ], Uo = [
    ...new Map(
      (e.agentApiUses ?? []).map((u) => ({ sourceId: u.agentId, targetId: ce(u.apiId) })).filter((u) => C.has(u.sourceId) && C.has(u.targetId)).map((u) => [
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
  ], qo = (u) => u.onCompletionEventName || `${u.name.replace(/\s+/g, "")}Completado`, Fo = (e.workflows ?? []).flatMap(
    (u) => u.triggerEvent ? (e.workflows ?? []).filter((T) => T.id !== u.id && qo(T) === u.triggerEvent).filter((T) => C.has(T.id) && C.has(u.id)).map((T) => ({
      id: `wfchain:${T.id}->${u.id}`,
      sourceId: T.id,
      targetId: u.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: u.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), Bo = [
    ...new Map(
      (e.proxyApis ?? []).filter((u) => u.targetApiId).map((u) => ({ sourceId: ce(u.id), targetId: ce(u.targetApiId) })).filter(
        (u) => C.has(u.sourceId) && C.has(u.targetId) && u.sourceId !== u.targetId
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
  ], jo = de.flatMap((u) => {
    const T = ct(u.apiId, u.boundedContextId);
    if (!C.has(T)) return [];
    const z = [];
    for (const F of (e.proxyApis ?? []).filter((U) => U.targetApiId === u.apiId)) {
      const U = ce(F.id);
      C.has(U) && U !== T && z.push({
        id: `pxr:${U}->${T}`,
        sourceId: U,
        targetId: T,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return z;
  }), Wo = (e.proxyOperationRoutes ?? []).flatMap((u) => {
    const T = (e.proxyApis ?? []).find((U) => U.id === u.proxyId);
    if (!(T != null && T.targetApiId)) return [];
    const z = pt(u.operationId, u.proxyId), F = u.targetSiteId === T.targetApiId ? T.targetApiId : ct(T.targetApiId, u.targetSiteId);
    return !C.has(z) || !C.has(F) ? [] : [{
      id: `oproute:${z}->${F}`,
      sourceId: z,
      targetId: F,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Vo = [
    ...new Map(
      (e.externalOperationUses ?? []).map((u) => {
        if (!C.has(u.externalSystemId)) return null;
        const T = (e.apis ?? []).find(
          (Q) => Q.operations.some((ue) => ue.id === u.operationId)
        );
        if (!T) return null;
        const z = u.siteId === T.id, F = z ? u.operationId : pt(u.operationId, u.siteId);
        let U = C.has(F) ? F : null;
        if (!U)
          if (z || (e.proxyApis ?? []).some((Q) => Q.id === u.siteId))
            U = ce(u.siteId);
          else {
            const Q = ct(T.id, u.siteId);
            U = C.has(Q) ? Q : u.siteId;
          }
        return !U || !C.has(U) || U === u.externalSystemId ? null : { u, target: U };
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
  ], Ho = r ? (e.apiOperationImplementations ?? []).flatMap((u) => {
    if (!C.has(u.useCaseId)) return [];
    const T = C.has(pt(u.operationId, u.boundedContextId)) ? pt(u.operationId, u.boundedContextId) : C.has(ct(u.apiId, u.boundedContextId)) ? ct(u.apiId, u.boundedContextId) : C.has(ce(u.boundedContextId)) ? ce(u.boundedContextId) : null;
    return T ? [{
      id: `apiimplwire:${u.operationId}@${u.boundedContextId}`,
      sourceId: T,
      targetId: u.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], Go = r ? (e.agentUses ?? []).filter((u) => C.has(u.agentId) && C.has(u.useCaseId)).map((u) => ({
    id: `mcp:${u.agentId}->${u.useCaseId}`,
    sourceId: u.agentId,
    targetId: u.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Yo = (e.agentRags ?? []).filter((u) => C.has(u.agentId) && C.has(u.ragId)).map((u) => ({
    id: `agrag:${u.agentId}->${u.ragId}`,
    sourceId: u.agentId,
    targetId: u.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), Ko = r ? (e.rags ?? []).filter((u) => C.has(u.id)).flatMap(
    (u) => (u.sourceReadModelIds ?? []).filter((T) => C.has(T)).map((T) => ({
      id: `ragsrc:${u.id}->${T}`,
      sourceId: u.id,
      targetId: T,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${u.name} indexa este read model`
    }))
  ) : [], Xo = r ? (e.agentExternalUses ?? []).filter((u) => C.has(u.agentId) && C.has(u.externalUseCaseId)).map((u) => ({
    id: `mcpx:${u.agentId}->${u.externalUseCaseId}`,
    sourceId: u.agentId,
    targetId: u.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Jo = r ? (e.agentMcpUses ?? []).filter((u) => C.has(u.agentId) && C.has(u.mcpServerId)).map((u) => ({
    id: `mcpsv:${u.agentId}->${u.mcpServerId}`,
    sourceId: u.agentId,
    targetId: u.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], Qo = (e.mcpGateways ?? []).flatMap(
    (u) => [
      ...u.mcpServerIds ?? [],
      ...u.apiIds ?? [],
      ...u.apiOperationIds ?? [],
      ...u.useCaseIds ?? [],
      ...u.ragIds ?? []
    ].filter((T) => C.has(u.id) && C.has(T)).map((T) => ({
      id: `gwx:${u.id}->${T}`,
      sourceId: u.id,
      targetId: T,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Zo = (e.agentGatewayUses ?? []).filter((u) => C.has(u.agentId) && C.has(u.gatewayId)).map((u) => ({
    id: `aggw:${u.agentId}->${u.gatewayId}`,
    sourceId: u.agentId,
    targetId: u.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), ea = r ? (e.agentApiOpUses ?? []).filter((u) => C.has(u.agentId) && C.has(u.apiOperationId)).map((u) => ({
    id: `agapi:${u.agentId}->${u.apiOperationId}`,
    sourceId: u.agentId,
    targetId: u.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], ta = r ? (e.agentQueryUses ?? []).filter((u) => C.has(u.agentId) && C.has(u.queryServiceId)).map((u) => ({
    id: `agqs:${u.agentId}->${u.queryServiceId}`,
    sourceId: u.agentId,
    targetId: u.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], na = (e.agentDelegations ?? []).filter((u) => C.has(u.agentId) && C.has(u.delegateAgentId)).map((u) => ({
    id: `agag:${u.agentId}->${u.delegateAgentId}`,
    sourceId: u.agentId,
    targetId: u.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), ia = (e.actorAgentUses ?? []).filter((u) => C.has(u.actorId) && C.has(u.agentId)).map((u) => ({
    id: `useag:${u.actorId}->${u.agentId}`,
    sourceId: u.actorId,
    targetId: u.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), oa = r ? (e.agentTriggers ?? []).filter((u) => C.has(u.eventId) && C.has(u.agentId)).map((u) => ({
    id: `evag:${u.eventId}->${u.agentId}`,
    sourceId: u.eventId,
    targetId: u.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], aa = r ? (e.externalCalls ?? []).filter((u) => C.has(u.externalSystemId) && C.has(u.useCaseId)).map((u) => ({
    id: `extcall:${u.externalSystemId}->${u.useCaseId}`,
    sourceId: u.externalSystemId,
    targetId: u.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], sa = r ? (e.externalUseCaseCalls ?? []).filter((u) => C.has(u.sourceId) && C.has(u.targetId)).map((u) => ({
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
    nodes: d,
    edges: w([
      // Composition first: the ownership diamonds paint under the semantic edges.
      ...h,
      ...k,
      ...W,
      ...v,
      ...E,
      ...S,
      ...D,
      ...N,
      ...V,
      ...j,
      ...Be,
      ...Oe,
      ...et,
      ...X,
      ...le,
      ...fe,
      ...H,
      ...ye,
      ...Bo,
      ...jo,
      ...Wo,
      ...Vo,
      ...Ho,
      ...ne,
      ...Ce,
      ...Fo,
      ...Uo,
      ...vt,
      ...Kt,
      ...zo,
      ...Go,
      ...Xo,
      ...Jo,
      ...Qo,
      ...Zo,
      ...ea,
      ...ta,
      ...na,
      ...ia,
      ...oa,
      ...Yo,
      ...Ko,
      ...R,
      ...aa,
      ...sa
    ])
  };
}
const xa = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, wa = 176, ka = 60, $a = 140, _a = 40;
function Ca(e) {
  const t = {}, n = e.aggregates ?? [], i = e.entities ?? [];
  return e.boundedContexts.forEach((o, s) => {
    const a = 220 + s * 340;
    n.filter((l) => l.boundedContextId === o.id).forEach((l, p) => {
      const g = i.filter((m) => m.aggregateId === l.id).length, f = 140 + p * (170 + g * 60);
      t[l.id] = { x: a, y: f }, i.filter((m) => m.aggregateId === l.id).forEach((m, y) => {
        t[m.id] = { x: a + 60, y: f + 100 + y * 60 };
      });
    });
  }), n.filter((o) => !e.boundedContexts.some((s) => s.id === o.boundedContextId)).forEach((o, s) => {
    t[o.id] = { x: 220 + s * 340, y: 640 };
  }), t;
}
function Sa(e, t) {
  const n = Ca(e), i = (f) => t[f] ?? n[f] ?? { x: 200, y: 200 }, o = new Map(e.boundedContexts.map((f) => [f.id, f])), s = (e.aggregates ?? []).map((f) => {
    const m = o.get(f.boundedContextId), y = (m == null ? void 0 : m.subdomainType) ?? "GENERIC", I = i(f.id);
    return {
      id: f.id,
      label: f.name,
      x: I.x,
      y: I.y,
      w: wa,
      h: ka,
      kind: "aggregate",
      symbol: "aggregate",
      fill: xa[y],
      stroke: "#64748b",
      badge: `${m ? `${m.name.toUpperCase()} · ` : ""}AGGREGATE${(f.invariants ?? []).length ? ` · ⚖${f.invariants.length}` : ""}`,
      tooltip: `Agregado ${f.name}${m ? ` — contexto ${m.name} (${y})` : ""}`
    };
  }), a = (e.entities ?? []).map((f) => {
    const m = i(f.id);
    return {
      id: f.id,
      label: f.name,
      x: m.x,
      y: m.y,
      w: $a,
      h: _a,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${f.name} (dentro del agregado)`
    };
  }), r = (e.aggregates ?? []).flatMap(
    (f) => (f.invariants ?? []).map((m, y) => {
      const I = i(f.id), c = t[m.id] ?? { x: I.x - 150, y: I.y + 90 + y * 52 };
      return {
        id: m.id,
        label: m.name,
        x: c.x,
        y: c.y,
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
  ), l = (e.aggregates ?? []).flatMap(
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
  })), g = (e.aggregateReferences ?? []).map((f, m) => ({
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
    nodes: [...s, ...a, ...r],
    edges: [...p, ...g, ...l]
  };
}
const Ea = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Aa = 150, Ma = 44, Pa = 190, Ta = 56, Oa = 160, Na = 48;
function Ra(e, t) {
  const n = e.externalSystems.find((o) => o.id === t.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = e.boundedContexts.find((o) => o.id === t.targetId);
  return { id: t.targetId, label: (i == null ? void 0 : i.name) ?? t.targetId, external: !1 };
}
function La(e, t) {
  const n = e.flows, i = [], o = [], s = /* @__PURE__ */ new Set(), a = (r) => {
    var l, p;
    return ((p = (l = e.aggregates) == null ? void 0 : l.find((g) => g.id === r)) == null ? void 0 : p.name) ?? r ?? "?";
  };
  return n.forEach((r, l) => {
    const p = 120 + l * 130, g = Ea[r.archetype] ?? "#475569", f = r.triggerAggregateId ?? r.sourceId;
    if (!s.has(f)) {
      s.add(f);
      const d = t[f] ?? { x: 160, y: p };
      i.push({
        id: f,
        label: r.triggerAggregateId ? a(r.triggerAggregateId) : f,
        x: d.x,
        y: d.y,
        w: Aa,
        h: Ma,
        kind: r.triggerAggregateId ? "aggregate" : "boundedContext",
        symbol: r.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: r.triggerAggregateId ? "AGGREGATE" : "BOUNDED_CONTEXT"
      });
    }
    const m = `flow:${r.id}`, y = t[m] ?? { x: 470, y: p };
    i.push({
      id: m,
      label: r.name,
      x: y.x,
      y: y.y,
      w: Pa,
      h: Ta,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: g,
      badge: r.archetype,
      tooltip: `Flow ${r.name} [${r.archetype}]${r.readModelName ? ` → read model ${r.readModelName}` : ""}${r.targetUseCaseId ? ` → use case ${r.targetUseCaseId}` : ""}`
    });
    const I = Ra(e, r), c = `tgt:${I.id}`;
    if (!s.has(c)) {
      s.add(c);
      const d = t[c] ?? { x: 790, y: p };
      i.push({
        id: c,
        label: I.label,
        x: d.x,
        y: d.y,
        w: Oa,
        h: Na,
        kind: I.external ? "external-system" : "boundedContext",
        symbol: "component",
        fill: I.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: I.external,
        badge: I.external ? "EXTERNAL" : "BOUNDED_CONTEXT"
      });
    }
    o.push({
      id: `fe:${r.id}:in`,
      sourceId: f,
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
      targetId: c,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: i, edges: o };
}
const Da = 190, za = 56, Sn = 170, Ua = 52;
function di(e, t) {
  const n = [], i = [], o = (s) => {
    var a;
    return (a = e.boundedContexts.find((r) => r.id === s)) == null ? void 0 : a.name;
  };
  return (e.processes ?? []).forEach((s, a) => {
    const r = 140 + a * 240, l = t[s.id] ?? { x: 150, y: r };
    n.push({
      id: s.id,
      label: s.name,
      x: l.x,
      y: l.y,
      w: Da,
      h: za,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${s.sla ? ` · SLA ${s.sla}` : ""}`,
      tooltip: `${s.name}${o(s.ownerBoundedContextId) ? ` — contexto ${o(s.ownerBoundedContextId)}` : ""}${s.triggerEvent ? ` · arranca con ${s.triggerEvent}` : ""}`
    });
    let p = s.id;
    if (s.steps.forEach((g, f) => {
      const m = g.type === "HUMAN", y = t[g.id] ?? { x: 150 + (f + 1) * 240, y: r };
      if (n.push({
        id: g.id,
        label: g.name,
        x: y.x,
        y: y.y,
        w: Sn,
        h: Ua,
        kind: "process-step",
        symbol: m ? "person" : "gear",
        fill: m ? "#fef3c7" : "#ffffff",
        stroke: m ? "#d97706" : "#64748b",
        badge: m ? `HUMAN${g.roleId ? ` · ${g.roleId}` : ""}${g.deadline ? ` · ⏱ ${g.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${g.name}${g.useCaseId ? ` — use case ${g.useCaseId}` : ""}${g.deadline ? ` · deadline ${g.deadline}` : ""}`
      }), i.push({
        id: `pe:${s.id}:${f}`,
        sourceId: p,
        targetId: g.id,
        kind: "process-seq",
        label: f === 0 ? s.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), g.compensationUseCaseId) {
        const I = `comp:${g.id}`, c = t[I] ?? { x: y.x, y: y.y + 90 };
        n.push({
          id: I,
          label: g.compensationUseCaseId,
          x: c.x,
          y: c.y,
          w: Sn,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), i.push({
          id: `pc:${g.id}`,
          sourceId: g.id,
          targetId: I,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      p = g.id;
    }), s.onCompletionEventName) {
      const g = `done:${s.id}`, f = t[g] ?? { x: 150 + (s.steps.length + 1) * 240, y: r };
      n.push({
        id: g,
        label: s.onCompletionEventName,
        x: f.x,
        y: f.y,
        w: Sn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), i.push({
        id: `pd:${s.id}`,
        sourceId: p,
        targetId: g,
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
const cn = globalThis, Xn = cn.ShadowRoot && (cn.ShadyCSS === void 0 || cn.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Jn = Symbol(), li = /* @__PURE__ */ new WeakMap();
let oo = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== Jn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Xn && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = li.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && li.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const qa = (e) => new oo(typeof e == "string" ? e : e + "", void 0, Jn), bt = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new oo(n, e, Jn);
}, Fa = (e, t) => {
  if (Xn) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = cn.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, ci = Xn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return qa(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ba, defineProperty: ja, getOwnPropertyDescriptor: Wa, getOwnPropertyNames: Va, getOwnPropertySymbols: Ha, getPrototypeOf: Ga } = Object, ot = globalThis, pi = ot.trustedTypes, Ya = pi ? pi.emptyScript : "", En = ot.reactiveElementPolyfillSupport, Lt = (e, t) => e, hn = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ya : null;
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
} }, Qn = (e, t) => !Ba(e, t), ui = { attribute: !0, type: String, converter: hn, reflect: !1, useDefault: !1, hasChanged: Qn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ot.litPropertyMetadata ?? (ot.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let wt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = ui) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && ja(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: s } = Wa(this.prototype, t) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get: o, set(a) {
      const r = o == null ? void 0 : o.call(this);
      s == null || s.call(this, a), this.requestUpdate(t, r, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ui;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Lt("elementProperties"))) return;
    const t = Ga(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Lt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Lt("properties"))) {
      const n = this.properties, i = [...Va(n), ...Ha(n)];
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
      for (const o of i) n.unshift(ci(o));
    } else t !== void 0 && n.push(ci(t));
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
    return Fa(t, this.constructor.elementStyles), t;
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
    var s;
    const i = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const a = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : hn).toAttribute(n, i.type);
      this._$Em = t, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var s, a;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = i.getPropertyOptions(o), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((s = r.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? r.converter : hn;
      this._$Em = o;
      const p = l.fromAttribute(n, r.type);
      this[o] = p ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, s) {
    var a;
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), i ?? (i = r.getPropertyOptions(t)), !((i.hasChanged ?? Qn)(s, n) || i.useDefault && i.reflect && s === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(r._$Eu(t, i)))) return;
      this.C(t, n, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, n, { useDefault: i, reflect: o, wrapped: s }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? n ?? this[t]), s !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || i || (n = void 0), this._$AL.set(t, n)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [s, a] of this._$Ep) this[s] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [s, a] of o) {
        const { wrapped: r } = a, l = this[s];
        r !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, a, l);
      }
    }
    let t = !1;
    const n = this._$AL;
    try {
      t = this.shouldUpdate(n), t ? (this.willUpdate(n), (i = this._$EO) == null || i.forEach((o) => {
        var s;
        return (s = o.hostUpdate) == null ? void 0 : s.call(o);
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
wt.elementStyles = [], wt.shadowRootOptions = { mode: "open" }, wt[Lt("elementProperties")] = /* @__PURE__ */ new Map(), wt[Lt("finalized")] = /* @__PURE__ */ new Map(), En == null || En({ ReactiveElement: wt }), (ot.reactiveElementVersions ?? (ot.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = globalThis, mi = (e) => e, gn = Dt.trustedTypes, fi = gn ? gn.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ao = "$lit$", it = `lit$${Math.random().toFixed(9).slice(2)}$`, so = "?" + it, Ka = `<${so}>`, gt = document, Ut = () => gt.createComment(""), qt = (e) => e === null || typeof e != "object" && typeof e != "function", Zn = Array.isArray, Xa = (e) => Zn(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", An = `[ 	
\f\r]`, At = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, hi = /-->/g, gi = />/g, rt = RegExp(`>|${An}(?:([^\\s"'>=/]+)(${An}*=${An}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), yi = /'/g, bi = /"/g, ro = /^(?:script|style|textarea|title)$/i, lo = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), M = lo(1), ee = lo(2), _t = Symbol.for("lit-noChange"), se = Symbol.for("lit-nothing"), Ii = /* @__PURE__ */ new WeakMap(), ut = gt.createTreeWalker(gt, 129);
function co(e, t) {
  if (!Zn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return fi !== void 0 ? fi.createHTML(t) : t;
}
const Ja = (e, t) => {
  const n = e.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = At;
  for (let r = 0; r < n; r++) {
    const l = e[r];
    let p, g, f = -1, m = 0;
    for (; m < l.length && (a.lastIndex = m, g = a.exec(l), g !== null); ) m = a.lastIndex, a === At ? g[1] === "!--" ? a = hi : g[1] !== void 0 ? a = gi : g[2] !== void 0 ? (ro.test(g[2]) && (o = RegExp("</" + g[2], "g")), a = rt) : g[3] !== void 0 && (a = rt) : a === rt ? g[0] === ">" ? (a = o ?? At, f = -1) : g[1] === void 0 ? f = -2 : (f = a.lastIndex - g[2].length, p = g[1], a = g[3] === void 0 ? rt : g[3] === '"' ? bi : yi) : a === bi || a === yi ? a = rt : a === hi || a === gi ? a = At : (a = rt, o = void 0);
    const y = a === rt && e[r + 1].startsWith("/>") ? " " : "";
    s += a === At ? l + Ka : f >= 0 ? (i.push(p), l.slice(0, f) + ao + l.slice(f) + it + y) : l + it + (f === -2 ? r : y);
  }
  return [co(e, s + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Ft {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const r = t.length - 1, l = this.parts, [p, g] = Ja(t, n);
    if (this.el = Ft.createElement(p, i), ut.currentNode = this.el.content, n === 2 || n === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (o = ut.nextNode()) !== null && l.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const f of o.getAttributeNames()) if (f.endsWith(ao)) {
          const m = g[a++], y = o.getAttribute(f).split(it), I = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: s, name: I[2], strings: y, ctor: I[1] === "." ? Za : I[1] === "?" ? es : I[1] === "@" ? ts : kn }), o.removeAttribute(f);
        } else f.startsWith(it) && (l.push({ type: 6, index: s }), o.removeAttribute(f));
        if (ro.test(o.tagName)) {
          const f = o.textContent.split(it), m = f.length - 1;
          if (m > 0) {
            o.textContent = gn ? gn.emptyScript : "";
            for (let y = 0; y < m; y++) o.append(f[y], Ut()), ut.nextNode(), l.push({ type: 2, index: ++s });
            o.append(f[m], Ut());
          }
        }
      } else if (o.nodeType === 8) if (o.data === so) l.push({ type: 2, index: s });
      else {
        let f = -1;
        for (; (f = o.data.indexOf(it, f + 1)) !== -1; ) l.push({ type: 7, index: s }), f += it.length - 1;
      }
      s++;
    }
  }
  static createElement(t, n) {
    const i = gt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function Ct(e, t, n = e, i) {
  var a, r;
  if (t === _t) return t;
  let o = i !== void 0 ? (a = n._$Co) == null ? void 0 : a[i] : n._$Cl;
  const s = qt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== s && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = o : n._$Cl = o), o !== void 0 && (t = Ct(e, o._$AS(e, t.values), o, i)), t;
}
class Qa {
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
    const { el: { content: n }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? gt).importNode(n, !0);
    ut.currentNode = o;
    let s = ut.nextNode(), a = 0, r = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let p;
        l.type === 2 ? p = new Ht(s, s.nextSibling, this, t) : l.type === 1 ? p = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (p = new ns(s, this, t)), this._$AV.push(p), l = i[++r];
      }
      a !== (l == null ? void 0 : l.index) && (s = ut.nextNode(), a++);
    }
    return ut.currentNode = gt, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class Ht {
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
    t = Ct(this, t, n), qt(t) ? t === se || t == null || t === "" ? (this._$AH !== se && this._$AR(), this._$AH = se) : t !== this._$AH && t !== _t && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Xa(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== se && qt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(gt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Ft.createElement(co(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === o) this._$AH.p(n);
    else {
      const a = new Qa(o, this), r = a.u(this.options);
      a.p(n), this.T(r), this._$AH = a;
    }
  }
  _$AC(t) {
    let n = Ii.get(t.strings);
    return n === void 0 && Ii.set(t.strings, n = new Ft(t)), n;
  }
  k(t) {
    Zn(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const s of t) o === n.length ? n.push(i = new Ht(this.O(Ut()), this.O(Ut()), this, this.options)) : i = n[o], i._$AI(s), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); t !== this._$AB; ) {
      const o = mi(t).nextSibling;
      mi(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var n;
    this._$AM === void 0 && (this._$Cv = t, (n = this._$AP) == null || n.call(this, t));
  }
}
class kn {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, o, s) {
    this.type = 1, this._$AH = se, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = se;
  }
  _$AI(t, n = this, i, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = Ct(this, t, n, 0), a = !qt(t) || t !== this._$AH && t !== _t, a && (this._$AH = t);
    else {
      const r = t;
      let l, p;
      for (t = s[0], l = 0; l < s.length - 1; l++) p = Ct(this, r[i + l], n, l), p === _t && (p = this._$AH[l]), a || (a = !qt(p) || p !== this._$AH[l]), p === se ? t = se : t !== se && (t += (p ?? "") + s[l + 1]), this._$AH[l] = p;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === se ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Za extends kn {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === se ? void 0 : t;
  }
}
class es extends kn {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== se);
  }
}
class ts extends kn {
  constructor(t, n, i, o, s) {
    super(t, n, i, o, s), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = Ct(this, t, n, 0) ?? se) === _t) return;
    const i = this._$AH, o = t === se && i !== se || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== se && (i === se || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ns {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ct(this, t);
  }
}
const Mn = Dt.litHtmlPolyfillSupport;
Mn == null || Mn(Ft, Ht), (Dt.litHtmlVersions ?? (Dt.litHtmlVersions = [])).push("3.3.3");
const is = (e, t, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = o = new Ht(t.insertBefore(Ut(), s), s, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ft = globalThis;
class Ve extends wt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = is(n, this.renderRoot, this.renderOptions);
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
var eo;
Ve._$litElement$ = !0, Ve.finalized = !0, (eo = ft.litElementHydrateSupport) == null || eo.call(ft, { LitElement: Ve });
const Pn = ft.litElementPolyfillSupport;
Pn == null || Pn({ LitElement: Ve });
(ft.litElementVersions ?? (ft.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const It = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const os = { attribute: !0, type: String, converter: hn, reflect: !1, hasChanged: Qn }, as = (e = os, t, n) => {
  const { kind: i, metadata: o } = n;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(n.name, e), i === "accessor") {
    const { name: a } = n;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, e, r), r;
    } };
  }
  if (i === "setter") {
    const { name: a } = n;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function re(e) {
  return (t, n) => typeof n == "object" ? as(e, t, n) : ((i, o, s) => {
    const a = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, i), a ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, n);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function q(e) {
  return re({ ...e, state: !0, attribute: !1 });
}
var Un = "http://www.w3.org/1999/xhtml";
const vi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Un,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function $n(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), vi.hasOwnProperty(t) ? { space: vi[t], local: e } : e;
}
function ss(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Un && t.documentElement.namespaceURI === Un ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function rs(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function po(e) {
  var t = $n(e);
  return (t.local ? rs : ss)(t);
}
function ds() {
}
function ei(e) {
  return e == null ? ds : function() {
    return this.querySelector(e);
  };
}
function ls(e) {
  typeof e != "function" && (e = ei(e));
  for (var t = this._groups, n = t.length, i = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], a = s.length, r = i[o] = new Array(a), l, p, g = 0; g < a; ++g)
      (l = s[g]) && (p = e.call(l, l.__data__, g, s)) && ("__data__" in l && (p.__data__ = l.__data__), r[g] = p);
  return new Fe(i, this._parents);
}
function cs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function ps() {
  return [];
}
function uo(e) {
  return e == null ? ps : function() {
    return this.querySelectorAll(e);
  };
}
function us(e) {
  return function() {
    return cs(e.apply(this, arguments));
  };
}
function ms(e) {
  typeof e == "function" ? e = us(e) : e = uo(e);
  for (var t = this._groups, n = t.length, i = [], o = [], s = 0; s < n; ++s)
    for (var a = t[s], r = a.length, l, p = 0; p < r; ++p)
      (l = a[p]) && (i.push(e.call(l, l.__data__, p, a)), o.push(l));
  return new Fe(i, o);
}
function mo(e) {
  return function() {
    return this.matches(e);
  };
}
function fo(e) {
  return function(t) {
    return t.matches(e);
  };
}
var fs = Array.prototype.find;
function hs(e) {
  return function() {
    return fs.call(this.children, e);
  };
}
function gs() {
  return this.firstElementChild;
}
function ys(e) {
  return this.select(e == null ? gs : hs(typeof e == "function" ? e : fo(e)));
}
var bs = Array.prototype.filter;
function Is() {
  return Array.from(this.children);
}
function vs(e) {
  return function() {
    return bs.call(this.children, e);
  };
}
function xs(e) {
  return this.selectAll(e == null ? Is : vs(typeof e == "function" ? e : fo(e)));
}
function ws(e) {
  typeof e != "function" && (e = mo(e));
  for (var t = this._groups, n = t.length, i = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], a = s.length, r = i[o] = [], l, p = 0; p < a; ++p)
      (l = s[p]) && e.call(l, l.__data__, p, s) && r.push(l);
  return new Fe(i, this._parents);
}
function ho(e) {
  return new Array(e.length);
}
function ks() {
  return new Fe(this._enter || this._groups.map(ho), this._parents);
}
function yn(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
yn.prototype = {
  constructor: yn,
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
function $s(e) {
  return function() {
    return e;
  };
}
function _s(e, t, n, i, o, s) {
  for (var a = 0, r, l = t.length, p = s.length; a < p; ++a)
    (r = t[a]) ? (r.__data__ = s[a], i[a] = r) : n[a] = new yn(e, s[a]);
  for (; a < l; ++a)
    (r = t[a]) && (o[a] = r);
}
function Cs(e, t, n, i, o, s, a) {
  var r, l, p = /* @__PURE__ */ new Map(), g = t.length, f = s.length, m = new Array(g), y;
  for (r = 0; r < g; ++r)
    (l = t[r]) && (m[r] = y = a.call(l, l.__data__, r, t) + "", p.has(y) ? o[r] = l : p.set(y, l));
  for (r = 0; r < f; ++r)
    y = a.call(e, s[r], r, s) + "", (l = p.get(y)) ? (i[r] = l, l.__data__ = s[r], p.delete(y)) : n[r] = new yn(e, s[r]);
  for (r = 0; r < g; ++r)
    (l = t[r]) && p.get(m[r]) === l && (o[r] = l);
}
function Ss(e) {
  return e.__data__;
}
function Es(e, t) {
  if (!arguments.length) return Array.from(this, Ss);
  var n = t ? Cs : _s, i = this._parents, o = this._groups;
  typeof e != "function" && (e = $s(e));
  for (var s = o.length, a = new Array(s), r = new Array(s), l = new Array(s), p = 0; p < s; ++p) {
    var g = i[p], f = o[p], m = f.length, y = As(e.call(g, g && g.__data__, p, i)), I = y.length, c = r[p] = new Array(I), d = a[p] = new Array(I), h = l[p] = new Array(m);
    n(g, f, c, d, h, y, t);
    for (var x = 0, _ = 0, A, L; x < I; ++x)
      if (A = c[x]) {
        for (x >= _ && (_ = x + 1); !(L = d[_]) && ++_ < I; ) ;
        A._next = L || null;
      }
  }
  return a = new Fe(a, i), a._enter = r, a._exit = l, a;
}
function As(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ms() {
  return new Fe(this._exit || this._groups.map(ho), this._parents);
}
function Ps(e, t, n) {
  var i = this.enter(), o = this, s = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), n == null ? s.remove() : n(s), i && o ? i.merge(o).order() : o;
}
function Ts(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, o = n.length, s = i.length, a = Math.min(o, s), r = new Array(o), l = 0; l < a; ++l)
    for (var p = n[l], g = i[l], f = p.length, m = r[l] = new Array(f), y, I = 0; I < f; ++I)
      (y = p[I] || g[I]) && (m[I] = y);
  for (; l < o; ++l)
    r[l] = n[l];
  return new Fe(r, this._parents);
}
function Os() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], o = i.length - 1, s = i[o], a; --o >= 0; )
      (a = i[o]) && (s && a.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(a, s), s = a);
  return this;
}
function Ns(e) {
  e || (e = Rs);
  function t(f, m) {
    return f && m ? e(f.__data__, m.__data__) : !f - !m;
  }
  for (var n = this._groups, i = n.length, o = new Array(i), s = 0; s < i; ++s) {
    for (var a = n[s], r = a.length, l = o[s] = new Array(r), p, g = 0; g < r; ++g)
      (p = a[g]) && (l[g] = p);
    l.sort(t);
  }
  return new Fe(o, this._parents).order();
}
function Rs(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ls() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Ds() {
  return Array.from(this);
}
function zs() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], o = 0, s = i.length; o < s; ++o) {
      var a = i[o];
      if (a) return a;
    }
  return null;
}
function Us() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function qs() {
  return !this.node();
}
function Fs(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var o = t[n], s = 0, a = o.length, r; s < a; ++s)
      (r = o[s]) && e.call(r, r.__data__, s, o);
  return this;
}
function Bs(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function js(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ws(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Vs(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Hs(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Gs(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Ys(e, t) {
  var n = $n(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? js : Bs : typeof t == "function" ? n.local ? Gs : Hs : n.local ? Vs : Ws)(n, t));
}
function go(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Ks(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Xs(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function Js(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function Qs(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Ks : typeof t == "function" ? Js : Xs)(e, t, n ?? "")) : St(this.node(), e);
}
function St(e, t) {
  return e.style.getPropertyValue(t) || go(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Zs(e) {
  return function() {
    delete this[e];
  };
}
function er(e, t) {
  return function() {
    this[e] = t;
  };
}
function tr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function nr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Zs : typeof t == "function" ? tr : er)(e, t)) : this.node()[e];
}
function yo(e) {
  return e.trim().split(/^|\s+/);
}
function ti(e) {
  return e.classList || new bo(e);
}
function bo(e) {
  this._node = e, this._names = yo(e.getAttribute("class") || "");
}
bo.prototype = {
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
function Io(e, t) {
  for (var n = ti(e), i = -1, o = t.length; ++i < o; ) n.add(t[i]);
}
function vo(e, t) {
  for (var n = ti(e), i = -1, o = t.length; ++i < o; ) n.remove(t[i]);
}
function ir(e) {
  return function() {
    Io(this, e);
  };
}
function or(e) {
  return function() {
    vo(this, e);
  };
}
function ar(e, t) {
  return function() {
    (t.apply(this, arguments) ? Io : vo)(this, e);
  };
}
function sr(e, t) {
  var n = yo(e + "");
  if (arguments.length < 2) {
    for (var i = ti(this.node()), o = -1, s = n.length; ++o < s; ) if (!i.contains(n[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? ar : t ? ir : or)(n, t));
}
function rr() {
  this.textContent = "";
}
function dr(e) {
  return function() {
    this.textContent = e;
  };
}
function lr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function cr(e) {
  return arguments.length ? this.each(e == null ? rr : (typeof e == "function" ? lr : dr)(e)) : this.node().textContent;
}
function pr() {
  this.innerHTML = "";
}
function ur(e) {
  return function() {
    this.innerHTML = e;
  };
}
function mr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function fr(e) {
  return arguments.length ? this.each(e == null ? pr : (typeof e == "function" ? mr : ur)(e)) : this.node().innerHTML;
}
function hr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function gr() {
  return this.each(hr);
}
function yr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function br() {
  return this.each(yr);
}
function Ir(e) {
  var t = typeof e == "function" ? e : po(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function vr() {
  return null;
}
function xr(e, t) {
  var n = typeof e == "function" ? e : po(e), i = t == null ? vr : typeof t == "function" ? t : ei(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function wr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function kr() {
  return this.each(wr);
}
function $r() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function _r() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Cr(e) {
  return this.select(e ? _r : $r);
}
function Sr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Er(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Ar(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function Mr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, o = t.length, s; n < o; ++n)
        s = t[n], (!e.type || s.type === e.type) && s.name === e.name ? this.removeEventListener(s.type, s.listener, s.options) : t[++i] = s;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function Pr(e, t, n) {
  return function() {
    var i = this.__on, o, s = Er(t);
    if (i) {
      for (var a = 0, r = i.length; a < r; ++a)
        if ((o = i[a]).type === e.type && o.name === e.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = s, o.options = n), o.value = t;
          return;
        }
    }
    this.addEventListener(e.type, s, n), o = { type: e.type, name: e.name, value: t, listener: s, options: n }, i ? i.push(o) : this.__on = [o];
  };
}
function Tr(e, t, n) {
  var i = Ar(e + ""), o, s = i.length, a;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var l = 0, p = r.length, g; l < p; ++l)
        for (o = 0, g = r[l]; o < s; ++o)
          if ((a = i[o]).type === g.type && a.name === g.name)
            return g.value;
    }
    return;
  }
  for (r = t ? Pr : Mr, o = 0; o < s; ++o) this.each(r(i[o], t, n));
  return this;
}
function xo(e, t, n) {
  var i = go(e), o = i.CustomEvent;
  typeof o == "function" ? o = new o(t, n) : (o = i.document.createEvent("Event"), n ? (o.initEvent(t, n.bubbles, n.cancelable), o.detail = n.detail) : o.initEvent(t, !1, !1)), e.dispatchEvent(o);
}
function Or(e, t) {
  return function() {
    return xo(this, e, t);
  };
}
function Nr(e, t) {
  return function() {
    return xo(this, e, t.apply(this, arguments));
  };
}
function Rr(e, t) {
  return this.each((typeof t == "function" ? Nr : Or)(e, t));
}
function* Lr() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && (yield a);
}
var wo = [null];
function Fe(e, t) {
  this._groups = e, this._parents = t;
}
function Gt() {
  return new Fe([[document.documentElement]], wo);
}
function Dr() {
  return this;
}
Fe.prototype = Gt.prototype = {
  constructor: Fe,
  select: ls,
  selectAll: ms,
  selectChild: ys,
  selectChildren: xs,
  filter: ws,
  data: Es,
  enter: ks,
  exit: Ms,
  join: Ps,
  merge: Ts,
  selection: Dr,
  order: Os,
  sort: Ns,
  call: Ls,
  nodes: Ds,
  node: zs,
  size: Us,
  empty: qs,
  each: Fs,
  attr: Ys,
  style: Qs,
  property: nr,
  classed: sr,
  text: cr,
  html: fr,
  raise: gr,
  lower: br,
  append: Ir,
  insert: xr,
  remove: kr,
  clone: Cr,
  datum: Sr,
  on: Tr,
  dispatch: Rr,
  [Symbol.iterator]: Lr
};
function je(e) {
  return typeof e == "string" ? new Fe([[document.querySelector(e)]], [document.documentElement]) : new Fe([[e]], wo);
}
function zr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function dt(e, t) {
  if (e = zr(e), t === void 0 && (t = e.currentTarget), t) {
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
var Ur = { value: () => {
} };
function ni() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new pn(n);
}
function pn(e) {
  this._ = e;
}
function qr(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", o = n.indexOf(".");
    if (o >= 0 && (i = n.slice(o + 1), n = n.slice(0, o)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
pn.prototype = ni.prototype = {
  constructor: pn,
  on: function(e, t) {
    var n = this._, i = qr(e + "", n), o, s = -1, a = i.length;
    if (arguments.length < 2) {
      for (; ++s < a; ) if ((o = (e = i[s]).type) && (o = Fr(n[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++s < a; )
      if (o = (e = i[s]).type) n[o] = xi(n[o], e.name, t);
      else if (t == null) for (o in n) n[o] = xi(n[o], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new pn(e);
  },
  call: function(e, t) {
    if ((o = arguments.length - 2) > 0) for (var n = new Array(o), i = 0, o, s; i < o; ++i) n[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (s = this._[e], i = 0, o = s.length; i < o; ++i) s[i].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var i = this._[e], o = 0, s = i.length; o < s; ++o) i[o].value.apply(t, n);
  }
};
function Fr(e, t) {
  for (var n = 0, i = e.length, o; n < i; ++n)
    if ((o = e[n]).name === t)
      return o.value;
}
function xi(e, t, n) {
  for (var i = 0, o = e.length; i < o; ++i)
    if (e[i].name === t) {
      e[i] = Ur, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
const qn = { capture: !0, passive: !1 };
function Fn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Br(e) {
  var t = e.document.documentElement, n = je(e).on("dragstart.drag", Fn, qn);
  "onselectstart" in t ? n.on("selectstart.drag", Fn, qn) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function jr(e, t) {
  var n = e.document.documentElement, i = je(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Fn, qn), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function ii(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function ko(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function Yt() {
}
var Bt = 0.7, bn = 1 / Bt, $t = "\\s*([+-]?\\d+)\\s*", jt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ge = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Wr = /^#([0-9a-f]{3,8})$/, Vr = new RegExp(`^rgb\\(${$t},${$t},${$t}\\)$`), Hr = new RegExp(`^rgb\\(${Ge},${Ge},${Ge}\\)$`), Gr = new RegExp(`^rgba\\(${$t},${$t},${$t},${jt}\\)$`), Yr = new RegExp(`^rgba\\(${Ge},${Ge},${Ge},${jt}\\)$`), Kr = new RegExp(`^hsl\\(${jt},${Ge},${Ge}\\)$`), Xr = new RegExp(`^hsla\\(${jt},${Ge},${Ge},${jt}\\)$`), wi = {
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
ii(Yt, Wt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ki,
  // Deprecated! Use color.formatHex.
  formatHex: ki,
  formatHex8: Jr,
  formatHsl: Qr,
  formatRgb: $i,
  toString: $i
});
function ki() {
  return this.rgb().formatHex();
}
function Jr() {
  return this.rgb().formatHex8();
}
function Qr() {
  return $o(this).formatHsl();
}
function $i() {
  return this.rgb().formatRgb();
}
function Wt(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Wr.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? _i(t) : n === 3 ? new Re(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Xt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Xt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Vr.exec(e)) ? new Re(t[1], t[2], t[3], 1) : (t = Hr.exec(e)) ? new Re(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Gr.exec(e)) ? Xt(t[1], t[2], t[3], t[4]) : (t = Yr.exec(e)) ? Xt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Kr.exec(e)) ? Ei(t[1], t[2] / 100, t[3] / 100, 1) : (t = Xr.exec(e)) ? Ei(t[1], t[2] / 100, t[3] / 100, t[4]) : wi.hasOwnProperty(e) ? _i(wi[e]) : e === "transparent" ? new Re(NaN, NaN, NaN, 0) : null;
}
function _i(e) {
  return new Re(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Xt(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new Re(e, t, n, i);
}
function Zr(e) {
  return e instanceof Yt || (e = Wt(e)), e ? (e = e.rgb(), new Re(e.r, e.g, e.b, e.opacity)) : new Re();
}
function Bn(e, t, n, i) {
  return arguments.length === 1 ? Zr(e) : new Re(e, t, n, i ?? 1);
}
function Re(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
ii(Re, Bn, ko(Yt, {
  brighter(e) {
    return e = e == null ? bn : Math.pow(bn, e), new Re(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Bt : Math.pow(Bt, e), new Re(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Re(ht(this.r), ht(this.g), ht(this.b), In(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ci,
  // Deprecated! Use color.formatHex.
  formatHex: Ci,
  formatHex8: ed,
  formatRgb: Si,
  toString: Si
}));
function Ci() {
  return `#${mt(this.r)}${mt(this.g)}${mt(this.b)}`;
}
function ed() {
  return `#${mt(this.r)}${mt(this.g)}${mt(this.b)}${mt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Si() {
  const e = In(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ht(this.r)}, ${ht(this.g)}, ${ht(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function In(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ht(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function mt(e) {
  return e = ht(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ei(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new We(e, t, n, i);
}
function $o(e) {
  if (e instanceof We) return new We(e.h, e.s, e.l, e.opacity);
  if (e instanceof Yt || (e = Wt(e)), !e) return new We();
  if (e instanceof We) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, o = Math.min(t, n, i), s = Math.max(t, n, i), a = NaN, r = s - o, l = (s + o) / 2;
  return r ? (t === s ? a = (n - i) / r + (n < i) * 6 : n === s ? a = (i - t) / r + 2 : a = (t - n) / r + 4, r /= l < 0.5 ? s + o : 2 - s - o, a *= 60) : r = l > 0 && l < 1 ? 0 : a, new We(a, r, l, e.opacity);
}
function td(e, t, n, i) {
  return arguments.length === 1 ? $o(e) : new We(e, t, n, i ?? 1);
}
function We(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
ii(We, td, ko(Yt, {
  brighter(e) {
    return e = e == null ? bn : Math.pow(bn, e), new We(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Bt : Math.pow(Bt, e), new We(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, o = 2 * n - i;
    return new Re(
      Tn(e >= 240 ? e - 240 : e + 120, o, i),
      Tn(e, o, i),
      Tn(e < 120 ? e + 240 : e - 120, o, i),
      this.opacity
    );
  },
  clamp() {
    return new We(Ai(this.h), Jt(this.s), Jt(this.l), In(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = In(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Ai(this.h)}, ${Jt(this.s) * 100}%, ${Jt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Ai(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Jt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Tn(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const _o = (e) => () => e;
function nd(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function id(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function od(e) {
  return (e = +e) == 1 ? Co : function(t, n) {
    return n - t ? id(t, n, e) : _o(isNaN(t) ? n : t);
  };
}
function Co(e, t) {
  var n = t - e;
  return n ? nd(e, n) : _o(isNaN(e) ? t : e);
}
const Mi = (function e(t) {
  var n = od(t);
  function i(o, s) {
    var a = n((o = Bn(o)).r, (s = Bn(s)).r), r = n(o.g, s.g), l = n(o.b, s.b), p = Co(o.opacity, s.opacity);
    return function(g) {
      return o.r = a(g), o.g = r(g), o.b = l(g), o.opacity = p(g), o + "";
    };
  }
  return i.gamma = e, i;
})(1);
function nt(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var jn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, On = new RegExp(jn.source, "g");
function ad(e) {
  return function() {
    return e;
  };
}
function sd(e) {
  return function(t) {
    return e(t) + "";
  };
}
function rd(e, t) {
  var n = jn.lastIndex = On.lastIndex = 0, i, o, s, a = -1, r = [], l = [];
  for (e = e + "", t = t + ""; (i = jn.exec(e)) && (o = On.exec(t)); )
    (s = o.index) > n && (s = t.slice(n, s), r[a] ? r[a] += s : r[++a] = s), (i = i[0]) === (o = o[0]) ? r[a] ? r[a] += o : r[++a] = o : (r[++a] = null, l.push({ i: a, x: nt(i, o) })), n = On.lastIndex;
  return n < t.length && (s = t.slice(n), r[a] ? r[a] += s : r[++a] = s), r.length < 2 ? l[0] ? sd(l[0].x) : ad(t) : (t = l.length, function(p) {
    for (var g = 0, f; g < t; ++g) r[(f = l[g]).i] = f.x(p);
    return r.join("");
  });
}
var Pi = 180 / Math.PI, Wn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function So(e, t, n, i, o, s) {
  var a, r, l;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (l = e * n + t * i) && (n -= e * l, i -= t * l), (r = Math.sqrt(n * n + i * i)) && (n /= r, i /= r, l /= r), e * i < t * n && (e = -e, t = -t, l = -l, a = -a), {
    translateX: o,
    translateY: s,
    rotate: Math.atan2(t, e) * Pi,
    skewX: Math.atan(l) * Pi,
    scaleX: a,
    scaleY: r
  };
}
var Qt;
function dd(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Wn : So(t.a, t.b, t.c, t.d, t.e, t.f);
}
function ld(e) {
  return e == null || (Qt || (Qt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Qt.setAttribute("transform", e), !(e = Qt.transform.baseVal.consolidate())) ? Wn : (e = e.matrix, So(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Eo(e, t, n, i) {
  function o(p) {
    return p.length ? p.pop() + " " : "";
  }
  function s(p, g, f, m, y, I) {
    if (p !== f || g !== m) {
      var c = y.push("translate(", null, t, null, n);
      I.push({ i: c - 4, x: nt(p, f) }, { i: c - 2, x: nt(g, m) });
    } else (f || m) && y.push("translate(" + f + t + m + n);
  }
  function a(p, g, f, m) {
    p !== g ? (p - g > 180 ? g += 360 : g - p > 180 && (p += 360), m.push({ i: f.push(o(f) + "rotate(", null, i) - 2, x: nt(p, g) })) : g && f.push(o(f) + "rotate(" + g + i);
  }
  function r(p, g, f, m) {
    p !== g ? m.push({ i: f.push(o(f) + "skewX(", null, i) - 2, x: nt(p, g) }) : g && f.push(o(f) + "skewX(" + g + i);
  }
  function l(p, g, f, m, y, I) {
    if (p !== f || g !== m) {
      var c = y.push(o(y) + "scale(", null, ",", null, ")");
      I.push({ i: c - 4, x: nt(p, f) }, { i: c - 2, x: nt(g, m) });
    } else (f !== 1 || m !== 1) && y.push(o(y) + "scale(" + f + "," + m + ")");
  }
  return function(p, g) {
    var f = [], m = [];
    return p = e(p), g = e(g), s(p.translateX, p.translateY, g.translateX, g.translateY, f, m), a(p.rotate, g.rotate, f, m), r(p.skewX, g.skewX, f, m), l(p.scaleX, p.scaleY, g.scaleX, g.scaleY, f, m), p = g = null, function(y) {
      for (var I = -1, c = m.length, d; ++I < c; ) f[(d = m[I]).i] = d.x(y);
      return f.join("");
    };
  };
}
var cd = Eo(dd, "px, ", "px)", "deg)"), pd = Eo(ld, ", ", ")", ")"), ud = 1e-12;
function Ti(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function md(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function fd(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const hd = (function e(t, n, i) {
  function o(s, a) {
    var r = s[0], l = s[1], p = s[2], g = a[0], f = a[1], m = a[2], y = g - r, I = f - l, c = y * y + I * I, d, h;
    if (c < ud)
      h = Math.log(m / p) / t, d = function(R) {
        return [
          r + R * y,
          l + R * I,
          p * Math.exp(t * R * h)
        ];
      };
    else {
      var x = Math.sqrt(c), _ = (m * m - p * p + i * c) / (2 * p * n * x), A = (m * m - p * p - i * c) / (2 * m * n * x), L = Math.log(Math.sqrt(_ * _ + 1) - _), O = Math.log(Math.sqrt(A * A + 1) - A);
      h = (O - L) / t, d = function(R) {
        var W = R * h, v = Ti(L), B = p / (n * x) * (v * fd(t * W + L) - md(L));
        return [
          r + B * y,
          l + B * I,
          p * v / Ti(t * W + L)
        ];
      };
    }
    return d.duration = h * 1e3 * t / Math.SQRT2, d;
  }
  return o.rho = function(s) {
    var a = Math.max(1e-3, +s), r = a * a, l = r * r;
    return e(a, r, l);
  }, o;
})(Math.SQRT2, 2, 4);
var Et = 0, Nt = 0, Mt = 0, Ao = 1e3, vn, Rt, xn = 0, yt = 0, _n = 0, Vt = typeof performance == "object" && performance.now ? performance : Date, Mo = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function oi() {
  return yt || (Mo(gd), yt = Vt.now() + _n);
}
function gd() {
  yt = 0;
}
function wn() {
  this._call = this._time = this._next = null;
}
wn.prototype = Po.prototype = {
  constructor: wn,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? oi() : +n) + (t == null ? 0 : +t), !this._next && Rt !== this && (Rt ? Rt._next = this : vn = this, Rt = this), this._call = e, this._time = n, Vn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Vn());
  }
};
function Po(e, t, n) {
  var i = new wn();
  return i.restart(e, t, n), i;
}
function yd() {
  oi(), ++Et;
  for (var e = vn, t; e; )
    (t = yt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Et;
}
function Oi() {
  yt = (xn = Vt.now()) + _n, Et = Nt = 0;
  try {
    yd();
  } finally {
    Et = 0, Id(), yt = 0;
  }
}
function bd() {
  var e = Vt.now(), t = e - xn;
  t > Ao && (_n -= t, xn = e);
}
function Id() {
  for (var e, t = vn, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : vn = n);
  Rt = e, Vn(i);
}
function Vn(e) {
  if (!Et) {
    Nt && (Nt = clearTimeout(Nt));
    var t = e - yt;
    t > 24 ? (e < 1 / 0 && (Nt = setTimeout(Oi, e - Vt.now() - _n)), Mt && (Mt = clearInterval(Mt))) : (Mt || (xn = Vt.now(), Mt = setInterval(bd, Ao)), Et = 1, Mo(Oi));
  }
}
function Ni(e, t, n) {
  var i = new wn();
  return t = t == null ? 0 : +t, i.restart((o) => {
    i.stop(), e(o + t);
  }, t, n), i;
}
var vd = ni("start", "end", "cancel", "interrupt"), xd = [], To = 0, Ri = 1, Hn = 2, un = 3, Li = 4, Gn = 5, mn = 6;
function Cn(e, t, n, i, o, s) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (n in a) return;
  wd(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: o,
    // For context during callback.
    on: vd,
    tween: xd,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: To
  });
}
function ai(e, t) {
  var n = He(e, t);
  if (n.state > To) throw new Error("too late; already scheduled");
  return n;
}
function Ye(e, t) {
  var n = He(e, t);
  if (n.state > un) throw new Error("too late; already running");
  return n;
}
function He(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function wd(e, t, n) {
  var i = e.__transition, o;
  i[t] = n, n.timer = Po(s, 0, n.time);
  function s(p) {
    n.state = Ri, n.timer.restart(a, n.delay, n.time), n.delay <= p && a(p - n.delay);
  }
  function a(p) {
    var g, f, m, y;
    if (n.state !== Ri) return l();
    for (g in i)
      if (y = i[g], y.name === n.name) {
        if (y.state === un) return Ni(a);
        y.state === Li ? (y.state = mn, y.timer.stop(), y.on.call("interrupt", e, e.__data__, y.index, y.group), delete i[g]) : +g < t && (y.state = mn, y.timer.stop(), y.on.call("cancel", e, e.__data__, y.index, y.group), delete i[g]);
      }
    if (Ni(function() {
      n.state === un && (n.state = Li, n.timer.restart(r, n.delay, n.time), r(p));
    }), n.state = Hn, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Hn) {
      for (n.state = un, o = new Array(m = n.tween.length), g = 0, f = -1; g < m; ++g)
        (y = n.tween[g].value.call(e, e.__data__, n.index, n.group)) && (o[++f] = y);
      o.length = f + 1;
    }
  }
  function r(p) {
    for (var g = p < n.duration ? n.ease.call(null, p / n.duration) : (n.timer.restart(l), n.state = Gn, 1), f = -1, m = o.length; ++f < m; )
      o[f].call(e, g);
    n.state === Gn && (n.on.call("end", e, e.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = mn, n.timer.stop(), delete i[t];
    for (var p in i) return;
    delete e.__transition;
  }
}
function fn(e, t) {
  var n = e.__transition, i, o, s = !0, a;
  if (n) {
    t = t == null ? null : t + "";
    for (a in n) {
      if ((i = n[a]).name !== t) {
        s = !1;
        continue;
      }
      o = i.state > Hn && i.state < Gn, i.state = mn, i.timer.stop(), i.on.call(o ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[a];
    }
    s && delete e.__transition;
  }
}
function kd(e) {
  return this.each(function() {
    fn(this, e);
  });
}
function $d(e, t) {
  var n, i;
  return function() {
    var o = Ye(this, e), s = o.tween;
    if (s !== n) {
      i = n = s;
      for (var a = 0, r = i.length; a < r; ++a)
        if (i[a].name === t) {
          i = i.slice(), i.splice(a, 1);
          break;
        }
    }
    o.tween = i;
  };
}
function _d(e, t, n) {
  var i, o;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = Ye(this, e), a = s.tween;
    if (a !== i) {
      o = (i = a).slice();
      for (var r = { name: t, value: n }, l = 0, p = o.length; l < p; ++l)
        if (o[l].name === t) {
          o[l] = r;
          break;
        }
      l === p && o.push(r);
    }
    s.tween = o;
  };
}
function Cd(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = He(this.node(), n).tween, o = 0, s = i.length, a; o < s; ++o)
      if ((a = i[o]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? $d : _d)(n, e, t));
}
function si(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var o = Ye(this, i);
    (o.value || (o.value = {}))[t] = n.apply(this, arguments);
  }), function(o) {
    return He(o, i).value[t];
  };
}
function Oo(e, t) {
  var n;
  return (typeof t == "number" ? nt : t instanceof Wt ? Mi : (n = Wt(t)) ? (t = n, Mi) : rd)(e, t);
}
function Sd(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Ed(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ad(e, t, n) {
  var i, o = n + "", s;
  return function() {
    var a = this.getAttribute(e);
    return a === o ? null : a === i ? s : s = t(i = a, n);
  };
}
function Md(e, t, n) {
  var i, o = n + "", s;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === o ? null : a === i ? s : s = t(i = a, n);
  };
}
function Pd(e, t, n) {
  var i, o, s;
  return function() {
    var a, r = n(this), l;
    return r == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), l = r + "", a === l ? null : a === i && l === o ? s : (o = l, s = t(i = a, r)));
  };
}
function Td(e, t, n) {
  var i, o, s;
  return function() {
    var a, r = n(this), l;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), l = r + "", a === l ? null : a === i && l === o ? s : (o = l, s = t(i = a, r)));
  };
}
function Od(e, t) {
  var n = $n(e), i = n === "transform" ? pd : Oo;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Td : Pd)(n, i, si(this, "attr." + e, t)) : t == null ? (n.local ? Ed : Sd)(n) : (n.local ? Md : Ad)(n, i, t));
}
function Nd(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Rd(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Ld(e, t) {
  var n, i;
  function o() {
    var s = t.apply(this, arguments);
    return s !== i && (n = (i = s) && Rd(e, s)), n;
  }
  return o._value = t, o;
}
function Dd(e, t) {
  var n, i;
  function o() {
    var s = t.apply(this, arguments);
    return s !== i && (n = (i = s) && Nd(e, s)), n;
  }
  return o._value = t, o;
}
function zd(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = $n(e);
  return this.tween(n, (i.local ? Ld : Dd)(i, t));
}
function Ud(e, t) {
  return function() {
    ai(this, e).delay = +t.apply(this, arguments);
  };
}
function qd(e, t) {
  return t = +t, function() {
    ai(this, e).delay = t;
  };
}
function Fd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Ud : qd)(t, e)) : He(this.node(), t).delay;
}
function Bd(e, t) {
  return function() {
    Ye(this, e).duration = +t.apply(this, arguments);
  };
}
function jd(e, t) {
  return t = +t, function() {
    Ye(this, e).duration = t;
  };
}
function Wd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Bd : jd)(t, e)) : He(this.node(), t).duration;
}
function Vd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ye(this, e).ease = t;
  };
}
function Hd(e) {
  var t = this._id;
  return arguments.length ? this.each(Vd(t, e)) : He(this.node(), t).ease;
}
function Gd(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Ye(this, e).ease = n;
  };
}
function Yd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Gd(this._id, e));
}
function Kd(e) {
  typeof e != "function" && (e = mo(e));
  for (var t = this._groups, n = t.length, i = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], a = s.length, r = i[o] = [], l, p = 0; p < a; ++p)
      (l = s[p]) && e.call(l, l.__data__, p, s) && r.push(l);
  return new Ze(i, this._parents, this._name, this._id);
}
function Xd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, o = n.length, s = Math.min(i, o), a = new Array(i), r = 0; r < s; ++r)
    for (var l = t[r], p = n[r], g = l.length, f = a[r] = new Array(g), m, y = 0; y < g; ++y)
      (m = l[y] || p[y]) && (f[y] = m);
  for (; r < i; ++r)
    a[r] = t[r];
  return new Ze(a, this._parents, this._name, this._id);
}
function Jd(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function Qd(e, t, n) {
  var i, o, s = Jd(t) ? ai : Ye;
  return function() {
    var a = s(this, e), r = a.on;
    r !== i && (o = (i = r).copy()).on(t, n), a.on = o;
  };
}
function Zd(e, t) {
  var n = this._id;
  return arguments.length < 2 ? He(this.node(), n).on.on(e) : this.each(Qd(n, e, t));
}
function el(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function tl() {
  return this.on("end.remove", el(this._id));
}
function nl(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = ei(e));
  for (var i = this._groups, o = i.length, s = new Array(o), a = 0; a < o; ++a)
    for (var r = i[a], l = r.length, p = s[a] = new Array(l), g, f, m = 0; m < l; ++m)
      (g = r[m]) && (f = e.call(g, g.__data__, m, r)) && ("__data__" in g && (f.__data__ = g.__data__), p[m] = f, Cn(p[m], t, n, m, p, He(g, n)));
  return new Ze(s, this._parents, t, n);
}
function il(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = uo(e));
  for (var i = this._groups, o = i.length, s = [], a = [], r = 0; r < o; ++r)
    for (var l = i[r], p = l.length, g, f = 0; f < p; ++f)
      if (g = l[f]) {
        for (var m = e.call(g, g.__data__, f, l), y, I = He(g, n), c = 0, d = m.length; c < d; ++c)
          (y = m[c]) && Cn(y, t, n, c, m, I);
        s.push(m), a.push(g);
      }
  return new Ze(s, a, t, n);
}
var ol = Gt.prototype.constructor;
function al() {
  return new ol(this._groups, this._parents);
}
function sl(e, t) {
  var n, i, o;
  return function() {
    var s = St(this, e), a = (this.style.removeProperty(e), St(this, e));
    return s === a ? null : s === n && a === i ? o : o = t(n = s, i = a);
  };
}
function No(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function rl(e, t, n) {
  var i, o = n + "", s;
  return function() {
    var a = St(this, e);
    return a === o ? null : a === i ? s : s = t(i = a, n);
  };
}
function dl(e, t, n) {
  var i, o, s;
  return function() {
    var a = St(this, e), r = n(this), l = r + "";
    return r == null && (l = r = (this.style.removeProperty(e), St(this, e))), a === l ? null : a === i && l === o ? s : (o = l, s = t(i = a, r));
  };
}
function ll(e, t) {
  var n, i, o, s = "style." + t, a = "end." + s, r;
  return function() {
    var l = Ye(this, e), p = l.on, g = l.value[s] == null ? r || (r = No(t)) : void 0;
    (p !== n || o !== g) && (i = (n = p).copy()).on(a, o = g), l.on = i;
  };
}
function cl(e, t, n) {
  var i = (e += "") == "transform" ? cd : Oo;
  return t == null ? this.styleTween(e, sl(e, i)).on("end.style." + e, No(e)) : typeof t == "function" ? this.styleTween(e, dl(e, i, si(this, "style." + e, t))).each(ll(this._id, e)) : this.styleTween(e, rl(e, i, t), n).on("end.style." + e, null);
}
function pl(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function ul(e, t, n) {
  var i, o;
  function s() {
    var a = t.apply(this, arguments);
    return a !== o && (i = (o = a) && pl(e, a, n)), i;
  }
  return s._value = t, s;
}
function ml(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, ul(e, t, n ?? ""));
}
function fl(e) {
  return function() {
    this.textContent = e;
  };
}
function hl(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function gl(e) {
  return this.tween("text", typeof e == "function" ? hl(si(this, "text", e)) : fl(e == null ? "" : e + ""));
}
function yl(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function bl(e) {
  var t, n;
  function i() {
    var o = e.apply(this, arguments);
    return o !== n && (t = (n = o) && yl(o)), t;
  }
  return i._value = e, i;
}
function Il(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, bl(e));
}
function vl() {
  for (var e = this._name, t = this._id, n = Ro(), i = this._groups, o = i.length, s = 0; s < o; ++s)
    for (var a = i[s], r = a.length, l, p = 0; p < r; ++p)
      if (l = a[p]) {
        var g = He(l, t);
        Cn(l, e, n, p, a, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new Ze(i, this._parents, e, n);
}
function xl() {
  var e, t, n = this, i = n._id, o = n.size();
  return new Promise(function(s, a) {
    var r = { value: a }, l = { value: function() {
      --o === 0 && s();
    } };
    n.each(function() {
      var p = Ye(this, i), g = p.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(l)), p.on = t;
    }), o === 0 && s();
  });
}
var wl = 0;
function Ze(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function Ro() {
  return ++wl;
}
var Je = Gt.prototype;
Ze.prototype = {
  constructor: Ze,
  select: nl,
  selectAll: il,
  selectChild: Je.selectChild,
  selectChildren: Je.selectChildren,
  filter: Kd,
  merge: Xd,
  selection: al,
  transition: vl,
  call: Je.call,
  nodes: Je.nodes,
  node: Je.node,
  size: Je.size,
  empty: Je.empty,
  each: Je.each,
  on: Zd,
  attr: Od,
  attrTween: zd,
  style: cl,
  styleTween: ml,
  text: gl,
  textTween: Il,
  remove: tl,
  tween: Cd,
  delay: Fd,
  duration: Wd,
  ease: Hd,
  easeVarying: Yd,
  end: xl,
  [Symbol.iterator]: Je[Symbol.iterator]
};
function kl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var $l = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: kl
};
function _l(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Cl(e) {
  var t, n;
  e instanceof Ze ? (t = e._id, e = e._name) : (t = Ro(), (n = $l).time = oi(), e = e == null ? null : e + "");
  for (var i = this._groups, o = i.length, s = 0; s < o; ++s)
    for (var a = i[s], r = a.length, l, p = 0; p < r; ++p)
      (l = a[p]) && Cn(l, e, t, p, a, n || _l(l, t));
  return new Ze(i, this._parents, e, t);
}
Gt.prototype.interrupt = kd;
Gt.prototype.transition = Cl;
const Zt = (e) => () => e;
function Sl(e, {
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
var zt = new Qe(1, 0, 0);
Qe.prototype;
function Nn(e) {
  e.stopImmediatePropagation();
}
function Pt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function El(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Al() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Di() {
  return this.__zoom || zt;
}
function Ml(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Pl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Tl(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], o = e.invertX(t[1][0]) - n[1][0], s = e.invertY(t[0][1]) - n[0][1], a = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    o > i ? (i + o) / 2 : Math.min(0, i) || Math.max(0, o),
    a > s ? (s + a) / 2 : Math.min(0, s) || Math.max(0, a)
  );
}
function Ol() {
  var e = El, t = Al, n = Tl, i = Ml, o = Pl, s = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, l = hd, p = ni("start", "zoom", "end"), g, f, m, y = 500, I = 150, c = 0, d = 10;
  function h(b) {
    b.property("__zoom", Di).on("wheel.zoom", W, { passive: !1 }).on("mousedown.zoom", v).on("dblclick.zoom", B).filter(o).on("touchstart.zoom", K).on("touchmove.zoom", de).on("touchend.zoom touchcancel.zoom", Y).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  h.transform = function(b, P, $, C) {
    var w = b.selection ? b.selection() : b;
    w.property("__zoom", Di), b !== w ? L(b, P, $, C) : w.interrupt().each(function() {
      O(this, arguments).event(C).start().zoom(null, typeof P == "function" ? P.apply(this, arguments) : P).end();
    });
  }, h.scaleBy = function(b, P, $, C) {
    h.scaleTo(b, function() {
      var w = this.__zoom.k, k = typeof P == "function" ? P.apply(this, arguments) : P;
      return w * k;
    }, $, C);
  }, h.scaleTo = function(b, P, $, C) {
    h.transform(b, function() {
      var w = t.apply(this, arguments), k = this.__zoom, E = $ == null ? A(w) : typeof $ == "function" ? $.apply(this, arguments) : $, S = k.invert(E), D = typeof P == "function" ? P.apply(this, arguments) : P;
      return n(_(x(k, D), E, S), w, a);
    }, $, C);
  }, h.translateBy = function(b, P, $, C) {
    h.transform(b, function() {
      return n(this.__zoom.translate(
        typeof P == "function" ? P.apply(this, arguments) : P,
        typeof $ == "function" ? $.apply(this, arguments) : $
      ), t.apply(this, arguments), a);
    }, null, C);
  }, h.translateTo = function(b, P, $, C, w) {
    h.transform(b, function() {
      var k = t.apply(this, arguments), E = this.__zoom, S = C == null ? A(k) : typeof C == "function" ? C.apply(this, arguments) : C;
      return n(zt.translate(S[0], S[1]).scale(E.k).translate(
        typeof P == "function" ? -P.apply(this, arguments) : -P,
        typeof $ == "function" ? -$.apply(this, arguments) : -$
      ), k, a);
    }, C, w);
  };
  function x(b, P) {
    return P = Math.max(s[0], Math.min(s[1], P)), P === b.k ? b : new Qe(P, b.x, b.y);
  }
  function _(b, P, $) {
    var C = P[0] - $[0] * b.k, w = P[1] - $[1] * b.k;
    return C === b.x && w === b.y ? b : new Qe(b.k, C, w);
  }
  function A(b) {
    return [(+b[0][0] + +b[1][0]) / 2, (+b[0][1] + +b[1][1]) / 2];
  }
  function L(b, P, $, C) {
    b.on("start.zoom", function() {
      O(this, arguments).event(C).start();
    }).on("interrupt.zoom end.zoom", function() {
      O(this, arguments).event(C).end();
    }).tween("zoom", function() {
      var w = this, k = arguments, E = O(w, k).event(C), S = t.apply(w, k), D = $ == null ? A(S) : typeof $ == "function" ? $.apply(w, k) : $, N = Math.max(S[1][0] - S[0][0], S[1][1] - S[0][1]), j = w.__zoom, V = typeof P == "function" ? P.apply(w, k) : P, X = l(j.invert(D).concat(N / j.k), V.invert(D).concat(N / V.k));
      return function(le) {
        if (le === 1) le = V;
        else {
          var fe = X(le), H = N / fe[2];
          le = new Qe(H, D[0] - fe[0] * H, D[1] - fe[1] * H);
        }
        E.zoom(null, le);
      };
    });
  }
  function O(b, P, $) {
    return !$ && b.__zooming || new R(b, P);
  }
  function R(b, P) {
    this.that = b, this.args = P, this.active = 0, this.sourceEvent = null, this.extent = t.apply(b, P), this.taps = 0;
  }
  R.prototype = {
    event: function(b) {
      return b && (this.sourceEvent = b), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(b, P) {
      return this.mouse && b !== "mouse" && (this.mouse[1] = P.invert(this.mouse[0])), this.touch0 && b !== "touch" && (this.touch0[1] = P.invert(this.touch0[0])), this.touch1 && b !== "touch" && (this.touch1[1] = P.invert(this.touch1[0])), this.that.__zoom = P, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(b) {
      var P = je(this.that).datum();
      p.call(
        b,
        this.that,
        new Sl(b, {
          sourceEvent: this.sourceEvent,
          target: h,
          transform: this.that.__zoom,
          dispatch: p
        }),
        P
      );
    }
  };
  function W(b, ...P) {
    if (!e.apply(this, arguments)) return;
    var $ = O(this, P).event(b), C = this.__zoom, w = Math.max(s[0], Math.min(s[1], C.k * Math.pow(2, i.apply(this, arguments)))), k = dt(b);
    if ($.wheel)
      ($.mouse[0][0] !== k[0] || $.mouse[0][1] !== k[1]) && ($.mouse[1] = C.invert($.mouse[0] = k)), clearTimeout($.wheel);
    else {
      if (C.k === w) return;
      $.mouse = [k, C.invert(k)], fn(this), $.start();
    }
    Pt(b), $.wheel = setTimeout(E, I), $.zoom("mouse", n(_(x(C, w), $.mouse[0], $.mouse[1]), $.extent, a));
    function E() {
      $.wheel = null, $.end();
    }
  }
  function v(b, ...P) {
    if (m || !e.apply(this, arguments)) return;
    var $ = b.currentTarget, C = O(this, P, !0).event(b), w = je(b.view).on("mousemove.zoom", D, !0).on("mouseup.zoom", N, !0), k = dt(b, $), E = b.clientX, S = b.clientY;
    Br(b.view), Nn(b), C.mouse = [k, this.__zoom.invert(k)], fn(this), C.start();
    function D(j) {
      if (Pt(j), !C.moved) {
        var V = j.clientX - E, X = j.clientY - S;
        C.moved = V * V + X * X > c;
      }
      C.event(j).zoom("mouse", n(_(C.that.__zoom, C.mouse[0] = dt(j, $), C.mouse[1]), C.extent, a));
    }
    function N(j) {
      w.on("mousemove.zoom mouseup.zoom", null), jr(j.view, C.moved), Pt(j), C.event(j).end();
    }
  }
  function B(b, ...P) {
    if (e.apply(this, arguments)) {
      var $ = this.__zoom, C = dt(b.changedTouches ? b.changedTouches[0] : b, this), w = $.invert(C), k = $.k * (b.shiftKey ? 0.5 : 2), E = n(_(x($, k), C, w), t.apply(this, P), a);
      Pt(b), r > 0 ? je(this).transition().duration(r).call(L, E, C, b) : je(this).call(h.transform, E, C, b);
    }
  }
  function K(b, ...P) {
    if (e.apply(this, arguments)) {
      var $ = b.touches, C = $.length, w = O(this, P, b.changedTouches.length === C).event(b), k, E, S, D;
      for (Nn(b), E = 0; E < C; ++E)
        S = $[E], D = dt(S, this), D = [D, this.__zoom.invert(D), S.identifier], w.touch0 ? !w.touch1 && w.touch0[2] !== D[2] && (w.touch1 = D, w.taps = 0) : (w.touch0 = D, k = !0, w.taps = 1 + !!g);
      g && (g = clearTimeout(g)), k && (w.taps < 2 && (f = D[0], g = setTimeout(function() {
        g = null;
      }, y)), fn(this), w.start());
    }
  }
  function de(b, ...P) {
    if (this.__zooming) {
      var $ = O(this, P).event(b), C = b.changedTouches, w = C.length, k, E, S, D;
      for (Pt(b), k = 0; k < w; ++k)
        E = C[k], S = dt(E, this), $.touch0 && $.touch0[2] === E.identifier ? $.touch0[0] = S : $.touch1 && $.touch1[2] === E.identifier && ($.touch1[0] = S);
      if (E = $.that.__zoom, $.touch1) {
        var N = $.touch0[0], j = $.touch0[1], V = $.touch1[0], X = $.touch1[1], le = (le = V[0] - N[0]) * le + (le = V[1] - N[1]) * le, fe = (fe = X[0] - j[0]) * fe + (fe = X[1] - j[1]) * fe;
        E = x(E, Math.sqrt(le / fe)), S = [(N[0] + V[0]) / 2, (N[1] + V[1]) / 2], D = [(j[0] + X[0]) / 2, (j[1] + X[1]) / 2];
      } else if ($.touch0) S = $.touch0[0], D = $.touch0[1];
      else return;
      $.zoom("touch", n(_(E, S, D), $.extent, a));
    }
  }
  function Y(b, ...P) {
    if (this.__zooming) {
      var $ = O(this, P).event(b), C = b.changedTouches, w = C.length, k, E;
      for (Nn(b), m && clearTimeout(m), m = setTimeout(function() {
        m = null;
      }, y), k = 0; k < w; ++k)
        E = C[k], $.touch0 && $.touch0[2] === E.identifier ? delete $.touch0 : $.touch1 && $.touch1[2] === E.identifier && delete $.touch1;
      if ($.touch1 && !$.touch0 && ($.touch0 = $.touch1, delete $.touch1), $.touch0) $.touch0[1] = this.__zoom.invert($.touch0[0]);
      else if ($.end(), $.taps === 2 && (E = dt(E, this), Math.hypot(f[0] - E[0], f[1] - E[1]) < d)) {
        var S = je(this).on("dblclick.zoom");
        S && S.apply(this, arguments);
      }
    }
  }
  return h.wheelDelta = function(b) {
    return arguments.length ? (i = typeof b == "function" ? b : Zt(+b), h) : i;
  }, h.filter = function(b) {
    return arguments.length ? (e = typeof b == "function" ? b : Zt(!!b), h) : e;
  }, h.touchable = function(b) {
    return arguments.length ? (o = typeof b == "function" ? b : Zt(!!b), h) : o;
  }, h.extent = function(b) {
    return arguments.length ? (t = typeof b == "function" ? b : Zt([[+b[0][0], +b[0][1]], [+b[1][0], +b[1][1]]]), h) : t;
  }, h.scaleExtent = function(b) {
    return arguments.length ? (s[0] = +b[0], s[1] = +b[1], h) : [s[0], s[1]];
  }, h.translateExtent = function(b) {
    return arguments.length ? (a[0][0] = +b[0][0], a[1][0] = +b[1][0], a[0][1] = +b[0][1], a[1][1] = +b[1][1], h) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, h.constrain = function(b) {
    return arguments.length ? (n = b, h) : n;
  }, h.duration = function(b) {
    return arguments.length ? (r = +b, h) : r;
  }, h.interpolate = function(b) {
    return arguments.length ? (l = b, h) : l;
  }, h.on = function() {
    var b = p.on.apply(p, arguments);
    return b === p ? h : b;
  }, h.clickDistance = function(b) {
    return arguments.length ? (c = (b = +b) * b, h) : Math.sqrt(c);
  }, h.tapDistance = function(b) {
    return arguments.length ? (d = +b, h) : d;
  }, h;
}
var Nl = Object.defineProperty, Rl = Object.getOwnPropertyDescriptor, xe = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Rl(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Nl(t, n, o), o;
};
function Ll(e, t, n, i) {
  const o = t.x - e.x, s = t.y - e.y, a = i.x - n.x, r = i.y - n.y, l = o * r - s * a;
  if (Math.abs(l) < 1e-9) return null;
  const p = ((n.x - e.x) * r - (n.y - e.y) * a) / l, g = ((n.x - e.x) * s - (n.y - e.y) * o) / l;
  return p <= 0.02 || p >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + p * o, y: e.y + p * s, t: p };
}
function Dl(e, t, n) {
  const i = n.x - t.x, o = n.y - t.y, s = i * i + o * o || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * i + (e.y - t.y) * o) / s)), r = t.x + a * i, l = t.y + a * o;
  return { dist: Math.hypot(e.x - r, e.y - l), t: a };
}
function zl(e) {
  let t = 0;
  for (let i = 0; i < e.length - 1; i++) t += Math.hypot(e[i + 1].x - e[i].x, e[i + 1].y - e[i].y);
  let n = t / 2;
  for (let i = 0; i < e.length - 1; i++) {
    const o = Math.hypot(e[i + 1].x - e[i].x, e[i + 1].y - e[i].y);
    if (o >= n && o > 0) {
      const s = n / o;
      return { x: e[i].x + (e[i + 1].x - e[i].x) * s, y: e[i].y + (e[i + 1].y - e[i].y) * s };
    }
    n -= o;
  }
  return e[Math.floor(e.length / 2)];
}
function Ul(e, t, n = 7) {
  let i = `M ${e[0].x} ${e[0].y}`;
  for (let o = 0; o < e.length - 1; o++) {
    const s = e[o], a = e[o + 1], r = Math.hypot(a.x - s.x, a.y - s.y) || 1, l = (a.x - s.x) / r, p = (a.y - s.y) / r, g = t.map(([m, y]) => Ll(s, a, m, y)).filter((m) => m !== null).filter((m) => m.t * r > n + 2 && (1 - m.t) * r > n + 2).sort((m, y) => m.t - y.t);
    let f = -1 / 0;
    for (const m of g)
      m.t * r - n <= f + 2 || (i += ` L ${m.x - l * n} ${m.y - p * n}`, i += ` A ${n} ${n} 0 0 1 ${m.x + l * n} ${m.y + p * n}`, f = m.t * r + n);
    i += ` L ${a.x} ${a.y}`;
  }
  return i;
}
const kt = {
  component: ee`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: ee`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  shield: ee`<path d="M6 0.5 L11 2.5 V6 C11 9 8.8 11 6 11.8 C3.2 11 1 9 1 6 V2.5 Z"></path>`,
  note: ee`<path d="M1.5 0.5 H10.5 V7.5 L7 11.5 H1.5 Z"></path><path d="M10.5 7.5 H7 V11.5"></path>`,
  area: ee`<rect x="0.5" y="1.5" width="11" height="9" rx="1" stroke-dasharray="2.4 1.8"></rect>`,
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
let Ie = class extends Ve {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = zt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
            const o = this.scene.nodes.filter((s) => this.selectedIds.includes(s.id)).map((s) => ({ id: s.id, kind: s.kind }));
            o.length && this.emit("delete-selection-requested", { items: o });
            return;
          }
          if (this._selectedWaypoint) {
            const o = this.scene.edges.find((s) => s.id === this._selectedWaypoint.edgeId);
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
    this._zoomBehavior = Ol().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), je(e).call(this._zoomBehavior);
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
    const o = this.fitInsets.left ?? 0, s = this.fitInsets.right ?? 0, a = this.fitInsets.top ?? 0, r = this.fitInsets.bottom ?? 0, l = Math.max(80, i.width - o - s), p = Math.max(80, i.height - a - r), g = Math.min(...t.map((d) => d.x - d.w / 2)) - e, f = Math.max(...t.map((d) => d.x + d.w / 2)) + e, m = Math.min(...t.map((d) => d.y - d.h / 2)) - e, y = Math.max(...t.map((d) => d.y + d.h / 2)) + e, I = Math.max(0.15, Math.min(l / (f - g), p / (y - m), 1.25)), c = zt.translate(
      o + l / 2 - I * (g + f) / 2,
      a + p / 2 - I * (m + y) / 2
    ).scale(I);
    je(n).call(this._zoomBehavior.transform, c);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(je(t), e);
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
    for (let s = e.parentId; s; s = (i = this.scene.nodes.find((a) => a.id === s)) == null ? void 0 : i.parentId) {
      const a = this.scene.nodes.find((l) => l.id === s);
      if (!a) break;
      if (this._dragPos && this._dragPos.id === s)
        return { x: e.x + (this._dragPos.x - a.x), y: e.y + (this._dragPos.y - a.y) };
      const r = (o = this._dragGroup) == null ? void 0 : o.get(s);
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
  clampToParent(e, t, n) {
    if (e.parentId) {
      const i = this.scene.nodes.find((o) => o.id === e.parentId);
      if (i) {
        const o = this.nodePos(i), s = o.x - i.w / 2 + 10 + e.w / 2, a = o.x + i.w / 2 - 10 - e.w / 2, r = o.y - i.h / 2 + 34 + e.h / 2, l = o.y + i.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, s), a), n = Math.min(Math.max(n, r), l);
      }
    }
    return { id: e.id, x: t, y: n };
  }
  /**
   * An area's cargo: the frame plus every top-level node whose box sits fully
   * inside it. Children ride with their container, so only top-level counts.
   */
  areaCargo(e) {
    const t = this.scene.nodes.filter((n) => {
      if (n.id === e.id || n.parentId) return !1;
      const i = this.nodePos(n);
      return i.x - n.w / 2 >= e.x - e.w / 2 && i.x + n.w / 2 <= e.x + e.w / 2 && i.y - n.h / 2 >= e.y - e.h / 2 && i.y + n.h / 2 <= e.y + e.h / 2;
    });
    return [e, ...t];
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
    for (const s of n) {
      const a = (o = s.closest) == null ? void 0 : o.call(s, "[data-node-id]");
      if (a) return a.getAttribute("data-node-id");
    }
    return null;
  }
  /** Topmost edge at a client-space point — note threads can land on relations. */
  edgeIdAtClient(e, t) {
    var i, o;
    const n = ((i = this.shadowRoot) == null ? void 0 : i.elementsFromPoint(e, t)) ?? [];
    for (const s of n) {
      const a = (o = s.closest) == null ? void 0 : o.call(s, "[data-edge-id]");
      if (a) return a.getAttribute("data-edge-id");
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
    const s = new Set(this.selectedIds), a = s.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (d) => s.has(d.id) && !(d.parentId && s.has(d.parentId))
    ) : t.kind === "area" ? this.areaCargo(t) : null, r = a ? new Map(a.map((d) => [d.id, this.nodePos(d)])) : null, l = (d) => (d.shiftKey || d.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a || d.shiftKey && t.kind === "external-system" && !a, p = a ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = p !== null, f = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], m = () => {
      const d = [], h = p === "menu" ? this.scene.nodes.filter((x) => x.kind === "ui-app") : this.scene.nodes.filter((x) => x.id === t.parentId);
      for (const x of h) {
        const _ = this.scene.nodes.filter((R) => R.parentId === x.id && f.includes(R.kind ?? "") && R.id !== t.id).sort((R, W) => R.y - W.y), A = x.x - x.w / 2 + 10, L = x.x + x.w / 2 - 10;
        for (const R of _) d.push({ x1: A, x2: L, y: R.y - R.h / 2 - 3, appId: x.id, beforeId: R.id });
        const O = _[_.length - 1];
        d.push({
          x1: A,
          x2: L,
          y: O ? O.y + O.h / 2 + 3 : x.y - x.h / 2 + 34 + 8,
          appId: x.id,
          beforeId: null
        });
      }
      return d;
    }, y = (d) => {
      const h = this.nodeIdAt(d), x = h && h !== t.id ? this.scene.nodes.find((_) => _.id === h) : void 0;
      return x ? x.kind === "external-system" ? x.id : x.parentId ?? null : null;
    }, I = (d) => {
      if ((d.buttons & 1) === 0) {
        c(d);
        return;
      }
      const h = this.toScene(d), x = h.x - n.x, _ = h.y - n.y;
      if (!(!o && Math.hypot(x, _) < 3 / this._t.k))
        if (o = !0, a && r) {
          const A = /* @__PURE__ */ new Map();
          for (const L of a) {
            const O = r.get(L.id), R = this.clampToParent(L, O.x + x, O.y + _);
            A.set(L.id, { x: R.x, y: R.y });
          }
          this._dragGroup = A;
        } else if (g) {
          this._dragPos = { id: t.id, x: i.x + x, y: i.y + _ }, this._menuSlots || (this._menuSlots = { slots: m(), active: null, nestRowId: null });
          const A = this.scene.nodes.filter(
            (O) => f.includes(O.kind ?? "") && O.id !== t.id && Math.abs(h.x - O.x) <= O.w / 2 + 8
          ), L = p === "menu" ? A.find((O) => Math.abs(h.y - O.y) < O.h * 0.28) : void 0;
          if (L)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: L.id }, this._hoverNodeId = L.id;
          else {
            let O = -1, R = 14;
            this._menuSlots.slots.forEach((W, v) => {
              if (h.x < W.x1 - 24 || h.x > W.x2 + 24) return;
              const B = Math.abs(h.y - W.y);
              B < R && (R = B, O = v);
            }), this._menuSlots = { ...this._menuSlots, active: O >= 0 ? O : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else l(d) ? (this._dragPos = { id: t.id, x: i.x + x, y: i.y + _ }, this._hoverNodeId = y(d)) : (this._dragPos = this.clampToParent(t, i.x + x, i.y + _), this._hoverNodeId = null);
    }, c = (d) => {
      if (window.removeEventListener("pointermove", I), window.removeEventListener("pointerup", c), o && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([h, x]) => ({ id: h, x: x.x, y: x.y }))
        });
      else if (o && this._dragPos && g) {
        const h = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const x = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (h != null && h.nestRowId)
          this.emit(x, { id: t.id, nestRowId: h.nestRowId });
        else if (h && h.active !== null) {
          const _ = h.slots[h.active];
          this.emit(x, { id: t.id, appId: _.appId, beforeId: _.beforeId });
        }
        return;
      } else if (o && this._dragPos) {
        if (l(d)) {
          const h = y(d);
          if (d.ctrlKey && t.kind === "api") {
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
    window.addEventListener("pointermove", I), window.addEventListener("pointerup", c);
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
    const o = t.kind === "area", s = t.container && !t.parentId, a = o ? 30 : s ? 160 : 90, r = o ? 20 : s ? 90 : 30, l = { x: t.x, y: t.y, w: t.w, h: t.h }, p = s ? this.scene.nodes.filter((h) => h.parentId === t.id) : [], g = Math.min(...p.map((h) => h.x - h.w / 2)), f = Math.max(...p.map((h) => h.x + h.w / 2)), m = Math.min(...p.map((h) => h.y - h.h / 2)), y = Math.max(...p.map((h) => h.y + h.h / 2)), I = da(
      p.map((h) => ({ dx: h.x - l.x, dy: h.y - l.y, w: h.w, h: h.h })),
      { w: a, h: r }
    ), c = (h) => {
      if ((h.buttons & 1) === 0) {
        d();
        return;
      }
      const x = this.toScene(h);
      if (h.shiftKey) {
        this._resize = {
          id: t.id,
          x: l.x,
          y: l.y,
          w: Math.max(I.w, 2 * Math.abs(x.x - l.x)),
          h: Math.max(I.h, 2 * Math.abs(x.y - l.y))
        };
        return;
      }
      const _ = l.x - n * l.w / 2, A = l.y - i * l.h / 2, L = n > 0 ? Math.max(x.x, _ + a, p.length ? f + 10 : -1 / 0) : Math.min(x.x, _ - a, p.length ? g - 10 : 1 / 0), O = i > 0 ? Math.max(x.y, A + r, p.length ? y + 10 : -1 / 0) : Math.min(x.y, A - r, p.length ? m - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (_ + L) / 2,
        y: (A + O) / 2,
        w: Math.abs(L - _),
        h: Math.abs(O - A)
      };
    }, d = () => {
      window.removeEventListener("pointermove", c), window.removeEventListener("pointerup", d), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", c), window.addEventListener("pointerup", d);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, n) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const i = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: i.x, y: i.y };
    const o = (a) => {
      if ((a.buttons & 1) === 0) {
        window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const r = this.toScene(a);
      this._pendingLink = { sourceId: t.id, x: r.x, y: r.y }, this._hoverNodeId = this.nodeIdAt(a);
    }, s = (a) => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s);
      const r = this.nodeIdAt(a);
      if (r && r !== t.id)
        this.emit("connect-requested", {
          sourceId: t.id,
          targetId: r,
          x: a.clientX,
          y: a.clientY,
          connectKind: n
        });
      else if (t.kind === "note") {
        const l = this.edgeIdAtClient(a.clientX, a.clientY);
        l && !l.startsWith("note:") && this.emit("connect-requested", {
          sourceId: t.id,
          targetId: `edge:${l}`,
          x: a.clientX,
          y: a.clientY,
          connectKind: n
        });
      }
      this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, n) {
    const { x: i, y: o } = this.nodePos(e), s = t - i, a = n - o, r = e.w / 2, l = e.h / 2;
    if (s === 0 && a === 0) return { x: i, y: o };
    const p = 1 / Math.max(Math.abs(s) / r, Math.abs(a) / l);
    return { x: i + s * p, y: o + a * p };
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
    const t = this.scene.nodes.find((g) => g.id === e.sourceId);
    if (e.targetId.startsWith("edgeanchor:")) {
      if (!t) return null;
      const g = e.targetId.slice(11), f = this.scene.edges.find((I) => I.id === g), m = f && f.id !== e.id ? this.edgePolyline(f) : null;
      if (!m || m.length < 2) return null;
      const y = zl(m);
      return [this.borderPoint(t, y.x, y.y), y];
    }
    const n = this.scene.nodes.find((g) => g.id === e.targetId);
    if (!t || !n) return null;
    const i = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], o = this.nodePos(t), s = this.nodePos(n), a = i[0] ?? s, r = i[i.length - 1] ?? o;
    let l = this.borderPoint(t, a.x, a.y), p = this.borderPoint(n, r.x, r.y);
    if (!i.length) {
      const g = this.edgeOffset(e);
      if (g !== 0) {
        const f = Math.hypot(p.x - l.x, p.y - l.y) || 1, m = -(p.y - l.y) / f * g, y = (p.x - l.x) / f * g;
        l = { x: l.x + m, y: l.y + y }, p = { x: p.x + m, y: p.y + y };
      }
    }
    return [l, ...i, p];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, n) {
    this._wpDrag = { edgeId: e.id, points: t, index: n };
    const i = t[n];
    let o = !1;
    const s = (r) => {
      if (!this._wpDrag) return;
      const l = this.toScene(r);
      if (!o && Math.hypot(l.x - i.x, l.y - i.y) < 4 / this._t.k) return;
      o = !0;
      const p = [...this._wpDrag.points];
      p[this._wpDrag.index] = l, this._wpDrag = { ...this._wpDrag, points: p };
    }, a = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", a), this._wpDrag && o && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", a);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let n = { seg: 0, dist: 1 / 0 };
    for (let i = 0; i < e.length - 1; i++) {
      const { dist: o } = Dl(t, e[i], e[i + 1]);
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
    let s = !1;
    const a = (l) => {
      if ((l.buttons & 1) === 0) {
        r();
        return;
      }
      const p = this.toScene(l);
      if (s) {
        if (this._wpDrag) {
          const g = [...this._wpDrag.points];
          g[o] = p, this._wpDrag = { ...this._wpDrag, points: g };
        }
      } else {
        if (Math.hypot(p.x - i.x, p.y - i.y) < 4 / this._t.k) return;
        s = !0, this.focus();
        const g = [...this.edgePoints[t.id] ?? []];
        g.splice(o, 0, p), this._selectedWaypoint = { edgeId: t.id, index: o }, this._wpDrag = { edgeId: t.id, points: g, index: o };
      }
    }, r = () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", r), s && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", r);
  }
  removeWaypoint(e, t) {
    const n = [...this.edgePoints[e.id] ?? []];
    n.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: n });
  }
  /** The interactive half of an edge: the fat invisible hit line (select, bend, drag). */
  renderEdgeHit(e, t) {
    const n = t.map((i) => `${i.x},${i.y}`).join(" ");
    return ee`
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
          ${e.tooltip ? ee`<title>${e.tooltip}</title>` : ""}
        </polyline>
      </g>`;
  }
  /**
   * The visible half (stroke, arrow, label, waypoint handles), painted in a layer
   * ABOVE every node so a line is never hidden — without stealing the nodes'
   * pointer events: only the label and the waypoint handles are interactive.
   */
  renderEdgeInk(e, t, n) {
    const i = e.color ?? "#64748b", o = this.selectedId === e.id, s = o || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), a = Math.floor((t.length - 1) / 2), r = {
      x: (t[a].x + t[a + 1].x) / 2,
      y: (t[a].y + t[a + 1].y) / 2
    }, l = t.slice(1, -1);
    return ee`
      <g data-edge-ink=${e.id} pointer-events="none" opacity=${e.dim ? 0.18 : 1}>
        <path d=${Ul(t, n)}
              fill="none"
              class=${e.kind === "journey" ? "journey-flow" : ""}
              stroke=${i} stroke-width=${e.kind === "journey" || s ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-start=${e.kind === "contains" ? `url(#diamond-${this.markerId(i)})` : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(i)})` : ""}></path>
        ${e.label ? ee`<text x=${r.x} y=${r.y - 6} text-anchor="middle"
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
        ${o ? l.map((p, g) => {
      var m;
      const f = ((m = this._selectedWaypoint) == null ? void 0 : m.edgeId) === e.id && this._selectedWaypoint.index === g;
      return ee`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${f ? 6 : 5}
                        fill=${f ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(y) => {
        y.button === 0 && (y.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: g }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], g));
      }}
                        @dblclick=${(y) => {
        y.stopPropagation(), this.removeWaypoint(e, g);
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
      const s = [];
      for (const y of i)
        for (const I of y) {
          const c = s[s.length - 1];
          (!c || Math.hypot(I.x - c.x, I.y - c.y) > 0.5) && s.push(I);
        }
      if (s.length < 2) return;
      let a = 0;
      for (let y = 0; y < s.length - 1; y++)
        a += Math.hypot(s[y + 1].x - s[y].x, s[y + 1].y - s[y].y);
      const r = "M " + s.map((y) => `${y.x} ${y.y}`).join(" L "), l = Math.min(6, Math.max(1.4, a / 260)), p = `jrun${o}`, g = o === 0 ? `0s;jrun${t.length - 1}.end+0.4s` : `jrun${o - 1}.end+0.4s`;
      n.push(ee`
        <circle r="6.5" fill="#d97706" stroke="#ffffff" stroke-width="1.8"
                opacity="0" pointer-events="none">
          <animateMotion id=${p} path=${r} dur="${l}s" begin=${g} fill="remove"
                         calcMode="linear"></animateMotion>
          <set attributeName="opacity" to="1" begin="${p}.begin" end="${p}.end"></set>
        </circle>`);
      const f = s[0], m = s[s.length - 1];
      n.push(ee`
        <circle cx=${f.x} cy=${f.y} r="5" fill="none" stroke="#d97706"
                stroke-width="2.5" opacity="0" pointer-events="none">
          <animate attributeName="r" values="5;26" dur="0.6s" begin="${p}.begin"
                   fill="remove"></animate>
          <animate attributeName="opacity" values="0.9;0" dur="0.6s" begin="${p}.begin"
                   fill="remove"></animate>
        </circle>
        <circle cx=${m.x} cy=${m.y} r="26" fill="none" stroke="#d97706"
                stroke-width="2.5" opacity="0" pointer-events="none">
          <animate attributeName="r" values="26;5" dur="0.45s" begin="${p}.end"
                   fill="remove"></animate>
          <animate attributeName="opacity" values="0.15;0.9" dur="0.45s" begin="${p}.end"
                   fill="remove"></animate>
        </circle>`);
    }), n;
  }
  markerId(e) {
    return e.replace(/[^a-zA-Z0-9]/g, "");
  }
  renderNode(e) {
    var m, y, I, c;
    const { x: t, y: n } = this.nodePos(e), i = this.selectedId === e.id || this.selectedIds.includes(e.id), o = this._hoverNodeId === e.id, s = !!e.container, a = !!e.parentId, r = ((m = this._resize) == null ? void 0 : m.id) === e.id ? this._resize.w : e.w, l = ((y = this._resize) == null ? void 0 : y.id) === e.id ? this._resize.h : e.h, p = r / 2, g = l / 2, f = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return ee`
      <g data-node-id=${e.id}
         opacity=${e.dim ? 0.25 : 1}
         transform="translate(${t}, ${n})${o ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (I = this._dragGroup) != null && I.has(e.id) ? "none" : "auto"}
         @pointerdown=${(d) => this.onNodePointerDown(d, e)}
         @dblclick=${(d) => {
      d.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? ee`<rect x=${-p - 4} y=${-g - 4} width=${r + 8} height=${l + 8}
                  rx=${a ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-g} width=${r} height=${l} rx=${a ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${o || i ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${i || o ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? ee`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? ee`<text x=${-p} y=${-g - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? ee`<g transform="translate(${p - 13}, ${-g + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(d) => {
      d.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(d) => d.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && kt[e.symbol] && (!a || s) ? ee`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-g + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${kt[e.symbol]}
              </g>` : ""}
        ${a && !s && e.symbol && kt[e.symbol] ? ee`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${kt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? ee`
              <foreignObject x=${-p + 6} y=${s ? -g + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${s ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(d) => d.stopPropagation()}
                  @keydown=${(d) => {
      d.stopPropagation(), d.key === "Enter" && this.commitRename(e, d.target.value), d.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(d) => this.commitRename(e, d.target.value)}
                />
              </foreignObject>` : a && !s ? ee`<text x=${-p + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${f}</text>` : s ? ee`<text x=${-p + 12} y=${-g + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : e.kind === "area" ? "" : ee`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${s ? ee`<line x1=${-p + 8} y1=${-g + 28} x2=${p - 8} y2=${-g + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${i && this.connectable && (a ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-system" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "note" || e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [p, 0],
      [-p, 0],
      [0, g],
      [0, -g]
    ].map(
      ([d, h]) => ee`
                <circle data-handle cx=${d} cy=${h} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(x) => this.onHandlePointerDown(x, e)}>
                  <title>${a ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "note" ? "Arrastra hasta cualquier elemento o relación: la nota quedará atada con un hilo" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${i && this.connectable && ((c = e.extraHandles) != null && c.length) ? e.extraHandles.map(
      (d, h) => ee`
                <g transform="translate(${-p + 24 + h * 20}, ${-g})">
                  <circle data-handle r="7" fill=${d.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(x) => this.onHandlePointerDown(x, e, d.kind)}>
                    <title>${d.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${(s || e.resizable) && i ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([d, h]) => ee`
                <rect data-resize x=${d * p - 6.5} y=${h * g - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${d * h > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(x) => this.onResizePointerDown(x, e, d, h)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return ee``;
    const e = this.scene.nodes.find((n) => n.id === this._pendingLink.sourceId);
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
    let n = !1;
    const i = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s), window.removeEventListener("pointercancel", i), this._rubber = null;
    }, o = (a) => {
      if ((a.buttons & 1) === 0) {
        i();
        return;
      }
      const r = this.toScene(a);
      !n && Math.hypot(r.x - t.x, r.y - t.y) < 4 / this._t.k || (n = !0, this._rubber = { a: t, b: r });
    }, s = () => {
      if (window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s), window.removeEventListener("pointercancel", i), n && this._rubber) {
        const { a, b: r } = this._rubber, l = Math.min(a.x, r.x), p = Math.max(a.x, r.x), g = Math.min(a.y, r.y), f = Math.max(a.y, r.y), m = this.scene.nodes.filter((y) => {
          const I = this.nodePos(y);
          return I.x >= l && I.x <= p && I.y >= g && I.y <= f;
        }).map((y) => y.id);
        this.emit("nodes-boxed", { ids: m });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", s), window.addEventListener("pointercancel", i);
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
    const n = Math.min(...t.map((a) => a.x - a.w / 2)) - e, i = Math.max(...t.map((a) => a.x + a.w / 2)) + e, o = Math.min(...t.map((a) => a.y - a.h / 2)) - e, s = Math.max(...t.map((a) => a.y + a.h / 2)) + e;
    return { minX: n, minY: o, w: i - n, h: s - o };
  }
  centerViewportOn(e, t) {
    const n = this.renderRoot.querySelector("svg.main");
    if (!n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect(), o = this._t.k, s = zt.translate(i.width / 2 - o * e, i.height / 2 - o * t).scale(o);
    je(n).call(this._zoomBehavior.transform, s);
  }
  onMinimapPointer(e, t, n) {
    const i = e.currentTarget.getBoundingClientRect(), o = t.minX + (e.clientX - i.left) / n, s = t.minY + (e.clientY - i.top) / n;
    this.centerViewportOn(o, s);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return M``;
    const t = 160, n = 110, i = Math.min(t / e.w, n / e.h), o = this.getBoundingClientRect(), s = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, r = o.width / this._t.k, l = o.height / this._t.k;
    return M`
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
      var g, f;
      (f = (g = p.currentTarget).hasPointerCapture) != null && f.call(g, p.pointerId) && this.onMinimapPointer(p, e, i);
    }}
      >
        <svg viewBox="0 0 ${t} ${n}">
          ${this.scene.nodes.map((p) => {
      const g = this.nodePos(p);
      return ee`<rect
              x=${(g.x - p.w / 2 - e.minX) * i}
              y=${(g.y - p.h / 2 - e.minY) * i}
              width=${Math.max(2, p.w * i)}
              height=${Math.max(2, p.h * i)}
              rx="1" fill=${p.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(s - e.minX) * i}
            y=${(a - e.minY) * i}
            width=${r * i}
            height=${l * i}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((a) => a.color ?? "#64748b"))], t = [], n = [], i = [], o = /* @__PURE__ */ new Map();
    this.scene.edges.forEach((a) => {
      const r = this.edgePolyline(a);
      if (r) {
        a.kind === "journey" && o.set(a.id, r), n.push(this.renderEdgeHit(a, r)), i.push(this.renderEdgeInk(a, r, [...t]));
        for (let l = 0; l < r.length - 1; l++) t.push([r[l], r[l + 1]]);
      }
    });
    const s = this.renderJourneyRunners(o);
    return M`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(a) => {
      const r = a.target;
      r.closest("[data-node-id]") || r.closest("[data-edge-id]") || this._spaceDown || a.button !== 0 || (a.buttons & 1) !== 0 && this.startRubberBand(a);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (a) => ee`
              <marker id="arrow-${this.markerId(a)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${a}></path>
              </marker>
              <marker id="diamond-${this.markerId(a)}" viewBox="0 0 12 8" refX="1" refY="4"
                      markerWidth="12" markerHeight="8" orient="auto">
                <path d="M 1 4 L 6 1 L 11 4 L 6 7 z" fill=${a}></path>
              </marker>`
    )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${n}
          ${this.scene.nodes.filter((a) => !a.parentId).map((a) => this.renderNode(a))}
          ${this.scene.nodes.filter((a) => a.parentId).map((a) => this.renderNode(a))}
          ${i}
          ${s}
          ${this._menuSlots ? ee`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (a, r) => ee`
                    <line x1=${a.x1} y1=${a.y} x2=${a.x2} y2=${a.y}
                          stroke=${r === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${r === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${r === this._menuSlots.active ? ee`<circle cx=${a.x1} cy=${a.y} r="3.5" fill="#0284c7"></circle>
                          <circle cx=${a.x2} cy=${a.y} r="3.5" fill="#0284c7"></circle>` : ""}`
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
Ie.styles = bt`
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
xe([
  re({ attribute: !1 })
], Ie.prototype, "scene", 2);
xe([
  re({ attribute: !1 })
], Ie.prototype, "selectedId", 2);
xe([
  re({ attribute: !1 })
], Ie.prototype, "selectedIds", 2);
xe([
  re({ type: Boolean })
], Ie.prototype, "connectable", 2);
xe([
  re({ attribute: !1 })
], Ie.prototype, "edgePoints", 2);
xe([
  q()
], Ie.prototype, "_t", 2);
xe([
  q()
], Ie.prototype, "_dragPos", 2);
xe([
  q()
], Ie.prototype, "_menuSlots", 2);
xe([
  q()
], Ie.prototype, "_dragGroup", 2);
xe([
  q()
], Ie.prototype, "_pendingLink", 2);
xe([
  q()
], Ie.prototype, "_hoverNodeId", 2);
xe([
  q()
], Ie.prototype, "_editingId", 2);
xe([
  q()
], Ie.prototype, "_spaceDown", 2);
xe([
  q()
], Ie.prototype, "_wpDrag", 2);
xe([
  q()
], Ie.prototype, "_selectedWaypoint", 2);
xe([
  q()
], Ie.prototype, "_resize", 2);
xe([
  q()
], Ie.prototype, "_rubber", 2);
xe([
  re({ attribute: !1 })
], Ie.prototype, "fitInsets", 2);
Ie = xe([
  It("modux-canvas")
], Ie);
function zi(e) {
  const t = e.legs ?? [], n = /* @__PURE__ */ new Map();
  for (let s = 0; s <= t.length; s++) {
    let a = !1;
    for (const r of t) {
      const l = Math.max(0, ...(r.afterLegIds ?? []).map((p) => n.get(p) ?? 0)) + 1;
      l <= t.length && l !== (n.get(r.id) ?? 0) && (n.set(r.id, l), a = !0);
    }
    if (!a) break;
  }
  const i = /* @__PURE__ */ new Map();
  for (const s of t) {
    const a = n.get(s.id) ?? 1;
    i.set(a, [...i.get(a) ?? [], s.id]);
  }
  const o = /* @__PURE__ */ new Map();
  for (const [s, a] of i)
    a.forEach((r, l) => {
      o.set(r, a.length === 1 ? `${s}` : `${s}${String.fromCharCode(97 + l)}`);
    });
  return o;
}
function Ui(e) {
  const t = e.legs ?? [], n = new Map(t.map((p) => [p.id, p])), i = /* @__PURE__ */ new Map();
  for (const p of t)
    for (const g of p.afterLegIds ?? [])
      i.set(g, [...i.get(g) ?? [], p.id]);
  const o = (p, g) => {
    const f = n.get(p);
    if (!f) return [];
    const m = i.get(p) ?? [], y = t.filter((I) => I.sourceId === f.targetId && I.id !== p).map((I) => I.id);
    return [.../* @__PURE__ */ new Set([...m, ...y])].filter((I) => !g.has(I));
  }, s = new Set(t.map((p) => p.targetId)), a = t.filter((p) => !(p.afterLegIds ?? []).length && !s.has(p.sourceId)).map((p) => p.id);
  !a.length && t.length && a.push(t[0].id);
  const r = [], l = (p, g) => {
    if (p.length > t.length) return;
    const f = o(p[p.length - 1], g);
    if (!f.length) {
      r.push(p);
      return;
    }
    for (const m of f) l([...p, m], /* @__PURE__ */ new Set([...g, m]));
  };
  for (const p of a) l([p], /* @__PURE__ */ new Set([p]));
  return r;
}
const oe = {
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
const xt = (e) => e.trim().toLowerCase();
function ql(e, t) {
  var v, B, K, de, Y;
  const n = { nodes: /* @__PURE__ */ new Map(), edges: [] }, i = new Map(e.boundedContexts.map((b) => [b.id, b.name])), o = e.boundedContexts.flatMap(
    (b) => (b.useCases ?? []).map((P) => ({ ...P, boundedContextId: b.id }))
  ), s = new Set(o.map((b) => b.id)), a = e.aggregates ?? [], r = new Set(
    e.boundedContexts.flatMap((b) => (b.domainServices ?? []).map((P) => P.id))
  ), l = e.boundedContexts.flatMap(
    (b) => (b.domainEvents ?? []).map((P) => ({ ...P, boundedContextId: b.id, application: !1 }))
  ), p = e.boundedContexts.flatMap(
    (b) => (b.applicationEvents ?? []).map((P) => ({ ...P, boundedContextId: b.id, application: !0 }))
  ), g = e.boundedContexts.flatMap(
    (b) => (b.readModels ?? []).map((P) => ({ ...P, boundedContextId: b.id }))
  );
  for (const b of o)
    Te(n, {
      id: b.id,
      label: b.name,
      x: 0,
      y: 0,
      w: oe.command.w,
      h: oe.command.h,
      kind: "use-case",
      symbol: b.policy ? "flow" : "gear",
      fill: b.policy ? oe.policy.fill : oe.command.fill,
      stroke: b.policy ? oe.policy.stroke : oe.command.stroke,
      badge: b.policy ? "POLICY" : "COMANDO",
      tooltip: b.policy ? `${b.name} — policy de ${i.get(b.boundedContextId) ?? b.boundedContextId} (reacción, no caso de negocio)` : `${b.name} — caso de uso de ${i.get(b.boundedContextId) ?? b.boundedContextId}`
    });
  for (const b of o)
    (b.steps ?? []).forEach((P, $) => {
      Te(n, {
        id: P.id,
        label: `${$ + 1}. ${P.name || P.type || "paso"}`,
        x: 0,
        y: 0,
        w: oe.command.w,
        h: 30,
        kind: "use-case-step",
        symbol: "gear",
        fill: "#eff6ff",
        stroke: "#1d4ed8",
        dashed: !!P.customCodeId,
        tooltip: `Paso de ${b.name}${P.customCodeId ? " — delega en código a mano" : ""} — arrastra su asa hasta un CODE para delegar en él`
      }), me(n, {
        id: `esstep:${$ === 0 ? b.id : (b.steps ?? [])[$ - 1].id}->${P.id}`,
        sourceId: $ === 0 ? b.id : (b.steps ?? [])[$ - 1].id,
        targetId: P.id,
        kind: "es-step",
        color: "#94a3b8",
        dashed: !0,
        arrow: !0,
        tooltip: `pipeline de ${b.name}`
      });
    });
  for (const b of e.customCodes ?? [])
    Te(n, {
      id: b.id,
      label: b.name,
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
      tooltip: `${b.name} — código a mano: los pasos Custom delegan en él`
    });
  for (const b of o)
    for (const P of b.steps ?? [])
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
  for (const b of a)
    Te(n, {
      id: b.id,
      label: b.name,
      x: 0,
      y: 0,
      w: oe.aggregate.w,
      h: oe.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: oe.aggregate.fill,
      stroke: oe.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${b.name} — agregado de ${i.get(b.boundedContextId) ?? b.boundedContextId}`
    });
  const f = /* @__PURE__ */ new Map();
  for (const b of [...l, ...p])
    Te(n, {
      id: b.id,
      label: b.name,
      x: 0,
      y: 0,
      w: oe.event.w,
      h: oe.event.h,
      kind: b.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: oe.event.fill,
      stroke: oe.event.stroke,
      badge: b.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${b.name} — evento de ${i.get(b.boundedContextId) ?? b.boundedContextId}`
    }), f.set(xt(b.name), b.id);
  const m = (b) => {
    if (!b || !b.trim()) return null;
    const P = f.get(xt(b));
    if (P) return P;
    const $ = `evname:${xt(b)}`;
    return Te(n, {
      id: $,
      label: b,
      x: 0,
      y: 0,
      w: oe.event.w,
      h: oe.event.h,
      kind: "event-name",
      symbol: "event",
      fill: oe.event.fill,
      stroke: oe.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${b} — referenciado por nombre, sin evento declarado en el catálogo`
    }), $;
  }, y = (b) => {
    const P = g.find((C) => C.id === b.id) ?? g.find((C) => b.name && xt(C.name) === xt(b.name)), $ = (P == null ? void 0 : P.id) ?? (b.id || (b.name ? `rm:${xt(b.name)}` : null));
    return $ ? (Te(n, {
      id: $,
      label: (P == null ? void 0 : P.name) ?? b.name ?? $,
      x: 0,
      y: 0,
      w: oe.readModel.w,
      h: oe.readModel.h,
      kind: P ? "read-model" : "derived-read-model",
      fill: oe.readModel.fill,
      stroke: oe.readModel.stroke,
      dashed: !P,
      badge: "READ MODEL"
    }), $) : null;
  };
  for (const b of e.actorUses ?? []) {
    if (!s.has(b.targetId)) continue;
    const P = (e.actors ?? []).find(($) => $.id === b.actorId);
    P && (Te(n, {
      id: P.id,
      label: P.name,
      x: 0,
      y: 0,
      w: oe.actor.w,
      h: oe.actor.h,
      kind: "actor",
      symbol: "person",
      fill: oe.actor.fill,
      stroke: oe.actor.stroke,
      badge: "ACTOR"
    }), me(n, {
      id: `es-actor:${P.id}->${b.targetId}`,
      sourceId: P.id,
      targetId: b.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const b of e.aiAgents ?? []) {
    const P = (e.agentUses ?? []).filter((E) => E.agentId === b.id), $ = (e.agentExternalUses ?? []).filter((E) => E.agentId === b.id), C = (e.agentRags ?? []).filter((E) => E.agentId === b.id), w = (e.agentMcpUses ?? []).filter((E) => E.agentId === b.id), k = (e.agentGatewayUses ?? []).some((E) => E.agentId === b.id) || (e.agentApiOpUses ?? []).some((E) => E.agentId === b.id) || (e.agentQueryUses ?? []).some((E) => E.agentId === b.id) || (e.agentDelegations ?? []).some((E) => E.agentId === b.id) || (e.agentTriggers ?? []).some((E) => E.agentId === b.id);
    if (!(!P.length && !$.length && !C.length && !w.length && !k)) {
      Te(n, {
        id: b.id,
        label: b.name,
        x: 0,
        y: 0,
        w: oe.actor.w,
        h: oe.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${b.name} — agente de IA (consume por MCP)`
      });
      for (const E of P)
        s.has(E.useCaseId) && me(n, {
          id: `es-agent:${b.id}->${E.useCaseId}`,
          sourceId: b.id,
          targetId: E.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const E of $) {
        const S = e.externalSystems.find(
          (N) => (N.useCases ?? []).some((j) => j.id === E.externalUseCaseId)
        );
        if (!S) continue;
        const D = (v = (S.useCases ?? []).find((N) => N.id === E.externalUseCaseId)) == null ? void 0 : v.name;
        Te(n, {
          id: S.id,
          label: S.name,
          x: 0,
          y: 0,
          w: oe.external.w,
          h: oe.external.h,
          kind: "external-system",
          symbol: "component",
          fill: oe.external.fill,
          stroke: oe.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), me(n, {
          id: `es-agentx:${b.id}->${E.externalUseCaseId}`,
          sourceId: b.id,
          targetId: S.id,
          kind: "es-agent-external",
          label: D,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: D ? `Llama a ${D} del sistema externo` : void 0
        });
      }
      for (const E of w) {
        const S = e.externalSystems.find(
          (N) => (N.mcpServers ?? []).some((j) => j.id === E.mcpServerId)
        );
        if (!S) continue;
        const D = (B = (S.mcpServers ?? []).find((N) => N.id === E.mcpServerId)) == null ? void 0 : B.name;
        Te(n, {
          id: S.id,
          label: S.name,
          x: 0,
          y: 0,
          w: oe.external.w,
          h: oe.external.h,
          kind: "external-system",
          symbol: "component",
          fill: oe.external.fill,
          stroke: oe.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), me(n, {
          id: `es-agentmcp:${b.id}->${E.mcpServerId}`,
          sourceId: b.id,
          targetId: S.id,
          kind: "es-agent-mcp",
          label: D,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: D ? `Consume las herramientas del servidor MCP ${D}` : void 0
        });
      }
      for (const E of C) {
        const S = (e.rags ?? []).find((D) => D.id === E.ragId);
        if (S) {
          Te(n, {
            id: S.id,
            label: S.name,
            x: 0,
            y: 0,
            w: oe.readModel.w,
            h: oe.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${S.name} — base de conocimiento (retrieval)`
          }), me(n, {
            id: `es-agrag:${b.id}->${S.id}`,
            sourceId: b.id,
            targetId: S.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const D of S.sourceReadModelIds ?? []) {
            const N = y({ id: D });
            N && me(n, {
              id: `es-ragsrc:${S.id}->${N}`,
              sourceId: N,
              targetId: S.id,
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
  const I = (b) => {
    const P = e.externalSystems.find(($) => $.id === b);
    return P ? (Te(n, {
      id: P.id,
      label: P.name,
      x: 0,
      y: 0,
      w: oe.external.w,
      h: oe.external.h,
      kind: "external-system",
      symbol: "component",
      fill: oe.external.fill,
      stroke: oe.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), P.id) : null;
  };
  for (const b of e.externalCalls ?? []) {
    const P = I(b.externalSystemId);
    !P || !s.has(b.useCaseId) || me(n, {
      id: `es-extin:${P}->${b.useCaseId}`,
      sourceId: P,
      targetId: b.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const b of e.externalUseCaseCalls ?? []) {
    if (!s.has(b.sourceId)) continue;
    const P = e.externalSystems.find(
      (w) => (w.useCases ?? []).some((k) => k.id === b.targetId)
    ), $ = P ? I(P.id) : null;
    if (!$) continue;
    const C = (K = ((P == null ? void 0 : P.useCases) ?? []).find((w) => w.id === b.targetId)) == null ? void 0 : K.name;
    me(n, {
      id: `es-extout:${b.sourceId}->${b.targetId}`,
      sourceId: b.sourceId,
      targetId: $,
      kind: "es-command-external",
      label: C,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: C ? `Llama a ${C} del sistema externo` : void 0
    });
  }
  for (const b of e.aggregateCalls ?? [])
    !s.has(b.sourceId) || !n.nodes.has(b.targetId) || me(n, {
      id: `es-write:${b.sourceId}->${b.targetId}`,
      sourceId: b.sourceId,
      targetId: b.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const c = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const b of c)
    !n.nodes.has(b.domainEventId) || !(n.nodes.has(b.sourceId) && (s.has(b.sourceId) || a.some(($) => $.id === b.sourceId) || r.has(b.sourceId))) || me(n, {
      id: `es-emit:${b.sourceId}->${b.domainEventId}`,
      sourceId: b.sourceId,
      targetId: b.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const d = (b, P, $, C, w, k) => (Te(n, {
    id: b,
    label: P,
    x: 0,
    y: 0,
    w: oe.policy.w,
    h: oe.policy.h,
    kind: $,
    symbol: "flow",
    fill: oe.policy.fill,
    stroke: oe.policy.stroke,
    badge: C,
    tooltip: w
  }), b), h = (b, P) => {
    const $ = m(b);
    $ && me(n, {
      id: `es-trigger:${$}->${P}`,
      sourceId: $,
      targetId: P,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, x = (b, P) => {
    !P || !s.has(P) || me(n, {
      id: `es-invoke:${b}->${P}`,
      sourceId: b,
      targetId: P,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const b of e.subscriptions ?? []) {
    const P = d(
      b.id,
      b.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${b.name}${b.eventName ? ` — reacciona a ${b.eventName}` : ""}${b.consumerGroup ? ` · grupo ${b.consumerGroup}` : ""}`
    );
    h(b.eventName, P);
    for (const $ of b.actions ?? []) {
      if ($.type === "CallUseCase" && x(P, $.useCaseId), $.type === "StartSaga" && $.sagaId) {
        const C = `saga:${$.sagaId}`;
        d(C, $.sagaId, "saga", "SAGA"), me(n, {
          id: `es-saga:${P}->${C}`,
          sourceId: P,
          targetId: C,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if ($.type === "UpdateProjection" && $.projectionId) {
        const C = (e.projections ?? []).find((w) => w.id === $.projectionId);
        C && me(n, {
          id: `es-feeds:${P}->${C.id}`,
          sourceId: P,
          targetId: C.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const b of e.projections ?? []) {
    const P = d(
      b.id,
      b.name,
      "projection",
      "PROYECCIÓN",
      `${b.name}${b.readModelName ? ` — materializa ${b.readModelName}` : ""}`
    );
    for (const w of b.handledEventIds) {
      const k = n.nodes.has(w) ? w : null;
      k && me(n, {
        id: `es-trigger:${k}->${P}`,
        sourceId: k,
        targetId: P,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    b.sourceAggregateId && n.nodes.has(b.sourceAggregateId) && me(n, {
      id: `es-state:${b.id}`,
      sourceId: b.sourceAggregateId,
      targetId: P,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const $ = b.sourceExternalUseCaseId ?? b.sourceExternalTableId;
    if ($) {
      const w = e.externalSystems.find(
        (E) => (E.useCases ?? []).some((S) => S.id === $) || (E.tables ?? []).some((S) => S.id === $)
      ), k = w ? I(w.id) : null;
      if (k) {
        const E = ((de = (w.useCases ?? []).find((S) => S.id === $)) == null ? void 0 : de.name) ?? ((Y = (w.tables ?? []).find((S) => S.id === $)) == null ? void 0 : Y.name);
        me(n, {
          id: `es-poll:${b.id}`,
          sourceId: k,
          targetId: P,
          kind: "es-projects-poll",
          label: E,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: E ? `polling de ${E}` : "polling"
        });
      }
    }
    const C = y({ id: b.readModelId, name: b.readModelName });
    C && me(n, {
      id: `es-projects:${P}->${C}`,
      sourceId: P,
      targetId: C,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const b of e.flows) {
    if (b.archetype === "MATERIALIZES") {
      const $ = m(b.triggerEvent), C = y({ name: b.readModelName ?? `${b.triggerEvent}View` });
      $ && C && me(n, {
        id: `es-mat:${b.id}`,
        sourceId: $,
        targetId: C,
        kind: "es-materializes",
        label: b.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${b.name} [MATERIALIZES]`
      });
      continue;
    }
    const P = d(
      `flow:${b.id}`,
      b.name,
      "flow",
      `POLICY · ${b.archetype}`,
      `Flow ${b.name} [${b.archetype}]`
    );
    if (h(b.triggerEvent, P), x(P, b.targetUseCaseId), !b.targetUseCaseId) {
      const $ = I(b.targetId), C = $ ?? `tgt:${b.targetId}`;
      !$ && i.has(b.targetId) && Te(n, {
        id: C,
        label: i.get(b.targetId) ?? b.targetId,
        x: 0,
        y: 0,
        w: oe.boundedContext.w,
        h: oe.boundedContext.h,
        kind: "boundedContext",
        symbol: "component",
        fill: oe.boundedContext.fill,
        stroke: oe.boundedContext.stroke,
        badge: "CONTEXTO"
      }), n.nodes.has(C) && me(n, {
        id: `es-deliver:${b.id}`,
        sourceId: P,
        targetId: C,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const b of e.processes ?? []) {
    const P = d(
      b.id,
      b.name,
      "process",
      `PROCESO${b.sla ? ` · SLA ${b.sla}` : ""}`,
      `${b.name}${b.triggerEvent ? ` — arranca con ${b.triggerEvent}` : ""}`
    );
    h(b.triggerEvent, P);
    for (const C of b.steps) x(P, C.useCaseId);
    const $ = m(b.onCompletionEventName);
    $ && me(n, {
      id: `es-done:${b.id}`,
      sourceId: P,
      targetId: $,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const b of e.workflows ?? []) {
    const P = d(
      b.id,
      b.name,
      "workflow",
      "WORKFLOW",
      `${b.name}${b.triggerEvent ? ` — arranca con ${b.triggerEvent}` : ""}`
    );
    h(b.triggerEvent, P);
    for (const C of b.steps ?? []) {
      x(P, C.targetUseCaseId);
      for (const w of [C.emittedEventName, C.completionEventName]) {
        const k = m(w);
        k && me(n, {
          id: `es-wfemit:${b.id}:${k}`,
          sourceId: P,
          targetId: k,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const $ = m(b.onCompletionEventName);
    $ && me(n, {
      id: `es-done:${b.id}`,
      sourceId: P,
      targetId: $,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const _ = [...n.nodes.values()], A = /* @__PURE__ */ new Map();
  for (const b of n.edges)
    A.has(b.targetId) || A.set(b.targetId, []), A.get(b.targetId).push(b.sourceId);
  const L = /* @__PURE__ */ new Map(), O = /* @__PURE__ */ new Set(), R = (b) => {
    const P = L.get(b);
    if (P !== void 0) return P;
    if (O.has(b)) return 0;
    O.add(b);
    const $ = A.get(b) ?? [], C = $.length ? 1 + Math.max(...$.map(R)) : 0;
    return O.delete(b), L.set(b, C), C;
  }, W = /* @__PURE__ */ new Map();
  for (const b of _) {
    const P = t[b.id];
    if (P) {
      b.x = P.x, b.y = P.y;
      continue;
    }
    const $ = R(b.id), C = W.get($) ?? 0;
    W.set($, C + 1), b.x = 140 + $ * 260, b.y = 110 + C * 110;
  }
  return { nodes: _, edges: n.edges };
}
const Fl = 190, Bl = 56, qi = 180, jl = 56, Wl = 150, Vl = 44, Fi = 250, Bi = 100;
function Hl(e, t) {
  const n = /* @__PURE__ */ new Set(), i = (o) => {
    if (n.has(o.id)) return 0;
    n.add(o.id);
    const s = (o.dependsOnStepIds ?? []).map((r) => t.get(r)).filter(Boolean), a = s.length ? 1 + Math.max(...s.map(i)) : 0;
    return n.delete(o.id), a;
  };
  return i(e);
}
function Gl(e, t) {
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
function Yl(e, t) {
  var l;
  const n = [], i = [], o = /* @__PURE__ */ new Set(), s = (p) => {
    var g;
    return (g = e.boundedContexts.flatMap((f) => f.useCases ?? []).find((f) => f.id === p)) == null ? void 0 : g.name;
  };
  let a = 140;
  (e.workflows ?? []).forEach((p) => {
    var x;
    const g = new Map(p.steps.map((_) => [_.id, _])), f = new Map(p.steps.map((_) => [_.id, Hl(_, g)])), m = /* @__PURE__ */ new Map();
    for (const _ of p.steps) {
      const A = f.get(_.id) ?? 0;
      m.set(A, (m.get(A) ?? 0) + 1);
    }
    const y = Math.max(1, ...m.values()), I = Gl(e, p);
    if (I && !o.has(I.id)) {
      o.add(I.id);
      const _ = t[I.id] ?? { x: 140, y: a };
      n.push({
        id: I.id,
        label: I.label,
        x: _.x,
        y: _.y,
        w: Wl,
        h: Vl,
        kind: I.kind,
        symbol: I.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: I.kind === "aggregate" ? "AGGREGATE" : I.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const c = t[p.id] ?? { x: 420, y: a };
    n.push({
      id: p.id,
      label: p.name,
      x: c.x,
      y: c.y,
      w: Fl,
      h: Bl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${p.name}${p.triggerEvent ? ` — arranca con ${p.triggerEvent}` : ""}${p.onCompletionEventName ? ` · emite ${p.onCompletionEventName} al completar` : ""}`
    }), I && i.push({
      id: `wft:${p.id}`,
      sourceId: I.id,
      targetId: p.id,
      kind: "workflow-trigger",
      label: p.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: p.triggerEvent ? `Evento: ${p.triggerEvent}` : void 0
    });
    const d = /* @__PURE__ */ new Map();
    let h = 0;
    for (const _ of p.steps) {
      const A = f.get(_.id) ?? 0;
      h = Math.max(h, A);
      const L = d.get(A) ?? 0;
      d.set(A, L + 1);
      const O = t[_.id] ?? {
        x: c.x + (A + 1) * Fi,
        y: a + (L - (m.get(A) - 1) / 2) * Bi
      }, R = s(_.targetUseCaseId);
      n.push({
        id: _.id,
        label: _.name,
        x: O.x,
        y: O.y,
        w: _.type === "JOIN" || _.type === "SPLIT" ? 100 : qi,
        h: _.type === "JOIN" || _.type === "SPLIT" ? 48 : jl,
        kind: "workflow-step",
        symbol: _.type === "JOIN" || _.type === "SPLIT" ? "flow" : _.roleId ? "actor" : "event",
        fill: _.type === "JOIN" || _.type === "SPLIT" ? "#f5f3ff" : _.roleId ? "#fef9c3" : "#ffffff",
        stroke: _.roleId && _.type !== "JOIN" && _.type !== "SPLIT" ? "#ca8a04" : "#6d28d9",
        dashed: _.type === "JOIN" || _.type === "SPLIT",
        badge: _.type === "JOIN" ? "⨝ JOIN" : _.type === "SPLIT" ? "⑃ SPLIT" : _.roleId ? `👤 ${_.roleId}${_.formPageId ? " · 📋" : ""}${_.deadline ? ` · ${_.deadline}` : ""}` : R ? `→ ${R}` : "∅ sin use case",
        tooltip: _.type === "JOIN" ? `${_.name} — espera a TODAS sus dependencias antes de seguir` : _.type === "SPLIT" ? `${_.name} — abre ramas paralelas: los pasos que dependan de él arrancan a la vez` : `${_.name}${_.roleId ? ` · tarea HUMANA de ${_.roleId}${_.deadline ? ` (plazo ${_.deadline})` : ""}` : ""}${_.emittedEventName ? ` · emite ${_.emittedEventName}` : ""}${R ? ` · lanza ${R}` : ""}${_.completionEventName ? ` · espera ${_.completionEventName}` : ""}${_.compensationUseCaseId ? " · ⎌ compensable" : ""}`
      });
      const W = (_.dependsOnStepIds ?? []).filter((v) => g.has(v));
      W.length === 0 && i.push({
        id: `wfs:${p.id}:${_.id}`,
        sourceId: p.id,
        targetId: _.id,
        kind: "workflow-start",
        label: _.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const v of W)
        i.push({
          id: `wfdep:${v}->${_.id}`,
          sourceId: v,
          targetId: _.id,
          kind: "workflow-dependency",
          label: _.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${_.name} espera a ${((x = g.get(v)) == null ? void 0 : x.name) ?? v}`
        });
    }
    if (p.onCompletionEventName) {
      const _ = `done:${p.id}`, A = t[_] ?? { x: c.x + (h + 2) * Fi, y: a };
      n.push({
        id: _,
        label: p.onCompletionEventName,
        x: A.x,
        y: A.y,
        w: qi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const L = new Set(p.steps.flatMap((R) => R.dependsOnStepIds ?? [])), O = p.steps.filter((R) => !L.has(R.id));
      for (const R of O.length ? O : [])
        i.push({
          id: `wfd:${p.id}:${R.id}`,
          sourceId: R.id,
          targetId: _,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      p.steps.length || i.push({
        id: `wfd:${p.id}`,
        sourceId: p.id,
        targetId: _,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    a += Math.max(2, y + 1) * Bi + 60;
  });
  const r = new Set(n.map((p) => p.id));
  (e.workflowGateways ?? []).forEach((p, g) => {
    const f = t[p.id] ?? { x: 200 + g % 5 * 220, y: 60 };
    n.push({
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
    }), r.add(p.id);
  });
  for (const p of e.workflowGateways ?? []) {
    for (const f of p.sourceIds ?? [])
      r.has(f) && i.push({
        id: `wflink:${f}->${p.id}`,
        sourceId: f,
        targetId: p.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const g = p.type === "SPLIT" && p.semantics === "EXCLUSIVE";
    for (const f of p.targetIds ?? []) {
      if (!r.has(f)) continue;
      const m = g ? (l = (p.branchConditions ?? []).find((y) => y.targetId === f)) == null ? void 0 : l.expression : void 0;
      i.push({
        id: `wflink:${p.id}->${f}`,
        sourceId: p.id,
        targetId: f,
        kind: "wf-link",
        color: "#6d28d9",
        dashed: g && !m,
        arrow: !0,
        label: m ?? (g ? "¿condición?" : void 0),
        tooltip: g ? `${m ? `Rama si: ${m}` : "Rama sin condición aún"} — doble click la edita; Supr desconecta` : "el gateway fluye aquí — Supr lo desconecta"
      });
    }
  }
  (e.workflows ?? []).flatMap((g) => (g.steps ?? []).filter((f) => f.roleId && r.has(f.id))).forEach((g, f) => {
    const m = (e.actors ?? []).find((I) => I.id === g.roleId), y = g.roleId;
    if (!r.has(y)) {
      const I = n.find((d) => d.id === g.id), c = t[y] ?? {
        x: I ? I.x - 90 : 120 + f * 200,
        y: I ? I.y - 120 : 40
      };
      n.push({
        id: y,
        label: (m == null ? void 0 : m.name) ?? y,
        x: c.x,
        y: c.y,
        w: 130,
        h: 44,
        kind: "actor",
        symbol: "person",
        fill: "#fef9c3",
        stroke: "#ca8a04",
        badge: "ROL",
        tooltip: `${(m == null ? void 0 : m.name) ?? y} — su lista de tareas recibe los pasos humanos conectados`
      }), r.add(y);
    }
    i.push({
      id: `wfrole:${g.id}->${y}`,
      sourceId: y,
      targetId: g.id,
      kind: "wf-role",
      color: "#ca8a04",
      dashed: !0,
      arrow: !0,
      tooltip: "la tarea cae en la lista de este rol — Supr la vuelve automática"
    });
  }), (e.workflows ?? []).flatMap((g) => (g.steps ?? []).filter((f) => f.formPageId && r.has(f.id))).forEach((g, f) => {
    const m = (e.pages ?? []).find((y) => y.id === g.formPageId);
    if (m) {
      if (!r.has(m.id)) {
        const y = n.find((c) => c.id === g.id), I = t[m.id] ?? {
          x: y ? y.x : 200 + f * 220,
          y: y ? y.y + 130 : 60
        };
        n.push({
          id: m.id,
          label: m.name,
          x: I.x,
          y: I.y,
          w: 160,
          h: 48,
          kind: "page",
          symbol: "page",
          fill: "#fff7ed",
          stroke: "#ca8a04",
          badge: "📋 FORMULARIO",
          tooltip: `${m.name} — el forms engine la presenta como formulario de la tarea`
        }), r.add(m.id);
      }
      i.push({
        id: `wfform:${g.id}->${m.id}`,
        sourceId: g.id,
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
    for (const g of p.steps ?? [])
      !g.handoffWorkflowId || !r.has(g.handoffWorkflowId) || !r.has(g.id) || i.push({
        id: `wflink:${g.id}->${g.handoffWorkflowId}`,
        sourceId: g.id,
        targetId: g.handoffWorkflowId,
        kind: "wf-link",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "el paso entrega a OTRO workflow — Supr lo desconecta"
      });
  return { nodes: n, edges: i };
}
const ji = 250, Ne = 30, lt = 6, Kl = 16, Tt = 190, Xl = 60, Jl = 170, en = 44;
function Ql(e, t, n) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${n.join(">")}`;
}
function $e(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Zl(e) {
  const t = [], n = (i, o, s) => {
    for (const a of i ?? []) {
      const r = [...o, a.label];
      t.push({ entry: a, path: r, depth: s }), n(a.children ?? [], r, s + 1);
    }
  };
  return n(e.menuItems ?? [], [], 0), t;
}
function ec(e, t) {
  var L, O, R, W;
  const n = [], i = [], o = e.uiApps ?? [], s = e.pages ?? [], a = (v) => {
    var B;
    return ((B = e.boundedContexts.flatMap((K) => K.useCases ?? []).find((K) => K.id === v)) == null ? void 0 : B.name) ?? v;
  }, r = (v) => {
    var B;
    return ((B = e.boundedContexts.flatMap((K) => K.queryServices ?? []).find((K) => K.id === v)) == null ? void 0 : B.name) ?? v;
  }, l = /* @__PURE__ */ new Map();
  let p = 160;
  for (const v of o) {
    const B = Zl(v), K = Math.max(
      90,
      54 + B.length * (Ne + lt)
    ), de = t[v.id] ?? { x: 190, y: p + K / 2 };
    p = de.y + K / 2 + 70;
    const Y = v.type ?? "APP";
    n.push({
      id: v.id,
      label: v.title || v.name,
      x: de.x,
      y: de.y,
      w: ji,
      h: K,
      kind: "ui-app",
      symbol: Y === "ORCHESTRATOR" || Y === "VIEW_EDITOR" ? "process" : "component",
      fill: Y === "ORCHESTRATOR" || Y === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: Y === "ORCHESTRATOR" || Y === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      container: !0,
      badge: Y === "ORCHESTRATOR" ? "ORQUESTADOR" : Y === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : Y === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: Y === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : Y === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : Y === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: Y === "ORCHESTRATOR" ? `${v.name} — orquesta y mantiene estado; solo enseña páginas hijas` : Y === "MASTER_DETAIL" ? `${v.name} — cabecera + pestañas (ambas son páginas)` : `App: ${v.name}`
    }), v.modelId && (l.set(v.modelId, {
      label: ((L = (e.models ?? []).find(($) => $.id === v.modelId)) == null ? void 0 : L.name) ?? v.modelId,
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
    for (const [$, C, w, k, E] of [
      [v.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [v.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      $ && i.push({
        id: `${C === "app-view" ? "appview" : "appedit"}:${v.id}->${$}`,
        sourceId: v.id,
        targetId: $,
        kind: C,
        color: k,
        label: w,
        arrow: !0,
        tooltip: E
      });
    const b = v.homePageId ?? v.homeAppId;
    b && i.push({
      id: `apphome:${v.id}->${b}`,
      sourceId: v.id,
      targetId: b,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: v.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), Y === "MASTER_DETAIL" && v.headerPageId && i.push({
      id: `appheader:${v.id}->${v.headerPageId}`,
      sourceId: v.id,
      targetId: v.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let P = de.y - K / 2 + 34 + 10 + Ne / 2;
    for (const { entry: $, path: C, depth: w } of B) {
      const k = Ql(v.id, $, C), E = w * Kl;
      if (n.push({
        id: k,
        label: $.label,
        x: de.x + E / 2,
        y: P,
        w: ji - 20 - E,
        h: Ne,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (O = $.children) != null && O.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (R = $.children) != null && R.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: v.id,
        tooltip: (W = $.children) != null && W.length ? "Agrupador (con submenú): no puede abrir nada" : $.pageId ? `Abre ${$.pageId}` : $.uiAdapterId ? `Abre la app ${$.uiAdapterId}` : $.useCaseId ? `Lanza ${$.useCaseId}` : $.aggregateId ? `CRUD inferido sobre ${$.aggregateId}` : $.queryOperationId ? `Listado con filtros de ${$.queryOperationId}` : "Entrada de menú sin destino"
      }), P += Ne + lt, $.uiAdapterId && o.some((S) => S.id === $.uiAdapterId) && i.push({
        id: `menuapp:${k}->${$.uiAdapterId}`,
        sourceId: k,
        targetId: $.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), $.useCaseId && e.boundedContexts.some((D) => (D.useCases ?? []).some((N) => N.id === $.useCaseId)) && (l.set($.useCaseId, {
        label: a($.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), i.push({
        id: `menuuc:${k}->${$.useCaseId}`,
        sourceId: k,
        targetId: $.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), $.aggregateId && (e.aggregates ?? []).some((S) => S.id === $.aggregateId)) {
        const S = (e.aggregates ?? []).find((D) => D.id === $.aggregateId);
        l.set(S.id, { label: S.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), i.push({
          id: `menuagg:${k}->${S.id}`,
          sourceId: k,
          targetId: S.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if ($.queryOperationId) {
        const S = e.boundedContexts.flatMap((N) => N.queryServices ?? []).find((N) => N.id === $.queryServiceId), D = ((S == null ? void 0 : S.operations) ?? []).find((N) => N.id === $.queryOperationId);
        S && D && (l.set(D.id, {
          label: `${D.name} (${S.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), i.push({
          id: `menuqop:${k}->${D.id}`,
          sourceId: k,
          targetId: D.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      $.pageId && s.some((S) => S.id === $.pageId) && i.push({
        id: `menupage:${k}->${$.pageId}`,
        sourceId: k,
        targetId: $.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let g = 160;
  const f = (v) => {
    var B;
    return ((B = s.find((K) => K.id === v)) == null ? void 0 : B.name) ?? v;
  };
  for (const v of s) {
    const B = t[v.id] ?? { x: 640, y: g }, K = v.type === "WIZARD" ? v.wizardSteps ?? [] : [], de = K.length ? 54 + K.length * (Ne + lt) : Xl;
    g = B.y + de + 90, n.push({
      id: v.id,
      label: v.name,
      x: B.x,
      y: B.y,
      w: Tt,
      h: de,
      kind: "page",
      symbol: "interface",
      badge: v.customCodeId ? "CODE" : v.type ?? "PAGE",
      container: K.length > 0,
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
    let Y = B.y - de / 2 + 34 + 10 + Ne / 2;
    K.forEach((b, P) => {
      const $ = b.id ?? b.pageId ?? String(P);
      n.push({
        id: `wizrow:${v.id}:${$}`,
        label: `${P + 1}. ${b.label ?? (b.pageId ? f(b.pageId) : "Paso")}${b.pageId ? "" : " ⌁"}`,
        x: B.x,
        y: Y,
        w: Tt - 20,
        h: Ne,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: b.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: v.id,
        tooltip: b.pageId ? `Paso ${P + 1}: ${f(b.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${P + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), Y += Ne + lt;
    });
    for (const [b, P, $, C] of [
      [v.crudDetailPageId ?? v.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [v.crudCreatePageId ?? v.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      b && i.push({
        id: `${P === "crud-detail" ? "cruddetail" : "crudnew"}:${v.id}->${b}`,
        sourceId: v.id,
        targetId: b,
        kind: P,
        color: C,
        label: $,
        dashed: !0,
        arrow: !0,
        tooltip: P === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let b = 0; b < (v.wizardSteps ?? []).length; b++) {
      const P = (v.wizardSteps ?? [])[b];
      if (!P.pageId) continue;
      const $ = P.id ?? P.pageId;
      i.push({
        id: `wizstep:${v.id}:${$}`,
        sourceId: `wizrow:${v.id}:${$}`,
        targetId: P.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${b + 1} — Supr desmapea`
      });
    }
    v.modelId && (l.set(v.modelId, {
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
    for (const b of v.buttons ?? [])
      b.useCaseId && (l.set(b.useCaseId, {
        label: a(b.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), i.push({
        id: `pgbtn:${v.id}->${b.useCaseId}`,
        sourceId: v.id,
        targetId: b.useCaseId,
        kind: "page-button",
        label: b.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: b.mappingId ? `Botón «${b.label}» — mapping ${b.mappingId}` : `Botón «${b.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    v.listingQueryServiceId && (l.set(v.listingQueryServiceId, {
      label: r(v.listingQueryServiceId),
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
  const m = e.buttonGroups ?? [], y = (v) => {
    var B;
    return ((B = m.find((K) => K.id === v)) == null ? void 0 : B.name) ?? v;
  };
  let I = 520;
  for (const v of m) {
    const B = v.buttons ?? [], K = v.groupIds ?? [], de = B.length + K.length, Y = t[v.id] ?? { x: 1e3, y: I }, b = Math.max(70, 54 + de * (Ne + lt));
    I = Y.y + b + 80, n.push({
      id: v.id,
      label: v.name,
      x: Y.x,
      y: Y.y,
      w: Tt,
      h: b,
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
    let P = Y.y - b / 2 + 34 + 10 + Ne / 2;
    for (const $ of B)
      n.push({
        id: `gbtn:${v.id}:${$.id}`,
        label: $.label ?? $.id,
        x: Y.x,
        y: P,
        w: Tt - 20,
        h: Ne,
        kind: "group-button",
        symbol: "usecase",
        fill: $.useCaseId || $.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !$.useCaseId && !$.apiOperationId,
        parentId: v.id,
        tooltip: `${$.label ?? $.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), P += Ne + lt;
    for (const $ of K)
      n.push({
        id: `gsub:${v.id}:${$}`,
        label: `▸ ${y($)}`,
        x: Y.x,
        y: P,
        w: Tt - 20,
        h: Ne,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        parentId: v.id,
        tooltip: `Subgrupo ${y($)} — Supr lo desanida (el grupo sigue existiendo)`
      }), P += Ne + lt;
  }
  for (const v of m)
    for (const B of v.buttons ?? [])
      !B.useCaseId || !e.boundedContexts.some((de) => (de.useCases ?? []).some((Y) => Y.id === B.useCaseId)) || (l.set(B.useCaseId, {
        label: a(B.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), i.push({
        id: `gbtnt:${v.id}:${B.id}`,
        sourceId: `gbtn:${v.id}:${B.id}`,
        targetId: B.useCaseId,
        kind: "gbtn-target",
        color: "#06b6d4",
        arrow: !0,
        tooltip: `«${B.label ?? B.id}» dispara este caso de uso — Supr lo desconecta`
      }));
  for (const v of s) {
    const B = [
      ["toolbar", v.toolbarGroupIds ?? []],
      ["botonera", v.bottomBarGroupIds ?? []]
    ];
    for (const [K, de] of B)
      for (const Y of de)
        m.some((b) => b.id === Y) && i.push({
          id: `bargrp:${v.id}:${K}:${Y}`,
          sourceId: Y,
          targetId: v.id,
          kind: "bar-group",
          color: K === "toolbar" ? "#0284c7" : "#7c3aed",
          label: K,
          dashed: !0,
          arrow: !0,
          tooltip: `Grupo enganchado a la ${K} de ${v.name} — Supr lo desengancha`
        });
  }
  let c = 160;
  for (const v of e.models ?? [])
    l.has(v.id) || l.set(v.id, { label: v.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [v, B] of l) {
    const K = t[v] ?? { x: 1050, y: c };
    c = K.y + en + 46, n.push({
      id: v,
      label: B.label,
      x: K.x,
      y: K.y,
      w: Jl,
      h: en,
      kind: B.kind,
      symbol: B.symbol,
      fill: "#ffffff",
      stroke: B.stroke
    });
  }
  let d = 120;
  for (const v of e.identityProviders ?? []) {
    const B = t[v.id] ?? { x: -320, y: d };
    d = B.y + 70 + 40, n.push({
      id: v.id,
      label: v.name,
      x: B.x,
      y: B.y,
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
    v.identityProviderId && (e.identityProviders ?? []).some((B) => B.id === v.identityProviderId) && i.push({
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
  const h = (e.actorAppUses ?? []).filter(
    (v) => o.some((B) => B.id === v.appId) && (e.actors ?? []).some((B) => B.id === v.actorId)
  ), x = [...new Set(h.map((v) => v.actorId))];
  let _ = 160;
  for (const v of x) {
    const B = (e.actors ?? []).find((de) => de.id === v), K = t[v] ?? { x: -60, y: _ };
    _ = K.y + en + 46, n.push({
      id: v,
      label: B.name,
      x: K.x,
      y: K.y,
      w: 150,
      h: en,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const v of h)
    i.push({
      id: `actorapp:${v.actorId}->${v.appId}`,
      sourceId: v.actorId,
      targetId: v.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  (e.customCodes ?? []).forEach((v, B) => {
    const K = t[v.id] ?? { x: 1200, y: 120 + B * 90 };
    n.push({
      id: v.id,
      label: v.name,
      x: K.x,
      y: K.y,
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
  const A = new Set(n.map((v) => v.id));
  for (const v of s)
    v.customCodeId && A.has(v.customCodeId) && i.push({
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
    for (const B of v.usedElementIds ?? [])
      A.has(B) && i.push({
        id: `ccuse:${v.id}->${B}`,
        sourceId: v.id,
        targetId: B,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${v.name} usa este elemento — Supr lo desconecta`
      });
  return { nodes: n, edges: i };
}
const Wi = 188, Vi = 34, Hi = 10, tn = 24, Gi = 6;
function nn(e, t) {
  return `fld:${e}:${t}`;
}
function Yn(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function tc(e, t) {
  const n = [], i = [], o = e.models ?? [], s = e.modelMappings ?? [], a = (m) => {
    var y;
    return ((y = o.find((I) => I.id === m)) == null ? void 0 : y.name) ?? m ?? "?";
  };
  o.forEach((m, y) => {
    const I = t[m.id] ?? { x: 200 + y % 5 * 260, y: 160 + Math.floor(y / 5) * 220 }, c = m.fields ?? [], d = Vi + (c.length ? c.length * tn + (c.length - 1) * Gi : 10) + Hi;
    n.push({
      id: m.id,
      label: m.name,
      x: I.x,
      y: I.y,
      w: Wi,
      h: d,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${m.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), c.forEach((h, x) => {
      n.push({
        id: nn(m.id, h.id),
        label: h.name,
        x: I.x,
        y: I.y - d / 2 + Vi + x * (tn + Gi) + tn / 2,
        w: Wi - 2 * Hi,
        h: tn,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: h.type ?? void 0,
        parentId: m.id,
        tooltip: `${h.name}${h.type ? ` (${h.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((m, y) => {
    const I = t[m.id] ?? { x: 200 + y % 5 * 260, y: 60 };
    n.push({
      id: m.id,
      label: m.name,
      x: I.x,
      y: I.y,
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
  }), (e.customCodes ?? []).forEach((m, y) => {
    const I = t[m.id] ?? { x: 120 + y % 5 * 220, y: 60 };
    n.push({
      id: m.id,
      label: m.name,
      x: I.x,
      y: I.y,
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
  const r = new Set(n.map((m) => m.id)), l = (m) => m.fieldId ? nn(m.modelId, m.fieldId) : m.modelId;
  for (const m of e.transformations ?? [])
    m.customCodeId && r.has(m.customCodeId) && r.has(m.id) && i.push({
      id: `cctf:${m.id}`,
      sourceId: m.customCodeId,
      targetId: m.id,
      kind: "custom-of-transformation",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      tooltip: `${m.name} delega en código a mano — Supr lo desconecta`
    });
  for (const m of s)
    m.customCodeId && r.has(m.customCodeId) && m.targetModelId && r.has(m.targetModelId) && i.push({
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
    for (const y of m.inputs ?? []) {
      const I = l(y);
      r.has(I) && i.push({
        id: `tfin:${m.id}:${y.modelId}:${y.fieldId ?? ""}`,
        sourceId: I,
        targetId: m.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${m.name} — Supr la desconecta`
      });
    }
    m.output && r.has(l(m.output)) && i.push({
      id: `tfout:${m.id}`,
      sourceId: m.id,
      targetId: l(m.output),
      kind: "transform-output",
      color: "#ea580c",
      arrow: !0,
      tooltip: `salida de ${m.name} — Supr la desconecta`
    });
  }
  for (const m of s)
    if (!(!m.sourceModelId || !m.targetModelId) && !(!r.has(m.sourceModelId) || !r.has(m.targetModelId))) {
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
      for (const y of m.rules ?? []) {
        const I = nn(m.sourceModelId, y.sourceFieldId ?? ""), c = nn(m.targetModelId, y.targetFieldId ?? "");
        !r.has(I) || !r.has(c) || i.push({
          id: `maprule:${m.id}:${y.id}`,
          sourceId: I,
          targetId: c,
          kind: "mapping-rule",
          color: "#a78bfa",
          dashed: !0,
          arrow: !0,
          tooltip: `Regla de ${m.name} — Supr la elimina`
        });
      }
    }
  const p = new Set(
    s.filter((m) => m.sourceModelId && m.targetModelId).map((m) => `${m.sourceModelId}->${m.targetModelId}`)
  ), g = new Map(
    e.boundedContexts.flatMap((m) => (m.useCases ?? []).map((y) => [y.id, y]))
  ), f = /* @__PURE__ */ new Set();
  for (const m of e.pages ?? [])
    if (m.modelId)
      for (const y of m.buttons ?? []) {
        if (!y.useCaseId || y.mappingId) continue;
        const I = g.get(y.useCaseId);
        if (!(I != null && I.inputModelId) || I.inputModelId === m.modelId) continue;
        const c = `${m.modelId}->${I.inputModelId}`;
        p.has(c) || f.has(c) || (f.add(c), !(!r.has(m.modelId) || !r.has(I.inputModelId)) && i.push({
          id: `mapgap:${m.id}:${y.useCaseId}`,
          sourceId: m.modelId,
          targetId: I.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${y.label}» (página ${m.name}) llama a ${I.name}: falta mapear ${a(m.modelId)} → ${a(I.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: n, edges: i };
}
const Rn = 560, on = 34, an = 14, Ln = 150, sn = 40, rn = 12, dn = 150, tt = 40, nc = (e) => e.startsWith("SOURCE") ? 0 : e === "TRANSFORM" ? 1 : 2, ic = {
  0: { fill: "#f0f9ff", stroke: "#0284c7", symbol: "lens" },
  1: { fill: "#f0fdfa", stroke: "#0f766e", symbol: "gear" },
  2: { fill: "#f5f3ff", stroke: "#7c3aed", symbol: "event" }
};
function oc(e, t) {
  const n = [], i = [], o = e.etlFlows ?? [], s = new Map(e.boundedContexts.map((c) => [c.id, c.name])), a = new Map(
    e.boundedContexts.flatMap((c) => [
      ...(c.domainEvents ?? []).map((d) => [d.id, d.name]),
      ...(c.applicationEvents ?? []).map((d) => [d.id, d.name])
    ])
  );
  let r = 140;
  for (const c of o) {
    const d = c.steps ?? [], h = [[], [], []];
    d.forEach((L) => h[nc(L.type)].push(L));
    const x = Math.max(1, ...h.map((L) => L.length)), _ = on + an + x * (sn + rn), A = t[c.id] ?? { x: 420, y: r };
    r = A.y + _ + 110, n.push({
      id: c.id,
      label: c.name,
      x: A.x,
      y: A.y,
      w: Rn,
      h: _,
      kind: "etl-flow",
      symbol: "gear",
      badge: "ETL",
      container: !0,
      fill: "#ffffff",
      stroke: "#0f766e",
      tooltip: `${c.name} — integrador${c.ownerBoundedContextId ? ` de ${s.get(c.ownerBoundedContextId) ?? c.ownerBoundedContextId}` : ""}: fuentes → transformación → escrituras; la paleta añade transformaciones`
    }), h.forEach((L, O) => {
      const R = A.x - Rn / 2 + an + Ln / 2 + O * (Rn - 2 * an - Ln) / 2;
      L.forEach((W, v) => {
        const B = ic[O];
        if (n.push({
          id: W.id,
          label: W.name ?? W.id,
          x: R,
          y: A.y - _ / 2 + on + sn / 2 + v * (sn + rn),
          w: Ln,
          h: sn,
          kind: "etl-step",
          symbol: B.symbol,
          fill: B.fill,
          stroke: B.stroke,
          badge: W.type === "SOURCE_PULL" ? "PULL" : W.type === "SOURCE_CONSUMER" ? "CONSUME" : W.type === "TRANSFORM" ? "TRANSFORM" : W.type === "WRITE_API" ? "→ API" : W.type === "WRITE_DB" ? "→ BD" : "→ EVENTO",
          parentId: c.id,
          tooltip: `${W.name ?? W.id} (${W.type})${W.mappingId ? " · aplica un mapeado" : ""} — Supr lo quita del integrador`
        }), O > 0) {
          const K = h[O - 1], de = K[Math.min(v, K.length - 1)];
          de && i.push({
            id: `etlpipe:${c.id}:${de.id}->${W.id}`,
            sourceId: de.id,
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
  const l = new Set(n.map((c) => c.id)), p = new Set(o.flatMap((c) => (c.steps ?? []).map((d) => d.externalTableId)).filter(Boolean)), g = new Set(o.flatMap((c) => (c.steps ?? []).map((d) => d.apiId)).filter(Boolean)), f = new Set(o.flatMap((c) => (c.steps ?? []).map((d) => d.eventId)).filter(Boolean));
  let m = 120;
  for (const c of e.externalSystems) {
    const d = (c.tables ?? []).filter((_) => p.has(_.id));
    if (!d.length) continue;
    const h = on + an + d.length * (tt + rn), x = t[c.id] ?? { x: -140, y: m };
    m = x.y + h + 90, n.push({
      id: c.id,
      label: c.name,
      x: x.x,
      y: x.y,
      w: dn + 30,
      h,
      kind: "external-system",
      symbol: "component",
      badge: "EXTERNAL",
      container: !0,
      fill: "#ffffff",
      stroke: "#64748b",
      dashed: !0,
      tooltip: `${c.name} — sistema externo: sus tablas legacy alimentan (o reciben) integradores`
    }), l.add(c.id), d.forEach((_, A) => {
      n.push({
        id: _.id,
        label: _.name,
        x: x.x,
        y: x.y - h / 2 + on + tt / 2 + A * (tt + rn),
        w: dn,
        h: tt,
        kind: "external-table",
        symbol: "readmodel",
        fill: "#fefce8",
        stroke: "#a16207",
        parentId: c.id,
        tooltip: `${_.name} — tabla legacy de ${c.name}`
      }), l.add(_.id);
    });
  }
  let y = 120;
  for (const c of e.apis ?? []) {
    if (!g.has(c.id)) continue;
    const d = t[c.id] ?? { x: 1e3, y };
    y = d.y + tt + 70, n.push({
      id: c.id,
      label: c.name,
      x: d.x,
      y: d.y,
      w: dn,
      h: tt,
      kind: "api",
      symbol: "interface",
      badge: "API",
      fill: "#eef2ff",
      stroke: "#4f46e5",
      tooltip: `${c.name} — API que un integrador consume o llama`
    }), l.add(c.id);
  }
  let I = 400;
  for (const c of f) {
    const d = c, h = t[d] ?? { x: 1e3, y: I };
    I = h.y + tt + 70, n.push({
      id: d,
      label: a.get(d) ?? d,
      x: h.x,
      y: h.y,
      w: dn,
      h: tt,
      kind: "domain-event",
      symbol: "event",
      badge: "EVENTO",
      fill: "#fff7ed",
      stroke: "#f59e0b",
      tooltip: "evento que un integrador consume o publica"
    }), l.add(d);
  }
  for (const c of o)
    for (const d of c.steps ?? []) {
      const h = d.externalTableId ?? d.apiId ?? d.eventId;
      if (!h || !l.has(h) || !l.has(d.id)) continue;
      const x = d.type.startsWith("SOURCE");
      i.push({
        id: `etl:${c.id}:${d.id}`,
        sourceId: x ? h : d.id,
        targetId: x ? d.id : h,
        kind: x ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: d.type === "SOURCE_PULL" ? "pull" : d.type === "SOURCE_CONSUMER" ? "consume" : d.type === "WRITE_API" ? "api" : d.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: x ? `${c.name} lee de aquí — Supr quita el paso` : `${c.name} escribe aquí — Supr quita el paso`
      });
    }
  return { nodes: n, edges: i };
}
async function ac(e, t) {
  const { default: n } = await import("./elk.bundled-94VUq91b.js").then((l) => l.e), i = new n(), s = {
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
  }, a = await i.layout(s), r = {};
  for (const l of a.children ?? [])
    r[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return r;
}
var sc = Object.defineProperty, rc = Object.getOwnPropertyDescriptor, Le = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? rc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && sc(t, n, o), o;
};
const dc = /* @__PURE__ */ new Set([
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
let Ee = class extends Ve {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._space = !1, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._selected = /* @__PURE__ */ new Set(), this._rubber = null, this._renaming = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onSpaceKey = (e) => {
      if (e.key !== " ") return;
      const t = e.target;
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) || (this._space = e.type === "keydown", this._space && e.preventDefault());
    }, this.onDown = (e) => {
      var a, r, l;
      if (e.button !== 0 && e.button !== 1) return;
      e.button === 1 && e.preventDefault(), this.focus();
      try {
        (a = this.setPointerCapture) == null || a.call(this, e.pointerId);
      } catch {
      }
      const t = e.composedPath()[0], n = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, ".chev3");
      if (n != null && n.dataset.nodeId) {
        this.emit("node-collapse-toggled", { id: n.dataset.nodeId });
        return;
      }
      const i = (l = t == null ? void 0 : t.closest) == null ? void 0 : l.call(t, ".h3");
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
      const o = e.shiftKey || this._space || e.button === 1, s = o ? null : this.plateAt(e);
      if (!s && !o && !e.altKey) {
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
        mode: s ? "node" : o ? "pan" : "orbit",
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
      var i, o;
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, n = e.clientY - this._drag.y;
      if (this._drag.mode === "connect" && this._connect) {
        const s = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - s.left, y2: e.clientY - s.top };
        const a = (i = this.shadowRoot) == null ? void 0 : i.elementFromPoint(e.clientX, e.clientY), r = (o = a == null ? void 0 : a.closest) == null ? void 0 : o.call(a, ".n3"), l = (r == null ? void 0 : r.dataset.nodeId) ?? null;
        this._hoverTargetId = l !== this._connect.sourceId ? l : null;
        return;
      }
      if (this._drag.mode === "rubber" && this._rubber) {
        Math.hypot(t, n) > 3 && (this._drag.moved = !0);
        const s = this.getBoundingClientRect();
        this._rubber = { ...this._rubber, x2: e.clientX - s.left, y2: e.clientY - s.top };
        return;
      }
      if (this._drag.mode === "node") {
        if (Math.hypot(t, n) > 3 && (this._drag.moved = !0), this._drag.moved && this._drag.nodeId) {
          const s = this.unproject(t, n);
          this._liveMove = { id: this._drag.nodeId, dx: s.x, dy: s.y };
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
            const i = this.getBoundingClientRect(), o = Math.min(n.x1, n.x2) + i.left, s = Math.max(n.x1, n.x2) + i.left, a = Math.min(n.y1, n.y2) + i.top, r = Math.max(n.y1, n.y2) + i.top, l = [];
            this.renderRoot.querySelectorAll(".n3").forEach((p) => {
              const g = p.getBoundingClientRect(), f = g.left + g.width / 2, m = g.top + g.height / 2, y = p.dataset.nodeId;
              y && f >= o && f <= s && m >= a && m <= r && l.push(y);
            }), this._selected = new Set(l);
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
      var i, o, s;
      const t = (i = this.shadowRoot) == null ? void 0 : i.elementFromPoint(e.clientX, e.clientY);
      if ((o = t == null ? void 0 : t.closest) != null && o.call(t, ".chev3")) return;
      const n = ((s = t == null ? void 0 : t.closest) == null ? void 0 : s.call(t, ".n3")) ?? this.plateAt(e);
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
    var i, o, s;
    const n = (i = this.shadowRoot) == null ? void 0 : i.elementFromPoint(e, t);
    return ((s = (o = n == null ? void 0 : n.closest) == null ? void 0 : o.call(n, ".n3")) == null ? void 0 : s.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const n = this.getBoundingClientRect(), i = n.width * 0.5, o = n.height * 0.42, s = new DOMMatrix();
    s.m34 = -1 / 1600;
    const a = new DOMMatrix().translate(i, o).multiply(s).translate(-i, -o).translate(n.width / 2, n.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), r = a.transformPoint(new DOMPoint(0, 0, 0, 1)), l = a.transformPoint(new DOMPoint(1, 0, 0, 0)), p = a.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - n.left, f = t - n.top, m = l.x - g * l.w, y = p.x - g * p.w, I = l.y - f * l.w, c = p.y - f * p.w, d = g * r.w - r.x, h = f * r.w - r.y, x = m * c - y * I;
    return x ? { x: (d * c - y * h) / x, y: (m * h - d * I) / x } : { ...this._center };
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
    const n = this.renderRoot.querySelector('[data-fx="start"]'), i = this.renderRoot.querySelector('[data-fx="end"]'), o = new Map(this.scene.nodes.map((Y) => [Y.id, Y])), s = new Map(this.scene.edges.map((Y) => [Y.id, Y])), a = this.depths(), r = 30, l = (Y) => (a.get(Y) ?? 0) * r + 8, p = (this.scene.journeyRuns ?? []).map(
      (Y) => Y.map((b) => s.get(b)).filter((b) => !!b).map((b) => ({ s: o.get(b.sourceId), tgt: o.get(b.targetId) })).filter((b) => !!b.s && !!b.tgt)
    ).filter((Y) => Y.length > 0);
    if (!p.length) {
      t.style.display = "none", n && (n.style.display = "none"), i && (i.style.display = "none");
      return;
    }
    const g = 170, f = 0.5, m = p.map((Y) => Y.map((b) => Math.hypot(b.tgt.x - b.s.x, b.tgt.y - b.s.y))), y = m.map((Y) => Math.max(1.2, Y.reduce((b, P) => b + P, 0) / g)), I = y.reduce((Y, b) => Y + b + f, 0);
    let c = e % I, d = 0;
    for (; c > y[d] + f; )
      c -= y[d] + f, d++;
    const h = p[d], x = (Y, b, P, $) => {
      Y && (Y.style.display = "block", Y.style.left = `${b.x}px`, Y.style.top = `${b.y}px`, Y.style.transform = `translateZ(${l(b.id)}px) scale(${P})`, Y.style.opacity = `${$}`);
    }, _ = 0.6;
    if (c < _ && h[0]) {
      const Y = c / _;
      x(n, h[0].s, 0.35 + Y * 1.15, 0.9 * (1 - Y));
    } else n && (n.style.display = "none");
    const A = c - y[d];
    if (A > 0 && A < 0.45 && h[h.length - 1]) {
      const Y = A / 0.45;
      x(i, h[h.length - 1].tgt, 1.5 - Y * 1.15, 0.15 + Y * 0.75);
    } else i && (i.style.display = "none");
    if (c > y[d]) {
      t.style.display = "none";
      return;
    }
    const L = m[d].reduce((Y, b) => Y + b, 0) || 1;
    let O = c / y[d] * L, R = 0;
    for (; R < h.length - 1 && O > m[d][R]; )
      O -= m[d][R], R++;
    const W = h[R], v = Math.min(1, O / (m[d][R] || 1)), B = W.s.x + (W.tgt.x - W.s.x) * v, K = W.s.y + (W.tgt.y - W.s.y) * v, de = l(W.s.id) + (l(W.tgt.id) - l(W.s.id)) * v;
    t.style.display = "block", t.style.left = `${B}px`, t.style.top = `${K}px`, t.style.transform = `translateZ(${de}px)`;
  }
  /**
   * The virtual endpoint for a note thread that targets a RELATION: a node-shaped point
   * at the host edge's midpoint, lifted to the average of its endpoints' storeys.
   */
  edgeAnchorOf(e, t) {
    if (!e.targetId.startsWith("edgeanchor:")) return null;
    const n = this.scene.edges.find((r) => r.id === e.targetId.slice(11)), i = n ? t.get(n.sourceId) : void 0, o = n ? t.get(n.targetId) : void 0;
    if (!i || !o) return null;
    const s = this.depths(), a = ((s.get(i.id) ?? 0) + (s.get(o.id) ?? 0)) / 2 * 30 + 2;
    return {
      id: "",
      label: "",
      kind: "edge-anchor",
      x: (i.x + o.x) / 2,
      y: (i.y + o.y) / 2,
      w: 0,
      h: 0,
      z: a
    };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((i) => [i.id, i])), t = /* @__PURE__ */ new Map(), n = (i) => {
      const o = t.get(i.id);
      if (o !== void 0) return o;
      const s = i.ownerId ?? i.parentId, a = s ? e.get(s) : void 0, r = a ? n(a) + 1 : 0;
      return t.set(i.id, r), r;
    };
    for (const i of this.scene.nodes) n(i);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return M`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), n = new Map(e.map((d) => [d.id, d])), i = Math.min(...e.map((d) => d.x - d.w / 2)) - 60, o = Math.max(...e.map((d) => d.x + d.w / 2)) + 60, s = Math.min(...e.map((d) => d.y - d.h / 2)) - 60, a = Math.max(...e.map((d) => d.y + d.h / 2)) + 60, r = (i + o) / 2, l = (s + a) / 2, p = this.getBoundingClientRect(), g = p.width ? Math.min(p.width / (o - i), p.height / (a - s), 1) * 0.9 : 0.5, f = this._k * g;
    this._kUsed = f, this._center = { x: r, y: l };
    const m = 30, y = this._liveMove, I = (d) => d.x + ((y == null ? void 0 : y.id) === d.id ? y.dx : 0), c = (d) => d.y + ((y == null ? void 0 : y.id) === d.id ? y.dy : 0);
    return M`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${f}, ${f}, ${f}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-r}px, ${-l}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${i}px; top: ${s}px"
            width=${o - i}
            height=${a - s}
            viewBox="${i} ${s} ${o - i} ${a - s}"
          >
            ${this.scene.edges.map((d) => {
      const h = n.get(d.sourceId), x = n.get(d.targetId) ?? this.edgeAnchorOf(d, n);
      return !h || !x ? "" : ee`<line
                x1=${I(h)} y1=${c(h)} x2=${I(x)} y2=${c(x)}
                stroke="#000000" stroke-width="2" opacity=${d.dim ? 0.05 : 0.22} />`;
    })}
          </svg>
          ${this.scene.edges.map((d) => {
      const h = n.get(d.sourceId), x = n.get(d.targetId) ?? this.edgeAnchorOf(d, n);
      if (!h || !x) return "";
      const _ = (t.get(h.id) ?? 0) * m + 2, A = x.id ? (t.get(x.id) ?? 0) * m + 2 : x.z, L = I(x) - I(h), O = c(x) - c(h), R = A - _, W = Math.hypot(L, O), v = Math.hypot(W, R), B = Math.atan2(O, L) * 180 / Math.PI, K = Math.atan2(R, W) * 180 / Math.PI, de = d.color ?? "#64748b", Y = d.dashed ? `repeating-linear-gradient(90deg, ${de} 0 6px, transparent 6px 10px)` : de, b = d.kind === "journey";
      return M`<div
              class="edge3 ${b ? "journey3" : ""}"
              style="
                left: ${I(h)}px; top: ${c(h)}px; width: ${v}px; height: ${b ? 3 : 1.7}px;
                transform: translateZ(${_}px) rotateZ(${B}deg) rotateY(${-K}deg);
                background: ${b ? "repeating-linear-gradient(90deg, #d97706 0 9px, transparent 9px 16px)" : Y};
                opacity: ${d.dim ? 0.12 : 0.9};
              "
            ></div>
            ${b && d.label ? M`<div
                  class="journey-badge3"
                  style="
                    left: ${(I(h) + I(x)) / 2}px; top: ${(c(h) + c(x)) / 2}px;
                    transform: translate(-50%, -50%) translateZ(${(_ + A) / 2 + 6}px);
                  "
                  title=${d.tooltip ?? ""}
                >${d.label}</div>` : ""}`;
    })}
          ${(this.scene.journeyRuns ?? []).length ? M`<div class="journey-runner3" style="display: none"></div>
                <div class="journey-fx3" data-fx="start" style="display: none"></div>
                <div class="journey-fx3" data-fx="end" style="display: none"></div>` : ""}
          ${e.map((d) => {
      if (d.kind === "area")
        return M`<div
                class="area3"
                title=${d.tooltip ?? ""}
                style="left: ${I(d) - d.w / 2}px; top: ${c(d) - d.h / 2}px;
                       width: ${d.w}px; height: ${d.h}px; opacity: ${d.dim ? 0.25 : 1};"
              ></div>`;
      const h = t.get(d.id) ?? 0, x = d.container || h === 0, _ = this._hoverTargetId === d.id;
      return M`
              <div
                class="n3 ${d.container ? "container3" : ""} ${this.selectedId === d.id || this._selected.has(d.id) ? "selected3" : ""} ${_ ? "hover3" : ""}"
                data-node-id=${d.id}
                data-kind=${d.kind}
                title=${d.tooltip ?? d.label}
                style="
                  opacity: ${d.dim ? 0.25 : 1};
                  left: ${I(d) - d.w / 2}px; top: ${c(d) - d.h / 2}px;
                  width: ${d.w}px; height: ${d.h}px;
                  transform: translateZ(${h * m + (_ ? 8 : 0)}px)${_ ? " scale(1.06)" : ""};
                  background: ${d.container ? "color-mix(in srgb, " + (d.fill ?? "#ffffff") + " 82%, transparent)" : d.fill ?? "#ffffff"};
                  border-color: ${d.stroke ?? "#64748b"};
                  border-style: ${d.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${x ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${d.badge ? M`<span class="badge3" style="color: ${d.stroke ?? "#94a3b8"}">${d.badge}</span>` : ""}
                <span>${d.label}</span>
                ${d.collapsible ? M`<span
                      class="chev3"
                      data-node-id=${d.id}
                      title=${d.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}
                      >${d.collapsed ? "▸" : "▾"}</span>` : ""}
              </div>
            `;
    })}
          ${(() => {
      const d = this.connectable && this.selectedId ? n.get(this.selectedId) : void 0;
      if (!d || !dc.has(d.kind)) return "";
      const h = (t.get(d.id) ?? 0) * m + 4;
      return [
        [I(d) + d.w / 2, c(d)],
        [I(d) - d.w / 2, c(d)],
        [I(d), c(d) + d.h / 2],
        [I(d), c(d) - d.h / 2]
      ].map(
        ([_, A]) => M`<div
                class="h3"
                data-source-id=${d.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${_}px; top: ${A}px; transform: translateZ(${h}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? M`<svg class="rubber">
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
      ${this._rubber ? M`<div
            class="lasso"
            style="left: ${Math.min(this._rubber.x1, this._rubber.x2)}px; top: ${Math.min(
      this._rubber.y1,
      this._rubber.y2
    )}px; width: ${Math.abs(this._rubber.x2 - this._rubber.x1)}px; height: ${Math.abs(
      this._rubber.y2 - this._rubber.y1
    )}px"
          ></div>` : ""}
      ${this._renaming ? (() => {
      const d = this.renderRoot.querySelector(
        `.n3[data-node-id="${this._renaming.id}"]`
      ), h = this.getBoundingClientRect(), x = d == null ? void 0 : d.getBoundingClientRect(), _ = x ? x.left + x.width / 2 - h.left : h.width / 2, A = x ? x.bottom - h.top + 6 : h.height / 2;
      return M`<input
              class="rename3"
              style="left: ${_}px; top: ${A}px"
              .value=${this._renaming.value}
              @pointerdown=${(L) => L.stopPropagation()}
              @input=${(L) => this._renaming = { ...this._renaming, value: L.target.value }}
              @keydown=${(L) => {
        if (L.stopPropagation(), L.key === "Escape" && (this._renaming = null), L.key === "Enter") {
          const O = this._renaming, R = O.value.trim();
          this._renaming = null;
          const W = this.scene.nodes.find((v) => v.id === O.id);
          R && W && R !== W.label && this.emit("node-renamed", { id: O.id, kind: O.kind, name: R });
        }
      }}
              @blur=${() => this._renaming = null}
            />`;
    })() : ""}
      <div class="hud">
        click selecciona · ▸ despliega el nodo · arrastra el fondo: selección múltiple · alt+arrastra orbita ·
        doble click abre · arrastra una placa para moverla · shift, espacio o botón central+arrastra panea ·
        rueda para zoom · Supr borra · F2 renombra · doble click en el fondo resetea
      </div>
    `;
  }
};
Ee.styles = bt`
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
    .journey-fx3 {
      position: absolute;
      width: 34px;
      height: 34px;
      margin: -17px 0 0 -17px;
      border-radius: 50%;
      border: 2.5px solid #d97706;
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
    /* The chevron folds/unfolds the plate — same sheet the canvas edits. */
    .chev3 {
      position: absolute;
      top: 1px;
      right: 4px;
      font-size: 11px;
      line-height: 1;
      padding: 3px 4px;
      color: #475569;
      cursor: pointer;
      user-select: none;
    }
    .chev3:hover {
      color: #0f172a;
    }
    /* An area: pure graphics — a dashed pane lying on the floor, untouchable. */
    .area3 {
      position: absolute;
      box-sizing: border-box;
      border: 1.6px dashed #94a3b8;
      border-radius: 10px;
      background: rgba(148, 163, 184, 0.14);
      transform: translateZ(0.6px);
      pointer-events: none;
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
  re({ attribute: !1 })
], Ee.prototype, "scene", 2);
Le([
  re({ attribute: !1 })
], Ee.prototype, "selectedId", 2);
Le([
  re({ attribute: !1 })
], Ee.prototype, "connectable", 2);
Le([
  q()
], Ee.prototype, "_rx", 2);
Le([
  q()
], Ee.prototype, "_rz", 2);
Le([
  q()
], Ee.prototype, "_k", 2);
Le([
  q()
], Ee.prototype, "_pan", 2);
Le([
  q()
], Ee.prototype, "_liveMove", 2);
Le([
  q()
], Ee.prototype, "_connect", 2);
Le([
  q()
], Ee.prototype, "_hoverTargetId", 2);
Le([
  q()
], Ee.prototype, "_selected", 2);
Le([
  q()
], Ee.prototype, "_rubber", 2);
Le([
  q()
], Ee.prototype, "_renaming", 2);
Ee = Le([
  It("modux-tilt")
], Ee);
var lc = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, ve = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? cc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && lc(t, n, o), o;
};
const Yi = [
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
let pe = class extends Ve {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmpId = null, this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._dragWizKey = null, this._overCmpId = null, this._overCmpPos = "into", this._foreignOver = !1, this._activeTabs = {};
  }
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /** The mock control a field renders as — inferred from stereotype, then type. */
  control(e) {
    const t = e.stereotype ?? "";
    return ["textarea", "richText", "html", "markdown"].includes(t) ? M`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? M`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? M`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? M`<div class="control">••••••••</div>` : t === "email" ? M`<div class="control">nombre@dominio.com</div>` : t === "money" ? M`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? M`<div class="control">──────●──</div>` : t === "stars" ? M`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? M`<div class="control area">🖼</div>` : t === "link" ? M`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? M`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? M`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? M`<div class="control" style="justify-content:flex-end">0</div>` : M`<div class="control">Texto…</div>`;
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
      for (const s of o ?? [])
        s.id === e && (t = s), n(s.children);
    };
    return n((i = this.page) == null ? void 0 : i.content), t;
  }
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var i;
    let t = null;
    const n = (o, s) => {
      for (const a of o ?? [])
        a.id === e && (t = s), n(a.children, a);
    };
    return n((i = this.page) == null ? void 0 : i.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var s;
    let n = !1;
    const i = (a) => {
      a.id === e && (n = !0);
      for (const r of a.children ?? []) i(r);
    }, o = (a) => {
      for (const r of a ?? [])
        r.id === t ? i(r) : o(r.children);
    };
    return o((s = this.page) == null ? void 0 : s.content), n;
  }
  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  nextSiblingOf(e) {
    var o;
    const t = this.parentOf(e), n = t ? t.children ?? [] : ((o = this.page) == null ? void 0 : o.content) ?? [], i = n.findIndex((s) => s.id === e);
    return i >= 0 ? n[i + 1] ?? null : null;
  }
  /** Sibling slot vs inside, from where the pointer is over the node's box. */
  dropPosFor(e, t) {
    if (e.kind === "tab") return "into";
    const n = t.currentTarget.getBoundingClientRect(), i = (t.clientY - n.top) / Math.max(1, n.height);
    return pe.LEAF_KINDS.has(e.kind) ? i < 0.5 ? "before" : "after" : i < 0.2 ? "before" : i > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var o;
    if (t === "into" && e.kind === "tabLayout") {
      const s = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((s == null ? void 0 : s.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const a = (e.children ?? []).filter((l) => l.kind === "tab"), r = a.find((l) => l.id === this._activeTabs[e.id]) ?? a[0];
      r && (e = r);
    }
    if (t === "into" && !pe.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const n = this.parentOf(e.id), i = t === "after" ? ((o = this.nextSiblingOf(e.id)) == null ? void 0 : o.id) ?? null : e.id;
    return { toParentId: (n == null ? void 0 : n.id) ?? null, beforeComponentId: i };
  }
  onCmpDrop(e, t, n) {
    var s, a;
    const i = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !i) {
      const r = (s = n == null ? void 0 : n.dataTransfer) == null ? void 0 : s.getData("application/x-modux-cmp");
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
    if (i === e.id || this.isWithin(e.id, i)) return;
    const o = this.slotFor(e, t);
    o.beforeComponentId !== i && this.emitEvent("component-moved", { componentId: i, ...o });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var l, p, g;
    const t = e.children ?? [], n = (f) => f.map((m) => this.renderComponent(m)), i = M`<div class="placeholder">suelta componentes aquí</div>`;
    let o;
    switch (e.kind) {
      case "horizontalLayout":
        o = M`<div class="row-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "splitLayout": {
        const f = t.slice(0, Math.ceil(t.length / 2)), m = t.slice(Math.ceil(t.length / 2));
        o = M`<div class="row-lay">
          <div class="col-lay">${f.length ? n(f) : i}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${m.length ? n(m) : i}</div>
        </div>`;
        break;
      }
      case "formLayout":
        o = M`<div class="grid-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        o = M`<div class="grid3-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "tabLayout": {
        const f = t.filter((y) => y.kind === "tab"), m = f.find((y) => y.id === this._activeTabs[e.id]) ?? f[0];
        o = M`
          <div class="tabbar">
            ${f.map(
          (y, I) => M`<span
                class=${y === m ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(c) => {
            c.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: y.id }, this.emitEvent("component-selected", { componentId: y.id });
          }}
                @dblclick=${(c) => {
            c.stopPropagation(), this._cmp = { ...y };
          }}
                @dragstart=${(c) => {
            var d, h;
            c.stopPropagation(), this._dragCmpId = y.id, (h = c.dataTransfer) == null || h.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (d = this.page) == null ? void 0 : d.id, componentId: y.id })
            );
          }}
                @dragover=${(c) => {
            var d;
            ((d = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : d.kind) === "tab" && (c.preventDefault(), c.stopPropagation());
          }}
                @drop=${(c) => {
            var A, L;
            const d = this._dragCmpId;
            if (!d || d === y.id || ((A = this.nodeById(d)) == null ? void 0 : A.kind) !== "tab") return;
            c.preventDefault(), c.stopPropagation();
            const h = c.currentTarget.getBoundingClientRect(), _ = c.clientX - h.left < h.width / 2 ? y.id : ((L = f[I + 1]) == null ? void 0 : L.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, _ !== d && this.emitEvent("component-moved", {
              componentId: d,
              toParentId: e.id,
              beforeComponentId: _
            });
          }}
                >${y.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${m ? this.renderComponent(m) : i}`;
        break;
      }
      case "tab":
        o = M`<div class="col-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "accordionLayout":
        o = M`<div class="col-lay">
          ${t.length ? t.map(
          (f, m) => M`
                  <div class="acc-bar"><span>${f.title ?? f.label ?? "Sección"}</span><span>${m === 0 ? "▾" : "▸"}</span></div>
                  ${m === 0 ? this.renderComponent(f) : se}
                `
        ) : i}
        </div>`;
        break;
      case "card":
        o = M`<div class="card-box">
          ${e.title ? M`<div class="card-title">${e.title}</div>` : se}
          <div class="col-lay">${t.length ? n(t) : i}</div>
        </div>`;
        break;
      case "boardLayout":
        o = M`<div class="grid3-lay">
          ${t.length ? t.map((f) => M`<div class="board-col">${this.renderComponent(f)}</div>`) : i}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [f, ...m] = t;
        o = M`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${f ? this.renderComponent(f) : M`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${m.length ? n(m) : M`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        o = M`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "carouselLayout":
        o = M`<div class="row-lay">${t.length ? n(t) : i}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        o = M`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? n(t) : i}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const m = e.modelId && e.modelId === ((l = this.page) == null ? void 0 : l.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        o = m.length ? M`<div class="grid-lay">
              ${m.slice(0, 6).map(
          (y) => M`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${y.label ?? y.name}</label>${this.control(y)}</div>`
        )}
            </div>` : M`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const f = (((g = this.page) == null ? void 0 : g.viewmodelFields) ?? []).slice(0, 4);
        o = M`<table>
            <tr>${f.length ? f.map((m) => M`<th>${m.label ?? m.name}</th>`) : M`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => M`<tr>${(f.length ? f : [1, 2, 3]).map(() => M`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? se : M`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        o = M`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const f = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        o = M`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(f)}`;
        break;
      }
      case "text":
        o = M`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        o = M`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        o = M`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        o = M`<div class="col-lay">${t.length ? n(t) : i}</div>`;
    }
    const s = pe.LEAF_KINDS.has(e.kind), a = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), r = (f) => {
      var m, y;
      f.stopPropagation(), this._dragCmpId = e.id, (y = f.dataTransfer) == null || y.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (m = this.page) == null ? void 0 : m.id, componentId: e.id })
      ), f.dataTransfer && (f.dataTransfer.effectAllowed = "move");
    };
    return M`<div
      class="cmp ${s ? "leafcmp" : ""} ${a ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(f) => {
      f.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(f) => {
      f.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${r}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(f) => {
      var y;
      f.preventDefault(), f.stopPropagation();
      const m = ((y = f.dataTransfer) == null ? void 0 : y.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...m].includes("application/x-modux-cmp") || [...m].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, f) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(f) => {
      var m, y, I;
      this._foreignOver = !1, !(!this._dragCmpId && !((I = (y = (m = f.dataTransfer) == null ? void 0 : m.types) == null ? void 0 : y.includes) != null && I.call(y, "application/x-modux-cmp"))) && (f.preventDefault(), f.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, f));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${r}
        >${pe.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${o}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, n) {
    return M`
        ${n ? M`<table>
              <tr>${t.slice(0, 4).map((i) => M`<th>${i.label ?? i.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => M`<tr>${t.slice(0, 4).map(() => M`<td>···</td>`)}</tr>`)}
            </table>` : se}
        ${t.length ? M`<div class="grid">
              ${t.map(
      (i) => M`
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
            </div>` : M`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    var o, s, a, r;
    const e = this._cmp;
    if (!e) return se;
    const t = (l) => this._cmp = { ...this._cmp, ...l }, n = e.kind, i = [
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
    return M`<div class="pop" @click=${(l) => l.stopPropagation()}>
      ${i ? M`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(l) => t({ title: l.target.value })} />` : se}
      ${n === "text" ? M`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(l) => t({ text: l.target.value })} />` : se}
      ${n === "button" || n === "field" ? M`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(l) => t({ label: l.target.value })} />` : se}
      ${n === "button" ? M`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? M`<span class="chip">${((o = this.useCases.find((l) => l.id === e.useCaseId)) == null ? void 0 : o.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : M`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? M`<span class="chip"
                      >${((s = this.mappings.find((l) => l.id === e.mappingId)) == null ? void 0 : s.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : M`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : se}
      ${n === "form" ? M`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? M`<span class="chip"
                      >${((a = this.models.find((l) => l.id === e.modelId)) == null ? void 0 : a.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : M`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : se}
      ${n === "listing" ? M`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? M`<span class="chip"
                      >${((r = this.queryOps.find((l) => l.id === e.queryOperationId)) == null ? void 0 : r.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : M`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>` : se}
      ${n === "field" ? M`<label>Estereotipo</label>
            <select @change=${(l) => t({ stereotype: l.target.value || void 0 })}>
              ${Yi.map((l) => M`<option value=${l} ?selected=${l === (e.stereotype ?? "regular")}>${l}</option>`)}
            </select>` : se}
      ${n === "tabLayout" ? M`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : se}
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
    const n = (this.page.viewmodelFields ?? []).map((s) => s.fieldId), i = n.indexOf(t), o = n.indexOf(e);
    i < 0 || o < 0 || (n.splice(o, 0, ...n.splice(i, 1)), this.emitEvent("fields-reordered", { fieldIds: n }));
  }
  render() {
    const e = this.page;
    if (!e) return se;
    const t = e.viewmodelFields ?? [], n = e.type === "CRUD" || !!e.listingQueryServiceId, i = e.type === "WIZARD";
    return M`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? M`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(o) => this._rename = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRename(), o.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : M`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        ${this._route !== null ? M`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(o) => this._route = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRoute(), o.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : M`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
              >${e.route ?? "/…"}</span
            >`}
        <button class="close" @click=${() => this.emitEvent("designer-closed")} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="zone zhdr" title="Cabecera de la página: título y descripción se infieren de la declaración">
        ⌐ ${e.name}
      </div>
      <div class="toolbar" data-bar="toolbar" title="Toolbar: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => (o.bar ?? "toolbar") === "toolbar").map(
      (o) => M`<span
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
        ${(e.buttons ?? []).some((o) => (o.bar ?? "toolbar") === "toolbar") ? se : M`<span class="zoneph">suelta un caso de uso aquí</span>`}
      </div>
      <div class="vm">
        viewmodel:
        ${e.modelId ? M`<span class="chip"
                >${e.modelName ?? e.modelId}
                <span
                  class="chipx"
                  title="Quitar el viewmodel"
                  @click=${() => this.emitEvent("page-model-changed", { modelId: null })}
                  >✕</span
                ></span
              >` : M`<span class="vmhint"
              >arrastra un modelo del Catálogo hasta el frame — o el asa violeta de la página, en la vista UI</span
            >`}
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${i ? M`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((o, s) => {
      const a = (e.wizardSteps ?? []).map((l, p) => l.id ?? l.pageId ?? String(p)), r = a[s];
      return M`<span
                      class=${s === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${s + 1}${o.pageId ? "" : " (sin página)"} — arrastra para reordenar"
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
        const g = l.currentTarget.getBoundingClientRect(), m = l.clientX - g.left < g.width / 2 ? r : a[s + 1] ?? null;
        m !== p && this.emitEvent("wizard-step-moved", { stepKey: p, beforeStepKey: m });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[s] ?? `${s + 1}.`} ${o.label ?? "Paso"}${o.pageId ? "" : " ⌁"}</span
                    >`;
    }) : M`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : se}
        ${(e.content ?? []).length ? M`<div class="col-lay">${(e.content ?? []).map((o) => this.renderComponent(o))}</div>` : this.renderInferredBody(e, t, n)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => o.bar === "bottom").map(
      (o) => M`<span
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
        ${(e.buttons ?? []).some((o) => o.bar === "bottom") ? se : M`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var s, a, r;
      const o = (((s = this.page) == null ? void 0 : s.buttons) ?? []).some((l) => l.useCaseId === this._btn.useCaseId);
      return M`<div class="pop">
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
                ${this._btn.mappingId ? M`<span class="chip"
                        >${((r = this.mappings.find((l) => l.id === this._btn.mappingId)) == null ? void 0 : r.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : M`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${o ? M`<button
                      @click=${() => {
        const l = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: l });
      }}
                    >
                      Quitar
                    </button>` : se}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(o)}>Aplicar</button>
              </div>
            </div>`;
    })() : se}
      ${this._editing ? M`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(o) => this._editing = { ...this._editing, stereotype: o.target.value }}
            >
              ${Yi.map(
      (o) => M`<option value=${o} ?selected=${o === this._editing.stereotype}>${o}</option>`
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
pe.styles = bt`
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
pe.KIND_LABELS = {
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
pe.LEAF_KINDS = /* @__PURE__ */ new Set([
  "form",
  "listing",
  "button",
  "field",
  "text",
  "metricCard",
  "menuBar"
]);
ve([
  re({ attribute: !1 })
], pe.prototype, "page", 2);
ve([
  re({ type: Boolean, reflect: !0 })
], pe.prototype, "framed", 2);
ve([
  re({ attribute: !1 })
], pe.prototype, "models", 2);
ve([
  re({ attribute: !1 })
], pe.prototype, "mappings", 2);
ve([
  re({ attribute: !1 })
], pe.prototype, "useCases", 2);
ve([
  re({ attribute: !1 })
], pe.prototype, "queryOps", 2);
ve([
  re({ attribute: !1 })
], pe.prototype, "selectedCmpId", 2);
ve([
  q()
], pe.prototype, "_editing", 2);
ve([
  q()
], pe.prototype, "_dragId", 2);
ve([
  q()
], pe.prototype, "_overId", 2);
ve([
  q()
], pe.prototype, "_rename", 2);
ve([
  q()
], pe.prototype, "_route", 2);
ve([
  q()
], pe.prototype, "_btn", 2);
ve([
  q()
], pe.prototype, "_cmp", 2);
ve([
  q()
], pe.prototype, "_dragCmpId", 2);
ve([
  q()
], pe.prototype, "_dragWizKey", 2);
ve([
  q()
], pe.prototype, "_overCmpId", 2);
ve([
  q()
], pe.prototype, "_overCmpPos", 2);
ve([
  q()
], pe.prototype, "_foreignOver", 2);
ve([
  q()
], pe.prototype, "_activeTabs", 2);
pe = ve([
  It("modux-page-designer")
], pe);
var pc = Object.defineProperty, uc = Object.getOwnPropertyDescriptor, De = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? uc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && pc(t, n, o), o;
};
const Lo = 460, mc = 540, fc = 660;
let Ae = class extends Ve {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), n = t.find((o) => {
        var s;
        return (s = o.classList) == null ? void 0 : s.contains("frame-grip");
      });
      if (n) {
        const s = n.closest(".frame").dataset.pageId, a = this.sizeOf(s);
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "resize", id: s, x: e.clientX, y: e.clientY, w0: a.w, h0: a.h }, e.preventDefault();
        return;
      }
      const i = t.find((o) => {
        var s;
        return (s = o.classList) == null ? void 0 : s.contains("frame-title");
      });
      if (i) {
        const s = i.closest(".frame").dataset.pageId;
        if (e.shiftKey) {
          this.emit("element-multi-toggled", { id: s }), e.preventDefault();
          return;
        }
        const a = this.pages.findIndex((l) => l.id === s), r = this.posOf(s, a);
        this.emit("element-selected", { elementType: "node", id: s, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: s, x: e.clientX, y: e.clientY, ox: r.x, oy: r.y, moved: !1 }, e.preventDefault();
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
      const t = this.getBoundingClientRect(), n = e.clientX - t.left, i = e.clientY - t.top, o = e.deltaY < 0 ? 1.1 : 1 / 1.1, s = Math.max(0.2, Math.min(2.5, this._t.k * o));
      this._t = {
        k: s,
        x: n - (n - this._t.x) / this._t.k * s,
        y: i - (i - this._t.y) / this._t.k * s
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
    var g, f, m, y, I, c;
    const n = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), i = (f = n == null ? void 0 : n.closest) == null ? void 0 : f.call(n, ".frame");
    if (!i) return null;
    const o = i.dataset.pageId, s = i.querySelector("modux-page-designer"), a = (m = s == null ? void 0 : s.shadowRoot) == null ? void 0 : m.elementFromPoint(e, t), r = (y = a == null ? void 0 : a.closest) == null ? void 0 : y.call(a, "[data-btn-uc]");
    if (r != null && r.dataset.btnUc) return `btn:${o}:${r.dataset.btnUc}`;
    const l = (I = a == null ? void 0 : a.closest) == null ? void 0 : I.call(a, "[data-bar]");
    if (l != null && l.dataset.bar) return `bar:${o}:${l.dataset.bar}`;
    const p = (c = a == null ? void 0 : a.closest) == null ? void 0 : c.call(a, "[data-cmp-id]");
    return p ? `cmp:${o}:${p.dataset.cmpId}` : o;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var m, y, I, c;
    const n = (m = this.shadowRoot) == null ? void 0 : m.elementFromPoint(e, t), i = (y = n == null ? void 0 : n.closest) == null ? void 0 : y.call(n, ".frame");
    if (!i) return null;
    const o = i.dataset.pageId, s = i.querySelector("modux-page-designer"), a = (I = s == null ? void 0 : s.shadowRoot) == null ? void 0 : I.elementFromPoint(e, t), r = (c = a == null ? void 0 : a.closest) == null ? void 0 : c.call(a, "[data-cmp-id]");
    if (!r) return { pageId: o, componentId: null, pos: "into" };
    const l = r.dataset.cmpKind ?? "", p = r.getBoundingClientRect(), g = (t - p.top) / Math.max(1, p.height), f = pe.LEAF_KINDS.has(l) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: o, componentId: r.dataset.cmpId, pos: f };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: Lo, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var n;
    return ((n = this._live) == null ? void 0 : n.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * mc, y: Math.floor(t / 3) * fc };
  }
  render() {
    return M`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var o, s;
      const n = ((o = this._live) == null ? void 0 : o.id) === e.id ? this._live : this.posOf(e.id, t), i = this.sizeOf(e.id);
      return M`
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
                .selectedCmpId=${((s = this.selectedCmp) == null ? void 0 : s.pageId) === e.id ? this.selectedCmp.componentId : null}
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
      ${this.pages.length ? "" : M`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · la esquina redimensiona · fondo panea · rueda zoom · click selecciona · doble click configura · arrastra nodos entre frames · Ctrl+C/V copia y pega · Supr borra
      </div>
    `;
  }
};
Ae.styles = bt`
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
      width: ${Lo}px;
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
  re({ attribute: !1 })
], Ae.prototype, "pages", 2);
De([
  re({ attribute: !1 })
], Ae.prototype, "layout", 2);
De([
  re({ attribute: !1 })
], Ae.prototype, "sizes", 2);
De([
  re({ attribute: !1 })
], Ae.prototype, "selectedId", 2);
De([
  re({ attribute: !1 })
], Ae.prototype, "selectedIds", 2);
De([
  re({ attribute: !1 })
], Ae.prototype, "models", 2);
De([
  re({ attribute: !1 })
], Ae.prototype, "mappings", 2);
De([
  re({ attribute: !1 })
], Ae.prototype, "useCases", 2);
De([
  re({ attribute: !1 })
], Ae.prototype, "queryOps", 2);
De([
  re({ attribute: !1 })
], Ae.prototype, "selectedCmp", 2);
De([
  q()
], Ae.prototype, "_t", 2);
De([
  q()
], Ae.prototype, "_live", 2);
De([
  q()
], Ae.prototype, "_liveSize", 2);
Ae = De([
  It("modux-figma")
], Ae);
var hc = Object.defineProperty, gc = Object.getOwnPropertyDescriptor, Me = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? gc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && hc(t, n, o), o;
};
const yc = {
  root: "#334155",
  boundedContext: "#0369a1",
  group: "#6366f1",
  note: "#ca8a04",
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
}, Dn = {
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
}, bc = {
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
}, Ki = [30, 20, 13, 9.5, 7.5], Xi = [0, 180, 118, 80, 58], Ic = 0.055, vc = 0.86, xc = 2600, ln = 240, Ji = 0.16, Qi = 0.015;
let he = class extends Ve {
  constructor() {
    super(...arguments), this.shifted = !1, this.scene = null, this.journey = null, this.model = {
      boundedContexts: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.raf = 0, this.t = 0, this.cam = { x: 0, y: 0, k: 1 }, this.hoverAt = 0, this.panning = !1, this.downAt = { x: 0, y: 0 }, this.moved = !1, this.reducedMotion = !1, this.prevByKey = /* @__PURE__ */ new Map(), this.related = /* @__PURE__ */ new Map(), this.areaHulls = /* @__PURE__ */ new Map(), this.lastClickAt = 0, this.allNodes = [], this._q = "", this._sugs = [], this._active = 0, this._motion = 1, this._threads = !1, this._viewNaming = !1, this._viewName = "", this._space = !1, this.selected = /* @__PURE__ */ new Set(), this._levels = 1, this.manualLevels = /* @__PURE__ */ new Map(), this.sceneKey = "", this.renaming = null, this.onSpaceKey = (e) => {
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
    }, this.frame = 0, this.runnerState = null, this.runnerLastClock = 0, this.runnerFx = [];
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
    for (const f of e)
      t = Math.min(t, f.x), n = Math.min(n, f.y), i = Math.max(i, f.x), o = Math.max(o, f.y);
    const s = 70, a = this.clientWidth || 800, r = this.clientHeight || 600, l = i - t + s * 2, p = o - n + s * 2, g = Math.min(1.5, Math.max(0.25, Math.min(a / l, r / p)));
    this.cam.k = g, this.cam.x = a / 2 - (t + i) / 2 * g, this.cam.y = r / 2 - (n + o) / 2 * g;
  }
  /** Tree depth the scene reaches (root = 0, top nodes = 1, their children = 2…). */
  sceneDepth() {
    if (!this.scene) return 1;
    const e = new Map(this.scene.nodes.map((n) => [n.id, n]));
    let t = 1;
    for (const n of this.scene.nodes) {
      let i = 1;
      for (let o = n.ownerId ?? n.parentId; o; ) {
        i++;
        const s = e.get(o);
        o = s ? s.ownerId ?? s.parentId : void 0;
      }
      t = Math.max(t, i);
    }
    return t;
  }
  updated(e) {
    var t;
    (e.has("model") || e.has("scene")) && this.buildTree(), e.has("sceneKey") && e.get("sceneKey") !== void 0 && this.applyLevels(this.manualLevels.get(this.sceneKey) ?? Math.min(this.sceneDepth(), 3)), e.has("renaming") && this.renaming && ((t = this.renderRoot.querySelector(".rename")) == null || t.select());
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
    const s = `${(o == null ? void 0 : o.key) ?? ""}/${e}:${t}`, a = this.prevByKey.get(s), r = () => (Math.random() - 0.5) * 10;
    return {
      key: s,
      refId: t,
      kind: e,
      label: n,
      color: yc[e] ?? "#64748b",
      depth: i,
      parent: o,
      expanded: (a == null ? void 0 : a.expanded) ?? !1,
      x: (a == null ? void 0 : a.x) ?? (o ? o.x + r() : 0),
      y: (a == null ? void 0 : a.y) ?? (o ? o.y + r() : 0),
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
    const t = this.model, n = e.depth + 1, i = (o, s, a) => this.makeNode(o, s, a, n, e);
    if (this.scene)
      return this.scene.nodes.filter((o) => o.kind !== "area").filter((o) => e.kind === "root" ? !(o.ownerId ?? o.parentId) : (o.ownerId ?? o.parentId) === e.refId).map((o) => {
        const s = i(o.kind || "node", o.id, o.label);
        return o.stroke && (s.color = o.stroke), s;
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
        const s = (t.aggregates ?? []).filter((p) => p.boundedContextId === e.refId), a = o.useCases ?? [], r = new Set(s.map((p) => p.id)), l = new Set(
          (t.emissions ?? []).filter((p) => r.has(p.sourceId)).map((p) => p.domainEventId)
        );
        return [
          ...s.length ? [i("group", `aggregates:${e.refId}`, `Agregados · ${s.length}`)] : [],
          ...a.length ? [i("group", `use-cases:${e.refId}`, `Casos de uso · ${a.length}`)] : [],
          ...(o.domainEvents ?? []).filter((p) => !l.has(p.id)).map((p) => i("domain-event", p.id, p.name)),
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
        const o = e.refId.indexOf(":"), s = e.refId.slice(0, o), a = e.refId.slice(o + 1), r = t.boundedContexts.find((l) => l.id === a);
        return r ? s === "aggregates" ? (t.aggregates ?? []).filter((l) => l.boundedContextId === a).map((l) => i("aggregate", l.id, l.name)) : (r.useCases ?? []).map((l) => i(l.policy ? "policy" : "use-case", l.id, l.name)) : [];
      }
      case "aggregate": {
        const o = new Set(
          (t.emissions ?? []).filter((s) => s.sourceId === e.refId).map((s) => s.domainEventId)
        );
        return [
          ...(t.entities ?? []).filter((s) => s.aggregateId === e.refId).map((s) => i("entity", s.id, s.name)),
          ...t.boundedContexts.flatMap((s) => s.domainEvents ?? []).filter((s) => o.has(s.id)).map((s) => i("domain-event", s.id, s.name))
        ];
      }
      case "external-system": {
        const o = t.externalSystems.find((s) => s.id === e.refId);
        return o ? [
          ...(t.apis ?? []).filter((s) => s.publishedByExternalSystemId === e.refId).map((s) => i("api", s.id, s.name)),
          ...(o.useCases ?? []).map((s) => i("external-use-case", s.id, s.name)),
          ...(o.tables ?? []).map((s) => i("external-table", s.id, s.name)),
          ...(o.mcpServers ?? []).map((s) => i("mcp-server", s.id, s.name))
        ] : [];
      }
      case "api": {
        const o = (t.apis ?? []).find((s) => s.id === e.refId);
        return ((o == null ? void 0 : o.operations) ?? []).map((s) => i("api-operation", s.id, s.name));
      }
      case "ui-app": {
        const o = (t.uiApps ?? []).find((r) => r.id === e.refId);
        if (!o) return [];
        const s = /* @__PURE__ */ new Set(), a = (r) => {
          for (const l of r ?? [])
            l.pageId && s.add(l.pageId), a(l.children);
        };
        a(o.menuItems);
        for (const r of [o.headerPageId, o.homePageId, o.viewPageId, o.editPageId])
          r && s.add(r);
        return [...s].map((r) => (t.pages ?? []).find((l) => l.id === r)).filter((r) => !!r).map((r) => i("page", r.id, r.name));
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
    var s;
    !e.expanded && ((s = e.children) != null && s.length) && this.toggle(e);
    const t = /* @__PURE__ */ new Set(), n = (a) => {
      for (let r = a; r; r = r.parent) t.add(r.key);
    }, i = (a) => {
      t.add(a.key);
      for (const r of a.children ?? []) i(r);
    };
    n(e), i(e);
    const o = this.related.get(e.refId);
    if (o)
      for (const a of this.allNodes)
        a.refId && o.has(a.refId) && n(a);
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
    for (const a of e) {
      if (a.parent) {
        const r = (Xi[Math.min(a.depth, Xi.length - 1)] ?? 60) + Math.min(60, ((((s = a.parent.children) == null ? void 0 : s.length) ?? 1) - 1) * 2.5);
        let l = a.x - a.parent.x, p = a.y - a.parent.y, g = Math.hypot(l, p);
        if (g < 0.01) {
          const I = Math.random() * Math.PI * 2;
          l = Math.cos(I) * 0.1, p = Math.sin(I) * 0.1, g = 0.1;
        }
        const f = Ic * (g - r), m = l / g * f, y = p / g * f;
        a.vx -= m, a.vy -= y, a.parent.vx += m * 0.4, a.parent.vy += y * 0.4;
      } else
        a.vx -= a.x * Qi, a.vy -= a.y * Qi;
      !this.reducedMotion && this._motion > 0 && (a.vx += Math.sin(t * a.f1 * Math.PI * 2 + a.p1) * Ji * this._motion, a.vy += Math.cos(t * a.f2 * Math.PI * 2 + a.p2) * Ji * this._motion);
    }
    for (let a = 0; a < e.length; a++) {
      const r = e[a];
      for (let l = a + 1; l < e.length; l++) {
        const p = e[l], g = p.x - r.x, f = p.y - r.y;
        if (Math.abs(g) > ln || Math.abs(f) > ln) continue;
        const m = g * g + f * f;
        if (m > ln * ln || m < 0.01) continue;
        const y = Math.sqrt(m), I = r.depth <= 1 && p.depth <= 1 ? 3 : 1, c = xc * I / m, d = g / y * c, h = f / y * c;
        r.vx -= d, r.vy -= h, p.vx += d, p.vy += h;
      }
    }
    const n = this._motion, i = vc * n + 0.5 * (1 - n), o = (1 - n) * 0.7;
    for (const a of e) {
      if (a === this.dragNode) {
        a.vx = 0, a.vy = 0;
        continue;
      }
      a.vx *= i, a.vy *= i;
      const r = Math.hypot(a.vx, a.vy);
      if (r > 14 && (a.vx = a.vx / r * 14, a.vy = a.vy / r * 14), o > 0 && r < o) {
        a.vx = 0, a.vy = 0;
        continue;
      }
      a.x += a.vx, a.y += a.vy;
      const l = a === this.hover ? 1.75 : 1;
      a.scale += (l - a.scale) * 0.18;
    }
  }
  // ── Drawing ───────────────────────────────────────────────────────────
  radiusOf(e) {
    return (Ki[Math.min(e.depth, Ki.length - 1)] ?? 7) * e.scale;
  }
  draw(e) {
    var a, r;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const n = this.clientWidth, i = this.clientHeight;
    t.clearRect(0, 0, n, i), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), this.drawAreas(t, e), t.lineWidth = 1.3 / this.cam.k;
    for (const l of e)
      l.parent && (t.strokeStyle = l.color + "55", t.beginPath(), t.moveTo(l.parent.x, l.parent.y), t.lineTo(l.x, l.y), t.stroke());
    const o = this.journeyTouchedIds(e), s = (l) => `${l}px system-ui, sans-serif`;
    for (const l of e) {
      o && (t.globalAlpha = o.has(l.refId) ? 1 : 0.22);
      const p = this.radiusOf(l);
      t.beginPath(), t.arc(l.x, l.y, p, 0, Math.PI * 2), t.fillStyle = l.kind === "note" ? "#fef9c3" : l.expanded ? l.color + "22" : "#ffffff", t.fill(), t.lineWidth = (l === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = l.color, t.stroke(), this.drawGlyph(t, l, p);
      const g = ((a = l.children) == null ? void 0 : a.length) ?? 0;
      if (!l.expanded && g > 0) {
        const m = Math.max(7, p * 0.42), y = l.x + p * 0.75, I = l.y + p * 0.75;
        t.beginPath(), t.arc(y, I, m, 0, Math.PI * 2), t.fillStyle = l.color, t.fill(), t.fillStyle = "#ffffff", t.font = s(m * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(g), y, I + 0.5);
      }
      if (l.depth <= 1 || l === this.hover || this.cam.k > 0.65) {
        const m = l.label.length > 22 ? l.label.slice(0, 21) + "…" : l.label;
        t.font = l === this.hover ? `600 ${s(12)}` : s(l.depth <= 1 ? 12 : 10.5), t.fillStyle = l === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(m, l.x, l.y + p + 4);
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
        const l = this.found.node, p = (this.found.until - this.t) / 3.2;
        t.save(), t.globalAlpha = Math.min(0.8, p * 1.6), t.strokeStyle = l.color, t.lineWidth = 2.2 / this.cam.k;
        const g = this.reducedMotion ? 0 : Math.sin(this.t * 5) * 3;
        t.beginPath(), t.arc(l.x, l.y, this.radiusOf(l) + 9 + g, 0, Math.PI * 2), t.stroke(), t.globalAlpha *= 0.4, t.beginPath(), t.arc(l.x, l.y, this.radiusOf(l) + 18 + g * 1.4, 0, Math.PI * 2), t.stroke(), t.restore();
      }
    if (t.globalAlpha = 1, this.drawNotes(t, e), this.journey && this.drawJourney(t, e), this._threads)
      for (const l of e) this.drawThreads(t, l, e);
    else this.hover && this.drawThreads(t, this.hover, e);
    if (this.hover && !this.hover.expanded && ((r = this.hover.children) != null && r.length) && this.drawGhosts(t, this.hover), this.linking) {
      const l = this.linking.source;
      t.save(), t.strokeStyle = "#475569", t.lineWidth = 1.6 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]), t.beginPath(), t.moveTo(l.x, l.y), t.lineTo(this.linking.x, this.linking.y), t.stroke(), t.restore();
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
      for (const s of n) {
        if (s === t || !i.has(s.refId) || s === t.parent || s.parent === t) continue;
        const a = (t.x + s.x) / 2, r = (t.y + s.y) / 2, l = s.x - t.x, p = s.y - t.y, g = 0.18;
        e.strokeStyle = s.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(a - p * g, r + l * g, s.x, s.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(s.x, s.y, this.radiusOf(s) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
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
  /**
   * Areas are pure graphics — no tree node, no physics. Each one paints as a dashed
   * region hugging the LIVE positions of the members its canvas rectangle contains
   * (geometric membership, read straight off the scene boxes). The region's centre
   * doubles as the anchor for note threads pointing at the area.
   */
  drawAreas(e, t) {
    var s;
    this.areaHulls.clear();
    const n = ((s = this.scene) == null ? void 0 : s.nodes) ?? [], i = n.filter((a) => a.kind === "area");
    if (!i.length) return;
    const o = this.cam.k;
    e.save(), e.setLineDash([5 / o, 4 / o]), e.lineWidth = 1.4 / o;
    for (const a of i) {
      const r = n.filter(
        (y) => y.kind !== "area" && !y.parentId && y.x - y.w / 2 >= a.x - a.w / 2 && y.x + y.w / 2 <= a.x + a.w / 2 && y.y - y.h / 2 >= a.y - a.h / 2 && y.y + y.h / 2 <= a.y + a.h / 2
      ), l = [];
      for (const y of r) {
        const I = this.visibleRepresentative(y.id, t);
        I && l.push({ x: I.x, y: I.y, r: this.radiusOf(I) + 16 });
      }
      if (!l.length) continue;
      const p = Math.min(...l.map((y) => y.x - y.r)), g = Math.max(...l.map((y) => y.x + y.r)), f = Math.min(...l.map((y) => y.y - y.r)), m = Math.max(...l.map((y) => y.y + y.r));
      this.areaHulls.set(a.id, { x: (p + g) / 2, y: (f + m) / 2 }), e.fillStyle = "rgba(148, 163, 184, 0.09)", e.strokeStyle = "#94a3b8", e.beginPath(), e.roundRect(p, f, g - p, m - f, 18 / o), e.fill(), e.stroke();
    }
    e.restore();
  }
  /**
   * The note's threads, always on: the note itself already rides the tree as one more
   * node (the scene brings it in), so here only the dashed amber lines to each visible
   * target are drawn — straight from the scene's note-link edges. Threads to RELATIONS
   * (edgeanchor targets) stay on the 2D/3D maps — the yugo doesn't draw those edges.
   * A thread to an AREA anchors at its painted region's centre.
   */
  drawNotes(e, t) {
    var o;
    const n = (((o = this.scene) == null ? void 0 : o.edges) ?? []).filter((s) => s.kind === "note-link");
    if (!n.length) return;
    const i = this.cam.k;
    e.save(), e.setLineDash([4 / i, 3 / i]), e.strokeStyle = "rgba(202, 138, 4, 0.75)", e.lineWidth = 1.4 / i;
    for (const s of n) {
      if (s.targetId.startsWith("edgeanchor:")) continue;
      const a = this.visibleRepresentative(s.sourceId, t), r = this.visibleRepresentative(s.targetId, t), l = r ?? this.areaHulls.get(s.targetId);
      if (!a || !l || r === a) continue;
      const p = l.x - a.x, g = l.y - a.y, f = Math.hypot(p, g) || 1, m = this.radiusOf(a), y = r ? this.radiusOf(r) : 0;
      e.beginPath(), e.moveTo(a.x + p / f * m, a.y + g / f * m), e.lineTo(l.x - p / f * y, l.y - g / f * y), e.stroke();
    }
    e.restore();
  }
  visibleRepresentative(e, t) {
    var o;
    const n = new Map(t.map((s) => [s.refId, s])), i = new Map((((o = this.scene) == null ? void 0 : o.nodes) ?? []).map((s) => [s.id, s.ownerId ?? s.parentId]));
    for (let s = e; s; s = i.get(s)) {
      const a = n.get(s);
      if (a) return a;
    }
    return null;
  }
  /** Quadratic-curve geometry of one leg over the VISIBLE representatives, or null. */
  legGeometry(e, t) {
    const n = this.visibleRepresentative(e.sourceId, t), i = this.visibleRepresentative(e.targetId, t);
    if (!n || !i || n === i) return null;
    const o = (n.x + i.x) / 2, s = (n.y + i.y) / 2, a = 0.14;
    return { a: n, b: i, cx: o - (i.y - n.y) * a, cy: s + (i.x - n.x) * a };
  }
  /** The active journey as a bold amber layer: directed curves, numbered badges. */
  drawJourney(e, t) {
    if (this.journey) {
      e.save();
      for (const n of this.journey.legs) {
        const i = this.visibleRepresentative(n.sourceId, t), o = this.visibleRepresentative(n.targetId, t);
        if (!i || !o || i === o) continue;
        const s = (i.x + o.x) / 2, a = (i.y + o.y) / 2, r = o.x - i.x, l = o.y - i.y, p = 0.14, g = s - l * p, f = a + r * p;
        e.strokeStyle = "#d97706", e.lineWidth = 2.4 / this.cam.k, e.setLineDash([9 / this.cam.k, 7 / this.cam.k]), e.beginPath(), e.moveTo(i.x, i.y), e.quadraticCurveTo(g, f, o.x, o.y), e.stroke(), e.setLineDash([]);
        const m = o.x - g, y = o.y - f, I = Math.hypot(m, y) || 1, c = m / I, d = y / I, h = this.radiusOf(o) + 4, x = o.x - c * h, _ = o.y - d * h, A = 9 / this.cam.k;
        e.fillStyle = "#d97706", e.beginPath(), e.moveTo(x, _), e.lineTo(x - c * A - d * A * 0.55, _ - d * A + c * A * 0.55), e.lineTo(x - c * A + d * A * 0.55, _ - d * A - c * A * 0.55), e.closePath(), e.fill();
        const L = s - l * p * 0.5, O = a + r * p * 0.5, R = 11 / this.cam.k;
        e.beginPath(), e.arc(L, O, R, 0, Math.PI * 2), e.fillStyle = "#d97706", e.fill(), e.fillStyle = "#ffffff", e.font = `bold ${12 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle", e.fillText(n.num, L, O);
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
    var I, c, d;
    if (!((c = (I = this.journey) == null ? void 0 : I.runs) != null && c.length)) {
      this.runnerState = null, this.runnerFx = [];
      return;
    }
    const n = new Map(this.journey.legs.map((h) => [h.id, h])), i = this.journey.runs.map(
      (h) => h.map((x) => n.get(x)).filter((x) => !!x).map((x) => this.legGeometry(x, t)).filter((x) => !!x)
    ).filter((h) => h.length > 0);
    if (!i.length) {
      this.runnerState = null, this.runnerFx = [];
      return;
    }
    const o = 170, s = 0.5, a = Math.max(0, Math.min(0.1, this.t - this.runnerLastClock));
    this.runnerLastClock = this.t;
    let r = this.runnerState;
    if ((!r || r.run >= i.length) && (r = this.runnerState = { run: 0, leg: 0, t: 0, pause: 0 }, this.runnerFx.push({ x: i[0][0].a.x, y: i[0][0].a.y, at: this.t, kind: "start" })), this.drawRunnerFx(e), r.pause > 0) {
      r.pause -= a, r.pause <= 0 && ((d = i[r.run]) != null && d[0]) && this.runnerFx.push({ x: i[r.run][0].a.x, y: i[r.run][0].a.y, at: this.t, kind: "start" });
      return;
    }
    r.leg >= i[r.run].length && (r.leg = i[r.run].length - 1);
    let l = i[r.run][r.leg];
    const p = (h) => Math.max(24, Math.hypot(h.b.x - h.a.x, h.b.y - h.a.y));
    for (r.t += a * o / p(l); r.t >= 1; ) {
      if (r.t -= 1, r.leg++, r.leg >= i[r.run].length) {
        const h = i[r.run];
        this.runnerFx.push({ x: h[h.length - 1].b.x, y: h[h.length - 1].b.y, at: this.t, kind: "end" }), r.run = (r.run + 1) % i.length, r.leg = 0, r.t = 0, r.pause = s;
        return;
      }
      l = i[r.run][r.leg], r.t = r.t * 1;
    }
    const g = r.t, f = 1 - g, m = f * f * l.a.x + 2 * f * g * l.cx + g * g * l.b.x, y = f * f * l.a.y + 2 * f * g * l.cy + g * g * l.b.y;
    e.save(), e.beginPath(), e.arc(m, y, 7 / this.cam.k, 0, Math.PI * 2), e.fillStyle = "#d97706", e.fill(), e.lineWidth = 2 / this.cam.k, e.strokeStyle = "#ffffff", e.stroke(), e.restore();
  }
  /**
   * Route punctuation: a ripple expanding from the origin says «the traveller departs»,
   * a ring closing onto the destination says «it arrived». Without them the loop reads
   * as one endless wander instead of distinct routes.
   */
  drawRunnerFx(e) {
    this.runnerFx = this.runnerFx.filter((n) => this.t - n.at < 0.6);
    for (const n of this.runnerFx) {
      const i = (this.t - n.at) / 0.6, o = n.kind === "start" ? 7 + i * 20 : 27 - i * 20, s = n.kind === "start" ? 0.9 * (1 - i) : 0.15 + i * 0.75;
      e.save(), e.beginPath(), e.arc(n.x, n.y, o / this.cam.k, 0, Math.PI * 2), e.strokeStyle = `rgba(217, 119, 6, ${s})`, e.lineWidth = 2.5 / this.cam.k, e.stroke(), e.restore();
    }
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const n = t.children ?? [], i = n.slice(0, 14), o = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (o <= 0.02) return;
    const a = this.radiusOf(t) + 24, r = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, l = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = o, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, i.forEach((p, g) => {
      const f = r - l / 2 + l * (g + 0.5) / i.length, m = this.reducedMotion ? 0 : Math.sin(this.t * p.f1 * Math.PI * 2 + p.p1) * 1.8, y = t.x + Math.cos(f) * (a + m), I = t.y + Math.sin(f) * (a + m);
      e.beginPath(), e.arc(y, I, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = p.color, e.stroke();
    }), n.length > i.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const p = r + l / 2 + 0.35;
      e.fillText(`+${n.length - i.length}`, t.x + Math.cos(p) * a, t.y + Math.sin(p) * a);
    }
    e.restore();
  }
  /** A tiny kind glyph inside the circle, so the tree reads without hovering. */
  drawGlyph(e, t, n) {
    const i = n * 0.42;
    if (i < 3.2) return;
    const { x: o, y: s } = t;
    switch (e.save(), e.strokeStyle = t.color, e.fillStyle = t.color, e.lineWidth = Math.max(1, i * 0.22), e.lineCap = "round", e.lineJoin = "round", e.beginPath(), t.kind) {
      case "note":
        e.moveTo(o - i * 0.8, s - i * 0.9), e.lineTo(o + i * 0.8, s - i * 0.9), e.lineTo(o + i * 0.8, s + i * 0.3), e.lineTo(o + i * 0.2, s + i * 0.9), e.lineTo(o - i * 0.8, s + i * 0.9), e.closePath(), e.moveTo(o + i * 0.8, s + i * 0.3), e.lineTo(o + i * 0.2, s + i * 0.3), e.lineTo(o + i * 0.2, s + i * 0.9), e.stroke();
        break;
      case "group": {
        e.arc(o - i * 0.45, s, i * 0.16, 0, Math.PI * 2), e.moveTo(o + i * 0.16, s), e.arc(o, s, i * 0.16, 0, Math.PI * 2), e.moveTo(o + i * 0.61, s), e.arc(o + i * 0.45, s, i * 0.16, 0, Math.PI * 2), e.fill(), e.beginPath(), e.arc(o, s, i, -Math.PI * 0.35, Math.PI * 0.35), e.moveTo(o - i * Math.cos(Math.PI * 0.35), s + i * Math.sin(Math.PI * 0.35)), e.arc(o, s, i, Math.PI * 0.65, Math.PI * 1.35), e.stroke();
        break;
      }
      case "root":
        e.arc(o, s, i, 0, Math.PI * 2), e.moveTo(o + i * 0.35, s), e.arc(o, s, i * 0.35, 0, Math.PI * 2), e.stroke();
        break;
      case "boundedContext":
        for (const [a, r] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(o + a * i + i * 0.3, s + r * i), e.arc(o + a * i, s + r * i, i * 0.3, 0, Math.PI * 2);
        e.fill();
        break;
      case "aggregate":
        e.moveTo(o, s - i), e.lineTo(o + i, s), e.lineTo(o, s + i), e.lineTo(o - i, s), e.closePath(), e.stroke();
        break;
      case "entity":
      case "external-table":
      case "read-model":
        e.rect(o - i, s - i * 0.8, i * 2, i * 1.6), e.moveTo(o - i, s - i * 0.25), e.lineTo(o + i, s - i * 0.25), e.stroke();
        break;
      case "use-case":
      case "external-use-case":
        e.moveTo(o - i * 0.6, s - i * 0.85), e.lineTo(o + i * 0.85, s), e.lineTo(o - i * 0.6, s + i * 0.85), e.closePath(), e.stroke();
        break;
      case "policy":
      case "domain-event":
      case "application-event":
        e.moveTo(o + i * 0.3, s - i), e.lineTo(o - i * 0.5, s + i * 0.15), e.lineTo(o + i * 0.05, s + i * 0.15), e.lineTo(o - i * 0.3, s + i), e.lineTo(o + i * 0.5, s - i * 0.15), e.lineTo(o - i * 0.05, s - i * 0.15), e.closePath(), e.stroke();
        break;
      case "domain-service":
      case "etl-flow": {
        e.arc(o, s, i * 0.5, 0, Math.PI * 2);
        for (let a = 0; a < 6; a++) {
          const r = a * Math.PI / 3;
          e.moveTo(o + Math.cos(r) * i * 0.55, s + Math.sin(r) * i * 0.55), e.lineTo(o + Math.cos(r) * i, s + Math.sin(r) * i);
        }
        e.stroke();
        break;
      }
      case "query-service":
        e.arc(o - i * 0.25, s - i * 0.25, i * 0.6, 0, Math.PI * 2), e.moveTo(o + i * 0.25, s + i * 0.25), e.lineTo(o + i, s + i), e.stroke();
        break;
      case "scheduled-trigger":
        e.arc(o, s, i, 0, Math.PI * 2), e.moveTo(o, s - i * 0.55), e.lineTo(o, s), e.lineTo(o + i * 0.45, s + i * 0.25), e.stroke();
        break;
      case "notification":
        e.moveTo(o - i * 0.85, s + i * 0.45), e.quadraticCurveTo(o - i * 0.85, s - i, o, s - i), e.quadraticCurveTo(o + i * 0.85, s - i, o + i * 0.85, s + i * 0.45), e.closePath(), e.moveTo(o + i * 0.25, s + i * 0.75), e.arc(o, s + i * 0.75, i * 0.25, 0, Math.PI), e.stroke();
        break;
      case "document":
        e.moveTo(o - i * 0.7, s - i), e.lineTo(o + i * 0.25, s - i), e.lineTo(o + i * 0.7, s - i * 0.55), e.lineTo(o + i * 0.7, s + i), e.lineTo(o - i * 0.7, s + i), e.closePath(), e.moveTo(o + i * 0.25, s - i), e.lineTo(o + i * 0.25, s - i * 0.55), e.lineTo(o + i * 0.7, s - i * 0.55), e.stroke();
        break;
      case "workflow":
        for (const a of [-0.7, 0.1])
          e.moveTo(o + a * i, s - i * 0.7), e.lineTo(o + (a + 0.6) * i, s), e.lineTo(o + a * i, s + i * 0.7);
        e.stroke();
        break;
      case "identity-provider":
        e.arc(o - i * 0.45, s - i * 0.45, i * 0.45, 0, Math.PI * 2), e.moveTo(o - i * 0.1, s - i * 0.1), e.lineTo(o + i * 0.9, s + i * 0.9), e.moveTo(o + i * 0.45, s + i * 0.45), e.lineTo(o + i * 0.85, s + i * 0.05), e.stroke();
        break;
      case "actor":
        e.arc(o, s - i * 0.5, i * 0.42, 0, Math.PI * 2), e.moveTo(o - i * 0.8, s + i), e.quadraticCurveTo(o, s - i * 0.1, o + i * 0.8, s + i), e.stroke();
        break;
      case "ai-agent":
        for (let a = 0; a < 4; a++) {
          const r = a * Math.PI / 2 + Math.PI / 4;
          e.moveTo(o, s), e.lineTo(o + Math.cos(r) * i, s + Math.sin(r) * i), e.moveTo(o, s), e.lineTo(o + Math.cos(r + Math.PI / 4) * i * 0.5, s + Math.sin(r + Math.PI / 4) * i * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(o - i * 0.45, s + i * 0.15, i * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(o + i * 0.1, s - i * 0.35, i * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(o + i * 0.55, s + i * 0.2, i * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [a, r] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(o + a * i, s + r * i, i * 0.85, i * 0.85);
        e.stroke();
        break;
      case "page":
        e.rect(o - i, s - i * 0.8, i * 2, i * 1.6), e.moveTo(o - i, s - i * 0.35), e.lineTo(o + i, s - i * 0.35), e.stroke(), e.beginPath(), e.arc(o - i * 0.7, s - i * 0.57, i * 0.09, 0, Math.PI * 2), e.fill();
        break;
      case "api":
        e.moveTo(o - i * 0.25, s - i), e.lineTo(o - i, s), e.lineTo(o - i * 0.25, s + i), e.moveTo(o + i * 0.25, s - i), e.lineTo(o + i, s), e.lineTo(o + i * 0.25, s + i), e.stroke();
        break;
      case "api-operation":
        e.moveTo(o - i, s), e.lineTo(o + i * 0.7, s), e.moveTo(o + i * 0.1, s - i * 0.5), e.lineTo(o + i * 0.8, s), e.lineTo(o + i * 0.1, s + i * 0.5), e.stroke();
        break;
      case "mcp-server":
        e.arc(o, s + i * 0.25, i * 0.6, 0, Math.PI), e.closePath(), e.moveTo(o - i * 0.35, s + i * 0.25), e.lineTo(o - i * 0.35, s - i * 0.7), e.moveTo(o + i * 0.35, s + i * 0.25), e.lineTo(o + i * 0.35, s - i * 0.7), e.stroke();
        break;
      default:
        e.arc(o, s, i * 0.3, 0, Math.PI * 2), e.fill();
    }
    e.restore();
  }
  /** Hover card: what the node is, what it holds, how to enter. Screen space, clamped to the canvas. */
  drawCard(e, t, n, i) {
    var R, W;
    const o = (t.children ?? []).flatMap(
      (v) => v.kind === "group" ? v.children ?? (v.children = this.childrenOf(v)) : [v]
    ), s = /* @__PURE__ */ new Map();
    for (const v of o) s.set(v.kind, (s.get(v.kind) ?? 0) + 1);
    const a = [];
    for (const [v, B] of s)
      if (a.push(`${B} ${B === 1 ? (Dn[v] ?? v).toLowerCase() : bc[v] ?? v}`), a.length === 4) {
        const K = [...s.keys()].length - 4;
        K > 0 && (a[3] += ` (+${K} tipos más)`);
        break;
      }
    const r = o.slice(0, 6).map((v) => ({ label: v.label.length > 30 ? v.label.slice(0, 29) + "…" : v.label, color: v.color })), l = o.length - r.length, p = t.label, g = Dn[t.kind] ?? t.kind, f = ((R = t.children) != null && R.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((W = t.children) != null && W.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const m = e.measureText(p).width;
    e.font = "11px system-ui, sans-serif";
    const y = Math.max(
      e.measureText(g).width,
      ...a.map((v) => e.measureText(v).width),
      ...r.map((v) => e.measureText(v.label).width + 12),
      e.measureText(f).width
    ), I = Math.min(300, Math.max(m, y) + 24), c = r.length ? 8 + r.length * 15 + (l > 0 ? 15 : 0) : 0, d = 40 + a.length * 15 + c + (f ? 18 : 0), h = this.radiusOf(t) * this.cam.k, x = this.cam.x + t.x * this.cam.k, _ = this.cam.y + t.y * this.cam.k;
    let A = x + h + 14;
    A + I > n - 8 && (A = x - h - 14 - I), A = Math.max(8, Math.min(A, n - I - 8));
    const L = Math.max(8, Math.min(_ - 10, i - d - 8));
    e.translate(A, L), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, I, d, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(p, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(g, 12, 25), e.fillStyle = "#475569", a.forEach((v, B) => e.fillText(v, 12, 41 + B * 15));
    let O = 41 + a.length * 15 + (r.length ? 8 : 0);
    r.forEach((v) => {
      e.fillStyle = v.color, e.beginPath(), e.arc(15, O + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(v.label, 24, O), O += 15;
    }), l > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${l} más`, 24, O)), f && (e.fillStyle = "#94a3b8", e.fillText(f, 12, d - 16)), e.restore();
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
      const o = n[i], s = this.radiusOf(o) + 4 / this.cam.k;
      if ((e - o.x) ** 2 + (t - o.y) ** 2 <= s * s) return o;
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
        const i = Math.min(n.ax, n.bx), o = Math.max(n.ax, n.bx), s = Math.min(n.ay, n.by), a = Math.max(n.ay, n.by), r = this.visible().filter((l) => l.kind !== "root" && l.kind !== "group" && l.refId).filter((l) => l.x >= i && l.x <= o && l.y >= s && l.y <= a).map((l) => l.key);
        this.selected = new Set(n.additive ? [...this.selected, ...r] : r);
      } else
        this.selected = /* @__PURE__ */ new Set(), this.focusKeys = void 0;
      return;
    }
    const t = this.dragNode;
    if (this.dragNode = void 0, this.panning = !1, t && !this.moved)
      if (e.altKey) this.focusOn(t);
      else {
        this.selected = new Set(t.kind !== "root" && t.refId ? [t.key] : []);
        const n = performance.now(), i = this.lastClickKey === t.key && n - this.lastClickAt < 350;
        this.lastClickKey = t.key, this.lastClickAt = n, window.clearTimeout(this.clickTimer), i || (this.clickTimer = window.setTimeout(() => this.toggle(t), 240));
      }
    else !t && !this.moved && this.focusKeys && (this.focusKeys = void 0);
  }
  /** Click: the node explodes — children burst out from it and the springs settle. */
  toggle(e) {
    var t;
    if ((t = e.children) != null && t.length && (e.expanded = !e.expanded, e.expanded)) {
      const n = e.parent ? Math.atan2(e.y - e.parent.y, e.x - e.parent.x) : Math.random() * Math.PI * 2, i = e.parent ? Math.PI * 1.25 : Math.PI * 2, o = e.children;
      o.forEach((s, a) => {
        this.materialize(s.parent);
        const r = n - i / 2 + i * (a + 0.5) / o.length;
        s.x = e.x + Math.cos(r) * 6, s.y = e.y + Math.sin(r) * 6, s.vx = Math.cos(r) * 7, s.vy = Math.sin(r) * 7, s.children || (s.children = this.childrenOf(s));
      }), e.vx -= Math.cos(n) * 2, e.vy -= Math.sin(n) * 2;
    }
  }
  onDblClick(e) {
    window.clearTimeout(this.clickTimer);
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
    const t = this.getBoundingClientRect(), n = e.clientX - t.left, i = e.clientY - t.top, o = Math.exp(-e.deltaY * 12e-4), s = Math.min(2.5, Math.max(0.25, this.cam.k * o)), a = s / this.cam.k;
    this.cam.x = n - (n - this.cam.x) * a, this.cam.y = i - (i - this.cam.y) * a, this.cam.k = s;
  }
  render() {
    return M`
      <canvas
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @dblclick=${this.onDblClick}
        @wheel=${this.onWheel}
      ></canvas>
      ${this.renaming ? M`<input
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
        ${this._sugs.length ? M`<ul class="sugs">
              ${this._sugs.map(
      (e, t) => M`<li
                  class=${t === this._active ? "active" : ""}
                  @mouseenter=${() => this._active = t}
                  @click=${() => this.flyToNode(e)}
                >
                  <span class="dot" style="background:${e.color}"></span>
                  <span class="name">${e.label}</span>
                  <span class="path">${this.pathOf(e) || (Dn[e.kind] ?? e.kind)}</span>
                </li>`
    )}
            </ul>` : this._q.trim().length >= 2 ? M`<ul class="sugs"><li class="empty">sin resultados</li></ul>` : null}
      </div>
      <div class="controls" @pointerdown=${(e) => e.stopPropagation()}>
        <span>Niveles</span>
        <input
          type="range"
          min="0"
          max=${Math.max(5, this.sceneDepth())}
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
        ${this._viewNaming ? M`
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
            ` : M`<button
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
he.styles = bt`
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
Me([
  re({ type: Boolean, reflect: !0 })
], he.prototype, "shifted", 2);
Me([
  re({ attribute: !1 })
], he.prototype, "scene", 2);
Me([
  re({ attribute: !1 })
], he.prototype, "journey", 2);
Me([
  re({ attribute: !1 })
], he.prototype, "model", 2);
Me([
  q()
], he.prototype, "_q", 2);
Me([
  q()
], he.prototype, "_sugs", 2);
Me([
  q()
], he.prototype, "_active", 2);
Me([
  q()
], he.prototype, "_motion", 2);
Me([
  q()
], he.prototype, "_threads", 2);
Me([
  q()
], he.prototype, "_viewNaming", 2);
Me([
  q()
], he.prototype, "_viewName", 2);
Me([
  q()
], he.prototype, "selected", 2);
Me([
  q()
], he.prototype, "_levels", 2);
Me([
  re()
], he.prototype, "sceneKey", 2);
Me([
  q()
], he.prototype, "renaming", 2);
he = Me([
  It("modux-explorer")
], he);
function wc(e, t) {
  var n, i, o, s, a, r, l, p, g, f, m, y, I;
  switch (t.kind) {
    case "add-relation":
      return [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-relation": {
      const c = e.model.relations.find(
        (d) => d.sourceId === t.sourceId && d.targetId === t.targetId
      );
      return c && c.type ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: c.type }] : null;
    }
    case "set-relation-type": {
      const c = e.model.relations.find(
        (d) => d.sourceId === t.sourceId && d.targetId === t.targetId
      );
      return c && c.type ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: c.type }] : [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
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
      const c = (e.model.uiApps ?? []).find((d) => d.id === t.appId);
      return [{ kind: "set-app-header-page", appId: t.appId, pageId: (c == null ? void 0 : c.headerPageId) ?? null }];
    }
    case "set-app-model": {
      const c = (e.model.uiApps ?? []).find((d) => d.id === t.appId);
      return [{ kind: "set-app-model", appId: t.appId, modelId: (c == null ? void 0 : c.modelId) ?? null }];
    }
    case "add-model":
      return [{ kind: "remove-model", id: t.id }];
    case "add-model-mapping":
      return [{ kind: "remove-model-mapping", id: t.id }];
    case "remove-model-mapping": {
      const c = (e.model.modelMappings ?? []).find((d) => d.id === t.id);
      return !(c != null && c.sourceModelId) || !c.targetModelId ? null : [{
        kind: "add-model-mapping",
        id: c.id,
        name: c.name,
        sourceId: c.sourceModelId,
        targetId: c.targetModelId
      }];
    }
    case "remove-model": {
      const c = (e.model.models ?? []).find((h) => h.id === t.id);
      if (!c) return null;
      const d = [{ kind: "add-model", id: c.id, name: c.name }];
      for (const h of e.model.pages ?? []) {
        h.modelId === t.id && d.push({ kind: "set-page-model", pageId: h.id, modelId: t.id });
        const x = (_) => {
          for (const A of _ ?? [])
            A.modelId === t.id && d.push({ kind: "set-page-component", pageId: h.id, componentId: A.id, modelId: t.id }), x(A.children);
        };
        x(h.content);
      }
      for (const h of e.model.uiApps ?? [])
        h.modelId === t.id && d.push({ kind: "set-app-model", appId: h.id, modelId: t.id });
      return d;
    }
    case "set-crud-detail":
    case "set-crud-create": {
      const c = (e.model.pages ?? []).find((h) => h.id === t.pageId), d = t.kind === "set-crud-detail";
      return [{
        kind: t.kind,
        pageId: t.pageId,
        targetId: (d ? c == null ? void 0 : c.crudDetailPageId : c == null ? void 0 : c.crudCreatePageId) ?? null,
        toAppId: (d ? c == null ? void 0 : c.crudDetailAppId : c == null ? void 0 : c.crudCreateAppId) ?? null
      }];
    }
    case "set-app-view-page": {
      const c = (e.model.uiApps ?? []).find((d) => d.id === t.appId);
      return [{ kind: "set-app-view-page", appId: t.appId, pageId: (c == null ? void 0 : c.viewPageId) ?? null }];
    }
    case "set-app-edit-page": {
      const c = (e.model.uiApps ?? []).find((d) => d.id === t.appId);
      return [{ kind: "set-app-edit-page", appId: t.appId, pageId: (c == null ? void 0 : c.editPageId) ?? null }];
    }
    case "set-app-home-page": {
      const c = (e.model.uiApps ?? []).find((d) => d.id === t.appId);
      return [{
        kind: "set-app-home-page",
        appId: t.appId,
        pageId: (c == null ? void 0 : c.homePageId) ?? null,
        toAppId: (c == null ? void 0 : c.homeAppId) ?? null
      }];
    }
    case "add-page-wizard-step":
      return [{ kind: "remove-page-wizard-step", pageId: t.pageId, targetId: t.itemId ?? t.targetId }];
    case "set-wizard-step-page": {
      const c = (((n = (e.model.pages ?? []).find((d) => d.id === t.pageId)) == null ? void 0 : n.wizardSteps) ?? []).find((d) => (d.id ?? d.pageId) === t.itemId);
      return c ? [{ kind: "set-wizard-step-page", pageId: t.pageId, itemId: t.itemId, targetId: c.pageId ?? null }] : null;
    }
    case "move-page-wizard-step": {
      const c = (((i = (e.model.pages ?? []).find((h) => h.id === t.pageId)) == null ? void 0 : i.wizardSteps) ?? []).map((h) => h.id ?? h.pageId), d = c.indexOf(t.targetId);
      return d < 0 ? null : [{
        kind: "move-page-wizard-step",
        pageId: t.pageId,
        targetId: t.targetId,
        beforeItemId: c[d + 1] ?? null
      }];
    }
    case "remove-page-wizard-step": {
      const c = (((o = (e.model.pages ?? []).find((d) => d.id === t.pageId)) == null ? void 0 : o.wizardSteps) ?? []).find((d) => (d.id ?? d.pageId) === t.targetId);
      return c ? [{
        kind: "add-page-wizard-step",
        pageId: t.pageId,
        targetId: c.pageId ?? null,
        label: c.label,
        itemId: c.id
      }] : null;
    }
    case "delete-ui-app": {
      const c = (e.model.uiApps ?? []).find((x) => x.id === t.id);
      if (!c) return null;
      const d = [{ kind: "create-ui-app", id: c.id, name: c.name, type: c.type }];
      c.headerPageId && d.push({ kind: "set-app-header-page", appId: c.id, pageId: c.headerPageId }), c.modelId && d.push({ kind: "set-app-model", appId: c.id, modelId: c.modelId }), c.viewPageId && d.push({ kind: "set-app-view-page", appId: c.id, pageId: c.viewPageId }), c.editPageId && d.push({ kind: "set-app-edit-page", appId: c.id, pageId: c.editPageId }), (c.homePageId || c.homeAppId) && d.push({
        kind: "set-app-home-page",
        appId: c.id,
        pageId: c.homePageId ?? null,
        toAppId: c.homeAppId ?? null
      });
      const h = (x, _) => {
        for (const A of x ?? [])
          d.push({
            kind: "add-menu-item",
            appId: c.id,
            label: A.label,
            itemId: A.id,
            parentId: _ == null ? void 0 : _.id,
            parentLabel: _ && !_.id ? _.label : void 0,
            pageId: A.pageId ?? null
          }), A.uiAdapterId && d.push({ kind: "set-menu-app", appId: c.id, toAppId: A.uiAdapterId, itemId: A.id, label: A.label }), A.useCaseId && d.push({ kind: "set-menu-use-case", appId: c.id, useCaseId: A.useCaseId, itemId: A.id, label: A.label }), A.aggregateId && d.push({ kind: "set-menu-aggregate", appId: c.id, aggregateId: A.aggregateId, itemId: A.id, label: A.label }), A.queryOperationId && d.push({
            kind: "set-menu-query-operation",
            appId: c.id,
            queryServiceId: A.queryServiceId ?? null,
            queryOperationId: A.queryOperationId,
            itemId: A.id,
            label: A.label
          }), h(A.children, A);
      };
      h(c.menuItems);
      for (const x of e.model.actorAppUses ?? [])
        x.appId === t.id && d.push({ kind: "add-actor-app", actorId: x.actorId, appId: t.id });
      return d;
    }
    case "delete-ui-page": {
      const c = (e.model.pages ?? []).find((h) => h.id === t.id);
      if (!c) return null;
      const d = [
        { kind: "create-ui-page", id: c.id, name: c.name, pageType: c.type ?? "FORM" }
      ];
      c.route && d.push({ kind: "set-page-route", pageId: c.id, path: c.route }), c.modelId && d.push({ kind: "set-page-model", pageId: c.id, modelId: c.modelId }), c.listingQueryServiceId && d.push({ kind: "set-page-listing", pageId: c.id, queryServiceId: c.listingQueryServiceId });
      for (const h of c.buttons ?? [])
        h.useCaseId && (d.push({ kind: "add-page-button", pageId: c.id, useCaseId: h.useCaseId, label: h.label }), h.mappingId && d.push({
          kind: "set-page-button",
          pageId: c.id,
          useCaseId: h.useCaseId,
          label: h.label ?? null,
          mappingId: h.mappingId
        }));
      for (const h of c.viewmodelFields ?? [])
        (h.stereotype || h.colspan || h.label) && d.push({
          kind: "set-page-field-config",
          pageId: c.id,
          fieldId: h.fieldId,
          stereotype: h.stereotype ?? null,
          colspan: h.colspan ?? null,
          label: h.label ?? null
        });
      (c.viewmodelFields ?? []).length && d.push({
        kind: "set-page-field-order",
        pageId: c.id,
        fieldIds: (c.viewmodelFields ?? []).map((h) => h.fieldId)
      });
      for (const h of c.content ?? [])
        d.push(...e.rebuildComponentOps(c.id, h, void 0, null).ops);
      for (const h of c.wizardSteps ?? [])
        d.push({
          kind: "add-page-wizard-step",
          pageId: c.id,
          targetId: h.pageId ?? null,
          label: h.label,
          itemId: h.id
        });
      return (c.crudDetailPageId || c.crudDetailAppId) && d.push({ kind: "set-crud-detail", pageId: c.id, targetId: c.crudDetailPageId ?? null, toAppId: c.crudDetailAppId ?? null }), (c.crudCreatePageId || c.crudCreateAppId) && d.push({ kind: "set-crud-create", pageId: c.id, targetId: c.crudCreatePageId ?? null, toAppId: c.crudCreateAppId ?? null }), d;
    }
    case "add-menu-item":
      return [{ kind: "remove-menu-item", appId: t.appId, itemId: t.itemId, label: t.label }];
    case "remove-menu-item":
    case "set-menu-page":
    case "set-menu-app":
    case "set-menu-use-case":
    case "set-menu-aggregate":
    case "set-menu-query-operation": {
      const c = (e.model.uiApps ?? []).find((x) => x.id === t.appId), d = (x) => {
        for (const _ of x ?? []) {
          if (t.itemId ? _.id === t.itemId : _.label === t.label) return _;
          const A = d(_.children);
          if (A) return A;
        }
        return null;
      }, h = t.itemId || t.label ? d(c == null ? void 0 : c.menuItems) : null;
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
      const c = (e.model.pages ?? []).find((h) => h.id === t.pageId), d = ((c == null ? void 0 : c.buttons) ?? []).find((h) => h.useCaseId === t.useCaseId);
      return d ? [{ kind: "add-page-button", pageId: t.pageId, useCaseId: t.useCaseId, label: d.label }] : null;
    }
    case "rename-ui-page": {
      const c = (e.model.pages ?? []).find((d) => d.id === t.pageId);
      return c ? [{ kind: "rename-ui-page", pageId: t.pageId, name: c.name }] : null;
    }
    case "set-page-type": {
      const c = (e.model.pages ?? []).find((d) => d.id === t.pageId);
      return c ? [{ kind: "set-page-type", pageId: t.pageId, pageType: c.type ?? "FORM" }] : null;
    }
    case "set-page-route": {
      const c = (e.model.pages ?? []).find((d) => d.id === t.pageId);
      return c != null && c.route ? [{ kind: "set-page-route", pageId: t.pageId, path: c.route }] : null;
    }
    case "set-page-button": {
      const c = (e.model.pages ?? []).find((h) => h.id === t.pageId), d = ((c == null ? void 0 : c.buttons) ?? []).find((h) => h.useCaseId === t.useCaseId);
      return d ? [{
        kind: "set-page-button",
        pageId: t.pageId,
        useCaseId: t.useCaseId,
        label: d.label ?? null,
        mappingId: d.mappingId ?? null
      }] : null;
    }
    case "add-page-component":
      return [{ kind: "remove-page-component", pageId: t.pageId, componentId: t.componentId }];
    case "set-page-component":
    case "remove-page-component":
    case "move-page-component": {
      const c = (e.model.pages ?? []).find((L) => L.id === t.pageId);
      let d = null, h = null, x = null;
      const _ = (L, O) => {
        var W;
        const R = L ?? [];
        for (let v = 0; v < R.length; v++)
          R[v].id === t.componentId && (d = R[v], h = O, x = ((W = R[v + 1]) == null ? void 0 : W.id) ?? null), _(R[v].children, R[v]);
      };
      if (_(c == null ? void 0 : c.content, null), !d) return null;
      const A = d;
      return t.kind === "set-page-component" ? [{
        kind: "set-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        title: A.title ?? null,
        text: A.text ?? null,
        label: A.label ?? null,
        useCaseId: A.useCaseId ?? null,
        mappingId: A.mappingId ?? null,
        modelId: A.modelId ?? null,
        queryServiceId: A.queryServiceId ?? null,
        queryOperationId: A.queryOperationId ?? null,
        fieldId: A.fieldId ?? null,
        stereotype: A.stereotype ?? null,
        colspan: A.colspan ?? null
      }] : t.kind === "move-page-component" ? [{
        kind: "move-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        parentComponentId: h === null ? null : h.id,
        beforeComponentId: x
      }] : e.rebuildComponentOps(
        t.pageId,
        A,
        h === null ? void 0 : h.id,
        x
      ).ops;
    }
    case "set-page-listing": {
      const c = (e.model.pages ?? []).find((d) => d.id === t.pageId);
      return [{ kind: "set-page-listing", pageId: t.pageId, queryServiceId: (c == null ? void 0 : c.listingQueryServiceId) ?? null }];
    }
    case "set-page-model": {
      const c = (e.model.pages ?? []).find((d) => d.id === t.pageId);
      return [{ kind: "set-page-model", pageId: t.pageId, modelId: (c == null ? void 0 : c.modelId) ?? null }];
    }
    case "set-page-field-config": {
      const c = (((s = (e.model.pages ?? []).find((d) => d.id === t.pageId)) == null ? void 0 : s.viewmodelFields) ?? []).find((d) => d.fieldId === t.fieldId);
      return [{
        kind: "set-page-field-config",
        pageId: t.pageId,
        fieldId: t.fieldId,
        stereotype: (c == null ? void 0 : c.stereotype) ?? null,
        colspan: (c == null ? void 0 : c.colspan) ?? null,
        label: (c == null ? void 0 : c.label) ?? null
      }];
    }
    case "set-page-field-order": {
      const c = (((a = (e.model.pages ?? []).find((d) => d.id === t.pageId)) == null ? void 0 : a.viewmodelFields) ?? []).map((d) => d.fieldId);
      return c.length ? [{ kind: "set-page-field-order", pageId: t.pageId, fieldIds: c }] : null;
    }
    case "move-menu-item": {
      const c = t.itemId ? e.menuEntryIn(t.appId, t.itemId) : null;
      return [{
        kind: "move-menu-item",
        appId: t.toAppId,
        toAppId: t.appId,
        itemId: t.itemId,
        label: t.label,
        parentId: (c == null ? void 0 : c.parentId) ?? void 0,
        beforeItemId: (c == null ? void 0 : c.beforeId) ?? void 0
      }];
    }
    case "add-actor-app":
      return [{ kind: "remove-actor-app", actorId: t.actorId, appId: t.appId }];
    case "remove-actor-app":
      return [{ kind: "add-actor-app", actorId: t.actorId, appId: t.appId }];
    case "add-boundedContext":
      return [{ kind: "remove-boundedContext", id: t.id }];
    case "remove-boundedContext": {
      const c = e.model.boundedContexts.find((h) => h.id === t.id);
      if (!c) return null;
      const d = e.model.relations.filter(
        (h) => (h.sourceId === t.id || h.targetId === t.id) && h.type != null
      );
      return [
        { kind: "add-boundedContext", id: c.id, name: c.name, subdomainType: c.subdomainType ?? "GENERIC" },
        // Re-annotate the derived pairs this boundedContext participated in.
        ...d.map(
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
      const c = (e.model.aggregates ?? []).find((d) => d.id === t.id);
      return c ? [{ kind: "add-aggregate", id: c.id, name: c.name, boundedContextId: c.boundedContextId }] : null;
    }
    case "add-domain-event":
      return [{ kind: "remove-domain-event", id: t.id }];
    case "add-query-service":
      return [{ kind: "remove-query-service", id: t.id }];
    case "remove-query-service": {
      for (const c of e.model.boundedContexts) {
        const d = (c.queryServices ?? []).find((h) => h.id === t.id);
        if (d) return [{ kind: "add-query-service", id: d.id, name: d.name, boundedContextId: c.id }];
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
      const c = (e.model.externalSystemDependencies ?? []).find(
        (d) => d.sourceId === t.sourceId && d.targetId === t.targetId
      );
      return c ? [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: c.type }] : [{ kind: "remove-external-dependency", sourceId: t.sourceId, targetId: t.targetId }];
    }
    case "remove-external-dependency": {
      const c = (e.model.externalSystemDependencies ?? []).find(
        (d) => d.sourceId === t.sourceId && d.targetId === t.targetId
      );
      return [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: c == null ? void 0 : c.type }];
    }
    case "add-proxy-api":
      return [{ kind: "remove-proxy-api", id: t.id }];
    case "remove-proxy-api": {
      const c = (e.model.proxyApis ?? []).find((d) => d.id === t.id);
      return c ? [{
        kind: "add-proxy-api",
        id: c.id,
        name: c.name,
        targetId: c.targetApiId,
        boundedContextId: c.publishedByExternalSystemId
      }] : null;
    }
    case "set-proxy-target": {
      const c = (e.model.proxyApis ?? []).find((d) => d.id === t.id);
      return c ? [{ kind: "set-proxy-target", id: t.id, targetId: c.targetApiId ?? "" }] : null;
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
      const c = (e.model.apiOperationImplementations ?? []).find(
        (d) => d.apiId === t.apiId && d.operationId === t.operationId && d.boundedContextId === t.boundedContextId
      );
      return c ? [{
        kind: "set-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        boundedContextId: t.boundedContextId,
        targetUseCaseId: c.useCaseId
      }] : [{
        kind: "remove-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        boundedContextId: t.boundedContextId
      }];
    }
    case "remove-api-operation-implementation": {
      const c = (e.model.apiOperationImplementations ?? []).find(
        (d) => d.apiId === t.apiId && d.operationId === t.operationId && d.boundedContextId === t.boundedContextId
      );
      return c ? [{
        kind: "set-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        boundedContextId: t.boundedContextId,
        targetUseCaseId: c.useCaseId
      }] : null;
    }
    case "set-api-publisher": {
      const c = (e.model.apis ?? []).find((d) => d.id === t.id) ?? (e.model.proxyApis ?? []).find((d) => d.id === t.id);
      return c ? [{ kind: "set-api-publisher", id: t.id, targetId: c.publishedByExternalSystemId ?? "" }] : null;
    }
    case "add-actor-crud":
      return [{ kind: "remove-actor-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-actor-crud":
      return [{ kind: "add-actor-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-use-case":
      return [{ kind: "remove-use-case", id: t.id }];
    case "remove-use-case": {
      for (const c of e.model.boundedContexts) {
        const d = (c.useCases ?? []).find((h) => h.id === t.id);
        if (d)
          return [
            { kind: "add-use-case", id: d.id, name: d.name, boundedContextId: c.id, policy: d.policy }
          ];
      }
      return null;
    }
    case "add-external-use-case":
      return [{ kind: "remove-external-use-case", id: t.id }];
    case "remove-external-use-case": {
      for (const c of e.model.externalSystems) {
        const d = (c.useCases ?? []).find((h) => h.id === t.id);
        if (d)
          return [{ kind: "add-external-use-case", id: d.id, name: d.name, boundedContextId: c.id }];
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
      const c = (e.model.notifications ?? []).find((h) => h.id === t.id);
      if (!(c != null && c.ownerBoundedContextId)) return null;
      const d = [
        { kind: "add-notification", id: c.id, name: c.name, boundedContextId: c.ownerBoundedContextId, type: (c.channels ?? [])[0] }
      ];
      c.eventId && d.push({ kind: "set-notification-event", id: c.id, targetId: c.eventId });
      for (const h of c.recipientRoleIds ?? []) d.push({ kind: "add-notification-recipient", id: c.id, roleId: h });
      return d;
    }
    case "set-notification-event": {
      const c = (e.model.notifications ?? []).find((d) => d.id === t.id);
      return [{ kind: "set-notification-event", id: t.id, targetId: (c == null ? void 0 : c.eventId) ?? null }];
    }
    case "add-notification-recipient":
      return [{ kind: "remove-notification-recipient", id: t.id, roleId: t.roleId }];
    case "remove-notification-recipient":
      return [{ kind: "add-notification-recipient", id: t.id, roleId: t.roleId }];
    case "add-document":
      return [{ kind: "remove-document", id: t.id }];
    case "remove-document": {
      const c = (e.model.documents ?? []).find((h) => h.id === t.id);
      if (!(c != null && c.ownerBoundedContextId)) return null;
      const d = [
        { kind: "add-document", id: c.id, name: c.name, boundedContextId: c.ownerBoundedContextId, type: c.kind }
      ];
      return c.modelId && d.push({ kind: "set-document-model", id: c.id, modelId: c.modelId }), c.queryServiceId && d.push({ kind: "set-document-query", id: c.id, queryServiceId: c.queryServiceId, queryOperationId: c.queryOperationId ?? null }), d;
    }
    case "set-document-model": {
      const c = (e.model.documents ?? []).find((d) => d.id === t.id);
      return [{ kind: "set-document-model", id: t.id, modelId: (c == null ? void 0 : c.modelId) ?? null }];
    }
    case "set-document-query": {
      const c = (e.model.documents ?? []).find((d) => d.id === t.id);
      return [{ kind: "set-document-query", id: t.id, queryServiceId: (c == null ? void 0 : c.queryServiceId) ?? null, queryOperationId: (c == null ? void 0 : c.queryOperationId) ?? null }];
    }
    case "add-identity-provider":
      return [{ kind: "remove-identity-provider", id: t.id }];
    case "remove-identity-provider": {
      const c = (e.model.identityProviders ?? []).find((h) => h.id === t.id);
      if (!c) return null;
      const d = [
        { kind: "add-identity-provider", id: c.id, name: c.name, type: c.type }
      ];
      c.publishedByExternalSystemId && d.push({ kind: "set-idp-publisher", id: c.id, targetId: c.publishedByExternalSystemId });
      for (const h of e.model.boundedContexts)
        h.identityProviderId === t.id && d.push({ kind: "set-identity-provider", id: h.id, targetId: t.id });
      for (const h of e.model.uiApps ?? [])
        h.identityProviderId === t.id && d.push({ kind: "set-identity-provider", id: h.id, targetId: t.id });
      for (const h of e.model.etlFlows ?? [])
        h.identityProviderId === t.id && d.push({ kind: "set-identity-provider", id: h.id, targetId: t.id });
      return d;
    }
    case "set-idp-publisher": {
      const c = (e.model.identityProviders ?? []).find((d) => d.id === t.id);
      return [{ kind: "set-idp-publisher", id: t.id, targetId: (c == null ? void 0 : c.publishedByExternalSystemId) ?? null }];
    }
    case "set-identity-provider": {
      const c = ((r = e.model.boundedContexts.find((d) => d.id === t.id)) == null ? void 0 : r.identityProviderId) ?? ((l = (e.model.uiApps ?? []).find((d) => d.id === t.id)) == null ? void 0 : l.identityProviderId) ?? ((p = (e.model.etlFlows ?? []).find((d) => d.id === t.id)) == null ? void 0 : p.identityProviderId) ?? null;
      return [{ kind: "set-identity-provider", id: t.id, targetId: c }];
    }
    case "add-etl-flow":
      return [{ kind: "remove-etl-flow", id: t.id }];
    case "remove-etl-flow": {
      const c = (e.model.etlFlows ?? []).find((d) => d.id === t.id);
      return !c || !c.ownerBoundedContextId ? null : [
        { kind: "add-etl-flow", id: c.id, name: c.name, boundedContextId: c.ownerBoundedContextId },
        ...(c.steps ?? []).map((d) => ({
          kind: "add-etl-step",
          etlFlowId: c.id,
          id: d.id,
          name: d.name,
          stepType: d.type,
          externalTableId: d.externalTableId,
          apiId: d.apiId,
          operationId: d.operationId,
          targetId: d.eventId,
          mappingId: d.mappingId
        }))
      ];
    }
    case "add-etl-step":
      return [{ kind: "remove-etl-step", etlFlowId: t.etlFlowId, id: t.id }];
    case "remove-etl-step": {
      const c = (((g = (e.model.etlFlows ?? []).find((d) => d.id === t.etlFlowId)) == null ? void 0 : g.steps) ?? []).find((d) => d.id === t.id);
      return c ? [{
        kind: "add-etl-step",
        etlFlowId: t.etlFlowId,
        id: c.id,
        name: c.name,
        stepType: c.type,
        externalTableId: c.externalTableId,
        apiId: c.apiId,
        operationId: c.operationId,
        targetId: c.eventId,
        mappingId: c.mappingId
      }] : null;
    }
    case "add-scheduled-trigger":
      return [{ kind: "remove-scheduled-trigger", id: t.id }];
    case "remove-scheduled-trigger": {
      const c = e.model.boundedContexts.find(
        (h) => (h.scheduledTriggers ?? []).some((x) => x.id === t.id)
      ), d = ((c == null ? void 0 : c.scheduledTriggers) ?? []).find((h) => h.id === t.id);
      return !c || !d ? null : [{
        kind: "add-scheduled-trigger",
        id: d.id,
        name: d.name,
        boundedContextId: c.id,
        cronExpression: d.cronExpression,
        targetUseCaseId: d.useCaseId
      }];
    }
    case "set-scheduled-trigger-target": {
      const c = e.model.boundedContexts.flatMap((d) => d.scheduledTriggers ?? []).find((d) => d.id === t.id);
      return c ? [{ kind: "set-scheduled-trigger-target", id: t.id, targetUseCaseId: c.useCaseId ?? null }] : null;
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
      const c = e.model.externalSystems.find((d) => d.id === t.id);
      return c ? [{ kind: "add-external-system", id: c.id, name: c.name }] : null;
    }
    case "add-ai-agent":
      return [{ kind: "remove-ai-agent", id: t.id }];
    case "remove-ai-agent": {
      const c = (e.model.aiAgents ?? []).find((d) => d.id === t.id);
      return c ? [
        { kind: "add-ai-agent", id: c.id, name: c.name, external: c.external },
        ...(e.model.agentUses ?? []).filter((d) => d.agentId === t.id).map((d) => ({ kind: "add-agent-use", sourceId: t.id, targetId: d.useCaseId })),
        ...(e.model.agentExternalUses ?? []).filter((d) => d.agentId === t.id).map((d) => ({
          kind: "add-agent-external-use",
          sourceId: t.id,
          targetId: d.externalUseCaseId
        })),
        ...(e.model.agentMcpUses ?? []).filter((d) => d.agentId === t.id).map((d) => ({ kind: "add-agent-mcp", sourceId: t.id, targetId: d.mcpServerId })),
        ...(e.model.agentGatewayUses ?? []).filter((d) => d.agentId === t.id).map((d) => ({ kind: "add-agent-gateway", sourceId: t.id, targetId: d.gatewayId })),
        ...(e.model.agentApiOpUses ?? []).filter((d) => d.agentId === t.id).map((d) => ({
          kind: "add-agent-api-operation",
          sourceId: t.id,
          targetId: d.apiOperationId
        })),
        ...(e.model.agentQueryUses ?? []).filter((d) => d.agentId === t.id).map((d) => ({ kind: "add-agent-query", sourceId: t.id, targetId: d.queryServiceId })),
        ...(e.model.agentRags ?? []).filter((d) => d.agentId === t.id).map((d) => ({ kind: "add-agent-rag", sourceId: t.id, targetId: d.ragId })),
        ...(e.model.agentDelegations ?? []).filter((d) => d.agentId === t.id || d.delegateAgentId === t.id).map((d) => ({
          kind: "add-agent-delegate",
          sourceId: d.agentId,
          targetId: d.delegateAgentId
        })),
        ...(e.model.actorAgentUses ?? []).filter((d) => d.agentId === t.id).map((d) => ({ kind: "add-actor-agent", sourceId: d.actorId, targetId: t.id })),
        ...(e.model.agentTriggers ?? []).filter((d) => d.agentId === t.id).map((d) => ({ kind: "add-agent-trigger", sourceId: d.eventId, targetId: t.id }))
      ] : null;
    }
    case "add-mcp-gateway":
      return [{ kind: "remove-mcp-gateway", id: t.id }];
    case "remove-mcp-gateway": {
      const c = (e.model.mcpGateways ?? []).find((d) => d.id === t.id);
      return c ? [
        { kind: "add-mcp-gateway", id: c.id, name: c.name },
        ...[
          ...c.mcpServerIds ?? [],
          ...c.apiIds ?? [],
          ...c.apiOperationIds ?? [],
          ...c.useCaseIds ?? [],
          ...c.ragIds ?? []
        ].map((d) => ({ kind: "add-gateway-exposure", sourceId: t.id, targetId: d })),
        ...(e.model.agentGatewayUses ?? []).filter((d) => d.gatewayId === t.id).map((d) => ({ kind: "add-agent-gateway", sourceId: d.agentId, targetId: t.id }))
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
      for (const c of e.model.externalSystems) {
        const d = (c.mcpServers ?? []).find((h) => h.id === t.id);
        if (d)
          return [
            { kind: "add-mcp-server", id: d.id, name: d.name, boundedContextId: c.id, uri: d.uri },
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
      const c = (e.model.rags ?? []).find((d) => d.id === t.id);
      return c ? [
        { kind: "add-rag", id: c.id, name: c.name },
        ...(e.model.agentRags ?? []).filter((d) => d.ragId === t.id).map(
          (d) => ({
            kind: "add-agent-rag",
            sourceId: d.agentId,
            targetId: t.id
          })
        ),
        ...(c.sourceReadModelIds ?? []).map(
          (d) => ({ kind: "add-rag-source", sourceId: t.id, targetId: d })
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
      const c = (e.model.actors ?? []).find((d) => d.id === t.id);
      return c ? [{ kind: "add-actor", id: c.id, name: c.name }] : null;
    }
    case "add-note":
      return [{ kind: "remove-note", id: t.id }];
    case "remove-note": {
      const c = (e.model.notes ?? []).find((d) => d.id === t.id);
      return c ? [
        { kind: "add-note", id: c.id, name: c.text },
        ...[...c.targetIds ?? [], ...c.edgeRefs ?? []].map(
          (d) => ({ kind: "note-attach", id: c.id, targetId: d })
        )
      ] : null;
    }
    case "note-attach":
      return [{ kind: "note-detach", id: t.id, targetId: t.targetId }];
    case "note-detach":
      return [{ kind: "note-attach", id: t.id, targetId: t.targetId }];
    case "add-area":
      return [{ kind: "remove-area", id: t.id }];
    case "remove-area": {
      const c = (e.model.areas ?? []).find((d) => d.id === t.id);
      return c ? [{ kind: "add-area", id: c.id, name: c.name }] : null;
    }
    case "add-application-event":
      return [{ kind: "remove-application-event", id: t.id }];
    case "remove-application-event": {
      for (const c of e.model.boundedContexts) {
        const d = (c.applicationEvents ?? []).find((h) => h.id === t.id);
        if (d)
          return [{ kind: "add-application-event", id: d.id, name: d.name, boundedContextId: c.id }];
      }
      return null;
    }
    case "add-domain-service":
      return [{ kind: "remove-domain-service", id: t.id }];
    case "remove-domain-service": {
      for (const c of e.model.boundedContexts) {
        const d = (c.domainServices ?? []).find((h) => h.id === t.id);
        if (d) return [{ kind: "add-domain-service", id: d.id, name: d.name, boundedContextId: c.id }];
      }
      return null;
    }
    case "add-read-model":
      return [{ kind: "remove-read-model", id: t.id }];
    case "add-projection":
      return [{ kind: "remove-projection", id: t.id }];
    case "remove-projection": {
      const c = (e.model.projections ?? []).find((d) => d.id === t.id);
      return c && (c.sourceAggregateId || c.sourceExternalUseCaseId || c.sourceExternalTableId) ? [
        {
          kind: "add-projection",
          id: c.id,
          name: c.name,
          aggregateId: c.sourceAggregateId,
          externalUseCaseId: c.sourceExternalUseCaseId,
          externalTableId: c.sourceExternalTableId,
          targetId: c.readModelId,
          boundedContextId: c.boundedContextId
        }
      ] : null;
    }
    case "add-external-table":
      return [{ kind: "remove-external-table", id: t.id }];
    case "remove-external-table": {
      for (const c of e.model.externalSystems) {
        const d = (c.tables ?? []).find((h) => h.id === t.id);
        if (d) return [{ kind: "add-external-table", id: d.id, name: d.name, boundedContextId: c.id }];
      }
      return null;
    }
    case "add-rag-content-source":
      return [{ kind: "remove-rag-content-source", sourceId: t.sourceId, uri: t.uri }];
    case "remove-rag-content-source": {
      const c = (m = (f = (e.model.rags ?? []).find((d) => d.id === t.sourceId)) == null ? void 0 : f.contentSources) == null ? void 0 : m.find((d) => d.uri === t.uri);
      return c ? [
        {
          kind: "add-rag-content-source",
          sourceId: t.sourceId,
          type: c.type,
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
      const c = (e.model.apis ?? []).find((d) => d.id === t.id);
      return c ? [
        { kind: "add-api", id: c.id, name: c.name },
        ...c.operations.map(
          (d) => ({
            kind: "add-api-operation",
            apiId: c.id,
            id: d.id,
            name: d.name,
            httpMethod: d.httpMethod,
            path: d.path,
            boundedContextId: d.targetBoundedContextId,
            targetUseCaseId: d.targetUseCaseId
          })
        )
      ] : null;
    }
    case "add-api-operation":
      return [{ kind: "remove-api-operation", apiId: t.apiId, id: t.id }];
    case "remove-api-operation": {
      const c = (y = (e.model.apis ?? []).find((d) => d.id === t.apiId)) == null ? void 0 : y.operations.find((d) => d.id === t.id);
      return c ? [
        {
          kind: "add-api-operation",
          apiId: t.apiId,
          id: c.id,
          name: c.name,
          httpMethod: c.httpMethod,
          path: c.path,
          boundedContextId: c.targetBoundedContextId,
          targetUseCaseId: c.targetUseCaseId
        }
      ] : null;
    }
    case "set-api-operation-target": {
      const c = (I = (e.model.apis ?? []).find((d) => d.id === t.apiId)) == null ? void 0 : I.operations.find((d) => d.id === t.id);
      return c ? [
        {
          kind: "set-api-operation-target",
          apiId: t.apiId,
          id: t.id,
          boundedContextId: c.targetBoundedContextId,
          targetUseCaseId: c.targetUseCaseId
        }
      ] : null;
    }
    case "remove-read-model": {
      for (const c of e.model.boundedContexts) {
        const d = (c.readModels ?? []).find((h) => h.id === t.id);
        if (d != null && d.aggregateId)
          return [{ kind: "add-read-model", id: d.id, name: d.name, aggregateId: d.aggregateId }];
      }
      return null;
    }
    case "remove-domain-event": {
      for (const c of e.model.boundedContexts) {
        const d = (c.domainEvents ?? []).find((h) => h.id === t.id);
        if (d) return [{ kind: "add-domain-event", id: d.id, name: d.name, boundedContextId: c.id }];
      }
      return null;
    }
    case "rename-element": {
      const d = (t.type === "boundedContext" ? e.model.boundedContexts : t.type === "aggregate" ? e.model.aggregates ?? [] : t.type === "domain-event" ? e.model.boundedContexts.flatMap((h) => h.domainEvents ?? []) : t.type === "read-model" ? e.model.boundedContexts.flatMap((h) => h.readModels ?? []) : t.type === "domain-service" ? e.model.boundedContexts.flatMap((h) => h.domainServices ?? []) : t.type === "query-service" ? e.model.boundedContexts.flatMap((h) => h.queryServices ?? []) : t.type === "use-case" ? e.model.boundedContexts.flatMap((h) => h.useCases ?? []) : t.type === "external-use-case" ? e.model.externalSystems.flatMap((h) => h.useCases ?? []) : t.type === "mcp-server" ? e.model.externalSystems.flatMap((h) => h.mcpServers ?? []) : t.type === "application-event" ? e.model.boundedContexts.flatMap((h) => h.applicationEvents ?? []) : t.type === "external-system" ? e.model.externalSystems : t.type === "actor" ? e.model.actors ?? [] : t.type === "ai-agent" ? e.model.aiAgents ?? [] : t.type === "mcp-gateway" ? e.model.mcpGateways ?? [] : e.model.entities ?? []).find((h) => h.id === t.id);
      return d ? [{ kind: "rename-element", type: t.type, id: t.id, name: d.name }] : null;
    }
    case "add-flow":
      return [{ kind: "remove-flow", id: t.id }];
    case "remove-flow": {
      const c = e.model.flows.find((d) => d.id === t.id);
      return c ? [
        {
          kind: "add-flow",
          id: c.id,
          name: c.name,
          archetype: c.archetype,
          triggerAggregateId: c.triggerAggregateId ?? "",
          triggerEvent: c.triggerEvent ?? "",
          targetId: c.targetId,
          readModelName: c.readModelName,
          targetUseCaseId: c.targetUseCaseId
        }
      ] : null;
    }
    case "add-journey":
      return [{ kind: "remove-journey", id: t.id }];
    case "remove-journey": {
      const c = (e.model.journeys ?? []).find((d) => d.id === t.id);
      return c ? [
        { kind: "add-journey", id: c.id, name: c.name },
        ...(c.legs ?? []).map((d) => ({
          kind: "journey-add-leg",
          journeyId: c.id,
          itemId: d.id,
          sourceId: d.sourceId,
          targetId: d.targetId,
          dependsOnStepIds: d.afterLegIds,
          label: d.label
        }))
      ] : null;
    }
    case "journey-add-leg":
      return [{ kind: "journey-remove-leg", journeyId: t.journeyId, itemId: t.itemId }];
    case "journey-remove-leg": {
      const c = (e.model.journeys ?? []).find((h) => h.id === t.journeyId), d = ((c == null ? void 0 : c.legs) ?? []).find((h) => h.id === t.itemId);
      return d ? [{
        kind: "journey-add-leg",
        journeyId: t.journeyId,
        itemId: d.id,
        sourceId: d.sourceId,
        targetId: d.targetId,
        dependsOnStepIds: d.afterLegIds,
        label: d.label
      }] : null;
    }
    case "add-view":
      return [{ kind: "remove-view", id: t.id }];
    case "remove-view": {
      const c = (e.model.views ?? []).find((d) => d.id === t.id);
      return c ? [{ kind: "add-view", id: c.id, name: c.name, memberIds: c.memberIds }] : null;
    }
    case "add-process":
      return [{ kind: "remove-process", id: t.id }];
    case "add-process-step":
      return [{ kind: "remove-process-step", processId: t.processId, id: t.id }];
    case "remove-process-step": {
      const c = (e.model.processes ?? []).find((x) => x.id === t.processId), d = (c == null ? void 0 : c.steps.findIndex((x) => x.id === t.id)) ?? -1;
      if (!c || d < 0) return null;
      const h = c.steps[d];
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
          afterStepId: d > 0 ? c.steps[d - 1].id : void 0
        }
      ];
    }
    case "move-process-step": {
      const c = (e.model.processes ?? []).find((h) => h.id === t.processId), d = (c == null ? void 0 : c.steps.findIndex((h) => h.id === t.id)) ?? -1;
      return !c || d < 0 ? null : [
        {
          kind: "move-process-step",
          processId: t.processId,
          id: t.id,
          afterStepId: d > 0 ? c.steps[d - 1].id : void 0
        }
      ];
    }
    case "update-process-step": {
      const c = (e.model.processes ?? []).find((h) => h.id === t.processId), d = c == null ? void 0 : c.steps.find((h) => h.id === t.id);
      return d ? [
        {
          kind: "update-process-step",
          processId: t.processId,
          id: t.id,
          roleId: d.roleId,
          deadline: d.deadline,
          compensationUseCaseId: d.compensationUseCaseId
        }
      ] : null;
    }
    case "remove-process": {
      const c = (e.model.processes ?? []).find((d) => d.id === t.id);
      return c ? [
        {
          kind: "add-process",
          id: c.id,
          name: c.name,
          boundedContextId: c.ownerBoundedContextId ?? "",
          triggerAggregateId: c.triggerAggregateId,
          triggerEvent: c.triggerEvent,
          steps: c.steps
        }
      ] : null;
    }
    case "add-workflow":
      return [{ kind: "remove-workflow", id: t.id }];
    case "remove-workflow": {
      const c = (e.model.workflows ?? []).find((d) => d.id === t.id);
      return c ? [
        {
          kind: "add-workflow",
          id: c.id,
          name: c.name,
          triggerAggregateId: c.triggerAggregateId,
          triggerDomainServiceId: c.triggerDomainServiceId,
          triggerUseCaseId: c.triggerUseCaseId,
          triggerEvent: c.triggerEvent,
          completionEventName: c.onCompletionEventName,
          workflowSteps: c.steps
        }
      ] : null;
    }
    case "add-workflow-step":
      return [{ kind: "remove-workflow-step", workflowId: t.workflowId, id: t.id }];
    case "remove-workflow-step": {
      const c = (e.model.workflows ?? []).find((x) => x.id === t.workflowId), d = (c == null ? void 0 : c.steps.findIndex((x) => x.id === t.id)) ?? -1;
      if (!c || d < 0) return null;
      const h = c.steps[d];
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
          afterStepId: d > 0 ? c.steps[d - 1].id : void 0
        },
        // Removing a step also strips it from its dependents; restore those edges.
        ...c.steps.filter((x) => x.id !== t.id && (x.dependsOnStepIds ?? []).includes(t.id)).map(
          (x) => ({
            kind: "add-workflow-dependency",
            workflowId: t.workflowId,
            id: x.id,
            dependsOnStepId: t.id
          })
        )
      ];
    }
    case "update-workflow-step": {
      const c = (e.model.workflows ?? []).find((h) => h.id === t.workflowId), d = c == null ? void 0 : c.steps.find((h) => h.id === t.id);
      return d ? [
        {
          kind: "update-workflow-step",
          workflowId: t.workflowId,
          id: t.id,
          emittedEventName: d.emittedEventName,
          targetUseCaseId: d.targetUseCaseId,
          completionEventName: d.completionEventName
        }
      ] : null;
    }
    case "set-workflow-trigger": {
      const c = (e.model.workflows ?? []).find((d) => d.id === t.id);
      return c ? [{
        kind: "set-workflow-trigger",
        id: t.id,
        triggerEvent: c.triggerEvent ?? "",
        triggerAggregateId: c.triggerAggregateId,
        triggerDomainServiceId: c.triggerDomainServiceId,
        triggerUseCaseId: c.triggerUseCaseId
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
function Do(e, t, n, i, o, s, a) {
  var P, $, C;
  const r = new Set((e.model.notes ?? []).map((w) => w.id));
  if (r.has(n) || r.has(i)) {
    const w = r.has(n) ? n : i, k = r.has(n) ? i : n;
    if (w === k) return;
    const E = k.startsWith("edge:") ? k.slice(5) : k.replace(/^(tgt:|flow:)/, "");
    e.command({ kind: "note-attach", id: w, targetId: E });
    return;
  }
  if (e.activeJourneyId && (t === "context-map" || t === "integrations")) {
    const w = (e.model.journeys ?? []).find((k) => k.id === e.activeJourneyId);
    if (w && n !== i) {
      const k = w.legs ?? [], E = k.filter((D) => D.targetId === n).map((D) => D.id);
      let S = k.length + 1;
      for (; k.some((D) => D.id === `leg-${S}`); ) S++;
      e.command({
        kind: "journey-add-leg",
        journeyId: w.id,
        itemId: `leg-${S}`,
        sourceId: n,
        targetId: i,
        dependsOnStepIds: E
      });
      return;
    }
  }
  if (t === "distribution") {
    const w = e.sceneFor("distribution"), k = e.model.modules ?? [], S = ((D) => {
      for (let N = D; N; ) {
        if (k.some((V) => V.id === N)) return N;
        const j = w.nodes.find((V) => V.id === N);
        N = j ? j.ownerId ?? j.parentId : void 0;
      }
      return null;
    })(i);
    if (S && S !== n && (e.model.services ?? []).some((D) => D.id === n)) {
      e.command({ kind: "add-service-module", serviceId: n, id: S });
      return;
    }
    if ((e.model.services ?? []).some((D) => D.id === n)) {
      const D = e.model.boundedContexts.find((V) => V.id === i), N = D ? k.filter((V) => V.boundedContextId === D.id) : [], j = N.find((V) => V.main) ?? N[0];
      if (j) {
        e.command({ kind: "add-service-module", serviceId: n, id: j.id });
        return;
      }
    }
    if (S && S !== n && !k.some((N) => N.id === n) && !e.model.boundedContexts.some((N) => N.id === n)) {
      e.command({ kind: "add-module-element", id: S, elementId: n });
      return;
    }
  }
  if (t === "integrations") {
    Do(e, "context-map", n, i, o, s, a);
    return;
  }
  if (t === "eventstorming") {
    const w = (E) => (e.model.customCodes ?? []).some((S) => S.id === E), k = w(i) ? { stepId: n, ccId: i } : w(n) ? { stepId: i, ccId: n } : null;
    if (k) {
      const E = e.owningUseCaseOf(k.stepId);
      E && e.command({
        kind: "set-use-case-step-custom-code",
        useCaseId: E.id,
        id: k.stepId,
        targetId: k.ccId
      });
      return;
    }
    return;
  }
  if (t === "workflows") {
    const w = (V) => (e.model.actors ?? []).some((X) => X.id === V);
    if (w(n) !== w(i)) {
      const V = w(n) ? n : i, X = w(n) ? i : n, le = e.owningWorkflowOf(X);
      if (le) {
        e.command({ kind: "set-workflow-step-role", workflowId: le.id, id: X, targetId: V });
        return;
      }
    }
    const k = (V) => (e.model.pages ?? []).some((X) => X.id === V);
    if (k(n) !== k(i)) {
      const V = k(n) ? n : i, X = k(n) ? i : n, le = e.owningWorkflowOf(X);
      if (le) {
        e.command({ kind: "set-workflow-step-form", workflowId: le.id, id: X, targetId: V });
        return;
      }
    }
    const E = e.model.workflowGateways ?? [], S = (V) => E.some((X) => X.id === V);
    if (S(n) || S(i) || (e.model.workflows ?? []).some((V) => V.id === i)) {
      if (n === i) return;
      e.command({ kind: "add-workflow-link", sourceId: n, targetId: i });
      return;
    }
    const D = e.owningWorkflowOf(n), N = e.owningWorkflowOf(i);
    if (!D || D !== N || n === i) return;
    const j = D.steps.find((V) => V.id === i);
    if (((j == null ? void 0 : j.dependsOnStepIds) ?? []).includes(n)) return;
    e.command({
      kind: "add-workflow-dependency",
      workflowId: D.id,
      id: i,
      dependsOnStepId: n
    });
    return;
  }
  if (t === "ui") {
    const w = e.model.pages ?? [], k = e.model.uiApps ?? [], E = (G) => k.some((ne) => ne.id === G), S = (G) => w.some((ne) => ne.id === G), D = (G) => (e.model.customCodes ?? []).some((ne) => ne.id === G);
    if (D(n) || D(i)) {
      const G = D(n) ? n : i, ne = D(n) ? i : n;
      if (D(ne)) return;
      if (S(ne)) {
        e.command({ kind: "set-page-custom-code", id: ne, targetId: G });
        return;
      }
      e.command({ kind: "add-custom-code-use", id: G, elementId: ne });
      return;
    }
    const N = e.model.buttonGroups ?? [], j = (G) => N.some((ne) => ne.id === G);
    if ((a === "toolbar" || a === "bottom") && j(n) && S(i)) {
      e.command({ kind: "add-page-bar-group", pageId: i, id: n, bar: a });
      return;
    }
    if (j(n) && j(i) && n !== i) {
      e.command({ kind: "add-group-subgroup", id: i, targetId: n });
      return;
    }
    const V = /^gbtn:([^:]+):(.+)$/.exec(n);
    if (V) {
      e.model.boundedContexts.some((ne) => (ne.useCases ?? []).some((Ce) => Ce.id === i)) ? e.command({ kind: "set-group-button-target", id: V[1], itemId: V[2], useCaseId: i }) : e.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
      return;
    }
    if (a === "home" && E(n) && (S(i) || E(i))) {
      if (i === n) return;
      e.command(
        S(i) ? { kind: "set-app-home-page", appId: n, pageId: i } : { kind: "set-app-home-page", appId: n, pageId: null, toAppId: i }
      );
      return;
    }
    if (a === "header" && E(n) && S(i)) {
      e.command({ kind: "set-app-header-page", appId: n, pageId: i });
      return;
    }
    if ((a === "crud-detail" || a === "crud-create") && S(n) && (S(i) || E(i)) && i !== n) {
      const G = a === "crud-detail" ? "set-crud-detail" : "set-crud-create";
      e.command(
        S(i) ? { kind: G, pageId: n, targetId: i, toAppId: null } : { kind: G, pageId: n, targetId: null, toAppId: i }
      );
      return;
    }
    if (a === "viewmodel" && S(n)) {
      (e.model.models ?? []).some((G) => G.id === i) ? e.command({ kind: "set-page-model", pageId: n, modelId: i }) : e.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
      return;
    }
    if ((a === "view" || a === "edit") && E(n) && S(i)) {
      e.command({
        kind: a === "view" ? "set-app-view-page" : "set-app-edit-page",
        appId: n,
        pageId: i
      });
      return;
    }
    if (a) return;
    const X = (G) => /^wizrow:([^:]+):(.+)$/.exec(G), le = X(n) ?? X(i);
    if (le) {
      const G = X(n) ? i : n;
      S(G) && G !== le[1] && e.command({ kind: "set-wizard-step-page", pageId: le[1], itemId: le[2], targetId: G });
      return;
    }
    const fe = w.find((G) => G.id === i && G.type === "WIZARD");
    if (S(n) && fe && n !== fe.id) {
      (fe.wizardSteps ?? []).some((G) => G.pageId === n) || e.command({ kind: "add-page-wizard-step", pageId: fe.id, targetId: n });
      return;
    }
    if (S(n) && E(i)) {
      const G = w.find((Ce) => Ce.id === n), ne = k.find((Ce) => Ce.id === i);
      if (ne.type === "MASTER_DETAIL" && !ne.headerPageId) {
        e.command({ kind: "set-app-header-page", appId: i, pageId: n }), e.emit("modux-notice", {
          message: `${G.name} es la cabecera de ${ne.name} — las siguientes páginas serán pestañas`
        });
        return;
      }
      e.command({
        kind: "add-menu-item",
        appId: i,
        label: G.name,
        pageId: n,
        itemId: e.newMenuItemId(G.name)
      });
      return;
    }
    const H = e.model.identityProviders ?? [], J = (G) => H.some((ne) => ne.id === G);
    if (J(n) || J(i)) {
      const G = J(n) ? n : i, ne = J(n) ? i : n;
      E(ne) ? e.command({ kind: "set-identity-provider", id: ne, targetId: G }) : e.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
      return;
    }
    const ce = (G) => (e.model.models ?? []).some((ne) => ne.id === G);
    if (ce(n) || ce(i)) {
      const G = ce(n) ? n : i, ne = ce(n) ? i : n;
      if (S(ne)) {
        e.command({ kind: "set-page-model", pageId: ne, modelId: G });
        return;
      }
      if (E(ne)) {
        e.command({ kind: "set-app-model", appId: ne, modelId: G });
        return;
      }
      return;
    }
    const ye = $e(n);
    if (ye != null && ye.itemId && ((P = $e(i)) != null && P.itemId || E(i))) {
      const G = $e(i), ne = e.menuEntryIn(ye.appId, ye.itemId);
      if (!ne) return;
      if (G != null && G.itemId) {
        const Ce = e.menuEntryIn(G.appId, G.itemId);
        if (!Ce) return;
        const Se = (vt) => (vt ?? []).some((Kt) => Kt.id === G.itemId || Se(Kt.children));
        if (ye.appId === G.appId && (G.itemId === ye.itemId || Se(ne.entry.children)))
          return;
        const Be = e.nodeClientRect(i), Oe = Be && s !== void 0 ? (s - Be.top) / Math.max(1, Be.height) : 0.5, et = Oe < 0.3 ? "before" : Oe > 0.7 ? "after" : "nest";
        if (et === "nest")
          e.command({
            kind: "move-menu-item",
            appId: ye.appId,
            toAppId: G.appId,
            itemId: ye.itemId,
            parentId: G.itemId
          });
        else {
          const vt = et === "before" ? G.itemId : Ce.beforeId ?? void 0;
          if (ye.appId === G.appId && Ce.parentId === ne.parentId && vt === ye.itemId) return;
          e.command({
            kind: "move-menu-item",
            appId: ye.appId,
            toAppId: G.appId,
            itemId: ye.itemId,
            parentId: Ce.parentId ?? void 0,
            beforeItemId: vt
          });
        }
        return;
      }
      if (ye.appId === i && !ne.parentId) return;
      e.command({
        kind: "move-menu-item",
        appId: ye.appId,
        toAppId: i,
        itemId: ye.itemId
      });
      return;
    }
    const ke = $e(n) ?? $e(i);
    if (ke) {
      const G = $e(n) ? n : i, ne = $e(n) ? i : n;
      if ((($ = e.sceneFor("ui").nodes.find((Oe) => Oe.id === G)) == null ? void 0 : $.kind) === "menu-group") {
        e.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
        return;
      }
      const Ce = e.model.boundedContexts.some(
        (Oe) => (Oe.useCases ?? []).some((et) => et.id === ne)
      ), Se = (e.model.aggregates ?? []).some((Oe) => Oe.id === ne), Be = e.model.boundedContexts.flatMap((Oe) => Oe.queryServices ?? []).find((Oe) => (Oe.operations ?? []).some((et) => et.id === ne));
      S(ne) ? e.command({ kind: "set-menu-page", pageId: ne, ...ke }) : E(ne) && ne !== ke.appId ? e.command({ kind: "set-menu-app", toAppId: ne, ...ke }) : Ce ? e.command({ kind: "set-menu-use-case", useCaseId: ne, ...ke }) : Se ? e.command({ kind: "set-menu-aggregate", aggregateId: ne, ...ke }) : Be && e.command({
        kind: "set-menu-query-operation",
        queryServiceId: Be.id,
        queryOperationId: ne,
        ...ke
      });
      return;
    }
    if ((e.model.actors ?? []).some((G) => G.id === n) && E(i)) {
      (e.model.actorAppUses ?? []).some((G) => G.actorId === n && G.appId === i) || e.command({ kind: "add-actor-app", actorId: n, appId: i });
      return;
    }
    const _e = S(n) ? { pageId: n, other: i } : S(i) ? { pageId: i, other: n } : null;
    if (_e) {
      const G = new Set(
        e.model.boundedContexts.flatMap((Se) => (Se.useCases ?? []).map((Be) => Be.id))
      ), ne = new Set(
        e.model.boundedContexts.flatMap((Se) => (Se.queryServices ?? []).map((Be) => Be.id))
      ), Ce = w.find((Se) => Se.id === _e.pageId);
      G.has(_e.other) ? (Ce.buttons ?? []).some((Se) => Se.useCaseId === _e.other) || e.command({ kind: "add-page-button", pageId: _e.pageId, useCaseId: _e.other }) : ne.has(_e.other) && e.command({ kind: "set-page-listing", pageId: _e.pageId, queryServiceId: _e.other });
    }
    return;
  }
  if (t === "mappings") {
    const w = e.model.models ?? [], k = Yn(n), E = Yn(i), S = e.model.transformations ?? [], D = e.model.customCodes ?? [], N = (H) => D.some((J) => J.id === H);
    if (N(n) && S.some((H) => H.id === i)) {
      e.command({ kind: "set-transformation-custom-code", id: i, targetId: n });
      return;
    }
    if (N(i) && S.some((H) => H.id === n)) {
      e.command({ kind: "set-transformation-custom-code", id: n, targetId: i });
      return;
    }
    if (N(n)) {
      const H = (E == null ? void 0 : E.modelId) ?? (w.some((J) => J.id === i) ? i : null);
      if (H) {
        const J = (e.model.modelMappings ?? []).filter(
          (ce) => ce.sourceModelId === H || ce.targetModelId === H
        );
        J.length === 1 ? e.command({ kind: "set-mapping-custom-code", id: J[0].id, targetId: n }) : e.emit("modux-notice", {
          message: J.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
        });
        return;
      }
      return;
    }
    if (S.some((H) => H.id === i)) {
      if (E || S.some((J) => J.id === n)) return;
      const H = k ? { modelId: k.modelId, fieldId: k.fieldId } : w.some((J) => J.id === n) ? { modelId: n } : null;
      H && e.command({ kind: "add-transformation-input", id: i, ...H });
      return;
    }
    if (S.some((H) => H.id === n)) {
      const H = E ? { modelId: E.modelId, fieldId: E.fieldId } : w.some((J) => J.id === i) ? { modelId: i } : null;
      H && e.command({ kind: "set-transformation-output", id: n, ...H });
      return;
    }
    if (k && E) {
      if (k.modelId === E.modelId) {
        e.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
        return;
      }
      let H = (e.model.modelMappings ?? []).find(
        (J) => J.sourceModelId === k.modelId && J.targetModelId === E.modelId
      );
      if (!H) {
        const J = w.find((G) => G.id === k.modelId), ce = w.find((G) => G.id === E.modelId);
        if (!J || !ce) return;
        const ye = (G) => G.replace(/[^a-zA-Z0-9]/g, ""), ke = new Set((e.model.modelMappings ?? []).map((G) => G.id));
        let _e = `mapping-${ae(J.name)}-${ae(ce.name)}`;
        for (let G = 2; ke.has(_e); G++) _e = `mapping-${ae(J.name)}-${ae(ce.name)}-${G}`;
        e.command(
          { kind: "add-model-mapping", id: _e, name: `${ye(J.name)}2${ye(ce.name)}`, sourceId: J.id, targetId: ce.id },
          !1
        ), H = { id: _e, name: "", sourceModelId: J.id, targetModelId: ce.id };
      }
      e.command({
        kind: "add-model-mapping-rule",
        id: H.id,
        sourceId: k.fieldId,
        targetId: E.fieldId
      });
      return;
    }
    if (k && w.some((H) => H.id === i) && i !== k.modelId) {
      e.command({ kind: "move-model-field", modelId: k.modelId, fieldId: k.fieldId, targetId: i });
      return;
    }
    if (!w.some((H) => H.id === n) || !w.some((H) => H.id === i) || n === i || (e.model.modelMappings ?? []).some((H) => H.sourceModelId === n && H.targetModelId === i))
      return;
    const j = w.find((H) => H.id === n), V = w.find((H) => H.id === i), X = (H) => H.replace(/[^a-zA-Z0-9]/g, ""), le = new Set((e.model.modelMappings ?? []).map((H) => H.id));
    let fe = `mapping-${ae(j.name)}-${ae(V.name)}`;
    for (let H = 2; le.has(fe); H++) fe = `mapping-${ae(j.name)}-${ae(V.name)}-${H}`;
    e.command({
      kind: "add-model-mapping",
      id: fe,
      name: `${X(j.name)}2${X(V.name)}`,
      sourceId: n,
      targetId: i
    });
    return;
  }
  if (t !== "context-map") return;
  const l = /^apiop:(.+)@(.+)$/.exec(n);
  if (l) {
    const [, w, k] = l, E = (e.model.proxyApis ?? []).find((V) => V.id === k), S = (E == null ? void 0 : E.targetApiId) ?? ((C = (e.model.apiImplementations ?? []).find(
      (V) => V.boundedContextId === k && (e.model.apis ?? []).some(
        (X) => X.id === V.apiId && X.operations.some((le) => le.id === w)
      )
    )) == null ? void 0 : C.apiId);
    if (!S) return;
    if (new Set(
      e.model.boundedContexts.flatMap((V) => (V.useCases ?? []).map((X) => X.id))
    ).has(i)) {
      e.command({
        kind: "set-api-operation-implementation",
        apiId: S,
        operationId: w,
        boundedContextId: k,
        targetUseCaseId: i
      });
      return;
    }
    if (!(E != null && E.targetApiId)) return;
    let N = null;
    if (i === E.targetApiId)
      N = E.targetApiId;
    else {
      const V = /^apiimpl:(.+)@(.+)$/.exec(i);
      V && V[1] === E.targetApiId ? N = V[2] : e.model.boundedContexts.some((X) => X.id === i) && (e.model.apiImplementations ?? []).some(
        (X) => X.apiId === E.targetApiId && X.boundedContextId === i
      ) && (N = i);
    }
    if (!N) return;
    (e.model.proxyOperationRoutes ?? []).some(
      (V) => V.proxyId === E.id && V.operationId === w && V.targetSiteId === N
    ) || e.command({
      kind: "add-proxy-operation-route",
      proxyId: E.id,
      operationId: w,
      targetSiteId: N
    });
    return;
  }
  const p = new Set((e.model.aiAgents ?? []).map((w) => w.id));
  if (p.has(n)) {
    if (new Set(
      e.model.boundedContexts.flatMap((N) => (N.useCases ?? []).map((j) => j.id))
    ).has(i)) {
      (e.model.agentUses ?? []).some(
        (j) => j.agentId === n && j.useCaseId === i
      ) || e.command({ kind: "add-agent-use", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((N) => (N.useCases ?? []).map((j) => j.id))
    ).has(i)) {
      (e.model.agentExternalUses ?? []).some(
        (j) => j.agentId === n && j.externalUseCaseId === i
      ) || e.command({ kind: "add-agent-external-use", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((N) => (N.mcpServers ?? []).map((j) => j.id))
    ).has(i)) {
      (e.model.agentMcpUses ?? []).some(
        (j) => j.agentId === n && j.mcpServerId === i
      ) || e.command({ kind: "add-agent-mcp", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.mcpGateways ?? []).some((N) => N.id === i)) {
      (e.model.agentGatewayUses ?? []).some(
        (j) => j.agentId === n && j.gatewayId === i
      ) || e.command({ kind: "add-agent-gateway", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      (e.model.apis ?? []).flatMap((N) => N.operations.map((j) => j.id))
    ).has(i)) {
      (e.model.agentApiOpUses ?? []).some(
        (j) => j.agentId === n && j.apiOperationId === i
      ) || e.command({ kind: "add-agent-api-operation", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.apis ?? []).some((N) => N.id === i) || (e.model.proxyApis ?? []).some((N) => N.id === i)) {
      (e.model.agentApiUses ?? []).some(
        (j) => j.agentId === n && j.apiId === i
      ) || e.command({ kind: "add-agent-api", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.boundedContexts.flatMap((N) => (N.queryServices ?? []).map((j) => j.id))
    ).has(i)) {
      (e.model.agentQueryUses ?? []).some(
        (j) => j.agentId === n && j.queryServiceId === i
      ) || e.command({ kind: "add-agent-query", sourceId: n, targetId: i });
      return;
    }
    if (p.has(i) && i !== n) {
      (e.model.agentDelegations ?? []).some(
        (j) => j.agentId === n && j.delegateAgentId === i
      ) || e.command({ kind: "add-agent-delegate", sourceId: n, targetId: i });
      return;
    }
    (e.model.rags ?? []).some((N) => N.id === i) && ((e.model.agentRags ?? []).some(
      (j) => j.agentId === n && j.ragId === i
    ) || e.command({ kind: "add-agent-rag", sourceId: n, targetId: i }));
    return;
  }
  if ((e.model.mcpGateways ?? []).some((w) => w.id === n)) {
    const w = (e.model.mcpGateways ?? []).find((S) => S.id === n), k = e.model.externalSystems.some((S) => (S.mcpServers ?? []).some((D) => D.id === i)) || (e.model.apis ?? []).some((S) => S.id === i) || (e.model.apis ?? []).some((S) => S.operations.some((D) => D.id === i)) || e.model.boundedContexts.some((S) => (S.useCases ?? []).some((D) => D.id === i)) || (e.model.rags ?? []).some((S) => S.id === i), E = [
      ...w.mcpServerIds ?? [],
      ...w.apiIds ?? [],
      ...w.apiOperationIds ?? [],
      ...w.useCaseIds ?? [],
      ...w.ragIds ?? []
    ].includes(i);
    k && !E && e.command({ kind: "add-gateway-exposure", sourceId: n, targetId: i });
    return;
  }
  if ((e.model.mcpGateways ?? []).some((w) => w.id === i)) return;
  const g = (e.model.rags ?? []).find((w) => w.id === n);
  if (g) {
    if (new Set(
      e.model.boundedContexts.flatMap((E) => (E.readModels ?? []).map((S) => S.id))
    ).has(i) && !(g.sourceReadModelIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((E) => (E.tables ?? []).map((S) => S.id))
    ).has(i) && !(g.sourceExternalTableIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    if (((e.model.apis ?? []).some((E) => E.id === i) || (e.model.proxyApis ?? []).some((E) => E.id === i)) && !(g.sourceApiIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    if (e.model.externalSystems.some((E) => E.id === i) && !(g.sourceExternalSystemIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    e.model.boundedContexts.some((E) => E.id === i) && !(g.sourceBoundedContextIds ?? []).includes(i) && e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
    return;
  }
  if ((e.model.rags ?? []).some((w) => w.id === i)) return;
  if ((e.model.workflows ?? []).some((w) => w.id === n)) {
    const w = (e.model.workflows ?? []).find((S) => S.id === n), k = (e.model.workflows ?? []).find(
      (S) => S.id === i && S.id !== n
    );
    if (k) {
      const S = w.onCompletionEventName || `${w.name.replace(/\s+/g, "")}Completado`;
      k.triggerEvent !== S && e.command({ kind: "set-workflow-trigger", id: i, triggerEvent: S });
      return;
    }
    const E = e.model.boundedContexts.flatMap((S) => S.useCases ?? []).find((S) => S.id === i);
    if (E && !(w.steps ?? []).some((D) => D.targetUseCaseId === i)) {
      const D = `wfs-${ae(E.name)}`;
      let N = D;
      for (let j = 2; (w.steps ?? []).some((V) => V.id === N); j++)
        N = `${D}-${j}`;
      e.command({
        kind: "add-workflow-step",
        workflowId: n,
        id: N,
        name: E.name,
        targetUseCaseId: i
      });
    }
    return;
  }
  if ((e.model.workflows ?? []).some((w) => w.id === i)) {
    const w = e.model.boundedContexts.flatMap((S) => S.domainEvents ?? []).find((S) => S.id === n), k = e.model.boundedContexts.flatMap((S) => S.applicationEvents ?? []).find((S) => S.id === n), E = w ?? k;
    if (E) {
      const S = (e.model.emissions ?? []).find((V) => V.domainEventId === n), D = new Set((e.model.aggregates ?? []).map((V) => V.id)), N = new Set(
        e.model.boundedContexts.flatMap((V) => (V.domainServices ?? []).map((X) => X.id))
      ), j = new Set(
        e.model.boundedContexts.flatMap((V) => (V.useCases ?? []).map((X) => X.id))
      );
      e.command({
        kind: "set-workflow-trigger",
        id: i,
        triggerEvent: E.name,
        triggerAggregateId: S && D.has(S.sourceId) ? S.sourceId : void 0,
        triggerDomainServiceId: S && N.has(S.sourceId) ? S.sourceId : void 0,
        triggerUseCaseId: S && j.has(S.sourceId) ? S.sourceId : void 0
      });
    }
    return;
  }
  if ((e.model.proxyApis ?? []).some((w) => w.id === n)) {
    const w = (e.model.proxyApis ?? []).find((k) => k.id === n);
    if ((e.model.apis ?? []).some((k) => k.id === i)) {
      w.targetApiId !== i && e.command({ kind: "set-proxy-target", id: n, targetId: i });
      return;
    }
    if (e.model.boundedContexts.some((k) => k.id === i)) {
      if (!w.targetApiId) return;
      (e.model.apiImplementations ?? []).some(
        (E) => E.apiId === w.targetApiId && E.boundedContextId === i
      ) || e.command({ kind: "add-api-implementation", apiId: w.targetApiId, boundedContextId: i });
      return;
    }
    e.model.externalSystems.some((k) => k.id === i) && w.publishedByExternalSystemId !== i && e.command({ kind: "set-api-publisher", id: n, targetId: i });
    return;
  }
  if ((e.model.apis ?? []).some((w) => w.id === n)) {
    if (e.model.externalSystems.some((w) => w.id === i)) {
      (e.model.apis ?? []).find((k) => k.id === n).publishedByExternalSystemId !== i && e.command({ kind: "set-api-publisher", id: n, targetId: i });
      return;
    }
    e.model.boundedContexts.some((w) => w.id === i) && ((e.model.apiImplementations ?? []).some(
      (k) => k.apiId === n && k.boundedContextId === i
    ) || e.command({ kind: "add-api-implementation", apiId: n, boundedContextId: i }));
    return;
  }
  const f = new Set((e.model.actors ?? []).map((w) => w.id));
  if (p.has(i)) {
    if ((/* @__PURE__ */ new Set([
      ...e.model.boundedContexts.flatMap((k) => (k.domainEvents ?? []).map((E) => E.id)),
      ...e.model.boundedContexts.flatMap((k) => (k.applicationEvents ?? []).map((E) => E.id))
    ])).has(n)) {
      (e.model.agentTriggers ?? []).some(
        (E) => E.eventId === n && E.agentId === i
      ) || e.command({ kind: "add-agent-trigger", sourceId: n, targetId: i });
      return;
    }
    if (!f.has(n)) return;
  }
  if (f.has(n)) {
    const w = new Set(
      e.model.boundedContexts.flatMap((E) => (E.useCases ?? []).map((S) => S.id))
    ), k = new Set(
      e.model.boundedContexts.flatMap((E) => (E.queryServices ?? []).map((S) => S.id))
    );
    if (w.has(i) || k.has(i)) {
      (e.model.actorUses ?? []).some(
        (S) => S.actorId === n && S.targetId === i
      ) || e.command({ kind: "add-actor-use", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.aggregates ?? []).some((E) => E.id === i)) {
      e.command({ kind: "add-actor-crud", sourceId: n, targetId: i });
      return;
    }
    if (e.model.externalSystems.some((E) => E.id === i)) {
      (e.model.actorExternalDependencies ?? []).some(
        (S) => S.actorId === n && S.externalSystemId === i
      ) || e.command({ kind: "add-actor-external", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.aiAgents ?? []).some((E) => E.id === i)) {
      (e.model.actorAgentUses ?? []).some(
        (S) => S.actorId === n && S.agentId === i
      ) || e.command({ kind: "add-actor-agent", sourceId: n, targetId: i });
      return;
    }
    return;
  }
  const m = e.owningApiOf(n);
  if (m) {
    if (new Set(
      e.model.boundedContexts.flatMap((k) => (k.useCases ?? []).map((E) => E.id))
    ).has(i)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: m.id,
        id: n,
        targetUseCaseId: i
      });
      return;
    }
    if (e.model.boundedContexts.some((k) => k.id === i)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: m.id,
        id: n,
        boundedContextId: i
      });
      return;
    }
    return;
  }
  const y = (w) => (e.model.notifications ?? []).find((k) => k.id === w);
  if (y(n) || y(i)) {
    const w = y(n) ?? y(i), k = y(n) ? i : n;
    if (e.model.boundedContexts.some(
      (S) => [...S.domainEvents ?? [], ...S.applicationEvents ?? []].some((D) => D.id === k)
    )) {
      w.eventId !== k && e.command({ kind: "set-notification-event", id: w.id, targetId: k });
      return;
    }
    if ((e.model.actors ?? []).some((S) => S.id === k)) {
      (w.recipientRoleIds ?? []).includes(k) || e.command({ kind: "add-notification-recipient", id: w.id, roleId: k });
      return;
    }
    e.emit("modux-notice", {
      message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
    });
    return;
  }
  const I = (w) => (e.model.documents ?? []).find((k) => k.id === w);
  if (I(n) || I(i)) {
    const w = I(n) ?? I(i), k = I(n) ? i : n;
    if ((e.model.models ?? []).find((N) => N.id === k)) {
      e.command({ kind: "set-document-model", id: w.id, modelId: k });
      return;
    }
    const S = e.model.boundedContexts.flatMap((N) => N.queryServices ?? []).find((N) => N.id === k), D = e.model.boundedContexts.flatMap((N) => (N.queryServices ?? []).flatMap((j) => (j.operations ?? []).map((V) => ({ op: V, qs: j })))).find(({ op: N }) => N.id === k);
    if (S || D) {
      e.command({
        kind: "set-document-query",
        id: w.id,
        queryServiceId: (S == null ? void 0 : S.id) ?? D.qs.id,
        queryOperationId: (D == null ? void 0 : D.op.id) ?? null
      });
      return;
    }
    e.emit("modux-notice", {
      message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
    });
    return;
  }
  const c = e.model.identityProviders ?? [], d = (w) => c.find((k) => k.id === w);
  if (d(n) || d(i)) {
    const w = d(n) ?? d(i), k = d(n) ? i : n;
    if (d(n) && e.model.externalSystems.some((D) => D.id === k)) {
      w.publishedByExternalSystemId !== k && e.command({ kind: "set-idp-publisher", id: w.id, targetId: k });
      return;
    }
    const E = e.model.boundedContexts.some((D) => D.id === k), S = (e.model.etlFlows ?? []).some((D) => D.id === k);
    if (E || S) {
      e.command({ kind: "set-identity-provider", id: k, targetId: w.id });
      return;
    }
    e.emit("modux-notice", {
      message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
    });
    return;
  }
  const h = e.model.etlFlows ?? [], x = (w) => h.find((k) => k.id === w);
  if (x(n) || x(i)) {
    const w = x(n) ?? x(i), k = x(n) ? i : n, E = !x(n), S = new Set(e.model.externalSystems.flatMap((J) => (J.tables ?? []).map((ce) => ce.id))), D = /* @__PURE__ */ new Set([
      ...(e.model.apis ?? []).map((J) => J.id),
      ...(e.model.proxyApis ?? []).map((J) => J.id)
    ]), N = (e.model.apis ?? []).find((J) => J.operations.some((ce) => ce.id === k)), j = new Set(
      e.model.boundedContexts.flatMap((J) => [
        ...(J.domainEvents ?? []).map((ce) => ce.id),
        ...(J.applicationEvents ?? []).map((ce) => ce.id)
      ])
    );
    let V = null, X = {};
    if (S.has(k) ? (V = E ? "SOURCE_PULL" : "WRITE_DB", X = { externalTableId: k }) : N ? (V = E ? "SOURCE_PULL" : "WRITE_API", X = { apiId: N.id, operationId: k }) : D.has(k) ? (V = E ? "SOURCE_PULL" : "WRITE_API", X = { apiId: k }) : j.has(k) && (V = E ? "SOURCE_CONSUMER" : "WRITE_EVENT", X = { targetId: k }), !V) {
      e.emit("modux-notice", {
        message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
      });
      return;
    }
    if ((w.steps ?? []).some(
      (J) => J.type === V && (J.externalTableId ?? J.operationId ?? J.apiId ?? J.eventId) === (X.externalTableId ?? X.operationId ?? X.apiId ?? X.targetId)
    )) return;
    const fe = new Set((w.steps ?? []).map((J) => J.id));
    let H = (w.steps ?? []).length + 1;
    for (; fe.has(`ets-${H}`); ) H++;
    e.command({ kind: "add-etl-step", etlFlowId: w.id, id: `ets-${H}`, stepType: V, ...X });
    return;
  }
  const _ = e.model.externalSystems.flatMap((w) => w.useCases ?? []).find((w) => w.id === n), A = e.model.externalSystems.flatMap((w) => w.tables ?? []).find((w) => w.id === n);
  if (_ || A) {
    const w = (_ ?? A).name, k = _ ? { externalUseCaseId: n } : { externalTableId: n }, E = (N) => _ ? N.sourceExternalUseCaseId === n : N.sourceExternalTableId === n, S = e.model.boundedContexts.flatMap((N) => N.readModels ?? []).find((N) => N.id === i);
    if (S) {
      (e.model.projections ?? []).some(
        (j) => E(j) && j.readModelId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ae(w)}-${ae(S.name)}`,
        name: `${S.name}Projection`,
        ...k,
        targetId: i
      });
      return;
    }
    const D = e.model.boundedContexts.find((N) => N.id === i);
    if (D) {
      (e.model.projections ?? []).some(
        (j) => E(j) && j.boundedContextId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ae(w)}-${ae(D.name)}`,
        name: `${w}ViewProjection`,
        ...k,
        boundedContextId: i,
        readModelName: `${w}View`
      });
      return;
    }
    return;
  }
  const L = (e.model.aggregates ?? []).find((w) => w.id === n);
  if (L) {
    const w = e.model.boundedContexts.flatMap((E) => E.readModels ?? []).find((E) => E.id === i);
    if (w) {
      (e.model.projections ?? []).some(
        (S) => S.sourceAggregateId === n && S.readModelId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ae(L.name)}-${ae(w.name)}`,
        name: `${w.name}Projection`,
        aggregateId: n,
        targetId: i
      });
      return;
    }
    const k = e.model.boundedContexts.find((E) => E.id === i);
    if (k) {
      (e.model.projections ?? []).some(
        (S) => S.sourceAggregateId === n && S.boundedContextId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ae(L.name)}-${ae(k.name)}`,
        name: `${L.name}ViewProjection`,
        aggregateId: n,
        boundedContextId: i,
        readModelName: `${L.name}View`
      });
      return;
    }
  }
  const O = new Set(
    e.model.boundedContexts.flatMap((w) => (w.domainEvents ?? []).map((k) => k.id))
  ), R = /* @__PURE__ */ new Set([
    ...(e.model.aggregates ?? []).map((w) => w.id),
    ...e.model.boundedContexts.flatMap((w) => (w.domainServices ?? []).map((k) => k.id))
  ]), W = new Set(
    e.model.boundedContexts.flatMap((w) => (w.applicationEvents ?? []).map((k) => k.id))
  ), v = new Set(e.model.boundedContexts.flatMap((w) => (w.useCases ?? []).map((k) => k.id))), B = new Set(
    e.model.boundedContexts.flatMap((w) => (w.queryServices ?? []).map((k) => k.id))
  );
  if (v.has(n) && B.has(i)) {
    (e.model.queryCalls ?? []).some(
      (k) => k.sourceId === n && k.targetId === i
    ) || e.command({ kind: "add-query-call", sourceId: n, targetId: i });
    return;
  }
  const K = new Set(
    e.model.externalSystems.flatMap((w) => (w.useCases ?? []).map((k) => k.id))
  );
  if (v.has(n) && K.has(i)) {
    (e.model.externalUseCaseCalls ?? []).some(
      (k) => k.sourceId === n && k.targetId === i
    ) || e.command({ kind: "add-external-uc-call", sourceId: n, targetId: i });
    return;
  }
  if (v.has(n) && v.has(i) && n !== i) {
    (e.model.useCaseCalls ?? []).some(
      (k) => k.sourceId === n && k.targetId === i
    ) || e.command({ kind: "add-use-case-call", sourceId: n, targetId: i });
    return;
  }
  const de = e.model.boundedContexts.flatMap((w) => w.scheduledTriggers ?? []).find((w) => w.id === n);
  if (de && v.has(i)) {
    de.useCaseId !== i && e.command({ kind: "set-scheduled-trigger-target", id: n, targetUseCaseId: i });
    return;
  }
  if (v.has(n) && (e.model.aggregates ?? []).some((w) => w.id === i)) {
    (e.model.aggregateCalls ?? []).some(
      (k) => k.sourceId === n && k.targetId === i
    ) || e.command({ kind: "add-aggregate-call", sourceId: n, targetId: i });
    return;
  }
  if (R.has(n) && O.has(i) || v.has(n) && W.has(i)) {
    (e.model.emissions ?? []).some(
      (k) => k.sourceId === n && k.domainEventId === i
    ) || e.command({ kind: "add-emission", sourceId: n, targetId: i });
    return;
  }
  if (O.has(n) || W.has(n)) {
    const w = W.has(n), k = e.model.boundedContexts.flatMap((H) => (w ? H.applicationEvents : H.domainEvents) ?? []).find((H) => H.id === n), E = e.model.boundedContexts.flatMap((H) => (H.useCases ?? []).map((J) => ({ u: J, boundedContext: H }))).find(({ u: H }) => H.id === i), S = e.model.boundedContexts.flatMap((H) => (H.readModels ?? []).map((J) => ({ rm: J, boundedContext: H }))).find(({ rm: H }) => H.id === i), D = e.model.boundedContexts.find((H) => H.id === i) ?? (S == null ? void 0 : S.boundedContext) ?? (E == null ? void 0 : E.boundedContext);
    if (!k || !D) return;
    const N = new Set((e.model.aggregates ?? []).map((H) => H.id)), j = new Set(
      e.model.boundedContexts.flatMap((H) => (H.domainServices ?? []).map((J) => J.id))
    ), V = (e.model.emissions ?? []).find(
      (H) => H.domainEventId === n && (w ? v.has(H.sourceId) : N.has(H.sourceId) || j.has(H.sourceId))
    );
    if (!V) {
      e.emit("modux-notice", {
        message: w ? `Declara primero qué caso de uso publica ${k.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${k.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
        kind: "info"
      });
      return;
    }
    const X = !w && N.has(V.sourceId);
    if (E) {
      if (e.model.flows.some(
        (J) => J.archetype === "TRIGGERS" && J.triggerEvent === k.name && J.targetUseCaseId === E.u.id
      )) return;
      e.command({
        kind: "add-flow",
        id: `flow-${ae(k.name)}-${ae(E.u.name)}`,
        name: E.u.name,
        archetype: "TRIGGERS",
        triggerAggregateId: X ? V.sourceId : "",
        triggerDomainServiceId: !w && !X ? V.sourceId : void 0,
        triggerUseCaseId: w ? V.sourceId : void 0,
        triggerEvent: k.name,
        targetId: D.id,
        targetUseCaseId: E.u.id
      });
      return;
    }
    const le = (S == null ? void 0 : S.rm.name) ?? `${k.name}View`;
    if (e.model.flows.some(
      (H) => H.archetype === "MATERIALIZES" && H.triggerEvent === k.name && H.targetId === D.id && H.readModelName === le
    )) return;
    e.command({
      kind: "add-flow",
      id: `flow-${ae(k.name)}-${ae(le)}`,
      name: le,
      archetype: "MATERIALIZES",
      triggerAggregateId: X ? V.sourceId : "",
      triggerDomainServiceId: !w && !X ? V.sourceId : void 0,
      triggerUseCaseId: w ? V.sourceId : void 0,
      triggerEvent: k.name,
      targetId: D.id,
      readModelName: le
    });
    return;
  }
  const Y = /* @__PURE__ */ new Set([
    ...R,
    ...v,
    ...B,
    ...e.model.boundedContexts.flatMap((w) => (w.readModels ?? []).map((k) => k.id))
  ]);
  if (Y.has(n) || Y.has(i) || O.has(i) || W.has(i))
    return;
  const b = new Set(e.model.externalSystems.map((w) => w.id));
  if (b.has(n)) {
    if (new Set(
      e.model.boundedContexts.flatMap((D) => (D.useCases ?? []).map((N) => N.id))
    ).has(i)) {
      (e.model.externalCalls ?? []).some(
        (N) => N.externalSystemId === n && N.useCaseId === i
      ) || e.command({ kind: "add-external-call", sourceId: n, targetId: i });
      return;
    }
    if (b.has(i) && i !== n) {
      e.openExtDepPicker({ sourceId: n, targetId: i, x: o ?? 0, y: s ?? 0 });
      return;
    }
    const k = (e.model.apis ?? []).find(
      (D) => D.operations.some((N) => N.id === i)
    ), E = /^apiop:(.+)@(.+)$/.exec(i), S = k ? { operationId: i, siteId: k.id } : E ? { operationId: E[1], siteId: E[2] } : null;
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
    if ((e.model.apis ?? []).some((D) => D.id === i) || (e.model.proxyApis ?? []).some((D) => D.id === i)) {
      (e.model.externalSystemDependencies ?? []).some(
        (N) => N.sourceId === n && N.targetId === i
      ) || e.command({ kind: "add-external-dependency", sourceId: n, targetId: i });
      return;
    }
    return;
  }
  b.has(i) || f.has(i);
}
function kc(e, t, n, i, o) {
  var s;
  if (n === "node" && o === "note") {
    e.clearSelection(), e.command({ kind: "remove-note", id: i });
    return;
  }
  if (n === "node" && o === "area") {
    e.clearSelection(), e.command({ kind: "remove-area", id: i });
    return;
  }
  if (n === "edge" && o === "note-link") {
    const a = i.slice(5), r = a.indexOf("->");
    r > 0 && (e.clearSelection(), e.command({ kind: "note-detach", id: a.slice(0, r), targetId: a.slice(r + 2) }));
    return;
  }
  if (o === "invariant" || o === "invariant-containment") {
    const a = o === "invariant" ? i : i.replace(/^protects:.+->/, "");
    e.clearSelection(), e.command({ kind: "remove-invariant", id: a });
    return;
  }
  if (t === "eventstorming" && n === "edge" && o === "es-custom") {
    const a = /^escc:(.+)$/.exec(i), r = a ? e.owningUseCaseOf(a[1]) : null;
    a && r && (e.clearSelection(), e.command({ kind: "set-use-case-step-custom-code", useCaseId: r.id, id: a[1], targetId: null }));
    return;
  }
  if (t === "eventstorming" && n === "node" && o === "custom-code") {
    e.clearSelection(), e.command({ kind: "remove-custom-code", id: i });
    return;
  }
  if (t === "ui") {
    if (n === "edge") {
      let a;
      if (a = /^idpauth:(.+)$/.exec(i))
        e.command({ kind: "set-identity-provider", id: a[1], targetId: null });
      else if (a = /^appheader:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-app-header-page", appId: a[1], pageId: null });
      else if (a = /^apphome:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-app-home-page", appId: a[1], pageId: null });
      else if (a = /^appmodel:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-app-model", appId: a[1], modelId: null });
      else if (a = /^appview:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-app-view-page", appId: a[1], pageId: null });
      else if (a = /^appedit:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-app-edit-page", appId: a[1], pageId: null });
      else if (a = /^cruddetail:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-crud-detail", pageId: a[1], targetId: null, toAppId: null });
      else if (a = /^crudnew:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-crud-create", pageId: a[1], targetId: null, toAppId: null });
      else if (a = /^wizstep:([^:]+):(.+)$/.exec(i))
        e.command({ kind: "set-wizard-step-page", pageId: a[1], itemId: a[2], targetId: null });
      else if (a = /^pgbtn:(.+)->(.+)$/.exec(i))
        e.command({ kind: "remove-page-button", pageId: a[1], useCaseId: a[2] });
      else if (a = /^pglist:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-page-listing", pageId: a[1], queryServiceId: null });
      else if (a = /^pgmodel:(.+)->(.+)$/.exec(i))
        e.command({ kind: "set-page-model", pageId: a[1], modelId: null });
      else if (a = /^actorapp:(.+)->(.+)$/.exec(i))
        e.command({ kind: "remove-actor-app", actorId: a[1], appId: a[2] });
      else if (a = /^menupage:(.+)->[^>]+$/.exec(i)) {
        const r = $e(a[1]);
        r && e.command({ kind: "set-menu-page", pageId: null, ...r });
      } else if (a = /^menuapp:(.+)->[^>]+$/.exec(i)) {
        const r = $e(a[1]);
        r && e.command({ kind: "set-menu-app", toAppId: null, ...r });
      } else if (a = /^menuuc:(.+)->[^>]+$/.exec(i)) {
        const r = $e(a[1]);
        r && e.command({ kind: "set-menu-use-case", useCaseId: null, ...r });
      } else if (a = /^menuagg:(.+)->[^>]+$/.exec(i)) {
        const r = $e(a[1]);
        r && e.command({ kind: "set-menu-aggregate", aggregateId: null, ...r });
      } else if (a = /^menuqop:(.+)->[^>]+$/.exec(i)) {
        const r = $e(a[1]);
        r && e.command({ kind: "set-menu-query-operation", queryServiceId: null, queryOperationId: null, ...r });
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
      const a = $e(i);
      a && e.command({ kind: "remove-menu-item", ...a });
      return;
    }
    if (o === "wizard-step-row") {
      const a = /^wizrow:([^:]+):(.+)$/.exec(i);
      a && e.command({ kind: "remove-page-wizard-step", pageId: a[1], targetId: a[2] });
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
      const a = /^gbtn:([^:]+):(.+)$/.exec(i);
      a && e.command({ kind: "remove-group-button", id: a[1], itemId: a[2] });
      return;
    }
    if (o === "group-subgroup") {
      const a = /^gsub:([^:]+):(.+)$/.exec(i);
      a && e.command({ kind: "remove-group-subgroup", id: a[1], targetId: a[2] });
      return;
    }
    if (n === "edge" && o === "bar-group") {
      const a = /^bargrp:([^:]+):[^:]+:(.+)$/.exec(i);
      a && e.command({ kind: "remove-page-bar-group", pageId: a[1], id: a[2] });
      return;
    }
    if (n === "edge" && o === "gbtn-target") {
      const a = /^gbtnt:([^:]+):(.+)$/.exec(i);
      a && e.command({ kind: "set-group-button-target", id: a[1], itemId: a[2], useCaseId: null });
      return;
    }
    if (n === "edge" && o === "ui-custom-page") {
      const a = /^ccpage:(.+)$/.exec(i);
      a && e.command({ kind: "set-page-custom-code", id: a[1], targetId: null });
      return;
    }
    if (n === "edge" && o === "cc-uses") {
      const a = /^ccuse:(.+)->(.+)$/.exec(i);
      a && e.command({ kind: "remove-custom-code-use", id: a[1], elementId: a[2] });
      return;
    }
    return;
  }
  if (t === "mappings" && n === "edge" && o === "model-mapping") {
    const a = /^mapping:(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "remove-model-mapping", id: a[1] }));
    return;
  }
  if (t === "mappings" && n === "edge" && o === "mapping-rule") {
    const a = /^maprule:([^:]+):(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "remove-model-mapping-rule", id: a[1], itemId: a[2] }));
    return;
  }
  if (t === "mappings" && n === "node" && o === "model-field") {
    const a = Yn(i);
    a && (e.clearSelection(), e.command({ kind: "remove-model-field", modelId: a.modelId, fieldId: a.fieldId }));
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
    const a = /^cctf:(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "set-transformation-custom-code", id: a[1], targetId: null }));
    return;
  }
  if (t === "mappings" && n === "edge" && o === "custom-of-mapping") {
    const a = /^ccmap:(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "set-mapping-custom-code", id: a[1], targetId: null }));
    return;
  }
  if (t === "mappings" && n === "node" && o === "transformation") {
    e.clearSelection(), e.command({ kind: "remove-transformation", id: i });
    return;
  }
  if (t === "mappings" && n === "edge" && o === "transform-input") {
    const a = /^tfin:([^:]+):([^:]+):(.*)$/.exec(i);
    a && (e.clearSelection(), e.command({
      kind: "remove-transformation-input",
      id: a[1],
      modelId: a[2],
      ...a[3] ? { fieldId: a[3] } : {}
    }));
    return;
  }
  if (t === "mappings" && n === "edge" && o === "transform-output") {
    const a = /^tfout:(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "set-transformation-output", id: a[1] }));
    return;
  }
  if (t === "workflows" && n === "edge" && o === "workflow-dependency") {
    const a = /^wfdep:(.+)->(.+)$/.exec(i);
    if (!a) return;
    const r = e.owningWorkflowOf(a[2]);
    if (!r) return;
    e.clearSelection(), e.command({
      kind: "remove-workflow-dependency",
      workflowId: r.id,
      id: a[2],
      dependsOnStepId: a[1]
    });
    return;
  }
  if (t === "workflows" && n === "node" && o === "workflow-gateway") {
    e.clearSelection(), e.command({ kind: "remove-workflow-gateway", id: i });
    return;
  }
  if (t === "workflows" && n === "edge" && o === "wf-role") {
    const a = /^wfrole:(.+)->(.+)$/.exec(i);
    if (a) {
      const r = e.owningWorkflowOf(a[1]);
      r && (e.clearSelection(), e.command({ kind: "set-workflow-step-role", workflowId: r.id, id: a[1] }));
    }
    return;
  }
  if (t === "workflows" && n === "edge" && o === "wf-form") {
    const a = /^wfform:(.+)->(.+)$/.exec(i);
    if (a) {
      const r = e.owningWorkflowOf(a[1]);
      if (!r) return;
      e.clearSelection(), e.command({ kind: "set-workflow-step-form", workflowId: r.id, id: a[1] });
    }
    return;
  }
  if (t === "workflows" && n === "edge" && o === "wf-link") {
    const a = /^wflink:(.+)->(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "remove-workflow-link", sourceId: a[1], targetId: a[2] }));
    return;
  }
  if (n === "node" && o === "workflow") {
    e.clearSelection(), e.command({ kind: "remove-workflow", id: i });
    return;
  }
  if (n === "node" && o === "workflow-step") {
    const a = e.owningWorkflowOf(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-workflow-step", workflowId: a.id, id: i });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "api-impl-wire") {
    const a = /^apiimplwire:(.+)@(.+)$/.exec(i);
    if (!a) return;
    const [, r, l] = a, p = (s = (e.model.apis ?? []).find(
      (g) => g.operations.some((f) => f.id === r)
    )) == null ? void 0 : s.id;
    if (!p) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation-implementation", apiId: p, operationId: r, boundedContextId: l });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "ext-op-use") {
    const a = /^extopuse:(.+)->(.+)@(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({
      kind: "remove-external-operation-use",
      sourceId: a[1],
      operationId: a[2],
      targetSiteId: a[3]
    });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "op-route") {
    const a = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(i);
    if (!a) return;
    const [, r, l, p] = a, g = /^apiimpl:.+@(.+)$/.exec(p), f = g ? g[1] : p;
    e.clearSelection(), e.command({ kind: "remove-proxy-operation-route", proxyId: l, operationId: r, targetSiteId: f });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "relation") {
    const a = /^rel:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-relation", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "emission") {
    const a = /^emit:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-emission", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "projection") {
    const a = /^proj:(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-projection", id: a[1] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "uc-call") {
    const a = /^uccall:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-use-case-call", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "notification-trigger") {
    const a = /^notif:(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "set-notification-event", id: a[1], targetId: null }));
    return;
  }
  if (t === "context-map" && n === "edge" && o === "notification-recipient") {
    const a = /^notifto:([^:]+):(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "remove-notification-recipient", id: a[1], roleId: a[2] }));
    return;
  }
  if (t === "context-map" && n === "edge" && o === "document-query") {
    const a = /^docq:(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "set-document-query", id: a[1], queryServiceId: null, queryOperationId: null }));
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
    const a = /^idp(?:trust|svc):(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "set-identity-provider", id: a[1], targetId: null });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "idp-federation") {
    const a = /^idpfed:(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "set-idp-publisher", id: a[1], targetId: null });
    return;
  }
  if (t === "context-map" && n === "node" && o === "identity-provider") {
    e.clearSelection(), e.command({ kind: "remove-identity-provider", id: i });
    return;
  }
  if ((t === "context-map" || t === "integrations") && n === "edge" && (o === "etl-source" || o === "etl-write")) {
    const a = /^etl:([^:]+):(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-etl-step", etlFlowId: a[1], id: a[2] });
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
    const a = /^journeyleg:([^:]+):(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "journey-remove-leg", journeyId: a[1], itemId: a[2] }));
    return;
  }
  if (t === "distribution" && n === "edge" && o === "deploys") {
    const a = /^deploy:(.+)->(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "remove-service-module", serviceId: a[1], id: a[2] }));
    return;
  }
  if ((t === "context-map" || t === "distribution") && n === "node" && o === "module") {
    e.clearSelection(), e.command({ kind: "remove-module", id: i });
    return;
  }
  if (t === "distribution" && n === "node") {
    const a = e.sceneFor("distribution"), r = (l) => {
      const p = a.nodes.find((g) => g.id === l);
      return p ? p.ownerId ?? p.parentId : void 0;
    };
    for (let l = r(i); l; ) {
      if ((e.model.modules ?? []).some((p) => p.id === l)) {
        e.clearSelection(), e.command({ kind: "remove-module-element", id: l, elementId: i });
        return;
      }
      l = r(l);
    }
    return;
  }
  if (t === "context-map" && n === "edge" && o === "st-fire") {
    const a = /^stfire:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "set-scheduled-trigger-target", id: a[1], targetUseCaseId: null });
    return;
  }
  if (t === "context-map" && n === "node" && o === "scheduled-trigger") {
    e.clearSelection(), e.command({ kind: "remove-scheduled-trigger", id: i });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agg-call") {
    const a = /^aggcall:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate-call", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "qs-call") {
    const a = /^qscall:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-query-call", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "external-call") {
    const a = /^extcall:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-external-call", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "ext-uc-call") {
    const a = /^extuccall:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-external-uc-call", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-use") {
    const a = /^mcp:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-use", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-external-use") {
    const a = /^mcpx:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-external-use", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-mcp") {
    const a = /^mcpsv:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-mcp", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "gateway-exposure") {
    const a = /^gwx:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-gateway-exposure", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-gateway") {
    const a = /^aggw:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-gateway", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-api-op") {
    const a = /^agapi:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api-operation", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-query") {
    const a = /^agqs:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-query", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-delegate") {
    const a = /^agag:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-delegate", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "actor-agent") {
    const a = /^useag:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-actor-agent", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-trigger") {
    const a = /^evag:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-trigger", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (n === "node" && o === "mcp-gateway") {
    e.clearSelection(), e.command({ kind: "remove-mcp-gateway", id: i });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-rag") {
    const a = /^agrag:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-rag", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "rag-source") {
    const a = /^ragsrc:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && (o === "rag-table" || o === "rag-api" || o === "rag-coarse")) {
    const a = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: a[2], targetId: a[1] });
    return;
  }
  if (n === "node" && o === "rag") {
    e.clearSelection(), e.command({ kind: "remove-rag", id: i });
    return;
  }
  if (n === "node" && o === "rag-content-source") {
    const a = /^ragcs:(.+?):(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-rag-content-source", sourceId: a[1], uri: a[2] });
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
    const a = /^apiwire:(.+)$/.exec(i), r = a ? e.owningApiOf(a[1]) : null;
    if (!a || !r) return;
    e.clearSelection(), e.command({ kind: "set-api-operation-target", apiId: r.id, id: a[1] });
    return;
  }
  if (n === "node" && o === "api") {
    e.clearSelection(), e.command({ kind: "remove-api", id: i });
    return;
  }
  if (n === "node" && o === "api-impl") {
    const a = /^apiimpl:(.+)@(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-api-implementation", apiId: a[1], boundedContextId: a[2] });
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
    const a = e.owningApiOf(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation", apiId: a.id, id: i });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "actor-use") {
    const a = /^use:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-actor-use", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "actor-ext") {
    const a = /^extdep:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-actor-external", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "ext-dep") {
    const a = /^xdep:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-external-dependency", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "wf-chain") {
    const a = /^wfchain:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "set-workflow-trigger", id: a[2], triggerEvent: "" });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "agent-api") {
    const a = /^agapi:(.+)->(.+)$/.exec(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && n === "edge" && o === "proxy-target") {
    const a = /^pxt:(.+)->(.+)$/.exec(i);
    if (!a || !(e.model.proxyApis ?? []).some((r) => r.id === a[1])) return;
    e.clearSelection(), e.command({ kind: "set-proxy-target", id: a[1], targetId: "" });
    return;
  }
  if (n === "node" && o === "boundedContext") {
    if ((e.model.aggregates ?? []).some((r) => r.boundedContextId === i)) return;
    e.clearSelection(), e.command({ kind: "remove-boundedContext", id: i });
    return;
  }
  if (n === "node" && o === "aggregate") {
    if ((e.model.entities ?? []).some((r) => r.aggregateId === i)) return;
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
    const a = e.owningProcessOf(i);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-process-step", processId: a.id, id: i });
  }
}
const $c = [
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
], Zi = [
  { type: "boundedContext", label: "Contexto", symbol: "component", color: "#94a3b8", group: "Estratégico" },
  { type: "actor", label: "Actor", symbol: "person", color: "#64748b", group: "Estratégico" },
  { type: "note", label: "Nota", symbol: "note", color: "#ca8a04", group: "Estratégico" },
  { type: "area", label: "Área", symbol: "area", color: "#64748b", group: "Estratégico" },
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
var _c = Object.defineProperty, Cc = Object.getOwnPropertyDescriptor, te = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Cc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && _c(t, n, o), o;
};
const Kn = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Sc = Object.keys(Kn);
function Ot(e, t, n) {
  const i = n.x - n.w / 2, o = n.x + n.w / 2, s = n.y - n.h / 2, a = n.y + n.h / 2;
  let r = 0, l = 1;
  const p = t.x - e.x, g = t.y - e.y;
  for (const [f, m] of [
    [-p, e.x - i],
    [p, o - e.x],
    [-g, e.y - s],
    [g, a - e.y]
  ]) {
    if (f === 0) {
      if (m < 0) return !1;
      continue;
    }
    const y = m / f;
    if (f < 0) {
      if (y > l) return !1;
      y > r && (r = y);
    } else {
      if (y < r) return !1;
      y < l && (l = y);
    }
  }
  return l - r > 0.02;
}
function Ec(e, t, n = 28) {
  const i = new Map(e.nodes.map((p) => [p.id, p])), o = (p) => {
    var f;
    const g = /* @__PURE__ */ new Set();
    for (let m = p; m; m = (f = i.get(m)) == null ? void 0 : f.parentId) g.add(m);
    return g;
  }, s = e.nodes.filter((p) => p.kind !== "area"), a = (p) => p.parentId ? Math.min(n, 6) : n, r = /* @__PURE__ */ new Map(), l = (p, g, f) => {
    const m = a(f), y = { x: f.x, y: f.y, w: f.w + 2 * m, h: f.h + 2 * m }, I = f.w / 2 + m * 1.5, c = f.h / 2 + m * 1.5, d = { x: f.x - I, y: f.y - c }, h = { x: f.x + I, y: f.y - c }, x = { x: f.x - I, y: f.y + c }, _ = { x: f.x + I, y: f.y + c }, A = [];
    for (const L of [d, h, x, _])
      !Ot(p, L, y) && !Ot(L, g, y) && A.push([L]);
    for (const [L, O] of [
      [d, h],
      [h, d],
      [h, _],
      [_, h],
      [_, x],
      [x, _],
      [x, d],
      [d, x]
    ])
      !Ot(p, L, y) && !Ot(O, g, y) && A.push([L, O]);
    return A;
  };
  for (const p of e.edges) {
    if (t[p.id]) continue;
    const g = i.get(p.sourceId), f = i.get(p.targetId);
    if (!g || !f) continue;
    const m = /* @__PURE__ */ new Set([...o(g.id), ...o(f.id)]), y = [
      { x: g.x, y: g.y },
      { x: f.x, y: f.y }
    ];
    for (let I = 0; I < 12; I++) {
      let c = !1;
      e: for (let d = 0; d < y.length - 1; d++)
        for (const h of s) {
          if (m.has(h.id)) continue;
          const x = a(h), _ = { x: h.x, y: h.y, w: h.w + 2 * x, h: h.h + 2 * x };
          if (!Ot(y[d], y[d + 1], _)) continue;
          const A = l(y[d], y[d + 1], h);
          if (!A.length) continue;
          const L = (R) => s.some(
            (W) => W !== h && !m.has(W.id) && Math.abs(R.x - W.x) < W.w / 2 + a(W) / 2 && Math.abs(R.y - W.y) < W.h / 2 + a(W) / 2
          ), O = (R) => {
            let W = 0;
            const v = [y[d], ...R, y[d + 1]];
            for (let B = 0; B < v.length - 1; B++)
              W += Math.hypot(v[B + 1].x - v[B].x, v[B + 1].y - v[B].y);
            return W + (R.some(L) ? 1e4 : 0);
          };
          A.sort((R, W) => O(R) - O(W)), y.splice(d + 1, 0, ...A[0]), c = !0;
          break e;
        }
      if (!c) break;
    }
    y.length > 2 && r.set(
      p.id,
      y.slice(1, -1).map((I) => ({ x: Math.round(I.x), y: Math.round(I.y) }))
    );
  }
  return r;
}
function Ac(e, t) {
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
function Mc(e, t) {
  const n = (e ?? []).find((i) => i.steps.some((o) => o.id === t));
  return n ? { elementType: "process", id: n.id } : null;
}
let Z = class extends Ve {
  constructor() {
    super(...arguments), this.model = {
      boundedContexts: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !1, this._yugo = !0, this.repositories = [], this.dark = !1, this._pendingIds = /* @__PURE__ */ new Set(), this._paletteOpenedForBlank = !1, this._repoPicker = null, this._wfStepPicker = null, this._branchCondEditor = null, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newBoundedContextId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._activeJourneyId = "", this._newJourneyName = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
      this._fullscreen = this.matches(":fullscreen");
    }, this.hostKeydown = (e) => {
      var s;
      const t = e.composedPath()[0], n = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (n === "input" || n === "textarea" || n === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const i = this.renderRoot.querySelector("modux-canvas"), o = (a) => {
        e.preventDefault(), this.onDiagramScopeChange(a);
      };
      switch (e.key) {
        case "p":
        case "P":
          ["context-map", "distribution", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view) && (e.preventDefault(), this._paletteOpen = !this._paletteOpen);
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
          e.preventDefault(), i == null || i.fit(), (s = this.renderRoot.querySelector("modux-explorer")) == null || s.fit();
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
          o("view:context-map");
          break;
        case "4":
          o("view:distribution");
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
      const { id: t, appId: n, beforeId: i, nestRowId: o } = e.detail, s = $e(t);
      if (!(s != null && s.itemId)) return;
      const a = this.menuEntryIn(s.appId, s.itemId);
      if (!a) return;
      const r = (l, p) => (l ?? []).some((g) => g.id === p || r(g.children, p));
      if (o) {
        const l = $e(o);
        if (!(l != null && l.itemId) || l.itemId === s.itemId || s.appId === l.appId && r(a.entry.children, l.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: s.appId,
          toAppId: l.appId,
          itemId: s.itemId,
          parentId: l.itemId
        });
        return;
      }
      if (i) {
        const l = $e(i);
        if (!(l != null && l.itemId) || l.itemId === s.itemId) return;
        const p = this.menuEntryIn(l.appId, l.itemId);
        if (!p || s.appId === l.appId && r(a.entry.children, l.itemId) || s.appId === l.appId && p.parentId === a.parentId && a.beforeId === l.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: s.appId,
          toAppId: l.appId,
          itemId: s.itemId,
          parentId: p.parentId ?? void 0,
          beforeItemId: l.itemId
        });
        return;
      }
      n && this.command({ kind: "move-menu-item", appId: s.appId, toAppId: n, itemId: s.itemId });
    }, this.onWizardSlotRequested = (e) => {
      var s;
      const { id: t, beforeId: n } = e.detail, i = /^wizrow:([^:]+):(.+)$/.exec(t);
      if (!i) return;
      const o = n ? ((s = /^wizrow:[^:]+:(.+)$/.exec(n)) == null ? void 0 : s[1]) ?? null : null;
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
      const { fromPageId: t, toPageId: n, componentId: i, toParentId: o, beforeComponentId: s } = e.detail, a = this.componentIn(t, i);
      if (!a || t === n) return;
      const r = JSON.parse(JSON.stringify(a.node)), { ops: l } = this.rebuildComponentOps(n, r, o ?? void 0, s);
      for (const p of l) this.command(p, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: i }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: n, componentId: i },
        ...this.rebuildComponentOps(t, r, a.parentId ?? void 0, a.beforeId).ops
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
   * Each vista is a full sheet of its own: with one active, the diagram (and the
   * distribution lens) keep geometry AND expansion under the vista's key — coming
   * back must look exactly as it was left. «Todo el modelo» lives on the base keys.
   */
  layoutKey(e) {
    return (e === "context-map" || e === "distribution") && this._activeViewId ? `${e}@view:${this._activeViewId}` : e;
  }
  viewLayout(e) {
    return at(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /**
   * Drops every trace of a node's geometry across ALL views: position and size.
   * Palette ids are name slugs, so deleting «Área» and creating another revives
   * the same id — without this sweep the newcomer would inherit the old clothes.
   */
  purgeNodeGeometry(e) {
    let t = !1;
    const n = { ...this.layout };
    for (const i of Object.keys(n)) {
      const o = at(n[i]);
      if (!(e in o.nodes) && !(e in (o.sizes ?? {}))) continue;
      const s = { ...o.nodes };
      delete s[e];
      const a = { ...o.sizes ?? {} };
      delete a[e], n[i] = { ...o, nodes: s, sizes: a }, t = !0;
    }
    t && (this.layout = n, this.emit("layout-changed", { layout: this.layout }));
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    e.has("model") && this._pendingIds.clear(), e.has("model") && this.pruneStaleEdgePoints(), e.has("model") && !this._paletteOpenedForBlank && this.model.boundedContexts.length === 0 && this.model.externalSystems.length === 0 && (this._paletteOpen = !0, this._paletteOpenedForBlank = !0), (e.has("layout") || e.has("model")) && (this.migrateLevelLayouts(), this.migrateNestedGeometry());
  }
  /**
   * One-shot migration to the Archi-style flat sheets: pre-flat layouts stored a
   * child's position as an OFFSET from its container's centre. Every node is a
   * free box now, so offsets become absolute by walking the ownership chain.
   * Sizes of ex-containers (they were sized to hold children) are dropped.
   */
  migrateNestedGeometry() {
    if (!this.model.boundedContexts.length && !this.model.externalSystems.length) return;
    const e = Object.keys(this.layout).filter(
      (i) => i === "context-map" || i.startsWith("context-map@view:") || i === "distribution" || i.startsWith("distribution@view:")
    );
    let t = !1;
    const n = { ...this.layout };
    for (const i of e) {
      const o = at(n[i]);
      if (o.flat) continue;
      const s = no(
        this.model,
        i.startsWith("distribution") ? "distribution" : "unified"
      ), a = /* @__PURE__ */ new Map(), r = (f, m = 0) => {
        if (m > 12) return o.nodes[f] ?? null;
        const y = a.get(f);
        if (y) return y;
        const I = o.nodes[f], c = s.get(f);
        if (!c)
          return I && a.set(f, I), I ?? null;
        if (!I) return null;
        const d = r(c, m + 1), h = d ? { x: d.x + I.x, y: d.y + I.y } : I;
        return a.set(f, h), h;
      }, l = {};
      for (const f of Object.keys(o.nodes))
        l[f] = r(f) ?? o.nodes[f];
      const p = new Set(s.values()), g = { ...o.sizes ?? {} };
      for (const f of Object.keys(g)) p.has(f) && delete g[f];
      n[i] = { ...o, nodes: l, sizes: g, flat: !0 }, t = !0;
    }
    t && (this.layout = n, this.emit("layout-changed", { layout: this.layout }));
  }
  /**
   * One-shot migration from the pre-single-level world: the four per-level sheets
   * (contexts / detail / operations / distribution) fold into ONE diagram sheet plus
   * the distribution lens. The level the user last worked on wins the geometry; the
   * other levels contribute what it lacks (chip offsets, container sizes). The old
   * global levels become per-element expansion: detail/operations layouts expanded
   * every container, so the migrated `expanded` set reproduces that look.
   */
  migrateLevelLayouts() {
    const e = at(this.layout["context-map"]), t = ["context-map@detail", "context-map@operations", "context-map@distribution"];
    if (!(e.detail !== void 0 || t.some((g) => this.layout[g])) || !this.model.boundedContexts.length && !this.model.externalSystems.length) return;
    const i = { ...this.layout }, o = (g) => at(i[g]), s = e.detail ?? "contexts", a = s === "detail" && i["context-map@detail"] ? o("context-map@detail") : s === "operations" && i["context-map@operations"] ? o("context-map@operations") : e, r = {
      nodes: { ...a.nodes },
      edges: { ...a.edges },
      sizes: { ...a.sizes ?? {} }
    };
    for (const g of ["context-map", "context-map@detail", "context-map@operations"]) {
      const f = o(g);
      for (const [m, y] of Object.entries(f.nodes)) m in r.nodes || (r.nodes[m] = y);
      for (const [m, y] of Object.entries(f.sizes ?? {})) m in r.sizes || (r.sizes[m] = y);
    }
    const l = /* @__PURE__ */ new Set();
    if (s === "contexts" || s === "distribution")
      for (const g of e.collapsed ?? []) l.add(g);
    else {
      const g = new Set(a.collapsed ?? []);
      for (const f of this.model.boundedContexts) l.add(f.id);
      for (const f of this.model.externalSystems) l.add(f.id);
      if (s === "operations") {
        for (const f of this.model.apis ?? []) l.add(f.id);
        for (const f of this.model.proxyApis ?? []) l.add(f.id);
        for (const f of this.model.apiImplementations ?? [])
          l.add(`apiimpl:${f.apiId}@${f.boundedContextId}`);
      }
      for (const f of g) l.delete(f);
    }
    i["context-map"] = { nodes: r.nodes, edges: r.edges, sizes: r.sizes, expanded: [...l] };
    const p = i["context-map@distribution"];
    if (p && !i.distribution) {
      const g = at(p);
      i.distribution = {
        nodes: g.nodes,
        edges: g.edges,
        sizes: g.sizes,
        expanded: g.collapsed ?? []
      };
    }
    for (const g of t) delete i[g];
    this.layout = i, this.emit("layout-changed", { layout: this.layout });
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
    const n = this.sceneFor(this._view), i = new Set(n.edges.map((r) => r.id)), o = new Set(n.nodes.map((r) => r.id)), s = t.filter((r) => {
      if (i.has(r)) return !1;
      const l = /^(?:[a-z-]+:)?(.+?)->(.+)$/i.exec(r);
      return !!l && o.has(l[1]) && o.has(l[2]);
    });
    if (!s.length) return;
    const a = { ...e.edges };
    s.forEach((r) => delete a[r]), this.writeViewLayout(this._view, { ...e, edges: a });
  }
  /**
   * Expanding a node grows its container over the neighbours: nudge the
   * top-level boxes apart (one undoable step) so the map stays legible.
   * Areas group by overlapping — pushing them apart would defeat them.
   */
  declumpView(e) {
    const t = this.viewLayout(e), n = this.sceneFor(e).nodes.filter((a) => !a.parentId && a.kind !== "area"), i = ra(n), o = [...i.keys()].map((a) => ({
      kind: "move-node",
      view: e,
      id: a,
      pos: t.nodes[a] ?? null
    })), s = { ...t.nodes };
    for (const [a, r] of i) {
      const l = n.find((g) => g.id === a), p = t.nodes[a] ?? { x: l.x, y: l.y };
      s[a] = {
        x: Math.round(p.x + (r.x - l.x)),
        y: Math.round(p.y + (r.y - l.y))
      };
    }
    this.writeViewLayout(e, { ...t, nodes: s }), o.length && this.pushUndoEntry(o);
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
    var g, f;
    const t = (this.model.journeys ?? []).find((m) => m.id === this._activeJourneyId);
    if (!t || this._view !== "context-map" && this._view !== "integrations") return e;
    const n = new Set(e.nodes.map((m) => m.id)), i = zi(t), o = /* @__PURE__ */ new Set(), s = [];
    for (const m of t.legs ?? [])
      !n.has(m.sourceId) || !n.has(m.targetId) || (o.add(m.sourceId), o.add(m.targetId), s.push({
        id: `journeyleg:${t.id}:${m.id}`,
        sourceId: m.sourceId,
        targetId: m.targetId,
        kind: "journey",
        color: "#d97706",
        arrow: !0,
        label: `${i.get(m.id) ?? ""}${m.label ? ` · ${m.label}` : ""}`,
        tooltip: `Tramo ${i.get(m.id)} de «${t.name}» — Supr lo quita`
      }));
    const a = new Set(o), r = new Map(e.nodes.map((m) => [m.id, m]));
    for (const m of o)
      for (let y = (g = r.get(m)) == null ? void 0 : g.parentId; y; y = (f = r.get(y)) == null ? void 0 : f.parentId) a.add(y);
    const l = new Set(s.map((m) => m.id)), p = Ui(t).map((m) => m.map((y) => `journeyleg:${t.id}:${y}`).filter((y) => l.has(y))).filter((m) => m.length > 0).filter((m, y, I) => I.findIndex((c) => c.join("|") === m.join("|")) === y);
    return {
      nodes: e.nodes.map((m) => a.has(m.id) ? m : { ...m, dim: !0 }),
      edges: [...e.edges.map((m) => ({ ...m, dim: !0 })), ...s],
      journeyRuns: p
    };
  }
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const n = Ec(e, t);
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
    const { id: t, x: n, y: i } = e.detail, o = this._view, s = this.viewLayout(o), a = s.nodes[t] ?? null;
    let r = { x: n, y: i };
    const l = this.sceneFor(o), p = l.nodes.find((f) => f.id === t);
    if (p != null && p.parentId) {
      const f = l.nodes.find((m) => m.id === p.parentId);
      f && (r = { x: n - f.x, y: i - f.y });
    }
    this.writeViewLayout(o, { ...s, nodes: { ...s.nodes, [t]: r } });
    const g = [{ kind: "move-node", view: o, id: t, pos: a }];
    if (o === "processes") {
      const f = this.stepReorderCommand(t);
      if (f) {
        const m = this.inverseOf(f);
        m && g.unshift(...m), this.command(f, !1);
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
    const { id: t, targetId: n, x: i, y: o } = e.detail, s = this.model.externalSystems.find((c) => c.id === t);
    if (s) {
      const c = n ? this.model.externalSystems.find((R) => R.id === n) : null;
      if (n && !c) return;
      for (let R = c; R; ) {
        if (R.id === t) return;
        const W = R.parentExternalSystemId;
        R = W ? this.model.externalSystems.find((v) => v.id === W) ?? null : null;
      }
      const d = (c == null ? void 0 : c.id) ?? null;
      if ((s.parentExternalSystemId ?? null) === d) return;
      const h = this._view, x = this.viewLayout(h), _ = this.sceneFor(h), A = d ? _.nodes.find((R) => R.id === d) : void 0, L = A ? { x: i - A.x, y: o - A.y } : { x: i, y: o }, O = d ? (this.model.externalSystemDependencies ?? []).filter(
        (R) => R.sourceId === t && R.targetId === d || R.sourceId === d && R.targetId === t
      ) : [];
      this.pushUndoEntry([
        { kind: "set-external-system-parent", id: t, parentId: s.parentExternalSystemId ?? null },
        ...O.map((R) => ({
          kind: "add-external-dependency",
          sourceId: R.sourceId,
          targetId: R.targetId,
          ...R.type === "CQRS" ? { type: "CQRS" } : {}
        })),
        { kind: "move-node", view: h, id: t, pos: x.nodes[t] ?? null }
      ]), this.command({ kind: "set-external-system-parent", id: t, parentId: d }, !1), this.writeViewLayout(h, { ...x, nodes: { ...x.nodes, [t]: L } });
      return;
    }
    const a = (this.model.apis ?? []).find((c) => c.id === t) ?? (this.model.proxyApis ?? []).find((c) => c.id === t);
    if (!a || n && !this.model.externalSystems.some((c) => c.id === n)) return;
    const r = a.publishedByExternalSystemId ?? "", l = n ?? "";
    if (l === r) return;
    const p = this._view, g = this.viewLayout(p), f = this.sceneFor(p), m = l ? f.nodes.find((c) => c.id === l) : void 0, y = m ? { x: i - m.x, y: o - m.y } : { x: i, y: o }, I = [
      { kind: "set-api-publisher", id: t, targetId: r },
      { kind: "move-node", view: p, id: t, pos: g.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: l }, !1), this.writeViewLayout(p, { ...g, nodes: { ...g.nodes, [t]: y } }), this.pushUndoEntry(I);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: n, x: i, y: o } = e.detail, s = (this.model.apis ?? []).find((I) => I.id === t), a = this.model.externalSystems.find((I) => I.id === n);
    if (!s || !a || (this.model.proxyApis ?? []).some(
      (I) => I.targetApiId === t && I.publishedByExternalSystemId === n
    )) return;
    const l = `proxy-${ae(s.name)}-${ae(a.name)}`;
    if ((this.model.proxyApis ?? []).some((I) => I.id === l)) return;
    const p = this._view, g = this.viewLayout(p), m = this.sceneFor(p).nodes.find((I) => I.id === n);
    this.command(
      {
        kind: "add-proxy-api",
        id: l,
        name: `${s.name}@${a.name}`,
        targetId: t,
        boundedContextId: n
      },
      !1
    );
    const y = [{ kind: "remove-proxy-api", id: l }];
    m && (y.push({ kind: "move-node", view: p, id: l, pos: g.nodes[l] ?? null }), this.writeViewLayout(p, {
      ...g,
      nodes: { ...g.nodes, [l]: { x: i - m.x, y: o - m.y } }
    })), this.pushUndoEntry(y);
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
    const t = e.target, n = (r = t.files) == null ? void 0 : r[0];
    if (t.value = "", !n) return;
    const i = await n.text(), o = this.selectedApiId(), s = o ? null : ((l = this.model.externalSystems.find((g) => g.id === this._selectedId)) == null ? void 0 : l.id) ?? null, a = o || s ? null : ((p = this.model.boundedContexts.find((g) => g.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
    if (!o && !s && !a) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: i,
      fileName: n.name,
      apiId: o,
      homeExternalId: s,
      homeBoundedContextId: a
    });
  }
  /** One dropdown drives the diagram: the map, the distribution lens, or a specialized view. */
  onDiagramScopeChange(e) {
    e.startsWith("view:") && (this._view = e.slice(5), (this._view === "context-map" || this._view === "distribution") && (this._paletteOpen = !0));
  }
  /** Expansion is a sheet preference (persisted with the vista, not undoable). */
  onNodeCollapseToggled(e) {
    const { id: t } = e.detail, n = this._view, i = this.viewLayout(n), o = new Set(i.expanded ?? []), s = !o.has(t);
    s ? o.add(t) : o.delete(t), this.writeViewLayout(n, { ...i, expanded: [...o] }), s && this.declumpView(n);
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, n = this._view, i = this.viewLayout(n), o = this.sceneFor(n), s = { ...i.nodes }, a = [];
    for (const { id: r, x: l, y: p } of t) {
      a.push({ kind: "move-node", view: n, id: r, pos: i.nodes[r] ?? null });
      let g = { x: l, y: p };
      const f = o.nodes.find((m) => m.id === r);
      if (f != null && f.parentId) {
        const m = o.nodes.find((y) => y.id === f.parentId);
        m && (g = { x: l - m.x, y: p - m.y });
      }
      s[r] = g;
    }
    if (this.writeViewLayout(n, { ...i, nodes: s }), n === "processes")
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
    var y;
    const { id: t, x: n, y: i, w: o, h: s } = e.detail, a = this._view, r = this.viewLayout(a), l = this.sceneFor(a), p = l.nodes.find((I) => I.id === t), g = p != null && p.parentId ? l.nodes.find((I) => I.id === p.parentId) : void 0, f = g ? [] : l.nodes.filter((I) => I.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((y = r.sizes) == null ? void 0 : y[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: r.nodes[t] ?? null },
      ...f.map((I) => ({ kind: "move-node", view: a, id: I.id, pos: r.nodes[I.id] ?? null }))
    ]);
    const m = {
      ...r.nodes,
      [t]: g ? { x: n - g.x, y: i - g.y } : { x: n, y: i }
    };
    for (const I of f) m[I.id] = { x: I.x - n, y: I.y - i };
    this.writeViewLayout(a, {
      ...r,
      nodes: m,
      sizes: { ...r.sizes ?? {}, [t]: { w: o, h: s } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: n } = e.detail, i = this._view, o = this.viewLayout(i);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: i, id: t, points: o.edges[t] ?? null }
    ]);
    const s = { ...o.edges };
    s[t] = n, this.writeViewLayout(i, { ...o, edges: s });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const n = di(this.model, this.viewLayout("processes").nodes), i = new Map(n.nodes.map((a) => [a.id, a.x])), o = [...t.steps].sort(
      (a, r) => (i.get(a.id) ?? 0) - (i.get(r.id) ?? 0)
    );
    if (o.every((a, r) => a.id === t.steps[r].id)) return null;
    const s = o.findIndex((a) => a.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: s > 0 ? o[s - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: n, x: i, y: o, connectKind: s } = e.detail;
    this.applyConnection(t, n, i, o, s);
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
  /** Supr with a multi-selection: one confirmation covers the whole batch. */
  onDeleteSelectionRequested(e) {
    const { items: t } = e.detail;
    this._multi = [], t.length && this.openDeletePicker(t.map((n) => ({ elementType: "node", id: n.id, kind: n.kind })));
  }
  onDeleteRequested(e) {
    const { elementType: t, id: n, kind: i } = e.detail;
    if (t !== "node") {
      this.performDelete(t, n, i);
      return;
    }
    this.openDeletePicker([{ elementType: t, id: n, kind: i }]);
  }
  /**
   * Model deletions are destructive enough to warrant a stop: the picker confirms them, and —
   * when a modux View is active and EVERY node is a member — also offers the gentle
   * alternative of only taking them out of the view.
   */
  openDeletePicker(e) {
    const t = (this.model.views ?? []).find((i) => i.id === this._activeViewId), n = t ? e.map((i) => this.memberIdOf(i.id, i.kind)).filter((i) => !!i && t.memberIds.includes(i)) : [];
    this._deletePicker = {
      items: e,
      memberIds: n.length === e.length ? n : []
    };
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
    return wc(this.gestureHost(), e);
  }
  applyConnection(e, t, n, i, o) {
    Do(this.gestureHost(), this._view, e, t, n, i, o);
  }
  performDelete(e, t, n) {
    kc(this.gestureHost(), this._view, e, t, n);
  }
  /** The thin surface the extracted gesture/undo vocabulary works against. */
  gestureHost() {
    return {
      model: this.model,
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
      rebuildComponentOps: (e, t, n, i, o, s) => this.rebuildComponentOps(e, t, n, i, o, s),
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
    (n === "note" || n === "area" || n === "boundedContext" || n === "aggregate" || n === "entity" || n === "process-step" || n === "workflow" || n === "workflow-step" || n === "domain-event" || n === "read-model" || n === "domain-service" || n === "query-service" || n === "use-case" || n === "external-use-case" || n === "external-table" || n === "mcp-server" || n === "mcp-gateway" || n === "application-event" || n === "external-system" || n === "actor" || n === "ai-agent" || n === "rag" || n === "api" || n === "proxy-api" || n === "api-operation") && this.command({ kind: "rename-element", type: n, id: t.replace(/^tgt:/, ""), name: i });
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
    const t = zi(e);
    return {
      name: e.name,
      legs: (e.legs ?? []).map((n) => ({
        id: n.id,
        sourceId: n.sourceId,
        targetId: n.targetId,
        num: t.get(n.id) ?? "",
        label: n.label
      })),
      runs: Ui(e)
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
    const t = new Set(e.memberIds), n = (o, s, a = {}) => M`
      <label
        class="${a.child ? "child" : ""} ${a.implicit && !t.has(o) ? "implicit" : ""}"
        title=${a.implicit && !t.has(o) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(o)}
          @change=${(r) => this.toggleViewMember(o, r.target.checked)}
        />
        ${s}
      </label>
    `, i = (o, s) => s.length ? M`<h4>${o}</h4>${s}` : "";
    return M`
      <aside class="view-tree" @pointerdown=${(o) => o.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${i(
      "Contextos",
      this.model.boundedContexts.flatMap((o) => [
        n(o.id, o.name),
        ...(this.model.aggregates ?? []).filter((s) => s.boundedContextId === o.id).map((s) => n(s.id, s.name, { child: !0, implicit: t.has(o.id) }))
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
    const e = this._newViewName.trim(), t = this.memberIdsFromSelection(), n = t.length ? t : this.visibleMemberIds();
    if (!e || !n.length) return;
    const i = `view-${ae(e)}`;
    this.command({ kind: "add-view", id: i, name: e, memberIds: n }), this._newViewName = "", this._multi = [], this.activateVista(i);
  }
  /** The catalog members currently on stage as top-level nodes (vista candidates). */
  visibleMemberIds() {
    const e = /* @__PURE__ */ new Set([
      "boundedContext",
      "external-system",
      "process",
      "workflow",
      "actor",
      "ai-agent",
      "rag",
      "mcp-gateway",
      "api",
      "proxy-api",
      "ui-app",
      "page",
      "aggregate",
      "entity"
    ]);
    return [...new Set(
      this.sceneFor(this._view).nodes.filter((t) => !t.parentId && e.has(t.kind)).map((t) => t.id.replace(/^tgt:/, ""))
    )];
  }
  /**
   * Activating a vista opens ITS sheet; the first visit seeds it as a copy of
   * what the user is looking at — from then on each vista lives its own life.
   */
  activateVista(e) {
    if (e && (this._view === "context-map" || this._view === "distribution")) {
      const t = `${this._view}@view:${e}`, n = at(this.layout[t]);
      if (!Object.keys(n.nodes).length && !Object.keys(n.sizes ?? {}).length && !(n.expanded ?? []).length) {
        const o = this.viewLayout(this._view);
        this.layout = {
          ...this.layout,
          [t]: {
            nodes: { ...o.nodes },
            edges: { ...o.edges },
            sizes: { ...o.sizes ?? {} },
            expanded: [...o.expanded ?? []],
            flat: !0
          }
        }, this.emit("layout-changed", { layout: this.layout });
      }
    }
    this._activeViewId = e;
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((y) => y.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), n = this.model.boundedContexts.filter((y) => t.has(y.id)), i = new Set(n.map((y) => y.id)), o = this.model.externalSystems.filter((y) => t.has(y.id)), s = new Set(o.map((y) => y.id)), a = (this.model.aggregates ?? []).filter(
      (y) => t.has(y.id) || i.has(y.boundedContextId)
    ), r = new Set(a.map((y) => y.id)), l = (this.model.uiApps ?? []).filter((y) => t.has(y.id)), p = /* @__PURE__ */ new Set(), g = (y) => {
      for (const I of y ?? [])
        I.pageId && p.add(I.pageId), g(I.children);
    };
    l.forEach((y) => g(y.menuItems));
    const f = (this.model.pages ?? []).filter(
      (y) => t.has(y.id) || p.has(y.id)
    ), m = new Set(l.map((y) => y.id));
    return {
      ...this.model,
      uiApps: l,
      pages: f,
      actorAppUses: (this.model.actorAppUses ?? []).filter((y) => m.has(y.appId)),
      boundedContexts: n,
      externalSystems: o,
      relations: this.model.relations.filter(
        (y) => i.has(y.sourceId) && i.has(y.targetId)
      ),
      flows: this.model.flows.filter(
        (y) => t.has(y.id) || (i.has(y.sourceId) || s.has(y.sourceId)) && (i.has(y.targetId) || s.has(y.targetId))
      ),
      aggregates: a,
      entities: (this.model.entities ?? []).filter((y) => r.has(y.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (y) => r.has(y.sourceAggregateId) && r.has(y.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (y) => t.has(y.id) || (y.ownerBoundedContextId ? i.has(y.ownerBoundedContextId) : !1)
      ),
      // Workflows have no owner boundedContext (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((y) => t.has(y.id)),
      // Top-level AI/strategic pieces scope by membership too — a curated view
      // about one subdomain should not drag every agent and gateway along.
      actors: (this.model.actors ?? []).filter((y) => t.has(y.id)),
      aiAgents: (this.model.aiAgents ?? []).filter((y) => t.has(y.id)),
      rags: (this.model.rags ?? []).filter((y) => t.has(y.id)),
      mcpGateways: (this.model.mcpGateways ?? []).filter((y) => t.has(y.id)),
      apis: (this.model.apis ?? []).filter(
        (y) => t.has(y.id) || (y.publishedByExternalSystemId ? s.has(y.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (y) => t.has(y.id) || (y.publishedByExternalSystemId ? s.has(y.publishedByExternalSystemId) : !1)
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
      const i = /^wflink:(.+)->(.+)$/.exec(e.detail.id), o = i ? (this.model.workflowGateways ?? []).find((s) => s.id === i[1]) : null;
      if (i && o && o.type === "SPLIT" && o.semantics === "EXCLUSIVE") {
        const s = ((n = (o.branchConditions ?? []).find((a) => a.targetId === i[2])) == null ? void 0 : n.expression) ?? "";
        this._branchCondEditor = { gatewayId: o.id, targetId: i[2], value: s };
      }
      return;
    }
    if (this._view === "workflows" && e.detail.kind === "workflow-gateway") {
      const i = (this.model.workflowGateways ?? []).find((s) => s.id === e.detail.id);
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
      const i = (this.model.aggregates ?? []).find((o) => (o.invariants ?? []).some((s) => s.id === e.detail.id));
      i && this.openInDrawer({ elementType: "aggregate", id: i.id });
      return;
    }
    const t = e.detail.kind === "process-step" ? Mc(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Ac(e.detail.id, e.detail.kind);
    t && this.openInDrawer(t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), n = (s) => {
      for (const a of s ?? [])
        a.id && t.add(a.id), n(a.children);
    };
    (this.model.uiApps ?? []).forEach((s) => n(s.menuItems));
    const i = `mi-${ae(e)}`;
    let o = i;
    for (let s = 2; t.has(o); s++) o = `${i}-${s}`;
    return o;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const n = (this.model.pages ?? []).find((s) => s.id === e);
    let i = null;
    const o = (s, a) => {
      var l;
      const r = s ?? [];
      for (let p = 0; p < r.length; p++)
        r[p].id === t && (i = { node: r[p], parentId: a, beforeId: ((l = r[p + 1]) == null ? void 0 : l.id) ?? null }), o(r[p].children, r[p].id);
    };
    return o(n == null ? void 0 : n.content, null), i;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, n, i, o = !1, s) {
    const a = s ?? this.allComponentIds(), r = (f) => {
      if (!o) return f.id;
      const m = `cmp-${ae(f.kind)}`;
      let y = m;
      for (let I = 2; a.has(y) || a.has(`${y}-tab-1`); I++) y = `${m}-${I}`;
      return a.add(y), y;
    }, l = [], p = (f, m) => {
      const y = r(f);
      l.push({ kind: "add-page-component", pageId: e, componentId: y, componentKind: f.kind, parentComponentId: m }), f.kind === "tabLayout" && (l.push({ kind: "remove-page-component", pageId: e, componentId: `${y}-tab-1` }), l.push({ kind: "remove-page-component", pageId: e, componentId: `${y}-tab-2` })), l.push({
        kind: "set-page-component",
        pageId: e,
        componentId: y,
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
      for (const I of f.children ?? []) p(I, y);
      return y;
    }, g = p(t, n);
    return i && l.push({
      kind: "move-page-component",
      pageId: e,
      componentId: g,
      parentComponentId: n ?? null,
      beforeComponentId: i
    }), { ops: l, rootId: g };
  }
  allComponentIds() {
    const e = /* @__PURE__ */ new Set(), t = (n) => {
      for (const i of n ?? [])
        e.add(i.id), t(i.children);
    };
    return (this.model.pages ?? []).forEach((n) => t(n.content)), e;
  }
  newComponentId(e) {
    const t = /* @__PURE__ */ new Set(), n = (s) => {
      for (const a of s ?? [])
        t.add(a.id), n(a.children);
    };
    (this.model.pages ?? []).forEach((s) => n(s.content));
    const i = `cmp-${ae(e)}`;
    let o = i;
    for (let s = 2; t.has(o) || t.has(`${o}-tab-1`); s++) o = `${i}-${s}`;
    return o;
  }
  /** Re-slots a wizard step unless it already sits exactly there. */
  moveWizardStep(e, t, n) {
    var s;
    if (n === t) return;
    const i = (((s = (this.model.pages ?? []).find((a) => a.id === e)) == null ? void 0 : s.wizardSteps) ?? []).map((a) => a.id ?? a.pageId), o = i.indexOf(t);
    o >= 0 && (n ? i[o + 1] === n : o === i.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: n });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const n = (this.model.uiApps ?? []).find((s) => s.id === e);
    let i = null;
    const o = (s, a) => {
      var l;
      const r = s ?? [];
      for (let p = 0; p < r.length; p++)
        r[p].id === t && (i = { entry: r[p], parentId: a, beforeId: ((l = r[p + 1]) == null ? void 0 : l.id) ?? null }), o(r[p].children, r[p].id ?? null);
    };
    return o(n == null ? void 0 : n.menuItems, null), i;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var a;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, n, i = null;
    if (this._selectedCmp) {
      const r = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!r) return;
      t = this._selectedCmp.pageId, pe.LEAF_KINDS.has(r.node.kind) ? (n = r.parentId ?? void 0, i = r.beforeId) : n = r.node.kind === "tabLayout" && e.kind !== "tab" ? (a = (r.node.children ?? [])[0]) == null ? void 0 : a.id : r.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((r) => r.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: o, rootId: s } = this.rebuildComponentOps(t, e, n, i, !0);
    for (const r of o) this.command(r, !1);
    this.pushUndoEntry([{ kind: "remove-page-component", pageId: t, componentId: s }]), this._selectedCmp = { pageId: t, componentId: s };
  }
  /** The «Diseño» surface: every page as a frame, edited in place (Figma-style). */
  renderFigma() {
    const e = this.viewLayout("design");
    return M`<modux-figma
      .pages=${this.filteredModel().pages ?? []}
      .layout=${e.nodes}
      .sizes=${e.sizes ?? {}}
      @frame-resized=${(t) => {
      var a;
      const { id: n, w: i, h: o } = t.detail, s = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: n, size: ((a = s.sizes) == null ? void 0 : a[n]) ?? null }
      ]), this.writeViewLayout("design", {
        ...s,
        sizes: { ...s.sizes ?? {}, [n]: { w: i, h: o } }
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
      const { pageId: n, fieldId: i, stereotype: o, colspan: s, label: a } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: n, fieldId: i, stereotype: o, colspan: s, label: a });
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
            (o) => (o.operations ?? []).map((s) => ({ id: s.id, name: `${s.name} (${o.name})` }))
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
    var r;
    const t = (r = e.dataTransfer) == null ? void 0 : r.getData("application/x-modux-palette");
    if (!t) return;
    e.preventDefault();
    const n = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._yugo ? this.renderRoot.querySelector("modux-explorer") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!n) return;
    const i = n.sceneFromClient(e.clientX, e.clientY), o = n.nodeIdAtClient(e.clientX, e.clientY), s = this._view === "design" && "dropSlotAtClient" in n ? n.dropSlotAtClient(e.clientX, e.clientY) : null;
    let a;
    try {
      a = JSON.parse(t);
    } catch {
      return;
    }
    a.new ? this.createFromPalette(a.new, i, o, s) : a.existing && this.placeExistingFromPalette(a.existing, i, o, e.clientX, e.clientY, s);
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
      i.boundedContexts.map((s) => s.id),
      i.boundedContexts.flatMap((s) => (s.useCases ?? []).map((a) => a.id)),
      i.boundedContexts.flatMap((s) => (s.domainEvents ?? []).map((a) => a.id)),
      i.boundedContexts.flatMap((s) => (s.applicationEvents ?? []).map((a) => a.id)),
      i.boundedContexts.flatMap((s) => (s.readModels ?? []).map((a) => a.id)),
      i.boundedContexts.flatMap((s) => (s.domainServices ?? []).map((a) => a.id)),
      i.boundedContexts.flatMap((s) => (s.queryServices ?? []).map((a) => a.id)),
      i.boundedContexts.flatMap((s) => (s.scheduledTriggers ?? []).map((a) => a.id)),
      (i.aggregates ?? []).map((s) => s.id),
      (i.entities ?? []).map((s) => s.id),
      (i.actors ?? []).map((s) => s.id),
      (i.notes ?? []).map((s) => s.id),
      (i.areas ?? []).map((s) => s.id),
      i.externalSystems.map((s) => s.id),
      i.externalSystems.flatMap((s) => (s.useCases ?? []).map((a) => a.id)),
      i.externalSystems.flatMap((s) => (s.tables ?? []).map((a) => a.id)),
      i.externalSystems.flatMap((s) => (s.mcpServers ?? []).map((a) => a.id)),
      (i.apis ?? []).map((s) => s.id),
      (i.apis ?? []).flatMap((s) => (s.operations ?? []).map((a) => a.id)),
      (i.proxyApis ?? []).map((s) => s.id),
      (i.aiAgents ?? []).map((s) => s.id),
      (i.mcpGateways ?? []).map((s) => s.id),
      (i.rags ?? []).map((s) => s.id),
      (i.workflows ?? []).map((s) => s.id),
      (i.workflows ?? []).flatMap((s) => (s.steps ?? []).map((a) => a.id)),
      (i.etlFlows ?? []).map((s) => s.id),
      (i.identityProviders ?? []).map((s) => s.id),
      (i.notifications ?? []).map((s) => s.id),
      (i.documents ?? []).map((s) => s.id),
      (i.uiApps ?? []).map((s) => s.id),
      (i.pages ?? []).map((s) => s.id),
      (i.modules ?? []).map((s) => s.id),
      (i.services ?? []).map((s) => s.id),
      (i.models ?? []).flatMap((s) => (s.fields ?? []).map((a) => a.id)),
      (i.customCodes ?? []).map((s) => s.id),
      (i.buttonGroups ?? []).map((s) => s.id),
      (i.workflowGateways ?? []).map((s) => s.id)
    ])
      o.forEach((s) => n.add(s));
    for (let o = 1; ; o++) {
      const s = o === 1 ? e : `${e} ${o}`, a = `${t}${ae(s)}`;
      if (!n.has(a))
        return this._pendingIds.add(a), { id: a, name: s };
    }
  }
  /** The container chain at a drop target: scene parents — or the explorer's tree. */
  dropChain(e) {
    if (!e) return [];
    if (this._yugo) {
      const i = this.renderRoot.querySelector("modux-explorer");
      return (i == null ? void 0 : i.chainOf(e)) ?? [e];
    }
    const t = this.sceneFor(this._view), n = [];
    for (let i = e; i; ) {
      n.push(i);
      const o = t.nodes.find((s) => s.id === i);
      i = o ? o.ownerId ?? o.parentId : void 0;
    }
    return n;
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var o, s;
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
    ].includes(e)) return n.find((a) => this.model.boundedContexts.some((r) => r.id === a)) ?? null;
    if (e === "invariant") {
      const a = n.find((l) => (this.model.aggregates ?? []).some((p) => p.id === l));
      if (a) return a;
      const r = n.find((l) => this.model.boundedContexts.some((p) => p.id === l));
      return ((o = (this.model.aggregates ?? []).find((l) => l.boundedContextId === r)) == null ? void 0 : o.id) ?? null;
    }
    if (e === "read-model") {
      const a = n.find((l) => (this.model.aggregates ?? []).some((p) => p.id === l));
      if (a) return a;
      const r = n.find((l) => this.model.boundedContexts.some((p) => p.id === l));
      return ((s = (this.model.aggregates ?? []).find((l) => l.boundedContextId === r)) == null ? void 0 : s.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return n.find((a) => this.model.externalSystems.some((r) => r.id === a)) ?? null;
    if (e === "model-field")
      return n.find((a) => (this.model.models ?? []).some((r) => r.id === a)) ?? null;
    if (e === "etl-flow" && this._view === "integrations" && this.model.boundedContexts.length === 1)
      return this.model.boundedContexts[0].id;
    if (e === "ui-button")
      return n.find((a) => (this.model.buttonGroups ?? []).some((r) => r.id === a)) ?? null;
    if (e === "use-case-step")
      return n.find(
        (a) => this.model.boundedContexts.some((r) => (r.useCases ?? []).some((l) => l.id === a))
      ) ?? null;
    if (e === "api-operation") {
      for (const a of n) {
        if ((this.model.apis ?? []).some((p) => p.id === a)) return a;
        const r = /^apiimpl:(.+)@(.+)$/.exec(a);
        if (r && (this.model.apis ?? []).some((p) => p.id === r[1])) return r[1];
        const l = (this.model.proxyApis ?? []).find((p) => p.id === a);
        if (l != null && l.targetApiId) return l.targetApiId;
      }
      return null;
    }
    return e === "api" ? n.find((a) => this.model.externalSystems.some((r) => r.id === a)) ?? n.find((a) => this.model.boundedContexts.some((r) => r.id === a)) ?? null : null;
  }
  createFromPalette(e, t, n, i = null) {
    var y, I;
    const o = Zi.find((c) => c.type === e);
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
      const c = n ? /^cmp:([^:]+):(.+)$/.exec(n) : null, d = c ? c[1] : n && (this.model.pages ?? []).some((_) => _.id === n) ? n : null;
      if (!d) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: h, name: x } = this.uniquePaletteName("Custom code", "cc-");
      this.command({ kind: "add-custom-code", id: h, name: x }, !1), c ? (this.command({ kind: "set-page-component-custom-code", pageId: d, componentId: c[2], targetId: h }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: d, targetId: h }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const c = e.slice(4), d = n ? /^cmp:([^:]+):(.+)$/.exec(n) : null, h = d ? d[1] : n && (this.model.pages ?? []).some((O) => O.id === n) ? n : null;
      if (!h) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let x = d ? d[2] : void 0, _ = null;
      if (c === "tab") {
        let O = null, R = x ? this.componentIn(h, x) : null;
        for (; R; ) {
          if (R.node.kind === "tabLayout") {
            O = R.node.id;
            break;
          }
          R = R.parentId ? this.componentIn(h, R.parentId) : null;
        }
        if (!O) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const W = this.componentIn(h, O).node, v = this.newComponentId("tab"), B = `Pestaña ${(W.children ?? []).filter((K) => K.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: h, componentId: v, componentKind: "tab", parentComponentId: O }, !1), this.command({ kind: "set-page-component", pageId: h, componentId: v, title: B }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: h, componentId: v }]);
        return;
      }
      if (i != null && i.componentId && i.pos !== "into") {
        const O = this.componentIn(h, i.componentId);
        O && O.node.kind === "tab" ? x = O.node.id : O && (x = O.parentId ?? void 0, _ = i.pos === "before" ? i.componentId : O.beforeId);
      } else if (x) {
        const O = ((y = this.componentIn(h, x)) == null ? void 0 : y.node) ?? null;
        (O == null ? void 0 : O.kind) === "tabLayout" && (O.children ?? [])[0] && (x = (O.children ?? [])[0].id);
      }
      const A = this.newComponentId(c), L = {
        kind: "add-page-component",
        pageId: h,
        componentId: A,
        componentKind: c,
        parentComponentId: x
      };
      if (!_) {
        this.command(L);
        return;
      }
      this.command(L, !1), this.command(
        { kind: "move-page-component", pageId: h, componentId: A, parentComponentId: x ?? null, beforeComponentId: _ },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: h, componentId: A }]);
      return;
    }
    const s = this._view, a = this.sceneFor(s), r = (c, d) => {
      this.purgeNodeGeometry(c);
      const h = this.viewLayout(s), x = d ? a.nodes.find((A) => A.id === d) : void 0, _ = x ? { x: Math.round(t.x - x.x), y: Math.round(t.y - x.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...h, nodes: { ...h.nodes, [c]: _ } }), { kind: "move-node", view: s, id: c, pos: null };
    }, l = (c, d, h) => {
      const x = this.inverseOf(c) ?? [];
      this.command(c, !1);
      const _ = r(d, h);
      this.pushUndoEntry([...x, _]);
    };
    if (!o.child) {
      const c = {
        note: "note-",
        area: "area-",
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
      }, { id: d, name: h } = this.uniquePaletteName(o.label, c[e] ?? ""), x = e === "boundedContext" ? { kind: "add-boundedContext", id: d, name: h, subdomainType: "SUPPORTING" } : e === "note" ? { kind: "add-note", id: d, name: h } : e === "area" ? { kind: "add-area", id: d, name: h } : e === "actor" ? { kind: "add-actor", id: d, name: h } : e === "external-system" ? { kind: "add-external-system", id: d, name: h } : e === "ai-agent" ? { kind: "add-ai-agent", id: d, name: h } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: d, name: h, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: d, name: h } : e === "rag" ? { kind: "add-rag", id: d, name: h } : e === "api" ? { kind: "add-api", id: d, name: h } : e === "proxy-api" ? { kind: "add-proxy-api", id: d, name: h } : e === "ui-app" ? { kind: "create-ui-app", id: d, name: h } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: d, name: h, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: d, name: h, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: d, name: h, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: d, name: h } : e === "transformation" ? { kind: "add-transformation", id: d, name: h } : e === "custom-code" ? { kind: "add-custom-code", id: d, name: h } : e === "button-group" ? { kind: "add-button-group", id: d, name: h } : e === "identity-provider" ? { kind: "add-identity-provider", id: d, name: h } : e === "service" ? { kind: "add-service", id: d, name: h } : {
        kind: "add-workflow",
        id: d,
        name: h,
        completionEventName: `${h.replace(/\s+/g, "")}Completado`
      };
      if (x.kind === "create-ui-app") {
        const A = this.dropChain(n).find((L) => this.model.boundedContexts.some((O) => O.id === L));
        if (A) {
          l({ ...x, boundedContextId: A }, d);
          return;
        }
      }
      if (x.kind === "add-external-system") {
        const A = this.dropChain(n).find((L) => this.model.externalSystems.some((O) => O.id === L));
        if (A) {
          l({ ...x, parentId: A }, d), this.emit("modux-notice", { message: "Subsistema creado como parte del sistema" });
          return;
        }
      }
      l(x, d);
      return;
    }
    if (e === "ui-wizard-step") {
      const d = this.dropChain(n).map((A) => {
        var L;
        return ((L = /^wizrow:([^:]+):/.exec(A)) == null ? void 0 : L[1]) ?? A;
      }).find((A) => (this.model.pages ?? []).some((L) => L.id === A && L.type === "WIZARD"));
      if (!d) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const h = ((I = (this.model.pages ?? []).find((A) => A.id === d)) == null ? void 0 : I.wizardSteps) ?? [], x = new Set(h.map((A) => A.id ?? A.pageId));
      let _ = h.length + 1;
      for (; x.has(`wzs-${_}`); ) _++;
      this.command({ kind: "add-page-wizard-step", pageId: d, itemId: `wzs-${_}`, label: `Paso ${_}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const c = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", d = c === "CRUD" ? "CRUD" : c === "WIZARD" ? "Wizard" : "Página", { id: h, name: x } = this.uniquePaletteName(d, "page-"), _ = this.dropChain(n), A = _.find((O) => (this.model.uiApps ?? []).some((R) => R.id === O)), L = _.map((O) => {
        var R;
        return ((R = /^wizrow:([^:]+):/.exec(O)) == null ? void 0 : R[1]) ?? O;
      }).find((O) => (this.model.pages ?? []).some((R) => R.id === O && R.type === "WIZARD"));
      if (L) {
        const O = a.nodes.find((W) => W.id === L);
        O && (t.x = O.x + O.w / 2 + 160, t.y = O.y - O.h / 2 + 40), this.command({ kind: "create-ui-page", id: h, name: x, pageType: c }, !1), this.command({ kind: "add-page-wizard-step", pageId: L, targetId: h }, !1);
        const R = r(h);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: h }, R]), this.emit("modux-notice", { message: `${x} creada como paso del wizard` });
        return;
      }
      if (A) {
        const O = a.nodes.find((R) => R.id === A);
        O && (t.x = O.x + O.w / 2 + 160, t.y = O.y - O.h / 2 + 40);
      }
      l(
        A ? { kind: "create-ui-page", id: h, name: x, pageType: c, appId: A, menuLabel: x } : { kind: "create-ui-page", id: h, name: x, pageType: c },
        h
      );
      return;
    }
    if (e === "menu-item") {
      const c = this.dropChain(n), d = c.find((L) => (this.model.uiApps ?? []).some((O) => O.id === L));
      if (!d) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const h = /* @__PURE__ */ new Set(), x = (L) => {
        for (const O of L ?? [])
          h.add(O.label), x(O.children);
      };
      (this.model.uiApps ?? []).forEach((L) => x(L.menuItems));
      let _ = "Entrada";
      for (let L = 2; h.has(_); L++) _ = `Entrada ${L}`;
      const A = c.map((L) => $e(L)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: d,
        label: _,
        itemId: this.newMenuItemId(_),
        parentId: A == null ? void 0 : A.itemId,
        parentLabel: A != null && A.itemId || A == null ? void 0 : A.label
      });
      return;
    }
    if (e === "etl-transform") {
      const d = this.dropChain(n).map((_) => (this.model.etlFlows ?? []).find((A) => A.id === _)).find(Boolean);
      if (!d) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const h = new Set((d.steps ?? []).map((_) => _.id));
      let x = (d.steps ?? []).length + 1;
      for (; h.has(`ets-${x}`); ) x++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: d.id,
        id: `ets-${x}`,
        name: `Transformación ${x}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "etl-flow" && !this.dropContainerFor(e, n)) {
      const c = this.uniquePaletteName(o.label, "etl-");
      l({ kind: "add-etl-flow", id: c.id, name: c.name }, c.id), this.emit("modux-notice", {
        message: "Integrador creado suelto — su contexto dueño se fija en la ficha; cablea fuentes y escrituras aquí"
      });
      return;
    }
    if (e === "workflow-join" || e === "workflow-split") {
      const { id: c, name: d } = this.uniquePaletteName(e === "workflow-join" ? "Join" : "Split", "wfg-");
      l({
        kind: "add-workflow-gateway",
        id: c,
        name: d,
        stepType: e === "workflow-join" ? "JOIN" : "SPLIT"
      }, c), this.emit("modux-notice", {
        message: "Gateway creado suelto — sus líneas dirán de qué workflow es (join: n entradas → 1 salida; split: 1 → n)"
      });
      return;
    }
    if (e === "workflow-step") {
      const d = this.model.workflows ?? [], h = this.dropChain(n), x = h.map((R) => d.find((W) => W.id === R)).find(Boolean), _ = h.map((R) => {
        const W = d.find((v) => (v.steps ?? []).some((B) => B.id === R));
        return W ? { owner: W, stepId: R } : null;
      }).find(Boolean);
      let A = x ?? (_ == null ? void 0 : _.owner);
      if (!A && d.length === 1 && (A = d[0]), !A) {
        if (!d.length) {
          this.emit("modux-notice", { message: "Crea antes un workflow: los pasos viven en uno" });
          return;
        }
        this._wfStepPicker = { pos: t, stepType: void 0 };
        return;
      }
      const { id: L, name: O } = this.uniquePaletteName(
        "Paso",
        "wfs-"
      );
      _ && (t = { x: t.x + 190, y: t.y }), l(
        {
          kind: "add-workflow-step",
          workflowId: A.id,
          id: L,
          name: O,
          ..._ ? { dependsOnStepIds: [_.stepId], afterStepId: _.stepId } : {}
        },
        L
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${A.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const c = this.dropContainerFor("api", n);
      if (!c) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: d, name: h } = this.uniquePaletteName("API", "api-"), x = { kind: "add-api", id: d, name: h }, _ = this.inverseOf(x) ?? [];
      this.command(x, !1), this.model.externalSystems.some((R) => R.id === c) ? this.command({ kind: "set-api-publisher", id: d, targetId: c }, !1) : this.command({ kind: "add-api-implementation", apiId: d, boundedContextId: c }, !1);
      const A = this.viewLayout(this._view), L = this.sceneFor(this._view).nodes.find((R) => R.id === c), O = L ? { x: Math.round(t.x - L.x), y: Math.round(t.y - L.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...A, nodes: { ...A.nodes, [d]: O } }), this.pushUndoEntry([..._, { kind: "move-node", view: this._view, id: d, pos: null }]);
      return;
    }
    const p = this.dropContainerFor(e, n);
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
      module: "cm-",
      "model-field": "f-",
      invariant: "inv-"
    }, { id: f, name: m } = this.uniquePaletteName(o.label, g[e] ?? "");
    if (e === "aggregate")
      l({ kind: "add-aggregate", id: f, name: m, boundedContextId: p }, f, p);
    else if (e === "invariant")
      this.command({ kind: "add-invariant", aggregateId: p, id: f, name: m }), this.emit("modux-notice", {
        message: "Invariante declarado en el agregado — sus condiciones se detallan en la ficha del agregado"
      });
    else if (e === "ui-button") {
      const c = (this.model.buttonGroups ?? []).find((x) => x.id === p), d = new Set(((c == null ? void 0 : c.buttons) ?? []).map((x) => x.id));
      let h = ((c == null ? void 0 : c.buttons) ?? []).length + 1;
      for (; d.has(`btn-${h}`); ) h++;
      this.command({ kind: "add-group-button", id: p, itemId: `btn-${h}`, label: m }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: p, fieldId: f, name: m });
    else if (e === "module")
      l({ kind: "add-module", id: f, name: m, boundedContextId: p }, f, p), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      l(
        { kind: "add-use-case", id: f, name: m, boundedContextId: p, ...e === "policy" ? { policy: !0 } : {} },
        f,
        p
      );
    else if (e === "domain-event")
      l({ kind: "add-domain-event", id: f, name: m, boundedContextId: p }, f, p);
    else if (e === "application-event")
      l({ kind: "add-application-event", id: f, name: m, boundedContextId: p }, f, p);
    else if (e === "domain-service")
      l({ kind: "add-domain-service", id: f, name: m, boundedContextId: p }, f, p);
    else if (e === "query-service")
      l({ kind: "add-query-service", id: f, name: m, boundedContextId: p }, f, p);
    else if (e === "scheduled-trigger")
      l({ kind: "add-scheduled-trigger", id: f, name: m, boundedContextId: p }, f, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      l({ kind: "add-notification", id: f, name: m, boundedContextId: p }, f, p), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      l({ kind: "add-document", id: f, name: m, boundedContextId: p }, f, p), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      l({ kind: "add-etl-flow", id: f, name: m, boundedContextId: p }, f, p), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const c = (this.model.aggregates ?? []).find((d) => d.id === p);
      l({ kind: "add-read-model", id: f, name: m, aggregateId: p }, f, (c == null ? void 0 : c.boundedContextId) ?? p);
    } else if (e === "api-operation") {
      const c = (this.model.apis ?? []).find((A) => A.id === p), d = new Set(((c == null ? void 0 : c.operations) ?? []).map((A) => A.id));
      let h = m, x = `apiop-${p.replace(/^api-/, "")}-${ae(h)}`;
      for (let A = 2; d.has(x); A++)
        h = `${o.label} ${A}`, x = `apiop-${p.replace(/^api-/, "")}-${ae(h)}`;
      l({ kind: "add-api-operation", apiId: p, id: x, name: h }, x, p), a.nodes.some(
        (A) => A.parentId === p && (A.kind === "api-operation" || A.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(c == null ? void 0 : c.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const c = this.model.boundedContexts.flatMap((_) => _.useCases ?? []).find((_) => _.id === p), d = new Set((c == null ? void 0 : c.stepIds) ?? []);
      let h = m, x = `step-${ae(h)}`;
      for (let _ = 2; d.has(x); _++)
        h = `${o.label} ${_}`, x = `step-${ae(h)}`;
      l({ kind: "add-use-case-step", useCaseId: p, id: x, name: h }, x, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(c == null ? void 0 : c.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? l({ kind: "add-external-use-case", id: f, name: m, boundedContextId: p }, f, p) : e === "external-table" ? l({ kind: "add-external-table", id: f, name: m, boundedContextId: p }, f, p) : e === "mcp-server" && l({ kind: "add-mcp-server", id: f, name: m, boundedContextId: p }, f, p);
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
      const y = (this.model.modelMappings ?? []).find((c) => c.id === e);
      if (y) {
        this.command({
          kind: "set-page-button",
          pageId: i[1],
          useCaseId: i[2],
          label: null,
          mappingId: e
        }), this.emit("modux-notice", { message: `El botón mapea con ${y.name}` });
        return;
      }
      const I = this.model.boundedContexts.flatMap((c) => c.useCases ?? []).find((c) => c.id === e);
      if (I) {
        if (e === i[2]) return;
        const c = (this.model.pages ?? []).find((h) => h.id === i[1]), d = ((c == null ? void 0 : c.buttons) ?? []).find((h) => h.useCaseId === i[2]);
        if (!d) return;
        if (((c == null ? void 0 : c.buttons) ?? []).some((h) => h.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: i[1], useCaseId: i[2] }, !1), this.command(
          { kind: "add-page-button", pageId: i[1], useCaseId: e, label: d.label, type: d.bar },
          !1
        ), d.mappingId && this.command(
          { kind: "set-page-button", pageId: i[1], useCaseId: e, label: null, mappingId: d.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: i[1], useCaseId: e },
          { kind: "add-page-button", pageId: i[1], useCaseId: i[2], label: d.label, type: d.bar },
          ...d.mappingId ? [{ kind: "set-page-button", pageId: i[1], useCaseId: i[2], label: null, mappingId: d.mappingId }] : []
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${I.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const o = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (o) {
      const y = this.model.boundedContexts.flatMap((c) => c.useCases ?? []).find((c) => c.id === e);
      if (!y) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const I = (this.model.pages ?? []).find((c) => c.id === o[1]);
      if (((I == null ? void 0 : I.buttons) ?? []).some((c) => c.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: o[1], useCaseId: e, type: o[2] }), this.emit("modux-notice", { message: `Botón de ${y.name} en la barra ${o[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const s = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, a = s ? s[1] : t && (this.model.pages ?? []).some((y) => y.id === t) ? t : null;
    if (!a) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const r = s ? ((m = this.componentIn(a, s[2])) == null ? void 0 : m.node) ?? null : null, l = this.model.boundedContexts.flatMap((y) => y.useCases ?? []).find((y) => y.id === e);
    if (l) {
      (r == null ? void 0 : r.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: a, componentId: r.id, useCaseId: e, label: r.label ?? l.name }), this.emit("modux-notice", { message: `El botón lanza ${l.name}` })) : (this.command({ kind: "add-page-button", pageId: a, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${l.name} añadido a la página` }));
      return;
    }
    const p = (this.model.models ?? []).find((y) => y.id === e);
    if (p) {
      (r == null ? void 0 : r.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: a, componentId: r.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${p.name}` })) : (this.command({ kind: "set-page-model", pageId: a, modelId: e }), this.emit("modux-notice", { message: `${p.name} es el viewmodel de la página` }));
      return;
    }
    const g = (this.model.modelMappings ?? []).find((y) => y.id === e);
    if (g && (r == null ? void 0 : r.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: a, componentId: r.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${g.name}` });
      return;
    }
    const f = this.model.boundedContexts.flatMap((y) => (y.queryServices ?? []).flatMap((I) => (I.operations ?? []).map((c) => ({ op: c, qs: I })))).find(({ op: y }) => y.id === e);
    if (f) {
      (r == null ? void 0 : r.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: a,
        componentId: r.id,
        queryOperationId: f.op.id,
        queryServiceId: f.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: a, queryServiceId: f.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${f.op.name}` });
      return;
    }
    this.emit("modux-notice", {
      message: "En Diseño se sueltan casos de uso (botones), modelos (viewmodel) y consultas (listados)"
    });
  }
  placeExistingFromPalette(e, t, n, i, o, s = null) {
    if (this._view === "design") {
      this.dropCatalogOnDesign(e, n, s);
      return;
    }
    if (n && n !== e) {
      this.applyConnection(e, n, i, o);
      return;
    }
    const a = this._view, r = this.sceneFor(a), l = r.nodes.find((m) => m.id === e);
    if (!l) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const m = this.viewLayout(a);
        this.writeViewLayout(a, {
          ...m,
          nodes: { ...m.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const p = this.viewLayout(a), g = l.parentId ? r.nodes.find((m) => m.id === l.parentId) : void 0, f = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: a, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(a, { ...p, nodes: { ...p.nodes, [e]: f } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "distribution", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = Zi.filter(
      (i) => (this._view === "workflows" ? ["workflow", "workflow-step", "workflow-join", "workflow-split"].includes(i.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(i.type) : this._view === "design" ? i.type === "page" || i.type === "custom-code" || i.type.startsWith("cmp:") : this._view === "integrations" ? ["etl-flow", "etl-transform", "external-system", "external-table"].includes(i.type) : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(i.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(i.type) && !i.type.startsWith("cmp:")) && (!e || i.label.toLowerCase().includes(e))
    ), n = this._view === "workflows" ? "new" : this._paletteTab;
    return M`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(i) => this._paletteFilter = i.target.value}
          />
          ${n === "new" ? M`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${$c.map((i) => {
      const o = t.filter((s) => s.group === i);
      return o.length ? M`
                        <div class="palette-g">${i}</div>
                        ${o.map(
        (s) => M`
                            <div
                              class="palette-item ${s.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${s.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : s.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(a) => this.onPaletteDragStart(a, { new: s.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                                ${kt[s.symbol]}
                              </svg>
                              <span class="pal-label">${s.label.replace(/^(Layout|Componente) · /, "")}</span>
                            </div>
                          `
      )}
                      ` : "";
    })}
              ` : M`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (i) => M`
                    <div class="palette-g">${i.label}</div>
                    ${i.items.map(
        (o) => M`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(s) => this.onPaletteDragStart(s, { existing: o.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${i.color}">
                            ${kt[i.symbol]}
                          </svg>
                          <span class="pal-label">${o.name}</span>
                        </div>
                      `
      )}
                  `
    )}
              `}
        </div>
        ${this._view === "workflows" ? "" : M`
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
    var t, n, i, o, s, a, r;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const l = this._newBoundedContextId || ((t = this.model.boundedContexts[0]) == null ? void 0 : t.id);
        if (!l) return;
        this.command({ kind: "add-aggregate", id: `agg-${ae(e)}`, name: e, boundedContextId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id), p = this._newTargetId || ((o = this.model.boundedContexts[0]) == null ? void 0 : o.id), g = this._newTriggerEvent.trim();
        if (!l || !p || !g) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ae(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: l,
          triggerEvent: g,
          targetId: p
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const l = this._newBoundedContextId || ((s = this.model.boundedContexts[0]) == null ? void 0 : s.id);
        if (!l) return;
        this.command({
          kind: "add-process",
          id: `proc-${ae(e)}`,
          name: e,
          boundedContextId: l,
          triggerAggregateId: this._newTriggerAggId || ((r = (a = this.model.aggregates) == null ? void 0 : a[0]) == null ? void 0 : r.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e, t) {
    const n = this.viewLayout(e), i = this.filteredModel(), o = (t == null ? void 0 : t.expandAll) ?? !1, s = e === "aggregates" ? Sa(i, n.nodes) : e === "flows" ? La(i, n.nodes) : e === "processes" ? di(i, n.nodes) : e === "workflows" ? Yl(i, n.nodes) : e === "ui" ? ec(i, n.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "integrations" ? oc(i, n.nodes) : e === "mappings" ? tc(i, n.nodes) : e === "eventstorming" ? ql(i, n.nodes) : e === "distribution" ? va(i, n.nodes, n.sizes ?? {}, new Set(n.expanded ?? []), o) : Ia(i, n.nodes, n.sizes ?? {}, new Set(n.expanded ?? []), o);
    if (e !== "design" && (this.withAreas(s, e), this.withNotes(s, e)), this.diff)
      for (const a of s.nodes) {
        const r = this.diff[a.id] ?? this.diff[a.id.replace(/^(tgt:|flow:)/, "")];
        r && (a.diffKind = r);
      }
    return s;
  }
  /**
   * The area layer, per view: an area shows only in the view where it was dropped (its
   * rectangle is that view's layout). It renders BEHIND everything — a named frame whose
   * membership is geometric — and anchors note threads like any other element.
   */
  withAreas(e, t) {
    var s, a;
    const n = this.model.areas ?? [];
    if (!n.length) return;
    const i = this.viewLayout(t), o = i.sizes ?? {};
    for (const r of n) {
      const l = i.nodes[r.id];
      l && e.nodes.unshift({
        id: r.id,
        label: r.name,
        kind: "area",
        x: l.x,
        y: l.y,
        w: ((s = o[r.id]) == null ? void 0 : s.w) ?? 340,
        h: ((a = o[r.id]) == null ? void 0 : a.h) ?? 220,
        fill: "rgba(148, 163, 184, 0.07)",
        stroke: "#94a3b8",
        dashed: !0,
        tooltip: r.name,
        resizable: !0
      });
    }
  }
  /**
   * The sticky-note layer, view-independent: a note shows wherever it was dropped (it
   * has a position in that view's layout) and wherever one of its targets is visible —
   * annotations follow their subject across views. Dashed amber threads tie the note to
   * each visible target; a thread to a RELATION anchors at that edge's midpoint (the
   * canvas resolves the `edgeanchor:` pseudo-target).
   */
  withNotes(e, t) {
    var r, l;
    const n = this.model.notes ?? [];
    if (!n.length) return;
    const i = this.viewLayout(t), o = new Set(e.nodes.map((p) => p.id)), s = new Set(e.edges.map((p) => p.id)), a = i.sizes ?? {};
    for (const p of n) {
      const g = i.nodes[p.id], f = (d) => o.has(d) ? d : o.has(`tgt:${d}`) ? `tgt:${d}` : o.has(`flow:${d}`) ? `flow:${d}` : null, m = (p.targetIds ?? []).map((d) => ({ raw: d, nodeId: f(d) })).filter((d) => !!d.nodeId), y = (p.edgeRefs ?? []).filter((d) => s.has(d));
      if (!g && !m.length && !y.length) continue;
      const I = m.length ? e.nodes.find((d) => d.id === m[0].nodeId) : void 0, c = g ?? { x: ((I == null ? void 0 : I.x) ?? 0) + 40, y: ((I == null ? void 0 : I.y) ?? 0) - 110 };
      e.nodes.push({
        id: p.id,
        label: p.text,
        kind: "note",
        x: c.x,
        y: c.y,
        w: ((r = a[p.id]) == null ? void 0 : r.w) ?? 150,
        h: ((l = a[p.id]) == null ? void 0 : l.h) ?? 72,
        fill: "#fef9c3",
        symbol: "note",
        resizable: !0
      });
      for (const d of m)
        e.edges.push({
          id: `note:${p.id}->${d.raw}`,
          sourceId: p.id,
          targetId: d.nodeId,
          kind: "note-link",
          dashed: !0,
          color: "#ca8a04"
        });
      for (const d of y)
        e.edges.push({
          id: `note:${p.id}->${d}`,
          sourceId: p.id,
          targetId: `edgeanchor:${d}`,
          kind: "note-link",
          dashed: !0,
          color: "#ca8a04"
        });
    }
  }
  /** Screen space the overlays occupy on the left — fit() centers in what remains. */
  fitInsets() {
    const e = this._paletteOpen && ["context-map", "distribution", "workflows", "ui"].includes(this._view), t = this._treeOpen && !!this._activeViewId;
    return t && e ? { left: 532 } : t ? { left: 280 } : e ? { left: 260 } : { left: 0 };
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var l;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const n = t.nodes.filter((p) => !p.parentId && p.kind !== "area"), i = new Set(n.map((p) => p.id)), o = {
      nodes: n,
      edges: t.edges.filter((p) => i.has(p.sourceId) && i.has(p.targetId))
    }, a = await ac(o, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), r = this.viewLayout(e);
    this.pushUndoEntry([
      ...n.map((p) => ({
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
    var o;
    const t = e.target, n = e.type === "change" && t instanceof HTMLSelectElement, i = e.type === "click" && !!t.closest("button");
    !n && !i || (o = this.renderRoot.querySelector("modux-canvas")) == null || o.focus();
  }
  render() {
    const e = this.withJourneyOverlay(this.sceneFor(this._view));
    return M`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <span
          class="brand"
          title="Editor gráfico — context map, agregados, flows, procesos y eventstorming sobre lienzo editable; los cambios se guardan en el modelo"
        >Editor gráfico</span>
        <button
          class="tab hamburger"
          ?hidden=${!["context-map", "distribution", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view)}
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
            title="Qué pinta el diagrama: el mapa (expande cada elemento a discreción), o una vista especializada"
            @change=${(t) => this.onDiagramScopeChange(t.target.value)}
          >
            <option value="view:context-map" ?selected=${this._view === "context-map"}>
              Mapa del sistema
            </option>
            <optgroup label="Vistas especializadas">
              <option value="view:distribution" ?selected=${this._view === "distribution"}>
                Distribución (módulos y servicios)
              </option>
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
          title="Limitar el lienzo a una vista del modelo — cada vista guarda su propia lámina (posiciones y expansión)"
          @change=${(t) => this.activateVista(t.target.value)}
        >
          <option value="" ?selected=${this._activeViewId === ""}>Vista: todo el modelo</option>
          ${(this.model.views ?? []).filter((t) => t.kind === "CURATED").map(
      (t) => M`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
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
      (t) => M`<option value=${t.id} ?selected=${t.id === this._activeJourneyId}>
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
        ${this._activeViewId ? M`
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
      (t) => M`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this.viewSelection().length || !this._activeViewId && (this._view === "context-map" || this._view === "distribution") ? M`
              <input
                class="new-name"
                placeholder="Nombre de la vista…"
                title=${this.viewSelection().length ? "Crear una vista modux con la selección" : "Crear una vista modux con lo que hay en pantalla — hereda esta geometría y expansión"}
                .value=${this._newViewName}
                @input=${(t) => this._newViewName = t.target.value}
                @keydown=${(t) => t.key === "Enter" && this.createViewFromSelection()}
              />
              <button
                class="tab"
                title=${this.viewSelection().length ? "Crear una vista modux con la selección" : "Crear una vista modux con lo que hay en pantalla — hereda esta geometría y expansión"}
                @click=${this.createViewFromSelection}
              >
                ⊞ Vista${this.viewSelection().length ? ` (${this.viewSelection().length})` : ""}
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
        ${this._view === "aggregates" || this._view === "processes" ? M`<select
              title=${this._view === "aggregates" ? "Contexto del nuevo agregado" : "Contexto dueño del proceso"}
              @change=${(t) => this._newBoundedContextId = t.target.value}
            >
              ${this.model.boundedContexts.map(
      (t) => {
        var n;
        return M`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newBoundedContextId || ((n = this.model.boundedContexts[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? M`
              ${this._view === "flows" ? M`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => M`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var n, i;
        return M`<option
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
              ${this._view === "flows" ? M`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.boundedContexts, ...this.model.externalSystems].map(
      (t) => {
        var n;
        return M`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? M`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => M`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? M`
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
      (t) => M`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? M`<input
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
              ${this.owningProcessOf(this._selectedId) ? M`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? M`
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
      (t) => M`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? M`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.boundedContexts.flatMap((t) => t.useCases ?? []).map(
      (t) => M`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
        ${this._view === "workflows" && ((this.model.processes ?? []).length || (this.model.sagas ?? []).length) ? M`<button
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
      ${this._view === "design" ? M`${this.renderPalette()}${this.renderFigma()}` : this._yugo ? M`${this.renderPalette()}<modux-explorer
            class="yugo"
            .scene=${this.sceneFor(this._view, { expandAll: !0 })}
            .journey=${this.activeJourneyForSurface()}
            .sceneKey=${`${this._view}:${this._activeViewId || "base"}`}
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
      const { sourceId: n, targetId: i, x: o, y: s } = t.detail, a = (r) => this.model.boundedContexts.some((l) => l.id === r);
      if (this._view === "context-map" && !this._activeJourneyId && a(n) && a(i)) {
        const r = this.model.relations.find(
          (l) => l.sourceId === n && l.targetId === i && l.declared
        );
        this._relationPicker = {
          sourceId: n,
          targetId: i,
          mode: r ? "edit" : "create",
          x: o ?? this.clientWidth / 2,
          y: s ?? 120
        };
        return;
      }
      this.applyConnection(n, i, o, s);
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
        t.detail.members.filter((s) => n.has(s.kind)).map((s) => s.id)
      )];
      if (!i.length) {
        this.emit("modux-notice", { message: "Despliega algo antes de crear la vista" });
        return;
      }
      const o = `view-${ae(t.detail.name)}`;
      this.command({ kind: "add-view", id: o, name: t.detail.name, memberIds: i }), this.activateVista(o), this.emit("modux-notice", {
        message: `Vista «${t.detail.name}» creada con lo desplegado (${i.length} miembros)`
      });
    }}
          ></modux-explorer>` : this._tilt ? M`
      ${this.renderPalette()}
      <modux-tilt
            @dragover=${(t) => t.preventDefault()}
            @drop=${this.onPaletteDrop}
            .scene=${e}
            .selectedId=${this._selectedId}
            .connectable=${["context-map", "distribution", "workflows", "ui"].includes(this._view)}
            @connect-requested=${this.onConnectRequested}
            @element-selected=${this.onElementSelected}
            @element-activated=${this.onElementActivated}
            @node-collapse-toggled=${this.onNodeCollapseToggled}
            @node-moved=${this.onNodeMoved}
            @delete-requested=${this.onDeleteRequested}
            @delete-selection-requested=${this.onDeleteSelectionRequested}
            @node-renamed=${this.onNodeRenamed}
            @undo-requested=${this.undo}
            @redo-requested=${this.redo}
            @selection-cleared=${() => {
      this._selectedId = null, this._multi = [], this.emit("modux-select", null);
    }}
          ></modux-tilt>` : M`
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
        .connectable=${["context-map", "distribution", "workflows", "ui"].includes(this._view)}
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
        ${this._view === "context-map" ? M`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema (y un sistema externo dentro/fuera de otro) · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? M`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? M`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : M`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return this._helpOpen ? M`
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
      ["1 · 4", "Mapa del sistema · Distribución"],
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
      ([t, n]) => M`
            <div class="help-row"><span class="help-keys">${t}</span><span>${n}</span></div>
          `
    )}
      </div>
    ` : "";
  }
  /**
   * Deleting from the MODEL always confirms here first; with a View active and every node a
   * member, the picker also offers only taking them out of the view.
   */
  renderDeletePicker() {
    const e = this._deletePicker;
    if (!e) return "";
    const t = (this.model.views ?? []).find((a) => a.id === this._activeViewId), n = this.sceneFor(this._view), i = e.items.map(
      (a) => {
        var r;
        return ((r = n.nodes.find((l) => l.id === a.id)) == null ? void 0 : r.label) ?? a.id;
      }
    ), o = i.length === 1 ? `«${i[0]}»` : `${i.length} elementos (${i.join(", ")})`, s = e.memberIds.length > 0 && t;
    return M`
      <div class="picker-backdrop" @pointerdown=${() => this._deletePicker = null}></div>
      <div
        class="relation-picker"
        style="left: 50%; top: 120px"
        @pointerdown=${(a) => a.stopPropagation()}
      >
        <div class="picker-title">
          ${s ? `¿Eliminar ${o}, o solo quitar de la vista?` : `¿Eliminar ${o} del modelo?`}
        </div>
        ${s ? M`
              <button
                class="picker-item"
                @click=${() => {
      const a = this._deletePicker;
      this._deletePicker = null;
      for (const r of new Set(a.memberIds))
        this.command({
          kind: "remove-view-member",
          id: this._activeViewId,
          targetId: r
        });
    }}
              >
                <span class="abbr">👁</span>
                <span class="name">Quitar de la vista «${t.name ?? this._activeViewId}»</span>
              </button>
            ` : ""}
        <button
          class="picker-item danger"
          @click=${() => {
      const a = this._deletePicker;
      this._deletePicker = null;
      for (const r of a.items)
        this.performDelete(r.elementType, r.id, r.kind);
    }}
        >
          <span class="abbr">🗑</span>
          <span class="name">Eliminar del modelo — desaparece de todas las vistas y diagramas</span>
        </button>
        <button class="picker-item" @click=${() => this._deletePicker = null}>
          <span class="abbr">✕</span>
          <span class="name">Cancelar</span>
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
    return M`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(o) => o.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${n.map(
      (o) => M`
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
    return e ? M`
      <div class="picker-backdrop" @pointerdown=${() => this._repoPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">Referenciar proyecto del catálogo</div>
        ${this.repositories.map(
      (t) => M`
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
    return e ? M`
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
    return e ? M`
      <div class="picker-backdrop" @pointerdown=${() => this._wfStepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿De qué workflow es el paso?</div>
        ${(this.model.workflows ?? []).map(
      (t) => M`
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
        const s = this.viewLayout(this._view);
        this.writeViewLayout(this._view, {
          ...s,
          nodes: { ...s.nodes, [i]: { x: Math.round(n.pos.x), y: Math.round(n.pos.y) } }
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
    return M`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(i) => i.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Sc.map(
      (i) => M`
            <button
              class="picker-item ${i === t ? "current" : ""}"
              title=${i}
              @click=${() => this.pickRelationType(i)}
            >
              <span class="abbr">${Kn[i].abbr}</span>
              <span class="name">${Kn[i].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
Z.styles = bt`
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
    .brand {
      font: 600 12px ui-sans-serif, system-ui, sans-serif;
      color: #94a3b8;
      letter-spacing: 0.02em;
      white-space: nowrap;
      padding: 0 6px 0 2px;
      cursor: default;
      user-select: none;
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
    .picker-item.danger .abbr {
      color: #dc2626;
    }
    .picker-item.danger:hover {
      background: #fef2f2;
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
    :host([dark]) .picker-item.danger .abbr {
      color: #f87171;
    }
    :host([dark]) .picker-item.danger:hover {
      background: #451a1a;
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
te([
  re({ attribute: !1 })
], Z.prototype, "model", 2);
te([
  re({ attribute: !1 })
], Z.prototype, "layout", 2);
te([
  re({ attribute: !1 })
], Z.prototype, "diff", 2);
te([
  q()
], Z.prototype, "_view", 2);
te([
  q()
], Z.prototype, "_relationType", 2);
te([
  q()
], Z.prototype, "_relationPicker", 2);
te([
  q()
], Z.prototype, "_extDepPicker", 2);
te([
  q()
], Z.prototype, "_selectedId", 2);
te([
  q()
], Z.prototype, "_paletteOpen", 2);
te([
  q()
], Z.prototype, "_yugo", 2);
te([
  re({ attribute: !1 })
], Z.prototype, "repositories", 2);
te([
  re({ type: Boolean, reflect: !0 })
], Z.prototype, "dark", 2);
te([
  q()
], Z.prototype, "_repoPicker", 2);
te([
  q()
], Z.prototype, "_wfStepPicker", 2);
te([
  q()
], Z.prototype, "_branchCondEditor", 2);
te([
  q()
], Z.prototype, "_paletteFilter", 2);
te([
  q()
], Z.prototype, "_paletteTab", 2);
te([
  q()
], Z.prototype, "_selectedCmp", 2);
te([
  q()
], Z.prototype, "_fullscreen", 2);
te([
  q()
], Z.prototype, "_tilt", 2);
te([
  q()
], Z.prototype, "_helpOpen", 2);
te([
  q()
], Z.prototype, "_newName", 2);
te([
  q()
], Z.prototype, "_newBoundedContextId", 2);
te([
  q()
], Z.prototype, "_newArchetype", 2);
te([
  q()
], Z.prototype, "_newTriggerAggId", 2);
te([
  q()
], Z.prototype, "_newTriggerEvent", 2);
te([
  q()
], Z.prototype, "_newTargetId", 2);
te([
  q()
], Z.prototype, "_undoStack", 2);
te([
  q()
], Z.prototype, "_redoStack", 2);
te([
  q()
], Z.prototype, "_newStepName", 2);
te([
  q()
], Z.prototype, "_newStepType", 2);
te([
  q()
], Z.prototype, "_newStepRole", 2);
te([
  q()
], Z.prototype, "_newStepDeadline", 2);
te([
  q()
], Z.prototype, "_editStepRole", 2);
te([
  q()
], Z.prototype, "_editStepDeadline", 2);
te([
  q()
], Z.prototype, "_editStepComp", 2);
te([
  q()
], Z.prototype, "_newStepUseCase", 2);
te([
  q()
], Z.prototype, "_newStepEmits", 2);
te([
  q()
], Z.prototype, "_editStepUseCase", 2);
te([
  q()
], Z.prototype, "_editStepEmits", 2);
te([
  q()
], Z.prototype, "_editStepAwaits", 2);
te([
  q()
], Z.prototype, "_multi", 2);
te([
  q()
], Z.prototype, "_newViewName", 2);
te([
  q()
], Z.prototype, "_activeViewId", 2);
te([
  q()
], Z.prototype, "_activeJourneyId", 2);
te([
  q()
], Z.prototype, "_newJourneyName", 2);
te([
  q()
], Z.prototype, "_newRagSourceType", 2);
te([
  q()
], Z.prototype, "_newRagSourceUri", 2);
te([
  q()
], Z.prototype, "_addMemberKey", 2);
te([
  q()
], Z.prototype, "_treeOpen", 2);
te([
  q()
], Z.prototype, "_deletePicker", 2);
Z = te([
  It("modux-editor")
], Z);
var Pc = Object.defineProperty, Tc = Object.getOwnPropertyDescriptor, we = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Tc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Pc(t, n, o), o;
};
let ge = class extends Ve {
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
    return M`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: i, title: o, mark: s, cls: a }) => {
      const r = this._diff.changes.filter((l) => l.kind === i);
      return r.length ? M`
            <div class="diff-group">${o} (${r.length})</div>
            ${r.map(
        (l) => M`
                <div class="diff-row">
                  <span class="diff-mark ${a}">${s}</span>
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
      const n = JSON.parse(localStorage.getItem("mateu-app-context") ?? "{}"), i = JSON.parse(localStorage.getItem("mateu-app-context-labels") ?? "{}");
      n.model = e, i.model = t, localStorage.setItem("mateu-app-context", JSON.stringify(n)), localStorage.setItem("mateu-app-context-labels", JSON.stringify(i));
    } catch {
    }
  }
  /** create / discard / status / merge against the solutions API, then reload. */
  async solutionOp(e, t) {
    var o, s, a;
    const n = (o = this._workspace) == null ? void 0 : o.current;
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
    const i = (s = this._workspace) == null ? void 0 : s.current;
    if (i && i !== n) {
      const r = ((a = this._workspace.solutions.find((l) => l.branch === i)) == null ? void 0 : a.name) ?? i.replace(/^solution\//, "");
      this.syncModelContext(
        i,
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
    return this._tagsOpen ? M`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Versiones etiquetadas</span>
          <button title="Cerrar el listado" @click=${() => this._tagsOpen = !1}>✕</button>
        </div>
        ${this._tags.length ? this._tags.map(
      (e) => M`
                <div class="diff-row">
                  <span class="diff-mark added">🏷</span>
                  <span class="diff-type">${e.date}</span>
                  <span class="diff-name" title=${e.message || e.name}>${e.name}</span>
                </div>
              `
    ) : M`<div class="diff-row"><span class="diff-name">Sin versiones aún — «Etiquetar…» nombra el estado actual</span></div>`}
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
    const { content: t, fileName: n, apiId: i, homeExternalId: o, homeBoundedContextId: s } = e.detail;
    await this.trackWrite(async () => {
      try {
        const a = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: n, apiId: i })
        });
        if (!a.ok) {
          let g = `El servidor rechazó el contrato (${a.status})`;
          try {
            const f = await a.json();
            f != null && f.message && (g = f.message);
          } catch {
          }
          this.showToast(g);
          return;
        }
        const { apiId: r } = await a.json(), l = o ? { kind: "set-api-publisher", id: r, targetId: o } : s ? { kind: "add-api-implementation", apiId: r, boundedContextId: s } : null;
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
    return this._error ? M`<div class="status error">modux editor: ${this._error}</div>` : this._model ? M`
      ${this._workspace ? M`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((n) => n.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : M`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              ${this._taggingVersion ? M`
                    <input
                      placeholder="Nombre de la versión…"
                      .value=${this._newTagName}
                      @input=${(n) => this._newTagName = n.target.value}
                      @keydown=${(n) => n.key === "Enter" && void this.createTag()}
                    />
                    <button @click=${() => void this.createTag()}>Etiquetar</button>
                    <button @click=${() => this._taggingVersion = !1}>Cancelar</button>
                  ` : M`<button
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
      return M`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${n("ADDED")} ～${n("MODIFIED")} －${n("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? M`
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
      return M`
                      ${n === "EXPLORING" ? M`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${n === "PROPOSED" ? M`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${n === "APPROVED" ? M`<button
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
      ${this._mergeFlow ? M`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (n) => M`
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
      ${this._toast ? M`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : M`<div class="status">Cargando el modelo…</div>`;
  }
};
ge.styles = bt`
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
we([
  re()
], ge.prototype, "base", 2);
we([
  q()
], ge.prototype, "_model", 2);
we([
  q()
], ge.prototype, "_layout", 2);
we([
  q()
], ge.prototype, "_error", 2);
we([
  q()
], ge.prototype, "_saving", 2);
we([
  q()
], ge.prototype, "_toast", 2);
we([
  q()
], ge.prototype, "_workspace", 2);
we([
  q()
], ge.prototype, "_creatingSolution", 2);
we([
  q()
], ge.prototype, "_newSolutionName", 2);
we([
  q()
], ge.prototype, "_taggingVersion", 2);
we([
  q()
], ge.prototype, "_newTagName", 2);
we([
  q()
], ge.prototype, "_tagsOpen", 2);
we([
  q()
], ge.prototype, "_tags", 2);
we([
  q()
], ge.prototype, "_repositories", 2);
we([
  q()
], ge.prototype, "_diff", 2);
we([
  q()
], ge.prototype, "_diffListOpen", 2);
we([
  q()
], ge.prototype, "_mergeFlow", 2);
we([
  q()
], ge.prototype, "_dark", 2);
ge = we([
  It("modux-editor-connected")
], ge);
export {
  Oc as CONTAINER_HEADER,
  Nc as CONTAINER_INSET,
  Ie as ModuxCanvas,
  Z as ModuxEditor,
  ge as ModuxEditorConnected,
  Sa as aggregatesScene,
  ct as apiImplNodeId,
  pt as apiOpOccurrenceId,
  Rc as containerFit,
  da as containerMinSize,
  Ia as contextMapScene,
  va as distributionScene,
  ha as flowCoherence,
  La as flowsScene,
  at as normalizeViewLayout,
  no as ownershipIndex,
  di as processesScene,
  fa as relationEdgeId,
  ra as resolveOverlaps
};
