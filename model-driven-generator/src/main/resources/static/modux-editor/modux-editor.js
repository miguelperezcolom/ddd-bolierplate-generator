const Wp = 34, jp = 10;
function Ua(e, t = 24) {
  const i = new Map(e.map((o) => [o.id, { x: o.x, y: o.y }]));
  for (let o = 0; o < 80; o++) {
    let s = !1;
    for (let a = 0; a < e.length; a++)
      for (let r = a + 1; r < e.length; r++) {
        const l = e[a], u = e[r], h = i.get(l.id), m = i.get(u.id), f = m.x - h.x, g = m.y - h.y, v = (l.w + u.w) / 2 + t - Math.abs(f), b = (l.h + u.h) / 2 + t - Math.abs(g);
        if (!(v <= 0 || b <= 0))
          if (s = !0, v < b) {
            const d = (f >= 0 ? 1 : -1) * v / 2;
            h.x -= d, m.x += d;
          } else {
            const d = (g >= 0 ? 1 : -1) * b / 2;
            h.y -= d, m.y += d;
          }
      }
    if (!s) break;
  }
  const n = /* @__PURE__ */ new Map();
  for (const o of e) {
    const s = i.get(o.id);
    (Math.abs(s.x - o.x) > 0.5 || Math.abs(s.y - o.y) > 0.5) && n.set(o.id, s);
  }
  return n;
}
function za(e, t = { w: 160, h: 90 }) {
  let i = t.w, n = t.h;
  for (const o of e)
    i = Math.max(i, 2 * (Math.abs(o.dx) + o.w / 2 + 10)), n = Math.max(
      n,
      2 * (34 + o.h / 2 - o.dy),
      // child's top edge below the header band
      2 * (10 + o.h / 2 + o.dy)
      // child's bottom edge above the inset
    );
  return { w: i, h: n };
}
function Gp(e, t, i) {
  let n = t.w / 2, o = t.w / 2, s = t.h / 2, a = t.h / 2;
  for (const r of i)
    n = Math.max(n, -r.dx + r.w / 2 + 10), o = Math.max(o, r.dx + r.w / 2 + 10), s = Math.max(s, -r.dy + r.h / 2 + 34), a = Math.max(a, r.dy + r.h / 2 + 10);
  return {
    x: e.x + (o - n) / 2,
    y: e.y + (a - s) / 2,
    w: n + o,
    h: s + a
  };
}
function ft(e) {
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
const qa = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, In = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Ba = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Xe = 168, Qe = 56;
function bt(e, t) {
  return `apiimpl:${e}@${t}`;
}
function vt(e, t) {
  return `apiop:${e}@${t}`;
}
function Co(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.boundedContextId === t && i.has(n.apiId)).map((n) => ({
    id: bt(n.apiId, n.boundedContextId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
function Fa(e, t) {
  const i = t.targetApiId ? (e.apis ?? []).find((n) => n.id === t.targetApiId) : void 0;
  return (i == null ? void 0 : i.operations) ?? [];
}
const Va = 108, Wa = 32, ja = 240;
function Ga(e) {
  const t = Math.ceil(e.length * 7.6) + 26;
  return Math.min(ja, Math.max(Va + 12, t));
}
function Ha(e, t) {
  return `rel:${e}->${t}`;
}
function Ya(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function Eo(e, t = "unified") {
  const i = /* @__PURE__ */ new Map();
  if (t === "distribution") {
    for (const o of e.boundedContexts) {
      const s = (e.modules ?? []).filter((a) => a.boundedContextId === o.id);
      if (!(s.length <= 1)) {
        for (const a of jt(e, o)) i.set(a.id, o.id);
        for (const a of s) {
          i.set(a.id, o.id);
          for (const r of a.elementIds ?? []) i.set(r, a.id);
        }
      }
    }
    return i;
  }
  const n = (o, s, a) => {
    const r = (e.apis ?? []).find((l) => l.id === o);
    for (const l of (r == null ? void 0 : r.operations) ?? [])
      i.set(s ? vt(l.id, s) : l.id, a);
  };
  for (const o of e.boundedContexts) {
    for (const s of jt(e, o)) i.set(s.id, o.id);
    for (const s of Co(e, o.id)) {
      i.set(s.id, o.id);
      const a = /^apiimpl:(.+)@(.+)$/.exec(s.id);
      a && n(a[1], a[2], s.id);
    }
  }
  for (const o of e.externalSystems) {
    o.parentExternalSystemId && i.set(o.id, o.parentExternalSystemId);
    for (const s of o.useCases ?? []) i.set(s.id, o.id);
    for (const s of o.tables ?? []) i.set(s.id, o.id);
    for (const s of o.mcpServers ?? []) i.set(s.id, o.id);
  }
  for (const o of e.apis ?? [])
    o.publishedByExternalSystemId && i.set(o.id, o.publishedByExternalSystemId), n(o.id, null, o.id);
  for (const o of e.proxyApis ?? [])
    o.publishedByExternalSystemId && i.set(o.id, o.publishedByExternalSystemId), o.targetApiId && n(o.targetApiId, o.id, o.id);
  return i;
}
function st(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const Ka = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Xa = {
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
}, Qa = {
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
function jt(e, t) {
  return [
    ...(e.aggregates ?? []).filter((i) => i.boundedContextId === t.id).map((i) => {
      const n = (e.entities ?? []).filter((r) => r.aggregateId === i.id).length, o = (e.valueObjects ?? []).filter((r) => r.aggregateId === i.id).length, s = (i.invariants ?? []).length, a = (n ? ` 🗂${n}` : "") + (o ? ` ◈${o}` : "") + (s ? ` ⚖${s}` : "");
      return { id: i.id, name: `${i.name}${a}`, kind: "aggregate" };
    }),
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
    ...(e.etlFlows ?? []).filter((i) => i.ownerBoundedContextId === t.id).map((i) => ({ id: i.id, name: i.name, kind: "etl-flow" })),
    ...(e.notifications ?? []).filter((i) => i.ownerBoundedContextId === t.id).map((i) => ({ id: i.id, name: i.name, kind: "notification" })),
    ...(e.documents ?? []).filter((i) => i.ownerBoundedContextId === t.id).map((i) => ({ id: i.id, name: i.name, kind: "document" })),
    ...(e.uis ?? []).filter((i) => i.boundedContextId === t.id).map((i) => ({ id: i.id, name: i.name, kind: "ui" })),
    ...(e.uiApps ?? []).filter((i) => (t.uiAppIds ?? []).includes(i.id)).map((i) => ({ id: i.id, name: i.name, kind: "ui-app" }))
  ];
}
const Ja = {
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
}, So = {
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
function Za(e, t, i = {}, n = /* @__PURE__ */ new Set(), o = !1) {
  return Ao(e, t, "unified", i, n, o);
}
function es(e, t, i = {}, n = /* @__PURE__ */ new Set(), o = !1) {
  return Ao(e, t, "distribution", i, n, o);
}
function Ao(e, t, i, n = {}, o = /* @__PURE__ */ new Set(), s = !1) {
  const a = i === "distribution";
  if (s) {
    const p = new Set(o);
    for (const T of e.boundedContexts) p.add(T.id);
    for (const T of e.externalSystems) p.add(T.id);
    for (const T of e.apis ?? []) p.add(T.id);
    for (const T of e.proxyApis ?? []) p.add(T.id);
    for (const T of e.apiImplementations ?? [])
      p.add(bt(T.apiId, T.boundedContextId));
    for (const T of e.modules ?? []) p.add(T.id);
    o = p;
  }
  const r = !a, l = new Set(e.externalSystems.map((p) => p.id)), u = (e.apis ?? []).filter(
    (p) => p.publishedByExternalSystemId && l.has(p.publishedByExternalSystemId)
  ), h = new Set(u.map((p) => p.id)), m = (e.proxyApis ?? []).filter(
    (p) => p.publishedByExternalSystemId && l.has(p.publishedByExternalSystemId)
  ), f = new Set(m.map((p) => p.id)), g = new Map((e.apis ?? []).map((p) => [p.id, p])), v = new Map((e.proxyApis ?? []).map((p) => [p.id, p])), b = (p, T) => {
    var H;
    if (a) {
      if (T === "boundedContext") {
        const L = (e.modules ?? []).filter((he) => he.boundedContextId === p);
        if (L.length <= 1) return [];
        const F = new Set(L.flatMap((he) => he.elementIds ?? [])), Z = e.boundedContexts.find((he) => he.id === p), ue = Z ? jt(e, Z).filter((he) => !F.has(he.id)) : [];
        return [
          ...L.map((he) => ({ id: he.id, name: he.name, kind: "module" })),
          ...ue
        ];
      }
      if (T === "module") {
        const L = (e.modules ?? []).find((ue) => ue.id === p), F = e.boundedContexts.find((ue) => ue.id === (L == null ? void 0 : L.boundedContextId));
        if (!L || !F) return [];
        const Z = new Map(jt(e, F).map((ue) => [ue.id, ue]));
        return (L.elementIds ?? []).map((ue) => Z.get(ue)).filter((ue) => !!ue);
      }
      return [];
    }
    switch (T) {
      case "boundedContext": {
        const L = e.boundedContexts.find((F) => F.id === p);
        return L ? [...Co(e, p), ...jt(e, L)] : [];
      }
      case "external-system": {
        const L = e.externalSystems.find((F) => F.id === p);
        return [
          ...e.externalSystems.filter((F) => F.parentExternalSystemId === p).map((F) => ({ id: F.id, name: F.name, kind: "external-system" })),
          ...u.filter((F) => F.publishedByExternalSystemId === p).map((F) => ({ id: F.id, name: F.name, kind: "api" })),
          ...m.filter((F) => F.publishedByExternalSystemId === p).map((F) => ({ id: F.id, name: F.name, kind: "proxy-api" })),
          ...((L == null ? void 0 : L.useCases) ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "external-use-case" })
          ),
          ...((L == null ? void 0 : L.tables) ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "external-table" })
          ),
          ...((L == null ? void 0 : L.mcpServers) ?? []).map(
            (F) => ({ id: F.id, name: F.name, kind: "mcp-server" })
          )
        ];
      }
      case "api":
        return (((H = g.get(p)) == null ? void 0 : H.operations) ?? []).map(
          (L) => ({ id: L.id, name: L.name, kind: "api-operation" })
        );
      case "api-impl": {
        const L = /^apiimpl:(.+)@(.+)$/.exec(p), F = L ? g.get(L[1]) : void 0;
        return ((F == null ? void 0 : F.operations) ?? []).map(
          (Z) => ({
            id: vt(Z.id, L[2]),
            name: Z.name,
            kind: "api-op-occurrence"
          })
        );
      }
      case "proxy-api": {
        const L = v.get(p);
        return L ? Fa(e, L).map(
          (F) => ({
            id: vt(F.id, p),
            name: F.name,
            kind: "api-op-occurrence"
          })
        ) : [];
      }
      default:
        return [];
    }
  }, d = [], c = [], y = (p, T, H) => {
    const L = -Math.PI / 2 + 2 * Math.PI * T / Math.max(H, 1), F = 160 + 12 * Math.min(H, 14);
    return { x: p.x + F * Math.cos(L), y: p.y + F * Math.sin(L) };
  }, _ = (p, T, H, L) => {
    const F = b(p, T);
    F.forEach((Z, ue) => {
      const he = t[Z.id] ?? y(L, ue, F.length), oe = b(Z.id, Z.kind), we = o.has(Z.id) && oe.length > 0, Te = Z.policy ? Ka : Xa[Z.kind], Be = Z.kind === "external-system";
      d.push({
        id: Z.id,
        label: Z.name,
        kind: Z.kind,
        x: he.x,
        y: he.y,
        w: Be ? 150 : Ga(Z.name),
        h: Be ? 44 : Wa + 4,
        symbol: Te.symbol,
        fill: Te.fill,
        stroke: Te.stroke,
        dashed: Be || void 0,
        ownerId: p,
        collapsible: oe.length > 0,
        collapsed: oe.length > 0 && !we,
        tooltip: `${Z.policy ? "Policy" : Qa[Z.kind]} ${Z.name} — parte de ${H}`
      }), c.push({
        id: `contains:${p}->${Z.id}`,
        sourceId: p,
        targetId: Z.id,
        kind: "contains",
        color: "#94a3b8",
        tooltip: `${H} contiene ${Z.name}`
      }), we && _(Z.id, Z.kind, Z.name, he);
    });
  }, A = [
    ...e.boundedContexts.map((p) => ({ ref: p, external: !1, api: !1, proxy: !1 })),
    ...(a ? [] : e.externalSystems).filter((p) => !p.parentExternalSystemId || !l.has(p.parentExternalSystemId)).map((p) => ({ ref: p, external: !0, api: !1, proxy: !1 })),
    ...a ? [] : (e.apis ?? []).filter((p) => !h.has(p.id)).map((p) => ({ ref: p, external: !1, api: !0, proxy: !1 })),
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
  A.forEach((p, T) => {
    const H = t[p.ref.id] ?? st(T, A.length);
    if ("idp" in p && p.idp) {
      const oe = p.ref, we = !!oe.publishedByExternalSystemId;
      d.push({
        id: oe.id,
        label: oe.name,
        kind: "identity-provider",
        symbol: "key",
        fill: we ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: we,
        badge: oe.type ?? "IDP",
        tooltip: `${oe.name} — emite las identidades que el sistema confía${we ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: H.x,
        y: H.y,
        w: Xe,
        h: Qe
      });
      return;
    }
    if ("etl" in p && p.etl) {
      const oe = p.ref;
      d.push({
        id: oe.id,
        label: oe.name,
        kind: "etl-flow",
        symbol: "gear",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        dashed: !0,
        badge: "ETL",
        tooltip: `${oe.name} — integrador: fuentes (pull/consumidor) → transformación → escrituras (API/BD/evento)`,
        x: H.x,
        y: H.y,
        w: Xe,
        h: Qe
      });
      return;
    }
    if ("workflow" in p && p.workflow) {
      const oe = p.ref;
      d.push({
        id: oe.id,
        label: oe.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${oe.name} — workflow${oe.triggerEvent ? ` · arranca con ${oe.triggerEvent}` : ""}`,
        x: H.x,
        y: H.y,
        w: Xe,
        h: Qe
      });
      return;
    }
    if (p.proxy) {
      const oe = p.ref, we = b(oe.id, "proxy-api"), Te = o.has(oe.id) && we.length > 0;
      d.push({
        id: oe.id,
        label: oe.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${oe.name} — proxy/cache de una API, consumible como ella`,
        collapsible: we.length > 0,
        collapsed: we.length > 0 && !Te,
        x: H.x,
        y: H.y,
        w: Xe,
        h: Qe
      }), Te && _(oe.id, "proxy-api", oe.name, H);
      return;
    }
    if (p.api) {
      const oe = p.ref, we = b(oe.id, "api"), Te = o.has(oe.id) && we.length > 0;
      d.push({
        id: oe.id,
        label: oe.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${oe.name} — API publicada (sus operaciones apuntan a quien las implementa)`,
        collapsible: we.length > 0,
        collapsed: we.length > 0 && !Te,
        x: H.x,
        y: H.y,
        w: Xe,
        h: Qe
      }), Te && _(oe.id, "api", oe.name, H);
      return;
    }
    if (p.external) {
      const oe = p.ref, we = b(oe.id, "external-system"), Te = o.has(oe.id) && we.length > 0, Be = n[oe.id];
      d.push({
        id: oe.id,
        label: oe.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: oe.referencedRepositoryId ? "PROYECTO" : "EXTERNAL",
        tooltip: oe.referencedRepositoryId ? `${oe.name} — otro proyecto modux (repositorio ${oe.referencedRepositoryId}), referenciado del catálogo` : `${oe.name} (sistema externo)`,
        collapsible: we.length > 0,
        collapsed: we.length > 0 && !Te,
        resizable: !0,
        x: H.x,
        y: H.y,
        w: (Be == null ? void 0 : Be.w) ?? Xe,
        h: (Be == null ? void 0 : Be.h) ?? Qe
      }), Te && _(oe.id, "external-system", oe.name, H);
      return;
    }
    const L = p.ref, F = L.subdomainType ?? "GENERIC", Z = b(L.id, "boundedContext"), ue = o.has(L.id) && Z.length > 0, he = n[L.id];
    d.push({
      id: L.id,
      label: L.name,
      kind: "boundedContext",
      symbol: "component",
      fill: qa[F],
      stroke: "#94a3b8",
      badge: F,
      tooltip: a && Z.length === 0 ? `${L.name} — un solo módulo (el principal): el servicio lo despliega entero. Añade un módulo desde la paleta para repartir sus elementos` : `${L.name} — subdominio ${F}`,
      collapsible: Z.length > 0,
      collapsed: Z.length > 0 && !ue,
      resizable: !0,
      x: H.x,
      y: H.y,
      w: (he == null ? void 0 : he.w) ?? Xe,
      h: (he == null ? void 0 : he.h) ?? Qe
    }), ue && _(L.id, "boundedContext", L.name, H);
  });
  const S = a ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, E = A.length + S.actors.length + S.aiAgents.length + S.rags.length + S.mcpGateways.length;
  S.actors.forEach((p, T) => {
    const H = t[p.id] ?? st(A.length + T, E);
    d.push({
      id: p.id,
      label: p.name,
      x: H.x,
      y: H.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${p.name} (actor)`
    });
  }), S.aiAgents.forEach((p, T) => {
    const H = t[p.id] ?? st(A.length + (e.actors ?? []).length + T, E);
    d.push({
      id: p.id,
      label: p.name,
      x: H.x,
      y: H.y,
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
  }), S.mcpGateways.forEach((p, T) => {
    const H = t[p.id] ?? st(
      A.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + T,
      E
    );
    d.push({
      id: p.id,
      label: p.name,
      x: H.x,
      y: H.y,
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
  const N = [];
  if (S.rags.forEach((p, T) => {
    const H = t[p.id] ?? st(
      A.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + T,
      E
    );
    d.push({
      id: p.id,
      label: p.name,
      x: H.x,
      y: H.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${p.name} (base de conocimiento — retrieval para agentes)`
    }), (p.contentSources ?? []).forEach((L, F) => {
      const Z = `ragcs:${p.id}:${L.uri}`, ue = t[Z] ?? { x: H.x + 170, y: H.y - 30 + F * 44 };
      d.push({
        id: Z,
        label: L.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: ue.x,
        y: ue.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: L.type,
        tooltip: `${L.type}: ${L.uri}`
      }), N.push({
        id: `ragcse:${p.id}:${L.uri}`,
        sourceId: Z,
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
    p.forEach((L, F) => {
      const Z = t[L.id] ?? st(A.length + F, A.length + p.length);
      d.push({
        id: L.id,
        label: L.name,
        kind: "service",
        symbol: "gear",
        fill: "#f8fafc",
        stroke: "#334155",
        badge: "SERVICIO",
        tooltip: `${L.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
        x: Z.x,
        y: Z.y,
        w: Xe,
        h: Qe
      });
    });
    const T = e.urls ?? [];
    T.forEach((L, F) => {
      const Z = t[L.id] ?? st(
        A.length + p.length + F,
        A.length + p.length + T.length
      );
      d.push({
        id: L.id,
        label: L.name,
        kind: "url",
        symbol: "interface",
        fill: "#f8fafc",
        stroke: "#0e7490",
        badge: "URL",
        tooltip: `${L.url ?? L.name} — traza una línea desde un servicio para servirla aquí`,
        x: Z.x,
        y: Z.y,
        w: Xe,
        h: Qe
      });
    });
    const H = [];
    [...new Set(p.filter((L) => L.database).map((L) => L.database))].forEach((L) => H.push({
      id: `infra-db:${L}`,
      label: L,
      badge: "BD",
      symbol: "readmodel",
      tooltip: `Base de datos ${L} — la usan los servicios que declaran database=${L}`
    })), p.some((L) => L.outboxEnabled) && H.push({
      id: "infra-broker",
      label: "Broker de eventos",
      badge: "BROKER",
      symbol: "event",
      tooltip: "Broker (Kafka/…) — lo alimentan los servicios con outbox"
    }), (e.workflows ?? []).length && H.push({
      id: "infra-workflow-engine",
      label: "Workflow engine",
      badge: "ENGINE",
      symbol: "process",
      tooltip: "Motor de workflows — ejecuta los workflows del modelo"
    }), (e.pages ?? []).length && H.push({
      id: "infra-forms-engine",
      label: "Forms engine",
      badge: "ENGINE",
      symbol: "interface",
      tooltip: "Motor de formularios (Mateu) — sirve las páginas declaradas"
    }), H.forEach((L, F) => {
      const Z = t[L.id] ?? st(
        A.length + p.length + T.length + F,
        A.length + p.length + T.length + H.length
      );
      d.push({
        id: L.id,
        label: L.label,
        kind: "infrastructure",
        symbol: L.symbol,
        fill: "#fffbeb",
        stroke: "#92400e",
        dashed: !0,
        badge: L.badge,
        tooltip: L.tooltip,
        x: Z.x,
        y: Z.y,
        w: Xe,
        h: Qe
      });
    });
  }
  d.sort((p, T) => (p.parentId ? 1 : 0) - (T.parentId ? 1 : 0));
  const V = e.relations.map((p) => ({
    id: Ha(p.sourceId, p.targetId),
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "relation",
    label: p.type ? In[p.type] : p.inferredType ? `≈${In[p.inferredType]}` : "?",
    color: p.declared ? "#475569" : "#94a3b8",
    dashed: !p.declared,
    arrow: !0,
    tooltip: p.type ? `${p.type} (${p.sourceId} upstream → ${p.targetId} downstream)${p.reasons ? ` — ${p.reasons}` : ""}` : p.inferredType ? `≈ ${p.inferredType} INFERIDO de las dependencias — doble click para declararlo (o corregirlo)${p.reasons ? ` — ${p.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${p.reasons ? ` — ${p.reasons}` : ""}`
  })), G = e.flows.map((p) => {
    var ue, he, oe, we, Te, Be;
    const T = Ya(e, p), H = r ? e.boundedContexts.find((Fe) => Fe.id === p.sourceId) : void 0, L = ((ue = H == null ? void 0 : H.domainEvents) == null ? void 0 : ue.find((Fe) => Fe.name === p.triggerEvent)) ?? ((he = H == null ? void 0 : H.applicationEvents) == null ? void 0 : he.find((Fe) => Fe.name === p.triggerEvent)), F = r && p.readModelName ? (we = (oe = e.boundedContexts.find((Fe) => Fe.id === p.targetId)) == null ? void 0 : oe.readModels) == null ? void 0 : we.find((Fe) => Fe.name === p.readModelName) : void 0, Z = r && p.targetUseCaseId ? (Be = (Te = e.boundedContexts.find((Fe) => Fe.id === p.targetId)) == null ? void 0 : Te.useCases) == null ? void 0 : Be.find((Fe) => Fe.id === p.targetUseCaseId) : void 0;
    return {
      id: `flow:${p.id}`,
      sourceId: (L == null ? void 0 : L.id) ?? p.sourceId,
      targetId: (Z == null ? void 0 : Z.id) ?? (F == null ? void 0 : F.id) ?? p.targetId,
      kind: "flow",
      label: p.name,
      color: Ba[T],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${p.name} [${p.archetype}] — ${T}`
    };
  }), se = new Map((e.apis ?? []).map((p) => [p.id, p])), C = new Set(e.boundedContexts.map((p) => p.id)), Y = (e.apiImplementations ?? []).filter(
    (p) => se.has(p.apiId) && C.has(p.boundedContextId)
  );
  (e.uis ?? []).filter((p) => !p.boundedContextId).forEach((p, T) => {
    const H = t[p.id] ?? { x: 180 + T * 200, y: 40 };
    d.push({
      id: p.id,
      label: p.name,
      x: H.x,
      y: H.y,
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
  const B = new Set(d.map((p) => p.id)), O = Eo(e, i), W = /* @__PURE__ */ new Map(), x = (p) => {
    const T = W.get(p);
    if (T !== void 0) return T;
    let H = p;
    for (let L = 0; H && L < 16; L++) {
      if (B.has(H))
        return W.set(p, H), H;
      H = O.get(H);
    }
    return W.set(p, null), null;
  }, w = { has: (p) => x(p) !== null }, R = (p) => {
    const T = /* @__PURE__ */ new Set(), H = [];
    for (const L of p) {
      if (L.kind === "contains" || L.targetId.startsWith("edgeanchor:")) {
        H.push(L);
        continue;
      }
      const F = x(L.sourceId), Z = x(L.targetId);
      if (!F || !Z || F === Z) continue;
      if (F === L.sourceId && Z === L.targetId) {
        H.push(L);
        continue;
      }
      const ue = `${L.kind}|${F}|${Z}`;
      T.has(ue) || (T.add(ue), H.push({
        ...L,
        sourceId: F,
        targetId: Z,
        tooltip: `${L.tooltip ?? L.kind} — de un elemento plegado dentro`
      }));
    }
    return H;
  }, $ = a ? [
    ...(e.services ?? []).flatMap(
      (p) => (p.moduleIds ?? []).map((T) => {
        var L;
        if (!w.has(p.id)) return null;
        const H = w.has(T) ? T : (L = (e.modules ?? []).find((F) => F.id === T)) == null ? void 0 : L.boundedContextId;
        return !H || !w.has(H) ? null : {
          id: `deploy:${p.id}->${T}`,
          sourceId: p.id,
          targetId: H,
          kind: "deploys",
          color: "#334155",
          dashed: !0,
          arrow: !0,
          tooltip: `desplegado en ${p.name} — Supr lo desconecta`
        };
      }).filter((T) => T !== null)
    ),
    ...(e.services ?? []).flatMap(
      (p) => (p.urlIds ?? []).filter((T) => w.has(p.id) && w.has(T)).map((T) => ({
        id: `svcurl:${p.id}->${T}`,
        sourceId: p.id,
        targetId: T,
        kind: "service-url",
        color: "#0e7490",
        arrow: !0,
        tooltip: `${p.name} responde en esta URL — Supr lo desconecta`
      }))
    ),
    ...(e.services ?? []).flatMap((p) => {
      const T = [];
      return p.database && w.has(`infra-db:${p.database}`) && w.has(p.id) && T.push({
        id: `infradb:${p.id}`,
        sourceId: p.id,
        targetId: `infra-db:${p.database}`,
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} persiste en ${p.database}`
      }), p.outboxEnabled && w.has("infra-broker") && w.has(p.id) && T.push({
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
  ] : [], k = r ? (e.emissions ?? []).filter((p) => w.has(p.sourceId) && w.has(p.domainEventId)).map((p) => ({
    id: `emit:${p.sourceId}->${p.domainEventId}`,
    sourceId: p.sourceId,
    targetId: p.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], P = r ? (e.projections ?? []).map((p) => ({
    p,
    source: p.sourceAggregateId ?? p.sourceExternalUseCaseId ?? p.sourceExternalTableId
  })).filter(({ p, source: T }) => T && p.readModelId).filter(({ p, source: T }) => w.has(T) && w.has(p.readModelId)).map(({ p, source: T }) => ({
    id: `proj:${p.id}`,
    sourceId: T,
    targetId: p.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: p.sourceAggregateId ? `Proyección ${p.name}: el estado del agregado se materializa en ${p.readModelName ?? p.readModelId}` : `Proyección ${p.name}: polling hacia ${p.readModelName ?? p.readModelId}`
  })) : [], M = (e.apis ?? []).flatMap(
    (p) => p.operations.flatMap((T) => {
      const H = r && T.targetUseCaseId && w.has(T.targetUseCaseId) ? T.targetUseCaseId : T.targetBoundedContextId && w.has(T.targetBoundedContextId) ? T.targetBoundedContextId : (T.targetUseCaseId && !r, null);
      if (!H) return [];
      const L = r && w.has(T.id) ? T.id : p.id;
      return w.has(L) ? [
        {
          id: `apiwire:${T.id}`,
          sourceId: L,
          targetId: H,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${T.name} la implementa ${H}`
        }
      ] : [];
    })
  ), q = r ? (e.useCaseCalls ?? []).filter((p) => w.has(p.sourceId) && w.has(p.targetId)).map((p) => ({
    id: `uccall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], D = [
    ...e.boundedContexts.filter((p) => p.identityProviderId && w.has(p.id) && w.has(p.identityProviderId)).map((p) => ({
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
    ...(e.etlFlows ?? []).filter((p) => p.identityProviderId && w.has(p.identityProviderId)).flatMap((p) => {
      const T = w.has(p.id) ? p.id : p.ownerBoundedContextId && w.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
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
    ...(e.identityProviders ?? []).filter((p) => p.publishedByExternalSystemId && w.has(p.id) && w.has(p.publishedByExternalSystemId)).map((p) => ({
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
  ], z = r ? e.boundedContexts.flatMap((p) => p.scheduledTriggers ?? []).filter((p) => p.useCaseId && w.has(p.id) && w.has(p.useCaseId)).map((p) => ({
    id: `stfire:${p.id}->${p.useCaseId}`,
    sourceId: p.id,
    targetId: p.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: p.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${p.cronExpression ?? "cron"}`
  })) : [], j = r ? (e.aggregateCalls ?? []).filter((p) => w.has(p.sourceId) && w.has(p.targetId)).map((p) => ({
    id: `aggcall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], X = r ? (e.queryCalls ?? []).filter((p) => w.has(p.sourceId) && w.has(p.targetId)).map((p) => ({
    id: `qscall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], le = r ? (e.actorUses ?? []).filter((p) => w.has(p.actorId) && w.has(p.targetId)).map((p) => ({
    id: `use:${p.actorId}->${p.targetId}`,
    sourceId: p.actorId,
    targetId: p.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], Ee = (e.actorExternalDependencies ?? []).filter((p) => w.has(p.actorId) && w.has(p.externalSystemId)).map((p) => ({
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
  ]), ee = (p) => w.has(p) ? p : K.get(p) ?? p, fe = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((p) => ({
        sourceId: p.sourceId,
        targetId: ee(p.targetId),
        cqrs: p.type === "CQRS"
      })).filter(
        (p) => w.has(p.sourceId) && w.has(p.targetId) && p.sourceId !== p.targetId
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
  const Ie = (p) => w.has(p) ? p : Ae.get(p) ?? p, Se = /* @__PURE__ */ new Map();
  for (const p of e.boundedContexts) {
    for (const T of p.domainEvents ?? []) Se.set(T.name, T.id);
    for (const T of p.applicationEvents ?? []) Se.set(T.name, T.id);
  }
  const be = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (p) => (p.steps ?? []).filter((T) => T.targetUseCaseId).map((T) => ({ sourceId: p.id, targetId: Ie(T.targetUseCaseId) }))
      ).filter((p) => w.has(p.sourceId) && w.has(p.targetId)).map((p) => [
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
  ], Q = [
    ...new Map(
      (e.workflows ?? []).filter((p) => p.triggerEvent && Se.has(p.triggerEvent)).map((p) => ({
        sourceId: Ie(Se.get(p.triggerEvent)),
        targetId: p.id,
        label: p.triggerEvent
      })).filter((p) => w.has(p.sourceId) && w.has(p.targetId)).map((p) => [
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
  ], te = /* @__PURE__ */ new Map();
  for (const p of e.externalSystems)
    for (const T of p.tables ?? []) te.set(T.id, p.id);
  const _e = (e.notifications ?? []).flatMap((p) => {
    var L;
    const T = w.has(p.id) ? p.id : p.ownerBoundedContextId && w.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
    if (!T) return [];
    const H = [];
    if (p.eventId) {
      const F = w.has(p.eventId) ? p.eventId : Ae.get(p.eventId);
      F && w.has(F) && F !== T && H.push({
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
      w.has(F) && H.push({
        id: `notifto:${p.id}:${F}`,
        sourceId: T,
        targetId: F,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((L = (p.channels ?? [])[0]) == null ? void 0 : L.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} avisa a este rol — Supr lo quita`
      });
    return H;
  }), Ne = (e.documents ?? []).flatMap((p) => {
    const T = w.has(p.id) ? p.id : p.ownerBoundedContextId && w.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
    if (!T || !p.queryServiceId) return [];
    const H = w.has(p.queryServiceId) ? p.queryServiceId : Ae.get(p.queryServiceId);
    return !H || !w.has(H) || H === T ? [] : [{
      id: `docq:${p.id}`,
      sourceId: H,
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
      const H = w.has(p.id) ? p.id : p.ownerBoundedContextId && w.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
      if (!H) return [];
      const L = T.externalTableId ?? T.operationId ?? T.apiId ?? T.eventId;
      if (!L) return [];
      let F = L;
      if (!w.has(F) && T.operationId && T.apiId && (F = T.apiId), !w.has(F) && T.externalTableId && (F = te.get(T.externalTableId) ?? F), w.has(F) || (F = ee(F)), w.has(F) || (F = Ae.get(L) ?? F), !w.has(F) || F === H) return [];
      const Z = T.type.startsWith("SOURCE");
      return [{
        id: `etl:${p.id}:${T.id}`,
        sourceId: Z ? F : H,
        targetId: Z ? H : F,
        kind: Z ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: T.type === "SOURCE_PULL" ? "pull" : T.type === "SOURCE_CONSUMER" ? "consume" : T.type === "WRITE_API" ? "api" : T.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: Z ? `${p.name} lee de aquí (${T.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${p.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), De = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (p) => (p.sourceExternalTableIds ?? []).map((T) => ({
          sourceId: w.has(T) ? T : te.get(T) ?? T,
          targetId: p.id,
          name: p.name
        }))
      ).filter((p) => w.has(p.sourceId) && w.has(p.targetId)).map((p) => [
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
  ], at = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (p) => (p.sourceApiIds ?? []).map((T) => ({
          sourceId: ee(T),
          targetId: p.id,
          name: p.name
        }))
      ).filter((p) => w.has(p.sourceId) && w.has(p.targetId)).map((p) => [
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
  ], St = [
    ...new Map(
      (e.rags ?? []).flatMap((p) => [
        ...(p.sourceExternalSystemIds ?? []).map((T) => ({ sourceId: T, targetId: p.id, name: p.name })),
        ...(p.sourceBoundedContextIds ?? []).map((T) => ({ sourceId: T, targetId: p.id, name: p.name }))
      ]).filter((p) => w.has(p.sourceId) && w.has(p.targetId)).map((p) => [
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
  ], si = [
    ...new Map(
      (e.agentApiUses ?? []).map((p) => ({ sourceId: p.agentId, targetId: ee(p.apiId) })).filter((p) => w.has(p.sourceId) && w.has(p.targetId)).map((p) => [
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
  ], ha = (p) => p.onCompletionEventName || `${p.name.replace(/\s+/g, "")}Completado`, ga = (e.workflows ?? []).flatMap(
    (p) => p.triggerEvent ? (e.workflows ?? []).filter((T) => T.id !== p.id && ha(T) === p.triggerEvent).filter((T) => w.has(T.id) && w.has(p.id)).map((T) => ({
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
  ), ya = [
    ...new Map(
      (e.proxyApis ?? []).filter((p) => p.targetApiId).map((p) => ({ sourceId: ee(p.id), targetId: ee(p.targetApiId) })).filter(
        (p) => w.has(p.sourceId) && w.has(p.targetId) && p.sourceId !== p.targetId
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
  ], ba = Y.flatMap((p) => {
    const T = bt(p.apiId, p.boundedContextId);
    if (!w.has(T)) return [];
    const H = [];
    for (const L of (e.proxyApis ?? []).filter((F) => F.targetApiId === p.apiId)) {
      const F = ee(L.id);
      w.has(F) && F !== T && H.push({
        id: `pxr:${F}->${T}`,
        sourceId: F,
        targetId: T,
        kind: "proxy-route",
        color: "#0e7490",
        // A derived route, not a relation the user drew: dotted, toned down and
        // arrow-less so it never reads like a serving/association from the proxy.
        dashArray: "2 5",
        arrow: !1,
        faint: !0,
        tooltip: "el proxy enruta a esta implementación (ruta derivada, no una relación)"
      });
    }
    return H;
  }), va = (e.proxyOperationRoutes ?? []).flatMap((p) => {
    const T = (e.proxyApis ?? []).find((F) => F.id === p.proxyId);
    if (!(T != null && T.targetApiId)) return [];
    const H = vt(p.operationId, p.proxyId), L = p.targetSiteId === T.targetApiId ? T.targetApiId : bt(T.targetApiId, p.targetSiteId);
    return !w.has(H) || !w.has(L) ? [] : [{
      id: `oproute:${H}->${L}`,
      sourceId: H,
      targetId: L,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), xa = [
    ...new Map(
      (e.externalOperationUses ?? []).map((p) => {
        if (!w.has(p.externalSystemId)) return null;
        const T = (e.apis ?? []).find(
          (Z) => Z.operations.some((ue) => ue.id === p.operationId)
        );
        if (!T) return null;
        const H = p.siteId === T.id, L = H ? p.operationId : vt(p.operationId, p.siteId);
        let F = w.has(L) ? L : null;
        if (!F)
          if (H || (e.proxyApis ?? []).some((Z) => Z.id === p.siteId))
            F = ee(p.siteId);
          else {
            const Z = bt(T.id, p.siteId);
            F = w.has(Z) ? Z : p.siteId;
          }
        return !F || !w.has(F) || F === p.externalSystemId ? null : { u: p, target: F };
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
  ], Ia = r ? (e.apiOperationImplementations ?? []).flatMap((p) => {
    if (!w.has(p.useCaseId)) return [];
    const T = w.has(vt(p.operationId, p.boundedContextId)) ? vt(p.operationId, p.boundedContextId) : w.has(bt(p.apiId, p.boundedContextId)) ? bt(p.apiId, p.boundedContextId) : w.has(ee(p.boundedContextId)) ? ee(p.boundedContextId) : null;
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
  }) : [], wa = r ? (e.agentUses ?? []).filter((p) => w.has(p.agentId) && w.has(p.useCaseId)).map((p) => ({
    id: `mcp:${p.agentId}->${p.useCaseId}`,
    sourceId: p.agentId,
    targetId: p.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], ka = (e.agentRags ?? []).filter((p) => w.has(p.agentId) && w.has(p.ragId)).map((p) => ({
    id: `agrag:${p.agentId}->${p.ragId}`,
    sourceId: p.agentId,
    targetId: p.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), $a = r ? (e.rags ?? []).filter((p) => w.has(p.id)).flatMap(
    (p) => (p.sourceReadModelIds ?? []).filter((T) => w.has(T)).map((T) => ({
      id: `ragsrc:${p.id}->${T}`,
      sourceId: p.id,
      targetId: T,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name} indexa este read model`
    }))
  ) : [], _a = r ? (e.agentExternalUses ?? []).filter((p) => w.has(p.agentId) && w.has(p.externalUseCaseId)).map((p) => ({
    id: `mcpx:${p.agentId}->${p.externalUseCaseId}`,
    sourceId: p.agentId,
    targetId: p.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Ca = r ? (e.agentMcpUses ?? []).filter((p) => w.has(p.agentId) && w.has(p.mcpServerId)).map((p) => ({
    id: `mcpsv:${p.agentId}->${p.mcpServerId}`,
    sourceId: p.agentId,
    targetId: p.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], Ea = (e.mcpGateways ?? []).flatMap(
    (p) => [
      ...p.mcpServerIds ?? [],
      ...p.apiIds ?? [],
      ...p.apiOperationIds ?? [],
      ...p.useCaseIds ?? [],
      ...p.ragIds ?? []
    ].filter((T) => w.has(p.id) && w.has(T)).map((T) => ({
      id: `gwx:${p.id}->${T}`,
      sourceId: p.id,
      targetId: T,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Sa = (e.agentGatewayUses ?? []).filter((p) => w.has(p.agentId) && w.has(p.gatewayId)).map((p) => ({
    id: `aggw:${p.agentId}->${p.gatewayId}`,
    sourceId: p.agentId,
    targetId: p.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Aa = r ? (e.agentApiOpUses ?? []).filter((p) => w.has(p.agentId) && w.has(p.apiOperationId)).map((p) => ({
    id: `agapi:${p.agentId}->${p.apiOperationId}`,
    sourceId: p.agentId,
    targetId: p.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Ma = r ? (e.agentQueryUses ?? []).filter((p) => w.has(p.agentId) && w.has(p.queryServiceId)).map((p) => ({
    id: `agqs:${p.agentId}->${p.queryServiceId}`,
    sourceId: p.agentId,
    targetId: p.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Pa = (e.agentDelegations ?? []).filter((p) => w.has(p.agentId) && w.has(p.delegateAgentId)).map((p) => ({
    id: `agag:${p.agentId}->${p.delegateAgentId}`,
    sourceId: p.agentId,
    targetId: p.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Ta = (e.actorAgentUses ?? []).filter((p) => w.has(p.actorId) && w.has(p.agentId)).map((p) => ({
    id: `useag:${p.actorId}->${p.agentId}`,
    sourceId: p.actorId,
    targetId: p.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Oa = r ? (e.agentTriggers ?? []).filter((p) => w.has(p.eventId) && w.has(p.agentId)).map((p) => ({
    id: `evag:${p.eventId}->${p.agentId}`,
    sourceId: p.eventId,
    targetId: p.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Ra = r ? (e.externalCalls ?? []).filter((p) => w.has(p.externalSystemId) && w.has(p.useCaseId)).map((p) => ({
    id: `extcall:${p.externalSystemId}->${p.useCaseId}`,
    sourceId: p.externalSystemId,
    targetId: p.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Na = r ? (e.externalUseCaseCalls ?? []).filter((p) => w.has(p.sourceId) && w.has(p.targetId)).map((p) => ({
    id: `extuccall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "ext-uc-call",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "llama (derivará gateway/API)"
  })) : [], Da = (e.uis ?? []).flatMap((p) => [
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
  ]), La = (e.archimateRelations ?? []).map((p) => ({
    id: `archi:${p.id}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "archimate-relation",
    color: "#475569",
    label: p.label || void 0,
    ...Ja[p.type] ?? {},
    tooltip: `${So[p.type] ?? p.type} (ArchiMate)${p.label ? ` · ${p.label}` : ""} — doble click retipa o invierte el sentido · Supr la borra`
  }));
  return {
    nodes: d,
    edges: R([
      // Composition first: the ownership diamonds paint under the semantic edges.
      ...c,
      ...La,
      ...Da,
      ...$,
      ...V,
      ...G,
      ...k,
      ...P,
      ...M,
      ...q,
      ...z,
      ...D,
      ..._e,
      ...Ne,
      ...We,
      ...j,
      ...X,
      ...le,
      ...Ee,
      ...fe,
      ...ya,
      ...ba,
      ...va,
      ...xa,
      ...Ia,
      ...be,
      ...Q,
      ...ga,
      ...si,
      ...De,
      ...at,
      ...St,
      ...wa,
      ..._a,
      ...Ca,
      ...Ea,
      ...Sa,
      ...Aa,
      ...Ma,
      ...Pa,
      ...Ta,
      ...Oa,
      ...ka,
      ...$a,
      ...N,
      ...Ra,
      ...Na
    ])
  };
}
const ts = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, is = 176, ns = 60, os = 140, as = 40, ss = 140, rs = 40;
function ds(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [], o = e.valueObjects ?? [];
  return e.boundedContexts.forEach((s, a) => {
    const r = 220 + a * 340;
    i.filter((u) => u.boundedContextId === s.id).forEach((u, h) => {
      const m = n.filter((v) => v.aggregateId === u.id), f = o.filter((v) => v.aggregateId === u.id), g = 140 + h * (170 + (m.length + f.length) * 60);
      t[u.id] = { x: r, y: g }, m.forEach((v, b) => {
        t[v.id] = { x: r + 60, y: g + 100 + b * 60 };
      }), f.forEach((v, b) => {
        t[v.id] = { x: r + 60, y: g + 100 + (m.length + b) * 60 };
      });
    });
  }), i.filter((s) => !e.boundedContexts.some((a) => a.id === s.boundedContextId)).forEach((s, a) => {
    t[s.id] = { x: 220 + a * 340, y: 640 };
  }), t;
}
function ls(e, t) {
  const i = ds(e), n = (b) => t[b] ?? i[b] ?? { x: 200, y: 200 }, o = new Map(e.boundedContexts.map((b) => [b.id, b])), s = (e.aggregates ?? []).map((b) => {
    const d = o.get(b.boundedContextId), c = (d == null ? void 0 : d.subdomainType) ?? "GENERIC", y = n(b.id), _ = (e.entities ?? []).filter((N) => N.aggregateId === b.id).length, A = (e.valueObjects ?? []).filter((N) => N.aggregateId === b.id).length, S = (b.invariants ?? []).length, E = (_ ? ` · 🗂${_}` : "") + (A ? ` · ◈${A}` : "") + (S ? ` · ⚖${S}` : "");
    return {
      id: b.id,
      label: b.name,
      x: y.x,
      y: y.y,
      w: is,
      h: ns,
      kind: "aggregate",
      symbol: "aggregate",
      fill: ts[c],
      stroke: "#64748b",
      badge: `${d ? `${d.name.toUpperCase()} · ` : ""}AGGREGATE${E}`,
      tooltip: `Agregado ${b.name}${d ? ` — contexto ${d.name} (${c})` : ""}${A || _ ? ` · ${_} entidad(es), ${A} value object(s)` : ""}`
    };
  }), a = (e.entities ?? []).map((b) => {
    const d = n(b.id);
    return {
      id: b.id,
      label: b.name,
      x: d.x,
      y: d.y,
      w: os,
      h: as,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${b.name} (dentro del agregado)`
    };
  }), r = (e.valueObjects ?? []).map((b) => {
    const d = n(b.id), c = b.type === "Enum" ? (b.enumValues ?? []).join(" · ") : b.type === "Wrapper" ? b.dataType ?? "" : (b.fields ?? []).map((y) => y.name).join(", ");
    return {
      id: b.id,
      label: b.name,
      x: d.x,
      y: d.y,
      w: ss,
      h: rs,
      kind: "value-object",
      symbol: "value-object",
      fill: "#faf5ff",
      stroke: "#a855f7",
      badge: `VALUE OBJECT${b.type ? ` · ${b.type.toUpperCase()}` : ""}`,
      tooltip: `Value object ${b.name}${c ? ` — ${c}` : ""}`
    };
  }), l = (e.valueObjects ?? []).map((b) => ({
    id: `contains-vo:${b.aggregateId}->${b.id}`,
    sourceId: b.aggregateId,
    targetId: b.id,
    kind: "containment",
    color: "#a855f7",
    dashed: !0,
    tooltip: "Value object dentro del agregado"
  })), u = new Set((e.aggregates ?? []).map((b) => b.id)), h = [
    ...(e.aggregates ?? []).map((b) => ({ id: b.id, ownerKind: "agregado", invariants: b.invariants })),
    ...(e.valueObjects ?? []).map((b) => ({ id: b.id, ownerKind: "value object", invariants: b.invariants })),
    ...(e.entities ?? []).map((b) => ({ id: b.id, ownerKind: "entidad", invariants: b.invariants }))
  ], m = h.flatMap(
    (b) => (b.invariants ?? []).map((d, c) => {
      const y = n(b.id), _ = t[d.id] ?? (u.has(b.id) ? { x: y.x - 150, y: y.y + 90 + c * 52 } : { x: y.x + 160, y: y.y + c * 46 });
      return {
        id: d.id,
        label: d.name,
        x: _.x,
        y: _.y,
        w: 150,
        h: 36,
        kind: "invariant",
        symbol: "shield",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        badge: "⚖ INVARIANTE",
        tooltip: `${d.name} — regla que el ${b.ownerKind} protege; doble click abre su ficha (las condiciones se detallan allí)`
      };
    })
  ), f = h.flatMap(
    (b) => (b.invariants ?? []).map((d) => ({
      id: `protects:${b.id}->${d.id}`,
      sourceId: b.id,
      targetId: d.id,
      kind: "invariant-containment",
      color: "#0f766e",
      dashed: !0,
      tooltip: "Protege esta regla — Supr la retira"
    }))
  ), g = (e.entities ?? []).map((b) => ({
    id: `contains:${b.aggregateId}->${b.id}`,
    sourceId: b.aggregateId,
    targetId: b.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), v = (e.aggregateReferences ?? []).map((b, d) => ({
    id: `aggref:${d}:${b.sourceAggregateId}->${b.targetAggregateId}`,
    sourceId: b.sourceAggregateId,
    targetId: b.targetAggregateId,
    kind: "aggregate-reference",
    label: b.label,
    color: "#475569",
    arrow: !0,
    tooltip: b.label ? `Referencia: ${b.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...s, ...a, ...r, ...m],
    edges: [...g, ...l, ...v, ...f]
  };
}
const cs = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, ps = 150, us = 44, ms = 190, fs = 56, hs = 160, gs = 48;
function ys(e, t) {
  const i = e.externalSystems.find((o) => o.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.boundedContexts.find((o) => o.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function bs(e, t) {
  const i = e.flows, n = [], o = [], s = /* @__PURE__ */ new Set(), a = (r) => {
    var l, u;
    return ((u = (l = e.aggregates) == null ? void 0 : l.find((h) => h.id === r)) == null ? void 0 : u.name) ?? r ?? "?";
  };
  return i.forEach((r, l) => {
    const u = 120 + l * 130, h = cs[r.archetype] ?? "#475569", m = r.triggerAggregateId ?? r.sourceId;
    if (!s.has(m)) {
      s.add(m);
      const d = t[m] ?? { x: 160, y: u };
      n.push({
        id: m,
        label: r.triggerAggregateId ? a(r.triggerAggregateId) : m,
        x: d.x,
        y: d.y,
        w: ps,
        h: us,
        kind: r.triggerAggregateId ? "aggregate" : "boundedContext",
        symbol: r.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: r.triggerAggregateId ? "AGGREGATE" : "BOUNDED_CONTEXT"
      });
    }
    const f = `flow:${r.id}`, g = t[f] ?? { x: 470, y: u };
    n.push({
      id: f,
      label: r.name,
      x: g.x,
      y: g.y,
      w: ms,
      h: fs,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: h,
      badge: r.archetype,
      tooltip: `Flow ${r.name} [${r.archetype}]${r.readModelName ? ` → read model ${r.readModelName}` : ""}${r.targetUseCaseId ? ` → use case ${r.targetUseCaseId}` : ""}`
    });
    const v = ys(e, r), b = `tgt:${v.id}`;
    if (!s.has(b)) {
      s.add(b);
      const d = t[b] ?? { x: 790, y: u };
      n.push({
        id: b,
        label: v.label,
        x: d.x,
        y: d.y,
        w: hs,
        h: gs,
        kind: v.external ? "external-system" : "boundedContext",
        symbol: "component",
        fill: v.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: v.external,
        badge: v.external ? "EXTERNAL" : "BOUNDED_CONTEXT"
      });
    }
    o.push({
      id: `fe:${r.id}:in`,
      sourceId: m,
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
      targetId: b,
      kind: "flow-delivery",
      color: h,
      arrow: !0
    });
  }), { nodes: n, edges: o };
}
const vs = 190, xs = 56, qi = 170, Is = 52;
function wn(e, t) {
  const i = [], n = [], o = (s) => {
    var a;
    return (a = e.boundedContexts.find((r) => r.id === s)) == null ? void 0 : a.name;
  };
  return (e.processes ?? []).forEach((s, a) => {
    const r = 140 + a * 240, l = t[s.id] ?? { x: 150, y: r };
    i.push({
      id: s.id,
      label: s.name,
      x: l.x,
      y: l.y,
      w: vs,
      h: xs,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${s.sla ? ` · SLA ${s.sla}` : ""}`,
      tooltip: `${s.name}${o(s.ownerBoundedContextId) ? ` — contexto ${o(s.ownerBoundedContextId)}` : ""}${s.triggerEvent ? ` · arranca con ${s.triggerEvent}` : ""}`
    });
    let u = s.id;
    if (s.steps.forEach((h, m) => {
      const f = h.type === "HUMAN", g = t[h.id] ?? { x: 150 + (m + 1) * 240, y: r };
      if (i.push({
        id: h.id,
        label: h.name,
        x: g.x,
        y: g.y,
        w: qi,
        h: Is,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${h.roleId ? ` · ${h.roleId}` : ""}${h.deadline ? ` · ⏱ ${h.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${h.name}${h.useCaseId ? ` — use case ${h.useCaseId}` : ""}${h.deadline ? ` · deadline ${h.deadline}` : ""}`
      }), n.push({
        id: `pe:${s.id}:${m}`,
        sourceId: u,
        targetId: h.id,
        kind: "process-seq",
        label: m === 0 ? s.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), h.compensationUseCaseId) {
        const v = `comp:${h.id}`, b = t[v] ?? { x: g.x, y: g.y + 90 };
        i.push({
          id: v,
          label: h.compensationUseCaseId,
          x: b.x,
          y: b.y,
          w: qi,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), n.push({
          id: `pc:${h.id}`,
          sourceId: h.id,
          targetId: v,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      u = h.id;
    }), s.onCompletionEventName) {
      const h = `done:${s.id}`, m = t[h] ?? { x: 150 + (s.steps.length + 1) * 240, y: r };
      i.push({
        id: h,
        label: s.onCompletionEventName,
        x: m.x,
        y: m.y,
        w: qi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${s.id}`,
        sourceId: u,
        targetId: h,
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
const wi = globalThis, cn = wi.ShadowRoot && (wi.ShadyCSS === void 0 || wi.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, pn = Symbol(), kn = /* @__PURE__ */ new WeakMap();
let Mo = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== pn) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (cn && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = kn.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && kn.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ws = (e) => new Mo(typeof e == "string" ? e : e + "", void 0, pn), nt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, s) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[s + 1], e[0]);
  return new Mo(i, e, pn);
}, ks = (e, t) => {
  if (cn) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = wi.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, $n = cn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return ws(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: $s, defineProperty: _s, getOwnPropertyDescriptor: Cs, getOwnPropertyNames: Es, getOwnPropertySymbols: Ss, getPrototypeOf: As } = Object, ut = globalThis, _n = ut.trustedTypes, Ms = _n ? _n.emptyScript : "", Bi = ut.reactiveElementPolyfillSupport, Gt = (e, t) => e, Ei = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ms : null;
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
} }, un = (e, t) => !$s(e, t), Cn = { attribute: !0, type: String, converter: Ei, reflect: !1, useDefault: !1, hasChanged: un };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ut.litPropertyMetadata ?? (ut.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Pt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Cn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && _s(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: s } = Cs(this.prototype, t) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: o, set(a) {
      const r = o == null ? void 0 : o.call(this);
      s == null || s.call(this, a), this.requestUpdate(t, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Cn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Gt("elementProperties"))) return;
    const t = As(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Gt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Gt("properties"))) {
      const i = this.properties, n = [...Es(i), ...Ss(i)];
      for (const o of n) this.createProperty(o, i[o]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, o] of i) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const o = this._$Eu(i, n);
      o !== void 0 && this._$Eh.set(o, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const o of n) i.unshift($n(o));
    } else t !== void 0 && i.push($n(t));
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
    return ks(t, this.constructor.elementStyles), t;
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
    var s;
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const a = (((s = n.converter) == null ? void 0 : s.toAttribute) !== void 0 ? n.converter : Ei).toAttribute(i, n.type);
      this._$Em = t, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var s, a;
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const r = n.getPropertyOptions(o), l = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((s = r.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? r.converter : Ei;
      this._$Em = o;
      const u = l.fromAttribute(i, r.type);
      this[o] = u ?? ((a = this._$Ej) == null ? void 0 : a.get(o)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, s) {
    var a;
    if (t !== void 0) {
      const r = this.constructor;
      if (o === !1 && (s = this[t]), n ?? (n = r.getPropertyOptions(t)), !((n.hasChanged ?? un)(s, i) || n.useDefault && n.reflect && s === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: s }, a) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, a ?? i ?? this[t]), s !== !0 || a !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (n = this._$EO) == null || n.forEach((o) => {
        var s;
        return (s = o.hostUpdate) == null ? void 0 : s.call(o);
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
    (i = this._$EO) == null || i.forEach((n) => {
      var o;
      return (o = n.hostUpdated) == null ? void 0 : o.call(n);
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
Pt.elementStyles = [], Pt.shadowRootOptions = { mode: "open" }, Pt[Gt("elementProperties")] = /* @__PURE__ */ new Map(), Pt[Gt("finalized")] = /* @__PURE__ */ new Map(), Bi == null || Bi({ ReactiveElement: Pt }), (ut.reactiveElementVersions ?? (ut.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = globalThis, En = (e) => e, Si = Ht.trustedTypes, Sn = Si ? Si.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Po = "$lit$", pt = `lit$${Math.random().toFixed(9).slice(2)}$`, To = "?" + pt, Ps = `<${To}>`, Ct = document, Kt = () => Ct.createComment(""), Xt = (e) => e === null || typeof e != "object" && typeof e != "function", mn = Array.isArray, Ts = (e) => mn(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Fi = `[ 	
\f\r]`, Ut = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, An = /-->/g, Mn = />/g, ht = RegExp(`>|${Fi}(?:([^\\s"'>=/]+)(${Fi}*=${Fi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Pn = /'/g, Tn = /"/g, Oo = /^(?:script|style|textarea|title)$/i, Ro = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), I = Ro(1), J = Ro(2), Rt = Symbol.for("lit-noChange"), re = Symbol.for("lit-nothing"), On = /* @__PURE__ */ new WeakMap(), wt = Ct.createTreeWalker(Ct, 129);
function No(e, t) {
  if (!mn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Sn !== void 0 ? Sn.createHTML(t) : t;
}
const Os = (e, t) => {
  const i = e.length - 1, n = [];
  let o, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = Ut;
  for (let r = 0; r < i; r++) {
    const l = e[r];
    let u, h, m = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, h = a.exec(l), h !== null); ) f = a.lastIndex, a === Ut ? h[1] === "!--" ? a = An : h[1] !== void 0 ? a = Mn : h[2] !== void 0 ? (Oo.test(h[2]) && (o = RegExp("</" + h[2], "g")), a = ht) : h[3] !== void 0 && (a = ht) : a === ht ? h[0] === ">" ? (a = o ?? Ut, m = -1) : h[1] === void 0 ? m = -2 : (m = a.lastIndex - h[2].length, u = h[1], a = h[3] === void 0 ? ht : h[3] === '"' ? Tn : Pn) : a === Tn || a === Pn ? a = ht : a === An || a === Mn ? a = Ut : (a = ht, o = void 0);
    const g = a === ht && e[r + 1].startsWith("/>") ? " " : "";
    s += a === Ut ? l + Ps : m >= 0 ? (n.push(u), l.slice(0, m) + Po + l.slice(m) + pt + g) : l + pt + (m === -2 ? r : g);
  }
  return [No(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Qt {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let s = 0, a = 0;
    const r = t.length - 1, l = this.parts, [u, h] = Os(t, i);
    if (this.el = Qt.createElement(u, n), wt.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (o = wt.nextNode()) !== null && l.length < r; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const m of o.getAttributeNames()) if (m.endsWith(Po)) {
          const f = h[a++], g = o.getAttribute(m).split(pt), v = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: s, name: v[2], strings: g, ctor: v[1] === "." ? Ns : v[1] === "?" ? Ds : v[1] === "@" ? Ls : Di }), o.removeAttribute(m);
        } else m.startsWith(pt) && (l.push({ type: 6, index: s }), o.removeAttribute(m));
        if (Oo.test(o.tagName)) {
          const m = o.textContent.split(pt), f = m.length - 1;
          if (f > 0) {
            o.textContent = Si ? Si.emptyScript : "";
            for (let g = 0; g < f; g++) o.append(m[g], Kt()), wt.nextNode(), l.push({ type: 2, index: ++s });
            o.append(m[f], Kt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === To) l.push({ type: 2, index: s });
      else {
        let m = -1;
        for (; (m = o.data.indexOf(pt, m + 1)) !== -1; ) l.push({ type: 7, index: s }), m += pt.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = Ct.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Nt(e, t, i = e, n) {
  var a, r;
  if (t === Rt) return t;
  let o = n !== void 0 ? (a = i._$Co) == null ? void 0 : a[n] : i._$Cl;
  const s = Xt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== s && ((r = o == null ? void 0 : o._$AO) == null || r.call(o, !1), s === void 0 ? o = void 0 : (o = new s(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = o : i._$Cl = o), o !== void 0 && (t = Nt(e, o._$AS(e, t.values), o, n)), t;
}
class Rs {
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
    const { el: { content: i }, parts: n } = this._$AD, o = ((t == null ? void 0 : t.creationScope) ?? Ct).importNode(i, !0);
    wt.currentNode = o;
    let s = wt.nextNode(), a = 0, r = 0, l = n[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let u;
        l.type === 2 ? u = new ni(s, s.nextSibling, this, t) : l.type === 1 ? u = new l.ctor(s, l.name, l.strings, this, t) : l.type === 6 && (u = new Us(s, this, t)), this._$AV.push(u), l = n[++r];
      }
      a !== (l == null ? void 0 : l.index) && (s = wt.nextNode(), a++);
    }
    return wt.currentNode = Ct, o;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class ni {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, o) {
    this.type = 2, this._$AH = re, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = o, this._$Cv = (o == null ? void 0 : o.isConnected) ?? !0;
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
    t = Nt(this, t, i), Xt(t) ? t === re || t == null || t === "" ? (this._$AH !== re && this._$AR(), this._$AH = re) : t !== this._$AH && t !== Rt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ts(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== re && Xt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ct.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Qt.createElement(No(n.h, n.h[0]), this.options)), n);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === o) this._$AH.p(i);
    else {
      const a = new Rs(o, this), r = a.u(this.options);
      a.p(i), this.T(r), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = On.get(t.strings);
    return i === void 0 && On.set(t.strings, i = new Qt(t)), i;
  }
  k(t) {
    mn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const s of t) o === i.length ? i.push(n = new ni(this.O(Kt()), this.O(Kt()), this, this.options)) : n = i[o], n._$AI(s), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const o = En(t).nextSibling;
      En(t).remove(), t = o;
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
  constructor(t, i, n, o, s) {
    this.type = 1, this._$AH = re, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = re;
  }
  _$AI(t, i = this, n, o) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) t = Nt(this, t, i, 0), a = !Xt(t) || t !== this._$AH && t !== Rt, a && (this._$AH = t);
    else {
      const r = t;
      let l, u;
      for (t = s[0], l = 0; l < s.length - 1; l++) u = Nt(this, r[n + l], i, l), u === Rt && (u = this._$AH[l]), a || (a = !Xt(u) || u !== this._$AH[l]), u === re ? t = re : t !== re && (t += (u ?? "") + s[l + 1]), this._$AH[l] = u;
    }
    a && !o && this.j(t);
  }
  j(t) {
    t === re ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ns extends Di {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === re ? void 0 : t;
  }
}
class Ds extends Di {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== re);
  }
}
class Ls extends Di {
  constructor(t, i, n, o, s) {
    super(t, i, n, o, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Nt(this, t, i, 0) ?? re) === Rt) return;
    const n = this._$AH, o = t === re && n !== re || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== re && (n === re || o);
    o && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Us {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Nt(this, t);
  }
}
const Vi = Ht.litHtmlPolyfillSupport;
Vi == null || Vi(Qt, ni), (Ht.litHtmlVersions ?? (Ht.litHtmlVersions = [])).push("3.3.3");
const zs = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const s = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = o = new ni(t.insertBefore(Kt(), s), s, void 0, i ?? {});
  }
  return o._$AI(e), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis;
class je extends Pt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = zs(i, this.renderRoot, this.renderOptions);
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
    return Rt;
  }
}
var _o;
je._$litElement$ = !0, je.finalized = !0, (_o = $t.litElementHydrateSupport) == null || _o.call($t, { LitElement: je });
const Wi = $t.litElementPolyfillSupport;
Wi == null || Wi({ LitElement: je });
($t.litElementVersions ?? ($t.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qs = { attribute: !0, type: String, converter: Ei, reflect: !1, hasChanged: un }, Bs = (e = qs, t, i) => {
  const { kind: n, metadata: o } = i;
  let s = globalThis.litPropertyMetadata.get(o);
  if (s === void 0 && globalThis.litPropertyMetadata.set(o, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), n === "accessor") {
    const { name: a } = i;
    return { set(r) {
      const l = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(a, l, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(a, void 0, e, r), r;
    } };
  }
  if (n === "setter") {
    const { name: a } = i;
    return function(r) {
      const l = this[a];
      t.call(this, r), this.requestUpdate(a, l, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function de(e) {
  return (t, i) => typeof i == "object" ? Bs(e, t, i) : ((n, o, s) => {
    const a = o.hasOwnProperty(s);
    return o.constructor.createProperty(s, n), a ? Object.getOwnPropertyDescriptor(o, s) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function U(e) {
  return de({ ...e, state: !0, attribute: !1 });
}
var Qi = "http://www.w3.org/1999/xhtml";
const Rn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Qi,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Li(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Rn.hasOwnProperty(t) ? { space: Rn[t], local: e } : e;
}
function Fs(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Qi && t.documentElement.namespaceURI === Qi ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Vs(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Do(e) {
  var t = Li(e);
  return (t.local ? Vs : Fs)(t);
}
function Ws() {
}
function fn(e) {
  return e == null ? Ws : function() {
    return this.querySelector(e);
  };
}
function js(e) {
  typeof e != "function" && (e = fn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var s = t[o], a = s.length, r = n[o] = new Array(a), l, u, h = 0; h < a; ++h)
      (l = s[h]) && (u = e.call(l, l.__data__, h, s)) && ("__data__" in l && (u.__data__ = l.__data__), r[h] = u);
  return new Ve(n, this._parents);
}
function Gs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Hs() {
  return [];
}
function Lo(e) {
  return e == null ? Hs : function() {
    return this.querySelectorAll(e);
  };
}
function Ys(e) {
  return function() {
    return Gs(e.apply(this, arguments));
  };
}
function Ks(e) {
  typeof e == "function" ? e = Ys(e) : e = Lo(e);
  for (var t = this._groups, i = t.length, n = [], o = [], s = 0; s < i; ++s)
    for (var a = t[s], r = a.length, l, u = 0; u < r; ++u)
      (l = a[u]) && (n.push(e.call(l, l.__data__, u, a)), o.push(l));
  return new Ve(n, o);
}
function Uo(e) {
  return function() {
    return this.matches(e);
  };
}
function zo(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Xs = Array.prototype.find;
function Qs(e) {
  return function() {
    return Xs.call(this.children, e);
  };
}
function Js() {
  return this.firstElementChild;
}
function Zs(e) {
  return this.select(e == null ? Js : Qs(typeof e == "function" ? e : zo(e)));
}
var er = Array.prototype.filter;
function tr() {
  return Array.from(this.children);
}
function ir(e) {
  return function() {
    return er.call(this.children, e);
  };
}
function nr(e) {
  return this.selectAll(e == null ? tr : ir(typeof e == "function" ? e : zo(e)));
}
function or(e) {
  typeof e != "function" && (e = Uo(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var s = t[o], a = s.length, r = n[o] = [], l, u = 0; u < a; ++u)
      (l = s[u]) && e.call(l, l.__data__, u, s) && r.push(l);
  return new Ve(n, this._parents);
}
function qo(e) {
  return new Array(e.length);
}
function ar() {
  return new Ve(this._enter || this._groups.map(qo), this._parents);
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
function sr(e) {
  return function() {
    return e;
  };
}
function rr(e, t, i, n, o, s) {
  for (var a = 0, r, l = t.length, u = s.length; a < u; ++a)
    (r = t[a]) ? (r.__data__ = s[a], n[a] = r) : i[a] = new Ai(e, s[a]);
  for (; a < l; ++a)
    (r = t[a]) && (o[a] = r);
}
function dr(e, t, i, n, o, s, a) {
  var r, l, u = /* @__PURE__ */ new Map(), h = t.length, m = s.length, f = new Array(h), g;
  for (r = 0; r < h; ++r)
    (l = t[r]) && (f[r] = g = a.call(l, l.__data__, r, t) + "", u.has(g) ? o[r] = l : u.set(g, l));
  for (r = 0; r < m; ++r)
    g = a.call(e, s[r], r, s) + "", (l = u.get(g)) ? (n[r] = l, l.__data__ = s[r], u.delete(g)) : i[r] = new Ai(e, s[r]);
  for (r = 0; r < h; ++r)
    (l = t[r]) && u.get(f[r]) === l && (o[r] = l);
}
function lr(e) {
  return e.__data__;
}
function cr(e, t) {
  if (!arguments.length) return Array.from(this, lr);
  var i = t ? dr : rr, n = this._parents, o = this._groups;
  typeof e != "function" && (e = sr(e));
  for (var s = o.length, a = new Array(s), r = new Array(s), l = new Array(s), u = 0; u < s; ++u) {
    var h = n[u], m = o[u], f = m.length, g = pr(e.call(h, h && h.__data__, u, n)), v = g.length, b = r[u] = new Array(v), d = a[u] = new Array(v), c = l[u] = new Array(f);
    i(h, m, b, d, c, g, t);
    for (var y = 0, _ = 0, A, S; y < v; ++y)
      if (A = b[y]) {
        for (y >= _ && (_ = y + 1); !(S = d[_]) && ++_ < v; ) ;
        A._next = S || null;
      }
  }
  return a = new Ve(a, n), a._enter = r, a._exit = l, a;
}
function pr(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function ur() {
  return new Ve(this._exit || this._groups.map(qo), this._parents);
}
function mr(e, t, i) {
  var n = this.enter(), o = this, s = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), i == null ? s.remove() : i(s), n && o ? n.merge(o).order() : o;
}
function fr(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, o = i.length, s = n.length, a = Math.min(o, s), r = new Array(o), l = 0; l < a; ++l)
    for (var u = i[l], h = n[l], m = u.length, f = r[l] = new Array(m), g, v = 0; v < m; ++v)
      (g = u[v] || h[v]) && (f[v] = g);
  for (; l < o; ++l)
    r[l] = i[l];
  return new Ve(r, this._parents);
}
function hr() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], o = n.length - 1, s = n[o], a; --o >= 0; )
      (a = n[o]) && (s && a.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(a, s), s = a);
  return this;
}
function gr(e) {
  e || (e = yr);
  function t(m, f) {
    return m && f ? e(m.__data__, f.__data__) : !m - !f;
  }
  for (var i = this._groups, n = i.length, o = new Array(n), s = 0; s < n; ++s) {
    for (var a = i[s], r = a.length, l = o[s] = new Array(r), u, h = 0; h < r; ++h)
      (u = a[h]) && (l[h] = u);
    l.sort(t);
  }
  return new Ve(o, this._parents).order();
}
function yr(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function br() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function vr() {
  return Array.from(this);
}
function xr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], o = 0, s = n.length; o < s; ++o) {
      var a = n[o];
      if (a) return a;
    }
  return null;
}
function Ir() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function wr() {
  return !this.node();
}
function kr(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var o = t[i], s = 0, a = o.length, r; s < a; ++s)
      (r = o[s]) && e.call(r, r.__data__, s, o);
  return this;
}
function $r(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function _r(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Cr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Er(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Sr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Ar(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Mr(e, t) {
  var i = Li(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? _r : $r : typeof t == "function" ? i.local ? Ar : Sr : i.local ? Er : Cr)(i, t));
}
function Bo(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Pr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Tr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Or(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function Rr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Pr : typeof t == "function" ? Or : Tr)(e, t, i ?? "")) : Dt(this.node(), e);
}
function Dt(e, t) {
  return e.style.getPropertyValue(t) || Bo(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Nr(e) {
  return function() {
    delete this[e];
  };
}
function Dr(e, t) {
  return function() {
    this[e] = t;
  };
}
function Lr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function Ur(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Nr : typeof t == "function" ? Lr : Dr)(e, t)) : this.node()[e];
}
function Fo(e) {
  return e.trim().split(/^|\s+/);
}
function hn(e) {
  return e.classList || new Vo(e);
}
function Vo(e) {
  this._node = e, this._names = Fo(e.getAttribute("class") || "");
}
Vo.prototype = {
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
function Wo(e, t) {
  for (var i = hn(e), n = -1, o = t.length; ++n < o; ) i.add(t[n]);
}
function jo(e, t) {
  for (var i = hn(e), n = -1, o = t.length; ++n < o; ) i.remove(t[n]);
}
function zr(e) {
  return function() {
    Wo(this, e);
  };
}
function qr(e) {
  return function() {
    jo(this, e);
  };
}
function Br(e, t) {
  return function() {
    (t.apply(this, arguments) ? Wo : jo)(this, e);
  };
}
function Fr(e, t) {
  var i = Fo(e + "");
  if (arguments.length < 2) {
    for (var n = hn(this.node()), o = -1, s = i.length; ++o < s; ) if (!n.contains(i[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Br : t ? zr : qr)(i, t));
}
function Vr() {
  this.textContent = "";
}
function Wr(e) {
  return function() {
    this.textContent = e;
  };
}
function jr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Gr(e) {
  return arguments.length ? this.each(e == null ? Vr : (typeof e == "function" ? jr : Wr)(e)) : this.node().textContent;
}
function Hr() {
  this.innerHTML = "";
}
function Yr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Kr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Xr(e) {
  return arguments.length ? this.each(e == null ? Hr : (typeof e == "function" ? Kr : Yr)(e)) : this.node().innerHTML;
}
function Qr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Jr() {
  return this.each(Qr);
}
function Zr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function ed() {
  return this.each(Zr);
}
function td(e) {
  var t = typeof e == "function" ? e : Do(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function id() {
  return null;
}
function nd(e, t) {
  var i = typeof e == "function" ? e : Do(e), n = t == null ? id : typeof t == "function" ? t : fn(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function od() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function ad() {
  return this.each(od);
}
function sd() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function rd() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function dd(e) {
  return this.select(e ? rd : sd);
}
function ld(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function cd(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function pd(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function ud(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, o = t.length, s; i < o; ++i)
        s = t[i], (!e.type || s.type === e.type) && s.name === e.name ? this.removeEventListener(s.type, s.listener, s.options) : t[++n] = s;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function md(e, t, i) {
  return function() {
    var n = this.__on, o, s = cd(t);
    if (n) {
      for (var a = 0, r = n.length; a < r; ++a)
        if ((o = n[a]).type === e.type && o.name === e.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = s, o.options = i), o.value = t;
          return;
        }
    }
    this.addEventListener(e.type, s, i), o = { type: e.type, name: e.name, value: t, listener: s, options: i }, n ? n.push(o) : this.__on = [o];
  };
}
function fd(e, t, i) {
  var n = pd(e + ""), o, s = n.length, a;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var l = 0, u = r.length, h; l < u; ++l)
        for (o = 0, h = r[l]; o < s; ++o)
          if ((a = n[o]).type === h.type && a.name === h.name)
            return h.value;
    }
    return;
  }
  for (r = t ? md : ud, o = 0; o < s; ++o) this.each(r(n[o], t, i));
  return this;
}
function Go(e, t, i) {
  var n = Bo(e), o = n.CustomEvent;
  typeof o == "function" ? o = new o(t, i) : (o = n.document.createEvent("Event"), i ? (o.initEvent(t, i.bubbles, i.cancelable), o.detail = i.detail) : o.initEvent(t, !1, !1)), e.dispatchEvent(o);
}
function hd(e, t) {
  return function() {
    return Go(this, e, t);
  };
}
function gd(e, t) {
  return function() {
    return Go(this, e, t.apply(this, arguments));
  };
}
function yd(e, t) {
  return this.each((typeof t == "function" ? gd : hd)(e, t));
}
function* bd() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], o = 0, s = n.length, a; o < s; ++o)
      (a = n[o]) && (yield a);
}
var Ho = [null];
function Ve(e, t) {
  this._groups = e, this._parents = t;
}
function oi() {
  return new Ve([[document.documentElement]], Ho);
}
function vd() {
  return this;
}
Ve.prototype = oi.prototype = {
  constructor: Ve,
  select: js,
  selectAll: Ks,
  selectChild: Zs,
  selectChildren: nr,
  filter: or,
  data: cr,
  enter: ar,
  exit: ur,
  join: mr,
  merge: fr,
  selection: vd,
  order: hr,
  sort: gr,
  call: br,
  nodes: vr,
  node: xr,
  size: Ir,
  empty: wr,
  each: kr,
  attr: Mr,
  style: Rr,
  property: Ur,
  classed: Fr,
  text: Gr,
  html: Xr,
  raise: Jr,
  lower: ed,
  append: td,
  insert: nd,
  remove: ad,
  clone: dd,
  datum: ld,
  on: fd,
  dispatch: yd,
  [Symbol.iterator]: bd
};
function Ge(e) {
  return typeof e == "string" ? new Ve([[document.querySelector(e)]], [document.documentElement]) : new Ve([[e]], Ho);
}
function xd(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function gt(e, t) {
  if (e = xd(e), t === void 0 && (t = e.currentTarget), t) {
    var i = t.ownerSVGElement || t;
    if (i.createSVGPoint) {
      var n = i.createSVGPoint();
      return n.x = e.clientX, n.y = e.clientY, n = n.matrixTransform(t.getScreenCTM().inverse()), [n.x, n.y];
    }
    if (t.getBoundingClientRect) {
      var o = t.getBoundingClientRect();
      return [e.clientX - o.left - t.clientLeft, e.clientY - o.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
var Id = { value: () => {
} };
function gn() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new ki(i);
}
function ki(e) {
  this._ = e;
}
function wd(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", o = i.indexOf(".");
    if (o >= 0 && (n = i.slice(o + 1), i = i.slice(0, o)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
ki.prototype = gn.prototype = {
  constructor: ki,
  on: function(e, t) {
    var i = this._, n = wd(e + "", i), o, s = -1, a = n.length;
    if (arguments.length < 2) {
      for (; ++s < a; ) if ((o = (e = n[s]).type) && (o = kd(i[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++s < a; )
      if (o = (e = n[s]).type) i[o] = Nn(i[o], e.name, t);
      else if (t == null) for (o in i) i[o] = Nn(i[o], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new ki(e);
  },
  call: function(e, t) {
    if ((o = arguments.length - 2) > 0) for (var i = new Array(o), n = 0, o, s; n < o; ++n) i[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (s = this._[e], n = 0, o = s.length; n < o; ++n) s[n].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var n = this._[e], o = 0, s = n.length; o < s; ++o) n[o].value.apply(t, i);
  }
};
function kd(e, t) {
  for (var i = 0, n = e.length, o; i < n; ++i)
    if ((o = e[i]).name === t)
      return o.value;
}
function Nn(e, t, i) {
  for (var n = 0, o = e.length; n < o; ++n)
    if (e[n].name === t) {
      e[n] = Id, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Ji = { capture: !0, passive: !1 };
function Zi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function $d(e) {
  var t = e.document.documentElement, i = Ge(e).on("dragstart.drag", Zi, Ji);
  "onselectstart" in t ? i.on("selectstart.drag", Zi, Ji) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function _d(e, t) {
  var i = e.document.documentElement, n = Ge(e).on("dragstart.drag", null);
  t && (n.on("click.drag", Zi, Ji), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function yn(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function Yo(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function ai() {
}
var Jt = 0.7, Mi = 1 / Jt, Ot = "\\s*([+-]?\\d+)\\s*", Zt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Je = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Cd = /^#([0-9a-f]{3,8})$/, Ed = new RegExp(`^rgb\\(${Ot},${Ot},${Ot}\\)$`), Sd = new RegExp(`^rgb\\(${Je},${Je},${Je}\\)$`), Ad = new RegExp(`^rgba\\(${Ot},${Ot},${Ot},${Zt}\\)$`), Md = new RegExp(`^rgba\\(${Je},${Je},${Je},${Zt}\\)$`), Pd = new RegExp(`^hsl\\(${Zt},${Je},${Je}\\)$`), Td = new RegExp(`^hsla\\(${Zt},${Je},${Je},${Zt}\\)$`), Dn = {
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
yn(ai, ei, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ln,
  // Deprecated! Use color.formatHex.
  formatHex: Ln,
  formatHex8: Od,
  formatHsl: Rd,
  formatRgb: Un,
  toString: Un
});
function Ln() {
  return this.rgb().formatHex();
}
function Od() {
  return this.rgb().formatHex8();
}
function Rd() {
  return Ko(this).formatHsl();
}
function Un() {
  return this.rgb().formatRgb();
}
function ei(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = Cd.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? zn(t) : i === 3 ? new Ue(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? ri(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? ri(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Ed.exec(e)) ? new Ue(t[1], t[2], t[3], 1) : (t = Sd.exec(e)) ? new Ue(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Ad.exec(e)) ? ri(t[1], t[2], t[3], t[4]) : (t = Md.exec(e)) ? ri(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Pd.exec(e)) ? Fn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Td.exec(e)) ? Fn(t[1], t[2] / 100, t[3] / 100, t[4]) : Dn.hasOwnProperty(e) ? zn(Dn[e]) : e === "transparent" ? new Ue(NaN, NaN, NaN, 0) : null;
}
function zn(e) {
  return new Ue(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ri(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new Ue(e, t, i, n);
}
function Nd(e) {
  return e instanceof ai || (e = ei(e)), e ? (e = e.rgb(), new Ue(e.r, e.g, e.b, e.opacity)) : new Ue();
}
function en(e, t, i, n) {
  return arguments.length === 1 ? Nd(e) : new Ue(e, t, i, n ?? 1);
}
function Ue(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
yn(Ue, en, Yo(ai, {
  brighter(e) {
    return e = e == null ? Mi : Math.pow(Mi, e), new Ue(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Jt : Math.pow(Jt, e), new Ue(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ue(_t(this.r), _t(this.g), _t(this.b), Pi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: qn,
  // Deprecated! Use color.formatHex.
  formatHex: qn,
  formatHex8: Dd,
  formatRgb: Bn,
  toString: Bn
}));
function qn() {
  return `#${kt(this.r)}${kt(this.g)}${kt(this.b)}`;
}
function Dd() {
  return `#${kt(this.r)}${kt(this.g)}${kt(this.b)}${kt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Bn() {
  const e = Pi(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${_t(this.r)}, ${_t(this.g)}, ${_t(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Pi(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function _t(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function kt(e) {
  return e = _t(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Fn(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new He(e, t, i, n);
}
function Ko(e) {
  if (e instanceof He) return new He(e.h, e.s, e.l, e.opacity);
  if (e instanceof ai || (e = ei(e)), !e) return new He();
  if (e instanceof He) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, o = Math.min(t, i, n), s = Math.max(t, i, n), a = NaN, r = s - o, l = (s + o) / 2;
  return r ? (t === s ? a = (i - n) / r + (i < n) * 6 : i === s ? a = (n - t) / r + 2 : a = (t - i) / r + 4, r /= l < 0.5 ? s + o : 2 - s - o, a *= 60) : r = l > 0 && l < 1 ? 0 : a, new He(a, r, l, e.opacity);
}
function Ld(e, t, i, n) {
  return arguments.length === 1 ? Ko(e) : new He(e, t, i, n ?? 1);
}
function He(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
yn(He, Ld, Yo(ai, {
  brighter(e) {
    return e = e == null ? Mi : Math.pow(Mi, e), new He(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Jt : Math.pow(Jt, e), new He(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, o = 2 * i - n;
    return new Ue(
      ji(e >= 240 ? e - 240 : e + 120, o, n),
      ji(e, o, n),
      ji(e < 120 ? e + 240 : e - 120, o, n),
      this.opacity
    );
  },
  clamp() {
    return new He(Vn(this.h), di(this.s), di(this.l), Pi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Pi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Vn(this.h)}, ${di(this.s) * 100}%, ${di(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Vn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function di(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ji(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Xo = (e) => () => e;
function Ud(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function zd(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function qd(e) {
  return (e = +e) == 1 ? Qo : function(t, i) {
    return i - t ? zd(t, i, e) : Xo(isNaN(t) ? i : t);
  };
}
function Qo(e, t) {
  var i = t - e;
  return i ? Ud(e, i) : Xo(isNaN(e) ? t : e);
}
const Wn = (function e(t) {
  var i = qd(t);
  function n(o, s) {
    var a = i((o = en(o)).r, (s = en(s)).r), r = i(o.g, s.g), l = i(o.b, s.b), u = Qo(o.opacity, s.opacity);
    return function(h) {
      return o.r = a(h), o.g = r(h), o.b = l(h), o.opacity = u(h), o + "";
    };
  }
  return n.gamma = e, n;
})(1);
function lt(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var tn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Gi = new RegExp(tn.source, "g");
function Bd(e) {
  return function() {
    return e;
  };
}
function Fd(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Vd(e, t) {
  var i = tn.lastIndex = Gi.lastIndex = 0, n, o, s, a = -1, r = [], l = [];
  for (e = e + "", t = t + ""; (n = tn.exec(e)) && (o = Gi.exec(t)); )
    (s = o.index) > i && (s = t.slice(i, s), r[a] ? r[a] += s : r[++a] = s), (n = n[0]) === (o = o[0]) ? r[a] ? r[a] += o : r[++a] = o : (r[++a] = null, l.push({ i: a, x: lt(n, o) })), i = Gi.lastIndex;
  return i < t.length && (s = t.slice(i), r[a] ? r[a] += s : r[++a] = s), r.length < 2 ? l[0] ? Fd(l[0].x) : Bd(t) : (t = l.length, function(u) {
    for (var h = 0, m; h < t; ++h) r[(m = l[h]).i] = m.x(u);
    return r.join("");
  });
}
var jn = 180 / Math.PI, nn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Jo(e, t, i, n, o, s) {
  var a, r, l;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (l = e * i + t * n) && (i -= e * l, n -= t * l), (r = Math.sqrt(i * i + n * n)) && (i /= r, n /= r, l /= r), e * n < t * i && (e = -e, t = -t, l = -l, a = -a), {
    translateX: o,
    translateY: s,
    rotate: Math.atan2(t, e) * jn,
    skewX: Math.atan(l) * jn,
    scaleX: a,
    scaleY: r
  };
}
var li;
function Wd(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? nn : Jo(t.a, t.b, t.c, t.d, t.e, t.f);
}
function jd(e) {
  return e == null || (li || (li = document.createElementNS("http://www.w3.org/2000/svg", "g")), li.setAttribute("transform", e), !(e = li.transform.baseVal.consolidate())) ? nn : (e = e.matrix, Jo(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Zo(e, t, i, n) {
  function o(u) {
    return u.length ? u.pop() + " " : "";
  }
  function s(u, h, m, f, g, v) {
    if (u !== m || h !== f) {
      var b = g.push("translate(", null, t, null, i);
      v.push({ i: b - 4, x: lt(u, m) }, { i: b - 2, x: lt(h, f) });
    } else (m || f) && g.push("translate(" + m + t + f + i);
  }
  function a(u, h, m, f) {
    u !== h ? (u - h > 180 ? h += 360 : h - u > 180 && (u += 360), f.push({ i: m.push(o(m) + "rotate(", null, n) - 2, x: lt(u, h) })) : h && m.push(o(m) + "rotate(" + h + n);
  }
  function r(u, h, m, f) {
    u !== h ? f.push({ i: m.push(o(m) + "skewX(", null, n) - 2, x: lt(u, h) }) : h && m.push(o(m) + "skewX(" + h + n);
  }
  function l(u, h, m, f, g, v) {
    if (u !== m || h !== f) {
      var b = g.push(o(g) + "scale(", null, ",", null, ")");
      v.push({ i: b - 4, x: lt(u, m) }, { i: b - 2, x: lt(h, f) });
    } else (m !== 1 || f !== 1) && g.push(o(g) + "scale(" + m + "," + f + ")");
  }
  return function(u, h) {
    var m = [], f = [];
    return u = e(u), h = e(h), s(u.translateX, u.translateY, h.translateX, h.translateY, m, f), a(u.rotate, h.rotate, m, f), r(u.skewX, h.skewX, m, f), l(u.scaleX, u.scaleY, h.scaleX, h.scaleY, m, f), u = h = null, function(g) {
      for (var v = -1, b = f.length, d; ++v < b; ) m[(d = f[v]).i] = d.x(g);
      return m.join("");
    };
  };
}
var Gd = Zo(Wd, "px, ", "px)", "deg)"), Hd = Zo(jd, ", ", ")", ")"), Yd = 1e-12;
function Gn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Kd(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Xd(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Qd = (function e(t, i, n) {
  function o(s, a) {
    var r = s[0], l = s[1], u = s[2], h = a[0], m = a[1], f = a[2], g = h - r, v = m - l, b = g * g + v * v, d, c;
    if (b < Yd)
      c = Math.log(f / u) / t, d = function(N) {
        return [
          r + N * g,
          l + N * v,
          u * Math.exp(t * N * c)
        ];
      };
    else {
      var y = Math.sqrt(b), _ = (f * f - u * u + n * b) / (2 * u * i * y), A = (f * f - u * u - n * b) / (2 * f * i * y), S = Math.log(Math.sqrt(_ * _ + 1) - _), E = Math.log(Math.sqrt(A * A + 1) - A);
      c = (E - S) / t, d = function(N) {
        var V = N * c, G = Gn(S), se = u / (i * y) * (G * Xd(t * V + S) - Kd(S));
        return [
          r + se * g,
          l + se * v,
          u * G / Gn(t * V + S)
        ];
      };
    }
    return d.duration = c * 1e3 * t / Math.SQRT2, d;
  }
  return o.rho = function(s) {
    var a = Math.max(1e-3, +s), r = a * a, l = r * r;
    return e(a, r, l);
  }, o;
})(Math.SQRT2, 2, 4);
var Lt = 0, Vt = 0, zt = 0, ea = 1e3, Ti, Wt, Oi = 0, Et = 0, Ui = 0, ti = typeof performance == "object" && performance.now ? performance : Date, ta = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function bn() {
  return Et || (ta(Jd), Et = ti.now() + Ui);
}
function Jd() {
  Et = 0;
}
function Ri() {
  this._call = this._time = this._next = null;
}
Ri.prototype = ia.prototype = {
  constructor: Ri,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? bn() : +i) + (t == null ? 0 : +t), !this._next && Wt !== this && (Wt ? Wt._next = this : Ti = this, Wt = this), this._call = e, this._time = i, on();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, on());
  }
};
function ia(e, t, i) {
  var n = new Ri();
  return n.restart(e, t, i), n;
}
function Zd() {
  bn(), ++Lt;
  for (var e = Ti, t; e; )
    (t = Et - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Lt;
}
function Hn() {
  Et = (Oi = ti.now()) + Ui, Lt = Vt = 0;
  try {
    Zd();
  } finally {
    Lt = 0, tl(), Et = 0;
  }
}
function el() {
  var e = ti.now(), t = e - Oi;
  t > ea && (Ui -= t, Oi = e);
}
function tl() {
  for (var e, t = Ti, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Ti = i);
  Wt = e, on(n);
}
function on(e) {
  if (!Lt) {
    Vt && (Vt = clearTimeout(Vt));
    var t = e - Et;
    t > 24 ? (e < 1 / 0 && (Vt = setTimeout(Hn, e - ti.now() - Ui)), zt && (zt = clearInterval(zt))) : (zt || (Oi = ti.now(), zt = setInterval(el, ea)), Lt = 1, ta(Hn));
  }
}
function Yn(e, t, i) {
  var n = new Ri();
  return t = t == null ? 0 : +t, n.restart((o) => {
    n.stop(), e(o + t);
  }, t, i), n;
}
var il = gn("start", "end", "cancel", "interrupt"), nl = [], na = 0, Kn = 1, an = 2, $i = 3, Xn = 4, sn = 5, _i = 6;
function zi(e, t, i, n, o, s) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (i in a) return;
  ol(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: o,
    // For context during callback.
    on: il,
    tween: nl,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: na
  });
}
function vn(e, t) {
  var i = Ke(e, t);
  if (i.state > na) throw new Error("too late; already scheduled");
  return i;
}
function Ze(e, t) {
  var i = Ke(e, t);
  if (i.state > $i) throw new Error("too late; already running");
  return i;
}
function Ke(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function ol(e, t, i) {
  var n = e.__transition, o;
  n[t] = i, i.timer = ia(s, 0, i.time);
  function s(u) {
    i.state = Kn, i.timer.restart(a, i.delay, i.time), i.delay <= u && a(u - i.delay);
  }
  function a(u) {
    var h, m, f, g;
    if (i.state !== Kn) return l();
    for (h in n)
      if (g = n[h], g.name === i.name) {
        if (g.state === $i) return Yn(a);
        g.state === Xn ? (g.state = _i, g.timer.stop(), g.on.call("interrupt", e, e.__data__, g.index, g.group), delete n[h]) : +h < t && (g.state = _i, g.timer.stop(), g.on.call("cancel", e, e.__data__, g.index, g.group), delete n[h]);
      }
    if (Yn(function() {
      i.state === $i && (i.state = Xn, i.timer.restart(r, i.delay, i.time), r(u));
    }), i.state = an, i.on.call("start", e, e.__data__, i.index, i.group), i.state === an) {
      for (i.state = $i, o = new Array(f = i.tween.length), h = 0, m = -1; h < f; ++h)
        (g = i.tween[h].value.call(e, e.__data__, i.index, i.group)) && (o[++m] = g);
      o.length = m + 1;
    }
  }
  function r(u) {
    for (var h = u < i.duration ? i.ease.call(null, u / i.duration) : (i.timer.restart(l), i.state = sn, 1), m = -1, f = o.length; ++m < f; )
      o[m].call(e, h);
    i.state === sn && (i.on.call("end", e, e.__data__, i.index, i.group), l());
  }
  function l() {
    i.state = _i, i.timer.stop(), delete n[t];
    for (var u in n) return;
    delete e.__transition;
  }
}
function Ci(e, t) {
  var i = e.__transition, n, o, s = !0, a;
  if (i) {
    t = t == null ? null : t + "";
    for (a in i) {
      if ((n = i[a]).name !== t) {
        s = !1;
        continue;
      }
      o = n.state > an && n.state < sn, n.state = _i, n.timer.stop(), n.on.call(o ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[a];
    }
    s && delete e.__transition;
  }
}
function al(e) {
  return this.each(function() {
    Ci(this, e);
  });
}
function sl(e, t) {
  var i, n;
  return function() {
    var o = Ze(this, e), s = o.tween;
    if (s !== i) {
      n = i = s;
      for (var a = 0, r = n.length; a < r; ++a)
        if (n[a].name === t) {
          n = n.slice(), n.splice(a, 1);
          break;
        }
    }
    o.tween = n;
  };
}
function rl(e, t, i) {
  var n, o;
  if (typeof i != "function") throw new Error();
  return function() {
    var s = Ze(this, e), a = s.tween;
    if (a !== n) {
      o = (n = a).slice();
      for (var r = { name: t, value: i }, l = 0, u = o.length; l < u; ++l)
        if (o[l].name === t) {
          o[l] = r;
          break;
        }
      l === u && o.push(r);
    }
    s.tween = o;
  };
}
function dl(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = Ke(this.node(), i).tween, o = 0, s = n.length, a; o < s; ++o)
      if ((a = n[o]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? sl : rl)(i, e, t));
}
function xn(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var o = Ze(this, n);
    (o.value || (o.value = {}))[t] = i.apply(this, arguments);
  }), function(o) {
    return Ke(o, n).value[t];
  };
}
function oa(e, t) {
  var i;
  return (typeof t == "number" ? lt : t instanceof ei ? Wn : (i = ei(t)) ? (t = i, Wn) : Vd)(e, t);
}
function ll(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function cl(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function pl(e, t, i) {
  var n, o = i + "", s;
  return function() {
    var a = this.getAttribute(e);
    return a === o ? null : a === n ? s : s = t(n = a, i);
  };
}
function ul(e, t, i) {
  var n, o = i + "", s;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === o ? null : a === n ? s : s = t(n = a, i);
  };
}
function ml(e, t, i) {
  var n, o, s;
  return function() {
    var a, r = i(this), l;
    return r == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), l = r + "", a === l ? null : a === n && l === o ? s : (o = l, s = t(n = a, r)));
  };
}
function fl(e, t, i) {
  var n, o, s;
  return function() {
    var a, r = i(this), l;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), l = r + "", a === l ? null : a === n && l === o ? s : (o = l, s = t(n = a, r)));
  };
}
function hl(e, t) {
  var i = Li(e), n = i === "transform" ? Hd : oa;
  return this.attrTween(e, typeof t == "function" ? (i.local ? fl : ml)(i, n, xn(this, "attr." + e, t)) : t == null ? (i.local ? cl : ll)(i) : (i.local ? ul : pl)(i, n, t));
}
function gl(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function yl(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function bl(e, t) {
  var i, n;
  function o() {
    var s = t.apply(this, arguments);
    return s !== n && (i = (n = s) && yl(e, s)), i;
  }
  return o._value = t, o;
}
function vl(e, t) {
  var i, n;
  function o() {
    var s = t.apply(this, arguments);
    return s !== n && (i = (n = s) && gl(e, s)), i;
  }
  return o._value = t, o;
}
function xl(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = Li(e);
  return this.tween(i, (n.local ? bl : vl)(n, t));
}
function Il(e, t) {
  return function() {
    vn(this, e).delay = +t.apply(this, arguments);
  };
}
function wl(e, t) {
  return t = +t, function() {
    vn(this, e).delay = t;
  };
}
function kl(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Il : wl)(t, e)) : Ke(this.node(), t).delay;
}
function $l(e, t) {
  return function() {
    Ze(this, e).duration = +t.apply(this, arguments);
  };
}
function _l(e, t) {
  return t = +t, function() {
    Ze(this, e).duration = t;
  };
}
function Cl(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? $l : _l)(t, e)) : Ke(this.node(), t).duration;
}
function El(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ze(this, e).ease = t;
  };
}
function Sl(e) {
  var t = this._id;
  return arguments.length ? this.each(El(t, e)) : Ke(this.node(), t).ease;
}
function Al(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ze(this, e).ease = i;
  };
}
function Ml(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Al(this._id, e));
}
function Pl(e) {
  typeof e != "function" && (e = Uo(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var s = t[o], a = s.length, r = n[o] = [], l, u = 0; u < a; ++u)
      (l = s[u]) && e.call(l, l.__data__, u, s) && r.push(l);
  return new it(n, this._parents, this._name, this._id);
}
function Tl(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, o = i.length, s = Math.min(n, o), a = new Array(n), r = 0; r < s; ++r)
    for (var l = t[r], u = i[r], h = l.length, m = a[r] = new Array(h), f, g = 0; g < h; ++g)
      (f = l[g] || u[g]) && (m[g] = f);
  for (; r < n; ++r)
    a[r] = t[r];
  return new it(a, this._parents, this._name, this._id);
}
function Ol(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Rl(e, t, i) {
  var n, o, s = Ol(t) ? vn : Ze;
  return function() {
    var a = s(this, e), r = a.on;
    r !== n && (o = (n = r).copy()).on(t, i), a.on = o;
  };
}
function Nl(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Ke(this.node(), i).on.on(e) : this.each(Rl(i, e, t));
}
function Dl(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Ll() {
  return this.on("end.remove", Dl(this._id));
}
function Ul(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = fn(e));
  for (var n = this._groups, o = n.length, s = new Array(o), a = 0; a < o; ++a)
    for (var r = n[a], l = r.length, u = s[a] = new Array(l), h, m, f = 0; f < l; ++f)
      (h = r[f]) && (m = e.call(h, h.__data__, f, r)) && ("__data__" in h && (m.__data__ = h.__data__), u[f] = m, zi(u[f], t, i, f, u, Ke(h, i)));
  return new it(s, this._parents, t, i);
}
function zl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Lo(e));
  for (var n = this._groups, o = n.length, s = [], a = [], r = 0; r < o; ++r)
    for (var l = n[r], u = l.length, h, m = 0; m < u; ++m)
      if (h = l[m]) {
        for (var f = e.call(h, h.__data__, m, l), g, v = Ke(h, i), b = 0, d = f.length; b < d; ++b)
          (g = f[b]) && zi(g, t, i, b, f, v);
        s.push(f), a.push(h);
      }
  return new it(s, a, t, i);
}
var ql = oi.prototype.constructor;
function Bl() {
  return new ql(this._groups, this._parents);
}
function Fl(e, t) {
  var i, n, o;
  return function() {
    var s = Dt(this, e), a = (this.style.removeProperty(e), Dt(this, e));
    return s === a ? null : s === i && a === n ? o : o = t(i = s, n = a);
  };
}
function aa(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Vl(e, t, i) {
  var n, o = i + "", s;
  return function() {
    var a = Dt(this, e);
    return a === o ? null : a === n ? s : s = t(n = a, i);
  };
}
function Wl(e, t, i) {
  var n, o, s;
  return function() {
    var a = Dt(this, e), r = i(this), l = r + "";
    return r == null && (l = r = (this.style.removeProperty(e), Dt(this, e))), a === l ? null : a === n && l === o ? s : (o = l, s = t(n = a, r));
  };
}
function jl(e, t) {
  var i, n, o, s = "style." + t, a = "end." + s, r;
  return function() {
    var l = Ze(this, e), u = l.on, h = l.value[s] == null ? r || (r = aa(t)) : void 0;
    (u !== i || o !== h) && (n = (i = u).copy()).on(a, o = h), l.on = n;
  };
}
function Gl(e, t, i) {
  var n = (e += "") == "transform" ? Gd : oa;
  return t == null ? this.styleTween(e, Fl(e, n)).on("end.style." + e, aa(e)) : typeof t == "function" ? this.styleTween(e, Wl(e, n, xn(this, "style." + e, t))).each(jl(this._id, e)) : this.styleTween(e, Vl(e, n, t), i).on("end.style." + e, null);
}
function Hl(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Yl(e, t, i) {
  var n, o;
  function s() {
    var a = t.apply(this, arguments);
    return a !== o && (n = (o = a) && Hl(e, a, i)), n;
  }
  return s._value = t, s;
}
function Kl(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Yl(e, t, i ?? ""));
}
function Xl(e) {
  return function() {
    this.textContent = e;
  };
}
function Ql(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Jl(e) {
  return this.tween("text", typeof e == "function" ? Ql(xn(this, "text", e)) : Xl(e == null ? "" : e + ""));
}
function Zl(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function ec(e) {
  var t, i;
  function n() {
    var o = e.apply(this, arguments);
    return o !== i && (t = (i = o) && Zl(o)), t;
  }
  return n._value = e, n;
}
function tc(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, ec(e));
}
function ic() {
  for (var e = this._name, t = this._id, i = sa(), n = this._groups, o = n.length, s = 0; s < o; ++s)
    for (var a = n[s], r = a.length, l, u = 0; u < r; ++u)
      if (l = a[u]) {
        var h = Ke(l, t);
        zi(l, e, i, u, a, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new it(n, this._parents, e, i);
}
function nc() {
  var e, t, i = this, n = i._id, o = i.size();
  return new Promise(function(s, a) {
    var r = { value: a }, l = { value: function() {
      --o === 0 && s();
    } };
    i.each(function() {
      var u = Ze(this, n), h = u.on;
      h !== e && (t = (e = h).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(l)), u.on = t;
    }), o === 0 && s();
  });
}
var oc = 0;
function it(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function sa() {
  return ++oc;
}
var et = oi.prototype;
it.prototype = {
  constructor: it,
  select: Ul,
  selectAll: zl,
  selectChild: et.selectChild,
  selectChildren: et.selectChildren,
  filter: Pl,
  merge: Tl,
  selection: Bl,
  transition: ic,
  call: et.call,
  nodes: et.nodes,
  node: et.node,
  size: et.size,
  empty: et.empty,
  each: et.each,
  on: Nl,
  attr: hl,
  attrTween: xl,
  style: Gl,
  styleTween: Kl,
  text: Jl,
  textTween: tc,
  remove: Ll,
  tween: dl,
  delay: kl,
  duration: Cl,
  ease: Sl,
  easeVarying: Ml,
  end: nc,
  [Symbol.iterator]: et[Symbol.iterator]
};
function ac(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var sc = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: ac
};
function rc(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function dc(e) {
  var t, i;
  e instanceof it ? (t = e._id, e = e._name) : (t = sa(), (i = sc).time = bn(), e = e == null ? null : e + "");
  for (var n = this._groups, o = n.length, s = 0; s < o; ++s)
    for (var a = n[s], r = a.length, l, u = 0; u < r; ++u)
      (l = a[u]) && zi(l, e, t, u, a, i || rc(l, t));
  return new it(n, this._parents, e, t);
}
oi.prototype.interrupt = al;
oi.prototype.transition = dc;
const ci = (e) => () => e;
function lc(e, {
  sourceEvent: t,
  target: i,
  transform: n,
  dispatch: o
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: n, enumerable: !0, configurable: !0 },
    _: { value: o }
  });
}
function tt(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
tt.prototype = {
  constructor: tt,
  scale: function(e) {
    return e === 1 ? this : new tt(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new tt(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Yt = new tt(1, 0, 0);
tt.prototype;
function Hi(e) {
  e.stopImmediatePropagation();
}
function qt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function cc(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function pc() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Qn() {
  return this.__zoom || Yt;
}
function uc(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function mc() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function fc(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], o = e.invertX(t[1][0]) - i[1][0], s = e.invertY(t[0][1]) - i[0][1], a = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    o > n ? (n + o) / 2 : Math.min(0, n) || Math.max(0, o),
    a > s ? (s + a) / 2 : Math.min(0, s) || Math.max(0, a)
  );
}
function hc() {
  var e = cc, t = pc, i = fc, n = uc, o = mc, s = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, l = Qd, u = gn("start", "zoom", "end"), h, m, f, g = 500, v = 150, b = 0, d = 10;
  function c(O) {
    O.property("__zoom", Qn).on("wheel.zoom", V, { passive: !1 }).on("mousedown.zoom", G).on("dblclick.zoom", se).filter(o).on("touchstart.zoom", C).on("touchmove.zoom", Y).on("touchend.zoom touchcancel.zoom", B).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  c.transform = function(O, W, x, w) {
    var R = O.selection ? O.selection() : O;
    R.property("__zoom", Qn), O !== R ? S(O, W, x, w) : R.interrupt().each(function() {
      E(this, arguments).event(w).start().zoom(null, typeof W == "function" ? W.apply(this, arguments) : W).end();
    });
  }, c.scaleBy = function(O, W, x, w) {
    c.scaleTo(O, function() {
      var R = this.__zoom.k, $ = typeof W == "function" ? W.apply(this, arguments) : W;
      return R * $;
    }, x, w);
  }, c.scaleTo = function(O, W, x, w) {
    c.transform(O, function() {
      var R = t.apply(this, arguments), $ = this.__zoom, k = x == null ? A(R) : typeof x == "function" ? x.apply(this, arguments) : x, P = $.invert(k), M = typeof W == "function" ? W.apply(this, arguments) : W;
      return i(_(y($, M), k, P), R, a);
    }, x, w);
  }, c.translateBy = function(O, W, x, w) {
    c.transform(O, function() {
      return i(this.__zoom.translate(
        typeof W == "function" ? W.apply(this, arguments) : W,
        typeof x == "function" ? x.apply(this, arguments) : x
      ), t.apply(this, arguments), a);
    }, null, w);
  }, c.translateTo = function(O, W, x, w, R) {
    c.transform(O, function() {
      var $ = t.apply(this, arguments), k = this.__zoom, P = w == null ? A($) : typeof w == "function" ? w.apply(this, arguments) : w;
      return i(Yt.translate(P[0], P[1]).scale(k.k).translate(
        typeof W == "function" ? -W.apply(this, arguments) : -W,
        typeof x == "function" ? -x.apply(this, arguments) : -x
      ), $, a);
    }, w, R);
  };
  function y(O, W) {
    return W = Math.max(s[0], Math.min(s[1], W)), W === O.k ? O : new tt(W, O.x, O.y);
  }
  function _(O, W, x) {
    var w = W[0] - x[0] * O.k, R = W[1] - x[1] * O.k;
    return w === O.x && R === O.y ? O : new tt(O.k, w, R);
  }
  function A(O) {
    return [(+O[0][0] + +O[1][0]) / 2, (+O[0][1] + +O[1][1]) / 2];
  }
  function S(O, W, x, w) {
    O.on("start.zoom", function() {
      E(this, arguments).event(w).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(w).end();
    }).tween("zoom", function() {
      var R = this, $ = arguments, k = E(R, $).event(w), P = t.apply(R, $), M = x == null ? A(P) : typeof x == "function" ? x.apply(R, $) : x, q = Math.max(P[1][0] - P[0][0], P[1][1] - P[0][1]), D = R.__zoom, z = typeof W == "function" ? W.apply(R, $) : W, j = l(D.invert(M).concat(q / D.k), z.invert(M).concat(q / z.k));
      return function(X) {
        if (X === 1) X = z;
        else {
          var le = j(X), Ee = q / le[2];
          X = new tt(Ee, M[0] - le[0] * Ee, M[1] - le[1] * Ee);
        }
        k.zoom(null, X);
      };
    });
  }
  function E(O, W, x) {
    return !x && O.__zooming || new N(O, W);
  }
  function N(O, W) {
    this.that = O, this.args = W, this.active = 0, this.sourceEvent = null, this.extent = t.apply(O, W), this.taps = 0;
  }
  N.prototype = {
    event: function(O) {
      return O && (this.sourceEvent = O), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(O, W) {
      return this.mouse && O !== "mouse" && (this.mouse[1] = W.invert(this.mouse[0])), this.touch0 && O !== "touch" && (this.touch0[1] = W.invert(this.touch0[0])), this.touch1 && O !== "touch" && (this.touch1[1] = W.invert(this.touch1[0])), this.that.__zoom = W, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(O) {
      var W = Ge(this.that).datum();
      u.call(
        O,
        this.that,
        new lc(O, {
          sourceEvent: this.sourceEvent,
          target: c,
          transform: this.that.__zoom,
          dispatch: u
        }),
        W
      );
    }
  };
  function V(O, ...W) {
    if (!e.apply(this, arguments)) return;
    var x = E(this, W).event(O), w = this.__zoom, R = Math.max(s[0], Math.min(s[1], w.k * Math.pow(2, n.apply(this, arguments)))), $ = gt(O);
    if (x.wheel)
      (x.mouse[0][0] !== $[0] || x.mouse[0][1] !== $[1]) && (x.mouse[1] = w.invert(x.mouse[0] = $)), clearTimeout(x.wheel);
    else {
      if (w.k === R) return;
      x.mouse = [$, w.invert($)], Ci(this), x.start();
    }
    qt(O), x.wheel = setTimeout(k, v), x.zoom("mouse", i(_(y(w, R), x.mouse[0], x.mouse[1]), x.extent, a));
    function k() {
      x.wheel = null, x.end();
    }
  }
  function G(O, ...W) {
    if (f || !e.apply(this, arguments)) return;
    var x = O.currentTarget, w = E(this, W, !0).event(O), R = Ge(O.view).on("mousemove.zoom", M, !0).on("mouseup.zoom", q, !0), $ = gt(O, x), k = O.clientX, P = O.clientY;
    $d(O.view), Hi(O), w.mouse = [$, this.__zoom.invert($)], Ci(this), w.start();
    function M(D) {
      if (qt(D), !w.moved) {
        var z = D.clientX - k, j = D.clientY - P;
        w.moved = z * z + j * j > b;
      }
      w.event(D).zoom("mouse", i(_(w.that.__zoom, w.mouse[0] = gt(D, x), w.mouse[1]), w.extent, a));
    }
    function q(D) {
      R.on("mousemove.zoom mouseup.zoom", null), _d(D.view, w.moved), qt(D), w.event(D).end();
    }
  }
  function se(O, ...W) {
    if (e.apply(this, arguments)) {
      var x = this.__zoom, w = gt(O.changedTouches ? O.changedTouches[0] : O, this), R = x.invert(w), $ = x.k * (O.shiftKey ? 0.5 : 2), k = i(_(y(x, $), w, R), t.apply(this, W), a);
      qt(O), r > 0 ? Ge(this).transition().duration(r).call(S, k, w, O) : Ge(this).call(c.transform, k, w, O);
    }
  }
  function C(O, ...W) {
    if (e.apply(this, arguments)) {
      var x = O.touches, w = x.length, R = E(this, W, O.changedTouches.length === w).event(O), $, k, P, M;
      for (Hi(O), k = 0; k < w; ++k)
        P = x[k], M = gt(P, this), M = [M, this.__zoom.invert(M), P.identifier], R.touch0 ? !R.touch1 && R.touch0[2] !== M[2] && (R.touch1 = M, R.taps = 0) : (R.touch0 = M, $ = !0, R.taps = 1 + !!h);
      h && (h = clearTimeout(h)), $ && (R.taps < 2 && (m = M[0], h = setTimeout(function() {
        h = null;
      }, g)), Ci(this), R.start());
    }
  }
  function Y(O, ...W) {
    if (this.__zooming) {
      var x = E(this, W).event(O), w = O.changedTouches, R = w.length, $, k, P, M;
      for (qt(O), $ = 0; $ < R; ++$)
        k = w[$], P = gt(k, this), x.touch0 && x.touch0[2] === k.identifier ? x.touch0[0] = P : x.touch1 && x.touch1[2] === k.identifier && (x.touch1[0] = P);
      if (k = x.that.__zoom, x.touch1) {
        var q = x.touch0[0], D = x.touch0[1], z = x.touch1[0], j = x.touch1[1], X = (X = z[0] - q[0]) * X + (X = z[1] - q[1]) * X, le = (le = j[0] - D[0]) * le + (le = j[1] - D[1]) * le;
        k = y(k, Math.sqrt(X / le)), P = [(q[0] + z[0]) / 2, (q[1] + z[1]) / 2], M = [(D[0] + j[0]) / 2, (D[1] + j[1]) / 2];
      } else if (x.touch0) P = x.touch0[0], M = x.touch0[1];
      else return;
      x.zoom("touch", i(_(k, P, M), x.extent, a));
    }
  }
  function B(O, ...W) {
    if (this.__zooming) {
      var x = E(this, W).event(O), w = O.changedTouches, R = w.length, $, k;
      for (Hi(O), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, g), $ = 0; $ < R; ++$)
        k = w[$], x.touch0 && x.touch0[2] === k.identifier ? delete x.touch0 : x.touch1 && x.touch1[2] === k.identifier && delete x.touch1;
      if (x.touch1 && !x.touch0 && (x.touch0 = x.touch1, delete x.touch1), x.touch0) x.touch0[1] = this.__zoom.invert(x.touch0[0]);
      else if (x.end(), x.taps === 2 && (k = gt(k, this), Math.hypot(m[0] - k[0], m[1] - k[1]) < d)) {
        var P = Ge(this).on("dblclick.zoom");
        P && P.apply(this, arguments);
      }
    }
  }
  return c.wheelDelta = function(O) {
    return arguments.length ? (n = typeof O == "function" ? O : ci(+O), c) : n;
  }, c.filter = function(O) {
    return arguments.length ? (e = typeof O == "function" ? O : ci(!!O), c) : e;
  }, c.touchable = function(O) {
    return arguments.length ? (o = typeof O == "function" ? O : ci(!!O), c) : o;
  }, c.extent = function(O) {
    return arguments.length ? (t = typeof O == "function" ? O : ci([[+O[0][0], +O[0][1]], [+O[1][0], +O[1][1]]]), c) : t;
  }, c.scaleExtent = function(O) {
    return arguments.length ? (s[0] = +O[0], s[1] = +O[1], c) : [s[0], s[1]];
  }, c.translateExtent = function(O) {
    return arguments.length ? (a[0][0] = +O[0][0], a[1][0] = +O[1][0], a[0][1] = +O[0][1], a[1][1] = +O[1][1], c) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, c.constrain = function(O) {
    return arguments.length ? (i = O, c) : i;
  }, c.duration = function(O) {
    return arguments.length ? (r = +O, c) : r;
  }, c.interpolate = function(O) {
    return arguments.length ? (l = O, c) : l;
  }, c.on = function() {
    var O = u.on.apply(u, arguments);
    return O === u ? c : O;
  }, c.clickDistance = function(O) {
    return arguments.length ? (b = (O = +O) * O, c) : Math.sqrt(b);
  }, c.tapDistance = function(O) {
    return arguments.length ? (d = +O, c) : d;
  }, c;
}
function Jn(e, t, i) {
  const n = t - e.x, o = i - e.y, s = e.w / 2, a = e.h / 2;
  if (n === 0 && o === 0) return { x: e.x, y: e.y };
  const r = 1 / Math.max(Math.abs(n) / s, Math.abs(o) / a);
  return { x: e.x + n * r, y: e.y + o * r };
}
function Zn(e, t, i) {
  let n = Jn(e, t.x, t.y), o = Jn(t, e.x, e.y);
  if (i !== 0) {
    const s = Math.hypot(o.x - n.x, o.y - n.y) || 1, a = -(o.y - n.y) / s * i, r = (o.x - n.x) / s * i;
    n = { x: n.x + a, y: n.y + r }, o = { x: o.x + a, y: o.y + r };
  }
  return [n, o];
}
function ra(e, t, i = 0) {
  const n = t.x - e.x, o = t.y - e.y, s = 0.5;
  if (Math.abs(n) <= s || Math.abs(o) <= s) return Zn(e, t, i);
  const a = n > 0 ? t.x - t.w / 2 - (e.x + e.w / 2) : e.x - e.w / 2 - (t.x + t.w / 2), r = o > 0 ? t.y - t.h / 2 - (e.y + e.h / 2) : e.y - e.h / 2 - (t.y + t.h / 2), l = Math.abs(n) >= Math.abs(o), u = () => {
    const m = { x: e.x + Math.sign(n) * e.w / 2, y: e.y + i }, f = { x: t.x - Math.sign(n) * t.w / 2, y: t.y + i }, g = (m.x + f.x) / 2 + i;
    return [m, { x: g, y: m.y }, { x: g, y: f.y }, f];
  }, h = () => {
    const m = { x: e.x + i, y: e.y + Math.sign(o) * e.h / 2 }, f = { x: t.x + i, y: t.y - Math.sign(o) * t.h / 2 }, g = (m.y + f.y) / 2 + i;
    return [m, { x: m.x, y: g }, { x: f.x, y: g }, f];
  };
  return a >= 0 && (l || r < 0) ? u() : r >= 0 ? h() : a >= 0 ? u() : Zn(e, t, i);
}
function gc(e, t, i) {
  const n = i.x - i.w / 2, o = i.x + i.w / 2, s = i.y - i.h / 2, a = i.y + i.h / 2;
  let r = 0, l = 1;
  const u = t.x - e.x, h = t.y - e.y;
  for (const [m, f] of [
    [-u, e.x - n],
    [u, o - e.x],
    [-h, e.y - s],
    [h, a - e.y]
  ]) {
    if (m === 0) {
      if (f < 0) return !1;
      continue;
    }
    const g = f / m;
    if (m < 0) {
      if (g > l) return !1;
      g > r && (r = g);
    } else {
      if (g < r) return !1;
      g < l && (l = g);
    }
  }
  return l - r > 0.02;
}
function yc(e, t, i = 28) {
  const n = new Map(e.nodes.map((f) => [f.id, f])), o = (f) => {
    var v;
    const g = /* @__PURE__ */ new Set();
    for (let b = f; b; b = (v = n.get(b)) == null ? void 0 : v.parentId) g.add(b);
    return g;
  }, s = e.nodes.filter((f) => f.kind !== "area"), a = (f) => f.parentId ? Math.min(i, 6) : i, r = /* @__PURE__ */ new Map(), l = (f, g, v) => {
    let b = 0;
    for (let d = 0; d < f.length - 1; d++)
      for (const c of s) {
        if (g.has(c.id)) continue;
        const y = v ?? a(c);
        gc(f[d], f[d + 1], { x: c.x, y: c.y, w: c.w + 2 * y, h: c.h + 2 * y }) && b++;
      }
    return b;
  }, u = (f) => {
    let g = 0;
    for (let v = 0; v < f.length - 1; v++) g += Math.hypot(f[v + 1].x - f[v].x, f[v + 1].y - f[v].y);
    return g;
  }, h = (f) => ({ x: f.x, y: f.y, w: f.w, h: f.h }), m = (f, g, v) => {
    const b = g - f.x, d = v - f.y, c = f.w / 2, y = f.h / 2;
    if (Math.abs(b) >= Math.abs(d) && Math.abs(d) <= y) return { x: f.x + Math.sign(b) * c, y: v };
    if (Math.abs(d) >= Math.abs(b) && Math.abs(b) <= c) return { x: g, y: f.y + Math.sign(d) * y };
    if (b === 0 && d === 0) return { x: f.x, y: f.y };
    const _ = 1 / Math.max(Math.abs(b) / c, Math.abs(d) / y);
    return { x: f.x + b * _, y: f.y + d * _ };
  };
  for (const f of e.edges) {
    const g = n.get(f.sourceId), v = n.get(f.targetId);
    if (!g || !v) continue;
    const b = /* @__PURE__ */ new Set([...o(g.id), ...o(v.id)]), d = { x: g.x, y: g.y }, c = { x: v.x, y: v.y }, y = t[f.id];
    let _;
    if (y) {
      if (y.length === 0) continue;
      const B = [
        m(g, y[0].x, y[0].y),
        ...y,
        m(v, y[y.length - 1].x, y[y.length - 1].y)
      ];
      if (_ = l(B, b, 2), _ === 0) continue;
    } else if (_ = l(ra(h(g), h(v)), b), _ === 0) continue;
    const A = [[{ x: c.x, y: d.y }], [{ x: d.x, y: c.y }]];
    for (const B of [0.5, 0.38, 0.62, 0.26, 0.74]) {
      const O = d.x + (c.x - d.x) * B, W = d.y + (c.y - d.y) * B;
      A.push([{ x: O, y: d.y }, { x: O, y: c.y }]), A.push([{ x: d.x, y: W }, { x: c.x, y: W }]);
    }
    const S = Math.min(d.x, c.x), E = Math.max(d.x, c.x), N = Math.min(d.y, c.y), V = Math.max(d.y, c.y);
    for (const B of s) {
      if (b.has(B.id)) continue;
      const O = a(B) + 8;
      B.x > S - B.w && B.x < E + B.w && (A.push([{ x: d.x, y: B.y - B.h / 2 - O }, { x: c.x, y: B.y - B.h / 2 - O }]), A.push([{ x: d.x, y: B.y + B.h / 2 + O }, { x: c.x, y: B.y + B.h / 2 + O }])), B.y > N - B.h && B.y < V + B.h && (A.push([{ x: B.x - B.w / 2 - O, y: d.y }, { x: B.x - B.w / 2 - O, y: c.y }]), A.push([{ x: B.x + B.w / 2 + O, y: d.y }, { x: B.x + B.w / 2 + O, y: c.y }]));
    }
    const G = 14;
    let se = null, C = 1 / 0, Y = 1 / 0;
    for (const B of A) {
      const O = [d, ...B, c], W = l(O, b), x = m(g, B[0].x, B[0].y), w = m(v, B[B.length - 1].x, B[B.length - 1].y), R = Math.hypot(B[0].x - x.x, B[0].y - x.y), $ = Math.hypot(B[B.length - 1].x - w.x, B[B.length - 1].y - w.y), k = (R < G ? 1 : 0) + ($ < G ? 1 : 0), P = W * 1e6 + k * 3e3 + u(O) + B.length * 40;
      P < Y && (se = B, Y = P, C = W);
    }
    se && C < _ && r.set(f.id, se.map((B) => ({ x: Math.round(B.x), y: Math.round(B.y) })));
  }
  return r;
}
const da = 12;
function ct(e, t = da) {
  return Math.round(e / t) * t;
}
function eo(e) {
  return {
    xs: [e.x - e.w / 2, e.x, e.x + e.w / 2],
    ys: [e.y - e.h / 2, e.y, e.y + e.h / 2]
  };
}
function bc(e, t, i) {
  const n = (i == null ? void 0 : i.grid) ?? da, o = (i == null ? void 0 : i.threshold) ?? 4;
  if ((i == null ? void 0 : i.enabled) === !1) return { x: e.x, y: e.y, guides: { v: [], h: [] } };
  const s = eo(e);
  let a = null, r = null;
  for (const l of t) {
    const u = eo(l);
    for (const h of u.xs)
      for (const m of s.xs) {
        const f = h - m;
        Math.abs(f) <= o && (!a || Math.abs(f) < Math.abs(a.delta)) && (a = { guide: h, delta: f });
      }
    for (const h of u.ys)
      for (const m of s.ys) {
        const f = h - m;
        Math.abs(f) <= o && (!r || Math.abs(f) < Math.abs(r.delta)) && (r = { guide: h, delta: f });
      }
  }
  return {
    x: a ? e.x + a.delta : ct(e.x, n),
    y: r ? e.y + r.delta : ct(e.y, n),
    guides: { v: a ? [a.guide] : [], h: r ? [r.guide] : [] }
  };
}
var vc = Object.defineProperty, xc = Object.getOwnPropertyDescriptor, ke = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? xc(t, i) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && vc(t, i, o), o;
};
function Ic(e, t, i, n) {
  const o = t.x - e.x, s = t.y - e.y, a = n.x - i.x, r = n.y - i.y, l = o * r - s * a;
  if (Math.abs(l) < 1e-9) return null;
  const u = ((i.x - e.x) * r - (i.y - e.y) * a) / l, h = ((i.x - e.x) * s - (i.y - e.y) * o) / l;
  return u <= 0.02 || u >= 0.98 || h <= 0.02 || h >= 0.98 ? null : { x: e.x + u * o, y: e.y + u * s, t: u };
}
function wc(e, t, i) {
  const n = i.x - t.x, o = i.y - t.y, s = n * n + o * o || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * o) / s)), r = t.x + a * n, l = t.y + a * o;
  return { dist: Math.hypot(e.x - r, e.y - l), t: a };
}
function kc(e) {
  let t = 0;
  for (let n = 0; n < e.length - 1; n++) t += Math.hypot(e[n + 1].x - e[n].x, e[n + 1].y - e[n].y);
  let i = t / 2;
  for (let n = 0; n < e.length - 1; n++) {
    const o = Math.hypot(e[n + 1].x - e[n].x, e[n + 1].y - e[n].y);
    if (o >= i && o > 0) {
      const s = i / o;
      return { x: e[n].x + (e[n + 1].x - e[n].x) * s, y: e[n].y + (e[n + 1].y - e[n].y) * s };
    }
    i -= o;
  }
  return e[Math.floor(e.length / 2)];
}
function $c(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let o = 0; o < e.length - 1; o++) {
    const s = e[o], a = e[o + 1], r = Math.hypot(a.x - s.x, a.y - s.y) || 1, l = (a.x - s.x) / r, u = (a.y - s.y) / r, h = t.map(([f, g]) => Ic(s, a, f, g)).filter((f) => f !== null).filter((f) => f.t * r > i + 2 && (1 - f.t) * r > i + 2).sort((f, g) => f.t - g.t);
    let m = -1 / 0;
    for (const f of h)
      f.t * r - i <= m + 2 || (n += ` L ${f.x - l * i} ${f.y - u * i}`, n += ` A ${i} ${i} 0 0 1 ${f.x + l * i} ${f.y + u * i}`, m = f.t * r + i);
    n += ` L ${a.x} ${a.y}`;
  }
  return n;
}
const Tt = {
  component: J`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: J`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  shield: J`<path d="M6 0.5 L11 2.5 V6 C11 9 8.8 11 6 11.8 C3.2 11 1 9 1 6 V2.5 Z"></path>`,
  note: J`<path d="M1.5 0.5 H10.5 V7.5 L7 11.5 H1.5 Z"></path><path d="M10.5 7.5 H7 V11.5"></path>`,
  area: J`<rect x="0.5" y="1.5" width="11" height="9" rx="1" stroke-dasharray="2.4 1.8"></rect>`,
  entity: J`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  // A value object: a rounded card (immutable value) with its fields stacked inside.
  "value-object": J`<rect x="1.5" y="1.5" width="9" height="9" rx="2.6"></rect>
    <line x1="3.6" y1="4.6" x2="8.4" y2="4.6"></line>
    <line x1="3.6" y1="7.4" x2="8.4" y2="7.4"></line>`,
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
let ye = class extends je {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Yt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._guides = null, this._pendingLink = null, this._hoverNodeId = null, this._focusNodeId = null, this._focusNodes = /* @__PURE__ */ new Set(), this._focusEdges = /* @__PURE__ */ new Set(), this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
          const t = this.scene.edges.find((o) => o.id === this.selectedId), i = this.scene.nodes.find((o) => o.id === this.selectedId);
          if (i != null && i.parentId && !t && i.kind !== "domain-event" && i.kind !== "application-event" && i.kind !== "read-model" && i.kind !== "domain-service" && i.kind !== "query-service" && i.kind !== "use-case" && i.kind !== "external-use-case" && i.kind !== "external-system" && i.kind !== "external-table" && i.kind !== "mcp-server" && i.kind !== "api" && i.kind !== "proxy-api" && i.kind !== "api-operation")
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
    this._zoomBehavior = hc().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), Ge(e).call(this._zoomBehavior);
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
  /**
   * Center and scale the viewport so the scene is visible (and unobscured).
   * With a selection, only the selected nodes and the lines that join them are
   * framed; a selected edge frames its polyline and the nodes it connects.
   */
  fit(e = 60) {
    const t = this.renderRoot.querySelector("svg.main");
    if (!this.scene.nodes.length || !t || !this._zoomBehavior) return;
    const i = this.getBoundingClientRect();
    if (i.width === 0 || i.height === 0) return;
    const n = new Set(
      this.selectedIds.filter((_) => this.scene.nodes.some((A) => A.id === _))
    );
    this.scene.nodes.some((_) => _.id === this.selectedId) && n.add(this.selectedId);
    const o = this.scene.edges.find((_) => _.id === this.selectedId) ?? null, s = n.size > 0 || o !== null, a = s ? this.scene.nodes.filter(
      (_) => n.has(_.id) || o !== null && (_.id === o.sourceId || _.id === o.targetId)
    ) : this.scene.nodes;
    if (!a.length) return;
    const r = this.fitInsets.left ?? 0, l = this.fitInsets.right ?? 0, u = this.fitInsets.top ?? 0, h = this.fitInsets.bottom ?? 0, m = Math.max(80, i.width - r - l), f = Math.max(80, i.height - u - h);
    let g = Math.min(...a.map((_) => _.x - _.w / 2)) - e, v = Math.max(...a.map((_) => _.x + _.w / 2)) + e, b = Math.min(...a.map((_) => _.y - _.h / 2)) - e, d = Math.max(...a.map((_) => _.y + _.h / 2)) + e;
    if (s)
      for (const _ of this.scene.edges) {
        if (!(_.id === (o == null ? void 0 : o.id) || n.has(_.sourceId) && n.has(_.targetId))) continue;
        const S = this.edgePolyline(_);
        if (S)
          for (const E of S)
            g = Math.min(g, E.x - e), v = Math.max(v, E.x + e), b = Math.min(b, E.y - e), d = Math.max(d, E.y + e);
      }
    const c = Math.max(0.15, Math.min(m / (v - g), f / (d - b), 1.25)), y = Yt.translate(
      r + m / 2 - c * (g + v) / 2,
      u + f / 2 - c * (b + d) / 2
    ).scale(c);
    Ge(t).call(this._zoomBehavior.transform, y);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(Ge(t), e);
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
    var i, n, o;
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    const t = (i = this._dragGroup) == null ? void 0 : i.get(e.id);
    if (t) return t;
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    for (let s = e.parentId; s; s = (n = this.scene.nodes.find((a) => a.id === s)) == null ? void 0 : n.parentId) {
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
  clampToParent(e, t, i) {
    if (e.parentId) {
      const n = this.scene.nodes.find((o) => o.id === e.parentId);
      if (n) {
        const o = this.nodePos(n), s = o.x - n.w / 2 + 10 + e.w / 2, a = o.x + n.w / 2 - 10 - e.w / 2, r = o.y - n.h / 2 + 34 + e.h / 2, l = o.y + n.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, s), a), i = Math.min(Math.max(i, r), l);
      }
    }
    return { id: e.id, x: t, y: i };
  }
  /**
   * An area's cargo: the frame plus every top-level node whose box sits fully
   * inside it. Children ride with their container, so only top-level counts.
   */
  areaCargo(e) {
    const t = this.scene.nodes.filter((i) => {
      if (i.id === e.id || i.parentId) return !1;
      const n = this.nodePos(i);
      return n.x - i.w / 2 >= e.x - e.w / 2 && n.x + i.w / 2 <= e.x + e.w / 2 && n.y - i.h / 2 >= e.y - e.h / 2 && n.y + i.h / 2 <= e.y + e.h / 2;
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
  /** True while a node is hovered and no gesture is in progress. */
  get spotlighting() {
    return !!this._focusNodeId && !this.gestureActive();
  }
  /** A gesture owns the pointer — don't spotlight a neighbourhood mid-drag. */
  gestureActive() {
    return !!(this._dragPos || this._dragGroup || this._pendingLink || this._wpDrag || this._resize || this._rubber || this._spaceDown);
  }
  /**
   * Spotlight a node's neighbourhood: hovering it keeps the node, the nodes one
   * edge away and those connecting edges at full strength, and fades everything
   * else back. A node's container/nested chips ride along so a chip and its box
   * stay lit together. Passing null (pointer left) clears the spotlight.
   */
  setFocusNode(e) {
    if (e && this.gestureActive() || e === this._focusNodeId) return;
    this._focusNodeId = e;
    const t = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
    if (e) {
      t.add(e);
      const n = this.scene.nodes.find((o) => o.id === e);
      n != null && n.parentId && t.add(n.parentId);
      for (const o of this.scene.nodes) o.parentId === e && t.add(o.id);
      for (const o of this.scene.edges)
        (o.sourceId === e || o.targetId === e) && (i.add(o.id), t.add(o.sourceId), t.add(o.targetId));
    }
    this._focusNodes = t, this._focusEdges = i;
  }
  /** Topmost node at a client-space point (also used by palette drops). */
  nodeIdAtClient(e, t) {
    var n, o;
    const i = ((n = this.shadowRoot) == null ? void 0 : n.elementsFromPoint(e, t)) ?? [];
    for (const s of i) {
      const a = (o = s.closest) == null ? void 0 : o.call(s, "[data-node-id]");
      if (a) return a.getAttribute("data-node-id");
    }
    return null;
  }
  /**
   * The node whose box is nearest to a client point, within maxPx screen pixels — a
   * forgiving fallback for palette drops when the exact hit-test misses a small node
   * (SVG fill hit-testing is finicky, and boxes shrink when zoomed out).
   */
  nodeIdNearClient(e, t, i = 44) {
    const n = this.sceneFromClient(e, t);
    let o = null, s = 1 / 0;
    for (const a of this.scene.nodes) {
      if (a.kind === "area") continue;
      const r = this.nodePos(a), l = Math.max(Math.abs(n.x - r.x) - (a.w ?? 0) / 2, 0), u = Math.max(Math.abs(n.y - r.y) - (a.h ?? 0) / 2, 0), h = Math.hypot(l, u);
      h < s && (s = h, o = a.id);
    }
    return o && s * this._t.k <= i ? o : null;
  }
  /** Topmost edge at a client-space point — note threads can land on relations. */
  edgeIdAtClient(e, t) {
    var n, o;
    const i = ((n = this.shadowRoot) == null ? void 0 : n.elementsFromPoint(e, t)) ?? [];
    for (const s of i) {
      const a = (o = s.closest) == null ? void 0 : o.call(s, "[data-edge-id]");
      if (a) return a.getAttribute("data-edge-id");
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
    let o = !1;
    const s = new Set(this.selectedIds), a = s.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (d) => s.has(d.id) && !(d.parentId && s.has(d.parentId))
    ) : t.kind === "area" ? this.areaCargo(t) : null, r = a ? new Map(a.map((d) => [d.id, this.nodePos(d)])) : null, l = (d) => (d.shiftKey || d.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a || d.shiftKey && t.kind === "external-system" && !a, u = a ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, h = u !== null, m = u === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], f = () => {
      const d = [], c = u === "menu" ? this.scene.nodes.filter((y) => y.kind === "ui-app") : this.scene.nodes.filter((y) => y.id === (t.ownerId ?? t.parentId));
      for (const y of c) {
        const _ = this.scene.nodes.filter((N) => (N.ownerId ?? N.parentId) === y.id && m.includes(N.kind ?? "") && N.id !== t.id).sort((N, V) => N.y - V.y), A = y.x - y.w / 2 + 10, S = y.x + y.w / 2 - 10;
        for (const N of _) d.push({ x1: A, x2: S, y: N.y - N.h / 2 - 3, appId: y.id, beforeId: N.id });
        const E = _[_.length - 1];
        d.push({
          x1: A,
          x2: S,
          y: E ? E.y + E.h / 2 + 3 : y.y - y.h / 2 + 34 + 8,
          appId: y.id,
          beforeId: null
        });
      }
      return d;
    }, g = (d) => {
      const c = this.nodeIdAt(d), y = c && c !== t.id ? this.scene.nodes.find((_) => _.id === c) : void 0;
      return y ? y.kind === "external-system" ? y.id : y.parentId ?? null : null;
    }, v = (d) => {
      if ((d.buttons & 1) === 0) {
        b(d);
        return;
      }
      const c = this.toScene(d), y = c.x - i.x, _ = c.y - i.y;
      if (!(!o && Math.hypot(y, _) < 3 / this._t.k))
        if (o = !0, a && r) {
          const A = /* @__PURE__ */ new Map();
          for (const S of a) {
            const E = r.get(S.id), N = this.clampToParent(S, E.x + y, E.y + _);
            A.set(S.id, { x: N.x, y: N.y });
          }
          if (!d.altKey) {
            const S = A.get(t.id), E = { x: ct(S.x) - S.x, y: ct(S.y) - S.y };
            if (E.x !== 0 || E.y !== 0)
              for (const N of A.values())
                N.x += E.x, N.y += E.y;
          }
          this._dragGroup = A;
        } else if (h) {
          this._dragPos = { id: t.id, x: n.x + y, y: n.y + _ }, this._menuSlots || (this._menuSlots = { slots: f(), active: null, nestRowId: null });
          const A = this.scene.nodes.filter(
            (E) => m.includes(E.kind ?? "") && E.id !== t.id && Math.abs(c.x - E.x) <= E.w / 2 + 8
          ), S = u === "menu" ? A.find((E) => Math.abs(c.y - E.y) < E.h * 0.28) : void 0;
          if (S)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: S.id }, this._hoverNodeId = S.id;
          else {
            let E = -1, N = 14;
            this._menuSlots.slots.forEach((V, G) => {
              if (c.x < V.x1 - 24 || c.x > V.x2 + 24) return;
              const se = Math.abs(c.y - V.y);
              se < N && (N = se, E = G);
            }), this._menuSlots = { ...this._menuSlots, active: E >= 0 ? E : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else if (l(d))
          this._dragPos = { id: t.id, x: n.x + y, y: n.y + _ }, this._hoverNodeId = g(d), this._guides = null;
        else {
          const A = this.clampToParent(t, n.x + y, n.y + _);
          if (d.altKey)
            this._dragPos = { id: t.id, x: A.x, y: A.y }, this._guides = null;
          else {
            const S = this.scene.nodes.filter((N) => {
              var V;
              if (N.id === t.id) return !1;
              for (let G = N.parentId; G; G = (V = this.scene.nodes.find((se) => se.id === G)) == null ? void 0 : V.parentId)
                if (G === t.id) return !1;
              return !0;
            }), E = bc({ ...A, w: t.w, h: t.h }, S, {
              threshold: 5 / this._t.k
            });
            this._dragPos = { id: t.id, x: E.x, y: E.y }, this._guides = E.guides.v.length || E.guides.h.length ? E.guides : null;
          }
          this._hoverNodeId = null;
        }
    }, b = (d) => {
      if (window.removeEventListener("pointermove", v), window.removeEventListener("pointerup", b), this._guides = null, o && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([c, y]) => ({ id: c, x: y.x, y: y.y }))
        });
      else if (o && this._dragPos && h) {
        const c = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const y = u === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (c != null && c.nestRowId)
          this.emit(y, { id: t.id, nestRowId: c.nestRowId });
        else if (c && c.active !== null) {
          const _ = c.slots[c.active];
          this.emit(y, { id: t.id, appId: _.appId, beforeId: _.beforeId });
        }
        return;
      } else if (o && this._dragPos) {
        if (t.kind === "value-object" || t.kind === "entity") {
          const c = this.nodeIdAt(d), y = c && c !== t.id ? this.scene.nodes.find((A) => A.id === c) : null, _ = y ? this.scene.edges.some(
            (A) => A.kind === "containment" && A.sourceId === y.id && A.targetId === t.id
          ) : !1;
          if ((y == null ? void 0 : y.kind) === "aggregate" && !_) {
            this.emit("connect-requested", {
              sourceId: t.id,
              targetId: y.id,
              x: d.clientX,
              y: d.clientY
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
        }
        if (l(d)) {
          const c = g(d);
          if (d.ctrlKey && t.kind === "api") {
            c && c !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: c,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (c !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: c,
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
    window.addEventListener("pointermove", v), window.addEventListener("pointerup", b);
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
    const o = t.kind === "area", s = t.container && !t.parentId, a = o ? 30 : s ? 160 : 90, r = o ? 20 : s ? 90 : 30, l = { x: t.x, y: t.y, w: t.w, h: t.h }, u = s ? this.scene.nodes.filter((c) => c.parentId === t.id) : [], h = Math.min(...u.map((c) => c.x - c.w / 2)), m = Math.max(...u.map((c) => c.x + c.w / 2)), f = Math.min(...u.map((c) => c.y - c.h / 2)), g = Math.max(...u.map((c) => c.y + c.h / 2)), v = za(
      u.map((c) => ({ dx: c.x - l.x, dy: c.y - l.y, w: c.w, h: c.h })),
      { w: a, h: r }
    ), b = (c) => {
      if ((c.buttons & 1) === 0) {
        d();
        return;
      }
      const y = this.toScene(c);
      if (c.shiftKey) {
        this._resize = {
          id: t.id,
          x: l.x,
          y: l.y,
          w: c.altKey ? Math.max(v.w, 2 * Math.abs(y.x - l.x)) : Math.max(v.w, ct(2 * Math.abs(y.x - l.x))),
          h: c.altKey ? Math.max(v.h, 2 * Math.abs(y.y - l.y)) : Math.max(v.h, ct(2 * Math.abs(y.y - l.y)))
        };
        return;
      }
      const _ = c.altKey ? y : { x: ct(y.x), y: ct(y.y) }, A = l.x - i * l.w / 2, S = l.y - n * l.h / 2, E = i > 0 ? Math.max(_.x, A + a, u.length ? m + 10 : -1 / 0) : Math.min(_.x, A - a, u.length ? h - 10 : 1 / 0), N = n > 0 ? Math.max(_.y, S + r, u.length ? g + 10 : -1 / 0) : Math.min(_.y, S - r, u.length ? f - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (A + E) / 2,
        y: (S + N) / 2,
        w: Math.abs(E - A),
        h: Math.abs(N - S)
      };
    }, d = () => {
      window.removeEventListener("pointermove", b), window.removeEventListener("pointerup", d), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", b), window.addEventListener("pointerup", d);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const n = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: n.x, y: n.y };
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
          connectKind: i
        });
      else if (t.kind === "note") {
        const l = this.edgeIdAtClient(a.clientX, a.clientY);
        l && !l.startsWith("note:") && this.emit("connect-requested", {
          sourceId: t.id,
          targetId: `edge:${l}`,
          x: a.clientX,
          y: a.clientY,
          connectKind: i
        });
      }
      this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: o } = this.nodePos(e), s = t - n, a = i - o, r = e.w / 2, l = e.h / 2;
    if (s === 0 && a === 0) return { x: n, y: o };
    const u = 1 / Math.max(Math.abs(s) / r, Math.abs(a) / l);
    return { x: n + s * u, y: o + a * u };
  }
  /**
   * Border exit for a routed edge: when the first/last waypoint sits beside the
   * node (its perpendicular coordinate falls within the node's span), leave the
   * facing side aligned to it, so the end segment is horizontal/vertical — this
   * is what keeps ELK's and the auto-router's orthogonal routes orthogonal right
   * up to the box. Otherwise fall back to the plain centre-ray border point.
   */
  orthoBorderPoint(e, t, i) {
    const { x: n, y: o } = this.nodePos(e), s = t - n, a = i - o, r = e.w / 2, l = e.h / 2;
    return Math.abs(s) >= Math.abs(a) && Math.abs(a) <= l ? { x: n + Math.sign(s) * r, y: i } : Math.abs(a) >= Math.abs(s) && Math.abs(s) <= r ? { x: t, y: o + Math.sign(a) * l } : this.borderPoint(e, t, i);
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
    const t = this.scene.nodes.find((h) => h.id === e.sourceId);
    if (e.targetId.startsWith("edgeanchor:")) {
      if (!t) return null;
      const h = e.targetId.slice(11), m = this.scene.edges.find((v) => v.id === h), f = m && m.id !== e.id ? this.edgePolyline(m) : null;
      if (!f || f.length < 2) return null;
      const g = kc(f);
      return [this.borderPoint(t, g.x, g.y), g];
    }
    const i = this.scene.nodes.find((h) => h.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], o = this.nodePos(t), s = this.nodePos(i);
    if (!n.length)
      return ra(
        { x: o.x, y: o.y, w: t.w, h: t.h },
        { x: s.x, y: s.y, w: i.w, h: i.h },
        this.edgeOffset(e)
      );
    const a = n[0], r = n[n.length - 1], l = this.orthoBorderPoint(t, a.x, a.y), u = this.orthoBorderPoint(i, r.x, r.y);
    return [l, ...n, u];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    const n = t[i];
    let o = !1;
    const s = (r) => {
      if (!this._wpDrag) return;
      const l = this.toScene(r);
      if (!o && Math.hypot(l.x - n.x, l.y - n.y) < 4 / this._t.k) return;
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
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: o } = wc(t, e[n], e[n + 1]);
      o < i.dist && (i = { seg: n, dist: o });
    }
    return i.seg;
  }
  /** Insert a new bend on `edge` at scene point `at`, selecting it. */
  addWaypointAt(e, t, i) {
    const n = this.nearestSegment(t, i), o = [...this.edgePoints[e.id] ?? []];
    o.splice(n, 0, i), this._selectedWaypoint = { edgeId: e.id, index: n }, this.emit("edge-points-changed", { id: e.id, points: o });
  }
  /**
   * Dragging along a selected edge splits it: a bend is born once the pointer
   * actually moves, then follows the cursor. A plain click (no movement) leaves
   * the line alone so it just selects — and so a double-click can add a point.
   */
  onEdgeHitPointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0 || this.selectedId !== t.id) return;
    e.stopPropagation();
    const n = this.toScene(e), o = this.nearestSegment(i, n);
    let s = !1;
    const a = (l) => {
      if ((l.buttons & 1) === 0) {
        r();
        return;
      }
      const u = this.toScene(l);
      if (s) {
        if (this._wpDrag) {
          const h = [...this._wpDrag.points];
          h[o] = u, this._wpDrag = { ...this._wpDrag, points: h };
        }
      } else {
        if (Math.hypot(u.x - n.x, u.y - n.y) < 4 / this._t.k) return;
        s = !0, this.focus();
        const h = [...this.edgePoints[t.id] ?? []];
        h.splice(o, 0, u), this._selectedWaypoint = { edgeId: t.id, index: o }, this._wpDrag = { edgeId: t.id, points: h, index: o };
      }
    }, r = () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", r), s && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", r);
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
    const n = this.edgeColor(e), o = this.selectedId === e.id, s = o || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), a = Math.floor((t.length - 1) / 2), r = {
      x: (t[a].x + t[a + 1].x) / 2,
      y: (t[a].y + t[a + 1].y) / 2
    }, l = t.slice(1, -1), u = this.spotlighting && !this._focusEdges.has(e.id);
    return J`
      <g data-edge-ink=${e.id} pointer-events="none" opacity=${e.dim ? 0.18 : u ? 0.1 : e.faint ? 0.4 : 1}>
        <path d=${$c(t, i)}
              fill="none"
              stroke=${n} stroke-width=${s ? 3 : 1.6}
              stroke-dasharray=${e.dashArray ?? (e.dashed ? "6 4" : "")}
              opacity="0.92"
              marker-start=${e.markerStart ? `url(#${e.markerStart}-${this.markerId(n)})` : e.kind === "contains" ? `url(#diamond-${this.markerId(n)})` : ""}
              marker-end=${e.markerEnd ? `url(#${e.markerEnd}-${this.markerId(n)})` : e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? J`<text x=${r.x} y=${r.y - 6} text-anchor="middle"
                  style="cursor: pointer" pointer-events="all"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${n}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(h) => {
      h.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
                  @dblclick=${(h) => {
      h.stopPropagation(), this.emit("element-activated", {
        elementType: "edge",
        id: e.id,
        kind: e.kind,
        x: h.clientX,
        y: h.clientY
      });
    }}>
                  ${e.label}
                </text>` : ""}
        ${o ? l.map((h, m) => {
      var g;
      const f = ((g = this._selectedWaypoint) == null ? void 0 : g.edgeId) === e.id && this._selectedWaypoint.index === m;
      return J`
                <circle data-waypoint cx=${h.x} cy=${h.y} r=${f ? 6 : 5}
                        style=${"fill: " + (f ? "var(--modux-primary, #2563eb)" : "var(--modux-node-fill, #ffffff)") + "; stroke: var(--modux-primary, #2563eb)"}
                        stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(v) => {
        v.button === 0 && (v.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: m }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], m));
      }}
                        @dblclick=${(v) => {
        v.stopPropagation(), this.removeWaypoint(e, m);
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
  /**
   * The edge's concrete color: its authored color, or the theme's --modux-edge
   * resolved through getComputedStyle — a var() can't feed markerId() or the
   * url(#…) marker references.
   */
  edgeColor(e) {
    return e.color ?? (getComputedStyle(this).getPropertyValue("--modux-edge").trim() || "#64748b");
  }
  measureLabel(e, t) {
    return this._measureCtx === void 0 && (this._measureCtx = document.createElement("canvas").getContext("2d")), this._measureCtx ? (this._measureCtx.font = t, this._measureCtx.measureText(e).width) : e.length * 7.3;
  }
  /** Label clipped with an ellipsis so it never spills past `maxW` px of its box. */
  fitLabel(e, t, i = "600 13px ui-sans-serif, system-ui") {
    if (t <= 0 || this.measureLabel(e, i) <= t) return e;
    let n = 0, o = e.length;
    for (; n < o; ) {
      const s = n + o + 1 >> 1;
      this.measureLabel(`${e.slice(0, s)}…`, i) <= t ? n = s : o = s - 1;
    }
    return n > 0 ? `${e.slice(0, n)}…` : "…";
  }
  renderNode(e) {
    var v, b, d, c;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), o = this._hoverNodeId === e.id, s = this.spotlighting && !this._focusNodes.has(e.id), a = !!e.container, r = !!e.parentId, l = ((v = this._resize) == null ? void 0 : v.id) === e.id ? this._resize.w : e.w, u = ((b = this._resize) == null ? void 0 : b.id) === e.id ? this._resize.h : e.h, h = l / 2, m = u / 2, f = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label, g = e.derived ? `${e.tooltip ? `${e.tooltip} — ` : ""}Inferido: stub generado por el sistema (no declarado a mano)` : e.tooltip;
    return J`
      <g data-node-id=${e.id}
         opacity=${e.dim ? 0.25 : s ? 0.16 : 1}
         transform="translate(${t}, ${i})${o ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (d = this._dragGroup) != null && d.has(e.id) ? "none" : "auto"}
         @pointerenter=${() => this.setFocusNode(e.id)}
         @pointerleave=${() => this.setFocusNode(null)}
         @pointerdown=${(y) => this.onNodePointerDown(y, e)}
         @dblclick=${(y) => {
      y.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? J`<rect x=${-h - 4} y=${-m - 4} width=${l + 8} height=${u + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-h} y=${-m} width=${l} height=${u} rx=${r ? 6 : 10}
              style=${"fill: " + (e.fill ?? (e.kind === "note" ? "var(--modux-note-fill, #fef9c3)" : "var(--modux-node-fill, #ffffff)")) + "; stroke: " + (o || n ? "var(--modux-primary, #2563eb)" : e.stroke ?? "var(--modux-node-stroke, #94a3b8)")}
              stroke-width=${n || o ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${g ? J`<title>${g}</title>` : ""}
        </rect>
        ${e.derived ? J`<text x=${-h + 5} y=${-m + 13} font-size="10" style="fill: var(--modux-derive, #a855f7)"
                  pointer-events="none">✦</text>` : ""}
        ${e.badge ? J`<text x=${-h} y=${-m - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  style="fill: var(--modux-text-dim, #64748b)" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? J`<g transform="translate(${h - 13}, ${-m + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(y) => {
      y.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(y) => y.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" style="fill: var(--modux-text-dim, #475569)"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && Tt[e.symbol] && (!r || a) ? J`<g transform="translate(${h - (e.collapsible ? 37 : 17)}, ${-m + 5})" fill="none"
                  style=${"stroke: " + (e.stroke ?? "var(--modux-node-stroke, #64748b)")}
                  stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Tt[e.symbol]}
              </g>` : ""}
        ${r && !a && e.symbol && Tt[e.symbol] ? J`<g transform="translate(${-h + 8}, -6)" fill="none"
                  style=${"stroke: " + (e.stroke ?? "var(--modux-node-stroke, #64748b)")}
                  stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Tt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? J`
              <foreignObject x=${-h + 6} y=${a ? -m + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${a ? "left" : "center"}; border: 1px solid var(--modux-primary, #2563eb); border-radius: 4px; padding: 3px; background: var(--modux-input-bg, #ffffff); color: var(--modux-text, #334155);"
                  .value=${e.label}
                  @pointerdown=${(y) => y.stopPropagation()}
                  @keydown=${(y) => {
      y.stopPropagation(), y.key === "Enter" && this.commitRename(e, y.target.value), y.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(y) => this.commitRename(e, y.target.value)}
                />
              </foreignObject>` : r && !a ? J`<text x=${-h + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" style="fill: var(--modux-text, #1e293b)" pointer-events="none">${f}</text>` : a ? J`<text x=${-h + 12} y=${-m + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" style="fill: var(--modux-text, #1e293b)">${e.label}</text>` : e.kind === "area" ? "" : J`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" style="fill: var(--modux-text, #1e293b)">${this.fitLabel(e.label, l - 16)}</text>`}
        ${a ? J`<line x1=${-h + 8} y1=${-m + 28} x2=${h - 8} y2=${-m + 28}
                style="stroke: var(--modux-border, #e2e8f0)" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (r ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-system" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "note" || e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "boundedContext" || e.kind === "ui" || e.kind === "ui-app" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item" || // Archi style: the ex-nested kinds are free boxes now — same handles.
    e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "read-model" || e.kind === "query-service" || e.kind === "scheduled-trigger" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api-impl" || e.kind === "service") ? [
      [h, 0],
      [-h, 0],
      [0, m],
      [0, -m]
    ].map(
      ([y, _]) => J`
                <circle data-handle cx=${y} cy=${_} r="6"
                        style="fill: var(--modux-primary, #2563eb); stroke: var(--modux-surface, #ffffff)"
                        stroke-width="1.5"
                        @pointerdown=${(A) => this.onHandlePointerDown(A, e)}>
                  <title>${r ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "note" ? "Arrastra hasta cualquier elemento o relación: la nota quedará atada con un hilo" : e.kind === "service" ? "Arrastra hasta un módulo (o su contexto) para desplegarlo en este servicio" : e.kind === "boundedContext" ? "Arrastra hasta otro contexto (elige el patrón DDD), un IdP (identidad) o cualquier elemento (relación ArchiMate)" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${n && this.connectable && ((c = e.extraHandles) != null && c.length) ? e.extraHandles.map(
      (y, _) => J`
                <g transform="translate(${-h + 24 + _ * 20}, ${-m})">
                  <circle data-handle r="7" style=${"fill: " + y.color + "; stroke: var(--modux-surface, #ffffff)"}
                          stroke-width="1.5"
                          @pointerdown=${(A) => this.onHandlePointerDown(A, e, y.kind)}>
                    <title>${y.title}</title>
                  </circle>
                  <circle r="2.4" style="fill: var(--modux-surface, #ffffff)" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${(a || e.resizable) && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([y, _]) => J`
                <rect data-resize x=${y * h - 6.5} y=${_ * m - 6.5} width="13" height="13" rx="2.5"
                      style="fill: var(--modux-primary, #2563eb); stroke: var(--modux-surface, #ffffff)"
                      stroke-width="1.5"
                      style="cursor: ${y * _ > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(A) => this.onResizePointerDown(A, e, y, _)}>
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
            style="stroke: var(--modux-primary, #2563eb)" stroke-width="2" stroke-dasharray="4 4" pointer-events="none"></line>
    `;
  }
  // ---- rubber-band multi-selection ------------------------------------------
  startRubberBand(e) {
    const t = this.toScene(e);
    this._rubber = { a: t, b: t };
    let i = !1;
    const n = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s), window.removeEventListener("pointercancel", n), this._rubber = null;
    }, o = (a) => {
      if ((a.buttons & 1) === 0) {
        n();
        return;
      }
      const r = this.toScene(a);
      !i && Math.hypot(r.x - t.x, r.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: r });
    }, s = () => {
      if (window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a, b: r } = this._rubber, l = Math.min(a.x, r.x), u = Math.max(a.x, r.x), h = Math.min(a.y, r.y), m = Math.max(a.y, r.y), f = this.scene.nodes.filter((g) => {
          const v = this.nodePos(g);
          return v.x >= l && v.x <= u && v.y >= h && v.y <= m;
        }).map((g) => g.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", s), window.addEventListener("pointercancel", n);
  }
  renderRubber() {
    if (!this._rubber) return J``;
    const { a: e, b: t } = this._rubber;
    return J`
      <rect x=${Math.min(e.x, t.x)} y=${Math.min(e.y, t.y)}
            width=${Math.abs(t.x - e.x)} height=${Math.abs(t.y - e.y)}
            style="fill: var(--modux-primary-soft, rgba(37, 99, 235, 0.06)); stroke: var(--modux-primary, #2563eb)"
            stroke-width="1"
            stroke-dasharray="4 3" pointer-events="none"></rect>
    `;
  }
  // ---- minimap -------------------------------------------------------------
  sceneBounds(e = 40) {
    const t = this.scene.nodes;
    if (!t.length) return null;
    const i = Math.min(...t.map((a) => a.x - a.w / 2)) - e, n = Math.max(...t.map((a) => a.x + a.w / 2)) + e, o = Math.min(...t.map((a) => a.y - a.h / 2)) - e, s = Math.max(...t.map((a) => a.y + a.h / 2)) + e;
    return { minX: i, minY: o, w: n - i, h: s - o };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), o = this._t.k, s = Yt.translate(n.width / 2 - o * e, n.height / 2 - o * t).scale(o);
    Ge(i).call(this._zoomBehavior.transform, s);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), o = t.minX + (e.clientX - n.left) / i, s = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(o, s);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return I``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), o = this.getBoundingClientRect(), s = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, r = o.width / this._t.k, l = o.height / this._t.k;
    return I`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(u) => {
      u.stopPropagation();
      try {
        u.currentTarget.setPointerCapture(u.pointerId);
      } catch {
      }
      this.onMinimapPointer(u, e, n);
    }}
        @pointermove=${(u) => {
      var h, m;
      (m = (h = u.currentTarget).hasPointerCapture) != null && m.call(h, u.pointerId) && this.onMinimapPointer(u, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((u) => {
      const h = this.nodePos(u);
      return J`<rect
              x=${(h.x - u.w / 2 - e.minX) * n}
              y=${(h.y - u.h / 2 - e.minY) * n}
              width=${Math.max(2, u.w * n)}
              height=${Math.max(2, u.h * n)}
              rx="1" style=${"fill: " + (u.fill ?? "var(--modux-border, #e2e8f0)") + "; stroke: var(--modux-node-stroke, #94a3b8)"}
              stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(s - e.minX) * n}
            y=${(a - e.minY) * n}
            width=${r * n}
            height=${l * n}
            style="fill: var(--modux-primary-soft, rgba(37, 99, 235, 0.08)); stroke: var(--modux-primary, #2563eb)"
            stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((o) => this.edgeColor(o)))], t = [], i = [], n = [];
    return this.scene.edges.forEach((o) => {
      const s = this.edgePolyline(o);
      if (s) {
        i.push(this.renderEdgeHit(o, s)), n.push(this.renderEdgeInk(o, s, [...t]));
        for (let a = 0; a < s.length - 1; a++) t.push([s[a], s[a + 1]]);
      }
    }), I`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(o) => {
      const s = o.target;
      s.closest("[data-node-id]") || s.closest("[data-edge-id]") || this._spaceDown || o.button !== 0 || (o.buttons & 1) !== 0 && this.startRubberBand(o);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" style="fill: var(--modux-dots, #e2e8f0)"></circle>
          </pattern>
          ${e.map(
      (o) => J`
              <marker id="arrow-${this.markerId(o)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${o}></path>
              </marker>
              <marker id="diamond-${this.markerId(o)}" viewBox="0 0 12 8" refX="1" refY="4"
                      markerWidth="12" markerHeight="8" orient="auto">
                <path d="M 1 4 L 6 1 L 11 4 L 6 7 z" fill=${o}></path>
              </marker>
              <marker id="diamond-hollow-${this.markerId(o)}" viewBox="0 0 12 8" refX="1" refY="4"
                      markerWidth="12" markerHeight="8" orient="auto">
                <path d="M 1 4 L 6 1 L 11 4 L 6 7 z" fill="var(--modux-canvas-bg, #fafafa)" stroke=${o} stroke-width="1"></path>
              </marker>
              <marker id="ball-${this.markerId(o)}" viewBox="0 0 8 8" refX="4" refY="4"
                      markerWidth="7" markerHeight="7" orient="auto">
                <circle cx="4" cy="4" r="3" fill=${o}></circle>
              </marker>
              <marker id="open-arrow-${this.markerId(o)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 1 1 L 9 5 L 1 9" fill="none" stroke=${o} stroke-width="1.4"></path>
              </marker>
              <marker id="hollow-triangle-${this.markerId(o)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="9" markerHeight="9" orient="auto-start-reverse">
                <path d="M 1 1 L 9 5 L 1 9 z" fill="var(--modux-canvas-bg, #fafafa)" stroke=${o} stroke-width="1.2"></path>
              </marker>`
    )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${i}
          ${this.scene.nodes.filter((o) => !o.parentId).map((o) => this.renderNode(o))}
          ${this.scene.nodes.filter((o) => o.parentId).map((o) => this.renderNode(o))}
          ${n}
          ${this._menuSlots ? J`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (o, s) => J`
                    <line x1=${o.x1} y1=${o.y} x2=${o.x2} y2=${o.y}
                          stroke=${s === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${s === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${s === this._menuSlots.active ? J`<circle cx=${o.x1} cy=${o.y} r="3.5" fill="#0284c7"></circle>
                          <circle cx=${o.x2} cy=${o.y} r="3.5" fill="#0284c7"></circle>` : ""}`
    )}
              </g>` : ""}
          ${this._guides ? J`
                ${this._guides.v.map(
      (o) => J`<line x1=${o} y1="-100000" x2=${o} y2="100000"
                        style="stroke: var(--modux-guide, #ec4899)" stroke-width=${1 / this._t.k} pointer-events="none"></line>`
    )}
                ${this._guides.h.map(
      (o) => J`<line x1="-100000" y1=${o} x2="100000" y2=${o}
                        style="stroke: var(--modux-guide, #ec4899)" stroke-width=${1 / this._t.k} pointer-events="none"></line>`
    )}
              ` : ""}
          ${this.renderPendingLink()}
          ${this.renderRubber()}
        </g>
        ${this.scene.nodes.length === 0 ? J`<text x="50%" y="45%" text-anchor="middle" font-size="15" style="fill: var(--modux-text-faint, #94a3b8)"
                    font-family="ui-sans-serif, system-ui" pointer-events="none">
                  Lienzo vacío — arrastra elementos de la paleta o crea algo nuevo para empezar
                </text>` : ""}
      </svg>
      ${this.renderMinimap()}
    `;
  }
};
ye.styles = nt`
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
      background: var(--modux-surface, rgba(255, 255, 255, 0.85));
      border: 1px solid var(--modux-border, #cbd5e1);
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
  de({ attribute: !1 })
], ye.prototype, "scene", 2);
ke([
  de({ attribute: !1 })
], ye.prototype, "selectedId", 2);
ke([
  de({ attribute: !1 })
], ye.prototype, "selectedIds", 2);
ke([
  de({ type: Boolean })
], ye.prototype, "connectable", 2);
ke([
  de({ attribute: !1 })
], ye.prototype, "edgePoints", 2);
ke([
  U()
], ye.prototype, "_t", 2);
ke([
  U()
], ye.prototype, "_dragPos", 2);
ke([
  U()
], ye.prototype, "_menuSlots", 2);
ke([
  U()
], ye.prototype, "_dragGroup", 2);
ke([
  U()
], ye.prototype, "_guides", 2);
ke([
  U()
], ye.prototype, "_pendingLink", 2);
ke([
  U()
], ye.prototype, "_hoverNodeId", 2);
ke([
  U()
], ye.prototype, "_focusNodeId", 2);
ke([
  U()
], ye.prototype, "_editingId", 2);
ke([
  U()
], ye.prototype, "_spaceDown", 2);
ke([
  U()
], ye.prototype, "_wpDrag", 2);
ke([
  U()
], ye.prototype, "_selectedWaypoint", 2);
ke([
  U()
], ye.prototype, "_resize", 2);
ke([
  U()
], ye.prototype, "_rubber", 2);
ke([
  de({ attribute: !1 })
], ye.prototype, "fitInsets", 2);
ye = ke([
  mt("modux-canvas")
], ye);
const la = nt`
  :host {
    --modux-canvas-bg: #fafafa;
    --modux-surface: #ffffff;
    --modux-surface-2: #f1f5f9;
    --modux-border: #e2e8f0;
    --modux-border-strong: #cbd5e1;
    --modux-text: #334155;
    --modux-text-dim: #64748b;
    --modux-text-faint: #94a3b8;
    --modux-node-fill: #ffffff;
    --modux-node-stroke: #94a3b8;
    --modux-edge: #64748b;
    --modux-primary: #2563eb;
    --modux-primary-soft: rgba(37, 99, 235, 0.08);
    --modux-primary-text: #ffffff;
    --modux-dots: #e2e8f0;
    --modux-guide: #ec4899;
    --modux-note-fill: #fef9c3;
    --modux-danger: #dc2626;
    --modux-derive: #a855f7;
    --modux-input-bg: #ffffff;
  }
  :host([dark]) {
    --modux-canvas-bg: var(--lumo-base-color, #181a1b);
    --modux-surface: var(--lumo-contrast-5pct, #1f2123);
    --modux-surface-2: var(--lumo-contrast-10pct, #26282b);
    --modux-border: var(--lumo-contrast-20pct, #3a3d42);
    --modux-border-strong: var(--lumo-contrast-30pct, #4b4f55);
    --modux-text: var(--lumo-body-text-color, #e8e9ea);
    --modux-text-dim: var(--lumo-secondary-text-color, #a8adb4);
    --modux-text-faint: var(--lumo-tertiary-text-color, #7d838b);
    --modux-node-fill: var(--lumo-contrast-5pct, #232527);
    --modux-node-stroke: var(--lumo-contrast-40pct, #6b7280);
    --modux-edge: var(--lumo-secondary-text-color, #9aa1a9);
    --modux-primary: var(--lumo-primary-color, #60a5fa);
    --modux-primary-soft: var(--lumo-primary-color-10pct, rgba(96, 165, 250, 0.14));
    --modux-primary-text: var(--lumo-primary-contrast-color, #ffffff);
    --modux-dots: var(--lumo-contrast-10pct, #2c2f33);
    --modux-guide: #f472b6;
    --modux-note-fill: #453d10;
    --modux-danger: var(--lumo-error-color, #f87171);
    --modux-derive: #c084fc;
    --modux-input-bg: var(--lumo-base-color, #181a1b);
  }
`, ae = {
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
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const At = (e) => e.trim().toLowerCase();
function _c(e, t, i = /* @__PURE__ */ new Set(), n = !1) {
  var C, Y, B, O, W;
  const o = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.boundedContexts.map((x) => [x.id, x.name])), a = e.boundedContexts.flatMap(
    (x) => (x.useCases ?? []).map((w) => ({ ...w, boundedContextId: x.id }))
  ), r = new Set(a.map((x) => x.id)), l = e.aggregates ?? [], u = new Set(
    e.boundedContexts.flatMap((x) => (x.domainServices ?? []).map((w) => w.id))
  ), h = e.boundedContexts.flatMap(
    (x) => (x.domainEvents ?? []).map((w) => ({ ...w, boundedContextId: x.id, application: !1 }))
  ), m = e.boundedContexts.flatMap(
    (x) => (x.applicationEvents ?? []).map((w) => ({ ...w, boundedContextId: x.id, application: !0 }))
  ), f = e.boundedContexts.flatMap(
    (x) => (x.readModels ?? []).map((w) => ({ ...w, boundedContextId: x.id }))
  );
  for (const x of a)
    Oe(o, {
      id: x.id,
      label: x.name,
      x: 0,
      y: 0,
      w: ae.command.w,
      h: ae.command.h,
      kind: "use-case",
      symbol: x.policy ? "flow" : "gear",
      fill: x.policy ? ae.policy.fill : ae.command.fill,
      stroke: x.policy ? ae.policy.stroke : ae.command.stroke,
      badge: x.policy ? "POLICY" : "COMANDO",
      tooltip: x.policy ? `${x.name} — policy de ${s.get(x.boundedContextId) ?? x.boundedContextId} (reacción, no caso de negocio)` : `${x.name} — caso de uso de ${s.get(x.boundedContextId) ?? x.boundedContextId}`
    });
  for (const x of a) {
    const w = x.steps ?? [];
    if (!w.length) continue;
    const R = o.nodes.get(x.id), $ = n || i.has(x.id);
    R && (R.collapsible = !0, R.collapsed = !$), $ && w.forEach((k, P) => {
      Oe(o, {
        id: k.id,
        label: `${P + 1}. ${k.name || k.type || "paso"}`,
        x: 0,
        y: 0,
        w: ae.command.w,
        h: 30,
        kind: "use-case-step",
        symbol: "gear",
        fill: "#eff6ff",
        stroke: "#1d4ed8",
        dashed: !!k.customCodeId,
        ownerId: x.id,
        tooltip: `Paso de ${x.name}${k.customCodeId ? " — delega en código a mano" : ""} — arrastra su asa hasta un CODE para delegar en él`
      }), me(o, {
        id: `esstep:${P === 0 ? x.id : w[P - 1].id}->${k.id}`,
        sourceId: P === 0 ? x.id : w[P - 1].id,
        targetId: k.id,
        kind: "es-step",
        color: "#94a3b8",
        dashed: !0,
        arrow: !0,
        tooltip: `pipeline de ${x.name}`
      });
    });
  }
  for (const x of e.customCodes ?? [])
    Oe(o, {
      id: x.id,
      label: x.name,
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
      tooltip: `${x.name} — código a mano: los pasos Custom delegan en él`
    });
  for (const x of a)
    for (const w of x.steps ?? []) {
      if (!w.customCodeId) continue;
      const R = !o.nodes.has(w.id), $ = R ? x.id : w.id;
      R && o.edges.some((k) => k.kind === "es-custom" && k.sourceId === $ && k.targetId === w.customCodeId) || me(o, {
        id: `escc:${w.id}`,
        sourceId: $,
        targetId: w.customCodeId,
        kind: "es-custom",
        color: "#0f172a",
        dashed: !0,
        arrow: !0,
        tooltip: R ? `Un paso plegado de ${x.name} delega en este código — expande el comando para verlo` : "El paso delega en código a mano — Supr lo desconecta"
      });
    }
  for (const x of l)
    Oe(o, {
      id: x.id,
      label: x.name,
      x: 0,
      y: 0,
      w: ae.aggregate.w,
      h: ae.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: ae.aggregate.fill,
      stroke: ae.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${x.name} — agregado de ${s.get(x.boundedContextId) ?? x.boundedContextId}`
    });
  const g = /* @__PURE__ */ new Map();
  for (const x of [...h, ...m])
    Oe(o, {
      id: x.id,
      label: x.name,
      x: 0,
      y: 0,
      w: ae.event.w,
      h: ae.event.h,
      kind: x.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: ae.event.fill,
      stroke: ae.event.stroke,
      badge: x.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${x.name} — evento de ${s.get(x.boundedContextId) ?? x.boundedContextId}`
    }), g.set(At(x.name), x.id);
  const v = (x) => {
    if (!x || !x.trim()) return null;
    const w = g.get(At(x));
    if (w) return w;
    const R = `evname:${At(x)}`;
    return Oe(o, {
      id: R,
      label: x,
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
      tooltip: `${x} — referenciado por nombre, sin evento declarado en el catálogo`
    }), R;
  }, b = (x) => {
    const w = f.find(($) => $.id === x.id) ?? f.find(($) => x.name && At($.name) === At(x.name)), R = (w == null ? void 0 : w.id) ?? (x.id || (x.name ? `rm:${At(x.name)}` : null));
    return R ? (Oe(o, {
      id: R,
      label: (w == null ? void 0 : w.name) ?? x.name ?? R,
      x: 0,
      y: 0,
      w: ae.readModel.w,
      h: ae.readModel.h,
      kind: w ? "read-model" : "derived-read-model",
      fill: ae.readModel.fill,
      stroke: ae.readModel.stroke,
      dashed: !w,
      badge: "READ MODEL"
    }), R) : null;
  };
  for (const x of e.actorUses ?? []) {
    if (!r.has(x.targetId)) continue;
    const w = (e.actors ?? []).find((R) => R.id === x.actorId);
    w && (Oe(o, {
      id: w.id,
      label: w.name,
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
      id: `es-actor:${w.id}->${x.targetId}`,
      sourceId: w.id,
      targetId: x.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const x of e.aiAgents ?? []) {
    const w = (e.agentUses ?? []).filter((M) => M.agentId === x.id), R = (e.agentExternalUses ?? []).filter((M) => M.agentId === x.id), $ = (e.agentRags ?? []).filter((M) => M.agentId === x.id), k = (e.agentMcpUses ?? []).filter((M) => M.agentId === x.id), P = (e.agentGatewayUses ?? []).some((M) => M.agentId === x.id) || (e.agentApiOpUses ?? []).some((M) => M.agentId === x.id) || (e.agentQueryUses ?? []).some((M) => M.agentId === x.id) || (e.agentDelegations ?? []).some((M) => M.agentId === x.id) || (e.agentTriggers ?? []).some((M) => M.agentId === x.id);
    if (!(!w.length && !R.length && !$.length && !k.length && !P)) {
      Oe(o, {
        id: x.id,
        label: x.name,
        x: 0,
        y: 0,
        w: ae.actor.w,
        h: ae.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${x.name} — agente de IA (consume por MCP)`
      });
      for (const M of w)
        r.has(M.useCaseId) && me(o, {
          id: `es-agent:${x.id}->${M.useCaseId}`,
          sourceId: x.id,
          targetId: M.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const M of R) {
        const q = e.externalSystems.find(
          (z) => (z.useCases ?? []).some((j) => j.id === M.externalUseCaseId)
        );
        if (!q) continue;
        const D = (C = (q.useCases ?? []).find((z) => z.id === M.externalUseCaseId)) == null ? void 0 : C.name;
        Oe(o, {
          id: q.id,
          label: q.name,
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
          id: `es-agentx:${x.id}->${M.externalUseCaseId}`,
          sourceId: x.id,
          targetId: q.id,
          kind: "es-agent-external",
          label: D,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: D ? `Llama a ${D} del sistema externo` : void 0
        });
      }
      for (const M of k) {
        const q = e.externalSystems.find(
          (z) => (z.mcpServers ?? []).some((j) => j.id === M.mcpServerId)
        );
        if (!q) continue;
        const D = (Y = (q.mcpServers ?? []).find((z) => z.id === M.mcpServerId)) == null ? void 0 : Y.name;
        Oe(o, {
          id: q.id,
          label: q.name,
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
          id: `es-agentmcp:${x.id}->${M.mcpServerId}`,
          sourceId: x.id,
          targetId: q.id,
          kind: "es-agent-mcp",
          label: D,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: D ? `Consume las herramientas del servidor MCP ${D}` : void 0
        });
      }
      for (const M of $) {
        const q = (e.rags ?? []).find((D) => D.id === M.ragId);
        if (q) {
          Oe(o, {
            id: q.id,
            label: q.name,
            x: 0,
            y: 0,
            w: ae.readModel.w,
            h: ae.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${q.name} — base de conocimiento (retrieval)`
          }), me(o, {
            id: `es-agrag:${x.id}->${q.id}`,
            sourceId: x.id,
            targetId: q.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const D of q.sourceReadModelIds ?? []) {
            const z = b({ id: D });
            z && me(o, {
              id: `es-ragsrc:${q.id}->${z}`,
              sourceId: z,
              targetId: q.id,
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
  const d = (x) => {
    const w = e.externalSystems.find((R) => R.id === x);
    return w ? (Oe(o, {
      id: w.id,
      label: w.name,
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
    }), w.id) : null;
  };
  for (const x of e.externalCalls ?? []) {
    const w = d(x.externalSystemId);
    !w || !r.has(x.useCaseId) || me(o, {
      id: `es-extin:${w}->${x.useCaseId}`,
      sourceId: w,
      targetId: x.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const x of e.externalUseCaseCalls ?? []) {
    if (!r.has(x.sourceId)) continue;
    const w = e.externalSystems.find(
      (k) => (k.useCases ?? []).some((P) => P.id === x.targetId)
    ), R = w ? d(w.id) : null;
    if (!R) continue;
    const $ = (B = ((w == null ? void 0 : w.useCases) ?? []).find((k) => k.id === x.targetId)) == null ? void 0 : B.name;
    me(o, {
      id: `es-extout:${x.sourceId}->${x.targetId}`,
      sourceId: x.sourceId,
      targetId: R,
      kind: "es-command-external",
      label: $,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: $ ? `Llama a ${$} del sistema externo` : void 0
    });
  }
  for (const x of e.aggregateCalls ?? [])
    !r.has(x.sourceId) || !o.nodes.has(x.targetId) || me(o, {
      id: `es-write:${x.sourceId}->${x.targetId}`,
      sourceId: x.sourceId,
      targetId: x.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const c = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const x of c)
    !o.nodes.has(x.domainEventId) || !(o.nodes.has(x.sourceId) && (r.has(x.sourceId) || l.some((R) => R.id === x.sourceId) || u.has(x.sourceId))) || me(o, {
      id: `es-emit:${x.sourceId}->${x.domainEventId}`,
      sourceId: x.sourceId,
      targetId: x.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const y = (x, w, R, $, k, P) => (Oe(o, {
    id: x,
    label: w,
    x: 0,
    y: 0,
    w: ae.policy.w,
    h: ae.policy.h,
    kind: R,
    symbol: "flow",
    fill: ae.policy.fill,
    stroke: ae.policy.stroke,
    badge: $,
    tooltip: k
  }), x), _ = (x, w) => {
    const R = v(x);
    R && me(o, {
      id: `es-trigger:${R}->${w}`,
      sourceId: R,
      targetId: w,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, A = (x, w) => {
    !w || !r.has(w) || me(o, {
      id: `es-invoke:${x}->${w}`,
      sourceId: x,
      targetId: w,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const x of e.subscriptions ?? []) {
    const w = y(
      x.id,
      x.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${x.name}${x.eventName ? ` — reacciona a ${x.eventName}` : ""}${x.consumerGroup ? ` · grupo ${x.consumerGroup}` : ""}`
    );
    _(x.eventName, w);
    for (const R of x.actions ?? []) {
      if (R.type === "CallUseCase" && A(w, R.useCaseId), R.type === "StartSaga" && R.sagaId) {
        const $ = `saga:${R.sagaId}`;
        y($, R.sagaId, "saga", "SAGA"), me(o, {
          id: `es-saga:${w}->${$}`,
          sourceId: w,
          targetId: $,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (R.type === "UpdateProjection" && R.projectionId) {
        const $ = (e.projections ?? []).find((k) => k.id === R.projectionId);
        $ && me(o, {
          id: `es-feeds:${w}->${$.id}`,
          sourceId: w,
          targetId: $.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const x of e.projections ?? []) {
    const w = y(
      x.id,
      x.name,
      "projection",
      "PROYECCIÓN",
      `${x.name}${x.readModelName ? ` — materializa ${x.readModelName}` : ""}`
    );
    for (const k of x.handledEventIds) {
      const P = o.nodes.has(k) ? k : null;
      P && me(o, {
        id: `es-trigger:${P}->${w}`,
        sourceId: P,
        targetId: w,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    x.sourceAggregateId && o.nodes.has(x.sourceAggregateId) && me(o, {
      id: `es-state:${x.id}`,
      sourceId: x.sourceAggregateId,
      targetId: w,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const R = x.sourceExternalUseCaseId ?? x.sourceExternalTableId;
    if (R) {
      const k = e.externalSystems.find(
        (M) => (M.useCases ?? []).some((q) => q.id === R) || (M.tables ?? []).some((q) => q.id === R)
      ), P = k ? d(k.id) : null;
      if (P) {
        const M = ((O = (k.useCases ?? []).find((q) => q.id === R)) == null ? void 0 : O.name) ?? ((W = (k.tables ?? []).find((q) => q.id === R)) == null ? void 0 : W.name);
        me(o, {
          id: `es-poll:${x.id}`,
          sourceId: P,
          targetId: w,
          kind: "es-projects-poll",
          label: M,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: M ? `polling de ${M}` : "polling"
        });
      }
    }
    const $ = b({ id: x.readModelId, name: x.readModelName });
    $ && me(o, {
      id: `es-projects:${w}->${$}`,
      sourceId: w,
      targetId: $,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const x of e.flows) {
    if (x.archetype === "MATERIALIZES") {
      const R = v(x.triggerEvent), $ = b({ name: x.readModelName ?? `${x.triggerEvent}View` });
      R && $ && me(o, {
        id: `es-mat:${x.id}`,
        sourceId: R,
        targetId: $,
        kind: "es-materializes",
        label: x.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${x.name} [MATERIALIZES]`
      });
      continue;
    }
    const w = y(
      `flow:${x.id}`,
      x.name,
      "flow",
      `POLICY · ${x.archetype}`,
      `Flow ${x.name} [${x.archetype}]`
    );
    if (_(x.triggerEvent, w), A(w, x.targetUseCaseId), !x.targetUseCaseId) {
      const R = d(x.targetId), $ = R ?? `tgt:${x.targetId}`;
      !R && s.has(x.targetId) && Oe(o, {
        id: $,
        label: s.get(x.targetId) ?? x.targetId,
        x: 0,
        y: 0,
        w: ae.boundedContext.w,
        h: ae.boundedContext.h,
        kind: "boundedContext",
        symbol: "component",
        fill: ae.boundedContext.fill,
        stroke: ae.boundedContext.stroke,
        badge: "CONTEXTO"
      }), o.nodes.has($) && me(o, {
        id: `es-deliver:${x.id}`,
        sourceId: w,
        targetId: $,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const x of e.processes ?? []) {
    const w = y(
      x.id,
      x.name,
      "process",
      `PROCESO${x.sla ? ` · SLA ${x.sla}` : ""}`,
      `${x.name}${x.triggerEvent ? ` — arranca con ${x.triggerEvent}` : ""}`
    );
    _(x.triggerEvent, w);
    for (const $ of x.steps) A(w, $.useCaseId);
    const R = v(x.onCompletionEventName);
    R && me(o, {
      id: `es-done:${x.id}`,
      sourceId: w,
      targetId: R,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const x of e.workflows ?? []) {
    const w = y(
      x.id,
      x.name,
      "workflow",
      "WORKFLOW",
      `${x.name}${x.triggerEvent ? ` — arranca con ${x.triggerEvent}` : ""}`
    );
    _(x.triggerEvent, w);
    for (const $ of x.steps ?? []) {
      A(w, $.targetUseCaseId);
      for (const k of [$.emittedEventName, $.completionEventName]) {
        const P = v(k);
        P && me(o, {
          id: `es-wfemit:${x.id}:${P}`,
          sourceId: w,
          targetId: P,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const R = v(x.onCompletionEventName);
    R && me(o, {
      id: `es-done:${x.id}`,
      sourceId: w,
      targetId: R,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const S = [...o.nodes.values()], E = /* @__PURE__ */ new Map();
  for (const x of o.edges)
    E.has(x.targetId) || E.set(x.targetId, []), E.get(x.targetId).push(x.sourceId);
  const N = /* @__PURE__ */ new Map(), V = /* @__PURE__ */ new Set(), G = (x) => {
    const w = N.get(x);
    if (w !== void 0) return w;
    if (V.has(x)) return 0;
    V.add(x);
    const R = E.get(x) ?? [], $ = R.length ? 1 + Math.max(...R.map(G)) : 0;
    return V.delete(x), N.set(x, $), $;
  }, se = /* @__PURE__ */ new Map();
  for (const x of S) {
    const w = t[x.id];
    if (w) {
      x.x = w.x, x.y = w.y;
      continue;
    }
    const R = G(x.id), $ = se.get(R) ?? 0;
    se.set(R, $ + 1), x.x = 140 + R * 260, x.y = 110 + $ * 110;
  }
  return { nodes: S, edges: o.edges };
}
const Cc = 190, Ec = 56, to = 180, Sc = 56, Ac = 150, Mc = 44, io = 250, no = 100;
function Pc(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (o) => {
    if (i.has(o.id)) return 0;
    i.add(o.id);
    const s = (o.dependsOnStepIds ?? []).map((r) => t.get(r)).filter(Boolean), a = s.length ? 1 + Math.max(...s.map(n)) : 0;
    return i.delete(o.id), a;
  };
  return n(e);
}
function Tc(e, t) {
  if (t.triggerAggregateId) {
    const i = (e.aggregates ?? []).find((n) => n.id === t.triggerAggregateId);
    if (i) return { id: i.id, label: i.name, kind: "aggregate", symbol: "aggregate" };
  }
  if (t.triggerDomainServiceId) {
    const i = e.boundedContexts.flatMap((n) => n.domainServices ?? []).find((n) => n.id === t.triggerDomainServiceId);
    if (i) return { id: i.id, label: i.name, kind: "domain-service", symbol: "gear" };
  }
  if (t.triggerUseCaseId) {
    const i = e.boundedContexts.flatMap((n) => n.useCases ?? []).find((n) => n.id === t.triggerUseCaseId);
    if (i) return { id: i.id, label: i.name, kind: "use-case", symbol: "gear" };
  }
  return null;
}
function Oc(e, t, i = /* @__PURE__ */ new Set(), n = !1) {
  var b;
  const o = [], s = [], a = /* @__PURE__ */ new Set(), r = (d) => {
    var c;
    return (c = e.boundedContexts.flatMap((y) => y.useCases ?? []).find((y) => y.id === d)) == null ? void 0 : c.name;
  };
  let l = 140;
  (e.workflows ?? []).forEach((d) => {
    var se;
    const c = new Map(d.steps.map((C) => [C.id, C])), y = new Map(d.steps.map((C) => [C.id, Pc(C, c)])), _ = /* @__PURE__ */ new Map();
    for (const C of d.steps) {
      const Y = y.get(C.id) ?? 0;
      _.set(Y, (_.get(Y) ?? 0) + 1);
    }
    const A = Math.max(1, ..._.values()), S = Tc(e, d);
    if (S && !a.has(S.id)) {
      a.add(S.id);
      const C = t[S.id] ?? { x: 140, y: l };
      o.push({
        id: S.id,
        label: S.label,
        x: C.x,
        y: C.y,
        w: Ac,
        h: Mc,
        kind: S.kind,
        symbol: S.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: S.kind === "aggregate" ? "AGGREGATE" : S.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const E = t[d.id] ?? { x: 420, y: l }, N = n || i.has(d.id);
    o.push({
      id: d.id,
      label: d.name,
      x: E.x,
      y: E.y,
      w: Cc,
      h: Ec,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      collapsible: d.steps.length > 0,
      collapsed: d.steps.length > 0 && !N,
      tooltip: `${d.name}${d.triggerEvent ? ` — arranca con ${d.triggerEvent}` : ""}${d.onCompletionEventName ? ` · emite ${d.onCompletionEventName} al completar` : ""}`
    }), S && s.push({
      id: `wft:${d.id}`,
      sourceId: S.id,
      targetId: d.id,
      kind: "workflow-trigger",
      label: d.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: d.triggerEvent ? `Evento: ${d.triggerEvent}` : void 0
    });
    const V = /* @__PURE__ */ new Map();
    let G = 0;
    for (const C of N ? d.steps : []) {
      const Y = y.get(C.id) ?? 0;
      G = Math.max(G, Y);
      const B = V.get(Y) ?? 0;
      V.set(Y, B + 1);
      const O = t[C.id] ?? {
        x: E.x + (Y + 1) * io,
        y: l + (B - (_.get(Y) - 1) / 2) * no
      }, W = r(C.targetUseCaseId);
      o.push({
        ownerId: d.id,
        id: C.id,
        label: C.name,
        x: O.x,
        y: O.y,
        w: C.type === "JOIN" || C.type === "SPLIT" ? 100 : to,
        h: C.type === "JOIN" || C.type === "SPLIT" ? 48 : Sc,
        kind: "workflow-step",
        symbol: C.type === "JOIN" || C.type === "SPLIT" ? "flow" : C.roleId ? "actor" : "event",
        fill: C.type === "JOIN" || C.type === "SPLIT" ? "#f5f3ff" : C.roleId ? "#fef9c3" : "#ffffff",
        stroke: C.roleId && C.type !== "JOIN" && C.type !== "SPLIT" ? "#ca8a04" : "#6d28d9",
        dashed: C.type === "JOIN" || C.type === "SPLIT",
        badge: C.type === "JOIN" ? "⨝ JOIN" : C.type === "SPLIT" ? "⑃ SPLIT" : C.roleId ? `👤 ${C.roleId}${C.formPageId ? " · 📋" : ""}${C.deadline ? ` · ${C.deadline}` : ""}` : W ? `→ ${W}` : "∅ sin use case",
        tooltip: C.type === "JOIN" ? `${C.name} — espera a TODAS sus dependencias antes de seguir` : C.type === "SPLIT" ? `${C.name} — abre ramas paralelas: los pasos que dependan de él arrancan a la vez` : `${C.name}${C.roleId ? ` · tarea HUMANA de ${C.roleId}${C.deadline ? ` (plazo ${C.deadline})` : ""}` : ""}${C.emittedEventName ? ` · emite ${C.emittedEventName}` : ""}${W ? ` · lanza ${W}` : ""}${C.completionEventName ? ` · espera ${C.completionEventName}` : ""}${C.compensationUseCaseId ? " · ⎌ compensable" : ""}`
      });
      const x = (C.dependsOnStepIds ?? []).filter((w) => c.has(w));
      x.length === 0 && s.push({
        id: `wfs:${d.id}:${C.id}`,
        sourceId: d.id,
        targetId: C.id,
        kind: "workflow-start",
        label: C.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const w of x)
        s.push({
          id: `wfdep:${w}->${C.id}`,
          sourceId: w,
          targetId: C.id,
          kind: "workflow-dependency",
          label: C.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${C.name} espera a ${((se = c.get(w)) == null ? void 0 : se.name) ?? w}`
        });
    }
    if (d.onCompletionEventName) {
      const C = `done:${d.id}`, Y = t[C] ?? { x: E.x + (G + 2) * io, y: l };
      o.push({
        id: C,
        label: d.onCompletionEventName,
        x: Y.x,
        y: Y.y,
        w: to,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const B = new Set(d.steps.flatMap((W) => W.dependsOnStepIds ?? [])), O = d.steps.filter((W) => !B.has(W.id));
      for (const W of O.length ? O : [])
        s.push({
          id: `wfd:${d.id}:${W.id}`,
          sourceId: W.id,
          targetId: C,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      d.steps.length || s.push({
        id: `wfd:${d.id}`,
        sourceId: d.id,
        targetId: C,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    l += Math.max(2, A + 1) * no + 60;
  });
  const u = new Set(o.map((d) => d.id));
  (e.workflowGateways ?? []).forEach((d, c) => {
    const y = t[d.id] ?? { x: 200 + c % 5 * 220, y: 60 };
    o.push({
      id: d.id,
      label: d.name,
      x: y.x,
      y: y.y,
      w: 100,
      h: 48,
      kind: "workflow-gateway",
      symbol: "flow",
      fill: "#f5f3ff",
      stroke: "#6d28d9",
      dashed: !0,
      badge: d.type === "SPLIT" ? d.semantics === "EXCLUSIVE" ? "⑃ EXCLUSIVO" : "⑃ PARALELO" : d.semantics === "ANY" ? "⨝ CUALQUIERA" : "⨝ TODAS",
      tooltip: d.type === "SPLIT" ? `${d.name} — split ${d.semantics === "EXCLUSIVE" ? "exclusivo: elige UNA rama" : "paralelo: abre TODAS las ramas"}; doble click cambia la semántica` : `${d.name} — join que ${d.semantics === "ANY" ? "arranca con CUALQUIER entrada" : "espera a TODAS sus entradas"}; doble click cambia la semántica`
    }), u.add(d.id);
  });
  for (const d of e.workflowGateways ?? []) {
    for (const y of d.sourceIds ?? [])
      u.has(y) && s.push({
        id: `wflink:${y}->${d.id}`,
        sourceId: y,
        targetId: d.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const c = d.type === "SPLIT" && d.semantics === "EXCLUSIVE";
    for (const y of d.targetIds ?? []) {
      if (!u.has(y)) continue;
      const _ = c ? (b = (d.branchConditions ?? []).find((A) => A.targetId === y)) == null ? void 0 : b.expression : void 0;
      s.push({
        id: `wflink:${d.id}->${y}`,
        sourceId: d.id,
        targetId: y,
        kind: "wf-link",
        color: "#6d28d9",
        dashed: c && !_,
        arrow: !0,
        label: _ ?? (c ? "¿condición?" : void 0),
        tooltip: c ? `${_ ? `Rama si: ${_}` : "Rama sin condición aún"} — doble click la edita; Supr desconecta` : "el gateway fluye aquí — Supr lo desconecta"
      });
    }
  }
  (e.workflows ?? []).flatMap((c) => (c.steps ?? []).filter((y) => y.roleId && u.has(y.id))).forEach((c, y) => {
    const _ = (e.actors ?? []).find((S) => S.id === c.roleId), A = c.roleId;
    if (!u.has(A)) {
      const S = o.find((N) => N.id === c.id), E = t[A] ?? {
        x: S ? S.x - 90 : 120 + y * 200,
        y: S ? S.y - 120 : 40
      };
      o.push({
        id: A,
        label: (_ == null ? void 0 : _.name) ?? A,
        x: E.x,
        y: E.y,
        w: 130,
        h: 44,
        kind: "actor",
        symbol: "person",
        fill: "#fef9c3",
        stroke: "#ca8a04",
        badge: "ROL",
        tooltip: `${(_ == null ? void 0 : _.name) ?? A} — su lista de tareas recibe los pasos humanos conectados`
      }), u.add(A);
    }
    s.push({
      id: `wfrole:${c.id}->${A}`,
      sourceId: A,
      targetId: c.id,
      kind: "wf-role",
      color: "#ca8a04",
      dashed: !0,
      arrow: !0,
      tooltip: "la tarea cae en la lista de este rol — Supr la vuelve automática"
    });
  }), (e.workflows ?? []).flatMap((c) => (c.steps ?? []).filter((y) => y.formPageId && u.has(y.id))).forEach((c, y) => {
    const _ = (e.pages ?? []).find((A) => A.id === c.formPageId);
    if (_) {
      if (!u.has(_.id)) {
        const A = o.find((E) => E.id === c.id), S = t[_.id] ?? {
          x: A ? A.x : 200 + y * 220,
          y: A ? A.y + 130 : 60
        };
        o.push({
          id: _.id,
          label: _.name,
          x: S.x,
          y: S.y,
          w: 160,
          h: 48,
          kind: "page",
          symbol: "page",
          fill: "#fff7ed",
          stroke: "#ca8a04",
          badge: "📋 FORMULARIO",
          tooltip: `${_.name} — el forms engine la presenta como formulario de la tarea`
        }), u.add(_.id);
      }
      s.push({
        id: `wfform:${c.id}->${_.id}`,
        sourceId: c.id,
        targetId: _.id,
        kind: "wf-form",
        color: "#ca8a04",
        dashed: !0,
        arrow: !0,
        tooltip: "la tarea humana se presenta con esta página — Supr lo desconecta"
      });
    }
  });
  for (const d of e.workflows ?? [])
    for (const c of d.steps ?? [])
      !c.handoffWorkflowId || !u.has(c.handoffWorkflowId) || !u.has(c.id) || s.push({
        id: `wflink:${c.id}->${c.handoffWorkflowId}`,
        sourceId: c.id,
        targetId: c.handoffWorkflowId,
        kind: "wf-link",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "el paso entrega a OTRO workflow — Supr lo desconecta"
      });
  const h = /* @__PURE__ */ new Map();
  for (const d of e.workflows ?? [])
    for (const c of d.steps) h.set(c.id, d.id);
  const m = new Set(o.map((d) => d.id)), f = (d) => {
    if (m.has(d)) return d;
    const c = h.get(d);
    return c && m.has(c) ? c : null;
  }, g = /* @__PURE__ */ new Set(), v = [];
  for (const d of s) {
    const c = f(d.sourceId), y = f(d.targetId);
    if (!c || !y || c === y) continue;
    if (c === d.sourceId && y === d.targetId) {
      v.push(d);
      continue;
    }
    const _ = `${d.kind}|${c}|${y}`;
    g.has(_) || (g.add(_), v.push({
      ...d,
      sourceId: c,
      targetId: y,
      tooltip: `${d.tooltip ?? d.kind} — de un paso plegado dentro`
    }));
  }
  return { nodes: o, edges: v };
}
const oo = 250, Le = 30, yt = 6, Rc = 16, Bt = 190, Nc = 60, Dc = 170, pi = 44;
function Lc(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function Ce(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Uc(e) {
  const t = [], i = (n, o, s) => {
    for (const a of n ?? []) {
      const r = [...o, a.label];
      t.push({ entry: a, path: r, depth: s }), i(a.children ?? [], r, s + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function zc(e, t, i = /* @__PURE__ */ new Set(), n = !1) {
  var N, V, G, se;
  const o = [], s = [], a = e.uiApps ?? [], r = e.pages ?? [], l = (C) => {
    var Y;
    return ((Y = e.boundedContexts.flatMap((B) => B.useCases ?? []).find((B) => B.id === C)) == null ? void 0 : Y.name) ?? C;
  }, u = (C) => {
    var Y;
    return ((Y = e.boundedContexts.flatMap((B) => B.queryServices ?? []).find((B) => B.id === C)) == null ? void 0 : Y.name) ?? C;
  }, h = /* @__PURE__ */ new Map();
  let m = 160;
  for (const C of a) {
    const Y = Uc(C), B = n || i.has(C.id), O = 90, W = B ? Y.length * (Le + yt) : 0, x = t[C.id] ?? { x: 190, y: m + O / 2 };
    m = x.y + O / 2 + W + 70;
    const w = C.type ?? "APP";
    o.push({
      id: C.id,
      label: C.title || C.name,
      x: x.x,
      y: x.y,
      w: oo,
      h: O,
      kind: "ui-app",
      symbol: w === "ORCHESTRATOR" || w === "VIEW_EDITOR" ? "process" : "component",
      fill: w === "ORCHESTRATOR" || w === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: w === "ORCHESTRATOR" || w === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      collapsible: Y.length > 0,
      collapsed: Y.length > 0 && !B,
      badge: w === "ORCHESTRATOR" ? "ORQUESTADOR" : w === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : w === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: w === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : w === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : w === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: w === "ORCHESTRATOR" ? `${C.name} — orquesta y mantiene estado; solo enseña páginas hijas` : w === "MASTER_DETAIL" ? `${C.name} — cabecera + pestañas (ambas son páginas)` : `App: ${C.name}`
    }), C.modelId && (h.set(C.modelId, {
      label: ((N = (e.models ?? []).find((k) => k.id === C.modelId)) == null ? void 0 : N.name) ?? C.modelId,
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
    for (const [k, P, M, q, D] of [
      [C.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [C.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      k && s.push({
        id: `${P === "app-view" ? "appview" : "appedit"}:${C.id}->${k}`,
        sourceId: C.id,
        targetId: k,
        kind: P,
        color: q,
        label: M,
        arrow: !0,
        tooltip: D
      });
    const R = C.homePageId ?? C.homeAppId;
    R && s.push({
      id: `apphome:${C.id}->${R}`,
      sourceId: C.id,
      targetId: R,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      markerStart: "ball",
      markerEnd: "arrow",
      tooltip: C.homeAppId ? "la app con la que abre (assignment)" : "la página con la que abre la app (assignment)"
    }), w === "MASTER_DETAIL" && C.headerPageId && s.push({
      id: `appheader:${C.id}->${C.headerPageId}`,
      sourceId: C.id,
      targetId: C.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let $ = x.y + O / 2 + 10 + Le / 2;
    for (const { entry: k, path: P, depth: M } of B ? Y : []) {
      const q = Lc(C.id, k, P), D = M * Rc;
      if (o.push({
        id: q,
        label: k.label,
        x: x.x + D / 2,
        y: $,
        w: oo - 20 - D,
        h: Le,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (V = k.children) != null && V.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (G = k.children) != null && G.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        ownerId: C.id,
        tooltip: (se = k.children) != null && se.length ? "Agrupador (con submenú): no puede abrir nada" : k.pageId ? `Abre ${k.pageId}` : k.uiAdapterId ? `Abre la app ${k.uiAdapterId}` : k.useCaseId ? `Lanza ${k.useCaseId}` : k.aggregateId ? `CRUD inferido sobre ${k.aggregateId}` : k.queryOperationId ? `Listado con filtros de ${k.queryOperationId}` : "Entrada de menú sin destino"
      }), $ += Le + yt, k.uiAdapterId && a.some((z) => z.id === k.uiAdapterId) && s.push({
        id: `menuapp:${q}->${k.uiAdapterId}`,
        sourceId: q,
        targetId: k.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), k.useCaseId && e.boundedContexts.some((j) => (j.useCases ?? []).some((X) => X.id === k.useCaseId)) && (h.set(k.useCaseId, {
        label: l(k.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${q}->${k.useCaseId}`,
        sourceId: q,
        targetId: k.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), k.aggregateId && (e.aggregates ?? []).some((z) => z.id === k.aggregateId)) {
        const z = (e.aggregates ?? []).find((j) => j.id === k.aggregateId);
        h.set(z.id, { label: z.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${q}->${z.id}`,
          sourceId: q,
          targetId: z.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (k.queryOperationId) {
        const z = e.boundedContexts.flatMap((X) => X.queryServices ?? []).find((X) => X.id === k.queryServiceId), j = ((z == null ? void 0 : z.operations) ?? []).find((X) => X.id === k.queryOperationId);
        z && j && (h.set(j.id, {
          label: `${j.name} (${z.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${q}->${j.id}`,
          sourceId: q,
          targetId: j.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      k.pageId && r.some((z) => z.id === k.pageId) && s.push({
        id: `menupage:${q}->${k.pageId}`,
        sourceId: q,
        targetId: k.pageId,
        kind: "menu-page",
        color: "#64748b",
        markerStart: "ball",
        markerEnd: "arrow",
        tooltip: "la página que abre la opción (assignment)"
      });
    }
  }
  let f = 160;
  const g = (C) => {
    var Y;
    return ((Y = r.find((B) => B.id === C)) == null ? void 0 : Y.name) ?? C;
  };
  for (const C of r) {
    const Y = t[C.id] ?? { x: 640, y: f }, B = C.type === "WIZARD" ? C.wizardSteps ?? [] : [], O = n || i.has(C.id), W = Nc, x = O ? B.length * (Le + yt) : 0;
    f = Y.y + W + x + 90, o.push({
      id: C.id,
      label: C.name,
      x: Y.x,
      y: Y.y,
      w: Bt,
      h: W,
      kind: "page",
      symbol: "interface",
      badge: C.customCodeId ? "CODE" : C.type ?? "PAGE",
      collapsible: B.length > 0,
      collapsed: B.length > 0 && !O,
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
    let w = Y.y + W / 2 + 10 + Le / 2;
    (O ? B : []).forEach((R, $) => {
      const k = R.id ?? R.pageId ?? String($);
      o.push({
        id: `wizrow:${C.id}:${k}`,
        label: `${$ + 1}. ${R.label ?? (R.pageId ? g(R.pageId) : "Paso")}${R.pageId ? "" : " ⌁"}`,
        x: Y.x,
        y: w,
        w: Bt - 20,
        h: Le,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: R.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        ownerId: C.id,
        tooltip: R.pageId ? `Paso ${$ + 1}: ${g(R.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${$ + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), w += Le + yt;
    });
    for (const [R, $, k, P] of [
      [C.crudDetailPageId ?? C.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [C.crudCreatePageId ?? C.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      R && s.push({
        id: `${$ === "crud-detail" ? "cruddetail" : "crudnew"}:${C.id}->${R}`,
        sourceId: C.id,
        targetId: R,
        kind: $,
        color: P,
        label: k,
        dashed: !0,
        arrow: !0,
        tooltip: $ === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let R = 0; R < (C.wizardSteps ?? []).length; R++) {
      const $ = (C.wizardSteps ?? [])[R];
      if (!$.pageId) continue;
      const k = $.id ?? $.pageId;
      s.push({
        id: `wizstep:${C.id}:${k}`,
        sourceId: `wizrow:${C.id}:${k}`,
        targetId: $.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${R + 1} — Supr desmapea`
      });
    }
    C.modelId && (h.set(C.modelId, {
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
    for (const R of C.buttons ?? [])
      R.useCaseId && (h.set(R.useCaseId, {
        label: l(R.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${C.id}->${R.useCaseId}`,
        sourceId: C.id,
        targetId: R.useCaseId,
        kind: "page-button",
        label: R.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: R.mappingId ? `Botón «${R.label}» — mapping ${R.mappingId}` : `Botón «${R.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    C.listingQueryServiceId && (h.set(C.listingQueryServiceId, {
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
  const v = e.buttonGroups ?? [], b = (C) => {
    var Y;
    return ((Y = v.find((B) => B.id === C)) == null ? void 0 : Y.name) ?? C;
  };
  let d = 520;
  for (const C of v) {
    const Y = C.buttons ?? [], B = C.groupIds ?? [], O = Y.length + B.length, W = n || i.has(C.id), x = t[C.id] ?? { x: 1e3, y: d }, w = 70, R = W ? O * (Le + yt) : 0;
    d = x.y + w + R + 80, o.push({
      id: C.id,
      label: C.name,
      x: x.x,
      y: x.y,
      w: Bt,
      h: w,
      kind: "button-group",
      symbol: "usecase",
      badge: "BOTONES",
      collapsible: O > 0,
      collapsed: O > 0 && !W,
      fill: "#ffffff",
      stroke: "#0e7490",
      extraHandles: [
        { kind: "toolbar", title: "Toolbar: arrastra hasta una página para engancharlo arriba", color: "#0284c7" },
        { kind: "bottom", title: "Botonera: arrastra hasta una página para engancharlo abajo", color: "#7c3aed" }
      ],
      tooltip: `${C.name} — grupo de botones: la paleta añade botones dentro; sus asas lo enganchan al toolbar o la botonera de una página`
    });
    let $ = x.y + w / 2 + 10 + Le / 2;
    for (const k of W ? Y : [])
      o.push({
        id: `gbtn:${C.id}:${k.id}`,
        label: k.label ?? k.id,
        x: x.x,
        y: $,
        w: Bt - 20,
        h: Le,
        kind: "group-button",
        symbol: "usecase",
        fill: k.useCaseId || k.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !k.useCaseId && !k.apiOperationId,
        ownerId: C.id,
        tooltip: `${k.label ?? k.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), $ += Le + yt;
    for (const k of W ? B : [])
      o.push({
        id: `gsub:${C.id}:${k}`,
        label: `▸ ${b(k)}`,
        x: x.x,
        y: $,
        w: Bt - 20,
        h: Le,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        ownerId: C.id,
        tooltip: `Subgrupo ${b(k)} — Supr lo desanida (el grupo sigue existiendo)`
      }), $ += Le + yt;
  }
  for (const C of v)
    for (const Y of C.buttons ?? [])
      !Y.useCaseId || !e.boundedContexts.some((O) => (O.useCases ?? []).some((W) => W.id === Y.useCaseId)) || (h.set(Y.useCaseId, {
        label: l(Y.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `gbtnt:${C.id}:${Y.id}`,
        sourceId: `gbtn:${C.id}:${Y.id}`,
        targetId: Y.useCaseId,
        kind: "gbtn-target",
        color: "#06b6d4",
        arrow: !0,
        tooltip: `«${Y.label ?? Y.id}» dispara este caso de uso — Supr lo desconecta`
      }));
  for (const C of r) {
    const Y = [
      ["toolbar", C.toolbarGroupIds ?? []],
      ["botonera", C.bottomBarGroupIds ?? []]
    ];
    for (const [B, O] of Y)
      for (const W of O)
        v.some((x) => x.id === W) && s.push({
          id: `bargrp:${C.id}:${B}:${W}`,
          sourceId: W,
          targetId: C.id,
          kind: "bar-group",
          color: B === "toolbar" ? "#0284c7" : "#7c3aed",
          label: B,
          dashed: !0,
          arrow: !0,
          tooltip: `Grupo enganchado a la ${B} de ${C.name} — Supr lo desengancha`
        });
  }
  let c = 160;
  for (const C of e.models ?? [])
    h.has(C.id) || h.set(C.id, { label: C.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [C, Y] of h) {
    const B = t[C] ?? { x: 1050, y: c };
    c = B.y + pi + 46, o.push({
      id: C,
      label: Y.label,
      x: B.x,
      y: B.y,
      w: Dc,
      h: pi,
      kind: Y.kind,
      symbol: Y.symbol,
      fill: "#ffffff",
      stroke: Y.stroke
    });
  }
  let y = 120;
  for (const C of e.identityProviders ?? []) {
    const Y = t[C.id] ?? { x: -320, y };
    y = Y.y + 70 + 40, o.push({
      id: C.id,
      label: C.name,
      x: Y.x,
      y: Y.y,
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
    C.identityProviderId && (e.identityProviders ?? []).some((Y) => Y.id === C.identityProviderId) && s.push({
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
  const _ = (e.actorAppUses ?? []).filter(
    (C) => a.some((Y) => Y.id === C.appId) && (e.actors ?? []).some((Y) => Y.id === C.actorId)
  ), A = [...new Set(_.map((C) => C.actorId))];
  let S = 160;
  for (const C of A) {
    const Y = (e.actors ?? []).find((O) => O.id === C), B = t[C] ?? { x: -60, y: S };
    S = B.y + pi + 46, o.push({
      id: C,
      label: Y.name,
      x: B.x,
      y: B.y,
      w: 150,
      h: pi,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const C of _)
    s.push({
      id: `actorapp:${C.actorId}->${C.appId}`,
      sourceId: C.actorId,
      targetId: C.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  (e.customCodes ?? []).forEach((C, Y) => {
    const B = t[C.id] ?? { x: 1200, y: 120 + Y * 90 };
    o.push({
      id: C.id,
      label: C.name,
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
      tooltip: `${C.name} — código a mano: arrastra una página hasta él para hacerla custom, y su asa hasta cualquier elemento que use`
    });
  });
  const E = new Set(o.map((C) => C.id));
  for (const C of r)
    C.customCodeId && E.has(C.customCodeId) && s.push({
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
    for (const Y of C.usedElementIds ?? [])
      E.has(Y) && s.push({
        id: `ccuse:${C.id}->${Y}`,
        sourceId: C.id,
        targetId: Y,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${C.name} usa este elemento — Supr lo desconecta`
      });
  return (e.uis ?? []).forEach((C, Y) => {
    const B = t[C.id] ?? { x: 120 + Y * 220, y: 40 };
    o.push({
      id: C.id,
      label: C.name,
      x: B.x,
      y: B.y,
      w: 150,
      h: 44,
      kind: "ui",
      symbol: "interface",
      fill: "#f0f9ff",
      stroke: "#0ea5e9",
      badge: "UI",
      tooltip: `${C.name} — interfaz declarada: traza una línea hasta la app o la página asignada`
    });
    for (const O of [...C.appIds ?? [], ...C.pageIds ?? []])
      o.some((W) => W.id === O) && s.push({
        id: `uiasg:${C.id}->${O}`,
        sourceId: O,
        targetId: C.id,
        kind: "ui-assignment",
        color: "#0ea5e9",
        markerStart: "ball",
        markerEnd: "arrow",
        tooltip: "asignada a la UI (assignment) — Supr la desconecta"
      });
    for (const O of C.actorIds ?? [])
      o.some((W) => W.id === O) && s.push({
        id: `uisrv:${C.id}->${O}`,
        sourceId: C.id,
        targetId: O,
        kind: "ui-serving",
        color: "#0ea5e9",
        markerEnd: "open-arrow",
        tooltip: "la UI sirve a este actor (serving) — Supr la desconecta"
      });
  }), { nodes: o, edges: s };
}
const ao = 188, so = 34, ro = 10, ui = 24, lo = 6;
function mi(e, t) {
  return `fld:${e}:${t}`;
}
function rn(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function qc(e, t) {
  const i = [], n = [], o = e.models ?? [], s = e.modelMappings ?? [], a = (f) => {
    var g;
    return ((g = o.find((v) => v.id === f)) == null ? void 0 : g.name) ?? f ?? "?";
  };
  o.forEach((f, g) => {
    const v = t[f.id] ?? { x: 200 + g % 5 * 260, y: 160 + Math.floor(g / 5) * 220 }, b = f.fields ?? [], d = so + (b.length ? b.length * ui + (b.length - 1) * lo : 10) + ro;
    i.push({
      id: f.id,
      label: f.name,
      x: v.x,
      y: v.y,
      w: ao,
      h: d,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${f.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), b.forEach((c, y) => {
      i.push({
        id: mi(f.id, c.id),
        label: c.name,
        x: v.x,
        y: v.y - d / 2 + so + y * (ui + lo) + ui / 2,
        w: ao - 2 * ro,
        h: ui,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: c.type ?? void 0,
        parentId: f.id,
        tooltip: `${c.name}${c.type ? ` (${c.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((f, g) => {
    const v = t[f.id] ?? { x: 200 + g % 5 * 260, y: 60 };
    i.push({
      id: f.id,
      label: f.name,
      x: v.x,
      y: v.y,
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
  }), (e.customCodes ?? []).forEach((f, g) => {
    const v = t[f.id] ?? { x: 120 + g % 5 * 220, y: 60 };
    i.push({
      id: f.id,
      label: f.name,
      x: v.x,
      y: v.y,
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
  const r = new Set(i.map((f) => f.id)), l = (f) => f.fieldId ? mi(f.modelId, f.fieldId) : f.modelId;
  for (const f of e.transformations ?? [])
    f.customCodeId && r.has(f.customCodeId) && r.has(f.id) && n.push({
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
    f.customCodeId && r.has(f.customCodeId) && f.targetModelId && r.has(f.targetModelId) && n.push({
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
    for (const g of f.inputs ?? []) {
      const v = l(g);
      r.has(v) && n.push({
        id: `tfin:${f.id}:${g.modelId}:${g.fieldId ?? ""}`,
        sourceId: v,
        targetId: f.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${f.name} — Supr la desconecta`
      });
    }
    f.output && r.has(l(f.output)) && n.push({
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
    if (!(!f.sourceModelId || !f.targetModelId) && !(!r.has(f.sourceModelId) || !r.has(f.targetModelId))) {
      n.push({
        id: `mapping:${f.id}`,
        sourceId: f.sourceModelId,
        targetId: f.targetModelId,
        kind: "model-mapping",
        color: "#7c3aed",
        label: f.name,
        arrow: !0,
        tooltip: `${f.name} — las reglas campo a campo son las líneas finas entre campos; Supr lo elimina`
      });
      for (const g of f.rules ?? []) {
        const v = mi(f.sourceModelId, g.sourceFieldId ?? ""), b = mi(f.targetModelId, g.targetFieldId ?? "");
        !r.has(v) || !r.has(b) || n.push({
          id: `maprule:${f.id}:${g.id}`,
          sourceId: v,
          targetId: b,
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
  ), h = new Map(
    e.boundedContexts.flatMap((f) => (f.useCases ?? []).map((g) => [g.id, g]))
  ), m = /* @__PURE__ */ new Set();
  for (const f of e.pages ?? [])
    if (f.modelId)
      for (const g of f.buttons ?? []) {
        if (!g.useCaseId || g.mappingId) continue;
        const v = h.get(g.useCaseId);
        if (!(v != null && v.inputModelId) || v.inputModelId === f.modelId) continue;
        const b = `${f.modelId}->${v.inputModelId}`;
        u.has(b) || m.has(b) || (m.add(b), !(!r.has(f.modelId) || !r.has(v.inputModelId)) && n.push({
          id: `mapgap:${f.id}:${g.useCaseId}`,
          sourceId: f.modelId,
          targetId: v.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${g.label}» (página ${f.name}) llama a ${v.name}: falta mapear ${a(f.modelId)} → ${a(v.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: n };
}
const Yi = 560, fi = 34, hi = 14, Ki = 150, gi = 40, yi = 12, bi = 150, rt = 40, Bc = (e) => e.startsWith("SOURCE") ? 0 : e === "TRANSFORM" ? 1 : 2, Fc = {
  0: { fill: "#f0f9ff", stroke: "#0284c7", symbol: "lens" },
  1: { fill: "#f0fdfa", stroke: "#0f766e", symbol: "gear" },
  2: { fill: "#f5f3ff", stroke: "#7c3aed", symbol: "event" }
};
function Vc(e, t) {
  const i = [], n = [], o = e.etlFlows ?? [], s = new Map(e.boundedContexts.map((b) => [b.id, b.name])), a = new Map(
    e.boundedContexts.flatMap((b) => [
      ...(b.domainEvents ?? []).map((d) => [d.id, d.name]),
      ...(b.applicationEvents ?? []).map((d) => [d.id, d.name])
    ])
  );
  let r = 140;
  for (const b of o) {
    const d = b.steps ?? [], c = [[], [], []];
    d.forEach((S) => c[Bc(S.type)].push(S));
    const y = Math.max(1, ...c.map((S) => S.length)), _ = fi + hi + y * (gi + yi), A = t[b.id] ?? { x: 420, y: r };
    r = A.y + _ + 110, i.push({
      id: b.id,
      label: b.name,
      x: A.x,
      y: A.y,
      w: Yi,
      h: _,
      kind: "etl-flow",
      symbol: "gear",
      badge: "ETL",
      container: !0,
      fill: "#ffffff",
      stroke: "#0f766e",
      tooltip: `${b.name} — integrador${b.ownerBoundedContextId ? ` de ${s.get(b.ownerBoundedContextId) ?? b.ownerBoundedContextId}` : ""}: fuentes → transformación → escrituras; la paleta añade transformaciones`
    }), c.forEach((S, E) => {
      const N = A.x - Yi / 2 + hi + Ki / 2 + E * (Yi - 2 * hi - Ki) / 2;
      S.forEach((V, G) => {
        const se = Fc[E];
        if (i.push({
          id: V.id,
          label: V.name ?? V.id,
          x: N,
          y: A.y - _ / 2 + fi + gi / 2 + G * (gi + yi),
          w: Ki,
          h: gi,
          kind: "etl-step",
          symbol: se.symbol,
          fill: se.fill,
          stroke: se.stroke,
          badge: V.type === "SOURCE_PULL" ? "PULL" : V.type === "SOURCE_CONSUMER" ? "CONSUME" : V.type === "TRANSFORM" ? "TRANSFORM" : V.type === "WRITE_API" ? "→ API" : V.type === "WRITE_DB" ? "→ BD" : "→ EVENTO",
          parentId: b.id,
          tooltip: `${V.name ?? V.id} (${V.type})${V.mappingId ? " · aplica un mapeado" : ""} — Supr lo quita del integrador`
        }), E > 0) {
          const C = c[E - 1], Y = C[Math.min(G, C.length - 1)];
          Y && n.push({
            id: `etlpipe:${b.id}:${Y.id}->${V.id}`,
            sourceId: Y.id,
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
  const l = new Set(i.map((b) => b.id)), u = new Set(o.flatMap((b) => (b.steps ?? []).map((d) => d.externalTableId)).filter(Boolean)), h = new Set(o.flatMap((b) => (b.steps ?? []).map((d) => d.apiId)).filter(Boolean)), m = new Set(o.flatMap((b) => (b.steps ?? []).map((d) => d.eventId)).filter(Boolean));
  let f = 120;
  for (const b of e.externalSystems) {
    const d = (b.tables ?? []).filter((_) => u.has(_.id));
    if (!d.length) continue;
    const c = fi + hi + d.length * (rt + yi), y = t[b.id] ?? { x: -140, y: f };
    f = y.y + c + 90, i.push({
      id: b.id,
      label: b.name,
      x: y.x,
      y: y.y,
      w: bi + 30,
      h: c,
      kind: "external-system",
      symbol: "component",
      badge: "EXTERNAL",
      container: !0,
      fill: "#ffffff",
      stroke: "#64748b",
      dashed: !0,
      tooltip: `${b.name} — sistema externo: sus tablas legacy alimentan (o reciben) integradores`
    }), l.add(b.id), d.forEach((_, A) => {
      i.push({
        id: _.id,
        label: _.name,
        x: y.x,
        y: y.y - c / 2 + fi + rt / 2 + A * (rt + yi),
        w: bi,
        h: rt,
        kind: "external-table",
        symbol: "readmodel",
        fill: "#fefce8",
        stroke: "#a16207",
        parentId: b.id,
        tooltip: `${_.name} — tabla legacy de ${b.name}`
      }), l.add(_.id);
    });
  }
  let g = 120;
  for (const b of e.apis ?? []) {
    if (!h.has(b.id)) continue;
    const d = t[b.id] ?? { x: 1e3, y: g };
    g = d.y + rt + 70, i.push({
      id: b.id,
      label: b.name,
      x: d.x,
      y: d.y,
      w: bi,
      h: rt,
      kind: "api",
      symbol: "interface",
      badge: "API",
      fill: "#eef2ff",
      stroke: "#4f46e5",
      tooltip: `${b.name} — API que un integrador consume o llama`
    }), l.add(b.id);
  }
  let v = 400;
  for (const b of m) {
    const d = b, c = t[d] ?? { x: 1e3, y: v };
    v = c.y + rt + 70, i.push({
      id: d,
      label: a.get(d) ?? d,
      x: c.x,
      y: c.y,
      w: bi,
      h: rt,
      kind: "domain-event",
      symbol: "event",
      badge: "EVENTO",
      fill: "#fff7ed",
      stroke: "#f59e0b",
      tooltip: "evento que un integrador consume o publica"
    }), l.add(d);
  }
  for (const b of o)
    for (const d of b.steps ?? []) {
      const c = d.externalTableId ?? d.apiId ?? d.eventId;
      if (!c || !l.has(c) || !l.has(d.id)) continue;
      const y = d.type.startsWith("SOURCE");
      n.push({
        id: `etl:${b.id}:${d.id}`,
        sourceId: y ? c : d.id,
        targetId: y ? d.id : c,
        kind: y ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: d.type === "SOURCE_PULL" ? "pull" : d.type === "SOURCE_CONSUMER" ? "consume" : d.type === "WRITE_API" ? "api" : d.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: y ? `${b.name} lee de aquí — Supr quita el paso` : `${b.name} escribe aquí — Supr quita el paso`
      });
    }
  return { nodes: i, edges: n };
}
async function Wc(e, t) {
  var u, h;
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((m) => m.e), n = new i(), o = t == null ? void 0 : t.partitions, s = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "RIGHT",
      "elk.edgeRouting": "ORTHOGONAL",
      "elk.spacing.nodeNode": "45",
      "elk.layered.spacing.nodeNodeBetweenLayers": "90",
      // Channels so lines don't graze the boxes or fuse with each other.
      "elk.layered.spacing.edgeNodeBetweenLayers": "25",
      "elk.layered.spacing.edgeEdgeBetweenLayers": "12",
      "elk.spacing.edgeEdge": "12",
      "elk.spacing.edgeNode": "18",
      // Keep the given left→right lanes when the caller supplies partitions.
      ...o ? { "elk.partitioning.activate": "true" } : {}
    },
    children: e.nodes.map((m) => ({
      id: m.id,
      width: m.w,
      height: m.h,
      ...o && o[m.id] !== void 0 ? { layoutOptions: { "elk.partitioning.partition": String(o[m.id]) } } : {}
    })),
    edges: e.edges.map((m) => ({ id: m.id, sources: [m.sourceId], targets: [m.targetId] }))
  }, a = await n.layout(s), r = {};
  for (const m of a.children ?? [])
    r[m.id] = {
      x: (m.x ?? 0) + (m.width ?? 0) / 2,
      y: (m.y ?? 0) + (m.height ?? 0) / 2
    };
  const l = {};
  for (const m of a.edges ?? []) {
    const f = (h = (u = m.sections) == null ? void 0 : u[0]) == null ? void 0 : h.bendPoints;
    f && f.length && (l[m.id] = f.map((g) => ({ x: g.x, y: g.y })));
  }
  return { nodes: r, edges: l };
}
const jc = 90, co = 40, Gc = {
  actor: 0,
  "ai-agent": 0,
  ui: 2,
  "ui-app": 2,
  page: 2,
  api: 3,
  "proxy-api": 3,
  "mcp-gateway": 3,
  boundedContext: 4,
  module: 4,
  service: 4,
  aggregate: 5,
  entity: 5,
  "use-case": 5,
  usecase: 5,
  "domain-service": 5,
  model: 5,
  transformation: 6,
  "model-mapping": 6,
  "custom-code": 6,
  flow: 6,
  "etl-flow": 6,
  process: 6,
  saga: 6,
  workflow: 6,
  "scheduled-trigger": 6,
  notification: 6,
  document: 6,
  "domain-event": 7,
  "application-event": 7,
  "read-model": 8,
  "query-service": 8,
  projection: 8,
  "identity-provider": 9,
  infrastructure: 9,
  url: 9,
  "mcp-server": 9
}, Hc = 1, Yc = 9, Kc = 5;
function Xc(e, t) {
  let i = 0, n = 0;
  for (const o of t.edges)
    o.sourceId === e.id && !po(o.targetId, t) && i++, o.targetId === e.id && !po(o.sourceId, t) && n++;
  return i > n ? Hc : Yc;
}
function po(e, t) {
  var i;
  return ((i = t.nodes.find((n) => n.id === e)) == null ? void 0 : i.kind) === "external-system";
}
function Qc(e, t) {
  return e.kind === "external-system" ? Xc(e, t) : Gc[e.kind] ?? Kc;
}
function Jc(e) {
  const t = [...new Set(Object.values(e).map((o) => Math.round(o.x)))].sort((o, s) => o - s), i = new Map(t.map((o, s) => [o, s])), n = {};
  for (const [o, s] of Object.entries(e)) n[o] = i.get(Math.round(s.x)) ?? 0;
  return n;
}
function Zc(e) {
  const t = e.nodes.filter((m) => !m.parentId && m.kind !== "area"), i = {};
  if (!t.length) return i;
  const n = /* @__PURE__ */ new Map();
  for (const m of t) {
    const f = Qc(m, e);
    n.has(f) || n.set(f, []), n.get(f).push(m);
  }
  const o = [...n.entries()].sort((m, f) => m[0] - f[0]).map(([, m]) => m);
  for (const m of o)
    m.sort((f, g) => f.label.toLowerCase().localeCompare(g.label.toLowerCase()) || f.id.localeCompare(g.id));
  const s = /* @__PURE__ */ new Map(), a = () => {
    o.forEach(
      (m) => m.forEach((f, g) => s.set(f.id, m.length > 1 ? g / (m.length - 1) : 0.5))
    );
  }, r = (m) => {
    let f = 0, g = 0;
    for (const v of e.edges) {
      const b = v.sourceId === m.id ? v.targetId : v.targetId === m.id ? v.sourceId : null;
      b !== null && s.has(b) && (f += s.get(b), g++);
    }
    return g ? f / g : null;
  };
  for (let m = 0; m < 4; m++) {
    a();
    const f = m % 2 === 0 ? o.slice(1) : o.slice(1).reverse();
    for (const g of f)
      g.sort((v, b) => {
        const d = r(v), c = r(b);
        return d === null && c === null ? 0 : d === null ? 1 : c === null ? -1 : d - c;
      }), a();
  }
  const l = o.map(
    (m) => m.reduce((f, g) => f + g.h, 0) + co * (m.length - 1)
  ), u = Math.max(...l);
  let h = 0;
  return o.forEach((m, f) => {
    const g = Math.max(...m.map((b) => b.w));
    h += g / 2;
    let v = (u - l[f]) / 2;
    for (const b of m)
      v += b.h / 2, i[b.id] = { x: h, y: v }, v += b.h / 2 + co;
    h += g / 2 + jc;
  }), i;
}
function ep(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.boundedContexts ?? []) {
    for (const n of i.useCases ?? []) n.derived && t.add(n.id);
    for (const n of i.queryServices ?? []) n.derived && t.add(n.id);
    for (const n of i.domainEvents ?? []) n.derived && t.add(n.id);
  }
  return t;
}
function tp(e, t) {
  return t.size ? {
    ...e,
    nodes: e.nodes.map((i) => t.has(i.id) && !i.derived ? { ...i, derived: !0 } : i)
  } : e;
}
function ip(e) {
  const t = new Set(e.nodes.filter((i) => i.derived).map((i) => i.id));
  return t.size ? {
    ...e,
    nodes: e.nodes.filter((i) => !i.derived),
    edges: e.edges.filter((i) => !t.has(i.sourceId) && !t.has(i.targetId))
  } : e;
}
var np = Object.defineProperty, op = Object.getOwnPropertyDescriptor, ze = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? op(t, i) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && np(t, i, o), o;
};
const ap = /* @__PURE__ */ new Set([
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
let Me = class extends je {
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
      const t = e.composedPath()[0], i = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, ".chev3");
      if (i != null && i.dataset.nodeId) {
        this.emit("node-collapse-toggled", { id: i.dataset.nodeId });
        return;
      }
      const n = (l = t == null ? void 0 : t.closest) == null ? void 0 : l.call(t, ".h3");
      if (n != null && n.dataset.sourceId) {
        const u = this.getBoundingClientRect();
        this._connect = {
          sourceId: n.dataset.sourceId,
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
      var n, o;
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, i = e.clientY - this._drag.y;
      if (this._drag.mode === "connect" && this._connect) {
        const s = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - s.left, y2: e.clientY - s.top };
        const a = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), r = (o = a == null ? void 0 : a.closest) == null ? void 0 : o.call(a, ".n3"), l = (r == null ? void 0 : r.dataset.nodeId) ?? null;
        this._hoverTargetId = l !== this._connect.sourceId ? l : null;
        return;
      }
      if (this._drag.mode === "rubber" && this._rubber) {
        Math.hypot(t, i) > 3 && (this._drag.moved = !0);
        const s = this.getBoundingClientRect();
        this._rubber = { ...this._rubber, x2: e.clientX - s.left, y2: e.clientY - s.top };
        return;
      }
      if (this._drag.mode === "node") {
        if (Math.hypot(t, i) > 3 && (this._drag.moved = !0), this._drag.moved && this._drag.nodeId) {
          const s = this.unproject(t, i);
          this._liveMove = { id: this._drag.nodeId, dx: s.x, dy: s.y };
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
        if (e.mode === "rubber") {
          const i = this._rubber;
          if (this._rubber = null, i && e.moved) {
            const n = this.getBoundingClientRect(), o = Math.min(i.x1, i.x2) + n.left, s = Math.max(i.x1, i.x2) + n.left, a = Math.min(i.y1, i.y2) + n.top, r = Math.max(i.y1, i.y2) + n.top, l = [];
            this.renderRoot.querySelectorAll(".n3").forEach((u) => {
              const h = u.getBoundingClientRect(), m = h.left + h.width / 2, f = h.top + h.height / 2, g = u.dataset.nodeId;
              g && m >= o && m <= s && f >= a && f <= r && l.push(g);
            }), this._selected = new Set(l);
          } else
            this._selected = /* @__PURE__ */ new Set(), this.emit("selection-cleared");
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
      var n, o, s;
      const t = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY);
      if ((o = t == null ? void 0 : t.closest) != null && o.call(t, ".chev3")) return;
      const i = ((s = t == null ? void 0 : t.closest) == null ? void 0 : s.call(t, ".n3")) ?? this.plateAt(e);
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
      if (e.key === "Delete" || e.key === "Backspace") {
        if (this._selected.size) {
          e.preventDefault();
          const t = this.scene.nodes.filter((i) => this._selected.has(i.id)).map((i) => ({ id: i.id, kind: i.kind }));
          this._selected = /* @__PURE__ */ new Set(), t.length && this.emit("delete-selection-requested", { items: t });
          return;
        }
        if (this.selectedId) {
          const t = this.scene.nodes.find((i) => i.id === this.selectedId);
          t && (e.preventDefault(), this.emit("delete-requested", { elementType: "node", id: t.id, kind: t.kind }));
        }
        return;
      }
      if (e.key === "F2") {
        const t = this._selected.size === 1 ? [...this._selected][0] : this.selectedId, i = t ? this.scene.nodes.find((n) => n.id === t) : void 0;
        i && (e.preventDefault(), this._renaming = { id: i.id, kind: i.kind ?? "node", value: i.label });
        return;
      }
      e.key === "Escape" && (this._selected = /* @__PURE__ */ new Set(), this._renaming = null, this.emit("selection-cleared"));
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
    const i = e / this._kUsed, n = t / this._kUsed / Math.cos(this._rx * Math.PI / 180), o = this._rz * Math.PI / 180;
    return {
      x: i * Math.cos(o) + n * Math.sin(o),
      y: -i * Math.sin(o) + n * Math.cos(o)
    };
  }
  /** The plate under a client point, if any (drops arrive as plain mouse coords). */
  nodeIdAtClient(e, t) {
    var n, o, s;
    const i = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e, t);
    return ((s = (o = i == null ? void 0 : i.closest) == null ? void 0 : o.call(i, ".n3")) == null ? void 0 : s.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), n = i.width * 0.5, o = i.height * 0.42, s = new DOMMatrix();
    s.m34 = -1 / 1600;
    const a = new DOMMatrix().translate(n, o).multiply(s).translate(-n, -o).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), r = a.transformPoint(new DOMPoint(0, 0, 0, 1)), l = a.transformPoint(new DOMPoint(1, 0, 0, 0)), u = a.transformPoint(new DOMPoint(0, 1, 0, 0)), h = e - i.left, m = t - i.top, f = l.x - h * l.w, g = u.x - h * u.w, v = l.y - m * l.w, b = u.y - m * u.w, d = h * r.w - r.x, c = m * r.w - r.y, y = f * b - g * v;
    return y ? { x: (d * b - g * c) / y, y: (f * c - d * v) / y } : { ...this._center };
  }
  updated(e) {
    var t;
    e.has("_renaming") && this._renaming && ((t = this.renderRoot.querySelector(".rename3")) == null || t.select());
  }
  /**
   * The virtual endpoint for a note thread that targets a RELATION: a node-shaped point
   * at the host edge's midpoint, lifted to the average of its endpoints' storeys.
   */
  edgeAnchorOf(e, t) {
    if (!e.targetId.startsWith("edgeanchor:")) return null;
    const i = this.scene.edges.find((r) => r.id === e.targetId.slice(11)), n = i ? t.get(i.sourceId) : void 0, o = i ? t.get(i.targetId) : void 0;
    if (!n || !o) return null;
    const s = this.depths(), a = ((s.get(n.id) ?? 0) + (s.get(o.id) ?? 0)) / 2 * 30 + 2;
    return {
      id: "",
      label: "",
      kind: "edge-anchor",
      x: (n.x + o.x) / 2,
      y: (n.y + o.y) / 2,
      w: 0,
      h: 0,
      z: a
    };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((n) => [n.id, n])), t = /* @__PURE__ */ new Map(), i = (n) => {
      const o = t.get(n.id);
      if (o !== void 0) return o;
      const s = n.ownerId ?? n.parentId, a = s ? e.get(s) : void 0, r = a ? i(a) + 1 : 0;
      return t.set(n.id, r), r;
    };
    for (const n of this.scene.nodes) i(n);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return I`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((d) => [d.id, d])), n = Math.min(...e.map((d) => d.x - d.w / 2)) - 60, o = Math.max(...e.map((d) => d.x + d.w / 2)) + 60, s = Math.min(...e.map((d) => d.y - d.h / 2)) - 60, a = Math.max(...e.map((d) => d.y + d.h / 2)) + 60, r = (n + o) / 2, l = (s + a) / 2, u = this.getBoundingClientRect(), h = u.width ? Math.min(u.width / (o - n), u.height / (a - s), 1) * 0.9 : 0.5, m = this._k * h;
    this._kUsed = m, this._center = { x: r, y: l };
    const f = 30, g = this._liveMove, v = (d) => d.x + ((g == null ? void 0 : g.id) === d.id ? g.dx : 0), b = (d) => d.y + ((g == null ? void 0 : g.id) === d.id ? g.dy : 0);
    return I`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${m}, ${m}, ${m}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-r}px, ${-l}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${n}px; top: ${s}px"
            width=${o - n}
            height=${a - s}
            viewBox="${n} ${s} ${o - n} ${a - s}"
          >
            ${this.scene.edges.map((d) => {
      const c = i.get(d.sourceId), y = i.get(d.targetId) ?? this.edgeAnchorOf(d, i);
      return !c || !y ? "" : J`<line
                x1=${v(c)} y1=${b(c)} x2=${v(y)} y2=${b(y)}
                stroke="#000000" stroke-width="2" opacity=${d.dim ? 0.05 : 0.22} />`;
    })}
          </svg>
          ${this.scene.edges.map((d) => {
      const c = i.get(d.sourceId), y = i.get(d.targetId) ?? this.edgeAnchorOf(d, i);
      if (!c || !y) return "";
      const _ = (t.get(c.id) ?? 0) * f + 2, A = y.id ? (t.get(y.id) ?? 0) * f + 2 : y.z, S = v(y) - v(c), E = b(y) - b(c), N = A - _, V = Math.hypot(S, E), G = Math.hypot(V, N), se = Math.atan2(E, S) * 180 / Math.PI, C = Math.atan2(N, V) * 180 / Math.PI, Y = d.color ?? "#64748b", B = d.dashed ? `repeating-linear-gradient(90deg, ${Y} 0 6px, transparent 6px 10px)` : Y;
      return I`<div
              class="edge3"
              style="
                left: ${v(c)}px; top: ${b(c)}px; width: ${G}px; height: 1.7px;
                transform: translateZ(${_}px) rotateZ(${se}deg) rotateY(${-C}deg);
                background: ${B};
                opacity: ${d.dim ? 0.12 : 0.9};
              "
            ></div>`;
    })}
          ${e.map((d) => {
      if (d.kind === "area")
        return I`<div
                class="area3"
                title=${d.tooltip ?? ""}
                style="left: ${v(d) - d.w / 2}px; top: ${b(d) - d.h / 2}px;
                       width: ${d.w}px; height: ${d.h}px; opacity: ${d.dim ? 0.25 : 1};"
              ></div>`;
      const c = t.get(d.id) ?? 0, y = d.container || c === 0, _ = this._hoverTargetId === d.id;
      return I`
              <div
                class="n3 ${d.container ? "container3" : ""} ${this.selectedId === d.id || this._selected.has(d.id) ? "selected3" : ""} ${_ ? "hover3" : ""}"
                data-node-id=${d.id}
                data-kind=${d.kind}
                title=${d.tooltip ?? d.label}
                style="
                  opacity: ${d.dim ? 0.25 : 1};
                  left: ${v(d) - d.w / 2}px; top: ${b(d) - d.h / 2}px;
                  width: ${d.w}px; height: ${d.h}px;
                  transform: translateZ(${c * f + (_ ? 8 : 0)}px)${_ ? " scale(1.06)" : ""};
                  background: ${d.container ? "color-mix(in srgb, " + (d.fill ?? "#ffffff") + " 82%, transparent)" : d.fill ?? "#ffffff"};
                  border-color: ${d.stroke ?? "#64748b"};
                  border-style: ${d.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${y ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${d.badge ? I`<span class="badge3" style="color: ${d.stroke ?? "#94a3b8"}">${d.badge}</span>` : ""}
                <span>${d.label}</span>
                ${d.collapsible ? I`<span
                      class="chev3"
                      data-node-id=${d.id}
                      title=${d.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}
                      >${d.collapsed ? "▸" : "▾"}</span>` : ""}
              </div>
            `;
    })}
          ${(() => {
      const d = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!d || !ap.has(d.kind)) return "";
      const c = (t.get(d.id) ?? 0) * f + 4;
      return [
        [v(d) + d.w / 2, b(d)],
        [v(d) - d.w / 2, b(d)],
        [v(d), b(d) + d.h / 2],
        [v(d), b(d) - d.h / 2]
      ].map(
        ([_, A]) => I`<div
                class="h3"
                data-source-id=${d.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${_}px; top: ${A}px; transform: translateZ(${c}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? I`<svg class="rubber">
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
      ${this._rubber ? I`<div
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
      ), c = this.getBoundingClientRect(), y = d == null ? void 0 : d.getBoundingClientRect(), _ = y ? y.left + y.width / 2 - c.left : c.width / 2, A = y ? y.bottom - c.top + 6 : c.height / 2;
      return I`<input
              class="rename3"
              style="left: ${_}px; top: ${A}px"
              .value=${this._renaming.value}
              @pointerdown=${(S) => S.stopPropagation()}
              @input=${(S) => this._renaming = { ...this._renaming, value: S.target.value }}
              @keydown=${(S) => {
        if (S.stopPropagation(), S.key === "Escape" && (this._renaming = null), S.key === "Enter") {
          const E = this._renaming, N = E.value.trim();
          this._renaming = null;
          const V = this.scene.nodes.find((G) => G.id === E.id);
          N && V && N !== V.label && this.emit("node-renamed", { id: E.id, kind: E.kind, name: N });
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
Me.styles = nt`
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
ze([
  de({ attribute: !1 })
], Me.prototype, "scene", 2);
ze([
  de({ attribute: !1 })
], Me.prototype, "selectedId", 2);
ze([
  de({ attribute: !1 })
], Me.prototype, "connectable", 2);
ze([
  U()
], Me.prototype, "_rx", 2);
ze([
  U()
], Me.prototype, "_rz", 2);
ze([
  U()
], Me.prototype, "_k", 2);
ze([
  U()
], Me.prototype, "_pan", 2);
ze([
  U()
], Me.prototype, "_liveMove", 2);
ze([
  U()
], Me.prototype, "_connect", 2);
ze([
  U()
], Me.prototype, "_hoverTargetId", 2);
ze([
  U()
], Me.prototype, "_selected", 2);
ze([
  U()
], Me.prototype, "_rubber", 2);
ze([
  U()
], Me.prototype, "_renaming", 2);
Me = ze([
  mt("modux-tilt")
], Me);
var sp = Object.defineProperty, rp = Object.getOwnPropertyDescriptor, xe = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? rp(t, i) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && sp(t, i, o), o;
};
const uo = [
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
let pe = class extends je {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.pages = [], this.selectedCmpId = null, this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._dragWizKey = null, this._overCmpId = null, this._overCmpPos = "into", this._foreignOver = !1, this._activeTabs = {};
  }
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /** The mock control a field renders as — inferred from stereotype, then type. */
  control(e) {
    const t = e.stereotype ?? "";
    return ["textarea", "richText", "html", "markdown"].includes(t) ? I`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? I`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? I`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? I`<div class="control">••••••••</div>` : t === "email" ? I`<div class="control">nombre@dominio.com</div>` : t === "money" ? I`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? I`<div class="control">──────●──</div>` : t === "stars" ? I`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? I`<div class="control area">🖼</div>` : t === "link" ? I`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? I`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? I`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? I`<div class="control" style="justify-content:flex-end">0</div>` : I`<div class="control">Texto…</div>`;
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
    const i = (o) => {
      for (const s of o ?? [])
        s.id === e && (t = s), i(s.children);
    };
    return i((n = this.page) == null ? void 0 : n.content), t;
  }
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var n;
    let t = null;
    const i = (o, s) => {
      for (const a of o ?? [])
        a.id === e && (t = s), i(a.children, a);
    };
    return i((n = this.page) == null ? void 0 : n.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var s;
    let i = !1;
    const n = (a) => {
      a.id === e && (i = !0);
      for (const r of a.children ?? []) n(r);
    }, o = (a) => {
      for (const r of a ?? [])
        r.id === t ? n(r) : o(r.children);
    };
    return o((s = this.page) == null ? void 0 : s.content), i;
  }
  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  nextSiblingOf(e) {
    var o;
    const t = this.parentOf(e), i = t ? t.children ?? [] : ((o = this.page) == null ? void 0 : o.content) ?? [], n = i.findIndex((s) => s.id === e);
    return n >= 0 ? i[n + 1] ?? null : null;
  }
  /** Sibling slot vs inside, from where the pointer is over the node's box. */
  dropPosFor(e, t) {
    if (e.kind === "tab") return "into";
    const i = t.currentTarget.getBoundingClientRect(), n = (t.clientY - i.top) / Math.max(1, i.height);
    return pe.LEAF_KINDS.has(e.kind) ? n < 0.5 ? "before" : "after" : n < 0.2 ? "before" : n > 0.8 ? "after" : "into";
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
    const i = this.parentOf(e.id), n = t === "after" ? ((o = this.nextSiblingOf(e.id)) == null ? void 0 : o.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: n };
  }
  onCmpDrop(e, t, i) {
    var s, a;
    const n = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !n) {
      const r = (s = i == null ? void 0 : i.dataTransfer) == null ? void 0 : s.getData("application/x-modux-cmp");
      if (!r) return;
      let l;
      try {
        l = JSON.parse(r);
      } catch {
        return;
      }
      if (!l.componentId || !l.pageId || l.pageId === ((a = this.page) == null ? void 0 : a.id)) return;
      const u = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: l.pageId, componentId: l.componentId, ...u });
      return;
    }
    if (n === e.id || this.isWithin(e.id, n)) return;
    const o = this.slotFor(e, t);
    o.beforeComponentId !== n && this.emitEvent("component-moved", { componentId: n, ...o });
  }
  /** A progress-like bar, the shared stub for progressBar/meter/taskProgress. */
  barStub(e, t = "#0284c7") {
    return I`<div style="height:8px;border-radius:4px;background:#e2e8f0;overflow:hidden">
      <div style="width:${e}%;height:100%;background:${t}"></div></div>`;
  }
  /** ① — ② — ③ with the given step active: wizard headers and progressSteps. */
  stepsStub(e) {
    return I`<div class="stub-row" style="justify-content:center;gap:0;margin-bottom:6px">
      ${[0, 1, 2].map((t) => I`
        <span class="stub-step ${t <= e ? "on" : ""}">${t + 1}</span>
        ${t < 2 ? I`<span style="width:26px;height:1.5px;background:${t < e ? "#0284c7" : "#e2e8f0"}"></span>` : re}`)}
    </div>`;
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var l, u, h;
    const t = e.children ?? [], i = (m) => m.map((f) => this.renderComponent(f)), n = I`<div class="placeholder">suelta componentes aquí</div>`;
    let o;
    switch (e.kind) {
      case "horizontalLayout":
        o = I`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "splitLayout": {
        const m = t.slice(0, Math.ceil(t.length / 2)), f = t.slice(Math.ceil(t.length / 2));
        o = I`<div class="row-lay">
          <div class="col-lay">${m.length ? i(m) : n}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? i(f) : n}</div>
        </div>`;
        break;
      }
      case "formLayout":
        o = I`<div class="grid-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        o = I`<div class="grid3-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "tabLayout": {
        const m = t.filter((g) => g.kind === "tab"), f = m.find((g) => g.id === this._activeTabs[e.id]) ?? m[0];
        o = I`
          <div class="tabbar">
            ${m.map(
          (g, v) => I`<span
                class=${g === f ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(b) => {
            b.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: g.id }, this.emitEvent("component-selected", { componentId: g.id });
          }}
                @dblclick=${(b) => {
            b.stopPropagation(), this._cmp = { ...g };
          }}
                @dragstart=${(b) => {
            var d, c;
            b.stopPropagation(), this._dragCmpId = g.id, (c = b.dataTransfer) == null || c.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (d = this.page) == null ? void 0 : d.id, componentId: g.id })
            );
          }}
                @dragover=${(b) => {
            var d;
            ((d = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : d.kind) === "tab" && (b.preventDefault(), b.stopPropagation());
          }}
                @drop=${(b) => {
            var A, S;
            const d = this._dragCmpId;
            if (!d || d === g.id || ((A = this.nodeById(d)) == null ? void 0 : A.kind) !== "tab") return;
            b.preventDefault(), b.stopPropagation();
            const c = b.currentTarget.getBoundingClientRect(), _ = b.clientX - c.left < c.width / 2 ? g.id : ((S = m[v + 1]) == null ? void 0 : S.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, _ !== d && this.emitEvent("component-moved", {
              componentId: d,
              toParentId: e.id,
              beforeComponentId: _
            });
          }}
                >${g.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${f ? this.renderComponent(f) : n}`;
        break;
      }
      case "tab":
        o = I`<div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "accordionLayout":
        o = I`<div class="col-lay">
          ${t.length ? t.map(
          (m, f) => I`
                  <div class="acc-bar"><span>${m.title ?? m.label ?? "Sección"}</span><span>${f === 0 ? "▾" : "▸"}</span></div>
                  ${f === 0 ? this.renderComponent(m) : re}
                `
        ) : n}
        </div>`;
        break;
      case "card":
        o = I`<div class="card-box">
          ${e.title ? I`<div class="card-title">${e.title}</div>` : re}
          <div class="col-lay">${t.length ? i(t) : n}</div>
        </div>`;
        break;
      case "boardLayout":
        o = I`<div class="grid3-lay">
          ${t.length ? t.map((m) => I`<div class="board-col">${this.renderComponent(m)}</div>`) : n}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [m, ...f] = t;
        o = I`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${m ? this.renderComponent(m) : I`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? i(f) : I`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        o = I`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "carouselLayout":
        o = I`<div class="row-lay">${t.length ? i(t) : n}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        o = I`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : n}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const f = e.modelId && e.modelId === ((l = this.page) == null ? void 0 : l.modelId) ? ((u = this.page) == null ? void 0 : u.viewmodelFields) ?? [] : [];
        o = f.length ? I`<div class="grid-lay">
              ${f.slice(0, 6).map(
          (g) => I`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${g.label ?? g.name}</label>${this.control(g)}</div>`
        )}
            </div>` : I`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const m = (((h = this.page) == null ? void 0 : h.viewmodelFields) ?? []).slice(0, 4);
        o = I`<table>
            <tr>${m.length ? m.map((f) => I`<th>${f.label ?? f.name}</th>`) : I`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => I`<tr>${(m.length ? m : [1, 2, 3]).map(() => I`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? re : I`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        o = I`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const m = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        o = I`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(m)}`;
        break;
      }
      case "text":
        o = I`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        o = I`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        o = I`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      // ---- Mateu design-contract containers ----
      case "section":
        o = I`<div class="acc-bar"><span>${e.title ?? "Sección"}</span></div>
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "zones":
        o = I`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "toolbar":
        o = I`<div class="row-lay" style="align-items:center">
          ${t.length ? i(t) : I`<span class="btn" style="display:inline-block;flex:none">Acción</span>${n}`}
        </div>`;
        break;
      case "pageHeader":
        o = I`<div class="row-lay" style="align-items:center">
          <div style="flex:2;font-size:15px;font-weight:800;color:#0f172a">${e.title ?? "Título de la página"}</div>
          ${t.length ? i(t) : re}
        </div>`;
        break;
      case "hero":
        o = I`<div style="background:#0f172a;color:#f8fafc;border-radius:10px;padding:22px 18px;text-align:center">
            <div style="font-size:17px;font-weight:800">${e.title ?? "Un titular que vende"}</div>
            <div style="font-size:11px;color:#cbd5e1;margin-top:4px">${e.text ?? "El subtítulo que lo explica"}</div>
          </div>
          ${t.length ? I`<div class="col-lay" style="margin-top:6px">${i(t)}</div>` : re}`;
        break;
      case "scoreboard":
        o = I`<div class="grid3-lay">${t.length ? i(t) : I`
          <div class="card-box metric"><div class="num">12</div><div class="cap">KPI</div></div>
          <div class="card-box metric"><div class="num">3,4</div><div class="cap">KPI</div></div>
          <div class="card-box metric"><div class="num">56%</div><div class="cap">KPI</div></div>`}</div>`;
        break;
      case "wizard":
        o = I`${this.stepsStub(0)}
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "app":
        o = I`<div class="appbar">⛭ ${e.title ?? "app"}</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : n}</div>`;
        break;
      // ---- Mateu design-contract leaves ----
      case "crud":
        o = I`<div class="row-lay" style="align-items:center;margin-bottom:6px">
            <div class="control" style="flex:1">Buscar…</div>
            <span class="btn" style="display:inline-block;flex:none">Nuevo</span>
          </div>
          <table>
            <tr><th>col 1</th><th>col 2</th><th>col 3</th></tr>
            ${[1, 2].map(() => I`<tr><td>···</td><td>···</td><td>···</td></tr>`)}
          </table>`;
        break;
      case "filterBar":
        o = I`<div class="row-lay" style="align-items:center">
          ${["Estado ▾", "Fecha ▾", "Tipo ▾"].map((m) => I`<span class="control" style="flex:none;font-size:11px">${m}</span>`)}
          <div class="control" style="flex:1">Buscar…</div>
        </div>`;
        break;
      case "fab":
        o = I`<div style="display:flex;justify-content:flex-end"><span
          style="width:34px;height:34px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700">+</span></div>`;
        break;
      case "appContext":
        o = I`<span class="control" style="display:inline-flex;min-width:130px">${e.label ?? "Contexto"}&nbsp;<span>▾</span></span>`;
        break;
      case "kpi":
      case "stat":
        o = I`<div class="card-box metric"><div class="num">1.234</div><div class="cap">${e.title ?? (e.kind === "kpi" ? "KPI" : "Estadística")}</div></div>`;
        break;
      case "notice":
        o = I`<div class="notice-stub">ℹ️ ${e.text ?? "Un aviso para el usuario"}</div>`;
        break;
      case "banner":
        o = I`<div class="notice-stub" style="background:#fef3c7;border-color:#f59e0b;color:#92400e">📣 ${e.text ?? e.title ?? "Banner destacado"}</div>`;
        break;
      case "calloutCard":
        o = I`<div class="card-box"><div class="card-title">💡 ${e.title ?? "Callout"}</div>
          <div class="text-stub">${e.text ?? "Algo que merece atención especial."}</div></div>`;
        break;
      case "bulletedList":
        o = I`<div class="text-stub">${["Primer punto", "Segundo punto", "Tercer punto"].map((m) => I`<div>• ${m}</div>`)}</div>`;
        break;
      case "statusList":
        o = I`<div class="col-lay" style="gap:3px">${[["#16a34a", "Operativo"], ["#f59e0b", "Degradado"], ["#dc2626", "Caído"]].map(
          ([m, f]) => I`<div class="stub-row"><span class="stub-dot" style="background:${m}"></span>${f}</div>`
        )}</div>`;
        break;
      case "checklist":
        o = I`<div class="col-lay" style="gap:3px">${[["☑", "Hecho"], ["☑", "También hecho"], ["☐", "Pendiente"]].map(
          ([m, f]) => I`<div class="stub-row"><span>${m}</span>${f}</div>`
        )}</div>`;
        break;
      case "fileList":
        o = I`<div class="col-lay" style="gap:3px">${["contrato.pdf · 1,2 MB", "foto.png · 340 KB"].map(
          (m) => I`<div class="stub-row">📄 ${m}</div>`
        )}</div>`;
        break;
      case "separator":
        o = I`<div style="border-top:1.5px solid #e2e8f0;margin:6px 0"></div>`;
        break;
      case "entityHeader":
        o = I`<div style="display:flex;gap:10px;align-items:center">
          <div style="width:34px;height:34px;border-radius:50%;background:#e0f2fe;display:flex;align-items:center;justify-content:center;font-weight:800;color:#0284c7">A</div>
          <div><div style="font-weight:800;color:#0f172a;font-size:13px">${e.title ?? "Entidad"}</div>
            <div style="font-size:10.5px;color:#94a3b8">${e.text ?? "metadatos · estado"}</div></div>
        </div>`;
        break;
      case "emptyState":
        o = I`<div class="empty" style="padding:14px">🗇<br />${e.text ?? "Nada por aquí todavía"}</div>`;
        break;
      case "skeleton":
        o = I`<div class="col-lay" style="gap:5px">${[80, 60, 72].map(
          (m) => I`<div style="height:9px;border-radius:5px;background:#e2e8f0;width:${m}%"></div>`
        )}</div>`;
        break;
      case "progressBar":
        o = this.barStub(40);
        break;
      case "meter":
        o = this.barStub(72, "#16a34a");
        break;
      case "taskProgress":
        o = I`<div class="stub-row" style="margin-bottom:3px">${e.title ?? "Tareas"} · 3/5</div>${this.barStub(60)}`;
        break;
      case "progressSteps":
        o = this.stepsStub(1);
        break;
      case "timeline":
        o = I`<div class="col-lay" style="gap:0">${["Creado", "Aprobado", "Enviado"].map(
          (m, f) => I`<div class="stub-row" style="align-items:stretch;gap:8px">
            <div style="display:flex;flex-direction:column;align-items:center"><span class="stub-dot" style="background:#0284c7"></span>${f < 2 ? I`<span style="flex:1;width:1.5px;background:#e2e8f0;min-height:10px"></span>` : re}</div>
            <span style="padding-bottom:8px">${m}</span></div>`
        )}</div>`;
        break;
      case "calendar":
        o = I`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;font-size:9px;color:#64748b;text-align:center">
          ${["L", "M", "X", "J", "V", "S", "D"].map((m) => I`<span style="font-weight:700">${m}</span>`)}
          ${Array.from({ length: 14 }, (m, f) => I`<span style="padding:2px;border-radius:4px;${f === 9 ? "background:#0284c7;color:#fff" : "background:#f8fafc"}">${f + 1}</span>`)}
        </div>`;
        break;
      case "kanban":
        o = I`<div class="grid3-lay">${["Por hacer", "En curso", "Hecho"].map(
          (m, f) => I`<div class="board-col"><div class="stub-row" style="font-weight:700">${m}</div>
            ${Array.from({ length: 2 - f % 2 }, () => I`<div class="card-box" style="padding:6px;font-size:10px;color:#94a3b8">tarjeta</div>`)}</div>`
        )}</div>`;
        break;
      case "gantt":
        o = I`<div class="col-lay" style="gap:4px">${[[0, 45, "Análisis"], [30, 40, "Diseño"], [55, 45, "Build"]].map(
          ([m, f, g]) => I`<div class="stub-row"><span style="flex:0 0 52px">${g}</span>
            <div style="flex:1;height:9px;border-radius:5px;background:#f1f5f9"><div style="margin-left:${m}%;width:${f}%;height:100%;border-radius:5px;background:#0284c7"></div></div></div>`
        )}</div>`;
        break;
      case "trendChart":
        o = I`<svg viewBox="0 0 100 28" style="width:100%;height:38px" preserveAspectRatio="none">
          <polyline points="0,24 18,18 36,20 54,10 72,13 100,3" fill="none" stroke="#0284c7" stroke-width="2" />
        </svg>`;
        break;
      case "heatmap":
        o = I`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">
          ${[3, 6, 2, 8, 5, 1, 7, 4, 9, 2, 6, 3, 8, 5].map((m) => I`<span style="height:12px;border-radius:3px;background:rgba(2,132,199,${m / 10})"></span>`)}
        </div>`;
        break;
      case "funnel":
        o = I`<div class="col-lay" style="gap:3px;align-items:center">${[100, 70, 45, 25].map(
          (m) => I`<div style="width:${m}%;height:11px;border-radius:5px;background:#0284c7;opacity:${m / 100}"></div>`
        )}</div>`;
        break;
      case "orgChart":
        o = I`<div class="col-lay" style="gap:4px;align-items:center">
          <span class="control" style="flex:none;font-size:10px">Dirección</span>
          <div class="row-lay" style="width:80%">${["Área A", "Área B"].map((m) => I`<span class="control" style="font-size:10px;justify-content:center">${m}</span>`)}</div>
        </div>`;
        break;
      case "featureGrid":
        o = I`<div class="grid3-lay">${["⚡ Rápido", "🔒 Seguro", "🧩 Modular"].map(
          (m) => I`<div class="card-box" style="text-align:center;font-size:11px;color:#334155">${m}</div>`
        )}</div>`;
        break;
      case "testimonials":
        o = I`<div class="card-box"><div class="text-stub">«${e.text ?? "Nos cambió la forma de trabajar."}»</div>
          <div style="font-size:10.5px;color:#94a3b8;margin-top:4px">— Cliente contento</div></div>`;
        break;
      case "faq":
        o = I`<div class="col-lay" style="gap:3px">${["¿Cómo empiezo?", "¿Cuánto cuesta?"].map(
          (m) => I`<div class="acc-bar"><span>${m}</span><span>▸</span></div>`
        )}</div>`;
        break;
      case "commentThread":
        o = I`<div class="col-lay" style="gap:4px">${[["Ana", "Esto está casi listo"], ["Luis", "Le doy un repaso y cierro"]].map(
          ([m, f]) => I`<div class="card-box" style="padding:6px 8px"><span style="font-size:10px;font-weight:700;color:#0284c7">${m}</span>
            <span class="text-stub"> ${f}</span></div>`
        )}</div>`;
        break;
      case "comparisonCard":
        o = I`<div class="grid-lay">${["Básico", "Pro"].map(
          (m, f) => I`<div class="card-box" style="text-align:center"><div class="card-title">${m}</div>
            <div class="text-stub">✓ Una cosa<br />${f ? "✓" : "✕"} Otra cosa</div></div>`
        )}</div>`;
        break;
      // ---- Mateu enterprise/booking wave ----
      case "planningBoard":
        o = I`<div class="col-lay" style="gap:4px">${[["Recurso A", 10, 35], ["Recurso B", 40, 30], ["Recurso C", 20, 50]].map(
          ([m, f, g]) => I`<div class="stub-row"><span style="flex:0 0 64px">${m}</span>
            <div style="flex:1;height:14px;border-radius:4px;background:#f1f5f9"><div style="margin-left:${f}%;width:${g}%;height:100%;border-radius:4px;background:#0284c7;opacity:.85"></div></div></div>`
        )}
          <div class="stub-row" style="justify-content:space-between;color:#94a3b8;font-size:9px"><span>lun</span><span>mié</span><span>vie</span><span>dom</span></div>`;
        break;
      case "offerCard":
        o = I`<div class="card-box" style="display:flex;gap:10px;align-items:center">
          <div style="width:44px;height:44px;border-radius:8px;background:#e0f2fe"></div>
          <div style="flex:1"><div class="card-title">${e.title ?? "Una oferta irresistible"}</div>
            <div class="text-stub">✓ Ventaja uno · ✓ Ventaja dos</div></div>
          <span class="btn" style="flex:none">59 € · Añadir</span>
        </div>`;
        break;
      case "addOnPicker":
        o = I`<div class="col-lay" style="gap:3px">${[["🧖", "Spa", "25 €"], ["🍳", "Desayuno", "12 €"]].map(
          ([m, f, g]) => I`<div class="stub-row" style="justify-content:space-between"><span>${m} ${f}</span><span class="btn" style="font-size:10px;padding:2px 8px">${g} +</span></div>`
        )}
          <div class="stub-row" style="justify-content:flex-end;font-weight:700">Total: 37 €</div>`;
        break;
      case "paymentPicker":
        o = I`<div class="col-lay" style="gap:4px">
          <div class="row-lay">${["💳 Tarjeta", "🏦 Transferencia"].map((m, f) => I`<span class="control" style="justify-content:center;font-size:11px;${f === 0 ? "border-color:#0284c7" : ""}">${m}</span>`)}</div>
          <span class="btn" style="text-align:center">Confirmar y pagar</span></div>`;
        break;
      case "pricingTable":
        o = I`<div class="grid-lay">${[["Básico", "9 €/mes", ""], ["Pro", "29 €/mes", "border-color:#0284c7"]].map(
          ([m, f, g]) => I`<div class="card-box" style="text-align:center;${g}"><div class="card-title">${m}</div>
            <div style="font-size:16px;font-weight:800;color:#0f172a">${f}</div>
            <div class="text-stub">✓ Una cosa<br />✓ Otra cosa</div>
            <span class="btn" style="display:inline-block;margin-top:4px;font-size:10px">Elegir</span></div>`
        )}</div>`;
        break;
      case "processMonitor":
        o = I`<div class="col-lay" style="gap:3px">${[["Nóminas", "#16a34a", "OK"], ["Facturación", "#f59e0b", "2 avisos"]].map(
          ([m, f, g]) => I`<div class="stub-row" style="justify-content:space-between"><span><span class="stub-dot" style="background:${f};display:inline-block;margin-right:6px"></span>${m}</span><span style="color:#94a3b8">${g}</span></div>`
        )}</div>`;
        break;
      case "resourceGrid":
        o = I`<div class="grid3-lay">${["Estándar", "Superior ★", "Suite"].map(
          (m, f) => I`<div class="card-box" style="text-align:center;font-size:11px;${f === 1 ? "border-color:#0284c7" : ""}">${m}<br /><span style="color:#94a3b8;font-size:10px">${f === 1 ? "recomendada" : "disponible"}</span></div>`
        )}</div>`;
        break;
      case "taskQueue":
        o = I`<div class="acc-bar"><span>Pendientes (2)</span></div>
          <div class="col-lay" style="gap:3px">${["Revisar contrato", "Llamar al cliente"].map(
          (m) => I`<div class="stub-row">☐ ${m}</div>`
        )}</div>`;
        break;
      case "ledger":
        o = I`<div class="col-lay" style="gap:2px">${[["Habitación", "240 €"], ["Spa", "25 €"], ["Desayuno", "incluido"]].map(
          ([m, f]) => I`<div class="stub-row" style="justify-content:space-between"><span>${m}</span><span>${f}</span></div>`
        )}
          <div class="stub-row" style="justify-content:space-between;font-weight:800;border-top:1.5px solid #e2e8f0;padding-top:3px"><span>Total</span><span>265 €</span></div>`;
        break;
      case "chat":
        o = I`<div class="col-lay" style="gap:4px">
          <div class="card-box" style="padding:6px 8px;max-width:75%">Hola, ¿en qué puedo ayudarte?</div>
          <div class="card-box" style="padding:6px 8px;max-width:75%;align-self:flex-end;background:#e0f2fe">Quería una reserva…</div>
          <div class="control">Escribe un mensaje…</div></div>`;
        break;
      case "markdown":
        o = I`<div class="text-stub"><b># Título</b><br />Texto con <b>**negritas**</b> y <span style="color:#0284c7">[enlaces]</span>…</div>`;
        break;
      case "breadcrumbs":
        o = I`<div class="stub-row" style="color:#94a3b8">Inicio <span>›</span> Sección <span>›</span> <span style="color:#0f172a;font-weight:600">${e.title ?? "Aquí"}</span></div>`;
        break;
      default:
        o = I`<div class="col-lay">${t.length ? i(t) : n}</div>`;
    }
    const s = pe.LEAF_KINDS.has(e.kind), a = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), r = (m) => {
      var f, g;
      m.stopPropagation(), this._dragCmpId = e.id, (g = m.dataTransfer) == null || g.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (f = this.page) == null ? void 0 : f.id, componentId: e.id })
      ), m.dataTransfer && (m.dataTransfer.effectAllowed = "move");
    };
    return I`<div
      class="cmp ${s ? "leafcmp" : ""} ${a ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
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
      var g;
      m.preventDefault(), m.stopPropagation();
      const f = ((g = m.dataTransfer) == null ? void 0 : g.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...f].includes("application/x-modux-cmp") || [...f].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, m) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(m) => {
      var f, g, v;
      this._foreignOver = !1, !(!this._dragCmpId && !((v = (g = (f = m.dataTransfer) == null ? void 0 : f.types) == null ? void 0 : g.includes) != null && v.call(g, "application/x-modux-cmp"))) && (m.preventDefault(), m.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, m));
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
  renderInferredBody(e, t, i) {
    return I`
        ${i ? I`<table>
              <tr>${t.slice(0, 4).map((n) => I`<th>${n.label ?? n.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => I`<tr>${t.slice(0, 4).map(() => I`<td>···</td>`)}</tr>`)}
            </table>` : re}
        ${t.length ? I`<div class="grid">
              ${t.map(
      (n) => I`
                  <div
                    class="field ${n.colspan === 2 ? "span2" : ""} ${this._overId === n.fieldId ? "dropping" : ""}"
                    draggable="true"
                    data-field-id=${n.fieldId}
                    title="Click: editar declaración · arrastra para reordenar"
                    @click=${() => this.onFieldClick(n)}
                    @dragstart=${(o) => {
        o.stopPropagation(), this._dragId = n.fieldId;
      }}
                    @dragover=${(o) => {
        o.preventDefault(), this._overId = n.fieldId;
      }}
                    @dragleave=${() => this._overId = null}
                    @drop=${(o) => {
        o.preventDefault(), o.stopPropagation(), this.onDrop(n.fieldId);
      }}
                  >
                    <label>${n.label ?? n.name}</label>
                    ${this.control(n)}
                  </div>
                `
    )}
            </div>` : I`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    var o, s, a, r, l;
    const e = this._cmp;
    if (!e) return re;
    const t = (u) => this._cmp = { ...this._cmp, ...u }, i = e.kind, n = [
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
    return I`<div class="pop" @click=${(u) => u.stopPropagation()}>
      ${n ? I`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(u) => t({ title: u.target.value })} />` : re}
      ${i === "text" ? I`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(u) => t({ text: u.target.value })} />` : re}
      ${i === "button" || i === "field" ? I`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(u) => t({ label: u.target.value })} />` : re}
      ${i === "button" ? I`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? I`<span class="chip">${((o = this.useCases.find((u) => u.id === e.useCaseId)) == null ? void 0 : o.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : I`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? I`<span class="chip"
                      >${((s = this.mappings.find((u) => u.id === e.mappingId)) == null ? void 0 : s.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : I`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : re}
      ${i === "form" ? I`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? I`<span class="chip"
                      >${((a = this.models.find((u) => u.id === e.modelId)) == null ? void 0 : a.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : I`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>
            <label>Mapping</label>
            <span style="grid-column: 2 / -1">
              ${e.mappingId ? I`<span class="chip"
                      >${((r = this.mappings.find((u) => u.id === e.mappingId)) == null ? void 0 : r.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : I`<span class="vmhint">el viewmodel viaja tal cual al guardar — suelta un mapeado del Catálogo sobre el formulario</span>`}
            </span>` : re}
      ${i === "listing" || i === "crud" ? I`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? I`<span class="chip"
                      >${((l = this.queryOps.find((u) => u.id === e.queryOperationId)) == null ? void 0 : l.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : I`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>
            <label>Ficha</label>
            <select
              style="grid-column: 2 / -1"
              title="La página que abre el click en una fila"
              @change=${(u) => t({ detailPageId: u.target.value || void 0 })}
            >
              <option value="">— sin ficha —</option>
              ${this.pages.filter((u) => {
      var h;
      return u.id !== ((h = this.page) == null ? void 0 : h.id);
    }).map((u) => I`<option value=${u.id} ?selected=${u.id === e.detailPageId}>${u.name}</option>`)}
            </select>` : re}
      ${i === "field" ? I`<label>Estereotipo</label>
            <select @change=${(u) => t({ stereotype: u.target.value || void 0 })}>
              ${uo.map((u) => I`<option value=${u} ?selected=${u === (e.stereotype ?? "regular")}>${u}</option>`)}
            </select>` : re}
      ${i === "tabLayout" ? I`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : re}
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
        colspan: u.colspan ?? null,
        detailPageId: u.detailPageId ?? null
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
    const i = (this.page.viewmodelFields ?? []).map((s) => s.fieldId), n = i.indexOf(t), o = i.indexOf(e);
    n < 0 || o < 0 || (i.splice(o, 0, ...i.splice(n, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return re;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId, n = e.type === "WIZARD";
    return I`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? I`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(o) => this._rename = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRename(), o.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : I`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        ${this._route !== null ? I`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(o) => this._route = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRoute(), o.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : I`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
              >${e.route ?? "/…"}</span
            >`}
        <button class="ficha" @click=${() => this.emitEvent("open-crud")} title="Abrir la ficha de la página (detalle y edición)">Ficha</button>
        <button class="close" @click=${() => this.emitEvent("designer-closed")} title="Cerrar el diseñador">✕</button>
      </div>
      <div class="zone zhdr" title="Cabecera de la página: título y descripción se infieren de la declaración">
        ⌐ ${e.name}
      </div>
      <div class="toolbar" data-bar="toolbar" title="Toolbar: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => (o.bar ?? "toolbar") === "toolbar").map(
      (o) => I`<span
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
        ${(e.buttons ?? []).some((o) => (o.bar ?? "toolbar") === "toolbar") ? re : I`<span class="zoneph">suelta un caso de uso aquí</span>`}
      </div>
      <div class="vm">
        viewmodel:
        ${e.modelId ? I`<span class="chip"
                >${e.modelName ?? e.modelId}
                <span
                  class="chipx"
                  title="Quitar el viewmodel"
                  @click=${() => this.emitEvent("page-model-changed", { modelId: null })}
                  >✕</span
                ></span
              >` : I`<span class="vmhint"
              >arrastra un modelo del Catálogo hasta el frame — o el asa violeta de la página, en la vista UI</span
            >`}
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${n ? I`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((o, s) => {
      const a = (e.wizardSteps ?? []).map((l, u) => l.id ?? l.pageId ?? String(u)), r = a[s];
      return I`<span
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
        const u = this._dragWizKey;
        if (this._dragWizKey = null, !u || u === r) return;
        l.preventDefault(), l.stopPropagation();
        const h = l.currentTarget.getBoundingClientRect(), f = l.clientX - h.left < h.width / 2 ? r : a[s + 1] ?? null;
        f !== u && this.emitEvent("wizard-step-moved", { stepKey: u, beforeStepKey: f });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[s] ?? `${s + 1}.`} ${o.label ?? "Paso"}${o.pageId ? "" : " ⌁"}</span
                    >`;
    }) : I`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : re}
        ${(e.content ?? []).length ? I`<div class="col-lay">${(e.content ?? []).map((o) => this.renderComponent(o))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => o.bar === "bottom").map(
      (o) => I`<span
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
        ${(e.buttons ?? []).some((o) => o.bar === "bottom") ? re : I`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var s, a, r;
      const o = (((s = this.page) == null ? void 0 : s.buttons) ?? []).some((l) => l.useCaseId === this._btn.useCaseId);
      return I`<div class="pop">
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
                ${this._btn.mappingId ? I`<span class="chip"
                        >${((r = this.mappings.find((l) => l.id === this._btn.mappingId)) == null ? void 0 : r.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : I`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${o ? I`<button
                      @click=${() => {
        const l = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: l });
      }}
                    >
                      Quitar
                    </button>` : re}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(o)}>Aplicar</button>
              </div>
            </div>`;
    })() : re}
      ${this._editing ? I`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(o) => this._editing = { ...this._editing, stereotype: o.target.value }}
            >
              ${uo.map(
      (o) => I`<option value=${o} ?selected=${o === this._editing.stereotype}>${o}</option>`
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
          </div>` : re}
    `;
  }
};
pe.styles = nt`
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
    .notice-stub {
      border: 1px solid #7dd3fc;
      background: #f0f9ff;
      color: #075985;
      border-radius: 8px;
      padding: 6px 10px;
      font-size: 11px;
    }
    .stub-row {
      display: flex;
      gap: 6px;
      align-items: center;
      font-size: 11px;
      color: #334155;
    }
    .stub-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex: none;
    }
    .stub-step {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1.5px solid #cbd5e1;
      color: #94a3b8;
      font-size: 10px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
    }
    .stub-step.on {
      background: #0284c7;
      border-color: #0284c7;
      color: #ffffff;
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
  menuBar: "Menú",
  section: "Sección",
  zones: "Zonas",
  toolbar: "Toolbar",
  pageHeader: "Cabecera",
  hero: "Hero",
  scoreboard: "Scoreboard",
  wizard: "Wizard",
  app: "Shell",
  crud: "CRUD",
  filterBar: "Filtros",
  fab: "FAB",
  appContext: "Contexto",
  kpi: "KPI",
  stat: "Estadística",
  notice: "Aviso",
  banner: "Banner",
  calloutCard: "Callout",
  bulletedList: "Lista",
  statusList: "Estados",
  checklist: "Checklist",
  fileList: "Ficheros",
  separator: "Separador",
  entityHeader: "Entidad",
  emptyState: "Vacío",
  skeleton: "Esqueleto",
  progressBar: "Progreso",
  progressSteps: "Pasos",
  taskProgress: "Tareas",
  meter: "Medidor",
  timeline: "Timeline",
  calendar: "Calendario",
  kanban: "Kanban",
  gantt: "Gantt",
  trendChart: "Tendencia",
  heatmap: "Mapa de calor",
  funnel: "Embudo",
  orgChart: "Organigrama",
  featureGrid: "Features",
  testimonials: "Testimonios",
  faq: "FAQ",
  commentThread: "Comentarios",
  comparisonCard: "Comparativa",
  planningBoard: "Planning",
  offerCard: "Oferta",
  addOnPicker: "Extras",
  paymentPicker: "Pago",
  pricingTable: "Precios",
  processMonitor: "Procesos",
  resourceGrid: "Recursos",
  taskQueue: "Cola",
  ledger: "Desglose",
  chat: "Chat",
  markdown: "Markdown",
  breadcrumbs: "Migas"
};
pe.LEAF_KINDS = /* @__PURE__ */ new Set([
  "form",
  "listing",
  "button",
  "field",
  "text",
  "metricCard",
  "menuBar",
  "crud",
  "filterBar",
  "fab",
  "appContext",
  "kpi",
  "stat",
  "notice",
  "banner",
  "calloutCard",
  "bulletedList",
  "statusList",
  "checklist",
  "fileList",
  "separator",
  "entityHeader",
  "emptyState",
  "skeleton",
  "progressBar",
  "progressSteps",
  "taskProgress",
  "meter",
  "timeline",
  "calendar",
  "kanban",
  "gantt",
  "trendChart",
  "heatmap",
  "funnel",
  "orgChart",
  "featureGrid",
  "testimonials",
  "faq",
  "commentThread",
  "comparisonCard",
  "planningBoard",
  "offerCard",
  "addOnPicker",
  "paymentPicker",
  "pricingTable",
  "processMonitor",
  "resourceGrid",
  "taskQueue",
  "ledger",
  "chat",
  "markdown",
  "breadcrumbs"
]);
xe([
  de({ attribute: !1 })
], pe.prototype, "page", 2);
xe([
  de({ type: Boolean, reflect: !0 })
], pe.prototype, "framed", 2);
xe([
  de({ attribute: !1 })
], pe.prototype, "models", 2);
xe([
  de({ attribute: !1 })
], pe.prototype, "mappings", 2);
xe([
  de({ attribute: !1 })
], pe.prototype, "useCases", 2);
xe([
  de({ attribute: !1 })
], pe.prototype, "queryOps", 2);
xe([
  de({ attribute: !1 })
], pe.prototype, "pages", 2);
xe([
  de({ attribute: !1 })
], pe.prototype, "selectedCmpId", 2);
xe([
  U()
], pe.prototype, "_editing", 2);
xe([
  U()
], pe.prototype, "_dragId", 2);
xe([
  U()
], pe.prototype, "_overId", 2);
xe([
  U()
], pe.prototype, "_rename", 2);
xe([
  U()
], pe.prototype, "_route", 2);
xe([
  U()
], pe.prototype, "_btn", 2);
xe([
  U()
], pe.prototype, "_cmp", 2);
xe([
  U()
], pe.prototype, "_dragCmpId", 2);
xe([
  U()
], pe.prototype, "_dragWizKey", 2);
xe([
  U()
], pe.prototype, "_overCmpId", 2);
xe([
  U()
], pe.prototype, "_overCmpPos", 2);
xe([
  U()
], pe.prototype, "_foreignOver", 2);
xe([
  U()
], pe.prototype, "_activeTabs", 2);
pe = xe([
  mt("modux-page-designer")
], pe);
var dp = Object.defineProperty, lp = Object.getOwnPropertyDescriptor, qe = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? lp(t, i) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && dp(t, i, o), o;
};
const ca = 460, cp = 540, pp = 660;
let Pe = class extends je {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((o) => {
        var s;
        return (s = o.classList) == null ? void 0 : s.contains("frame-grip");
      });
      if (i) {
        const s = i.closest(".frame").dataset.pageId, a = this.sizeOf(s);
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "resize", id: s, x: e.clientX, y: e.clientY, w0: a.w, h0: a.h }, e.preventDefault();
        return;
      }
      const n = t.find((o) => {
        var s;
        return (s = o.classList) == null ? void 0 : s.contains("frame-title");
      });
      if (n) {
        const s = n.closest(".frame").dataset.pageId;
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
      const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, o = e.deltaY < 0 ? 1.1 : 1 / 1.1, s = Math.max(0.2, Math.min(2.5, this._t.k * o));
      this._t = {
        k: s,
        x: i - (i - this._t.x) / this._t.k * s,
        y: n - (n - this._t.y) / this._t.k * s
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
    var h, m, f, g, v, b;
    const i = (h = this.shadowRoot) == null ? void 0 : h.elementFromPoint(e, t), n = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, ".frame");
    if (!n) return null;
    const o = n.dataset.pageId, s = n.querySelector("modux-page-designer"), a = (f = s == null ? void 0 : s.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), r = (g = a == null ? void 0 : a.closest) == null ? void 0 : g.call(a, "[data-btn-uc]");
    if (r != null && r.dataset.btnUc) return `btn:${o}:${r.dataset.btnUc}`;
    const l = (v = a == null ? void 0 : a.closest) == null ? void 0 : v.call(a, "[data-bar]");
    if (l != null && l.dataset.bar) return `bar:${o}:${l.dataset.bar}`;
    const u = (b = a == null ? void 0 : a.closest) == null ? void 0 : b.call(a, "[data-cmp-id]");
    return u ? `cmp:${o}:${u.dataset.cmpId}` : o;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var f, g, v, b;
    const i = (f = this.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), n = (g = i == null ? void 0 : i.closest) == null ? void 0 : g.call(i, ".frame");
    if (!n) return null;
    const o = n.dataset.pageId, s = n.querySelector("modux-page-designer"), a = (v = s == null ? void 0 : s.shadowRoot) == null ? void 0 : v.elementFromPoint(e, t), r = (b = a == null ? void 0 : a.closest) == null ? void 0 : b.call(a, "[data-cmp-id]");
    if (!r) return { pageId: o, componentId: null, pos: "into" };
    const l = r.dataset.cmpKind ?? "", u = r.getBoundingClientRect(), h = (t - u.top) / Math.max(1, u.height), m = pe.LEAF_KINDS.has(l) ? h < 0.5 ? "before" : "after" : h < 0.2 ? "before" : h > 0.8 ? "after" : "into";
    return { pageId: o, componentId: r.dataset.cmpId, pos: m };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: ca, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * cp, y: Math.floor(t / 3) * pp };
  }
  render() {
    return I`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var o, s;
      const i = ((o = this._live) == null ? void 0 : o.id) === e.id ? this._live : this.posOf(e.id, t), n = this.sizeOf(e.id);
      return I`
            <div
              class="frame ${this.selectedId === e.id || this.selectedIds.includes(e.id) ? "selected" : ""}"
              data-page-id=${e.id}
              style="left: ${i.x}px; top: ${i.y}px; width: ${n.w}px"
            >
              <div class="frame-title">
                ${e.name}
                <span class="route">${e.route ?? ""}</span>
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
                .pages=${this.pages.map((a) => ({ id: a.id, name: a.name }))}
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
      ${this.pages.length ? "" : I`<div class="empty">
            No hay páginas todavía.<br />
            Créalas en la vista <b>UI</b> (paleta → Página) y diséñalas aquí.
          </div>`}
      <div class="hud">
        arrastra el título para mover un frame · la esquina redimensiona · fondo panea · rueda zoom · click selecciona · doble click configura · arrastra nodos entre frames · Ctrl+C/V copia y pega · Supr borra
      </div>
    `;
  }
};
Pe.styles = nt`
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
      width: ${ca}px;
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
  de({ attribute: !1 })
], Pe.prototype, "pages", 2);
qe([
  de({ attribute: !1 })
], Pe.prototype, "layout", 2);
qe([
  de({ attribute: !1 })
], Pe.prototype, "sizes", 2);
qe([
  de({ attribute: !1 })
], Pe.prototype, "selectedId", 2);
qe([
  de({ attribute: !1 })
], Pe.prototype, "selectedIds", 2);
qe([
  de({ attribute: !1 })
], Pe.prototype, "models", 2);
qe([
  de({ attribute: !1 })
], Pe.prototype, "mappings", 2);
qe([
  de({ attribute: !1 })
], Pe.prototype, "useCases", 2);
qe([
  de({ attribute: !1 })
], Pe.prototype, "queryOps", 2);
qe([
  de({ attribute: !1 })
], Pe.prototype, "selectedCmp", 2);
qe([
  U()
], Pe.prototype, "_t", 2);
qe([
  U()
], Pe.prototype, "_live", 2);
qe([
  U()
], Pe.prototype, "_liveSize", 2);
Pe = qe([
  mt("modux-figma")
], Pe);
var up = Object.defineProperty, mp = Object.getOwnPropertyDescriptor, Re = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? mp(t, i) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && up(t, i, o), o;
};
const fp = {
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
}, Xi = {
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
}, hp = {
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
}, mo = [30, 20, 13, 9.5, 7.5], fo = [0, 180, 118, 80, 58], gp = 0.055, yp = 0.86, bp = 2600, vi = 240, ho = 0.16, go = 0.015;
let ve = class extends je {
  constructor() {
    super(...arguments), this.shifted = !1, this.scene = null, this.model = {
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
      const i = this.selectedNodes();
      if (e.key === "F2" && i.length === 1) {
        e.preventDefault(), this.renaming = { key: i[0].key, value: i[0].label };
        return;
      }
      (e.key === "Delete" || e.key === "Backspace") && i.length && (e.preventDefault(), i.length > 1 ? this.emitUp("delete-selection-requested", {
        items: i.map((n) => ({ id: n.refId, kind: n.kind }))
      }) : this.emitUp("delete-requested", {
        elementType: "node",
        id: i[0].refId,
        kind: i[0].kind
      }), this.selected = /* @__PURE__ */ new Set());
    }, this.frame = 0;
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
    const e = {}, t = (i) => {
      e[i.key] = { e: i.expanded ? 1 : 0, x: Math.round(i.x), y: Math.round(i.y) };
      for (const n of i.children ?? []) t(n);
    };
    t(this.root);
    try {
      sessionStorage.setItem(ve.STORE_KEY, JSON.stringify({
        cam: this.cam,
        nodes: e,
        levels: Object.fromEntries(this.manualLevels)
      }));
    } catch {
    }
  }
  loadState() {
    try {
      const e = sessionStorage.getItem(ve.STORE_KEY);
      if (!e) return;
      const t = JSON.parse(e);
      t.cam && t.cam.k > 0 && (this.cam = t.cam), this.manualLevels = new Map(Object.entries(t.levels ?? {}));
      for (const [i, n] of Object.entries(t.nodes ?? {})) {
        const o = {
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
        this.prevByKey.has(i) || this.prevByKey.set(i, o);
      }
    } catch {
    }
  }
  firstUpdated() {
    var e;
    if (this.canvas = this.renderRoot.querySelector("canvas") ?? void 0, this.ctx = ((e = this.canvas) == null ? void 0 : e.getContext("2d")) ?? void 0, this.loadState(), this.ro = new ResizeObserver(() => this.resize()), this.ro.observe(this), this.resize(), this.buildTree(), this.raf = requestAnimationFrame(() => this.tick()), this.renaming) {
      const t = this.renderRoot.querySelector(".rename"), i = this.visible().find((n) => n.key === this.renaming.key);
      t && i && (t.style.left = `${i.x * this.cam.k + this.cam.x}px`, t.style.top = `${(i.y + this.radiusOf(i) + 6) * this.cam.k + this.cam.y}px`);
    }
  }
  /** Centers the visible tree in the viewport (the toolbar's «Ajustar»). */
  fit() {
    const e = this.visible();
    if (!e.length) return;
    let t = 1 / 0, i = 1 / 0, n = -1 / 0, o = -1 / 0;
    for (const m of e)
      t = Math.min(t, m.x), i = Math.min(i, m.y), n = Math.max(n, m.x), o = Math.max(o, m.y);
    const s = 70, a = this.clientWidth || 800, r = this.clientHeight || 600, l = n - t + s * 2, u = o - i + s * 2, h = Math.min(1.5, Math.max(0.25, Math.min(a / l, r / u)));
    this.cam.k = h, this.cam.x = a / 2 - (t + n) / 2 * h, this.cam.y = r / 2 - (i + o) / 2 * h;
  }
  /** Tree depth the scene reaches (root = 0, top nodes = 1, their children = 2…). */
  sceneDepth() {
    if (!this.scene) return 1;
    const e = new Map(this.scene.nodes.map((i) => [i.id, i]));
    let t = 1;
    for (const i of this.scene.nodes) {
      let n = 1;
      for (let o = i.ownerId ?? i.parentId; o; ) {
        n++;
        const s = e.get(o);
        o = s ? s.ownerId ?? s.parentId : void 0;
      }
      t = Math.max(t, n);
    }
    return t;
  }
  updated(e) {
    var t;
    (e.has("model") || e.has("scene")) && this.buildTree(), e.has("sceneKey") && e.get("sceneKey") !== void 0 && this.applyLevels(this.manualLevels.get(this.sceneKey) ?? Math.min(this.sceneDepth(), 3)), e.has("renaming") && this.renaming && ((t = this.renderRoot.querySelector(".rename")) == null || t.select());
  }
  resize() {
    var n;
    if (!this.canvas) return;
    const e = window.devicePixelRatio || 1, t = this.clientWidth || 800, i = this.clientHeight || 600;
    this.canvas.width = t * e, this.canvas.height = i * e, (n = this.ctx) == null || n.setTransform(e, 0, 0, e, 0, 0), this.cam.x === 0 && this.cam.y === 0 && (this.cam.x = t / 2, this.cam.y = i / 2);
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
    const t = (i, n) => {
      !i || !n || i === n || (this.related.has(i) || this.related.set(i, /* @__PURE__ */ new Set()), this.related.has(n) || this.related.set(n, /* @__PURE__ */ new Set()), this.related.get(i).add(n), this.related.get(n).add(i));
    };
    if (this.scene) {
      for (const i of this.scene.edges) t(i.sourceId, i.targetId);
      return;
    }
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
    for (const i of e.boundedContexts) t(i.id, i.identityProviderId);
    for (const i of e.etlFlows ?? []) t(i.id, i.identityProviderId);
    for (const i of e.identityProviders ?? []) t(i.id, i.publishedByExternalSystemId);
  }
  rememberSubtree(e) {
    this.prevByKey.set(e.key, e);
    for (const t of e.children ?? []) this.rememberSubtree(t);
  }
  makeNode(e, t, i, n, o) {
    const s = `${(o == null ? void 0 : o.key) ?? ""}/${e}:${t}`, a = this.prevByKey.get(s), r = () => (Math.random() - 0.5) * 10;
    return {
      key: s,
      refId: t,
      kind: e,
      label: i,
      color: fp[e] ?? this.pal("--modux-text-dim", "#64748b"),
      depth: n,
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
    const t = this.model, i = e.depth + 1, n = (o, s, a) => this.makeNode(o, s, a, i, e);
    if (this.scene)
      return this.scene.nodes.filter((o) => o.kind !== "area").filter((o) => e.kind === "root" ? !(o.ownerId ?? o.parentId) : (o.ownerId ?? o.parentId) === e.refId).map((o) => {
        const s = n(o.kind || "node", o.id, o.label);
        return o.stroke && (s.color = o.stroke), s;
      });
    switch (e.kind) {
      case "root":
        return [
          ...t.boundedContexts.map((o) => n("boundedContext", o.id, o.name)),
          ...t.externalSystems.map((o) => n("external-system", o.id, o.name)),
          ...(t.uiApps ?? []).map((o) => n("ui-app", o.id, o.name)),
          ...(t.actors ?? []).map((o) => n("actor", o.id, o.name)),
          ...(t.aiAgents ?? []).filter((o) => !o.external).map((o) => n("ai-agent", o.id, o.name)),
          ...(t.workflows ?? []).map((o) => n("workflow", o.id, o.name)),
          ...(t.identityProviders ?? []).map((o) => n("identity-provider", o.id, o.name))
        ];
      case "boundedContext": {
        const o = t.boundedContexts.find((u) => u.id === e.refId);
        if (!o) return [];
        const s = (t.aggregates ?? []).filter((u) => u.boundedContextId === e.refId), a = o.useCases ?? [], r = new Set(s.map((u) => u.id)), l = new Set(
          (t.emissions ?? []).filter((u) => r.has(u.sourceId)).map((u) => u.domainEventId)
        );
        return [
          ...s.length ? [n("group", `aggregates:${e.refId}`, `Agregados · ${s.length}`)] : [],
          ...a.length ? [n("group", `use-cases:${e.refId}`, `Casos de uso · ${a.length}`)] : [],
          ...(o.domainEvents ?? []).filter((u) => !l.has(u.id)).map((u) => n("domain-event", u.id, u.name)),
          ...(o.applicationEvents ?? []).map((u) => n("application-event", u.id, u.name)),
          ...(o.readModels ?? []).map((u) => n("read-model", u.id, u.name)),
          ...(o.domainServices ?? []).map((u) => n("domain-service", u.id, u.name)),
          ...(o.queryServices ?? []).map((u) => n("query-service", u.id, u.name)),
          ...(o.scheduledTriggers ?? []).map((u) => n("scheduled-trigger", u.id, u.name)),
          ...(t.etlFlows ?? []).filter((u) => u.ownerBoundedContextId === e.refId).map((u) => n("etl-flow", u.id, u.name)),
          ...(t.notifications ?? []).filter((u) => u.ownerBoundedContextId === e.refId).map((u) => n("notification", u.id, u.name)),
          ...(t.documents ?? []).filter((u) => u.ownerBoundedContextId === e.refId).map((u) => n("document", u.id, u.name))
        ];
      }
      case "group": {
        const o = e.refId.indexOf(":"), s = e.refId.slice(0, o), a = e.refId.slice(o + 1), r = t.boundedContexts.find((l) => l.id === a);
        return r ? s === "aggregates" ? (t.aggregates ?? []).filter((l) => l.boundedContextId === a).map((l) => n("aggregate", l.id, l.name)) : (r.useCases ?? []).map((l) => n(l.policy ? "policy" : "use-case", l.id, l.name)) : [];
      }
      case "aggregate": {
        const o = new Set(
          (t.emissions ?? []).filter((s) => s.sourceId === e.refId).map((s) => s.domainEventId)
        );
        return [
          ...(t.entities ?? []).filter((s) => s.aggregateId === e.refId).map((s) => n("entity", s.id, s.name)),
          ...t.boundedContexts.flatMap((s) => s.domainEvents ?? []).filter((s) => o.has(s.id)).map((s) => n("domain-event", s.id, s.name))
        ];
      }
      case "external-system": {
        const o = t.externalSystems.find((s) => s.id === e.refId);
        return o ? [
          ...(t.apis ?? []).filter((s) => s.publishedByExternalSystemId === e.refId).map((s) => n("api", s.id, s.name)),
          ...(o.useCases ?? []).map((s) => n("external-use-case", s.id, s.name)),
          ...(o.tables ?? []).map((s) => n("external-table", s.id, s.name)),
          ...(o.mcpServers ?? []).map((s) => n("mcp-server", s.id, s.name))
        ] : [];
      }
      case "api": {
        const o = (t.apis ?? []).find((s) => s.id === e.refId);
        return ((o == null ? void 0 : o.operations) ?? []).map((s) => n("api-operation", s.id, s.name));
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
        return [...s].map((r) => (t.pages ?? []).find((l) => l.id === r)).filter((r) => !!r).map((r) => n("page", r.id, r.name));
      }
      default:
        return [];
    }
  }
  // ── Simulation ────────────────────────────────────────────────────────
  visible() {
    const e = [], t = (i) => {
      if (!(this.focusKeys && !this.focusKeys.has(i.key)) && (e.push(i), i.expanded))
        for (const n of i.children ?? []) t(n);
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
    const t = (i) => {
      if (i.children || (i.children = this.childrenOf(i)), i.expanded = i.depth < e && i.children.length > 0, i.expanded) for (const n of i.children) t(n);
    };
    this.root && t(this.root), this.saveState();
  }
  /** A curated view out of the CURRENT picture: whatever is unfolded, as members. */
  createViewFromVisible() {
    const e = this._viewName.trim();
    if (!e) return;
    const i = (this.selected.size ? this.selectedNodes() : this.visible()).filter((n) => n.kind !== "root" && n.kind !== "group" && n.refId).map((n) => ({ id: n.refId, kind: n.kind }));
    this._viewNaming = !1, this._viewName = "", this.dispatchEvent(
      new CustomEvent("explorer-create-view", {
        detail: { name: e, members: i },
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
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (let r = a; r; r = r.parent) t.add(r.key);
    }, n = (a) => {
      t.add(a.key);
      for (const r of a.children ?? []) n(r);
    };
    i(e), n(e);
    const o = this.related.get(e.refId);
    if (o)
      for (const a of this.allNodes)
        a.refId && o.has(a.refId) && i(a);
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
        const r = (fo[Math.min(a.depth, fo.length - 1)] ?? 60) + Math.min(60, ((((s = a.parent.children) == null ? void 0 : s.length) ?? 1) - 1) * 2.5);
        let l = a.x - a.parent.x, u = a.y - a.parent.y, h = Math.hypot(l, u);
        if (h < 0.01) {
          const v = Math.random() * Math.PI * 2;
          l = Math.cos(v) * 0.1, u = Math.sin(v) * 0.1, h = 0.1;
        }
        const m = gp * (h - r), f = l / h * m, g = u / h * m;
        a.vx -= f, a.vy -= g, a.parent.vx += f * 0.4, a.parent.vy += g * 0.4;
      } else
        a.vx -= a.x * go, a.vy -= a.y * go;
      !this.reducedMotion && this._motion > 0 && (a.vx += Math.sin(t * a.f1 * Math.PI * 2 + a.p1) * ho * this._motion, a.vy += Math.cos(t * a.f2 * Math.PI * 2 + a.p2) * ho * this._motion);
    }
    for (let a = 0; a < e.length; a++) {
      const r = e[a];
      for (let l = a + 1; l < e.length; l++) {
        const u = e[l], h = u.x - r.x, m = u.y - r.y;
        if (Math.abs(h) > vi || Math.abs(m) > vi) continue;
        const f = h * h + m * m;
        if (f > vi * vi || f < 0.01) continue;
        const g = Math.sqrt(f), v = r.depth <= 1 && u.depth <= 1 ? 3 : 1, b = bp * v / f, d = h / g * b, c = m / g * b;
        r.vx -= d, r.vy -= c, u.vx += d, u.vy += c;
      }
    }
    const i = this._motion, n = yp * i + 0.5 * (1 - i), o = (1 - i) * 0.7;
    for (const a of e) {
      if (a === this.dragNode) {
        a.vx = 0, a.vy = 0;
        continue;
      }
      a.vx *= n, a.vy *= n;
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
    return (mo[Math.min(e.depth, mo.length - 1)] ?? 7) * e.scale;
  }
  /**
   * Theme palette lookup: the palette rides in on CSS custom properties (they
   * inherit through shadow boundaries), but canvas 2D needs concrete colors.
   */
  pal(e, t) {
    return getComputedStyle(this).getPropertyValue(e).trim() || t;
  }
  draw(e) {
    var s, a;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const i = this.clientWidth, n = this.clientHeight;
    t.clearRect(0, 0, i, n), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), this.drawAreas(t, e), t.lineWidth = 1.3 / this.cam.k;
    for (const r of e)
      r.parent && (t.strokeStyle = r.color + "55", t.beginPath(), t.moveTo(r.parent.x, r.parent.y), t.lineTo(r.x, r.y), t.stroke());
    const o = (r) => `${r}px system-ui, sans-serif`;
    for (const r of e) {
      const l = this.radiusOf(r);
      t.beginPath(), t.arc(r.x, r.y, l, 0, Math.PI * 2), t.fillStyle = r.kind === "note" ? this.pal("--modux-note-fill", "#fef9c3") : r.expanded ? r.color + "22" : this.pal("--modux-node-fill", "#232527"), t.fill(), t.lineWidth = (r === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = r.color, t.stroke(), this.drawGlyph(t, r, l);
      const u = ((s = r.children) == null ? void 0 : s.length) ?? 0;
      if (!r.expanded && u > 0) {
        const m = Math.max(7, l * 0.42), f = r.x + l * 0.75, g = r.y + l * 0.75;
        t.beginPath(), t.arc(f, g, m, 0, Math.PI * 2), t.fillStyle = r.color, t.fill(), t.fillStyle = "#ffffff", t.font = o(m * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(u), f, g + 0.5);
      }
      if (r.depth <= 1 || r === this.hover || this.cam.k > 0.65) {
        const m = r.label.length > 22 ? r.label.slice(0, 21) + "…" : r.label;
        t.font = r === this.hover ? `600 ${o(12)}` : o(r.depth <= 1 ? 12 : 10.5), t.fillStyle = r === this.hover ? this.pal("--modux-text", "#0f172a") : this.pal("--modux-text-dim", "#475569"), t.textAlign = "center", t.textBaseline = "top", t.fillText(m, r.x, r.y + l + 4);
      }
    }
    if (this.selected.size) {
      t.save(), t.strokeStyle = this.pal("--modux-primary", "#2563eb"), t.lineWidth = 2 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]);
      for (const r of e)
        this.selected.has(r.key) && (t.beginPath(), t.arc(r.x, r.y, this.radiusOf(r) + 6, 0, Math.PI * 2), t.stroke());
      t.restore();
    }
    if (this.rubber) {
      const r = this.rubber;
      t.save(), t.fillStyle = this.pal("--modux-primary-soft", "rgba(37, 99, 235, 0.08)"), t.strokeStyle = this.pal("--modux-primary", "#2563eb"), t.lineWidth = 1.2 / this.cam.k, t.setLineDash([4 / this.cam.k, 3 / this.cam.k]), t.fillRect(Math.min(r.ax, r.bx), Math.min(r.ay, r.by), Math.abs(r.bx - r.ax), Math.abs(r.by - r.ay)), t.strokeRect(Math.min(r.ax, r.bx), Math.min(r.ay, r.by), Math.abs(r.bx - r.ax), Math.abs(r.by - r.ay)), t.restore();
    }
    if (this.found)
      if (this.t > this.found.until)
        this.found = void 0;
      else {
        const r = this.found.node, l = (this.found.until - this.t) / 3.2;
        t.save(), t.globalAlpha = Math.min(0.8, l * 1.6), t.strokeStyle = r.color, t.lineWidth = 2.2 / this.cam.k;
        const u = this.reducedMotion ? 0 : Math.sin(this.t * 5) * 3;
        t.beginPath(), t.arc(r.x, r.y, this.radiusOf(r) + 9 + u, 0, Math.PI * 2), t.stroke(), t.globalAlpha *= 0.4, t.beginPath(), t.arc(r.x, r.y, this.radiusOf(r) + 18 + u * 1.4, 0, Math.PI * 2), t.stroke(), t.restore();
      }
    if (t.globalAlpha = 1, this.drawNotes(t, e), this._threads)
      for (const r of e) this.drawThreads(t, r, e);
    else this.hover && this.drawThreads(t, this.hover, e);
    if (this.hover && !this.hover.expanded && ((a = this.hover.children) != null && a.length) && this.drawGhosts(t, this.hover), this.linking) {
      const r = this.linking.source;
      t.save(), t.strokeStyle = this.pal("--modux-text-dim", "#475569"), t.lineWidth = 1.6 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]), t.beginPath(), t.moveTo(r.x, r.y), t.lineTo(this.linking.x, this.linking.y), t.stroke(), t.restore();
    }
    t.restore(), this.hover && !this.linking && this.drawCard(t, this.hover, i, n);
  }
  /**
   * Cross-relations as faint threads: hovering a node reveals what it talks
   * to across the tree (calls, events, actor uses, IdP trust…) without
   * cluttering the resting picture. Only threads to visible nodes are drawn.
   */
  drawThreads(e, t, i) {
    const n = this.related.get(t.refId);
    if (!(n != null && n.size)) return;
    const o = Math.min(0.65, (this.t - this.hoverAt) * 2.2);
    if (!(o <= 0.02)) {
      e.save(), e.globalAlpha = o, e.setLineDash([6, 5]), e.lineWidth = 1.4 / this.cam.k;
      for (const s of i) {
        if (s === t || !n.has(s.refId) || s === t.parent || s.parent === t) continue;
        const a = (t.x + s.x) / 2, r = (t.y + s.y) / 2, l = s.x - t.x, u = s.y - t.y, h = 0.18;
        e.strokeStyle = s.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(a - u * h, r + l * h, s.x, s.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(s.x, s.y, this.radiusOf(s) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
      }
      e.restore();
    }
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
    const i = ((s = this.scene) == null ? void 0 : s.nodes) ?? [], n = i.filter((a) => a.kind === "area");
    if (!n.length) return;
    const o = this.cam.k;
    e.save(), e.setLineDash([5 / o, 4 / o]), e.lineWidth = 1.4 / o;
    for (const a of n) {
      const r = i.filter(
        (g) => g.kind !== "area" && !g.parentId && g.x - g.w / 2 >= a.x - a.w / 2 && g.x + g.w / 2 <= a.x + a.w / 2 && g.y - g.h / 2 >= a.y - a.h / 2 && g.y + g.h / 2 <= a.y + a.h / 2
      ), l = [];
      for (const g of r) {
        const v = this.visibleRepresentative(g.id, t);
        v && l.push({ x: v.x, y: v.y, r: this.radiusOf(v) + 16 });
      }
      if (!l.length) continue;
      const u = Math.min(...l.map((g) => g.x - g.r)), h = Math.max(...l.map((g) => g.x + g.r)), m = Math.min(...l.map((g) => g.y - g.r)), f = Math.max(...l.map((g) => g.y + g.r));
      this.areaHulls.set(a.id, { x: (u + h) / 2, y: (m + f) / 2 }), e.fillStyle = "rgba(148, 163, 184, 0.09)", e.strokeStyle = this.pal("--modux-node-stroke", "#94a3b8"), e.beginPath(), e.roundRect(u, m, h - u, f - m, 18 / o), e.fill(), e.stroke();
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
    const i = (((o = this.scene) == null ? void 0 : o.edges) ?? []).filter((s) => s.kind === "note-link");
    if (!i.length) return;
    const n = this.cam.k;
    e.save(), e.setLineDash([4 / n, 3 / n]), e.strokeStyle = "rgba(202, 138, 4, 0.75)", e.lineWidth = 1.4 / n;
    for (const s of i) {
      if (s.targetId.startsWith("edgeanchor:")) continue;
      const a = this.visibleRepresentative(s.sourceId, t), r = this.visibleRepresentative(s.targetId, t), l = r ?? this.areaHulls.get(s.targetId);
      if (!a || !l || r === a) continue;
      const u = l.x - a.x, h = l.y - a.y, m = Math.hypot(u, h) || 1, f = this.radiusOf(a), g = r ? this.radiusOf(r) : 0;
      e.beginPath(), e.moveTo(a.x + u / m * f, a.y + h / m * f), e.lineTo(l.x - u / m * g, l.y - h / m * g), e.stroke();
    }
    e.restore();
  }
  visibleRepresentative(e, t) {
    var o;
    const i = new Map(t.map((s) => [s.refId, s])), n = new Map((((o = this.scene) == null ? void 0 : o.nodes) ?? []).map((s) => [s.id, s.ownerId ?? s.parentId]));
    for (let s = e; s; s = n.get(s)) {
      const a = i.get(s);
      if (a) return a;
    }
    return null;
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const i = t.children ?? [], n = i.slice(0, 14), o = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (o <= 0.02) return;
    const a = this.radiusOf(t) + 24, r = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, l = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = o, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, n.forEach((u, h) => {
      const m = r - l / 2 + l * (h + 0.5) / n.length, f = this.reducedMotion ? 0 : Math.sin(this.t * u.f1 * Math.PI * 2 + u.p1) * 1.8, g = t.x + Math.cos(m) * (a + f), v = t.y + Math.sin(m) * (a + f);
      e.beginPath(), e.arc(g, v, 6, 0, Math.PI * 2), e.fillStyle = this.pal("--modux-node-fill", "#232527"), e.fill(), e.strokeStyle = u.color, e.stroke();
    }), i.length > n.length) {
      e.setLineDash([]), e.fillStyle = this.pal("--modux-text-dim", "#64748b"), e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const u = r + l / 2 + 0.35;
      e.fillText(`+${i.length - n.length}`, t.x + Math.cos(u) * a, t.y + Math.sin(u) * a);
    }
    e.restore();
  }
  /** A tiny kind glyph inside the circle, so the tree reads without hovering. */
  drawGlyph(e, t, i) {
    const n = i * 0.42;
    if (n < 3.2) return;
    const { x: o, y: s } = t;
    switch (e.save(), e.strokeStyle = t.color, e.fillStyle = t.color, e.lineWidth = Math.max(1, n * 0.22), e.lineCap = "round", e.lineJoin = "round", e.beginPath(), t.kind) {
      case "note":
        e.moveTo(o - n * 0.8, s - n * 0.9), e.lineTo(o + n * 0.8, s - n * 0.9), e.lineTo(o + n * 0.8, s + n * 0.3), e.lineTo(o + n * 0.2, s + n * 0.9), e.lineTo(o - n * 0.8, s + n * 0.9), e.closePath(), e.moveTo(o + n * 0.8, s + n * 0.3), e.lineTo(o + n * 0.2, s + n * 0.3), e.lineTo(o + n * 0.2, s + n * 0.9), e.stroke();
        break;
      case "group": {
        e.arc(o - n * 0.45, s, n * 0.16, 0, Math.PI * 2), e.moveTo(o + n * 0.16, s), e.arc(o, s, n * 0.16, 0, Math.PI * 2), e.moveTo(o + n * 0.61, s), e.arc(o + n * 0.45, s, n * 0.16, 0, Math.PI * 2), e.fill(), e.beginPath(), e.arc(o, s, n, -Math.PI * 0.35, Math.PI * 0.35), e.moveTo(o - n * Math.cos(Math.PI * 0.35), s + n * Math.sin(Math.PI * 0.35)), e.arc(o, s, n, Math.PI * 0.65, Math.PI * 1.35), e.stroke();
        break;
      }
      case "root":
        e.arc(o, s, n, 0, Math.PI * 2), e.moveTo(o + n * 0.35, s), e.arc(o, s, n * 0.35, 0, Math.PI * 2), e.stroke();
        break;
      case "boundedContext":
        for (const [a, r] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(o + a * n + n * 0.3, s + r * n), e.arc(o + a * n, s + r * n, n * 0.3, 0, Math.PI * 2);
        e.fill();
        break;
      case "aggregate":
        e.moveTo(o, s - n), e.lineTo(o + n, s), e.lineTo(o, s + n), e.lineTo(o - n, s), e.closePath(), e.stroke();
        break;
      case "entity":
      case "external-table":
      case "read-model":
        e.rect(o - n, s - n * 0.8, n * 2, n * 1.6), e.moveTo(o - n, s - n * 0.25), e.lineTo(o + n, s - n * 0.25), e.stroke();
        break;
      case "use-case":
      case "external-use-case":
        e.moveTo(o - n * 0.6, s - n * 0.85), e.lineTo(o + n * 0.85, s), e.lineTo(o - n * 0.6, s + n * 0.85), e.closePath(), e.stroke();
        break;
      case "policy":
      case "domain-event":
      case "application-event":
        e.moveTo(o + n * 0.3, s - n), e.lineTo(o - n * 0.5, s + n * 0.15), e.lineTo(o + n * 0.05, s + n * 0.15), e.lineTo(o - n * 0.3, s + n), e.lineTo(o + n * 0.5, s - n * 0.15), e.lineTo(o - n * 0.05, s - n * 0.15), e.closePath(), e.stroke();
        break;
      case "domain-service":
      case "etl-flow": {
        e.arc(o, s, n * 0.5, 0, Math.PI * 2);
        for (let a = 0; a < 6; a++) {
          const r = a * Math.PI / 3;
          e.moveTo(o + Math.cos(r) * n * 0.55, s + Math.sin(r) * n * 0.55), e.lineTo(o + Math.cos(r) * n, s + Math.sin(r) * n);
        }
        e.stroke();
        break;
      }
      case "query-service":
        e.arc(o - n * 0.25, s - n * 0.25, n * 0.6, 0, Math.PI * 2), e.moveTo(o + n * 0.25, s + n * 0.25), e.lineTo(o + n, s + n), e.stroke();
        break;
      case "scheduled-trigger":
        e.arc(o, s, n, 0, Math.PI * 2), e.moveTo(o, s - n * 0.55), e.lineTo(o, s), e.lineTo(o + n * 0.45, s + n * 0.25), e.stroke();
        break;
      case "notification":
        e.moveTo(o - n * 0.85, s + n * 0.45), e.quadraticCurveTo(o - n * 0.85, s - n, o, s - n), e.quadraticCurveTo(o + n * 0.85, s - n, o + n * 0.85, s + n * 0.45), e.closePath(), e.moveTo(o + n * 0.25, s + n * 0.75), e.arc(o, s + n * 0.75, n * 0.25, 0, Math.PI), e.stroke();
        break;
      case "document":
        e.moveTo(o - n * 0.7, s - n), e.lineTo(o + n * 0.25, s - n), e.lineTo(o + n * 0.7, s - n * 0.55), e.lineTo(o + n * 0.7, s + n), e.lineTo(o - n * 0.7, s + n), e.closePath(), e.moveTo(o + n * 0.25, s - n), e.lineTo(o + n * 0.25, s - n * 0.55), e.lineTo(o + n * 0.7, s - n * 0.55), e.stroke();
        break;
      case "workflow":
        for (const a of [-0.7, 0.1])
          e.moveTo(o + a * n, s - n * 0.7), e.lineTo(o + (a + 0.6) * n, s), e.lineTo(o + a * n, s + n * 0.7);
        e.stroke();
        break;
      case "identity-provider":
        e.arc(o - n * 0.45, s - n * 0.45, n * 0.45, 0, Math.PI * 2), e.moveTo(o - n * 0.1, s - n * 0.1), e.lineTo(o + n * 0.9, s + n * 0.9), e.moveTo(o + n * 0.45, s + n * 0.45), e.lineTo(o + n * 0.85, s + n * 0.05), e.stroke();
        break;
      case "actor":
        e.arc(o, s - n * 0.5, n * 0.42, 0, Math.PI * 2), e.moveTo(o - n * 0.8, s + n), e.quadraticCurveTo(o, s - n * 0.1, o + n * 0.8, s + n), e.stroke();
        break;
      case "ai-agent":
        for (let a = 0; a < 4; a++) {
          const r = a * Math.PI / 2 + Math.PI / 4;
          e.moveTo(o, s), e.lineTo(o + Math.cos(r) * n, s + Math.sin(r) * n), e.moveTo(o, s), e.lineTo(o + Math.cos(r + Math.PI / 4) * n * 0.5, s + Math.sin(r + Math.PI / 4) * n * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(o - n * 0.45, s + n * 0.15, n * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(o + n * 0.1, s - n * 0.35, n * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(o + n * 0.55, s + n * 0.2, n * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [a, r] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(o + a * n, s + r * n, n * 0.85, n * 0.85);
        e.stroke();
        break;
      case "page":
        e.rect(o - n, s - n * 0.8, n * 2, n * 1.6), e.moveTo(o - n, s - n * 0.35), e.lineTo(o + n, s - n * 0.35), e.stroke(), e.beginPath(), e.arc(o - n * 0.7, s - n * 0.57, n * 0.09, 0, Math.PI * 2), e.fill();
        break;
      case "api":
        e.moveTo(o - n * 0.25, s - n), e.lineTo(o - n, s), e.lineTo(o - n * 0.25, s + n), e.moveTo(o + n * 0.25, s - n), e.lineTo(o + n, s), e.lineTo(o + n * 0.25, s + n), e.stroke();
        break;
      case "api-operation":
        e.moveTo(o - n, s), e.lineTo(o + n * 0.7, s), e.moveTo(o + n * 0.1, s - n * 0.5), e.lineTo(o + n * 0.8, s), e.lineTo(o + n * 0.1, s + n * 0.5), e.stroke();
        break;
      case "mcp-server":
        e.arc(o, s + n * 0.25, n * 0.6, 0, Math.PI), e.closePath(), e.moveTo(o - n * 0.35, s + n * 0.25), e.lineTo(o - n * 0.35, s - n * 0.7), e.moveTo(o + n * 0.35, s + n * 0.25), e.lineTo(o + n * 0.35, s - n * 0.7), e.stroke();
        break;
      default:
        e.arc(o, s, n * 0.3, 0, Math.PI * 2), e.fill();
    }
    e.restore();
  }
  /** Hover card: what the node is, what it holds, how to enter. Screen space, clamped to the canvas. */
  drawCard(e, t, i, n) {
    var N, V;
    const o = (t.children ?? []).flatMap(
      (G) => G.kind === "group" ? G.children ?? (G.children = this.childrenOf(G)) : [G]
    ), s = /* @__PURE__ */ new Map();
    for (const G of o) s.set(G.kind, (s.get(G.kind) ?? 0) + 1);
    const a = [];
    for (const [G, se] of s)
      if (a.push(`${se} ${se === 1 ? (Xi[G] ?? G).toLowerCase() : hp[G] ?? G}`), a.length === 4) {
        const C = [...s.keys()].length - 4;
        C > 0 && (a[3] += ` (+${C} tipos más)`);
        break;
      }
    const r = o.slice(0, 6).map((G) => ({ label: G.label.length > 30 ? G.label.slice(0, 29) + "…" : G.label, color: G.color })), l = o.length - r.length, u = t.label, h = Xi[t.kind] ?? t.kind, m = ((N = t.children) != null && N.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((V = t.children) != null && V.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const f = e.measureText(u).width;
    e.font = "11px system-ui, sans-serif";
    const g = Math.max(
      e.measureText(h).width,
      ...a.map((G) => e.measureText(G).width),
      ...r.map((G) => e.measureText(G.label).width + 12),
      e.measureText(m).width
    ), v = Math.min(300, Math.max(f, g) + 24), b = r.length ? 8 + r.length * 15 + (l > 0 ? 15 : 0) : 0, d = 40 + a.length * 15 + b + (m ? 18 : 0), c = this.radiusOf(t) * this.cam.k, y = this.cam.x + t.x * this.cam.k, _ = this.cam.y + t.y * this.cam.k;
    let A = y + c + 14;
    A + v > i - 8 && (A = y - c - 14 - v), A = Math.max(8, Math.min(A, i - v - 8));
    const S = Math.max(8, Math.min(_ - 10, n - d - 8));
    e.translate(A, S), e.fillStyle = this.pal("--modux-surface", "rgba(255,255,255,0.96)"), e.strokeStyle = this.pal("--modux-border-strong", "#cbd5e1"), e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, v, d, 8), e.fill(), e.stroke(), e.fillStyle = this.pal("--modux-text", "#0f172a"), e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(u, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(h, 12, 25), e.fillStyle = this.pal("--modux-text-dim", "#475569"), a.forEach((G, se) => e.fillText(G, 12, 41 + se * 15));
    let E = 41 + a.length * 15 + (r.length ? 8 : 0);
    r.forEach((G) => {
      e.fillStyle = G.color, e.beginPath(), e.arc(15, E + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = this.pal("--modux-text", "#334155"), e.fillText(G.label, 24, E), E += 15;
    }), l > 0 && (e.fillStyle = this.pal("--modux-text-faint", "#94a3b8"), e.fillText(`… y ${l} más`, 24, E)), m && (e.fillStyle = this.pal("--modux-text-faint", "#94a3b8"), e.fillText(m, 12, d - 16)), e.restore();
  }
  // ── Search & fly ──────────────────────────────────────────────────────
  static fold(e) {
    return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  onSearchInput(e) {
    this._q = e.target.value;
    const t = ve.fold(this._q.trim());
    this._active = 0, this._sugs = t.length < 2 ? [] : this.allNodes.filter((i) => i.kind !== "root" && ve.fold(i.label).includes(t)).slice(0, 8);
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
    const e = this.flight.node, t = this.clientWidth || 800, i = this.clientHeight || 600, n = Math.max(0.9, Math.min(1.2, this.cam.k));
    this.cam.k += (n - this.cam.k) * 0.08, this.cam.x += (t / 2 - e.x * this.cam.k - this.cam.x) * 0.12, this.cam.y += (i / 2 - e.y * this.cam.k - this.cam.y) * 0.12;
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
    const i = this.sceneFromClient(e, t), n = this.nodeAt(i.x, i.y);
    return n && n.kind !== "root" && n.kind !== "group" && n.refId ? n.refId : null;
  }
  /** The refId chain from the element up to the root (grouping nodes skipped). */
  chainOf(e) {
    const t = this.allNodes.find((n) => n.refId === e), i = [];
    for (let n = t; n; n = n.parent)
      n.refId && n.kind !== "group" && n.kind !== "root" && i.push(n.refId);
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
    for (let n = i.length - 1; n >= 0; n--) {
      const o = i[n], s = this.radiusOf(o) + 4 / this.cam.k;
      if ((e - o.x) ** 2 + (t - o.y) ** 2 <= s * s) return o;
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
    i ? this.dragNode = i : this._space ? this.panning = !0 : this.rubber = { ax: t.x, ay: t.y, bx: t.x, by: t.y, additive: e.shiftKey }, this.focus();
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
    if (this.rubber && e.buttons & 1) {
      const n = this.toWorld(e);
      this.rubber.bx = n.x, this.rubber.by = n.y;
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
      const i = this.toWorld(e), n = this.nodeAt(i.x, i.y), o = this.linking.source;
      this.linking = void 0, n && n !== o && n.kind !== "root" && o.refId && n.refId && this.dispatchEvent(
        new CustomEvent("explorer-connect", {
          // client coords travel along: pickers (fixed-position) open at the drop point
          detail: { sourceId: o.refId, targetId: n.refId, x: e.clientX, y: e.clientY },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (this.rubber) {
      const i = this.rubber;
      if (this.rubber = void 0, this.moved) {
        const n = Math.min(i.ax, i.bx), o = Math.max(i.ax, i.bx), s = Math.min(i.ay, i.by), a = Math.max(i.ay, i.by), r = this.visible().filter((l) => l.kind !== "root" && l.kind !== "group" && l.refId).filter((l) => l.x >= n && l.x <= o && l.y >= s && l.y <= a).map((l) => l.key);
        this.selected = new Set(i.additive ? [...this.selected, ...r] : r);
      } else
        this.selected = /* @__PURE__ */ new Set(), this.focusKeys = void 0;
      return;
    }
    const t = this.dragNode;
    if (this.dragNode = void 0, this.panning = !1, t && !this.moved)
      if (e.altKey) this.focusOn(t);
      else {
        this.selected = new Set(t.kind !== "root" && t.refId ? [t.key] : []);
        const i = performance.now(), n = this.lastClickKey === t.key && i - this.lastClickAt < 350;
        this.lastClickKey = t.key, this.lastClickAt = i, window.clearTimeout(this.clickTimer), n || (this.clickTimer = window.setTimeout(() => this.toggle(t), 240));
      }
    else !t && !this.moved && this.focusKeys && (this.focusKeys = void 0);
  }
  /** Click: the node explodes — children burst out from it and the springs settle. */
  toggle(e) {
    var t;
    if ((t = e.children) != null && t.length && (e.expanded = !e.expanded, e.expanded)) {
      const i = e.parent ? Math.atan2(e.y - e.parent.y, e.x - e.parent.x) : Math.random() * Math.PI * 2, n = e.parent ? Math.PI * 1.25 : Math.PI * 2, o = e.children;
      o.forEach((s, a) => {
        this.materialize(s.parent);
        const r = i - n / 2 + n * (a + 0.5) / o.length;
        s.x = e.x + Math.cos(r) * 6, s.y = e.y + Math.sin(r) * 6, s.vx = Math.cos(r) * 7, s.vy = Math.sin(r) * 7, s.children || (s.children = this.childrenOf(s));
      }), e.vx -= Math.cos(i) * 2, e.vy -= Math.sin(i) * 2;
    }
  }
  onDblClick(e) {
    window.clearTimeout(this.clickTimer);
    const t = this.getBoundingClientRect(), i = (e.clientX - t.left - this.cam.x) / this.cam.k, n = (e.clientY - t.top - this.cam.y) / this.cam.k, o = this.nodeAt(i, n);
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
    const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, o = Math.exp(-e.deltaY * 12e-4), s = Math.min(2.5, Math.max(0.25, this.cam.k * o)), a = s / this.cam.k;
    this.cam.x = i - (i - this.cam.x) * a, this.cam.y = n - (n - this.cam.y) * a, this.cam.k = s;
  }
  render() {
    return I`
      <canvas
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @dblclick=${this.onDblClick}
        @wheel=${this.onWheel}
      ></canvas>
      ${this.renaming ? I`<input
            class="rename"
            .value=${this.renaming.value}
            @pointerdown=${(e) => e.stopPropagation()}
            @input=${(e) => this.renaming = { ...this.renaming, value: e.target.value }}
            @keydown=${(e) => {
      if (e.stopPropagation(), e.key === "Escape" && (this.renaming = null), e.key === "Enter") {
        const t = this.visible().find((n) => n.key === this.renaming.key), i = this.renaming.value.trim();
        this.renaming = null, t && i && i !== t.label && (t.label = i, this.emitUp("node-renamed", { id: t.refId, kind: t.kind, name: i }));
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
        ${this._sugs.length ? I`<ul class="sugs">
              ${this._sugs.map(
      (e, t) => I`<li
                  class=${t === this._active ? "active" : ""}
                  @mouseenter=${() => this._active = t}
                  @click=${() => this.flyToNode(e)}
                >
                  <span class="dot" style="background:${e.color}"></span>
                  <span class="name">${e.label}</span>
                  <span class="path">${this.pathOf(e) || (Xi[e.kind] ?? e.kind)}</span>
                </li>`
    )}
            </ul>` : this._q.trim().length >= 2 ? I`<ul class="sugs"><li class="empty">sin resultados</li></ul>` : null}
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
        ${this._viewNaming ? I`
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
            ` : I`<button
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
ve.styles = nt`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background:
        radial-gradient(ellipse at center, var(--modux-surface, #ffffff) 0%, var(--modux-surface-2, #f1f5f9) 100%);
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
      border: 1.5px solid var(--modux-primary, #2563eb);
      background: var(--modux-surface, #ffffff);
      color: var(--modux-text, #0f172a);
      outline: none;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.18);
    }
    .hud {
      position: absolute;
      right: 12px;
      bottom: 10px;
      font: 11px/1.5 system-ui, sans-serif;
      color: var(--modux-text-faint, #94a3b8);
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
      color: var(--modux-text-dim, #64748b);
      background: var(--modux-surface, rgba(255, 255, 255, 0.92));
      border: 1px solid var(--modux-border, #e2e8f0);
      border-radius: 8px;
      padding: 6px 10px;
    }
    .controls input[type='range'] {
      width: 90px;
      accent-color: var(--modux-primary, #6366f1);
    }
    .controls button {
      border: 1px solid var(--modux-border-strong, #cbd5e1);
      background: var(--modux-surface, #ffffff);
      border-radius: 6px;
      padding: 2px 8px;
      font: 11px system-ui, sans-serif;
      color: var(--modux-text-dim, #475569);
      cursor: pointer;
    }
    .controls button:hover {
      background: var(--modux-surface-2, #f1f5f9);
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
      border: 1px solid var(--modux-border-strong, #cbd5e1);
      border-radius: 8px;
      background: var(--modux-input-bg, rgba(255, 255, 255, 0.95));
      font: inherit;
      color: var(--modux-text, #0f172a);
      outline: none;
    }
    .search input:focus {
      border-color: var(--modux-primary, #0284c7);
      box-shadow: 0 0 0 2px #0284c722;
    }
    .sugs {
      margin: 4px 0 0;
      padding: 4px;
      list-style: none;
      background: var(--modux-surface, rgba(255, 255, 255, 0.98));
      border: 1px solid var(--modux-border-strong, #cbd5e1);
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
      background: var(--modux-surface-2, #f1f5f9);
    }
    .sugs .dot {
      flex: none;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      align-self: center;
    }
    .sugs .name {
      color: var(--modux-text, #0f172a);
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sugs .path {
      color: var(--modux-text-faint, #94a3b8);
      font-size: 10.5px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sugs .empty {
      color: var(--modux-text-faint, #94a3b8);
      cursor: default;
    }
  `;
ve.STORE_KEY = "modux-explorer-state";
Re([
  de({ type: Boolean, reflect: !0 })
], ve.prototype, "shifted", 2);
Re([
  de({ attribute: !1 })
], ve.prototype, "scene", 2);
Re([
  de({ attribute: !1 })
], ve.prototype, "model", 2);
Re([
  U()
], ve.prototype, "_q", 2);
Re([
  U()
], ve.prototype, "_sugs", 2);
Re([
  U()
], ve.prototype, "_active", 2);
Re([
  U()
], ve.prototype, "_motion", 2);
Re([
  U()
], ve.prototype, "_threads", 2);
Re([
  U()
], ve.prototype, "_viewNaming", 2);
Re([
  U()
], ve.prototype, "_viewName", 2);
Re([
  U()
], ve.prototype, "selected", 2);
Re([
  U()
], ve.prototype, "_levels", 2);
Re([
  de()
], ve.prototype, "sceneKey", 2);
Re([
  U()
], ve.prototype, "renaming", 2);
ve = Re([
  mt("modux-explorer")
], ve);
const ce = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function ii(e) {
  const t = e.participants ?? [], i = new Set(t.map((o) => o.ref)), n = [];
  for (const o of e.messages)
    for (const s of [o.fromRef, o.toRef])
      i.has(s) || (i.add(s), n.push({ ref: s, name: s, type: "UNKNOWN" }));
  return [...t, ...n];
}
function pa(e) {
  const t = [];
  return e.map((i) => {
    const n = Math.max(0, i.depth ?? 0);
    for (let o = 0; o < n; o++) t[o] = t[o] || 1;
    return t[n] = (t[n] || 0) + 1, t.length = n + 1, t.join(".");
  });
}
function ua(e) {
  const t = /* @__PURE__ */ new Map();
  for (const i of e.actors ?? []) t.set(i.id, "ACTOR");
  for (const i of e.uiApps ?? []) t.set(i.id, "APP");
  for (const i of e.pages ?? []) t.set(i.id, "PAGE");
  for (const i of e.boundedContexts) {
    for (const n of i.useCases ?? []) t.set(n.id, "USE_CASE");
    for (const n of i.readModels ?? []) t.set(n.id, "READ_MODEL");
    for (const n of i.domainServices ?? []) t.set(n.id, "DOMAIN_SERVICE");
    for (const n of i.queryServices ?? []) t.set(n.id, "QUERY_SERVICE");
  }
  for (const i of e.aggregates ?? []) t.set(i.id, "AGGREGATE");
  for (const i of e.externalSystems) {
    t.set(i.id, "EXTERNAL_SYSTEM");
    for (const n of i.useCases ?? []) t.set(n.id, "EXTERNAL_SYSTEM");
  }
  for (const i of e.apis ?? []) {
    t.set(i.id, "API");
    for (const n of i.operations) t.set(n.id, "API_OPERATION");
  }
  for (const i of e.aiAgents ?? []) t.set(i.id, "AI_AGENT");
  for (const i of e.processes ?? []) t.set(i.id, "PROCESS");
  for (const i of e.workflows ?? []) t.set(i.id, "WORKFLOW");
  return t;
}
function ma(e) {
  const t = /* @__PURE__ */ new Map(), i = (n, o) => t.set(n, o);
  for (const n of e.actors ?? []) i(n.id, n.name);
  for (const n of e.uiApps ?? []) i(n.id, n.name);
  for (const n of e.pages ?? []) i(n.id, n.name);
  for (const n of e.boundedContexts) {
    for (const o of n.useCases ?? []) i(o.id, o.name);
    for (const o of n.readModels ?? []) i(o.id, o.name);
    for (const o of n.domainServices ?? []) i(o.id, o.name);
    for (const o of n.queryServices ?? []) i(o.id, o.name);
    for (const o of n.domainEvents ?? []) i(o.id, o.name);
    for (const o of n.applicationEvents ?? []) i(o.id, o.name);
  }
  for (const n of e.aggregates ?? []) i(n.id, n.name);
  for (const n of e.externalSystems) {
    i(n.id, n.name);
    for (const o of n.useCases ?? []) i(o.id, `${n.name} · ${o.name}`);
  }
  for (const n of e.apis ?? []) {
    i(n.id, n.name);
    for (const o of n.operations) i(o.id, `${n.name} · ${o.name}`);
  }
  for (const n of e.aiAgents ?? []) i(n.id, n.name);
  for (const n of e.processes ?? []) i(n.id, n.name);
  for (const n of e.workflows ?? []) i(n.id, n.name);
  return t;
}
function fa(e, t) {
  for (const i of e.boundedContexts) {
    const n = (i.domainEvents ?? []).find((o) => o.name === t) ?? (i.applicationEvents ?? []).find((o) => o.name === t);
    if (n) return n.id;
  }
  return null;
}
function vp(e, t) {
  const i = e.boundedContexts.find(
    (n) => (n.useCases ?? []).some((o) => o.id === t) || (n.queryServices ?? []).some((o) => o.id === t) || (n.readModels ?? []).some((o) => o.id === t)
  );
  return (i == null ? void 0 : i.id) ?? null;
}
function xp(e, t, i) {
  const n = ua(e), o = e.flows.find(
    (r) => r.archetype === "TRIGGERS" && r.triggerEvent && r.targetUseCaseId === i.ref && r.triggerAggregateId === t.ref
  );
  if (o) return { kind: "EVENT", label: o.triggerEvent };
  const s = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ].filter((r) => r.sourceId === t.ref);
  for (const r of s) {
    const l = ma(e).get(r.domainEventId);
    if (!l) continue;
    if (e.flows.find(
      (m) => m.archetype === "TRIGGERS" && m.triggerEvent === l && m.targetUseCaseId === i.ref
    )) return { kind: "EVENT", label: l };
    if ((e.subscriptions ?? []).find(
      (m) => m.eventName === l && (m.actions ?? []).some((f) => f.type === "CallUseCase" && f.useCaseId === i.ref)
    )) return { kind: "EVENT", label: l };
  }
  const a = i.type !== "UNKNOWN" ? i.type : n.get(i.ref) ?? "UNKNOWN";
  return a === "QUERY_SERVICE" || a === "READ_MODEL" ? { kind: "QUERY" } : a === "EXTERNAL_SYSTEM" ? { kind: "EXTERNAL" } : { kind: "COMMAND" };
}
function dn(e, t) {
  const i = ua(e), n = ma(e), o = new Map((t.participants ?? []).map((s) => [s.ref, s]));
  return {
    typeOf: (s) => {
      var a, r;
      return (a = o.get(s)) != null && a.type && o.get(s).type !== "UNKNOWN" ? o.get(s).type : i.get(s) ?? ((r = o.get(s)) == null ? void 0 : r.type) ?? "UNKNOWN";
    },
    nameOf: (s) => {
      var a;
      return ((a = o.get(s)) == null ? void 0 : a.name) ?? n.get(s) ?? s;
    }
  };
}
function Ip(e, t, i) {
  const n = Math.max(0, Math.min(e.length, i)), o = [...e];
  return o.splice(n, 0, t), o;
}
function wp(e, t, i) {
  const n = e.findIndex((a) => a.id === t);
  if (n < 0) return e;
  const o = e.filter((a) => a.id !== t), s = Math.max(0, Math.min(o.length, i));
  return o.splice(s, 0, e[n]), o;
}
function kp(e, t) {
  return e.filter((i) => i.id !== t);
}
function $p(e, t) {
  return {
    ...e,
    participants: (e.participants ?? []).filter((i) => i.ref !== t),
    messages: e.messages.filter((i) => i.fromRef !== t && i.toRef !== t)
  };
}
function yo(e, t, i) {
  var r;
  const n = t.fromRef, o = t.toRef, s = i(n), a = i(o);
  switch (t.kind) {
    case "COMMAND": {
      if (s === "USE_CASE" && a === "USE_CASE")
        return (e.useCaseCalls ?? []).some((l) => l.sourceId === n && l.targetId === o);
      if (s === "USE_CASE" && a === "AGGREGATE")
        return (e.aggregateCalls ?? []).some((l) => l.sourceId === n && l.targetId === o);
      if (s === "ACTOR" && (a === "USE_CASE" || a === "QUERY_SERVICE"))
        return (e.actorUses ?? []).some((l) => l.actorId === n && l.targetId === o);
      if (s === "API_OPERATION" && a === "USE_CASE")
        return (e.apis ?? []).some(
          (l) => l.operations.some((u) => u.id === n && u.targetUseCaseId === o)
        );
      if (s === "EXTERNAL_SYSTEM" && a === "USE_CASE")
        return (e.externalCalls ?? []).some(
          (l) => l.externalSystemId === n && l.useCaseId === o
        );
      if ((s === "PAGE" || s === "APP") && a === "USE_CASE") {
        const l = (e.pages ?? []).find((m) => m.id === n);
        if (l && (l.buttons ?? []).some((m) => m.useCaseId === o)) return !0;
        const u = (e.uiApps ?? []).find((m) => m.id === n), h = (m) => (m ?? []).some(
          (f) => f.useCaseId === o || h(f.children)
        );
        return !!u && h(u.menuItems);
      }
      return s === "AI_AGENT" && a === "USE_CASE" ? (e.agentUses ?? []).some((l) => l.agentId === n && l.useCaseId === o) : !1;
    }
    case "QUERY":
      return s === "USE_CASE" && a === "QUERY_SERVICE" ? (e.queryCalls ?? []).some((l) => l.sourceId === n && l.targetId === o) : s === "ACTOR" && a === "QUERY_SERVICE" ? (e.actorUses ?? []).some((l) => l.actorId === n && l.targetId === o) : s === "AI_AGENT" && a === "QUERY_SERVICE" ? (e.agentQueryUses ?? []).some(
        (l) => l.agentId === n && l.queryServiceId === o
      ) : s === "PAGE" && a === "QUERY_SERVICE" ? (e.pages ?? []).some((l) => l.id === n && l.listingQueryServiceId === o) : a === "READ_MODEL" ? (e.projections ?? []).some((l) => l.readModelId === o) : !1;
    case "EVENT": {
      const l = t.label ?? "", u = fa(e, l), h = !!u && [...e.emissions ?? [], ...e.useCaseEmissions ?? []].some(
        (f) => f.sourceId === n && f.domainEventId === u
      ) || // an aggregate-operation emission keyed by NAME (flows reference names, not ids)
      e.flows.some(
        (f) => f.archetype === "TRIGGERS" && f.triggerEvent === l && f.triggerAggregateId === n
      ), m = e.flows.some(
        (f) => f.archetype === "TRIGGERS" && f.triggerEvent === l && f.targetUseCaseId === o
      ) || (e.subscriptions ?? []).some(
        (f) => f.eventName === l && (f.actions ?? []).some((g) => g.type === "CallUseCase" && g.useCaseId === o)
      );
      return h && m;
    }
    case "EXTERNAL": {
      if (s === "USE_CASE" && a === "EXTERNAL_SYSTEM") {
        if ((e.externalUseCaseCalls ?? []).some(
          (h) => h.sourceId === n && h.targetId === o
        )) return !0;
        const u = e.externalSystems.find((h) => h.id === o);
        return !!((r = u == null ? void 0 : u.useCases) != null && r.some(
          (h) => (e.externalUseCaseCalls ?? []).some(
            (m) => m.sourceId === n && m.targetId === h.id
          )
        ));
      }
      return !1;
    }
  }
}
function _p(e, t, i, n) {
  const o = t.fromRef, s = t.toRef, a = i(o), r = i(s), l = (u) => ({
    commands: [],
    hint: `Este enlace se cablea a mano: ${u}`
  });
  switch (t.kind) {
    case "COMMAND": {
      if (a === "USE_CASE" && r === "USE_CASE")
        return { commands: [{ kind: "add-use-case-call", sourceId: o, targetId: s }] };
      if (a === "USE_CASE" && r === "AGGREGATE")
        return { commands: [{ kind: "add-aggregate-call", sourceId: o, targetId: s }] };
      if (a === "ACTOR" && (r === "USE_CASE" || r === "QUERY_SERVICE"))
        return { commands: [{ kind: "add-actor-use", sourceId: o, targetId: s }] };
      if (a === "API_OPERATION" && r === "USE_CASE") {
        const u = (e.apis ?? []).find((h) => h.operations.some((m) => m.id === o));
        return u ? {
          commands: [
            { kind: "set-api-operation-target", apiId: u.id, id: o, targetUseCaseId: s }
          ]
        } : l("la operación no cuelga de ninguna API del catálogo");
      }
      return l(a === "PAGE" || a === "APP" ? "un botón (o entrada de menú) apuntando al caso de uso, en la ficha de la página/app" : `conecta ${n(o)} → ${n(s)} en el mapa del sistema`);
    }
    case "QUERY":
      return a === "USE_CASE" && r === "QUERY_SERVICE" ? { commands: [{ kind: "add-query-call", sourceId: o, targetId: s }] } : a === "ACTOR" && r === "QUERY_SERVICE" ? { commands: [{ kind: "add-actor-use", sourceId: o, targetId: s }] } : l(a === "PAGE" ? "el listing de la página apuntando al query service, en la ficha de la página" : `conecta ${n(o)} → ${n(s)} en el mapa del sistema`);
    case "EXTERNAL":
      return a === "USE_CASE" && r === "EXTERNAL_SYSTEM" ? { commands: [{ kind: "add-external-uc-call", sourceId: o, targetId: s }] } : l(`conecta ${n(o)} → ${n(s)} en el mapa del sistema`);
    case "EVENT": {
      const u = t.label ?? "";
      if (r !== "USE_CASE")
        return l("el destino de un evento debe ser un caso de uso (la suscripción reacciona)");
      const h = fa(e, u);
      if (!h)
        return l(`el evento «${u}» no existe en el catálogo — créalo primero en su contexto`);
      const m = [];
      if ([...e.emissions ?? [], ...e.useCaseEmissions ?? []].some(
        (v) => v.sourceId === o && v.domainEventId === h
      ) || m.push({ kind: "add-emission", sourceId: o, targetId: h }), !e.flows.some(
        (v) => v.archetype === "TRIGGERS" && v.triggerEvent === u && v.targetUseCaseId === s
      )) {
        const v = vp(e, s) ?? "";
        m.push({
          kind: "add-flow",
          id: `flow-${ce(u)}-${ce(n(s))}`,
          name: n(s),
          archetype: "TRIGGERS",
          triggerAggregateId: a === "AGGREGATE" ? o : "",
          triggerDomainServiceId: a === "DOMAIN_SERVICE" ? o : void 0,
          triggerUseCaseId: a === "USE_CASE" ? o : void 0,
          triggerEvent: u,
          targetId: v,
          targetUseCaseId: s
        });
      }
      return m.length ? { commands: m } : l("el evento ya está emitido y suscrito — falta asociarlo a este mensaje");
    }
  }
}
function xt(e) {
  return {
    kind: "save-interaction",
    id: e.id ?? "",
    name: e.name,
    description: e.description,
    triggerKind: e.triggerKind ?? null,
    triggerRef: e.triggerRef ?? null,
    messages: (e.messages ?? []).map((t) => ({
      id: t.id,
      fromRef: t.fromRef,
      toRef: t.toRef,
      kind: t.kind,
      label: t.label,
      guard: t.guard
    }))
  };
}
function Cp(e) {
  const t = ii(e), i = new Map(t.map((a, r) => [a.ref, `p${r + 1}`])), n = (a, r = !1) => {
    const l = a.replace(/[\r\n;]+/g, " ").trim();
    return r ? l.replace(/:/g, " -") : l;
  }, o = ["sequenceDiagram"];
  for (const a of t)
    o.push(`  participant ${i.get(a.ref)} as ${n(a.name, !0)}`);
  const s = pa(e.messages);
  return e.messages.forEach((a, r) => {
    const l = i.get(a.fromRef), u = i.get(a.toRef);
    if (!l || !u) return;
    const h = a.kind === "EVENT" ? "-->>" : "->>", m = [s[r], a.label ?? "", a.guard ? `[${a.guard}]` : ""].filter(Boolean).join(" ");
    o.push(`  ${l}${h}${u}: ${n(m)}`);
  }), o.join(`
`);
}
function bo(e) {
  const t = [], i = (n, o, s, a, r) => t.push({ ref: n, name: o, label: r ? `${o} (${r})` : o, type: s, group: a });
  for (const n of e.actors ?? []) i(n.id, n.name, "ACTOR", "Actores");
  for (const n of e.uiApps ?? []) i(n.id, n.name, "APP", "Apps");
  for (const n of e.pages ?? []) i(n.id, n.name, "PAGE", "Páginas");
  for (const n of e.boundedContexts) {
    for (const o of n.useCases ?? []) i(o.id, o.name, "USE_CASE", "Casos de uso", n.name);
    for (const o of (e.aggregates ?? []).filter((s) => s.boundedContextId === n.id))
      i(o.id, o.name, "AGGREGATE", "Agregados", n.name);
    for (const o of n.domainServices ?? [])
      i(o.id, o.name, "DOMAIN_SERVICE", "Servicios de dominio", n.name);
    for (const o of n.queryServices ?? [])
      i(o.id, o.name, "QUERY_SERVICE", "Query services", n.name);
    for (const o of n.readModels ?? [])
      i(o.id, o.name, "READ_MODEL", "Read models", n.name);
  }
  for (const n of e.externalSystems) i(n.id, n.name, "EXTERNAL_SYSTEM", "Sistemas externos");
  for (const n of e.apis ?? []) {
    i(n.id, n.name, "API", "APIs");
    for (const o of n.operations)
      i(o.id, `${n.name} · ${o.name}`, "API_OPERATION", "Operaciones API");
  }
  for (const n of e.aiAgents ?? []) i(n.id, n.name, "AI_AGENT", "Agentes");
  for (const n of e.processes ?? []) i(n.id, n.name, "PROCESS", "Procesos");
  for (const n of e.workflows ?? []) i(n.id, n.name, "WORKFLOW", "Workflows");
  return t;
}
function Ep(e) {
  const t = [];
  for (const i of e.boundedContexts) {
    for (const n of i.useCases ?? [])
      t.push({ kind: "USE_CASE", ref: n.id, label: `${n.name} (${i.name})` });
    for (const n of [...i.domainEvents ?? [], ...i.applicationEvents ?? []])
      t.push({ kind: "EVENT", ref: n.name, label: `${n.name} (${i.name})` });
  }
  for (const i of e.apis ?? [])
    for (const n of i.operations)
      t.push({
        kind: "API_OPERATION",
        ref: n.id,
        label: `${n.httpMethod ? `${n.httpMethod} ` : ""}${n.name} (${i.name})`
      });
  return t;
}
function Sp(e, t) {
  var i, n, o, s, a, r, l, u, h, m, f, g, v, b;
  switch (t.kind) {
    case "invert-archimate-relation":
      return [{ kind: "invert-archimate-relation", id: t.id }];
    case "add-relation":
      return [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-relation": {
      const d = e.model.relations.find(
        (c) => c.sourceId === t.sourceId && c.targetId === t.targetId
      );
      return d && d.type ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: d.type }] : null;
    }
    case "set-relation-type": {
      const d = e.model.relations.find(
        (c) => c.sourceId === t.sourceId && c.targetId === t.targetId
      );
      return d && d.type ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: d.type }] : [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
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
      const d = (e.model.uiApps ?? []).find((c) => c.id === t.appId);
      return [{ kind: "set-app-header-page", appId: t.appId, pageId: (d == null ? void 0 : d.headerPageId) ?? null }];
    }
    case "set-app-model": {
      const d = (e.model.uiApps ?? []).find((c) => c.id === t.appId);
      return [{ kind: "set-app-model", appId: t.appId, modelId: (d == null ? void 0 : d.modelId) ?? null }];
    }
    case "add-model":
      return [{ kind: "remove-model", id: t.id }];
    case "add-model-mapping":
      return [{ kind: "remove-model-mapping", id: t.id }];
    case "remove-model-mapping": {
      const d = (e.model.modelMappings ?? []).find((c) => c.id === t.id);
      return !(d != null && d.sourceModelId) || !d.targetModelId ? null : [{
        kind: "add-model-mapping",
        id: d.id,
        name: d.name,
        sourceId: d.sourceModelId,
        targetId: d.targetModelId
      }];
    }
    case "remove-model": {
      const d = (e.model.models ?? []).find((y) => y.id === t.id);
      if (!d) return null;
      const c = [{ kind: "add-model", id: d.id, name: d.name }];
      for (const y of e.model.pages ?? []) {
        y.modelId === t.id && c.push({ kind: "set-page-model", pageId: y.id, modelId: t.id });
        const _ = (A) => {
          for (const S of A ?? [])
            S.modelId === t.id && c.push({ kind: "set-page-component", pageId: y.id, componentId: S.id, modelId: t.id }), _(S.children);
        };
        _(y.content);
      }
      for (const y of e.model.uiApps ?? [])
        y.modelId === t.id && c.push({ kind: "set-app-model", appId: y.id, modelId: t.id });
      return c;
    }
    case "set-crud-detail":
    case "set-crud-create": {
      const d = (e.model.pages ?? []).find((y) => y.id === t.pageId), c = t.kind === "set-crud-detail";
      return [{
        kind: t.kind,
        pageId: t.pageId,
        targetId: (c ? d == null ? void 0 : d.crudDetailPageId : d == null ? void 0 : d.crudCreatePageId) ?? null,
        toAppId: (c ? d == null ? void 0 : d.crudDetailAppId : d == null ? void 0 : d.crudCreateAppId) ?? null
      }];
    }
    case "set-app-view-page": {
      const d = (e.model.uiApps ?? []).find((c) => c.id === t.appId);
      return [{ kind: "set-app-view-page", appId: t.appId, pageId: (d == null ? void 0 : d.viewPageId) ?? null }];
    }
    case "set-app-edit-page": {
      const d = (e.model.uiApps ?? []).find((c) => c.id === t.appId);
      return [{ kind: "set-app-edit-page", appId: t.appId, pageId: (d == null ? void 0 : d.editPageId) ?? null }];
    }
    case "set-app-home-page": {
      const d = (e.model.uiApps ?? []).find((c) => c.id === t.appId);
      return [{
        kind: "set-app-home-page",
        appId: t.appId,
        pageId: (d == null ? void 0 : d.homePageId) ?? null,
        toAppId: (d == null ? void 0 : d.homeAppId) ?? null
      }];
    }
    case "add-page-wizard-step":
      return [{ kind: "remove-page-wizard-step", pageId: t.pageId, targetId: t.itemId ?? t.targetId }];
    case "set-wizard-step-page": {
      const d = (((i = (e.model.pages ?? []).find((c) => c.id === t.pageId)) == null ? void 0 : i.wizardSteps) ?? []).find((c) => (c.id ?? c.pageId) === t.itemId);
      return d ? [{ kind: "set-wizard-step-page", pageId: t.pageId, itemId: t.itemId, targetId: d.pageId ?? null }] : null;
    }
    case "move-page-wizard-step": {
      const d = (((n = (e.model.pages ?? []).find((y) => y.id === t.pageId)) == null ? void 0 : n.wizardSteps) ?? []).map((y) => y.id ?? y.pageId), c = d.indexOf(t.targetId);
      return c < 0 ? null : [{
        kind: "move-page-wizard-step",
        pageId: t.pageId,
        targetId: t.targetId,
        beforeItemId: d[c + 1] ?? null
      }];
    }
    case "remove-page-wizard-step": {
      const d = (((o = (e.model.pages ?? []).find((c) => c.id === t.pageId)) == null ? void 0 : o.wizardSteps) ?? []).find((c) => (c.id ?? c.pageId) === t.targetId);
      return d ? [{
        kind: "add-page-wizard-step",
        pageId: t.pageId,
        targetId: d.pageId ?? null,
        label: d.label,
        itemId: d.id
      }] : null;
    }
    case "delete-ui-app": {
      const d = (e.model.uiApps ?? []).find((_) => _.id === t.id);
      if (!d) return null;
      const c = [{ kind: "create-ui-app", id: d.id, name: d.name, type: d.type }];
      d.headerPageId && c.push({ kind: "set-app-header-page", appId: d.id, pageId: d.headerPageId }), d.modelId && c.push({ kind: "set-app-model", appId: d.id, modelId: d.modelId }), d.viewPageId && c.push({ kind: "set-app-view-page", appId: d.id, pageId: d.viewPageId }), d.editPageId && c.push({ kind: "set-app-edit-page", appId: d.id, pageId: d.editPageId }), (d.homePageId || d.homeAppId) && c.push({
        kind: "set-app-home-page",
        appId: d.id,
        pageId: d.homePageId ?? null,
        toAppId: d.homeAppId ?? null
      });
      const y = (_, A) => {
        for (const S of _ ?? [])
          c.push({
            kind: "add-menu-item",
            appId: d.id,
            label: S.label,
            itemId: S.id,
            parentId: A == null ? void 0 : A.id,
            parentLabel: A && !A.id ? A.label : void 0,
            pageId: S.pageId ?? null
          }), S.uiAdapterId && c.push({ kind: "set-menu-app", appId: d.id, toAppId: S.uiAdapterId, itemId: S.id, label: S.label }), S.useCaseId && c.push({ kind: "set-menu-use-case", appId: d.id, useCaseId: S.useCaseId, itemId: S.id, label: S.label }), S.aggregateId && c.push({ kind: "set-menu-aggregate", appId: d.id, aggregateId: S.aggregateId, itemId: S.id, label: S.label }), S.queryOperationId && c.push({
            kind: "set-menu-query-operation",
            appId: d.id,
            queryServiceId: S.queryServiceId ?? null,
            queryOperationId: S.queryOperationId,
            itemId: S.id,
            label: S.label
          }), y(S.children, S);
      };
      y(d.menuItems);
      for (const _ of e.model.actorAppUses ?? [])
        _.appId === t.id && c.push({ kind: "add-actor-app", actorId: _.actorId, appId: t.id });
      return c;
    }
    case "delete-ui-page": {
      const d = (e.model.pages ?? []).find((y) => y.id === t.id);
      if (!d) return null;
      const c = [
        { kind: "create-ui-page", id: d.id, name: d.name, pageType: d.type ?? "FORM" }
      ];
      d.route && c.push({ kind: "set-page-route", pageId: d.id, path: d.route }), d.modelId && c.push({ kind: "set-page-model", pageId: d.id, modelId: d.modelId }), d.listingQueryServiceId && c.push({ kind: "set-page-listing", pageId: d.id, queryServiceId: d.listingQueryServiceId });
      for (const y of d.buttons ?? [])
        y.useCaseId && (c.push({ kind: "add-page-button", pageId: d.id, useCaseId: y.useCaseId, label: y.label }), y.mappingId && c.push({
          kind: "set-page-button",
          pageId: d.id,
          useCaseId: y.useCaseId,
          label: y.label ?? null,
          mappingId: y.mappingId
        }));
      for (const y of d.viewmodelFields ?? [])
        (y.stereotype || y.colspan || y.label) && c.push({
          kind: "set-page-field-config",
          pageId: d.id,
          fieldId: y.fieldId,
          stereotype: y.stereotype ?? null,
          colspan: y.colspan ?? null,
          label: y.label ?? null
        });
      (d.viewmodelFields ?? []).length && c.push({
        kind: "set-page-field-order",
        pageId: d.id,
        fieldIds: (d.viewmodelFields ?? []).map((y) => y.fieldId)
      });
      for (const y of d.content ?? [])
        c.push(...e.rebuildComponentOps(d.id, y, void 0, null).ops);
      for (const y of d.wizardSteps ?? [])
        c.push({
          kind: "add-page-wizard-step",
          pageId: d.id,
          targetId: y.pageId ?? null,
          label: y.label,
          itemId: y.id
        });
      return (d.crudDetailPageId || d.crudDetailAppId) && c.push({ kind: "set-crud-detail", pageId: d.id, targetId: d.crudDetailPageId ?? null, toAppId: d.crudDetailAppId ?? null }), (d.crudCreatePageId || d.crudCreateAppId) && c.push({ kind: "set-crud-create", pageId: d.id, targetId: d.crudCreatePageId ?? null, toAppId: d.crudCreateAppId ?? null }), c;
    }
    case "add-menu-item":
      return [{ kind: "remove-menu-item", appId: t.appId, itemId: t.itemId, label: t.label }];
    case "remove-menu-item":
    case "set-menu-page":
    case "set-menu-app":
    case "set-menu-use-case":
    case "set-menu-aggregate":
    case "set-menu-query-operation": {
      const d = (e.model.uiApps ?? []).find((_) => _.id === t.appId), c = (_) => {
        for (const A of _ ?? []) {
          if (t.itemId ? A.id === t.itemId : A.label === t.label) return A;
          const S = c(A.children);
          if (S) return S;
        }
        return null;
      }, y = t.itemId || t.label ? c(d == null ? void 0 : d.menuItems) : null;
      return y ? t.kind === "remove-menu-item" ? [{
        kind: "add-menu-item",
        appId: t.appId,
        label: y.label,
        pageId: y.pageId ?? null,
        itemId: y.id
      }] : t.kind === "set-menu-app" ? [{
        kind: "set-menu-app",
        appId: t.appId,
        toAppId: y.uiAdapterId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-use-case" ? [{
        kind: "set-menu-use-case",
        appId: t.appId,
        useCaseId: y.useCaseId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-aggregate" ? [{
        kind: "set-menu-aggregate",
        appId: t.appId,
        aggregateId: y.aggregateId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-query-operation" ? [{
        kind: "set-menu-query-operation",
        appId: t.appId,
        queryServiceId: y.queryServiceId ?? null,
        queryOperationId: y.queryOperationId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : [{
        kind: "set-menu-page",
        appId: t.appId,
        pageId: y.pageId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : null;
    }
    case "add-page-button":
      return [{ kind: "remove-page-button", pageId: t.pageId, useCaseId: t.useCaseId }];
    case "remove-page-button": {
      const d = (e.model.pages ?? []).find((y) => y.id === t.pageId), c = ((d == null ? void 0 : d.buttons) ?? []).find((y) => y.useCaseId === t.useCaseId);
      return c ? [{ kind: "add-page-button", pageId: t.pageId, useCaseId: t.useCaseId, label: c.label }] : null;
    }
    case "rename-ui-page": {
      const d = (e.model.pages ?? []).find((c) => c.id === t.pageId);
      return d ? [{ kind: "rename-ui-page", pageId: t.pageId, name: d.name }] : null;
    }
    case "set-page-type": {
      const d = (e.model.pages ?? []).find((c) => c.id === t.pageId);
      return d ? [{ kind: "set-page-type", pageId: t.pageId, pageType: d.type ?? "FORM" }] : null;
    }
    case "set-page-route": {
      const d = (e.model.pages ?? []).find((c) => c.id === t.pageId);
      return d != null && d.route ? [{ kind: "set-page-route", pageId: t.pageId, path: d.route }] : null;
    }
    case "set-page-button": {
      const d = (e.model.pages ?? []).find((y) => y.id === t.pageId), c = ((d == null ? void 0 : d.buttons) ?? []).find((y) => y.useCaseId === t.useCaseId);
      return c ? [{
        kind: "set-page-button",
        pageId: t.pageId,
        useCaseId: t.useCaseId,
        label: c.label ?? null,
        mappingId: c.mappingId ?? null
      }] : null;
    }
    case "add-page-component":
      return [{ kind: "remove-page-component", pageId: t.pageId, componentId: t.componentId }];
    case "set-page-component":
    case "remove-page-component":
    case "move-page-component": {
      const d = (e.model.pages ?? []).find((E) => E.id === t.pageId);
      let c = null, y = null, _ = null;
      const A = (E, N) => {
        var G;
        const V = E ?? [];
        for (let se = 0; se < V.length; se++)
          V[se].id === t.componentId && (c = V[se], y = N, _ = ((G = V[se + 1]) == null ? void 0 : G.id) ?? null), A(V[se].children, V[se]);
      };
      if (A(d == null ? void 0 : d.content, null), !c) return null;
      const S = c;
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
        parentComponentId: y === null ? null : y.id,
        beforeComponentId: _
      }] : e.rebuildComponentOps(
        t.pageId,
        S,
        y === null ? void 0 : y.id,
        _
      ).ops;
    }
    case "set-page-listing": {
      const d = (e.model.pages ?? []).find((c) => c.id === t.pageId);
      return [{ kind: "set-page-listing", pageId: t.pageId, queryServiceId: (d == null ? void 0 : d.listingQueryServiceId) ?? null }];
    }
    case "set-page-model": {
      const d = (e.model.pages ?? []).find((c) => c.id === t.pageId);
      return [{ kind: "set-page-model", pageId: t.pageId, modelId: (d == null ? void 0 : d.modelId) ?? null }];
    }
    case "set-page-field-config": {
      const d = (((s = (e.model.pages ?? []).find((c) => c.id === t.pageId)) == null ? void 0 : s.viewmodelFields) ?? []).find((c) => c.fieldId === t.fieldId);
      return [{
        kind: "set-page-field-config",
        pageId: t.pageId,
        fieldId: t.fieldId,
        stereotype: (d == null ? void 0 : d.stereotype) ?? null,
        colspan: (d == null ? void 0 : d.colspan) ?? null,
        label: (d == null ? void 0 : d.label) ?? null
      }];
    }
    case "set-page-field-order": {
      const d = (((a = (e.model.pages ?? []).find((c) => c.id === t.pageId)) == null ? void 0 : a.viewmodelFields) ?? []).map((c) => c.fieldId);
      return d.length ? [{ kind: "set-page-field-order", pageId: t.pageId, fieldIds: d }] : null;
    }
    case "move-menu-item": {
      const d = t.itemId ? e.menuEntryIn(t.appId, t.itemId) : null;
      return [{
        kind: "move-menu-item",
        appId: t.toAppId,
        toAppId: t.appId,
        itemId: t.itemId,
        label: t.label,
        parentId: (d == null ? void 0 : d.parentId) ?? void 0,
        beforeItemId: (d == null ? void 0 : d.beforeId) ?? void 0
      }];
    }
    case "add-actor-app":
      return [{ kind: "remove-actor-app", actorId: t.actorId, appId: t.appId }];
    case "remove-actor-app":
      return [{ kind: "add-actor-app", actorId: t.actorId, appId: t.appId }];
    case "add-boundedContext":
      return [{ kind: "remove-boundedContext", id: t.id }];
    case "remove-boundedContext": {
      const d = e.model.boundedContexts.find((y) => y.id === t.id);
      if (!d) return null;
      const c = e.model.relations.filter(
        (y) => (y.sourceId === t.id || y.targetId === t.id) && y.type != null
      );
      return [
        { kind: "add-boundedContext", id: d.id, name: d.name, subdomainType: d.subdomainType ?? "GENERIC" },
        // Re-annotate the derived pairs this boundedContext participated in.
        ...c.map(
          (y) => ({
            kind: "set-relation-type",
            sourceId: y.sourceId,
            targetId: y.targetId,
            type: y.type
          })
        )
      ];
    }
    case "add-aggregate":
      return [{ kind: "remove-aggregate", id: t.id }];
    case "remove-aggregate": {
      const d = (e.model.aggregates ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "add-aggregate", id: d.id, name: d.name, boundedContextId: d.boundedContextId }] : null;
    }
    case "add-entity":
      return [{ kind: "remove-entity", id: t.id, aggregateId: t.aggregateId }];
    case "remove-entity": {
      const d = (e.model.entities ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "add-entity", id: d.id, name: d.name, aggregateId: d.aggregateId }] : null;
    }
    case "add-value-object":
      return [{ kind: "remove-value-object", id: t.id, aggregateId: t.aggregateId }];
    case "remove-value-object": {
      const d = (e.model.valueObjects ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "add-value-object", id: d.id, name: d.name, aggregateId: d.aggregateId, type: d.type }] : null;
    }
    case "set-value-object-aggregate": {
      const d = (e.model.valueObjects ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "set-value-object-aggregate", id: t.id, aggregateId: d.aggregateId }] : null;
    }
    case "set-entity-aggregate": {
      const d = (e.model.entities ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "set-entity-aggregate", id: t.id, aggregateId: d.aggregateId }] : null;
    }
    case "add-invariant":
      return [{ kind: "remove-invariant", id: t.id }];
    case "remove-invariant": {
      const c = [
        ...e.model.aggregates ?? [],
        ...e.model.valueObjects ?? [],
        ...e.model.entities ?? []
      ].find((_) => (_.invariants ?? []).some((A) => A.id === t.id)), y = (r = c == null ? void 0 : c.invariants) == null ? void 0 : r.find((_) => _.id === t.id);
      return c && y ? [{ kind: "add-invariant", ownerId: c.id, id: y.id, name: y.name }] : null;
    }
    case "add-domain-event":
      return [{ kind: "remove-domain-event", id: t.id }];
    case "add-query-service":
      return [{ kind: "remove-query-service", id: t.id }];
    case "remove-query-service": {
      for (const d of e.model.boundedContexts) {
        const c = (d.queryServices ?? []).find((y) => y.id === t.id);
        if (c) return [{ kind: "add-query-service", id: c.id, name: c.name, boundedContextId: d.id }];
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
      const d = (e.model.externalSystemDependencies ?? []).find(
        (c) => c.sourceId === t.sourceId && c.targetId === t.targetId
      );
      return d ? [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: d.type }] : [{ kind: "remove-external-dependency", sourceId: t.sourceId, targetId: t.targetId }];
    }
    case "remove-external-dependency": {
      const d = (e.model.externalSystemDependencies ?? []).find(
        (c) => c.sourceId === t.sourceId && c.targetId === t.targetId
      );
      return [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: d == null ? void 0 : d.type }];
    }
    case "add-proxy-api":
      return [{ kind: "remove-proxy-api", id: t.id }];
    case "remove-proxy-api": {
      const d = (e.model.proxyApis ?? []).find((c) => c.id === t.id);
      return d ? [{
        kind: "add-proxy-api",
        id: d.id,
        name: d.name,
        targetId: d.targetApiId,
        boundedContextId: d.publishedByExternalSystemId
      }] : null;
    }
    case "set-proxy-target": {
      const d = (e.model.proxyApis ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "set-proxy-target", id: t.id, targetId: d.targetApiId ?? "" }] : null;
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
      const d = (e.model.apiOperationImplementations ?? []).find(
        (c) => c.apiId === t.apiId && c.operationId === t.operationId && c.boundedContextId === t.boundedContextId
      );
      return d ? [{
        kind: "set-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        boundedContextId: t.boundedContextId,
        targetUseCaseId: d.useCaseId
      }] : [{
        kind: "remove-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        boundedContextId: t.boundedContextId
      }];
    }
    case "remove-api-operation-implementation": {
      const d = (e.model.apiOperationImplementations ?? []).find(
        (c) => c.apiId === t.apiId && c.operationId === t.operationId && c.boundedContextId === t.boundedContextId
      );
      return d ? [{
        kind: "set-api-operation-implementation",
        apiId: t.apiId,
        operationId: t.operationId,
        boundedContextId: t.boundedContextId,
        targetUseCaseId: d.useCaseId
      }] : null;
    }
    case "set-api-publisher": {
      const d = (e.model.apis ?? []).find((c) => c.id === t.id) ?? (e.model.proxyApis ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "set-api-publisher", id: t.id, targetId: d.publishedByExternalSystemId ?? "" }] : null;
    }
    case "add-actor-crud":
      return [{ kind: "remove-actor-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-actor-crud":
      return [{ kind: "add-actor-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-use-case":
      return [{ kind: "remove-use-case", id: t.id }];
    case "remove-use-case": {
      for (const d of e.model.boundedContexts) {
        const c = (d.useCases ?? []).find((y) => y.id === t.id);
        if (c)
          return [
            { kind: "add-use-case", id: c.id, name: c.name, boundedContextId: d.id, policy: c.policy }
          ];
      }
      return null;
    }
    case "add-external-use-case":
      return [{ kind: "remove-external-use-case", id: t.id }];
    case "remove-external-use-case": {
      for (const d of e.model.externalSystems) {
        const c = (d.useCases ?? []).find((y) => y.id === t.id);
        if (c)
          return [{ kind: "add-external-use-case", id: c.id, name: c.name, boundedContextId: d.id }];
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
      const d = (e.model.notifications ?? []).find((y) => y.id === t.id);
      if (!(d != null && d.ownerBoundedContextId)) return null;
      const c = [
        { kind: "add-notification", id: d.id, name: d.name, boundedContextId: d.ownerBoundedContextId, type: (d.channels ?? [])[0] }
      ];
      d.eventId && c.push({ kind: "set-notification-event", id: d.id, targetId: d.eventId });
      for (const y of d.recipientRoleIds ?? []) c.push({ kind: "add-notification-recipient", id: d.id, roleId: y });
      return c;
    }
    case "set-notification-event": {
      const d = (e.model.notifications ?? []).find((c) => c.id === t.id);
      return [{ kind: "set-notification-event", id: t.id, targetId: (d == null ? void 0 : d.eventId) ?? null }];
    }
    case "add-notification-recipient":
      return [{ kind: "remove-notification-recipient", id: t.id, roleId: t.roleId }];
    case "remove-notification-recipient":
      return [{ kind: "add-notification-recipient", id: t.id, roleId: t.roleId }];
    case "add-document":
      return [{ kind: "remove-document", id: t.id }];
    case "remove-document": {
      const d = (e.model.documents ?? []).find((y) => y.id === t.id);
      if (!(d != null && d.ownerBoundedContextId)) return null;
      const c = [
        { kind: "add-document", id: d.id, name: d.name, boundedContextId: d.ownerBoundedContextId, type: d.kind }
      ];
      return d.modelId && c.push({ kind: "set-document-model", id: d.id, modelId: d.modelId }), d.queryServiceId && c.push({ kind: "set-document-query", id: d.id, queryServiceId: d.queryServiceId, queryOperationId: d.queryOperationId ?? null }), c;
    }
    case "set-document-model": {
      const d = (e.model.documents ?? []).find((c) => c.id === t.id);
      return [{ kind: "set-document-model", id: t.id, modelId: (d == null ? void 0 : d.modelId) ?? null }];
    }
    case "set-document-query": {
      const d = (e.model.documents ?? []).find((c) => c.id === t.id);
      return [{ kind: "set-document-query", id: t.id, queryServiceId: (d == null ? void 0 : d.queryServiceId) ?? null, queryOperationId: (d == null ? void 0 : d.queryOperationId) ?? null }];
    }
    case "add-identity-provider":
      return [{ kind: "remove-identity-provider", id: t.id }];
    case "remove-identity-provider": {
      const d = (e.model.identityProviders ?? []).find((y) => y.id === t.id);
      if (!d) return null;
      const c = [
        { kind: "add-identity-provider", id: d.id, name: d.name, type: d.type }
      ];
      d.publishedByExternalSystemId && c.push({ kind: "set-idp-publisher", id: d.id, targetId: d.publishedByExternalSystemId });
      for (const y of e.model.boundedContexts)
        y.identityProviderId === t.id && c.push({ kind: "set-identity-provider", id: y.id, targetId: t.id });
      for (const y of e.model.uiApps ?? [])
        y.identityProviderId === t.id && c.push({ kind: "set-identity-provider", id: y.id, targetId: t.id });
      for (const y of e.model.etlFlows ?? [])
        y.identityProviderId === t.id && c.push({ kind: "set-identity-provider", id: y.id, targetId: t.id });
      return c;
    }
    case "set-idp-publisher": {
      const d = (e.model.identityProviders ?? []).find((c) => c.id === t.id);
      return [{ kind: "set-idp-publisher", id: t.id, targetId: (d == null ? void 0 : d.publishedByExternalSystemId) ?? null }];
    }
    case "set-identity-provider": {
      const d = ((l = e.model.boundedContexts.find((c) => c.id === t.id)) == null ? void 0 : l.identityProviderId) ?? ((u = (e.model.uiApps ?? []).find((c) => c.id === t.id)) == null ? void 0 : u.identityProviderId) ?? ((h = (e.model.etlFlows ?? []).find((c) => c.id === t.id)) == null ? void 0 : h.identityProviderId) ?? null;
      return [{ kind: "set-identity-provider", id: t.id, targetId: d }];
    }
    case "add-etl-flow":
      return [{ kind: "remove-etl-flow", id: t.id }];
    case "remove-etl-flow": {
      const d = (e.model.etlFlows ?? []).find((c) => c.id === t.id);
      return !d || !d.ownerBoundedContextId ? null : [
        { kind: "add-etl-flow", id: d.id, name: d.name, boundedContextId: d.ownerBoundedContextId },
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
      return [{ kind: "remove-etl-step", etlFlowId: t.etlFlowId, id: t.id }];
    case "remove-etl-step": {
      const d = (((m = (e.model.etlFlows ?? []).find((c) => c.id === t.etlFlowId)) == null ? void 0 : m.steps) ?? []).find((c) => c.id === t.id);
      return d ? [{
        kind: "add-etl-step",
        etlFlowId: t.etlFlowId,
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
      return [{ kind: "remove-scheduled-trigger", id: t.id }];
    case "remove-scheduled-trigger": {
      const d = e.model.boundedContexts.find(
        (y) => (y.scheduledTriggers ?? []).some((_) => _.id === t.id)
      ), c = ((d == null ? void 0 : d.scheduledTriggers) ?? []).find((y) => y.id === t.id);
      return !d || !c ? null : [{
        kind: "add-scheduled-trigger",
        id: c.id,
        name: c.name,
        boundedContextId: d.id,
        cronExpression: c.cronExpression,
        targetUseCaseId: c.useCaseId
      }];
    }
    case "set-scheduled-trigger-target": {
      const d = e.model.boundedContexts.flatMap((c) => c.scheduledTriggers ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "set-scheduled-trigger-target", id: t.id, targetUseCaseId: d.useCaseId ?? null }] : null;
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
      const d = e.model.externalSystems.find((c) => c.id === t.id);
      return d ? [{ kind: "add-external-system", id: d.id, name: d.name }] : null;
    }
    case "add-ai-agent":
      return [{ kind: "remove-ai-agent", id: t.id }];
    case "remove-ai-agent": {
      const d = (e.model.aiAgents ?? []).find((c) => c.id === t.id);
      return d ? [
        { kind: "add-ai-agent", id: d.id, name: d.name, external: d.external },
        ...(e.model.agentUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-agent-use", sourceId: t.id, targetId: c.useCaseId })),
        ...(e.model.agentExternalUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({
          kind: "add-agent-external-use",
          sourceId: t.id,
          targetId: c.externalUseCaseId
        })),
        ...(e.model.agentMcpUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-agent-mcp", sourceId: t.id, targetId: c.mcpServerId })),
        ...(e.model.agentGatewayUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-agent-gateway", sourceId: t.id, targetId: c.gatewayId })),
        ...(e.model.agentApiOpUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({
          kind: "add-agent-api-operation",
          sourceId: t.id,
          targetId: c.apiOperationId
        })),
        ...(e.model.agentQueryUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-agent-query", sourceId: t.id, targetId: c.queryServiceId })),
        ...(e.model.agentRags ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-agent-rag", sourceId: t.id, targetId: c.ragId })),
        ...(e.model.agentDelegations ?? []).filter((c) => c.agentId === t.id || c.delegateAgentId === t.id).map((c) => ({
          kind: "add-agent-delegate",
          sourceId: c.agentId,
          targetId: c.delegateAgentId
        })),
        ...(e.model.actorAgentUses ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-actor-agent", sourceId: c.actorId, targetId: t.id })),
        ...(e.model.agentTriggers ?? []).filter((c) => c.agentId === t.id).map((c) => ({ kind: "add-agent-trigger", sourceId: c.eventId, targetId: t.id }))
      ] : null;
    }
    case "add-mcp-gateway":
      return [{ kind: "remove-mcp-gateway", id: t.id }];
    case "remove-mcp-gateway": {
      const d = (e.model.mcpGateways ?? []).find((c) => c.id === t.id);
      return d ? [
        { kind: "add-mcp-gateway", id: d.id, name: d.name },
        ...[
          ...d.mcpServerIds ?? [],
          ...d.apiIds ?? [],
          ...d.apiOperationIds ?? [],
          ...d.useCaseIds ?? [],
          ...d.ragIds ?? []
        ].map((c) => ({ kind: "add-gateway-exposure", sourceId: t.id, targetId: c })),
        ...(e.model.agentGatewayUses ?? []).filter((c) => c.gatewayId === t.id).map((c) => ({ kind: "add-agent-gateway", sourceId: c.agentId, targetId: t.id }))
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
      for (const d of e.model.externalSystems) {
        const c = (d.mcpServers ?? []).find((y) => y.id === t.id);
        if (c)
          return [
            { kind: "add-mcp-server", id: c.id, name: c.name, boundedContextId: d.id, uri: c.uri },
            ...(e.model.agentMcpUses ?? []).filter((y) => y.mcpServerId === t.id).map(
              (y) => ({
                kind: "add-agent-mcp",
                sourceId: y.agentId,
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
      const d = (e.model.rags ?? []).find((c) => c.id === t.id);
      return d ? [
        { kind: "add-rag", id: d.id, name: d.name },
        ...(e.model.agentRags ?? []).filter((c) => c.ragId === t.id).map(
          (c) => ({
            kind: "add-agent-rag",
            sourceId: c.agentId,
            targetId: t.id
          })
        ),
        ...(d.sourceReadModelIds ?? []).map(
          (c) => ({ kind: "add-rag-source", sourceId: t.id, targetId: c })
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
      const d = (e.model.actors ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "add-actor", id: d.id, name: d.name }] : null;
    }
    case "add-note":
      return [{ kind: "remove-note", id: t.id }];
    case "remove-note": {
      const d = (e.model.notes ?? []).find((c) => c.id === t.id);
      return d ? [
        { kind: "add-note", id: d.id, name: d.text },
        ...[...d.targetIds ?? [], ...d.edgeRefs ?? []].map(
          (c) => ({ kind: "note-attach", id: d.id, targetId: c })
        )
      ] : null;
    }
    case "note-attach":
      return [{ kind: "note-detach", id: t.id, targetId: t.targetId }];
    case "note-detach":
      return [{ kind: "note-attach", id: t.id, targetId: t.targetId }];
    case "add-area":
      return [{ kind: "remove-area", id: t.id }];
    case "add-url":
      return [{ kind: "remove-url", id: t.id }];
    case "remove-url": {
      const d = (e.model.urls ?? []).find((c) => c.id === t.id);
      return d ? [
        { kind: "add-url", id: d.id, name: d.name, uri: d.url },
        ...(e.model.services ?? []).filter((c) => (c.urlIds ?? []).includes(t.id)).map((c) => ({ kind: "add-service-url", serviceId: c.id, id: t.id }))
      ] : null;
    }
    case "add-service-url":
      return [{ kind: "remove-service-url", serviceId: t.serviceId, id: t.id }];
    case "remove-service-url":
      return [{ kind: "add-service-url", serviceId: t.serviceId, id: t.id }];
    case "remove-area": {
      const d = (e.model.areas ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "add-area", id: d.id, name: d.name }] : null;
    }
    case "add-application-event":
      return [{ kind: "remove-application-event", id: t.id }];
    case "remove-application-event": {
      for (const d of e.model.boundedContexts) {
        const c = (d.applicationEvents ?? []).find((y) => y.id === t.id);
        if (c)
          return [{ kind: "add-application-event", id: c.id, name: c.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "add-domain-service":
      return [{ kind: "remove-domain-service", id: t.id }];
    case "remove-domain-service": {
      for (const d of e.model.boundedContexts) {
        const c = (d.domainServices ?? []).find((y) => y.id === t.id);
        if (c) return [{ kind: "add-domain-service", id: c.id, name: c.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "add-read-model":
      return [{ kind: "remove-read-model", id: t.id }];
    case "add-projection":
      return [{ kind: "remove-projection", id: t.id }];
    case "remove-projection": {
      const d = (e.model.projections ?? []).find((c) => c.id === t.id);
      return d && (d.sourceAggregateId || d.sourceExternalUseCaseId || d.sourceExternalTableId) ? [
        {
          kind: "add-projection",
          id: d.id,
          name: d.name,
          aggregateId: d.sourceAggregateId,
          externalUseCaseId: d.sourceExternalUseCaseId,
          externalTableId: d.sourceExternalTableId,
          targetId: d.readModelId,
          boundedContextId: d.boundedContextId
        }
      ] : null;
    }
    case "add-external-table":
      return [{ kind: "remove-external-table", id: t.id }];
    case "remove-external-table": {
      for (const d of e.model.externalSystems) {
        const c = (d.tables ?? []).find((y) => y.id === t.id);
        if (c) return [{ kind: "add-external-table", id: c.id, name: c.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "add-rag-content-source":
      return [{ kind: "remove-rag-content-source", sourceId: t.sourceId, uri: t.uri }];
    case "remove-rag-content-source": {
      const d = (g = (f = (e.model.rags ?? []).find((c) => c.id === t.sourceId)) == null ? void 0 : f.contentSources) == null ? void 0 : g.find((c) => c.uri === t.uri);
      return d ? [
        {
          kind: "add-rag-content-source",
          sourceId: t.sourceId,
          type: d.type,
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
      const d = (e.model.apis ?? []).find((c) => c.id === t.id);
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
            boundedContextId: c.targetBoundedContextId,
            targetUseCaseId: c.targetUseCaseId
          })
        )
      ] : null;
    }
    case "add-api-operation":
      return [{ kind: "remove-api-operation", apiId: t.apiId, id: t.id }];
    case "remove-api-operation": {
      const d = (v = (e.model.apis ?? []).find((c) => c.id === t.apiId)) == null ? void 0 : v.operations.find((c) => c.id === t.id);
      return d ? [
        {
          kind: "add-api-operation",
          apiId: t.apiId,
          id: d.id,
          name: d.name,
          httpMethod: d.httpMethod,
          path: d.path,
          boundedContextId: d.targetBoundedContextId,
          targetUseCaseId: d.targetUseCaseId
        }
      ] : null;
    }
    case "set-api-operation-target": {
      const d = (b = (e.model.apis ?? []).find((c) => c.id === t.apiId)) == null ? void 0 : b.operations.find((c) => c.id === t.id);
      return d ? [
        {
          kind: "set-api-operation-target",
          apiId: t.apiId,
          id: t.id,
          boundedContextId: d.targetBoundedContextId,
          targetUseCaseId: d.targetUseCaseId
        }
      ] : null;
    }
    case "remove-read-model": {
      for (const d of e.model.boundedContexts) {
        const c = (d.readModels ?? []).find((y) => y.id === t.id);
        if (c != null && c.aggregateId)
          return [{ kind: "add-read-model", id: c.id, name: c.name, aggregateId: c.aggregateId }];
      }
      return null;
    }
    case "remove-domain-event": {
      for (const d of e.model.boundedContexts) {
        const c = (d.domainEvents ?? []).find((y) => y.id === t.id);
        if (c) return [{ kind: "add-domain-event", id: c.id, name: c.name, boundedContextId: d.id }];
      }
      return null;
    }
    case "rename-element": {
      const c = (t.type === "boundedContext" ? e.model.boundedContexts : t.type === "aggregate" ? e.model.aggregates ?? [] : t.type === "domain-event" ? e.model.boundedContexts.flatMap((y) => y.domainEvents ?? []) : t.type === "read-model" ? e.model.boundedContexts.flatMap((y) => y.readModels ?? []) : t.type === "domain-service" ? e.model.boundedContexts.flatMap((y) => y.domainServices ?? []) : t.type === "query-service" ? e.model.boundedContexts.flatMap((y) => y.queryServices ?? []) : t.type === "use-case" ? e.model.boundedContexts.flatMap((y) => y.useCases ?? []) : t.type === "external-use-case" ? e.model.externalSystems.flatMap((y) => y.useCases ?? []) : t.type === "mcp-server" ? e.model.externalSystems.flatMap((y) => y.mcpServers ?? []) : t.type === "application-event" ? e.model.boundedContexts.flatMap((y) => y.applicationEvents ?? []) : t.type === "external-system" ? e.model.externalSystems : t.type === "actor" ? e.model.actors ?? [] : t.type === "ai-agent" ? e.model.aiAgents ?? [] : t.type === "mcp-gateway" ? e.model.mcpGateways ?? [] : e.model.entities ?? []).find((y) => y.id === t.id);
      return c ? [{ kind: "rename-element", type: t.type, id: t.id, name: c.name }] : null;
    }
    case "add-flow":
      return [{ kind: "remove-flow", id: t.id }];
    case "remove-flow": {
      const d = e.model.flows.find((c) => c.id === t.id);
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
      return [{ kind: "remove-view", id: t.id }];
    case "remove-view": {
      const d = (e.model.views ?? []).find((c) => c.id === t.id);
      return d ? [{ kind: "add-view", id: d.id, name: d.name, memberIds: d.memberIds }] : null;
    }
    case "add-process":
      return [{ kind: "remove-process", id: t.id }];
    case "add-process-step":
      return [{ kind: "remove-process-step", processId: t.processId, id: t.id }];
    case "remove-process-step": {
      const d = (e.model.processes ?? []).find((_) => _.id === t.processId), c = (d == null ? void 0 : d.steps.findIndex((_) => _.id === t.id)) ?? -1;
      if (!d || c < 0) return null;
      const y = d.steps[c];
      return [
        {
          kind: "add-process-step",
          processId: t.processId,
          id: y.id,
          name: y.name,
          stepType: y.type,
          roleId: y.roleId,
          deadline: y.deadline,
          useCaseId: y.useCaseId,
          compensationUseCaseId: y.compensationUseCaseId,
          afterStepId: c > 0 ? d.steps[c - 1].id : void 0
        }
      ];
    }
    case "move-process-step": {
      const d = (e.model.processes ?? []).find((y) => y.id === t.processId), c = (d == null ? void 0 : d.steps.findIndex((y) => y.id === t.id)) ?? -1;
      return !d || c < 0 ? null : [
        {
          kind: "move-process-step",
          processId: t.processId,
          id: t.id,
          afterStepId: c > 0 ? d.steps[c - 1].id : void 0
        }
      ];
    }
    case "update-process-step": {
      const d = (e.model.processes ?? []).find((y) => y.id === t.processId), c = d == null ? void 0 : d.steps.find((y) => y.id === t.id);
      return c ? [
        {
          kind: "update-process-step",
          processId: t.processId,
          id: t.id,
          roleId: c.roleId,
          deadline: c.deadline,
          compensationUseCaseId: c.compensationUseCaseId
        }
      ] : null;
    }
    case "remove-process": {
      const d = (e.model.processes ?? []).find((c) => c.id === t.id);
      return d ? [
        {
          kind: "add-process",
          id: d.id,
          name: d.name,
          boundedContextId: d.ownerBoundedContextId ?? "",
          triggerAggregateId: d.triggerAggregateId,
          triggerEvent: d.triggerEvent,
          steps: d.steps
        }
      ] : null;
    }
    case "add-workflow":
      return [{ kind: "remove-workflow", id: t.id }];
    case "remove-workflow": {
      const d = (e.model.workflows ?? []).find((c) => c.id === t.id);
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
      return [{ kind: "remove-workflow-step", workflowId: t.workflowId, id: t.id }];
    case "remove-workflow-step": {
      const d = (e.model.workflows ?? []).find((_) => _.id === t.workflowId), c = (d == null ? void 0 : d.steps.findIndex((_) => _.id === t.id)) ?? -1;
      if (!d || c < 0) return null;
      const y = d.steps[c];
      return [
        {
          kind: "add-workflow-step",
          workflowId: t.workflowId,
          id: y.id,
          name: y.name,
          emittedEventName: y.emittedEventName,
          targetUseCaseId: y.targetUseCaseId,
          completionEventName: y.completionEventName,
          dependsOnStepIds: y.dependsOnStepIds,
          afterStepId: c > 0 ? d.steps[c - 1].id : void 0
        },
        // Removing a step also strips it from its dependents; restore those edges.
        ...d.steps.filter((_) => _.id !== t.id && (_.dependsOnStepIds ?? []).includes(t.id)).map(
          (_) => ({
            kind: "add-workflow-dependency",
            workflowId: t.workflowId,
            id: _.id,
            dependsOnStepId: t.id
          })
        )
      ];
    }
    case "update-workflow-step": {
      const d = (e.model.workflows ?? []).find((y) => y.id === t.workflowId), c = d == null ? void 0 : d.steps.find((y) => y.id === t.id);
      return c ? [
        {
          kind: "update-workflow-step",
          workflowId: t.workflowId,
          id: t.id,
          emittedEventName: c.emittedEventName,
          targetUseCaseId: c.targetUseCaseId,
          completionEventName: c.completionEventName
        }
      ] : null;
    }
    case "set-workflow-trigger": {
      const d = (e.model.workflows ?? []).find((c) => c.id === t.id);
      return d ? [{
        kind: "set-workflow-trigger",
        id: t.id,
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
    case "save-interaction": {
      const d = (e.model.interactions ?? []).find((c) => c.id === t.id);
      return d ? [xt(d)] : [{ kind: "remove-interaction", id: t.id }];
    }
    case "remove-interaction": {
      const d = (e.model.interactions ?? []).find((c) => c.id === t.id);
      return d ? [xt(d)] : null;
    }
  }
  return null;
}
const Ap = [
  { id: "uc-call", label: "Invocación", hint: "Caso de uso → caso de uso: lo invoca como un paso" },
  { id: "query-call", label: "Consulta", hint: "Caso de uso → query service: lo consulta" },
  { id: "aggregate-call", label: "Opera sobre", hint: "Caso de uso → agregado: opera sobre él" },
  { id: "emission", label: "Emisión", hint: "Agregado/servicio → evento de dominio · caso de uso → evento de aplicación" },
  { id: "flow-triggers", label: "Flow · dispara", hint: "Evento → caso de uso de otro contexto (TRIGGERS)" },
  { id: "flow-materializes", label: "Flow · materializa", hint: "Evento → contexto o read model (MATERIALIZES)" },
  { id: "actor-use", label: "Uso (actor)", hint: "Actor → caso de uso, query service, agregado (CRUD) o agente" },
  { id: "ext-dep", label: "Dependencia", hint: "Sistema externo/actor → sistema, API o proxy" },
  { id: "api-implementation", label: "Implementación", hint: "API → contexto: el contexto la implementa (la sirve él mismo)" },
  { id: "api-consumption", label: "Consumo (servidumbre)", hint: "API → contexto: el contexto la consume (relación serving)" },
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
function Ni(e, t, i) {
  return Object.entries(So).map(([n, o]) => ({
    id: `archimate:${n}`,
    label: `${o} — ArchiMate`,
    hint: `Relación ArchiMate «${o}» de documentación entre estos dos elementos`,
    apply() {
      e.command({
        kind: "add-archimate-relation",
        id: `ar-${t}-${i}-${n}`,
        sourceId: t,
        targetId: i,
        type: n
      });
    }
  }));
}
function Mp(e, t, i) {
  const n = e.model, o = [], s = (E, N) => o.push({ id: E, apply: N }), a = new Set(n.boundedContexts.flatMap((E) => (E.useCases ?? []).map((N) => N.id))), r = new Set(n.boundedContexts.flatMap((E) => (E.queryServices ?? []).map((N) => N.id))), l = new Set(n.boundedContexts.flatMap((E) => (E.domainEvents ?? []).map((N) => N.id))), u = new Set(n.boundedContexts.flatMap((E) => (E.applicationEvents ?? []).map((N) => N.id))), h = /* @__PURE__ */ new Set([
    ...(n.aggregates ?? []).map((E) => E.id),
    ...n.boundedContexts.flatMap((E) => (E.domainServices ?? []).map((N) => N.id))
  ]), m = new Set(n.externalSystems.flatMap((E) => (E.useCases ?? []).map((N) => N.id))), f = (E) => (n.aiAgents ?? []).some((N) => N.id === E), g = (E) => (n.actors ?? []).some((N) => N.id === E), v = (E) => n.externalSystems.some((N) => N.id === E), b = (E) => n.boundedContexts.some((N) => N.id === E), d = (E) => (n.aggregates ?? []).some((N) => N.id === E), c = new Set((n.uis ?? []).map((E) => E.id)), y = new Set((n.uiApps ?? []).map((E) => E.id)), _ = new Set((n.pages ?? []).map((E) => E.id));
  {
    const E = c.has(t) ? t : c.has(i) ? i : null, N = E === t ? i : t;
    E && b(N) && s("ui-composition", () => {
      e.command({ kind: "set-ui-context", id: E, boundedContextId: N });
    });
  }
  {
    const E = c.has(t) ? t : c.has(i) ? i : null, N = E === t ? i : t;
    E && g(N) && s("ui-serving", () => {
      e.command({ kind: "add-ui-serving", id: E, targetId: N });
    });
  }
  {
    const E = c.has(t) ? t : c.has(i) ? i : null, N = E === t ? i : t;
    E && (y.has(N) || _.has(N)) && s("ui-assignment", () => {
      e.command({ kind: "add-ui-assignment", id: E, targetId: N });
    });
  }
  a.has(t) && a.has(i) && t !== i && s("uc-call", () => {
    (n.useCaseCalls ?? []).some((E) => E.sourceId === t && E.targetId === i) || e.command({ kind: "add-use-case-call", sourceId: t, targetId: i });
  }), a.has(t) && r.has(i) && s("query-call", () => {
    (n.queryCalls ?? []).some((E) => E.sourceId === t && E.targetId === i) || e.command({ kind: "add-query-call", sourceId: t, targetId: i });
  }), a.has(t) && d(i) && s("aggregate-call", () => {
    (n.aggregateCalls ?? []).some((E) => E.sourceId === t && E.targetId === i) || e.command({ kind: "add-aggregate-call", sourceId: t, targetId: i });
  }), (h.has(t) && l.has(i) || a.has(t) && u.has(i)) && s("emission", () => {
    (n.emissions ?? []).some((E) => E.sourceId === t && E.domainEventId === i) || e.command({ kind: "add-emission", sourceId: t, targetId: i });
  }), (l.has(t) || u.has(t)) && a.has(i) && s("flow-triggers", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), (l.has(t) || u.has(t)) && (b(i) || n.boundedContexts.some((E) => (E.readModels ?? []).some((N) => N.id === i))) && s("flow-materializes", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), g(t) && ((a.has(i) || r.has(i) || d(i) || f(i)) && s("actor-use", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), v(i) && s("ext-dep", () => {
    (n.actorExternalDependencies ?? []).some((E) => E.actorId === t && E.externalSystemId === i) || e.command({ kind: "add-actor-external", sourceId: t, targetId: i });
  })), v(t) && (v(i) && t !== i && s("ext-dep", () => {
    (n.externalSystemDependencies ?? []).some((E) => E.sourceId === t && E.targetId === i) || e.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
  }), ((n.apis ?? []).some((E) => E.id === i) || (n.proxyApis ?? []).some((E) => E.id === i)) && s("ext-dep", () => {
    (n.externalSystemDependencies ?? []).some((E) => E.sourceId === t && E.targetId === i) || e.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
  }), a.has(i) && s("external-call", () => {
    (n.externalCalls ?? []).some((E) => E.externalSystemId === t && E.useCaseId === i) || e.command({ kind: "add-external-call", sourceId: t, targetId: i });
  }));
  {
    const E = (G) => (n.apis ?? []).some((se) => se.id === G), N = (n.proxyApis ?? []).find((G) => G.id === t), V = E(t) ? t : N == null ? void 0 : N.targetApiId;
    (E(t) || N != null && N.targetApiId) && b(i) && (V && s("api-implementation", () => {
      (n.apiImplementations ?? []).some(
        (G) => G.apiId === V && G.boundedContextId === i
      ) || e.command({ kind: "add-api-implementation", apiId: V, boundedContextId: i });
    }), s("api-consumption", () => {
      (n.archimateRelations ?? []).some(
        (G) => G.sourceId === t && G.targetId === i && G.type === "serving"
      ) || e.command({
        kind: "add-archimate-relation",
        id: `ar-${t}-${i}-serving`,
        sourceId: t,
        targetId: i,
        type: "serving"
      });
    }));
  }
  if (a.has(t) && m.has(i) && s("external-uc-call", () => {
    (n.externalUseCaseCalls ?? []).some((E) => E.sourceId === t && E.targetId === i) || e.command({ kind: "add-external-uc-call", sourceId: t, targetId: i });
  }), f(t)) {
    const E = new Set(n.externalSystems.flatMap((V) => (V.mcpServers ?? []).map((G) => G.id))), N = new Set((n.apis ?? []).flatMap((V) => V.operations.map((G) => G.id)));
    (a.has(i) || m.has(i) || E.has(i) || (n.mcpGateways ?? []).some((V) => V.id === i) || N.has(i) || (n.apis ?? []).some((V) => V.id === i) || (n.proxyApis ?? []).some((V) => V.id === i) || r.has(i)) && s("agent-tool", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), f(i) && i !== t && s("agent-delegate", () => {
      (n.agentDelegations ?? []).some((V) => V.agentId === t && V.delegateAgentId === i) || e.command({ kind: "add-agent-delegate", sourceId: t, targetId: i });
    }), (n.rags ?? []).some((V) => V.id === i) && s("agent-rag", () => {
      (n.agentRags ?? []).some((V) => V.agentId === t && V.ragId === i) || e.command({ kind: "add-agent-rag", sourceId: t, targetId: i });
    });
  }
  ((E) => (n.identityProviders ?? []).some((N) => N.id === E))(i) && (b(t) || (n.etlFlows ?? []).some((E) => E.id === t) || (n.uiApps ?? []).some((E) => E.id === t)) && s("idp-trust", () => It(e, "context-map", t, i, void 0, void 0, "__classic"));
  const S = /* @__PURE__ */ new Set();
  return o.filter((E) => S.has(E.id) ? !1 : (S.add(E.id), !0)).map((E) => {
    const N = Ap.find((V) => V.id === E.id);
    return { ...E, label: N.label, hint: N.hint };
  });
}
function It(e, t, i, n, o, s, a) {
  var x, w, R;
  const r = new Set((e.model.notes ?? []).map(($) => $.id));
  if (r.has(i) || r.has(n)) {
    const $ = r.has(i) ? i : n, k = r.has(i) ? n : i;
    if ($ === k) return;
    const P = k.startsWith("edge:") ? k.slice(5) : k.replace(/^(tgt:|flow:)/, "");
    e.command({ kind: "note-attach", id: $, targetId: P });
    return;
  }
  if (t === "distribution") {
    const $ = e.sceneFor("distribution"), k = e.model.modules ?? [], P = (z) => {
      for (let j = z; j; ) {
        if (k.some((le) => le.id === j)) return j;
        const X = $.nodes.find((le) => le.id === j);
        j = X ? X.ownerId ?? X.parentId : void 0;
      }
      return null;
    }, M = new Set((e.model.urls ?? []).map((z) => z.id)), q = new Set((e.model.services ?? []).map((z) => z.id));
    if (q.has(i) && M.has(n)) {
      e.command({ kind: "add-service-url", serviceId: i, id: n });
      return;
    }
    if (M.has(i) && q.has(n)) {
      e.command({ kind: "add-service-url", serviceId: n, id: i });
      return;
    }
    const D = P(n);
    if (D && D !== i && (e.model.services ?? []).some((z) => z.id === i)) {
      e.command({ kind: "add-service-module", serviceId: i, id: D });
      return;
    }
    if ((e.model.services ?? []).some((z) => z.id === i)) {
      const z = e.model.boundedContexts.find((le) => le.id === n), j = z ? k.filter((le) => le.boundedContextId === z.id) : [], X = j.find((le) => le.main) ?? j[0];
      if (X) {
        e.command({ kind: "add-service-module", serviceId: i, id: X.id });
        return;
      }
    }
    if (D && D !== i && !k.some((j) => j.id === i) && !e.model.boundedContexts.some((j) => j.id === i)) {
      e.command({ kind: "add-module-element", id: D, elementId: i });
      return;
    }
  }
  if (t === "integrations") {
    It(e, "context-map", i, n, o, s, a);
    return;
  }
  if (t === "eventstorming") {
    const $ = (P) => (e.model.customCodes ?? []).some((M) => M.id === P), k = $(n) ? { stepId: i, ccId: n } : $(i) ? { stepId: n, ccId: i } : null;
    if (k) {
      const P = e.owningUseCaseOf(k.stepId);
      P && e.command({
        kind: "set-use-case-step-custom-code",
        useCaseId: P.id,
        id: k.stepId,
        targetId: k.ccId
      });
      return;
    }
    return;
  }
  if (t === "workflows") {
    const $ = (j) => (e.model.actors ?? []).some((X) => X.id === j);
    if ($(i) !== $(n)) {
      const j = $(i) ? i : n, X = $(i) ? n : i, le = e.owningWorkflowOf(X);
      if (le) {
        e.command({ kind: "set-workflow-step-role", workflowId: le.id, id: X, targetId: j });
        return;
      }
    }
    const k = (j) => (e.model.pages ?? []).some((X) => X.id === j);
    if (k(i) !== k(n)) {
      const j = k(i) ? i : n, X = k(i) ? n : i, le = e.owningWorkflowOf(X);
      if (le) {
        e.command({ kind: "set-workflow-step-form", workflowId: le.id, id: X, targetId: j });
        return;
      }
    }
    const P = e.model.workflowGateways ?? [], M = (j) => P.some((X) => X.id === j);
    if (M(i) || M(n) || (e.model.workflows ?? []).some((j) => j.id === n)) {
      if (i === n) return;
      e.command({ kind: "add-workflow-link", sourceId: i, targetId: n });
      return;
    }
    const q = e.owningWorkflowOf(i), D = e.owningWorkflowOf(n);
    if (!q || q !== D || i === n) return;
    const z = q.steps.find((j) => j.id === n);
    if (((z == null ? void 0 : z.dependsOnStepIds) ?? []).includes(i)) return;
    e.command({
      kind: "add-workflow-dependency",
      workflowId: q.id,
      id: n,
      dependsOnStepId: i
    });
    return;
  }
  if (t === "ui") {
    const $ = e.model.pages ?? [], k = e.model.uiApps ?? [], P = (Q) => k.some((te) => te.id === Q), M = (Q) => $.some((te) => te.id === Q), q = (Q) => (e.model.uis ?? []).some((te) => te.id === Q);
    if (q(i) !== q(n)) {
      const Q = q(i) ? i : n, te = Q === i ? n : i;
      if (P(te) || M(te)) {
        e.command({ kind: "add-ui-assignment", id: Q, targetId: te });
        return;
      }
      if ((e.model.actors ?? []).some((_e) => _e.id === te)) {
        e.command({ kind: "add-ui-serving", id: Q, targetId: te });
        return;
      }
    }
    const D = (Q) => (e.model.customCodes ?? []).some((te) => te.id === Q);
    if (D(i) || D(n)) {
      const Q = D(i) ? i : n, te = D(i) ? n : i;
      if (D(te)) return;
      if (M(te)) {
        e.command({ kind: "set-page-custom-code", id: te, targetId: Q });
        return;
      }
      e.command({ kind: "add-custom-code-use", id: Q, elementId: te });
      return;
    }
    const z = e.model.buttonGroups ?? [], j = (Q) => z.some((te) => te.id === Q);
    if ((a === "toolbar" || a === "bottom") && j(i) && M(n)) {
      e.command({ kind: "add-page-bar-group", pageId: n, id: i, bar: a });
      return;
    }
    if (j(i) && j(n) && i !== n) {
      e.command({ kind: "add-group-subgroup", id: n, targetId: i });
      return;
    }
    const X = /^gbtn:([^:]+):(.+)$/.exec(i);
    if (X) {
      e.model.boundedContexts.some((te) => (te.useCases ?? []).some((_e) => _e.id === n)) ? e.command({ kind: "set-group-button-target", id: X[1], itemId: X[2], useCaseId: n }) : e.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
      return;
    }
    if (a === "home" && P(i) && (M(n) || P(n))) {
      if (n === i) return;
      e.command(
        M(n) ? { kind: "set-app-home-page", appId: i, pageId: n } : { kind: "set-app-home-page", appId: i, pageId: null, toAppId: n }
      );
      return;
    }
    if (a === "header" && P(i) && M(n)) {
      e.command({ kind: "set-app-header-page", appId: i, pageId: n });
      return;
    }
    if ((a === "crud-detail" || a === "crud-create") && M(i) && (M(n) || P(n)) && n !== i) {
      const Q = a === "crud-detail" ? "set-crud-detail" : "set-crud-create";
      e.command(
        M(n) ? { kind: Q, pageId: i, targetId: n, toAppId: null } : { kind: Q, pageId: i, targetId: null, toAppId: n }
      );
      return;
    }
    if (a === "viewmodel" && M(i)) {
      (e.model.models ?? []).some((Q) => Q.id === n) ? e.command({ kind: "set-page-model", pageId: i, modelId: n }) : e.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
      return;
    }
    if ((a === "view" || a === "edit") && P(i) && M(n)) {
      e.command({
        kind: a === "view" ? "set-app-view-page" : "set-app-edit-page",
        appId: i,
        pageId: n
      });
      return;
    }
    if (a) return;
    const le = (Q) => /^wizrow:([^:]+):(.+)$/.exec(Q), Ee = le(i) ?? le(n);
    if (Ee) {
      const Q = le(i) ? n : i;
      M(Q) && Q !== Ee[1] && e.command({ kind: "set-wizard-step-page", pageId: Ee[1], itemId: Ee[2], targetId: Q });
      return;
    }
    const K = $.find((Q) => Q.id === n && Q.type === "WIZARD");
    if (M(i) && K && i !== K.id) {
      (K.wizardSteps ?? []).some((Q) => Q.pageId === i) || e.command({ kind: "add-page-wizard-step", pageId: K.id, targetId: i });
      return;
    }
    if (M(i) && P(n)) {
      const Q = $.find((_e) => _e.id === i), te = k.find((_e) => _e.id === n);
      if (te.type === "MASTER_DETAIL" && !te.headerPageId) {
        e.command({ kind: "set-app-header-page", appId: n, pageId: i }), e.emit("modux-notice", {
          message: `${Q.name} es la cabecera de ${te.name} — las siguientes páginas serán pestañas`
        });
        return;
      }
      e.command({
        kind: "add-menu-item",
        appId: n,
        label: Q.name,
        pageId: i,
        itemId: e.newMenuItemId(Q.name)
      });
      return;
    }
    const ee = e.model.identityProviders ?? [], fe = (Q) => ee.some((te) => te.id === Q);
    if (fe(i) || fe(n)) {
      const Q = fe(i) ? i : n, te = fe(i) ? n : i;
      P(te) ? e.command({ kind: "set-identity-provider", id: te, targetId: Q }) : e.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
      return;
    }
    const Ae = (Q) => (e.model.models ?? []).some((te) => te.id === Q);
    if (Ae(i) || Ae(n)) {
      const Q = Ae(i) ? i : n, te = Ae(i) ? n : i;
      if (M(te)) {
        e.command({ kind: "set-page-model", pageId: te, modelId: Q });
        return;
      }
      if (P(te)) {
        e.command({ kind: "set-app-model", appId: te, modelId: Q });
        return;
      }
      return;
    }
    const Ie = Ce(i);
    if (Ie != null && Ie.itemId && ((x = Ce(n)) != null && x.itemId || P(n))) {
      const Q = Ce(n), te = e.menuEntryIn(Ie.appId, Ie.itemId);
      if (!te) return;
      if (Q != null && Q.itemId) {
        const _e = e.menuEntryIn(Q.appId, Q.itemId);
        if (!_e) return;
        const Ne = (St) => (St ?? []).some((si) => si.id === Q.itemId || Ne(si.children));
        if (Ie.appId === Q.appId && (Q.itemId === Ie.itemId || Ne(te.entry.children)))
          return;
        const We = e.nodeClientRect(n), De = We && s !== void 0 ? (s - We.top) / Math.max(1, We.height) : 0.5, at = De < 0.3 ? "before" : De > 0.7 ? "after" : "nest";
        if (at === "nest")
          e.command({
            kind: "move-menu-item",
            appId: Ie.appId,
            toAppId: Q.appId,
            itemId: Ie.itemId,
            parentId: Q.itemId
          });
        else {
          const St = at === "before" ? Q.itemId : _e.beforeId ?? void 0;
          if (Ie.appId === Q.appId && _e.parentId === te.parentId && St === Ie.itemId) return;
          e.command({
            kind: "move-menu-item",
            appId: Ie.appId,
            toAppId: Q.appId,
            itemId: Ie.itemId,
            parentId: _e.parentId ?? void 0,
            beforeItemId: St
          });
        }
        return;
      }
      if (Ie.appId === n && !te.parentId) return;
      e.command({
        kind: "move-menu-item",
        appId: Ie.appId,
        toAppId: n,
        itemId: Ie.itemId
      });
      return;
    }
    const Se = Ce(i) ?? Ce(n);
    if (Se) {
      const Q = Ce(i) ? i : n, te = Ce(i) ? n : i;
      if (((w = e.sceneFor("ui").nodes.find((De) => De.id === Q)) == null ? void 0 : w.kind) === "menu-group") {
        e.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
        return;
      }
      const _e = e.model.boundedContexts.some(
        (De) => (De.useCases ?? []).some((at) => at.id === te)
      ), Ne = (e.model.aggregates ?? []).some((De) => De.id === te), We = e.model.boundedContexts.flatMap((De) => De.queryServices ?? []).find((De) => (De.operations ?? []).some((at) => at.id === te));
      M(te) ? e.command({ kind: "set-menu-page", pageId: te, ...Se }) : P(te) && te !== Se.appId ? e.command({ kind: "set-menu-app", toAppId: te, ...Se }) : _e ? e.command({ kind: "set-menu-use-case", useCaseId: te, ...Se }) : Ne ? e.command({ kind: "set-menu-aggregate", aggregateId: te, ...Se }) : We && e.command({
        kind: "set-menu-query-operation",
        queryServiceId: We.id,
        queryOperationId: te,
        ...Se
      });
      return;
    }
    if ((e.model.actors ?? []).some((Q) => Q.id === i) && P(n)) {
      (e.model.actorAppUses ?? []).some((Q) => Q.actorId === i && Q.appId === n) || e.command({ kind: "add-actor-app", actorId: i, appId: n });
      return;
    }
    const be = M(i) ? { pageId: i, other: n } : M(n) ? { pageId: n, other: i } : null;
    if (be) {
      const Q = new Set(
        e.model.boundedContexts.flatMap((Ne) => (Ne.useCases ?? []).map((We) => We.id))
      ), te = new Set(
        e.model.boundedContexts.flatMap((Ne) => (Ne.queryServices ?? []).map((We) => We.id))
      ), _e = $.find((Ne) => Ne.id === be.pageId);
      Q.has(be.other) ? (_e.buttons ?? []).some((Ne) => Ne.useCaseId === be.other) || e.command({ kind: "add-page-button", pageId: be.pageId, useCaseId: be.other }) : te.has(be.other) && e.command({ kind: "set-page-listing", pageId: be.pageId, queryServiceId: be.other });
    }
    return;
  }
  if (t === "mappings") {
    const $ = e.model.models ?? [], k = rn(i), P = rn(n), M = e.model.transformations ?? [], q = e.model.customCodes ?? [], D = (K) => q.some((ee) => ee.id === K);
    if (D(i) && M.some((K) => K.id === n)) {
      e.command({ kind: "set-transformation-custom-code", id: n, targetId: i });
      return;
    }
    if (D(n) && M.some((K) => K.id === i)) {
      e.command({ kind: "set-transformation-custom-code", id: i, targetId: n });
      return;
    }
    if (D(i)) {
      const K = (P == null ? void 0 : P.modelId) ?? ($.some((ee) => ee.id === n) ? n : null);
      if (K) {
        const ee = (e.model.modelMappings ?? []).filter(
          (fe) => fe.sourceModelId === K || fe.targetModelId === K
        );
        ee.length === 1 ? e.command({ kind: "set-mapping-custom-code", id: ee[0].id, targetId: i }) : e.emit("modux-notice", {
          message: ee.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
        });
        return;
      }
      return;
    }
    if (M.some((K) => K.id === n)) {
      if (P || M.some((ee) => ee.id === i)) return;
      const K = k ? { modelId: k.modelId, fieldId: k.fieldId } : $.some((ee) => ee.id === i) ? { modelId: i } : null;
      K && e.command({ kind: "add-transformation-input", id: n, ...K });
      return;
    }
    if (M.some((K) => K.id === i)) {
      const K = P ? { modelId: P.modelId, fieldId: P.fieldId } : $.some((ee) => ee.id === n) ? { modelId: n } : null;
      K && e.command({ kind: "set-transformation-output", id: i, ...K });
      return;
    }
    if (k && P) {
      if (k.modelId === P.modelId) {
        e.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
        return;
      }
      let K = (e.model.modelMappings ?? []).find(
        (ee) => ee.sourceModelId === k.modelId && ee.targetModelId === P.modelId
      );
      if (!K) {
        const ee = $.find((be) => be.id === k.modelId), fe = $.find((be) => be.id === P.modelId);
        if (!ee || !fe) return;
        const Ae = (be) => be.replace(/[^a-zA-Z0-9]/g, ""), Ie = new Set((e.model.modelMappings ?? []).map((be) => be.id));
        let Se = `mapping-${ce(ee.name)}-${ce(fe.name)}`;
        for (let be = 2; Ie.has(Se); be++) Se = `mapping-${ce(ee.name)}-${ce(fe.name)}-${be}`;
        e.command(
          { kind: "add-model-mapping", id: Se, name: `${Ae(ee.name)}2${Ae(fe.name)}`, sourceId: ee.id, targetId: fe.id },
          !1
        ), K = { id: Se, name: "", sourceModelId: ee.id, targetModelId: fe.id };
      }
      e.command({
        kind: "add-model-mapping-rule",
        id: K.id,
        sourceId: k.fieldId,
        targetId: P.fieldId
      });
      return;
    }
    if (k && $.some((K) => K.id === n) && n !== k.modelId) {
      e.command({ kind: "move-model-field", modelId: k.modelId, fieldId: k.fieldId, targetId: n });
      return;
    }
    if (!$.some((K) => K.id === i) || !$.some((K) => K.id === n) || i === n || (e.model.modelMappings ?? []).some((K) => K.sourceModelId === i && K.targetModelId === n))
      return;
    const z = $.find((K) => K.id === i), j = $.find((K) => K.id === n), X = (K) => K.replace(/[^a-zA-Z0-9]/g, ""), le = new Set((e.model.modelMappings ?? []).map((K) => K.id));
    let Ee = `mapping-${ce(z.name)}-${ce(j.name)}`;
    for (let K = 2; le.has(Ee); K++) Ee = `mapping-${ce(z.name)}-${ce(j.name)}-${K}`;
    e.command({
      kind: "add-model-mapping",
      id: Ee,
      name: `${X(z.name)}2${X(j.name)}`,
      sourceId: i,
      targetId: n
    });
    return;
  }
  if (t === "aggregates") {
    if ((e.model.aggregates ?? []).some(($) => $.id === n)) {
      const $ = (e.model.valueObjects ?? []).find((P) => P.id === i);
      if ($) {
        $.aggregateId !== n && e.command({ kind: "set-value-object-aggregate", id: i, aggregateId: n });
        return;
      }
      const k = (e.model.entities ?? []).find((P) => P.id === i);
      k && k.aggregateId !== n && e.command({ kind: "set-entity-aggregate", id: i, aggregateId: n });
    }
    return;
  }
  if (t !== "context-map") return;
  if (a !== "__classic" && a === void 0) {
    const $ = Mp(e, i, n);
    if ($.length === 1) {
      $[0].apply();
      return;
    }
    if ($.length > 1) {
      e.openConnectPicker({
        x: o ?? 0,
        y: s ?? 0,
        options: [...$, ...Ni(e, i, n)]
      });
      return;
    }
  }
  const l = /^apiop:(.+)@(.+)$/.exec(i);
  if (l) {
    const [, $, k] = l, P = (e.model.proxyApis ?? []).find((j) => j.id === k), M = (P == null ? void 0 : P.targetApiId) ?? ((R = (e.model.apiImplementations ?? []).find(
      (j) => j.boundedContextId === k && (e.model.apis ?? []).some(
        (X) => X.id === j.apiId && X.operations.some((le) => le.id === $)
      )
    )) == null ? void 0 : R.apiId);
    if (!M) return;
    if (new Set(
      e.model.boundedContexts.flatMap((j) => (j.useCases ?? []).map((X) => X.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-implementation",
        apiId: M,
        operationId: $,
        boundedContextId: k,
        targetUseCaseId: n
      });
      return;
    }
    if (!(P != null && P.targetApiId)) return;
    let D = null;
    if (n === P.targetApiId)
      D = P.targetApiId;
    else {
      const j = /^apiimpl:(.+)@(.+)$/.exec(n);
      j && j[1] === P.targetApiId ? D = j[2] : e.model.boundedContexts.some((X) => X.id === n) && (e.model.apiImplementations ?? []).some(
        (X) => X.apiId === P.targetApiId && X.boundedContextId === n
      ) && (D = n);
    }
    if (!D) return;
    (e.model.proxyOperationRoutes ?? []).some(
      (j) => j.proxyId === P.id && j.operationId === $ && j.targetSiteId === D
    ) || e.command({
      kind: "add-proxy-operation-route",
      proxyId: P.id,
      operationId: $,
      targetSiteId: D
    });
    return;
  }
  const u = new Set((e.model.aiAgents ?? []).map(($) => $.id));
  if (u.has(i)) {
    if (new Set(
      e.model.boundedContexts.flatMap((D) => (D.useCases ?? []).map((z) => z.id))
    ).has(n)) {
      (e.model.agentUses ?? []).some(
        (z) => z.agentId === i && z.useCaseId === n
      ) || e.command({ kind: "add-agent-use", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((D) => (D.useCases ?? []).map((z) => z.id))
    ).has(n)) {
      (e.model.agentExternalUses ?? []).some(
        (z) => z.agentId === i && z.externalUseCaseId === n
      ) || e.command({ kind: "add-agent-external-use", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((D) => (D.mcpServers ?? []).map((z) => z.id))
    ).has(n)) {
      (e.model.agentMcpUses ?? []).some(
        (z) => z.agentId === i && z.mcpServerId === n
      ) || e.command({ kind: "add-agent-mcp", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.mcpGateways ?? []).some((D) => D.id === n)) {
      (e.model.agentGatewayUses ?? []).some(
        (z) => z.agentId === i && z.gatewayId === n
      ) || e.command({ kind: "add-agent-gateway", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      (e.model.apis ?? []).flatMap((D) => D.operations.map((z) => z.id))
    ).has(n)) {
      (e.model.agentApiOpUses ?? []).some(
        (z) => z.agentId === i && z.apiOperationId === n
      ) || e.command({ kind: "add-agent-api-operation", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.apis ?? []).some((D) => D.id === n) || (e.model.proxyApis ?? []).some((D) => D.id === n)) {
      (e.model.agentApiUses ?? []).some(
        (z) => z.agentId === i && z.apiId === n
      ) || e.command({ kind: "add-agent-api", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.boundedContexts.flatMap((D) => (D.queryServices ?? []).map((z) => z.id))
    ).has(n)) {
      (e.model.agentQueryUses ?? []).some(
        (z) => z.agentId === i && z.queryServiceId === n
      ) || e.command({ kind: "add-agent-query", sourceId: i, targetId: n });
      return;
    }
    if (u.has(n) && n !== i) {
      (e.model.agentDelegations ?? []).some(
        (z) => z.agentId === i && z.delegateAgentId === n
      ) || e.command({ kind: "add-agent-delegate", sourceId: i, targetId: n });
      return;
    }
    (e.model.rags ?? []).some((D) => D.id === n) && ((e.model.agentRags ?? []).some(
      (z) => z.agentId === i && z.ragId === n
    ) || e.command({ kind: "add-agent-rag", sourceId: i, targetId: n }));
    return;
  }
  if ((e.model.mcpGateways ?? []).some(($) => $.id === i)) {
    const $ = (e.model.mcpGateways ?? []).find((M) => M.id === i), k = e.model.externalSystems.some((M) => (M.mcpServers ?? []).some((q) => q.id === n)) || (e.model.apis ?? []).some((M) => M.id === n) || (e.model.apis ?? []).some((M) => M.operations.some((q) => q.id === n)) || e.model.boundedContexts.some((M) => (M.useCases ?? []).some((q) => q.id === n)) || (e.model.rags ?? []).some((M) => M.id === n), P = [
      ...$.mcpServerIds ?? [],
      ...$.apiIds ?? [],
      ...$.apiOperationIds ?? [],
      ...$.useCaseIds ?? [],
      ...$.ragIds ?? []
    ].includes(n);
    k && !P && e.command({ kind: "add-gateway-exposure", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.mcpGateways ?? []).some(($) => $.id === n)) return;
  const h = (e.model.rags ?? []).find(($) => $.id === i);
  if (h) {
    if (new Set(
      e.model.boundedContexts.flatMap((P) => (P.readModels ?? []).map((M) => M.id))
    ).has(n) && !(h.sourceReadModelIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((P) => (P.tables ?? []).map((M) => M.id))
    ).has(n) && !(h.sourceExternalTableIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (((e.model.apis ?? []).some((P) => P.id === n) || (e.model.proxyApis ?? []).some((P) => P.id === n)) && !(h.sourceApiIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((P) => P.id === n) && !(h.sourceExternalSystemIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    e.model.boundedContexts.some((P) => P.id === n) && !(h.sourceBoundedContextIds ?? []).includes(n) && e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.rags ?? []).some(($) => $.id === n)) return;
  if ((e.model.workflows ?? []).some(($) => $.id === i)) {
    const $ = (e.model.workflows ?? []).find((M) => M.id === i), k = (e.model.workflows ?? []).find(
      (M) => M.id === n && M.id !== i
    );
    if (k) {
      const M = $.onCompletionEventName || `${$.name.replace(/\s+/g, "")}Completado`;
      k.triggerEvent !== M && e.command({ kind: "set-workflow-trigger", id: n, triggerEvent: M });
      return;
    }
    const P = e.model.boundedContexts.flatMap((M) => M.useCases ?? []).find((M) => M.id === n);
    if (P && !($.steps ?? []).some((q) => q.targetUseCaseId === n)) {
      const q = `wfs-${ce(P.name)}`;
      let D = q;
      for (let z = 2; ($.steps ?? []).some((j) => j.id === D); z++)
        D = `${q}-${z}`;
      e.command({
        kind: "add-workflow-step",
        workflowId: i,
        id: D,
        name: P.name,
        targetUseCaseId: n
      });
    }
    return;
  }
  if ((e.model.workflows ?? []).some(($) => $.id === n)) {
    const $ = e.model.boundedContexts.flatMap((M) => M.domainEvents ?? []).find((M) => M.id === i), k = e.model.boundedContexts.flatMap((M) => M.applicationEvents ?? []).find((M) => M.id === i), P = $ ?? k;
    if (P) {
      const M = (e.model.emissions ?? []).find((j) => j.domainEventId === i), q = new Set((e.model.aggregates ?? []).map((j) => j.id)), D = new Set(
        e.model.boundedContexts.flatMap((j) => (j.domainServices ?? []).map((X) => X.id))
      ), z = new Set(
        e.model.boundedContexts.flatMap((j) => (j.useCases ?? []).map((X) => X.id))
      );
      e.command({
        kind: "set-workflow-trigger",
        id: n,
        triggerEvent: P.name,
        triggerAggregateId: M && q.has(M.sourceId) ? M.sourceId : void 0,
        triggerDomainServiceId: M && D.has(M.sourceId) ? M.sourceId : void 0,
        triggerUseCaseId: M && z.has(M.sourceId) ? M.sourceId : void 0
      });
    }
    return;
  }
  if ((e.model.proxyApis ?? []).some(($) => $.id === i)) {
    const $ = (e.model.proxyApis ?? []).find((k) => k.id === i);
    if ((e.model.apis ?? []).some((k) => k.id === n)) {
      $.targetApiId !== n && e.command({ kind: "set-proxy-target", id: i, targetId: n });
      return;
    }
    if (e.model.boundedContexts.some((k) => k.id === n)) {
      if (!$.targetApiId) return;
      (e.model.apiImplementations ?? []).some(
        (P) => P.apiId === $.targetApiId && P.boundedContextId === n
      ) || e.command({ kind: "add-api-implementation", apiId: $.targetApiId, boundedContextId: n });
      return;
    }
    e.model.externalSystems.some((k) => k.id === n) && $.publishedByExternalSystemId !== n && e.command({ kind: "set-api-publisher", id: i, targetId: n });
    return;
  }
  if ((e.model.apis ?? []).some(($) => $.id === i)) {
    if (e.model.externalSystems.some(($) => $.id === n)) {
      (e.model.apis ?? []).find((k) => k.id === i).publishedByExternalSystemId !== n && e.command({ kind: "set-api-publisher", id: i, targetId: n });
      return;
    }
    e.model.boundedContexts.some(($) => $.id === n) && ((e.model.apiImplementations ?? []).some(
      (k) => k.apiId === i && k.boundedContextId === n
    ) || e.command({ kind: "add-api-implementation", apiId: i, boundedContextId: n }));
    return;
  }
  const m = new Set((e.model.actors ?? []).map(($) => $.id));
  if (u.has(n)) {
    if ((/* @__PURE__ */ new Set([
      ...e.model.boundedContexts.flatMap((k) => (k.domainEvents ?? []).map((P) => P.id)),
      ...e.model.boundedContexts.flatMap((k) => (k.applicationEvents ?? []).map((P) => P.id))
    ])).has(i)) {
      (e.model.agentTriggers ?? []).some(
        (P) => P.eventId === i && P.agentId === n
      ) || e.command({ kind: "add-agent-trigger", sourceId: i, targetId: n });
      return;
    }
    if (!m.has(i)) return;
  }
  if (m.has(i)) {
    const $ = new Set(
      e.model.boundedContexts.flatMap((P) => (P.useCases ?? []).map((M) => M.id))
    ), k = new Set(
      e.model.boundedContexts.flatMap((P) => (P.queryServices ?? []).map((M) => M.id))
    );
    if ($.has(n) || k.has(n)) {
      (e.model.actorUses ?? []).some(
        (M) => M.actorId === i && M.targetId === n
      ) || e.command({ kind: "add-actor-use", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aggregates ?? []).some((P) => P.id === n)) {
      e.command({ kind: "add-actor-crud", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((P) => P.id === n)) {
      (e.model.actorExternalDependencies ?? []).some(
        (M) => M.actorId === i && M.externalSystemId === n
      ) || e.command({ kind: "add-actor-external", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aiAgents ?? []).some((P) => P.id === n)) {
      (e.model.actorAgentUses ?? []).some(
        (M) => M.actorId === i && M.agentId === n
      ) || e.command({ kind: "add-actor-agent", sourceId: i, targetId: n });
      return;
    }
    return;
  }
  const f = e.owningApiOf(i);
  if (f) {
    if (new Set(
      e.model.boundedContexts.flatMap((k) => (k.useCases ?? []).map((P) => P.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: f.id,
        id: i,
        targetUseCaseId: n
      });
      return;
    }
    if (e.model.boundedContexts.some((k) => k.id === n)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: f.id,
        id: i,
        boundedContextId: n
      });
      return;
    }
    return;
  }
  const g = ($) => (e.model.notifications ?? []).find((k) => k.id === $);
  if (g(i) || g(n)) {
    const $ = g(i) ?? g(n), k = g(i) ? n : i;
    if (e.model.boundedContexts.some(
      (M) => [...M.domainEvents ?? [], ...M.applicationEvents ?? []].some((q) => q.id === k)
    )) {
      $.eventId !== k && e.command({ kind: "set-notification-event", id: $.id, targetId: k });
      return;
    }
    if ((e.model.actors ?? []).some((M) => M.id === k)) {
      ($.recipientRoleIds ?? []).includes(k) || e.command({ kind: "add-notification-recipient", id: $.id, roleId: k });
      return;
    }
    e.emit("modux-notice", {
      message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
    });
    return;
  }
  const v = ($) => (e.model.documents ?? []).find((k) => k.id === $);
  if (v(i) || v(n)) {
    const $ = v(i) ?? v(n), k = v(i) ? n : i;
    if ((e.model.models ?? []).find((D) => D.id === k)) {
      e.command({ kind: "set-document-model", id: $.id, modelId: k });
      return;
    }
    const M = e.model.boundedContexts.flatMap((D) => D.queryServices ?? []).find((D) => D.id === k), q = e.model.boundedContexts.flatMap((D) => (D.queryServices ?? []).flatMap((z) => (z.operations ?? []).map((j) => ({ op: j, qs: z })))).find(({ op: D }) => D.id === k);
    if (M || q) {
      e.command({
        kind: "set-document-query",
        id: $.id,
        queryServiceId: (M == null ? void 0 : M.id) ?? q.qs.id,
        queryOperationId: (q == null ? void 0 : q.op.id) ?? null
      });
      return;
    }
    e.emit("modux-notice", {
      message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
    });
    return;
  }
  const b = e.model.identityProviders ?? [], d = ($) => b.find((k) => k.id === $);
  if (d(i) || d(n)) {
    const $ = d(i) ?? d(n), k = d(i) ? n : i;
    if (d(i) && e.model.externalSystems.some((q) => q.id === k)) {
      $.publishedByExternalSystemId !== k && e.command({ kind: "set-idp-publisher", id: $.id, targetId: k });
      return;
    }
    const P = e.model.boundedContexts.some((q) => q.id === k), M = (e.model.etlFlows ?? []).some((q) => q.id === k);
    if (P || M) {
      e.command({ kind: "set-identity-provider", id: k, targetId: $.id });
      return;
    }
    e.emit("modux-notice", {
      message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
    });
    return;
  }
  const c = e.model.etlFlows ?? [], y = ($) => c.find((k) => k.id === $);
  if (y(i) || y(n)) {
    const $ = y(i) ?? y(n), k = y(i) ? n : i, P = !y(i), M = new Set(e.model.externalSystems.flatMap((ee) => (ee.tables ?? []).map((fe) => fe.id))), q = /* @__PURE__ */ new Set([
      ...(e.model.apis ?? []).map((ee) => ee.id),
      ...(e.model.proxyApis ?? []).map((ee) => ee.id)
    ]), D = (e.model.apis ?? []).find((ee) => ee.operations.some((fe) => fe.id === k)), z = new Set(
      e.model.boundedContexts.flatMap((ee) => [
        ...(ee.domainEvents ?? []).map((fe) => fe.id),
        ...(ee.applicationEvents ?? []).map((fe) => fe.id)
      ])
    );
    let j = null, X = {};
    if (M.has(k) ? (j = P ? "SOURCE_PULL" : "WRITE_DB", X = { externalTableId: k }) : D ? (j = P ? "SOURCE_PULL" : "WRITE_API", X = { apiId: D.id, operationId: k }) : q.has(k) ? (j = P ? "SOURCE_PULL" : "WRITE_API", X = { apiId: k }) : z.has(k) && (j = P ? "SOURCE_CONSUMER" : "WRITE_EVENT", X = { targetId: k }), !j) {
      e.emit("modux-notice", {
        message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
      });
      return;
    }
    if (($.steps ?? []).some(
      (ee) => ee.type === j && (ee.externalTableId ?? ee.operationId ?? ee.apiId ?? ee.eventId) === (X.externalTableId ?? X.operationId ?? X.apiId ?? X.targetId)
    )) return;
    const Ee = new Set(($.steps ?? []).map((ee) => ee.id));
    let K = ($.steps ?? []).length + 1;
    for (; Ee.has(`ets-${K}`); ) K++;
    e.command({ kind: "add-etl-step", etlFlowId: $.id, id: `ets-${K}`, stepType: j, ...X });
    return;
  }
  const _ = e.model.externalSystems.flatMap(($) => $.useCases ?? []).find(($) => $.id === i), A = e.model.externalSystems.flatMap(($) => $.tables ?? []).find(($) => $.id === i);
  if (_ || A) {
    const $ = (_ ?? A).name, k = _ ? { externalUseCaseId: i } : { externalTableId: i }, P = (D) => _ ? D.sourceExternalUseCaseId === i : D.sourceExternalTableId === i, M = e.model.boundedContexts.flatMap((D) => D.readModels ?? []).find((D) => D.id === n);
    if (M) {
      (e.model.projections ?? []).some(
        (z) => P(z) && z.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce($)}-${ce(M.name)}`,
        name: `${M.name}Projection`,
        ...k,
        targetId: n
      });
      return;
    }
    const q = e.model.boundedContexts.find((D) => D.id === n);
    if (q) {
      (e.model.projections ?? []).some(
        (z) => P(z) && z.boundedContextId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce($)}-${ce(q.name)}`,
        name: `${$}ViewProjection`,
        ...k,
        boundedContextId: n,
        readModelName: `${$}View`
      });
      return;
    }
    return;
  }
  const S = (e.model.aggregates ?? []).find(($) => $.id === i);
  if (S) {
    const $ = e.model.boundedContexts.flatMap((P) => P.readModels ?? []).find((P) => P.id === n);
    if ($) {
      (e.model.projections ?? []).some(
        (M) => M.sourceAggregateId === i && M.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(S.name)}-${ce($.name)}`,
        name: `${$.name}Projection`,
        aggregateId: i,
        targetId: n
      });
      return;
    }
    const k = e.model.boundedContexts.find((P) => P.id === n);
    if (k) {
      (e.model.projections ?? []).some(
        (M) => M.sourceAggregateId === i && M.boundedContextId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(S.name)}-${ce(k.name)}`,
        name: `${S.name}ViewProjection`,
        aggregateId: i,
        boundedContextId: n,
        readModelName: `${S.name}View`
      });
      return;
    }
  }
  const E = new Set(
    e.model.boundedContexts.flatMap(($) => ($.domainEvents ?? []).map((k) => k.id))
  ), N = /* @__PURE__ */ new Set([
    ...(e.model.aggregates ?? []).map(($) => $.id),
    ...e.model.boundedContexts.flatMap(($) => ($.domainServices ?? []).map((k) => k.id))
  ]), V = new Set(
    e.model.boundedContexts.flatMap(($) => ($.applicationEvents ?? []).map((k) => k.id))
  ), G = new Set(e.model.boundedContexts.flatMap(($) => ($.useCases ?? []).map((k) => k.id))), se = new Set(
    e.model.boundedContexts.flatMap(($) => ($.queryServices ?? []).map((k) => k.id))
  );
  if (G.has(i) && se.has(n)) {
    (e.model.queryCalls ?? []).some(
      (k) => k.sourceId === i && k.targetId === n
    ) || e.command({ kind: "add-query-call", sourceId: i, targetId: n });
    return;
  }
  const C = new Set(
    e.model.externalSystems.flatMap(($) => ($.useCases ?? []).map((k) => k.id))
  );
  if (G.has(i) && C.has(n)) {
    (e.model.externalUseCaseCalls ?? []).some(
      (k) => k.sourceId === i && k.targetId === n
    ) || e.command({ kind: "add-external-uc-call", sourceId: i, targetId: n });
    return;
  }
  if (G.has(i) && G.has(n) && i !== n) {
    (e.model.useCaseCalls ?? []).some(
      (k) => k.sourceId === i && k.targetId === n
    ) || e.command({ kind: "add-use-case-call", sourceId: i, targetId: n });
    return;
  }
  const Y = e.model.boundedContexts.flatMap(($) => $.scheduledTriggers ?? []).find(($) => $.id === i);
  if (Y && G.has(n)) {
    Y.useCaseId !== n && e.command({ kind: "set-scheduled-trigger-target", id: i, targetUseCaseId: n });
    return;
  }
  if (G.has(i) && (e.model.aggregates ?? []).some(($) => $.id === n)) {
    (e.model.aggregateCalls ?? []).some(
      (k) => k.sourceId === i && k.targetId === n
    ) || e.command({ kind: "add-aggregate-call", sourceId: i, targetId: n });
    return;
  }
  if (N.has(i) && E.has(n) || G.has(i) && V.has(n)) {
    (e.model.emissions ?? []).some(
      (k) => k.sourceId === i && k.domainEventId === n
    ) || e.command({ kind: "add-emission", sourceId: i, targetId: n });
    return;
  }
  if (E.has(i) || V.has(i)) {
    const $ = V.has(i), k = e.model.boundedContexts.flatMap((K) => ($ ? K.applicationEvents : K.domainEvents) ?? []).find((K) => K.id === i), P = e.model.boundedContexts.flatMap((K) => (K.useCases ?? []).map((ee) => ({ u: ee, boundedContext: K }))).find(({ u: K }) => K.id === n), M = e.model.boundedContexts.flatMap((K) => (K.readModels ?? []).map((ee) => ({ rm: ee, boundedContext: K }))).find(({ rm: K }) => K.id === n), q = e.model.boundedContexts.find((K) => K.id === n) ?? (M == null ? void 0 : M.boundedContext) ?? (P == null ? void 0 : P.boundedContext);
    if (!k || !q) return;
    const D = new Set((e.model.aggregates ?? []).map((K) => K.id)), z = new Set(
      e.model.boundedContexts.flatMap((K) => (K.domainServices ?? []).map((ee) => ee.id))
    ), j = (e.model.emissions ?? []).find(
      (K) => K.domainEventId === i && ($ ? G.has(K.sourceId) : D.has(K.sourceId) || z.has(K.sourceId))
    );
    if (!j) {
      e.emit("modux-notice", {
        message: $ ? `Declara primero qué caso de uso publica ${k.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${k.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
        kind: "info"
      });
      return;
    }
    const X = !$ && D.has(j.sourceId);
    if (P) {
      if (e.model.flows.some(
        (ee) => ee.archetype === "TRIGGERS" && ee.triggerEvent === k.name && ee.targetUseCaseId === P.u.id
      )) return;
      e.command({
        kind: "add-flow",
        id: `flow-${ce(k.name)}-${ce(P.u.name)}`,
        name: P.u.name,
        archetype: "TRIGGERS",
        triggerAggregateId: X ? j.sourceId : "",
        triggerDomainServiceId: !$ && !X ? j.sourceId : void 0,
        triggerUseCaseId: $ ? j.sourceId : void 0,
        triggerEvent: k.name,
        targetId: q.id,
        targetUseCaseId: P.u.id
      });
      return;
    }
    const le = (M == null ? void 0 : M.rm.name) ?? `${k.name}View`;
    if (e.model.flows.some(
      (K) => K.archetype === "MATERIALIZES" && K.triggerEvent === k.name && K.targetId === q.id && K.readModelName === le
    )) return;
    e.command({
      kind: "add-flow",
      id: `flow-${ce(k.name)}-${ce(le)}`,
      name: le,
      archetype: "MATERIALIZES",
      triggerAggregateId: X ? j.sourceId : "",
      triggerDomainServiceId: !$ && !X ? j.sourceId : void 0,
      triggerUseCaseId: $ ? j.sourceId : void 0,
      triggerEvent: k.name,
      targetId: q.id,
      readModelName: le
    });
    return;
  }
  const B = /* @__PURE__ */ new Set([
    ...N,
    ...G,
    ...se,
    ...e.model.boundedContexts.flatMap(($) => ($.readModels ?? []).map((k) => k.id))
  ]);
  if (B.has(i) || B.has(n) || E.has(n) || V.has(n))
    return;
  const O = new Set(e.model.externalSystems.map(($) => $.id));
  if (O.has(i)) {
    if (new Set(
      e.model.boundedContexts.flatMap((q) => (q.useCases ?? []).map((D) => D.id))
    ).has(n)) {
      (e.model.externalCalls ?? []).some(
        (D) => D.externalSystemId === i && D.useCaseId === n
      ) || e.command({ kind: "add-external-call", sourceId: i, targetId: n });
      return;
    }
    if (O.has(n) && n !== i) {
      e.openExtDepPicker({ sourceId: i, targetId: n, x: o ?? 0, y: s ?? 0 });
      return;
    }
    const k = (e.model.apis ?? []).find(
      (q) => q.operations.some((D) => D.id === n)
    ), P = /^apiop:(.+)@(.+)$/.exec(n), M = k ? { operationId: n, siteId: k.id } : P ? { operationId: P[1], siteId: P[2] } : null;
    if (M) {
      (e.model.externalOperationUses ?? []).some(
        (D) => D.externalSystemId === i && D.operationId === M.operationId && D.siteId === M.siteId
      ) || e.command({
        kind: "add-external-operation-use",
        sourceId: i,
        operationId: M.operationId,
        targetSiteId: M.siteId
      });
      return;
    }
    if ((e.model.apis ?? []).some((q) => q.id === n) || (e.model.proxyApis ?? []).some((q) => q.id === n)) {
      (e.model.externalSystemDependencies ?? []).some(
        (D) => D.sourceId === i && D.targetId === n
      ) || e.command({ kind: "add-external-dependency", sourceId: i, targetId: n });
      return;
    }
    return;
  }
  if (O.has(n) || m.has(n)) return;
  const W = ($) => e.model.boundedContexts.some((k) => k.id === $);
  if (W(i) && W(n) && i !== n) {
    const $ = e.model.relations.find(
      (k) => k.sourceId === i && k.targetId === n && k.declared
    );
    e.openRelationPicker({
      sourceId: i,
      targetId: n,
      mode: $ ? "edit" : "create",
      x: o ?? 0,
      y: s ?? 0
    });
    return;
  }
  if (i !== n && a === void 0) {
    e.openConnectPicker({
      x: o ?? 0,
      y: s ?? 0,
      options: Ni(e, i, n)
    });
    return;
  }
}
function Pp(e, t, i, n, o) {
  var s;
  if (o === "ui-serving") {
    const a = /^uisrv:(.+)->(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "remove-ui-serving", id: a[1], targetId: a[2] }));
    return;
  }
  if (o === "ui-assignment") {
    const a = /^uiasg:(.+)->(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "remove-ui-assignment", id: a[1], targetId: a[2] }));
    return;
  }
  if (o === "ui" && i === "node") {
    e.clearSelection(), e.command({ kind: "remove-ui", id: n });
    return;
  }
  if (o === "archimate-relation") {
    const a = n.replace(/^archi:/, "");
    e.clearSelection(), e.command({ kind: "remove-archimate-relation", id: a });
    return;
  }
  if (i === "node" && o === "note") {
    e.clearSelection(), e.command({ kind: "remove-note", id: n });
    return;
  }
  if (i === "node" && o === "url") {
    e.clearSelection(), e.command({ kind: "remove-url", id: n });
    return;
  }
  if (i === "edge" && o === "service-url") {
    const a = /^svcurl:(.+)->(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "remove-service-url", serviceId: a[1], id: a[2] }));
    return;
  }
  if (i === "node" && o === "area") {
    e.clearSelection(), e.command({ kind: "remove-area", id: n });
    return;
  }
  if (i === "edge" && o === "note-link") {
    const a = n.slice(5), r = a.indexOf("->");
    r > 0 && (e.clearSelection(), e.command({ kind: "note-detach", id: a.slice(0, r), targetId: a.slice(r + 2) }));
    return;
  }
  if (o === "invariant" || o === "invariant-containment") {
    const a = o === "invariant" ? n : n.replace(/^protects:.+->/, "");
    e.clearSelection(), e.command({ kind: "remove-invariant", id: a });
    return;
  }
  if (t === "eventstorming" && i === "edge" && o === "es-custom") {
    const a = /^escc:(.+)$/.exec(n), r = a ? e.owningUseCaseOf(a[1]) : null;
    a && r && (e.clearSelection(), e.command({ kind: "set-use-case-step-custom-code", useCaseId: r.id, id: a[1], targetId: null }));
    return;
  }
  if (t === "eventstorming" && i === "node" && o === "custom-code") {
    e.clearSelection(), e.command({ kind: "remove-custom-code", id: n });
    return;
  }
  if (t === "ui") {
    if (i === "edge") {
      let a;
      if (a = /^idpauth:(.+)$/.exec(n))
        e.command({ kind: "set-identity-provider", id: a[1], targetId: null });
      else if (a = /^appheader:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-header-page", appId: a[1], pageId: null });
      else if (a = /^apphome:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-home-page", appId: a[1], pageId: null });
      else if (a = /^appmodel:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-model", appId: a[1], modelId: null });
      else if (a = /^appview:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-view-page", appId: a[1], pageId: null });
      else if (a = /^appedit:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-edit-page", appId: a[1], pageId: null });
      else if (a = /^cruddetail:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-crud-detail", pageId: a[1], targetId: null, toAppId: null });
      else if (a = /^crudnew:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-crud-create", pageId: a[1], targetId: null, toAppId: null });
      else if (a = /^wizstep:([^:]+):(.+)$/.exec(n))
        e.command({ kind: "set-wizard-step-page", pageId: a[1], itemId: a[2], targetId: null });
      else if (a = /^pgbtn:(.+)->(.+)$/.exec(n))
        e.command({ kind: "remove-page-button", pageId: a[1], useCaseId: a[2] });
      else if (a = /^pglist:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-page-listing", pageId: a[1], queryServiceId: null });
      else if (a = /^pgmodel:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-page-model", pageId: a[1], modelId: null });
      else if (a = /^actorapp:(.+)->(.+)$/.exec(n))
        e.command({ kind: "remove-actor-app", actorId: a[1], appId: a[2] });
      else if (a = /^menupage:(.+)->[^>]+$/.exec(n)) {
        const r = Ce(a[1]);
        r && e.command({ kind: "set-menu-page", pageId: null, ...r });
      } else if (a = /^menuapp:(.+)->[^>]+$/.exec(n)) {
        const r = Ce(a[1]);
        r && e.command({ kind: "set-menu-app", toAppId: null, ...r });
      } else if (a = /^menuuc:(.+)->[^>]+$/.exec(n)) {
        const r = Ce(a[1]);
        r && e.command({ kind: "set-menu-use-case", useCaseId: null, ...r });
      } else if (a = /^menuagg:(.+)->[^>]+$/.exec(n)) {
        const r = Ce(a[1]);
        r && e.command({ kind: "set-menu-aggregate", aggregateId: null, ...r });
      } else if (a = /^menuqop:(.+)->[^>]+$/.exec(n)) {
        const r = Ce(a[1]);
        r && e.command({ kind: "set-menu-query-operation", queryServiceId: null, queryOperationId: null, ...r });
      }
      return;
    }
    if (o === "ui-app") {
      e.command({ kind: "delete-ui-app", id: n });
      return;
    }
    if (o === "page") {
      e.command({ kind: "delete-ui-page", id: n });
      return;
    }
    if (o === "menu-item" || o === "menu-group") {
      const a = Ce(n);
      a && e.command({ kind: "remove-menu-item", ...a });
      return;
    }
    if (o === "wizard-step-row") {
      const a = /^wizrow:([^:]+):(.+)$/.exec(n);
      a && e.command({ kind: "remove-page-wizard-step", pageId: a[1], targetId: a[2] });
      return;
    }
    if (o === "model") {
      e.command({ kind: "remove-model", id: n });
      return;
    }
    if (o === "identity-provider") {
      e.command({ kind: "remove-identity-provider", id: n });
      return;
    }
    if (o === "custom-code") {
      e.command({ kind: "remove-custom-code", id: n });
      return;
    }
    if (o === "button-group") {
      e.command({ kind: "remove-button-group", id: n });
      return;
    }
    if (o === "group-button") {
      const a = /^gbtn:([^:]+):(.+)$/.exec(n);
      a && e.command({ kind: "remove-group-button", id: a[1], itemId: a[2] });
      return;
    }
    if (o === "group-subgroup") {
      const a = /^gsub:([^:]+):(.+)$/.exec(n);
      a && e.command({ kind: "remove-group-subgroup", id: a[1], targetId: a[2] });
      return;
    }
    if (i === "edge" && o === "bar-group") {
      const a = /^bargrp:([^:]+):[^:]+:(.+)$/.exec(n);
      a && e.command({ kind: "remove-page-bar-group", pageId: a[1], id: a[2] });
      return;
    }
    if (i === "edge" && o === "gbtn-target") {
      const a = /^gbtnt:([^:]+):(.+)$/.exec(n);
      a && e.command({ kind: "set-group-button-target", id: a[1], itemId: a[2], useCaseId: null });
      return;
    }
    if (i === "edge" && o === "ui-custom-page") {
      const a = /^ccpage:(.+)$/.exec(n);
      a && e.command({ kind: "set-page-custom-code", id: a[1], targetId: null });
      return;
    }
    if (i === "edge" && o === "cc-uses") {
      const a = /^ccuse:(.+)->(.+)$/.exec(n);
      a && e.command({ kind: "remove-custom-code-use", id: a[1], elementId: a[2] });
      return;
    }
    return;
  }
  if (t === "mappings" && i === "edge" && o === "model-mapping") {
    const a = /^mapping:(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "remove-model-mapping", id: a[1] }));
    return;
  }
  if (t === "mappings" && i === "edge" && o === "mapping-rule") {
    const a = /^maprule:([^:]+):(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "remove-model-mapping-rule", id: a[1], itemId: a[2] }));
    return;
  }
  if (t === "mappings" && i === "node" && o === "model-field") {
    const a = rn(n);
    a && (e.clearSelection(), e.command({ kind: "remove-model-field", modelId: a.modelId, fieldId: a.fieldId }));
    return;
  }
  if (t === "mappings" && i === "node" && o === "model") {
    e.clearSelection(), e.command({ kind: "remove-model", id: n });
    return;
  }
  if (t === "mappings" && i === "node" && o === "custom-code") {
    e.clearSelection(), e.command({ kind: "remove-custom-code", id: n });
    return;
  }
  if (t === "mappings" && i === "edge" && o === "custom-of-transformation") {
    const a = /^cctf:(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "set-transformation-custom-code", id: a[1], targetId: null }));
    return;
  }
  if (t === "mappings" && i === "edge" && o === "custom-of-mapping") {
    const a = /^ccmap:(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "set-mapping-custom-code", id: a[1], targetId: null }));
    return;
  }
  if (t === "mappings" && i === "node" && o === "transformation") {
    e.clearSelection(), e.command({ kind: "remove-transformation", id: n });
    return;
  }
  if (t === "mappings" && i === "edge" && o === "transform-input") {
    const a = /^tfin:([^:]+):([^:]+):(.*)$/.exec(n);
    a && (e.clearSelection(), e.command({
      kind: "remove-transformation-input",
      id: a[1],
      modelId: a[2],
      ...a[3] ? { fieldId: a[3] } : {}
    }));
    return;
  }
  if (t === "mappings" && i === "edge" && o === "transform-output") {
    const a = /^tfout:(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "set-transformation-output", id: a[1] }));
    return;
  }
  if (t === "workflows" && i === "edge" && o === "workflow-dependency") {
    const a = /^wfdep:(.+)->(.+)$/.exec(n);
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
  if (t === "workflows" && i === "node" && o === "workflow-gateway") {
    e.clearSelection(), e.command({ kind: "remove-workflow-gateway", id: n });
    return;
  }
  if (t === "workflows" && i === "edge" && o === "wf-role") {
    const a = /^wfrole:(.+)->(.+)$/.exec(n);
    if (a) {
      const r = e.owningWorkflowOf(a[1]);
      r && (e.clearSelection(), e.command({ kind: "set-workflow-step-role", workflowId: r.id, id: a[1] }));
    }
    return;
  }
  if (t === "workflows" && i === "edge" && o === "wf-form") {
    const a = /^wfform:(.+)->(.+)$/.exec(n);
    if (a) {
      const r = e.owningWorkflowOf(a[1]);
      if (!r) return;
      e.clearSelection(), e.command({ kind: "set-workflow-step-form", workflowId: r.id, id: a[1] });
    }
    return;
  }
  if (t === "workflows" && i === "edge" && o === "wf-link") {
    const a = /^wflink:(.+)->(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "remove-workflow-link", sourceId: a[1], targetId: a[2] }));
    return;
  }
  if (i === "node" && o === "workflow") {
    e.clearSelection(), e.command({ kind: "remove-workflow", id: n });
    return;
  }
  if (i === "node" && o === "workflow-step") {
    const a = e.owningWorkflowOf(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-workflow-step", workflowId: a.id, id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "api-impl-wire") {
    const a = /^apiimplwire:(.+)@(.+)$/.exec(n);
    if (!a) return;
    const [, r, l] = a, u = (s = (e.model.apis ?? []).find(
      (h) => h.operations.some((m) => m.id === r)
    )) == null ? void 0 : s.id;
    if (!u) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation-implementation", apiId: u, operationId: r, boundedContextId: l });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "ext-op-use") {
    const a = /^extopuse:(.+)->(.+)@(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({
      kind: "remove-external-operation-use",
      sourceId: a[1],
      operationId: a[2],
      targetSiteId: a[3]
    });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "op-route") {
    const a = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(n);
    if (!a) return;
    const [, r, l, u] = a, h = /^apiimpl:.+@(.+)$/.exec(u), m = h ? h[1] : u;
    e.clearSelection(), e.command({ kind: "remove-proxy-operation-route", proxyId: l, operationId: r, targetSiteId: m });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "relation") {
    const a = /^rel:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-relation", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "emission") {
    const a = /^emit:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-emission", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "projection") {
    const a = /^proj:(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-projection", id: a[1] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "uc-call") {
    const a = /^uccall:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-use-case-call", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "notification-trigger") {
    const a = /^notif:(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "set-notification-event", id: a[1], targetId: null }));
    return;
  }
  if (t === "context-map" && i === "edge" && o === "notification-recipient") {
    const a = /^notifto:([^:]+):(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "remove-notification-recipient", id: a[1], roleId: a[2] }));
    return;
  }
  if (t === "context-map" && i === "edge" && o === "document-query") {
    const a = /^docq:(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "set-document-query", id: a[1], queryServiceId: null, queryOperationId: null }));
    return;
  }
  if (t === "context-map" && i === "node" && o === "notification") {
    e.clearSelection(), e.command({ kind: "remove-notification", id: n });
    return;
  }
  if (t === "context-map" && i === "node" && o === "document") {
    e.clearSelection(), e.command({ kind: "remove-document", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && (o === "idp-trust" || o === "idp-service")) {
    const a = /^idp(?:trust|svc):(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "set-identity-provider", id: a[1], targetId: null });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "idp-federation") {
    const a = /^idpfed:(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "set-idp-publisher", id: a[1], targetId: null });
    return;
  }
  if (t === "context-map" && i === "node" && o === "identity-provider") {
    e.clearSelection(), e.command({ kind: "remove-identity-provider", id: n });
    return;
  }
  if ((t === "context-map" || t === "integrations") && i === "edge" && (o === "etl-source" || o === "etl-write")) {
    const a = /^etl:([^:]+):(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-etl-step", etlFlowId: a[1], id: a[2] });
    return;
  }
  if ((t === "context-map" || t === "integrations") && i === "node" && o === "etl-flow") {
    e.clearSelection(), e.command({ kind: "remove-etl-flow", id: n });
    return;
  }
  if (t === "context-map" && i === "node" && o === "ui-app") {
    e.clearSelection(), e.command({ kind: "delete-ui-app", id: n });
    return;
  }
  if (t === "distribution" && i === "edge" && o === "deploys") {
    const a = /^deploy:(.+)->(.+)$/.exec(n);
    a && (e.clearSelection(), e.command({ kind: "remove-service-module", serviceId: a[1], id: a[2] }));
    return;
  }
  if ((t === "context-map" || t === "distribution") && i === "node" && o === "module") {
    e.clearSelection(), e.command({ kind: "remove-module", id: n });
    return;
  }
  if (t === "distribution" && i === "node") {
    const a = e.sceneFor("distribution"), r = (l) => {
      const u = a.nodes.find((h) => h.id === l);
      return u ? u.ownerId ?? u.parentId : void 0;
    };
    for (let l = r(n); l; ) {
      if ((e.model.modules ?? []).some((u) => u.id === l)) {
        e.clearSelection(), e.command({ kind: "remove-module-element", id: l, elementId: n });
        return;
      }
      l = r(l);
    }
    return;
  }
  if (t === "context-map" && i === "edge" && o === "st-fire") {
    const a = /^stfire:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "set-scheduled-trigger-target", id: a[1], targetUseCaseId: null });
    return;
  }
  if (t === "context-map" && i === "node" && o === "scheduled-trigger") {
    e.clearSelection(), e.command({ kind: "remove-scheduled-trigger", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agg-call") {
    const a = /^aggcall:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate-call", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "qs-call") {
    const a = /^qscall:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-query-call", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "external-call") {
    const a = /^extcall:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-external-call", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "ext-uc-call") {
    const a = /^extuccall:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-external-uc-call", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-use") {
    const a = /^mcp:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-use", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-external-use") {
    const a = /^mcpx:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-external-use", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-mcp") {
    const a = /^mcpsv:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-mcp", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "gateway-exposure") {
    const a = /^gwx:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-gateway-exposure", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-gateway") {
    const a = /^aggw:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-gateway", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-api-op") {
    const a = /^agapi:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api-operation", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-query") {
    const a = /^agqs:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-query", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-delegate") {
    const a = /^agag:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-delegate", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "actor-agent") {
    const a = /^useag:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-actor-agent", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-trigger") {
    const a = /^evag:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-trigger", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (i === "node" && o === "mcp-gateway") {
    e.clearSelection(), e.command({ kind: "remove-mcp-gateway", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-rag") {
    const a = /^agrag:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-rag", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "rag-source") {
    const a = /^ragsrc:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && (o === "rag-table" || o === "rag-api" || o === "rag-coarse")) {
    const a = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: a[2], targetId: a[1] });
    return;
  }
  if (i === "node" && o === "rag") {
    e.clearSelection(), e.command({ kind: "remove-rag", id: n });
    return;
  }
  if (i === "node" && o === "rag-content-source") {
    const a = /^ragcs:(.+?):(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-rag-content-source", sourceId: a[1], uri: a[2] });
    return;
  }
  if (i === "node" && o === "external-table") {
    e.clearSelection(), e.command({ kind: "remove-external-table", id: n });
    return;
  }
  if (i === "node" && o === "mcp-server") {
    e.clearSelection(), e.command({ kind: "remove-mcp-server", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "api-wire") {
    const a = /^apiwire:(.+)$/.exec(n), r = a ? e.owningApiOf(a[1]) : null;
    if (!a || !r) return;
    e.clearSelection(), e.command({ kind: "set-api-operation-target", apiId: r.id, id: a[1] });
    return;
  }
  if (i === "node" && o === "api") {
    e.clearSelection(), e.command({ kind: "remove-api", id: n });
    return;
  }
  if (i === "node" && o === "api-impl") {
    const a = /^apiimpl:(.+)@(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-api-implementation", apiId: a[1], boundedContextId: a[2] });
    return;
  }
  if (i === "node" && o === "proxy-api") {
    e.clearSelection(), e.command({ kind: "remove-proxy-api", id: n });
    return;
  }
  if (t === "context-map" && i === "node" && o === "workflow") {
    e.clearSelection(), e.command({ kind: "remove-workflow", id: n });
    return;
  }
  if (i === "node" && o === "api-operation") {
    const a = e.owningApiOf(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation", apiId: a.id, id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "actor-use") {
    const a = /^use:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-actor-use", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "actor-ext") {
    const a = /^extdep:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-actor-external", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "ext-dep") {
    const a = /^xdep:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-external-dependency", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "wf-chain") {
    const a = /^wfchain:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "set-workflow-trigger", id: a[2], triggerEvent: "" });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-api") {
    const a = /^agapi:(.+)->(.+)$/.exec(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api", sourceId: a[1], targetId: a[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "proxy-target") {
    const a = /^pxt:(.+)->(.+)$/.exec(n);
    if (!a || !(e.model.proxyApis ?? []).some((r) => r.id === a[1])) return;
    e.clearSelection(), e.command({ kind: "set-proxy-target", id: a[1], targetId: "" });
    return;
  }
  if (i === "node" && o === "boundedContext") {
    if ((e.model.aggregates ?? []).some((r) => r.boundedContextId === n)) return;
    e.clearSelection(), e.command({ kind: "remove-boundedContext", id: n });
    return;
  }
  if (i === "node" && o === "aggregate") {
    if ((e.model.entities ?? []).some((r) => r.aggregateId === n)) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate", id: n });
    return;
  }
  if (i === "node" && o === "domain-event") {
    e.clearSelection(), e.command({ kind: "remove-domain-event", id: n });
    return;
  }
  if (i === "node" && o === "read-model") {
    e.clearSelection(), e.command({ kind: "remove-read-model", id: n });
    return;
  }
  if (i === "node" && o === "domain-service") {
    e.clearSelection(), e.command({ kind: "remove-domain-service", id: n });
    return;
  }
  if (i === "node" && o === "query-service") {
    e.clearSelection(), e.command({ kind: "remove-query-service", id: n });
    return;
  }
  if (i === "node" && o === "use-case") {
    e.clearSelection(), e.command({ kind: "remove-use-case", id: n });
    return;
  }
  if (i === "node" && o === "external-use-case") {
    e.clearSelection(), e.command({ kind: "remove-external-use-case", id: n });
    return;
  }
  if (i === "node" && o === "application-event") {
    e.clearSelection(), e.command({ kind: "remove-application-event", id: n });
    return;
  }
  if (i === "node" && o === "external-system") {
    e.clearSelection(), e.command({ kind: "remove-external-system", id: n });
    return;
  }
  if (i === "node" && o === "actor") {
    e.clearSelection(), e.command({ kind: "remove-actor", id: n });
    return;
  }
  if (i === "node" && o === "ai-agent") {
    e.clearSelection(), e.command({ kind: "remove-ai-agent", id: n });
    return;
  }
  if (i === "node" && o === "flow") {
    e.clearSelection(), e.command({ kind: "remove-flow", id: n.replace(/^flow:/, "") });
    return;
  }
  if (i === "node" && o === "process") {
    e.clearSelection(), e.command({ kind: "remove-process", id: n });
    return;
  }
  if (i === "node" && o === "process-step") {
    const a = e.owningProcessOf(n);
    if (!a) return;
    e.clearSelection(), e.command({ kind: "remove-process-step", processId: a.id, id: n });
  }
}
const Tp = [
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
  "Componentes",
  "Display"
], vo = [
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
  { type: "entity", label: "Entidad", child: !0, symbol: "entity", color: "#14b8a6", group: "Dominio" },
  { type: "value-object", label: "Value object", child: !0, symbol: "value-object", color: "#a855f7", group: "Dominio" },
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
  { type: "url", label: "URL", symbol: "interface", color: "#0e7490", group: "Distribución" },
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
  { type: "cmp:section", label: "Layout · Sección", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:zones", label: "Layout · Fila de zonas", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:toolbar", label: "Layout · Toolbar", symbol: "usecase", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:pageHeader", label: "Layout · Cabecera de página", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:hero", label: "Layout · Hero", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:scoreboard", label: "Layout · Scoreboard", symbol: "event", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:wizard", label: "Layout · Wizard", symbol: "flow", color: "#0ea5e9", group: "Layouts" },
  { type: "cmp:app", label: "Layout · Shell de app", symbol: "component", color: "#0ea5e9", group: "Layouts" },
  // …and the components that live inside those layouts.
  { type: "cmp:form", label: "Componente · Formulario", symbol: "interface", color: "#0284c7", group: "Componentes" },
  { type: "cmp:listing", label: "Componente · Listado", symbol: "lens", color: "#0284c7", group: "Componentes" },
  { type: "cmp:crud", label: "Componente · CRUD", symbol: "lens", color: "#0284c7", group: "Componentes" },
  { type: "cmp:filterBar", label: "Componente · Barra de filtros", symbol: "lens", color: "#0284c7", group: "Componentes" },
  { type: "cmp:button", label: "Componente · Botón", symbol: "usecase", color: "#0284c7", group: "Componentes" },
  { type: "cmp:fab", label: "Componente · Botón flotante", symbol: "usecase", color: "#0284c7", group: "Componentes" },
  { type: "cmp:field", label: "Componente · Campo", symbol: "gear", color: "#0284c7", group: "Componentes" },
  { type: "cmp:menuBar", label: "Componente · Menú", symbol: "process", color: "#0284c7", group: "Componentes" },
  { type: "cmp:appContext", label: "Componente · Selector de contexto", symbol: "process", color: "#0284c7", group: "Componentes" },
  { type: "cmp:addOnPicker", label: "Componente · Extras (add-ons)", symbol: "usecase", color: "#0284c7", group: "Componentes" },
  { type: "cmp:paymentPicker", label: "Componente · Pago", symbol: "usecase", color: "#0284c7", group: "Componentes" },
  { type: "cmp:chat", label: "Componente · Chat", symbol: "person", color: "#0284c7", group: "Componentes" },
  // The Mateu display vocabulary (design/figma/contract.json), read-only content.
  { type: "cmp:text", label: "Display · Texto", symbol: "readmodel", color: "#0284c7", group: "Display" },
  { type: "cmp:metricCard", label: "Display · Métrica", symbol: "event", color: "#0284c7", group: "Display" },
  { type: "cmp:kpi", label: "Display · KPI", symbol: "event", color: "#0284c7", group: "Display" },
  { type: "cmp:stat", label: "Display · Estadística", symbol: "event", color: "#0284c7", group: "Display" },
  { type: "cmp:notice", label: "Display · Aviso", symbol: "note", color: "#0284c7", group: "Display" },
  { type: "cmp:banner", label: "Display · Banner", symbol: "note", color: "#0284c7", group: "Display" },
  { type: "cmp:calloutCard", label: "Display · Callout", symbol: "note", color: "#0284c7", group: "Display" },
  { type: "cmp:bulletedList", label: "Display · Lista", symbol: "readmodel", color: "#0284c7", group: "Display" },
  { type: "cmp:statusList", label: "Display · Lista de estados", symbol: "readmodel", color: "#0284c7", group: "Display" },
  { type: "cmp:checklist", label: "Display · Checklist", symbol: "readmodel", color: "#0284c7", group: "Display" },
  { type: "cmp:fileList", label: "Display · Ficheros", symbol: "readmodel", color: "#0284c7", group: "Display" },
  { type: "cmp:separator", label: "Display · Separador", symbol: "flow", color: "#0284c7", group: "Display" },
  { type: "cmp:entityHeader", label: "Display · Cabecera de entidad", symbol: "person", color: "#0284c7", group: "Display" },
  { type: "cmp:emptyState", label: "Display · Estado vacío", symbol: "lens", color: "#0284c7", group: "Display" },
  { type: "cmp:skeleton", label: "Display · Esqueleto", symbol: "lens", color: "#0284c7", group: "Display" },
  { type: "cmp:progressBar", label: "Display · Barra de progreso", symbol: "flow", color: "#0284c7", group: "Display" },
  { type: "cmp:progressSteps", label: "Display · Pasos de progreso", symbol: "flow", color: "#0284c7", group: "Display" },
  { type: "cmp:taskProgress", label: "Display · Progreso de tareas", symbol: "flow", color: "#0284c7", group: "Display" },
  { type: "cmp:meter", label: "Display · Medidor", symbol: "gear", color: "#0284c7", group: "Display" },
  { type: "cmp:timeline", label: "Display · Línea de tiempo", symbol: "clock", color: "#0284c7", group: "Display" },
  { type: "cmp:calendar", label: "Display · Calendario", symbol: "clock", color: "#0284c7", group: "Display" },
  { type: "cmp:kanban", label: "Display · Kanban", symbol: "process", color: "#0284c7", group: "Display" },
  { type: "cmp:gantt", label: "Display · Gantt", symbol: "process", color: "#0284c7", group: "Display" },
  { type: "cmp:trendChart", label: "Display · Gráfica de tendencia", symbol: "event", color: "#0284c7", group: "Display" },
  { type: "cmp:heatmap", label: "Display · Mapa de calor", symbol: "event", color: "#0284c7", group: "Display" },
  { type: "cmp:funnel", label: "Display · Embudo", symbol: "event", color: "#0284c7", group: "Display" },
  { type: "cmp:orgChart", label: "Display · Organigrama", symbol: "person", color: "#0284c7", group: "Display" },
  { type: "cmp:featureGrid", label: "Display · Grid de features", symbol: "component", color: "#0284c7", group: "Display" },
  { type: "cmp:testimonials", label: "Display · Testimonios", symbol: "person", color: "#0284c7", group: "Display" },
  { type: "cmp:faq", label: "Display · FAQ", symbol: "note", color: "#0284c7", group: "Display" },
  { type: "cmp:commentThread", label: "Display · Comentarios", symbol: "person", color: "#0284c7", group: "Display" },
  { type: "cmp:comparisonCard", label: "Display · Comparativa", symbol: "readmodel", color: "#0284c7", group: "Display" },
  { type: "cmp:planningBoard", label: "Display · Planning (recursos × días)", symbol: "process", color: "#0284c7", group: "Display" },
  { type: "cmp:offerCard", label: "Display · Oferta", symbol: "note", color: "#0284c7", group: "Display" },
  { type: "cmp:pricingTable", label: "Display · Tabla de precios", symbol: "readmodel", color: "#0284c7", group: "Display" },
  { type: "cmp:processMonitor", label: "Display · Monitor de procesos", symbol: "gear", color: "#0284c7", group: "Display" },
  { type: "cmp:resourceGrid", label: "Display · Grid de recursos", symbol: "component", color: "#0284c7", group: "Display" },
  { type: "cmp:taskQueue", label: "Display · Cola de tareas", symbol: "process", color: "#0284c7", group: "Display" },
  { type: "cmp:ledger", label: "Display · Desglose (ledger)", symbol: "readmodel", color: "#0284c7", group: "Display" },
  { type: "cmp:markdown", label: "Display · Markdown", symbol: "readmodel", color: "#0284c7", group: "Display" },
  { type: "cmp:breadcrumbs", label: "Display · Migas de pan", symbol: "flow", color: "#0284c7", group: "Display" }
];
var Op = Object.defineProperty, Rp = Object.getOwnPropertyDescriptor, ot = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Rp(t, i) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Op(t, i, o), o;
};
const xi = 36, dt = 20, Ft = 210, Ii = 176, Mt = 46, xo = 36, Np = 60, Dp = 46, Io = 60, wo = {
  ACTOR: { fill: "#ffffff", stroke: "#64748b" },
  APP: { fill: "#f0f9ff", stroke: "#0ea5e9" },
  PAGE: { fill: "#f0f9ff", stroke: "#0ea5e9" },
  USE_CASE: { fill: "#ecfeff", stroke: "#06b6d4" },
  AGGREGATE: { fill: "#f5f3ff", stroke: "#8b5cf6" },
  DOMAIN_SERVICE: { fill: "#fff1f2", stroke: "#f43f5e" },
  QUERY_SERVICE: { fill: "#f0f9ff", stroke: "#0284c7" },
  READ_MODEL: { fill: "#ecfdf5", stroke: "#10b981" },
  EXTERNAL_SYSTEM: { fill: "#ffffff", stroke: "#64748b" },
  API: { fill: "#eef2ff", stroke: "#4f46e5" },
  API_OPERATION: { fill: "#eef2ff", stroke: "#4f46e5" },
  AI_AGENT: { fill: "#faf5ff", stroke: "#9333ea" },
  PROCESS: { fill: "#f5f3ff", stroke: "#7c3aed" },
  WORKFLOW: { fill: "#ede9fe", stroke: "#6d28d9" },
  UNKNOWN: { fill: "#f8fafc", stroke: "#94a3b8" }
}, ko = {
  ACTOR: "ACTOR",
  APP: "APP",
  PAGE: "PÁGINA",
  USE_CASE: "CASO DE USO",
  AGGREGATE: "AGREGADO",
  DOMAIN_SERVICE: "SERV. DOMINIO",
  QUERY_SERVICE: "QUERY",
  READ_MODEL: "READ MODEL",
  EXTERNAL_SYSTEM: "EXTERNO",
  API: "API",
  API_OPERATION: "OP. API",
  AI_AGENT: "AGENTE IA",
  PROCESS: "PROCESO",
  WORKFLOW: "WORKFLOW",
  UNKNOWN: "REF"
}, $o = {
  COMMAND: "Comando",
  QUERY: "Query",
  EVENT: "Evento",
  EXTERNAL: "Externa"
};
let Ye = class extends je {
  constructor() {
    super(...arguments), this.interaction = null, this.editable = !1, this.model = null, this._selectedMessageId = null, this._selectedParticipantRef = null, this._connect = null, this._reorder = null, this._editor = null, this.onWindowPointerMove = (e) => {
      const t = this.svgPoint(e);
      if (this._connect && (this._connect = { ...this._connect, x: t.x, y: t.y }), this._reorder) {
        const i = this._reorder.moved || Math.abs(t.y - this._reorder.startY) > 5;
        this._reorder = { ...this._reorder, y: t.y, moved: i };
      }
    }, this.onWindowPointerUp = (e) => {
      window.removeEventListener("pointermove", this.onWindowPointerMove);
      const t = this.interaction;
      if (!t || !this.editable) {
        this._connect = null, this._reorder = null;
        return;
      }
      const i = this.svgPoint(e);
      if (this._connect) {
        const { fromRef: n } = this._connect;
        this._connect = null;
        const o = this.colAtX(i.x);
        if (o >= 0) {
          const s = this.participants(), a = s[o], r = s.find((f) => f.ref === n) ?? { ref: n }, l = this.model ? xp(this.model, r, a) : { kind: "COMMAND" }, u = {
            id: `msg-${crypto.randomUUID().slice(0, 8)}`,
            fromRef: n,
            toRef: a.ref,
            kind: l.kind,
            label: l.label,
            backed: this.model ? yo(
              this.model,
              { fromRef: n, toRef: a.ref, kind: l.kind, label: l.label },
              dn(this.model, t).typeOf
            ) : !1
          }, h = this.indexAtY(i.y), m = ii(t);
          this._selectedMessageId = u.id, this.changed({
            ...t,
            participants: m,
            messages: Ip(t.messages, u, h)
          });
        }
      }
      if (this._reorder) {
        const { id: n, moved: o } = this._reorder;
        if (this._reorder = null, o) {
          const s = this.indexAtY(i.y, n);
          this.changed({ ...t, messages: wp(t.messages, n, s) });
        }
      }
    };
  }
  emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  // ── layout ──────────────────────────────────────────────────────────────
  participants() {
    return this.interaction ? ii(this.interaction) : [];
  }
  xOf(e) {
    return xi + Ii / 2 + e * Ft;
  }
  rowH(e) {
    return e.kind === "COMMAND" || e.kind === "QUERY" ? Np : Dp;
  }
  messageRows() {
    var n;
    const e = ((n = this.interaction) == null ? void 0 : n.messages) ?? [], t = pa(e);
    let i = dt + Mt + xo;
    return e.map((o, s) => {
      const a = { m: o, y: i, num: t[s] };
      return i += this.rowH(o), a;
    });
  }
  diagramSize() {
    const e = this.participants(), t = this.messageRows(), i = t.length ? t[t.length - 1].y + this.rowH(t[t.length - 1].m) : dt + Mt + xo;
    return {
      w: Math.max(xi * 2 + Ii + Math.max(0, e.length - 1) * Ft + 60, 320),
      h: i + Io
    };
  }
  /** The insertion index a drop at this svg y produces (excluding one message). */
  indexAtY(e, t) {
    const i = this.messageRows().filter((o) => o.m.id !== t);
    let n = 0;
    for (const o of i) e > o.y + this.rowH(o.m) / 2 && n++;
    return n;
  }
  /** Nearest lifeline column within half a pitch (−1 = none). */
  colAtX(e) {
    const t = this.participants();
    let i = -1, n = Ft / 2;
    return t.forEach((o, s) => {
      const a = Math.abs(e - this.xOf(s));
      a < n && (n = a, i = s);
    }), i;
  }
  svgPoint(e) {
    const t = this.renderRoot.querySelector("svg").getBoundingClientRect();
    return { x: e.clientX - t.left, y: e.clientY - t.top };
  }
  // ── gestures ────────────────────────────────────────────────────────────
  changed(e) {
    this.emit("interaction-changed", e);
  }
  onLifelinePointerDown(e, t) {
    var n;
    if (!this.editable) return;
    e.stopPropagation(), (n = this.renderRoot.querySelector("svg")) == null || n.focus();
    const i = this.svgPoint(e);
    this._connect = { fromRef: t, x: i.x, y: i.y }, this._selectedMessageId = null, this._selectedParticipantRef = null, window.addEventListener("pointermove", this.onWindowPointerMove), window.addEventListener("pointerup", this.onWindowPointerUp, { once: !0 });
  }
  onMessagePointerDown(e, t) {
    var n;
    if (e.stopPropagation(), (n = this.renderRoot.querySelector("svg")) == null || n.focus(), this._selectedMessageId = t.id, this._selectedParticipantRef = null, !this.editable) return;
    const i = this.svgPoint(e);
    this._reorder = { id: t.id, startY: i.y, y: i.y, moved: !1 }, window.addEventListener("pointermove", this.onWindowPointerMove), window.addEventListener("pointerup", this.onWindowPointerUp, { once: !0 });
  }
  onMessageDblClick(e, t) {
    if (!this.editable) return;
    e.stopPropagation();
    const n = this.renderRoot.querySelector("svg").getBoundingClientRect();
    this._editor = {
      messageId: t.id,
      x: e.clientX - n.left,
      y: e.clientY - n.top,
      label: t.label ?? "",
      guard: t.guard ?? "",
      kind: t.kind
    };
  }
  commitEditor() {
    const e = this._editor, t = this.interaction;
    if (!e || !t) return;
    this._editor = null;
    const i = this.model ? dn(this.model, t) : null;
    this.changed({
      ...t,
      messages: t.messages.map(
        (n) => n.id === e.messageId ? {
          ...n,
          label: e.label.trim() || void 0,
          guard: e.guard.trim() || void 0,
          kind: e.kind,
          backed: i ? yo(this.model, { ...n, kind: e.kind }, i.typeOf) : n.backed
        } : n
      )
    });
  }
  onKeydown(e) {
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA")) return;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !e.shiftKey) {
      this.emit("undo-requested"), e.preventDefault();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "y" || e.shiftKey && e.key.toLowerCase() === "z")) {
      this.emit("redo-requested"), e.preventDefault();
      return;
    }
    if (!this.editable || e.key !== "Delete" && e.key !== "Backspace") return;
    const i = this.interaction;
    if (i) {
      if (this._selectedMessageId) {
        const n = this._selectedMessageId;
        this._selectedMessageId = null, this.changed({ ...i, messages: kp(i.messages, n) }), e.preventDefault();
      } else if (this._selectedParticipantRef) {
        const n = this._selectedParticipantRef;
        this._selectedParticipantRef = null, this.changed($p(i, n)), e.preventDefault();
      }
    }
  }
  // ── render ──────────────────────────────────────────────────────────────
  kindStyle(e) {
    if (e.backed === !1)
      return {
        color: "#f59e0b",
        marker: e.kind === "EVENT" ? "seq-open-warn" : "seq-filled-warn",
        dashed: !0
      };
    switch (e.kind) {
      case "EVENT":
        return { color: "#f59e0b", marker: "seq-open-event", dashed: !1 };
      case "EXTERNAL":
        return { color: "var(--modux-edge, #64748b)", marker: "seq-filled-ext", dashed: !1 };
      default:
        return { color: "var(--modux-text, #334155)", marker: "seq-filled-sync", dashed: !1 };
    }
  }
  renderHeader(e, t) {
    const i = this.xOf(t), n = wo[e.type] ?? wo.UNKNOWN, o = this._selectedParticipantRef === e.ref, s = e.name.length > 24 ? `${e.name.slice(0, 22)}…` : e.name;
    return J`
      <g
        style="cursor: ${this.editable ? "pointer" : "default"}"
        @click=${(a) => {
      var r;
      a.stopPropagation(), (r = this.renderRoot.querySelector("svg")) == null || r.focus(), this._selectedParticipantRef = e.ref, this._selectedMessageId = null;
    }}
      >
        <title>${e.name} — ${ko[e.type] ?? e.type}</title>
        <rect
          x=${i - Ii / 2} y=${dt} width=${Ii} height=${Mt} rx="10"
          fill=${n.fill}
          style=${"stroke: " + (o ? "var(--modux-primary, #2563eb)" : n.stroke)}
          stroke-width=${o ? 2.2 : 1.4}
        ></rect>
        <text x=${i} y=${dt + 19} text-anchor="middle" font-size="12" font-weight="600" style="fill: var(--modux-text, #1e293b)">${s}</text>
        <text x=${i} y=${dt + 35} text-anchor="middle" font-size="8.5" letter-spacing="0.08em" fill=${n.stroke}>${ko[e.type] ?? e.type}</text>
      </g>
    `;
  }
  renderMessage(e) {
    const { m: t, y: i, num: n } = e, o = this.participants(), s = o.findIndex((A) => A.ref === t.fromRef), a = o.findIndex((A) => A.ref === t.toRef);
    if (s < 0 || a < 0) return J``;
    const r = this.xOf(s), l = this.xOf(a), u = this.kindStyle(t), h = this._selectedMessageId === t.id, m = t.backed === !1, f = `${t.label ?? ""}${t.guard ? ` [${t.guard}]` : ""}`, g = f.length > 46 ? `${f.slice(0, 44)}…` : f, v = s === a, b = l >= r, d = v || b ? r + 6 : r - 6, c = v ? r + 52 : (r + l) / 2, y = v ? J`<path
          d="M ${r} ${i} H ${r + 44} V ${i + 16} H ${r + 2}"
          fill="none"
          style=${"stroke: " + u.color}
          stroke-width="1.6"
          stroke-dasharray=${u.dashed ? "5 4" : "none"}
          marker-end="url(#${u.marker})"
        ></path>` : J`<line
          x1=${b ? r + 2 : r - 2} y1=${i}
          x2=${b ? l - 2 : l + 2} y2=${i}
          style=${"stroke: " + u.color}
          stroke-width="1.6"
          stroke-dasharray=${u.dashed ? "5 4" : "none"}
          marker-end="url(#${u.marker})"
        ></line>`, _ = !v && (t.kind === "COMMAND" || t.kind === "QUERY") ? J`<line
            x1=${b ? l - 2 : l + 2} y1=${i + 16}
            x2=${b ? r + 2 : r - 2} y2=${i + 16}
            style="stroke: var(--modux-edge, #94a3b8)"
            stroke-width="1"
            stroke-dasharray="4 4"
            marker-end="url(#seq-ret)"
          ></line>` : "";
    return J`
      <g
        style="cursor: ${this.editable ? "grab" : "default"}"
        @pointerdown=${(A) => this.onMessagePointerDown(A, t)}
        @dblclick=${(A) => this.onMessageDblClick(A, t)}
      >
        <title>${m ? "sin respaldo en el modelo — materialízalo o ajústalo" : `${$o[t.kind]}${f ? ` · ${f}` : ""}`}</title>
        ${h ? J`<line
              x1=${Math.min(r, l)} y1=${i}
              x2=${v ? r + 46 : Math.max(r, l)} y2=${i}
              style="stroke: var(--modux-primary, #2563eb)" stroke-width="7" opacity="0.22"
            ></line>` : ""}
        <!-- fat invisible hit area: the thin arrow stays easy to grab -->
        <line
          x1=${Math.min(r, l)} y1=${i} x2=${v ? r + 46 : Math.max(r, l)} y2=${i}
          stroke="transparent" stroke-width="14"
        ></line>
        ${y}
        ${_}
        <text x=${d} y=${i - 6} text-anchor=${b ? "start" : "end"} font-size="10" style="fill: var(--modux-text-dim, #64748b)">${n}</text>
        <text
          x=${c} y=${i - 8} text-anchor=${v ? "start" : "middle"}
          font-size="11.5"
          font-style=${t.kind === "QUERY" ? "italic" : "normal"}
          style=${"fill: " + (m ? "#b45309" : "var(--modux-text, #1e293b)")}
        >${m ? J`<tspan fill="#b45309">⚠ </tspan>` : ""}${g}</text>
        ${m && this.editable ? J`<text
              class="materialize"
              x=${b ? l - 4 : l + 4} y=${i - 8}
              text-anchor=${b ? "end" : "start"}
              font-size="12"
              @pointerdown=${(A) => A.stopPropagation()}
              @click=${(A) => {
      A.stopPropagation(), this.emit("interaction-materialize", { messageId: t.id });
    }}
            ><title>Materializar: crea en el modelo la pieza que respalda este mensaje</title>✨</text>` : ""}
      </g>
    `;
  }
  render() {
    var a;
    const e = this.interaction, t = this.participants(), i = this.messageRows(), { w: n, h: o } = this.diagramSize(), s = o - Io + 20;
    return I`
      <div class="inner" style="width: ${n}px; height: ${o}px">
        <svg
          width=${n} height=${o}
          tabindex="0"
          @keydown=${this.onKeydown}
          @pointerdown=${() => {
      this._selectedMessageId = null, this._selectedParticipantRef = null, this._editor && this.commitEditor();
    }}
        >
          <defs>
            <marker id="seq-filled-sync" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" style="fill: var(--modux-text, #334155)"></path>
            </marker>
            <marker id="seq-filled-ext" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" style="fill: var(--modux-edge, #64748b)"></path>
            </marker>
            <marker id="seq-open-event" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10" fill="none" stroke="#f59e0b" stroke-width="1.8"></path>
            </marker>
            <marker id="seq-filled-warn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b"></path>
            </marker>
            <marker id="seq-open-warn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10" fill="none" stroke="#f59e0b" stroke-width="1.8"></path>
            </marker>
            <marker id="seq-ret" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10" fill="none" style="stroke: var(--modux-edge, #94a3b8)" stroke-width="1.4"></path>
            </marker>
          </defs>
          <!-- lifelines (hit rects below the messages) -->
          ${t.map((r, l) => {
      const u = this.xOf(l);
      return J`
              <line
                x1=${u} y1=${dt + Mt} x2=${u} y2=${s}
                style="stroke: var(--modux-border, #cbd5e1)" stroke-width="1.2" stroke-dasharray="6 5"
              ></line>
              ${this.editable ? J`<rect
                    x=${u - Ft / 2 + 10} y=${dt + Mt}
                    width=${Ft - 20} height=${Math.max(0, s - dt - Mt)}
                    fill="transparent"
                    style="cursor: crosshair"
                    @pointerdown=${(h) => this.onLifelinePointerDown(h, r.ref)}
                  ><title>Arrastra hasta otra línea de vida para crear un mensaje</title></rect>` : ""}
            `;
    })}
          ${t.map((r, l) => this.renderHeader(r, l))}
          ${i.map((r) => this.renderMessage(r))}
          ${this._connect ? J`<line
                x1=${this.xOf(t.findIndex((r) => r.ref === this._connect.fromRef))}
                y1=${this._connect.y}
                x2=${this._connect.x}
                y2=${this._connect.y}
                style="stroke: var(--modux-primary, #2563eb)" stroke-width="1.4" stroke-dasharray="5 4"
                marker-end="url(#seq-filled-sync)"
              ></line>` : ""}
          ${(a = this._reorder) != null && a.moved ? J`<line
                x1=${xi / 2} y1=${this._reorder.y} x2=${n - xi / 2} y2=${this._reorder.y}
                style="stroke: var(--modux-primary, #2563eb)" stroke-width="1.4" stroke-dasharray="7 5"
              ></line>` : ""}
        </svg>
        ${e && !t.length && !i.length ? I`<div class="empty">
              Sin participantes todavía — añádelos con «＋ Participante…» y arrastra entre
              líneas de vida para crear mensajes
            </div>` : ""}
        ${this._editor ? I`
              <div class="msg-editor" style="left: ${this._editor.x}px; top: ${this._editor.y}px">
                <input
                  class="label"
                  placeholder="Etiqueta del mensaje…"
                  .value=${this._editor.label}
                  @input=${(r) => this._editor = { ...this._editor, label: r.target.value }}
                  @keydown=${(r) => {
      r.key === "Enter" && this.commitEditor(), r.key === "Escape" && (this._editor = null), r.stopPropagation();
    }}
                />
                <input
                  class="guard"
                  placeholder="[guarda]"
                  .value=${this._editor.guard}
                  @input=${(r) => this._editor = { ...this._editor, guard: r.target.value }}
                  @keydown=${(r) => {
      r.key === "Enter" && this.commitEditor(), r.key === "Escape" && (this._editor = null), r.stopPropagation();
    }}
                />
                <select
                  @change=${(r) => this._editor = {
      ...this._editor,
      kind: r.target.value
    }}
                >
                  ${["COMMAND", "QUERY", "EVENT", "EXTERNAL"].map(
      (r) => I`<option value=${r} ?selected=${r === this._editor.kind}>
                        ${$o[r]}
                      </option>`
    )}
                </select>
                <button @click=${this.commitEditor}>✓</button>
                <button class="cancel" @click=${() => this._editor = null}>✕</button>
              </div>
            ` : ""}
      </div>
    `;
  }
};
Ye.styles = nt`
    :host {
      display: block;
      position: relative;
      overflow: auto;
      background: var(--modux-canvas-bg, #ffffff);
      outline: none;
      user-select: none;
    }
    .inner {
      position: relative;
    }
    svg {
      display: block;
    }
    .empty {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--modux-text-faint, #94a3b8);
      font: 13px ui-sans-serif, system-ui, sans-serif;
      text-align: center;
      padding: 24px;
      pointer-events: none;
    }
    .msg-editor {
      position: absolute;
      z-index: 20;
      display: flex;
      gap: 6px;
      align-items: center;
      background: var(--modux-surface, #ffffff);
      border: 1px solid var(--modux-border, #cbd5e1);
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
      padding: 8px;
      transform: translate(-50%, -100%);
    }
    .msg-editor input,
    .msg-editor select {
      font: 12px ui-sans-serif, system-ui, sans-serif;
      padding: 4px 6px;
      border: 1px solid var(--modux-border-strong, #cbd5e1);
      border-radius: 6px;
      background: var(--modux-input-bg, #ffffff);
      color: var(--modux-text, #1e293b);
    }
    .msg-editor input.label {
      width: 200px;
    }
    .msg-editor input.guard {
      width: 110px;
    }
    .msg-editor button {
      border: none;
      background: var(--modux-primary, #1e293b);
      color: var(--modux-primary-text, #ffffff);
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 12px;
      cursor: pointer;
    }
    .msg-editor button.cancel {
      background: transparent;
      color: var(--modux-text-dim, #64748b);
    }
    text {
      font-family: ui-sans-serif, system-ui, sans-serif;
    }
    .materialize {
      cursor: pointer;
    }
  `;
ot([
  de({ attribute: !1 })
], Ye.prototype, "interaction", 2);
ot([
  de({ type: Boolean })
], Ye.prototype, "editable", 2);
ot([
  de({ attribute: !1 })
], Ye.prototype, "model", 2);
ot([
  U()
], Ye.prototype, "_selectedMessageId", 2);
ot([
  U()
], Ye.prototype, "_selectedParticipantRef", 2);
ot([
  U()
], Ye.prototype, "_connect", 2);
ot([
  U()
], Ye.prototype, "_reorder", 2);
ot([
  U()
], Ye.prototype, "_editor", 2);
Ye = ot([
  mt("modux-sequence")
], Ye);
var Lp = Object.defineProperty, Up = Object.getOwnPropertyDescriptor, ne = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Up(t, i) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Lp(t, i, o), o;
};
const ln = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, zp = Object.keys(ln);
function qp(e, t) {
  switch (t) {
    case "boundedContext":
      return { elementType: "boundedContext", id: e.replace(/^tgt:/, "") };
    case "aggregate":
      return { elementType: "aggregate", id: e };
    case "use-case":
      return { elementType: "use-case", id: e };
    case "entity":
      return { elementType: "entity", id: e };
    case "value-object":
      return { elementType: "value-object", id: e };
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
    case "url":
      return { elementType: "url", id: e };
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
function Bp(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((o) => o.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let ie = class extends je {
  constructor() {
    super(...arguments), this.model = {
      boundedContexts: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !0, this._yugo = !0, this._showDerived = !0, this.repositories = [], this.dark = !1, this._pendingNames = /* @__PURE__ */ new Set(), this._paletteOpenedForBlank = !1, this._repoPicker = null, this._wfStepPicker = null, this._branchCondEditor = null, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newBoundedContextId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._interactionId = null, this._editingInteraction = null, this._interactionMode = "authored", this.derivedInteraction = null, this._derivePending = !1, this._interactionPrompt = null, this._interactionDelete = null, this._connectPicker = null, this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
      this._fullscreen = this.matches(":fullscreen");
    }, this.hostKeydown = (e) => {
      var s;
      const t = e.composedPath()[0], i = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (i === "input" || i === "textarea" || i === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const n = this.renderRoot.querySelector("modux-canvas"), o = (a) => {
        e.preventDefault(), this.onDiagramScopeChange(a);
      };
      switch (e.key) {
        case "p":
        case "P":
          ["context-map", "distribution", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view) && (e.preventDefault(), this._paletteOpen = !this._paletteOpen);
          break;
        case "y":
        case "Y":
          this._view !== "design" && this._view !== "interactions" && (e.preventDefault(), this._yugo = !this._yugo, this._yugo && (this._tilt = !1));
          break;
        case "f":
        case "F":
          e.preventDefault(), this.toggleFullscreen();
          break;
        case "0":
          e.preventDefault(), n == null || n.fit(), (s = this.renderRoot.querySelector("modux-explorer")) == null || s.fit();
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
          o("view:eventstorming");
          break;
        case "a":
        case "A":
          o("view:aggregates");
          break;
        case "1":
          o("view:context-map");
          break;
        case "2":
          o("view:interactions");
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
      const { id: t, appId: i, beforeId: n, nestRowId: o } = e.detail, s = Ce(t);
      if (!(s != null && s.itemId)) return;
      const a = this.menuEntryIn(s.appId, s.itemId);
      if (!a) return;
      const r = (l, u) => (l ?? []).some((h) => h.id === u || r(h.children, u));
      if (o) {
        const l = Ce(o);
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
      if (n) {
        const l = Ce(n);
        if (!(l != null && l.itemId) || l.itemId === s.itemId) return;
        const u = this.menuEntryIn(l.appId, l.itemId);
        if (!u || s.appId === l.appId && r(a.entry.children, l.itemId) || s.appId === l.appId && u.parentId === a.parentId && a.beforeId === l.itemId)
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
      i && this.command({ kind: "move-menu-item", appId: s.appId, toAppId: i, itemId: s.itemId });
    }, this.onWizardSlotRequested = (e) => {
      var s;
      const { id: t, beforeId: i } = e.detail, n = /^wizrow:([^:]+):(.+)$/.exec(t);
      if (!n) return;
      const o = i ? ((s = /^wizrow:[^:]+:(.+)$/.exec(i)) == null ? void 0 : s[1]) ?? null : null;
      this.moveWizardStep(n[1], n[2], o);
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
      const { fromPageId: t, toPageId: i, componentId: n, toParentId: o, beforeComponentId: s } = e.detail, a = this.componentIn(t, n);
      if (!a || t === i) return;
      const r = JSON.parse(JSON.stringify(a.node)), { ops: l } = this.rebuildComponentOps(i, r, o ?? void 0, s);
      for (const u of l) this.command(u, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: n }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: n },
        ...this.rebuildComponentOps(t, r, a.parentId ?? void 0, a.beforeId).ops
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
   * Each vista is a full sheet of its own: with one active, the diagram (and the
   * distribution lens) keep geometry AND expansion under the vista's key — coming
   * back must look exactly as it was left. «Todo el modelo» lives on the base keys.
   */
  layoutKey(e) {
    return (e === "context-map" || e === "distribution") && this._activeViewId ? `${e}@view:${this._activeViewId}` : e;
  }
  viewLayout(e) {
    return ft(this.layout[this.layoutKey(e)]);
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
    const i = { ...this.layout };
    for (const n of Object.keys(i)) {
      const o = ft(i[n]);
      if (!(e in o.nodes) && !(e in (o.sizes ?? {}))) continue;
      const s = { ...o.nodes };
      delete s[e];
      const a = { ...o.sizes ?? {} };
      delete a[e], i[n] = { ...o, nodes: s, sizes: a }, t = !0;
    }
    t && (this.layout = i, this.emit("layout-changed", { layout: this.layout }));
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    var t;
    if (e.has("model") && this._pendingNames.clear(), e.has("model") && this.pruneStaleEdgePoints(), e.has("model") && this._interactionMode === "authored" && this._interactionId) {
      const i = (this.model.interactions ?? []).find((n) => n.id === this._interactionId);
      if (i) {
        const n = JSON.parse(JSON.stringify(i)), o = ii(n), s = (((t = this._editingInteraction) == null ? void 0 : t.participants) ?? []).filter(
          (a) => !o.some((r) => r.ref === a.ref) && !n.messages.some((r) => r.fromRef === a.ref || r.toRef === a.ref)
        );
        s.length && (n.participants = [...o, ...s]), this._editingInteraction = n;
      } else
        this._editingInteraction = null, this._interactionId = null;
    }
    e.has("derivedInteraction") && this._derivePending && this.derivedInteraction && (this._derivePending = !1, window.clearTimeout(this._deriveTimer)), e.has("model") && !this._paletteOpenedForBlank && this.model.boundedContexts.length === 0 && this.model.externalSystems.length === 0 && (this._paletteOpen = !0, this._paletteOpenedForBlank = !0), (e.has("layout") || e.has("model")) && (this.migrateLevelLayouts(), this.migrateNestedGeometry());
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
      (n) => n === "context-map" || n.startsWith("context-map@view:") || n === "distribution" || n.startsWith("distribution@view:")
    );
    let t = !1;
    const i = { ...this.layout };
    for (const n of e) {
      const o = ft(i[n]);
      if (o.flat) continue;
      const s = Eo(
        this.model,
        n.startsWith("distribution") ? "distribution" : "unified"
      ), a = /* @__PURE__ */ new Map(), r = (m, f = 0) => {
        if (f > 12) return o.nodes[m] ?? null;
        const g = a.get(m);
        if (g) return g;
        const v = o.nodes[m], b = s.get(m);
        if (!b)
          return v && a.set(m, v), v ?? null;
        if (!v) return null;
        const d = r(b, f + 1), c = d ? { x: d.x + v.x, y: d.y + v.y } : v;
        return a.set(m, c), c;
      }, l = {};
      for (const m of Object.keys(o.nodes))
        l[m] = r(m) ?? o.nodes[m];
      const u = new Set(s.values()), h = { ...o.sizes ?? {} };
      for (const m of Object.keys(h)) u.has(m) && delete h[m];
      i[n] = { ...o, nodes: l, sizes: h, flat: !0 }, t = !0;
    }
    t && (this.layout = i, this.emit("layout-changed", { layout: this.layout }));
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
    const e = ft(this.layout["context-map"]), t = ["context-map@detail", "context-map@operations", "context-map@distribution"];
    if (!(e.detail !== void 0 || t.some((h) => this.layout[h])) || !this.model.boundedContexts.length && !this.model.externalSystems.length) return;
    const n = { ...this.layout }, o = (h) => ft(n[h]), s = e.detail ?? "contexts", a = s === "detail" && n["context-map@detail"] ? o("context-map@detail") : s === "operations" && n["context-map@operations"] ? o("context-map@operations") : e, r = {
      nodes: { ...a.nodes },
      edges: { ...a.edges },
      sizes: { ...a.sizes ?? {} }
    };
    for (const h of ["context-map", "context-map@detail", "context-map@operations"]) {
      const m = o(h);
      for (const [f, g] of Object.entries(m.nodes)) f in r.nodes || (r.nodes[f] = g);
      for (const [f, g] of Object.entries(m.sizes ?? {})) f in r.sizes || (r.sizes[f] = g);
    }
    const l = /* @__PURE__ */ new Set();
    if (s === "contexts" || s === "distribution")
      for (const h of e.collapsed ?? []) l.add(h);
    else {
      const h = new Set(a.collapsed ?? []);
      for (const m of this.model.boundedContexts) l.add(m.id);
      for (const m of this.model.externalSystems) l.add(m.id);
      if (s === "operations") {
        for (const m of this.model.apis ?? []) l.add(m.id);
        for (const m of this.model.proxyApis ?? []) l.add(m.id);
        for (const m of this.model.apiImplementations ?? [])
          l.add(`apiimpl:${m.apiId}@${m.boundedContextId}`);
      }
      for (const m of h) l.delete(m);
    }
    n["context-map"] = { nodes: r.nodes, edges: r.edges, sizes: r.sizes, expanded: [...l] };
    const u = n["context-map@distribution"];
    if (u && !n.distribution) {
      const h = ft(u);
      n.distribution = {
        nodes: h.nodes,
        edges: h.edges,
        sizes: h.sizes,
        expanded: h.collapsed ?? []
      };
    }
    for (const h of t) delete n[h];
    this.layout = n, this.emit("layout-changed", { layout: this.layout });
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
    const i = this.sceneFor(this._view), n = new Set(i.edges.map((r) => r.id)), o = new Set(i.nodes.map((r) => r.id)), s = t.filter((r) => {
      if (n.has(r)) return !1;
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
    const t = this.viewLayout(e), i = this.sceneFor(e).nodes.filter(
      (a) => !a.parentId && !a.ownerId && a.kind !== "area"
    ), n = Ua(i), o = [...n.keys()].map((a) => ({
      kind: "move-node",
      view: e,
      id: a,
      pos: t.nodes[a] ?? null
    })), s = { ...t.nodes };
    for (const [a, r] of n) {
      const l = i.find((h) => h.id === a), u = t.nodes[a] ?? { x: l.x, y: l.y };
      s[a] = {
        x: Math.round(u.x + (r.x - l.x)),
        y: Math.round(u.y + (r.y - l.y))
      };
    }
    this.writeViewLayout(e, { ...t, nodes: s }), o.length && this.pushUndoEntry(o);
  }
  /**
   * Display-time edge routing: edges whose straight orthogonal path would run
   * over a foreign node get orthogonal detour bends, recomputed with every scene
   * (no persistence, so they follow every level change and drag) — this is what
   * keeps the lines horizontal/vertical and off the boxes on every diagram view.
   * Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (!e.edges.length) return t;
    const i = yc(e, t);
    return i.size ? { ...t, ...Object.fromEntries(i) } : t;
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
        t.points ? n[t.id] = t.points : delete n[t.id], this.writeViewLayout(t.view, { ...i, edges: n });
      } else if (t.kind === "resize-node") {
        const i = this.viewLayout(t.view), n = { ...i.sizes ?? {} };
        t.size ? n[t.id] = t.size : delete n[t.id], this.writeViewLayout(t.view, { ...i, sizes: n });
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
    const { id: t, x: i, y: n } = e.detail, o = this._view, s = this.viewLayout(o), a = s.nodes[t] ?? null;
    let r = { x: i, y: n };
    const l = this.sceneFor(o), u = l.nodes.find((m) => m.id === t);
    if (u != null && u.parentId) {
      const m = l.nodes.find((f) => f.id === u.parentId);
      m && (r = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(o, { ...s, nodes: { ...s.nodes, [t]: r } });
    const h = [{ kind: "move-node", view: o, id: t, pos: a }];
    if (o === "processes") {
      const m = this.stepReorderCommand(t);
      if (m) {
        const f = this.inverseOf(m);
        f && h.unshift(...f), this.command(m, !1);
      }
    }
    this.pushUndoEntry(h);
  }
  /**
   * A Shift/Ctrl-drag dropped an API chip on a new home: another external system
   * re-homes the API; empty canvas un-nests it (back to a standalone contract).
   * Publisher change and drop position travel in ONE undo entry.
   */
  onNodeReparentRequested(e) {
    const { id: t, targetId: i, x: n, y: o } = e.detail, s = this.model.externalSystems.find((b) => b.id === t);
    if (s) {
      const b = i ? this.model.externalSystems.find((N) => N.id === i) : null;
      if (i && !b) return;
      for (let N = b; N; ) {
        if (N.id === t) return;
        const V = N.parentExternalSystemId;
        N = V ? this.model.externalSystems.find((G) => G.id === V) ?? null : null;
      }
      const d = (b == null ? void 0 : b.id) ?? null;
      if ((s.parentExternalSystemId ?? null) === d) return;
      const c = this._view, y = this.viewLayout(c), _ = this.sceneFor(c), A = d ? _.nodes.find((N) => N.id === d) : void 0, S = A ? { x: n - A.x, y: o - A.y } : { x: n, y: o }, E = d ? (this.model.externalSystemDependencies ?? []).filter(
        (N) => N.sourceId === t && N.targetId === d || N.sourceId === d && N.targetId === t
      ) : [];
      this.pushUndoEntry([
        { kind: "set-external-system-parent", id: t, parentId: s.parentExternalSystemId ?? null },
        ...E.map((N) => ({
          kind: "add-external-dependency",
          sourceId: N.sourceId,
          targetId: N.targetId,
          ...N.type === "CQRS" ? { type: "CQRS" } : {}
        })),
        { kind: "move-node", view: c, id: t, pos: y.nodes[t] ?? null }
      ]), this.command({ kind: "set-external-system-parent", id: t, parentId: d }, !1), this.writeViewLayout(c, { ...y, nodes: { ...y.nodes, [t]: S } });
      return;
    }
    const a = (this.model.apis ?? []).find((b) => b.id === t) ?? (this.model.proxyApis ?? []).find((b) => b.id === t);
    if (!a || i && !this.model.externalSystems.some((b) => b.id === i)) return;
    const r = a.publishedByExternalSystemId ?? "", l = i ?? "";
    if (l === r) return;
    const u = this._view, h = this.viewLayout(u), m = this.sceneFor(u), f = l ? m.nodes.find((b) => b.id === l) : void 0, g = f ? { x: n - f.x, y: o - f.y } : { x: n, y: o }, v = [
      { kind: "set-api-publisher", id: t, targetId: r },
      { kind: "move-node", view: u, id: t, pos: h.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: l }, !1), this.writeViewLayout(u, { ...h, nodes: { ...h.nodes, [t]: g } }), this.pushUndoEntry(v);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: o } = e.detail, s = (this.model.apis ?? []).find((v) => v.id === t), a = this.model.externalSystems.find((v) => v.id === i);
    if (!s || !a || (this.model.proxyApis ?? []).some(
      (v) => v.targetApiId === t && v.publishedByExternalSystemId === i
    )) return;
    const l = `proxy-${ce(s.name)}-${ce(a.name)}`;
    if ((this.model.proxyApis ?? []).some((v) => v.id === l)) return;
    const u = this._view, h = this.viewLayout(u), f = this.sceneFor(u).nodes.find((v) => v.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: l,
        name: `${s.name}@${a.name}`,
        targetId: t,
        boundedContextId: i
      },
      !1
    );
    const g = [{ kind: "remove-proxy-api", id: l }];
    f && (g.push({ kind: "move-node", view: u, id: l, pos: h.nodes[l] ?? null }), this.writeViewLayout(u, {
      ...h,
      nodes: { ...h.nodes, [l]: { x: n - f.x, y: o - f.y } }
    })), this.pushUndoEntry(g);
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
    var r, l, u;
    const t = e.target, i = (r = t.files) == null ? void 0 : r[0];
    if (t.value = "", !i) return;
    const n = await i.text(), o = this.selectedApiId(), s = o ? null : ((l = this.model.externalSystems.find((h) => h.id === this._selectedId)) == null ? void 0 : l.id) ?? null, a = o || s ? null : ((u = this.model.boundedContexts.find((h) => h.id === this._selectedId)) == null ? void 0 : u.id) ?? null;
    if (!o && !s && !a) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: n,
      fileName: i.name,
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
    const { id: t } = e.detail, i = this._view, n = this.viewLayout(i), o = new Set(n.expanded ?? []), s = !o.has(t);
    s ? o.add(t) : o.delete(t), this.writeViewLayout(i, { ...n, expanded: [...o] }), s && this.declumpView(i);
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), o = this.sceneFor(i), s = { ...n.nodes }, a = [];
    for (const { id: r, x: l, y: u } of t) {
      a.push({ kind: "move-node", view: i, id: r, pos: n.nodes[r] ?? null });
      let h = { x: l, y: u };
      const m = o.nodes.find((f) => f.id === r);
      if (m != null && m.parentId) {
        const f = o.nodes.find((g) => g.id === m.parentId);
        f && (h = { x: l - f.x, y: u - f.y });
      }
      s[r] = h;
    }
    if (this.writeViewLayout(i, { ...n, nodes: s }), i === "processes")
      for (const { id: r } of t) {
        const l = this.stepReorderCommand(r);
        if (l) {
          const u = this.inverseOf(l);
          u && a.unshift(...u), this.command(l, !1);
        }
      }
    this.pushUndoEntry(a);
  }
  onNodeResized(e) {
    var g;
    const { id: t, x: i, y: n, w: o, h: s } = e.detail, a = this._view, r = this.viewLayout(a), l = this.sceneFor(a), u = l.nodes.find((v) => v.id === t), h = u != null && u.parentId ? l.nodes.find((v) => v.id === u.parentId) : void 0, m = h ? [] : l.nodes.filter((v) => v.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((g = r.sizes) == null ? void 0 : g[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: r.nodes[t] ?? null },
      ...m.map((v) => ({ kind: "move-node", view: a, id: v.id, pos: r.nodes[v.id] ?? null }))
    ]);
    const f = {
      ...r.nodes,
      [t]: h ? { x: i - h.x, y: n - h.y } : { x: i, y: n }
    };
    for (const v of m) f[v.id] = { x: v.x - i, y: v.y - n };
    this.writeViewLayout(a, {
      ...r,
      nodes: f,
      sizes: { ...r.sizes ?? {}, [t]: { w: o, h: s } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, n = this._view, o = this.viewLayout(n);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: n, id: t, points: o.edges[t] ?? null }
    ]);
    const s = { ...o.edges };
    s[t] = i, this.writeViewLayout(n, { ...o, edges: s });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = wn(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((a) => [a.id, a.x])), o = [...t.steps].sort(
      (a, r) => (n.get(a.id) ?? 0) - (n.get(r.id) ?? 0)
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
    const { sourceId: t, targetId: i, x: n, y: o, connectKind: s } = e.detail;
    this.applyConnection(t, i, n, o, s);
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
    const i = this.model.relations.find(
      (n) => n.sourceId === t.sourceId && n.targetId === t.targetId
    );
    i && i.type !== e && this.command({ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: e });
  }
  /** Supr with a multi-selection: one confirmation covers the whole batch. */
  onDeleteSelectionRequested(e) {
    const { items: t } = e.detail;
    this._multi = [], t.length && this.openDeletePicker(t.map((i) => ({ elementType: "node", id: i.id, kind: i.kind })));
  }
  onDeleteRequested(e) {
    const { elementType: t, id: i, kind: n } = e.detail;
    if (t !== "node") {
      this.performDelete(t, i, n);
      return;
    }
    this.openDeletePicker([{ elementType: t, id: i, kind: n }]);
  }
  /**
   * Model deletions are destructive enough to warrant a stop: the picker confirms them, and —
   * when a modux View is active and EVERY node is a member — also offers the gentle
   * alternative of only taking them out of the view.
   */
  openDeletePicker(e) {
    const t = (this.model.views ?? []).find((n) => n.id === this._activeViewId), i = t ? e.map((n) => this.memberIdOf(n.id, n.kind)).filter((n) => !!n && t.memberIds.includes(n)) : [];
    this._deletePicker = {
      items: e,
      memberIds: i.length === e.length ? i : []
    };
  }
  /** Canvas node → the catalog id a view lists as member (null when not a member kind). */
  memberIdOf(e, t) {
    var i, n;
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
        return ((i = this.owningProcessOf(e)) == null ? void 0 : i.id) ?? null;
      case "workflow-step":
        return ((n = this.owningWorkflowOf(e)) == null ? void 0 : n.id) ?? null;
      default:
        return null;
    }
  }
  inverseOf(e) {
    return Sp(this.gestureHost(), e);
  }
  // ── Secuencias (interactions) ────────────────────────────────────────────
  /** The interaction on the surface: the authored working copy, or the derived one. */
  currentInteraction() {
    return this._interactionMode === "derived" ? this.derivedInteraction : this._editingInteraction;
  }
  enterAuthored(e) {
    window.clearTimeout(this._deriveTimer), this._derivePending = !1, this._interactionMode = "authored", this._interactionId = e;
    const t = e ? (this.model.interactions ?? []).find((i) => i.id === e) : null;
    this._editingInteraction = t ? JSON.parse(JSON.stringify(t)) : null;
  }
  /** Derived mode: ask the host (it fetches /interactions/derive); silence ⇒ the view warns. */
  enterDerived(e, t) {
    window.clearTimeout(this._deriveTimer), this._interactionMode = "derived", this.derivedInteraction = null, this._derivePending = !0, this._deriveTimer = window.setTimeout(() => this._derivePending = !1, 4e3), this.emit("interaction-derive-requested", { kind: e, ref: t });
  }
  uniqueInteractionId(e) {
    const t = `int-${ce(e) || "secuencia"}`;
    let i = t, n = 2;
    for (; (this.model.interactions ?? []).some((o) => o.id === i); ) i = `${t}-${n++}`;
    return i;
  }
  onInteractionPick(e) {
    const t = e.target, i = t.value;
    if (t.value = "", i === "__new__") {
      this._interactionPrompt = {
        title: "Nombre de la nueva secuencia",
        value: "",
        apply: (n) => {
          const o = this.uniqueInteractionId(n), s = { id: o, name: n, participants: [], messages: [] };
          this._interactionMode = "authored", this._interactionId = o, this._editingInteraction = s, this.command(xt(s));
        }
      };
      return;
    }
    this.enterAuthored(i || null);
  }
  onDerivePick(e) {
    const t = e.target, i = t.value;
    if (t.value = "", !i) return;
    const [n, o] = i.split("|");
    this.enterDerived(n, o);
  }
  /** 📌 in derived mode: persist the ephemeral interaction and switch to authored. */
  pinDerivedInteraction() {
    const e = this.derivedInteraction;
    e && (this._interactionPrompt = {
      title: "Fijar como secuencia authoreda — nombre",
      value: e.name ?? "",
      apply: (t) => {
        const i = this.uniqueInteractionId(t), n = { ...e, id: i, name: t, ephemeral: !1 };
        this._interactionMode = "authored", this._interactionId = i, this._editingInteraction = n, this.command(xt(n)), this.emit("modux-notice", { message: `Secuencia «${t}» fijada en el modelo` });
      }
    });
  }
  async copyInteractionMermaid() {
    const e = this.currentInteraction();
    if (e)
      try {
        await navigator.clipboard.writeText(Cp(e)), this.emit("modux-notice", { message: "Mermaid copiado al portapapeles" });
      } catch {
        this.emit("modux-notice", {
          message: "No se pudo copiar al portapapeles",
          kind: "error"
        });
      }
  }
  onParticipantPick(e) {
    const t = e.target, i = t.value;
    t.value = "";
    const n = this._editingInteraction;
    if (!i || !n) return;
    const o = bo(this.model).find((r) => r.ref === i);
    if (!o) return;
    const s = ii(n);
    if (s.some((r) => r.ref === i)) {
      this.emit("modux-notice", { message: `«${o.name}» ya es participante` });
      return;
    }
    const a = {
      ...n,
      participants: [...s, { ref: i, name: o.name, type: o.type }]
    };
    this._editingInteraction = a, this.command(xt(a), !1);
  }
  onInteractionChanged(e) {
    const t = e.detail;
    this._editingInteraction = t, this.command(xt(t));
  }
  /** ✨ on an unbacked message: the EXISTING commands that build its mechanism (one undo). */
  onInteractionMaterialize(e) {
    const t = this._editingInteraction, i = t == null ? void 0 : t.messages.find((l) => l.id === e.detail.messageId);
    if (!t || !i) return;
    const n = dn(this.model, t), { commands: o, hint: s } = _p(
      this.model,
      i,
      n.typeOf,
      n.nameOf
    );
    if (!o.length) {
      this.emit("modux-notice", { message: s ?? "Este mensaje no se puede materializar" });
      return;
    }
    const a = o.flatMap((l) => this.inverseOf(l) ?? []);
    for (const l of o) this.command(l, !1);
    a.length && this.pushUndoEntry(a);
    const r = {
      ...t,
      messages: t.messages.map((l) => l.id === i.id ? { ...l, backed: !0 } : l)
    };
    this._editingInteraction = r, this.command(xt(r));
  }
  applyConnection(e, t, i, n, o) {
    const s = this._gestureEffects, a = () => !!(this._connectPicker || this._relationPicker || this._extDepPicker || this._deletePicker), r = a();
    if (It(this.gestureHost(), this._view, e, t, i, n, o), this._gestureEffects === s && a() === r && o === void 0 && e !== t && ["context-map", "aggregates", "integrations"].includes(this._view)) {
      const l = this.sceneFor(this._view), u = (h) => l.nodes.some((m) => m.id === h);
      u(e) && u(t) && (this._connectPicker = {
        x: i ?? this.clientWidth / 2,
        y: n ?? 120,
        options: Ni(this.gestureHost(), e, t)
      });
    }
  }
  performDelete(e, t, i) {
    Pp(this.gestureHost(), this._view, e, t, i);
  }
  /** The thin surface the extracted gesture/undo vocabulary works against. */
  gestureHost() {
    return {
      model: this.model,
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
      rebuildComponentOps: (e, t, i, n, o, s) => this.rebuildComponentOps(e, t, i, n, o, s),
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
        var i;
        const t = (i = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : i.renderRoot.querySelector(`g[data-node-id="${e}"]`);
        return t == null ? void 0 : t.getBoundingClientRect();
      },
      clearSelection: () => {
        this._selectedId = null;
      }
    };
  }
  owningProcessOf(e) {
    return (this.model.processes ?? []).find((t) => t.steps.some((i) => i.id === e));
  }
  owningUseCaseOf(e) {
    return this.model.boundedContexts.flatMap((t) => t.useCases ?? []).find((t) => (t.steps ?? []).some((i) => i.id === e));
  }
  owningWorkflowOf(e) {
    return (this.model.workflows ?? []).find((t) => t.steps.some((i) => i.id === e));
  }
  owningApiOf(e) {
    return (this.model.apis ?? []).find((t) => t.operations.some((i) => i.id === e));
  }
  onNodeRenamed(e) {
    const { id: t, kind: i, name: n } = e.detail;
    (i === "note" || i === "area" || i === "ui" || i === "page" || i === "ui-app" || i === "url" || i === "boundedContext" || i === "aggregate" || i === "entity" || i === "process-step" || i === "workflow" || i === "workflow-step" || i === "domain-event" || i === "read-model" || i === "domain-service" || i === "query-service" || i === "use-case" || i === "external-use-case" || i === "external-table" || i === "mcp-server" || i === "mcp-gateway" || i === "application-event" || i === "external-system" || i === "actor" || i === "ai-agent" || i === "rag" || i === "api" || i === "proxy-api" || i === "api-operation") && this.command({ kind: "rename-element", type: i, id: t.replace(/^tgt:/, ""), name: n });
  }
  addStepFromToolbar() {
    const e = this._newStepName.trim();
    if (!e || !this._selectedId) return;
    const t = (this.model.processes ?? []).find((o) => o.id === this._selectedId), i = t ?? this.owningProcessOf(this._selectedId);
    if (!i) return;
    const n = t ? void 0 : this._selectedId;
    this.command({
      kind: "add-process-step",
      processId: i.id,
      id: `step-${ce(e)}`,
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
      id: `wfstep-${ce(e)}`,
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
      ...this.model.boundedContexts.map((i) => ({ id: i.id, name: i.name, kind: "contexto" })),
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
    const t = new Set(e.memberIds), i = (o, s, a = {}) => I`
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
    `, n = (o, s) => s.length ? I`<h4>${o}</h4>${s}` : "";
    return I`
      <aside class="view-tree" @pointerdown=${(o) => o.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${n(
      "Contextos",
      this.model.boundedContexts.flatMap((o) => [
        i(o.id, o.name),
        ...(this.model.aggregates ?? []).filter((s) => s.boundedContextId === o.id).map((s) => i(s.id, s.name, { child: !0, implicit: t.has(o.id) }))
      ])
    )}
        ${n(
      "Sistemas externos",
      this.model.externalSystems.map((o) => i(o.id, o.name))
    )}
        ${n("APIs", (this.model.apis ?? []).map((o) => i(o.id, o.name)))}
        ${n("Actores", (this.model.actors ?? []).map((o) => i(o.id, o.name)))}
        ${n("Agentes IA", (this.model.aiAgents ?? []).map((o) => i(o.id, o.name)))}
        ${n("Gateways MCP", (this.model.mcpGateways ?? []).map((o) => i(o.id, o.name)))}
        ${n("RAGs", (this.model.rags ?? []).map((o) => i(o.id, o.name)))}
        ${n("Flows", this.model.flows.map((o) => i(o.id, o.name)))}
        ${n("Procesos", (this.model.processes ?? []).map((o) => i(o.id, o.name)))}
        ${n("Workflows", (this.model.workflows ?? []).map((o) => i(o.id, o.name)))}
      </aside>
    `;
  }
  onElementSelected(e) {
    var t, i;
    if (this._selectedId = e.detail.id, this._multi = [], e.detail.kind === "process-step") {
      const n = (t = this.owningProcessOf(e.detail.id)) == null ? void 0 : t.steps.find((o) => o.id === e.detail.id);
      this._editStepRole = (n == null ? void 0 : n.roleId) ?? "", this._editStepDeadline = (n == null ? void 0 : n.deadline) ?? "", this._editStepComp = (n == null ? void 0 : n.compensationUseCaseId) ?? "";
    }
    if (e.detail.kind === "workflow-step") {
      const n = (i = this.owningWorkflowOf(e.detail.id)) == null ? void 0 : i.steps.find((o) => o.id === e.detail.id);
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
  /** What a new modux View would draw from: the rubber-band set, else the single
   * selected element. Feeds ⊞ Vista on every diagram surface. */
  viewSelection() {
    return this._multi.length ? this._multi : this._selectedId ? [this._selectedId] : [];
  }
  memberIdsFromSelection() {
    if (this._view === "design") {
      const i = new Set((this.model.pages ?? []).map((n) => n.id));
      return this.viewSelection().filter((n) => i.has(n));
    }
    const e = this.sceneFor(this._view), t = /* @__PURE__ */ new Set();
    for (const i of this.viewSelection()) {
      const n = e.nodes.find((o) => o.id === i);
      if (n)
        switch (n.kind) {
          case "boundedContext":
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
            const o = Ce(i);
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
    const e = this._newViewName.trim(), t = this.memberIdsFromSelection(), i = t.length ? t : this.viewSelection().length ? [] : this.visibleMemberIds();
    if (!e || !i.length) return;
    const n = crypto.randomUUID();
    this.command({ kind: "add-view", id: n, name: e, memberIds: i }), this._newViewName = "", this._multi = [], this.activateVista(n);
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
      const t = `${this._view}@view:${e}`, i = ft(this.layout[t]);
      if (!Object.keys(i.nodes).length && !Object.keys(i.sizes ?? {}).length && !(i.expanded ?? []).length) {
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
    const e = (this.model.views ?? []).find((g) => g.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.boundedContexts.filter((g) => t.has(g.id)), n = new Set(i.map((g) => g.id)), o = this.model.externalSystems.filter((g) => t.has(g.id)), s = new Set(o.map((g) => g.id)), a = (this.model.aggregates ?? []).filter(
      (g) => t.has(g.id) || n.has(g.boundedContextId)
    ), r = new Set(a.map((g) => g.id)), l = (this.model.uiApps ?? []).filter((g) => t.has(g.id)), u = /* @__PURE__ */ new Set(), h = (g) => {
      for (const v of g ?? [])
        v.pageId && u.add(v.pageId), h(v.children);
    };
    l.forEach((g) => h(g.menuItems));
    const m = (this.model.pages ?? []).filter(
      (g) => t.has(g.id) || u.has(g.id)
    ), f = new Set(l.map((g) => g.id));
    return {
      ...this.model,
      uiApps: l,
      pages: m,
      actorAppUses: (this.model.actorAppUses ?? []).filter((g) => f.has(g.appId)),
      boundedContexts: i,
      externalSystems: o,
      relations: this.model.relations.filter(
        (g) => n.has(g.sourceId) && n.has(g.targetId)
      ),
      flows: this.model.flows.filter(
        (g) => t.has(g.id) || (n.has(g.sourceId) || s.has(g.sourceId)) && (n.has(g.targetId) || s.has(g.targetId))
      ),
      aggregates: a,
      entities: (this.model.entities ?? []).filter((g) => r.has(g.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (g) => r.has(g.sourceAggregateId) && r.has(g.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (g) => t.has(g.id) || (g.ownerBoundedContextId ? n.has(g.ownerBoundedContextId) : !1)
      ),
      // Workflows have no owner boundedContext (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((g) => t.has(g.id)),
      // Top-level AI/strategic pieces scope by membership too — a curated view
      // about one subdomain should not drag every agent and gateway along.
      actors: (this.model.actors ?? []).filter((g) => t.has(g.id)),
      aiAgents: (this.model.aiAgents ?? []).filter((g) => t.has(g.id)),
      rags: (this.model.rags ?? []).filter((g) => t.has(g.id)),
      mcpGateways: (this.model.mcpGateways ?? []).filter((g) => t.has(g.id)),
      apis: (this.model.apis ?? []).filter(
        (g) => t.has(g.id) || (g.publishedByExternalSystemId ? s.has(g.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (g) => t.has(g.id) || (g.publishedByExternalSystemId ? s.has(g.publishedByExternalSystemId) : !1)
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
    var i;
    if (this._view === "workflows" && e.detail.elementType === "edge" && e.detail.kind === "wf-link") {
      const n = /^wflink:(.+)->(.+)$/.exec(e.detail.id), o = n ? (this.model.workflowGateways ?? []).find((s) => s.id === n[1]) : null;
      if (n && o && o.type === "SPLIT" && o.semantics === "EXCLUSIVE") {
        const s = ((i = (o.branchConditions ?? []).find((a) => a.targetId === n[2])) == null ? void 0 : i.expression) ?? "";
        this._branchCondEditor = { gatewayId: o.id, targetId: n[2], value: s };
      }
      return;
    }
    if (this._view === "workflows" && e.detail.kind === "workflow-gateway") {
      const n = (this.model.workflowGateways ?? []).find((s) => s.id === e.detail.id);
      if (!n) return;
      const o = n.type === "SPLIT" ? n.semantics === "EXCLUSIVE" ? "PARALLEL" : "EXCLUSIVE" : n.semantics === "ANY" ? "ALL" : "ANY";
      this.command({ kind: "set-gateway-semantics", id: n.id, type: o });
      return;
    }
    if (this._view === "ui" && e.detail.elementType === "node" && e.detail.kind === "page") {
      this._view = "design", this._selectedId = e.detail.id;
      return;
    }
    if (e.detail.elementType === "edge" && e.detail.kind === "archimate-relation") {
      const n = e.detail.id.replace(/^archi:/, ""), o = (this.model.archimateRelations ?? []).find((s) => s.id === n);
      o && (this._connectPicker = {
        x: e.detail.x ?? this.clientWidth / 2,
        y: e.detail.y ?? 120,
        options: [
          {
            id: "invert-direction",
            label: "↔ Invertir sentido",
            hint: "Intercambia origen y destino de la relación",
            apply: () => this.command({ kind: "invert-archimate-relation", id: n })
          },
          ...Ni(this.gestureHost(), o.sourceId, o.targetId).map((s) => ({
            ...s,
            label: s.id === `archimate:${o.type}` ? `● ${s.label}` : s.label,
            apply: () => {
              this.command({
                kind: "set-archimate-relation-type",
                id: n,
                type: s.id.replace(/^archimate:/, "")
              });
            }
          }))
        ]
      });
      return;
    }
    if (this._view === "context-map" && e.detail.elementType === "edge" && e.detail.kind === "relation") {
      const n = /^rel:(.+)->(.+)$/.exec(e.detail.id);
      n && (this._relationPicker = {
        sourceId: n[1],
        targetId: n[2],
        mode: "edit",
        x: e.detail.x ?? 0,
        y: e.detail.y ?? 0
      });
      return;
    }
    if (e.detail.kind === "invariant") {
      const n = (this.model.aggregates ?? []).find((a) => (a.invariants ?? []).some((r) => r.id === e.detail.id));
      if (n) {
        this.openInDrawer({ elementType: "aggregate", id: n.id });
        return;
      }
      const o = (this.model.valueObjects ?? []).find((a) => (a.invariants ?? []).some((r) => r.id === e.detail.id));
      if (o) {
        this.openInDrawer({ elementType: "value-object", id: o.id });
        return;
      }
      const s = (this.model.entities ?? []).find((a) => (a.invariants ?? []).some((r) => r.id === e.detail.id));
      if (s) {
        this.openInDrawer({ elementType: "entity", id: s.id });
        return;
      }
      return;
    }
    const t = e.detail.kind === "process-step" ? Bp(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const n = this.owningWorkflowOf(e.detail.id);
      return n ? { elementType: "workflow", id: n.id } : null;
    })() : qp(e.detail.id, e.detail.kind);
    t && this.openInDrawer(t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (s) => {
      for (const a of s ?? [])
        a.id && t.add(a.id), i(a.children);
    };
    (this.model.uiApps ?? []).forEach((s) => i(s.menuItems));
    const n = `mi-${ce(e)}`;
    let o = n;
    for (let s = 2; t.has(o); s++) o = `${n}-${s}`;
    return o;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const i = (this.model.pages ?? []).find((s) => s.id === e);
    let n = null;
    const o = (s, a) => {
      var l;
      const r = s ?? [];
      for (let u = 0; u < r.length; u++)
        r[u].id === t && (n = { node: r[u], parentId: a, beforeId: ((l = r[u + 1]) == null ? void 0 : l.id) ?? null }), o(r[u].children, r[u].id);
    };
    return o(i == null ? void 0 : i.content, null), n;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, n, o = !1, s) {
    const a = s ?? this.allComponentIds(), r = (m) => {
      if (!o) return m.id;
      const f = `cmp-${ce(m.kind)}`;
      let g = f;
      for (let v = 2; a.has(g) || a.has(`${g}-tab-1`); v++) g = `${f}-${v}`;
      return a.add(g), g;
    }, l = [], u = (m, f) => {
      const g = r(m);
      l.push({ kind: "add-page-component", pageId: e, componentId: g, componentKind: m.kind, parentComponentId: f }), m.kind === "tabLayout" && (l.push({ kind: "remove-page-component", pageId: e, componentId: `${g}-tab-1` }), l.push({ kind: "remove-page-component", pageId: e, componentId: `${g}-tab-2` })), l.push({ kind: "set-page-component", pageId: e, componentId: g, ...this.cmpPatch(m) });
      for (const v of m.children ?? []) u(v, g);
      return g;
    }, h = u(t, i);
    return n && l.push({
      kind: "move-page-component",
      pageId: e,
      componentId: h,
      parentComponentId: i ?? null,
      beforeComponentId: n
    }), { ops: l, rootId: h };
  }
  allComponentIds() {
    const e = /* @__PURE__ */ new Set(), t = (i) => {
      for (const n of i ?? [])
        e.add(n.id), t(n.children);
    };
    return (this.model.pages ?? []).forEach((i) => t(i.content)), e;
  }
  newComponentId(e) {
    const t = this.allComponentIds(), i = `cmp-${ce(e)}`;
    let n = i;
    for (let o = 2; t.has(n) || t.has(`${n}-tab-1`); o++) n = `${i}-${o}`;
    return n;
  }
  /** Re-slots a wizard step unless it already sits exactly there. */
  moveWizardStep(e, t, i) {
    var s;
    if (i === t) return;
    const n = (((s = (this.model.pages ?? []).find((a) => a.id === e)) == null ? void 0 : s.wizardSteps) ?? []).map((a) => a.id ?? a.pageId), o = n.indexOf(t);
    o >= 0 && (i ? n[o + 1] === i : o === n.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: i });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((s) => s.id === e);
    let n = null;
    const o = (s, a) => {
      var l;
      const r = s ?? [];
      for (let u = 0; u < r.length; u++)
        r[u].id === t && (n = { entry: r[u], parentId: a, beforeId: ((l = r[u + 1]) == null ? void 0 : l.id) ?? null }), o(r[u].children, r[u].id ?? null);
    };
    return o(i == null ? void 0 : i.menuItems, null), n;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var a;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, i, n = null;
    if (this._selectedCmp) {
      const r = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!r) return;
      t = this._selectedCmp.pageId, pe.LEAF_KINDS.has(r.node.kind) ? (i = r.parentId ?? void 0, n = r.beforeId) : i = r.node.kind === "tabLayout" && e.kind !== "tab" ? (a = (r.node.children ?? [])[0]) == null ? void 0 : a.id : r.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((r) => r.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: o, rootId: s } = this.rebuildComponentOps(t, e, i, n, !0);
    for (const r of o) this.command(r, !1);
    this.pushUndoEntry([{ kind: "remove-page-component", pageId: t, componentId: s }]), this._selectedCmp = { pageId: t, componentId: s };
  }
  /** The «Diseño» surface: every page as a frame, edited in place (Figma-style). */
  renderFigma() {
    const e = this.viewLayout("design");
    return I`<modux-figma
      .pages=${this.filteredModel().pages ?? []}
      .layout=${e.nodes}
      .sizes=${e.sizes ?? {}}
      @frame-resized=${(t) => {
      var a;
      const { id: i, w: n, h: o } = t.detail, s = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: i, size: ((a = s.sizes) == null ? void 0 : a[i]) ?? null }
      ]), this.writeViewLayout("design", {
        ...s,
        sizes: { ...s.sizes ?? {}, [i]: { w: n, h: o } }
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
      (t) => (t.useCases ?? []).map((i) => ({ id: i.id, name: i.name }))
    )}
      .queryOps=${this.model.boundedContexts.flatMap(
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
      const { pageId: i, componentId: n, ...o } = t.detail;
      this.command({ kind: "set-page-component", pageId: i, componentId: n, ...o });
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
      const { pageId: i, fieldId: n, stereotype: o, colspan: s, label: a } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: n, stereotype: o, colspan: s, label: a });
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
        items: e.boundedContexts.map((n) => ({ id: n.id, name: n.name }))
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
        items: e.boundedContexts.flatMap(
          (n) => (n.scheduledTriggers ?? []).map((o) => ({ id: o.id, name: o.name }))
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
        items: e.boundedContexts.flatMap((n) => (n.useCases ?? []).map((o) => ({ id: o.id, name: o.name })))
      },
      {
        label: "Eventos",
        symbol: "event",
        color: "#f59e0b",
        items: e.boundedContexts.flatMap((n) => [
          ...(n.domainEvents ?? []).map((o) => ({ id: o.id, name: o.name })),
          ...(n.applicationEvents ?? []).map((o) => ({ id: o.id, name: o.name }))
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
        items: e.boundedContexts.flatMap((n) => (n.readModels ?? []).map((o) => ({ id: o.id, name: o.name })))
      },
      {
        label: "Operaciones de consulta",
        symbol: "lens",
        color: "#0284c7",
        items: e.boundedContexts.flatMap(
          (n) => (n.queryServices ?? []).flatMap(
            (o) => (o.operations ?? []).map((s) => ({ id: s.id, name: `${s.name} (${o.name})` }))
          )
        )
      },
      {
        label: "Query services",
        symbol: "lens",
        color: "#0284c7",
        items: e.boundedContexts.flatMap((n) => (n.queryServices ?? []).map((o) => ({ id: o.id, name: o.name })))
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
          ...(n.useCases ?? []).map((o) => ({ id: o.id, name: o.name })),
          ...(n.tables ?? []).map((o) => ({ id: o.id, name: o.name })),
          ...(n.mcpServers ?? []).map((o) => ({ id: o.id, name: o.name }))
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
        items: (e.apis ?? []).flatMap((n) => n.operations.map((o) => ({ id: o.id, name: o.name })))
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
      items: i ? n.items.filter((o) => o.name.toLowerCase().includes(i)) : n.items
    })).filter((n) => n.items.length > 0);
  }
  onPaletteDragStart(e, t) {
    var i;
    (i = e.dataTransfer) == null || i.setData("application/x-modux-palette", JSON.stringify(t)), e.dataTransfer && (e.dataTransfer.effectAllowed = "copy");
  }
  onPaletteDrop(e) {
    var r, l, u;
    const t = (r = e.dataTransfer) == null ? void 0 : r.getData("application/x-modux-palette");
    if (!t) return;
    e.preventDefault();
    const i = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._yugo ? this.renderRoot.querySelector("modux-explorer") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const n = i.sceneFromClient(e.clientX, e.clientY);
    let o = ((l = i.nodeIdAtClient(e.clientX, e.clientY)) == null ? void 0 : l.replace(/^(tgt:|flow:)/, "")) ?? null;
    !o && "nodeIdNearClient" in i && (o = ((u = i.nodeIdNearClient(e.clientX, e.clientY)) == null ? void 0 : u.replace(/^(tgt:|flow:)/, "")) ?? null);
    const s = this._view === "design" && "dropSlotAtClient" in i ? i.dropSlotAtClient(e.clientX, e.clientY) : null;
    let a;
    try {
      a = JSON.parse(t);
    } catch {
      return;
    }
    a.new ? this.createFromPalette(a.new, n, o, s) : a.existing && this.placeExistingFromPalette(a.existing, n, o, e.clientX, e.clientY, s);
  }
  /**
   * A fresh element: the id is an opaque UUID — the granular store names files
   * after it, so it must never derive from the (renamable, duplicable) name.
   * Only the NAME needs uniquifying, so two drops of «Contexto» read apart.
   */
  uniquePaletteName(e) {
    const t = new Set(this._pendingNames), i = this.model;
    for (const n of [
      i.boundedContexts.map((o) => o.name),
      i.boundedContexts.flatMap((o) => (o.useCases ?? []).map((s) => s.name)),
      i.boundedContexts.flatMap((o) => (o.domainEvents ?? []).map((s) => s.name)),
      i.boundedContexts.flatMap((o) => (o.applicationEvents ?? []).map((s) => s.name)),
      i.boundedContexts.flatMap((o) => (o.readModels ?? []).map((s) => s.name)),
      i.boundedContexts.flatMap((o) => (o.domainServices ?? []).map((s) => s.name)),
      i.boundedContexts.flatMap((o) => (o.queryServices ?? []).map((s) => s.name)),
      i.boundedContexts.flatMap((o) => (o.scheduledTriggers ?? []).map((s) => s.name)),
      (i.aggregates ?? []).map((o) => o.name),
      (i.entities ?? []).map((o) => o.name),
      (i.actors ?? []).map((o) => o.name),
      (i.areas ?? []).map((o) => o.name),
      i.externalSystems.map((o) => o.name),
      i.externalSystems.flatMap((o) => (o.useCases ?? []).map((s) => s.name)),
      i.externalSystems.flatMap((o) => (o.tables ?? []).map((s) => s.name)),
      i.externalSystems.flatMap((o) => (o.mcpServers ?? []).map((s) => s.name)),
      (i.apis ?? []).map((o) => o.name),
      (i.apis ?? []).flatMap((o) => (o.operations ?? []).map((s) => s.name)),
      (i.proxyApis ?? []).map((o) => o.name),
      (i.aiAgents ?? []).map((o) => o.name),
      (i.mcpGateways ?? []).map((o) => o.name),
      (i.rags ?? []).map((o) => o.name),
      (i.workflows ?? []).map((o) => o.name),
      (i.etlFlows ?? []).map((o) => o.name),
      (i.identityProviders ?? []).map((o) => o.name),
      (i.notifications ?? []).map((o) => o.name),
      (i.documents ?? []).map((o) => o.name),
      (i.uiApps ?? []).map((o) => o.name),
      (i.pages ?? []).map((o) => o.name),
      (i.modules ?? []).map((o) => o.name),
      (i.services ?? []).map((o) => o.name),
      (i.customCodes ?? []).map((o) => o.name),
      (i.buttonGroups ?? []).map((o) => o.name),
      (i.workflowGateways ?? []).map((o) => o.name),
      (i.urls ?? []).map((o) => o.name)
    ])
      n.forEach((o) => {
        o && t.add(o);
      });
    for (let n = 1; ; n++) {
      const o = n === 1 ? e : `${e} ${n}`;
      if (!t.has(o))
        return this._pendingNames.add(o), { id: crypto.randomUUID(), name: o };
    }
  }
  /** The container chain at a drop target: scene parents — or the explorer's tree. */
  dropChain(e) {
    if (!e) return [];
    if (this._yugo) {
      const n = this.renderRoot.querySelector("modux-explorer");
      return (n == null ? void 0 : n.chainOf(e)) ?? [e];
    }
    const t = this.sceneFor(this._view), i = [];
    for (let n = e; n; ) {
      i.push(n);
      const o = t.nodes.find((s) => s.id === n);
      n = o ? o.ownerId ?? o.parentId : void 0;
    }
    return i;
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  /** The aggregate whose box is nearest to a scene point — the forgiving drop target. */
  nearestAggregateTo(e) {
    const t = this.sceneFor("aggregates").nodes.filter((o) => o.kind === "aggregate");
    let i = null, n = 1 / 0;
    for (const o of t) {
      const s = Math.max(Math.abs(e.x - o.x) - (o.w ?? 0) / 2, 0), a = Math.max(Math.abs(e.y - o.y) - (o.h ?? 0) / 2, 0), r = Math.hypot(s, a);
      r < n && (n = r, i = o.id);
    }
    return i;
  }
  dropContainerFor(e, t) {
    var o, s;
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
      "module"
    ].includes(e)) return i.find((a) => this.model.boundedContexts.some((r) => r.id === a)) ?? null;
    if (e === "invariant") {
      const a = i.find((h) => (this.model.valueObjects ?? []).some((m) => m.id === h));
      if (a) return a;
      const r = i.find((h) => (this.model.entities ?? []).some((m) => m.id === h));
      if (r) return r;
      const l = i.find((h) => (this.model.aggregates ?? []).some((m) => m.id === h));
      if (l) return l;
      const u = i.find((h) => this.model.boundedContexts.some((m) => m.id === h));
      return ((o = (this.model.aggregates ?? []).find((h) => h.boundedContextId === u)) == null ? void 0 : o.id) ?? null;
    }
    if (["read-model", "entity", "value-object"].includes(e)) {
      const a = i.find((l) => (this.model.aggregates ?? []).some((u) => u.id === l));
      if (a) return a;
      const r = i.find((l) => this.model.boundedContexts.some((u) => u.id === l));
      return ((s = (this.model.aggregates ?? []).find((l) => l.boundedContextId === r)) == null ? void 0 : s.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return i.find((a) => this.model.externalSystems.some((r) => r.id === a)) ?? null;
    if (e === "model-field")
      return i.find((a) => (this.model.models ?? []).some((r) => r.id === a)) ?? null;
    if (e === "etl-flow" && this._view === "integrations" && this.model.boundedContexts.length === 1)
      return this.model.boundedContexts[0].id;
    if (e === "ui-button")
      return i.find((a) => (this.model.buttonGroups ?? []).some((r) => r.id === a)) ?? null;
    if (e === "use-case-step")
      return i.find(
        (a) => this.model.boundedContexts.some((r) => (r.useCases ?? []).some((l) => l.id === a))
      ) ?? null;
    if (e === "api-operation") {
      for (const a of i) {
        if ((this.model.apis ?? []).some((u) => u.id === a)) return a;
        const r = /^apiimpl:(.+)@(.+)$/.exec(a);
        if (r && (this.model.apis ?? []).some((u) => u.id === r[1])) return r[1];
        const l = (this.model.proxyApis ?? []).find((u) => u.id === a);
        if (l != null && l.targetApiId) return l.targetApiId;
      }
      return null;
    }
    return e === "api" ? i.find((a) => this.model.externalSystems.some((r) => r.id === a)) ?? i.find((a) => this.model.boundedContexts.some((r) => r.id === a)) ?? null : null;
  }
  createFromPalette(e, t, i, n = null) {
    var f, g;
    const o = vo.find((v) => v.type === e);
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
      const v = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, b = v ? v[1] : i && (this.model.pages ?? []).some((y) => y.id === i) ? i : null;
      if (!b) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: d, name: c } = this.uniquePaletteName("Custom code");
      this.command({ kind: "add-custom-code", id: d, name: c }, !1), v ? (this.command({ kind: "set-page-component-custom-code", pageId: b, componentId: v[2], targetId: d }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: b, targetId: d }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const v = e.slice(4), b = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, d = b ? b[1] : i && (this.model.pages ?? []).some((S) => S.id === i) ? i : null;
      if (!d) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let c = b ? b[2] : void 0, y = null;
      if (v === "tab") {
        let S = null, E = c ? this.componentIn(d, c) : null;
        for (; E; ) {
          if (E.node.kind === "tabLayout") {
            S = E.node.id;
            break;
          }
          E = E.parentId ? this.componentIn(d, E.parentId) : null;
        }
        if (!S) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const N = this.componentIn(d, S).node, V = this.newComponentId("tab"), G = `Pestaña ${(N.children ?? []).filter((se) => se.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: d, componentId: V, componentKind: "tab", parentComponentId: S }, !1), this.command({ kind: "set-page-component", pageId: d, componentId: V, title: G }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: d, componentId: V }]);
        return;
      }
      if (n != null && n.componentId && n.pos !== "into") {
        const S = this.componentIn(d, n.componentId);
        S && S.node.kind === "tab" ? c = S.node.id : S && (c = S.parentId ?? void 0, y = n.pos === "before" ? n.componentId : S.beforeId);
      } else if (c) {
        const S = ((f = this.componentIn(d, c)) == null ? void 0 : f.node) ?? null;
        (S == null ? void 0 : S.kind) === "tabLayout" && (S.children ?? [])[0] && (c = (S.children ?? [])[0].id);
      }
      const _ = this.newComponentId(v), A = {
        kind: "add-page-component",
        pageId: d,
        componentId: _,
        componentKind: v,
        parentComponentId: c
      };
      if (!y) {
        this.command(A);
        return;
      }
      this.command(A, !1), this.command(
        { kind: "move-page-component", pageId: d, componentId: _, parentComponentId: c ?? null, beforeComponentId: y },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: d, componentId: _ }]);
      return;
    }
    const s = this._view, a = this.sceneFor(s), r = (v, b) => {
      if (this.purgeNodeGeometry(v), s === "aggregates")
        return { kind: "move-node", view: s, id: v, pos: null };
      const d = this.viewLayout(s), c = b ? a.nodes.find((_) => _.id === b) : void 0, y = c ? { x: Math.round(t.x - c.x), y: Math.round(t.y - c.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...d, nodes: { ...d.nodes, [v]: y } }), { kind: "move-node", view: s, id: v, pos: null };
    }, l = (v, b, d) => {
      const c = this.inverseOf(v) ?? [];
      this.command(v, !1);
      const y = r(b, d);
      this.pushUndoEntry([...c, y]);
    };
    if (!o.child) {
      const { id: v, name: b } = this.uniquePaletteName(o.label), d = e === "boundedContext" ? { kind: "add-boundedContext", id: v, name: b, subdomainType: "SUPPORTING" } : e === "note" ? { kind: "add-note", id: v, name: b } : e === "area" ? { kind: "add-area", id: v, name: b } : e === "actor" ? { kind: "add-actor", id: v, name: b } : e === "external-system" ? { kind: "add-external-system", id: v, name: b } : e === "ai-agent" ? { kind: "add-ai-agent", id: v, name: b } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: v, name: b, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: v, name: b } : e === "rag" ? { kind: "add-rag", id: v, name: b } : e === "api" ? { kind: "add-api", id: v, name: b } : e === "proxy-api" ? { kind: "add-proxy-api", id: v, name: b } : e === "ui" ? { kind: "add-ui", id: v, name: b } : e === "ui-app" ? { kind: "create-ui-app", id: v, name: b } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: v, name: b, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: v, name: b, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: v, name: b, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: v, name: b } : e === "transformation" ? { kind: "add-transformation", id: v, name: b } : e === "custom-code" ? { kind: "add-custom-code", id: v, name: b } : e === "button-group" ? { kind: "add-button-group", id: v, name: b } : e === "identity-provider" ? { kind: "add-identity-provider", id: v, name: b } : e === "service" ? { kind: "add-service", id: v, name: b } : e === "url" ? { kind: "add-url", id: v, name: b } : {
        kind: "add-workflow",
        id: v,
        name: b,
        completionEventName: `${b.replace(/\s+/g, "")}Completado`
      };
      if (d.kind === "add-ui") {
        const y = this.dropChain(i).find((_) => this.model.boundedContexts.some((A) => A.id === _));
        if (y) {
          l({ ...d, boundedContextId: y }, v);
          return;
        }
      }
      if (d.kind === "create-ui-app") {
        const y = this.dropChain(i).find((_) => this.model.boundedContexts.some((A) => A.id === _));
        if (y) {
          l({ ...d, boundedContextId: y }, v);
          return;
        }
      }
      if (d.kind === "add-external-system") {
        const y = this.dropChain(i).find((_) => this.model.externalSystems.some((A) => A.id === _));
        if (y) {
          l({ ...d, parentId: y }, v), this.emit("modux-notice", { message: "Subsistema creado como parte del sistema" });
          return;
        }
      }
      l(d, v);
      return;
    }
    if (e === "ui-wizard-step") {
      const b = this.dropChain(i).map((_) => {
        var A;
        return ((A = /^wizrow:([^:]+):/.exec(_)) == null ? void 0 : A[1]) ?? _;
      }).find((_) => (this.model.pages ?? []).some((A) => A.id === _ && A.type === "WIZARD"));
      if (!b) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const d = ((g = (this.model.pages ?? []).find((_) => _.id === b)) == null ? void 0 : g.wizardSteps) ?? [], c = new Set(d.map((_) => _.id ?? _.pageId));
      let y = d.length + 1;
      for (; c.has(`wzs-${y}`); ) y++;
      this.command({ kind: "add-page-wizard-step", pageId: b, itemId: `wzs-${y}`, label: `Paso ${y}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const v = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", b = v === "CRUD" ? "CRUD" : v === "WIZARD" ? "Wizard" : "Página", { id: d, name: c } = this.uniquePaletteName(b), y = this.dropChain(i), _ = y.find((S) => (this.model.uiApps ?? []).some((E) => E.id === S)), A = y.map((S) => {
        var E;
        return ((E = /^wizrow:([^:]+):/.exec(S)) == null ? void 0 : E[1]) ?? S;
      }).find((S) => (this.model.pages ?? []).some((E) => E.id === S && E.type === "WIZARD"));
      if (A) {
        const S = a.nodes.find((N) => N.id === A);
        S && (t.x = S.x + S.w / 2 + 160, t.y = S.y - S.h / 2 + 40), this.command({ kind: "create-ui-page", id: d, name: c, pageType: v }, !1), this.command({ kind: "add-page-wizard-step", pageId: A, targetId: d }, !1);
        const E = r(d);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: d }, E]), this.emit("modux-notice", { message: `${c} creada como paso del wizard` });
        return;
      }
      if (_) {
        const S = a.nodes.find((E) => E.id === _);
        S && (t.x = S.x + S.w / 2 + 160, t.y = S.y - S.h / 2 + 40);
      }
      l(
        _ ? { kind: "create-ui-page", id: d, name: c, pageType: v, appId: _, menuLabel: c } : { kind: "create-ui-page", id: d, name: c, pageType: v },
        d
      );
      return;
    }
    if (e === "menu-item") {
      const v = this.dropChain(i), b = v.find((A) => (this.model.uiApps ?? []).some((S) => S.id === A));
      if (!b) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const d = /* @__PURE__ */ new Set(), c = (A) => {
        for (const S of A ?? [])
          d.add(S.label), c(S.children);
      };
      (this.model.uiApps ?? []).forEach((A) => c(A.menuItems));
      let y = "Entrada";
      for (let A = 2; d.has(y); A++) y = `Entrada ${A}`;
      const _ = v.map((A) => Ce(A)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: b,
        label: y,
        itemId: this.newMenuItemId(y),
        parentId: _ == null ? void 0 : _.itemId,
        parentLabel: _ != null && _.itemId || _ == null ? void 0 : _.label
      });
      return;
    }
    if (e === "etl-transform") {
      const b = this.dropChain(i).map((y) => (this.model.etlFlows ?? []).find((_) => _.id === y)).find(Boolean);
      if (!b) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const d = new Set((b.steps ?? []).map((y) => y.id));
      let c = (b.steps ?? []).length + 1;
      for (; d.has(`ets-${c}`); ) c++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: b.id,
        id: `ets-${c}`,
        name: `Transformación ${c}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "etl-flow" && !this.dropContainerFor(e, i)) {
      const v = this.uniquePaletteName(o.label);
      l({ kind: "add-etl-flow", id: v.id, name: v.name }, v.id), this.emit("modux-notice", {
        message: "Integrador creado suelto — su contexto dueño se fija en la ficha; cablea fuentes y escrituras aquí"
      });
      return;
    }
    if (e === "workflow-join" || e === "workflow-split") {
      const { id: v, name: b } = this.uniquePaletteName(e === "workflow-join" ? "Join" : "Split");
      l({
        kind: "add-workflow-gateway",
        id: v,
        name: b,
        stepType: e === "workflow-join" ? "JOIN" : "SPLIT"
      }, v), this.emit("modux-notice", {
        message: "Gateway creado suelto — sus líneas dirán de qué workflow es (join: n entradas → 1 salida; split: 1 → n)"
      });
      return;
    }
    if (e === "workflow-step") {
      const b = this.model.workflows ?? [], d = this.dropChain(i), c = d.map((E) => b.find((N) => N.id === E)).find(Boolean), y = d.map((E) => {
        const N = b.find((V) => (V.steps ?? []).some((G) => G.id === E));
        return N ? { owner: N, stepId: E } : null;
      }).find(Boolean);
      let _ = c ?? (y == null ? void 0 : y.owner);
      if (!_ && b.length === 1 && (_ = b[0]), !_) {
        if (!b.length) {
          this.emit("modux-notice", { message: "Crea antes un workflow: los pasos viven en uno" });
          return;
        }
        this._wfStepPicker = { pos: t, stepType: void 0 };
        return;
      }
      const { id: A, name: S } = this.uniquePaletteName(
        "Paso"
      );
      y && (t = { x: t.x + 190, y: t.y }), l(
        {
          kind: "add-workflow-step",
          workflowId: _.id,
          id: A,
          name: S,
          ...y ? { dependsOnStepIds: [y.stepId], afterStepId: y.stepId } : {}
        },
        A
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${_.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const v = this.dropContainerFor("api", i);
      if (!v) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: b, name: d } = this.uniquePaletteName("API"), c = { kind: "add-api", id: b, name: d }, y = this.inverseOf(c) ?? [];
      this.command(c, !1), this.model.externalSystems.some((E) => E.id === v) ? this.command({ kind: "set-api-publisher", id: b, targetId: v }, !1) : this.command({ kind: "add-api-implementation", apiId: b, boundedContextId: v }, !1);
      const _ = this.viewLayout(this._view), A = this.sceneFor(this._view).nodes.find((E) => E.id === v), S = A ? { x: Math.round(t.x - A.x), y: Math.round(t.y - A.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ..._, nodes: { ..._.nodes, [b]: S } }), this.pushUndoEntry([...y, { kind: "move-node", view: this._view, id: b, pos: null }]);
      return;
    }
    let u = this.dropContainerFor(e, i);
    if (!u && this._view === "aggregates" && ["value-object", "entity", "invariant"].includes(e) && (u = this.nearestAggregateTo(t)), !u) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : ["entity", "value-object", "invariant"].includes(e) ? "Suéltalo sobre un agregado (o cerca de uno, en la vista de agregados)" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const { id: h, name: m } = this.uniquePaletteName(o.label);
    if (e === "aggregate")
      l({ kind: "add-aggregate", id: h, name: m, boundedContextId: u }, h, u);
    else if (e === "entity") {
      l({ kind: "add-entity", id: h, name: m, aggregateId: u }, h, u);
      const v = (this.model.aggregates ?? []).find((b) => b.id === u);
      this.emit("modux-notice", { message: `Entidad «${m}» creada en el agregado «${(v == null ? void 0 : v.name) ?? u}»` });
    } else if (e === "value-object") {
      l({ kind: "add-value-object", id: h, name: m, aggregateId: u }, h, u);
      const v = (this.model.aggregates ?? []).find((b) => b.id === u);
      this.emit("modux-notice", { message: `Value object «${m}» creado en el agregado «${(v == null ? void 0 : v.name) ?? u}»` });
    } else if (e === "invariant") {
      this.command({ kind: "add-invariant", ownerId: u, id: h, name: m });
      const v = (this.model.valueObjects ?? []).some((b) => b.id === u) ? "value object" : (this.model.entities ?? []).some((b) => b.id === u) ? "entidad" : "agregado";
      this.emit("modux-notice", {
        message: `Invariante declarado en el ${v} — sus condiciones se detallan en su ficha`
      });
    } else if (e === "ui-button") {
      const v = (this.model.buttonGroups ?? []).find((c) => c.id === u), b = new Set(((v == null ? void 0 : v.buttons) ?? []).map((c) => c.id));
      let d = ((v == null ? void 0 : v.buttons) ?? []).length + 1;
      for (; b.has(`btn-${d}`); ) d++;
      this.command({ kind: "add-group-button", id: u, itemId: `btn-${d}`, label: m }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: u, fieldId: h, name: m });
    else if (e === "module")
      l({ kind: "add-module", id: h, name: m, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      l(
        { kind: "add-use-case", id: h, name: m, boundedContextId: u, ...e === "policy" ? { policy: !0 } : {} },
        h,
        u
      );
    else if (e === "domain-event")
      l({ kind: "add-domain-event", id: h, name: m, boundedContextId: u }, h, u);
    else if (e === "application-event")
      l({ kind: "add-application-event", id: h, name: m, boundedContextId: u }, h, u);
    else if (e === "domain-service")
      l({ kind: "add-domain-service", id: h, name: m, boundedContextId: u }, h, u);
    else if (e === "query-service")
      l({ kind: "add-query-service", id: h, name: m, boundedContextId: u }, h, u);
    else if (e === "scheduled-trigger")
      l({ kind: "add-scheduled-trigger", id: h, name: m, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      l({ kind: "add-notification", id: h, name: m, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      l({ kind: "add-document", id: h, name: m, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      l({ kind: "add-etl-flow", id: h, name: m, boundedContextId: u }, h, u), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const v = (this.model.aggregates ?? []).find((b) => b.id === u);
      l({ kind: "add-read-model", id: h, name: m, aggregateId: u }, h, (v == null ? void 0 : v.boundedContextId) ?? u);
    } else if (e === "api-operation") {
      const v = (this.model.apis ?? []).find((_) => _.id === u), b = new Set(((v == null ? void 0 : v.operations) ?? []).map((_) => _.id));
      let d = m, c = `apiop-${u.replace(/^api-/, "")}-${ce(d)}`;
      for (let _ = 2; b.has(c); _++)
        d = `${o.label} ${_}`, c = `apiop-${u.replace(/^api-/, "")}-${ce(d)}`;
      l({ kind: "add-api-operation", apiId: u, id: c, name: d }, c, u), a.nodes.some(
        (_) => _.parentId === u && (_.kind === "api-operation" || _.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(v == null ? void 0 : v.name) ?? u} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const v = this.model.boundedContexts.flatMap((y) => y.useCases ?? []).find((y) => y.id === u), b = new Set((v == null ? void 0 : v.stepIds) ?? []);
      let d = m, c = `step-${ce(d)}`;
      for (let y = 2; b.has(c); y++)
        d = `${o.label} ${y}`, c = `step-${ce(d)}`;
      l({ kind: "add-use-case-step", useCaseId: u, id: c, name: d }, c, u), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(v == null ? void 0 : v.name) ?? u} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? l({ kind: "add-external-use-case", id: h, name: m, boundedContextId: u }, h, u) : e === "external-table" ? l({ kind: "add-external-table", id: h, name: m, boundedContextId: u }, h, u) : e === "mcp-server" && l({ kind: "add-mcp-server", id: h, name: m, boundedContextId: u }, h, u);
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
    const n = t ? /^btn:([^:]+):(.+)$/.exec(t) : null;
    if (n) {
      const g = (this.model.modelMappings ?? []).find((b) => b.id === e);
      if (g) {
        this.command({
          kind: "set-page-button",
          pageId: n[1],
          useCaseId: n[2],
          label: null,
          mappingId: e
        }), this.emit("modux-notice", { message: `El botón mapea con ${g.name}` });
        return;
      }
      const v = this.model.boundedContexts.flatMap((b) => b.useCases ?? []).find((b) => b.id === e);
      if (v) {
        if (e === n[2]) return;
        const b = (this.model.pages ?? []).find((c) => c.id === n[1]), d = ((b == null ? void 0 : b.buttons) ?? []).find((c) => c.useCaseId === n[2]);
        if (!d) return;
        if (((b == null ? void 0 : b.buttons) ?? []).some((c) => c.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: n[1], useCaseId: n[2] }, !1), this.command(
          { kind: "add-page-button", pageId: n[1], useCaseId: e, label: d.label, type: d.bar },
          !1
        ), d.mappingId && this.command(
          { kind: "set-page-button", pageId: n[1], useCaseId: e, label: null, mappingId: d.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: n[1], useCaseId: e },
          { kind: "add-page-button", pageId: n[1], useCaseId: n[2], label: d.label, type: d.bar },
          ...d.mappingId ? [{ kind: "set-page-button", pageId: n[1], useCaseId: n[2], label: null, mappingId: d.mappingId }] : []
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${v.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const o = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (o) {
      const g = this.model.boundedContexts.flatMap((b) => b.useCases ?? []).find((b) => b.id === e);
      if (!g) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const v = (this.model.pages ?? []).find((b) => b.id === o[1]);
      if (((v == null ? void 0 : v.buttons) ?? []).some((b) => b.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: o[1], useCaseId: e, type: o[2] }), this.emit("modux-notice", { message: `Botón de ${g.name} en la barra ${o[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const s = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, a = s ? s[1] : t && (this.model.pages ?? []).some((g) => g.id === t) ? t : null;
    if (!a) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const r = s ? ((f = this.componentIn(a, s[2])) == null ? void 0 : f.node) ?? null : null, l = this.model.boundedContexts.flatMap((g) => g.useCases ?? []).find((g) => g.id === e);
    if (l) {
      (r == null ? void 0 : r.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: a, componentId: r.id, ...this.cmpPatch(r), useCaseId: e, label: r.label ?? l.name }), this.emit("modux-notice", { message: `El botón lanza ${l.name}` })) : (this.command({ kind: "add-page-button", pageId: a, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${l.name} añadido a la página` }));
      return;
    }
    const u = (this.model.models ?? []).find((g) => g.id === e);
    if (u) {
      (r == null ? void 0 : r.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: a, componentId: r.id, ...this.cmpPatch(r), modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${u.name}` })) : (this.command({ kind: "set-page-model", pageId: a, modelId: e }), this.emit("modux-notice", { message: `${u.name} es el viewmodel de la página` }));
      return;
    }
    const h = (this.model.modelMappings ?? []).find((g) => g.id === e);
    if (h && ((r == null ? void 0 : r.kind) === "button" || (r == null ? void 0 : r.kind) === "form")) {
      this.command({ kind: "set-page-component", pageId: a, componentId: r.id, ...this.cmpPatch(r), mappingId: e }), this.emit("modux-notice", {
        message: r.kind === "form" ? `El formulario mapea con ${h.name} al guardar` : `El botón mapea con ${h.name}`
      });
      return;
    }
    const m = this.model.boundedContexts.flatMap((g) => (g.queryServices ?? []).flatMap((v) => (v.operations ?? []).map((b) => ({ op: b, qs: v })))).find(({ op: g }) => g.id === e);
    if (m) {
      (r == null ? void 0 : r.kind) === "listing" || (r == null ? void 0 : r.kind) === "crud" ? this.command({
        kind: "set-page-component",
        pageId: a,
        componentId: r.id,
        ...this.cmpPatch(r),
        queryOperationId: m.op.id,
        queryServiceId: m.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: a, queryServiceId: m.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${m.op.name}` });
      return;
    }
    this.emit("modux-notice", {
      message: "En Diseño se sueltan casos de uso (botones), modelos (viewmodel) y consultas (listados)"
    });
  }
  /** Full config of a content node: set-page-component REPLACES every field, so drops must resend them all. */
  cmpPatch(e) {
    return {
      title: e.title ?? null,
      text: e.text ?? null,
      label: e.label ?? null,
      useCaseId: e.useCaseId ?? null,
      mappingId: e.mappingId ?? null,
      modelId: e.modelId ?? null,
      queryServiceId: e.queryServiceId ?? null,
      queryOperationId: e.queryOperationId ?? null,
      fieldId: e.fieldId ?? null,
      stereotype: e.stereotype ?? null,
      colspan: e.colspan ?? null,
      detailPageId: e.detailPageId ?? null
    };
  }
  placeExistingFromPalette(e, t, i, n, o, s = null) {
    if (this._view === "design") {
      this.dropCatalogOnDesign(e, i, s);
      return;
    }
    if (i && i !== e) {
      this.applyConnection(e, i, n, o);
      return;
    }
    const a = this._view, r = this.sceneFor(a), l = r.nodes.find((f) => f.id === e);
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
    const u = this.viewLayout(a), h = l.parentId ? r.nodes.find((f) => f.id === l.parentId) : void 0, m = h ? { x: Math.round(t.x - h.x), y: Math.round(t.y - h.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: a, id: e, pos: u.nodes[e] ?? null }]), this.writeViewLayout(a, { ...u, nodes: { ...u.nodes, [e]: m } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "distribution", "workflows", "ui", "design", "mappings", "integrations", "aggregates"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = vo.filter(
      (n) => (this._view === "aggregates" ? ["entity", "value-object", "invariant"].includes(n.type) : this._view === "workflows" ? ["workflow", "workflow-step", "workflow-join", "workflow-split"].includes(n.type) : this._view === "ui" ? ["ui", "ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(n.type) : this._view === "design" ? n.type === "page" || n.type === "custom-code" || n.type.startsWith("cmp:") : this._view === "integrations" ? ["etl-flow", "etl-transform", "external-system", "external-table"].includes(n.type) : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(n.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(n.type) && !n.type.startsWith("cmp:")) && (!e || n.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return I`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(n) => this._paletteFilter = n.target.value}
          />
          ${i === "new" ? I`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${Tp.map((n) => {
      const o = t.filter((s) => s.group === n);
      return o.length ? I`
                        <div class="palette-g">${n}</div>
                        ${o.map(
        (s) => I`
                            <div
                              class="palette-item ${s.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${s.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : s.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(a) => this.onPaletteDragStart(a, { new: s.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                                ${Tt[s.symbol]}
                              </svg>
                              <span class="pal-label">${s.label.replace(/^(Layout|Componente) · /, "")}</span>
                            </div>
                          `
      )}
                      ` : "";
    })}
              ` : I`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (n) => I`
                    <div class="palette-g">${n.label}</div>
                    ${n.items.map(
        (o) => I`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(s) => this.onPaletteDragStart(s, { existing: o.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${n.color}">
                            ${Tt[n.symbol]}
                          </svg>
                          <span class="pal-label">${o.name}</span>
                        </div>
                      `
      )}
                  `
    )}
              `}
        </div>
        ${this._view === "workflows" ? "" : I`
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
    var t, i, n, o, s, a, r;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const l = this._newBoundedContextId || ((t = this.model.boundedContexts[0]) == null ? void 0 : t.id);
        if (!l) return;
        this.command({ kind: "add-aggregate", id: `agg-${ce(e)}`, name: e, boundedContextId: l });
      } else if (this._view === "flows") {
        const l = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), u = this._newTargetId || ((o = this.model.boundedContexts[0]) == null ? void 0 : o.id), h = this._newTriggerEvent.trim();
        if (!l || !u || !h) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ce(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: l,
          triggerEvent: h,
          targetId: u
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const l = this._newBoundedContextId || ((s = this.model.boundedContexts[0]) == null ? void 0 : s.id);
        if (!l) return;
        this.command({
          kind: "add-process",
          id: `proc-${ce(e)}`,
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
    const i = this.viewLayout(e), n = this.filteredModel(), o = (t == null ? void 0 : t.expandAll) ?? !1, s = e === "aggregates" ? ls(n, i.nodes) : e === "flows" ? bs(n, i.nodes) : e === "processes" ? wn(n, i.nodes) : e === "workflows" ? Oc(n, i.nodes, new Set(i.expanded ?? []), o) : e === "ui" ? zc(n, i.nodes, new Set(i.expanded ?? []), o) : e === "design" || e === "interactions" ? { nodes: [], edges: [] } : e === "integrations" ? Vc(n, i.nodes) : e === "mappings" ? qc(n, i.nodes) : e === "eventstorming" ? _c(n, i.nodes, new Set(i.expanded ?? []), o) : e === "distribution" ? es(n, i.nodes, i.sizes ?? {}, new Set(i.expanded ?? []), o) : Za(n, i.nodes, i.sizes ?? {}, new Set(i.expanded ?? []), o);
    if (e !== "design" && e !== "interactions" && (this.withAreas(s, e), this.withNotes(s, e)), this.withDescriptions(s), this.diff)
      for (const r of s.nodes) {
        const l = this.diff[r.id] ?? this.diff[r.id.replace(/^(tgt:|flow:)/, "")];
        l && (r.diffKind = l);
      }
    const a = tp(s, ep(n));
    return this._showDerived ? a : ip(a);
  }
  /**
   * The area layer, per view: an area shows only in the view where it was dropped (its
   * rectangle is that view's layout). It renders BEHIND everything — a named frame whose
   * membership is geometric — and anchors note threads like any other element.
   */
  /**
   * Append each element's description (edited in its ficha) to its node tooltip,
   * so it shows on hover. Node ids may carry a view prefix; the descriptions map
   * is keyed by the raw element id.
   */
  withDescriptions(e) {
    const t = this.model.descriptions;
    if (t)
      for (const i of e.nodes) {
        const n = t[i.id] ?? t[i.id.replace(/^(tgt:|flow:)/, "")];
        n && (i.tooltip = i.tooltip ? `${i.tooltip}

${n}` : n);
      }
  }
  withAreas(e, t) {
    var s, a;
    const i = this.model.areas ?? [];
    if (!i.length) return;
    const n = this.viewLayout(t), o = n.sizes ?? {};
    for (const r of i) {
      const l = n.nodes[r.id];
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
    const i = this.model.notes ?? [];
    if (!i.length) return;
    const n = this.viewLayout(t), o = new Set(e.nodes.map((u) => u.id)), s = new Set(e.edges.map((u) => u.id)), a = n.sizes ?? {};
    for (const u of i) {
      const h = n.nodes[u.id], m = (d) => o.has(d) ? d : o.has(`tgt:${d}`) ? `tgt:${d}` : o.has(`flow:${d}`) ? `flow:${d}` : null, f = (u.targetIds ?? []).map((d) => ({ raw: d, nodeId: m(d) })).filter((d) => !!d.nodeId), g = (u.edgeRefs ?? []).filter((d) => s.has(d));
      if (!h && !f.length && !g.length) continue;
      const v = f.length ? e.nodes.find((d) => d.id === f[0].nodeId) : void 0, b = h ?? { x: ((v == null ? void 0 : v.x) ?? 0) + 40, y: ((v == null ? void 0 : v.y) ?? 0) - 110 };
      e.nodes.push({
        id: u.id,
        label: u.text,
        kind: "note",
        x: b.x,
        y: b.y,
        w: ((r = a[u.id]) == null ? void 0 : r.w) ?? 150,
        h: ((l = a[u.id]) == null ? void 0 : l.h) ?? 72,
        fill: "#fef9c3",
        symbol: "note",
        resizable: !0
      });
      for (const d of f)
        e.edges.push({
          id: `note:${u.id}->${d.raw}`,
          sourceId: u.id,
          targetId: d.nodeId,
          kind: "note-link",
          dashed: !0,
          color: "#ca8a04"
        });
      for (const d of g)
        e.edges.push({
          id: `note:${u.id}->${d}`,
          sourceId: u.id,
          targetId: `edgeanchor:${d}`,
          kind: "note-link",
          dashed: !0,
          color: "#ca8a04"
        });
    }
  }
  /** Screen space the overlays occupy on the left — fit() centers in what remains. */
  fitInsets() {
    const e = this._paletteOpen && ["context-map", "distribution", "workflows", "ui", "aggregates"].includes(this._view), t = this._treeOpen && !!this._activeViewId;
    return t && e ? { left: 532 } : t ? { left: 280 } : e ? { left: 260 } : { left: 0 };
  }
  /**
   * Relayout for the current view, applied as ONE undoable composite move. ELK
   * places the nodes and routes the edges orthogonally; map-like views pass one
   * lane per semantic rank so the left→right meaning is preserved.
   *
   * With a selection, the layout is SCOPED to it: only the selected top-level
   * nodes are rearranged, kept in place (their centroid doesn't move) so the rest
   * of the diagram stays put. With nothing selected, the whole view is relaid.
   */
  async runAutoLayout() {
    var d;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((c) => !c.parentId && c.kind !== "area"), n = this._multi.length ? this._multi : this._selectedId ? [this._selectedId] : [], o = n.length > 0, s = new Set(n), a = o ? i.filter((c) => s.has(c.id)) : i;
    if (a.length < 2) return;
    const r = new Set(a.map((c) => c.id)), l = {
      nodes: a,
      edges: t.edges.filter((c) => r.has(c.sourceId) && r.has(c.targetId))
    }, h = e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? void 0 : Jc(Zc(l)), m = await Wc(l, h ? { partitions: h } : void 0), f = this.viewLayout(e);
    if (o) {
      let c = 0, y = 0, _ = 0, A = 0;
      for (const V of a) {
        const G = f.nodes[V.id] ?? { x: V.x, y: V.y };
        c += G.x, y += G.y, _ += m.nodes[V.id].x, A += m.nodes[V.id].y;
      }
      const S = a.length, E = (c - _) / S, N = (y - A) / S;
      for (const V of Object.keys(m.nodes))
        m.nodes[V] = { x: m.nodes[V].x + E, y: m.nodes[V].y + N };
      for (const V of Object.keys(m.edges))
        m.edges[V] = m.edges[V].map((G) => ({ x: G.x + E, y: G.y + N }));
    }
    const g = o ? l.edges.map((c) => c.id) : [], v = o ? t.edges.filter((c) => r.has(c.sourceId) !== r.has(c.targetId)).map((c) => c.id) : [], b = o ? [.../* @__PURE__ */ new Set([...g, ...v])] : Object.keys(f.edges);
    if (this.pushUndoEntry([
      ...a.map((c) => ({
        kind: "move-node",
        view: e,
        id: c.id,
        pos: f.nodes[c.id] ?? null
      })),
      // relayout rewrites these routes — restore the previous bends on undo
      ...b.map((c) => ({
        kind: "set-edge-points",
        view: e,
        id: c,
        points: f.edges[c] ?? null
      }))
    ]), o) {
      const c = { ...f.nodes };
      for (const _ of a) c[_.id] = m.nodes[_.id];
      const y = { ...f.edges };
      for (const _ of g) delete y[_];
      Object.assign(y, m.edges);
      for (const _ of v) delete y[_];
      this.writeViewLayout(e, { ...f, nodes: c, edges: y });
    } else
      this.writeViewLayout(e, { ...f, nodes: m.nodes, edges: m.edges });
    await this.updateComplete, o || (d = this.renderRoot.querySelector("modux-canvas")) == null || d.fit();
  }
  /**
   * Re-route the edges on the CURRENT node positions without moving anything —
   * the companion to auto-layout for when you've placed the nodes yourself and
   * only the lines look stale. It simply drops the stored routes so the canvas
   * re-draws each edge fresh (orthogonal, around the boxes) and, from then on,
   * live — the routes follow later drags instead of freezing again. With a
   * selection it only touches the lines of the selected nodes. Undoable.
   */
  runRerouteEdges() {
    const e = this._view, t = this.viewLayout(e), i = Object.keys(t.edges);
    if (!i.length) return;
    const n = this._multi.length ? this._multi : this._selectedId ? [this._selectedId] : [];
    let o = i;
    if (n.length) {
      const a = new Set(n), r = new Set(
        this.sceneFor(e).edges.filter((l) => a.has(l.sourceId) || a.has(l.targetId)).map((l) => l.id)
      );
      o = i.filter((l) => r.has(l));
    }
    if (!o.length) return;
    this.pushUndoEntry(
      o.map((a) => ({
        kind: "set-edge-points",
        view: e,
        id: a,
        points: t.edges[a]
      }))
    );
    const s = { ...t.edges };
    for (const a of o) delete s[a];
    this.writeViewLayout(e, { ...t, edges: s });
  }
  /**
   * Line up the selected top-level nodes on a shared axis: `'row'` gives them a
   * common Y (a horizontal row), `'column'` a common X (a vertical column). The
   * shared value is the selection's centroid, so the group stays put on average
   * and moves the least. Lines of the moved nodes re-route clean on the new
   * positions. One undoable step; needs at least two nodes.
   */
  alignSelection(e) {
    const t = this._view, i = this._multi.length ? this._multi : this._selectedId ? [this._selectedId] : [], n = new Set(i), o = this.sceneFor(t).nodes.filter(
      (g) => n.has(g.id) && !g.parentId && g.kind !== "area"
    );
    if (o.length < 2) return;
    const s = this.viewLayout(t), a = (g) => s.nodes[g.id] ?? { x: g.x, y: g.y }, r = e === "row" ? "y" : "x", l = o.reduce((g, v) => g + a(v)[r], 0) / o.length, u = new Set(o.map((g) => g.id)), h = this.sceneFor(t).edges.filter((g) => u.has(g.sourceId) || u.has(g.targetId)).map((g) => g.id).filter((g) => s.edges[g]);
    this.pushUndoEntry([
      ...o.map((g) => ({ kind: "move-node", view: t, id: g.id, pos: s.nodes[g.id] ?? null })),
      ...h.map((g) => ({ kind: "set-edge-points", view: t, id: g, points: s.edges[g] }))
    ]);
    const m = { ...s.nodes };
    for (const g of o) {
      const v = a(g);
      m[g.id] = r === "y" ? { x: v.x, y: l } : { x: l, y: v.y };
    }
    const f = { ...s.edges };
    for (const g of h) delete f[g];
    this.writeViewLayout(t, { ...s, nodes: m, edges: f });
  }
  /**
   * Toolbar controls keep keyboard focus after use, so the next space bar
   * reopens the select (or re-fires the button) instead of panning the canvas.
   * Once a select changes or a button is clicked, the keyboard belongs to the
   * canvas again; text inputs keep focus (the user is typing).
   */
  refocusCanvasAfterControl(e) {
    var o;
    const t = e.target, i = e.type === "change" && t instanceof HTMLSelectElement, n = e.type === "click" && !!t.closest("button");
    !i && !n || (o = this.renderRoot.querySelector("modux-canvas")) == null || o.focus();
  }
  /** Toolbar of the «Secuencias» view: sequence picker, derive, pin, mermaid, participants. */
  renderInteractionToolbar() {
    const e = this.model.interactions ?? [], t = this._interactionMode === "derived", i = Ep(this.model), n = [
      ["Casos de uso", i.filter((r) => r.kind === "USE_CASE")],
      ["Operaciones API", i.filter((r) => r.kind === "API_OPERATION")],
      ["Eventos", i.filter((r) => r.kind === "EVENT")]
    ], o = bo(this.model), s = [...new Set(o.map((r) => r.group))], a = !t && !!this._editingInteraction;
    return I`
      <select
        title="Secuencia authoreda del modelo — «＋ Nueva…» crea una vacía"
        @change=${(r) => this.onInteractionPick(r)}
      >
        <option value="" ?selected=${!t && !this._interactionId}>Secuencia: —</option>
        ${e.map(
      (r) => I`<option value=${r.id} ?selected=${!t && this._interactionId === r.id}>
              ${r.name}
            </option>`
    )}
        <option value="__new__">＋ Nueva…</option>
      </select>
      <select
        title="Derivar una secuencia efímera de un punto de entrada (solo lectura hasta fijarla)"
        @change=${(r) => this.onDerivePick(r)}
      >
        <option value="" ?selected=${t}>Derivar de: …</option>
        ${n.filter(([, r]) => r.length).map(
      ([r, l]) => I`
              <optgroup label=${r}>
                ${l.map((u) => I`<option value="${u.kind}|${u.ref}">${u.label}</option>`)}
              </optgroup>
            `
    )}
      </select>
      ${t && this.derivedInteraction ? I`<button
            class="tab"
            title="Guardar la secuencia derivada como authoreda en el modelo"
            @click=${() => this.pinDerivedInteraction()}
          >
            📌 Fijar como secuencia
          </button>` : ""}
      ${this.currentInteraction() ? I`<button
            class="tab"
            title="Copiar el sequenceDiagram mermaid de lo visible"
            @click=${() => void this.copyInteractionMermaid()}
          >
            ⧉ Mermaid
          </button>` : ""}
      ${!t && this._interactionId ? I`<button
            class="tab"
            title="Borrar la secuencia activa del modelo"
            @click=${() => {
      var r;
      return this._interactionDelete = {
        id: this._interactionId,
        name: ((r = this._editingInteraction) == null ? void 0 : r.name) ?? this._interactionId
      };
    }}
          >
            🗑
          </button>` : ""}
      <select
        title="Añadir un participante del catálogo a la secuencia (sin mensajes aún)"
        ?disabled=${!a}
        @change=${(r) => this.onParticipantPick(r)}
      >
        <option value="">＋ Participante…</option>
        ${s.map(
      (r) => I`
            <optgroup label=${r}>
              ${o.filter((l) => l.group === r).map((l) => I`<option value=${l.ref}>${l.label}</option>`)}
            </optgroup>
          `
    )}
      </select>
    `;
  }
  /** The «Secuencias» surface: one interaction as lifelines — no canvas Scene. */
  renderInteractionsView() {
    return this._interactionMode === "derived" ? this._derivePending ? I`<div class="seq-status">Derivando la secuencia…</div>` : this.derivedInteraction ? I`<modux-sequence
        .interaction=${this.derivedInteraction}
        .model=${this.model}
      ></modux-sequence>` : I`<div class="seq-status">
          La derivación no está disponible en este servidor (o ese punto de entrada no deriva nada
          todavía) — crea la secuencia a mano con «＋ Nueva…».
        </div>` : this._editingInteraction ? I`<modux-sequence
      .interaction=${this._editingInteraction}
      .model=${this.model}
      editable
      @interaction-changed=${this.onInteractionChanged}
      @interaction-materialize=${this.onInteractionMaterialize}
      @undo-requested=${this.undo}
      @redo-requested=${this.redo}
    ></modux-sequence>` : I`<div class="seq-status">
        Elige una secuencia del modelo, crea una con «＋ Nueva…» o deriva una de un caso de uso,
        una operación API o un evento.
      </div>`;
  }
  /** Name prompt of the Secuencias view (nueva secuencia / fijar derivada). */
  renderInteractionPrompt() {
    const e = this._interactionPrompt;
    if (!e) return "";
    const t = () => {
      const i = e.value.trim();
      this._interactionPrompt = null, i && e.apply(i);
    };
    return I`
      <div class="picker-backdrop" @pointerdown=${() => this._interactionPrompt = null}></div>
      <div
        class="relation-picker"
        style="left: 50%; top: 120px"
        @pointerdown=${(i) => i.stopPropagation()}
      >
        <div class="picker-title">${e.title}</div>
        <input
          style="width: 240px; margin: 6px 10px; padding: 5px 8px; border: 1px solid var(--modux-border-strong, #cbd5e1); border-radius: 6px; font: 12px system-ui;"
          placeholder="p. ej. Check-in online"
          .value=${e.value}
          @input=${(i) => e.value = i.target.value}
          @keydown=${(i) => {
      i.key === "Enter" && t(), i.key === "Escape" && (this._interactionPrompt = null);
    }}
        />
        <button class="picker-item" @click=${t}>Guardar</button>
      </div>
    `;
  }
  /** Confirmation before deleting the active authored interaction. */
  renderInteractionDelete() {
    const e = this._interactionDelete;
    return e ? I`
      <div class="picker-backdrop" @pointerdown=${() => this._interactionDelete = null}></div>
      <div
        class="relation-picker"
        style="left: 50%; top: 120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿Eliminar la secuencia «${e.name}» del modelo?</div>
        <button
          class="picker-item danger"
          @click=${() => {
      this._interactionDelete = null, this._interactionId = null, this._editingInteraction = null, this.command({ kind: "remove-interaction", id: e.id });
    }}
        >
          <span class="abbr">🗑</span>
          <span class="name">Eliminar «${e.name}»</span>
        </button>
        <button class="picker-item" @click=${() => this._interactionDelete = null}>
          <span class="abbr">↩</span>
          <span class="name">Cancelar</span>
        </button>
      </div>
    ` : "";
  }
  render() {
    const e = this.sceneFor(this._view);
    return I`
      <div class="toolbar"
           @change=${this.refocusCanvasAfterControl}
           @click=${this.refocusCanvasAfterControl}>
        <span
          class="brand"
          title="Editor gráfico — context map, agregados, flows, procesos y eventstorming sobre lienzo editable; los cambios se guardan en el modelo"
        >Editor gráfico</span>
        <button
          class="tab hamburger"
          ?hidden=${!["context-map", "distribution", "workflows", "ui", "design", "mappings", "integrations", "aggregates"].includes(this._view)}
          ?data-active=${this._paletteOpen}
          title="Paleta de elementos: arrastra nuevos o existentes al lienzo (P)"
          @click=${() => this._paletteOpen = !this._paletteOpen}
        >
          ☰
        </button>
        <select
          title="Qué pinta el lienzo: el mapa (expande cada elemento a discreción), o una vista especializada"
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
            <option value="view:eventstorming" ?selected=${this._view === "eventstorming"}>
              EventStorming
            </option>
            <option value="view:interactions" ?selected=${this._view === "interactions"}>
              Secuencias
            </option>
            <option value="view:design" ?selected=${this._view === "design"}>
              Diseño (páginas)
            </option>
          </optgroup>
        </select>
        <select
          title="Limitar el lienzo a una vista del modelo — cada vista guarda su propia lámina (posiciones y expansión)"
          @change=${(t) => this.activateVista(t.target.value)}
        >
          <option value="" ?selected=${this._activeViewId === ""}>Vista: todo el modelo</option>
          ${(this.model.views ?? []).filter((t) => t.kind === "CURATED").map(
      (t) => I`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? I`
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
      (t) => I`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this._view === "interactions" ? this.renderInteractionToolbar() : ""}
        <div class="spacer"></div>
        ${this.viewSelection().length || !this._activeViewId && (this._view === "context-map" || this._view === "distribution") ? I`
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
        ${this._view === "aggregates" || this._view === "processes" ? I`<select
              title=${this._view === "aggregates" ? "Contexto del nuevo agregado" : "Contexto dueño del proceso"}
              @change=${(t) => this._newBoundedContextId = t.target.value}
            >
              ${this.model.boundedContexts.map(
      (t) => {
        var i;
        return I`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newBoundedContextId || ((i = this.model.boundedContexts[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? I`
              ${this._view === "flows" ? I`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => I`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return I`<option
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
              ${this._view === "flows" ? I`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.boundedContexts, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return I`<option
                          value=${t.id}
                          ?selected=${t.id === (this._newTargetId || ((i = this.model.boundedContexts[0]) == null ? void 0 : i.id))}
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? I`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => I`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? I`
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
      (t) => I`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? I`<input
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
              ${this.owningProcessOf(this._selectedId) ? I`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? I`
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
      (t) => I`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? I`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.boundedContexts.flatMap((t) => t.useCases ?? []).map(
      (t) => I`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
          title="Ajustar la vista a la selección (o a todo el diagrama, si no hay selección)"
          @click=${() => {
      var t, i;
      (t = this.renderRoot.querySelector("modux-canvas")) == null || t.fit(), (i = this.renderRoot.querySelector("modux-explorer")) == null || i.fit();
    }}
        >
          ⌖ Ajustar
        </button>
        <button
          class="tab"
          title="Alejar (tecla −)"
          ?disabled=${this._yugo}
          @click=${() => {
      var t;
      return (t = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : t.zoomBy(1 / 1.25);
    }}
        >
          −
        </button>
        <button
          class="tab"
          title="Acercar (tecla +)"
          ?disabled=${this._yugo}
          @click=${() => {
      var t;
      return (t = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : t.zoomBy(1.25);
    }}
        >
          +
        </button>
        <button
          class="tab"
          title=${this._multi.length >= 2 ? `Recoloca solo los ${this._multi.length} elementos seleccionados (deshacible)` : "Recoloca todo el diagrama automáticamente — o solo la selección si la hay (deshacible)"}
          ?disabled=${this._yugo}
          @click=${() => void this.runAutoLayout()}
        >
          ✨ Auto-layout${this._multi.length >= 2 ? ` (${this._multi.length})` : ""}
        </button>
        <button
          class="tab"
          title=${this.viewSelection().length ? "Recalcula solo las líneas de la selección sobre las posiciones actuales, sin mover los nodos (deshacible)" : "Recalcula todas las líneas sobre las posiciones actuales, sin mover los nodos (deshacible)"}
          ?disabled=${this._yugo}
          @click=${() => this.runRerouteEdges()}
        >
          ↻ Líneas
        </button>
        ${this._multi.length >= 2 && !this._yugo ? I`
              <button
                class="tab"
                title="Alinear los seleccionados en una fila (misma altura)"
                @click=${() => this.alignSelection("row")}
              >
                ↔ Alinear
              </button>
              <button
                class="tab"
                title="Alinear los seleccionados en una columna (misma vertical)"
                @click=${() => this.alignSelection("column")}
              >
                ↕ Alinear
              </button>
            ` : ""}
        ${this._view === "workflows" && ((this.model.processes ?? []).length || (this.model.sagas ?? []).length) ? I`<button
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
          ?disabled=${this._view === "design" || this._view === "interactions"}
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
          ?disabled=${this._view === "design" || this._view === "interactions"}
          ?data-active=${!this._showDerived}
          title=${this._showDerived ? "Ocultar los elementos inferidos (stubs generados por el sistema, marcados ✦)" : "Mostrar los elementos inferidos (stubs generados por el sistema, marcados ✦)"}
          @click=${() => this._showDerived = !this._showDerived}
        >
          ✦ Inferidos: ${this._showDerived ? "visibles" : "ocultos"}
        </button>
        <button
          class="tab"
          ?data-active=${this._fullscreen}
          title=${this._fullscreen ? "Salir de pantalla completa (F o Esc)" : "El diagrama a pantalla completa (F)"}
          @click=${() => void this.toggleFullscreen()}
        >
          ⛶
        </button>
        <button
          class="tab"
          ?data-active=${this._helpOpen}
          title="Atajos de teclado y gestos (?)"
          @click=${() => this._helpOpen = !this._helpOpen}
        >
          ?
        </button>
      </div>
      <div class="canvas-wrap">
      ${this._view === "interactions" ? this.renderInteractionsView() : this._view === "design" ? I`${this.renderPalette()}${this.renderFigma()}` : this._yugo ? I`${this.renderPalette()}<modux-explorer
            class="yugo"
            .scene=${this.sceneFor(this._view, { expandAll: !0 })}
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
      const i = /* @__PURE__ */ new Set([
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
      ]), n = [...new Set(
        t.detail.members.filter((s) => i.has(s.kind)).map((s) => s.id)
      )];
      if (!n.length) {
        this.emit("modux-notice", { message: "Despliega algo antes de crear la vista" });
        return;
      }
      const o = crypto.randomUUID();
      this.command({ kind: "add-view", id: o, name: t.detail.name, memberIds: n }), this.activateVista(o), this.emit("modux-notice", {
        message: `Vista «${t.detail.name}» creada con lo desplegado (${n.length} miembros)`
      });
    }}
          ></modux-explorer>` : this._tilt ? I`
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
          ></modux-tilt>` : I`
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
        ${this._view === "interactions" ? I`Arrastra entre líneas de vida para crear un mensaje · arrastra un mensaje
            verticalmente para reordenarlo · doble click edita etiqueta, guarda y tipo · Supr
            borra el mensaje o el participante seleccionado · ✨ materializa un mensaje sin
            respaldo · una secuencia derivada es de solo lectura hasta fijarla con 📌` : this._view === "context-map" ? I`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema (y un sistema externo dentro/fuera de otro) · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? I`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? I`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : I`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra (si está vacío) · F2 renombra · doble click abre el CRUD ·
            rueda para zoom`}
        · pulsa <b>?</b> para los atajos
      </div>
      ${this.renderRelationPicker()} ${this.renderRepoPicker()} ${this.renderWfStepPicker()} ${this.renderBranchCondEditor()} ${this.renderExtDepPicker()} ${this.renderConnectPicker()} ${this.renderDeletePicker()}
      ${this.renderInteractionPrompt()} ${this.renderInteractionDelete()}
      ${this.renderHelpPopover()}
    `;
  }
  /** The keyboard cheatsheet (toggled with ? and closed with Esc or a click outside). */
  renderHelpPopover() {
    return this._helpOpen ? I`
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
      ["0", "Ajustar la vista a la selección (o a todo el diagrama)"],
      ["+ / −", "Zoom (también con la rueda)"],
      ["1 · 4", "Mapa del sistema · Distribución"],
      ["2", "Secuencias (interacciones)"],
      ["5 · 6 · 7 · 8 · 9", "Flows · Procesos · Workflows · UI · Diseño"],
      ["A", "Vista de agregados"],
      ["E", "Vista EventStorming"],
      ["V", "Vista 3D (placas apiladas, tipo Firefox Tilt)"],
      ["T", "Árbol del catálogo (con una vista activa)"],
      ["Supr", "Borrar la selección"],
      ["F2", "Renombrar el nodo seleccionado"],
      ["Ctrl+Z / Ctrl+Y", "Deshacer / rehacer"],
      ["Espacio+arrastrar", "Mover el lienzo"],
      ["Shift+click / arrastrar", "Multi-selección / banda elástica"],
      ["Alt+arrastrar", "Arrastre libre (desactiva el snap a rejilla y las guías)"],
      ["?", "Esta ayuda"]
    ].map(
      ([t, i]) => I`
            <div class="help-row"><span class="help-keys">${t}</span><span>${i}</span></div>
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
    const t = (this.model.views ?? []).find((a) => a.id === this._activeViewId), i = this.sceneFor(this._view), n = e.items.map(
      (a) => {
        var r;
        return ((r = i.nodes.find((l) => l.id === a.id)) == null ? void 0 : r.label) ?? a.id;
      }
    ), o = n.length === 1 ? `«${n[0]}»` : `${n.length} elementos (${n.join(", ")})`, s = e.memberIds.length > 0 && t;
    return I`
      <div class="picker-backdrop" @pointerdown=${() => this._deletePicker = null}></div>
      <div
        class="relation-picker"
        style="left: 50%; top: 120px"
        @pointerdown=${(a) => a.stopPropagation()}
      >
        <div class="picker-title">
          ${s ? `¿Eliminar ${o}, o solo quitar de la vista?` : `¿Eliminar ${o} del modelo?`}
        </div>
        ${s ? I`
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
  /** The magic connector's question: which of the fitting relation types is this line? */
  renderConnectPicker() {
    const e = this._connectPicker;
    return e ? I`
      <div class="picker-backdrop" @pointerdown=${() => this._connectPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿Qué relación es esta línea?</div>
        ${e.options.map(
      (t) => I`
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
    var n;
    const e = this._extDepPicker;
    if (!e) return "";
    const t = (n = (this.model.externalSystemDependencies ?? []).find(
      (o) => o.sourceId === e.sourceId && o.targetId === e.targetId
    )) == null ? void 0 : n.type, i = [
      { type: "DEPENDS", abbr: "DEP", name: "Dependencia simple" },
      { type: "CQRS", abbr: "CQRS", name: "CQRS — consulta sobre sus datos" }
    ];
    return I`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(o) => o.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (o) => I`
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
    return e ? I`
      <div class="picker-backdrop" @pointerdown=${() => this._repoPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">Referenciar proyecto del catálogo</div>
        ${this.repositories.map(
      (t) => I`
            <button
              class="picker-item"
              title=${t.id}
              @click=${() => {
        this._repoPicker = null;
        const i = `proj-${t.id}`;
        this.command({ kind: "add-project-reference", targetId: t.id, id: i }, !1);
        const n = this.viewLayout(this._view);
        this.writeViewLayout(this._view, {
          ...n,
          nodes: { ...n.nodes, [i]: { x: Math.round(e.pos.x), y: Math.round(e.pos.y) } }
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
    return e ? I`
      <div class="picker-backdrop" @pointerdown=${() => this._branchCondEditor = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">Condición de la rama (vacío la quita)</div>
        <input
          style="width: 240px; margin: 6px 10px; padding: 5px 8px; border: 1px solid var(--modux-border-strong, #cbd5e1); border-radius: 6px; font: 12px system-ui;"
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
    return e ? I`
      <div class="picker-backdrop" @pointerdown=${() => this._wfStepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿De qué workflow es el paso?</div>
        ${(this.model.workflows ?? []).map(
      (t) => I`
            <button
              class="picker-item"
              @click=${() => {
        const i = e;
        this._wfStepPicker = null;
        const { id: n, name: o } = this.uniquePaletteName(
          i.stepType === "JOIN" ? "Join" : i.stepType === "SPLIT" ? "Split" : "Paso"
        );
        this.command(
          {
            kind: "add-workflow-step",
            workflowId: t.id,
            id: n,
            name: o,
            ...i.stepType ? { stepType: i.stepType } : {}
          },
          !1
        );
        const s = this.viewLayout(this._view);
        this.writeViewLayout(this._view, {
          ...s,
          nodes: { ...s.nodes, [n]: { x: Math.round(i.pos.x), y: Math.round(i.pos.y) } }
        }), this.pushUndoEntry([
          { kind: "remove-workflow-step", workflowId: t.id, id: n },
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
  renderRelationPicker() {
    var i;
    const e = this._relationPicker;
    if (!e) return "";
    const t = e.mode === "edit" ? (i = this.model.relations.find(
      (n) => n.sourceId === e.sourceId && n.targetId === e.targetId
    )) == null ? void 0 : i.type : this._relationType;
    return I`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${zp.map(
      (n) => I`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${ln[n].abbr}</span>
              <span class="name">${ln[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
ie.styles = [
  la,
  nt`
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
      background: var(--modux-surface);
      border: 1px solid var(--modux-border);
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
      background: var(--modux-surface-2);
      border-left: 1px solid var(--modux-border);
    }
    .palette-vtab {
      writing-mode: vertical-rl;
      border: none;
      background: transparent;
      font: inherit;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: var(--modux-text-dim);
      padding: 10px 4px;
      border-radius: 6px;
      cursor: pointer;
    }
    .palette-vtab[data-active] {
      background: var(--modux-primary);
      color: var(--modux-primary-text);
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
      color: var(--modux-text);
      padding: 3px 8px;
    }
    .help-keys {
      flex: 0 0 150px;
      font-weight: 700;
      color: var(--modux-primary);
      font-family: ui-monospace, monospace;
      font-size: 11px;
    }
    .palette-filter {
      width: 100%;
      box-sizing: border-box;
      font: inherit;
      font-size: 12px;
      padding: 4px 8px;
      border: 1px solid var(--modux-border-strong);
      border-radius: 6px;
      margin-bottom: 6px;
      background: var(--modux-input-bg);
      color: var(--modux-text);
    }
    .palette-h {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--modux-text-dim);
      margin: 10px 2px 4px;
    }
    .palette-g {
      font-size: 11px;
      font-weight: 600;
      color: var(--modux-text-dim);
      margin: 8px 2px 2px;
    }
    .palette-item {
      font-size: 12px;
      color: var(--modux-text);
      padding: 4px 8px;
      border: 1px solid var(--modux-border);
      border-radius: 6px;
      margin: 2px 0;
      cursor: grab;
      background: var(--modux-surface-2);
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
      background: var(--modux-primary-soft);
      border-color: var(--modux-primary);
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
      background: var(--modux-surface);
      border: 1px solid var(--modux-border);
      border-radius: 10px;
      overflow: hidden;
    }
    .brand {
      font: 600 12px ui-sans-serif, system-ui, sans-serif;
      color: var(--modux-text-faint);
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
      border-bottom: 1px solid var(--modux-border);
      background: var(--modux-surface-2);
      flex-wrap: wrap;
    }
    .tab {
      border: none;
      background: transparent;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 13px;
      cursor: pointer;
      color: var(--modux-text);
    }
    .tab[data-active] {
      background: var(--modux-primary);
      color: var(--modux-primary-text);
    }
    .tab:disabled {
      color: var(--modux-text-faint);
      cursor: not-allowed;
    }
    .spacer {
      flex: 1;
    }
    label {
      font-size: 12px;
      color: var(--modux-text-dim);
    }
    select,
    .new-name {
      font-size: 13px;
      padding: 4px 6px;
      border-radius: 6px;
      border: 1px solid var(--modux-border-strong);
      background: var(--modux-input-bg);
      color: var(--modux-text);
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
      background: var(--modux-surface);
      border: 1px solid var(--modux-border);
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
      color: var(--modux-text-dim);
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
      color: var(--modux-text);
    }
    .picker-item:hover {
      background: var(--modux-surface-2);
    }
    .picker-item.current {
      background: var(--modux-primary-soft);
    }
    .picker-item .abbr {
      flex: 0 0 34px;
      font-weight: 700;
      font-size: 11px;
      color: var(--modux-primary);
      text-align: center;
    }
    .picker-item.current .abbr::after {
      content: ' ✓';
    }
    .picker-item.danger .abbr {
      color: var(--modux-danger);
    }
    .picker-item.danger:hover {
      background: var(--modux-surface-2);
    }
    .relation-picker input,
    .relation-picker select {
      background: var(--modux-input-bg);
      border-color: var(--modux-border-strong);
      color: var(--modux-text);
    }
    .tab:disabled {
      opacity: 0.4;
    }
    .sep {
      width: 1px;
      align-self: stretch;
      background: var(--modux-border);
      margin: 2px 4px;
    }
    [hidden] {
      display: none !important;
    }
    .hint {
      font-size: 12px;
      color: var(--modux-text-faint);
      padding: 4px 12px;
      border-top: 1px solid var(--modux-border);
    }
    modux-canvas,
    modux-tilt,
    modux-figma,
    modux-explorer,
    modux-sequence {
      flex: 1;
      min-height: 0;
    }
    .seq-status {
      flex: 1;
      min-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 32px;
      color: var(--modux-text-faint);
      font-size: 13px;
      background: var(--modux-surface);
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
      background: var(--modux-surface);
      border: 1px solid var(--modux-border-strong);
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
      color: var(--modux-text-dim);
      margin: 10px 0 4px;
    }
    .view-tree label {
      display: flex;
      gap: 7px;
      align-items: center;
      padding: 2px 0;
      font-size: 13px;
      color: var(--modux-text);
      cursor: pointer;
    }
    .view-tree label.child {
      margin-left: 18px;
      color: var(--modux-text-dim);
    }
    .view-tree label.implicit {
      color: var(--modux-text-faint);
    }
    .view-tree .tree-title {
      font-size: 12px;
      font-weight: 700;
      color: var(--modux-text);
      padding: 2px 0 4px;
    }
  `
];
ne([
  de({ attribute: !1 })
], ie.prototype, "model", 2);
ne([
  de({ attribute: !1 })
], ie.prototype, "layout", 2);
ne([
  de({ attribute: !1 })
], ie.prototype, "diff", 2);
ne([
  U()
], ie.prototype, "_view", 2);
ne([
  U()
], ie.prototype, "_relationType", 2);
ne([
  U()
], ie.prototype, "_relationPicker", 2);
ne([
  U()
], ie.prototype, "_extDepPicker", 2);
ne([
  U()
], ie.prototype, "_selectedId", 2);
ne([
  U()
], ie.prototype, "_paletteOpen", 2);
ne([
  U()
], ie.prototype, "_yugo", 2);
ne([
  U()
], ie.prototype, "_showDerived", 2);
ne([
  de({ attribute: !1 })
], ie.prototype, "repositories", 2);
ne([
  de({ type: Boolean, reflect: !0 })
], ie.prototype, "dark", 2);
ne([
  U()
], ie.prototype, "_repoPicker", 2);
ne([
  U()
], ie.prototype, "_wfStepPicker", 2);
ne([
  U()
], ie.prototype, "_branchCondEditor", 2);
ne([
  U()
], ie.prototype, "_paletteFilter", 2);
ne([
  U()
], ie.prototype, "_paletteTab", 2);
ne([
  U()
], ie.prototype, "_selectedCmp", 2);
ne([
  U()
], ie.prototype, "_fullscreen", 2);
ne([
  U()
], ie.prototype, "_tilt", 2);
ne([
  U()
], ie.prototype, "_helpOpen", 2);
ne([
  U()
], ie.prototype, "_newName", 2);
ne([
  U()
], ie.prototype, "_newBoundedContextId", 2);
ne([
  U()
], ie.prototype, "_newArchetype", 2);
ne([
  U()
], ie.prototype, "_newTriggerAggId", 2);
ne([
  U()
], ie.prototype, "_newTriggerEvent", 2);
ne([
  U()
], ie.prototype, "_newTargetId", 2);
ne([
  U()
], ie.prototype, "_undoStack", 2);
ne([
  U()
], ie.prototype, "_redoStack", 2);
ne([
  U()
], ie.prototype, "_newStepName", 2);
ne([
  U()
], ie.prototype, "_newStepType", 2);
ne([
  U()
], ie.prototype, "_newStepRole", 2);
ne([
  U()
], ie.prototype, "_newStepDeadline", 2);
ne([
  U()
], ie.prototype, "_editStepRole", 2);
ne([
  U()
], ie.prototype, "_editStepDeadline", 2);
ne([
  U()
], ie.prototype, "_editStepComp", 2);
ne([
  U()
], ie.prototype, "_newStepUseCase", 2);
ne([
  U()
], ie.prototype, "_newStepEmits", 2);
ne([
  U()
], ie.prototype, "_editStepUseCase", 2);
ne([
  U()
], ie.prototype, "_editStepEmits", 2);
ne([
  U()
], ie.prototype, "_editStepAwaits", 2);
ne([
  U()
], ie.prototype, "_multi", 2);
ne([
  U()
], ie.prototype, "_newViewName", 2);
ne([
  U()
], ie.prototype, "_interactionId", 2);
ne([
  U()
], ie.prototype, "_editingInteraction", 2);
ne([
  U()
], ie.prototype, "_interactionMode", 2);
ne([
  de({ attribute: !1 })
], ie.prototype, "derivedInteraction", 2);
ne([
  U()
], ie.prototype, "_derivePending", 2);
ne([
  U()
], ie.prototype, "_interactionPrompt", 2);
ne([
  U()
], ie.prototype, "_interactionDelete", 2);
ne([
  U()
], ie.prototype, "_connectPicker", 2);
ne([
  U()
], ie.prototype, "_activeViewId", 2);
ne([
  U()
], ie.prototype, "_newRagSourceType", 2);
ne([
  U()
], ie.prototype, "_newRagSourceUri", 2);
ne([
  U()
], ie.prototype, "_addMemberKey", 2);
ne([
  U()
], ie.prototype, "_treeOpen", 2);
ne([
  U()
], ie.prototype, "_deletePicker", 2);
ie = ne([
  mt("modux-editor")
], ie);
var Fp = Object.defineProperty, Vp = Object.getOwnPropertyDescriptor, $e = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Vp(t, i) : t, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (o = (n ? a(t, i, o) : a(o)) || o);
  return n && o && Fp(t, i, o), o;
};
let ge = class extends je {
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
    }, this._commandChain = Promise.resolve(), this._derivedInteraction = null;
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
    ], t = (n) => ge.TYPE_LABELS[n] ?? n;
    return I`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: n, title: o, mark: s, cls: a }) => {
      const r = this._diff.changes.filter((l) => l.kind === n);
      return r.length ? I`
            <div class="diff-group">${o} (${r.length})</div>
            ${r.map(
        (l) => I`
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
      const i = JSON.parse(localStorage.getItem("mateu-app-context") ?? "{}"), n = JSON.parse(localStorage.getItem("mateu-app-context-labels") ?? "{}");
      i.model = e, n.model = t, localStorage.setItem("mateu-app-context", JSON.stringify(i)), localStorage.setItem("mateu-app-context-labels", JSON.stringify(n));
    } catch {
    }
  }
  /** create / discard / status / merge against the solutions API, then reload. */
  async solutionOp(e, t) {
    var o, s, a;
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
          let u = `El servidor rechazó la operación (${l.status})`;
          try {
            const h = await l.json();
            h != null && h.message && (u = h.message);
          } catch {
          }
          this.showToast(u);
          return;
        }
        this._workspace = await l.json(), await this.reload(), await this.refreshDiff(), (r = this.renderRoot.querySelector("modux-editor")) == null || r.clearHistory();
      } catch (l) {
        this.showToast(String(l));
      }
    });
    const n = (s = this._workspace) == null ? void 0 : s.current;
    if (n && n !== i) {
      const r = ((a = this._workspace.solutions.find((l) => l.branch === n)) == null ? void 0 : a.name) ?? n.replace(/^solution\//, "");
      this.syncModelContext(
        n,
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
    return this._tagsOpen ? I`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Versiones etiquetadas</span>
          <button title="Cerrar el listado" @click=${() => this._tagsOpen = !1}>✕</button>
        </div>
        ${this._tags.length ? this._tags.map(
      (e) => I`
                <div class="diff-row">
                  <span class="diff-mark added">🏷</span>
                  <span class="diff-type">${e.date}</span>
                  <span class="diff-name" title=${e.message || e.name}>${e.name}</span>
                </div>
              `
    ) : I`<div class="diff-row"><span class="diff-name">Sin versiones aún — «Etiquetar…» nombra el estado actual</span></div>`}
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
    const { content: t, fileName: i, apiId: n, homeExternalId: o, homeBoundedContextId: s } = e.detail;
    await this.trackWrite(async () => {
      try {
        const a = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: n })
        });
        if (!a.ok) {
          let h = `El servidor rechazó el contrato (${a.status})`;
          try {
            const m = await a.json();
            m != null && m.message && (h = m.message);
          } catch {
          }
          this.showToast(h);
          return;
        }
        const { apiId: r } = await a.json(), l = o ? { kind: "set-api-publisher", id: r, targetId: o } : s ? { kind: "add-api-implementation", apiId: r, boundedContextId: s } : null;
        l && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(l)
        });
        const u = await fetch(`${this.base}/model`);
        u.ok && (this._model = await u.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${r}`, "info");
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
            const o = await t.json();
            o != null && o.message && (n = o.message);
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
  /**
   * The Secuencias view asks for an ephemeral derived interaction. Old servers
   * (no /interactions/derive endpoint) fail SILENTLY: the view shows its own
   * discreet notice once the request times out.
   */
  async onDeriveInteraction(e) {
    const { kind: t, ref: i } = e.detail;
    try {
      const n = await fetch(
        `${this.base}/interactions/derive?kind=${encodeURIComponent(t)}&ref=${encodeURIComponent(i)}`
      );
      if (!n.ok) return;
      this._derivedInteraction = await n.json();
    } catch {
    }
  }
  render() {
    var e, t;
    return this._error ? I`<div class="status error">modux editor: ${this._error}</div>` : this._model ? I`
      ${this._workspace ? I`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : I`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              ${this._taggingVersion ? I`
                    <input
                      placeholder="Nombre de la versión…"
                      .value=${this._newTagName}
                      @input=${(i) => this._newTagName = i.target.value}
                      @keydown=${(i) => i.key === "Enter" && void this.createTag()}
                    />
                    <button @click=${() => void this.createTag()}>Etiquetar</button>
                    <button @click=${() => this._taggingVersion = !1}>Cancelar</button>
                  ` : I`<button
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
      const i = (n) => this._diff.changes.filter((o) => o.kind === n).length;
      return I`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? I`
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
        (o) => o.branch === this._workspace.current
      )) == null ? void 0 : n.status;
      return I`
                      ${i === "EXPLORING" ? I`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? I`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? I`<button
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
      ${this._mergeFlow ? I`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => I`
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
        ?dark=${this._dark}
        .model=${this._model}
        .layout=${this._layout}
        .repositories=${this._repositories}
        .derivedInteraction=${this._derivedInteraction}
        .diff=${this._diff && !((t = this._workspace) != null && t.system) ? Object.fromEntries(
      this._diff.changes.filter((i) => i.kind !== "REMOVED").map((i) => [i.id, i.kind])
    ) : null}
        @modux-command=${this.onCommand}
        @interaction-derive-requested=${this.onDeriveInteraction}
        @modux-import-api=${this.onImportApi}
        @layout-changed=${this.onLayoutChanged}
        @modux-notice=${(i) => this.showToast(i.detail.message, i.detail.kind ?? "info")}
        style=${this._saving ? "opacity: 0.7" : ""}
      ></modux-editor>
      ${this._toast ? I`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : I`<div class="status">Cargando el modelo…</div>`;
  }
};
ge.styles = [
  la,
  nt`
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
      color: var(--modux-text);
      background: var(--modux-surface-2);
      border: 1px solid var(--modux-border);
      border-bottom: none;
      border-radius: 10px 10px 0 0;
    }
    .workspace label {
      font-size: 12px;
      color: var(--modux-text-dim);
    }
    .workspace select,
    .workspace input {
      font-size: 13px;
      padding: 4px 6px;
      border-radius: 6px;
      border: 1px solid var(--modux-border-strong);
      background: var(--modux-input-bg);
      color: var(--modux-text);
    }
    .workspace button {
      border: none;
      background: transparent;
      padding: 5px 10px;
      border-radius: 8px;
      font-size: 13px;
      cursor: pointer;
      color: var(--modux-text);
    }
    .workspace button:hover {
      background: var(--modux-border);
    }
    .workspace .badge {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.05em;
      padding: 2px 8px;
      border-radius: 999px;
      background: var(--modux-primary-soft);
      color: var(--modux-primary);
    }
    .workspace .badge.solution {
      background: var(--modux-note-fill);
      color: var(--modux-text);
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
      background: var(--modux-surface-2);
    }
    .diff-panel {
      font: 13px ui-sans-serif, system-ui, sans-serif;
      color: var(--modux-text);
      background: var(--modux-surface-2);
      border: 1px solid var(--modux-border);
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
      color: var(--modux-text-dim);
      padding: 2px 6px;
      border-radius: 6px;
    }
    .diff-head button:hover {
      background: var(--modux-border);
    }
    .diff-group {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--modux-text-dim);
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
      color: var(--modux-danger);
    }
    .diff-type {
      flex: 0 0 150px;
      font-size: 11px;
      font-weight: 600;
      color: var(--modux-text-dim);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .diff-name {
      font-weight: 500;
      color: var(--modux-text);
    }
    .merge-panel {
      font: 13px ui-sans-serif, system-ui, sans-serif;
      color: var(--modux-text);
      background: var(--modux-surface-2);
      border: 1px solid var(--modux-border);
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
      border: 1px solid var(--modux-border-strong);
      background: var(--modux-surface);
      color: var(--modux-text);
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
      color: var(--modux-text-dim);
      padding: 24px;
    }
    .status.error {
      color: var(--modux-danger);
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
  `
];
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
$e([
  de()
], ge.prototype, "base", 2);
$e([
  U()
], ge.prototype, "_model", 2);
$e([
  U()
], ge.prototype, "_layout", 2);
$e([
  U()
], ge.prototype, "_error", 2);
$e([
  U()
], ge.prototype, "_saving", 2);
$e([
  U()
], ge.prototype, "_toast", 2);
$e([
  U()
], ge.prototype, "_workspace", 2);
$e([
  U()
], ge.prototype, "_creatingSolution", 2);
$e([
  U()
], ge.prototype, "_newSolutionName", 2);
$e([
  U()
], ge.prototype, "_taggingVersion", 2);
$e([
  U()
], ge.prototype, "_newTagName", 2);
$e([
  U()
], ge.prototype, "_tagsOpen", 2);
$e([
  U()
], ge.prototype, "_tags", 2);
$e([
  U()
], ge.prototype, "_repositories", 2);
$e([
  U()
], ge.prototype, "_diff", 2);
$e([
  U()
], ge.prototype, "_diffListOpen", 2);
$e([
  U()
], ge.prototype, "_mergeFlow", 2);
$e([
  U()
], ge.prototype, "_dark", 2);
$e([
  U()
], ge.prototype, "_derivedInteraction", 2);
ge = $e([
  mt("modux-editor-connected")
], ge);
export {
  So as ARCHIMATE_LABEL,
  Ja as ARCHIMATE_NOTATION,
  Wp as CONTAINER_HEADER,
  jp as CONTAINER_INSET,
  ye as ModuxCanvas,
  ie as ModuxEditor,
  ge as ModuxEditorConnected,
  Ye as ModuxSequence,
  ls as aggregatesScene,
  bt as apiImplNodeId,
  vt as apiOpOccurrenceId,
  Gp as containerFit,
  za as containerMinSize,
  Za as contextMapScene,
  es as distributionScene,
  Ya as flowCoherence,
  bs as flowsScene,
  ft as normalizeViewLayout,
  Eo as ownershipIndex,
  wn as processesScene,
  Ha as relationEdgeId,
  Ua as resolveOverlaps
};
