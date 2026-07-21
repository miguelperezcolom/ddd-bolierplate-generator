const jp = 34, Gp = 10;
function za(e, t = 24) {
  const i = new Map(e.map((o) => [o.id, { x: o.x, y: o.y }]));
  for (let o = 0; o < 80; o++) {
    let a = !1;
    for (let s = 0; s < e.length; s++)
      for (let d = s + 1; d < e.length; d++) {
        const r = e[s], c = e[d], g = i.get(r.id), m = i.get(c.id), f = m.x - g.x, y = m.y - g.y, v = (r.w + c.w) / 2 + t - Math.abs(f), b = (r.h + c.h) / 2 + t - Math.abs(y);
        if (!(v <= 0 || b <= 0))
          if (a = !0, v < b) {
            const h = (f >= 0 ? 1 : -1) * v / 2;
            g.x -= h, m.x += h;
          } else {
            const h = (y >= 0 ? 1 : -1) * b / 2;
            g.y -= h, m.y += h;
          }
      }
    if (!a) break;
  }
  const n = /* @__PURE__ */ new Map();
  for (const o of e) {
    const a = i.get(o.id);
    (Math.abs(a.x - o.x) > 0.5 || Math.abs(a.y - o.y) > 0.5) && n.set(o.id, a);
  }
  return n;
}
function qa(e, t = { w: 160, h: 90 }) {
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
function Hp(e, t, i) {
  let n = t.w / 2, o = t.w / 2, a = t.h / 2, s = t.h / 2;
  for (const d of i)
    n = Math.max(n, -d.dx + d.w / 2 + 10), o = Math.max(o, d.dx + d.w / 2 + 10), a = Math.max(a, -d.dy + d.h / 2 + 34), s = Math.max(s, d.dy + d.h / 2 + 10);
  return {
    x: e.x + (o - n) / 2,
    y: e.y + (s - a) / 2,
    w: n + o,
    h: a + s
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
const Ba = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, wn = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Fa = {
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
function Eo(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.boundedContextId === t && i.has(n.apiId)).map((n) => ({
    id: bt(n.apiId, n.boundedContextId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
function Va(e, t) {
  const i = t.targetApiId ? (e.apis ?? []).find((n) => n.id === t.targetApiId) : void 0;
  return (i == null ? void 0 : i.operations) ?? [];
}
const Wa = 108, ja = 32, Ga = 240;
function Ha(e) {
  const t = Math.ceil(e.length * 7.6) + 26;
  return Math.min(Ga, Math.max(Wa + 12, t));
}
function Ya(e, t) {
  return `rel:${e}->${t}`;
}
function Ka(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function So(e, t = "unified") {
  const i = /* @__PURE__ */ new Map();
  if (t === "distribution") {
    for (const o of e.boundedContexts) {
      const a = (e.modules ?? []).filter((s) => s.boundedContextId === o.id);
      if (!(a.length <= 1)) {
        for (const s of jt(e, o)) i.set(s.id, o.id);
        for (const s of a) {
          i.set(s.id, o.id);
          for (const d of s.elementIds ?? []) i.set(d, s.id);
        }
      }
    }
    return i;
  }
  const n = (o, a, s) => {
    const d = (e.apis ?? []).find((r) => r.id === o);
    for (const r of (d == null ? void 0 : d.operations) ?? [])
      i.set(a ? vt(r.id, a) : r.id, s);
  };
  for (const o of e.boundedContexts) {
    for (const a of jt(e, o)) i.set(a.id, o.id);
    for (const a of Eo(e, o.id)) {
      i.set(a.id, o.id);
      const s = /^apiimpl:(.+)@(.+)$/.exec(a.id);
      s && n(s[1], s[2], a.id);
    }
  }
  for (const o of e.externalSystems) {
    o.parentExternalSystemId && i.set(o.id, o.parentExternalSystemId);
    for (const a of o.useCases ?? []) i.set(a.id, o.id);
    for (const a of o.tables ?? []) i.set(a.id, o.id);
    for (const a of o.mcpServers ?? []) i.set(a.id, o.id);
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
const Xa = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Qa = {
  aggregate: { symbol: "aggregate", fill: "#f5f3ff", stroke: "#8b5cf6" },
  entity: { symbol: "entity", fill: "#f0fdfa", stroke: "#14b8a6" },
  "value-object": { symbol: "value-object", fill: "#faf5ff", stroke: "#a855f7" },
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
}, Ja = {
  aggregate: "Agregado",
  entity: "Entidad — dentro del agregado",
  "value-object": "Value object — dentro del agregado",
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
      const n = (e.entities ?? []).filter((d) => d.aggregateId === i.id).length, o = (e.valueObjects ?? []).filter((d) => d.aggregateId === i.id).length, a = (i.invariants ?? []).length, s = (n ? ` 🗂${n}` : "") + (o ? ` ◈${o}` : "") + (a ? ` ⚖${a}` : "");
      return { id: i.id, name: `${i.name}${s}`, kind: "aggregate" };
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
const Za = {
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
}, Ao = {
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
function es(e, t, i = {}, n = /* @__PURE__ */ new Set(), o = !1) {
  return Mo(e, t, "unified", i, n, o);
}
function ts(e, t, i = {}, n = /* @__PURE__ */ new Set(), o = !1) {
  return Mo(e, t, "distribution", i, n, o);
}
function Mo(e, t, i, n = {}, o = /* @__PURE__ */ new Set(), a = !1) {
  const s = i === "distribution";
  if (a) {
    const p = new Set(o);
    for (const P of e.boundedContexts) p.add(P.id);
    for (const P of e.aggregates ?? []) p.add(P.id);
    for (const P of e.externalSystems) p.add(P.id);
    for (const P of e.apis ?? []) p.add(P.id);
    for (const P of e.proxyApis ?? []) p.add(P.id);
    for (const P of e.apiImplementations ?? [])
      p.add(bt(P.apiId, P.boundedContextId));
    for (const P of e.modules ?? []) p.add(P.id);
    o = p;
  }
  const d = !s, r = new Set(e.externalSystems.map((p) => p.id)), c = (e.apis ?? []).filter(
    (p) => p.publishedByExternalSystemId && r.has(p.publishedByExternalSystemId)
  ), g = new Set(c.map((p) => p.id)), m = (e.proxyApis ?? []).filter(
    (p) => p.publishedByExternalSystemId && r.has(p.publishedByExternalSystemId)
  ), f = new Set(m.map((p) => p.id)), y = new Map((e.apis ?? []).map((p) => [p.id, p])), v = new Map((e.proxyApis ?? []).map((p) => [p.id, p])), b = (p, P) => {
    var H;
    if (s) {
      if (P === "boundedContext") {
        const L = (e.modules ?? []).filter((he) => he.boundedContextId === p);
        if (L.length <= 1) return [];
        const F = new Set(L.flatMap((he) => he.elementIds ?? [])), Z = e.boundedContexts.find((he) => he.id === p), ue = Z ? jt(e, Z).filter((he) => !F.has(he.id)) : [];
        return [
          ...L.map((he) => ({ id: he.id, name: he.name, kind: "module" })),
          ...ue
        ];
      }
      if (P === "module") {
        const L = (e.modules ?? []).find((ue) => ue.id === p), F = e.boundedContexts.find((ue) => ue.id === (L == null ? void 0 : L.boundedContextId));
        if (!L || !F) return [];
        const Z = new Map(jt(e, F).map((ue) => [ue.id, ue]));
        return (L.elementIds ?? []).map((ue) => Z.get(ue)).filter((ue) => !!ue);
      }
      return [];
    }
    switch (P) {
      case "boundedContext": {
        const L = e.boundedContexts.find((F) => F.id === p);
        return L ? [...Eo(e, p), ...jt(e, L)] : [];
      }
      case "external-system": {
        const L = e.externalSystems.find((F) => F.id === p);
        return [
          ...e.externalSystems.filter((F) => F.parentExternalSystemId === p).map((F) => ({ id: F.id, name: F.name, kind: "external-system" })),
          ...c.filter((F) => F.publishedByExternalSystemId === p).map((F) => ({ id: F.id, name: F.name, kind: "api" })),
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
      case "aggregate":
        return [
          ...(e.entities ?? []).filter((L) => L.aggregateId === p).map((L) => ({ id: L.id, name: L.name, kind: "entity" })),
          ...(e.valueObjects ?? []).filter((L) => L.aggregateId === p).map((L) => ({ id: L.id, name: L.name, kind: "value-object" }))
        ];
      case "api":
        return (((H = y.get(p)) == null ? void 0 : H.operations) ?? []).map(
          (L) => ({ id: L.id, name: L.name, kind: "api-operation" })
        );
      case "api-impl": {
        const L = /^apiimpl:(.+)@(.+)$/.exec(p), F = L ? y.get(L[1]) : void 0;
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
        return L ? Va(e, L).map(
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
  }, h = [], l = [], u = (p, P, H) => {
    const L = -Math.PI / 2 + 2 * Math.PI * P / Math.max(H, 1), F = 160 + 12 * Math.min(H, 14);
    return { x: p.x + F * Math.cos(L), y: p.y + F * Math.sin(L) };
  }, x = (p, P, H, L) => {
    const F = b(p, P);
    F.forEach((Z, ue) => {
      const he = t[Z.id] ?? u(L, ue, F.length), oe = b(Z.id, Z.kind), we = o.has(Z.id) && oe.length > 0, Te = Z.policy ? Xa : Qa[Z.kind], Be = Z.kind === "external-system";
      h.push({
        id: Z.id,
        label: Z.name,
        kind: Z.kind,
        x: he.x,
        y: he.y,
        w: Be ? 150 : Ha(Z.name),
        h: Be ? 44 : ja + 4,
        symbol: Te.symbol,
        fill: Te.fill,
        stroke: Te.stroke,
        dashed: Be || void 0,
        ownerId: p,
        collapsible: oe.length > 0,
        collapsed: oe.length > 0 && !we,
        tooltip: `${Z.policy ? "Policy" : Ja[Z.kind]} ${Z.name} — parte de ${H}`
      }), l.push({
        id: `contains:${p}->${Z.id}`,
        sourceId: p,
        targetId: Z.id,
        kind: "contains",
        color: "#94a3b8",
        tooltip: `${H} contiene ${Z.name}`
      }), we && x(Z.id, Z.kind, Z.name, he);
    });
  }, S = [
    ...e.boundedContexts.map((p) => ({ ref: p, external: !1, api: !1, proxy: !1 })),
    ...(s ? [] : e.externalSystems).filter((p) => !p.parentExternalSystemId || !r.has(p.parentExternalSystemId)).map((p) => ({ ref: p, external: !0, api: !1, proxy: !1 })),
    ...s ? [] : (e.apis ?? []).filter((p) => !g.has(p.id)).map((p) => ({ ref: p, external: !1, api: !0, proxy: !1 })),
    ...s ? [] : (e.proxyApis ?? []).filter((p) => !f.has(p.id)).map((p) => ({ ref: p, external: !1, api: !1, proxy: !0 })),
    ...s ? [] : (e.workflows ?? []).map((p) => ({
      ref: p,
      external: !1,
      api: !1,
      proxy: !1,
      workflow: !0
    })),
    // ETL flows without owner (legacy) still float; owned ones enter through their context.
    ...s ? [] : (e.etlFlows ?? []).filter((p) => !p.ownerBoundedContextId).map((p) => ({
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
    const H = t[p.ref.id] ?? st(P, S.length);
    if ("idp" in p && p.idp) {
      const oe = p.ref, we = !!oe.publishedByExternalSystemId;
      h.push({
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
      h.push({
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
      h.push({
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
      h.push({
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
      }), Te && x(oe.id, "proxy-api", oe.name, H);
      return;
    }
    if (p.api) {
      const oe = p.ref, we = b(oe.id, "api"), Te = o.has(oe.id) && we.length > 0;
      h.push({
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
      }), Te && x(oe.id, "api", oe.name, H);
      return;
    }
    if (p.external) {
      const oe = p.ref, we = b(oe.id, "external-system"), Te = o.has(oe.id) && we.length > 0, Be = n[oe.id];
      h.push({
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
      }), Te && x(oe.id, "external-system", oe.name, H);
      return;
    }
    const L = p.ref, F = L.subdomainType ?? "GENERIC", Z = b(L.id, "boundedContext"), ue = o.has(L.id) && Z.length > 0, he = n[L.id];
    h.push({
      id: L.id,
      label: L.name,
      kind: "boundedContext",
      symbol: "component",
      fill: Ba[F],
      stroke: "#94a3b8",
      badge: F,
      tooltip: s && Z.length === 0 ? `${L.name} — un solo módulo (el principal): el servicio lo despliega entero. Añade un módulo desde la paleta para repartir sus elementos` : `${L.name} — subdominio ${F}`,
      collapsible: Z.length > 0,
      collapsed: Z.length > 0 && !ue,
      resizable: !0,
      x: H.x,
      y: H.y,
      w: (he == null ? void 0 : he.w) ?? Xe,
      h: (he == null ? void 0 : he.h) ?? Qe
    }), ue && x(L.id, "boundedContext", L.name, H);
  });
  const T = s ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, E = S.length + T.actors.length + T.aiAgents.length + T.rags.length + T.mcpGateways.length;
  T.actors.forEach((p, P) => {
    const H = t[p.id] ?? st(S.length + P, E);
    h.push({
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
  }), T.aiAgents.forEach((p, P) => {
    const H = t[p.id] ?? st(S.length + (e.actors ?? []).length + P, E);
    h.push({
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
  }), T.mcpGateways.forEach((p, P) => {
    const H = t[p.id] ?? st(
      S.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + P,
      E
    );
    h.push({
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
  const R = [];
  if (T.rags.forEach((p, P) => {
    const H = t[p.id] ?? st(
      S.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + P,
      E
    );
    h.push({
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
      h.push({
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
      }), R.push({
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
  }), s) {
    const p = e.services ?? [];
    p.forEach((L, F) => {
      const Z = t[L.id] ?? st(S.length + F, S.length + p.length);
      h.push({
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
    const P = e.urls ?? [];
    P.forEach((L, F) => {
      const Z = t[L.id] ?? st(
        S.length + p.length + F,
        S.length + p.length + P.length
      );
      h.push({
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
        S.length + p.length + P.length + F,
        S.length + p.length + P.length + H.length
      );
      h.push({
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
  h.sort((p, P) => (p.parentId ? 1 : 0) - (P.parentId ? 1 : 0));
  const j = e.relations.map((p) => ({
    id: Ya(p.sourceId, p.targetId),
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "relation",
    label: p.type ? wn[p.type] : p.inferredType ? `≈${wn[p.inferredType]}` : "?",
    color: p.declared ? "#475569" : "#94a3b8",
    dashed: !p.declared,
    arrow: !0,
    tooltip: p.type ? `${p.type} (${p.sourceId} upstream → ${p.targetId} downstream)${p.reasons ? ` — ${p.reasons}` : ""}` : p.inferredType ? `≈ ${p.inferredType} INFERIDO de las dependencias — doble click para declararlo (o corregirlo)${p.reasons ? ` — ${p.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${p.reasons ? ` — ${p.reasons}` : ""}`
  })), V = e.flows.map((p) => {
    var ue, he, oe, we, Te, Be;
    const P = Ka(e, p), H = d ? e.boundedContexts.find((Fe) => Fe.id === p.sourceId) : void 0, L = ((ue = H == null ? void 0 : H.domainEvents) == null ? void 0 : ue.find((Fe) => Fe.name === p.triggerEvent)) ?? ((he = H == null ? void 0 : H.applicationEvents) == null ? void 0 : he.find((Fe) => Fe.name === p.triggerEvent)), F = d && p.readModelName ? (we = (oe = e.boundedContexts.find((Fe) => Fe.id === p.targetId)) == null ? void 0 : oe.readModels) == null ? void 0 : we.find((Fe) => Fe.name === p.readModelName) : void 0, Z = d && p.targetUseCaseId ? (Be = (Te = e.boundedContexts.find((Fe) => Fe.id === p.targetId)) == null ? void 0 : Te.useCases) == null ? void 0 : Be.find((Fe) => Fe.id === p.targetUseCaseId) : void 0;
    return {
      id: `flow:${p.id}`,
      sourceId: (L == null ? void 0 : L.id) ?? p.sourceId,
      targetId: (Z == null ? void 0 : Z.id) ?? (F == null ? void 0 : F.id) ?? p.targetId,
      kind: "flow",
      label: p.name,
      color: Fa[P],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${p.name} [${p.archetype}] — ${P}`
    };
  }), se = new Map((e.apis ?? []).map((p) => [p.id, p])), C = new Set(e.boundedContexts.map((p) => p.id)), Y = (e.apiImplementations ?? []).filter(
    (p) => se.has(p.apiId) && C.has(p.boundedContextId)
  );
  (e.uis ?? []).filter((p) => !p.boundedContextId).forEach((p, P) => {
    const H = t[p.id] ?? { x: 180 + P * 200, y: 40 };
    h.push({
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
  const B = new Set(h.map((p) => p.id)), O = So(e, i), W = /* @__PURE__ */ new Map(), I = (p) => {
    const P = W.get(p);
    if (P !== void 0) return P;
    let H = p;
    for (let L = 0; H && L < 16; L++) {
      if (B.has(H))
        return W.set(p, H), H;
      H = O.get(H);
    }
    return W.set(p, null), null;
  }, k = { has: (p) => I(p) !== null }, N = (p) => {
    const P = /* @__PURE__ */ new Set(), H = [];
    for (const L of p) {
      if (L.kind === "contains" || L.targetId.startsWith("edgeanchor:")) {
        H.push(L);
        continue;
      }
      const F = I(L.sourceId), Z = I(L.targetId);
      if (!F || !Z || F === Z) continue;
      if (F === L.sourceId && Z === L.targetId) {
        H.push(L);
        continue;
      }
      const ue = `${L.kind}|${F}|${Z}`;
      P.has(ue) || (P.add(ue), H.push({
        ...L,
        sourceId: F,
        targetId: Z,
        tooltip: `${L.tooltip ?? L.kind} — de un elemento plegado dentro`
      }));
    }
    return H;
  }, _ = s ? [
    ...(e.services ?? []).flatMap(
      (p) => (p.moduleIds ?? []).map((P) => {
        var L;
        if (!k.has(p.id)) return null;
        const H = k.has(P) ? P : (L = (e.modules ?? []).find((F) => F.id === P)) == null ? void 0 : L.boundedContextId;
        return !H || !k.has(H) ? null : {
          id: `deploy:${p.id}->${P}`,
          sourceId: p.id,
          targetId: H,
          kind: "deploys",
          color: "#334155",
          dashed: !0,
          arrow: !0,
          tooltip: `desplegado en ${p.name} — Supr lo desconecta`
        };
      }).filter((P) => P !== null)
    ),
    ...(e.services ?? []).flatMap(
      (p) => (p.urlIds ?? []).filter((P) => k.has(p.id) && k.has(P)).map((P) => ({
        id: `svcurl:${p.id}->${P}`,
        sourceId: p.id,
        targetId: P,
        kind: "service-url",
        color: "#0e7490",
        arrow: !0,
        tooltip: `${p.name} responde en esta URL — Supr lo desconecta`
      }))
    ),
    ...(e.services ?? []).flatMap((p) => {
      const P = [];
      return p.database && k.has(`infra-db:${p.database}`) && k.has(p.id) && P.push({
        id: `infradb:${p.id}`,
        sourceId: p.id,
        targetId: `infra-db:${p.database}`,
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} persiste en ${p.database}`
      }), p.outboxEnabled && k.has("infra-broker") && k.has(p.id) && P.push({
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
  ] : [], $ = d ? (e.emissions ?? []).filter((p) => k.has(p.sourceId) && k.has(p.domainEventId)).map((p) => ({
    id: `emit:${p.sourceId}->${p.domainEventId}`,
    sourceId: p.sourceId,
    targetId: p.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], M = d ? (e.projections ?? []).map((p) => ({
    p,
    source: p.sourceAggregateId ?? p.sourceExternalUseCaseId ?? p.sourceExternalTableId
  })).filter(({ p, source: P }) => P && p.readModelId).filter(({ p, source: P }) => k.has(P) && k.has(p.readModelId)).map(({ p, source: P }) => ({
    id: `proj:${p.id}`,
    sourceId: P,
    targetId: p.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: p.sourceAggregateId ? `Proyección ${p.name}: el estado del agregado se materializa en ${p.readModelName ?? p.readModelId}` : `Proyección ${p.name}: polling hacia ${p.readModelName ?? p.readModelId}`
  })) : [], A = (e.apis ?? []).flatMap(
    (p) => p.operations.flatMap((P) => {
      const H = d && P.targetUseCaseId && k.has(P.targetUseCaseId) ? P.targetUseCaseId : P.targetBoundedContextId && k.has(P.targetBoundedContextId) ? P.targetBoundedContextId : (P.targetUseCaseId && !d, null);
      if (!H) return [];
      const L = d && k.has(P.id) ? P.id : p.id;
      return k.has(L) ? [
        {
          id: `apiwire:${P.id}`,
          sourceId: L,
          targetId: H,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${P.name} la implementa ${H}`
        }
      ] : [];
    })
  ), q = d ? (e.useCaseCalls ?? []).filter((p) => k.has(p.sourceId) && k.has(p.targetId)).map((p) => ({
    id: `uccall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], D = [
    ...e.boundedContexts.filter((p) => p.identityProviderId && k.has(p.id) && k.has(p.identityProviderId)).map((p) => ({
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
    ...(e.etlFlows ?? []).filter((p) => p.identityProviderId && k.has(p.identityProviderId)).flatMap((p) => {
      const P = k.has(p.id) ? p.id : p.ownerBoundedContextId && k.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
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
    ...(e.identityProviders ?? []).filter((p) => p.publishedByExternalSystemId && k.has(p.id) && k.has(p.publishedByExternalSystemId)).map((p) => ({
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
  ], z = d ? e.boundedContexts.flatMap((p) => p.scheduledTriggers ?? []).filter((p) => p.useCaseId && k.has(p.id) && k.has(p.useCaseId)).map((p) => ({
    id: `stfire:${p.id}->${p.useCaseId}`,
    sourceId: p.id,
    targetId: p.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: p.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${p.cronExpression ?? "cron"}`
  })) : [], G = d ? (e.aggregateCalls ?? []).filter((p) => k.has(p.sourceId) && k.has(p.targetId)).map((p) => ({
    id: `aggcall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], X = d ? (e.queryCalls ?? []).filter((p) => k.has(p.sourceId) && k.has(p.targetId)).map((p) => ({
    id: `qscall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], le = d ? (e.actorUses ?? []).filter((p) => k.has(p.actorId) && k.has(p.targetId)).map((p) => ({
    id: `use:${p.actorId}->${p.targetId}`,
    sourceId: p.actorId,
    targetId: p.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], Ee = (e.actorExternalDependencies ?? []).filter((p) => k.has(p.actorId) && k.has(p.externalSystemId)).map((p) => ({
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
  ]), ee = (p) => k.has(p) ? p : K.get(p) ?? p, fe = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((p) => ({
        sourceId: p.sourceId,
        targetId: ee(p.targetId),
        cqrs: p.type === "CQRS"
      })).filter(
        (p) => k.has(p.sourceId) && k.has(p.targetId) && p.sourceId !== p.targetId
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
    for (const P of p.useCases ?? []) Ae.set(P.id, p.id);
    for (const P of p.domainEvents ?? []) Ae.set(P.id, p.id);
    for (const P of p.applicationEvents ?? []) Ae.set(P.id, p.id);
    for (const P of p.queryServices ?? []) Ae.set(P.id, p.id);
  }
  const Ie = (p) => k.has(p) ? p : Ae.get(p) ?? p, Se = /* @__PURE__ */ new Map();
  for (const p of e.boundedContexts) {
    for (const P of p.domainEvents ?? []) Se.set(P.name, P.id);
    for (const P of p.applicationEvents ?? []) Se.set(P.name, P.id);
  }
  const be = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (p) => (p.steps ?? []).filter((P) => P.targetUseCaseId).map((P) => ({ sourceId: p.id, targetId: Ie(P.targetUseCaseId) }))
      ).filter((p) => k.has(p.sourceId) && k.has(p.targetId)).map((p) => [
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
      })).filter((p) => k.has(p.sourceId) && k.has(p.targetId)).map((p) => [
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
    for (const P of p.tables ?? []) te.set(P.id, p.id);
  const _e = (e.notifications ?? []).flatMap((p) => {
    var L;
    const P = k.has(p.id) ? p.id : p.ownerBoundedContextId && k.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
    if (!P) return [];
    const H = [];
    if (p.eventId) {
      const F = k.has(p.eventId) ? p.eventId : Ae.get(p.eventId);
      F && k.has(F) && F !== P && H.push({
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
      k.has(F) && H.push({
        id: `notifto:${p.id}:${F}`,
        sourceId: P,
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
    const P = k.has(p.id) ? p.id : p.ownerBoundedContextId && k.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
    if (!P || !p.queryServiceId) return [];
    const H = k.has(p.queryServiceId) ? p.queryServiceId : Ae.get(p.queryServiceId);
    return !H || !k.has(H) || H === P ? [] : [{
      id: `docq:${p.id}`,
      sourceId: H,
      targetId: P,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), We = (e.etlFlows ?? []).flatMap(
    (p) => (p.steps ?? []).flatMap((P) => {
      const H = k.has(p.id) ? p.id : p.ownerBoundedContextId && k.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
      if (!H) return [];
      const L = P.externalTableId ?? P.operationId ?? P.apiId ?? P.eventId;
      if (!L) return [];
      let F = L;
      if (!k.has(F) && P.operationId && P.apiId && (F = P.apiId), !k.has(F) && P.externalTableId && (F = te.get(P.externalTableId) ?? F), k.has(F) || (F = ee(F)), k.has(F) || (F = Ae.get(L) ?? F), !k.has(F) || F === H) return [];
      const Z = P.type.startsWith("SOURCE");
      return [{
        id: `etl:${p.id}:${P.id}`,
        sourceId: Z ? F : H,
        targetId: Z ? H : F,
        kind: Z ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: P.type === "SOURCE_PULL" ? "pull" : P.type === "SOURCE_CONSUMER" ? "consume" : P.type === "WRITE_API" ? "api" : P.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: Z ? `${p.name} lee de aquí (${P.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${p.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), De = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (p) => (p.sourceExternalTableIds ?? []).map((P) => ({
          sourceId: k.has(P) ? P : te.get(P) ?? P,
          targetId: p.id,
          name: p.name
        }))
      ).filter((p) => k.has(p.sourceId) && k.has(p.targetId)).map((p) => [
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
        (p) => (p.sourceApiIds ?? []).map((P) => ({
          sourceId: ee(P),
          targetId: p.id,
          name: p.name
        }))
      ).filter((p) => k.has(p.sourceId) && k.has(p.targetId)).map((p) => [
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
        ...(p.sourceExternalSystemIds ?? []).map((P) => ({ sourceId: P, targetId: p.id, name: p.name })),
        ...(p.sourceBoundedContextIds ?? []).map((P) => ({ sourceId: P, targetId: p.id, name: p.name }))
      ]).filter((p) => k.has(p.sourceId) && k.has(p.targetId)).map((p) => [
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
      (e.agentApiUses ?? []).map((p) => ({ sourceId: p.agentId, targetId: ee(p.apiId) })).filter((p) => k.has(p.sourceId) && k.has(p.targetId)).map((p) => [
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
  ], ga = (p) => p.onCompletionEventName || `${p.name.replace(/\s+/g, "")}Completado`, ya = (e.workflows ?? []).flatMap(
    (p) => p.triggerEvent ? (e.workflows ?? []).filter((P) => P.id !== p.id && ga(P) === p.triggerEvent).filter((P) => k.has(P.id) && k.has(p.id)).map((P) => ({
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
  ), ba = [
    ...new Map(
      (e.proxyApis ?? []).filter((p) => p.targetApiId).map((p) => ({ sourceId: ee(p.id), targetId: ee(p.targetApiId) })).filter(
        (p) => k.has(p.sourceId) && k.has(p.targetId) && p.sourceId !== p.targetId
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
  ], va = Y.flatMap((p) => {
    const P = bt(p.apiId, p.boundedContextId);
    if (!k.has(P)) return [];
    const H = [];
    for (const L of (e.proxyApis ?? []).filter((F) => F.targetApiId === p.apiId)) {
      const F = ee(L.id);
      k.has(F) && F !== P && H.push({
        id: `pxr:${F}->${P}`,
        sourceId: F,
        targetId: P,
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
  }), xa = (e.proxyOperationRoutes ?? []).flatMap((p) => {
    const P = (e.proxyApis ?? []).find((F) => F.id === p.proxyId);
    if (!(P != null && P.targetApiId)) return [];
    const H = vt(p.operationId, p.proxyId), L = p.targetSiteId === P.targetApiId ? P.targetApiId : bt(P.targetApiId, p.targetSiteId);
    return !k.has(H) || !k.has(L) ? [] : [{
      id: `oproute:${H}->${L}`,
      sourceId: H,
      targetId: L,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), Ia = [
    ...new Map(
      (e.externalOperationUses ?? []).map((p) => {
        if (!k.has(p.externalSystemId)) return null;
        const P = (e.apis ?? []).find(
          (Z) => Z.operations.some((ue) => ue.id === p.operationId)
        );
        if (!P) return null;
        const H = p.siteId === P.id, L = H ? p.operationId : vt(p.operationId, p.siteId);
        let F = k.has(L) ? L : null;
        if (!F)
          if (H || (e.proxyApis ?? []).some((Z) => Z.id === p.siteId))
            F = ee(p.siteId);
          else {
            const Z = bt(P.id, p.siteId);
            F = k.has(Z) ? Z : p.siteId;
          }
        return !F || !k.has(F) || F === p.externalSystemId ? null : { u: p, target: F };
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
  ], wa = d ? (e.apiOperationImplementations ?? []).flatMap((p) => {
    if (!k.has(p.useCaseId)) return [];
    const P = k.has(vt(p.operationId, p.boundedContextId)) ? vt(p.operationId, p.boundedContextId) : k.has(bt(p.apiId, p.boundedContextId)) ? bt(p.apiId, p.boundedContextId) : k.has(ee(p.boundedContextId)) ? ee(p.boundedContextId) : null;
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
  }) : [], ka = d ? (e.agentUses ?? []).filter((p) => k.has(p.agentId) && k.has(p.useCaseId)).map((p) => ({
    id: `mcp:${p.agentId}->${p.useCaseId}`,
    sourceId: p.agentId,
    targetId: p.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], $a = (e.agentRags ?? []).filter((p) => k.has(p.agentId) && k.has(p.ragId)).map((p) => ({
    id: `agrag:${p.agentId}->${p.ragId}`,
    sourceId: p.agentId,
    targetId: p.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), _a = d ? (e.rags ?? []).filter((p) => k.has(p.id)).flatMap(
    (p) => (p.sourceReadModelIds ?? []).filter((P) => k.has(P)).map((P) => ({
      id: `ragsrc:${p.id}->${P}`,
      sourceId: p.id,
      targetId: P,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name} indexa este read model`
    }))
  ) : [], Ca = d ? (e.agentExternalUses ?? []).filter((p) => k.has(p.agentId) && k.has(p.externalUseCaseId)).map((p) => ({
    id: `mcpx:${p.agentId}->${p.externalUseCaseId}`,
    sourceId: p.agentId,
    targetId: p.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Ea = d ? (e.agentMcpUses ?? []).filter((p) => k.has(p.agentId) && k.has(p.mcpServerId)).map((p) => ({
    id: `mcpsv:${p.agentId}->${p.mcpServerId}`,
    sourceId: p.agentId,
    targetId: p.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], Sa = (e.mcpGateways ?? []).flatMap(
    (p) => [
      ...p.mcpServerIds ?? [],
      ...p.apiIds ?? [],
      ...p.apiOperationIds ?? [],
      ...p.useCaseIds ?? [],
      ...p.ragIds ?? []
    ].filter((P) => k.has(p.id) && k.has(P)).map((P) => ({
      id: `gwx:${p.id}->${P}`,
      sourceId: p.id,
      targetId: P,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Aa = (e.agentGatewayUses ?? []).filter((p) => k.has(p.agentId) && k.has(p.gatewayId)).map((p) => ({
    id: `aggw:${p.agentId}->${p.gatewayId}`,
    sourceId: p.agentId,
    targetId: p.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Ma = d ? (e.agentApiOpUses ?? []).filter((p) => k.has(p.agentId) && k.has(p.apiOperationId)).map((p) => ({
    id: `agapi:${p.agentId}->${p.apiOperationId}`,
    sourceId: p.agentId,
    targetId: p.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Pa = d ? (e.agentQueryUses ?? []).filter((p) => k.has(p.agentId) && k.has(p.queryServiceId)).map((p) => ({
    id: `agqs:${p.agentId}->${p.queryServiceId}`,
    sourceId: p.agentId,
    targetId: p.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Ta = (e.agentDelegations ?? []).filter((p) => k.has(p.agentId) && k.has(p.delegateAgentId)).map((p) => ({
    id: `agag:${p.agentId}->${p.delegateAgentId}`,
    sourceId: p.agentId,
    targetId: p.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Oa = (e.actorAgentUses ?? []).filter((p) => k.has(p.actorId) && k.has(p.agentId)).map((p) => ({
    id: `useag:${p.actorId}->${p.agentId}`,
    sourceId: p.actorId,
    targetId: p.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Ra = d ? (e.agentTriggers ?? []).filter((p) => k.has(p.eventId) && k.has(p.agentId)).map((p) => ({
    id: `evag:${p.eventId}->${p.agentId}`,
    sourceId: p.eventId,
    targetId: p.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Na = d ? (e.externalCalls ?? []).filter((p) => k.has(p.externalSystemId) && k.has(p.useCaseId)).map((p) => ({
    id: `extcall:${p.externalSystemId}->${p.useCaseId}`,
    sourceId: p.externalSystemId,
    targetId: p.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Da = d ? (e.externalUseCaseCalls ?? []).filter((p) => k.has(p.sourceId) && k.has(p.targetId)).map((p) => ({
    id: `extuccall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "ext-uc-call",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "llama (derivará gateway/API)"
  })) : [], La = (e.uis ?? []).flatMap((p) => [
    ...[...p.appIds ?? [], ...p.pageIds ?? []].map((P) => ({
      id: `uiasg:${p.id}->${P}`,
      sourceId: P,
      targetId: p.id,
      kind: "ui-assignment",
      color: "#0ea5e9",
      markerStart: "ball",
      markerEnd: "arrow",
      tooltip: "asignada a la UI (assignment) — Supr la desconecta"
    })),
    // serving: la interfaz SIRVE al actor (flecha abierta hacia la persona)
    ...(p.actorIds ?? []).map((P) => ({
      id: `uisrv:${p.id}->${P}`,
      sourceId: p.id,
      targetId: P,
      kind: "ui-serving",
      color: "#0ea5e9",
      markerEnd: "open-arrow",
      tooltip: "la UI sirve a este actor (serving) — Supr la desconecta"
    }))
  ]), Ua = (e.archimateRelations ?? []).map((p) => ({
    id: `archi:${p.id}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "archimate-relation",
    color: "#475569",
    label: p.label || void 0,
    ...Za[p.type] ?? {},
    tooltip: `${Ao[p.type] ?? p.type} (ArchiMate)${p.label ? ` · ${p.label}` : ""} — doble click retipa o invierte el sentido · Supr la borra`
  }));
  return {
    nodes: h,
    edges: N([
      // Composition first: the ownership diamonds paint under the semantic edges.
      ...l,
      ...Ua,
      ...La,
      ..._,
      ...j,
      ...V,
      ...$,
      ...M,
      ...A,
      ...q,
      ...z,
      ...D,
      ..._e,
      ...Ne,
      ...We,
      ...G,
      ...X,
      ...le,
      ...Ee,
      ...fe,
      ...ba,
      ...va,
      ...xa,
      ...Ia,
      ...wa,
      ...be,
      ...Q,
      ...ya,
      ...si,
      ...De,
      ...at,
      ...St,
      ...ka,
      ...Ca,
      ...Ea,
      ...Sa,
      ...Aa,
      ...Ma,
      ...Pa,
      ...Ta,
      ...Oa,
      ...Ra,
      ...$a,
      ..._a,
      ...R,
      ...Na,
      ...Da
    ])
  };
}
const is = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, ns = 176, os = 60, as = 140, ss = 40, rs = 140, ds = 40;
function ls(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [], o = e.valueObjects ?? [];
  return e.boundedContexts.forEach((a, s) => {
    const d = 220 + s * 340;
    i.filter((c) => c.boundedContextId === a.id).forEach((c, g) => {
      const m = n.filter((v) => v.aggregateId === c.id), f = o.filter((v) => v.aggregateId === c.id), y = 140 + g * (170 + (m.length + f.length) * 60);
      t[c.id] = { x: d, y }, m.forEach((v, b) => {
        t[v.id] = { x: d + 60, y: y + 100 + b * 60 };
      }), f.forEach((v, b) => {
        t[v.id] = { x: d + 60, y: y + 100 + (m.length + b) * 60 };
      });
    });
  }), i.filter((a) => !e.boundedContexts.some((s) => s.id === a.boundedContextId)).forEach((a, s) => {
    t[a.id] = { x: 220 + s * 340, y: 640 };
  }), t;
}
function cs(e, t) {
  const i = ls(e), n = (b) => t[b] ?? i[b] ?? { x: 200, y: 200 }, o = new Map(e.boundedContexts.map((b) => [b.id, b])), a = (e.aggregates ?? []).map((b) => {
    const h = o.get(b.boundedContextId), l = (h == null ? void 0 : h.subdomainType) ?? "GENERIC", u = n(b.id), x = (e.entities ?? []).filter((R) => R.aggregateId === b.id).length, S = (e.valueObjects ?? []).filter((R) => R.aggregateId === b.id).length, T = (b.invariants ?? []).length, E = (x ? ` · 🗂${x}` : "") + (S ? ` · ◈${S}` : "") + (T ? ` · ⚖${T}` : "");
    return {
      id: b.id,
      label: b.name,
      x: u.x,
      y: u.y,
      w: ns,
      h: os,
      kind: "aggregate",
      symbol: "aggregate",
      fill: is[l],
      stroke: "#64748b",
      badge: `${h ? `${h.name.toUpperCase()} · ` : ""}AGGREGATE${E}`,
      tooltip: `Agregado ${b.name}${h ? ` — contexto ${h.name} (${l})` : ""}${S || x ? ` · ${x} entidad(es), ${S} value object(s)` : ""}`
    };
  }), s = (e.entities ?? []).map((b) => {
    const h = n(b.id);
    return {
      id: b.id,
      label: b.name,
      x: h.x,
      y: h.y,
      w: as,
      h: ss,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${b.name} (dentro del agregado)`
    };
  }), d = (e.valueObjects ?? []).map((b) => {
    const h = n(b.id), l = b.type === "Enum" ? (b.enumValues ?? []).join(" · ") : b.type === "Wrapper" ? b.dataType ?? "" : (b.fields ?? []).map((u) => u.name).join(", ");
    return {
      id: b.id,
      label: b.name,
      x: h.x,
      y: h.y,
      w: rs,
      h: ds,
      kind: "value-object",
      symbol: "value-object",
      fill: "#faf5ff",
      stroke: "#a855f7",
      badge: `VALUE OBJECT${b.type ? ` · ${b.type.toUpperCase()}` : ""}`,
      tooltip: `Value object ${b.name}${l ? ` — ${l}` : ""}`
    };
  }), r = (e.valueObjects ?? []).map((b) => ({
    id: `contains-vo:${b.aggregateId}->${b.id}`,
    sourceId: b.aggregateId,
    targetId: b.id,
    kind: "containment",
    color: "#a855f7",
    dashed: !0,
    tooltip: "Value object dentro del agregado"
  })), c = new Set((e.aggregates ?? []).map((b) => b.id)), g = [
    ...(e.aggregates ?? []).map((b) => ({ id: b.id, ownerKind: "agregado", invariants: b.invariants })),
    ...(e.valueObjects ?? []).map((b) => ({ id: b.id, ownerKind: "value object", invariants: b.invariants })),
    ...(e.entities ?? []).map((b) => ({ id: b.id, ownerKind: "entidad", invariants: b.invariants }))
  ], m = g.flatMap(
    (b) => (b.invariants ?? []).map((h, l) => {
      const u = n(b.id), x = t[h.id] ?? (c.has(b.id) ? { x: u.x - 150, y: u.y + 90 + l * 52 } : { x: u.x + 160, y: u.y + l * 46 });
      return {
        id: h.id,
        label: h.name,
        x: x.x,
        y: x.y,
        w: 150,
        h: 36,
        kind: "invariant",
        symbol: "shield",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        badge: "⚖ INVARIANTE",
        tooltip: `${h.name} — regla que el ${b.ownerKind} protege; doble click abre su ficha (las condiciones se detallan allí)`
      };
    })
  ), f = g.flatMap(
    (b) => (b.invariants ?? []).map((h) => ({
      id: `protects:${b.id}->${h.id}`,
      sourceId: b.id,
      targetId: h.id,
      kind: "invariant-containment",
      color: "#0f766e",
      dashed: !0,
      tooltip: "Protege esta regla — Supr la retira"
    }))
  ), y = (e.entities ?? []).map((b) => ({
    id: `contains:${b.aggregateId}->${b.id}`,
    sourceId: b.aggregateId,
    targetId: b.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), v = (e.aggregateReferences ?? []).map((b, h) => ({
    id: `aggref:${h}:${b.sourceAggregateId}->${b.targetAggregateId}`,
    sourceId: b.sourceAggregateId,
    targetId: b.targetAggregateId,
    kind: "aggregate-reference",
    label: b.label,
    color: "#475569",
    arrow: !0,
    tooltip: b.label ? `Referencia: ${b.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...a, ...s, ...d, ...m],
    edges: [...y, ...r, ...v, ...f]
  };
}
const ps = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, us = 150, ms = 44, fs = 190, hs = 56, gs = 160, ys = 48;
function bs(e, t) {
  const i = e.externalSystems.find((o) => o.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.boundedContexts.find((o) => o.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function vs(e, t) {
  const i = e.flows, n = [], o = [], a = /* @__PURE__ */ new Set(), s = (d) => {
    var r, c;
    return ((c = (r = e.aggregates) == null ? void 0 : r.find((g) => g.id === d)) == null ? void 0 : c.name) ?? d ?? "?";
  };
  return i.forEach((d, r) => {
    const c = 120 + r * 130, g = ps[d.archetype] ?? "#475569", m = d.triggerAggregateId ?? d.sourceId;
    if (!a.has(m)) {
      a.add(m);
      const h = t[m] ?? { x: 160, y: c };
      n.push({
        id: m,
        label: d.triggerAggregateId ? s(d.triggerAggregateId) : m,
        x: h.x,
        y: h.y,
        w: us,
        h: ms,
        kind: d.triggerAggregateId ? "aggregate" : "boundedContext",
        symbol: d.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: d.triggerAggregateId ? "AGGREGATE" : "BOUNDED_CONTEXT"
      });
    }
    const f = `flow:${d.id}`, y = t[f] ?? { x: 470, y: c };
    n.push({
      id: f,
      label: d.name,
      x: y.x,
      y: y.y,
      w: fs,
      h: hs,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: g,
      badge: d.archetype,
      tooltip: `Flow ${d.name} [${d.archetype}]${d.readModelName ? ` → read model ${d.readModelName}` : ""}${d.targetUseCaseId ? ` → use case ${d.targetUseCaseId}` : ""}`
    });
    const v = bs(e, d), b = `tgt:${v.id}`;
    if (!a.has(b)) {
      a.add(b);
      const h = t[b] ?? { x: 790, y: c };
      n.push({
        id: b,
        label: v.label,
        x: h.x,
        y: h.y,
        w: gs,
        h: ys,
        kind: v.external ? "external-system" : "boundedContext",
        symbol: "component",
        fill: v.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: v.external,
        badge: v.external ? "EXTERNAL" : "BOUNDED_CONTEXT"
      });
    }
    o.push({
      id: `fe:${d.id}:in`,
      sourceId: m,
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
      targetId: b,
      kind: "flow-delivery",
      color: g,
      arrow: !0
    });
  }), { nodes: n, edges: o };
}
const xs = 190, Is = 56, qi = 170, ws = 52;
function kn(e, t) {
  const i = [], n = [], o = (a) => {
    var s;
    return (s = e.boundedContexts.find((d) => d.id === a)) == null ? void 0 : s.name;
  };
  return (e.processes ?? []).forEach((a, s) => {
    const d = 140 + s * 240, r = t[a.id] ?? { x: 150, y: d };
    i.push({
      id: a.id,
      label: a.name,
      x: r.x,
      y: r.y,
      w: xs,
      h: Is,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${a.sla ? ` · SLA ${a.sla}` : ""}`,
      tooltip: `${a.name}${o(a.ownerBoundedContextId) ? ` — contexto ${o(a.ownerBoundedContextId)}` : ""}${a.triggerEvent ? ` · arranca con ${a.triggerEvent}` : ""}`
    });
    let c = a.id;
    if (a.steps.forEach((g, m) => {
      const f = g.type === "HUMAN", y = t[g.id] ?? { x: 150 + (m + 1) * 240, y: d };
      if (i.push({
        id: g.id,
        label: g.name,
        x: y.x,
        y: y.y,
        w: qi,
        h: ws,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${g.roleId ? ` · ${g.roleId}` : ""}${g.deadline ? ` · ⏱ ${g.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${g.name}${g.useCaseId ? ` — use case ${g.useCaseId}` : ""}${g.deadline ? ` · deadline ${g.deadline}` : ""}`
      }), n.push({
        id: `pe:${a.id}:${m}`,
        sourceId: c,
        targetId: g.id,
        kind: "process-seq",
        label: m === 0 ? a.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), g.compensationUseCaseId) {
        const v = `comp:${g.id}`, b = t[v] ?? { x: y.x, y: y.y + 90 };
        i.push({
          id: v,
          label: g.compensationUseCaseId,
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
          id: `pc:${g.id}`,
          sourceId: g.id,
          targetId: v,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = g.id;
    }), a.onCompletionEventName) {
      const g = `done:${a.id}`, m = t[g] ?? { x: 150 + (a.steps.length + 1) * 240, y: d };
      i.push({
        id: g,
        label: a.onCompletionEventName,
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
        id: `pd:${a.id}`,
        sourceId: c,
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
const wi = globalThis, pn = wi.ShadowRoot && (wi.ShadyCSS === void 0 || wi.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, un = Symbol(), $n = /* @__PURE__ */ new WeakMap();
let Po = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== un) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (pn && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = $n.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && $n.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ks = (e) => new Po(typeof e == "string" ? e : e + "", void 0, un), nt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, o, a) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + e[a + 1], e[0]);
  return new Po(i, e, un);
}, $s = (e, t) => {
  if (pn) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), o = wi.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = i.cssText, e.appendChild(n);
  }
}, _n = pn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return ks(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _s, defineProperty: Cs, getOwnPropertyDescriptor: Es, getOwnPropertyNames: Ss, getOwnPropertySymbols: As, getPrototypeOf: Ms } = Object, ut = globalThis, Cn = ut.trustedTypes, Ps = Cn ? Cn.emptyScript : "", Bi = ut.reactiveElementPolyfillSupport, Gt = (e, t) => e, Ei = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ps : null;
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
} }, mn = (e, t) => !_s(e, t), En = { attribute: !0, type: String, converter: Ei, reflect: !1, useDefault: !1, hasChanged: mn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ut.litPropertyMetadata ?? (ut.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Pt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = En) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), o = this.getPropertyDescriptor(t, n, i);
      o !== void 0 && Cs(this.prototype, t, o);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: o, set: a } = Es(this.prototype, t) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: o, set(s) {
      const d = o == null ? void 0 : o.call(this);
      a == null || a.call(this, s), this.requestUpdate(t, d, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? En;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Gt("elementProperties"))) return;
    const t = Ms(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Gt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Gt("properties"))) {
      const i = this.properties, n = [...Ss(i), ...As(i)];
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
      for (const o of n) i.unshift(_n(o));
    } else t !== void 0 && i.push(_n(t));
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
    return $s(t, this.constructor.elementStyles), t;
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
    var a;
    const n = this.constructor.elementProperties.get(t), o = this.constructor._$Eu(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const s = (((a = n.converter) == null ? void 0 : a.toAttribute) !== void 0 ? n.converter : Ei).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(o) : this.setAttribute(o, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var a, s;
    const n = this.constructor, o = n._$Eh.get(t);
    if (o !== void 0 && this._$Em !== o) {
      const d = n.getPropertyOptions(o), r = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((a = d.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? d.converter : Ei;
      this._$Em = o;
      const c = r.fromAttribute(i, d.type);
      this[o] = c ?? ((s = this._$Ej) == null ? void 0 : s.get(o)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, o = !1, a) {
    var s;
    if (t !== void 0) {
      const d = this.constructor;
      if (o === !1 && (a = this[t]), n ?? (n = d.getPropertyOptions(t)), !((n.hasChanged ?? mn)(a, i) || n.useDefault && n.reflect && a === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(d._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: o, wrapped: a }, s) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, s ?? i ?? this[t]), a !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), o === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [a, s] of this._$Ep) this[a] = s;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [a, s] of o) {
        const { wrapped: d } = s, r = this[a];
        d !== !0 || this._$AL.has(a) || r === void 0 || this.C(a, void 0, s, r);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (n = this._$EO) == null || n.forEach((o) => {
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
const Ht = globalThis, Sn = (e) => e, Si = Ht.trustedTypes, An = Si ? Si.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, To = "$lit$", pt = `lit$${Math.random().toFixed(9).slice(2)}$`, Oo = "?" + pt, Ts = `<${Oo}>`, Ct = document, Kt = () => Ct.createComment(""), Xt = (e) => e === null || typeof e != "object" && typeof e != "function", fn = Array.isArray, Os = (e) => fn(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Fi = `[ 	
\f\r]`, Ut = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Mn = /-->/g, Pn = />/g, ht = RegExp(`>|${Fi}(?:([^\\s"'>=/]+)(${Fi}*=${Fi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Tn = /'/g, On = /"/g, Ro = /^(?:script|style|textarea|title)$/i, No = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), w = No(1), J = No(2), Rt = Symbol.for("lit-noChange"), re = Symbol.for("lit-nothing"), Rn = /* @__PURE__ */ new WeakMap(), wt = Ct.createTreeWalker(Ct, 129);
function Do(e, t) {
  if (!fn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return An !== void 0 ? An.createHTML(t) : t;
}
const Rs = (e, t) => {
  const i = e.length - 1, n = [];
  let o, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = Ut;
  for (let d = 0; d < i; d++) {
    const r = e[d];
    let c, g, m = -1, f = 0;
    for (; f < r.length && (s.lastIndex = f, g = s.exec(r), g !== null); ) f = s.lastIndex, s === Ut ? g[1] === "!--" ? s = Mn : g[1] !== void 0 ? s = Pn : g[2] !== void 0 ? (Ro.test(g[2]) && (o = RegExp("</" + g[2], "g")), s = ht) : g[3] !== void 0 && (s = ht) : s === ht ? g[0] === ">" ? (s = o ?? Ut, m = -1) : g[1] === void 0 ? m = -2 : (m = s.lastIndex - g[2].length, c = g[1], s = g[3] === void 0 ? ht : g[3] === '"' ? On : Tn) : s === On || s === Tn ? s = ht : s === Mn || s === Pn ? s = Ut : (s = ht, o = void 0);
    const y = s === ht && e[d + 1].startsWith("/>") ? " " : "";
    a += s === Ut ? r + Ts : m >= 0 ? (n.push(c), r.slice(0, m) + To + r.slice(m) + pt + y) : r + pt + (m === -2 ? d : y);
  }
  return [Do(e, a + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Qt {
  constructor({ strings: t, _$litType$: i }, n) {
    let o;
    this.parts = [];
    let a = 0, s = 0;
    const d = t.length - 1, r = this.parts, [c, g] = Rs(t, i);
    if (this.el = Qt.createElement(c, n), wt.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (o = wt.nextNode()) !== null && r.length < d; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const m of o.getAttributeNames()) if (m.endsWith(To)) {
          const f = g[s++], y = o.getAttribute(m).split(pt), v = /([.?@])?(.*)/.exec(f);
          r.push({ type: 1, index: a, name: v[2], strings: y, ctor: v[1] === "." ? Ds : v[1] === "?" ? Ls : v[1] === "@" ? Us : Di }), o.removeAttribute(m);
        } else m.startsWith(pt) && (r.push({ type: 6, index: a }), o.removeAttribute(m));
        if (Ro.test(o.tagName)) {
          const m = o.textContent.split(pt), f = m.length - 1;
          if (f > 0) {
            o.textContent = Si ? Si.emptyScript : "";
            for (let y = 0; y < f; y++) o.append(m[y], Kt()), wt.nextNode(), r.push({ type: 2, index: ++a });
            o.append(m[f], Kt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Oo) r.push({ type: 2, index: a });
      else {
        let m = -1;
        for (; (m = o.data.indexOf(pt, m + 1)) !== -1; ) r.push({ type: 7, index: a }), m += pt.length - 1;
      }
      a++;
    }
  }
  static createElement(t, i) {
    const n = Ct.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Nt(e, t, i = e, n) {
  var s, d;
  if (t === Rt) return t;
  let o = n !== void 0 ? (s = i._$Co) == null ? void 0 : s[n] : i._$Cl;
  const a = Xt(t) ? void 0 : t._$litDirective$;
  return (o == null ? void 0 : o.constructor) !== a && ((d = o == null ? void 0 : o._$AO) == null || d.call(o, !1), a === void 0 ? o = void 0 : (o = new a(e), o._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = o : i._$Cl = o), o !== void 0 && (t = Nt(e, o._$AS(e, t.values), o, n)), t;
}
class Ns {
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
    let a = wt.nextNode(), s = 0, d = 0, r = n[0];
    for (; r !== void 0; ) {
      if (s === r.index) {
        let c;
        r.type === 2 ? c = new ni(a, a.nextSibling, this, t) : r.type === 1 ? c = new r.ctor(a, r.name, r.strings, this, t) : r.type === 6 && (c = new zs(a, this, t)), this._$AV.push(c), r = n[++d];
      }
      s !== (r == null ? void 0 : r.index) && (a = wt.nextNode(), s++);
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
    t = Nt(this, t, i), Xt(t) ? t === re || t == null || t === "" ? (this._$AH !== re && this._$AR(), this._$AH = re) : t !== this._$AH && t !== Rt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Os(t) ? this.k(t) : this._(t);
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
    var a;
    const { values: i, _$litType$: n } = t, o = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Qt.createElement(Do(n.h, n.h[0]), this.options)), n);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === o) this._$AH.p(i);
    else {
      const s = new Ns(o, this), d = s.u(this.options);
      s.p(i), this.T(d), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Rn.get(t.strings);
    return i === void 0 && Rn.set(t.strings, i = new Qt(t)), i;
  }
  k(t) {
    fn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, o = 0;
    for (const a of t) o === i.length ? i.push(n = new ni(this.O(Kt()), this.O(Kt()), this, this.options)) : n = i[o], n._$AI(a), o++;
    o < i.length && (this._$AR(n && n._$AB.nextSibling, o), i.length = o);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const o = Sn(t).nextSibling;
      Sn(t).remove(), t = o;
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
  constructor(t, i, n, o, a) {
    this.type = 1, this._$AH = re, this._$AN = void 0, this.element = t, this.name = i, this._$AM = o, this.options = a, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = re;
  }
  _$AI(t, i = this, n, o) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) t = Nt(this, t, i, 0), s = !Xt(t) || t !== this._$AH && t !== Rt, s && (this._$AH = t);
    else {
      const d = t;
      let r, c;
      for (t = a[0], r = 0; r < a.length - 1; r++) c = Nt(this, d[n + r], i, r), c === Rt && (c = this._$AH[r]), s || (s = !Xt(c) || c !== this._$AH[r]), c === re ? t = re : t !== re && (t += (c ?? "") + a[r + 1]), this._$AH[r] = c;
    }
    s && !o && this.j(t);
  }
  j(t) {
    t === re ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ds extends Di {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === re ? void 0 : t;
  }
}
class Ls extends Di {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== re);
  }
}
class Us extends Di {
  constructor(t, i, n, o, a) {
    super(t, i, n, o, a), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Nt(this, t, i, 0) ?? re) === Rt) return;
    const n = this._$AH, o = t === re && n !== re || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, a = t !== re && (n === re || o);
    o && this.element.removeEventListener(this.name, this, n), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class zs {
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
const qs = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let o = n._$litPart$;
  if (o === void 0) {
    const a = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = o = new ni(t.insertBefore(Kt(), a), a, void 0, i ?? {});
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = qs(i, this.renderRoot, this.renderOptions);
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
var Co;
je._$litElement$ = !0, je.finalized = !0, (Co = $t.litElementHydrateSupport) == null || Co.call($t, { LitElement: je });
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
const Bs = { attribute: !0, type: String, converter: Ei, reflect: !1, hasChanged: mn }, Fs = (e = Bs, t, i) => {
  const { kind: n, metadata: o } = i;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(i.name, e), n === "accessor") {
    const { name: s } = i;
    return { set(d) {
      const r = t.get.call(this);
      t.set.call(this, d), this.requestUpdate(s, r, e, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(s, void 0, e, d), d;
    } };
  }
  if (n === "setter") {
    const { name: s } = i;
    return function(d) {
      const r = this[s];
      t.call(this, d), this.requestUpdate(s, r, e, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function de(e) {
  return (t, i) => typeof i == "object" ? Fs(e, t, i) : ((n, o, a) => {
    const s = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, n), s ? Object.getOwnPropertyDescriptor(o, a) : void 0;
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
var Ji = "http://www.w3.org/1999/xhtml";
const Nn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ji,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Li(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Nn.hasOwnProperty(t) ? { space: Nn[t], local: e } : e;
}
function Vs(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Ji && t.documentElement.namespaceURI === Ji ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Ws(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Lo(e) {
  var t = Li(e);
  return (t.local ? Ws : Vs)(t);
}
function js() {
}
function hn(e) {
  return e == null ? js : function() {
    return this.querySelector(e);
  };
}
function Gs(e) {
  typeof e != "function" && (e = hn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], s = a.length, d = n[o] = new Array(s), r, c, g = 0; g < s; ++g)
      (r = a[g]) && (c = e.call(r, r.__data__, g, a)) && ("__data__" in r && (c.__data__ = r.__data__), d[g] = c);
  return new Ve(n, this._parents);
}
function Hs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Ys() {
  return [];
}
function Uo(e) {
  return e == null ? Ys : function() {
    return this.querySelectorAll(e);
  };
}
function Ks(e) {
  return function() {
    return Hs(e.apply(this, arguments));
  };
}
function Xs(e) {
  typeof e == "function" ? e = Ks(e) : e = Uo(e);
  for (var t = this._groups, i = t.length, n = [], o = [], a = 0; a < i; ++a)
    for (var s = t[a], d = s.length, r, c = 0; c < d; ++c)
      (r = s[c]) && (n.push(e.call(r, r.__data__, c, s)), o.push(r));
  return new Ve(n, o);
}
function zo(e) {
  return function() {
    return this.matches(e);
  };
}
function qo(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Qs = Array.prototype.find;
function Js(e) {
  return function() {
    return Qs.call(this.children, e);
  };
}
function Zs() {
  return this.firstElementChild;
}
function er(e) {
  return this.select(e == null ? Zs : Js(typeof e == "function" ? e : qo(e)));
}
var tr = Array.prototype.filter;
function ir() {
  return Array.from(this.children);
}
function nr(e) {
  return function() {
    return tr.call(this.children, e);
  };
}
function or(e) {
  return this.selectAll(e == null ? ir : nr(typeof e == "function" ? e : qo(e)));
}
function ar(e) {
  typeof e != "function" && (e = zo(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], s = a.length, d = n[o] = [], r, c = 0; c < s; ++c)
      (r = a[c]) && e.call(r, r.__data__, c, a) && d.push(r);
  return new Ve(n, this._parents);
}
function Bo(e) {
  return new Array(e.length);
}
function sr() {
  return new Ve(this._enter || this._groups.map(Bo), this._parents);
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
function rr(e) {
  return function() {
    return e;
  };
}
function dr(e, t, i, n, o, a) {
  for (var s = 0, d, r = t.length, c = a.length; s < c; ++s)
    (d = t[s]) ? (d.__data__ = a[s], n[s] = d) : i[s] = new Ai(e, a[s]);
  for (; s < r; ++s)
    (d = t[s]) && (o[s] = d);
}
function lr(e, t, i, n, o, a, s) {
  var d, r, c = /* @__PURE__ */ new Map(), g = t.length, m = a.length, f = new Array(g), y;
  for (d = 0; d < g; ++d)
    (r = t[d]) && (f[d] = y = s.call(r, r.__data__, d, t) + "", c.has(y) ? o[d] = r : c.set(y, r));
  for (d = 0; d < m; ++d)
    y = s.call(e, a[d], d, a) + "", (r = c.get(y)) ? (n[d] = r, r.__data__ = a[d], c.delete(y)) : i[d] = new Ai(e, a[d]);
  for (d = 0; d < g; ++d)
    (r = t[d]) && c.get(f[d]) === r && (o[d] = r);
}
function cr(e) {
  return e.__data__;
}
function pr(e, t) {
  if (!arguments.length) return Array.from(this, cr);
  var i = t ? lr : dr, n = this._parents, o = this._groups;
  typeof e != "function" && (e = rr(e));
  for (var a = o.length, s = new Array(a), d = new Array(a), r = new Array(a), c = 0; c < a; ++c) {
    var g = n[c], m = o[c], f = m.length, y = ur(e.call(g, g && g.__data__, c, n)), v = y.length, b = d[c] = new Array(v), h = s[c] = new Array(v), l = r[c] = new Array(f);
    i(g, m, b, h, l, y, t);
    for (var u = 0, x = 0, S, T; u < v; ++u)
      if (S = b[u]) {
        for (u >= x && (x = u + 1); !(T = h[x]) && ++x < v; ) ;
        S._next = T || null;
      }
  }
  return s = new Ve(s, n), s._enter = d, s._exit = r, s;
}
function ur(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function mr() {
  return new Ve(this._exit || this._groups.map(Bo), this._parents);
}
function fr(e, t, i) {
  var n = this.enter(), o = this, a = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (o = t(o), o && (o = o.selection())), i == null ? a.remove() : i(a), n && o ? n.merge(o).order() : o;
}
function hr(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, o = i.length, a = n.length, s = Math.min(o, a), d = new Array(o), r = 0; r < s; ++r)
    for (var c = i[r], g = n[r], m = c.length, f = d[r] = new Array(m), y, v = 0; v < m; ++v)
      (y = c[v] || g[v]) && (f[v] = y);
  for (; r < o; ++r)
    d[r] = i[r];
  return new Ve(d, this._parents);
}
function gr() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], o = n.length - 1, a = n[o], s; --o >= 0; )
      (s = n[o]) && (a && s.compareDocumentPosition(a) ^ 4 && a.parentNode.insertBefore(s, a), a = s);
  return this;
}
function yr(e) {
  e || (e = br);
  function t(m, f) {
    return m && f ? e(m.__data__, f.__data__) : !m - !f;
  }
  for (var i = this._groups, n = i.length, o = new Array(n), a = 0; a < n; ++a) {
    for (var s = i[a], d = s.length, r = o[a] = new Array(d), c, g = 0; g < d; ++g)
      (c = s[g]) && (r[g] = c);
    r.sort(t);
  }
  return new Ve(o, this._parents).order();
}
function br(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function vr() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function xr() {
  return Array.from(this);
}
function Ir() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], o = 0, a = n.length; o < a; ++o) {
      var s = n[o];
      if (s) return s;
    }
  return null;
}
function wr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function kr() {
  return !this.node();
}
function $r(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var o = t[i], a = 0, s = o.length, d; a < s; ++a)
      (d = o[a]) && e.call(d, d.__data__, a, o);
  return this;
}
function _r(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Cr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Er(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Sr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Ar(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Mr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Pr(e, t) {
  var i = Li(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? Cr : _r : typeof t == "function" ? i.local ? Mr : Ar : i.local ? Sr : Er)(i, t));
}
function Fo(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Tr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Or(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Rr(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function Nr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Tr : typeof t == "function" ? Rr : Or)(e, t, i ?? "")) : Dt(this.node(), e);
}
function Dt(e, t) {
  return e.style.getPropertyValue(t) || Fo(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Dr(e) {
  return function() {
    delete this[e];
  };
}
function Lr(e, t) {
  return function() {
    this[e] = t;
  };
}
function Ur(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function zr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Dr : typeof t == "function" ? Ur : Lr)(e, t)) : this.node()[e];
}
function Vo(e) {
  return e.trim().split(/^|\s+/);
}
function gn(e) {
  return e.classList || new Wo(e);
}
function Wo(e) {
  this._node = e, this._names = Vo(e.getAttribute("class") || "");
}
Wo.prototype = {
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
function jo(e, t) {
  for (var i = gn(e), n = -1, o = t.length; ++n < o; ) i.add(t[n]);
}
function Go(e, t) {
  for (var i = gn(e), n = -1, o = t.length; ++n < o; ) i.remove(t[n]);
}
function qr(e) {
  return function() {
    jo(this, e);
  };
}
function Br(e) {
  return function() {
    Go(this, e);
  };
}
function Fr(e, t) {
  return function() {
    (t.apply(this, arguments) ? jo : Go)(this, e);
  };
}
function Vr(e, t) {
  var i = Vo(e + "");
  if (arguments.length < 2) {
    for (var n = gn(this.node()), o = -1, a = i.length; ++o < a; ) if (!n.contains(i[o])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Fr : t ? qr : Br)(i, t));
}
function Wr() {
  this.textContent = "";
}
function jr(e) {
  return function() {
    this.textContent = e;
  };
}
function Gr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Hr(e) {
  return arguments.length ? this.each(e == null ? Wr : (typeof e == "function" ? Gr : jr)(e)) : this.node().textContent;
}
function Yr() {
  this.innerHTML = "";
}
function Kr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Xr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Qr(e) {
  return arguments.length ? this.each(e == null ? Yr : (typeof e == "function" ? Xr : Kr)(e)) : this.node().innerHTML;
}
function Jr() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Zr() {
  return this.each(Jr);
}
function ed() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function td() {
  return this.each(ed);
}
function id(e) {
  var t = typeof e == "function" ? e : Lo(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function nd() {
  return null;
}
function od(e, t) {
  var i = typeof e == "function" ? e : Lo(e), n = t == null ? nd : typeof t == "function" ? t : hn(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function ad() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function sd() {
  return this.each(ad);
}
function rd() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function dd() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function ld(e) {
  return this.select(e ? dd : rd);
}
function cd(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function pd(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function ud(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function md(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, o = t.length, a; i < o; ++i)
        a = t[i], (!e.type || a.type === e.type) && a.name === e.name ? this.removeEventListener(a.type, a.listener, a.options) : t[++n] = a;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function fd(e, t, i) {
  return function() {
    var n = this.__on, o, a = pd(t);
    if (n) {
      for (var s = 0, d = n.length; s < d; ++s)
        if ((o = n[s]).type === e.type && o.name === e.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = a, o.options = i), o.value = t;
          return;
        }
    }
    this.addEventListener(e.type, a, i), o = { type: e.type, name: e.name, value: t, listener: a, options: i }, n ? n.push(o) : this.__on = [o];
  };
}
function hd(e, t, i) {
  var n = ud(e + ""), o, a = n.length, s;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var r = 0, c = d.length, g; r < c; ++r)
        for (o = 0, g = d[r]; o < a; ++o)
          if ((s = n[o]).type === g.type && s.name === g.name)
            return g.value;
    }
    return;
  }
  for (d = t ? fd : md, o = 0; o < a; ++o) this.each(d(n[o], t, i));
  return this;
}
function Ho(e, t, i) {
  var n = Fo(e), o = n.CustomEvent;
  typeof o == "function" ? o = new o(t, i) : (o = n.document.createEvent("Event"), i ? (o.initEvent(t, i.bubbles, i.cancelable), o.detail = i.detail) : o.initEvent(t, !1, !1)), e.dispatchEvent(o);
}
function gd(e, t) {
  return function() {
    return Ho(this, e, t);
  };
}
function yd(e, t) {
  return function() {
    return Ho(this, e, t.apply(this, arguments));
  };
}
function bd(e, t) {
  return this.each((typeof t == "function" ? yd : gd)(e, t));
}
function* vd() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], o = 0, a = n.length, s; o < a; ++o)
      (s = n[o]) && (yield s);
}
var Yo = [null];
function Ve(e, t) {
  this._groups = e, this._parents = t;
}
function oi() {
  return new Ve([[document.documentElement]], Yo);
}
function xd() {
  return this;
}
Ve.prototype = oi.prototype = {
  constructor: Ve,
  select: Gs,
  selectAll: Xs,
  selectChild: er,
  selectChildren: or,
  filter: ar,
  data: pr,
  enter: sr,
  exit: mr,
  join: fr,
  merge: hr,
  selection: xd,
  order: gr,
  sort: yr,
  call: vr,
  nodes: xr,
  node: Ir,
  size: wr,
  empty: kr,
  each: $r,
  attr: Pr,
  style: Nr,
  property: zr,
  classed: Vr,
  text: Hr,
  html: Qr,
  raise: Zr,
  lower: td,
  append: id,
  insert: od,
  remove: sd,
  clone: ld,
  datum: cd,
  on: hd,
  dispatch: bd,
  [Symbol.iterator]: vd
};
function Ge(e) {
  return typeof e == "string" ? new Ve([[document.querySelector(e)]], [document.documentElement]) : new Ve([[e]], Yo);
}
function Id(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function gt(e, t) {
  if (e = Id(e), t === void 0 && (t = e.currentTarget), t) {
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
var wd = { value: () => {
} };
function yn() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new ki(i);
}
function ki(e) {
  this._ = e;
}
function kd(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", o = i.indexOf(".");
    if (o >= 0 && (n = i.slice(o + 1), i = i.slice(0, o)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
ki.prototype = yn.prototype = {
  constructor: ki,
  on: function(e, t) {
    var i = this._, n = kd(e + "", i), o, a = -1, s = n.length;
    if (arguments.length < 2) {
      for (; ++a < s; ) if ((o = (e = n[a]).type) && (o = $d(i[o], e.name))) return o;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++a < s; )
      if (o = (e = n[a]).type) i[o] = Dn(i[o], e.name, t);
      else if (t == null) for (o in i) i[o] = Dn(i[o], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new ki(e);
  },
  call: function(e, t) {
    if ((o = arguments.length - 2) > 0) for (var i = new Array(o), n = 0, o, a; n < o; ++n) i[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (a = this._[e], n = 0, o = a.length; n < o; ++n) a[n].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var n = this._[e], o = 0, a = n.length; o < a; ++o) n[o].value.apply(t, i);
  }
};
function $d(e, t) {
  for (var i = 0, n = e.length, o; i < n; ++i)
    if ((o = e[i]).name === t)
      return o.value;
}
function Dn(e, t, i) {
  for (var n = 0, o = e.length; n < o; ++n)
    if (e[n].name === t) {
      e[n] = wd, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Zi = { capture: !0, passive: !1 };
function en(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function _d(e) {
  var t = e.document.documentElement, i = Ge(e).on("dragstart.drag", en, Zi);
  "onselectstart" in t ? i.on("selectstart.drag", en, Zi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Cd(e, t) {
  var i = e.document.documentElement, n = Ge(e).on("dragstart.drag", null);
  t && (n.on("click.drag", en, Zi), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function bn(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function Ko(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function ai() {
}
var Jt = 0.7, Mi = 1 / Jt, Ot = "\\s*([+-]?\\d+)\\s*", Zt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Je = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ed = /^#([0-9a-f]{3,8})$/, Sd = new RegExp(`^rgb\\(${Ot},${Ot},${Ot}\\)$`), Ad = new RegExp(`^rgb\\(${Je},${Je},${Je}\\)$`), Md = new RegExp(`^rgba\\(${Ot},${Ot},${Ot},${Zt}\\)$`), Pd = new RegExp(`^rgba\\(${Je},${Je},${Je},${Zt}\\)$`), Td = new RegExp(`^hsl\\(${Zt},${Je},${Je}\\)$`), Od = new RegExp(`^hsla\\(${Zt},${Je},${Je},${Zt}\\)$`), Ln = {
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
bn(ai, ei, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Un,
  // Deprecated! Use color.formatHex.
  formatHex: Un,
  formatHex8: Rd,
  formatHsl: Nd,
  formatRgb: zn,
  toString: zn
});
function Un() {
  return this.rgb().formatHex();
}
function Rd() {
  return this.rgb().formatHex8();
}
function Nd() {
  return Xo(this).formatHsl();
}
function zn() {
  return this.rgb().formatRgb();
}
function ei(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = Ed.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? qn(t) : i === 3 ? new Ue(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? ri(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? ri(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Sd.exec(e)) ? new Ue(t[1], t[2], t[3], 1) : (t = Ad.exec(e)) ? new Ue(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Md.exec(e)) ? ri(t[1], t[2], t[3], t[4]) : (t = Pd.exec(e)) ? ri(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Td.exec(e)) ? Vn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Od.exec(e)) ? Vn(t[1], t[2] / 100, t[3] / 100, t[4]) : Ln.hasOwnProperty(e) ? qn(Ln[e]) : e === "transparent" ? new Ue(NaN, NaN, NaN, 0) : null;
}
function qn(e) {
  return new Ue(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ri(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new Ue(e, t, i, n);
}
function Dd(e) {
  return e instanceof ai || (e = ei(e)), e ? (e = e.rgb(), new Ue(e.r, e.g, e.b, e.opacity)) : new Ue();
}
function tn(e, t, i, n) {
  return arguments.length === 1 ? Dd(e) : new Ue(e, t, i, n ?? 1);
}
function Ue(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
bn(Ue, tn, Ko(ai, {
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
  hex: Bn,
  // Deprecated! Use color.formatHex.
  formatHex: Bn,
  formatHex8: Ld,
  formatRgb: Fn,
  toString: Fn
}));
function Bn() {
  return `#${kt(this.r)}${kt(this.g)}${kt(this.b)}`;
}
function Ld() {
  return `#${kt(this.r)}${kt(this.g)}${kt(this.b)}${kt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Fn() {
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
function Vn(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new He(e, t, i, n);
}
function Xo(e) {
  if (e instanceof He) return new He(e.h, e.s, e.l, e.opacity);
  if (e instanceof ai || (e = ei(e)), !e) return new He();
  if (e instanceof He) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, o = Math.min(t, i, n), a = Math.max(t, i, n), s = NaN, d = a - o, r = (a + o) / 2;
  return d ? (t === a ? s = (i - n) / d + (i < n) * 6 : i === a ? s = (n - t) / d + 2 : s = (t - i) / d + 4, d /= r < 0.5 ? a + o : 2 - a - o, s *= 60) : d = r > 0 && r < 1 ? 0 : s, new He(s, d, r, e.opacity);
}
function Ud(e, t, i, n) {
  return arguments.length === 1 ? Xo(e) : new He(e, t, i, n ?? 1);
}
function He(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
bn(He, Ud, Ko(ai, {
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
    return new He(Wn(this.h), di(this.s), di(this.l), Pi(this.opacity));
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
function ji(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Qo = (e) => () => e;
function zd(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function qd(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function Bd(e) {
  return (e = +e) == 1 ? Jo : function(t, i) {
    return i - t ? qd(t, i, e) : Qo(isNaN(t) ? i : t);
  };
}
function Jo(e, t) {
  var i = t - e;
  return i ? zd(e, i) : Qo(isNaN(e) ? t : e);
}
const jn = (function e(t) {
  var i = Bd(t);
  function n(o, a) {
    var s = i((o = tn(o)).r, (a = tn(a)).r), d = i(o.g, a.g), r = i(o.b, a.b), c = Jo(o.opacity, a.opacity);
    return function(g) {
      return o.r = s(g), o.g = d(g), o.b = r(g), o.opacity = c(g), o + "";
    };
  }
  return n.gamma = e, n;
})(1);
function lt(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var nn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Gi = new RegExp(nn.source, "g");
function Fd(e) {
  return function() {
    return e;
  };
}
function Vd(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Wd(e, t) {
  var i = nn.lastIndex = Gi.lastIndex = 0, n, o, a, s = -1, d = [], r = [];
  for (e = e + "", t = t + ""; (n = nn.exec(e)) && (o = Gi.exec(t)); )
    (a = o.index) > i && (a = t.slice(i, a), d[s] ? d[s] += a : d[++s] = a), (n = n[0]) === (o = o[0]) ? d[s] ? d[s] += o : d[++s] = o : (d[++s] = null, r.push({ i: s, x: lt(n, o) })), i = Gi.lastIndex;
  return i < t.length && (a = t.slice(i), d[s] ? d[s] += a : d[++s] = a), d.length < 2 ? r[0] ? Vd(r[0].x) : Fd(t) : (t = r.length, function(c) {
    for (var g = 0, m; g < t; ++g) d[(m = r[g]).i] = m.x(c);
    return d.join("");
  });
}
var Gn = 180 / Math.PI, on = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Zo(e, t, i, n, o, a) {
  var s, d, r;
  return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (r = e * i + t * n) && (i -= e * r, n -= t * r), (d = Math.sqrt(i * i + n * n)) && (i /= d, n /= d, r /= d), e * n < t * i && (e = -e, t = -t, r = -r, s = -s), {
    translateX: o,
    translateY: a,
    rotate: Math.atan2(t, e) * Gn,
    skewX: Math.atan(r) * Gn,
    scaleX: s,
    scaleY: d
  };
}
var li;
function jd(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? on : Zo(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Gd(e) {
  return e == null || (li || (li = document.createElementNS("http://www.w3.org/2000/svg", "g")), li.setAttribute("transform", e), !(e = li.transform.baseVal.consolidate())) ? on : (e = e.matrix, Zo(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ea(e, t, i, n) {
  function o(c) {
    return c.length ? c.pop() + " " : "";
  }
  function a(c, g, m, f, y, v) {
    if (c !== m || g !== f) {
      var b = y.push("translate(", null, t, null, i);
      v.push({ i: b - 4, x: lt(c, m) }, { i: b - 2, x: lt(g, f) });
    } else (m || f) && y.push("translate(" + m + t + f + i);
  }
  function s(c, g, m, f) {
    c !== g ? (c - g > 180 ? g += 360 : g - c > 180 && (c += 360), f.push({ i: m.push(o(m) + "rotate(", null, n) - 2, x: lt(c, g) })) : g && m.push(o(m) + "rotate(" + g + n);
  }
  function d(c, g, m, f) {
    c !== g ? f.push({ i: m.push(o(m) + "skewX(", null, n) - 2, x: lt(c, g) }) : g && m.push(o(m) + "skewX(" + g + n);
  }
  function r(c, g, m, f, y, v) {
    if (c !== m || g !== f) {
      var b = y.push(o(y) + "scale(", null, ",", null, ")");
      v.push({ i: b - 4, x: lt(c, m) }, { i: b - 2, x: lt(g, f) });
    } else (m !== 1 || f !== 1) && y.push(o(y) + "scale(" + m + "," + f + ")");
  }
  return function(c, g) {
    var m = [], f = [];
    return c = e(c), g = e(g), a(c.translateX, c.translateY, g.translateX, g.translateY, m, f), s(c.rotate, g.rotate, m, f), d(c.skewX, g.skewX, m, f), r(c.scaleX, c.scaleY, g.scaleX, g.scaleY, m, f), c = g = null, function(y) {
      for (var v = -1, b = f.length, h; ++v < b; ) m[(h = f[v]).i] = h.x(y);
      return m.join("");
    };
  };
}
var Hd = ea(jd, "px, ", "px)", "deg)"), Yd = ea(Gd, ", ", ")", ")"), Kd = 1e-12;
function Hn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Xd(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Qd(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Jd = (function e(t, i, n) {
  function o(a, s) {
    var d = a[0], r = a[1], c = a[2], g = s[0], m = s[1], f = s[2], y = g - d, v = m - r, b = y * y + v * v, h, l;
    if (b < Kd)
      l = Math.log(f / c) / t, h = function(R) {
        return [
          d + R * y,
          r + R * v,
          c * Math.exp(t * R * l)
        ];
      };
    else {
      var u = Math.sqrt(b), x = (f * f - c * c + n * b) / (2 * c * i * u), S = (f * f - c * c - n * b) / (2 * f * i * u), T = Math.log(Math.sqrt(x * x + 1) - x), E = Math.log(Math.sqrt(S * S + 1) - S);
      l = (E - T) / t, h = function(R) {
        var j = R * l, V = Hn(T), se = c / (i * u) * (V * Qd(t * j + T) - Xd(T));
        return [
          d + se * y,
          r + se * v,
          c * V / Hn(t * j + T)
        ];
      };
    }
    return h.duration = l * 1e3 * t / Math.SQRT2, h;
  }
  return o.rho = function(a) {
    var s = Math.max(1e-3, +a), d = s * s, r = d * d;
    return e(s, d, r);
  }, o;
})(Math.SQRT2, 2, 4);
var Lt = 0, Vt = 0, zt = 0, ta = 1e3, Ti, Wt, Oi = 0, Et = 0, Ui = 0, ti = typeof performance == "object" && performance.now ? performance : Date, ia = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function vn() {
  return Et || (ia(Zd), Et = ti.now() + Ui);
}
function Zd() {
  Et = 0;
}
function Ri() {
  this._call = this._time = this._next = null;
}
Ri.prototype = na.prototype = {
  constructor: Ri,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? vn() : +i) + (t == null ? 0 : +t), !this._next && Wt !== this && (Wt ? Wt._next = this : Ti = this, Wt = this), this._call = e, this._time = i, an();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, an());
  }
};
function na(e, t, i) {
  var n = new Ri();
  return n.restart(e, t, i), n;
}
function el() {
  vn(), ++Lt;
  for (var e = Ti, t; e; )
    (t = Et - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Lt;
}
function Yn() {
  Et = (Oi = ti.now()) + Ui, Lt = Vt = 0;
  try {
    el();
  } finally {
    Lt = 0, il(), Et = 0;
  }
}
function tl() {
  var e = ti.now(), t = e - Oi;
  t > ta && (Ui -= t, Oi = e);
}
function il() {
  for (var e, t = Ti, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Ti = i);
  Wt = e, an(n);
}
function an(e) {
  if (!Lt) {
    Vt && (Vt = clearTimeout(Vt));
    var t = e - Et;
    t > 24 ? (e < 1 / 0 && (Vt = setTimeout(Yn, e - ti.now() - Ui)), zt && (zt = clearInterval(zt))) : (zt || (Oi = ti.now(), zt = setInterval(tl, ta)), Lt = 1, ia(Yn));
  }
}
function Kn(e, t, i) {
  var n = new Ri();
  return t = t == null ? 0 : +t, n.restart((o) => {
    n.stop(), e(o + t);
  }, t, i), n;
}
var nl = yn("start", "end", "cancel", "interrupt"), ol = [], oa = 0, Xn = 1, sn = 2, $i = 3, Qn = 4, rn = 5, _i = 6;
function zi(e, t, i, n, o, a) {
  var s = e.__transition;
  if (!s) e.__transition = {};
  else if (i in s) return;
  al(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: o,
    // For context during callback.
    on: nl,
    tween: ol,
    time: a.time,
    delay: a.delay,
    duration: a.duration,
    ease: a.ease,
    timer: null,
    state: oa
  });
}
function xn(e, t) {
  var i = Ke(e, t);
  if (i.state > oa) throw new Error("too late; already scheduled");
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
function al(e, t, i) {
  var n = e.__transition, o;
  n[t] = i, i.timer = na(a, 0, i.time);
  function a(c) {
    i.state = Xn, i.timer.restart(s, i.delay, i.time), i.delay <= c && s(c - i.delay);
  }
  function s(c) {
    var g, m, f, y;
    if (i.state !== Xn) return r();
    for (g in n)
      if (y = n[g], y.name === i.name) {
        if (y.state === $i) return Kn(s);
        y.state === Qn ? (y.state = _i, y.timer.stop(), y.on.call("interrupt", e, e.__data__, y.index, y.group), delete n[g]) : +g < t && (y.state = _i, y.timer.stop(), y.on.call("cancel", e, e.__data__, y.index, y.group), delete n[g]);
      }
    if (Kn(function() {
      i.state === $i && (i.state = Qn, i.timer.restart(d, i.delay, i.time), d(c));
    }), i.state = sn, i.on.call("start", e, e.__data__, i.index, i.group), i.state === sn) {
      for (i.state = $i, o = new Array(f = i.tween.length), g = 0, m = -1; g < f; ++g)
        (y = i.tween[g].value.call(e, e.__data__, i.index, i.group)) && (o[++m] = y);
      o.length = m + 1;
    }
  }
  function d(c) {
    for (var g = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(r), i.state = rn, 1), m = -1, f = o.length; ++m < f; )
      o[m].call(e, g);
    i.state === rn && (i.on.call("end", e, e.__data__, i.index, i.group), r());
  }
  function r() {
    i.state = _i, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function Ci(e, t) {
  var i = e.__transition, n, o, a = !0, s;
  if (i) {
    t = t == null ? null : t + "";
    for (s in i) {
      if ((n = i[s]).name !== t) {
        a = !1;
        continue;
      }
      o = n.state > sn && n.state < rn, n.state = _i, n.timer.stop(), n.on.call(o ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[s];
    }
    a && delete e.__transition;
  }
}
function sl(e) {
  return this.each(function() {
    Ci(this, e);
  });
}
function rl(e, t) {
  var i, n;
  return function() {
    var o = Ze(this, e), a = o.tween;
    if (a !== i) {
      n = i = a;
      for (var s = 0, d = n.length; s < d; ++s)
        if (n[s].name === t) {
          n = n.slice(), n.splice(s, 1);
          break;
        }
    }
    o.tween = n;
  };
}
function dl(e, t, i) {
  var n, o;
  if (typeof i != "function") throw new Error();
  return function() {
    var a = Ze(this, e), s = a.tween;
    if (s !== n) {
      o = (n = s).slice();
      for (var d = { name: t, value: i }, r = 0, c = o.length; r < c; ++r)
        if (o[r].name === t) {
          o[r] = d;
          break;
        }
      r === c && o.push(d);
    }
    a.tween = o;
  };
}
function ll(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = Ke(this.node(), i).tween, o = 0, a = n.length, s; o < a; ++o)
      if ((s = n[o]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? rl : dl)(i, e, t));
}
function In(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var o = Ze(this, n);
    (o.value || (o.value = {}))[t] = i.apply(this, arguments);
  }), function(o) {
    return Ke(o, n).value[t];
  };
}
function aa(e, t) {
  var i;
  return (typeof t == "number" ? lt : t instanceof ei ? jn : (i = ei(t)) ? (t = i, jn) : Wd)(e, t);
}
function cl(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function pl(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function ul(e, t, i) {
  var n, o = i + "", a;
  return function() {
    var s = this.getAttribute(e);
    return s === o ? null : s === n ? a : a = t(n = s, i);
  };
}
function ml(e, t, i) {
  var n, o = i + "", a;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === o ? null : s === n ? a : a = t(n = s, i);
  };
}
function fl(e, t, i) {
  var n, o, a;
  return function() {
    var s, d = i(this), r;
    return d == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), r = d + "", s === r ? null : s === n && r === o ? a : (o = r, a = t(n = s, d)));
  };
}
function hl(e, t, i) {
  var n, o, a;
  return function() {
    var s, d = i(this), r;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), r = d + "", s === r ? null : s === n && r === o ? a : (o = r, a = t(n = s, d)));
  };
}
function gl(e, t) {
  var i = Li(e), n = i === "transform" ? Yd : aa;
  return this.attrTween(e, typeof t == "function" ? (i.local ? hl : fl)(i, n, In(this, "attr." + e, t)) : t == null ? (i.local ? pl : cl)(i) : (i.local ? ml : ul)(i, n, t));
}
function yl(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function bl(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function vl(e, t) {
  var i, n;
  function o() {
    var a = t.apply(this, arguments);
    return a !== n && (i = (n = a) && bl(e, a)), i;
  }
  return o._value = t, o;
}
function xl(e, t) {
  var i, n;
  function o() {
    var a = t.apply(this, arguments);
    return a !== n && (i = (n = a) && yl(e, a)), i;
  }
  return o._value = t, o;
}
function Il(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = Li(e);
  return this.tween(i, (n.local ? vl : xl)(n, t));
}
function wl(e, t) {
  return function() {
    xn(this, e).delay = +t.apply(this, arguments);
  };
}
function kl(e, t) {
  return t = +t, function() {
    xn(this, e).delay = t;
  };
}
function $l(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? wl : kl)(t, e)) : Ke(this.node(), t).delay;
}
function _l(e, t) {
  return function() {
    Ze(this, e).duration = +t.apply(this, arguments);
  };
}
function Cl(e, t) {
  return t = +t, function() {
    Ze(this, e).duration = t;
  };
}
function El(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? _l : Cl)(t, e)) : Ke(this.node(), t).duration;
}
function Sl(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Ze(this, e).ease = t;
  };
}
function Al(e) {
  var t = this._id;
  return arguments.length ? this.each(Sl(t, e)) : Ke(this.node(), t).ease;
}
function Ml(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Ze(this, e).ease = i;
  };
}
function Pl(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Ml(this._id, e));
}
function Tl(e) {
  typeof e != "function" && (e = zo(e));
  for (var t = this._groups, i = t.length, n = new Array(i), o = 0; o < i; ++o)
    for (var a = t[o], s = a.length, d = n[o] = [], r, c = 0; c < s; ++c)
      (r = a[c]) && e.call(r, r.__data__, c, a) && d.push(r);
  return new it(n, this._parents, this._name, this._id);
}
function Ol(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, o = i.length, a = Math.min(n, o), s = new Array(n), d = 0; d < a; ++d)
    for (var r = t[d], c = i[d], g = r.length, m = s[d] = new Array(g), f, y = 0; y < g; ++y)
      (f = r[y] || c[y]) && (m[y] = f);
  for (; d < n; ++d)
    s[d] = t[d];
  return new it(s, this._parents, this._name, this._id);
}
function Rl(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Nl(e, t, i) {
  var n, o, a = Rl(t) ? xn : Ze;
  return function() {
    var s = a(this, e), d = s.on;
    d !== n && (o = (n = d).copy()).on(t, i), s.on = o;
  };
}
function Dl(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Ke(this.node(), i).on.on(e) : this.each(Nl(i, e, t));
}
function Ll(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Ul() {
  return this.on("end.remove", Ll(this._id));
}
function zl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = hn(e));
  for (var n = this._groups, o = n.length, a = new Array(o), s = 0; s < o; ++s)
    for (var d = n[s], r = d.length, c = a[s] = new Array(r), g, m, f = 0; f < r; ++f)
      (g = d[f]) && (m = e.call(g, g.__data__, f, d)) && ("__data__" in g && (m.__data__ = g.__data__), c[f] = m, zi(c[f], t, i, f, c, Ke(g, i)));
  return new it(a, this._parents, t, i);
}
function ql(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Uo(e));
  for (var n = this._groups, o = n.length, a = [], s = [], d = 0; d < o; ++d)
    for (var r = n[d], c = r.length, g, m = 0; m < c; ++m)
      if (g = r[m]) {
        for (var f = e.call(g, g.__data__, m, r), y, v = Ke(g, i), b = 0, h = f.length; b < h; ++b)
          (y = f[b]) && zi(y, t, i, b, f, v);
        a.push(f), s.push(g);
      }
  return new it(a, s, t, i);
}
var Bl = oi.prototype.constructor;
function Fl() {
  return new Bl(this._groups, this._parents);
}
function Vl(e, t) {
  var i, n, o;
  return function() {
    var a = Dt(this, e), s = (this.style.removeProperty(e), Dt(this, e));
    return a === s ? null : a === i && s === n ? o : o = t(i = a, n = s);
  };
}
function sa(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Wl(e, t, i) {
  var n, o = i + "", a;
  return function() {
    var s = Dt(this, e);
    return s === o ? null : s === n ? a : a = t(n = s, i);
  };
}
function jl(e, t, i) {
  var n, o, a;
  return function() {
    var s = Dt(this, e), d = i(this), r = d + "";
    return d == null && (r = d = (this.style.removeProperty(e), Dt(this, e))), s === r ? null : s === n && r === o ? a : (o = r, a = t(n = s, d));
  };
}
function Gl(e, t) {
  var i, n, o, a = "style." + t, s = "end." + a, d;
  return function() {
    var r = Ze(this, e), c = r.on, g = r.value[a] == null ? d || (d = sa(t)) : void 0;
    (c !== i || o !== g) && (n = (i = c).copy()).on(s, o = g), r.on = n;
  };
}
function Hl(e, t, i) {
  var n = (e += "") == "transform" ? Hd : aa;
  return t == null ? this.styleTween(e, Vl(e, n)).on("end.style." + e, sa(e)) : typeof t == "function" ? this.styleTween(e, jl(e, n, In(this, "style." + e, t))).each(Gl(this._id, e)) : this.styleTween(e, Wl(e, n, t), i).on("end.style." + e, null);
}
function Yl(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Kl(e, t, i) {
  var n, o;
  function a() {
    var s = t.apply(this, arguments);
    return s !== o && (n = (o = s) && Yl(e, s, i)), n;
  }
  return a._value = t, a;
}
function Xl(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Kl(e, t, i ?? ""));
}
function Ql(e) {
  return function() {
    this.textContent = e;
  };
}
function Jl(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Zl(e) {
  return this.tween("text", typeof e == "function" ? Jl(In(this, "text", e)) : Ql(e == null ? "" : e + ""));
}
function ec(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function tc(e) {
  var t, i;
  function n() {
    var o = e.apply(this, arguments);
    return o !== i && (t = (i = o) && ec(o)), t;
  }
  return n._value = e, n;
}
function ic(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, tc(e));
}
function nc() {
  for (var e = this._name, t = this._id, i = ra(), n = this._groups, o = n.length, a = 0; a < o; ++a)
    for (var s = n[a], d = s.length, r, c = 0; c < d; ++c)
      if (r = s[c]) {
        var g = Ke(r, t);
        zi(r, e, i, c, s, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new it(n, this._parents, e, i);
}
function oc() {
  var e, t, i = this, n = i._id, o = i.size();
  return new Promise(function(a, s) {
    var d = { value: s }, r = { value: function() {
      --o === 0 && a();
    } };
    i.each(function() {
      var c = Ze(this, n), g = c.on;
      g !== e && (t = (e = g).copy(), t._.cancel.push(d), t._.interrupt.push(d), t._.end.push(r)), c.on = t;
    }), o === 0 && a();
  });
}
var ac = 0;
function it(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function ra() {
  return ++ac;
}
var et = oi.prototype;
it.prototype = {
  constructor: it,
  select: zl,
  selectAll: ql,
  selectChild: et.selectChild,
  selectChildren: et.selectChildren,
  filter: Tl,
  merge: Ol,
  selection: Fl,
  transition: nc,
  call: et.call,
  nodes: et.nodes,
  node: et.node,
  size: et.size,
  empty: et.empty,
  each: et.each,
  on: Dl,
  attr: gl,
  attrTween: Il,
  style: Hl,
  styleTween: Xl,
  text: Zl,
  textTween: ic,
  remove: Ul,
  tween: ll,
  delay: $l,
  duration: El,
  ease: Al,
  easeVarying: Pl,
  end: oc,
  [Symbol.iterator]: et[Symbol.iterator]
};
function sc(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var rc = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: sc
};
function dc(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function lc(e) {
  var t, i;
  e instanceof it ? (t = e._id, e = e._name) : (t = ra(), (i = rc).time = vn(), e = e == null ? null : e + "");
  for (var n = this._groups, o = n.length, a = 0; a < o; ++a)
    for (var s = n[a], d = s.length, r, c = 0; c < d; ++c)
      (r = s[c]) && zi(r, e, t, c, s, i || dc(r, t));
  return new it(n, this._parents, e, t);
}
oi.prototype.interrupt = sl;
oi.prototype.transition = lc;
const ci = (e) => () => e;
function cc(e, {
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
function pc(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function uc() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Jn() {
  return this.__zoom || Yt;
}
function mc(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function fc() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function hc(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], o = e.invertX(t[1][0]) - i[1][0], a = e.invertY(t[0][1]) - i[0][1], s = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    o > n ? (n + o) / 2 : Math.min(0, n) || Math.max(0, o),
    s > a ? (a + s) / 2 : Math.min(0, a) || Math.max(0, s)
  );
}
function gc() {
  var e = pc, t = uc, i = hc, n = mc, o = fc, a = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, r = Jd, c = yn("start", "zoom", "end"), g, m, f, y = 500, v = 150, b = 0, h = 10;
  function l(O) {
    O.property("__zoom", Jn).on("wheel.zoom", j, { passive: !1 }).on("mousedown.zoom", V).on("dblclick.zoom", se).filter(o).on("touchstart.zoom", C).on("touchmove.zoom", Y).on("touchend.zoom touchcancel.zoom", B).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  l.transform = function(O, W, I, k) {
    var N = O.selection ? O.selection() : O;
    N.property("__zoom", Jn), O !== N ? T(O, W, I, k) : N.interrupt().each(function() {
      E(this, arguments).event(k).start().zoom(null, typeof W == "function" ? W.apply(this, arguments) : W).end();
    });
  }, l.scaleBy = function(O, W, I, k) {
    l.scaleTo(O, function() {
      var N = this.__zoom.k, _ = typeof W == "function" ? W.apply(this, arguments) : W;
      return N * _;
    }, I, k);
  }, l.scaleTo = function(O, W, I, k) {
    l.transform(O, function() {
      var N = t.apply(this, arguments), _ = this.__zoom, $ = I == null ? S(N) : typeof I == "function" ? I.apply(this, arguments) : I, M = _.invert($), A = typeof W == "function" ? W.apply(this, arguments) : W;
      return i(x(u(_, A), $, M), N, s);
    }, I, k);
  }, l.translateBy = function(O, W, I, k) {
    l.transform(O, function() {
      return i(this.__zoom.translate(
        typeof W == "function" ? W.apply(this, arguments) : W,
        typeof I == "function" ? I.apply(this, arguments) : I
      ), t.apply(this, arguments), s);
    }, null, k);
  }, l.translateTo = function(O, W, I, k, N) {
    l.transform(O, function() {
      var _ = t.apply(this, arguments), $ = this.__zoom, M = k == null ? S(_) : typeof k == "function" ? k.apply(this, arguments) : k;
      return i(Yt.translate(M[0], M[1]).scale($.k).translate(
        typeof W == "function" ? -W.apply(this, arguments) : -W,
        typeof I == "function" ? -I.apply(this, arguments) : -I
      ), _, s);
    }, k, N);
  };
  function u(O, W) {
    return W = Math.max(a[0], Math.min(a[1], W)), W === O.k ? O : new tt(W, O.x, O.y);
  }
  function x(O, W, I) {
    var k = W[0] - I[0] * O.k, N = W[1] - I[1] * O.k;
    return k === O.x && N === O.y ? O : new tt(O.k, k, N);
  }
  function S(O) {
    return [(+O[0][0] + +O[1][0]) / 2, (+O[0][1] + +O[1][1]) / 2];
  }
  function T(O, W, I, k) {
    O.on("start.zoom", function() {
      E(this, arguments).event(k).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(k).end();
    }).tween("zoom", function() {
      var N = this, _ = arguments, $ = E(N, _).event(k), M = t.apply(N, _), A = I == null ? S(M) : typeof I == "function" ? I.apply(N, _) : I, q = Math.max(M[1][0] - M[0][0], M[1][1] - M[0][1]), D = N.__zoom, z = typeof W == "function" ? W.apply(N, _) : W, G = r(D.invert(A).concat(q / D.k), z.invert(A).concat(q / z.k));
      return function(X) {
        if (X === 1) X = z;
        else {
          var le = G(X), Ee = q / le[2];
          X = new tt(Ee, A[0] - le[0] * Ee, A[1] - le[1] * Ee);
        }
        $.zoom(null, X);
      };
    });
  }
  function E(O, W, I) {
    return !I && O.__zooming || new R(O, W);
  }
  function R(O, W) {
    this.that = O, this.args = W, this.active = 0, this.sourceEvent = null, this.extent = t.apply(O, W), this.taps = 0;
  }
  R.prototype = {
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
      c.call(
        O,
        this.that,
        new cc(O, {
          sourceEvent: this.sourceEvent,
          target: l,
          transform: this.that.__zoom,
          dispatch: c
        }),
        W
      );
    }
  };
  function j(O, ...W) {
    if (!e.apply(this, arguments)) return;
    var I = E(this, W).event(O), k = this.__zoom, N = Math.max(a[0], Math.min(a[1], k.k * Math.pow(2, n.apply(this, arguments)))), _ = gt(O);
    if (I.wheel)
      (I.mouse[0][0] !== _[0] || I.mouse[0][1] !== _[1]) && (I.mouse[1] = k.invert(I.mouse[0] = _)), clearTimeout(I.wheel);
    else {
      if (k.k === N) return;
      I.mouse = [_, k.invert(_)], Ci(this), I.start();
    }
    qt(O), I.wheel = setTimeout($, v), I.zoom("mouse", i(x(u(k, N), I.mouse[0], I.mouse[1]), I.extent, s));
    function $() {
      I.wheel = null, I.end();
    }
  }
  function V(O, ...W) {
    if (f || !e.apply(this, arguments)) return;
    var I = O.currentTarget, k = E(this, W, !0).event(O), N = Ge(O.view).on("mousemove.zoom", A, !0).on("mouseup.zoom", q, !0), _ = gt(O, I), $ = O.clientX, M = O.clientY;
    _d(O.view), Hi(O), k.mouse = [_, this.__zoom.invert(_)], Ci(this), k.start();
    function A(D) {
      if (qt(D), !k.moved) {
        var z = D.clientX - $, G = D.clientY - M;
        k.moved = z * z + G * G > b;
      }
      k.event(D).zoom("mouse", i(x(k.that.__zoom, k.mouse[0] = gt(D, I), k.mouse[1]), k.extent, s));
    }
    function q(D) {
      N.on("mousemove.zoom mouseup.zoom", null), Cd(D.view, k.moved), qt(D), k.event(D).end();
    }
  }
  function se(O, ...W) {
    if (e.apply(this, arguments)) {
      var I = this.__zoom, k = gt(O.changedTouches ? O.changedTouches[0] : O, this), N = I.invert(k), _ = I.k * (O.shiftKey ? 0.5 : 2), $ = i(x(u(I, _), k, N), t.apply(this, W), s);
      qt(O), d > 0 ? Ge(this).transition().duration(d).call(T, $, k, O) : Ge(this).call(l.transform, $, k, O);
    }
  }
  function C(O, ...W) {
    if (e.apply(this, arguments)) {
      var I = O.touches, k = I.length, N = E(this, W, O.changedTouches.length === k).event(O), _, $, M, A;
      for (Hi(O), $ = 0; $ < k; ++$)
        M = I[$], A = gt(M, this), A = [A, this.__zoom.invert(A), M.identifier], N.touch0 ? !N.touch1 && N.touch0[2] !== A[2] && (N.touch1 = A, N.taps = 0) : (N.touch0 = A, _ = !0, N.taps = 1 + !!g);
      g && (g = clearTimeout(g)), _ && (N.taps < 2 && (m = A[0], g = setTimeout(function() {
        g = null;
      }, y)), Ci(this), N.start());
    }
  }
  function Y(O, ...W) {
    if (this.__zooming) {
      var I = E(this, W).event(O), k = O.changedTouches, N = k.length, _, $, M, A;
      for (qt(O), _ = 0; _ < N; ++_)
        $ = k[_], M = gt($, this), I.touch0 && I.touch0[2] === $.identifier ? I.touch0[0] = M : I.touch1 && I.touch1[2] === $.identifier && (I.touch1[0] = M);
      if ($ = I.that.__zoom, I.touch1) {
        var q = I.touch0[0], D = I.touch0[1], z = I.touch1[0], G = I.touch1[1], X = (X = z[0] - q[0]) * X + (X = z[1] - q[1]) * X, le = (le = G[0] - D[0]) * le + (le = G[1] - D[1]) * le;
        $ = u($, Math.sqrt(X / le)), M = [(q[0] + z[0]) / 2, (q[1] + z[1]) / 2], A = [(D[0] + G[0]) / 2, (D[1] + G[1]) / 2];
      } else if (I.touch0) M = I.touch0[0], A = I.touch0[1];
      else return;
      I.zoom("touch", i(x($, M, A), I.extent, s));
    }
  }
  function B(O, ...W) {
    if (this.__zooming) {
      var I = E(this, W).event(O), k = O.changedTouches, N = k.length, _, $;
      for (Hi(O), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, y), _ = 0; _ < N; ++_)
        $ = k[_], I.touch0 && I.touch0[2] === $.identifier ? delete I.touch0 : I.touch1 && I.touch1[2] === $.identifier && delete I.touch1;
      if (I.touch1 && !I.touch0 && (I.touch0 = I.touch1, delete I.touch1), I.touch0) I.touch0[1] = this.__zoom.invert(I.touch0[0]);
      else if (I.end(), I.taps === 2 && ($ = gt($, this), Math.hypot(m[0] - $[0], m[1] - $[1]) < h)) {
        var M = Ge(this).on("dblclick.zoom");
        M && M.apply(this, arguments);
      }
    }
  }
  return l.wheelDelta = function(O) {
    return arguments.length ? (n = typeof O == "function" ? O : ci(+O), l) : n;
  }, l.filter = function(O) {
    return arguments.length ? (e = typeof O == "function" ? O : ci(!!O), l) : e;
  }, l.touchable = function(O) {
    return arguments.length ? (o = typeof O == "function" ? O : ci(!!O), l) : o;
  }, l.extent = function(O) {
    return arguments.length ? (t = typeof O == "function" ? O : ci([[+O[0][0], +O[0][1]], [+O[1][0], +O[1][1]]]), l) : t;
  }, l.scaleExtent = function(O) {
    return arguments.length ? (a[0] = +O[0], a[1] = +O[1], l) : [a[0], a[1]];
  }, l.translateExtent = function(O) {
    return arguments.length ? (s[0][0] = +O[0][0], s[1][0] = +O[1][0], s[0][1] = +O[0][1], s[1][1] = +O[1][1], l) : [[s[0][0], s[0][1]], [s[1][0], s[1][1]]];
  }, l.constrain = function(O) {
    return arguments.length ? (i = O, l) : i;
  }, l.duration = function(O) {
    return arguments.length ? (d = +O, l) : d;
  }, l.interpolate = function(O) {
    return arguments.length ? (r = O, l) : r;
  }, l.on = function() {
    var O = c.on.apply(c, arguments);
    return O === c ? l : O;
  }, l.clickDistance = function(O) {
    return arguments.length ? (b = (O = +O) * O, l) : Math.sqrt(b);
  }, l.tapDistance = function(O) {
    return arguments.length ? (h = +O, l) : h;
  }, l;
}
function Zn(e, t, i) {
  const n = t - e.x, o = i - e.y, a = e.w / 2, s = e.h / 2;
  if (n === 0 && o === 0) return { x: e.x, y: e.y };
  const d = 1 / Math.max(Math.abs(n) / a, Math.abs(o) / s);
  return { x: e.x + n * d, y: e.y + o * d };
}
function eo(e, t, i) {
  let n = Zn(e, t.x, t.y), o = Zn(t, e.x, e.y);
  if (i !== 0) {
    const a = Math.hypot(o.x - n.x, o.y - n.y) || 1, s = -(o.y - n.y) / a * i, d = (o.x - n.x) / a * i;
    n = { x: n.x + s, y: n.y + d }, o = { x: o.x + s, y: o.y + d };
  }
  return [n, o];
}
function da(e, t, i = 0) {
  const n = t.x - e.x, o = t.y - e.y, a = 0.5;
  if (Math.abs(n) <= a || Math.abs(o) <= a) return eo(e, t, i);
  const s = n > 0 ? t.x - t.w / 2 - (e.x + e.w / 2) : e.x - e.w / 2 - (t.x + t.w / 2), d = o > 0 ? t.y - t.h / 2 - (e.y + e.h / 2) : e.y - e.h / 2 - (t.y + t.h / 2), r = Math.abs(n) >= Math.abs(o), c = () => {
    const m = { x: e.x + Math.sign(n) * e.w / 2, y: e.y + i }, f = { x: t.x - Math.sign(n) * t.w / 2, y: t.y + i }, y = (m.x + f.x) / 2 + i;
    return [m, { x: y, y: m.y }, { x: y, y: f.y }, f];
  }, g = () => {
    const m = { x: e.x + i, y: e.y + Math.sign(o) * e.h / 2 }, f = { x: t.x + i, y: t.y - Math.sign(o) * t.h / 2 }, y = (m.y + f.y) / 2 + i;
    return [m, { x: m.x, y }, { x: f.x, y }, f];
  };
  return s >= 0 && (r || d < 0) ? c() : d >= 0 ? g() : s >= 0 ? c() : eo(e, t, i);
}
function yc(e, t, i) {
  const n = i.x - i.w / 2, o = i.x + i.w / 2, a = i.y - i.h / 2, s = i.y + i.h / 2;
  let d = 0, r = 1;
  const c = t.x - e.x, g = t.y - e.y;
  for (const [m, f] of [
    [-c, e.x - n],
    [c, o - e.x],
    [-g, e.y - a],
    [g, s - e.y]
  ]) {
    if (m === 0) {
      if (f < 0) return !1;
      continue;
    }
    const y = f / m;
    if (m < 0) {
      if (y > r) return !1;
      y > d && (d = y);
    } else {
      if (y < d) return !1;
      y < r && (r = y);
    }
  }
  return r - d > 0.02;
}
function bc(e, t, i = 28) {
  const n = new Map(e.nodes.map((f) => [f.id, f])), o = (f) => {
    var v;
    const y = /* @__PURE__ */ new Set();
    for (let b = f; b; b = (v = n.get(b)) == null ? void 0 : v.parentId) y.add(b);
    return y;
  }, a = e.nodes.filter((f) => f.kind !== "area"), s = (f) => f.parentId ? Math.min(i, 6) : i, d = /* @__PURE__ */ new Map(), r = (f, y, v) => {
    let b = 0;
    for (let h = 0; h < f.length - 1; h++)
      for (const l of a) {
        if (y.has(l.id)) continue;
        const u = v ?? s(l);
        yc(f[h], f[h + 1], { x: l.x, y: l.y, w: l.w + 2 * u, h: l.h + 2 * u }) && b++;
      }
    return b;
  }, c = (f) => {
    let y = 0;
    for (let v = 0; v < f.length - 1; v++) y += Math.hypot(f[v + 1].x - f[v].x, f[v + 1].y - f[v].y);
    return y;
  }, g = (f) => ({ x: f.x, y: f.y, w: f.w, h: f.h }), m = (f, y, v) => {
    const b = y - f.x, h = v - f.y, l = f.w / 2, u = f.h / 2;
    if (Math.abs(b) >= Math.abs(h) && Math.abs(h) <= u) return { x: f.x + Math.sign(b) * l, y: v };
    if (Math.abs(h) >= Math.abs(b) && Math.abs(b) <= l) return { x: y, y: f.y + Math.sign(h) * u };
    if (b === 0 && h === 0) return { x: f.x, y: f.y };
    const x = 1 / Math.max(Math.abs(b) / l, Math.abs(h) / u);
    return { x: f.x + b * x, y: f.y + h * x };
  };
  for (const f of e.edges) {
    const y = n.get(f.sourceId), v = n.get(f.targetId);
    if (!y || !v) continue;
    const b = /* @__PURE__ */ new Set([...o(y.id), ...o(v.id)]), h = { x: y.x, y: y.y }, l = { x: v.x, y: v.y }, u = t[f.id];
    let x;
    if (u) {
      if (u.length === 0) continue;
      const B = [
        m(y, u[0].x, u[0].y),
        ...u,
        m(v, u[u.length - 1].x, u[u.length - 1].y)
      ];
      if (x = r(B, b, 2), x === 0) continue;
    } else if (x = r(da(g(y), g(v)), b), x === 0) continue;
    const S = [[{ x: l.x, y: h.y }], [{ x: h.x, y: l.y }]];
    for (const B of [0.5, 0.38, 0.62, 0.26, 0.74]) {
      const O = h.x + (l.x - h.x) * B, W = h.y + (l.y - h.y) * B;
      S.push([{ x: O, y: h.y }, { x: O, y: l.y }]), S.push([{ x: h.x, y: W }, { x: l.x, y: W }]);
    }
    const T = Math.min(h.x, l.x), E = Math.max(h.x, l.x), R = Math.min(h.y, l.y), j = Math.max(h.y, l.y);
    for (const B of a) {
      if (b.has(B.id)) continue;
      const O = s(B) + 8;
      B.x > T - B.w && B.x < E + B.w && (S.push([{ x: h.x, y: B.y - B.h / 2 - O }, { x: l.x, y: B.y - B.h / 2 - O }]), S.push([{ x: h.x, y: B.y + B.h / 2 + O }, { x: l.x, y: B.y + B.h / 2 + O }])), B.y > R - B.h && B.y < j + B.h && (S.push([{ x: B.x - B.w / 2 - O, y: h.y }, { x: B.x - B.w / 2 - O, y: l.y }]), S.push([{ x: B.x + B.w / 2 + O, y: h.y }, { x: B.x + B.w / 2 + O, y: l.y }]));
    }
    const V = 14;
    let se = null, C = 1 / 0, Y = 1 / 0;
    for (const B of S) {
      const O = [h, ...B, l], W = r(O, b), I = m(y, B[0].x, B[0].y), k = m(v, B[B.length - 1].x, B[B.length - 1].y), N = Math.hypot(B[0].x - I.x, B[0].y - I.y), _ = Math.hypot(B[B.length - 1].x - k.x, B[B.length - 1].y - k.y), $ = (N < V ? 1 : 0) + (_ < V ? 1 : 0), M = W * 1e6 + $ * 3e3 + c(O) + B.length * 40;
      M < Y && (se = B, Y = M, C = W);
    }
    se && C < x && d.set(f.id, se.map((B) => ({ x: Math.round(B.x), y: Math.round(B.y) })));
  }
  return d;
}
const la = 12;
function ct(e, t = la) {
  return Math.round(e / t) * t;
}
function to(e) {
  return {
    xs: [e.x - e.w / 2, e.x, e.x + e.w / 2],
    ys: [e.y - e.h / 2, e.y, e.y + e.h / 2]
  };
}
function vc(e, t, i) {
  const n = (i == null ? void 0 : i.grid) ?? la, o = (i == null ? void 0 : i.threshold) ?? 4;
  if ((i == null ? void 0 : i.enabled) === !1) return { x: e.x, y: e.y, guides: { v: [], h: [] } };
  const a = to(e);
  let s = null, d = null;
  for (const r of t) {
    const c = to(r);
    for (const g of c.xs)
      for (const m of a.xs) {
        const f = g - m;
        Math.abs(f) <= o && (!s || Math.abs(f) < Math.abs(s.delta)) && (s = { guide: g, delta: f });
      }
    for (const g of c.ys)
      for (const m of a.ys) {
        const f = g - m;
        Math.abs(f) <= o && (!d || Math.abs(f) < Math.abs(d.delta)) && (d = { guide: g, delta: f });
      }
  }
  return {
    x: s ? e.x + s.delta : ct(e.x, n),
    y: d ? e.y + d.delta : ct(e.y, n),
    guides: { v: s ? [s.guide] : [], h: d ? [d.guide] : [] }
  };
}
var xc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, ke = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Ic(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && xc(t, i, o), o;
};
function wc(e, t, i, n) {
  const o = t.x - e.x, a = t.y - e.y, s = n.x - i.x, d = n.y - i.y, r = o * d - a * s;
  if (Math.abs(r) < 1e-9) return null;
  const c = ((i.x - e.x) * d - (i.y - e.y) * s) / r, g = ((i.x - e.x) * a - (i.y - e.y) * o) / r;
  return c <= 0.02 || c >= 0.98 || g <= 0.02 || g >= 0.98 ? null : { x: e.x + c * o, y: e.y + c * a, t: c };
}
function kc(e, t, i) {
  const n = i.x - t.x, o = i.y - t.y, a = n * n + o * o || 1, s = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * o) / a)), d = t.x + s * n, r = t.y + s * o;
  return { dist: Math.hypot(e.x - d, e.y - r), t: s };
}
function $c(e) {
  let t = 0;
  for (let n = 0; n < e.length - 1; n++) t += Math.hypot(e[n + 1].x - e[n].x, e[n + 1].y - e[n].y);
  let i = t / 2;
  for (let n = 0; n < e.length - 1; n++) {
    const o = Math.hypot(e[n + 1].x - e[n].x, e[n + 1].y - e[n].y);
    if (o >= i && o > 0) {
      const a = i / o;
      return { x: e[n].x + (e[n + 1].x - e[n].x) * a, y: e[n].y + (e[n + 1].y - e[n].y) * a };
    }
    i -= o;
  }
  return e[Math.floor(e.length / 2)];
}
function _c(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let o = 0; o < e.length - 1; o++) {
    const a = e[o], s = e[o + 1], d = Math.hypot(s.x - a.x, s.y - a.y) || 1, r = (s.x - a.x) / d, c = (s.y - a.y) / d, g = t.map(([f, y]) => wc(a, s, f, y)).filter((f) => f !== null).filter((f) => f.t * d > i + 2 && (1 - f.t) * d > i + 2).sort((f, y) => f.t - y.t);
    let m = -1 / 0;
    for (const f of g)
      f.t * d - i <= m + 2 || (n += ` L ${f.x - r * i} ${f.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${f.x + r * i} ${f.y + c * i}`, m = f.t * d + i);
    n += ` L ${s.x} ${s.y}`;
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
    this._zoomBehavior = gc().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
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
      this.selectedIds.filter((x) => this.scene.nodes.some((S) => S.id === x))
    );
    this.scene.nodes.some((x) => x.id === this.selectedId) && n.add(this.selectedId);
    const o = this.scene.edges.find((x) => x.id === this.selectedId) ?? null, a = n.size > 0 || o !== null, s = a ? this.scene.nodes.filter(
      (x) => n.has(x.id) || o !== null && (x.id === o.sourceId || x.id === o.targetId)
    ) : this.scene.nodes;
    if (!s.length) return;
    const d = this.fitInsets.left ?? 0, r = this.fitInsets.right ?? 0, c = this.fitInsets.top ?? 0, g = this.fitInsets.bottom ?? 0, m = Math.max(80, i.width - d - r), f = Math.max(80, i.height - c - g);
    let y = Math.min(...s.map((x) => x.x - x.w / 2)) - e, v = Math.max(...s.map((x) => x.x + x.w / 2)) + e, b = Math.min(...s.map((x) => x.y - x.h / 2)) - e, h = Math.max(...s.map((x) => x.y + x.h / 2)) + e;
    if (a)
      for (const x of this.scene.edges) {
        if (!(x.id === (o == null ? void 0 : o.id) || n.has(x.sourceId) && n.has(x.targetId))) continue;
        const T = this.edgePolyline(x);
        if (T)
          for (const E of T)
            y = Math.min(y, E.x - e), v = Math.max(v, E.x + e), b = Math.min(b, E.y - e), h = Math.max(h, E.y + e);
      }
    const l = Math.max(0.15, Math.min(m / (v - y), f / (h - b), 1.25)), u = Yt.translate(
      d + m / 2 - l * (y + v) / 2,
      c + f / 2 - l * (b + h) / 2
    ).scale(l);
    Ge(t).call(this._zoomBehavior.transform, u);
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
    for (let a = e.parentId; a; a = (n = this.scene.nodes.find((s) => s.id === a)) == null ? void 0 : n.parentId) {
      const s = this.scene.nodes.find((r) => r.id === a);
      if (!s) break;
      if (this._dragPos && this._dragPos.id === a)
        return { x: e.x + (this._dragPos.x - s.x), y: e.y + (this._dragPos.y - s.y) };
      const d = (o = this._dragGroup) == null ? void 0 : o.get(a);
      if (d)
        return { x: e.x + (d.x - s.x), y: e.y + (d.y - s.y) };
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
        const o = this.nodePos(n), a = o.x - n.w / 2 + 10 + e.w / 2, s = o.x + n.w / 2 - 10 - e.w / 2, d = o.y - n.h / 2 + 34 + e.h / 2, r = o.y + n.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, a), s), i = Math.min(Math.max(i, d), r);
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
    for (const a of i) {
      const s = (o = a.closest) == null ? void 0 : o.call(a, "[data-node-id]");
      if (s) return s.getAttribute("data-node-id");
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
    let o = null, a = 1 / 0;
    for (const s of this.scene.nodes) {
      if (s.kind === "area") continue;
      const d = this.nodePos(s), r = Math.max(Math.abs(n.x - d.x) - (s.w ?? 0) / 2, 0), c = Math.max(Math.abs(n.y - d.y) - (s.h ?? 0) / 2, 0), g = Math.hypot(r, c);
      g < a && (a = g, o = s.id);
    }
    return o && a * this._t.k <= i ? o : null;
  }
  /** Topmost edge at a client-space point — note threads can land on relations. */
  edgeIdAtClient(e, t) {
    var n, o;
    const i = ((n = this.shadowRoot) == null ? void 0 : n.elementsFromPoint(e, t)) ?? [];
    for (const a of i) {
      const s = (o = a.closest) == null ? void 0 : o.call(a, "[data-edge-id]");
      if (s) return s.getAttribute("data-edge-id");
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
    const a = new Set(this.selectedIds), s = a.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (h) => a.has(h.id) && !(h.parentId && a.has(h.parentId))
    ) : t.kind === "area" ? this.areaCargo(t) : null, d = s ? new Map(s.map((h) => [h.id, this.nodePos(h)])) : null, r = (h) => (h.shiftKey || h.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !s || h.shiftKey && t.kind === "external-system" && !s, c = s ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, g = c !== null, m = c === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], f = () => {
      const h = [], l = c === "menu" ? this.scene.nodes.filter((u) => u.kind === "ui-app") : this.scene.nodes.filter((u) => u.id === (t.ownerId ?? t.parentId));
      for (const u of l) {
        const x = this.scene.nodes.filter((R) => (R.ownerId ?? R.parentId) === u.id && m.includes(R.kind ?? "") && R.id !== t.id).sort((R, j) => R.y - j.y), S = u.x - u.w / 2 + 10, T = u.x + u.w / 2 - 10;
        for (const R of x) h.push({ x1: S, x2: T, y: R.y - R.h / 2 - 3, appId: u.id, beforeId: R.id });
        const E = x[x.length - 1];
        h.push({
          x1: S,
          x2: T,
          y: E ? E.y + E.h / 2 + 3 : u.y - u.h / 2 + 34 + 8,
          appId: u.id,
          beforeId: null
        });
      }
      return h;
    }, y = (h) => {
      const l = this.nodeIdAt(h), u = l && l !== t.id ? this.scene.nodes.find((x) => x.id === l) : void 0;
      return u ? u.kind === "external-system" ? u.id : u.parentId ?? null : null;
    }, v = (h) => {
      if ((h.buttons & 1) === 0) {
        b(h);
        return;
      }
      const l = this.toScene(h), u = l.x - i.x, x = l.y - i.y;
      if (!(!o && Math.hypot(u, x) < 3 / this._t.k))
        if (o = !0, s && d) {
          const S = /* @__PURE__ */ new Map();
          for (const T of s) {
            const E = d.get(T.id), R = this.clampToParent(T, E.x + u, E.y + x);
            S.set(T.id, { x: R.x, y: R.y });
          }
          if (!h.altKey) {
            const T = S.get(t.id), E = { x: ct(T.x) - T.x, y: ct(T.y) - T.y };
            if (E.x !== 0 || E.y !== 0)
              for (const R of S.values())
                R.x += E.x, R.y += E.y;
          }
          this._dragGroup = S;
        } else if (g) {
          this._dragPos = { id: t.id, x: n.x + u, y: n.y + x }, this._menuSlots || (this._menuSlots = { slots: f(), active: null, nestRowId: null });
          const S = this.scene.nodes.filter(
            (E) => m.includes(E.kind ?? "") && E.id !== t.id && Math.abs(l.x - E.x) <= E.w / 2 + 8
          ), T = c === "menu" ? S.find((E) => Math.abs(l.y - E.y) < E.h * 0.28) : void 0;
          if (T)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: T.id }, this._hoverNodeId = T.id;
          else {
            let E = -1, R = 14;
            this._menuSlots.slots.forEach((j, V) => {
              if (l.x < j.x1 - 24 || l.x > j.x2 + 24) return;
              const se = Math.abs(l.y - j.y);
              se < R && (R = se, E = V);
            }), this._menuSlots = { ...this._menuSlots, active: E >= 0 ? E : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else if (r(h))
          this._dragPos = { id: t.id, x: n.x + u, y: n.y + x }, this._hoverNodeId = y(h), this._guides = null;
        else {
          const S = this.clampToParent(t, n.x + u, n.y + x);
          if (h.altKey)
            this._dragPos = { id: t.id, x: S.x, y: S.y }, this._guides = null;
          else {
            const T = this.scene.nodes.filter((R) => {
              var j;
              if (R.id === t.id) return !1;
              for (let V = R.parentId; V; V = (j = this.scene.nodes.find((se) => se.id === V)) == null ? void 0 : j.parentId)
                if (V === t.id) return !1;
              return !0;
            }), E = vc({ ...S, w: t.w, h: t.h }, T, {
              threshold: 5 / this._t.k
            });
            this._dragPos = { id: t.id, x: E.x, y: E.y }, this._guides = E.guides.v.length || E.guides.h.length ? E.guides : null;
          }
          this._hoverNodeId = null;
        }
    }, b = (h) => {
      if (window.removeEventListener("pointermove", v), window.removeEventListener("pointerup", b), this._guides = null, o && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([l, u]) => ({ id: l, x: u.x, y: u.y }))
        });
      else if (o && this._dragPos && g) {
        const l = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const u = c === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (l != null && l.nestRowId)
          this.emit(u, { id: t.id, nestRowId: l.nestRowId });
        else if (l && l.active !== null) {
          const x = l.slots[l.active];
          this.emit(u, { id: t.id, appId: x.appId, beforeId: x.beforeId });
        }
        return;
      } else if (o && this._dragPos) {
        if (t.kind === "value-object" || t.kind === "entity") {
          const l = this.nodeIdAt(h), u = l && l !== t.id ? this.scene.nodes.find((S) => S.id === l) : null, x = u ? this.scene.edges.some(
            (S) => S.kind === "containment" && S.sourceId === u.id && S.targetId === t.id
          ) : !1;
          if ((u == null ? void 0 : u.kind) === "aggregate" && !x) {
            this.emit("connect-requested", {
              sourceId: t.id,
              targetId: u.id,
              x: h.clientX,
              y: h.clientY
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
        }
        if (r(h)) {
          const l = y(h);
          if (h.ctrlKey && t.kind === "api") {
            l && l !== (t.parentId ?? null) && this.emit("node-proxy-requested", {
              id: t.id,
              targetId: l,
              x: this._dragPos.x,
              y: this._dragPos.y
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
          if (l !== (t.parentId ?? null)) {
            this.emit("node-reparent-requested", {
              id: t.id,
              targetId: l,
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
    const o = t.kind === "area", a = t.container && !t.parentId, s = o ? 30 : a ? 160 : 90, d = o ? 20 : a ? 90 : 30, r = { x: t.x, y: t.y, w: t.w, h: t.h }, c = a ? this.scene.nodes.filter((l) => l.parentId === t.id) : [], g = Math.min(...c.map((l) => l.x - l.w / 2)), m = Math.max(...c.map((l) => l.x + l.w / 2)), f = Math.min(...c.map((l) => l.y - l.h / 2)), y = Math.max(...c.map((l) => l.y + l.h / 2)), v = qa(
      c.map((l) => ({ dx: l.x - r.x, dy: l.y - r.y, w: l.w, h: l.h })),
      { w: s, h: d }
    ), b = (l) => {
      if ((l.buttons & 1) === 0) {
        h();
        return;
      }
      const u = this.toScene(l);
      if (l.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: l.altKey ? Math.max(v.w, 2 * Math.abs(u.x - r.x)) : Math.max(v.w, ct(2 * Math.abs(u.x - r.x))),
          h: l.altKey ? Math.max(v.h, 2 * Math.abs(u.y - r.y)) : Math.max(v.h, ct(2 * Math.abs(u.y - r.y)))
        };
        return;
      }
      const x = l.altKey ? u : { x: ct(u.x), y: ct(u.y) }, S = r.x - i * r.w / 2, T = r.y - n * r.h / 2, E = i > 0 ? Math.max(x.x, S + s, c.length ? m + 10 : -1 / 0) : Math.min(x.x, S - s, c.length ? g - 10 : 1 / 0), R = n > 0 ? Math.max(x.y, T + d, c.length ? y + 10 : -1 / 0) : Math.min(x.y, T - d, c.length ? f - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (S + E) / 2,
        y: (T + R) / 2,
        w: Math.abs(E - S),
        h: Math.abs(R - T)
      };
    }, h = () => {
      window.removeEventListener("pointermove", b), window.removeEventListener("pointerup", h), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", b), window.addEventListener("pointerup", h);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const n = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: n.x, y: n.y };
    const o = (s) => {
      if ((s.buttons & 1) === 0) {
        window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const d = this.toScene(s);
      this._pendingLink = { sourceId: t.id, x: d.x, y: d.y }, this._hoverNodeId = this.nodeIdAt(s);
    }, a = (s) => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a);
      const d = this.nodeIdAt(s);
      if (d && d !== t.id)
        this.emit("connect-requested", {
          sourceId: t.id,
          targetId: d,
          x: s.clientX,
          y: s.clientY,
          connectKind: i
        });
      else if (t.kind === "note") {
        const r = this.edgeIdAtClient(s.clientX, s.clientY);
        r && !r.startsWith("note:") && this.emit("connect-requested", {
          sourceId: t.id,
          targetId: `edge:${r}`,
          x: s.clientX,
          y: s.clientY,
          connectKind: i
        });
      }
      this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: o } = this.nodePos(e), a = t - n, s = i - o, d = e.w / 2, r = e.h / 2;
    if (a === 0 && s === 0) return { x: n, y: o };
    const c = 1 / Math.max(Math.abs(a) / d, Math.abs(s) / r);
    return { x: n + a * c, y: o + s * c };
  }
  /**
   * Border exit for a routed edge: when the first/last waypoint sits beside the
   * node (its perpendicular coordinate falls within the node's span), leave the
   * facing side aligned to it, so the end segment is horizontal/vertical — this
   * is what keeps ELK's and the auto-router's orthogonal routes orthogonal right
   * up to the box. Otherwise fall back to the plain centre-ray border point.
   */
  orthoBorderPoint(e, t, i) {
    const { x: n, y: o } = this.nodePos(e), a = t - n, s = i - o, d = e.w / 2, r = e.h / 2;
    return Math.abs(a) >= Math.abs(s) && Math.abs(s) <= r ? { x: n + Math.sign(a) * d, y: i } : Math.abs(s) >= Math.abs(a) && Math.abs(a) <= d ? { x: t, y: o + Math.sign(s) * r } : this.borderPoint(e, t, i);
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
    const t = this.scene.nodes.find((g) => g.id === e.sourceId);
    if (e.targetId.startsWith("edgeanchor:")) {
      if (!t) return null;
      const g = e.targetId.slice(11), m = this.scene.edges.find((v) => v.id === g), f = m && m.id !== e.id ? this.edgePolyline(m) : null;
      if (!f || f.length < 2) return null;
      const y = $c(f);
      return [this.borderPoint(t, y.x, y.y), y];
    }
    const i = this.scene.nodes.find((g) => g.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], o = this.nodePos(t), a = this.nodePos(i);
    if (!n.length)
      return da(
        { x: o.x, y: o.y, w: t.w, h: t.h },
        { x: a.x, y: a.y, w: i.w, h: i.h },
        this.edgeOffset(e)
      );
    const s = n[0], d = n[n.length - 1], r = this.orthoBorderPoint(t, s.x, s.y), c = this.orthoBorderPoint(i, d.x, d.y);
    return [r, ...n, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    const n = t[i];
    let o = !1;
    const a = (d) => {
      if (!this._wpDrag) return;
      const r = this.toScene(d);
      if (!o && Math.hypot(r.x - n.x, r.y - n.y) < 4 / this._t.k) return;
      o = !0;
      const c = [...this._wpDrag.points];
      c[this._wpDrag.index] = r, this._wpDrag = { ...this._wpDrag, points: c };
    }, s = () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", s), this._wpDrag && o && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", s);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: o } = kc(t, e[n], e[n + 1]);
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
    let a = !1;
    const s = (r) => {
      if ((r.buttons & 1) === 0) {
        d();
        return;
      }
      const c = this.toScene(r);
      if (a) {
        if (this._wpDrag) {
          const g = [...this._wpDrag.points];
          g[o] = c, this._wpDrag = { ...this._wpDrag, points: g };
        }
      } else {
        if (Math.hypot(c.x - n.x, c.y - n.y) < 4 / this._t.k) return;
        a = !0, this.focus();
        const g = [...this.edgePoints[t.id] ?? []];
        g.splice(o, 0, c), this._selectedWaypoint = { edgeId: t.id, index: o }, this._wpDrag = { edgeId: t.id, points: g, index: o };
      }
    }, d = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", d), a && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", d);
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
    const n = this.edgeColor(e), o = this.selectedId === e.id, a = o || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), s = Math.floor((t.length - 1) / 2), d = {
      x: (t[s].x + t[s + 1].x) / 2,
      y: (t[s].y + t[s + 1].y) / 2
    }, r = t.slice(1, -1), c = this.spotlighting && !this._focusEdges.has(e.id);
    return J`
      <g data-edge-ink=${e.id} pointer-events="none" opacity=${e.dim ? 0.18 : c ? 0.1 : e.faint ? 0.4 : 1}>
        <path d=${_c(t, i)}
              fill="none"
              stroke=${n} stroke-width=${a ? 3 : 1.6}
              stroke-dasharray=${e.dashArray ?? (e.dashed ? "6 4" : "")}
              opacity="0.92"
              marker-start=${e.markerStart ? `url(#${e.markerStart}-${this.markerId(n)})` : e.kind === "contains" ? `url(#diamond-${this.markerId(n)})` : ""}
              marker-end=${e.markerEnd ? `url(#${e.markerEnd}-${this.markerId(n)})` : e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? J`<text x=${d.x} y=${d.y - 6} text-anchor="middle"
                  style="cursor: pointer" pointer-events="all"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${n}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(g) => {
      g.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
                  @dblclick=${(g) => {
      g.stopPropagation(), this.emit("element-activated", {
        elementType: "edge",
        id: e.id,
        kind: e.kind,
        x: g.clientX,
        y: g.clientY
      });
    }}>
                  ${e.label}
                </text>` : ""}
        ${o ? r.map((g, m) => {
      var y;
      const f = ((y = this._selectedWaypoint) == null ? void 0 : y.edgeId) === e.id && this._selectedWaypoint.index === m;
      return J`
                <circle data-waypoint cx=${g.x} cy=${g.y} r=${f ? 6 : 5}
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
      const a = n + o + 1 >> 1;
      this.measureLabel(`${e.slice(0, a)}…`, i) <= t ? n = a : o = a - 1;
    }
    return n > 0 ? `${e.slice(0, n)}…` : "…";
  }
  renderNode(e) {
    var v, b, h, l;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), o = this._hoverNodeId === e.id, a = this.spotlighting && !this._focusNodes.has(e.id), s = !!e.container, d = !!e.parentId, r = ((v = this._resize) == null ? void 0 : v.id) === e.id ? this._resize.w : e.w, c = ((b = this._resize) == null ? void 0 : b.id) === e.id ? this._resize.h : e.h, g = r / 2, m = c / 2, f = d && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label, y = e.derived ? `${e.tooltip ? `${e.tooltip} — ` : ""}Inferido: stub generado por el sistema (no declarado a mano)` : e.tooltip;
    return J`
      <g data-node-id=${e.id}
         opacity=${e.dim ? 0.25 : a ? 0.16 : 1}
         transform="translate(${t}, ${i})${o ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (h = this._dragGroup) != null && h.has(e.id) ? "none" : "auto"}
         @pointerenter=${() => this.setFocusNode(e.id)}
         @pointerleave=${() => this.setFocusNode(null)}
         @pointerdown=${(u) => this.onNodePointerDown(u, e)}
         @dblclick=${(u) => {
      u.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? J`<rect x=${-g - 4} y=${-m - 4} width=${r + 8} height=${c + 8}
                  rx=${d ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-g} y=${-m} width=${r} height=${c} rx=${d ? 6 : 10}
              style=${"fill: " + (e.fill ?? (e.kind === "note" ? "var(--modux-note-fill, #fef9c3)" : "var(--modux-node-fill, #ffffff)")) + "; stroke: " + (o || n ? "var(--modux-primary, #2563eb)" : e.stroke ?? "var(--modux-node-stroke, #94a3b8)")}
              stroke-width=${n || o ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${y ? J`<title>${y}</title>` : ""}
        </rect>
        ${e.derived ? J`<text x=${-g + 5} y=${-m + 13} font-size="10" style="fill: var(--modux-derive, #a855f7)"
                  pointer-events="none">✦</text>` : ""}
        ${e.badge ? J`<text x=${-g} y=${-m - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  style="fill: var(--modux-text-dim, #64748b)" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? J`<g transform="translate(${g - 13}, ${-m + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(u) => {
      u.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(u) => u.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" style="fill: var(--modux-text-dim, #475569)"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && Tt[e.symbol] && (!d || s) ? J`<g transform="translate(${g - (e.collapsible ? 37 : 17)}, ${-m + 5})" fill="none"
                  style=${"stroke: " + (e.stroke ?? "var(--modux-node-stroke, #64748b)")}
                  stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Tt[e.symbol]}
              </g>` : ""}
        ${d && !s && e.symbol && Tt[e.symbol] ? J`<g transform="translate(${-g + 8}, -6)" fill="none"
                  style=${"stroke: " + (e.stroke ?? "var(--modux-node-stroke, #64748b)")}
                  stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Tt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? J`
              <foreignObject x=${-g + 6} y=${s ? -m + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${s ? "left" : "center"}; border: 1px solid var(--modux-primary, #2563eb); border-radius: 4px; padding: 3px; background: var(--modux-input-bg, #ffffff); color: var(--modux-text, #334155);"
                  .value=${e.label}
                  @pointerdown=${(u) => u.stopPropagation()}
                  @keydown=${(u) => {
      u.stopPropagation(), u.key === "Enter" && this.commitRename(e, u.target.value), u.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(u) => this.commitRename(e, u.target.value)}
                />
              </foreignObject>` : d && !s ? J`<text x=${-g + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" style="fill: var(--modux-text, #1e293b)" pointer-events="none">${f}</text>` : s ? J`<text x=${-g + 12} y=${-m + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" style="fill: var(--modux-text, #1e293b)">${e.label}</text>` : e.kind === "area" ? "" : J`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" style="fill: var(--modux-text, #1e293b)">${this.fitLabel(e.label, r - 16)}</text>`}
        ${s ? J`<line x1=${-g + 8} y1=${-m + 28} x2=${g - 8} y2=${-m + 28}
                style="stroke: var(--modux-border, #e2e8f0)" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (d ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-system" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "note" || e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "boundedContext" || e.kind === "ui" || e.kind === "ui-app" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item" || // Archi style: the ex-nested kinds are free boxes now — same handles.
    e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "read-model" || e.kind === "query-service" || e.kind === "scheduled-trigger" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api-impl" || e.kind === "service") ? [
      [g, 0],
      [-g, 0],
      [0, m],
      [0, -m]
    ].map(
      ([u, x]) => J`
                <circle data-handle cx=${u} cy=${x} r="6"
                        style="fill: var(--modux-primary, #2563eb); stroke: var(--modux-surface, #ffffff)"
                        stroke-width="1.5"
                        @pointerdown=${(S) => this.onHandlePointerDown(S, e)}>
                  <title>${d ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "note" ? "Arrastra hasta cualquier elemento o relación: la nota quedará atada con un hilo" : e.kind === "service" ? "Arrastra hasta un módulo (o su contexto) para desplegarlo en este servicio" : e.kind === "boundedContext" ? "Arrastra hasta otro contexto (elige el patrón DDD), un IdP (identidad) o cualquier elemento (relación ArchiMate)" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${n && this.connectable && ((l = e.extraHandles) != null && l.length) ? e.extraHandles.map(
      (u, x) => J`
                <g transform="translate(${-g + 24 + x * 20}, ${-m})">
                  <circle data-handle r="7" style=${"fill: " + u.color + "; stroke: var(--modux-surface, #ffffff)"}
                          stroke-width="1.5"
                          @pointerdown=${(S) => this.onHandlePointerDown(S, e, u.kind)}>
                    <title>${u.title}</title>
                  </circle>
                  <circle r="2.4" style="fill: var(--modux-surface, #ffffff)" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${(s || e.resizable) && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([u, x]) => J`
                <rect data-resize x=${u * g - 6.5} y=${x * m - 6.5} width="13" height="13" rx="2.5"
                      style="fill: var(--modux-primary, #2563eb); stroke: var(--modux-surface, #ffffff)"
                      stroke-width="1.5"
                      style="cursor: ${u * x > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(S) => this.onResizePointerDown(S, e, u, x)}>
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
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", n), this._rubber = null;
    }, o = (s) => {
      if ((s.buttons & 1) === 0) {
        n();
        return;
      }
      const d = this.toScene(s);
      !i && Math.hypot(d.x - t.x, d.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: d });
    }, a = () => {
      if (window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", a), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a: s, b: d } = this._rubber, r = Math.min(s.x, d.x), c = Math.max(s.x, d.x), g = Math.min(s.y, d.y), m = Math.max(s.y, d.y), f = this.scene.nodes.filter((y) => {
          const v = this.nodePos(y);
          return v.x >= r && v.x <= c && v.y >= g && v.y <= m;
        }).map((y) => y.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", a), window.addEventListener("pointercancel", n);
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
    const i = Math.min(...t.map((s) => s.x - s.w / 2)) - e, n = Math.max(...t.map((s) => s.x + s.w / 2)) + e, o = Math.min(...t.map((s) => s.y - s.h / 2)) - e, a = Math.max(...t.map((s) => s.y + s.h / 2)) + e;
    return { minX: i, minY: o, w: n - i, h: a - o };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), o = this._t.k, a = Yt.translate(n.width / 2 - o * e, n.height / 2 - o * t).scale(o);
    Ge(i).call(this._zoomBehavior.transform, a);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), o = t.minX + (e.clientX - n.left) / i, a = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(o, a);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return w``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), o = this.getBoundingClientRect(), a = (0 - this._t.x) / this._t.k, s = (0 - this._t.y) / this._t.k, d = o.width / this._t.k, r = o.height / this._t.k;
    return w`
      <div
        class="minimap"
        title="Minimapa — click o arrastra para navegar"
        @pointerdown=${(c) => {
      c.stopPropagation();
      try {
        c.currentTarget.setPointerCapture(c.pointerId);
      } catch {
      }
      this.onMinimapPointer(c, e, n);
    }}
        @pointermove=${(c) => {
      var g, m;
      (m = (g = c.currentTarget).hasPointerCapture) != null && m.call(g, c.pointerId) && this.onMinimapPointer(c, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((c) => {
      const g = this.nodePos(c);
      return J`<rect
              x=${(g.x - c.w / 2 - e.minX) * n}
              y=${(g.y - c.h / 2 - e.minY) * n}
              width=${Math.max(2, c.w * n)}
              height=${Math.max(2, c.h * n)}
              rx="1" style=${"fill: " + (c.fill ?? "var(--modux-border, #e2e8f0)") + "; stroke: var(--modux-node-stroke, #94a3b8)"}
              stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(a - e.minX) * n}
            y=${(s - e.minY) * n}
            width=${d * n}
            height=${r * n}
            style="fill: var(--modux-primary-soft, rgba(37, 99, 235, 0.08)); stroke: var(--modux-primary, #2563eb)"
            stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((o) => this.edgeColor(o)))], t = [], i = [], n = [];
    return this.scene.edges.forEach((o) => {
      const a = this.edgePolyline(o);
      if (a) {
        i.push(this.renderEdgeHit(o, a)), n.push(this.renderEdgeInk(o, a, [...t]));
        for (let s = 0; s < a.length - 1; s++) t.push([a[s], a[s + 1]]);
      }
    }), w`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(o) => {
      const a = o.target;
      a.closest("[data-node-id]") || a.closest("[data-edge-id]") || this._spaceDown || o.button !== 0 || (o.buttons & 1) !== 0 && this.startRubberBand(o);
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
      (o, a) => J`
                    <line x1=${o.x1} y1=${o.y} x2=${o.x2} y2=${o.y}
                          stroke=${a === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${a === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${a === this._menuSlots.active ? J`<circle cx=${o.x1} cy=${o.y} r="3.5" fill="#0284c7"></circle>
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
const ca = nt`
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
function Cc(e, t, i = /* @__PURE__ */ new Set(), n = !1) {
  var C, Y, B, O, W;
  const o = { nodes: /* @__PURE__ */ new Map(), edges: [] }, a = new Map(e.boundedContexts.map((I) => [I.id, I.name])), s = e.boundedContexts.flatMap(
    (I) => (I.useCases ?? []).map((k) => ({ ...k, boundedContextId: I.id }))
  ), d = new Set(s.map((I) => I.id)), r = e.aggregates ?? [], c = new Set(
    e.boundedContexts.flatMap((I) => (I.domainServices ?? []).map((k) => k.id))
  ), g = e.boundedContexts.flatMap(
    (I) => (I.domainEvents ?? []).map((k) => ({ ...k, boundedContextId: I.id, application: !1 }))
  ), m = e.boundedContexts.flatMap(
    (I) => (I.applicationEvents ?? []).map((k) => ({ ...k, boundedContextId: I.id, application: !0 }))
  ), f = e.boundedContexts.flatMap(
    (I) => (I.readModels ?? []).map((k) => ({ ...k, boundedContextId: I.id }))
  );
  for (const I of s)
    Oe(o, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: ae.command.w,
      h: ae.command.h,
      kind: "use-case",
      symbol: I.policy ? "flow" : "gear",
      fill: I.policy ? ae.policy.fill : ae.command.fill,
      stroke: I.policy ? ae.policy.stroke : ae.command.stroke,
      badge: I.policy ? "POLICY" : "COMANDO",
      tooltip: I.policy ? `${I.name} — policy de ${a.get(I.boundedContextId) ?? I.boundedContextId} (reacción, no caso de negocio)` : `${I.name} — caso de uso de ${a.get(I.boundedContextId) ?? I.boundedContextId}`
    });
  for (const I of s) {
    const k = I.steps ?? [];
    if (!k.length) continue;
    const N = o.nodes.get(I.id), _ = n || i.has(I.id);
    N && (N.collapsible = !0, N.collapsed = !_), _ && k.forEach(($, M) => {
      Oe(o, {
        id: $.id,
        label: `${M + 1}. ${$.name || $.type || "paso"}`,
        x: 0,
        y: 0,
        w: ae.command.w,
        h: 30,
        kind: "use-case-step",
        symbol: "gear",
        fill: "#eff6ff",
        stroke: "#1d4ed8",
        dashed: !!$.customCodeId,
        ownerId: I.id,
        tooltip: `Paso de ${I.name}${$.customCodeId ? " — delega en código a mano" : ""} — arrastra su asa hasta un CODE para delegar en él`
      }), me(o, {
        id: `esstep:${M === 0 ? I.id : k[M - 1].id}->${$.id}`,
        sourceId: M === 0 ? I.id : k[M - 1].id,
        targetId: $.id,
        kind: "es-step",
        color: "#94a3b8",
        dashed: !0,
        arrow: !0,
        tooltip: `pipeline de ${I.name}`
      });
    });
  }
  for (const I of e.customCodes ?? [])
    Oe(o, {
      id: I.id,
      label: I.name,
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
      tooltip: `${I.name} — código a mano: los pasos Custom delegan en él`
    });
  for (const I of s)
    for (const k of I.steps ?? []) {
      if (!k.customCodeId) continue;
      const N = !o.nodes.has(k.id), _ = N ? I.id : k.id;
      N && o.edges.some(($) => $.kind === "es-custom" && $.sourceId === _ && $.targetId === k.customCodeId) || me(o, {
        id: `escc:${k.id}`,
        sourceId: _,
        targetId: k.customCodeId,
        kind: "es-custom",
        color: "#0f172a",
        dashed: !0,
        arrow: !0,
        tooltip: N ? `Un paso plegado de ${I.name} delega en este código — expande el comando para verlo` : "El paso delega en código a mano — Supr lo desconecta"
      });
    }
  for (const I of r)
    Oe(o, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: ae.aggregate.w,
      h: ae.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: ae.aggregate.fill,
      stroke: ae.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${I.name} — agregado de ${a.get(I.boundedContextId) ?? I.boundedContextId}`
    });
  const y = /* @__PURE__ */ new Map();
  for (const I of [...g, ...m])
    Oe(o, {
      id: I.id,
      label: I.name,
      x: 0,
      y: 0,
      w: ae.event.w,
      h: ae.event.h,
      kind: I.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: ae.event.fill,
      stroke: ae.event.stroke,
      badge: I.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${I.name} — evento de ${a.get(I.boundedContextId) ?? I.boundedContextId}`
    }), y.set(At(I.name), I.id);
  const v = (I) => {
    if (!I || !I.trim()) return null;
    const k = y.get(At(I));
    if (k) return k;
    const N = `evname:${At(I)}`;
    return Oe(o, {
      id: N,
      label: I,
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
      tooltip: `${I} — referenciado por nombre, sin evento declarado en el catálogo`
    }), N;
  }, b = (I) => {
    const k = f.find((_) => _.id === I.id) ?? f.find((_) => I.name && At(_.name) === At(I.name)), N = (k == null ? void 0 : k.id) ?? (I.id || (I.name ? `rm:${At(I.name)}` : null));
    return N ? (Oe(o, {
      id: N,
      label: (k == null ? void 0 : k.name) ?? I.name ?? N,
      x: 0,
      y: 0,
      w: ae.readModel.w,
      h: ae.readModel.h,
      kind: k ? "read-model" : "derived-read-model",
      fill: ae.readModel.fill,
      stroke: ae.readModel.stroke,
      dashed: !k,
      badge: "READ MODEL"
    }), N) : null;
  };
  for (const I of e.actorUses ?? []) {
    if (!d.has(I.targetId)) continue;
    const k = (e.actors ?? []).find((N) => N.id === I.actorId);
    k && (Oe(o, {
      id: k.id,
      label: k.name,
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
      id: `es-actor:${k.id}->${I.targetId}`,
      sourceId: k.id,
      targetId: I.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const I of e.aiAgents ?? []) {
    const k = (e.agentUses ?? []).filter((A) => A.agentId === I.id), N = (e.agentExternalUses ?? []).filter((A) => A.agentId === I.id), _ = (e.agentRags ?? []).filter((A) => A.agentId === I.id), $ = (e.agentMcpUses ?? []).filter((A) => A.agentId === I.id), M = (e.agentGatewayUses ?? []).some((A) => A.agentId === I.id) || (e.agentApiOpUses ?? []).some((A) => A.agentId === I.id) || (e.agentQueryUses ?? []).some((A) => A.agentId === I.id) || (e.agentDelegations ?? []).some((A) => A.agentId === I.id) || (e.agentTriggers ?? []).some((A) => A.agentId === I.id);
    if (!(!k.length && !N.length && !_.length && !$.length && !M)) {
      Oe(o, {
        id: I.id,
        label: I.name,
        x: 0,
        y: 0,
        w: ae.actor.w,
        h: ae.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${I.name} — agente de IA (consume por MCP)`
      });
      for (const A of k)
        d.has(A.useCaseId) && me(o, {
          id: `es-agent:${I.id}->${A.useCaseId}`,
          sourceId: I.id,
          targetId: A.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const A of N) {
        const q = e.externalSystems.find(
          (z) => (z.useCases ?? []).some((G) => G.id === A.externalUseCaseId)
        );
        if (!q) continue;
        const D = (C = (q.useCases ?? []).find((z) => z.id === A.externalUseCaseId)) == null ? void 0 : C.name;
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
          id: `es-agentx:${I.id}->${A.externalUseCaseId}`,
          sourceId: I.id,
          targetId: q.id,
          kind: "es-agent-external",
          label: D,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: D ? `Llama a ${D} del sistema externo` : void 0
        });
      }
      for (const A of $) {
        const q = e.externalSystems.find(
          (z) => (z.mcpServers ?? []).some((G) => G.id === A.mcpServerId)
        );
        if (!q) continue;
        const D = (Y = (q.mcpServers ?? []).find((z) => z.id === A.mcpServerId)) == null ? void 0 : Y.name;
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
          id: `es-agentmcp:${I.id}->${A.mcpServerId}`,
          sourceId: I.id,
          targetId: q.id,
          kind: "es-agent-mcp",
          label: D,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: D ? `Consume las herramientas del servidor MCP ${D}` : void 0
        });
      }
      for (const A of _) {
        const q = (e.rags ?? []).find((D) => D.id === A.ragId);
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
            id: `es-agrag:${I.id}->${q.id}`,
            sourceId: I.id,
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
  const h = (I) => {
    const k = e.externalSystems.find((N) => N.id === I);
    return k ? (Oe(o, {
      id: k.id,
      label: k.name,
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
    }), k.id) : null;
  };
  for (const I of e.externalCalls ?? []) {
    const k = h(I.externalSystemId);
    !k || !d.has(I.useCaseId) || me(o, {
      id: `es-extin:${k}->${I.useCaseId}`,
      sourceId: k,
      targetId: I.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const I of e.externalUseCaseCalls ?? []) {
    if (!d.has(I.sourceId)) continue;
    const k = e.externalSystems.find(
      ($) => ($.useCases ?? []).some((M) => M.id === I.targetId)
    ), N = k ? h(k.id) : null;
    if (!N) continue;
    const _ = (B = ((k == null ? void 0 : k.useCases) ?? []).find(($) => $.id === I.targetId)) == null ? void 0 : B.name;
    me(o, {
      id: `es-extout:${I.sourceId}->${I.targetId}`,
      sourceId: I.sourceId,
      targetId: N,
      kind: "es-command-external",
      label: _,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: _ ? `Llama a ${_} del sistema externo` : void 0
    });
  }
  for (const I of e.aggregateCalls ?? [])
    !d.has(I.sourceId) || !o.nodes.has(I.targetId) || me(o, {
      id: `es-write:${I.sourceId}->${I.targetId}`,
      sourceId: I.sourceId,
      targetId: I.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const l = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const I of l)
    !o.nodes.has(I.domainEventId) || !(o.nodes.has(I.sourceId) && (d.has(I.sourceId) || r.some((N) => N.id === I.sourceId) || c.has(I.sourceId))) || me(o, {
      id: `es-emit:${I.sourceId}->${I.domainEventId}`,
      sourceId: I.sourceId,
      targetId: I.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const u = (I, k, N, _, $, M) => (Oe(o, {
    id: I,
    label: k,
    x: 0,
    y: 0,
    w: ae.policy.w,
    h: ae.policy.h,
    kind: N,
    symbol: "flow",
    fill: ae.policy.fill,
    stroke: ae.policy.stroke,
    badge: _,
    tooltip: $
  }), I), x = (I, k) => {
    const N = v(I);
    N && me(o, {
      id: `es-trigger:${N}->${k}`,
      sourceId: N,
      targetId: k,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, S = (I, k) => {
    !k || !d.has(k) || me(o, {
      id: `es-invoke:${I}->${k}`,
      sourceId: I,
      targetId: k,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const I of e.subscriptions ?? []) {
    const k = u(
      I.id,
      I.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${I.name}${I.eventName ? ` — reacciona a ${I.eventName}` : ""}${I.consumerGroup ? ` · grupo ${I.consumerGroup}` : ""}`
    );
    x(I.eventName, k);
    for (const N of I.actions ?? []) {
      if (N.type === "CallUseCase" && S(k, N.useCaseId), N.type === "StartSaga" && N.sagaId) {
        const _ = `saga:${N.sagaId}`;
        u(_, N.sagaId, "saga", "SAGA"), me(o, {
          id: `es-saga:${k}->${_}`,
          sourceId: k,
          targetId: _,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (N.type === "UpdateProjection" && N.projectionId) {
        const _ = (e.projections ?? []).find(($) => $.id === N.projectionId);
        _ && me(o, {
          id: `es-feeds:${k}->${_.id}`,
          sourceId: k,
          targetId: _.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const I of e.projections ?? []) {
    const k = u(
      I.id,
      I.name,
      "projection",
      "PROYECCIÓN",
      `${I.name}${I.readModelName ? ` — materializa ${I.readModelName}` : ""}`
    );
    for (const $ of I.handledEventIds) {
      const M = o.nodes.has($) ? $ : null;
      M && me(o, {
        id: `es-trigger:${M}->${k}`,
        sourceId: M,
        targetId: k,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    I.sourceAggregateId && o.nodes.has(I.sourceAggregateId) && me(o, {
      id: `es-state:${I.id}`,
      sourceId: I.sourceAggregateId,
      targetId: k,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const N = I.sourceExternalUseCaseId ?? I.sourceExternalTableId;
    if (N) {
      const $ = e.externalSystems.find(
        (A) => (A.useCases ?? []).some((q) => q.id === N) || (A.tables ?? []).some((q) => q.id === N)
      ), M = $ ? h($.id) : null;
      if (M) {
        const A = ((O = ($.useCases ?? []).find((q) => q.id === N)) == null ? void 0 : O.name) ?? ((W = ($.tables ?? []).find((q) => q.id === N)) == null ? void 0 : W.name);
        me(o, {
          id: `es-poll:${I.id}`,
          sourceId: M,
          targetId: k,
          kind: "es-projects-poll",
          label: A,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: A ? `polling de ${A}` : "polling"
        });
      }
    }
    const _ = b({ id: I.readModelId, name: I.readModelName });
    _ && me(o, {
      id: `es-projects:${k}->${_}`,
      sourceId: k,
      targetId: _,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const I of e.flows) {
    if (I.archetype === "MATERIALIZES") {
      const N = v(I.triggerEvent), _ = b({ name: I.readModelName ?? `${I.triggerEvent}View` });
      N && _ && me(o, {
        id: `es-mat:${I.id}`,
        sourceId: N,
        targetId: _,
        kind: "es-materializes",
        label: I.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${I.name} [MATERIALIZES]`
      });
      continue;
    }
    const k = u(
      `flow:${I.id}`,
      I.name,
      "flow",
      `POLICY · ${I.archetype}`,
      `Flow ${I.name} [${I.archetype}]`
    );
    if (x(I.triggerEvent, k), S(k, I.targetUseCaseId), !I.targetUseCaseId) {
      const N = h(I.targetId), _ = N ?? `tgt:${I.targetId}`;
      !N && a.has(I.targetId) && Oe(o, {
        id: _,
        label: a.get(I.targetId) ?? I.targetId,
        x: 0,
        y: 0,
        w: ae.boundedContext.w,
        h: ae.boundedContext.h,
        kind: "boundedContext",
        symbol: "component",
        fill: ae.boundedContext.fill,
        stroke: ae.boundedContext.stroke,
        badge: "CONTEXTO"
      }), o.nodes.has(_) && me(o, {
        id: `es-deliver:${I.id}`,
        sourceId: k,
        targetId: _,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const I of e.processes ?? []) {
    const k = u(
      I.id,
      I.name,
      "process",
      `PROCESO${I.sla ? ` · SLA ${I.sla}` : ""}`,
      `${I.name}${I.triggerEvent ? ` — arranca con ${I.triggerEvent}` : ""}`
    );
    x(I.triggerEvent, k);
    for (const _ of I.steps) S(k, _.useCaseId);
    const N = v(I.onCompletionEventName);
    N && me(o, {
      id: `es-done:${I.id}`,
      sourceId: k,
      targetId: N,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const I of e.workflows ?? []) {
    const k = u(
      I.id,
      I.name,
      "workflow",
      "WORKFLOW",
      `${I.name}${I.triggerEvent ? ` — arranca con ${I.triggerEvent}` : ""}`
    );
    x(I.triggerEvent, k);
    for (const _ of I.steps ?? []) {
      S(k, _.targetUseCaseId);
      for (const $ of [_.emittedEventName, _.completionEventName]) {
        const M = v($);
        M && me(o, {
          id: `es-wfemit:${I.id}:${M}`,
          sourceId: k,
          targetId: M,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const N = v(I.onCompletionEventName);
    N && me(o, {
      id: `es-done:${I.id}`,
      sourceId: k,
      targetId: N,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const T = [...o.nodes.values()], E = /* @__PURE__ */ new Map();
  for (const I of o.edges)
    E.has(I.targetId) || E.set(I.targetId, []), E.get(I.targetId).push(I.sourceId);
  const R = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Set(), V = (I) => {
    const k = R.get(I);
    if (k !== void 0) return k;
    if (j.has(I)) return 0;
    j.add(I);
    const N = E.get(I) ?? [], _ = N.length ? 1 + Math.max(...N.map(V)) : 0;
    return j.delete(I), R.set(I, _), _;
  }, se = /* @__PURE__ */ new Map();
  for (const I of T) {
    const k = t[I.id];
    if (k) {
      I.x = k.x, I.y = k.y;
      continue;
    }
    const N = V(I.id), _ = se.get(N) ?? 0;
    se.set(N, _ + 1), I.x = 140 + N * 260, I.y = 110 + _ * 110;
  }
  return { nodes: T, edges: o.edges };
}
const Ec = 190, Sc = 56, io = 180, Ac = 56, Mc = 150, Pc = 44, no = 250, oo = 100;
function Tc(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (o) => {
    if (i.has(o.id)) return 0;
    i.add(o.id);
    const a = (o.dependsOnStepIds ?? []).map((d) => t.get(d)).filter(Boolean), s = a.length ? 1 + Math.max(...a.map(n)) : 0;
    return i.delete(o.id), s;
  };
  return n(e);
}
function Oc(e, t) {
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
function Rc(e, t, i = /* @__PURE__ */ new Set(), n = !1) {
  var b;
  const o = [], a = [], s = /* @__PURE__ */ new Set(), d = (h) => {
    var l;
    return (l = e.boundedContexts.flatMap((u) => u.useCases ?? []).find((u) => u.id === h)) == null ? void 0 : l.name;
  };
  let r = 140;
  (e.workflows ?? []).forEach((h) => {
    var se;
    const l = new Map(h.steps.map((C) => [C.id, C])), u = new Map(h.steps.map((C) => [C.id, Tc(C, l)])), x = /* @__PURE__ */ new Map();
    for (const C of h.steps) {
      const Y = u.get(C.id) ?? 0;
      x.set(Y, (x.get(Y) ?? 0) + 1);
    }
    const S = Math.max(1, ...x.values()), T = Oc(e, h);
    if (T && !s.has(T.id)) {
      s.add(T.id);
      const C = t[T.id] ?? { x: 140, y: r };
      o.push({
        id: T.id,
        label: T.label,
        x: C.x,
        y: C.y,
        w: Mc,
        h: Pc,
        kind: T.kind,
        symbol: T.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: T.kind === "aggregate" ? "AGGREGATE" : T.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const E = t[h.id] ?? { x: 420, y: r }, R = n || i.has(h.id);
    o.push({
      id: h.id,
      label: h.name,
      x: E.x,
      y: E.y,
      w: Ec,
      h: Sc,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      collapsible: h.steps.length > 0,
      collapsed: h.steps.length > 0 && !R,
      tooltip: `${h.name}${h.triggerEvent ? ` — arranca con ${h.triggerEvent}` : ""}${h.onCompletionEventName ? ` · emite ${h.onCompletionEventName} al completar` : ""}`
    }), T && a.push({
      id: `wft:${h.id}`,
      sourceId: T.id,
      targetId: h.id,
      kind: "workflow-trigger",
      label: h.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: h.triggerEvent ? `Evento: ${h.triggerEvent}` : void 0
    });
    const j = /* @__PURE__ */ new Map();
    let V = 0;
    for (const C of R ? h.steps : []) {
      const Y = u.get(C.id) ?? 0;
      V = Math.max(V, Y);
      const B = j.get(Y) ?? 0;
      j.set(Y, B + 1);
      const O = t[C.id] ?? {
        x: E.x + (Y + 1) * no,
        y: r + (B - (x.get(Y) - 1) / 2) * oo
      }, W = d(C.targetUseCaseId);
      o.push({
        ownerId: h.id,
        id: C.id,
        label: C.name,
        x: O.x,
        y: O.y,
        w: C.type === "JOIN" || C.type === "SPLIT" ? 100 : io,
        h: C.type === "JOIN" || C.type === "SPLIT" ? 48 : Ac,
        kind: "workflow-step",
        symbol: C.type === "JOIN" || C.type === "SPLIT" ? "flow" : C.roleId ? "actor" : "event",
        fill: C.type === "JOIN" || C.type === "SPLIT" ? "#f5f3ff" : C.roleId ? "#fef9c3" : "#ffffff",
        stroke: C.roleId && C.type !== "JOIN" && C.type !== "SPLIT" ? "#ca8a04" : "#6d28d9",
        dashed: C.type === "JOIN" || C.type === "SPLIT",
        badge: C.type === "JOIN" ? "⨝ JOIN" : C.type === "SPLIT" ? "⑃ SPLIT" : C.roleId ? `👤 ${C.roleId}${C.formPageId ? " · 📋" : ""}${C.deadline ? ` · ${C.deadline}` : ""}` : W ? `→ ${W}` : "∅ sin use case",
        tooltip: C.type === "JOIN" ? `${C.name} — espera a TODAS sus dependencias antes de seguir` : C.type === "SPLIT" ? `${C.name} — abre ramas paralelas: los pasos que dependan de él arrancan a la vez` : `${C.name}${C.roleId ? ` · tarea HUMANA de ${C.roleId}${C.deadline ? ` (plazo ${C.deadline})` : ""}` : ""}${C.emittedEventName ? ` · emite ${C.emittedEventName}` : ""}${W ? ` · lanza ${W}` : ""}${C.completionEventName ? ` · espera ${C.completionEventName}` : ""}${C.compensationUseCaseId ? " · ⎌ compensable" : ""}`
      });
      const I = (C.dependsOnStepIds ?? []).filter((k) => l.has(k));
      I.length === 0 && a.push({
        id: `wfs:${h.id}:${C.id}`,
        sourceId: h.id,
        targetId: C.id,
        kind: "workflow-start",
        label: C.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const k of I)
        a.push({
          id: `wfdep:${k}->${C.id}`,
          sourceId: k,
          targetId: C.id,
          kind: "workflow-dependency",
          label: C.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${C.name} espera a ${((se = l.get(k)) == null ? void 0 : se.name) ?? k}`
        });
    }
    if (h.onCompletionEventName) {
      const C = `done:${h.id}`, Y = t[C] ?? { x: E.x + (V + 2) * no, y: r };
      o.push({
        id: C,
        label: h.onCompletionEventName,
        x: Y.x,
        y: Y.y,
        w: io,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const B = new Set(h.steps.flatMap((W) => W.dependsOnStepIds ?? [])), O = h.steps.filter((W) => !B.has(W.id));
      for (const W of O.length ? O : [])
        a.push({
          id: `wfd:${h.id}:${W.id}`,
          sourceId: W.id,
          targetId: C,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      h.steps.length || a.push({
        id: `wfd:${h.id}`,
        sourceId: h.id,
        targetId: C,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, S + 1) * oo + 60;
  });
  const c = new Set(o.map((h) => h.id));
  (e.workflowGateways ?? []).forEach((h, l) => {
    const u = t[h.id] ?? { x: 200 + l % 5 * 220, y: 60 };
    o.push({
      id: h.id,
      label: h.name,
      x: u.x,
      y: u.y,
      w: 100,
      h: 48,
      kind: "workflow-gateway",
      symbol: "flow",
      fill: "#f5f3ff",
      stroke: "#6d28d9",
      dashed: !0,
      badge: h.type === "SPLIT" ? h.semantics === "EXCLUSIVE" ? "⑃ EXCLUSIVO" : "⑃ PARALELO" : h.semantics === "ANY" ? "⨝ CUALQUIERA" : "⨝ TODAS",
      tooltip: h.type === "SPLIT" ? `${h.name} — split ${h.semantics === "EXCLUSIVE" ? "exclusivo: elige UNA rama" : "paralelo: abre TODAS las ramas"}; doble click cambia la semántica` : `${h.name} — join que ${h.semantics === "ANY" ? "arranca con CUALQUIER entrada" : "espera a TODAS sus entradas"}; doble click cambia la semántica`
    }), c.add(h.id);
  });
  for (const h of e.workflowGateways ?? []) {
    for (const u of h.sourceIds ?? [])
      c.has(u) && a.push({
        id: `wflink:${u}->${h.id}`,
        sourceId: u,
        targetId: h.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const l = h.type === "SPLIT" && h.semantics === "EXCLUSIVE";
    for (const u of h.targetIds ?? []) {
      if (!c.has(u)) continue;
      const x = l ? (b = (h.branchConditions ?? []).find((S) => S.targetId === u)) == null ? void 0 : b.expression : void 0;
      a.push({
        id: `wflink:${h.id}->${u}`,
        sourceId: h.id,
        targetId: u,
        kind: "wf-link",
        color: "#6d28d9",
        dashed: l && !x,
        arrow: !0,
        label: x ?? (l ? "¿condición?" : void 0),
        tooltip: l ? `${x ? `Rama si: ${x}` : "Rama sin condición aún"} — doble click la edita; Supr desconecta` : "el gateway fluye aquí — Supr lo desconecta"
      });
    }
  }
  (e.workflows ?? []).flatMap((l) => (l.steps ?? []).filter((u) => u.roleId && c.has(u.id))).forEach((l, u) => {
    const x = (e.actors ?? []).find((T) => T.id === l.roleId), S = l.roleId;
    if (!c.has(S)) {
      const T = o.find((R) => R.id === l.id), E = t[S] ?? {
        x: T ? T.x - 90 : 120 + u * 200,
        y: T ? T.y - 120 : 40
      };
      o.push({
        id: S,
        label: (x == null ? void 0 : x.name) ?? S,
        x: E.x,
        y: E.y,
        w: 130,
        h: 44,
        kind: "actor",
        symbol: "person",
        fill: "#fef9c3",
        stroke: "#ca8a04",
        badge: "ROL",
        tooltip: `${(x == null ? void 0 : x.name) ?? S} — su lista de tareas recibe los pasos humanos conectados`
      }), c.add(S);
    }
    a.push({
      id: `wfrole:${l.id}->${S}`,
      sourceId: S,
      targetId: l.id,
      kind: "wf-role",
      color: "#ca8a04",
      dashed: !0,
      arrow: !0,
      tooltip: "la tarea cae en la lista de este rol — Supr la vuelve automática"
    });
  }), (e.workflows ?? []).flatMap((l) => (l.steps ?? []).filter((u) => u.formPageId && c.has(u.id))).forEach((l, u) => {
    const x = (e.pages ?? []).find((S) => S.id === l.formPageId);
    if (x) {
      if (!c.has(x.id)) {
        const S = o.find((E) => E.id === l.id), T = t[x.id] ?? {
          x: S ? S.x : 200 + u * 220,
          y: S ? S.y + 130 : 60
        };
        o.push({
          id: x.id,
          label: x.name,
          x: T.x,
          y: T.y,
          w: 160,
          h: 48,
          kind: "page",
          symbol: "page",
          fill: "#fff7ed",
          stroke: "#ca8a04",
          badge: "📋 FORMULARIO",
          tooltip: `${x.name} — el forms engine la presenta como formulario de la tarea`
        }), c.add(x.id);
      }
      a.push({
        id: `wfform:${l.id}->${x.id}`,
        sourceId: l.id,
        targetId: x.id,
        kind: "wf-form",
        color: "#ca8a04",
        dashed: !0,
        arrow: !0,
        tooltip: "la tarea humana se presenta con esta página — Supr lo desconecta"
      });
    }
  });
  for (const h of e.workflows ?? [])
    for (const l of h.steps ?? [])
      !l.handoffWorkflowId || !c.has(l.handoffWorkflowId) || !c.has(l.id) || a.push({
        id: `wflink:${l.id}->${l.handoffWorkflowId}`,
        sourceId: l.id,
        targetId: l.handoffWorkflowId,
        kind: "wf-link",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "el paso entrega a OTRO workflow — Supr lo desconecta"
      });
  const g = /* @__PURE__ */ new Map();
  for (const h of e.workflows ?? [])
    for (const l of h.steps) g.set(l.id, h.id);
  const m = new Set(o.map((h) => h.id)), f = (h) => {
    if (m.has(h)) return h;
    const l = g.get(h);
    return l && m.has(l) ? l : null;
  }, y = /* @__PURE__ */ new Set(), v = [];
  for (const h of a) {
    const l = f(h.sourceId), u = f(h.targetId);
    if (!l || !u || l === u) continue;
    if (l === h.sourceId && u === h.targetId) {
      v.push(h);
      continue;
    }
    const x = `${h.kind}|${l}|${u}`;
    y.has(x) || (y.add(x), v.push({
      ...h,
      sourceId: l,
      targetId: u,
      tooltip: `${h.tooltip ?? h.kind} — de un paso plegado dentro`
    }));
  }
  return { nodes: o, edges: v };
}
const ao = 250, Le = 30, yt = 6, Nc = 16, Bt = 190, Dc = 60, Lc = 170, pi = 44;
function Uc(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function Ce(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function zc(e) {
  const t = [], i = (n, o, a) => {
    for (const s of n ?? []) {
      const d = [...o, s.label];
      t.push({ entry: s, path: d, depth: a }), i(s.children ?? [], d, a + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function qc(e, t, i = /* @__PURE__ */ new Set(), n = !1) {
  var R, j, V, se;
  const o = [], a = [], s = e.uiApps ?? [], d = e.pages ?? [], r = (C) => {
    var Y;
    return ((Y = e.boundedContexts.flatMap((B) => B.useCases ?? []).find((B) => B.id === C)) == null ? void 0 : Y.name) ?? C;
  }, c = (C) => {
    var Y;
    return ((Y = e.boundedContexts.flatMap((B) => B.queryServices ?? []).find((B) => B.id === C)) == null ? void 0 : Y.name) ?? C;
  }, g = /* @__PURE__ */ new Map();
  let m = 160;
  for (const C of s) {
    const Y = zc(C), B = n || i.has(C.id), O = 90, W = B ? Y.length * (Le + yt) : 0, I = t[C.id] ?? { x: 190, y: m + O / 2 };
    m = I.y + O / 2 + W + 70;
    const k = C.type ?? "APP";
    o.push({
      id: C.id,
      label: C.title || C.name,
      x: I.x,
      y: I.y,
      w: ao,
      h: O,
      kind: "ui-app",
      symbol: k === "ORCHESTRATOR" || k === "VIEW_EDITOR" ? "process" : "component",
      fill: k === "ORCHESTRATOR" || k === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: k === "ORCHESTRATOR" || k === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      collapsible: Y.length > 0,
      collapsed: Y.length > 0 && !B,
      badge: k === "ORCHESTRATOR" ? "ORQUESTADOR" : k === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : k === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: k === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : k === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : k === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: k === "ORCHESTRATOR" ? `${C.name} — orquesta y mantiene estado; solo enseña páginas hijas` : k === "MASTER_DETAIL" ? `${C.name} — cabecera + pestañas (ambas son páginas)` : `App: ${C.name}`
    }), C.modelId && (g.set(C.modelId, {
      label: ((R = (e.models ?? []).find(($) => $.id === C.modelId)) == null ? void 0 : R.name) ?? C.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), a.push({
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
    for (const [$, M, A, q, D] of [
      [C.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [C.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      $ && a.push({
        id: `${M === "app-view" ? "appview" : "appedit"}:${C.id}->${$}`,
        sourceId: C.id,
        targetId: $,
        kind: M,
        color: q,
        label: A,
        arrow: !0,
        tooltip: D
      });
    const N = C.homePageId ?? C.homeAppId;
    N && a.push({
      id: `apphome:${C.id}->${N}`,
      sourceId: C.id,
      targetId: N,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      markerStart: "ball",
      markerEnd: "arrow",
      tooltip: C.homeAppId ? "la app con la que abre (assignment)" : "la página con la que abre la app (assignment)"
    }), k === "MASTER_DETAIL" && C.headerPageId && a.push({
      id: `appheader:${C.id}->${C.headerPageId}`,
      sourceId: C.id,
      targetId: C.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let _ = I.y + O / 2 + 10 + Le / 2;
    for (const { entry: $, path: M, depth: A } of B ? Y : []) {
      const q = Uc(C.id, $, M), D = A * Nc;
      if (o.push({
        id: q,
        label: $.label,
        x: I.x + D / 2,
        y: _,
        w: ao - 20 - D,
        h: Le,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (j = $.children) != null && j.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (V = $.children) != null && V.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        ownerId: C.id,
        tooltip: (se = $.children) != null && se.length ? "Agrupador (con submenú): no puede abrir nada" : $.pageId ? `Abre ${$.pageId}` : $.uiAdapterId ? `Abre la app ${$.uiAdapterId}` : $.useCaseId ? `Lanza ${$.useCaseId}` : $.aggregateId ? `CRUD inferido sobre ${$.aggregateId}` : $.queryOperationId ? `Listado con filtros de ${$.queryOperationId}` : "Entrada de menú sin destino"
      }), _ += Le + yt, $.uiAdapterId && s.some((z) => z.id === $.uiAdapterId) && a.push({
        id: `menuapp:${q}->${$.uiAdapterId}`,
        sourceId: q,
        targetId: $.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), $.useCaseId && e.boundedContexts.some((G) => (G.useCases ?? []).some((X) => X.id === $.useCaseId)) && (g.set($.useCaseId, {
        label: r($.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), a.push({
        id: `menuuc:${q}->${$.useCaseId}`,
        sourceId: q,
        targetId: $.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), $.aggregateId && (e.aggregates ?? []).some((z) => z.id === $.aggregateId)) {
        const z = (e.aggregates ?? []).find((G) => G.id === $.aggregateId);
        g.set(z.id, { label: z.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), a.push({
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
      if ($.queryOperationId) {
        const z = e.boundedContexts.flatMap((X) => X.queryServices ?? []).find((X) => X.id === $.queryServiceId), G = ((z == null ? void 0 : z.operations) ?? []).find((X) => X.id === $.queryOperationId);
        z && G && (g.set(G.id, {
          label: `${G.name} (${z.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), a.push({
          id: `menuqop:${q}->${G.id}`,
          sourceId: q,
          targetId: G.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      $.pageId && d.some((z) => z.id === $.pageId) && a.push({
        id: `menupage:${q}->${$.pageId}`,
        sourceId: q,
        targetId: $.pageId,
        kind: "menu-page",
        color: "#64748b",
        markerStart: "ball",
        markerEnd: "arrow",
        tooltip: "la página que abre la opción (assignment)"
      });
    }
  }
  let f = 160;
  const y = (C) => {
    var Y;
    return ((Y = d.find((B) => B.id === C)) == null ? void 0 : Y.name) ?? C;
  };
  for (const C of d) {
    const Y = t[C.id] ?? { x: 640, y: f }, B = C.type === "WIZARD" ? C.wizardSteps ?? [] : [], O = n || i.has(C.id), W = Dc, I = O ? B.length * (Le + yt) : 0;
    f = Y.y + W + I + 90, o.push({
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
    let k = Y.y + W / 2 + 10 + Le / 2;
    (O ? B : []).forEach((N, _) => {
      const $ = N.id ?? N.pageId ?? String(_);
      o.push({
        id: `wizrow:${C.id}:${$}`,
        label: `${_ + 1}. ${N.label ?? (N.pageId ? y(N.pageId) : "Paso")}${N.pageId ? "" : " ⌁"}`,
        x: Y.x,
        y: k,
        w: Bt - 20,
        h: Le,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: N.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        ownerId: C.id,
        tooltip: N.pageId ? `Paso ${_ + 1}: ${y(N.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${_ + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), k += Le + yt;
    });
    for (const [N, _, $, M] of [
      [C.crudDetailPageId ?? C.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [C.crudCreatePageId ?? C.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      N && a.push({
        id: `${_ === "crud-detail" ? "cruddetail" : "crudnew"}:${C.id}->${N}`,
        sourceId: C.id,
        targetId: N,
        kind: _,
        color: M,
        label: $,
        dashed: !0,
        arrow: !0,
        tooltip: _ === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let N = 0; N < (C.wizardSteps ?? []).length; N++) {
      const _ = (C.wizardSteps ?? [])[N];
      if (!_.pageId) continue;
      const $ = _.id ?? _.pageId;
      a.push({
        id: `wizstep:${C.id}:${$}`,
        sourceId: `wizrow:${C.id}:${$}`,
        targetId: _.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${N + 1} — Supr desmapea`
      });
    }
    C.modelId && (g.set(C.modelId, {
      label: C.modelName ?? C.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), a.push({
      id: `pgmodel:${C.id}->${C.modelId}`,
      sourceId: C.id,
      targetId: C.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const N of C.buttons ?? [])
      N.useCaseId && (g.set(N.useCaseId, {
        label: r(N.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), a.push({
        id: `pgbtn:${C.id}->${N.useCaseId}`,
        sourceId: C.id,
        targetId: N.useCaseId,
        kind: "page-button",
        label: N.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: N.mappingId ? `Botón «${N.label}» — mapping ${N.mappingId}` : `Botón «${N.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    C.listingQueryServiceId && (g.set(C.listingQueryServiceId, {
      label: c(C.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), a.push({
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
  let h = 520;
  for (const C of v) {
    const Y = C.buttons ?? [], B = C.groupIds ?? [], O = Y.length + B.length, W = n || i.has(C.id), I = t[C.id] ?? { x: 1e3, y: h }, k = 70, N = W ? O * (Le + yt) : 0;
    h = I.y + k + N + 80, o.push({
      id: C.id,
      label: C.name,
      x: I.x,
      y: I.y,
      w: Bt,
      h: k,
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
    let _ = I.y + k / 2 + 10 + Le / 2;
    for (const $ of W ? Y : [])
      o.push({
        id: `gbtn:${C.id}:${$.id}`,
        label: $.label ?? $.id,
        x: I.x,
        y: _,
        w: Bt - 20,
        h: Le,
        kind: "group-button",
        symbol: "usecase",
        fill: $.useCaseId || $.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !$.useCaseId && !$.apiOperationId,
        ownerId: C.id,
        tooltip: `${$.label ?? $.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), _ += Le + yt;
    for (const $ of W ? B : [])
      o.push({
        id: `gsub:${C.id}:${$}`,
        label: `▸ ${b($)}`,
        x: I.x,
        y: _,
        w: Bt - 20,
        h: Le,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        ownerId: C.id,
        tooltip: `Subgrupo ${b($)} — Supr lo desanida (el grupo sigue existiendo)`
      }), _ += Le + yt;
  }
  for (const C of v)
    for (const Y of C.buttons ?? [])
      !Y.useCaseId || !e.boundedContexts.some((O) => (O.useCases ?? []).some((W) => W.id === Y.useCaseId)) || (g.set(Y.useCaseId, {
        label: r(Y.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), a.push({
        id: `gbtnt:${C.id}:${Y.id}`,
        sourceId: `gbtn:${C.id}:${Y.id}`,
        targetId: Y.useCaseId,
        kind: "gbtn-target",
        color: "#06b6d4",
        arrow: !0,
        tooltip: `«${Y.label ?? Y.id}» dispara este caso de uso — Supr lo desconecta`
      }));
  for (const C of d) {
    const Y = [
      ["toolbar", C.toolbarGroupIds ?? []],
      ["botonera", C.bottomBarGroupIds ?? []]
    ];
    for (const [B, O] of Y)
      for (const W of O)
        v.some((I) => I.id === W) && a.push({
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
  let l = 160;
  for (const C of e.models ?? [])
    g.has(C.id) || g.set(C.id, { label: C.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [C, Y] of g) {
    const B = t[C] ?? { x: 1050, y: l };
    l = B.y + pi + 46, o.push({
      id: C,
      label: Y.label,
      x: B.x,
      y: B.y,
      w: Lc,
      h: pi,
      kind: Y.kind,
      symbol: Y.symbol,
      fill: "#ffffff",
      stroke: Y.stroke
    });
  }
  let u = 120;
  for (const C of e.identityProviders ?? []) {
    const Y = t[C.id] ?? { x: -320, y: u };
    u = Y.y + 70 + 40, o.push({
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
  for (const C of s)
    C.identityProviderId && (e.identityProviders ?? []).some((Y) => Y.id === C.identityProviderId) && a.push({
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
  const x = (e.actorAppUses ?? []).filter(
    (C) => s.some((Y) => Y.id === C.appId) && (e.actors ?? []).some((Y) => Y.id === C.actorId)
  ), S = [...new Set(x.map((C) => C.actorId))];
  let T = 160;
  for (const C of S) {
    const Y = (e.actors ?? []).find((O) => O.id === C), B = t[C] ?? { x: -60, y: T };
    T = B.y + pi + 46, o.push({
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
  for (const C of x)
    a.push({
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
  for (const C of d)
    C.customCodeId && E.has(C.customCodeId) && a.push({
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
      E.has(Y) && a.push({
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
      o.some((W) => W.id === O) && a.push({
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
      o.some((W) => W.id === O) && a.push({
        id: `uisrv:${C.id}->${O}`,
        sourceId: C.id,
        targetId: O,
        kind: "ui-serving",
        color: "#0ea5e9",
        markerEnd: "open-arrow",
        tooltip: "la UI sirve a este actor (serving) — Supr la desconecta"
      });
  }), { nodes: o, edges: a };
}
const so = 188, ro = 34, lo = 10, ui = 24, co = 6;
function mi(e, t) {
  return `fld:${e}:${t}`;
}
function dn(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function Bc(e, t) {
  const i = [], n = [], o = e.models ?? [], a = e.modelMappings ?? [], s = (f) => {
    var y;
    return ((y = o.find((v) => v.id === f)) == null ? void 0 : y.name) ?? f ?? "?";
  };
  o.forEach((f, y) => {
    const v = t[f.id] ?? { x: 200 + y % 5 * 260, y: 160 + Math.floor(y / 5) * 220 }, b = f.fields ?? [], h = ro + (b.length ? b.length * ui + (b.length - 1) * co : 10) + lo;
    i.push({
      id: f.id,
      label: f.name,
      x: v.x,
      y: v.y,
      w: so,
      h,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${f.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), b.forEach((l, u) => {
      i.push({
        id: mi(f.id, l.id),
        label: l.name,
        x: v.x,
        y: v.y - h / 2 + ro + u * (ui + co) + ui / 2,
        w: so - 2 * lo,
        h: ui,
        kind: "model-field",
        fill: "#faf5ff",
        stroke: "#a78bfa",
        badge: l.type ?? void 0,
        parentId: f.id,
        tooltip: `${l.name}${l.type ? ` (${l.type})` : ""} — arrastra su asa hasta un campo de otro modelo para mapearlos, o hasta otro modelo para moverlo; Supr lo elimina`
      });
    });
  }), (e.transformations ?? []).forEach((f, y) => {
    const v = t[f.id] ?? { x: 200 + y % 5 * 260, y: 60 };
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
  }), (e.customCodes ?? []).forEach((f, y) => {
    const v = t[f.id] ?? { x: 120 + y % 5 * 220, y: 60 };
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
  const d = new Set(i.map((f) => f.id)), r = (f) => f.fieldId ? mi(f.modelId, f.fieldId) : f.modelId;
  for (const f of e.transformations ?? [])
    f.customCodeId && d.has(f.customCodeId) && d.has(f.id) && n.push({
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
    f.customCodeId && d.has(f.customCodeId) && f.targetModelId && d.has(f.targetModelId) && n.push({
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
      const v = r(y);
      d.has(v) && n.push({
        id: `tfin:${f.id}:${y.modelId}:${y.fieldId ?? ""}`,
        sourceId: v,
        targetId: f.id,
        kind: "transform-input",
        color: "#ea580c",
        dashed: !0,
        arrow: !0,
        tooltip: `entrada de ${f.name} — Supr la desconecta`
      });
    }
    f.output && d.has(r(f.output)) && n.push({
      id: `tfout:${f.id}`,
      sourceId: f.id,
      targetId: r(f.output),
      kind: "transform-output",
      color: "#ea580c",
      arrow: !0,
      tooltip: `salida de ${f.name} — Supr la desconecta`
    });
  }
  for (const f of a)
    if (!(!f.sourceModelId || !f.targetModelId) && !(!d.has(f.sourceModelId) || !d.has(f.targetModelId))) {
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
      for (const y of f.rules ?? []) {
        const v = mi(f.sourceModelId, y.sourceFieldId ?? ""), b = mi(f.targetModelId, y.targetFieldId ?? "");
        !d.has(v) || !d.has(b) || n.push({
          id: `maprule:${f.id}:${y.id}`,
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
  const c = new Set(
    a.filter((f) => f.sourceModelId && f.targetModelId).map((f) => `${f.sourceModelId}->${f.targetModelId}`)
  ), g = new Map(
    e.boundedContexts.flatMap((f) => (f.useCases ?? []).map((y) => [y.id, y]))
  ), m = /* @__PURE__ */ new Set();
  for (const f of e.pages ?? [])
    if (f.modelId)
      for (const y of f.buttons ?? []) {
        if (!y.useCaseId || y.mappingId) continue;
        const v = g.get(y.useCaseId);
        if (!(v != null && v.inputModelId) || v.inputModelId === f.modelId) continue;
        const b = `${f.modelId}->${v.inputModelId}`;
        c.has(b) || m.has(b) || (m.add(b), !(!d.has(f.modelId) || !d.has(v.inputModelId)) && n.push({
          id: `mapgap:${f.id}:${y.useCaseId}`,
          sourceId: f.modelId,
          targetId: v.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${y.label}» (página ${f.name}) llama a ${v.name}: falta mapear ${s(f.modelId)} → ${s(v.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: n };
}
const Yi = 560, fi = 34, hi = 14, Ki = 150, gi = 40, yi = 12, bi = 150, rt = 40, Fc = (e) => e.startsWith("SOURCE") ? 0 : e === "TRANSFORM" ? 1 : 2, Vc = {
  0: { fill: "#f0f9ff", stroke: "#0284c7", symbol: "lens" },
  1: { fill: "#f0fdfa", stroke: "#0f766e", symbol: "gear" },
  2: { fill: "#f5f3ff", stroke: "#7c3aed", symbol: "event" }
};
function Wc(e, t) {
  const i = [], n = [], o = e.etlFlows ?? [], a = new Map(e.boundedContexts.map((b) => [b.id, b.name])), s = new Map(
    e.boundedContexts.flatMap((b) => [
      ...(b.domainEvents ?? []).map((h) => [h.id, h.name]),
      ...(b.applicationEvents ?? []).map((h) => [h.id, h.name])
    ])
  );
  let d = 140;
  for (const b of o) {
    const h = b.steps ?? [], l = [[], [], []];
    h.forEach((T) => l[Fc(T.type)].push(T));
    const u = Math.max(1, ...l.map((T) => T.length)), x = fi + hi + u * (gi + yi), S = t[b.id] ?? { x: 420, y: d };
    d = S.y + x + 110, i.push({
      id: b.id,
      label: b.name,
      x: S.x,
      y: S.y,
      w: Yi,
      h: x,
      kind: "etl-flow",
      symbol: "gear",
      badge: "ETL",
      container: !0,
      fill: "#ffffff",
      stroke: "#0f766e",
      tooltip: `${b.name} — integrador${b.ownerBoundedContextId ? ` de ${a.get(b.ownerBoundedContextId) ?? b.ownerBoundedContextId}` : ""}: fuentes → transformación → escrituras; la paleta añade transformaciones`
    }), l.forEach((T, E) => {
      const R = S.x - Yi / 2 + hi + Ki / 2 + E * (Yi - 2 * hi - Ki) / 2;
      T.forEach((j, V) => {
        const se = Vc[E];
        if (i.push({
          id: j.id,
          label: j.name ?? j.id,
          x: R,
          y: S.y - x / 2 + fi + gi / 2 + V * (gi + yi),
          w: Ki,
          h: gi,
          kind: "etl-step",
          symbol: se.symbol,
          fill: se.fill,
          stroke: se.stroke,
          badge: j.type === "SOURCE_PULL" ? "PULL" : j.type === "SOURCE_CONSUMER" ? "CONSUME" : j.type === "TRANSFORM" ? "TRANSFORM" : j.type === "WRITE_API" ? "→ API" : j.type === "WRITE_DB" ? "→ BD" : "→ EVENTO",
          parentId: b.id,
          tooltip: `${j.name ?? j.id} (${j.type})${j.mappingId ? " · aplica un mapeado" : ""} — Supr lo quita del integrador`
        }), E > 0) {
          const C = l[E - 1], Y = C[Math.min(V, C.length - 1)];
          Y && n.push({
            id: `etlpipe:${b.id}:${Y.id}->${j.id}`,
            sourceId: Y.id,
            targetId: j.id,
            kind: "etl-pipe",
            color: "#0f766e",
            arrow: !0,
            tooltip: "el dato fluye por el pipeline"
          });
        }
      });
    });
  }
  const r = new Set(i.map((b) => b.id)), c = new Set(o.flatMap((b) => (b.steps ?? []).map((h) => h.externalTableId)).filter(Boolean)), g = new Set(o.flatMap((b) => (b.steps ?? []).map((h) => h.apiId)).filter(Boolean)), m = new Set(o.flatMap((b) => (b.steps ?? []).map((h) => h.eventId)).filter(Boolean));
  let f = 120;
  for (const b of e.externalSystems) {
    const h = (b.tables ?? []).filter((x) => c.has(x.id));
    if (!h.length) continue;
    const l = fi + hi + h.length * (rt + yi), u = t[b.id] ?? { x: -140, y: f };
    f = u.y + l + 90, i.push({
      id: b.id,
      label: b.name,
      x: u.x,
      y: u.y,
      w: bi + 30,
      h: l,
      kind: "external-system",
      symbol: "component",
      badge: "EXTERNAL",
      container: !0,
      fill: "#ffffff",
      stroke: "#64748b",
      dashed: !0,
      tooltip: `${b.name} — sistema externo: sus tablas legacy alimentan (o reciben) integradores`
    }), r.add(b.id), h.forEach((x, S) => {
      i.push({
        id: x.id,
        label: x.name,
        x: u.x,
        y: u.y - l / 2 + fi + rt / 2 + S * (rt + yi),
        w: bi,
        h: rt,
        kind: "external-table",
        symbol: "readmodel",
        fill: "#fefce8",
        stroke: "#a16207",
        parentId: b.id,
        tooltip: `${x.name} — tabla legacy de ${b.name}`
      }), r.add(x.id);
    });
  }
  let y = 120;
  for (const b of e.apis ?? []) {
    if (!g.has(b.id)) continue;
    const h = t[b.id] ?? { x: 1e3, y };
    y = h.y + rt + 70, i.push({
      id: b.id,
      label: b.name,
      x: h.x,
      y: h.y,
      w: bi,
      h: rt,
      kind: "api",
      symbol: "interface",
      badge: "API",
      fill: "#eef2ff",
      stroke: "#4f46e5",
      tooltip: `${b.name} — API que un integrador consume o llama`
    }), r.add(b.id);
  }
  let v = 400;
  for (const b of m) {
    const h = b, l = t[h] ?? { x: 1e3, y: v };
    v = l.y + rt + 70, i.push({
      id: h,
      label: s.get(h) ?? h,
      x: l.x,
      y: l.y,
      w: bi,
      h: rt,
      kind: "domain-event",
      symbol: "event",
      badge: "EVENTO",
      fill: "#fff7ed",
      stroke: "#f59e0b",
      tooltip: "evento que un integrador consume o publica"
    }), r.add(h);
  }
  for (const b of o)
    for (const h of b.steps ?? []) {
      const l = h.externalTableId ?? h.apiId ?? h.eventId;
      if (!l || !r.has(l) || !r.has(h.id)) continue;
      const u = h.type.startsWith("SOURCE");
      n.push({
        id: `etl:${b.id}:${h.id}`,
        sourceId: u ? l : h.id,
        targetId: u ? h.id : l,
        kind: u ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: h.type === "SOURCE_PULL" ? "pull" : h.type === "SOURCE_CONSUMER" ? "consume" : h.type === "WRITE_API" ? "api" : h.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: u ? `${b.name} lee de aquí — Supr quita el paso` : `${b.name} escribe aquí — Supr quita el paso`
      });
    }
  return { nodes: i, edges: n };
}
async function jc(e, t) {
  var c, g;
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((m) => m.e), n = new i(), o = t == null ? void 0 : t.partitions, a = {
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
  }, s = await n.layout(a), d = {};
  for (const m of s.children ?? [])
    d[m.id] = {
      x: (m.x ?? 0) + (m.width ?? 0) / 2,
      y: (m.y ?? 0) + (m.height ?? 0) / 2
    };
  const r = {};
  for (const m of s.edges ?? []) {
    const f = (g = (c = m.sections) == null ? void 0 : c[0]) == null ? void 0 : g.bendPoints;
    f && f.length && (r[m.id] = f.map((y) => ({ x: y.x, y: y.y })));
  }
  return { nodes: d, edges: r };
}
const Gc = 90, po = 40, Hc = {
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
}, Yc = 1, Kc = 9, Xc = 5;
function Qc(e, t) {
  let i = 0, n = 0;
  for (const o of t.edges)
    o.sourceId === e.id && !uo(o.targetId, t) && i++, o.targetId === e.id && !uo(o.sourceId, t) && n++;
  return i > n ? Yc : Kc;
}
function uo(e, t) {
  var i;
  return ((i = t.nodes.find((n) => n.id === e)) == null ? void 0 : i.kind) === "external-system";
}
function Jc(e, t) {
  return e.kind === "external-system" ? Qc(e, t) : Hc[e.kind] ?? Xc;
}
function Zc(e) {
  const t = [...new Set(Object.values(e).map((o) => Math.round(o.x)))].sort((o, a) => o - a), i = new Map(t.map((o, a) => [o, a])), n = {};
  for (const [o, a] of Object.entries(e)) n[o] = i.get(Math.round(a.x)) ?? 0;
  return n;
}
function ep(e) {
  const t = e.nodes.filter((m) => !m.parentId && m.kind !== "area"), i = {};
  if (!t.length) return i;
  const n = /* @__PURE__ */ new Map();
  for (const m of t) {
    const f = Jc(m, e);
    n.has(f) || n.set(f, []), n.get(f).push(m);
  }
  const o = [...n.entries()].sort((m, f) => m[0] - f[0]).map(([, m]) => m);
  for (const m of o)
    m.sort((f, y) => f.label.toLowerCase().localeCompare(y.label.toLowerCase()) || f.id.localeCompare(y.id));
  const a = /* @__PURE__ */ new Map(), s = () => {
    o.forEach(
      (m) => m.forEach((f, y) => a.set(f.id, m.length > 1 ? y / (m.length - 1) : 0.5))
    );
  }, d = (m) => {
    let f = 0, y = 0;
    for (const v of e.edges) {
      const b = v.sourceId === m.id ? v.targetId : v.targetId === m.id ? v.sourceId : null;
      b !== null && a.has(b) && (f += a.get(b), y++);
    }
    return y ? f / y : null;
  };
  for (let m = 0; m < 4; m++) {
    s();
    const f = m % 2 === 0 ? o.slice(1) : o.slice(1).reverse();
    for (const y of f)
      y.sort((v, b) => {
        const h = d(v), l = d(b);
        return h === null && l === null ? 0 : h === null ? 1 : l === null ? -1 : h - l;
      }), s();
  }
  const r = o.map(
    (m) => m.reduce((f, y) => f + y.h, 0) + po * (m.length - 1)
  ), c = Math.max(...r);
  let g = 0;
  return o.forEach((m, f) => {
    const y = Math.max(...m.map((b) => b.w));
    g += y / 2;
    let v = (c - r[f]) / 2;
    for (const b of m)
      v += b.h / 2, i[b.id] = { x: g, y: v }, v += b.h / 2 + po;
    g += y / 2 + Gc;
  }), i;
}
function tp(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.boundedContexts ?? []) {
    for (const n of i.useCases ?? []) n.derived && t.add(n.id);
    for (const n of i.queryServices ?? []) n.derived && t.add(n.id);
    for (const n of i.domainEvents ?? []) n.derived && t.add(n.id);
  }
  return t;
}
function ip(e, t) {
  return t.size ? {
    ...e,
    nodes: e.nodes.map((i) => t.has(i.id) && !i.derived ? { ...i, derived: !0 } : i)
  } : e;
}
function np(e) {
  const t = new Set(e.nodes.filter((i) => i.derived).map((i) => i.id));
  return t.size ? {
    ...e,
    nodes: e.nodes.filter((i) => !i.derived),
    edges: e.edges.filter((i) => !t.has(i.sourceId) && !t.has(i.targetId))
  } : e;
}
var op = Object.defineProperty, ap = Object.getOwnPropertyDescriptor, ze = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? ap(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && op(t, i, o), o;
};
const sp = /* @__PURE__ */ new Set([
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
      var s, d, r;
      if (e.button !== 0 && e.button !== 1) return;
      e.button === 1 && e.preventDefault(), this.focus();
      try {
        (s = this.setPointerCapture) == null || s.call(this, e.pointerId);
      } catch {
      }
      const t = e.composedPath()[0], i = (d = t == null ? void 0 : t.closest) == null ? void 0 : d.call(t, ".chev3");
      if (i != null && i.dataset.nodeId) {
        this.emit("node-collapse-toggled", { id: i.dataset.nodeId });
        return;
      }
      const n = (r = t == null ? void 0 : t.closest) == null ? void 0 : r.call(t, ".h3");
      if (n != null && n.dataset.sourceId) {
        const c = this.getBoundingClientRect();
        this._connect = {
          sourceId: n.dataset.sourceId,
          x1: e.clientX - c.left,
          y1: e.clientY - c.top,
          x2: e.clientX - c.left,
          y2: e.clientY - c.top
        }, this._drag = { mode: "connect", x: e.clientX, y: e.clientY, rx: this._rx, rz: this._rz, pan: { ...this._pan } };
        return;
      }
      const o = e.shiftKey || this._space || e.button === 1, a = o ? null : this.plateAt(e);
      if (!a && !o && !e.altKey) {
        const c = this.getBoundingClientRect();
        this._rubber = {
          x1: e.clientX - c.left,
          y1: e.clientY - c.top,
          x2: e.clientX - c.left,
          y2: e.clientY - c.top,
          additive: !1
        }, this._drag = { mode: "rubber", x: e.clientX, y: e.clientY, rx: this._rx, rz: this._rz, pan: { ...this._pan }, moved: !1 };
        return;
      }
      this._drag = {
        mode: a ? "node" : o ? "pan" : "orbit",
        x: e.clientX,
        y: e.clientY,
        rx: this._rx,
        rz: this._rz,
        pan: { ...this._pan },
        nodeId: a == null ? void 0 : a.dataset.nodeId,
        nodeKind: a == null ? void 0 : a.dataset.kind,
        moved: !1
      };
    }, this.onMove = (e) => {
      var n, o;
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, i = e.clientY - this._drag.y;
      if (this._drag.mode === "connect" && this._connect) {
        const a = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - a.left, y2: e.clientY - a.top };
        const s = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), d = (o = s == null ? void 0 : s.closest) == null ? void 0 : o.call(s, ".n3"), r = (d == null ? void 0 : d.dataset.nodeId) ?? null;
        this._hoverTargetId = r !== this._connect.sourceId ? r : null;
        return;
      }
      if (this._drag.mode === "rubber" && this._rubber) {
        Math.hypot(t, i) > 3 && (this._drag.moved = !0);
        const a = this.getBoundingClientRect();
        this._rubber = { ...this._rubber, x2: e.clientX - a.left, y2: e.clientY - a.top };
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
          const i = (t = this._connect) == null ? void 0 : t.sourceId, n = this._hoverTargetId;
          this._connect = null, this._hoverTargetId = null, i && n && n !== i && this.emit("connect-requested", { sourceId: i, targetId: n });
          return;
        }
        if (e.mode === "rubber") {
          const i = this._rubber;
          if (this._rubber = null, i && e.moved) {
            const n = this.getBoundingClientRect(), o = Math.min(i.x1, i.x2) + n.left, a = Math.max(i.x1, i.x2) + n.left, s = Math.min(i.y1, i.y2) + n.top, d = Math.max(i.y1, i.y2) + n.top, r = [];
            this.renderRoot.querySelectorAll(".n3").forEach((c) => {
              const g = c.getBoundingClientRect(), m = g.left + g.width / 2, f = g.top + g.height / 2, y = c.dataset.nodeId;
              y && m >= o && m <= a && f >= s && f <= d && r.push(y);
            }), this._selected = new Set(r);
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
      var n, o, a;
      const t = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY);
      if ((o = t == null ? void 0 : t.closest) != null && o.call(t, ".chev3")) return;
      const i = ((a = t == null ? void 0 : t.closest) == null ? void 0 : a.call(t, ".n3")) ?? this.plateAt(e);
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
    var n, o, a;
    const i = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e, t);
    return ((a = (o = i == null ? void 0 : i.closest) == null ? void 0 : o.call(i, ".n3")) == null ? void 0 : a.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), n = i.width * 0.5, o = i.height * 0.42, a = new DOMMatrix();
    a.m34 = -1 / 1600;
    const s = new DOMMatrix().translate(n, o).multiply(a).translate(-n, -o).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), d = s.transformPoint(new DOMPoint(0, 0, 0, 1)), r = s.transformPoint(new DOMPoint(1, 0, 0, 0)), c = s.transformPoint(new DOMPoint(0, 1, 0, 0)), g = e - i.left, m = t - i.top, f = r.x - g * r.w, y = c.x - g * c.w, v = r.y - m * r.w, b = c.y - m * c.w, h = g * d.w - d.x, l = m * d.w - d.y, u = f * b - y * v;
    return u ? { x: (h * b - y * l) / u, y: (f * l - h * v) / u } : { ...this._center };
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
    const i = this.scene.edges.find((d) => d.id === e.targetId.slice(11)), n = i ? t.get(i.sourceId) : void 0, o = i ? t.get(i.targetId) : void 0;
    if (!n || !o) return null;
    const a = this.depths(), s = ((a.get(n.id) ?? 0) + (a.get(o.id) ?? 0)) / 2 * 30 + 2;
    return {
      id: "",
      label: "",
      kind: "edge-anchor",
      x: (n.x + o.x) / 2,
      y: (n.y + o.y) / 2,
      w: 0,
      h: 0,
      z: s
    };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((n) => [n.id, n])), t = /* @__PURE__ */ new Map(), i = (n) => {
      const o = t.get(n.id);
      if (o !== void 0) return o;
      const a = n.ownerId ?? n.parentId, s = a ? e.get(a) : void 0, d = s ? i(s) + 1 : 0;
      return t.set(n.id, d), d;
    };
    for (const n of this.scene.nodes) i(n);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return w`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((h) => [h.id, h])), n = Math.min(...e.map((h) => h.x - h.w / 2)) - 60, o = Math.max(...e.map((h) => h.x + h.w / 2)) + 60, a = Math.min(...e.map((h) => h.y - h.h / 2)) - 60, s = Math.max(...e.map((h) => h.y + h.h / 2)) + 60, d = (n + o) / 2, r = (a + s) / 2, c = this.getBoundingClientRect(), g = c.width ? Math.min(c.width / (o - n), c.height / (s - a), 1) * 0.9 : 0.5, m = this._k * g;
    this._kUsed = m, this._center = { x: d, y: r };
    const f = 30, y = this._liveMove, v = (h) => h.x + ((y == null ? void 0 : y.id) === h.id ? y.dx : 0), b = (h) => h.y + ((y == null ? void 0 : y.id) === h.id ? y.dy : 0);
    return w`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${m}, ${m}, ${m}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-d}px, ${-r}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${n}px; top: ${a}px"
            width=${o - n}
            height=${s - a}
            viewBox="${n} ${a} ${o - n} ${s - a}"
          >
            ${this.scene.edges.map((h) => {
      const l = i.get(h.sourceId), u = i.get(h.targetId) ?? this.edgeAnchorOf(h, i);
      return !l || !u ? "" : J`<line
                x1=${v(l)} y1=${b(l)} x2=${v(u)} y2=${b(u)}
                stroke="#000000" stroke-width="2" opacity=${h.dim ? 0.05 : 0.22} />`;
    })}
          </svg>
          ${this.scene.edges.map((h) => {
      const l = i.get(h.sourceId), u = i.get(h.targetId) ?? this.edgeAnchorOf(h, i);
      if (!l || !u) return "";
      const x = (t.get(l.id) ?? 0) * f + 2, S = u.id ? (t.get(u.id) ?? 0) * f + 2 : u.z, T = v(u) - v(l), E = b(u) - b(l), R = S - x, j = Math.hypot(T, E), V = Math.hypot(j, R), se = Math.atan2(E, T) * 180 / Math.PI, C = Math.atan2(R, j) * 180 / Math.PI, Y = h.color ?? "#64748b", B = h.dashed ? `repeating-linear-gradient(90deg, ${Y} 0 6px, transparent 6px 10px)` : Y;
      return w`<div
              class="edge3"
              style="
                left: ${v(l)}px; top: ${b(l)}px; width: ${V}px; height: 1.7px;
                transform: translateZ(${x}px) rotateZ(${se}deg) rotateY(${-C}deg);
                background: ${B};
                opacity: ${h.dim ? 0.12 : 0.9};
              "
            ></div>`;
    })}
          ${e.map((h) => {
      if (h.kind === "area")
        return w`<div
                class="area3"
                title=${h.tooltip ?? ""}
                style="left: ${v(h) - h.w / 2}px; top: ${b(h) - h.h / 2}px;
                       width: ${h.w}px; height: ${h.h}px; opacity: ${h.dim ? 0.25 : 1};"
              ></div>`;
      const l = t.get(h.id) ?? 0, u = h.container || l === 0, x = this._hoverTargetId === h.id;
      return w`
              <div
                class="n3 ${h.container ? "container3" : ""} ${this.selectedId === h.id || this._selected.has(h.id) ? "selected3" : ""} ${x ? "hover3" : ""}"
                data-node-id=${h.id}
                data-kind=${h.kind}
                title=${h.tooltip ?? h.label}
                style="
                  opacity: ${h.dim ? 0.25 : 1};
                  left: ${v(h) - h.w / 2}px; top: ${b(h) - h.h / 2}px;
                  width: ${h.w}px; height: ${h.h}px;
                  transform: translateZ(${l * f + (x ? 8 : 0)}px)${x ? " scale(1.06)" : ""};
                  background: ${h.container ? "color-mix(in srgb, " + (h.fill ?? "#ffffff") + " 82%, transparent)" : h.fill ?? "#ffffff"};
                  border-color: ${h.stroke ?? "#64748b"};
                  border-style: ${h.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${u ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${h.badge ? w`<span class="badge3" style="color: ${h.stroke ?? "#94a3b8"}">${h.badge}</span>` : ""}
                <span>${h.label}</span>
                ${h.collapsible ? w`<span
                      class="chev3"
                      data-node-id=${h.id}
                      title=${h.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}
                      >${h.collapsed ? "▸" : "▾"}</span>` : ""}
              </div>
            `;
    })}
          ${(() => {
      const h = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!h || !sp.has(h.kind)) return "";
      const l = (t.get(h.id) ?? 0) * f + 4;
      return [
        [v(h) + h.w / 2, b(h)],
        [v(h) - h.w / 2, b(h)],
        [v(h), b(h) + h.h / 2],
        [v(h), b(h) - h.h / 2]
      ].map(
        ([x, S]) => w`<div
                class="h3"
                data-source-id=${h.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${x}px; top: ${S}px; transform: translateZ(${l}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? w`<svg class="rubber">
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
      ${this._rubber ? w`<div
            class="lasso"
            style="left: ${Math.min(this._rubber.x1, this._rubber.x2)}px; top: ${Math.min(
      this._rubber.y1,
      this._rubber.y2
    )}px; width: ${Math.abs(this._rubber.x2 - this._rubber.x1)}px; height: ${Math.abs(
      this._rubber.y2 - this._rubber.y1
    )}px"
          ></div>` : ""}
      ${this._renaming ? (() => {
      const h = this.renderRoot.querySelector(
        `.n3[data-node-id="${this._renaming.id}"]`
      ), l = this.getBoundingClientRect(), u = h == null ? void 0 : h.getBoundingClientRect(), x = u ? u.left + u.width / 2 - l.left : l.width / 2, S = u ? u.bottom - l.top + 6 : l.height / 2;
      return w`<input
              class="rename3"
              style="left: ${x}px; top: ${S}px"
              .value=${this._renaming.value}
              @pointerdown=${(T) => T.stopPropagation()}
              @input=${(T) => this._renaming = { ...this._renaming, value: T.target.value }}
              @keydown=${(T) => {
        if (T.stopPropagation(), T.key === "Escape" && (this._renaming = null), T.key === "Enter") {
          const E = this._renaming, R = E.value.trim();
          this._renaming = null;
          const j = this.scene.nodes.find((V) => V.id === E.id);
          R && j && R !== j.label && this.emit("node-renamed", { id: E.id, kind: E.kind, name: R });
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
var rp = Object.defineProperty, dp = Object.getOwnPropertyDescriptor, xe = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? dp(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && rp(t, i, o), o;
};
const mo = [
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
    return ["textarea", "richText", "html", "markdown"].includes(t) ? w`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? w`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? w`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? w`<div class="control">••••••••</div>` : t === "email" ? w`<div class="control">nombre@dominio.com</div>` : t === "money" ? w`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? w`<div class="control">──────●──</div>` : t === "stars" ? w`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? w`<div class="control area">🖼</div>` : t === "link" ? w`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? w`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? w`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? w`<div class="control" style="justify-content:flex-end">0</div>` : w`<div class="control">Texto…</div>`;
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
      for (const a of o ?? [])
        a.id === e && (t = a), i(a.children);
    };
    return i((n = this.page) == null ? void 0 : n.content), t;
  }
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var n;
    let t = null;
    const i = (o, a) => {
      for (const s of o ?? [])
        s.id === e && (t = a), i(s.children, s);
    };
    return i((n = this.page) == null ? void 0 : n.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var a;
    let i = !1;
    const n = (s) => {
      s.id === e && (i = !0);
      for (const d of s.children ?? []) n(d);
    }, o = (s) => {
      for (const d of s ?? [])
        d.id === t ? n(d) : o(d.children);
    };
    return o((a = this.page) == null ? void 0 : a.content), i;
  }
  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  nextSiblingOf(e) {
    var o;
    const t = this.parentOf(e), i = t ? t.children ?? [] : ((o = this.page) == null ? void 0 : o.content) ?? [], n = i.findIndex((a) => a.id === e);
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
      const a = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((a == null ? void 0 : a.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const s = (e.children ?? []).filter((r) => r.kind === "tab"), d = s.find((r) => r.id === this._activeTabs[e.id]) ?? s[0];
      d && (e = d);
    }
    if (t === "into" && !pe.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), n = t === "after" ? ((o = this.nextSiblingOf(e.id)) == null ? void 0 : o.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: n };
  }
  onCmpDrop(e, t, i) {
    var a, s;
    const n = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !n) {
      const d = (a = i == null ? void 0 : i.dataTransfer) == null ? void 0 : a.getData("application/x-modux-cmp");
      if (!d) return;
      let r;
      try {
        r = JSON.parse(d);
      } catch {
        return;
      }
      if (!r.componentId || !r.pageId || r.pageId === ((s = this.page) == null ? void 0 : s.id)) return;
      const c = this.slotFor(e, t);
      this.emitEvent("component-transferred", { fromPageId: r.pageId, componentId: r.componentId, ...c });
      return;
    }
    if (n === e.id || this.isWithin(e.id, n)) return;
    const o = this.slotFor(e, t);
    o.beforeComponentId !== n && this.emitEvent("component-moved", { componentId: n, ...o });
  }
  /** A progress-like bar, the shared stub for progressBar/meter/taskProgress. */
  barStub(e, t = "#0284c7") {
    return w`<div style="height:8px;border-radius:4px;background:#e2e8f0;overflow:hidden">
      <div style="width:${e}%;height:100%;background:${t}"></div></div>`;
  }
  /** ① — ② — ③ with the given step active: wizard headers and progressSteps. */
  stepsStub(e) {
    return w`<div class="stub-row" style="justify-content:center;gap:0;margin-bottom:6px">
      ${[0, 1, 2].map((t) => w`
        <span class="stub-step ${t <= e ? "on" : ""}">${t + 1}</span>
        ${t < 2 ? w`<span style="width:26px;height:1.5px;background:${t < e ? "#0284c7" : "#e2e8f0"}"></span>` : re}`)}
    </div>`;
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var r, c, g;
    const t = e.children ?? [], i = (m) => m.map((f) => this.renderComponent(f)), n = w`<div class="placeholder">suelta componentes aquí</div>`;
    let o;
    switch (e.kind) {
      case "horizontalLayout":
        o = w`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "splitLayout": {
        const m = t.slice(0, Math.ceil(t.length / 2)), f = t.slice(Math.ceil(t.length / 2));
        o = w`<div class="row-lay">
          <div class="col-lay">${m.length ? i(m) : n}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? i(f) : n}</div>
        </div>`;
        break;
      }
      case "formLayout":
        o = w`<div class="grid-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        o = w`<div class="grid3-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "tabLayout": {
        const m = t.filter((y) => y.kind === "tab"), f = m.find((y) => y.id === this._activeTabs[e.id]) ?? m[0];
        o = w`
          <div class="tabbar">
            ${m.map(
          (y, v) => w`<span
                class=${y === f ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(b) => {
            b.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: y.id }, this.emitEvent("component-selected", { componentId: y.id });
          }}
                @dblclick=${(b) => {
            b.stopPropagation(), this._cmp = { ...y };
          }}
                @dragstart=${(b) => {
            var h, l;
            b.stopPropagation(), this._dragCmpId = y.id, (l = b.dataTransfer) == null || l.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (h = this.page) == null ? void 0 : h.id, componentId: y.id })
            );
          }}
                @dragover=${(b) => {
            var h;
            ((h = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : h.kind) === "tab" && (b.preventDefault(), b.stopPropagation());
          }}
                @drop=${(b) => {
            var S, T;
            const h = this._dragCmpId;
            if (!h || h === y.id || ((S = this.nodeById(h)) == null ? void 0 : S.kind) !== "tab") return;
            b.preventDefault(), b.stopPropagation();
            const l = b.currentTarget.getBoundingClientRect(), x = b.clientX - l.left < l.width / 2 ? y.id : ((T = m[v + 1]) == null ? void 0 : T.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, x !== h && this.emitEvent("component-moved", {
              componentId: h,
              toParentId: e.id,
              beforeComponentId: x
            });
          }}
                >${y.title ?? "Pestaña"}</span
              >`
        )}
          </div>
          ${f ? this.renderComponent(f) : n}`;
        break;
      }
      case "tab":
        o = w`<div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "accordionLayout":
        o = w`<div class="col-lay">
          ${t.length ? t.map(
          (m, f) => w`
                  <div class="acc-bar"><span>${m.title ?? m.label ?? "Sección"}</span><span>${f === 0 ? "▾" : "▸"}</span></div>
                  ${f === 0 ? this.renderComponent(m) : re}
                `
        ) : n}
        </div>`;
        break;
      case "card":
        o = w`<div class="card-box">
          ${e.title ? w`<div class="card-title">${e.title}</div>` : re}
          <div class="col-lay">${t.length ? i(t) : n}</div>
        </div>`;
        break;
      case "boardLayout":
        o = w`<div class="grid3-lay">
          ${t.length ? t.map((m) => w`<div class="board-col">${this.renderComponent(m)}</div>`) : n}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [m, ...f] = t;
        o = w`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${m ? this.renderComponent(m) : w`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? i(f) : w`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        o = w`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "carouselLayout":
        o = w`<div class="row-lay">${t.length ? i(t) : n}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        o = w`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : n}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const f = e.modelId && e.modelId === ((r = this.page) == null ? void 0 : r.modelId) ? ((c = this.page) == null ? void 0 : c.viewmodelFields) ?? [] : [];
        o = f.length ? w`<div class="grid-lay">
              ${f.slice(0, 6).map(
          (y) => w`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${y.label ?? y.name}</label>${this.control(y)}</div>`
        )}
            </div>` : w`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const m = (((g = this.page) == null ? void 0 : g.viewmodelFields) ?? []).slice(0, 4);
        o = w`<table>
            <tr>${m.length ? m.map((f) => w`<th>${f.label ?? f.name}</th>`) : w`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => w`<tr>${(m.length ? m : [1, 2, 3]).map(() => w`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? re : w`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        o = w`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const m = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        o = w`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(m)}`;
        break;
      }
      case "text":
        o = w`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        o = w`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        o = w`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      // ---- Mateu design-contract containers ----
      case "section":
        o = w`<div class="acc-bar"><span>${e.title ?? "Sección"}</span></div>
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "zones":
        o = w`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "toolbar":
        o = w`<div class="row-lay" style="align-items:center">
          ${t.length ? i(t) : w`<span class="btn" style="display:inline-block;flex:none">Acción</span>${n}`}
        </div>`;
        break;
      case "pageHeader":
        o = w`<div class="row-lay" style="align-items:center">
          <div style="flex:2;font-size:15px;font-weight:800;color:#0f172a">${e.title ?? "Título de la página"}</div>
          ${t.length ? i(t) : re}
        </div>`;
        break;
      case "hero":
        o = w`<div style="background:#0f172a;color:#f8fafc;border-radius:10px;padding:22px 18px;text-align:center">
            <div style="font-size:17px;font-weight:800">${e.title ?? "Un titular que vende"}</div>
            <div style="font-size:11px;color:#cbd5e1;margin-top:4px">${e.text ?? "El subtítulo que lo explica"}</div>
          </div>
          ${t.length ? w`<div class="col-lay" style="margin-top:6px">${i(t)}</div>` : re}`;
        break;
      case "scoreboard":
        o = w`<div class="grid3-lay">${t.length ? i(t) : w`
          <div class="card-box metric"><div class="num">12</div><div class="cap">KPI</div></div>
          <div class="card-box metric"><div class="num">3,4</div><div class="cap">KPI</div></div>
          <div class="card-box metric"><div class="num">56%</div><div class="cap">KPI</div></div>`}</div>`;
        break;
      case "wizard":
        o = w`${this.stepsStub(0)}
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "app":
        o = w`<div class="appbar">⛭ ${e.title ?? "app"}</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : n}</div>`;
        break;
      // ---- Mateu design-contract leaves ----
      case "crud":
        o = w`<div class="row-lay" style="align-items:center;margin-bottom:6px">
            <div class="control" style="flex:1">Buscar…</div>
            <span class="btn" style="display:inline-block;flex:none">Nuevo</span>
          </div>
          <table>
            <tr><th>col 1</th><th>col 2</th><th>col 3</th></tr>
            ${[1, 2].map(() => w`<tr><td>···</td><td>···</td><td>···</td></tr>`)}
          </table>`;
        break;
      case "filterBar":
        o = w`<div class="row-lay" style="align-items:center">
          ${["Estado ▾", "Fecha ▾", "Tipo ▾"].map((m) => w`<span class="control" style="flex:none;font-size:11px">${m}</span>`)}
          <div class="control" style="flex:1">Buscar…</div>
        </div>`;
        break;
      case "fab":
        o = w`<div style="display:flex;justify-content:flex-end"><span
          style="width:34px;height:34px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700">+</span></div>`;
        break;
      case "appContext":
        o = w`<span class="control" style="display:inline-flex;min-width:130px">${e.label ?? "Contexto"}&nbsp;<span>▾</span></span>`;
        break;
      case "kpi":
      case "stat":
        o = w`<div class="card-box metric"><div class="num">1.234</div><div class="cap">${e.title ?? (e.kind === "kpi" ? "KPI" : "Estadística")}</div></div>`;
        break;
      case "notice":
        o = w`<div class="notice-stub">ℹ️ ${e.text ?? "Un aviso para el usuario"}</div>`;
        break;
      case "banner":
        o = w`<div class="notice-stub" style="background:#fef3c7;border-color:#f59e0b;color:#92400e">📣 ${e.text ?? e.title ?? "Banner destacado"}</div>`;
        break;
      case "calloutCard":
        o = w`<div class="card-box"><div class="card-title">💡 ${e.title ?? "Callout"}</div>
          <div class="text-stub">${e.text ?? "Algo que merece atención especial."}</div></div>`;
        break;
      case "bulletedList":
        o = w`<div class="text-stub">${["Primer punto", "Segundo punto", "Tercer punto"].map((m) => w`<div>• ${m}</div>`)}</div>`;
        break;
      case "statusList":
        o = w`<div class="col-lay" style="gap:3px">${[["#16a34a", "Operativo"], ["#f59e0b", "Degradado"], ["#dc2626", "Caído"]].map(
          ([m, f]) => w`<div class="stub-row"><span class="stub-dot" style="background:${m}"></span>${f}</div>`
        )}</div>`;
        break;
      case "checklist":
        o = w`<div class="col-lay" style="gap:3px">${[["☑", "Hecho"], ["☑", "También hecho"], ["☐", "Pendiente"]].map(
          ([m, f]) => w`<div class="stub-row"><span>${m}</span>${f}</div>`
        )}</div>`;
        break;
      case "fileList":
        o = w`<div class="col-lay" style="gap:3px">${["contrato.pdf · 1,2 MB", "foto.png · 340 KB"].map(
          (m) => w`<div class="stub-row">📄 ${m}</div>`
        )}</div>`;
        break;
      case "separator":
        o = w`<div style="border-top:1.5px solid #e2e8f0;margin:6px 0"></div>`;
        break;
      case "entityHeader":
        o = w`<div style="display:flex;gap:10px;align-items:center">
          <div style="width:34px;height:34px;border-radius:50%;background:#e0f2fe;display:flex;align-items:center;justify-content:center;font-weight:800;color:#0284c7">A</div>
          <div><div style="font-weight:800;color:#0f172a;font-size:13px">${e.title ?? "Entidad"}</div>
            <div style="font-size:10.5px;color:#94a3b8">${e.text ?? "metadatos · estado"}</div></div>
        </div>`;
        break;
      case "emptyState":
        o = w`<div class="empty" style="padding:14px">🗇<br />${e.text ?? "Nada por aquí todavía"}</div>`;
        break;
      case "skeleton":
        o = w`<div class="col-lay" style="gap:5px">${[80, 60, 72].map(
          (m) => w`<div style="height:9px;border-radius:5px;background:#e2e8f0;width:${m}%"></div>`
        )}</div>`;
        break;
      case "progressBar":
        o = this.barStub(40);
        break;
      case "meter":
        o = this.barStub(72, "#16a34a");
        break;
      case "taskProgress":
        o = w`<div class="stub-row" style="margin-bottom:3px">${e.title ?? "Tareas"} · 3/5</div>${this.barStub(60)}`;
        break;
      case "progressSteps":
        o = this.stepsStub(1);
        break;
      case "timeline":
        o = w`<div class="col-lay" style="gap:0">${["Creado", "Aprobado", "Enviado"].map(
          (m, f) => w`<div class="stub-row" style="align-items:stretch;gap:8px">
            <div style="display:flex;flex-direction:column;align-items:center"><span class="stub-dot" style="background:#0284c7"></span>${f < 2 ? w`<span style="flex:1;width:1.5px;background:#e2e8f0;min-height:10px"></span>` : re}</div>
            <span style="padding-bottom:8px">${m}</span></div>`
        )}</div>`;
        break;
      case "calendar":
        o = w`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;font-size:9px;color:#64748b;text-align:center">
          ${["L", "M", "X", "J", "V", "S", "D"].map((m) => w`<span style="font-weight:700">${m}</span>`)}
          ${Array.from({ length: 14 }, (m, f) => w`<span style="padding:2px;border-radius:4px;${f === 9 ? "background:#0284c7;color:#fff" : "background:#f8fafc"}">${f + 1}</span>`)}
        </div>`;
        break;
      case "kanban":
        o = w`<div class="grid3-lay">${["Por hacer", "En curso", "Hecho"].map(
          (m, f) => w`<div class="board-col"><div class="stub-row" style="font-weight:700">${m}</div>
            ${Array.from({ length: 2 - f % 2 }, () => w`<div class="card-box" style="padding:6px;font-size:10px;color:#94a3b8">tarjeta</div>`)}</div>`
        )}</div>`;
        break;
      case "gantt":
        o = w`<div class="col-lay" style="gap:4px">${[[0, 45, "Análisis"], [30, 40, "Diseño"], [55, 45, "Build"]].map(
          ([m, f, y]) => w`<div class="stub-row"><span style="flex:0 0 52px">${y}</span>
            <div style="flex:1;height:9px;border-radius:5px;background:#f1f5f9"><div style="margin-left:${m}%;width:${f}%;height:100%;border-radius:5px;background:#0284c7"></div></div></div>`
        )}</div>`;
        break;
      case "trendChart":
        o = w`<svg viewBox="0 0 100 28" style="width:100%;height:38px" preserveAspectRatio="none">
          <polyline points="0,24 18,18 36,20 54,10 72,13 100,3" fill="none" stroke="#0284c7" stroke-width="2" />
        </svg>`;
        break;
      case "heatmap":
        o = w`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">
          ${[3, 6, 2, 8, 5, 1, 7, 4, 9, 2, 6, 3, 8, 5].map((m) => w`<span style="height:12px;border-radius:3px;background:rgba(2,132,199,${m / 10})"></span>`)}
        </div>`;
        break;
      case "funnel":
        o = w`<div class="col-lay" style="gap:3px;align-items:center">${[100, 70, 45, 25].map(
          (m) => w`<div style="width:${m}%;height:11px;border-radius:5px;background:#0284c7;opacity:${m / 100}"></div>`
        )}</div>`;
        break;
      case "orgChart":
        o = w`<div class="col-lay" style="gap:4px;align-items:center">
          <span class="control" style="flex:none;font-size:10px">Dirección</span>
          <div class="row-lay" style="width:80%">${["Área A", "Área B"].map((m) => w`<span class="control" style="font-size:10px;justify-content:center">${m}</span>`)}</div>
        </div>`;
        break;
      case "featureGrid":
        o = w`<div class="grid3-lay">${["⚡ Rápido", "🔒 Seguro", "🧩 Modular"].map(
          (m) => w`<div class="card-box" style="text-align:center;font-size:11px;color:#334155">${m}</div>`
        )}</div>`;
        break;
      case "testimonials":
        o = w`<div class="card-box"><div class="text-stub">«${e.text ?? "Nos cambió la forma de trabajar."}»</div>
          <div style="font-size:10.5px;color:#94a3b8;margin-top:4px">— Cliente contento</div></div>`;
        break;
      case "faq":
        o = w`<div class="col-lay" style="gap:3px">${["¿Cómo empiezo?", "¿Cuánto cuesta?"].map(
          (m) => w`<div class="acc-bar"><span>${m}</span><span>▸</span></div>`
        )}</div>`;
        break;
      case "commentThread":
        o = w`<div class="col-lay" style="gap:4px">${[["Ana", "Esto está casi listo"], ["Luis", "Le doy un repaso y cierro"]].map(
          ([m, f]) => w`<div class="card-box" style="padding:6px 8px"><span style="font-size:10px;font-weight:700;color:#0284c7">${m}</span>
            <span class="text-stub"> ${f}</span></div>`
        )}</div>`;
        break;
      case "comparisonCard":
        o = w`<div class="grid-lay">${["Básico", "Pro"].map(
          (m, f) => w`<div class="card-box" style="text-align:center"><div class="card-title">${m}</div>
            <div class="text-stub">✓ Una cosa<br />${f ? "✓" : "✕"} Otra cosa</div></div>`
        )}</div>`;
        break;
      // ---- Mateu enterprise/booking wave ----
      case "planningBoard":
        o = w`<div class="col-lay" style="gap:4px">${[["Recurso A", 10, 35], ["Recurso B", 40, 30], ["Recurso C", 20, 50]].map(
          ([m, f, y]) => w`<div class="stub-row"><span style="flex:0 0 64px">${m}</span>
            <div style="flex:1;height:14px;border-radius:4px;background:#f1f5f9"><div style="margin-left:${f}%;width:${y}%;height:100%;border-radius:4px;background:#0284c7;opacity:.85"></div></div></div>`
        )}
          <div class="stub-row" style="justify-content:space-between;color:#94a3b8;font-size:9px"><span>lun</span><span>mié</span><span>vie</span><span>dom</span></div>`;
        break;
      case "offerCard":
        o = w`<div class="card-box" style="display:flex;gap:10px;align-items:center">
          <div style="width:44px;height:44px;border-radius:8px;background:#e0f2fe"></div>
          <div style="flex:1"><div class="card-title">${e.title ?? "Una oferta irresistible"}</div>
            <div class="text-stub">✓ Ventaja uno · ✓ Ventaja dos</div></div>
          <span class="btn" style="flex:none">59 € · Añadir</span>
        </div>`;
        break;
      case "addOnPicker":
        o = w`<div class="col-lay" style="gap:3px">${[["🧖", "Spa", "25 €"], ["🍳", "Desayuno", "12 €"]].map(
          ([m, f, y]) => w`<div class="stub-row" style="justify-content:space-between"><span>${m} ${f}</span><span class="btn" style="font-size:10px;padding:2px 8px">${y} +</span></div>`
        )}
          <div class="stub-row" style="justify-content:flex-end;font-weight:700">Total: 37 €</div>`;
        break;
      case "paymentPicker":
        o = w`<div class="col-lay" style="gap:4px">
          <div class="row-lay">${["💳 Tarjeta", "🏦 Transferencia"].map((m, f) => w`<span class="control" style="justify-content:center;font-size:11px;${f === 0 ? "border-color:#0284c7" : ""}">${m}</span>`)}</div>
          <span class="btn" style="text-align:center">Confirmar y pagar</span></div>`;
        break;
      case "pricingTable":
        o = w`<div class="grid-lay">${[["Básico", "9 €/mes", ""], ["Pro", "29 €/mes", "border-color:#0284c7"]].map(
          ([m, f, y]) => w`<div class="card-box" style="text-align:center;${y}"><div class="card-title">${m}</div>
            <div style="font-size:16px;font-weight:800;color:#0f172a">${f}</div>
            <div class="text-stub">✓ Una cosa<br />✓ Otra cosa</div>
            <span class="btn" style="display:inline-block;margin-top:4px;font-size:10px">Elegir</span></div>`
        )}</div>`;
        break;
      case "processMonitor":
        o = w`<div class="col-lay" style="gap:3px">${[["Nóminas", "#16a34a", "OK"], ["Facturación", "#f59e0b", "2 avisos"]].map(
          ([m, f, y]) => w`<div class="stub-row" style="justify-content:space-between"><span><span class="stub-dot" style="background:${f};display:inline-block;margin-right:6px"></span>${m}</span><span style="color:#94a3b8">${y}</span></div>`
        )}</div>`;
        break;
      case "resourceGrid":
        o = w`<div class="grid3-lay">${["Estándar", "Superior ★", "Suite"].map(
          (m, f) => w`<div class="card-box" style="text-align:center;font-size:11px;${f === 1 ? "border-color:#0284c7" : ""}">${m}<br /><span style="color:#94a3b8;font-size:10px">${f === 1 ? "recomendada" : "disponible"}</span></div>`
        )}</div>`;
        break;
      case "taskQueue":
        o = w`<div class="acc-bar"><span>Pendientes (2)</span></div>
          <div class="col-lay" style="gap:3px">${["Revisar contrato", "Llamar al cliente"].map(
          (m) => w`<div class="stub-row">☐ ${m}</div>`
        )}</div>`;
        break;
      case "ledger":
        o = w`<div class="col-lay" style="gap:2px">${[["Habitación", "240 €"], ["Spa", "25 €"], ["Desayuno", "incluido"]].map(
          ([m, f]) => w`<div class="stub-row" style="justify-content:space-between"><span>${m}</span><span>${f}</span></div>`
        )}
          <div class="stub-row" style="justify-content:space-between;font-weight:800;border-top:1.5px solid #e2e8f0;padding-top:3px"><span>Total</span><span>265 €</span></div>`;
        break;
      case "chat":
        o = w`<div class="col-lay" style="gap:4px">
          <div class="card-box" style="padding:6px 8px;max-width:75%">Hola, ¿en qué puedo ayudarte?</div>
          <div class="card-box" style="padding:6px 8px;max-width:75%;align-self:flex-end;background:#e0f2fe">Quería una reserva…</div>
          <div class="control">Escribe un mensaje…</div></div>`;
        break;
      case "markdown":
        o = w`<div class="text-stub"><b># Título</b><br />Texto con <b>**negritas**</b> y <span style="color:#0284c7">[enlaces]</span>…</div>`;
        break;
      case "breadcrumbs":
        o = w`<div class="stub-row" style="color:#94a3b8">Inicio <span>›</span> Sección <span>›</span> <span style="color:#0f172a;font-weight:600">${e.title ?? "Aquí"}</span></div>`;
        break;
      default:
        o = w`<div class="col-lay">${t.length ? i(t) : n}</div>`;
    }
    const a = pe.LEAF_KINDS.has(e.kind), s = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), d = (m) => {
      var f, y;
      m.stopPropagation(), this._dragCmpId = e.id, (y = m.dataTransfer) == null || y.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (f = this.page) == null ? void 0 : f.id, componentId: e.id })
      ), m.dataTransfer && (m.dataTransfer.effectAllowed = "move");
    };
    return w`<div
      class="cmp ${a ? "leafcmp" : ""} ${s ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
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
      var y;
      m.preventDefault(), m.stopPropagation();
      const f = ((y = m.dataTransfer) == null ? void 0 : y.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...f].includes("application/x-modux-cmp") || [...f].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, m) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(m) => {
      var f, y, v;
      this._foreignOver = !1, !(!this._dragCmpId && !((v = (y = (f = m.dataTransfer) == null ? void 0 : f.types) == null ? void 0 : y.includes) != null && v.call(y, "application/x-modux-cmp"))) && (m.preventDefault(), m.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, m));
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
  renderInferredBody(e, t, i) {
    return w`
        ${i ? w`<table>
              <tr>${t.slice(0, 4).map((n) => w`<th>${n.label ?? n.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => w`<tr>${t.slice(0, 4).map(() => w`<td>···</td>`)}</tr>`)}
            </table>` : re}
        ${t.length ? w`<div class="grid">
              ${t.map(
      (n) => w`
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
            </div>` : w`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    var o, a, s, d, r;
    const e = this._cmp;
    if (!e) return re;
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
    return w`<div class="pop" @click=${(c) => c.stopPropagation()}>
      ${n ? w`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(c) => t({ title: c.target.value })} />` : re}
      ${i === "text" ? w`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(c) => t({ text: c.target.value })} />` : re}
      ${i === "button" || i === "field" ? w`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(c) => t({ label: c.target.value })} />` : re}
      ${i === "button" ? w`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? w`<span class="chip">${((o = this.useCases.find((c) => c.id === e.useCaseId)) == null ? void 0 : o.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : w`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? w`<span class="chip"
                      >${((a = this.mappings.find((c) => c.id === e.mappingId)) == null ? void 0 : a.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : w`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : re}
      ${i === "form" ? w`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? w`<span class="chip"
                      >${((s = this.models.find((c) => c.id === e.modelId)) == null ? void 0 : s.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : w`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>
            <label>Mapping</label>
            <span style="grid-column: 2 / -1">
              ${e.mappingId ? w`<span class="chip"
                      >${((d = this.mappings.find((c) => c.id === e.mappingId)) == null ? void 0 : d.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : w`<span class="vmhint">el viewmodel viaja tal cual al guardar — suelta un mapeado del Catálogo sobre el formulario</span>`}
            </span>` : re}
      ${i === "listing" || i === "crud" ? w`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? w`<span class="chip"
                      >${((r = this.queryOps.find((c) => c.id === e.queryOperationId)) == null ? void 0 : r.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : w`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>
            <label>Ficha</label>
            <select
              style="grid-column: 2 / -1"
              title="La página que abre el click en una fila"
              @change=${(c) => t({ detailPageId: c.target.value || void 0 })}
            >
              <option value="">— sin ficha —</option>
              ${this.pages.filter((c) => {
      var g;
      return c.id !== ((g = this.page) == null ? void 0 : g.id);
    }).map((c) => w`<option value=${c.id} ?selected=${c.id === e.detailPageId}>${c.name}</option>`)}
            </select>` : re}
      ${i === "field" ? w`<label>Estereotipo</label>
            <select @change=${(c) => t({ stereotype: c.target.value || void 0 })}>
              ${mo.map((c) => w`<option value=${c} ?selected=${c === (e.stereotype ?? "regular")}>${c}</option>`)}
            </select>` : re}
      ${i === "tabLayout" ? w`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : re}
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
        colspan: c.colspan ?? null,
        detailPageId: c.detailPageId ?? null
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
    const i = (this.page.viewmodelFields ?? []).map((a) => a.fieldId), n = i.indexOf(t), o = i.indexOf(e);
    n < 0 || o < 0 || (i.splice(o, 0, ...i.splice(n, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return re;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId, n = e.type === "WIZARD";
    return w`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? w`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(o) => this._rename = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRename(), o.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : w`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        ${this._route !== null ? w`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(o) => this._route = o.target.value}
              @keydown=${(o) => {
      o.key === "Enter" && this.applyRoute(), o.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : w`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
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
      (o) => w`<span
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
        ${(e.buttons ?? []).some((o) => (o.bar ?? "toolbar") === "toolbar") ? re : w`<span class="zoneph">suelta un caso de uso aquí</span>`}
      </div>
      <div class="vm">
        viewmodel:
        ${e.modelId ? w`<span class="chip"
                >${e.modelName ?? e.modelId}
                <span
                  class="chipx"
                  title="Quitar el viewmodel"
                  @click=${() => this.emitEvent("page-model-changed", { modelId: null })}
                  >✕</span
                ></span
              >` : w`<span class="vmhint"
              >arrastra un modelo del Catálogo hasta el frame — o el asa violeta de la página, en la vista UI</span
            >`}
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${n ? w`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((o, a) => {
      const s = (e.wizardSteps ?? []).map((r, c) => r.id ?? r.pageId ?? String(c)), d = s[a];
      return w`<span
                      class=${a === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${a + 1}${o.pageId ? "" : " (sin página)"} — arrastra para reordenar"
                      @dragstart=${(r) => {
        r.stopPropagation(), this._dragWizKey = d;
      }}
                      @dragover=${(r) => {
        this._dragWizKey && (r.preventDefault(), r.stopPropagation());
      }}
                      @drop=${(r) => {
        const c = this._dragWizKey;
        if (this._dragWizKey = null, !c || c === d) return;
        r.preventDefault(), r.stopPropagation();
        const g = r.currentTarget.getBoundingClientRect(), f = r.clientX - g.left < g.width / 2 ? d : s[a + 1] ?? null;
        f !== c && this.emitEvent("wizard-step-moved", { stepKey: c, beforeStepKey: f });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[a] ?? `${a + 1}.`} ${o.label ?? "Paso"}${o.pageId ? "" : " ⌁"}</span
                    >`;
    }) : w`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : re}
        ${(e.content ?? []).length ? w`<div class="col-lay">${(e.content ?? []).map((o) => this.renderComponent(o))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((o) => o.bar === "bottom").map(
      (o) => w`<span
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
        ${(e.buttons ?? []).some((o) => o.bar === "bottom") ? re : w`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var a, s, d;
      const o = (((a = this.page) == null ? void 0 : a.buttons) ?? []).some((r) => r.useCaseId === this._btn.useCaseId);
      return w`<div class="pop">
              <label>Caso de uso</label>
              <span style="grid-column: 2 / -1">
                <span class="chip">${((s = this.useCases.find((r) => r.id === this._btn.useCaseId)) == null ? void 0 : s.name) ?? this._btn.useCaseId}</span>
                <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>
              </span>
              <label>Etiqueta</label>
              <input
                placeholder="(el nombre del caso de uso)"
                .value=${this._btn.label}
                @input=${(r) => this._btn = { ...this._btn, label: r.target.value }}
              />
              <label>Mapping</label>
              <span style="grid-column: 2 / -1">
                ${this._btn.mappingId ? w`<span class="chip"
                        >${((d = this.mappings.find((r) => r.id === this._btn.mappingId)) == null ? void 0 : d.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : w`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${o ? w`<button
                      @click=${() => {
        const r = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: r });
      }}
                    >
                      Quitar
                    </button>` : re}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(o)}>Aplicar</button>
              </div>
            </div>`;
    })() : re}
      ${this._editing ? w`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(o) => this._editing = { ...this._editing, stereotype: o.target.value }}
            >
              ${mo.map(
      (o) => w`<option value=${o} ?selected=${o === this._editing.stereotype}>${o}</option>`
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
var lp = Object.defineProperty, cp = Object.getOwnPropertyDescriptor, qe = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? cp(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && lp(t, i, o), o;
};
const pa = 460, pp = 540, up = 660;
let Pe = class extends je {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((o) => {
        var a;
        return (a = o.classList) == null ? void 0 : a.contains("frame-grip");
      });
      if (i) {
        const a = i.closest(".frame").dataset.pageId, s = this.sizeOf(a);
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "resize", id: a, x: e.clientX, y: e.clientY, w0: s.w, h0: s.h }, e.preventDefault();
        return;
      }
      const n = t.find((o) => {
        var a;
        return (a = o.classList) == null ? void 0 : a.contains("frame-title");
      });
      if (n) {
        const a = n.closest(".frame").dataset.pageId;
        if (e.shiftKey) {
          this.emit("element-multi-toggled", { id: a }), e.preventDefault();
          return;
        }
        const s = this.pages.findIndex((r) => r.id === a), d = this.posOf(a, s);
        this.emit("element-selected", { elementType: "node", id: a, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: a, x: e.clientX, y: e.clientY, ox: d.x, oy: d.y, moved: !1 }, e.preventDefault();
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
      const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, o = e.deltaY < 0 ? 1.1 : 1 / 1.1, a = Math.max(0.2, Math.min(2.5, this._t.k * o));
      this._t = {
        k: a,
        x: i - (i - this._t.x) / this._t.k * a,
        y: n - (n - this._t.y) / this._t.k * a
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
    var g, m, f, y, v, b;
    const i = (g = this.shadowRoot) == null ? void 0 : g.elementFromPoint(e, t), n = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, ".frame");
    if (!n) return null;
    const o = n.dataset.pageId, a = n.querySelector("modux-page-designer"), s = (f = a == null ? void 0 : a.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), d = (y = s == null ? void 0 : s.closest) == null ? void 0 : y.call(s, "[data-btn-uc]");
    if (d != null && d.dataset.btnUc) return `btn:${o}:${d.dataset.btnUc}`;
    const r = (v = s == null ? void 0 : s.closest) == null ? void 0 : v.call(s, "[data-bar]");
    if (r != null && r.dataset.bar) return `bar:${o}:${r.dataset.bar}`;
    const c = (b = s == null ? void 0 : s.closest) == null ? void 0 : b.call(s, "[data-cmp-id]");
    return c ? `cmp:${o}:${c.dataset.cmpId}` : o;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var f, y, v, b;
    const i = (f = this.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), n = (y = i == null ? void 0 : i.closest) == null ? void 0 : y.call(i, ".frame");
    if (!n) return null;
    const o = n.dataset.pageId, a = n.querySelector("modux-page-designer"), s = (v = a == null ? void 0 : a.shadowRoot) == null ? void 0 : v.elementFromPoint(e, t), d = (b = s == null ? void 0 : s.closest) == null ? void 0 : b.call(s, "[data-cmp-id]");
    if (!d) return { pageId: o, componentId: null, pos: "into" };
    const r = d.dataset.cmpKind ?? "", c = d.getBoundingClientRect(), g = (t - c.top) / Math.max(1, c.height), m = pe.LEAF_KINDS.has(r) ? g < 0.5 ? "before" : "after" : g < 0.2 ? "before" : g > 0.8 ? "after" : "into";
    return { pageId: o, componentId: d.dataset.cmpId, pos: m };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: pa, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * pp, y: Math.floor(t / 3) * up };
  }
  render() {
    return w`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var o, a;
      const i = ((o = this._live) == null ? void 0 : o.id) === e.id ? this._live : this.posOf(e.id, t), n = this.sizeOf(e.id);
      return w`
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
                .selectedCmpId=${((a = this.selectedCmp) == null ? void 0 : a.pageId) === e.id ? this.selectedCmp.componentId : null}
                .models=${this.models}
                .mappings=${this.mappings}
                .useCases=${this.useCases}
                .queryOps=${this.queryOps}
                .pages=${this.pages.map((s) => ({ id: s.id, name: s.name }))}
                @component-config-changed=${(s) => {
        s.stopPropagation(), this.emit("page-component-config-changed", { pageId: e.id, ...s.detail });
      }}
                @component-removed=${(s) => {
        s.stopPropagation(), this.emit("page-component-removed", { pageId: e.id, ...s.detail });
      }}
                @component-moved=${(s) => {
        s.stopPropagation(), this.emit("page-component-moved", { pageId: e.id, ...s.detail });
      }}
                @component-selected=${(s) => {
        s.stopPropagation(), this.emit("page-component-selected", { pageId: e.id, ...s.detail });
      }}
                @component-transferred=${(s) => {
        s.stopPropagation(), this.emit("page-component-transferred", { toPageId: e.id, ...s.detail });
      }}
                @wizard-step-moved=${(s) => {
        s.stopPropagation(), this.emit("page-wizard-step-moved", { pageId: e.id, ...s.detail });
      }}
                @page-renamed=${(s) => {
        s.stopPropagation(), this.emit("page-renamed", { pageId: e.id, ...s.detail });
      }}
                @page-type-changed=${(s) => {
        s.stopPropagation(), this.emit("page-type-changed", { pageId: e.id, ...s.detail });
      }}
                @page-route-changed=${(s) => {
        s.stopPropagation(), this.emit("page-route-changed", { pageId: e.id, ...s.detail });
      }}
                @page-model-changed=${(s) => {
        s.stopPropagation(), this.emit("page-model-changed", { pageId: e.id, ...s.detail });
      }}
                @button-added=${(s) => this.emit("page-button-added", { pageId: e.id, ...s.detail })}
                @button-changed=${(s) => this.emit("page-button-changed", { pageId: e.id, ...s.detail })}
                @button-removed=${(s) => this.emit("page-button-removed", { pageId: e.id, ...s.detail })}
                @open-crud=${() => this.emit("page-open-crud", { pageId: e.id })}
                @field-config-changed=${(s) => this.emit("page-field-config-changed", { pageId: e.id, ...s.detail })}
                @fields-reordered=${(s) => this.emit("page-fields-reordered", { pageId: e.id, ...s.detail })}
              ></modux-page-designer>
              <div class="frame-grip" title="Arrastra para redimensionar la página"></div>
            </div>
          `;
    })}
      </div>
      ${this.pages.length ? "" : w`<div class="empty">
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
      width: ${pa}px;
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
var mp = Object.defineProperty, fp = Object.getOwnPropertyDescriptor, Re = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? fp(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && mp(t, i, o), o;
};
const hp = {
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
}, gp = {
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
}, fo = [30, 20, 13, 9.5, 7.5], ho = [0, 180, 118, 80, 58], yp = 0.055, bp = 0.86, vp = 2600, vi = 240, go = 0.16, yo = 0.015;
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
    const a = 70, s = this.clientWidth || 800, d = this.clientHeight || 600, r = n - t + a * 2, c = o - i + a * 2, g = Math.min(1.5, Math.max(0.25, Math.min(s / r, d / c)));
    this.cam.k = g, this.cam.x = s / 2 - (t + n) / 2 * g, this.cam.y = d / 2 - (i + o) / 2 * g;
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
        const a = e.get(o);
        o = a ? a.ownerId ?? a.parentId : void 0;
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
    const a = `${(o == null ? void 0 : o.key) ?? ""}/${e}:${t}`, s = this.prevByKey.get(a), d = () => (Math.random() - 0.5) * 10;
    return {
      key: a,
      refId: t,
      kind: e,
      label: i,
      color: hp[e] ?? this.pal("--modux-text-dim", "#64748b"),
      depth: n,
      parent: o,
      expanded: (s == null ? void 0 : s.expanded) ?? !1,
      x: (s == null ? void 0 : s.x) ?? (o ? o.x + d() : 0),
      y: (s == null ? void 0 : s.y) ?? (o ? o.y + d() : 0),
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
    const t = this.model, i = e.depth + 1, n = (o, a, s) => this.makeNode(o, a, s, i, e);
    if (this.scene)
      return this.scene.nodes.filter((o) => o.kind !== "area").filter((o) => e.kind === "root" ? !(o.ownerId ?? o.parentId) : (o.ownerId ?? o.parentId) === e.refId).map((o) => {
        const a = n(o.kind || "node", o.id, o.label);
        return o.stroke && (a.color = o.stroke), a;
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
        const o = t.boundedContexts.find((c) => c.id === e.refId);
        if (!o) return [];
        const a = (t.aggregates ?? []).filter((c) => c.boundedContextId === e.refId), s = o.useCases ?? [], d = new Set(a.map((c) => c.id)), r = new Set(
          (t.emissions ?? []).filter((c) => d.has(c.sourceId)).map((c) => c.domainEventId)
        );
        return [
          ...a.length ? [n("group", `aggregates:${e.refId}`, `Agregados · ${a.length}`)] : [],
          ...s.length ? [n("group", `use-cases:${e.refId}`, `Casos de uso · ${s.length}`)] : [],
          ...(o.domainEvents ?? []).filter((c) => !r.has(c.id)).map((c) => n("domain-event", c.id, c.name)),
          ...(o.applicationEvents ?? []).map((c) => n("application-event", c.id, c.name)),
          ...(o.readModels ?? []).map((c) => n("read-model", c.id, c.name)),
          ...(o.domainServices ?? []).map((c) => n("domain-service", c.id, c.name)),
          ...(o.queryServices ?? []).map((c) => n("query-service", c.id, c.name)),
          ...(o.scheduledTriggers ?? []).map((c) => n("scheduled-trigger", c.id, c.name)),
          ...(t.etlFlows ?? []).filter((c) => c.ownerBoundedContextId === e.refId).map((c) => n("etl-flow", c.id, c.name)),
          ...(t.notifications ?? []).filter((c) => c.ownerBoundedContextId === e.refId).map((c) => n("notification", c.id, c.name)),
          ...(t.documents ?? []).filter((c) => c.ownerBoundedContextId === e.refId).map((c) => n("document", c.id, c.name))
        ];
      }
      case "group": {
        const o = e.refId.indexOf(":"), a = e.refId.slice(0, o), s = e.refId.slice(o + 1), d = t.boundedContexts.find((r) => r.id === s);
        return d ? a === "aggregates" ? (t.aggregates ?? []).filter((r) => r.boundedContextId === s).map((r) => n("aggregate", r.id, r.name)) : (d.useCases ?? []).map((r) => n(r.policy ? "policy" : "use-case", r.id, r.name)) : [];
      }
      case "aggregate": {
        const o = new Set(
          (t.emissions ?? []).filter((a) => a.sourceId === e.refId).map((a) => a.domainEventId)
        );
        return [
          ...(t.entities ?? []).filter((a) => a.aggregateId === e.refId).map((a) => n("entity", a.id, a.name)),
          ...t.boundedContexts.flatMap((a) => a.domainEvents ?? []).filter((a) => o.has(a.id)).map((a) => n("domain-event", a.id, a.name))
        ];
      }
      case "external-system": {
        const o = t.externalSystems.find((a) => a.id === e.refId);
        return o ? [
          ...(t.apis ?? []).filter((a) => a.publishedByExternalSystemId === e.refId).map((a) => n("api", a.id, a.name)),
          ...(o.useCases ?? []).map((a) => n("external-use-case", a.id, a.name)),
          ...(o.tables ?? []).map((a) => n("external-table", a.id, a.name)),
          ...(o.mcpServers ?? []).map((a) => n("mcp-server", a.id, a.name))
        ] : [];
      }
      case "api": {
        const o = (t.apis ?? []).find((a) => a.id === e.refId);
        return ((o == null ? void 0 : o.operations) ?? []).map((a) => n("api-operation", a.id, a.name));
      }
      case "ui-app": {
        const o = (t.uiApps ?? []).find((d) => d.id === e.refId);
        if (!o) return [];
        const a = /* @__PURE__ */ new Set(), s = (d) => {
          for (const r of d ?? [])
            r.pageId && a.add(r.pageId), s(r.children);
        };
        s(o.menuItems);
        for (const d of [o.headerPageId, o.homePageId, o.viewPageId, o.editPageId])
          d && a.add(d);
        return [...a].map((d) => (t.pages ?? []).find((r) => r.id === d)).filter((d) => !!d).map((d) => n("page", d.id, d.name));
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
    var a;
    !e.expanded && ((a = e.children) != null && a.length) && this.toggle(e);
    const t = /* @__PURE__ */ new Set(), i = (s) => {
      for (let d = s; d; d = d.parent) t.add(d.key);
    }, n = (s) => {
      t.add(s.key);
      for (const d of s.children ?? []) n(d);
    };
    i(e), n(e);
    const o = this.related.get(e.refId);
    if (o)
      for (const s of this.allNodes)
        s.refId && o.has(s.refId) && i(s);
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
    for (const s of e) {
      if (s.parent) {
        const d = (ho[Math.min(s.depth, ho.length - 1)] ?? 60) + Math.min(60, ((((a = s.parent.children) == null ? void 0 : a.length) ?? 1) - 1) * 2.5);
        let r = s.x - s.parent.x, c = s.y - s.parent.y, g = Math.hypot(r, c);
        if (g < 0.01) {
          const v = Math.random() * Math.PI * 2;
          r = Math.cos(v) * 0.1, c = Math.sin(v) * 0.1, g = 0.1;
        }
        const m = yp * (g - d), f = r / g * m, y = c / g * m;
        s.vx -= f, s.vy -= y, s.parent.vx += f * 0.4, s.parent.vy += y * 0.4;
      } else
        s.vx -= s.x * yo, s.vy -= s.y * yo;
      !this.reducedMotion && this._motion > 0 && (s.vx += Math.sin(t * s.f1 * Math.PI * 2 + s.p1) * go * this._motion, s.vy += Math.cos(t * s.f2 * Math.PI * 2 + s.p2) * go * this._motion);
    }
    for (let s = 0; s < e.length; s++) {
      const d = e[s];
      for (let r = s + 1; r < e.length; r++) {
        const c = e[r], g = c.x - d.x, m = c.y - d.y;
        if (Math.abs(g) > vi || Math.abs(m) > vi) continue;
        const f = g * g + m * m;
        if (f > vi * vi || f < 0.01) continue;
        const y = Math.sqrt(f), v = d.depth <= 1 && c.depth <= 1 ? 3 : 1, b = vp * v / f, h = g / y * b, l = m / y * b;
        d.vx -= h, d.vy -= l, c.vx += h, c.vy += l;
      }
    }
    const i = this._motion, n = bp * i + 0.5 * (1 - i), o = (1 - i) * 0.7;
    for (const s of e) {
      if (s === this.dragNode) {
        s.vx = 0, s.vy = 0;
        continue;
      }
      s.vx *= n, s.vy *= n;
      const d = Math.hypot(s.vx, s.vy);
      if (d > 14 && (s.vx = s.vx / d * 14, s.vy = s.vy / d * 14), o > 0 && d < o) {
        s.vx = 0, s.vy = 0;
        continue;
      }
      s.x += s.vx, s.y += s.vy;
      const r = s === this.hover ? 1.75 : 1;
      s.scale += (r - s.scale) * 0.18;
    }
  }
  // ── Drawing ───────────────────────────────────────────────────────────
  radiusOf(e) {
    return (fo[Math.min(e.depth, fo.length - 1)] ?? 7) * e.scale;
  }
  /**
   * Theme palette lookup: the palette rides in on CSS custom properties (they
   * inherit through shadow boundaries), but canvas 2D needs concrete colors.
   */
  pal(e, t) {
    return getComputedStyle(this).getPropertyValue(e).trim() || t;
  }
  draw(e) {
    var a, s;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const i = this.clientWidth, n = this.clientHeight;
    t.clearRect(0, 0, i, n), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), this.drawAreas(t, e), t.lineWidth = 1.3 / this.cam.k;
    for (const d of e)
      d.parent && (t.strokeStyle = d.color + "55", t.beginPath(), t.moveTo(d.parent.x, d.parent.y), t.lineTo(d.x, d.y), t.stroke());
    const o = (d) => `${d}px system-ui, sans-serif`;
    for (const d of e) {
      const r = this.radiusOf(d);
      t.beginPath(), t.arc(d.x, d.y, r, 0, Math.PI * 2), t.fillStyle = d.kind === "note" ? this.pal("--modux-note-fill", "#fef9c3") : d.expanded ? d.color + "22" : this.pal("--modux-node-fill", "#232527"), t.fill(), t.lineWidth = (d === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = d.color, t.stroke(), this.drawGlyph(t, d, r);
      const c = ((a = d.children) == null ? void 0 : a.length) ?? 0;
      if (!d.expanded && c > 0) {
        const m = Math.max(7, r * 0.42), f = d.x + r * 0.75, y = d.y + r * 0.75;
        t.beginPath(), t.arc(f, y, m, 0, Math.PI * 2), t.fillStyle = d.color, t.fill(), t.fillStyle = "#ffffff", t.font = o(m * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(c), f, y + 0.5);
      }
      if (d.depth <= 1 || d === this.hover || this.cam.k > 0.65) {
        const m = d.label.length > 22 ? d.label.slice(0, 21) + "…" : d.label;
        t.font = d === this.hover ? `600 ${o(12)}` : o(d.depth <= 1 ? 12 : 10.5), t.fillStyle = d === this.hover ? this.pal("--modux-text", "#0f172a") : this.pal("--modux-text-dim", "#475569"), t.textAlign = "center", t.textBaseline = "top", t.fillText(m, d.x, d.y + r + 4);
      }
    }
    if (this.selected.size) {
      t.save(), t.strokeStyle = this.pal("--modux-primary", "#2563eb"), t.lineWidth = 2 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]);
      for (const d of e)
        this.selected.has(d.key) && (t.beginPath(), t.arc(d.x, d.y, this.radiusOf(d) + 6, 0, Math.PI * 2), t.stroke());
      t.restore();
    }
    if (this.rubber) {
      const d = this.rubber;
      t.save(), t.fillStyle = this.pal("--modux-primary-soft", "rgba(37, 99, 235, 0.08)"), t.strokeStyle = this.pal("--modux-primary", "#2563eb"), t.lineWidth = 1.2 / this.cam.k, t.setLineDash([4 / this.cam.k, 3 / this.cam.k]), t.fillRect(Math.min(d.ax, d.bx), Math.min(d.ay, d.by), Math.abs(d.bx - d.ax), Math.abs(d.by - d.ay)), t.strokeRect(Math.min(d.ax, d.bx), Math.min(d.ay, d.by), Math.abs(d.bx - d.ax), Math.abs(d.by - d.ay)), t.restore();
    }
    if (this.found)
      if (this.t > this.found.until)
        this.found = void 0;
      else {
        const d = this.found.node, r = (this.found.until - this.t) / 3.2;
        t.save(), t.globalAlpha = Math.min(0.8, r * 1.6), t.strokeStyle = d.color, t.lineWidth = 2.2 / this.cam.k;
        const c = this.reducedMotion ? 0 : Math.sin(this.t * 5) * 3;
        t.beginPath(), t.arc(d.x, d.y, this.radiusOf(d) + 9 + c, 0, Math.PI * 2), t.stroke(), t.globalAlpha *= 0.4, t.beginPath(), t.arc(d.x, d.y, this.radiusOf(d) + 18 + c * 1.4, 0, Math.PI * 2), t.stroke(), t.restore();
      }
    if (t.globalAlpha = 1, this.drawNotes(t, e), this._threads)
      for (const d of e) this.drawThreads(t, d, e);
    else this.hover && this.drawThreads(t, this.hover, e);
    if (this.hover && !this.hover.expanded && ((s = this.hover.children) != null && s.length) && this.drawGhosts(t, this.hover), this.linking) {
      const d = this.linking.source;
      t.save(), t.strokeStyle = this.pal("--modux-text-dim", "#475569"), t.lineWidth = 1.6 / this.cam.k, t.setLineDash([5 / this.cam.k, 4 / this.cam.k]), t.beginPath(), t.moveTo(d.x, d.y), t.lineTo(this.linking.x, this.linking.y), t.stroke(), t.restore();
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
      for (const a of i) {
        if (a === t || !n.has(a.refId) || a === t.parent || a.parent === t) continue;
        const s = (t.x + a.x) / 2, d = (t.y + a.y) / 2, r = a.x - t.x, c = a.y - t.y, g = 0.18;
        e.strokeStyle = a.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(s - c * g, d + r * g, a.x, a.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(a.x, a.y, this.radiusOf(a) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
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
    var a;
    this.areaHulls.clear();
    const i = ((a = this.scene) == null ? void 0 : a.nodes) ?? [], n = i.filter((s) => s.kind === "area");
    if (!n.length) return;
    const o = this.cam.k;
    e.save(), e.setLineDash([5 / o, 4 / o]), e.lineWidth = 1.4 / o;
    for (const s of n) {
      const d = i.filter(
        (y) => y.kind !== "area" && !y.parentId && y.x - y.w / 2 >= s.x - s.w / 2 && y.x + y.w / 2 <= s.x + s.w / 2 && y.y - y.h / 2 >= s.y - s.h / 2 && y.y + y.h / 2 <= s.y + s.h / 2
      ), r = [];
      for (const y of d) {
        const v = this.visibleRepresentative(y.id, t);
        v && r.push({ x: v.x, y: v.y, r: this.radiusOf(v) + 16 });
      }
      if (!r.length) continue;
      const c = Math.min(...r.map((y) => y.x - y.r)), g = Math.max(...r.map((y) => y.x + y.r)), m = Math.min(...r.map((y) => y.y - y.r)), f = Math.max(...r.map((y) => y.y + y.r));
      this.areaHulls.set(s.id, { x: (c + g) / 2, y: (m + f) / 2 }), e.fillStyle = "rgba(148, 163, 184, 0.09)", e.strokeStyle = this.pal("--modux-node-stroke", "#94a3b8"), e.beginPath(), e.roundRect(c, m, g - c, f - m, 18 / o), e.fill(), e.stroke();
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
    const i = (((o = this.scene) == null ? void 0 : o.edges) ?? []).filter((a) => a.kind === "note-link");
    if (!i.length) return;
    const n = this.cam.k;
    e.save(), e.setLineDash([4 / n, 3 / n]), e.strokeStyle = "rgba(202, 138, 4, 0.75)", e.lineWidth = 1.4 / n;
    for (const a of i) {
      if (a.targetId.startsWith("edgeanchor:")) continue;
      const s = this.visibleRepresentative(a.sourceId, t), d = this.visibleRepresentative(a.targetId, t), r = d ?? this.areaHulls.get(a.targetId);
      if (!s || !r || d === s) continue;
      const c = r.x - s.x, g = r.y - s.y, m = Math.hypot(c, g) || 1, f = this.radiusOf(s), y = d ? this.radiusOf(d) : 0;
      e.beginPath(), e.moveTo(s.x + c / m * f, s.y + g / m * f), e.lineTo(r.x - c / m * y, r.y - g / m * y), e.stroke();
    }
    e.restore();
  }
  visibleRepresentative(e, t) {
    var o;
    const i = new Map(t.map((a) => [a.refId, a])), n = new Map((((o = this.scene) == null ? void 0 : o.nodes) ?? []).map((a) => [a.id, a.ownerId ?? a.parentId]));
    for (let a = e; a; a = n.get(a)) {
      const s = i.get(a);
      if (s) return s;
    }
    return null;
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const i = t.children ?? [], n = i.slice(0, 14), o = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (o <= 0.02) return;
    const s = this.radiusOf(t) + 24, d = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, r = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = o, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, n.forEach((c, g) => {
      const m = d - r / 2 + r * (g + 0.5) / n.length, f = this.reducedMotion ? 0 : Math.sin(this.t * c.f1 * Math.PI * 2 + c.p1) * 1.8, y = t.x + Math.cos(m) * (s + f), v = t.y + Math.sin(m) * (s + f);
      e.beginPath(), e.arc(y, v, 6, 0, Math.PI * 2), e.fillStyle = this.pal("--modux-node-fill", "#232527"), e.fill(), e.strokeStyle = c.color, e.stroke();
    }), i.length > n.length) {
      e.setLineDash([]), e.fillStyle = this.pal("--modux-text-dim", "#64748b"), e.font = `${11 / this.cam.k}px system-ui, sans-serif`, e.textAlign = "center", e.textBaseline = "middle";
      const c = d + r / 2 + 0.35;
      e.fillText(`+${i.length - n.length}`, t.x + Math.cos(c) * s, t.y + Math.sin(c) * s);
    }
    e.restore();
  }
  /** A tiny kind glyph inside the circle, so the tree reads without hovering. */
  drawGlyph(e, t, i) {
    const n = i * 0.42;
    if (n < 3.2) return;
    const { x: o, y: a } = t;
    switch (e.save(), e.strokeStyle = t.color, e.fillStyle = t.color, e.lineWidth = Math.max(1, n * 0.22), e.lineCap = "round", e.lineJoin = "round", e.beginPath(), t.kind) {
      case "note":
        e.moveTo(o - n * 0.8, a - n * 0.9), e.lineTo(o + n * 0.8, a - n * 0.9), e.lineTo(o + n * 0.8, a + n * 0.3), e.lineTo(o + n * 0.2, a + n * 0.9), e.lineTo(o - n * 0.8, a + n * 0.9), e.closePath(), e.moveTo(o + n * 0.8, a + n * 0.3), e.lineTo(o + n * 0.2, a + n * 0.3), e.lineTo(o + n * 0.2, a + n * 0.9), e.stroke();
        break;
      case "group": {
        e.arc(o - n * 0.45, a, n * 0.16, 0, Math.PI * 2), e.moveTo(o + n * 0.16, a), e.arc(o, a, n * 0.16, 0, Math.PI * 2), e.moveTo(o + n * 0.61, a), e.arc(o + n * 0.45, a, n * 0.16, 0, Math.PI * 2), e.fill(), e.beginPath(), e.arc(o, a, n, -Math.PI * 0.35, Math.PI * 0.35), e.moveTo(o - n * Math.cos(Math.PI * 0.35), a + n * Math.sin(Math.PI * 0.35)), e.arc(o, a, n, Math.PI * 0.65, Math.PI * 1.35), e.stroke();
        break;
      }
      case "root":
        e.arc(o, a, n, 0, Math.PI * 2), e.moveTo(o + n * 0.35, a), e.arc(o, a, n * 0.35, 0, Math.PI * 2), e.stroke();
        break;
      case "boundedContext":
        for (const [s, d] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(o + s * n + n * 0.3, a + d * n), e.arc(o + s * n, a + d * n, n * 0.3, 0, Math.PI * 2);
        e.fill();
        break;
      case "aggregate":
        e.moveTo(o, a - n), e.lineTo(o + n, a), e.lineTo(o, a + n), e.lineTo(o - n, a), e.closePath(), e.stroke();
        break;
      case "entity":
      case "external-table":
      case "read-model":
        e.rect(o - n, a - n * 0.8, n * 2, n * 1.6), e.moveTo(o - n, a - n * 0.25), e.lineTo(o + n, a - n * 0.25), e.stroke();
        break;
      case "use-case":
      case "external-use-case":
        e.moveTo(o - n * 0.6, a - n * 0.85), e.lineTo(o + n * 0.85, a), e.lineTo(o - n * 0.6, a + n * 0.85), e.closePath(), e.stroke();
        break;
      case "policy":
      case "domain-event":
      case "application-event":
        e.moveTo(o + n * 0.3, a - n), e.lineTo(o - n * 0.5, a + n * 0.15), e.lineTo(o + n * 0.05, a + n * 0.15), e.lineTo(o - n * 0.3, a + n), e.lineTo(o + n * 0.5, a - n * 0.15), e.lineTo(o - n * 0.05, a - n * 0.15), e.closePath(), e.stroke();
        break;
      case "domain-service":
      case "etl-flow": {
        e.arc(o, a, n * 0.5, 0, Math.PI * 2);
        for (let s = 0; s < 6; s++) {
          const d = s * Math.PI / 3;
          e.moveTo(o + Math.cos(d) * n * 0.55, a + Math.sin(d) * n * 0.55), e.lineTo(o + Math.cos(d) * n, a + Math.sin(d) * n);
        }
        e.stroke();
        break;
      }
      case "query-service":
        e.arc(o - n * 0.25, a - n * 0.25, n * 0.6, 0, Math.PI * 2), e.moveTo(o + n * 0.25, a + n * 0.25), e.lineTo(o + n, a + n), e.stroke();
        break;
      case "scheduled-trigger":
        e.arc(o, a, n, 0, Math.PI * 2), e.moveTo(o, a - n * 0.55), e.lineTo(o, a), e.lineTo(o + n * 0.45, a + n * 0.25), e.stroke();
        break;
      case "notification":
        e.moveTo(o - n * 0.85, a + n * 0.45), e.quadraticCurveTo(o - n * 0.85, a - n, o, a - n), e.quadraticCurveTo(o + n * 0.85, a - n, o + n * 0.85, a + n * 0.45), e.closePath(), e.moveTo(o + n * 0.25, a + n * 0.75), e.arc(o, a + n * 0.75, n * 0.25, 0, Math.PI), e.stroke();
        break;
      case "document":
        e.moveTo(o - n * 0.7, a - n), e.lineTo(o + n * 0.25, a - n), e.lineTo(o + n * 0.7, a - n * 0.55), e.lineTo(o + n * 0.7, a + n), e.lineTo(o - n * 0.7, a + n), e.closePath(), e.moveTo(o + n * 0.25, a - n), e.lineTo(o + n * 0.25, a - n * 0.55), e.lineTo(o + n * 0.7, a - n * 0.55), e.stroke();
        break;
      case "workflow":
        for (const s of [-0.7, 0.1])
          e.moveTo(o + s * n, a - n * 0.7), e.lineTo(o + (s + 0.6) * n, a), e.lineTo(o + s * n, a + n * 0.7);
        e.stroke();
        break;
      case "identity-provider":
        e.arc(o - n * 0.45, a - n * 0.45, n * 0.45, 0, Math.PI * 2), e.moveTo(o - n * 0.1, a - n * 0.1), e.lineTo(o + n * 0.9, a + n * 0.9), e.moveTo(o + n * 0.45, a + n * 0.45), e.lineTo(o + n * 0.85, a + n * 0.05), e.stroke();
        break;
      case "actor":
        e.arc(o, a - n * 0.5, n * 0.42, 0, Math.PI * 2), e.moveTo(o - n * 0.8, a + n), e.quadraticCurveTo(o, a - n * 0.1, o + n * 0.8, a + n), e.stroke();
        break;
      case "ai-agent":
        for (let s = 0; s < 4; s++) {
          const d = s * Math.PI / 2 + Math.PI / 4;
          e.moveTo(o, a), e.lineTo(o + Math.cos(d) * n, a + Math.sin(d) * n), e.moveTo(o, a), e.lineTo(o + Math.cos(d + Math.PI / 4) * n * 0.5, a + Math.sin(d + Math.PI / 4) * n * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(o - n * 0.45, a + n * 0.15, n * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(o + n * 0.1, a - n * 0.35, n * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(o + n * 0.55, a + n * 0.2, n * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [s, d] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(o + s * n, a + d * n, n * 0.85, n * 0.85);
        e.stroke();
        break;
      case "page":
        e.rect(o - n, a - n * 0.8, n * 2, n * 1.6), e.moveTo(o - n, a - n * 0.35), e.lineTo(o + n, a - n * 0.35), e.stroke(), e.beginPath(), e.arc(o - n * 0.7, a - n * 0.57, n * 0.09, 0, Math.PI * 2), e.fill();
        break;
      case "api":
        e.moveTo(o - n * 0.25, a - n), e.lineTo(o - n, a), e.lineTo(o - n * 0.25, a + n), e.moveTo(o + n * 0.25, a - n), e.lineTo(o + n, a), e.lineTo(o + n * 0.25, a + n), e.stroke();
        break;
      case "api-operation":
        e.moveTo(o - n, a), e.lineTo(o + n * 0.7, a), e.moveTo(o + n * 0.1, a - n * 0.5), e.lineTo(o + n * 0.8, a), e.lineTo(o + n * 0.1, a + n * 0.5), e.stroke();
        break;
      case "mcp-server":
        e.arc(o, a + n * 0.25, n * 0.6, 0, Math.PI), e.closePath(), e.moveTo(o - n * 0.35, a + n * 0.25), e.lineTo(o - n * 0.35, a - n * 0.7), e.moveTo(o + n * 0.35, a + n * 0.25), e.lineTo(o + n * 0.35, a - n * 0.7), e.stroke();
        break;
      default:
        e.arc(o, a, n * 0.3, 0, Math.PI * 2), e.fill();
    }
    e.restore();
  }
  /** Hover card: what the node is, what it holds, how to enter. Screen space, clamped to the canvas. */
  drawCard(e, t, i, n) {
    var R, j;
    const o = (t.children ?? []).flatMap(
      (V) => V.kind === "group" ? V.children ?? (V.children = this.childrenOf(V)) : [V]
    ), a = /* @__PURE__ */ new Map();
    for (const V of o) a.set(V.kind, (a.get(V.kind) ?? 0) + 1);
    const s = [];
    for (const [V, se] of a)
      if (s.push(`${se} ${se === 1 ? (Xi[V] ?? V).toLowerCase() : gp[V] ?? V}`), s.length === 4) {
        const C = [...a.keys()].length - 4;
        C > 0 && (s[3] += ` (+${C} tipos más)`);
        break;
      }
    const d = o.slice(0, 6).map((V) => ({ label: V.label.length > 30 ? V.label.slice(0, 29) + "…" : V.label, color: V.color })), r = o.length - d.length, c = t.label, g = Xi[t.kind] ?? t.kind, m = ((R = t.children) != null && R.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((j = t.children) != null && j.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const f = e.measureText(c).width;
    e.font = "11px system-ui, sans-serif";
    const y = Math.max(
      e.measureText(g).width,
      ...s.map((V) => e.measureText(V).width),
      ...d.map((V) => e.measureText(V.label).width + 12),
      e.measureText(m).width
    ), v = Math.min(300, Math.max(f, y) + 24), b = d.length ? 8 + d.length * 15 + (r > 0 ? 15 : 0) : 0, h = 40 + s.length * 15 + b + (m ? 18 : 0), l = this.radiusOf(t) * this.cam.k, u = this.cam.x + t.x * this.cam.k, x = this.cam.y + t.y * this.cam.k;
    let S = u + l + 14;
    S + v > i - 8 && (S = u - l - 14 - v), S = Math.max(8, Math.min(S, i - v - 8));
    const T = Math.max(8, Math.min(x - 10, n - h - 8));
    e.translate(S, T), e.fillStyle = this.pal("--modux-surface", "rgba(255,255,255,0.96)"), e.strokeStyle = this.pal("--modux-border-strong", "#cbd5e1"), e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, v, h, 8), e.fill(), e.stroke(), e.fillStyle = this.pal("--modux-text", "#0f172a"), e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(c, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(g, 12, 25), e.fillStyle = this.pal("--modux-text-dim", "#475569"), s.forEach((V, se) => e.fillText(V, 12, 41 + se * 15));
    let E = 41 + s.length * 15 + (d.length ? 8 : 0);
    d.forEach((V) => {
      e.fillStyle = V.color, e.beginPath(), e.arc(15, E + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = this.pal("--modux-text", "#334155"), e.fillText(V.label, 24, E), E += 15;
    }), r > 0 && (e.fillStyle = this.pal("--modux-text-faint", "#94a3b8"), e.fillText(`… y ${r} más`, 24, E)), m && (e.fillStyle = this.pal("--modux-text-faint", "#94a3b8"), e.fillText(m, 12, h - 16)), e.restore();
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
      const o = i[n], a = this.radiusOf(o) + 4 / this.cam.k;
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
        const n = Math.min(i.ax, i.bx), o = Math.max(i.ax, i.bx), a = Math.min(i.ay, i.by), s = Math.max(i.ay, i.by), d = this.visible().filter((r) => r.kind !== "root" && r.kind !== "group" && r.refId).filter((r) => r.x >= n && r.x <= o && r.y >= a && r.y <= s).map((r) => r.key);
        this.selected = new Set(i.additive ? [...this.selected, ...d] : d);
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
      o.forEach((a, s) => {
        this.materialize(a.parent);
        const d = i - n / 2 + n * (s + 0.5) / o.length;
        a.x = e.x + Math.cos(d) * 6, a.y = e.y + Math.sin(d) * 6, a.vx = Math.cos(d) * 7, a.vy = Math.sin(d) * 7, a.children || (a.children = this.childrenOf(a));
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
    const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, o = Math.exp(-e.deltaY * 12e-4), a = Math.min(2.5, Math.max(0.25, this.cam.k * o)), s = a / this.cam.k;
    this.cam.x = i - (i - this.cam.x) * s, this.cam.y = n - (n - this.cam.y) * s, this.cam.k = a;
  }
  render() {
    return w`
      <canvas
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @dblclick=${this.onDblClick}
        @wheel=${this.onWheel}
      ></canvas>
      ${this.renaming ? w`<input
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
        ${this._sugs.length ? w`<ul class="sugs">
              ${this._sugs.map(
      (e, t) => w`<li
                  class=${t === this._active ? "active" : ""}
                  @mouseenter=${() => this._active = t}
                  @click=${() => this.flyToNode(e)}
                >
                  <span class="dot" style="background:${e.color}"></span>
                  <span class="name">${e.label}</span>
                  <span class="path">${this.pathOf(e) || (Xi[e.kind] ?? e.kind)}</span>
                </li>`
    )}
            </ul>` : this._q.trim().length >= 2 ? w`<ul class="sugs"><li class="empty">sin resultados</li></ul>` : null}
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
        ${this._viewNaming ? w`
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
            ` : w`<button
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
    for (const a of [o.fromRef, o.toRef])
      i.has(a) || (i.add(a), n.push({ ref: a, name: a, type: "UNKNOWN" }));
  return [...t, ...n];
}
function ua(e) {
  const t = [];
  return e.map((i) => {
    const n = Math.max(0, i.depth ?? 0);
    for (let o = 0; o < n; o++) t[o] = t[o] || 1;
    return t[n] = (t[n] || 0) + 1, t.length = n + 1, t.join(".");
  });
}
function ma(e) {
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
function fa(e) {
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
function ha(e, t) {
  for (const i of e.boundedContexts) {
    const n = (i.domainEvents ?? []).find((o) => o.name === t) ?? (i.applicationEvents ?? []).find((o) => o.name === t);
    if (n) return n.id;
  }
  return null;
}
function xp(e, t) {
  const i = e.boundedContexts.find(
    (n) => (n.useCases ?? []).some((o) => o.id === t) || (n.queryServices ?? []).some((o) => o.id === t) || (n.readModels ?? []).some((o) => o.id === t)
  );
  return (i == null ? void 0 : i.id) ?? null;
}
function Ip(e, t, i) {
  const n = ma(e), o = e.flows.find(
    (d) => d.archetype === "TRIGGERS" && d.triggerEvent && d.targetUseCaseId === i.ref && d.triggerAggregateId === t.ref
  );
  if (o) return { kind: "EVENT", label: o.triggerEvent };
  const a = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ].filter((d) => d.sourceId === t.ref);
  for (const d of a) {
    const r = fa(e).get(d.domainEventId);
    if (!r) continue;
    if (e.flows.find(
      (m) => m.archetype === "TRIGGERS" && m.triggerEvent === r && m.targetUseCaseId === i.ref
    )) return { kind: "EVENT", label: r };
    if ((e.subscriptions ?? []).find(
      (m) => m.eventName === r && (m.actions ?? []).some((f) => f.type === "CallUseCase" && f.useCaseId === i.ref)
    )) return { kind: "EVENT", label: r };
  }
  const s = i.type !== "UNKNOWN" ? i.type : n.get(i.ref) ?? "UNKNOWN";
  return s === "QUERY_SERVICE" || s === "READ_MODEL" ? { kind: "QUERY" } : s === "EXTERNAL_SYSTEM" ? { kind: "EXTERNAL" } : { kind: "COMMAND" };
}
function ln(e, t) {
  const i = ma(e), n = fa(e), o = new Map((t.participants ?? []).map((a) => [a.ref, a]));
  return {
    typeOf: (a) => {
      var s, d;
      return (s = o.get(a)) != null && s.type && o.get(a).type !== "UNKNOWN" ? o.get(a).type : i.get(a) ?? ((d = o.get(a)) == null ? void 0 : d.type) ?? "UNKNOWN";
    },
    nameOf: (a) => {
      var s;
      return ((s = o.get(a)) == null ? void 0 : s.name) ?? n.get(a) ?? a;
    }
  };
}
function wp(e, t, i) {
  const n = Math.max(0, Math.min(e.length, i)), o = [...e];
  return o.splice(n, 0, t), o;
}
function kp(e, t, i) {
  const n = e.findIndex((s) => s.id === t);
  if (n < 0) return e;
  const o = e.filter((s) => s.id !== t), a = Math.max(0, Math.min(o.length, i));
  return o.splice(a, 0, e[n]), o;
}
function $p(e, t) {
  return e.filter((i) => i.id !== t);
}
function _p(e, t) {
  return {
    ...e,
    participants: (e.participants ?? []).filter((i) => i.ref !== t),
    messages: e.messages.filter((i) => i.fromRef !== t && i.toRef !== t)
  };
}
function bo(e, t, i) {
  var d;
  const n = t.fromRef, o = t.toRef, a = i(n), s = i(o);
  switch (t.kind) {
    case "COMMAND": {
      if (a === "USE_CASE" && s === "USE_CASE")
        return (e.useCaseCalls ?? []).some((r) => r.sourceId === n && r.targetId === o);
      if (a === "USE_CASE" && s === "AGGREGATE")
        return (e.aggregateCalls ?? []).some((r) => r.sourceId === n && r.targetId === o);
      if (a === "ACTOR" && (s === "USE_CASE" || s === "QUERY_SERVICE"))
        return (e.actorUses ?? []).some((r) => r.actorId === n && r.targetId === o);
      if (a === "API_OPERATION" && s === "USE_CASE")
        return (e.apis ?? []).some(
          (r) => r.operations.some((c) => c.id === n && c.targetUseCaseId === o)
        );
      if (a === "EXTERNAL_SYSTEM" && s === "USE_CASE")
        return (e.externalCalls ?? []).some(
          (r) => r.externalSystemId === n && r.useCaseId === o
        );
      if ((a === "PAGE" || a === "APP") && s === "USE_CASE") {
        const r = (e.pages ?? []).find((m) => m.id === n);
        if (r && (r.buttons ?? []).some((m) => m.useCaseId === o)) return !0;
        const c = (e.uiApps ?? []).find((m) => m.id === n), g = (m) => (m ?? []).some(
          (f) => f.useCaseId === o || g(f.children)
        );
        return !!c && g(c.menuItems);
      }
      return a === "AI_AGENT" && s === "USE_CASE" ? (e.agentUses ?? []).some((r) => r.agentId === n && r.useCaseId === o) : !1;
    }
    case "QUERY":
      return a === "USE_CASE" && s === "QUERY_SERVICE" ? (e.queryCalls ?? []).some((r) => r.sourceId === n && r.targetId === o) : a === "ACTOR" && s === "QUERY_SERVICE" ? (e.actorUses ?? []).some((r) => r.actorId === n && r.targetId === o) : a === "AI_AGENT" && s === "QUERY_SERVICE" ? (e.agentQueryUses ?? []).some(
        (r) => r.agentId === n && r.queryServiceId === o
      ) : a === "PAGE" && s === "QUERY_SERVICE" ? (e.pages ?? []).some((r) => r.id === n && r.listingQueryServiceId === o) : s === "READ_MODEL" ? (e.projections ?? []).some((r) => r.readModelId === o) : !1;
    case "EVENT": {
      const r = t.label ?? "", c = ha(e, r), g = !!c && [...e.emissions ?? [], ...e.useCaseEmissions ?? []].some(
        (f) => f.sourceId === n && f.domainEventId === c
      ) || // an aggregate-operation emission keyed by NAME (flows reference names, not ids)
      e.flows.some(
        (f) => f.archetype === "TRIGGERS" && f.triggerEvent === r && f.triggerAggregateId === n
      ), m = e.flows.some(
        (f) => f.archetype === "TRIGGERS" && f.triggerEvent === r && f.targetUseCaseId === o
      ) || (e.subscriptions ?? []).some(
        (f) => f.eventName === r && (f.actions ?? []).some((y) => y.type === "CallUseCase" && y.useCaseId === o)
      );
      return g && m;
    }
    case "EXTERNAL": {
      if (a === "USE_CASE" && s === "EXTERNAL_SYSTEM") {
        if ((e.externalUseCaseCalls ?? []).some(
          (g) => g.sourceId === n && g.targetId === o
        )) return !0;
        const c = e.externalSystems.find((g) => g.id === o);
        return !!((d = c == null ? void 0 : c.useCases) != null && d.some(
          (g) => (e.externalUseCaseCalls ?? []).some(
            (m) => m.sourceId === n && m.targetId === g.id
          )
        ));
      }
      return !1;
    }
  }
}
function Cp(e, t, i, n) {
  const o = t.fromRef, a = t.toRef, s = i(o), d = i(a), r = (c) => ({
    commands: [],
    hint: `Este enlace se cablea a mano: ${c}`
  });
  switch (t.kind) {
    case "COMMAND": {
      if (s === "USE_CASE" && d === "USE_CASE")
        return { commands: [{ kind: "add-use-case-call", sourceId: o, targetId: a }] };
      if (s === "USE_CASE" && d === "AGGREGATE")
        return { commands: [{ kind: "add-aggregate-call", sourceId: o, targetId: a }] };
      if (s === "ACTOR" && (d === "USE_CASE" || d === "QUERY_SERVICE"))
        return { commands: [{ kind: "add-actor-use", sourceId: o, targetId: a }] };
      if (s === "API_OPERATION" && d === "USE_CASE") {
        const c = (e.apis ?? []).find((g) => g.operations.some((m) => m.id === o));
        return c ? {
          commands: [
            { kind: "set-api-operation-target", apiId: c.id, id: o, targetUseCaseId: a }
          ]
        } : r("la operación no cuelga de ninguna API del catálogo");
      }
      return r(s === "PAGE" || s === "APP" ? "un botón (o entrada de menú) apuntando al caso de uso, en la ficha de la página/app" : `conecta ${n(o)} → ${n(a)} en el mapa del sistema`);
    }
    case "QUERY":
      return s === "USE_CASE" && d === "QUERY_SERVICE" ? { commands: [{ kind: "add-query-call", sourceId: o, targetId: a }] } : s === "ACTOR" && d === "QUERY_SERVICE" ? { commands: [{ kind: "add-actor-use", sourceId: o, targetId: a }] } : r(s === "PAGE" ? "el listing de la página apuntando al query service, en la ficha de la página" : `conecta ${n(o)} → ${n(a)} en el mapa del sistema`);
    case "EXTERNAL":
      return s === "USE_CASE" && d === "EXTERNAL_SYSTEM" ? { commands: [{ kind: "add-external-uc-call", sourceId: o, targetId: a }] } : r(`conecta ${n(o)} → ${n(a)} en el mapa del sistema`);
    case "EVENT": {
      const c = t.label ?? "";
      if (d !== "USE_CASE")
        return r("el destino de un evento debe ser un caso de uso (la suscripción reacciona)");
      const g = ha(e, c);
      if (!g)
        return r(`el evento «${c}» no existe en el catálogo — créalo primero en su contexto`);
      const m = [];
      if ([...e.emissions ?? [], ...e.useCaseEmissions ?? []].some(
        (v) => v.sourceId === o && v.domainEventId === g
      ) || m.push({ kind: "add-emission", sourceId: o, targetId: g }), !e.flows.some(
        (v) => v.archetype === "TRIGGERS" && v.triggerEvent === c && v.targetUseCaseId === a
      )) {
        const v = xp(e, a) ?? "";
        m.push({
          kind: "add-flow",
          id: `flow-${ce(c)}-${ce(n(a))}`,
          name: n(a),
          archetype: "TRIGGERS",
          triggerAggregateId: s === "AGGREGATE" ? o : "",
          triggerDomainServiceId: s === "DOMAIN_SERVICE" ? o : void 0,
          triggerUseCaseId: s === "USE_CASE" ? o : void 0,
          triggerEvent: c,
          targetId: v,
          targetUseCaseId: a
        });
      }
      return m.length ? { commands: m } : r("el evento ya está emitido y suscrito — falta asociarlo a este mensaje");
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
function Ep(e) {
  const t = ii(e), i = new Map(t.map((s, d) => [s.ref, `p${d + 1}`])), n = (s, d = !1) => {
    const r = s.replace(/[\r\n;]+/g, " ").trim();
    return d ? r.replace(/:/g, " -") : r;
  }, o = ["sequenceDiagram"];
  for (const s of t)
    o.push(`  participant ${i.get(s.ref)} as ${n(s.name, !0)}`);
  const a = ua(e.messages);
  return e.messages.forEach((s, d) => {
    const r = i.get(s.fromRef), c = i.get(s.toRef);
    if (!r || !c) return;
    const g = s.kind === "EVENT" ? "-->>" : "->>", m = [a[d], s.label ?? "", s.guard ? `[${s.guard}]` : ""].filter(Boolean).join(" ");
    o.push(`  ${r}${g}${c}: ${n(m)}`);
  }), o.join(`
`);
}
function vo(e) {
  const t = [], i = (n, o, a, s, d) => t.push({ ref: n, name: o, label: d ? `${o} (${d})` : o, type: a, group: s });
  for (const n of e.actors ?? []) i(n.id, n.name, "ACTOR", "Actores");
  for (const n of e.uiApps ?? []) i(n.id, n.name, "APP", "Apps");
  for (const n of e.pages ?? []) i(n.id, n.name, "PAGE", "Páginas");
  for (const n of e.boundedContexts) {
    for (const o of n.useCases ?? []) i(o.id, o.name, "USE_CASE", "Casos de uso", n.name);
    for (const o of (e.aggregates ?? []).filter((a) => a.boundedContextId === n.id))
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
function Sp(e) {
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
function Qi(e) {
  return [...e.model.aggregates ?? [], ...e.model.entities ?? []];
}
function Ap(e, t) {
  var i, n, o, a, s, d, r, c, g, m, f, y, v, b, h;
  switch (t.kind) {
    case "invert-archimate-relation":
      return [{ kind: "invert-archimate-relation", id: t.id }];
    case "add-relation":
      return [{ kind: "remove-relation", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-relation": {
      const l = e.model.relations.find(
        (u) => u.sourceId === t.sourceId && u.targetId === t.targetId
      );
      return l && l.type ? [{ kind: "set-relation-type", sourceId: t.sourceId, targetId: t.targetId, type: l.type }] : null;
    }
    case "set-relation-type": {
      const l = e.model.relations.find(
        (u) => u.sourceId === t.sourceId && u.targetId === t.targetId
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
      const l = (e.model.uiApps ?? []).find((u) => u.id === t.appId);
      return [{ kind: "set-app-header-page", appId: t.appId, pageId: (l == null ? void 0 : l.headerPageId) ?? null }];
    }
    case "set-app-model": {
      const l = (e.model.uiApps ?? []).find((u) => u.id === t.appId);
      return [{ kind: "set-app-model", appId: t.appId, modelId: (l == null ? void 0 : l.modelId) ?? null }];
    }
    case "add-model":
      return [{ kind: "remove-model", id: t.id }];
    case "add-model-mapping":
      return [{ kind: "remove-model-mapping", id: t.id }];
    case "remove-model-mapping": {
      const l = (e.model.modelMappings ?? []).find((u) => u.id === t.id);
      return !(l != null && l.sourceModelId) || !l.targetModelId ? null : [{
        kind: "add-model-mapping",
        id: l.id,
        name: l.name,
        sourceId: l.sourceModelId,
        targetId: l.targetModelId
      }];
    }
    case "remove-model": {
      const l = (e.model.models ?? []).find((x) => x.id === t.id);
      if (!l) return null;
      const u = [{ kind: "add-model", id: l.id, name: l.name }];
      for (const x of e.model.pages ?? []) {
        x.modelId === t.id && u.push({ kind: "set-page-model", pageId: x.id, modelId: t.id });
        const S = (T) => {
          for (const E of T ?? [])
            E.modelId === t.id && u.push({ kind: "set-page-component", pageId: x.id, componentId: E.id, modelId: t.id }), S(E.children);
        };
        S(x.content);
      }
      for (const x of e.model.uiApps ?? [])
        x.modelId === t.id && u.push({ kind: "set-app-model", appId: x.id, modelId: t.id });
      return u;
    }
    case "set-crud-detail":
    case "set-crud-create": {
      const l = (e.model.pages ?? []).find((x) => x.id === t.pageId), u = t.kind === "set-crud-detail";
      return [{
        kind: t.kind,
        pageId: t.pageId,
        targetId: (u ? l == null ? void 0 : l.crudDetailPageId : l == null ? void 0 : l.crudCreatePageId) ?? null,
        toAppId: (u ? l == null ? void 0 : l.crudDetailAppId : l == null ? void 0 : l.crudCreateAppId) ?? null
      }];
    }
    case "set-app-view-page": {
      const l = (e.model.uiApps ?? []).find((u) => u.id === t.appId);
      return [{ kind: "set-app-view-page", appId: t.appId, pageId: (l == null ? void 0 : l.viewPageId) ?? null }];
    }
    case "set-app-edit-page": {
      const l = (e.model.uiApps ?? []).find((u) => u.id === t.appId);
      return [{ kind: "set-app-edit-page", appId: t.appId, pageId: (l == null ? void 0 : l.editPageId) ?? null }];
    }
    case "set-app-home-page": {
      const l = (e.model.uiApps ?? []).find((u) => u.id === t.appId);
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
      const l = (((i = (e.model.pages ?? []).find((u) => u.id === t.pageId)) == null ? void 0 : i.wizardSteps) ?? []).find((u) => (u.id ?? u.pageId) === t.itemId);
      return l ? [{ kind: "set-wizard-step-page", pageId: t.pageId, itemId: t.itemId, targetId: l.pageId ?? null }] : null;
    }
    case "move-page-wizard-step": {
      const l = (((n = (e.model.pages ?? []).find((x) => x.id === t.pageId)) == null ? void 0 : n.wizardSteps) ?? []).map((x) => x.id ?? x.pageId), u = l.indexOf(t.targetId);
      return u < 0 ? null : [{
        kind: "move-page-wizard-step",
        pageId: t.pageId,
        targetId: t.targetId,
        beforeItemId: l[u + 1] ?? null
      }];
    }
    case "remove-page-wizard-step": {
      const l = (((o = (e.model.pages ?? []).find((u) => u.id === t.pageId)) == null ? void 0 : o.wizardSteps) ?? []).find((u) => (u.id ?? u.pageId) === t.targetId);
      return l ? [{
        kind: "add-page-wizard-step",
        pageId: t.pageId,
        targetId: l.pageId ?? null,
        label: l.label,
        itemId: l.id
      }] : null;
    }
    case "delete-ui-app": {
      const l = (e.model.uiApps ?? []).find((S) => S.id === t.id);
      if (!l) return null;
      const u = [{ kind: "create-ui-app", id: l.id, name: l.name, type: l.type }];
      l.headerPageId && u.push({ kind: "set-app-header-page", appId: l.id, pageId: l.headerPageId }), l.modelId && u.push({ kind: "set-app-model", appId: l.id, modelId: l.modelId }), l.viewPageId && u.push({ kind: "set-app-view-page", appId: l.id, pageId: l.viewPageId }), l.editPageId && u.push({ kind: "set-app-edit-page", appId: l.id, pageId: l.editPageId }), (l.homePageId || l.homeAppId) && u.push({
        kind: "set-app-home-page",
        appId: l.id,
        pageId: l.homePageId ?? null,
        toAppId: l.homeAppId ?? null
      });
      const x = (S, T) => {
        for (const E of S ?? [])
          u.push({
            kind: "add-menu-item",
            appId: l.id,
            label: E.label,
            itemId: E.id,
            parentId: T == null ? void 0 : T.id,
            parentLabel: T && !T.id ? T.label : void 0,
            pageId: E.pageId ?? null
          }), E.uiAdapterId && u.push({ kind: "set-menu-app", appId: l.id, toAppId: E.uiAdapterId, itemId: E.id, label: E.label }), E.useCaseId && u.push({ kind: "set-menu-use-case", appId: l.id, useCaseId: E.useCaseId, itemId: E.id, label: E.label }), E.aggregateId && u.push({ kind: "set-menu-aggregate", appId: l.id, aggregateId: E.aggregateId, itemId: E.id, label: E.label }), E.queryOperationId && u.push({
            kind: "set-menu-query-operation",
            appId: l.id,
            queryServiceId: E.queryServiceId ?? null,
            queryOperationId: E.queryOperationId,
            itemId: E.id,
            label: E.label
          }), x(E.children, E);
      };
      x(l.menuItems);
      for (const S of e.model.actorAppUses ?? [])
        S.appId === t.id && u.push({ kind: "add-actor-app", actorId: S.actorId, appId: t.id });
      return u;
    }
    case "delete-ui-page": {
      const l = (e.model.pages ?? []).find((x) => x.id === t.id);
      if (!l) return null;
      const u = [
        { kind: "create-ui-page", id: l.id, name: l.name, pageType: l.type ?? "FORM" }
      ];
      l.route && u.push({ kind: "set-page-route", pageId: l.id, path: l.route }), l.modelId && u.push({ kind: "set-page-model", pageId: l.id, modelId: l.modelId }), l.listingQueryServiceId && u.push({ kind: "set-page-listing", pageId: l.id, queryServiceId: l.listingQueryServiceId });
      for (const x of l.buttons ?? [])
        x.useCaseId && (u.push({ kind: "add-page-button", pageId: l.id, useCaseId: x.useCaseId, label: x.label }), x.mappingId && u.push({
          kind: "set-page-button",
          pageId: l.id,
          useCaseId: x.useCaseId,
          label: x.label ?? null,
          mappingId: x.mappingId
        }));
      for (const x of l.viewmodelFields ?? [])
        (x.stereotype || x.colspan || x.label) && u.push({
          kind: "set-page-field-config",
          pageId: l.id,
          fieldId: x.fieldId,
          stereotype: x.stereotype ?? null,
          colspan: x.colspan ?? null,
          label: x.label ?? null
        });
      (l.viewmodelFields ?? []).length && u.push({
        kind: "set-page-field-order",
        pageId: l.id,
        fieldIds: (l.viewmodelFields ?? []).map((x) => x.fieldId)
      });
      for (const x of l.content ?? [])
        u.push(...e.rebuildComponentOps(l.id, x, void 0, null).ops);
      for (const x of l.wizardSteps ?? [])
        u.push({
          kind: "add-page-wizard-step",
          pageId: l.id,
          targetId: x.pageId ?? null,
          label: x.label,
          itemId: x.id
        });
      return (l.crudDetailPageId || l.crudDetailAppId) && u.push({ kind: "set-crud-detail", pageId: l.id, targetId: l.crudDetailPageId ?? null, toAppId: l.crudDetailAppId ?? null }), (l.crudCreatePageId || l.crudCreateAppId) && u.push({ kind: "set-crud-create", pageId: l.id, targetId: l.crudCreatePageId ?? null, toAppId: l.crudCreateAppId ?? null }), u;
    }
    case "add-menu-item":
      return [{ kind: "remove-menu-item", appId: t.appId, itemId: t.itemId, label: t.label }];
    case "remove-menu-item":
    case "set-menu-page":
    case "set-menu-app":
    case "set-menu-use-case":
    case "set-menu-aggregate":
    case "set-menu-query-operation": {
      const l = (e.model.uiApps ?? []).find((S) => S.id === t.appId), u = (S) => {
        for (const T of S ?? []) {
          if (t.itemId ? T.id === t.itemId : T.label === t.label) return T;
          const E = u(T.children);
          if (E) return E;
        }
        return null;
      }, x = t.itemId || t.label ? u(l == null ? void 0 : l.menuItems) : null;
      return x ? t.kind === "remove-menu-item" ? [{
        kind: "add-menu-item",
        appId: t.appId,
        label: x.label,
        pageId: x.pageId ?? null,
        itemId: x.id
      }] : t.kind === "set-menu-app" ? [{
        kind: "set-menu-app",
        appId: t.appId,
        toAppId: x.uiAdapterId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-use-case" ? [{
        kind: "set-menu-use-case",
        appId: t.appId,
        useCaseId: x.useCaseId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-aggregate" ? [{
        kind: "set-menu-aggregate",
        appId: t.appId,
        aggregateId: x.aggregateId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : t.kind === "set-menu-query-operation" ? [{
        kind: "set-menu-query-operation",
        appId: t.appId,
        queryServiceId: x.queryServiceId ?? null,
        queryOperationId: x.queryOperationId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : [{
        kind: "set-menu-page",
        appId: t.appId,
        pageId: x.pageId ?? null,
        itemId: t.itemId,
        label: t.label
      }] : null;
    }
    case "add-page-button":
      return [{ kind: "remove-page-button", pageId: t.pageId, useCaseId: t.useCaseId }];
    case "remove-page-button": {
      const l = (e.model.pages ?? []).find((x) => x.id === t.pageId), u = ((l == null ? void 0 : l.buttons) ?? []).find((x) => x.useCaseId === t.useCaseId);
      return u ? [{ kind: "add-page-button", pageId: t.pageId, useCaseId: t.useCaseId, label: u.label }] : null;
    }
    case "rename-ui-page": {
      const l = (e.model.pages ?? []).find((u) => u.id === t.pageId);
      return l ? [{ kind: "rename-ui-page", pageId: t.pageId, name: l.name }] : null;
    }
    case "set-page-type": {
      const l = (e.model.pages ?? []).find((u) => u.id === t.pageId);
      return l ? [{ kind: "set-page-type", pageId: t.pageId, pageType: l.type ?? "FORM" }] : null;
    }
    case "set-page-route": {
      const l = (e.model.pages ?? []).find((u) => u.id === t.pageId);
      return l != null && l.route ? [{ kind: "set-page-route", pageId: t.pageId, path: l.route }] : null;
    }
    case "set-page-button": {
      const l = (e.model.pages ?? []).find((x) => x.id === t.pageId), u = ((l == null ? void 0 : l.buttons) ?? []).find((x) => x.useCaseId === t.useCaseId);
      return u ? [{
        kind: "set-page-button",
        pageId: t.pageId,
        useCaseId: t.useCaseId,
        label: u.label ?? null,
        mappingId: u.mappingId ?? null
      }] : null;
    }
    case "add-page-component":
      return [{ kind: "remove-page-component", pageId: t.pageId, componentId: t.componentId }];
    case "set-page-component":
    case "remove-page-component":
    case "move-page-component": {
      const l = (e.model.pages ?? []).find((R) => R.id === t.pageId);
      let u = null, x = null, S = null;
      const T = (R, j) => {
        var se;
        const V = R ?? [];
        for (let C = 0; C < V.length; C++)
          V[C].id === t.componentId && (u = V[C], x = j, S = ((se = V[C + 1]) == null ? void 0 : se.id) ?? null), T(V[C].children, V[C]);
      };
      if (T(l == null ? void 0 : l.content, null), !u) return null;
      const E = u;
      return t.kind === "set-page-component" ? [{
        kind: "set-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        title: E.title ?? null,
        text: E.text ?? null,
        label: E.label ?? null,
        useCaseId: E.useCaseId ?? null,
        mappingId: E.mappingId ?? null,
        modelId: E.modelId ?? null,
        queryServiceId: E.queryServiceId ?? null,
        queryOperationId: E.queryOperationId ?? null,
        fieldId: E.fieldId ?? null,
        stereotype: E.stereotype ?? null,
        colspan: E.colspan ?? null
      }] : t.kind === "move-page-component" ? [{
        kind: "move-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        parentComponentId: x === null ? null : x.id,
        beforeComponentId: S
      }] : e.rebuildComponentOps(
        t.pageId,
        E,
        x === null ? void 0 : x.id,
        S
      ).ops;
    }
    case "set-page-listing": {
      const l = (e.model.pages ?? []).find((u) => u.id === t.pageId);
      return [{ kind: "set-page-listing", pageId: t.pageId, queryServiceId: (l == null ? void 0 : l.listingQueryServiceId) ?? null }];
    }
    case "set-page-model": {
      const l = (e.model.pages ?? []).find((u) => u.id === t.pageId);
      return [{ kind: "set-page-model", pageId: t.pageId, modelId: (l == null ? void 0 : l.modelId) ?? null }];
    }
    case "set-page-field-config": {
      const l = (((a = (e.model.pages ?? []).find((u) => u.id === t.pageId)) == null ? void 0 : a.viewmodelFields) ?? []).find((u) => u.fieldId === t.fieldId);
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
      const l = (((s = (e.model.pages ?? []).find((u) => u.id === t.pageId)) == null ? void 0 : s.viewmodelFields) ?? []).map((u) => u.fieldId);
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
      const l = e.model.boundedContexts.find((x) => x.id === t.id);
      if (!l) return null;
      const u = e.model.relations.filter(
        (x) => (x.sourceId === t.id || x.targetId === t.id) && x.type != null
      );
      return [
        { kind: "add-boundedContext", id: l.id, name: l.name, subdomainType: l.subdomainType ?? "GENERIC" },
        // Re-annotate the derived pairs this boundedContext participated in.
        ...u.map(
          (x) => ({
            kind: "set-relation-type",
            sourceId: x.sourceId,
            targetId: x.targetId,
            type: x.type
          })
        )
      ];
    }
    case "add-aggregate":
      return [{ kind: "remove-aggregate", id: t.id }];
    case "remove-aggregate": {
      const l = (e.model.aggregates ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "add-aggregate", id: l.id, name: l.name, boundedContextId: l.boundedContextId }] : null;
    }
    case "add-entity":
      return [{ kind: "remove-entity", id: t.id, aggregateId: t.aggregateId }];
    case "remove-entity": {
      const l = (e.model.entities ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "add-entity", id: l.id, name: l.name, aggregateId: l.aggregateId }] : null;
    }
    case "add-value-object":
      return [{ kind: "remove-value-object", id: t.id, aggregateId: t.aggregateId }];
    case "remove-value-object": {
      const l = (e.model.valueObjects ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "add-value-object", id: l.id, name: l.name, aggregateId: l.aggregateId, type: l.type }] : null;
    }
    case "set-value-object-aggregate": {
      const l = (e.model.valueObjects ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "set-value-object-aggregate", id: t.id, aggregateId: l.aggregateId }] : null;
    }
    case "set-entity-aggregate": {
      const l = (e.model.entities ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "set-entity-aggregate", id: t.id, aggregateId: l.aggregateId }] : null;
    }
    case "add-field":
      return [{ kind: "remove-field", id: t.id, ownerId: t.ownerId }];
    case "remove-field": {
      const l = Qi(e).find((x) => (x.fields ?? []).some((S) => S.id === t.id)), u = (d = l == null ? void 0 : l.fields) == null ? void 0 : d.find((x) => x.id === t.id);
      return l && u ? [{ kind: "add-field", id: u.id, name: u.name, ownerId: l.id, type: u.typeKind, targetId: u.typeRef }] : null;
    }
    case "set-field-type": {
      const l = Qi(e).flatMap((u) => u.fields ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "set-field-type", id: t.id, type: l.typeKind, targetId: l.typeRef }] : null;
    }
    case "set-field-required": {
      const l = Qi(e).flatMap((u) => u.fields ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "set-field-required", id: t.id, required: l.required }] : null;
    }
    case "add-invariant":
      return [{ kind: "remove-invariant", id: t.id }];
    case "remove-invariant": {
      const u = [
        ...e.model.aggregates ?? [],
        ...e.model.valueObjects ?? [],
        ...e.model.entities ?? []
      ].find((S) => (S.invariants ?? []).some((T) => T.id === t.id)), x = (r = u == null ? void 0 : u.invariants) == null ? void 0 : r.find((S) => S.id === t.id);
      return u && x ? [{ kind: "add-invariant", ownerId: u.id, id: x.id, name: x.name }] : null;
    }
    case "add-domain-event":
      return [{ kind: "remove-domain-event", id: t.id }];
    case "add-query-service":
      return [{ kind: "remove-query-service", id: t.id }];
    case "remove-query-service": {
      for (const l of e.model.boundedContexts) {
        const u = (l.queryServices ?? []).find((x) => x.id === t.id);
        if (u) return [{ kind: "add-query-service", id: u.id, name: u.name, boundedContextId: l.id }];
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
        (u) => u.sourceId === t.sourceId && u.targetId === t.targetId
      );
      return l ? [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: l.type }] : [{ kind: "remove-external-dependency", sourceId: t.sourceId, targetId: t.targetId }];
    }
    case "remove-external-dependency": {
      const l = (e.model.externalSystemDependencies ?? []).find(
        (u) => u.sourceId === t.sourceId && u.targetId === t.targetId
      );
      return [{ kind: "add-external-dependency", sourceId: t.sourceId, targetId: t.targetId, type: l == null ? void 0 : l.type }];
    }
    case "add-proxy-api":
      return [{ kind: "remove-proxy-api", id: t.id }];
    case "remove-proxy-api": {
      const l = (e.model.proxyApis ?? []).find((u) => u.id === t.id);
      return l ? [{
        kind: "add-proxy-api",
        id: l.id,
        name: l.name,
        targetId: l.targetApiId,
        boundedContextId: l.publishedByExternalSystemId
      }] : null;
    }
    case "set-proxy-target": {
      const l = (e.model.proxyApis ?? []).find((u) => u.id === t.id);
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
        (u) => u.apiId === t.apiId && u.operationId === t.operationId && u.boundedContextId === t.boundedContextId
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
        (u) => u.apiId === t.apiId && u.operationId === t.operationId && u.boundedContextId === t.boundedContextId
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
      const l = (e.model.apis ?? []).find((u) => u.id === t.id) ?? (e.model.proxyApis ?? []).find((u) => u.id === t.id);
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
        const u = (l.useCases ?? []).find((x) => x.id === t.id);
        if (u)
          return [
            { kind: "add-use-case", id: u.id, name: u.name, boundedContextId: l.id, policy: u.policy }
          ];
      }
      return null;
    }
    case "add-external-use-case":
      return [{ kind: "remove-external-use-case", id: t.id }];
    case "remove-external-use-case": {
      for (const l of e.model.externalSystems) {
        const u = (l.useCases ?? []).find((x) => x.id === t.id);
        if (u)
          return [{ kind: "add-external-use-case", id: u.id, name: u.name, boundedContextId: l.id }];
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
      const l = (e.model.notifications ?? []).find((x) => x.id === t.id);
      if (!(l != null && l.ownerBoundedContextId)) return null;
      const u = [
        { kind: "add-notification", id: l.id, name: l.name, boundedContextId: l.ownerBoundedContextId, type: (l.channels ?? [])[0] }
      ];
      l.eventId && u.push({ kind: "set-notification-event", id: l.id, targetId: l.eventId });
      for (const x of l.recipientRoleIds ?? []) u.push({ kind: "add-notification-recipient", id: l.id, roleId: x });
      return u;
    }
    case "set-notification-event": {
      const l = (e.model.notifications ?? []).find((u) => u.id === t.id);
      return [{ kind: "set-notification-event", id: t.id, targetId: (l == null ? void 0 : l.eventId) ?? null }];
    }
    case "add-notification-recipient":
      return [{ kind: "remove-notification-recipient", id: t.id, roleId: t.roleId }];
    case "remove-notification-recipient":
      return [{ kind: "add-notification-recipient", id: t.id, roleId: t.roleId }];
    case "add-document":
      return [{ kind: "remove-document", id: t.id }];
    case "remove-document": {
      const l = (e.model.documents ?? []).find((x) => x.id === t.id);
      if (!(l != null && l.ownerBoundedContextId)) return null;
      const u = [
        { kind: "add-document", id: l.id, name: l.name, boundedContextId: l.ownerBoundedContextId, type: l.kind }
      ];
      return l.modelId && u.push({ kind: "set-document-model", id: l.id, modelId: l.modelId }), l.queryServiceId && u.push({ kind: "set-document-query", id: l.id, queryServiceId: l.queryServiceId, queryOperationId: l.queryOperationId ?? null }), u;
    }
    case "set-document-model": {
      const l = (e.model.documents ?? []).find((u) => u.id === t.id);
      return [{ kind: "set-document-model", id: t.id, modelId: (l == null ? void 0 : l.modelId) ?? null }];
    }
    case "set-document-query": {
      const l = (e.model.documents ?? []).find((u) => u.id === t.id);
      return [{ kind: "set-document-query", id: t.id, queryServiceId: (l == null ? void 0 : l.queryServiceId) ?? null, queryOperationId: (l == null ? void 0 : l.queryOperationId) ?? null }];
    }
    case "add-identity-provider":
      return [{ kind: "remove-identity-provider", id: t.id }];
    case "remove-identity-provider": {
      const l = (e.model.identityProviders ?? []).find((x) => x.id === t.id);
      if (!l) return null;
      const u = [
        { kind: "add-identity-provider", id: l.id, name: l.name, type: l.type }
      ];
      l.publishedByExternalSystemId && u.push({ kind: "set-idp-publisher", id: l.id, targetId: l.publishedByExternalSystemId });
      for (const x of e.model.boundedContexts)
        x.identityProviderId === t.id && u.push({ kind: "set-identity-provider", id: x.id, targetId: t.id });
      for (const x of e.model.uiApps ?? [])
        x.identityProviderId === t.id && u.push({ kind: "set-identity-provider", id: x.id, targetId: t.id });
      for (const x of e.model.etlFlows ?? [])
        x.identityProviderId === t.id && u.push({ kind: "set-identity-provider", id: x.id, targetId: t.id });
      return u;
    }
    case "set-idp-publisher": {
      const l = (e.model.identityProviders ?? []).find((u) => u.id === t.id);
      return [{ kind: "set-idp-publisher", id: t.id, targetId: (l == null ? void 0 : l.publishedByExternalSystemId) ?? null }];
    }
    case "set-identity-provider": {
      const l = ((c = e.model.boundedContexts.find((u) => u.id === t.id)) == null ? void 0 : c.identityProviderId) ?? ((g = (e.model.uiApps ?? []).find((u) => u.id === t.id)) == null ? void 0 : g.identityProviderId) ?? ((m = (e.model.etlFlows ?? []).find((u) => u.id === t.id)) == null ? void 0 : m.identityProviderId) ?? null;
      return [{ kind: "set-identity-provider", id: t.id, targetId: l }];
    }
    case "add-etl-flow":
      return [{ kind: "remove-etl-flow", id: t.id }];
    case "remove-etl-flow": {
      const l = (e.model.etlFlows ?? []).find((u) => u.id === t.id);
      return !l || !l.ownerBoundedContextId ? null : [
        { kind: "add-etl-flow", id: l.id, name: l.name, boundedContextId: l.ownerBoundedContextId },
        ...(l.steps ?? []).map((u) => ({
          kind: "add-etl-step",
          etlFlowId: l.id,
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
      return [{ kind: "remove-etl-step", etlFlowId: t.etlFlowId, id: t.id }];
    case "remove-etl-step": {
      const l = (((f = (e.model.etlFlows ?? []).find((u) => u.id === t.etlFlowId)) == null ? void 0 : f.steps) ?? []).find((u) => u.id === t.id);
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
        (x) => (x.scheduledTriggers ?? []).some((S) => S.id === t.id)
      ), u = ((l == null ? void 0 : l.scheduledTriggers) ?? []).find((x) => x.id === t.id);
      return !l || !u ? null : [{
        kind: "add-scheduled-trigger",
        id: u.id,
        name: u.name,
        boundedContextId: l.id,
        cronExpression: u.cronExpression,
        targetUseCaseId: u.useCaseId
      }];
    }
    case "set-scheduled-trigger-target": {
      const l = e.model.boundedContexts.flatMap((u) => u.scheduledTriggers ?? []).find((u) => u.id === t.id);
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
      const l = e.model.externalSystems.find((u) => u.id === t.id);
      return l ? [{ kind: "add-external-system", id: l.id, name: l.name }] : null;
    }
    case "add-ai-agent":
      return [{ kind: "remove-ai-agent", id: t.id }];
    case "remove-ai-agent": {
      const l = (e.model.aiAgents ?? []).find((u) => u.id === t.id);
      return l ? [
        { kind: "add-ai-agent", id: l.id, name: l.name, external: l.external },
        ...(e.model.agentUses ?? []).filter((u) => u.agentId === t.id).map((u) => ({ kind: "add-agent-use", sourceId: t.id, targetId: u.useCaseId })),
        ...(e.model.agentExternalUses ?? []).filter((u) => u.agentId === t.id).map((u) => ({
          kind: "add-agent-external-use",
          sourceId: t.id,
          targetId: u.externalUseCaseId
        })),
        ...(e.model.agentMcpUses ?? []).filter((u) => u.agentId === t.id).map((u) => ({ kind: "add-agent-mcp", sourceId: t.id, targetId: u.mcpServerId })),
        ...(e.model.agentGatewayUses ?? []).filter((u) => u.agentId === t.id).map((u) => ({ kind: "add-agent-gateway", sourceId: t.id, targetId: u.gatewayId })),
        ...(e.model.agentApiOpUses ?? []).filter((u) => u.agentId === t.id).map((u) => ({
          kind: "add-agent-api-operation",
          sourceId: t.id,
          targetId: u.apiOperationId
        })),
        ...(e.model.agentQueryUses ?? []).filter((u) => u.agentId === t.id).map((u) => ({ kind: "add-agent-query", sourceId: t.id, targetId: u.queryServiceId })),
        ...(e.model.agentRags ?? []).filter((u) => u.agentId === t.id).map((u) => ({ kind: "add-agent-rag", sourceId: t.id, targetId: u.ragId })),
        ...(e.model.agentDelegations ?? []).filter((u) => u.agentId === t.id || u.delegateAgentId === t.id).map((u) => ({
          kind: "add-agent-delegate",
          sourceId: u.agentId,
          targetId: u.delegateAgentId
        })),
        ...(e.model.actorAgentUses ?? []).filter((u) => u.agentId === t.id).map((u) => ({ kind: "add-actor-agent", sourceId: u.actorId, targetId: t.id })),
        ...(e.model.agentTriggers ?? []).filter((u) => u.agentId === t.id).map((u) => ({ kind: "add-agent-trigger", sourceId: u.eventId, targetId: t.id }))
      ] : null;
    }
    case "add-mcp-gateway":
      return [{ kind: "remove-mcp-gateway", id: t.id }];
    case "remove-mcp-gateway": {
      const l = (e.model.mcpGateways ?? []).find((u) => u.id === t.id);
      return l ? [
        { kind: "add-mcp-gateway", id: l.id, name: l.name },
        ...[
          ...l.mcpServerIds ?? [],
          ...l.apiIds ?? [],
          ...l.apiOperationIds ?? [],
          ...l.useCaseIds ?? [],
          ...l.ragIds ?? []
        ].map((u) => ({ kind: "add-gateway-exposure", sourceId: t.id, targetId: u })),
        ...(e.model.agentGatewayUses ?? []).filter((u) => u.gatewayId === t.id).map((u) => ({ kind: "add-agent-gateway", sourceId: u.agentId, targetId: t.id }))
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
        const u = (l.mcpServers ?? []).find((x) => x.id === t.id);
        if (u)
          return [
            { kind: "add-mcp-server", id: u.id, name: u.name, boundedContextId: l.id, uri: u.uri },
            ...(e.model.agentMcpUses ?? []).filter((x) => x.mcpServerId === t.id).map(
              (x) => ({
                kind: "add-agent-mcp",
                sourceId: x.agentId,
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
      const l = (e.model.rags ?? []).find((u) => u.id === t.id);
      return l ? [
        { kind: "add-rag", id: l.id, name: l.name },
        ...(e.model.agentRags ?? []).filter((u) => u.ragId === t.id).map(
          (u) => ({
            kind: "add-agent-rag",
            sourceId: u.agentId,
            targetId: t.id
          })
        ),
        ...(l.sourceReadModelIds ?? []).map(
          (u) => ({ kind: "add-rag-source", sourceId: t.id, targetId: u })
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
      const l = (e.model.actors ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "add-actor", id: l.id, name: l.name }] : null;
    }
    case "add-note":
      return [{ kind: "remove-note", id: t.id }];
    case "remove-note": {
      const l = (e.model.notes ?? []).find((u) => u.id === t.id);
      return l ? [
        { kind: "add-note", id: l.id, name: l.text },
        ...[...l.targetIds ?? [], ...l.edgeRefs ?? []].map(
          (u) => ({ kind: "note-attach", id: l.id, targetId: u })
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
      const l = (e.model.urls ?? []).find((u) => u.id === t.id);
      return l ? [
        { kind: "add-url", id: l.id, name: l.name, uri: l.url },
        ...(e.model.services ?? []).filter((u) => (u.urlIds ?? []).includes(t.id)).map((u) => ({ kind: "add-service-url", serviceId: u.id, id: t.id }))
      ] : null;
    }
    case "add-service-url":
      return [{ kind: "remove-service-url", serviceId: t.serviceId, id: t.id }];
    case "remove-service-url":
      return [{ kind: "add-service-url", serviceId: t.serviceId, id: t.id }];
    case "remove-area": {
      const l = (e.model.areas ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "add-area", id: l.id, name: l.name }] : null;
    }
    case "add-application-event":
      return [{ kind: "remove-application-event", id: t.id }];
    case "remove-application-event": {
      for (const l of e.model.boundedContexts) {
        const u = (l.applicationEvents ?? []).find((x) => x.id === t.id);
        if (u)
          return [{ kind: "add-application-event", id: u.id, name: u.name, boundedContextId: l.id }];
      }
      return null;
    }
    case "add-domain-service":
      return [{ kind: "remove-domain-service", id: t.id }];
    case "remove-domain-service": {
      for (const l of e.model.boundedContexts) {
        const u = (l.domainServices ?? []).find((x) => x.id === t.id);
        if (u) return [{ kind: "add-domain-service", id: u.id, name: u.name, boundedContextId: l.id }];
      }
      return null;
    }
    case "add-read-model":
      return [{ kind: "remove-read-model", id: t.id }];
    case "add-projection":
      return [{ kind: "remove-projection", id: t.id }];
    case "remove-projection": {
      const l = (e.model.projections ?? []).find((u) => u.id === t.id);
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
        const u = (l.tables ?? []).find((x) => x.id === t.id);
        if (u) return [{ kind: "add-external-table", id: u.id, name: u.name, boundedContextId: l.id }];
      }
      return null;
    }
    case "add-rag-content-source":
      return [{ kind: "remove-rag-content-source", sourceId: t.sourceId, uri: t.uri }];
    case "remove-rag-content-source": {
      const l = (v = (y = (e.model.rags ?? []).find((u) => u.id === t.sourceId)) == null ? void 0 : y.contentSources) == null ? void 0 : v.find((u) => u.uri === t.uri);
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
      const l = (e.model.apis ?? []).find((u) => u.id === t.id);
      return l ? [
        { kind: "add-api", id: l.id, name: l.name },
        ...l.operations.map(
          (u) => ({
            kind: "add-api-operation",
            apiId: l.id,
            id: u.id,
            name: u.name,
            httpMethod: u.httpMethod,
            path: u.path,
            boundedContextId: u.targetBoundedContextId,
            targetUseCaseId: u.targetUseCaseId
          })
        )
      ] : null;
    }
    case "add-api-operation":
      return [{ kind: "remove-api-operation", apiId: t.apiId, id: t.id }];
    case "remove-api-operation": {
      const l = (b = (e.model.apis ?? []).find((u) => u.id === t.apiId)) == null ? void 0 : b.operations.find((u) => u.id === t.id);
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
      const l = (h = (e.model.apis ?? []).find((u) => u.id === t.apiId)) == null ? void 0 : h.operations.find((u) => u.id === t.id);
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
        const u = (l.readModels ?? []).find((x) => x.id === t.id);
        if (u != null && u.aggregateId)
          return [{ kind: "add-read-model", id: u.id, name: u.name, aggregateId: u.aggregateId }];
      }
      return null;
    }
    case "remove-domain-event": {
      for (const l of e.model.boundedContexts) {
        const u = (l.domainEvents ?? []).find((x) => x.id === t.id);
        if (u) return [{ kind: "add-domain-event", id: u.id, name: u.name, boundedContextId: l.id }];
      }
      return null;
    }
    case "rename-element": {
      const u = (t.type === "boundedContext" ? e.model.boundedContexts : t.type === "aggregate" ? e.model.aggregates ?? [] : t.type === "domain-event" ? e.model.boundedContexts.flatMap((x) => x.domainEvents ?? []) : t.type === "read-model" ? e.model.boundedContexts.flatMap((x) => x.readModels ?? []) : t.type === "domain-service" ? e.model.boundedContexts.flatMap((x) => x.domainServices ?? []) : t.type === "query-service" ? e.model.boundedContexts.flatMap((x) => x.queryServices ?? []) : t.type === "use-case" ? e.model.boundedContexts.flatMap((x) => x.useCases ?? []) : t.type === "external-use-case" ? e.model.externalSystems.flatMap((x) => x.useCases ?? []) : t.type === "mcp-server" ? e.model.externalSystems.flatMap((x) => x.mcpServers ?? []) : t.type === "application-event" ? e.model.boundedContexts.flatMap((x) => x.applicationEvents ?? []) : t.type === "external-system" ? e.model.externalSystems : t.type === "actor" ? e.model.actors ?? [] : t.type === "ai-agent" ? e.model.aiAgents ?? [] : t.type === "mcp-gateway" ? e.model.mcpGateways ?? [] : e.model.entities ?? []).find((x) => x.id === t.id);
      return u ? [{ kind: "rename-element", type: t.type, id: t.id, name: u.name }] : null;
    }
    case "add-flow":
      return [{ kind: "remove-flow", id: t.id }];
    case "remove-flow": {
      const l = e.model.flows.find((u) => u.id === t.id);
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
      const l = (e.model.views ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "add-view", id: l.id, name: l.name, memberIds: l.memberIds }] : null;
    }
    case "add-process":
      return [{ kind: "remove-process", id: t.id }];
    case "add-process-step":
      return [{ kind: "remove-process-step", processId: t.processId, id: t.id }];
    case "remove-process-step": {
      const l = (e.model.processes ?? []).find((S) => S.id === t.processId), u = (l == null ? void 0 : l.steps.findIndex((S) => S.id === t.id)) ?? -1;
      if (!l || u < 0) return null;
      const x = l.steps[u];
      return [
        {
          kind: "add-process-step",
          processId: t.processId,
          id: x.id,
          name: x.name,
          stepType: x.type,
          roleId: x.roleId,
          deadline: x.deadline,
          useCaseId: x.useCaseId,
          compensationUseCaseId: x.compensationUseCaseId,
          afterStepId: u > 0 ? l.steps[u - 1].id : void 0
        }
      ];
    }
    case "move-process-step": {
      const l = (e.model.processes ?? []).find((x) => x.id === t.processId), u = (l == null ? void 0 : l.steps.findIndex((x) => x.id === t.id)) ?? -1;
      return !l || u < 0 ? null : [
        {
          kind: "move-process-step",
          processId: t.processId,
          id: t.id,
          afterStepId: u > 0 ? l.steps[u - 1].id : void 0
        }
      ];
    }
    case "update-process-step": {
      const l = (e.model.processes ?? []).find((x) => x.id === t.processId), u = l == null ? void 0 : l.steps.find((x) => x.id === t.id);
      return u ? [
        {
          kind: "update-process-step",
          processId: t.processId,
          id: t.id,
          roleId: u.roleId,
          deadline: u.deadline,
          compensationUseCaseId: u.compensationUseCaseId
        }
      ] : null;
    }
    case "remove-process": {
      const l = (e.model.processes ?? []).find((u) => u.id === t.id);
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
      const l = (e.model.workflows ?? []).find((u) => u.id === t.id);
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
      const l = (e.model.workflows ?? []).find((S) => S.id === t.workflowId), u = (l == null ? void 0 : l.steps.findIndex((S) => S.id === t.id)) ?? -1;
      if (!l || u < 0) return null;
      const x = l.steps[u];
      return [
        {
          kind: "add-workflow-step",
          workflowId: t.workflowId,
          id: x.id,
          name: x.name,
          emittedEventName: x.emittedEventName,
          targetUseCaseId: x.targetUseCaseId,
          completionEventName: x.completionEventName,
          dependsOnStepIds: x.dependsOnStepIds,
          afterStepId: u > 0 ? l.steps[u - 1].id : void 0
        },
        // Removing a step also strips it from its dependents; restore those edges.
        ...l.steps.filter((S) => S.id !== t.id && (S.dependsOnStepIds ?? []).includes(t.id)).map(
          (S) => ({
            kind: "add-workflow-dependency",
            workflowId: t.workflowId,
            id: S.id,
            dependsOnStepId: t.id
          })
        )
      ];
    }
    case "update-workflow-step": {
      const l = (e.model.workflows ?? []).find((x) => x.id === t.workflowId), u = l == null ? void 0 : l.steps.find((x) => x.id === t.id);
      return u ? [
        {
          kind: "update-workflow-step",
          workflowId: t.workflowId,
          id: t.id,
          emittedEventName: u.emittedEventName,
          targetUseCaseId: u.targetUseCaseId,
          completionEventName: u.completionEventName
        }
      ] : null;
    }
    case "set-workflow-trigger": {
      const l = (e.model.workflows ?? []).find((u) => u.id === t.id);
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
      const l = (e.model.interactions ?? []).find((u) => u.id === t.id);
      return l ? [xt(l)] : [{ kind: "remove-interaction", id: t.id }];
    }
    case "remove-interaction": {
      const l = (e.model.interactions ?? []).find((u) => u.id === t.id);
      return l ? [xt(l)] : null;
    }
  }
  return null;
}
const Mp = [
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
  return Object.entries(Ao).map(([n, o]) => ({
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
function Pp(e, t, i) {
  const n = e.model, o = [], a = (E, R) => o.push({ id: E, apply: R }), s = new Set(n.boundedContexts.flatMap((E) => (E.useCases ?? []).map((R) => R.id))), d = new Set(n.boundedContexts.flatMap((E) => (E.queryServices ?? []).map((R) => R.id))), r = new Set(n.boundedContexts.flatMap((E) => (E.domainEvents ?? []).map((R) => R.id))), c = new Set(n.boundedContexts.flatMap((E) => (E.applicationEvents ?? []).map((R) => R.id))), g = /* @__PURE__ */ new Set([
    ...(n.aggregates ?? []).map((E) => E.id),
    ...n.boundedContexts.flatMap((E) => (E.domainServices ?? []).map((R) => R.id))
  ]), m = new Set(n.externalSystems.flatMap((E) => (E.useCases ?? []).map((R) => R.id))), f = (E) => (n.aiAgents ?? []).some((R) => R.id === E), y = (E) => (n.actors ?? []).some((R) => R.id === E), v = (E) => n.externalSystems.some((R) => R.id === E), b = (E) => n.boundedContexts.some((R) => R.id === E), h = (E) => (n.aggregates ?? []).some((R) => R.id === E), l = new Set((n.uis ?? []).map((E) => E.id)), u = new Set((n.uiApps ?? []).map((E) => E.id)), x = new Set((n.pages ?? []).map((E) => E.id));
  {
    const E = l.has(t) ? t : l.has(i) ? i : null, R = E === t ? i : t;
    E && b(R) && a("ui-composition", () => {
      e.command({ kind: "set-ui-context", id: E, boundedContextId: R });
    });
  }
  {
    const E = l.has(t) ? t : l.has(i) ? i : null, R = E === t ? i : t;
    E && y(R) && a("ui-serving", () => {
      e.command({ kind: "add-ui-serving", id: E, targetId: R });
    });
  }
  {
    const E = l.has(t) ? t : l.has(i) ? i : null, R = E === t ? i : t;
    E && (u.has(R) || x.has(R)) && a("ui-assignment", () => {
      e.command({ kind: "add-ui-assignment", id: E, targetId: R });
    });
  }
  s.has(t) && s.has(i) && t !== i && a("uc-call", () => {
    (n.useCaseCalls ?? []).some((E) => E.sourceId === t && E.targetId === i) || e.command({ kind: "add-use-case-call", sourceId: t, targetId: i });
  }), s.has(t) && d.has(i) && a("query-call", () => {
    (n.queryCalls ?? []).some((E) => E.sourceId === t && E.targetId === i) || e.command({ kind: "add-query-call", sourceId: t, targetId: i });
  }), s.has(t) && h(i) && a("aggregate-call", () => {
    (n.aggregateCalls ?? []).some((E) => E.sourceId === t && E.targetId === i) || e.command({ kind: "add-aggregate-call", sourceId: t, targetId: i });
  }), (g.has(t) && r.has(i) || s.has(t) && c.has(i)) && a("emission", () => {
    (n.emissions ?? []).some((E) => E.sourceId === t && E.domainEventId === i) || e.command({ kind: "add-emission", sourceId: t, targetId: i });
  }), (r.has(t) || c.has(t)) && s.has(i) && a("flow-triggers", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), (r.has(t) || c.has(t)) && (b(i) || n.boundedContexts.some((E) => (E.readModels ?? []).some((R) => R.id === i))) && a("flow-materializes", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), y(t) && ((s.has(i) || d.has(i) || h(i) || f(i)) && a("actor-use", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), v(i) && a("ext-dep", () => {
    (n.actorExternalDependencies ?? []).some((E) => E.actorId === t && E.externalSystemId === i) || e.command({ kind: "add-actor-external", sourceId: t, targetId: i });
  })), v(t) && (v(i) && t !== i && a("ext-dep", () => {
    (n.externalSystemDependencies ?? []).some((E) => E.sourceId === t && E.targetId === i) || e.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
  }), ((n.apis ?? []).some((E) => E.id === i) || (n.proxyApis ?? []).some((E) => E.id === i)) && a("ext-dep", () => {
    (n.externalSystemDependencies ?? []).some((E) => E.sourceId === t && E.targetId === i) || e.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
  }), s.has(i) && a("external-call", () => {
    (n.externalCalls ?? []).some((E) => E.externalSystemId === t && E.useCaseId === i) || e.command({ kind: "add-external-call", sourceId: t, targetId: i });
  }));
  {
    const E = (V) => (n.apis ?? []).some((se) => se.id === V), R = (n.proxyApis ?? []).find((V) => V.id === t), j = E(t) ? t : R == null ? void 0 : R.targetApiId;
    (E(t) || R != null && R.targetApiId) && b(i) && (j && a("api-implementation", () => {
      (n.apiImplementations ?? []).some(
        (V) => V.apiId === j && V.boundedContextId === i
      ) || e.command({ kind: "add-api-implementation", apiId: j, boundedContextId: i });
    }), a("api-consumption", () => {
      (n.archimateRelations ?? []).some(
        (V) => V.sourceId === t && V.targetId === i && V.type === "serving"
      ) || e.command({
        kind: "add-archimate-relation",
        id: `ar-${t}-${i}-serving`,
        sourceId: t,
        targetId: i,
        type: "serving"
      });
    }));
  }
  if (s.has(t) && m.has(i) && a("external-uc-call", () => {
    (n.externalUseCaseCalls ?? []).some((E) => E.sourceId === t && E.targetId === i) || e.command({ kind: "add-external-uc-call", sourceId: t, targetId: i });
  }), f(t)) {
    const E = new Set(n.externalSystems.flatMap((j) => (j.mcpServers ?? []).map((V) => V.id))), R = new Set((n.apis ?? []).flatMap((j) => j.operations.map((V) => V.id)));
    (s.has(i) || m.has(i) || E.has(i) || (n.mcpGateways ?? []).some((j) => j.id === i) || R.has(i) || (n.apis ?? []).some((j) => j.id === i) || (n.proxyApis ?? []).some((j) => j.id === i) || d.has(i)) && a("agent-tool", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), f(i) && i !== t && a("agent-delegate", () => {
      (n.agentDelegations ?? []).some((j) => j.agentId === t && j.delegateAgentId === i) || e.command({ kind: "add-agent-delegate", sourceId: t, targetId: i });
    }), (n.rags ?? []).some((j) => j.id === i) && a("agent-rag", () => {
      (n.agentRags ?? []).some((j) => j.agentId === t && j.ragId === i) || e.command({ kind: "add-agent-rag", sourceId: t, targetId: i });
    });
  }
  ((E) => (n.identityProviders ?? []).some((R) => R.id === E))(i) && (b(t) || (n.etlFlows ?? []).some((E) => E.id === t) || (n.uiApps ?? []).some((E) => E.id === t)) && a("idp-trust", () => It(e, "context-map", t, i, void 0, void 0, "__classic"));
  const T = /* @__PURE__ */ new Set();
  return o.filter((E) => T.has(E.id) ? !1 : (T.add(E.id), !0)).map((E) => {
    const R = Mp.find((j) => j.id === E.id);
    return { ...E, label: R.label, hint: R.hint };
  });
}
function It(e, t, i, n, o, a, s) {
  var I, k, N;
  const d = new Set((e.model.notes ?? []).map((_) => _.id));
  if (d.has(i) || d.has(n)) {
    const _ = d.has(i) ? i : n, $ = d.has(i) ? n : i;
    if (_ === $) return;
    const M = $.startsWith("edge:") ? $.slice(5) : $.replace(/^(tgt:|flow:)/, "");
    e.command({ kind: "note-attach", id: _, targetId: M });
    return;
  }
  if (t === "distribution") {
    const _ = e.sceneFor("distribution"), $ = e.model.modules ?? [], M = (z) => {
      for (let G = z; G; ) {
        if ($.some((le) => le.id === G)) return G;
        const X = _.nodes.find((le) => le.id === G);
        G = X ? X.ownerId ?? X.parentId : void 0;
      }
      return null;
    }, A = new Set((e.model.urls ?? []).map((z) => z.id)), q = new Set((e.model.services ?? []).map((z) => z.id));
    if (q.has(i) && A.has(n)) {
      e.command({ kind: "add-service-url", serviceId: i, id: n });
      return;
    }
    if (A.has(i) && q.has(n)) {
      e.command({ kind: "add-service-url", serviceId: n, id: i });
      return;
    }
    const D = M(n);
    if (D && D !== i && (e.model.services ?? []).some((z) => z.id === i)) {
      e.command({ kind: "add-service-module", serviceId: i, id: D });
      return;
    }
    if ((e.model.services ?? []).some((z) => z.id === i)) {
      const z = e.model.boundedContexts.find((le) => le.id === n), G = z ? $.filter((le) => le.boundedContextId === z.id) : [], X = G.find((le) => le.main) ?? G[0];
      if (X) {
        e.command({ kind: "add-service-module", serviceId: i, id: X.id });
        return;
      }
    }
    if (D && D !== i && !$.some((G) => G.id === i) && !e.model.boundedContexts.some((G) => G.id === i)) {
      e.command({ kind: "add-module-element", id: D, elementId: i });
      return;
    }
  }
  if (t === "integrations") {
    It(e, "context-map", i, n, o, a, s);
    return;
  }
  if (t === "eventstorming") {
    const _ = (M) => (e.model.customCodes ?? []).some((A) => A.id === M), $ = _(n) ? { stepId: i, ccId: n } : _(i) ? { stepId: n, ccId: i } : null;
    if ($) {
      const M = e.owningUseCaseOf($.stepId);
      M && e.command({
        kind: "set-use-case-step-custom-code",
        useCaseId: M.id,
        id: $.stepId,
        targetId: $.ccId
      });
      return;
    }
    return;
  }
  if (t === "workflows") {
    const _ = (G) => (e.model.actors ?? []).some((X) => X.id === G);
    if (_(i) !== _(n)) {
      const G = _(i) ? i : n, X = _(i) ? n : i, le = e.owningWorkflowOf(X);
      if (le) {
        e.command({ kind: "set-workflow-step-role", workflowId: le.id, id: X, targetId: G });
        return;
      }
    }
    const $ = (G) => (e.model.pages ?? []).some((X) => X.id === G);
    if ($(i) !== $(n)) {
      const G = $(i) ? i : n, X = $(i) ? n : i, le = e.owningWorkflowOf(X);
      if (le) {
        e.command({ kind: "set-workflow-step-form", workflowId: le.id, id: X, targetId: G });
        return;
      }
    }
    const M = e.model.workflowGateways ?? [], A = (G) => M.some((X) => X.id === G);
    if (A(i) || A(n) || (e.model.workflows ?? []).some((G) => G.id === n)) {
      if (i === n) return;
      e.command({ kind: "add-workflow-link", sourceId: i, targetId: n });
      return;
    }
    const q = e.owningWorkflowOf(i), D = e.owningWorkflowOf(n);
    if (!q || q !== D || i === n) return;
    const z = q.steps.find((G) => G.id === n);
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
    const _ = e.model.pages ?? [], $ = e.model.uiApps ?? [], M = (Q) => $.some((te) => te.id === Q), A = (Q) => _.some((te) => te.id === Q), q = (Q) => (e.model.uis ?? []).some((te) => te.id === Q);
    if (q(i) !== q(n)) {
      const Q = q(i) ? i : n, te = Q === i ? n : i;
      if (M(te) || A(te)) {
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
      if (A(te)) {
        e.command({ kind: "set-page-custom-code", id: te, targetId: Q });
        return;
      }
      e.command({ kind: "add-custom-code-use", id: Q, elementId: te });
      return;
    }
    const z = e.model.buttonGroups ?? [], G = (Q) => z.some((te) => te.id === Q);
    if ((s === "toolbar" || s === "bottom") && G(i) && A(n)) {
      e.command({ kind: "add-page-bar-group", pageId: n, id: i, bar: s });
      return;
    }
    if (G(i) && G(n) && i !== n) {
      e.command({ kind: "add-group-subgroup", id: n, targetId: i });
      return;
    }
    const X = /^gbtn:([^:]+):(.+)$/.exec(i);
    if (X) {
      e.model.boundedContexts.some((te) => (te.useCases ?? []).some((_e) => _e.id === n)) ? e.command({ kind: "set-group-button-target", id: X[1], itemId: X[2], useCaseId: n }) : e.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
      return;
    }
    if (s === "home" && M(i) && (A(n) || M(n))) {
      if (n === i) return;
      e.command(
        A(n) ? { kind: "set-app-home-page", appId: i, pageId: n } : { kind: "set-app-home-page", appId: i, pageId: null, toAppId: n }
      );
      return;
    }
    if (s === "header" && M(i) && A(n)) {
      e.command({ kind: "set-app-header-page", appId: i, pageId: n });
      return;
    }
    if ((s === "crud-detail" || s === "crud-create") && A(i) && (A(n) || M(n)) && n !== i) {
      const Q = s === "crud-detail" ? "set-crud-detail" : "set-crud-create";
      e.command(
        A(n) ? { kind: Q, pageId: i, targetId: n, toAppId: null } : { kind: Q, pageId: i, targetId: null, toAppId: n }
      );
      return;
    }
    if (s === "viewmodel" && A(i)) {
      (e.model.models ?? []).some((Q) => Q.id === n) ? e.command({ kind: "set-page-model", pageId: i, modelId: n }) : e.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
      return;
    }
    if ((s === "view" || s === "edit") && M(i) && A(n)) {
      e.command({
        kind: s === "view" ? "set-app-view-page" : "set-app-edit-page",
        appId: i,
        pageId: n
      });
      return;
    }
    if (s) return;
    const le = (Q) => /^wizrow:([^:]+):(.+)$/.exec(Q), Ee = le(i) ?? le(n);
    if (Ee) {
      const Q = le(i) ? n : i;
      A(Q) && Q !== Ee[1] && e.command({ kind: "set-wizard-step-page", pageId: Ee[1], itemId: Ee[2], targetId: Q });
      return;
    }
    const K = _.find((Q) => Q.id === n && Q.type === "WIZARD");
    if (A(i) && K && i !== K.id) {
      (K.wizardSteps ?? []).some((Q) => Q.pageId === i) || e.command({ kind: "add-page-wizard-step", pageId: K.id, targetId: i });
      return;
    }
    if (A(i) && M(n)) {
      const Q = _.find((_e) => _e.id === i), te = $.find((_e) => _e.id === n);
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
      M(te) ? e.command({ kind: "set-identity-provider", id: te, targetId: Q }) : e.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
      return;
    }
    const Ae = (Q) => (e.model.models ?? []).some((te) => te.id === Q);
    if (Ae(i) || Ae(n)) {
      const Q = Ae(i) ? i : n, te = Ae(i) ? n : i;
      if (A(te)) {
        e.command({ kind: "set-page-model", pageId: te, modelId: Q });
        return;
      }
      if (M(te)) {
        e.command({ kind: "set-app-model", appId: te, modelId: Q });
        return;
      }
      return;
    }
    const Ie = Ce(i);
    if (Ie != null && Ie.itemId && ((I = Ce(n)) != null && I.itemId || M(n))) {
      const Q = Ce(n), te = e.menuEntryIn(Ie.appId, Ie.itemId);
      if (!te) return;
      if (Q != null && Q.itemId) {
        const _e = e.menuEntryIn(Q.appId, Q.itemId);
        if (!_e) return;
        const Ne = (St) => (St ?? []).some((si) => si.id === Q.itemId || Ne(si.children));
        if (Ie.appId === Q.appId && (Q.itemId === Ie.itemId || Ne(te.entry.children)))
          return;
        const We = e.nodeClientRect(n), De = We && a !== void 0 ? (a - We.top) / Math.max(1, We.height) : 0.5, at = De < 0.3 ? "before" : De > 0.7 ? "after" : "nest";
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
      if (((k = e.sceneFor("ui").nodes.find((De) => De.id === Q)) == null ? void 0 : k.kind) === "menu-group") {
        e.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
        return;
      }
      const _e = e.model.boundedContexts.some(
        (De) => (De.useCases ?? []).some((at) => at.id === te)
      ), Ne = (e.model.aggregates ?? []).some((De) => De.id === te), We = e.model.boundedContexts.flatMap((De) => De.queryServices ?? []).find((De) => (De.operations ?? []).some((at) => at.id === te));
      A(te) ? e.command({ kind: "set-menu-page", pageId: te, ...Se }) : M(te) && te !== Se.appId ? e.command({ kind: "set-menu-app", toAppId: te, ...Se }) : _e ? e.command({ kind: "set-menu-use-case", useCaseId: te, ...Se }) : Ne ? e.command({ kind: "set-menu-aggregate", aggregateId: te, ...Se }) : We && e.command({
        kind: "set-menu-query-operation",
        queryServiceId: We.id,
        queryOperationId: te,
        ...Se
      });
      return;
    }
    if ((e.model.actors ?? []).some((Q) => Q.id === i) && M(n)) {
      (e.model.actorAppUses ?? []).some((Q) => Q.actorId === i && Q.appId === n) || e.command({ kind: "add-actor-app", actorId: i, appId: n });
      return;
    }
    const be = A(i) ? { pageId: i, other: n } : A(n) ? { pageId: n, other: i } : null;
    if (be) {
      const Q = new Set(
        e.model.boundedContexts.flatMap((Ne) => (Ne.useCases ?? []).map((We) => We.id))
      ), te = new Set(
        e.model.boundedContexts.flatMap((Ne) => (Ne.queryServices ?? []).map((We) => We.id))
      ), _e = _.find((Ne) => Ne.id === be.pageId);
      Q.has(be.other) ? (_e.buttons ?? []).some((Ne) => Ne.useCaseId === be.other) || e.command({ kind: "add-page-button", pageId: be.pageId, useCaseId: be.other }) : te.has(be.other) && e.command({ kind: "set-page-listing", pageId: be.pageId, queryServiceId: be.other });
    }
    return;
  }
  if (t === "mappings") {
    const _ = e.model.models ?? [], $ = dn(i), M = dn(n), A = e.model.transformations ?? [], q = e.model.customCodes ?? [], D = (K) => q.some((ee) => ee.id === K);
    if (D(i) && A.some((K) => K.id === n)) {
      e.command({ kind: "set-transformation-custom-code", id: n, targetId: i });
      return;
    }
    if (D(n) && A.some((K) => K.id === i)) {
      e.command({ kind: "set-transformation-custom-code", id: i, targetId: n });
      return;
    }
    if (D(i)) {
      const K = (M == null ? void 0 : M.modelId) ?? (_.some((ee) => ee.id === n) ? n : null);
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
    if (A.some((K) => K.id === n)) {
      if (M || A.some((ee) => ee.id === i)) return;
      const K = $ ? { modelId: $.modelId, fieldId: $.fieldId } : _.some((ee) => ee.id === i) ? { modelId: i } : null;
      K && e.command({ kind: "add-transformation-input", id: n, ...K });
      return;
    }
    if (A.some((K) => K.id === i)) {
      const K = M ? { modelId: M.modelId, fieldId: M.fieldId } : _.some((ee) => ee.id === n) ? { modelId: n } : null;
      K && e.command({ kind: "set-transformation-output", id: i, ...K });
      return;
    }
    if ($ && M) {
      if ($.modelId === M.modelId) {
        e.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
        return;
      }
      let K = (e.model.modelMappings ?? []).find(
        (ee) => ee.sourceModelId === $.modelId && ee.targetModelId === M.modelId
      );
      if (!K) {
        const ee = _.find((be) => be.id === $.modelId), fe = _.find((be) => be.id === M.modelId);
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
        sourceId: $.fieldId,
        targetId: M.fieldId
      });
      return;
    }
    if ($ && _.some((K) => K.id === n) && n !== $.modelId) {
      e.command({ kind: "move-model-field", modelId: $.modelId, fieldId: $.fieldId, targetId: n });
      return;
    }
    if (!_.some((K) => K.id === i) || !_.some((K) => K.id === n) || i === n || (e.model.modelMappings ?? []).some((K) => K.sourceModelId === i && K.targetModelId === n))
      return;
    const z = _.find((K) => K.id === i), G = _.find((K) => K.id === n), X = (K) => K.replace(/[^a-zA-Z0-9]/g, ""), le = new Set((e.model.modelMappings ?? []).map((K) => K.id));
    let Ee = `mapping-${ce(z.name)}-${ce(G.name)}`;
    for (let K = 2; le.has(Ee); K++) Ee = `mapping-${ce(z.name)}-${ce(G.name)}-${K}`;
    e.command({
      kind: "add-model-mapping",
      id: Ee,
      name: `${X(z.name)}2${X(G.name)}`,
      sourceId: i,
      targetId: n
    });
    return;
  }
  if (t === "aggregates") {
    if ((e.model.aggregates ?? []).some((_) => _.id === n)) {
      const _ = (e.model.valueObjects ?? []).find((M) => M.id === i);
      if (_) {
        _.aggregateId !== n && e.command({ kind: "set-value-object-aggregate", id: i, aggregateId: n });
        return;
      }
      const $ = (e.model.entities ?? []).find((M) => M.id === i);
      $ && $.aggregateId !== n && e.command({ kind: "set-entity-aggregate", id: i, aggregateId: n });
    }
    return;
  }
  if (t !== "context-map") return;
  if (s !== "__classic" && s === void 0) {
    const _ = Pp(e, i, n);
    if (_.length === 1) {
      _[0].apply();
      return;
    }
    if (_.length > 1) {
      e.openConnectPicker({
        x: o ?? 0,
        y: a ?? 0,
        options: [..._, ...Ni(e, i, n)]
      });
      return;
    }
  }
  const r = /^apiop:(.+)@(.+)$/.exec(i);
  if (r) {
    const [, _, $] = r, M = (e.model.proxyApis ?? []).find((G) => G.id === $), A = (M == null ? void 0 : M.targetApiId) ?? ((N = (e.model.apiImplementations ?? []).find(
      (G) => G.boundedContextId === $ && (e.model.apis ?? []).some(
        (X) => X.id === G.apiId && X.operations.some((le) => le.id === _)
      )
    )) == null ? void 0 : N.apiId);
    if (!A) return;
    if (new Set(
      e.model.boundedContexts.flatMap((G) => (G.useCases ?? []).map((X) => X.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-implementation",
        apiId: A,
        operationId: _,
        boundedContextId: $,
        targetUseCaseId: n
      });
      return;
    }
    if (!(M != null && M.targetApiId)) return;
    let D = null;
    if (n === M.targetApiId)
      D = M.targetApiId;
    else {
      const G = /^apiimpl:(.+)@(.+)$/.exec(n);
      G && G[1] === M.targetApiId ? D = G[2] : e.model.boundedContexts.some((X) => X.id === n) && (e.model.apiImplementations ?? []).some(
        (X) => X.apiId === M.targetApiId && X.boundedContextId === n
      ) && (D = n);
    }
    if (!D) return;
    (e.model.proxyOperationRoutes ?? []).some(
      (G) => G.proxyId === M.id && G.operationId === _ && G.targetSiteId === D
    ) || e.command({
      kind: "add-proxy-operation-route",
      proxyId: M.id,
      operationId: _,
      targetSiteId: D
    });
    return;
  }
  const c = new Set((e.model.aiAgents ?? []).map((_) => _.id));
  if (c.has(i)) {
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
    if (c.has(n) && n !== i) {
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
  if ((e.model.mcpGateways ?? []).some((_) => _.id === i)) {
    const _ = (e.model.mcpGateways ?? []).find((A) => A.id === i), $ = e.model.externalSystems.some((A) => (A.mcpServers ?? []).some((q) => q.id === n)) || (e.model.apis ?? []).some((A) => A.id === n) || (e.model.apis ?? []).some((A) => A.operations.some((q) => q.id === n)) || e.model.boundedContexts.some((A) => (A.useCases ?? []).some((q) => q.id === n)) || (e.model.rags ?? []).some((A) => A.id === n), M = [
      ..._.mcpServerIds ?? [],
      ..._.apiIds ?? [],
      ..._.apiOperationIds ?? [],
      ..._.useCaseIds ?? [],
      ..._.ragIds ?? []
    ].includes(n);
    $ && !M && e.command({ kind: "add-gateway-exposure", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.mcpGateways ?? []).some((_) => _.id === n)) return;
  const g = (e.model.rags ?? []).find((_) => _.id === i);
  if (g) {
    if (new Set(
      e.model.boundedContexts.flatMap((M) => (M.readModels ?? []).map((A) => A.id))
    ).has(n) && !(g.sourceReadModelIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((M) => (M.tables ?? []).map((A) => A.id))
    ).has(n) && !(g.sourceExternalTableIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (((e.model.apis ?? []).some((M) => M.id === n) || (e.model.proxyApis ?? []).some((M) => M.id === n)) && !(g.sourceApiIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((M) => M.id === n) && !(g.sourceExternalSystemIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    e.model.boundedContexts.some((M) => M.id === n) && !(g.sourceBoundedContextIds ?? []).includes(n) && e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.rags ?? []).some((_) => _.id === n)) return;
  if ((e.model.workflows ?? []).some((_) => _.id === i)) {
    const _ = (e.model.workflows ?? []).find((A) => A.id === i), $ = (e.model.workflows ?? []).find(
      (A) => A.id === n && A.id !== i
    );
    if ($) {
      const A = _.onCompletionEventName || `${_.name.replace(/\s+/g, "")}Completado`;
      $.triggerEvent !== A && e.command({ kind: "set-workflow-trigger", id: n, triggerEvent: A });
      return;
    }
    const M = e.model.boundedContexts.flatMap((A) => A.useCases ?? []).find((A) => A.id === n);
    if (M && !(_.steps ?? []).some((q) => q.targetUseCaseId === n)) {
      const q = `wfs-${ce(M.name)}`;
      let D = q;
      for (let z = 2; (_.steps ?? []).some((G) => G.id === D); z++)
        D = `${q}-${z}`;
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
  if ((e.model.workflows ?? []).some((_) => _.id === n)) {
    const _ = e.model.boundedContexts.flatMap((A) => A.domainEvents ?? []).find((A) => A.id === i), $ = e.model.boundedContexts.flatMap((A) => A.applicationEvents ?? []).find((A) => A.id === i), M = _ ?? $;
    if (M) {
      const A = (e.model.emissions ?? []).find((G) => G.domainEventId === i), q = new Set((e.model.aggregates ?? []).map((G) => G.id)), D = new Set(
        e.model.boundedContexts.flatMap((G) => (G.domainServices ?? []).map((X) => X.id))
      ), z = new Set(
        e.model.boundedContexts.flatMap((G) => (G.useCases ?? []).map((X) => X.id))
      );
      e.command({
        kind: "set-workflow-trigger",
        id: n,
        triggerEvent: M.name,
        triggerAggregateId: A && q.has(A.sourceId) ? A.sourceId : void 0,
        triggerDomainServiceId: A && D.has(A.sourceId) ? A.sourceId : void 0,
        triggerUseCaseId: A && z.has(A.sourceId) ? A.sourceId : void 0
      });
    }
    return;
  }
  if ((e.model.proxyApis ?? []).some((_) => _.id === i)) {
    const _ = (e.model.proxyApis ?? []).find(($) => $.id === i);
    if ((e.model.apis ?? []).some(($) => $.id === n)) {
      _.targetApiId !== n && e.command({ kind: "set-proxy-target", id: i, targetId: n });
      return;
    }
    if (e.model.boundedContexts.some(($) => $.id === n)) {
      if (!_.targetApiId) return;
      (e.model.apiImplementations ?? []).some(
        (M) => M.apiId === _.targetApiId && M.boundedContextId === n
      ) || e.command({ kind: "add-api-implementation", apiId: _.targetApiId, boundedContextId: n });
      return;
    }
    e.model.externalSystems.some(($) => $.id === n) && _.publishedByExternalSystemId !== n && e.command({ kind: "set-api-publisher", id: i, targetId: n });
    return;
  }
  if ((e.model.apis ?? []).some((_) => _.id === i)) {
    if (e.model.externalSystems.some((_) => _.id === n)) {
      (e.model.apis ?? []).find(($) => $.id === i).publishedByExternalSystemId !== n && e.command({ kind: "set-api-publisher", id: i, targetId: n });
      return;
    }
    e.model.boundedContexts.some((_) => _.id === n) && ((e.model.apiImplementations ?? []).some(
      ($) => $.apiId === i && $.boundedContextId === n
    ) || e.command({ kind: "add-api-implementation", apiId: i, boundedContextId: n }));
    return;
  }
  const m = new Set((e.model.actors ?? []).map((_) => _.id));
  if (c.has(n)) {
    if ((/* @__PURE__ */ new Set([
      ...e.model.boundedContexts.flatMap(($) => ($.domainEvents ?? []).map((M) => M.id)),
      ...e.model.boundedContexts.flatMap(($) => ($.applicationEvents ?? []).map((M) => M.id))
    ])).has(i)) {
      (e.model.agentTriggers ?? []).some(
        (M) => M.eventId === i && M.agentId === n
      ) || e.command({ kind: "add-agent-trigger", sourceId: i, targetId: n });
      return;
    }
    if (!m.has(i)) return;
  }
  if (m.has(i)) {
    const _ = new Set(
      e.model.boundedContexts.flatMap((M) => (M.useCases ?? []).map((A) => A.id))
    ), $ = new Set(
      e.model.boundedContexts.flatMap((M) => (M.queryServices ?? []).map((A) => A.id))
    );
    if (_.has(n) || $.has(n)) {
      (e.model.actorUses ?? []).some(
        (A) => A.actorId === i && A.targetId === n
      ) || e.command({ kind: "add-actor-use", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aggregates ?? []).some((M) => M.id === n)) {
      e.command({ kind: "add-actor-crud", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((M) => M.id === n)) {
      (e.model.actorExternalDependencies ?? []).some(
        (A) => A.actorId === i && A.externalSystemId === n
      ) || e.command({ kind: "add-actor-external", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aiAgents ?? []).some((M) => M.id === n)) {
      (e.model.actorAgentUses ?? []).some(
        (A) => A.actorId === i && A.agentId === n
      ) || e.command({ kind: "add-actor-agent", sourceId: i, targetId: n });
      return;
    }
    return;
  }
  const f = e.owningApiOf(i);
  if (f) {
    if (new Set(
      e.model.boundedContexts.flatMap(($) => ($.useCases ?? []).map((M) => M.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: f.id,
        id: i,
        targetUseCaseId: n
      });
      return;
    }
    if (e.model.boundedContexts.some(($) => $.id === n)) {
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
  const y = (_) => (e.model.notifications ?? []).find(($) => $.id === _);
  if (y(i) || y(n)) {
    const _ = y(i) ?? y(n), $ = y(i) ? n : i;
    if (e.model.boundedContexts.some(
      (A) => [...A.domainEvents ?? [], ...A.applicationEvents ?? []].some((q) => q.id === $)
    )) {
      _.eventId !== $ && e.command({ kind: "set-notification-event", id: _.id, targetId: $ });
      return;
    }
    if ((e.model.actors ?? []).some((A) => A.id === $)) {
      (_.recipientRoleIds ?? []).includes($) || e.command({ kind: "add-notification-recipient", id: _.id, roleId: $ });
      return;
    }
    e.emit("modux-notice", {
      message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
    });
    return;
  }
  const v = (_) => (e.model.documents ?? []).find(($) => $.id === _);
  if (v(i) || v(n)) {
    const _ = v(i) ?? v(n), $ = v(i) ? n : i;
    if ((e.model.models ?? []).find((D) => D.id === $)) {
      e.command({ kind: "set-document-model", id: _.id, modelId: $ });
      return;
    }
    const A = e.model.boundedContexts.flatMap((D) => D.queryServices ?? []).find((D) => D.id === $), q = e.model.boundedContexts.flatMap((D) => (D.queryServices ?? []).flatMap((z) => (z.operations ?? []).map((G) => ({ op: G, qs: z })))).find(({ op: D }) => D.id === $);
    if (A || q) {
      e.command({
        kind: "set-document-query",
        id: _.id,
        queryServiceId: (A == null ? void 0 : A.id) ?? q.qs.id,
        queryOperationId: (q == null ? void 0 : q.op.id) ?? null
      });
      return;
    }
    e.emit("modux-notice", {
      message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
    });
    return;
  }
  const b = e.model.identityProviders ?? [], h = (_) => b.find(($) => $.id === _);
  if (h(i) || h(n)) {
    const _ = h(i) ?? h(n), $ = h(i) ? n : i;
    if (h(i) && e.model.externalSystems.some((q) => q.id === $)) {
      _.publishedByExternalSystemId !== $ && e.command({ kind: "set-idp-publisher", id: _.id, targetId: $ });
      return;
    }
    const M = e.model.boundedContexts.some((q) => q.id === $), A = (e.model.etlFlows ?? []).some((q) => q.id === $);
    if (M || A) {
      e.command({ kind: "set-identity-provider", id: $, targetId: _.id });
      return;
    }
    e.emit("modux-notice", {
      message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
    });
    return;
  }
  const l = e.model.etlFlows ?? [], u = (_) => l.find(($) => $.id === _);
  if (u(i) || u(n)) {
    const _ = u(i) ?? u(n), $ = u(i) ? n : i, M = !u(i), A = new Set(e.model.externalSystems.flatMap((ee) => (ee.tables ?? []).map((fe) => fe.id))), q = /* @__PURE__ */ new Set([
      ...(e.model.apis ?? []).map((ee) => ee.id),
      ...(e.model.proxyApis ?? []).map((ee) => ee.id)
    ]), D = (e.model.apis ?? []).find((ee) => ee.operations.some((fe) => fe.id === $)), z = new Set(
      e.model.boundedContexts.flatMap((ee) => [
        ...(ee.domainEvents ?? []).map((fe) => fe.id),
        ...(ee.applicationEvents ?? []).map((fe) => fe.id)
      ])
    );
    let G = null, X = {};
    if (A.has($) ? (G = M ? "SOURCE_PULL" : "WRITE_DB", X = { externalTableId: $ }) : D ? (G = M ? "SOURCE_PULL" : "WRITE_API", X = { apiId: D.id, operationId: $ }) : q.has($) ? (G = M ? "SOURCE_PULL" : "WRITE_API", X = { apiId: $ }) : z.has($) && (G = M ? "SOURCE_CONSUMER" : "WRITE_EVENT", X = { targetId: $ }), !G) {
      e.emit("modux-notice", {
        message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
      });
      return;
    }
    if ((_.steps ?? []).some(
      (ee) => ee.type === G && (ee.externalTableId ?? ee.operationId ?? ee.apiId ?? ee.eventId) === (X.externalTableId ?? X.operationId ?? X.apiId ?? X.targetId)
    )) return;
    const Ee = new Set((_.steps ?? []).map((ee) => ee.id));
    let K = (_.steps ?? []).length + 1;
    for (; Ee.has(`ets-${K}`); ) K++;
    e.command({ kind: "add-etl-step", etlFlowId: _.id, id: `ets-${K}`, stepType: G, ...X });
    return;
  }
  const x = e.model.externalSystems.flatMap((_) => _.useCases ?? []).find((_) => _.id === i), S = e.model.externalSystems.flatMap((_) => _.tables ?? []).find((_) => _.id === i);
  if (x || S) {
    const _ = (x ?? S).name, $ = x ? { externalUseCaseId: i } : { externalTableId: i }, M = (D) => x ? D.sourceExternalUseCaseId === i : D.sourceExternalTableId === i, A = e.model.boundedContexts.flatMap((D) => D.readModels ?? []).find((D) => D.id === n);
    if (A) {
      (e.model.projections ?? []).some(
        (z) => M(z) && z.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(_)}-${ce(A.name)}`,
        name: `${A.name}Projection`,
        ...$,
        targetId: n
      });
      return;
    }
    const q = e.model.boundedContexts.find((D) => D.id === n);
    if (q) {
      (e.model.projections ?? []).some(
        (z) => M(z) && z.boundedContextId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(_)}-${ce(q.name)}`,
        name: `${_}ViewProjection`,
        ...$,
        boundedContextId: n,
        readModelName: `${_}View`
      });
      return;
    }
    return;
  }
  const T = (e.model.aggregates ?? []).find((_) => _.id === i);
  if (T) {
    const _ = e.model.boundedContexts.flatMap((M) => M.readModels ?? []).find((M) => M.id === n);
    if (_) {
      (e.model.projections ?? []).some(
        (A) => A.sourceAggregateId === i && A.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(T.name)}-${ce(_.name)}`,
        name: `${_.name}Projection`,
        aggregateId: i,
        targetId: n
      });
      return;
    }
    const $ = e.model.boundedContexts.find((M) => M.id === n);
    if ($) {
      (e.model.projections ?? []).some(
        (A) => A.sourceAggregateId === i && A.boundedContextId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(T.name)}-${ce($.name)}`,
        name: `${T.name}ViewProjection`,
        aggregateId: i,
        boundedContextId: n,
        readModelName: `${T.name}View`
      });
      return;
    }
  }
  const E = new Set(
    e.model.boundedContexts.flatMap((_) => (_.domainEvents ?? []).map(($) => $.id))
  ), R = /* @__PURE__ */ new Set([
    ...(e.model.aggregates ?? []).map((_) => _.id),
    ...e.model.boundedContexts.flatMap((_) => (_.domainServices ?? []).map(($) => $.id))
  ]), j = new Set(
    e.model.boundedContexts.flatMap((_) => (_.applicationEvents ?? []).map(($) => $.id))
  ), V = new Set(e.model.boundedContexts.flatMap((_) => (_.useCases ?? []).map(($) => $.id))), se = new Set(
    e.model.boundedContexts.flatMap((_) => (_.queryServices ?? []).map(($) => $.id))
  );
  if (V.has(i) && se.has(n)) {
    (e.model.queryCalls ?? []).some(
      ($) => $.sourceId === i && $.targetId === n
    ) || e.command({ kind: "add-query-call", sourceId: i, targetId: n });
    return;
  }
  const C = new Set(
    e.model.externalSystems.flatMap((_) => (_.useCases ?? []).map(($) => $.id))
  );
  if (V.has(i) && C.has(n)) {
    (e.model.externalUseCaseCalls ?? []).some(
      ($) => $.sourceId === i && $.targetId === n
    ) || e.command({ kind: "add-external-uc-call", sourceId: i, targetId: n });
    return;
  }
  if (V.has(i) && V.has(n) && i !== n) {
    (e.model.useCaseCalls ?? []).some(
      ($) => $.sourceId === i && $.targetId === n
    ) || e.command({ kind: "add-use-case-call", sourceId: i, targetId: n });
    return;
  }
  const Y = e.model.boundedContexts.flatMap((_) => _.scheduledTriggers ?? []).find((_) => _.id === i);
  if (Y && V.has(n)) {
    Y.useCaseId !== n && e.command({ kind: "set-scheduled-trigger-target", id: i, targetUseCaseId: n });
    return;
  }
  if (V.has(i) && (e.model.aggregates ?? []).some((_) => _.id === n)) {
    (e.model.aggregateCalls ?? []).some(
      ($) => $.sourceId === i && $.targetId === n
    ) || e.command({ kind: "add-aggregate-call", sourceId: i, targetId: n });
    return;
  }
  if (R.has(i) && E.has(n) || V.has(i) && j.has(n)) {
    (e.model.emissions ?? []).some(
      ($) => $.sourceId === i && $.domainEventId === n
    ) || e.command({ kind: "add-emission", sourceId: i, targetId: n });
    return;
  }
  if (E.has(i) || j.has(i)) {
    const _ = j.has(i), $ = e.model.boundedContexts.flatMap((K) => (_ ? K.applicationEvents : K.domainEvents) ?? []).find((K) => K.id === i), M = e.model.boundedContexts.flatMap((K) => (K.useCases ?? []).map((ee) => ({ u: ee, boundedContext: K }))).find(({ u: K }) => K.id === n), A = e.model.boundedContexts.flatMap((K) => (K.readModels ?? []).map((ee) => ({ rm: ee, boundedContext: K }))).find(({ rm: K }) => K.id === n), q = e.model.boundedContexts.find((K) => K.id === n) ?? (A == null ? void 0 : A.boundedContext) ?? (M == null ? void 0 : M.boundedContext);
    if (!$ || !q) return;
    const D = new Set((e.model.aggregates ?? []).map((K) => K.id)), z = new Set(
      e.model.boundedContexts.flatMap((K) => (K.domainServices ?? []).map((ee) => ee.id))
    ), G = (e.model.emissions ?? []).find(
      (K) => K.domainEventId === i && (_ ? V.has(K.sourceId) : D.has(K.sourceId) || z.has(K.sourceId))
    );
    if (!G) {
      e.emit("modux-notice", {
        message: _ ? `Declara primero qué caso de uso publica ${$.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${$.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
        kind: "info"
      });
      return;
    }
    const X = !_ && D.has(G.sourceId);
    if (M) {
      if (e.model.flows.some(
        (ee) => ee.archetype === "TRIGGERS" && ee.triggerEvent === $.name && ee.targetUseCaseId === M.u.id
      )) return;
      e.command({
        kind: "add-flow",
        id: `flow-${ce($.name)}-${ce(M.u.name)}`,
        name: M.u.name,
        archetype: "TRIGGERS",
        triggerAggregateId: X ? G.sourceId : "",
        triggerDomainServiceId: !_ && !X ? G.sourceId : void 0,
        triggerUseCaseId: _ ? G.sourceId : void 0,
        triggerEvent: $.name,
        targetId: q.id,
        targetUseCaseId: M.u.id
      });
      return;
    }
    const le = (A == null ? void 0 : A.rm.name) ?? `${$.name}View`;
    if (e.model.flows.some(
      (K) => K.archetype === "MATERIALIZES" && K.triggerEvent === $.name && K.targetId === q.id && K.readModelName === le
    )) return;
    e.command({
      kind: "add-flow",
      id: `flow-${ce($.name)}-${ce(le)}`,
      name: le,
      archetype: "MATERIALIZES",
      triggerAggregateId: X ? G.sourceId : "",
      triggerDomainServiceId: !_ && !X ? G.sourceId : void 0,
      triggerUseCaseId: _ ? G.sourceId : void 0,
      triggerEvent: $.name,
      targetId: q.id,
      readModelName: le
    });
    return;
  }
  const B = /* @__PURE__ */ new Set([
    ...R,
    ...V,
    ...se,
    ...e.model.boundedContexts.flatMap((_) => (_.readModels ?? []).map(($) => $.id))
  ]);
  if (B.has(i) || B.has(n) || E.has(n) || j.has(n))
    return;
  const O = new Set(e.model.externalSystems.map((_) => _.id));
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
      e.openExtDepPicker({ sourceId: i, targetId: n, x: o ?? 0, y: a ?? 0 });
      return;
    }
    const $ = (e.model.apis ?? []).find(
      (q) => q.operations.some((D) => D.id === n)
    ), M = /^apiop:(.+)@(.+)$/.exec(n), A = $ ? { operationId: n, siteId: $.id } : M ? { operationId: M[1], siteId: M[2] } : null;
    if (A) {
      (e.model.externalOperationUses ?? []).some(
        (D) => D.externalSystemId === i && D.operationId === A.operationId && D.siteId === A.siteId
      ) || e.command({
        kind: "add-external-operation-use",
        sourceId: i,
        operationId: A.operationId,
        targetSiteId: A.siteId
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
  const W = (_) => e.model.boundedContexts.some(($) => $.id === _);
  if (W(i) && W(n) && i !== n) {
    const _ = e.model.relations.find(
      ($) => $.sourceId === i && $.targetId === n && $.declared
    );
    e.openRelationPicker({
      sourceId: i,
      targetId: n,
      mode: _ ? "edit" : "create",
      x: o ?? 0,
      y: a ?? 0
    });
    return;
  }
  if (i !== n && s === void 0) {
    e.openConnectPicker({
      x: o ?? 0,
      y: a ?? 0,
      options: Ni(e, i, n)
    });
    return;
  }
}
function Tp(e, t, i, n, o) {
  var a, s, d;
  if (o === "ui-serving") {
    const r = /^uisrv:(.+)->(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-ui-serving", id: r[1], targetId: r[2] }));
    return;
  }
  if (o === "ui-assignment") {
    const r = /^uiasg:(.+)->(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-ui-assignment", id: r[1], targetId: r[2] }));
    return;
  }
  if (o === "ui" && i === "node") {
    e.clearSelection(), e.command({ kind: "remove-ui", id: n });
    return;
  }
  if (o === "archimate-relation") {
    const r = n.replace(/^archi:/, "");
    e.clearSelection(), e.command({ kind: "remove-archimate-relation", id: r });
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
    const r = /^svcurl:(.+)->(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-service-url", serviceId: r[1], id: r[2] }));
    return;
  }
  if (i === "node" && o === "area") {
    e.clearSelection(), e.command({ kind: "remove-area", id: n });
    return;
  }
  if (i === "edge" && o === "note-link") {
    const r = n.slice(5), c = r.indexOf("->");
    c > 0 && (e.clearSelection(), e.command({ kind: "note-detach", id: r.slice(0, c), targetId: r.slice(c + 2) }));
    return;
  }
  if (o === "invariant" || o === "invariant-containment") {
    const r = o === "invariant" ? n : n.replace(/^protects:.+->/, "");
    e.clearSelection(), e.command({ kind: "remove-invariant", id: r });
    return;
  }
  if (t === "eventstorming" && i === "edge" && o === "es-custom") {
    const r = /^escc:(.+)$/.exec(n), c = r ? e.owningUseCaseOf(r[1]) : null;
    r && c && (e.clearSelection(), e.command({ kind: "set-use-case-step-custom-code", useCaseId: c.id, id: r[1], targetId: null }));
    return;
  }
  if (t === "eventstorming" && i === "node" && o === "custom-code") {
    e.clearSelection(), e.command({ kind: "remove-custom-code", id: n });
    return;
  }
  if (t === "ui") {
    if (i === "edge") {
      let r;
      if (r = /^idpauth:(.+)$/.exec(n))
        e.command({ kind: "set-identity-provider", id: r[1], targetId: null });
      else if (r = /^appheader:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-header-page", appId: r[1], pageId: null });
      else if (r = /^apphome:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-home-page", appId: r[1], pageId: null });
      else if (r = /^appmodel:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-model", appId: r[1], modelId: null });
      else if (r = /^appview:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-view-page", appId: r[1], pageId: null });
      else if (r = /^appedit:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-app-edit-page", appId: r[1], pageId: null });
      else if (r = /^cruddetail:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-crud-detail", pageId: r[1], targetId: null, toAppId: null });
      else if (r = /^crudnew:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-crud-create", pageId: r[1], targetId: null, toAppId: null });
      else if (r = /^wizstep:([^:]+):(.+)$/.exec(n))
        e.command({ kind: "set-wizard-step-page", pageId: r[1], itemId: r[2], targetId: null });
      else if (r = /^pgbtn:(.+)->(.+)$/.exec(n))
        e.command({ kind: "remove-page-button", pageId: r[1], useCaseId: r[2] });
      else if (r = /^pglist:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-page-listing", pageId: r[1], queryServiceId: null });
      else if (r = /^pgmodel:(.+)->(.+)$/.exec(n))
        e.command({ kind: "set-page-model", pageId: r[1], modelId: null });
      else if (r = /^actorapp:(.+)->(.+)$/.exec(n))
        e.command({ kind: "remove-actor-app", actorId: r[1], appId: r[2] });
      else if (r = /^menupage:(.+)->[^>]+$/.exec(n)) {
        const c = Ce(r[1]);
        c && e.command({ kind: "set-menu-page", pageId: null, ...c });
      } else if (r = /^menuapp:(.+)->[^>]+$/.exec(n)) {
        const c = Ce(r[1]);
        c && e.command({ kind: "set-menu-app", toAppId: null, ...c });
      } else if (r = /^menuuc:(.+)->[^>]+$/.exec(n)) {
        const c = Ce(r[1]);
        c && e.command({ kind: "set-menu-use-case", useCaseId: null, ...c });
      } else if (r = /^menuagg:(.+)->[^>]+$/.exec(n)) {
        const c = Ce(r[1]);
        c && e.command({ kind: "set-menu-aggregate", aggregateId: null, ...c });
      } else if (r = /^menuqop:(.+)->[^>]+$/.exec(n)) {
        const c = Ce(r[1]);
        c && e.command({ kind: "set-menu-query-operation", queryServiceId: null, queryOperationId: null, ...c });
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
      const r = Ce(n);
      r && e.command({ kind: "remove-menu-item", ...r });
      return;
    }
    if (o === "wizard-step-row") {
      const r = /^wizrow:([^:]+):(.+)$/.exec(n);
      r && e.command({ kind: "remove-page-wizard-step", pageId: r[1], targetId: r[2] });
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
      const r = /^gbtn:([^:]+):(.+)$/.exec(n);
      r && e.command({ kind: "remove-group-button", id: r[1], itemId: r[2] });
      return;
    }
    if (o === "group-subgroup") {
      const r = /^gsub:([^:]+):(.+)$/.exec(n);
      r && e.command({ kind: "remove-group-subgroup", id: r[1], targetId: r[2] });
      return;
    }
    if (i === "edge" && o === "bar-group") {
      const r = /^bargrp:([^:]+):[^:]+:(.+)$/.exec(n);
      r && e.command({ kind: "remove-page-bar-group", pageId: r[1], id: r[2] });
      return;
    }
    if (i === "edge" && o === "gbtn-target") {
      const r = /^gbtnt:([^:]+):(.+)$/.exec(n);
      r && e.command({ kind: "set-group-button-target", id: r[1], itemId: r[2], useCaseId: null });
      return;
    }
    if (i === "edge" && o === "ui-custom-page") {
      const r = /^ccpage:(.+)$/.exec(n);
      r && e.command({ kind: "set-page-custom-code", id: r[1], targetId: null });
      return;
    }
    if (i === "edge" && o === "cc-uses") {
      const r = /^ccuse:(.+)->(.+)$/.exec(n);
      r && e.command({ kind: "remove-custom-code-use", id: r[1], elementId: r[2] });
      return;
    }
    return;
  }
  if (t === "mappings" && i === "edge" && o === "model-mapping") {
    const r = /^mapping:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-model-mapping", id: r[1] }));
    return;
  }
  if (t === "mappings" && i === "edge" && o === "mapping-rule") {
    const r = /^maprule:([^:]+):(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-model-mapping-rule", id: r[1], itemId: r[2] }));
    return;
  }
  if (t === "mappings" && i === "node" && o === "model-field") {
    const r = dn(n);
    r && (e.clearSelection(), e.command({ kind: "remove-model-field", modelId: r.modelId, fieldId: r.fieldId }));
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
    const r = /^cctf:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-transformation-custom-code", id: r[1], targetId: null }));
    return;
  }
  if (t === "mappings" && i === "edge" && o === "custom-of-mapping") {
    const r = /^ccmap:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-mapping-custom-code", id: r[1], targetId: null }));
    return;
  }
  if (t === "mappings" && i === "node" && o === "transformation") {
    e.clearSelection(), e.command({ kind: "remove-transformation", id: n });
    return;
  }
  if (t === "mappings" && i === "edge" && o === "transform-input") {
    const r = /^tfin:([^:]+):([^:]+):(.*)$/.exec(n);
    r && (e.clearSelection(), e.command({
      kind: "remove-transformation-input",
      id: r[1],
      modelId: r[2],
      ...r[3] ? { fieldId: r[3] } : {}
    }));
    return;
  }
  if (t === "mappings" && i === "edge" && o === "transform-output") {
    const r = /^tfout:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-transformation-output", id: r[1] }));
    return;
  }
  if (t === "workflows" && i === "edge" && o === "workflow-dependency") {
    const r = /^wfdep:(.+)->(.+)$/.exec(n);
    if (!r) return;
    const c = e.owningWorkflowOf(r[2]);
    if (!c) return;
    e.clearSelection(), e.command({
      kind: "remove-workflow-dependency",
      workflowId: c.id,
      id: r[2],
      dependsOnStepId: r[1]
    });
    return;
  }
  if (t === "workflows" && i === "node" && o === "workflow-gateway") {
    e.clearSelection(), e.command({ kind: "remove-workflow-gateway", id: n });
    return;
  }
  if (t === "workflows" && i === "edge" && o === "wf-role") {
    const r = /^wfrole:(.+)->(.+)$/.exec(n);
    if (r) {
      const c = e.owningWorkflowOf(r[1]);
      c && (e.clearSelection(), e.command({ kind: "set-workflow-step-role", workflowId: c.id, id: r[1] }));
    }
    return;
  }
  if (t === "workflows" && i === "edge" && o === "wf-form") {
    const r = /^wfform:(.+)->(.+)$/.exec(n);
    if (r) {
      const c = e.owningWorkflowOf(r[1]);
      if (!c) return;
      e.clearSelection(), e.command({ kind: "set-workflow-step-form", workflowId: c.id, id: r[1] });
    }
    return;
  }
  if (t === "workflows" && i === "edge" && o === "wf-link") {
    const r = /^wflink:(.+)->(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-workflow-link", sourceId: r[1], targetId: r[2] }));
    return;
  }
  if (i === "node" && o === "workflow") {
    e.clearSelection(), e.command({ kind: "remove-workflow", id: n });
    return;
  }
  if (i === "node" && o === "workflow-step") {
    const r = e.owningWorkflowOf(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-workflow-step", workflowId: r.id, id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "api-impl-wire") {
    const r = /^apiimplwire:(.+)@(.+)$/.exec(n);
    if (!r) return;
    const [, c, g] = r, m = (a = (e.model.apis ?? []).find(
      (f) => f.operations.some((y) => y.id === c)
    )) == null ? void 0 : a.id;
    if (!m) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation-implementation", apiId: m, operationId: c, boundedContextId: g });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "ext-op-use") {
    const r = /^extopuse:(.+)->(.+)@(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({
      kind: "remove-external-operation-use",
      sourceId: r[1],
      operationId: r[2],
      targetSiteId: r[3]
    });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "op-route") {
    const r = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(n);
    if (!r) return;
    const [, c, g, m] = r, f = /^apiimpl:.+@(.+)$/.exec(m), y = f ? f[1] : m;
    e.clearSelection(), e.command({ kind: "remove-proxy-operation-route", proxyId: g, operationId: c, targetSiteId: y });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "relation") {
    const r = /^rel:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-relation", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "emission") {
    const r = /^emit:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-emission", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "projection") {
    const r = /^proj:(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-projection", id: r[1] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "uc-call") {
    const r = /^uccall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-use-case-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "notification-trigger") {
    const r = /^notif:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-notification-event", id: r[1], targetId: null }));
    return;
  }
  if (t === "context-map" && i === "edge" && o === "notification-recipient") {
    const r = /^notifto:([^:]+):(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-notification-recipient", id: r[1], roleId: r[2] }));
    return;
  }
  if (t === "context-map" && i === "edge" && o === "document-query") {
    const r = /^docq:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-document-query", id: r[1], queryServiceId: null, queryOperationId: null }));
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
    const r = /^idp(?:trust|svc):(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "set-identity-provider", id: r[1], targetId: null });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "idp-federation") {
    const r = /^idpfed:(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "set-idp-publisher", id: r[1], targetId: null });
    return;
  }
  if (t === "context-map" && i === "node" && o === "identity-provider") {
    e.clearSelection(), e.command({ kind: "remove-identity-provider", id: n });
    return;
  }
  if ((t === "context-map" || t === "integrations") && i === "edge" && (o === "etl-source" || o === "etl-write")) {
    const r = /^etl:([^:]+):(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-etl-step", etlFlowId: r[1], id: r[2] });
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
    const r = /^deploy:(.+)->(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-service-module", serviceId: r[1], id: r[2] }));
    return;
  }
  if ((t === "context-map" || t === "distribution") && i === "node" && o === "module") {
    e.clearSelection(), e.command({ kind: "remove-module", id: n });
    return;
  }
  if (t === "distribution" && i === "node") {
    const r = e.sceneFor("distribution"), c = (g) => {
      const m = r.nodes.find((f) => f.id === g);
      return m ? m.ownerId ?? m.parentId : void 0;
    };
    for (let g = c(n); g; ) {
      if ((e.model.modules ?? []).some((m) => m.id === g)) {
        e.clearSelection(), e.command({ kind: "remove-module-element", id: g, elementId: n });
        return;
      }
      g = c(g);
    }
    return;
  }
  if (t === "context-map" && i === "edge" && o === "st-fire") {
    const r = /^stfire:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "set-scheduled-trigger-target", id: r[1], targetUseCaseId: null });
    return;
  }
  if (t === "context-map" && i === "node" && o === "scheduled-trigger") {
    e.clearSelection(), e.command({ kind: "remove-scheduled-trigger", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agg-call") {
    const r = /^aggcall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "qs-call") {
    const r = /^qscall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-query-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "external-call") {
    const r = /^extcall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-external-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "ext-uc-call") {
    const r = /^extuccall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-external-uc-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-use") {
    const r = /^mcp:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-use", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-external-use") {
    const r = /^mcpx:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-external-use", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-mcp") {
    const r = /^mcpsv:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-mcp", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "gateway-exposure") {
    const r = /^gwx:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-gateway-exposure", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-gateway") {
    const r = /^aggw:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-gateway", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-api-op") {
    const r = /^agapi:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api-operation", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-query") {
    const r = /^agqs:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-query", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-delegate") {
    const r = /^agag:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-delegate", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "actor-agent") {
    const r = /^useag:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-actor-agent", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-trigger") {
    const r = /^evag:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-trigger", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (i === "node" && o === "mcp-gateway") {
    e.clearSelection(), e.command({ kind: "remove-mcp-gateway", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-rag") {
    const r = /^agrag:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-rag", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "rag-source") {
    const r = /^ragsrc:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && (o === "rag-table" || o === "rag-api" || o === "rag-coarse")) {
    const r = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: r[2], targetId: r[1] });
    return;
  }
  if (i === "node" && o === "rag") {
    e.clearSelection(), e.command({ kind: "remove-rag", id: n });
    return;
  }
  if (i === "node" && o === "rag-content-source") {
    const r = /^ragcs:(.+?):(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-rag-content-source", sourceId: r[1], uri: r[2] });
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
    const r = /^apiwire:(.+)$/.exec(n), c = r ? e.owningApiOf(r[1]) : null;
    if (!r || !c) return;
    e.clearSelection(), e.command({ kind: "set-api-operation-target", apiId: c.id, id: r[1] });
    return;
  }
  if (i === "node" && o === "api") {
    e.clearSelection(), e.command({ kind: "remove-api", id: n });
    return;
  }
  if (i === "node" && o === "api-impl") {
    const r = /^apiimpl:(.+)@(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-api-implementation", apiId: r[1], boundedContextId: r[2] });
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
    const r = e.owningApiOf(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation", apiId: r.id, id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "actor-use") {
    const r = /^use:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-actor-use", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "actor-ext") {
    const r = /^extdep:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-actor-external", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "ext-dep") {
    const r = /^xdep:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-external-dependency", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "wf-chain") {
    const r = /^wfchain:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "set-workflow-trigger", id: r[2], triggerEvent: "" });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "agent-api") {
    const r = /^agapi:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && o === "proxy-target") {
    const r = /^pxt:(.+)->(.+)$/.exec(n);
    if (!r || !(e.model.proxyApis ?? []).some((c) => c.id === r[1])) return;
    e.clearSelection(), e.command({ kind: "set-proxy-target", id: r[1], targetId: "" });
    return;
  }
  if (i === "node" && o === "boundedContext") {
    if ((e.model.aggregates ?? []).some((c) => c.boundedContextId === n)) return;
    e.clearSelection(), e.command({ kind: "remove-boundedContext", id: n });
    return;
  }
  if (i === "node" && o === "aggregate") {
    if ((e.model.entities ?? []).some((c) => c.aggregateId === n)) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate", id: n });
    return;
  }
  if (i === "node" && o === "value-object") {
    const r = ((s = (e.model.valueObjects ?? []).find((c) => c.id === n)) == null ? void 0 : s.aggregateId) ?? "";
    e.clearSelection(), e.command({ kind: "remove-value-object", id: n, aggregateId: r });
    return;
  }
  if (i === "node" && o === "entity") {
    const r = ((d = (e.model.entities ?? []).find((c) => c.id === n)) == null ? void 0 : d.aggregateId) ?? "";
    e.clearSelection(), e.command({ kind: "remove-entity", id: n, aggregateId: r });
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
    const r = e.owningProcessOf(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-process-step", processId: r.id, id: n });
  }
}
const Op = [
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
], xo = [
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
var Rp = Object.defineProperty, Np = Object.getOwnPropertyDescriptor, ot = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Np(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Rp(t, i, o), o;
};
const xi = 36, dt = 20, Ft = 210, Ii = 176, Mt = 46, Io = 36, Dp = 60, Lp = 46, wo = 60, ko = {
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
}, $o = {
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
}, _o = {
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
          const a = this.participants(), s = a[o], d = a.find((f) => f.ref === n) ?? { ref: n }, r = this.model ? Ip(this.model, d, s) : { kind: "COMMAND" }, c = {
            id: `msg-${crypto.randomUUID().slice(0, 8)}`,
            fromRef: n,
            toRef: s.ref,
            kind: r.kind,
            label: r.label,
            backed: this.model ? bo(
              this.model,
              { fromRef: n, toRef: s.ref, kind: r.kind, label: r.label },
              ln(this.model, t).typeOf
            ) : !1
          }, g = this.indexAtY(i.y), m = ii(t);
          this._selectedMessageId = c.id, this.changed({
            ...t,
            participants: m,
            messages: wp(t.messages, c, g)
          });
        }
      }
      if (this._reorder) {
        const { id: n, moved: o } = this._reorder;
        if (this._reorder = null, o) {
          const a = this.indexAtY(i.y, n);
          this.changed({ ...t, messages: kp(t.messages, n, a) });
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
    return e.kind === "COMMAND" || e.kind === "QUERY" ? Dp : Lp;
  }
  messageRows() {
    var n;
    const e = ((n = this.interaction) == null ? void 0 : n.messages) ?? [], t = ua(e);
    let i = dt + Mt + Io;
    return e.map((o, a) => {
      const s = { m: o, y: i, num: t[a] };
      return i += this.rowH(o), s;
    });
  }
  diagramSize() {
    const e = this.participants(), t = this.messageRows(), i = t.length ? t[t.length - 1].y + this.rowH(t[t.length - 1].m) : dt + Mt + Io;
    return {
      w: Math.max(xi * 2 + Ii + Math.max(0, e.length - 1) * Ft + 60, 320),
      h: i + wo
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
    return t.forEach((o, a) => {
      const s = Math.abs(e - this.xOf(a));
      s < n && (n = s, i = a);
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
    const i = this.model ? ln(this.model, t) : null;
    this.changed({
      ...t,
      messages: t.messages.map(
        (n) => n.id === e.messageId ? {
          ...n,
          label: e.label.trim() || void 0,
          guard: e.guard.trim() || void 0,
          kind: e.kind,
          backed: i ? bo(this.model, { ...n, kind: e.kind }, i.typeOf) : n.backed
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
        this._selectedMessageId = null, this.changed({ ...i, messages: $p(i.messages, n) }), e.preventDefault();
      } else if (this._selectedParticipantRef) {
        const n = this._selectedParticipantRef;
        this._selectedParticipantRef = null, this.changed(_p(i, n)), e.preventDefault();
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
    const i = this.xOf(t), n = ko[e.type] ?? ko.UNKNOWN, o = this._selectedParticipantRef === e.ref, a = e.name.length > 24 ? `${e.name.slice(0, 22)}…` : e.name;
    return J`
      <g
        style="cursor: ${this.editable ? "pointer" : "default"}"
        @click=${(s) => {
      var d;
      s.stopPropagation(), (d = this.renderRoot.querySelector("svg")) == null || d.focus(), this._selectedParticipantRef = e.ref, this._selectedMessageId = null;
    }}
      >
        <title>${e.name} — ${$o[e.type] ?? e.type}</title>
        <rect
          x=${i - Ii / 2} y=${dt} width=${Ii} height=${Mt} rx="10"
          fill=${n.fill}
          style=${"stroke: " + (o ? "var(--modux-primary, #2563eb)" : n.stroke)}
          stroke-width=${o ? 2.2 : 1.4}
        ></rect>
        <text x=${i} y=${dt + 19} text-anchor="middle" font-size="12" font-weight="600" style="fill: var(--modux-text, #1e293b)">${a}</text>
        <text x=${i} y=${dt + 35} text-anchor="middle" font-size="8.5" letter-spacing="0.08em" fill=${n.stroke}>${$o[e.type] ?? e.type}</text>
      </g>
    `;
  }
  renderMessage(e) {
    const { m: t, y: i, num: n } = e, o = this.participants(), a = o.findIndex((S) => S.ref === t.fromRef), s = o.findIndex((S) => S.ref === t.toRef);
    if (a < 0 || s < 0) return J``;
    const d = this.xOf(a), r = this.xOf(s), c = this.kindStyle(t), g = this._selectedMessageId === t.id, m = t.backed === !1, f = `${t.label ?? ""}${t.guard ? ` [${t.guard}]` : ""}`, y = f.length > 46 ? `${f.slice(0, 44)}…` : f, v = a === s, b = r >= d, h = v || b ? d + 6 : d - 6, l = v ? d + 52 : (d + r) / 2, u = v ? J`<path
          d="M ${d} ${i} H ${d + 44} V ${i + 16} H ${d + 2}"
          fill="none"
          style=${"stroke: " + c.color}
          stroke-width="1.6"
          stroke-dasharray=${c.dashed ? "5 4" : "none"}
          marker-end="url(#${c.marker})"
        ></path>` : J`<line
          x1=${b ? d + 2 : d - 2} y1=${i}
          x2=${b ? r - 2 : r + 2} y2=${i}
          style=${"stroke: " + c.color}
          stroke-width="1.6"
          stroke-dasharray=${c.dashed ? "5 4" : "none"}
          marker-end="url(#${c.marker})"
        ></line>`, x = !v && (t.kind === "COMMAND" || t.kind === "QUERY") ? J`<line
            x1=${b ? r - 2 : r + 2} y1=${i + 16}
            x2=${b ? d + 2 : d - 2} y2=${i + 16}
            style="stroke: var(--modux-edge, #94a3b8)"
            stroke-width="1"
            stroke-dasharray="4 4"
            marker-end="url(#seq-ret)"
          ></line>` : "";
    return J`
      <g
        style="cursor: ${this.editable ? "grab" : "default"}"
        @pointerdown=${(S) => this.onMessagePointerDown(S, t)}
        @dblclick=${(S) => this.onMessageDblClick(S, t)}
      >
        <title>${m ? "sin respaldo en el modelo — materialízalo o ajústalo" : `${_o[t.kind]}${f ? ` · ${f}` : ""}`}</title>
        ${g ? J`<line
              x1=${Math.min(d, r)} y1=${i}
              x2=${v ? d + 46 : Math.max(d, r)} y2=${i}
              style="stroke: var(--modux-primary, #2563eb)" stroke-width="7" opacity="0.22"
            ></line>` : ""}
        <!-- fat invisible hit area: the thin arrow stays easy to grab -->
        <line
          x1=${Math.min(d, r)} y1=${i} x2=${v ? d + 46 : Math.max(d, r)} y2=${i}
          stroke="transparent" stroke-width="14"
        ></line>
        ${u}
        ${x}
        <text x=${h} y=${i - 6} text-anchor=${b ? "start" : "end"} font-size="10" style="fill: var(--modux-text-dim, #64748b)">${n}</text>
        <text
          x=${l} y=${i - 8} text-anchor=${v ? "start" : "middle"}
          font-size="11.5"
          font-style=${t.kind === "QUERY" ? "italic" : "normal"}
          style=${"fill: " + (m ? "#b45309" : "var(--modux-text, #1e293b)")}
        >${m ? J`<tspan fill="#b45309">⚠ </tspan>` : ""}${y}</text>
        ${m && this.editable ? J`<text
              class="materialize"
              x=${b ? r - 4 : r + 4} y=${i - 8}
              text-anchor=${b ? "end" : "start"}
              font-size="12"
              @pointerdown=${(S) => S.stopPropagation()}
              @click=${(S) => {
      S.stopPropagation(), this.emit("interaction-materialize", { messageId: t.id });
    }}
            ><title>Materializar: crea en el modelo la pieza que respalda este mensaje</title>✨</text>` : ""}
      </g>
    `;
  }
  render() {
    var s;
    const e = this.interaction, t = this.participants(), i = this.messageRows(), { w: n, h: o } = this.diagramSize(), a = o - wo + 20;
    return w`
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
          ${t.map((d, r) => {
      const c = this.xOf(r);
      return J`
              <line
                x1=${c} y1=${dt + Mt} x2=${c} y2=${a}
                style="stroke: var(--modux-border, #cbd5e1)" stroke-width="1.2" stroke-dasharray="6 5"
              ></line>
              ${this.editable ? J`<rect
                    x=${c - Ft / 2 + 10} y=${dt + Mt}
                    width=${Ft - 20} height=${Math.max(0, a - dt - Mt)}
                    fill="transparent"
                    style="cursor: crosshair"
                    @pointerdown=${(g) => this.onLifelinePointerDown(g, d.ref)}
                  ><title>Arrastra hasta otra línea de vida para crear un mensaje</title></rect>` : ""}
            `;
    })}
          ${t.map((d, r) => this.renderHeader(d, r))}
          ${i.map((d) => this.renderMessage(d))}
          ${this._connect ? J`<line
                x1=${this.xOf(t.findIndex((d) => d.ref === this._connect.fromRef))}
                y1=${this._connect.y}
                x2=${this._connect.x}
                y2=${this._connect.y}
                style="stroke: var(--modux-primary, #2563eb)" stroke-width="1.4" stroke-dasharray="5 4"
                marker-end="url(#seq-filled-sync)"
              ></line>` : ""}
          ${(s = this._reorder) != null && s.moved ? J`<line
                x1=${xi / 2} y1=${this._reorder.y} x2=${n - xi / 2} y2=${this._reorder.y}
                style="stroke: var(--modux-primary, #2563eb)" stroke-width="1.4" stroke-dasharray="7 5"
              ></line>` : ""}
        </svg>
        ${e && !t.length && !i.length ? w`<div class="empty">
              Sin participantes todavía — añádelos con «＋ Participante…» y arrastra entre
              líneas de vida para crear mensajes
            </div>` : ""}
        ${this._editor ? w`
              <div class="msg-editor" style="left: ${this._editor.x}px; top: ${this._editor.y}px">
                <input
                  class="label"
                  placeholder="Etiqueta del mensaje…"
                  .value=${this._editor.label}
                  @input=${(d) => this._editor = { ...this._editor, label: d.target.value }}
                  @keydown=${(d) => {
      d.key === "Enter" && this.commitEditor(), d.key === "Escape" && (this._editor = null), d.stopPropagation();
    }}
                />
                <input
                  class="guard"
                  placeholder="[guarda]"
                  .value=${this._editor.guard}
                  @input=${(d) => this._editor = { ...this._editor, guard: d.target.value }}
                  @keydown=${(d) => {
      d.key === "Enter" && this.commitEditor(), d.key === "Escape" && (this._editor = null), d.stopPropagation();
    }}
                />
                <select
                  @change=${(d) => this._editor = {
      ...this._editor,
      kind: d.target.value
    }}
                >
                  ${["COMMAND", "QUERY", "EVENT", "EXTERNAL"].map(
      (d) => w`<option value=${d} ?selected=${d === this._editor.kind}>
                        ${_o[d]}
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
var Up = Object.defineProperty, zp = Object.getOwnPropertyDescriptor, ne = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? zp(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Up(t, i, o), o;
};
const cn = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, qp = Object.keys(cn);
function Bp(e, t) {
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
function Fp(e, t) {
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
      var a;
      const t = e.composedPath()[0], i = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (i === "input" || i === "textarea" || i === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const n = this.renderRoot.querySelector("modux-canvas"), o = (s) => {
        e.preventDefault(), this.onDiagramScopeChange(s);
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
          e.preventDefault(), n == null || n.fit(), (a = this.renderRoot.querySelector("modux-explorer")) == null || a.fit();
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
      const { id: t, appId: i, beforeId: n, nestRowId: o } = e.detail, a = Ce(t);
      if (!(a != null && a.itemId)) return;
      const s = this.menuEntryIn(a.appId, a.itemId);
      if (!s) return;
      const d = (r, c) => (r ?? []).some((g) => g.id === c || d(g.children, c));
      if (o) {
        const r = Ce(o);
        if (!(r != null && r.itemId) || r.itemId === a.itemId || a.appId === r.appId && d(s.entry.children, r.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: r.appId,
          itemId: a.itemId,
          parentId: r.itemId
        });
        return;
      }
      if (n) {
        const r = Ce(n);
        if (!(r != null && r.itemId) || r.itemId === a.itemId) return;
        const c = this.menuEntryIn(r.appId, r.itemId);
        if (!c || a.appId === r.appId && d(s.entry.children, r.itemId) || a.appId === r.appId && c.parentId === s.parentId && s.beforeId === r.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: a.appId,
          toAppId: r.appId,
          itemId: a.itemId,
          parentId: c.parentId ?? void 0,
          beforeItemId: r.itemId
        });
        return;
      }
      i && this.command({ kind: "move-menu-item", appId: a.appId, toAppId: i, itemId: a.itemId });
    }, this.onWizardSlotRequested = (e) => {
      var a;
      const { id: t, beforeId: i } = e.detail, n = /^wizrow:([^:]+):(.+)$/.exec(t);
      if (!n) return;
      const o = i ? ((a = /^wizrow:[^:]+:(.+)$/.exec(i)) == null ? void 0 : a[1]) ?? null : null;
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
      const { fromPageId: t, toPageId: i, componentId: n, toParentId: o, beforeComponentId: a } = e.detail, s = this.componentIn(t, n);
      if (!s || t === i) return;
      const d = JSON.parse(JSON.stringify(s.node)), { ops: r } = this.rebuildComponentOps(i, d, o ?? void 0, a);
      for (const c of r) this.command(c, !1);
      this.command({ kind: "remove-page-component", pageId: t, componentId: n }, !1), this.pushUndoEntry([
        { kind: "remove-page-component", pageId: i, componentId: n },
        ...this.rebuildComponentOps(t, d, s.parentId ?? void 0, s.beforeId).ops
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
      const a = { ...o.nodes };
      delete a[e];
      const s = { ...o.sizes ?? {} };
      delete s[e], i[n] = { ...o, nodes: a, sizes: s }, t = !0;
    }
    t && (this.layout = i, this.emit("layout-changed", { layout: this.layout }));
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    var t;
    if (e.has("model") && this._pendingNames.clear(), e.has("model") && this.pruneStaleEdgePoints(), e.has("model") && this._interactionMode === "authored" && this._interactionId) {
      const i = (this.model.interactions ?? []).find((n) => n.id === this._interactionId);
      if (i) {
        const n = JSON.parse(JSON.stringify(i)), o = ii(n), a = (((t = this._editingInteraction) == null ? void 0 : t.participants) ?? []).filter(
          (s) => !o.some((d) => d.ref === s.ref) && !n.messages.some((d) => d.fromRef === s.ref || d.toRef === s.ref)
        );
        a.length && (n.participants = [...o, ...a]), this._editingInteraction = n;
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
      const a = So(
        this.model,
        n.startsWith("distribution") ? "distribution" : "unified"
      ), s = /* @__PURE__ */ new Map(), d = (m, f = 0) => {
        if (f > 12) return o.nodes[m] ?? null;
        const y = s.get(m);
        if (y) return y;
        const v = o.nodes[m], b = a.get(m);
        if (!b)
          return v && s.set(m, v), v ?? null;
        if (!v) return null;
        const h = d(b, f + 1), l = h ? { x: h.x + v.x, y: h.y + v.y } : v;
        return s.set(m, l), l;
      }, r = {};
      for (const m of Object.keys(o.nodes))
        r[m] = d(m) ?? o.nodes[m];
      const c = new Set(a.values()), g = { ...o.sizes ?? {} };
      for (const m of Object.keys(g)) c.has(m) && delete g[m];
      i[n] = { ...o, nodes: r, sizes: g, flat: !0 }, t = !0;
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
    if (!(e.detail !== void 0 || t.some((g) => this.layout[g])) || !this.model.boundedContexts.length && !this.model.externalSystems.length) return;
    const n = { ...this.layout }, o = (g) => ft(n[g]), a = e.detail ?? "contexts", s = a === "detail" && n["context-map@detail"] ? o("context-map@detail") : a === "operations" && n["context-map@operations"] ? o("context-map@operations") : e, d = {
      nodes: { ...s.nodes },
      edges: { ...s.edges },
      sizes: { ...s.sizes ?? {} }
    };
    for (const g of ["context-map", "context-map@detail", "context-map@operations"]) {
      const m = o(g);
      for (const [f, y] of Object.entries(m.nodes)) f in d.nodes || (d.nodes[f] = y);
      for (const [f, y] of Object.entries(m.sizes ?? {})) f in d.sizes || (d.sizes[f] = y);
    }
    const r = /* @__PURE__ */ new Set();
    if (a === "contexts" || a === "distribution")
      for (const g of e.collapsed ?? []) r.add(g);
    else {
      const g = new Set(s.collapsed ?? []);
      for (const m of this.model.boundedContexts) r.add(m.id);
      for (const m of this.model.externalSystems) r.add(m.id);
      if (a === "operations") {
        for (const m of this.model.apis ?? []) r.add(m.id);
        for (const m of this.model.proxyApis ?? []) r.add(m.id);
        for (const m of this.model.apiImplementations ?? [])
          r.add(`apiimpl:${m.apiId}@${m.boundedContextId}`);
      }
      for (const m of g) r.delete(m);
    }
    n["context-map"] = { nodes: d.nodes, edges: d.edges, sizes: d.sizes, expanded: [...r] };
    const c = n["context-map@distribution"];
    if (c && !n.distribution) {
      const g = ft(c);
      n.distribution = {
        nodes: g.nodes,
        edges: g.edges,
        sizes: g.sizes,
        expanded: g.collapsed ?? []
      };
    }
    for (const g of t) delete n[g];
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
    const i = this.sceneFor(this._view), n = new Set(i.edges.map((d) => d.id)), o = new Set(i.nodes.map((d) => d.id)), a = t.filter((d) => {
      if (n.has(d)) return !1;
      const r = /^(?:[a-z-]+:)?(.+?)->(.+)$/i.exec(d);
      return !!r && o.has(r[1]) && o.has(r[2]);
    });
    if (!a.length) return;
    const s = { ...e.edges };
    a.forEach((d) => delete s[d]), this.writeViewLayout(this._view, { ...e, edges: s });
  }
  /**
   * Expanding a node grows its container over the neighbours: nudge the
   * top-level boxes apart (one undoable step) so the map stays legible.
   * Areas group by overlapping — pushing them apart would defeat them.
   */
  declumpView(e) {
    const t = this.viewLayout(e), i = this.sceneFor(e).nodes.filter(
      (s) => !s.parentId && !s.ownerId && s.kind !== "area"
    ), n = za(i), o = [...n.keys()].map((s) => ({
      kind: "move-node",
      view: e,
      id: s,
      pos: t.nodes[s] ?? null
    })), a = { ...t.nodes };
    for (const [s, d] of n) {
      const r = i.find((g) => g.id === s), c = t.nodes[s] ?? { x: r.x, y: r.y };
      a[s] = {
        x: Math.round(c.x + (d.x - r.x)),
        y: Math.round(c.y + (d.y - r.y))
      };
    }
    this.writeViewLayout(e, { ...t, nodes: a }), o.length && this.pushUndoEntry(o);
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
    const i = bc(e, t);
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
    const { id: t, x: i, y: n } = e.detail, o = this._view, a = this.viewLayout(o), s = a.nodes[t] ?? null;
    let d = { x: i, y: n };
    const r = this.sceneFor(o), c = r.nodes.find((m) => m.id === t);
    if (c != null && c.parentId) {
      const m = r.nodes.find((f) => f.id === c.parentId);
      m && (d = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(o, { ...a, nodes: { ...a.nodes, [t]: d } });
    const g = [{ kind: "move-node", view: o, id: t, pos: s }];
    if (o === "processes") {
      const m = this.stepReorderCommand(t);
      if (m) {
        const f = this.inverseOf(m);
        f && g.unshift(...f), this.command(m, !1);
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
    const { id: t, targetId: i, x: n, y: o } = e.detail, a = this.model.externalSystems.find((b) => b.id === t);
    if (a) {
      const b = i ? this.model.externalSystems.find((R) => R.id === i) : null;
      if (i && !b) return;
      for (let R = b; R; ) {
        if (R.id === t) return;
        const j = R.parentExternalSystemId;
        R = j ? this.model.externalSystems.find((V) => V.id === j) ?? null : null;
      }
      const h = (b == null ? void 0 : b.id) ?? null;
      if ((a.parentExternalSystemId ?? null) === h) return;
      const l = this._view, u = this.viewLayout(l), x = this.sceneFor(l), S = h ? x.nodes.find((R) => R.id === h) : void 0, T = S ? { x: n - S.x, y: o - S.y } : { x: n, y: o }, E = h ? (this.model.externalSystemDependencies ?? []).filter(
        (R) => R.sourceId === t && R.targetId === h || R.sourceId === h && R.targetId === t
      ) : [];
      this.pushUndoEntry([
        { kind: "set-external-system-parent", id: t, parentId: a.parentExternalSystemId ?? null },
        ...E.map((R) => ({
          kind: "add-external-dependency",
          sourceId: R.sourceId,
          targetId: R.targetId,
          ...R.type === "CQRS" ? { type: "CQRS" } : {}
        })),
        { kind: "move-node", view: l, id: t, pos: u.nodes[t] ?? null }
      ]), this.command({ kind: "set-external-system-parent", id: t, parentId: h }, !1), this.writeViewLayout(l, { ...u, nodes: { ...u.nodes, [t]: T } });
      return;
    }
    const s = (this.model.apis ?? []).find((b) => b.id === t) ?? (this.model.proxyApis ?? []).find((b) => b.id === t);
    if (!s || i && !this.model.externalSystems.some((b) => b.id === i)) return;
    const d = s.publishedByExternalSystemId ?? "", r = i ?? "";
    if (r === d) return;
    const c = this._view, g = this.viewLayout(c), m = this.sceneFor(c), f = r ? m.nodes.find((b) => b.id === r) : void 0, y = f ? { x: n - f.x, y: o - f.y } : { x: n, y: o }, v = [
      { kind: "set-api-publisher", id: t, targetId: d },
      { kind: "move-node", view: c, id: t, pos: g.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: r }, !1), this.writeViewLayout(c, { ...g, nodes: { ...g.nodes, [t]: y } }), this.pushUndoEntry(v);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: o } = e.detail, a = (this.model.apis ?? []).find((v) => v.id === t), s = this.model.externalSystems.find((v) => v.id === i);
    if (!a || !s || (this.model.proxyApis ?? []).some(
      (v) => v.targetApiId === t && v.publishedByExternalSystemId === i
    )) return;
    const r = `proxy-${ce(a.name)}-${ce(s.name)}`;
    if ((this.model.proxyApis ?? []).some((v) => v.id === r)) return;
    const c = this._view, g = this.viewLayout(c), f = this.sceneFor(c).nodes.find((v) => v.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: r,
        name: `${a.name}@${s.name}`,
        targetId: t,
        boundedContextId: i
      },
      !1
    );
    const y = [{ kind: "remove-proxy-api", id: r }];
    f && (y.push({ kind: "move-node", view: c, id: r, pos: g.nodes[r] ?? null }), this.writeViewLayout(c, {
      ...g,
      nodes: { ...g.nodes, [r]: { x: n - f.x, y: o - f.y } }
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
    var d, r, c;
    const t = e.target, i = (d = t.files) == null ? void 0 : d[0];
    if (t.value = "", !i) return;
    const n = await i.text(), o = this.selectedApiId(), a = o ? null : ((r = this.model.externalSystems.find((g) => g.id === this._selectedId)) == null ? void 0 : r.id) ?? null, s = o || a ? null : ((c = this.model.boundedContexts.find((g) => g.id === this._selectedId)) == null ? void 0 : c.id) ?? null;
    if (!o && !a && !s) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: n,
      fileName: i.name,
      apiId: o,
      homeExternalId: a,
      homeBoundedContextId: s
    });
  }
  /** One dropdown drives the diagram: the map, the distribution lens, or a specialized view. */
  onDiagramScopeChange(e) {
    e.startsWith("view:") && (this._view = e.slice(5), this._paletteOpen = !0);
  }
  /** Expansion is a sheet preference (persisted with the vista, not undoable). */
  onNodeCollapseToggled(e) {
    const { id: t } = e.detail, i = this._view, n = this.viewLayout(i), o = new Set(n.expanded ?? []), a = !o.has(t);
    a ? o.add(t) : o.delete(t), this.writeViewLayout(i, { ...n, expanded: [...o] }), a && this.declumpView(i);
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), o = this.sceneFor(i), a = { ...n.nodes }, s = [];
    for (const { id: d, x: r, y: c } of t) {
      s.push({ kind: "move-node", view: i, id: d, pos: n.nodes[d] ?? null });
      let g = { x: r, y: c };
      const m = o.nodes.find((f) => f.id === d);
      if (m != null && m.parentId) {
        const f = o.nodes.find((y) => y.id === m.parentId);
        f && (g = { x: r - f.x, y: c - f.y });
      }
      a[d] = g;
    }
    if (this.writeViewLayout(i, { ...n, nodes: a }), i === "processes")
      for (const { id: d } of t) {
        const r = this.stepReorderCommand(d);
        if (r) {
          const c = this.inverseOf(r);
          c && s.unshift(...c), this.command(r, !1);
        }
      }
    this.pushUndoEntry(s);
  }
  onNodeResized(e) {
    var y;
    const { id: t, x: i, y: n, w: o, h: a } = e.detail, s = this._view, d = this.viewLayout(s), r = this.sceneFor(s), c = r.nodes.find((v) => v.id === t), g = c != null && c.parentId ? r.nodes.find((v) => v.id === c.parentId) : void 0, m = g ? [] : r.nodes.filter((v) => v.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: s, id: t, size: ((y = d.sizes) == null ? void 0 : y[t]) ?? null },
      { kind: "move-node", view: s, id: t, pos: d.nodes[t] ?? null },
      ...m.map((v) => ({ kind: "move-node", view: s, id: v.id, pos: d.nodes[v.id] ?? null }))
    ]);
    const f = {
      ...d.nodes,
      [t]: g ? { x: i - g.x, y: n - g.y } : { x: i, y: n }
    };
    for (const v of m) f[v.id] = { x: v.x - i, y: v.y - n };
    this.writeViewLayout(s, {
      ...d,
      nodes: f,
      sizes: { ...d.sizes ?? {}, [t]: { w: o, h: a } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, n = this._view, o = this.viewLayout(n);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: n, id: t, points: o.edges[t] ?? null }
    ]);
    const a = { ...o.edges };
    a[t] = i, this.writeViewLayout(n, { ...o, edges: a });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = kn(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((s) => [s.id, s.x])), o = [...t.steps].sort(
      (s, d) => (n.get(s.id) ?? 0) - (n.get(d.id) ?? 0)
    );
    if (o.every((s, d) => s.id === t.steps[d].id)) return null;
    const a = o.findIndex((s) => s.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: a > 0 ? o[a - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: n, y: o, connectKind: a } = e.detail;
    this.applyConnection(t, i, n, o, a);
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
    return Ap(this.gestureHost(), e);
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
          const o = this.uniqueInteractionId(n), a = { id: o, name: n, participants: [], messages: [] };
          this._interactionMode = "authored", this._interactionId = o, this._editingInteraction = a, this.command(xt(a));
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
        await navigator.clipboard.writeText(Ep(e)), this.emit("modux-notice", { message: "Mermaid copiado al portapapeles" });
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
    const o = vo(this.model).find((d) => d.ref === i);
    if (!o) return;
    const a = ii(n);
    if (a.some((d) => d.ref === i)) {
      this.emit("modux-notice", { message: `«${o.name}» ya es participante` });
      return;
    }
    const s = {
      ...n,
      participants: [...a, { ref: i, name: o.name, type: o.type }]
    };
    this._editingInteraction = s, this.command(xt(s), !1);
  }
  onInteractionChanged(e) {
    const t = e.detail;
    this._editingInteraction = t, this.command(xt(t));
  }
  /** ✨ on an unbacked message: the EXISTING commands that build its mechanism (one undo). */
  onInteractionMaterialize(e) {
    const t = this._editingInteraction, i = t == null ? void 0 : t.messages.find((r) => r.id === e.detail.messageId);
    if (!t || !i) return;
    const n = ln(this.model, t), { commands: o, hint: a } = Cp(
      this.model,
      i,
      n.typeOf,
      n.nameOf
    );
    if (!o.length) {
      this.emit("modux-notice", { message: a ?? "Este mensaje no se puede materializar" });
      return;
    }
    const s = o.flatMap((r) => this.inverseOf(r) ?? []);
    for (const r of o) this.command(r, !1);
    s.length && this.pushUndoEntry(s);
    const d = {
      ...t,
      messages: t.messages.map((r) => r.id === i.id ? { ...r, backed: !0 } : r)
    };
    this._editingInteraction = d, this.command(xt(d));
  }
  applyConnection(e, t, i, n, o) {
    const a = this._gestureEffects, s = () => !!(this._connectPicker || this._relationPicker || this._extDepPicker || this._deletePicker), d = s();
    if (It(this.gestureHost(), this._view, e, t, i, n, o), this._gestureEffects === a && s() === d && o === void 0 && e !== t && ["context-map", "aggregates", "integrations"].includes(this._view)) {
      const r = this.sceneFor(this._view), c = (g) => r.nodes.some((m) => m.id === g);
      c(e) && c(t) && (this._connectPicker = {
        x: i ?? this.clientWidth / 2,
        y: n ?? 120,
        options: Ni(this.gestureHost(), e, t)
      });
    }
  }
  performDelete(e, t, i) {
    Tp(this.gestureHost(), this._view, e, t, i);
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
      rebuildComponentOps: (e, t, i, n, o, a) => this.rebuildComponentOps(e, t, i, n, o, a),
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
    (i === "note" || i === "area" || i === "ui" || i === "page" || i === "ui-app" || i === "url" || i === "boundedContext" || i === "aggregate" || i === "entity" || i === "value-object" || i === "process-step" || i === "workflow" || i === "workflow-step" || i === "domain-event" || i === "read-model" || i === "domain-service" || i === "query-service" || i === "use-case" || i === "external-use-case" || i === "external-table" || i === "mcp-server" || i === "mcp-gateway" || i === "application-event" || i === "external-system" || i === "actor" || i === "ai-agent" || i === "rag" || i === "api" || i === "proxy-api" || i === "api-operation") && this.command({ kind: "rename-element", type: i, id: t.replace(/^tgt:/, ""), name: n });
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
    const t = new Set(e.memberIds), i = (o, a, s = {}) => w`
      <label
        class="${s.child ? "child" : ""} ${s.implicit && !t.has(o) ? "implicit" : ""}"
        title=${s.implicit && !t.has(o) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(o)}
          @change=${(d) => this.toggleViewMember(o, d.target.checked)}
        />
        ${a}
      </label>
    `, n = (o, a) => a.length ? w`<h4>${o}</h4>${a}` : "";
    return w`
      <aside class="view-tree" @pointerdown=${(o) => o.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${n(
      "Contextos",
      this.model.boundedContexts.flatMap((o) => [
        i(o.id, o.name),
        ...(this.model.aggregates ?? []).filter((a) => a.boundedContextId === o.id).map((a) => i(a.id, a.name, { child: !0, implicit: t.has(o.id) }))
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
    const e = (this.model.views ?? []).find((y) => y.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.boundedContexts.filter((y) => t.has(y.id)), n = new Set(i.map((y) => y.id)), o = this.model.externalSystems.filter((y) => t.has(y.id)), a = new Set(o.map((y) => y.id)), s = (this.model.aggregates ?? []).filter(
      (y) => t.has(y.id) || n.has(y.boundedContextId)
    ), d = new Set(s.map((y) => y.id)), r = (this.model.uiApps ?? []).filter((y) => t.has(y.id)), c = /* @__PURE__ */ new Set(), g = (y) => {
      for (const v of y ?? [])
        v.pageId && c.add(v.pageId), g(v.children);
    };
    r.forEach((y) => g(y.menuItems));
    const m = (this.model.pages ?? []).filter(
      (y) => t.has(y.id) || c.has(y.id)
    ), f = new Set(r.map((y) => y.id));
    return {
      ...this.model,
      uiApps: r,
      pages: m,
      actorAppUses: (this.model.actorAppUses ?? []).filter((y) => f.has(y.appId)),
      boundedContexts: i,
      externalSystems: o,
      relations: this.model.relations.filter(
        (y) => n.has(y.sourceId) && n.has(y.targetId)
      ),
      flows: this.model.flows.filter(
        (y) => t.has(y.id) || (n.has(y.sourceId) || a.has(y.sourceId)) && (n.has(y.targetId) || a.has(y.targetId))
      ),
      aggregates: s,
      entities: (this.model.entities ?? []).filter((y) => d.has(y.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (y) => d.has(y.sourceAggregateId) && d.has(y.targetAggregateId)
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
        (y) => t.has(y.id) || (y.publishedByExternalSystemId ? a.has(y.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (y) => t.has(y.id) || (y.publishedByExternalSystemId ? a.has(y.publishedByExternalSystemId) : !1)
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
      const n = /^wflink:(.+)->(.+)$/.exec(e.detail.id), o = n ? (this.model.workflowGateways ?? []).find((a) => a.id === n[1]) : null;
      if (n && o && o.type === "SPLIT" && o.semantics === "EXCLUSIVE") {
        const a = ((i = (o.branchConditions ?? []).find((s) => s.targetId === n[2])) == null ? void 0 : i.expression) ?? "";
        this._branchCondEditor = { gatewayId: o.id, targetId: n[2], value: a };
      }
      return;
    }
    if (this._view === "workflows" && e.detail.kind === "workflow-gateway") {
      const n = (this.model.workflowGateways ?? []).find((a) => a.id === e.detail.id);
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
      const n = e.detail.id.replace(/^archi:/, ""), o = (this.model.archimateRelations ?? []).find((a) => a.id === n);
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
          ...Ni(this.gestureHost(), o.sourceId, o.targetId).map((a) => ({
            ...a,
            label: a.id === `archimate:${o.type}` ? `● ${a.label}` : a.label,
            apply: () => {
              this.command({
                kind: "set-archimate-relation-type",
                id: n,
                type: a.id.replace(/^archimate:/, "")
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
      const n = (this.model.aggregates ?? []).find((s) => (s.invariants ?? []).some((d) => d.id === e.detail.id));
      if (n) {
        this.openInDrawer({ elementType: "aggregate", id: n.id });
        return;
      }
      const o = (this.model.valueObjects ?? []).find((s) => (s.invariants ?? []).some((d) => d.id === e.detail.id));
      if (o) {
        this.openInDrawer({ elementType: "value-object", id: o.id });
        return;
      }
      const a = (this.model.entities ?? []).find((s) => (s.invariants ?? []).some((d) => d.id === e.detail.id));
      if (a) {
        this.openInDrawer({ elementType: "entity", id: a.id });
        return;
      }
      return;
    }
    const t = e.detail.kind === "process-step" ? Fp(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const n = this.owningWorkflowOf(e.detail.id);
      return n ? { elementType: "workflow", id: n.id } : null;
    })() : Bp(e.detail.id, e.detail.kind);
    t && this.openInDrawer(t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (a) => {
      for (const s of a ?? [])
        s.id && t.add(s.id), i(s.children);
    };
    (this.model.uiApps ?? []).forEach((a) => i(a.menuItems));
    const n = `mi-${ce(e)}`;
    let o = n;
    for (let a = 2; t.has(o); a++) o = `${n}-${a}`;
    return o;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const i = (this.model.pages ?? []).find((a) => a.id === e);
    let n = null;
    const o = (a, s) => {
      var r;
      const d = a ?? [];
      for (let c = 0; c < d.length; c++)
        d[c].id === t && (n = { node: d[c], parentId: s, beforeId: ((r = d[c + 1]) == null ? void 0 : r.id) ?? null }), o(d[c].children, d[c].id);
    };
    return o(i == null ? void 0 : i.content, null), n;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, n, o = !1, a) {
    const s = a ?? this.allComponentIds(), d = (m) => {
      if (!o) return m.id;
      const f = `cmp-${ce(m.kind)}`;
      let y = f;
      for (let v = 2; s.has(y) || s.has(`${y}-tab-1`); v++) y = `${f}-${v}`;
      return s.add(y), y;
    }, r = [], c = (m, f) => {
      const y = d(m);
      r.push({ kind: "add-page-component", pageId: e, componentId: y, componentKind: m.kind, parentComponentId: f }), m.kind === "tabLayout" && (r.push({ kind: "remove-page-component", pageId: e, componentId: `${y}-tab-1` }), r.push({ kind: "remove-page-component", pageId: e, componentId: `${y}-tab-2` })), r.push({ kind: "set-page-component", pageId: e, componentId: y, ...this.cmpPatch(m) });
      for (const v of m.children ?? []) c(v, y);
      return y;
    }, g = c(t, i);
    return n && r.push({
      kind: "move-page-component",
      pageId: e,
      componentId: g,
      parentComponentId: i ?? null,
      beforeComponentId: n
    }), { ops: r, rootId: g };
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
    var a;
    if (i === t) return;
    const n = (((a = (this.model.pages ?? []).find((s) => s.id === e)) == null ? void 0 : a.wizardSteps) ?? []).map((s) => s.id ?? s.pageId), o = n.indexOf(t);
    o >= 0 && (i ? n[o + 1] === i : o === n.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: i });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((a) => a.id === e);
    let n = null;
    const o = (a, s) => {
      var r;
      const d = a ?? [];
      for (let c = 0; c < d.length; c++)
        d[c].id === t && (n = { entry: d[c], parentId: s, beforeId: ((r = d[c + 1]) == null ? void 0 : r.id) ?? null }), o(d[c].children, d[c].id ?? null);
    };
    return o(i == null ? void 0 : i.menuItems, null), n;
  }
  /** Paste under the selected node (inside a layout, after a leaf) or on the selected frame. */
  pasteComponent() {
    var s;
    const e = this._cmpClipboard;
    if (!e) return;
    let t = null, i, n = null;
    if (this._selectedCmp) {
      const d = this.componentIn(this._selectedCmp.pageId, this._selectedCmp.componentId);
      if (!d) return;
      t = this._selectedCmp.pageId, pe.LEAF_KINDS.has(d.node.kind) ? (i = d.parentId ?? void 0, n = d.beforeId) : i = d.node.kind === "tabLayout" && e.kind !== "tab" ? (s = (d.node.children ?? [])[0]) == null ? void 0 : s.id : d.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((d) => d.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: o, rootId: a } = this.rebuildComponentOps(t, e, i, n, !0);
    for (const d of o) this.command(d, !1);
    this.pushUndoEntry([{ kind: "remove-page-component", pageId: t, componentId: a }]), this._selectedCmp = { pageId: t, componentId: a };
  }
  /** The «Diseño» surface: every page as a frame, edited in place (Figma-style). */
  renderFigma() {
    const e = this.viewLayout("design");
    return w`<modux-figma
      .pages=${this.filteredModel().pages ?? []}
      .layout=${e.nodes}
      .sizes=${e.sizes ?? {}}
      @frame-resized=${(t) => {
      var s;
      const { id: i, w: n, h: o } = t.detail, a = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: i, size: ((s = a.sizes) == null ? void 0 : s[i]) ?? null }
      ]), this.writeViewLayout("design", {
        ...a,
        sizes: { ...a.sizes ?? {}, [i]: { w: n, h: o } }
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
      const { pageId: i, fieldId: n, stereotype: o, colspan: a, label: s } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: n, stereotype: o, colspan: a, label: s });
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
            (o) => (o.operations ?? []).map((a) => ({ id: a.id, name: `${a.name} (${o.name})` }))
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
    var d, r, c;
    const t = (d = e.dataTransfer) == null ? void 0 : d.getData("application/x-modux-palette");
    if (!t) return;
    e.preventDefault();
    const i = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._yugo ? this.renderRoot.querySelector("modux-explorer") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const n = i.sceneFromClient(e.clientX, e.clientY);
    let o = ((r = i.nodeIdAtClient(e.clientX, e.clientY)) == null ? void 0 : r.replace(/^(tgt:|flow:)/, "")) ?? null;
    !o && "nodeIdNearClient" in i && (o = ((c = i.nodeIdNearClient(e.clientX, e.clientY)) == null ? void 0 : c.replace(/^(tgt:|flow:)/, "")) ?? null);
    const a = this._view === "design" && "dropSlotAtClient" in i ? i.dropSlotAtClient(e.clientX, e.clientY) : null;
    let s;
    try {
      s = JSON.parse(t);
    } catch {
      return;
    }
    s.new ? this.createFromPalette(s.new, n, o, a) : s.existing && this.placeExistingFromPalette(s.existing, n, o, e.clientX, e.clientY, a);
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
      i.boundedContexts.flatMap((o) => (o.useCases ?? []).map((a) => a.name)),
      i.boundedContexts.flatMap((o) => (o.domainEvents ?? []).map((a) => a.name)),
      i.boundedContexts.flatMap((o) => (o.applicationEvents ?? []).map((a) => a.name)),
      i.boundedContexts.flatMap((o) => (o.readModels ?? []).map((a) => a.name)),
      i.boundedContexts.flatMap((o) => (o.domainServices ?? []).map((a) => a.name)),
      i.boundedContexts.flatMap((o) => (o.queryServices ?? []).map((a) => a.name)),
      i.boundedContexts.flatMap((o) => (o.scheduledTriggers ?? []).map((a) => a.name)),
      (i.aggregates ?? []).map((o) => o.name),
      (i.entities ?? []).map((o) => o.name),
      (i.actors ?? []).map((o) => o.name),
      (i.areas ?? []).map((o) => o.name),
      i.externalSystems.map((o) => o.name),
      i.externalSystems.flatMap((o) => (o.useCases ?? []).map((a) => a.name)),
      i.externalSystems.flatMap((o) => (o.tables ?? []).map((a) => a.name)),
      i.externalSystems.flatMap((o) => (o.mcpServers ?? []).map((a) => a.name)),
      (i.apis ?? []).map((o) => o.name),
      (i.apis ?? []).flatMap((o) => (o.operations ?? []).map((a) => a.name)),
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
      const o = t.nodes.find((a) => a.id === n);
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
      const a = Math.max(Math.abs(e.x - o.x) - (o.w ?? 0) / 2, 0), s = Math.max(Math.abs(e.y - o.y) - (o.h ?? 0) / 2, 0), d = Math.hypot(a, s);
      d < n && (n = d, i = o.id);
    }
    return i;
  }
  dropContainerFor(e, t) {
    var o, a;
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
    ].includes(e)) return i.find((s) => this.model.boundedContexts.some((d) => d.id === s)) ?? null;
    if (e === "invariant") {
      const s = i.find((g) => (this.model.valueObjects ?? []).some((m) => m.id === g));
      if (s) return s;
      const d = i.find((g) => (this.model.entities ?? []).some((m) => m.id === g));
      if (d) return d;
      const r = i.find((g) => (this.model.aggregates ?? []).some((m) => m.id === g));
      if (r) return r;
      const c = i.find((g) => this.model.boundedContexts.some((m) => m.id === g));
      return ((o = (this.model.aggregates ?? []).find((g) => g.boundedContextId === c)) == null ? void 0 : o.id) ?? null;
    }
    if (["read-model", "entity", "value-object"].includes(e)) {
      const s = i.find((r) => (this.model.aggregates ?? []).some((c) => c.id === r));
      if (s) return s;
      const d = i.find((r) => this.model.boundedContexts.some((c) => c.id === r));
      return ((a = (this.model.aggregates ?? []).find((r) => r.boundedContextId === d)) == null ? void 0 : a.id) ?? null;
    }
    if (["external-use-case", "external-table", "mcp-server"].includes(e))
      return i.find((s) => this.model.externalSystems.some((d) => d.id === s)) ?? null;
    if (e === "model-field")
      return i.find((s) => (this.model.models ?? []).some((d) => d.id === s)) ?? null;
    if (e === "etl-flow" && this._view === "integrations" && this.model.boundedContexts.length === 1)
      return this.model.boundedContexts[0].id;
    if (e === "ui-button")
      return i.find((s) => (this.model.buttonGroups ?? []).some((d) => d.id === s)) ?? null;
    if (e === "use-case-step")
      return i.find(
        (s) => this.model.boundedContexts.some((d) => (d.useCases ?? []).some((r) => r.id === s))
      ) ?? null;
    if (e === "api-operation") {
      for (const s of i) {
        if ((this.model.apis ?? []).some((c) => c.id === s)) return s;
        const d = /^apiimpl:(.+)@(.+)$/.exec(s);
        if (d && (this.model.apis ?? []).some((c) => c.id === d[1])) return d[1];
        const r = (this.model.proxyApis ?? []).find((c) => c.id === s);
        if (r != null && r.targetApiId) return r.targetApiId;
      }
      return null;
    }
    return e === "api" ? i.find((s) => this.model.externalSystems.some((d) => d.id === s)) ?? i.find((s) => this.model.boundedContexts.some((d) => d.id === s)) ?? null : null;
  }
  createFromPalette(e, t, i, n = null) {
    var f, y;
    const o = xo.find((v) => v.type === e);
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
      const v = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, b = v ? v[1] : i && (this.model.pages ?? []).some((u) => u.id === i) ? i : null;
      if (!b) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: h, name: l } = this.uniquePaletteName("Custom code");
      this.command({ kind: "add-custom-code", id: h, name: l }, !1), v ? (this.command({ kind: "set-page-component-custom-code", pageId: b, componentId: v[2], targetId: h }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: b, targetId: h }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const v = e.slice(4), b = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, h = b ? b[1] : i && (this.model.pages ?? []).some((T) => T.id === i) ? i : null;
      if (!h) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let l = b ? b[2] : void 0, u = null;
      if (v === "tab") {
        let T = null, E = l ? this.componentIn(h, l) : null;
        for (; E; ) {
          if (E.node.kind === "tabLayout") {
            T = E.node.id;
            break;
          }
          E = E.parentId ? this.componentIn(h, E.parentId) : null;
        }
        if (!T) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const R = this.componentIn(h, T).node, j = this.newComponentId("tab"), V = `Pestaña ${(R.children ?? []).filter((se) => se.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: h, componentId: j, componentKind: "tab", parentComponentId: T }, !1), this.command({ kind: "set-page-component", pageId: h, componentId: j, title: V }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: h, componentId: j }]);
        return;
      }
      if (n != null && n.componentId && n.pos !== "into") {
        const T = this.componentIn(h, n.componentId);
        T && T.node.kind === "tab" ? l = T.node.id : T && (l = T.parentId ?? void 0, u = n.pos === "before" ? n.componentId : T.beforeId);
      } else if (l) {
        const T = ((f = this.componentIn(h, l)) == null ? void 0 : f.node) ?? null;
        (T == null ? void 0 : T.kind) === "tabLayout" && (T.children ?? [])[0] && (l = (T.children ?? [])[0].id);
      }
      const x = this.newComponentId(v), S = {
        kind: "add-page-component",
        pageId: h,
        componentId: x,
        componentKind: v,
        parentComponentId: l
      };
      if (!u) {
        this.command(S);
        return;
      }
      this.command(S, !1), this.command(
        { kind: "move-page-component", pageId: h, componentId: x, parentComponentId: l ?? null, beforeComponentId: u },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: h, componentId: x }]);
      return;
    }
    const a = this._view, s = this.sceneFor(a), d = (v, b) => {
      if (this.purgeNodeGeometry(v), b)
        return { kind: "move-node", view: a, id: v, pos: null };
      const h = this.viewLayout(a);
      return this.writeViewLayout(a, {
        ...h,
        nodes: { ...h.nodes, [v]: { x: Math.round(t.x), y: Math.round(t.y) } }
      }), { kind: "move-node", view: a, id: v, pos: null };
    }, r = (v, b, h) => {
      const l = this.inverseOf(v) ?? [];
      this.command(v, !1);
      const u = d(b, h);
      this.pushUndoEntry([...l, u]);
    };
    if (!o.child) {
      const { id: v, name: b } = this.uniquePaletteName(o.label), h = e === "boundedContext" ? { kind: "add-boundedContext", id: v, name: b, subdomainType: "SUPPORTING" } : e === "note" ? { kind: "add-note", id: v, name: b } : e === "area" ? { kind: "add-area", id: v, name: b } : e === "actor" ? { kind: "add-actor", id: v, name: b } : e === "external-system" ? { kind: "add-external-system", id: v, name: b } : e === "ai-agent" ? { kind: "add-ai-agent", id: v, name: b } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: v, name: b, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: v, name: b } : e === "rag" ? { kind: "add-rag", id: v, name: b } : e === "api" ? { kind: "add-api", id: v, name: b } : e === "proxy-api" ? { kind: "add-proxy-api", id: v, name: b } : e === "ui" ? { kind: "add-ui", id: v, name: b } : e === "ui-app" ? { kind: "create-ui-app", id: v, name: b } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: v, name: b, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: v, name: b, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: v, name: b, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: v, name: b } : e === "transformation" ? { kind: "add-transformation", id: v, name: b } : e === "custom-code" ? { kind: "add-custom-code", id: v, name: b } : e === "button-group" ? { kind: "add-button-group", id: v, name: b } : e === "identity-provider" ? { kind: "add-identity-provider", id: v, name: b } : e === "service" ? { kind: "add-service", id: v, name: b } : e === "url" ? { kind: "add-url", id: v, name: b } : {
        kind: "add-workflow",
        id: v,
        name: b,
        completionEventName: `${b.replace(/\s+/g, "")}Completado`
      };
      if (h.kind === "add-ui") {
        const u = this.dropChain(i).find((x) => this.model.boundedContexts.some((S) => S.id === x));
        if (u) {
          r({ ...h, boundedContextId: u }, v);
          return;
        }
      }
      if (h.kind === "create-ui-app") {
        const u = this.dropChain(i).find((x) => this.model.boundedContexts.some((S) => S.id === x));
        if (u) {
          r({ ...h, boundedContextId: u }, v);
          return;
        }
      }
      if (h.kind === "add-external-system") {
        const u = this.dropChain(i).find((x) => this.model.externalSystems.some((S) => S.id === x));
        if (u) {
          r({ ...h, parentId: u }, v), this.emit("modux-notice", { message: "Subsistema creado como parte del sistema" });
          return;
        }
      }
      r(h, v);
      return;
    }
    if (e === "ui-wizard-step") {
      const b = this.dropChain(i).map((x) => {
        var S;
        return ((S = /^wizrow:([^:]+):/.exec(x)) == null ? void 0 : S[1]) ?? x;
      }).find((x) => (this.model.pages ?? []).some((S) => S.id === x && S.type === "WIZARD"));
      if (!b) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const h = ((y = (this.model.pages ?? []).find((x) => x.id === b)) == null ? void 0 : y.wizardSteps) ?? [], l = new Set(h.map((x) => x.id ?? x.pageId));
      let u = h.length + 1;
      for (; l.has(`wzs-${u}`); ) u++;
      this.command({ kind: "add-page-wizard-step", pageId: b, itemId: `wzs-${u}`, label: `Paso ${u}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const v = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", b = v === "CRUD" ? "CRUD" : v === "WIZARD" ? "Wizard" : "Página", { id: h, name: l } = this.uniquePaletteName(b), u = this.dropChain(i), x = u.find((T) => (this.model.uiApps ?? []).some((E) => E.id === T)), S = u.map((T) => {
        var E;
        return ((E = /^wizrow:([^:]+):/.exec(T)) == null ? void 0 : E[1]) ?? T;
      }).find((T) => (this.model.pages ?? []).some((E) => E.id === T && E.type === "WIZARD"));
      if (S) {
        const T = s.nodes.find((R) => R.id === S);
        T && (t.x = T.x + T.w / 2 + 160, t.y = T.y - T.h / 2 + 40), this.command({ kind: "create-ui-page", id: h, name: l, pageType: v }, !1), this.command({ kind: "add-page-wizard-step", pageId: S, targetId: h }, !1);
        const E = d(h);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: h }, E]), this.emit("modux-notice", { message: `${l} creada como paso del wizard` });
        return;
      }
      if (x) {
        const T = s.nodes.find((E) => E.id === x);
        T && (t.x = T.x + T.w / 2 + 160, t.y = T.y - T.h / 2 + 40);
      }
      r(
        x ? { kind: "create-ui-page", id: h, name: l, pageType: v, appId: x, menuLabel: l } : { kind: "create-ui-page", id: h, name: l, pageType: v },
        h
      );
      return;
    }
    if (e === "menu-item") {
      const v = this.dropChain(i), b = v.find((S) => (this.model.uiApps ?? []).some((T) => T.id === S));
      if (!b) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const h = /* @__PURE__ */ new Set(), l = (S) => {
        for (const T of S ?? [])
          h.add(T.label), l(T.children);
      };
      (this.model.uiApps ?? []).forEach((S) => l(S.menuItems));
      let u = "Entrada";
      for (let S = 2; h.has(u); S++) u = `Entrada ${S}`;
      const x = v.map((S) => Ce(S)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: b,
        label: u,
        itemId: this.newMenuItemId(u),
        parentId: x == null ? void 0 : x.itemId,
        parentLabel: x != null && x.itemId || x == null ? void 0 : x.label
      });
      return;
    }
    if (e === "etl-transform") {
      const b = this.dropChain(i).map((u) => (this.model.etlFlows ?? []).find((x) => x.id === u)).find(Boolean);
      if (!b) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const h = new Set((b.steps ?? []).map((u) => u.id));
      let l = (b.steps ?? []).length + 1;
      for (; h.has(`ets-${l}`); ) l++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: b.id,
        id: `ets-${l}`,
        name: `Transformación ${l}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "etl-flow" && !this.dropContainerFor(e, i)) {
      const v = this.uniquePaletteName(o.label);
      r({ kind: "add-etl-flow", id: v.id, name: v.name }, v.id), this.emit("modux-notice", {
        message: "Integrador creado suelto — su contexto dueño se fija en la ficha; cablea fuentes y escrituras aquí"
      });
      return;
    }
    if (e === "workflow-join" || e === "workflow-split") {
      const { id: v, name: b } = this.uniquePaletteName(e === "workflow-join" ? "Join" : "Split");
      r({
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
      const b = this.model.workflows ?? [], h = this.dropChain(i), l = h.map((E) => b.find((R) => R.id === E)).find(Boolean), u = h.map((E) => {
        const R = b.find((j) => (j.steps ?? []).some((V) => V.id === E));
        return R ? { owner: R, stepId: E } : null;
      }).find(Boolean);
      let x = l ?? (u == null ? void 0 : u.owner);
      if (!x && b.length === 1 && (x = b[0]), !x) {
        if (!b.length) {
          this.emit("modux-notice", { message: "Crea antes un workflow: los pasos viven en uno" });
          return;
        }
        this._wfStepPicker = { pos: t, stepType: void 0 };
        return;
      }
      const { id: S, name: T } = this.uniquePaletteName(
        "Paso"
      );
      u && (t = { x: t.x + 190, y: t.y }), r(
        {
          kind: "add-workflow-step",
          workflowId: x.id,
          id: S,
          name: T,
          ...u ? { dependsOnStepIds: [u.stepId], afterStepId: u.stepId } : {}
        },
        S
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${x.name} — se ve en la vista Workflows`
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
      const { id: b, name: h } = this.uniquePaletteName("API"), l = { kind: "add-api", id: b, name: h }, u = this.inverseOf(l) ?? [];
      this.command(l, !1), this.model.externalSystems.some((E) => E.id === v) ? this.command({ kind: "set-api-publisher", id: b, targetId: v }, !1) : this.command({ kind: "add-api-implementation", apiId: b, boundedContextId: v }, !1);
      const x = this.viewLayout(this._view), S = this.sceneFor(this._view).nodes.find((E) => E.id === v), T = S ? { x: Math.round(t.x - S.x), y: Math.round(t.y - S.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...x, nodes: { ...x.nodes, [b]: T } }), this.pushUndoEntry([...u, { kind: "move-node", view: this._view, id: b, pos: null }]);
      return;
    }
    let c = this.dropContainerFor(e, i);
    if (!c && this._view === "aggregates" && ["value-object", "entity", "invariant"].includes(e) && (c = this.nearestAggregateTo(t)), !c) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : ["entity", "value-object", "invariant"].includes(e) ? "Suéltalo sobre un agregado (o cerca de uno, en la vista de agregados)" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const { id: g, name: m } = this.uniquePaletteName(o.label);
    if (e === "aggregate")
      r({ kind: "add-aggregate", id: g, name: m, boundedContextId: c }, g, c);
    else if (e === "entity") {
      r({ kind: "add-entity", id: g, name: m, aggregateId: c }, g, c);
      const v = (this.model.aggregates ?? []).find((b) => b.id === c);
      this.emit("modux-notice", { message: `Entidad «${m}» creada en el agregado «${(v == null ? void 0 : v.name) ?? c}»` });
    } else if (e === "value-object") {
      r({ kind: "add-value-object", id: g, name: m, aggregateId: c }, g, c);
      const v = (this.model.aggregates ?? []).find((b) => b.id === c);
      this.emit("modux-notice", { message: `Value object «${m}» creado en el agregado «${(v == null ? void 0 : v.name) ?? c}»` });
    } else if (e === "invariant") {
      this.command({ kind: "add-invariant", ownerId: c, id: g, name: m });
      const v = (this.model.valueObjects ?? []).some((b) => b.id === c) ? "value object" : (this.model.entities ?? []).some((b) => b.id === c) ? "entidad" : "agregado";
      this.emit("modux-notice", {
        message: `Invariante declarado en el ${v} — sus condiciones se detallan en su ficha`
      });
    } else if (e === "ui-button") {
      const v = (this.model.buttonGroups ?? []).find((l) => l.id === c), b = new Set(((v == null ? void 0 : v.buttons) ?? []).map((l) => l.id));
      let h = ((v == null ? void 0 : v.buttons) ?? []).length + 1;
      for (; b.has(`btn-${h}`); ) h++;
      this.command({ kind: "add-group-button", id: c, itemId: `btn-${h}`, label: m }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: c, fieldId: g, name: m });
    else if (e === "module")
      r({ kind: "add-module", id: g, name: m, boundedContextId: c }, g, c), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      r(
        { kind: "add-use-case", id: g, name: m, boundedContextId: c, ...e === "policy" ? { policy: !0 } : {} },
        g,
        c
      );
    else if (e === "domain-event")
      r({ kind: "add-domain-event", id: g, name: m, boundedContextId: c }, g, c);
    else if (e === "application-event")
      r({ kind: "add-application-event", id: g, name: m, boundedContextId: c }, g, c);
    else if (e === "domain-service")
      r({ kind: "add-domain-service", id: g, name: m, boundedContextId: c }, g, c);
    else if (e === "query-service")
      r({ kind: "add-query-service", id: g, name: m, boundedContextId: c }, g, c);
    else if (e === "scheduled-trigger")
      r({ kind: "add-scheduled-trigger", id: g, name: m, boundedContextId: c }, g, c), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      r({ kind: "add-notification", id: g, name: m, boundedContextId: c }, g, c), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      r({ kind: "add-document", id: g, name: m, boundedContextId: c }, g, c), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      r({ kind: "add-etl-flow", id: g, name: m, boundedContextId: c }, g, c), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const v = (this.model.aggregates ?? []).find((b) => b.id === c);
      r({ kind: "add-read-model", id: g, name: m, aggregateId: c }, g, (v == null ? void 0 : v.boundedContextId) ?? c);
    } else if (e === "api-operation") {
      const v = (this.model.apis ?? []).find((x) => x.id === c), b = new Set(((v == null ? void 0 : v.operations) ?? []).map((x) => x.id));
      let h = m, l = `apiop-${c.replace(/^api-/, "")}-${ce(h)}`;
      for (let x = 2; b.has(l); x++)
        h = `${o.label} ${x}`, l = `apiop-${c.replace(/^api-/, "")}-${ce(h)}`;
      r({ kind: "add-api-operation", apiId: c, id: l, name: h }, l, c), s.nodes.some(
        (x) => x.parentId === c && (x.kind === "api-operation" || x.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(v == null ? void 0 : v.name) ?? c} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const v = this.model.boundedContexts.flatMap((u) => u.useCases ?? []).find((u) => u.id === c), b = new Set((v == null ? void 0 : v.stepIds) ?? []);
      let h = m, l = `step-${ce(h)}`;
      for (let u = 2; b.has(l); u++)
        h = `${o.label} ${u}`, l = `step-${ce(h)}`;
      r({ kind: "add-use-case-step", useCaseId: c, id: l, name: h }, l, c), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(v == null ? void 0 : v.name) ?? c} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? r({ kind: "add-external-use-case", id: g, name: m, boundedContextId: c }, g, c) : e === "external-table" ? r({ kind: "add-external-table", id: g, name: m, boundedContextId: c }, g, c) : e === "mcp-server" && r({ kind: "add-mcp-server", id: g, name: m, boundedContextId: c }, g, c);
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
      const y = (this.model.modelMappings ?? []).find((b) => b.id === e);
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
      const v = this.model.boundedContexts.flatMap((b) => b.useCases ?? []).find((b) => b.id === e);
      if (v) {
        if (e === n[2]) return;
        const b = (this.model.pages ?? []).find((l) => l.id === n[1]), h = ((b == null ? void 0 : b.buttons) ?? []).find((l) => l.useCaseId === n[2]);
        if (!h) return;
        if (((b == null ? void 0 : b.buttons) ?? []).some((l) => l.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: n[1], useCaseId: n[2] }, !1), this.command(
          { kind: "add-page-button", pageId: n[1], useCaseId: e, label: h.label, type: h.bar },
          !1
        ), h.mappingId && this.command(
          { kind: "set-page-button", pageId: n[1], useCaseId: e, label: null, mappingId: h.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: n[1], useCaseId: e },
          { kind: "add-page-button", pageId: n[1], useCaseId: n[2], label: h.label, type: h.bar },
          ...h.mappingId ? [{ kind: "set-page-button", pageId: n[1], useCaseId: n[2], label: null, mappingId: h.mappingId }] : []
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${v.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const o = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (o) {
      const y = this.model.boundedContexts.flatMap((b) => b.useCases ?? []).find((b) => b.id === e);
      if (!y) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const v = (this.model.pages ?? []).find((b) => b.id === o[1]);
      if (((v == null ? void 0 : v.buttons) ?? []).some((b) => b.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: o[1], useCaseId: e, type: o[2] }), this.emit("modux-notice", { message: `Botón de ${y.name} en la barra ${o[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const a = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, s = a ? a[1] : t && (this.model.pages ?? []).some((y) => y.id === t) ? t : null;
    if (!s) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const d = a ? ((f = this.componentIn(s, a[2])) == null ? void 0 : f.node) ?? null : null, r = this.model.boundedContexts.flatMap((y) => y.useCases ?? []).find((y) => y.id === e);
    if (r) {
      (d == null ? void 0 : d.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: s, componentId: d.id, ...this.cmpPatch(d), useCaseId: e, label: d.label ?? r.name }), this.emit("modux-notice", { message: `El botón lanza ${r.name}` })) : (this.command({ kind: "add-page-button", pageId: s, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${r.name} añadido a la página` }));
      return;
    }
    const c = (this.model.models ?? []).find((y) => y.id === e);
    if (c) {
      (d == null ? void 0 : d.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: s, componentId: d.id, ...this.cmpPatch(d), modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${c.name}` })) : (this.command({ kind: "set-page-model", pageId: s, modelId: e }), this.emit("modux-notice", { message: `${c.name} es el viewmodel de la página` }));
      return;
    }
    const g = (this.model.modelMappings ?? []).find((y) => y.id === e);
    if (g && ((d == null ? void 0 : d.kind) === "button" || (d == null ? void 0 : d.kind) === "form")) {
      this.command({ kind: "set-page-component", pageId: s, componentId: d.id, ...this.cmpPatch(d), mappingId: e }), this.emit("modux-notice", {
        message: d.kind === "form" ? `El formulario mapea con ${g.name} al guardar` : `El botón mapea con ${g.name}`
      });
      return;
    }
    const m = this.model.boundedContexts.flatMap((y) => (y.queryServices ?? []).flatMap((v) => (v.operations ?? []).map((b) => ({ op: b, qs: v })))).find(({ op: y }) => y.id === e);
    if (m) {
      (d == null ? void 0 : d.kind) === "listing" || (d == null ? void 0 : d.kind) === "crud" ? this.command({
        kind: "set-page-component",
        pageId: s,
        componentId: d.id,
        ...this.cmpPatch(d),
        queryOperationId: m.op.id,
        queryServiceId: m.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: s, queryServiceId: m.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${m.op.name}` });
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
  placeExistingFromPalette(e, t, i, n, o, a = null) {
    if (this._view === "design") {
      this.dropCatalogOnDesign(e, i, a);
      return;
    }
    if (i && i !== e) {
      this.applyConnection(e, i, n, o);
      return;
    }
    const s = this._view, d = this.sceneFor(s), r = d.nodes.find((f) => f.id === e);
    if (!r) {
      if (this._activeViewId) {
        this.command({ kind: "add-view-member", id: this._activeViewId, targetId: e });
        const f = this.viewLayout(s);
        this.writeViewLayout(s, {
          ...f,
          nodes: { ...f.nodes, [e]: { x: Math.round(t.x), y: Math.round(t.y) } }
        });
      } else
        this.emit("modux-notice", {
          message: "Ese elemento no se pinta en este nivel de detalle"
        });
      return;
    }
    const c = this.viewLayout(s), g = r.parentId ? d.nodes.find((f) => f.id === r.parentId) : void 0, m = g ? { x: Math.round(t.x - g.x), y: Math.round(t.y - g.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: s, id: e, pos: c.nodes[e] ?? null }]), this.writeViewLayout(s, { ...c, nodes: { ...c.nodes, [e]: m } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "distribution", "workflows", "ui", "design", "mappings", "integrations", "aggregates"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = xo.filter(
      (n) => (this._view === "aggregates" ? ["entity", "value-object", "invariant"].includes(n.type) : this._view === "workflows" ? ["workflow", "workflow-step", "workflow-join", "workflow-split"].includes(n.type) : this._view === "ui" ? ["ui", "ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(n.type) : this._view === "design" ? n.type === "page" || n.type === "custom-code" || n.type.startsWith("cmp:") : this._view === "integrations" ? ["etl-flow", "etl-transform", "external-system", "external-table"].includes(n.type) : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(n.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(n.type) && !n.type.startsWith("cmp:")) && (!e || n.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return w`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(n) => this._paletteFilter = n.target.value}
          />
          ${i === "new" ? w`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${Op.map((n) => {
      const o = t.filter((a) => a.group === n);
      return o.length ? w`
                        <div class="palette-g">${n}</div>
                        ${o.map(
        (a) => w`
                            <div
                              class="palette-item ${a.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${a.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : a.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(s) => this.onPaletteDragStart(s, { new: a.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${a.color}">
                                ${Tt[a.symbol]}
                              </svg>
                              <span class="pal-label">${a.label.replace(/^(Layout|Componente) · /, "")}</span>
                            </div>
                          `
      )}
                      ` : "";
    })}
              ` : w`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (n) => w`
                    <div class="palette-g">${n.label}</div>
                    ${n.items.map(
        (o) => w`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(a) => this.onPaletteDragStart(a, { existing: o.id })}
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
        ${this._view === "workflows" ? "" : w`
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
    var t, i, n, o, a, s, d;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const r = this._newBoundedContextId || ((t = this.model.boundedContexts[0]) == null ? void 0 : t.id);
        if (!r) return;
        this.command({ kind: "add-aggregate", id: `agg-${ce(e)}`, name: e, boundedContextId: r });
      } else if (this._view === "flows") {
        const r = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), c = this._newTargetId || ((o = this.model.boundedContexts[0]) == null ? void 0 : o.id), g = this._newTriggerEvent.trim();
        if (!r || !c || !g) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ce(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: r,
          triggerEvent: g,
          targetId: c
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const r = this._newBoundedContextId || ((a = this.model.boundedContexts[0]) == null ? void 0 : a.id);
        if (!r) return;
        this.command({
          kind: "add-process",
          id: `proc-${ce(e)}`,
          name: e,
          boundedContextId: r,
          triggerAggregateId: this._newTriggerAggId || ((d = (s = this.model.aggregates) == null ? void 0 : s[0]) == null ? void 0 : d.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      }
      this._newName = "";
    }
  }
  sceneFor(e, t) {
    const i = this.viewLayout(e), n = this.filteredModel(), o = (t == null ? void 0 : t.expandAll) ?? !1, a = e === "aggregates" ? cs(n, i.nodes) : e === "flows" ? vs(n, i.nodes) : e === "processes" ? kn(n, i.nodes) : e === "workflows" ? Rc(n, i.nodes, new Set(i.expanded ?? []), o) : e === "ui" ? qc(n, i.nodes, new Set(i.expanded ?? []), o) : e === "design" || e === "interactions" ? { nodes: [], edges: [] } : e === "integrations" ? Wc(n, i.nodes) : e === "mappings" ? Bc(n, i.nodes) : e === "eventstorming" ? Cc(n, i.nodes, new Set(i.expanded ?? []), o) : e === "distribution" ? ts(n, i.nodes, i.sizes ?? {}, new Set(i.expanded ?? []), o) : es(n, i.nodes, i.sizes ?? {}, new Set(i.expanded ?? []), o);
    if (e !== "design" && e !== "interactions" && (this.withAreas(a, e), this.withNotes(a, e)), this.withDescriptions(a), this.diff)
      for (const d of a.nodes) {
        const r = this.diff[d.id] ?? this.diff[d.id.replace(/^(tgt:|flow:)/, "")];
        r && (d.diffKind = r);
      }
    const s = ip(a, tp(n));
    return this._showDerived ? s : np(s);
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
    var a, s;
    const i = this.model.areas ?? [];
    if (!i.length) return;
    const n = this.viewLayout(t), o = n.sizes ?? {};
    for (const d of i) {
      const r = n.nodes[d.id];
      r && e.nodes.unshift({
        id: d.id,
        label: d.name,
        kind: "area",
        x: r.x,
        y: r.y,
        w: ((a = o[d.id]) == null ? void 0 : a.w) ?? 340,
        h: ((s = o[d.id]) == null ? void 0 : s.h) ?? 220,
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
    var d, r;
    const i = this.model.notes ?? [];
    if (!i.length) return;
    const n = this.viewLayout(t), o = new Set(e.nodes.map((c) => c.id)), a = new Set(e.edges.map((c) => c.id)), s = n.sizes ?? {};
    for (const c of i) {
      const g = n.nodes[c.id], m = (h) => o.has(h) ? h : o.has(`tgt:${h}`) ? `tgt:${h}` : o.has(`flow:${h}`) ? `flow:${h}` : null, f = (c.targetIds ?? []).map((h) => ({ raw: h, nodeId: m(h) })).filter((h) => !!h.nodeId), y = (c.edgeRefs ?? []).filter((h) => a.has(h));
      if (!g && !f.length && !y.length) continue;
      const v = f.length ? e.nodes.find((h) => h.id === f[0].nodeId) : void 0, b = g ?? { x: ((v == null ? void 0 : v.x) ?? 0) + 40, y: ((v == null ? void 0 : v.y) ?? 0) - 110 };
      e.nodes.push({
        id: c.id,
        label: c.text,
        kind: "note",
        x: b.x,
        y: b.y,
        w: ((d = s[c.id]) == null ? void 0 : d.w) ?? 150,
        h: ((r = s[c.id]) == null ? void 0 : r.h) ?? 72,
        fill: "#fef9c3",
        symbol: "note",
        resizable: !0
      });
      for (const h of f)
        e.edges.push({
          id: `note:${c.id}->${h.raw}`,
          sourceId: c.id,
          targetId: h.nodeId,
          kind: "note-link",
          dashed: !0,
          color: "#ca8a04"
        });
      for (const h of y)
        e.edges.push({
          id: `note:${c.id}->${h}`,
          sourceId: c.id,
          targetId: `edgeanchor:${h}`,
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
    var h;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((l) => !l.parentId && l.kind !== "area"), n = this._multi.length ? this._multi : this._selectedId ? [this._selectedId] : [], o = n.length > 0, a = new Set(n), s = o ? i.filter((l) => a.has(l.id)) : i;
    if (s.length < 2) return;
    const d = new Set(s.map((l) => l.id)), r = {
      nodes: s,
      edges: t.edges.filter((l) => d.has(l.sourceId) && d.has(l.targetId))
    }, g = e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? void 0 : Zc(ep(r)), m = await jc(r, g ? { partitions: g } : void 0), f = this.viewLayout(e);
    if (o) {
      let l = 0, u = 0, x = 0, S = 0;
      for (const j of s) {
        const V = f.nodes[j.id] ?? { x: j.x, y: j.y };
        l += V.x, u += V.y, x += m.nodes[j.id].x, S += m.nodes[j.id].y;
      }
      const T = s.length, E = (l - x) / T, R = (u - S) / T;
      for (const j of Object.keys(m.nodes))
        m.nodes[j] = { x: m.nodes[j].x + E, y: m.nodes[j].y + R };
      for (const j of Object.keys(m.edges))
        m.edges[j] = m.edges[j].map((V) => ({ x: V.x + E, y: V.y + R }));
    }
    const y = o ? r.edges.map((l) => l.id) : [], v = o ? t.edges.filter((l) => d.has(l.sourceId) !== d.has(l.targetId)).map((l) => l.id) : [], b = o ? [.../* @__PURE__ */ new Set([...y, ...v])] : Object.keys(f.edges);
    if (this.pushUndoEntry([
      ...s.map((l) => ({
        kind: "move-node",
        view: e,
        id: l.id,
        pos: f.nodes[l.id] ?? null
      })),
      // relayout rewrites these routes — restore the previous bends on undo
      ...b.map((l) => ({
        kind: "set-edge-points",
        view: e,
        id: l,
        points: f.edges[l] ?? null
      }))
    ]), o) {
      const l = { ...f.nodes };
      for (const x of s) l[x.id] = m.nodes[x.id];
      const u = { ...f.edges };
      for (const x of y) delete u[x];
      Object.assign(u, m.edges);
      for (const x of v) delete u[x];
      this.writeViewLayout(e, { ...f, nodes: l, edges: u });
    } else
      this.writeViewLayout(e, { ...f, nodes: m.nodes, edges: m.edges });
    await this.updateComplete, o || (h = this.renderRoot.querySelector("modux-canvas")) == null || h.fit();
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
      const s = new Set(n), d = new Set(
        this.sceneFor(e).edges.filter((r) => s.has(r.sourceId) || s.has(r.targetId)).map((r) => r.id)
      );
      o = i.filter((r) => d.has(r));
    }
    if (!o.length) return;
    this.pushUndoEntry(
      o.map((s) => ({
        kind: "set-edge-points",
        view: e,
        id: s,
        points: t.edges[s]
      }))
    );
    const a = { ...t.edges };
    for (const s of o) delete a[s];
    this.writeViewLayout(e, { ...t, edges: a });
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
      (y) => n.has(y.id) && !y.parentId && y.kind !== "area"
    );
    if (o.length < 2) return;
    const a = this.viewLayout(t), s = (y) => a.nodes[y.id] ?? { x: y.x, y: y.y }, d = e === "row" ? "y" : "x", r = o.reduce((y, v) => y + s(v)[d], 0) / o.length, c = new Set(o.map((y) => y.id)), g = this.sceneFor(t).edges.filter((y) => c.has(y.sourceId) || c.has(y.targetId)).map((y) => y.id).filter((y) => a.edges[y]);
    this.pushUndoEntry([
      ...o.map((y) => ({ kind: "move-node", view: t, id: y.id, pos: a.nodes[y.id] ?? null })),
      ...g.map((y) => ({ kind: "set-edge-points", view: t, id: y, points: a.edges[y] }))
    ]);
    const m = { ...a.nodes };
    for (const y of o) {
      const v = s(y);
      m[y.id] = d === "y" ? { x: v.x, y: r } : { x: r, y: v.y };
    }
    const f = { ...a.edges };
    for (const y of g) delete f[y];
    this.writeViewLayout(t, { ...a, nodes: m, edges: f });
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
    const e = this.model.interactions ?? [], t = this._interactionMode === "derived", i = Sp(this.model), n = [
      ["Casos de uso", i.filter((d) => d.kind === "USE_CASE")],
      ["Operaciones API", i.filter((d) => d.kind === "API_OPERATION")],
      ["Eventos", i.filter((d) => d.kind === "EVENT")]
    ], o = vo(this.model), a = [...new Set(o.map((d) => d.group))], s = !t && !!this._editingInteraction;
    return w`
      <select
        title="Secuencia authoreda del modelo — «＋ Nueva…» crea una vacía"
        @change=${(d) => this.onInteractionPick(d)}
      >
        <option value="" ?selected=${!t && !this._interactionId}>Secuencia: —</option>
        ${e.map(
      (d) => w`<option value=${d.id} ?selected=${!t && this._interactionId === d.id}>
              ${d.name}
            </option>`
    )}
        <option value="__new__">＋ Nueva…</option>
      </select>
      <select
        title="Derivar una secuencia efímera de un punto de entrada (solo lectura hasta fijarla)"
        @change=${(d) => this.onDerivePick(d)}
      >
        <option value="" ?selected=${t}>Derivar de: …</option>
        ${n.filter(([, d]) => d.length).map(
      ([d, r]) => w`
              <optgroup label=${d}>
                ${r.map((c) => w`<option value="${c.kind}|${c.ref}">${c.label}</option>`)}
              </optgroup>
            `
    )}
      </select>
      ${t && this.derivedInteraction ? w`<button
            class="tab"
            title="Guardar la secuencia derivada como authoreda en el modelo"
            @click=${() => this.pinDerivedInteraction()}
          >
            📌 Fijar como secuencia
          </button>` : ""}
      ${this.currentInteraction() ? w`<button
            class="tab"
            title="Copiar el sequenceDiagram mermaid de lo visible"
            @click=${() => void this.copyInteractionMermaid()}
          >
            ⧉ Mermaid
          </button>` : ""}
      ${!t && this._interactionId ? w`<button
            class="tab"
            title="Borrar la secuencia activa del modelo"
            @click=${() => {
      var d;
      return this._interactionDelete = {
        id: this._interactionId,
        name: ((d = this._editingInteraction) == null ? void 0 : d.name) ?? this._interactionId
      };
    }}
          >
            🗑
          </button>` : ""}
      <select
        title="Añadir un participante del catálogo a la secuencia (sin mensajes aún)"
        ?disabled=${!s}
        @change=${(d) => this.onParticipantPick(d)}
      >
        <option value="">＋ Participante…</option>
        ${a.map(
      (d) => w`
            <optgroup label=${d}>
              ${o.filter((r) => r.group === d).map((r) => w`<option value=${r.ref}>${r.label}</option>`)}
            </optgroup>
          `
    )}
      </select>
    `;
  }
  /** The «Secuencias» surface: one interaction as lifelines — no canvas Scene. */
  renderInteractionsView() {
    return this._interactionMode === "derived" ? this._derivePending ? w`<div class="seq-status">Derivando la secuencia…</div>` : this.derivedInteraction ? w`<modux-sequence
        .interaction=${this.derivedInteraction}
        .model=${this.model}
      ></modux-sequence>` : w`<div class="seq-status">
          La derivación no está disponible en este servidor (o ese punto de entrada no deriva nada
          todavía) — crea la secuencia a mano con «＋ Nueva…».
        </div>` : this._editingInteraction ? w`<modux-sequence
      .interaction=${this._editingInteraction}
      .model=${this.model}
      editable
      @interaction-changed=${this.onInteractionChanged}
      @interaction-materialize=${this.onInteractionMaterialize}
      @undo-requested=${this.undo}
      @redo-requested=${this.redo}
    ></modux-sequence>` : w`<div class="seq-status">
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
    return w`
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
    return e ? w`
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
    return w`
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
      (t) => w`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? w`
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
      (t) => w`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this.viewSelection().length || !this._activeViewId && (this._view === "context-map" || this._view === "distribution") ? w`
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
        ${this._view === "aggregates" || this._view === "processes" ? w`<select
              title=${this._view === "aggregates" ? "Contexto del nuevo agregado" : "Contexto dueño del proceso"}
              @change=${(t) => this._newBoundedContextId = t.target.value}
            >
              ${this.model.boundedContexts.map(
      (t) => {
        var i;
        return w`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newBoundedContextId || ((i = this.model.boundedContexts[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? w`
              ${this._view === "flows" ? w`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => w`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return w`<option
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
              ${this._view === "flows" ? w`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.boundedContexts, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return w`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? w`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => w`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? w`
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
      (t) => w`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? w`<input
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
              ${this.owningProcessOf(this._selectedId) ? w`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? w`
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
      (t) => w`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? w`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.boundedContexts.flatMap((t) => t.useCases ?? []).map(
      (t) => w`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
        ${this._multi.length >= 2 && !this._yugo ? w`
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
        ${this._view === "workflows" && ((this.model.processes ?? []).length || (this.model.sagas ?? []).length) ? w`<button
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
      ${this._view === "interactions" ? this.renderInteractionsView() : this._view === "design" ? w`${this.renderPalette()}${this.renderFigma()}` : this._yugo ? w`${this.renderPalette()}<modux-explorer
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
        t.detail.members.filter((a) => i.has(a.kind)).map((a) => a.id)
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
          ></modux-explorer>` : this._tilt ? w`
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
          ></modux-tilt>` : w`
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
        ${this._view === "interactions" ? w`Arrastra entre líneas de vida para crear un mensaje · arrastra un mensaje
            verticalmente para reordenarlo · doble click edita etiqueta, guarda y tipo · Supr
            borra el mensaje o el participante seleccionado · ✨ materializa un mensaje sin
            respaldo · una secuencia derivada es de solo lectura hasta fijarla con 📌` : this._view === "context-map" ? w`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema (y un sistema externo dentro/fuera de otro) · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? w`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? w`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : w`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
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
    return this._helpOpen ? w`
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
      ([t, i]) => w`
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
    const t = (this.model.views ?? []).find((s) => s.id === this._activeViewId), i = this.sceneFor(this._view), n = e.items.map(
      (s) => {
        var d;
        return ((d = i.nodes.find((r) => r.id === s.id)) == null ? void 0 : d.label) ?? s.id;
      }
    ), o = n.length === 1 ? `«${n[0]}»` : `${n.length} elementos (${n.join(", ")})`, a = e.memberIds.length > 0 && t;
    return w`
      <div class="picker-backdrop" @pointerdown=${() => this._deletePicker = null}></div>
      <div
        class="relation-picker"
        style="left: 50%; top: 120px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">
          ${a ? `¿Eliminar ${o}, o solo quitar de la vista?` : `¿Eliminar ${o} del modelo?`}
        </div>
        ${a ? w`
              <button
                class="picker-item"
                @click=${() => {
      const s = this._deletePicker;
      this._deletePicker = null;
      for (const d of new Set(s.memberIds))
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
      const s = this._deletePicker;
      this._deletePicker = null;
      for (const d of s.items)
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
    return e ? w`
      <div class="picker-backdrop" @pointerdown=${() => this._connectPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿Qué relación es esta línea?</div>
        ${e.options.map(
      (t) => w`
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
    return w`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(o) => o.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (o) => w`
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
    return e ? w`
      <div class="picker-backdrop" @pointerdown=${() => this._repoPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">Referenciar proyecto del catálogo</div>
        ${this.repositories.map(
      (t) => w`
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
    return e ? w`
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
    return e ? w`
      <div class="picker-backdrop" @pointerdown=${() => this._wfStepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿De qué workflow es el paso?</div>
        ${(this.model.workflows ?? []).map(
      (t) => w`
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
        const a = this.viewLayout(this._view);
        this.writeViewLayout(this._view, {
          ...a,
          nodes: { ...a.nodes, [n]: { x: Math.round(i.pos.x), y: Math.round(i.pos.y) } }
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
    return w`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${qp.map(
      (n) => w`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${cn[n].abbr}</span>
              <span class="name">${cn[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
ie.styles = [
  ca,
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
var Vp = Object.defineProperty, Wp = Object.getOwnPropertyDescriptor, $e = (e, t, i, n) => {
  for (var o = n > 1 ? void 0 : n ? Wp(t, i) : t, a = e.length - 1, s; a >= 0; a--)
    (s = e[a]) && (o = (n ? s(t, i, o) : s(o)) || o);
  return n && o && Vp(t, i, o), o;
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
    return w`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: n, title: o, mark: a, cls: s }) => {
      const d = this._diff.changes.filter((r) => r.kind === n);
      return d.length ? w`
            <div class="diff-group">${o} (${d.length})</div>
            ${d.map(
        (r) => w`
                <div class="diff-row">
                  <span class="diff-mark ${s}">${a}</span>
                  <span class="diff-type">${t(r.type)}</span>
                  <span class="diff-name" title=${r.id}>${r.name ?? r.id}</span>
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
    var o, a, s;
    const i = (o = this._workspace) == null ? void 0 : o.current;
    await this.trackWrite(async () => {
      var d;
      try {
        const r = await fetch(`${this.base}/solutions/${e}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(t)
        });
        if (!r.ok) {
          let c = `El servidor rechazó la operación (${r.status})`;
          try {
            const g = await r.json();
            g != null && g.message && (c = g.message);
          } catch {
          }
          this.showToast(c);
          return;
        }
        this._workspace = await r.json(), await this.reload(), await this.refreshDiff(), (d = this.renderRoot.querySelector("modux-editor")) == null || d.clearHistory();
      } catch (r) {
        this.showToast(String(r));
      }
    });
    const n = (a = this._workspace) == null ? void 0 : a.current;
    if (n && n !== i) {
      const d = ((s = this._workspace.solutions.find((r) => r.branch === n)) == null ? void 0 : s.name) ?? n.replace(/^solution\//, "");
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
    return this._tagsOpen ? w`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Versiones etiquetadas</span>
          <button title="Cerrar el listado" @click=${() => this._tagsOpen = !1}>✕</button>
        </div>
        ${this._tags.length ? this._tags.map(
      (e) => w`
                <div class="diff-row">
                  <span class="diff-mark added">🏷</span>
                  <span class="diff-type">${e.date}</span>
                  <span class="diff-name" title=${e.message || e.name}>${e.name}</span>
                </div>
              `
    ) : w`<div class="diff-row"><span class="diff-name">Sin versiones aún — «Etiquetar…» nombra el estado actual</span></div>`}
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
    const { content: t, fileName: i, apiId: n, homeExternalId: o, homeBoundedContextId: a } = e.detail;
    await this.trackWrite(async () => {
      try {
        const s = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: n })
        });
        if (!s.ok) {
          let g = `El servidor rechazó el contrato (${s.status})`;
          try {
            const m = await s.json();
            m != null && m.message && (g = m.message);
          } catch {
          }
          this.showToast(g);
          return;
        }
        const { apiId: d } = await s.json(), r = o ? { kind: "set-api-publisher", id: d, targetId: o } : a ? { kind: "add-api-implementation", apiId: d, boundedContextId: a } : null;
        r && await fetch(`${this.base}/commands`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(r)
        });
        const c = await fetch(`${this.base}/model`);
        c.ok && (this._model = await c.json()), await this.refreshDiff(), this.showToast(`Contrato importado en ${d}`, "info");
      } catch (s) {
        this.showToast(String(s));
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
    return this._error ? w`<div class="status error">modux editor: ${this._error}</div>` : this._model ? w`
      ${this._workspace ? w`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : w`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              ${this._taggingVersion ? w`
                    <input
                      placeholder="Nombre de la versión…"
                      .value=${this._newTagName}
                      @input=${(i) => this._newTagName = i.target.value}
                      @keydown=${(i) => i.key === "Enter" && void this.createTag()}
                    />
                    <button @click=${() => void this.createTag()}>Etiquetar</button>
                    <button @click=${() => this._taggingVersion = !1}>Cancelar</button>
                  ` : w`<button
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
      return w`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? w`
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
      return w`
                      ${i === "EXPLORING" ? w`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? w`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? w`<button
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
      ${this._mergeFlow ? w`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => w`
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
      ${this._toast ? w`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : w`<div class="status">Cargando el modelo…</div>`;
  }
};
ge.styles = [
  ca,
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
  Ao as ARCHIMATE_LABEL,
  Za as ARCHIMATE_NOTATION,
  jp as CONTAINER_HEADER,
  Gp as CONTAINER_INSET,
  ye as ModuxCanvas,
  ie as ModuxEditor,
  ge as ModuxEditorConnected,
  Ye as ModuxSequence,
  cs as aggregatesScene,
  bt as apiImplNodeId,
  vt as apiOpOccurrenceId,
  Hp as containerFit,
  qa as containerMinSize,
  es as contextMapScene,
  ts as distributionScene,
  Ka as flowCoherence,
  vs as flowsScene,
  ft as normalizeViewLayout,
  So as ownershipIndex,
  kn as processesScene,
  Ya as relationEdgeId,
  za as resolveOverlaps
};
