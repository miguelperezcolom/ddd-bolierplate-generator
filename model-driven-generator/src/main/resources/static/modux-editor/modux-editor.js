const Nc = 34, Lc = 10;
function da(e, t = 24) {
  const n = new Map(e.map((o) => [o.id, { x: o.x, y: o.y }]));
  for (let o = 0; o < 80; o++) {
    let s = !1;
    for (let a = 0; a < e.length; a++)
      for (let d = a + 1; d < e.length; d++) {
        const l = e[a], u = e[d], g = n.get(l.id), h = n.get(u.id), f = h.x - g.x, y = h.y - g.y, w = (l.w + u.w) / 2 + t - Math.abs(f), c = (l.h + u.h) / 2 + t - Math.abs(y);
        if (!(w <= 0 || c <= 0))
          if (s = !0, w < c) {
            const r = (f >= 0 ? 1 : -1) * w / 2;
            g.x -= r, h.x += r;
          } else {
            const r = (y >= 0 ? 1 : -1) * c / 2;
            g.y -= r, h.y += r;
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
function la(e, t = { w: 160, h: 90 }) {
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
function Dc(e, t, n) {
  let i = t.w / 2, o = t.w / 2, s = t.h / 2, a = t.h / 2;
  for (const d of n)
    i = Math.max(i, -d.dx + d.w / 2 + 10), o = Math.max(o, d.dx + d.w / 2 + 10), s = Math.max(s, -d.dy + d.h / 2 + 34), a = Math.max(a, d.dy + d.h / 2 + 10);
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
const ca = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, di = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, pa = {
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
function no(e, t) {
  const n = new Map((e.apis ?? []).map((i) => [i.id, i]));
  return (e.apiImplementations ?? []).filter((i) => i.boundedContextId === t && n.has(i.apiId)).map((i) => ({
    id: ct(i.apiId, i.boundedContextId),
    name: n.get(i.apiId).name,
    kind: "api-impl"
  }));
}
function ua(e, t) {
  const n = t.targetApiId ? (e.apis ?? []).find((i) => i.id === t.targetApiId) : void 0;
  return (n == null ? void 0 : n.operations) ?? [];
}
const ma = 108, fa = 32;
function ha(e, t) {
  return `rel:${e}->${t}`;
}
function ga(e, t) {
  const n = new Set(e.externalSystems.map((i) => i.id));
  return t.sourceId === t.targetId ? "INTERNAL" : n.has(t.sourceId) || n.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (i) => i.sourceId === t.sourceId && i.targetId === t.targetId && i.declared
  ) ? "OK" : e.relations.some(
    (i) => i.sourceId === t.targetId && i.targetId === t.sourceId && i.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function io(e, t = "unified") {
  const n = /* @__PURE__ */ new Map();
  if (t === "distribution") {
    for (const o of e.boundedContexts) {
      const s = (e.modules ?? []).filter((a) => a.boundedContextId === o.id);
      if (!(s.length <= 1)) {
        for (const a of Dt(e, o)) n.set(a.id, o.id);
        for (const a of s) {
          n.set(a.id, o.id);
          for (const d of a.elementIds ?? []) n.set(d, a.id);
        }
      }
    }
    return n;
  }
  const i = (o, s, a) => {
    const d = (e.apis ?? []).find((l) => l.id === o);
    for (const l of (d == null ? void 0 : d.operations) ?? [])
      n.set(s ? pt(l.id, s) : l.id, a);
  };
  for (const o of e.boundedContexts) {
    for (const s of Dt(e, o)) n.set(s.id, o.id);
    for (const s of no(e, o.id)) {
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
const ya = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, ba = {
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
}, Ia = {
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
function Dt(e, t) {
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
function xa(e, t, n = {}, i = /* @__PURE__ */ new Set(), o = !1) {
  return oo(e, t, "unified", n, i, o);
}
function va(e, t, n = {}, i = /* @__PURE__ */ new Set(), o = !1) {
  return oo(e, t, "distribution", n, i, o);
}
function oo(e, t, n, i = {}, o = /* @__PURE__ */ new Set(), s = !1) {
  const a = n === "distribution";
  if (s) {
    const p = new Set(o);
    for (const P of e.boundedContexts) p.add(P.id);
    for (const P of e.externalSystems) p.add(P.id);
    for (const P of e.apis ?? []) p.add(P.id);
    for (const P of e.proxyApis ?? []) p.add(P.id);
    for (const P of e.apiImplementations ?? [])
      p.add(ct(P.apiId, P.boundedContextId));
    for (const P of e.modules ?? []) p.add(P.id);
    o = p;
  }
  const d = !a, l = new Set(e.externalSystems.map((p) => p.id)), u = (e.apis ?? []).filter(
    (p) => p.publishedByExternalSystemId && l.has(p.publishedByExternalSystemId)
  ), g = new Set(u.map((p) => p.id)), h = (e.proxyApis ?? []).filter(
    (p) => p.publishedByExternalSystemId && l.has(p.publishedByExternalSystemId)
  ), f = new Set(h.map((p) => p.id)), y = new Map((e.apis ?? []).map((p) => [p.id, p])), w = new Map((e.proxyApis ?? []).map((p) => [p.id, p])), c = (p, P) => {
    var z;
    if (a) {
      if (P === "boundedContext") {
        const B = (e.modules ?? []).filter((fe) => fe.boundedContextId === p);
        if (B.length <= 1) return [];
        const F = new Set(B.flatMap((fe) => fe.elementIds ?? [])), Q = e.boundedContexts.find((fe) => fe.id === p), ue = Q ? Dt(e, Q).filter((fe) => !F.has(fe.id)) : [];
        return [
          ...B.map((fe) => ({ id: fe.id, name: fe.name, kind: "module" })),
          ...ue
        ];
      }
      if (P === "module") {
        const B = (e.modules ?? []).find((ue) => ue.id === p), F = e.boundedContexts.find((ue) => ue.id === (B == null ? void 0 : B.boundedContextId));
        if (!B || !F) return [];
        const Q = new Map(Dt(e, F).map((ue) => [ue.id, ue]));
        return (B.elementIds ?? []).map((ue) => Q.get(ue)).filter((ue) => !!ue);
      }
      return [];
    }
    switch (P) {
      case "boundedContext": {
        const B = e.boundedContexts.find((F) => F.id === p);
        return B ? [...no(e, p), ...Dt(e, B)] : [];
      }
      case "external-system": {
        const B = e.externalSystems.find((F) => F.id === p);
        return [
          ...e.externalSystems.filter((F) => F.parentExternalSystemId === p).map((F) => ({ id: F.id, name: F.name, kind: "external-system" })),
          ...u.filter((F) => F.publishedByExternalSystemId === p).map((F) => ({ id: F.id, name: F.name, kind: "api" })),
          ...h.filter((F) => F.publishedByExternalSystemId === p).map((F) => ({ id: F.id, name: F.name, kind: "proxy-api" })),
          ...((B == null ? void 0 : B.useCases) ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "external-use-case" })
          ),
          ...((B == null ? void 0 : B.tables) ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "external-table" })
          ),
          ...((B == null ? void 0 : B.mcpServers) ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "mcp-server" })
          )
        ];
      }
      case "api":
        return (((z = y.get(p)) == null ? void 0 : z.operations) ?? []).map(
          (B) => ({ id: B.id, name: B.name, kind: "api-operation" })
        );
      case "api-impl": {
        const B = /^apiimpl:(.+)@(.+)$/.exec(p), F = B ? y.get(B[1]) : void 0;
        return ((F == null ? void 0 : F.operations) ?? []).map(
          (Q) => ({
            id: pt(Q.id, B[2]),
            name: Q.name,
            kind: "api-op-occurrence"
          })
        );
      }
      case "proxy-api": {
        const B = w.get(p);
        return B ? ua(e, B).map(
          (F) => ({
            id: pt(F.id, p),
            name: F.name,
            kind: "api-op-occurrence"
          })
        ) : [];
      }
      default:
        return [];
    }
  }, r = [], m = [], v = (p, P, z) => {
    const B = -Math.PI / 2 + 2 * Math.PI * P / Math.max(z, 1), F = 160 + 12 * Math.min(z, 14);
    return { x: p.x + F * Math.cos(B), y: p.y + F * Math.sin(B) };
  }, $ = (p, P, z, B) => {
    const F = c(p, P);
    F.forEach((Q, ue) => {
      const fe = t[Q.id] ?? v(B, ue, F.length), ie = c(Q.id, Q.kind), Ie = o.has(Q.id) && ie.length > 0, Te = Q.policy ? ya : ba[Q.kind], qe = Q.kind === "external-system";
      r.push({
        id: Q.id,
        label: Q.name,
        kind: Q.kind,
        x: fe.x,
        y: fe.y,
        w: qe ? 150 : ma + 12,
        h: qe ? 44 : fa + 4,
        symbol: Te.symbol,
        fill: Te.fill,
        stroke: Te.stroke,
        dashed: qe || void 0,
        ownerId: p,
        collapsible: ie.length > 0,
        collapsed: ie.length > 0 && !Ie,
        tooltip: `${Q.policy ? "Policy" : Ia[Q.kind]} ${Q.name} — parte de ${z}`
      }), m.push({
        id: `contains:${p}->${Q.id}`,
        sourceId: p,
        targetId: Q.id,
        kind: "contains",
        color: "#94a3b8",
        tooltip: `${z} contiene ${Q.name}`
      }), Ie && $(Q.id, Q.kind, Q.name, fe);
    });
  }, S = [
    ...e.boundedContexts.map((p) => ({ ref: p, external: !1, api: !1, proxy: !1 })),
    ...(a ? [] : e.externalSystems).filter((p) => !p.parentExternalSystemId || !l.has(p.parentExternalSystemId)).map((p) => ({ ref: p, external: !0, api: !1, proxy: !1 })),
    ...a ? [] : (e.apis ?? []).filter((p) => !g.has(p.id)).map((p) => ({ ref: p, external: !1, api: !0, proxy: !1 })),
    ...a ? [] : (e.proxyApis ?? []).filter((p) => !f.has(p.id)).map((p) => ({ ref: p, external: !1, api: !1, proxy: !0 })),
    ...a ? [] : (e.workflows ?? []).map((p) => ({
      ref: p,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones enter through their context.
    ...a ? [] : (e.etlFlows ?? []).filter((p) => !p.ownerBoundedContextId).map((p) => ({
      ref: p,
      external: !1,
      api: !1,
      proxy: !1,
      etl: !0
    })),
    ...(e.identityProviders ?? []).map((p) => ({
      ref: p,
      external: !1,
      api: !1,
      proxy: !1,
      idp: !0
    }))
  ];
  S.forEach((p, P) => {
    const z = t[p.ref.id] ?? st(P, S.length);
    if ("idp" in p && p.idp) {
      const ie = p.ref, Ie = !!ie.publishedByExternalSystemId;
      r.push({
        id: ie.id,
        label: ie.name,
        kind: "identity-provider",
        symbol: "key",
        fill: Ie ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: Ie,
        badge: ie.type ?? "IDP",
        tooltip: `${ie.name} — emite las identidades que el sistema confía${Ie ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: z.x,
        y: z.y,
        w: Ke,
        h: Xe
      });
      return;
    }
    if ("etl" in p && p.etl) {
      const ie = p.ref;
      r.push({
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
    if ("workflow" in p && p.workflow) {
      const ie = p.ref;
      r.push({
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
    if (p.proxy) {
      const ie = p.ref, Ie = c(ie.id, "proxy-api"), Te = o.has(ie.id) && Ie.length > 0;
      r.push({
        id: ie.id,
        label: ie.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${ie.name} — proxy/cache de una API, consumible como ella`,
        collapsible: Ie.length > 0,
        collapsed: Ie.length > 0 && !Te,
        x: z.x,
        y: z.y,
        w: Ke,
        h: Xe
      }), Te && $(ie.id, "proxy-api", ie.name, z);
      return;
    }
    if (p.api) {
      const ie = p.ref, Ie = c(ie.id, "api"), Te = o.has(ie.id) && Ie.length > 0;
      r.push({
        id: ie.id,
        label: ie.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${ie.name} — API publicada (sus operaciones apuntan a quien las implementa)`,
        collapsible: Ie.length > 0,
        collapsed: Ie.length > 0 && !Te,
        x: z.x,
        y: z.y,
        w: Ke,
        h: Xe
      }), Te && $(ie.id, "api", ie.name, z);
      return;
    }
    if (p.external) {
      const ie = p.ref, Ie = c(ie.id, "external-system"), Te = o.has(ie.id) && Ie.length > 0, qe = i[ie.id];
      r.push({
        id: ie.id,
        label: ie.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: ie.referencedRepositoryId ? "PROYECTO" : "EXTERNAL",
        tooltip: ie.referencedRepositoryId ? `${ie.name} — otro proyecto modux (repositorio ${ie.referencedRepositoryId}), referenciado del catálogo` : `${ie.name} (sistema externo)`,
        collapsible: Ie.length > 0,
        collapsed: Ie.length > 0 && !Te,
        resizable: !0,
        x: z.x,
        y: z.y,
        w: (qe == null ? void 0 : qe.w) ?? Ke,
        h: (qe == null ? void 0 : qe.h) ?? Xe
      }), Te && $(ie.id, "external-system", ie.name, z);
      return;
    }
    const B = p.ref, F = B.subdomainType ?? "GENERIC", Q = c(B.id, "boundedContext"), ue = o.has(B.id) && Q.length > 0, fe = i[B.id];
    r.push({
      id: B.id,
      label: B.name,
      kind: "boundedContext",
      symbol: "component",
      fill: ca[F],
      stroke: "#94a3b8",
      badge: F,
      tooltip: a && Q.length === 0 ? `${B.name} — un solo módulo (el principal): el servicio lo despliega entero. Añade un módulo desde la paleta para repartir sus elementos` : `${B.name} — subdominio ${F}`,
      collapsible: Q.length > 0,
      collapsed: Q.length > 0 && !ue,
      resizable: !0,
      x: z.x,
      y: z.y,
      w: (fe == null ? void 0 : fe.w) ?? Ke,
      h: (fe == null ? void 0 : fe.h) ?? Xe
    }), ue && $(B.id, "boundedContext", B.name, z);
  });
  const T = a ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, R = S.length + T.actors.length + T.aiAgents.length + T.rags.length + T.mcpGateways.length;
  T.actors.forEach((p, P) => {
    const z = t[p.id] ?? st(S.length + P, R);
    r.push({
      id: p.id,
      label: p.name,
      x: z.x,
      y: z.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${p.name} (actor)`
    });
  }), T.aiAgents.forEach((p, P) => {
    const z = t[p.id] ?? st(S.length + (e.actors ?? []).length + P, R);
    r.push({
      id: p.id,
      label: p.name,
      x: z.x,
      y: z.y,
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
  }), T.mcpGateways.forEach((p, P) => {
    const z = t[p.id] ?? st(
      S.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + P,
      R
    );
    r.push({
      id: p.id,
      label: p.name,
      x: z.x,
      y: z.y,
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
  const L = [];
  if (T.rags.forEach((p, P) => {
    const z = t[p.id] ?? st(
      S.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + P,
      R
    );
    r.push({
      id: p.id,
      label: p.name,
      x: z.x,
      y: z.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${p.name} (base de conocimiento — retrieval para agentes)`
    }), (p.contentSources ?? []).forEach((B, F) => {
      const Q = `ragcs:${p.id}:${B.uri}`, ue = t[Q] ?? { x: z.x + 170, y: z.y - 30 + F * 44 };
      r.push({
        id: Q,
        label: B.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: ue.x,
        y: ue.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: B.type,
        tooltip: `${B.type}: ${B.uri}`
      }), L.push({
        id: `ragcse:${p.id}:${B.uri}`,
        sourceId: Q,
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
    p.forEach((z, B) => {
      const F = t[z.id] ?? st(S.length + B, S.length + p.length);
      r.push({
        id: z.id,
        label: z.name,
        kind: "service",
        symbol: "gear",
        fill: "#f8fafc",
        stroke: "#334155",
        badge: "SERVICIO",
        tooltip: `${z.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
        x: F.x,
        y: F.y,
        w: Ke,
        h: Xe
      });
    });
    const P = [];
    [...new Set(p.filter((z) => z.database).map((z) => z.database))].forEach((z) => P.push({
      id: `infra-db:${z}`,
      label: z,
      badge: "BD",
      symbol: "readmodel",
      tooltip: `Base de datos ${z} — la usan los servicios que declaran database=${z}`
    })), p.some((z) => z.outboxEnabled) && P.push({
      id: "infra-broker",
      label: "Broker de eventos",
      badge: "BROKER",
      symbol: "event",
      tooltip: "Broker (Kafka/…) — lo alimentan los servicios con outbox"
    }), (e.workflows ?? []).length && P.push({
      id: "infra-workflow-engine",
      label: "Workflow engine",
      badge: "ENGINE",
      symbol: "process",
      tooltip: "Motor de workflows — ejecuta los workflows del modelo"
    }), (e.pages ?? []).length && P.push({
      id: "infra-forms-engine",
      label: "Forms engine",
      badge: "ENGINE",
      symbol: "interface",
      tooltip: "Motor de formularios (Mateu) — sirve las páginas declaradas"
    }), P.forEach((z, B) => {
      const F = t[z.id] ?? st(
        S.length + p.length + B,
        S.length + p.length + P.length
      );
      r.push({
        id: z.id,
        label: z.label,
        kind: "infrastructure",
        symbol: z.symbol,
        fill: "#fffbeb",
        stroke: "#92400e",
        dashed: !0,
        badge: z.badge,
        tooltip: z.tooltip,
        x: F.x,
        y: F.y,
        w: Ke,
        h: Xe
      });
    });
  }
  r.sort((p, P) => (p.parentId ? 1 : 0) - (P.parentId ? 1 : 0));
  const V = e.relations.map((p) => ({
    id: ha(p.sourceId, p.targetId),
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "relation",
    label: p.type ? di[p.type] : p.inferredType ? `≈${di[p.inferredType]}` : "?",
    color: p.declared ? "#475569" : "#94a3b8",
    dashed: !p.declared,
    arrow: !0,
    tooltip: p.type ? `${p.type} (${p.sourceId} upstream → ${p.targetId} downstream)${p.reasons ? ` — ${p.reasons}` : ""}` : p.inferredType ? `≈ ${p.inferredType} INFERIDO de las dependencias — doble click para declararlo (o corregirlo)${p.reasons ? ` — ${p.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${p.reasons ? ` — ${p.reasons}` : ""}`
  })), H = e.flows.map((p) => {
    var ue, fe, ie, Ie, Te, qe;
    const P = ga(e, p), z = d ? e.boundedContexts.find((Ue) => Ue.id === p.sourceId) : void 0, B = ((ue = z == null ? void 0 : z.domainEvents) == null ? void 0 : ue.find((Ue) => Ue.name === p.triggerEvent)) ?? ((fe = z == null ? void 0 : z.applicationEvents) == null ? void 0 : fe.find((Ue) => Ue.name === p.triggerEvent)), F = d && p.readModelName ? (Ie = (ie = e.boundedContexts.find((Ue) => Ue.id === p.targetId)) == null ? void 0 : ie.readModels) == null ? void 0 : Ie.find((Ue) => Ue.name === p.readModelName) : void 0, Q = d && p.targetUseCaseId ? (qe = (Te = e.boundedContexts.find((Ue) => Ue.id === p.targetId)) == null ? void 0 : Te.useCases) == null ? void 0 : qe.find((Ue) => Ue.id === p.targetUseCaseId) : void 0;
    return {
      id: `flow:${p.id}`,
      sourceId: (B == null ? void 0 : B.id) ?? p.sourceId,
      targetId: (Q == null ? void 0 : Q.id) ?? (F == null ? void 0 : F.id) ?? p.targetId,
      kind: "flow",
      label: p.name,
      color: pa[P],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${p.name} [${p.archetype}] — ${P}`
    };
  }), ae = new Map((e.apis ?? []).map((p) => [p.id, p])), C = new Set(e.boundedContexts.map((p) => p.id)), W = (e.apiImplementations ?? []).filter(
    (p) => ae.has(p.apiId) && C.has(p.boundedContextId)
  ), G = new Set(r.map((p) => p.id)), M = io(e, n), j = /* @__PURE__ */ new Map(), b = (p) => {
    const P = j.get(p);
    if (P !== void 0) return P;
    let z = p;
    for (let B = 0; z && B < 16; B++) {
      if (G.has(z))
        return j.set(p, z), z;
      z = M.get(z);
    }
    return j.set(p, null), null;
  }, x = { has: (p) => b(p) !== null }, I = (p) => {
    const P = /* @__PURE__ */ new Set(), z = [];
    for (const B of p) {
      if (B.kind === "contains" || B.targetId.startsWith("edgeanchor:")) {
        z.push(B);
        continue;
      }
      const F = b(B.sourceId), Q = b(B.targetId);
      if (!F || !Q || F === Q) continue;
      if (F === B.sourceId && Q === B.targetId) {
        z.push(B);
        continue;
      }
      const ue = `${B.kind}|${F}|${Q}`;
      P.has(ue) || (P.add(ue), z.push({
        ...B,
        sourceId: F,
        targetId: Q,
        tooltip: `${B.tooltip ?? B.kind} — de un elemento plegado dentro`
      }));
    }
    return z;
  }, k = a ? [
    ...(e.services ?? []).flatMap(
      (p) => (p.moduleIds ?? []).map((P) => {
        var B;
        if (!x.has(p.id)) return null;
        const z = x.has(P) ? P : (B = (e.modules ?? []).find((F) => F.id === P)) == null ? void 0 : B.boundedContextId;
        return !z || !x.has(z) ? null : {
          id: `deploy:${p.id}->${P}`,
          sourceId: p.id,
          targetId: z,
          kind: "deploys",
          color: "#334155",
          dashed: !0,
          arrow: !0,
          tooltip: `desplegado en ${p.name} — Supr lo desconecta`
        };
      }).filter((P) => P !== null)
    ),
    ...(e.services ?? []).flatMap((p) => {
      const P = [];
      return p.database && x.has(`infra-db:${p.database}`) && x.has(p.id) && P.push({
        id: `infradb:${p.id}`,
        sourceId: p.id,
        targetId: `infra-db:${p.database}`,
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} persiste en ${p.database}`
      }), p.outboxEnabled && x.has("infra-broker") && x.has(p.id) && P.push({
        id: `infrabroker:${p.id}`,
        sourceId: p.id,
        targetId: "infra-broker",
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} publica eventos por el outbox`
      }), P;
    })
  ] : [], _ = d ? (e.emissions ?? []).filter((p) => x.has(p.sourceId) && x.has(p.domainEventId)).map((p) => ({
    id: `emit:${p.sourceId}->${p.domainEventId}`,
    sourceId: p.sourceId,
    targetId: p.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], A = d ? (e.projections ?? []).map((p) => ({
    p,
    source: p.sourceAggregateId ?? p.sourceExternalUseCaseId ?? p.sourceExternalTableId
  })).filter(({ p, source: P }) => P && p.readModelId).filter(({ p, source: P }) => x.has(P) && x.has(p.readModelId)).map(({ p, source: P }) => ({
    id: `proj:${p.id}`,
    sourceId: P,
    targetId: p.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: p.sourceAggregateId ? `Proyección ${p.name}: el estado del agregado se materializa en ${p.readModelName ?? p.readModelId}` : `Proyección ${p.name}: polling hacia ${p.readModelName ?? p.readModelId}`
  })) : [], N = (e.apis ?? []).flatMap(
    (p) => p.operations.flatMap((P) => {
      const z = d && P.targetUseCaseId && x.has(P.targetUseCaseId) ? P.targetUseCaseId : P.targetBoundedContextId && x.has(P.targetBoundedContextId) ? P.targetBoundedContextId : (P.targetUseCaseId && !d, null);
      if (!z) return [];
      const B = d && x.has(P.id) ? P.id : p.id;
      return x.has(B) ? [
        {
          id: `apiwire:${P.id}`,
          sourceId: B,
          targetId: z,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${P.name} la implementa ${z}`
        }
      ] : [];
    })
  ), O = d ? (e.useCaseCalls ?? []).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => ({
    id: `uccall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], U = [
    ...e.boundedContexts.filter((p) => p.identityProviderId && x.has(p.id) && x.has(p.identityProviderId)).map((p) => ({
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
    ...(e.etlFlows ?? []).filter((p) => p.identityProviderId && x.has(p.identityProviderId)).flatMap((p) => {
      const P = x.has(p.id) ? p.id : p.ownerBoundedContextId && x.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
      return P ? [{
        id: `idpsvc:${p.id}`,
        sourceId: P,
        targetId: p.identityProviderId,
        kind: "idp-service",
        color: "#ca8a04",
        label: "identidad de servicio",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} corre con una identidad de servicio de este IdP`
      }] : [];
    }),
    ...(e.identityProviders ?? []).filter((p) => p.publishedByExternalSystemId && x.has(p.id) && x.has(p.publishedByExternalSystemId)).map((p) => ({
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
  ], D = d ? e.boundedContexts.flatMap((p) => p.scheduledTriggers ?? []).filter((p) => p.useCaseId && x.has(p.id) && x.has(p.useCaseId)).map((p) => ({
    id: `stfire:${p.id}->${p.useCaseId}`,
    sourceId: p.id,
    targetId: p.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: p.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${p.cronExpression ?? "cron"}`
  })) : [], X = d ? (e.aggregateCalls ?? []).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => ({
    id: `aggcall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], se = d ? (e.queryCalls ?? []).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => ({
    id: `qscall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], he = d ? (e.actorUses ?? []).filter((p) => x.has(p.actorId) && x.has(p.targetId)).map((p) => ({
    id: `use:${p.actorId}->${p.targetId}`,
    sourceId: p.actorId,
    targetId: p.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], Y = (e.actorExternalDependencies ?? []).filter((p) => x.has(p.actorId) && x.has(p.externalSystemId)).map((p) => ({
    id: `extdep:${p.actorId}->${p.externalSystemId}`,
    sourceId: p.actorId,
    targetId: p.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), J = new Map([
    ...(e.apis ?? []).filter((p) => p.publishedByExternalSystemId).map((p) => [p.id, p.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((p) => p.publishedByExternalSystemId).map((p) => [p.id, p.publishedByExternalSystemId])
  ]), ce = (p) => x.has(p) ? p : J.get(p) ?? p, be = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((p) => ({
        sourceId: p.sourceId,
        targetId: ce(p.targetId),
        cqrs: p.type === "CQRS"
      })).filter(
        (p) => x.has(p.sourceId) && x.has(p.targetId) && p.sourceId !== p.targetId
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
  ], $e = /* @__PURE__ */ new Map();
  for (const p of e.boundedContexts) {
    for (const P of p.useCases ?? []) $e.set(P.id, p.id);
    for (const P of p.domainEvents ?? []) $e.set(P.id, p.id);
    for (const P of p.applicationEvents ?? []) $e.set(P.id, p.id);
    for (const P of p.queryServices ?? []) $e.set(P.id, p.id);
  }
  const Ce = (p) => x.has(p) ? p : $e.get(p) ?? p, K = /* @__PURE__ */ new Map();
  for (const p of e.boundedContexts) {
    for (const P of p.domainEvents ?? []) K.set(P.name, P.id);
    for (const P of p.applicationEvents ?? []) K.set(P.name, P.id);
  }
  const ne = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (p) => (p.steps ?? []).filter((P) => P.targetUseCaseId).map((P) => ({ sourceId: p.id, targetId: Ce(P.targetUseCaseId) }))
      ).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => [
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
  ], Se = [
    ...new Map(
      (e.workflows ?? []).filter((p) => p.triggerEvent && K.has(p.triggerEvent)).map((p) => ({
        sourceId: Ce(K.get(p.triggerEvent)),
        targetId: p.id,
        label: p.triggerEvent
      })).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => [
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
  ], Ee = /* @__PURE__ */ new Map();
  for (const p of e.externalSystems)
    for (const P of p.tables ?? []) Ee.set(P.id, p.id);
  const Be = (e.notifications ?? []).flatMap((p) => {
    var B;
    const P = x.has(p.id) ? p.id : p.ownerBoundedContextId && x.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
    if (!P) return [];
    const z = [];
    if (p.eventId) {
      const F = x.has(p.eventId) ? p.eventId : $e.get(p.eventId);
      F && x.has(F) && F !== P && z.push({
        id: `notif:${p.id}`,
        sourceId: F,
        targetId: P,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const F of p.recipientRoleIds ?? [])
      x.has(F) && z.push({
        id: `notifto:${p.id}:${F}`,
        sourceId: P,
        targetId: F,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((B = (p.channels ?? [])[0]) == null ? void 0 : B.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} avisa a este rol — Supr lo quita`
      });
    return z;
  }), Re = (e.documents ?? []).flatMap((p) => {
    const P = x.has(p.id) ? p.id : p.ownerBoundedContextId && x.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
    if (!P || !p.queryServiceId) return [];
    const z = x.has(p.queryServiceId) ? p.queryServiceId : $e.get(p.queryServiceId);
    return !z || !x.has(z) || z === P ? [] : [{
      id: `docq:${p.id}`,
      sourceId: z,
      targetId: P,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), et = (e.etlFlows ?? []).flatMap(
    (p) => (p.steps ?? []).flatMap((P) => {
      const z = x.has(p.id) ? p.id : p.ownerBoundedContextId && x.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
      if (!z) return [];
      const B = P.externalTableId ?? P.operationId ?? P.apiId ?? P.eventId;
      if (!B) return [];
      let F = B;
      if (!x.has(F) && P.operationId && P.apiId && (F = P.apiId), !x.has(F) && P.externalTableId && (F = Ee.get(P.externalTableId) ?? F), x.has(F) || (F = ce(F)), x.has(F) || (F = $e.get(B) ?? F), !x.has(F) || F === z) return [];
      const Q = P.type.startsWith("SOURCE");
      return [{
        id: `etl:${p.id}:${P.id}`,
        sourceId: Q ? F : z,
        targetId: Q ? z : F,
        kind: Q ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: P.type === "SOURCE_PULL" ? "pull" : P.type === "SOURCE_CONSUMER" ? "consume" : P.type === "WRITE_API" ? "api" : P.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: Q ? `${p.name} lee de aquí (${P.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${p.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), wt = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (p) => (p.sourceExternalTableIds ?? []).map((P) => ({
          sourceId: x.has(P) ? P : Ee.get(P) ?? P,
          targetId: p.id,
          name: p.name
        }))
      ).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => [
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
  ], Jt = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (p) => (p.sourceApiIds ?? []).map((P) => ({
          sourceId: ce(P),
          targetId: p.id,
          name: p.name
        }))
      ).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => [
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
  ], qo = [
    ...new Map(
      (e.rags ?? []).flatMap((p) => [
        ...(p.sourceExternalSystemIds ?? []).map((P) => ({ sourceId: P, targetId: p.id, name: p.name })),
        ...(p.sourceBoundedContextIds ?? []).map((P) => ({ sourceId: P, targetId: p.id, name: p.name }))
      ]).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => [
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
  ], Uo = [
    ...new Map(
      (e.agentApiUses ?? []).map((p) => ({ sourceId: p.agentId, targetId: ce(p.apiId) })).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => [
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
  ], Fo = (p) => p.onCompletionEventName || `${p.name.replace(/\s+/g, "")}Completado`, Bo = (e.workflows ?? []).flatMap(
    (p) => p.triggerEvent ? (e.workflows ?? []).filter((P) => P.id !== p.id && Fo(P) === p.triggerEvent).filter((P) => x.has(P.id) && x.has(p.id)).map((P) => ({
      id: `wfchain:${P.id}->${p.id}`,
      sourceId: P.id,
      targetId: p.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: p.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), jo = [
    ...new Map(
      (e.proxyApis ?? []).filter((p) => p.targetApiId).map((p) => ({ sourceId: ce(p.id), targetId: ce(p.targetApiId) })).filter(
        (p) => x.has(p.sourceId) && x.has(p.targetId) && p.sourceId !== p.targetId
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
  ], Wo = W.flatMap((p) => {
    const P = ct(p.apiId, p.boundedContextId);
    if (!x.has(P)) return [];
    const z = [];
    for (const B of (e.proxyApis ?? []).filter((F) => F.targetApiId === p.apiId)) {
      const F = ce(B.id);
      x.has(F) && F !== P && z.push({
        id: `pxr:${F}->${P}`,
        sourceId: F,
        targetId: P,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return z;
  }), Vo = (e.proxyOperationRoutes ?? []).flatMap((p) => {
    const P = (e.proxyApis ?? []).find((F) => F.id === p.proxyId);
    if (!(P != null && P.targetApiId)) return [];
    const z = pt(p.operationId, p.proxyId), B = p.targetSiteId === P.targetApiId ? P.targetApiId : ct(P.targetApiId, p.targetSiteId);
    return !x.has(z) || !x.has(B) ? [] : [{
      id: `oproute:${z}->${B}`,
      sourceId: z,
      targetId: B,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Ho = [
    ...new Map(
      (e.externalOperationUses ?? []).map((p) => {
        if (!x.has(p.externalSystemId)) return null;
        const P = (e.apis ?? []).find(
          (Q) => Q.operations.some((ue) => ue.id === p.operationId)
        );
        if (!P) return null;
        const z = p.siteId === P.id, B = z ? p.operationId : pt(p.operationId, p.siteId);
        let F = x.has(B) ? B : null;
        if (!F)
          if (z || (e.proxyApis ?? []).some((Q) => Q.id === p.siteId))
            F = ce(p.siteId);
          else {
            const Q = ct(P.id, p.siteId);
            F = x.has(Q) ? Q : p.siteId;
          }
        return !F || !x.has(F) || F === p.externalSystemId ? null : { u: p, target: F };
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
  ], Go = d ? (e.apiOperationImplementations ?? []).flatMap((p) => {
    if (!x.has(p.useCaseId)) return [];
    const P = x.has(pt(p.operationId, p.boundedContextId)) ? pt(p.operationId, p.boundedContextId) : x.has(ct(p.apiId, p.boundedContextId)) ? ct(p.apiId, p.boundedContextId) : x.has(ce(p.boundedContextId)) ? ce(p.boundedContextId) : null;
    return P ? [{
      id: `apiimplwire:${p.operationId}@${p.boundedContextId}`,
      sourceId: P,
      targetId: p.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], Yo = d ? (e.agentUses ?? []).filter((p) => x.has(p.agentId) && x.has(p.useCaseId)).map((p) => ({
    id: `mcp:${p.agentId}->${p.useCaseId}`,
    sourceId: p.agentId,
    targetId: p.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Ko = (e.agentRags ?? []).filter((p) => x.has(p.agentId) && x.has(p.ragId)).map((p) => ({
    id: `agrag:${p.agentId}->${p.ragId}`,
    sourceId: p.agentId,
    targetId: p.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), Xo = d ? (e.rags ?? []).filter((p) => x.has(p.id)).flatMap(
    (p) => (p.sourceReadModelIds ?? []).filter((P) => x.has(P)).map((P) => ({
      id: `ragsrc:${p.id}->${P}`,
      sourceId: p.id,
      targetId: P,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name} indexa este read model`
    }))
  ) : [], Jo = d ? (e.agentExternalUses ?? []).filter((p) => x.has(p.agentId) && x.has(p.externalUseCaseId)).map((p) => ({
    id: `mcpx:${p.agentId}->${p.externalUseCaseId}`,
    sourceId: p.agentId,
    targetId: p.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Qo = d ? (e.agentMcpUses ?? []).filter((p) => x.has(p.agentId) && x.has(p.mcpServerId)).map((p) => ({
    id: `mcpsv:${p.agentId}->${p.mcpServerId}`,
    sourceId: p.agentId,
    targetId: p.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], Zo = (e.mcpGateways ?? []).flatMap(
    (p) => [
      ...p.mcpServerIds ?? [],
      ...p.apiIds ?? [],
      ...p.apiOperationIds ?? [],
      ...p.useCaseIds ?? [],
      ...p.ragIds ?? []
    ].filter((P) => x.has(p.id) && x.has(P)).map((P) => ({
      id: `gwx:${p.id}->${P}`,
      sourceId: p.id,
      targetId: P,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), ea = (e.agentGatewayUses ?? []).filter((p) => x.has(p.agentId) && x.has(p.gatewayId)).map((p) => ({
    id: `aggw:${p.agentId}->${p.gatewayId}`,
    sourceId: p.agentId,
    targetId: p.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), ta = d ? (e.agentApiOpUses ?? []).filter((p) => x.has(p.agentId) && x.has(p.apiOperationId)).map((p) => ({
    id: `agapi:${p.agentId}->${p.apiOperationId}`,
    sourceId: p.agentId,
    targetId: p.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], na = d ? (e.agentQueryUses ?? []).filter((p) => x.has(p.agentId) && x.has(p.queryServiceId)).map((p) => ({
    id: `agqs:${p.agentId}->${p.queryServiceId}`,
    sourceId: p.agentId,
    targetId: p.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], ia = (e.agentDelegations ?? []).filter((p) => x.has(p.agentId) && x.has(p.delegateAgentId)).map((p) => ({
    id: `agag:${p.agentId}->${p.delegateAgentId}`,
    sourceId: p.agentId,
    targetId: p.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), oa = (e.actorAgentUses ?? []).filter((p) => x.has(p.actorId) && x.has(p.agentId)).map((p) => ({
    id: `useag:${p.actorId}->${p.agentId}`,
    sourceId: p.actorId,
    targetId: p.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), aa = d ? (e.agentTriggers ?? []).filter((p) => x.has(p.eventId) && x.has(p.agentId)).map((p) => ({
    id: `evag:${p.eventId}->${p.agentId}`,
    sourceId: p.eventId,
    targetId: p.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], sa = d ? (e.externalCalls ?? []).filter((p) => x.has(p.externalSystemId) && x.has(p.useCaseId)).map((p) => ({
    id: `extcall:${p.externalSystemId}->${p.useCaseId}`,
    sourceId: p.externalSystemId,
    targetId: p.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], ra = d ? (e.externalUseCaseCalls ?? []).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => ({
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
    nodes: r,
    edges: I([
      // Composition first: the ownership diamonds paint under the semantic edges.
      ...m,
      ...k,
      ...V,
      ...H,
      ..._,
      ...A,
      ...N,
      ...O,
      ...D,
      ...U,
      ...Be,
      ...Re,
      ...et,
      ...X,
      ...se,
      ...he,
      ...Y,
      ...be,
      ...jo,
      ...Wo,
      ...Vo,
      ...Ho,
      ...Go,
      ...ne,
      ...Se,
      ...Bo,
      ...Uo,
      ...wt,
      ...Jt,
      ...qo,
      ...Yo,
      ...Jo,
      ...Qo,
      ...Zo,
      ...ea,
      ...ta,
      ...na,
      ...ia,
      ...oa,
      ...aa,
      ...Ko,
      ...Xo,
      ...L,
      ...sa,
      ...ra
    ])
  };
}
const wa = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, ka = 176, $a = 60, _a = 140, Ca = 40;
function Sa(e) {
  const t = {}, n = e.aggregates ?? [], i = e.entities ?? [];
  return e.boundedContexts.forEach((o, s) => {
    const a = 220 + s * 340;
    n.filter((l) => l.boundedContextId === o.id).forEach((l, u) => {
      const g = i.filter((f) => f.aggregateId === l.id).length, h = 140 + u * (170 + g * 60);
      t[l.id] = { x: a, y: h }, i.filter((f) => f.aggregateId === l.id).forEach((f, y) => {
        t[f.id] = { x: a + 60, y: h + 100 + y * 60 };
      });
    });
  }), n.filter((o) => !e.boundedContexts.some((s) => s.id === o.boundedContextId)).forEach((o, s) => {
    t[o.id] = { x: 220 + s * 340, y: 640 };
  }), t;
}
function Ea(e, t) {
  const n = Sa(e), i = (h) => t[h] ?? n[h] ?? { x: 200, y: 200 }, o = new Map(e.boundedContexts.map((h) => [h.id, h])), s = (e.aggregates ?? []).map((h) => {
    const f = o.get(h.boundedContextId), y = (f == null ? void 0 : f.subdomainType) ?? "GENERIC", w = i(h.id);
    return {
      id: h.id,
      label: h.name,
      x: w.x,
      y: w.y,
      w: ka,
      h: $a,
      kind: "aggregate",
      symbol: "aggregate",
      fill: wa[y],
      stroke: "#64748b",
      badge: `${f ? `${f.name.toUpperCase()} · ` : ""}AGGREGATE${(h.invariants ?? []).length ? ` · ⚖${h.invariants.length}` : ""}`,
      tooltip: `Agregado ${h.name}${f ? ` — contexto ${f.name} (${y})` : ""}`
    };
  }), a = (e.entities ?? []).map((h) => {
    const f = i(h.id);
    return {
      id: h.id,
      label: h.name,
      x: f.x,
      y: f.y,
      w: _a,
      h: Ca,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${h.name} (dentro del agregado)`
    };
  }), d = (e.aggregates ?? []).flatMap(
    (h) => (h.invariants ?? []).map((f, y) => {
      const w = i(h.id), c = t[f.id] ?? { x: w.x - 150, y: w.y + 90 + y * 52 };
      return {
        id: f.id,
        label: f.name,
        x: c.x,
        y: c.y,
        w: 150,
        h: 36,
        kind: "invariant",
        symbol: "shield",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        badge: "⚖ INVARIANTE",
        tooltip: `${f.name} — regla que el agregado protege; doble click abre la ficha del agregado (sus condiciones se detallan allí)`
      };
    })
  ), l = (e.aggregates ?? []).flatMap(
    (h) => (h.invariants ?? []).map((f) => ({
      id: `protects:${h.id}->${f.id}`,
      sourceId: h.id,
      targetId: f.id,
      kind: "invariant-containment",
      color: "#0f766e",
      dashed: !0,
      tooltip: "El agregado protege esta regla — Supr la retira"
    }))
  ), u = (e.entities ?? []).map((h) => ({
    id: `contains:${h.aggregateId}->${h.id}`,
    sourceId: h.aggregateId,
    targetId: h.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), g = (e.aggregateReferences ?? []).map((h, f) => ({
    id: `aggref:${f}:${h.sourceAggregateId}->${h.targetAggregateId}`,
    sourceId: h.sourceAggregateId,
    targetId: h.targetAggregateId,
    kind: "aggregate-reference",
    label: h.label,
    color: "#475569",
    arrow: !0,
    tooltip: h.label ? `Referencia: ${h.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...s, ...a, ...d],
    edges: [...u, ...g, ...l]
  };
}
const Aa = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Ma = 150, Pa = 44, Ta = 190, Oa = 56, Ra = 160, Na = 48;
function La(e, t) {
  const n = e.externalSystems.find((o) => o.id === t.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = e.boundedContexts.find((o) => o.id === t.targetId);
  return { id: t.targetId, label: (i == null ? void 0 : i.name) ?? t.targetId, external: !1 };
}
function Da(e, t) {
  const n = e.flows, i = [], o = [], s = /* @__PURE__ */ new Set(), a = (d) => {
    var l, u;
    return ((u = (l = e.aggregates) == null ? void 0 : l.find((g) => g.id === d)) == null ? void 0 : u.name) ?? d ?? "?";
  };
  return n.forEach((d, l) => {
    const u = 120 + l * 130, g = Aa[d.archetype] ?? "#475569", h = d.triggerAggregateId ?? d.sourceId;
    if (!s.has(h)) {
      s.add(h);
      const r = t[h] ?? { x: 160, y: u };
      i.push({
        id: h,
        label: d.triggerAggregateId ? a(d.triggerAggregateId) : h,
        x: r.x,
        y: r.y,
        w: Ma,
        h: Pa,
        kind: d.triggerAggregateId ? "aggregate" : "boundedContext",
        symbol: d.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: d.triggerAggregateId ? "AGGREGATE" : "BOUNDED_CONTEXT"
      });
    }
    const f = `flow:${d.id}`, y = t[f] ?? { x: 470, y: u };
    i.push({
      id: f,
      label: d.name,
      x: y.x,
      y: y.y,
      w: Ta,
      h: Oa,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: g,
      badge: d.archetype,
      tooltip: `Flow ${d.name} [${d.archetype}]${d.readModelName ? ` → read model ${d.readModelName}` : ""}${d.targetUseCaseId ? ` → use case ${d.targetUseCaseId}` : ""}`
    });
    const w = La(e, d), c = `tgt:${w.id}`;
    if (!s.has(c)) {
      s.add(c);
      const r = t[c] ?? { x: 790, y: u };
      i.push({
        id: c,
        label: w.label,
        x: r.x,
        y: r.y,
        w: Ra,
        h: Na,
        kind: w.external ? "external-system" : "boundedContext",
        symbol: "component",
        fill: w.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: w.external,
        badge: w.external ? "EXTERNAL" : "BOUNDED_CONTEXT"
      });
    }
    o.push({
      id: `fe:${d.id}:in`,
      sourceId: h,
      targetId: f,
      kind: "flow-trigger",
      label: d.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: d.triggerEvent ? `Evento: ${d.triggerEvent}` : void 0
    }), o.push({
      id: `fe:${d.id}:out`,
      sourceId: f,
      targetId: c,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: i, edges: o };
}
const za = 190, qa = 56, An = 170, Ua = 52;
function li(e, t) {
  const n = [], i = [], o = (s) => {
    var a;
    return (a = e.boundedContexts.find((d) => d.id === s)) == null ? void 0 : a.name;
  };
  return (e.processes ?? []).forEach((s, a) => {
    const d = 140 + a * 240, l = t[s.id] ?? { x: 150, y: d };
    n.push({
      id: s.id,
      label: s.name,
      x: l.x,
      y: l.y,
      w: za,
      h: qa,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${s.sla ? ` · SLA ${s.sla}` : ""}`,
      tooltip: `${s.name}${o(s.ownerBoundedContextId) ? ` — contexto ${o(s.ownerBoundedContextId)}` : ""}${s.triggerEvent ? ` · arranca con ${s.triggerEvent}` : ""}`
    });
    let u = s.id;
    if (s.steps.forEach((g, h) => {
      const f = g.type === "HUMAN", y = t[g.id] ?? { x: 150 + (h + 1) * 240, y: d };
      if (n.push({
        id: g.id,
        label: g.name,
        x: y.x,
        y: y.y,
        w: An,
        h: Ua,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${g.roleId ? ` · ${g.roleId}` : ""}${g.deadline ? ` · ⏱ ${g.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${g.name}${g.useCaseId ? ` — use case ${g.useCaseId}` : ""}${g.deadline ? ` · deadline ${g.deadline}` : ""}`
      }), i.push({
        id: `pe:${s.id}:${h}`,
        sourceId: u,
        targetId: g.id,
        kind: "process-seq",
        label: h === 0 ? s.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), g.compensationUseCaseId) {
        const w = `comp:${g.id}`, c = t[w] ?? { x: y.x, y: y.y + 90 };
        n.push({
          id: w,
          label: g.compensationUseCaseId,
          x: c.x,
          y: c.y,
          w: An,
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
          targetId: w,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      u = g.id;
    }), s.onCompletionEventName) {
      const g = `done:${s.id}`, h = t[g] ?? { x: 150 + (s.steps.length + 1) * 240, y: d };
      n.push({
        id: g,
        label: s.onCompletionEventName,
        x: h.x,
        y: h.y,
        w: An,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), i.push({
        id: `pd:${s.id}`,
        sourceId: u,
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
const un = globalThis, Jn = un.ShadowRoot && (un.ShadyCSS === void 0 || un.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Qn = Symbol(), ci = /* @__PURE__ */ new WeakMap();
let ao = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== Qn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Jn && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = ci.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && ci.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Fa = (e) => new ao(typeof e == "string" ? e : e + "", void 0, Qn), xt = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new ao(n, e, Qn);
}, Ba = (e, t) => {
  if (Jn) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = un.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, pi = Jn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Fa(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ja, defineProperty: Wa, getOwnPropertyDescriptor: Va, getOwnPropertyNames: Ha, getOwnPropertySymbols: Ga, getPrototypeOf: Ya } = Object, ot = globalThis, ui = ot.trustedTypes, Ka = ui ? ui.emptyScript : "", Mn = ot.reactiveElementPolyfillSupport, zt = (e, t) => e, yn = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ka : null;
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
} }, Zn = (e, t) => !ja(e, t), mi = { attribute: !0, type: String, converter: yn, reflect: !1, useDefault: !1, hasChanged: Zn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ot.litPropertyMetadata ?? (ot.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let $t = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = mi) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && Wa(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: s } = Va(this.prototype, t) ?? { get() {
      return this[n];
    }, set(a) {
      this[n] = a;
    } };
    return { get: o, set(a) {
      const d = o == null ? void 0 : o.call(this);
      s == null || s.call(this, a), this.requestUpdate(t, d, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? mi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(zt("elementProperties"))) return;
    const t = Ya(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(zt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(zt("properties"))) {
      const n = this.properties, i = [...Ha(n), ...Ga(n)];
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
      for (const o of i) n.unshift(pi(o));
    } else t !== void 0 && n.push(pi(t));
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
    return Ba(t, this.constructor.elementStyles), t;
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
      const a = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : yn).toAttribute(n, i.type);
      this._$Em = t, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var s, a;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const d = i.getPropertyOptions(o), l = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((s = d.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? d.converter : yn;
      this._$Em = o;
      const u = l.fromAttribute(n, d.type);
      this[o] = u ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, s) {
    var a;
    if (t !== void 0) {
      const d = this.constructor;
      if (o === !1 && (s = this[t]), i ?? (i = d.getPropertyOptions(t)), !((i.hasChanged ?? Zn)(s, n) || i.useDefault && i.reflect && s === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(d._$Eu(t, i)))) return;
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
        const { wrapped: d } = a, l = this[s];
        d !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, a, l);
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
$t.elementStyles = [], $t.shadowRootOptions = { mode: "open" }, $t[zt("elementProperties")] = /* @__PURE__ */ new Map(), $t[zt("finalized")] = /* @__PURE__ */ new Map(), Mn == null || Mn({ ReactiveElement: $t }), (ot.reactiveElementVersions ?? (ot.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qt = globalThis, fi = (e) => e, bn = qt.trustedTypes, hi = bn ? bn.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, so = "$lit$", it = `lit$${Math.random().toFixed(9).slice(2)}$`, ro = "?" + it, Xa = `<${ro}>`, bt = document, Ft = () => bt.createComment(""), Bt = (e) => e === null || typeof e != "object" && typeof e != "function", ei = Array.isArray, Ja = (e) => ei(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Pn = `[ 	
\f\r]`, Mt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, gi = /-->/g, yi = />/g, rt = RegExp(`>|${Pn}(?:([^\\s"'>=/]+)(${Pn}*=${Pn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), bi = /'/g, Ii = /"/g, lo = /^(?:script|style|textarea|title)$/i, co = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), E = co(1), te = co(2), Ct = Symbol.for("lit-noChange"), de = Symbol.for("lit-nothing"), xi = /* @__PURE__ */ new WeakMap(), mt = bt.createTreeWalker(bt, 129);
function po(e, t) {
  if (!ei(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return hi !== void 0 ? hi.createHTML(t) : t;
}
const Qa = (e, t) => {
  const n = e.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Mt;
  for (let d = 0; d < n; d++) {
    const l = e[d];
    let u, g, h = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, g = a.exec(l), g !== null); ) f = a.lastIndex, a === Mt ? g[1] === "!--" ? a = gi : g[1] !== void 0 ? a = yi : g[2] !== void 0 ? (lo.test(g[2]) && (o = RegExp("</" + g[2], "g")), a = rt) : g[3] !== void 0 && (a = rt) : a === rt ? g[0] === ">" ? (a = o ?? Mt, h = -1) : g[1] === void 0 ? h = -2 : (h = a.lastIndex - g[2].length, u = g[1], a = g[3] === void 0 ? rt : g[3] === '"' ? Ii : bi) : a === Ii || a === bi ? a = rt : a === gi || a === yi ? a = Mt : (a = rt, o = void 0);
    const y = a === rt && e[d + 1].startsWith("/>") ? " " : "";
    s += a === Mt ? l + Xa : h >= 0 ? (i.push(u), l.slice(0, h) + so + l.slice(h) + it + y) : l + it + (h === -2 ? d : y);
  }
  return [po(e, s + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class jt {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const d = t.length - 1, l = this.parts, [u, g] = Qa(t, n);
    if (this.el = jt.createElement(u, i), mt.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = mt.nextNode()) !== null && l.length < d; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(so)) {
          const f = g[a++], y = o.getAttribute(h).split(it), w = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: s, name: w[2], strings: y, ctor: w[1] === "." ? es : w[1] === "?" ? ts : w[1] === "@" ? ns : _n }), o.removeAttribute(h);
        } else h.startsWith(it) && (l.push({ type: 6, index: s }), o.removeAttribute(h));
        if (lo.test(o.tagName)) {
          const h = o.textContent.split(it), f = h.length - 1;
          if (f > 0) {
            o.textContent = bn ? bn.emptyScript : "";
            for (let y = 0; y < f; y++) o.append(h[y], Ft()), mt.nextNode(), l.push({ type: 2, index: ++s });
            o.append(h[f], Ft());
          }
        }
      } else if (o.nodeType === 8) if (o.data === ro) l.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(it, h + 1)) !== -1; ) l.push({ type: 7, index: s }), h += it.length - 1;
      }
      s++;
    }
  }
  static createElement(t, n) {
    const i = bt.createElement("template");
    return i.innerHTML = t, i;
  }
}
function St(e, t, n = e, i) {
  var a, d;
  if (t === Ct) return t;
  let o = i !== void 0 ? (a = n._$Co) == null ? void 0 : a[i] : n._$Cl;
  const s = Bt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== s && ((d = o == null ? void 0 : o._$AO) == null || d.call(o, !1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = o : n._$Cl = o), o !== void 0 && (t = St(e, o._$AS(e, t.values), o, i)), t;
}
class Za {
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
    const { el: { content: n }, parts: i } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? bt).importNode(n, !0);
    mt.currentNode = o;
    let s = mt.nextNode(), a = 0, d = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let u;
        l.type === 2 ? u = new Yt(s, s.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (u = new is(s, this, t)), this._$AV.push(u), l = i[++d];
      }
      a !== (l == null ? void 0 : l.index) && (s = mt.nextNode(), a++);
    }
    return mt.currentNode = bt, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class Yt {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, n, i, o) {
    this.type = 2, this._$AH = de, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = i, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = St(this, t, n), Bt(t) ? t === de || t == null || t === "" ? (this._$AH !== de && this._$AR(), this._$AH = de) : t !== this._$AH && t !== Ct && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ja(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== de && Bt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(bt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = jt.createElement(po(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === o) this._$AH.p(n);
    else {
      const a = new Za(o, this), d = a.u(this.options);
      a.p(n), this.T(d), this._$AH = a;
    }
  }
  _$AC(t) {
    let n = xi.get(t.strings);
    return n === void 0 && xi.set(t.strings, n = new jt(t)), n;
  }
  k(t) {
    ei(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const s of t) o === n.length ? n.push(i = new Yt(this.O(Ft()), this.O(Ft()), this, this.options)) : i = n[o], i._$AI(s), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); t !== this._$AB; ) {
      const o = fi(t).nextSibling;
      fi(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var n;
    this._$AM === void 0 && (this._$Cv = t, (n = this._$AP) == null || n.call(this, t));
  }
}
class _n {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, n, i, o, s) {
    this.type = 1, this._$AH = de, this._$AN = void 0, this.element = t, this.name = n, this._$AM = o, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = de;
  }
  _$AI(t, n = this, i, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = St(this, t, n, 0), a = !Bt(t) || t !== this._$AH && t !== Ct, a && (this._$AH = t);
    else {
      const d = t;
      let l, u;
      for (t = s[0], l = 0; l < s.length - 1; l++) u = St(this, d[i + l], n, l), u === Ct && (u = this._$AH[l]), a || (a = !Bt(u) || u !== this._$AH[l]), u === de ? t = de : t !== de && (t += (u ?? "") + s[l + 1]), this._$AH[l] = u;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === de ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class es extends _n {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === de ? void 0 : t;
  }
}
class ts extends _n {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== de);
  }
}
class ns extends _n {
  constructor(t, n, i, o, s) {
    super(t, n, i, o, s), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = St(this, t, n, 0) ?? de) === Ct) return;
    const i = this._$AH, o = t === de && i !== de || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== de && (i === de || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class is {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    St(this, t);
  }
}
const Tn = qt.litHtmlPolyfillSupport;
Tn == null || Tn(jt, Yt), (qt.litHtmlVersions ?? (qt.litHtmlVersions = [])).push("3.3.3");
const os = (e, t, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = o = new Yt(t.insertBefore(Ft(), s), s, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = globalThis;
class Ve extends $t {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = os(n, this.renderRoot, this.renderOptions);
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
var to;
Ve._$litElement$ = !0, Ve.finalized = !0, (to = gt.litElementHydrateSupport) == null || to.call(gt, { LitElement: Ve });
const On = gt.litElementPolyfillSupport;
On == null || On({ LitElement: Ve });
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
const as = { attribute: !0, type: String, converter: yn, reflect: !1, hasChanged: Zn }, ss = (e = as, t, n) => {
  const { kind: i, metadata: o } = n;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(n.name, e), i === "accessor") {
    const { name: a } = n;
    return { set(d) {
      const l = t.get.call(this);
      t.set.call(this, d), this.requestUpdate(a, l, e, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(a, void 0, e, d), d;
    } };
  }
  if (i === "setter") {
    const { name: a } = n;
    return function(d) {
      const l = this[a];
      t.call(this, d), this.requestUpdate(a, l, e, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function le(e) {
  return (t, n) => typeof n == "object" ? ss(e, t, n) : ((i, o, s) => {
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
  return le({ ...e, state: !0, attribute: !1 });
}
var Un = "http://www.w3.org/1999/xhtml";
const vi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Un,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Cn(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), vi.hasOwnProperty(t) ? { space: vi[t], local: e } : e;
}
function rs(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Un && t.documentElement.namespaceURI === Un ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function ds(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function uo(e) {
  var t = Cn(e);
  return (t.local ? ds : rs)(t);
}
function ls() {
}
function ti(e) {
  return e == null ? ls : function() {
    return this.querySelector(e);
  };
}
function cs(e) {
  typeof e != "function" && (e = ti(e));
  for (var t = this._groups, n = t.length, i = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], a = s.length, d = i[o] = new Array(a), l, u, g = 0; g < a; ++g)
      (l = s[g]) && (u = e.call(l, l.__data__, g, s)) && ("__data__" in l && (u.__data__ = l.__data__), d[g] = u);
  return new Fe(i, this._parents);
}
function ps(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function us() {
  return [];
}
function mo(e) {
  return e == null ? us : function() {
    return this.querySelectorAll(e);
  };
}
function ms(e) {
  return function() {
    return ps(e.apply(this, arguments));
  };
}
function fs(e) {
  typeof e == "function" ? e = ms(e) : e = mo(e);
  for (var t = this._groups, n = t.length, i = [], o = [], s = 0; s < n; ++s)
    for (var a = t[s], d = a.length, l, u = 0; u < d; ++u)
      (l = a[u]) && (i.push(e.call(l, l.__data__, u, a)), o.push(l));
  return new Fe(i, o);
}
function fo(e) {
  return function() {
    return this.matches(e);
  };
}
function ho(e) {
  return function(t) {
    return t.matches(e);
  };
}
var hs = Array.prototype.find;
function gs(e) {
  return function() {
    return hs.call(this.children, e);
  };
}
function ys() {
  return this.firstElementChild;
}
function bs(e) {
  return this.select(e == null ? ys : gs(typeof e == "function" ? e : ho(e)));
}
var Is = Array.prototype.filter;
function xs() {
  return Array.from(this.children);
}
function vs(e) {
  return function() {
    return Is.call(this.children, e);
  };
}
function ws(e) {
  return this.selectAll(e == null ? xs : vs(typeof e == "function" ? e : ho(e)));
}
function ks(e) {
  typeof e != "function" && (e = fo(e));
  for (var t = this._groups, n = t.length, i = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], a = s.length, d = i[o] = [], l, u = 0; u < a; ++u)
      (l = s[u]) && e.call(l, l.__data__, u, s) && d.push(l);
  return new Fe(i, this._parents);
}
function go(e) {
  return new Array(e.length);
}
function $s() {
  return new Fe(this._enter || this._groups.map(go), this._parents);
}
function In(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
In.prototype = {
  constructor: In,
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
function _s(e) {
  return function() {
    return e;
  };
}
function Cs(e, t, n, i, o, s) {
  for (var a = 0, d, l = t.length, u = s.length; a < u; ++a)
    (d = t[a]) ? (d.__data__ = s[a], i[a] = d) : n[a] = new In(e, s[a]);
  for (; a < l; ++a)
    (d = t[a]) && (o[a] = d);
}
function Ss(e, t, n, i, o, s, a) {
  var d, l, u = /* @__PURE__ */ new Map(), g = t.length, h = s.length, f = new Array(g), y;
  for (d = 0; d < g; ++d)
    (l = t[d]) && (f[d] = y = a.call(l, l.__data__, d, t) + "", u.has(y) ? o[d] = l : u.set(y, l));
  for (d = 0; d < h; ++d)
    y = a.call(e, s[d], d, s) + "", (l = u.get(y)) ? (i[d] = l, l.__data__ = s[d], u.delete(y)) : n[d] = new In(e, s[d]);
  for (d = 0; d < g; ++d)
    (l = t[d]) && u.get(f[d]) === l && (o[d] = l);
}
function Es(e) {
  return e.__data__;
}
function As(e, t) {
  if (!arguments.length) return Array.from(this, Es);
  var n = t ? Ss : Cs, i = this._parents, o = this._groups;
  typeof e != "function" && (e = _s(e));
  for (var s = o.length, a = new Array(s), d = new Array(s), l = new Array(s), u = 0; u < s; ++u) {
    var g = i[u], h = o[u], f = h.length, y = Ms(e.call(g, g && g.__data__, u, i)), w = y.length, c = d[u] = new Array(w), r = a[u] = new Array(w), m = l[u] = new Array(f);
    n(g, h, c, r, m, y, t);
    for (var v = 0, $ = 0, S, T; v < w; ++v)
      if (S = c[v]) {
        for (v >= $ && ($ = v + 1); !(T = r[$]) && ++$ < w; ) ;
        S._next = T || null;
      }
  }
  return a = new Fe(a, i), a._enter = d, a._exit = l, a;
}
function Ms(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ps() {
  return new Fe(this._exit || this._groups.map(go), this._parents);
}
function Ts(e, t, n) {
  var i = this.enter(), o = this, s = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), n == null ? s.remove() : n(s), i && o ? i.merge(o).order() : o;
}
function Os(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, o = n.length, s = i.length, a = Math.min(o, s), d = new Array(o), l = 0; l < a; ++l)
    for (var u = n[l], g = i[l], h = u.length, f = d[l] = new Array(h), y, w = 0; w < h; ++w)
      (y = u[w] || g[w]) && (f[w] = y);
  for (; l < o; ++l)
    d[l] = n[l];
  return new Fe(d, this._parents);
}
function Rs() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], o = i.length - 1, s = i[o], a; --o >= 0; )
      (a = i[o]) && (s && a.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(a, s), s = a);
  return this;
}
function Ns(e) {
  e || (e = Ls);
  function t(h, f) {
    return h && f ? e(h.__data__, f.__data__) : !h - !f;
  }
  for (var n = this._groups, i = n.length, o = new Array(i), s = 0; s < i; ++s) {
    for (var a = n[s], d = a.length, l = o[s] = new Array(d), u, g = 0; g < d; ++g)
      (u = a[g]) && (l[g] = u);
    l.sort(t);
  }
  return new Fe(o, this._parents).order();
}
function Ls(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ds() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function zs() {
  return Array.from(this);
}
function qs() {
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
function Fs() {
  return !this.node();
}
function Bs(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var o = t[n], s = 0, a = o.length, d; s < a; ++s)
      (d = o[s]) && e.call(d, d.__data__, s, o);
  return this;
}
function js(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Ws(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Vs(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Hs(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Gs(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Ys(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Ks(e, t) {
  var n = Cn(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Ws : js : typeof t == "function" ? n.local ? Ys : Gs : n.local ? Hs : Vs)(n, t));
}
function yo(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Xs(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Js(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function Qs(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function Zs(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Xs : typeof t == "function" ? Qs : Js)(e, t, n ?? "")) : Et(this.node(), e);
}
function Et(e, t) {
  return e.style.getPropertyValue(t) || yo(e).getComputedStyle(e, null).getPropertyValue(t);
}
function er(e) {
  return function() {
    delete this[e];
  };
}
function tr(e, t) {
  return function() {
    this[e] = t;
  };
}
function nr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function ir(e, t) {
  return arguments.length > 1 ? this.each((t == null ? er : typeof t == "function" ? nr : tr)(e, t)) : this.node()[e];
}
function bo(e) {
  return e.trim().split(/^|\s+/);
}
function ni(e) {
  return e.classList || new Io(e);
}
function Io(e) {
  this._node = e, this._names = bo(e.getAttribute("class") || "");
}
Io.prototype = {
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
function xo(e, t) {
  for (var n = ni(e), i = -1, o = t.length; ++i < o; ) n.add(t[i]);
}
function vo(e, t) {
  for (var n = ni(e), i = -1, o = t.length; ++i < o; ) n.remove(t[i]);
}
function or(e) {
  return function() {
    xo(this, e);
  };
}
function ar(e) {
  return function() {
    vo(this, e);
  };
}
function sr(e, t) {
  return function() {
    (t.apply(this, arguments) ? xo : vo)(this, e);
  };
}
function rr(e, t) {
  var n = bo(e + "");
  if (arguments.length < 2) {
    for (var i = ni(this.node()), o = -1, s = n.length; ++o < s; ) if (!i.contains(n[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? sr : t ? or : ar)(n, t));
}
function dr() {
  this.textContent = "";
}
function lr(e) {
  return function() {
    this.textContent = e;
  };
}
function cr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function pr(e) {
  return arguments.length ? this.each(e == null ? dr : (typeof e == "function" ? cr : lr)(e)) : this.node().textContent;
}
function ur() {
  this.innerHTML = "";
}
function mr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function fr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function hr(e) {
  return arguments.length ? this.each(e == null ? ur : (typeof e == "function" ? fr : mr)(e)) : this.node().innerHTML;
}
function gr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function yr() {
  return this.each(gr);
}
function br() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ir() {
  return this.each(br);
}
function xr(e) {
  var t = typeof e == "function" ? e : uo(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function vr() {
  return null;
}
function wr(e, t) {
  var n = typeof e == "function" ? e : uo(e), i = t == null ? vr : typeof t == "function" ? t : ti(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function kr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function $r() {
  return this.each(kr);
}
function _r() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Cr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Sr(e) {
  return this.select(e ? Cr : _r);
}
function Er(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Ar(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Mr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function Pr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, o = t.length, s; n < o; ++n)
        s = t[n], (!e.type || s.type === e.type) && s.name === e.name ? this.removeEventListener(s.type, s.listener, s.options) : t[++i] = s;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function Tr(e, t, n) {
  return function() {
    var i = this.__on, o, s = Ar(t);
    if (i) {
      for (var a = 0, d = i.length; a < d; ++a)
        if ((o = i[a]).type === e.type && o.name === e.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = s, o.options = n), o.value = t;
          return;
        }
    }
    this.addEventListener(e.type, s, n), o = { type: e.type, name: e.name, value: t, listener: s, options: n }, i ? i.push(o) : this.__on = [o];
  };
}
function Or(e, t, n) {
  var i = Mr(e + ""), o, s = i.length, a;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var l = 0, u = d.length, g; l < u; ++l)
        for (o = 0, g = d[l]; o < s; ++o)
          if ((a = i[o]).type === g.type && a.name === g.name)
            return g.value;
    }
    return;
  }
  for (d = t ? Tr : Pr, o = 0; o < s; ++o) this.each(d(i[o], t, n));
  return this;
}
function wo(e, t, n) {
  var i = yo(e), o = i.CustomEvent;
  typeof o == "function" ? o = new o(t, n) : (o = i.document.createEvent("Event"), n ? (o.initEvent(t, n.bubbles, n.cancelable), o.detail = n.detail) : o.initEvent(t, !1, !1)), e.dispatchEvent(o);
}
function Rr(e, t) {
  return function() {
    return wo(this, e, t);
  };
}
function Nr(e, t) {
  return function() {
    return wo(this, e, t.apply(this, arguments));
  };
}
function Lr(e, t) {
  return this.each((typeof t == "function" ? Nr : Rr)(e, t));
}
function* Dr() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && (yield a);
}
var ko = [null];
function Fe(e, t) {
  this._groups = e, this._parents = t;
}
function Kt() {
  return new Fe([[document.documentElement]], ko);
}
function zr() {
  return this;
}
Fe.prototype = Kt.prototype = {
  constructor: Fe,
  select: cs,
  selectAll: fs,
  selectChild: bs,
  selectChildren: ws,
  filter: ks,
  data: As,
  enter: $s,
  exit: Ps,
  join: Ts,
  merge: Os,
  selection: zr,
  order: Rs,
  sort: Ns,
  call: Ds,
  nodes: zs,
  node: qs,
  size: Us,
  empty: Fs,
  each: Bs,
  attr: Ks,
  style: Zs,
  property: ir,
  classed: rr,
  text: pr,
  html: hr,
  raise: yr,
  lower: Ir,
  append: xr,
  insert: wr,
  remove: $r,
  clone: Sr,
  datum: Er,
  on: Or,
  dispatch: Lr,
  [Symbol.iterator]: Dr
};
function je(e) {
  return typeof e == "string" ? new Fe([[document.querySelector(e)]], [document.documentElement]) : new Fe([[e]], ko);
}
function qr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function dt(e, t) {
  if (e = qr(e), t === void 0 && (t = e.currentTarget), t) {
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
function ii() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new mn(n);
}
function mn(e) {
  this._ = e;
}
function Fr(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", o = n.indexOf(".");
    if (o >= 0 && (i = n.slice(o + 1), n = n.slice(0, o)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
mn.prototype = ii.prototype = {
  constructor: mn,
  on: function(e, t) {
    var n = this._, i = Fr(e + "", n), o, s = -1, a = i.length;
    if (arguments.length < 2) {
      for (; ++s < a; ) if ((o = (e = i[s]).type) && (o = Br(n[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++s < a; )
      if (o = (e = i[s]).type) n[o] = wi(n[o], e.name, t);
      else if (t == null) for (o in n) n[o] = wi(n[o], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new mn(e);
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
function Br(e, t) {
  for (var n = 0, i = e.length, o; n < i; ++n)
    if ((o = e[n]).name === t)
      return o.value;
}
function wi(e, t, n) {
  for (var i = 0, o = e.length; i < o; ++i)
    if (e[i].name === t) {
      e[i] = Ur, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
const Fn = { capture: !0, passive: !1 };
function Bn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function jr(e) {
  var t = e.document.documentElement, n = je(e).on("dragstart.drag", Bn, Fn);
  "onselectstart" in t ? n.on("selectstart.drag", Bn, Fn) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Wr(e, t) {
  var n = e.document.documentElement, i = je(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Bn, Fn), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function oi(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function $o(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function Xt() {
}
var Wt = 0.7, xn = 1 / Wt, _t = "\\s*([+-]?\\d+)\\s*", Vt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ge = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Vr = /^#([0-9a-f]{3,8})$/, Hr = new RegExp(`^rgb\\(${_t},${_t},${_t}\\)$`), Gr = new RegExp(`^rgb\\(${Ge},${Ge},${Ge}\\)$`), Yr = new RegExp(`^rgba\\(${_t},${_t},${_t},${Vt}\\)$`), Kr = new RegExp(`^rgba\\(${Ge},${Ge},${Ge},${Vt}\\)$`), Xr = new RegExp(`^hsl\\(${Vt},${Ge},${Ge}\\)$`), Jr = new RegExp(`^hsla\\(${Vt},${Ge},${Ge},${Vt}\\)$`), ki = {
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
oi(Xt, Ht, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: $i,
  // Deprecated! Use color.formatHex.
  formatHex: $i,
  formatHex8: Qr,
  formatHsl: Zr,
  formatRgb: _i,
  toString: _i
});
function $i() {
  return this.rgb().formatHex();
}
function Qr() {
  return this.rgb().formatHex8();
}
function Zr() {
  return _o(this).formatHsl();
}
function _i() {
  return this.rgb().formatRgb();
}
function Ht(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Vr.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Ci(t) : n === 3 ? new Le(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Qt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Qt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Hr.exec(e)) ? new Le(t[1], t[2], t[3], 1) : (t = Gr.exec(e)) ? new Le(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Yr.exec(e)) ? Qt(t[1], t[2], t[3], t[4]) : (t = Kr.exec(e)) ? Qt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Xr.exec(e)) ? Ai(t[1], t[2] / 100, t[3] / 100, 1) : (t = Jr.exec(e)) ? Ai(t[1], t[2] / 100, t[3] / 100, t[4]) : ki.hasOwnProperty(e) ? Ci(ki[e]) : e === "transparent" ? new Le(NaN, NaN, NaN, 0) : null;
}
function Ci(e) {
  return new Le(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Qt(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new Le(e, t, n, i);
}
function ed(e) {
  return e instanceof Xt || (e = Ht(e)), e ? (e = e.rgb(), new Le(e.r, e.g, e.b, e.opacity)) : new Le();
}
function jn(e, t, n, i) {
  return arguments.length === 1 ? ed(e) : new Le(e, t, n, i ?? 1);
}
function Le(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
oi(Le, jn, $o(Xt, {
  brighter(e) {
    return e = e == null ? xn : Math.pow(xn, e), new Le(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Wt : Math.pow(Wt, e), new Le(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Le(yt(this.r), yt(this.g), yt(this.b), vn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Si,
  // Deprecated! Use color.formatHex.
  formatHex: Si,
  formatHex8: td,
  formatRgb: Ei,
  toString: Ei
}));
function Si() {
  return `#${ft(this.r)}${ft(this.g)}${ft(this.b)}`;
}
function td() {
  return `#${ft(this.r)}${ft(this.g)}${ft(this.b)}${ft((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Ei() {
  const e = vn(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${yt(this.r)}, ${yt(this.g)}, ${yt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function vn(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function yt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function ft(e) {
  return e = yt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ai(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new We(e, t, n, i);
}
function _o(e) {
  if (e instanceof We) return new We(e.h, e.s, e.l, e.opacity);
  if (e instanceof Xt || (e = Ht(e)), !e) return new We();
  if (e instanceof We) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, o = Math.min(t, n, i), s = Math.max(t, n, i), a = NaN, d = s - o, l = (s + o) / 2;
  return d ? (t === s ? a = (n - i) / d + (n < i) * 6 : n === s ? a = (i - t) / d + 2 : a = (t - n) / d + 4, d /= l < 0.5 ? s + o : 2 - s - o, a *= 60) : d = l > 0 && l < 1 ? 0 : a, new We(a, d, l, e.opacity);
}
function nd(e, t, n, i) {
  return arguments.length === 1 ? _o(e) : new We(e, t, n, i ?? 1);
}
function We(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
oi(We, nd, $o(Xt, {
  brighter(e) {
    return e = e == null ? xn : Math.pow(xn, e), new We(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Wt : Math.pow(Wt, e), new We(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, o = 2 * n - i;
    return new Le(
      Rn(e >= 240 ? e - 240 : e + 120, o, i),
      Rn(e, o, i),
      Rn(e < 120 ? e + 240 : e - 120, o, i),
      this.opacity
    );
  },
  clamp() {
    return new We(Mi(this.h), Zt(this.s), Zt(this.l), vn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = vn(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Mi(this.h)}, ${Zt(this.s) * 100}%, ${Zt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Mi(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Zt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Rn(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Co = (e) => () => e;
function id(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function od(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function ad(e) {
  return (e = +e) == 1 ? So : function(t, n) {
    return n - t ? od(t, n, e) : Co(isNaN(t) ? n : t);
  };
}
function So(e, t) {
  var n = t - e;
  return n ? id(e, n) : Co(isNaN(e) ? t : e);
}
const Pi = (function e(t) {
  var n = ad(t);
  function i(o, s) {
    var a = n((o = jn(o)).r, (s = jn(s)).r), d = n(o.g, s.g), l = n(o.b, s.b), u = So(o.opacity, s.opacity);
    return function(g) {
      return o.r = a(g), o.g = d(g), o.b = l(g), o.opacity = u(g), o + "";
    };
  }
  return i.gamma = e, i;
})(1);
function nt(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Wn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Nn = new RegExp(Wn.source, "g");
function sd(e) {
  return function() {
    return e;
  };
}
function rd(e) {
  return function(t) {
    return e(t) + "";
  };
}
function dd(e, t) {
  var n = Wn.lastIndex = Nn.lastIndex = 0, i, o, s, a = -1, d = [], l = [];
  for (e = e + "", t = t + ""; (i = Wn.exec(e)) && (o = Nn.exec(t)); )
    (s = o.index) > n && (s = t.slice(n, s), d[a] ? d[a] += s : d[++a] = s), (i = i[0]) === (o = o[0]) ? d[a] ? d[a] += o : d[++a] = o : (d[++a] = null, l.push({ i: a, x: nt(i, o) })), n = Nn.lastIndex;
  return n < t.length && (s = t.slice(n), d[a] ? d[a] += s : d[++a] = s), d.length < 2 ? l[0] ? rd(l[0].x) : sd(t) : (t = l.length, function(u) {
    for (var g = 0, h; g < t; ++g) d[(h = l[g]).i] = h.x(u);
    return d.join("");
  });
}
var Ti = 180 / Math.PI, Vn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Eo(e, t, n, i, o, s) {
  var a, d, l;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (l = e * n + t * i) && (n -= e * l, i -= t * l), (d = Math.sqrt(n * n + i * i)) && (n /= d, i /= d, l /= d), e * i < t * n && (e = -e, t = -t, l = -l, a = -a), {
    translateX: o,
    translateY: s,
    rotate: Math.atan2(t, e) * Ti,
    skewX: Math.atan(l) * Ti,
    scaleX: a,
    scaleY: d
  };
}
var en;
function ld(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Vn : Eo(t.a, t.b, t.c, t.d, t.e, t.f);
}
function cd(e) {
  return e == null || (en || (en = document.createElementNS("http://www.w3.org/2000/svg", "g")), en.setAttribute("transform", e), !(e = en.transform.baseVal.consolidate())) ? Vn : (e = e.matrix, Eo(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Ao(e, t, n, i) {
  function o(u) {
    return u.length ? u.pop() + " " : "";
  }
  function s(u, g, h, f, y, w) {
    if (u !== h || g !== f) {
      var c = y.push("translate(", null, t, null, n);
      w.push({ i: c - 4, x: nt(u, h) }, { i: c - 2, x: nt(g, f) });
    } else (h || f) && y.push("translate(" + h + t + f + n);
  }
  function a(u, g, h, f) {
    u !== g ? (u - g > 180 ? g += 360 : g - u > 180 && (u += 360), f.push({ i: h.push(o(h) + "rotate(", null, i) - 2, x: nt(u, g) })) : g && h.push(o(h) + "rotate(" + g + i);
  }
  function d(u, g, h, f) {
    u !== g ? f.push({ i: h.push(o(h) + "skewX(", null, i) - 2, x: nt(u, g) }) : g && h.push(o(h) + "skewX(" + g + i);
  }
  function l(u, g, h, f, y, w) {
    if (u !== h || g !== f) {
      var c = y.push(o(y) + "scale(", null, ",", null, ")");
      w.push({ i: c - 4, x: nt(u, h) }, { i: c - 2, x: nt(g, f) });
    } else (h !== 1 || f !== 1) && y.push(o(y) + "scale(" + h + "," + f + ")");
  }
  return function(u, g) {
    var h = [], f = [];
    return u = e(u), g = e(g), s(u.translateX, u.translateY, g.translateX, g.translateY, h, f), a(u.rotate, g.rotate, h, f), d(u.skewX, g.skewX, h, f), l(u.scaleX, u.scaleY, g.scaleX, g.scaleY, h, f), u = g = null, function(y) {
      for (var w = -1, c = f.length, r; ++w < c; ) h[(r = f[w]).i] = r.x(y);
      return h.join("");
    };
  };
}
var pd = Ao(ld, "px, ", "px)", "deg)"), ud = Ao(cd, ", ", ")", ")"), md = 1e-12;
function Oi(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function fd(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function hd(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const gd = (function e(t, n, i) {
  function o(s, a) {
    var d = s[0], l = s[1], u = s[2], g = a[0], h = a[1], f = a[2], y = g - d, w = h - l, c = y * y + w * w, r, m;
    if (c < md)
      m = Math.log(f / u) / t, r = function(L) {
        return [
          d + L * y,
          l + L * w,
          u * Math.exp(t * L * m)
        ];
      };
    else {
      var v = Math.sqrt(c), $ = (f * f - u * u + i * c) / (2 * u * n * v), S = (f * f - u * u - i * c) / (2 * f * n * v), T = Math.log(Math.sqrt($ * $ + 1) - $), R = Math.log(Math.sqrt(S * S + 1) - S);
      m = (R - T) / t, r = function(L) {
        var V = L * m, H = Oi(T), ae = u / (n * v) * (H * hd(t * V + T) - fd(T));
        return [
          d + ae * y,
          l + ae * w,
          u * H / Oi(t * V + T)
        ];
      };
    }
    return r.duration = m * 1e3 * t / Math.SQRT2, r;
  }
  return o.rho = function(s) {
    var a = Math.max(1e-3, +s), d = a * a, l = d * d;
    return e(a, d, l);
  }, o;
})(Math.SQRT2, 2, 4);
var At = 0, Nt = 0, Pt = 0, Mo = 1e3, wn, Lt, kn = 0, It = 0, Sn = 0, Gt = typeof performance == "object" && performance.now ? performance : Date, Po = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function ai() {
  return It || (Po(yd), It = Gt.now() + Sn);
}
function yd() {
  It = 0;
}
function $n() {
  this._call = this._time = this._next = null;
}
$n.prototype = To.prototype = {
  constructor: $n,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? ai() : +n) + (t == null ? 0 : +t), !this._next && Lt !== this && (Lt ? Lt._next = this : wn = this, Lt = this), this._call = e, this._time = n, Hn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Hn());
  }
};
function To(e, t, n) {
  var i = new $n();
  return i.restart(e, t, n), i;
}
function bd() {
  ai(), ++At;
  for (var e = wn, t; e; )
    (t = It - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --At;
}
function Ri() {
  It = (kn = Gt.now()) + Sn, At = Nt = 0;
  try {
    bd();
  } finally {
    At = 0, xd(), It = 0;
  }
}
function Id() {
  var e = Gt.now(), t = e - kn;
  t > Mo && (Sn -= t, kn = e);
}
function xd() {
  for (var e, t = wn, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : wn = n);
  Lt = e, Hn(i);
}
function Hn(e) {
  if (!At) {
    Nt && (Nt = clearTimeout(Nt));
    var t = e - It;
    t > 24 ? (e < 1 / 0 && (Nt = setTimeout(Ri, e - Gt.now() - Sn)), Pt && (Pt = clearInterval(Pt))) : (Pt || (kn = Gt.now(), Pt = setInterval(Id, Mo)), At = 1, Po(Ri));
  }
}
function Ni(e, t, n) {
  var i = new $n();
  return t = t == null ? 0 : +t, i.restart((o) => {
    i.stop(), e(o + t);
  }, t, n), i;
}
var vd = ii("start", "end", "cancel", "interrupt"), wd = [], Oo = 0, Li = 1, Gn = 2, fn = 3, Di = 4, Yn = 5, hn = 6;
function En(e, t, n, i, o, s) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (n in a) return;
  kd(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: o,
    // For context during callback.
    on: vd,
    tween: wd,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: Oo
  });
}
function si(e, t) {
  var n = He(e, t);
  if (n.state > Oo) throw new Error("too late; already scheduled");
  return n;
}
function Ye(e, t) {
  var n = He(e, t);
  if (n.state > fn) throw new Error("too late; already running");
  return n;
}
function He(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function kd(e, t, n) {
  var i = e.__transition, o;
  i[t] = n, n.timer = To(s, 0, n.time);
  function s(u) {
    n.state = Li, n.timer.restart(a, n.delay, n.time), n.delay <= u && a(u - n.delay);
  }
  function a(u) {
    var g, h, f, y;
    if (n.state !== Li) return l();
    for (g in i)
      if (y = i[g], y.name === n.name) {
        if (y.state === fn) return Ni(a);
        y.state === Di ? (y.state = hn, y.timer.stop(), y.on.call("interrupt", e, e.__data__, y.index, y.group), delete i[g]) : +g < t && (y.state = hn, y.timer.stop(), y.on.call("cancel", e, e.__data__, y.index, y.group), delete i[g]);
      }
    if (Ni(function() {
      n.state === fn && (n.state = Di, n.timer.restart(d, n.delay, n.time), d(u));
    }), n.state = Gn, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Gn) {
      for (n.state = fn, o = new Array(f = n.tween.length), g = 0, h = -1; g < f; ++g)
        (y = n.tween[g].value.call(e, e.__data__, n.index, n.group)) && (o[++h] = y);
      o.length = h + 1;
    }
  }
  function d(u) {
    for (var g = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(l), n.state = Yn, 1), h = -1, f = o.length; ++h < f; )
      o[h].call(e, g);
    n.state === Yn && (n.on.call("end", e, e.__data__, n.index, n.group), l());
  }
  function l() {
    n.state = hn, n.timer.stop(), delete i[t];
    for (var u in i) return;
    delete e.__transition;
  }
}
function gn(e, t) {
  var n = e.__transition, i, o, s = !0, a;
  if (n) {
    t = t == null ? null : t + "";
    for (a in n) {
      if ((i = n[a]).name !== t) {
        s = !1;
        continue;
      }
      o = i.state > Gn && i.state < Yn, i.state = hn, i.timer.stop(), i.on.call(o ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[a];
    }
    s && delete e.__transition;
  }
}
function $d(e) {
  return this.each(function() {
    gn(this, e);
  });
}
function _d(e, t) {
  var n, i;
  return function() {
    var o = Ye(this, e), s = o.tween;
    if (s !== n) {
      i = n = s;
      for (var a = 0, d = i.length; a < d; ++a)
        if (i[a].name === t) {
          i = i.slice(), i.splice(a, 1);
          break;
        }
    }
    o.tween = i;
  };
}
function Cd(e, t, n) {
  var i, o;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = Ye(this, e), a = s.tween;
    if (a !== i) {
      o = (i = a).slice();
      for (var d = { name: t, value: n }, l = 0, u = o.length; l < u; ++l)
        if (o[l].name === t) {
          o[l] = d;
          break;
        }
      l === u && o.push(d);
    }
    s.tween = o;
  };
}
function Sd(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = He(this.node(), n).tween, o = 0, s = i.length, a; o < s; ++o)
      if ((a = i[o]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? _d : Cd)(n, e, t));
}
function ri(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var o = Ye(this, i);
    (o.value || (o.value = {}))[t] = n.apply(this, arguments);
  }), function(o) {
    return He(o, i).value[t];
  };
}
function Ro(e, t) {
  var n;
  return (typeof t == "number" ? nt : t instanceof Ht ? Pi : (n = Ht(t)) ? (t = n, Pi) : dd)(e, t);
}
function Ed(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Ad(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Md(e, t, n) {
  var i, o = n + "", s;
  return function() {
    var a = this.getAttribute(e);
    return a === o ? null : a === i ? s : s = t(i = a, n);
  };
}
function Pd(e, t, n) {
  var i, o = n + "", s;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === o ? null : a === i ? s : s = t(i = a, n);
  };
}
function Td(e, t, n) {
  var i, o, s;
  return function() {
    var a, d = n(this), l;
    return d == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), l = d + "", a === l ? null : a === i && l === o ? s : (o = l, s = t(i = a, d)));
  };
}
function Od(e, t, n) {
  var i, o, s;
  return function() {
    var a, d = n(this), l;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), l = d + "", a === l ? null : a === i && l === o ? s : (o = l, s = t(i = a, d)));
  };
}
function Rd(e, t) {
  var n = Cn(e), i = n === "transform" ? ud : Ro;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Od : Td)(n, i, ri(this, "attr." + e, t)) : t == null ? (n.local ? Ad : Ed)(n) : (n.local ? Pd : Md)(n, i, t));
}
function Nd(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Ld(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Dd(e, t) {
  var n, i;
  function o() {
    var s = t.apply(this, arguments);
    return s !== i && (n = (i = s) && Ld(e, s)), n;
  }
  return o._value = t, o;
}
function zd(e, t) {
  var n, i;
  function o() {
    var s = t.apply(this, arguments);
    return s !== i && (n = (i = s) && Nd(e, s)), n;
  }
  return o._value = t, o;
}
function qd(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = Cn(e);
  return this.tween(n, (i.local ? Dd : zd)(i, t));
}
function Ud(e, t) {
  return function() {
    si(this, e).delay = +t.apply(this, arguments);
  };
}
function Fd(e, t) {
  return t = +t, function() {
    si(this, e).delay = t;
  };
}
function Bd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Ud : Fd)(t, e)) : He(this.node(), t).delay;
}
function jd(e, t) {
  return function() {
    Ye(this, e).duration = +t.apply(this, arguments);
  };
}
function Wd(e, t) {
  return t = +t, function() {
    Ye(this, e).duration = t;
  };
}
function Vd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? jd : Wd)(t, e)) : He(this.node(), t).duration;
}
function Hd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ye(this, e).ease = t;
  };
}
function Gd(e) {
  var t = this._id;
  return arguments.length ? this.each(Hd(t, e)) : He(this.node(), t).ease;
}
function Yd(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Ye(this, e).ease = n;
  };
}
function Kd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Yd(this._id, e));
}
function Xd(e) {
  typeof e != "function" && (e = fo(e));
  for (var t = this._groups, n = t.length, i = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], a = s.length, d = i[o] = [], l, u = 0; u < a; ++u)
      (l = s[u]) && e.call(l, l.__data__, u, s) && d.push(l);
  return new Ze(i, this._parents, this._name, this._id);
}
function Jd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, o = n.length, s = Math.min(i, o), a = new Array(i), d = 0; d < s; ++d)
    for (var l = t[d], u = n[d], g = l.length, h = a[d] = new Array(g), f, y = 0; y < g; ++y)
      (f = l[y] || u[y]) && (h[y] = f);
  for (; d < i; ++d)
    a[d] = t[d];
  return new Ze(a, this._parents, this._name, this._id);
}
function Qd(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function Zd(e, t, n) {
  var i, o, s = Qd(t) ? si : Ye;
  return function() {
    var a = s(this, e), d = a.on;
    d !== i && (o = (i = d).copy()).on(t, n), a.on = o;
  };
}
function el(e, t) {
  var n = this._id;
  return arguments.length < 2 ? He(this.node(), n).on.on(e) : this.each(Zd(n, e, t));
}
function tl(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function nl() {
  return this.on("end.remove", tl(this._id));
}
function il(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = ti(e));
  for (var i = this._groups, o = i.length, s = new Array(o), a = 0; a < o; ++a)
    for (var d = i[a], l = d.length, u = s[a] = new Array(l), g, h, f = 0; f < l; ++f)
      (g = d[f]) && (h = e.call(g, g.__data__, f, d)) && ("__data__" in g && (h.__data__ = g.__data__), u[f] = h, En(u[f], t, n, f, u, He(g, n)));
  return new Ze(s, this._parents, t, n);
}
function ol(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = mo(e));
  for (var i = this._groups, o = i.length, s = [], a = [], d = 0; d < o; ++d)
    for (var l = i[d], u = l.length, g, h = 0; h < u; ++h)
      if (g = l[h]) {
        for (var f = e.call(g, g.__data__, h, l), y, w = He(g, n), c = 0, r = f.length; c < r; ++c)
          (y = f[c]) && En(y, t, n, c, f, w);
        s.push(f), a.push(g);
      }
  return new Ze(s, a, t, n);
}
var al = Kt.prototype.constructor;
function sl() {
  return new al(this._groups, this._parents);
}
function rl(e, t) {
  var n, i, o;
  return function() {
    var s = Et(this, e), a = (this.style.removeProperty(e), Et(this, e));
    return s === a ? null : s === n && a === i ? o : o = t(n = s, i = a);
  };
}
function No(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function dl(e, t, n) {
  var i, o = n + "", s;
  return function() {
    var a = Et(this, e);
    return a === o ? null : a === i ? s : s = t(i = a, n);
  };
}
function ll(e, t, n) {
  var i, o, s;
  return function() {
    var a = Et(this, e), d = n(this), l = d + "";
    return d == null && (l = d = (this.style.removeProperty(e), Et(this, e))), a === l ? null : a === i && l === o ? s : (o = l, s = t(i = a, d));
  };
}
function cl(e, t) {
  var n, i, o, s = "style." + t, a = "end." + s, d;
  return function() {
    var l = Ye(this, e), u = l.on, g = l.value[s] == null ? d || (d = No(t)) : void 0;
    (u !== n || o !== g) && (i = (n = u).copy()).on(a, o = g), l.on = i;
  };
}
function pl(e, t, n) {
  var i = (e += "") == "transform" ? pd : Ro;
  return t == null ? this.styleTween(e, rl(e, i)).on("end.style." + e, No(e)) : typeof t == "function" ? this.styleTween(e, ll(e, i, ri(this, "style." + e, t))).each(cl(this._id, e)) : this.styleTween(e, dl(e, i, t), n).on("end.style." + e, null);
}
function ul(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function ml(e, t, n) {
  var i, o;
  function s() {
    var a = t.apply(this, arguments);
    return a !== o && (i = (o = a) && ul(e, a, n)), i;
  }
  return s._value = t, s;
}
function fl(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, ml(e, t, n ?? ""));
}
function hl(e) {
  return function() {
    this.textContent = e;
  };
}
function gl(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function yl(e) {
  return this.tween("text", typeof e == "function" ? gl(ri(this, "text", e)) : hl(e == null ? "" : e + ""));
}
function bl(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Il(e) {
  var t, n;
  function i() {
    var o = e.apply(this, arguments);
    return o !== n && (t = (n = o) && bl(o)), t;
  }
  return i._value = e, i;
}
function xl(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Il(e));
}
function vl() {
  for (var e = this._name, t = this._id, n = Lo(), i = this._groups, o = i.length, s = 0; s < o; ++s)
    for (var a = i[s], d = a.length, l, u = 0; u < d; ++u)
      if (l = a[u]) {
        var g = He(l, t);
        En(l, e, n, u, a, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new Ze(i, this._parents, e, n);
}
function wl() {
  var e, t, n = this, i = n._id, o = n.size();
  return new Promise(function(s, a) {
    var d = { value: a }, l = { value: function() {
      --o === 0 && s();
    } };
    n.each(function() {
      var u = Ye(this, i), g = u.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(d), t._.interrupt.push(d), t._.end.push(l)), u.on = t;
    }), o === 0 && s();
  });
}
var kl = 0;
function Ze(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function Lo() {
  return ++kl;
}
var Je = Kt.prototype;
Ze.prototype = {
  constructor: Ze,
  select: il,
  selectAll: ol,
  selectChild: Je.selectChild,
  selectChildren: Je.selectChildren,
  filter: Xd,
  merge: Jd,
  selection: sl,
  transition: vl,
  call: Je.call,
  nodes: Je.nodes,
  node: Je.node,
  size: Je.size,
  empty: Je.empty,
  each: Je.each,
  on: el,
  attr: Rd,
  attrTween: qd,
  style: pl,
  styleTween: fl,
  text: yl,
  textTween: xl,
  remove: nl,
  tween: Sd,
  delay: Bd,
  duration: Vd,
  ease: Gd,
  easeVarying: Kd,
  end: wl,
  [Symbol.iterator]: Je[Symbol.iterator]
};
function $l(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var _l = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: $l
};
function Cl(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Sl(e) {
  var t, n;
  e instanceof Ze ? (t = e._id, e = e._name) : (t = Lo(), (n = _l).time = ai(), e = e == null ? null : e + "");
  for (var i = this._groups, o = i.length, s = 0; s < o; ++s)
    for (var a = i[s], d = a.length, l, u = 0; u < d; ++u)
      (l = a[u]) && En(l, e, t, u, a, n || Cl(l, t));
  return new Ze(i, this._parents, e, t);
}
Kt.prototype.interrupt = $d;
Kt.prototype.transition = Sl;
const tn = (e) => () => e;
function El(e, {
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
var Ut = new Qe(1, 0, 0);
Qe.prototype;
function Ln(e) {
  e.stopImmediatePropagation();
}
function Tt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Al(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ml() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function zi() {
  return this.__zoom || Ut;
}
function Pl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Tl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Ol(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], o = e.invertX(t[1][0]) - n[1][0], s = e.invertY(t[0][1]) - n[0][1], a = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    o > i ? (i + o) / 2 : Math.min(0, i) || Math.max(0, o),
    a > s ? (s + a) / 2 : Math.min(0, s) || Math.max(0, a)
  );
}
function Rl() {
  var e = Al, t = Ml, n = Ol, i = Pl, o = Tl, s = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, l = gd, u = ii("start", "zoom", "end"), g, h, f, y = 500, w = 150, c = 0, r = 10;
  function m(M) {
    M.property("__zoom", zi).on("wheel.zoom", V, { passive: !1 }).on("mousedown.zoom", H).on("dblclick.zoom", ae).filter(o).on("touchstart.zoom", C).on("touchmove.zoom", W).on("touchend.zoom touchcancel.zoom", G).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(M, j, b, x) {
    var I = M.selection ? M.selection() : M;
    I.property("__zoom", zi), M !== I ? T(M, j, b, x) : I.interrupt().each(function() {
      R(this, arguments).event(x).start().zoom(null, typeof j == "function" ? j.apply(this, arguments) : j).end();
    });
  }, m.scaleBy = function(M, j, b, x) {
    m.scaleTo(M, function() {
      var I = this.__zoom.k, k = typeof j == "function" ? j.apply(this, arguments) : j;
      return I * k;
    }, b, x);
  }, m.scaleTo = function(M, j, b, x) {
    m.transform(M, function() {
      var I = t.apply(this, arguments), k = this.__zoom, _ = b == null ? S(I) : typeof b == "function" ? b.apply(this, arguments) : b, A = k.invert(_), N = typeof j == "function" ? j.apply(this, arguments) : j;
      return n($(v(k, N), _, A), I, a);
    }, b, x);
  }, m.translateBy = function(M, j, b, x) {
    m.transform(M, function() {
      return n(this.__zoom.translate(
        typeof j == "function" ? j.apply(this, arguments) : j,
        typeof b == "function" ? b.apply(this, arguments) : b
      ), t.apply(this, arguments), a);
    }, null, x);
  }, m.translateTo = function(M, j, b, x, I) {
    m.transform(M, function() {
      var k = t.apply(this, arguments), _ = this.__zoom, A = x == null ? S(k) : typeof x == "function" ? x.apply(this, arguments) : x;
      return n(Ut.translate(A[0], A[1]).scale(_.k).translate(
        typeof j == "function" ? -j.apply(this, arguments) : -j,
        typeof b == "function" ? -b.apply(this, arguments) : -b
      ), k, a);
    }, x, I);
  };
  function v(M, j) {
    return j = Math.max(s[0], Math.min(s[1], j)), j === M.k ? M : new Qe(j, M.x, M.y);
  }
  function $(M, j, b) {
    var x = j[0] - b[0] * M.k, I = j[1] - b[1] * M.k;
    return x === M.x && I === M.y ? M : new Qe(M.k, x, I);
  }
  function S(M) {
    return [(+M[0][0] + +M[1][0]) / 2, (+M[0][1] + +M[1][1]) / 2];
  }
  function T(M, j, b, x) {
    M.on("start.zoom", function() {
      R(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      R(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var I = this, k = arguments, _ = R(I, k).event(x), A = t.apply(I, k), N = b == null ? S(A) : typeof b == "function" ? b.apply(I, k) : b, O = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), U = I.__zoom, D = typeof j == "function" ? j.apply(I, k) : j, X = l(U.invert(N).concat(O / U.k), D.invert(N).concat(O / D.k));
      return function(se) {
        if (se === 1) se = D;
        else {
          var he = X(se), Y = O / he[2];
          se = new Qe(Y, N[0] - he[0] * Y, N[1] - he[1] * Y);
        }
        _.zoom(null, se);
      };
    });
  }
  function R(M, j, b) {
    return !b && M.__zooming || new L(M, j);
  }
  function L(M, j) {
    this.that = M, this.args = j, this.active = 0, this.sourceEvent = null, this.extent = t.apply(M, j), this.taps = 0;
  }
  L.prototype = {
    event: function(M) {
      return M && (this.sourceEvent = M), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(M, j) {
      return this.mouse && M !== "mouse" && (this.mouse[1] = j.invert(this.mouse[0])), this.touch0 && M !== "touch" && (this.touch0[1] = j.invert(this.touch0[0])), this.touch1 && M !== "touch" && (this.touch1[1] = j.invert(this.touch1[0])), this.that.__zoom = j, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(M) {
      var j = je(this.that).datum();
      u.call(
        M,
        this.that,
        new El(M, {
          sourceEvent: this.sourceEvent,
          target: m,
          transform: this.that.__zoom,
          dispatch: u
        }),
        j
      );
    }
  };
  function V(M, ...j) {
    if (!e.apply(this, arguments)) return;
    var b = R(this, j).event(M), x = this.__zoom, I = Math.max(s[0], Math.min(s[1], x.k * Math.pow(2, i.apply(this, arguments)))), k = dt(M);
    if (b.wheel)
      (b.mouse[0][0] !== k[0] || b.mouse[0][1] !== k[1]) && (b.mouse[1] = x.invert(b.mouse[0] = k)), clearTimeout(b.wheel);
    else {
      if (x.k === I) return;
      b.mouse = [k, x.invert(k)], gn(this), b.start();
    }
    Tt(M), b.wheel = setTimeout(_, w), b.zoom("mouse", n($(v(x, I), b.mouse[0], b.mouse[1]), b.extent, a));
    function _() {
      b.wheel = null, b.end();
    }
  }
  function H(M, ...j) {
    if (f || !e.apply(this, arguments)) return;
    var b = M.currentTarget, x = R(this, j, !0).event(M), I = je(M.view).on("mousemove.zoom", N, !0).on("mouseup.zoom", O, !0), k = dt(M, b), _ = M.clientX, A = M.clientY;
    jr(M.view), Ln(M), x.mouse = [k, this.__zoom.invert(k)], gn(this), x.start();
    function N(U) {
      if (Tt(U), !x.moved) {
        var D = U.clientX - _, X = U.clientY - A;
        x.moved = D * D + X * X > c;
      }
      x.event(U).zoom("mouse", n($(x.that.__zoom, x.mouse[0] = dt(U, b), x.mouse[1]), x.extent, a));
    }
    function O(U) {
      I.on("mousemove.zoom mouseup.zoom", null), Wr(U.view, x.moved), Tt(U), x.event(U).end();
    }
  }
  function ae(M, ...j) {
    if (e.apply(this, arguments)) {
      var b = this.__zoom, x = dt(M.changedTouches ? M.changedTouches[0] : M, this), I = b.invert(x), k = b.k * (M.shiftKey ? 0.5 : 2), _ = n($(v(b, k), x, I), t.apply(this, j), a);
      Tt(M), d > 0 ? je(this).transition().duration(d).call(T, _, x, M) : je(this).call(m.transform, _, x, M);
    }
  }
  function C(M, ...j) {
    if (e.apply(this, arguments)) {
      var b = M.touches, x = b.length, I = R(this, j, M.changedTouches.length === x).event(M), k, _, A, N;
      for (Ln(M), _ = 0; _ < x; ++_)
        A = b[_], N = dt(A, this), N = [N, this.__zoom.invert(N), A.identifier], I.touch0 ? !I.touch1 && I.touch0[2] !== N[2] && (I.touch1 = N, I.taps = 0) : (I.touch0 = N, k = !0, I.taps = 1 + !!g);
      g && (g = clearTimeout(g)), k && (I.taps < 2 && (h = N[0], g = setTimeout(function() {
        g = null;
      }, y)), gn(this), I.start());
    }
  }
  function W(M, ...j) {
    if (this.__zooming) {
      var b = R(this, j).event(M), x = M.changedTouches, I = x.length, k, _, A, N;
      for (Tt(M), k = 0; k < I; ++k)
        _ = x[k], A = dt(_, this), b.touch0 && b.touch0[2] === _.identifier ? b.touch0[0] = A : b.touch1 && b.touch1[2] === _.identifier && (b.touch1[0] = A);
      if (_ = b.that.__zoom, b.touch1) {
        var O = b.touch0[0], U = b.touch0[1], D = b.touch1[0], X = b.touch1[1], se = (se = D[0] - O[0]) * se + (se = D[1] - O[1]) * se, he = (he = X[0] - U[0]) * he + (he = X[1] - U[1]) * he;
        _ = v(_, Math.sqrt(se / he)), A = [(O[0] + D[0]) / 2, (O[1] + D[1]) / 2], N = [(U[0] + X[0]) / 2, (U[1] + X[1]) / 2];
      } else if (b.touch0) A = b.touch0[0], N = b.touch0[1];
      else return;
      b.zoom("touch", n($(_, A, N), b.extent, a));
    }
  }
  function G(M, ...j) {
    if (this.__zooming) {
      var b = R(this, j).event(M), x = M.changedTouches, I = x.length, k, _;
      for (Ln(M), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, y), k = 0; k < I; ++k)
        _ = x[k], b.touch0 && b.touch0[2] === _.identifier ? delete b.touch0 : b.touch1 && b.touch1[2] === _.identifier && delete b.touch1;
      if (b.touch1 && !b.touch0 && (b.touch0 = b.touch1, delete b.touch1), b.touch0) b.touch0[1] = this.__zoom.invert(b.touch0[0]);
      else if (b.end(), b.taps === 2 && (_ = dt(_, this), Math.hypot(h[0] - _[0], h[1] - _[1]) < r)) {
        var A = je(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(M) {
    return arguments.length ? (i = typeof M == "function" ? M : tn(+M), m) : i;
  }, m.filter = function(M) {
    return arguments.length ? (e = typeof M == "function" ? M : tn(!!M), m) : e;
  }, m.touchable = function(M) {
    return arguments.length ? (o = typeof M == "function" ? M : tn(!!M), m) : o;
  }, m.extent = function(M) {
    return arguments.length ? (t = typeof M == "function" ? M : tn([[+M[0][0], +M[0][1]], [+M[1][0], +M[1][1]]]), m) : t;
  }, m.scaleExtent = function(M) {
    return arguments.length ? (s[0] = +M[0], s[1] = +M[1], m) : [s[0], s[1]];
  }, m.translateExtent = function(M) {
    return arguments.length ? (a[0][0] = +M[0][0], a[1][0] = +M[1][0], a[0][1] = +M[0][1], a[1][1] = +M[1][1], m) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, m.constrain = function(M) {
    return arguments.length ? (n = M, m) : n;
  }, m.duration = function(M) {
    return arguments.length ? (d = +M, m) : d;
  }, m.interpolate = function(M) {
    return arguments.length ? (l = M, m) : l;
  }, m.on = function() {
    var M = u.on.apply(u, arguments);
    return M === u ? m : M;
  }, m.clickDistance = function(M) {
    return arguments.length ? (c = (M = +M) * M, m) : Math.sqrt(c);
  }, m.tapDistance = function(M) {
    return arguments.length ? (r = +M, m) : r;
  }, m;
}
var Nl = Object.defineProperty, Ll = Object.getOwnPropertyDescriptor, we = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Ll(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Nl(t, n, o), o;
};
function Dl(e, t, n, i) {
  const o = t.x - e.x, s = t.y - e.y, a = i.x - n.x, d = i.y - n.y, l = o * d - s * a;
  if (Math.abs(l) < 1e-9) return null;
  const u = ((n.x - e.x) * d - (n.y - e.y) * a) / l, g = ((n.x - e.x) * s - (n.y - e.y) * o) / l;
  return u <= 0.02 || u >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + u * o, y: e.y + u * s, t: u };
}
function zl(e, t, n) {
  const i = n.x - t.x, o = n.y - t.y, s = i * i + o * o || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * i + (e.y - t.y) * o) / s)), d = t.x + a * i, l = t.y + a * o;
  return { dist: Math.hypot(e.x - d, e.y - l), t: a };
}
function ql(e) {
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
    const s = e[o], a = e[o + 1], d = Math.hypot(a.x - s.x, a.y - s.y) || 1, l = (a.x - s.x) / d, u = (a.y - s.y) / d, g = t.map(([f, y]) => Dl(s, a, f, y)).filter((f) => f !== null).filter((f) => f.t * d > n + 2 && (1 - f.t) * d > n + 2).sort((f, y) => f.t - y.t);
    let h = -1 / 0;
    for (const f of g)
      f.t * d - n <= h + 2 || (i += ` L ${f.x - l * n} ${f.y - u * n}`, i += ` A ${n} ${n} 0 0 1 ${f.x + l * n} ${f.y + u * n}`, h = f.t * d + n);
    i += ` L ${a.x} ${a.y}`;
  }
  return i;
}
const ht = {
  component: te`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: te`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  shield: te`<path d="M6 0.5 L11 2.5 V6 C11 9 8.8 11 6 11.8 C3.2 11 1 9 1 6 V2.5 Z"></path>`,
  note: te`<path d="M1.5 0.5 H10.5 V7.5 L7 11.5 H1.5 Z"></path><path d="M10.5 7.5 H7 V11.5"></path>`,
  area: te`<rect x="0.5" y="1.5" width="11" height="9" rx="1" stroke-dasharray="2.4 1.8"></rect>`,
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
let xe = class extends Ve {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Ut, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    this._zoomBehavior = Rl().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
    const o = this.fitInsets.left ?? 0, s = this.fitInsets.right ?? 0, a = this.fitInsets.top ?? 0, d = this.fitInsets.bottom ?? 0, l = Math.max(80, i.width - o - s), u = Math.max(80, i.height - a - d), g = Math.min(...t.map((r) => r.x - r.w / 2)) - e, h = Math.max(...t.map((r) => r.x + r.w / 2)) + e, f = Math.min(...t.map((r) => r.y - r.h / 2)) - e, y = Math.max(...t.map((r) => r.y + r.h / 2)) + e, w = Math.max(0.15, Math.min(l / (h - g), u / (y - f), 1.25)), c = Ut.translate(
      o + l / 2 - w * (g + h) / 2,
      a + u / 2 - w * (f + y) / 2
    ).scale(w);
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
      const d = (o = this._dragGroup) == null ? void 0 : o.get(s);
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
  clampToParent(e, t, n) {
    if (e.parentId) {
      const i = this.scene.nodes.find((o) => o.id === e.parentId);
      if (i) {
        const o = this.nodePos(i), s = o.x - i.w / 2 + 10 + e.w / 2, a = o.x + i.w / 2 - 10 - e.w / 2, d = o.y - i.h / 2 + 34 + e.h / 2, l = o.y + i.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, s), a), n = Math.min(Math.max(n, d), l);
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
      (r) => s.has(r.id) && !(r.parentId && s.has(r.parentId))
    ) : t.kind === "area" ? this.areaCargo(t) : null, d = a ? new Map(a.map((r) => [r.id, this.nodePos(r)])) : null, l = (r) => (r.shiftKey || r.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a || r.shiftKey && t.kind === "external-system" && !a, u = a ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = u !== null, h = u === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], f = () => {
      const r = [], m = u === "menu" ? this.scene.nodes.filter((v) => v.kind === "ui-app") : this.scene.nodes.filter((v) => v.id === (t.ownerId ?? t.parentId));
      for (const v of m) {
        const $ = this.scene.nodes.filter((L) => (L.ownerId ?? L.parentId) === v.id && h.includes(L.kind ?? "") && L.id !== t.id).sort((L, V) => L.y - V.y), S = v.x - v.w / 2 + 10, T = v.x + v.w / 2 - 10;
        for (const L of $) r.push({ x1: S, x2: T, y: L.y - L.h / 2 - 3, appId: v.id, beforeId: L.id });
        const R = $[$.length - 1];
        r.push({
          x1: S,
          x2: T,
          y: R ? R.y + R.h / 2 + 3 : v.y - v.h / 2 + 34 + 8,
          appId: v.id,
          beforeId: null
        });
      }
      return r;
    }, y = (r) => {
      const m = this.nodeIdAt(r), v = m && m !== t.id ? this.scene.nodes.find(($) => $.id === m) : void 0;
      return v ? v.kind === "external-system" ? v.id : v.parentId ?? null : null;
    }, w = (r) => {
      if ((r.buttons & 1) === 0) {
        c(r);
        return;
      }
      const m = this.toScene(r), v = m.x - n.x, $ = m.y - n.y;
      if (!(!o && Math.hypot(v, $) < 3 / this._t.k))
        if (o = !0, a && d) {
          const S = /* @__PURE__ */ new Map();
          for (const T of a) {
            const R = d.get(T.id), L = this.clampToParent(T, R.x + v, R.y + $);
            S.set(T.id, { x: L.x, y: L.y });
          }
          this._dragGroup = S;
        } else if (g) {
          this._dragPos = { id: t.id, x: i.x + v, y: i.y + $ }, this._menuSlots || (this._menuSlots = { slots: f(), active: null, nestRowId: null });
          const S = this.scene.nodes.filter(
            (R) => h.includes(R.kind ?? "") && R.id !== t.id && Math.abs(m.x - R.x) <= R.w / 2 + 8
          ), T = u === "menu" ? S.find((R) => Math.abs(m.y - R.y) < R.h * 0.28) : void 0;
          if (T)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: T.id }, this._hoverNodeId = T.id;
          else {
            let R = -1, L = 14;
            this._menuSlots.slots.forEach((V, H) => {
              if (m.x < V.x1 - 24 || m.x > V.x2 + 24) return;
              const ae = Math.abs(m.y - V.y);
              ae < L && (L = ae, R = H);
            }), this._menuSlots = { ...this._menuSlots, active: R >= 0 ? R : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else l(r) ? (this._dragPos = { id: t.id, x: i.x + v, y: i.y + $ }, this._hoverNodeId = y(r)) : (this._dragPos = this.clampToParent(t, i.x + v, i.y + $), this._hoverNodeId = null);
    }, c = (r) => {
      if (window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", c), o && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([m, v]) => ({ id: m, x: v.x, y: v.y }))
        });
      else if (o && this._dragPos && g) {
        const m = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const v = u === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (m != null && m.nestRowId)
          this.emit(v, { id: t.id, nestRowId: m.nestRowId });
        else if (m && m.active !== null) {
          const $ = m.slots[m.active];
          this.emit(v, { id: t.id, appId: $.appId, beforeId: $.beforeId });
        }
        return;
      } else if (o && this._dragPos) {
        if (l(r)) {
          const m = y(r);
          if (r.ctrlKey && t.kind === "api") {
            m && m !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: m,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (m !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: m,
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
    window.addEventListener("pointermove", w), window.addEventListener("pointerup", c);
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
    const o = t.kind === "area", s = t.container && !t.parentId, a = o ? 30 : s ? 160 : 90, d = o ? 20 : s ? 90 : 30, l = { x: t.x, y: t.y, w: t.w, h: t.h }, u = s ? this.scene.nodes.filter((m) => m.parentId === t.id) : [], g = Math.min(...u.map((m) => m.x - m.w / 2)), h = Math.max(...u.map((m) => m.x + m.w / 2)), f = Math.min(...u.map((m) => m.y - m.h / 2)), y = Math.max(...u.map((m) => m.y + m.h / 2)), w = la(
      u.map((m) => ({ dx: m.x - l.x, dy: m.y - l.y, w: m.w, h: m.h })),
      { w: a, h: d }
    ), c = (m) => {
      if ((m.buttons & 1) === 0) {
        r();
        return;
      }
      const v = this.toScene(m);
      if (m.shiftKey) {
        this._resize = {
          id: t.id,
          x: l.x,
          y: l.y,
          w: Math.max(w.w, 2 * Math.abs(v.x - l.x)),
          h: Math.max(w.h, 2 * Math.abs(v.y - l.y))
        };
        return;
      }
      const $ = l.x - n * l.w / 2, S = l.y - i * l.h / 2, T = n > 0 ? Math.max(v.x, $ + a, u.length ? h + 10 : -1 / 0) : Math.min(v.x, $ - a, u.length ? g - 10 : 1 / 0), R = i > 0 ? Math.max(v.y, S + d, u.length ? y + 10 : -1 / 0) : Math.min(v.y, S - d, u.length ? f - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: ($ + T) / 2,
        y: (S + R) / 2,
        w: Math.abs(T - $),
        h: Math.abs(R - S)
      };
    }, r = () => {
      window.removeEventListener("pointermove", c), window.removeEventListener("pointerup", r), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", c), window.addEventListener("pointerup", r);
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
      const d = this.toScene(a);
      this._pendingLink = { sourceId: t.id, x: d.x, y: d.y }, this._hoverNodeId = this.nodeIdAt(a);
    }, s = (a) => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s);
      const d = this.nodeIdAt(a);
      if (d && d !== t.id)
        this.emit("connect-requested", {
          sourceId: t.id,
          targetId: d,
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
    const { x: i, y: o } = this.nodePos(e), s = t - i, a = n - o, d = e.w / 2, l = e.h / 2;
    if (s === 0 && a === 0) return { x: i, y: o };
    const u = 1 / Math.max(Math.abs(s) / d, Math.abs(a) / l);
    return { x: i + s * u, y: o + a * u };
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
      const g = e.targetId.slice(11), h = this.scene.edges.find((w) => w.id === g), f = h && h.id !== e.id ? this.edgePolyline(h) : null;
      if (!f || f.length < 2) return null;
      const y = ql(f);
      return [this.borderPoint(t, y.x, y.y), y];
    }
    const n = this.scene.nodes.find((g) => g.id === e.targetId);
    if (!t || !n) return null;
    const i = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], o = this.nodePos(t), s = this.nodePos(n), a = i[0] ?? s, d = i[i.length - 1] ?? o;
    let l = this.borderPoint(t, a.x, a.y), u = this.borderPoint(n, d.x, d.y);
    if (!i.length) {
      const g = this.edgeOffset(e);
      if (g !== 0) {
        const h = Math.hypot(u.x - l.x, u.y - l.y) || 1, f = -(u.y - l.y) / h * g, y = (u.x - l.x) / h * g;
        l = { x: l.x + f, y: l.y + y }, u = { x: u.x + f, y: u.y + y };
      }
    }
    return [l, ...i, u];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, n) {
    this._wpDrag = { edgeId: e.id, points: t, index: n };
    const i = t[n];
    let o = !1;
    const s = (d) => {
      if (!this._wpDrag) return;
      const l = this.toScene(d);
      if (!o && Math.hypot(l.x - i.x, l.y - i.y) < 4 / this._t.k) return;
      o = !0;
      const u = [...this._wpDrag.points];
      u[this._wpDrag.index] = l, this._wpDrag = { ...this._wpDrag, points: u };
    }, a = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", a), this._wpDrag && o && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", a);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let n = { seg: 0, dist: 1 / 0 };
    for (let i = 0; i < e.length - 1; i++) {
      const { dist: o } = zl(t, e[i], e[i + 1]);
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
        d();
        return;
      }
      const u = this.toScene(l);
      if (s) {
        if (this._wpDrag) {
          const g = [...this._wpDrag.points];
          g[o] = u, this._wpDrag = { ...this._wpDrag, points: g };
        }
      } else {
        if (Math.hypot(u.x - i.x, u.y - i.y) < 4 / this._t.k) return;
        s = !0, this.focus();
        const g = [...this.edgePoints[t.id] ?? []];
        g.splice(o, 0, u), this._selectedWaypoint = { edgeId: t.id, index: o }, this._wpDrag = { edgeId: t.id, points: g, index: o };
      }
    }, d = () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", d), s && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", d);
  }
  removeWaypoint(e, t) {
    const n = [...this.edgePoints[e.id] ?? []];
    n.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: n });
  }
  /** The interactive half of an edge: the fat invisible hit line (select, bend, drag). */
  renderEdgeHit(e, t) {
    const n = t.map((i) => `${i.x},${i.y}`).join(" ");
    return te`
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
          ${e.tooltip ? te`<title>${e.tooltip}</title>` : ""}
        </polyline>
      </g>`;
  }
  /**
   * The visible half (stroke, arrow, label, waypoint handles), painted in a layer
   * ABOVE every node so a line is never hidden — without stealing the nodes'
   * pointer events: only the label and the waypoint handles are interactive.
   */
  renderEdgeInk(e, t, n) {
    const i = e.color ?? "#64748b", o = this.selectedId === e.id, s = o || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), a = Math.floor((t.length - 1) / 2), d = {
      x: (t[a].x + t[a + 1].x) / 2,
      y: (t[a].y + t[a + 1].y) / 2
    }, l = t.slice(1, -1);
    return te`
      <g data-edge-ink=${e.id} pointer-events="none" opacity=${e.dim ? 0.18 : 1}>
        <path d=${Ul(t, n)}
              fill="none"
              class=${e.kind === "journey" ? "journey-flow" : ""}
              stroke=${i} stroke-width=${e.kind === "journey" || s ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-start=${e.kind === "contains" ? `url(#diamond-${this.markerId(i)})` : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(i)})` : ""}></path>
        ${e.label ? te`<text x=${d.x} y=${d.y - 6} text-anchor="middle"
                  style="cursor: pointer" pointer-events="all"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${i}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(u) => {
      u.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
                  @dblclick=${(u) => {
      u.stopPropagation(), this.emit("element-activated", {
        elementType: "edge",
        id: e.id,
        kind: e.kind,
        x: u.clientX,
        y: u.clientY
      });
    }}>
                  ${e.label}
                </text>` : ""}
        ${o ? l.map((u, g) => {
      var f;
      const h = ((f = this._selectedWaypoint) == null ? void 0 : f.edgeId) === e.id && this._selectedWaypoint.index === g;
      return te`
                <circle data-waypoint cx=${u.x} cy=${u.y} r=${h ? 6 : 5}
                        fill=${h ? "#2563eb" : "#ffffff"}
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
        for (const w of y) {
          const c = s[s.length - 1];
          (!c || Math.hypot(w.x - c.x, w.y - c.y) > 0.5) && s.push(w);
        }
      if (s.length < 2) return;
      let a = 0;
      for (let y = 0; y < s.length - 1; y++)
        a += Math.hypot(s[y + 1].x - s[y].x, s[y + 1].y - s[y].y);
      const d = "M " + s.map((y) => `${y.x} ${y.y}`).join(" L "), l = Math.min(6, Math.max(1.4, a / 260)), u = `jrun${o}`, g = o === 0 ? `0s;jrun${t.length - 1}.end+0.4s` : `jrun${o - 1}.end+0.4s`;
      n.push(te`
        <circle r="6.5" fill="#d97706" stroke="#ffffff" stroke-width="1.8"
                opacity="0" pointer-events="none">
          <animateMotion id=${u} path=${d} dur="${l}s" begin=${g} fill="remove"
                         calcMode="linear"></animateMotion>
          <set attributeName="opacity" to="1" begin="${u}.begin" end="${u}.end"></set>
        </circle>`);
      const h = s[0], f = s[s.length - 1];
      n.push(te`
        <circle cx=${h.x} cy=${h.y} r="5" fill="none" stroke="#d97706"
                stroke-width="2.5" opacity="0" pointer-events="none">
          <animate attributeName="r" values="5;26" dur="0.6s" begin="${u}.begin"
                   fill="remove"></animate>
          <animate attributeName="opacity" values="0.9;0" dur="0.6s" begin="${u}.begin"
                   fill="remove"></animate>
        </circle>
        <circle cx=${f.x} cy=${f.y} r="26" fill="none" stroke="#d97706"
                stroke-width="2.5" opacity="0" pointer-events="none">
          <animate attributeName="r" values="26;5" dur="0.45s" begin="${u}.end"
                   fill="remove"></animate>
          <animate attributeName="opacity" values="0.15;0.9" dur="0.45s" begin="${u}.end"
                   fill="remove"></animate>
        </circle>`);
    }), n;
  }
  markerId(e) {
    return e.replace(/[^a-zA-Z0-9]/g, "");
  }
  renderNode(e) {
    var f, y, w, c;
    const { x: t, y: n } = this.nodePos(e), i = this.selectedId === e.id || this.selectedIds.includes(e.id), o = this._hoverNodeId === e.id, s = !!e.container, a = !!e.parentId, d = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, l = ((y = this._resize) == null ? void 0 : y.id) === e.id ? this._resize.h : e.h, u = d / 2, g = l / 2, h = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return te`
      <g data-node-id=${e.id}
         opacity=${e.dim ? 0.25 : 1}
         transform="translate(${t}, ${n})${o ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (w = this._dragGroup) != null && w.has(e.id) ? "none" : "auto"}
         @pointerdown=${(r) => this.onNodePointerDown(r, e)}
         @dblclick=${(r) => {
      r.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? te`<rect x=${-u - 4} y=${-g - 4} width=${d + 8} height=${l + 8}
                  rx=${a ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-u} y=${-g} width=${d} height=${l} rx=${a ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${o || i ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${i || o ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? te`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? te`<text x=${-u} y=${-g - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? te`<g transform="translate(${u - 13}, ${-g + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(r) => {
      r.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(r) => r.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && ht[e.symbol] && (!a || s) ? te`<g transform="translate(${u - (e.collapsible ? 37 : 17)}, ${-g + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${ht[e.symbol]}
              </g>` : ""}
        ${a && !s && e.symbol && ht[e.symbol] ? te`<g transform="translate(${-u + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${ht[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? te`
              <foreignObject x=${-u + 6} y=${s ? -g + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${s ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(r) => r.stopPropagation()}
                  @keydown=${(r) => {
      r.stopPropagation(), r.key === "Enter" && this.commitRename(e, r.target.value), r.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(r) => this.commitRename(e, r.target.value)}
                />
              </foreignObject>` : a && !s ? te`<text x=${-u + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : s ? te`<text x=${-u + 12} y=${-g + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : e.kind === "area" ? "" : te`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${s ? te`<line x1=${-u + 8} y1=${-g + 28} x2=${u - 8} y2=${-g + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${i && this.connectable && (a ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-system" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "note" || e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item" || // Archi style: the ex-nested kinds are free boxes now — same handles.
    e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "read-model" || e.kind === "query-service" || e.kind === "scheduled-trigger" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api-impl" || e.kind === "service") ? [
      [u, 0],
      [-u, 0],
      [0, g],
      [0, -g]
    ].map(
      ([r, m]) => te`
                <circle data-handle cx=${r} cy=${m} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(v) => this.onHandlePointerDown(v, e)}>
                  <title>${a ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "note" ? "Arrastra hasta cualquier elemento o relación: la nota quedará atada con un hilo" : e.kind === "service" ? "Arrastra hasta un módulo (o su contexto) para desplegarlo en este servicio" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${i && this.connectable && ((c = e.extraHandles) != null && c.length) ? e.extraHandles.map(
      (r, m) => te`
                <g transform="translate(${-u + 24 + m * 20}, ${-g})">
                  <circle data-handle r="7" fill=${r.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(v) => this.onHandlePointerDown(v, e, r.kind)}>
                    <title>${r.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${(s || e.resizable) && i ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([r, m]) => te`
                <rect data-resize x=${r * u - 6.5} y=${m * g - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${r * m > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(v) => this.onResizePointerDown(v, e, r, m)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return te``;
    const e = this.scene.nodes.find((n) => n.id === this._pendingLink.sourceId);
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
    let n = !1;
    const i = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s), window.removeEventListener("pointercancel", i), this._rubber = null;
    }, o = (a) => {
      if ((a.buttons & 1) === 0) {
        i();
        return;
      }
      const d = this.toScene(a);
      !n && Math.hypot(d.x - t.x, d.y - t.y) < 4 / this._t.k || (n = !0, this._rubber = { a: t, b: d });
    }, s = () => {
      if (window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s), window.removeEventListener("pointercancel", i), n && this._rubber) {
        const { a, b: d } = this._rubber, l = Math.min(a.x, d.x), u = Math.max(a.x, d.x), g = Math.min(a.y, d.y), h = Math.max(a.y, d.y), f = this.scene.nodes.filter((y) => {
          const w = this.nodePos(y);
          return w.x >= l && w.x <= u && w.y >= g && w.y <= h;
        }).map((y) => y.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", s), window.addEventListener("pointercancel", i);
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
    const n = Math.min(...t.map((a) => a.x - a.w / 2)) - e, i = Math.max(...t.map((a) => a.x + a.w / 2)) + e, o = Math.min(...t.map((a) => a.y - a.h / 2)) - e, s = Math.max(...t.map((a) => a.y + a.h / 2)) + e;
    return { minX: n, minY: o, w: i - n, h: s - o };
  }
  centerViewportOn(e, t) {
    const n = this.renderRoot.querySelector("svg.main");
    if (!n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect(), o = this._t.k, s = Ut.translate(i.width / 2 - o * e, i.height / 2 - o * t).scale(o);
    je(n).call(this._zoomBehavior.transform, s);
  }
  onMinimapPointer(e, t, n) {
    const i = e.currentTarget.getBoundingClientRect(), o = t.minX + (e.clientX - i.left) / n, s = t.minY + (e.clientY - i.top) / n;
    this.centerViewportOn(o, s);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return E``;
    const t = 160, n = 110, i = Math.min(t / e.w, n / e.h), o = this.getBoundingClientRect(), s = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, d = o.width / this._t.k, l = o.height / this._t.k;
    return E`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(u) => {
      u.stopPropagation();
      try {
        u.currentTarget.setPointerCapture(u.pointerId);
      } catch {
      }
      this.onMinimapPointer(u, e, i);
    }}
        @pointermove=${(u) => {
      var g, h;
      (h = (g = u.currentTarget).hasPointerCapture) != null && h.call(g, u.pointerId) && this.onMinimapPointer(u, e, i);
    }}
      >
        <svg viewBox="0 0 ${t} ${n}">
          ${this.scene.nodes.map((u) => {
      const g = this.nodePos(u);
      return te`<rect
              x=${(g.x - u.w / 2 - e.minX) * i}
              y=${(g.y - u.h / 2 - e.minY) * i}
              width=${Math.max(2, u.w * i)}
              height=${Math.max(2, u.h * i)}
              rx="1" fill=${u.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(s - e.minX) * i}
            y=${(a - e.minY) * i}
            width=${d * i}
            height=${l * i}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((a) => a.color ?? "#64748b"))], t = [], n = [], i = [], o = /* @__PURE__ */ new Map();
    this.scene.edges.forEach((a) => {
      const d = this.edgePolyline(a);
      if (d) {
        a.kind === "journey" && o.set(a.id, d), n.push(this.renderEdgeHit(a, d)), i.push(this.renderEdgeInk(a, d, [...t]));
        for (let l = 0; l < d.length - 1; l++) t.push([d[l], d[l + 1]]);
      }
    });
    const s = this.renderJourneyRunners(o);
    return E`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(a) => {
      const d = a.target;
      d.closest("[data-node-id]") || d.closest("[data-edge-id]") || this._spaceDown || a.button !== 0 || (a.buttons & 1) !== 0 && this.startRubberBand(a);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (a) => te`
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
          ${this._menuSlots ? te`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (a, d) => te`
                    <line x1=${a.x1} y1=${a.y} x2=${a.x2} y2=${a.y}
                          stroke=${d === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${d === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${d === this._menuSlots.active ? te`<circle cx=${a.x1} cy=${a.y} r="3.5" fill="#0284c7"></circle>
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
xe.styles = xt`
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
  le({ attribute: !1 })
], xe.prototype, "scene", 2);
we([
  le({ attribute: !1 })
], xe.prototype, "selectedId", 2);
we([
  le({ attribute: !1 })
], xe.prototype, "selectedIds", 2);
we([
  le({ type: Boolean })
], xe.prototype, "connectable", 2);
we([
  le({ attribute: !1 })
], xe.prototype, "edgePoints", 2);
we([
  q()
], xe.prototype, "_t", 2);
we([
  q()
], xe.prototype, "_dragPos", 2);
we([
  q()
], xe.prototype, "_menuSlots", 2);
we([
  q()
], xe.prototype, "_dragGroup", 2);
we([
  q()
], xe.prototype, "_pendingLink", 2);
we([
  q()
], xe.prototype, "_hoverNodeId", 2);
we([
  q()
], xe.prototype, "_editingId", 2);
we([
  q()
], xe.prototype, "_spaceDown", 2);
we([
  q()
], xe.prototype, "_wpDrag", 2);
we([
  q()
], xe.prototype, "_selectedWaypoint", 2);
we([
  q()
], xe.prototype, "_resize", 2);
we([
  q()
], xe.prototype, "_rubber", 2);
we([
  le({ attribute: !1 })
], xe.prototype, "fitInsets", 2);
xe = we([
  vt("modux-canvas")
], xe);
function qi(e) {
  const t = e.legs ?? [], n = /* @__PURE__ */ new Map();
  for (let s = 0; s <= t.length; s++) {
    let a = !1;
    for (const d of t) {
      const l = Math.max(0, ...(d.afterLegIds ?? []).map((u) => n.get(u) ?? 0)) + 1;
      l <= t.length && l !== (n.get(d.id) ?? 0) && (n.set(d.id, l), a = !0);
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
    a.forEach((d, l) => {
      o.set(d, a.length === 1 ? `${s}` : `${s}${String.fromCharCode(97 + l)}`);
    });
  return o;
}
function Ui(e) {
  const t = e.legs ?? [], n = new Map(t.map((u) => [u.id, u])), i = /* @__PURE__ */ new Map();
  for (const u of t)
    for (const g of u.afterLegIds ?? [])
      i.set(g, [...i.get(g) ?? [], u.id]);
  const o = (u, g) => {
    const h = n.get(u);
    if (!h) return [];
    const f = i.get(u) ?? [], y = t.filter((w) => w.sourceId === h.targetId && w.id !== u).map((w) => w.id);
    return [.../* @__PURE__ */ new Set([...f, ...y])].filter((w) => !g.has(w));
  }, s = new Set(t.map((u) => u.targetId)), a = t.filter((u) => !(u.afterLegIds ?? []).length && !s.has(u.sourceId)).map((u) => u.id);
  !a.length && t.length && a.push(t[0].id);
  const d = [], l = (u, g) => {
    if (u.length > t.length) return;
    const h = o(u[u.length - 1], g);
    if (!h.length) {
      d.push(u);
      return;
    }
    for (const f of h) l([...u, f], /* @__PURE__ */ new Set([...g, f]));
  };
  for (const u of a) l([u], /* @__PURE__ */ new Set([u]));
  return d;
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
function Oe(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function me(e, t) {
  e.edges.some((n) => n.id === t.id) || e.edges.push(t);
}
const kt = (e) => e.trim().toLowerCase();
function Fl(e, t, n = /* @__PURE__ */ new Set(), i = !1) {
  var C, W, G, M, j;
  const o = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.boundedContexts.map((b) => [b.id, b.name])), a = e.boundedContexts.flatMap(
    (b) => (b.useCases ?? []).map((x) => ({ ...x, boundedContextId: b.id }))
  ), d = new Set(a.map((b) => b.id)), l = e.aggregates ?? [], u = new Set(
    e.boundedContexts.flatMap((b) => (b.domainServices ?? []).map((x) => x.id))
  ), g = e.boundedContexts.flatMap(
    (b) => (b.domainEvents ?? []).map((x) => ({ ...x, boundedContextId: b.id, application: !1 }))
  ), h = e.boundedContexts.flatMap(
    (b) => (b.applicationEvents ?? []).map((x) => ({ ...x, boundedContextId: b.id, application: !0 }))
  ), f = e.boundedContexts.flatMap(
    (b) => (b.readModels ?? []).map((x) => ({ ...x, boundedContextId: b.id }))
  );
  for (const b of a)
    Oe(o, {
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
      tooltip: b.policy ? `${b.name} — policy de ${s.get(b.boundedContextId) ?? b.boundedContextId} (reacción, no caso de negocio)` : `${b.name} — caso de uso de ${s.get(b.boundedContextId) ?? b.boundedContextId}`
    });
  for (const b of a) {
    const x = b.steps ?? [];
    if (!x.length) continue;
    const I = o.nodes.get(b.id), k = i || n.has(b.id);
    I && (I.collapsible = !0, I.collapsed = !k), k && x.forEach((_, A) => {
      Oe(o, {
        id: _.id,
        label: `${A + 1}. ${_.name || _.type || "paso"}`,
        x: 0,
        y: 0,
        w: oe.command.w,
        h: 30,
        kind: "use-case-step",
        symbol: "gear",
        fill: "#eff6ff",
        stroke: "#1d4ed8",
        dashed: !!_.customCodeId,
        ownerId: b.id,
        tooltip: `Paso de ${b.name}${_.customCodeId ? " — delega en código a mano" : ""} — arrastra su asa hasta un CODE para delegar en él`
      }), me(o, {
        id: `esstep:${A === 0 ? b.id : x[A - 1].id}->${_.id}`,
        sourceId: A === 0 ? b.id : x[A - 1].id,
        targetId: _.id,
        kind: "es-step",
        color: "#94a3b8",
        dashed: !0,
        arrow: !0,
        tooltip: `pipeline de ${b.name}`
      });
    });
  }
  for (const b of e.customCodes ?? [])
    Oe(o, {
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
  for (const b of a)
    for (const x of b.steps ?? []) {
      if (!x.customCodeId) continue;
      const I = !o.nodes.has(x.id), k = I ? b.id : x.id;
      I && o.edges.some((_) => _.kind === "es-custom" && _.sourceId === k && _.targetId === x.customCodeId) || me(o, {
        id: `escc:${x.id}`,
        sourceId: k,
        targetId: x.customCodeId,
        kind: "es-custom",
        color: "#0f172a",
        dashed: !0,
        arrow: !0,
        tooltip: I ? `Un paso plegado de ${b.name} delega en este código — expande el comando para verlo` : "El paso delega en código a mano — Supr lo desconecta"
      });
    }
  for (const b of l)
    Oe(o, {
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
      tooltip: `${b.name} — agregado de ${s.get(b.boundedContextId) ?? b.boundedContextId}`
    });
  const y = /* @__PURE__ */ new Map();
  for (const b of [...g, ...h])
    Oe(o, {
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
      tooltip: `${b.name} — evento de ${s.get(b.boundedContextId) ?? b.boundedContextId}`
    }), y.set(kt(b.name), b.id);
  const w = (b) => {
    if (!b || !b.trim()) return null;
    const x = y.get(kt(b));
    if (x) return x;
    const I = `evname:${kt(b)}`;
    return Oe(o, {
      id: I,
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
    }), I;
  }, c = (b) => {
    const x = f.find((k) => k.id === b.id) ?? f.find((k) => b.name && kt(k.name) === kt(b.name)), I = (x == null ? void 0 : x.id) ?? (b.id || (b.name ? `rm:${kt(b.name)}` : null));
    return I ? (Oe(o, {
      id: I,
      label: (x == null ? void 0 : x.name) ?? b.name ?? I,
      x: 0,
      y: 0,
      w: oe.readModel.w,
      h: oe.readModel.h,
      kind: x ? "read-model" : "derived-read-model",
      fill: oe.readModel.fill,
      stroke: oe.readModel.stroke,
      dashed: !x,
      badge: "READ MODEL"
    }), I) : null;
  };
  for (const b of e.actorUses ?? []) {
    if (!d.has(b.targetId)) continue;
    const x = (e.actors ?? []).find((I) => I.id === b.actorId);
    x && (Oe(o, {
      id: x.id,
      label: x.name,
      x: 0,
      y: 0,
      w: oe.actor.w,
      h: oe.actor.h,
      kind: "actor",
      symbol: "person",
      fill: oe.actor.fill,
      stroke: oe.actor.stroke,
      badge: "ACTOR"
    }), me(o, {
      id: `es-actor:${x.id}->${b.targetId}`,
      sourceId: x.id,
      targetId: b.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const b of e.aiAgents ?? []) {
    const x = (e.agentUses ?? []).filter((N) => N.agentId === b.id), I = (e.agentExternalUses ?? []).filter((N) => N.agentId === b.id), k = (e.agentRags ?? []).filter((N) => N.agentId === b.id), _ = (e.agentMcpUses ?? []).filter((N) => N.agentId === b.id), A = (e.agentGatewayUses ?? []).some((N) => N.agentId === b.id) || (e.agentApiOpUses ?? []).some((N) => N.agentId === b.id) || (e.agentQueryUses ?? []).some((N) => N.agentId === b.id) || (e.agentDelegations ?? []).some((N) => N.agentId === b.id) || (e.agentTriggers ?? []).some((N) => N.agentId === b.id);
    if (!(!x.length && !I.length && !k.length && !_.length && !A)) {
      Oe(o, {
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
      for (const N of x)
        d.has(N.useCaseId) && me(o, {
          id: `es-agent:${b.id}->${N.useCaseId}`,
          sourceId: b.id,
          targetId: N.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const N of I) {
        const O = e.externalSystems.find(
          (D) => (D.useCases ?? []).some((X) => X.id === N.externalUseCaseId)
        );
        if (!O) continue;
        const U = (C = (O.useCases ?? []).find((D) => D.id === N.externalUseCaseId)) == null ? void 0 : C.name;
        Oe(o, {
          id: O.id,
          label: O.name,
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
        }), me(o, {
          id: `es-agentx:${b.id}->${N.externalUseCaseId}`,
          sourceId: b.id,
          targetId: O.id,
          kind: "es-agent-external",
          label: U,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: U ? `Llama a ${U} del sistema externo` : void 0
        });
      }
      for (const N of _) {
        const O = e.externalSystems.find(
          (D) => (D.mcpServers ?? []).some((X) => X.id === N.mcpServerId)
        );
        if (!O) continue;
        const U = (W = (O.mcpServers ?? []).find((D) => D.id === N.mcpServerId)) == null ? void 0 : W.name;
        Oe(o, {
          id: O.id,
          label: O.name,
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
        }), me(o, {
          id: `es-agentmcp:${b.id}->${N.mcpServerId}`,
          sourceId: b.id,
          targetId: O.id,
          kind: "es-agent-mcp",
          label: U,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: U ? `Consume las herramientas del servidor MCP ${U}` : void 0
        });
      }
      for (const N of k) {
        const O = (e.rags ?? []).find((U) => U.id === N.ragId);
        if (O) {
          Oe(o, {
            id: O.id,
            label: O.name,
            x: 0,
            y: 0,
            w: oe.readModel.w,
            h: oe.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${O.name} — base de conocimiento (retrieval)`
          }), me(o, {
            id: `es-agrag:${b.id}->${O.id}`,
            sourceId: b.id,
            targetId: O.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const U of O.sourceReadModelIds ?? []) {
            const D = c({ id: U });
            D && me(o, {
              id: `es-ragsrc:${O.id}->${D}`,
              sourceId: D,
              targetId: O.id,
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
  const r = (b) => {
    const x = e.externalSystems.find((I) => I.id === b);
    return x ? (Oe(o, {
      id: x.id,
      label: x.name,
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
    }), x.id) : null;
  };
  for (const b of e.externalCalls ?? []) {
    const x = r(b.externalSystemId);
    !x || !d.has(b.useCaseId) || me(o, {
      id: `es-extin:${x}->${b.useCaseId}`,
      sourceId: x,
      targetId: b.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const b of e.externalUseCaseCalls ?? []) {
    if (!d.has(b.sourceId)) continue;
    const x = e.externalSystems.find(
      (_) => (_.useCases ?? []).some((A) => A.id === b.targetId)
    ), I = x ? r(x.id) : null;
    if (!I) continue;
    const k = (G = ((x == null ? void 0 : x.useCases) ?? []).find((_) => _.id === b.targetId)) == null ? void 0 : G.name;
    me(o, {
      id: `es-extout:${b.sourceId}->${b.targetId}`,
      sourceId: b.sourceId,
      targetId: I,
      kind: "es-command-external",
      label: k,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: k ? `Llama a ${k} del sistema externo` : void 0
    });
  }
  for (const b of e.aggregateCalls ?? [])
    !d.has(b.sourceId) || !o.nodes.has(b.targetId) || me(o, {
      id: `es-write:${b.sourceId}->${b.targetId}`,
      sourceId: b.sourceId,
      targetId: b.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const m = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const b of m)
    !o.nodes.has(b.domainEventId) || !(o.nodes.has(b.sourceId) && (d.has(b.sourceId) || l.some((I) => I.id === b.sourceId) || u.has(b.sourceId))) || me(o, {
      id: `es-emit:${b.sourceId}->${b.domainEventId}`,
      sourceId: b.sourceId,
      targetId: b.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const v = (b, x, I, k, _, A) => (Oe(o, {
    id: b,
    label: x,
    x: 0,
    y: 0,
    w: oe.policy.w,
    h: oe.policy.h,
    kind: I,
    symbol: "flow",
    fill: oe.policy.fill,
    stroke: oe.policy.stroke,
    badge: k,
    tooltip: _
  }), b), $ = (b, x) => {
    const I = w(b);
    I && me(o, {
      id: `es-trigger:${I}->${x}`,
      sourceId: I,
      targetId: x,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, S = (b, x) => {
    !x || !d.has(x) || me(o, {
      id: `es-invoke:${b}->${x}`,
      sourceId: b,
      targetId: x,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const b of e.subscriptions ?? []) {
    const x = v(
      b.id,
      b.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${b.name}${b.eventName ? ` — reacciona a ${b.eventName}` : ""}${b.consumerGroup ? ` · grupo ${b.consumerGroup}` : ""}`
    );
    $(b.eventName, x);
    for (const I of b.actions ?? []) {
      if (I.type === "CallUseCase" && S(x, I.useCaseId), I.type === "StartSaga" && I.sagaId) {
        const k = `saga:${I.sagaId}`;
        v(k, I.sagaId, "saga", "SAGA"), me(o, {
          id: `es-saga:${x}->${k}`,
          sourceId: x,
          targetId: k,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (I.type === "UpdateProjection" && I.projectionId) {
        const k = (e.projections ?? []).find((_) => _.id === I.projectionId);
        k && me(o, {
          id: `es-feeds:${x}->${k.id}`,
          sourceId: x,
          targetId: k.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const b of e.projections ?? []) {
    const x = v(
      b.id,
      b.name,
      "projection",
      "PROYECCIÓN",
      `${b.name}${b.readModelName ? ` — materializa ${b.readModelName}` : ""}`
    );
    for (const _ of b.handledEventIds) {
      const A = o.nodes.has(_) ? _ : null;
      A && me(o, {
        id: `es-trigger:${A}->${x}`,
        sourceId: A,
        targetId: x,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    b.sourceAggregateId && o.nodes.has(b.sourceAggregateId) && me(o, {
      id: `es-state:${b.id}`,
      sourceId: b.sourceAggregateId,
      targetId: x,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const I = b.sourceExternalUseCaseId ?? b.sourceExternalTableId;
    if (I) {
      const _ = e.externalSystems.find(
        (N) => (N.useCases ?? []).some((O) => O.id === I) || (N.tables ?? []).some((O) => O.id === I)
      ), A = _ ? r(_.id) : null;
      if (A) {
        const N = ((M = (_.useCases ?? []).find((O) => O.id === I)) == null ? void 0 : M.name) ?? ((j = (_.tables ?? []).find((O) => O.id === I)) == null ? void 0 : j.name);
        me(o, {
          id: `es-poll:${b.id}`,
          sourceId: A,
          targetId: x,
          kind: "es-projects-poll",
          label: N,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: N ? `polling de ${N}` : "polling"
        });
      }
    }
    const k = c({ id: b.readModelId, name: b.readModelName });
    k && me(o, {
      id: `es-projects:${x}->${k}`,
      sourceId: x,
      targetId: k,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const b of e.flows) {
    if (b.archetype === "MATERIALIZES") {
      const I = w(b.triggerEvent), k = c({ name: b.readModelName ?? `${b.triggerEvent}View` });
      I && k && me(o, {
        id: `es-mat:${b.id}`,
        sourceId: I,
        targetId: k,
        kind: "es-materializes",
        label: b.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${b.name} [MATERIALIZES]`
      });
      continue;
    }
    const x = v(
      `flow:${b.id}`,
      b.name,
      "flow",
      `POLICY · ${b.archetype}`,
      `Flow ${b.name} [${b.archetype}]`
    );
    if ($(b.triggerEvent, x), S(x, b.targetUseCaseId), !b.targetUseCaseId) {
      const I = r(b.targetId), k = I ?? `tgt:${b.targetId}`;
      !I && s.has(b.targetId) && Oe(o, {
        id: k,
        label: s.get(b.targetId) ?? b.targetId,
        x: 0,
        y: 0,
        w: oe.boundedContext.w,
        h: oe.boundedContext.h,
        kind: "boundedContext",
        symbol: "component",
        fill: oe.boundedContext.fill,
        stroke: oe.boundedContext.stroke,
        badge: "CONTEXTO"
      }), o.nodes.has(k) && me(o, {
        id: `es-deliver:${b.id}`,
        sourceId: x,
        targetId: k,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const b of e.processes ?? []) {
    const x = v(
      b.id,
      b.name,
      "process",
      `PROCESO${b.sla ? ` · SLA ${b.sla}` : ""}`,
      `${b.name}${b.triggerEvent ? ` — arranca con ${b.triggerEvent}` : ""}`
    );
    $(b.triggerEvent, x);
    for (const k of b.steps) S(x, k.useCaseId);
    const I = w(b.onCompletionEventName);
    I && me(o, {
      id: `es-done:${b.id}`,
      sourceId: x,
      targetId: I,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const b of e.workflows ?? []) {
    const x = v(
      b.id,
      b.name,
      "workflow",
      "WORKFLOW",
      `${b.name}${b.triggerEvent ? ` — arranca con ${b.triggerEvent}` : ""}`
    );
    $(b.triggerEvent, x);
    for (const k of b.steps ?? []) {
      S(x, k.targetUseCaseId);
      for (const _ of [k.emittedEventName, k.completionEventName]) {
        const A = w(_);
        A && me(o, {
          id: `es-wfemit:${b.id}:${A}`,
          sourceId: x,
          targetId: A,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const I = w(b.onCompletionEventName);
    I && me(o, {
      id: `es-done:${b.id}`,
      sourceId: x,
      targetId: I,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const T = [...o.nodes.values()], R = /* @__PURE__ */ new Map();
  for (const b of o.edges)
    R.has(b.targetId) || R.set(b.targetId, []), R.get(b.targetId).push(b.sourceId);
  const L = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Set(), H = (b) => {
    const x = L.get(b);
    if (x !== void 0) return x;
    if (V.has(b)) return 0;
    V.add(b);
    const I = R.get(b) ?? [], k = I.length ? 1 + Math.max(...I.map(H)) : 0;
    return V.delete(b), L.set(b, k), k;
  }, ae = /* @__PURE__ */ new Map();
  for (const b of T) {
    const x = t[b.id];
    if (x) {
      b.x = x.x, b.y = x.y;
      continue;
    }
    const I = H(b.id), k = ae.get(I) ?? 0;
    ae.set(I, k + 1), b.x = 140 + I * 260, b.y = 110 + k * 110;
  }
  return { nodes: T, edges: o.edges };
}
const Bl = 190, jl = 56, Fi = 180, Wl = 56, Vl = 150, Hl = 44, Bi = 250, ji = 100;
function Gl(e, t) {
  const n = /* @__PURE__ */ new Set(), i = (o) => {
    if (n.has(o.id)) return 0;
    n.add(o.id);
    const s = (o.dependsOnStepIds ?? []).map((d) => t.get(d)).filter(Boolean), a = s.length ? 1 + Math.max(...s.map(i)) : 0;
    return n.delete(o.id), a;
  };
  return i(e);
}
function Yl(e, t) {
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
function Kl(e, t, n = /* @__PURE__ */ new Set(), i = !1) {
  var c;
  const o = [], s = [], a = /* @__PURE__ */ new Set(), d = (r) => {
    var m;
    return (m = e.boundedContexts.flatMap((v) => v.useCases ?? []).find((v) => v.id === r)) == null ? void 0 : m.name;
  };
  let l = 140;
  (e.workflows ?? []).forEach((r) => {
    var ae;
    const m = new Map(r.steps.map((C) => [C.id, C])), v = new Map(r.steps.map((C) => [C.id, Gl(C, m)])), $ = /* @__PURE__ */ new Map();
    for (const C of r.steps) {
      const W = v.get(C.id) ?? 0;
      $.set(W, ($.get(W) ?? 0) + 1);
    }
    const S = Math.max(1, ...$.values()), T = Yl(e, r);
    if (T && !a.has(T.id)) {
      a.add(T.id);
      const C = t[T.id] ?? { x: 140, y: l };
      o.push({
        id: T.id,
        label: T.label,
        x: C.x,
        y: C.y,
        w: Vl,
        h: Hl,
        kind: T.kind,
        symbol: T.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: T.kind === "aggregate" ? "AGGREGATE" : T.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const R = t[r.id] ?? { x: 420, y: l }, L = i || n.has(r.id);
    o.push({
      id: r.id,
      label: r.name,
      x: R.x,
      y: R.y,
      w: Bl,
      h: jl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      collapsible: r.steps.length > 0,
      collapsed: r.steps.length > 0 && !L,
      tooltip: `${r.name}${r.triggerEvent ? ` — arranca con ${r.triggerEvent}` : ""}${r.onCompletionEventName ? ` · emite ${r.onCompletionEventName} al completar` : ""}`
    }), T && s.push({
      id: `wft:${r.id}`,
      sourceId: T.id,
      targetId: r.id,
      kind: "workflow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    });
    const V = /* @__PURE__ */ new Map();
    let H = 0;
    for (const C of L ? r.steps : []) {
      const W = v.get(C.id) ?? 0;
      H = Math.max(H, W);
      const G = V.get(W) ?? 0;
      V.set(W, G + 1);
      const M = t[C.id] ?? {
        x: R.x + (W + 1) * Bi,
        y: l + (G - ($.get(W) - 1) / 2) * ji
      }, j = d(C.targetUseCaseId);
      o.push({
        ownerId: r.id,
        id: C.id,
        label: C.name,
        x: M.x,
        y: M.y,
        w: C.type === "JOIN" || C.type === "SPLIT" ? 100 : Fi,
        h: C.type === "JOIN" || C.type === "SPLIT" ? 48 : Wl,
        kind: "workflow-step",
        symbol: C.type === "JOIN" || C.type === "SPLIT" ? "flow" : C.roleId ? "actor" : "event",
        fill: C.type === "JOIN" || C.type === "SPLIT" ? "#f5f3ff" : C.roleId ? "#fef9c3" : "#ffffff",
        stroke: C.roleId && C.type !== "JOIN" && C.type !== "SPLIT" ? "#ca8a04" : "#6d28d9",
        dashed: C.type === "JOIN" || C.type === "SPLIT",
        badge: C.type === "JOIN" ? "⨝ JOIN" : C.type === "SPLIT" ? "⑃ SPLIT" : C.roleId ? `👤 ${C.roleId}${C.formPageId ? " · 📋" : ""}${C.deadline ? ` · ${C.deadline}` : ""}` : j ? `→ ${j}` : "∅ sin use case",
        tooltip: C.type === "JOIN" ? `${C.name} — espera a TODAS sus dependencias antes de seguir` : C.type === "SPLIT" ? `${C.name} — abre ramas paralelas: los pasos que dependan de él arrancan a la vez` : `${C.name}${C.roleId ? ` · tarea HUMANA de ${C.roleId}${C.deadline ? ` (plazo ${C.deadline})` : ""}` : ""}${C.emittedEventName ? ` · emite ${C.emittedEventName}` : ""}${j ? ` · lanza ${j}` : ""}${C.completionEventName ? ` · espera ${C.completionEventName}` : ""}${C.compensationUseCaseId ? " · ⎌ compensable" : ""}`
      });
      const b = (C.dependsOnStepIds ?? []).filter((x) => m.has(x));
      b.length === 0 && s.push({
        id: `wfs:${r.id}:${C.id}`,
        sourceId: r.id,
        targetId: C.id,
        kind: "workflow-start",
        label: C.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const x of b)
        s.push({
          id: `wfdep:${x}->${C.id}`,
          sourceId: x,
          targetId: C.id,
          kind: "workflow-dependency",
          label: C.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${C.name} espera a ${((ae = m.get(x)) == null ? void 0 : ae.name) ?? x}`
        });
    }
    if (r.onCompletionEventName) {
      const C = `done:${r.id}`, W = t[C] ?? { x: R.x + (H + 2) * Bi, y: l };
      o.push({
        id: C,
        label: r.onCompletionEventName,
        x: W.x,
        y: W.y,
        w: Fi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const G = new Set(r.steps.flatMap((j) => j.dependsOnStepIds ?? [])), M = r.steps.filter((j) => !G.has(j.id));
      for (const j of M.length ? M : [])
        s.push({
          id: `wfd:${r.id}:${j.id}`,
          sourceId: j.id,
          targetId: C,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      r.steps.length || s.push({
        id: `wfd:${r.id}`,
        sourceId: r.id,
        targetId: C,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    l += Math.max(2, S + 1) * ji + 60;
  });
  const u = new Set(o.map((r) => r.id));
  (e.workflowGateways ?? []).forEach((r, m) => {
    const v = t[r.id] ?? { x: 200 + m % 5 * 220, y: 60 };
    o.push({
      id: r.id,
      label: r.name,
      x: v.x,
      y: v.y,
      w: 100,
      h: 48,
      kind: "workflow-gateway",
      symbol: "flow",
      fill: "#f5f3ff",
      stroke: "#6d28d9",
      dashed: !0,
      badge: r.type === "SPLIT" ? r.semantics === "EXCLUSIVE" ? "⑃ EXCLUSIVO" : "⑃ PARALELO" : r.semantics === "ANY" ? "⨝ CUALQUIERA" : "⨝ TODAS",
      tooltip: r.type === "SPLIT" ? `${r.name} — split ${r.semantics === "EXCLUSIVE" ? "exclusivo: elige UNA rama" : "paralelo: abre TODAS las ramas"}; doble click cambia la semántica` : `${r.name} — join que ${r.semantics === "ANY" ? "arranca con CUALQUIER entrada" : "espera a TODAS sus entradas"}; doble click cambia la semántica`
    }), u.add(r.id);
  });
  for (const r of e.workflowGateways ?? []) {
    for (const v of r.sourceIds ?? [])
      u.has(v) && s.push({
        id: `wflink:${v}->${r.id}`,
        sourceId: v,
        targetId: r.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const m = r.type === "SPLIT" && r.semantics === "EXCLUSIVE";
    for (const v of r.targetIds ?? []) {
      if (!u.has(v)) continue;
      const $ = m ? (c = (r.branchConditions ?? []).find((S) => S.targetId === v)) == null ? void 0 : c.expression : void 0;
      s.push({
        id: `wflink:${r.id}->${v}`,
        sourceId: r.id,
        targetId: v,
        kind: "wf-link",
        color: "#6d28d9",
        dashed: m && !$,
        arrow: !0,
        label: $ ?? (m ? "¿condición?" : void 0),
        tooltip: m ? `${$ ? `Rama si: ${$}` : "Rama sin condición aún"} — doble click la edita; Supr desconecta` : "el gateway fluye aquí — Supr lo desconecta"
      });
    }
  }
  (e.workflows ?? []).flatMap((m) => (m.steps ?? []).filter((v) => v.roleId && u.has(v.id))).forEach((m, v) => {
    const $ = (e.actors ?? []).find((T) => T.id === m.roleId), S = m.roleId;
    if (!u.has(S)) {
      const T = o.find((L) => L.id === m.id), R = t[S] ?? {
        x: T ? T.x - 90 : 120 + v * 200,
        y: T ? T.y - 120 : 40
      };
      o.push({
        id: S,
        label: ($ == null ? void 0 : $.name) ?? S,
        x: R.x,
        y: R.y,
        w: 130,
        h: 44,
        kind: "actor",
        symbol: "person",
        fill: "#fef9c3",
        stroke: "#ca8a04",
        badge: "ROL",
        tooltip: `${($ == null ? void 0 : $.name) ?? S} — su lista de tareas recibe los pasos humanos conectados`
      }), u.add(S);
    }
    s.push({
      id: `wfrole:${m.id}->${S}`,
      sourceId: S,
      targetId: m.id,
      kind: "wf-role",
      color: "#ca8a04",
      dashed: !0,
      arrow: !0,
      tooltip: "la tarea cae en la lista de este rol — Supr la vuelve automática"
    });
  }), (e.workflows ?? []).flatMap((m) => (m.steps ?? []).filter((v) => v.formPageId && u.has(v.id))).forEach((m, v) => {
    const $ = (e.pages ?? []).find((S) => S.id === m.formPageId);
    if ($) {
      if (!u.has($.id)) {
        const S = o.find((R) => R.id === m.id), T = t[$.id] ?? {
          x: S ? S.x : 200 + v * 220,
          y: S ? S.y + 130 : 60
        };
        o.push({
          id: $.id,
          label: $.name,
          x: T.x,
          y: T.y,
          w: 160,
          h: 48,
          kind: "page",
          symbol: "page",
          fill: "#fff7ed",
          stroke: "#ca8a04",
          badge: "📋 FORMULARIO",
          tooltip: `${$.name} — el forms engine la presenta como formulario de la tarea`
        }), u.add($.id);
      }
      s.push({
        id: `wfform:${m.id}->${$.id}`,
        sourceId: m.id,
        targetId: $.id,
        kind: "wf-form",
        color: "#ca8a04",
        dashed: !0,
        arrow: !0,
        tooltip: "la tarea humana se presenta con esta página — Supr lo desconecta"
      });
    }
  });
  for (const r of e.workflows ?? [])
    for (const m of r.steps ?? [])
      !m.handoffWorkflowId || !u.has(m.handoffWorkflowId) || !u.has(m.id) || s.push({
        id: `wflink:${m.id}->${m.handoffWorkflowId}`,
        sourceId: m.id,
        targetId: m.handoffWorkflowId,
        kind: "wf-link",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "el paso entrega a OTRO workflow — Supr lo desconecta"
      });
  const g = /* @__PURE__ */ new Map();
  for (const r of e.workflows ?? [])
    for (const m of r.steps) g.set(m.id, r.id);
  const h = new Set(o.map((r) => r.id)), f = (r) => {
    if (h.has(r)) return r;
    const m = g.get(r);
    return m && h.has(m) ? m : null;
  }, y = /* @__PURE__ */ new Set(), w = [];
  for (const r of s) {
    const m = f(r.sourceId), v = f(r.targetId);
    if (!m || !v || m === v) continue;
    if (m === r.sourceId && v === r.targetId) {
      w.push(r);
      continue;
    }
    const $ = `${r.kind}|${m}|${v}`;
    y.has($) || (y.add($), w.push({
      ...r,
      sourceId: m,
      targetId: v,
      tooltip: `${r.tooltip ?? r.kind} — de un paso plegado dentro`
    }));
  }
  return { nodes: o, edges: w };
}
const Wi = 250, Ne = 30, lt = 6, Xl = 16, Ot = 190, Jl = 60, Ql = 170, nn = 44;
function Zl(e, t, n) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${n.join(">")}`;
}
function _e(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function ec(e) {
  const t = [], n = (i, o, s) => {
    for (const a of i ?? []) {
      const d = [...o, a.label];
      t.push({ entry: a, path: d, depth: s }), n(a.children ?? [], d, s + 1);
    }
  };
  return n(e.menuItems ?? [], [], 0), t;
}
function tc(e, t, n = /* @__PURE__ */ new Set(), i = !1) {
  var L, V, H, ae;
  const o = [], s = [], a = e.uiApps ?? [], d = e.pages ?? [], l = (C) => {
    var W;
    return ((W = e.boundedContexts.flatMap((G) => G.useCases ?? []).find((G) => G.id === C)) == null ? void 0 : W.name) ?? C;
  }, u = (C) => {
    var W;
    return ((W = e.boundedContexts.flatMap((G) => G.queryServices ?? []).find((G) => G.id === C)) == null ? void 0 : W.name) ?? C;
  }, g = /* @__PURE__ */ new Map();
  let h = 160;
  for (const C of a) {
    const W = ec(C), G = i || n.has(C.id), M = 90, j = G ? W.length * (Ne + lt) : 0, b = t[C.id] ?? { x: 190, y: h + M / 2 };
    h = b.y + M / 2 + j + 70;
    const x = C.type ?? "APP";
    o.push({
      id: C.id,
      label: C.title || C.name,
      x: b.x,
      y: b.y,
      w: Wi,
      h: M,
      kind: "ui-app",
      symbol: x === "ORCHESTRATOR" || x === "VIEW_EDITOR" ? "process" : "component",
      fill: x === "ORCHESTRATOR" || x === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: x === "ORCHESTRATOR" || x === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      collapsible: W.length > 0,
      collapsed: W.length > 0 && !G,
      badge: x === "ORCHESTRATOR" ? "ORQUESTADOR" : x === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : x === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: x === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : x === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : x === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: x === "ORCHESTRATOR" ? `${C.name} — orquesta y mantiene estado; solo enseña páginas hijas` : x === "MASTER_DETAIL" ? `${C.name} — cabecera + pestañas (ambas son páginas)` : `App: ${C.name}`
    }), C.modelId && (g.set(C.modelId, {
      label: ((L = (e.models ?? []).find((_) => _.id === C.modelId)) == null ? void 0 : L.name) ?? C.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `appmodel:${C.id}->${C.modelId}`,
      sourceId: C.id,
      targetId: C.modelId,
      kind: "app-model",
      label: "estado",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0,
      tooltip: "el viewmodel de la app: el estado que mantiene y comparte con sus páginas"
    }));
    for (const [_, A, N, O, U] of [
      [C.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [C.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      _ && s.push({
        id: `${A === "app-view" ? "appview" : "appedit"}:${C.id}->${_}`,
        sourceId: C.id,
        targetId: _,
        kind: A,
        color: O,
        label: N,
        arrow: !0,
        tooltip: U
      });
    const I = C.homePageId ?? C.homeAppId;
    I && s.push({
      id: `apphome:${C.id}->${I}`,
      sourceId: C.id,
      targetId: I,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: C.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), x === "MASTER_DETAIL" && C.headerPageId && s.push({
      id: `appheader:${C.id}->${C.headerPageId}`,
      sourceId: C.id,
      targetId: C.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let k = b.y + M / 2 + 10 + Ne / 2;
    for (const { entry: _, path: A, depth: N } of G ? W : []) {
      const O = Zl(C.id, _, A), U = N * Xl;
      if (o.push({
        id: O,
        label: _.label,
        x: b.x + U / 2,
        y: k,
        w: Wi - 20 - U,
        h: Ne,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (V = _.children) != null && V.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (H = _.children) != null && H.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        ownerId: C.id,
        tooltip: (ae = _.children) != null && ae.length ? "Agrupador (con submenú): no puede abrir nada" : _.pageId ? `Abre ${_.pageId}` : _.uiAdapterId ? `Abre la app ${_.uiAdapterId}` : _.useCaseId ? `Lanza ${_.useCaseId}` : _.aggregateId ? `CRUD inferido sobre ${_.aggregateId}` : _.queryOperationId ? `Listado con filtros de ${_.queryOperationId}` : "Entrada de menú sin destino"
      }), k += Ne + lt, _.uiAdapterId && a.some((D) => D.id === _.uiAdapterId) && s.push({
        id: `menuapp:${O}->${_.uiAdapterId}`,
        sourceId: O,
        targetId: _.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), _.useCaseId && e.boundedContexts.some((X) => (X.useCases ?? []).some((se) => se.id === _.useCaseId)) && (g.set(_.useCaseId, {
        label: l(_.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${O}->${_.useCaseId}`,
        sourceId: O,
        targetId: _.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), _.aggregateId && (e.aggregates ?? []).some((D) => D.id === _.aggregateId)) {
        const D = (e.aggregates ?? []).find((X) => X.id === _.aggregateId);
        g.set(D.id, { label: D.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${O}->${D.id}`,
          sourceId: O,
          targetId: D.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (_.queryOperationId) {
        const D = e.boundedContexts.flatMap((se) => se.queryServices ?? []).find((se) => se.id === _.queryServiceId), X = ((D == null ? void 0 : D.operations) ?? []).find((se) => se.id === _.queryOperationId);
        D && X && (g.set(X.id, {
          label: `${X.name} (${D.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${O}->${X.id}`,
          sourceId: O,
          targetId: X.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      _.pageId && d.some((D) => D.id === _.pageId) && s.push({
        id: `menupage:${O}->${_.pageId}`,
        sourceId: O,
        targetId: _.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let f = 160;
  const y = (C) => {
    var W;
    return ((W = d.find((G) => G.id === C)) == null ? void 0 : W.name) ?? C;
  };
  for (const C of d) {
    const W = t[C.id] ?? { x: 640, y: f }, G = C.type === "WIZARD" ? C.wizardSteps ?? [] : [], M = i || n.has(C.id), j = Jl, b = M ? G.length * (Ne + lt) : 0;
    f = W.y + j + b + 90, o.push({
      id: C.id,
      label: C.name,
      x: W.x,
      y: W.y,
      w: Ot,
      h: j,
      kind: "page",
      symbol: "interface",
      badge: C.customCodeId ? "CODE" : C.type ?? "PAGE",
      collapsible: G.length > 0,
      collapsed: G.length > 0 && !M,
      extraHandles: [
        { kind: "viewmodel", title: "Viewmodel: arrastra hasta el modelo de datos de la página", color: "#8b5cf6" },
        ...C.type === "CRUD" ? [
          { kind: "crud-detail", title: "Detalle: arrastra hasta la página o app que abre una fila", color: "#ea580c" },
          { kind: "crud-create", title: "Alta: arrastra hasta la página o app del nuevo registro", color: "#0d9488" }
        ] : []
      ],
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: C.route ? `${C.type ?? "PAGE"} · ${C.route}` : C.type ?? "PAGE"
    });
    let x = W.y + j / 2 + 10 + Ne / 2;
    (M ? G : []).forEach((I, k) => {
      const _ = I.id ?? I.pageId ?? String(k);
      o.push({
        id: `wizrow:${C.id}:${_}`,
        label: `${k + 1}. ${I.label ?? (I.pageId ? y(I.pageId) : "Paso")}${I.pageId ? "" : " ⌁"}`,
        x: W.x,
        y: x,
        w: Ot - 20,
        h: Ne,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: I.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        ownerId: C.id,
        tooltip: I.pageId ? `Paso ${k + 1}: ${y(I.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${k + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), x += Ne + lt;
    });
    for (const [I, k, _, A] of [
      [C.crudDetailPageId ?? C.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [C.crudCreatePageId ?? C.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      I && s.push({
        id: `${k === "crud-detail" ? "cruddetail" : "crudnew"}:${C.id}->${I}`,
        sourceId: C.id,
        targetId: I,
        kind: k,
        color: A,
        label: _,
        dashed: !0,
        arrow: !0,
        tooltip: k === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let I = 0; I < (C.wizardSteps ?? []).length; I++) {
      const k = (C.wizardSteps ?? [])[I];
      if (!k.pageId) continue;
      const _ = k.id ?? k.pageId;
      s.push({
        id: `wizstep:${C.id}:${_}`,
        sourceId: `wizrow:${C.id}:${_}`,
        targetId: k.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${I + 1} — Supr desmapea`
      });
    }
    C.modelId && (g.set(C.modelId, {
      label: C.modelName ?? C.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `pgmodel:${C.id}->${C.modelId}`,
      sourceId: C.id,
      targetId: C.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const I of C.buttons ?? [])
      I.useCaseId && (g.set(I.useCaseId, {
        label: l(I.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${C.id}->${I.useCaseId}`,
        sourceId: C.id,
        targetId: I.useCaseId,
        kind: "page-button",
        label: I.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: I.mappingId ? `Botón «${I.label}» — mapping ${I.mappingId}` : `Botón «${I.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    C.listingQueryServiceId && (g.set(C.listingQueryServiceId, {
      label: u(C.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), s.push({
      id: `pglist:${C.id}->${C.listingQueryServiceId}`,
      sourceId: C.id,
      targetId: C.listingQueryServiceId,
      kind: "page-listing",
      label: "listado",
      color: "#0284c7",
      dashed: !0,
      arrow: !0
    }));
  }
  const w = e.buttonGroups ?? [], c = (C) => {
    var W;
    return ((W = w.find((G) => G.id === C)) == null ? void 0 : W.name) ?? C;
  };
  let r = 520;
  for (const C of w) {
    const W = C.buttons ?? [], G = C.groupIds ?? [], M = W.length + G.length, j = i || n.has(C.id), b = t[C.id] ?? { x: 1e3, y: r }, x = 70, I = j ? M * (Ne + lt) : 0;
    r = b.y + x + I + 80, o.push({
      id: C.id,
      label: C.name,
      x: b.x,
      y: b.y,
      w: Ot,
      h: x,
      kind: "button-group",
      symbol: "usecase",
      badge: "BOTONES",
      collapsible: M > 0,
      collapsed: M > 0 && !j,
      fill: "#ffffff",
      stroke: "#0e7490",
      extraHandles: [
        { kind: "toolbar", title: "Toolbar: arrastra hasta una página para engancharlo arriba", color: "#0284c7" },
        { kind: "bottom", title: "Botonera: arrastra hasta una página para engancharlo abajo", color: "#7c3aed" }
      ],
      tooltip: `${C.name} — grupo de botones: la paleta añade botones dentro; sus asas lo enganchan al toolbar o la botonera de una página`
    });
    let k = b.y + x / 2 + 10 + Ne / 2;
    for (const _ of j ? W : [])
      o.push({
        id: `gbtn:${C.id}:${_.id}`,
        label: _.label ?? _.id,
        x: b.x,
        y: k,
        w: Ot - 20,
        h: Ne,
        kind: "group-button",
        symbol: "usecase",
        fill: _.useCaseId || _.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !_.useCaseId && !_.apiOperationId,
        ownerId: C.id,
        tooltip: `${_.label ?? _.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), k += Ne + lt;
    for (const _ of j ? G : [])
      o.push({
        id: `gsub:${C.id}:${_}`,
        label: `▸ ${c(_)}`,
        x: b.x,
        y: k,
        w: Ot - 20,
        h: Ne,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        ownerId: C.id,
        tooltip: `Subgrupo ${c(_)} — Supr lo desanida (el grupo sigue existiendo)`
      }), k += Ne + lt;
  }
  for (const C of w)
    for (const W of C.buttons ?? [])
      !W.useCaseId || !e.boundedContexts.some((M) => (M.useCases ?? []).some((j) => j.id === W.useCaseId)) || (g.set(W.useCaseId, {
        label: l(W.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `gbtnt:${C.id}:${W.id}`,
        sourceId: `gbtn:${C.id}:${W.id}`,
        targetId: W.useCaseId,
        kind: "gbtn-target",
        color: "#06b6d4",
        arrow: !0,
        tooltip: `«${W.label ?? W.id}» dispara este caso de uso — Supr lo desconecta`
      }));
  for (const C of d) {
    const W = [
      ["toolbar", C.toolbarGroupIds ?? []],
      ["botonera", C.bottomBarGroupIds ?? []]
    ];
    for (const [G, M] of W)
      for (const j of M)
        w.some((b) => b.id === j) && s.push({
          id: `bargrp:${C.id}:${G}:${j}`,
          sourceId: j,
          targetId: C.id,
          kind: "bar-group",
          color: G === "toolbar" ? "#0284c7" : "#7c3aed",
          label: G,
          dashed: !0,
          arrow: !0,
          tooltip: `Grupo enganchado a la ${G} de ${C.name} — Supr lo desengancha`
        });
  }
  let m = 160;
  for (const C of e.models ?? [])
    g.has(C.id) || g.set(C.id, { label: C.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [C, W] of g) {
    const G = t[C] ?? { x: 1050, y: m };
    m = G.y + nn + 46, o.push({
      id: C,
      label: W.label,
      x: G.x,
      y: G.y,
      w: Ql,
      h: nn,
      kind: W.kind,
      symbol: W.symbol,
      fill: "#ffffff",
      stroke: W.stroke
    });
  }
  let v = 120;
  for (const C of e.identityProviders ?? []) {
    const W = t[C.id] ?? { x: -320, y: v };
    v = W.y + 70 + 40, o.push({
      id: C.id,
      label: C.name,
      x: W.x,
      y: W.y,
      w: 168,
      h: 52,
      kind: "identity-provider",
      symbol: "key",
      fill: C.publishedByExternalSystemId ? "#ffffff" : "#fefce8",
      stroke: "#ca8a04",
      dashed: !!C.publishedByExternalSystemId,
      badge: C.type ?? "IDP",
      tooltip: `${C.name} — arrastra una app hasta él: sus usuarios autenticarán aquí`
    });
  }
  for (const C of a)
    C.identityProviderId && (e.identityProviders ?? []).some((W) => W.id === C.identityProviderId) && s.push({
      id: `idpauth:${C.id}`,
      sourceId: C.id,
      targetId: C.identityProviderId,
      kind: "idp-auth",
      color: "#ca8a04",
      label: "autentica con",
      dashed: !0,
      arrow: !0,
      tooltip: "los usuarios de esta app se autentican contra este IdP — Supr lo desconecta"
    });
  const $ = (e.actorAppUses ?? []).filter(
    (C) => a.some((W) => W.id === C.appId) && (e.actors ?? []).some((W) => W.id === C.actorId)
  ), S = [...new Set($.map((C) => C.actorId))];
  let T = 160;
  for (const C of S) {
    const W = (e.actors ?? []).find((M) => M.id === C), G = t[C] ?? { x: -60, y: T };
    T = G.y + nn + 46, o.push({
      id: C,
      label: W.name,
      x: G.x,
      y: G.y,
      w: 150,
      h: nn,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const C of $)
    s.push({
      id: `actorapp:${C.actorId}->${C.appId}`,
      sourceId: C.actorId,
      targetId: C.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  (e.customCodes ?? []).forEach((C, W) => {
    const G = t[C.id] ?? { x: 1200, y: 120 + W * 90 };
    o.push({
      id: C.id,
      label: C.name,
      x: G.x,
      y: G.y,
      w: 150,
      h: 44,
      kind: "custom-code",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#0f172a",
      badge: "CODE",
      dashed: !0,
      tooltip: `${C.name} — código a mano: arrastra una página hasta él para hacerla custom, y su asa hasta cualquier elemento que use`
    });
  });
  const R = new Set(o.map((C) => C.id));
  for (const C of d)
    C.customCodeId && R.has(C.customCodeId) && s.push({
      id: `ccpage:${C.id}`,
      sourceId: C.customCodeId,
      targetId: C.id,
      kind: "ui-custom-page",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      tooltip: `La página ${C.name} es CUSTOM: delega en este código — Supr lo desconecta`
    });
  for (const C of e.customCodes ?? [])
    for (const W of C.usedElementIds ?? [])
      R.has(W) && s.push({
        id: `ccuse:${C.id}->${W}`,
        sourceId: C.id,
        targetId: W,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${C.name} usa este elemento — Supr lo desconecta`
      });
  return { nodes: o, edges: s };
}
const Vi = 188, Hi = 34, Gi = 10, on = 24, Yi = 6;
function an(e, t) {
  return `fld:${e}:${t}`;
}
function Kn(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function nc(e, t) {
  const n = [], i = [], o = e.models ?? [], s = e.modelMappings ?? [], a = (f) => {
    var y;
    return ((y = o.find((w) => w.id === f)) == null ? void 0 : y.name) ?? f ?? "?";
  };
  o.forEach((f, y) => {
    const w = t[f.id] ?? { x: 200 + y % 5 * 260, y: 160 + Math.floor(y / 5) * 220 }, c = f.fields ?? [], r = Hi + (c.length ? c.length * on + (c.length - 1) * Yi : 10) + Gi;
    n.push({
      id: f.id,
      label: f.name,
      x: w.x,
      y: w.y,
      w: Vi,
      h: r,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${f.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), c.forEach((m, v) => {
      n.push({
        id: an(f.id, m.id),
        label: m.name,
        x: w.x,
        y: w.y - r / 2 + Hi + v * (on + Yi) + on / 2,
        w: Vi - 2 * Gi,
        h: on,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: m.type ?? void 0,
        parentId: f.id,
        tooltip: `${m.name}${m.type ? ` (${m.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((f, y) => {
    const w = t[f.id] ?? { x: 200 + y % 5 * 260, y: 60 };
    n.push({
      id: f.id,
      label: f.name,
      x: w.x,
      y: w.y,
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
  }), (e.customCodes ?? []).forEach((f, y) => {
    const w = t[f.id] ?? { x: 120 + y % 5 * 220, y: 60 };
    n.push({
      id: f.id,
      label: f.name,
      x: w.x,
      y: w.y,
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
  const d = new Set(n.map((f) => f.id)), l = (f) => f.fieldId ? an(f.modelId, f.fieldId) : f.modelId;
  for (const f of e.transformations ?? [])
    f.customCodeId && d.has(f.customCodeId) && d.has(f.id) && i.push({
      id: `cctf:${f.id}`,
      sourceId: f.customCodeId,
      targetId: f.id,
      kind: "custom-of-transformation",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      tooltip: `${f.name} delega en código a mano — Supr lo desconecta`
    });
  for (const f of s)
    f.customCodeId && d.has(f.customCodeId) && f.targetModelId && d.has(f.targetModelId) && i.push({
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
    for (const y of f.inputs ?? []) {
      const w = l(y);
      d.has(w) && i.push({
        id: `tfin:${f.id}:${y.modelId}:${y.fieldId ?? ""}`,
        sourceId: w,
        targetId: f.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${f.name} — Supr la desconecta`
      });
    }
    f.output && d.has(l(f.output)) && i.push({
      id: `tfout:${f.id}`,
      sourceId: f.id,
      targetId: l(f.output),
      kind: "transform-output",
      color: "#ea580c",
      arrow: !0,
      tooltip: `salida de ${f.name} — Supr la desconecta`
    });
  }
  for (const f of s)
    if (!(!f.sourceModelId || !f.targetModelId) && !(!d.has(f.sourceModelId) || !d.has(f.targetModelId))) {
      i.push({
        id: `mapping:${f.id}`,
        sourceId: f.sourceModelId,
        targetId: f.targetModelId,
        kind: "model-mapping",
        color: "#7c3aed",
        label: f.name,
        arrow: !0,
        tooltip: `${f.name} — las reglas campo a campo son las líneas finas entre campos; Supr lo elimina`
      });
      for (const y of f.rules ?? []) {
        const w = an(f.sourceModelId, y.sourceFieldId ?? ""), c = an(f.targetModelId, y.targetFieldId ?? "");
        !d.has(w) || !d.has(c) || i.push({
          id: `maprule:${f.id}:${y.id}`,
          sourceId: w,
          targetId: c,
          kind: "mapping-rule",
          color: "#a78bfa",
          dashed: !0,
          arrow: !0,
          tooltip: `Regla de ${f.name} — Supr la elimina`
        });
      }
    }
  const u = new Set(
    s.filter((f) => f.sourceModelId && f.targetModelId).map((f) => `${f.sourceModelId}->${f.targetModelId}`)
  ), g = new Map(
    e.boundedContexts.flatMap((f) => (f.useCases ?? []).map((y) => [y.id, y]))
  ), h = /* @__PURE__ */ new Set();
  for (const f of e.pages ?? [])
    if (f.modelId)
      for (const y of f.buttons ?? []) {
        if (!y.useCaseId || y.mappingId) continue;
        const w = g.get(y.useCaseId);
        if (!(w != null && w.inputModelId) || w.inputModelId === f.modelId) continue;
        const c = `${f.modelId}->${w.inputModelId}`;
        u.has(c) || h.has(c) || (h.add(c), !(!d.has(f.modelId) || !d.has(w.inputModelId)) && i.push({
          id: `mapgap:${f.id}:${y.useCaseId}`,
          sourceId: f.modelId,
          targetId: w.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${y.label}» (página ${f.name}) llama a ${w.name}: falta mapear ${a(f.modelId)} → ${a(w.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: n, edges: i };
}
const Dn = 560, sn = 34, rn = 14, zn = 150, dn = 40, ln = 12, cn = 150, tt = 40, ic = (e) => e.startsWith("SOURCE") ? 0 : e === "TRANSFORM" ? 1 : 2, oc = {
  0: { fill: "#f0f9ff", stroke: "#0284c7", symbol: "lens" },
  1: { fill: "#f0fdfa", stroke: "#0f766e", symbol: "gear" },
  2: { fill: "#f5f3ff", stroke: "#7c3aed", symbol: "event" }
};
function ac(e, t) {
  const n = [], i = [], o = e.etlFlows ?? [], s = new Map(e.boundedContexts.map((c) => [c.id, c.name])), a = new Map(
    e.boundedContexts.flatMap((c) => [
      ...(c.domainEvents ?? []).map((r) => [r.id, r.name]),
      ...(c.applicationEvents ?? []).map((r) => [r.id, r.name])
    ])
  );
  let d = 140;
  for (const c of o) {
    const r = c.steps ?? [], m = [[], [], []];
    r.forEach((T) => m[ic(T.type)].push(T));
    const v = Math.max(1, ...m.map((T) => T.length)), $ = sn + rn + v * (dn + ln), S = t[c.id] ?? { x: 420, y: d };
    d = S.y + $ + 110, n.push({
      id: c.id,
      label: c.name,
      x: S.x,
      y: S.y,
      w: Dn,
      h: $,
      kind: "etl-flow",
      symbol: "gear",
      badge: "ETL",
      container: !0,
      fill: "#ffffff",
      stroke: "#0f766e",
      tooltip: `${c.name} — integrador${c.ownerBoundedContextId ? ` de ${s.get(c.ownerBoundedContextId) ?? c.ownerBoundedContextId}` : ""}: fuentes → transformación → escrituras; la paleta añade transformaciones`
    }), m.forEach((T, R) => {
      const L = S.x - Dn / 2 + rn + zn / 2 + R * (Dn - 2 * rn - zn) / 2;
      T.forEach((V, H) => {
        const ae = oc[R];
        if (n.push({
          id: V.id,
          label: V.name ?? V.id,
          x: L,
          y: S.y - $ / 2 + sn + dn / 2 + H * (dn + ln),
          w: zn,
          h: dn,
          kind: "etl-step",
          symbol: ae.symbol,
          fill: ae.fill,
          stroke: ae.stroke,
          badge: V.type === "SOURCE_PULL" ? "PULL" : V.type === "SOURCE_CONSUMER" ? "CONSUME" : V.type === "TRANSFORM" ? "TRANSFORM" : V.type === "WRITE_API" ? "→ API" : V.type === "WRITE_DB" ? "→ BD" : "→ EVENTO",
          parentId: c.id,
          tooltip: `${V.name ?? V.id} (${V.type})${V.mappingId ? " · aplica un mapeado" : ""} — Supr lo quita del integrador`
        }), R > 0) {
          const C = m[R - 1], W = C[Math.min(H, C.length - 1)];
          W && i.push({
            id: `etlpipe:${c.id}:${W.id}->${V.id}`,
            sourceId: W.id,
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
  const l = new Set(n.map((c) => c.id)), u = new Set(o.flatMap((c) => (c.steps ?? []).map((r) => r.externalTableId)).filter(Boolean)), g = new Set(o.flatMap((c) => (c.steps ?? []).map((r) => r.apiId)).filter(Boolean)), h = new Set(o.flatMap((c) => (c.steps ?? []).map((r) => r.eventId)).filter(Boolean));
  let f = 120;
  for (const c of e.externalSystems) {
    const r = (c.tables ?? []).filter(($) => u.has($.id));
    if (!r.length) continue;
    const m = sn + rn + r.length * (tt + ln), v = t[c.id] ?? { x: -140, y: f };
    f = v.y + m + 90, n.push({
      id: c.id,
      label: c.name,
      x: v.x,
      y: v.y,
      w: cn + 30,
      h: m,
      kind: "external-system",
      symbol: "component",
      badge: "EXTERNAL",
      container: !0,
      fill: "#ffffff",
      stroke: "#64748b",
      dashed: !0,
      tooltip: `${c.name} — sistema externo: sus tablas legacy alimentan (o reciben) integradores`
    }), l.add(c.id), r.forEach(($, S) => {
      n.push({
        id: $.id,
        label: $.name,
        x: v.x,
        y: v.y - m / 2 + sn + tt / 2 + S * (tt + ln),
        w: cn,
        h: tt,
        kind: "external-table",
        symbol: "readmodel",
        fill: "#fefce8",
        stroke: "#a16207",
        parentId: c.id,
        tooltip: `${$.name} — tabla legacy de ${c.name}`
      }), l.add($.id);
    });
  }
  let y = 120;
  for (const c of e.apis ?? []) {
    if (!g.has(c.id)) continue;
    const r = t[c.id] ?? { x: 1e3, y };
    y = r.y + tt + 70, n.push({
      id: c.id,
      label: c.name,
      x: r.x,
      y: r.y,
      w: cn,
      h: tt,
      kind: "api",
      symbol: "interface",
      badge: "API",
      fill: "#eef2ff",
      stroke: "#4f46e5",
      tooltip: `${c.name} — API que un integrador consume o llama`
    }), l.add(c.id);
  }
  let w = 400;
  for (const c of h) {
    const r = c, m = t[r] ?? { x: 1e3, y: w };
    w = m.y + tt + 70, n.push({
      id: r,
      label: a.get(r) ?? r,
      x: m.x,
      y: m.y,
      w: cn,
      h: tt,
      kind: "domain-event",
      symbol: "event",
      badge: "EVENTO",
      fill: "#fff7ed",
      stroke: "#f59e0b",
      tooltip: "evento que un integrador consume o publica"
    }), l.add(r);
  }
  for (const c of o)
    for (const r of c.steps ?? []) {
      const m = r.externalTableId ?? r.apiId ?? r.eventId;
      if (!m || !l.has(m) || !l.has(r.id)) continue;
      const v = r.type.startsWith("SOURCE");
      i.push({
        id: `etl:${c.id}:${r.id}`,
        sourceId: v ? m : r.id,
        targetId: v ? r.id : m,
        kind: v ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: r.type === "SOURCE_PULL" ? "pull" : r.type === "SOURCE_CONSUMER" ? "consume" : r.type === "WRITE_API" ? "api" : r.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: v ? `${c.name} lee de aquí — Supr quita el paso` : `${c.name} escribe aquí — Supr quita el paso`
      });
    }
  return { nodes: n, edges: i };
}
async function sc(e, t) {
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
  }, a = await i.layout(s), d = {};
  for (const l of a.children ?? [])
    d[l.id] = {
      x: (l.x ?? 0) + (l.width ?? 0) / 2,
      y: (l.y ?? 0) + (l.height ?? 0) / 2
    };
  return d;
}
var rc = Object.defineProperty, dc = Object.getOwnPropertyDescriptor, De = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? dc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && rc(t, n, o), o;
};
const lc = /* @__PURE__ */ new Set([
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
let Ae = class extends Ve {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._space = !1, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._selected = /* @__PURE__ */ new Set(), this._rubber = null, this._renaming = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onSpaceKey = (e) => {
      if (e.key !== " ") return;
      const t = e.target;
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) || (this._space = e.type === "keydown", this._space && e.preventDefault());
    }, this.onDown = (e) => {
      var a, d, l;
      if (e.button !== 0 && e.button !== 1) return;
      e.button === 1 && e.preventDefault(), this.focus();
      try {
        (a = this.setPointerCapture) == null || a.call(this, e.pointerId);
      } catch {
      }
      const t = e.composedPath()[0], n = (d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".chev3");
      if (n != null && n.dataset.nodeId) {
        this.emit("node-collapse-toggled", { id: n.dataset.nodeId });
        return;
      }
      const i = (l = t == null ? void 0 : t.closest) == null ? void 0 : l.call(t, ".h3");
      if (i != null && i.dataset.sourceId) {
        const u = this.getBoundingClientRect();
        this._connect = {
          sourceId: i.dataset.sourceId,
          x1: e.clientX - u.left,
          y1: e.clientY - u.top,
          x2: e.clientX - u.left,
          y2: e.clientY - u.top
        }, this._drag = { mode: "connect", x: e.clientX, y: e.clientY, rx: this._rx, rz: this._rz, pan: { ...this._pan } };
        return;
      }
      const o = e.shiftKey || this._space || e.button === 1, s = o ? null : this.plateAt(e);
      if (!s && !o && !e.altKey) {
        const u = this.getBoundingClientRect();
        this._rubber = {
          x1: e.clientX - u.left,
          y1: e.clientY - u.top,
          x2: e.clientX - u.left,
          y2: e.clientY - u.top,
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
        const a = (i = this.shadowRoot) == null ? void 0 : i.elementFromPoint(e.clientX, e.clientY), d = (o = a == null ? void 0 : a.closest) == null ? void 0 : o.call(a, ".n3"), l = (d == null ? void 0 : d.dataset.nodeId) ?? null;
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
            const i = this.getBoundingClientRect(), o = Math.min(n.x1, n.x2) + i.left, s = Math.max(n.x1, n.x2) + i.left, a = Math.min(n.y1, n.y2) + i.top, d = Math.max(n.y1, n.y2) + i.top, l = [];
            this.renderRoot.querySelectorAll(".n3").forEach((u) => {
              const g = u.getBoundingClientRect(), h = g.left + g.width / 2, f = g.top + g.height / 2, y = u.dataset.nodeId;
              y && h >= o && h <= s && f >= a && f <= d && l.push(y);
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
    const a = new DOMMatrix().translate(i, o).multiply(s).translate(-i, -o).translate(n.width / 2, n.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), d = a.transformPoint(new DOMPoint(0, 0, 0, 1)), l = a.transformPoint(new DOMPoint(1, 0, 0, 0)), u = a.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - n.left, h = t - n.top, f = l.x - g * l.w, y = u.x - g * u.w, w = l.y - h * l.w, c = u.y - h * u.w, r = g * d.w - d.x, m = h * d.w - d.y, v = f * c - y * w;
    return v ? { x: (r * c - y * m) / v, y: (f * m - r * w) / v } : { ...this._center };
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
    const n = this.renderRoot.querySelector('[data-fx="start"]'), i = this.renderRoot.querySelector('[data-fx="end"]'), o = new Map(this.scene.nodes.map((G) => [G.id, G])), s = new Map(this.scene.edges.map((G) => [G.id, G])), a = this.depths(), d = 30, l = (G) => (a.get(G) ?? 0) * d + 8, u = (this.scene.journeyRuns ?? []).map(
      (G) => G.map((M) => s.get(M)).filter((M) => !!M).map((M) => ({ s: o.get(M.sourceId), tgt: o.get(M.targetId) })).filter((M) => !!M.s && !!M.tgt)
    ).filter((G) => G.length > 0);
    if (!u.length) {
      t.style.display = "none", n && (n.style.display = "none"), i && (i.style.display = "none");
      return;
    }
    const g = 170, h = 0.5, f = u.map((G) => G.map((M) => Math.hypot(M.tgt.x - M.s.x, M.tgt.y - M.s.y))), y = f.map((G) => Math.max(1.2, G.reduce((M, j) => M + j, 0) / g)), w = y.reduce((G, M) => G + M + h, 0);
    let c = e % w, r = 0;
    for (; c > y[r] + h; )
      c -= y[r] + h, r++;
    const m = u[r], v = (G, M, j, b) => {
      G && (G.style.display = "block", G.style.left = `${M.x}px`, G.style.top = `${M.y}px`, G.style.transform = `translateZ(${l(M.id)}px) scale(${j})`, G.style.opacity = `${b}`);
    }, $ = 0.6;
    if (c < $ && m[0]) {
      const G = c / $;
      v(n, m[0].s, 0.35 + G * 1.15, 0.9 * (1 - G));
    } else n && (n.style.display = "none");
    const S = c - y[r];
    if (S > 0 && S < 0.45 && m[m.length - 1]) {
      const G = S / 0.45;
      v(i, m[m.length - 1].tgt, 1.5 - G * 1.15, 0.15 + G * 0.75);
    } else i && (i.style.display = "none");
    if (c > y[r]) {
      t.style.display = "none";
      return;
    }
    const T = f[r].reduce((G, M) => G + M, 0) || 1;
    let R = c / y[r] * T, L = 0;
    for (; L < m.length - 1 && R > f[r][L]; )
      R -= f[r][L], L++;
    const V = m[L], H = Math.min(1, R / (f[r][L] || 1)), ae = V.s.x + (V.tgt.x - V.s.x) * H, C = V.s.y + (V.tgt.y - V.s.y) * H, W = l(V.s.id) + (l(V.tgt.id) - l(V.s.id)) * H;
    t.style.display = "block", t.style.left = `${ae}px`, t.style.top = `${C}px`, t.style.transform = `translateZ(${W}px)`;
  }
  /**
   * The virtual endpoint for a note thread that targets a RELATION: a node-shaped point
   * at the host edge's midpoint, lifted to the average of its endpoints' storeys.
   */
  edgeAnchorOf(e, t) {
    if (!e.targetId.startsWith("edgeanchor:")) return null;
    const n = this.scene.edges.find((d) => d.id === e.targetId.slice(11)), i = n ? t.get(n.sourceId) : void 0, o = n ? t.get(n.targetId) : void 0;
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
      const s = i.ownerId ?? i.parentId, a = s ? e.get(s) : void 0, d = a ? n(a) + 1 : 0;
      return t.set(i.id, d), d;
    };
    for (const i of this.scene.nodes) n(i);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return E`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), n = new Map(e.map((r) => [r.id, r])), i = Math.min(...e.map((r) => r.x - r.w / 2)) - 60, o = Math.max(...e.map((r) => r.x + r.w / 2)) + 60, s = Math.min(...e.map((r) => r.y - r.h / 2)) - 60, a = Math.max(...e.map((r) => r.y + r.h / 2)) + 60, d = (i + o) / 2, l = (s + a) / 2, u = this.getBoundingClientRect(), g = u.width ? Math.min(u.width / (o - i), u.height / (a - s), 1) * 0.9 : 0.5, h = this._k * g;
    this._kUsed = h, this._center = { x: d, y: l };
    const f = 30, y = this._liveMove, w = (r) => r.x + ((y == null ? void 0 : y.id) === r.id ? y.dx : 0), c = (r) => r.y + ((y == null ? void 0 : y.id) === r.id ? y.dy : 0);
    return E`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${h}, ${h}, ${h}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-d}px, ${-l}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${i}px; top: ${s}px"
            width=${o - i}
            height=${a - s}
            viewBox="${i} ${s} ${o - i} ${a - s}"
          >
            ${this.scene.edges.map((r) => {
      const m = n.get(r.sourceId), v = n.get(r.targetId) ?? this.edgeAnchorOf(r, n);
      return !m || !v ? "" : te`<line
                x1=${w(m)} y1=${c(m)} x2=${w(v)} y2=${c(v)}
                stroke="#000000" stroke-width="2" opacity=${r.dim ? 0.05 : 0.22} />`;
    })}
          </svg>
          ${this.scene.edges.map((r) => {
      const m = n.get(r.sourceId), v = n.get(r.targetId) ?? this.edgeAnchorOf(r, n);
      if (!m || !v) return "";
      const $ = (t.get(m.id) ?? 0) * f + 2, S = v.id ? (t.get(v.id) ?? 0) * f + 2 : v.z, T = w(v) - w(m), R = c(v) - c(m), L = S - $, V = Math.hypot(T, R), H = Math.hypot(V, L), ae = Math.atan2(R, T) * 180 / Math.PI, C = Math.atan2(L, V) * 180 / Math.PI, W = r.color ?? "#64748b", G = r.dashed ? `repeating-linear-gradient(90deg, ${W} 0 6px, transparent 6px 10px)` : W, M = r.kind === "journey";
      return E`<div
              class="edge3 ${M ? "journey3" : ""}"
              style="
                left: ${w(m)}px; top: ${c(m)}px; width: ${H}px; height: ${M ? 3 : 1.7}px;
                transform: translateZ(${$}px) rotateZ(${ae}deg) rotateY(${-C}deg);
                background: ${M ? "repeating-linear-gradient(90deg, #d97706 0 9px, transparent 9px 16px)" : G};
                opacity: ${r.dim ? 0.12 : 0.9};
              "
            ></div>
            ${M && r.label ? E`<div
                  class="journey-badge3"
                  style="
                    left: ${(w(m) + w(v)) / 2}px; top: ${(c(m) + c(v)) / 2}px;
                    transform: translate(-50%, -50%) translateZ(${($ + S) / 2 + 6}px);
                  "
                  title=${r.tooltip ?? ""}
                >${r.label}</div>` : ""}`;
    })}
          ${(this.scene.journeyRuns ?? []).length ? E`<div class="journey-runner3" style="display: none"></div>
                <div class="journey-fx3" data-fx="start" style="display: none"></div>
                <div class="journey-fx3" data-fx="end" style="display: none"></div>` : ""}
          ${e.map((r) => {
      if (r.kind === "area")
        return E`<div
                class="area3"
                title=${r.tooltip ?? ""}
                style="left: ${w(r) - r.w / 2}px; top: ${c(r) - r.h / 2}px;
                       width: ${r.w}px; height: ${r.h}px; opacity: ${r.dim ? 0.25 : 1};"
              ></div>`;
      const m = t.get(r.id) ?? 0, v = r.container || m === 0, $ = this._hoverTargetId === r.id;
      return E`
              <div
                class="n3 ${r.container ? "container3" : ""} ${this.selectedId === r.id || this._selected.has(r.id) ? "selected3" : ""} ${$ ? "hover3" : ""}"
                data-node-id=${r.id}
                data-kind=${r.kind}
                title=${r.tooltip ?? r.label}
                style="
                  opacity: ${r.dim ? 0.25 : 1};
                  left: ${w(r) - r.w / 2}px; top: ${c(r) - r.h / 2}px;
                  width: ${r.w}px; height: ${r.h}px;
                  transform: translateZ(${m * f + ($ ? 8 : 0)}px)${$ ? " scale(1.06)" : ""};
                  background: ${r.container ? "color-mix(in srgb, " + (r.fill ?? "#ffffff") + " 82%, transparent)" : r.fill ?? "#ffffff"};
                  border-color: ${r.stroke ?? "#64748b"};
                  border-style: ${r.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${v ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${r.badge ? E`<span class="badge3" style="color: ${r.stroke ?? "#94a3b8"}">${r.badge}</span>` : ""}
                <span>${r.label}</span>
                ${r.collapsible ? E`<span
                      class="chev3"
                      data-node-id=${r.id}
                      title=${r.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}
                      >${r.collapsed ? "▸" : "▾"}</span>` : ""}
              </div>
            `;
    })}
          ${(() => {
      const r = this.connectable && this.selectedId ? n.get(this.selectedId) : void 0;
      if (!r || !lc.has(r.kind)) return "";
      const m = (t.get(r.id) ?? 0) * f + 4;
      return [
        [w(r) + r.w / 2, c(r)],
        [w(r) - r.w / 2, c(r)],
        [w(r), c(r) + r.h / 2],
        [w(r), c(r) - r.h / 2]
      ].map(
        ([$, S]) => E`<div
                class="h3"
                data-source-id=${r.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${$}px; top: ${S}px; transform: translateZ(${m}px)"
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
      ${this._rubber ? E`<div
            class="lasso"
            style="left: ${Math.min(this._rubber.x1, this._rubber.x2)}px; top: ${Math.min(
      this._rubber.y1,
      this._rubber.y2
    )}px; width: ${Math.abs(this._rubber.x2 - this._rubber.x1)}px; height: ${Math.abs(
      this._rubber.y2 - this._rubber.y1
    )}px"
          ></div>` : ""}
      ${this._renaming ? (() => {
      const r = this.renderRoot.querySelector(
        `.n3[data-node-id="${this._renaming.id}"]`
      ), m = this.getBoundingClientRect(), v = r == null ? void 0 : r.getBoundingClientRect(), $ = v ? v.left + v.width / 2 - m.left : m.width / 2, S = v ? v.bottom - m.top + 6 : m.height / 2;
      return E`<input
              class="rename3"
              style="left: ${$}px; top: ${S}px"
              .value=${this._renaming.value}
              @pointerdown=${(T) => T.stopPropagation()}
              @input=${(T) => this._renaming = { ...this._renaming, value: T.target.value }}
              @keydown=${(T) => {
        if (T.stopPropagation(), T.key === "Escape" && (this._renaming = null), T.key === "Enter") {
          const R = this._renaming, L = R.value.trim();
          this._renaming = null;
          const V = this.scene.nodes.find((H) => H.id === R.id);
          L && V && L !== V.label && this.emit("node-renamed", { id: R.id, kind: R.kind, name: L });
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
De([
  le({ attribute: !1 })
], Ae.prototype, "scene", 2);
De([
  le({ attribute: !1 })
], Ae.prototype, "selectedId", 2);
De([
  le({ attribute: !1 })
], Ae.prototype, "connectable", 2);
De([
  q()
], Ae.prototype, "_rx", 2);
De([
  q()
], Ae.prototype, "_rz", 2);
De([
  q()
], Ae.prototype, "_k", 2);
De([
  q()
], Ae.prototype, "_pan", 2);
De([
  q()
], Ae.prototype, "_liveMove", 2);
De([
  q()
], Ae.prototype, "_connect", 2);
De([
  q()
], Ae.prototype, "_hoverTargetId", 2);
De([
  q()
], Ae.prototype, "_selected", 2);
De([
  q()
], Ae.prototype, "_rubber", 2);
De([
  q()
], Ae.prototype, "_renaming", 2);
Ae = De([
  vt("modux-tilt")
], Ae);
var cc = Object.defineProperty, pc = Object.getOwnPropertyDescriptor, ve = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? pc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && cc(t, n, o), o;
};
const Ki = [
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
      for (const d of a.children ?? []) i(d);
    }, o = (a) => {
      for (const d of a ?? [])
        d.id === t ? i(d) : o(d.children);
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
      const a = (e.children ?? []).filter((l) => l.kind === "tab"), d = a.find((l) => l.id === this._activeTabs[e.id]) ?? a[0];
      d && (e = d);
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
      const d = (s = n == null ? void 0 : n.dataTransfer) == null ? void 0 : s.getData("application/x-modux-cmp");
      if (!d) return;
      let l;
      try {
        l = JSON.parse(d);
      } catch {
        return;
      }
      if (!l.componentId || !l.pageId || l.pageId === ((a = this.page) == null ? void 0 : a.id)) return;
      const u = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: l.pageId, componentId: l.componentId, ...u });
      return;
    }
    if (i === e.id || this.isWithin(e.id, i)) return;
    const o = this.slotFor(e, t);
    o.beforeComponentId !== i && this.emitEvent("component-moved", { componentId: i, ...o });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var l, u, g;
    const t = e.children ?? [], n = (h) => h.map((f) => this.renderComponent(f)), i = E`<div class="placeholder">suelta componentes aquí</div>`;
    let o;
    switch (e.kind) {
      case "horizontalLayout":
        o = E`<div class="row-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "splitLayout": {
        const h = t.slice(0, Math.ceil(t.length / 2)), f = t.slice(Math.ceil(t.length / 2));
        o = E`<div class="row-lay">
          <div class="col-lay">${h.length ? n(h) : i}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? n(f) : i}</div>
        </div>`;
        break;
      }
      case "formLayout":
        o = E`<div class="grid-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        o = E`<div class="grid3-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "tabLayout": {
        const h = t.filter((y) => y.kind === "tab"), f = h.find((y) => y.id === this._activeTabs[e.id]) ?? h[0];
        o = E`
          <div class="tabbar">
            ${h.map(
          (y, w) => E`<span
                class=${y === f ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(c) => {
            c.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: y.id }, this.emitEvent("component-selected", { componentId: y.id });
          }}
                @dblclick=${(c) => {
            c.stopPropagation(), this._cmp = { ...y };
          }}
                @dragstart=${(c) => {
            var r, m;
            c.stopPropagation(), this._dragCmpId = y.id, (m = c.dataTransfer) == null || m.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (r = this.page) == null ? void 0 : r.id, componentId: y.id })
            );
          }}
                @dragover=${(c) => {
            var r;
            ((r = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : r.kind) === "tab" && (c.preventDefault(), c.stopPropagation());
          }}
                @drop=${(c) => {
            var S, T;
            const r = this._dragCmpId;
            if (!r || r === y.id || ((S = this.nodeById(r)) == null ? void 0 : S.kind) !== "tab") return;
            c.preventDefault(), c.stopPropagation();
            const m = c.currentTarget.getBoundingClientRect(), $ = c.clientX - m.left < m.width / 2 ? y.id : ((T = h[w + 1]) == null ? void 0 : T.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, $ !== r && this.emitEvent("component-moved", {
              componentId: r,
              toParentId: e.id,
              beforeComponentId: $
            });
          }}
                >${y.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${f ? this.renderComponent(f) : i}`;
        break;
      }
      case "tab":
        o = E`<div class="col-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "accordionLayout":
        o = E`<div class="col-lay">
          ${t.length ? t.map(
          (h, f) => E`
                  <div class="acc-bar"><span>${h.title ?? h.label ?? "Sección"}</span><span>${f === 0 ? "▾" : "▸"}</span></div>
                  ${f === 0 ? this.renderComponent(h) : de}
                `
        ) : i}
        </div>`;
        break;
      case "card":
        o = E`<div class="card-box">
          ${e.title ? E`<div class="card-title">${e.title}</div>` : de}
          <div class="col-lay">${t.length ? n(t) : i}</div>
        </div>`;
        break;
      case "boardLayout":
        o = E`<div class="grid3-lay">
          ${t.length ? t.map((h) => E`<div class="board-col">${this.renderComponent(h)}</div>`) : i}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [h, ...f] = t;
        o = E`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${h ? this.renderComponent(h) : E`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? n(f) : E`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        o = E`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? n(t) : i}</div>`;
        break;
      case "carouselLayout":
        o = E`<div class="row-lay">${t.length ? n(t) : i}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        o = E`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? n(t) : i}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const f = e.modelId && e.modelId === ((l = this.page) == null ? void 0 : l.modelId) ? ((u = this.page) == null ? void 0 : u.viewmodelFields) ?? [] : [];
        o = f.length ? E`<div class="grid-lay">
              ${f.slice(0, 6).map(
          (y) => E`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${y.label ?? y.name}</label>${this.control(y)}</div>`
        )}
            </div>` : E`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const h = (((g = this.page) == null ? void 0 : g.viewmodelFields) ?? []).slice(0, 4);
        o = E`<table>
            <tr>${h.length ? h.map((f) => E`<th>${f.label ?? f.name}</th>`) : E`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => E`<tr>${(h.length ? h : [1, 2, 3]).map(() => E`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? de : E`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        o = E`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const h = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        o = E`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(h)}`;
        break;
      }
      case "text":
        o = E`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        o = E`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        o = E`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        o = E`<div class="col-lay">${t.length ? n(t) : i}</div>`;
    }
    const s = pe.LEAF_KINDS.has(e.kind), a = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), d = (h) => {
      var f, y;
      h.stopPropagation(), this._dragCmpId = e.id, (y = h.dataTransfer) == null || y.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (f = this.page) == null ? void 0 : f.id, componentId: e.id })
      ), h.dataTransfer && (h.dataTransfer.effectAllowed = "move");
    };
    return E`<div
      class="cmp ${s ? "leafcmp" : ""} ${a ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(h) => {
      h.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(h) => {
      h.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${d}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(h) => {
      var y;
      h.preventDefault(), h.stopPropagation();
      const f = ((y = h.dataTransfer) == null ? void 0 : y.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...f].includes("application/x-modux-cmp") || [...f].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, h) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(h) => {
      var f, y, w;
      this._foreignOver = !1, !(!this._dragCmpId && !((w = (y = (f = h.dataTransfer) == null ? void 0 : f.types) == null ? void 0 : y.includes) != null && w.call(y, "application/x-modux-cmp"))) && (h.preventDefault(), h.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, h));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${d}
        >${pe.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${o}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, n) {
    return E`
        ${n ? E`<table>
              <tr>${t.slice(0, 4).map((i) => E`<th>${i.label ?? i.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => E`<tr>${t.slice(0, 4).map(() => E`<td>···</td>`)}</tr>`)}
            </table>` : de}
        ${t.length ? E`<div class="grid">
              ${t.map(
      (i) => E`
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
            </div>` : E`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    var o, s, a, d;
    const e = this._cmp;
    if (!e) return de;
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
    return E`<div class="pop" @click=${(l) => l.stopPropagation()}>
      ${i ? E`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(l) => t({ title: l.target.value })} />` : de}
      ${n === "text" ? E`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(l) => t({ text: l.target.value })} />` : de}
      ${n === "button" || n === "field" ? E`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(l) => t({ label: l.target.value })} />` : de}
      ${n === "button" ? E`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? E`<span class="chip">${((o = this.useCases.find((l) => l.id === e.useCaseId)) == null ? void 0 : o.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : E`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? E`<span class="chip"
                      >${((s = this.mappings.find((l) => l.id === e.mappingId)) == null ? void 0 : s.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : E`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : de}
      ${n === "form" ? E`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? E`<span class="chip"
                      >${((a = this.models.find((l) => l.id === e.modelId)) == null ? void 0 : a.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : E`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : de}
      ${n === "listing" ? E`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? E`<span class="chip"
                      >${((d = this.queryOps.find((l) => l.id === e.queryOperationId)) == null ? void 0 : d.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : E`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>` : de}
      ${n === "field" ? E`<label>Estereotipo</label>
            <select @change=${(l) => t({ stereotype: l.target.value || void 0 })}>
              ${Ki.map((l) => E`<option value=${l} ?selected=${l === (e.stereotype ?? "regular")}>${l}</option>`)}
            </select>` : de}
      ${n === "tabLayout" ? E`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : de}
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
    if (!e) return de;
    const t = e.viewmodelFields ?? [], n = e.type === "CRUD" || !!e.listingQueryServiceId, i = e.type === "WIZARD";
    return E`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? E`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(o) => this._rename = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRename(), o.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : E`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        ${this._route !== null ? E`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(o) => this._route = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRoute(), o.key === "Escape" && (this._route = null);
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
        ${(e.buttons ?? []).filter((o) => (o.bar ?? "toolbar") === "toolbar").map(
      (o) => E`<span
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
        ${(e.buttons ?? []).some((o) => (o.bar ?? "toolbar") === "toolbar") ? de : E`<span class="zoneph">suelta un caso de uso aquí</span>`}
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
        ${i ? E`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((o, s) => {
      const a = (e.wizardSteps ?? []).map((l, u) => l.id ?? l.pageId ?? String(u)), d = a[s];
      return E`<span
                      class=${s === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${s + 1}${o.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(l) => {
        l.stopPropagation(), this._dragWizKey = d;
      }}
                      @dragover=${(l) => {
        this._dragWizKey && (l.preventDefault(), l.stopPropagation());
      }}
                      @drop=${(l) => {
        const u = this._dragWizKey;
        if (this._dragWizKey = null, !u || u === d) return;
        l.preventDefault(), l.stopPropagation();
        const g = l.currentTarget.getBoundingClientRect(), f = l.clientX - g.left < g.width / 2 ? d : a[s + 1] ?? null;
        f !== u && this.emitEvent("wizard-step-moved", { stepKey: u, beforeStepKey: f });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[s] ?? `${s + 1}.`} ${o.label ?? "Paso"}${o.pageId ? "" : " ⌁"}</span
                    >`;
    }) : E`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : de}
        ${(e.content ?? []).length ? E`<div class="col-lay">${(e.content ?? []).map((o) => this.renderComponent(o))}</div>` : this.renderInferredBody(e, t, n)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => o.bar === "bottom").map(
      (o) => E`<span
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
        ${(e.buttons ?? []).some((o) => o.bar === "bottom") ? de : E`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var s, a, d;
      const o = (((s = this.page) == null ? void 0 : s.buttons) ?? []).some((l) => l.useCaseId === this._btn.useCaseId);
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
                        >${((d = this.mappings.find((l) => l.id === this._btn.mappingId)) == null ? void 0 : d.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : E`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${o ? E`<button
                      @click=${() => {
        const l = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: l });
      }}
                    >
                      Quitar
                    </button>` : de}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(o)}>Aplicar</button>
              </div>
            </div>`;
    })() : de}
      ${this._editing ? E`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(o) => this._editing = { ...this._editing, stereotype: o.target.value }}
            >
              ${Ki.map(
      (o) => E`<option value=${o} ?selected=${o === this._editing.stereotype}>${o}</option>`
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
          </div>` : de}
    `;
  }
};
pe.styles = xt`
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
  le({ attribute: !1 })
], pe.prototype, "page", 2);
ve([
  le({ type: Boolean, reflect: !0 })
], pe.prototype, "framed", 2);
ve([
  le({ attribute: !1 })
], pe.prototype, "models", 2);
ve([
  le({ attribute: !1 })
], pe.prototype, "mappings", 2);
ve([
  le({ attribute: !1 })
], pe.prototype, "useCases", 2);
ve([
  le({ attribute: !1 })
], pe.prototype, "queryOps", 2);
ve([
  le({ attribute: !1 })
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
  vt("modux-page-designer")
], pe);
var uc = Object.defineProperty, mc = Object.getOwnPropertyDescriptor, ze = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? mc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && uc(t, n, o), o;
};
const Do = 460, fc = 540, hc = 660;
let Me = class extends Ve {
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
        const a = this.pages.findIndex((l) => l.id === s), d = this.posOf(s, a);
        this.emit("element-selected", { elementType: "node", id: s, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: s, x: e.clientX, y: e.clientY, ox: d.x, oy: d.y, moved: !1 }, e.preventDefault();
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
    var g, h, f, y, w, c;
    const n = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), i = (h = n == null ? void 0 : n.closest) == null ? void 0 : h.call(n, ".frame");
    if (!i) return null;
    const o = i.dataset.pageId, s = i.querySelector("modux-page-designer"), a = (f = s == null ? void 0 : s.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), d = (y = a == null ? void 0 : a.closest) == null ? void 0 : y.call(a, "[data-btn-uc]");
    if (d != null && d.dataset.btnUc) return `btn:${o}:${d.dataset.btnUc}`;
    const l = (w = a == null ? void 0 : a.closest) == null ? void 0 : w.call(a, "[data-bar]");
    if (l != null && l.dataset.bar) return `bar:${o}:${l.dataset.bar}`;
    const u = (c = a == null ? void 0 : a.closest) == null ? void 0 : c.call(a, "[data-cmp-id]");
    return u ? `cmp:${o}:${u.dataset.cmpId}` : o;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var f, y, w, c;
    const n = (f = this.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), i = (y = n == null ? void 0 : n.closest) == null ? void 0 : y.call(n, ".frame");
    if (!i) return null;
    const o = i.dataset.pageId, s = i.querySelector("modux-page-designer"), a = (w = s == null ? void 0 : s.shadowRoot) == null ? void 0 : w.elementFromPoint(e, t), d = (c = a == null ? void 0 : a.closest) == null ? void 0 : c.call(a, "[data-cmp-id]");
    if (!d) return { pageId: o, componentId: null, pos: "into" };
    const l = d.dataset.cmpKind ?? "", u = d.getBoundingClientRect(), g = (t - u.top) / Math.max(1, u.height), h = pe.LEAF_KINDS.has(l) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: o, componentId: d.dataset.cmpId, pos: h };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: Do, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var n;
    return ((n = this._live) == null ? void 0 : n.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * fc, y: Math.floor(t / 3) * hc };
  }
  render() {
    return E`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var o, s;
      const n = ((o = this._live) == null ? void 0 : o.id) === e.id ? this._live : this.posOf(e.id, t), i = this.sizeOf(e.id);
      return E`
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
      width: ${Do}px;
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
  le({ attribute: !1 })
], Me.prototype, "pages", 2);
ze([
  le({ attribute: !1 })
], Me.prototype, "layout", 2);
ze([
  le({ attribute: !1 })
], Me.prototype, "sizes", 2);
ze([
  le({ attribute: !1 })
], Me.prototype, "selectedId", 2);
ze([
  le({ attribute: !1 })
], Me.prototype, "selectedIds", 2);
ze([
  le({ attribute: !1 })
], Me.prototype, "models", 2);
ze([
  le({ attribute: !1 })
], Me.prototype, "mappings", 2);
ze([
  le({ attribute: !1 })
], Me.prototype, "useCases", 2);
ze([
  le({ attribute: !1 })
], Me.prototype, "queryOps", 2);
ze([
  le({ attribute: !1 })
], Me.prototype, "selectedCmp", 2);
ze([
  q()
], Me.prototype, "_t", 2);
ze([
  q()
], Me.prototype, "_live", 2);
ze([
  q()
], Me.prototype, "_liveSize", 2);
Me = ze([
  vt("modux-figma")
], Me);
var gc = Object.defineProperty, yc = Object.getOwnPropertyDescriptor, Pe = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? yc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && gc(t, n, o), o;
};
const bc = {
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
}, qn = {
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
}, Ic = {
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
}, Xi = [30, 20, 13, 9.5, 7.5], Ji = [0, 180, 118, 80, 58], xc = 0.055, vc = 0.86, wc = 2600, pn = 240, Qi = 0.16, Zi = 0.015;
let ge = class extends Ve {
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
      sessionStorage.setItem(ge.STORE_KEY, JSON.stringify({
        cam: this.cam,
        nodes: e,
        levels: Object.fromEntries(this.manualLevels)
      }));
    } catch {
    }
  }
  loadState() {
    try {
      const e = sessionStorage.getItem(ge.STORE_KEY);
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
    const s = 70, a = this.clientWidth || 800, d = this.clientHeight || 600, l = i - t + s * 2, u = o - n + s * 2, g = Math.min(1.5, Math.max(0.25, Math.min(a / l, d / u)));
    this.cam.k = g, this.cam.x = a / 2 - (t + i) / 2 * g, this.cam.y = d / 2 - (n + o) / 2 * g;
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
    const s = `${(o == null ? void 0 : o.key) ?? ""}/${e}:${t}`, a = this.prevByKey.get(s), d = () => (Math.random() - 0.5) * 10;
    return {
      key: s,
      refId: t,
      kind: e,
      label: n,
      color: bc[e] ?? "#64748b",
      depth: i,
      parent: o,
      expanded: (a == null ? void 0 : a.expanded) ?? !1,
      x: (a == null ? void 0 : a.x) ?? (o ? o.x + d() : 0),
      y: (a == null ? void 0 : a.y) ?? (o ? o.y + d() : 0),
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
        const o = t.boundedContexts.find((u) => u.id === e.refId);
        if (!o) return [];
        const s = (t.aggregates ?? []).filter((u) => u.boundedContextId === e.refId), a = o.useCases ?? [], d = new Set(s.map((u) => u.id)), l = new Set(
          (t.emissions ?? []).filter((u) => d.has(u.sourceId)).map((u) => u.domainEventId)
        );
        return [
          ...s.length ? [i("group", `aggregates:${e.refId}`, `Agregados · ${s.length}`)] : [],
          ...a.length ? [i("group", `use-cases:${e.refId}`, `Casos de uso · ${a.length}`)] : [],
          ...(o.domainEvents ?? []).filter((u) => !l.has(u.id)).map((u) => i("domain-event", u.id, u.name)),
          ...(o.applicationEvents ?? []).map((u) => i("application-event", u.id, u.name)),
          ...(o.readModels ?? []).map((u) => i("read-model", u.id, u.name)),
          ...(o.domainServices ?? []).map((u) => i("domain-service", u.id, u.name)),
          ...(o.queryServices ?? []).map((u) => i("query-service", u.id, u.name)),
          ...(o.scheduledTriggers ?? []).map((u) => i("scheduled-trigger", u.id, u.name)),
          ...(t.etlFlows ?? []).filter((u) => u.ownerBoundedContextId === e.refId).map((u) => i("etl-flow", u.id, u.name)),
          ...(t.notifications ?? []).filter((u) => u.ownerBoundedContextId === e.refId).map((u) => i("notification", u.id, u.name)),
          ...(t.documents ?? []).filter((u) => u.ownerBoundedContextId === e.refId).map((u) => i("document", u.id, u.name))
        ];
      }
      case "group": {
        const o = e.refId.indexOf(":"), s = e.refId.slice(0, o), a = e.refId.slice(o + 1), d = t.boundedContexts.find((l) => l.id === a);
        return d ? s === "aggregates" ? (t.aggregates ?? []).filter((l) => l.boundedContextId === a).map((l) => i("aggregate", l.id, l.name)) : (d.useCases ?? []).map((l) => i(l.policy ? "policy" : "use-case", l.id, l.name)) : [];
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
        const o = (t.uiApps ?? []).find((d) => d.id === e.refId);
        if (!o) return [];
        const s = /* @__PURE__ */ new Set(), a = (d) => {
          for (const l of d ?? [])
            l.pageId && s.add(l.pageId), a(l.children);
        };
        a(o.menuItems);
        for (const d of [o.headerPageId, o.homePageId, o.viewPageId, o.editPageId])
          d && s.add(d);
        return [...s].map((d) => (t.pages ?? []).find((l) => l.id === d)).filter((d) => !!d).map((d) => i("page", d.id, d.name));
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
      for (let d = a; d; d = d.parent) t.add(d.key);
    }, i = (a) => {
      t.add(a.key);
      for (const d of a.children ?? []) i(d);
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
        const d = (Ji[Math.min(a.depth, Ji.length - 1)] ?? 60) + Math.min(60, ((((s = a.parent.children) == null ? void 0 : s.length) ?? 1) - 1) * 2.5);
        let l = a.x - a.parent.x, u = a.y - a.parent.y, g = Math.hypot(l, u);
        if (g < 0.01) {
          const w = Math.random() * Math.PI * 2;
          l = Math.cos(w) * 0.1, u = Math.sin(w) * 0.1, g = 0.1;
        }
        const h = xc * (g - d), f = l / g * h, y = u / g * h;
        a.vx -= f, a.vy -= y, a.parent.vx += f * 0.4, a.parent.vy += y * 0.4;
      } else
        a.vx -= a.x * Zi, a.vy -= a.y * Zi;
      !this.reducedMotion && this._motion > 0 && (a.vx += Math.sin(t * a.f1 * Math.PI * 2 + a.p1) * Qi * this._motion, a.vy += Math.cos(t * a.f2 * Math.PI * 2 + a.p2) * Qi * this._motion);
    }
    for (let a = 0; a < e.length; a++) {
      const d = e[a];
      for (let l = a + 1; l < e.length; l++) {
        const u = e[l], g = u.x - d.x, h = u.y - d.y;
        if (Math.abs(g) > pn || Math.abs(h) > pn) continue;
        const f = g * g + h * h;
        if (f > pn * pn || f < 0.01) continue;
        const y = Math.sqrt(f), w = d.depth <= 1 && u.depth <= 1 ? 3 : 1, c = wc * w / f, r = g / y * c, m = h / y * c;
        d.vx -= r, d.vy -= m, u.vx += r, u.vy += m;
      }
    }
    const n = this._motion, i = vc * n + 0.5 * (1 - n), o = (1 - n) * 0.7;
    for (const a of e) {
      if (a === this.dragNode) {
        a.vx = 0, a.vy = 0;
        continue;
      }
      a.vx *= i, a.vy *= i;
      const d = Math.hypot(a.vx, a.vy);
      if (d > 14 && (a.vx = a.vx / d * 14, a.vy = a.vy / d * 14), o > 0 && d < o) {
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
    return (Xi[Math.min(e.depth, Xi.length - 1)] ?? 7) * e.scale;
  }
  draw(e) {
    var a, d;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const n = this.clientWidth, i = this.clientHeight;
    t.clearRect(0, 0, n, i), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), this.drawAreas(t, e), t.lineWidth = 1.3 / this.cam.k;
    for (const l of e)
      l.parent && (t.strokeStyle = l.color + "55", t.beginPath(), t.moveTo(l.parent.x, l.parent.y), t.lineTo(l.x, l.y), t.stroke());
    const o = this.journeyTouchedIds(e), s = (l) => `${l}px system-ui, sans-serif`;
    for (const l of e) {
      o && (t.globalAlpha = o.has(l.refId) ? 1 : 0.22);
      const u = this.radiusOf(l);
      t.beginPath(), t.arc(l.x, l.y, u, 0, Math.PI * 2), t.fillStyle = l.kind === "note" ? "#fef9c3" : l.expanded ? l.color + "22" : "#ffffff", t.fill(), t.lineWidth = (l === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = l.color, t.stroke(), this.drawGlyph(t, l, u);
      const g = ((a = l.children) == null ? void 0 : a.length) ?? 0;
      if (!l.expanded && g > 0) {
        const f = Math.max(7, u * 0.42), y = l.x + u * 0.75, w = l.y + u * 0.75;
        t.beginPath(), t.arc(y, w, f, 0, Math.PI * 2), t.fillStyle = l.color, t.fill(), t.fillStyle = "#ffffff", t.font = s(f * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(g), y, w + 0.5);
      }
      if (l.depth <= 1 || l === this.hover || this.cam.k > 0.65) {
        const f = l.label.length > 22 ? l.label.slice(0, 21) + "…" : l.label;
        t.font = l === this.hover ? `600 ${s(12)}` : s(l.depth <= 1 ? 12 : 10.5), t.fillStyle = l === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(f, l.x, l.y + u + 4);
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
        const l = this.found.node, u = (this.found.until - this.t) / 3.2;
        t.save(), t.globalAlpha = Math.min(0.8, u * 1.6), t.strokeStyle = l.color, t.lineWidth = 2.2 / this.cam.k;
        const g = this.reducedMotion ? 0 : Math.sin(this.t * 5) * 3;
        t.beginPath(), t.arc(l.x, l.y, this.radiusOf(l) + 9 + g, 0, Math.PI * 2), t.stroke(), t.globalAlpha *= 0.4, t.beginPath(), t.arc(l.x, l.y, this.radiusOf(l) + 18 + g * 1.4, 0, Math.PI * 2), t.stroke(), t.restore();
      }
    if (t.globalAlpha = 1, this.drawNotes(t, e), this.journey && this.drawJourney(t, e), this._threads)
      for (const l of e) this.drawThreads(t, l, e);
    else this.hover && this.drawThreads(t, this.hover, e);
    if (this.hover && !this.hover.expanded && ((d = this.hover.children) != null && d.length) && this.drawGhosts(t, this.hover), this.linking) {
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
        const a = (t.x + s.x) / 2, d = (t.y + s.y) / 2, l = s.x - t.x, u = s.y - t.y, g = 0.18;
        e.strokeStyle = s.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(a - u * g, d + l * g, s.x, s.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(s.x, s.y, this.radiusOf(s) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
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
      const d = n.filter(
        (y) => y.kind !== "area" && !y.parentId && y.x - y.w / 2 >= a.x - a.w / 2 && y.x + y.w / 2 <= a.x + a.w / 2 && y.y - y.h / 2 >= a.y - a.h / 2 && y.y + y.h / 2 <= a.y + a.h / 2
      ), l = [];
      for (const y of d) {
        const w = this.visibleRepresentative(y.id, t);
        w && l.push({ x: w.x, y: w.y, r: this.radiusOf(w) + 16 });
      }
      if (!l.length) continue;
      const u = Math.min(...l.map((y) => y.x - y.r)), g = Math.max(...l.map((y) => y.x + y.r)), h = Math.min(...l.map((y) => y.y - y.r)), f = Math.max(...l.map((y) => y.y + y.r));
      this.areaHulls.set(a.id, { x: (u + g) / 2, y: (h + f) / 2 }), e.fillStyle = "rgba(148, 163, 184, 0.09)", e.strokeStyle = "#94a3b8", e.beginPath(), e.roundRect(u, h, g - u, f - h, 18 / o), e.fill(), e.stroke();
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
      const a = this.visibleRepresentative(s.sourceId, t), d = this.visibleRepresentative(s.targetId, t), l = d ?? this.areaHulls.get(s.targetId);
      if (!a || !l || d === a) continue;
      const u = l.x - a.x, g = l.y - a.y, h = Math.hypot(u, g) || 1, f = this.radiusOf(a), y = d ? this.radiusOf(d) : 0;
      e.beginPath(), e.moveTo(a.x + u / h * f, a.y + g / h * f), e.lineTo(l.x - u / h * y, l.y - g / h * y), e.stroke();
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
        const s = (i.x + o.x) / 2, a = (i.y + o.y) / 2, d = o.x - i.x, l = o.y - i.y, u = 0.14, g = s - l * u, h = a + d * u;
        e.strokeStyle = "#d97706", e.lineWidth = 2.4 / this.cam.k, e.setLineDash([9 / this.cam.k, 7 / this.cam.k]), e.beginPath(), e.moveTo(i.x, i.y), e.quadraticCurveTo(g, h, o.x, o.y), e.stroke(), e.setLineDash([]);
        const f = o.x - g, y = o.y - h, w = Math.hypot(f, y) || 1, c = f / w, r = y / w, m = this.radiusOf(o) + 4, v = o.x - c * m, $ = o.y - r * m, S = 9 / this.cam.k;
        e.fillStyle = "#d97706", e.beginPath(), e.moveTo(v, $), e.lineTo(v - c * S - r * S * 0.55, $ - r * S + c * S * 0.55), e.lineTo(v - c * S + r * S * 0.55, $ - r * S - c * S * 0.55), e.closePath(), e.fill();
        const T = s - l * u * 0.5, R = a + d * u * 0.5, L = 11 / this.cam.k;
        e.beginPath(), e.arc(T, R, L, 0, Math.PI * 2), e.fillStyle = "#d97706", e.fill(), e.fillStyle = "#ffffff", e.font = `bold ${12 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle", e.fillText(n.num, T, R);
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
    var w, c, r;
    if (!((c = (w = this.journey) == null ? void 0 : w.runs) != null && c.length)) {
      this.runnerState = null, this.runnerFx = [];
      return;
    }
    const n = new Map(this.journey.legs.map((m) => [m.id, m])), i = this.journey.runs.map(
      (m) => m.map((v) => n.get(v)).filter((v) => !!v).map((v) => this.legGeometry(v, t)).filter((v) => !!v)
    ).filter((m) => m.length > 0);
    if (!i.length) {
      this.runnerState = null, this.runnerFx = [];
      return;
    }
    const o = 170, s = 0.5, a = Math.max(0, Math.min(0.1, this.t - this.runnerLastClock));
    this.runnerLastClock = this.t;
    let d = this.runnerState;
    if ((!d || d.run >= i.length) && (d = this.runnerState = { run: 0, leg: 0, t: 0, pause: 0 }, this.runnerFx.push({ x: i[0][0].a.x, y: i[0][0].a.y, at: this.t, kind: "start" })), this.drawRunnerFx(e), d.pause > 0) {
      d.pause -= a, d.pause <= 0 && ((r = i[d.run]) != null && r[0]) && this.runnerFx.push({ x: i[d.run][0].a.x, y: i[d.run][0].a.y, at: this.t, kind: "start" });
      return;
    }
    d.leg >= i[d.run].length && (d.leg = i[d.run].length - 1);
    let l = i[d.run][d.leg];
    const u = (m) => Math.max(24, Math.hypot(m.b.x - m.a.x, m.b.y - m.a.y));
    for (d.t += a * o / u(l); d.t >= 1; ) {
      if (d.t -= 1, d.leg++, d.leg >= i[d.run].length) {
        const m = i[d.run];
        this.runnerFx.push({ x: m[m.length - 1].b.x, y: m[m.length - 1].b.y, at: this.t, kind: "end" }), d.run = (d.run + 1) % i.length, d.leg = 0, d.t = 0, d.pause = s;
        return;
      }
      l = i[d.run][d.leg], d.t = d.t * 1;
    }
    const g = d.t, h = 1 - g, f = h * h * l.a.x + 2 * h * g * l.cx + g * g * l.b.x, y = h * h * l.a.y + 2 * h * g * l.cy + g * g * l.b.y;
    e.save(), e.beginPath(), e.arc(f, y, 7 / this.cam.k, 0, Math.PI * 2), e.fillStyle = "#d97706", e.fill(), e.lineWidth = 2 / this.cam.k, e.strokeStyle = "#ffffff", e.stroke(), e.restore();
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
    const a = this.radiusOf(t) + 24, d = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, l = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = o, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, i.forEach((u, g) => {
      const h = d - l / 2 + l * (g + 0.5) / i.length, f = this.reducedMotion ? 0 : Math.sin(this.t * u.f1 * Math.PI * 2 + u.p1) * 1.8, y = t.x + Math.cos(h) * (a + f), w = t.y + Math.sin(h) * (a + f);
      e.beginPath(), e.arc(y, w, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = u.color, e.stroke();
    }), n.length > i.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const u = d + l / 2 + 0.35;
      e.fillText(`+${n.length - i.length}`, t.x + Math.cos(u) * a, t.y + Math.sin(u) * a);
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
        for (const [a, d] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(o + a * i + i * 0.3, s + d * i), e.arc(o + a * i, s + d * i, i * 0.3, 0, Math.PI * 2);
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
          const d = a * Math.PI / 3;
          e.moveTo(o + Math.cos(d) * i * 0.55, s + Math.sin(d) * i * 0.55), e.lineTo(o + Math.cos(d) * i, s + Math.sin(d) * i);
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
          const d = a * Math.PI / 2 + Math.PI / 4;
          e.moveTo(o, s), e.lineTo(o + Math.cos(d) * i, s + Math.sin(d) * i), e.moveTo(o, s), e.lineTo(o + Math.cos(d + Math.PI / 4) * i * 0.5, s + Math.sin(d + Math.PI / 4) * i * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(o - i * 0.45, s + i * 0.15, i * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(o + i * 0.1, s - i * 0.35, i * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(o + i * 0.55, s + i * 0.2, i * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [a, d] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(o + a * i, s + d * i, i * 0.85, i * 0.85);
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
    var L, V;
    const o = (t.children ?? []).flatMap(
      (H) => H.kind === "group" ? H.children ?? (H.children = this.childrenOf(H)) : [H]
    ), s = /* @__PURE__ */ new Map();
    for (const H of o) s.set(H.kind, (s.get(H.kind) ?? 0) + 1);
    const a = [];
    for (const [H, ae] of s)
      if (a.push(`${ae} ${ae === 1 ? (qn[H] ?? H).toLowerCase() : Ic[H] ?? H}`), a.length === 4) {
        const C = [...s.keys()].length - 4;
        C > 0 && (a[3] += ` (+${C} tipos más)`);
        break;
      }
    const d = o.slice(0, 6).map((H) => ({ label: H.label.length > 30 ? H.label.slice(0, 29) + "…" : H.label, color: H.color })), l = o.length - d.length, u = t.label, g = qn[t.kind] ?? t.kind, h = ((L = t.children) != null && L.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((V = t.children) != null && V.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const f = e.measureText(u).width;
    e.font = "11px system-ui, sans-serif";
    const y = Math.max(
      e.measureText(g).width,
      ...a.map((H) => e.measureText(H).width),
      ...d.map((H) => e.measureText(H.label).width + 12),
      e.measureText(h).width
    ), w = Math.min(300, Math.max(f, y) + 24), c = d.length ? 8 + d.length * 15 + (l > 0 ? 15 : 0) : 0, r = 40 + a.length * 15 + c + (h ? 18 : 0), m = this.radiusOf(t) * this.cam.k, v = this.cam.x + t.x * this.cam.k, $ = this.cam.y + t.y * this.cam.k;
    let S = v + m + 14;
    S + w > n - 8 && (S = v - m - 14 - w), S = Math.max(8, Math.min(S, n - w - 8));
    const T = Math.max(8, Math.min($ - 10, i - r - 8));
    e.translate(S, T), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, w, r, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(u, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(g, 12, 25), e.fillStyle = "#475569", a.forEach((H, ae) => e.fillText(H, 12, 41 + ae * 15));
    let R = 41 + a.length * 15 + (d.length ? 8 : 0);
    d.forEach((H) => {
      e.fillStyle = H.color, e.beginPath(), e.arc(15, R + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(H.label, 24, R), R += 15;
    }), l > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${l} más`, 24, R)), h && (e.fillStyle = "#94a3b8", e.fillText(h, 12, r - 16)), e.restore();
  }
  // ── Search & fly ──────────────────────────────────────────────────────
  static fold(e) {
    return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  onSearchInput(e) {
    this._q = e.target.value;
    const t = ge.fold(this._q.trim());
    this._active = 0, this._sugs = t.length < 2 ? [] : this.allNodes.filter((n) => n.kind !== "root" && ge.fold(n.label).includes(t)).slice(0, 8);
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
        const i = Math.min(n.ax, n.bx), o = Math.max(n.ax, n.bx), s = Math.min(n.ay, n.by), a = Math.max(n.ay, n.by), d = this.visible().filter((l) => l.kind !== "root" && l.kind !== "group" && l.refId).filter((l) => l.x >= i && l.x <= o && l.y >= s && l.y <= a).map((l) => l.key);
        this.selected = new Set(n.additive ? [...this.selected, ...d] : d);
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
        const d = n - i / 2 + i * (a + 0.5) / o.length;
        s.x = e.x + Math.cos(d) * 6, s.y = e.y + Math.sin(d) * 6, s.vx = Math.cos(d) * 7, s.vy = Math.sin(d) * 7, s.children || (s.children = this.childrenOf(s));
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
    return E`
      <canvas
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @dblclick=${this.onDblClick}
        @wheel=${this.onWheel}
      ></canvas>
      ${this.renaming ? E`<input
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
        ${this._sugs.length ? E`<ul class="sugs">
              ${this._sugs.map(
      (e, t) => E`<li
                  class=${t === this._active ? "active" : ""}
                  @mouseenter=${() => this._active = t}
                  @click=${() => this.flyToNode(e)}
                >
                  <span class="dot" style="background:${e.color}"></span>
                  <span class="name">${e.label}</span>
                  <span class="path">${this.pathOf(e) || (qn[e.kind] ?? e.kind)}</span>
                </li>`
    )}
            </ul>` : this._q.trim().length >= 2 ? E`<ul class="sugs"><li class="empty">sin resultados</li></ul>` : null}
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
        click: seleccionar y expandir / plegar · alt+click: aislar lo relacionado · doble click: abrir<br />
        shift+arrastrar desde un nodo: trazar una relación · arrastrar en el fondo: selección<br />
        espacio+arrastrar: mover el lienzo · rueda: zoom · Supr borra · F2 renombra · Ctrl+Z deshace<br />
        buscar: expande el camino y vuela hasta el nodo · arrastrar nodo: tirar del subárbol
      </div>
    `;
  }
};
ge.styles = xt`
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
ge.STORE_KEY = "modux-explorer-state";
Pe([
  le({ type: Boolean, reflect: !0 })
], ge.prototype, "shifted", 2);
Pe([
  le({ attribute: !1 })
], ge.prototype, "scene", 2);
Pe([
  le({ attribute: !1 })
], ge.prototype, "journey", 2);
Pe([
  le({ attribute: !1 })
], ge.prototype, "model", 2);
Pe([
  q()
], ge.prototype, "_q", 2);
Pe([
  q()
], ge.prototype, "_sugs", 2);
Pe([
  q()
], ge.prototype, "_active", 2);
Pe([
  q()
], ge.prototype, "_motion", 2);
Pe([
  q()
], ge.prototype, "_threads", 2);
Pe([
  q()
], ge.prototype, "_viewNaming", 2);
Pe([
  q()
], ge.prototype, "_viewName", 2);
Pe([
  q()
], ge.prototype, "selected", 2);
Pe([
  q()
], ge.prototype, "_levels", 2);
Pe([
  le()
], ge.prototype, "sceneKey", 2);
Pe([
  q()
], ge.prototype, "renaming", 2);
ge = Pe([
  vt("modux-explorer")
], ge);
function kc(e, t) {
  var n, i, o, s, a, d, l, u, g, h, f, y, w;
  switch (t.kind) {
    case "add-relation":
      return [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-relation": {
      const c = e.model.relations.find(
        (r) => r.sourceId === t.sourceId && r.targetId === t.targetId
      );
      return c && c.type ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: c.type }] : null;
    }
    case "set-relation-type": {
      const c = e.model.relations.find(
        (r) => r.sourceId === t.sourceId && r.targetId === t.targetId
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
      const c = (e.model.uiApps ?? []).find((r) => r.id === t.appId);
      return [{ kind: "set-app-header-page", appId: t.appId, pageId: (c == null ? void 0 : c.headerPageId) ?? null }];
    }
    case "set-app-model": {
      const c = (e.model.uiApps ?? []).find((r) => r.id === t.appId);
      return [{ kind: "set-app-model", appId: t.appId, modelId: (c == null ? void 0 : c.modelId) ?? null }];
    }
    case "add-model":
      return [{ kind: "remove-model", id: t.id }];
    case "add-model-mapping":
      return [{ kind: "remove-model-mapping", id: t.id }];
    case "remove-model-mapping": {
      const c = (e.model.modelMappings ?? []).find((r) => r.id === t.id);
      return !(c != null && c.sourceModelId) || !c.targetModelId ? null : [{
        kind: "add-model-mapping",
        id: c.id,
        name: c.name,
        sourceId: c.sourceModelId,
        targetId: c.targetModelId
      }];
    }
    case "remove-model": {
      const c = (e.model.models ?? []).find((m) => m.id === t.id);
      if (!c) return null;
      const r = [{ kind: "add-model", id: c.id, name: c.name }];
      for (const m of e.model.pages ?? []) {
        m.modelId === t.id && r.push({ kind: "set-page-model", pageId: m.id, modelId: t.id });
        const v = ($) => {
          for (const S of $ ?? [])
            S.modelId === t.id && r.push({ kind: "set-page-component", pageId: m.id, componentId: S.id, modelId: t.id }), v(S.children);
        };
        v(m.content);
      }
      for (const m of e.model.uiApps ?? [])
        m.modelId === t.id && r.push({ kind: "set-app-model", appId: m.id, modelId: t.id });
      return r;
    }
    case "set-crud-detail":
    case "set-crud-create": {
      const c = (e.model.pages ?? []).find((m) => m.id === t.pageId), r = t.kind === "set-crud-detail";
      return [{
        kind: t.kind,
        pageId: t.pageId,
        targetId: (r ? c == null ? void 0 : c.crudDetailPageId : c == null ? void 0 : c.crudCreatePageId) ?? null,
        toAppId: (r ? c == null ? void 0 : c.crudDetailAppId : c == null ? void 0 : c.crudCreateAppId) ?? null
      }];
    }
    case "set-app-view-page": {
      const c = (e.model.uiApps ?? []).find((r) => r.id === t.appId);
      return [{ kind: "set-app-view-page", appId: t.appId, pageId: (c == null ? void 0 : c.viewPageId) ?? null }];
    }
    case "set-app-edit-page": {
      const c = (e.model.uiApps ?? []).find((r) => r.id === t.appId);
      return [{ kind: "set-app-edit-page", appId: t.appId, pageId: (c == null ? void 0 : c.editPageId) ?? null }];
    }
    case "set-app-home-page": {
      const c = (e.model.uiApps ?? []).find((r) => r.id === t.appId);
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
      const c = (((n = (e.model.pages ?? []).find((r) => r.id === t.pageId)) == null ? void 0 : n.wizardSteps) ?? []).find((r) => (r.id ?? r.pageId) === t.itemId);
      return c ? [{ kind: "set-wizard-step-page", pageId: t.pageId, itemId: t.itemId, targetId: c.pageId ?? null }] : null;
    }
    case "move-page-wizard-step": {
      const c = (((i = (e.model.pages ?? []).find((m) => m.id === t.pageId)) == null ? void 0 : i.wizardSteps) ?? []).map((m) => m.id ?? m.pageId), r = c.indexOf(t.targetId);
      return r < 0 ? null : [{
        kind: "move-page-wizard-step",
        pageId: t.pageId,
        targetId: t.targetId,
        beforeItemId: c[r + 1] ?? null
      }];
    }
    case "remove-page-wizard-step": {
      const c = (((o = (e.model.pages ?? []).find((r) => r.id === t.pageId)) == null ? void 0 : o.wizardSteps) ?? []).find((r) => (r.id ?? r.pageId) === t.targetId);
      return c ? [{
        kind: "add-page-wizard-step",
        pageId: t.pageId,
        targetId: c.pageId ?? null,
        label: c.label,
        itemId: c.id
      }] : null;
    }
    case "delete-ui-app": {
      const c = (e.model.uiApps ?? []).find((v) => v.id === t.id);
      if (!c) return null;
      const r = [{ kind: "create-ui-app", id: c.id, name: c.name, type: c.type }];
      c.headerPageId && r.push({ kind: "set-app-header-page", appId: c.id, pageId: c.headerPageId }), c.modelId && r.push({ kind: "set-app-model", appId: c.id, modelId: c.modelId }), c.viewPageId && r.push({ kind: "set-app-view-page", appId: c.id, pageId: c.viewPageId }), c.editPageId && r.push({ kind: "set-app-edit-page", appId: c.id, pageId: c.editPageId }), (c.homePageId || c.homeAppId) && r.push({
        kind: "set-app-home-page",
        appId: c.id,
        pageId: c.homePageId ?? null,
        toAppId: c.homeAppId ?? null
      });
      const m = (v, $) => {
        for (const S of v ?? [])
          r.push({
            kind: "add-menu-item",
            appId: c.id,
            label: S.label,
            itemId: S.id,
            parentId: $ == null ? void 0 : $.id,
            parentLabel: $ && !$.id ? $.label : void 0,
            pageId: S.pageId ?? null
          }), S.uiAdapterId && r.push({ kind: "set-menu-app", appId: c.id, toAppId: S.uiAdapterId, itemId: S.id, label: S.label }), S.useCaseId && r.push({ kind: "set-menu-use-case", appId: c.id, useCaseId: S.useCaseId, itemId: S.id, label: S.label }), S.aggregateId && r.push({ kind: "set-menu-aggregate", appId: c.id, aggregateId: S.aggregateId, itemId: S.id, label: S.label }), S.queryOperationId && r.push({
            kind: "set-menu-query-operation",
            appId: c.id,
            queryServiceId: S.queryServiceId ?? null,
            queryOperationId: S.queryOperationId,
            itemId: S.id,
            label: S.label
          }), m(S.children, S);
      };
      m(c.menuItems);
      for (const v of e.model.actorAppUses ?? [])
        v.appId === t.id && r.push({ kind: "add-actor-app", actorId: v.actorId, appId: t.id });
      return r;
    }
    case "delete-ui-page": {
      const c = (e.model.pages ?? []).find((m) => m.id === t.id);
      if (!c) return null;
      const r = [
        { kind: "create-ui-page", id: c.id, name: c.name, pageType: c.type ?? "FORM" }
      ];
      c.route && r.push({ kind: "set-page-route", pageId: c.id, path: c.route }), c.modelId && r.push({ kind: "set-page-model", pageId: c.id, modelId: c.modelId }), c.listingQueryServiceId && r.push({ kind: "set-page-listing", pageId: c.id, queryServiceId: c.listingQueryServiceId });
      for (const m of c.buttons ?? [])
        m.useCaseId && (r.push({ kind: "add-page-button", pageId: c.id, useCaseId: m.useCaseId, label: m.label }), m.mappingId && r.push({
          kind: "set-page-button",
          pageId: c.id,
          useCaseId: m.useCaseId,
          label: m.label ?? null,
          mappingId: m.mappingId
        }));
      for (const m of c.viewmodelFields ?? [])
        (m.stereotype || m.colspan || m.label) && r.push({
          kind: "set-page-field-config",
          pageId: c.id,
          fieldId: m.fieldId,
          stereotype: m.stereotype ?? null,
          colspan: m.colspan ?? null,
          label: m.label ?? null
        });
      (c.viewmodelFields ?? []).length && r.push({
        kind: "set-page-field-order",
        pageId: c.id,
        fieldIds: (c.viewmodelFields ?? []).map((m) => m.fieldId)
      });
      for (const m of c.content ?? [])
        r.push(...e.rebuildComponentOps(c.id, m, void 0, null).ops);
      for (const m of c.wizardSteps ?? [])
        r.push({
          kind: "add-page-wizard-step",
          pageId: c.id,
          targetId: m.pageId ?? null,
          label: m.label,
          itemId: m.id
        });
      return (c.crudDetailPageId || c.crudDetailAppId) && r.push({ kind: "set-crud-detail", pageId: c.id, targetId: c.crudDetailPageId ?? null, toAppId: c.crudDetailAppId ?? null }), (c.crudCreatePageId || c.crudCreateAppId) && r.push({ kind: "set-crud-create", pageId: c.id, targetId: c.crudCreatePageId ?? null, toAppId: c.crudCreateAppId ?? null }), r;
    }
    case "add-menu-item":
      return [{ kind: "remove-menu-item", appId: t.appId, itemId: t.itemId, label: t.label }];
    case "remove-menu-item":
    case "set-menu-page":
    case "set-menu-app":
    case "set-menu-use-case":
    case "set-menu-aggregate":
    case "set-menu-query-operation": {
      const c = (e.model.uiApps ?? []).find((v) => v.id === t.appId), r = (v) => {
        for (const $ of v ?? []) {
          if (t.itemId ? $.id === t.itemId : $.label === t.label) return $;
          const S = r($.children);
          if (S) return S;
        }
        return null;
      }, m = t.itemId || t.label ? r(c == null ? void 0 : c.menuItems) : null;
      return m ? t.kind === "remove-menu-item" ? [{
        kind: "add-menu-item",
        appId: t.appId,
        label: m.label,
        pageId: m.pageId ?? null,
        itemId: m.id
      }] : t.kind === "set-menu-app" ? [{
        kind: "set-menu-app",
        appId: t.appId,
        toAppId: m.uiAdapterId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-use-case" ? [{
        kind: "set-menu-use-case",
        appId: t.appId,
        useCaseId: m.useCaseId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-aggregate" ? [{
        kind: "set-menu-aggregate",
        appId: t.appId,
        aggregateId: m.aggregateId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-query-operation" ? [{
        kind: "set-menu-query-operation",
        appId: t.appId,
        queryServiceId: m.queryServiceId ?? null,
        queryOperationId: m.queryOperationId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : [{
        kind: "set-menu-page",
        appId: t.appId,
        pageId: m.pageId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : null;
    }
    case "add-page-button":
      return [{ kind: "remove-page-button", pageId: t.pageId, useCaseId: t.useCaseId }];
    case "remove-page-button": {
      const c = (e.model.pages ?? []).find((m) => m.id === t.pageId), r = ((c == null ? void 0 : c.buttons) ?? []).find((m) => m.useCaseId === t.useCaseId);
      return r ? [{ kind: "add-page-button", pageId: t.pageId, useCaseId: t.useCaseId, label: r.label }] : null;
    }
    case "rename-ui-page": {
      const c = (e.model.pages ?? []).find((r) => r.id === t.pageId);
      return c ? [{ kind: "rename-ui-page", pageId: t.pageId, name: c.name }] : null;
    }
    case "set-page-type": {
      const c = (e.model.pages ?? []).find((r) => r.id === t.pageId);
      return c ? [{ kind: "set-page-type", pageId: t.pageId, pageType: c.type ?? "FORM" }] : null;
    }
    case "set-page-route": {
      const c = (e.model.pages ?? []).find((r) => r.id === t.pageId);
      return c != null && c.route ? [{ kind: "set-page-route", pageId: t.pageId, path: c.route }] : null;
    }
    case "set-page-button": {
      const c = (e.model.pages ?? []).find((m) => m.id === t.pageId), r = ((c == null ? void 0 : c.buttons) ?? []).find((m) => m.useCaseId === t.useCaseId);
      return r ? [{
        kind: "set-page-button",
        pageId: t.pageId,
        useCaseId: t.useCaseId,
        label: r.label ?? null,
        mappingId: r.mappingId ?? null
      }] : null;
    }
    case "add-page-component":
      return [{ kind: "remove-page-component", pageId: t.pageId, componentId: t.componentId }];
    case "set-page-component":
    case "remove-page-component":
    case "move-page-component": {
      const c = (e.model.pages ?? []).find((T) => T.id === t.pageId);
      let r = null, m = null, v = null;
      const $ = (T, R) => {
        var V;
        const L = T ?? [];
        for (let H = 0; H < L.length; H++)
          L[H].id === t.componentId && (r = L[H], m = R, v = ((V = L[H + 1]) == null ? void 0 : V.id) ?? null), $(L[H].children, L[H]);
      };
      if ($(c == null ? void 0 : c.content, null), !r) return null;
      const S = r;
      return t.kind === "set-page-component" ? [{
        kind: "set-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        title: S.title ?? null,
        text: S.text ?? null,
        label: S.label ?? null,
        useCaseId: S.useCaseId ?? null,
        mappingId: S.mappingId ?? null,
        modelId: S.modelId ?? null,
        queryServiceId: S.queryServiceId ?? null,
        queryOperationId: S.queryOperationId ?? null,
        fieldId: S.fieldId ?? null,
        stereotype: S.stereotype ?? null,
        colspan: S.colspan ?? null
      }] : t.kind === "move-page-component" ? [{
        kind: "move-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        parentComponentId: m === null ? null : m.id,
        beforeComponentId: v
      }] : e.rebuildComponentOps(
        t.pageId,
        S,
        m === null ? void 0 : m.id,
        v
      ).ops;
    }
    case "set-page-listing": {
      const c = (e.model.pages ?? []).find((r) => r.id === t.pageId);
      return [{ kind: "set-page-listing", pageId: t.pageId, queryServiceId: (c == null ? void 0 : c.listingQueryServiceId) ?? null }];
    }
    case "set-page-model": {
      const c = (e.model.pages ?? []).find((r) => r.id === t.pageId);
      return [{ kind: "set-page-model", pageId: t.pageId, modelId: (c == null ? void 0 : c.modelId) ?? null }];
    }
    case "set-page-field-config": {
      const c = (((s = (e.model.pages ?? []).find((r) => r.id === t.pageId)) == null ? void 0 : s.viewmodelFields) ?? []).find((r) => r.fieldId === t.fieldId);
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
      const c = (((a = (e.model.pages ?? []).find((r) => r.id === t.pageId)) == null ? void 0 : a.viewmodelFields) ?? []).map((r) => r.fieldId);
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
      const c = e.model.boundedContexts.find((m) => m.id === t.id);
      if (!c) return null;
      const r = e.model.relations.filter(
        (m) => (m.sourceId === t.id || m.targetId === t.id) && m.type != null
      );
      return [
        { kind: "add-boundedContext", id: c.id, name: c.name, subdomainType: c.subdomainType ?? "GENERIC" },
        // Re-annotate the derived pairs this boundedContext participated in.
        ...r.map(
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
      return [{ kind: "remove-aggregate", id: t.id }];
    case "remove-aggregate": {
      const c = (e.model.aggregates ?? []).find((r) => r.id === t.id);
      return c ? [{ kind: "add-aggregate", id: c.id, name: c.name, boundedContextId: c.boundedContextId }] : null;
    }
    case "add-domain-event":
      return [{ kind: "remove-domain-event", id: t.id }];
    case "add-query-service":
      return [{ kind: "remove-query-service", id: t.id }];
    case "remove-query-service": {
      for (const c of e.model.boundedContexts) {
        const r = (c.queryServices ?? []).find((m) => m.id === t.id);
        if (r) return [{ kind: "add-query-service", id: r.id, name: r.name, boundedContextId: c.id }];
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
        (r) => r.sourceId === t.sourceId && r.targetId === t.targetId
      );
      return c ? [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: c.type }] : [{ kind: "remove-external-dependency", sourceId: t.sourceId, targetId: t.targetId }];
    }
    case "remove-external-dependency": {
      const c = (e.model.externalSystemDependencies ?? []).find(
        (r) => r.sourceId === t.sourceId && r.targetId === t.targetId
      );
      return [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: c == null ? void 0 : c.type }];
    }
    case "add-proxy-api":
      return [{ kind: "remove-proxy-api", id: t.id }];
    case "remove-proxy-api": {
      const c = (e.model.proxyApis ?? []).find((r) => r.id === t.id);
      return c ? [{
        kind: "add-proxy-api",
        id: c.id,
        name: c.name,
        targetId: c.targetApiId,
        boundedContextId: c.publishedByExternalSystemId
      }] : null;
    }
    case "set-proxy-target": {
      const c = (e.model.proxyApis ?? []).find((r) => r.id === t.id);
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
        (r) => r.apiId === t.apiId && r.operationId === t.operationId && r.boundedContextId === t.boundedContextId
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
        (r) => r.apiId === t.apiId && r.operationId === t.operationId && r.boundedContextId === t.boundedContextId
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
      const c = (e.model.apis ?? []).find((r) => r.id === t.id) ?? (e.model.proxyApis ?? []).find((r) => r.id === t.id);
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
        const r = (c.useCases ?? []).find((m) => m.id === t.id);
        if (r)
          return [
            { kind: "add-use-case", id: r.id, name: r.name, boundedContextId: c.id, policy: r.policy }
          ];
      }
      return null;
    }
    case "add-external-use-case":
      return [{ kind: "remove-external-use-case", id: t.id }];
    case "remove-external-use-case": {
      for (const c of e.model.externalSystems) {
        const r = (c.useCases ?? []).find((m) => m.id === t.id);
        if (r)
          return [{ kind: "add-external-use-case", id: r.id, name: r.name, boundedContextId: c.id }];
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
      const c = (e.model.notifications ?? []).find((m) => m.id === t.id);
      if (!(c != null && c.ownerBoundedContextId)) return null;
      const r = [
        { kind: "add-notification", id: c.id, name: c.name, boundedContextId: c.ownerBoundedContextId, type: (c.channels ?? [])[0] }
      ];
      c.eventId && r.push({ kind: "set-notification-event", id: c.id, targetId: c.eventId });
      for (const m of c.recipientRoleIds ?? []) r.push({ kind: "add-notification-recipient", id: c.id, roleId: m });
      return r;
    }
    case "set-notification-event": {
      const c = (e.model.notifications ?? []).find((r) => r.id === t.id);
      return [{ kind: "set-notification-event", id: t.id, targetId: (c == null ? void 0 : c.eventId) ?? null }];
    }
    case "add-notification-recipient":
      return [{ kind: "remove-notification-recipient", id: t.id, roleId: t.roleId }];
    case "remove-notification-recipient":
      return [{ kind: "add-notification-recipient", id: t.id, roleId: t.roleId }];
    case "add-document":
      return [{ kind: "remove-document", id: t.id }];
    case "remove-document": {
      const c = (e.model.documents ?? []).find((m) => m.id === t.id);
      if (!(c != null && c.ownerBoundedContextId)) return null;
      const r = [
        { kind: "add-document", id: c.id, name: c.name, boundedContextId: c.ownerBoundedContextId, type: c.kind }
      ];
      return c.modelId && r.push({ kind: "set-document-model", id: c.id, modelId: c.modelId }), c.queryServiceId && r.push({ kind: "set-document-query", id: c.id, queryServiceId: c.queryServiceId, queryOperationId: c.queryOperationId ?? null }), r;
    }
    case "set-document-model": {
      const c = (e.model.documents ?? []).find((r) => r.id === t.id);
      return [{ kind: "set-document-model", id: t.id, modelId: (c == null ? void 0 : c.modelId) ?? null }];
    }
    case "set-document-query": {
      const c = (e.model.documents ?? []).find((r) => r.id === t.id);
      return [{ kind: "set-document-query", id: t.id, queryServiceId: (c == null ? void 0 : c.queryServiceId) ?? null, queryOperationId: (c == null ? void 0 : c.queryOperationId) ?? null }];
    }
    case "add-identity-provider":
      return [{ kind: "remove-identity-provider", id: t.id }];
    case "remove-identity-provider": {
      const c = (e.model.identityProviders ?? []).find((m) => m.id === t.id);
      if (!c) return null;
      const r = [
        { kind: "add-identity-provider", id: c.id, name: c.name, type: c.type }
      ];
      c.publishedByExternalSystemId && r.push({ kind: "set-idp-publisher", id: c.id, targetId: c.publishedByExternalSystemId });
      for (const m of e.model.boundedContexts)
        m.identityProviderId === t.id && r.push({ kind: "set-identity-provider", id: m.id, targetId: t.id });
      for (const m of e.model.uiApps ?? [])
        m.identityProviderId === t.id && r.push({ kind: "set-identity-provider", id: m.id, targetId: t.id });
      for (const m of e.model.etlFlows ?? [])
        m.identityProviderId === t.id && r.push({ kind: "set-identity-provider", id: m.id, targetId: t.id });
      return r;
    }
    case "set-idp-publisher": {
      const c = (e.model.identityProviders ?? []).find((r) => r.id === t.id);
      return [{ kind: "set-idp-publisher", id: t.id, targetId: (c == null ? void 0 : c.publishedByExternalSystemId) ?? null }];
    }
    case "set-identity-provider": {
      const c = ((d = e.model.boundedContexts.find((r) => r.id === t.id)) == null ? void 0 : d.identityProviderId) ?? ((l = (e.model.uiApps ?? []).find((r) => r.id === t.id)) == null ? void 0 : l.identityProviderId) ?? ((u = (e.model.etlFlows ?? []).find((r) => r.id === t.id)) == null ? void 0 : u.identityProviderId) ?? null;
      return [{ kind: "set-identity-provider", id: t.id, targetId: c }];
    }
    case "add-etl-flow":
      return [{ kind: "remove-etl-flow", id: t.id }];
    case "remove-etl-flow": {
      const c = (e.model.etlFlows ?? []).find((r) => r.id === t.id);
      return !c || !c.ownerBoundedContextId ? null : [
        { kind: "add-etl-flow", id: c.id, name: c.name, boundedContextId: c.ownerBoundedContextId },
        ...(c.steps ?? []).map((r) => ({
          kind: "add-etl-step",
          etlFlowId: c.id,
          id: r.id,
          name: r.name,
          stepType: r.type,
          externalTableId: r.externalTableId,
          apiId: r.apiId,
          operationId: r.operationId,
          targetId: r.eventId,
          mappingId: r.mappingId
        }))
      ];
    }
    case "add-etl-step":
      return [{ kind: "remove-etl-step", etlFlowId: t.etlFlowId, id: t.id }];
    case "remove-etl-step": {
      const c = (((g = (e.model.etlFlows ?? []).find((r) => r.id === t.etlFlowId)) == null ? void 0 : g.steps) ?? []).find((r) => r.id === t.id);
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
        (m) => (m.scheduledTriggers ?? []).some((v) => v.id === t.id)
      ), r = ((c == null ? void 0 : c.scheduledTriggers) ?? []).find((m) => m.id === t.id);
      return !c || !r ? null : [{
        kind: "add-scheduled-trigger",
        id: r.id,
        name: r.name,
        boundedContextId: c.id,
        cronExpression: r.cronExpression,
        targetUseCaseId: r.useCaseId
      }];
    }
    case "set-scheduled-trigger-target": {
      const c = e.model.boundedContexts.flatMap((r) => r.scheduledTriggers ?? []).find((r) => r.id === t.id);
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
      const c = e.model.externalSystems.find((r) => r.id === t.id);
      return c ? [{ kind: "add-external-system", id: c.id, name: c.name }] : null;
    }
    case "add-ai-agent":
      return [{ kind: "remove-ai-agent", id: t.id }];
    case "remove-ai-agent": {
      const c = (e.model.aiAgents ?? []).find((r) => r.id === t.id);
      return c ? [
        { kind: "add-ai-agent", id: c.id, name: c.name, external: c.external },
        ...(e.model.agentUses ?? []).filter((r) => r.agentId === t.id).map((r) => ({ kind: "add-agent-use", sourceId: t.id, targetId: r.useCaseId })),
        ...(e.model.agentExternalUses ?? []).filter((r) => r.agentId === t.id).map((r) => ({
          kind: "add-agent-external-use",
          sourceId: t.id,
          targetId: r.externalUseCaseId
        })),
        ...(e.model.agentMcpUses ?? []).filter((r) => r.agentId === t.id).map((r) => ({ kind: "add-agent-mcp", sourceId: t.id, targetId: r.mcpServerId })),
        ...(e.model.agentGatewayUses ?? []).filter((r) => r.agentId === t.id).map((r) => ({ kind: "add-agent-gateway", sourceId: t.id, targetId: r.gatewayId })),
        ...(e.model.agentApiOpUses ?? []).filter((r) => r.agentId === t.id).map((r) => ({
          kind: "add-agent-api-operation",
          sourceId: t.id,
          targetId: r.apiOperationId
        })),
        ...(e.model.agentQueryUses ?? []).filter((r) => r.agentId === t.id).map((r) => ({ kind: "add-agent-query", sourceId: t.id, targetId: r.queryServiceId })),
        ...(e.model.agentRags ?? []).filter((r) => r.agentId === t.id).map((r) => ({ kind: "add-agent-rag", sourceId: t.id, targetId: r.ragId })),
        ...(e.model.agentDelegations ?? []).filter((r) => r.agentId === t.id || r.delegateAgentId === t.id).map((r) => ({
          kind: "add-agent-delegate",
          sourceId: r.agentId,
          targetId: r.delegateAgentId
        })),
        ...(e.model.actorAgentUses ?? []).filter((r) => r.agentId === t.id).map((r) => ({ kind: "add-actor-agent", sourceId: r.actorId, targetId: t.id })),
        ...(e.model.agentTriggers ?? []).filter((r) => r.agentId === t.id).map((r) => ({ kind: "add-agent-trigger", sourceId: r.eventId, targetId: t.id }))
      ] : null;
    }
    case "add-mcp-gateway":
      return [{ kind: "remove-mcp-gateway", id: t.id }];
    case "remove-mcp-gateway": {
      const c = (e.model.mcpGateways ?? []).find((r) => r.id === t.id);
      return c ? [
        { kind: "add-mcp-gateway", id: c.id, name: c.name },
        ...[
          ...c.mcpServerIds ?? [],
          ...c.apiIds ?? [],
          ...c.apiOperationIds ?? [],
          ...c.useCaseIds ?? [],
          ...c.ragIds ?? []
        ].map((r) => ({ kind: "add-gateway-exposure", sourceId: t.id, targetId: r })),
        ...(e.model.agentGatewayUses ?? []).filter((r) => r.gatewayId === t.id).map((r) => ({ kind: "add-agent-gateway", sourceId: r.agentId, targetId: t.id }))
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
        const r = (c.mcpServers ?? []).find((m) => m.id === t.id);
        if (r)
          return [
            { kind: "add-mcp-server", id: r.id, name: r.name, boundedContextId: c.id, uri: r.uri },
            ...(e.model.agentMcpUses ?? []).filter((m) => m.mcpServerId === t.id).map(
              (m) => ({
                kind: "add-agent-mcp",
                sourceId: m.agentId,
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
      const c = (e.model.rags ?? []).find((r) => r.id === t.id);
      return c ? [
        { kind: "add-rag", id: c.id, name: c.name },
        ...(e.model.agentRags ?? []).filter((r) => r.ragId === t.id).map(
          (r) => ({
            kind: "add-agent-rag",
            sourceId: r.agentId,
            targetId: t.id
          })
        ),
        ...(c.sourceReadModelIds ?? []).map(
          (r) => ({ kind: "add-rag-source", sourceId: t.id, targetId: r })
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
      const c = (e.model.actors ?? []).find((r) => r.id === t.id);
      return c ? [{ kind: "add-actor", id: c.id, name: c.name }] : null;
    }
    case "add-note":
      return [{ kind: "remove-note", id: t.id }];
    case "remove-note": {
      const c = (e.model.notes ?? []).find((r) => r.id === t.id);
      return c ? [
        { kind: "add-note", id: c.id, name: c.text },
        ...[...c.targetIds ?? [], ...c.edgeRefs ?? []].map(
          (r) => ({ kind: "note-attach", id: c.id, targetId: r })
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
      const c = (e.model.areas ?? []).find((r) => r.id === t.id);
      return c ? [{ kind: "add-area", id: c.id, name: c.name }] : null;
    }
    case "add-application-event":
      return [{ kind: "remove-application-event", id: t.id }];
    case "remove-application-event": {
      for (const c of e.model.boundedContexts) {
        const r = (c.applicationEvents ?? []).find((m) => m.id === t.id);
        if (r)
          return [{ kind: "add-application-event", id: r.id, name: r.name, boundedContextId: c.id }];
      }
      return null;
    }
    case "add-domain-service":
      return [{ kind: "remove-domain-service", id: t.id }];
    case "remove-domain-service": {
      for (const c of e.model.boundedContexts) {
        const r = (c.domainServices ?? []).find((m) => m.id === t.id);
        if (r) return [{ kind: "add-domain-service", id: r.id, name: r.name, boundedContextId: c.id }];
      }
      return null;
    }
    case "add-read-model":
      return [{ kind: "remove-read-model", id: t.id }];
    case "add-projection":
      return [{ kind: "remove-projection", id: t.id }];
    case "remove-projection": {
      const c = (e.model.projections ?? []).find((r) => r.id === t.id);
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
        const r = (c.tables ?? []).find((m) => m.id === t.id);
        if (r) return [{ kind: "add-external-table", id: r.id, name: r.name, boundedContextId: c.id }];
      }
      return null;
    }
    case "add-rag-content-source":
      return [{ kind: "remove-rag-content-source", sourceId: t.sourceId, uri: t.uri }];
    case "remove-rag-content-source": {
      const c = (f = (h = (e.model.rags ?? []).find((r) => r.id === t.sourceId)) == null ? void 0 : h.contentSources) == null ? void 0 : f.find((r) => r.uri === t.uri);
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
      const c = (e.model.apis ?? []).find((r) => r.id === t.id);
      return c ? [
        { kind: "add-api", id: c.id, name: c.name },
        ...c.operations.map(
          (r) => ({
            kind: "add-api-operation",
            apiId: c.id,
            id: r.id,
            name: r.name,
            httpMethod: r.httpMethod,
            path: r.path,
            boundedContextId: r.targetBoundedContextId,
            targetUseCaseId: r.targetUseCaseId
          })
        )
      ] : null;
    }
    case "add-api-operation":
      return [{ kind: "remove-api-operation", apiId: t.apiId, id: t.id }];
    case "remove-api-operation": {
      const c = (y = (e.model.apis ?? []).find((r) => r.id === t.apiId)) == null ? void 0 : y.operations.find((r) => r.id === t.id);
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
      const c = (w = (e.model.apis ?? []).find((r) => r.id === t.apiId)) == null ? void 0 : w.operations.find((r) => r.id === t.id);
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
        const r = (c.readModels ?? []).find((m) => m.id === t.id);
        if (r != null && r.aggregateId)
          return [{ kind: "add-read-model", id: r.id, name: r.name, aggregateId: r.aggregateId }];
      }
      return null;
    }
    case "remove-domain-event": {
      for (const c of e.model.boundedContexts) {
        const r = (c.domainEvents ?? []).find((m) => m.id === t.id);
        if (r) return [{ kind: "add-domain-event", id: r.id, name: r.name, boundedContextId: c.id }];
      }
      return null;
    }
    case "rename-element": {
      const r = (t.type === "boundedContext" ? e.model.boundedContexts : t.type === "aggregate" ? e.model.aggregates ?? [] : t.type === "domain-event" ? e.model.boundedContexts.flatMap((m) => m.domainEvents ?? []) : t.type === "read-model" ? e.model.boundedContexts.flatMap((m) => m.readModels ?? []) : t.type === "domain-service" ? e.model.boundedContexts.flatMap((m) => m.domainServices ?? []) : t.type === "query-service" ? e.model.boundedContexts.flatMap((m) => m.queryServices ?? []) : t.type === "use-case" ? e.model.boundedContexts.flatMap((m) => m.useCases ?? []) : t.type === "external-use-case" ? e.model.externalSystems.flatMap((m) => m.useCases ?? []) : t.type === "mcp-server" ? e.model.externalSystems.flatMap((m) => m.mcpServers ?? []) : t.type === "application-event" ? e.model.boundedContexts.flatMap((m) => m.applicationEvents ?? []) : t.type === "external-system" ? e.model.externalSystems : t.type === "actor" ? e.model.actors ?? [] : t.type === "ai-agent" ? e.model.aiAgents ?? [] : t.type === "mcp-gateway" ? e.model.mcpGateways ?? [] : e.model.entities ?? []).find((m) => m.id === t.id);
      return r ? [{ kind: "rename-element", type: t.type, id: t.id, name: r.name }] : null;
    }
    case "add-flow":
      return [{ kind: "remove-flow", id: t.id }];
    case "remove-flow": {
      const c = e.model.flows.find((r) => r.id === t.id);
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
      const c = (e.model.journeys ?? []).find((r) => r.id === t.id);
      return c ? [
        { kind: "add-journey", id: c.id, name: c.name },
        ...(c.legs ?? []).map((r) => ({
          kind: "journey-add-leg",
          journeyId: c.id,
          itemId: r.id,
          sourceId: r.sourceId,
          targetId: r.targetId,
          dependsOnStepIds: r.afterLegIds,
          label: r.label
        }))
      ] : null;
    }
    case "journey-add-leg":
      return [{ kind: "journey-remove-leg", journeyId: t.journeyId, itemId: t.itemId }];
    case "journey-remove-leg": {
      const c = (e.model.journeys ?? []).find((m) => m.id === t.journeyId), r = ((c == null ? void 0 : c.legs) ?? []).find((m) => m.id === t.itemId);
      return r ? [{
        kind: "journey-add-leg",
        journeyId: t.journeyId,
        itemId: r.id,
        sourceId: r.sourceId,
        targetId: r.targetId,
        dependsOnStepIds: r.afterLegIds,
        label: r.label
      }] : null;
    }
    case "add-view":
      return [{ kind: "remove-view", id: t.id }];
    case "remove-view": {
      const c = (e.model.views ?? []).find((r) => r.id === t.id);
      return c ? [{ kind: "add-view", id: c.id, name: c.name, memberIds: c.memberIds }] : null;
    }
    case "add-process":
      return [{ kind: "remove-process", id: t.id }];
    case "add-process-step":
      return [{ kind: "remove-process-step", processId: t.processId, id: t.id }];
    case "remove-process-step": {
      const c = (e.model.processes ?? []).find((v) => v.id === t.processId), r = (c == null ? void 0 : c.steps.findIndex((v) => v.id === t.id)) ?? -1;
      if (!c || r < 0) return null;
      const m = c.steps[r];
      return [
        {
          kind: "add-process-step",
          processId: t.processId,
          id: m.id,
          name: m.name,
          stepType: m.type,
          roleId: m.roleId,
          deadline: m.deadline,
          useCaseId: m.useCaseId,
          compensationUseCaseId: m.compensationUseCaseId,
          afterStepId: r > 0 ? c.steps[r - 1].id : void 0
        }
      ];
    }
    case "move-process-step": {
      const c = (e.model.processes ?? []).find((m) => m.id === t.processId), r = (c == null ? void 0 : c.steps.findIndex((m) => m.id === t.id)) ?? -1;
      return !c || r < 0 ? null : [
        {
          kind: "move-process-step",
          processId: t.processId,
          id: t.id,
          afterStepId: r > 0 ? c.steps[r - 1].id : void 0
        }
      ];
    }
    case "update-process-step": {
      const c = (e.model.processes ?? []).find((m) => m.id === t.processId), r = c == null ? void 0 : c.steps.find((m) => m.id === t.id);
      return r ? [
        {
          kind: "update-process-step",
          processId: t.processId,
          id: t.id,
          roleId: r.roleId,
          deadline: r.deadline,
          compensationUseCaseId: r.compensationUseCaseId
        }
      ] : null;
    }
    case "remove-process": {
      const c = (e.model.processes ?? []).find((r) => r.id === t.id);
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
      const c = (e.model.workflows ?? []).find((r) => r.id === t.id);
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
      const c = (e.model.workflows ?? []).find((v) => v.id === t.workflowId), r = (c == null ? void 0 : c.steps.findIndex((v) => v.id === t.id)) ?? -1;
      if (!c || r < 0) return null;
      const m = c.steps[r];
      return [
        {
          kind: "add-workflow-step",
          workflowId: t.workflowId,
          id: m.id,
          name: m.name,
          emittedEventName: m.emittedEventName,
          targetUseCaseId: m.targetUseCaseId,
          completionEventName: m.completionEventName,
          dependsOnStepIds: m.dependsOnStepIds,
          afterStepId: r > 0 ? c.steps[r - 1].id : void 0
        },
        // Removing a step also strips it from its dependents; restore those edges.
        ...c.steps.filter((v) => v.id !== t.id && (v.dependsOnStepIds ?? []).includes(t.id)).map(
          (v) => ({
            kind: "add-workflow-dependency",
            workflowId: t.workflowId,
            id: v.id,
            dependsOnStepId: t.id
          })
        )
      ];
    }
    case "update-workflow-step": {
      const c = (e.model.workflows ?? []).find((m) => m.id === t.workflowId), r = c == null ? void 0 : c.steps.find((m) => m.id === t.id);
      return r ? [
        {
          kind: "update-workflow-step",
          workflowId: t.workflowId,
          id: t.id,
          emittedEventName: r.emittedEventName,
          targetUseCaseId: r.targetUseCaseId,
          completionEventName: r.completionEventName
        }
      ] : null;
    }
    case "set-workflow-trigger": {
      const c = (e.model.workflows ?? []).find((r) => r.id === t.id);
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
const re = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""), zo = [
  { id: "uc-call", label: "Invocación", hint: "Caso de uso → caso de uso: lo invoca como un paso" },
  { id: "query-call", label: "Consulta", hint: "Caso de uso → query service: lo consulta" },
  { id: "aggregate-call", label: "Opera sobre", hint: "Caso de uso → agregado: opera sobre él" },
  { id: "emission", label: "Emisión", hint: "Agregado/servicio → evento de dominio · caso de uso → evento de aplicación" },
  { id: "flow-triggers", label: "Flow · dispara", hint: "Evento → caso de uso de otro contexto (TRIGGERS)" },
  { id: "flow-materializes", label: "Flow · materializa", hint: "Evento → contexto o read model (MATERIALIZES)" },
  { id: "actor-use", label: "Uso (actor)", hint: "Actor → caso de uso, query service, agregado (CRUD) o agente" },
  { id: "ext-dep", label: "Dependencia", hint: "Sistema externo/actor → sistema, API o proxy" },
  { id: "external-call", label: "Llamada ACL", hint: "Sistema externo → caso de uso nuestro (entra por ACL)" },
  { id: "external-uc-call", label: "Llamada saliente", hint: "Caso de uso nuestro → operación de un sistema externo" },
  { id: "agent-tool", label: "Herramienta IA", hint: "Agente → caso de uso, operación, MCP, gateway, API o query service" },
  { id: "agent-delegate", label: "Delegación IA", hint: "Agente → agente: le delega trabajo" },
  { id: "agent-rag", label: "Conocimiento", hint: "Agente → RAG que fundamenta sus respuestas" },
  { id: "idp-trust", label: "Identidad", hint: "Contexto, app o flujo ETL → IdP cuyos tokens valida" }
];
function $c(e, t, n) {
  const i = e.model, o = [], s = ($, S) => o.push({ id: $, apply: S }), a = new Set(i.boundedContexts.flatMap(($) => ($.useCases ?? []).map((S) => S.id))), d = new Set(i.boundedContexts.flatMap(($) => ($.queryServices ?? []).map((S) => S.id))), l = new Set(i.boundedContexts.flatMap(($) => ($.domainEvents ?? []).map((S) => S.id))), u = new Set(i.boundedContexts.flatMap(($) => ($.applicationEvents ?? []).map((S) => S.id))), g = /* @__PURE__ */ new Set([
    ...(i.aggregates ?? []).map(($) => $.id),
    ...i.boundedContexts.flatMap(($) => ($.domainServices ?? []).map((S) => S.id))
  ]), h = new Set(i.externalSystems.flatMap(($) => ($.useCases ?? []).map((S) => S.id))), f = ($) => (i.aiAgents ?? []).some((S) => S.id === $), y = ($) => (i.actors ?? []).some((S) => S.id === $), w = ($) => i.externalSystems.some((S) => S.id === $), c = ($) => i.boundedContexts.some((S) => S.id === $), r = ($) => (i.aggregates ?? []).some((S) => S.id === $);
  if (a.has(t) && a.has(n) && t !== n && s("uc-call", () => {
    (i.useCaseCalls ?? []).some(($) => $.sourceId === t && $.targetId === n) || e.command({ kind: "add-use-case-call", sourceId: t, targetId: n });
  }), a.has(t) && d.has(n) && s("query-call", () => {
    (i.queryCalls ?? []).some(($) => $.sourceId === t && $.targetId === n) || e.command({ kind: "add-query-call", sourceId: t, targetId: n });
  }), a.has(t) && r(n) && s("aggregate-call", () => {
    (i.aggregateCalls ?? []).some(($) => $.sourceId === t && $.targetId === n) || e.command({ kind: "add-aggregate-call", sourceId: t, targetId: n });
  }), (g.has(t) && l.has(n) || a.has(t) && u.has(n)) && s("emission", () => {
    (i.emissions ?? []).some(($) => $.sourceId === t && $.domainEventId === n) || e.command({ kind: "add-emission", sourceId: t, targetId: n });
  }), (l.has(t) || u.has(t)) && a.has(n) && s("flow-triggers", () => ut(e, "context-map", t, n, void 0, void 0, "__classic")), (l.has(t) || u.has(t)) && (c(n) || i.boundedContexts.some(($) => ($.readModels ?? []).some((S) => S.id === n))) && s("flow-materializes", () => ut(e, "context-map", t, n, void 0, void 0, "__classic")), y(t) && ((a.has(n) || d.has(n) || r(n) || f(n)) && s("actor-use", () => ut(e, "context-map", t, n, void 0, void 0, "__classic")), w(n) && s("ext-dep", () => {
    (i.actorExternalDependencies ?? []).some(($) => $.actorId === t && $.externalSystemId === n) || e.command({ kind: "add-actor-external", sourceId: t, targetId: n });
  })), w(t) && (w(n) && t !== n && s("ext-dep", () => {
    (i.externalSystemDependencies ?? []).some(($) => $.sourceId === t && $.targetId === n) || e.command({ kind: "add-external-dependency", sourceId: t, targetId: n });
  }), ((i.apis ?? []).some(($) => $.id === n) || (i.proxyApis ?? []).some(($) => $.id === n)) && s("ext-dep", () => {
    (i.externalSystemDependencies ?? []).some(($) => $.sourceId === t && $.targetId === n) || e.command({ kind: "add-external-dependency", sourceId: t, targetId: n });
  }), a.has(n) && s("external-call", () => {
    (i.externalCalls ?? []).some(($) => $.externalSystemId === t && $.useCaseId === n) || e.command({ kind: "add-external-call", sourceId: t, targetId: n });
  })), a.has(t) && h.has(n) && s("external-uc-call", () => {
    (i.externalUseCaseCalls ?? []).some(($) => $.sourceId === t && $.targetId === n) || e.command({ kind: "add-external-uc-call", sourceId: t, targetId: n });
  }), f(t)) {
    const $ = new Set(i.externalSystems.flatMap((T) => (T.mcpServers ?? []).map((R) => R.id))), S = new Set((i.apis ?? []).flatMap((T) => T.operations.map((R) => R.id)));
    (a.has(n) || h.has(n) || $.has(n) || (i.mcpGateways ?? []).some((T) => T.id === n) || S.has(n) || (i.apis ?? []).some((T) => T.id === n) || (i.proxyApis ?? []).some((T) => T.id === n) || d.has(n)) && s("agent-tool", () => ut(e, "context-map", t, n, void 0, void 0, "__classic")), f(n) && n !== t && s("agent-delegate", () => {
      (i.agentDelegations ?? []).some((T) => T.agentId === t && T.delegateAgentId === n) || e.command({ kind: "add-agent-delegate", sourceId: t, targetId: n });
    }), (i.rags ?? []).some((T) => T.id === n) && s("agent-rag", () => {
      (i.agentRags ?? []).some((T) => T.agentId === t && T.ragId === n) || e.command({ kind: "add-agent-rag", sourceId: t, targetId: n });
    });
  }
  (($) => (i.identityProviders ?? []).some((S) => S.id === $))(n) && (c(t) || (i.etlFlows ?? []).some(($) => $.id === t) || (i.uiApps ?? []).some(($) => $.id === t)) && s("idp-trust", () => ut(e, "context-map", t, n, void 0, void 0, "__classic"));
  const v = /* @__PURE__ */ new Set();
  return o.filter(($) => v.has($.id) ? !1 : (v.add($.id), !0)).map(($) => {
    const S = zo.find((T) => T.id === $.id);
    return { ...$, label: S.label, hint: S.hint };
  });
}
function ut(e, t, n, i, o, s, a) {
  var j, b, x;
  const d = new Set((e.model.notes ?? []).map((I) => I.id));
  if (d.has(n) || d.has(i)) {
    const I = d.has(n) ? n : i, k = d.has(n) ? i : n;
    if (I === k) return;
    const _ = k.startsWith("edge:") ? k.slice(5) : k.replace(/^(tgt:|flow:)/, "");
    e.command({ kind: "note-attach", id: I, targetId: _ });
    return;
  }
  if (e.activeJourneyId && (t === "context-map" || t === "integrations")) {
    const I = (e.model.journeys ?? []).find((k) => k.id === e.activeJourneyId);
    if (I && n !== i) {
      const k = I.legs ?? [], _ = k.filter((N) => N.targetId === n).map((N) => N.id);
      let A = k.length + 1;
      for (; k.some((N) => N.id === `leg-${A}`); ) A++;
      e.command({
        kind: "journey-add-leg",
        journeyId: I.id,
        itemId: `leg-${A}`,
        sourceId: n,
        targetId: i,
        dependsOnStepIds: _
      });
      return;
    }
  }
  if (t === "distribution") {
    const I = e.sceneFor("distribution"), k = e.model.modules ?? [], A = ((N) => {
      for (let O = N; O; ) {
        if (k.some((D) => D.id === O)) return O;
        const U = I.nodes.find((D) => D.id === O);
        O = U ? U.ownerId ?? U.parentId : void 0;
      }
      return null;
    })(i);
    if (A && A !== n && (e.model.services ?? []).some((N) => N.id === n)) {
      e.command({ kind: "add-service-module", serviceId: n, id: A });
      return;
    }
    if ((e.model.services ?? []).some((N) => N.id === n)) {
      const N = e.model.boundedContexts.find((D) => D.id === i), O = N ? k.filter((D) => D.boundedContextId === N.id) : [], U = O.find((D) => D.main) ?? O[0];
      if (U) {
        e.command({ kind: "add-service-module", serviceId: n, id: U.id });
        return;
      }
    }
    if (A && A !== n && !k.some((O) => O.id === n) && !e.model.boundedContexts.some((O) => O.id === n)) {
      e.command({ kind: "add-module-element", id: A, elementId: n });
      return;
    }
  }
  if (t === "integrations") {
    ut(e, "context-map", n, i, o, s, a);
    return;
  }
  if (t === "eventstorming") {
    const I = (_) => (e.model.customCodes ?? []).some((A) => A.id === _), k = I(i) ? { stepId: n, ccId: i } : I(n) ? { stepId: i, ccId: n } : null;
    if (k) {
      const _ = e.owningUseCaseOf(k.stepId);
      _ && e.command({
        kind: "set-use-case-step-custom-code",
        useCaseId: _.id,
        id: k.stepId,
        targetId: k.ccId
      });
      return;
    }
    return;
  }
  if (t === "workflows") {
    const I = (D) => (e.model.actors ?? []).some((X) => X.id === D);
    if (I(n) !== I(i)) {
      const D = I(n) ? n : i, X = I(n) ? i : n, se = e.owningWorkflowOf(X);
      if (se) {
        e.command({ kind: "set-workflow-step-role", workflowId: se.id, id: X, targetId: D });
        return;
      }
    }
    const k = (D) => (e.model.pages ?? []).some((X) => X.id === D);
    if (k(n) !== k(i)) {
      const D = k(n) ? n : i, X = k(n) ? i : n, se = e.owningWorkflowOf(X);
      if (se) {
        e.command({ kind: "set-workflow-step-form", workflowId: se.id, id: X, targetId: D });
        return;
      }
    }
    const _ = e.model.workflowGateways ?? [], A = (D) => _.some((X) => X.id === D);
    if (A(n) || A(i) || (e.model.workflows ?? []).some((D) => D.id === i)) {
      if (n === i) return;
      e.command({ kind: "add-workflow-link", sourceId: n, targetId: i });
      return;
    }
    const N = e.owningWorkflowOf(n), O = e.owningWorkflowOf(i);
    if (!N || N !== O || n === i) return;
    const U = N.steps.find((D) => D.id === i);
    if (((U == null ? void 0 : U.dependsOnStepIds) ?? []).includes(n)) return;
    e.command({
      kind: "add-workflow-dependency",
      workflowId: N.id,
      id: i,
      dependsOnStepId: n
    });
    return;
  }
  if (t === "ui") {
    const I = e.model.pages ?? [], k = e.model.uiApps ?? [], _ = (K) => k.some((ne) => ne.id === K), A = (K) => I.some((ne) => ne.id === K), N = (K) => (e.model.customCodes ?? []).some((ne) => ne.id === K);
    if (N(n) || N(i)) {
      const K = N(n) ? n : i, ne = N(n) ? i : n;
      if (N(ne)) return;
      if (A(ne)) {
        e.command({ kind: "set-page-custom-code", id: ne, targetId: K });
        return;
      }
      e.command({ kind: "add-custom-code-use", id: K, elementId: ne });
      return;
    }
    const O = e.model.buttonGroups ?? [], U = (K) => O.some((ne) => ne.id === K);
    if ((a === "toolbar" || a === "bottom") && U(n) && A(i)) {
      e.command({ kind: "add-page-bar-group", pageId: i, id: n, bar: a });
      return;
    }
    if (U(n) && U(i) && n !== i) {
      e.command({ kind: "add-group-subgroup", id: i, targetId: n });
      return;
    }
    const D = /^gbtn:([^:]+):(.+)$/.exec(n);
    if (D) {
      e.model.boundedContexts.some((ne) => (ne.useCases ?? []).some((Se) => Se.id === i)) ? e.command({ kind: "set-group-button-target", id: D[1], itemId: D[2], useCaseId: i }) : e.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
      return;
    }
    if (a === "home" && _(n) && (A(i) || _(i))) {
      if (i === n) return;
      e.command(
        A(i) ? { kind: "set-app-home-page", appId: n, pageId: i } : { kind: "set-app-home-page", appId: n, pageId: null, toAppId: i }
      );
      return;
    }
    if (a === "header" && _(n) && A(i)) {
      e.command({ kind: "set-app-header-page", appId: n, pageId: i });
      return;
    }
    if ((a === "crud-detail" || a === "crud-create") && A(n) && (A(i) || _(i)) && i !== n) {
      const K = a === "crud-detail" ? "set-crud-detail" : "set-crud-create";
      e.command(
        A(i) ? { kind: K, pageId: n, targetId: i, toAppId: null } : { kind: K, pageId: n, targetId: null, toAppId: i }
      );
      return;
    }
    if (a === "viewmodel" && A(n)) {
      (e.model.models ?? []).some((K) => K.id === i) ? e.command({ kind: "set-page-model", pageId: n, modelId: i }) : e.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
      return;
    }
    if ((a === "view" || a === "edit") && _(n) && A(i)) {
      e.command({
        kind: a === "view" ? "set-app-view-page" : "set-app-edit-page",
        appId: n,
        pageId: i
      });
      return;
    }
    if (a) return;
    const X = (K) => /^wizrow:([^:]+):(.+)$/.exec(K), se = X(n) ?? X(i);
    if (se) {
      const K = X(n) ? i : n;
      A(K) && K !== se[1] && e.command({ kind: "set-wizard-step-page", pageId: se[1], itemId: se[2], targetId: K });
      return;
    }
    const he = I.find((K) => K.id === i && K.type === "WIZARD");
    if (A(n) && he && n !== he.id) {
      (he.wizardSteps ?? []).some((K) => K.pageId === n) || e.command({ kind: "add-page-wizard-step", pageId: he.id, targetId: n });
      return;
    }
    if (A(n) && _(i)) {
      const K = I.find((Se) => Se.id === n), ne = k.find((Se) => Se.id === i);
      if (ne.type === "MASTER_DETAIL" && !ne.headerPageId) {
        e.command({ kind: "set-app-header-page", appId: i, pageId: n }), e.emit("modux-notice", {
          message: `${K.name} es la cabecera de ${ne.name} — las siguientes páginas serán pestañas`
        });
        return;
      }
      e.command({
        kind: "add-menu-item",
        appId: i,
        label: K.name,
        pageId: n,
        itemId: e.newMenuItemId(K.name)
      });
      return;
    }
    const Y = e.model.identityProviders ?? [], J = (K) => Y.some((ne) => ne.id === K);
    if (J(n) || J(i)) {
      const K = J(n) ? n : i, ne = J(n) ? i : n;
      _(ne) ? e.command({ kind: "set-identity-provider", id: ne, targetId: K }) : e.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
      return;
    }
    const ce = (K) => (e.model.models ?? []).some((ne) => ne.id === K);
    if (ce(n) || ce(i)) {
      const K = ce(n) ? n : i, ne = ce(n) ? i : n;
      if (A(ne)) {
        e.command({ kind: "set-page-model", pageId: ne, modelId: K });
        return;
      }
      if (_(ne)) {
        e.command({ kind: "set-app-model", appId: ne, modelId: K });
        return;
      }
      return;
    }
    const be = _e(n);
    if (be != null && be.itemId && ((j = _e(i)) != null && j.itemId || _(i))) {
      const K = _e(i), ne = e.menuEntryIn(be.appId, be.itemId);
      if (!ne) return;
      if (K != null && K.itemId) {
        const Se = e.menuEntryIn(K.appId, K.itemId);
        if (!Se) return;
        const Ee = (wt) => (wt ?? []).some((Jt) => Jt.id === K.itemId || Ee(Jt.children));
        if (be.appId === K.appId && (K.itemId === be.itemId || Ee(ne.entry.children)))
          return;
        const Be = e.nodeClientRect(i), Re = Be && s !== void 0 ? (s - Be.top) / Math.max(1, Be.height) : 0.5, et = Re < 0.3 ? "before" : Re > 0.7 ? "after" : "nest";
        if (et === "nest")
          e.command({
            kind: "move-menu-item",
            appId: be.appId,
            toAppId: K.appId,
            itemId: be.itemId,
            parentId: K.itemId
          });
        else {
          const wt = et === "before" ? K.itemId : Se.beforeId ?? void 0;
          if (be.appId === K.appId && Se.parentId === ne.parentId && wt === be.itemId) return;
          e.command({
            kind: "move-menu-item",
            appId: be.appId,
            toAppId: K.appId,
            itemId: be.itemId,
            parentId: Se.parentId ?? void 0,
            beforeItemId: wt
          });
        }
        return;
      }
      if (be.appId === i && !ne.parentId) return;
      e.command({
        kind: "move-menu-item",
        appId: be.appId,
        toAppId: i,
        itemId: be.itemId
      });
      return;
    }
    const $e = _e(n) ?? _e(i);
    if ($e) {
      const K = _e(n) ? n : i, ne = _e(n) ? i : n;
      if (((b = e.sceneFor("ui").nodes.find((Re) => Re.id === K)) == null ? void 0 : b.kind) === "menu-group") {
        e.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
        return;
      }
      const Se = e.model.boundedContexts.some(
        (Re) => (Re.useCases ?? []).some((et) => et.id === ne)
      ), Ee = (e.model.aggregates ?? []).some((Re) => Re.id === ne), Be = e.model.boundedContexts.flatMap((Re) => Re.queryServices ?? []).find((Re) => (Re.operations ?? []).some((et) => et.id === ne));
      A(ne) ? e.command({ kind: "set-menu-page", pageId: ne, ...$e }) : _(ne) && ne !== $e.appId ? e.command({ kind: "set-menu-app", toAppId: ne, ...$e }) : Se ? e.command({ kind: "set-menu-use-case", useCaseId: ne, ...$e }) : Ee ? e.command({ kind: "set-menu-aggregate", aggregateId: ne, ...$e }) : Be && e.command({
        kind: "set-menu-query-operation",
        queryServiceId: Be.id,
        queryOperationId: ne,
        ...$e
      });
      return;
    }
    if ((e.model.actors ?? []).some((K) => K.id === n) && _(i)) {
      (e.model.actorAppUses ?? []).some((K) => K.actorId === n && K.appId === i) || e.command({ kind: "add-actor-app", actorId: n, appId: i });
      return;
    }
    const Ce = A(n) ? { pageId: n, other: i } : A(i) ? { pageId: i, other: n } : null;
    if (Ce) {
      const K = new Set(
        e.model.boundedContexts.flatMap((Ee) => (Ee.useCases ?? []).map((Be) => Be.id))
      ), ne = new Set(
        e.model.boundedContexts.flatMap((Ee) => (Ee.queryServices ?? []).map((Be) => Be.id))
      ), Se = I.find((Ee) => Ee.id === Ce.pageId);
      K.has(Ce.other) ? (Se.buttons ?? []).some((Ee) => Ee.useCaseId === Ce.other) || e.command({ kind: "add-page-button", pageId: Ce.pageId, useCaseId: Ce.other }) : ne.has(Ce.other) && e.command({ kind: "set-page-listing", pageId: Ce.pageId, queryServiceId: Ce.other });
    }
    return;
  }
  if (t === "mappings") {
    const I = e.model.models ?? [], k = Kn(n), _ = Kn(i), A = e.model.transformations ?? [], N = e.model.customCodes ?? [], O = (Y) => N.some((J) => J.id === Y);
    if (O(n) && A.some((Y) => Y.id === i)) {
      e.command({ kind: "set-transformation-custom-code", id: i, targetId: n });
      return;
    }
    if (O(i) && A.some((Y) => Y.id === n)) {
      e.command({ kind: "set-transformation-custom-code", id: n, targetId: i });
      return;
    }
    if (O(n)) {
      const Y = (_ == null ? void 0 : _.modelId) ?? (I.some((J) => J.id === i) ? i : null);
      if (Y) {
        const J = (e.model.modelMappings ?? []).filter(
          (ce) => ce.sourceModelId === Y || ce.targetModelId === Y
        );
        J.length === 1 ? e.command({ kind: "set-mapping-custom-code", id: J[0].id, targetId: n }) : e.emit("modux-notice", {
          message: J.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
        });
        return;
      }
      return;
    }
    if (A.some((Y) => Y.id === i)) {
      if (_ || A.some((J) => J.id === n)) return;
      const Y = k ? { modelId: k.modelId, fieldId: k.fieldId } : I.some((J) => J.id === n) ? { modelId: n } : null;
      Y && e.command({ kind: "add-transformation-input", id: i, ...Y });
      return;
    }
    if (A.some((Y) => Y.id === n)) {
      const Y = _ ? { modelId: _.modelId, fieldId: _.fieldId } : I.some((J) => J.id === i) ? { modelId: i } : null;
      Y && e.command({ kind: "set-transformation-output", id: n, ...Y });
      return;
    }
    if (k && _) {
      if (k.modelId === _.modelId) {
        e.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
        return;
      }
      let Y = (e.model.modelMappings ?? []).find(
        (J) => J.sourceModelId === k.modelId && J.targetModelId === _.modelId
      );
      if (!Y) {
        const J = I.find((K) => K.id === k.modelId), ce = I.find((K) => K.id === _.modelId);
        if (!J || !ce) return;
        const be = (K) => K.replace(/[^a-zA-Z0-9]/g, ""), $e = new Set((e.model.modelMappings ?? []).map((K) => K.id));
        let Ce = `mapping-${re(J.name)}-${re(ce.name)}`;
        for (let K = 2; $e.has(Ce); K++) Ce = `mapping-${re(J.name)}-${re(ce.name)}-${K}`;
        e.command(
          { kind: "add-model-mapping", id: Ce, name: `${be(J.name)}2${be(ce.name)}`, sourceId: J.id, targetId: ce.id },
          !1
        ), Y = { id: Ce, name: "", sourceModelId: J.id, targetModelId: ce.id };
      }
      e.command({
        kind: "add-model-mapping-rule",
        id: Y.id,
        sourceId: k.fieldId,
        targetId: _.fieldId
      });
      return;
    }
    if (k && I.some((Y) => Y.id === i) && i !== k.modelId) {
      e.command({ kind: "move-model-field", modelId: k.modelId, fieldId: k.fieldId, targetId: i });
      return;
    }
    if (!I.some((Y) => Y.id === n) || !I.some((Y) => Y.id === i) || n === i || (e.model.modelMappings ?? []).some((Y) => Y.sourceModelId === n && Y.targetModelId === i))
      return;
    const U = I.find((Y) => Y.id === n), D = I.find((Y) => Y.id === i), X = (Y) => Y.replace(/[^a-zA-Z0-9]/g, ""), se = new Set((e.model.modelMappings ?? []).map((Y) => Y.id));
    let he = `mapping-${re(U.name)}-${re(D.name)}`;
    for (let Y = 2; se.has(he); Y++) he = `mapping-${re(U.name)}-${re(D.name)}-${Y}`;
    e.command({
      kind: "add-model-mapping",
      id: he,
      name: `${X(U.name)}2${X(D.name)}`,
      sourceId: n,
      targetId: i
    });
    return;
  }
  if (t !== "context-map") return;
  if (a !== "__classic" && a === void 0) {
    const I = $c(e, n, i);
    if (e.armedRelation) {
      const k = I.find((_) => _.id === e.armedRelation);
      k ? k.apply() : e.emit("modux-notice", {
        message: "Esa relación no aplica entre estos dos elementos"
      });
      return;
    }
    if (I.length > 1) {
      e.openConnectPicker({ x: o ?? 0, y: s ?? 0, options: I });
      return;
    }
  }
  const l = /^apiop:(.+)@(.+)$/.exec(n);
  if (l) {
    const [, I, k] = l, _ = (e.model.proxyApis ?? []).find((D) => D.id === k), A = (_ == null ? void 0 : _.targetApiId) ?? ((x = (e.model.apiImplementations ?? []).find(
      (D) => D.boundedContextId === k && (e.model.apis ?? []).some(
        (X) => X.id === D.apiId && X.operations.some((se) => se.id === I)
      )
    )) == null ? void 0 : x.apiId);
    if (!A) return;
    if (new Set(
      e.model.boundedContexts.flatMap((D) => (D.useCases ?? []).map((X) => X.id))
    ).has(i)) {
      e.command({
        kind: "set-api-operation-implementation",
        apiId: A,
        operationId: I,
        boundedContextId: k,
        targetUseCaseId: i
      });
      return;
    }
    if (!(_ != null && _.targetApiId)) return;
    let O = null;
    if (i === _.targetApiId)
      O = _.targetApiId;
    else {
      const D = /^apiimpl:(.+)@(.+)$/.exec(i);
      D && D[1] === _.targetApiId ? O = D[2] : e.model.boundedContexts.some((X) => X.id === i) && (e.model.apiImplementations ?? []).some(
        (X) => X.apiId === _.targetApiId && X.boundedContextId === i
      ) && (O = i);
    }
    if (!O) return;
    (e.model.proxyOperationRoutes ?? []).some(
      (D) => D.proxyId === _.id && D.operationId === I && D.targetSiteId === O
    ) || e.command({
      kind: "add-proxy-operation-route",
      proxyId: _.id,
      operationId: I,
      targetSiteId: O
    });
    return;
  }
  const u = new Set((e.model.aiAgents ?? []).map((I) => I.id));
  if (u.has(n)) {
    if (new Set(
      e.model.boundedContexts.flatMap((O) => (O.useCases ?? []).map((U) => U.id))
    ).has(i)) {
      (e.model.agentUses ?? []).some(
        (U) => U.agentId === n && U.useCaseId === i
      ) || e.command({ kind: "add-agent-use", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((O) => (O.useCases ?? []).map((U) => U.id))
    ).has(i)) {
      (e.model.agentExternalUses ?? []).some(
        (U) => U.agentId === n && U.externalUseCaseId === i
      ) || e.command({ kind: "add-agent-external-use", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((O) => (O.mcpServers ?? []).map((U) => U.id))
    ).has(i)) {
      (e.model.agentMcpUses ?? []).some(
        (U) => U.agentId === n && U.mcpServerId === i
      ) || e.command({ kind: "add-agent-mcp", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.mcpGateways ?? []).some((O) => O.id === i)) {
      (e.model.agentGatewayUses ?? []).some(
        (U) => U.agentId === n && U.gatewayId === i
      ) || e.command({ kind: "add-agent-gateway", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      (e.model.apis ?? []).flatMap((O) => O.operations.map((U) => U.id))
    ).has(i)) {
      (e.model.agentApiOpUses ?? []).some(
        (U) => U.agentId === n && U.apiOperationId === i
      ) || e.command({ kind: "add-agent-api-operation", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.apis ?? []).some((O) => O.id === i) || (e.model.proxyApis ?? []).some((O) => O.id === i)) {
      (e.model.agentApiUses ?? []).some(
        (U) => U.agentId === n && U.apiId === i
      ) || e.command({ kind: "add-agent-api", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.boundedContexts.flatMap((O) => (O.queryServices ?? []).map((U) => U.id))
    ).has(i)) {
      (e.model.agentQueryUses ?? []).some(
        (U) => U.agentId === n && U.queryServiceId === i
      ) || e.command({ kind: "add-agent-query", sourceId: n, targetId: i });
      return;
    }
    if (u.has(i) && i !== n) {
      (e.model.agentDelegations ?? []).some(
        (U) => U.agentId === n && U.delegateAgentId === i
      ) || e.command({ kind: "add-agent-delegate", sourceId: n, targetId: i });
      return;
    }
    (e.model.rags ?? []).some((O) => O.id === i) && ((e.model.agentRags ?? []).some(
      (U) => U.agentId === n && U.ragId === i
    ) || e.command({ kind: "add-agent-rag", sourceId: n, targetId: i }));
    return;
  }
  if ((e.model.mcpGateways ?? []).some((I) => I.id === n)) {
    const I = (e.model.mcpGateways ?? []).find((A) => A.id === n), k = e.model.externalSystems.some((A) => (A.mcpServers ?? []).some((N) => N.id === i)) || (e.model.apis ?? []).some((A) => A.id === i) || (e.model.apis ?? []).some((A) => A.operations.some((N) => N.id === i)) || e.model.boundedContexts.some((A) => (A.useCases ?? []).some((N) => N.id === i)) || (e.model.rags ?? []).some((A) => A.id === i), _ = [
      ...I.mcpServerIds ?? [],
      ...I.apiIds ?? [],
      ...I.apiOperationIds ?? [],
      ...I.useCaseIds ?? [],
      ...I.ragIds ?? []
    ].includes(i);
    k && !_ && e.command({ kind: "add-gateway-exposure", sourceId: n, targetId: i });
    return;
  }
  if ((e.model.mcpGateways ?? []).some((I) => I.id === i)) return;
  const g = (e.model.rags ?? []).find((I) => I.id === n);
  if (g) {
    if (new Set(
      e.model.boundedContexts.flatMap((_) => (_.readModels ?? []).map((A) => A.id))
    ).has(i) && !(g.sourceReadModelIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((_) => (_.tables ?? []).map((A) => A.id))
    ).has(i) && !(g.sourceExternalTableIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    if (((e.model.apis ?? []).some((_) => _.id === i) || (e.model.proxyApis ?? []).some((_) => _.id === i)) && !(g.sourceApiIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    if (e.model.externalSystems.some((_) => _.id === i) && !(g.sourceExternalSystemIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    e.model.boundedContexts.some((_) => _.id === i) && !(g.sourceBoundedContextIds ?? []).includes(i) && e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
    return;
  }
  if ((e.model.rags ?? []).some((I) => I.id === i)) return;
  if ((e.model.workflows ?? []).some((I) => I.id === n)) {
    const I = (e.model.workflows ?? []).find((A) => A.id === n), k = (e.model.workflows ?? []).find(
      (A) => A.id === i && A.id !== n
    );
    if (k) {
      const A = I.onCompletionEventName || `${I.name.replace(/\s+/g, "")}Completado`;
      k.triggerEvent !== A && e.command({ kind: "set-workflow-trigger", id: i, triggerEvent: A });
      return;
    }
    const _ = e.model.boundedContexts.flatMap((A) => A.useCases ?? []).find((A) => A.id === i);
    if (_ && !(I.steps ?? []).some((N) => N.targetUseCaseId === i)) {
      const N = `wfs-${re(_.name)}`;
      let O = N;
      for (let U = 2; (I.steps ?? []).some((D) => D.id === O); U++)
        O = `${N}-${U}`;
      e.command({
        kind: "add-workflow-step",
        workflowId: n,
        id: O,
        name: _.name,
        targetUseCaseId: i
      });
    }
    return;
  }
  if ((e.model.workflows ?? []).some((I) => I.id === i)) {
    const I = e.model.boundedContexts.flatMap((A) => A.domainEvents ?? []).find((A) => A.id === n), k = e.model.boundedContexts.flatMap((A) => A.applicationEvents ?? []).find((A) => A.id === n), _ = I ?? k;
    if (_) {
      const A = (e.model.emissions ?? []).find((D) => D.domainEventId === n), N = new Set((e.model.aggregates ?? []).map((D) => D.id)), O = new Set(
        e.model.boundedContexts.flatMap((D) => (D.domainServices ?? []).map((X) => X.id))
      ), U = new Set(
        e.model.boundedContexts.flatMap((D) => (D.useCases ?? []).map((X) => X.id))
      );
      e.command({
        kind: "set-workflow-trigger",
        id: i,
        triggerEvent: _.name,
        triggerAggregateId: A && N.has(A.sourceId) ? A.sourceId : void 0,
        triggerDomainServiceId: A && O.has(A.sourceId) ? A.sourceId : void 0,
        triggerUseCaseId: A && U.has(A.sourceId) ? A.sourceId : void 0
      });
    }
    return;
  }
  if ((e.model.proxyApis ?? []).some((I) => I.id === n)) {
    const I = (e.model.proxyApis ?? []).find((k) => k.id === n);
    if ((e.model.apis ?? []).some((k) => k.id === i)) {
      I.targetApiId !== i && e.command({ kind: "set-proxy-target", id: n, targetId: i });
      return;
    }
    if (e.model.boundedContexts.some((k) => k.id === i)) {
      if (!I.targetApiId) return;
      (e.model.apiImplementations ?? []).some(
        (_) => _.apiId === I.targetApiId && _.boundedContextId === i
      ) || e.command({ kind: "add-api-implementation", apiId: I.targetApiId, boundedContextId: i });
      return;
    }
    e.model.externalSystems.some((k) => k.id === i) && I.publishedByExternalSystemId !== i && e.command({ kind: "set-api-publisher", id: n, targetId: i });
    return;
  }
  if ((e.model.apis ?? []).some((I) => I.id === n)) {
    if (e.model.externalSystems.some((I) => I.id === i)) {
      (e.model.apis ?? []).find((k) => k.id === n).publishedByExternalSystemId !== i && e.command({ kind: "set-api-publisher", id: n, targetId: i });
      return;
    }
    e.model.boundedContexts.some((I) => I.id === i) && ((e.model.apiImplementations ?? []).some(
      (k) => k.apiId === n && k.boundedContextId === i
    ) || e.command({ kind: "add-api-implementation", apiId: n, boundedContextId: i }));
    return;
  }
  const h = new Set((e.model.actors ?? []).map((I) => I.id));
  if (u.has(i)) {
    if ((/* @__PURE__ */ new Set([
      ...e.model.boundedContexts.flatMap((k) => (k.domainEvents ?? []).map((_) => _.id)),
      ...e.model.boundedContexts.flatMap((k) => (k.applicationEvents ?? []).map((_) => _.id))
    ])).has(n)) {
      (e.model.agentTriggers ?? []).some(
        (_) => _.eventId === n && _.agentId === i
      ) || e.command({ kind: "add-agent-trigger", sourceId: n, targetId: i });
      return;
    }
    if (!h.has(n)) return;
  }
  if (h.has(n)) {
    const I = new Set(
      e.model.boundedContexts.flatMap((_) => (_.useCases ?? []).map((A) => A.id))
    ), k = new Set(
      e.model.boundedContexts.flatMap((_) => (_.queryServices ?? []).map((A) => A.id))
    );
    if (I.has(i) || k.has(i)) {
      (e.model.actorUses ?? []).some(
        (A) => A.actorId === n && A.targetId === i
      ) || e.command({ kind: "add-actor-use", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.aggregates ?? []).some((_) => _.id === i)) {
      e.command({ kind: "add-actor-crud", sourceId: n, targetId: i });
      return;
    }
    if (e.model.externalSystems.some((_) => _.id === i)) {
      (e.model.actorExternalDependencies ?? []).some(
        (A) => A.actorId === n && A.externalSystemId === i
      ) || e.command({ kind: "add-actor-external", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.aiAgents ?? []).some((_) => _.id === i)) {
      (e.model.actorAgentUses ?? []).some(
        (A) => A.actorId === n && A.agentId === i
      ) || e.command({ kind: "add-actor-agent", sourceId: n, targetId: i });
      return;
    }
    return;
  }
  const f = e.owningApiOf(n);
  if (f) {
    if (new Set(
      e.model.boundedContexts.flatMap((k) => (k.useCases ?? []).map((_) => _.id))
    ).has(i)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: f.id,
        id: n,
        targetUseCaseId: i
      });
      return;
    }
    if (e.model.boundedContexts.some((k) => k.id === i)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: f.id,
        id: n,
        boundedContextId: i
      });
      return;
    }
    return;
  }
  const y = (I) => (e.model.notifications ?? []).find((k) => k.id === I);
  if (y(n) || y(i)) {
    const I = y(n) ?? y(i), k = y(n) ? i : n;
    if (e.model.boundedContexts.some(
      (A) => [...A.domainEvents ?? [], ...A.applicationEvents ?? []].some((N) => N.id === k)
    )) {
      I.eventId !== k && e.command({ kind: "set-notification-event", id: I.id, targetId: k });
      return;
    }
    if ((e.model.actors ?? []).some((A) => A.id === k)) {
      (I.recipientRoleIds ?? []).includes(k) || e.command({ kind: "add-notification-recipient", id: I.id, roleId: k });
      return;
    }
    e.emit("modux-notice", {
      message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
    });
    return;
  }
  const w = (I) => (e.model.documents ?? []).find((k) => k.id === I);
  if (w(n) || w(i)) {
    const I = w(n) ?? w(i), k = w(n) ? i : n;
    if ((e.model.models ?? []).find((O) => O.id === k)) {
      e.command({ kind: "set-document-model", id: I.id, modelId: k });
      return;
    }
    const A = e.model.boundedContexts.flatMap((O) => O.queryServices ?? []).find((O) => O.id === k), N = e.model.boundedContexts.flatMap((O) => (O.queryServices ?? []).flatMap((U) => (U.operations ?? []).map((D) => ({ op: D, qs: U })))).find(({ op: O }) => O.id === k);
    if (A || N) {
      e.command({
        kind: "set-document-query",
        id: I.id,
        queryServiceId: (A == null ? void 0 : A.id) ?? N.qs.id,
        queryOperationId: (N == null ? void 0 : N.op.id) ?? null
      });
      return;
    }
    e.emit("modux-notice", {
      message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
    });
    return;
  }
  const c = e.model.identityProviders ?? [], r = (I) => c.find((k) => k.id === I);
  if (r(n) || r(i)) {
    const I = r(n) ?? r(i), k = r(n) ? i : n;
    if (r(n) && e.model.externalSystems.some((N) => N.id === k)) {
      I.publishedByExternalSystemId !== k && e.command({ kind: "set-idp-publisher", id: I.id, targetId: k });
      return;
    }
    const _ = e.model.boundedContexts.some((N) => N.id === k), A = (e.model.etlFlows ?? []).some((N) => N.id === k);
    if (_ || A) {
      e.command({ kind: "set-identity-provider", id: k, targetId: I.id });
      return;
    }
    e.emit("modux-notice", {
      message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
    });
    return;
  }
  const m = e.model.etlFlows ?? [], v = (I) => m.find((k) => k.id === I);
  if (v(n) || v(i)) {
    const I = v(n) ?? v(i), k = v(n) ? i : n, _ = !v(n), A = new Set(e.model.externalSystems.flatMap((J) => (J.tables ?? []).map((ce) => ce.id))), N = /* @__PURE__ */ new Set([
      ...(e.model.apis ?? []).map((J) => J.id),
      ...(e.model.proxyApis ?? []).map((J) => J.id)
    ]), O = (e.model.apis ?? []).find((J) => J.operations.some((ce) => ce.id === k)), U = new Set(
      e.model.boundedContexts.flatMap((J) => [
        ...(J.domainEvents ?? []).map((ce) => ce.id),
        ...(J.applicationEvents ?? []).map((ce) => ce.id)
      ])
    );
    let D = null, X = {};
    if (A.has(k) ? (D = _ ? "SOURCE_PULL" : "WRITE_DB", X = { externalTableId: k }) : O ? (D = _ ? "SOURCE_PULL" : "WRITE_API", X = { apiId: O.id, operationId: k }) : N.has(k) ? (D = _ ? "SOURCE_PULL" : "WRITE_API", X = { apiId: k }) : U.has(k) && (D = _ ? "SOURCE_CONSUMER" : "WRITE_EVENT", X = { targetId: k }), !D) {
      e.emit("modux-notice", {
        message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
      });
      return;
    }
    if ((I.steps ?? []).some(
      (J) => J.type === D && (J.externalTableId ?? J.operationId ?? J.apiId ?? J.eventId) === (X.externalTableId ?? X.operationId ?? X.apiId ?? X.targetId)
    )) return;
    const he = new Set((I.steps ?? []).map((J) => J.id));
    let Y = (I.steps ?? []).length + 1;
    for (; he.has(`ets-${Y}`); ) Y++;
    e.command({ kind: "add-etl-step", etlFlowId: I.id, id: `ets-${Y}`, stepType: D, ...X });
    return;
  }
  const $ = e.model.externalSystems.flatMap((I) => I.useCases ?? []).find((I) => I.id === n), S = e.model.externalSystems.flatMap((I) => I.tables ?? []).find((I) => I.id === n);
  if ($ || S) {
    const I = ($ ?? S).name, k = $ ? { externalUseCaseId: n } : { externalTableId: n }, _ = (O) => $ ? O.sourceExternalUseCaseId === n : O.sourceExternalTableId === n, A = e.model.boundedContexts.flatMap((O) => O.readModels ?? []).find((O) => O.id === i);
    if (A) {
      (e.model.projections ?? []).some(
        (U) => _(U) && U.readModelId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${re(I)}-${re(A.name)}`,
        name: `${A.name}Projection`,
        ...k,
        targetId: i
      });
      return;
    }
    const N = e.model.boundedContexts.find((O) => O.id === i);
    if (N) {
      (e.model.projections ?? []).some(
        (U) => _(U) && U.boundedContextId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${re(I)}-${re(N.name)}`,
        name: `${I}ViewProjection`,
        ...k,
        boundedContextId: i,
        readModelName: `${I}View`
      });
      return;
    }
    return;
  }
  const T = (e.model.aggregates ?? []).find((I) => I.id === n);
  if (T) {
    const I = e.model.boundedContexts.flatMap((_) => _.readModels ?? []).find((_) => _.id === i);
    if (I) {
      (e.model.projections ?? []).some(
        (A) => A.sourceAggregateId === n && A.readModelId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${re(T.name)}-${re(I.name)}`,
        name: `${I.name}Projection`,
        aggregateId: n,
        targetId: i
      });
      return;
    }
    const k = e.model.boundedContexts.find((_) => _.id === i);
    if (k) {
      (e.model.projections ?? []).some(
        (A) => A.sourceAggregateId === n && A.boundedContextId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${re(T.name)}-${re(k.name)}`,
        name: `${T.name}ViewProjection`,
        aggregateId: n,
        boundedContextId: i,
        readModelName: `${T.name}View`
      });
      return;
    }
  }
  const R = new Set(
    e.model.boundedContexts.flatMap((I) => (I.domainEvents ?? []).map((k) => k.id))
  ), L = /* @__PURE__ */ new Set([
    ...(e.model.aggregates ?? []).map((I) => I.id),
    ...e.model.boundedContexts.flatMap((I) => (I.domainServices ?? []).map((k) => k.id))
  ]), V = new Set(
    e.model.boundedContexts.flatMap((I) => (I.applicationEvents ?? []).map((k) => k.id))
  ), H = new Set(e.model.boundedContexts.flatMap((I) => (I.useCases ?? []).map((k) => k.id))), ae = new Set(
    e.model.boundedContexts.flatMap((I) => (I.queryServices ?? []).map((k) => k.id))
  );
  if (H.has(n) && ae.has(i)) {
    (e.model.queryCalls ?? []).some(
      (k) => k.sourceId === n && k.targetId === i
    ) || e.command({ kind: "add-query-call", sourceId: n, targetId: i });
    return;
  }
  const C = new Set(
    e.model.externalSystems.flatMap((I) => (I.useCases ?? []).map((k) => k.id))
  );
  if (H.has(n) && C.has(i)) {
    (e.model.externalUseCaseCalls ?? []).some(
      (k) => k.sourceId === n && k.targetId === i
    ) || e.command({ kind: "add-external-uc-call", sourceId: n, targetId: i });
    return;
  }
  if (H.has(n) && H.has(i) && n !== i) {
    (e.model.useCaseCalls ?? []).some(
      (k) => k.sourceId === n && k.targetId === i
    ) || e.command({ kind: "add-use-case-call", sourceId: n, targetId: i });
    return;
  }
  const W = e.model.boundedContexts.flatMap((I) => I.scheduledTriggers ?? []).find((I) => I.id === n);
  if (W && H.has(i)) {
    W.useCaseId !== i && e.command({ kind: "set-scheduled-trigger-target", id: n, targetUseCaseId: i });
    return;
  }
  if (H.has(n) && (e.model.aggregates ?? []).some((I) => I.id === i)) {
    (e.model.aggregateCalls ?? []).some(
      (k) => k.sourceId === n && k.targetId === i
    ) || e.command({ kind: "add-aggregate-call", sourceId: n, targetId: i });
    return;
  }
  if (L.has(n) && R.has(i) || H.has(n) && V.has(i)) {
    (e.model.emissions ?? []).some(
      (k) => k.sourceId === n && k.domainEventId === i
    ) || e.command({ kind: "add-emission", sourceId: n, targetId: i });
    return;
  }
  if (R.has(n) || V.has(n)) {
    const I = V.has(n), k = e.model.boundedContexts.flatMap((Y) => (I ? Y.applicationEvents : Y.domainEvents) ?? []).find((Y) => Y.id === n), _ = e.model.boundedContexts.flatMap((Y) => (Y.useCases ?? []).map((J) => ({ u: J, boundedContext: Y }))).find(({ u: Y }) => Y.id === i), A = e.model.boundedContexts.flatMap((Y) => (Y.readModels ?? []).map((J) => ({ rm: J, boundedContext: Y }))).find(({ rm: Y }) => Y.id === i), N = e.model.boundedContexts.find((Y) => Y.id === i) ?? (A == null ? void 0 : A.boundedContext) ?? (_ == null ? void 0 : _.boundedContext);
    if (!k || !N) return;
    const O = new Set((e.model.aggregates ?? []).map((Y) => Y.id)), U = new Set(
      e.model.boundedContexts.flatMap((Y) => (Y.domainServices ?? []).map((J) => J.id))
    ), D = (e.model.emissions ?? []).find(
      (Y) => Y.domainEventId === n && (I ? H.has(Y.sourceId) : O.has(Y.sourceId) || U.has(Y.sourceId))
    );
    if (!D) {
      e.emit("modux-notice", {
        message: I ? `Declara primero qué caso de uso publica ${k.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${k.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
        kind: "info"
      });
      return;
    }
    const X = !I && O.has(D.sourceId);
    if (_) {
      if (e.model.flows.some(
        (J) => J.archetype === "TRIGGERS" && J.triggerEvent === k.name && J.targetUseCaseId === _.u.id
      )) return;
      e.command({
        kind: "add-flow",
        id: `flow-${re(k.name)}-${re(_.u.name)}`,
        name: _.u.name,
        archetype: "TRIGGERS",
        triggerAggregateId: X ? D.sourceId : "",
        triggerDomainServiceId: !I && !X ? D.sourceId : void 0,
        triggerUseCaseId: I ? D.sourceId : void 0,
        triggerEvent: k.name,
        targetId: N.id,
        targetUseCaseId: _.u.id
      });
      return;
    }
    const se = (A == null ? void 0 : A.rm.name) ?? `${k.name}View`;
    if (e.model.flows.some(
      (Y) => Y.archetype === "MATERIALIZES" && Y.triggerEvent === k.name && Y.targetId === N.id && Y.readModelName === se
    )) return;
    e.command({
      kind: "add-flow",
      id: `flow-${re(k.name)}-${re(se)}`,
      name: se,
      archetype: "MATERIALIZES",
      triggerAggregateId: X ? D.sourceId : "",
      triggerDomainServiceId: !I && !X ? D.sourceId : void 0,
      triggerUseCaseId: I ? D.sourceId : void 0,
      triggerEvent: k.name,
      targetId: N.id,
      readModelName: se
    });
    return;
  }
  const G = /* @__PURE__ */ new Set([
    ...L,
    ...H,
    ...ae,
    ...e.model.boundedContexts.flatMap((I) => (I.readModels ?? []).map((k) => k.id))
  ]);
  if (G.has(n) || G.has(i) || R.has(i) || V.has(i))
    return;
  const M = new Set(e.model.externalSystems.map((I) => I.id));
  if (M.has(n)) {
    if (new Set(
      e.model.boundedContexts.flatMap((N) => (N.useCases ?? []).map((O) => O.id))
    ).has(i)) {
      (e.model.externalCalls ?? []).some(
        (O) => O.externalSystemId === n && O.useCaseId === i
      ) || e.command({ kind: "add-external-call", sourceId: n, targetId: i });
      return;
    }
    if (M.has(i) && i !== n) {
      e.openExtDepPicker({ sourceId: n, targetId: i, x: o ?? 0, y: s ?? 0 });
      return;
    }
    const k = (e.model.apis ?? []).find(
      (N) => N.operations.some((O) => O.id === i)
    ), _ = /^apiop:(.+)@(.+)$/.exec(i), A = k ? { operationId: i, siteId: k.id } : _ ? { operationId: _[1], siteId: _[2] } : null;
    if (A) {
      (e.model.externalOperationUses ?? []).some(
        (O) => O.externalSystemId === n && O.operationId === A.operationId && O.siteId === A.siteId
      ) || e.command({
        kind: "add-external-operation-use",
        sourceId: n,
        operationId: A.operationId,
        targetSiteId: A.siteId
      });
      return;
    }
    if ((e.model.apis ?? []).some((N) => N.id === i) || (e.model.proxyApis ?? []).some((N) => N.id === i)) {
      (e.model.externalSystemDependencies ?? []).some(
        (O) => O.sourceId === n && O.targetId === i
      ) || e.command({ kind: "add-external-dependency", sourceId: n, targetId: i });
      return;
    }
    return;
  }
  M.has(i) || h.has(i);
}
function _c(e, t, n, i, o) {
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
    const a = i.slice(5), d = a.indexOf("->");
    d > 0 && (e.clearSelection(), e.command({ kind: "note-detach", id: a.slice(0, d), targetId: a.slice(d + 2) }));
    return;
  }
  if (o === "invariant" || o === "invariant-containment") {
    const a = o === "invariant" ? i : i.replace(/^protects:.+->/, "");
    e.clearSelection(), e.command({ kind: "remove-invariant", id: a });
    return;
  }
  if (t === "eventstorming" && n === "edge" && o === "es-custom") {
    const a = /^escc:(.+)$/.exec(i), d = a ? e.owningUseCaseOf(a[1]) : null;
    a && d && (e.clearSelection(), e.command({ kind: "set-use-case-step-custom-code", useCaseId: d.id, id: a[1], targetId: null }));
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
        const d = _e(a[1]);
        d && e.command({ kind: "set-menu-page", pageId: null, ...d });
      } else if (a = /^menuapp:(.+)->[^>]+$/.exec(i)) {
        const d = _e(a[1]);
        d && e.command({ kind: "set-menu-app", toAppId: null, ...d });
      } else if (a = /^menuuc:(.+)->[^>]+$/.exec(i)) {
        const d = _e(a[1]);
        d && e.command({ kind: "set-menu-use-case", useCaseId: null, ...d });
      } else if (a = /^menuagg:(.+)->[^>]+$/.exec(i)) {
        const d = _e(a[1]);
        d && e.command({ kind: "set-menu-aggregate", aggregateId: null, ...d });
      } else if (a = /^menuqop:(.+)->[^>]+$/.exec(i)) {
        const d = _e(a[1]);
        d && e.command({ kind: "set-menu-query-operation", queryServiceId: null, queryOperationId: null, ...d });
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
      const a = _e(i);
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
    const a = Kn(i);
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
    const d = e.owningWorkflowOf(a[2]);
    if (!d) return;
    e.clearSelection(), e.command({
      kind: "remove-workflow-dependency",
      workflowId: d.id,
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
      const d = e.owningWorkflowOf(a[1]);
      d && (e.clearSelection(), e.command({ kind: "set-workflow-step-role", workflowId: d.id, id: a[1] }));
    }
    return;
  }
  if (t === "workflows" && n === "edge" && o === "wf-form") {
    const a = /^wfform:(.+)->(.+)$/.exec(i);
    if (a) {
      const d = e.owningWorkflowOf(a[1]);
      if (!d) return;
      e.clearSelection(), e.command({ kind: "set-workflow-step-form", workflowId: d.id, id: a[1] });
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
    const [, d, l] = a, u = (s = (e.model.apis ?? []).find(
      (g) => g.operations.some((h) => h.id === d)
    )) == null ? void 0 : s.id;
    if (!u) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation-implementation", apiId: u, operationId: d, boundedContextId: l });
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
    const [, d, l, u] = a, g = /^apiimpl:.+@(.+)$/.exec(u), h = g ? g[1] : u;
    e.clearSelection(), e.command({ kind: "remove-proxy-operation-route", proxyId: l, operationId: d, targetSiteId: h });
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
    const a = e.sceneFor("distribution"), d = (l) => {
      const u = a.nodes.find((g) => g.id === l);
      return u ? u.ownerId ?? u.parentId : void 0;
    };
    for (let l = d(i); l; ) {
      if ((e.model.modules ?? []).some((u) => u.id === l)) {
        e.clearSelection(), e.command({ kind: "remove-module-element", id: l, elementId: i });
        return;
      }
      l = d(l);
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
    const a = /^apiwire:(.+)$/.exec(i), d = a ? e.owningApiOf(a[1]) : null;
    if (!a || !d) return;
    e.clearSelection(), e.command({ kind: "set-api-operation-target", apiId: d.id, id: a[1] });
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
    if (!a || !(e.model.proxyApis ?? []).some((d) => d.id === a[1])) return;
    e.clearSelection(), e.command({ kind: "set-proxy-target", id: a[1], targetId: "" });
    return;
  }
  if (n === "node" && o === "boundedContext") {
    if ((e.model.aggregates ?? []).some((d) => d.boundedContextId === i)) return;
    e.clearSelection(), e.command({ kind: "remove-boundedContext", id: i });
    return;
  }
  if (n === "node" && o === "aggregate") {
    if ((e.model.entities ?? []).some((d) => d.aggregateId === i)) return;
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
const Cc = [
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
], eo = [
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
var Sc = Object.defineProperty, Ec = Object.getOwnPropertyDescriptor, ee = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Ec(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Sc(t, n, o), o;
};
const Xn = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Ac = Object.keys(Xn);
function Rt(e, t, n) {
  const i = n.x - n.w / 2, o = n.x + n.w / 2, s = n.y - n.h / 2, a = n.y + n.h / 2;
  let d = 0, l = 1;
  const u = t.x - e.x, g = t.y - e.y;
  for (const [h, f] of [
    [-u, e.x - i],
    [u, o - e.x],
    [-g, e.y - s],
    [g, a - e.y]
  ]) {
    if (h === 0) {
      if (f < 0) return !1;
      continue;
    }
    const y = f / h;
    if (h < 0) {
      if (y > l) return !1;
      y > d && (d = y);
    } else {
      if (y < d) return !1;
      y < l && (l = y);
    }
  }
  return l - d > 0.02;
}
function Mc(e, t, n = 28) {
  const i = new Map(e.nodes.map((u) => [u.id, u])), o = (u) => {
    var h;
    const g = /* @__PURE__ */ new Set();
    for (let f = u; f; f = (h = i.get(f)) == null ? void 0 : h.parentId) g.add(f);
    return g;
  }, s = e.nodes.filter((u) => u.kind !== "area"), a = (u) => u.parentId ? Math.min(n, 6) : n, d = /* @__PURE__ */ new Map(), l = (u, g, h) => {
    const f = a(h), y = { x: h.x, y: h.y, w: h.w + 2 * f, h: h.h + 2 * f }, w = h.w / 2 + f * 1.5, c = h.h / 2 + f * 1.5, r = { x: h.x - w, y: h.y - c }, m = { x: h.x + w, y: h.y - c }, v = { x: h.x - w, y: h.y + c }, $ = { x: h.x + w, y: h.y + c }, S = [];
    for (const T of [r, m, v, $])
      !Rt(u, T, y) && !Rt(T, g, y) && S.push([T]);
    for (const [T, R] of [
      [r, m],
      [m, r],
      [m, $],
      [$, m],
      [$, v],
      [v, $],
      [v, r],
      [r, v]
    ])
      !Rt(u, T, y) && !Rt(R, g, y) && S.push([T, R]);
    return S;
  };
  for (const u of e.edges) {
    if (t[u.id]) continue;
    const g = i.get(u.sourceId), h = i.get(u.targetId);
    if (!g || !h) continue;
    const f = /* @__PURE__ */ new Set([...o(g.id), ...o(h.id)]), y = [
      { x: g.x, y: g.y },
      { x: h.x, y: h.y }
    ];
    for (let w = 0; w < 12; w++) {
      let c = !1;
      e: for (let r = 0; r < y.length - 1; r++)
        for (const m of s) {
          if (f.has(m.id)) continue;
          const v = a(m), $ = { x: m.x, y: m.y, w: m.w + 2 * v, h: m.h + 2 * v };
          if (!Rt(y[r], y[r + 1], $)) continue;
          const S = l(y[r], y[r + 1], m);
          if (!S.length) continue;
          const T = (L) => s.some(
            (V) => V !== m && !f.has(V.id) && Math.abs(L.x - V.x) < V.w / 2 + a(V) / 2 && Math.abs(L.y - V.y) < V.h / 2 + a(V) / 2
          ), R = (L) => {
            let V = 0;
            const H = [y[r], ...L, y[r + 1]];
            for (let ae = 0; ae < H.length - 1; ae++)
              V += Math.hypot(H[ae + 1].x - H[ae].x, H[ae + 1].y - H[ae].y);
            return V + (L.some(T) ? 1e4 : 0);
          };
          S.sort((L, V) => R(L) - R(V)), y.splice(r + 1, 0, ...S[0]), c = !0;
          break e;
        }
      if (!c) break;
    }
    y.length > 2 && d.set(
      u.id,
      y.slice(1, -1).map((w) => ({ x: Math.round(w.x), y: Math.round(w.y) }))
    );
  }
  return d;
}
function Pc(e, t) {
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
function Tc(e, t) {
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
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !0, this._yugo = !0, this.repositories = [], this.dark = !1, this._pendingIds = /* @__PURE__ */ new Set(), this._paletteOpenedForBlank = !1, this._repoPicker = null, this._wfStepPicker = null, this._branchCondEditor = null, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newBoundedContextId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._armedRelation = null, this._connectPicker = null, this._activeViewId = "", this._activeJourneyId = "", this._newJourneyName = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
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
          this._helpOpen && (this._helpOpen = !1), this._armedRelation && (this._armedRelation = null), this._connectPicker && (this._connectPicker = null);
          break;
      }
    }, this.onMenuSlotRequested = (e) => {
      const { id: t, appId: n, beforeId: i, nestRowId: o } = e.detail, s = _e(t);
      if (!(s != null && s.itemId)) return;
      const a = this.menuEntryIn(s.appId, s.itemId);
      if (!a) return;
      const d = (l, u) => (l ?? []).some((g) => g.id === u || d(g.children, u));
      if (o) {
        const l = _e(o);
        if (!(l != null && l.itemId) || l.itemId === s.itemId || s.appId === l.appId && d(a.entry.children, l.itemId)) return;
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
        const l = _e(i);
        if (!(l != null && l.itemId) || l.itemId === s.itemId) return;
        const u = this.menuEntryIn(l.appId, l.itemId);
        if (!u || s.appId === l.appId && d(a.entry.children, l.itemId) || s.appId === l.appId && u.parentId === a.parentId && a.beforeId === l.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: s.appId,
          toAppId: l.appId,
          itemId: s.itemId,
          parentId: u.parentId ?? void 0,
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
      const d = JSON.parse(JSON.stringify(a.node)), { ops: l } = this.rebuildComponentOps(n, d, o ?? void 0, s);
      for (const u of l) this.command(u, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: i }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: n, componentId: i },
        ...this.rebuildComponentOps(t, d, a.parentId ?? void 0, a.beforeId).ops
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
      const s = io(
        this.model,
        i.startsWith("distribution") ? "distribution" : "unified"
      ), a = /* @__PURE__ */ new Map(), d = (h, f = 0) => {
        if (f > 12) return o.nodes[h] ?? null;
        const y = a.get(h);
        if (y) return y;
        const w = o.nodes[h], c = s.get(h);
        if (!c)
          return w && a.set(h, w), w ?? null;
        if (!w) return null;
        const r = d(c, f + 1), m = r ? { x: r.x + w.x, y: r.y + w.y } : w;
        return a.set(h, m), m;
      }, l = {};
      for (const h of Object.keys(o.nodes))
        l[h] = d(h) ?? o.nodes[h];
      const u = new Set(s.values()), g = { ...o.sizes ?? {} };
      for (const h of Object.keys(g)) u.has(h) && delete g[h];
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
    const i = { ...this.layout }, o = (g) => at(i[g]), s = e.detail ?? "contexts", a = s === "detail" && i["context-map@detail"] ? o("context-map@detail") : s === "operations" && i["context-map@operations"] ? o("context-map@operations") : e, d = {
      nodes: { ...a.nodes },
      edges: { ...a.edges },
      sizes: { ...a.sizes ?? {} }
    };
    for (const g of ["context-map", "context-map@detail", "context-map@operations"]) {
      const h = o(g);
      for (const [f, y] of Object.entries(h.nodes)) f in d.nodes || (d.nodes[f] = y);
      for (const [f, y] of Object.entries(h.sizes ?? {})) f in d.sizes || (d.sizes[f] = y);
    }
    const l = /* @__PURE__ */ new Set();
    if (s === "contexts" || s === "distribution")
      for (const g of e.collapsed ?? []) l.add(g);
    else {
      const g = new Set(a.collapsed ?? []);
      for (const h of this.model.boundedContexts) l.add(h.id);
      for (const h of this.model.externalSystems) l.add(h.id);
      if (s === "operations") {
        for (const h of this.model.apis ?? []) l.add(h.id);
        for (const h of this.model.proxyApis ?? []) l.add(h.id);
        for (const h of this.model.apiImplementations ?? [])
          l.add(`apiimpl:${h.apiId}@${h.boundedContextId}`);
      }
      for (const h of g) l.delete(h);
    }
    i["context-map"] = { nodes: d.nodes, edges: d.edges, sizes: d.sizes, expanded: [...l] };
    const u = i["context-map@distribution"];
    if (u && !i.distribution) {
      const g = at(u);
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
    const n = this.sceneFor(this._view), i = new Set(n.edges.map((d) => d.id)), o = new Set(n.nodes.map((d) => d.id)), s = t.filter((d) => {
      if (i.has(d)) return !1;
      const l = /^(?:[a-z-]+:)?(.+?)->(.+)$/i.exec(d);
      return !!l && o.has(l[1]) && o.has(l[2]);
    });
    if (!s.length) return;
    const a = { ...e.edges };
    s.forEach((d) => delete a[d]), this.writeViewLayout(this._view, { ...e, edges: a });
  }
  /**
   * Expanding a node grows its container over the neighbours: nudge the
   * top-level boxes apart (one undoable step) so the map stays legible.
   * Areas group by overlapping — pushing them apart would defeat them.
   */
  declumpView(e) {
    const t = this.viewLayout(e), n = this.sceneFor(e).nodes.filter((a) => !a.parentId && a.kind !== "area"), i = da(n), o = [...i.keys()].map((a) => ({
      kind: "move-node",
      view: e,
      id: a,
      pos: t.nodes[a] ?? null
    })), s = { ...t.nodes };
    for (const [a, d] of i) {
      const l = n.find((g) => g.id === a), u = t.nodes[a] ?? { x: l.x, y: l.y };
      s[a] = {
        x: Math.round(u.x + (d.x - l.x)),
        y: Math.round(u.y + (d.y - l.y))
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
    var g, h;
    const t = (this.model.journeys ?? []).find((f) => f.id === this._activeJourneyId);
    if (!t || this._view !== "context-map" && this._view !== "integrations") return e;
    const n = new Set(e.nodes.map((f) => f.id)), i = qi(t), o = /* @__PURE__ */ new Set(), s = [];
    for (const f of t.legs ?? [])
      !n.has(f.sourceId) || !n.has(f.targetId) || (o.add(f.sourceId), o.add(f.targetId), s.push({
        id: `journeyleg:${t.id}:${f.id}`,
        sourceId: f.sourceId,
        targetId: f.targetId,
        kind: "journey",
        color: "#d97706",
        arrow: !0,
        label: `${i.get(f.id) ?? ""}${f.label ? ` · ${f.label}` : ""}`,
        tooltip: `Tramo ${i.get(f.id)} de «${t.name}» — Supr lo quita`
      }));
    const a = new Set(o), d = new Map(e.nodes.map((f) => [f.id, f]));
    for (const f of o)
      for (let y = (g = d.get(f)) == null ? void 0 : g.parentId; y; y = (h = d.get(y)) == null ? void 0 : h.parentId) a.add(y);
    const l = new Set(s.map((f) => f.id)), u = Ui(t).map((f) => f.map((y) => `journeyleg:${t.id}:${y}`).filter((y) => l.has(y))).filter((f) => f.length > 0).filter((f, y, w) => w.findIndex((c) => c.join("|") === f.join("|")) === y);
    return {
      nodes: e.nodes.map((f) => a.has(f.id) ? f : { ...f, dim: !0 }),
      edges: [...e.edges.map((f) => ({ ...f, dim: !0 })), ...s],
      journeyRuns: u
    };
  }
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const n = Mc(e, t);
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
    let d = { x: n, y: i };
    const l = this.sceneFor(o), u = l.nodes.find((h) => h.id === t);
    if (u != null && u.parentId) {
      const h = l.nodes.find((f) => f.id === u.parentId);
      h && (d = { x: n - h.x, y: i - h.y });
    }
    this.writeViewLayout(o, { ...s, nodes: { ...s.nodes, [t]: d } });
    const g = [{ kind: "move-node", view: o, id: t, pos: a }];
    if (o === "processes") {
      const h = this.stepReorderCommand(t);
      if (h) {
        const f = this.inverseOf(h);
        f && g.unshift(...f), this.command(h, !1);
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
      const c = n ? this.model.externalSystems.find((L) => L.id === n) : null;
      if (n && !c) return;
      for (let L = c; L; ) {
        if (L.id === t) return;
        const V = L.parentExternalSystemId;
        L = V ? this.model.externalSystems.find((H) => H.id === V) ?? null : null;
      }
      const r = (c == null ? void 0 : c.id) ?? null;
      if ((s.parentExternalSystemId ?? null) === r) return;
      const m = this._view, v = this.viewLayout(m), $ = this.sceneFor(m), S = r ? $.nodes.find((L) => L.id === r) : void 0, T = S ? { x: i - S.x, y: o - S.y } : { x: i, y: o }, R = r ? (this.model.externalSystemDependencies ?? []).filter(
        (L) => L.sourceId === t && L.targetId === r || L.sourceId === r && L.targetId === t
      ) : [];
      this.pushUndoEntry([
        { kind: "set-external-system-parent", id: t, parentId: s.parentExternalSystemId ?? null },
        ...R.map((L) => ({
          kind: "add-external-dependency",
          sourceId: L.sourceId,
          targetId: L.targetId,
          ...L.type === "CQRS" ? { type: "CQRS" } : {}
        })),
        { kind: "move-node", view: m, id: t, pos: v.nodes[t] ?? null }
      ]), this.command({ kind: "set-external-system-parent", id: t, parentId: r }, !1), this.writeViewLayout(m, { ...v, nodes: { ...v.nodes, [t]: T } });
      return;
    }
    const a = (this.model.apis ?? []).find((c) => c.id === t) ?? (this.model.proxyApis ?? []).find((c) => c.id === t);
    if (!a || n && !this.model.externalSystems.some((c) => c.id === n)) return;
    const d = a.publishedByExternalSystemId ?? "", l = n ?? "";
    if (l === d) return;
    const u = this._view, g = this.viewLayout(u), h = this.sceneFor(u), f = l ? h.nodes.find((c) => c.id === l) : void 0, y = f ? { x: i - f.x, y: o - f.y } : { x: i, y: o }, w = [
      { kind: "set-api-publisher", id: t, targetId: d },
      { kind: "move-node", view: u, id: t, pos: g.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: l }, !1), this.writeViewLayout(u, { ...g, nodes: { ...g.nodes, [t]: y } }), this.pushUndoEntry(w);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: n, x: i, y: o } = e.detail, s = (this.model.apis ?? []).find((w) => w.id === t), a = this.model.externalSystems.find((w) => w.id === n);
    if (!s || !a || (this.model.proxyApis ?? []).some(
      (w) => w.targetApiId === t && w.publishedByExternalSystemId === n
    )) return;
    const l = `proxy-${re(s.name)}-${re(a.name)}`;
    if ((this.model.proxyApis ?? []).some((w) => w.id === l)) return;
    const u = this._view, g = this.viewLayout(u), f = this.sceneFor(u).nodes.find((w) => w.id === n);
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
    f && (y.push({ kind: "move-node", view: u, id: l, pos: g.nodes[l] ?? null }), this.writeViewLayout(u, {
      ...g,
      nodes: { ...g.nodes, [l]: { x: i - f.x, y: o - f.y } }
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
    var d, l, u;
    const t = e.target, n = (d = t.files) == null ? void 0 : d[0];
    if (t.value = "", !n) return;
    const i = await n.text(), o = this.selectedApiId(), s = o ? null : ((l = this.model.externalSystems.find((g) => g.id === this._selectedId)) == null ? void 0 : l.id) ?? null, a = o || s ? null : ((u = this.model.boundedContexts.find((g) => g.id === this._selectedId)) == null ? void 0 : u.id) ?? null;
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
    e.startsWith("view:") && (this._view = e.slice(5), this._paletteOpen = !0);
  }
  /** Expansion is a sheet preference (persisted with the vista, not undoable). */
  onNodeCollapseToggled(e) {
    const { id: t } = e.detail, n = this._view, i = this.viewLayout(n), o = new Set(i.expanded ?? []), s = !o.has(t);
    s ? o.add(t) : o.delete(t), this.writeViewLayout(n, { ...i, expanded: [...o] }), s && this.declumpView(n);
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, n = this._view, i = this.viewLayout(n), o = this.sceneFor(n), s = { ...i.nodes }, a = [];
    for (const { id: d, x: l, y: u } of t) {
      a.push({ kind: "move-node", view: n, id: d, pos: i.nodes[d] ?? null });
      let g = { x: l, y: u };
      const h = o.nodes.find((f) => f.id === d);
      if (h != null && h.parentId) {
        const f = o.nodes.find((y) => y.id === h.parentId);
        f && (g = { x: l - f.x, y: u - f.y });
      }
      s[d] = g;
    }
    if (this.writeViewLayout(n, { ...i, nodes: s }), n === "processes")
      for (const { id: d } of t) {
        const l = this.stepReorderCommand(d);
        if (l) {
          const u = this.inverseOf(l);
          u && a.unshift(...u), this.command(l, !1);
        }
      }
    this.pushUndoEntry(a);
  }
  onNodeResized(e) {
    var y;
    const { id: t, x: n, y: i, w: o, h: s } = e.detail, a = this._view, d = this.viewLayout(a), l = this.sceneFor(a), u = l.nodes.find((w) => w.id === t), g = u != null && u.parentId ? l.nodes.find((w) => w.id === u.parentId) : void 0, h = g ? [] : l.nodes.filter((w) => w.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((y = d.sizes) == null ? void 0 : y[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: d.nodes[t] ?? null },
      ...h.map((w) => ({ kind: "move-node", view: a, id: w.id, pos: d.nodes[w.id] ?? null }))
    ]);
    const f = {
      ...d.nodes,
      [t]: g ? { x: n - g.x, y: i - g.y } : { x: n, y: i }
    };
    for (const w of h) f[w.id] = { x: w.x - n, y: w.y - i };
    this.writeViewLayout(a, {
      ...d,
      nodes: f,
      sizes: { ...d.sizes ?? {}, [t]: { w: o, h: s } }
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
    const n = li(this.model, this.viewLayout("processes").nodes), i = new Map(n.nodes.map((a) => [a.id, a.x])), o = [...t.steps].sort(
      (a, d) => (i.get(a.id) ?? 0) - (i.get(d.id) ?? 0)
    );
    if (o.every((a, d) => a.id === t.steps[d].id)) return null;
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
    this.applyConnection(t, n, i, o, s), this._armedRelation && (this._armedRelation = null);
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
    return kc(this.gestureHost(), e);
  }
  applyConnection(e, t, n, i, o) {
    ut(this.gestureHost(), this._view, e, t, n, i, o);
  }
  performDelete(e, t, n) {
    _c(this.gestureHost(), this._view, e, t, n);
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
      armedRelation: this._armedRelation,
      openConnectPicker: (e) => {
        this._connectPicker = e;
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
      id: `step-${re(e)}`,
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
      id: `wfstep-${re(e)}`,
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
    const t = qi(e);
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
    const t = `tr-${re(e)}`;
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
    const t = new Set(e.memberIds), n = (o, s, a = {}) => E`
      <label
        class="${a.child ? "child" : ""} ${a.implicit && !t.has(o) ? "implicit" : ""}"
        title=${a.implicit && !t.has(o) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(o)}
          @change=${(d) => this.toggleViewMember(o, d.target.checked)}
        />
        ${s}
      </label>
    `, i = (o, s) => s.length ? E`<h4>${o}</h4>${s}` : "";
    return E`
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
            const o = _e(n);
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
    const i = `view-${re(e)}`;
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
    ), d = new Set(a.map((y) => y.id)), l = (this.model.uiApps ?? []).filter((y) => t.has(y.id)), u = /* @__PURE__ */ new Set(), g = (y) => {
      for (const w of y ?? [])
        w.pageId && u.add(w.pageId), g(w.children);
    };
    l.forEach((y) => g(y.menuItems));
    const h = (this.model.pages ?? []).filter(
      (y) => t.has(y.id) || u.has(y.id)
    ), f = new Set(l.map((y) => y.id));
    return {
      ...this.model,
      uiApps: l,
      pages: h,
      actorAppUses: (this.model.actorAppUses ?? []).filter((y) => f.has(y.appId)),
      boundedContexts: n,
      externalSystems: o,
      relations: this.model.relations.filter(
        (y) => i.has(y.sourceId) && i.has(y.targetId)
      ),
      flows: this.model.flows.filter(
        (y) => t.has(y.id) || (i.has(y.sourceId) || s.has(y.sourceId)) && (i.has(y.targetId) || s.has(y.targetId))
      ),
      aggregates: a,
      entities: (this.model.entities ?? []).filter((y) => d.has(y.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (y) => d.has(y.sourceAggregateId) && d.has(y.targetAggregateId)
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
    const t = e.detail.kind === "process-step" ? Tc(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Pc(e.detail.id, e.detail.kind);
    t && this.openInDrawer(t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), n = (s) => {
      for (const a of s ?? [])
        a.id && t.add(a.id), n(a.children);
    };
    (this.model.uiApps ?? []).forEach((s) => n(s.menuItems));
    const i = `mi-${re(e)}`;
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
      const d = s ?? [];
      for (let u = 0; u < d.length; u++)
        d[u].id === t && (i = { node: d[u], parentId: a, beforeId: ((l = d[u + 1]) == null ? void 0 : l.id) ?? null }), o(d[u].children, d[u].id);
    };
    return o(n == null ? void 0 : n.content, null), i;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, n, i, o = !1, s) {
    const a = s ?? this.allComponentIds(), d = (h) => {
      if (!o) return h.id;
      const f = `cmp-${re(h.kind)}`;
      let y = f;
      for (let w = 2; a.has(y) || a.has(`${y}-tab-1`); w++) y = `${f}-${w}`;
      return a.add(y), y;
    }, l = [], u = (h, f) => {
      const y = d(h);
      l.push({ kind: "add-page-component", pageId: e, componentId: y, componentKind: h.kind, parentComponentId: f }), h.kind === "tabLayout" && (l.push({ kind: "remove-page-component", pageId: e, componentId: `${y}-tab-1` }), l.push({ kind: "remove-page-component", pageId: e, componentId: `${y}-tab-2` })), l.push({
        kind: "set-page-component",
        pageId: e,
        componentId: y,
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
      for (const w of h.children ?? []) u(w, y);
      return y;
    }, g = u(t, n);
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
    const i = `cmp-${re(e)}`;
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
      const d = s ?? [];
      for (let u = 0; u < d.length; u++)
        d[u].id === t && (i = { entry: d[u], parentId: a, beforeId: ((l = d[u + 1]) == null ? void 0 : l.id) ?? null }), o(d[u].children, d[u].id ?? null);
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
      const d = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!d) return;
      t = this._selectedCmp.pageId, pe.LEAF_KINDS.has(d.node.kind) ? (n = d.parentId ?? void 0, i = d.beforeId) : n = d.node.kind === "tabLayout" && e.kind !== "tab" ? (a = (d.node.children ?? [])[0]) == null ? void 0 : a.id : d.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((d) => d.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: o, rootId: s } = this.rebuildComponentOps(t, e, n, i, !0);
    for (const d of o) this.command(d, !1);
    this.pushUndoEntry([{ kind: "remove-page-component", pageId: t, componentId: s }]), this._selectedCmp = { pageId: t, componentId: s };
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
    var d;
    const t = (d = e.dataTransfer) == null ? void 0 : d.getData("application/x-modux-palette");
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
      const s = o === 1 ? e : `${e} ${o}`, a = `${t}${re(s)}`;
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
    ].includes(e)) return n.find((a) => this.model.boundedContexts.some((d) => d.id === a)) ?? null;
    if (e === "invariant") {
      const a = n.find((l) => (this.model.aggregates ?? []).some((u) => u.id === l));
      if (a) return a;
      const d = n.find((l) => this.model.boundedContexts.some((u) => u.id === l));
      return ((o = (this.model.aggregates ?? []).find((l) => l.boundedContextId === d)) == null ? void 0 : o.id) ?? null;
    }
    if (e === "read-model") {
      const a = n.find((l) => (this.model.aggregates ?? []).some((u) => u.id === l));
      if (a) return a;
      const d = n.find((l) => this.model.boundedContexts.some((u) => u.id === l));
      return ((s = (this.model.aggregates ?? []).find((l) => l.boundedContextId === d)) == null ? void 0 : s.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return n.find((a) => this.model.externalSystems.some((d) => d.id === a)) ?? null;
    if (e === "model-field")
      return n.find((a) => (this.model.models ?? []).some((d) => d.id === a)) ?? null;
    if (e === "etl-flow" && this._view === "integrations" && this.model.boundedContexts.length === 1)
      return this.model.boundedContexts[0].id;
    if (e === "ui-button")
      return n.find((a) => (this.model.buttonGroups ?? []).some((d) => d.id === a)) ?? null;
    if (e === "use-case-step")
      return n.find(
        (a) => this.model.boundedContexts.some((d) => (d.useCases ?? []).some((l) => l.id === a))
      ) ?? null;
    if (e === "api-operation") {
      for (const a of n) {
        if ((this.model.apis ?? []).some((u) => u.id === a)) return a;
        const d = /^apiimpl:(.+)@(.+)$/.exec(a);
        if (d && (this.model.apis ?? []).some((u) => u.id === d[1])) return d[1];
        const l = (this.model.proxyApis ?? []).find((u) => u.id === a);
        if (l != null && l.targetApiId) return l.targetApiId;
      }
      return null;
    }
    return e === "api" ? n.find((a) => this.model.externalSystems.some((d) => d.id === a)) ?? n.find((a) => this.model.boundedContexts.some((d) => d.id === a)) ?? null : null;
  }
  createFromPalette(e, t, n, i = null) {
    var y, w;
    const o = eo.find((c) => c.type === e);
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
      const c = n ? /^cmp:([^:]+):(.+)$/.exec(n) : null, r = c ? c[1] : n && (this.model.pages ?? []).some(($) => $.id === n) ? n : null;
      if (!r) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: m, name: v } = this.uniquePaletteName("Custom code", "cc-");
      this.command({ kind: "add-custom-code", id: m, name: v }, !1), c ? (this.command({ kind: "set-page-component-custom-code", pageId: r, componentId: c[2], targetId: m }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: r, targetId: m }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const c = e.slice(4), r = n ? /^cmp:([^:]+):(.+)$/.exec(n) : null, m = r ? r[1] : n && (this.model.pages ?? []).some((R) => R.id === n) ? n : null;
      if (!m) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let v = r ? r[2] : void 0, $ = null;
      if (c === "tab") {
        let R = null, L = v ? this.componentIn(m, v) : null;
        for (; L; ) {
          if (L.node.kind === "tabLayout") {
            R = L.node.id;
            break;
          }
          L = L.parentId ? this.componentIn(m, L.parentId) : null;
        }
        if (!R) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const V = this.componentIn(m, R).node, H = this.newComponentId("tab"), ae = `Pestaña ${(V.children ?? []).filter((C) => C.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: m, componentId: H, componentKind: "tab", parentComponentId: R }, !1), this.command({ kind: "set-page-component", pageId: m, componentId: H, title: ae }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: m, componentId: H }]);
        return;
      }
      if (i != null && i.componentId && i.pos !== "into") {
        const R = this.componentIn(m, i.componentId);
        R && R.node.kind === "tab" ? v = R.node.id : R && (v = R.parentId ?? void 0, $ = i.pos === "before" ? i.componentId : R.beforeId);
      } else if (v) {
        const R = ((y = this.componentIn(m, v)) == null ? void 0 : y.node) ?? null;
        (R == null ? void 0 : R.kind) === "tabLayout" && (R.children ?? [])[0] && (v = (R.children ?? [])[0].id);
      }
      const S = this.newComponentId(c), T = {
        kind: "add-page-component",
        pageId: m,
        componentId: S,
        componentKind: c,
        parentComponentId: v
      };
      if (!$) {
        this.command(T);
        return;
      }
      this.command(T, !1), this.command(
        { kind: "move-page-component", pageId: m, componentId: S, parentComponentId: v ?? null, beforeComponentId: $ },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: m, componentId: S }]);
      return;
    }
    const s = this._view, a = this.sceneFor(s), d = (c, r) => {
      this.purgeNodeGeometry(c);
      const m = this.viewLayout(s), v = r ? a.nodes.find((S) => S.id === r) : void 0, $ = v ? { x: Math.round(t.x - v.x), y: Math.round(t.y - v.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...m, nodes: { ...m.nodes, [c]: $ } }), { kind: "move-node", view: s, id: c, pos: null };
    }, l = (c, r, m) => {
      const v = this.inverseOf(c) ?? [];
      this.command(c, !1);
      const $ = d(r, m);
      this.pushUndoEntry([...v, $]);
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
      }, { id: r, name: m } = this.uniquePaletteName(o.label, c[e] ?? ""), v = e === "boundedContext" ? { kind: "add-boundedContext", id: r, name: m, subdomainType: "SUPPORTING" } : e === "note" ? { kind: "add-note", id: r, name: m } : e === "area" ? { kind: "add-area", id: r, name: m } : e === "actor" ? { kind: "add-actor", id: r, name: m } : e === "external-system" ? { kind: "add-external-system", id: r, name: m } : e === "ai-agent" ? { kind: "add-ai-agent", id: r, name: m } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: r, name: m, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: r, name: m } : e === "rag" ? { kind: "add-rag", id: r, name: m } : e === "api" ? { kind: "add-api", id: r, name: m } : e === "proxy-api" ? { kind: "add-proxy-api", id: r, name: m } : e === "ui-app" ? { kind: "create-ui-app", id: r, name: m } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: r, name: m, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: r, name: m, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: r, name: m, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: r, name: m } : e === "transformation" ? { kind: "add-transformation", id: r, name: m } : e === "custom-code" ? { kind: "add-custom-code", id: r, name: m } : e === "button-group" ? { kind: "add-button-group", id: r, name: m } : e === "identity-provider" ? { kind: "add-identity-provider", id: r, name: m } : e === "service" ? { kind: "add-service", id: r, name: m } : {
        kind: "add-workflow",
        id: r,
        name: m,
        completionEventName: `${m.replace(/\s+/g, "")}Completado`
      };
      if (v.kind === "create-ui-app") {
        const S = this.dropChain(n).find((T) => this.model.boundedContexts.some((R) => R.id === T));
        if (S) {
          l({ ...v, boundedContextId: S }, r);
          return;
        }
      }
      if (v.kind === "add-external-system") {
        const S = this.dropChain(n).find((T) => this.model.externalSystems.some((R) => R.id === T));
        if (S) {
          l({ ...v, parentId: S }, r), this.emit("modux-notice", { message: "Subsistema creado como parte del sistema" });
          return;
        }
      }
      l(v, r);
      return;
    }
    if (e === "ui-wizard-step") {
      const r = this.dropChain(n).map((S) => {
        var T;
        return ((T = /^wizrow:([^:]+):/.exec(S)) == null ? void 0 : T[1]) ?? S;
      }).find((S) => (this.model.pages ?? []).some((T) => T.id === S && T.type === "WIZARD"));
      if (!r) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const m = ((w = (this.model.pages ?? []).find((S) => S.id === r)) == null ? void 0 : w.wizardSteps) ?? [], v = new Set(m.map((S) => S.id ?? S.pageId));
      let $ = m.length + 1;
      for (; v.has(`wzs-${$}`); ) $++;
      this.command({ kind: "add-page-wizard-step", pageId: r, itemId: `wzs-${$}`, label: `Paso ${$}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const c = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", r = c === "CRUD" ? "CRUD" : c === "WIZARD" ? "Wizard" : "Página", { id: m, name: v } = this.uniquePaletteName(r, "page-"), $ = this.dropChain(n), S = $.find((R) => (this.model.uiApps ?? []).some((L) => L.id === R)), T = $.map((R) => {
        var L;
        return ((L = /^wizrow:([^:]+):/.exec(R)) == null ? void 0 : L[1]) ?? R;
      }).find((R) => (this.model.pages ?? []).some((L) => L.id === R && L.type === "WIZARD"));
      if (T) {
        const R = a.nodes.find((V) => V.id === T);
        R && (t.x = R.x + R.w / 2 + 160, t.y = R.y - R.h / 2 + 40), this.command({ kind: "create-ui-page", id: m, name: v, pageType: c }, !1), this.command({ kind: "add-page-wizard-step", pageId: T, targetId: m }, !1);
        const L = d(m);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: m }, L]), this.emit("modux-notice", { message: `${v} creada como paso del wizard` });
        return;
      }
      if (S) {
        const R = a.nodes.find((L) => L.id === S);
        R && (t.x = R.x + R.w / 2 + 160, t.y = R.y - R.h / 2 + 40);
      }
      l(
        S ? { kind: "create-ui-page", id: m, name: v, pageType: c, appId: S, menuLabel: v } : { kind: "create-ui-page", id: m, name: v, pageType: c },
        m
      );
      return;
    }
    if (e === "menu-item") {
      const c = this.dropChain(n), r = c.find((T) => (this.model.uiApps ?? []).some((R) => R.id === T));
      if (!r) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const m = /* @__PURE__ */ new Set(), v = (T) => {
        for (const R of T ?? [])
          m.add(R.label), v(R.children);
      };
      (this.model.uiApps ?? []).forEach((T) => v(T.menuItems));
      let $ = "Entrada";
      for (let T = 2; m.has($); T++) $ = `Entrada ${T}`;
      const S = c.map((T) => _e(T)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: r,
        label: $,
        itemId: this.newMenuItemId($),
        parentId: S == null ? void 0 : S.itemId,
        parentLabel: S != null && S.itemId || S == null ? void 0 : S.label
      });
      return;
    }
    if (e === "etl-transform") {
      const r = this.dropChain(n).map(($) => (this.model.etlFlows ?? []).find((S) => S.id === $)).find(Boolean);
      if (!r) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const m = new Set((r.steps ?? []).map(($) => $.id));
      let v = (r.steps ?? []).length + 1;
      for (; m.has(`ets-${v}`); ) v++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: r.id,
        id: `ets-${v}`,
        name: `Transformación ${v}`,
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
      const { id: c, name: r } = this.uniquePaletteName(e === "workflow-join" ? "Join" : "Split", "wfg-");
      l({
        kind: "add-workflow-gateway",
        id: c,
        name: r,
        stepType: e === "workflow-join" ? "JOIN" : "SPLIT"
      }, c), this.emit("modux-notice", {
        message: "Gateway creado suelto — sus líneas dirán de qué workflow es (join: n entradas → 1 salida; split: 1 → n)"
      });
      return;
    }
    if (e === "workflow-step") {
      const r = this.model.workflows ?? [], m = this.dropChain(n), v = m.map((L) => r.find((V) => V.id === L)).find(Boolean), $ = m.map((L) => {
        const V = r.find((H) => (H.steps ?? []).some((ae) => ae.id === L));
        return V ? { owner: V, stepId: L } : null;
      }).find(Boolean);
      let S = v ?? ($ == null ? void 0 : $.owner);
      if (!S && r.length === 1 && (S = r[0]), !S) {
        if (!r.length) {
          this.emit("modux-notice", { message: "Crea antes un workflow: los pasos viven en uno" });
          return;
        }
        this._wfStepPicker = { pos: t, stepType: void 0 };
        return;
      }
      const { id: T, name: R } = this.uniquePaletteName(
        "Paso",
        "wfs-"
      );
      $ && (t = { x: t.x + 190, y: t.y }), l(
        {
          kind: "add-workflow-step",
          workflowId: S.id,
          id: T,
          name: R,
          ...$ ? { dependsOnStepIds: [$.stepId], afterStepId: $.stepId } : {}
        },
        T
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${S.name} — se ve en la vista Workflows`
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
      const { id: r, name: m } = this.uniquePaletteName("API", "api-"), v = { kind: "add-api", id: r, name: m }, $ = this.inverseOf(v) ?? [];
      this.command(v, !1), this.model.externalSystems.some((L) => L.id === c) ? this.command({ kind: "set-api-publisher", id: r, targetId: c }, !1) : this.command({ kind: "add-api-implementation", apiId: r, boundedContextId: c }, !1);
      const S = this.viewLayout(this._view), T = this.sceneFor(this._view).nodes.find((L) => L.id === c), R = T ? { x: Math.round(t.x - T.x), y: Math.round(t.y - T.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...S, nodes: { ...S.nodes, [r]: R } }), this.pushUndoEntry([...$, { kind: "move-node", view: this._view, id: r, pos: null }]);
      return;
    }
    const u = this.dropContainerFor(e, n);
    if (!u) {
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
    }, { id: h, name: f } = this.uniquePaletteName(o.label, g[e] ?? "");
    if (e === "aggregate")
      l({ kind: "add-aggregate", id: h, name: f, boundedContextId: u }, h, u);
    else if (e === "invariant")
      this.command({ kind: "add-invariant", aggregateId: u, id: h, name: f }), this.emit("modux-notice", {
        message: "Invariante declarado en el agregado — sus condiciones se detallan en la ficha del agregado"
      });
    else if (e === "ui-button") {
      const c = (this.model.buttonGroups ?? []).find((v) => v.id === u), r = new Set(((c == null ? void 0 : c.buttons) ?? []).map((v) => v.id));
      let m = ((c == null ? void 0 : c.buttons) ?? []).length + 1;
      for (; r.has(`btn-${m}`); ) m++;
      this.command({ kind: "add-group-button", id: u, itemId: `btn-${m}`, label: f }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: u, fieldId: h, name: f });
    else if (e === "module")
      l({ kind: "add-module", id: h, name: f, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      l(
        { kind: "add-use-case", id: h, name: f, boundedContextId: u, ...e === "policy" ? { policy: !0 } : {} },
        h,
        u
      );
    else if (e === "domain-event")
      l({ kind: "add-domain-event", id: h, name: f, boundedContextId: u }, h, u);
    else if (e === "application-event")
      l({ kind: "add-application-event", id: h, name: f, boundedContextId: u }, h, u);
    else if (e === "domain-service")
      l({ kind: "add-domain-service", id: h, name: f, boundedContextId: u }, h, u);
    else if (e === "query-service")
      l({ kind: "add-query-service", id: h, name: f, boundedContextId: u }, h, u);
    else if (e === "scheduled-trigger")
      l({ kind: "add-scheduled-trigger", id: h, name: f, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      l({ kind: "add-notification", id: h, name: f, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      l({ kind: "add-document", id: h, name: f, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      l({ kind: "add-etl-flow", id: h, name: f, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const c = (this.model.aggregates ?? []).find((r) => r.id === u);
      l({ kind: "add-read-model", id: h, name: f, aggregateId: u }, h, (c == null ? void 0 : c.boundedContextId) ?? u);
    } else if (e === "api-operation") {
      const c = (this.model.apis ?? []).find((S) => S.id === u), r = new Set(((c == null ? void 0 : c.operations) ?? []).map((S) => S.id));
      let m = f, v = `apiop-${u.replace(/^api-/, "")}-${re(m)}`;
      for (let S = 2; r.has(v); S++)
        m = `${o.label} ${S}`, v = `apiop-${u.replace(/^api-/, "")}-${re(m)}`;
      l({ kind: "add-api-operation", apiId: u, id: v, name: m }, v, u), a.nodes.some(
        (S) => S.parentId === u && (S.kind === "api-operation" || S.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(c == null ? void 0 : c.name) ?? u} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const c = this.model.boundedContexts.flatMap(($) => $.useCases ?? []).find(($) => $.id === u), r = new Set((c == null ? void 0 : c.stepIds) ?? []);
      let m = f, v = `step-${re(m)}`;
      for (let $ = 2; r.has(v); $++)
        m = `${o.label} ${$}`, v = `step-${re(m)}`;
      l({ kind: "add-use-case-step", useCaseId: u, id: v, name: m }, v, u), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(c == null ? void 0 : c.name) ?? u} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? l({ kind: "add-external-use-case", id: h, name: f, boundedContextId: u }, h, u) : e === "external-table" ? l({ kind: "add-external-table", id: h, name: f, boundedContextId: u }, h, u) : e === "mcp-server" && l({ kind: "add-mcp-server", id: h, name: f, boundedContextId: u }, h, u);
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  /**
   * A catalog element dropped on the Diseño surface WIRES the declaration: a use case
   * on a button (its action), a model on a form or the frame (the viewmodel), a query
   * operation on a listing or the frame (what it lists). The map's connect gesture,
   * spelled for pages.
   */
  dropCatalogOnDesign(e, t, n) {
    var f;
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
      const w = this.model.boundedContexts.flatMap((c) => c.useCases ?? []).find((c) => c.id === e);
      if (w) {
        if (e === i[2]) return;
        const c = (this.model.pages ?? []).find((m) => m.id === i[1]), r = ((c == null ? void 0 : c.buttons) ?? []).find((m) => m.useCaseId === i[2]);
        if (!r) return;
        if (((c == null ? void 0 : c.buttons) ?? []).some((m) => m.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: i[1], useCaseId: i[2] }, !1), this.command(
          { kind: "add-page-button", pageId: i[1], useCaseId: e, label: r.label, type: r.bar },
          !1
        ), r.mappingId && this.command(
          { kind: "set-page-button", pageId: i[1], useCaseId: e, label: null, mappingId: r.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: i[1], useCaseId: e },
          { kind: "add-page-button", pageId: i[1], useCaseId: i[2], label: r.label, type: r.bar },
          ...r.mappingId ? [{ kind: "set-page-button", pageId: i[1], useCaseId: i[2], label: null, mappingId: r.mappingId }] : []
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${w.name}` });
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
      const w = (this.model.pages ?? []).find((c) => c.id === o[1]);
      if (((w == null ? void 0 : w.buttons) ?? []).some((c) => c.useCaseId === e)) {
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
    const d = s ? ((f = this.componentIn(a, s[2])) == null ? void 0 : f.node) ?? null : null, l = this.model.boundedContexts.flatMap((y) => y.useCases ?? []).find((y) => y.id === e);
    if (l) {
      (d == null ? void 0 : d.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: a, componentId: d.id, useCaseId: e, label: d.label ?? l.name }), this.emit("modux-notice", { message: `El botón lanza ${l.name}` })) : (this.command({ kind: "add-page-button", pageId: a, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${l.name} añadido a la página` }));
      return;
    }
    const u = (this.model.models ?? []).find((y) => y.id === e);
    if (u) {
      (d == null ? void 0 : d.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: a, componentId: d.id, modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${u.name}` })) : (this.command({ kind: "set-page-model", pageId: a, modelId: e }), this.emit("modux-notice", { message: `${u.name} es el viewmodel de la página` }));
      return;
    }
    const g = (this.model.modelMappings ?? []).find((y) => y.id === e);
    if (g && (d == null ? void 0 : d.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: a, componentId: d.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${g.name}` });
      return;
    }
    const h = this.model.boundedContexts.flatMap((y) => (y.queryServices ?? []).flatMap((w) => (w.operations ?? []).map((c) => ({ op: c, qs: w })))).find(({ op: y }) => y.id === e);
    if (h) {
      (d == null ? void 0 : d.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: a,
        componentId: d.id,
        queryOperationId: h.op.id,
        queryServiceId: h.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: a, queryServiceId: h.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${h.op.name}` });
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
    const a = this._view, d = this.sceneFor(a), l = d.nodes.find((f) => f.id === e);
    if (!l) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const f = this.viewLayout(a);
        this.writeViewLayout(a, {
          ...f,
          nodes: { ...f.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const u = this.viewLayout(a), g = l.parentId ? d.nodes.find((f) => f.id === l.parentId) : void 0, h = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: a, id: e, pos: u.nodes[e] ?? null }]), this.writeViewLayout(a, { ...u, nodes: { ...u.nodes, [e]: h } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "distribution", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = eo.filter(
      (o) => (this._view === "workflows" ? ["workflow", "workflow-step", "workflow-join", "workflow-split"].includes(o.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(o.type) : this._view === "design" ? o.type === "page" || o.type === "custom-code" || o.type.startsWith("cmp:") : this._view === "integrations" ? ["etl-flow", "etl-transform", "external-system", "external-table"].includes(o.type) : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(o.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(o.type) && !o.type.startsWith("cmp:")) && (!e || o.label.toLowerCase().includes(e))
    ), n = ["context-map", "distribution", "integrations"].includes(this._view), i = this._view === "workflows" || this._paletteTab === "relations" && !n ? "new" : this._paletteTab;
    return E`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(o) => this._paletteFilter = o.target.value}
          />
          ${i === "relations" ? E`
                <div class="palette-h">Relaciones — arma y traza</div>
                <div class="palette-g">Click arma el tipo; la siguiente línea será esa relación (Esc cancela). Sin armar, la línea pregunta cuando hay varias posibles.</div>
                ${zo.filter(
      (o) => !e || o.label.toLowerCase().includes(e)
    ).map(
      (o) => E`
                    <div
                      class="palette-item ${this._armedRelation === o.id ? "armed" : ""}"
                      title="${o.hint} — click para armar; la siguiente línea que traces será esta relación (Esc cancela)"
                      @click=${() => this._armedRelation = this._armedRelation === o.id ? null : o.id}
                    >
                      <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${this._armedRelation === o.id ? "#2563eb" : "#64748b"}">
                        ${ht.flow}
                      </svg>
                      <span class="pal-label">${o.label}</span>
                    </div>
                  `
    )}
              ` : i === "new" ? E`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${Cc.map((o) => {
      const s = t.filter((a) => a.group === o);
      return s.length ? E`
                        <div class="palette-g">${o}</div>
                        ${s.map(
        (a) => E`
                            <div
                              class="palette-item ${a.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${a.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : a.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(d) => this.onPaletteDragStart(d, { new: a.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${a.color}">
                                ${ht[a.symbol]}
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
      (o) => E`
                    <div class="palette-g">${o.label}</div>
                    ${o.items.map(
        (s) => E`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(a) => this.onPaletteDragStart(a, { existing: s.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${o.color}">
                            ${ht[o.symbol]}
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
                ${n ? E`
                      <button
                        class="palette-vtab"
                        ?data-active=${i === "relations"}
                        title="Tipos de relación: arma uno y traza la línea"
                        @click=${() => this._paletteTab = "relations"}
                      >
                        Relaciones
                      </button>
                    ` : ""}
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
    var t, n, i, o, s, a, d;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const l = this._newBoundedContextId || ((t = this.model.boundedContexts[0]) == null ? void 0 : t.id);
        if (!l) return;
        this.command({ kind: "add-aggregate", id: `agg-${re(e)}`, name: e, boundedContextId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id), u = this._newTargetId || ((o = this.model.boundedContexts[0]) == null ? void 0 : o.id), g = this._newTriggerEvent.trim();
        if (!l || !u || !g) return;
        this.command({
          kind: "add-flow",
          id: `flow-${re(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: l,
          triggerEvent: g,
          targetId: u
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const l = this._newBoundedContextId || ((s = this.model.boundedContexts[0]) == null ? void 0 : s.id);
        if (!l) return;
        this.command({
          kind: "add-process",
          id: `proc-${re(e)}`,
          name: e,
          boundedContextId: l,
          triggerAggregateId: this._newTriggerAggId || ((d = (a = this.model.aggregates) == null ? void 0 : a[0]) == null ? void 0 : d.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e, t) {
    const n = this.viewLayout(e), i = this.filteredModel(), o = (t == null ? void 0 : t.expandAll) ?? !1, s = e === "aggregates" ? Ea(i, n.nodes) : e === "flows" ? Da(i, n.nodes) : e === "processes" ? li(i, n.nodes) : e === "workflows" ? Kl(i, n.nodes, new Set(n.expanded ?? []), o) : e === "ui" ? tc(i, n.nodes, new Set(n.expanded ?? []), o) : e === "design" ? { nodes: [], edges: [] } : e === "integrations" ? ac(i, n.nodes) : e === "mappings" ? nc(i, n.nodes) : e === "eventstorming" ? Fl(i, n.nodes, new Set(n.expanded ?? []), o) : e === "distribution" ? va(i, n.nodes, n.sizes ?? {}, new Set(n.expanded ?? []), o) : xa(i, n.nodes, n.sizes ?? {}, new Set(n.expanded ?? []), o);
    if (e !== "design" && (this.withAreas(s, e), this.withNotes(s, e)), this.diff)
      for (const a of s.nodes) {
        const d = this.diff[a.id] ?? this.diff[a.id.replace(/^(tgt:|flow:)/, "")];
        d && (a.diffKind = d);
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
    for (const d of n) {
      const l = i.nodes[d.id];
      l && e.nodes.unshift({
        id: d.id,
        label: d.name,
        kind: "area",
        x: l.x,
        y: l.y,
        w: ((s = o[d.id]) == null ? void 0 : s.w) ?? 340,
        h: ((a = o[d.id]) == null ? void 0 : a.h) ?? 220,
        fill: "rgba(148, 163, 184, 0.07)",
        stroke: "#94a3b8",
        dashed: !0,
        tooltip: d.name,
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
    var d, l;
    const n = this.model.notes ?? [];
    if (!n.length) return;
    const i = this.viewLayout(t), o = new Set(e.nodes.map((u) => u.id)), s = new Set(e.edges.map((u) => u.id)), a = i.sizes ?? {};
    for (const u of n) {
      const g = i.nodes[u.id], h = (r) => o.has(r) ? r : o.has(`tgt:${r}`) ? `tgt:${r}` : o.has(`flow:${r}`) ? `flow:${r}` : null, f = (u.targetIds ?? []).map((r) => ({ raw: r, nodeId: h(r) })).filter((r) => !!r.nodeId), y = (u.edgeRefs ?? []).filter((r) => s.has(r));
      if (!g && !f.length && !y.length) continue;
      const w = f.length ? e.nodes.find((r) => r.id === f[0].nodeId) : void 0, c = g ?? { x: ((w == null ? void 0 : w.x) ?? 0) + 40, y: ((w == null ? void 0 : w.y) ?? 0) - 110 };
      e.nodes.push({
        id: u.id,
        label: u.text,
        kind: "note",
        x: c.x,
        y: c.y,
        w: ((d = a[u.id]) == null ? void 0 : d.w) ?? 150,
        h: ((l = a[u.id]) == null ? void 0 : l.h) ?? 72,
        fill: "#fef9c3",
        symbol: "note",
        resizable: !0
      });
      for (const r of f)
        e.edges.push({
          id: `note:${u.id}->${r.raw}`,
          sourceId: u.id,
          targetId: r.nodeId,
          kind: "note-link",
          dashed: !0,
          color: "#ca8a04"
        });
      for (const r of y)
        e.edges.push({
          id: `note:${u.id}->${r}`,
          sourceId: u.id,
          targetId: `edgeanchor:${r}`,
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
    const n = t.nodes.filter((u) => !u.parentId && u.kind !== "area"), i = new Set(n.map((u) => u.id)), o = {
      nodes: n,
      edges: t.edges.filter((u) => i.has(u.sourceId) && i.has(u.targetId))
    }, a = await sc(o, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), d = this.viewLayout(e);
    this.pushUndoEntry([
      ...n.map((u) => ({
        kind: "move-node",
        view: e,
        id: u.id,
        pos: d.nodes[u.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(d.edges).map((u) => ({
        kind: "set-edge-points",
        view: e,
        id: u,
        points: d.edges[u]
      }))
    ]), this.writeViewLayout(e, { nodes: a, edges: {}, sizes: d.sizes }), await this.updateComplete, (l = this.renderRoot.querySelector("modux-canvas")) == null || l.fit();
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
    return E`
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
      (t) => E`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
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
      (t) => E`<option value=${t.id} ?selected=${t.id === this._activeJourneyId}>
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
        ${this.viewSelection().length || !this._activeViewId && (this._view === "context-map" || this._view === "distribution") ? E`
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
        ${this._view === "aggregates" || this._view === "processes" ? E`<select
              title=${this._view === "aggregates" ? "Contexto del nuevo agregado" : "Contexto dueño del proceso"}
              @change=${(t) => this._newBoundedContextId = t.target.value}
            >
              ${this.model.boundedContexts.map(
      (t) => {
        var n;
        return E`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newBoundedContextId || ((n = this.model.boundedContexts[0]) == null ? void 0 : n.id))}
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
        var n, i;
        return E`<option
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
              ${this._view === "flows" ? E`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.boundedContexts, ...this.model.externalSystems].map(
      (t) => {
        var n;
        return E`<option
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
                ${this.model.boundedContexts.flatMap((t) => t.useCases ?? []).map(
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
                      ${this.model.boundedContexts.flatMap((t) => t.useCases ?? []).map(
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
        ${this._view === "workflows" && ((this.model.processes ?? []).length || (this.model.sagas ?? []).length) ? E`<button
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
      ${this._view === "design" ? E`${this.renderPalette()}${this.renderFigma()}` : this._yugo ? E`${this.renderPalette()}<modux-explorer
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
      const { sourceId: n, targetId: i, x: o, y: s } = t.detail, a = (d) => this.model.boundedContexts.some((l) => l.id === d);
      if (this._view === "context-map" && !this._activeJourneyId && a(n) && a(i)) {
        const d = this.model.relations.find(
          (l) => l.sourceId === n && l.targetId === i && l.declared
        );
        this._relationPicker = {
          sourceId: n,
          targetId: i,
          mode: d ? "edit" : "create",
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
      const o = `view-${re(t.detail.name)}`;
      this.command({ kind: "add-view", id: o, name: t.detail.name, memberIds: i }), this.activateVista(o), this.emit("modux-notice", {
        message: `Vista «${t.detail.name}» creada con lo desplegado (${i.length} miembros)`
      });
    }}
          ></modux-explorer>` : this._tilt ? E`
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
        ${this._view === "context-map" ? E`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema (y un sistema externo dentro/fuera de otro) · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
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
      ${this.renderRelationPicker()} ${this.renderRepoPicker()} ${this.renderWfStepPicker()} ${this.renderBranchCondEditor()} ${this.renderExtDepPicker()} ${this.renderConnectPicker()} ${this.renderDeletePicker()}
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
      ([t, n]) => E`
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
        var d;
        return ((d = n.nodes.find((l) => l.id === a.id)) == null ? void 0 : d.label) ?? a.id;
      }
    ), o = i.length === 1 ? `«${i[0]}»` : `${i.length} elementos (${i.join(", ")})`, s = e.memberIds.length > 0 && t;
    return E`
      <div class="picker-backdrop" @pointerdown=${() => this._deletePicker = null}></div>
      <div
        class="relation-picker"
        style="left: 50%; top: 120px"
        @pointerdown=${(a) => a.stopPropagation()}
      >
        <div class="picker-title">
          ${s ? `¿Eliminar ${o}, o solo quitar de la vista?` : `¿Eliminar ${o} del modelo?`}
        </div>
        ${s ? E`
              <button
                class="picker-item"
                @click=${() => {
      const a = this._deletePicker;
      this._deletePicker = null;
      for (const d of new Set(a.memberIds))
        this.command({
          kind: "remove-view-member",
          id: this._activeViewId,
          targetId: d
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
      for (const d of a.items)
        this.performDelete(d.elementType, d.id, d.kind);
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
  /** The magic connector's question: which of the fitting relation types is this line? */
  renderConnectPicker() {
    const e = this._connectPicker;
    return e ? E`
      <div class="picker-backdrop" @pointerdown=${() => this._connectPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿Qué relación es esta línea?</div>
        ${e.options.map(
      (t) => E`
            <button
              class="picker-item"
              title=${t.hint}
              @click=${() => {
        this._connectPicker = null, t.apply();
      }}
            >
              <span class="name">${t.label}</span>
            </button>
          `
    )}
      </div>
    ` : "";
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
    return E`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(o) => o.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${n.map(
      (o) => E`
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
    return e ? E`
      <div class="picker-backdrop" @pointerdown=${() => this._repoPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">Referenciar proyecto del catálogo</div>
        ${this.repositories.map(
      (t) => E`
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
    return e ? E`
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
    return e ? E`
      <div class="picker-backdrop" @pointerdown=${() => this._wfStepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿De qué workflow es el paso?</div>
        ${(this.model.workflows ?? []).map(
      (t) => E`
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
    return E`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(i) => i.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Ac.map(
      (i) => E`
            <button
              class="picker-item ${i === t ? "current" : ""}"
              title=${i}
              @click=${() => this.pickRelationType(i)}
            >
              <span class="abbr">${Xn[i].abbr}</span>
              <span class="name">${Xn[i].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
Z.styles = xt`
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
    .palette-item.armed {
      border-color: #2563eb;
      background: #eff6ff;
      box-shadow: 0 0 0 1px #2563eb inset;
      cursor: crosshair;
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
ee([
  le({ attribute: !1 })
], Z.prototype, "model", 2);
ee([
  le({ attribute: !1 })
], Z.prototype, "layout", 2);
ee([
  le({ attribute: !1 })
], Z.prototype, "diff", 2);
ee([
  q()
], Z.prototype, "_view", 2);
ee([
  q()
], Z.prototype, "_relationType", 2);
ee([
  q()
], Z.prototype, "_relationPicker", 2);
ee([
  q()
], Z.prototype, "_extDepPicker", 2);
ee([
  q()
], Z.prototype, "_selectedId", 2);
ee([
  q()
], Z.prototype, "_paletteOpen", 2);
ee([
  q()
], Z.prototype, "_yugo", 2);
ee([
  le({ attribute: !1 })
], Z.prototype, "repositories", 2);
ee([
  le({ type: Boolean, reflect: !0 })
], Z.prototype, "dark", 2);
ee([
  q()
], Z.prototype, "_repoPicker", 2);
ee([
  q()
], Z.prototype, "_wfStepPicker", 2);
ee([
  q()
], Z.prototype, "_branchCondEditor", 2);
ee([
  q()
], Z.prototype, "_paletteFilter", 2);
ee([
  q()
], Z.prototype, "_paletteTab", 2);
ee([
  q()
], Z.prototype, "_selectedCmp", 2);
ee([
  q()
], Z.prototype, "_fullscreen", 2);
ee([
  q()
], Z.prototype, "_tilt", 2);
ee([
  q()
], Z.prototype, "_helpOpen", 2);
ee([
  q()
], Z.prototype, "_newName", 2);
ee([
  q()
], Z.prototype, "_newBoundedContextId", 2);
ee([
  q()
], Z.prototype, "_newArchetype", 2);
ee([
  q()
], Z.prototype, "_newTriggerAggId", 2);
ee([
  q()
], Z.prototype, "_newTriggerEvent", 2);
ee([
  q()
], Z.prototype, "_newTargetId", 2);
ee([
  q()
], Z.prototype, "_undoStack", 2);
ee([
  q()
], Z.prototype, "_redoStack", 2);
ee([
  q()
], Z.prototype, "_newStepName", 2);
ee([
  q()
], Z.prototype, "_newStepType", 2);
ee([
  q()
], Z.prototype, "_newStepRole", 2);
ee([
  q()
], Z.prototype, "_newStepDeadline", 2);
ee([
  q()
], Z.prototype, "_editStepRole", 2);
ee([
  q()
], Z.prototype, "_editStepDeadline", 2);
ee([
  q()
], Z.prototype, "_editStepComp", 2);
ee([
  q()
], Z.prototype, "_newStepUseCase", 2);
ee([
  q()
], Z.prototype, "_newStepEmits", 2);
ee([
  q()
], Z.prototype, "_editStepUseCase", 2);
ee([
  q()
], Z.prototype, "_editStepEmits", 2);
ee([
  q()
], Z.prototype, "_editStepAwaits", 2);
ee([
  q()
], Z.prototype, "_multi", 2);
ee([
  q()
], Z.prototype, "_newViewName", 2);
ee([
  q()
], Z.prototype, "_armedRelation", 2);
ee([
  q()
], Z.prototype, "_connectPicker", 2);
ee([
  q()
], Z.prototype, "_activeViewId", 2);
ee([
  q()
], Z.prototype, "_activeJourneyId", 2);
ee([
  q()
], Z.prototype, "_newJourneyName", 2);
ee([
  q()
], Z.prototype, "_newRagSourceType", 2);
ee([
  q()
], Z.prototype, "_newRagSourceUri", 2);
ee([
  q()
], Z.prototype, "_addMemberKey", 2);
ee([
  q()
], Z.prototype, "_treeOpen", 2);
ee([
  q()
], Z.prototype, "_deletePicker", 2);
Z = ee([
  vt("modux-editor")
], Z);
var Oc = Object.defineProperty, Rc = Object.getOwnPropertyDescriptor, ke = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Rc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Oc(t, n, o), o;
};
let ye = class extends Ve {
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
    ], t = (i) => ye.TYPE_LABELS[i] ?? i;
    return E`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: i, title: o, mark: s, cls: a }) => {
      const d = this._diff.changes.filter((l) => l.kind === i);
      return d.length ? E`
            <div class="diff-group">${o} (${d.length})</div>
            ${d.map(
        (l) => E`
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
      var d;
      try {
        const l = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!l.ok) {
          let u = `El servidor rechazó la operación (${l.status})`;
          try {
            const g = await l.json();
            g != null && g.message && (u = g.message);
          } catch {
          }
          this.showToast(u);
          return;
        }
        this._workspace = await l.json(), await this.reload(), await this.refreshDiff(), (d = this.renderRoot.querySelector("modux-editor")) == null || d.clearHistory();
      } catch (l) {
        this.showToast(String(l));
      }
    });
    const i = (s = this._workspace) == null ? void 0 : s.current;
    if (i && i !== n) {
      const d = ((a = this._workspace.solutions.find((l) => l.branch === i)) == null ? void 0 : a.name) ?? i.replace(/^solution\//, "");
      this.syncModelContext(
        i,
        this._workspace.system ? "Sistema (as-is)" : `Solución: ${d}`
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
            const h = await a.json();
            h != null && h.message && (g = h.message);
          } catch {
          }
          this.showToast(g);
          return;
        }
        const { apiId: d } = await a.json(), l = o ? { kind: "set-api-publisher", id: d, targetId: o } : s ? { kind: "add-api-implementation", apiId: d, boundedContextId: s } : null;
        l && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(l)
        });
        const u = await fetch(`${this.base}/model`);
        u.ok && (this._model = await u.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${d}`, "info");
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
    return this._error ? E`<div class="status error">modux editor: ${this._error}</div>` : this._model ? E`
      ${this._workspace ? E`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((n) => n.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : E`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              ${this._taggingVersion ? E`
                    <input
                      placeholder="Nombre de la versión…"
                      .value=${this._newTagName}
                      @input=${(n) => this._newTagName = n.target.value}
                      @keydown=${(n) => n.key === "Enter" && void this.createTag()}
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
      const n = (i) => this._diff.changes.filter((o) => o.kind === i).length;
      return E`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${n("ADDED")} ～${n("MODIFIED")} －${n("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? E`
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
      return E`
                      ${n === "EXPLORING" ? E`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${n === "PROPOSED" ? E`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${n === "APPROVED" ? E`<button
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
      (n) => E`
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
ye.styles = xt`
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
ye.TYPE_LABELS = {
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
  le()
], ye.prototype, "base", 2);
ke([
  q()
], ye.prototype, "_model", 2);
ke([
  q()
], ye.prototype, "_layout", 2);
ke([
  q()
], ye.prototype, "_error", 2);
ke([
  q()
], ye.prototype, "_saving", 2);
ke([
  q()
], ye.prototype, "_toast", 2);
ke([
  q()
], ye.prototype, "_workspace", 2);
ke([
  q()
], ye.prototype, "_creatingSolution", 2);
ke([
  q()
], ye.prototype, "_newSolutionName", 2);
ke([
  q()
], ye.prototype, "_taggingVersion", 2);
ke([
  q()
], ye.prototype, "_newTagName", 2);
ke([
  q()
], ye.prototype, "_tagsOpen", 2);
ke([
  q()
], ye.prototype, "_tags", 2);
ke([
  q()
], ye.prototype, "_repositories", 2);
ke([
  q()
], ye.prototype, "_diff", 2);
ke([
  q()
], ye.prototype, "_diffListOpen", 2);
ke([
  q()
], ye.prototype, "_mergeFlow", 2);
ke([
  q()
], ye.prototype, "_dark", 2);
ye = ke([
  vt("modux-editor-connected")
], ye);
export {
  Nc as CONTAINER_HEADER,
  Lc as CONTAINER_INSET,
  xe as ModuxCanvas,
  Z as ModuxEditor,
  ye as ModuxEditorConnected,
  Ea as aggregatesScene,
  ct as apiImplNodeId,
  pt as apiOpOccurrenceId,
  Dc as containerFit,
  la as containerMinSize,
  xa as contextMapScene,
  va as distributionScene,
  ga as flowCoherence,
  Da as flowsScene,
  at as normalizeViewLayout,
  io as ownershipIndex,
  li as processesScene,
  ha as relationEdgeId,
  da as resolveOverlaps
};
