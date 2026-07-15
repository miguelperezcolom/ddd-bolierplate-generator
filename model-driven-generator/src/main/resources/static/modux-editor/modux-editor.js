const qc = 34, Fc = 10;
function pa(e, t = 24) {
  const n = new Map(e.map((o) => [o.id, { x: o.x, y: o.y }]));
  for (let o = 0; o < 80; o++) {
    let s = !1;
    for (let a = 0; a < e.length; a++)
      for (let d = a + 1; d < e.length; d++) {
        const c = e[a], u = e[d], g = n.get(c.id), h = n.get(u.id), f = h.x - g.x, y = h.y - g.y, k = (c.w + u.w) / 2 + t - Math.abs(f), l = (c.h + u.h) / 2 + t - Math.abs(y);
        if (!(k <= 0 || l <= 0))
          if (s = !0, k < l) {
            const r = (f >= 0 ? 1 : -1) * k / 2;
            g.x -= r, h.x += r;
          } else {
            const r = (y >= 0 ? 1 : -1) * l / 2;
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
function ua(e, t = { w: 160, h: 90 }) {
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
function Bc(e, t, n) {
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
function rt(e) {
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
const ma = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, pi = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, fa = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Je = 168, Qe = 56;
function ut(e, t) {
  return `apiimpl:${e}@${t}`;
}
function mt(e, t) {
  return `apiop:${e}@${t}`;
}
function ao(e, t) {
  const n = new Map((e.apis ?? []).map((i) => [i.id, i]));
  return (e.apiImplementations ?? []).filter((i) => i.boundedContextId === t && n.has(i.apiId)).map((i) => ({
    id: ut(i.apiId, i.boundedContextId),
    name: n.get(i.apiId).name,
    kind: "api-impl"
  }));
}
function ha(e, t) {
  const n = t.targetApiId ? (e.apis ?? []).find((i) => i.id === t.targetApiId) : void 0;
  return (n == null ? void 0 : n.operations) ?? [];
}
const ga = 108, ya = 32;
function ba(e, t) {
  return `rel:${e}->${t}`;
}
function Ia(e, t) {
  const n = new Set(e.externalSystems.map((i) => i.id));
  return t.sourceId === t.targetId ? "INTERNAL" : n.has(t.sourceId) || n.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (i) => i.sourceId === t.sourceId && i.targetId === t.targetId && i.declared
  ) ? "OK" : e.relations.some(
    (i) => i.sourceId === t.targetId && i.targetId === t.sourceId && i.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function so(e, t = "unified") {
  const n = /* @__PURE__ */ new Map();
  if (t === "distribution") {
    for (const o of e.boundedContexts) {
      const s = (e.modules ?? []).filter((a) => a.boundedContextId === o.id);
      if (!(s.length <= 1)) {
        for (const a of Ut(e, o)) n.set(a.id, o.id);
        for (const a of s) {
          n.set(a.id, o.id);
          for (const d of a.elementIds ?? []) n.set(d, a.id);
        }
      }
    }
    return n;
  }
  const i = (o, s, a) => {
    const d = (e.apis ?? []).find((c) => c.id === o);
    for (const c of (d == null ? void 0 : d.operations) ?? [])
      n.set(s ? mt(c.id, s) : c.id, a);
  };
  for (const o of e.boundedContexts) {
    for (const s of Ut(e, o)) n.set(s.id, o.id);
    for (const s of ao(e, o.id)) {
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
function dt(e, t) {
  const n = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(n),
    y: 340 + 240 * Math.sin(n)
  };
}
const xa = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, va = {
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
  ui: { symbol: "interface", fill: "#f0f9ff", stroke: "#0ea5e9" },
  module: { symbol: "component", fill: "#ffffff", stroke: "#334155" }
}, wa = {
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
  ui: "UI — la interfaz humana que expone el contexto (como la API es la programática); se asigna a apps y páginas",
  module: "Módulo — unidad de distribución; arrastra el asa de un elemento hasta él para empaquetarlo"
};
function Ut(e, t) {
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
    ...(e.uis ?? []).filter((n) => n.boundedContextId === t.id).map((n) => ({ id: n.id, name: n.name, kind: "ui" })),
    ...(e.uiApps ?? []).filter((n) => (t.uiAppIds ?? []).includes(n.id)).map((n) => ({ id: n.id, name: n.name, kind: "ui-app" }))
  ];
}
const ka = {
  association: {},
  composition: { markerStart: "diamond" },
  aggregation: { markerStart: "diamond-hollow" },
  assignment: { markerStart: "ball", markerEnd: "arrow" },
  realization: { markerEnd: "hollow-triangle", dashArray: "2 3" },
  specialization: { markerEnd: "hollow-triangle" },
  serving: { markerEnd: "open-arrow" },
  access: { markerEnd: "open-arrow", dashArray: "2 3" },
  influence: { markerEnd: "open-arrow", dashArray: "2 3" },
  triggering: { markerEnd: "arrow" },
  flow: { markerEnd: "arrow", dashArray: "6 4" }
}, ro = {
  association: "Asociación",
  composition: "Composición",
  aggregation: "Agregación",
  assignment: "Asignación",
  realization: "Realización",
  specialization: "Especialización",
  serving: "Servicio (serving)",
  access: "Acceso",
  influence: "Influencia",
  triggering: "Disparo (triggering)",
  flow: "Flujo"
};
function $a(e, t, n = {}, i = /* @__PURE__ */ new Set(), o = !1) {
  return lo(e, t, "unified", n, i, o);
}
function _a(e, t, n = {}, i = /* @__PURE__ */ new Set(), o = !1) {
  return lo(e, t, "distribution", n, i, o);
}
function lo(e, t, n, i = {}, o = /* @__PURE__ */ new Set(), s = !1) {
  const a = n === "distribution";
  if (s) {
    const p = new Set(o);
    for (const T of e.boundedContexts) p.add(T.id);
    for (const T of e.externalSystems) p.add(T.id);
    for (const T of e.apis ?? []) p.add(T.id);
    for (const T of e.proxyApis ?? []) p.add(T.id);
    for (const T of e.apiImplementations ?? [])
      p.add(ut(T.apiId, T.boundedContextId));
    for (const T of e.modules ?? []) p.add(T.id);
    o = p;
  }
  const d = !a, c = new Set(e.externalSystems.map((p) => p.id)), u = (e.apis ?? []).filter(
    (p) => p.publishedByExternalSystemId && c.has(p.publishedByExternalSystemId)
  ), g = new Set(u.map((p) => p.id)), h = (e.proxyApis ?? []).filter(
    (p) => p.publishedByExternalSystemId && c.has(p.publishedByExternalSystemId)
  ), f = new Set(h.map((p) => p.id)), y = new Map((e.apis ?? []).map((p) => [p.id, p])), k = new Map((e.proxyApis ?? []).map((p) => [p.id, p])), l = (p, T) => {
    var z;
    if (a) {
      if (T === "boundedContext") {
        const V = (e.modules ?? []).filter((he) => he.boundedContextId === p);
        if (V.length <= 1) return [];
        const F = new Set(V.flatMap((he) => he.elementIds ?? [])), ee = e.boundedContexts.find((he) => he.id === p), ue = ee ? Ut(e, ee).filter((he) => !F.has(he.id)) : [];
        return [
          ...V.map((he) => ({ id: he.id, name: he.name, kind: "module" })),
          ...ue
        ];
      }
      if (T === "module") {
        const V = (e.modules ?? []).find((ue) => ue.id === p), F = e.boundedContexts.find((ue) => ue.id === (V == null ? void 0 : V.boundedContextId));
        if (!V || !F) return [];
        const ee = new Map(Ut(e, F).map((ue) => [ue.id, ue]));
        return (V.elementIds ?? []).map((ue) => ee.get(ue)).filter((ue) => !!ue);
      }
      return [];
    }
    switch (T) {
      case "boundedContext": {
        const V = e.boundedContexts.find((F) => F.id === p);
        return V ? [...ao(e, p), ...Ut(e, V)] : [];
      }
      case "external-system": {
        const V = e.externalSystems.find((F) => F.id === p);
        return [
          ...e.externalSystems.filter((F) => F.parentExternalSystemId === p).map((F) => ({ id: F.id, name: F.name, kind: "external-system" })),
          ...u.filter((F) => F.publishedByExternalSystemId === p).map((F) => ({ id: F.id, name: F.name, kind: "api" })),
          ...h.filter((F) => F.publishedByExternalSystemId === p).map((F) => ({ id: F.id, name: F.name, kind: "proxy-api" })),
          ...((V == null ? void 0 : V.useCases) ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "external-use-case" })
          ),
          ...((V == null ? void 0 : V.tables) ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "external-table" })
          ),
          ...((V == null ? void 0 : V.mcpServers) ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "mcp-server" })
          )
        ];
      }
      case "api":
        return (((z = y.get(p)) == null ? void 0 : z.operations) ?? []).map(
          (V) => ({ id: V.id, name: V.name, kind: "api-operation" })
        );
      case "api-impl": {
        const V = /^apiimpl:(.+)@(.+)$/.exec(p), F = V ? y.get(V[1]) : void 0;
        return ((F == null ? void 0 : F.operations) ?? []).map(
          (ee) => ({
            id: mt(ee.id, V[2]),
            name: ee.name,
            kind: "api-op-occurrence"
          })
        );
      }
      case "proxy-api": {
        const V = k.get(p);
        return V ? ha(e, V).map(
          (F) => ({
            id: mt(F.id, p),
            name: F.name,
            kind: "api-op-occurrence"
          })
        ) : [];
      }
      default:
        return [];
    }
  }, r = [], m = [], w = (p, T, z) => {
    const V = -Math.PI / 2 + 2 * Math.PI * T / Math.max(z, 1), F = 160 + 12 * Math.min(z, 14);
    return { x: p.x + F * Math.cos(V), y: p.y + F * Math.sin(V) };
  }, M = (p, T, z, V) => {
    const F = l(p, T);
    F.forEach((ee, ue) => {
      const he = t[ee.id] ?? w(V, ue, F.length), oe = l(ee.id, ee.kind), xe = o.has(ee.id) && oe.length > 0, Oe = ee.policy ? xa : va[ee.kind], Fe = ee.kind === "external-system";
      r.push({
        id: ee.id,
        label: ee.name,
        kind: ee.kind,
        x: he.x,
        y: he.y,
        w: Fe ? 150 : ga + 12,
        h: Fe ? 44 : ya + 4,
        symbol: Oe.symbol,
        fill: Oe.fill,
        stroke: Oe.stroke,
        dashed: Fe || void 0,
        ownerId: p,
        collapsible: oe.length > 0,
        collapsed: oe.length > 0 && !xe,
        tooltip: `${ee.policy ? "Policy" : wa[ee.kind]} ${ee.name} — parte de ${z}`
      }), m.push({
        id: `contains:${p}->${ee.id}`,
        sourceId: p,
        targetId: ee.id,
        kind: "contains",
        color: "#94a3b8",
        tooltip: `${z} contiene ${ee.name}`
      }), xe && M(ee.id, ee.kind, ee.name, he);
    });
  }, C = [
    ...e.boundedContexts.map((p) => ({ ref: p, external: !1, api: !1, proxy: !1 })),
    ...(a ? [] : e.externalSystems).filter((p) => !p.parentExternalSystemId || !c.has(p.parentExternalSystemId)).map((p) => ({ ref: p, external: !0, api: !1, proxy: !1 })),
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
  C.forEach((p, T) => {
    const z = t[p.ref.id] ?? dt(T, C.length);
    if ("idp" in p && p.idp) {
      const oe = p.ref, xe = !!oe.publishedByExternalSystemId;
      r.push({
        id: oe.id,
        label: oe.name,
        kind: "identity-provider",
        symbol: "key",
        fill: xe ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: xe,
        badge: oe.type ?? "IDP",
        tooltip: `${oe.name} — emite las identidades que el sistema confía${xe ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: z.x,
        y: z.y,
        w: Je,
        h: Qe
      });
      return;
    }
    if ("etl" in p && p.etl) {
      const oe = p.ref;
      r.push({
        id: oe.id,
        label: oe.name,
        kind: "etl-flow",
        symbol: "gear",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        dashed: !0,
        badge: "ETL",
        tooltip: `${oe.name} — integrador: fuentes (pull/consumidor) → transformación → escrituras (API/BD/evento)`,
        x: z.x,
        y: z.y,
        w: Je,
        h: Qe
      });
      return;
    }
    if ("workflow" in p && p.workflow) {
      const oe = p.ref;
      r.push({
        id: oe.id,
        label: oe.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${oe.name} — workflow${oe.triggerEvent ? ` · arranca con ${oe.triggerEvent}` : ""}`,
        x: z.x,
        y: z.y,
        w: Je,
        h: Qe
      });
      return;
    }
    if (p.proxy) {
      const oe = p.ref, xe = l(oe.id, "proxy-api"), Oe = o.has(oe.id) && xe.length > 0;
      r.push({
        id: oe.id,
        label: oe.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${oe.name} — proxy/cache de una API, consumible como ella`,
        collapsible: xe.length > 0,
        collapsed: xe.length > 0 && !Oe,
        x: z.x,
        y: z.y,
        w: Je,
        h: Qe
      }), Oe && M(oe.id, "proxy-api", oe.name, z);
      return;
    }
    if (p.api) {
      const oe = p.ref, xe = l(oe.id, "api"), Oe = o.has(oe.id) && xe.length > 0;
      r.push({
        id: oe.id,
        label: oe.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${oe.name} — API publicada (sus operaciones apuntan a quien las implementa)`,
        collapsible: xe.length > 0,
        collapsed: xe.length > 0 && !Oe,
        x: z.x,
        y: z.y,
        w: Je,
        h: Qe
      }), Oe && M(oe.id, "api", oe.name, z);
      return;
    }
    if (p.external) {
      const oe = p.ref, xe = l(oe.id, "external-system"), Oe = o.has(oe.id) && xe.length > 0, Fe = i[oe.id];
      r.push({
        id: oe.id,
        label: oe.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: oe.referencedRepositoryId ? "PROYECTO" : "EXTERNAL",
        tooltip: oe.referencedRepositoryId ? `${oe.name} — otro proyecto modux (repositorio ${oe.referencedRepositoryId}), referenciado del catálogo` : `${oe.name} (sistema externo)`,
        collapsible: xe.length > 0,
        collapsed: xe.length > 0 && !Oe,
        resizable: !0,
        x: z.x,
        y: z.y,
        w: (Fe == null ? void 0 : Fe.w) ?? Je,
        h: (Fe == null ? void 0 : Fe.h) ?? Qe
      }), Oe && M(oe.id, "external-system", oe.name, z);
      return;
    }
    const V = p.ref, F = V.subdomainType ?? "GENERIC", ee = l(V.id, "boundedContext"), ue = o.has(V.id) && ee.length > 0, he = i[V.id];
    r.push({
      id: V.id,
      label: V.name,
      kind: "boundedContext",
      symbol: "component",
      fill: ma[F],
      stroke: "#94a3b8",
      badge: F,
      tooltip: a && ee.length === 0 ? `${V.name} — un solo módulo (el principal): el servicio lo despliega entero. Añade un módulo desde la paleta para repartir sus elementos` : `${V.name} — subdominio ${F}`,
      collapsible: ee.length > 0,
      collapsed: ee.length > 0 && !ue,
      resizable: !0,
      x: z.x,
      y: z.y,
      w: (he == null ? void 0 : he.w) ?? Je,
      h: (he == null ? void 0 : he.h) ?? Qe
    }), ue && M(V.id, "boundedContext", V.name, z);
  });
  const R = a ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, _ = C.length + R.actors.length + R.aiAgents.length + R.rags.length + R.mcpGateways.length;
  R.actors.forEach((p, T) => {
    const z = t[p.id] ?? dt(C.length + T, _);
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
  }), R.aiAgents.forEach((p, T) => {
    const z = t[p.id] ?? dt(C.length + (e.actors ?? []).length + T, _);
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
  }), R.mcpGateways.forEach((p, T) => {
    const z = t[p.id] ?? dt(
      C.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + T,
      _
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
  const O = [];
  if (R.rags.forEach((p, T) => {
    const z = t[p.id] ?? dt(
      C.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + T,
      _
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
    }), (p.contentSources ?? []).forEach((V, F) => {
      const ee = `ragcs:${p.id}:${V.uri}`, ue = t[ee] ?? { x: z.x + 170, y: z.y - 30 + F * 44 };
      r.push({
        id: ee,
        label: V.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: ue.x,
        y: ue.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: V.type,
        tooltip: `${V.type}: ${V.uri}`
      }), O.push({
        id: `ragcse:${p.id}:${V.uri}`,
        sourceId: ee,
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
    p.forEach((z, V) => {
      const F = t[z.id] ?? dt(C.length + V, C.length + p.length);
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
        w: Je,
        h: Qe
      });
    });
    const T = [];
    [...new Set(p.filter((z) => z.database).map((z) => z.database))].forEach((z) => T.push({
      id: `infra-db:${z}`,
      label: z,
      badge: "BD",
      symbol: "readmodel",
      tooltip: `Base de datos ${z} — la usan los servicios que declaran database=${z}`
    })), p.some((z) => z.outboxEnabled) && T.push({
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
    }), T.forEach((z, V) => {
      const F = t[z.id] ?? dt(
        C.length + p.length + V,
        C.length + p.length + T.length
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
        w: Je,
        h: Qe
      });
    });
  }
  r.sort((p, T) => (p.parentId ? 1 : 0) - (T.parentId ? 1 : 0));
  const B = e.relations.map((p) => ({
    id: ba(p.sourceId, p.targetId),
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "relation",
    label: p.type ? pi[p.type] : p.inferredType ? `≈${pi[p.inferredType]}` : "?",
    color: p.declared ? "#475569" : "#94a3b8",
    dashed: !p.declared,
    arrow: !0,
    tooltip: p.type ? `${p.type} (${p.sourceId} upstream → ${p.targetId} downstream)${p.reasons ? ` — ${p.reasons}` : ""}` : p.inferredType ? `≈ ${p.inferredType} INFERIDO de las dependencias — doble click para declararlo (o corregirlo)${p.reasons ? ` — ${p.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${p.reasons ? ` — ${p.reasons}` : ""}`
  })), H = e.flows.map((p) => {
    var ue, he, oe, xe, Oe, Fe;
    const T = Ia(e, p), z = d ? e.boundedContexts.find((Be) => Be.id === p.sourceId) : void 0, V = ((ue = z == null ? void 0 : z.domainEvents) == null ? void 0 : ue.find((Be) => Be.name === p.triggerEvent)) ?? ((he = z == null ? void 0 : z.applicationEvents) == null ? void 0 : he.find((Be) => Be.name === p.triggerEvent)), F = d && p.readModelName ? (xe = (oe = e.boundedContexts.find((Be) => Be.id === p.targetId)) == null ? void 0 : oe.readModels) == null ? void 0 : xe.find((Be) => Be.name === p.readModelName) : void 0, ee = d && p.targetUseCaseId ? (Fe = (Oe = e.boundedContexts.find((Be) => Be.id === p.targetId)) == null ? void 0 : Oe.useCases) == null ? void 0 : Fe.find((Be) => Be.id === p.targetUseCaseId) : void 0;
    return {
      id: `flow:${p.id}`,
      sourceId: (V == null ? void 0 : V.id) ?? p.sourceId,
      targetId: (ee == null ? void 0 : ee.id) ?? (F == null ? void 0 : F.id) ?? p.targetId,
      kind: "flow",
      label: p.name,
      color: fa[T],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${p.name} [${p.archetype}] — ${T}`
    };
  }), se = new Map((e.apis ?? []).map((p) => [p.id, p])), $ = new Set(e.boundedContexts.map((p) => p.id)), G = (e.apiImplementations ?? []).filter(
    (p) => se.has(p.apiId) && $.has(p.boundedContextId)
  );
  (e.uis ?? []).filter((p) => !p.boundedContextId).forEach((p, T) => {
    const z = t[p.id] ?? { x: 180 + T * 200, y: 40 };
    r.push({
      id: p.id,
      label: p.name,
      x: z.x,
      y: z.y,
      w: 150,
      h: 44,
      kind: "ui",
      symbol: "interface",
      fill: "#f0f9ff",
      stroke: "#0ea5e9",
      badge: "UI",
      tooltip: `${p.name} — interfaz humana suelta; trázala a un contexto para declarar quién la expone`
    });
  });
  const Y = new Set(r.map((p) => p.id)), A = so(e, n), j = /* @__PURE__ */ new Map(), b = (p) => {
    const T = j.get(p);
    if (T !== void 0) return T;
    let z = p;
    for (let V = 0; z && V < 16; V++) {
      if (Y.has(z))
        return j.set(p, z), z;
      z = A.get(z);
    }
    return j.set(p, null), null;
  }, x = { has: (p) => b(p) !== null }, N = (p) => {
    const T = /* @__PURE__ */ new Set(), z = [];
    for (const V of p) {
      if (V.kind === "contains" || V.targetId.startsWith("edgeanchor:")) {
        z.push(V);
        continue;
      }
      const F = b(V.sourceId), ee = b(V.targetId);
      if (!F || !ee || F === ee) continue;
      if (F === V.sourceId && ee === V.targetId) {
        z.push(V);
        continue;
      }
      const ue = `${V.kind}|${F}|${ee}`;
      T.has(ue) || (T.add(ue), z.push({
        ...V,
        sourceId: F,
        targetId: ee,
        tooltip: `${V.tooltip ?? V.kind} — de un elemento plegado dentro`
      }));
    }
    return z;
  }, v = a ? [
    ...(e.services ?? []).flatMap(
      (p) => (p.moduleIds ?? []).map((T) => {
        var V;
        if (!x.has(p.id)) return null;
        const z = x.has(T) ? T : (V = (e.modules ?? []).find((F) => F.id === T)) == null ? void 0 : V.boundedContextId;
        return !z || !x.has(z) ? null : {
          id: `deploy:${p.id}->${T}`,
          sourceId: p.id,
          targetId: z,
          kind: "deploys",
          color: "#334155",
          dashed: !0,
          arrow: !0,
          tooltip: `desplegado en ${p.name} — Supr lo desconecta`
        };
      }).filter((T) => T !== null)
    ),
    ...(e.services ?? []).flatMap((p) => {
      const T = [];
      return p.database && x.has(`infra-db:${p.database}`) && x.has(p.id) && T.push({
        id: `infradb:${p.id}`,
        sourceId: p.id,
        targetId: `infra-db:${p.database}`,
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} persiste en ${p.database}`
      }), p.outboxEnabled && x.has("infra-broker") && x.has(p.id) && T.push({
        id: `infrabroker:${p.id}`,
        sourceId: p.id,
        targetId: "infra-broker",
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} publica eventos por el outbox`
      }), T;
    })
  ] : [], I = d ? (e.emissions ?? []).filter((p) => x.has(p.sourceId) && x.has(p.domainEventId)).map((p) => ({
    id: `emit:${p.sourceId}->${p.domainEventId}`,
    sourceId: p.sourceId,
    targetId: p.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], P = d ? (e.projections ?? []).map((p) => ({
    p,
    source: p.sourceAggregateId ?? p.sourceExternalUseCaseId ?? p.sourceExternalTableId
  })).filter(({ p, source: T }) => T && p.readModelId).filter(({ p, source: T }) => x.has(T) && x.has(p.readModelId)).map(({ p, source: T }) => ({
    id: `proj:${p.id}`,
    sourceId: T,
    targetId: p.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: p.sourceAggregateId ? `Proyección ${p.name}: el estado del agregado se materializa en ${p.readModelName ?? p.readModelId}` : `Proyección ${p.name}: polling hacia ${p.readModelName ?? p.readModelId}`
  })) : [], S = (e.apis ?? []).flatMap(
    (p) => p.operations.flatMap((T) => {
      const z = d && T.targetUseCaseId && x.has(T.targetUseCaseId) ? T.targetUseCaseId : T.targetBoundedContextId && x.has(T.targetBoundedContextId) ? T.targetBoundedContextId : (T.targetUseCaseId && !d, null);
      if (!z) return [];
      const V = d && x.has(T.id) ? T.id : p.id;
      return x.has(V) ? [
        {
          id: `apiwire:${T.id}`,
          sourceId: V,
          targetId: z,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${T.name} la implementa ${z}`
        }
      ] : [];
    })
  ), D = d ? (e.useCaseCalls ?? []).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => ({
    id: `uccall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], L = [
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
      const T = x.has(p.id) ? p.id : p.ownerBoundedContextId && x.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
      return T ? [{
        id: `idpsvc:${p.id}`,
        sourceId: T,
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
  ], U = d ? e.boundedContexts.flatMap((p) => p.scheduledTriggers ?? []).filter((p) => p.useCaseId && x.has(p.id) && x.has(p.useCaseId)).map((p) => ({
    id: `stfire:${p.id}->${p.useCaseId}`,
    sourceId: p.id,
    targetId: p.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: p.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${p.cronExpression ?? "cron"}`
  })) : [], W = d ? (e.aggregateCalls ?? []).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => ({
    id: `aggcall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], J = d ? (e.queryCalls ?? []).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => ({
    id: `qscall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], ce = d ? (e.actorUses ?? []).filter((p) => x.has(p.actorId) && x.has(p.targetId)).map((p) => ({
    id: `use:${p.actorId}->${p.targetId}`,
    sourceId: p.actorId,
    targetId: p.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], Se = (e.actorExternalDependencies ?? []).filter((p) => x.has(p.actorId) && x.has(p.externalSystemId)).map((p) => ({
    id: `extdep:${p.actorId}->${p.externalSystemId}`,
    sourceId: p.actorId,
    targetId: p.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), K = new Map([
    ...(e.apis ?? []).filter((p) => p.publishedByExternalSystemId).map((p) => [p.id, p.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((p) => p.publishedByExternalSystemId).map((p) => [p.id, p.publishedByExternalSystemId])
  ]), Q = (p) => x.has(p) ? p : K.get(p) ?? p, fe = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((p) => ({
        sourceId: p.sourceId,
        targetId: Q(p.targetId),
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
  ], Ae = /* @__PURE__ */ new Map();
  for (const p of e.boundedContexts) {
    for (const T of p.useCases ?? []) Ae.set(T.id, p.id);
    for (const T of p.domainEvents ?? []) Ae.set(T.id, p.id);
    for (const T of p.applicationEvents ?? []) Ae.set(T.id, p.id);
    for (const T of p.queryServices ?? []) Ae.set(T.id, p.id);
  }
  const Ie = (p) => x.has(p) ? p : Ae.get(p) ?? p, Ee = /* @__PURE__ */ new Map();
  for (const p of e.boundedContexts) {
    for (const T of p.domainEvents ?? []) Ee.set(T.name, T.id);
    for (const T of p.applicationEvents ?? []) Ee.set(T.name, T.id);
  }
  const be = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (p) => (p.steps ?? []).filter((T) => T.targetUseCaseId).map((T) => ({ sourceId: p.id, targetId: Ie(T.targetUseCaseId) }))
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
  ], X = [
    ...new Map(
      (e.workflows ?? []).filter((p) => p.triggerEvent && Ee.has(p.triggerEvent)).map((p) => ({
        sourceId: Ie(Ee.get(p.triggerEvent)),
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
  ], Z = /* @__PURE__ */ new Map();
  for (const p of e.externalSystems)
    for (const T of p.tables ?? []) Z.set(T.id, p.id);
  const _e = (e.notifications ?? []).flatMap((p) => {
    var V;
    const T = x.has(p.id) ? p.id : p.ownerBoundedContextId && x.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
    if (!T) return [];
    const z = [];
    if (p.eventId) {
      const F = x.has(p.eventId) ? p.eventId : Ae.get(p.eventId);
      F && x.has(F) && F !== T && z.push({
        id: `notif:${p.id}`,
        sourceId: F,
        targetId: T,
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
        sourceId: T,
        targetId: F,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((V = (p.channels ?? [])[0]) == null ? void 0 : V.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} avisa a este rol — Supr lo quita`
      });
    return z;
  }), Ne = (e.documents ?? []).flatMap((p) => {
    const T = x.has(p.id) ? p.id : p.ownerBoundedContextId && x.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
    if (!T || !p.queryServiceId) return [];
    const z = x.has(p.queryServiceId) ? p.queryServiceId : Ae.get(p.queryServiceId);
    return !z || !x.has(z) || z === T ? [] : [{
      id: `docq:${p.id}`,
      sourceId: z,
      targetId: T,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), We = (e.etlFlows ?? []).flatMap(
    (p) => (p.steps ?? []).flatMap((T) => {
      const z = x.has(p.id) ? p.id : p.ownerBoundedContextId && x.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
      if (!z) return [];
      const V = T.externalTableId ?? T.operationId ?? T.apiId ?? T.eventId;
      if (!V) return [];
      let F = V;
      if (!x.has(F) && T.operationId && T.apiId && (F = T.apiId), !x.has(F) && T.externalTableId && (F = Z.get(T.externalTableId) ?? F), x.has(F) || (F = Q(F)), x.has(F) || (F = Ae.get(V) ?? F), !x.has(F) || F === z) return [];
      const ee = T.type.startsWith("SOURCE");
      return [{
        id: `etl:${p.id}:${T.id}`,
        sourceId: ee ? F : z,
        targetId: ee ? z : F,
        kind: ee ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: T.type === "SOURCE_PULL" ? "pull" : T.type === "SOURCE_CONSUMER" ? "consume" : T.type === "WRITE_API" ? "api" : T.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: ee ? `${p.name} lee de aquí (${T.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${p.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), Le = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (p) => (p.sourceExternalTableIds ?? []).map((T) => ({
          sourceId: x.has(T) ? T : Z.get(T) ?? T,
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
  ], nt = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (p) => (p.sourceApiIds ?? []).map((T) => ({
          sourceId: Q(T),
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
  ], kt = [
    ...new Map(
      (e.rags ?? []).flatMap((p) => [
        ...(p.sourceExternalSystemIds ?? []).map((T) => ({ sourceId: T, targetId: p.id, name: p.name })),
        ...(p.sourceBoundedContextIds ?? []).map((T) => ({ sourceId: T, targetId: p.id, name: p.name }))
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
  ], Zt = [
    ...new Map(
      (e.agentApiUses ?? []).map((p) => ({ sourceId: p.agentId, targetId: Q(p.apiId) })).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => [
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
  ], Bo = (p) => p.onCompletionEventName || `${p.name.replace(/\s+/g, "")}Completado`, jo = (e.workflows ?? []).flatMap(
    (p) => p.triggerEvent ? (e.workflows ?? []).filter((T) => T.id !== p.id && Bo(T) === p.triggerEvent).filter((T) => x.has(T.id) && x.has(p.id)).map((T) => ({
      id: `wfchain:${T.id}->${p.id}`,
      sourceId: T.id,
      targetId: p.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: p.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), Wo = [
    ...new Map(
      (e.proxyApis ?? []).filter((p) => p.targetApiId).map((p) => ({ sourceId: Q(p.id), targetId: Q(p.targetApiId) })).filter(
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
  ], Vo = G.flatMap((p) => {
    const T = ut(p.apiId, p.boundedContextId);
    if (!x.has(T)) return [];
    const z = [];
    for (const V of (e.proxyApis ?? []).filter((F) => F.targetApiId === p.apiId)) {
      const F = Q(V.id);
      x.has(F) && F !== T && z.push({
        id: `pxr:${F}->${T}`,
        sourceId: F,
        targetId: T,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return z;
  }), Ho = (e.proxyOperationRoutes ?? []).flatMap((p) => {
    const T = (e.proxyApis ?? []).find((F) => F.id === p.proxyId);
    if (!(T != null && T.targetApiId)) return [];
    const z = mt(p.operationId, p.proxyId), V = p.targetSiteId === T.targetApiId ? T.targetApiId : ut(T.targetApiId, p.targetSiteId);
    return !x.has(z) || !x.has(V) ? [] : [{
      id: `oproute:${z}->${V}`,
      sourceId: z,
      targetId: V,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Go = [
    ...new Map(
      (e.externalOperationUses ?? []).map((p) => {
        if (!x.has(p.externalSystemId)) return null;
        const T = (e.apis ?? []).find(
          (ee) => ee.operations.some((ue) => ue.id === p.operationId)
        );
        if (!T) return null;
        const z = p.siteId === T.id, V = z ? p.operationId : mt(p.operationId, p.siteId);
        let F = x.has(V) ? V : null;
        if (!F)
          if (z || (e.proxyApis ?? []).some((ee) => ee.id === p.siteId))
            F = Q(p.siteId);
          else {
            const ee = ut(T.id, p.siteId);
            F = x.has(ee) ? ee : p.siteId;
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
  ], Yo = d ? (e.apiOperationImplementations ?? []).flatMap((p) => {
    if (!x.has(p.useCaseId)) return [];
    const T = x.has(mt(p.operationId, p.boundedContextId)) ? mt(p.operationId, p.boundedContextId) : x.has(ut(p.apiId, p.boundedContextId)) ? ut(p.apiId, p.boundedContextId) : x.has(Q(p.boundedContextId)) ? Q(p.boundedContextId) : null;
    return T ? [{
      id: `apiimplwire:${p.operationId}@${p.boundedContextId}`,
      sourceId: T,
      targetId: p.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], Ko = d ? (e.agentUses ?? []).filter((p) => x.has(p.agentId) && x.has(p.useCaseId)).map((p) => ({
    id: `mcp:${p.agentId}->${p.useCaseId}`,
    sourceId: p.agentId,
    targetId: p.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Xo = (e.agentRags ?? []).filter((p) => x.has(p.agentId) && x.has(p.ragId)).map((p) => ({
    id: `agrag:${p.agentId}->${p.ragId}`,
    sourceId: p.agentId,
    targetId: p.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), Jo = d ? (e.rags ?? []).filter((p) => x.has(p.id)).flatMap(
    (p) => (p.sourceReadModelIds ?? []).filter((T) => x.has(T)).map((T) => ({
      id: `ragsrc:${p.id}->${T}`,
      sourceId: p.id,
      targetId: T,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name} indexa este read model`
    }))
  ) : [], Qo = d ? (e.agentExternalUses ?? []).filter((p) => x.has(p.agentId) && x.has(p.externalUseCaseId)).map((p) => ({
    id: `mcpx:${p.agentId}->${p.externalUseCaseId}`,
    sourceId: p.agentId,
    targetId: p.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Zo = d ? (e.agentMcpUses ?? []).filter((p) => x.has(p.agentId) && x.has(p.mcpServerId)).map((p) => ({
    id: `mcpsv:${p.agentId}->${p.mcpServerId}`,
    sourceId: p.agentId,
    targetId: p.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], ea = (e.mcpGateways ?? []).flatMap(
    (p) => [
      ...p.mcpServerIds ?? [],
      ...p.apiIds ?? [],
      ...p.apiOperationIds ?? [],
      ...p.useCaseIds ?? [],
      ...p.ragIds ?? []
    ].filter((T) => x.has(p.id) && x.has(T)).map((T) => ({
      id: `gwx:${p.id}->${T}`,
      sourceId: p.id,
      targetId: T,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), ta = (e.agentGatewayUses ?? []).filter((p) => x.has(p.agentId) && x.has(p.gatewayId)).map((p) => ({
    id: `aggw:${p.agentId}->${p.gatewayId}`,
    sourceId: p.agentId,
    targetId: p.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), na = d ? (e.agentApiOpUses ?? []).filter((p) => x.has(p.agentId) && x.has(p.apiOperationId)).map((p) => ({
    id: `agapi:${p.agentId}->${p.apiOperationId}`,
    sourceId: p.agentId,
    targetId: p.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], ia = d ? (e.agentQueryUses ?? []).filter((p) => x.has(p.agentId) && x.has(p.queryServiceId)).map((p) => ({
    id: `agqs:${p.agentId}->${p.queryServiceId}`,
    sourceId: p.agentId,
    targetId: p.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], oa = (e.agentDelegations ?? []).filter((p) => x.has(p.agentId) && x.has(p.delegateAgentId)).map((p) => ({
    id: `agag:${p.agentId}->${p.delegateAgentId}`,
    sourceId: p.agentId,
    targetId: p.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), aa = (e.actorAgentUses ?? []).filter((p) => x.has(p.actorId) && x.has(p.agentId)).map((p) => ({
    id: `useag:${p.actorId}->${p.agentId}`,
    sourceId: p.actorId,
    targetId: p.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), sa = d ? (e.agentTriggers ?? []).filter((p) => x.has(p.eventId) && x.has(p.agentId)).map((p) => ({
    id: `evag:${p.eventId}->${p.agentId}`,
    sourceId: p.eventId,
    targetId: p.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], ra = d ? (e.externalCalls ?? []).filter((p) => x.has(p.externalSystemId) && x.has(p.useCaseId)).map((p) => ({
    id: `extcall:${p.externalSystemId}->${p.useCaseId}`,
    sourceId: p.externalSystemId,
    targetId: p.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], da = d ? (e.externalUseCaseCalls ?? []).filter((p) => x.has(p.sourceId) && x.has(p.targetId)).map((p) => ({
    id: `extuccall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "ext-uc-call",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "llama (derivará gateway/API)"
  })) : [], la = (e.uis ?? []).flatMap((p) => [
    ...[...p.appIds ?? [], ...p.pageIds ?? []].map((T) => ({
      id: `uiasg:${p.id}->${T}`,
      sourceId: T,
      targetId: p.id,
      kind: "ui-assignment",
      color: "#0ea5e9",
      markerStart: "ball",
      markerEnd: "arrow",
      tooltip: "asignada a la UI (assignment) — Supr la desconecta"
    })),
    // serving: la interfaz SIRVE al actor (flecha abierta hacia la persona)
    ...(p.actorIds ?? []).map((T) => ({
      id: `uisrv:${p.id}->${T}`,
      sourceId: p.id,
      targetId: T,
      kind: "ui-serving",
      color: "#0ea5e9",
      markerEnd: "open-arrow",
      tooltip: "la UI sirve a este actor (serving) — Supr la desconecta"
    }))
  ]), ca = (e.archimateRelations ?? []).map((p) => ({
    id: `archi:${p.id}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "archimate-relation",
    color: "#475569",
    label: p.label || void 0,
    ...ka[p.type] ?? {},
    tooltip: `${ro[p.type] ?? p.type} (ArchiMate)${p.label ? ` · ${p.label}` : ""} — doble click retipa · Supr la borra`
  }));
  return {
    nodes: r,
    edges: N([
      // Composition first: the ownership diamonds paint under the semantic edges.
      ...m,
      ...ca,
      ...la,
      ...v,
      ...B,
      ...H,
      ...I,
      ...P,
      ...S,
      ...D,
      ...U,
      ...L,
      ..._e,
      ...Ne,
      ...We,
      ...W,
      ...J,
      ...ce,
      ...Se,
      ...fe,
      ...Wo,
      ...Vo,
      ...Ho,
      ...Go,
      ...Yo,
      ...be,
      ...X,
      ...jo,
      ...Zt,
      ...Le,
      ...nt,
      ...kt,
      ...Ko,
      ...Qo,
      ...Zo,
      ...ea,
      ...ta,
      ...na,
      ...ia,
      ...oa,
      ...aa,
      ...sa,
      ...Xo,
      ...Jo,
      ...O,
      ...ra,
      ...da
    ])
  };
}
const Ca = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Sa = 176, Ea = 60, Aa = 140, Ma = 40;
function Pa(e) {
  const t = {}, n = e.aggregates ?? [], i = e.entities ?? [];
  return e.boundedContexts.forEach((o, s) => {
    const a = 220 + s * 340;
    n.filter((c) => c.boundedContextId === o.id).forEach((c, u) => {
      const g = i.filter((f) => f.aggregateId === c.id).length, h = 140 + u * (170 + g * 60);
      t[c.id] = { x: a, y: h }, i.filter((f) => f.aggregateId === c.id).forEach((f, y) => {
        t[f.id] = { x: a + 60, y: h + 100 + y * 60 };
      });
    });
  }), n.filter((o) => !e.boundedContexts.some((s) => s.id === o.boundedContextId)).forEach((o, s) => {
    t[o.id] = { x: 220 + s * 340, y: 640 };
  }), t;
}
function Ta(e, t) {
  const n = Pa(e), i = (h) => t[h] ?? n[h] ?? { x: 200, y: 200 }, o = new Map(e.boundedContexts.map((h) => [h.id, h])), s = (e.aggregates ?? []).map((h) => {
    const f = o.get(h.boundedContextId), y = (f == null ? void 0 : f.subdomainType) ?? "GENERIC", k = i(h.id);
    return {
      id: h.id,
      label: h.name,
      x: k.x,
      y: k.y,
      w: Sa,
      h: Ea,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Ca[y],
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
      w: Aa,
      h: Ma,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${h.name} (dentro del agregado)`
    };
  }), d = (e.aggregates ?? []).flatMap(
    (h) => (h.invariants ?? []).map((f, y) => {
      const k = i(h.id), l = t[f.id] ?? { x: k.x - 150, y: k.y + 90 + y * 52 };
      return {
        id: f.id,
        label: f.name,
        x: l.x,
        y: l.y,
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
  ), c = (e.aggregates ?? []).flatMap(
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
    edges: [...u, ...g, ...c]
  };
}
const Oa = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Ra = 150, Na = 44, La = 190, Da = 56, za = 160, Ua = 48;
function qa(e, t) {
  const n = e.externalSystems.find((o) => o.id === t.targetId);
  if (n) return { id: n.id, label: n.name, external: !0 };
  const i = e.boundedContexts.find((o) => o.id === t.targetId);
  return { id: t.targetId, label: (i == null ? void 0 : i.name) ?? t.targetId, external: !1 };
}
function Fa(e, t) {
  const n = e.flows, i = [], o = [], s = /* @__PURE__ */ new Set(), a = (d) => {
    var c, u;
    return ((u = (c = e.aggregates) == null ? void 0 : c.find((g) => g.id === d)) == null ? void 0 : u.name) ?? d ?? "?";
  };
  return n.forEach((d, c) => {
    const u = 120 + c * 130, g = Oa[d.archetype] ?? "#475569", h = d.triggerAggregateId ?? d.sourceId;
    if (!s.has(h)) {
      s.add(h);
      const r = t[h] ?? { x: 160, y: u };
      i.push({
        id: h,
        label: d.triggerAggregateId ? a(d.triggerAggregateId) : h,
        x: r.x,
        y: r.y,
        w: Ra,
        h: Na,
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
      w: La,
      h: Da,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: g,
      badge: d.archetype,
      tooltip: `Flow ${d.name} [${d.archetype}]${d.readModelName ? ` → read model ${d.readModelName}` : ""}${d.targetUseCaseId ? ` → use case ${d.targetUseCaseId}` : ""}`
    });
    const k = qa(e, d), l = `tgt:${k.id}`;
    if (!s.has(l)) {
      s.add(l);
      const r = t[l] ?? { x: 790, y: u };
      i.push({
        id: l,
        label: k.label,
        x: r.x,
        y: r.y,
        w: za,
        h: Ua,
        kind: k.external ? "external-system" : "boundedContext",
        symbol: "component",
        fill: k.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: k.external,
        badge: k.external ? "EXTERNAL" : "BOUNDED_CONTEXT"
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
      targetId: l,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: i, edges: o };
}
const Ba = 190, ja = 56, Tn = 170, Wa = 52;
function ui(e, t) {
  const n = [], i = [], o = (s) => {
    var a;
    return (a = e.boundedContexts.find((d) => d.id === s)) == null ? void 0 : a.name;
  };
  return (e.processes ?? []).forEach((s, a) => {
    const d = 140 + a * 240, c = t[s.id] ?? { x: 150, y: d };
    n.push({
      id: s.id,
      label: s.name,
      x: c.x,
      y: c.y,
      w: Ba,
      h: ja,
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
        w: Tn,
        h: Wa,
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
        const k = `comp:${g.id}`, l = t[k] ?? { x: y.x, y: y.y + 90 };
        n.push({
          id: k,
          label: g.compensationUseCaseId,
          x: l.x,
          y: l.y,
          w: Tn,
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
          targetId: k,
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
        w: Tn,
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
const fn = globalThis, ei = fn.ShadowRoot && (fn.ShadyCSS === void 0 || fn.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ti = Symbol(), mi = /* @__PURE__ */ new WeakMap();
let co = class {
  constructor(t, n, i) {
    if (this._$cssResult$ = !0, i !== ti) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (ei && t === void 0) {
      const i = n !== void 0 && n.length === 1;
      i && (t = mi.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && mi.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Va = (e) => new co(typeof e == "string" ? e : e + "", void 0, ti), vt = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((i, o, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new co(n, e, ti);
}, Ha = (e, t) => {
  if (ei) e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet);
  else for (const n of t) {
    const i = document.createElement("style"), o = fn.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = n.cssText, e.appendChild(i);
  }
}, fi = ei ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const i of t.cssRules) n += i.cssText;
  return Va(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ga, defineProperty: Ya, getOwnPropertyDescriptor: Ka, getOwnPropertyNames: Xa, getOwnPropertySymbols: Ja, getPrototypeOf: Qa } = Object, st = globalThis, hi = st.trustedTypes, Za = hi ? hi.emptyScript : "", On = st.reactiveElementPolyfillSupport, qt = (e, t) => e, In = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Za : null;
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
} }, ni = (e, t) => !Ga(e, t), gi = { attribute: !0, type: String, converter: In, reflect: !1, useDefault: !1, hasChanged: ni };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), st.litPropertyMetadata ?? (st.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let _t = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, n = gi) {
    if (n.state && (n.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((n = Object.create(n)).wrapped = !0), this.elementProperties.set(t, n), !n.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(t, i, n);
      o !== void 0 && Ya(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, n, i) {
    const { get: o, set: s } = Ka(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? gi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(qt("elementProperties"))) return;
    const t = Qa(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(qt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(qt("properties"))) {
      const n = this.properties, i = [...Xa(n), ...Ja(n)];
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
      for (const o of i) n.unshift(fi(o));
    } else t !== void 0 && n.push(fi(t));
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
    return Ha(t, this.constructor.elementStyles), t;
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
      const a = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : In).toAttribute(n, i.type);
      this._$Em = t, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(t, n) {
    var s, a;
    const i = this.constructor, o = i._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const d = i.getPropertyOptions(o), c = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((s = d.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? d.converter : In;
      this._$Em = o;
      const u = c.fromAttribute(n, d.type);
      this[o] = u ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, n, i, o = !1, s) {
    var a;
    if (t !== void 0) {
      const d = this.constructor;
      if (o === !1 && (s = this[t]), i ?? (i = d.getPropertyOptions(t)), !((i.hasChanged ?? ni)(s, n) || i.useDefault && i.reflect && s === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(d._$Eu(t, i)))) return;
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
        const { wrapped: d } = a, c = this[s];
        d !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, a, c);
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
_t.elementStyles = [], _t.shadowRootOptions = { mode: "open" }, _t[qt("elementProperties")] = /* @__PURE__ */ new Map(), _t[qt("finalized")] = /* @__PURE__ */ new Map(), On == null || On({ ReactiveElement: _t }), (st.reactiveElementVersions ?? (st.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft = globalThis, yi = (e) => e, xn = Ft.trustedTypes, bi = xn ? xn.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, po = "$lit$", at = `lit$${Math.random().toFixed(9).slice(2)}$`, uo = "?" + at, es = `<${uo}>`, It = document, jt = () => It.createComment(""), Wt = (e) => e === null || typeof e != "object" && typeof e != "function", ii = Array.isArray, ts = (e) => ii(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Rn = `[ 	
\f\r]`, Tt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ii = /-->/g, xi = />/g, lt = RegExp(`>|${Rn}(?:([^\\s"'>=/]+)(${Rn}*=${Rn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), vi = /'/g, wi = /"/g, mo = /^(?:script|style|textarea|title)$/i, fo = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), E = fo(1), ne = fo(2), Et = Symbol.for("lit-noChange"), de = Symbol.for("lit-nothing"), ki = /* @__PURE__ */ new WeakMap(), ht = It.createTreeWalker(It, 129);
function ho(e, t) {
  if (!ii(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return bi !== void 0 ? bi.createHTML(t) : t;
}
const ns = (e, t) => {
  const n = e.length - 1, i = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Tt;
  for (let d = 0; d < n; d++) {
    const c = e[d];
    let u, g, h = -1, f = 0;
    for (; f < c.length && (a.lastIndex = f, g = a.exec(c), g !== null); ) f = a.lastIndex, a === Tt ? g[1] === "!--" ? a = Ii : g[1] !== void 0 ? a = xi : g[2] !== void 0 ? (mo.test(g[2]) && (o = RegExp("</" + g[2], "g")), a = lt) : g[3] !== void 0 && (a = lt) : a === lt ? g[0] === ">" ? (a = o ?? Tt, h = -1) : g[1] === void 0 ? h = -2 : (h = a.lastIndex - g[2].length, u = g[1], a = g[3] === void 0 ? lt : g[3] === '"' ? wi : vi) : a === wi || a === vi ? a = lt : a === Ii || a === xi ? a = Tt : (a = lt, o = void 0);
    const y = a === lt && e[d + 1].startsWith("/>") ? " " : "";
    s += a === Tt ? c + es : h >= 0 ? (i.push(u), c.slice(0, h) + po + c.slice(h) + at + y) : c + at + (h === -2 ? d : y);
  }
  return [ho(e, s + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class Vt {
  constructor({ strings: t, _$litType$: n }, i) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const d = t.length - 1, c = this.parts, [u, g] = ns(t, n);
    if (this.el = Vt.createElement(u, i), ht.currentNode = this.el.content, n === 2 || n === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = ht.nextNode()) !== null && c.length < d; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(po)) {
          const f = g[a++], y = o.getAttribute(h).split(at), k = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: s, name: k[2], strings: y, ctor: k[1] === "." ? os : k[1] === "?" ? as : k[1] === "@" ? ss : En }), o.removeAttribute(h);
        } else h.startsWith(at) && (c.push({ type: 6, index: s }), o.removeAttribute(h));
        if (mo.test(o.tagName)) {
          const h = o.textContent.split(at), f = h.length - 1;
          if (f > 0) {
            o.textContent = xn ? xn.emptyScript : "";
            for (let y = 0; y < f; y++) o.append(h[y], jt()), ht.nextNode(), c.push({ type: 2, index: ++s });
            o.append(h[f], jt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === uo) c.push({ type: 2, index: s });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(at, h + 1)) !== -1; ) c.push({ type: 7, index: s }), h += at.length - 1;
      }
      s++;
    }
  }
  static createElement(t, n) {
    const i = It.createElement("template");
    return i.innerHTML = t, i;
  }
}
function At(e, t, n = e, i) {
  var a, d;
  if (t === Et) return t;
  let o = i !== void 0 ? (a = n._$Co) == null ? void 0 : a[i] : n._$Cl;
  const s = Wt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== s && ((d = o == null ? void 0 : o._$AO) == null || d.call(o, !1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, n, i)), i !== void 0 ? (n._$Co ?? (n._$Co = []))[i] = o : n._$Cl = o), o !== void 0 && (t = At(e, o._$AS(e, t.values), o, i)), t;
}
class is {
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
    ht.currentNode = o;
    let s = ht.nextNode(), a = 0, d = 0, c = i[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let u;
        c.type === 2 ? u = new Xt(s, s.nextSibling, this, t) : c.type === 1 ? u = new c.ctor(s, c.name, c.strings, this, t) : c.type === 6 && (u = new rs(s, this, t)), this._$AV.push(u), c = i[++d];
      }
      a !== (c == null ? void 0 : c.index) && (s = ht.nextNode(), a++);
    }
    return ht.currentNode = It, o;
  }
  p(t) {
    let n = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, n), n += i.strings.length - 2) : i._$AI(t[n])), n++;
  }
}
class Xt {
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
    t = At(this, t, n), Wt(t) ? t === de || t == null || t === "" ? (this._$AH !== de && this._$AR(), this._$AH = de) : t !== this._$AH && t !== Et && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ts(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== de && Wt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(It.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: n, _$litType$: i } = t, o = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Vt.createElement(ho(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === o) this._$AH.p(n);
    else {
      const a = new is(o, this), d = a.u(this.options);
      a.p(n), this.T(d), this._$AH = a;
    }
  }
  _$AC(t) {
    let n = ki.get(t.strings);
    return n === void 0 && ki.set(t.strings, n = new Vt(t)), n;
  }
  k(t) {
    ii(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let i, o = 0;
    for (const s of t) o === n.length ? n.push(i = new Xt(this.O(jt()), this.O(jt()), this, this.options)) : i = n[o], i._$AI(s), o++;
    o < n.length && (this._$AR(i && i._$AB.nextSibling, o), n.length = o);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, n); t !== this._$AB; ) {
      const o = yi(t).nextSibling;
      yi(t).remove(), t = o;
    }
  }
  setConnected(t) {
    var n;
    this._$AM === void 0 && (this._$Cv = t, (n = this._$AP) == null || n.call(this, t));
  }
}
class En {
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
    if (s === void 0) t = At(this, t, n, 0), a = !Wt(t) || t !== this._$AH && t !== Et, a && (this._$AH = t);
    else {
      const d = t;
      let c, u;
      for (t = s[0], c = 0; c < s.length - 1; c++) u = At(this, d[i + c], n, c), u === Et && (u = this._$AH[c]), a || (a = !Wt(u) || u !== this._$AH[c]), u === de ? t = de : t !== de && (t += (u ?? "") + s[c + 1]), this._$AH[c] = u;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === de ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class os extends En {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === de ? void 0 : t;
  }
}
class as extends En {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== de);
  }
}
class ss extends En {
  constructor(t, n, i, o, s) {
    super(t, n, i, o, s), this.type = 5;
  }
  _$AI(t, n = this) {
    if ((t = At(this, t, n, 0) ?? de) === Et) return;
    const i = this._$AH, o = t === de && i !== de || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, s = t !== de && (i === de || o);
    o && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var n;
    typeof this._$AH == "function" ? this._$AH.call(((n = this.options) == null ? void 0 : n.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class rs {
  constructor(t, n, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    At(this, t);
  }
}
const Nn = Ft.litHtmlPolyfillSupport;
Nn == null || Nn(Vt, Xt), (Ft.litHtmlVersions ?? (Ft.litHtmlVersions = [])).push("3.3.3");
const ds = (e, t, n) => {
  const i = (n == null ? void 0 : n.renderBefore) ?? t;
  let o = i._$litPart$;
  if (o === void 0) {
    const s = (n == null ? void 0 : n.renderBefore) ?? null;
    i._$litPart$ = o = new Xt(t.insertBefore(jt(), s), s, void 0, n ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt = globalThis;
class Ge extends _t {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ds(n, this.renderRoot, this.renderOptions);
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
    return Et;
  }
}
var oo;
Ge._$litElement$ = !0, Ge.finalized = !0, (oo = yt.litElementHydrateSupport) == null || oo.call(yt, { LitElement: Ge });
const Ln = yt.litElementPolyfillSupport;
Ln == null || Ln({ LitElement: Ge });
(yt.litElementVersions ?? (yt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = (e) => (t, n) => {
  n !== void 0 ? n.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ls = { attribute: !0, type: String, converter: In, reflect: !1, hasChanged: ni }, cs = (e = ls, t, n) => {
  const { kind: i, metadata: o } = n;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(n.name, e), i === "accessor") {
    const { name: a } = n;
    return { set(d) {
      const c = t.get.call(this);
      t.set.call(this, d), this.requestUpdate(a, c, e, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(a, void 0, e, d), d;
    } };
  }
  if (i === "setter") {
    const { name: a } = n;
    return function(d) {
      const c = this[a];
      t.call(this, d), this.requestUpdate(a, c, e, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function le(e) {
  return (t, n) => typeof n == "object" ? cs(e, t, n) : ((i, o, s) => {
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
var jn = "http://www.w3.org/1999/xhtml";
const $i = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: jn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function An(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), $i.hasOwnProperty(t) ? { space: $i[t], local: e } : e;
}
function ps(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === jn && t.documentElement.namespaceURI === jn ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function us(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function go(e) {
  var t = An(e);
  return (t.local ? us : ps)(t);
}
function ms() {
}
function oi(e) {
  return e == null ? ms : function() {
    return this.querySelector(e);
  };
}
function fs(e) {
  typeof e != "function" && (e = oi(e));
  for (var t = this._groups, n = t.length, i = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], a = s.length, d = i[o] = new Array(a), c, u, g = 0; g < a; ++g)
      (c = s[g]) && (u = e.call(c, c.__data__, g, s)) && ("__data__" in c && (u.__data__ = c.__data__), d[g] = u);
  return new je(i, this._parents);
}
function hs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function gs() {
  return [];
}
function yo(e) {
  return e == null ? gs : function() {
    return this.querySelectorAll(e);
  };
}
function ys(e) {
  return function() {
    return hs(e.apply(this, arguments));
  };
}
function bs(e) {
  typeof e == "function" ? e = ys(e) : e = yo(e);
  for (var t = this._groups, n = t.length, i = [], o = [], s = 0; s < n; ++s)
    for (var a = t[s], d = a.length, c, u = 0; u < d; ++u)
      (c = a[u]) && (i.push(e.call(c, c.__data__, u, a)), o.push(c));
  return new je(i, o);
}
function bo(e) {
  return function() {
    return this.matches(e);
  };
}
function Io(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Is = Array.prototype.find;
function xs(e) {
  return function() {
    return Is.call(this.children, e);
  };
}
function vs() {
  return this.firstElementChild;
}
function ws(e) {
  return this.select(e == null ? vs : xs(typeof e == "function" ? e : Io(e)));
}
var ks = Array.prototype.filter;
function $s() {
  return Array.from(this.children);
}
function _s(e) {
  return function() {
    return ks.call(this.children, e);
  };
}
function Cs(e) {
  return this.selectAll(e == null ? $s : _s(typeof e == "function" ? e : Io(e)));
}
function Ss(e) {
  typeof e != "function" && (e = bo(e));
  for (var t = this._groups, n = t.length, i = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], a = s.length, d = i[o] = [], c, u = 0; u < a; ++u)
      (c = s[u]) && e.call(c, c.__data__, u, s) && d.push(c);
  return new je(i, this._parents);
}
function xo(e) {
  return new Array(e.length);
}
function Es() {
  return new je(this._enter || this._groups.map(xo), this._parents);
}
function vn(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
vn.prototype = {
  constructor: vn,
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
function As(e) {
  return function() {
    return e;
  };
}
function Ms(e, t, n, i, o, s) {
  for (var a = 0, d, c = t.length, u = s.length; a < u; ++a)
    (d = t[a]) ? (d.__data__ = s[a], i[a] = d) : n[a] = new vn(e, s[a]);
  for (; a < c; ++a)
    (d = t[a]) && (o[a] = d);
}
function Ps(e, t, n, i, o, s, a) {
  var d, c, u = /* @__PURE__ */ new Map(), g = t.length, h = s.length, f = new Array(g), y;
  for (d = 0; d < g; ++d)
    (c = t[d]) && (f[d] = y = a.call(c, c.__data__, d, t) + "", u.has(y) ? o[d] = c : u.set(y, c));
  for (d = 0; d < h; ++d)
    y = a.call(e, s[d], d, s) + "", (c = u.get(y)) ? (i[d] = c, c.__data__ = s[d], u.delete(y)) : n[d] = new vn(e, s[d]);
  for (d = 0; d < g; ++d)
    (c = t[d]) && u.get(f[d]) === c && (o[d] = c);
}
function Ts(e) {
  return e.__data__;
}
function Os(e, t) {
  if (!arguments.length) return Array.from(this, Ts);
  var n = t ? Ps : Ms, i = this._parents, o = this._groups;
  typeof e != "function" && (e = As(e));
  for (var s = o.length, a = new Array(s), d = new Array(s), c = new Array(s), u = 0; u < s; ++u) {
    var g = i[u], h = o[u], f = h.length, y = Rs(e.call(g, g && g.__data__, u, i)), k = y.length, l = d[u] = new Array(k), r = a[u] = new Array(k), m = c[u] = new Array(f);
    n(g, h, l, r, m, y, t);
    for (var w = 0, M = 0, C, R; w < k; ++w)
      if (C = l[w]) {
        for (w >= M && (M = w + 1); !(R = r[M]) && ++M < k; ) ;
        C._next = R || null;
      }
  }
  return a = new je(a, i), a._enter = d, a._exit = c, a;
}
function Rs(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ns() {
  return new je(this._exit || this._groups.map(xo), this._parents);
}
function Ls(e, t, n) {
  var i = this.enter(), o = this, s = this.exit();
  return typeof e == "function" ? (i = e(i), i && (i = i.selection())) : i = i.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), n == null ? s.remove() : n(s), i && o ? i.merge(o).order() : o;
}
function Ds(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, i = t._groups, o = n.length, s = i.length, a = Math.min(o, s), d = new Array(o), c = 0; c < a; ++c)
    for (var u = n[c], g = i[c], h = u.length, f = d[c] = new Array(h), y, k = 0; k < h; ++k)
      (y = u[k] || g[k]) && (f[k] = y);
  for (; c < o; ++c)
    d[c] = n[c];
  return new je(d, this._parents);
}
function zs() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var i = e[t], o = i.length - 1, s = i[o], a; --o >= 0; )
      (a = i[o]) && (s && a.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(a, s), s = a);
  return this;
}
function Us(e) {
  e || (e = qs);
  function t(h, f) {
    return h && f ? e(h.__data__, f.__data__) : !h - !f;
  }
  for (var n = this._groups, i = n.length, o = new Array(i), s = 0; s < i; ++s) {
    for (var a = n[s], d = a.length, c = o[s] = new Array(d), u, g = 0; g < d; ++g)
      (u = a[g]) && (c[g] = u);
    c.sort(t);
  }
  return new je(o, this._parents).order();
}
function qs(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Fs() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Bs() {
  return Array.from(this);
}
function js() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], o = 0, s = i.length; o < s; ++o) {
      var a = i[o];
      if (a) return a;
    }
  return null;
}
function Ws() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Vs() {
  return !this.node();
}
function Hs(e) {
  for (var t = this._groups, n = 0, i = t.length; n < i; ++n)
    for (var o = t[n], s = 0, a = o.length, d; s < a; ++s)
      (d = o[s]) && e.call(d, d.__data__, s, o);
  return this;
}
function Gs(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Ys(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ks(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Xs(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Js(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Qs(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Zs(e, t) {
  var n = An(e);
  if (arguments.length < 2) {
    var i = this.node();
    return n.local ? i.getAttributeNS(n.space, n.local) : i.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Ys : Gs : typeof t == "function" ? n.local ? Qs : Js : n.local ? Xs : Ks)(n, t));
}
function vo(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function er(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function tr(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function nr(e, t, n) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.style.removeProperty(e) : this.style.setProperty(e, i, n);
  };
}
function ir(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? er : typeof t == "function" ? nr : tr)(e, t, n ?? "")) : Mt(this.node(), e);
}
function Mt(e, t) {
  return e.style.getPropertyValue(t) || vo(e).getComputedStyle(e, null).getPropertyValue(t);
}
function or(e) {
  return function() {
    delete this[e];
  };
}
function ar(e, t) {
  return function() {
    this[e] = t;
  };
}
function sr(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function rr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? or : typeof t == "function" ? sr : ar)(e, t)) : this.node()[e];
}
function wo(e) {
  return e.trim().split(/^|\s+/);
}
function ai(e) {
  return e.classList || new ko(e);
}
function ko(e) {
  this._node = e, this._names = wo(e.getAttribute("class") || "");
}
ko.prototype = {
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
function $o(e, t) {
  for (var n = ai(e), i = -1, o = t.length; ++i < o; ) n.add(t[i]);
}
function _o(e, t) {
  for (var n = ai(e), i = -1, o = t.length; ++i < o; ) n.remove(t[i]);
}
function dr(e) {
  return function() {
    $o(this, e);
  };
}
function lr(e) {
  return function() {
    _o(this, e);
  };
}
function cr(e, t) {
  return function() {
    (t.apply(this, arguments) ? $o : _o)(this, e);
  };
}
function pr(e, t) {
  var n = wo(e + "");
  if (arguments.length < 2) {
    for (var i = ai(this.node()), o = -1, s = n.length; ++o < s; ) if (!i.contains(n[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? cr : t ? dr : lr)(n, t));
}
function ur() {
  this.textContent = "";
}
function mr(e) {
  return function() {
    this.textContent = e;
  };
}
function fr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function hr(e) {
  return arguments.length ? this.each(e == null ? ur : (typeof e == "function" ? fr : mr)(e)) : this.node().textContent;
}
function gr() {
  this.innerHTML = "";
}
function yr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function br(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Ir(e) {
  return arguments.length ? this.each(e == null ? gr : (typeof e == "function" ? br : yr)(e)) : this.node().innerHTML;
}
function xr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function vr() {
  return this.each(xr);
}
function wr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function kr() {
  return this.each(wr);
}
function $r(e) {
  var t = typeof e == "function" ? e : go(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function _r() {
  return null;
}
function Cr(e, t) {
  var n = typeof e == "function" ? e : go(e), i = t == null ? _r : typeof t == "function" ? t : oi(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), i.apply(this, arguments) || null);
  });
}
function Sr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Er() {
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
    var n = "", i = t.indexOf(".");
    return i >= 0 && (n = t.slice(i + 1), t = t.slice(0, i)), { type: t, name: n };
  });
}
function Nr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, i = -1, o = t.length, s; n < o; ++n)
        s = t[n], (!e.type || s.type === e.type) && s.name === e.name ? this.removeEventListener(s.type, s.listener, s.options) : t[++i] = s;
      ++i ? t.length = i : delete this.__on;
    }
  };
}
function Lr(e, t, n) {
  return function() {
    var i = this.__on, o, s = Or(t);
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
function Dr(e, t, n) {
  var i = Rr(e + ""), o, s = i.length, a;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var c = 0, u = d.length, g; c < u; ++c)
        for (o = 0, g = d[c]; o < s; ++o)
          if ((a = i[o]).type === g.type && a.name === g.name)
            return g.value;
    }
    return;
  }
  for (d = t ? Lr : Nr, o = 0; o < s; ++o) this.each(d(i[o], t, n));
  return this;
}
function Co(e, t, n) {
  var i = vo(e), o = i.CustomEvent;
  typeof o == "function" ? o = new o(t, n) : (o = i.document.createEvent("Event"), n ? (o.initEvent(t, n.bubbles, n.cancelable), o.detail = n.detail) : o.initEvent(t, !1, !1)), e.dispatchEvent(o);
}
function zr(e, t) {
  return function() {
    return Co(this, e, t);
  };
}
function Ur(e, t) {
  return function() {
    return Co(this, e, t.apply(this, arguments));
  };
}
function qr(e, t) {
  return this.each((typeof t == "function" ? Ur : zr)(e, t));
}
function* Fr() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var i = e[t], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && (yield a);
}
var So = [null];
function je(e, t) {
  this._groups = e, this._parents = t;
}
function Jt() {
  return new je([[document.documentElement]], So);
}
function Br() {
  return this;
}
je.prototype = Jt.prototype = {
  constructor: je,
  select: fs,
  selectAll: bs,
  selectChild: ws,
  selectChildren: Cs,
  filter: Ss,
  data: Os,
  enter: Es,
  exit: Ns,
  join: Ls,
  merge: Ds,
  selection: Br,
  order: zs,
  sort: Us,
  call: Fs,
  nodes: Bs,
  node: js,
  size: Ws,
  empty: Vs,
  each: Hs,
  attr: Zs,
  style: ir,
  property: rr,
  classed: pr,
  text: hr,
  html: Ir,
  raise: vr,
  lower: kr,
  append: $r,
  insert: Cr,
  remove: Er,
  clone: Pr,
  datum: Tr,
  on: Dr,
  dispatch: qr,
  [Symbol.iterator]: Fr
};
function Ve(e) {
  return typeof e == "string" ? new je([[document.querySelector(e)]], [document.documentElement]) : new je([[e]], So);
}
function jr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ct(e, t) {
  if (e = jr(e), t === void 0 && (t = e.currentTarget), t) {
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
var Wr = { value: () => {
} };
function si() {
  for (var e = 0, t = arguments.length, n = {}, i; e < t; ++e) {
    if (!(i = arguments[e] + "") || i in n || /[\s.]/.test(i)) throw new Error("illegal type: " + i);
    n[i] = [];
  }
  return new hn(n);
}
function hn(e) {
  this._ = e;
}
function Vr(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var i = "", o = n.indexOf(".");
    if (o >= 0 && (i = n.slice(o + 1), n = n.slice(0, o)), n && !t.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: i };
  });
}
hn.prototype = si.prototype = {
  constructor: hn,
  on: function(e, t) {
    var n = this._, i = Vr(e + "", n), o, s = -1, a = i.length;
    if (arguments.length < 2) {
      for (; ++s < a; ) if ((o = (e = i[s]).type) && (o = Hr(n[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++s < a; )
      if (o = (e = i[s]).type) n[o] = _i(n[o], e.name, t);
      else if (t == null) for (o in n) n[o] = _i(n[o], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t) e[n] = t[n].slice();
    return new hn(e);
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
function Hr(e, t) {
  for (var n = 0, i = e.length, o; n < i; ++n)
    if ((o = e[n]).name === t)
      return o.value;
}
function _i(e, t, n) {
  for (var i = 0, o = e.length; i < o; ++i)
    if (e[i].name === t) {
      e[i] = Wr, e = e.slice(0, i).concat(e.slice(i + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
const Wn = { capture: !0, passive: !1 };
function Vn(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Gr(e) {
  var t = e.document.documentElement, n = Ve(e).on("dragstart.drag", Vn, Wn);
  "onselectstart" in t ? n.on("selectstart.drag", Vn, Wn) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Yr(e, t) {
  var n = e.document.documentElement, i = Ve(e).on("dragstart.drag", null);
  t && (i.on("click.drag", Vn, Wn), setTimeout(function() {
    i.on("click.drag", null);
  }, 0)), "onselectstart" in n ? i.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
function ri(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Eo(e, t) {
  var n = Object.create(e.prototype);
  for (var i in t) n[i] = t[i];
  return n;
}
function Qt() {
}
var Ht = 0.7, wn = 1 / Ht, St = "\\s*([+-]?\\d+)\\s*", Gt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ke = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Kr = /^#([0-9a-f]{3,8})$/, Xr = new RegExp(`^rgb\\(${St},${St},${St}\\)$`), Jr = new RegExp(`^rgb\\(${Ke},${Ke},${Ke}\\)$`), Qr = new RegExp(`^rgba\\(${St},${St},${St},${Gt}\\)$`), Zr = new RegExp(`^rgba\\(${Ke},${Ke},${Ke},${Gt}\\)$`), ed = new RegExp(`^hsl\\(${Gt},${Ke},${Ke}\\)$`), td = new RegExp(`^hsla\\(${Gt},${Ke},${Ke},${Gt}\\)$`), Ci = {
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
ri(Qt, Yt, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Si,
  // Deprecated! Use color.formatHex.
  formatHex: Si,
  formatHex8: nd,
  formatHsl: id,
  formatRgb: Ei,
  toString: Ei
});
function Si() {
  return this.rgb().formatHex();
}
function nd() {
  return this.rgb().formatHex8();
}
function id() {
  return Ao(this).formatHsl();
}
function Ei() {
  return this.rgb().formatRgb();
}
function Yt(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Kr.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Ai(t) : n === 3 ? new ze(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? en(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? en(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Xr.exec(e)) ? new ze(t[1], t[2], t[3], 1) : (t = Jr.exec(e)) ? new ze(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Qr.exec(e)) ? en(t[1], t[2], t[3], t[4]) : (t = Zr.exec(e)) ? en(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = ed.exec(e)) ? Ti(t[1], t[2] / 100, t[3] / 100, 1) : (t = td.exec(e)) ? Ti(t[1], t[2] / 100, t[3] / 100, t[4]) : Ci.hasOwnProperty(e) ? Ai(Ci[e]) : e === "transparent" ? new ze(NaN, NaN, NaN, 0) : null;
}
function Ai(e) {
  return new ze(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function en(e, t, n, i) {
  return i <= 0 && (e = t = n = NaN), new ze(e, t, n, i);
}
function od(e) {
  return e instanceof Qt || (e = Yt(e)), e ? (e = e.rgb(), new ze(e.r, e.g, e.b, e.opacity)) : new ze();
}
function Hn(e, t, n, i) {
  return arguments.length === 1 ? od(e) : new ze(e, t, n, i ?? 1);
}
function ze(e, t, n, i) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +i;
}
ri(ze, Hn, Eo(Qt, {
  brighter(e) {
    return e = e == null ? wn : Math.pow(wn, e), new ze(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ht : Math.pow(Ht, e), new ze(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new ze(bt(this.r), bt(this.g), bt(this.b), kn(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Mi,
  // Deprecated! Use color.formatHex.
  formatHex: Mi,
  formatHex8: ad,
  formatRgb: Pi,
  toString: Pi
}));
function Mi() {
  return `#${gt(this.r)}${gt(this.g)}${gt(this.b)}`;
}
function ad() {
  return `#${gt(this.r)}${gt(this.g)}${gt(this.b)}${gt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Pi() {
  const e = kn(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${bt(this.r)}, ${bt(this.g)}, ${bt(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function kn(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function bt(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function gt(e) {
  return e = bt(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ti(e, t, n, i) {
  return i <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new He(e, t, n, i);
}
function Ao(e) {
  if (e instanceof He) return new He(e.h, e.s, e.l, e.opacity);
  if (e instanceof Qt || (e = Yt(e)), !e) return new He();
  if (e instanceof He) return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, i = e.b / 255, o = Math.min(t, n, i), s = Math.max(t, n, i), a = NaN, d = s - o, c = (s + o) / 2;
  return d ? (t === s ? a = (n - i) / d + (n < i) * 6 : n === s ? a = (i - t) / d + 2 : a = (t - n) / d + 4, d /= c < 0.5 ? s + o : 2 - s - o, a *= 60) : d = c > 0 && c < 1 ? 0 : a, new He(a, d, c, e.opacity);
}
function sd(e, t, n, i) {
  return arguments.length === 1 ? Ao(e) : new He(e, t, n, i ?? 1);
}
function He(e, t, n, i) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +i;
}
ri(He, sd, Eo(Qt, {
  brighter(e) {
    return e = e == null ? wn : Math.pow(wn, e), new He(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ht : Math.pow(Ht, e), new He(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, i = n + (n < 0.5 ? n : 1 - n) * t, o = 2 * n - i;
    return new ze(
      Dn(e >= 240 ? e - 240 : e + 120, o, i),
      Dn(e, o, i),
      Dn(e < 120 ? e + 240 : e - 120, o, i),
      this.opacity
    );
  },
  clamp() {
    return new He(Oi(this.h), tn(this.s), tn(this.l), kn(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = kn(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Oi(this.h)}, ${tn(this.s) * 100}%, ${tn(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Oi(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function tn(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Dn(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Mo = (e) => () => e;
function rd(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function dd(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(i) {
    return Math.pow(e + i * t, n);
  };
}
function ld(e) {
  return (e = +e) == 1 ? Po : function(t, n) {
    return n - t ? dd(t, n, e) : Mo(isNaN(t) ? n : t);
  };
}
function Po(e, t) {
  var n = t - e;
  return n ? rd(e, n) : Mo(isNaN(e) ? t : e);
}
const Ri = (function e(t) {
  var n = ld(t);
  function i(o, s) {
    var a = n((o = Hn(o)).r, (s = Hn(s)).r), d = n(o.g, s.g), c = n(o.b, s.b), u = Po(o.opacity, s.opacity);
    return function(g) {
      return o.r = a(g), o.g = d(g), o.b = c(g), o.opacity = u(g), o + "";
    };
  }
  return i.gamma = e, i;
})(1);
function ot(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Gn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, zn = new RegExp(Gn.source, "g");
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
  var n = Gn.lastIndex = zn.lastIndex = 0, i, o, s, a = -1, d = [], c = [];
  for (e = e + "", t = t + ""; (i = Gn.exec(e)) && (o = zn.exec(t)); )
    (s = o.index) > n && (s = t.slice(n, s), d[a] ? d[a] += s : d[++a] = s), (i = i[0]) === (o = o[0]) ? d[a] ? d[a] += o : d[++a] = o : (d[++a] = null, c.push({ i: a, x: ot(i, o) })), n = zn.lastIndex;
  return n < t.length && (s = t.slice(n), d[a] ? d[a] += s : d[++a] = s), d.length < 2 ? c[0] ? pd(c[0].x) : cd(t) : (t = c.length, function(u) {
    for (var g = 0, h; g < t; ++g) d[(h = c[g]).i] = h.x(u);
    return d.join("");
  });
}
var Ni = 180 / Math.PI, Yn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function To(e, t, n, i, o, s) {
  var a, d, c;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (c = e * n + t * i) && (n -= e * c, i -= t * c), (d = Math.sqrt(n * n + i * i)) && (n /= d, i /= d, c /= d), e * i < t * n && (e = -e, t = -t, c = -c, a = -a), {
    translateX: o,
    translateY: s,
    rotate: Math.atan2(t, e) * Ni,
    skewX: Math.atan(c) * Ni,
    scaleX: a,
    scaleY: d
  };
}
var nn;
function md(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Yn : To(t.a, t.b, t.c, t.d, t.e, t.f);
}
function fd(e) {
  return e == null || (nn || (nn = document.createElementNS("http://www.w3.org/2000/svg", "g")), nn.setAttribute("transform", e), !(e = nn.transform.baseVal.consolidate())) ? Yn : (e = e.matrix, To(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Oo(e, t, n, i) {
  function o(u) {
    return u.length ? u.pop() + " " : "";
  }
  function s(u, g, h, f, y, k) {
    if (u !== h || g !== f) {
      var l = y.push("translate(", null, t, null, n);
      k.push({ i: l - 4, x: ot(u, h) }, { i: l - 2, x: ot(g, f) });
    } else (h || f) && y.push("translate(" + h + t + f + n);
  }
  function a(u, g, h, f) {
    u !== g ? (u - g > 180 ? g += 360 : g - u > 180 && (u += 360), f.push({ i: h.push(o(h) + "rotate(", null, i) - 2, x: ot(u, g) })) : g && h.push(o(h) + "rotate(" + g + i);
  }
  function d(u, g, h, f) {
    u !== g ? f.push({ i: h.push(o(h) + "skewX(", null, i) - 2, x: ot(u, g) }) : g && h.push(o(h) + "skewX(" + g + i);
  }
  function c(u, g, h, f, y, k) {
    if (u !== h || g !== f) {
      var l = y.push(o(y) + "scale(", null, ",", null, ")");
      k.push({ i: l - 4, x: ot(u, h) }, { i: l - 2, x: ot(g, f) });
    } else (h !== 1 || f !== 1) && y.push(o(y) + "scale(" + h + "," + f + ")");
  }
  return function(u, g) {
    var h = [], f = [];
    return u = e(u), g = e(g), s(u.translateX, u.translateY, g.translateX, g.translateY, h, f), a(u.rotate, g.rotate, h, f), d(u.skewX, g.skewX, h, f), c(u.scaleX, u.scaleY, g.scaleX, g.scaleY, h, f), u = g = null, function(y) {
      for (var k = -1, l = f.length, r; ++k < l; ) h[(r = f[k]).i] = r.x(y);
      return h.join("");
    };
  };
}
var hd = Oo(md, "px, ", "px)", "deg)"), gd = Oo(fd, ", ", ")", ")"), yd = 1e-12;
function Li(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function bd(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Id(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const xd = (function e(t, n, i) {
  function o(s, a) {
    var d = s[0], c = s[1], u = s[2], g = a[0], h = a[1], f = a[2], y = g - d, k = h - c, l = y * y + k * k, r, m;
    if (l < yd)
      m = Math.log(f / u) / t, r = function(O) {
        return [
          d + O * y,
          c + O * k,
          u * Math.exp(t * O * m)
        ];
      };
    else {
      var w = Math.sqrt(l), M = (f * f - u * u + i * l) / (2 * u * n * w), C = (f * f - u * u - i * l) / (2 * f * n * w), R = Math.log(Math.sqrt(M * M + 1) - M), _ = Math.log(Math.sqrt(C * C + 1) - C);
      m = (_ - R) / t, r = function(O) {
        var B = O * m, H = Li(R), se = u / (n * w) * (H * Id(t * B + R) - bd(R));
        return [
          d + se * y,
          c + se * k,
          u * H / Li(t * B + R)
        ];
      };
    }
    return r.duration = m * 1e3 * t / Math.SQRT2, r;
  }
  return o.rho = function(s) {
    var a = Math.max(1e-3, +s), d = a * a, c = d * d;
    return e(a, d, c);
  }, o;
})(Math.SQRT2, 2, 4);
var Pt = 0, Dt = 0, Ot = 0, Ro = 1e3, $n, zt, _n = 0, xt = 0, Mn = 0, Kt = typeof performance == "object" && performance.now ? performance : Date, No = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function di() {
  return xt || (No(vd), xt = Kt.now() + Mn);
}
function vd() {
  xt = 0;
}
function Cn() {
  this._call = this._time = this._next = null;
}
Cn.prototype = Lo.prototype = {
  constructor: Cn,
  restart: function(e, t, n) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    n = (n == null ? di() : +n) + (t == null ? 0 : +t), !this._next && zt !== this && (zt ? zt._next = this : $n = this, zt = this), this._call = e, this._time = n, Kn();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Kn());
  }
};
function Lo(e, t, n) {
  var i = new Cn();
  return i.restart(e, t, n), i;
}
function wd() {
  di(), ++Pt;
  for (var e = $n, t; e; )
    (t = xt - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Pt;
}
function Di() {
  xt = (_n = Kt.now()) + Mn, Pt = Dt = 0;
  try {
    wd();
  } finally {
    Pt = 0, $d(), xt = 0;
  }
}
function kd() {
  var e = Kt.now(), t = e - _n;
  t > Ro && (Mn -= t, _n = e);
}
function $d() {
  for (var e, t = $n, n, i = 1 / 0; t; )
    t._call ? (i > t._time && (i = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : $n = n);
  zt = e, Kn(i);
}
function Kn(e) {
  if (!Pt) {
    Dt && (Dt = clearTimeout(Dt));
    var t = e - xt;
    t > 24 ? (e < 1 / 0 && (Dt = setTimeout(Di, e - Kt.now() - Mn)), Ot && (Ot = clearInterval(Ot))) : (Ot || (_n = Kt.now(), Ot = setInterval(kd, Ro)), Pt = 1, No(Di));
  }
}
function zi(e, t, n) {
  var i = new Cn();
  return t = t == null ? 0 : +t, i.restart((o) => {
    i.stop(), e(o + t);
  }, t, n), i;
}
var _d = si("start", "end", "cancel", "interrupt"), Cd = [], Do = 0, Ui = 1, Xn = 2, gn = 3, qi = 4, Jn = 5, yn = 6;
function Pn(e, t, n, i, o, s) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (n in a) return;
  Sd(e, n, {
    name: t,
    index: i,
    // For context during callback.
    group: o,
    // For context during callback.
    on: _d,
    tween: Cd,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: Do
  });
}
function li(e, t) {
  var n = Ye(e, t);
  if (n.state > Do) throw new Error("too late; already scheduled");
  return n;
}
function Xe(e, t) {
  var n = Ye(e, t);
  if (n.state > gn) throw new Error("too late; already running");
  return n;
}
function Ye(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t])) throw new Error("transition not found");
  return n;
}
function Sd(e, t, n) {
  var i = e.__transition, o;
  i[t] = n, n.timer = Lo(s, 0, n.time);
  function s(u) {
    n.state = Ui, n.timer.restart(a, n.delay, n.time), n.delay <= u && a(u - n.delay);
  }
  function a(u) {
    var g, h, f, y;
    if (n.state !== Ui) return c();
    for (g in i)
      if (y = i[g], y.name === n.name) {
        if (y.state === gn) return zi(a);
        y.state === qi ? (y.state = yn, y.timer.stop(), y.on.call("interrupt", e, e.__data__, y.index, y.group), delete i[g]) : +g < t && (y.state = yn, y.timer.stop(), y.on.call("cancel", e, e.__data__, y.index, y.group), delete i[g]);
      }
    if (zi(function() {
      n.state === gn && (n.state = qi, n.timer.restart(d, n.delay, n.time), d(u));
    }), n.state = Xn, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Xn) {
      for (n.state = gn, o = new Array(f = n.tween.length), g = 0, h = -1; g < f; ++g)
        (y = n.tween[g].value.call(e, e.__data__, n.index, n.group)) && (o[++h] = y);
      o.length = h + 1;
    }
  }
  function d(u) {
    for (var g = u < n.duration ? n.ease.call(null, u / n.duration) : (n.timer.restart(c), n.state = Jn, 1), h = -1, f = o.length; ++h < f; )
      o[h].call(e, g);
    n.state === Jn && (n.on.call("end", e, e.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = yn, n.timer.stop(), delete i[t];
    for (var u in i) return;
    delete e.__transition;
  }
}
function bn(e, t) {
  var n = e.__transition, i, o, s = !0, a;
  if (n) {
    t = t == null ? null : t + "";
    for (a in n) {
      if ((i = n[a]).name !== t) {
        s = !1;
        continue;
      }
      o = i.state > Xn && i.state < Jn, i.state = yn, i.timer.stop(), i.on.call(o ? "interrupt" : "cancel", e, e.__data__, i.index, i.group), delete n[a];
    }
    s && delete e.__transition;
  }
}
function Ed(e) {
  return this.each(function() {
    bn(this, e);
  });
}
function Ad(e, t) {
  var n, i;
  return function() {
    var o = Xe(this, e), s = o.tween;
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
function Md(e, t, n) {
  var i, o;
  if (typeof n != "function") throw new Error();
  return function() {
    var s = Xe(this, e), a = s.tween;
    if (a !== i) {
      o = (i = a).slice();
      for (var d = { name: t, value: n }, c = 0, u = o.length; c < u; ++c)
        if (o[c].name === t) {
          o[c] = d;
          break;
        }
      c === u && o.push(d);
    }
    s.tween = o;
  };
}
function Pd(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var i = Ye(this.node(), n).tween, o = 0, s = i.length, a; o < s; ++o)
      if ((a = i[o]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? Ad : Md)(n, e, t));
}
function ci(e, t, n) {
  var i = e._id;
  return e.each(function() {
    var o = Xe(this, i);
    (o.value || (o.value = {}))[t] = n.apply(this, arguments);
  }), function(o) {
    return Ye(o, i).value[t];
  };
}
function zo(e, t) {
  var n;
  return (typeof t == "number" ? ot : t instanceof Yt ? Ri : (n = Yt(t)) ? (t = n, Ri) : ud)(e, t);
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
function Rd(e, t, n) {
  var i, o = n + "", s;
  return function() {
    var a = this.getAttribute(e);
    return a === o ? null : a === i ? s : s = t(i = a, n);
  };
}
function Nd(e, t, n) {
  var i, o = n + "", s;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === o ? null : a === i ? s : s = t(i = a, n);
  };
}
function Ld(e, t, n) {
  var i, o, s;
  return function() {
    var a, d = n(this), c;
    return d == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), c = d + "", a === c ? null : a === i && c === o ? s : (o = c, s = t(i = a, d)));
  };
}
function Dd(e, t, n) {
  var i, o, s;
  return function() {
    var a, d = n(this), c;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), c = d + "", a === c ? null : a === i && c === o ? s : (o = c, s = t(i = a, d)));
  };
}
function zd(e, t) {
  var n = An(e), i = n === "transform" ? gd : zo;
  return this.attrTween(e, typeof t == "function" ? (n.local ? Dd : Ld)(n, i, ci(this, "attr." + e, t)) : t == null ? (n.local ? Od : Td)(n) : (n.local ? Nd : Rd)(n, i, t));
}
function Ud(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function qd(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Fd(e, t) {
  var n, i;
  function o() {
    var s = t.apply(this, arguments);
    return s !== i && (n = (i = s) && qd(e, s)), n;
  }
  return o._value = t, o;
}
function Bd(e, t) {
  var n, i;
  function o() {
    var s = t.apply(this, arguments);
    return s !== i && (n = (i = s) && Ud(e, s)), n;
  }
  return o._value = t, o;
}
function jd(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  var i = An(e);
  return this.tween(n, (i.local ? Fd : Bd)(i, t));
}
function Wd(e, t) {
  return function() {
    li(this, e).delay = +t.apply(this, arguments);
  };
}
function Vd(e, t) {
  return t = +t, function() {
    li(this, e).delay = t;
  };
}
function Hd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Wd : Vd)(t, e)) : Ye(this.node(), t).delay;
}
function Gd(e, t) {
  return function() {
    Xe(this, e).duration = +t.apply(this, arguments);
  };
}
function Yd(e, t) {
  return t = +t, function() {
    Xe(this, e).duration = t;
  };
}
function Kd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Gd : Yd)(t, e)) : Ye(this.node(), t).duration;
}
function Xd(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Xe(this, e).ease = t;
  };
}
function Jd(e) {
  var t = this._id;
  return arguments.length ? this.each(Xd(t, e)) : Ye(this.node(), t).ease;
}
function Qd(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    Xe(this, e).ease = n;
  };
}
function Zd(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Qd(this._id, e));
}
function el(e) {
  typeof e != "function" && (e = bo(e));
  for (var t = this._groups, n = t.length, i = new Array(n), o = 0; o < n; ++o)
    for (var s = t[o], a = s.length, d = i[o] = [], c, u = 0; u < a; ++u)
      (c = s[u]) && e.call(c, c.__data__, u, s) && d.push(c);
  return new tt(i, this._parents, this._name, this._id);
}
function tl(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, n = e._groups, i = t.length, o = n.length, s = Math.min(i, o), a = new Array(i), d = 0; d < s; ++d)
    for (var c = t[d], u = n[d], g = c.length, h = a[d] = new Array(g), f, y = 0; y < g; ++y)
      (f = c[y] || u[y]) && (h[y] = f);
  for (; d < i; ++d)
    a[d] = t[d];
  return new tt(a, this._parents, this._name, this._id);
}
function nl(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function il(e, t, n) {
  var i, o, s = nl(t) ? li : Xe;
  return function() {
    var a = s(this, e), d = a.on;
    d !== i && (o = (i = d).copy()).on(t, n), a.on = o;
  };
}
function ol(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Ye(this.node(), n).on.on(e) : this.each(il(n, e, t));
}
function al(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition) if (+n !== e) return;
    t && t.removeChild(this);
  };
}
function sl() {
  return this.on("end.remove", al(this._id));
}
function rl(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = oi(e));
  for (var i = this._groups, o = i.length, s = new Array(o), a = 0; a < o; ++a)
    for (var d = i[a], c = d.length, u = s[a] = new Array(c), g, h, f = 0; f < c; ++f)
      (g = d[f]) && (h = e.call(g, g.__data__, f, d)) && ("__data__" in g && (h.__data__ = g.__data__), u[f] = h, Pn(u[f], t, n, f, u, Ye(g, n)));
  return new tt(s, this._parents, t, n);
}
function dl(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = yo(e));
  for (var i = this._groups, o = i.length, s = [], a = [], d = 0; d < o; ++d)
    for (var c = i[d], u = c.length, g, h = 0; h < u; ++h)
      if (g = c[h]) {
        for (var f = e.call(g, g.__data__, h, c), y, k = Ye(g, n), l = 0, r = f.length; l < r; ++l)
          (y = f[l]) && Pn(y, t, n, l, f, k);
        s.push(f), a.push(g);
      }
  return new tt(s, a, t, n);
}
var ll = Jt.prototype.constructor;
function cl() {
  return new ll(this._groups, this._parents);
}
function pl(e, t) {
  var n, i, o;
  return function() {
    var s = Mt(this, e), a = (this.style.removeProperty(e), Mt(this, e));
    return s === a ? null : s === n && a === i ? o : o = t(n = s, i = a);
  };
}
function Uo(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function ul(e, t, n) {
  var i, o = n + "", s;
  return function() {
    var a = Mt(this, e);
    return a === o ? null : a === i ? s : s = t(i = a, n);
  };
}
function ml(e, t, n) {
  var i, o, s;
  return function() {
    var a = Mt(this, e), d = n(this), c = d + "";
    return d == null && (c = d = (this.style.removeProperty(e), Mt(this, e))), a === c ? null : a === i && c === o ? s : (o = c, s = t(i = a, d));
  };
}
function fl(e, t) {
  var n, i, o, s = "style." + t, a = "end." + s, d;
  return function() {
    var c = Xe(this, e), u = c.on, g = c.value[s] == null ? d || (d = Uo(t)) : void 0;
    (u !== n || o !== g) && (i = (n = u).copy()).on(a, o = g), c.on = i;
  };
}
function hl(e, t, n) {
  var i = (e += "") == "transform" ? hd : zo;
  return t == null ? this.styleTween(e, pl(e, i)).on("end.style." + e, Uo(e)) : typeof t == "function" ? this.styleTween(e, ml(e, i, ci(this, "style." + e, t))).each(fl(this._id, e)) : this.styleTween(e, ul(e, i, t), n).on("end.style." + e, null);
}
function gl(e, t, n) {
  return function(i) {
    this.style.setProperty(e, t.call(this, i), n);
  };
}
function yl(e, t, n) {
  var i, o;
  function s() {
    var a = t.apply(this, arguments);
    return a !== o && (i = (o = a) && gl(e, a, n)), i;
  }
  return s._value = t, s;
}
function bl(e, t, n) {
  var i = "style." + (e += "");
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  return this.tween(i, yl(e, t, n ?? ""));
}
function Il(e) {
  return function() {
    this.textContent = e;
  };
}
function xl(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function vl(e) {
  return this.tween("text", typeof e == "function" ? xl(ci(this, "text", e)) : Il(e == null ? "" : e + ""));
}
function wl(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function kl(e) {
  var t, n;
  function i() {
    var o = e.apply(this, arguments);
    return o !== n && (t = (n = o) && wl(o)), t;
  }
  return i._value = e, i;
}
function $l(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, kl(e));
}
function _l() {
  for (var e = this._name, t = this._id, n = qo(), i = this._groups, o = i.length, s = 0; s < o; ++s)
    for (var a = i[s], d = a.length, c, u = 0; u < d; ++u)
      if (c = a[u]) {
        var g = Ye(c, t);
        Pn(c, e, n, u, a, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new tt(i, this._parents, e, n);
}
function Cl() {
  var e, t, n = this, i = n._id, o = n.size();
  return new Promise(function(s, a) {
    var d = { value: a }, c = { value: function() {
      --o === 0 && s();
    } };
    n.each(function() {
      var u = Xe(this, i), g = u.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(d), t._.interrupt.push(d), t._.end.push(c)), u.on = t;
    }), o === 0 && s();
  });
}
var Sl = 0;
function tt(e, t, n, i) {
  this._groups = e, this._parents = t, this._name = n, this._id = i;
}
function qo() {
  return ++Sl;
}
var Ze = Jt.prototype;
tt.prototype = {
  constructor: tt,
  select: rl,
  selectAll: dl,
  selectChild: Ze.selectChild,
  selectChildren: Ze.selectChildren,
  filter: el,
  merge: tl,
  selection: cl,
  transition: _l,
  call: Ze.call,
  nodes: Ze.nodes,
  node: Ze.node,
  size: Ze.size,
  empty: Ze.empty,
  each: Ze.each,
  on: ol,
  attr: zd,
  attrTween: jd,
  style: hl,
  styleTween: bl,
  text: vl,
  textTween: $l,
  remove: sl,
  tween: Pd,
  delay: Hd,
  duration: Kd,
  ease: Jd,
  easeVarying: Zd,
  end: Cl,
  [Symbol.iterator]: Ze[Symbol.iterator]
};
function El(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Al = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: El
};
function Ml(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function Pl(e) {
  var t, n;
  e instanceof tt ? (t = e._id, e = e._name) : (t = qo(), (n = Al).time = di(), e = e == null ? null : e + "");
  for (var i = this._groups, o = i.length, s = 0; s < o; ++s)
    for (var a = i[s], d = a.length, c, u = 0; u < d; ++u)
      (c = a[u]) && Pn(c, e, t, u, a, n || Ml(c, t));
  return new tt(i, this._parents, e, t);
}
Jt.prototype.interrupt = Ed;
Jt.prototype.transition = Pl;
const on = (e) => () => e;
function Tl(e, {
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
function et(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
et.prototype = {
  constructor: et,
  scale: function(e) {
    return e === 1 ? this : new et(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new et(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Bt = new et(1, 0, 0);
et.prototype;
function Un(e) {
  e.stopImmediatePropagation();
}
function Rt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Ol(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Rl() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Fi() {
  return this.__zoom || Bt;
}
function Nl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function Ll() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Dl(e, t, n) {
  var i = e.invertX(t[0][0]) - n[0][0], o = e.invertX(t[1][0]) - n[1][0], s = e.invertY(t[0][1]) - n[0][1], a = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    o > i ? (i + o) / 2 : Math.min(0, i) || Math.max(0, o),
    a > s ? (s + a) / 2 : Math.min(0, s) || Math.max(0, a)
  );
}
function zl() {
  var e = Ol, t = Rl, n = Dl, i = Nl, o = Ll, s = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, c = xd, u = si("start", "zoom", "end"), g, h, f, y = 500, k = 150, l = 0, r = 10;
  function m(A) {
    A.property("__zoom", Fi).on("wheel.zoom", B, { passive: !1 }).on("mousedown.zoom", H).on("dblclick.zoom", se).filter(o).on("touchstart.zoom", $).on("touchmove.zoom", G).on("touchend.zoom touchcancel.zoom", Y).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  m.transform = function(A, j, b, x) {
    var N = A.selection ? A.selection() : A;
    N.property("__zoom", Fi), A !== N ? R(A, j, b, x) : N.interrupt().each(function() {
      _(this, arguments).event(x).start().zoom(null, typeof j == "function" ? j.apply(this, arguments) : j).end();
    });
  }, m.scaleBy = function(A, j, b, x) {
    m.scaleTo(A, function() {
      var N = this.__zoom.k, v = typeof j == "function" ? j.apply(this, arguments) : j;
      return N * v;
    }, b, x);
  }, m.scaleTo = function(A, j, b, x) {
    m.transform(A, function() {
      var N = t.apply(this, arguments), v = this.__zoom, I = b == null ? C(N) : typeof b == "function" ? b.apply(this, arguments) : b, P = v.invert(I), S = typeof j == "function" ? j.apply(this, arguments) : j;
      return n(M(w(v, S), I, P), N, a);
    }, b, x);
  }, m.translateBy = function(A, j, b, x) {
    m.transform(A, function() {
      return n(this.__zoom.translate(
        typeof j == "function" ? j.apply(this, arguments) : j,
        typeof b == "function" ? b.apply(this, arguments) : b
      ), t.apply(this, arguments), a);
    }, null, x);
  }, m.translateTo = function(A, j, b, x, N) {
    m.transform(A, function() {
      var v = t.apply(this, arguments), I = this.__zoom, P = x == null ? C(v) : typeof x == "function" ? x.apply(this, arguments) : x;
      return n(Bt.translate(P[0], P[1]).scale(I.k).translate(
        typeof j == "function" ? -j.apply(this, arguments) : -j,
        typeof b == "function" ? -b.apply(this, arguments) : -b
      ), v, a);
    }, x, N);
  };
  function w(A, j) {
    return j = Math.max(s[0], Math.min(s[1], j)), j === A.k ? A : new et(j, A.x, A.y);
  }
  function M(A, j, b) {
    var x = j[0] - b[0] * A.k, N = j[1] - b[1] * A.k;
    return x === A.x && N === A.y ? A : new et(A.k, x, N);
  }
  function C(A) {
    return [(+A[0][0] + +A[1][0]) / 2, (+A[0][1] + +A[1][1]) / 2];
  }
  function R(A, j, b, x) {
    A.on("start.zoom", function() {
      _(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      _(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var N = this, v = arguments, I = _(N, v).event(x), P = t.apply(N, v), S = b == null ? C(P) : typeof b == "function" ? b.apply(N, v) : b, D = Math.max(P[1][0] - P[0][0], P[1][1] - P[0][1]), L = N.__zoom, U = typeof j == "function" ? j.apply(N, v) : j, W = c(L.invert(S).concat(D / L.k), U.invert(S).concat(D / U.k));
      return function(J) {
        if (J === 1) J = U;
        else {
          var ce = W(J), Se = D / ce[2];
          J = new et(Se, S[0] - ce[0] * Se, S[1] - ce[1] * Se);
        }
        I.zoom(null, J);
      };
    });
  }
  function _(A, j, b) {
    return !b && A.__zooming || new O(A, j);
  }
  function O(A, j) {
    this.that = A, this.args = j, this.active = 0, this.sourceEvent = null, this.extent = t.apply(A, j), this.taps = 0;
  }
  O.prototype = {
    event: function(A) {
      return A && (this.sourceEvent = A), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(A, j) {
      return this.mouse && A !== "mouse" && (this.mouse[1] = j.invert(this.mouse[0])), this.touch0 && A !== "touch" && (this.touch0[1] = j.invert(this.touch0[0])), this.touch1 && A !== "touch" && (this.touch1[1] = j.invert(this.touch1[0])), this.that.__zoom = j, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(A) {
      var j = Ve(this.that).datum();
      u.call(
        A,
        this.that,
        new Tl(A, {
          sourceEvent: this.sourceEvent,
          target: m,
          transform: this.that.__zoom,
          dispatch: u
        }),
        j
      );
    }
  };
  function B(A, ...j) {
    if (!e.apply(this, arguments)) return;
    var b = _(this, j).event(A), x = this.__zoom, N = Math.max(s[0], Math.min(s[1], x.k * Math.pow(2, i.apply(this, arguments)))), v = ct(A);
    if (b.wheel)
      (b.mouse[0][0] !== v[0] || b.mouse[0][1] !== v[1]) && (b.mouse[1] = x.invert(b.mouse[0] = v)), clearTimeout(b.wheel);
    else {
      if (x.k === N) return;
      b.mouse = [v, x.invert(v)], bn(this), b.start();
    }
    Rt(A), b.wheel = setTimeout(I, k), b.zoom("mouse", n(M(w(x, N), b.mouse[0], b.mouse[1]), b.extent, a));
    function I() {
      b.wheel = null, b.end();
    }
  }
  function H(A, ...j) {
    if (f || !e.apply(this, arguments)) return;
    var b = A.currentTarget, x = _(this, j, !0).event(A), N = Ve(A.view).on("mousemove.zoom", S, !0).on("mouseup.zoom", D, !0), v = ct(A, b), I = A.clientX, P = A.clientY;
    Gr(A.view), Un(A), x.mouse = [v, this.__zoom.invert(v)], bn(this), x.start();
    function S(L) {
      if (Rt(L), !x.moved) {
        var U = L.clientX - I, W = L.clientY - P;
        x.moved = U * U + W * W > l;
      }
      x.event(L).zoom("mouse", n(M(x.that.__zoom, x.mouse[0] = ct(L, b), x.mouse[1]), x.extent, a));
    }
    function D(L) {
      N.on("mousemove.zoom mouseup.zoom", null), Yr(L.view, x.moved), Rt(L), x.event(L).end();
    }
  }
  function se(A, ...j) {
    if (e.apply(this, arguments)) {
      var b = this.__zoom, x = ct(A.changedTouches ? A.changedTouches[0] : A, this), N = b.invert(x), v = b.k * (A.shiftKey ? 0.5 : 2), I = n(M(w(b, v), x, N), t.apply(this, j), a);
      Rt(A), d > 0 ? Ve(this).transition().duration(d).call(R, I, x, A) : Ve(this).call(m.transform, I, x, A);
    }
  }
  function $(A, ...j) {
    if (e.apply(this, arguments)) {
      var b = A.touches, x = b.length, N = _(this, j, A.changedTouches.length === x).event(A), v, I, P, S;
      for (Un(A), I = 0; I < x; ++I)
        P = b[I], S = ct(P, this), S = [S, this.__zoom.invert(S), P.identifier], N.touch0 ? !N.touch1 && N.touch0[2] !== S[2] && (N.touch1 = S, N.taps = 0) : (N.touch0 = S, v = !0, N.taps = 1 + !!g);
      g && (g = clearTimeout(g)), v && (N.taps < 2 && (h = S[0], g = setTimeout(function() {
        g = null;
      }, y)), bn(this), N.start());
    }
  }
  function G(A, ...j) {
    if (this.__zooming) {
      var b = _(this, j).event(A), x = A.changedTouches, N = x.length, v, I, P, S;
      for (Rt(A), v = 0; v < N; ++v)
        I = x[v], P = ct(I, this), b.touch0 && b.touch0[2] === I.identifier ? b.touch0[0] = P : b.touch1 && b.touch1[2] === I.identifier && (b.touch1[0] = P);
      if (I = b.that.__zoom, b.touch1) {
        var D = b.touch0[0], L = b.touch0[1], U = b.touch1[0], W = b.touch1[1], J = (J = U[0] - D[0]) * J + (J = U[1] - D[1]) * J, ce = (ce = W[0] - L[0]) * ce + (ce = W[1] - L[1]) * ce;
        I = w(I, Math.sqrt(J / ce)), P = [(D[0] + U[0]) / 2, (D[1] + U[1]) / 2], S = [(L[0] + W[0]) / 2, (L[1] + W[1]) / 2];
      } else if (b.touch0) P = b.touch0[0], S = b.touch0[1];
      else return;
      b.zoom("touch", n(M(I, P, S), b.extent, a));
    }
  }
  function Y(A, ...j) {
    if (this.__zooming) {
      var b = _(this, j).event(A), x = A.changedTouches, N = x.length, v, I;
      for (Un(A), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, y), v = 0; v < N; ++v)
        I = x[v], b.touch0 && b.touch0[2] === I.identifier ? delete b.touch0 : b.touch1 && b.touch1[2] === I.identifier && delete b.touch1;
      if (b.touch1 && !b.touch0 && (b.touch0 = b.touch1, delete b.touch1), b.touch0) b.touch0[1] = this.__zoom.invert(b.touch0[0]);
      else if (b.end(), b.taps === 2 && (I = ct(I, this), Math.hypot(h[0] - I[0], h[1] - I[1]) < r)) {
        var P = Ve(this).on("dblclick.zoom");
        P && P.apply(this, arguments);
      }
    }
  }
  return m.wheelDelta = function(A) {
    return arguments.length ? (i = typeof A == "function" ? A : on(+A), m) : i;
  }, m.filter = function(A) {
    return arguments.length ? (e = typeof A == "function" ? A : on(!!A), m) : e;
  }, m.touchable = function(A) {
    return arguments.length ? (o = typeof A == "function" ? A : on(!!A), m) : o;
  }, m.extent = function(A) {
    return arguments.length ? (t = typeof A == "function" ? A : on([[+A[0][0], +A[0][1]], [+A[1][0], +A[1][1]]]), m) : t;
  }, m.scaleExtent = function(A) {
    return arguments.length ? (s[0] = +A[0], s[1] = +A[1], m) : [s[0], s[1]];
  }, m.translateExtent = function(A) {
    return arguments.length ? (a[0][0] = +A[0][0], a[1][0] = +A[1][0], a[0][1] = +A[0][1], a[1][1] = +A[1][1], m) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, m.constrain = function(A) {
    return arguments.length ? (n = A, m) : n;
  }, m.duration = function(A) {
    return arguments.length ? (d = +A, m) : d;
  }, m.interpolate = function(A) {
    return arguments.length ? (c = A, m) : c;
  }, m.on = function() {
    var A = u.on.apply(u, arguments);
    return A === u ? m : A;
  }, m.clickDistance = function(A) {
    return arguments.length ? (l = (A = +A) * A, m) : Math.sqrt(l);
  }, m.tapDistance = function(A) {
    return arguments.length ? (r = +A, m) : r;
  }, m;
}
var Ul = Object.defineProperty, ql = Object.getOwnPropertyDescriptor, ke = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? ql(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Ul(t, n, o), o;
};
function Fl(e, t, n, i) {
  const o = t.x - e.x, s = t.y - e.y, a = i.x - n.x, d = i.y - n.y, c = o * d - s * a;
  if (Math.abs(c) < 1e-9) return null;
  const u = ((n.x - e.x) * d - (n.y - e.y) * a) / c, g = ((n.x - e.x) * s - (n.y - e.y) * o) / c;
  return u <= 0.02 || u >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + u * o, y: e.y + u * s, t: u };
}
function Bl(e, t, n) {
  const i = n.x - t.x, o = n.y - t.y, s = i * i + o * o || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * i + (e.y - t.y) * o) / s)), d = t.x + a * i, c = t.y + a * o;
  return { dist: Math.hypot(e.x - d, e.y - c), t: a };
}
function jl(e) {
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
function Wl(e, t, n = 7) {
  let i = `M ${e[0].x} ${e[0].y}`;
  for (let o = 0; o < e.length - 1; o++) {
    const s = e[o], a = e[o + 1], d = Math.hypot(a.x - s.x, a.y - s.y) || 1, c = (a.x - s.x) / d, u = (a.y - s.y) / d, g = t.map(([f, y]) => Fl(s, a, f, y)).filter((f) => f !== null).filter((f) => f.t * d > n + 2 && (1 - f.t) * d > n + 2).sort((f, y) => f.t - y.t);
    let h = -1 / 0;
    for (const f of g)
      f.t * d - n <= h + 2 || (i += ` L ${f.x - c * n} ${f.y - u * n}`, i += ` A ${n} ${n} 0 0 1 ${f.x + c * n} ${f.y + u * n}`, h = f.t * d + n);
    i += ` L ${a.x} ${a.y}`;
  }
  return i;
}
const Ct = {
  component: ne`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: ne`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  shield: ne`<path d="M6 0.5 L11 2.5 V6 C11 9 8.8 11 6 11.8 C3.2 11 1 9 1 6 V2.5 Z"></path>`,
  note: ne`<path d="M1.5 0.5 H10.5 V7.5 L7 11.5 H1.5 Z"></path><path d="M10.5 7.5 H7 V11.5"></path>`,
  area: ne`<rect x="0.5" y="1.5" width="11" height="9" rx="1" stroke-dasharray="2.4 1.8"></rect>`,
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
let ve = class extends Ge {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Bt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    this._zoomBehavior = zl().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
    const o = this.fitInsets.left ?? 0, s = this.fitInsets.right ?? 0, a = this.fitInsets.top ?? 0, d = this.fitInsets.bottom ?? 0, c = Math.max(80, i.width - o - s), u = Math.max(80, i.height - a - d), g = Math.min(...t.map((r) => r.x - r.w / 2)) - e, h = Math.max(...t.map((r) => r.x + r.w / 2)) + e, f = Math.min(...t.map((r) => r.y - r.h / 2)) - e, y = Math.max(...t.map((r) => r.y + r.h / 2)) + e, k = Math.max(0.15, Math.min(c / (h - g), u / (y - f), 1.25)), l = Bt.translate(
      o + c / 2 - k * (g + h) / 2,
      a + u / 2 - k * (f + y) / 2
    ).scale(k);
    Ve(n).call(this._zoomBehavior.transform, l);
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
    for (let s = e.parentId; s; s = (i = this.scene.nodes.find((a) => a.id === s)) == null ? void 0 : i.parentId) {
      const a = this.scene.nodes.find((c) => c.id === s);
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
        const o = this.nodePos(i), s = o.x - i.w / 2 + 10 + e.w / 2, a = o.x + i.w / 2 - 10 - e.w / 2, d = o.y - i.h / 2 + 34 + e.h / 2, c = o.y + i.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, s), a), n = Math.min(Math.max(n, d), c);
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
    ) : t.kind === "area" ? this.areaCargo(t) : null, d = a ? new Map(a.map((r) => [r.id, this.nodePos(r)])) : null, c = (r) => (r.shiftKey || r.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a || r.shiftKey && t.kind === "external-system" && !a, u = a ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = u !== null, h = u === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], f = () => {
      const r = [], m = u === "menu" ? this.scene.nodes.filter((w) => w.kind === "ui-app") : this.scene.nodes.filter((w) => w.id === (t.ownerId ?? t.parentId));
      for (const w of m) {
        const M = this.scene.nodes.filter((O) => (O.ownerId ?? O.parentId) === w.id && h.includes(O.kind ?? "") && O.id !== t.id).sort((O, B) => O.y - B.y), C = w.x - w.w / 2 + 10, R = w.x + w.w / 2 - 10;
        for (const O of M) r.push({ x1: C, x2: R, y: O.y - O.h / 2 - 3, appId: w.id, beforeId: O.id });
        const _ = M[M.length - 1];
        r.push({
          x1: C,
          x2: R,
          y: _ ? _.y + _.h / 2 + 3 : w.y - w.h / 2 + 34 + 8,
          appId: w.id,
          beforeId: null
        });
      }
      return r;
    }, y = (r) => {
      const m = this.nodeIdAt(r), w = m && m !== t.id ? this.scene.nodes.find((M) => M.id === m) : void 0;
      return w ? w.kind === "external-system" ? w.id : w.parentId ?? null : null;
    }, k = (r) => {
      if ((r.buttons & 1) === 0) {
        l(r);
        return;
      }
      const m = this.toScene(r), w = m.x - n.x, M = m.y - n.y;
      if (!(!o && Math.hypot(w, M) < 3 / this._t.k))
        if (o = !0, a && d) {
          const C = /* @__PURE__ */ new Map();
          for (const R of a) {
            const _ = d.get(R.id), O = this.clampToParent(R, _.x + w, _.y + M);
            C.set(R.id, { x: O.x, y: O.y });
          }
          this._dragGroup = C;
        } else if (g) {
          this._dragPos = { id: t.id, x: i.x + w, y: i.y + M }, this._menuSlots || (this._menuSlots = { slots: f(), active: null, nestRowId: null });
          const C = this.scene.nodes.filter(
            (_) => h.includes(_.kind ?? "") && _.id !== t.id && Math.abs(m.x - _.x) <= _.w / 2 + 8
          ), R = u === "menu" ? C.find((_) => Math.abs(m.y - _.y) < _.h * 0.28) : void 0;
          if (R)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: R.id }, this._hoverNodeId = R.id;
          else {
            let _ = -1, O = 14;
            this._menuSlots.slots.forEach((B, H) => {
              if (m.x < B.x1 - 24 || m.x > B.x2 + 24) return;
              const se = Math.abs(m.y - B.y);
              se < O && (O = se, _ = H);
            }), this._menuSlots = { ...this._menuSlots, active: _ >= 0 ? _ : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else c(r) ? (this._dragPos = { id: t.id, x: i.x + w, y: i.y + M }, this._hoverNodeId = y(r)) : (this._dragPos = this.clampToParent(t, i.x + w, i.y + M), this._hoverNodeId = null);
    }, l = (r) => {
      if (window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", l), o && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([m, w]) => ({ id: m, x: w.x, y: w.y }))
        });
      else if (o && this._dragPos && g) {
        const m = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const w = u === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (m != null && m.nestRowId)
          this.emit(w, { id: t.id, nestRowId: m.nestRowId });
        else if (m && m.active !== null) {
          const M = m.slots[m.active];
          this.emit(w, { id: t.id, appId: M.appId, beforeId: M.beforeId });
        }
        return;
      } else if (o && this._dragPos) {
        if (c(r)) {
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
    window.addEventListener("pointermove", k), window.addEventListener("pointerup", l);
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
    const o = t.kind === "area", s = t.container && !t.parentId, a = o ? 30 : s ? 160 : 90, d = o ? 20 : s ? 90 : 30, c = { x: t.x, y: t.y, w: t.w, h: t.h }, u = s ? this.scene.nodes.filter((m) => m.parentId === t.id) : [], g = Math.min(...u.map((m) => m.x - m.w / 2)), h = Math.max(...u.map((m) => m.x + m.w / 2)), f = Math.min(...u.map((m) => m.y - m.h / 2)), y = Math.max(...u.map((m) => m.y + m.h / 2)), k = ua(
      u.map((m) => ({ dx: m.x - c.x, dy: m.y - c.y, w: m.w, h: m.h })),
      { w: a, h: d }
    ), l = (m) => {
      if ((m.buttons & 1) === 0) {
        r();
        return;
      }
      const w = this.toScene(m);
      if (m.shiftKey) {
        this._resize = {
          id: t.id,
          x: c.x,
          y: c.y,
          w: Math.max(k.w, 2 * Math.abs(w.x - c.x)),
          h: Math.max(k.h, 2 * Math.abs(w.y - c.y))
        };
        return;
      }
      const M = c.x - n * c.w / 2, C = c.y - i * c.h / 2, R = n > 0 ? Math.max(w.x, M + a, u.length ? h + 10 : -1 / 0) : Math.min(w.x, M - a, u.length ? g - 10 : 1 / 0), _ = i > 0 ? Math.max(w.y, C + d, u.length ? y + 10 : -1 / 0) : Math.min(w.y, C - d, u.length ? f - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (M + R) / 2,
        y: (C + _) / 2,
        w: Math.abs(R - M),
        h: Math.abs(_ - C)
      };
    }, r = () => {
      window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", r), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", l), window.addEventListener("pointerup", r);
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
        const c = this.edgeIdAtClient(a.clientX, a.clientY);
        c && !c.startsWith("note:") && this.emit("connect-requested", {
          sourceId: t.id,
          targetId: `edge:${c}`,
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
    const { x: i, y: o } = this.nodePos(e), s = t - i, a = n - o, d = e.w / 2, c = e.h / 2;
    if (s === 0 && a === 0) return { x: i, y: o };
    const u = 1 / Math.max(Math.abs(s) / d, Math.abs(a) / c);
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
      const g = e.targetId.slice(11), h = this.scene.edges.find((k) => k.id === g), f = h && h.id !== e.id ? this.edgePolyline(h) : null;
      if (!f || f.length < 2) return null;
      const y = jl(f);
      return [this.borderPoint(t, y.x, y.y), y];
    }
    const n = this.scene.nodes.find((g) => g.id === e.targetId);
    if (!t || !n) return null;
    const i = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], o = this.nodePos(t), s = this.nodePos(n), a = i[0] ?? s, d = i[i.length - 1] ?? o;
    let c = this.borderPoint(t, a.x, a.y), u = this.borderPoint(n, d.x, d.y);
    if (!i.length) {
      const g = this.edgeOffset(e);
      if (g !== 0) {
        const h = Math.hypot(u.x - c.x, u.y - c.y) || 1, f = -(u.y - c.y) / h * g, y = (u.x - c.x) / h * g;
        c = { x: c.x + f, y: c.y + y }, u = { x: u.x + f, y: u.y + y };
      }
    }
    return [c, ...i, u];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, n) {
    this._wpDrag = { edgeId: e.id, points: t, index: n };
    const i = t[n];
    let o = !1;
    const s = (d) => {
      if (!this._wpDrag) return;
      const c = this.toScene(d);
      if (!o && Math.hypot(c.x - i.x, c.y - i.y) < 4 / this._t.k) return;
      o = !0;
      const u = [...this._wpDrag.points];
      u[this._wpDrag.index] = c, this._wpDrag = { ...this._wpDrag, points: u };
    }, a = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", a), this._wpDrag && o && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", a);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let n = { seg: 0, dist: 1 / 0 };
    for (let i = 0; i < e.length - 1; i++) {
      const { dist: o } = Bl(t, e[i], e[i + 1]);
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
    const a = (c) => {
      if ((c.buttons & 1) === 0) {
        d();
        return;
      }
      const u = this.toScene(c);
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
    const i = e.color ?? "#64748b", o = this.selectedId === e.id, s = o || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), a = Math.floor((t.length - 1) / 2), d = {
      x: (t[a].x + t[a + 1].x) / 2,
      y: (t[a].y + t[a + 1].y) / 2
    }, c = t.slice(1, -1);
    return ne`
      <g data-edge-ink=${e.id} pointer-events="none" opacity=${e.dim ? 0.18 : 1}>
        <path d=${Wl(t, n)}
              fill="none"
              class=${e.kind === "journey" ? "journey-flow" : ""}
              stroke=${i} stroke-width=${e.kind === "journey" || s ? 3 : 1.6}
              stroke-dasharray=${e.dashArray ?? (e.dashed ? "6 4" : "")}
              opacity="0.92"
              marker-start=${e.markerStart ? `url(#${e.markerStart}-${this.markerId(i)})` : e.kind === "contains" ? `url(#diamond-${this.markerId(i)})` : ""}
              marker-end=${e.markerEnd ? `url(#${e.markerEnd}-${this.markerId(i)})` : e.arrow ? `url(#arrow-${this.markerId(i)})` : ""}></path>
        ${e.label ? ne`<text x=${d.x} y=${d.y - 6} text-anchor="middle"
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
        ${o ? c.map((u, g) => {
      var f;
      const h = ((f = this._selectedWaypoint) == null ? void 0 : f.edgeId) === e.id && this._selectedWaypoint.index === g;
      return ne`
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
        for (const k of y) {
          const l = s[s.length - 1];
          (!l || Math.hypot(k.x - l.x, k.y - l.y) > 0.5) && s.push(k);
        }
      if (s.length < 2) return;
      let a = 0;
      for (let y = 0; y < s.length - 1; y++)
        a += Math.hypot(s[y + 1].x - s[y].x, s[y + 1].y - s[y].y);
      const d = "M " + s.map((y) => `${y.x} ${y.y}`).join(" L "), c = Math.min(6, Math.max(1.4, a / 260)), u = `jrun${o}`, g = o === 0 ? `0s;jrun${t.length - 1}.end+0.4s` : `jrun${o - 1}.end+0.4s`;
      n.push(ne`
        <circle r="6.5" fill="#d97706" stroke="#ffffff" stroke-width="1.8"
                opacity="0" pointer-events="none">
          <animateMotion id=${u} path=${d} dur="${c}s" begin=${g} fill="remove"
                         calcMode="linear"></animateMotion>
          <set attributeName="opacity" to="1" begin="${u}.begin" end="${u}.end"></set>
        </circle>`);
      const h = s[0], f = s[s.length - 1];
      n.push(ne`
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
    var f, y, k, l;
    const { x: t, y: n } = this.nodePos(e), i = this.selectedId === e.id || this.selectedIds.includes(e.id), o = this._hoverNodeId === e.id, s = !!e.container, a = !!e.parentId, d = ((f = this._resize) == null ? void 0 : f.id) === e.id ? this._resize.w : e.w, c = ((y = this._resize) == null ? void 0 : y.id) === e.id ? this._resize.h : e.h, u = d / 2, g = c / 2, h = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return ne`
      <g data-node-id=${e.id}
         opacity=${e.dim ? 0.25 : 1}
         transform="translate(${t}, ${n})${o ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (k = this._dragGroup) != null && k.has(e.id) ? "none" : "auto"}
         @pointerdown=${(r) => this.onNodePointerDown(r, e)}
         @dblclick=${(r) => {
      r.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? ne`<rect x=${-u - 4} y=${-g - 4} width=${d + 8} height=${c + 8}
                  rx=${a ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-u} y=${-g} width=${d} height=${c} rx=${a ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${o || i ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${i || o ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? ne`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? ne`<text x=${-u} y=${-g - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? ne`<g transform="translate(${u - 13}, ${-g + 13})"
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
        ${e.symbol && Ct[e.symbol] && (!a || s) ? ne`<g transform="translate(${u - (e.collapsible ? 37 : 17)}, ${-g + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Ct[e.symbol]}
              </g>` : ""}
        ${a && !s && e.symbol && Ct[e.symbol] ? ne`<g transform="translate(${-u + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Ct[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? ne`
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
              </foreignObject>` : a && !s ? ne`<text x=${-u + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${h}</text>` : s ? ne`<text x=${-u + 12} y=${-g + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : e.kind === "area" ? "" : ne`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${s ? ne`<line x1=${-u + 8} y1=${-g + 28} x2=${u - 8} y2=${-g + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${i && this.connectable && (a ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-system" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "note" || e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "boundedContext" || e.kind === "ui" || e.kind === "ui-app" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item" || // Archi style: the ex-nested kinds are free boxes now — same handles.
    e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "read-model" || e.kind === "query-service" || e.kind === "scheduled-trigger" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api-impl" || e.kind === "service") ? [
      [u, 0],
      [-u, 0],
      [0, g],
      [0, -g]
    ].map(
      ([r, m]) => ne`
                <circle data-handle cx=${r} cy=${m} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(w) => this.onHandlePointerDown(w, e)}>
                  <title>${a ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "note" ? "Arrastra hasta cualquier elemento o relación: la nota quedará atada con un hilo" : e.kind === "service" ? "Arrastra hasta un módulo (o su contexto) para desplegarlo en este servicio" : e.kind === "boundedContext" ? "Arrastra hasta otro contexto (elige el patrón DDD), un IdP (identidad) o cualquier elemento (relación ArchiMate)" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${i && this.connectable && ((l = e.extraHandles) != null && l.length) ? e.extraHandles.map(
      (r, m) => ne`
                <g transform="translate(${-u + 24 + m * 20}, ${-g})">
                  <circle data-handle r="7" fill=${r.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(w) => this.onHandlePointerDown(w, e, r.kind)}>
                    <title>${r.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${(s || e.resizable) && i ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([r, m]) => ne`
                <rect data-resize x=${r * u - 6.5} y=${m * g - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${r * m > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(w) => this.onResizePointerDown(w, e, r, m)}>
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
        const { a, b: d } = this._rubber, c = Math.min(a.x, d.x), u = Math.max(a.x, d.x), g = Math.min(a.y, d.y), h = Math.max(a.y, d.y), f = this.scene.nodes.filter((y) => {
          const k = this.nodePos(y);
          return k.x >= c && k.x <= u && k.y >= g && k.y <= h;
        }).map((y) => y.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", s), window.addEventListener("pointercancel", i);
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
    const n = Math.min(...t.map((a) => a.x - a.w / 2)) - e, i = Math.max(...t.map((a) => a.x + a.w / 2)) + e, o = Math.min(...t.map((a) => a.y - a.h / 2)) - e, s = Math.max(...t.map((a) => a.y + a.h / 2)) + e;
    return { minX: n, minY: o, w: i - n, h: s - o };
  }
  centerViewportOn(e, t) {
    const n = this.renderRoot.querySelector("svg.main");
    if (!n || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect(), o = this._t.k, s = Bt.translate(i.width / 2 - o * e, i.height / 2 - o * t).scale(o);
    Ve(n).call(this._zoomBehavior.transform, s);
  }
  onMinimapPointer(e, t, n) {
    const i = e.currentTarget.getBoundingClientRect(), o = t.minX + (e.clientX - i.left) / n, s = t.minY + (e.clientY - i.top) / n;
    this.centerViewportOn(o, s);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return E``;
    const t = 160, n = 110, i = Math.min(t / e.w, n / e.h), o = this.getBoundingClientRect(), s = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, d = o.width / this._t.k, c = o.height / this._t.k;
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
      return ne`<rect
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
            height=${c * i}
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
        for (let c = 0; c < d.length - 1; c++) t.push([d[c], d[c + 1]]);
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
      (a) => ne`
              <marker id="arrow-${this.markerId(a)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${a}></path>
              </marker>
              <marker id="diamond-${this.markerId(a)}" viewBox="0 0 12 8" refX="1" refY="4"
                      markerWidth="12" markerHeight="8" orient="auto">
                <path d="M 1 4 L 6 1 L 11 4 L 6 7 z" fill=${a}></path>
              </marker>
              <marker id="diamond-hollow-${this.markerId(a)}" viewBox="0 0 12 8" refX="1" refY="4"
                      markerWidth="12" markerHeight="8" orient="auto">
                <path d="M 1 4 L 6 1 L 11 4 L 6 7 z" fill="var(--modux-canvas-bg, #fafafa)" stroke=${a} stroke-width="1"></path>
              </marker>
              <marker id="ball-${this.markerId(a)}" viewBox="0 0 8 8" refX="4" refY="4"
                      markerWidth="7" markerHeight="7" orient="auto">
                <circle cx="4" cy="4" r="3" fill=${a}></circle>
              </marker>
              <marker id="open-arrow-${this.markerId(a)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 1 1 L 9 5 L 1 9" fill="none" stroke=${a} stroke-width="1.4"></path>
              </marker>
              <marker id="hollow-triangle-${this.markerId(a)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="9" markerHeight="9" orient="auto-start-reverse">
                <path d="M 1 1 L 9 5 L 1 9 z" fill="var(--modux-canvas-bg, #fafafa)" stroke=${a} stroke-width="1.2"></path>
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
          ${this._menuSlots ? ne`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (a, d) => ne`
                    <line x1=${a.x1} y1=${a.y} x2=${a.x2} y2=${a.y}
                          stroke=${d === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${d === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${d === this._menuSlots.active ? ne`<circle cx=${a.x1} cy=${a.y} r="3.5" fill="#0284c7"></circle>
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
ve.styles = vt`
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
ke([
  le({ attribute: !1 })
], ve.prototype, "scene", 2);
ke([
  le({ attribute: !1 })
], ve.prototype, "selectedId", 2);
ke([
  le({ attribute: !1 })
], ve.prototype, "selectedIds", 2);
ke([
  le({ type: Boolean })
], ve.prototype, "connectable", 2);
ke([
  le({ attribute: !1 })
], ve.prototype, "edgePoints", 2);
ke([
  q()
], ve.prototype, "_t", 2);
ke([
  q()
], ve.prototype, "_dragPos", 2);
ke([
  q()
], ve.prototype, "_menuSlots", 2);
ke([
  q()
], ve.prototype, "_dragGroup", 2);
ke([
  q()
], ve.prototype, "_pendingLink", 2);
ke([
  q()
], ve.prototype, "_hoverNodeId", 2);
ke([
  q()
], ve.prototype, "_editingId", 2);
ke([
  q()
], ve.prototype, "_spaceDown", 2);
ke([
  q()
], ve.prototype, "_wpDrag", 2);
ke([
  q()
], ve.prototype, "_selectedWaypoint", 2);
ke([
  q()
], ve.prototype, "_resize", 2);
ke([
  q()
], ve.prototype, "_rubber", 2);
ke([
  le({ attribute: !1 })
], ve.prototype, "fitInsets", 2);
ve = ke([
  wt("modux-canvas")
], ve);
function Bi(e) {
  const t = e.legs ?? [], n = /* @__PURE__ */ new Map();
  for (let s = 0; s <= t.length; s++) {
    let a = !1;
    for (const d of t) {
      const c = Math.max(0, ...(d.afterLegIds ?? []).map((u) => n.get(u) ?? 0)) + 1;
      c <= t.length && c !== (n.get(d.id) ?? 0) && (n.set(d.id, c), a = !0);
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
    a.forEach((d, c) => {
      o.set(d, a.length === 1 ? `${s}` : `${s}${String.fromCharCode(97 + c)}`);
    });
  return o;
}
function ji(e) {
  const t = e.legs ?? [], n = new Map(t.map((u) => [u.id, u])), i = /* @__PURE__ */ new Map();
  for (const u of t)
    for (const g of u.afterLegIds ?? [])
      i.set(g, [...i.get(g) ?? [], u.id]);
  const o = (u, g) => {
    const h = n.get(u);
    if (!h) return [];
    const f = i.get(u) ?? [], y = t.filter((k) => k.sourceId === h.targetId && k.id !== u).map((k) => k.id);
    return [.../* @__PURE__ */ new Set([...f, ...y])].filter((k) => !g.has(k));
  }, s = new Set(t.map((u) => u.targetId)), a = t.filter((u) => !(u.afterLegIds ?? []).length && !s.has(u.sourceId)).map((u) => u.id);
  !a.length && t.length && a.push(t[0].id);
  const d = [], c = (u, g) => {
    if (u.length > t.length) return;
    const h = o(u[u.length - 1], g);
    if (!h.length) {
      d.push(u);
      return;
    }
    for (const f of h) c([...u, f], /* @__PURE__ */ new Set([...g, f]));
  };
  for (const u of a) c([u], /* @__PURE__ */ new Set([u]));
  return d;
}
const ae = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  boundedContext: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function Re(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function me(e, t) {
  e.edges.some((n) => n.id === t.id) || e.edges.push(t);
}
const $t = (e) => e.trim().toLowerCase();
function Vl(e, t, n = /* @__PURE__ */ new Set(), i = !1) {
  var $, G, Y, A, j;
  const o = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.boundedContexts.map((b) => [b.id, b.name])), a = e.boundedContexts.flatMap(
    (b) => (b.useCases ?? []).map((x) => ({ ...x, boundedContextId: b.id }))
  ), d = new Set(a.map((b) => b.id)), c = e.aggregates ?? [], u = new Set(
    e.boundedContexts.flatMap((b) => (b.domainServices ?? []).map((x) => x.id))
  ), g = e.boundedContexts.flatMap(
    (b) => (b.domainEvents ?? []).map((x) => ({ ...x, boundedContextId: b.id, application: !1 }))
  ), h = e.boundedContexts.flatMap(
    (b) => (b.applicationEvents ?? []).map((x) => ({ ...x, boundedContextId: b.id, application: !0 }))
  ), f = e.boundedContexts.flatMap(
    (b) => (b.readModels ?? []).map((x) => ({ ...x, boundedContextId: b.id }))
  );
  for (const b of a)
    Re(o, {
      id: b.id,
      label: b.name,
      x: 0,
      y: 0,
      w: ae.command.w,
      h: ae.command.h,
      kind: "use-case",
      symbol: b.policy ? "flow" : "gear",
      fill: b.policy ? ae.policy.fill : ae.command.fill,
      stroke: b.policy ? ae.policy.stroke : ae.command.stroke,
      badge: b.policy ? "POLICY" : "COMANDO",
      tooltip: b.policy ? `${b.name} — policy de ${s.get(b.boundedContextId) ?? b.boundedContextId} (reacción, no caso de negocio)` : `${b.name} — caso de uso de ${s.get(b.boundedContextId) ?? b.boundedContextId}`
    });
  for (const b of a) {
    const x = b.steps ?? [];
    if (!x.length) continue;
    const N = o.nodes.get(b.id), v = i || n.has(b.id);
    N && (N.collapsible = !0, N.collapsed = !v), v && x.forEach((I, P) => {
      Re(o, {
        id: I.id,
        label: `${P + 1}. ${I.name || I.type || "paso"}`,
        x: 0,
        y: 0,
        w: ae.command.w,
        h: 30,
        kind: "use-case-step",
        symbol: "gear",
        fill: "#eff6ff",
        stroke: "#1d4ed8",
        dashed: !!I.customCodeId,
        ownerId: b.id,
        tooltip: `Paso de ${b.name}${I.customCodeId ? " — delega en código a mano" : ""} — arrastra su asa hasta un CODE para delegar en él`
      }), me(o, {
        id: `esstep:${P === 0 ? b.id : x[P - 1].id}->${I.id}`,
        sourceId: P === 0 ? b.id : x[P - 1].id,
        targetId: I.id,
        kind: "es-step",
        color: "#94a3b8",
        dashed: !0,
        arrow: !0,
        tooltip: `pipeline de ${b.name}`
      });
    });
  }
  for (const b of e.customCodes ?? [])
    Re(o, {
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
      const N = !o.nodes.has(x.id), v = N ? b.id : x.id;
      N && o.edges.some((I) => I.kind === "es-custom" && I.sourceId === v && I.targetId === x.customCodeId) || me(o, {
        id: `escc:${x.id}`,
        sourceId: v,
        targetId: x.customCodeId,
        kind: "es-custom",
        color: "#0f172a",
        dashed: !0,
        arrow: !0,
        tooltip: N ? `Un paso plegado de ${b.name} delega en este código — expande el comando para verlo` : "El paso delega en código a mano — Supr lo desconecta"
      });
    }
  for (const b of c)
    Re(o, {
      id: b.id,
      label: b.name,
      x: 0,
      y: 0,
      w: ae.aggregate.w,
      h: ae.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: ae.aggregate.fill,
      stroke: ae.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${b.name} — agregado de ${s.get(b.boundedContextId) ?? b.boundedContextId}`
    });
  const y = /* @__PURE__ */ new Map();
  for (const b of [...g, ...h])
    Re(o, {
      id: b.id,
      label: b.name,
      x: 0,
      y: 0,
      w: ae.event.w,
      h: ae.event.h,
      kind: b.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: ae.event.fill,
      stroke: ae.event.stroke,
      badge: b.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${b.name} — evento de ${s.get(b.boundedContextId) ?? b.boundedContextId}`
    }), y.set($t(b.name), b.id);
  const k = (b) => {
    if (!b || !b.trim()) return null;
    const x = y.get($t(b));
    if (x) return x;
    const N = `evname:${$t(b)}`;
    return Re(o, {
      id: N,
      label: b,
      x: 0,
      y: 0,
      w: ae.event.w,
      h: ae.event.h,
      kind: "event-name",
      symbol: "event",
      fill: ae.event.fill,
      stroke: ae.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${b} — referenciado por nombre, sin evento declarado en el catálogo`
    }), N;
  }, l = (b) => {
    const x = f.find((v) => v.id === b.id) ?? f.find((v) => b.name && $t(v.name) === $t(b.name)), N = (x == null ? void 0 : x.id) ?? (b.id || (b.name ? `rm:${$t(b.name)}` : null));
    return N ? (Re(o, {
      id: N,
      label: (x == null ? void 0 : x.name) ?? b.name ?? N,
      x: 0,
      y: 0,
      w: ae.readModel.w,
      h: ae.readModel.h,
      kind: x ? "read-model" : "derived-read-model",
      fill: ae.readModel.fill,
      stroke: ae.readModel.stroke,
      dashed: !x,
      badge: "READ MODEL"
    }), N) : null;
  };
  for (const b of e.actorUses ?? []) {
    if (!d.has(b.targetId)) continue;
    const x = (e.actors ?? []).find((N) => N.id === b.actorId);
    x && (Re(o, {
      id: x.id,
      label: x.name,
      x: 0,
      y: 0,
      w: ae.actor.w,
      h: ae.actor.h,
      kind: "actor",
      symbol: "person",
      fill: ae.actor.fill,
      stroke: ae.actor.stroke,
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
    const x = (e.agentUses ?? []).filter((S) => S.agentId === b.id), N = (e.agentExternalUses ?? []).filter((S) => S.agentId === b.id), v = (e.agentRags ?? []).filter((S) => S.agentId === b.id), I = (e.agentMcpUses ?? []).filter((S) => S.agentId === b.id), P = (e.agentGatewayUses ?? []).some((S) => S.agentId === b.id) || (e.agentApiOpUses ?? []).some((S) => S.agentId === b.id) || (e.agentQueryUses ?? []).some((S) => S.agentId === b.id) || (e.agentDelegations ?? []).some((S) => S.agentId === b.id) || (e.agentTriggers ?? []).some((S) => S.agentId === b.id);
    if (!(!x.length && !N.length && !v.length && !I.length && !P)) {
      Re(o, {
        id: b.id,
        label: b.name,
        x: 0,
        y: 0,
        w: ae.actor.w,
        h: ae.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${b.name} — agente de IA (consume por MCP)`
      });
      for (const S of x)
        d.has(S.useCaseId) && me(o, {
          id: `es-agent:${b.id}->${S.useCaseId}`,
          sourceId: b.id,
          targetId: S.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const S of N) {
        const D = e.externalSystems.find(
          (U) => (U.useCases ?? []).some((W) => W.id === S.externalUseCaseId)
        );
        if (!D) continue;
        const L = ($ = (D.useCases ?? []).find((U) => U.id === S.externalUseCaseId)) == null ? void 0 : $.name;
        Re(o, {
          id: D.id,
          label: D.name,
          x: 0,
          y: 0,
          w: ae.external.w,
          h: ae.external.h,
          kind: "external-system",
          symbol: "component",
          fill: ae.external.fill,
          stroke: ae.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), me(o, {
          id: `es-agentx:${b.id}->${S.externalUseCaseId}`,
          sourceId: b.id,
          targetId: D.id,
          kind: "es-agent-external",
          label: L,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: L ? `Llama a ${L} del sistema externo` : void 0
        });
      }
      for (const S of I) {
        const D = e.externalSystems.find(
          (U) => (U.mcpServers ?? []).some((W) => W.id === S.mcpServerId)
        );
        if (!D) continue;
        const L = (G = (D.mcpServers ?? []).find((U) => U.id === S.mcpServerId)) == null ? void 0 : G.name;
        Re(o, {
          id: D.id,
          label: D.name,
          x: 0,
          y: 0,
          w: ae.external.w,
          h: ae.external.h,
          kind: "external-system",
          symbol: "component",
          fill: ae.external.fill,
          stroke: ae.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), me(o, {
          id: `es-agentmcp:${b.id}->${S.mcpServerId}`,
          sourceId: b.id,
          targetId: D.id,
          kind: "es-agent-mcp",
          label: L,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: L ? `Consume las herramientas del servidor MCP ${L}` : void 0
        });
      }
      for (const S of v) {
        const D = (e.rags ?? []).find((L) => L.id === S.ragId);
        if (D) {
          Re(o, {
            id: D.id,
            label: D.name,
            x: 0,
            y: 0,
            w: ae.readModel.w,
            h: ae.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${D.name} — base de conocimiento (retrieval)`
          }), me(o, {
            id: `es-agrag:${b.id}->${D.id}`,
            sourceId: b.id,
            targetId: D.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const L of D.sourceReadModelIds ?? []) {
            const U = l({ id: L });
            U && me(o, {
              id: `es-ragsrc:${D.id}->${U}`,
              sourceId: U,
              targetId: D.id,
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
    const x = e.externalSystems.find((N) => N.id === b);
    return x ? (Re(o, {
      id: x.id,
      label: x.name,
      x: 0,
      y: 0,
      w: ae.external.w,
      h: ae.external.h,
      kind: "external-system",
      symbol: "component",
      fill: ae.external.fill,
      stroke: ae.external.stroke,
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
      (I) => (I.useCases ?? []).some((P) => P.id === b.targetId)
    ), N = x ? r(x.id) : null;
    if (!N) continue;
    const v = (Y = ((x == null ? void 0 : x.useCases) ?? []).find((I) => I.id === b.targetId)) == null ? void 0 : Y.name;
    me(o, {
      id: `es-extout:${b.sourceId}->${b.targetId}`,
      sourceId: b.sourceId,
      targetId: N,
      kind: "es-command-external",
      label: v,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: v ? `Llama a ${v} del sistema externo` : void 0
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
    !o.nodes.has(b.domainEventId) || !(o.nodes.has(b.sourceId) && (d.has(b.sourceId) || c.some((N) => N.id === b.sourceId) || u.has(b.sourceId))) || me(o, {
      id: `es-emit:${b.sourceId}->${b.domainEventId}`,
      sourceId: b.sourceId,
      targetId: b.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const w = (b, x, N, v, I, P) => (Re(o, {
    id: b,
    label: x,
    x: 0,
    y: 0,
    w: ae.policy.w,
    h: ae.policy.h,
    kind: N,
    symbol: "flow",
    fill: ae.policy.fill,
    stroke: ae.policy.stroke,
    badge: v,
    tooltip: I
  }), b), M = (b, x) => {
    const N = k(b);
    N && me(o, {
      id: `es-trigger:${N}->${x}`,
      sourceId: N,
      targetId: x,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, C = (b, x) => {
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
    const x = w(
      b.id,
      b.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${b.name}${b.eventName ? ` — reacciona a ${b.eventName}` : ""}${b.consumerGroup ? ` · grupo ${b.consumerGroup}` : ""}`
    );
    M(b.eventName, x);
    for (const N of b.actions ?? []) {
      if (N.type === "CallUseCase" && C(x, N.useCaseId), N.type === "StartSaga" && N.sagaId) {
        const v = `saga:${N.sagaId}`;
        w(v, N.sagaId, "saga", "SAGA"), me(o, {
          id: `es-saga:${x}->${v}`,
          sourceId: x,
          targetId: v,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (N.type === "UpdateProjection" && N.projectionId) {
        const v = (e.projections ?? []).find((I) => I.id === N.projectionId);
        v && me(o, {
          id: `es-feeds:${x}->${v.id}`,
          sourceId: x,
          targetId: v.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const b of e.projections ?? []) {
    const x = w(
      b.id,
      b.name,
      "projection",
      "PROYECCIÓN",
      `${b.name}${b.readModelName ? ` — materializa ${b.readModelName}` : ""}`
    );
    for (const I of b.handledEventIds) {
      const P = o.nodes.has(I) ? I : null;
      P && me(o, {
        id: `es-trigger:${P}->${x}`,
        sourceId: P,
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
    const N = b.sourceExternalUseCaseId ?? b.sourceExternalTableId;
    if (N) {
      const I = e.externalSystems.find(
        (S) => (S.useCases ?? []).some((D) => D.id === N) || (S.tables ?? []).some((D) => D.id === N)
      ), P = I ? r(I.id) : null;
      if (P) {
        const S = ((A = (I.useCases ?? []).find((D) => D.id === N)) == null ? void 0 : A.name) ?? ((j = (I.tables ?? []).find((D) => D.id === N)) == null ? void 0 : j.name);
        me(o, {
          id: `es-poll:${b.id}`,
          sourceId: P,
          targetId: x,
          kind: "es-projects-poll",
          label: S,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: S ? `polling de ${S}` : "polling"
        });
      }
    }
    const v = l({ id: b.readModelId, name: b.readModelName });
    v && me(o, {
      id: `es-projects:${x}->${v}`,
      sourceId: x,
      targetId: v,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const b of e.flows) {
    if (b.archetype === "MATERIALIZES") {
      const N = k(b.triggerEvent), v = l({ name: b.readModelName ?? `${b.triggerEvent}View` });
      N && v && me(o, {
        id: `es-mat:${b.id}`,
        sourceId: N,
        targetId: v,
        kind: "es-materializes",
        label: b.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${b.name} [MATERIALIZES]`
      });
      continue;
    }
    const x = w(
      `flow:${b.id}`,
      b.name,
      "flow",
      `POLICY · ${b.archetype}`,
      `Flow ${b.name} [${b.archetype}]`
    );
    if (M(b.triggerEvent, x), C(x, b.targetUseCaseId), !b.targetUseCaseId) {
      const N = r(b.targetId), v = N ?? `tgt:${b.targetId}`;
      !N && s.has(b.targetId) && Re(o, {
        id: v,
        label: s.get(b.targetId) ?? b.targetId,
        x: 0,
        y: 0,
        w: ae.boundedContext.w,
        h: ae.boundedContext.h,
        kind: "boundedContext",
        symbol: "component",
        fill: ae.boundedContext.fill,
        stroke: ae.boundedContext.stroke,
        badge: "CONTEXTO"
      }), o.nodes.has(v) && me(o, {
        id: `es-deliver:${b.id}`,
        sourceId: x,
        targetId: v,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const b of e.processes ?? []) {
    const x = w(
      b.id,
      b.name,
      "process",
      `PROCESO${b.sla ? ` · SLA ${b.sla}` : ""}`,
      `${b.name}${b.triggerEvent ? ` — arranca con ${b.triggerEvent}` : ""}`
    );
    M(b.triggerEvent, x);
    for (const v of b.steps) C(x, v.useCaseId);
    const N = k(b.onCompletionEventName);
    N && me(o, {
      id: `es-done:${b.id}`,
      sourceId: x,
      targetId: N,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const b of e.workflows ?? []) {
    const x = w(
      b.id,
      b.name,
      "workflow",
      "WORKFLOW",
      `${b.name}${b.triggerEvent ? ` — arranca con ${b.triggerEvent}` : ""}`
    );
    M(b.triggerEvent, x);
    for (const v of b.steps ?? []) {
      C(x, v.targetUseCaseId);
      for (const I of [v.emittedEventName, v.completionEventName]) {
        const P = k(I);
        P && me(o, {
          id: `es-wfemit:${b.id}:${P}`,
          sourceId: x,
          targetId: P,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const N = k(b.onCompletionEventName);
    N && me(o, {
      id: `es-done:${b.id}`,
      sourceId: x,
      targetId: N,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const R = [...o.nodes.values()], _ = /* @__PURE__ */ new Map();
  for (const b of o.edges)
    _.has(b.targetId) || _.set(b.targetId, []), _.get(b.targetId).push(b.sourceId);
  const O = /* @__PURE__ */ new Map(), B = /* @__PURE__ */ new Set(), H = (b) => {
    const x = O.get(b);
    if (x !== void 0) return x;
    if (B.has(b)) return 0;
    B.add(b);
    const N = _.get(b) ?? [], v = N.length ? 1 + Math.max(...N.map(H)) : 0;
    return B.delete(b), O.set(b, v), v;
  }, se = /* @__PURE__ */ new Map();
  for (const b of R) {
    const x = t[b.id];
    if (x) {
      b.x = x.x, b.y = x.y;
      continue;
    }
    const N = H(b.id), v = se.get(N) ?? 0;
    se.set(N, v + 1), b.x = 140 + N * 260, b.y = 110 + v * 110;
  }
  return { nodes: R, edges: o.edges };
}
const Hl = 190, Gl = 56, Wi = 180, Yl = 56, Kl = 150, Xl = 44, Vi = 250, Hi = 100;
function Jl(e, t) {
  const n = /* @__PURE__ */ new Set(), i = (o) => {
    if (n.has(o.id)) return 0;
    n.add(o.id);
    const s = (o.dependsOnStepIds ?? []).map((d) => t.get(d)).filter(Boolean), a = s.length ? 1 + Math.max(...s.map(i)) : 0;
    return n.delete(o.id), a;
  };
  return i(e);
}
function Ql(e, t) {
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
function Zl(e, t, n = /* @__PURE__ */ new Set(), i = !1) {
  var l;
  const o = [], s = [], a = /* @__PURE__ */ new Set(), d = (r) => {
    var m;
    return (m = e.boundedContexts.flatMap((w) => w.useCases ?? []).find((w) => w.id === r)) == null ? void 0 : m.name;
  };
  let c = 140;
  (e.workflows ?? []).forEach((r) => {
    var se;
    const m = new Map(r.steps.map(($) => [$.id, $])), w = new Map(r.steps.map(($) => [$.id, Jl($, m)])), M = /* @__PURE__ */ new Map();
    for (const $ of r.steps) {
      const G = w.get($.id) ?? 0;
      M.set(G, (M.get(G) ?? 0) + 1);
    }
    const C = Math.max(1, ...M.values()), R = Ql(e, r);
    if (R && !a.has(R.id)) {
      a.add(R.id);
      const $ = t[R.id] ?? { x: 140, y: c };
      o.push({
        id: R.id,
        label: R.label,
        x: $.x,
        y: $.y,
        w: Kl,
        h: Xl,
        kind: R.kind,
        symbol: R.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: R.kind === "aggregate" ? "AGGREGATE" : R.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const _ = t[r.id] ?? { x: 420, y: c }, O = i || n.has(r.id);
    o.push({
      id: r.id,
      label: r.name,
      x: _.x,
      y: _.y,
      w: Hl,
      h: Gl,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      collapsible: r.steps.length > 0,
      collapsed: r.steps.length > 0 && !O,
      tooltip: `${r.name}${r.triggerEvent ? ` — arranca con ${r.triggerEvent}` : ""}${r.onCompletionEventName ? ` · emite ${r.onCompletionEventName} al completar` : ""}`
    }), R && s.push({
      id: `wft:${r.id}`,
      sourceId: R.id,
      targetId: r.id,
      kind: "workflow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    });
    const B = /* @__PURE__ */ new Map();
    let H = 0;
    for (const $ of O ? r.steps : []) {
      const G = w.get($.id) ?? 0;
      H = Math.max(H, G);
      const Y = B.get(G) ?? 0;
      B.set(G, Y + 1);
      const A = t[$.id] ?? {
        x: _.x + (G + 1) * Vi,
        y: c + (Y - (M.get(G) - 1) / 2) * Hi
      }, j = d($.targetUseCaseId);
      o.push({
        ownerId: r.id,
        id: $.id,
        label: $.name,
        x: A.x,
        y: A.y,
        w: $.type === "JOIN" || $.type === "SPLIT" ? 100 : Wi,
        h: $.type === "JOIN" || $.type === "SPLIT" ? 48 : Yl,
        kind: "workflow-step",
        symbol: $.type === "JOIN" || $.type === "SPLIT" ? "flow" : $.roleId ? "actor" : "event",
        fill: $.type === "JOIN" || $.type === "SPLIT" ? "#f5f3ff" : $.roleId ? "#fef9c3" : "#ffffff",
        stroke: $.roleId && $.type !== "JOIN" && $.type !== "SPLIT" ? "#ca8a04" : "#6d28d9",
        dashed: $.type === "JOIN" || $.type === "SPLIT",
        badge: $.type === "JOIN" ? "⨝ JOIN" : $.type === "SPLIT" ? "⑃ SPLIT" : $.roleId ? `👤 ${$.roleId}${$.formPageId ? " · 📋" : ""}${$.deadline ? ` · ${$.deadline}` : ""}` : j ? `→ ${j}` : "∅ sin use case",
        tooltip: $.type === "JOIN" ? `${$.name} — espera a TODAS sus dependencias antes de seguir` : $.type === "SPLIT" ? `${$.name} — abre ramas paralelas: los pasos que dependan de él arrancan a la vez` : `${$.name}${$.roleId ? ` · tarea HUMANA de ${$.roleId}${$.deadline ? ` (plazo ${$.deadline})` : ""}` : ""}${$.emittedEventName ? ` · emite ${$.emittedEventName}` : ""}${j ? ` · lanza ${j}` : ""}${$.completionEventName ? ` · espera ${$.completionEventName}` : ""}${$.compensationUseCaseId ? " · ⎌ compensable" : ""}`
      });
      const b = ($.dependsOnStepIds ?? []).filter((x) => m.has(x));
      b.length === 0 && s.push({
        id: `wfs:${r.id}:${$.id}`,
        sourceId: r.id,
        targetId: $.id,
        kind: "workflow-start",
        label: $.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const x of b)
        s.push({
          id: `wfdep:${x}->${$.id}`,
          sourceId: x,
          targetId: $.id,
          kind: "workflow-dependency",
          label: $.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${$.name} espera a ${((se = m.get(x)) == null ? void 0 : se.name) ?? x}`
        });
    }
    if (r.onCompletionEventName) {
      const $ = `done:${r.id}`, G = t[$] ?? { x: _.x + (H + 2) * Vi, y: c };
      o.push({
        id: $,
        label: r.onCompletionEventName,
        x: G.x,
        y: G.y,
        w: Wi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const Y = new Set(r.steps.flatMap((j) => j.dependsOnStepIds ?? [])), A = r.steps.filter((j) => !Y.has(j.id));
      for (const j of A.length ? A : [])
        s.push({
          id: `wfd:${r.id}:${j.id}`,
          sourceId: j.id,
          targetId: $,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      r.steps.length || s.push({
        id: `wfd:${r.id}`,
        sourceId: r.id,
        targetId: $,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    c += Math.max(2, C + 1) * Hi + 60;
  });
  const u = new Set(o.map((r) => r.id));
  (e.workflowGateways ?? []).forEach((r, m) => {
    const w = t[r.id] ?? { x: 200 + m % 5 * 220, y: 60 };
    o.push({
      id: r.id,
      label: r.name,
      x: w.x,
      y: w.y,
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
    for (const w of r.sourceIds ?? [])
      u.has(w) && s.push({
        id: `wflink:${w}->${r.id}`,
        sourceId: w,
        targetId: r.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const m = r.type === "SPLIT" && r.semantics === "EXCLUSIVE";
    for (const w of r.targetIds ?? []) {
      if (!u.has(w)) continue;
      const M = m ? (l = (r.branchConditions ?? []).find((C) => C.targetId === w)) == null ? void 0 : l.expression : void 0;
      s.push({
        id: `wflink:${r.id}->${w}`,
        sourceId: r.id,
        targetId: w,
        kind: "wf-link",
        color: "#6d28d9",
        dashed: m && !M,
        arrow: !0,
        label: M ?? (m ? "¿condición?" : void 0),
        tooltip: m ? `${M ? `Rama si: ${M}` : "Rama sin condición aún"} — doble click la edita; Supr desconecta` : "el gateway fluye aquí — Supr lo desconecta"
      });
    }
  }
  (e.workflows ?? []).flatMap((m) => (m.steps ?? []).filter((w) => w.roleId && u.has(w.id))).forEach((m, w) => {
    const M = (e.actors ?? []).find((R) => R.id === m.roleId), C = m.roleId;
    if (!u.has(C)) {
      const R = o.find((O) => O.id === m.id), _ = t[C] ?? {
        x: R ? R.x - 90 : 120 + w * 200,
        y: R ? R.y - 120 : 40
      };
      o.push({
        id: C,
        label: (M == null ? void 0 : M.name) ?? C,
        x: _.x,
        y: _.y,
        w: 130,
        h: 44,
        kind: "actor",
        symbol: "person",
        fill: "#fef9c3",
        stroke: "#ca8a04",
        badge: "ROL",
        tooltip: `${(M == null ? void 0 : M.name) ?? C} — su lista de tareas recibe los pasos humanos conectados`
      }), u.add(C);
    }
    s.push({
      id: `wfrole:${m.id}->${C}`,
      sourceId: C,
      targetId: m.id,
      kind: "wf-role",
      color: "#ca8a04",
      dashed: !0,
      arrow: !0,
      tooltip: "la tarea cae en la lista de este rol — Supr la vuelve automática"
    });
  }), (e.workflows ?? []).flatMap((m) => (m.steps ?? []).filter((w) => w.formPageId && u.has(w.id))).forEach((m, w) => {
    const M = (e.pages ?? []).find((C) => C.id === m.formPageId);
    if (M) {
      if (!u.has(M.id)) {
        const C = o.find((_) => _.id === m.id), R = t[M.id] ?? {
          x: C ? C.x : 200 + w * 220,
          y: C ? C.y + 130 : 60
        };
        o.push({
          id: M.id,
          label: M.name,
          x: R.x,
          y: R.y,
          w: 160,
          h: 48,
          kind: "page",
          symbol: "page",
          fill: "#fff7ed",
          stroke: "#ca8a04",
          badge: "📋 FORMULARIO",
          tooltip: `${M.name} — el forms engine la presenta como formulario de la tarea`
        }), u.add(M.id);
      }
      s.push({
        id: `wfform:${m.id}->${M.id}`,
        sourceId: m.id,
        targetId: M.id,
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
  }, y = /* @__PURE__ */ new Set(), k = [];
  for (const r of s) {
    const m = f(r.sourceId), w = f(r.targetId);
    if (!m || !w || m === w) continue;
    if (m === r.sourceId && w === r.targetId) {
      k.push(r);
      continue;
    }
    const M = `${r.kind}|${m}|${w}`;
    y.has(M) || (y.add(M), k.push({
      ...r,
      sourceId: m,
      targetId: w,
      tooltip: `${r.tooltip ?? r.kind} — de un paso plegado dentro`
    }));
  }
  return { nodes: o, edges: k };
}
const Gi = 250, De = 30, pt = 6, ec = 16, Nt = 190, tc = 60, nc = 170, an = 44;
function ic(e, t, n) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${n.join(">")}`;
}
function Ce(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function oc(e) {
  const t = [], n = (i, o, s) => {
    for (const a of i ?? []) {
      const d = [...o, a.label];
      t.push({ entry: a, path: d, depth: s }), n(a.children ?? [], d, s + 1);
    }
  };
  return n(e.menuItems ?? [], [], 0), t;
}
function ac(e, t, n = /* @__PURE__ */ new Set(), i = !1) {
  var O, B, H, se;
  const o = [], s = [], a = e.uiApps ?? [], d = e.pages ?? [], c = ($) => {
    var G;
    return ((G = e.boundedContexts.flatMap((Y) => Y.useCases ?? []).find((Y) => Y.id === $)) == null ? void 0 : G.name) ?? $;
  }, u = ($) => {
    var G;
    return ((G = e.boundedContexts.flatMap((Y) => Y.queryServices ?? []).find((Y) => Y.id === $)) == null ? void 0 : G.name) ?? $;
  }, g = /* @__PURE__ */ new Map();
  let h = 160;
  for (const $ of a) {
    const G = oc($), Y = i || n.has($.id), A = 90, j = Y ? G.length * (De + pt) : 0, b = t[$.id] ?? { x: 190, y: h + A / 2 };
    h = b.y + A / 2 + j + 70;
    const x = $.type ?? "APP";
    o.push({
      id: $.id,
      label: $.title || $.name,
      x: b.x,
      y: b.y,
      w: Gi,
      h: A,
      kind: "ui-app",
      symbol: x === "ORCHESTRATOR" || x === "VIEW_EDITOR" ? "process" : "component",
      fill: x === "ORCHESTRATOR" || x === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: x === "ORCHESTRATOR" || x === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      collapsible: G.length > 0,
      collapsed: G.length > 0 && !Y,
      badge: x === "ORCHESTRATOR" ? "ORQUESTADOR" : x === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : x === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: x === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : x === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : x === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: x === "ORCHESTRATOR" ? `${$.name} — orquesta y mantiene estado; solo enseña páginas hijas` : x === "MASTER_DETAIL" ? `${$.name} — cabecera + pestañas (ambas son páginas)` : `App: ${$.name}`
    }), $.modelId && (g.set($.modelId, {
      label: ((O = (e.models ?? []).find((I) => I.id === $.modelId)) == null ? void 0 : O.name) ?? $.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `appmodel:${$.id}->${$.modelId}`,
      sourceId: $.id,
      targetId: $.modelId,
      kind: "app-model",
      label: "estado",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0,
      tooltip: "el viewmodel de la app: el estado que mantiene y comparte con sus páginas"
    }));
    for (const [I, P, S, D, L] of [
      [$.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [$.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      I && s.push({
        id: `${P === "app-view" ? "appview" : "appedit"}:${$.id}->${I}`,
        sourceId: $.id,
        targetId: I,
        kind: P,
        color: D,
        label: S,
        arrow: !0,
        tooltip: L
      });
    const N = $.homePageId ?? $.homeAppId;
    N && s.push({
      id: `apphome:${$.id}->${N}`,
      sourceId: $.id,
      targetId: N,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      arrow: !0,
      tooltip: $.homeAppId ? "la app con la que abre" : "la página con la que abre la app"
    }), x === "MASTER_DETAIL" && $.headerPageId && s.push({
      id: `appheader:${$.id}->${$.headerPageId}`,
      sourceId: $.id,
      targetId: $.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let v = b.y + A / 2 + 10 + De / 2;
    for (const { entry: I, path: P, depth: S } of Y ? G : []) {
      const D = ic($.id, I, P), L = S * ec;
      if (o.push({
        id: D,
        label: I.label,
        x: b.x + L / 2,
        y: v,
        w: Gi - 20 - L,
        h: De,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (B = I.children) != null && B.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (H = I.children) != null && H.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        ownerId: $.id,
        tooltip: (se = I.children) != null && se.length ? "Agrupador (con submenú): no puede abrir nada" : I.pageId ? `Abre ${I.pageId}` : I.uiAdapterId ? `Abre la app ${I.uiAdapterId}` : I.useCaseId ? `Lanza ${I.useCaseId}` : I.aggregateId ? `CRUD inferido sobre ${I.aggregateId}` : I.queryOperationId ? `Listado con filtros de ${I.queryOperationId}` : "Entrada de menú sin destino"
      }), v += De + pt, I.uiAdapterId && a.some((U) => U.id === I.uiAdapterId) && s.push({
        id: `menuapp:${D}->${I.uiAdapterId}`,
        sourceId: D,
        targetId: I.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), I.useCaseId && e.boundedContexts.some((W) => (W.useCases ?? []).some((J) => J.id === I.useCaseId)) && (g.set(I.useCaseId, {
        label: c(I.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${D}->${I.useCaseId}`,
        sourceId: D,
        targetId: I.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), I.aggregateId && (e.aggregates ?? []).some((U) => U.id === I.aggregateId)) {
        const U = (e.aggregates ?? []).find((W) => W.id === I.aggregateId);
        g.set(U.id, { label: U.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${D}->${U.id}`,
          sourceId: D,
          targetId: U.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (I.queryOperationId) {
        const U = e.boundedContexts.flatMap((J) => J.queryServices ?? []).find((J) => J.id === I.queryServiceId), W = ((U == null ? void 0 : U.operations) ?? []).find((J) => J.id === I.queryOperationId);
        U && W && (g.set(W.id, {
          label: `${W.name} (${U.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${D}->${W.id}`,
          sourceId: D,
          targetId: W.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      I.pageId && d.some((U) => U.id === I.pageId) && s.push({
        id: `menupage:${D}->${I.pageId}`,
        sourceId: D,
        targetId: I.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let f = 160;
  const y = ($) => {
    var G;
    return ((G = d.find((Y) => Y.id === $)) == null ? void 0 : G.name) ?? $;
  };
  for (const $ of d) {
    const G = t[$.id] ?? { x: 640, y: f }, Y = $.type === "WIZARD" ? $.wizardSteps ?? [] : [], A = i || n.has($.id), j = tc, b = A ? Y.length * (De + pt) : 0;
    f = G.y + j + b + 90, o.push({
      id: $.id,
      label: $.name,
      x: G.x,
      y: G.y,
      w: Nt,
      h: j,
      kind: "page",
      symbol: "interface",
      badge: $.customCodeId ? "CODE" : $.type ?? "PAGE",
      collapsible: Y.length > 0,
      collapsed: Y.length > 0 && !A,
      extraHandles: [
        { kind: "viewmodel", title: "Viewmodel: arrastra hasta el modelo de datos de la página", color: "#8b5cf6" },
        ...$.type === "CRUD" ? [
          { kind: "crud-detail", title: "Detalle: arrastra hasta la página o app que abre una fila", color: "#ea580c" },
          { kind: "crud-create", title: "Alta: arrastra hasta la página o app del nuevo registro", color: "#0d9488" }
        ] : []
      ],
      fill: "#ffffff",
      stroke: "#0284c7",
      tooltip: $.route ? `${$.type ?? "PAGE"} · ${$.route}` : $.type ?? "PAGE"
    });
    let x = G.y + j / 2 + 10 + De / 2;
    (A ? Y : []).forEach((N, v) => {
      const I = N.id ?? N.pageId ?? String(v);
      o.push({
        id: `wizrow:${$.id}:${I}`,
        label: `${v + 1}. ${N.label ?? (N.pageId ? y(N.pageId) : "Paso")}${N.pageId ? "" : " ⌁"}`,
        x: G.x,
        y: x,
        w: Nt - 20,
        h: De,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: N.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        ownerId: $.id,
        tooltip: N.pageId ? `Paso ${v + 1}: ${y(N.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${v + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), x += De + pt;
    });
    for (const [N, v, I, P] of [
      [$.crudDetailPageId ?? $.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [$.crudCreatePageId ?? $.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      N && s.push({
        id: `${v === "crud-detail" ? "cruddetail" : "crudnew"}:${$.id}->${N}`,
        sourceId: $.id,
        targetId: N,
        kind: v,
        color: P,
        label: I,
        dashed: !0,
        arrow: !0,
        tooltip: v === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let N = 0; N < ($.wizardSteps ?? []).length; N++) {
      const v = ($.wizardSteps ?? [])[N];
      if (!v.pageId) continue;
      const I = v.id ?? v.pageId;
      s.push({
        id: `wizstep:${$.id}:${I}`,
        sourceId: `wizrow:${$.id}:${I}`,
        targetId: v.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${N + 1} — Supr desmapea`
      });
    }
    $.modelId && (g.set($.modelId, {
      label: $.modelName ?? $.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), s.push({
      id: `pgmodel:${$.id}->${$.modelId}`,
      sourceId: $.id,
      targetId: $.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const N of $.buttons ?? [])
      N.useCaseId && (g.set(N.useCaseId, {
        label: c(N.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${$.id}->${N.useCaseId}`,
        sourceId: $.id,
        targetId: N.useCaseId,
        kind: "page-button",
        label: N.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: N.mappingId ? `Botón «${N.label}» — mapping ${N.mappingId}` : `Botón «${N.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    $.listingQueryServiceId && (g.set($.listingQueryServiceId, {
      label: u($.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), s.push({
      id: `pglist:${$.id}->${$.listingQueryServiceId}`,
      sourceId: $.id,
      targetId: $.listingQueryServiceId,
      kind: "page-listing",
      label: "listado",
      color: "#0284c7",
      dashed: !0,
      arrow: !0
    }));
  }
  const k = e.buttonGroups ?? [], l = ($) => {
    var G;
    return ((G = k.find((Y) => Y.id === $)) == null ? void 0 : G.name) ?? $;
  };
  let r = 520;
  for (const $ of k) {
    const G = $.buttons ?? [], Y = $.groupIds ?? [], A = G.length + Y.length, j = i || n.has($.id), b = t[$.id] ?? { x: 1e3, y: r }, x = 70, N = j ? A * (De + pt) : 0;
    r = b.y + x + N + 80, o.push({
      id: $.id,
      label: $.name,
      x: b.x,
      y: b.y,
      w: Nt,
      h: x,
      kind: "button-group",
      symbol: "usecase",
      badge: "BOTONES",
      collapsible: A > 0,
      collapsed: A > 0 && !j,
      fill: "#ffffff",
      stroke: "#0e7490",
      extraHandles: [
        { kind: "toolbar", title: "Toolbar: arrastra hasta una página para engancharlo arriba", color: "#0284c7" },
        { kind: "bottom", title: "Botonera: arrastra hasta una página para engancharlo abajo", color: "#7c3aed" }
      ],
      tooltip: `${$.name} — grupo de botones: la paleta añade botones dentro; sus asas lo enganchan al toolbar o la botonera de una página`
    });
    let v = b.y + x / 2 + 10 + De / 2;
    for (const I of j ? G : [])
      o.push({
        id: `gbtn:${$.id}:${I.id}`,
        label: I.label ?? I.id,
        x: b.x,
        y: v,
        w: Nt - 20,
        h: De,
        kind: "group-button",
        symbol: "usecase",
        fill: I.useCaseId || I.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !I.useCaseId && !I.apiOperationId,
        ownerId: $.id,
        tooltip: `${I.label ?? I.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), v += De + pt;
    for (const I of j ? Y : [])
      o.push({
        id: `gsub:${$.id}:${I}`,
        label: `▸ ${l(I)}`,
        x: b.x,
        y: v,
        w: Nt - 20,
        h: De,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        ownerId: $.id,
        tooltip: `Subgrupo ${l(I)} — Supr lo desanida (el grupo sigue existiendo)`
      }), v += De + pt;
  }
  for (const $ of k)
    for (const G of $.buttons ?? [])
      !G.useCaseId || !e.boundedContexts.some((A) => (A.useCases ?? []).some((j) => j.id === G.useCaseId)) || (g.set(G.useCaseId, {
        label: c(G.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `gbtnt:${$.id}:${G.id}`,
        sourceId: `gbtn:${$.id}:${G.id}`,
        targetId: G.useCaseId,
        kind: "gbtn-target",
        color: "#06b6d4",
        arrow: !0,
        tooltip: `«${G.label ?? G.id}» dispara este caso de uso — Supr lo desconecta`
      }));
  for (const $ of d) {
    const G = [
      ["toolbar", $.toolbarGroupIds ?? []],
      ["botonera", $.bottomBarGroupIds ?? []]
    ];
    for (const [Y, A] of G)
      for (const j of A)
        k.some((b) => b.id === j) && s.push({
          id: `bargrp:${$.id}:${Y}:${j}`,
          sourceId: j,
          targetId: $.id,
          kind: "bar-group",
          color: Y === "toolbar" ? "#0284c7" : "#7c3aed",
          label: Y,
          dashed: !0,
          arrow: !0,
          tooltip: `Grupo enganchado a la ${Y} de ${$.name} — Supr lo desengancha`
        });
  }
  let m = 160;
  for (const $ of e.models ?? [])
    g.has($.id) || g.set($.id, { label: $.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [$, G] of g) {
    const Y = t[$] ?? { x: 1050, y: m };
    m = Y.y + an + 46, o.push({
      id: $,
      label: G.label,
      x: Y.x,
      y: Y.y,
      w: nc,
      h: an,
      kind: G.kind,
      symbol: G.symbol,
      fill: "#ffffff",
      stroke: G.stroke
    });
  }
  let w = 120;
  for (const $ of e.identityProviders ?? []) {
    const G = t[$.id] ?? { x: -320, y: w };
    w = G.y + 70 + 40, o.push({
      id: $.id,
      label: $.name,
      x: G.x,
      y: G.y,
      w: 168,
      h: 52,
      kind: "identity-provider",
      symbol: "key",
      fill: $.publishedByExternalSystemId ? "#ffffff" : "#fefce8",
      stroke: "#ca8a04",
      dashed: !!$.publishedByExternalSystemId,
      badge: $.type ?? "IDP",
      tooltip: `${$.name} — arrastra una app hasta él: sus usuarios autenticarán aquí`
    });
  }
  for (const $ of a)
    $.identityProviderId && (e.identityProviders ?? []).some((G) => G.id === $.identityProviderId) && s.push({
      id: `idpauth:${$.id}`,
      sourceId: $.id,
      targetId: $.identityProviderId,
      kind: "idp-auth",
      color: "#ca8a04",
      label: "autentica con",
      dashed: !0,
      arrow: !0,
      tooltip: "los usuarios de esta app se autentican contra este IdP — Supr lo desconecta"
    });
  const M = (e.actorAppUses ?? []).filter(
    ($) => a.some((G) => G.id === $.appId) && (e.actors ?? []).some((G) => G.id === $.actorId)
  ), C = [...new Set(M.map(($) => $.actorId))];
  let R = 160;
  for (const $ of C) {
    const G = (e.actors ?? []).find((A) => A.id === $), Y = t[$] ?? { x: -60, y: R };
    R = Y.y + an + 46, o.push({
      id: $,
      label: G.name,
      x: Y.x,
      y: Y.y,
      w: 150,
      h: an,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const $ of M)
    s.push({
      id: `actorapp:${$.actorId}->${$.appId}`,
      sourceId: $.actorId,
      targetId: $.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  (e.customCodes ?? []).forEach(($, G) => {
    const Y = t[$.id] ?? { x: 1200, y: 120 + G * 90 };
    o.push({
      id: $.id,
      label: $.name,
      x: Y.x,
      y: Y.y,
      w: 150,
      h: 44,
      kind: "custom-code",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#0f172a",
      badge: "CODE",
      dashed: !0,
      tooltip: `${$.name} — código a mano: arrastra una página hasta él para hacerla custom, y su asa hasta cualquier elemento que use`
    });
  });
  const _ = new Set(o.map(($) => $.id));
  for (const $ of d)
    $.customCodeId && _.has($.customCodeId) && s.push({
      id: `ccpage:${$.id}`,
      sourceId: $.customCodeId,
      targetId: $.id,
      kind: "ui-custom-page",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      tooltip: `La página ${$.name} es CUSTOM: delega en este código — Supr lo desconecta`
    });
  for (const $ of e.customCodes ?? [])
    for (const G of $.usedElementIds ?? [])
      _.has(G) && s.push({
        id: `ccuse:${$.id}->${G}`,
        sourceId: $.id,
        targetId: G,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${$.name} usa este elemento — Supr lo desconecta`
      });
  return (e.uis ?? []).forEach(($, G) => {
    const Y = t[$.id] ?? { x: 120 + G * 220, y: 40 };
    o.push({
      id: $.id,
      label: $.name,
      x: Y.x,
      y: Y.y,
      w: 150,
      h: 44,
      kind: "ui",
      symbol: "interface",
      fill: "#f0f9ff",
      stroke: "#0ea5e9",
      badge: "UI",
      tooltip: `${$.name} — interfaz declarada: traza una línea hasta la app o la página asignada`
    });
    for (const A of [...$.appIds ?? [], ...$.pageIds ?? []])
      o.some((j) => j.id === A) && s.push({
        id: `uiasg:${$.id}->${A}`,
        sourceId: A,
        targetId: $.id,
        kind: "ui-assignment",
        color: "#0ea5e9",
        markerStart: "ball",
        markerEnd: "arrow",
        tooltip: "asignada a la UI (assignment) — Supr la desconecta"
      });
    for (const A of $.actorIds ?? [])
      o.some((j) => j.id === A) && s.push({
        id: `uisrv:${$.id}->${A}`,
        sourceId: $.id,
        targetId: A,
        kind: "ui-serving",
        color: "#0ea5e9",
        markerEnd: "open-arrow",
        tooltip: "la UI sirve a este actor (serving) — Supr la desconecta"
      });
  }), { nodes: o, edges: s };
}
const Yi = 188, Ki = 34, Xi = 10, sn = 24, Ji = 6;
function rn(e, t) {
  return `fld:${e}:${t}`;
}
function Qn(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function sc(e, t) {
  const n = [], i = [], o = e.models ?? [], s = e.modelMappings ?? [], a = (f) => {
    var y;
    return ((y = o.find((k) => k.id === f)) == null ? void 0 : y.name) ?? f ?? "?";
  };
  o.forEach((f, y) => {
    const k = t[f.id] ?? { x: 200 + y % 5 * 260, y: 160 + Math.floor(y / 5) * 220 }, l = f.fields ?? [], r = Ki + (l.length ? l.length * sn + (l.length - 1) * Ji : 10) + Xi;
    n.push({
      id: f.id,
      label: f.name,
      x: k.x,
      y: k.y,
      w: Yi,
      h: r,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${f.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), l.forEach((m, w) => {
      n.push({
        id: rn(f.id, m.id),
        label: m.name,
        x: k.x,
        y: k.y - r / 2 + Ki + w * (sn + Ji) + sn / 2,
        w: Yi - 2 * Xi,
        h: sn,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: m.type ?? void 0,
        parentId: f.id,
        tooltip: `${m.name}${m.type ? ` (${m.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((f, y) => {
    const k = t[f.id] ?? { x: 200 + y % 5 * 260, y: 60 };
    n.push({
      id: f.id,
      label: f.name,
      x: k.x,
      y: k.y,
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
    const k = t[f.id] ?? { x: 120 + y % 5 * 220, y: 60 };
    n.push({
      id: f.id,
      label: f.name,
      x: k.x,
      y: k.y,
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
  const d = new Set(n.map((f) => f.id)), c = (f) => f.fieldId ? rn(f.modelId, f.fieldId) : f.modelId;
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
      const k = c(y);
      d.has(k) && i.push({
        id: `tfin:${f.id}:${y.modelId}:${y.fieldId ?? ""}`,
        sourceId: k,
        targetId: f.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${f.name} — Supr la desconecta`
      });
    }
    f.output && d.has(c(f.output)) && i.push({
      id: `tfout:${f.id}`,
      sourceId: f.id,
      targetId: c(f.output),
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
        const k = rn(f.sourceModelId, y.sourceFieldId ?? ""), l = rn(f.targetModelId, y.targetFieldId ?? "");
        !d.has(k) || !d.has(l) || i.push({
          id: `maprule:${f.id}:${y.id}`,
          sourceId: k,
          targetId: l,
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
        const k = g.get(y.useCaseId);
        if (!(k != null && k.inputModelId) || k.inputModelId === f.modelId) continue;
        const l = `${f.modelId}->${k.inputModelId}`;
        u.has(l) || h.has(l) || (h.add(l), !(!d.has(f.modelId) || !d.has(k.inputModelId)) && i.push({
          id: `mapgap:${f.id}:${y.useCaseId}`,
          sourceId: f.modelId,
          targetId: k.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${y.label}» (página ${f.name}) llama a ${k.name}: falta mapear ${a(f.modelId)} → ${a(k.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: n, edges: i };
}
const qn = 560, dn = 34, ln = 14, Fn = 150, cn = 40, pn = 12, un = 150, it = 40, rc = (e) => e.startsWith("SOURCE") ? 0 : e === "TRANSFORM" ? 1 : 2, dc = {
  0: { fill: "#f0f9ff", stroke: "#0284c7", symbol: "lens" },
  1: { fill: "#f0fdfa", stroke: "#0f766e", symbol: "gear" },
  2: { fill: "#f5f3ff", stroke: "#7c3aed", symbol: "event" }
};
function lc(e, t) {
  const n = [], i = [], o = e.etlFlows ?? [], s = new Map(e.boundedContexts.map((l) => [l.id, l.name])), a = new Map(
    e.boundedContexts.flatMap((l) => [
      ...(l.domainEvents ?? []).map((r) => [r.id, r.name]),
      ...(l.applicationEvents ?? []).map((r) => [r.id, r.name])
    ])
  );
  let d = 140;
  for (const l of o) {
    const r = l.steps ?? [], m = [[], [], []];
    r.forEach((R) => m[rc(R.type)].push(R));
    const w = Math.max(1, ...m.map((R) => R.length)), M = dn + ln + w * (cn + pn), C = t[l.id] ?? { x: 420, y: d };
    d = C.y + M + 110, n.push({
      id: l.id,
      label: l.name,
      x: C.x,
      y: C.y,
      w: qn,
      h: M,
      kind: "etl-flow",
      symbol: "gear",
      badge: "ETL",
      container: !0,
      fill: "#ffffff",
      stroke: "#0f766e",
      tooltip: `${l.name} — integrador${l.ownerBoundedContextId ? ` de ${s.get(l.ownerBoundedContextId) ?? l.ownerBoundedContextId}` : ""}: fuentes → transformación → escrituras; la paleta añade transformaciones`
    }), m.forEach((R, _) => {
      const O = C.x - qn / 2 + ln + Fn / 2 + _ * (qn - 2 * ln - Fn) / 2;
      R.forEach((B, H) => {
        const se = dc[_];
        if (n.push({
          id: B.id,
          label: B.name ?? B.id,
          x: O,
          y: C.y - M / 2 + dn + cn / 2 + H * (cn + pn),
          w: Fn,
          h: cn,
          kind: "etl-step",
          symbol: se.symbol,
          fill: se.fill,
          stroke: se.stroke,
          badge: B.type === "SOURCE_PULL" ? "PULL" : B.type === "SOURCE_CONSUMER" ? "CONSUME" : B.type === "TRANSFORM" ? "TRANSFORM" : B.type === "WRITE_API" ? "→ API" : B.type === "WRITE_DB" ? "→ BD" : "→ EVENTO",
          parentId: l.id,
          tooltip: `${B.name ?? B.id} (${B.type})${B.mappingId ? " · aplica un mapeado" : ""} — Supr lo quita del integrador`
        }), _ > 0) {
          const $ = m[_ - 1], G = $[Math.min(H, $.length - 1)];
          G && i.push({
            id: `etlpipe:${l.id}:${G.id}->${B.id}`,
            sourceId: G.id,
            targetId: B.id,
            kind: "etl-pipe",
            color: "#0f766e",
            arrow: !0,
            tooltip: "el dato fluye por el pipeline"
          });
        }
      });
    });
  }
  const c = new Set(n.map((l) => l.id)), u = new Set(o.flatMap((l) => (l.steps ?? []).map((r) => r.externalTableId)).filter(Boolean)), g = new Set(o.flatMap((l) => (l.steps ?? []).map((r) => r.apiId)).filter(Boolean)), h = new Set(o.flatMap((l) => (l.steps ?? []).map((r) => r.eventId)).filter(Boolean));
  let f = 120;
  for (const l of e.externalSystems) {
    const r = (l.tables ?? []).filter((M) => u.has(M.id));
    if (!r.length) continue;
    const m = dn + ln + r.length * (it + pn), w = t[l.id] ?? { x: -140, y: f };
    f = w.y + m + 90, n.push({
      id: l.id,
      label: l.name,
      x: w.x,
      y: w.y,
      w: un + 30,
      h: m,
      kind: "external-system",
      symbol: "component",
      badge: "EXTERNAL",
      container: !0,
      fill: "#ffffff",
      stroke: "#64748b",
      dashed: !0,
      tooltip: `${l.name} — sistema externo: sus tablas legacy alimentan (o reciben) integradores`
    }), c.add(l.id), r.forEach((M, C) => {
      n.push({
        id: M.id,
        label: M.name,
        x: w.x,
        y: w.y - m / 2 + dn + it / 2 + C * (it + pn),
        w: un,
        h: it,
        kind: "external-table",
        symbol: "readmodel",
        fill: "#fefce8",
        stroke: "#a16207",
        parentId: l.id,
        tooltip: `${M.name} — tabla legacy de ${l.name}`
      }), c.add(M.id);
    });
  }
  let y = 120;
  for (const l of e.apis ?? []) {
    if (!g.has(l.id)) continue;
    const r = t[l.id] ?? { x: 1e3, y };
    y = r.y + it + 70, n.push({
      id: l.id,
      label: l.name,
      x: r.x,
      y: r.y,
      w: un,
      h: it,
      kind: "api",
      symbol: "interface",
      badge: "API",
      fill: "#eef2ff",
      stroke: "#4f46e5",
      tooltip: `${l.name} — API que un integrador consume o llama`
    }), c.add(l.id);
  }
  let k = 400;
  for (const l of h) {
    const r = l, m = t[r] ?? { x: 1e3, y: k };
    k = m.y + it + 70, n.push({
      id: r,
      label: a.get(r) ?? r,
      x: m.x,
      y: m.y,
      w: un,
      h: it,
      kind: "domain-event",
      symbol: "event",
      badge: "EVENTO",
      fill: "#fff7ed",
      stroke: "#f59e0b",
      tooltip: "evento que un integrador consume o publica"
    }), c.add(r);
  }
  for (const l of o)
    for (const r of l.steps ?? []) {
      const m = r.externalTableId ?? r.apiId ?? r.eventId;
      if (!m || !c.has(m) || !c.has(r.id)) continue;
      const w = r.type.startsWith("SOURCE");
      i.push({
        id: `etl:${l.id}:${r.id}`,
        sourceId: w ? m : r.id,
        targetId: w ? r.id : m,
        kind: w ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: r.type === "SOURCE_PULL" ? "pull" : r.type === "SOURCE_CONSUMER" ? "consume" : r.type === "WRITE_API" ? "api" : r.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: w ? `${l.name} lee de aquí — Supr quita el paso` : `${l.name} escribe aquí — Supr quita el paso`
      });
    }
  return { nodes: n, edges: i };
}
async function cc(e, t) {
  const { default: n } = await import("./elk.bundled-94VUq91b.js").then((c) => c.e), i = new n(), s = {
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
  }, a = await i.layout(s), d = {};
  for (const c of a.children ?? [])
    d[c.id] = {
      x: (c.x ?? 0) + (c.width ?? 0) / 2,
      y: (c.y ?? 0) + (c.height ?? 0) / 2
    };
  return d;
}
var pc = Object.defineProperty, uc = Object.getOwnPropertyDescriptor, Ue = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? uc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && pc(t, n, o), o;
};
const mc = /* @__PURE__ */ new Set([
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
let Me = class extends Ge {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.connectable = !1, this._rx = 55, this._rz = -18, this._k = 1, this._pan = { x: 0, y: 0 }, this._space = !1, this._liveMove = null, this._connect = null, this._hoverTargetId = null, this._selected = /* @__PURE__ */ new Set(), this._rubber = null, this._renaming = null, this._drag = null, this._kUsed = 1, this._center = { x: 0, y: 0 }, this.onSpaceKey = (e) => {
      if (e.key !== " ") return;
      const t = e.target;
      t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) || (this._space = e.type === "keydown", this._space && e.preventDefault());
    }, this.onDown = (e) => {
      var a, d, c;
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
      const i = (c = t == null ? void 0 : t.closest) == null ? void 0 : c.call(t, ".h3");
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
        const a = (i = this.shadowRoot) == null ? void 0 : i.elementFromPoint(e.clientX, e.clientY), d = (o = a == null ? void 0 : a.closest) == null ? void 0 : o.call(a, ".n3"), c = (d == null ? void 0 : d.dataset.nodeId) ?? null;
        this._hoverTargetId = c !== this._connect.sourceId ? c : null;
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
            const i = this.getBoundingClientRect(), o = Math.min(n.x1, n.x2) + i.left, s = Math.max(n.x1, n.x2) + i.left, a = Math.min(n.y1, n.y2) + i.top, d = Math.max(n.y1, n.y2) + i.top, c = [];
            this.renderRoot.querySelectorAll(".n3").forEach((u) => {
              const g = u.getBoundingClientRect(), h = g.left + g.width / 2, f = g.top + g.height / 2, y = u.dataset.nodeId;
              y && h >= o && h <= s && f >= a && f <= d && c.push(y);
            }), this._selected = new Set(c);
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
    const a = new DOMMatrix().translate(i, o).multiply(s).translate(-i, -o).translate(n.width / 2, n.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), d = a.transformPoint(new DOMPoint(0, 0, 0, 1)), c = a.transformPoint(new DOMPoint(1, 0, 0, 0)), u = a.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - n.left, h = t - n.top, f = c.x - g * c.w, y = u.x - g * u.w, k = c.y - h * c.w, l = u.y - h * u.w, r = g * d.w - d.x, m = h * d.w - d.y, w = f * l - y * k;
    return w ? { x: (r * l - y * m) / w, y: (f * m - r * k) / w } : { ...this._center };
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
    const n = this.renderRoot.querySelector('[data-fx="start"]'), i = this.renderRoot.querySelector('[data-fx="end"]'), o = new Map(this.scene.nodes.map((Y) => [Y.id, Y])), s = new Map(this.scene.edges.map((Y) => [Y.id, Y])), a = this.depths(), d = 30, c = (Y) => (a.get(Y) ?? 0) * d + 8, u = (this.scene.journeyRuns ?? []).map(
      (Y) => Y.map((A) => s.get(A)).filter((A) => !!A).map((A) => ({ s: o.get(A.sourceId), tgt: o.get(A.targetId) })).filter((A) => !!A.s && !!A.tgt)
    ).filter((Y) => Y.length > 0);
    if (!u.length) {
      t.style.display = "none", n && (n.style.display = "none"), i && (i.style.display = "none");
      return;
    }
    const g = 170, h = 0.5, f = u.map((Y) => Y.map((A) => Math.hypot(A.tgt.x - A.s.x, A.tgt.y - A.s.y))), y = f.map((Y) => Math.max(1.2, Y.reduce((A, j) => A + j, 0) / g)), k = y.reduce((Y, A) => Y + A + h, 0);
    let l = e % k, r = 0;
    for (; l > y[r] + h; )
      l -= y[r] + h, r++;
    const m = u[r], w = (Y, A, j, b) => {
      Y && (Y.style.display = "block", Y.style.left = `${A.x}px`, Y.style.top = `${A.y}px`, Y.style.transform = `translateZ(${c(A.id)}px) scale(${j})`, Y.style.opacity = `${b}`);
    }, M = 0.6;
    if (l < M && m[0]) {
      const Y = l / M;
      w(n, m[0].s, 0.35 + Y * 1.15, 0.9 * (1 - Y));
    } else n && (n.style.display = "none");
    const C = l - y[r];
    if (C > 0 && C < 0.45 && m[m.length - 1]) {
      const Y = C / 0.45;
      w(i, m[m.length - 1].tgt, 1.5 - Y * 1.15, 0.15 + Y * 0.75);
    } else i && (i.style.display = "none");
    if (l > y[r]) {
      t.style.display = "none";
      return;
    }
    const R = f[r].reduce((Y, A) => Y + A, 0) || 1;
    let _ = l / y[r] * R, O = 0;
    for (; O < m.length - 1 && _ > f[r][O]; )
      _ -= f[r][O], O++;
    const B = m[O], H = Math.min(1, _ / (f[r][O] || 1)), se = B.s.x + (B.tgt.x - B.s.x) * H, $ = B.s.y + (B.tgt.y - B.s.y) * H, G = c(B.s.id) + (c(B.tgt.id) - c(B.s.id)) * H;
    t.style.display = "block", t.style.left = `${se}px`, t.style.top = `${$}px`, t.style.transform = `translateZ(${G}px)`;
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
    const t = this.depths(), n = new Map(e.map((r) => [r.id, r])), i = Math.min(...e.map((r) => r.x - r.w / 2)) - 60, o = Math.max(...e.map((r) => r.x + r.w / 2)) + 60, s = Math.min(...e.map((r) => r.y - r.h / 2)) - 60, a = Math.max(...e.map((r) => r.y + r.h / 2)) + 60, d = (i + o) / 2, c = (s + a) / 2, u = this.getBoundingClientRect(), g = u.width ? Math.min(u.width / (o - i), u.height / (a - s), 1) * 0.9 : 0.5, h = this._k * g;
    this._kUsed = h, this._center = { x: d, y: c };
    const f = 30, y = this._liveMove, k = (r) => r.x + ((y == null ? void 0 : y.id) === r.id ? y.dx : 0), l = (r) => r.y + ((y == null ? void 0 : y.id) === r.id ? y.dy : 0);
    return E`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${h}, ${h}, ${h}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-d}px, ${-c}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${i}px; top: ${s}px"
            width=${o - i}
            height=${a - s}
            viewBox="${i} ${s} ${o - i} ${a - s}"
          >
            ${this.scene.edges.map((r) => {
      const m = n.get(r.sourceId), w = n.get(r.targetId) ?? this.edgeAnchorOf(r, n);
      return !m || !w ? "" : ne`<line
                x1=${k(m)} y1=${l(m)} x2=${k(w)} y2=${l(w)}
                stroke="#000000" stroke-width="2" opacity=${r.dim ? 0.05 : 0.22} />`;
    })}
          </svg>
          ${this.scene.edges.map((r) => {
      const m = n.get(r.sourceId), w = n.get(r.targetId) ?? this.edgeAnchorOf(r, n);
      if (!m || !w) return "";
      const M = (t.get(m.id) ?? 0) * f + 2, C = w.id ? (t.get(w.id) ?? 0) * f + 2 : w.z, R = k(w) - k(m), _ = l(w) - l(m), O = C - M, B = Math.hypot(R, _), H = Math.hypot(B, O), se = Math.atan2(_, R) * 180 / Math.PI, $ = Math.atan2(O, B) * 180 / Math.PI, G = r.color ?? "#64748b", Y = r.dashed ? `repeating-linear-gradient(90deg, ${G} 0 6px, transparent 6px 10px)` : G, A = r.kind === "journey";
      return E`<div
              class="edge3 ${A ? "journey3" : ""}"
              style="
                left: ${k(m)}px; top: ${l(m)}px; width: ${H}px; height: ${A ? 3 : 1.7}px;
                transform: translateZ(${M}px) rotateZ(${se}deg) rotateY(${-$}deg);
                background: ${A ? "repeating-linear-gradient(90deg, #d97706 0 9px, transparent 9px 16px)" : Y};
                opacity: ${r.dim ? 0.12 : 0.9};
              "
            ></div>
            ${A && r.label ? E`<div
                  class="journey-badge3"
                  style="
                    left: ${(k(m) + k(w)) / 2}px; top: ${(l(m) + l(w)) / 2}px;
                    transform: translate(-50%, -50%) translateZ(${(M + C) / 2 + 6}px);
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
                style="left: ${k(r) - r.w / 2}px; top: ${l(r) - r.h / 2}px;
                       width: ${r.w}px; height: ${r.h}px; opacity: ${r.dim ? 0.25 : 1};"
              ></div>`;
      const m = t.get(r.id) ?? 0, w = r.container || m === 0, M = this._hoverTargetId === r.id;
      return E`
              <div
                class="n3 ${r.container ? "container3" : ""} ${this.selectedId === r.id || this._selected.has(r.id) ? "selected3" : ""} ${M ? "hover3" : ""}"
                data-node-id=${r.id}
                data-kind=${r.kind}
                title=${r.tooltip ?? r.label}
                style="
                  opacity: ${r.dim ? 0.25 : 1};
                  left: ${k(r) - r.w / 2}px; top: ${l(r) - r.h / 2}px;
                  width: ${r.w}px; height: ${r.h}px;
                  transform: translateZ(${m * f + (M ? 8 : 0)}px)${M ? " scale(1.06)" : ""};
                  background: ${r.container ? "color-mix(in srgb, " + (r.fill ?? "#ffffff") + " 82%, transparent)" : r.fill ?? "#ffffff"};
                  border-color: ${r.stroke ?? "#64748b"};
                  border-style: ${r.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${w ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
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
      if (!r || !mc.has(r.kind)) return "";
      const m = (t.get(r.id) ?? 0) * f + 4;
      return [
        [k(r) + r.w / 2, l(r)],
        [k(r) - r.w / 2, l(r)],
        [k(r), l(r) + r.h / 2],
        [k(r), l(r) - r.h / 2]
      ].map(
        ([M, C]) => E`<div
                class="h3"
                data-source-id=${r.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${M}px; top: ${C}px; transform: translateZ(${m}px)"
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
      ), m = this.getBoundingClientRect(), w = r == null ? void 0 : r.getBoundingClientRect(), M = w ? w.left + w.width / 2 - m.left : m.width / 2, C = w ? w.bottom - m.top + 6 : m.height / 2;
      return E`<input
              class="rename3"
              style="left: ${M}px; top: ${C}px"
              .value=${this._renaming.value}
              @pointerdown=${(R) => R.stopPropagation()}
              @input=${(R) => this._renaming = { ...this._renaming, value: R.target.value }}
              @keydown=${(R) => {
        if (R.stopPropagation(), R.key === "Escape" && (this._renaming = null), R.key === "Enter") {
          const _ = this._renaming, O = _.value.trim();
          this._renaming = null;
          const B = this.scene.nodes.find((H) => H.id === _.id);
          O && B && O !== B.label && this.emit("node-renamed", { id: _.id, kind: _.kind, name: O });
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
Me.styles = vt`
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
Ue([
  le({ attribute: !1 })
], Me.prototype, "scene", 2);
Ue([
  le({ attribute: !1 })
], Me.prototype, "selectedId", 2);
Ue([
  le({ attribute: !1 })
], Me.prototype, "connectable", 2);
Ue([
  q()
], Me.prototype, "_rx", 2);
Ue([
  q()
], Me.prototype, "_rz", 2);
Ue([
  q()
], Me.prototype, "_k", 2);
Ue([
  q()
], Me.prototype, "_pan", 2);
Ue([
  q()
], Me.prototype, "_liveMove", 2);
Ue([
  q()
], Me.prototype, "_connect", 2);
Ue([
  q()
], Me.prototype, "_hoverTargetId", 2);
Ue([
  q()
], Me.prototype, "_selected", 2);
Ue([
  q()
], Me.prototype, "_rubber", 2);
Ue([
  q()
], Me.prototype, "_renaming", 2);
Me = Ue([
  wt("modux-tilt")
], Me);
var fc = Object.defineProperty, hc = Object.getOwnPropertyDescriptor, we = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? hc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && fc(t, n, o), o;
};
const Qi = [
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
let pe = class extends Ge {
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
      const a = (e.children ?? []).filter((c) => c.kind === "tab"), d = a.find((c) => c.id === this._activeTabs[e.id]) ?? a[0];
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
      let c;
      try {
        c = JSON.parse(d);
      } catch {
        return;
      }
      if (!c.componentId || !c.pageId || c.pageId === ((a = this.page) == null ? void 0 : a.id)) return;
      const u = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: c.pageId, componentId: c.componentId, ...u });
      return;
    }
    if (i === e.id || this.isWithin(e.id, i)) return;
    const o = this.slotFor(e, t);
    o.beforeComponentId !== i && this.emitEvent("component-moved", { componentId: i, ...o });
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var c, u, g;
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
          (y, k) => E`<span
                class=${y === f ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(l) => {
            l.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: y.id }, this.emitEvent("component-selected", { componentId: y.id });
          }}
                @dblclick=${(l) => {
            l.stopPropagation(), this._cmp = { ...y };
          }}
                @dragstart=${(l) => {
            var r, m;
            l.stopPropagation(), this._dragCmpId = y.id, (m = l.dataTransfer) == null || m.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (r = this.page) == null ? void 0 : r.id, componentId: y.id })
            );
          }}
                @dragover=${(l) => {
            var r;
            ((r = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : r.kind) === "tab" && (l.preventDefault(), l.stopPropagation());
          }}
                @drop=${(l) => {
            var C, R;
            const r = this._dragCmpId;
            if (!r || r === y.id || ((C = this.nodeById(r)) == null ? void 0 : C.kind) !== "tab") return;
            l.preventDefault(), l.stopPropagation();
            const m = l.currentTarget.getBoundingClientRect(), M = l.clientX - m.left < m.width / 2 ? y.id : ((R = h[k + 1]) == null ? void 0 : R.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, M !== r && this.emitEvent("component-moved", {
              componentId: r,
              toParentId: e.id,
              beforeComponentId: M
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
        const f = e.modelId && e.modelId === ((c = this.page) == null ? void 0 : c.modelId) ? ((u = this.page) == null ? void 0 : u.viewmodelFields) ?? [] : [];
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
      var f, y, k;
      this._foreignOver = !1, !(!this._dragCmpId && !((k = (y = (f = h.dataTransfer) == null ? void 0 : f.types) == null ? void 0 : y.includes) != null && k.call(y, "application/x-modux-cmp"))) && (h.preventDefault(), h.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, h));
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
    const t = (c) => this._cmp = { ...this._cmp, ...c }, n = e.kind, i = [
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
    return E`<div class="pop" @click=${(c) => c.stopPropagation()}>
      ${i ? E`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(c) => t({ title: c.target.value })} />` : de}
      ${n === "text" ? E`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(c) => t({ text: c.target.value })} />` : de}
      ${n === "button" || n === "field" ? E`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(c) => t({ label: c.target.value })} />` : de}
      ${n === "button" ? E`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? E`<span class="chip">${((o = this.useCases.find((c) => c.id === e.useCaseId)) == null ? void 0 : o.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : E`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? E`<span class="chip"
                      >${((s = this.mappings.find((c) => c.id === e.mappingId)) == null ? void 0 : s.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : E`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : de}
      ${n === "form" ? E`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? E`<span class="chip"
                      >${((a = this.models.find((c) => c.id === e.modelId)) == null ? void 0 : a.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : E`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : de}
      ${n === "listing" ? E`<label>Consulta</label>
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
            </span>` : de}
      ${n === "field" ? E`<label>Estereotipo</label>
            <select @change=${(c) => t({ stereotype: c.target.value || void 0 })}>
              ${Qi.map((c) => E`<option value=${c} ?selected=${c === (e.stereotype ?? "regular")}>${c}</option>`)}
            </select>` : de}
      ${n === "tabLayout" ? E`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : de}
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
      const a = (e.wizardSteps ?? []).map((c, u) => c.id ?? c.pageId ?? String(u)), d = a[s];
      return E`<span
                      class=${s === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${s + 1}${o.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(c) => {
        c.stopPropagation(), this._dragWizKey = d;
      }}
                      @dragover=${(c) => {
        this._dragWizKey && (c.preventDefault(), c.stopPropagation());
      }}
                      @drop=${(c) => {
        const u = this._dragWizKey;
        if (this._dragWizKey = null, !u || u === d) return;
        c.preventDefault(), c.stopPropagation();
        const g = c.currentTarget.getBoundingClientRect(), f = c.clientX - g.left < g.width / 2 ? d : a[s + 1] ?? null;
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
      const o = (((s = this.page) == null ? void 0 : s.buttons) ?? []).some((c) => c.useCaseId === this._btn.useCaseId);
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
                ${o ? E`<button
                      @click=${() => {
        const c = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: c });
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
              ${Qi.map(
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
pe.styles = vt`
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
we([
  le({ attribute: !1 })
], pe.prototype, "page", 2);
we([
  le({ type: Boolean, reflect: !0 })
], pe.prototype, "framed", 2);
we([
  le({ attribute: !1 })
], pe.prototype, "models", 2);
we([
  le({ attribute: !1 })
], pe.prototype, "mappings", 2);
we([
  le({ attribute: !1 })
], pe.prototype, "useCases", 2);
we([
  le({ attribute: !1 })
], pe.prototype, "queryOps", 2);
we([
  le({ attribute: !1 })
], pe.prototype, "selectedCmpId", 2);
we([
  q()
], pe.prototype, "_editing", 2);
we([
  q()
], pe.prototype, "_dragId", 2);
we([
  q()
], pe.prototype, "_overId", 2);
we([
  q()
], pe.prototype, "_rename", 2);
we([
  q()
], pe.prototype, "_route", 2);
we([
  q()
], pe.prototype, "_btn", 2);
we([
  q()
], pe.prototype, "_cmp", 2);
we([
  q()
], pe.prototype, "_dragCmpId", 2);
we([
  q()
], pe.prototype, "_dragWizKey", 2);
we([
  q()
], pe.prototype, "_overCmpId", 2);
we([
  q()
], pe.prototype, "_overCmpPos", 2);
we([
  q()
], pe.prototype, "_foreignOver", 2);
we([
  q()
], pe.prototype, "_activeTabs", 2);
pe = we([
  wt("modux-page-designer")
], pe);
var gc = Object.defineProperty, yc = Object.getOwnPropertyDescriptor, qe = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? yc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && gc(t, n, o), o;
};
const Fo = 460, bc = 540, Ic = 660;
let Pe = class extends Ge {
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
        const a = this.pages.findIndex((c) => c.id === s), d = this.posOf(s, a);
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
    var g, h, f, y, k, l;
    const n = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), i = (h = n == null ? void 0 : n.closest) == null ? void 0 : h.call(n, ".frame");
    if (!i) return null;
    const o = i.dataset.pageId, s = i.querySelector("modux-page-designer"), a = (f = s == null ? void 0 : s.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), d = (y = a == null ? void 0 : a.closest) == null ? void 0 : y.call(a, "[data-btn-uc]");
    if (d != null && d.dataset.btnUc) return `btn:${o}:${d.dataset.btnUc}`;
    const c = (k = a == null ? void 0 : a.closest) == null ? void 0 : k.call(a, "[data-bar]");
    if (c != null && c.dataset.bar) return `bar:${o}:${c.dataset.bar}`;
    const u = (l = a == null ? void 0 : a.closest) == null ? void 0 : l.call(a, "[data-cmp-id]");
    return u ? `cmp:${o}:${u.dataset.cmpId}` : o;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var f, y, k, l;
    const n = (f = this.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), i = (y = n == null ? void 0 : n.closest) == null ? void 0 : y.call(n, ".frame");
    if (!i) return null;
    const o = i.dataset.pageId, s = i.querySelector("modux-page-designer"), a = (k = s == null ? void 0 : s.shadowRoot) == null ? void 0 : k.elementFromPoint(e, t), d = (l = a == null ? void 0 : a.closest) == null ? void 0 : l.call(a, "[data-cmp-id]");
    if (!d) return { pageId: o, componentId: null, pos: "into" };
    const c = d.dataset.cmpKind ?? "", u = d.getBoundingClientRect(), g = (t - u.top) / Math.max(1, u.height), h = pe.LEAF_KINDS.has(c) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: o, componentId: d.dataset.cmpId, pos: h };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: Fo, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var n;
    return ((n = this._live) == null ? void 0 : n.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * bc, y: Math.floor(t / 3) * Ic };
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
Pe.styles = vt`
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
      width: ${Fo}px;
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
qe([
  le({ attribute: !1 })
], Pe.prototype, "pages", 2);
qe([
  le({ attribute: !1 })
], Pe.prototype, "layout", 2);
qe([
  le({ attribute: !1 })
], Pe.prototype, "sizes", 2);
qe([
  le({ attribute: !1 })
], Pe.prototype, "selectedId", 2);
qe([
  le({ attribute: !1 })
], Pe.prototype, "selectedIds", 2);
qe([
  le({ attribute: !1 })
], Pe.prototype, "models", 2);
qe([
  le({ attribute: !1 })
], Pe.prototype, "mappings", 2);
qe([
  le({ attribute: !1 })
], Pe.prototype, "useCases", 2);
qe([
  le({ attribute: !1 })
], Pe.prototype, "queryOps", 2);
qe([
  le({ attribute: !1 })
], Pe.prototype, "selectedCmp", 2);
qe([
  q()
], Pe.prototype, "_t", 2);
qe([
  q()
], Pe.prototype, "_live", 2);
qe([
  q()
], Pe.prototype, "_liveSize", 2);
Pe = qe([
  wt("modux-figma")
], Pe);
var xc = Object.defineProperty, vc = Object.getOwnPropertyDescriptor, Te = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? vc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && xc(t, n, o), o;
};
const wc = {
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
}, Bn = {
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
}, kc = {
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
}, Zi = [30, 20, 13, 9.5, 7.5], eo = [0, 180, 118, 80, 58], $c = 0.055, _c = 0.86, Cc = 2600, mn = 240, to = 0.16, no = 0.015;
let ge = class extends Ge {
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
    const s = 70, a = this.clientWidth || 800, d = this.clientHeight || 600, c = i - t + s * 2, u = o - n + s * 2, g = Math.min(1.5, Math.max(0.25, Math.min(a / c, d / u)));
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
      color: wc[e] ?? "#64748b",
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
        const s = (t.aggregates ?? []).filter((u) => u.boundedContextId === e.refId), a = o.useCases ?? [], d = new Set(s.map((u) => u.id)), c = new Set(
          (t.emissions ?? []).filter((u) => d.has(u.sourceId)).map((u) => u.domainEventId)
        );
        return [
          ...s.length ? [i("group", `aggregates:${e.refId}`, `Agregados · ${s.length}`)] : [],
          ...a.length ? [i("group", `use-cases:${e.refId}`, `Casos de uso · ${a.length}`)] : [],
          ...(o.domainEvents ?? []).filter((u) => !c.has(u.id)).map((u) => i("domain-event", u.id, u.name)),
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
        const o = e.refId.indexOf(":"), s = e.refId.slice(0, o), a = e.refId.slice(o + 1), d = t.boundedContexts.find((c) => c.id === a);
        return d ? s === "aggregates" ? (t.aggregates ?? []).filter((c) => c.boundedContextId === a).map((c) => i("aggregate", c.id, c.name)) : (d.useCases ?? []).map((c) => i(c.policy ? "policy" : "use-case", c.id, c.name)) : [];
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
          for (const c of d ?? [])
            c.pageId && s.add(c.pageId), a(c.children);
        };
        a(o.menuItems);
        for (const d of [o.headerPageId, o.homePageId, o.viewPageId, o.editPageId])
          d && s.add(d);
        return [...s].map((d) => (t.pages ?? []).find((c) => c.id === d)).filter((d) => !!d).map((d) => i("page", d.id, d.name));
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
        const d = (eo[Math.min(a.depth, eo.length - 1)] ?? 60) + Math.min(60, ((((s = a.parent.children) == null ? void 0 : s.length) ?? 1) - 1) * 2.5);
        let c = a.x - a.parent.x, u = a.y - a.parent.y, g = Math.hypot(c, u);
        if (g < 0.01) {
          const k = Math.random() * Math.PI * 2;
          c = Math.cos(k) * 0.1, u = Math.sin(k) * 0.1, g = 0.1;
        }
        const h = $c * (g - d), f = c / g * h, y = u / g * h;
        a.vx -= f, a.vy -= y, a.parent.vx += f * 0.4, a.parent.vy += y * 0.4;
      } else
        a.vx -= a.x * no, a.vy -= a.y * no;
      !this.reducedMotion && this._motion > 0 && (a.vx += Math.sin(t * a.f1 * Math.PI * 2 + a.p1) * to * this._motion, a.vy += Math.cos(t * a.f2 * Math.PI * 2 + a.p2) * to * this._motion);
    }
    for (let a = 0; a < e.length; a++) {
      const d = e[a];
      for (let c = a + 1; c < e.length; c++) {
        const u = e[c], g = u.x - d.x, h = u.y - d.y;
        if (Math.abs(g) > mn || Math.abs(h) > mn) continue;
        const f = g * g + h * h;
        if (f > mn * mn || f < 0.01) continue;
        const y = Math.sqrt(f), k = d.depth <= 1 && u.depth <= 1 ? 3 : 1, l = Cc * k / f, r = g / y * l, m = h / y * l;
        d.vx -= r, d.vy -= m, u.vx += r, u.vy += m;
      }
    }
    const n = this._motion, i = _c * n + 0.5 * (1 - n), o = (1 - n) * 0.7;
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
      const c = a === this.hover ? 1.75 : 1;
      a.scale += (c - a.scale) * 0.18;
    }
  }
  // ── Drawing ───────────────────────────────────────────────────────────
  radiusOf(e) {
    return (Zi[Math.min(e.depth, Zi.length - 1)] ?? 7) * e.scale;
  }
  draw(e) {
    var a, d;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const n = this.clientWidth, i = this.clientHeight;
    t.clearRect(0, 0, n, i), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), this.drawAreas(t, e), t.lineWidth = 1.3 / this.cam.k;
    for (const c of e)
      c.parent && (t.strokeStyle = c.color + "55", t.beginPath(), t.moveTo(c.parent.x, c.parent.y), t.lineTo(c.x, c.y), t.stroke());
    const o = this.journeyTouchedIds(e), s = (c) => `${c}px system-ui, sans-serif`;
    for (const c of e) {
      o && (t.globalAlpha = o.has(c.refId) ? 1 : 0.22);
      const u = this.radiusOf(c);
      t.beginPath(), t.arc(c.x, c.y, u, 0, Math.PI * 2), t.fillStyle = c.kind === "note" ? "#fef9c3" : c.expanded ? c.color + "22" : "#ffffff", t.fill(), t.lineWidth = (c === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = c.color, t.stroke(), this.drawGlyph(t, c, u);
      const g = ((a = c.children) == null ? void 0 : a.length) ?? 0;
      if (!c.expanded && g > 0) {
        const f = Math.max(7, u * 0.42), y = c.x + u * 0.75, k = c.y + u * 0.75;
        t.beginPath(), t.arc(y, k, f, 0, Math.PI * 2), t.fillStyle = c.color, t.fill(), t.fillStyle = "#ffffff", t.font = s(f * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(g), y, k + 0.5);
      }
      if (c.depth <= 1 || c === this.hover || this.cam.k > 0.65) {
        const f = c.label.length > 22 ? c.label.slice(0, 21) + "…" : c.label;
        t.font = c === this.hover ? `600 ${s(12)}` : s(c.depth <= 1 ? 12 : 10.5), t.fillStyle = c === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(f, c.x, c.y + u + 4);
      }
    }
    if (this.selected.size) {
      t.save(), t.strokeStyle = "#2563eb", t.lineWidth = 2 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]);
      for (const c of e)
        this.selected.has(c.key) && (t.beginPath(), t.arc(c.x, c.y, this.radiusOf(c) + 6, 0, Math.PI * 2), t.stroke());
      t.restore();
    }
    if (this.rubber) {
      const c = this.rubber;
      t.save(), t.fillStyle = "rgba(37, 99, 235, 0.08)", t.strokeStyle = "#2563eb", t.lineWidth = 1.2 / this.cam.k, t.setLineDash([4 / this.cam.k, 3 / this.cam.k]), t.fillRect(Math.min(c.ax, c.bx), Math.min(c.ay, c.by), Math.abs(c.bx - c.ax), Math.abs(c.by - c.ay)), t.strokeRect(Math.min(c.ax, c.bx), Math.min(c.ay, c.by), Math.abs(c.bx - c.ax), Math.abs(c.by - c.ay)), t.restore();
    }
    if (this.found)
      if (this.t > this.found.until)
        this.found = void 0;
      else {
        const c = this.found.node, u = (this.found.until - this.t) / 3.2;
        t.save(), t.globalAlpha = Math.min(0.8, u * 1.6), t.strokeStyle = c.color, t.lineWidth = 2.2 / this.cam.k;
        const g = this.reducedMotion ? 0 : Math.sin(this.t * 5) * 3;
        t.beginPath(), t.arc(c.x, c.y, this.radiusOf(c) + 9 + g, 0, Math.PI * 2), t.stroke(), t.globalAlpha *= 0.4, t.beginPath(), t.arc(c.x, c.y, this.radiusOf(c) + 18 + g * 1.4, 0, Math.PI * 2), t.stroke(), t.restore();
      }
    if (t.globalAlpha = 1, this.drawNotes(t, e), this.journey && this.drawJourney(t, e), this._threads)
      for (const c of e) this.drawThreads(t, c, e);
    else this.hover && this.drawThreads(t, this.hover, e);
    if (this.hover && !this.hover.expanded && ((d = this.hover.children) != null && d.length) && this.drawGhosts(t, this.hover), this.linking) {
      const c = this.linking.source;
      t.save(), t.strokeStyle = "#475569", t.lineWidth = 1.6 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]), t.beginPath(), t.moveTo(c.x, c.y), t.lineTo(this.linking.x, this.linking.y), t.stroke(), t.restore();
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
        const a = (t.x + s.x) / 2, d = (t.y + s.y) / 2, c = s.x - t.x, u = s.y - t.y, g = 0.18;
        e.strokeStyle = s.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(a - u * g, d + c * g, s.x, s.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(s.x, s.y, this.radiusOf(s) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
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
      ), c = [];
      for (const y of d) {
        const k = this.visibleRepresentative(y.id, t);
        k && c.push({ x: k.x, y: k.y, r: this.radiusOf(k) + 16 });
      }
      if (!c.length) continue;
      const u = Math.min(...c.map((y) => y.x - y.r)), g = Math.max(...c.map((y) => y.x + y.r)), h = Math.min(...c.map((y) => y.y - y.r)), f = Math.max(...c.map((y) => y.y + y.r));
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
      const a = this.visibleRepresentative(s.sourceId, t), d = this.visibleRepresentative(s.targetId, t), c = d ?? this.areaHulls.get(s.targetId);
      if (!a || !c || d === a) continue;
      const u = c.x - a.x, g = c.y - a.y, h = Math.hypot(u, g) || 1, f = this.radiusOf(a), y = d ? this.radiusOf(d) : 0;
      e.beginPath(), e.moveTo(a.x + u / h * f, a.y + g / h * f), e.lineTo(c.x - u / h * y, c.y - g / h * y), e.stroke();
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
        const s = (i.x + o.x) / 2, a = (i.y + o.y) / 2, d = o.x - i.x, c = o.y - i.y, u = 0.14, g = s - c * u, h = a + d * u;
        e.strokeStyle = "#d97706", e.lineWidth = 2.4 / this.cam.k, e.setLineDash([9 / this.cam.k, 7 / this.cam.k]), e.beginPath(), e.moveTo(i.x, i.y), e.quadraticCurveTo(g, h, o.x, o.y), e.stroke(), e.setLineDash([]);
        const f = o.x - g, y = o.y - h, k = Math.hypot(f, y) || 1, l = f / k, r = y / k, m = this.radiusOf(o) + 4, w = o.x - l * m, M = o.y - r * m, C = 9 / this.cam.k;
        e.fillStyle = "#d97706", e.beginPath(), e.moveTo(w, M), e.lineTo(w - l * C - r * C * 0.55, M - r * C + l * C * 0.55), e.lineTo(w - l * C + r * C * 0.55, M - r * C - l * C * 0.55), e.closePath(), e.fill();
        const R = s - c * u * 0.5, _ = a + d * u * 0.5, O = 11 / this.cam.k;
        e.beginPath(), e.arc(R, _, O, 0, Math.PI * 2), e.fillStyle = "#d97706", e.fill(), e.fillStyle = "#ffffff", e.font = `bold ${12 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle", e.fillText(n.num, R, _);
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
    var k, l, r;
    if (!((l = (k = this.journey) == null ? void 0 : k.runs) != null && l.length)) {
      this.runnerState = null, this.runnerFx = [];
      return;
    }
    const n = new Map(this.journey.legs.map((m) => [m.id, m])), i = this.journey.runs.map(
      (m) => m.map((w) => n.get(w)).filter((w) => !!w).map((w) => this.legGeometry(w, t)).filter((w) => !!w)
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
    let c = i[d.run][d.leg];
    const u = (m) => Math.max(24, Math.hypot(m.b.x - m.a.x, m.b.y - m.a.y));
    for (d.t += a * o / u(c); d.t >= 1; ) {
      if (d.t -= 1, d.leg++, d.leg >= i[d.run].length) {
        const m = i[d.run];
        this.runnerFx.push({ x: m[m.length - 1].b.x, y: m[m.length - 1].b.y, at: this.t, kind: "end" }), d.run = (d.run + 1) % i.length, d.leg = 0, d.t = 0, d.pause = s;
        return;
      }
      c = i[d.run][d.leg], d.t = d.t * 1;
    }
    const g = d.t, h = 1 - g, f = h * h * c.a.x + 2 * h * g * c.cx + g * g * c.b.x, y = h * h * c.a.y + 2 * h * g * c.cy + g * g * c.b.y;
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
    const a = this.radiusOf(t) + 24, d = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, c = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = o, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, i.forEach((u, g) => {
      const h = d - c / 2 + c * (g + 0.5) / i.length, f = this.reducedMotion ? 0 : Math.sin(this.t * u.f1 * Math.PI * 2 + u.p1) * 1.8, y = t.x + Math.cos(h) * (a + f), k = t.y + Math.sin(h) * (a + f);
      e.beginPath(), e.arc(y, k, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = u.color, e.stroke();
    }), n.length > i.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const u = d + c / 2 + 0.35;
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
    var O, B;
    const o = (t.children ?? []).flatMap(
      (H) => H.kind === "group" ? H.children ?? (H.children = this.childrenOf(H)) : [H]
    ), s = /* @__PURE__ */ new Map();
    for (const H of o) s.set(H.kind, (s.get(H.kind) ?? 0) + 1);
    const a = [];
    for (const [H, se] of s)
      if (a.push(`${se} ${se === 1 ? (Bn[H] ?? H).toLowerCase() : kc[H] ?? H}`), a.length === 4) {
        const $ = [...s.keys()].length - 4;
        $ > 0 && (a[3] += ` (+${$} tipos más)`);
        break;
      }
    const d = o.slice(0, 6).map((H) => ({ label: H.label.length > 30 ? H.label.slice(0, 29) + "…" : H.label, color: H.color })), c = o.length - d.length, u = t.label, g = Bn[t.kind] ?? t.kind, h = ((O = t.children) != null && O.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((B = t.children) != null && B.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const f = e.measureText(u).width;
    e.font = "11px system-ui, sans-serif";
    const y = Math.max(
      e.measureText(g).width,
      ...a.map((H) => e.measureText(H).width),
      ...d.map((H) => e.measureText(H.label).width + 12),
      e.measureText(h).width
    ), k = Math.min(300, Math.max(f, y) + 24), l = d.length ? 8 + d.length * 15 + (c > 0 ? 15 : 0) : 0, r = 40 + a.length * 15 + l + (h ? 18 : 0), m = this.radiusOf(t) * this.cam.k, w = this.cam.x + t.x * this.cam.k, M = this.cam.y + t.y * this.cam.k;
    let C = w + m + 14;
    C + k > n - 8 && (C = w - m - 14 - k), C = Math.max(8, Math.min(C, n - k - 8));
    const R = Math.max(8, Math.min(M - 10, i - r - 8));
    e.translate(C, R), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, k, r, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(u, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(g, 12, 25), e.fillStyle = "#475569", a.forEach((H, se) => e.fillText(H, 12, 41 + se * 15));
    let _ = 41 + a.length * 15 + (d.length ? 8 : 0);
    d.forEach((H) => {
      e.fillStyle = H.color, e.beginPath(), e.arc(15, _ + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(H.label, 24, _), _ += 15;
    }), c > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${c} más`, 24, _)), h && (e.fillStyle = "#94a3b8", e.fillText(h, 12, r - 16)), e.restore();
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
        const i = Math.min(n.ax, n.bx), o = Math.max(n.ax, n.bx), s = Math.min(n.ay, n.by), a = Math.max(n.ay, n.by), d = this.visible().filter((c) => c.kind !== "root" && c.kind !== "group" && c.refId).filter((c) => c.x >= i && c.x <= o && c.y >= s && c.y <= a).map((c) => c.key);
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
                  <span class="path">${this.pathOf(e) || (Bn[e.kind] ?? e.kind)}</span>
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
ge.styles = vt`
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
Te([
  le({ type: Boolean, reflect: !0 })
], ge.prototype, "shifted", 2);
Te([
  le({ attribute: !1 })
], ge.prototype, "scene", 2);
Te([
  le({ attribute: !1 })
], ge.prototype, "journey", 2);
Te([
  le({ attribute: !1 })
], ge.prototype, "model", 2);
Te([
  q()
], ge.prototype, "_q", 2);
Te([
  q()
], ge.prototype, "_sugs", 2);
Te([
  q()
], ge.prototype, "_active", 2);
Te([
  q()
], ge.prototype, "_motion", 2);
Te([
  q()
], ge.prototype, "_threads", 2);
Te([
  q()
], ge.prototype, "_viewNaming", 2);
Te([
  q()
], ge.prototype, "_viewName", 2);
Te([
  q()
], ge.prototype, "selected", 2);
Te([
  q()
], ge.prototype, "_levels", 2);
Te([
  le()
], ge.prototype, "sceneKey", 2);
Te([
  q()
], ge.prototype, "renaming", 2);
ge = Te([
  wt("modux-explorer")
], ge);
function Sc(e, t) {
  var n, i, o, s, a, d, c, u, g, h, f, y, k;
  switch (t.kind) {
    case "add-relation":
      return [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-relation": {
      const l = e.model.relations.find(
        (r) => r.sourceId === t.sourceId && r.targetId === t.targetId
      );
      return l && l.type ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: l.type }] : null;
    }
    case "set-relation-type": {
      const l = e.model.relations.find(
        (r) => r.sourceId === t.sourceId && r.targetId === t.targetId
      );
      return l && l.type ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: l.type }] : [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
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
      const l = (e.model.uiApps ?? []).find((r) => r.id === t.appId);
      return [{ kind: "set-app-header-page", appId: t.appId, pageId: (l == null ? void 0 : l.headerPageId) ?? null }];
    }
    case "set-app-model": {
      const l = (e.model.uiApps ?? []).find((r) => r.id === t.appId);
      return [{ kind: "set-app-model", appId: t.appId, modelId: (l == null ? void 0 : l.modelId) ?? null }];
    }
    case "add-model":
      return [{ kind: "remove-model", id: t.id }];
    case "add-model-mapping":
      return [{ kind: "remove-model-mapping", id: t.id }];
    case "remove-model-mapping": {
      const l = (e.model.modelMappings ?? []).find((r) => r.id === t.id);
      return !(l != null && l.sourceModelId) || !l.targetModelId ? null : [{
        kind: "add-model-mapping",
        id: l.id,
        name: l.name,
        sourceId: l.sourceModelId,
        targetId: l.targetModelId
      }];
    }
    case "remove-model": {
      const l = (e.model.models ?? []).find((m) => m.id === t.id);
      if (!l) return null;
      const r = [{ kind: "add-model", id: l.id, name: l.name }];
      for (const m of e.model.pages ?? []) {
        m.modelId === t.id && r.push({ kind: "set-page-model", pageId: m.id, modelId: t.id });
        const w = (M) => {
          for (const C of M ?? [])
            C.modelId === t.id && r.push({ kind: "set-page-component", pageId: m.id, componentId: C.id, modelId: t.id }), w(C.children);
        };
        w(m.content);
      }
      for (const m of e.model.uiApps ?? [])
        m.modelId === t.id && r.push({ kind: "set-app-model", appId: m.id, modelId: t.id });
      return r;
    }
    case "set-crud-detail":
    case "set-crud-create": {
      const l = (e.model.pages ?? []).find((m) => m.id === t.pageId), r = t.kind === "set-crud-detail";
      return [{
        kind: t.kind,
        pageId: t.pageId,
        targetId: (r ? l == null ? void 0 : l.crudDetailPageId : l == null ? void 0 : l.crudCreatePageId) ?? null,
        toAppId: (r ? l == null ? void 0 : l.crudDetailAppId : l == null ? void 0 : l.crudCreateAppId) ?? null
      }];
    }
    case "set-app-view-page": {
      const l = (e.model.uiApps ?? []).find((r) => r.id === t.appId);
      return [{ kind: "set-app-view-page", appId: t.appId, pageId: (l == null ? void 0 : l.viewPageId) ?? null }];
    }
    case "set-app-edit-page": {
      const l = (e.model.uiApps ?? []).find((r) => r.id === t.appId);
      return [{ kind: "set-app-edit-page", appId: t.appId, pageId: (l == null ? void 0 : l.editPageId) ?? null }];
    }
    case "set-app-home-page": {
      const l = (e.model.uiApps ?? []).find((r) => r.id === t.appId);
      return [{
        kind: "set-app-home-page",
        appId: t.appId,
        pageId: (l == null ? void 0 : l.homePageId) ?? null,
        toAppId: (l == null ? void 0 : l.homeAppId) ?? null
      }];
    }
    case "add-page-wizard-step":
      return [{ kind: "remove-page-wizard-step", pageId: t.pageId, targetId: t.itemId ?? t.targetId }];
    case "set-wizard-step-page": {
      const l = (((n = (e.model.pages ?? []).find((r) => r.id === t.pageId)) == null ? void 0 : n.wizardSteps) ?? []).find((r) => (r.id ?? r.pageId) === t.itemId);
      return l ? [{ kind: "set-wizard-step-page", pageId: t.pageId, itemId: t.itemId, targetId: l.pageId ?? null }] : null;
    }
    case "move-page-wizard-step": {
      const l = (((i = (e.model.pages ?? []).find((m) => m.id === t.pageId)) == null ? void 0 : i.wizardSteps) ?? []).map((m) => m.id ?? m.pageId), r = l.indexOf(t.targetId);
      return r < 0 ? null : [{
        kind: "move-page-wizard-step",
        pageId: t.pageId,
        targetId: t.targetId,
        beforeItemId: l[r + 1] ?? null
      }];
    }
    case "remove-page-wizard-step": {
      const l = (((o = (e.model.pages ?? []).find((r) => r.id === t.pageId)) == null ? void 0 : o.wizardSteps) ?? []).find((r) => (r.id ?? r.pageId) === t.targetId);
      return l ? [{
        kind: "add-page-wizard-step",
        pageId: t.pageId,
        targetId: l.pageId ?? null,
        label: l.label,
        itemId: l.id
      }] : null;
    }
    case "delete-ui-app": {
      const l = (e.model.uiApps ?? []).find((w) => w.id === t.id);
      if (!l) return null;
      const r = [{ kind: "create-ui-app", id: l.id, name: l.name, type: l.type }];
      l.headerPageId && r.push({ kind: "set-app-header-page", appId: l.id, pageId: l.headerPageId }), l.modelId && r.push({ kind: "set-app-model", appId: l.id, modelId: l.modelId }), l.viewPageId && r.push({ kind: "set-app-view-page", appId: l.id, pageId: l.viewPageId }), l.editPageId && r.push({ kind: "set-app-edit-page", appId: l.id, pageId: l.editPageId }), (l.homePageId || l.homeAppId) && r.push({
        kind: "set-app-home-page",
        appId: l.id,
        pageId: l.homePageId ?? null,
        toAppId: l.homeAppId ?? null
      });
      const m = (w, M) => {
        for (const C of w ?? [])
          r.push({
            kind: "add-menu-item",
            appId: l.id,
            label: C.label,
            itemId: C.id,
            parentId: M == null ? void 0 : M.id,
            parentLabel: M && !M.id ? M.label : void 0,
            pageId: C.pageId ?? null
          }), C.uiAdapterId && r.push({ kind: "set-menu-app", appId: l.id, toAppId: C.uiAdapterId, itemId: C.id, label: C.label }), C.useCaseId && r.push({ kind: "set-menu-use-case", appId: l.id, useCaseId: C.useCaseId, itemId: C.id, label: C.label }), C.aggregateId && r.push({ kind: "set-menu-aggregate", appId: l.id, aggregateId: C.aggregateId, itemId: C.id, label: C.label }), C.queryOperationId && r.push({
            kind: "set-menu-query-operation",
            appId: l.id,
            queryServiceId: C.queryServiceId ?? null,
            queryOperationId: C.queryOperationId,
            itemId: C.id,
            label: C.label
          }), m(C.children, C);
      };
      m(l.menuItems);
      for (const w of e.model.actorAppUses ?? [])
        w.appId === t.id && r.push({ kind: "add-actor-app", actorId: w.actorId, appId: t.id });
      return r;
    }
    case "delete-ui-page": {
      const l = (e.model.pages ?? []).find((m) => m.id === t.id);
      if (!l) return null;
      const r = [
        { kind: "create-ui-page", id: l.id, name: l.name, pageType: l.type ?? "FORM" }
      ];
      l.route && r.push({ kind: "set-page-route", pageId: l.id, path: l.route }), l.modelId && r.push({ kind: "set-page-model", pageId: l.id, modelId: l.modelId }), l.listingQueryServiceId && r.push({ kind: "set-page-listing", pageId: l.id, queryServiceId: l.listingQueryServiceId });
      for (const m of l.buttons ?? [])
        m.useCaseId && (r.push({ kind: "add-page-button", pageId: l.id, useCaseId: m.useCaseId, label: m.label }), m.mappingId && r.push({
          kind: "set-page-button",
          pageId: l.id,
          useCaseId: m.useCaseId,
          label: m.label ?? null,
          mappingId: m.mappingId
        }));
      for (const m of l.viewmodelFields ?? [])
        (m.stereotype || m.colspan || m.label) && r.push({
          kind: "set-page-field-config",
          pageId: l.id,
          fieldId: m.fieldId,
          stereotype: m.stereotype ?? null,
          colspan: m.colspan ?? null,
          label: m.label ?? null
        });
      (l.viewmodelFields ?? []).length && r.push({
        kind: "set-page-field-order",
        pageId: l.id,
        fieldIds: (l.viewmodelFields ?? []).map((m) => m.fieldId)
      });
      for (const m of l.content ?? [])
        r.push(...e.rebuildComponentOps(l.id, m, void 0, null).ops);
      for (const m of l.wizardSteps ?? [])
        r.push({
          kind: "add-page-wizard-step",
          pageId: l.id,
          targetId: m.pageId ?? null,
          label: m.label,
          itemId: m.id
        });
      return (l.crudDetailPageId || l.crudDetailAppId) && r.push({ kind: "set-crud-detail", pageId: l.id, targetId: l.crudDetailPageId ?? null, toAppId: l.crudDetailAppId ?? null }), (l.crudCreatePageId || l.crudCreateAppId) && r.push({ kind: "set-crud-create", pageId: l.id, targetId: l.crudCreatePageId ?? null, toAppId: l.crudCreateAppId ?? null }), r;
    }
    case "add-menu-item":
      return [{ kind: "remove-menu-item", appId: t.appId, itemId: t.itemId, label: t.label }];
    case "remove-menu-item":
    case "set-menu-page":
    case "set-menu-app":
    case "set-menu-use-case":
    case "set-menu-aggregate":
    case "set-menu-query-operation": {
      const l = (e.model.uiApps ?? []).find((w) => w.id === t.appId), r = (w) => {
        for (const M of w ?? []) {
          if (t.itemId ? M.id === t.itemId : M.label === t.label) return M;
          const C = r(M.children);
          if (C) return C;
        }
        return null;
      }, m = t.itemId || t.label ? r(l == null ? void 0 : l.menuItems) : null;
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
      const l = (e.model.pages ?? []).find((m) => m.id === t.pageId), r = ((l == null ? void 0 : l.buttons) ?? []).find((m) => m.useCaseId === t.useCaseId);
      return r ? [{ kind: "add-page-button", pageId: t.pageId, useCaseId: t.useCaseId, label: r.label }] : null;
    }
    case "rename-ui-page": {
      const l = (e.model.pages ?? []).find((r) => r.id === t.pageId);
      return l ? [{ kind: "rename-ui-page", pageId: t.pageId, name: l.name }] : null;
    }
    case "set-page-type": {
      const l = (e.model.pages ?? []).find((r) => r.id === t.pageId);
      return l ? [{ kind: "set-page-type", pageId: t.pageId, pageType: l.type ?? "FORM" }] : null;
    }
    case "set-page-route": {
      const l = (e.model.pages ?? []).find((r) => r.id === t.pageId);
      return l != null && l.route ? [{ kind: "set-page-route", pageId: t.pageId, path: l.route }] : null;
    }
    case "set-page-button": {
      const l = (e.model.pages ?? []).find((m) => m.id === t.pageId), r = ((l == null ? void 0 : l.buttons) ?? []).find((m) => m.useCaseId === t.useCaseId);
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
      const l = (e.model.pages ?? []).find((R) => R.id === t.pageId);
      let r = null, m = null, w = null;
      const M = (R, _) => {
        var B;
        const O = R ?? [];
        for (let H = 0; H < O.length; H++)
          O[H].id === t.componentId && (r = O[H], m = _, w = ((B = O[H + 1]) == null ? void 0 : B.id) ?? null), M(O[H].children, O[H]);
      };
      if (M(l == null ? void 0 : l.content, null), !r) return null;
      const C = r;
      return t.kind === "set-page-component" ? [{
        kind: "set-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        title: C.title ?? null,
        text: C.text ?? null,
        label: C.label ?? null,
        useCaseId: C.useCaseId ?? null,
        mappingId: C.mappingId ?? null,
        modelId: C.modelId ?? null,
        queryServiceId: C.queryServiceId ?? null,
        queryOperationId: C.queryOperationId ?? null,
        fieldId: C.fieldId ?? null,
        stereotype: C.stereotype ?? null,
        colspan: C.colspan ?? null
      }] : t.kind === "move-page-component" ? [{
        kind: "move-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        parentComponentId: m === null ? null : m.id,
        beforeComponentId: w
      }] : e.rebuildComponentOps(
        t.pageId,
        C,
        m === null ? void 0 : m.id,
        w
      ).ops;
    }
    case "set-page-listing": {
      const l = (e.model.pages ?? []).find((r) => r.id === t.pageId);
      return [{ kind: "set-page-listing", pageId: t.pageId, queryServiceId: (l == null ? void 0 : l.listingQueryServiceId) ?? null }];
    }
    case "set-page-model": {
      const l = (e.model.pages ?? []).find((r) => r.id === t.pageId);
      return [{ kind: "set-page-model", pageId: t.pageId, modelId: (l == null ? void 0 : l.modelId) ?? null }];
    }
    case "set-page-field-config": {
      const l = (((s = (e.model.pages ?? []).find((r) => r.id === t.pageId)) == null ? void 0 : s.viewmodelFields) ?? []).find((r) => r.fieldId === t.fieldId);
      return [{
        kind: "set-page-field-config",
        pageId: t.pageId,
        fieldId: t.fieldId,
        stereotype: (l == null ? void 0 : l.stereotype) ?? null,
        colspan: (l == null ? void 0 : l.colspan) ?? null,
        label: (l == null ? void 0 : l.label) ?? null
      }];
    }
    case "set-page-field-order": {
      const l = (((a = (e.model.pages ?? []).find((r) => r.id === t.pageId)) == null ? void 0 : a.viewmodelFields) ?? []).map((r) => r.fieldId);
      return l.length ? [{ kind: "set-page-field-order", pageId: t.pageId, fieldIds: l }] : null;
    }
    case "move-menu-item": {
      const l = t.itemId ? e.menuEntryIn(t.appId, t.itemId) : null;
      return [{
        kind: "move-menu-item",
        appId: t.toAppId,
        toAppId: t.appId,
        itemId: t.itemId,
        label: t.label,
        parentId: (l == null ? void 0 : l.parentId) ?? void 0,
        beforeItemId: (l == null ? void 0 : l.beforeId) ?? void 0
      }];
    }
    case "add-actor-app":
      return [{ kind: "remove-actor-app", actorId: t.actorId, appId: t.appId }];
    case "remove-actor-app":
      return [{ kind: "add-actor-app", actorId: t.actorId, appId: t.appId }];
    case "add-boundedContext":
      return [{ kind: "remove-boundedContext", id: t.id }];
    case "remove-boundedContext": {
      const l = e.model.boundedContexts.find((m) => m.id === t.id);
      if (!l) return null;
      const r = e.model.relations.filter(
        (m) => (m.sourceId === t.id || m.targetId === t.id) && m.type != null
      );
      return [
        { kind: "add-boundedContext", id: l.id, name: l.name, subdomainType: l.subdomainType ?? "GENERIC" },
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
      const l = (e.model.aggregates ?? []).find((r) => r.id === t.id);
      return l ? [{ kind: "add-aggregate", id: l.id, name: l.name, boundedContextId: l.boundedContextId }] : null;
    }
    case "add-domain-event":
      return [{ kind: "remove-domain-event", id: t.id }];
    case "add-query-service":
      return [{ kind: "remove-query-service", id: t.id }];
    case "remove-query-service": {
      for (const l of e.model.boundedContexts) {
        const r = (l.queryServices ?? []).find((m) => m.id === t.id);
        if (r) return [{ kind: "add-query-service", id: r.id, name: r.name, boundedContextId: l.id }];
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
      const l = (e.model.externalSystemDependencies ?? []).find(
        (r) => r.sourceId === t.sourceId && r.targetId === t.targetId
      );
      return l ? [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: l.type }] : [{ kind: "remove-external-dependency", sourceId: t.sourceId, targetId: t.targetId }];
    }
    case "remove-external-dependency": {
      const l = (e.model.externalSystemDependencies ?? []).find(
        (r) => r.sourceId === t.sourceId && r.targetId === t.targetId
      );
      return [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: l == null ? void 0 : l.type }];
    }
    case "add-proxy-api":
      return [{ kind: "remove-proxy-api", id: t.id }];
    case "remove-proxy-api": {
      const l = (e.model.proxyApis ?? []).find((r) => r.id === t.id);
      return l ? [{
        kind: "add-proxy-api",
        id: l.id,
        name: l.name,
        targetId: l.targetApiId,
        boundedContextId: l.publishedByExternalSystemId
      }] : null;
    }
    case "set-proxy-target": {
      const l = (e.model.proxyApis ?? []).find((r) => r.id === t.id);
      return l ? [{ kind: "set-proxy-target", id: t.id, targetId: l.targetApiId ?? "" }] : null;
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
      const l = (e.model.apiOperationImplementations ?? []).find(
        (r) => r.apiId === t.apiId && r.operationId === t.operationId && r.boundedContextId === t.boundedContextId
      );
      return l ? [{
        kind: "set-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        boundedContextId: t.boundedContextId,
        targetUseCaseId: l.useCaseId
      }] : [{
        kind: "remove-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        boundedContextId: t.boundedContextId
      }];
    }
    case "remove-api-operation-implementation": {
      const l = (e.model.apiOperationImplementations ?? []).find(
        (r) => r.apiId === t.apiId && r.operationId === t.operationId && r.boundedContextId === t.boundedContextId
      );
      return l ? [{
        kind: "set-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        boundedContextId: t.boundedContextId,
        targetUseCaseId: l.useCaseId
      }] : null;
    }
    case "set-api-publisher": {
      const l = (e.model.apis ?? []).find((r) => r.id === t.id) ?? (e.model.proxyApis ?? []).find((r) => r.id === t.id);
      return l ? [{ kind: "set-api-publisher", id: t.id, targetId: l.publishedByExternalSystemId ?? "" }] : null;
    }
    case "add-actor-crud":
      return [{ kind: "remove-actor-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-actor-crud":
      return [{ kind: "add-actor-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-use-case":
      return [{ kind: "remove-use-case", id: t.id }];
    case "remove-use-case": {
      for (const l of e.model.boundedContexts) {
        const r = (l.useCases ?? []).find((m) => m.id === t.id);
        if (r)
          return [
            { kind: "add-use-case", id: r.id, name: r.name, boundedContextId: l.id, policy: r.policy }
          ];
      }
      return null;
    }
    case "add-external-use-case":
      return [{ kind: "remove-external-use-case", id: t.id }];
    case "remove-external-use-case": {
      for (const l of e.model.externalSystems) {
        const r = (l.useCases ?? []).find((m) => m.id === t.id);
        if (r)
          return [{ kind: "add-external-use-case", id: r.id, name: r.name, boundedContextId: l.id }];
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
      const l = (e.model.notifications ?? []).find((m) => m.id === t.id);
      if (!(l != null && l.ownerBoundedContextId)) return null;
      const r = [
        { kind: "add-notification", id: l.id, name: l.name, boundedContextId: l.ownerBoundedContextId, type: (l.channels ?? [])[0] }
      ];
      l.eventId && r.push({ kind: "set-notification-event", id: l.id, targetId: l.eventId });
      for (const m of l.recipientRoleIds ?? []) r.push({ kind: "add-notification-recipient", id: l.id, roleId: m });
      return r;
    }
    case "set-notification-event": {
      const l = (e.model.notifications ?? []).find((r) => r.id === t.id);
      return [{ kind: "set-notification-event", id: t.id, targetId: (l == null ? void 0 : l.eventId) ?? null }];
    }
    case "add-notification-recipient":
      return [{ kind: "remove-notification-recipient", id: t.id, roleId: t.roleId }];
    case "remove-notification-recipient":
      return [{ kind: "add-notification-recipient", id: t.id, roleId: t.roleId }];
    case "add-document":
      return [{ kind: "remove-document", id: t.id }];
    case "remove-document": {
      const l = (e.model.documents ?? []).find((m) => m.id === t.id);
      if (!(l != null && l.ownerBoundedContextId)) return null;
      const r = [
        { kind: "add-document", id: l.id, name: l.name, boundedContextId: l.ownerBoundedContextId, type: l.kind }
      ];
      return l.modelId && r.push({ kind: "set-document-model", id: l.id, modelId: l.modelId }), l.queryServiceId && r.push({ kind: "set-document-query", id: l.id, queryServiceId: l.queryServiceId, queryOperationId: l.queryOperationId ?? null }), r;
    }
    case "set-document-model": {
      const l = (e.model.documents ?? []).find((r) => r.id === t.id);
      return [{ kind: "set-document-model", id: t.id, modelId: (l == null ? void 0 : l.modelId) ?? null }];
    }
    case "set-document-query": {
      const l = (e.model.documents ?? []).find((r) => r.id === t.id);
      return [{ kind: "set-document-query", id: t.id, queryServiceId: (l == null ? void 0 : l.queryServiceId) ?? null, queryOperationId: (l == null ? void 0 : l.queryOperationId) ?? null }];
    }
    case "add-identity-provider":
      return [{ kind: "remove-identity-provider", id: t.id }];
    case "remove-identity-provider": {
      const l = (e.model.identityProviders ?? []).find((m) => m.id === t.id);
      if (!l) return null;
      const r = [
        { kind: "add-identity-provider", id: l.id, name: l.name, type: l.type }
      ];
      l.publishedByExternalSystemId && r.push({ kind: "set-idp-publisher", id: l.id, targetId: l.publishedByExternalSystemId });
      for (const m of e.model.boundedContexts)
        m.identityProviderId === t.id && r.push({ kind: "set-identity-provider", id: m.id, targetId: t.id });
      for (const m of e.model.uiApps ?? [])
        m.identityProviderId === t.id && r.push({ kind: "set-identity-provider", id: m.id, targetId: t.id });
      for (const m of e.model.etlFlows ?? [])
        m.identityProviderId === t.id && r.push({ kind: "set-identity-provider", id: m.id, targetId: t.id });
      return r;
    }
    case "set-idp-publisher": {
      const l = (e.model.identityProviders ?? []).find((r) => r.id === t.id);
      return [{ kind: "set-idp-publisher", id: t.id, targetId: (l == null ? void 0 : l.publishedByExternalSystemId) ?? null }];
    }
    case "set-identity-provider": {
      const l = ((d = e.model.boundedContexts.find((r) => r.id === t.id)) == null ? void 0 : d.identityProviderId) ?? ((c = (e.model.uiApps ?? []).find((r) => r.id === t.id)) == null ? void 0 : c.identityProviderId) ?? ((u = (e.model.etlFlows ?? []).find((r) => r.id === t.id)) == null ? void 0 : u.identityProviderId) ?? null;
      return [{ kind: "set-identity-provider", id: t.id, targetId: l }];
    }
    case "add-etl-flow":
      return [{ kind: "remove-etl-flow", id: t.id }];
    case "remove-etl-flow": {
      const l = (e.model.etlFlows ?? []).find((r) => r.id === t.id);
      return !l || !l.ownerBoundedContextId ? null : [
        { kind: "add-etl-flow", id: l.id, name: l.name, boundedContextId: l.ownerBoundedContextId },
        ...(l.steps ?? []).map((r) => ({
          kind: "add-etl-step",
          etlFlowId: l.id,
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
      const l = (((g = (e.model.etlFlows ?? []).find((r) => r.id === t.etlFlowId)) == null ? void 0 : g.steps) ?? []).find((r) => r.id === t.id);
      return l ? [{
        kind: "add-etl-step",
        etlFlowId: t.etlFlowId,
        id: l.id,
        name: l.name,
        stepType: l.type,
        externalTableId: l.externalTableId,
        apiId: l.apiId,
        operationId: l.operationId,
        targetId: l.eventId,
        mappingId: l.mappingId
      }] : null;
    }
    case "add-scheduled-trigger":
      return [{ kind: "remove-scheduled-trigger", id: t.id }];
    case "remove-scheduled-trigger": {
      const l = e.model.boundedContexts.find(
        (m) => (m.scheduledTriggers ?? []).some((w) => w.id === t.id)
      ), r = ((l == null ? void 0 : l.scheduledTriggers) ?? []).find((m) => m.id === t.id);
      return !l || !r ? null : [{
        kind: "add-scheduled-trigger",
        id: r.id,
        name: r.name,
        boundedContextId: l.id,
        cronExpression: r.cronExpression,
        targetUseCaseId: r.useCaseId
      }];
    }
    case "set-scheduled-trigger-target": {
      const l = e.model.boundedContexts.flatMap((r) => r.scheduledTriggers ?? []).find((r) => r.id === t.id);
      return l ? [{ kind: "set-scheduled-trigger-target", id: t.id, targetUseCaseId: l.useCaseId ?? null }] : null;
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
      const l = e.model.externalSystems.find((r) => r.id === t.id);
      return l ? [{ kind: "add-external-system", id: l.id, name: l.name }] : null;
    }
    case "add-ai-agent":
      return [{ kind: "remove-ai-agent", id: t.id }];
    case "remove-ai-agent": {
      const l = (e.model.aiAgents ?? []).find((r) => r.id === t.id);
      return l ? [
        { kind: "add-ai-agent", id: l.id, name: l.name, external: l.external },
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
      const l = (e.model.mcpGateways ?? []).find((r) => r.id === t.id);
      return l ? [
        { kind: "add-mcp-gateway", id: l.id, name: l.name },
        ...[
          ...l.mcpServerIds ?? [],
          ...l.apiIds ?? [],
          ...l.apiOperationIds ?? [],
          ...l.useCaseIds ?? [],
          ...l.ragIds ?? []
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
      for (const l of e.model.externalSystems) {
        const r = (l.mcpServers ?? []).find((m) => m.id === t.id);
        if (r)
          return [
            { kind: "add-mcp-server", id: r.id, name: r.name, boundedContextId: l.id, uri: r.uri },
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
      const l = (e.model.rags ?? []).find((r) => r.id === t.id);
      return l ? [
        { kind: "add-rag", id: l.id, name: l.name },
        ...(e.model.agentRags ?? []).filter((r) => r.ragId === t.id).map(
          (r) => ({
            kind: "add-agent-rag",
            sourceId: r.agentId,
            targetId: t.id
          })
        ),
        ...(l.sourceReadModelIds ?? []).map(
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
      const l = (e.model.actors ?? []).find((r) => r.id === t.id);
      return l ? [{ kind: "add-actor", id: l.id, name: l.name }] : null;
    }
    case "add-note":
      return [{ kind: "remove-note", id: t.id }];
    case "remove-note": {
      const l = (e.model.notes ?? []).find((r) => r.id === t.id);
      return l ? [
        { kind: "add-note", id: l.id, name: l.text },
        ...[...l.targetIds ?? [], ...l.edgeRefs ?? []].map(
          (r) => ({ kind: "note-attach", id: l.id, targetId: r })
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
      const l = (e.model.areas ?? []).find((r) => r.id === t.id);
      return l ? [{ kind: "add-area", id: l.id, name: l.name }] : null;
    }
    case "add-application-event":
      return [{ kind: "remove-application-event", id: t.id }];
    case "remove-application-event": {
      for (const l of e.model.boundedContexts) {
        const r = (l.applicationEvents ?? []).find((m) => m.id === t.id);
        if (r)
          return [{ kind: "add-application-event", id: r.id, name: r.name, boundedContextId: l.id }];
      }
      return null;
    }
    case "add-domain-service":
      return [{ kind: "remove-domain-service", id: t.id }];
    case "remove-domain-service": {
      for (const l of e.model.boundedContexts) {
        const r = (l.domainServices ?? []).find((m) => m.id === t.id);
        if (r) return [{ kind: "add-domain-service", id: r.id, name: r.name, boundedContextId: l.id }];
      }
      return null;
    }
    case "add-read-model":
      return [{ kind: "remove-read-model", id: t.id }];
    case "add-projection":
      return [{ kind: "remove-projection", id: t.id }];
    case "remove-projection": {
      const l = (e.model.projections ?? []).find((r) => r.id === t.id);
      return l && (l.sourceAggregateId || l.sourceExternalUseCaseId || l.sourceExternalTableId) ? [
        {
          kind: "add-projection",
          id: l.id,
          name: l.name,
          aggregateId: l.sourceAggregateId,
          externalUseCaseId: l.sourceExternalUseCaseId,
          externalTableId: l.sourceExternalTableId,
          targetId: l.readModelId,
          boundedContextId: l.boundedContextId
        }
      ] : null;
    }
    case "add-external-table":
      return [{ kind: "remove-external-table", id: t.id }];
    case "remove-external-table": {
      for (const l of e.model.externalSystems) {
        const r = (l.tables ?? []).find((m) => m.id === t.id);
        if (r) return [{ kind: "add-external-table", id: r.id, name: r.name, boundedContextId: l.id }];
      }
      return null;
    }
    case "add-rag-content-source":
      return [{ kind: "remove-rag-content-source", sourceId: t.sourceId, uri: t.uri }];
    case "remove-rag-content-source": {
      const l = (f = (h = (e.model.rags ?? []).find((r) => r.id === t.sourceId)) == null ? void 0 : h.contentSources) == null ? void 0 : f.find((r) => r.uri === t.uri);
      return l ? [
        {
          kind: "add-rag-content-source",
          sourceId: t.sourceId,
          type: l.type,
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
      const l = (e.model.apis ?? []).find((r) => r.id === t.id);
      return l ? [
        { kind: "add-api", id: l.id, name: l.name },
        ...l.operations.map(
          (r) => ({
            kind: "add-api-operation",
            apiId: l.id,
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
      const l = (y = (e.model.apis ?? []).find((r) => r.id === t.apiId)) == null ? void 0 : y.operations.find((r) => r.id === t.id);
      return l ? [
        {
          kind: "add-api-operation",
          apiId: t.apiId,
          id: l.id,
          name: l.name,
          httpMethod: l.httpMethod,
          path: l.path,
          boundedContextId: l.targetBoundedContextId,
          targetUseCaseId: l.targetUseCaseId
        }
      ] : null;
    }
    case "set-api-operation-target": {
      const l = (k = (e.model.apis ?? []).find((r) => r.id === t.apiId)) == null ? void 0 : k.operations.find((r) => r.id === t.id);
      return l ? [
        {
          kind: "set-api-operation-target",
          apiId: t.apiId,
          id: t.id,
          boundedContextId: l.targetBoundedContextId,
          targetUseCaseId: l.targetUseCaseId
        }
      ] : null;
    }
    case "remove-read-model": {
      for (const l of e.model.boundedContexts) {
        const r = (l.readModels ?? []).find((m) => m.id === t.id);
        if (r != null && r.aggregateId)
          return [{ kind: "add-read-model", id: r.id, name: r.name, aggregateId: r.aggregateId }];
      }
      return null;
    }
    case "remove-domain-event": {
      for (const l of e.model.boundedContexts) {
        const r = (l.domainEvents ?? []).find((m) => m.id === t.id);
        if (r) return [{ kind: "add-domain-event", id: r.id, name: r.name, boundedContextId: l.id }];
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
      const l = e.model.flows.find((r) => r.id === t.id);
      return l ? [
        {
          kind: "add-flow",
          id: l.id,
          name: l.name,
          archetype: l.archetype,
          triggerAggregateId: l.triggerAggregateId ?? "",
          triggerEvent: l.triggerEvent ?? "",
          targetId: l.targetId,
          readModelName: l.readModelName,
          targetUseCaseId: l.targetUseCaseId
        }
      ] : null;
    }
    case "add-journey":
      return [{ kind: "remove-journey", id: t.id }];
    case "remove-journey": {
      const l = (e.model.journeys ?? []).find((r) => r.id === t.id);
      return l ? [
        { kind: "add-journey", id: l.id, name: l.name },
        ...(l.legs ?? []).map((r) => ({
          kind: "journey-add-leg",
          journeyId: l.id,
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
      const l = (e.model.journeys ?? []).find((m) => m.id === t.journeyId), r = ((l == null ? void 0 : l.legs) ?? []).find((m) => m.id === t.itemId);
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
      const l = (e.model.views ?? []).find((r) => r.id === t.id);
      return l ? [{ kind: "add-view", id: l.id, name: l.name, memberIds: l.memberIds }] : null;
    }
    case "add-process":
      return [{ kind: "remove-process", id: t.id }];
    case "add-process-step":
      return [{ kind: "remove-process-step", processId: t.processId, id: t.id }];
    case "remove-process-step": {
      const l = (e.model.processes ?? []).find((w) => w.id === t.processId), r = (l == null ? void 0 : l.steps.findIndex((w) => w.id === t.id)) ?? -1;
      if (!l || r < 0) return null;
      const m = l.steps[r];
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
          afterStepId: r > 0 ? l.steps[r - 1].id : void 0
        }
      ];
    }
    case "move-process-step": {
      const l = (e.model.processes ?? []).find((m) => m.id === t.processId), r = (l == null ? void 0 : l.steps.findIndex((m) => m.id === t.id)) ?? -1;
      return !l || r < 0 ? null : [
        {
          kind: "move-process-step",
          processId: t.processId,
          id: t.id,
          afterStepId: r > 0 ? l.steps[r - 1].id : void 0
        }
      ];
    }
    case "update-process-step": {
      const l = (e.model.processes ?? []).find((m) => m.id === t.processId), r = l == null ? void 0 : l.steps.find((m) => m.id === t.id);
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
      const l = (e.model.processes ?? []).find((r) => r.id === t.id);
      return l ? [
        {
          kind: "add-process",
          id: l.id,
          name: l.name,
          boundedContextId: l.ownerBoundedContextId ?? "",
          triggerAggregateId: l.triggerAggregateId,
          triggerEvent: l.triggerEvent,
          steps: l.steps
        }
      ] : null;
    }
    case "add-workflow":
      return [{ kind: "remove-workflow", id: t.id }];
    case "remove-workflow": {
      const l = (e.model.workflows ?? []).find((r) => r.id === t.id);
      return l ? [
        {
          kind: "add-workflow",
          id: l.id,
          name: l.name,
          triggerAggregateId: l.triggerAggregateId,
          triggerDomainServiceId: l.triggerDomainServiceId,
          triggerUseCaseId: l.triggerUseCaseId,
          triggerEvent: l.triggerEvent,
          completionEventName: l.onCompletionEventName,
          workflowSteps: l.steps
        }
      ] : null;
    }
    case "add-workflow-step":
      return [{ kind: "remove-workflow-step", workflowId: t.workflowId, id: t.id }];
    case "remove-workflow-step": {
      const l = (e.model.workflows ?? []).find((w) => w.id === t.workflowId), r = (l == null ? void 0 : l.steps.findIndex((w) => w.id === t.id)) ?? -1;
      if (!l || r < 0) return null;
      const m = l.steps[r];
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
          afterStepId: r > 0 ? l.steps[r - 1].id : void 0
        },
        // Removing a step also strips it from its dependents; restore those edges.
        ...l.steps.filter((w) => w.id !== t.id && (w.dependsOnStepIds ?? []).includes(t.id)).map(
          (w) => ({
            kind: "add-workflow-dependency",
            workflowId: t.workflowId,
            id: w.id,
            dependsOnStepId: t.id
          })
        )
      ];
    }
    case "update-workflow-step": {
      const l = (e.model.workflows ?? []).find((m) => m.id === t.workflowId), r = l == null ? void 0 : l.steps.find((m) => m.id === t.id);
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
      const l = (e.model.workflows ?? []).find((r) => r.id === t.id);
      return l ? [{
        kind: "set-workflow-trigger",
        id: t.id,
        triggerEvent: l.triggerEvent ?? "",
        triggerAggregateId: l.triggerAggregateId,
        triggerDomainServiceId: l.triggerDomainServiceId,
        triggerUseCaseId: l.triggerUseCaseId
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
const re = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""), Ec = [
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
  { id: "idp-trust", label: "Identidad", hint: "Contexto, app o flujo ETL → IdP cuyos tokens valida" },
  { id: "ui-assignment", label: "Asignación a la UI", hint: "App o página ⇆ UI declarada: se le asigna (assignment)" },
  { id: "ui-composition", label: "Composición (expone la UI)", hint: "Contexto ⇆ UI: el contexto la posee — la única relación posible entre ambos" },
  { id: "ui-serving", label: "Servidumbre (sirve al actor)", hint: "UI ⇆ actor: la interfaz le sirve — la única relación posible entre ambos" }
];
function Sn(e, t, n) {
  return Object.entries(ro).map(([i, o]) => ({
    id: `archimate:${i}`,
    label: `${o} — ArchiMate`,
    hint: `Relación ArchiMate «${o}» de documentación entre estos dos elementos`,
    apply() {
      e.command({
        kind: "add-archimate-relation",
        id: `ar-${t}-${n}-${i}`,
        sourceId: t,
        targetId: n,
        type: i
      });
    }
  }));
}
function Ac(e, t, n) {
  const i = e.model, o = [], s = (_, O) => o.push({ id: _, apply: O }), a = new Set(i.boundedContexts.flatMap((_) => (_.useCases ?? []).map((O) => O.id))), d = new Set(i.boundedContexts.flatMap((_) => (_.queryServices ?? []).map((O) => O.id))), c = new Set(i.boundedContexts.flatMap((_) => (_.domainEvents ?? []).map((O) => O.id))), u = new Set(i.boundedContexts.flatMap((_) => (_.applicationEvents ?? []).map((O) => O.id))), g = /* @__PURE__ */ new Set([
    ...(i.aggregates ?? []).map((_) => _.id),
    ...i.boundedContexts.flatMap((_) => (_.domainServices ?? []).map((O) => O.id))
  ]), h = new Set(i.externalSystems.flatMap((_) => (_.useCases ?? []).map((O) => O.id))), f = (_) => (i.aiAgents ?? []).some((O) => O.id === _), y = (_) => (i.actors ?? []).some((O) => O.id === _), k = (_) => i.externalSystems.some((O) => O.id === _), l = (_) => i.boundedContexts.some((O) => O.id === _), r = (_) => (i.aggregates ?? []).some((O) => O.id === _), m = new Set((i.uis ?? []).map((_) => _.id)), w = new Set((i.uiApps ?? []).map((_) => _.id)), M = new Set((i.pages ?? []).map((_) => _.id));
  {
    const _ = m.has(t) ? t : m.has(n) ? n : null, O = _ === t ? n : t;
    _ && l(O) && s("ui-composition", () => {
      e.command({ kind: "set-ui-context", id: _, boundedContextId: O });
    });
  }
  {
    const _ = m.has(t) ? t : m.has(n) ? n : null, O = _ === t ? n : t;
    _ && y(O) && s("ui-serving", () => {
      e.command({ kind: "add-ui-serving", id: _, targetId: O });
    });
  }
  {
    const _ = m.has(t) ? t : m.has(n) ? n : null, O = _ === t ? n : t;
    _ && (w.has(O) || M.has(O)) && s("ui-assignment", () => {
      e.command({ kind: "add-ui-assignment", id: _, targetId: O });
    });
  }
  if (a.has(t) && a.has(n) && t !== n && s("uc-call", () => {
    (i.useCaseCalls ?? []).some((_) => _.sourceId === t && _.targetId === n) || e.command({ kind: "add-use-case-call", sourceId: t, targetId: n });
  }), a.has(t) && d.has(n) && s("query-call", () => {
    (i.queryCalls ?? []).some((_) => _.sourceId === t && _.targetId === n) || e.command({ kind: "add-query-call", sourceId: t, targetId: n });
  }), a.has(t) && r(n) && s("aggregate-call", () => {
    (i.aggregateCalls ?? []).some((_) => _.sourceId === t && _.targetId === n) || e.command({ kind: "add-aggregate-call", sourceId: t, targetId: n });
  }), (g.has(t) && c.has(n) || a.has(t) && u.has(n)) && s("emission", () => {
    (i.emissions ?? []).some((_) => _.sourceId === t && _.domainEventId === n) || e.command({ kind: "add-emission", sourceId: t, targetId: n });
  }), (c.has(t) || u.has(t)) && a.has(n) && s("flow-triggers", () => ft(e, "context-map", t, n, void 0, void 0, "__classic")), (c.has(t) || u.has(t)) && (l(n) || i.boundedContexts.some((_) => (_.readModels ?? []).some((O) => O.id === n))) && s("flow-materializes", () => ft(e, "context-map", t, n, void 0, void 0, "__classic")), y(t) && ((a.has(n) || d.has(n) || r(n) || f(n)) && s("actor-use", () => ft(e, "context-map", t, n, void 0, void 0, "__classic")), k(n) && s("ext-dep", () => {
    (i.actorExternalDependencies ?? []).some((_) => _.actorId === t && _.externalSystemId === n) || e.command({ kind: "add-actor-external", sourceId: t, targetId: n });
  })), k(t) && (k(n) && t !== n && s("ext-dep", () => {
    (i.externalSystemDependencies ?? []).some((_) => _.sourceId === t && _.targetId === n) || e.command({ kind: "add-external-dependency", sourceId: t, targetId: n });
  }), ((i.apis ?? []).some((_) => _.id === n) || (i.proxyApis ?? []).some((_) => _.id === n)) && s("ext-dep", () => {
    (i.externalSystemDependencies ?? []).some((_) => _.sourceId === t && _.targetId === n) || e.command({ kind: "add-external-dependency", sourceId: t, targetId: n });
  }), a.has(n) && s("external-call", () => {
    (i.externalCalls ?? []).some((_) => _.externalSystemId === t && _.useCaseId === n) || e.command({ kind: "add-external-call", sourceId: t, targetId: n });
  })), a.has(t) && h.has(n) && s("external-uc-call", () => {
    (i.externalUseCaseCalls ?? []).some((_) => _.sourceId === t && _.targetId === n) || e.command({ kind: "add-external-uc-call", sourceId: t, targetId: n });
  }), f(t)) {
    const _ = new Set(i.externalSystems.flatMap((B) => (B.mcpServers ?? []).map((H) => H.id))), O = new Set((i.apis ?? []).flatMap((B) => B.operations.map((H) => H.id)));
    (a.has(n) || h.has(n) || _.has(n) || (i.mcpGateways ?? []).some((B) => B.id === n) || O.has(n) || (i.apis ?? []).some((B) => B.id === n) || (i.proxyApis ?? []).some((B) => B.id === n) || d.has(n)) && s("agent-tool", () => ft(e, "context-map", t, n, void 0, void 0, "__classic")), f(n) && n !== t && s("agent-delegate", () => {
      (i.agentDelegations ?? []).some((B) => B.agentId === t && B.delegateAgentId === n) || e.command({ kind: "add-agent-delegate", sourceId: t, targetId: n });
    }), (i.rags ?? []).some((B) => B.id === n) && s("agent-rag", () => {
      (i.agentRags ?? []).some((B) => B.agentId === t && B.ragId === n) || e.command({ kind: "add-agent-rag", sourceId: t, targetId: n });
    });
  }
  ((_) => (i.identityProviders ?? []).some((O) => O.id === _))(n) && (l(t) || (i.etlFlows ?? []).some((_) => _.id === t) || (i.uiApps ?? []).some((_) => _.id === t)) && s("idp-trust", () => ft(e, "context-map", t, n, void 0, void 0, "__classic"));
  const R = /* @__PURE__ */ new Set();
  return o.filter((_) => R.has(_.id) ? !1 : (R.add(_.id), !0)).map((_) => {
    const O = Ec.find((B) => B.id === _.id);
    return { ..._, label: O.label, hint: O.hint };
  });
}
function ft(e, t, n, i, o, s, a) {
  var b, x, N;
  const d = new Set((e.model.notes ?? []).map((v) => v.id));
  if (d.has(n) || d.has(i)) {
    const v = d.has(n) ? n : i, I = d.has(n) ? i : n;
    if (v === I) return;
    const P = I.startsWith("edge:") ? I.slice(5) : I.replace(/^(tgt:|flow:)/, "");
    e.command({ kind: "note-attach", id: v, targetId: P });
    return;
  }
  if (e.activeJourneyId && (t === "context-map" || t === "integrations")) {
    const v = (e.model.journeys ?? []).find((I) => I.id === e.activeJourneyId);
    if (v && n !== i) {
      const I = v.legs ?? [], P = I.filter((D) => D.targetId === n).map((D) => D.id);
      let S = I.length + 1;
      for (; I.some((D) => D.id === `leg-${S}`); ) S++;
      e.command({
        kind: "journey-add-leg",
        journeyId: v.id,
        itemId: `leg-${S}`,
        sourceId: n,
        targetId: i,
        dependsOnStepIds: P
      });
      return;
    }
  }
  if (t === "distribution") {
    const v = e.sceneFor("distribution"), I = e.model.modules ?? [], S = ((D) => {
      for (let L = D; L; ) {
        if (I.some((W) => W.id === L)) return L;
        const U = v.nodes.find((W) => W.id === L);
        L = U ? U.ownerId ?? U.parentId : void 0;
      }
      return null;
    })(i);
    if (S && S !== n && (e.model.services ?? []).some((D) => D.id === n)) {
      e.command({ kind: "add-service-module", serviceId: n, id: S });
      return;
    }
    if ((e.model.services ?? []).some((D) => D.id === n)) {
      const D = e.model.boundedContexts.find((W) => W.id === i), L = D ? I.filter((W) => W.boundedContextId === D.id) : [], U = L.find((W) => W.main) ?? L[0];
      if (U) {
        e.command({ kind: "add-service-module", serviceId: n, id: U.id });
        return;
      }
    }
    if (S && S !== n && !I.some((L) => L.id === n) && !e.model.boundedContexts.some((L) => L.id === n)) {
      e.command({ kind: "add-module-element", id: S, elementId: n });
      return;
    }
  }
  if (t === "integrations") {
    ft(e, "context-map", n, i, o, s, a);
    return;
  }
  if (t === "eventstorming") {
    const v = (P) => (e.model.customCodes ?? []).some((S) => S.id === P), I = v(i) ? { stepId: n, ccId: i } : v(n) ? { stepId: i, ccId: n } : null;
    if (I) {
      const P = e.owningUseCaseOf(I.stepId);
      P && e.command({
        kind: "set-use-case-step-custom-code",
        useCaseId: P.id,
        id: I.stepId,
        targetId: I.ccId
      });
      return;
    }
    return;
  }
  if (t === "workflows") {
    const v = (W) => (e.model.actors ?? []).some((J) => J.id === W);
    if (v(n) !== v(i)) {
      const W = v(n) ? n : i, J = v(n) ? i : n, ce = e.owningWorkflowOf(J);
      if (ce) {
        e.command({ kind: "set-workflow-step-role", workflowId: ce.id, id: J, targetId: W });
        return;
      }
    }
    const I = (W) => (e.model.pages ?? []).some((J) => J.id === W);
    if (I(n) !== I(i)) {
      const W = I(n) ? n : i, J = I(n) ? i : n, ce = e.owningWorkflowOf(J);
      if (ce) {
        e.command({ kind: "set-workflow-step-form", workflowId: ce.id, id: J, targetId: W });
        return;
      }
    }
    const P = e.model.workflowGateways ?? [], S = (W) => P.some((J) => J.id === W);
    if (S(n) || S(i) || (e.model.workflows ?? []).some((W) => W.id === i)) {
      if (n === i) return;
      e.command({ kind: "add-workflow-link", sourceId: n, targetId: i });
      return;
    }
    const D = e.owningWorkflowOf(n), L = e.owningWorkflowOf(i);
    if (!D || D !== L || n === i) return;
    const U = D.steps.find((W) => W.id === i);
    if (((U == null ? void 0 : U.dependsOnStepIds) ?? []).includes(n)) return;
    e.command({
      kind: "add-workflow-dependency",
      workflowId: D.id,
      id: i,
      dependsOnStepId: n
    });
    return;
  }
  if (t === "ui") {
    const v = e.model.pages ?? [], I = e.model.uiApps ?? [], P = (X) => I.some((Z) => Z.id === X), S = (X) => v.some((Z) => Z.id === X), D = (X) => (e.model.uis ?? []).some((Z) => Z.id === X);
    if (D(n) !== D(i)) {
      const X = D(n) ? n : i, Z = X === n ? i : n;
      if (P(Z) || S(Z)) {
        e.command({ kind: "add-ui-assignment", id: X, targetId: Z });
        return;
      }
      if ((e.model.actors ?? []).some((_e) => _e.id === Z)) {
        e.command({ kind: "add-ui-serving", id: X, targetId: Z });
        return;
      }
    }
    const L = (X) => (e.model.customCodes ?? []).some((Z) => Z.id === X);
    if (L(n) || L(i)) {
      const X = L(n) ? n : i, Z = L(n) ? i : n;
      if (L(Z)) return;
      if (S(Z)) {
        e.command({ kind: "set-page-custom-code", id: Z, targetId: X });
        return;
      }
      e.command({ kind: "add-custom-code-use", id: X, elementId: Z });
      return;
    }
    const U = e.model.buttonGroups ?? [], W = (X) => U.some((Z) => Z.id === X);
    if ((a === "toolbar" || a === "bottom") && W(n) && S(i)) {
      e.command({ kind: "add-page-bar-group", pageId: i, id: n, bar: a });
      return;
    }
    if (W(n) && W(i) && n !== i) {
      e.command({ kind: "add-group-subgroup", id: i, targetId: n });
      return;
    }
    const J = /^gbtn:([^:]+):(.+)$/.exec(n);
    if (J) {
      e.model.boundedContexts.some((Z) => (Z.useCases ?? []).some((_e) => _e.id === i)) ? e.command({ kind: "set-group-button-target", id: J[1], itemId: J[2], useCaseId: i }) : e.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
      return;
    }
    if (a === "home" && P(n) && (S(i) || P(i))) {
      if (i === n) return;
      e.command(
        S(i) ? { kind: "set-app-home-page", appId: n, pageId: i } : { kind: "set-app-home-page", appId: n, pageId: null, toAppId: i }
      );
      return;
    }
    if (a === "header" && P(n) && S(i)) {
      e.command({ kind: "set-app-header-page", appId: n, pageId: i });
      return;
    }
    if ((a === "crud-detail" || a === "crud-create") && S(n) && (S(i) || P(i)) && i !== n) {
      const X = a === "crud-detail" ? "set-crud-detail" : "set-crud-create";
      e.command(
        S(i) ? { kind: X, pageId: n, targetId: i, toAppId: null } : { kind: X, pageId: n, targetId: null, toAppId: i }
      );
      return;
    }
    if (a === "viewmodel" && S(n)) {
      (e.model.models ?? []).some((X) => X.id === i) ? e.command({ kind: "set-page-model", pageId: n, modelId: i }) : e.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
      return;
    }
    if ((a === "view" || a === "edit") && P(n) && S(i)) {
      e.command({
        kind: a === "view" ? "set-app-view-page" : "set-app-edit-page",
        appId: n,
        pageId: i
      });
      return;
    }
    if (a) return;
    const ce = (X) => /^wizrow:([^:]+):(.+)$/.exec(X), Se = ce(n) ?? ce(i);
    if (Se) {
      const X = ce(n) ? i : n;
      S(X) && X !== Se[1] && e.command({ kind: "set-wizard-step-page", pageId: Se[1], itemId: Se[2], targetId: X });
      return;
    }
    const K = v.find((X) => X.id === i && X.type === "WIZARD");
    if (S(n) && K && n !== K.id) {
      (K.wizardSteps ?? []).some((X) => X.pageId === n) || e.command({ kind: "add-page-wizard-step", pageId: K.id, targetId: n });
      return;
    }
    if (S(n) && P(i)) {
      const X = v.find((_e) => _e.id === n), Z = I.find((_e) => _e.id === i);
      if (Z.type === "MASTER_DETAIL" && !Z.headerPageId) {
        e.command({ kind: "set-app-header-page", appId: i, pageId: n }), e.emit("modux-notice", {
          message: `${X.name} es la cabecera de ${Z.name} — las siguientes páginas serán pestañas`
        });
        return;
      }
      e.command({
        kind: "add-menu-item",
        appId: i,
        label: X.name,
        pageId: n,
        itemId: e.newMenuItemId(X.name)
      });
      return;
    }
    const Q = e.model.identityProviders ?? [], fe = (X) => Q.some((Z) => Z.id === X);
    if (fe(n) || fe(i)) {
      const X = fe(n) ? n : i, Z = fe(n) ? i : n;
      P(Z) ? e.command({ kind: "set-identity-provider", id: Z, targetId: X }) : e.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
      return;
    }
    const Ae = (X) => (e.model.models ?? []).some((Z) => Z.id === X);
    if (Ae(n) || Ae(i)) {
      const X = Ae(n) ? n : i, Z = Ae(n) ? i : n;
      if (S(Z)) {
        e.command({ kind: "set-page-model", pageId: Z, modelId: X });
        return;
      }
      if (P(Z)) {
        e.command({ kind: "set-app-model", appId: Z, modelId: X });
        return;
      }
      return;
    }
    const Ie = Ce(n);
    if (Ie != null && Ie.itemId && ((b = Ce(i)) != null && b.itemId || P(i))) {
      const X = Ce(i), Z = e.menuEntryIn(Ie.appId, Ie.itemId);
      if (!Z) return;
      if (X != null && X.itemId) {
        const _e = e.menuEntryIn(X.appId, X.itemId);
        if (!_e) return;
        const Ne = (kt) => (kt ?? []).some((Zt) => Zt.id === X.itemId || Ne(Zt.children));
        if (Ie.appId === X.appId && (X.itemId === Ie.itemId || Ne(Z.entry.children)))
          return;
        const We = e.nodeClientRect(i), Le = We && s !== void 0 ? (s - We.top) / Math.max(1, We.height) : 0.5, nt = Le < 0.3 ? "before" : Le > 0.7 ? "after" : "nest";
        if (nt === "nest")
          e.command({
            kind: "move-menu-item",
            appId: Ie.appId,
            toAppId: X.appId,
            itemId: Ie.itemId,
            parentId: X.itemId
          });
        else {
          const kt = nt === "before" ? X.itemId : _e.beforeId ?? void 0;
          if (Ie.appId === X.appId && _e.parentId === Z.parentId && kt === Ie.itemId) return;
          e.command({
            kind: "move-menu-item",
            appId: Ie.appId,
            toAppId: X.appId,
            itemId: Ie.itemId,
            parentId: _e.parentId ?? void 0,
            beforeItemId: kt
          });
        }
        return;
      }
      if (Ie.appId === i && !Z.parentId) return;
      e.command({
        kind: "move-menu-item",
        appId: Ie.appId,
        toAppId: i,
        itemId: Ie.itemId
      });
      return;
    }
    const Ee = Ce(n) ?? Ce(i);
    if (Ee) {
      const X = Ce(n) ? n : i, Z = Ce(n) ? i : n;
      if (((x = e.sceneFor("ui").nodes.find((Le) => Le.id === X)) == null ? void 0 : x.kind) === "menu-group") {
        e.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
        return;
      }
      const _e = e.model.boundedContexts.some(
        (Le) => (Le.useCases ?? []).some((nt) => nt.id === Z)
      ), Ne = (e.model.aggregates ?? []).some((Le) => Le.id === Z), We = e.model.boundedContexts.flatMap((Le) => Le.queryServices ?? []).find((Le) => (Le.operations ?? []).some((nt) => nt.id === Z));
      S(Z) ? e.command({ kind: "set-menu-page", pageId: Z, ...Ee }) : P(Z) && Z !== Ee.appId ? e.command({ kind: "set-menu-app", toAppId: Z, ...Ee }) : _e ? e.command({ kind: "set-menu-use-case", useCaseId: Z, ...Ee }) : Ne ? e.command({ kind: "set-menu-aggregate", aggregateId: Z, ...Ee }) : We && e.command({
        kind: "set-menu-query-operation",
        queryServiceId: We.id,
        queryOperationId: Z,
        ...Ee
      });
      return;
    }
    if ((e.model.actors ?? []).some((X) => X.id === n) && P(i)) {
      (e.model.actorAppUses ?? []).some((X) => X.actorId === n && X.appId === i) || e.command({ kind: "add-actor-app", actorId: n, appId: i });
      return;
    }
    const be = S(n) ? { pageId: n, other: i } : S(i) ? { pageId: i, other: n } : null;
    if (be) {
      const X = new Set(
        e.model.boundedContexts.flatMap((Ne) => (Ne.useCases ?? []).map((We) => We.id))
      ), Z = new Set(
        e.model.boundedContexts.flatMap((Ne) => (Ne.queryServices ?? []).map((We) => We.id))
      ), _e = v.find((Ne) => Ne.id === be.pageId);
      X.has(be.other) ? (_e.buttons ?? []).some((Ne) => Ne.useCaseId === be.other) || e.command({ kind: "add-page-button", pageId: be.pageId, useCaseId: be.other }) : Z.has(be.other) && e.command({ kind: "set-page-listing", pageId: be.pageId, queryServiceId: be.other });
    }
    return;
  }
  if (t === "mappings") {
    const v = e.model.models ?? [], I = Qn(n), P = Qn(i), S = e.model.transformations ?? [], D = e.model.customCodes ?? [], L = (K) => D.some((Q) => Q.id === K);
    if (L(n) && S.some((K) => K.id === i)) {
      e.command({ kind: "set-transformation-custom-code", id: i, targetId: n });
      return;
    }
    if (L(i) && S.some((K) => K.id === n)) {
      e.command({ kind: "set-transformation-custom-code", id: n, targetId: i });
      return;
    }
    if (L(n)) {
      const K = (P == null ? void 0 : P.modelId) ?? (v.some((Q) => Q.id === i) ? i : null);
      if (K) {
        const Q = (e.model.modelMappings ?? []).filter(
          (fe) => fe.sourceModelId === K || fe.targetModelId === K
        );
        Q.length === 1 ? e.command({ kind: "set-mapping-custom-code", id: Q[0].id, targetId: n }) : e.emit("modux-notice", {
          message: Q.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
        });
        return;
      }
      return;
    }
    if (S.some((K) => K.id === i)) {
      if (P || S.some((Q) => Q.id === n)) return;
      const K = I ? { modelId: I.modelId, fieldId: I.fieldId } : v.some((Q) => Q.id === n) ? { modelId: n } : null;
      K && e.command({ kind: "add-transformation-input", id: i, ...K });
      return;
    }
    if (S.some((K) => K.id === n)) {
      const K = P ? { modelId: P.modelId, fieldId: P.fieldId } : v.some((Q) => Q.id === i) ? { modelId: i } : null;
      K && e.command({ kind: "set-transformation-output", id: n, ...K });
      return;
    }
    if (I && P) {
      if (I.modelId === P.modelId) {
        e.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
        return;
      }
      let K = (e.model.modelMappings ?? []).find(
        (Q) => Q.sourceModelId === I.modelId && Q.targetModelId === P.modelId
      );
      if (!K) {
        const Q = v.find((be) => be.id === I.modelId), fe = v.find((be) => be.id === P.modelId);
        if (!Q || !fe) return;
        const Ae = (be) => be.replace(/[^a-zA-Z0-9]/g, ""), Ie = new Set((e.model.modelMappings ?? []).map((be) => be.id));
        let Ee = `mapping-${re(Q.name)}-${re(fe.name)}`;
        for (let be = 2; Ie.has(Ee); be++) Ee = `mapping-${re(Q.name)}-${re(fe.name)}-${be}`;
        e.command(
          { kind: "add-model-mapping", id: Ee, name: `${Ae(Q.name)}2${Ae(fe.name)}`, sourceId: Q.id, targetId: fe.id },
          !1
        ), K = { id: Ee, name: "", sourceModelId: Q.id, targetModelId: fe.id };
      }
      e.command({
        kind: "add-model-mapping-rule",
        id: K.id,
        sourceId: I.fieldId,
        targetId: P.fieldId
      });
      return;
    }
    if (I && v.some((K) => K.id === i) && i !== I.modelId) {
      e.command({ kind: "move-model-field", modelId: I.modelId, fieldId: I.fieldId, targetId: i });
      return;
    }
    if (!v.some((K) => K.id === n) || !v.some((K) => K.id === i) || n === i || (e.model.modelMappings ?? []).some((K) => K.sourceModelId === n && K.targetModelId === i))
      return;
    const U = v.find((K) => K.id === n), W = v.find((K) => K.id === i), J = (K) => K.replace(/[^a-zA-Z0-9]/g, ""), ce = new Set((e.model.modelMappings ?? []).map((K) => K.id));
    let Se = `mapping-${re(U.name)}-${re(W.name)}`;
    for (let K = 2; ce.has(Se); K++) Se = `mapping-${re(U.name)}-${re(W.name)}-${K}`;
    e.command({
      kind: "add-model-mapping",
      id: Se,
      name: `${J(U.name)}2${J(W.name)}`,
      sourceId: n,
      targetId: i
    });
    return;
  }
  if (t !== "context-map") return;
  if (a !== "__classic" && a === void 0) {
    const v = Ac(e, n, i);
    if (v.length === 1) {
      v[0].apply();
      return;
    }
    if (v.length > 1) {
      e.openConnectPicker({
        x: o ?? 0,
        y: s ?? 0,
        options: [...v, ...Sn(e, n, i)]
      });
      return;
    }
  }
  const c = /^apiop:(.+)@(.+)$/.exec(n);
  if (c) {
    const [, v, I] = c, P = (e.model.proxyApis ?? []).find((W) => W.id === I), S = (P == null ? void 0 : P.targetApiId) ?? ((N = (e.model.apiImplementations ?? []).find(
      (W) => W.boundedContextId === I && (e.model.apis ?? []).some(
        (J) => J.id === W.apiId && J.operations.some((ce) => ce.id === v)
      )
    )) == null ? void 0 : N.apiId);
    if (!S) return;
    if (new Set(
      e.model.boundedContexts.flatMap((W) => (W.useCases ?? []).map((J) => J.id))
    ).has(i)) {
      e.command({
        kind: "set-api-operation-implementation",
        apiId: S,
        operationId: v,
        boundedContextId: I,
        targetUseCaseId: i
      });
      return;
    }
    if (!(P != null && P.targetApiId)) return;
    let L = null;
    if (i === P.targetApiId)
      L = P.targetApiId;
    else {
      const W = /^apiimpl:(.+)@(.+)$/.exec(i);
      W && W[1] === P.targetApiId ? L = W[2] : e.model.boundedContexts.some((J) => J.id === i) && (e.model.apiImplementations ?? []).some(
        (J) => J.apiId === P.targetApiId && J.boundedContextId === i
      ) && (L = i);
    }
    if (!L) return;
    (e.model.proxyOperationRoutes ?? []).some(
      (W) => W.proxyId === P.id && W.operationId === v && W.targetSiteId === L
    ) || e.command({
      kind: "add-proxy-operation-route",
      proxyId: P.id,
      operationId: v,
      targetSiteId: L
    });
    return;
  }
  const u = new Set((e.model.aiAgents ?? []).map((v) => v.id));
  if (u.has(n)) {
    if (new Set(
      e.model.boundedContexts.flatMap((L) => (L.useCases ?? []).map((U) => U.id))
    ).has(i)) {
      (e.model.agentUses ?? []).some(
        (U) => U.agentId === n && U.useCaseId === i
      ) || e.command({ kind: "add-agent-use", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((L) => (L.useCases ?? []).map((U) => U.id))
    ).has(i)) {
      (e.model.agentExternalUses ?? []).some(
        (U) => U.agentId === n && U.externalUseCaseId === i
      ) || e.command({ kind: "add-agent-external-use", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((L) => (L.mcpServers ?? []).map((U) => U.id))
    ).has(i)) {
      (e.model.agentMcpUses ?? []).some(
        (U) => U.agentId === n && U.mcpServerId === i
      ) || e.command({ kind: "add-agent-mcp", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.mcpGateways ?? []).some((L) => L.id === i)) {
      (e.model.agentGatewayUses ?? []).some(
        (U) => U.agentId === n && U.gatewayId === i
      ) || e.command({ kind: "add-agent-gateway", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      (e.model.apis ?? []).flatMap((L) => L.operations.map((U) => U.id))
    ).has(i)) {
      (e.model.agentApiOpUses ?? []).some(
        (U) => U.agentId === n && U.apiOperationId === i
      ) || e.command({ kind: "add-agent-api-operation", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.apis ?? []).some((L) => L.id === i) || (e.model.proxyApis ?? []).some((L) => L.id === i)) {
      (e.model.agentApiUses ?? []).some(
        (U) => U.agentId === n && U.apiId === i
      ) || e.command({ kind: "add-agent-api", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.boundedContexts.flatMap((L) => (L.queryServices ?? []).map((U) => U.id))
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
    (e.model.rags ?? []).some((L) => L.id === i) && ((e.model.agentRags ?? []).some(
      (U) => U.agentId === n && U.ragId === i
    ) || e.command({ kind: "add-agent-rag", sourceId: n, targetId: i }));
    return;
  }
  if ((e.model.mcpGateways ?? []).some((v) => v.id === n)) {
    const v = (e.model.mcpGateways ?? []).find((S) => S.id === n), I = e.model.externalSystems.some((S) => (S.mcpServers ?? []).some((D) => D.id === i)) || (e.model.apis ?? []).some((S) => S.id === i) || (e.model.apis ?? []).some((S) => S.operations.some((D) => D.id === i)) || e.model.boundedContexts.some((S) => (S.useCases ?? []).some((D) => D.id === i)) || (e.model.rags ?? []).some((S) => S.id === i), P = [
      ...v.mcpServerIds ?? [],
      ...v.apiIds ?? [],
      ...v.apiOperationIds ?? [],
      ...v.useCaseIds ?? [],
      ...v.ragIds ?? []
    ].includes(i);
    I && !P && e.command({ kind: "add-gateway-exposure", sourceId: n, targetId: i });
    return;
  }
  if ((e.model.mcpGateways ?? []).some((v) => v.id === i)) return;
  const g = (e.model.rags ?? []).find((v) => v.id === n);
  if (g) {
    if (new Set(
      e.model.boundedContexts.flatMap((P) => (P.readModels ?? []).map((S) => S.id))
    ).has(i) && !(g.sourceReadModelIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((P) => (P.tables ?? []).map((S) => S.id))
    ).has(i) && !(g.sourceExternalTableIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    if (((e.model.apis ?? []).some((P) => P.id === i) || (e.model.proxyApis ?? []).some((P) => P.id === i)) && !(g.sourceApiIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    if (e.model.externalSystems.some((P) => P.id === i) && !(g.sourceExternalSystemIds ?? []).includes(i)) {
      e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
      return;
    }
    e.model.boundedContexts.some((P) => P.id === i) && !(g.sourceBoundedContextIds ?? []).includes(i) && e.command({ kind: "add-rag-source", sourceId: n, targetId: i });
    return;
  }
  if ((e.model.rags ?? []).some((v) => v.id === i)) return;
  if ((e.model.workflows ?? []).some((v) => v.id === n)) {
    const v = (e.model.workflows ?? []).find((S) => S.id === n), I = (e.model.workflows ?? []).find(
      (S) => S.id === i && S.id !== n
    );
    if (I) {
      const S = v.onCompletionEventName || `${v.name.replace(/\s+/g, "")}Completado`;
      I.triggerEvent !== S && e.command({ kind: "set-workflow-trigger", id: i, triggerEvent: S });
      return;
    }
    const P = e.model.boundedContexts.flatMap((S) => S.useCases ?? []).find((S) => S.id === i);
    if (P && !(v.steps ?? []).some((D) => D.targetUseCaseId === i)) {
      const D = `wfs-${re(P.name)}`;
      let L = D;
      for (let U = 2; (v.steps ?? []).some((W) => W.id === L); U++)
        L = `${D}-${U}`;
      e.command({
        kind: "add-workflow-step",
        workflowId: n,
        id: L,
        name: P.name,
        targetUseCaseId: i
      });
    }
    return;
  }
  if ((e.model.workflows ?? []).some((v) => v.id === i)) {
    const v = e.model.boundedContexts.flatMap((S) => S.domainEvents ?? []).find((S) => S.id === n), I = e.model.boundedContexts.flatMap((S) => S.applicationEvents ?? []).find((S) => S.id === n), P = v ?? I;
    if (P) {
      const S = (e.model.emissions ?? []).find((W) => W.domainEventId === n), D = new Set((e.model.aggregates ?? []).map((W) => W.id)), L = new Set(
        e.model.boundedContexts.flatMap((W) => (W.domainServices ?? []).map((J) => J.id))
      ), U = new Set(
        e.model.boundedContexts.flatMap((W) => (W.useCases ?? []).map((J) => J.id))
      );
      e.command({
        kind: "set-workflow-trigger",
        id: i,
        triggerEvent: P.name,
        triggerAggregateId: S && D.has(S.sourceId) ? S.sourceId : void 0,
        triggerDomainServiceId: S && L.has(S.sourceId) ? S.sourceId : void 0,
        triggerUseCaseId: S && U.has(S.sourceId) ? S.sourceId : void 0
      });
    }
    return;
  }
  if ((e.model.proxyApis ?? []).some((v) => v.id === n)) {
    const v = (e.model.proxyApis ?? []).find((I) => I.id === n);
    if ((e.model.apis ?? []).some((I) => I.id === i)) {
      v.targetApiId !== i && e.command({ kind: "set-proxy-target", id: n, targetId: i });
      return;
    }
    if (e.model.boundedContexts.some((I) => I.id === i)) {
      if (!v.targetApiId) return;
      (e.model.apiImplementations ?? []).some(
        (P) => P.apiId === v.targetApiId && P.boundedContextId === i
      ) || e.command({ kind: "add-api-implementation", apiId: v.targetApiId, boundedContextId: i });
      return;
    }
    e.model.externalSystems.some((I) => I.id === i) && v.publishedByExternalSystemId !== i && e.command({ kind: "set-api-publisher", id: n, targetId: i });
    return;
  }
  if ((e.model.apis ?? []).some((v) => v.id === n)) {
    if (e.model.externalSystems.some((v) => v.id === i)) {
      (e.model.apis ?? []).find((I) => I.id === n).publishedByExternalSystemId !== i && e.command({ kind: "set-api-publisher", id: n, targetId: i });
      return;
    }
    e.model.boundedContexts.some((v) => v.id === i) && ((e.model.apiImplementations ?? []).some(
      (I) => I.apiId === n && I.boundedContextId === i
    ) || e.command({ kind: "add-api-implementation", apiId: n, boundedContextId: i }));
    return;
  }
  const h = new Set((e.model.actors ?? []).map((v) => v.id));
  if (u.has(i)) {
    if ((/* @__PURE__ */ new Set([
      ...e.model.boundedContexts.flatMap((I) => (I.domainEvents ?? []).map((P) => P.id)),
      ...e.model.boundedContexts.flatMap((I) => (I.applicationEvents ?? []).map((P) => P.id))
    ])).has(n)) {
      (e.model.agentTriggers ?? []).some(
        (P) => P.eventId === n && P.agentId === i
      ) || e.command({ kind: "add-agent-trigger", sourceId: n, targetId: i });
      return;
    }
    if (!h.has(n)) return;
  }
  if (h.has(n)) {
    const v = new Set(
      e.model.boundedContexts.flatMap((P) => (P.useCases ?? []).map((S) => S.id))
    ), I = new Set(
      e.model.boundedContexts.flatMap((P) => (P.queryServices ?? []).map((S) => S.id))
    );
    if (v.has(i) || I.has(i)) {
      (e.model.actorUses ?? []).some(
        (S) => S.actorId === n && S.targetId === i
      ) || e.command({ kind: "add-actor-use", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.aggregates ?? []).some((P) => P.id === i)) {
      e.command({ kind: "add-actor-crud", sourceId: n, targetId: i });
      return;
    }
    if (e.model.externalSystems.some((P) => P.id === i)) {
      (e.model.actorExternalDependencies ?? []).some(
        (S) => S.actorId === n && S.externalSystemId === i
      ) || e.command({ kind: "add-actor-external", sourceId: n, targetId: i });
      return;
    }
    if ((e.model.aiAgents ?? []).some((P) => P.id === i)) {
      (e.model.actorAgentUses ?? []).some(
        (S) => S.actorId === n && S.agentId === i
      ) || e.command({ kind: "add-actor-agent", sourceId: n, targetId: i });
      return;
    }
    return;
  }
  const f = e.owningApiOf(n);
  if (f) {
    if (new Set(
      e.model.boundedContexts.flatMap((I) => (I.useCases ?? []).map((P) => P.id))
    ).has(i)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: f.id,
        id: n,
        targetUseCaseId: i
      });
      return;
    }
    if (e.model.boundedContexts.some((I) => I.id === i)) {
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
  const y = (v) => (e.model.notifications ?? []).find((I) => I.id === v);
  if (y(n) || y(i)) {
    const v = y(n) ?? y(i), I = y(n) ? i : n;
    if (e.model.boundedContexts.some(
      (S) => [...S.domainEvents ?? [], ...S.applicationEvents ?? []].some((D) => D.id === I)
    )) {
      v.eventId !== I && e.command({ kind: "set-notification-event", id: v.id, targetId: I });
      return;
    }
    if ((e.model.actors ?? []).some((S) => S.id === I)) {
      (v.recipientRoleIds ?? []).includes(I) || e.command({ kind: "add-notification-recipient", id: v.id, roleId: I });
      return;
    }
    e.emit("modux-notice", {
      message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
    });
    return;
  }
  const k = (v) => (e.model.documents ?? []).find((I) => I.id === v);
  if (k(n) || k(i)) {
    const v = k(n) ?? k(i), I = k(n) ? i : n;
    if ((e.model.models ?? []).find((L) => L.id === I)) {
      e.command({ kind: "set-document-model", id: v.id, modelId: I });
      return;
    }
    const S = e.model.boundedContexts.flatMap((L) => L.queryServices ?? []).find((L) => L.id === I), D = e.model.boundedContexts.flatMap((L) => (L.queryServices ?? []).flatMap((U) => (U.operations ?? []).map((W) => ({ op: W, qs: U })))).find(({ op: L }) => L.id === I);
    if (S || D) {
      e.command({
        kind: "set-document-query",
        id: v.id,
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
  const l = e.model.identityProviders ?? [], r = (v) => l.find((I) => I.id === v);
  if (r(n) || r(i)) {
    const v = r(n) ?? r(i), I = r(n) ? i : n;
    if (r(n) && e.model.externalSystems.some((D) => D.id === I)) {
      v.publishedByExternalSystemId !== I && e.command({ kind: "set-idp-publisher", id: v.id, targetId: I });
      return;
    }
    const P = e.model.boundedContexts.some((D) => D.id === I), S = (e.model.etlFlows ?? []).some((D) => D.id === I);
    if (P || S) {
      e.command({ kind: "set-identity-provider", id: I, targetId: v.id });
      return;
    }
    e.emit("modux-notice", {
      message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
    });
    return;
  }
  const m = e.model.etlFlows ?? [], w = (v) => m.find((I) => I.id === v);
  if (w(n) || w(i)) {
    const v = w(n) ?? w(i), I = w(n) ? i : n, P = !w(n), S = new Set(e.model.externalSystems.flatMap((Q) => (Q.tables ?? []).map((fe) => fe.id))), D = /* @__PURE__ */ new Set([
      ...(e.model.apis ?? []).map((Q) => Q.id),
      ...(e.model.proxyApis ?? []).map((Q) => Q.id)
    ]), L = (e.model.apis ?? []).find((Q) => Q.operations.some((fe) => fe.id === I)), U = new Set(
      e.model.boundedContexts.flatMap((Q) => [
        ...(Q.domainEvents ?? []).map((fe) => fe.id),
        ...(Q.applicationEvents ?? []).map((fe) => fe.id)
      ])
    );
    let W = null, J = {};
    if (S.has(I) ? (W = P ? "SOURCE_PULL" : "WRITE_DB", J = { externalTableId: I }) : L ? (W = P ? "SOURCE_PULL" : "WRITE_API", J = { apiId: L.id, operationId: I }) : D.has(I) ? (W = P ? "SOURCE_PULL" : "WRITE_API", J = { apiId: I }) : U.has(I) && (W = P ? "SOURCE_CONSUMER" : "WRITE_EVENT", J = { targetId: I }), !W) {
      e.emit("modux-notice", {
        message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
      });
      return;
    }
    if ((v.steps ?? []).some(
      (Q) => Q.type === W && (Q.externalTableId ?? Q.operationId ?? Q.apiId ?? Q.eventId) === (J.externalTableId ?? J.operationId ?? J.apiId ?? J.targetId)
    )) return;
    const Se = new Set((v.steps ?? []).map((Q) => Q.id));
    let K = (v.steps ?? []).length + 1;
    for (; Se.has(`ets-${K}`); ) K++;
    e.command({ kind: "add-etl-step", etlFlowId: v.id, id: `ets-${K}`, stepType: W, ...J });
    return;
  }
  const M = e.model.externalSystems.flatMap((v) => v.useCases ?? []).find((v) => v.id === n), C = e.model.externalSystems.flatMap((v) => v.tables ?? []).find((v) => v.id === n);
  if (M || C) {
    const v = (M ?? C).name, I = M ? { externalUseCaseId: n } : { externalTableId: n }, P = (L) => M ? L.sourceExternalUseCaseId === n : L.sourceExternalTableId === n, S = e.model.boundedContexts.flatMap((L) => L.readModels ?? []).find((L) => L.id === i);
    if (S) {
      (e.model.projections ?? []).some(
        (U) => P(U) && U.readModelId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${re(v)}-${re(S.name)}`,
        name: `${S.name}Projection`,
        ...I,
        targetId: i
      });
      return;
    }
    const D = e.model.boundedContexts.find((L) => L.id === i);
    if (D) {
      (e.model.projections ?? []).some(
        (U) => P(U) && U.boundedContextId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${re(v)}-${re(D.name)}`,
        name: `${v}ViewProjection`,
        ...I,
        boundedContextId: i,
        readModelName: `${v}View`
      });
      return;
    }
    return;
  }
  const R = (e.model.aggregates ?? []).find((v) => v.id === n);
  if (R) {
    const v = e.model.boundedContexts.flatMap((P) => P.readModels ?? []).find((P) => P.id === i);
    if (v) {
      (e.model.projections ?? []).some(
        (S) => S.sourceAggregateId === n && S.readModelId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${re(R.name)}-${re(v.name)}`,
        name: `${v.name}Projection`,
        aggregateId: n,
        targetId: i
      });
      return;
    }
    const I = e.model.boundedContexts.find((P) => P.id === i);
    if (I) {
      (e.model.projections ?? []).some(
        (S) => S.sourceAggregateId === n && S.boundedContextId === i
      ) || e.command({
        kind: "add-projection",
        id: `proj-${re(R.name)}-${re(I.name)}`,
        name: `${R.name}ViewProjection`,
        aggregateId: n,
        boundedContextId: i,
        readModelName: `${R.name}View`
      });
      return;
    }
  }
  const _ = new Set(
    e.model.boundedContexts.flatMap((v) => (v.domainEvents ?? []).map((I) => I.id))
  ), O = /* @__PURE__ */ new Set([
    ...(e.model.aggregates ?? []).map((v) => v.id),
    ...e.model.boundedContexts.flatMap((v) => (v.domainServices ?? []).map((I) => I.id))
  ]), B = new Set(
    e.model.boundedContexts.flatMap((v) => (v.applicationEvents ?? []).map((I) => I.id))
  ), H = new Set(e.model.boundedContexts.flatMap((v) => (v.useCases ?? []).map((I) => I.id))), se = new Set(
    e.model.boundedContexts.flatMap((v) => (v.queryServices ?? []).map((I) => I.id))
  );
  if (H.has(n) && se.has(i)) {
    (e.model.queryCalls ?? []).some(
      (I) => I.sourceId === n && I.targetId === i
    ) || e.command({ kind: "add-query-call", sourceId: n, targetId: i });
    return;
  }
  const $ = new Set(
    e.model.externalSystems.flatMap((v) => (v.useCases ?? []).map((I) => I.id))
  );
  if (H.has(n) && $.has(i)) {
    (e.model.externalUseCaseCalls ?? []).some(
      (I) => I.sourceId === n && I.targetId === i
    ) || e.command({ kind: "add-external-uc-call", sourceId: n, targetId: i });
    return;
  }
  if (H.has(n) && H.has(i) && n !== i) {
    (e.model.useCaseCalls ?? []).some(
      (I) => I.sourceId === n && I.targetId === i
    ) || e.command({ kind: "add-use-case-call", sourceId: n, targetId: i });
    return;
  }
  const G = e.model.boundedContexts.flatMap((v) => v.scheduledTriggers ?? []).find((v) => v.id === n);
  if (G && H.has(i)) {
    G.useCaseId !== i && e.command({ kind: "set-scheduled-trigger-target", id: n, targetUseCaseId: i });
    return;
  }
  if (H.has(n) && (e.model.aggregates ?? []).some((v) => v.id === i)) {
    (e.model.aggregateCalls ?? []).some(
      (I) => I.sourceId === n && I.targetId === i
    ) || e.command({ kind: "add-aggregate-call", sourceId: n, targetId: i });
    return;
  }
  if (O.has(n) && _.has(i) || H.has(n) && B.has(i)) {
    (e.model.emissions ?? []).some(
      (I) => I.sourceId === n && I.domainEventId === i
    ) || e.command({ kind: "add-emission", sourceId: n, targetId: i });
    return;
  }
  if (_.has(n) || B.has(n)) {
    const v = B.has(n), I = e.model.boundedContexts.flatMap((K) => (v ? K.applicationEvents : K.domainEvents) ?? []).find((K) => K.id === n), P = e.model.boundedContexts.flatMap((K) => (K.useCases ?? []).map((Q) => ({ u: Q, boundedContext: K }))).find(({ u: K }) => K.id === i), S = e.model.boundedContexts.flatMap((K) => (K.readModels ?? []).map((Q) => ({ rm: Q, boundedContext: K }))).find(({ rm: K }) => K.id === i), D = e.model.boundedContexts.find((K) => K.id === i) ?? (S == null ? void 0 : S.boundedContext) ?? (P == null ? void 0 : P.boundedContext);
    if (!I || !D) return;
    const L = new Set((e.model.aggregates ?? []).map((K) => K.id)), U = new Set(
      e.model.boundedContexts.flatMap((K) => (K.domainServices ?? []).map((Q) => Q.id))
    ), W = (e.model.emissions ?? []).find(
      (K) => K.domainEventId === n && (v ? H.has(K.sourceId) : L.has(K.sourceId) || U.has(K.sourceId))
    );
    if (!W) {
      e.emit("modux-notice", {
        message: v ? `Declara primero qué caso de uso publica ${I.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${I.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
        kind: "info"
      });
      return;
    }
    const J = !v && L.has(W.sourceId);
    if (P) {
      if (e.model.flows.some(
        (Q) => Q.archetype === "TRIGGERS" && Q.triggerEvent === I.name && Q.targetUseCaseId === P.u.id
      )) return;
      e.command({
        kind: "add-flow",
        id: `flow-${re(I.name)}-${re(P.u.name)}`,
        name: P.u.name,
        archetype: "TRIGGERS",
        triggerAggregateId: J ? W.sourceId : "",
        triggerDomainServiceId: !v && !J ? W.sourceId : void 0,
        triggerUseCaseId: v ? W.sourceId : void 0,
        triggerEvent: I.name,
        targetId: D.id,
        targetUseCaseId: P.u.id
      });
      return;
    }
    const ce = (S == null ? void 0 : S.rm.name) ?? `${I.name}View`;
    if (e.model.flows.some(
      (K) => K.archetype === "MATERIALIZES" && K.triggerEvent === I.name && K.targetId === D.id && K.readModelName === ce
    )) return;
    e.command({
      kind: "add-flow",
      id: `flow-${re(I.name)}-${re(ce)}`,
      name: ce,
      archetype: "MATERIALIZES",
      triggerAggregateId: J ? W.sourceId : "",
      triggerDomainServiceId: !v && !J ? W.sourceId : void 0,
      triggerUseCaseId: v ? W.sourceId : void 0,
      triggerEvent: I.name,
      targetId: D.id,
      readModelName: ce
    });
    return;
  }
  const Y = /* @__PURE__ */ new Set([
    ...O,
    ...H,
    ...se,
    ...e.model.boundedContexts.flatMap((v) => (v.readModels ?? []).map((I) => I.id))
  ]);
  if (Y.has(n) || Y.has(i) || _.has(i) || B.has(i))
    return;
  const A = new Set(e.model.externalSystems.map((v) => v.id));
  if (A.has(n)) {
    if (new Set(
      e.model.boundedContexts.flatMap((D) => (D.useCases ?? []).map((L) => L.id))
    ).has(i)) {
      (e.model.externalCalls ?? []).some(
        (L) => L.externalSystemId === n && L.useCaseId === i
      ) || e.command({ kind: "add-external-call", sourceId: n, targetId: i });
      return;
    }
    if (A.has(i) && i !== n) {
      e.openExtDepPicker({ sourceId: n, targetId: i, x: o ?? 0, y: s ?? 0 });
      return;
    }
    const I = (e.model.apis ?? []).find(
      (D) => D.operations.some((L) => L.id === i)
    ), P = /^apiop:(.+)@(.+)$/.exec(i), S = I ? { operationId: i, siteId: I.id } : P ? { operationId: P[1], siteId: P[2] } : null;
    if (S) {
      (e.model.externalOperationUses ?? []).some(
        (L) => L.externalSystemId === n && L.operationId === S.operationId && L.siteId === S.siteId
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
        (L) => L.sourceId === n && L.targetId === i
      ) || e.command({ kind: "add-external-dependency", sourceId: n, targetId: i });
      return;
    }
    return;
  }
  if (A.has(i) || h.has(i)) return;
  const j = (v) => e.model.boundedContexts.some((I) => I.id === v);
  if (!e.activeJourneyId && j(n) && j(i) && n !== i) {
    const v = e.model.relations.find(
      (I) => I.sourceId === n && I.targetId === i && I.declared
    );
    e.openRelationPicker({
      sourceId: n,
      targetId: i,
      mode: v ? "edit" : "create",
      x: o ?? 0,
      y: s ?? 0
    });
    return;
  }
  if (!e.activeJourneyId && n !== i && a === void 0) {
    e.openConnectPicker({
      x: o ?? 0,
      y: s ?? 0,
      options: Sn(e, n, i)
    });
    return;
  }
}
function Mc(e, t, n, i, o) {
  var s;
  if (o === "ui-serving") {
    const a = /^uisrv:(.+)->(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "remove-ui-serving", id: a[1], targetId: a[2] }));
    return;
  }
  if (o === "ui-assignment") {
    const a = /^uiasg:(.+)->(.+)$/.exec(i);
    a && (e.clearSelection(), e.command({ kind: "remove-ui-assignment", id: a[1], targetId: a[2] }));
    return;
  }
  if (o === "ui" && n === "node") {
    e.clearSelection(), e.command({ kind: "remove-ui", id: i });
    return;
  }
  if (o === "archimate-relation") {
    const a = i.replace(/^archi:/, "");
    e.clearSelection(), e.command({ kind: "remove-archimate-relation", id: a });
    return;
  }
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
        const d = Ce(a[1]);
        d && e.command({ kind: "set-menu-page", pageId: null, ...d });
      } else if (a = /^menuapp:(.+)->[^>]+$/.exec(i)) {
        const d = Ce(a[1]);
        d && e.command({ kind: "set-menu-app", toAppId: null, ...d });
      } else if (a = /^menuuc:(.+)->[^>]+$/.exec(i)) {
        const d = Ce(a[1]);
        d && e.command({ kind: "set-menu-use-case", useCaseId: null, ...d });
      } else if (a = /^menuagg:(.+)->[^>]+$/.exec(i)) {
        const d = Ce(a[1]);
        d && e.command({ kind: "set-menu-aggregate", aggregateId: null, ...d });
      } else if (a = /^menuqop:(.+)->[^>]+$/.exec(i)) {
        const d = Ce(a[1]);
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
      const a = Ce(i);
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
    const a = Qn(i);
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
    const [, d, c] = a, u = (s = (e.model.apis ?? []).find(
      (g) => g.operations.some((h) => h.id === d)
    )) == null ? void 0 : s.id;
    if (!u) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation-implementation", apiId: u, operationId: d, boundedContextId: c });
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
    const [, d, c, u] = a, g = /^apiimpl:.+@(.+)$/.exec(u), h = g ? g[1] : u;
    e.clearSelection(), e.command({ kind: "remove-proxy-operation-route", proxyId: c, operationId: d, targetSiteId: h });
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
    const a = e.sceneFor("distribution"), d = (c) => {
      const u = a.nodes.find((g) => g.id === c);
      return u ? u.ownerId ?? u.parentId : void 0;
    };
    for (let c = d(i); c; ) {
      if ((e.model.modules ?? []).some((u) => u.id === c)) {
        e.clearSelection(), e.command({ kind: "remove-module-element", id: c, elementId: i });
        return;
      }
      c = d(c);
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
const Pc = [
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
], io = [
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
  { type: "ui", label: "UI", symbol: "interface", color: "#0ea5e9", group: "UI" },
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
var Tc = Object.defineProperty, Oc = Object.getOwnPropertyDescriptor, ie = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Oc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && Tc(t, n, o), o;
};
const Zn = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Rc = Object.keys(Zn);
function Lt(e, t, n) {
  const i = n.x - n.w / 2, o = n.x + n.w / 2, s = n.y - n.h / 2, a = n.y + n.h / 2;
  let d = 0, c = 1;
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
      if (y > c) return !1;
      y > d && (d = y);
    } else {
      if (y < d) return !1;
      y < c && (c = y);
    }
  }
  return c - d > 0.02;
}
function Nc(e, t, n = 28) {
  const i = new Map(e.nodes.map((u) => [u.id, u])), o = (u) => {
    var h;
    const g = /* @__PURE__ */ new Set();
    for (let f = u; f; f = (h = i.get(f)) == null ? void 0 : h.parentId) g.add(f);
    return g;
  }, s = e.nodes.filter((u) => u.kind !== "area"), a = (u) => u.parentId ? Math.min(n, 6) : n, d = /* @__PURE__ */ new Map(), c = (u, g, h) => {
    const f = a(h), y = { x: h.x, y: h.y, w: h.w + 2 * f, h: h.h + 2 * f }, k = h.w / 2 + f * 1.5, l = h.h / 2 + f * 1.5, r = { x: h.x - k, y: h.y - l }, m = { x: h.x + k, y: h.y - l }, w = { x: h.x - k, y: h.y + l }, M = { x: h.x + k, y: h.y + l }, C = [];
    for (const R of [r, m, w, M])
      !Lt(u, R, y) && !Lt(R, g, y) && C.push([R]);
    for (const [R, _] of [
      [r, m],
      [m, r],
      [m, M],
      [M, m],
      [M, w],
      [w, M],
      [w, r],
      [r, w]
    ])
      !Lt(u, R, y) && !Lt(_, g, y) && C.push([R, _]);
    return C;
  };
  for (const u of e.edges) {
    if (t[u.id]) continue;
    const g = i.get(u.sourceId), h = i.get(u.targetId);
    if (!g || !h) continue;
    const f = /* @__PURE__ */ new Set([...o(g.id), ...o(h.id)]), y = [
      { x: g.x, y: g.y },
      { x: h.x, y: h.y }
    ];
    for (let k = 0; k < 12; k++) {
      let l = !1;
      e: for (let r = 0; r < y.length - 1; r++)
        for (const m of s) {
          if (f.has(m.id)) continue;
          const w = a(m), M = { x: m.x, y: m.y, w: m.w + 2 * w, h: m.h + 2 * w };
          if (!Lt(y[r], y[r + 1], M)) continue;
          const C = c(y[r], y[r + 1], m);
          if (!C.length) continue;
          const R = (O) => s.some(
            (B) => B !== m && !f.has(B.id) && Math.abs(O.x - B.x) < B.w / 2 + a(B) / 2 && Math.abs(O.y - B.y) < B.h / 2 + a(B) / 2
          ), _ = (O) => {
            let B = 0;
            const H = [y[r], ...O, y[r + 1]];
            for (let se = 0; se < H.length - 1; se++)
              B += Math.hypot(H[se + 1].x - H[se].x, H[se + 1].y - H[se].y);
            return B + (O.some(R) ? 1e4 : 0);
          };
          C.sort((O, B) => _(O) - _(B)), y.splice(r + 1, 0, ...C[0]), l = !0;
          break e;
        }
      if (!l) break;
    }
    y.length > 2 && d.set(
      u.id,
      y.slice(1, -1).map((k) => ({ x: Math.round(k.x), y: Math.round(k.y) }))
    );
  }
  return d;
}
function Lc(e, t) {
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
    case "ui":
      return { elementType: "ui", id: e };
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
function Dc(e, t) {
  const n = (e ?? []).find((i) => i.steps.some((o) => o.id === t));
  return n ? { elementType: "process", id: n.id } : null;
}
let te = class extends Ge {
  constructor() {
    super(...arguments), this.model = {
      boundedContexts: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !0, this._yugo = !0, this.repositories = [], this.dark = !1, this._pendingIds = /* @__PURE__ */ new Set(), this._paletteOpenedForBlank = !1, this._repoPicker = null, this._wfStepPicker = null, this._branchCondEditor = null, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newBoundedContextId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._connectPicker = null, this._activeViewId = "", this._activeJourneyId = "", this._newJourneyName = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
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
          this._helpOpen && (this._helpOpen = !1), this._connectPicker && (this._connectPicker = null);
          break;
      }
    }, this._gestureEffects = 0, this.onMenuSlotRequested = (e) => {
      const { id: t, appId: n, beforeId: i, nestRowId: o } = e.detail, s = Ce(t);
      if (!(s != null && s.itemId)) return;
      const a = this.menuEntryIn(s.appId, s.itemId);
      if (!a) return;
      const d = (c, u) => (c ?? []).some((g) => g.id === u || d(g.children, u));
      if (o) {
        const c = Ce(o);
        if (!(c != null && c.itemId) || c.itemId === s.itemId || s.appId === c.appId && d(a.entry.children, c.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: s.appId,
          toAppId: c.appId,
          itemId: s.itemId,
          parentId: c.itemId
        });
        return;
      }
      if (i) {
        const c = Ce(i);
        if (!(c != null && c.itemId) || c.itemId === s.itemId) return;
        const u = this.menuEntryIn(c.appId, c.itemId);
        if (!u || s.appId === c.appId && d(a.entry.children, c.itemId) || s.appId === c.appId && u.parentId === a.parentId && a.beforeId === c.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: s.appId,
          toAppId: c.appId,
          itemId: s.itemId,
          parentId: u.parentId ?? void 0,
          beforeItemId: c.itemId
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
      const d = JSON.parse(JSON.stringify(a.node)), { ops: c } = this.rebuildComponentOps(n, d, o ?? void 0, s);
      for (const u of c) this.command(u, !1);
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
    return rt(this.layout[this.layoutKey(e)]);
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
      const o = rt(n[i]);
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
      const o = rt(n[i]);
      if (o.flat) continue;
      const s = so(
        this.model,
        i.startsWith("distribution") ? "distribution" : "unified"
      ), a = /* @__PURE__ */ new Map(), d = (h, f = 0) => {
        if (f > 12) return o.nodes[h] ?? null;
        const y = a.get(h);
        if (y) return y;
        const k = o.nodes[h], l = s.get(h);
        if (!l)
          return k && a.set(h, k), k ?? null;
        if (!k) return null;
        const r = d(l, f + 1), m = r ? { x: r.x + k.x, y: r.y + k.y } : k;
        return a.set(h, m), m;
      }, c = {};
      for (const h of Object.keys(o.nodes))
        c[h] = d(h) ?? o.nodes[h];
      const u = new Set(s.values()), g = { ...o.sizes ?? {} };
      for (const h of Object.keys(g)) u.has(h) && delete g[h];
      n[i] = { ...o, nodes: c, sizes: g, flat: !0 }, t = !0;
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
    const e = rt(this.layout["context-map"]), t = ["context-map@detail", "context-map@operations", "context-map@distribution"];
    if (!(e.detail !== void 0 || t.some((g) => this.layout[g])) || !this.model.boundedContexts.length && !this.model.externalSystems.length) return;
    const i = { ...this.layout }, o = (g) => rt(i[g]), s = e.detail ?? "contexts", a = s === "detail" && i["context-map@detail"] ? o("context-map@detail") : s === "operations" && i["context-map@operations"] ? o("context-map@operations") : e, d = {
      nodes: { ...a.nodes },
      edges: { ...a.edges },
      sizes: { ...a.sizes ?? {} }
    };
    for (const g of ["context-map", "context-map@detail", "context-map@operations"]) {
      const h = o(g);
      for (const [f, y] of Object.entries(h.nodes)) f in d.nodes || (d.nodes[f] = y);
      for (const [f, y] of Object.entries(h.sizes ?? {})) f in d.sizes || (d.sizes[f] = y);
    }
    const c = /* @__PURE__ */ new Set();
    if (s === "contexts" || s === "distribution")
      for (const g of e.collapsed ?? []) c.add(g);
    else {
      const g = new Set(a.collapsed ?? []);
      for (const h of this.model.boundedContexts) c.add(h.id);
      for (const h of this.model.externalSystems) c.add(h.id);
      if (s === "operations") {
        for (const h of this.model.apis ?? []) c.add(h.id);
        for (const h of this.model.proxyApis ?? []) c.add(h.id);
        for (const h of this.model.apiImplementations ?? [])
          c.add(`apiimpl:${h.apiId}@${h.boundedContextId}`);
      }
      for (const h of g) c.delete(h);
    }
    i["context-map"] = { nodes: d.nodes, edges: d.edges, sizes: d.sizes, expanded: [...c] };
    const u = i["context-map@distribution"];
    if (u && !i.distribution) {
      const g = rt(u);
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
      const c = /^(?:[a-z-]+:)?(.+?)->(.+)$/i.exec(d);
      return !!c && o.has(c[1]) && o.has(c[2]);
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
    const t = this.viewLayout(e), n = this.sceneFor(e).nodes.filter((a) => !a.parentId && a.kind !== "area"), i = pa(n), o = [...i.keys()].map((a) => ({
      kind: "move-node",
      view: e,
      id: a,
      pos: t.nodes[a] ?? null
    })), s = { ...t.nodes };
    for (const [a, d] of i) {
      const c = n.find((g) => g.id === a), u = t.nodes[a] ?? { x: c.x, y: c.y };
      s[a] = {
        x: Math.round(u.x + (d.x - c.x)),
        y: Math.round(u.y + (d.y - c.y))
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
    const n = new Set(e.nodes.map((f) => f.id)), i = Bi(t), o = /* @__PURE__ */ new Set(), s = [];
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
    const c = new Set(s.map((f) => f.id)), u = ji(t).map((f) => f.map((y) => `journeyleg:${t.id}:${y}`).filter((y) => c.has(y))).filter((f) => f.length > 0).filter((f, y, k) => k.findIndex((l) => l.join("|") === f.join("|")) === y);
    return {
      nodes: e.nodes.map((f) => a.has(f.id) ? f : { ...f, dim: !0 }),
      edges: [...e.edges.map((f) => ({ ...f, dim: !0 })), ...s],
      journeyRuns: u
    };
  }
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const n = Nc(e, t);
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
    const c = this.sceneFor(o), u = c.nodes.find((h) => h.id === t);
    if (u != null && u.parentId) {
      const h = c.nodes.find((f) => f.id === u.parentId);
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
    const { id: t, targetId: n, x: i, y: o } = e.detail, s = this.model.externalSystems.find((l) => l.id === t);
    if (s) {
      const l = n ? this.model.externalSystems.find((O) => O.id === n) : null;
      if (n && !l) return;
      for (let O = l; O; ) {
        if (O.id === t) return;
        const B = O.parentExternalSystemId;
        O = B ? this.model.externalSystems.find((H) => H.id === B) ?? null : null;
      }
      const r = (l == null ? void 0 : l.id) ?? null;
      if ((s.parentExternalSystemId ?? null) === r) return;
      const m = this._view, w = this.viewLayout(m), M = this.sceneFor(m), C = r ? M.nodes.find((O) => O.id === r) : void 0, R = C ? { x: i - C.x, y: o - C.y } : { x: i, y: o }, _ = r ? (this.model.externalSystemDependencies ?? []).filter(
        (O) => O.sourceId === t && O.targetId === r || O.sourceId === r && O.targetId === t
      ) : [];
      this.pushUndoEntry([
        { kind: "set-external-system-parent", id: t, parentId: s.parentExternalSystemId ?? null },
        ..._.map((O) => ({
          kind: "add-external-dependency",
          sourceId: O.sourceId,
          targetId: O.targetId,
          ...O.type === "CQRS" ? { type: "CQRS" } : {}
        })),
        { kind: "move-node", view: m, id: t, pos: w.nodes[t] ?? null }
      ]), this.command({ kind: "set-external-system-parent", id: t, parentId: r }, !1), this.writeViewLayout(m, { ...w, nodes: { ...w.nodes, [t]: R } });
      return;
    }
    const a = (this.model.apis ?? []).find((l) => l.id === t) ?? (this.model.proxyApis ?? []).find((l) => l.id === t);
    if (!a || n && !this.model.externalSystems.some((l) => l.id === n)) return;
    const d = a.publishedByExternalSystemId ?? "", c = n ?? "";
    if (c === d) return;
    const u = this._view, g = this.viewLayout(u), h = this.sceneFor(u), f = c ? h.nodes.find((l) => l.id === c) : void 0, y = f ? { x: i - f.x, y: o - f.y } : { x: i, y: o }, k = [
      { kind: "set-api-publisher", id: t, targetId: d },
      { kind: "move-node", view: u, id: t, pos: g.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: c }, !1), this.writeViewLayout(u, { ...g, nodes: { ...g.nodes, [t]: y } }), this.pushUndoEntry(k);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: n, x: i, y: o } = e.detail, s = (this.model.apis ?? []).find((k) => k.id === t), a = this.model.externalSystems.find((k) => k.id === n);
    if (!s || !a || (this.model.proxyApis ?? []).some(
      (k) => k.targetApiId === t && k.publishedByExternalSystemId === n
    )) return;
    const c = `proxy-${re(s.name)}-${re(a.name)}`;
    if ((this.model.proxyApis ?? []).some((k) => k.id === c)) return;
    const u = this._view, g = this.viewLayout(u), f = this.sceneFor(u).nodes.find((k) => k.id === n);
    this.command(
      {
        kind: "add-proxy-api",
        id: c,
        name: `${s.name}@${a.name}`,
        targetId: t,
        boundedContextId: n
      },
      !1
    );
    const y = [{ kind: "remove-proxy-api", id: c }];
    f && (y.push({ kind: "move-node", view: u, id: c, pos: g.nodes[c] ?? null }), this.writeViewLayout(u, {
      ...g,
      nodes: { ...g.nodes, [c]: { x: i - f.x, y: o - f.y } }
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
    var d, c, u;
    const t = e.target, n = (d = t.files) == null ? void 0 : d[0];
    if (t.value = "", !n) return;
    const i = await n.text(), o = this.selectedApiId(), s = o ? null : ((c = this.model.externalSystems.find((g) => g.id === this._selectedId)) == null ? void 0 : c.id) ?? null, a = o || s ? null : ((u = this.model.boundedContexts.find((g) => g.id === this._selectedId)) == null ? void 0 : u.id) ?? null;
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
    for (const { id: d, x: c, y: u } of t) {
      a.push({ kind: "move-node", view: n, id: d, pos: i.nodes[d] ?? null });
      let g = { x: c, y: u };
      const h = o.nodes.find((f) => f.id === d);
      if (h != null && h.parentId) {
        const f = o.nodes.find((y) => y.id === h.parentId);
        f && (g = { x: c - f.x, y: u - f.y });
      }
      s[d] = g;
    }
    if (this.writeViewLayout(n, { ...i, nodes: s }), n === "processes")
      for (const { id: d } of t) {
        const c = this.stepReorderCommand(d);
        if (c) {
          const u = this.inverseOf(c);
          u && a.unshift(...u), this.command(c, !1);
        }
      }
    this.pushUndoEntry(a);
  }
  onNodeResized(e) {
    var y;
    const { id: t, x: n, y: i, w: o, h: s } = e.detail, a = this._view, d = this.viewLayout(a), c = this.sceneFor(a), u = c.nodes.find((k) => k.id === t), g = u != null && u.parentId ? c.nodes.find((k) => k.id === u.parentId) : void 0, h = g ? [] : c.nodes.filter((k) => k.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((y = d.sizes) == null ? void 0 : y[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: d.nodes[t] ?? null },
      ...h.map((k) => ({ kind: "move-node", view: a, id: k.id, pos: d.nodes[k.id] ?? null }))
    ]);
    const f = {
      ...d.nodes,
      [t]: g ? { x: n - g.x, y: i - g.y } : { x: n, y: i }
    };
    for (const k of h) f[k.id] = { x: k.x - n, y: k.y - i };
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
    const n = ui(this.model, this.viewLayout("processes").nodes), i = new Map(n.nodes.map((a) => [a.id, a.x])), o = [...t.steps].sort(
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
    return Sc(this.gestureHost(), e);
  }
  applyConnection(e, t, n, i, o) {
    const s = this._gestureEffects, a = () => !!(this._connectPicker || this._relationPicker || this._extDepPicker || this._deletePicker), d = a();
    if (ft(this.gestureHost(), this._view, e, t, n, i, o), this._gestureEffects === s && a() === d && o === void 0 && !this._activeJourneyId && e !== t && ["context-map", "aggregates", "integrations"].includes(this._view)) {
      const c = this.sceneFor(this._view), u = (g) => c.nodes.some((h) => h.id === g);
      u(e) && u(t) && (this._connectPicker = {
        x: n ?? this.clientWidth / 2,
        y: i ?? 120,
        options: Sn(this.gestureHost(), e, t)
      });
    }
  }
  performDelete(e, t, n) {
    Mc(this.gestureHost(), this._view, e, t, n);
  }
  /** The thin surface the extracted gesture/undo vocabulary works against. */
  gestureHost() {
    return {
      model: this.model,
      activeJourneyId: this._activeJourneyId || void 0,
      command: (e, t) => {
        this._gestureEffects++, this.command(e, t);
      },
      emit: (e, t) => {
        this._gestureEffects++, this.emit(e, t);
      },
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
      openRelationPicker: (e) => {
        this._relationPicker = {
          ...e,
          x: e.x || this.clientWidth / 2,
          y: e.y || 120
        };
      },
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
    const t = Bi(e);
    return {
      name: e.name,
      legs: (e.legs ?? []).map((n) => ({
        id: n.id,
        sourceId: n.sourceId,
        targetId: n.targetId,
        num: t.get(n.id) ?? "",
        label: n.label
      })),
      runs: ji(e)
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
            const o = Ce(n);
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
      const t = `${this._view}@view:${e}`, n = rt(this.layout[t]);
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
    ), d = new Set(a.map((y) => y.id)), c = (this.model.uiApps ?? []).filter((y) => t.has(y.id)), u = /* @__PURE__ */ new Set(), g = (y) => {
      for (const k of y ?? [])
        k.pageId && u.add(k.pageId), g(k.children);
    };
    c.forEach((y) => g(y.menuItems));
    const h = (this.model.pages ?? []).filter(
      (y) => t.has(y.id) || u.has(y.id)
    ), f = new Set(c.map((y) => y.id));
    return {
      ...this.model,
      uiApps: c,
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
    if (e.detail.elementType === "edge" && e.detail.kind === "archimate-relation") {
      const i = e.detail.id.replace(/^archi:/, ""), o = (this.model.archimateRelations ?? []).find((s) => s.id === i);
      o && (this._connectPicker = {
        x: e.detail.x ?? this.clientWidth / 2,
        y: e.detail.y ?? 120,
        options: Sn(this.gestureHost(), o.sourceId, o.targetId).map((s) => ({
          ...s,
          label: s.id === `archimate:${o.type}` ? `● ${s.label}` : s.label,
          apply: () => {
            this.command({
              kind: "set-archimate-relation-type",
              id: i,
              type: s.id.replace(/^archimate:/, "")
            });
          }
        }))
      });
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
    const t = e.detail.kind === "process-step" ? Dc(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : Lc(e.detail.id, e.detail.kind);
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
      var c;
      const d = s ?? [];
      for (let u = 0; u < d.length; u++)
        d[u].id === t && (i = { node: d[u], parentId: a, beforeId: ((c = d[u + 1]) == null ? void 0 : c.id) ?? null }), o(d[u].children, d[u].id);
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
      for (let k = 2; a.has(y) || a.has(`${y}-tab-1`); k++) y = `${f}-${k}`;
      return a.add(y), y;
    }, c = [], u = (h, f) => {
      const y = d(h);
      c.push({ kind: "add-page-component", pageId: e, componentId: y, componentKind: h.kind, parentComponentId: f }), h.kind === "tabLayout" && (c.push({ kind: "remove-page-component", pageId: e, componentId: `${y}-tab-1` }), c.push({ kind: "remove-page-component", pageId: e, componentId: `${y}-tab-2` })), c.push({
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
      for (const k of h.children ?? []) u(k, y);
      return y;
    }, g = u(t, n);
    return i && c.push({
      kind: "move-page-component",
      pageId: e,
      componentId: g,
      parentComponentId: n ?? null,
      beforeComponentId: i
    }), { ops: c, rootId: g };
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
      var c;
      const d = s ?? [];
      for (let u = 0; u < d.length; u++)
        d[u].id === t && (i = { entry: d[u], parentId: a, beforeId: ((c = d[u + 1]) == null ? void 0 : c.id) ?? null }), o(d[u].children, d[u].id ?? null);
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
      const a = n.find((c) => (this.model.aggregates ?? []).some((u) => u.id === c));
      if (a) return a;
      const d = n.find((c) => this.model.boundedContexts.some((u) => u.id === c));
      return ((o = (this.model.aggregates ?? []).find((c) => c.boundedContextId === d)) == null ? void 0 : o.id) ?? null;
    }
    if (e === "read-model") {
      const a = n.find((c) => (this.model.aggregates ?? []).some((u) => u.id === c));
      if (a) return a;
      const d = n.find((c) => this.model.boundedContexts.some((u) => u.id === c));
      return ((s = (this.model.aggregates ?? []).find((c) => c.boundedContextId === d)) == null ? void 0 : s.id) ?? null;
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
        (a) => this.model.boundedContexts.some((d) => (d.useCases ?? []).some((c) => c.id === a))
      ) ?? null;
    if (e === "api-operation") {
      for (const a of n) {
        if ((this.model.apis ?? []).some((u) => u.id === a)) return a;
        const d = /^apiimpl:(.+)@(.+)$/.exec(a);
        if (d && (this.model.apis ?? []).some((u) => u.id === d[1])) return d[1];
        const c = (this.model.proxyApis ?? []).find((u) => u.id === a);
        if (c != null && c.targetApiId) return c.targetApiId;
      }
      return null;
    }
    return e === "api" ? n.find((a) => this.model.externalSystems.some((d) => d.id === a)) ?? n.find((a) => this.model.boundedContexts.some((d) => d.id === a)) ?? null : null;
  }
  createFromPalette(e, t, n, i = null) {
    var y, k;
    const o = io.find((l) => l.type === e);
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
      const l = n ? /^cmp:([^:]+):(.+)$/.exec(n) : null, r = l ? l[1] : n && (this.model.pages ?? []).some((M) => M.id === n) ? n : null;
      if (!r) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: m, name: w } = this.uniquePaletteName("Custom code", "cc-");
      this.command({ kind: "add-custom-code", id: m, name: w }, !1), l ? (this.command({ kind: "set-page-component-custom-code", pageId: r, componentId: l[2], targetId: m }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: r, targetId: m }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const l = e.slice(4), r = n ? /^cmp:([^:]+):(.+)$/.exec(n) : null, m = r ? r[1] : n && (this.model.pages ?? []).some((_) => _.id === n) ? n : null;
      if (!m) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let w = r ? r[2] : void 0, M = null;
      if (l === "tab") {
        let _ = null, O = w ? this.componentIn(m, w) : null;
        for (; O; ) {
          if (O.node.kind === "tabLayout") {
            _ = O.node.id;
            break;
          }
          O = O.parentId ? this.componentIn(m, O.parentId) : null;
        }
        if (!_) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const B = this.componentIn(m, _).node, H = this.newComponentId("tab"), se = `Pestaña ${(B.children ?? []).filter(($) => $.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: m, componentId: H, componentKind: "tab", parentComponentId: _ }, !1), this.command({ kind: "set-page-component", pageId: m, componentId: H, title: se }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: m, componentId: H }]);
        return;
      }
      if (i != null && i.componentId && i.pos !== "into") {
        const _ = this.componentIn(m, i.componentId);
        _ && _.node.kind === "tab" ? w = _.node.id : _ && (w = _.parentId ?? void 0, M = i.pos === "before" ? i.componentId : _.beforeId);
      } else if (w) {
        const _ = ((y = this.componentIn(m, w)) == null ? void 0 : y.node) ?? null;
        (_ == null ? void 0 : _.kind) === "tabLayout" && (_.children ?? [])[0] && (w = (_.children ?? [])[0].id);
      }
      const C = this.newComponentId(l), R = {
        kind: "add-page-component",
        pageId: m,
        componentId: C,
        componentKind: l,
        parentComponentId: w
      };
      if (!M) {
        this.command(R);
        return;
      }
      this.command(R, !1), this.command(
        { kind: "move-page-component", pageId: m, componentId: C, parentComponentId: w ?? null, beforeComponentId: M },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: m, componentId: C }]);
      return;
    }
    const s = this._view, a = this.sceneFor(s), d = (l, r) => {
      this.purgeNodeGeometry(l);
      const m = this.viewLayout(s), w = r ? a.nodes.find((C) => C.id === r) : void 0, M = w ? { x: Math.round(t.x - w.x), y: Math.round(t.y - w.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...m, nodes: { ...m.nodes, [l]: M } }), { kind: "move-node", view: s, id: l, pos: null };
    }, c = (l, r, m) => {
      const w = this.inverseOf(l) ?? [];
      this.command(l, !1);
      const M = d(r, m);
      this.pushUndoEntry([...w, M]);
    };
    if (!o.child) {
      const l = {
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
        ui: "",
        "identity-provider": "idp-",
        transformation: "tf-",
        "custom-code": "cc-",
        "button-group": "bg-",
        service: "svc-"
      }, { id: r, name: m } = this.uniquePaletteName(o.label, l[e] ?? ""), w = e === "boundedContext" ? { kind: "add-boundedContext", id: r, name: m, subdomainType: "SUPPORTING" } : e === "note" ? { kind: "add-note", id: r, name: m } : e === "area" ? { kind: "add-area", id: r, name: m } : e === "actor" ? { kind: "add-actor", id: r, name: m } : e === "external-system" ? { kind: "add-external-system", id: r, name: m } : e === "ai-agent" ? { kind: "add-ai-agent", id: r, name: m } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: r, name: m, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: r, name: m } : e === "rag" ? { kind: "add-rag", id: r, name: m } : e === "api" ? { kind: "add-api", id: r, name: m } : e === "proxy-api" ? { kind: "add-proxy-api", id: r, name: m } : e === "ui" ? { kind: "add-ui", id: r, name: m } : e === "ui-app" ? { kind: "create-ui-app", id: r, name: m } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: r, name: m, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: r, name: m, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: r, name: m, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: r, name: m } : e === "transformation" ? { kind: "add-transformation", id: r, name: m } : e === "custom-code" ? { kind: "add-custom-code", id: r, name: m } : e === "button-group" ? { kind: "add-button-group", id: r, name: m } : e === "identity-provider" ? { kind: "add-identity-provider", id: r, name: m } : e === "service" ? { kind: "add-service", id: r, name: m } : {
        kind: "add-workflow",
        id: r,
        name: m,
        completionEventName: `${m.replace(/\s+/g, "")}Completado`
      };
      if (w.kind === "add-ui") {
        const C = this.dropChain(n).find((R) => this.model.boundedContexts.some((_) => _.id === R));
        if (C) {
          c({ ...w, boundedContextId: C }, r);
          return;
        }
      }
      if (w.kind === "create-ui-app") {
        const C = this.dropChain(n).find((R) => this.model.boundedContexts.some((_) => _.id === R));
        if (C) {
          c({ ...w, boundedContextId: C }, r);
          return;
        }
      }
      if (w.kind === "add-external-system") {
        const C = this.dropChain(n).find((R) => this.model.externalSystems.some((_) => _.id === R));
        if (C) {
          c({ ...w, parentId: C }, r), this.emit("modux-notice", { message: "Subsistema creado como parte del sistema" });
          return;
        }
      }
      c(w, r);
      return;
    }
    if (e === "ui-wizard-step") {
      const r = this.dropChain(n).map((C) => {
        var R;
        return ((R = /^wizrow:([^:]+):/.exec(C)) == null ? void 0 : R[1]) ?? C;
      }).find((C) => (this.model.pages ?? []).some((R) => R.id === C && R.type === "WIZARD"));
      if (!r) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const m = ((k = (this.model.pages ?? []).find((C) => C.id === r)) == null ? void 0 : k.wizardSteps) ?? [], w = new Set(m.map((C) => C.id ?? C.pageId));
      let M = m.length + 1;
      for (; w.has(`wzs-${M}`); ) M++;
      this.command({ kind: "add-page-wizard-step", pageId: r, itemId: `wzs-${M}`, label: `Paso ${M}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const l = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", r = l === "CRUD" ? "CRUD" : l === "WIZARD" ? "Wizard" : "Página", { id: m, name: w } = this.uniquePaletteName(r, "page-"), M = this.dropChain(n), C = M.find((_) => (this.model.uiApps ?? []).some((O) => O.id === _)), R = M.map((_) => {
        var O;
        return ((O = /^wizrow:([^:]+):/.exec(_)) == null ? void 0 : O[1]) ?? _;
      }).find((_) => (this.model.pages ?? []).some((O) => O.id === _ && O.type === "WIZARD"));
      if (R) {
        const _ = a.nodes.find((B) => B.id === R);
        _ && (t.x = _.x + _.w / 2 + 160, t.y = _.y - _.h / 2 + 40), this.command({ kind: "create-ui-page", id: m, name: w, pageType: l }, !1), this.command({ kind: "add-page-wizard-step", pageId: R, targetId: m }, !1);
        const O = d(m);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: m }, O]), this.emit("modux-notice", { message: `${w} creada como paso del wizard` });
        return;
      }
      if (C) {
        const _ = a.nodes.find((O) => O.id === C);
        _ && (t.x = _.x + _.w / 2 + 160, t.y = _.y - _.h / 2 + 40);
      }
      c(
        C ? { kind: "create-ui-page", id: m, name: w, pageType: l, appId: C, menuLabel: w } : { kind: "create-ui-page", id: m, name: w, pageType: l },
        m
      );
      return;
    }
    if (e === "menu-item") {
      const l = this.dropChain(n), r = l.find((R) => (this.model.uiApps ?? []).some((_) => _.id === R));
      if (!r) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const m = /* @__PURE__ */ new Set(), w = (R) => {
        for (const _ of R ?? [])
          m.add(_.label), w(_.children);
      };
      (this.model.uiApps ?? []).forEach((R) => w(R.menuItems));
      let M = "Entrada";
      for (let R = 2; m.has(M); R++) M = `Entrada ${R}`;
      const C = l.map((R) => Ce(R)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: r,
        label: M,
        itemId: this.newMenuItemId(M),
        parentId: C == null ? void 0 : C.itemId,
        parentLabel: C != null && C.itemId || C == null ? void 0 : C.label
      });
      return;
    }
    if (e === "etl-transform") {
      const r = this.dropChain(n).map((M) => (this.model.etlFlows ?? []).find((C) => C.id === M)).find(Boolean);
      if (!r) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const m = new Set((r.steps ?? []).map((M) => M.id));
      let w = (r.steps ?? []).length + 1;
      for (; m.has(`ets-${w}`); ) w++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: r.id,
        id: `ets-${w}`,
        name: `Transformación ${w}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "etl-flow" && !this.dropContainerFor(e, n)) {
      const l = this.uniquePaletteName(o.label, "etl-");
      c({ kind: "add-etl-flow", id: l.id, name: l.name }, l.id), this.emit("modux-notice", {
        message: "Integrador creado suelto — su contexto dueño se fija en la ficha; cablea fuentes y escrituras aquí"
      });
      return;
    }
    if (e === "workflow-join" || e === "workflow-split") {
      const { id: l, name: r } = this.uniquePaletteName(e === "workflow-join" ? "Join" : "Split", "wfg-");
      c({
        kind: "add-workflow-gateway",
        id: l,
        name: r,
        stepType: e === "workflow-join" ? "JOIN" : "SPLIT"
      }, l), this.emit("modux-notice", {
        message: "Gateway creado suelto — sus líneas dirán de qué workflow es (join: n entradas → 1 salida; split: 1 → n)"
      });
      return;
    }
    if (e === "workflow-step") {
      const r = this.model.workflows ?? [], m = this.dropChain(n), w = m.map((O) => r.find((B) => B.id === O)).find(Boolean), M = m.map((O) => {
        const B = r.find((H) => (H.steps ?? []).some((se) => se.id === O));
        return B ? { owner: B, stepId: O } : null;
      }).find(Boolean);
      let C = w ?? (M == null ? void 0 : M.owner);
      if (!C && r.length === 1 && (C = r[0]), !C) {
        if (!r.length) {
          this.emit("modux-notice", { message: "Crea antes un workflow: los pasos viven en uno" });
          return;
        }
        this._wfStepPicker = { pos: t, stepType: void 0 };
        return;
      }
      const { id: R, name: _ } = this.uniquePaletteName(
        "Paso",
        "wfs-"
      );
      M && (t = { x: t.x + 190, y: t.y }), c(
        {
          kind: "add-workflow-step",
          workflowId: C.id,
          id: R,
          name: _,
          ...M ? { dependsOnStepIds: [M.stepId], afterStepId: M.stepId } : {}
        },
        R
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${C.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const l = this.dropContainerFor("api", n);
      if (!l) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: r, name: m } = this.uniquePaletteName("API", "api-"), w = { kind: "add-api", id: r, name: m }, M = this.inverseOf(w) ?? [];
      this.command(w, !1), this.model.externalSystems.some((O) => O.id === l) ? this.command({ kind: "set-api-publisher", id: r, targetId: l }, !1) : this.command({ kind: "add-api-implementation", apiId: r, boundedContextId: l }, !1);
      const C = this.viewLayout(this._view), R = this.sceneFor(this._view).nodes.find((O) => O.id === l), _ = R ? { x: Math.round(t.x - R.x), y: Math.round(t.y - R.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...C, nodes: { ...C.nodes, [r]: _ } }), this.pushUndoEntry([...M, { kind: "move-node", view: this._view, id: r, pos: null }]);
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
      c({ kind: "add-aggregate", id: h, name: f, boundedContextId: u }, h, u);
    else if (e === "invariant")
      this.command({ kind: "add-invariant", aggregateId: u, id: h, name: f }), this.emit("modux-notice", {
        message: "Invariante declarado en el agregado — sus condiciones se detallan en la ficha del agregado"
      });
    else if (e === "ui-button") {
      const l = (this.model.buttonGroups ?? []).find((w) => w.id === u), r = new Set(((l == null ? void 0 : l.buttons) ?? []).map((w) => w.id));
      let m = ((l == null ? void 0 : l.buttons) ?? []).length + 1;
      for (; r.has(`btn-${m}`); ) m++;
      this.command({ kind: "add-group-button", id: u, itemId: `btn-${m}`, label: f }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: u, fieldId: h, name: f });
    else if (e === "module")
      c({ kind: "add-module", id: h, name: f, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      c(
        { kind: "add-use-case", id: h, name: f, boundedContextId: u, ...e === "policy" ? { policy: !0 } : {} },
        h,
        u
      );
    else if (e === "domain-event")
      c({ kind: "add-domain-event", id: h, name: f, boundedContextId: u }, h, u);
    else if (e === "application-event")
      c({ kind: "add-application-event", id: h, name: f, boundedContextId: u }, h, u);
    else if (e === "domain-service")
      c({ kind: "add-domain-service", id: h, name: f, boundedContextId: u }, h, u);
    else if (e === "query-service")
      c({ kind: "add-query-service", id: h, name: f, boundedContextId: u }, h, u);
    else if (e === "scheduled-trigger")
      c({ kind: "add-scheduled-trigger", id: h, name: f, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      c({ kind: "add-notification", id: h, name: f, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      c({ kind: "add-document", id: h, name: f, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      c({ kind: "add-etl-flow", id: h, name: f, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const l = (this.model.aggregates ?? []).find((r) => r.id === u);
      c({ kind: "add-read-model", id: h, name: f, aggregateId: u }, h, (l == null ? void 0 : l.boundedContextId) ?? u);
    } else if (e === "api-operation") {
      const l = (this.model.apis ?? []).find((C) => C.id === u), r = new Set(((l == null ? void 0 : l.operations) ?? []).map((C) => C.id));
      let m = f, w = `apiop-${u.replace(/^api-/, "")}-${re(m)}`;
      for (let C = 2; r.has(w); C++)
        m = `${o.label} ${C}`, w = `apiop-${u.replace(/^api-/, "")}-${re(m)}`;
      c({ kind: "add-api-operation", apiId: u, id: w, name: m }, w, u), a.nodes.some(
        (C) => C.parentId === u && (C.kind === "api-operation" || C.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(l == null ? void 0 : l.name) ?? u} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const l = this.model.boundedContexts.flatMap((M) => M.useCases ?? []).find((M) => M.id === u), r = new Set((l == null ? void 0 : l.stepIds) ?? []);
      let m = f, w = `step-${re(m)}`;
      for (let M = 2; r.has(w); M++)
        m = `${o.label} ${M}`, w = `step-${re(m)}`;
      c({ kind: "add-use-case-step", useCaseId: u, id: w, name: m }, w, u), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(l == null ? void 0 : l.name) ?? u} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? c({ kind: "add-external-use-case", id: h, name: f, boundedContextId: u }, h, u) : e === "external-table" ? c({ kind: "add-external-table", id: h, name: f, boundedContextId: u }, h, u) : e === "mcp-server" && c({ kind: "add-mcp-server", id: h, name: f, boundedContextId: u }, h, u);
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
      const y = (this.model.modelMappings ?? []).find((l) => l.id === e);
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
      const k = this.model.boundedContexts.flatMap((l) => l.useCases ?? []).find((l) => l.id === e);
      if (k) {
        if (e === i[2]) return;
        const l = (this.model.pages ?? []).find((m) => m.id === i[1]), r = ((l == null ? void 0 : l.buttons) ?? []).find((m) => m.useCaseId === i[2]);
        if (!r) return;
        if (((l == null ? void 0 : l.buttons) ?? []).some((m) => m.useCaseId === e)) {
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
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${k.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const o = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (o) {
      const y = this.model.boundedContexts.flatMap((l) => l.useCases ?? []).find((l) => l.id === e);
      if (!y) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const k = (this.model.pages ?? []).find((l) => l.id === o[1]);
      if (((k == null ? void 0 : k.buttons) ?? []).some((l) => l.useCaseId === e)) {
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
    const d = s ? ((f = this.componentIn(a, s[2])) == null ? void 0 : f.node) ?? null : null, c = this.model.boundedContexts.flatMap((y) => y.useCases ?? []).find((y) => y.id === e);
    if (c) {
      (d == null ? void 0 : d.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: a, componentId: d.id, useCaseId: e, label: d.label ?? c.name }), this.emit("modux-notice", { message: `El botón lanza ${c.name}` })) : (this.command({ kind: "add-page-button", pageId: a, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${c.name} añadido a la página` }));
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
    const h = this.model.boundedContexts.flatMap((y) => (y.queryServices ?? []).flatMap((k) => (k.operations ?? []).map((l) => ({ op: l, qs: k })))).find(({ op: y }) => y.id === e);
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
    const a = this._view, d = this.sceneFor(a), c = d.nodes.find((f) => f.id === e);
    if (!c) {
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
    const u = this.viewLayout(a), g = c.parentId ? d.nodes.find((f) => f.id === c.parentId) : void 0, h = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: a, id: e, pos: u.nodes[e] ?? null }]), this.writeViewLayout(a, { ...u, nodes: { ...u.nodes, [e]: h } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "distribution", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = io.filter(
      (i) => (this._view === "workflows" ? ["workflow", "workflow-step", "workflow-join", "workflow-split"].includes(i.type) : this._view === "ui" ? ["ui", "ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(i.type) : this._view === "design" ? i.type === "page" || i.type === "custom-code" || i.type.startsWith("cmp:") : this._view === "integrations" ? ["etl-flow", "etl-transform", "external-system", "external-table"].includes(i.type) : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(i.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(i.type) && !i.type.startsWith("cmp:")) && (!e || i.label.toLowerCase().includes(e))
    ), n = this._view === "workflows" ? "new" : this._paletteTab;
    return E`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(i) => this._paletteFilter = i.target.value}
          />
          ${n === "new" ? E`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${Pc.map((i) => {
      const o = t.filter((s) => s.group === i);
      return o.length ? E`
                        <div class="palette-g">${i}</div>
                        ${o.map(
        (s) => E`
                            <div
                              class="palette-item ${s.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${s.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : s.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(a) => this.onPaletteDragStart(a, { new: s.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                                ${Ct[s.symbol]}
                              </svg>
                              <span class="pal-label">${s.label.replace(/^(Layout|Componente) · /, "")}</span>
                            </div>
                          `
      )}
                      ` : "";
    })}
              ` : E`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (i) => E`
                    <div class="palette-g">${i.label}</div>
                    ${i.items.map(
        (o) => E`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(s) => this.onPaletteDragStart(s, { existing: o.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${i.color}">
                            ${Ct[i.symbol]}
                          </svg>
                          <span class="pal-label">${o.name}</span>
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
    var t, n, i, o, s, a, d;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const c = this._newBoundedContextId || ((t = this.model.boundedContexts[0]) == null ? void 0 : t.id);
        if (!c) return;
        this.command({ kind: "add-aggregate", id: `agg-${re(e)}`, name: e, boundedContextId: c });
      } else if (this._view === "flows") {
        const c = this._newTriggerAggId || ((i = (n = this.model.aggregates) == null ? void 0 : n[0]) == null ? void 0 : i.id), u = this._newTargetId || ((o = this.model.boundedContexts[0]) == null ? void 0 : o.id), g = this._newTriggerEvent.trim();
        if (!c || !u || !g) return;
        this.command({
          kind: "add-flow",
          id: `flow-${re(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: c,
          triggerEvent: g,
          targetId: u
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const c = this._newBoundedContextId || ((s = this.model.boundedContexts[0]) == null ? void 0 : s.id);
        if (!c) return;
        this.command({
          kind: "add-process",
          id: `proc-${re(e)}`,
          name: e,
          boundedContextId: c,
          triggerAggregateId: this._newTriggerAggId || ((d = (a = this.model.aggregates) == null ? void 0 : a[0]) == null ? void 0 : d.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e, t) {
    const n = this.viewLayout(e), i = this.filteredModel(), o = (t == null ? void 0 : t.expandAll) ?? !1, s = e === "aggregates" ? Ta(i, n.nodes) : e === "flows" ? Fa(i, n.nodes) : e === "processes" ? ui(i, n.nodes) : e === "workflows" ? Zl(i, n.nodes, new Set(n.expanded ?? []), o) : e === "ui" ? ac(i, n.nodes, new Set(n.expanded ?? []), o) : e === "design" ? { nodes: [], edges: [] } : e === "integrations" ? lc(i, n.nodes) : e === "mappings" ? sc(i, n.nodes) : e === "eventstorming" ? Vl(i, n.nodes, new Set(n.expanded ?? []), o) : e === "distribution" ? _a(i, n.nodes, n.sizes ?? {}, new Set(n.expanded ?? []), o) : $a(i, n.nodes, n.sizes ?? {}, new Set(n.expanded ?? []), o);
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
      const c = i.nodes[d.id];
      c && e.nodes.unshift({
        id: d.id,
        label: d.name,
        kind: "area",
        x: c.x,
        y: c.y,
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
    var d, c;
    const n = this.model.notes ?? [];
    if (!n.length) return;
    const i = this.viewLayout(t), o = new Set(e.nodes.map((u) => u.id)), s = new Set(e.edges.map((u) => u.id)), a = i.sizes ?? {};
    for (const u of n) {
      const g = i.nodes[u.id], h = (r) => o.has(r) ? r : o.has(`tgt:${r}`) ? `tgt:${r}` : o.has(`flow:${r}`) ? `flow:${r}` : null, f = (u.targetIds ?? []).map((r) => ({ raw: r, nodeId: h(r) })).filter((r) => !!r.nodeId), y = (u.edgeRefs ?? []).filter((r) => s.has(r));
      if (!g && !f.length && !y.length) continue;
      const k = f.length ? e.nodes.find((r) => r.id === f[0].nodeId) : void 0, l = g ?? { x: ((k == null ? void 0 : k.x) ?? 0) + 40, y: ((k == null ? void 0 : k.y) ?? 0) - 110 };
      e.nodes.push({
        id: u.id,
        label: u.text,
        kind: "note",
        x: l.x,
        y: l.y,
        w: ((d = a[u.id]) == null ? void 0 : d.w) ?? 150,
        h: ((c = a[u.id]) == null ? void 0 : c.h) ?? 72,
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
    var c;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const n = t.nodes.filter((u) => !u.parentId && u.kind !== "area"), i = new Set(n.map((u) => u.id)), o = {
      nodes: n,
      edges: t.edges.filter((u) => i.has(u.sourceId) && i.has(u.targetId))
    }, a = await cc(o, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), d = this.viewLayout(e);
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
    ]), this.writeViewLayout(e, { nodes: a, edges: {}, sizes: d.sizes }), await this.updateComplete, (c = this.renderRoot.querySelector("modux-canvas")) == null || c.fit();
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
      this.applyConnection(t.detail.sourceId, t.detail.targetId, t.detail.x, t.detail.y);
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
        return ((d = n.nodes.find((c) => c.id === a.id)) == null ? void 0 : d.label) ?? a.id;
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
        ${Rc.map(
      (i) => E`
            <button
              class="picker-item ${i === t ? "current" : ""}"
              title=${i}
              @click=${() => this.pickRelationType(i)}
            >
              <span class="abbr">${Zn[i].abbr}</span>
              <span class="name">${Zn[i].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
te.styles = vt`
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
ie([
  le({ attribute: !1 })
], te.prototype, "model", 2);
ie([
  le({ attribute: !1 })
], te.prototype, "layout", 2);
ie([
  le({ attribute: !1 })
], te.prototype, "diff", 2);
ie([
  q()
], te.prototype, "_view", 2);
ie([
  q()
], te.prototype, "_relationType", 2);
ie([
  q()
], te.prototype, "_relationPicker", 2);
ie([
  q()
], te.prototype, "_extDepPicker", 2);
ie([
  q()
], te.prototype, "_selectedId", 2);
ie([
  q()
], te.prototype, "_paletteOpen", 2);
ie([
  q()
], te.prototype, "_yugo", 2);
ie([
  le({ attribute: !1 })
], te.prototype, "repositories", 2);
ie([
  le({ type: Boolean, reflect: !0 })
], te.prototype, "dark", 2);
ie([
  q()
], te.prototype, "_repoPicker", 2);
ie([
  q()
], te.prototype, "_wfStepPicker", 2);
ie([
  q()
], te.prototype, "_branchCondEditor", 2);
ie([
  q()
], te.prototype, "_paletteFilter", 2);
ie([
  q()
], te.prototype, "_paletteTab", 2);
ie([
  q()
], te.prototype, "_selectedCmp", 2);
ie([
  q()
], te.prototype, "_fullscreen", 2);
ie([
  q()
], te.prototype, "_tilt", 2);
ie([
  q()
], te.prototype, "_helpOpen", 2);
ie([
  q()
], te.prototype, "_newName", 2);
ie([
  q()
], te.prototype, "_newBoundedContextId", 2);
ie([
  q()
], te.prototype, "_newArchetype", 2);
ie([
  q()
], te.prototype, "_newTriggerAggId", 2);
ie([
  q()
], te.prototype, "_newTriggerEvent", 2);
ie([
  q()
], te.prototype, "_newTargetId", 2);
ie([
  q()
], te.prototype, "_undoStack", 2);
ie([
  q()
], te.prototype, "_redoStack", 2);
ie([
  q()
], te.prototype, "_newStepName", 2);
ie([
  q()
], te.prototype, "_newStepType", 2);
ie([
  q()
], te.prototype, "_newStepRole", 2);
ie([
  q()
], te.prototype, "_newStepDeadline", 2);
ie([
  q()
], te.prototype, "_editStepRole", 2);
ie([
  q()
], te.prototype, "_editStepDeadline", 2);
ie([
  q()
], te.prototype, "_editStepComp", 2);
ie([
  q()
], te.prototype, "_newStepUseCase", 2);
ie([
  q()
], te.prototype, "_newStepEmits", 2);
ie([
  q()
], te.prototype, "_editStepUseCase", 2);
ie([
  q()
], te.prototype, "_editStepEmits", 2);
ie([
  q()
], te.prototype, "_editStepAwaits", 2);
ie([
  q()
], te.prototype, "_multi", 2);
ie([
  q()
], te.prototype, "_newViewName", 2);
ie([
  q()
], te.prototype, "_connectPicker", 2);
ie([
  q()
], te.prototype, "_activeViewId", 2);
ie([
  q()
], te.prototype, "_activeJourneyId", 2);
ie([
  q()
], te.prototype, "_newJourneyName", 2);
ie([
  q()
], te.prototype, "_newRagSourceType", 2);
ie([
  q()
], te.prototype, "_newRagSourceUri", 2);
ie([
  q()
], te.prototype, "_addMemberKey", 2);
ie([
  q()
], te.prototype, "_treeOpen", 2);
ie([
  q()
], te.prototype, "_deletePicker", 2);
te = ie([
  wt("modux-editor")
], te);
var zc = Object.defineProperty, Uc = Object.getOwnPropertyDescriptor, $e = (e, t, n, i) => {
  for (var o = i > 1 ? void 0 : i ? Uc(t, n) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (i ? a(t, n, o) : a(o)) || o);
  return i && o && zc(t, n, o), o;
};
let ye = class extends Ge {
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
      const d = this._diff.changes.filter((c) => c.kind === i);
      return d.length ? E`
            <div class="diff-group">${o} (${d.length})</div>
            ${d.map(
        (c) => E`
                <div class="diff-row">
                  <span class="diff-mark ${a}">${s}</span>
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
        const c = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!c.ok) {
          let u = `El servidor rechazó la operación (${c.status})`;
          try {
            const g = await c.json();
            g != null && g.message && (u = g.message);
          } catch {
          }
          this.showToast(u);
          return;
        }
        this._workspace = await c.json(), await this.reload(), await this.refreshDiff(), (d = this.renderRoot.querySelector("modux-editor")) == null || d.clearHistory();
      } catch (c) {
        this.showToast(String(c));
      }
    });
    const i = (s = this._workspace) == null ? void 0 : s.current;
    if (i && i !== n) {
      const d = ((a = this._workspace.solutions.find((c) => c.branch === i)) == null ? void 0 : a.name) ?? i.replace(/^solution\//, "");
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
        const { apiId: d } = await a.json(), c = o ? { kind: "set-api-publisher", id: d, targetId: o } : s ? { kind: "add-api-implementation", apiId: d, boundedContextId: s } : null;
        c && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(c)
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
ye.styles = vt`
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
$e([
  le()
], ye.prototype, "base", 2);
$e([
  q()
], ye.prototype, "_model", 2);
$e([
  q()
], ye.prototype, "_layout", 2);
$e([
  q()
], ye.prototype, "_error", 2);
$e([
  q()
], ye.prototype, "_saving", 2);
$e([
  q()
], ye.prototype, "_toast", 2);
$e([
  q()
], ye.prototype, "_workspace", 2);
$e([
  q()
], ye.prototype, "_creatingSolution", 2);
$e([
  q()
], ye.prototype, "_newSolutionName", 2);
$e([
  q()
], ye.prototype, "_taggingVersion", 2);
$e([
  q()
], ye.prototype, "_newTagName", 2);
$e([
  q()
], ye.prototype, "_tagsOpen", 2);
$e([
  q()
], ye.prototype, "_tags", 2);
$e([
  q()
], ye.prototype, "_repositories", 2);
$e([
  q()
], ye.prototype, "_diff", 2);
$e([
  q()
], ye.prototype, "_diffListOpen", 2);
$e([
  q()
], ye.prototype, "_mergeFlow", 2);
$e([
  q()
], ye.prototype, "_dark", 2);
ye = $e([
  wt("modux-editor-connected")
], ye);
export {
  ro as ARCHIMATE_LABEL,
  ka as ARCHIMATE_NOTATION,
  qc as CONTAINER_HEADER,
  Fc as CONTAINER_INSET,
  ve as ModuxCanvas,
  te as ModuxEditor,
  ye as ModuxEditorConnected,
  Ta as aggregatesScene,
  ut as apiImplNodeId,
  mt as apiOpOccurrenceId,
  Bc as containerFit,
  ua as containerMinSize,
  $a as contextMapScene,
  _a as distributionScene,
  Ia as flowCoherence,
  Fa as flowsScene,
  rt as normalizeViewLayout,
  so as ownershipIndex,
  ui as processesScene,
  ba as relationEdgeId,
  pa as resolveOverlaps
};
