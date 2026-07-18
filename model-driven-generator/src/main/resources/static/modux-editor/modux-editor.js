const bp = 34, vp = 10;
function Mo(e, t = 24) {
  const i = new Map(e.map((a) => [a.id, { x: a.x, y: a.y }]));
  for (let a = 0; a < 80; a++) {
    let s = !1;
    for (let o = 0; o < e.length; o++)
      for (let r = o + 1; r < e.length; r++) {
        const c = e[o], p = e[r], h = i.get(c.id), m = i.get(p.id), g = m.x - h.x, y = m.y - h.y, b = (c.w + p.w) / 2 + t - Math.abs(g), l = (c.h + p.h) / 2 + t - Math.abs(y);
        if (!(b <= 0 || l <= 0))
          if (s = !0, b < l) {
            const d = (g >= 0 ? 1 : -1) * b / 2;
            h.x -= d, m.x += d;
          } else {
            const d = (y >= 0 ? 1 : -1) * l / 2;
            h.y -= d, m.y += d;
          }
      }
    if (!s) break;
  }
  const n = /* @__PURE__ */ new Map();
  for (const a of e) {
    const s = i.get(a.id);
    (Math.abs(s.x - a.x) > 0.5 || Math.abs(s.y - a.y) > 0.5) && n.set(a.id, s);
  }
  return n;
}
function Po(e, t = { w: 160, h: 90 }) {
  let i = t.w, n = t.h;
  for (const a of e)
    i = Math.max(i, 2 * (Math.abs(a.dx) + a.w / 2 + 10)), n = Math.max(
      n,
      2 * (34 + a.h / 2 - a.dy),
      // child's top edge below the header band
      2 * (10 + a.h / 2 + a.dy)
      // child's bottom edge above the inset
    );
  return { w: i, h: n };
}
function Ip(e, t, i) {
  let n = t.w / 2, a = t.w / 2, s = t.h / 2, o = t.h / 2;
  for (const r of i)
    n = Math.max(n, -r.dx + r.w / 2 + 10), a = Math.max(a, r.dx + r.w / 2 + 10), s = Math.max(s, -r.dy + r.h / 2 + 34), o = Math.max(o, r.dy + r.h / 2 + 10);
  return {
    x: e.x + (a - n) / 2,
    y: e.y + (o - s) / 2,
    w: n + a,
    h: s + o
  };
}
function mt(e) {
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
const To = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, xn = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Oo = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Xe = 168, Qe = 56;
function yt(e, t) {
  return `apiimpl:${e}@${t}`;
}
function bt(e, t) {
  return `apiop:${e}@${t}`;
}
function Ia(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.boundedContextId === t && i.has(n.apiId)).map((n) => ({
    id: yt(n.apiId, n.boundedContextId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
function Ro(e, t) {
  const i = t.targetApiId ? (e.apis ?? []).find((n) => n.id === t.targetApiId) : void 0;
  return (i == null ? void 0 : i.operations) ?? [];
}
const No = 108, Do = 32;
function Lo(e, t) {
  return `rel:${e}->${t}`;
}
function Uo(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function xa(e, t = "unified") {
  const i = /* @__PURE__ */ new Map();
  if (t === "distribution") {
    for (const a of e.boundedContexts) {
      const s = (e.modules ?? []).filter((o) => o.boundedContextId === a.id);
      if (!(s.length <= 1)) {
        for (const o of Gt(e, a)) i.set(o.id, a.id);
        for (const o of s) {
          i.set(o.id, a.id);
          for (const r of o.elementIds ?? []) i.set(r, o.id);
        }
      }
    }
    return i;
  }
  const n = (a, s, o) => {
    const r = (e.apis ?? []).find((c) => c.id === a);
    for (const c of (r == null ? void 0 : r.operations) ?? [])
      i.set(s ? bt(c.id, s) : c.id, o);
  };
  for (const a of e.boundedContexts) {
    for (const s of Gt(e, a)) i.set(s.id, a.id);
    for (const s of Ia(e, a.id)) {
      i.set(s.id, a.id);
      const o = /^apiimpl:(.+)@(.+)$/.exec(s.id);
      o && n(o[1], o[2], s.id);
    }
  }
  for (const a of e.externalSystems) {
    a.parentExternalSystemId && i.set(a.id, a.parentExternalSystemId);
    for (const s of a.useCases ?? []) i.set(s.id, a.id);
    for (const s of a.tables ?? []) i.set(s.id, a.id);
    for (const s of a.mcpServers ?? []) i.set(s.id, a.id);
  }
  for (const a of e.apis ?? [])
    a.publishedByExternalSystemId && i.set(a.id, a.publishedByExternalSystemId), n(a.id, null, a.id);
  for (const a of e.proxyApis ?? [])
    a.publishedByExternalSystemId && i.set(a.id, a.publishedByExternalSystemId), a.targetApiId && n(a.targetApiId, a.id, a.id);
  return i;
}
function ot(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const zo = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, qo = {
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
}, Bo = {
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
function Gt(e, t) {
  return [
    ...(e.aggregates ?? []).filter((i) => i.boundedContextId === t.id).map((i) => ({
      id: i.id,
      // The invariants ARE the aggregate's reason to exist: they show on the chip.
      name: (i.invariants ?? []).length ? `${i.name} ⚖${i.invariants.length}` : i.name,
      kind: "aggregate"
    })),
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
const Fo = {
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
}, wa = {
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
function Wo(e, t, i = {}, n = /* @__PURE__ */ new Set(), a = !1) {
  return ka(e, t, "unified", i, n, a);
}
function Vo(e, t, i = {}, n = /* @__PURE__ */ new Set(), a = !1) {
  return ka(e, t, "distribution", i, n, a);
}
function ka(e, t, i, n = {}, a = /* @__PURE__ */ new Set(), s = !1) {
  const o = i === "distribution";
  if (s) {
    const u = new Set(a);
    for (const P of e.boundedContexts) u.add(P.id);
    for (const P of e.externalSystems) u.add(P.id);
    for (const P of e.apis ?? []) u.add(P.id);
    for (const P of e.proxyApis ?? []) u.add(P.id);
    for (const P of e.apiImplementations ?? [])
      u.add(yt(P.apiId, P.boundedContextId));
    for (const P of e.modules ?? []) u.add(P.id);
    a = u;
  }
  const r = !o, c = new Set(e.externalSystems.map((u) => u.id)), p = (e.apis ?? []).filter(
    (u) => u.publishedByExternalSystemId && c.has(u.publishedByExternalSystemId)
  ), h = new Set(p.map((u) => u.id)), m = (e.proxyApis ?? []).filter(
    (u) => u.publishedByExternalSystemId && c.has(u.publishedByExternalSystemId)
  ), g = new Set(m.map((u) => u.id)), y = new Map((e.apis ?? []).map((u) => [u.id, u])), b = new Map((e.proxyApis ?? []).map((u) => [u.id, u])), l = (u, P) => {
    var W;
    if (o) {
      if (P === "boundedContext") {
        const L = (e.modules ?? []).filter((he) => he.boundedContextId === u);
        if (L.length <= 1) return [];
        const B = new Set(L.flatMap((he) => he.elementIds ?? [])), Q = e.boundedContexts.find((he) => he.id === u), ue = Q ? Gt(e, Q).filter((he) => !B.has(he.id)) : [];
        return [
          ...L.map((he) => ({ id: he.id, name: he.name, kind: "module" })),
          ...ue
        ];
      }
      if (P === "module") {
        const L = (e.modules ?? []).find((ue) => ue.id === u), B = e.boundedContexts.find((ue) => ue.id === (L == null ? void 0 : L.boundedContextId));
        if (!L || !B) return [];
        const Q = new Map(Gt(e, B).map((ue) => [ue.id, ue]));
        return (L.elementIds ?? []).map((ue) => Q.get(ue)).filter((ue) => !!ue);
      }
      return [];
    }
    switch (P) {
      case "boundedContext": {
        const L = e.boundedContexts.find((B) => B.id === u);
        return L ? [...Ia(e, u), ...Gt(e, L)] : [];
      }
      case "external-system": {
        const L = e.externalSystems.find((B) => B.id === u);
        return [
          ...e.externalSystems.filter((B) => B.parentExternalSystemId === u).map((B) => ({ id: B.id, name: B.name, kind: "external-system" })),
          ...p.filter((B) => B.publishedByExternalSystemId === u).map((B) => ({ id: B.id, name: B.name, kind: "api" })),
          ...m.filter((B) => B.publishedByExternalSystemId === u).map((B) => ({ id: B.id, name: B.name, kind: "proxy-api" })),
          ...((L == null ? void 0 : L.useCases) ?? []).map(
            (B) => ({ id: B.id, name: B.name, kind: "external-use-case" })
          ),
          ...((L == null ? void 0 : L.tables) ?? []).map(
            (B) => ({ id: B.id, name: B.name, kind: "external-table" })
          ),
          ...((L == null ? void 0 : L.mcpServers) ?? []).map(
            (B) => ({ id: B.id, name: B.name, kind: "mcp-server" })
          )
        ];
      }
      case "api":
        return (((W = y.get(u)) == null ? void 0 : W.operations) ?? []).map(
          (L) => ({ id: L.id, name: L.name, kind: "api-operation" })
        );
      case "api-impl": {
        const L = /^apiimpl:(.+)@(.+)$/.exec(u), B = L ? y.get(L[1]) : void 0;
        return ((B == null ? void 0 : B.operations) ?? []).map(
          (Q) => ({
            id: bt(Q.id, L[2]),
            name: Q.name,
            kind: "api-op-occurrence"
          })
        );
      }
      case "proxy-api": {
        const L = b.get(u);
        return L ? Ro(e, L).map(
          (B) => ({
            id: bt(B.id, u),
            name: B.name,
            kind: "api-op-occurrence"
          })
        ) : [];
      }
      default:
        return [];
    }
  }, d = [], f = [], _ = (u, P, W) => {
    const L = -Math.PI / 2 + 2 * Math.PI * P / Math.max(W, 1), B = 160 + 12 * Math.min(W, 14);
    return { x: u.x + B * Math.cos(L), y: u.y + B * Math.sin(L) };
  }, E = (u, P, W, L) => {
    const B = l(u, P);
    B.forEach((Q, ue) => {
      const he = t[Q.id] ?? _(L, ue, B.length), ae = l(Q.id, Q.kind), xe = a.has(Q.id) && ae.length > 0, Te = Q.policy ? zo : qo[Q.kind], Be = Q.kind === "external-system";
      d.push({
        id: Q.id,
        label: Q.name,
        kind: Q.kind,
        x: he.x,
        y: he.y,
        w: Be ? 150 : No + 12,
        h: Be ? 44 : Do + 4,
        symbol: Te.symbol,
        fill: Te.fill,
        stroke: Te.stroke,
        dashed: Be || void 0,
        ownerId: u,
        collapsible: ae.length > 0,
        collapsed: ae.length > 0 && !xe,
        tooltip: `${Q.policy ? "Policy" : Bo[Q.kind]} ${Q.name} — parte de ${W}`
      }), f.push({
        id: `contains:${u}->${Q.id}`,
        sourceId: u,
        targetId: Q.id,
        kind: "contains",
        color: "#94a3b8",
        tooltip: `${W} contiene ${Q.name}`
      }), xe && E(Q.id, Q.kind, Q.name, he);
    });
  }, A = [
    ...e.boundedContexts.map((u) => ({ ref: u, external: !1, api: !1, proxy: !1 })),
    ...(o ? [] : e.externalSystems).filter((u) => !u.parentExternalSystemId || !c.has(u.parentExternalSystemId)).map((u) => ({ ref: u, external: !0, api: !1, proxy: !1 })),
    ...o ? [] : (e.apis ?? []).filter((u) => !h.has(u.id)).map((u) => ({ ref: u, external: !1, api: !0, proxy: !1 })),
    ...o ? [] : (e.proxyApis ?? []).filter((u) => !g.has(u.id)).map((u) => ({ ref: u, external: !1, api: !1, proxy: !0 })),
    ...o ? [] : (e.workflows ?? []).map((u) => ({
      ref: u,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones enter through their context.
    ...o ? [] : (e.etlFlows ?? []).filter((u) => !u.ownerBoundedContextId).map((u) => ({
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
  A.forEach((u, P) => {
    const W = t[u.ref.id] ?? ot(P, A.length);
    if ("idp" in u && u.idp) {
      const ae = u.ref, xe = !!ae.publishedByExternalSystemId;
      d.push({
        id: ae.id,
        label: ae.name,
        kind: "identity-provider",
        symbol: "key",
        fill: xe ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: xe,
        badge: ae.type ?? "IDP",
        tooltip: `${ae.name} — emite las identidades que el sistema confía${xe ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: W.x,
        y: W.y,
        w: Xe,
        h: Qe
      });
      return;
    }
    if ("etl" in u && u.etl) {
      const ae = u.ref;
      d.push({
        id: ae.id,
        label: ae.name,
        kind: "etl-flow",
        symbol: "gear",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        dashed: !0,
        badge: "ETL",
        tooltip: `${ae.name} — integrador: fuentes (pull/consumidor) → transformación → escrituras (API/BD/evento)`,
        x: W.x,
        y: W.y,
        w: Xe,
        h: Qe
      });
      return;
    }
    if ("workflow" in u && u.workflow) {
      const ae = u.ref;
      d.push({
        id: ae.id,
        label: ae.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${ae.name} — workflow${ae.triggerEvent ? ` · arranca con ${ae.triggerEvent}` : ""}`,
        x: W.x,
        y: W.y,
        w: Xe,
        h: Qe
      });
      return;
    }
    if (u.proxy) {
      const ae = u.ref, xe = l(ae.id, "proxy-api"), Te = a.has(ae.id) && xe.length > 0;
      d.push({
        id: ae.id,
        label: ae.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${ae.name} — proxy/cache de una API, consumible como ella`,
        collapsible: xe.length > 0,
        collapsed: xe.length > 0 && !Te,
        x: W.x,
        y: W.y,
        w: Xe,
        h: Qe
      }), Te && E(ae.id, "proxy-api", ae.name, W);
      return;
    }
    if (u.api) {
      const ae = u.ref, xe = l(ae.id, "api"), Te = a.has(ae.id) && xe.length > 0;
      d.push({
        id: ae.id,
        label: ae.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${ae.name} — API publicada (sus operaciones apuntan a quien las implementa)`,
        collapsible: xe.length > 0,
        collapsed: xe.length > 0 && !Te,
        x: W.x,
        y: W.y,
        w: Xe,
        h: Qe
      }), Te && E(ae.id, "api", ae.name, W);
      return;
    }
    if (u.external) {
      const ae = u.ref, xe = l(ae.id, "external-system"), Te = a.has(ae.id) && xe.length > 0, Be = n[ae.id];
      d.push({
        id: ae.id,
        label: ae.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: ae.referencedRepositoryId ? "PROYECTO" : "EXTERNAL",
        tooltip: ae.referencedRepositoryId ? `${ae.name} — otro proyecto modux (repositorio ${ae.referencedRepositoryId}), referenciado del catálogo` : `${ae.name} (sistema externo)`,
        collapsible: xe.length > 0,
        collapsed: xe.length > 0 && !Te,
        resizable: !0,
        x: W.x,
        y: W.y,
        w: (Be == null ? void 0 : Be.w) ?? Xe,
        h: (Be == null ? void 0 : Be.h) ?? Qe
      }), Te && E(ae.id, "external-system", ae.name, W);
      return;
    }
    const L = u.ref, B = L.subdomainType ?? "GENERIC", Q = l(L.id, "boundedContext"), ue = a.has(L.id) && Q.length > 0, he = n[L.id];
    d.push({
      id: L.id,
      label: L.name,
      kind: "boundedContext",
      symbol: "component",
      fill: To[B],
      stroke: "#94a3b8",
      badge: B,
      tooltip: o && Q.length === 0 ? `${L.name} — un solo módulo (el principal): el servicio lo despliega entero. Añade un módulo desde la paleta para repartir sus elementos` : `${L.name} — subdominio ${B}`,
      collapsible: Q.length > 0,
      collapsed: Q.length > 0 && !ue,
      resizable: !0,
      x: W.x,
      y: W.y,
      w: (he == null ? void 0 : he.w) ?? Xe,
      h: (he == null ? void 0 : he.h) ?? Qe
    }), ue && E(L.id, "boundedContext", L.name, W);
  });
  const O = o ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, C = A.length + O.actors.length + O.aiAgents.length + O.rags.length + O.mcpGateways.length;
  O.actors.forEach((u, P) => {
    const W = t[u.id] ?? ot(A.length + P, C);
    d.push({
      id: u.id,
      label: u.name,
      x: W.x,
      y: W.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${u.name} (actor)`
    });
  }), O.aiAgents.forEach((u, P) => {
    const W = t[u.id] ?? ot(A.length + (e.actors ?? []).length + P, C);
    d.push({
      id: u.id,
      label: u.name,
      x: W.x,
      y: W.y,
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
  }), O.mcpGateways.forEach((u, P) => {
    const W = t[u.id] ?? ot(
      A.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + P,
      C
    );
    d.push({
      id: u.id,
      label: u.name,
      x: W.x,
      y: W.y,
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
  const N = [];
  if (O.rags.forEach((u, P) => {
    const W = t[u.id] ?? ot(
      A.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + P,
      C
    );
    d.push({
      id: u.id,
      label: u.name,
      x: W.x,
      y: W.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${u.name} (base de conocimiento — retrieval para agentes)`
    }), (u.contentSources ?? []).forEach((L, B) => {
      const Q = `ragcs:${u.id}:${L.uri}`, ue = t[Q] ?? { x: W.x + 170, y: W.y - 30 + B * 44 };
      d.push({
        id: Q,
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
        id: `ragcse:${u.id}:${L.uri}`,
        sourceId: Q,
        targetId: u.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), o) {
    const u = e.services ?? [];
    u.forEach((L, B) => {
      const Q = t[L.id] ?? ot(A.length + B, A.length + u.length);
      d.push({
        id: L.id,
        label: L.name,
        kind: "service",
        symbol: "gear",
        fill: "#f8fafc",
        stroke: "#334155",
        badge: "SERVICIO",
        tooltip: `${L.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
        x: Q.x,
        y: Q.y,
        w: Xe,
        h: Qe
      });
    });
    const P = e.urls ?? [];
    P.forEach((L, B) => {
      const Q = t[L.id] ?? ot(
        A.length + u.length + B,
        A.length + u.length + P.length
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
        x: Q.x,
        y: Q.y,
        w: Xe,
        h: Qe
      });
    });
    const W = [];
    [...new Set(u.filter((L) => L.database).map((L) => L.database))].forEach((L) => W.push({
      id: `infra-db:${L}`,
      label: L,
      badge: "BD",
      symbol: "readmodel",
      tooltip: `Base de datos ${L} — la usan los servicios que declaran database=${L}`
    })), u.some((L) => L.outboxEnabled) && W.push({
      id: "infra-broker",
      label: "Broker de eventos",
      badge: "BROKER",
      symbol: "event",
      tooltip: "Broker (Kafka/…) — lo alimentan los servicios con outbox"
    }), (e.workflows ?? []).length && W.push({
      id: "infra-workflow-engine",
      label: "Workflow engine",
      badge: "ENGINE",
      symbol: "process",
      tooltip: "Motor de workflows — ejecuta los workflows del modelo"
    }), (e.pages ?? []).length && W.push({
      id: "infra-forms-engine",
      label: "Forms engine",
      badge: "ENGINE",
      symbol: "interface",
      tooltip: "Motor de formularios (Mateu) — sirve las páginas declaradas"
    }), W.forEach((L, B) => {
      const Q = t[L.id] ?? ot(
        A.length + u.length + P.length + B,
        A.length + u.length + P.length + W.length
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
        x: Q.x,
        y: Q.y,
        w: Xe,
        h: Qe
      });
    });
  }
  d.sort((u, P) => (u.parentId ? 1 : 0) - (P.parentId ? 1 : 0));
  const G = e.relations.map((u) => ({
    id: Lo(u.sourceId, u.targetId),
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "relation",
    label: u.type ? xn[u.type] : u.inferredType ? `≈${xn[u.inferredType]}` : "?",
    color: u.declared ? "#475569" : "#94a3b8",
    dashed: !u.declared,
    arrow: !0,
    tooltip: u.type ? `${u.type} (${u.sourceId} upstream → ${u.targetId} downstream)${u.reasons ? ` — ${u.reasons}` : ""}` : u.inferredType ? `≈ ${u.inferredType} INFERIDO de las dependencias — doble click para declararlo (o corregirlo)${u.reasons ? ` — ${u.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${u.reasons ? ` — ${u.reasons}` : ""}`
  })), j = e.flows.map((u) => {
    var ue, he, ae, xe, Te, Be;
    const P = Uo(e, u), W = r ? e.boundedContexts.find((Fe) => Fe.id === u.sourceId) : void 0, L = ((ue = W == null ? void 0 : W.domainEvents) == null ? void 0 : ue.find((Fe) => Fe.name === u.triggerEvent)) ?? ((he = W == null ? void 0 : W.applicationEvents) == null ? void 0 : he.find((Fe) => Fe.name === u.triggerEvent)), B = r && u.readModelName ? (xe = (ae = e.boundedContexts.find((Fe) => Fe.id === u.targetId)) == null ? void 0 : ae.readModels) == null ? void 0 : xe.find((Fe) => Fe.name === u.readModelName) : void 0, Q = r && u.targetUseCaseId ? (Be = (Te = e.boundedContexts.find((Fe) => Fe.id === u.targetId)) == null ? void 0 : Te.useCases) == null ? void 0 : Be.find((Fe) => Fe.id === u.targetUseCaseId) : void 0;
    return {
      id: `flow:${u.id}`,
      sourceId: (L == null ? void 0 : L.id) ?? u.sourceId,
      targetId: (Q == null ? void 0 : Q.id) ?? (B == null ? void 0 : B.id) ?? u.targetId,
      kind: "flow",
      label: u.name,
      color: Oo[P],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${u.name} [${u.archetype}] — ${P}`
    };
  }), de = new Map((e.apis ?? []).map((u) => [u.id, u])), $ = new Set(e.boundedContexts.map((u) => u.id)), H = (e.apiImplementations ?? []).filter(
    (u) => de.has(u.apiId) && $.has(u.boundedContextId)
  );
  (e.uis ?? []).filter((u) => !u.boundedContextId).forEach((u, P) => {
    const W = t[u.id] ?? { x: 180 + P * 200, y: 40 };
    d.push({
      id: u.id,
      label: u.name,
      x: W.x,
      y: W.y,
      w: 150,
      h: 44,
      kind: "ui",
      symbol: "interface",
      fill: "#f0f9ff",
      stroke: "#0ea5e9",
      badge: "UI",
      tooltip: `${u.name} — interfaz humana suelta; trázala a un contexto para declarar quién la expone`
    });
  });
  const te = new Set(d.map((u) => u.id)), T = xa(e, i), V = /* @__PURE__ */ new Map(), v = (u) => {
    const P = V.get(u);
    if (P !== void 0) return P;
    let W = u;
    for (let L = 0; W && L < 16; L++) {
      if (te.has(W))
        return V.set(u, W), W;
      W = T.get(W);
    }
    return V.set(u, null), null;
  }, x = { has: (u) => v(u) !== null }, R = (u) => {
    const P = /* @__PURE__ */ new Set(), W = [];
    for (const L of u) {
      if (L.kind === "contains" || L.targetId.startsWith("edgeanchor:")) {
        W.push(L);
        continue;
      }
      const B = v(L.sourceId), Q = v(L.targetId);
      if (!B || !Q || B === Q) continue;
      if (B === L.sourceId && Q === L.targetId) {
        W.push(L);
        continue;
      }
      const ue = `${L.kind}|${B}|${Q}`;
      P.has(ue) || (P.add(ue), W.push({
        ...L,
        sourceId: B,
        targetId: Q,
        tooltip: `${L.tooltip ?? L.kind} — de un elemento plegado dentro`
      }));
    }
    return W;
  }, k = o ? [
    ...(e.services ?? []).flatMap(
      (u) => (u.moduleIds ?? []).map((P) => {
        var L;
        if (!x.has(u.id)) return null;
        const W = x.has(P) ? P : (L = (e.modules ?? []).find((B) => B.id === P)) == null ? void 0 : L.boundedContextId;
        return !W || !x.has(W) ? null : {
          id: `deploy:${u.id}->${P}`,
          sourceId: u.id,
          targetId: W,
          kind: "deploys",
          color: "#334155",
          dashed: !0,
          arrow: !0,
          tooltip: `desplegado en ${u.name} — Supr lo desconecta`
        };
      }).filter((P) => P !== null)
    ),
    ...(e.services ?? []).flatMap(
      (u) => (u.urlIds ?? []).filter((P) => x.has(u.id) && x.has(P)).map((P) => ({
        id: `svcurl:${u.id}->${P}`,
        sourceId: u.id,
        targetId: P,
        kind: "service-url",
        color: "#0e7490",
        arrow: !0,
        tooltip: `${u.name} responde en esta URL — Supr lo desconecta`
      }))
    ),
    ...(e.services ?? []).flatMap((u) => {
      const P = [];
      return u.database && x.has(`infra-db:${u.database}`) && x.has(u.id) && P.push({
        id: `infradb:${u.id}`,
        sourceId: u.id,
        targetId: `infra-db:${u.database}`,
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} persiste en ${u.database}`
      }), u.outboxEnabled && x.has("infra-broker") && x.has(u.id) && P.push({
        id: `infrabroker:${u.id}`,
        sourceId: u.id,
        targetId: "infra-broker",
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} publica eventos por el outbox`
      }), P;
    })
  ] : [], w = r ? (e.emissions ?? []).filter((u) => x.has(u.sourceId) && x.has(u.domainEventId)).map((u) => ({
    id: `emit:${u.sourceId}->${u.domainEventId}`,
    sourceId: u.sourceId,
    targetId: u.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], M = r ? (e.projections ?? []).map((u) => ({
    p: u,
    source: u.sourceAggregateId ?? u.sourceExternalUseCaseId ?? u.sourceExternalTableId
  })).filter(({ p: u, source: P }) => P && u.readModelId).filter(({ p: u, source: P }) => x.has(P) && x.has(u.readModelId)).map(({ p: u, source: P }) => ({
    id: `proj:${u.id}`,
    sourceId: P,
    targetId: u.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: u.sourceAggregateId ? `Proyección ${u.name}: el estado del agregado se materializa en ${u.readModelName ?? u.readModelId}` : `Proyección ${u.name}: polling hacia ${u.readModelName ?? u.readModelId}`
  })) : [], S = (e.apis ?? []).flatMap(
    (u) => u.operations.flatMap((P) => {
      const W = r && P.targetUseCaseId && x.has(P.targetUseCaseId) ? P.targetUseCaseId : P.targetBoundedContextId && x.has(P.targetBoundedContextId) ? P.targetBoundedContextId : (P.targetUseCaseId && !r, null);
      if (!W) return [];
      const L = r && x.has(P.id) ? P.id : u.id;
      return x.has(L) ? [
        {
          id: `apiwire:${P.id}`,
          sourceId: L,
          targetId: W,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${P.name} la implementa ${W}`
        }
      ] : [];
    })
  ), q = r ? (e.useCaseCalls ?? []).filter((u) => x.has(u.sourceId) && x.has(u.targetId)).map((u) => ({
    id: `uccall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], D = [
    ...e.boundedContexts.filter((u) => u.identityProviderId && x.has(u.id) && x.has(u.identityProviderId)).map((u) => ({
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
    ...(e.etlFlows ?? []).filter((u) => u.identityProviderId && x.has(u.identityProviderId)).flatMap((u) => {
      const P = x.has(u.id) ? u.id : u.ownerBoundedContextId && x.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
      return P ? [{
        id: `idpsvc:${u.id}`,
        sourceId: P,
        targetId: u.identityProviderId,
        kind: "idp-service",
        color: "#ca8a04",
        label: "identidad de servicio",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} corre con una identidad de servicio de este IdP`
      }] : [];
    }),
    ...(e.identityProviders ?? []).filter((u) => u.publishedByExternalSystemId && x.has(u.id) && x.has(u.publishedByExternalSystemId)).map((u) => ({
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
  ], U = r ? e.boundedContexts.flatMap((u) => u.scheduledTriggers ?? []).filter((u) => u.useCaseId && x.has(u.id) && x.has(u.useCaseId)).map((u) => ({
    id: `stfire:${u.id}->${u.useCaseId}`,
    sourceId: u.id,
    targetId: u.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: u.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${u.cronExpression ?? "cron"}`
  })) : [], F = r ? (e.aggregateCalls ?? []).filter((u) => x.has(u.sourceId) && x.has(u.targetId)).map((u) => ({
    id: `aggcall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], K = r ? (e.queryCalls ?? []).filter((u) => x.has(u.sourceId) && x.has(u.targetId)).map((u) => ({
    id: `qscall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], le = r ? (e.actorUses ?? []).filter((u) => x.has(u.actorId) && x.has(u.targetId)).map((u) => ({
    id: `use:${u.actorId}->${u.targetId}`,
    sourceId: u.actorId,
    targetId: u.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], Ee = (e.actorExternalDependencies ?? []).filter((u) => x.has(u.actorId) && x.has(u.externalSystemId)).map((u) => ({
    id: `extdep:${u.actorId}->${u.externalSystemId}`,
    sourceId: u.actorId,
    targetId: u.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), Y = new Map([
    ...(e.apis ?? []).filter((u) => u.publishedByExternalSystemId).map((u) => [u.id, u.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((u) => u.publishedByExternalSystemId).map((u) => [u.id, u.publishedByExternalSystemId])
  ]), J = (u) => x.has(u) ? u : Y.get(u) ?? u, fe = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((u) => ({
        sourceId: u.sourceId,
        targetId: J(u.targetId),
        cqrs: u.type === "CQRS"
      })).filter(
        (u) => x.has(u.sourceId) && x.has(u.targetId) && u.sourceId !== u.targetId
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
  ], Ae = /* @__PURE__ */ new Map();
  for (const u of e.boundedContexts) {
    for (const P of u.useCases ?? []) Ae.set(P.id, u.id);
    for (const P of u.domainEvents ?? []) Ae.set(P.id, u.id);
    for (const P of u.applicationEvents ?? []) Ae.set(P.id, u.id);
    for (const P of u.queryServices ?? []) Ae.set(P.id, u.id);
  }
  const Ie = (u) => x.has(u) ? u : Ae.get(u) ?? u, Se = /* @__PURE__ */ new Map();
  for (const u of e.boundedContexts) {
    for (const P of u.domainEvents ?? []) Se.set(P.name, P.id);
    for (const P of u.applicationEvents ?? []) Se.set(P.name, P.id);
  }
  const ye = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (u) => (u.steps ?? []).filter((P) => P.targetUseCaseId).map((P) => ({ sourceId: u.id, targetId: Ie(P.targetUseCaseId) }))
      ).filter((u) => x.has(u.sourceId) && x.has(u.targetId)).map((u) => [
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
  ], X = [
    ...new Map(
      (e.workflows ?? []).filter((u) => u.triggerEvent && Se.has(u.triggerEvent)).map((u) => ({
        sourceId: Ie(Se.get(u.triggerEvent)),
        targetId: u.id,
        label: u.triggerEvent
      })).filter((u) => x.has(u.sourceId) && x.has(u.targetId)).map((u) => [
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
  ], ee = /* @__PURE__ */ new Map();
  for (const u of e.externalSystems)
    for (const P of u.tables ?? []) ee.set(P.id, u.id);
  const _e = (e.notifications ?? []).flatMap((u) => {
    var L;
    const P = x.has(u.id) ? u.id : u.ownerBoundedContextId && x.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
    if (!P) return [];
    const W = [];
    if (u.eventId) {
      const B = x.has(u.eventId) ? u.eventId : Ae.get(u.eventId);
      B && x.has(B) && B !== P && W.push({
        id: `notif:${u.id}`,
        sourceId: B,
        targetId: P,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const B of u.recipientRoleIds ?? [])
      x.has(B) && W.push({
        id: `notifto:${u.id}:${B}`,
        sourceId: P,
        targetId: B,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((L = (u.channels ?? [])[0]) == null ? void 0 : L.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${u.name} avisa a este rol — Supr lo quita`
      });
    return W;
  }), Ne = (e.documents ?? []).flatMap((u) => {
    const P = x.has(u.id) ? u.id : u.ownerBoundedContextId && x.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
    if (!P || !u.queryServiceId) return [];
    const W = x.has(u.queryServiceId) ? u.queryServiceId : Ae.get(u.queryServiceId);
    return !W || !x.has(W) || W === P ? [] : [{
      id: `docq:${u.id}`,
      sourceId: W,
      targetId: P,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${u.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), Ve = (e.etlFlows ?? []).flatMap(
    (u) => (u.steps ?? []).flatMap((P) => {
      const W = x.has(u.id) ? u.id : u.ownerBoundedContextId && x.has(u.ownerBoundedContextId) ? u.ownerBoundedContextId : null;
      if (!W) return [];
      const L = P.externalTableId ?? P.operationId ?? P.apiId ?? P.eventId;
      if (!L) return [];
      let B = L;
      if (!x.has(B) && P.operationId && P.apiId && (B = P.apiId), !x.has(B) && P.externalTableId && (B = ee.get(P.externalTableId) ?? B), x.has(B) || (B = J(B)), x.has(B) || (B = Ae.get(L) ?? B), !x.has(B) || B === W) return [];
      const Q = P.type.startsWith("SOURCE");
      return [{
        id: `etl:${u.id}:${P.id}`,
        sourceId: Q ? B : W,
        targetId: Q ? W : B,
        kind: Q ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: P.type === "SOURCE_PULL" ? "pull" : P.type === "SOURCE_CONSUMER" ? "consume" : P.type === "WRITE_API" ? "api" : P.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: Q ? `${u.name} lee de aquí (${P.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${u.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), De = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (u) => (u.sourceExternalTableIds ?? []).map((P) => ({
          sourceId: x.has(P) ? P : ee.get(P) ?? P,
          targetId: u.id,
          name: u.name
        }))
      ).filter((u) => x.has(u.sourceId) && x.has(u.targetId)).map((u) => [
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
  ], at = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (u) => (u.sourceApiIds ?? []).map((P) => ({
          sourceId: J(P),
          targetId: u.id,
          name: u.name
        }))
      ).filter((u) => x.has(u.sourceId) && x.has(u.targetId)).map((u) => [
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
  ], Et = [
    ...new Map(
      (e.rags ?? []).flatMap((u) => [
        ...(u.sourceExternalSystemIds ?? []).map((P) => ({ sourceId: P, targetId: u.id, name: u.name })),
        ...(u.sourceBoundedContextIds ?? []).map((P) => ({ sourceId: P, targetId: u.id, name: u.name }))
      ]).filter((u) => x.has(u.sourceId) && x.has(u.targetId)).map((u) => [
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
  ], si = [
    ...new Map(
      (e.agentApiUses ?? []).map((u) => ({ sourceId: u.agentId, targetId: J(u.apiId) })).filter((u) => x.has(u.sourceId) && x.has(u.targetId)).map((u) => [
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
  ], so = (u) => u.onCompletionEventName || `${u.name.replace(/\s+/g, "")}Completado`, ro = (e.workflows ?? []).flatMap(
    (u) => u.triggerEvent ? (e.workflows ?? []).filter((P) => P.id !== u.id && so(P) === u.triggerEvent).filter((P) => x.has(P.id) && x.has(u.id)).map((P) => ({
      id: `wfchain:${P.id}->${u.id}`,
      sourceId: P.id,
      targetId: u.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: u.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), lo = [
    ...new Map(
      (e.proxyApis ?? []).filter((u) => u.targetApiId).map((u) => ({ sourceId: J(u.id), targetId: J(u.targetApiId) })).filter(
        (u) => x.has(u.sourceId) && x.has(u.targetId) && u.sourceId !== u.targetId
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
  ], co = H.flatMap((u) => {
    const P = yt(u.apiId, u.boundedContextId);
    if (!x.has(P)) return [];
    const W = [];
    for (const L of (e.proxyApis ?? []).filter((B) => B.targetApiId === u.apiId)) {
      const B = J(L.id);
      x.has(B) && B !== P && W.push({
        id: `pxr:${B}->${P}`,
        sourceId: B,
        targetId: P,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return W;
  }), po = (e.proxyOperationRoutes ?? []).flatMap((u) => {
    const P = (e.proxyApis ?? []).find((B) => B.id === u.proxyId);
    if (!(P != null && P.targetApiId)) return [];
    const W = bt(u.operationId, u.proxyId), L = u.targetSiteId === P.targetApiId ? P.targetApiId : yt(P.targetApiId, u.targetSiteId);
    return !x.has(W) || !x.has(L) ? [] : [{
      id: `oproute:${W}->${L}`,
      sourceId: W,
      targetId: L,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), uo = [
    ...new Map(
      (e.externalOperationUses ?? []).map((u) => {
        if (!x.has(u.externalSystemId)) return null;
        const P = (e.apis ?? []).find(
          (Q) => Q.operations.some((ue) => ue.id === u.operationId)
        );
        if (!P) return null;
        const W = u.siteId === P.id, L = W ? u.operationId : bt(u.operationId, u.siteId);
        let B = x.has(L) ? L : null;
        if (!B)
          if (W || (e.proxyApis ?? []).some((Q) => Q.id === u.siteId))
            B = J(u.siteId);
          else {
            const Q = yt(P.id, u.siteId);
            B = x.has(Q) ? Q : u.siteId;
          }
        return !B || !x.has(B) || B === u.externalSystemId ? null : { u, target: B };
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
  ], mo = r ? (e.apiOperationImplementations ?? []).flatMap((u) => {
    if (!x.has(u.useCaseId)) return [];
    const P = x.has(bt(u.operationId, u.boundedContextId)) ? bt(u.operationId, u.boundedContextId) : x.has(yt(u.apiId, u.boundedContextId)) ? yt(u.apiId, u.boundedContextId) : x.has(J(u.boundedContextId)) ? J(u.boundedContextId) : null;
    return P ? [{
      id: `apiimplwire:${u.operationId}@${u.boundedContextId}`,
      sourceId: P,
      targetId: u.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], fo = r ? (e.agentUses ?? []).filter((u) => x.has(u.agentId) && x.has(u.useCaseId)).map((u) => ({
    id: `mcp:${u.agentId}->${u.useCaseId}`,
    sourceId: u.agentId,
    targetId: u.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], ho = (e.agentRags ?? []).filter((u) => x.has(u.agentId) && x.has(u.ragId)).map((u) => ({
    id: `agrag:${u.agentId}->${u.ragId}`,
    sourceId: u.agentId,
    targetId: u.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), go = r ? (e.rags ?? []).filter((u) => x.has(u.id)).flatMap(
    (u) => (u.sourceReadModelIds ?? []).filter((P) => x.has(P)).map((P) => ({
      id: `ragsrc:${u.id}->${P}`,
      sourceId: u.id,
      targetId: P,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${u.name} indexa este read model`
    }))
  ) : [], yo = r ? (e.agentExternalUses ?? []).filter((u) => x.has(u.agentId) && x.has(u.externalUseCaseId)).map((u) => ({
    id: `mcpx:${u.agentId}->${u.externalUseCaseId}`,
    sourceId: u.agentId,
    targetId: u.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], bo = r ? (e.agentMcpUses ?? []).filter((u) => x.has(u.agentId) && x.has(u.mcpServerId)).map((u) => ({
    id: `mcpsv:${u.agentId}->${u.mcpServerId}`,
    sourceId: u.agentId,
    targetId: u.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], vo = (e.mcpGateways ?? []).flatMap(
    (u) => [
      ...u.mcpServerIds ?? [],
      ...u.apiIds ?? [],
      ...u.apiOperationIds ?? [],
      ...u.useCaseIds ?? [],
      ...u.ragIds ?? []
    ].filter((P) => x.has(u.id) && x.has(P)).map((P) => ({
      id: `gwx:${u.id}->${P}`,
      sourceId: u.id,
      targetId: P,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Io = (e.agentGatewayUses ?? []).filter((u) => x.has(u.agentId) && x.has(u.gatewayId)).map((u) => ({
    id: `aggw:${u.agentId}->${u.gatewayId}`,
    sourceId: u.agentId,
    targetId: u.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), xo = r ? (e.agentApiOpUses ?? []).filter((u) => x.has(u.agentId) && x.has(u.apiOperationId)).map((u) => ({
    id: `agapi:${u.agentId}->${u.apiOperationId}`,
    sourceId: u.agentId,
    targetId: u.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], wo = r ? (e.agentQueryUses ?? []).filter((u) => x.has(u.agentId) && x.has(u.queryServiceId)).map((u) => ({
    id: `agqs:${u.agentId}->${u.queryServiceId}`,
    sourceId: u.agentId,
    targetId: u.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], ko = (e.agentDelegations ?? []).filter((u) => x.has(u.agentId) && x.has(u.delegateAgentId)).map((u) => ({
    id: `agag:${u.agentId}->${u.delegateAgentId}`,
    sourceId: u.agentId,
    targetId: u.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), $o = (e.actorAgentUses ?? []).filter((u) => x.has(u.actorId) && x.has(u.agentId)).map((u) => ({
    id: `useag:${u.actorId}->${u.agentId}`,
    sourceId: u.actorId,
    targetId: u.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), _o = r ? (e.agentTriggers ?? []).filter((u) => x.has(u.eventId) && x.has(u.agentId)).map((u) => ({
    id: `evag:${u.eventId}->${u.agentId}`,
    sourceId: u.eventId,
    targetId: u.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Co = r ? (e.externalCalls ?? []).filter((u) => x.has(u.externalSystemId) && x.has(u.useCaseId)).map((u) => ({
    id: `extcall:${u.externalSystemId}->${u.useCaseId}`,
    sourceId: u.externalSystemId,
    targetId: u.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Eo = r ? (e.externalUseCaseCalls ?? []).filter((u) => x.has(u.sourceId) && x.has(u.targetId)).map((u) => ({
    id: `extuccall:${u.sourceId}->${u.targetId}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "ext-uc-call",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "llama (derivará gateway/API)"
  })) : [], So = (e.uis ?? []).flatMap((u) => [
    ...[...u.appIds ?? [], ...u.pageIds ?? []].map((P) => ({
      id: `uiasg:${u.id}->${P}`,
      sourceId: P,
      targetId: u.id,
      kind: "ui-assignment",
      color: "#0ea5e9",
      markerStart: "ball",
      markerEnd: "arrow",
      tooltip: "asignada a la UI (assignment) — Supr la desconecta"
    })),
    // serving: la interfaz SIRVE al actor (flecha abierta hacia la persona)
    ...(u.actorIds ?? []).map((P) => ({
      id: `uisrv:${u.id}->${P}`,
      sourceId: u.id,
      targetId: P,
      kind: "ui-serving",
      color: "#0ea5e9",
      markerEnd: "open-arrow",
      tooltip: "la UI sirve a este actor (serving) — Supr la desconecta"
    }))
  ]), Ao = (e.archimateRelations ?? []).map((u) => ({
    id: `archi:${u.id}`,
    sourceId: u.sourceId,
    targetId: u.targetId,
    kind: "archimate-relation",
    color: "#475569",
    label: u.label || void 0,
    ...Fo[u.type] ?? {},
    tooltip: `${wa[u.type] ?? u.type} (ArchiMate)${u.label ? ` · ${u.label}` : ""} — doble click retipa · Supr la borra`
  }));
  return {
    nodes: d,
    edges: R([
      // Composition first: the ownership diamonds paint under the semantic edges.
      ...f,
      ...Ao,
      ...So,
      ...k,
      ...G,
      ...j,
      ...w,
      ...M,
      ...S,
      ...q,
      ...U,
      ...D,
      ..._e,
      ...Ne,
      ...Ve,
      ...F,
      ...K,
      ...le,
      ...Ee,
      ...fe,
      ...lo,
      ...co,
      ...po,
      ...uo,
      ...mo,
      ...ye,
      ...X,
      ...ro,
      ...si,
      ...De,
      ...at,
      ...Et,
      ...fo,
      ...yo,
      ...bo,
      ...vo,
      ...Io,
      ...xo,
      ...wo,
      ...ko,
      ...$o,
      ..._o,
      ...ho,
      ...go,
      ...N,
      ...Co,
      ...Eo
    ])
  };
}
const Go = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ho = 176, jo = 60, Yo = 140, Ko = 40;
function Xo(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.boundedContexts.forEach((a, s) => {
    const o = 220 + s * 340;
    i.filter((c) => c.boundedContextId === a.id).forEach((c, p) => {
      const h = n.filter((g) => g.aggregateId === c.id).length, m = 140 + p * (170 + h * 60);
      t[c.id] = { x: o, y: m }, n.filter((g) => g.aggregateId === c.id).forEach((g, y) => {
        t[g.id] = { x: o + 60, y: m + 100 + y * 60 };
      });
    });
  }), i.filter((a) => !e.boundedContexts.some((s) => s.id === a.boundedContextId)).forEach((a, s) => {
    t[a.id] = { x: 220 + s * 340, y: 640 };
  }), t;
}
function Qo(e, t) {
  const i = Xo(e), n = (m) => t[m] ?? i[m] ?? { x: 200, y: 200 }, a = new Map(e.boundedContexts.map((m) => [m.id, m])), s = (e.aggregates ?? []).map((m) => {
    const g = a.get(m.boundedContextId), y = (g == null ? void 0 : g.subdomainType) ?? "GENERIC", b = n(m.id);
    return {
      id: m.id,
      label: m.name,
      x: b.x,
      y: b.y,
      w: Ho,
      h: jo,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Go[y],
      stroke: "#64748b",
      badge: `${g ? `${g.name.toUpperCase()} · ` : ""}AGGREGATE${(m.invariants ?? []).length ? ` · ⚖${m.invariants.length}` : ""}`,
      tooltip: `Agregado ${m.name}${g ? ` — contexto ${g.name} (${y})` : ""}`
    };
  }), o = (e.entities ?? []).map((m) => {
    const g = n(m.id);
    return {
      id: m.id,
      label: m.name,
      x: g.x,
      y: g.y,
      w: Yo,
      h: Ko,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${m.name} (dentro del agregado)`
    };
  }), r = (e.aggregates ?? []).flatMap(
    (m) => (m.invariants ?? []).map((g, y) => {
      const b = n(m.id), l = t[g.id] ?? { x: b.x - 150, y: b.y + 90 + y * 52 };
      return {
        id: g.id,
        label: g.name,
        x: l.x,
        y: l.y,
        w: 150,
        h: 36,
        kind: "invariant",
        symbol: "shield",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        badge: "⚖ INVARIANTE",
        tooltip: `${g.name} — regla que el agregado protege; doble click abre la ficha del agregado (sus condiciones se detallan allí)`
      };
    })
  ), c = (e.aggregates ?? []).flatMap(
    (m) => (m.invariants ?? []).map((g) => ({
      id: `protects:${m.id}->${g.id}`,
      sourceId: m.id,
      targetId: g.id,
      kind: "invariant-containment",
      color: "#0f766e",
      dashed: !0,
      tooltip: "El agregado protege esta regla — Supr la retira"
    }))
  ), p = (e.entities ?? []).map((m) => ({
    id: `contains:${m.aggregateId}->${m.id}`,
    sourceId: m.aggregateId,
    targetId: m.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), h = (e.aggregateReferences ?? []).map((m, g) => ({
    id: `aggref:${g}:${m.sourceAggregateId}->${m.targetAggregateId}`,
    sourceId: m.sourceAggregateId,
    targetId: m.targetAggregateId,
    kind: "aggregate-reference",
    label: m.label,
    color: "#475569",
    arrow: !0,
    tooltip: m.label ? `Referencia: ${m.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...s, ...o, ...r],
    edges: [...p, ...h, ...c]
  };
}
const Jo = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Zo = 150, es = 44, ts = 190, is = 56, ns = 160, as = 48;
function os(e, t) {
  const i = e.externalSystems.find((a) => a.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.boundedContexts.find((a) => a.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function ss(e, t) {
  const i = e.flows, n = [], a = [], s = /* @__PURE__ */ new Set(), o = (r) => {
    var c, p;
    return ((p = (c = e.aggregates) == null ? void 0 : c.find((h) => h.id === r)) == null ? void 0 : p.name) ?? r ?? "?";
  };
  return i.forEach((r, c) => {
    const p = 120 + c * 130, h = Jo[r.archetype] ?? "#475569", m = r.triggerAggregateId ?? r.sourceId;
    if (!s.has(m)) {
      s.add(m);
      const d = t[m] ?? { x: 160, y: p };
      n.push({
        id: m,
        label: r.triggerAggregateId ? o(r.triggerAggregateId) : m,
        x: d.x,
        y: d.y,
        w: Zo,
        h: es,
        kind: r.triggerAggregateId ? "aggregate" : "boundedContext",
        symbol: r.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: r.triggerAggregateId ? "AGGREGATE" : "BOUNDED_CONTEXT"
      });
    }
    const g = `flow:${r.id}`, y = t[g] ?? { x: 470, y: p };
    n.push({
      id: g,
      label: r.name,
      x: y.x,
      y: y.y,
      w: ts,
      h: is,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: h,
      badge: r.archetype,
      tooltip: `Flow ${r.name} [${r.archetype}]${r.readModelName ? ` → read model ${r.readModelName}` : ""}${r.targetUseCaseId ? ` → use case ${r.targetUseCaseId}` : ""}`
    });
    const b = os(e, r), l = `tgt:${b.id}`;
    if (!s.has(l)) {
      s.add(l);
      const d = t[l] ?? { x: 790, y: p };
      n.push({
        id: l,
        label: b.label,
        x: d.x,
        y: d.y,
        w: ns,
        h: as,
        kind: b.external ? "external-system" : "boundedContext",
        symbol: "component",
        fill: b.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: b.external,
        badge: b.external ? "EXTERNAL" : "BOUNDED_CONTEXT"
      });
    }
    a.push({
      id: `fe:${r.id}:in`,
      sourceId: m,
      targetId: g,
      kind: "flow-trigger",
      label: r.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: r.triggerEvent ? `Evento: ${r.triggerEvent}` : void 0
    }), a.push({
      id: `fe:${r.id}:out`,
      sourceId: g,
      targetId: l,
      kind: "flow-delivery",
      color: h,
      arrow: !0
    });
  }), { nodes: n, edges: a };
}
const rs = 190, ds = 56, qi = 170, ls = 52;
function wn(e, t) {
  const i = [], n = [], a = (s) => {
    var o;
    return (o = e.boundedContexts.find((r) => r.id === s)) == null ? void 0 : o.name;
  };
  return (e.processes ?? []).forEach((s, o) => {
    const r = 140 + o * 240, c = t[s.id] ?? { x: 150, y: r };
    i.push({
      id: s.id,
      label: s.name,
      x: c.x,
      y: c.y,
      w: rs,
      h: ds,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${s.sla ? ` · SLA ${s.sla}` : ""}`,
      tooltip: `${s.name}${a(s.ownerBoundedContextId) ? ` — contexto ${a(s.ownerBoundedContextId)}` : ""}${s.triggerEvent ? ` · arranca con ${s.triggerEvent}` : ""}`
    });
    let p = s.id;
    if (s.steps.forEach((h, m) => {
      const g = h.type === "HUMAN", y = t[h.id] ?? { x: 150 + (m + 1) * 240, y: r };
      if (i.push({
        id: h.id,
        label: h.name,
        x: y.x,
        y: y.y,
        w: qi,
        h: ls,
        kind: "process-step",
        symbol: g ? "person" : "gear",
        fill: g ? "#fef3c7" : "#ffffff",
        stroke: g ? "#d97706" : "#64748b",
        badge: g ? `HUMAN${h.roleId ? ` · ${h.roleId}` : ""}${h.deadline ? ` · ⏱ ${h.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${h.name}${h.useCaseId ? ` — use case ${h.useCaseId}` : ""}${h.deadline ? ` · deadline ${h.deadline}` : ""}`
      }), n.push({
        id: `pe:${s.id}:${m}`,
        sourceId: p,
        targetId: h.id,
        kind: "process-seq",
        label: m === 0 ? s.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), h.compensationUseCaseId) {
        const b = `comp:${h.id}`, l = t[b] ?? { x: y.x, y: y.y + 90 };
        i.push({
          id: b,
          label: h.compensationUseCaseId,
          x: l.x,
          y: l.y,
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
          targetId: b,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      p = h.id;
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
        sourceId: p,
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
let $a = class {
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
const cs = (e) => new $a(typeof e == "string" ? e : e + "", void 0, pn), pt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, a, s) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + e[s + 1], e[0]);
  return new $a(i, e, pn);
}, ps = (e, t) => {
  if (cn) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), a = wi.litNonce;
    a !== void 0 && n.setAttribute("nonce", a), n.textContent = i.cssText, e.appendChild(n);
  }
}, $n = cn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return cs(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: us, defineProperty: ms, getOwnPropertyDescriptor: fs, getOwnPropertyNames: hs, getOwnPropertySymbols: gs, getPrototypeOf: ys } = Object, ct = globalThis, _n = ct.trustedTypes, bs = _n ? _n.emptyScript : "", Bi = ct.reactiveElementPolyfillSupport, Ht = (e, t) => e, Ei = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? bs : null;
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
} }, un = (e, t) => !us(e, t), Cn = { attribute: !0, type: String, converter: Ei, reflect: !1, useDefault: !1, hasChanged: un };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ct.litPropertyMetadata ?? (ct.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Mt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Cn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), a = this.getPropertyDescriptor(t, n, i);
      a !== void 0 && ms(this.prototype, t, a);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: a, set: s } = fs(this.prototype, t) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: a, set(o) {
      const r = a == null ? void 0 : a.call(this);
      s == null || s.call(this, o), this.requestUpdate(t, r, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Cn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ht("elementProperties"))) return;
    const t = ys(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ht("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ht("properties"))) {
      const i = this.properties, n = [...hs(i), ...gs(i)];
      for (const a of n) this.createProperty(a, i[a]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const i = litPropertyMetadata.get(t);
      if (i !== void 0) for (const [n, a] of i) this.elementProperties.set(n, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, n] of this.elementProperties) {
      const a = this._$Eu(i, n);
      a !== void 0 && this._$Eh.set(a, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const a of n) i.unshift($n(a));
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
    return ps(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), a = this.constructor._$Eu(t, n);
    if (a !== void 0 && n.reflect === !0) {
      const o = (((s = n.converter) == null ? void 0 : s.toAttribute) !== void 0 ? n.converter : Ei).toAttribute(i, n.type);
      this._$Em = t, o == null ? this.removeAttribute(a) : this.setAttribute(a, o), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var s, o;
    const n = this.constructor, a = n._$Eh.get(t);
    if (a !== void 0 && this._$Em !== a) {
      const r = n.getPropertyOptions(a), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((s = r.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? r.converter : Ei;
      this._$Em = a;
      const p = c.fromAttribute(i, r.type);
      this[a] = p ?? ((o = this._$Ej) == null ? void 0 : o.get(a)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, a = !1, s) {
    var o;
    if (t !== void 0) {
      const r = this.constructor;
      if (a === !1 && (s = this[t]), n ?? (n = r.getPropertyOptions(t)), !((n.hasChanged ?? un)(s, i) || n.useDefault && n.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(t)) && !this.hasAttribute(r._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: a, wrapped: s }, o) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, o ?? i ?? this[t]), s !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), a === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [s, o] of a) {
        const { wrapped: r } = o, c = this[s];
        r !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, o, c);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (n = this._$EO) == null || n.forEach((a) => {
        var s;
        return (s = a.hostUpdate) == null ? void 0 : s.call(a);
      }), this.update(i)) : this._$EM();
    } catch (a) {
      throw t = !1, this._$EM(), a;
    }
    t && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var i;
    (i = this._$EO) == null || i.forEach((n) => {
      var a;
      return (a = n.hostUpdated) == null ? void 0 : a.call(n);
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
Mt.elementStyles = [], Mt.shadowRootOptions = { mode: "open" }, Mt[Ht("elementProperties")] = /* @__PURE__ */ new Map(), Mt[Ht("finalized")] = /* @__PURE__ */ new Map(), Bi == null || Bi({ ReactiveElement: Mt }), (ct.reactiveElementVersions ?? (ct.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = globalThis, En = (e) => e, Si = jt.trustedTypes, Sn = Si ? Si.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, _a = "$lit$", lt = `lit$${Math.random().toFixed(9).slice(2)}$`, Ca = "?" + lt, vs = `<${Ca}>`, _t = document, Kt = () => _t.createComment(""), Xt = (e) => e === null || typeof e != "object" && typeof e != "function", mn = Array.isArray, Is = (e) => mn(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Fi = `[ 	
\f\r]`, Lt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, An = /-->/g, Mn = />/g, ft = RegExp(`>|${Fi}(?:([^\\s"'>=/]+)(${Fi}*=${Fi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Pn = /'/g, Tn = /"/g, Ea = /^(?:script|style|textarea|title)$/i, Sa = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), I = Sa(1), Z = Sa(2), Ot = Symbol.for("lit-noChange"), se = Symbol.for("lit-nothing"), On = /* @__PURE__ */ new WeakMap(), xt = _t.createTreeWalker(_t, 129);
function Aa(e, t) {
  if (!mn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Sn !== void 0 ? Sn.createHTML(t) : t;
}
const xs = (e, t) => {
  const i = e.length - 1, n = [];
  let a, s = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = Lt;
  for (let r = 0; r < i; r++) {
    const c = e[r];
    let p, h, m = -1, g = 0;
    for (; g < c.length && (o.lastIndex = g, h = o.exec(c), h !== null); ) g = o.lastIndex, o === Lt ? h[1] === "!--" ? o = An : h[1] !== void 0 ? o = Mn : h[2] !== void 0 ? (Ea.test(h[2]) && (a = RegExp("</" + h[2], "g")), o = ft) : h[3] !== void 0 && (o = ft) : o === ft ? h[0] === ">" ? (o = a ?? Lt, m = -1) : h[1] === void 0 ? m = -2 : (m = o.lastIndex - h[2].length, p = h[1], o = h[3] === void 0 ? ft : h[3] === '"' ? Tn : Pn) : o === Tn || o === Pn ? o = ft : o === An || o === Mn ? o = Lt : (o = ft, a = void 0);
    const y = o === ft && e[r + 1].startsWith("/>") ? " " : "";
    s += o === Lt ? c + vs : m >= 0 ? (n.push(p), c.slice(0, m) + _a + c.slice(m) + lt + y) : c + lt + (m === -2 ? r : y);
  }
  return [Aa(e, s + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Qt {
  constructor({ strings: t, _$litType$: i }, n) {
    let a;
    this.parts = [];
    let s = 0, o = 0;
    const r = t.length - 1, c = this.parts, [p, h] = xs(t, i);
    if (this.el = Qt.createElement(p, n), xt.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (a = xt.nextNode()) !== null && c.length < r; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const m of a.getAttributeNames()) if (m.endsWith(_a)) {
          const g = h[o++], y = a.getAttribute(m).split(lt), b = /([.?@])?(.*)/.exec(g);
          c.push({ type: 1, index: s, name: b[2], strings: y, ctor: b[1] === "." ? ks : b[1] === "?" ? $s : b[1] === "@" ? _s : Di }), a.removeAttribute(m);
        } else m.startsWith(lt) && (c.push({ type: 6, index: s }), a.removeAttribute(m));
        if (Ea.test(a.tagName)) {
          const m = a.textContent.split(lt), g = m.length - 1;
          if (g > 0) {
            a.textContent = Si ? Si.emptyScript : "";
            for (let y = 0; y < g; y++) a.append(m[y], Kt()), xt.nextNode(), c.push({ type: 2, index: ++s });
            a.append(m[g], Kt());
          }
        }
      } else if (a.nodeType === 8) if (a.data === Ca) c.push({ type: 2, index: s });
      else {
        let m = -1;
        for (; (m = a.data.indexOf(lt, m + 1)) !== -1; ) c.push({ type: 7, index: s }), m += lt.length - 1;
      }
      s++;
    }
  }
  static createElement(t, i) {
    const n = _t.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Rt(e, t, i = e, n) {
  var o, r;
  if (t === Ot) return t;
  let a = n !== void 0 ? (o = i._$Co) == null ? void 0 : o[n] : i._$Cl;
  const s = Xt(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== s && ((r = a == null ? void 0 : a._$AO) == null || r.call(a, !1), s === void 0 ? a = void 0 : (a = new s(e), a._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = a : i._$Cl = a), a !== void 0 && (t = Rt(e, a._$AS(e, t.values), a, n)), t;
}
class ws {
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
    const { el: { content: i }, parts: n } = this._$AD, a = ((t == null ? void 0 : t.creationScope) ?? _t).importNode(i, !0);
    xt.currentNode = a;
    let s = xt.nextNode(), o = 0, r = 0, c = n[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let p;
        c.type === 2 ? p = new ni(s, s.nextSibling, this, t) : c.type === 1 ? p = new c.ctor(s, c.name, c.strings, this, t) : c.type === 6 && (p = new Cs(s, this, t)), this._$AV.push(p), c = n[++r];
      }
      o !== (c == null ? void 0 : c.index) && (s = xt.nextNode(), o++);
    }
    return xt.currentNode = _t, a;
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
  constructor(t, i, n, a) {
    this.type = 2, this._$AH = se, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ?? !0;
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
    t = Rt(this, t, i), Xt(t) ? t === se || t == null || t === "" ? (this._$AH !== se && this._$AR(), this._$AH = se) : t !== this._$AH && t !== Ot && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Is(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== se && Xt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(_t.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var s;
    const { values: i, _$litType$: n } = t, a = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Qt.createElement(Aa(n.h, n.h[0]), this.options)), n);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === a) this._$AH.p(i);
    else {
      const o = new ws(a, this), r = o.u(this.options);
      o.p(i), this.T(r), this._$AH = o;
    }
  }
  _$AC(t) {
    let i = On.get(t.strings);
    return i === void 0 && On.set(t.strings, i = new Qt(t)), i;
  }
  k(t) {
    mn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, a = 0;
    for (const s of t) a === i.length ? i.push(n = new ni(this.O(Kt()), this.O(Kt()), this, this.options)) : n = i[a], n._$AI(s), a++;
    a < i.length && (this._$AR(n && n._$AB.nextSibling, a), i.length = a);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const a = En(t).nextSibling;
      En(t).remove(), t = a;
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
  constructor(t, i, n, a, s) {
    this.type = 1, this._$AH = se, this._$AN = void 0, this.element = t, this.name = i, this._$AM = a, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = se;
  }
  _$AI(t, i = this, n, a) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) t = Rt(this, t, i, 0), o = !Xt(t) || t !== this._$AH && t !== Ot, o && (this._$AH = t);
    else {
      const r = t;
      let c, p;
      for (t = s[0], c = 0; c < s.length - 1; c++) p = Rt(this, r[n + c], i, c), p === Ot && (p = this._$AH[c]), o || (o = !Xt(p) || p !== this._$AH[c]), p === se ? t = se : t !== se && (t += (p ?? "") + s[c + 1]), this._$AH[c] = p;
    }
    o && !a && this.j(t);
  }
  j(t) {
    t === se ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ks extends Di {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === se ? void 0 : t;
  }
}
class $s extends Di {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== se);
  }
}
class _s extends Di {
  constructor(t, i, n, a, s) {
    super(t, i, n, a, s), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Rt(this, t, i, 0) ?? se) === Ot) return;
    const n = this._$AH, a = t === se && n !== se || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, s = t !== se && (n === se || a);
    a && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Cs {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Rt(this, t);
  }
}
const Wi = jt.litHtmlPolyfillSupport;
Wi == null || Wi(Qt, ni), (jt.litHtmlVersions ?? (jt.litHtmlVersions = [])).push("3.3.3");
const Es = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let a = n._$litPart$;
  if (a === void 0) {
    const s = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = a = new ni(t.insertBefore(Kt(), s), s, void 0, i ?? {});
  }
  return a._$AI(e), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kt = globalThis;
class Ge extends Mt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Es(i, this.renderRoot, this.renderOptions);
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
    return Ot;
  }
}
var va;
Ge._$litElement$ = !0, Ge.finalized = !0, (va = kt.litElementHydrateSupport) == null || va.call(kt, { LitElement: Ge });
const Vi = kt.litElementPolyfillSupport;
Vi == null || Vi({ LitElement: Ge });
(kt.litElementVersions ?? (kt.litElementVersions = [])).push("4.2.2");
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
const Ss = { attribute: !0, type: String, converter: Ei, reflect: !1, hasChanged: un }, As = (e = Ss, t, i) => {
  const { kind: n, metadata: a } = i;
  let s = globalThis.litPropertyMetadata.get(a);
  if (s === void 0 && globalThis.litPropertyMetadata.set(a, s = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), s.set(i.name, e), n === "accessor") {
    const { name: o } = i;
    return { set(r) {
      const c = t.get.call(this);
      t.set.call(this, r), this.requestUpdate(o, c, e, !0, r);
    }, init(r) {
      return r !== void 0 && this.C(o, void 0, e, r), r;
    } };
  }
  if (n === "setter") {
    const { name: o } = i;
    return function(r) {
      const c = this[o];
      t.call(this, r), this.requestUpdate(o, c, e, !0, r);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function re(e) {
  return (t, i) => typeof i == "object" ? As(e, t, i) : ((n, a, s) => {
    const o = a.hasOwnProperty(s);
    return a.constructor.createProperty(s, n), o ? Object.getOwnPropertyDescriptor(a, s) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function z(e) {
  return re({ ...e, state: !0, attribute: !1 });
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
function Ms(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Qi && t.documentElement.namespaceURI === Qi ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Ps(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Ma(e) {
  var t = Li(e);
  return (t.local ? Ps : Ms)(t);
}
function Ts() {
}
function fn(e) {
  return e == null ? Ts : function() {
    return this.querySelector(e);
  };
}
function Os(e) {
  typeof e != "function" && (e = fn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), a = 0; a < i; ++a)
    for (var s = t[a], o = s.length, r = n[a] = new Array(o), c, p, h = 0; h < o; ++h)
      (c = s[h]) && (p = e.call(c, c.__data__, h, s)) && ("__data__" in c && (p.__data__ = c.__data__), r[h] = p);
  return new We(n, this._parents);
}
function Rs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Ns() {
  return [];
}
function Pa(e) {
  return e == null ? Ns : function() {
    return this.querySelectorAll(e);
  };
}
function Ds(e) {
  return function() {
    return Rs(e.apply(this, arguments));
  };
}
function Ls(e) {
  typeof e == "function" ? e = Ds(e) : e = Pa(e);
  for (var t = this._groups, i = t.length, n = [], a = [], s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, c, p = 0; p < r; ++p)
      (c = o[p]) && (n.push(e.call(c, c.__data__, p, o)), a.push(c));
  return new We(n, a);
}
function Ta(e) {
  return function() {
    return this.matches(e);
  };
}
function Oa(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Us = Array.prototype.find;
function zs(e) {
  return function() {
    return Us.call(this.children, e);
  };
}
function qs() {
  return this.firstElementChild;
}
function Bs(e) {
  return this.select(e == null ? qs : zs(typeof e == "function" ? e : Oa(e)));
}
var Fs = Array.prototype.filter;
function Ws() {
  return Array.from(this.children);
}
function Vs(e) {
  return function() {
    return Fs.call(this.children, e);
  };
}
function Gs(e) {
  return this.selectAll(e == null ? Ws : Vs(typeof e == "function" ? e : Oa(e)));
}
function Hs(e) {
  typeof e != "function" && (e = Ta(e));
  for (var t = this._groups, i = t.length, n = new Array(i), a = 0; a < i; ++a)
    for (var s = t[a], o = s.length, r = n[a] = [], c, p = 0; p < o; ++p)
      (c = s[p]) && e.call(c, c.__data__, p, s) && r.push(c);
  return new We(n, this._parents);
}
function Ra(e) {
  return new Array(e.length);
}
function js() {
  return new We(this._enter || this._groups.map(Ra), this._parents);
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
function Ys(e) {
  return function() {
    return e;
  };
}
function Ks(e, t, i, n, a, s) {
  for (var o = 0, r, c = t.length, p = s.length; o < p; ++o)
    (r = t[o]) ? (r.__data__ = s[o], n[o] = r) : i[o] = new Ai(e, s[o]);
  for (; o < c; ++o)
    (r = t[o]) && (a[o] = r);
}
function Xs(e, t, i, n, a, s, o) {
  var r, c, p = /* @__PURE__ */ new Map(), h = t.length, m = s.length, g = new Array(h), y;
  for (r = 0; r < h; ++r)
    (c = t[r]) && (g[r] = y = o.call(c, c.__data__, r, t) + "", p.has(y) ? a[r] = c : p.set(y, c));
  for (r = 0; r < m; ++r)
    y = o.call(e, s[r], r, s) + "", (c = p.get(y)) ? (n[r] = c, c.__data__ = s[r], p.delete(y)) : i[r] = new Ai(e, s[r]);
  for (r = 0; r < h; ++r)
    (c = t[r]) && p.get(g[r]) === c && (a[r] = c);
}
function Qs(e) {
  return e.__data__;
}
function Js(e, t) {
  if (!arguments.length) return Array.from(this, Qs);
  var i = t ? Xs : Ks, n = this._parents, a = this._groups;
  typeof e != "function" && (e = Ys(e));
  for (var s = a.length, o = new Array(s), r = new Array(s), c = new Array(s), p = 0; p < s; ++p) {
    var h = n[p], m = a[p], g = m.length, y = Zs(e.call(h, h && h.__data__, p, n)), b = y.length, l = r[p] = new Array(b), d = o[p] = new Array(b), f = c[p] = new Array(g);
    i(h, m, l, d, f, y, t);
    for (var _ = 0, E = 0, A, O; _ < b; ++_)
      if (A = l[_]) {
        for (_ >= E && (E = _ + 1); !(O = d[E]) && ++E < b; ) ;
        A._next = O || null;
      }
  }
  return o = new We(o, n), o._enter = r, o._exit = c, o;
}
function Zs(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function er() {
  return new We(this._exit || this._groups.map(Ra), this._parents);
}
function tr(e, t, i) {
  var n = this.enter(), a = this, s = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (a = t(a), a && (a = a.selection())), i == null ? s.remove() : i(s), n && a ? n.merge(a).order() : a;
}
function ir(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, a = i.length, s = n.length, o = Math.min(a, s), r = new Array(a), c = 0; c < o; ++c)
    for (var p = i[c], h = n[c], m = p.length, g = r[c] = new Array(m), y, b = 0; b < m; ++b)
      (y = p[b] || h[b]) && (g[b] = y);
  for (; c < a; ++c)
    r[c] = i[c];
  return new We(r, this._parents);
}
function nr() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], a = n.length - 1, s = n[a], o; --a >= 0; )
      (o = n[a]) && (s && o.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(o, s), s = o);
  return this;
}
function ar(e) {
  e || (e = or);
  function t(m, g) {
    return m && g ? e(m.__data__, g.__data__) : !m - !g;
  }
  for (var i = this._groups, n = i.length, a = new Array(n), s = 0; s < n; ++s) {
    for (var o = i[s], r = o.length, c = a[s] = new Array(r), p, h = 0; h < r; ++h)
      (p = o[h]) && (c[h] = p);
    c.sort(t);
  }
  return new We(a, this._parents).order();
}
function or(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function sr() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function rr() {
  return Array.from(this);
}
function dr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], a = 0, s = n.length; a < s; ++a) {
      var o = n[a];
      if (o) return o;
    }
  return null;
}
function lr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function cr() {
  return !this.node();
}
function pr(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var a = t[i], s = 0, o = a.length, r; s < o; ++s)
      (r = a[s]) && e.call(r, r.__data__, s, a);
  return this;
}
function ur(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function mr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function fr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function hr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function gr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function yr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function br(e, t) {
  var i = Li(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? mr : ur : typeof t == "function" ? i.local ? yr : gr : i.local ? hr : fr)(i, t));
}
function Na(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function vr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ir(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function xr(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function wr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? vr : typeof t == "function" ? xr : Ir)(e, t, i ?? "")) : Nt(this.node(), e);
}
function Nt(e, t) {
  return e.style.getPropertyValue(t) || Na(e).getComputedStyle(e, null).getPropertyValue(t);
}
function kr(e) {
  return function() {
    delete this[e];
  };
}
function $r(e, t) {
  return function() {
    this[e] = t;
  };
}
function _r(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function Cr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? kr : typeof t == "function" ? _r : $r)(e, t)) : this.node()[e];
}
function Da(e) {
  return e.trim().split(/^|\s+/);
}
function hn(e) {
  return e.classList || new La(e);
}
function La(e) {
  this._node = e, this._names = Da(e.getAttribute("class") || "");
}
La.prototype = {
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
function Ua(e, t) {
  for (var i = hn(e), n = -1, a = t.length; ++n < a; ) i.add(t[n]);
}
function za(e, t) {
  for (var i = hn(e), n = -1, a = t.length; ++n < a; ) i.remove(t[n]);
}
function Er(e) {
  return function() {
    Ua(this, e);
  };
}
function Sr(e) {
  return function() {
    za(this, e);
  };
}
function Ar(e, t) {
  return function() {
    (t.apply(this, arguments) ? Ua : za)(this, e);
  };
}
function Mr(e, t) {
  var i = Da(e + "");
  if (arguments.length < 2) {
    for (var n = hn(this.node()), a = -1, s = i.length; ++a < s; ) if (!n.contains(i[a])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Ar : t ? Er : Sr)(i, t));
}
function Pr() {
  this.textContent = "";
}
function Tr(e) {
  return function() {
    this.textContent = e;
  };
}
function Or(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Rr(e) {
  return arguments.length ? this.each(e == null ? Pr : (typeof e == "function" ? Or : Tr)(e)) : this.node().textContent;
}
function Nr() {
  this.innerHTML = "";
}
function Dr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Lr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Ur(e) {
  return arguments.length ? this.each(e == null ? Nr : (typeof e == "function" ? Lr : Dr)(e)) : this.node().innerHTML;
}
function zr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function qr() {
  return this.each(zr);
}
function Br() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Fr() {
  return this.each(Br);
}
function Wr(e) {
  var t = typeof e == "function" ? e : Ma(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function Vr() {
  return null;
}
function Gr(e, t) {
  var i = typeof e == "function" ? e : Ma(e), n = t == null ? Vr : typeof t == "function" ? t : fn(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function Hr() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function jr() {
  return this.each(Hr);
}
function Yr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Kr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Xr(e) {
  return this.select(e ? Kr : Yr);
}
function Qr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Jr(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Zr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function ed(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, a = t.length, s; i < a; ++i)
        s = t[i], (!e.type || s.type === e.type) && s.name === e.name ? this.removeEventListener(s.type, s.listener, s.options) : t[++n] = s;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function td(e, t, i) {
  return function() {
    var n = this.__on, a, s = Jr(t);
    if (n) {
      for (var o = 0, r = n.length; o < r; ++o)
        if ((a = n[o]).type === e.type && a.name === e.name) {
          this.removeEventListener(a.type, a.listener, a.options), this.addEventListener(a.type, a.listener = s, a.options = i), a.value = t;
          return;
        }
    }
    this.addEventListener(e.type, s, i), a = { type: e.type, name: e.name, value: t, listener: s, options: i }, n ? n.push(a) : this.__on = [a];
  };
}
function id(e, t, i) {
  var n = Zr(e + ""), a, s = n.length, o;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var c = 0, p = r.length, h; c < p; ++c)
        for (a = 0, h = r[c]; a < s; ++a)
          if ((o = n[a]).type === h.type && o.name === h.name)
            return h.value;
    }
    return;
  }
  for (r = t ? td : ed, a = 0; a < s; ++a) this.each(r(n[a], t, i));
  return this;
}
function qa(e, t, i) {
  var n = Na(e), a = n.CustomEvent;
  typeof a == "function" ? a = new a(t, i) : (a = n.document.createEvent("Event"), i ? (a.initEvent(t, i.bubbles, i.cancelable), a.detail = i.detail) : a.initEvent(t, !1, !1)), e.dispatchEvent(a);
}
function nd(e, t) {
  return function() {
    return qa(this, e, t);
  };
}
function ad(e, t) {
  return function() {
    return qa(this, e, t.apply(this, arguments));
  };
}
function od(e, t) {
  return this.each((typeof t == "function" ? ad : nd)(e, t));
}
function* sd() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], a = 0, s = n.length, o; a < s; ++a)
      (o = n[a]) && (yield o);
}
var Ba = [null];
function We(e, t) {
  this._groups = e, this._parents = t;
}
function ai() {
  return new We([[document.documentElement]], Ba);
}
function rd() {
  return this;
}
We.prototype = ai.prototype = {
  constructor: We,
  select: Os,
  selectAll: Ls,
  selectChild: Bs,
  selectChildren: Gs,
  filter: Hs,
  data: Js,
  enter: js,
  exit: er,
  join: tr,
  merge: ir,
  selection: rd,
  order: nr,
  sort: ar,
  call: sr,
  nodes: rr,
  node: dr,
  size: lr,
  empty: cr,
  each: pr,
  attr: br,
  style: wr,
  property: Cr,
  classed: Mr,
  text: Rr,
  html: Ur,
  raise: qr,
  lower: Fr,
  append: Wr,
  insert: Gr,
  remove: jr,
  clone: Xr,
  datum: Qr,
  on: id,
  dispatch: od,
  [Symbol.iterator]: sd
};
function He(e) {
  return typeof e == "string" ? new We([[document.querySelector(e)]], [document.documentElement]) : new We([[e]], Ba);
}
function dd(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ht(e, t) {
  if (e = dd(e), t === void 0 && (t = e.currentTarget), t) {
    var i = t.ownerSVGElement || t;
    if (i.createSVGPoint) {
      var n = i.createSVGPoint();
      return n.x = e.clientX, n.y = e.clientY, n = n.matrixTransform(t.getScreenCTM().inverse()), [n.x, n.y];
    }
    if (t.getBoundingClientRect) {
      var a = t.getBoundingClientRect();
      return [e.clientX - a.left - t.clientLeft, e.clientY - a.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
var ld = { value: () => {
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
function cd(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", a = i.indexOf(".");
    if (a >= 0 && (n = i.slice(a + 1), i = i.slice(0, a)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
ki.prototype = gn.prototype = {
  constructor: ki,
  on: function(e, t) {
    var i = this._, n = cd(e + "", i), a, s = -1, o = n.length;
    if (arguments.length < 2) {
      for (; ++s < o; ) if ((a = (e = n[s]).type) && (a = pd(i[a], e.name))) return a;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++s < o; )
      if (a = (e = n[s]).type) i[a] = Nn(i[a], e.name, t);
      else if (t == null) for (a in i) i[a] = Nn(i[a], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new ki(e);
  },
  call: function(e, t) {
    if ((a = arguments.length - 2) > 0) for (var i = new Array(a), n = 0, a, s; n < a; ++n) i[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (s = this._[e], n = 0, a = s.length; n < a; ++n) s[n].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var n = this._[e], a = 0, s = n.length; a < s; ++a) n[a].value.apply(t, i);
  }
};
function pd(e, t) {
  for (var i = 0, n = e.length, a; i < n; ++i)
    if ((a = e[i]).name === t)
      return a.value;
}
function Nn(e, t, i) {
  for (var n = 0, a = e.length; n < a; ++n)
    if (e[n].name === t) {
      e[n] = ld, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Ji = { capture: !0, passive: !1 };
function Zi(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ud(e) {
  var t = e.document.documentElement, i = He(e).on("dragstart.drag", Zi, Ji);
  "onselectstart" in t ? i.on("selectstart.drag", Zi, Ji) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function md(e, t) {
  var i = e.document.documentElement, n = He(e).on("dragstart.drag", null);
  t && (n.on("click.drag", Zi, Ji), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function yn(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function Fa(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function oi() {
}
var Jt = 0.7, Mi = 1 / Jt, Tt = "\\s*([+-]?\\d+)\\s*", Zt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Je = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", fd = /^#([0-9a-f]{3,8})$/, hd = new RegExp(`^rgb\\(${Tt},${Tt},${Tt}\\)$`), gd = new RegExp(`^rgb\\(${Je},${Je},${Je}\\)$`), yd = new RegExp(`^rgba\\(${Tt},${Tt},${Tt},${Zt}\\)$`), bd = new RegExp(`^rgba\\(${Je},${Je},${Je},${Zt}\\)$`), vd = new RegExp(`^hsl\\(${Zt},${Je},${Je}\\)$`), Id = new RegExp(`^hsla\\(${Zt},${Je},${Je},${Zt}\\)$`), Dn = {
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
yn(oi, ei, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ln,
  // Deprecated! Use color.formatHex.
  formatHex: Ln,
  formatHex8: xd,
  formatHsl: wd,
  formatRgb: Un,
  toString: Un
});
function Ln() {
  return this.rgb().formatHex();
}
function xd() {
  return this.rgb().formatHex8();
}
function wd() {
  return Wa(this).formatHsl();
}
function Un() {
  return this.rgb().formatRgb();
}
function ei(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = fd.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? zn(t) : i === 3 ? new Ue(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? ri(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? ri(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = hd.exec(e)) ? new Ue(t[1], t[2], t[3], 1) : (t = gd.exec(e)) ? new Ue(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = yd.exec(e)) ? ri(t[1], t[2], t[3], t[4]) : (t = bd.exec(e)) ? ri(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = vd.exec(e)) ? Fn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Id.exec(e)) ? Fn(t[1], t[2] / 100, t[3] / 100, t[4]) : Dn.hasOwnProperty(e) ? zn(Dn[e]) : e === "transparent" ? new Ue(NaN, NaN, NaN, 0) : null;
}
function zn(e) {
  return new Ue(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ri(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new Ue(e, t, i, n);
}
function kd(e) {
  return e instanceof oi || (e = ei(e)), e ? (e = e.rgb(), new Ue(e.r, e.g, e.b, e.opacity)) : new Ue();
}
function en(e, t, i, n) {
  return arguments.length === 1 ? kd(e) : new Ue(e, t, i, n ?? 1);
}
function Ue(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
yn(Ue, en, Fa(oi, {
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
    return new Ue($t(this.r), $t(this.g), $t(this.b), Pi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: qn,
  // Deprecated! Use color.formatHex.
  formatHex: qn,
  formatHex8: $d,
  formatRgb: Bn,
  toString: Bn
}));
function qn() {
  return `#${wt(this.r)}${wt(this.g)}${wt(this.b)}`;
}
function $d() {
  return `#${wt(this.r)}${wt(this.g)}${wt(this.b)}${wt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Bn() {
  const e = Pi(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${$t(this.r)}, ${$t(this.g)}, ${$t(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Pi(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function $t(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function wt(e) {
  return e = $t(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Fn(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new je(e, t, i, n);
}
function Wa(e) {
  if (e instanceof je) return new je(e.h, e.s, e.l, e.opacity);
  if (e instanceof oi || (e = ei(e)), !e) return new je();
  if (e instanceof je) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, a = Math.min(t, i, n), s = Math.max(t, i, n), o = NaN, r = s - a, c = (s + a) / 2;
  return r ? (t === s ? o = (i - n) / r + (i < n) * 6 : i === s ? o = (n - t) / r + 2 : o = (t - i) / r + 4, r /= c < 0.5 ? s + a : 2 - s - a, o *= 60) : r = c > 0 && c < 1 ? 0 : o, new je(o, r, c, e.opacity);
}
function _d(e, t, i, n) {
  return arguments.length === 1 ? Wa(e) : new je(e, t, i, n ?? 1);
}
function je(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
yn(je, _d, Fa(oi, {
  brighter(e) {
    return e = e == null ? Mi : Math.pow(Mi, e), new je(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Jt : Math.pow(Jt, e), new je(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, a = 2 * i - n;
    return new Ue(
      Gi(e >= 240 ? e - 240 : e + 120, a, n),
      Gi(e, a, n),
      Gi(e < 120 ? e + 240 : e - 120, a, n),
      this.opacity
    );
  },
  clamp() {
    return new je(Wn(this.h), di(this.s), di(this.l), Pi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Pi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Wn(this.h)}, ${di(this.s) * 100}%, ${di(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Wn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function di(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Gi(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Va = (e) => () => e;
function Cd(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Ed(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function Sd(e) {
  return (e = +e) == 1 ? Ga : function(t, i) {
    return i - t ? Ed(t, i, e) : Va(isNaN(t) ? i : t);
  };
}
function Ga(e, t) {
  var i = t - e;
  return i ? Cd(e, i) : Va(isNaN(e) ? t : e);
}
const Vn = (function e(t) {
  var i = Sd(t);
  function n(a, s) {
    var o = i((a = en(a)).r, (s = en(s)).r), r = i(a.g, s.g), c = i(a.b, s.b), p = Ga(a.opacity, s.opacity);
    return function(h) {
      return a.r = o(h), a.g = r(h), a.b = c(h), a.opacity = p(h), a + "";
    };
  }
  return n.gamma = e, n;
})(1);
function dt(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var tn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Hi = new RegExp(tn.source, "g");
function Ad(e) {
  return function() {
    return e;
  };
}
function Md(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Pd(e, t) {
  var i = tn.lastIndex = Hi.lastIndex = 0, n, a, s, o = -1, r = [], c = [];
  for (e = e + "", t = t + ""; (n = tn.exec(e)) && (a = Hi.exec(t)); )
    (s = a.index) > i && (s = t.slice(i, s), r[o] ? r[o] += s : r[++o] = s), (n = n[0]) === (a = a[0]) ? r[o] ? r[o] += a : r[++o] = a : (r[++o] = null, c.push({ i: o, x: dt(n, a) })), i = Hi.lastIndex;
  return i < t.length && (s = t.slice(i), r[o] ? r[o] += s : r[++o] = s), r.length < 2 ? c[0] ? Md(c[0].x) : Ad(t) : (t = c.length, function(p) {
    for (var h = 0, m; h < t; ++h) r[(m = c[h]).i] = m.x(p);
    return r.join("");
  });
}
var Gn = 180 / Math.PI, nn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Ha(e, t, i, n, a, s) {
  var o, r, c;
  return (o = Math.sqrt(e * e + t * t)) && (e /= o, t /= o), (c = e * i + t * n) && (i -= e * c, n -= t * c), (r = Math.sqrt(i * i + n * n)) && (i /= r, n /= r, c /= r), e * n < t * i && (e = -e, t = -t, c = -c, o = -o), {
    translateX: a,
    translateY: s,
    rotate: Math.atan2(t, e) * Gn,
    skewX: Math.atan(c) * Gn,
    scaleX: o,
    scaleY: r
  };
}
var li;
function Td(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? nn : Ha(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Od(e) {
  return e == null || (li || (li = document.createElementNS("http://www.w3.org/2000/svg", "g")), li.setAttribute("transform", e), !(e = li.transform.baseVal.consolidate())) ? nn : (e = e.matrix, Ha(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ja(e, t, i, n) {
  function a(p) {
    return p.length ? p.pop() + " " : "";
  }
  function s(p, h, m, g, y, b) {
    if (p !== m || h !== g) {
      var l = y.push("translate(", null, t, null, i);
      b.push({ i: l - 4, x: dt(p, m) }, { i: l - 2, x: dt(h, g) });
    } else (m || g) && y.push("translate(" + m + t + g + i);
  }
  function o(p, h, m, g) {
    p !== h ? (p - h > 180 ? h += 360 : h - p > 180 && (p += 360), g.push({ i: m.push(a(m) + "rotate(", null, n) - 2, x: dt(p, h) })) : h && m.push(a(m) + "rotate(" + h + n);
  }
  function r(p, h, m, g) {
    p !== h ? g.push({ i: m.push(a(m) + "skewX(", null, n) - 2, x: dt(p, h) }) : h && m.push(a(m) + "skewX(" + h + n);
  }
  function c(p, h, m, g, y, b) {
    if (p !== m || h !== g) {
      var l = y.push(a(y) + "scale(", null, ",", null, ")");
      b.push({ i: l - 4, x: dt(p, m) }, { i: l - 2, x: dt(h, g) });
    } else (m !== 1 || g !== 1) && y.push(a(y) + "scale(" + m + "," + g + ")");
  }
  return function(p, h) {
    var m = [], g = [];
    return p = e(p), h = e(h), s(p.translateX, p.translateY, h.translateX, h.translateY, m, g), o(p.rotate, h.rotate, m, g), r(p.skewX, h.skewX, m, g), c(p.scaleX, p.scaleY, h.scaleX, h.scaleY, m, g), p = h = null, function(y) {
      for (var b = -1, l = g.length, d; ++b < l; ) m[(d = g[b]).i] = d.x(y);
      return m.join("");
    };
  };
}
var Rd = ja(Td, "px, ", "px)", "deg)"), Nd = ja(Od, ", ", ")", ")"), Dd = 1e-12;
function Hn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Ld(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Ud(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const zd = (function e(t, i, n) {
  function a(s, o) {
    var r = s[0], c = s[1], p = s[2], h = o[0], m = o[1], g = o[2], y = h - r, b = m - c, l = y * y + b * b, d, f;
    if (l < Dd)
      f = Math.log(g / p) / t, d = function(N) {
        return [
          r + N * y,
          c + N * b,
          p * Math.exp(t * N * f)
        ];
      };
    else {
      var _ = Math.sqrt(l), E = (g * g - p * p + n * l) / (2 * p * i * _), A = (g * g - p * p - n * l) / (2 * g * i * _), O = Math.log(Math.sqrt(E * E + 1) - E), C = Math.log(Math.sqrt(A * A + 1) - A);
      f = (C - O) / t, d = function(N) {
        var G = N * f, j = Hn(O), de = p / (i * _) * (j * Ud(t * G + O) - Ld(O));
        return [
          r + de * y,
          c + de * b,
          p * j / Hn(t * G + O)
        ];
      };
    }
    return d.duration = f * 1e3 * t / Math.SQRT2, d;
  }
  return a.rho = function(s) {
    var o = Math.max(1e-3, +s), r = o * o, c = r * r;
    return e(o, r, c);
  }, a;
})(Math.SQRT2, 2, 4);
var Dt = 0, Wt = 0, Ut = 0, Ya = 1e3, Ti, Vt, Oi = 0, Ct = 0, Ui = 0, ti = typeof performance == "object" && performance.now ? performance : Date, Ka = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function bn() {
  return Ct || (Ka(qd), Ct = ti.now() + Ui);
}
function qd() {
  Ct = 0;
}
function Ri() {
  this._call = this._time = this._next = null;
}
Ri.prototype = Xa.prototype = {
  constructor: Ri,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? bn() : +i) + (t == null ? 0 : +t), !this._next && Vt !== this && (Vt ? Vt._next = this : Ti = this, Vt = this), this._call = e, this._time = i, an();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, an());
  }
};
function Xa(e, t, i) {
  var n = new Ri();
  return n.restart(e, t, i), n;
}
function Bd() {
  bn(), ++Dt;
  for (var e = Ti, t; e; )
    (t = Ct - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Dt;
}
function jn() {
  Ct = (Oi = ti.now()) + Ui, Dt = Wt = 0;
  try {
    Bd();
  } finally {
    Dt = 0, Wd(), Ct = 0;
  }
}
function Fd() {
  var e = ti.now(), t = e - Oi;
  t > Ya && (Ui -= t, Oi = e);
}
function Wd() {
  for (var e, t = Ti, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Ti = i);
  Vt = e, an(n);
}
function an(e) {
  if (!Dt) {
    Wt && (Wt = clearTimeout(Wt));
    var t = e - Ct;
    t > 24 ? (e < 1 / 0 && (Wt = setTimeout(jn, e - ti.now() - Ui)), Ut && (Ut = clearInterval(Ut))) : (Ut || (Oi = ti.now(), Ut = setInterval(Fd, Ya)), Dt = 1, Ka(jn));
  }
}
function Yn(e, t, i) {
  var n = new Ri();
  return t = t == null ? 0 : +t, n.restart((a) => {
    n.stop(), e(a + t);
  }, t, i), n;
}
var Vd = gn("start", "end", "cancel", "interrupt"), Gd = [], Qa = 0, Kn = 1, on = 2, $i = 3, Xn = 4, sn = 5, _i = 6;
function zi(e, t, i, n, a, s) {
  var o = e.__transition;
  if (!o) e.__transition = {};
  else if (i in o) return;
  Hd(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: a,
    // For context during callback.
    on: Vd,
    tween: Gd,
    time: s.time,
    delay: s.delay,
    duration: s.duration,
    ease: s.ease,
    timer: null,
    state: Qa
  });
}
function vn(e, t) {
  var i = Ke(e, t);
  if (i.state > Qa) throw new Error("too late; already scheduled");
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
function Hd(e, t, i) {
  var n = e.__transition, a;
  n[t] = i, i.timer = Xa(s, 0, i.time);
  function s(p) {
    i.state = Kn, i.timer.restart(o, i.delay, i.time), i.delay <= p && o(p - i.delay);
  }
  function o(p) {
    var h, m, g, y;
    if (i.state !== Kn) return c();
    for (h in n)
      if (y = n[h], y.name === i.name) {
        if (y.state === $i) return Yn(o);
        y.state === Xn ? (y.state = _i, y.timer.stop(), y.on.call("interrupt", e, e.__data__, y.index, y.group), delete n[h]) : +h < t && (y.state = _i, y.timer.stop(), y.on.call("cancel", e, e.__data__, y.index, y.group), delete n[h]);
      }
    if (Yn(function() {
      i.state === $i && (i.state = Xn, i.timer.restart(r, i.delay, i.time), r(p));
    }), i.state = on, i.on.call("start", e, e.__data__, i.index, i.group), i.state === on) {
      for (i.state = $i, a = new Array(g = i.tween.length), h = 0, m = -1; h < g; ++h)
        (y = i.tween[h].value.call(e, e.__data__, i.index, i.group)) && (a[++m] = y);
      a.length = m + 1;
    }
  }
  function r(p) {
    for (var h = p < i.duration ? i.ease.call(null, p / i.duration) : (i.timer.restart(c), i.state = sn, 1), m = -1, g = a.length; ++m < g; )
      a[m].call(e, h);
    i.state === sn && (i.on.call("end", e, e.__data__, i.index, i.group), c());
  }
  function c() {
    i.state = _i, i.timer.stop(), delete n[t];
    for (var p in n) return;
    delete e.__transition;
  }
}
function Ci(e, t) {
  var i = e.__transition, n, a, s = !0, o;
  if (i) {
    t = t == null ? null : t + "";
    for (o in i) {
      if ((n = i[o]).name !== t) {
        s = !1;
        continue;
      }
      a = n.state > on && n.state < sn, n.state = _i, n.timer.stop(), n.on.call(a ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[o];
    }
    s && delete e.__transition;
  }
}
function jd(e) {
  return this.each(function() {
    Ci(this, e);
  });
}
function Yd(e, t) {
  var i, n;
  return function() {
    var a = Ze(this, e), s = a.tween;
    if (s !== i) {
      n = i = s;
      for (var o = 0, r = n.length; o < r; ++o)
        if (n[o].name === t) {
          n = n.slice(), n.splice(o, 1);
          break;
        }
    }
    a.tween = n;
  };
}
function Kd(e, t, i) {
  var n, a;
  if (typeof i != "function") throw new Error();
  return function() {
    var s = Ze(this, e), o = s.tween;
    if (o !== n) {
      a = (n = o).slice();
      for (var r = { name: t, value: i }, c = 0, p = a.length; c < p; ++c)
        if (a[c].name === t) {
          a[c] = r;
          break;
        }
      c === p && a.push(r);
    }
    s.tween = a;
  };
}
function Xd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = Ke(this.node(), i).tween, a = 0, s = n.length, o; a < s; ++a)
      if ((o = n[a]).name === e)
        return o.value;
    return null;
  }
  return this.each((t == null ? Yd : Kd)(i, e, t));
}
function In(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var a = Ze(this, n);
    (a.value || (a.value = {}))[t] = i.apply(this, arguments);
  }), function(a) {
    return Ke(a, n).value[t];
  };
}
function Ja(e, t) {
  var i;
  return (typeof t == "number" ? dt : t instanceof ei ? Vn : (i = ei(t)) ? (t = i, Vn) : Pd)(e, t);
}
function Qd(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Jd(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Zd(e, t, i) {
  var n, a = i + "", s;
  return function() {
    var o = this.getAttribute(e);
    return o === a ? null : o === n ? s : s = t(n = o, i);
  };
}
function el(e, t, i) {
  var n, a = i + "", s;
  return function() {
    var o = this.getAttributeNS(e.space, e.local);
    return o === a ? null : o === n ? s : s = t(n = o, i);
  };
}
function tl(e, t, i) {
  var n, a, s;
  return function() {
    var o, r = i(this), c;
    return r == null ? void this.removeAttribute(e) : (o = this.getAttribute(e), c = r + "", o === c ? null : o === n && c === a ? s : (a = c, s = t(n = o, r)));
  };
}
function il(e, t, i) {
  var n, a, s;
  return function() {
    var o, r = i(this), c;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (o = this.getAttributeNS(e.space, e.local), c = r + "", o === c ? null : o === n && c === a ? s : (a = c, s = t(n = o, r)));
  };
}
function nl(e, t) {
  var i = Li(e), n = i === "transform" ? Nd : Ja;
  return this.attrTween(e, typeof t == "function" ? (i.local ? il : tl)(i, n, In(this, "attr." + e, t)) : t == null ? (i.local ? Jd : Qd)(i) : (i.local ? el : Zd)(i, n, t));
}
function al(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function ol(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function sl(e, t) {
  var i, n;
  function a() {
    var s = t.apply(this, arguments);
    return s !== n && (i = (n = s) && ol(e, s)), i;
  }
  return a._value = t, a;
}
function rl(e, t) {
  var i, n;
  function a() {
    var s = t.apply(this, arguments);
    return s !== n && (i = (n = s) && al(e, s)), i;
  }
  return a._value = t, a;
}
function dl(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = Li(e);
  return this.tween(i, (n.local ? sl : rl)(n, t));
}
function ll(e, t) {
  return function() {
    vn(this, e).delay = +t.apply(this, arguments);
  };
}
function cl(e, t) {
  return t = +t, function() {
    vn(this, e).delay = t;
  };
}
function pl(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ll : cl)(t, e)) : Ke(this.node(), t).delay;
}
function ul(e, t) {
  return function() {
    Ze(this, e).duration = +t.apply(this, arguments);
  };
}
function ml(e, t) {
  return t = +t, function() {
    Ze(this, e).duration = t;
  };
}
function fl(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? ul : ml)(t, e)) : Ke(this.node(), t).duration;
}
function hl(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ze(this, e).ease = t;
  };
}
function gl(e) {
  var t = this._id;
  return arguments.length ? this.each(hl(t, e)) : Ke(this.node(), t).ease;
}
function yl(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ze(this, e).ease = i;
  };
}
function bl(e) {
  if (typeof e != "function") throw new Error();
  return this.each(yl(this._id, e));
}
function vl(e) {
  typeof e != "function" && (e = Ta(e));
  for (var t = this._groups, i = t.length, n = new Array(i), a = 0; a < i; ++a)
    for (var s = t[a], o = s.length, r = n[a] = [], c, p = 0; p < o; ++p)
      (c = s[p]) && e.call(c, c.__data__, p, s) && r.push(c);
  return new it(n, this._parents, this._name, this._id);
}
function Il(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, a = i.length, s = Math.min(n, a), o = new Array(n), r = 0; r < s; ++r)
    for (var c = t[r], p = i[r], h = c.length, m = o[r] = new Array(h), g, y = 0; y < h; ++y)
      (g = c[y] || p[y]) && (m[y] = g);
  for (; r < n; ++r)
    o[r] = t[r];
  return new it(o, this._parents, this._name, this._id);
}
function xl(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function wl(e, t, i) {
  var n, a, s = xl(t) ? vn : Ze;
  return function() {
    var o = s(this, e), r = o.on;
    r !== n && (a = (n = r).copy()).on(t, i), o.on = a;
  };
}
function kl(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Ke(this.node(), i).on.on(e) : this.each(wl(i, e, t));
}
function $l(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function _l() {
  return this.on("end.remove", $l(this._id));
}
function Cl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = fn(e));
  for (var n = this._groups, a = n.length, s = new Array(a), o = 0; o < a; ++o)
    for (var r = n[o], c = r.length, p = s[o] = new Array(c), h, m, g = 0; g < c; ++g)
      (h = r[g]) && (m = e.call(h, h.__data__, g, r)) && ("__data__" in h && (m.__data__ = h.__data__), p[g] = m, zi(p[g], t, i, g, p, Ke(h, i)));
  return new it(s, this._parents, t, i);
}
function El(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Pa(e));
  for (var n = this._groups, a = n.length, s = [], o = [], r = 0; r < a; ++r)
    for (var c = n[r], p = c.length, h, m = 0; m < p; ++m)
      if (h = c[m]) {
        for (var g = e.call(h, h.__data__, m, c), y, b = Ke(h, i), l = 0, d = g.length; l < d; ++l)
          (y = g[l]) && zi(y, t, i, l, g, b);
        s.push(g), o.push(h);
      }
  return new it(s, o, t, i);
}
var Sl = ai.prototype.constructor;
function Al() {
  return new Sl(this._groups, this._parents);
}
function Ml(e, t) {
  var i, n, a;
  return function() {
    var s = Nt(this, e), o = (this.style.removeProperty(e), Nt(this, e));
    return s === o ? null : s === i && o === n ? a : a = t(i = s, n = o);
  };
}
function Za(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Pl(e, t, i) {
  var n, a = i + "", s;
  return function() {
    var o = Nt(this, e);
    return o === a ? null : o === n ? s : s = t(n = o, i);
  };
}
function Tl(e, t, i) {
  var n, a, s;
  return function() {
    var o = Nt(this, e), r = i(this), c = r + "";
    return r == null && (c = r = (this.style.removeProperty(e), Nt(this, e))), o === c ? null : o === n && c === a ? s : (a = c, s = t(n = o, r));
  };
}
function Ol(e, t) {
  var i, n, a, s = "style." + t, o = "end." + s, r;
  return function() {
    var c = Ze(this, e), p = c.on, h = c.value[s] == null ? r || (r = Za(t)) : void 0;
    (p !== i || a !== h) && (n = (i = p).copy()).on(o, a = h), c.on = n;
  };
}
function Rl(e, t, i) {
  var n = (e += "") == "transform" ? Rd : Ja;
  return t == null ? this.styleTween(e, Ml(e, n)).on("end.style." + e, Za(e)) : typeof t == "function" ? this.styleTween(e, Tl(e, n, In(this, "style." + e, t))).each(Ol(this._id, e)) : this.styleTween(e, Pl(e, n, t), i).on("end.style." + e, null);
}
function Nl(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Dl(e, t, i) {
  var n, a;
  function s() {
    var o = t.apply(this, arguments);
    return o !== a && (n = (a = o) && Nl(e, o, i)), n;
  }
  return s._value = t, s;
}
function Ll(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Dl(e, t, i ?? ""));
}
function Ul(e) {
  return function() {
    this.textContent = e;
  };
}
function zl(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function ql(e) {
  return this.tween("text", typeof e == "function" ? zl(In(this, "text", e)) : Ul(e == null ? "" : e + ""));
}
function Bl(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Fl(e) {
  var t, i;
  function n() {
    var a = e.apply(this, arguments);
    return a !== i && (t = (i = a) && Bl(a)), t;
  }
  return n._value = e, n;
}
function Wl(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Fl(e));
}
function Vl() {
  for (var e = this._name, t = this._id, i = eo(), n = this._groups, a = n.length, s = 0; s < a; ++s)
    for (var o = n[s], r = o.length, c, p = 0; p < r; ++p)
      if (c = o[p]) {
        var h = Ke(c, t);
        zi(c, e, i, p, o, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new it(n, this._parents, e, i);
}
function Gl() {
  var e, t, i = this, n = i._id, a = i.size();
  return new Promise(function(s, o) {
    var r = { value: o }, c = { value: function() {
      --a === 0 && s();
    } };
    i.each(function() {
      var p = Ze(this, n), h = p.on;
      h !== e && (t = (e = h).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(c)), p.on = t;
    }), a === 0 && s();
  });
}
var Hl = 0;
function it(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function eo() {
  return ++Hl;
}
var et = ai.prototype;
it.prototype = {
  constructor: it,
  select: Cl,
  selectAll: El,
  selectChild: et.selectChild,
  selectChildren: et.selectChildren,
  filter: vl,
  merge: Il,
  selection: Al,
  transition: Vl,
  call: et.call,
  nodes: et.nodes,
  node: et.node,
  size: et.size,
  empty: et.empty,
  each: et.each,
  on: kl,
  attr: nl,
  attrTween: dl,
  style: Rl,
  styleTween: Ll,
  text: ql,
  textTween: Wl,
  remove: _l,
  tween: Xd,
  delay: pl,
  duration: fl,
  ease: gl,
  easeVarying: bl,
  end: Gl,
  [Symbol.iterator]: et[Symbol.iterator]
};
function jl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Yl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: jl
};
function Kl(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Xl(e) {
  var t, i;
  e instanceof it ? (t = e._id, e = e._name) : (t = eo(), (i = Yl).time = bn(), e = e == null ? null : e + "");
  for (var n = this._groups, a = n.length, s = 0; s < a; ++s)
    for (var o = n[s], r = o.length, c, p = 0; p < r; ++p)
      (c = o[p]) && zi(c, e, t, p, o, i || Kl(c, t));
  return new it(n, this._parents, e, t);
}
ai.prototype.interrupt = jd;
ai.prototype.transition = Xl;
const ci = (e) => () => e;
function Ql(e, {
  sourceEvent: t,
  target: i,
  transform: n,
  dispatch: a
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: i, enumerable: !0, configurable: !0 },
    transform: { value: n, enumerable: !0, configurable: !0 },
    _: { value: a }
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
function ji(e) {
  e.stopImmediatePropagation();
}
function zt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Jl(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Zl() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Qn() {
  return this.__zoom || Yt;
}
function ec(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function tc() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ic(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], a = e.invertX(t[1][0]) - i[1][0], s = e.invertY(t[0][1]) - i[0][1], o = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    a > n ? (n + a) / 2 : Math.min(0, n) || Math.max(0, a),
    o > s ? (s + o) / 2 : Math.min(0, s) || Math.max(0, o)
  );
}
function nc() {
  var e = Jl, t = Zl, i = ic, n = ec, a = tc, s = [0, 1 / 0], o = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, c = zd, p = gn("start", "zoom", "end"), h, m, g, y = 500, b = 150, l = 0, d = 10;
  function f(T) {
    T.property("__zoom", Qn).on("wheel.zoom", G, { passive: !1 }).on("mousedown.zoom", j).on("dblclick.zoom", de).filter(a).on("touchstart.zoom", $).on("touchmove.zoom", H).on("touchend.zoom touchcancel.zoom", te).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  f.transform = function(T, V, v, x) {
    var R = T.selection ? T.selection() : T;
    R.property("__zoom", Qn), T !== R ? O(T, V, v, x) : R.interrupt().each(function() {
      C(this, arguments).event(x).start().zoom(null, typeof V == "function" ? V.apply(this, arguments) : V).end();
    });
  }, f.scaleBy = function(T, V, v, x) {
    f.scaleTo(T, function() {
      var R = this.__zoom.k, k = typeof V == "function" ? V.apply(this, arguments) : V;
      return R * k;
    }, v, x);
  }, f.scaleTo = function(T, V, v, x) {
    f.transform(T, function() {
      var R = t.apply(this, arguments), k = this.__zoom, w = v == null ? A(R) : typeof v == "function" ? v.apply(this, arguments) : v, M = k.invert(w), S = typeof V == "function" ? V.apply(this, arguments) : V;
      return i(E(_(k, S), w, M), R, o);
    }, v, x);
  }, f.translateBy = function(T, V, v, x) {
    f.transform(T, function() {
      return i(this.__zoom.translate(
        typeof V == "function" ? V.apply(this, arguments) : V,
        typeof v == "function" ? v.apply(this, arguments) : v
      ), t.apply(this, arguments), o);
    }, null, x);
  }, f.translateTo = function(T, V, v, x, R) {
    f.transform(T, function() {
      var k = t.apply(this, arguments), w = this.__zoom, M = x == null ? A(k) : typeof x == "function" ? x.apply(this, arguments) : x;
      return i(Yt.translate(M[0], M[1]).scale(w.k).translate(
        typeof V == "function" ? -V.apply(this, arguments) : -V,
        typeof v == "function" ? -v.apply(this, arguments) : -v
      ), k, o);
    }, x, R);
  };
  function _(T, V) {
    return V = Math.max(s[0], Math.min(s[1], V)), V === T.k ? T : new tt(V, T.x, T.y);
  }
  function E(T, V, v) {
    var x = V[0] - v[0] * T.k, R = V[1] - v[1] * T.k;
    return x === T.x && R === T.y ? T : new tt(T.k, x, R);
  }
  function A(T) {
    return [(+T[0][0] + +T[1][0]) / 2, (+T[0][1] + +T[1][1]) / 2];
  }
  function O(T, V, v, x) {
    T.on("start.zoom", function() {
      C(this, arguments).event(x).start();
    }).on("interrupt.zoom end.zoom", function() {
      C(this, arguments).event(x).end();
    }).tween("zoom", function() {
      var R = this, k = arguments, w = C(R, k).event(x), M = t.apply(R, k), S = v == null ? A(M) : typeof v == "function" ? v.apply(R, k) : v, q = Math.max(M[1][0] - M[0][0], M[1][1] - M[0][1]), D = R.__zoom, U = typeof V == "function" ? V.apply(R, k) : V, F = c(D.invert(S).concat(q / D.k), U.invert(S).concat(q / U.k));
      return function(K) {
        if (K === 1) K = U;
        else {
          var le = F(K), Ee = q / le[2];
          K = new tt(Ee, S[0] - le[0] * Ee, S[1] - le[1] * Ee);
        }
        w.zoom(null, K);
      };
    });
  }
  function C(T, V, v) {
    return !v && T.__zooming || new N(T, V);
  }
  function N(T, V) {
    this.that = T, this.args = V, this.active = 0, this.sourceEvent = null, this.extent = t.apply(T, V), this.taps = 0;
  }
  N.prototype = {
    event: function(T) {
      return T && (this.sourceEvent = T), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(T, V) {
      return this.mouse && T !== "mouse" && (this.mouse[1] = V.invert(this.mouse[0])), this.touch0 && T !== "touch" && (this.touch0[1] = V.invert(this.touch0[0])), this.touch1 && T !== "touch" && (this.touch1[1] = V.invert(this.touch1[0])), this.that.__zoom = V, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(T) {
      var V = He(this.that).datum();
      p.call(
        T,
        this.that,
        new Ql(T, {
          sourceEvent: this.sourceEvent,
          target: f,
          transform: this.that.__zoom,
          dispatch: p
        }),
        V
      );
    }
  };
  function G(T, ...V) {
    if (!e.apply(this, arguments)) return;
    var v = C(this, V).event(T), x = this.__zoom, R = Math.max(s[0], Math.min(s[1], x.k * Math.pow(2, n.apply(this, arguments)))), k = ht(T);
    if (v.wheel)
      (v.mouse[0][0] !== k[0] || v.mouse[0][1] !== k[1]) && (v.mouse[1] = x.invert(v.mouse[0] = k)), clearTimeout(v.wheel);
    else {
      if (x.k === R) return;
      v.mouse = [k, x.invert(k)], Ci(this), v.start();
    }
    zt(T), v.wheel = setTimeout(w, b), v.zoom("mouse", i(E(_(x, R), v.mouse[0], v.mouse[1]), v.extent, o));
    function w() {
      v.wheel = null, v.end();
    }
  }
  function j(T, ...V) {
    if (g || !e.apply(this, arguments)) return;
    var v = T.currentTarget, x = C(this, V, !0).event(T), R = He(T.view).on("mousemove.zoom", S, !0).on("mouseup.zoom", q, !0), k = ht(T, v), w = T.clientX, M = T.clientY;
    ud(T.view), ji(T), x.mouse = [k, this.__zoom.invert(k)], Ci(this), x.start();
    function S(D) {
      if (zt(D), !x.moved) {
        var U = D.clientX - w, F = D.clientY - M;
        x.moved = U * U + F * F > l;
      }
      x.event(D).zoom("mouse", i(E(x.that.__zoom, x.mouse[0] = ht(D, v), x.mouse[1]), x.extent, o));
    }
    function q(D) {
      R.on("mousemove.zoom mouseup.zoom", null), md(D.view, x.moved), zt(D), x.event(D).end();
    }
  }
  function de(T, ...V) {
    if (e.apply(this, arguments)) {
      var v = this.__zoom, x = ht(T.changedTouches ? T.changedTouches[0] : T, this), R = v.invert(x), k = v.k * (T.shiftKey ? 0.5 : 2), w = i(E(_(v, k), x, R), t.apply(this, V), o);
      zt(T), r > 0 ? He(this).transition().duration(r).call(O, w, x, T) : He(this).call(f.transform, w, x, T);
    }
  }
  function $(T, ...V) {
    if (e.apply(this, arguments)) {
      var v = T.touches, x = v.length, R = C(this, V, T.changedTouches.length === x).event(T), k, w, M, S;
      for (ji(T), w = 0; w < x; ++w)
        M = v[w], S = ht(M, this), S = [S, this.__zoom.invert(S), M.identifier], R.touch0 ? !R.touch1 && R.touch0[2] !== S[2] && (R.touch1 = S, R.taps = 0) : (R.touch0 = S, k = !0, R.taps = 1 + !!h);
      h && (h = clearTimeout(h)), k && (R.taps < 2 && (m = S[0], h = setTimeout(function() {
        h = null;
      }, y)), Ci(this), R.start());
    }
  }
  function H(T, ...V) {
    if (this.__zooming) {
      var v = C(this, V).event(T), x = T.changedTouches, R = x.length, k, w, M, S;
      for (zt(T), k = 0; k < R; ++k)
        w = x[k], M = ht(w, this), v.touch0 && v.touch0[2] === w.identifier ? v.touch0[0] = M : v.touch1 && v.touch1[2] === w.identifier && (v.touch1[0] = M);
      if (w = v.that.__zoom, v.touch1) {
        var q = v.touch0[0], D = v.touch0[1], U = v.touch1[0], F = v.touch1[1], K = (K = U[0] - q[0]) * K + (K = U[1] - q[1]) * K, le = (le = F[0] - D[0]) * le + (le = F[1] - D[1]) * le;
        w = _(w, Math.sqrt(K / le)), M = [(q[0] + U[0]) / 2, (q[1] + U[1]) / 2], S = [(D[0] + F[0]) / 2, (D[1] + F[1]) / 2];
      } else if (v.touch0) M = v.touch0[0], S = v.touch0[1];
      else return;
      v.zoom("touch", i(E(w, M, S), v.extent, o));
    }
  }
  function te(T, ...V) {
    if (this.__zooming) {
      var v = C(this, V).event(T), x = T.changedTouches, R = x.length, k, w;
      for (ji(T), g && clearTimeout(g), g = setTimeout(function() {
        g = null;
      }, y), k = 0; k < R; ++k)
        w = x[k], v.touch0 && v.touch0[2] === w.identifier ? delete v.touch0 : v.touch1 && v.touch1[2] === w.identifier && delete v.touch1;
      if (v.touch1 && !v.touch0 && (v.touch0 = v.touch1, delete v.touch1), v.touch0) v.touch0[1] = this.__zoom.invert(v.touch0[0]);
      else if (v.end(), v.taps === 2 && (w = ht(w, this), Math.hypot(m[0] - w[0], m[1] - w[1]) < d)) {
        var M = He(this).on("dblclick.zoom");
        M && M.apply(this, arguments);
      }
    }
  }
  return f.wheelDelta = function(T) {
    return arguments.length ? (n = typeof T == "function" ? T : ci(+T), f) : n;
  }, f.filter = function(T) {
    return arguments.length ? (e = typeof T == "function" ? T : ci(!!T), f) : e;
  }, f.touchable = function(T) {
    return arguments.length ? (a = typeof T == "function" ? T : ci(!!T), f) : a;
  }, f.extent = function(T) {
    return arguments.length ? (t = typeof T == "function" ? T : ci([[+T[0][0], +T[0][1]], [+T[1][0], +T[1][1]]]), f) : t;
  }, f.scaleExtent = function(T) {
    return arguments.length ? (s[0] = +T[0], s[1] = +T[1], f) : [s[0], s[1]];
  }, f.translateExtent = function(T) {
    return arguments.length ? (o[0][0] = +T[0][0], o[1][0] = +T[1][0], o[0][1] = +T[0][1], o[1][1] = +T[1][1], f) : [[o[0][0], o[0][1]], [o[1][0], o[1][1]]];
  }, f.constrain = function(T) {
    return arguments.length ? (i = T, f) : i;
  }, f.duration = function(T) {
    return arguments.length ? (r = +T, f) : r;
  }, f.interpolate = function(T) {
    return arguments.length ? (c = T, f) : c;
  }, f.on = function() {
    var T = p.on.apply(p, arguments);
    return T === p ? f : T;
  }, f.clickDistance = function(T) {
    return arguments.length ? (l = (T = +T) * T, f) : Math.sqrt(l);
  }, f.tapDistance = function(T) {
    return arguments.length ? (d = +T, f) : d;
  }, f;
}
var ac = Object.defineProperty, oc = Object.getOwnPropertyDescriptor, $e = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? oc(t, i) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (a = (n ? o(t, i, a) : o(a)) || a);
  return n && a && ac(t, i, a), a;
};
function sc(e, t, i, n) {
  const a = t.x - e.x, s = t.y - e.y, o = n.x - i.x, r = n.y - i.y, c = a * r - s * o;
  if (Math.abs(c) < 1e-9) return null;
  const p = ((i.x - e.x) * r - (i.y - e.y) * o) / c, h = ((i.x - e.x) * s - (i.y - e.y) * a) / c;
  return p <= 0.02 || p >= 0.98 || h <= 0.02 || h >= 0.98 ? null : { x: e.x + p * a, y: e.y + p * s, t: p };
}
function rc(e, t, i) {
  const n = i.x - t.x, a = i.y - t.y, s = n * n + a * a || 1, o = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * a) / s)), r = t.x + o * n, c = t.y + o * a;
  return { dist: Math.hypot(e.x - r, e.y - c), t: o };
}
function dc(e) {
  let t = 0;
  for (let n = 0; n < e.length - 1; n++) t += Math.hypot(e[n + 1].x - e[n].x, e[n + 1].y - e[n].y);
  let i = t / 2;
  for (let n = 0; n < e.length - 1; n++) {
    const a = Math.hypot(e[n + 1].x - e[n].x, e[n + 1].y - e[n].y);
    if (a >= i && a > 0) {
      const s = i / a;
      return { x: e[n].x + (e[n + 1].x - e[n].x) * s, y: e[n].y + (e[n + 1].y - e[n].y) * s };
    }
    i -= a;
  }
  return e[Math.floor(e.length / 2)];
}
function lc(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let a = 0; a < e.length - 1; a++) {
    const s = e[a], o = e[a + 1], r = Math.hypot(o.x - s.x, o.y - s.y) || 1, c = (o.x - s.x) / r, p = (o.y - s.y) / r, h = t.map(([g, y]) => sc(s, o, g, y)).filter((g) => g !== null).filter((g) => g.t * r > i + 2 && (1 - g.t) * r > i + 2).sort((g, y) => g.t - y.t);
    let m = -1 / 0;
    for (const g of h)
      g.t * r - i <= m + 2 || (n += ` L ${g.x - c * i} ${g.y - p * i}`, n += ` A ${i} ${i} 0 0 1 ${g.x + c * i} ${g.y + p * i}`, m = g.t * r + i);
    n += ` L ${o.x} ${o.y}`;
  }
  return n;
}
const Pt = {
  component: Z`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: Z`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  shield: Z`<path d="M6 0.5 L11 2.5 V6 C11 9 8.8 11 6 11.8 C3.2 11 1 9 1 6 V2.5 Z"></path>`,
  note: Z`<path d="M1.5 0.5 H10.5 V7.5 L7 11.5 H1.5 Z"></path><path d="M10.5 7.5 H7 V11.5"></path>`,
  area: Z`<rect x="0.5" y="1.5" width="11" height="9" rx="1" stroke-dasharray="2.4 1.8"></rect>`,
  entity: Z`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: Z`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: Z`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: Z`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  clock: Z`<circle cx="6" cy="6" r="4.4" fill="none"></circle>
    <path d="M6 3.4 L6 6 L7.9 7.4" fill="none" stroke-linecap="round"></path>`,
  key: Z`<circle cx="4.2" cy="4.2" r="2.6" fill="none"></circle>
    <path d="M6 6 L10 10 M8 8 L9.6 6.4 M9 9 L10.6 7.4" fill="none" stroke-linecap="round"></path>`,
  gear: Z`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: Z`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: Z`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: Z`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: Z`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: Z`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: Z`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: Z`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: Z`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
    <path d="M2.5 3.5 H9.5 V6 A3.5 3.5 0 0 1 2.5 6 Z"></path>
    <path d="M6 9.5 V11.5"></path>`
};
let we = class extends Ge {
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
            const a = this.scene.nodes.filter((s) => this.selectedIds.includes(s.id)).map((s) => ({ id: s.id, kind: s.kind }));
            a.length && this.emit("delete-selection-requested", { items: a });
            return;
          }
          if (this._selectedWaypoint) {
            const a = this.scene.edges.find((s) => s.id === this._selectedWaypoint.edgeId);
            a && (e.preventDefault(), this.removeWaypoint(a, this._selectedWaypoint.index), this._selectedWaypoint = null);
            return;
          }
          if (!this.selectedId) return;
          const t = this.scene.edges.find((a) => a.id === this.selectedId), i = this.scene.nodes.find((a) => a.id === this.selectedId);
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
    this._zoomBehavior = nc().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), He(e).call(this._zoomBehavior);
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
    const a = this.fitInsets.left ?? 0, s = this.fitInsets.right ?? 0, o = this.fitInsets.top ?? 0, r = this.fitInsets.bottom ?? 0, c = Math.max(80, n.width - a - s), p = Math.max(80, n.height - o - r), h = Math.min(...t.map((d) => d.x - d.w / 2)) - e, m = Math.max(...t.map((d) => d.x + d.w / 2)) + e, g = Math.min(...t.map((d) => d.y - d.h / 2)) - e, y = Math.max(...t.map((d) => d.y + d.h / 2)) + e, b = Math.max(0.15, Math.min(c / (m - h), p / (y - g), 1.25)), l = Yt.translate(
      a + c / 2 - b * (h + m) / 2,
      o + p / 2 - b * (g + y) / 2
    ).scale(b);
    He(i).call(this._zoomBehavior.transform, l);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(He(t), e);
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
    var i, n, a;
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    const t = (i = this._dragGroup) == null ? void 0 : i.get(e.id);
    if (t) return t;
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    for (let s = e.parentId; s; s = (n = this.scene.nodes.find((o) => o.id === s)) == null ? void 0 : n.parentId) {
      const o = this.scene.nodes.find((c) => c.id === s);
      if (!o) break;
      if (this._dragPos && this._dragPos.id === s)
        return { x: e.x + (this._dragPos.x - o.x), y: e.y + (this._dragPos.y - o.y) };
      const r = (a = this._dragGroup) == null ? void 0 : a.get(s);
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
      const n = this.scene.nodes.find((a) => a.id === e.parentId);
      if (n) {
        const a = this.nodePos(n), s = a.x - n.w / 2 + 10 + e.w / 2, o = a.x + n.w / 2 - 10 - e.w / 2, r = a.y - n.h / 2 + 34 + e.h / 2, c = a.y + n.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, s), o), i = Math.min(Math.max(i, r), c);
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
  /** Topmost node at a client-space point (also used by palette drops). */
  nodeIdAtClient(e, t) {
    var n, a;
    const i = ((n = this.shadowRoot) == null ? void 0 : n.elementsFromPoint(e, t)) ?? [];
    for (const s of i) {
      const o = (a = s.closest) == null ? void 0 : a.call(s, "[data-node-id]");
      if (o) return o.getAttribute("data-node-id");
    }
    return null;
  }
  /** Topmost edge at a client-space point — note threads can land on relations. */
  edgeIdAtClient(e, t) {
    var n, a;
    const i = ((n = this.shadowRoot) == null ? void 0 : n.elementsFromPoint(e, t)) ?? [];
    for (const s of i) {
      const o = (a = s.closest) == null ? void 0 : a.call(s, "[data-edge-id]");
      if (o) return o.getAttribute("data-edge-id");
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
    let a = !1;
    const s = new Set(this.selectedIds), o = s.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (d) => s.has(d.id) && !(d.parentId && s.has(d.parentId))
    ) : t.kind === "area" ? this.areaCargo(t) : null, r = o ? new Map(o.map((d) => [d.id, this.nodePos(d)])) : null, c = (d) => (d.shiftKey || d.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !o || d.shiftKey && t.kind === "external-system" && !o, p = o ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, h = p !== null, m = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], g = () => {
      const d = [], f = p === "menu" ? this.scene.nodes.filter((_) => _.kind === "ui-app") : this.scene.nodes.filter((_) => _.id === (t.ownerId ?? t.parentId));
      for (const _ of f) {
        const E = this.scene.nodes.filter((N) => (N.ownerId ?? N.parentId) === _.id && m.includes(N.kind ?? "") && N.id !== t.id).sort((N, G) => N.y - G.y), A = _.x - _.w / 2 + 10, O = _.x + _.w / 2 - 10;
        for (const N of E) d.push({ x1: A, x2: O, y: N.y - N.h / 2 - 3, appId: _.id, beforeId: N.id });
        const C = E[E.length - 1];
        d.push({
          x1: A,
          x2: O,
          y: C ? C.y + C.h / 2 + 3 : _.y - _.h / 2 + 34 + 8,
          appId: _.id,
          beforeId: null
        });
      }
      return d;
    }, y = (d) => {
      const f = this.nodeIdAt(d), _ = f && f !== t.id ? this.scene.nodes.find((E) => E.id === f) : void 0;
      return _ ? _.kind === "external-system" ? _.id : _.parentId ?? null : null;
    }, b = (d) => {
      if ((d.buttons & 1) === 0) {
        l(d);
        return;
      }
      const f = this.toScene(d), _ = f.x - i.x, E = f.y - i.y;
      if (!(!a && Math.hypot(_, E) < 3 / this._t.k))
        if (a = !0, o && r) {
          const A = /* @__PURE__ */ new Map();
          for (const O of o) {
            const C = r.get(O.id), N = this.clampToParent(O, C.x + _, C.y + E);
            A.set(O.id, { x: N.x, y: N.y });
          }
          this._dragGroup = A;
        } else if (h) {
          this._dragPos = { id: t.id, x: n.x + _, y: n.y + E }, this._menuSlots || (this._menuSlots = { slots: g(), active: null, nestRowId: null });
          const A = this.scene.nodes.filter(
            (C) => m.includes(C.kind ?? "") && C.id !== t.id && Math.abs(f.x - C.x) <= C.w / 2 + 8
          ), O = p === "menu" ? A.find((C) => Math.abs(f.y - C.y) < C.h * 0.28) : void 0;
          if (O)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: O.id }, this._hoverNodeId = O.id;
          else {
            let C = -1, N = 14;
            this._menuSlots.slots.forEach((G, j) => {
              if (f.x < G.x1 - 24 || f.x > G.x2 + 24) return;
              const de = Math.abs(f.y - G.y);
              de < N && (N = de, C = j);
            }), this._menuSlots = { ...this._menuSlots, active: C >= 0 ? C : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else c(d) ? (this._dragPos = { id: t.id, x: n.x + _, y: n.y + E }, this._hoverNodeId = y(d)) : (this._dragPos = this.clampToParent(t, n.x + _, n.y + E), this._hoverNodeId = null);
    }, l = (d) => {
      if (window.removeEventListener("pointermove", b), window.removeEventListener("pointerup", l), a && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([f, _]) => ({ id: f, x: _.x, y: _.y }))
        });
      else if (a && this._dragPos && h) {
        const f = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const _ = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (f != null && f.nestRowId)
          this.emit(_, { id: t.id, nestRowId: f.nestRowId });
        else if (f && f.active !== null) {
          const E = f.slots[f.active];
          this.emit(_, { id: t.id, appId: E.appId, beforeId: E.beforeId });
        }
        return;
      } else if (a && this._dragPos) {
        if (c(d)) {
          const f = y(d);
          if (d.ctrlKey && t.kind === "api") {
            f && f !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: f,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (f !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: f,
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
    window.addEventListener("pointermove", b), window.addEventListener("pointerup", l);
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
    const a = t.kind === "area", s = t.container && !t.parentId, o = a ? 30 : s ? 160 : 90, r = a ? 20 : s ? 90 : 30, c = { x: t.x, y: t.y, w: t.w, h: t.h }, p = s ? this.scene.nodes.filter((f) => f.parentId === t.id) : [], h = Math.min(...p.map((f) => f.x - f.w / 2)), m = Math.max(...p.map((f) => f.x + f.w / 2)), g = Math.min(...p.map((f) => f.y - f.h / 2)), y = Math.max(...p.map((f) => f.y + f.h / 2)), b = Po(
      p.map((f) => ({ dx: f.x - c.x, dy: f.y - c.y, w: f.w, h: f.h })),
      { w: o, h: r }
    ), l = (f) => {
      if ((f.buttons & 1) === 0) {
        d();
        return;
      }
      const _ = this.toScene(f);
      if (f.shiftKey) {
        this._resize = {
          id: t.id,
          x: c.x,
          y: c.y,
          w: Math.max(b.w, 2 * Math.abs(_.x - c.x)),
          h: Math.max(b.h, 2 * Math.abs(_.y - c.y))
        };
        return;
      }
      const E = c.x - i * c.w / 2, A = c.y - n * c.h / 2, O = i > 0 ? Math.max(_.x, E + o, p.length ? m + 10 : -1 / 0) : Math.min(_.x, E - o, p.length ? h - 10 : 1 / 0), C = n > 0 ? Math.max(_.y, A + r, p.length ? y + 10 : -1 / 0) : Math.min(_.y, A - r, p.length ? g - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (E + O) / 2,
        y: (A + C) / 2,
        w: Math.abs(O - E),
        h: Math.abs(C - A)
      };
    }, d = () => {
      window.removeEventListener("pointermove", l), window.removeEventListener("pointerup", d), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", l), window.addEventListener("pointerup", d);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const n = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: n.x, y: n.y };
    const a = (o) => {
      if ((o.buttons & 1) === 0) {
        window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", s), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const r = this.toScene(o);
      this._pendingLink = { sourceId: t.id, x: r.x, y: r.y }, this._hoverNodeId = this.nodeIdAt(o);
    }, s = (o) => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", s);
      const r = this.nodeIdAt(o);
      if (r && r !== t.id)
        this.emit("connect-requested", {
          sourceId: t.id,
          targetId: r,
          x: o.clientX,
          y: o.clientY,
          connectKind: i
        });
      else if (t.kind === "note") {
        const c = this.edgeIdAtClient(o.clientX, o.clientY);
        c && !c.startsWith("note:") && this.emit("connect-requested", {
          sourceId: t.id,
          targetId: `edge:${c}`,
          x: o.clientX,
          y: o.clientY,
          connectKind: i
        });
      }
      this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: a } = this.nodePos(e), s = t - n, o = i - a, r = e.w / 2, c = e.h / 2;
    if (s === 0 && o === 0) return { x: n, y: a };
    const p = 1 / Math.max(Math.abs(s) / r, Math.abs(o) / c);
    return { x: n + s * p, y: a + o * p };
  }
  // ---- rendering -----------------------------------------------------------
  /** Perpendicular offset so edges sharing a node pair don't overlap. */
  edgeOffset(e) {
    const t = [e.sourceId, e.targetId].sort().join("|"), i = this.scene.edges.filter(
      (a) => [a.sourceId, a.targetId].sort().join("|") === t
    );
    return i.length < 2 ? 0 : (i.findIndex((a) => a.id === e.id) - (i.length - 1) / 2) * 20;
  }
  /** Full polyline of an edge: border point → waypoints → border point. */
  edgePolyline(e) {
    const t = this.scene.nodes.find((h) => h.id === e.sourceId);
    if (e.targetId.startsWith("edgeanchor:")) {
      if (!t) return null;
      const h = e.targetId.slice(11), m = this.scene.edges.find((b) => b.id === h), g = m && m.id !== e.id ? this.edgePolyline(m) : null;
      if (!g || g.length < 2) return null;
      const y = dc(g);
      return [this.borderPoint(t, y.x, y.y), y];
    }
    const i = this.scene.nodes.find((h) => h.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], a = this.nodePos(t), s = this.nodePos(i), o = n[0] ?? s, r = n[n.length - 1] ?? a;
    let c = this.borderPoint(t, o.x, o.y), p = this.borderPoint(i, r.x, r.y);
    if (!n.length) {
      const h = this.edgeOffset(e);
      if (h !== 0) {
        const m = Math.hypot(p.x - c.x, p.y - c.y) || 1, g = -(p.y - c.y) / m * h, y = (p.x - c.x) / m * h;
        c = { x: c.x + g, y: c.y + y }, p = { x: p.x + g, y: p.y + y };
      }
    }
    return [c, ...n, p];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    const n = t[i];
    let a = !1;
    const s = (r) => {
      if (!this._wpDrag) return;
      const c = this.toScene(r);
      if (!a && Math.hypot(c.x - n.x, c.y - n.y) < 4 / this._t.k) return;
      a = !0;
      const p = [...this._wpDrag.points];
      p[this._wpDrag.index] = c, this._wpDrag = { ...this._wpDrag, points: p };
    }, o = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), this._wpDrag && a && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: a } = rc(t, e[n], e[n + 1]);
      a < i.dist && (i = { seg: n, dist: a });
    }
    return i.seg;
  }
  /** Insert a new bend on `edge` at scene point `at`, selecting it. */
  addWaypointAt(e, t, i) {
    const n = this.nearestSegment(t, i), a = [...this.edgePoints[e.id] ?? []];
    a.splice(n, 0, i), this._selectedWaypoint = { edgeId: e.id, index: n }, this.emit("edge-points-changed", { id: e.id, points: a });
  }
  /**
   * Dragging along a selected edge splits it: a bend is born once the pointer
   * actually moves, then follows the cursor. A plain click (no movement) leaves
   * the line alone so it just selects — and so a double-click can add a point.
   */
  onEdgeHitPointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0 || this.selectedId !== t.id) return;
    e.stopPropagation();
    const n = this.toScene(e), a = this.nearestSegment(i, n);
    let s = !1;
    const o = (c) => {
      if ((c.buttons & 1) === 0) {
        r();
        return;
      }
      const p = this.toScene(c);
      if (s) {
        if (this._wpDrag) {
          const h = [...this._wpDrag.points];
          h[a] = p, this._wpDrag = { ...this._wpDrag, points: h };
        }
      } else {
        if (Math.hypot(p.x - n.x, p.y - n.y) < 4 / this._t.k) return;
        s = !0, this.focus();
        const h = [...this.edgePoints[t.id] ?? []];
        h.splice(a, 0, p), this._selectedWaypoint = { edgeId: t.id, index: a }, this._wpDrag = { edgeId: t.id, points: h, index: a };
      }
    }, r = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", r), s && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", r);
  }
  removeWaypoint(e, t) {
    const i = [...this.edgePoints[e.id] ?? []];
    i.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: i });
  }
  /** The interactive half of an edge: the fat invisible hit line (select, bend, drag). */
  renderEdgeHit(e, t) {
    const i = t.map((n) => `${n.x},${n.y}`).join(" ");
    return Z`
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
          ${e.tooltip ? Z`<title>${e.tooltip}</title>` : ""}
        </polyline>
      </g>`;
  }
  /**
   * The visible half (stroke, arrow, label, waypoint handles), painted in a layer
   * ABOVE every node so a line is never hidden — without stealing the nodes'
   * pointer events: only the label and the waypoint handles are interactive.
   */
  renderEdgeInk(e, t, i) {
    const n = e.color ?? "#64748b", a = this.selectedId === e.id, s = a || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), o = Math.floor((t.length - 1) / 2), r = {
      x: (t[o].x + t[o + 1].x) / 2,
      y: (t[o].y + t[o + 1].y) / 2
    }, c = t.slice(1, -1);
    return Z`
      <g data-edge-ink=${e.id} pointer-events="none" opacity=${e.dim ? 0.18 : 1}>
        <path d=${lc(t, i)}
              fill="none"
              stroke=${n} stroke-width=${s ? 3 : 1.6}
              stroke-dasharray=${e.dashArray ?? (e.dashed ? "6 4" : "")}
              opacity="0.92"
              marker-start=${e.markerStart ? `url(#${e.markerStart}-${this.markerId(n)})` : e.kind === "contains" ? `url(#diamond-${this.markerId(n)})` : ""}
              marker-end=${e.markerEnd ? `url(#${e.markerEnd}-${this.markerId(n)})` : e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? Z`<text x=${r.x} y=${r.y - 6} text-anchor="middle"
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
        ${a ? c.map((p, h) => {
      var g;
      const m = ((g = this._selectedWaypoint) == null ? void 0 : g.edgeId) === e.id && this._selectedWaypoint.index === h;
      return Z`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${m ? 6 : 5}
                        fill=${m ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(y) => {
        y.button === 0 && (y.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: h }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], h));
      }}
                        @dblclick=${(y) => {
        y.stopPropagation(), this.removeWaypoint(e, h);
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
    var g, y, b, l;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), a = this._hoverNodeId === e.id, s = !!e.container, o = !!e.parentId, r = ((g = this._resize) == null ? void 0 : g.id) === e.id ? this._resize.w : e.w, c = ((y = this._resize) == null ? void 0 : y.id) === e.id ? this._resize.h : e.h, p = r / 2, h = c / 2, m = o && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return Z`
      <g data-node-id=${e.id}
         opacity=${e.dim ? 0.25 : 1}
         transform="translate(${t}, ${i})${a ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (b = this._dragGroup) != null && b.has(e.id) ? "none" : "auto"}
         @pointerdown=${(d) => this.onNodePointerDown(d, e)}
         @dblclick=${(d) => {
      d.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? Z`<rect x=${-p - 4} y=${-h - 4} width=${r + 8} height=${c + 8}
                  rx=${o ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-h} width=${r} height=${c} rx=${o ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${a || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || a ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? Z`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? Z`<text x=${-p} y=${-h - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? Z`<g transform="translate(${p - 13}, ${-h + 13})"
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
        ${e.symbol && Pt[e.symbol] && (!o || s) ? Z`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-h + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Pt[e.symbol]}
              </g>` : ""}
        ${o && !s && e.symbol && Pt[e.symbol] ? Z`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Pt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? Z`
              <foreignObject x=${-p + 6} y=${s ? -h + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${s ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(d) => d.stopPropagation()}
                  @keydown=${(d) => {
      d.stopPropagation(), d.key === "Enter" && this.commitRename(e, d.target.value), d.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(d) => this.commitRename(e, d.target.value)}
                />
              </foreignObject>` : o && !s ? Z`<text x=${-p + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : s ? Z`<text x=${-p + 12} y=${-h + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : e.kind === "area" ? "" : Z`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${s ? Z`<line x1=${-p + 8} y1=${-h + 28} x2=${p - 8} y2=${-h + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (o ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-system" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "note" || e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "boundedContext" || e.kind === "ui" || e.kind === "ui-app" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item" || // Archi style: the ex-nested kinds are free boxes now — same handles.
    e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "read-model" || e.kind === "query-service" || e.kind === "scheduled-trigger" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api-impl" || e.kind === "service") ? [
      [p, 0],
      [-p, 0],
      [0, h],
      [0, -h]
    ].map(
      ([d, f]) => Z`
                <circle data-handle cx=${d} cy=${f} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(_) => this.onHandlePointerDown(_, e)}>
                  <title>${o ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "note" ? "Arrastra hasta cualquier elemento o relación: la nota quedará atada con un hilo" : e.kind === "service" ? "Arrastra hasta un módulo (o su contexto) para desplegarlo en este servicio" : e.kind === "boundedContext" ? "Arrastra hasta otro contexto (elige el patrón DDD), un IdP (identidad) o cualquier elemento (relación ArchiMate)" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${n && this.connectable && ((l = e.extraHandles) != null && l.length) ? e.extraHandles.map(
      (d, f) => Z`
                <g transform="translate(${-p + 24 + f * 20}, ${-h})">
                  <circle data-handle r="7" fill=${d.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(_) => this.onHandlePointerDown(_, e, d.kind)}>
                    <title>${d.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${(s || e.resizable) && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([d, f]) => Z`
                <rect data-resize x=${d * p - 6.5} y=${f * h - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${d * f > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(_) => this.onResizePointerDown(_, e, d, f)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return Z``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return Z``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return Z`
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
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", s), window.removeEventListener("pointercancel", n), this._rubber = null;
    }, a = (o) => {
      if ((o.buttons & 1) === 0) {
        n();
        return;
      }
      const r = this.toScene(o);
      !i && Math.hypot(r.x - t.x, r.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: r });
    }, s = () => {
      if (window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", s), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a: o, b: r } = this._rubber, c = Math.min(o.x, r.x), p = Math.max(o.x, r.x), h = Math.min(o.y, r.y), m = Math.max(o.y, r.y), g = this.scene.nodes.filter((y) => {
          const b = this.nodePos(y);
          return b.x >= c && b.x <= p && b.y >= h && b.y <= m;
        }).map((y) => y.id);
        this.emit("nodes-boxed", { ids: g });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", s), window.addEventListener("pointercancel", n);
  }
  renderRubber() {
    if (!this._rubber) return Z``;
    const { a: e, b: t } = this._rubber;
    return Z`
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
    const i = Math.min(...t.map((o) => o.x - o.w / 2)) - e, n = Math.max(...t.map((o) => o.x + o.w / 2)) + e, a = Math.min(...t.map((o) => o.y - o.h / 2)) - e, s = Math.max(...t.map((o) => o.y + o.h / 2)) + e;
    return { minX: i, minY: a, w: n - i, h: s - a };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), a = this._t.k, s = Yt.translate(n.width / 2 - a * e, n.height / 2 - a * t).scale(a);
    He(i).call(this._zoomBehavior.transform, s);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), a = t.minX + (e.clientX - n.left) / i, s = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(a, s);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return I``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), a = this.getBoundingClientRect(), s = (0 - this._t.x) / this._t.k, o = (0 - this._t.y) / this._t.k, r = a.width / this._t.k, c = a.height / this._t.k;
    return I`
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
      var h, m;
      (m = (h = p.currentTarget).hasPointerCapture) != null && m.call(h, p.pointerId) && this.onMinimapPointer(p, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((p) => {
      const h = this.nodePos(p);
      return Z`<rect
              x=${(h.x - p.w / 2 - e.minX) * n}
              y=${(h.y - p.h / 2 - e.minY) * n}
              width=${Math.max(2, p.w * n)}
              height=${Math.max(2, p.h * n)}
              rx="1" fill=${p.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(s - e.minX) * n}
            y=${(o - e.minY) * n}
            width=${r * n}
            height=${c * n}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((a) => a.color ?? "#64748b"))], t = [], i = [], n = [];
    return this.scene.edges.forEach((a) => {
      const s = this.edgePolyline(a);
      if (s) {
        i.push(this.renderEdgeHit(a, s)), n.push(this.renderEdgeInk(a, s, [...t]));
        for (let o = 0; o < s.length - 1; o++) t.push([s[o], s[o + 1]]);
      }
    }), I`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(a) => {
      const s = a.target;
      s.closest("[data-node-id]") || s.closest("[data-edge-id]") || this._spaceDown || a.button !== 0 || (a.buttons & 1) !== 0 && this.startRubberBand(a);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (a) => Z`
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
          ${i}
          ${this.scene.nodes.filter((a) => !a.parentId).map((a) => this.renderNode(a))}
          ${this.scene.nodes.filter((a) => a.parentId).map((a) => this.renderNode(a))}
          ${n}
          ${this._menuSlots ? Z`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (a, s) => Z`
                    <line x1=${a.x1} y1=${a.y} x2=${a.x2} y2=${a.y}
                          stroke=${s === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${s === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${s === this._menuSlots.active ? Z`<circle cx=${a.x1} cy=${a.y} r="3.5" fill="#0284c7"></circle>
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
we.styles = pt`
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
$e([
  re({ attribute: !1 })
], we.prototype, "scene", 2);
$e([
  re({ attribute: !1 })
], we.prototype, "selectedId", 2);
$e([
  re({ attribute: !1 })
], we.prototype, "selectedIds", 2);
$e([
  re({ type: Boolean })
], we.prototype, "connectable", 2);
$e([
  re({ attribute: !1 })
], we.prototype, "edgePoints", 2);
$e([
  z()
], we.prototype, "_t", 2);
$e([
  z()
], we.prototype, "_dragPos", 2);
$e([
  z()
], we.prototype, "_menuSlots", 2);
$e([
  z()
], we.prototype, "_dragGroup", 2);
$e([
  z()
], we.prototype, "_pendingLink", 2);
$e([
  z()
], we.prototype, "_hoverNodeId", 2);
$e([
  z()
], we.prototype, "_editingId", 2);
$e([
  z()
], we.prototype, "_spaceDown", 2);
$e([
  z()
], we.prototype, "_wpDrag", 2);
$e([
  z()
], we.prototype, "_selectedWaypoint", 2);
$e([
  z()
], we.prototype, "_resize", 2);
$e([
  z()
], we.prototype, "_rubber", 2);
$e([
  re({ attribute: !1 })
], we.prototype, "fitInsets", 2);
we = $e([
  ut("modux-canvas")
], we);
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
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const St = (e) => e.trim().toLowerCase();
function cc(e, t, i = /* @__PURE__ */ new Set(), n = !1) {
  var $, H, te, T, V;
  const a = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.boundedContexts.map((v) => [v.id, v.name])), o = e.boundedContexts.flatMap(
    (v) => (v.useCases ?? []).map((x) => ({ ...x, boundedContextId: v.id }))
  ), r = new Set(o.map((v) => v.id)), c = e.aggregates ?? [], p = new Set(
    e.boundedContexts.flatMap((v) => (v.domainServices ?? []).map((x) => x.id))
  ), h = e.boundedContexts.flatMap(
    (v) => (v.domainEvents ?? []).map((x) => ({ ...x, boundedContextId: v.id, application: !1 }))
  ), m = e.boundedContexts.flatMap(
    (v) => (v.applicationEvents ?? []).map((x) => ({ ...x, boundedContextId: v.id, application: !0 }))
  ), g = e.boundedContexts.flatMap(
    (v) => (v.readModels ?? []).map((x) => ({ ...x, boundedContextId: v.id }))
  );
  for (const v of o)
    Oe(a, {
      id: v.id,
      label: v.name,
      x: 0,
      y: 0,
      w: oe.command.w,
      h: oe.command.h,
      kind: "use-case",
      symbol: v.policy ? "flow" : "gear",
      fill: v.policy ? oe.policy.fill : oe.command.fill,
      stroke: v.policy ? oe.policy.stroke : oe.command.stroke,
      badge: v.policy ? "POLICY" : "COMANDO",
      tooltip: v.policy ? `${v.name} — policy de ${s.get(v.boundedContextId) ?? v.boundedContextId} (reacción, no caso de negocio)` : `${v.name} — caso de uso de ${s.get(v.boundedContextId) ?? v.boundedContextId}`
    });
  for (const v of o) {
    const x = v.steps ?? [];
    if (!x.length) continue;
    const R = a.nodes.get(v.id), k = n || i.has(v.id);
    R && (R.collapsible = !0, R.collapsed = !k), k && x.forEach((w, M) => {
      Oe(a, {
        id: w.id,
        label: `${M + 1}. ${w.name || w.type || "paso"}`,
        x: 0,
        y: 0,
        w: oe.command.w,
        h: 30,
        kind: "use-case-step",
        symbol: "gear",
        fill: "#eff6ff",
        stroke: "#1d4ed8",
        dashed: !!w.customCodeId,
        ownerId: v.id,
        tooltip: `Paso de ${v.name}${w.customCodeId ? " — delega en código a mano" : ""} — arrastra su asa hasta un CODE para delegar en él`
      }), me(a, {
        id: `esstep:${M === 0 ? v.id : x[M - 1].id}->${w.id}`,
        sourceId: M === 0 ? v.id : x[M - 1].id,
        targetId: w.id,
        kind: "es-step",
        color: "#94a3b8",
        dashed: !0,
        arrow: !0,
        tooltip: `pipeline de ${v.name}`
      });
    });
  }
  for (const v of e.customCodes ?? [])
    Oe(a, {
      id: v.id,
      label: v.name,
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
      tooltip: `${v.name} — código a mano: los pasos Custom delegan en él`
    });
  for (const v of o)
    for (const x of v.steps ?? []) {
      if (!x.customCodeId) continue;
      const R = !a.nodes.has(x.id), k = R ? v.id : x.id;
      R && a.edges.some((w) => w.kind === "es-custom" && w.sourceId === k && w.targetId === x.customCodeId) || me(a, {
        id: `escc:${x.id}`,
        sourceId: k,
        targetId: x.customCodeId,
        kind: "es-custom",
        color: "#0f172a",
        dashed: !0,
        arrow: !0,
        tooltip: R ? `Un paso plegado de ${v.name} delega en este código — expande el comando para verlo` : "El paso delega en código a mano — Supr lo desconecta"
      });
    }
  for (const v of c)
    Oe(a, {
      id: v.id,
      label: v.name,
      x: 0,
      y: 0,
      w: oe.aggregate.w,
      h: oe.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: oe.aggregate.fill,
      stroke: oe.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${v.name} — agregado de ${s.get(v.boundedContextId) ?? v.boundedContextId}`
    });
  const y = /* @__PURE__ */ new Map();
  for (const v of [...h, ...m])
    Oe(a, {
      id: v.id,
      label: v.name,
      x: 0,
      y: 0,
      w: oe.event.w,
      h: oe.event.h,
      kind: v.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: oe.event.fill,
      stroke: oe.event.stroke,
      badge: v.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${v.name} — evento de ${s.get(v.boundedContextId) ?? v.boundedContextId}`
    }), y.set(St(v.name), v.id);
  const b = (v) => {
    if (!v || !v.trim()) return null;
    const x = y.get(St(v));
    if (x) return x;
    const R = `evname:${St(v)}`;
    return Oe(a, {
      id: R,
      label: v,
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
      tooltip: `${v} — referenciado por nombre, sin evento declarado en el catálogo`
    }), R;
  }, l = (v) => {
    const x = g.find((k) => k.id === v.id) ?? g.find((k) => v.name && St(k.name) === St(v.name)), R = (x == null ? void 0 : x.id) ?? (v.id || (v.name ? `rm:${St(v.name)}` : null));
    return R ? (Oe(a, {
      id: R,
      label: (x == null ? void 0 : x.name) ?? v.name ?? R,
      x: 0,
      y: 0,
      w: oe.readModel.w,
      h: oe.readModel.h,
      kind: x ? "read-model" : "derived-read-model",
      fill: oe.readModel.fill,
      stroke: oe.readModel.stroke,
      dashed: !x,
      badge: "READ MODEL"
    }), R) : null;
  };
  for (const v of e.actorUses ?? []) {
    if (!r.has(v.targetId)) continue;
    const x = (e.actors ?? []).find((R) => R.id === v.actorId);
    x && (Oe(a, {
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
    }), me(a, {
      id: `es-actor:${x.id}->${v.targetId}`,
      sourceId: x.id,
      targetId: v.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const v of e.aiAgents ?? []) {
    const x = (e.agentUses ?? []).filter((S) => S.agentId === v.id), R = (e.agentExternalUses ?? []).filter((S) => S.agentId === v.id), k = (e.agentRags ?? []).filter((S) => S.agentId === v.id), w = (e.agentMcpUses ?? []).filter((S) => S.agentId === v.id), M = (e.agentGatewayUses ?? []).some((S) => S.agentId === v.id) || (e.agentApiOpUses ?? []).some((S) => S.agentId === v.id) || (e.agentQueryUses ?? []).some((S) => S.agentId === v.id) || (e.agentDelegations ?? []).some((S) => S.agentId === v.id) || (e.agentTriggers ?? []).some((S) => S.agentId === v.id);
    if (!(!x.length && !R.length && !k.length && !w.length && !M)) {
      Oe(a, {
        id: v.id,
        label: v.name,
        x: 0,
        y: 0,
        w: oe.actor.w,
        h: oe.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${v.name} — agente de IA (consume por MCP)`
      });
      for (const S of x)
        r.has(S.useCaseId) && me(a, {
          id: `es-agent:${v.id}->${S.useCaseId}`,
          sourceId: v.id,
          targetId: S.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const S of R) {
        const q = e.externalSystems.find(
          (U) => (U.useCases ?? []).some((F) => F.id === S.externalUseCaseId)
        );
        if (!q) continue;
        const D = ($ = (q.useCases ?? []).find((U) => U.id === S.externalUseCaseId)) == null ? void 0 : $.name;
        Oe(a, {
          id: q.id,
          label: q.name,
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
        }), me(a, {
          id: `es-agentx:${v.id}->${S.externalUseCaseId}`,
          sourceId: v.id,
          targetId: q.id,
          kind: "es-agent-external",
          label: D,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: D ? `Llama a ${D} del sistema externo` : void 0
        });
      }
      for (const S of w) {
        const q = e.externalSystems.find(
          (U) => (U.mcpServers ?? []).some((F) => F.id === S.mcpServerId)
        );
        if (!q) continue;
        const D = (H = (q.mcpServers ?? []).find((U) => U.id === S.mcpServerId)) == null ? void 0 : H.name;
        Oe(a, {
          id: q.id,
          label: q.name,
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
        }), me(a, {
          id: `es-agentmcp:${v.id}->${S.mcpServerId}`,
          sourceId: v.id,
          targetId: q.id,
          kind: "es-agent-mcp",
          label: D,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: D ? `Consume las herramientas del servidor MCP ${D}` : void 0
        });
      }
      for (const S of k) {
        const q = (e.rags ?? []).find((D) => D.id === S.ragId);
        if (q) {
          Oe(a, {
            id: q.id,
            label: q.name,
            x: 0,
            y: 0,
            w: oe.readModel.w,
            h: oe.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${q.name} — base de conocimiento (retrieval)`
          }), me(a, {
            id: `es-agrag:${v.id}->${q.id}`,
            sourceId: v.id,
            targetId: q.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const D of q.sourceReadModelIds ?? []) {
            const U = l({ id: D });
            U && me(a, {
              id: `es-ragsrc:${q.id}->${U}`,
              sourceId: U,
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
  const d = (v) => {
    const x = e.externalSystems.find((R) => R.id === v);
    return x ? (Oe(a, {
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
  for (const v of e.externalCalls ?? []) {
    const x = d(v.externalSystemId);
    !x || !r.has(v.useCaseId) || me(a, {
      id: `es-extin:${x}->${v.useCaseId}`,
      sourceId: x,
      targetId: v.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const v of e.externalUseCaseCalls ?? []) {
    if (!r.has(v.sourceId)) continue;
    const x = e.externalSystems.find(
      (w) => (w.useCases ?? []).some((M) => M.id === v.targetId)
    ), R = x ? d(x.id) : null;
    if (!R) continue;
    const k = (te = ((x == null ? void 0 : x.useCases) ?? []).find((w) => w.id === v.targetId)) == null ? void 0 : te.name;
    me(a, {
      id: `es-extout:${v.sourceId}->${v.targetId}`,
      sourceId: v.sourceId,
      targetId: R,
      kind: "es-command-external",
      label: k,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: k ? `Llama a ${k} del sistema externo` : void 0
    });
  }
  for (const v of e.aggregateCalls ?? [])
    !r.has(v.sourceId) || !a.nodes.has(v.targetId) || me(a, {
      id: `es-write:${v.sourceId}->${v.targetId}`,
      sourceId: v.sourceId,
      targetId: v.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const f = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const v of f)
    !a.nodes.has(v.domainEventId) || !(a.nodes.has(v.sourceId) && (r.has(v.sourceId) || c.some((R) => R.id === v.sourceId) || p.has(v.sourceId))) || me(a, {
      id: `es-emit:${v.sourceId}->${v.domainEventId}`,
      sourceId: v.sourceId,
      targetId: v.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const _ = (v, x, R, k, w, M) => (Oe(a, {
    id: v,
    label: x,
    x: 0,
    y: 0,
    w: oe.policy.w,
    h: oe.policy.h,
    kind: R,
    symbol: "flow",
    fill: oe.policy.fill,
    stroke: oe.policy.stroke,
    badge: k,
    tooltip: w
  }), v), E = (v, x) => {
    const R = b(v);
    R && me(a, {
      id: `es-trigger:${R}->${x}`,
      sourceId: R,
      targetId: x,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, A = (v, x) => {
    !x || !r.has(x) || me(a, {
      id: `es-invoke:${v}->${x}`,
      sourceId: v,
      targetId: x,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const v of e.subscriptions ?? []) {
    const x = _(
      v.id,
      v.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${v.name}${v.eventName ? ` — reacciona a ${v.eventName}` : ""}${v.consumerGroup ? ` · grupo ${v.consumerGroup}` : ""}`
    );
    E(v.eventName, x);
    for (const R of v.actions ?? []) {
      if (R.type === "CallUseCase" && A(x, R.useCaseId), R.type === "StartSaga" && R.sagaId) {
        const k = `saga:${R.sagaId}`;
        _(k, R.sagaId, "saga", "SAGA"), me(a, {
          id: `es-saga:${x}->${k}`,
          sourceId: x,
          targetId: k,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (R.type === "UpdateProjection" && R.projectionId) {
        const k = (e.projections ?? []).find((w) => w.id === R.projectionId);
        k && me(a, {
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
  for (const v of e.projections ?? []) {
    const x = _(
      v.id,
      v.name,
      "projection",
      "PROYECCIÓN",
      `${v.name}${v.readModelName ? ` — materializa ${v.readModelName}` : ""}`
    );
    for (const w of v.handledEventIds) {
      const M = a.nodes.has(w) ? w : null;
      M && me(a, {
        id: `es-trigger:${M}->${x}`,
        sourceId: M,
        targetId: x,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    v.sourceAggregateId && a.nodes.has(v.sourceAggregateId) && me(a, {
      id: `es-state:${v.id}`,
      sourceId: v.sourceAggregateId,
      targetId: x,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const R = v.sourceExternalUseCaseId ?? v.sourceExternalTableId;
    if (R) {
      const w = e.externalSystems.find(
        (S) => (S.useCases ?? []).some((q) => q.id === R) || (S.tables ?? []).some((q) => q.id === R)
      ), M = w ? d(w.id) : null;
      if (M) {
        const S = ((T = (w.useCases ?? []).find((q) => q.id === R)) == null ? void 0 : T.name) ?? ((V = (w.tables ?? []).find((q) => q.id === R)) == null ? void 0 : V.name);
        me(a, {
          id: `es-poll:${v.id}`,
          sourceId: M,
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
    const k = l({ id: v.readModelId, name: v.readModelName });
    k && me(a, {
      id: `es-projects:${x}->${k}`,
      sourceId: x,
      targetId: k,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const v of e.flows) {
    if (v.archetype === "MATERIALIZES") {
      const R = b(v.triggerEvent), k = l({ name: v.readModelName ?? `${v.triggerEvent}View` });
      R && k && me(a, {
        id: `es-mat:${v.id}`,
        sourceId: R,
        targetId: k,
        kind: "es-materializes",
        label: v.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${v.name} [MATERIALIZES]`
      });
      continue;
    }
    const x = _(
      `flow:${v.id}`,
      v.name,
      "flow",
      `POLICY · ${v.archetype}`,
      `Flow ${v.name} [${v.archetype}]`
    );
    if (E(v.triggerEvent, x), A(x, v.targetUseCaseId), !v.targetUseCaseId) {
      const R = d(v.targetId), k = R ?? `tgt:${v.targetId}`;
      !R && s.has(v.targetId) && Oe(a, {
        id: k,
        label: s.get(v.targetId) ?? v.targetId,
        x: 0,
        y: 0,
        w: oe.boundedContext.w,
        h: oe.boundedContext.h,
        kind: "boundedContext",
        symbol: "component",
        fill: oe.boundedContext.fill,
        stroke: oe.boundedContext.stroke,
        badge: "CONTEXTO"
      }), a.nodes.has(k) && me(a, {
        id: `es-deliver:${v.id}`,
        sourceId: x,
        targetId: k,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const v of e.processes ?? []) {
    const x = _(
      v.id,
      v.name,
      "process",
      `PROCESO${v.sla ? ` · SLA ${v.sla}` : ""}`,
      `${v.name}${v.triggerEvent ? ` — arranca con ${v.triggerEvent}` : ""}`
    );
    E(v.triggerEvent, x);
    for (const k of v.steps) A(x, k.useCaseId);
    const R = b(v.onCompletionEventName);
    R && me(a, {
      id: `es-done:${v.id}`,
      sourceId: x,
      targetId: R,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const v of e.workflows ?? []) {
    const x = _(
      v.id,
      v.name,
      "workflow",
      "WORKFLOW",
      `${v.name}${v.triggerEvent ? ` — arranca con ${v.triggerEvent}` : ""}`
    );
    E(v.triggerEvent, x);
    for (const k of v.steps ?? []) {
      A(x, k.targetUseCaseId);
      for (const w of [k.emittedEventName, k.completionEventName]) {
        const M = b(w);
        M && me(a, {
          id: `es-wfemit:${v.id}:${M}`,
          sourceId: x,
          targetId: M,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const R = b(v.onCompletionEventName);
    R && me(a, {
      id: `es-done:${v.id}`,
      sourceId: x,
      targetId: R,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const O = [...a.nodes.values()], C = /* @__PURE__ */ new Map();
  for (const v of a.edges)
    C.has(v.targetId) || C.set(v.targetId, []), C.get(v.targetId).push(v.sourceId);
  const N = /* @__PURE__ */ new Map(), G = /* @__PURE__ */ new Set(), j = (v) => {
    const x = N.get(v);
    if (x !== void 0) return x;
    if (G.has(v)) return 0;
    G.add(v);
    const R = C.get(v) ?? [], k = R.length ? 1 + Math.max(...R.map(j)) : 0;
    return G.delete(v), N.set(v, k), k;
  }, de = /* @__PURE__ */ new Map();
  for (const v of O) {
    const x = t[v.id];
    if (x) {
      v.x = x.x, v.y = x.y;
      continue;
    }
    const R = j(v.id), k = de.get(R) ?? 0;
    de.set(R, k + 1), v.x = 140 + R * 260, v.y = 110 + k * 110;
  }
  return { nodes: O, edges: a.edges };
}
const pc = 190, uc = 56, Jn = 180, mc = 56, fc = 150, hc = 44, Zn = 250, ea = 100;
function gc(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (a) => {
    if (i.has(a.id)) return 0;
    i.add(a.id);
    const s = (a.dependsOnStepIds ?? []).map((r) => t.get(r)).filter(Boolean), o = s.length ? 1 + Math.max(...s.map(n)) : 0;
    return i.delete(a.id), o;
  };
  return n(e);
}
function yc(e, t) {
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
function bc(e, t, i = /* @__PURE__ */ new Set(), n = !1) {
  var l;
  const a = [], s = [], o = /* @__PURE__ */ new Set(), r = (d) => {
    var f;
    return (f = e.boundedContexts.flatMap((_) => _.useCases ?? []).find((_) => _.id === d)) == null ? void 0 : f.name;
  };
  let c = 140;
  (e.workflows ?? []).forEach((d) => {
    var de;
    const f = new Map(d.steps.map(($) => [$.id, $])), _ = new Map(d.steps.map(($) => [$.id, gc($, f)])), E = /* @__PURE__ */ new Map();
    for (const $ of d.steps) {
      const H = _.get($.id) ?? 0;
      E.set(H, (E.get(H) ?? 0) + 1);
    }
    const A = Math.max(1, ...E.values()), O = yc(e, d);
    if (O && !o.has(O.id)) {
      o.add(O.id);
      const $ = t[O.id] ?? { x: 140, y: c };
      a.push({
        id: O.id,
        label: O.label,
        x: $.x,
        y: $.y,
        w: fc,
        h: hc,
        kind: O.kind,
        symbol: O.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: O.kind === "aggregate" ? "AGGREGATE" : O.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const C = t[d.id] ?? { x: 420, y: c }, N = n || i.has(d.id);
    a.push({
      id: d.id,
      label: d.name,
      x: C.x,
      y: C.y,
      w: pc,
      h: uc,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      collapsible: d.steps.length > 0,
      collapsed: d.steps.length > 0 && !N,
      tooltip: `${d.name}${d.triggerEvent ? ` — arranca con ${d.triggerEvent}` : ""}${d.onCompletionEventName ? ` · emite ${d.onCompletionEventName} al completar` : ""}`
    }), O && s.push({
      id: `wft:${d.id}`,
      sourceId: O.id,
      targetId: d.id,
      kind: "workflow-trigger",
      label: d.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: d.triggerEvent ? `Evento: ${d.triggerEvent}` : void 0
    });
    const G = /* @__PURE__ */ new Map();
    let j = 0;
    for (const $ of N ? d.steps : []) {
      const H = _.get($.id) ?? 0;
      j = Math.max(j, H);
      const te = G.get(H) ?? 0;
      G.set(H, te + 1);
      const T = t[$.id] ?? {
        x: C.x + (H + 1) * Zn,
        y: c + (te - (E.get(H) - 1) / 2) * ea
      }, V = r($.targetUseCaseId);
      a.push({
        ownerId: d.id,
        id: $.id,
        label: $.name,
        x: T.x,
        y: T.y,
        w: $.type === "JOIN" || $.type === "SPLIT" ? 100 : Jn,
        h: $.type === "JOIN" || $.type === "SPLIT" ? 48 : mc,
        kind: "workflow-step",
        symbol: $.type === "JOIN" || $.type === "SPLIT" ? "flow" : $.roleId ? "actor" : "event",
        fill: $.type === "JOIN" || $.type === "SPLIT" ? "#f5f3ff" : $.roleId ? "#fef9c3" : "#ffffff",
        stroke: $.roleId && $.type !== "JOIN" && $.type !== "SPLIT" ? "#ca8a04" : "#6d28d9",
        dashed: $.type === "JOIN" || $.type === "SPLIT",
        badge: $.type === "JOIN" ? "⨝ JOIN" : $.type === "SPLIT" ? "⑃ SPLIT" : $.roleId ? `👤 ${$.roleId}${$.formPageId ? " · 📋" : ""}${$.deadline ? ` · ${$.deadline}` : ""}` : V ? `→ ${V}` : "∅ sin use case",
        tooltip: $.type === "JOIN" ? `${$.name} — espera a TODAS sus dependencias antes de seguir` : $.type === "SPLIT" ? `${$.name} — abre ramas paralelas: los pasos que dependan de él arrancan a la vez` : `${$.name}${$.roleId ? ` · tarea HUMANA de ${$.roleId}${$.deadline ? ` (plazo ${$.deadline})` : ""}` : ""}${$.emittedEventName ? ` · emite ${$.emittedEventName}` : ""}${V ? ` · lanza ${V}` : ""}${$.completionEventName ? ` · espera ${$.completionEventName}` : ""}${$.compensationUseCaseId ? " · ⎌ compensable" : ""}`
      });
      const v = ($.dependsOnStepIds ?? []).filter((x) => f.has(x));
      v.length === 0 && s.push({
        id: `wfs:${d.id}:${$.id}`,
        sourceId: d.id,
        targetId: $.id,
        kind: "workflow-start",
        label: $.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const x of v)
        s.push({
          id: `wfdep:${x}->${$.id}`,
          sourceId: x,
          targetId: $.id,
          kind: "workflow-dependency",
          label: $.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${$.name} espera a ${((de = f.get(x)) == null ? void 0 : de.name) ?? x}`
        });
    }
    if (d.onCompletionEventName) {
      const $ = `done:${d.id}`, H = t[$] ?? { x: C.x + (j + 2) * Zn, y: c };
      a.push({
        id: $,
        label: d.onCompletionEventName,
        x: H.x,
        y: H.y,
        w: Jn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const te = new Set(d.steps.flatMap((V) => V.dependsOnStepIds ?? [])), T = d.steps.filter((V) => !te.has(V.id));
      for (const V of T.length ? T : [])
        s.push({
          id: `wfd:${d.id}:${V.id}`,
          sourceId: V.id,
          targetId: $,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      d.steps.length || s.push({
        id: `wfd:${d.id}`,
        sourceId: d.id,
        targetId: $,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    c += Math.max(2, A + 1) * ea + 60;
  });
  const p = new Set(a.map((d) => d.id));
  (e.workflowGateways ?? []).forEach((d, f) => {
    const _ = t[d.id] ?? { x: 200 + f % 5 * 220, y: 60 };
    a.push({
      id: d.id,
      label: d.name,
      x: _.x,
      y: _.y,
      w: 100,
      h: 48,
      kind: "workflow-gateway",
      symbol: "flow",
      fill: "#f5f3ff",
      stroke: "#6d28d9",
      dashed: !0,
      badge: d.type === "SPLIT" ? d.semantics === "EXCLUSIVE" ? "⑃ EXCLUSIVO" : "⑃ PARALELO" : d.semantics === "ANY" ? "⨝ CUALQUIERA" : "⨝ TODAS",
      tooltip: d.type === "SPLIT" ? `${d.name} — split ${d.semantics === "EXCLUSIVE" ? "exclusivo: elige UNA rama" : "paralelo: abre TODAS las ramas"}; doble click cambia la semántica` : `${d.name} — join que ${d.semantics === "ANY" ? "arranca con CUALQUIER entrada" : "espera a TODAS sus entradas"}; doble click cambia la semántica`
    }), p.add(d.id);
  });
  for (const d of e.workflowGateways ?? []) {
    for (const _ of d.sourceIds ?? [])
      p.has(_) && s.push({
        id: `wflink:${_}->${d.id}`,
        sourceId: _,
        targetId: d.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const f = d.type === "SPLIT" && d.semantics === "EXCLUSIVE";
    for (const _ of d.targetIds ?? []) {
      if (!p.has(_)) continue;
      const E = f ? (l = (d.branchConditions ?? []).find((A) => A.targetId === _)) == null ? void 0 : l.expression : void 0;
      s.push({
        id: `wflink:${d.id}->${_}`,
        sourceId: d.id,
        targetId: _,
        kind: "wf-link",
        color: "#6d28d9",
        dashed: f && !E,
        arrow: !0,
        label: E ?? (f ? "¿condición?" : void 0),
        tooltip: f ? `${E ? `Rama si: ${E}` : "Rama sin condición aún"} — doble click la edita; Supr desconecta` : "el gateway fluye aquí — Supr lo desconecta"
      });
    }
  }
  (e.workflows ?? []).flatMap((f) => (f.steps ?? []).filter((_) => _.roleId && p.has(_.id))).forEach((f, _) => {
    const E = (e.actors ?? []).find((O) => O.id === f.roleId), A = f.roleId;
    if (!p.has(A)) {
      const O = a.find((N) => N.id === f.id), C = t[A] ?? {
        x: O ? O.x - 90 : 120 + _ * 200,
        y: O ? O.y - 120 : 40
      };
      a.push({
        id: A,
        label: (E == null ? void 0 : E.name) ?? A,
        x: C.x,
        y: C.y,
        w: 130,
        h: 44,
        kind: "actor",
        symbol: "person",
        fill: "#fef9c3",
        stroke: "#ca8a04",
        badge: "ROL",
        tooltip: `${(E == null ? void 0 : E.name) ?? A} — su lista de tareas recibe los pasos humanos conectados`
      }), p.add(A);
    }
    s.push({
      id: `wfrole:${f.id}->${A}`,
      sourceId: A,
      targetId: f.id,
      kind: "wf-role",
      color: "#ca8a04",
      dashed: !0,
      arrow: !0,
      tooltip: "la tarea cae en la lista de este rol — Supr la vuelve automática"
    });
  }), (e.workflows ?? []).flatMap((f) => (f.steps ?? []).filter((_) => _.formPageId && p.has(_.id))).forEach((f, _) => {
    const E = (e.pages ?? []).find((A) => A.id === f.formPageId);
    if (E) {
      if (!p.has(E.id)) {
        const A = a.find((C) => C.id === f.id), O = t[E.id] ?? {
          x: A ? A.x : 200 + _ * 220,
          y: A ? A.y + 130 : 60
        };
        a.push({
          id: E.id,
          label: E.name,
          x: O.x,
          y: O.y,
          w: 160,
          h: 48,
          kind: "page",
          symbol: "page",
          fill: "#fff7ed",
          stroke: "#ca8a04",
          badge: "📋 FORMULARIO",
          tooltip: `${E.name} — el forms engine la presenta como formulario de la tarea`
        }), p.add(E.id);
      }
      s.push({
        id: `wfform:${f.id}->${E.id}`,
        sourceId: f.id,
        targetId: E.id,
        kind: "wf-form",
        color: "#ca8a04",
        dashed: !0,
        arrow: !0,
        tooltip: "la tarea humana se presenta con esta página — Supr lo desconecta"
      });
    }
  });
  for (const d of e.workflows ?? [])
    for (const f of d.steps ?? [])
      !f.handoffWorkflowId || !p.has(f.handoffWorkflowId) || !p.has(f.id) || s.push({
        id: `wflink:${f.id}->${f.handoffWorkflowId}`,
        sourceId: f.id,
        targetId: f.handoffWorkflowId,
        kind: "wf-link",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "el paso entrega a OTRO workflow — Supr lo desconecta"
      });
  const h = /* @__PURE__ */ new Map();
  for (const d of e.workflows ?? [])
    for (const f of d.steps) h.set(f.id, d.id);
  const m = new Set(a.map((d) => d.id)), g = (d) => {
    if (m.has(d)) return d;
    const f = h.get(d);
    return f && m.has(f) ? f : null;
  }, y = /* @__PURE__ */ new Set(), b = [];
  for (const d of s) {
    const f = g(d.sourceId), _ = g(d.targetId);
    if (!f || !_ || f === _) continue;
    if (f === d.sourceId && _ === d.targetId) {
      b.push(d);
      continue;
    }
    const E = `${d.kind}|${f}|${_}`;
    y.has(E) || (y.add(E), b.push({
      ...d,
      sourceId: f,
      targetId: _,
      tooltip: `${d.tooltip ?? d.kind} — de un paso plegado dentro`
    }));
  }
  return { nodes: a, edges: b };
}
const ta = 250, Le = 30, gt = 6, vc = 16, qt = 190, Ic = 60, xc = 170, pi = 44;
function wc(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function Ce(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function kc(e) {
  const t = [], i = (n, a, s) => {
    for (const o of n ?? []) {
      const r = [...a, o.label];
      t.push({ entry: o, path: r, depth: s }), i(o.children ?? [], r, s + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function $c(e, t, i = /* @__PURE__ */ new Set(), n = !1) {
  var N, G, j, de;
  const a = [], s = [], o = e.uiApps ?? [], r = e.pages ?? [], c = ($) => {
    var H;
    return ((H = e.boundedContexts.flatMap((te) => te.useCases ?? []).find((te) => te.id === $)) == null ? void 0 : H.name) ?? $;
  }, p = ($) => {
    var H;
    return ((H = e.boundedContexts.flatMap((te) => te.queryServices ?? []).find((te) => te.id === $)) == null ? void 0 : H.name) ?? $;
  }, h = /* @__PURE__ */ new Map();
  let m = 160;
  for (const $ of o) {
    const H = kc($), te = n || i.has($.id), T = 90, V = te ? H.length * (Le + gt) : 0, v = t[$.id] ?? { x: 190, y: m + T / 2 };
    m = v.y + T / 2 + V + 70;
    const x = $.type ?? "APP";
    a.push({
      id: $.id,
      label: $.title || $.name,
      x: v.x,
      y: v.y,
      w: ta,
      h: T,
      kind: "ui-app",
      symbol: x === "ORCHESTRATOR" || x === "VIEW_EDITOR" ? "process" : "component",
      fill: x === "ORCHESTRATOR" || x === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: x === "ORCHESTRATOR" || x === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      collapsible: H.length > 0,
      collapsed: H.length > 0 && !te,
      badge: x === "ORCHESTRATOR" ? "ORQUESTADOR" : x === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : x === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: x === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : x === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : x === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: x === "ORCHESTRATOR" ? `${$.name} — orquesta y mantiene estado; solo enseña páginas hijas` : x === "MASTER_DETAIL" ? `${$.name} — cabecera + pestañas (ambas son páginas)` : `App: ${$.name}`
    }), $.modelId && (h.set($.modelId, {
      label: ((N = (e.models ?? []).find((w) => w.id === $.modelId)) == null ? void 0 : N.name) ?? $.modelId,
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
    for (const [w, M, S, q, D] of [
      [$.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [$.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      w && s.push({
        id: `${M === "app-view" ? "appview" : "appedit"}:${$.id}->${w}`,
        sourceId: $.id,
        targetId: w,
        kind: M,
        color: q,
        label: S,
        arrow: !0,
        tooltip: D
      });
    const R = $.homePageId ?? $.homeAppId;
    R && s.push({
      id: `apphome:${$.id}->${R}`,
      sourceId: $.id,
      targetId: R,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      markerStart: "ball",
      markerEnd: "arrow",
      tooltip: $.homeAppId ? "la app con la que abre (assignment)" : "la página con la que abre la app (assignment)"
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
    let k = v.y + T / 2 + 10 + Le / 2;
    for (const { entry: w, path: M, depth: S } of te ? H : []) {
      const q = wc($.id, w, M), D = S * vc;
      if (a.push({
        id: q,
        label: w.label,
        x: v.x + D / 2,
        y: k,
        w: ta - 20 - D,
        h: Le,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (G = w.children) != null && G.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (j = w.children) != null && j.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        ownerId: $.id,
        tooltip: (de = w.children) != null && de.length ? "Agrupador (con submenú): no puede abrir nada" : w.pageId ? `Abre ${w.pageId}` : w.uiAdapterId ? `Abre la app ${w.uiAdapterId}` : w.useCaseId ? `Lanza ${w.useCaseId}` : w.aggregateId ? `CRUD inferido sobre ${w.aggregateId}` : w.queryOperationId ? `Listado con filtros de ${w.queryOperationId}` : "Entrada de menú sin destino"
      }), k += Le + gt, w.uiAdapterId && o.some((U) => U.id === w.uiAdapterId) && s.push({
        id: `menuapp:${q}->${w.uiAdapterId}`,
        sourceId: q,
        targetId: w.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), w.useCaseId && e.boundedContexts.some((F) => (F.useCases ?? []).some((K) => K.id === w.useCaseId)) && (h.set(w.useCaseId, {
        label: c(w.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${q}->${w.useCaseId}`,
        sourceId: q,
        targetId: w.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), w.aggregateId && (e.aggregates ?? []).some((U) => U.id === w.aggregateId)) {
        const U = (e.aggregates ?? []).find((F) => F.id === w.aggregateId);
        h.set(U.id, { label: U.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${q}->${U.id}`,
          sourceId: q,
          targetId: U.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (w.queryOperationId) {
        const U = e.boundedContexts.flatMap((K) => K.queryServices ?? []).find((K) => K.id === w.queryServiceId), F = ((U == null ? void 0 : U.operations) ?? []).find((K) => K.id === w.queryOperationId);
        U && F && (h.set(F.id, {
          label: `${F.name} (${U.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${q}->${F.id}`,
          sourceId: q,
          targetId: F.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      w.pageId && r.some((U) => U.id === w.pageId) && s.push({
        id: `menupage:${q}->${w.pageId}`,
        sourceId: q,
        targetId: w.pageId,
        kind: "menu-page",
        color: "#64748b",
        markerStart: "ball",
        markerEnd: "arrow",
        tooltip: "la página que abre la opción (assignment)"
      });
    }
  }
  let g = 160;
  const y = ($) => {
    var H;
    return ((H = r.find((te) => te.id === $)) == null ? void 0 : H.name) ?? $;
  };
  for (const $ of r) {
    const H = t[$.id] ?? { x: 640, y: g }, te = $.type === "WIZARD" ? $.wizardSteps ?? [] : [], T = n || i.has($.id), V = Ic, v = T ? te.length * (Le + gt) : 0;
    g = H.y + V + v + 90, a.push({
      id: $.id,
      label: $.name,
      x: H.x,
      y: H.y,
      w: qt,
      h: V,
      kind: "page",
      symbol: "interface",
      badge: $.customCodeId ? "CODE" : $.type ?? "PAGE",
      collapsible: te.length > 0,
      collapsed: te.length > 0 && !T,
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
    let x = H.y + V / 2 + 10 + Le / 2;
    (T ? te : []).forEach((R, k) => {
      const w = R.id ?? R.pageId ?? String(k);
      a.push({
        id: `wizrow:${$.id}:${w}`,
        label: `${k + 1}. ${R.label ?? (R.pageId ? y(R.pageId) : "Paso")}${R.pageId ? "" : " ⌁"}`,
        x: H.x,
        y: x,
        w: qt - 20,
        h: Le,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: R.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        ownerId: $.id,
        tooltip: R.pageId ? `Paso ${k + 1}: ${y(R.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${k + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), x += Le + gt;
    });
    for (const [R, k, w, M] of [
      [$.crudDetailPageId ?? $.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [$.crudCreatePageId ?? $.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      R && s.push({
        id: `${k === "crud-detail" ? "cruddetail" : "crudnew"}:${$.id}->${R}`,
        sourceId: $.id,
        targetId: R,
        kind: k,
        color: M,
        label: w,
        dashed: !0,
        arrow: !0,
        tooltip: k === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let R = 0; R < ($.wizardSteps ?? []).length; R++) {
      const k = ($.wizardSteps ?? [])[R];
      if (!k.pageId) continue;
      const w = k.id ?? k.pageId;
      s.push({
        id: `wizstep:${$.id}:${w}`,
        sourceId: `wizrow:${$.id}:${w}`,
        targetId: k.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${R + 1} — Supr desmapea`
      });
    }
    $.modelId && (h.set($.modelId, {
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
    for (const R of $.buttons ?? [])
      R.useCaseId && (h.set(R.useCaseId, {
        label: c(R.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `pgbtn:${$.id}->${R.useCaseId}`,
        sourceId: $.id,
        targetId: R.useCaseId,
        kind: "page-button",
        label: R.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: R.mappingId ? `Botón «${R.label}» — mapping ${R.mappingId}` : `Botón «${R.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    $.listingQueryServiceId && (h.set($.listingQueryServiceId, {
      label: p($.listingQueryServiceId),
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
  const b = e.buttonGroups ?? [], l = ($) => {
    var H;
    return ((H = b.find((te) => te.id === $)) == null ? void 0 : H.name) ?? $;
  };
  let d = 520;
  for (const $ of b) {
    const H = $.buttons ?? [], te = $.groupIds ?? [], T = H.length + te.length, V = n || i.has($.id), v = t[$.id] ?? { x: 1e3, y: d }, x = 70, R = V ? T * (Le + gt) : 0;
    d = v.y + x + R + 80, a.push({
      id: $.id,
      label: $.name,
      x: v.x,
      y: v.y,
      w: qt,
      h: x,
      kind: "button-group",
      symbol: "usecase",
      badge: "BOTONES",
      collapsible: T > 0,
      collapsed: T > 0 && !V,
      fill: "#ffffff",
      stroke: "#0e7490",
      extraHandles: [
        { kind: "toolbar", title: "Toolbar: arrastra hasta una página para engancharlo arriba", color: "#0284c7" },
        { kind: "bottom", title: "Botonera: arrastra hasta una página para engancharlo abajo", color: "#7c3aed" }
      ],
      tooltip: `${$.name} — grupo de botones: la paleta añade botones dentro; sus asas lo enganchan al toolbar o la botonera de una página`
    });
    let k = v.y + x / 2 + 10 + Le / 2;
    for (const w of V ? H : [])
      a.push({
        id: `gbtn:${$.id}:${w.id}`,
        label: w.label ?? w.id,
        x: v.x,
        y: k,
        w: qt - 20,
        h: Le,
        kind: "group-button",
        symbol: "usecase",
        fill: w.useCaseId || w.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !w.useCaseId && !w.apiOperationId,
        ownerId: $.id,
        tooltip: `${w.label ?? w.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), k += Le + gt;
    for (const w of V ? te : [])
      a.push({
        id: `gsub:${$.id}:${w}`,
        label: `▸ ${l(w)}`,
        x: v.x,
        y: k,
        w: qt - 20,
        h: Le,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        ownerId: $.id,
        tooltip: `Subgrupo ${l(w)} — Supr lo desanida (el grupo sigue existiendo)`
      }), k += Le + gt;
  }
  for (const $ of b)
    for (const H of $.buttons ?? [])
      !H.useCaseId || !e.boundedContexts.some((T) => (T.useCases ?? []).some((V) => V.id === H.useCaseId)) || (h.set(H.useCaseId, {
        label: c(H.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `gbtnt:${$.id}:${H.id}`,
        sourceId: `gbtn:${$.id}:${H.id}`,
        targetId: H.useCaseId,
        kind: "gbtn-target",
        color: "#06b6d4",
        arrow: !0,
        tooltip: `«${H.label ?? H.id}» dispara este caso de uso — Supr lo desconecta`
      }));
  for (const $ of r) {
    const H = [
      ["toolbar", $.toolbarGroupIds ?? []],
      ["botonera", $.bottomBarGroupIds ?? []]
    ];
    for (const [te, T] of H)
      for (const V of T)
        b.some((v) => v.id === V) && s.push({
          id: `bargrp:${$.id}:${te}:${V}`,
          sourceId: V,
          targetId: $.id,
          kind: "bar-group",
          color: te === "toolbar" ? "#0284c7" : "#7c3aed",
          label: te,
          dashed: !0,
          arrow: !0,
          tooltip: `Grupo enganchado a la ${te} de ${$.name} — Supr lo desengancha`
        });
  }
  let f = 160;
  for (const $ of e.models ?? [])
    h.has($.id) || h.set($.id, { label: $.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [$, H] of h) {
    const te = t[$] ?? { x: 1050, y: f };
    f = te.y + pi + 46, a.push({
      id: $,
      label: H.label,
      x: te.x,
      y: te.y,
      w: xc,
      h: pi,
      kind: H.kind,
      symbol: H.symbol,
      fill: "#ffffff",
      stroke: H.stroke
    });
  }
  let _ = 120;
  for (const $ of e.identityProviders ?? []) {
    const H = t[$.id] ?? { x: -320, y: _ };
    _ = H.y + 70 + 40, a.push({
      id: $.id,
      label: $.name,
      x: H.x,
      y: H.y,
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
  for (const $ of o)
    $.identityProviderId && (e.identityProviders ?? []).some((H) => H.id === $.identityProviderId) && s.push({
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
  const E = (e.actorAppUses ?? []).filter(
    ($) => o.some((H) => H.id === $.appId) && (e.actors ?? []).some((H) => H.id === $.actorId)
  ), A = [...new Set(E.map(($) => $.actorId))];
  let O = 160;
  for (const $ of A) {
    const H = (e.actors ?? []).find((T) => T.id === $), te = t[$] ?? { x: -60, y: O };
    O = te.y + pi + 46, a.push({
      id: $,
      label: H.name,
      x: te.x,
      y: te.y,
      w: 150,
      h: pi,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const $ of E)
    s.push({
      id: `actorapp:${$.actorId}->${$.appId}`,
      sourceId: $.actorId,
      targetId: $.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  (e.customCodes ?? []).forEach(($, H) => {
    const te = t[$.id] ?? { x: 1200, y: 120 + H * 90 };
    a.push({
      id: $.id,
      label: $.name,
      x: te.x,
      y: te.y,
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
  const C = new Set(a.map(($) => $.id));
  for (const $ of r)
    $.customCodeId && C.has($.customCodeId) && s.push({
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
    for (const H of $.usedElementIds ?? [])
      C.has(H) && s.push({
        id: `ccuse:${$.id}->${H}`,
        sourceId: $.id,
        targetId: H,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${$.name} usa este elemento — Supr lo desconecta`
      });
  return (e.uis ?? []).forEach(($, H) => {
    const te = t[$.id] ?? { x: 120 + H * 220, y: 40 };
    a.push({
      id: $.id,
      label: $.name,
      x: te.x,
      y: te.y,
      w: 150,
      h: 44,
      kind: "ui",
      symbol: "interface",
      fill: "#f0f9ff",
      stroke: "#0ea5e9",
      badge: "UI",
      tooltip: `${$.name} — interfaz declarada: traza una línea hasta la app o la página asignada`
    });
    for (const T of [...$.appIds ?? [], ...$.pageIds ?? []])
      a.some((V) => V.id === T) && s.push({
        id: `uiasg:${$.id}->${T}`,
        sourceId: T,
        targetId: $.id,
        kind: "ui-assignment",
        color: "#0ea5e9",
        markerStart: "ball",
        markerEnd: "arrow",
        tooltip: "asignada a la UI (assignment) — Supr la desconecta"
      });
    for (const T of $.actorIds ?? [])
      a.some((V) => V.id === T) && s.push({
        id: `uisrv:${$.id}->${T}`,
        sourceId: $.id,
        targetId: T,
        kind: "ui-serving",
        color: "#0ea5e9",
        markerEnd: "open-arrow",
        tooltip: "la UI sirve a este actor (serving) — Supr la desconecta"
      });
  }), { nodes: a, edges: s };
}
const ia = 188, na = 34, aa = 10, ui = 24, oa = 6;
function mi(e, t) {
  return `fld:${e}:${t}`;
}
function rn(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function _c(e, t) {
  const i = [], n = [], a = e.models ?? [], s = e.modelMappings ?? [], o = (g) => {
    var y;
    return ((y = a.find((b) => b.id === g)) == null ? void 0 : y.name) ?? g ?? "?";
  };
  a.forEach((g, y) => {
    const b = t[g.id] ?? { x: 200 + y % 5 * 260, y: 160 + Math.floor(y / 5) * 220 }, l = g.fields ?? [], d = na + (l.length ? l.length * ui + (l.length - 1) * oa : 10) + aa;
    i.push({
      id: g.id,
      label: g.name,
      x: b.x,
      y: b.y,
      w: ia,
      h: d,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${g.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), l.forEach((f, _) => {
      i.push({
        id: mi(g.id, f.id),
        label: f.name,
        x: b.x,
        y: b.y - d / 2 + na + _ * (ui + oa) + ui / 2,
        w: ia - 2 * aa,
        h: ui,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: f.type ?? void 0,
        parentId: g.id,
        tooltip: `${f.name}${f.type ? ` (${f.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((g, y) => {
    const b = t[g.id] ?? { x: 200 + y % 5 * 260, y: 60 };
    i.push({
      id: g.id,
      label: g.name,
      x: b.x,
      y: b.y,
      w: 150,
      h: 44,
      kind: "transformation",
      symbol: "gear",
      fill: "#fff7ed",
      stroke: "#ea580c",
      badge: "TRANSFORM",
      dashed: !g.output,
      tooltip: `${g.name} — transformación: arrastra modelos o campos hasta ella (entradas) y su asa hasta un modelo o campo (salida)${g.output ? "" : " · aún sin salida"}`
    });
  }), (e.customCodes ?? []).forEach((g, y) => {
    const b = t[g.id] ?? { x: 120 + y % 5 * 220, y: 60 };
    i.push({
      id: g.id,
      label: g.name,
      x: b.x,
      y: b.y,
      w: 150,
      h: 44,
      kind: "custom-code",
      symbol: "gear",
      fill: "#f8fafc",
      stroke: "#0f172a",
      badge: "CODE",
      dashed: !0,
      tooltip: `${g.name} — código a mano: arrastra su asa hasta una transformación, o hasta un modelo mapeado, para delegar en él`
    });
  });
  const r = new Set(i.map((g) => g.id)), c = (g) => g.fieldId ? mi(g.modelId, g.fieldId) : g.modelId;
  for (const g of e.transformations ?? [])
    g.customCodeId && r.has(g.customCodeId) && r.has(g.id) && n.push({
      id: `cctf:${g.id}`,
      sourceId: g.customCodeId,
      targetId: g.id,
      kind: "custom-of-transformation",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      tooltip: `${g.name} delega en código a mano — Supr lo desconecta`
    });
  for (const g of s)
    g.customCodeId && r.has(g.customCodeId) && g.targetModelId && r.has(g.targetModelId) && n.push({
      id: `ccmap:${g.id}`,
      sourceId: g.customCodeId,
      targetId: g.targetModelId,
      kind: "custom-of-mapping",
      color: "#0f172a",
      dashed: !0,
      arrow: !0,
      label: g.name,
      tooltip: `El mapeado ${g.name} delega en código a mano — Supr lo desconecta`
    });
  for (const g of e.transformations ?? []) {
    for (const y of g.inputs ?? []) {
      const b = c(y);
      r.has(b) && n.push({
        id: `tfin:${g.id}:${y.modelId}:${y.fieldId ?? ""}`,
        sourceId: b,
        targetId: g.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${g.name} — Supr la desconecta`
      });
    }
    g.output && r.has(c(g.output)) && n.push({
      id: `tfout:${g.id}`,
      sourceId: g.id,
      targetId: c(g.output),
      kind: "transform-output",
      color: "#ea580c",
      arrow: !0,
      tooltip: `salida de ${g.name} — Supr la desconecta`
    });
  }
  for (const g of s)
    if (!(!g.sourceModelId || !g.targetModelId) && !(!r.has(g.sourceModelId) || !r.has(g.targetModelId))) {
      n.push({
        id: `mapping:${g.id}`,
        sourceId: g.sourceModelId,
        targetId: g.targetModelId,
        kind: "model-mapping",
        color: "#7c3aed",
        label: g.name,
        arrow: !0,
        tooltip: `${g.name} — las reglas campo a campo son las líneas finas entre campos; Supr lo elimina`
      });
      for (const y of g.rules ?? []) {
        const b = mi(g.sourceModelId, y.sourceFieldId ?? ""), l = mi(g.targetModelId, y.targetFieldId ?? "");
        !r.has(b) || !r.has(l) || n.push({
          id: `maprule:${g.id}:${y.id}`,
          sourceId: b,
          targetId: l,
          kind: "mapping-rule",
          color: "#a78bfa",
          dashed: !0,
          arrow: !0,
          tooltip: `Regla de ${g.name} — Supr la elimina`
        });
      }
    }
  const p = new Set(
    s.filter((g) => g.sourceModelId && g.targetModelId).map((g) => `${g.sourceModelId}->${g.targetModelId}`)
  ), h = new Map(
    e.boundedContexts.flatMap((g) => (g.useCases ?? []).map((y) => [y.id, y]))
  ), m = /* @__PURE__ */ new Set();
  for (const g of e.pages ?? [])
    if (g.modelId)
      for (const y of g.buttons ?? []) {
        if (!y.useCaseId || y.mappingId) continue;
        const b = h.get(y.useCaseId);
        if (!(b != null && b.inputModelId) || b.inputModelId === g.modelId) continue;
        const l = `${g.modelId}->${b.inputModelId}`;
        p.has(l) || m.has(l) || (m.add(l), !(!r.has(g.modelId) || !r.has(b.inputModelId)) && n.push({
          id: `mapgap:${g.id}:${y.useCaseId}`,
          sourceId: g.modelId,
          targetId: b.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${y.label}» (página ${g.name}) llama a ${b.name}: falta mapear ${o(g.modelId)} → ${o(b.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: n };
}
const Yi = 560, fi = 34, hi = 14, Ki = 150, gi = 40, yi = 12, bi = 150, st = 40, Cc = (e) => e.startsWith("SOURCE") ? 0 : e === "TRANSFORM" ? 1 : 2, Ec = {
  0: { fill: "#f0f9ff", stroke: "#0284c7", symbol: "lens" },
  1: { fill: "#f0fdfa", stroke: "#0f766e", symbol: "gear" },
  2: { fill: "#f5f3ff", stroke: "#7c3aed", symbol: "event" }
};
function Sc(e, t) {
  const i = [], n = [], a = e.etlFlows ?? [], s = new Map(e.boundedContexts.map((l) => [l.id, l.name])), o = new Map(
    e.boundedContexts.flatMap((l) => [
      ...(l.domainEvents ?? []).map((d) => [d.id, d.name]),
      ...(l.applicationEvents ?? []).map((d) => [d.id, d.name])
    ])
  );
  let r = 140;
  for (const l of a) {
    const d = l.steps ?? [], f = [[], [], []];
    d.forEach((O) => f[Cc(O.type)].push(O));
    const _ = Math.max(1, ...f.map((O) => O.length)), E = fi + hi + _ * (gi + yi), A = t[l.id] ?? { x: 420, y: r };
    r = A.y + E + 110, i.push({
      id: l.id,
      label: l.name,
      x: A.x,
      y: A.y,
      w: Yi,
      h: E,
      kind: "etl-flow",
      symbol: "gear",
      badge: "ETL",
      container: !0,
      fill: "#ffffff",
      stroke: "#0f766e",
      tooltip: `${l.name} — integrador${l.ownerBoundedContextId ? ` de ${s.get(l.ownerBoundedContextId) ?? l.ownerBoundedContextId}` : ""}: fuentes → transformación → escrituras; la paleta añade transformaciones`
    }), f.forEach((O, C) => {
      const N = A.x - Yi / 2 + hi + Ki / 2 + C * (Yi - 2 * hi - Ki) / 2;
      O.forEach((G, j) => {
        const de = Ec[C];
        if (i.push({
          id: G.id,
          label: G.name ?? G.id,
          x: N,
          y: A.y - E / 2 + fi + gi / 2 + j * (gi + yi),
          w: Ki,
          h: gi,
          kind: "etl-step",
          symbol: de.symbol,
          fill: de.fill,
          stroke: de.stroke,
          badge: G.type === "SOURCE_PULL" ? "PULL" : G.type === "SOURCE_CONSUMER" ? "CONSUME" : G.type === "TRANSFORM" ? "TRANSFORM" : G.type === "WRITE_API" ? "→ API" : G.type === "WRITE_DB" ? "→ BD" : "→ EVENTO",
          parentId: l.id,
          tooltip: `${G.name ?? G.id} (${G.type})${G.mappingId ? " · aplica un mapeado" : ""} — Supr lo quita del integrador`
        }), C > 0) {
          const $ = f[C - 1], H = $[Math.min(j, $.length - 1)];
          H && n.push({
            id: `etlpipe:${l.id}:${H.id}->${G.id}`,
            sourceId: H.id,
            targetId: G.id,
            kind: "etl-pipe",
            color: "#0f766e",
            arrow: !0,
            tooltip: "el dato fluye por el pipeline"
          });
        }
      });
    });
  }
  const c = new Set(i.map((l) => l.id)), p = new Set(a.flatMap((l) => (l.steps ?? []).map((d) => d.externalTableId)).filter(Boolean)), h = new Set(a.flatMap((l) => (l.steps ?? []).map((d) => d.apiId)).filter(Boolean)), m = new Set(a.flatMap((l) => (l.steps ?? []).map((d) => d.eventId)).filter(Boolean));
  let g = 120;
  for (const l of e.externalSystems) {
    const d = (l.tables ?? []).filter((E) => p.has(E.id));
    if (!d.length) continue;
    const f = fi + hi + d.length * (st + yi), _ = t[l.id] ?? { x: -140, y: g };
    g = _.y + f + 90, i.push({
      id: l.id,
      label: l.name,
      x: _.x,
      y: _.y,
      w: bi + 30,
      h: f,
      kind: "external-system",
      symbol: "component",
      badge: "EXTERNAL",
      container: !0,
      fill: "#ffffff",
      stroke: "#64748b",
      dashed: !0,
      tooltip: `${l.name} — sistema externo: sus tablas legacy alimentan (o reciben) integradores`
    }), c.add(l.id), d.forEach((E, A) => {
      i.push({
        id: E.id,
        label: E.name,
        x: _.x,
        y: _.y - f / 2 + fi + st / 2 + A * (st + yi),
        w: bi,
        h: st,
        kind: "external-table",
        symbol: "readmodel",
        fill: "#fefce8",
        stroke: "#a16207",
        parentId: l.id,
        tooltip: `${E.name} — tabla legacy de ${l.name}`
      }), c.add(E.id);
    });
  }
  let y = 120;
  for (const l of e.apis ?? []) {
    if (!h.has(l.id)) continue;
    const d = t[l.id] ?? { x: 1e3, y };
    y = d.y + st + 70, i.push({
      id: l.id,
      label: l.name,
      x: d.x,
      y: d.y,
      w: bi,
      h: st,
      kind: "api",
      symbol: "interface",
      badge: "API",
      fill: "#eef2ff",
      stroke: "#4f46e5",
      tooltip: `${l.name} — API que un integrador consume o llama`
    }), c.add(l.id);
  }
  let b = 400;
  for (const l of m) {
    const d = l, f = t[d] ?? { x: 1e3, y: b };
    b = f.y + st + 70, i.push({
      id: d,
      label: o.get(d) ?? d,
      x: f.x,
      y: f.y,
      w: bi,
      h: st,
      kind: "domain-event",
      symbol: "event",
      badge: "EVENTO",
      fill: "#fff7ed",
      stroke: "#f59e0b",
      tooltip: "evento que un integrador consume o publica"
    }), c.add(d);
  }
  for (const l of a)
    for (const d of l.steps ?? []) {
      const f = d.externalTableId ?? d.apiId ?? d.eventId;
      if (!f || !c.has(f) || !c.has(d.id)) continue;
      const _ = d.type.startsWith("SOURCE");
      n.push({
        id: `etl:${l.id}:${d.id}`,
        sourceId: _ ? f : d.id,
        targetId: _ ? d.id : f,
        kind: _ ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: d.type === "SOURCE_PULL" ? "pull" : d.type === "SOURCE_CONSUMER" ? "consume" : d.type === "WRITE_API" ? "api" : d.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: _ ? `${l.name} lee de aquí — Supr quita el paso` : `${l.name} escribe aquí — Supr quita el paso`
      });
    }
  return { nodes: i, edges: n };
}
async function Ac(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((c) => c.e), n = new i(), s = {
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
  }, o = await n.layout(s), r = {};
  for (const c of o.children ?? [])
    r[c.id] = {
      x: (c.x ?? 0) + (c.width ?? 0) / 2,
      y: (c.y ?? 0) + (c.height ?? 0) / 2
    };
  return r;
}
var Mc = Object.defineProperty, Pc = Object.getOwnPropertyDescriptor, ze = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? Pc(t, i) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (a = (n ? o(t, i, a) : o(a)) || a);
  return n && a && Mc(t, i, a), a;
};
const Tc = /* @__PURE__ */ new Set([
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
      var o, r, c;
      if (e.button !== 0 && e.button !== 1) return;
      e.button === 1 && e.preventDefault(), this.focus();
      try {
        (o = this.setPointerCapture) == null || o.call(this, e.pointerId);
      } catch {
      }
      const t = e.composedPath()[0], i = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, ".chev3");
      if (i != null && i.dataset.nodeId) {
        this.emit("node-collapse-toggled", { id: i.dataset.nodeId });
        return;
      }
      const n = (c = t == null ? void 0 : t.closest) == null ? void 0 : c.call(t, ".h3");
      if (n != null && n.dataset.sourceId) {
        const p = this.getBoundingClientRect();
        this._connect = {
          sourceId: n.dataset.sourceId,
          x1: e.clientX - p.left,
          y1: e.clientY - p.top,
          x2: e.clientX - p.left,
          y2: e.clientY - p.top
        }, this._drag = { mode: "connect", x: e.clientX, y: e.clientY, rx: this._rx, rz: this._rz, pan: { ...this._pan } };
        return;
      }
      const a = e.shiftKey || this._space || e.button === 1, s = a ? null : this.plateAt(e);
      if (!s && !a && !e.altKey) {
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
        mode: s ? "node" : a ? "pan" : "orbit",
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
      var n, a;
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, i = e.clientY - this._drag.y;
      if (this._drag.mode === "connect" && this._connect) {
        const s = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - s.left, y2: e.clientY - s.top };
        const o = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), r = (a = o == null ? void 0 : o.closest) == null ? void 0 : a.call(o, ".n3"), c = (r == null ? void 0 : r.dataset.nodeId) ?? null;
        this._hoverTargetId = c !== this._connect.sourceId ? c : null;
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
            const n = this.getBoundingClientRect(), a = Math.min(i.x1, i.x2) + n.left, s = Math.max(i.x1, i.x2) + n.left, o = Math.min(i.y1, i.y2) + n.top, r = Math.max(i.y1, i.y2) + n.top, c = [];
            this.renderRoot.querySelectorAll(".n3").forEach((p) => {
              const h = p.getBoundingClientRect(), m = h.left + h.width / 2, g = h.top + h.height / 2, y = p.dataset.nodeId;
              y && m >= a && m <= s && g >= o && g <= r && c.push(y);
            }), this._selected = new Set(c);
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
      var n, a, s;
      const t = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY);
      if ((a = t == null ? void 0 : t.closest) != null && a.call(t, ".chev3")) return;
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
    const i = e / this._kUsed, n = t / this._kUsed / Math.cos(this._rx * Math.PI / 180), a = this._rz * Math.PI / 180;
    return {
      x: i * Math.cos(a) + n * Math.sin(a),
      y: -i * Math.sin(a) + n * Math.cos(a)
    };
  }
  /** The plate under a client point, if any (drops arrive as plain mouse coords). */
  nodeIdAtClient(e, t) {
    var n, a, s;
    const i = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e, t);
    return ((s = (a = i == null ? void 0 : i.closest) == null ? void 0 : a.call(i, ".n3")) == null ? void 0 : s.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), n = i.width * 0.5, a = i.height * 0.42, s = new DOMMatrix();
    s.m34 = -1 / 1600;
    const o = new DOMMatrix().translate(n, a).multiply(s).translate(-n, -a).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), r = o.transformPoint(new DOMPoint(0, 0, 0, 1)), c = o.transformPoint(new DOMPoint(1, 0, 0, 0)), p = o.transformPoint(new DOMPoint(0, 1, 0, 0)), h = e - i.left, m = t - i.top, g = c.x - h * c.w, y = p.x - h * p.w, b = c.y - m * c.w, l = p.y - m * p.w, d = h * r.w - r.x, f = m * r.w - r.y, _ = g * l - y * b;
    return _ ? { x: (d * l - y * f) / _, y: (g * f - d * b) / _ } : { ...this._center };
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
    const i = this.scene.edges.find((r) => r.id === e.targetId.slice(11)), n = i ? t.get(i.sourceId) : void 0, a = i ? t.get(i.targetId) : void 0;
    if (!n || !a) return null;
    const s = this.depths(), o = ((s.get(n.id) ?? 0) + (s.get(a.id) ?? 0)) / 2 * 30 + 2;
    return {
      id: "",
      label: "",
      kind: "edge-anchor",
      x: (n.x + a.x) / 2,
      y: (n.y + a.y) / 2,
      w: 0,
      h: 0,
      z: o
    };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((n) => [n.id, n])), t = /* @__PURE__ */ new Map(), i = (n) => {
      const a = t.get(n.id);
      if (a !== void 0) return a;
      const s = n.ownerId ?? n.parentId, o = s ? e.get(s) : void 0, r = o ? i(o) + 1 : 0;
      return t.set(n.id, r), r;
    };
    for (const n of this.scene.nodes) i(n);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return I`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((d) => [d.id, d])), n = Math.min(...e.map((d) => d.x - d.w / 2)) - 60, a = Math.max(...e.map((d) => d.x + d.w / 2)) + 60, s = Math.min(...e.map((d) => d.y - d.h / 2)) - 60, o = Math.max(...e.map((d) => d.y + d.h / 2)) + 60, r = (n + a) / 2, c = (s + o) / 2, p = this.getBoundingClientRect(), h = p.width ? Math.min(p.width / (a - n), p.height / (o - s), 1) * 0.9 : 0.5, m = this._k * h;
    this._kUsed = m, this._center = { x: r, y: c };
    const g = 30, y = this._liveMove, b = (d) => d.x + ((y == null ? void 0 : y.id) === d.id ? y.dx : 0), l = (d) => d.y + ((y == null ? void 0 : y.id) === d.id ? y.dy : 0);
    return I`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${m}, ${m}, ${m}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-r}px, ${-c}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${n}px; top: ${s}px"
            width=${a - n}
            height=${o - s}
            viewBox="${n} ${s} ${a - n} ${o - s}"
          >
            ${this.scene.edges.map((d) => {
      const f = i.get(d.sourceId), _ = i.get(d.targetId) ?? this.edgeAnchorOf(d, i);
      return !f || !_ ? "" : Z`<line
                x1=${b(f)} y1=${l(f)} x2=${b(_)} y2=${l(_)}
                stroke="#000000" stroke-width="2" opacity=${d.dim ? 0.05 : 0.22} />`;
    })}
          </svg>
          ${this.scene.edges.map((d) => {
      const f = i.get(d.sourceId), _ = i.get(d.targetId) ?? this.edgeAnchorOf(d, i);
      if (!f || !_) return "";
      const E = (t.get(f.id) ?? 0) * g + 2, A = _.id ? (t.get(_.id) ?? 0) * g + 2 : _.z, O = b(_) - b(f), C = l(_) - l(f), N = A - E, G = Math.hypot(O, C), j = Math.hypot(G, N), de = Math.atan2(C, O) * 180 / Math.PI, $ = Math.atan2(N, G) * 180 / Math.PI, H = d.color ?? "#64748b", te = d.dashed ? `repeating-linear-gradient(90deg, ${H} 0 6px, transparent 6px 10px)` : H;
      return I`<div
              class="edge3"
              style="
                left: ${b(f)}px; top: ${l(f)}px; width: ${j}px; height: 1.7px;
                transform: translateZ(${E}px) rotateZ(${de}deg) rotateY(${-$}deg);
                background: ${te};
                opacity: ${d.dim ? 0.12 : 0.9};
              "
            ></div>`;
    })}
          ${e.map((d) => {
      if (d.kind === "area")
        return I`<div
                class="area3"
                title=${d.tooltip ?? ""}
                style="left: ${b(d) - d.w / 2}px; top: ${l(d) - d.h / 2}px;
                       width: ${d.w}px; height: ${d.h}px; opacity: ${d.dim ? 0.25 : 1};"
              ></div>`;
      const f = t.get(d.id) ?? 0, _ = d.container || f === 0, E = this._hoverTargetId === d.id;
      return I`
              <div
                class="n3 ${d.container ? "container3" : ""} ${this.selectedId === d.id || this._selected.has(d.id) ? "selected3" : ""} ${E ? "hover3" : ""}"
                data-node-id=${d.id}
                data-kind=${d.kind}
                title=${d.tooltip ?? d.label}
                style="
                  opacity: ${d.dim ? 0.25 : 1};
                  left: ${b(d) - d.w / 2}px; top: ${l(d) - d.h / 2}px;
                  width: ${d.w}px; height: ${d.h}px;
                  transform: translateZ(${f * g + (E ? 8 : 0)}px)${E ? " scale(1.06)" : ""};
                  background: ${d.container ? "color-mix(in srgb, " + (d.fill ?? "#ffffff") + " 82%, transparent)" : d.fill ?? "#ffffff"};
                  border-color: ${d.stroke ?? "#64748b"};
                  border-style: ${d.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${_ ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
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
      if (!d || !Tc.has(d.kind)) return "";
      const f = (t.get(d.id) ?? 0) * g + 4;
      return [
        [b(d) + d.w / 2, l(d)],
        [b(d) - d.w / 2, l(d)],
        [b(d), l(d) + d.h / 2],
        [b(d), l(d) - d.h / 2]
      ].map(
        ([E, A]) => I`<div
                class="h3"
                data-source-id=${d.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${E}px; top: ${A}px; transform: translateZ(${f}px)"
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
      ), f = this.getBoundingClientRect(), _ = d == null ? void 0 : d.getBoundingClientRect(), E = _ ? _.left + _.width / 2 - f.left : f.width / 2, A = _ ? _.bottom - f.top + 6 : f.height / 2;
      return I`<input
              class="rename3"
              style="left: ${E}px; top: ${A}px"
              .value=${this._renaming.value}
              @pointerdown=${(O) => O.stopPropagation()}
              @input=${(O) => this._renaming = { ...this._renaming, value: O.target.value }}
              @keydown=${(O) => {
        if (O.stopPropagation(), O.key === "Escape" && (this._renaming = null), O.key === "Enter") {
          const C = this._renaming, N = C.value.trim();
          this._renaming = null;
          const G = this.scene.nodes.find((j) => j.id === C.id);
          N && G && N !== G.label && this.emit("node-renamed", { id: C.id, kind: C.kind, name: N });
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
Me.styles = pt`
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
  re({ attribute: !1 })
], Me.prototype, "scene", 2);
ze([
  re({ attribute: !1 })
], Me.prototype, "selectedId", 2);
ze([
  re({ attribute: !1 })
], Me.prototype, "connectable", 2);
ze([
  z()
], Me.prototype, "_rx", 2);
ze([
  z()
], Me.prototype, "_rz", 2);
ze([
  z()
], Me.prototype, "_k", 2);
ze([
  z()
], Me.prototype, "_pan", 2);
ze([
  z()
], Me.prototype, "_liveMove", 2);
ze([
  z()
], Me.prototype, "_connect", 2);
ze([
  z()
], Me.prototype, "_hoverTargetId", 2);
ze([
  z()
], Me.prototype, "_selected", 2);
ze([
  z()
], Me.prototype, "_rubber", 2);
ze([
  z()
], Me.prototype, "_renaming", 2);
Me = ze([
  ut("modux-tilt")
], Me);
var Oc = Object.defineProperty, Rc = Object.getOwnPropertyDescriptor, ve = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? Rc(t, i) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (a = (n ? o(t, i, a) : o(a)) || a);
  return n && a && Oc(t, i, a), a;
};
const sa = [
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
    const i = (a) => {
      for (const s of a ?? [])
        s.id === e && (t = s), i(s.children);
    };
    return i((n = this.page) == null ? void 0 : n.content), t;
  }
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var n;
    let t = null;
    const i = (a, s) => {
      for (const o of a ?? [])
        o.id === e && (t = s), i(o.children, o);
    };
    return i((n = this.page) == null ? void 0 : n.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var s;
    let i = !1;
    const n = (o) => {
      o.id === e && (i = !0);
      for (const r of o.children ?? []) n(r);
    }, a = (o) => {
      for (const r of o ?? [])
        r.id === t ? n(r) : a(r.children);
    };
    return a((s = this.page) == null ? void 0 : s.content), i;
  }
  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  nextSiblingOf(e) {
    var a;
    const t = this.parentOf(e), i = t ? t.children ?? [] : ((a = this.page) == null ? void 0 : a.content) ?? [], n = i.findIndex((s) => s.id === e);
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
    var a;
    if (t === "into" && e.kind === "tabLayout") {
      const s = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((s == null ? void 0 : s.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const o = (e.children ?? []).filter((c) => c.kind === "tab"), r = o.find((c) => c.id === this._activeTabs[e.id]) ?? o[0];
      r && (e = r);
    }
    if (t === "into" && !pe.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), n = t === "after" ? ((a = this.nextSiblingOf(e.id)) == null ? void 0 : a.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: n };
  }
  onCmpDrop(e, t, i) {
    var s, o;
    const n = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !n) {
      const r = (s = i == null ? void 0 : i.dataTransfer) == null ? void 0 : s.getData("application/x-modux-cmp");
      if (!r) return;
      let c;
      try {
        c = JSON.parse(r);
      } catch {
        return;
      }
      if (!c.componentId || !c.pageId || c.pageId === ((o = this.page) == null ? void 0 : o.id)) return;
      const p = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: c.pageId, componentId: c.componentId, ...p });
      return;
    }
    if (n === e.id || this.isWithin(e.id, n)) return;
    const a = this.slotFor(e, t);
    a.beforeComponentId !== n && this.emitEvent("component-moved", { componentId: n, ...a });
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
        ${t < 2 ? I`<span style="width:26px;height:1.5px;background:${t < e ? "#0284c7" : "#e2e8f0"}"></span>` : se}`)}
    </div>`;
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var c, p, h;
    const t = e.children ?? [], i = (m) => m.map((g) => this.renderComponent(g)), n = I`<div class="placeholder">suelta componentes aquí</div>`;
    let a;
    switch (e.kind) {
      case "horizontalLayout":
        a = I`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "splitLayout": {
        const m = t.slice(0, Math.ceil(t.length / 2)), g = t.slice(Math.ceil(t.length / 2));
        a = I`<div class="row-lay">
          <div class="col-lay">${m.length ? i(m) : n}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${g.length ? i(g) : n}</div>
        </div>`;
        break;
      }
      case "formLayout":
        a = I`<div class="grid-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        a = I`<div class="grid3-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "tabLayout": {
        const m = t.filter((y) => y.kind === "tab"), g = m.find((y) => y.id === this._activeTabs[e.id]) ?? m[0];
        a = I`
          <div class="tabbar">
            ${m.map(
          (y, b) => I`<span
                class=${y === g ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(l) => {
            l.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: y.id }, this.emitEvent("component-selected", { componentId: y.id });
          }}
                @dblclick=${(l) => {
            l.stopPropagation(), this._cmp = { ...y };
          }}
                @dragstart=${(l) => {
            var d, f;
            l.stopPropagation(), this._dragCmpId = y.id, (f = l.dataTransfer) == null || f.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (d = this.page) == null ? void 0 : d.id, componentId: y.id })
            );
          }}
                @dragover=${(l) => {
            var d;
            ((d = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : d.kind) === "tab" && (l.preventDefault(), l.stopPropagation());
          }}
                @drop=${(l) => {
            var A, O;
            const d = this._dragCmpId;
            if (!d || d === y.id || ((A = this.nodeById(d)) == null ? void 0 : A.kind) !== "tab") return;
            l.preventDefault(), l.stopPropagation();
            const f = l.currentTarget.getBoundingClientRect(), E = l.clientX - f.left < f.width / 2 ? y.id : ((O = m[b + 1]) == null ? void 0 : O.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, E !== d && this.emitEvent("component-moved", {
              componentId: d,
              toParentId: e.id,
              beforeComponentId: E
            });
          }}
                >${y.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${g ? this.renderComponent(g) : n}`;
        break;
      }
      case "tab":
        a = I`<div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "accordionLayout":
        a = I`<div class="col-lay">
          ${t.length ? t.map(
          (m, g) => I`
                  <div class="acc-bar"><span>${m.title ?? m.label ?? "Sección"}</span><span>${g === 0 ? "▾" : "▸"}</span></div>
                  ${g === 0 ? this.renderComponent(m) : se}
                `
        ) : n}
        </div>`;
        break;
      case "card":
        a = I`<div class="card-box">
          ${e.title ? I`<div class="card-title">${e.title}</div>` : se}
          <div class="col-lay">${t.length ? i(t) : n}</div>
        </div>`;
        break;
      case "boardLayout":
        a = I`<div class="grid3-lay">
          ${t.length ? t.map((m) => I`<div class="board-col">${this.renderComponent(m)}</div>`) : n}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [m, ...g] = t;
        a = I`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${m ? this.renderComponent(m) : I`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${g.length ? i(g) : I`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        a = I`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "carouselLayout":
        a = I`<div class="row-lay">${t.length ? i(t) : n}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        a = I`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : n}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const g = e.modelId && e.modelId === ((c = this.page) == null ? void 0 : c.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        a = g.length ? I`<div class="grid-lay">
              ${g.slice(0, 6).map(
          (y) => I`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${y.label ?? y.name}</label>${this.control(y)}</div>`
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
        a = I`<table>
            <tr>${m.length ? m.map((g) => I`<th>${g.label ?? g.name}</th>`) : I`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => I`<tr>${(m.length ? m : [1, 2, 3]).map(() => I`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? se : I`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        a = I`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const m = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        a = I`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(m)}`;
        break;
      }
      case "text":
        a = I`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        a = I`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        a = I`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      // ---- Mateu design-contract containers ----
      case "section":
        a = I`<div class="acc-bar"><span>${e.title ?? "Sección"}</span></div>
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "zones":
        a = I`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "toolbar":
        a = I`<div class="row-lay" style="align-items:center">
          ${t.length ? i(t) : I`<span class="btn" style="display:inline-block;flex:none">Acción</span>${n}`}
        </div>`;
        break;
      case "pageHeader":
        a = I`<div class="row-lay" style="align-items:center">
          <div style="flex:2;font-size:15px;font-weight:800;color:#0f172a">${e.title ?? "Título de la página"}</div>
          ${t.length ? i(t) : se}
        </div>`;
        break;
      case "hero":
        a = I`<div style="background:#0f172a;color:#f8fafc;border-radius:10px;padding:22px 18px;text-align:center">
            <div style="font-size:17px;font-weight:800">${e.title ?? "Un titular que vende"}</div>
            <div style="font-size:11px;color:#cbd5e1;margin-top:4px">${e.text ?? "El subtítulo que lo explica"}</div>
          </div>
          ${t.length ? I`<div class="col-lay" style="margin-top:6px">${i(t)}</div>` : se}`;
        break;
      case "scoreboard":
        a = I`<div class="grid3-lay">${t.length ? i(t) : I`
          <div class="card-box metric"><div class="num">12</div><div class="cap">KPI</div></div>
          <div class="card-box metric"><div class="num">3,4</div><div class="cap">KPI</div></div>
          <div class="card-box metric"><div class="num">56%</div><div class="cap">KPI</div></div>`}</div>`;
        break;
      case "wizard":
        a = I`${this.stepsStub(0)}
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "app":
        a = I`<div class="appbar">⛭ ${e.title ?? "app"}</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : n}</div>`;
        break;
      // ---- Mateu design-contract leaves ----
      case "crud":
        a = I`<div class="row-lay" style="align-items:center;margin-bottom:6px">
            <div class="control" style="flex:1">Buscar…</div>
            <span class="btn" style="display:inline-block;flex:none">Nuevo</span>
          </div>
          <table>
            <tr><th>col 1</th><th>col 2</th><th>col 3</th></tr>
            ${[1, 2].map(() => I`<tr><td>···</td><td>···</td><td>···</td></tr>`)}
          </table>`;
        break;
      case "filterBar":
        a = I`<div class="row-lay" style="align-items:center">
          ${["Estado ▾", "Fecha ▾", "Tipo ▾"].map((m) => I`<span class="control" style="flex:none;font-size:11px">${m}</span>`)}
          <div class="control" style="flex:1">Buscar…</div>
        </div>`;
        break;
      case "fab":
        a = I`<div style="display:flex;justify-content:flex-end"><span
          style="width:34px;height:34px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700">+</span></div>`;
        break;
      case "appContext":
        a = I`<span class="control" style="display:inline-flex;min-width:130px">${e.label ?? "Contexto"}&nbsp;<span>▾</span></span>`;
        break;
      case "kpi":
      case "stat":
        a = I`<div class="card-box metric"><div class="num">1.234</div><div class="cap">${e.title ?? (e.kind === "kpi" ? "KPI" : "Estadística")}</div></div>`;
        break;
      case "notice":
        a = I`<div class="notice-stub">ℹ️ ${e.text ?? "Un aviso para el usuario"}</div>`;
        break;
      case "banner":
        a = I`<div class="notice-stub" style="background:#fef3c7;border-color:#f59e0b;color:#92400e">📣 ${e.text ?? e.title ?? "Banner destacado"}</div>`;
        break;
      case "calloutCard":
        a = I`<div class="card-box"><div class="card-title">💡 ${e.title ?? "Callout"}</div>
          <div class="text-stub">${e.text ?? "Algo que merece atención especial."}</div></div>`;
        break;
      case "bulletedList":
        a = I`<div class="text-stub">${["Primer punto", "Segundo punto", "Tercer punto"].map((m) => I`<div>• ${m}</div>`)}</div>`;
        break;
      case "statusList":
        a = I`<div class="col-lay" style="gap:3px">${[["#16a34a", "Operativo"], ["#f59e0b", "Degradado"], ["#dc2626", "Caído"]].map(
          ([m, g]) => I`<div class="stub-row"><span class="stub-dot" style="background:${m}"></span>${g}</div>`
        )}</div>`;
        break;
      case "checklist":
        a = I`<div class="col-lay" style="gap:3px">${[["☑", "Hecho"], ["☑", "También hecho"], ["☐", "Pendiente"]].map(
          ([m, g]) => I`<div class="stub-row"><span>${m}</span>${g}</div>`
        )}</div>`;
        break;
      case "fileList":
        a = I`<div class="col-lay" style="gap:3px">${["contrato.pdf · 1,2 MB", "foto.png · 340 KB"].map(
          (m) => I`<div class="stub-row">📄 ${m}</div>`
        )}</div>`;
        break;
      case "separator":
        a = I`<div style="border-top:1.5px solid #e2e8f0;margin:6px 0"></div>`;
        break;
      case "entityHeader":
        a = I`<div style="display:flex;gap:10px;align-items:center">
          <div style="width:34px;height:34px;border-radius:50%;background:#e0f2fe;display:flex;align-items:center;justify-content:center;font-weight:800;color:#0284c7">A</div>
          <div><div style="font-weight:800;color:#0f172a;font-size:13px">${e.title ?? "Entidad"}</div>
            <div style="font-size:10.5px;color:#94a3b8">${e.text ?? "metadatos · estado"}</div></div>
        </div>`;
        break;
      case "emptyState":
        a = I`<div class="empty" style="padding:14px">🗇<br />${e.text ?? "Nada por aquí todavía"}</div>`;
        break;
      case "skeleton":
        a = I`<div class="col-lay" style="gap:5px">${[80, 60, 72].map(
          (m) => I`<div style="height:9px;border-radius:5px;background:#e2e8f0;width:${m}%"></div>`
        )}</div>`;
        break;
      case "progressBar":
        a = this.barStub(40);
        break;
      case "meter":
        a = this.barStub(72, "#16a34a");
        break;
      case "taskProgress":
        a = I`<div class="stub-row" style="margin-bottom:3px">${e.title ?? "Tareas"} · 3/5</div>${this.barStub(60)}`;
        break;
      case "progressSteps":
        a = this.stepsStub(1);
        break;
      case "timeline":
        a = I`<div class="col-lay" style="gap:0">${["Creado", "Aprobado", "Enviado"].map(
          (m, g) => I`<div class="stub-row" style="align-items:stretch;gap:8px">
            <div style="display:flex;flex-direction:column;align-items:center"><span class="stub-dot" style="background:#0284c7"></span>${g < 2 ? I`<span style="flex:1;width:1.5px;background:#e2e8f0;min-height:10px"></span>` : se}</div>
            <span style="padding-bottom:8px">${m}</span></div>`
        )}</div>`;
        break;
      case "calendar":
        a = I`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;font-size:9px;color:#64748b;text-align:center">
          ${["L", "M", "X", "J", "V", "S", "D"].map((m) => I`<span style="font-weight:700">${m}</span>`)}
          ${Array.from({ length: 14 }, (m, g) => I`<span style="padding:2px;border-radius:4px;${g === 9 ? "background:#0284c7;color:#fff" : "background:#f8fafc"}">${g + 1}</span>`)}
        </div>`;
        break;
      case "kanban":
        a = I`<div class="grid3-lay">${["Por hacer", "En curso", "Hecho"].map(
          (m, g) => I`<div class="board-col"><div class="stub-row" style="font-weight:700">${m}</div>
            ${Array.from({ length: 2 - g % 2 }, () => I`<div class="card-box" style="padding:6px;font-size:10px;color:#94a3b8">tarjeta</div>`)}</div>`
        )}</div>`;
        break;
      case "gantt":
        a = I`<div class="col-lay" style="gap:4px">${[[0, 45, "Análisis"], [30, 40, "Diseño"], [55, 45, "Build"]].map(
          ([m, g, y]) => I`<div class="stub-row"><span style="flex:0 0 52px">${y}</span>
            <div style="flex:1;height:9px;border-radius:5px;background:#f1f5f9"><div style="margin-left:${m}%;width:${g}%;height:100%;border-radius:5px;background:#0284c7"></div></div></div>`
        )}</div>`;
        break;
      case "trendChart":
        a = I`<svg viewBox="0 0 100 28" style="width:100%;height:38px" preserveAspectRatio="none">
          <polyline points="0,24 18,18 36,20 54,10 72,13 100,3" fill="none" stroke="#0284c7" stroke-width="2" />
        </svg>`;
        break;
      case "heatmap":
        a = I`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">
          ${[3, 6, 2, 8, 5, 1, 7, 4, 9, 2, 6, 3, 8, 5].map((m) => I`<span style="height:12px;border-radius:3px;background:rgba(2,132,199,${m / 10})"></span>`)}
        </div>`;
        break;
      case "funnel":
        a = I`<div class="col-lay" style="gap:3px;align-items:center">${[100, 70, 45, 25].map(
          (m) => I`<div style="width:${m}%;height:11px;border-radius:5px;background:#0284c7;opacity:${m / 100}"></div>`
        )}</div>`;
        break;
      case "orgChart":
        a = I`<div class="col-lay" style="gap:4px;align-items:center">
          <span class="control" style="flex:none;font-size:10px">Dirección</span>
          <div class="row-lay" style="width:80%">${["Área A", "Área B"].map((m) => I`<span class="control" style="font-size:10px;justify-content:center">${m}</span>`)}</div>
        </div>`;
        break;
      case "featureGrid":
        a = I`<div class="grid3-lay">${["⚡ Rápido", "🔒 Seguro", "🧩 Modular"].map(
          (m) => I`<div class="card-box" style="text-align:center;font-size:11px;color:#334155">${m}</div>`
        )}</div>`;
        break;
      case "testimonials":
        a = I`<div class="card-box"><div class="text-stub">«${e.text ?? "Nos cambió la forma de trabajar."}»</div>
          <div style="font-size:10.5px;color:#94a3b8;margin-top:4px">— Cliente contento</div></div>`;
        break;
      case "faq":
        a = I`<div class="col-lay" style="gap:3px">${["¿Cómo empiezo?", "¿Cuánto cuesta?"].map(
          (m) => I`<div class="acc-bar"><span>${m}</span><span>▸</span></div>`
        )}</div>`;
        break;
      case "commentThread":
        a = I`<div class="col-lay" style="gap:4px">${[["Ana", "Esto está casi listo"], ["Luis", "Le doy un repaso y cierro"]].map(
          ([m, g]) => I`<div class="card-box" style="padding:6px 8px"><span style="font-size:10px;font-weight:700;color:#0284c7">${m}</span>
            <span class="text-stub"> ${g}</span></div>`
        )}</div>`;
        break;
      case "comparisonCard":
        a = I`<div class="grid-lay">${["Básico", "Pro"].map(
          (m, g) => I`<div class="card-box" style="text-align:center"><div class="card-title">${m}</div>
            <div class="text-stub">✓ Una cosa<br />${g ? "✓" : "✕"} Otra cosa</div></div>`
        )}</div>`;
        break;
      // ---- Mateu enterprise/booking wave ----
      case "planningBoard":
        a = I`<div class="col-lay" style="gap:4px">${[["Recurso A", 10, 35], ["Recurso B", 40, 30], ["Recurso C", 20, 50]].map(
          ([m, g, y]) => I`<div class="stub-row"><span style="flex:0 0 64px">${m}</span>
            <div style="flex:1;height:14px;border-radius:4px;background:#f1f5f9"><div style="margin-left:${g}%;width:${y}%;height:100%;border-radius:4px;background:#0284c7;opacity:.85"></div></div></div>`
        )}
          <div class="stub-row" style="justify-content:space-between;color:#94a3b8;font-size:9px"><span>lun</span><span>mié</span><span>vie</span><span>dom</span></div>`;
        break;
      case "offerCard":
        a = I`<div class="card-box" style="display:flex;gap:10px;align-items:center">
          <div style="width:44px;height:44px;border-radius:8px;background:#e0f2fe"></div>
          <div style="flex:1"><div class="card-title">${e.title ?? "Una oferta irresistible"}</div>
            <div class="text-stub">✓ Ventaja uno · ✓ Ventaja dos</div></div>
          <span class="btn" style="flex:none">59 € · Añadir</span>
        </div>`;
        break;
      case "addOnPicker":
        a = I`<div class="col-lay" style="gap:3px">${[["🧖", "Spa", "25 €"], ["🍳", "Desayuno", "12 €"]].map(
          ([m, g, y]) => I`<div class="stub-row" style="justify-content:space-between"><span>${m} ${g}</span><span class="btn" style="font-size:10px;padding:2px 8px">${y} +</span></div>`
        )}
          <div class="stub-row" style="justify-content:flex-end;font-weight:700">Total: 37 €</div>`;
        break;
      case "paymentPicker":
        a = I`<div class="col-lay" style="gap:4px">
          <div class="row-lay">${["💳 Tarjeta", "🏦 Transferencia"].map((m, g) => I`<span class="control" style="justify-content:center;font-size:11px;${g === 0 ? "border-color:#0284c7" : ""}">${m}</span>`)}</div>
          <span class="btn" style="text-align:center">Confirmar y pagar</span></div>`;
        break;
      case "pricingTable":
        a = I`<div class="grid-lay">${[["Básico", "9 €/mes", ""], ["Pro", "29 €/mes", "border-color:#0284c7"]].map(
          ([m, g, y]) => I`<div class="card-box" style="text-align:center;${y}"><div class="card-title">${m}</div>
            <div style="font-size:16px;font-weight:800;color:#0f172a">${g}</div>
            <div class="text-stub">✓ Una cosa<br />✓ Otra cosa</div>
            <span class="btn" style="display:inline-block;margin-top:4px;font-size:10px">Elegir</span></div>`
        )}</div>`;
        break;
      case "processMonitor":
        a = I`<div class="col-lay" style="gap:3px">${[["Nóminas", "#16a34a", "OK"], ["Facturación", "#f59e0b", "2 avisos"]].map(
          ([m, g, y]) => I`<div class="stub-row" style="justify-content:space-between"><span><span class="stub-dot" style="background:${g};display:inline-block;margin-right:6px"></span>${m}</span><span style="color:#94a3b8">${y}</span></div>`
        )}</div>`;
        break;
      case "resourceGrid":
        a = I`<div class="grid3-lay">${["Estándar", "Superior ★", "Suite"].map(
          (m, g) => I`<div class="card-box" style="text-align:center;font-size:11px;${g === 1 ? "border-color:#0284c7" : ""}">${m}<br /><span style="color:#94a3b8;font-size:10px">${g === 1 ? "recomendada" : "disponible"}</span></div>`
        )}</div>`;
        break;
      case "taskQueue":
        a = I`<div class="acc-bar"><span>Pendientes (2)</span></div>
          <div class="col-lay" style="gap:3px">${["Revisar contrato", "Llamar al cliente"].map(
          (m) => I`<div class="stub-row">☐ ${m}</div>`
        )}</div>`;
        break;
      case "ledger":
        a = I`<div class="col-lay" style="gap:2px">${[["Habitación", "240 €"], ["Spa", "25 €"], ["Desayuno", "incluido"]].map(
          ([m, g]) => I`<div class="stub-row" style="justify-content:space-between"><span>${m}</span><span>${g}</span></div>`
        )}
          <div class="stub-row" style="justify-content:space-between;font-weight:800;border-top:1.5px solid #e2e8f0;padding-top:3px"><span>Total</span><span>265 €</span></div>`;
        break;
      case "chat":
        a = I`<div class="col-lay" style="gap:4px">
          <div class="card-box" style="padding:6px 8px;max-width:75%">Hola, ¿en qué puedo ayudarte?</div>
          <div class="card-box" style="padding:6px 8px;max-width:75%;align-self:flex-end;background:#e0f2fe">Quería una reserva…</div>
          <div class="control">Escribe un mensaje…</div></div>`;
        break;
      case "markdown":
        a = I`<div class="text-stub"><b># Título</b><br />Texto con <b>**negritas**</b> y <span style="color:#0284c7">[enlaces]</span>…</div>`;
        break;
      case "breadcrumbs":
        a = I`<div class="stub-row" style="color:#94a3b8">Inicio <span>›</span> Sección <span>›</span> <span style="color:#0f172a;font-weight:600">${e.title ?? "Aquí"}</span></div>`;
        break;
      default:
        a = I`<div class="col-lay">${t.length ? i(t) : n}</div>`;
    }
    const s = pe.LEAF_KINDS.has(e.kind), o = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), r = (m) => {
      var g, y;
      m.stopPropagation(), this._dragCmpId = e.id, (y = m.dataTransfer) == null || y.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (g = this.page) == null ? void 0 : g.id, componentId: e.id })
      ), m.dataTransfer && (m.dataTransfer.effectAllowed = "move");
    };
    return I`<div
      class="cmp ${s ? "leafcmp" : ""} ${o ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
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
      var y;
      m.preventDefault(), m.stopPropagation();
      const g = ((y = m.dataTransfer) == null ? void 0 : y.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...g].includes("application/x-modux-cmp") || [...g].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, m) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(m) => {
      var g, y, b;
      this._foreignOver = !1, !(!this._dragCmpId && !((b = (y = (g = m.dataTransfer) == null ? void 0 : g.types) == null ? void 0 : y.includes) != null && b.call(y, "application/x-modux-cmp"))) && (m.preventDefault(), m.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, m));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${r}
        >${pe.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${a}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, i) {
    return I`
        ${i ? I`<table>
              <tr>${t.slice(0, 4).map((n) => I`<th>${n.label ?? n.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => I`<tr>${t.slice(0, 4).map(() => I`<td>···</td>`)}</tr>`)}
            </table>` : se}
        ${t.length ? I`<div class="grid">
              ${t.map(
      (n) => I`
                  <div
                    class="field ${n.colspan === 2 ? "span2" : ""} ${this._overId === n.fieldId ? "dropping" : ""}"
                    draggable="true"
                    data-field-id=${n.fieldId}
                    title="Click: editar declaración · arrastra para reordenar"
                    @click=${() => this.onFieldClick(n)}
                    @dragstart=${(a) => {
        a.stopPropagation(), this._dragId = n.fieldId;
      }}
                    @dragover=${(a) => {
        a.preventDefault(), this._overId = n.fieldId;
      }}
                    @dragleave=${() => this._overId = null}
                    @drop=${(a) => {
        a.preventDefault(), a.stopPropagation(), this.onDrop(n.fieldId);
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
    var a, s, o, r, c;
    const e = this._cmp;
    if (!e) return se;
    const t = (p) => this._cmp = { ...this._cmp, ...p }, i = e.kind, n = [
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
    return I`<div class="pop" @click=${(p) => p.stopPropagation()}>
      ${n ? I`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(p) => t({ title: p.target.value })} />` : se}
      ${i === "text" ? I`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(p) => t({ text: p.target.value })} />` : se}
      ${i === "button" || i === "field" ? I`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(p) => t({ label: p.target.value })} />` : se}
      ${i === "button" ? I`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? I`<span class="chip">${((a = this.useCases.find((p) => p.id === e.useCaseId)) == null ? void 0 : a.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : I`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? I`<span class="chip"
                      >${((s = this.mappings.find((p) => p.id === e.mappingId)) == null ? void 0 : s.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : I`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : se}
      ${i === "form" ? I`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? I`<span class="chip"
                      >${((o = this.models.find((p) => p.id === e.modelId)) == null ? void 0 : o.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : I`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>
            <label>Mapping</label>
            <span style="grid-column: 2 / -1">
              ${e.mappingId ? I`<span class="chip"
                      >${((r = this.mappings.find((p) => p.id === e.mappingId)) == null ? void 0 : r.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : I`<span class="vmhint">el viewmodel viaja tal cual al guardar — suelta un mapeado del Catálogo sobre el formulario</span>`}
            </span>` : se}
      ${i === "listing" || i === "crud" ? I`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? I`<span class="chip"
                      >${((c = this.queryOps.find((p) => p.id === e.queryOperationId)) == null ? void 0 : c.name) ?? e.queryOperationId}
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
              @change=${(p) => t({ detailPageId: p.target.value || void 0 })}
            >
              <option value="">— sin ficha —</option>
              ${this.pages.filter((p) => {
      var h;
      return p.id !== ((h = this.page) == null ? void 0 : h.id);
    }).map((p) => I`<option value=${p.id} ?selected=${p.id === e.detailPageId}>${p.name}</option>`)}
            </select>` : se}
      ${i === "field" ? I`<label>Estereotipo</label>
            <select @change=${(p) => t({ stereotype: p.target.value || void 0 })}>
              ${sa.map((p) => I`<option value=${p} ?selected=${p === (e.stereotype ?? "regular")}>${p}</option>`)}
            </select>` : se}
      ${i === "tabLayout" ? I`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : se}
      <div class="actions">
        <button
          @click=${() => {
      const p = this._cmp.id;
      this._cmp = null, this.emitEvent("component-removed", { componentId: p });
    }}
        >
          Quitar
        </button>
        <button @click=${() => this._cmp = null}>Cancelar</button>
        <button
          class="ok"
          @click=${() => {
      const p = this._cmp;
      this._cmp = null, this.emitEvent("component-config-changed", {
        componentId: p.id,
        title: p.title ?? null,
        text: p.text ?? null,
        label: p.label ?? null,
        useCaseId: p.useCaseId ?? null,
        mappingId: p.mappingId ?? null,
        modelId: p.modelId ?? null,
        queryServiceId: p.queryServiceId ?? null,
        queryOperationId: p.queryOperationId ?? null,
        fieldId: p.fieldId ?? null,
        stereotype: p.stereotype ?? null,
        colspan: p.colspan ?? null,
        detailPageId: p.detailPageId ?? null
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
    const i = (this.page.viewmodelFields ?? []).map((s) => s.fieldId), n = i.indexOf(t), a = i.indexOf(e);
    n < 0 || a < 0 || (i.splice(a, 0, ...i.splice(n, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return se;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId, n = e.type === "WIZARD";
    return I`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? I`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(a) => this._rename = a.target.value}
              @keydown=${(a) => {
      a.key === "Enter" && this.applyRename(), a.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : I`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        ${this._route !== null ? I`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(a) => this._route = a.target.value}
              @keydown=${(a) => {
      a.key === "Enter" && this.applyRoute(), a.key === "Escape" && (this._route = null);
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
        ${(e.buttons ?? []).filter((a) => (a.bar ?? "toolbar") === "toolbar").map(
      (a) => I`<span
            class="btn"
            data-btn-uc=${a.useCaseId ?? ""}
            title=${a.mappingId ? `${a.useCaseId} · mapping ${a.mappingId}` : `${a.useCaseId ?? ""} — suelta un mapeado del Catálogo para transformar el viewmodel`}
            @click=${() => this._btn = {
        useCaseId: a.useCaseId ?? "",
        label: a.label ?? "",
        mappingId: a.mappingId ?? "",
        bar: a.bar ?? "toolbar"
      }}
            >${a.label}</span
          >`
    )}
        ${(e.buttons ?? []).some((a) => (a.bar ?? "toolbar") === "toolbar") ? se : I`<span class="zoneph">suelta un caso de uso aquí</span>`}
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
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((a, s) => {
      const o = (e.wizardSteps ?? []).map((c, p) => c.id ?? c.pageId ?? String(p)), r = o[s];
      return I`<span
                      class=${s === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${s + 1}${a.pageId ? "" : " (sin página)"} — arrastra para reordenar"
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
        const h = c.currentTarget.getBoundingClientRect(), g = c.clientX - h.left < h.width / 2 ? r : o[s + 1] ?? null;
        g !== p && this.emitEvent("wizard-step-moved", { stepKey: p, beforeStepKey: g });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[s] ?? `${s + 1}.`} ${a.label ?? "Paso"}${a.pageId ? "" : " ⌁"}</span
                    >`;
    }) : I`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : se}
        ${(e.content ?? []).length ? I`<div class="col-lay">${(e.content ?? []).map((a) => this.renderComponent(a))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((a) => a.bar === "bottom").map(
      (a) => I`<span
              class="btn"
              data-btn-uc=${a.useCaseId ?? ""}
              title=${a.mappingId ? `${a.useCaseId} · mapping ${a.mappingId}` : `${a.useCaseId ?? ""} — suelta un mapeado del Catálogo para transformar el viewmodel`}
              @click=${() => this._btn = {
        useCaseId: a.useCaseId ?? "",
        label: a.label ?? "",
        mappingId: a.mappingId ?? "",
        bar: "bottom"
      }}
              >${a.label}</span
            >`
    )}
        ${(e.buttons ?? []).some((a) => a.bar === "bottom") ? se : I`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var s, o, r;
      const a = (((s = this.page) == null ? void 0 : s.buttons) ?? []).some((c) => c.useCaseId === this._btn.useCaseId);
      return I`<div class="pop">
              <label>Caso de uso</label>
              <span style="grid-column: 2 / -1">
                <span class="chip">${((o = this.useCases.find((c) => c.id === this._btn.useCaseId)) == null ? void 0 : o.name) ?? this._btn.useCaseId}</span>
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
                ${this._btn.mappingId ? I`<span class="chip"
                        >${((r = this.mappings.find((c) => c.id === this._btn.mappingId)) == null ? void 0 : r.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : I`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${a ? I`<button
                      @click=${() => {
        const c = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: c });
      }}
                    >
                      Quitar
                    </button>` : se}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(a)}>Aplicar</button>
              </div>
            </div>`;
    })() : se}
      ${this._editing ? I`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(a) => this._editing = { ...this._editing, stereotype: a.target.value }}
            >
              ${sa.map(
      (a) => I`<option value=${a} ?selected=${a === this._editing.stereotype}>${a}</option>`
    )}
            </select>
            <label>Ancho</label>
            <select
              @change=${(a) => this._editing = { ...this._editing, colspan: Number(a.target.value) }}
            >
              <option value="1" ?selected=${this._editing.colspan !== 2}>media columna</option>
              <option value="2" ?selected=${this._editing.colspan === 2}>fila entera</option>
            </select>
            <label>Etiqueta</label>
            <input
              style="grid-column: 2 / -1"
              placeholder="(el nombre del campo)"
              .value=${this._editing.label}
              @input=${(a) => this._editing = { ...this._editing, label: a.target.value }}
            />
            <div class="actions">
              <button @click=${() => this._editing = null}>Cancelar</button>
              <button class="ok" @click=${this.applyEdit}>Aplicar</button>
            </div>
          </div>` : se}
    `;
  }
};
pe.styles = pt`
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
], pe.prototype, "pages", 2);
ve([
  re({ attribute: !1 })
], pe.prototype, "selectedCmpId", 2);
ve([
  z()
], pe.prototype, "_editing", 2);
ve([
  z()
], pe.prototype, "_dragId", 2);
ve([
  z()
], pe.prototype, "_overId", 2);
ve([
  z()
], pe.prototype, "_rename", 2);
ve([
  z()
], pe.prototype, "_route", 2);
ve([
  z()
], pe.prototype, "_btn", 2);
ve([
  z()
], pe.prototype, "_cmp", 2);
ve([
  z()
], pe.prototype, "_dragCmpId", 2);
ve([
  z()
], pe.prototype, "_dragWizKey", 2);
ve([
  z()
], pe.prototype, "_overCmpId", 2);
ve([
  z()
], pe.prototype, "_overCmpPos", 2);
ve([
  z()
], pe.prototype, "_foreignOver", 2);
ve([
  z()
], pe.prototype, "_activeTabs", 2);
pe = ve([
  ut("modux-page-designer")
], pe);
var Nc = Object.defineProperty, Dc = Object.getOwnPropertyDescriptor, qe = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? Dc(t, i) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (a = (n ? o(t, i, a) : o(a)) || a);
  return n && a && Nc(t, i, a), a;
};
const to = 460, Lc = 540, Uc = 660;
let Pe = class extends Ge {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((a) => {
        var s;
        return (s = a.classList) == null ? void 0 : s.contains("frame-grip");
      });
      if (i) {
        const s = i.closest(".frame").dataset.pageId, o = this.sizeOf(s);
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "resize", id: s, x: e.clientX, y: e.clientY, w0: o.w, h0: o.h }, e.preventDefault();
        return;
      }
      const n = t.find((a) => {
        var s;
        return (s = a.classList) == null ? void 0 : s.contains("frame-title");
      });
      if (n) {
        const s = n.closest(".frame").dataset.pageId;
        if (e.shiftKey) {
          this.emit("element-multi-toggled", { id: s }), e.preventDefault();
          return;
        }
        const o = this.pages.findIndex((c) => c.id === s), r = this.posOf(s, o);
        this.emit("element-selected", { elementType: "node", id: s, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: s, x: e.clientX, y: e.clientY, ox: r.x, oy: r.y, moved: !1 }, e.preventDefault();
        return;
      }
      if (!t.some((a) => a.tagName === "MODUX-PAGE-DESIGNER")) {
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
      const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, a = e.deltaY < 0 ? 1.1 : 1 / 1.1, s = Math.max(0.2, Math.min(2.5, this._t.k * a));
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
    var h, m, g, y, b, l;
    const i = (h = this.shadowRoot) == null ? void 0 : h.elementFromPoint(e, t), n = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, ".frame");
    if (!n) return null;
    const a = n.dataset.pageId, s = n.querySelector("modux-page-designer"), o = (g = s == null ? void 0 : s.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), r = (y = o == null ? void 0 : o.closest) == null ? void 0 : y.call(o, "[data-btn-uc]");
    if (r != null && r.dataset.btnUc) return `btn:${a}:${r.dataset.btnUc}`;
    const c = (b = o == null ? void 0 : o.closest) == null ? void 0 : b.call(o, "[data-bar]");
    if (c != null && c.dataset.bar) return `bar:${a}:${c.dataset.bar}`;
    const p = (l = o == null ? void 0 : o.closest) == null ? void 0 : l.call(o, "[data-cmp-id]");
    return p ? `cmp:${a}:${p.dataset.cmpId}` : a;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var g, y, b, l;
    const i = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), n = (y = i == null ? void 0 : i.closest) == null ? void 0 : y.call(i, ".frame");
    if (!n) return null;
    const a = n.dataset.pageId, s = n.querySelector("modux-page-designer"), o = (b = s == null ? void 0 : s.shadowRoot) == null ? void 0 : b.elementFromPoint(e, t), r = (l = o == null ? void 0 : o.closest) == null ? void 0 : l.call(o, "[data-cmp-id]");
    if (!r) return { pageId: a, componentId: null, pos: "into" };
    const c = r.dataset.cmpKind ?? "", p = r.getBoundingClientRect(), h = (t - p.top) / Math.max(1, p.height), m = pe.LEAF_KINDS.has(c) ? h < 0.5 ? "before" : "after" : h < 0.2 ? "before" : h > 0.8 ? "after" : "into";
    return { pageId: a, componentId: r.dataset.cmpId, pos: m };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: to, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * Lc, y: Math.floor(t / 3) * Uc };
  }
  render() {
    return I`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var a, s;
      const i = ((a = this._live) == null ? void 0 : a.id) === e.id ? this._live : this.posOf(e.id, t), n = this.sizeOf(e.id);
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
                .pages=${this.pages.map((o) => ({ id: o.id, name: o.name }))}
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
Pe.styles = pt`
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
      width: ${to}px;
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
  re({ attribute: !1 })
], Pe.prototype, "pages", 2);
qe([
  re({ attribute: !1 })
], Pe.prototype, "layout", 2);
qe([
  re({ attribute: !1 })
], Pe.prototype, "sizes", 2);
qe([
  re({ attribute: !1 })
], Pe.prototype, "selectedId", 2);
qe([
  re({ attribute: !1 })
], Pe.prototype, "selectedIds", 2);
qe([
  re({ attribute: !1 })
], Pe.prototype, "models", 2);
qe([
  re({ attribute: !1 })
], Pe.prototype, "mappings", 2);
qe([
  re({ attribute: !1 })
], Pe.prototype, "useCases", 2);
qe([
  re({ attribute: !1 })
], Pe.prototype, "queryOps", 2);
qe([
  re({ attribute: !1 })
], Pe.prototype, "selectedCmp", 2);
qe([
  z()
], Pe.prototype, "_t", 2);
qe([
  z()
], Pe.prototype, "_live", 2);
qe([
  z()
], Pe.prototype, "_liveSize", 2);
Pe = qe([
  ut("modux-figma")
], Pe);
var zc = Object.defineProperty, qc = Object.getOwnPropertyDescriptor, Re = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? qc(t, i) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (a = (n ? o(t, i, a) : o(a)) || a);
  return n && a && zc(t, i, a), a;
};
const Bc = {
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
}, Fc = {
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
}, ra = [30, 20, 13, 9.5, 7.5], da = [0, 180, 118, 80, 58], Wc = 0.055, Vc = 0.86, Gc = 2600, vi = 240, la = 0.16, ca = 0.015;
let be = class extends Ge {
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
      sessionStorage.setItem(be.STORE_KEY, JSON.stringify({
        cam: this.cam,
        nodes: e,
        levels: Object.fromEntries(this.manualLevels)
      }));
    } catch {
    }
  }
  loadState() {
    try {
      const e = sessionStorage.getItem(be.STORE_KEY);
      if (!e) return;
      const t = JSON.parse(e);
      t.cam && t.cam.k > 0 && (this.cam = t.cam), this.manualLevels = new Map(Object.entries(t.levels ?? {}));
      for (const [i, n] of Object.entries(t.nodes ?? {})) {
        const a = {
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
        this.prevByKey.has(i) || this.prevByKey.set(i, a);
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
    let t = 1 / 0, i = 1 / 0, n = -1 / 0, a = -1 / 0;
    for (const m of e)
      t = Math.min(t, m.x), i = Math.min(i, m.y), n = Math.max(n, m.x), a = Math.max(a, m.y);
    const s = 70, o = this.clientWidth || 800, r = this.clientHeight || 600, c = n - t + s * 2, p = a - i + s * 2, h = Math.min(1.5, Math.max(0.25, Math.min(o / c, r / p)));
    this.cam.k = h, this.cam.x = o / 2 - (t + n) / 2 * h, this.cam.y = r / 2 - (i + a) / 2 * h;
  }
  /** Tree depth the scene reaches (root = 0, top nodes = 1, their children = 2…). */
  sceneDepth() {
    if (!this.scene) return 1;
    const e = new Map(this.scene.nodes.map((i) => [i.id, i]));
    let t = 1;
    for (const i of this.scene.nodes) {
      let n = 1;
      for (let a = i.ownerId ?? i.parentId; a; ) {
        n++;
        const s = e.get(a);
        a = s ? s.ownerId ?? s.parentId : void 0;
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
  makeNode(e, t, i, n, a) {
    const s = `${(a == null ? void 0 : a.key) ?? ""}/${e}:${t}`, o = this.prevByKey.get(s), r = () => (Math.random() - 0.5) * 10;
    return {
      key: s,
      refId: t,
      kind: e,
      label: i,
      color: Bc[e] ?? "#64748b",
      depth: n,
      parent: a,
      expanded: (o == null ? void 0 : o.expanded) ?? !1,
      x: (o == null ? void 0 : o.x) ?? (a ? a.x + r() : 0),
      y: (o == null ? void 0 : o.y) ?? (a ? a.y + r() : 0),
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
    const t = this.model, i = e.depth + 1, n = (a, s, o) => this.makeNode(a, s, o, i, e);
    if (this.scene)
      return this.scene.nodes.filter((a) => a.kind !== "area").filter((a) => e.kind === "root" ? !(a.ownerId ?? a.parentId) : (a.ownerId ?? a.parentId) === e.refId).map((a) => {
        const s = n(a.kind || "node", a.id, a.label);
        return a.stroke && (s.color = a.stroke), s;
      });
    switch (e.kind) {
      case "root":
        return [
          ...t.boundedContexts.map((a) => n("boundedContext", a.id, a.name)),
          ...t.externalSystems.map((a) => n("external-system", a.id, a.name)),
          ...(t.uiApps ?? []).map((a) => n("ui-app", a.id, a.name)),
          ...(t.actors ?? []).map((a) => n("actor", a.id, a.name)),
          ...(t.aiAgents ?? []).filter((a) => !a.external).map((a) => n("ai-agent", a.id, a.name)),
          ...(t.workflows ?? []).map((a) => n("workflow", a.id, a.name)),
          ...(t.identityProviders ?? []).map((a) => n("identity-provider", a.id, a.name))
        ];
      case "boundedContext": {
        const a = t.boundedContexts.find((p) => p.id === e.refId);
        if (!a) return [];
        const s = (t.aggregates ?? []).filter((p) => p.boundedContextId === e.refId), o = a.useCases ?? [], r = new Set(s.map((p) => p.id)), c = new Set(
          (t.emissions ?? []).filter((p) => r.has(p.sourceId)).map((p) => p.domainEventId)
        );
        return [
          ...s.length ? [n("group", `aggregates:${e.refId}`, `Agregados · ${s.length}`)] : [],
          ...o.length ? [n("group", `use-cases:${e.refId}`, `Casos de uso · ${o.length}`)] : [],
          ...(a.domainEvents ?? []).filter((p) => !c.has(p.id)).map((p) => n("domain-event", p.id, p.name)),
          ...(a.applicationEvents ?? []).map((p) => n("application-event", p.id, p.name)),
          ...(a.readModels ?? []).map((p) => n("read-model", p.id, p.name)),
          ...(a.domainServices ?? []).map((p) => n("domain-service", p.id, p.name)),
          ...(a.queryServices ?? []).map((p) => n("query-service", p.id, p.name)),
          ...(a.scheduledTriggers ?? []).map((p) => n("scheduled-trigger", p.id, p.name)),
          ...(t.etlFlows ?? []).filter((p) => p.ownerBoundedContextId === e.refId).map((p) => n("etl-flow", p.id, p.name)),
          ...(t.notifications ?? []).filter((p) => p.ownerBoundedContextId === e.refId).map((p) => n("notification", p.id, p.name)),
          ...(t.documents ?? []).filter((p) => p.ownerBoundedContextId === e.refId).map((p) => n("document", p.id, p.name))
        ];
      }
      case "group": {
        const a = e.refId.indexOf(":"), s = e.refId.slice(0, a), o = e.refId.slice(a + 1), r = t.boundedContexts.find((c) => c.id === o);
        return r ? s === "aggregates" ? (t.aggregates ?? []).filter((c) => c.boundedContextId === o).map((c) => n("aggregate", c.id, c.name)) : (r.useCases ?? []).map((c) => n(c.policy ? "policy" : "use-case", c.id, c.name)) : [];
      }
      case "aggregate": {
        const a = new Set(
          (t.emissions ?? []).filter((s) => s.sourceId === e.refId).map((s) => s.domainEventId)
        );
        return [
          ...(t.entities ?? []).filter((s) => s.aggregateId === e.refId).map((s) => n("entity", s.id, s.name)),
          ...t.boundedContexts.flatMap((s) => s.domainEvents ?? []).filter((s) => a.has(s.id)).map((s) => n("domain-event", s.id, s.name))
        ];
      }
      case "external-system": {
        const a = t.externalSystems.find((s) => s.id === e.refId);
        return a ? [
          ...(t.apis ?? []).filter((s) => s.publishedByExternalSystemId === e.refId).map((s) => n("api", s.id, s.name)),
          ...(a.useCases ?? []).map((s) => n("external-use-case", s.id, s.name)),
          ...(a.tables ?? []).map((s) => n("external-table", s.id, s.name)),
          ...(a.mcpServers ?? []).map((s) => n("mcp-server", s.id, s.name))
        ] : [];
      }
      case "api": {
        const a = (t.apis ?? []).find((s) => s.id === e.refId);
        return ((a == null ? void 0 : a.operations) ?? []).map((s) => n("api-operation", s.id, s.name));
      }
      case "ui-app": {
        const a = (t.uiApps ?? []).find((r) => r.id === e.refId);
        if (!a) return [];
        const s = /* @__PURE__ */ new Set(), o = (r) => {
          for (const c of r ?? [])
            c.pageId && s.add(c.pageId), o(c.children);
        };
        o(a.menuItems);
        for (const r of [a.headerPageId, a.homePageId, a.viewPageId, a.editPageId])
          r && s.add(r);
        return [...s].map((r) => (t.pages ?? []).find((c) => c.id === r)).filter((r) => !!r).map((r) => n("page", r.id, r.name));
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
    const t = /* @__PURE__ */ new Set(), i = (o) => {
      for (let r = o; r; r = r.parent) t.add(r.key);
    }, n = (o) => {
      t.add(o.key);
      for (const r of o.children ?? []) n(r);
    };
    i(e), n(e);
    const a = this.related.get(e.refId);
    if (a)
      for (const o of this.allNodes)
        o.refId && a.has(o.refId) && i(o);
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
    for (const o of e) {
      if (o.parent) {
        const r = (da[Math.min(o.depth, da.length - 1)] ?? 60) + Math.min(60, ((((s = o.parent.children) == null ? void 0 : s.length) ?? 1) - 1) * 2.5);
        let c = o.x - o.parent.x, p = o.y - o.parent.y, h = Math.hypot(c, p);
        if (h < 0.01) {
          const b = Math.random() * Math.PI * 2;
          c = Math.cos(b) * 0.1, p = Math.sin(b) * 0.1, h = 0.1;
        }
        const m = Wc * (h - r), g = c / h * m, y = p / h * m;
        o.vx -= g, o.vy -= y, o.parent.vx += g * 0.4, o.parent.vy += y * 0.4;
      } else
        o.vx -= o.x * ca, o.vy -= o.y * ca;
      !this.reducedMotion && this._motion > 0 && (o.vx += Math.sin(t * o.f1 * Math.PI * 2 + o.p1) * la * this._motion, o.vy += Math.cos(t * o.f2 * Math.PI * 2 + o.p2) * la * this._motion);
    }
    for (let o = 0; o < e.length; o++) {
      const r = e[o];
      for (let c = o + 1; c < e.length; c++) {
        const p = e[c], h = p.x - r.x, m = p.y - r.y;
        if (Math.abs(h) > vi || Math.abs(m) > vi) continue;
        const g = h * h + m * m;
        if (g > vi * vi || g < 0.01) continue;
        const y = Math.sqrt(g), b = r.depth <= 1 && p.depth <= 1 ? 3 : 1, l = Gc * b / g, d = h / y * l, f = m / y * l;
        r.vx -= d, r.vy -= f, p.vx += d, p.vy += f;
      }
    }
    const i = this._motion, n = Vc * i + 0.5 * (1 - i), a = (1 - i) * 0.7;
    for (const o of e) {
      if (o === this.dragNode) {
        o.vx = 0, o.vy = 0;
        continue;
      }
      o.vx *= n, o.vy *= n;
      const r = Math.hypot(o.vx, o.vy);
      if (r > 14 && (o.vx = o.vx / r * 14, o.vy = o.vy / r * 14), a > 0 && r < a) {
        o.vx = 0, o.vy = 0;
        continue;
      }
      o.x += o.vx, o.y += o.vy;
      const c = o === this.hover ? 1.75 : 1;
      o.scale += (c - o.scale) * 0.18;
    }
  }
  // ── Drawing ───────────────────────────────────────────────────────────
  radiusOf(e) {
    return (ra[Math.min(e.depth, ra.length - 1)] ?? 7) * e.scale;
  }
  draw(e) {
    var s, o;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const i = this.clientWidth, n = this.clientHeight;
    t.clearRect(0, 0, i, n), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), this.drawAreas(t, e), t.lineWidth = 1.3 / this.cam.k;
    for (const r of e)
      r.parent && (t.strokeStyle = r.color + "55", t.beginPath(), t.moveTo(r.parent.x, r.parent.y), t.lineTo(r.x, r.y), t.stroke());
    const a = (r) => `${r}px system-ui, sans-serif`;
    for (const r of e) {
      const c = this.radiusOf(r);
      t.beginPath(), t.arc(r.x, r.y, c, 0, Math.PI * 2), t.fillStyle = r.kind === "note" ? "#fef9c3" : r.expanded ? r.color + "22" : "#ffffff", t.fill(), t.lineWidth = (r === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = r.color, t.stroke(), this.drawGlyph(t, r, c);
      const p = ((s = r.children) == null ? void 0 : s.length) ?? 0;
      if (!r.expanded && p > 0) {
        const m = Math.max(7, c * 0.42), g = r.x + c * 0.75, y = r.y + c * 0.75;
        t.beginPath(), t.arc(g, y, m, 0, Math.PI * 2), t.fillStyle = r.color, t.fill(), t.fillStyle = "#ffffff", t.font = a(m * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(p), g, y + 0.5);
      }
      if (r.depth <= 1 || r === this.hover || this.cam.k > 0.65) {
        const m = r.label.length > 22 ? r.label.slice(0, 21) + "…" : r.label;
        t.font = r === this.hover ? `600 ${a(12)}` : a(r.depth <= 1 ? 12 : 10.5), t.fillStyle = r === this.hover ? "#0f172a" : "#475569", t.textAlign = "center", t.textBaseline = "top", t.fillText(m, r.x, r.y + c + 4);
      }
    }
    if (this.selected.size) {
      t.save(), t.strokeStyle = "#2563eb", t.lineWidth = 2 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]);
      for (const r of e)
        this.selected.has(r.key) && (t.beginPath(), t.arc(r.x, r.y, this.radiusOf(r) + 6, 0, Math.PI * 2), t.stroke());
      t.restore();
    }
    if (this.rubber) {
      const r = this.rubber;
      t.save(), t.fillStyle = "rgba(37, 99, 235, 0.08)", t.strokeStyle = "#2563eb", t.lineWidth = 1.2 / this.cam.k, t.setLineDash([4 / this.cam.k, 3 / this.cam.k]), t.fillRect(Math.min(r.ax, r.bx), Math.min(r.ay, r.by), Math.abs(r.bx - r.ax), Math.abs(r.by - r.ay)), t.strokeRect(Math.min(r.ax, r.bx), Math.min(r.ay, r.by), Math.abs(r.bx - r.ax), Math.abs(r.by - r.ay)), t.restore();
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
    if (t.globalAlpha = 1, this.drawNotes(t, e), this._threads)
      for (const r of e) this.drawThreads(t, r, e);
    else this.hover && this.drawThreads(t, this.hover, e);
    if (this.hover && !this.hover.expanded && ((o = this.hover.children) != null && o.length) && this.drawGhosts(t, this.hover), this.linking) {
      const r = this.linking.source;
      t.save(), t.strokeStyle = "#475569", t.lineWidth = 1.6 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]), t.beginPath(), t.moveTo(r.x, r.y), t.lineTo(this.linking.x, this.linking.y), t.stroke(), t.restore();
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
    const a = Math.min(0.65, (this.t - this.hoverAt) * 2.2);
    if (!(a <= 0.02)) {
      e.save(), e.globalAlpha = a, e.setLineDash([6, 5]), e.lineWidth = 1.4 / this.cam.k;
      for (const s of i) {
        if (s === t || !n.has(s.refId) || s === t.parent || s.parent === t) continue;
        const o = (t.x + s.x) / 2, r = (t.y + s.y) / 2, c = s.x - t.x, p = s.y - t.y, h = 0.18;
        e.strokeStyle = s.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(o - p * h, r + c * h, s.x, s.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(s.x, s.y, this.radiusOf(s) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
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
    const i = ((s = this.scene) == null ? void 0 : s.nodes) ?? [], n = i.filter((o) => o.kind === "area");
    if (!n.length) return;
    const a = this.cam.k;
    e.save(), e.setLineDash([5 / a, 4 / a]), e.lineWidth = 1.4 / a;
    for (const o of n) {
      const r = i.filter(
        (y) => y.kind !== "area" && !y.parentId && y.x - y.w / 2 >= o.x - o.w / 2 && y.x + y.w / 2 <= o.x + o.w / 2 && y.y - y.h / 2 >= o.y - o.h / 2 && y.y + y.h / 2 <= o.y + o.h / 2
      ), c = [];
      for (const y of r) {
        const b = this.visibleRepresentative(y.id, t);
        b && c.push({ x: b.x, y: b.y, r: this.radiusOf(b) + 16 });
      }
      if (!c.length) continue;
      const p = Math.min(...c.map((y) => y.x - y.r)), h = Math.max(...c.map((y) => y.x + y.r)), m = Math.min(...c.map((y) => y.y - y.r)), g = Math.max(...c.map((y) => y.y + y.r));
      this.areaHulls.set(o.id, { x: (p + h) / 2, y: (m + g) / 2 }), e.fillStyle = "rgba(148, 163, 184, 0.09)", e.strokeStyle = "#94a3b8", e.beginPath(), e.roundRect(p, m, h - p, g - m, 18 / a), e.fill(), e.stroke();
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
    var a;
    const i = (((a = this.scene) == null ? void 0 : a.edges) ?? []).filter((s) => s.kind === "note-link");
    if (!i.length) return;
    const n = this.cam.k;
    e.save(), e.setLineDash([4 / n, 3 / n]), e.strokeStyle = "rgba(202, 138, 4, 0.75)", e.lineWidth = 1.4 / n;
    for (const s of i) {
      if (s.targetId.startsWith("edgeanchor:")) continue;
      const o = this.visibleRepresentative(s.sourceId, t), r = this.visibleRepresentative(s.targetId, t), c = r ?? this.areaHulls.get(s.targetId);
      if (!o || !c || r === o) continue;
      const p = c.x - o.x, h = c.y - o.y, m = Math.hypot(p, h) || 1, g = this.radiusOf(o), y = r ? this.radiusOf(r) : 0;
      e.beginPath(), e.moveTo(o.x + p / m * g, o.y + h / m * g), e.lineTo(c.x - p / m * y, c.y - h / m * y), e.stroke();
    }
    e.restore();
  }
  visibleRepresentative(e, t) {
    var a;
    const i = new Map(t.map((s) => [s.refId, s])), n = new Map((((a = this.scene) == null ? void 0 : a.nodes) ?? []).map((s) => [s.id, s.ownerId ?? s.parentId]));
    for (let s = e; s; s = n.get(s)) {
      const o = i.get(s);
      if (o) return o;
    }
    return null;
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const i = t.children ?? [], n = i.slice(0, 14), a = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (a <= 0.02) return;
    const o = this.radiusOf(t) + 24, r = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, c = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = a, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, n.forEach((p, h) => {
      const m = r - c / 2 + c * (h + 0.5) / n.length, g = this.reducedMotion ? 0 : Math.sin(this.t * p.f1 * Math.PI * 2 + p.p1) * 1.8, y = t.x + Math.cos(m) * (o + g), b = t.y + Math.sin(m) * (o + g);
      e.beginPath(), e.arc(y, b, 6, 0, Math.PI * 2), e.fillStyle = "#ffffff", e.fill(), e.strokeStyle = p.color, e.stroke();
    }), i.length > n.length) {
      e.setLineDash([]), e.fillStyle = "#64748b", e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const p = r + c / 2 + 0.35;
      e.fillText(`+${i.length - n.length}`, t.x + Math.cos(p) * o, t.y + Math.sin(p) * o);
    }
    e.restore();
  }
  /** A tiny kind glyph inside the circle, so the tree reads without hovering. */
  drawGlyph(e, t, i) {
    const n = i * 0.42;
    if (n < 3.2) return;
    const { x: a, y: s } = t;
    switch (e.save(), e.strokeStyle = t.color, e.fillStyle = t.color, e.lineWidth = Math.max(1, n * 0.22), e.lineCap = "round", e.lineJoin = "round", e.beginPath(), t.kind) {
      case "note":
        e.moveTo(a - n * 0.8, s - n * 0.9), e.lineTo(a + n * 0.8, s - n * 0.9), e.lineTo(a + n * 0.8, s + n * 0.3), e.lineTo(a + n * 0.2, s + n * 0.9), e.lineTo(a - n * 0.8, s + n * 0.9), e.closePath(), e.moveTo(a + n * 0.8, s + n * 0.3), e.lineTo(a + n * 0.2, s + n * 0.3), e.lineTo(a + n * 0.2, s + n * 0.9), e.stroke();
        break;
      case "group": {
        e.arc(a - n * 0.45, s, n * 0.16, 0, Math.PI * 2), e.moveTo(a + n * 0.16, s), e.arc(a, s, n * 0.16, 0, Math.PI * 2), e.moveTo(a + n * 0.61, s), e.arc(a + n * 0.45, s, n * 0.16, 0, Math.PI * 2), e.fill(), e.beginPath(), e.arc(a, s, n, -Math.PI * 0.35, Math.PI * 0.35), e.moveTo(a - n * Math.cos(Math.PI * 0.35), s + n * Math.sin(Math.PI * 0.35)), e.arc(a, s, n, Math.PI * 0.65, Math.PI * 1.35), e.stroke();
        break;
      }
      case "root":
        e.arc(a, s, n, 0, Math.PI * 2), e.moveTo(a + n * 0.35, s), e.arc(a, s, n * 0.35, 0, Math.PI * 2), e.stroke();
        break;
      case "boundedContext":
        for (const [o, r] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(a + o * n + n * 0.3, s + r * n), e.arc(a + o * n, s + r * n, n * 0.3, 0, Math.PI * 2);
        e.fill();
        break;
      case "aggregate":
        e.moveTo(a, s - n), e.lineTo(a + n, s), e.lineTo(a, s + n), e.lineTo(a - n, s), e.closePath(), e.stroke();
        break;
      case "entity":
      case "external-table":
      case "read-model":
        e.rect(a - n, s - n * 0.8, n * 2, n * 1.6), e.moveTo(a - n, s - n * 0.25), e.lineTo(a + n, s - n * 0.25), e.stroke();
        break;
      case "use-case":
      case "external-use-case":
        e.moveTo(a - n * 0.6, s - n * 0.85), e.lineTo(a + n * 0.85, s), e.lineTo(a - n * 0.6, s + n * 0.85), e.closePath(), e.stroke();
        break;
      case "policy":
      case "domain-event":
      case "application-event":
        e.moveTo(a + n * 0.3, s - n), e.lineTo(a - n * 0.5, s + n * 0.15), e.lineTo(a + n * 0.05, s + n * 0.15), e.lineTo(a - n * 0.3, s + n), e.lineTo(a + n * 0.5, s - n * 0.15), e.lineTo(a - n * 0.05, s - n * 0.15), e.closePath(), e.stroke();
        break;
      case "domain-service":
      case "etl-flow": {
        e.arc(a, s, n * 0.5, 0, Math.PI * 2);
        for (let o = 0; o < 6; o++) {
          const r = o * Math.PI / 3;
          e.moveTo(a + Math.cos(r) * n * 0.55, s + Math.sin(r) * n * 0.55), e.lineTo(a + Math.cos(r) * n, s + Math.sin(r) * n);
        }
        e.stroke();
        break;
      }
      case "query-service":
        e.arc(a - n * 0.25, s - n * 0.25, n * 0.6, 0, Math.PI * 2), e.moveTo(a + n * 0.25, s + n * 0.25), e.lineTo(a + n, s + n), e.stroke();
        break;
      case "scheduled-trigger":
        e.arc(a, s, n, 0, Math.PI * 2), e.moveTo(a, s - n * 0.55), e.lineTo(a, s), e.lineTo(a + n * 0.45, s + n * 0.25), e.stroke();
        break;
      case "notification":
        e.moveTo(a - n * 0.85, s + n * 0.45), e.quadraticCurveTo(a - n * 0.85, s - n, a, s - n), e.quadraticCurveTo(a + n * 0.85, s - n, a + n * 0.85, s + n * 0.45), e.closePath(), e.moveTo(a + n * 0.25, s + n * 0.75), e.arc(a, s + n * 0.75, n * 0.25, 0, Math.PI), e.stroke();
        break;
      case "document":
        e.moveTo(a - n * 0.7, s - n), e.lineTo(a + n * 0.25, s - n), e.lineTo(a + n * 0.7, s - n * 0.55), e.lineTo(a + n * 0.7, s + n), e.lineTo(a - n * 0.7, s + n), e.closePath(), e.moveTo(a + n * 0.25, s - n), e.lineTo(a + n * 0.25, s - n * 0.55), e.lineTo(a + n * 0.7, s - n * 0.55), e.stroke();
        break;
      case "workflow":
        for (const o of [-0.7, 0.1])
          e.moveTo(a + o * n, s - n * 0.7), e.lineTo(a + (o + 0.6) * n, s), e.lineTo(a + o * n, s + n * 0.7);
        e.stroke();
        break;
      case "identity-provider":
        e.arc(a - n * 0.45, s - n * 0.45, n * 0.45, 0, Math.PI * 2), e.moveTo(a - n * 0.1, s - n * 0.1), e.lineTo(a + n * 0.9, s + n * 0.9), e.moveTo(a + n * 0.45, s + n * 0.45), e.lineTo(a + n * 0.85, s + n * 0.05), e.stroke();
        break;
      case "actor":
        e.arc(a, s - n * 0.5, n * 0.42, 0, Math.PI * 2), e.moveTo(a - n * 0.8, s + n), e.quadraticCurveTo(a, s - n * 0.1, a + n * 0.8, s + n), e.stroke();
        break;
      case "ai-agent":
        for (let o = 0; o < 4; o++) {
          const r = o * Math.PI / 2 + Math.PI / 4;
          e.moveTo(a, s), e.lineTo(a + Math.cos(r) * n, s + Math.sin(r) * n), e.moveTo(a, s), e.lineTo(a + Math.cos(r + Math.PI / 4) * n * 0.5, s + Math.sin(r + Math.PI / 4) * n * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(a - n * 0.45, s + n * 0.15, n * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(a + n * 0.1, s - n * 0.35, n * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(a + n * 0.55, s + n * 0.2, n * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [o, r] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(a + o * n, s + r * n, n * 0.85, n * 0.85);
        e.stroke();
        break;
      case "page":
        e.rect(a - n, s - n * 0.8, n * 2, n * 1.6), e.moveTo(a - n, s - n * 0.35), e.lineTo(a + n, s - n * 0.35), e.stroke(), e.beginPath(), e.arc(a - n * 0.7, s - n * 0.57, n * 0.09, 0, Math.PI * 2), e.fill();
        break;
      case "api":
        e.moveTo(a - n * 0.25, s - n), e.lineTo(a - n, s), e.lineTo(a - n * 0.25, s + n), e.moveTo(a + n * 0.25, s - n), e.lineTo(a + n, s), e.lineTo(a + n * 0.25, s + n), e.stroke();
        break;
      case "api-operation":
        e.moveTo(a - n, s), e.lineTo(a + n * 0.7, s), e.moveTo(a + n * 0.1, s - n * 0.5), e.lineTo(a + n * 0.8, s), e.lineTo(a + n * 0.1, s + n * 0.5), e.stroke();
        break;
      case "mcp-server":
        e.arc(a, s + n * 0.25, n * 0.6, 0, Math.PI), e.closePath(), e.moveTo(a - n * 0.35, s + n * 0.25), e.lineTo(a - n * 0.35, s - n * 0.7), e.moveTo(a + n * 0.35, s + n * 0.25), e.lineTo(a + n * 0.35, s - n * 0.7), e.stroke();
        break;
      default:
        e.arc(a, s, n * 0.3, 0, Math.PI * 2), e.fill();
    }
    e.restore();
  }
  /** Hover card: what the node is, what it holds, how to enter. Screen space, clamped to the canvas. */
  drawCard(e, t, i, n) {
    var N, G;
    const a = (t.children ?? []).flatMap(
      (j) => j.kind === "group" ? j.children ?? (j.children = this.childrenOf(j)) : [j]
    ), s = /* @__PURE__ */ new Map();
    for (const j of a) s.set(j.kind, (s.get(j.kind) ?? 0) + 1);
    const o = [];
    for (const [j, de] of s)
      if (o.push(`${de} ${de === 1 ? (Xi[j] ?? j).toLowerCase() : Fc[j] ?? j}`), o.length === 4) {
        const $ = [...s.keys()].length - 4;
        $ > 0 && (o[3] += ` (+${$} tipos más)`);
        break;
      }
    const r = a.slice(0, 6).map((j) => ({ label: j.label.length > 30 ? j.label.slice(0, 29) + "…" : j.label, color: j.color })), c = a.length - r.length, p = t.label, h = Xi[t.kind] ?? t.kind, m = ((N = t.children) != null && N.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((G = t.children) != null && G.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const g = e.measureText(p).width;
    e.font = "11px system-ui, sans-serif";
    const y = Math.max(
      e.measureText(h).width,
      ...o.map((j) => e.measureText(j).width),
      ...r.map((j) => e.measureText(j.label).width + 12),
      e.measureText(m).width
    ), b = Math.min(300, Math.max(g, y) + 24), l = r.length ? 8 + r.length * 15 + (c > 0 ? 15 : 0) : 0, d = 40 + o.length * 15 + l + (m ? 18 : 0), f = this.radiusOf(t) * this.cam.k, _ = this.cam.x + t.x * this.cam.k, E = this.cam.y + t.y * this.cam.k;
    let A = _ + f + 14;
    A + b > i - 8 && (A = _ - f - 14 - b), A = Math.max(8, Math.min(A, i - b - 8));
    const O = Math.max(8, Math.min(E - 10, n - d - 8));
    e.translate(A, O), e.fillStyle = "rgba(255,255,255,0.96)", e.strokeStyle = "#cbd5e1", e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, b, d, 8), e.fill(), e.stroke(), e.fillStyle = "#0f172a", e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(p, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(h, 12, 25), e.fillStyle = "#475569", o.forEach((j, de) => e.fillText(j, 12, 41 + de * 15));
    let C = 41 + o.length * 15 + (r.length ? 8 : 0);
    r.forEach((j) => {
      e.fillStyle = j.color, e.beginPath(), e.arc(15, C + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = "#334155", e.fillText(j.label, 24, C), C += 15;
    }), c > 0 && (e.fillStyle = "#94a3b8", e.fillText(`… y ${c} más`, 24, C)), m && (e.fillStyle = "#94a3b8", e.fillText(m, 12, d - 16)), e.restore();
  }
  // ── Search & fly ──────────────────────────────────────────────────────
  static fold(e) {
    return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  onSearchInput(e) {
    this._q = e.target.value;
    const t = be.fold(this._q.trim());
    this._active = 0, this._sugs = t.length < 2 ? [] : this.allNodes.filter((i) => i.kind !== "root" && be.fold(i.label).includes(t)).slice(0, 8);
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
      const a = i[n], s = this.radiusOf(a) + 4 / this.cam.k;
      if ((e - a.x) ** 2 + (t - a.y) ** 2 <= s * s) return a;
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
      const i = this.toWorld(e), n = this.nodeAt(i.x, i.y), a = this.linking.source;
      this.linking = void 0, n && n !== a && n.kind !== "root" && a.refId && n.refId && this.dispatchEvent(
        new CustomEvent("explorer-connect", {
          // client coords travel along: pickers (fixed-position) open at the drop point
          detail: { sourceId: a.refId, targetId: n.refId, x: e.clientX, y: e.clientY },
          bubbles: !0,
          composed: !0
        })
      );
      return;
    }
    if (this.rubber) {
      const i = this.rubber;
      if (this.rubber = void 0, this.moved) {
        const n = Math.min(i.ax, i.bx), a = Math.max(i.ax, i.bx), s = Math.min(i.ay, i.by), o = Math.max(i.ay, i.by), r = this.visible().filter((c) => c.kind !== "root" && c.kind !== "group" && c.refId).filter((c) => c.x >= n && c.x <= a && c.y >= s && c.y <= o).map((c) => c.key);
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
      const i = e.parent ? Math.atan2(e.y - e.parent.y, e.x - e.parent.x) : Math.random() * Math.PI * 2, n = e.parent ? Math.PI * 1.25 : Math.PI * 2, a = e.children;
      a.forEach((s, o) => {
        this.materialize(s.parent);
        const r = i - n / 2 + n * (o + 0.5) / a.length;
        s.x = e.x + Math.cos(r) * 6, s.y = e.y + Math.sin(r) * 6, s.vx = Math.cos(r) * 7, s.vy = Math.sin(r) * 7, s.children || (s.children = this.childrenOf(s));
      }), e.vx -= Math.cos(i) * 2, e.vy -= Math.sin(i) * 2;
    }
  }
  onDblClick(e) {
    window.clearTimeout(this.clickTimer);
    const t = this.getBoundingClientRect(), i = (e.clientX - t.left - this.cam.x) / this.cam.k, n = (e.clientY - t.top - this.cam.y) / this.cam.k, a = this.nodeAt(i, n);
    !a || a.kind === "root" || this.dispatchEvent(
      new CustomEvent("node-activated", {
        detail: { id: a.refId, kind: a.kind },
        bubbles: !0,
        composed: !0
      })
    );
  }
  onWheel(e) {
    e.preventDefault(), this.flight = void 0;
    const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, a = Math.exp(-e.deltaY * 12e-4), s = Math.min(2.5, Math.max(0.25, this.cam.k * a)), o = s / this.cam.k;
    this.cam.x = i - (i - this.cam.x) * o, this.cam.y = n - (n - this.cam.y) * o, this.cam.k = s;
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
be.styles = pt`
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
be.STORE_KEY = "modux-explorer-state";
Re([
  re({ type: Boolean, reflect: !0 })
], be.prototype, "shifted", 2);
Re([
  re({ attribute: !1 })
], be.prototype, "scene", 2);
Re([
  re({ attribute: !1 })
], be.prototype, "model", 2);
Re([
  z()
], be.prototype, "_q", 2);
Re([
  z()
], be.prototype, "_sugs", 2);
Re([
  z()
], be.prototype, "_active", 2);
Re([
  z()
], be.prototype, "_motion", 2);
Re([
  z()
], be.prototype, "_threads", 2);
Re([
  z()
], be.prototype, "_viewNaming", 2);
Re([
  z()
], be.prototype, "_viewName", 2);
Re([
  z()
], be.prototype, "selected", 2);
Re([
  z()
], be.prototype, "_levels", 2);
Re([
  re()
], be.prototype, "sceneKey", 2);
Re([
  z()
], be.prototype, "renaming", 2);
be = Re([
  ut("modux-explorer")
], be);
const ce = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function ii(e) {
  const t = e.participants ?? [], i = new Set(t.map((a) => a.ref)), n = [];
  for (const a of e.messages)
    for (const s of [a.fromRef, a.toRef])
      i.has(s) || (i.add(s), n.push({ ref: s, name: s, type: "UNKNOWN" }));
  return [...t, ...n];
}
function io(e) {
  const t = [];
  return e.map((i) => {
    const n = Math.max(0, i.depth ?? 0);
    for (let a = 0; a < n; a++) t[a] = t[a] || 1;
    return t[n] = (t[n] || 0) + 1, t.length = n + 1, t.join(".");
  });
}
function no(e) {
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
function ao(e) {
  const t = /* @__PURE__ */ new Map(), i = (n, a) => t.set(n, a);
  for (const n of e.actors ?? []) i(n.id, n.name);
  for (const n of e.uiApps ?? []) i(n.id, n.name);
  for (const n of e.pages ?? []) i(n.id, n.name);
  for (const n of e.boundedContexts) {
    for (const a of n.useCases ?? []) i(a.id, a.name);
    for (const a of n.readModels ?? []) i(a.id, a.name);
    for (const a of n.domainServices ?? []) i(a.id, a.name);
    for (const a of n.queryServices ?? []) i(a.id, a.name);
    for (const a of n.domainEvents ?? []) i(a.id, a.name);
    for (const a of n.applicationEvents ?? []) i(a.id, a.name);
  }
  for (const n of e.aggregates ?? []) i(n.id, n.name);
  for (const n of e.externalSystems) {
    i(n.id, n.name);
    for (const a of n.useCases ?? []) i(a.id, `${n.name} · ${a.name}`);
  }
  for (const n of e.apis ?? []) {
    i(n.id, n.name);
    for (const a of n.operations) i(a.id, `${n.name} · ${a.name}`);
  }
  for (const n of e.aiAgents ?? []) i(n.id, n.name);
  for (const n of e.processes ?? []) i(n.id, n.name);
  for (const n of e.workflows ?? []) i(n.id, n.name);
  return t;
}
function oo(e, t) {
  for (const i of e.boundedContexts) {
    const n = (i.domainEvents ?? []).find((a) => a.name === t) ?? (i.applicationEvents ?? []).find((a) => a.name === t);
    if (n) return n.id;
  }
  return null;
}
function Hc(e, t) {
  const i = e.boundedContexts.find(
    (n) => (n.useCases ?? []).some((a) => a.id === t) || (n.queryServices ?? []).some((a) => a.id === t) || (n.readModels ?? []).some((a) => a.id === t)
  );
  return (i == null ? void 0 : i.id) ?? null;
}
function jc(e, t, i) {
  const n = no(e), a = e.flows.find(
    (r) => r.archetype === "TRIGGERS" && r.triggerEvent && r.targetUseCaseId === i.ref && r.triggerAggregateId === t.ref
  );
  if (a) return { kind: "EVENT", label: a.triggerEvent };
  const s = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ].filter((r) => r.sourceId === t.ref);
  for (const r of s) {
    const c = ao(e).get(r.domainEventId);
    if (!c) continue;
    if (e.flows.find(
      (m) => m.archetype === "TRIGGERS" && m.triggerEvent === c && m.targetUseCaseId === i.ref
    )) return { kind: "EVENT", label: c };
    if ((e.subscriptions ?? []).find(
      (m) => m.eventName === c && (m.actions ?? []).some((g) => g.type === "CallUseCase" && g.useCaseId === i.ref)
    )) return { kind: "EVENT", label: c };
  }
  const o = i.type !== "UNKNOWN" ? i.type : n.get(i.ref) ?? "UNKNOWN";
  return o === "QUERY_SERVICE" || o === "READ_MODEL" ? { kind: "QUERY" } : o === "EXTERNAL_SYSTEM" ? { kind: "EXTERNAL" } : { kind: "COMMAND" };
}
function dn(e, t) {
  const i = no(e), n = ao(e), a = new Map((t.participants ?? []).map((s) => [s.ref, s]));
  return {
    typeOf: (s) => {
      var o, r;
      return (o = a.get(s)) != null && o.type && a.get(s).type !== "UNKNOWN" ? a.get(s).type : i.get(s) ?? ((r = a.get(s)) == null ? void 0 : r.type) ?? "UNKNOWN";
    },
    nameOf: (s) => {
      var o;
      return ((o = a.get(s)) == null ? void 0 : o.name) ?? n.get(s) ?? s;
    }
  };
}
function Yc(e, t, i) {
  const n = Math.max(0, Math.min(e.length, i)), a = [...e];
  return a.splice(n, 0, t), a;
}
function Kc(e, t, i) {
  const n = e.findIndex((o) => o.id === t);
  if (n < 0) return e;
  const a = e.filter((o) => o.id !== t), s = Math.max(0, Math.min(a.length, i));
  return a.splice(s, 0, e[n]), a;
}
function Xc(e, t) {
  return e.filter((i) => i.id !== t);
}
function Qc(e, t) {
  return {
    ...e,
    participants: (e.participants ?? []).filter((i) => i.ref !== t),
    messages: e.messages.filter((i) => i.fromRef !== t && i.toRef !== t)
  };
}
function pa(e, t, i) {
  var r;
  const n = t.fromRef, a = t.toRef, s = i(n), o = i(a);
  switch (t.kind) {
    case "COMMAND": {
      if (s === "USE_CASE" && o === "USE_CASE")
        return (e.useCaseCalls ?? []).some((c) => c.sourceId === n && c.targetId === a);
      if (s === "USE_CASE" && o === "AGGREGATE")
        return (e.aggregateCalls ?? []).some((c) => c.sourceId === n && c.targetId === a);
      if (s === "ACTOR" && (o === "USE_CASE" || o === "QUERY_SERVICE"))
        return (e.actorUses ?? []).some((c) => c.actorId === n && c.targetId === a);
      if (s === "API_OPERATION" && o === "USE_CASE")
        return (e.apis ?? []).some(
          (c) => c.operations.some((p) => p.id === n && p.targetUseCaseId === a)
        );
      if (s === "EXTERNAL_SYSTEM" && o === "USE_CASE")
        return (e.externalCalls ?? []).some(
          (c) => c.externalSystemId === n && c.useCaseId === a
        );
      if ((s === "PAGE" || s === "APP") && o === "USE_CASE") {
        const c = (e.pages ?? []).find((m) => m.id === n);
        if (c && (c.buttons ?? []).some((m) => m.useCaseId === a)) return !0;
        const p = (e.uiApps ?? []).find((m) => m.id === n), h = (m) => (m ?? []).some(
          (g) => g.useCaseId === a || h(g.children)
        );
        return !!p && h(p.menuItems);
      }
      return s === "AI_AGENT" && o === "USE_CASE" ? (e.agentUses ?? []).some((c) => c.agentId === n && c.useCaseId === a) : !1;
    }
    case "QUERY":
      return s === "USE_CASE" && o === "QUERY_SERVICE" ? (e.queryCalls ?? []).some((c) => c.sourceId === n && c.targetId === a) : s === "ACTOR" && o === "QUERY_SERVICE" ? (e.actorUses ?? []).some((c) => c.actorId === n && c.targetId === a) : s === "AI_AGENT" && o === "QUERY_SERVICE" ? (e.agentQueryUses ?? []).some(
        (c) => c.agentId === n && c.queryServiceId === a
      ) : s === "PAGE" && o === "QUERY_SERVICE" ? (e.pages ?? []).some((c) => c.id === n && c.listingQueryServiceId === a) : o === "READ_MODEL" ? (e.projections ?? []).some((c) => c.readModelId === a) : !1;
    case "EVENT": {
      const c = t.label ?? "", p = oo(e, c), h = !!p && [...e.emissions ?? [], ...e.useCaseEmissions ?? []].some(
        (g) => g.sourceId === n && g.domainEventId === p
      ) || // an aggregate-operation emission keyed by NAME (flows reference names, not ids)
      e.flows.some(
        (g) => g.archetype === "TRIGGERS" && g.triggerEvent === c && g.triggerAggregateId === n
      ), m = e.flows.some(
        (g) => g.archetype === "TRIGGERS" && g.triggerEvent === c && g.targetUseCaseId === a
      ) || (e.subscriptions ?? []).some(
        (g) => g.eventName === c && (g.actions ?? []).some((y) => y.type === "CallUseCase" && y.useCaseId === a)
      );
      return h && m;
    }
    case "EXTERNAL": {
      if (s === "USE_CASE" && o === "EXTERNAL_SYSTEM") {
        if ((e.externalUseCaseCalls ?? []).some(
          (h) => h.sourceId === n && h.targetId === a
        )) return !0;
        const p = e.externalSystems.find((h) => h.id === a);
        return !!((r = p == null ? void 0 : p.useCases) != null && r.some(
          (h) => (e.externalUseCaseCalls ?? []).some(
            (m) => m.sourceId === n && m.targetId === h.id
          )
        ));
      }
      return !1;
    }
  }
}
function Jc(e, t, i, n) {
  const a = t.fromRef, s = t.toRef, o = i(a), r = i(s), c = (p) => ({
    commands: [],
    hint: `Este enlace se cablea a mano: ${p}`
  });
  switch (t.kind) {
    case "COMMAND": {
      if (o === "USE_CASE" && r === "USE_CASE")
        return { commands: [{ kind: "add-use-case-call", sourceId: a, targetId: s }] };
      if (o === "USE_CASE" && r === "AGGREGATE")
        return { commands: [{ kind: "add-aggregate-call", sourceId: a, targetId: s }] };
      if (o === "ACTOR" && (r === "USE_CASE" || r === "QUERY_SERVICE"))
        return { commands: [{ kind: "add-actor-use", sourceId: a, targetId: s }] };
      if (o === "API_OPERATION" && r === "USE_CASE") {
        const p = (e.apis ?? []).find((h) => h.operations.some((m) => m.id === a));
        return p ? {
          commands: [
            { kind: "set-api-operation-target", apiId: p.id, id: a, targetUseCaseId: s }
          ]
        } : c("la operación no cuelga de ninguna API del catálogo");
      }
      return c(o === "PAGE" || o === "APP" ? "un botón (o entrada de menú) apuntando al caso de uso, en la ficha de la página/app" : `conecta ${n(a)} → ${n(s)} en el mapa del sistema`);
    }
    case "QUERY":
      return o === "USE_CASE" && r === "QUERY_SERVICE" ? { commands: [{ kind: "add-query-call", sourceId: a, targetId: s }] } : o === "ACTOR" && r === "QUERY_SERVICE" ? { commands: [{ kind: "add-actor-use", sourceId: a, targetId: s }] } : c(o === "PAGE" ? "el listing de la página apuntando al query service, en la ficha de la página" : `conecta ${n(a)} → ${n(s)} en el mapa del sistema`);
    case "EXTERNAL":
      return o === "USE_CASE" && r === "EXTERNAL_SYSTEM" ? { commands: [{ kind: "add-external-uc-call", sourceId: a, targetId: s }] } : c(`conecta ${n(a)} → ${n(s)} en el mapa del sistema`);
    case "EVENT": {
      const p = t.label ?? "";
      if (r !== "USE_CASE")
        return c("el destino de un evento debe ser un caso de uso (la suscripción reacciona)");
      const h = oo(e, p);
      if (!h)
        return c(`el evento «${p}» no existe en el catálogo — créalo primero en su contexto`);
      const m = [];
      if ([...e.emissions ?? [], ...e.useCaseEmissions ?? []].some(
        (b) => b.sourceId === a && b.domainEventId === h
      ) || m.push({ kind: "add-emission", sourceId: a, targetId: h }), !e.flows.some(
        (b) => b.archetype === "TRIGGERS" && b.triggerEvent === p && b.targetUseCaseId === s
      )) {
        const b = Hc(e, s) ?? "";
        m.push({
          kind: "add-flow",
          id: `flow-${ce(p)}-${ce(n(s))}`,
          name: n(s),
          archetype: "TRIGGERS",
          triggerAggregateId: o === "AGGREGATE" ? a : "",
          triggerDomainServiceId: o === "DOMAIN_SERVICE" ? a : void 0,
          triggerUseCaseId: o === "USE_CASE" ? a : void 0,
          triggerEvent: p,
          targetId: b,
          targetUseCaseId: s
        });
      }
      return m.length ? { commands: m } : c("el evento ya está emitido y suscrito — falta asociarlo a este mensaje");
    }
  }
}
function vt(e) {
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
function Zc(e) {
  const t = ii(e), i = new Map(t.map((o, r) => [o.ref, `p${r + 1}`])), n = (o, r = !1) => {
    const c = o.replace(/[\r\n;]+/g, " ").trim();
    return r ? c.replace(/:/g, " -") : c;
  }, a = ["sequenceDiagram"];
  for (const o of t)
    a.push(`  participant ${i.get(o.ref)} as ${n(o.name, !0)}`);
  const s = io(e.messages);
  return e.messages.forEach((o, r) => {
    const c = i.get(o.fromRef), p = i.get(o.toRef);
    if (!c || !p) return;
    const h = o.kind === "EVENT" ? "-->>" : "->>", m = [s[r], o.label ?? "", o.guard ? `[${o.guard}]` : ""].filter(Boolean).join(" ");
    a.push(`  ${c}${h}${p}: ${n(m)}`);
  }), a.join(`
`);
}
function ua(e) {
  const t = [], i = (n, a, s, o, r) => t.push({ ref: n, name: a, label: r ? `${a} (${r})` : a, type: s, group: o });
  for (const n of e.actors ?? []) i(n.id, n.name, "ACTOR", "Actores");
  for (const n of e.uiApps ?? []) i(n.id, n.name, "APP", "Apps");
  for (const n of e.pages ?? []) i(n.id, n.name, "PAGE", "Páginas");
  for (const n of e.boundedContexts) {
    for (const a of n.useCases ?? []) i(a.id, a.name, "USE_CASE", "Casos de uso", n.name);
    for (const a of (e.aggregates ?? []).filter((s) => s.boundedContextId === n.id))
      i(a.id, a.name, "AGGREGATE", "Agregados", n.name);
    for (const a of n.domainServices ?? [])
      i(a.id, a.name, "DOMAIN_SERVICE", "Servicios de dominio", n.name);
    for (const a of n.queryServices ?? [])
      i(a.id, a.name, "QUERY_SERVICE", "Query services", n.name);
    for (const a of n.readModels ?? [])
      i(a.id, a.name, "READ_MODEL", "Read models", n.name);
  }
  for (const n of e.externalSystems) i(n.id, n.name, "EXTERNAL_SYSTEM", "Sistemas externos");
  for (const n of e.apis ?? []) {
    i(n.id, n.name, "API", "APIs");
    for (const a of n.operations)
      i(a.id, `${n.name} · ${a.name}`, "API_OPERATION", "Operaciones API");
  }
  for (const n of e.aiAgents ?? []) i(n.id, n.name, "AI_AGENT", "Agentes");
  for (const n of e.processes ?? []) i(n.id, n.name, "PROCESS", "Procesos");
  for (const n of e.workflows ?? []) i(n.id, n.name, "WORKFLOW", "Workflows");
  return t;
}
function ep(e) {
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
function tp(e, t) {
  var i, n, a, s, o, r, c, p, h, m, g, y, b;
  switch (t.kind) {
    case "add-relation":
      return [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-relation": {
      const l = e.model.relations.find(
        (d) => d.sourceId === t.sourceId && d.targetId === t.targetId
      );
      return l && l.type ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: l.type }] : null;
    }
    case "set-relation-type": {
      const l = e.model.relations.find(
        (d) => d.sourceId === t.sourceId && d.targetId === t.targetId
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
      const l = (e.model.uiApps ?? []).find((d) => d.id === t.appId);
      return [{ kind: "set-app-header-page", appId: t.appId, pageId: (l == null ? void 0 : l.headerPageId) ?? null }];
    }
    case "set-app-model": {
      const l = (e.model.uiApps ?? []).find((d) => d.id === t.appId);
      return [{ kind: "set-app-model", appId: t.appId, modelId: (l == null ? void 0 : l.modelId) ?? null }];
    }
    case "add-model":
      return [{ kind: "remove-model", id: t.id }];
    case "add-model-mapping":
      return [{ kind: "remove-model-mapping", id: t.id }];
    case "remove-model-mapping": {
      const l = (e.model.modelMappings ?? []).find((d) => d.id === t.id);
      return !(l != null && l.sourceModelId) || !l.targetModelId ? null : [{
        kind: "add-model-mapping",
        id: l.id,
        name: l.name,
        sourceId: l.sourceModelId,
        targetId: l.targetModelId
      }];
    }
    case "remove-model": {
      const l = (e.model.models ?? []).find((f) => f.id === t.id);
      if (!l) return null;
      const d = [{ kind: "add-model", id: l.id, name: l.name }];
      for (const f of e.model.pages ?? []) {
        f.modelId === t.id && d.push({ kind: "set-page-model", pageId: f.id, modelId: t.id });
        const _ = (E) => {
          for (const A of E ?? [])
            A.modelId === t.id && d.push({ kind: "set-page-component", pageId: f.id, componentId: A.id, modelId: t.id }), _(A.children);
        };
        _(f.content);
      }
      for (const f of e.model.uiApps ?? [])
        f.modelId === t.id && d.push({ kind: "set-app-model", appId: f.id, modelId: t.id });
      return d;
    }
    case "set-crud-detail":
    case "set-crud-create": {
      const l = (e.model.pages ?? []).find((f) => f.id === t.pageId), d = t.kind === "set-crud-detail";
      return [{
        kind: t.kind,
        pageId: t.pageId,
        targetId: (d ? l == null ? void 0 : l.crudDetailPageId : l == null ? void 0 : l.crudCreatePageId) ?? null,
        toAppId: (d ? l == null ? void 0 : l.crudDetailAppId : l == null ? void 0 : l.crudCreateAppId) ?? null
      }];
    }
    case "set-app-view-page": {
      const l = (e.model.uiApps ?? []).find((d) => d.id === t.appId);
      return [{ kind: "set-app-view-page", appId: t.appId, pageId: (l == null ? void 0 : l.viewPageId) ?? null }];
    }
    case "set-app-edit-page": {
      const l = (e.model.uiApps ?? []).find((d) => d.id === t.appId);
      return [{ kind: "set-app-edit-page", appId: t.appId, pageId: (l == null ? void 0 : l.editPageId) ?? null }];
    }
    case "set-app-home-page": {
      const l = (e.model.uiApps ?? []).find((d) => d.id === t.appId);
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
      const l = (((i = (e.model.pages ?? []).find((d) => d.id === t.pageId)) == null ? void 0 : i.wizardSteps) ?? []).find((d) => (d.id ?? d.pageId) === t.itemId);
      return l ? [{ kind: "set-wizard-step-page", pageId: t.pageId, itemId: t.itemId, targetId: l.pageId ?? null }] : null;
    }
    case "move-page-wizard-step": {
      const l = (((n = (e.model.pages ?? []).find((f) => f.id === t.pageId)) == null ? void 0 : n.wizardSteps) ?? []).map((f) => f.id ?? f.pageId), d = l.indexOf(t.targetId);
      return d < 0 ? null : [{
        kind: "move-page-wizard-step",
        pageId: t.pageId,
        targetId: t.targetId,
        beforeItemId: l[d + 1] ?? null
      }];
    }
    case "remove-page-wizard-step": {
      const l = (((a = (e.model.pages ?? []).find((d) => d.id === t.pageId)) == null ? void 0 : a.wizardSteps) ?? []).find((d) => (d.id ?? d.pageId) === t.targetId);
      return l ? [{
        kind: "add-page-wizard-step",
        pageId: t.pageId,
        targetId: l.pageId ?? null,
        label: l.label,
        itemId: l.id
      }] : null;
    }
    case "delete-ui-app": {
      const l = (e.model.uiApps ?? []).find((_) => _.id === t.id);
      if (!l) return null;
      const d = [{ kind: "create-ui-app", id: l.id, name: l.name, type: l.type }];
      l.headerPageId && d.push({ kind: "set-app-header-page", appId: l.id, pageId: l.headerPageId }), l.modelId && d.push({ kind: "set-app-model", appId: l.id, modelId: l.modelId }), l.viewPageId && d.push({ kind: "set-app-view-page", appId: l.id, pageId: l.viewPageId }), l.editPageId && d.push({ kind: "set-app-edit-page", appId: l.id, pageId: l.editPageId }), (l.homePageId || l.homeAppId) && d.push({
        kind: "set-app-home-page",
        appId: l.id,
        pageId: l.homePageId ?? null,
        toAppId: l.homeAppId ?? null
      });
      const f = (_, E) => {
        for (const A of _ ?? [])
          d.push({
            kind: "add-menu-item",
            appId: l.id,
            label: A.label,
            itemId: A.id,
            parentId: E == null ? void 0 : E.id,
            parentLabel: E && !E.id ? E.label : void 0,
            pageId: A.pageId ?? null
          }), A.uiAdapterId && d.push({ kind: "set-menu-app", appId: l.id, toAppId: A.uiAdapterId, itemId: A.id, label: A.label }), A.useCaseId && d.push({ kind: "set-menu-use-case", appId: l.id, useCaseId: A.useCaseId, itemId: A.id, label: A.label }), A.aggregateId && d.push({ kind: "set-menu-aggregate", appId: l.id, aggregateId: A.aggregateId, itemId: A.id, label: A.label }), A.queryOperationId && d.push({
            kind: "set-menu-query-operation",
            appId: l.id,
            queryServiceId: A.queryServiceId ?? null,
            queryOperationId: A.queryOperationId,
            itemId: A.id,
            label: A.label
          }), f(A.children, A);
      };
      f(l.menuItems);
      for (const _ of e.model.actorAppUses ?? [])
        _.appId === t.id && d.push({ kind: "add-actor-app", actorId: _.actorId, appId: t.id });
      return d;
    }
    case "delete-ui-page": {
      const l = (e.model.pages ?? []).find((f) => f.id === t.id);
      if (!l) return null;
      const d = [
        { kind: "create-ui-page", id: l.id, name: l.name, pageType: l.type ?? "FORM" }
      ];
      l.route && d.push({ kind: "set-page-route", pageId: l.id, path: l.route }), l.modelId && d.push({ kind: "set-page-model", pageId: l.id, modelId: l.modelId }), l.listingQueryServiceId && d.push({ kind: "set-page-listing", pageId: l.id, queryServiceId: l.listingQueryServiceId });
      for (const f of l.buttons ?? [])
        f.useCaseId && (d.push({ kind: "add-page-button", pageId: l.id, useCaseId: f.useCaseId, label: f.label }), f.mappingId && d.push({
          kind: "set-page-button",
          pageId: l.id,
          useCaseId: f.useCaseId,
          label: f.label ?? null,
          mappingId: f.mappingId
        }));
      for (const f of l.viewmodelFields ?? [])
        (f.stereotype || f.colspan || f.label) && d.push({
          kind: "set-page-field-config",
          pageId: l.id,
          fieldId: f.fieldId,
          stereotype: f.stereotype ?? null,
          colspan: f.colspan ?? null,
          label: f.label ?? null
        });
      (l.viewmodelFields ?? []).length && d.push({
        kind: "set-page-field-order",
        pageId: l.id,
        fieldIds: (l.viewmodelFields ?? []).map((f) => f.fieldId)
      });
      for (const f of l.content ?? [])
        d.push(...e.rebuildComponentOps(l.id, f, void 0, null).ops);
      for (const f of l.wizardSteps ?? [])
        d.push({
          kind: "add-page-wizard-step",
          pageId: l.id,
          targetId: f.pageId ?? null,
          label: f.label,
          itemId: f.id
        });
      return (l.crudDetailPageId || l.crudDetailAppId) && d.push({ kind: "set-crud-detail", pageId: l.id, targetId: l.crudDetailPageId ?? null, toAppId: l.crudDetailAppId ?? null }), (l.crudCreatePageId || l.crudCreateAppId) && d.push({ kind: "set-crud-create", pageId: l.id, targetId: l.crudCreatePageId ?? null, toAppId: l.crudCreateAppId ?? null }), d;
    }
    case "add-menu-item":
      return [{ kind: "remove-menu-item", appId: t.appId, itemId: t.itemId, label: t.label }];
    case "remove-menu-item":
    case "set-menu-page":
    case "set-menu-app":
    case "set-menu-use-case":
    case "set-menu-aggregate":
    case "set-menu-query-operation": {
      const l = (e.model.uiApps ?? []).find((_) => _.id === t.appId), d = (_) => {
        for (const E of _ ?? []) {
          if (t.itemId ? E.id === t.itemId : E.label === t.label) return E;
          const A = d(E.children);
          if (A) return A;
        }
        return null;
      }, f = t.itemId || t.label ? d(l == null ? void 0 : l.menuItems) : null;
      return f ? t.kind === "remove-menu-item" ? [{
        kind: "add-menu-item",
        appId: t.appId,
        label: f.label,
        pageId: f.pageId ?? null,
        itemId: f.id
      }] : t.kind === "set-menu-app" ? [{
        kind: "set-menu-app",
        appId: t.appId,
        toAppId: f.uiAdapterId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-use-case" ? [{
        kind: "set-menu-use-case",
        appId: t.appId,
        useCaseId: f.useCaseId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-aggregate" ? [{
        kind: "set-menu-aggregate",
        appId: t.appId,
        aggregateId: f.aggregateId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-query-operation" ? [{
        kind: "set-menu-query-operation",
        appId: t.appId,
        queryServiceId: f.queryServiceId ?? null,
        queryOperationId: f.queryOperationId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : [{
        kind: "set-menu-page",
        appId: t.appId,
        pageId: f.pageId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : null;
    }
    case "add-page-button":
      return [{ kind: "remove-page-button", pageId: t.pageId, useCaseId: t.useCaseId }];
    case "remove-page-button": {
      const l = (e.model.pages ?? []).find((f) => f.id === t.pageId), d = ((l == null ? void 0 : l.buttons) ?? []).find((f) => f.useCaseId === t.useCaseId);
      return d ? [{ kind: "add-page-button", pageId: t.pageId, useCaseId: t.useCaseId, label: d.label }] : null;
    }
    case "rename-ui-page": {
      const l = (e.model.pages ?? []).find((d) => d.id === t.pageId);
      return l ? [{ kind: "rename-ui-page", pageId: t.pageId, name: l.name }] : null;
    }
    case "set-page-type": {
      const l = (e.model.pages ?? []).find((d) => d.id === t.pageId);
      return l ? [{ kind: "set-page-type", pageId: t.pageId, pageType: l.type ?? "FORM" }] : null;
    }
    case "set-page-route": {
      const l = (e.model.pages ?? []).find((d) => d.id === t.pageId);
      return l != null && l.route ? [{ kind: "set-page-route", pageId: t.pageId, path: l.route }] : null;
    }
    case "set-page-button": {
      const l = (e.model.pages ?? []).find((f) => f.id === t.pageId), d = ((l == null ? void 0 : l.buttons) ?? []).find((f) => f.useCaseId === t.useCaseId);
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
      const l = (e.model.pages ?? []).find((O) => O.id === t.pageId);
      let d = null, f = null, _ = null;
      const E = (O, C) => {
        var G;
        const N = O ?? [];
        for (let j = 0; j < N.length; j++)
          N[j].id === t.componentId && (d = N[j], f = C, _ = ((G = N[j + 1]) == null ? void 0 : G.id) ?? null), E(N[j].children, N[j]);
      };
      if (E(l == null ? void 0 : l.content, null), !d) return null;
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
        parentComponentId: f === null ? null : f.id,
        beforeComponentId: _
      }] : e.rebuildComponentOps(
        t.pageId,
        A,
        f === null ? void 0 : f.id,
        _
      ).ops;
    }
    case "set-page-listing": {
      const l = (e.model.pages ?? []).find((d) => d.id === t.pageId);
      return [{ kind: "set-page-listing", pageId: t.pageId, queryServiceId: (l == null ? void 0 : l.listingQueryServiceId) ?? null }];
    }
    case "set-page-model": {
      const l = (e.model.pages ?? []).find((d) => d.id === t.pageId);
      return [{ kind: "set-page-model", pageId: t.pageId, modelId: (l == null ? void 0 : l.modelId) ?? null }];
    }
    case "set-page-field-config": {
      const l = (((s = (e.model.pages ?? []).find((d) => d.id === t.pageId)) == null ? void 0 : s.viewmodelFields) ?? []).find((d) => d.fieldId === t.fieldId);
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
      const l = (((o = (e.model.pages ?? []).find((d) => d.id === t.pageId)) == null ? void 0 : o.viewmodelFields) ?? []).map((d) => d.fieldId);
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
      const l = e.model.boundedContexts.find((f) => f.id === t.id);
      if (!l) return null;
      const d = e.model.relations.filter(
        (f) => (f.sourceId === t.id || f.targetId === t.id) && f.type != null
      );
      return [
        { kind: "add-boundedContext", id: l.id, name: l.name, subdomainType: l.subdomainType ?? "GENERIC" },
        // Re-annotate the derived pairs this boundedContext participated in.
        ...d.map(
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
      return [{ kind: "remove-aggregate", id: t.id }];
    case "remove-aggregate": {
      const l = (e.model.aggregates ?? []).find((d) => d.id === t.id);
      return l ? [{ kind: "add-aggregate", id: l.id, name: l.name, boundedContextId: l.boundedContextId }] : null;
    }
    case "add-domain-event":
      return [{ kind: "remove-domain-event", id: t.id }];
    case "add-query-service":
      return [{ kind: "remove-query-service", id: t.id }];
    case "remove-query-service": {
      for (const l of e.model.boundedContexts) {
        const d = (l.queryServices ?? []).find((f) => f.id === t.id);
        if (d) return [{ kind: "add-query-service", id: d.id, name: d.name, boundedContextId: l.id }];
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
        (d) => d.sourceId === t.sourceId && d.targetId === t.targetId
      );
      return l ? [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: l.type }] : [{ kind: "remove-external-dependency", sourceId: t.sourceId, targetId: t.targetId }];
    }
    case "remove-external-dependency": {
      const l = (e.model.externalSystemDependencies ?? []).find(
        (d) => d.sourceId === t.sourceId && d.targetId === t.targetId
      );
      return [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: l == null ? void 0 : l.type }];
    }
    case "add-proxy-api":
      return [{ kind: "remove-proxy-api", id: t.id }];
    case "remove-proxy-api": {
      const l = (e.model.proxyApis ?? []).find((d) => d.id === t.id);
      return l ? [{
        kind: "add-proxy-api",
        id: l.id,
        name: l.name,
        targetId: l.targetApiId,
        boundedContextId: l.publishedByExternalSystemId
      }] : null;
    }
    case "set-proxy-target": {
      const l = (e.model.proxyApis ?? []).find((d) => d.id === t.id);
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
        (d) => d.apiId === t.apiId && d.operationId === t.operationId && d.boundedContextId === t.boundedContextId
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
        (d) => d.apiId === t.apiId && d.operationId === t.operationId && d.boundedContextId === t.boundedContextId
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
      const l = (e.model.apis ?? []).find((d) => d.id === t.id) ?? (e.model.proxyApis ?? []).find((d) => d.id === t.id);
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
        const d = (l.useCases ?? []).find((f) => f.id === t.id);
        if (d)
          return [
            { kind: "add-use-case", id: d.id, name: d.name, boundedContextId: l.id, policy: d.policy }
          ];
      }
      return null;
    }
    case "add-external-use-case":
      return [{ kind: "remove-external-use-case", id: t.id }];
    case "remove-external-use-case": {
      for (const l of e.model.externalSystems) {
        const d = (l.useCases ?? []).find((f) => f.id === t.id);
        if (d)
          return [{ kind: "add-external-use-case", id: d.id, name: d.name, boundedContextId: l.id }];
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
      const l = (e.model.notifications ?? []).find((f) => f.id === t.id);
      if (!(l != null && l.ownerBoundedContextId)) return null;
      const d = [
        { kind: "add-notification", id: l.id, name: l.name, boundedContextId: l.ownerBoundedContextId, type: (l.channels ?? [])[0] }
      ];
      l.eventId && d.push({ kind: "set-notification-event", id: l.id, targetId: l.eventId });
      for (const f of l.recipientRoleIds ?? []) d.push({ kind: "add-notification-recipient", id: l.id, roleId: f });
      return d;
    }
    case "set-notification-event": {
      const l = (e.model.notifications ?? []).find((d) => d.id === t.id);
      return [{ kind: "set-notification-event", id: t.id, targetId: (l == null ? void 0 : l.eventId) ?? null }];
    }
    case "add-notification-recipient":
      return [{ kind: "remove-notification-recipient", id: t.id, roleId: t.roleId }];
    case "remove-notification-recipient":
      return [{ kind: "add-notification-recipient", id: t.id, roleId: t.roleId }];
    case "add-document":
      return [{ kind: "remove-document", id: t.id }];
    case "remove-document": {
      const l = (e.model.documents ?? []).find((f) => f.id === t.id);
      if (!(l != null && l.ownerBoundedContextId)) return null;
      const d = [
        { kind: "add-document", id: l.id, name: l.name, boundedContextId: l.ownerBoundedContextId, type: l.kind }
      ];
      return l.modelId && d.push({ kind: "set-document-model", id: l.id, modelId: l.modelId }), l.queryServiceId && d.push({ kind: "set-document-query", id: l.id, queryServiceId: l.queryServiceId, queryOperationId: l.queryOperationId ?? null }), d;
    }
    case "set-document-model": {
      const l = (e.model.documents ?? []).find((d) => d.id === t.id);
      return [{ kind: "set-document-model", id: t.id, modelId: (l == null ? void 0 : l.modelId) ?? null }];
    }
    case "set-document-query": {
      const l = (e.model.documents ?? []).find((d) => d.id === t.id);
      return [{ kind: "set-document-query", id: t.id, queryServiceId: (l == null ? void 0 : l.queryServiceId) ?? null, queryOperationId: (l == null ? void 0 : l.queryOperationId) ?? null }];
    }
    case "add-identity-provider":
      return [{ kind: "remove-identity-provider", id: t.id }];
    case "remove-identity-provider": {
      const l = (e.model.identityProviders ?? []).find((f) => f.id === t.id);
      if (!l) return null;
      const d = [
        { kind: "add-identity-provider", id: l.id, name: l.name, type: l.type }
      ];
      l.publishedByExternalSystemId && d.push({ kind: "set-idp-publisher", id: l.id, targetId: l.publishedByExternalSystemId });
      for (const f of e.model.boundedContexts)
        f.identityProviderId === t.id && d.push({ kind: "set-identity-provider", id: f.id, targetId: t.id });
      for (const f of e.model.uiApps ?? [])
        f.identityProviderId === t.id && d.push({ kind: "set-identity-provider", id: f.id, targetId: t.id });
      for (const f of e.model.etlFlows ?? [])
        f.identityProviderId === t.id && d.push({ kind: "set-identity-provider", id: f.id, targetId: t.id });
      return d;
    }
    case "set-idp-publisher": {
      const l = (e.model.identityProviders ?? []).find((d) => d.id === t.id);
      return [{ kind: "set-idp-publisher", id: t.id, targetId: (l == null ? void 0 : l.publishedByExternalSystemId) ?? null }];
    }
    case "set-identity-provider": {
      const l = ((r = e.model.boundedContexts.find((d) => d.id === t.id)) == null ? void 0 : r.identityProviderId) ?? ((c = (e.model.uiApps ?? []).find((d) => d.id === t.id)) == null ? void 0 : c.identityProviderId) ?? ((p = (e.model.etlFlows ?? []).find((d) => d.id === t.id)) == null ? void 0 : p.identityProviderId) ?? null;
      return [{ kind: "set-identity-provider", id: t.id, targetId: l }];
    }
    case "add-etl-flow":
      return [{ kind: "remove-etl-flow", id: t.id }];
    case "remove-etl-flow": {
      const l = (e.model.etlFlows ?? []).find((d) => d.id === t.id);
      return !l || !l.ownerBoundedContextId ? null : [
        { kind: "add-etl-flow", id: l.id, name: l.name, boundedContextId: l.ownerBoundedContextId },
        ...(l.steps ?? []).map((d) => ({
          kind: "add-etl-step",
          etlFlowId: l.id,
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
      const l = (((h = (e.model.etlFlows ?? []).find((d) => d.id === t.etlFlowId)) == null ? void 0 : h.steps) ?? []).find((d) => d.id === t.id);
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
        (f) => (f.scheduledTriggers ?? []).some((_) => _.id === t.id)
      ), d = ((l == null ? void 0 : l.scheduledTriggers) ?? []).find((f) => f.id === t.id);
      return !l || !d ? null : [{
        kind: "add-scheduled-trigger",
        id: d.id,
        name: d.name,
        boundedContextId: l.id,
        cronExpression: d.cronExpression,
        targetUseCaseId: d.useCaseId
      }];
    }
    case "set-scheduled-trigger-target": {
      const l = e.model.boundedContexts.flatMap((d) => d.scheduledTriggers ?? []).find((d) => d.id === t.id);
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
      const l = e.model.externalSystems.find((d) => d.id === t.id);
      return l ? [{ kind: "add-external-system", id: l.id, name: l.name }] : null;
    }
    case "add-ai-agent":
      return [{ kind: "remove-ai-agent", id: t.id }];
    case "remove-ai-agent": {
      const l = (e.model.aiAgents ?? []).find((d) => d.id === t.id);
      return l ? [
        { kind: "add-ai-agent", id: l.id, name: l.name, external: l.external },
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
      const l = (e.model.mcpGateways ?? []).find((d) => d.id === t.id);
      return l ? [
        { kind: "add-mcp-gateway", id: l.id, name: l.name },
        ...[
          ...l.mcpServerIds ?? [],
          ...l.apiIds ?? [],
          ...l.apiOperationIds ?? [],
          ...l.useCaseIds ?? [],
          ...l.ragIds ?? []
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
      for (const l of e.model.externalSystems) {
        const d = (l.mcpServers ?? []).find((f) => f.id === t.id);
        if (d)
          return [
            { kind: "add-mcp-server", id: d.id, name: d.name, boundedContextId: l.id, uri: d.uri },
            ...(e.model.agentMcpUses ?? []).filter((f) => f.mcpServerId === t.id).map(
              (f) => ({
                kind: "add-agent-mcp",
                sourceId: f.agentId,
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
      const l = (e.model.rags ?? []).find((d) => d.id === t.id);
      return l ? [
        { kind: "add-rag", id: l.id, name: l.name },
        ...(e.model.agentRags ?? []).filter((d) => d.ragId === t.id).map(
          (d) => ({
            kind: "add-agent-rag",
            sourceId: d.agentId,
            targetId: t.id
          })
        ),
        ...(l.sourceReadModelIds ?? []).map(
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
      const l = (e.model.actors ?? []).find((d) => d.id === t.id);
      return l ? [{ kind: "add-actor", id: l.id, name: l.name }] : null;
    }
    case "add-note":
      return [{ kind: "remove-note", id: t.id }];
    case "remove-note": {
      const l = (e.model.notes ?? []).find((d) => d.id === t.id);
      return l ? [
        { kind: "add-note", id: l.id, name: l.text },
        ...[...l.targetIds ?? [], ...l.edgeRefs ?? []].map(
          (d) => ({ kind: "note-attach", id: l.id, targetId: d })
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
      const l = (e.model.urls ?? []).find((d) => d.id === t.id);
      return l ? [
        { kind: "add-url", id: l.id, name: l.name, uri: l.url },
        ...(e.model.services ?? []).filter((d) => (d.urlIds ?? []).includes(t.id)).map((d) => ({ kind: "add-service-url", serviceId: d.id, id: t.id }))
      ] : null;
    }
    case "add-service-url":
      return [{ kind: "remove-service-url", serviceId: t.serviceId, id: t.id }];
    case "remove-service-url":
      return [{ kind: "add-service-url", serviceId: t.serviceId, id: t.id }];
    case "remove-area": {
      const l = (e.model.areas ?? []).find((d) => d.id === t.id);
      return l ? [{ kind: "add-area", id: l.id, name: l.name }] : null;
    }
    case "add-application-event":
      return [{ kind: "remove-application-event", id: t.id }];
    case "remove-application-event": {
      for (const l of e.model.boundedContexts) {
        const d = (l.applicationEvents ?? []).find((f) => f.id === t.id);
        if (d)
          return [{ kind: "add-application-event", id: d.id, name: d.name, boundedContextId: l.id }];
      }
      return null;
    }
    case "add-domain-service":
      return [{ kind: "remove-domain-service", id: t.id }];
    case "remove-domain-service": {
      for (const l of e.model.boundedContexts) {
        const d = (l.domainServices ?? []).find((f) => f.id === t.id);
        if (d) return [{ kind: "add-domain-service", id: d.id, name: d.name, boundedContextId: l.id }];
      }
      return null;
    }
    case "add-read-model":
      return [{ kind: "remove-read-model", id: t.id }];
    case "add-projection":
      return [{ kind: "remove-projection", id: t.id }];
    case "remove-projection": {
      const l = (e.model.projections ?? []).find((d) => d.id === t.id);
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
        const d = (l.tables ?? []).find((f) => f.id === t.id);
        if (d) return [{ kind: "add-external-table", id: d.id, name: d.name, boundedContextId: l.id }];
      }
      return null;
    }
    case "add-rag-content-source":
      return [{ kind: "remove-rag-content-source", sourceId: t.sourceId, uri: t.uri }];
    case "remove-rag-content-source": {
      const l = (g = (m = (e.model.rags ?? []).find((d) => d.id === t.sourceId)) == null ? void 0 : m.contentSources) == null ? void 0 : g.find((d) => d.uri === t.uri);
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
      const l = (e.model.apis ?? []).find((d) => d.id === t.id);
      return l ? [
        { kind: "add-api", id: l.id, name: l.name },
        ...l.operations.map(
          (d) => ({
            kind: "add-api-operation",
            apiId: l.id,
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
      const l = (y = (e.model.apis ?? []).find((d) => d.id === t.apiId)) == null ? void 0 : y.operations.find((d) => d.id === t.id);
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
      const l = (b = (e.model.apis ?? []).find((d) => d.id === t.apiId)) == null ? void 0 : b.operations.find((d) => d.id === t.id);
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
        const d = (l.readModels ?? []).find((f) => f.id === t.id);
        if (d != null && d.aggregateId)
          return [{ kind: "add-read-model", id: d.id, name: d.name, aggregateId: d.aggregateId }];
      }
      return null;
    }
    case "remove-domain-event": {
      for (const l of e.model.boundedContexts) {
        const d = (l.domainEvents ?? []).find((f) => f.id === t.id);
        if (d) return [{ kind: "add-domain-event", id: d.id, name: d.name, boundedContextId: l.id }];
      }
      return null;
    }
    case "rename-element": {
      const d = (t.type === "boundedContext" ? e.model.boundedContexts : t.type === "aggregate" ? e.model.aggregates ?? [] : t.type === "domain-event" ? e.model.boundedContexts.flatMap((f) => f.domainEvents ?? []) : t.type === "read-model" ? e.model.boundedContexts.flatMap((f) => f.readModels ?? []) : t.type === "domain-service" ? e.model.boundedContexts.flatMap((f) => f.domainServices ?? []) : t.type === "query-service" ? e.model.boundedContexts.flatMap((f) => f.queryServices ?? []) : t.type === "use-case" ? e.model.boundedContexts.flatMap((f) => f.useCases ?? []) : t.type === "external-use-case" ? e.model.externalSystems.flatMap((f) => f.useCases ?? []) : t.type === "mcp-server" ? e.model.externalSystems.flatMap((f) => f.mcpServers ?? []) : t.type === "application-event" ? e.model.boundedContexts.flatMap((f) => f.applicationEvents ?? []) : t.type === "external-system" ? e.model.externalSystems : t.type === "actor" ? e.model.actors ?? [] : t.type === "ai-agent" ? e.model.aiAgents ?? [] : t.type === "mcp-gateway" ? e.model.mcpGateways ?? [] : e.model.entities ?? []).find((f) => f.id === t.id);
      return d ? [{ kind: "rename-element", type: t.type, id: t.id, name: d.name }] : null;
    }
    case "add-flow":
      return [{ kind: "remove-flow", id: t.id }];
    case "remove-flow": {
      const l = e.model.flows.find((d) => d.id === t.id);
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
    case "add-view":
      return [{ kind: "remove-view", id: t.id }];
    case "remove-view": {
      const l = (e.model.views ?? []).find((d) => d.id === t.id);
      return l ? [{ kind: "add-view", id: l.id, name: l.name, memberIds: l.memberIds }] : null;
    }
    case "add-process":
      return [{ kind: "remove-process", id: t.id }];
    case "add-process-step":
      return [{ kind: "remove-process-step", processId: t.processId, id: t.id }];
    case "remove-process-step": {
      const l = (e.model.processes ?? []).find((_) => _.id === t.processId), d = (l == null ? void 0 : l.steps.findIndex((_) => _.id === t.id)) ?? -1;
      if (!l || d < 0) return null;
      const f = l.steps[d];
      return [
        {
          kind: "add-process-step",
          processId: t.processId,
          id: f.id,
          name: f.name,
          stepType: f.type,
          roleId: f.roleId,
          deadline: f.deadline,
          useCaseId: f.useCaseId,
          compensationUseCaseId: f.compensationUseCaseId,
          afterStepId: d > 0 ? l.steps[d - 1].id : void 0
        }
      ];
    }
    case "move-process-step": {
      const l = (e.model.processes ?? []).find((f) => f.id === t.processId), d = (l == null ? void 0 : l.steps.findIndex((f) => f.id === t.id)) ?? -1;
      return !l || d < 0 ? null : [
        {
          kind: "move-process-step",
          processId: t.processId,
          id: t.id,
          afterStepId: d > 0 ? l.steps[d - 1].id : void 0
        }
      ];
    }
    case "update-process-step": {
      const l = (e.model.processes ?? []).find((f) => f.id === t.processId), d = l == null ? void 0 : l.steps.find((f) => f.id === t.id);
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
      const l = (e.model.processes ?? []).find((d) => d.id === t.id);
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
      const l = (e.model.workflows ?? []).find((d) => d.id === t.id);
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
      const l = (e.model.workflows ?? []).find((_) => _.id === t.workflowId), d = (l == null ? void 0 : l.steps.findIndex((_) => _.id === t.id)) ?? -1;
      if (!l || d < 0) return null;
      const f = l.steps[d];
      return [
        {
          kind: "add-workflow-step",
          workflowId: t.workflowId,
          id: f.id,
          name: f.name,
          emittedEventName: f.emittedEventName,
          targetUseCaseId: f.targetUseCaseId,
          completionEventName: f.completionEventName,
          dependsOnStepIds: f.dependsOnStepIds,
          afterStepId: d > 0 ? l.steps[d - 1].id : void 0
        },
        // Removing a step also strips it from its dependents; restore those edges.
        ...l.steps.filter((_) => _.id !== t.id && (_.dependsOnStepIds ?? []).includes(t.id)).map(
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
      const l = (e.model.workflows ?? []).find((f) => f.id === t.workflowId), d = l == null ? void 0 : l.steps.find((f) => f.id === t.id);
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
      const l = (e.model.workflows ?? []).find((d) => d.id === t.id);
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
    case "save-interaction": {
      const l = (e.model.interactions ?? []).find((d) => d.id === t.id);
      return l ? [vt(l)] : [{ kind: "remove-interaction", id: t.id }];
    }
    case "remove-interaction": {
      const l = (e.model.interactions ?? []).find((d) => d.id === t.id);
      return l ? [vt(l)] : null;
    }
  }
  return null;
}
const ip = [
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
function Ni(e, t, i) {
  return Object.entries(wa).map(([n, a]) => ({
    id: `archimate:${n}`,
    label: `${a} — ArchiMate`,
    hint: `Relación ArchiMate «${a}» de documentación entre estos dos elementos`,
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
function np(e, t, i) {
  const n = e.model, a = [], s = (C, N) => a.push({ id: C, apply: N }), o = new Set(n.boundedContexts.flatMap((C) => (C.useCases ?? []).map((N) => N.id))), r = new Set(n.boundedContexts.flatMap((C) => (C.queryServices ?? []).map((N) => N.id))), c = new Set(n.boundedContexts.flatMap((C) => (C.domainEvents ?? []).map((N) => N.id))), p = new Set(n.boundedContexts.flatMap((C) => (C.applicationEvents ?? []).map((N) => N.id))), h = /* @__PURE__ */ new Set([
    ...(n.aggregates ?? []).map((C) => C.id),
    ...n.boundedContexts.flatMap((C) => (C.domainServices ?? []).map((N) => N.id))
  ]), m = new Set(n.externalSystems.flatMap((C) => (C.useCases ?? []).map((N) => N.id))), g = (C) => (n.aiAgents ?? []).some((N) => N.id === C), y = (C) => (n.actors ?? []).some((N) => N.id === C), b = (C) => n.externalSystems.some((N) => N.id === C), l = (C) => n.boundedContexts.some((N) => N.id === C), d = (C) => (n.aggregates ?? []).some((N) => N.id === C), f = new Set((n.uis ?? []).map((C) => C.id)), _ = new Set((n.uiApps ?? []).map((C) => C.id)), E = new Set((n.pages ?? []).map((C) => C.id));
  {
    const C = f.has(t) ? t : f.has(i) ? i : null, N = C === t ? i : t;
    C && l(N) && s("ui-composition", () => {
      e.command({ kind: "set-ui-context", id: C, boundedContextId: N });
    });
  }
  {
    const C = f.has(t) ? t : f.has(i) ? i : null, N = C === t ? i : t;
    C && y(N) && s("ui-serving", () => {
      e.command({ kind: "add-ui-serving", id: C, targetId: N });
    });
  }
  {
    const C = f.has(t) ? t : f.has(i) ? i : null, N = C === t ? i : t;
    C && (_.has(N) || E.has(N)) && s("ui-assignment", () => {
      e.command({ kind: "add-ui-assignment", id: C, targetId: N });
    });
  }
  if (o.has(t) && o.has(i) && t !== i && s("uc-call", () => {
    (n.useCaseCalls ?? []).some((C) => C.sourceId === t && C.targetId === i) || e.command({ kind: "add-use-case-call", sourceId: t, targetId: i });
  }), o.has(t) && r.has(i) && s("query-call", () => {
    (n.queryCalls ?? []).some((C) => C.sourceId === t && C.targetId === i) || e.command({ kind: "add-query-call", sourceId: t, targetId: i });
  }), o.has(t) && d(i) && s("aggregate-call", () => {
    (n.aggregateCalls ?? []).some((C) => C.sourceId === t && C.targetId === i) || e.command({ kind: "add-aggregate-call", sourceId: t, targetId: i });
  }), (h.has(t) && c.has(i) || o.has(t) && p.has(i)) && s("emission", () => {
    (n.emissions ?? []).some((C) => C.sourceId === t && C.domainEventId === i) || e.command({ kind: "add-emission", sourceId: t, targetId: i });
  }), (c.has(t) || p.has(t)) && o.has(i) && s("flow-triggers", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), (c.has(t) || p.has(t)) && (l(i) || n.boundedContexts.some((C) => (C.readModels ?? []).some((N) => N.id === i))) && s("flow-materializes", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), y(t) && ((o.has(i) || r.has(i) || d(i) || g(i)) && s("actor-use", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), b(i) && s("ext-dep", () => {
    (n.actorExternalDependencies ?? []).some((C) => C.actorId === t && C.externalSystemId === i) || e.command({ kind: "add-actor-external", sourceId: t, targetId: i });
  })), b(t) && (b(i) && t !== i && s("ext-dep", () => {
    (n.externalSystemDependencies ?? []).some((C) => C.sourceId === t && C.targetId === i) || e.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
  }), ((n.apis ?? []).some((C) => C.id === i) || (n.proxyApis ?? []).some((C) => C.id === i)) && s("ext-dep", () => {
    (n.externalSystemDependencies ?? []).some((C) => C.sourceId === t && C.targetId === i) || e.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
  }), o.has(i) && s("external-call", () => {
    (n.externalCalls ?? []).some((C) => C.externalSystemId === t && C.useCaseId === i) || e.command({ kind: "add-external-call", sourceId: t, targetId: i });
  })), o.has(t) && m.has(i) && s("external-uc-call", () => {
    (n.externalUseCaseCalls ?? []).some((C) => C.sourceId === t && C.targetId === i) || e.command({ kind: "add-external-uc-call", sourceId: t, targetId: i });
  }), g(t)) {
    const C = new Set(n.externalSystems.flatMap((G) => (G.mcpServers ?? []).map((j) => j.id))), N = new Set((n.apis ?? []).flatMap((G) => G.operations.map((j) => j.id)));
    (o.has(i) || m.has(i) || C.has(i) || (n.mcpGateways ?? []).some((G) => G.id === i) || N.has(i) || (n.apis ?? []).some((G) => G.id === i) || (n.proxyApis ?? []).some((G) => G.id === i) || r.has(i)) && s("agent-tool", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), g(i) && i !== t && s("agent-delegate", () => {
      (n.agentDelegations ?? []).some((G) => G.agentId === t && G.delegateAgentId === i) || e.command({ kind: "add-agent-delegate", sourceId: t, targetId: i });
    }), (n.rags ?? []).some((G) => G.id === i) && s("agent-rag", () => {
      (n.agentRags ?? []).some((G) => G.agentId === t && G.ragId === i) || e.command({ kind: "add-agent-rag", sourceId: t, targetId: i });
    });
  }
  ((C) => (n.identityProviders ?? []).some((N) => N.id === C))(i) && (l(t) || (n.etlFlows ?? []).some((C) => C.id === t) || (n.uiApps ?? []).some((C) => C.id === t)) && s("idp-trust", () => It(e, "context-map", t, i, void 0, void 0, "__classic"));
  const O = /* @__PURE__ */ new Set();
  return a.filter((C) => O.has(C.id) ? !1 : (O.add(C.id), !0)).map((C) => {
    const N = ip.find((G) => G.id === C.id);
    return { ...C, label: N.label, hint: N.hint };
  });
}
function It(e, t, i, n, a, s, o) {
  var v, x, R;
  const r = new Set((e.model.notes ?? []).map((k) => k.id));
  if (r.has(i) || r.has(n)) {
    const k = r.has(i) ? i : n, w = r.has(i) ? n : i;
    if (k === w) return;
    const M = w.startsWith("edge:") ? w.slice(5) : w.replace(/^(tgt:|flow:)/, "");
    e.command({ kind: "note-attach", id: k, targetId: M });
    return;
  }
  if (t === "distribution") {
    const k = e.sceneFor("distribution"), w = e.model.modules ?? [], M = (U) => {
      for (let F = U; F; ) {
        if (w.some((le) => le.id === F)) return F;
        const K = k.nodes.find((le) => le.id === F);
        F = K ? K.ownerId ?? K.parentId : void 0;
      }
      return null;
    }, S = new Set((e.model.urls ?? []).map((U) => U.id)), q = new Set((e.model.services ?? []).map((U) => U.id));
    if (q.has(i) && S.has(n)) {
      e.command({ kind: "add-service-url", serviceId: i, id: n });
      return;
    }
    if (S.has(i) && q.has(n)) {
      e.command({ kind: "add-service-url", serviceId: n, id: i });
      return;
    }
    const D = M(n);
    if (D && D !== i && (e.model.services ?? []).some((U) => U.id === i)) {
      e.command({ kind: "add-service-module", serviceId: i, id: D });
      return;
    }
    if ((e.model.services ?? []).some((U) => U.id === i)) {
      const U = e.model.boundedContexts.find((le) => le.id === n), F = U ? w.filter((le) => le.boundedContextId === U.id) : [], K = F.find((le) => le.main) ?? F[0];
      if (K) {
        e.command({ kind: "add-service-module", serviceId: i, id: K.id });
        return;
      }
    }
    if (D && D !== i && !w.some((F) => F.id === i) && !e.model.boundedContexts.some((F) => F.id === i)) {
      e.command({ kind: "add-module-element", id: D, elementId: i });
      return;
    }
  }
  if (t === "integrations") {
    It(e, "context-map", i, n, a, s, o);
    return;
  }
  if (t === "eventstorming") {
    const k = (M) => (e.model.customCodes ?? []).some((S) => S.id === M), w = k(n) ? { stepId: i, ccId: n } : k(i) ? { stepId: n, ccId: i } : null;
    if (w) {
      const M = e.owningUseCaseOf(w.stepId);
      M && e.command({
        kind: "set-use-case-step-custom-code",
        useCaseId: M.id,
        id: w.stepId,
        targetId: w.ccId
      });
      return;
    }
    return;
  }
  if (t === "workflows") {
    const k = (F) => (e.model.actors ?? []).some((K) => K.id === F);
    if (k(i) !== k(n)) {
      const F = k(i) ? i : n, K = k(i) ? n : i, le = e.owningWorkflowOf(K);
      if (le) {
        e.command({ kind: "set-workflow-step-role", workflowId: le.id, id: K, targetId: F });
        return;
      }
    }
    const w = (F) => (e.model.pages ?? []).some((K) => K.id === F);
    if (w(i) !== w(n)) {
      const F = w(i) ? i : n, K = w(i) ? n : i, le = e.owningWorkflowOf(K);
      if (le) {
        e.command({ kind: "set-workflow-step-form", workflowId: le.id, id: K, targetId: F });
        return;
      }
    }
    const M = e.model.workflowGateways ?? [], S = (F) => M.some((K) => K.id === F);
    if (S(i) || S(n) || (e.model.workflows ?? []).some((F) => F.id === n)) {
      if (i === n) return;
      e.command({ kind: "add-workflow-link", sourceId: i, targetId: n });
      return;
    }
    const q = e.owningWorkflowOf(i), D = e.owningWorkflowOf(n);
    if (!q || q !== D || i === n) return;
    const U = q.steps.find((F) => F.id === n);
    if (((U == null ? void 0 : U.dependsOnStepIds) ?? []).includes(i)) return;
    e.command({
      kind: "add-workflow-dependency",
      workflowId: q.id,
      id: n,
      dependsOnStepId: i
    });
    return;
  }
  if (t === "ui") {
    const k = e.model.pages ?? [], w = e.model.uiApps ?? [], M = (X) => w.some((ee) => ee.id === X), S = (X) => k.some((ee) => ee.id === X), q = (X) => (e.model.uis ?? []).some((ee) => ee.id === X);
    if (q(i) !== q(n)) {
      const X = q(i) ? i : n, ee = X === i ? n : i;
      if (M(ee) || S(ee)) {
        e.command({ kind: "add-ui-assignment", id: X, targetId: ee });
        return;
      }
      if ((e.model.actors ?? []).some((_e) => _e.id === ee)) {
        e.command({ kind: "add-ui-serving", id: X, targetId: ee });
        return;
      }
    }
    const D = (X) => (e.model.customCodes ?? []).some((ee) => ee.id === X);
    if (D(i) || D(n)) {
      const X = D(i) ? i : n, ee = D(i) ? n : i;
      if (D(ee)) return;
      if (S(ee)) {
        e.command({ kind: "set-page-custom-code", id: ee, targetId: X });
        return;
      }
      e.command({ kind: "add-custom-code-use", id: X, elementId: ee });
      return;
    }
    const U = e.model.buttonGroups ?? [], F = (X) => U.some((ee) => ee.id === X);
    if ((o === "toolbar" || o === "bottom") && F(i) && S(n)) {
      e.command({ kind: "add-page-bar-group", pageId: n, id: i, bar: o });
      return;
    }
    if (F(i) && F(n) && i !== n) {
      e.command({ kind: "add-group-subgroup", id: n, targetId: i });
      return;
    }
    const K = /^gbtn:([^:]+):(.+)$/.exec(i);
    if (K) {
      e.model.boundedContexts.some((ee) => (ee.useCases ?? []).some((_e) => _e.id === n)) ? e.command({ kind: "set-group-button-target", id: K[1], itemId: K[2], useCaseId: n }) : e.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
      return;
    }
    if (o === "home" && M(i) && (S(n) || M(n))) {
      if (n === i) return;
      e.command(
        S(n) ? { kind: "set-app-home-page", appId: i, pageId: n } : { kind: "set-app-home-page", appId: i, pageId: null, toAppId: n }
      );
      return;
    }
    if (o === "header" && M(i) && S(n)) {
      e.command({ kind: "set-app-header-page", appId: i, pageId: n });
      return;
    }
    if ((o === "crud-detail" || o === "crud-create") && S(i) && (S(n) || M(n)) && n !== i) {
      const X = o === "crud-detail" ? "set-crud-detail" : "set-crud-create";
      e.command(
        S(n) ? { kind: X, pageId: i, targetId: n, toAppId: null } : { kind: X, pageId: i, targetId: null, toAppId: n }
      );
      return;
    }
    if (o === "viewmodel" && S(i)) {
      (e.model.models ?? []).some((X) => X.id === n) ? e.command({ kind: "set-page-model", pageId: i, modelId: n }) : e.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
      return;
    }
    if ((o === "view" || o === "edit") && M(i) && S(n)) {
      e.command({
        kind: o === "view" ? "set-app-view-page" : "set-app-edit-page",
        appId: i,
        pageId: n
      });
      return;
    }
    if (o) return;
    const le = (X) => /^wizrow:([^:]+):(.+)$/.exec(X), Ee = le(i) ?? le(n);
    if (Ee) {
      const X = le(i) ? n : i;
      S(X) && X !== Ee[1] && e.command({ kind: "set-wizard-step-page", pageId: Ee[1], itemId: Ee[2], targetId: X });
      return;
    }
    const Y = k.find((X) => X.id === n && X.type === "WIZARD");
    if (S(i) && Y && i !== Y.id) {
      (Y.wizardSteps ?? []).some((X) => X.pageId === i) || e.command({ kind: "add-page-wizard-step", pageId: Y.id, targetId: i });
      return;
    }
    if (S(i) && M(n)) {
      const X = k.find((_e) => _e.id === i), ee = w.find((_e) => _e.id === n);
      if (ee.type === "MASTER_DETAIL" && !ee.headerPageId) {
        e.command({ kind: "set-app-header-page", appId: n, pageId: i }), e.emit("modux-notice", {
          message: `${X.name} es la cabecera de ${ee.name} — las siguientes páginas serán pestañas`
        });
        return;
      }
      e.command({
        kind: "add-menu-item",
        appId: n,
        label: X.name,
        pageId: i,
        itemId: e.newMenuItemId(X.name)
      });
      return;
    }
    const J = e.model.identityProviders ?? [], fe = (X) => J.some((ee) => ee.id === X);
    if (fe(i) || fe(n)) {
      const X = fe(i) ? i : n, ee = fe(i) ? n : i;
      M(ee) ? e.command({ kind: "set-identity-provider", id: ee, targetId: X }) : e.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
      return;
    }
    const Ae = (X) => (e.model.models ?? []).some((ee) => ee.id === X);
    if (Ae(i) || Ae(n)) {
      const X = Ae(i) ? i : n, ee = Ae(i) ? n : i;
      if (S(ee)) {
        e.command({ kind: "set-page-model", pageId: ee, modelId: X });
        return;
      }
      if (M(ee)) {
        e.command({ kind: "set-app-model", appId: ee, modelId: X });
        return;
      }
      return;
    }
    const Ie = Ce(i);
    if (Ie != null && Ie.itemId && ((v = Ce(n)) != null && v.itemId || M(n))) {
      const X = Ce(n), ee = e.menuEntryIn(Ie.appId, Ie.itemId);
      if (!ee) return;
      if (X != null && X.itemId) {
        const _e = e.menuEntryIn(X.appId, X.itemId);
        if (!_e) return;
        const Ne = (Et) => (Et ?? []).some((si) => si.id === X.itemId || Ne(si.children));
        if (Ie.appId === X.appId && (X.itemId === Ie.itemId || Ne(ee.entry.children)))
          return;
        const Ve = e.nodeClientRect(n), De = Ve && s !== void 0 ? (s - Ve.top) / Math.max(1, Ve.height) : 0.5, at = De < 0.3 ? "before" : De > 0.7 ? "after" : "nest";
        if (at === "nest")
          e.command({
            kind: "move-menu-item",
            appId: Ie.appId,
            toAppId: X.appId,
            itemId: Ie.itemId,
            parentId: X.itemId
          });
        else {
          const Et = at === "before" ? X.itemId : _e.beforeId ?? void 0;
          if (Ie.appId === X.appId && _e.parentId === ee.parentId && Et === Ie.itemId) return;
          e.command({
            kind: "move-menu-item",
            appId: Ie.appId,
            toAppId: X.appId,
            itemId: Ie.itemId,
            parentId: _e.parentId ?? void 0,
            beforeItemId: Et
          });
        }
        return;
      }
      if (Ie.appId === n && !ee.parentId) return;
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
      const X = Ce(i) ? i : n, ee = Ce(i) ? n : i;
      if (((x = e.sceneFor("ui").nodes.find((De) => De.id === X)) == null ? void 0 : x.kind) === "menu-group") {
        e.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
        return;
      }
      const _e = e.model.boundedContexts.some(
        (De) => (De.useCases ?? []).some((at) => at.id === ee)
      ), Ne = (e.model.aggregates ?? []).some((De) => De.id === ee), Ve = e.model.boundedContexts.flatMap((De) => De.queryServices ?? []).find((De) => (De.operations ?? []).some((at) => at.id === ee));
      S(ee) ? e.command({ kind: "set-menu-page", pageId: ee, ...Se }) : M(ee) && ee !== Se.appId ? e.command({ kind: "set-menu-app", toAppId: ee, ...Se }) : _e ? e.command({ kind: "set-menu-use-case", useCaseId: ee, ...Se }) : Ne ? e.command({ kind: "set-menu-aggregate", aggregateId: ee, ...Se }) : Ve && e.command({
        kind: "set-menu-query-operation",
        queryServiceId: Ve.id,
        queryOperationId: ee,
        ...Se
      });
      return;
    }
    if ((e.model.actors ?? []).some((X) => X.id === i) && M(n)) {
      (e.model.actorAppUses ?? []).some((X) => X.actorId === i && X.appId === n) || e.command({ kind: "add-actor-app", actorId: i, appId: n });
      return;
    }
    const ye = S(i) ? { pageId: i, other: n } : S(n) ? { pageId: n, other: i } : null;
    if (ye) {
      const X = new Set(
        e.model.boundedContexts.flatMap((Ne) => (Ne.useCases ?? []).map((Ve) => Ve.id))
      ), ee = new Set(
        e.model.boundedContexts.flatMap((Ne) => (Ne.queryServices ?? []).map((Ve) => Ve.id))
      ), _e = k.find((Ne) => Ne.id === ye.pageId);
      X.has(ye.other) ? (_e.buttons ?? []).some((Ne) => Ne.useCaseId === ye.other) || e.command({ kind: "add-page-button", pageId: ye.pageId, useCaseId: ye.other }) : ee.has(ye.other) && e.command({ kind: "set-page-listing", pageId: ye.pageId, queryServiceId: ye.other });
    }
    return;
  }
  if (t === "mappings") {
    const k = e.model.models ?? [], w = rn(i), M = rn(n), S = e.model.transformations ?? [], q = e.model.customCodes ?? [], D = (Y) => q.some((J) => J.id === Y);
    if (D(i) && S.some((Y) => Y.id === n)) {
      e.command({ kind: "set-transformation-custom-code", id: n, targetId: i });
      return;
    }
    if (D(n) && S.some((Y) => Y.id === i)) {
      e.command({ kind: "set-transformation-custom-code", id: i, targetId: n });
      return;
    }
    if (D(i)) {
      const Y = (M == null ? void 0 : M.modelId) ?? (k.some((J) => J.id === n) ? n : null);
      if (Y) {
        const J = (e.model.modelMappings ?? []).filter(
          (fe) => fe.sourceModelId === Y || fe.targetModelId === Y
        );
        J.length === 1 ? e.command({ kind: "set-mapping-custom-code", id: J[0].id, targetId: i }) : e.emit("modux-notice", {
          message: J.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
        });
        return;
      }
      return;
    }
    if (S.some((Y) => Y.id === n)) {
      if (M || S.some((J) => J.id === i)) return;
      const Y = w ? { modelId: w.modelId, fieldId: w.fieldId } : k.some((J) => J.id === i) ? { modelId: i } : null;
      Y && e.command({ kind: "add-transformation-input", id: n, ...Y });
      return;
    }
    if (S.some((Y) => Y.id === i)) {
      const Y = M ? { modelId: M.modelId, fieldId: M.fieldId } : k.some((J) => J.id === n) ? { modelId: n } : null;
      Y && e.command({ kind: "set-transformation-output", id: i, ...Y });
      return;
    }
    if (w && M) {
      if (w.modelId === M.modelId) {
        e.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
        return;
      }
      let Y = (e.model.modelMappings ?? []).find(
        (J) => J.sourceModelId === w.modelId && J.targetModelId === M.modelId
      );
      if (!Y) {
        const J = k.find((ye) => ye.id === w.modelId), fe = k.find((ye) => ye.id === M.modelId);
        if (!J || !fe) return;
        const Ae = (ye) => ye.replace(/[^a-zA-Z0-9]/g, ""), Ie = new Set((e.model.modelMappings ?? []).map((ye) => ye.id));
        let Se = `mapping-${ce(J.name)}-${ce(fe.name)}`;
        for (let ye = 2; Ie.has(Se); ye++) Se = `mapping-${ce(J.name)}-${ce(fe.name)}-${ye}`;
        e.command(
          { kind: "add-model-mapping", id: Se, name: `${Ae(J.name)}2${Ae(fe.name)}`, sourceId: J.id, targetId: fe.id },
          !1
        ), Y = { id: Se, name: "", sourceModelId: J.id, targetModelId: fe.id };
      }
      e.command({
        kind: "add-model-mapping-rule",
        id: Y.id,
        sourceId: w.fieldId,
        targetId: M.fieldId
      });
      return;
    }
    if (w && k.some((Y) => Y.id === n) && n !== w.modelId) {
      e.command({ kind: "move-model-field", modelId: w.modelId, fieldId: w.fieldId, targetId: n });
      return;
    }
    if (!k.some((Y) => Y.id === i) || !k.some((Y) => Y.id === n) || i === n || (e.model.modelMappings ?? []).some((Y) => Y.sourceModelId === i && Y.targetModelId === n))
      return;
    const U = k.find((Y) => Y.id === i), F = k.find((Y) => Y.id === n), K = (Y) => Y.replace(/[^a-zA-Z0-9]/g, ""), le = new Set((e.model.modelMappings ?? []).map((Y) => Y.id));
    let Ee = `mapping-${ce(U.name)}-${ce(F.name)}`;
    for (let Y = 2; le.has(Ee); Y++) Ee = `mapping-${ce(U.name)}-${ce(F.name)}-${Y}`;
    e.command({
      kind: "add-model-mapping",
      id: Ee,
      name: `${K(U.name)}2${K(F.name)}`,
      sourceId: i,
      targetId: n
    });
    return;
  }
  if (t !== "context-map") return;
  if (o !== "__classic" && o === void 0) {
    const k = np(e, i, n);
    if (k.length === 1) {
      k[0].apply();
      return;
    }
    if (k.length > 1) {
      e.openConnectPicker({
        x: a ?? 0,
        y: s ?? 0,
        options: [...k, ...Ni(e, i, n)]
      });
      return;
    }
  }
  const c = /^apiop:(.+)@(.+)$/.exec(i);
  if (c) {
    const [, k, w] = c, M = (e.model.proxyApis ?? []).find((F) => F.id === w), S = (M == null ? void 0 : M.targetApiId) ?? ((R = (e.model.apiImplementations ?? []).find(
      (F) => F.boundedContextId === w && (e.model.apis ?? []).some(
        (K) => K.id === F.apiId && K.operations.some((le) => le.id === k)
      )
    )) == null ? void 0 : R.apiId);
    if (!S) return;
    if (new Set(
      e.model.boundedContexts.flatMap((F) => (F.useCases ?? []).map((K) => K.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-implementation",
        apiId: S,
        operationId: k,
        boundedContextId: w,
        targetUseCaseId: n
      });
      return;
    }
    if (!(M != null && M.targetApiId)) return;
    let D = null;
    if (n === M.targetApiId)
      D = M.targetApiId;
    else {
      const F = /^apiimpl:(.+)@(.+)$/.exec(n);
      F && F[1] === M.targetApiId ? D = F[2] : e.model.boundedContexts.some((K) => K.id === n) && (e.model.apiImplementations ?? []).some(
        (K) => K.apiId === M.targetApiId && K.boundedContextId === n
      ) && (D = n);
    }
    if (!D) return;
    (e.model.proxyOperationRoutes ?? []).some(
      (F) => F.proxyId === M.id && F.operationId === k && F.targetSiteId === D
    ) || e.command({
      kind: "add-proxy-operation-route",
      proxyId: M.id,
      operationId: k,
      targetSiteId: D
    });
    return;
  }
  const p = new Set((e.model.aiAgents ?? []).map((k) => k.id));
  if (p.has(i)) {
    if (new Set(
      e.model.boundedContexts.flatMap((D) => (D.useCases ?? []).map((U) => U.id))
    ).has(n)) {
      (e.model.agentUses ?? []).some(
        (U) => U.agentId === i && U.useCaseId === n
      ) || e.command({ kind: "add-agent-use", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((D) => (D.useCases ?? []).map((U) => U.id))
    ).has(n)) {
      (e.model.agentExternalUses ?? []).some(
        (U) => U.agentId === i && U.externalUseCaseId === n
      ) || e.command({ kind: "add-agent-external-use", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((D) => (D.mcpServers ?? []).map((U) => U.id))
    ).has(n)) {
      (e.model.agentMcpUses ?? []).some(
        (U) => U.agentId === i && U.mcpServerId === n
      ) || e.command({ kind: "add-agent-mcp", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.mcpGateways ?? []).some((D) => D.id === n)) {
      (e.model.agentGatewayUses ?? []).some(
        (U) => U.agentId === i && U.gatewayId === n
      ) || e.command({ kind: "add-agent-gateway", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      (e.model.apis ?? []).flatMap((D) => D.operations.map((U) => U.id))
    ).has(n)) {
      (e.model.agentApiOpUses ?? []).some(
        (U) => U.agentId === i && U.apiOperationId === n
      ) || e.command({ kind: "add-agent-api-operation", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.apis ?? []).some((D) => D.id === n) || (e.model.proxyApis ?? []).some((D) => D.id === n)) {
      (e.model.agentApiUses ?? []).some(
        (U) => U.agentId === i && U.apiId === n
      ) || e.command({ kind: "add-agent-api", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.boundedContexts.flatMap((D) => (D.queryServices ?? []).map((U) => U.id))
    ).has(n)) {
      (e.model.agentQueryUses ?? []).some(
        (U) => U.agentId === i && U.queryServiceId === n
      ) || e.command({ kind: "add-agent-query", sourceId: i, targetId: n });
      return;
    }
    if (p.has(n) && n !== i) {
      (e.model.agentDelegations ?? []).some(
        (U) => U.agentId === i && U.delegateAgentId === n
      ) || e.command({ kind: "add-agent-delegate", sourceId: i, targetId: n });
      return;
    }
    (e.model.rags ?? []).some((D) => D.id === n) && ((e.model.agentRags ?? []).some(
      (U) => U.agentId === i && U.ragId === n
    ) || e.command({ kind: "add-agent-rag", sourceId: i, targetId: n }));
    return;
  }
  if ((e.model.mcpGateways ?? []).some((k) => k.id === i)) {
    const k = (e.model.mcpGateways ?? []).find((S) => S.id === i), w = e.model.externalSystems.some((S) => (S.mcpServers ?? []).some((q) => q.id === n)) || (e.model.apis ?? []).some((S) => S.id === n) || (e.model.apis ?? []).some((S) => S.operations.some((q) => q.id === n)) || e.model.boundedContexts.some((S) => (S.useCases ?? []).some((q) => q.id === n)) || (e.model.rags ?? []).some((S) => S.id === n), M = [
      ...k.mcpServerIds ?? [],
      ...k.apiIds ?? [],
      ...k.apiOperationIds ?? [],
      ...k.useCaseIds ?? [],
      ...k.ragIds ?? []
    ].includes(n);
    w && !M && e.command({ kind: "add-gateway-exposure", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.mcpGateways ?? []).some((k) => k.id === n)) return;
  const h = (e.model.rags ?? []).find((k) => k.id === i);
  if (h) {
    if (new Set(
      e.model.boundedContexts.flatMap((M) => (M.readModels ?? []).map((S) => S.id))
    ).has(n) && !(h.sourceReadModelIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((M) => (M.tables ?? []).map((S) => S.id))
    ).has(n) && !(h.sourceExternalTableIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (((e.model.apis ?? []).some((M) => M.id === n) || (e.model.proxyApis ?? []).some((M) => M.id === n)) && !(h.sourceApiIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((M) => M.id === n) && !(h.sourceExternalSystemIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    e.model.boundedContexts.some((M) => M.id === n) && !(h.sourceBoundedContextIds ?? []).includes(n) && e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.rags ?? []).some((k) => k.id === n)) return;
  if ((e.model.workflows ?? []).some((k) => k.id === i)) {
    const k = (e.model.workflows ?? []).find((S) => S.id === i), w = (e.model.workflows ?? []).find(
      (S) => S.id === n && S.id !== i
    );
    if (w) {
      const S = k.onCompletionEventName || `${k.name.replace(/\s+/g, "")}Completado`;
      w.triggerEvent !== S && e.command({ kind: "set-workflow-trigger", id: n, triggerEvent: S });
      return;
    }
    const M = e.model.boundedContexts.flatMap((S) => S.useCases ?? []).find((S) => S.id === n);
    if (M && !(k.steps ?? []).some((q) => q.targetUseCaseId === n)) {
      const q = `wfs-${ce(M.name)}`;
      let D = q;
      for (let U = 2; (k.steps ?? []).some((F) => F.id === D); U++)
        D = `${q}-${U}`;
      e.command({
        kind: "add-workflow-step",
        workflowId: i,
        id: D,
        name: M.name,
        targetUseCaseId: n
      });
    }
    return;
  }
  if ((e.model.workflows ?? []).some((k) => k.id === n)) {
    const k = e.model.boundedContexts.flatMap((S) => S.domainEvents ?? []).find((S) => S.id === i), w = e.model.boundedContexts.flatMap((S) => S.applicationEvents ?? []).find((S) => S.id === i), M = k ?? w;
    if (M) {
      const S = (e.model.emissions ?? []).find((F) => F.domainEventId === i), q = new Set((e.model.aggregates ?? []).map((F) => F.id)), D = new Set(
        e.model.boundedContexts.flatMap((F) => (F.domainServices ?? []).map((K) => K.id))
      ), U = new Set(
        e.model.boundedContexts.flatMap((F) => (F.useCases ?? []).map((K) => K.id))
      );
      e.command({
        kind: "set-workflow-trigger",
        id: n,
        triggerEvent: M.name,
        triggerAggregateId: S && q.has(S.sourceId) ? S.sourceId : void 0,
        triggerDomainServiceId: S && D.has(S.sourceId) ? S.sourceId : void 0,
        triggerUseCaseId: S && U.has(S.sourceId) ? S.sourceId : void 0
      });
    }
    return;
  }
  if ((e.model.proxyApis ?? []).some((k) => k.id === i)) {
    const k = (e.model.proxyApis ?? []).find((w) => w.id === i);
    if ((e.model.apis ?? []).some((w) => w.id === n)) {
      k.targetApiId !== n && e.command({ kind: "set-proxy-target", id: i, targetId: n });
      return;
    }
    if (e.model.boundedContexts.some((w) => w.id === n)) {
      if (!k.targetApiId) return;
      (e.model.apiImplementations ?? []).some(
        (M) => M.apiId === k.targetApiId && M.boundedContextId === n
      ) || e.command({ kind: "add-api-implementation", apiId: k.targetApiId, boundedContextId: n });
      return;
    }
    e.model.externalSystems.some((w) => w.id === n) && k.publishedByExternalSystemId !== n && e.command({ kind: "set-api-publisher", id: i, targetId: n });
    return;
  }
  if ((e.model.apis ?? []).some((k) => k.id === i)) {
    if (e.model.externalSystems.some((k) => k.id === n)) {
      (e.model.apis ?? []).find((w) => w.id === i).publishedByExternalSystemId !== n && e.command({ kind: "set-api-publisher", id: i, targetId: n });
      return;
    }
    e.model.boundedContexts.some((k) => k.id === n) && ((e.model.apiImplementations ?? []).some(
      (w) => w.apiId === i && w.boundedContextId === n
    ) || e.command({ kind: "add-api-implementation", apiId: i, boundedContextId: n }));
    return;
  }
  const m = new Set((e.model.actors ?? []).map((k) => k.id));
  if (p.has(n)) {
    if ((/* @__PURE__ */ new Set([
      ...e.model.boundedContexts.flatMap((w) => (w.domainEvents ?? []).map((M) => M.id)),
      ...e.model.boundedContexts.flatMap((w) => (w.applicationEvents ?? []).map((M) => M.id))
    ])).has(i)) {
      (e.model.agentTriggers ?? []).some(
        (M) => M.eventId === i && M.agentId === n
      ) || e.command({ kind: "add-agent-trigger", sourceId: i, targetId: n });
      return;
    }
    if (!m.has(i)) return;
  }
  if (m.has(i)) {
    const k = new Set(
      e.model.boundedContexts.flatMap((M) => (M.useCases ?? []).map((S) => S.id))
    ), w = new Set(
      e.model.boundedContexts.flatMap((M) => (M.queryServices ?? []).map((S) => S.id))
    );
    if (k.has(n) || w.has(n)) {
      (e.model.actorUses ?? []).some(
        (S) => S.actorId === i && S.targetId === n
      ) || e.command({ kind: "add-actor-use", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aggregates ?? []).some((M) => M.id === n)) {
      e.command({ kind: "add-actor-crud", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((M) => M.id === n)) {
      (e.model.actorExternalDependencies ?? []).some(
        (S) => S.actorId === i && S.externalSystemId === n
      ) || e.command({ kind: "add-actor-external", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aiAgents ?? []).some((M) => M.id === n)) {
      (e.model.actorAgentUses ?? []).some(
        (S) => S.actorId === i && S.agentId === n
      ) || e.command({ kind: "add-actor-agent", sourceId: i, targetId: n });
      return;
    }
    return;
  }
  const g = e.owningApiOf(i);
  if (g) {
    if (new Set(
      e.model.boundedContexts.flatMap((w) => (w.useCases ?? []).map((M) => M.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: g.id,
        id: i,
        targetUseCaseId: n
      });
      return;
    }
    if (e.model.boundedContexts.some((w) => w.id === n)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: g.id,
        id: i,
        boundedContextId: n
      });
      return;
    }
    return;
  }
  const y = (k) => (e.model.notifications ?? []).find((w) => w.id === k);
  if (y(i) || y(n)) {
    const k = y(i) ?? y(n), w = y(i) ? n : i;
    if (e.model.boundedContexts.some(
      (S) => [...S.domainEvents ?? [], ...S.applicationEvents ?? []].some((q) => q.id === w)
    )) {
      k.eventId !== w && e.command({ kind: "set-notification-event", id: k.id, targetId: w });
      return;
    }
    if ((e.model.actors ?? []).some((S) => S.id === w)) {
      (k.recipientRoleIds ?? []).includes(w) || e.command({ kind: "add-notification-recipient", id: k.id, roleId: w });
      return;
    }
    e.emit("modux-notice", {
      message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
    });
    return;
  }
  const b = (k) => (e.model.documents ?? []).find((w) => w.id === k);
  if (b(i) || b(n)) {
    const k = b(i) ?? b(n), w = b(i) ? n : i;
    if ((e.model.models ?? []).find((D) => D.id === w)) {
      e.command({ kind: "set-document-model", id: k.id, modelId: w });
      return;
    }
    const S = e.model.boundedContexts.flatMap((D) => D.queryServices ?? []).find((D) => D.id === w), q = e.model.boundedContexts.flatMap((D) => (D.queryServices ?? []).flatMap((U) => (U.operations ?? []).map((F) => ({ op: F, qs: U })))).find(({ op: D }) => D.id === w);
    if (S || q) {
      e.command({
        kind: "set-document-query",
        id: k.id,
        queryServiceId: (S == null ? void 0 : S.id) ?? q.qs.id,
        queryOperationId: (q == null ? void 0 : q.op.id) ?? null
      });
      return;
    }
    e.emit("modux-notice", {
      message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
    });
    return;
  }
  const l = e.model.identityProviders ?? [], d = (k) => l.find((w) => w.id === k);
  if (d(i) || d(n)) {
    const k = d(i) ?? d(n), w = d(i) ? n : i;
    if (d(i) && e.model.externalSystems.some((q) => q.id === w)) {
      k.publishedByExternalSystemId !== w && e.command({ kind: "set-idp-publisher", id: k.id, targetId: w });
      return;
    }
    const M = e.model.boundedContexts.some((q) => q.id === w), S = (e.model.etlFlows ?? []).some((q) => q.id === w);
    if (M || S) {
      e.command({ kind: "set-identity-provider", id: w, targetId: k.id });
      return;
    }
    e.emit("modux-notice", {
      message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
    });
    return;
  }
  const f = e.model.etlFlows ?? [], _ = (k) => f.find((w) => w.id === k);
  if (_(i) || _(n)) {
    const k = _(i) ?? _(n), w = _(i) ? n : i, M = !_(i), S = new Set(e.model.externalSystems.flatMap((J) => (J.tables ?? []).map((fe) => fe.id))), q = /* @__PURE__ */ new Set([
      ...(e.model.apis ?? []).map((J) => J.id),
      ...(e.model.proxyApis ?? []).map((J) => J.id)
    ]), D = (e.model.apis ?? []).find((J) => J.operations.some((fe) => fe.id === w)), U = new Set(
      e.model.boundedContexts.flatMap((J) => [
        ...(J.domainEvents ?? []).map((fe) => fe.id),
        ...(J.applicationEvents ?? []).map((fe) => fe.id)
      ])
    );
    let F = null, K = {};
    if (S.has(w) ? (F = M ? "SOURCE_PULL" : "WRITE_DB", K = { externalTableId: w }) : D ? (F = M ? "SOURCE_PULL" : "WRITE_API", K = { apiId: D.id, operationId: w }) : q.has(w) ? (F = M ? "SOURCE_PULL" : "WRITE_API", K = { apiId: w }) : U.has(w) && (F = M ? "SOURCE_CONSUMER" : "WRITE_EVENT", K = { targetId: w }), !F) {
      e.emit("modux-notice", {
        message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
      });
      return;
    }
    if ((k.steps ?? []).some(
      (J) => J.type === F && (J.externalTableId ?? J.operationId ?? J.apiId ?? J.eventId) === (K.externalTableId ?? K.operationId ?? K.apiId ?? K.targetId)
    )) return;
    const Ee = new Set((k.steps ?? []).map((J) => J.id));
    let Y = (k.steps ?? []).length + 1;
    for (; Ee.has(`ets-${Y}`); ) Y++;
    e.command({ kind: "add-etl-step", etlFlowId: k.id, id: `ets-${Y}`, stepType: F, ...K });
    return;
  }
  const E = e.model.externalSystems.flatMap((k) => k.useCases ?? []).find((k) => k.id === i), A = e.model.externalSystems.flatMap((k) => k.tables ?? []).find((k) => k.id === i);
  if (E || A) {
    const k = (E ?? A).name, w = E ? { externalUseCaseId: i } : { externalTableId: i }, M = (D) => E ? D.sourceExternalUseCaseId === i : D.sourceExternalTableId === i, S = e.model.boundedContexts.flatMap((D) => D.readModels ?? []).find((D) => D.id === n);
    if (S) {
      (e.model.projections ?? []).some(
        (U) => M(U) && U.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(k)}-${ce(S.name)}`,
        name: `${S.name}Projection`,
        ...w,
        targetId: n
      });
      return;
    }
    const q = e.model.boundedContexts.find((D) => D.id === n);
    if (q) {
      (e.model.projections ?? []).some(
        (U) => M(U) && U.boundedContextId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(k)}-${ce(q.name)}`,
        name: `${k}ViewProjection`,
        ...w,
        boundedContextId: n,
        readModelName: `${k}View`
      });
      return;
    }
    return;
  }
  const O = (e.model.aggregates ?? []).find((k) => k.id === i);
  if (O) {
    const k = e.model.boundedContexts.flatMap((M) => M.readModels ?? []).find((M) => M.id === n);
    if (k) {
      (e.model.projections ?? []).some(
        (S) => S.sourceAggregateId === i && S.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(O.name)}-${ce(k.name)}`,
        name: `${k.name}Projection`,
        aggregateId: i,
        targetId: n
      });
      return;
    }
    const w = e.model.boundedContexts.find((M) => M.id === n);
    if (w) {
      (e.model.projections ?? []).some(
        (S) => S.sourceAggregateId === i && S.boundedContextId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(O.name)}-${ce(w.name)}`,
        name: `${O.name}ViewProjection`,
        aggregateId: i,
        boundedContextId: n,
        readModelName: `${O.name}View`
      });
      return;
    }
  }
  const C = new Set(
    e.model.boundedContexts.flatMap((k) => (k.domainEvents ?? []).map((w) => w.id))
  ), N = /* @__PURE__ */ new Set([
    ...(e.model.aggregates ?? []).map((k) => k.id),
    ...e.model.boundedContexts.flatMap((k) => (k.domainServices ?? []).map((w) => w.id))
  ]), G = new Set(
    e.model.boundedContexts.flatMap((k) => (k.applicationEvents ?? []).map((w) => w.id))
  ), j = new Set(e.model.boundedContexts.flatMap((k) => (k.useCases ?? []).map((w) => w.id))), de = new Set(
    e.model.boundedContexts.flatMap((k) => (k.queryServices ?? []).map((w) => w.id))
  );
  if (j.has(i) && de.has(n)) {
    (e.model.queryCalls ?? []).some(
      (w) => w.sourceId === i && w.targetId === n
    ) || e.command({ kind: "add-query-call", sourceId: i, targetId: n });
    return;
  }
  const $ = new Set(
    e.model.externalSystems.flatMap((k) => (k.useCases ?? []).map((w) => w.id))
  );
  if (j.has(i) && $.has(n)) {
    (e.model.externalUseCaseCalls ?? []).some(
      (w) => w.sourceId === i && w.targetId === n
    ) || e.command({ kind: "add-external-uc-call", sourceId: i, targetId: n });
    return;
  }
  if (j.has(i) && j.has(n) && i !== n) {
    (e.model.useCaseCalls ?? []).some(
      (w) => w.sourceId === i && w.targetId === n
    ) || e.command({ kind: "add-use-case-call", sourceId: i, targetId: n });
    return;
  }
  const H = e.model.boundedContexts.flatMap((k) => k.scheduledTriggers ?? []).find((k) => k.id === i);
  if (H && j.has(n)) {
    H.useCaseId !== n && e.command({ kind: "set-scheduled-trigger-target", id: i, targetUseCaseId: n });
    return;
  }
  if (j.has(i) && (e.model.aggregates ?? []).some((k) => k.id === n)) {
    (e.model.aggregateCalls ?? []).some(
      (w) => w.sourceId === i && w.targetId === n
    ) || e.command({ kind: "add-aggregate-call", sourceId: i, targetId: n });
    return;
  }
  if (N.has(i) && C.has(n) || j.has(i) && G.has(n)) {
    (e.model.emissions ?? []).some(
      (w) => w.sourceId === i && w.domainEventId === n
    ) || e.command({ kind: "add-emission", sourceId: i, targetId: n });
    return;
  }
  if (C.has(i) || G.has(i)) {
    const k = G.has(i), w = e.model.boundedContexts.flatMap((Y) => (k ? Y.applicationEvents : Y.domainEvents) ?? []).find((Y) => Y.id === i), M = e.model.boundedContexts.flatMap((Y) => (Y.useCases ?? []).map((J) => ({ u: J, boundedContext: Y }))).find(({ u: Y }) => Y.id === n), S = e.model.boundedContexts.flatMap((Y) => (Y.readModels ?? []).map((J) => ({ rm: J, boundedContext: Y }))).find(({ rm: Y }) => Y.id === n), q = e.model.boundedContexts.find((Y) => Y.id === n) ?? (S == null ? void 0 : S.boundedContext) ?? (M == null ? void 0 : M.boundedContext);
    if (!w || !q) return;
    const D = new Set((e.model.aggregates ?? []).map((Y) => Y.id)), U = new Set(
      e.model.boundedContexts.flatMap((Y) => (Y.domainServices ?? []).map((J) => J.id))
    ), F = (e.model.emissions ?? []).find(
      (Y) => Y.domainEventId === i && (k ? j.has(Y.sourceId) : D.has(Y.sourceId) || U.has(Y.sourceId))
    );
    if (!F) {
      e.emit("modux-notice", {
        message: k ? `Declara primero qué caso de uso publica ${w.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${w.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
        kind: "info"
      });
      return;
    }
    const K = !k && D.has(F.sourceId);
    if (M) {
      if (e.model.flows.some(
        (J) => J.archetype === "TRIGGERS" && J.triggerEvent === w.name && J.targetUseCaseId === M.u.id
      )) return;
      e.command({
        kind: "add-flow",
        id: `flow-${ce(w.name)}-${ce(M.u.name)}`,
        name: M.u.name,
        archetype: "TRIGGERS",
        triggerAggregateId: K ? F.sourceId : "",
        triggerDomainServiceId: !k && !K ? F.sourceId : void 0,
        triggerUseCaseId: k ? F.sourceId : void 0,
        triggerEvent: w.name,
        targetId: q.id,
        targetUseCaseId: M.u.id
      });
      return;
    }
    const le = (S == null ? void 0 : S.rm.name) ?? `${w.name}View`;
    if (e.model.flows.some(
      (Y) => Y.archetype === "MATERIALIZES" && Y.triggerEvent === w.name && Y.targetId === q.id && Y.readModelName === le
    )) return;
    e.command({
      kind: "add-flow",
      id: `flow-${ce(w.name)}-${ce(le)}`,
      name: le,
      archetype: "MATERIALIZES",
      triggerAggregateId: K ? F.sourceId : "",
      triggerDomainServiceId: !k && !K ? F.sourceId : void 0,
      triggerUseCaseId: k ? F.sourceId : void 0,
      triggerEvent: w.name,
      targetId: q.id,
      readModelName: le
    });
    return;
  }
  const te = /* @__PURE__ */ new Set([
    ...N,
    ...j,
    ...de,
    ...e.model.boundedContexts.flatMap((k) => (k.readModels ?? []).map((w) => w.id))
  ]);
  if (te.has(i) || te.has(n) || C.has(n) || G.has(n))
    return;
  const T = new Set(e.model.externalSystems.map((k) => k.id));
  if (T.has(i)) {
    if (new Set(
      e.model.boundedContexts.flatMap((q) => (q.useCases ?? []).map((D) => D.id))
    ).has(n)) {
      (e.model.externalCalls ?? []).some(
        (D) => D.externalSystemId === i && D.useCaseId === n
      ) || e.command({ kind: "add-external-call", sourceId: i, targetId: n });
      return;
    }
    if (T.has(n) && n !== i) {
      e.openExtDepPicker({ sourceId: i, targetId: n, x: a ?? 0, y: s ?? 0 });
      return;
    }
    const w = (e.model.apis ?? []).find(
      (q) => q.operations.some((D) => D.id === n)
    ), M = /^apiop:(.+)@(.+)$/.exec(n), S = w ? { operationId: n, siteId: w.id } : M ? { operationId: M[1], siteId: M[2] } : null;
    if (S) {
      (e.model.externalOperationUses ?? []).some(
        (D) => D.externalSystemId === i && D.operationId === S.operationId && D.siteId === S.siteId
      ) || e.command({
        kind: "add-external-operation-use",
        sourceId: i,
        operationId: S.operationId,
        targetSiteId: S.siteId
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
  if (T.has(n) || m.has(n)) return;
  const V = (k) => e.model.boundedContexts.some((w) => w.id === k);
  if (V(i) && V(n) && i !== n) {
    const k = e.model.relations.find(
      (w) => w.sourceId === i && w.targetId === n && w.declared
    );
    e.openRelationPicker({
      sourceId: i,
      targetId: n,
      mode: k ? "edit" : "create",
      x: a ?? 0,
      y: s ?? 0
    });
    return;
  }
  if (i !== n && o === void 0) {
    e.openConnectPicker({
      x: a ?? 0,
      y: s ?? 0,
      options: Ni(e, i, n)
    });
    return;
  }
}
function ap(e, t, i, n, a) {
  var s;
  if (a === "ui-serving") {
    const o = /^uisrv:(.+)->(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "remove-ui-serving", id: o[1], targetId: o[2] }));
    return;
  }
  if (a === "ui-assignment") {
    const o = /^uiasg:(.+)->(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "remove-ui-assignment", id: o[1], targetId: o[2] }));
    return;
  }
  if (a === "ui" && i === "node") {
    e.clearSelection(), e.command({ kind: "remove-ui", id: n });
    return;
  }
  if (a === "archimate-relation") {
    const o = n.replace(/^archi:/, "");
    e.clearSelection(), e.command({ kind: "remove-archimate-relation", id: o });
    return;
  }
  if (i === "node" && a === "note") {
    e.clearSelection(), e.command({ kind: "remove-note", id: n });
    return;
  }
  if (i === "node" && a === "url") {
    e.clearSelection(), e.command({ kind: "remove-url", id: n });
    return;
  }
  if (i === "edge" && a === "service-url") {
    const o = /^svcurl:(.+)->(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "remove-service-url", serviceId: o[1], id: o[2] }));
    return;
  }
  if (i === "node" && a === "area") {
    e.clearSelection(), e.command({ kind: "remove-area", id: n });
    return;
  }
  if (i === "edge" && a === "note-link") {
    const o = n.slice(5), r = o.indexOf("->");
    r > 0 && (e.clearSelection(), e.command({ kind: "note-detach", id: o.slice(0, r), targetId: o.slice(r + 2) }));
    return;
  }
  if (a === "invariant" || a === "invariant-containment") {
    const o = a === "invariant" ? n : n.replace(/^protects:.+->/, "");
    e.clearSelection(), e.command({ kind: "remove-invariant", id: o });
    return;
  }
  if (t === "eventstorming" && i === "edge" && a === "es-custom") {
    const o = /^escc:(.+)$/.exec(n), r = o ? e.owningUseCaseOf(o[1]) : null;
    o && r && (e.clearSelection(), e.command({ kind: "set-use-case-step-custom-code", useCaseId: r.id, id: o[1], targetId: null }));
    return;
  }
  if (t === "eventstorming" && i === "node" && a === "custom-code") {
    e.clearSelection(), e.command({ kind: "remove-custom-code", id: n });
    return;
  }
  if (t === "ui") {
    if (i === "edge") {
      let o;
      if (o = /^idpauth:(.+)$/.exec(n))
        e.command({ kind: "set-identity-provider", id: o[1], targetId: null });
      else if (o = /^appheader:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-header-page", appId: o[1], pageId: null });
      else if (o = /^apphome:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-home-page", appId: o[1], pageId: null });
      else if (o = /^appmodel:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-model", appId: o[1], modelId: null });
      else if (o = /^appview:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-view-page", appId: o[1], pageId: null });
      else if (o = /^appedit:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-edit-page", appId: o[1], pageId: null });
      else if (o = /^cruddetail:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-crud-detail", pageId: o[1], targetId: null, toAppId: null });
      else if (o = /^crudnew:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-crud-create", pageId: o[1], targetId: null, toAppId: null });
      else if (o = /^wizstep:([^:]+):(.+)$/.exec(n))
        e.command({ kind: "set-wizard-step-page", pageId: o[1], itemId: o[2], targetId: null });
      else if (o = /^pgbtn:(.+)->(.+)$/.exec(n))
        e.command({ kind: "remove-page-button", pageId: o[1], useCaseId: o[2] });
      else if (o = /^pglist:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-page-listing", pageId: o[1], queryServiceId: null });
      else if (o = /^pgmodel:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-page-model", pageId: o[1], modelId: null });
      else if (o = /^actorapp:(.+)->(.+)$/.exec(n))
        e.command({ kind: "remove-actor-app", actorId: o[1], appId: o[2] });
      else if (o = /^menupage:(.+)->[^>]+$/.exec(n)) {
        const r = Ce(o[1]);
        r && e.command({ kind: "set-menu-page", pageId: null, ...r });
      } else if (o = /^menuapp:(.+)->[^>]+$/.exec(n)) {
        const r = Ce(o[1]);
        r && e.command({ kind: "set-menu-app", toAppId: null, ...r });
      } else if (o = /^menuuc:(.+)->[^>]+$/.exec(n)) {
        const r = Ce(o[1]);
        r && e.command({ kind: "set-menu-use-case", useCaseId: null, ...r });
      } else if (o = /^menuagg:(.+)->[^>]+$/.exec(n)) {
        const r = Ce(o[1]);
        r && e.command({ kind: "set-menu-aggregate", aggregateId: null, ...r });
      } else if (o = /^menuqop:(.+)->[^>]+$/.exec(n)) {
        const r = Ce(o[1]);
        r && e.command({ kind: "set-menu-query-operation", queryServiceId: null, queryOperationId: null, ...r });
      }
      return;
    }
    if (a === "ui-app") {
      e.command({ kind: "delete-ui-app", id: n });
      return;
    }
    if (a === "page") {
      e.command({ kind: "delete-ui-page", id: n });
      return;
    }
    if (a === "menu-item" || a === "menu-group") {
      const o = Ce(n);
      o && e.command({ kind: "remove-menu-item", ...o });
      return;
    }
    if (a === "wizard-step-row") {
      const o = /^wizrow:([^:]+):(.+)$/.exec(n);
      o && e.command({ kind: "remove-page-wizard-step", pageId: o[1], targetId: o[2] });
      return;
    }
    if (a === "model") {
      e.command({ kind: "remove-model", id: n });
      return;
    }
    if (a === "identity-provider") {
      e.command({ kind: "remove-identity-provider", id: n });
      return;
    }
    if (a === "custom-code") {
      e.command({ kind: "remove-custom-code", id: n });
      return;
    }
    if (a === "button-group") {
      e.command({ kind: "remove-button-group", id: n });
      return;
    }
    if (a === "group-button") {
      const o = /^gbtn:([^:]+):(.+)$/.exec(n);
      o && e.command({ kind: "remove-group-button", id: o[1], itemId: o[2] });
      return;
    }
    if (a === "group-subgroup") {
      const o = /^gsub:([^:]+):(.+)$/.exec(n);
      o && e.command({ kind: "remove-group-subgroup", id: o[1], targetId: o[2] });
      return;
    }
    if (i === "edge" && a === "bar-group") {
      const o = /^bargrp:([^:]+):[^:]+:(.+)$/.exec(n);
      o && e.command({ kind: "remove-page-bar-group", pageId: o[1], id: o[2] });
      return;
    }
    if (i === "edge" && a === "gbtn-target") {
      const o = /^gbtnt:([^:]+):(.+)$/.exec(n);
      o && e.command({ kind: "set-group-button-target", id: o[1], itemId: o[2], useCaseId: null });
      return;
    }
    if (i === "edge" && a === "ui-custom-page") {
      const o = /^ccpage:(.+)$/.exec(n);
      o && e.command({ kind: "set-page-custom-code", id: o[1], targetId: null });
      return;
    }
    if (i === "edge" && a === "cc-uses") {
      const o = /^ccuse:(.+)->(.+)$/.exec(n);
      o && e.command({ kind: "remove-custom-code-use", id: o[1], elementId: o[2] });
      return;
    }
    return;
  }
  if (t === "mappings" && i === "edge" && a === "model-mapping") {
    const o = /^mapping:(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "remove-model-mapping", id: o[1] }));
    return;
  }
  if (t === "mappings" && i === "edge" && a === "mapping-rule") {
    const o = /^maprule:([^:]+):(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "remove-model-mapping-rule", id: o[1], itemId: o[2] }));
    return;
  }
  if (t === "mappings" && i === "node" && a === "model-field") {
    const o = rn(n);
    o && (e.clearSelection(), e.command({ kind: "remove-model-field", modelId: o.modelId, fieldId: o.fieldId }));
    return;
  }
  if (t === "mappings" && i === "node" && a === "model") {
    e.clearSelection(), e.command({ kind: "remove-model", id: n });
    return;
  }
  if (t === "mappings" && i === "node" && a === "custom-code") {
    e.clearSelection(), e.command({ kind: "remove-custom-code", id: n });
    return;
  }
  if (t === "mappings" && i === "edge" && a === "custom-of-transformation") {
    const o = /^cctf:(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "set-transformation-custom-code", id: o[1], targetId: null }));
    return;
  }
  if (t === "mappings" && i === "edge" && a === "custom-of-mapping") {
    const o = /^ccmap:(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "set-mapping-custom-code", id: o[1], targetId: null }));
    return;
  }
  if (t === "mappings" && i === "node" && a === "transformation") {
    e.clearSelection(), e.command({ kind: "remove-transformation", id: n });
    return;
  }
  if (t === "mappings" && i === "edge" && a === "transform-input") {
    const o = /^tfin:([^:]+):([^:]+):(.*)$/.exec(n);
    o && (e.clearSelection(), e.command({
      kind: "remove-transformation-input",
      id: o[1],
      modelId: o[2],
      ...o[3] ? { fieldId: o[3] } : {}
    }));
    return;
  }
  if (t === "mappings" && i === "edge" && a === "transform-output") {
    const o = /^tfout:(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "set-transformation-output", id: o[1] }));
    return;
  }
  if (t === "workflows" && i === "edge" && a === "workflow-dependency") {
    const o = /^wfdep:(.+)->(.+)$/.exec(n);
    if (!o) return;
    const r = e.owningWorkflowOf(o[2]);
    if (!r) return;
    e.clearSelection(), e.command({
      kind: "remove-workflow-dependency",
      workflowId: r.id,
      id: o[2],
      dependsOnStepId: o[1]
    });
    return;
  }
  if (t === "workflows" && i === "node" && a === "workflow-gateway") {
    e.clearSelection(), e.command({ kind: "remove-workflow-gateway", id: n });
    return;
  }
  if (t === "workflows" && i === "edge" && a === "wf-role") {
    const o = /^wfrole:(.+)->(.+)$/.exec(n);
    if (o) {
      const r = e.owningWorkflowOf(o[1]);
      r && (e.clearSelection(), e.command({ kind: "set-workflow-step-role", workflowId: r.id, id: o[1] }));
    }
    return;
  }
  if (t === "workflows" && i === "edge" && a === "wf-form") {
    const o = /^wfform:(.+)->(.+)$/.exec(n);
    if (o) {
      const r = e.owningWorkflowOf(o[1]);
      if (!r) return;
      e.clearSelection(), e.command({ kind: "set-workflow-step-form", workflowId: r.id, id: o[1] });
    }
    return;
  }
  if (t === "workflows" && i === "edge" && a === "wf-link") {
    const o = /^wflink:(.+)->(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "remove-workflow-link", sourceId: o[1], targetId: o[2] }));
    return;
  }
  if (i === "node" && a === "workflow") {
    e.clearSelection(), e.command({ kind: "remove-workflow", id: n });
    return;
  }
  if (i === "node" && a === "workflow-step") {
    const o = e.owningWorkflowOf(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-workflow-step", workflowId: o.id, id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "api-impl-wire") {
    const o = /^apiimplwire:(.+)@(.+)$/.exec(n);
    if (!o) return;
    const [, r, c] = o, p = (s = (e.model.apis ?? []).find(
      (h) => h.operations.some((m) => m.id === r)
    )) == null ? void 0 : s.id;
    if (!p) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation-implementation", apiId: p, operationId: r, boundedContextId: c });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "ext-op-use") {
    const o = /^extopuse:(.+)->(.+)@(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({
      kind: "remove-external-operation-use",
      sourceId: o[1],
      operationId: o[2],
      targetSiteId: o[3]
    });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "op-route") {
    const o = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(n);
    if (!o) return;
    const [, r, c, p] = o, h = /^apiimpl:.+@(.+)$/.exec(p), m = h ? h[1] : p;
    e.clearSelection(), e.command({ kind: "remove-proxy-operation-route", proxyId: c, operationId: r, targetSiteId: m });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "relation") {
    const o = /^rel:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-relation", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "emission") {
    const o = /^emit:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-emission", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "projection") {
    const o = /^proj:(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-projection", id: o[1] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "uc-call") {
    const o = /^uccall:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-use-case-call", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "notification-trigger") {
    const o = /^notif:(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "set-notification-event", id: o[1], targetId: null }));
    return;
  }
  if (t === "context-map" && i === "edge" && a === "notification-recipient") {
    const o = /^notifto:([^:]+):(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "remove-notification-recipient", id: o[1], roleId: o[2] }));
    return;
  }
  if (t === "context-map" && i === "edge" && a === "document-query") {
    const o = /^docq:(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "set-document-query", id: o[1], queryServiceId: null, queryOperationId: null }));
    return;
  }
  if (t === "context-map" && i === "node" && a === "notification") {
    e.clearSelection(), e.command({ kind: "remove-notification", id: n });
    return;
  }
  if (t === "context-map" && i === "node" && a === "document") {
    e.clearSelection(), e.command({ kind: "remove-document", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && (a === "idp-trust" || a === "idp-service")) {
    const o = /^idp(?:trust|svc):(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "set-identity-provider", id: o[1], targetId: null });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "idp-federation") {
    const o = /^idpfed:(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "set-idp-publisher", id: o[1], targetId: null });
    return;
  }
  if (t === "context-map" && i === "node" && a === "identity-provider") {
    e.clearSelection(), e.command({ kind: "remove-identity-provider", id: n });
    return;
  }
  if ((t === "context-map" || t === "integrations") && i === "edge" && (a === "etl-source" || a === "etl-write")) {
    const o = /^etl:([^:]+):(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-etl-step", etlFlowId: o[1], id: o[2] });
    return;
  }
  if ((t === "context-map" || t === "integrations") && i === "node" && a === "etl-flow") {
    e.clearSelection(), e.command({ kind: "remove-etl-flow", id: n });
    return;
  }
  if (t === "context-map" && i === "node" && a === "ui-app") {
    e.clearSelection(), e.command({ kind: "delete-ui-app", id: n });
    return;
  }
  if (t === "distribution" && i === "edge" && a === "deploys") {
    const o = /^deploy:(.+)->(.+)$/.exec(n);
    o && (e.clearSelection(), e.command({ kind: "remove-service-module", serviceId: o[1], id: o[2] }));
    return;
  }
  if ((t === "context-map" || t === "distribution") && i === "node" && a === "module") {
    e.clearSelection(), e.command({ kind: "remove-module", id: n });
    return;
  }
  if (t === "distribution" && i === "node") {
    const o = e.sceneFor("distribution"), r = (c) => {
      const p = o.nodes.find((h) => h.id === c);
      return p ? p.ownerId ?? p.parentId : void 0;
    };
    for (let c = r(n); c; ) {
      if ((e.model.modules ?? []).some((p) => p.id === c)) {
        e.clearSelection(), e.command({ kind: "remove-module-element", id: c, elementId: n });
        return;
      }
      c = r(c);
    }
    return;
  }
  if (t === "context-map" && i === "edge" && a === "st-fire") {
    const o = /^stfire:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "set-scheduled-trigger-target", id: o[1], targetUseCaseId: null });
    return;
  }
  if (t === "context-map" && i === "node" && a === "scheduled-trigger") {
    e.clearSelection(), e.command({ kind: "remove-scheduled-trigger", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agg-call") {
    const o = /^aggcall:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate-call", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "qs-call") {
    const o = /^qscall:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-query-call", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "external-call") {
    const o = /^extcall:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-external-call", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "ext-uc-call") {
    const o = /^extuccall:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-external-uc-call", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-use") {
    const o = /^mcp:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-agent-use", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-external-use") {
    const o = /^mcpx:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-agent-external-use", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-mcp") {
    const o = /^mcpsv:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-agent-mcp", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "gateway-exposure") {
    const o = /^gwx:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-gateway-exposure", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-gateway") {
    const o = /^aggw:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-agent-gateway", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-api-op") {
    const o = /^agapi:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api-operation", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-query") {
    const o = /^agqs:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-agent-query", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-delegate") {
    const o = /^agag:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-agent-delegate", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "actor-agent") {
    const o = /^useag:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-actor-agent", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-trigger") {
    const o = /^evag:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-agent-trigger", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (i === "node" && a === "mcp-gateway") {
    e.clearSelection(), e.command({ kind: "remove-mcp-gateway", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-rag") {
    const o = /^agrag:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-agent-rag", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "rag-source") {
    const o = /^ragsrc:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && (a === "rag-table" || a === "rag-api" || a === "rag-coarse")) {
    const o = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: o[2], targetId: o[1] });
    return;
  }
  if (i === "node" && a === "rag") {
    e.clearSelection(), e.command({ kind: "remove-rag", id: n });
    return;
  }
  if (i === "node" && a === "rag-content-source") {
    const o = /^ragcs:(.+?):(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-rag-content-source", sourceId: o[1], uri: o[2] });
    return;
  }
  if (i === "node" && a === "external-table") {
    e.clearSelection(), e.command({ kind: "remove-external-table", id: n });
    return;
  }
  if (i === "node" && a === "mcp-server") {
    e.clearSelection(), e.command({ kind: "remove-mcp-server", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "api-wire") {
    const o = /^apiwire:(.+)$/.exec(n), r = o ? e.owningApiOf(o[1]) : null;
    if (!o || !r) return;
    e.clearSelection(), e.command({ kind: "set-api-operation-target", apiId: r.id, id: o[1] });
    return;
  }
  if (i === "node" && a === "api") {
    e.clearSelection(), e.command({ kind: "remove-api", id: n });
    return;
  }
  if (i === "node" && a === "api-impl") {
    const o = /^apiimpl:(.+)@(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-api-implementation", apiId: o[1], boundedContextId: o[2] });
    return;
  }
  if (i === "node" && a === "proxy-api") {
    e.clearSelection(), e.command({ kind: "remove-proxy-api", id: n });
    return;
  }
  if (t === "context-map" && i === "node" && a === "workflow") {
    e.clearSelection(), e.command({ kind: "remove-workflow", id: n });
    return;
  }
  if (i === "node" && a === "api-operation") {
    const o = e.owningApiOf(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation", apiId: o.id, id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "actor-use") {
    const o = /^use:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-actor-use", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "actor-ext") {
    const o = /^extdep:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-actor-external", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "ext-dep") {
    const o = /^xdep:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-external-dependency", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "wf-chain") {
    const o = /^wfchain:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "set-workflow-trigger", id: o[2], triggerEvent: "" });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-api") {
    const o = /^agapi:(.+)->(.+)$/.exec(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api", sourceId: o[1], targetId: o[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "proxy-target") {
    const o = /^pxt:(.+)->(.+)$/.exec(n);
    if (!o || !(e.model.proxyApis ?? []).some((r) => r.id === o[1])) return;
    e.clearSelection(), e.command({ kind: "set-proxy-target", id: o[1], targetId: "" });
    return;
  }
  if (i === "node" && a === "boundedContext") {
    if ((e.model.aggregates ?? []).some((r) => r.boundedContextId === n)) return;
    e.clearSelection(), e.command({ kind: "remove-boundedContext", id: n });
    return;
  }
  if (i === "node" && a === "aggregate") {
    if ((e.model.entities ?? []).some((r) => r.aggregateId === n)) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate", id: n });
    return;
  }
  if (i === "node" && a === "domain-event") {
    e.clearSelection(), e.command({ kind: "remove-domain-event", id: n });
    return;
  }
  if (i === "node" && a === "read-model") {
    e.clearSelection(), e.command({ kind: "remove-read-model", id: n });
    return;
  }
  if (i === "node" && a === "domain-service") {
    e.clearSelection(), e.command({ kind: "remove-domain-service", id: n });
    return;
  }
  if (i === "node" && a === "query-service") {
    e.clearSelection(), e.command({ kind: "remove-query-service", id: n });
    return;
  }
  if (i === "node" && a === "use-case") {
    e.clearSelection(), e.command({ kind: "remove-use-case", id: n });
    return;
  }
  if (i === "node" && a === "external-use-case") {
    e.clearSelection(), e.command({ kind: "remove-external-use-case", id: n });
    return;
  }
  if (i === "node" && a === "application-event") {
    e.clearSelection(), e.command({ kind: "remove-application-event", id: n });
    return;
  }
  if (i === "node" && a === "external-system") {
    e.clearSelection(), e.command({ kind: "remove-external-system", id: n });
    return;
  }
  if (i === "node" && a === "actor") {
    e.clearSelection(), e.command({ kind: "remove-actor", id: n });
    return;
  }
  if (i === "node" && a === "ai-agent") {
    e.clearSelection(), e.command({ kind: "remove-ai-agent", id: n });
    return;
  }
  if (i === "node" && a === "flow") {
    e.clearSelection(), e.command({ kind: "remove-flow", id: n.replace(/^flow:/, "") });
    return;
  }
  if (i === "node" && a === "process") {
    e.clearSelection(), e.command({ kind: "remove-process", id: n });
    return;
  }
  if (i === "node" && a === "process-step") {
    const o = e.owningProcessOf(n);
    if (!o) return;
    e.clearSelection(), e.command({ kind: "remove-process-step", processId: o.id, id: n });
  }
}
const op = [
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
], ma = [
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
var sp = Object.defineProperty, rp = Object.getOwnPropertyDescriptor, nt = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? rp(t, i) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (a = (n ? o(t, i, a) : o(a)) || a);
  return n && a && sp(t, i, a), a;
};
const Ii = 36, rt = 20, Bt = 210, xi = 176, At = 46, fa = 36, dp = 60, lp = 46, ha = 60, ga = {
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
}, ya = {
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
}, ba = {
  COMMAND: "Comando",
  QUERY: "Query",
  EVENT: "Evento",
  EXTERNAL: "Externa"
};
let Ye = class extends Ge {
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
        const a = this.colAtX(i.x);
        if (a >= 0) {
          const s = this.participants(), o = s[a], r = s.find((g) => g.ref === n) ?? { ref: n }, c = this.model ? jc(this.model, r, o) : { kind: "COMMAND" }, p = {
            id: `msg-${crypto.randomUUID().slice(0, 8)}`,
            fromRef: n,
            toRef: o.ref,
            kind: c.kind,
            label: c.label,
            backed: this.model ? pa(
              this.model,
              { fromRef: n, toRef: o.ref, kind: c.kind, label: c.label },
              dn(this.model, t).typeOf
            ) : !1
          }, h = this.indexAtY(i.y), m = ii(t);
          this._selectedMessageId = p.id, this.changed({
            ...t,
            participants: m,
            messages: Yc(t.messages, p, h)
          });
        }
      }
      if (this._reorder) {
        const { id: n, moved: a } = this._reorder;
        if (this._reorder = null, a) {
          const s = this.indexAtY(i.y, n);
          this.changed({ ...t, messages: Kc(t.messages, n, s) });
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
    return Ii + xi / 2 + e * Bt;
  }
  rowH(e) {
    return e.kind === "COMMAND" || e.kind === "QUERY" ? dp : lp;
  }
  messageRows() {
    var n;
    const e = ((n = this.interaction) == null ? void 0 : n.messages) ?? [], t = io(e);
    let i = rt + At + fa;
    return e.map((a, s) => {
      const o = { m: a, y: i, num: t[s] };
      return i += this.rowH(a), o;
    });
  }
  diagramSize() {
    const e = this.participants(), t = this.messageRows(), i = t.length ? t[t.length - 1].y + this.rowH(t[t.length - 1].m) : rt + At + fa;
    return {
      w: Math.max(Ii * 2 + xi + Math.max(0, e.length - 1) * Bt + 60, 320),
      h: i + ha
    };
  }
  /** The insertion index a drop at this svg y produces (excluding one message). */
  indexAtY(e, t) {
    const i = this.messageRows().filter((a) => a.m.id !== t);
    let n = 0;
    for (const a of i) e > a.y + this.rowH(a.m) / 2 && n++;
    return n;
  }
  /** Nearest lifeline column within half a pitch (−1 = none). */
  colAtX(e) {
    const t = this.participants();
    let i = -1, n = Bt / 2;
    return t.forEach((a, s) => {
      const o = Math.abs(e - this.xOf(s));
      o < n && (n = o, i = s);
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
          backed: i ? pa(this.model, { ...n, kind: e.kind }, i.typeOf) : n.backed
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
        this._selectedMessageId = null, this.changed({ ...i, messages: Xc(i.messages, n) }), e.preventDefault();
      } else if (this._selectedParticipantRef) {
        const n = this._selectedParticipantRef;
        this._selectedParticipantRef = null, this.changed(Qc(i, n)), e.preventDefault();
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
        return { color: "#64748b", marker: "seq-filled-ext", dashed: !1 };
      default:
        return { color: "#334155", marker: "seq-filled-sync", dashed: !1 };
    }
  }
  renderHeader(e, t) {
    const i = this.xOf(t), n = ga[e.type] ?? ga.UNKNOWN, a = this._selectedParticipantRef === e.ref, s = e.name.length > 24 ? `${e.name.slice(0, 22)}…` : e.name;
    return Z`
      <g
        style="cursor: ${this.editable ? "pointer" : "default"}"
        @click=${(o) => {
      var r;
      o.stopPropagation(), (r = this.renderRoot.querySelector("svg")) == null || r.focus(), this._selectedParticipantRef = e.ref, this._selectedMessageId = null;
    }}
      >
        <title>${e.name} — ${ya[e.type] ?? e.type}</title>
        <rect
          x=${i - xi / 2} y=${rt} width=${xi} height=${At} rx="10"
          fill=${n.fill}
          stroke=${a ? "#2563eb" : n.stroke}
          stroke-width=${a ? 2.2 : 1.4}
        ></rect>
        <text x=${i} y=${rt + 19} text-anchor="middle" font-size="12" font-weight="600" fill="#1e293b">${s}</text>
        <text x=${i} y=${rt + 35} text-anchor="middle" font-size="8.5" letter-spacing="0.08em" fill=${n.stroke}>${ya[e.type] ?? e.type}</text>
      </g>
    `;
  }
  renderMessage(e) {
    const { m: t, y: i, num: n } = e, a = this.participants(), s = a.findIndex((A) => A.ref === t.fromRef), o = a.findIndex((A) => A.ref === t.toRef);
    if (s < 0 || o < 0) return Z``;
    const r = this.xOf(s), c = this.xOf(o), p = this.kindStyle(t), h = this._selectedMessageId === t.id, m = t.backed === !1, g = `${t.label ?? ""}${t.guard ? ` [${t.guard}]` : ""}`, y = g.length > 46 ? `${g.slice(0, 44)}…` : g, b = s === o, l = c >= r, d = b || l ? r + 6 : r - 6, f = b ? r + 52 : (r + c) / 2, _ = b ? Z`<path
          d="M ${r} ${i} H ${r + 44} V ${i + 16} H ${r + 2}"
          fill="none"
          stroke=${p.color}
          stroke-width="1.6"
          stroke-dasharray=${p.dashed ? "5 4" : "none"}
          marker-end="url(#${p.marker})"
        ></path>` : Z`<line
          x1=${l ? r + 2 : r - 2} y1=${i}
          x2=${l ? c - 2 : c + 2} y2=${i}
          stroke=${p.color}
          stroke-width="1.6"
          stroke-dasharray=${p.dashed ? "5 4" : "none"}
          marker-end="url(#${p.marker})"
        ></line>`, E = !b && (t.kind === "COMMAND" || t.kind === "QUERY") ? Z`<line
            x1=${l ? c - 2 : c + 2} y1=${i + 16}
            x2=${l ? r + 2 : r - 2} y2=${i + 16}
            stroke="#94a3b8"
            stroke-width="1"
            stroke-dasharray="4 4"
            marker-end="url(#seq-ret)"
          ></line>` : "";
    return Z`
      <g
        style="cursor: ${this.editable ? "grab" : "default"}"
        @pointerdown=${(A) => this.onMessagePointerDown(A, t)}
        @dblclick=${(A) => this.onMessageDblClick(A, t)}
      >
        <title>${m ? "sin respaldo en el modelo — materialízalo o ajústalo" : `${ba[t.kind]}${g ? ` · ${g}` : ""}`}</title>
        ${h ? Z`<line
              x1=${Math.min(r, c)} y1=${i}
              x2=${b ? r + 46 : Math.max(r, c)} y2=${i}
              stroke="#2563eb" stroke-width="7" opacity="0.22"
            ></line>` : ""}
        <!-- fat invisible hit area: the thin arrow stays easy to grab -->
        <line
          x1=${Math.min(r, c)} y1=${i} x2=${b ? r + 46 : Math.max(r, c)} y2=${i}
          stroke="transparent" stroke-width="14"
        ></line>
        ${_}
        ${E}
        <text x=${d} y=${i - 6} text-anchor=${l ? "start" : "end"} font-size="10" fill="#64748b">${n}</text>
        <text
          x=${f} y=${i - 8} text-anchor=${b ? "start" : "middle"}
          font-size="11.5"
          font-style=${t.kind === "QUERY" ? "italic" : "normal"}
          fill=${m ? "#b45309" : "#1e293b"}
        >${m ? Z`<tspan fill="#b45309">⚠ </tspan>` : ""}${y}</text>
        ${m && this.editable ? Z`<text
              class="materialize"
              x=${l ? c - 4 : c + 4} y=${i - 8}
              text-anchor=${l ? "end" : "start"}
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
    var o;
    const e = this.interaction, t = this.participants(), i = this.messageRows(), { w: n, h: a } = this.diagramSize(), s = a - ha + 20;
    return I`
      <div class="inner" style="width: ${n}px; height: ${a}px">
        <svg
          width=${n} height=${a}
          tabindex="0"
          @keydown=${this.onKeydown}
          @pointerdown=${() => {
      this._selectedMessageId = null, this._selectedParticipantRef = null, this._editor && this.commitEditor();
    }}
        >
          <defs>
            <marker id="seq-filled-sync" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#334155"></path>
            </marker>
            <marker id="seq-filled-ext" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill="#64748b"></path>
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
              <path d="M0,0 L10,5 L0,10" fill="none" stroke="#94a3b8" stroke-width="1.4"></path>
            </marker>
          </defs>
          <!-- lifelines (hit rects below the messages) -->
          ${t.map((r, c) => {
      const p = this.xOf(c);
      return Z`
              <line
                x1=${p} y1=${rt + At} x2=${p} y2=${s}
                stroke="#cbd5e1" stroke-width="1.2" stroke-dasharray="6 5"
              ></line>
              ${this.editable ? Z`<rect
                    x=${p - Bt / 2 + 10} y=${rt + At}
                    width=${Bt - 20} height=${Math.max(0, s - rt - At)}
                    fill="transparent"
                    style="cursor: crosshair"
                    @pointerdown=${(h) => this.onLifelinePointerDown(h, r.ref)}
                  ><title>Arrastra hasta otra línea de vida para crear un mensaje</title></rect>` : ""}
            `;
    })}
          ${t.map((r, c) => this.renderHeader(r, c))}
          ${i.map((r) => this.renderMessage(r))}
          ${this._connect ? Z`<line
                x1=${this.xOf(t.findIndex((r) => r.ref === this._connect.fromRef))}
                y1=${this._connect.y}
                x2=${this._connect.x}
                y2=${this._connect.y}
                stroke="#2563eb" stroke-width="1.4" stroke-dasharray="5 4"
                marker-end="url(#seq-filled-sync)"
              ></line>` : ""}
          ${(o = this._reorder) != null && o.moved ? Z`<line
                x1=${Ii / 2} y1=${this._reorder.y} x2=${n - Ii / 2} y2=${this._reorder.y}
                stroke="#2563eb" stroke-width="1.4" stroke-dasharray="7 5"
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
                        ${ba[r]}
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
Ye.styles = pt`
    :host {
      display: block;
      position: relative;
      overflow: auto;
      background: #ffffff;
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
      color: #94a3b8;
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
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.18);
      padding: 8px;
      transform: translate(-50%, -100%);
    }
    .msg-editor input,
    .msg-editor select {
      font: 12px ui-sans-serif, system-ui, sans-serif;
      padding: 4px 6px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      color: #1e293b;
    }
    .msg-editor input.label {
      width: 200px;
    }
    .msg-editor input.guard {
      width: 110px;
    }
    .msg-editor button {
      border: none;
      background: #1e293b;
      color: #ffffff;
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 12px;
      cursor: pointer;
    }
    .msg-editor button.cancel {
      background: transparent;
      color: #64748b;
    }
    text {
      font-family: ui-sans-serif, system-ui, sans-serif;
    }
    .materialize {
      cursor: pointer;
    }
  `;
nt([
  re({ attribute: !1 })
], Ye.prototype, "interaction", 2);
nt([
  re({ type: Boolean })
], Ye.prototype, "editable", 2);
nt([
  re({ attribute: !1 })
], Ye.prototype, "model", 2);
nt([
  z()
], Ye.prototype, "_selectedMessageId", 2);
nt([
  z()
], Ye.prototype, "_selectedParticipantRef", 2);
nt([
  z()
], Ye.prototype, "_connect", 2);
nt([
  z()
], Ye.prototype, "_reorder", 2);
nt([
  z()
], Ye.prototype, "_editor", 2);
Ye = nt([
  ut("modux-sequence")
], Ye);
var cp = Object.defineProperty, pp = Object.getOwnPropertyDescriptor, ne = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? pp(t, i) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (a = (n ? o(t, i, a) : o(a)) || a);
  return n && a && cp(t, i, a), a;
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
}, up = Object.keys(ln);
function Ft(e, t, i) {
  const n = i.x - i.w / 2, a = i.x + i.w / 2, s = i.y - i.h / 2, o = i.y + i.h / 2;
  let r = 0, c = 1;
  const p = t.x - e.x, h = t.y - e.y;
  for (const [m, g] of [
    [-p, e.x - n],
    [p, a - e.x],
    [-h, e.y - s],
    [h, o - e.y]
  ]) {
    if (m === 0) {
      if (g < 0) return !1;
      continue;
    }
    const y = g / m;
    if (m < 0) {
      if (y > c) return !1;
      y > r && (r = y);
    } else {
      if (y < r) return !1;
      y < c && (c = y);
    }
  }
  return c - r > 0.02;
}
function mp(e, t, i = 28) {
  const n = new Map(e.nodes.map((p) => [p.id, p])), a = (p) => {
    var m;
    const h = /* @__PURE__ */ new Set();
    for (let g = p; g; g = (m = n.get(g)) == null ? void 0 : m.parentId) h.add(g);
    return h;
  }, s = e.nodes.filter((p) => p.kind !== "area"), o = (p) => p.parentId ? Math.min(i, 6) : i, r = /* @__PURE__ */ new Map(), c = (p, h, m) => {
    const g = o(m), y = { x: m.x, y: m.y, w: m.w + 2 * g, h: m.h + 2 * g }, b = m.w / 2 + g * 1.5, l = m.h / 2 + g * 1.5, d = { x: m.x - b, y: m.y - l }, f = { x: m.x + b, y: m.y - l }, _ = { x: m.x - b, y: m.y + l }, E = { x: m.x + b, y: m.y + l }, A = [];
    for (const O of [d, f, _, E])
      !Ft(p, O, y) && !Ft(O, h, y) && A.push([O]);
    for (const [O, C] of [
      [d, f],
      [f, d],
      [f, E],
      [E, f],
      [E, _],
      [_, E],
      [_, d],
      [d, _]
    ])
      !Ft(p, O, y) && !Ft(C, h, y) && A.push([O, C]);
    return A;
  };
  for (const p of e.edges) {
    if (t[p.id]) continue;
    const h = n.get(p.sourceId), m = n.get(p.targetId);
    if (!h || !m) continue;
    const g = /* @__PURE__ */ new Set([...a(h.id), ...a(m.id)]), y = [
      { x: h.x, y: h.y },
      { x: m.x, y: m.y }
    ];
    for (let b = 0; b < 12; b++) {
      let l = !1;
      e: for (let d = 0; d < y.length - 1; d++)
        for (const f of s) {
          if (g.has(f.id)) continue;
          const _ = o(f), E = { x: f.x, y: f.y, w: f.w + 2 * _, h: f.h + 2 * _ };
          if (!Ft(y[d], y[d + 1], E)) continue;
          const A = c(y[d], y[d + 1], f);
          if (!A.length) continue;
          const O = (N) => s.some(
            (G) => G !== f && !g.has(G.id) && Math.abs(N.x - G.x) < G.w / 2 + o(G) / 2 && Math.abs(N.y - G.y) < G.h / 2 + o(G) / 2
          ), C = (N) => {
            let G = 0;
            const j = [y[d], ...N, y[d + 1]];
            for (let de = 0; de < j.length - 1; de++)
              G += Math.hypot(j[de + 1].x - j[de].x, j[de + 1].y - j[de].y);
            return G + (N.some(O) ? 1e4 : 0);
          };
          A.sort((N, G) => C(N) - C(G)), y.splice(d + 1, 0, ...A[0]), l = !0;
          break e;
        }
      if (!l) break;
    }
    y.length > 2 && r.set(
      p.id,
      y.slice(1, -1).map((b) => ({ x: Math.round(b.x), y: Math.round(b.y) }))
    );
  }
  return r;
}
function fp(e, t) {
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
function hp(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((a) => a.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let ie = class extends Ge {
  constructor() {
    super(...arguments), this.model = {
      boundedContexts: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !0, this._yugo = !0, this.repositories = [], this.dark = !1, this._pendingNames = /* @__PURE__ */ new Set(), this._paletteOpenedForBlank = !1, this._repoPicker = null, this._wfStepPicker = null, this._branchCondEditor = null, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newBoundedContextId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._interactionId = null, this._editingInteraction = null, this._interactionMode = "authored", this.derivedInteraction = null, this._derivePending = !1, this._interactionPrompt = null, this._interactionDelete = null, this._connectPicker = null, this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
      this._fullscreen = this.matches(":fullscreen");
    }, this.hostKeydown = (e) => {
      var s;
      const t = e.composedPath()[0], i = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (i === "input" || i === "textarea" || i === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const n = this.renderRoot.querySelector("modux-canvas"), a = (o) => {
        e.preventDefault(), this.onDiagramScopeChange(o);
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
          a("view:eventstorming");
          break;
        case "a":
        case "A":
          a("view:aggregates");
          break;
        case "1":
          a("view:context-map");
          break;
        case "2":
          a("view:interactions");
          break;
        case "4":
          a("view:distribution");
          break;
        case "5":
          a("view:flows");
          break;
        case "6":
          a("view:processes");
          break;
        case "7":
          a("view:workflows");
          break;
        case "8":
          a("view:ui");
          break;
        case "9":
          a("view:design");
          break;
        case "?":
          e.preventDefault(), this._helpOpen = !this._helpOpen;
          break;
        case "Escape":
          this._helpOpen && (this._helpOpen = !1), this._connectPicker && (this._connectPicker = null);
          break;
      }
    }, this._gestureEffects = 0, this.onMenuSlotRequested = (e) => {
      const { id: t, appId: i, beforeId: n, nestRowId: a } = e.detail, s = Ce(t);
      if (!(s != null && s.itemId)) return;
      const o = this.menuEntryIn(s.appId, s.itemId);
      if (!o) return;
      const r = (c, p) => (c ?? []).some((h) => h.id === p || r(h.children, p));
      if (a) {
        const c = Ce(a);
        if (!(c != null && c.itemId) || c.itemId === s.itemId || s.appId === c.appId && r(o.entry.children, c.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: s.appId,
          toAppId: c.appId,
          itemId: s.itemId,
          parentId: c.itemId
        });
        return;
      }
      if (n) {
        const c = Ce(n);
        if (!(c != null && c.itemId) || c.itemId === s.itemId) return;
        const p = this.menuEntryIn(c.appId, c.itemId);
        if (!p || s.appId === c.appId && r(o.entry.children, c.itemId) || s.appId === c.appId && p.parentId === o.parentId && o.beforeId === c.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: s.appId,
          toAppId: c.appId,
          itemId: s.itemId,
          parentId: p.parentId ?? void 0,
          beforeItemId: c.itemId
        });
        return;
      }
      i && this.command({ kind: "move-menu-item", appId: s.appId, toAppId: i, itemId: s.itemId });
    }, this.onWizardSlotRequested = (e) => {
      var s;
      const { id: t, beforeId: i } = e.detail, n = /^wizrow:([^:]+):(.+)$/.exec(t);
      if (!n) return;
      const a = i ? ((s = /^wizrow:[^:]+:(.+)$/.exec(i)) == null ? void 0 : s[1]) ?? null : null;
      this.moveWizardStep(n[1], n[2], a);
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
      const { fromPageId: t, toPageId: i, componentId: n, toParentId: a, beforeComponentId: s } = e.detail, o = this.componentIn(t, n);
      if (!o || t === i) return;
      const r = JSON.parse(JSON.stringify(o.node)), { ops: c } = this.rebuildComponentOps(i, r, a ?? void 0, s);
      for (const p of c) this.command(p, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: n }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: n },
        ...this.rebuildComponentOps(t, r, o.parentId ?? void 0, o.beforeId).ops
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
    return mt(this.layout[this.layoutKey(e)]);
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
      const a = mt(i[n]);
      if (!(e in a.nodes) && !(e in (a.sizes ?? {}))) continue;
      const s = { ...a.nodes };
      delete s[e];
      const o = { ...a.sizes ?? {} };
      delete o[e], i[n] = { ...a, nodes: s, sizes: o }, t = !0;
    }
    t && (this.layout = i, this.emit("layout-changed", { layout: this.layout }));
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    var t;
    if (e.has("model") && this._pendingNames.clear(), e.has("model") && this.pruneStaleEdgePoints(), e.has("model") && this._interactionMode === "authored" && this._interactionId) {
      const i = (this.model.interactions ?? []).find((n) => n.id === this._interactionId);
      if (i) {
        const n = JSON.parse(JSON.stringify(i)), a = ii(n), s = (((t = this._editingInteraction) == null ? void 0 : t.participants) ?? []).filter(
          (o) => !a.some((r) => r.ref === o.ref) && !n.messages.some((r) => r.fromRef === o.ref || r.toRef === o.ref)
        );
        s.length && (n.participants = [...a, ...s]), this._editingInteraction = n;
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
      const a = mt(i[n]);
      if (a.flat) continue;
      const s = xa(
        this.model,
        n.startsWith("distribution") ? "distribution" : "unified"
      ), o = /* @__PURE__ */ new Map(), r = (m, g = 0) => {
        if (g > 12) return a.nodes[m] ?? null;
        const y = o.get(m);
        if (y) return y;
        const b = a.nodes[m], l = s.get(m);
        if (!l)
          return b && o.set(m, b), b ?? null;
        if (!b) return null;
        const d = r(l, g + 1), f = d ? { x: d.x + b.x, y: d.y + b.y } : b;
        return o.set(m, f), f;
      }, c = {};
      for (const m of Object.keys(a.nodes))
        c[m] = r(m) ?? a.nodes[m];
      const p = new Set(s.values()), h = { ...a.sizes ?? {} };
      for (const m of Object.keys(h)) p.has(m) && delete h[m];
      i[n] = { ...a, nodes: c, sizes: h, flat: !0 }, t = !0;
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
    const e = mt(this.layout["context-map"]), t = ["context-map@detail", "context-map@operations", "context-map@distribution"];
    if (!(e.detail !== void 0 || t.some((h) => this.layout[h])) || !this.model.boundedContexts.length && !this.model.externalSystems.length) return;
    const n = { ...this.layout }, a = (h) => mt(n[h]), s = e.detail ?? "contexts", o = s === "detail" && n["context-map@detail"] ? a("context-map@detail") : s === "operations" && n["context-map@operations"] ? a("context-map@operations") : e, r = {
      nodes: { ...o.nodes },
      edges: { ...o.edges },
      sizes: { ...o.sizes ?? {} }
    };
    for (const h of ["context-map", "context-map@detail", "context-map@operations"]) {
      const m = a(h);
      for (const [g, y] of Object.entries(m.nodes)) g in r.nodes || (r.nodes[g] = y);
      for (const [g, y] of Object.entries(m.sizes ?? {})) g in r.sizes || (r.sizes[g] = y);
    }
    const c = /* @__PURE__ */ new Set();
    if (s === "contexts" || s === "distribution")
      for (const h of e.collapsed ?? []) c.add(h);
    else {
      const h = new Set(o.collapsed ?? []);
      for (const m of this.model.boundedContexts) c.add(m.id);
      for (const m of this.model.externalSystems) c.add(m.id);
      if (s === "operations") {
        for (const m of this.model.apis ?? []) c.add(m.id);
        for (const m of this.model.proxyApis ?? []) c.add(m.id);
        for (const m of this.model.apiImplementations ?? [])
          c.add(`apiimpl:${m.apiId}@${m.boundedContextId}`);
      }
      for (const m of h) c.delete(m);
    }
    n["context-map"] = { nodes: r.nodes, edges: r.edges, sizes: r.sizes, expanded: [...c] };
    const p = n["context-map@distribution"];
    if (p && !n.distribution) {
      const h = mt(p);
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
    const i = this.sceneFor(this._view), n = new Set(i.edges.map((r) => r.id)), a = new Set(i.nodes.map((r) => r.id)), s = t.filter((r) => {
      if (n.has(r)) return !1;
      const c = /^(?:[a-z-]+:)?(.+?)->(.+)$/i.exec(r);
      return !!c && a.has(c[1]) && a.has(c[2]);
    });
    if (!s.length) return;
    const o = { ...e.edges };
    s.forEach((r) => delete o[r]), this.writeViewLayout(this._view, { ...e, edges: o });
  }
  /**
   * Expanding a node grows its container over the neighbours: nudge the
   * top-level boxes apart (one undoable step) so the map stays legible.
   * Areas group by overlapping — pushing them apart would defeat them.
   */
  declumpView(e) {
    const t = this.viewLayout(e), i = this.sceneFor(e).nodes.filter(
      (o) => !o.parentId && !o.ownerId && o.kind !== "area"
    ), n = Mo(i), a = [...n.keys()].map((o) => ({
      kind: "move-node",
      view: e,
      id: o,
      pos: t.nodes[o] ?? null
    })), s = { ...t.nodes };
    for (const [o, r] of n) {
      const c = i.find((h) => h.id === o), p = t.nodes[o] ?? { x: c.x, y: c.y };
      s[o] = {
        x: Math.round(p.x + (r.x - c.x)),
        y: Math.round(p.y + (r.y - c.y))
      };
    }
    this.writeViewLayout(e, { ...t, nodes: s }), a.length && this.pushUndoEntry(a);
  }
  /**
   * Display-time edge routing: straight edges that run over a foreign node get
   * detour bends, recomputed with every scene (no persistence, so they follow
   * every level change and drag). Hand-placed bends always win.
   */
  routedEdgePoints(e) {
    const t = this.viewLayout(this._view).edges;
    if (this._view !== "context-map") return t;
    const i = mp(e, t);
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
    const { id: t, x: i, y: n } = e.detail, a = this._view, s = this.viewLayout(a), o = s.nodes[t] ?? null;
    let r = { x: i, y: n };
    const c = this.sceneFor(a), p = c.nodes.find((m) => m.id === t);
    if (p != null && p.parentId) {
      const m = c.nodes.find((g) => g.id === p.parentId);
      m && (r = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(a, { ...s, nodes: { ...s.nodes, [t]: r } });
    const h = [{ kind: "move-node", view: a, id: t, pos: o }];
    if (a === "processes") {
      const m = this.stepReorderCommand(t);
      if (m) {
        const g = this.inverseOf(m);
        g && h.unshift(...g), this.command(m, !1);
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
    const { id: t, targetId: i, x: n, y: a } = e.detail, s = this.model.externalSystems.find((l) => l.id === t);
    if (s) {
      const l = i ? this.model.externalSystems.find((N) => N.id === i) : null;
      if (i && !l) return;
      for (let N = l; N; ) {
        if (N.id === t) return;
        const G = N.parentExternalSystemId;
        N = G ? this.model.externalSystems.find((j) => j.id === G) ?? null : null;
      }
      const d = (l == null ? void 0 : l.id) ?? null;
      if ((s.parentExternalSystemId ?? null) === d) return;
      const f = this._view, _ = this.viewLayout(f), E = this.sceneFor(f), A = d ? E.nodes.find((N) => N.id === d) : void 0, O = A ? { x: n - A.x, y: a - A.y } : { x: n, y: a }, C = d ? (this.model.externalSystemDependencies ?? []).filter(
        (N) => N.sourceId === t && N.targetId === d || N.sourceId === d && N.targetId === t
      ) : [];
      this.pushUndoEntry([
        { kind: "set-external-system-parent", id: t, parentId: s.parentExternalSystemId ?? null },
        ...C.map((N) => ({
          kind: "add-external-dependency",
          sourceId: N.sourceId,
          targetId: N.targetId,
          ...N.type === "CQRS" ? { type: "CQRS" } : {}
        })),
        { kind: "move-node", view: f, id: t, pos: _.nodes[t] ?? null }
      ]), this.command({ kind: "set-external-system-parent", id: t, parentId: d }, !1), this.writeViewLayout(f, { ..._, nodes: { ..._.nodes, [t]: O } });
      return;
    }
    const o = (this.model.apis ?? []).find((l) => l.id === t) ?? (this.model.proxyApis ?? []).find((l) => l.id === t);
    if (!o || i && !this.model.externalSystems.some((l) => l.id === i)) return;
    const r = o.publishedByExternalSystemId ?? "", c = i ?? "";
    if (c === r) return;
    const p = this._view, h = this.viewLayout(p), m = this.sceneFor(p), g = c ? m.nodes.find((l) => l.id === c) : void 0, y = g ? { x: n - g.x, y: a - g.y } : { x: n, y: a }, b = [
      { kind: "set-api-publisher", id: t, targetId: r },
      { kind: "move-node", view: p, id: t, pos: h.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: c }, !1), this.writeViewLayout(p, { ...h, nodes: { ...h.nodes, [t]: y } }), this.pushUndoEntry(b);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: a } = e.detail, s = (this.model.apis ?? []).find((b) => b.id === t), o = this.model.externalSystems.find((b) => b.id === i);
    if (!s || !o || (this.model.proxyApis ?? []).some(
      (b) => b.targetApiId === t && b.publishedByExternalSystemId === i
    )) return;
    const c = `proxy-${ce(s.name)}-${ce(o.name)}`;
    if ((this.model.proxyApis ?? []).some((b) => b.id === c)) return;
    const p = this._view, h = this.viewLayout(p), g = this.sceneFor(p).nodes.find((b) => b.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: c,
        name: `${s.name}@${o.name}`,
        targetId: t,
        boundedContextId: i
      },
      !1
    );
    const y = [{ kind: "remove-proxy-api", id: c }];
    g && (y.push({ kind: "move-node", view: p, id: c, pos: h.nodes[c] ?? null }), this.writeViewLayout(p, {
      ...h,
      nodes: { ...h.nodes, [c]: { x: n - g.x, y: a - g.y } }
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
    var r, c, p;
    const t = e.target, i = (r = t.files) == null ? void 0 : r[0];
    if (t.value = "", !i) return;
    const n = await i.text(), a = this.selectedApiId(), s = a ? null : ((c = this.model.externalSystems.find((h) => h.id === this._selectedId)) == null ? void 0 : c.id) ?? null, o = a || s ? null : ((p = this.model.boundedContexts.find((h) => h.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
    if (!a && !s && !o) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: n,
      fileName: i.name,
      apiId: a,
      homeExternalId: s,
      homeBoundedContextId: o
    });
  }
  /** One dropdown drives the diagram: the map, the distribution lens, or a specialized view. */
  onDiagramScopeChange(e) {
    e.startsWith("view:") && (this._view = e.slice(5), this._paletteOpen = !0);
  }
  /** Expansion is a sheet preference (persisted with the vista, not undoable). */
  onNodeCollapseToggled(e) {
    const { id: t } = e.detail, i = this._view, n = this.viewLayout(i), a = new Set(n.expanded ?? []), s = !a.has(t);
    s ? a.add(t) : a.delete(t), this.writeViewLayout(i, { ...n, expanded: [...a] }), s && this.declumpView(i);
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), a = this.sceneFor(i), s = { ...n.nodes }, o = [];
    for (const { id: r, x: c, y: p } of t) {
      o.push({ kind: "move-node", view: i, id: r, pos: n.nodes[r] ?? null });
      let h = { x: c, y: p };
      const m = a.nodes.find((g) => g.id === r);
      if (m != null && m.parentId) {
        const g = a.nodes.find((y) => y.id === m.parentId);
        g && (h = { x: c - g.x, y: p - g.y });
      }
      s[r] = h;
    }
    if (this.writeViewLayout(i, { ...n, nodes: s }), i === "processes")
      for (const { id: r } of t) {
        const c = this.stepReorderCommand(r);
        if (c) {
          const p = this.inverseOf(c);
          p && o.unshift(...p), this.command(c, !1);
        }
      }
    this.pushUndoEntry(o);
  }
  onNodeResized(e) {
    var y;
    const { id: t, x: i, y: n, w: a, h: s } = e.detail, o = this._view, r = this.viewLayout(o), c = this.sceneFor(o), p = c.nodes.find((b) => b.id === t), h = p != null && p.parentId ? c.nodes.find((b) => b.id === p.parentId) : void 0, m = h ? [] : c.nodes.filter((b) => b.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: o, id: t, size: ((y = r.sizes) == null ? void 0 : y[t]) ?? null },
      { kind: "move-node", view: o, id: t, pos: r.nodes[t] ?? null },
      ...m.map((b) => ({ kind: "move-node", view: o, id: b.id, pos: r.nodes[b.id] ?? null }))
    ]);
    const g = {
      ...r.nodes,
      [t]: h ? { x: i - h.x, y: n - h.y } : { x: i, y: n }
    };
    for (const b of m) g[b.id] = { x: b.x - i, y: b.y - n };
    this.writeViewLayout(o, {
      ...r,
      nodes: g,
      sizes: { ...r.sizes ?? {}, [t]: { w: a, h: s } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, n = this._view, a = this.viewLayout(n);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: n, id: t, points: a.edges[t] ?? null }
    ]);
    const s = { ...a.edges };
    s[t] = i, this.writeViewLayout(n, { ...a, edges: s });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = wn(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((o) => [o.id, o.x])), a = [...t.steps].sort(
      (o, r) => (n.get(o.id) ?? 0) - (n.get(r.id) ?? 0)
    );
    if (a.every((o, r) => o.id === t.steps[r].id)) return null;
    const s = a.findIndex((o) => o.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: s > 0 ? a[s - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: n, y: a, connectKind: s } = e.detail;
    this.applyConnection(t, i, n, a, s);
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
    return tp(this.gestureHost(), e);
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
    for (; (this.model.interactions ?? []).some((a) => a.id === i); ) i = `${t}-${n++}`;
    return i;
  }
  onInteractionPick(e) {
    const t = e.target, i = t.value;
    if (t.value = "", i === "__new__") {
      this._interactionPrompt = {
        title: "Nombre de la nueva secuencia",
        value: "",
        apply: (n) => {
          const a = this.uniqueInteractionId(n), s = { id: a, name: n, participants: [], messages: [] };
          this._interactionMode = "authored", this._interactionId = a, this._editingInteraction = s, this.command(vt(s));
        }
      };
      return;
    }
    this.enterAuthored(i || null);
  }
  onDerivePick(e) {
    const t = e.target, i = t.value;
    if (t.value = "", !i) return;
    const [n, a] = i.split("|");
    this.enterDerived(n, a);
  }
  /** 📌 in derived mode: persist the ephemeral interaction and switch to authored. */
  pinDerivedInteraction() {
    const e = this.derivedInteraction;
    e && (this._interactionPrompt = {
      title: "Fijar como secuencia authoreda — nombre",
      value: e.name ?? "",
      apply: (t) => {
        const i = this.uniqueInteractionId(t), n = { ...e, id: i, name: t, ephemeral: !1 };
        this._interactionMode = "authored", this._interactionId = i, this._editingInteraction = n, this.command(vt(n)), this.emit("modux-notice", { message: `Secuencia «${t}» fijada en el modelo` });
      }
    });
  }
  async copyInteractionMermaid() {
    const e = this.currentInteraction();
    if (e)
      try {
        await navigator.clipboard.writeText(Zc(e)), this.emit("modux-notice", { message: "Mermaid copiado al portapapeles" });
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
    const a = ua(this.model).find((r) => r.ref === i);
    if (!a) return;
    const s = ii(n);
    if (s.some((r) => r.ref === i)) {
      this.emit("modux-notice", { message: `«${a.name}» ya es participante` });
      return;
    }
    const o = {
      ...n,
      participants: [...s, { ref: i, name: a.name, type: a.type }]
    };
    this._editingInteraction = o, this.command(vt(o), !1);
  }
  onInteractionChanged(e) {
    const t = e.detail;
    this._editingInteraction = t, this.command(vt(t));
  }
  /** ✨ on an unbacked message: the EXISTING commands that build its mechanism (one undo). */
  onInteractionMaterialize(e) {
    const t = this._editingInteraction, i = t == null ? void 0 : t.messages.find((c) => c.id === e.detail.messageId);
    if (!t || !i) return;
    const n = dn(this.model, t), { commands: a, hint: s } = Jc(
      this.model,
      i,
      n.typeOf,
      n.nameOf
    );
    if (!a.length) {
      this.emit("modux-notice", { message: s ?? "Este mensaje no se puede materializar" });
      return;
    }
    const o = a.flatMap((c) => this.inverseOf(c) ?? []);
    for (const c of a) this.command(c, !1);
    o.length && this.pushUndoEntry(o);
    const r = {
      ...t,
      messages: t.messages.map((c) => c.id === i.id ? { ...c, backed: !0 } : c)
    };
    this._editingInteraction = r, this.command(vt(r));
  }
  applyConnection(e, t, i, n, a) {
    const s = this._gestureEffects, o = () => !!(this._connectPicker || this._relationPicker || this._extDepPicker || this._deletePicker), r = o();
    if (It(this.gestureHost(), this._view, e, t, i, n, a), this._gestureEffects === s && o() === r && a === void 0 && e !== t && ["context-map", "aggregates", "integrations"].includes(this._view)) {
      const c = this.sceneFor(this._view), p = (h) => c.nodes.some((m) => m.id === h);
      p(e) && p(t) && (this._connectPicker = {
        x: i ?? this.clientWidth / 2,
        y: n ?? 120,
        options: Ni(this.gestureHost(), e, t)
      });
    }
  }
  performDelete(e, t, i) {
    ap(this.gestureHost(), this._view, e, t, i);
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
      rebuildComponentOps: (e, t, i, n, a, s) => this.rebuildComponentOps(e, t, i, n, a, s),
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
    const t = (this.model.processes ?? []).find((a) => a.id === this._selectedId), i = t ?? this.owningProcessOf(this._selectedId);
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
    const e = (this.model.views ?? []).find((a) => a.id === this._activeViewId);
    if (!e) return "";
    const t = new Set(e.memberIds), i = (a, s, o = {}) => I`
      <label
        class="${o.child ? "child" : ""} ${o.implicit && !t.has(a) ? "implicit" : ""}"
        title=${o.implicit && !t.has(a) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(a)}
          @change=${(r) => this.toggleViewMember(a, r.target.checked)}
        />
        ${s}
      </label>
    `, n = (a, s) => s.length ? I`<h4>${a}</h4>${s}` : "";
    return I`
      <aside class="view-tree" @pointerdown=${(a) => a.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${n(
      "Contextos",
      this.model.boundedContexts.flatMap((a) => [
        i(a.id, a.name),
        ...(this.model.aggregates ?? []).filter((s) => s.boundedContextId === a.id).map((s) => i(s.id, s.name, { child: !0, implicit: t.has(a.id) }))
      ])
    )}
        ${n(
      "Sistemas externos",
      this.model.externalSystems.map((a) => i(a.id, a.name))
    )}
        ${n("APIs", (this.model.apis ?? []).map((a) => i(a.id, a.name)))}
        ${n("Actores", (this.model.actors ?? []).map((a) => i(a.id, a.name)))}
        ${n("Agentes IA", (this.model.aiAgents ?? []).map((a) => i(a.id, a.name)))}
        ${n("Gateways MCP", (this.model.mcpGateways ?? []).map((a) => i(a.id, a.name)))}
        ${n("RAGs", (this.model.rags ?? []).map((a) => i(a.id, a.name)))}
        ${n("Flows", this.model.flows.map((a) => i(a.id, a.name)))}
        ${n("Procesos", (this.model.processes ?? []).map((a) => i(a.id, a.name)))}
        ${n("Workflows", (this.model.workflows ?? []).map((a) => i(a.id, a.name)))}
      </aside>
    `;
  }
  onElementSelected(e) {
    var t, i;
    if (this._selectedId = e.detail.id, this._multi = [], e.detail.kind === "process-step") {
      const n = (t = this.owningProcessOf(e.detail.id)) == null ? void 0 : t.steps.find((a) => a.id === e.detail.id);
      this._editStepRole = (n == null ? void 0 : n.roleId) ?? "", this._editStepDeadline = (n == null ? void 0 : n.deadline) ?? "", this._editStepComp = (n == null ? void 0 : n.compensationUseCaseId) ?? "";
    }
    if (e.detail.kind === "workflow-step") {
      const n = (i = this.owningWorkflowOf(e.detail.id)) == null ? void 0 : i.steps.find((a) => a.id === e.detail.id);
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
      const n = e.nodes.find((a) => a.id === i);
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
            const a = Ce(i);
            a && t.add(a.appId);
            break;
          }
          case "flow":
            t.add(i.replace(/^flow:/, ""));
            break;
          case "process-step": {
            const a = this.owningProcessOf(i);
            a && t.add(a.id);
            break;
          }
          case "workflow-step": {
            const a = this.owningWorkflowOf(i);
            a && t.add(a.id);
            break;
          }
        }
    }
    return [...t];
  }
  createViewFromSelection() {
    const e = this._newViewName.trim(), t = this.memberIdsFromSelection(), i = t.length ? t : this.visibleMemberIds();
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
      const t = `${this._view}@view:${e}`, i = mt(this.layout[t]);
      if (!Object.keys(i.nodes).length && !Object.keys(i.sizes ?? {}).length && !(i.expanded ?? []).length) {
        const a = this.viewLayout(this._view);
        this.layout = {
          ...this.layout,
          [t]: {
            nodes: { ...a.nodes },
            edges: { ...a.edges },
            sizes: { ...a.sizes ?? {} },
            expanded: [...a.expanded ?? []],
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
    const t = new Set(e.memberIds), i = this.model.boundedContexts.filter((y) => t.has(y.id)), n = new Set(i.map((y) => y.id)), a = this.model.externalSystems.filter((y) => t.has(y.id)), s = new Set(a.map((y) => y.id)), o = (this.model.aggregates ?? []).filter(
      (y) => t.has(y.id) || n.has(y.boundedContextId)
    ), r = new Set(o.map((y) => y.id)), c = (this.model.uiApps ?? []).filter((y) => t.has(y.id)), p = /* @__PURE__ */ new Set(), h = (y) => {
      for (const b of y ?? [])
        b.pageId && p.add(b.pageId), h(b.children);
    };
    c.forEach((y) => h(y.menuItems));
    const m = (this.model.pages ?? []).filter(
      (y) => t.has(y.id) || p.has(y.id)
    ), g = new Set(c.map((y) => y.id));
    return {
      ...this.model,
      uiApps: c,
      pages: m,
      actorAppUses: (this.model.actorAppUses ?? []).filter((y) => g.has(y.appId)),
      boundedContexts: i,
      externalSystems: a,
      relations: this.model.relations.filter(
        (y) => n.has(y.sourceId) && n.has(y.targetId)
      ),
      flows: this.model.flows.filter(
        (y) => t.has(y.id) || (n.has(y.sourceId) || s.has(y.sourceId)) && (n.has(y.targetId) || s.has(y.targetId))
      ),
      aggregates: o,
      entities: (this.model.entities ?? []).filter((y) => r.has(y.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (y) => r.has(y.sourceAggregateId) && r.has(y.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (y) => t.has(y.id) || (y.ownerBoundedContextId ? n.has(y.ownerBoundedContextId) : !1)
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
    var i;
    if (this._view === "workflows" && e.detail.elementType === "edge" && e.detail.kind === "wf-link") {
      const n = /^wflink:(.+)->(.+)$/.exec(e.detail.id), a = n ? (this.model.workflowGateways ?? []).find((s) => s.id === n[1]) : null;
      if (n && a && a.type === "SPLIT" && a.semantics === "EXCLUSIVE") {
        const s = ((i = (a.branchConditions ?? []).find((o) => o.targetId === n[2])) == null ? void 0 : i.expression) ?? "";
        this._branchCondEditor = { gatewayId: a.id, targetId: n[2], value: s };
      }
      return;
    }
    if (this._view === "workflows" && e.detail.kind === "workflow-gateway") {
      const n = (this.model.workflowGateways ?? []).find((s) => s.id === e.detail.id);
      if (!n) return;
      const a = n.type === "SPLIT" ? n.semantics === "EXCLUSIVE" ? "PARALLEL" : "EXCLUSIVE" : n.semantics === "ANY" ? "ALL" : "ANY";
      this.command({ kind: "set-gateway-semantics", id: n.id, type: a });
      return;
    }
    if (this._view === "ui" && e.detail.elementType === "node" && e.detail.kind === "page") {
      this._view = "design", this._selectedId = e.detail.id;
      return;
    }
    if (e.detail.elementType === "edge" && e.detail.kind === "archimate-relation") {
      const n = e.detail.id.replace(/^archi:/, ""), a = (this.model.archimateRelations ?? []).find((s) => s.id === n);
      a && (this._connectPicker = {
        x: e.detail.x ?? this.clientWidth / 2,
        y: e.detail.y ?? 120,
        options: Ni(this.gestureHost(), a.sourceId, a.targetId).map((s) => ({
          ...s,
          label: s.id === `archimate:${a.type}` ? `● ${s.label}` : s.label,
          apply: () => {
            this.command({
              kind: "set-archimate-relation-type",
              id: n,
              type: s.id.replace(/^archimate:/, "")
            });
          }
        }))
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
      const n = (this.model.aggregates ?? []).find((a) => (a.invariants ?? []).some((s) => s.id === e.detail.id));
      n && this.openInDrawer({ elementType: "aggregate", id: n.id });
      return;
    }
    const t = e.detail.kind === "process-step" ? hp(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const n = this.owningWorkflowOf(e.detail.id);
      return n ? { elementType: "workflow", id: n.id } : null;
    })() : fp(e.detail.id, e.detail.kind);
    t && this.openInDrawer(t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (s) => {
      for (const o of s ?? [])
        o.id && t.add(o.id), i(o.children);
    };
    (this.model.uiApps ?? []).forEach((s) => i(s.menuItems));
    const n = `mi-${ce(e)}`;
    let a = n;
    for (let s = 2; t.has(a); s++) a = `${n}-${s}`;
    return a;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const i = (this.model.pages ?? []).find((s) => s.id === e);
    let n = null;
    const a = (s, o) => {
      var c;
      const r = s ?? [];
      for (let p = 0; p < r.length; p++)
        r[p].id === t && (n = { node: r[p], parentId: o, beforeId: ((c = r[p + 1]) == null ? void 0 : c.id) ?? null }), a(r[p].children, r[p].id);
    };
    return a(i == null ? void 0 : i.content, null), n;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, n, a = !1, s) {
    const o = s ?? this.allComponentIds(), r = (m) => {
      if (!a) return m.id;
      const g = `cmp-${ce(m.kind)}`;
      let y = g;
      for (let b = 2; o.has(y) || o.has(`${y}-tab-1`); b++) y = `${g}-${b}`;
      return o.add(y), y;
    }, c = [], p = (m, g) => {
      const y = r(m);
      c.push({ kind: "add-page-component", pageId: e, componentId: y, componentKind: m.kind, parentComponentId: g }), m.kind === "tabLayout" && (c.push({ kind: "remove-page-component", pageId: e, componentId: `${y}-tab-1` }), c.push({ kind: "remove-page-component", pageId: e, componentId: `${y}-tab-2` })), c.push({ kind: "set-page-component", pageId: e, componentId: y, ...this.cmpPatch(m) });
      for (const b of m.children ?? []) p(b, y);
      return y;
    }, h = p(t, i);
    return n && c.push({
      kind: "move-page-component",
      pageId: e,
      componentId: h,
      parentComponentId: i ?? null,
      beforeComponentId: n
    }), { ops: c, rootId: h };
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
    for (let a = 2; t.has(n) || t.has(`${n}-tab-1`); a++) n = `${i}-${a}`;
    return n;
  }
  /** Re-slots a wizard step unless it already sits exactly there. */
  moveWizardStep(e, t, i) {
    var s;
    if (i === t) return;
    const n = (((s = (this.model.pages ?? []).find((o) => o.id === e)) == null ? void 0 : s.wizardSteps) ?? []).map((o) => o.id ?? o.pageId), a = n.indexOf(t);
    a >= 0 && (i ? n[a + 1] === i : a === n.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: i });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((s) => s.id === e);
    let n = null;
    const a = (s, o) => {
      var c;
      const r = s ?? [];
      for (let p = 0; p < r.length; p++)
        r[p].id === t && (n = { entry: r[p], parentId: o, beforeId: ((c = r[p + 1]) == null ? void 0 : c.id) ?? null }), a(r[p].children, r[p].id ?? null);
    };
    return a(i == null ? void 0 : i.menuItems, null), n;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var o;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, i, n = null;
    if (this._selectedCmp) {
      const r = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!r) return;
      t = this._selectedCmp.pageId, pe.LEAF_KINDS.has(r.node.kind) ? (i = r.parentId ?? void 0, n = r.beforeId) : i = r.node.kind === "tabLayout" && e.kind !== "tab" ? (o = (r.node.children ?? [])[0]) == null ? void 0 : o.id : r.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((r) => r.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: a, rootId: s } = this.rebuildComponentOps(t, e, i, n, !0);
    for (const r of a) this.command(r, !1);
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
      var o;
      const { id: i, w: n, h: a } = t.detail, s = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: i, size: ((o = s.sizes) == null ? void 0 : o[i]) ?? null }
      ]), this.writeViewLayout("design", {
        ...s,
        sizes: { ...s.sizes ?? {}, [i]: { w: n, h: a } }
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
      const { pageId: i, componentId: n, ...a } = t.detail;
      this.command({ kind: "set-page-component", pageId: i, componentId: n, ...a });
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
      const { pageId: i, fieldId: n, stereotype: a, colspan: s, label: o } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: n, stereotype: a, colspan: s, label: o });
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
          (n) => (n.scheduledTriggers ?? []).map((a) => ({ id: a.id, name: a.name }))
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
        items: e.boundedContexts.flatMap((n) => (n.useCases ?? []).map((a) => ({ id: a.id, name: a.name })))
      },
      {
        label: "Eventos",
        symbol: "event",
        color: "#f59e0b",
        items: e.boundedContexts.flatMap((n) => [
          ...(n.domainEvents ?? []).map((a) => ({ id: a.id, name: a.name })),
          ...(n.applicationEvents ?? []).map((a) => ({ id: a.id, name: a.name }))
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
        items: e.boundedContexts.flatMap((n) => (n.readModels ?? []).map((a) => ({ id: a.id, name: a.name })))
      },
      {
        label: "Operaciones de consulta",
        symbol: "lens",
        color: "#0284c7",
        items: e.boundedContexts.flatMap(
          (n) => (n.queryServices ?? []).flatMap(
            (a) => (a.operations ?? []).map((s) => ({ id: s.id, name: `${s.name} (${a.name})` }))
          )
        )
      },
      {
        label: "Query services",
        symbol: "lens",
        color: "#0284c7",
        items: e.boundedContexts.flatMap((n) => (n.queryServices ?? []).map((a) => ({ id: a.id, name: a.name })))
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
          ...(n.useCases ?? []).map((a) => ({ id: a.id, name: a.name })),
          ...(n.tables ?? []).map((a) => ({ id: a.id, name: a.name })),
          ...(n.mcpServers ?? []).map((a) => ({ id: a.id, name: a.name }))
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
        items: (e.apis ?? []).flatMap((n) => n.operations.map((a) => ({ id: a.id, name: a.name })))
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
      items: i ? n.items.filter((a) => a.name.toLowerCase().includes(i)) : n.items
    })).filter((n) => n.items.length > 0);
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
    const i = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._yugo ? this.renderRoot.querySelector("modux-explorer") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const n = i.sceneFromClient(e.clientX, e.clientY), a = i.nodeIdAtClient(e.clientX, e.clientY), s = this._view === "design" && "dropSlotAtClient" in i ? i.dropSlotAtClient(e.clientX, e.clientY) : null;
    let o;
    try {
      o = JSON.parse(t);
    } catch {
      return;
    }
    o.new ? this.createFromPalette(o.new, n, a, s) : o.existing && this.placeExistingFromPalette(o.existing, n, a, e.clientX, e.clientY, s);
  }
  /**
   * A fresh element: the id is an opaque UUID — the granular store names files
   * after it, so it must never derive from the (renamable, duplicable) name.
   * Only the NAME needs uniquifying, so two drops of «Contexto» read apart.
   */
  uniquePaletteName(e) {
    const t = new Set(this._pendingNames), i = this.model;
    for (const n of [
      i.boundedContexts.map((a) => a.name),
      i.boundedContexts.flatMap((a) => (a.useCases ?? []).map((s) => s.name)),
      i.boundedContexts.flatMap((a) => (a.domainEvents ?? []).map((s) => s.name)),
      i.boundedContexts.flatMap((a) => (a.applicationEvents ?? []).map((s) => s.name)),
      i.boundedContexts.flatMap((a) => (a.readModels ?? []).map((s) => s.name)),
      i.boundedContexts.flatMap((a) => (a.domainServices ?? []).map((s) => s.name)),
      i.boundedContexts.flatMap((a) => (a.queryServices ?? []).map((s) => s.name)),
      i.boundedContexts.flatMap((a) => (a.scheduledTriggers ?? []).map((s) => s.name)),
      (i.aggregates ?? []).map((a) => a.name),
      (i.entities ?? []).map((a) => a.name),
      (i.actors ?? []).map((a) => a.name),
      (i.areas ?? []).map((a) => a.name),
      i.externalSystems.map((a) => a.name),
      i.externalSystems.flatMap((a) => (a.useCases ?? []).map((s) => s.name)),
      i.externalSystems.flatMap((a) => (a.tables ?? []).map((s) => s.name)),
      i.externalSystems.flatMap((a) => (a.mcpServers ?? []).map((s) => s.name)),
      (i.apis ?? []).map((a) => a.name),
      (i.apis ?? []).flatMap((a) => (a.operations ?? []).map((s) => s.name)),
      (i.proxyApis ?? []).map((a) => a.name),
      (i.aiAgents ?? []).map((a) => a.name),
      (i.mcpGateways ?? []).map((a) => a.name),
      (i.rags ?? []).map((a) => a.name),
      (i.workflows ?? []).map((a) => a.name),
      (i.etlFlows ?? []).map((a) => a.name),
      (i.identityProviders ?? []).map((a) => a.name),
      (i.notifications ?? []).map((a) => a.name),
      (i.documents ?? []).map((a) => a.name),
      (i.uiApps ?? []).map((a) => a.name),
      (i.pages ?? []).map((a) => a.name),
      (i.modules ?? []).map((a) => a.name),
      (i.services ?? []).map((a) => a.name),
      (i.customCodes ?? []).map((a) => a.name),
      (i.buttonGroups ?? []).map((a) => a.name),
      (i.workflowGateways ?? []).map((a) => a.name),
      (i.urls ?? []).map((a) => a.name)
    ])
      n.forEach((a) => {
        a && t.add(a);
      });
    for (let n = 1; ; n++) {
      const a = n === 1 ? e : `${e} ${n}`;
      if (!t.has(a))
        return this._pendingNames.add(a), { id: crypto.randomUUID(), name: a };
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
      const a = t.nodes.find((s) => s.id === n);
      n = a ? a.ownerId ?? a.parentId : void 0;
    }
    return i;
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  dropContainerFor(e, t) {
    var a, s;
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
    ].includes(e)) return i.find((o) => this.model.boundedContexts.some((r) => r.id === o)) ?? null;
    if (e === "invariant") {
      const o = i.find((c) => (this.model.aggregates ?? []).some((p) => p.id === c));
      if (o) return o;
      const r = i.find((c) => this.model.boundedContexts.some((p) => p.id === c));
      return ((a = (this.model.aggregates ?? []).find((c) => c.boundedContextId === r)) == null ? void 0 : a.id) ?? null;
    }
    if (e === "read-model") {
      const o = i.find((c) => (this.model.aggregates ?? []).some((p) => p.id === c));
      if (o) return o;
      const r = i.find((c) => this.model.boundedContexts.some((p) => p.id === c));
      return ((s = (this.model.aggregates ?? []).find((c) => c.boundedContextId === r)) == null ? void 0 : s.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return i.find((o) => this.model.externalSystems.some((r) => r.id === o)) ?? null;
    if (e === "model-field")
      return i.find((o) => (this.model.models ?? []).some((r) => r.id === o)) ?? null;
    if (e === "etl-flow" && this._view === "integrations" && this.model.boundedContexts.length === 1)
      return this.model.boundedContexts[0].id;
    if (e === "ui-button")
      return i.find((o) => (this.model.buttonGroups ?? []).some((r) => r.id === o)) ?? null;
    if (e === "use-case-step")
      return i.find(
        (o) => this.model.boundedContexts.some((r) => (r.useCases ?? []).some((c) => c.id === o))
      ) ?? null;
    if (e === "api-operation") {
      for (const o of i) {
        if ((this.model.apis ?? []).some((p) => p.id === o)) return o;
        const r = /^apiimpl:(.+)@(.+)$/.exec(o);
        if (r && (this.model.apis ?? []).some((p) => p.id === r[1])) return r[1];
        const c = (this.model.proxyApis ?? []).find((p) => p.id === o);
        if (c != null && c.targetApiId) return c.targetApiId;
      }
      return null;
    }
    return e === "api" ? i.find((o) => this.model.externalSystems.some((r) => r.id === o)) ?? i.find((o) => this.model.boundedContexts.some((r) => r.id === o)) ?? null : null;
  }
  createFromPalette(e, t, i, n = null) {
    var g, y;
    const a = ma.find((b) => b.type === e);
    if (!a) return;
    if (e === "project-reference") {
      if (!this.repositories.length) {
        this.emit("modux-notice", { message: "No hay repositorios en ~/.modux que referenciar" });
        return;
      }
      this._repoPicker = { pos: t };
      return;
    }
    if (e === "custom-code" && this._view === "design") {
      const b = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, l = b ? b[1] : i && (this.model.pages ?? []).some((_) => _.id === i) ? i : null;
      if (!l) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: d, name: f } = this.uniquePaletteName("Custom code");
      this.command({ kind: "add-custom-code", id: d, name: f }, !1), b ? (this.command({ kind: "set-page-component-custom-code", pageId: l, componentId: b[2], targetId: d }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: l, targetId: d }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const b = e.slice(4), l = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, d = l ? l[1] : i && (this.model.pages ?? []).some((O) => O.id === i) ? i : null;
      if (!d) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let f = l ? l[2] : void 0, _ = null;
      if (b === "tab") {
        let O = null, C = f ? this.componentIn(d, f) : null;
        for (; C; ) {
          if (C.node.kind === "tabLayout") {
            O = C.node.id;
            break;
          }
          C = C.parentId ? this.componentIn(d, C.parentId) : null;
        }
        if (!O) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const N = this.componentIn(d, O).node, G = this.newComponentId("tab"), j = `Pestaña ${(N.children ?? []).filter((de) => de.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: d, componentId: G, componentKind: "tab", parentComponentId: O }, !1), this.command({ kind: "set-page-component", pageId: d, componentId: G, title: j }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: d, componentId: G }]);
        return;
      }
      if (n != null && n.componentId && n.pos !== "into") {
        const O = this.componentIn(d, n.componentId);
        O && O.node.kind === "tab" ? f = O.node.id : O && (f = O.parentId ?? void 0, _ = n.pos === "before" ? n.componentId : O.beforeId);
      } else if (f) {
        const O = ((g = this.componentIn(d, f)) == null ? void 0 : g.node) ?? null;
        (O == null ? void 0 : O.kind) === "tabLayout" && (O.children ?? [])[0] && (f = (O.children ?? [])[0].id);
      }
      const E = this.newComponentId(b), A = {
        kind: "add-page-component",
        pageId: d,
        componentId: E,
        componentKind: b,
        parentComponentId: f
      };
      if (!_) {
        this.command(A);
        return;
      }
      this.command(A, !1), this.command(
        { kind: "move-page-component", pageId: d, componentId: E, parentComponentId: f ?? null, beforeComponentId: _ },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: d, componentId: E }]);
      return;
    }
    const s = this._view, o = this.sceneFor(s), r = (b, l) => {
      this.purgeNodeGeometry(b);
      const d = this.viewLayout(s), f = l ? o.nodes.find((E) => E.id === l) : void 0, _ = f ? { x: Math.round(t.x - f.x), y: Math.round(t.y - f.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(s, { ...d, nodes: { ...d.nodes, [b]: _ } }), { kind: "move-node", view: s, id: b, pos: null };
    }, c = (b, l, d) => {
      const f = this.inverseOf(b) ?? [];
      this.command(b, !1);
      const _ = r(l, d);
      this.pushUndoEntry([...f, _]);
    };
    if (!a.child) {
      const { id: b, name: l } = this.uniquePaletteName(a.label), d = e === "boundedContext" ? { kind: "add-boundedContext", id: b, name: l, subdomainType: "SUPPORTING" } : e === "note" ? { kind: "add-note", id: b, name: l } : e === "area" ? { kind: "add-area", id: b, name: l } : e === "actor" ? { kind: "add-actor", id: b, name: l } : e === "external-system" ? { kind: "add-external-system", id: b, name: l } : e === "ai-agent" ? { kind: "add-ai-agent", id: b, name: l } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: b, name: l, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: b, name: l } : e === "rag" ? { kind: "add-rag", id: b, name: l } : e === "api" ? { kind: "add-api", id: b, name: l } : e === "proxy-api" ? { kind: "add-proxy-api", id: b, name: l } : e === "ui" ? { kind: "add-ui", id: b, name: l } : e === "ui-app" ? { kind: "create-ui-app", id: b, name: l } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: b, name: l, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: b, name: l, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: b, name: l, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: b, name: l } : e === "transformation" ? { kind: "add-transformation", id: b, name: l } : e === "custom-code" ? { kind: "add-custom-code", id: b, name: l } : e === "button-group" ? { kind: "add-button-group", id: b, name: l } : e === "identity-provider" ? { kind: "add-identity-provider", id: b, name: l } : e === "service" ? { kind: "add-service", id: b, name: l } : e === "url" ? { kind: "add-url", id: b, name: l } : {
        kind: "add-workflow",
        id: b,
        name: l,
        completionEventName: `${l.replace(/\s+/g, "")}Completado`
      };
      if (d.kind === "add-ui") {
        const _ = this.dropChain(i).find((E) => this.model.boundedContexts.some((A) => A.id === E));
        if (_) {
          c({ ...d, boundedContextId: _ }, b);
          return;
        }
      }
      if (d.kind === "create-ui-app") {
        const _ = this.dropChain(i).find((E) => this.model.boundedContexts.some((A) => A.id === E));
        if (_) {
          c({ ...d, boundedContextId: _ }, b);
          return;
        }
      }
      if (d.kind === "add-external-system") {
        const _ = this.dropChain(i).find((E) => this.model.externalSystems.some((A) => A.id === E));
        if (_) {
          c({ ...d, parentId: _ }, b), this.emit("modux-notice", { message: "Subsistema creado como parte del sistema" });
          return;
        }
      }
      c(d, b);
      return;
    }
    if (e === "ui-wizard-step") {
      const l = this.dropChain(i).map((E) => {
        var A;
        return ((A = /^wizrow:([^:]+):/.exec(E)) == null ? void 0 : A[1]) ?? E;
      }).find((E) => (this.model.pages ?? []).some((A) => A.id === E && A.type === "WIZARD"));
      if (!l) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const d = ((y = (this.model.pages ?? []).find((E) => E.id === l)) == null ? void 0 : y.wizardSteps) ?? [], f = new Set(d.map((E) => E.id ?? E.pageId));
      let _ = d.length + 1;
      for (; f.has(`wzs-${_}`); ) _++;
      this.command({ kind: "add-page-wizard-step", pageId: l, itemId: `wzs-${_}`, label: `Paso ${_}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const b = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", l = b === "CRUD" ? "CRUD" : b === "WIZARD" ? "Wizard" : "Página", { id: d, name: f } = this.uniquePaletteName(l), _ = this.dropChain(i), E = _.find((O) => (this.model.uiApps ?? []).some((C) => C.id === O)), A = _.map((O) => {
        var C;
        return ((C = /^wizrow:([^:]+):/.exec(O)) == null ? void 0 : C[1]) ?? O;
      }).find((O) => (this.model.pages ?? []).some((C) => C.id === O && C.type === "WIZARD"));
      if (A) {
        const O = o.nodes.find((N) => N.id === A);
        O && (t.x = O.x + O.w / 2 + 160, t.y = O.y - O.h / 2 + 40), this.command({ kind: "create-ui-page", id: d, name: f, pageType: b }, !1), this.command({ kind: "add-page-wizard-step", pageId: A, targetId: d }, !1);
        const C = r(d);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: d }, C]), this.emit("modux-notice", { message: `${f} creada como paso del wizard` });
        return;
      }
      if (E) {
        const O = o.nodes.find((C) => C.id === E);
        O && (t.x = O.x + O.w / 2 + 160, t.y = O.y - O.h / 2 + 40);
      }
      c(
        E ? { kind: "create-ui-page", id: d, name: f, pageType: b, appId: E, menuLabel: f } : { kind: "create-ui-page", id: d, name: f, pageType: b },
        d
      );
      return;
    }
    if (e === "menu-item") {
      const b = this.dropChain(i), l = b.find((A) => (this.model.uiApps ?? []).some((O) => O.id === A));
      if (!l) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const d = /* @__PURE__ */ new Set(), f = (A) => {
        for (const O of A ?? [])
          d.add(O.label), f(O.children);
      };
      (this.model.uiApps ?? []).forEach((A) => f(A.menuItems));
      let _ = "Entrada";
      for (let A = 2; d.has(_); A++) _ = `Entrada ${A}`;
      const E = b.map((A) => Ce(A)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: l,
        label: _,
        itemId: this.newMenuItemId(_),
        parentId: E == null ? void 0 : E.itemId,
        parentLabel: E != null && E.itemId || E == null ? void 0 : E.label
      });
      return;
    }
    if (e === "etl-transform") {
      const l = this.dropChain(i).map((_) => (this.model.etlFlows ?? []).find((E) => E.id === _)).find(Boolean);
      if (!l) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const d = new Set((l.steps ?? []).map((_) => _.id));
      let f = (l.steps ?? []).length + 1;
      for (; d.has(`ets-${f}`); ) f++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: l.id,
        id: `ets-${f}`,
        name: `Transformación ${f}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "etl-flow" && !this.dropContainerFor(e, i)) {
      const b = this.uniquePaletteName(a.label);
      c({ kind: "add-etl-flow", id: b.id, name: b.name }, b.id), this.emit("modux-notice", {
        message: "Integrador creado suelto — su contexto dueño se fija en la ficha; cablea fuentes y escrituras aquí"
      });
      return;
    }
    if (e === "workflow-join" || e === "workflow-split") {
      const { id: b, name: l } = this.uniquePaletteName(e === "workflow-join" ? "Join" : "Split");
      c({
        kind: "add-workflow-gateway",
        id: b,
        name: l,
        stepType: e === "workflow-join" ? "JOIN" : "SPLIT"
      }, b), this.emit("modux-notice", {
        message: "Gateway creado suelto — sus líneas dirán de qué workflow es (join: n entradas → 1 salida; split: 1 → n)"
      });
      return;
    }
    if (e === "workflow-step") {
      const l = this.model.workflows ?? [], d = this.dropChain(i), f = d.map((C) => l.find((N) => N.id === C)).find(Boolean), _ = d.map((C) => {
        const N = l.find((G) => (G.steps ?? []).some((j) => j.id === C));
        return N ? { owner: N, stepId: C } : null;
      }).find(Boolean);
      let E = f ?? (_ == null ? void 0 : _.owner);
      if (!E && l.length === 1 && (E = l[0]), !E) {
        if (!l.length) {
          this.emit("modux-notice", { message: "Crea antes un workflow: los pasos viven en uno" });
          return;
        }
        this._wfStepPicker = { pos: t, stepType: void 0 };
        return;
      }
      const { id: A, name: O } = this.uniquePaletteName(
        "Paso"
      );
      _ && (t = { x: t.x + 190, y: t.y }), c(
        {
          kind: "add-workflow-step",
          workflowId: E.id,
          id: A,
          name: O,
          ..._ ? { dependsOnStepIds: [_.stepId], afterStepId: _.stepId } : {}
        },
        A
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${E.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const b = this.dropContainerFor("api", i);
      if (!b) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: l, name: d } = this.uniquePaletteName("API"), f = { kind: "add-api", id: l, name: d }, _ = this.inverseOf(f) ?? [];
      this.command(f, !1), this.model.externalSystems.some((C) => C.id === b) ? this.command({ kind: "set-api-publisher", id: l, targetId: b }, !1) : this.command({ kind: "add-api-implementation", apiId: l, boundedContextId: b }, !1);
      const E = this.viewLayout(this._view), A = this.sceneFor(this._view).nodes.find((C) => C.id === b), O = A ? { x: Math.round(t.x - A.x), y: Math.round(t.y - A.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...E, nodes: { ...E.nodes, [l]: O } }), this.pushUndoEntry([..._, { kind: "move-node", view: this._view, id: l, pos: null }]);
      return;
    }
    const p = this.dropContainerFor(e, i);
    if (!p) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const { id: h, name: m } = this.uniquePaletteName(a.label);
    if (e === "aggregate")
      c({ kind: "add-aggregate", id: h, name: m, boundedContextId: p }, h, p);
    else if (e === "invariant")
      this.command({ kind: "add-invariant", aggregateId: p, id: h, name: m }), this.emit("modux-notice", {
        message: "Invariante declarado en el agregado — sus condiciones se detallan en la ficha del agregado"
      });
    else if (e === "ui-button") {
      const b = (this.model.buttonGroups ?? []).find((f) => f.id === p), l = new Set(((b == null ? void 0 : b.buttons) ?? []).map((f) => f.id));
      let d = ((b == null ? void 0 : b.buttons) ?? []).length + 1;
      for (; l.has(`btn-${d}`); ) d++;
      this.command({ kind: "add-group-button", id: p, itemId: `btn-${d}`, label: m }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: p, fieldId: h, name: m });
    else if (e === "module")
      c({ kind: "add-module", id: h, name: m, boundedContextId: p }, h, p), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      c(
        { kind: "add-use-case", id: h, name: m, boundedContextId: p, ...e === "policy" ? { policy: !0 } : {} },
        h,
        p
      );
    else if (e === "domain-event")
      c({ kind: "add-domain-event", id: h, name: m, boundedContextId: p }, h, p);
    else if (e === "application-event")
      c({ kind: "add-application-event", id: h, name: m, boundedContextId: p }, h, p);
    else if (e === "domain-service")
      c({ kind: "add-domain-service", id: h, name: m, boundedContextId: p }, h, p);
    else if (e === "query-service")
      c({ kind: "add-query-service", id: h, name: m, boundedContextId: p }, h, p);
    else if (e === "scheduled-trigger")
      c({ kind: "add-scheduled-trigger", id: h, name: m, boundedContextId: p }, h, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      c({ kind: "add-notification", id: h, name: m, boundedContextId: p }, h, p), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      c({ kind: "add-document", id: h, name: m, boundedContextId: p }, h, p), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      c({ kind: "add-etl-flow", id: h, name: m, boundedContextId: p }, h, p), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const b = (this.model.aggregates ?? []).find((l) => l.id === p);
      c({ kind: "add-read-model", id: h, name: m, aggregateId: p }, h, (b == null ? void 0 : b.boundedContextId) ?? p);
    } else if (e === "api-operation") {
      const b = (this.model.apis ?? []).find((E) => E.id === p), l = new Set(((b == null ? void 0 : b.operations) ?? []).map((E) => E.id));
      let d = m, f = `apiop-${p.replace(/^api-/, "")}-${ce(d)}`;
      for (let E = 2; l.has(f); E++)
        d = `${a.label} ${E}`, f = `apiop-${p.replace(/^api-/, "")}-${ce(d)}`;
      c({ kind: "add-api-operation", apiId: p, id: f, name: d }, f, p), o.nodes.some(
        (E) => E.parentId === p && (E.kind === "api-operation" || E.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(b == null ? void 0 : b.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const b = this.model.boundedContexts.flatMap((_) => _.useCases ?? []).find((_) => _.id === p), l = new Set((b == null ? void 0 : b.stepIds) ?? []);
      let d = m, f = `step-${ce(d)}`;
      for (let _ = 2; l.has(f); _++)
        d = `${a.label} ${_}`, f = `step-${ce(d)}`;
      c({ kind: "add-use-case-step", useCaseId: p, id: f, name: d }, f, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(b == null ? void 0 : b.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? c({ kind: "add-external-use-case", id: h, name: m, boundedContextId: p }, h, p) : e === "external-table" ? c({ kind: "add-external-table", id: h, name: m, boundedContextId: p }, h, p) : e === "mcp-server" && c({ kind: "add-mcp-server", id: h, name: m, boundedContextId: p }, h, p);
  }
  /** Dropping an EXISTING element: onto a node = the connect gesture; onto empty = place it. */
  /**
   * A catalog element dropped on the Diseño surface WIRES the declaration: a use case
   * on a button (its action), a model on a form or the frame (the viewmodel), a query
   * operation on a listing or the frame (what it lists). The map's connect gesture,
   * spelled for pages.
   */
  dropCatalogOnDesign(e, t, i) {
    var g;
    const n = t ? /^btn:([^:]+):(.+)$/.exec(t) : null;
    if (n) {
      const y = (this.model.modelMappings ?? []).find((l) => l.id === e);
      if (y) {
        this.command({
          kind: "set-page-button",
          pageId: n[1],
          useCaseId: n[2],
          label: null,
          mappingId: e
        }), this.emit("modux-notice", { message: `El botón mapea con ${y.name}` });
        return;
      }
      const b = this.model.boundedContexts.flatMap((l) => l.useCases ?? []).find((l) => l.id === e);
      if (b) {
        if (e === n[2]) return;
        const l = (this.model.pages ?? []).find((f) => f.id === n[1]), d = ((l == null ? void 0 : l.buttons) ?? []).find((f) => f.useCaseId === n[2]);
        if (!d) return;
        if (((l == null ? void 0 : l.buttons) ?? []).some((f) => f.useCaseId === e)) {
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
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${b.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const a = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (a) {
      const y = this.model.boundedContexts.flatMap((l) => l.useCases ?? []).find((l) => l.id === e);
      if (!y) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const b = (this.model.pages ?? []).find((l) => l.id === a[1]);
      if (((b == null ? void 0 : b.buttons) ?? []).some((l) => l.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: a[1], useCaseId: e, type: a[2] }), this.emit("modux-notice", { message: `Botón de ${y.name} en la barra ${a[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const s = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, o = s ? s[1] : t && (this.model.pages ?? []).some((y) => y.id === t) ? t : null;
    if (!o) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const r = s ? ((g = this.componentIn(o, s[2])) == null ? void 0 : g.node) ?? null : null, c = this.model.boundedContexts.flatMap((y) => y.useCases ?? []).find((y) => y.id === e);
    if (c) {
      (r == null ? void 0 : r.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: o, componentId: r.id, ...this.cmpPatch(r), useCaseId: e, label: r.label ?? c.name }), this.emit("modux-notice", { message: `El botón lanza ${c.name}` })) : (this.command({ kind: "add-page-button", pageId: o, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${c.name} añadido a la página` }));
      return;
    }
    const p = (this.model.models ?? []).find((y) => y.id === e);
    if (p) {
      (r == null ? void 0 : r.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: o, componentId: r.id, ...this.cmpPatch(r), modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${p.name}` })) : (this.command({ kind: "set-page-model", pageId: o, modelId: e }), this.emit("modux-notice", { message: `${p.name} es el viewmodel de la página` }));
      return;
    }
    const h = (this.model.modelMappings ?? []).find((y) => y.id === e);
    if (h && ((r == null ? void 0 : r.kind) === "button" || (r == null ? void 0 : r.kind) === "form")) {
      this.command({ kind: "set-page-component", pageId: o, componentId: r.id, ...this.cmpPatch(r), mappingId: e }), this.emit("modux-notice", {
        message: r.kind === "form" ? `El formulario mapea con ${h.name} al guardar` : `El botón mapea con ${h.name}`
      });
      return;
    }
    const m = this.model.boundedContexts.flatMap((y) => (y.queryServices ?? []).flatMap((b) => (b.operations ?? []).map((l) => ({ op: l, qs: b })))).find(({ op: y }) => y.id === e);
    if (m) {
      (r == null ? void 0 : r.kind) === "listing" || (r == null ? void 0 : r.kind) === "crud" ? this.command({
        kind: "set-page-component",
        pageId: o,
        componentId: r.id,
        ...this.cmpPatch(r),
        queryOperationId: m.op.id,
        queryServiceId: m.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: o, queryServiceId: m.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${m.op.name}` });
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
  placeExistingFromPalette(e, t, i, n, a, s = null) {
    if (this._view === "design") {
      this.dropCatalogOnDesign(e, i, s);
      return;
    }
    if (i && i !== e) {
      this.applyConnection(e, i, n, a);
      return;
    }
    const o = this._view, r = this.sceneFor(o), c = r.nodes.find((g) => g.id === e);
    if (!c) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const g = this.viewLayout(o);
        this.writeViewLayout(o, {
          ...g,
          nodes: { ...g.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const p = this.viewLayout(o), h = c.parentId ? r.nodes.find((g) => g.id === c.parentId) : void 0, m = h ? { x: Math.round(t.x - h.x), y: Math.round(t.y - h.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: o, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(o, { ...p, nodes: { ...p.nodes, [e]: m } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "distribution", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = ma.filter(
      (n) => (this._view === "workflows" ? ["workflow", "workflow-step", "workflow-join", "workflow-split"].includes(n.type) : this._view === "ui" ? ["ui", "ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(n.type) : this._view === "design" ? n.type === "page" || n.type === "custom-code" || n.type.startsWith("cmp:") : this._view === "integrations" ? ["etl-flow", "etl-transform", "external-system", "external-table"].includes(n.type) : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(n.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(n.type) && !n.type.startsWith("cmp:")) && (!e || n.label.toLowerCase().includes(e))
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
                ${op.map((n) => {
      const a = t.filter((s) => s.group === n);
      return a.length ? I`
                        <div class="palette-g">${n}</div>
                        ${a.map(
        (s) => I`
                            <div
                              class="palette-item ${s.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${s.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : s.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(o) => this.onPaletteDragStart(o, { new: s.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                                ${Pt[s.symbol]}
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
        (a) => I`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(s) => this.onPaletteDragStart(s, { existing: a.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${n.color}">
                            ${Pt[n.symbol]}
                          </svg>
                          <span class="pal-label">${a.name}</span>
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
    var t, i, n, a, s, o, r;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const c = this._newBoundedContextId || ((t = this.model.boundedContexts[0]) == null ? void 0 : t.id);
        if (!c) return;
        this.command({ kind: "add-aggregate", id: `agg-${ce(e)}`, name: e, boundedContextId: c });
      } else if (this._view === "flows") {
        const c = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), p = this._newTargetId || ((a = this.model.boundedContexts[0]) == null ? void 0 : a.id), h = this._newTriggerEvent.trim();
        if (!c || !p || !h) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ce(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: c,
          triggerEvent: h,
          targetId: p
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const c = this._newBoundedContextId || ((s = this.model.boundedContexts[0]) == null ? void 0 : s.id);
        if (!c) return;
        this.command({
          kind: "add-process",
          id: `proc-${ce(e)}`,
          name: e,
          boundedContextId: c,
          triggerAggregateId: this._newTriggerAggId || ((r = (o = this.model.aggregates) == null ? void 0 : o[0]) == null ? void 0 : r.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e, t) {
    const i = this.viewLayout(e), n = this.filteredModel(), a = (t == null ? void 0 : t.expandAll) ?? !1, s = e === "aggregates" ? Qo(n, i.nodes) : e === "flows" ? ss(n, i.nodes) : e === "processes" ? wn(n, i.nodes) : e === "workflows" ? bc(n, i.nodes, new Set(i.expanded ?? []), a) : e === "ui" ? $c(n, i.nodes, new Set(i.expanded ?? []), a) : e === "design" || e === "interactions" ? { nodes: [], edges: [] } : e === "integrations" ? Sc(n, i.nodes) : e === "mappings" ? _c(n, i.nodes) : e === "eventstorming" ? cc(n, i.nodes, new Set(i.expanded ?? []), a) : e === "distribution" ? Vo(n, i.nodes, i.sizes ?? {}, new Set(i.expanded ?? []), a) : Wo(n, i.nodes, i.sizes ?? {}, new Set(i.expanded ?? []), a);
    if (e !== "design" && e !== "interactions" && (this.withAreas(s, e), this.withNotes(s, e)), this.diff)
      for (const o of s.nodes) {
        const r = this.diff[o.id] ?? this.diff[o.id.replace(/^(tgt:|flow:)/, "")];
        r && (o.diffKind = r);
      }
    return s;
  }
  /**
   * The area layer, per view: an area shows only in the view where it was dropped (its
   * rectangle is that view's layout). It renders BEHIND everything — a named frame whose
   * membership is geometric — and anchors note threads like any other element.
   */
  withAreas(e, t) {
    var s, o;
    const i = this.model.areas ?? [];
    if (!i.length) return;
    const n = this.viewLayout(t), a = n.sizes ?? {};
    for (const r of i) {
      const c = n.nodes[r.id];
      c && e.nodes.unshift({
        id: r.id,
        label: r.name,
        kind: "area",
        x: c.x,
        y: c.y,
        w: ((s = a[r.id]) == null ? void 0 : s.w) ?? 340,
        h: ((o = a[r.id]) == null ? void 0 : o.h) ?? 220,
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
    var r, c;
    const i = this.model.notes ?? [];
    if (!i.length) return;
    const n = this.viewLayout(t), a = new Set(e.nodes.map((p) => p.id)), s = new Set(e.edges.map((p) => p.id)), o = n.sizes ?? {};
    for (const p of i) {
      const h = n.nodes[p.id], m = (d) => a.has(d) ? d : a.has(`tgt:${d}`) ? `tgt:${d}` : a.has(`flow:${d}`) ? `flow:${d}` : null, g = (p.targetIds ?? []).map((d) => ({ raw: d, nodeId: m(d) })).filter((d) => !!d.nodeId), y = (p.edgeRefs ?? []).filter((d) => s.has(d));
      if (!h && !g.length && !y.length) continue;
      const b = g.length ? e.nodes.find((d) => d.id === g[0].nodeId) : void 0, l = h ?? { x: ((b == null ? void 0 : b.x) ?? 0) + 40, y: ((b == null ? void 0 : b.y) ?? 0) - 110 };
      e.nodes.push({
        id: p.id,
        label: p.text,
        kind: "note",
        x: l.x,
        y: l.y,
        w: ((r = o[p.id]) == null ? void 0 : r.w) ?? 150,
        h: ((c = o[p.id]) == null ? void 0 : c.h) ?? 72,
        fill: "#fef9c3",
        symbol: "note",
        resizable: !0
      });
      for (const d of g)
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
    var c;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((p) => !p.parentId && p.kind !== "area"), n = new Set(i.map((p) => p.id)), a = {
      nodes: i,
      edges: t.edges.filter((p) => n.has(p.sourceId) && n.has(p.targetId))
    }, o = await Ac(a, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), r = this.viewLayout(e);
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
    ]), this.writeViewLayout(e, { ...r, nodes: o, edges: {} }), await this.updateComplete, (c = this.renderRoot.querySelector("modux-canvas")) == null || c.fit();
  }
  /**
   * Toolbar controls keep keyboard focus after use, so the next space bar
   * reopens the select (or re-fires the button) instead of panning the canvas.
   * Once a select changes or a button is clicked, the keyboard belongs to the
   * canvas again; text inputs keep focus (the user is typing).
   */
  refocusCanvasAfterControl(e) {
    var a;
    const t = e.target, i = e.type === "change" && t instanceof HTMLSelectElement, n = e.type === "click" && !!t.closest("button");
    !i && !n || (a = this.renderRoot.querySelector("modux-canvas")) == null || a.focus();
  }
  /** Toolbar of the «Secuencias» view: sequence picker, derive, pin, mermaid, participants. */
  renderInteractionToolbar() {
    const e = this.model.interactions ?? [], t = this._interactionMode === "derived", i = ep(this.model), n = [
      ["Casos de uso", i.filter((r) => r.kind === "USE_CASE")],
      ["Operaciones API", i.filter((r) => r.kind === "API_OPERATION")],
      ["Eventos", i.filter((r) => r.kind === "EVENT")]
    ], a = ua(this.model), s = [...new Set(a.map((r) => r.group))], o = !t && !!this._editingInteraction;
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
      ([r, c]) => I`
              <optgroup label=${r}>
                ${c.map((p) => I`<option value="${p.kind}|${p.ref}">${p.label}</option>`)}
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
        ?disabled=${!o}
        @change=${(r) => this.onParticipantPick(r)}
      >
        <option value="">＋ Participante…</option>
        ${s.map(
      (r) => I`
            <optgroup label=${r}>
              ${a.filter((c) => c.group === r).map((c) => I`<option value=${c.ref}>${c.label}</option>`)}
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
          style="width: 240px; margin: 6px 10px; padding: 5px 8px; border: 1px solid #cbd5e1; border-radius: 6px; font: 12px system-ui;"
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
          ?hidden=${!["context-map", "distribution", "workflows", "ui", "design", "mappings", "integrations"].includes(this._view)}
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
          ?disabled=${this._yugo}
          @click=${() => void this.runAutoLayout()}
        >
          ✨ Auto-layout
        </button>
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
          ?data-active=${this._fullscreen}
          title=${this._fullscreen ? "Salir de pantalla completa (F o Esc)" : "El diagrama a pantalla completa (F)"}
          @click=${() => void this.toggleFullscreen()}
        >
          ⛶
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
      const a = crypto.randomUUID();
      this.command({ kind: "add-view", id: a, name: t.detail.name, memberIds: n }), this.activateVista(a), this.emit("modux-notice", {
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
      ["0", "Ajustar el diagrama a la ventana"],
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
    const t = (this.model.views ?? []).find((o) => o.id === this._activeViewId), i = this.sceneFor(this._view), n = e.items.map(
      (o) => {
        var r;
        return ((r = i.nodes.find((c) => c.id === o.id)) == null ? void 0 : r.label) ?? o.id;
      }
    ), a = n.length === 1 ? `«${n[0]}»` : `${n.length} elementos (${n.join(", ")})`, s = e.memberIds.length > 0 && t;
    return I`
      <div class="picker-backdrop" @pointerdown=${() => this._deletePicker = null}></div>
      <div
        class="relation-picker"
        style="left: 50%; top: 120px"
        @pointerdown=${(o) => o.stopPropagation()}
      >
        <div class="picker-title">
          ${s ? `¿Eliminar ${a}, o solo quitar de la vista?` : `¿Eliminar ${a} del modelo?`}
        </div>
        ${s ? I`
              <button
                class="picker-item"
                @click=${() => {
      const o = this._deletePicker;
      this._deletePicker = null;
      for (const r of new Set(o.memberIds))
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
      const o = this._deletePicker;
      this._deletePicker = null;
      for (const r of o.items)
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
      (a) => a.sourceId === e.sourceId && a.targetId === e.targetId
    )) == null ? void 0 : n.type, i = [
      { type: "DEPENDS", abbr: "DEP", name: "Dependencia simple" },
      { type: "CQRS", abbr: "CQRS", name: "CQRS — consulta sobre sus datos" }
    ];
    return I`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(a) => a.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (a) => I`
            <button
              class="picker-item ${a.type === (t ?? "") ? "current" : ""}"
              title=${a.name}
              @click=${() => this.pickExtDepType(a.type)}
            >
              <span class="abbr">${a.abbr}</span>
              <span class="name">${a.name}</span>
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
        const { id: n, name: a } = this.uniquePaletteName(
          i.stepType === "JOIN" ? "Join" : i.stepType === "SPLIT" ? "Split" : "Paso"
        );
        this.command(
          {
            kind: "add-workflow-step",
            workflowId: t.id,
            id: n,
            name: a,
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
        ${up.map(
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
ie.styles = pt`
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
      color: #94a3b8;
      font-size: 13px;
      background: #ffffff;
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
ne([
  re({ attribute: !1 })
], ie.prototype, "model", 2);
ne([
  re({ attribute: !1 })
], ie.prototype, "layout", 2);
ne([
  re({ attribute: !1 })
], ie.prototype, "diff", 2);
ne([
  z()
], ie.prototype, "_view", 2);
ne([
  z()
], ie.prototype, "_relationType", 2);
ne([
  z()
], ie.prototype, "_relationPicker", 2);
ne([
  z()
], ie.prototype, "_extDepPicker", 2);
ne([
  z()
], ie.prototype, "_selectedId", 2);
ne([
  z()
], ie.prototype, "_paletteOpen", 2);
ne([
  z()
], ie.prototype, "_yugo", 2);
ne([
  re({ attribute: !1 })
], ie.prototype, "repositories", 2);
ne([
  re({ type: Boolean, reflect: !0 })
], ie.prototype, "dark", 2);
ne([
  z()
], ie.prototype, "_repoPicker", 2);
ne([
  z()
], ie.prototype, "_wfStepPicker", 2);
ne([
  z()
], ie.prototype, "_branchCondEditor", 2);
ne([
  z()
], ie.prototype, "_paletteFilter", 2);
ne([
  z()
], ie.prototype, "_paletteTab", 2);
ne([
  z()
], ie.prototype, "_selectedCmp", 2);
ne([
  z()
], ie.prototype, "_fullscreen", 2);
ne([
  z()
], ie.prototype, "_tilt", 2);
ne([
  z()
], ie.prototype, "_helpOpen", 2);
ne([
  z()
], ie.prototype, "_newName", 2);
ne([
  z()
], ie.prototype, "_newBoundedContextId", 2);
ne([
  z()
], ie.prototype, "_newArchetype", 2);
ne([
  z()
], ie.prototype, "_newTriggerAggId", 2);
ne([
  z()
], ie.prototype, "_newTriggerEvent", 2);
ne([
  z()
], ie.prototype, "_newTargetId", 2);
ne([
  z()
], ie.prototype, "_undoStack", 2);
ne([
  z()
], ie.prototype, "_redoStack", 2);
ne([
  z()
], ie.prototype, "_newStepName", 2);
ne([
  z()
], ie.prototype, "_newStepType", 2);
ne([
  z()
], ie.prototype, "_newStepRole", 2);
ne([
  z()
], ie.prototype, "_newStepDeadline", 2);
ne([
  z()
], ie.prototype, "_editStepRole", 2);
ne([
  z()
], ie.prototype, "_editStepDeadline", 2);
ne([
  z()
], ie.prototype, "_editStepComp", 2);
ne([
  z()
], ie.prototype, "_newStepUseCase", 2);
ne([
  z()
], ie.prototype, "_newStepEmits", 2);
ne([
  z()
], ie.prototype, "_editStepUseCase", 2);
ne([
  z()
], ie.prototype, "_editStepEmits", 2);
ne([
  z()
], ie.prototype, "_editStepAwaits", 2);
ne([
  z()
], ie.prototype, "_multi", 2);
ne([
  z()
], ie.prototype, "_newViewName", 2);
ne([
  z()
], ie.prototype, "_interactionId", 2);
ne([
  z()
], ie.prototype, "_editingInteraction", 2);
ne([
  z()
], ie.prototype, "_interactionMode", 2);
ne([
  re({ attribute: !1 })
], ie.prototype, "derivedInteraction", 2);
ne([
  z()
], ie.prototype, "_derivePending", 2);
ne([
  z()
], ie.prototype, "_interactionPrompt", 2);
ne([
  z()
], ie.prototype, "_interactionDelete", 2);
ne([
  z()
], ie.prototype, "_connectPicker", 2);
ne([
  z()
], ie.prototype, "_activeViewId", 2);
ne([
  z()
], ie.prototype, "_newRagSourceType", 2);
ne([
  z()
], ie.prototype, "_newRagSourceUri", 2);
ne([
  z()
], ie.prototype, "_addMemberKey", 2);
ne([
  z()
], ie.prototype, "_treeOpen", 2);
ne([
  z()
], ie.prototype, "_deletePicker", 2);
ie = ne([
  ut("modux-editor")
], ie);
var gp = Object.defineProperty, yp = Object.getOwnPropertyDescriptor, ke = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? yp(t, i) : t, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (a = (n ? o(t, i, a) : o(a)) || a);
  return n && a && gp(t, i, a), a;
};
let ge = class extends Ge {
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
        ${e.map(({ kind: n, title: a, mark: s, cls: o }) => {
      const r = this._diff.changes.filter((c) => c.kind === n);
      return r.length ? I`
            <div class="diff-group">${a} (${r.length})</div>
            ${r.map(
        (c) => I`
                <div class="diff-row">
                  <span class="diff-mark ${o}">${s}</span>
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
    var a, s, o;
    const i = (a = this._workspace) == null ? void 0 : a.current;
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
            const h = await c.json();
            h != null && h.message && (p = h.message);
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
    const n = (s = this._workspace) == null ? void 0 : s.current;
    if (n && n !== i) {
      const r = ((o = this._workspace.solutions.find((c) => c.branch === n)) == null ? void 0 : o.name) ?? n.replace(/^solution\//, "");
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
    const { content: t, fileName: i, apiId: n, homeExternalId: a, homeBoundedContextId: s } = e.detail;
    await this.trackWrite(async () => {
      try {
        const o = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: n })
        });
        if (!o.ok) {
          let h = `El servidor rechazó el contrato (${o.status})`;
          try {
            const m = await o.json();
            m != null && m.message && (h = m.message);
          } catch {
          }
          this.showToast(h);
          return;
        }
        const { apiId: r } = await o.json(), c = a ? { kind: "set-api-publisher", id: r, targetId: a } : s ? { kind: "add-api-implementation", apiId: r, boundedContextId: s } : null;
        c && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(c)
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
          let n = `El servidor rechazó el comando (${t.status})`;
          try {
            const a = await t.json();
            a != null && a.message && (n = a.message);
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
      const i = (n) => this._diff.changes.filter((a) => a.kind === n).length;
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
        (a) => a.branch === this._workspace.current
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
ge.styles = pt`
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
ke([
  re()
], ge.prototype, "base", 2);
ke([
  z()
], ge.prototype, "_model", 2);
ke([
  z()
], ge.prototype, "_layout", 2);
ke([
  z()
], ge.prototype, "_error", 2);
ke([
  z()
], ge.prototype, "_saving", 2);
ke([
  z()
], ge.prototype, "_toast", 2);
ke([
  z()
], ge.prototype, "_workspace", 2);
ke([
  z()
], ge.prototype, "_creatingSolution", 2);
ke([
  z()
], ge.prototype, "_newSolutionName", 2);
ke([
  z()
], ge.prototype, "_taggingVersion", 2);
ke([
  z()
], ge.prototype, "_newTagName", 2);
ke([
  z()
], ge.prototype, "_tagsOpen", 2);
ke([
  z()
], ge.prototype, "_tags", 2);
ke([
  z()
], ge.prototype, "_repositories", 2);
ke([
  z()
], ge.prototype, "_diff", 2);
ke([
  z()
], ge.prototype, "_diffListOpen", 2);
ke([
  z()
], ge.prototype, "_mergeFlow", 2);
ke([
  z()
], ge.prototype, "_dark", 2);
ke([
  z()
], ge.prototype, "_derivedInteraction", 2);
ge = ke([
  ut("modux-editor-connected")
], ge);
export {
  wa as ARCHIMATE_LABEL,
  Fo as ARCHIMATE_NOTATION,
  bp as CONTAINER_HEADER,
  vp as CONTAINER_INSET,
  we as ModuxCanvas,
  ie as ModuxEditor,
  ge as ModuxEditorConnected,
  Ye as ModuxSequence,
  Qo as aggregatesScene,
  yt as apiImplNodeId,
  bt as apiOpOccurrenceId,
  Ip as containerFit,
  Po as containerMinSize,
  Wo as contextMapScene,
  Vo as distributionScene,
  Uo as flowCoherence,
  ss as flowsScene,
  mt as normalizeViewLayout,
  xa as ownershipIndex,
  wn as processesScene,
  Lo as relationEdgeId,
  Mo as resolveOverlaps
};
