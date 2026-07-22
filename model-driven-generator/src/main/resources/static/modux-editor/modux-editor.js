const Kp = 34, Xp = 10;
function jo(e, t = 24) {
  const i = new Map(e.map((a) => [a.id, { x: a.x, y: a.y }]));
  for (let a = 0; a < 80; a++) {
    let o = !1;
    for (let s = 0; s < e.length; s++)
      for (let d = s + 1; d < e.length; d++) {
        const r = e[s], c = e[d], h = i.get(r.id), m = i.get(c.id), f = m.x - h.x, y = m.y - h.y, v = (r.w + c.w) / 2 + t - Math.abs(f), I = (r.h + c.h) / 2 + t - Math.abs(y);
        if (!(v <= 0 || I <= 0))
          if (o = !0, v < I) {
            const g = (f >= 0 ? 1 : -1) * v / 2;
            h.x -= g, m.x += g;
          } else {
            const g = (y >= 0 ? 1 : -1) * I / 2;
            h.y -= g, m.y += g;
          }
      }
    if (!o) break;
  }
  const n = /* @__PURE__ */ new Map();
  for (const a of e) {
    const o = i.get(a.id);
    (Math.abs(o.x - a.x) > 0.5 || Math.abs(o.y - a.y) > 0.5) && n.set(a.id, o);
  }
  return n;
}
function Vo(e, t = { w: 160, h: 90 }) {
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
function Qp(e, t, i) {
  let n = t.w / 2, a = t.w / 2, o = t.h / 2, s = t.h / 2;
  for (const d of i)
    n = Math.max(n, -d.dx + d.w / 2 + 10), a = Math.max(a, d.dx + d.w / 2 + 10), o = Math.max(o, -d.dy + d.h / 2 + 34), s = Math.max(s, d.dy + d.h / 2 + 10);
  return {
    x: e.x + (a - n) / 2,
    y: e.y + (s - o) / 2,
    w: n + a,
    h: o + s
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
function wn(e, t) {
  var a;
  const i = t.typeKind === "primitive" ? t.typeRef || "texto" : ((a = [...e.valueObjects ?? [], ...e.entities ?? [], ...e.aggregates ?? []].find(
    (o) => o.id === t.typeRef
  )) == null ? void 0 : a.name) ?? "¿tipo?", n = t.collection ? `[${i}]` : i;
  return { id: t.id, name: `${t.name}${t.required ? " ∗" : ""} : ${n}`, kind: "field" };
}
const Wo = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, kn = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Go = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, Ke = 168, Xe = 56;
function bt(e, t) {
  return `apiimpl:${e}@${t}`;
}
function vt(e, t) {
  return `apiop:${e}@${t}`;
}
function Ea(e, t) {
  const i = new Map((e.apis ?? []).map((n) => [n.id, n]));
  return (e.apiImplementations ?? []).filter((n) => n.boundedContextId === t && i.has(n.apiId)).map((n) => ({
    id: bt(n.apiId, n.boundedContextId),
    name: i.get(n.apiId).name,
    kind: "api-impl"
  }));
}
function Ho(e, t) {
  const i = t.targetApiId ? (e.apis ?? []).find((n) => n.id === t.targetApiId) : void 0;
  return (i == null ? void 0 : i.operations) ?? [];
}
const Yo = 108, Ko = 32, Xo = 240;
function Qo(e) {
  const t = Math.ceil(e.length * 7.6) + 26;
  return Math.min(Xo, Math.max(Yo + 12, t));
}
function Jo(e, t) {
  return `rel:${e}->${t}`;
}
function Zo(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function Sa(e, t = "unified") {
  const i = /* @__PURE__ */ new Map();
  if (t === "distribution") {
    for (const a of e.boundedContexts) {
      const o = (e.modules ?? []).filter((s) => s.boundedContextId === a.id);
      if (!(o.length <= 1)) {
        for (const s of Gt(e, a)) i.set(s.id, a.id);
        for (const s of o) {
          i.set(s.id, a.id);
          for (const d of s.elementIds ?? []) i.set(d, s.id);
        }
      }
    }
    return i;
  }
  const n = (a, o, s) => {
    const d = (e.apis ?? []).find((r) => r.id === a);
    for (const r of (d == null ? void 0 : d.operations) ?? [])
      i.set(o ? vt(r.id, o) : r.id, s);
  };
  for (const a of e.boundedContexts) {
    for (const o of Gt(e, a)) i.set(o.id, a.id);
    for (const o of Ea(e, a.id)) {
      i.set(o.id, a.id);
      const s = /^apiimpl:(.+)@(.+)$/.exec(o.id);
      s && n(s[1], s[2], o.id);
    }
  }
  for (const a of e.externalSystems) {
    a.parentExternalSystemId && i.set(a.id, a.parentExternalSystemId);
    for (const o of a.useCases ?? []) i.set(o.id, a.id);
    for (const o of a.tables ?? []) i.set(o.id, a.id);
    for (const o of a.mcpServers ?? []) i.set(o.id, a.id);
  }
  for (const a of e.apis ?? [])
    a.publishedByExternalSystemId && i.set(a.id, a.publishedByExternalSystemId), n(a.id, null, a.id);
  for (const a of e.proxyApis ?? [])
    a.publishedByExternalSystemId && i.set(a.id, a.publishedByExternalSystemId), a.targetApiId && n(a.targetApiId, a.id, a.id);
  return i;
}
function st(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const es = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, ts = {
  aggregate: { symbol: "aggregate", fill: "#f5f3ff", stroke: "#8b5cf6" },
  entity: { symbol: "entity", fill: "#f0fdfa", stroke: "#14b8a6" },
  "value-object": { symbol: "value-object", fill: "#faf5ff", stroke: "#a855f7" },
  field: { symbol: "field", fill: "#f8fafc", stroke: "#64748b" },
  invariant: { symbol: "shield", fill: "#f0fdfa", stroke: "#0f766e" },
  operation: { symbol: "operation", fill: "#f5f3ff", stroke: "#7c3aed" },
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
}, is = {
  aggregate: "Agregado",
  entity: "Entidad — dentro del agregado",
  "value-object": "Value object — dentro del agregado",
  field: "Campo — nombre, obligatoriedad y tipo",
  invariant: "Invariante — una regla que este elemento protege",
  operation: "Operación — modelo de entrada → modelo de salida",
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
    ...(e.aggregates ?? []).filter((i) => i.boundedContextId === t.id).map((i) => {
      const n = (e.entities ?? []).filter((c) => c.aggregateId === i.id).length, a = (e.valueObjects ?? []).filter((c) => c.aggregateId === i.id).length, o = (i.invariants ?? []).length, s = (i.fields ?? []).length, d = (i.operations ?? []).length, r = (s ? ` ∷${s}` : "") + (d ? ` ⚙${d}` : "") + (n ? ` 🗂${n}` : "") + (a ? ` ◈${a}` : "") + (o ? ` ⚖${o}` : "");
      return { id: i.id, name: `${i.name}${r}`, kind: "aggregate" };
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
const ns = {
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
}, Aa = {
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
function as(e, t, i = {}, n = /* @__PURE__ */ new Set(), a = !1) {
  return Ma(e, t, "unified", i, n, a);
}
function os(e, t, i = {}, n = /* @__PURE__ */ new Set(), a = !1) {
  return Ma(e, t, "distribution", i, n, a);
}
function Ma(e, t, i, n = {}, a = /* @__PURE__ */ new Set(), o = !1) {
  const s = i === "distribution";
  if (o) {
    const p = new Set(a);
    for (const M of e.boundedContexts) p.add(M.id);
    for (const M of e.aggregates ?? []) p.add(M.id);
    for (const M of e.externalSystems) p.add(M.id);
    for (const M of e.apis ?? []) p.add(M.id);
    for (const M of e.proxyApis ?? []) p.add(M.id);
    for (const M of e.apiImplementations ?? [])
      p.add(bt(M.apiId, M.boundedContextId));
    for (const M of e.modules ?? []) p.add(M.id);
    a = p;
  }
  const d = !s, r = new Set(e.externalSystems.map((p) => p.id)), c = (e.apis ?? []).filter(
    (p) => p.publishedByExternalSystemId && r.has(p.publishedByExternalSystemId)
  ), h = new Set(c.map((p) => p.id)), m = (e.proxyApis ?? []).filter(
    (p) => p.publishedByExternalSystemId && r.has(p.publishedByExternalSystemId)
  ), f = new Set(m.map((p) => p.id)), y = new Map((e.apis ?? []).map((p) => [p.id, p])), v = new Map((e.proxyApis ?? []).map((p) => [p.id, p])), I = [...e.aggregates ?? [], ...e.entities ?? []], g = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set();
  I.forEach(
    (p) => (p.fields ?? []).forEach((M) => {
      g.set(M.id, M), M.typeKind !== "primitive" && M.typeRef && l.add(M.typeRef);
    })
  );
  const u = (p, M) => {
    var Y;
    if (s) {
      if (M === "boundedContext") {
        const D = (e.modules ?? []).filter((ue) => ue.boundedContextId === p);
        if (D.length <= 1) return [];
        const q = new Set(D.flatMap((ue) => ue.elementIds ?? [])), K = e.boundedContexts.find((ue) => ue.id === p), pe = K ? Gt(e, K).filter((ue) => !q.has(ue.id)) : [];
        return [
          ...D.map((ue) => ({ id: ue.id, name: ue.name, kind: "module" })),
          ...pe
        ];
      }
      if (M === "module") {
        const D = (e.modules ?? []).find((pe) => pe.id === p), q = e.boundedContexts.find((pe) => pe.id === (D == null ? void 0 : D.boundedContextId));
        if (!D || !q) return [];
        const K = new Map(Gt(e, q).map((pe) => [pe.id, pe]));
        return (D.elementIds ?? []).map((pe) => K.get(pe)).filter((pe) => !!pe);
      }
      return [];
    }
    switch (M) {
      case "boundedContext": {
        const D = e.boundedContexts.find((q) => q.id === p);
        return D ? [...Ea(e, p), ...Gt(e, D)] : [];
      }
      case "external-system": {
        const D = e.externalSystems.find((q) => q.id === p);
        return [
          ...e.externalSystems.filter((q) => q.parentExternalSystemId === p).map((q) => ({ id: q.id, name: q.name, kind: "external-system" })),
          ...c.filter((q) => q.publishedByExternalSystemId === p).map((q) => ({ id: q.id, name: q.name, kind: "api" })),
          ...m.filter((q) => q.publishedByExternalSystemId === p).map((q) => ({ id: q.id, name: q.name, kind: "proxy-api" })),
          ...((D == null ? void 0 : D.useCases) ?? []).map(
            (q) => ({ id: q.id, name: q.name, kind: "external-use-case" })
          ),
          ...((D == null ? void 0 : D.tables) ?? []).map(
            (q) => ({ id: q.id, name: q.name, kind: "external-table" })
          ),
          ...((D == null ? void 0 : D.mcpServers) ?? []).map(
            (q) => ({ id: q.id, name: q.name, kind: "mcp-server" })
          )
        ];
      }
      case "aggregate": {
        const D = (e.aggregates ?? []).find((K) => K.id === p), q = (K) => {
          const pe = (be) => {
            var Ce, Ae;
            return be ? ((Ae = (Ce = e.models) == null ? void 0 : Ce.find((Te) => Te.id === be)) == null ? void 0 : Ae.name) ?? "" : "";
          }, ue = pe(K.inputModelId), oe = pe(K.outputModelId);
          return `${K.name}(${ue})${oe ? ` : ${oe}` : ""}`;
        };
        return [
          ...((D == null ? void 0 : D.fields) ?? []).map((K) => wn(e, K)),
          ...((D == null ? void 0 : D.operations) ?? []).map((K) => ({ id: K.id, name: q(K), kind: "operation" })),
          ...((D == null ? void 0 : D.invariants) ?? []).map((K) => ({ id: K.id, name: K.name, kind: "invariant" })),
          ...(e.valueObjects ?? []).filter((K) => K.aggregateId === p && !l.has(K.id)).map((K) => ({ id: K.id, name: K.name, kind: "value-object" })),
          ...(e.entities ?? []).filter((K) => K.aggregateId === p && !l.has(K.id)).map((K) => ({ id: K.id, name: K.name, kind: "entity" }))
        ];
      }
      case "entity": {
        const D = (e.entities ?? []).find((q) => q.id === p);
        return [
          ...((D == null ? void 0 : D.fields) ?? []).map((q) => wn(e, q)),
          ...((D == null ? void 0 : D.invariants) ?? []).map((q) => ({ id: q.id, name: q.name, kind: "invariant" }))
        ];
      }
      case "value-object": {
        const D = (e.valueObjects ?? []).find((q) => q.id === p);
        return ((D == null ? void 0 : D.invariants) ?? []).map((q) => ({ id: q.id, name: q.name, kind: "invariant" }));
      }
      case "field": {
        const D = g.get(p);
        if (!D || D.typeKind === "primitive" || !D.typeRef) return [];
        const q = (e.valueObjects ?? []).find((ue) => ue.id === D.typeRef);
        if (q) return [{ id: q.id, name: q.name, kind: "value-object" }];
        const K = (e.entities ?? []).find((ue) => ue.id === D.typeRef);
        if (K) return [{ id: K.id, name: K.name, kind: "entity" }];
        const pe = (e.aggregates ?? []).find((ue) => ue.id === D.typeRef);
        return pe ? [{ id: pe.id, name: pe.name, kind: "aggregate" }] : [];
      }
      case "api":
        return (((Y = y.get(p)) == null ? void 0 : Y.operations) ?? []).map(
          (D) => ({ id: D.id, name: D.name, kind: "api-operation" })
        );
      case "api-impl": {
        const D = /^apiimpl:(.+)@(.+)$/.exec(p), q = D ? y.get(D[1]) : void 0;
        return ((q == null ? void 0 : q.operations) ?? []).map(
          (K) => ({
            id: vt(K.id, D[2]),
            name: K.name,
            kind: "api-op-occurrence"
          })
        );
      }
      case "proxy-api": {
        const D = v.get(p);
        return D ? Ho(e, D).map(
          (q) => ({
            id: vt(q.id, p),
            name: q.name,
            kind: "api-op-occurrence"
          })
        ) : [];
      }
      default:
        return [];
    }
  }, x = [], E = [], N = (p, M, Y) => {
    const D = -Math.PI / 2 + 2 * Math.PI * M / Math.max(Y, 1), q = 160 + 12 * Math.min(Y, 14);
    return { x: p.x + q * Math.cos(D), y: p.y + q * Math.sin(D) };
  }, R = (p, M, Y, D) => {
    const q = u(p, M);
    q.forEach((K, pe) => {
      const ue = t[K.id] ?? N(D, pe, q.length), oe = u(K.id, K.kind), be = a.has(K.id) && oe.length > 0, Ce = K.policy ? es : ts[K.kind], Ae = K.kind === "external-system";
      x.push({
        id: K.id,
        label: K.name,
        kind: K.kind,
        x: ue.x,
        y: ue.y,
        w: Ae ? 150 : Qo(K.name),
        h: Ae ? 44 : Ko + 4,
        symbol: Ce.symbol,
        fill: Ce.fill,
        stroke: Ce.stroke,
        dashed: Ae || void 0,
        ownerId: p,
        collapsible: oe.length > 0,
        collapsed: oe.length > 0 && !be,
        tooltip: `${K.policy ? "Policy" : is[K.kind]} ${K.name} — parte de ${Y}`
      }), E.push({
        id: `contains:${p}->${K.id}`,
        sourceId: p,
        targetId: K.id,
        kind: "contains",
        color: "#94a3b8",
        tooltip: `${Y} contiene ${K.name}`
      }), be && R(K.id, K.kind, K.name, ue);
    });
  }, k = [
    ...e.boundedContexts.map((p) => ({ ref: p, external: !1, api: !1, proxy: !1 })),
    ...(s ? [] : e.externalSystems).filter((p) => !p.parentExternalSystemId || !r.has(p.parentExternalSystemId)).map((p) => ({ ref: p, external: !0, api: !1, proxy: !1 })),
    ...s ? [] : (e.apis ?? []).filter((p) => !h.has(p.id)).map((p) => ({ ref: p, external: !1, api: !0, proxy: !1 })),
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
  k.forEach((p, M) => {
    const Y = t[p.ref.id] ?? st(M, k.length);
    if ("idp" in p && p.idp) {
      const oe = p.ref, be = !!oe.publishedByExternalSystemId;
      x.push({
        id: oe.id,
        label: oe.name,
        kind: "identity-provider",
        symbol: "key",
        fill: be ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: be,
        badge: oe.type ?? "IDP",
        tooltip: `${oe.name} — emite las identidades que el sistema confía${be ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: Y.x,
        y: Y.y,
        w: Ke,
        h: Xe
      });
      return;
    }
    if ("etl" in p && p.etl) {
      const oe = p.ref;
      x.push({
        id: oe.id,
        label: oe.name,
        kind: "etl-flow",
        symbol: "gear",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        dashed: !0,
        badge: "ETL",
        tooltip: `${oe.name} — integrador: fuentes (pull/consumidor) → transformación → escrituras (API/BD/evento)`,
        x: Y.x,
        y: Y.y,
        w: Ke,
        h: Xe
      });
      return;
    }
    if ("workflow" in p && p.workflow) {
      const oe = p.ref;
      x.push({
        id: oe.id,
        label: oe.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${oe.name} — workflow${oe.triggerEvent ? ` · arranca con ${oe.triggerEvent}` : ""}`,
        x: Y.x,
        y: Y.y,
        w: Ke,
        h: Xe
      });
      return;
    }
    if (p.proxy) {
      const oe = p.ref, be = u(oe.id, "proxy-api"), Ce = a.has(oe.id) && be.length > 0;
      x.push({
        id: oe.id,
        label: oe.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${oe.name} — proxy/cache de una API, consumible como ella`,
        collapsible: be.length > 0,
        collapsed: be.length > 0 && !Ce,
        x: Y.x,
        y: Y.y,
        w: Ke,
        h: Xe
      }), Ce && R(oe.id, "proxy-api", oe.name, Y);
      return;
    }
    if (p.api) {
      const oe = p.ref, be = u(oe.id, "api"), Ce = a.has(oe.id) && be.length > 0;
      x.push({
        id: oe.id,
        label: oe.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${oe.name} — API publicada (sus operaciones apuntan a quien las implementa)`,
        collapsible: be.length > 0,
        collapsed: be.length > 0 && !Ce,
        x: Y.x,
        y: Y.y,
        w: Ke,
        h: Xe
      }), Ce && R(oe.id, "api", oe.name, Y);
      return;
    }
    if (p.external) {
      const oe = p.ref, be = u(oe.id, "external-system"), Ce = a.has(oe.id) && be.length > 0, Ae = n[oe.id];
      x.push({
        id: oe.id,
        label: oe.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: oe.referencedRepositoryId ? "PROYECTO" : "EXTERNAL",
        tooltip: oe.referencedRepositoryId ? `${oe.name} — otro proyecto modux (repositorio ${oe.referencedRepositoryId}), referenciado del catálogo` : `${oe.name} (sistema externo)`,
        collapsible: be.length > 0,
        collapsed: be.length > 0 && !Ce,
        resizable: !0,
        x: Y.x,
        y: Y.y,
        w: (Ae == null ? void 0 : Ae.w) ?? Ke,
        h: (Ae == null ? void 0 : Ae.h) ?? Xe
      }), Ce && R(oe.id, "external-system", oe.name, Y);
      return;
    }
    const D = p.ref, q = D.subdomainType ?? "GENERIC", K = u(D.id, "boundedContext"), pe = a.has(D.id) && K.length > 0, ue = n[D.id];
    x.push({
      id: D.id,
      label: D.name,
      kind: "boundedContext",
      symbol: "component",
      fill: Wo[q],
      stroke: "#94a3b8",
      badge: q,
      tooltip: s && K.length === 0 ? `${D.name} — un solo módulo (el principal): el servicio lo despliega entero. Añade un módulo desde la paleta para repartir sus elementos` : `${D.name} — subdominio ${q}`,
      collapsible: K.length > 0,
      collapsed: K.length > 0 && !pe,
      resizable: !0,
      x: Y.x,
      y: Y.y,
      w: (ue == null ? void 0 : ue.w) ?? Ke,
      h: (ue == null ? void 0 : ue.h) ?? Xe
    }), pe && R(D.id, "boundedContext", D.name, Y);
  });
  const T = s ? { actors: [], aiAgents: [], rags: [], mcpGateways: [] } : {
    actors: e.actors ?? [],
    aiAgents: e.aiAgents ?? [],
    rags: e.rags ?? [],
    mcpGateways: e.mcpGateways ?? []
  }, z = k.length + T.actors.length + T.aiAgents.length + T.rags.length + T.mcpGateways.length;
  T.actors.forEach((p, M) => {
    const Y = t[p.id] ?? st(k.length + M, z);
    x.push({
      id: p.id,
      label: p.name,
      x: Y.x,
      y: Y.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${p.name} (actor)`
    });
  }), T.aiAgents.forEach((p, M) => {
    const Y = t[p.id] ?? st(k.length + (e.actors ?? []).length + M, z);
    x.push({
      id: p.id,
      label: p.name,
      x: Y.x,
      y: Y.y,
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
  }), T.mcpGateways.forEach((p, M) => {
    const Y = t[p.id] ?? st(
      k.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + M,
      z
    );
    x.push({
      id: p.id,
      label: p.name,
      x: Y.x,
      y: Y.y,
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
  const Q = [];
  if (T.rags.forEach((p, M) => {
    const Y = t[p.id] ?? st(
      k.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + M,
      z
    );
    x.push({
      id: p.id,
      label: p.name,
      x: Y.x,
      y: Y.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${p.name} (base de conocimiento — retrieval para agentes)`
    }), (p.contentSources ?? []).forEach((D, q) => {
      const K = `ragcs:${p.id}:${D.uri}`, pe = t[K] ?? { x: Y.x + 170, y: Y.y - 30 + q * 44 };
      x.push({
        id: K,
        label: D.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: pe.x,
        y: pe.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: D.type,
        tooltip: `${D.type}: ${D.uri}`
      }), Q.push({
        id: `ragcse:${p.id}:${D.uri}`,
        sourceId: K,
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
    p.forEach((D, q) => {
      const K = t[D.id] ?? st(k.length + q, k.length + p.length);
      x.push({
        id: D.id,
        label: D.name,
        kind: "service",
        symbol: "gear",
        fill: "#f8fafc",
        stroke: "#334155",
        badge: "SERVICIO",
        tooltip: `${D.name} — deployable: arrastra su asa hasta un módulo para desplegarlo aquí`,
        x: K.x,
        y: K.y,
        w: Ke,
        h: Xe
      });
    });
    const M = e.urls ?? [];
    M.forEach((D, q) => {
      const K = t[D.id] ?? st(
        k.length + p.length + q,
        k.length + p.length + M.length
      );
      x.push({
        id: D.id,
        label: D.name,
        kind: "url",
        symbol: "interface",
        fill: "#f8fafc",
        stroke: "#0e7490",
        badge: "URL",
        tooltip: `${D.url ?? D.name} — traza una línea desde un servicio para servirla aquí`,
        x: K.x,
        y: K.y,
        w: Ke,
        h: Xe
      });
    });
    const Y = [];
    [...new Set(p.filter((D) => D.database).map((D) => D.database))].forEach((D) => Y.push({
      id: `infra-db:${D}`,
      label: D,
      badge: "BD",
      symbol: "readmodel",
      tooltip: `Base de datos ${D} — la usan los servicios que declaran database=${D}`
    })), p.some((D) => D.outboxEnabled) && Y.push({
      id: "infra-broker",
      label: "Broker de eventos",
      badge: "BROKER",
      symbol: "event",
      tooltip: "Broker (Kafka/…) — lo alimentan los servicios con outbox"
    }), (e.workflows ?? []).length && Y.push({
      id: "infra-workflow-engine",
      label: "Workflow engine",
      badge: "ENGINE",
      symbol: "process",
      tooltip: "Motor de workflows — ejecuta los workflows del modelo"
    }), (e.pages ?? []).length && Y.push({
      id: "infra-forms-engine",
      label: "Forms engine",
      badge: "ENGINE",
      symbol: "interface",
      tooltip: "Motor de formularios (Mateu) — sirve las páginas declaradas"
    }), Y.forEach((D, q) => {
      const K = t[D.id] ?? st(
        k.length + p.length + M.length + q,
        k.length + p.length + M.length + Y.length
      );
      x.push({
        id: D.id,
        label: D.label,
        kind: "infrastructure",
        symbol: D.symbol,
        fill: "#fffbeb",
        stroke: "#92400e",
        dashed: !0,
        badge: D.badge,
        tooltip: D.tooltip,
        x: K.x,
        y: K.y,
        w: Ke,
        h: Xe
      });
    });
  }
  x.sort((p, M) => (p.parentId ? 1 : 0) - (M.parentId ? 1 : 0));
  const C = e.relations.map((p) => ({
    id: Jo(p.sourceId, p.targetId),
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "relation",
    label: p.type ? kn[p.type] : p.inferredType ? `≈${kn[p.inferredType]}` : "?",
    color: p.declared ? "#475569" : "#94a3b8",
    dashed: !p.declared,
    arrow: !0,
    tooltip: p.type ? `${p.type} (${p.sourceId} upstream → ${p.targetId} downstream)${p.reasons ? ` — ${p.reasons}` : ""}` : p.inferredType ? `≈ ${p.inferredType} INFERIDO de las dependencias — doble click para declararlo (o corregirlo)${p.reasons ? ` — ${p.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${p.reasons ? ` — ${p.reasons}` : ""}`
  })), W = e.flows.map((p) => {
    var pe, ue, oe, be, Ce, Ae;
    const M = Zo(e, p), Y = d ? e.boundedContexts.find((Te) => Te.id === p.sourceId) : void 0, D = ((pe = Y == null ? void 0 : Y.domainEvents) == null ? void 0 : pe.find((Te) => Te.name === p.triggerEvent)) ?? ((ue = Y == null ? void 0 : Y.applicationEvents) == null ? void 0 : ue.find((Te) => Te.name === p.triggerEvent)), q = d && p.readModelName ? (be = (oe = e.boundedContexts.find((Te) => Te.id === p.targetId)) == null ? void 0 : oe.readModels) == null ? void 0 : be.find((Te) => Te.name === p.readModelName) : void 0, K = d && p.targetUseCaseId ? (Ae = (Ce = e.boundedContexts.find((Te) => Te.id === p.targetId)) == null ? void 0 : Ce.useCases) == null ? void 0 : Ae.find((Te) => Te.id === p.targetUseCaseId) : void 0;
    return {
      id: `flow:${p.id}`,
      sourceId: (D == null ? void 0 : D.id) ?? p.sourceId,
      targetId: (K == null ? void 0 : K.id) ?? (q == null ? void 0 : q.id) ?? p.targetId,
      kind: "flow",
      label: p.name,
      color: Go[M],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${p.name} [${p.archetype}] — ${M}`
    };
  }), j = new Map((e.apis ?? []).map((p) => [p.id, p])), O = new Set(e.boundedContexts.map((p) => p.id)), G = (e.apiImplementations ?? []).filter(
    (p) => j.has(p.apiId) && O.has(p.boundedContextId)
  );
  (e.uis ?? []).filter((p) => !p.boundedContextId).forEach((p, M) => {
    const Y = t[p.id] ?? { x: 180 + M * 200, y: 40 };
    x.push({
      id: p.id,
      label: p.name,
      x: Y.x,
      y: Y.y,
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
  const w = new Set(x.map((p) => p.id)), P = Sa(e, i), L = /* @__PURE__ */ new Map(), _ = (p) => {
    const M = L.get(p);
    if (M !== void 0) return M;
    let Y = p;
    for (let D = 0; Y && D < 16; D++) {
      if (w.has(Y))
        return L.set(p, Y), Y;
      Y = P.get(Y);
    }
    return L.set(p, null), null;
  }, b = { has: (p) => _(p) !== null }, A = (p) => {
    const M = /* @__PURE__ */ new Set(), Y = [];
    for (const D of p) {
      if (D.kind === "contains" || D.targetId.startsWith("edgeanchor:")) {
        Y.push(D);
        continue;
      }
      const q = _(D.sourceId), K = _(D.targetId);
      if (!q || !K || q === K) continue;
      if (q === D.sourceId && K === D.targetId) {
        Y.push(D);
        continue;
      }
      const pe = `${D.kind}|${q}|${K}`;
      M.has(pe) || (M.add(pe), Y.push({
        ...D,
        sourceId: q,
        targetId: K,
        tooltip: `${D.tooltip ?? D.kind} — de un elemento plegado dentro`
      }));
    }
    return Y;
  }, S = s ? [
    ...(e.services ?? []).flatMap(
      (p) => (p.moduleIds ?? []).map((M) => {
        var D;
        if (!b.has(p.id)) return null;
        const Y = b.has(M) ? M : (D = (e.modules ?? []).find((q) => q.id === M)) == null ? void 0 : D.boundedContextId;
        return !Y || !b.has(Y) ? null : {
          id: `deploy:${p.id}->${M}`,
          sourceId: p.id,
          targetId: Y,
          kind: "deploys",
          color: "#334155",
          dashed: !0,
          arrow: !0,
          tooltip: `desplegado en ${p.name} — Supr lo desconecta`
        };
      }).filter((M) => M !== null)
    ),
    ...(e.services ?? []).flatMap(
      (p) => (p.urlIds ?? []).filter((M) => b.has(p.id) && b.has(M)).map((M) => ({
        id: `svcurl:${p.id}->${M}`,
        sourceId: p.id,
        targetId: M,
        kind: "service-url",
        color: "#0e7490",
        arrow: !0,
        tooltip: `${p.name} responde en esta URL — Supr lo desconecta`
      }))
    ),
    ...(e.services ?? []).flatMap((p) => {
      const M = [];
      return p.database && b.has(`infra-db:${p.database}`) && b.has(p.id) && M.push({
        id: `infradb:${p.id}`,
        sourceId: p.id,
        targetId: `infra-db:${p.database}`,
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} persiste en ${p.database}`
      }), p.outboxEnabled && b.has("infra-broker") && b.has(p.id) && M.push({
        id: `infrabroker:${p.id}`,
        sourceId: p.id,
        targetId: "infra-broker",
        kind: "infra-uses",
        color: "#92400e",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} publica eventos por el outbox`
      }), M;
    })
  ] : [], V = d ? (e.emissions ?? []).filter((p) => b.has(p.sourceId) && b.has(p.domainEventId)).map((p) => ({
    id: `emit:${p.sourceId}->${p.domainEventId}`,
    sourceId: p.sourceId,
    targetId: p.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], U = d ? (e.projections ?? []).map((p) => ({
    p,
    source: p.sourceAggregateId ?? p.sourceExternalUseCaseId ?? p.sourceExternalTableId
  })).filter(({ p, source: M }) => M && p.readModelId).filter(({ p, source: M }) => b.has(M) && b.has(p.readModelId)).map(({ p, source: M }) => ({
    id: `proj:${p.id}`,
    sourceId: M,
    targetId: p.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: p.sourceAggregateId ? `Proyección ${p.name}: el estado del agregado se materializa en ${p.readModelName ?? p.readModelId}` : `Proyección ${p.name}: polling hacia ${p.readModelName ?? p.readModelId}`
  })) : [], F = (e.apis ?? []).flatMap(
    (p) => p.operations.flatMap((M) => {
      const Y = d && M.targetQueryServiceId && b.has(M.targetQueryServiceId) ? M.targetQueryServiceId : null, D = d && M.targetUseCaseId && b.has(M.targetUseCaseId) ? M.targetUseCaseId : Y || (M.targetBoundedContextId && b.has(M.targetBoundedContextId) ? M.targetBoundedContextId : null);
      if (!D) return [];
      const q = d && b.has(M.id) ? M.id : p.id;
      return b.has(q) ? [
        {
          id: `apiwire:${M.id}`,
          sourceId: q,
          targetId: D,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: D === Y ? `${M.name} lee de ${D}` : `${M.name} la implementa ${D}`
        }
      ] : [];
    })
  ), H = d ? (e.useCaseCalls ?? []).filter((p) => b.has(p.sourceId) && b.has(p.targetId)).map((p) => ({
    id: `uccall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], J = [
    ...e.boundedContexts.filter((p) => p.identityProviderId && b.has(p.id) && b.has(p.identityProviderId)).map((p) => ({
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
    ...(e.etlFlows ?? []).filter((p) => p.identityProviderId && b.has(p.identityProviderId)).flatMap((p) => {
      const M = b.has(p.id) ? p.id : p.ownerBoundedContextId && b.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
      return M ? [{
        id: `idpsvc:${p.id}`,
        sourceId: M,
        targetId: p.identityProviderId,
        kind: "idp-service",
        color: "#ca8a04",
        label: "identidad de servicio",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} corre con una identidad de servicio de este IdP`
      }] : [];
    }),
    ...(e.identityProviders ?? []).filter((p) => p.publishedByExternalSystemId && b.has(p.id) && b.has(p.publishedByExternalSystemId)).map((p) => ({
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
  ], le = d ? e.boundedContexts.flatMap((p) => p.scheduledTriggers ?? []).filter((p) => p.useCaseId && b.has(p.id) && b.has(p.useCaseId)).map((p) => ({
    id: `stfire:${p.id}->${p.useCaseId}`,
    sourceId: p.id,
    targetId: p.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: p.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${p.cronExpression ?? "cron"}`
  })) : [], Se = d ? (e.aggregateCalls ?? []).filter((p) => b.has(p.sourceId) && b.has(p.targetId)).map((p) => ({
    id: `aggcall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], X = d ? (e.queryCalls ?? []).filter((p) => b.has(p.sourceId) && b.has(p.targetId)).map((p) => ({
    id: `qscall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], ae = d ? (e.actorUses ?? []).filter((p) => b.has(p.actorId) && b.has(p.targetId)).map((p) => ({
    id: `use:${p.actorId}->${p.targetId}`,
    sourceId: p.actorId,
    targetId: p.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], ye = (e.actorExternalDependencies ?? []).filter((p) => b.has(p.actorId) && b.has(p.externalSystemId)).map((p) => ({
    id: `extdep:${p.actorId}->${p.externalSystemId}`,
    sourceId: p.actorId,
    targetId: p.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), Ze = new Map([
    ...(e.apis ?? []).filter((p) => p.publishedByExternalSystemId).map((p) => [p.id, p.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((p) => p.publishedByExternalSystemId).map((p) => [p.id, p.publishedByExternalSystemId])
  ]), fe = (p) => b.has(p) ? p : Ze.get(p) ?? p, Ne = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((p) => ({
        sourceId: p.sourceId,
        targetId: fe(p.targetId),
        cqrs: p.type === "CQRS"
      })).filter(
        (p) => b.has(p.sourceId) && b.has(p.targetId) && p.sourceId !== p.targetId
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
  ], he = /* @__PURE__ */ new Map();
  for (const p of e.boundedContexts) {
    for (const M of p.useCases ?? []) he.set(M.id, p.id);
    for (const M of p.domainEvents ?? []) he.set(M.id, p.id);
    for (const M of p.applicationEvents ?? []) he.set(M.id, p.id);
    for (const M of p.queryServices ?? []) he.set(M.id, p.id);
  }
  const Z = (p) => b.has(p) ? p : he.get(p) ?? p, te = /* @__PURE__ */ new Map();
  for (const p of e.boundedContexts) {
    for (const M of p.domainEvents ?? []) te.set(M.name, M.id);
    for (const M of p.applicationEvents ?? []) te.set(M.name, M.id);
  }
  const _e = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (p) => (p.steps ?? []).filter((M) => M.targetUseCaseId).map((M) => ({ sourceId: p.id, targetId: Z(M.targetUseCaseId) }))
      ).filter((p) => b.has(p.sourceId) && b.has(p.targetId)).map((p) => [
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
  ], De = [
    ...new Map(
      (e.workflows ?? []).filter((p) => p.triggerEvent && te.has(p.triggerEvent)).map((p) => ({
        sourceId: Z(te.get(p.triggerEvent)),
        targetId: p.id,
        label: p.triggerEvent
      })).filter((p) => b.has(p.sourceId) && b.has(p.targetId)).map((p) => [
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
  ], Le = /* @__PURE__ */ new Map();
  for (const p of e.externalSystems)
    for (const M of p.tables ?? []) Le.set(M.id, p.id);
  const Ue = (e.notifications ?? []).flatMap((p) => {
    var D;
    const M = b.has(p.id) ? p.id : p.ownerBoundedContextId && b.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
    if (!M) return [];
    const Y = [];
    if (p.eventId) {
      const q = b.has(p.eventId) ? p.eventId : he.get(p.eventId);
      q && b.has(q) && q !== M && Y.push({
        id: `notif:${p.id}`,
        sourceId: q,
        targetId: M,
        kind: "notification-trigger",
        color: "#db2777",
        label: "dispara",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name}: este evento la dispara — Supr lo desapunta`
      });
    }
    for (const q of p.recipientRoleIds ?? [])
      b.has(q) && Y.push({
        id: `notifto:${p.id}:${q}`,
        sourceId: M,
        targetId: q,
        kind: "notification-recipient",
        color: "#db2777",
        label: ((D = (p.channels ?? [])[0]) == null ? void 0 : D.toLowerCase()) ?? "avisa",
        dashed: !0,
        arrow: !0,
        tooltip: `${p.name} avisa a este rol — Supr lo quita`
      });
    return Y;
  }), ot = (e.documents ?? []).flatMap((p) => {
    const M = b.has(p.id) ? p.id : p.ownerBoundedContextId && b.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
    if (!M || !p.queryServiceId) return [];
    const Y = b.has(p.queryServiceId) ? p.queryServiceId : he.get(p.queryServiceId);
    return !Y || !b.has(Y) || Y === M ? [] : [{
      id: `docq:${p.id}`,
      sourceId: Y,
      targetId: M,
      kind: "document-query",
      color: "#475569",
      label: "alimenta",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name}: esta consulta alimenta el informe — Supr lo desapunta`
    }];
  }), St = (e.etlFlows ?? []).flatMap(
    (p) => (p.steps ?? []).flatMap((M) => {
      const Y = b.has(p.id) ? p.id : p.ownerBoundedContextId && b.has(p.ownerBoundedContextId) ? p.ownerBoundedContextId : null;
      if (!Y) return [];
      const D = M.externalTableId ?? M.operationId ?? M.apiId ?? M.eventId;
      if (!D) return [];
      let q = D;
      if (!b.has(q) && M.operationId && M.apiId && (q = M.apiId), !b.has(q) && M.externalTableId && (q = Le.get(M.externalTableId) ?? q), b.has(q) || (q = fe(q)), b.has(q) || (q = he.get(D) ?? q), !b.has(q) || q === Y) return [];
      const K = M.type.startsWith("SOURCE");
      return [{
        id: `etl:${p.id}:${M.id}`,
        sourceId: K ? q : Y,
        targetId: K ? Y : q,
        kind: K ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: M.type === "SOURCE_PULL" ? "pull" : M.type === "SOURCE_CONSUMER" ? "consume" : M.type === "WRITE_API" ? "api" : M.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: K ? `${p.name} lee de aquí (${M.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${p.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), ri = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (p) => (p.sourceExternalTableIds ?? []).map((M) => ({
          sourceId: b.has(M) ? M : Le.get(M) ?? M,
          targetId: p.id,
          name: p.name
        }))
      ).filter((p) => b.has(p.sourceId) && b.has(p.targetId)).map((p) => [
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
  ], yo = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (p) => (p.sourceApiIds ?? []).map((M) => ({
          sourceId: fe(M),
          targetId: p.id,
          name: p.name
        }))
      ).filter((p) => b.has(p.sourceId) && b.has(p.targetId)).map((p) => [
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
  ], bo = [
    ...new Map(
      (e.rags ?? []).flatMap((p) => [
        ...(p.sourceExternalSystemIds ?? []).map((M) => ({ sourceId: M, targetId: p.id, name: p.name })),
        ...(p.sourceBoundedContextIds ?? []).map((M) => ({ sourceId: M, targetId: p.id, name: p.name }))
      ]).filter((p) => b.has(p.sourceId) && b.has(p.targetId)).map((p) => [
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
  ], vo = [
    ...new Map(
      (e.agentApiUses ?? []).map((p) => ({ sourceId: p.agentId, targetId: fe(p.apiId) })).filter((p) => b.has(p.sourceId) && b.has(p.targetId)).map((p) => [
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
  ], xo = (p) => p.onCompletionEventName || `${p.name.replace(/\s+/g, "")}Completado`, Io = (e.workflows ?? []).flatMap(
    (p) => p.triggerEvent ? (e.workflows ?? []).filter((M) => M.id !== p.id && xo(M) === p.triggerEvent).filter((M) => b.has(M.id) && b.has(p.id)).map((M) => ({
      id: `wfchain:${M.id}->${p.id}`,
      sourceId: M.id,
      targetId: p.id,
      kind: "wf-chain",
      color: "#f59e0b",
      label: p.triggerEvent,
      dashed: !0,
      arrow: !0,
      tooltip: "su evento final dispara este workflow"
    })) : []
  ), wo = [
    ...new Map(
      (e.proxyApis ?? []).filter((p) => p.targetApiId).map((p) => ({ sourceId: fe(p.id), targetId: fe(p.targetApiId) })).filter(
        (p) => b.has(p.sourceId) && b.has(p.targetId) && p.sourceId !== p.targetId
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
  ], ko = G.flatMap((p) => {
    const M = bt(p.apiId, p.boundedContextId);
    if (!b.has(M)) return [];
    const Y = [];
    for (const D of (e.proxyApis ?? []).filter((q) => q.targetApiId === p.apiId)) {
      const q = fe(D.id);
      b.has(q) && q !== M && Y.push({
        id: `pxr:${q}->${M}`,
        sourceId: q,
        targetId: M,
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
    return Y;
  }), $o = (e.proxyOperationRoutes ?? []).flatMap((p) => {
    const M = (e.proxyApis ?? []).find((q) => q.id === p.proxyId);
    if (!(M != null && M.targetApiId)) return [];
    const Y = vt(p.operationId, p.proxyId), D = p.targetSiteId === M.targetApiId ? M.targetApiId : bt(M.targetApiId, p.targetSiteId);
    return !b.has(Y) || !b.has(D) ? [] : [{
      id: `oproute:${Y}->${D}`,
      sourceId: Y,
      targetId: D,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), _o = [
    ...new Map(
      (e.externalOperationUses ?? []).map((p) => {
        if (!b.has(p.externalSystemId)) return null;
        const M = (e.apis ?? []).find(
          (K) => K.operations.some((pe) => pe.id === p.operationId)
        );
        if (!M) return null;
        const Y = p.siteId === M.id, D = Y ? p.operationId : vt(p.operationId, p.siteId);
        let q = b.has(D) ? D : null;
        if (!q)
          if (Y || (e.proxyApis ?? []).some((K) => K.id === p.siteId))
            q = fe(p.siteId);
          else {
            const K = bt(M.id, p.siteId);
            q = b.has(K) ? K : p.siteId;
          }
        return !q || !b.has(q) || q === p.externalSystemId ? null : { u: p, target: q };
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
  ], Co = d ? (e.apiOperationImplementations ?? []).flatMap((p) => {
    if (!b.has(p.useCaseId)) return [];
    const M = b.has(vt(p.operationId, p.boundedContextId)) ? vt(p.operationId, p.boundedContextId) : b.has(bt(p.apiId, p.boundedContextId)) ? bt(p.apiId, p.boundedContextId) : b.has(fe(p.boundedContextId)) ? fe(p.boundedContextId) : null;
    return M ? [{
      id: `apiimplwire:${p.operationId}@${p.boundedContextId}`,
      sourceId: M,
      targetId: p.useCaseId,
      kind: "api-impl-wire",
      color: "#4f46e5",
      dashed: !0,
      arrow: !0,
      tooltip: "implementada aquí por"
    }] : [];
  }) : [], Eo = d ? (e.agentUses ?? []).filter((p) => b.has(p.agentId) && b.has(p.useCaseId)).map((p) => ({
    id: `mcp:${p.agentId}->${p.useCaseId}`,
    sourceId: p.agentId,
    targetId: p.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], So = (e.agentRags ?? []).filter((p) => b.has(p.agentId) && b.has(p.ragId)).map((p) => ({
    id: `agrag:${p.agentId}->${p.ragId}`,
    sourceId: p.agentId,
    targetId: p.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), Ao = d ? (e.rags ?? []).filter((p) => b.has(p.id)).flatMap(
    (p) => (p.sourceReadModelIds ?? []).filter((M) => b.has(M)).map((M) => ({
      id: `ragsrc:${p.id}->${M}`,
      sourceId: p.id,
      targetId: M,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name} indexa este read model`
    }))
  ) : [], Mo = d ? (e.agentExternalUses ?? []).filter((p) => b.has(p.agentId) && b.has(p.externalUseCaseId)).map((p) => ({
    id: `mcpx:${p.agentId}->${p.externalUseCaseId}`,
    sourceId: p.agentId,
    targetId: p.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Po = d ? (e.agentMcpUses ?? []).filter((p) => b.has(p.agentId) && b.has(p.mcpServerId)).map((p) => ({
    id: `mcpsv:${p.agentId}->${p.mcpServerId}`,
    sourceId: p.agentId,
    targetId: p.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], To = (e.mcpGateways ?? []).flatMap(
    (p) => [
      ...p.mcpServerIds ?? [],
      ...p.apiIds ?? [],
      ...p.apiOperationIds ?? [],
      ...p.useCaseIds ?? [],
      ...p.ragIds ?? []
    ].filter((M) => b.has(p.id) && b.has(M)).map((M) => ({
      id: `gwx:${p.id}->${M}`,
      sourceId: p.id,
      targetId: M,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Oo = (e.agentGatewayUses ?? []).filter((p) => b.has(p.agentId) && b.has(p.gatewayId)).map((p) => ({
    id: `aggw:${p.agentId}->${p.gatewayId}`,
    sourceId: p.agentId,
    targetId: p.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), Ro = d ? (e.agentApiOpUses ?? []).filter((p) => b.has(p.agentId) && b.has(p.apiOperationId)).map((p) => ({
    id: `agapi:${p.agentId}->${p.apiOperationId}`,
    sourceId: p.agentId,
    targetId: p.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], No = d ? (e.agentQueryUses ?? []).filter((p) => b.has(p.agentId) && b.has(p.queryServiceId)).map((p) => ({
    id: `agqs:${p.agentId}->${p.queryServiceId}`,
    sourceId: p.agentId,
    targetId: p.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Do = (e.agentDelegations ?? []).filter((p) => b.has(p.agentId) && b.has(p.delegateAgentId)).map((p) => ({
    id: `agag:${p.agentId}->${p.delegateAgentId}`,
    sourceId: p.agentId,
    targetId: p.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Lo = (e.actorAgentUses ?? []).filter((p) => b.has(p.actorId) && b.has(p.agentId)).map((p) => ({
    id: `useag:${p.actorId}->${p.agentId}`,
    sourceId: p.actorId,
    targetId: p.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Uo = d ? (e.agentTriggers ?? []).filter((p) => b.has(p.eventId) && b.has(p.agentId)).map((p) => ({
    id: `evag:${p.eventId}->${p.agentId}`,
    sourceId: p.eventId,
    targetId: p.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], zo = d ? (e.externalCalls ?? []).filter((p) => b.has(p.externalSystemId) && b.has(p.useCaseId)).map((p) => ({
    id: `extcall:${p.externalSystemId}->${p.useCaseId}`,
    sourceId: p.externalSystemId,
    targetId: p.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], qo = d ? (e.externalUseCaseCalls ?? []).filter((p) => b.has(p.sourceId) && b.has(p.targetId)).map((p) => ({
    id: `extuccall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "ext-uc-call",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "llama (derivará gateway/API)"
  })) : [], Bo = (e.uis ?? []).flatMap((p) => [
    ...[...p.appIds ?? [], ...p.pageIds ?? []].map((M) => ({
      id: `uiasg:${p.id}->${M}`,
      sourceId: M,
      targetId: p.id,
      kind: "ui-assignment",
      color: "#0ea5e9",
      markerStart: "ball",
      markerEnd: "arrow",
      tooltip: "asignada a la UI (assignment) — Supr la desconecta"
    })),
    // serving: la interfaz SIRVE al actor (flecha abierta hacia la persona)
    ...(p.actorIds ?? []).map((M) => ({
      id: `uisrv:${p.id}->${M}`,
      sourceId: p.id,
      targetId: M,
      kind: "ui-serving",
      color: "#0ea5e9",
      markerEnd: "open-arrow",
      tooltip: "la UI sirve a este actor (serving) — Supr la desconecta"
    }))
  ]), Fo = (e.archimateRelations ?? []).map((p) => ({
    id: `archi:${p.id}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "archimate-relation",
    color: "#475569",
    label: p.label || void 0,
    ...ns[p.type] ?? {},
    tooltip: `${Aa[p.type] ?? p.type} (ArchiMate)${p.label ? ` · ${p.label}` : ""} — doble click retipa o invierte el sentido · Supr la borra`
  }));
  return {
    nodes: x,
    edges: A([
      // Composition first: the ownership diamonds paint under the semantic edges.
      ...E,
      ...Fo,
      ...Bo,
      ...S,
      ...C,
      ...W,
      ...V,
      ...U,
      ...F,
      ...H,
      ...le,
      ...J,
      ...Ue,
      ...ot,
      ...St,
      ...Se,
      ...X,
      ...ae,
      ...ye,
      ...Ne,
      ...wo,
      ...ko,
      ...$o,
      ..._o,
      ...Co,
      ..._e,
      ...De,
      ...Io,
      ...vo,
      ...ri,
      ...yo,
      ...bo,
      ...Eo,
      ...Mo,
      ...Po,
      ...To,
      ...Oo,
      ...Ro,
      ...No,
      ...Do,
      ...Lo,
      ...Uo,
      ...So,
      ...Ao,
      ...Q,
      ...zo,
      ...qo
    ])
  };
}
const ss = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, rs = 176, ds = 60, ls = 140, cs = 40, ps = 140, us = 40;
function ms(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [], a = e.valueObjects ?? [];
  return e.boundedContexts.forEach((o, s) => {
    const d = 220 + s * 340;
    i.filter((c) => c.boundedContextId === o.id).forEach((c, h) => {
      const m = n.filter((v) => v.aggregateId === c.id), f = a.filter((v) => v.aggregateId === c.id), y = 140 + h * (170 + (m.length + f.length) * 60);
      t[c.id] = { x: d, y }, m.forEach((v, I) => {
        t[v.id] = { x: d + 60, y: y + 100 + I * 60 };
      }), f.forEach((v, I) => {
        t[v.id] = { x: d + 60, y: y + 100 + (m.length + I) * 60 };
      });
    });
  }), i.filter((o) => !e.boundedContexts.some((s) => s.id === o.boundedContextId)).forEach((o, s) => {
    t[o.id] = { x: 220 + s * 340, y: 640 };
  }), t;
}
function fs(e, t) {
  const i = ms(e), n = (k) => t[k] ?? i[k] ?? { x: 200, y: 200 }, a = new Map(e.boundedContexts.map((k) => [k.id, k])), o = (e.aggregates ?? []).map((k) => {
    const T = a.get(k.boundedContextId), z = (T == null ? void 0 : T.subdomainType) ?? "GENERIC", Q = n(k.id), C = (e.entities ?? []).filter((w) => w.aggregateId === k.id).length, W = (e.valueObjects ?? []).filter((w) => w.aggregateId === k.id).length, j = (k.invariants ?? []).length, O = (k.operations ?? []).length, G = (C ? ` · 🗂${C}` : "") + (W ? ` · ◈${W}` : "") + (O ? ` · ⚙${O}` : "") + (j ? ` · ⚖${j}` : "");
    return {
      id: k.id,
      label: k.name,
      x: Q.x,
      y: Q.y,
      w: rs,
      h: ds,
      kind: "aggregate",
      symbol: "aggregate",
      fill: ss[z],
      stroke: "#64748b",
      badge: `${T ? `${T.name.toUpperCase()} · ` : ""}AGGREGATE${G}`,
      tooltip: `Agregado ${k.name}${T ? ` — contexto ${T.name} (${z})` : ""}${W || C ? ` · ${C} entidad(es), ${W} value object(s)` : ""}`
    };
  }), s = /* @__PURE__ */ new Set();
  [...e.aggregates ?? [], ...e.entities ?? []].forEach(
    (k) => (k.fields ?? []).forEach((T) => {
      T.typeKind !== "primitive" && T.typeRef && s.add(T.typeRef);
    })
  );
  const d = (e.entities ?? []).filter((k) => !s.has(k.id)).map((k) => {
    const T = n(k.id);
    return {
      id: k.id,
      label: k.name,
      x: T.x,
      y: T.y,
      w: ls,
      h: cs,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${k.name} (dentro del agregado)`
    };
  }), r = (e.valueObjects ?? []).filter((k) => !s.has(k.id)).map((k) => {
    const T = n(k.id), z = k.type === "Enum" ? (k.enumValues ?? []).join(" · ") : k.type === "Wrapper" ? k.dataType ?? "" : (k.fields ?? []).map((Q) => Q.name).join(", ");
    return {
      id: k.id,
      label: k.name,
      x: T.x,
      y: T.y,
      w: ps,
      h: us,
      kind: "value-object",
      symbol: "value-object",
      fill: "#faf5ff",
      stroke: "#a855f7",
      badge: `VALUE OBJECT${k.type ? ` · ${k.type.toUpperCase()}` : ""}`,
      tooltip: `Value object ${k.name}${z ? ` — ${z}` : ""}`
    };
  }), c = (e.valueObjects ?? []).filter((k) => !s.has(k.id)).map((k) => ({
    id: `contains-vo:${k.aggregateId}->${k.id}`,
    sourceId: k.aggregateId,
    targetId: k.id,
    kind: "containment",
    color: "#a855f7",
    dashed: !0,
    tooltip: "Value object dentro del agregado"
  })), h = new Set((e.aggregates ?? []).map((k) => k.id)), m = [
    ...(e.aggregates ?? []).map((k) => ({ id: k.id, ownerKind: "agregado", invariants: k.invariants })),
    ...(e.valueObjects ?? []).map((k) => ({ id: k.id, ownerKind: "value object", invariants: k.invariants })),
    ...(e.entities ?? []).map((k) => ({ id: k.id, ownerKind: "entidad", invariants: k.invariants }))
  ], f = m.flatMap(
    (k) => (k.invariants ?? []).map((T, z) => {
      const Q = n(k.id), C = t[T.id] ?? (h.has(k.id) ? { x: Q.x - 150, y: Q.y + 90 + z * 52 } : { x: Q.x + 160, y: Q.y + z * 46 });
      return {
        id: T.id,
        label: T.name,
        x: C.x,
        y: C.y,
        w: 150,
        h: 36,
        kind: "invariant",
        symbol: "shield",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        badge: "⚖ INVARIANTE",
        tooltip: `${T.name} — regla que el ${k.ownerKind} protege; doble click abre su ficha (las condiciones se detallan allí)`
      };
    })
  ), y = m.flatMap(
    (k) => (k.invariants ?? []).map((T) => ({
      id: `protects:${k.id}->${T.id}`,
      sourceId: k.id,
      targetId: T.id,
      kind: "invariant-containment",
      color: "#0f766e",
      dashed: !0,
      tooltip: "Protege esta regla — Supr la retira"
    }))
  ), v = (e.entities ?? []).filter((k) => !s.has(k.id)).map((k) => ({
    id: `contains:${k.aggregateId}->${k.id}`,
    sourceId: k.aggregateId,
    targetId: k.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), I = (e.aggregateReferences ?? []).map((k, T) => ({
    id: `aggref:${T}:${k.sourceAggregateId}->${k.targetAggregateId}`,
    sourceId: k.sourceAggregateId,
    targetId: k.targetAggregateId,
    kind: "aggregate-reference",
    label: k.label,
    color: "#475569",
    arrow: !0,
    tooltip: k.label ? `Referencia: ${k.label}` : "Referencia entre agregados"
  })), g = /* @__PURE__ */ new Map();
  (e.valueObjects ?? []).forEach((k) => g.set(k.id, k.name)), (e.entities ?? []).forEach((k) => g.set(k.id, k.name)), (e.aggregates ?? []).forEach((k) => g.set(k.id, k.name));
  const l = [
    ...(e.aggregates ?? []).map((k) => ({ id: k.id, fields: k.fields })),
    ...(e.entities ?? []).map((k) => ({ id: k.id, fields: k.fields }))
  ], u = l.flatMap(
    (k) => (k.fields ?? []).map((T, z) => {
      const Q = n(k.id), C = t[T.id] ?? { x: Q.x + 175, y: Q.y - 20 + z * 44 }, W = T.typeKind === "primitive" ? T.typeRef || "texto" : g.get(T.typeRef) ?? "¿tipo?", j = T.collection ? `[${W}]` : W;
      return {
        id: T.id,
        label: `${T.name}${T.required ? " ∗" : ""}`,
        x: C.x,
        y: C.y,
        w: 150,
        h: 34,
        kind: "field",
        symbol: "field",
        fill: "#f8fafc",
        stroke: "#64748b",
        badge: `CAMPO · ${j}`,
        tooltip: `Campo ${T.name}${T.required ? " (obligatorio)" : ""}${T.collection ? " (colección)" : ""} : ${j}`
      };
    })
  ), x = l.flatMap(
    (k) => (k.fields ?? []).map((T) => ({
      id: `contains-field:${k.id}->${T.id}`,
      sourceId: k.id,
      targetId: T.id,
      kind: "containment",
      color: "#94a3b8",
      dashed: !0,
      tooltip: "Campo de este elemento"
    }))
  ), E = (k) => {
    var T, z;
    return k ? (z = (T = e.models) == null ? void 0 : T.find((Q) => Q.id === k)) == null ? void 0 : z.name : void 0;
  }, N = (e.aggregates ?? []).flatMap(
    (k) => (k.operations ?? []).map((T, z) => {
      const Q = n(k.id), C = t[T.id] ?? { x: Q.x - 190, y: Q.y - 20 + z * 44 }, W = E(T.inputModelId) ?? "", j = E(T.outputModelId);
      return {
        id: T.id,
        label: T.name,
        x: C.x,
        y: C.y,
        w: 150,
        h: 34,
        kind: "operation",
        symbol: "operation",
        fill: "#f5f3ff",
        stroke: "#7c3aed",
        badge: `OP · ${W}${j ? ` → ${j}` : ""}`,
        tooltip: `Operación ${T.name}(${W})${j ? ` : ${j}` : ""}`
      };
    })
  ), R = (e.aggregates ?? []).flatMap(
    (k) => (k.operations ?? []).map((T) => ({
      id: `contains-op:${k.id}->${T.id}`,
      sourceId: k.id,
      targetId: T.id,
      kind: "containment",
      color: "#a78bfa",
      dashed: !0,
      tooltip: "Operación del agregado"
    }))
  );
  return {
    nodes: [...o, ...d, ...r, ...f, ...u, ...N],
    edges: [...v, ...c, ...I, ...y, ...x, ...R]
  };
}
const hs = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, gs = 150, ys = 44, bs = 190, vs = 56, xs = 160, Is = 48;
function ws(e, t) {
  const i = e.externalSystems.find((a) => a.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.boundedContexts.find((a) => a.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function ks(e, t) {
  const i = e.flows, n = [], a = [], o = /* @__PURE__ */ new Set(), s = (d) => {
    var r, c;
    return ((c = (r = e.aggregates) == null ? void 0 : r.find((h) => h.id === d)) == null ? void 0 : c.name) ?? d ?? "?";
  };
  return i.forEach((d, r) => {
    const c = 120 + r * 130, h = hs[d.archetype] ?? "#475569", m = d.triggerAggregateId ?? d.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const g = t[m] ?? { x: 160, y: c };
      n.push({
        id: m,
        label: d.triggerAggregateId ? s(d.triggerAggregateId) : m,
        x: g.x,
        y: g.y,
        w: gs,
        h: ys,
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
      w: bs,
      h: vs,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: h,
      badge: d.archetype,
      tooltip: `Flow ${d.name} [${d.archetype}]${d.readModelName ? ` → read model ${d.readModelName}` : ""}${d.targetUseCaseId ? ` → use case ${d.targetUseCaseId}` : ""}`
    });
    const v = ws(e, d), I = `tgt:${v.id}`;
    if (!o.has(I)) {
      o.add(I);
      const g = t[I] ?? { x: 790, y: c };
      n.push({
        id: I,
        label: v.label,
        x: g.x,
        y: g.y,
        w: xs,
        h: Is,
        kind: v.external ? "external-system" : "boundedContext",
        symbol: "component",
        fill: v.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: v.external,
        badge: v.external ? "EXTERNAL" : "BOUNDED_CONTEXT"
      });
    }
    a.push({
      id: `fe:${d.id}:in`,
      sourceId: m,
      targetId: f,
      kind: "flow-trigger",
      label: d.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: d.triggerEvent ? `Evento: ${d.triggerEvent}` : void 0
    }), a.push({
      id: `fe:${d.id}:out`,
      sourceId: f,
      targetId: I,
      kind: "flow-delivery",
      color: h,
      arrow: !0
    });
  }), { nodes: n, edges: a };
}
const $s = 190, _s = 56, Bi = 170, Cs = 52;
function $n(e, t) {
  const i = [], n = [], a = (o) => {
    var s;
    return (s = e.boundedContexts.find((d) => d.id === o)) == null ? void 0 : s.name;
  };
  return (e.processes ?? []).forEach((o, s) => {
    const d = 140 + s * 240, r = t[o.id] ?? { x: 150, y: d };
    i.push({
      id: o.id,
      label: o.name,
      x: r.x,
      y: r.y,
      w: $s,
      h: _s,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${a(o.ownerBoundedContextId) ? ` — contexto ${a(o.ownerBoundedContextId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((h, m) => {
      const f = h.type === "HUMAN", y = t[h.id] ?? { x: 150 + (m + 1) * 240, y: d };
      if (i.push({
        id: h.id,
        label: h.name,
        x: y.x,
        y: y.y,
        w: Bi,
        h: Cs,
        kind: "process-step",
        symbol: f ? "person" : "gear",
        fill: f ? "#fef3c7" : "#ffffff",
        stroke: f ? "#d97706" : "#64748b",
        badge: f ? `HUMAN${h.roleId ? ` · ${h.roleId}` : ""}${h.deadline ? ` · ⏱ ${h.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${h.name}${h.useCaseId ? ` — use case ${h.useCaseId}` : ""}${h.deadline ? ` · deadline ${h.deadline}` : ""}`
      }), n.push({
        id: `pe:${o.id}:${m}`,
        sourceId: c,
        targetId: h.id,
        kind: "process-seq",
        label: m === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), h.compensationUseCaseId) {
        const v = `comp:${h.id}`, I = t[v] ?? { x: y.x, y: y.y + 90 };
        i.push({
          id: v,
          label: h.compensationUseCaseId,
          x: I.x,
          y: I.y,
          w: Bi,
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
      c = h.id;
    }), o.onCompletionEventName) {
      const h = `done:${o.id}`, m = t[h] ?? { x: 150 + (o.steps.length + 1) * 240, y: d };
      i.push({
        id: h,
        label: o.onCompletionEventName,
        x: m.x,
        y: m.y,
        w: Bi,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${o.id}`,
        sourceId: c,
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
const ki = globalThis, pn = ki.ShadowRoot && (ki.ShadyCSS === void 0 || ki.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, un = Symbol(), _n = /* @__PURE__ */ new WeakMap();
let Pa = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== un) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (pn && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = _n.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && _n.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Es = (e) => new Pa(typeof e == "string" ? e : e + "", void 0, un), nt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, a, o) => n + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + e[o + 1], e[0]);
  return new Pa(i, e, un);
}, Ss = (e, t) => {
  if (pn) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), a = ki.litNonce;
    a !== void 0 && n.setAttribute("nonce", a), n.textContent = i.cssText, e.appendChild(n);
  }
}, Cn = pn ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return Es(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: As, defineProperty: Ms, getOwnPropertyDescriptor: Ps, getOwnPropertyNames: Ts, getOwnPropertySymbols: Os, getPrototypeOf: Rs } = Object, ut = globalThis, En = ut.trustedTypes, Ns = En ? En.emptyScript : "", Fi = ut.reactiveElementPolyfillSupport, Ht = (e, t) => e, Si = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Ns : null;
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
} }, mn = (e, t) => !As(e, t), Sn = { attribute: !0, type: String, converter: Si, reflect: !1, useDefault: !1, hasChanged: mn };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ut.litPropertyMetadata ?? (ut.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Pt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = Sn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), a = this.getPropertyDescriptor(t, n, i);
      a !== void 0 && Ms(this.prototype, t, a);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: a, set: o } = Ps(this.prototype, t) ?? { get() {
      return this[i];
    }, set(s) {
      this[i] = s;
    } };
    return { get: a, set(s) {
      const d = a == null ? void 0 : a.call(this);
      o == null || o.call(this, s), this.requestUpdate(t, d, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Sn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ht("elementProperties"))) return;
    const t = Rs(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ht("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ht("properties"))) {
      const i = this.properties, n = [...Ts(i), ...Os(i)];
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
      for (const a of n) i.unshift(Cn(a));
    } else t !== void 0 && i.push(Cn(t));
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
    return Ss(t, this.constructor.elementStyles), t;
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
    const n = this.constructor.elementProperties.get(t), a = this.constructor._$Eu(t, n);
    if (a !== void 0 && n.reflect === !0) {
      const s = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : Si).toAttribute(i, n.type);
      this._$Em = t, s == null ? this.removeAttribute(a) : this.setAttribute(a, s), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, s;
    const n = this.constructor, a = n._$Eh.get(t);
    if (a !== void 0 && this._$Em !== a) {
      const d = n.getPropertyOptions(a), r = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((o = d.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? d.converter : Si;
      this._$Em = a;
      const c = r.fromAttribute(i, d.type);
      this[a] = c ?? ((s = this._$Ej) == null ? void 0 : s.get(a)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, a = !1, o) {
    var s;
    if (t !== void 0) {
      const d = this.constructor;
      if (a === !1 && (o = this[t]), n ?? (n = d.getPropertyOptions(t)), !((n.hasChanged ?? mn)(o, i) || n.useDefault && n.reflect && o === ((s = this._$Ej) == null ? void 0 : s.get(t)) && !this.hasAttribute(d._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: a, wrapped: o }, s) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, s ?? i ?? this[t]), o !== !0 || s !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), a === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, s] of this._$Ep) this[o] = s;
        this._$Ep = void 0;
      }
      const a = this.constructor.elementProperties;
      if (a.size > 0) for (const [o, s] of a) {
        const { wrapped: d } = s, r = this[o];
        d !== !0 || this._$AL.has(o) || r === void 0 || this.C(o, void 0, s, r);
      }
    }
    let t = !1;
    const i = this._$AL;
    try {
      t = this.shouldUpdate(i), t ? (this.willUpdate(i), (n = this._$EO) == null || n.forEach((a) => {
        var o;
        return (o = a.hostUpdate) == null ? void 0 : o.call(a);
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
Pt.elementStyles = [], Pt.shadowRootOptions = { mode: "open" }, Pt[Ht("elementProperties")] = /* @__PURE__ */ new Map(), Pt[Ht("finalized")] = /* @__PURE__ */ new Map(), Fi == null || Fi({ ReactiveElement: Pt }), (ut.reactiveElementVersions ?? (ut.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yt = globalThis, An = (e) => e, Ai = Yt.trustedTypes, Mn = Ai ? Ai.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Ta = "$lit$", pt = `lit$${Math.random().toFixed(9).slice(2)}$`, Oa = "?" + pt, Ds = `<${Oa}>`, Ct = document, Xt = () => Ct.createComment(""), Qt = (e) => e === null || typeof e != "object" && typeof e != "function", fn = Array.isArray, Ls = (e) => fn(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", ji = `[ 	
\f\r]`, Ut = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Pn = /-->/g, Tn = />/g, ht = RegExp(`>|${ji}(?:([^\\s"'>=/]+)(${ji}*=${ji}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), On = /'/g, Rn = /"/g, Ra = /^(?:script|style|textarea|title)$/i, Na = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), $ = Na(1), ee = Na(2), Rt = Symbol.for("lit-noChange"), re = Symbol.for("lit-nothing"), Nn = /* @__PURE__ */ new WeakMap(), wt = Ct.createTreeWalker(Ct, 129);
function Da(e, t) {
  if (!fn(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Mn !== void 0 ? Mn.createHTML(t) : t;
}
const Us = (e, t) => {
  const i = e.length - 1, n = [];
  let a, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", s = Ut;
  for (let d = 0; d < i; d++) {
    const r = e[d];
    let c, h, m = -1, f = 0;
    for (; f < r.length && (s.lastIndex = f, h = s.exec(r), h !== null); ) f = s.lastIndex, s === Ut ? h[1] === "!--" ? s = Pn : h[1] !== void 0 ? s = Tn : h[2] !== void 0 ? (Ra.test(h[2]) && (a = RegExp("</" + h[2], "g")), s = ht) : h[3] !== void 0 && (s = ht) : s === ht ? h[0] === ">" ? (s = a ?? Ut, m = -1) : h[1] === void 0 ? m = -2 : (m = s.lastIndex - h[2].length, c = h[1], s = h[3] === void 0 ? ht : h[3] === '"' ? Rn : On) : s === Rn || s === On ? s = ht : s === Pn || s === Tn ? s = Ut : (s = ht, a = void 0);
    const y = s === ht && e[d + 1].startsWith("/>") ? " " : "";
    o += s === Ut ? r + Ds : m >= 0 ? (n.push(c), r.slice(0, m) + Ta + r.slice(m) + pt + y) : r + pt + (m === -2 ? d : y);
  }
  return [Da(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Jt {
  constructor({ strings: t, _$litType$: i }, n) {
    let a;
    this.parts = [];
    let o = 0, s = 0;
    const d = t.length - 1, r = this.parts, [c, h] = Us(t, i);
    if (this.el = Jt.createElement(c, n), wt.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (a = wt.nextNode()) !== null && r.length < d; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const m of a.getAttributeNames()) if (m.endsWith(Ta)) {
          const f = h[s++], y = a.getAttribute(m).split(pt), v = /([.?@])?(.*)/.exec(f);
          r.push({ type: 1, index: o, name: v[2], strings: y, ctor: v[1] === "." ? qs : v[1] === "?" ? Bs : v[1] === "@" ? Fs : Li }), a.removeAttribute(m);
        } else m.startsWith(pt) && (r.push({ type: 6, index: o }), a.removeAttribute(m));
        if (Ra.test(a.tagName)) {
          const m = a.textContent.split(pt), f = m.length - 1;
          if (f > 0) {
            a.textContent = Ai ? Ai.emptyScript : "";
            for (let y = 0; y < f; y++) a.append(m[y], Xt()), wt.nextNode(), r.push({ type: 2, index: ++o });
            a.append(m[f], Xt());
          }
        }
      } else if (a.nodeType === 8) if (a.data === Oa) r.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = a.data.indexOf(pt, m + 1)) !== -1; ) r.push({ type: 7, index: o }), m += pt.length - 1;
      }
      o++;
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
  let a = n !== void 0 ? (s = i._$Co) == null ? void 0 : s[n] : i._$Cl;
  const o = Qt(t) ? void 0 : t._$litDirective$;
  return (a == null ? void 0 : a.constructor) !== o && ((d = a == null ? void 0 : a._$AO) == null || d.call(a, !1), o === void 0 ? a = void 0 : (a = new o(e), a._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = a : i._$Cl = a), a !== void 0 && (t = Nt(e, a._$AS(e, t.values), a, n)), t;
}
class zs {
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
    const { el: { content: i }, parts: n } = this._$AD, a = ((t == null ? void 0 : t.creationScope) ?? Ct).importNode(i, !0);
    wt.currentNode = a;
    let o = wt.nextNode(), s = 0, d = 0, r = n[0];
    for (; r !== void 0; ) {
      if (s === r.index) {
        let c;
        r.type === 2 ? c = new ai(o, o.nextSibling, this, t) : r.type === 1 ? c = new r.ctor(o, r.name, r.strings, this, t) : r.type === 6 && (c = new js(o, this, t)), this._$AV.push(c), r = n[++d];
      }
      s !== (r == null ? void 0 : r.index) && (o = wt.nextNode(), s++);
    }
    return wt.currentNode = Ct, a;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class ai {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, a) {
    this.type = 2, this._$AH = re, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = a, this._$Cv = (a == null ? void 0 : a.isConnected) ?? !0;
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
    t = Nt(this, t, i), Qt(t) ? t === re || t == null || t === "" ? (this._$AH !== re && this._$AR(), this._$AH = re) : t !== this._$AH && t !== Rt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ls(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== re && Qt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ct.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: n } = t, a = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Jt.createElement(Da(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === a) this._$AH.p(i);
    else {
      const s = new zs(a, this), d = s.u(this.options);
      s.p(i), this.T(d), this._$AH = s;
    }
  }
  _$AC(t) {
    let i = Nn.get(t.strings);
    return i === void 0 && Nn.set(t.strings, i = new Jt(t)), i;
  }
  k(t) {
    fn(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, a = 0;
    for (const o of t) a === i.length ? i.push(n = new ai(this.O(Xt()), this.O(Xt()), this, this.options)) : n = i[a], n._$AI(o), a++;
    a < i.length && (this._$AR(n && n._$AB.nextSibling, a), i.length = a);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const a = An(t).nextSibling;
      An(t).remove(), t = a;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Li {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, a, o) {
    this.type = 1, this._$AH = re, this._$AN = void 0, this.element = t, this.name = i, this._$AM = a, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = re;
  }
  _$AI(t, i = this, n, a) {
    const o = this.strings;
    let s = !1;
    if (o === void 0) t = Nt(this, t, i, 0), s = !Qt(t) || t !== this._$AH && t !== Rt, s && (this._$AH = t);
    else {
      const d = t;
      let r, c;
      for (t = o[0], r = 0; r < o.length - 1; r++) c = Nt(this, d[n + r], i, r), c === Rt && (c = this._$AH[r]), s || (s = !Qt(c) || c !== this._$AH[r]), c === re ? t = re : t !== re && (t += (c ?? "") + o[r + 1]), this._$AH[r] = c;
    }
    s && !a && this.j(t);
  }
  j(t) {
    t === re ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class qs extends Li {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === re ? void 0 : t;
  }
}
class Bs extends Li {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== re);
  }
}
class Fs extends Li {
  constructor(t, i, n, a, o) {
    super(t, i, n, a, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Nt(this, t, i, 0) ?? re) === Rt) return;
    const n = this._$AH, a = t === re && n !== re || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== re && (n === re || a);
    a && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class js {
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
const Vi = Yt.litHtmlPolyfillSupport;
Vi == null || Vi(Jt, ai), (Yt.litHtmlVersions ?? (Yt.litHtmlVersions = [])).push("3.3.3");
const Vs = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let a = n._$litPart$;
  if (a === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = a = new ai(t.insertBefore(Xt(), o), o, void 0, i ?? {});
  }
  return a._$AI(e), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis;
class Ve extends Pt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Vs(i, this.renderRoot, this.renderOptions);
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
var Ca;
Ve._$litElement$ = !0, Ve.finalized = !0, (Ca = $t.litElementHydrateSupport) == null || Ca.call($t, { LitElement: Ve });
const Wi = $t.litElementPolyfillSupport;
Wi == null || Wi({ LitElement: Ve });
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
const Ws = { attribute: !0, type: String, converter: Si, reflect: !1, hasChanged: mn }, Gs = (e = Ws, t, i) => {
  const { kind: n, metadata: a } = i;
  let o = globalThis.litPropertyMetadata.get(a);
  if (o === void 0 && globalThis.litPropertyMetadata.set(a, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), n === "accessor") {
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
  return (t, i) => typeof i == "object" ? Gs(e, t, i) : ((n, a, o) => {
    const s = a.hasOwnProperty(o);
    return a.constructor.createProperty(o, n), s ? Object.getOwnPropertyDescriptor(a, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function B(e) {
  return de({ ...e, state: !0, attribute: !1 });
}
var Ji = "http://www.w3.org/1999/xhtml";
const Dn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ji,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Ui(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), Dn.hasOwnProperty(t) ? { space: Dn[t], local: e } : e;
}
function Hs(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Ji && t.documentElement.namespaceURI === Ji ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Ys(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function La(e) {
  var t = Ui(e);
  return (t.local ? Ys : Hs)(t);
}
function Ks() {
}
function hn(e) {
  return e == null ? Ks : function() {
    return this.querySelector(e);
  };
}
function Xs(e) {
  typeof e != "function" && (e = hn(e));
  for (var t = this._groups, i = t.length, n = new Array(i), a = 0; a < i; ++a)
    for (var o = t[a], s = o.length, d = n[a] = new Array(s), r, c, h = 0; h < s; ++h)
      (r = o[h]) && (c = e.call(r, r.__data__, h, o)) && ("__data__" in r && (c.__data__ = r.__data__), d[h] = c);
  return new je(n, this._parents);
}
function Qs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Js() {
  return [];
}
function Ua(e) {
  return e == null ? Js : function() {
    return this.querySelectorAll(e);
  };
}
function Zs(e) {
  return function() {
    return Qs(e.apply(this, arguments));
  };
}
function er(e) {
  typeof e == "function" ? e = Zs(e) : e = Ua(e);
  for (var t = this._groups, i = t.length, n = [], a = [], o = 0; o < i; ++o)
    for (var s = t[o], d = s.length, r, c = 0; c < d; ++c)
      (r = s[c]) && (n.push(e.call(r, r.__data__, c, s)), a.push(r));
  return new je(n, a);
}
function za(e) {
  return function() {
    return this.matches(e);
  };
}
function qa(e) {
  return function(t) {
    return t.matches(e);
  };
}
var tr = Array.prototype.find;
function ir(e) {
  return function() {
    return tr.call(this.children, e);
  };
}
function nr() {
  return this.firstElementChild;
}
function ar(e) {
  return this.select(e == null ? nr : ir(typeof e == "function" ? e : qa(e)));
}
var or = Array.prototype.filter;
function sr() {
  return Array.from(this.children);
}
function rr(e) {
  return function() {
    return or.call(this.children, e);
  };
}
function dr(e) {
  return this.selectAll(e == null ? sr : rr(typeof e == "function" ? e : qa(e)));
}
function lr(e) {
  typeof e != "function" && (e = za(e));
  for (var t = this._groups, i = t.length, n = new Array(i), a = 0; a < i; ++a)
    for (var o = t[a], s = o.length, d = n[a] = [], r, c = 0; c < s; ++c)
      (r = o[c]) && e.call(r, r.__data__, c, o) && d.push(r);
  return new je(n, this._parents);
}
function Ba(e) {
  return new Array(e.length);
}
function cr() {
  return new je(this._enter || this._groups.map(Ba), this._parents);
}
function Mi(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Mi.prototype = {
  constructor: Mi,
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
function pr(e) {
  return function() {
    return e;
  };
}
function ur(e, t, i, n, a, o) {
  for (var s = 0, d, r = t.length, c = o.length; s < c; ++s)
    (d = t[s]) ? (d.__data__ = o[s], n[s] = d) : i[s] = new Mi(e, o[s]);
  for (; s < r; ++s)
    (d = t[s]) && (a[s] = d);
}
function mr(e, t, i, n, a, o, s) {
  var d, r, c = /* @__PURE__ */ new Map(), h = t.length, m = o.length, f = new Array(h), y;
  for (d = 0; d < h; ++d)
    (r = t[d]) && (f[d] = y = s.call(r, r.__data__, d, t) + "", c.has(y) ? a[d] = r : c.set(y, r));
  for (d = 0; d < m; ++d)
    y = s.call(e, o[d], d, o) + "", (r = c.get(y)) ? (n[d] = r, r.__data__ = o[d], c.delete(y)) : i[d] = new Mi(e, o[d]);
  for (d = 0; d < h; ++d)
    (r = t[d]) && c.get(f[d]) === r && (a[d] = r);
}
function fr(e) {
  return e.__data__;
}
function hr(e, t) {
  if (!arguments.length) return Array.from(this, fr);
  var i = t ? mr : ur, n = this._parents, a = this._groups;
  typeof e != "function" && (e = pr(e));
  for (var o = a.length, s = new Array(o), d = new Array(o), r = new Array(o), c = 0; c < o; ++c) {
    var h = n[c], m = a[c], f = m.length, y = gr(e.call(h, h && h.__data__, c, n)), v = y.length, I = d[c] = new Array(v), g = s[c] = new Array(v), l = r[c] = new Array(f);
    i(h, m, I, g, l, y, t);
    for (var u = 0, x = 0, E, N; u < v; ++u)
      if (E = I[u]) {
        for (u >= x && (x = u + 1); !(N = g[x]) && ++x < v; ) ;
        E._next = N || null;
      }
  }
  return s = new je(s, n), s._enter = d, s._exit = r, s;
}
function gr(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function yr() {
  return new je(this._exit || this._groups.map(Ba), this._parents);
}
function br(e, t, i) {
  var n = this.enter(), a = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (a = t(a), a && (a = a.selection())), i == null ? o.remove() : i(o), n && a ? n.merge(a).order() : a;
}
function vr(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, a = i.length, o = n.length, s = Math.min(a, o), d = new Array(a), r = 0; r < s; ++r)
    for (var c = i[r], h = n[r], m = c.length, f = d[r] = new Array(m), y, v = 0; v < m; ++v)
      (y = c[v] || h[v]) && (f[v] = y);
  for (; r < a; ++r)
    d[r] = i[r];
  return new je(d, this._parents);
}
function xr() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], a = n.length - 1, o = n[a], s; --a >= 0; )
      (s = n[a]) && (o && s.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(s, o), o = s);
  return this;
}
function Ir(e) {
  e || (e = wr);
  function t(m, f) {
    return m && f ? e(m.__data__, f.__data__) : !m - !f;
  }
  for (var i = this._groups, n = i.length, a = new Array(n), o = 0; o < n; ++o) {
    for (var s = i[o], d = s.length, r = a[o] = new Array(d), c, h = 0; h < d; ++h)
      (c = s[h]) && (r[h] = c);
    r.sort(t);
  }
  return new je(a, this._parents).order();
}
function wr(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function kr() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function $r() {
  return Array.from(this);
}
function _r() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], a = 0, o = n.length; a < o; ++a) {
      var s = n[a];
      if (s) return s;
    }
  return null;
}
function Cr() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function Er() {
  return !this.node();
}
function Sr(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var a = t[i], o = 0, s = a.length, d; o < s; ++o)
      (d = a[o]) && e.call(d, d.__data__, o, a);
  return this;
}
function Ar(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Mr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Pr(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Tr(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Or(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Rr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Nr(e, t) {
  var i = Ui(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? Mr : Ar : typeof t == "function" ? i.local ? Rr : Or : i.local ? Tr : Pr)(i, t));
}
function Fa(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Dr(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Lr(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Ur(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function zr(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Dr : typeof t == "function" ? Ur : Lr)(e, t, i ?? "")) : Dt(this.node(), e);
}
function Dt(e, t) {
  return e.style.getPropertyValue(t) || Fa(e).getComputedStyle(e, null).getPropertyValue(t);
}
function qr(e) {
  return function() {
    delete this[e];
  };
}
function Br(e, t) {
  return function() {
    this[e] = t;
  };
}
function Fr(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function jr(e, t) {
  return arguments.length > 1 ? this.each((t == null ? qr : typeof t == "function" ? Fr : Br)(e, t)) : this.node()[e];
}
function ja(e) {
  return e.trim().split(/^|\s+/);
}
function gn(e) {
  return e.classList || new Va(e);
}
function Va(e) {
  this._node = e, this._names = ja(e.getAttribute("class") || "");
}
Va.prototype = {
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
function Wa(e, t) {
  for (var i = gn(e), n = -1, a = t.length; ++n < a; ) i.add(t[n]);
}
function Ga(e, t) {
  for (var i = gn(e), n = -1, a = t.length; ++n < a; ) i.remove(t[n]);
}
function Vr(e) {
  return function() {
    Wa(this, e);
  };
}
function Wr(e) {
  return function() {
    Ga(this, e);
  };
}
function Gr(e, t) {
  return function() {
    (t.apply(this, arguments) ? Wa : Ga)(this, e);
  };
}
function Hr(e, t) {
  var i = ja(e + "");
  if (arguments.length < 2) {
    for (var n = gn(this.node()), a = -1, o = i.length; ++a < o; ) if (!n.contains(i[a])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Gr : t ? Vr : Wr)(i, t));
}
function Yr() {
  this.textContent = "";
}
function Kr(e) {
  return function() {
    this.textContent = e;
  };
}
function Xr(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Qr(e) {
  return arguments.length ? this.each(e == null ? Yr : (typeof e == "function" ? Xr : Kr)(e)) : this.node().textContent;
}
function Jr() {
  this.innerHTML = "";
}
function Zr(e) {
  return function() {
    this.innerHTML = e;
  };
}
function ed(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function td(e) {
  return arguments.length ? this.each(e == null ? Jr : (typeof e == "function" ? ed : Zr)(e)) : this.node().innerHTML;
}
function id() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function nd() {
  return this.each(id);
}
function ad() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function od() {
  return this.each(ad);
}
function sd(e) {
  var t = typeof e == "function" ? e : La(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function rd() {
  return null;
}
function dd(e, t) {
  var i = typeof e == "function" ? e : La(e), n = t == null ? rd : typeof t == "function" ? t : hn(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function ld() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function cd() {
  return this.each(ld);
}
function pd() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function ud() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function md(e) {
  return this.select(e ? ud : pd);
}
function fd(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function hd(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function gd(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function yd(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, a = t.length, o; i < a; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++n] = o;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function bd(e, t, i) {
  return function() {
    var n = this.__on, a, o = hd(t);
    if (n) {
      for (var s = 0, d = n.length; s < d; ++s)
        if ((a = n[s]).type === e.type && a.name === e.name) {
          this.removeEventListener(a.type, a.listener, a.options), this.addEventListener(a.type, a.listener = o, a.options = i), a.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), a = { type: e.type, name: e.name, value: t, listener: o, options: i }, n ? n.push(a) : this.__on = [a];
  };
}
function vd(e, t, i) {
  var n = gd(e + ""), a, o = n.length, s;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var r = 0, c = d.length, h; r < c; ++r)
        for (a = 0, h = d[r]; a < o; ++a)
          if ((s = n[a]).type === h.type && s.name === h.name)
            return h.value;
    }
    return;
  }
  for (d = t ? bd : yd, a = 0; a < o; ++a) this.each(d(n[a], t, i));
  return this;
}
function Ha(e, t, i) {
  var n = Fa(e), a = n.CustomEvent;
  typeof a == "function" ? a = new a(t, i) : (a = n.document.createEvent("Event"), i ? (a.initEvent(t, i.bubbles, i.cancelable), a.detail = i.detail) : a.initEvent(t, !1, !1)), e.dispatchEvent(a);
}
function xd(e, t) {
  return function() {
    return Ha(this, e, t);
  };
}
function Id(e, t) {
  return function() {
    return Ha(this, e, t.apply(this, arguments));
  };
}
function wd(e, t) {
  return this.each((typeof t == "function" ? Id : xd)(e, t));
}
function* kd() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], a = 0, o = n.length, s; a < o; ++a)
      (s = n[a]) && (yield s);
}
var Ya = [null];
function je(e, t) {
  this._groups = e, this._parents = t;
}
function oi() {
  return new je([[document.documentElement]], Ya);
}
function $d() {
  return this;
}
je.prototype = oi.prototype = {
  constructor: je,
  select: Xs,
  selectAll: er,
  selectChild: ar,
  selectChildren: dr,
  filter: lr,
  data: hr,
  enter: cr,
  exit: yr,
  join: br,
  merge: vr,
  selection: $d,
  order: xr,
  sort: Ir,
  call: kr,
  nodes: $r,
  node: _r,
  size: Cr,
  empty: Er,
  each: Sr,
  attr: Nr,
  style: zr,
  property: jr,
  classed: Hr,
  text: Qr,
  html: td,
  raise: nd,
  lower: od,
  append: sd,
  insert: dd,
  remove: cd,
  clone: md,
  datum: fd,
  on: vd,
  dispatch: wd,
  [Symbol.iterator]: kd
};
function We(e) {
  return typeof e == "string" ? new je([[document.querySelector(e)]], [document.documentElement]) : new je([[e]], Ya);
}
function _d(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function gt(e, t) {
  if (e = _d(e), t === void 0 && (t = e.currentTarget), t) {
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
var Cd = { value: () => {
} };
function yn() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new $i(i);
}
function $i(e) {
  this._ = e;
}
function Ed(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", a = i.indexOf(".");
    if (a >= 0 && (n = i.slice(a + 1), i = i.slice(0, a)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
$i.prototype = yn.prototype = {
  constructor: $i,
  on: function(e, t) {
    var i = this._, n = Ed(e + "", i), a, o = -1, s = n.length;
    if (arguments.length < 2) {
      for (; ++o < s; ) if ((a = (e = n[o]).type) && (a = Sd(i[a], e.name))) return a;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < s; )
      if (a = (e = n[o]).type) i[a] = Ln(i[a], e.name, t);
      else if (t == null) for (a in i) i[a] = Ln(i[a], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new $i(e);
  },
  call: function(e, t) {
    if ((a = arguments.length - 2) > 0) for (var i = new Array(a), n = 0, a, o; n < a; ++n) i[n] = arguments[n + 2];
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (o = this._[e], n = 0, a = o.length; n < a; ++n) o[n].value.apply(t, i);
  },
  apply: function(e, t, i) {
    if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
    for (var n = this._[e], a = 0, o = n.length; a < o; ++a) n[a].value.apply(t, i);
  }
};
function Sd(e, t) {
  for (var i = 0, n = e.length, a; i < n; ++i)
    if ((a = e[i]).name === t)
      return a.value;
}
function Ln(e, t, i) {
  for (var n = 0, a = e.length; n < a; ++n)
    if (e[n].name === t) {
      e[n] = Cd, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Zi = { capture: !0, passive: !1 };
function en(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Ad(e) {
  var t = e.document.documentElement, i = We(e).on("dragstart.drag", en, Zi);
  "onselectstart" in t ? i.on("selectstart.drag", en, Zi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Md(e, t) {
  var i = e.document.documentElement, n = We(e).on("dragstart.drag", null);
  t && (n.on("click.drag", en, Zi), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function bn(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function Ka(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function si() {
}
var Zt = 0.7, Pi = 1 / Zt, Ot = "\\s*([+-]?\\d+)\\s*", ei = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Qe = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Pd = /^#([0-9a-f]{3,8})$/, Td = new RegExp(`^rgb\\(${Ot},${Ot},${Ot}\\)$`), Od = new RegExp(`^rgb\\(${Qe},${Qe},${Qe}\\)$`), Rd = new RegExp(`^rgba\\(${Ot},${Ot},${Ot},${ei}\\)$`), Nd = new RegExp(`^rgba\\(${Qe},${Qe},${Qe},${ei}\\)$`), Dd = new RegExp(`^hsl\\(${ei},${Qe},${Qe}\\)$`), Ld = new RegExp(`^hsla\\(${ei},${Qe},${Qe},${ei}\\)$`), Un = {
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
bn(si, ti, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: zn,
  // Deprecated! Use color.formatHex.
  formatHex: zn,
  formatHex8: Ud,
  formatHsl: zd,
  formatRgb: qn,
  toString: qn
});
function zn() {
  return this.rgb().formatHex();
}
function Ud() {
  return this.rgb().formatHex8();
}
function zd() {
  return Xa(this).formatHsl();
}
function qn() {
  return this.rgb().formatRgb();
}
function ti(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = Pd.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Bn(t) : i === 3 ? new qe(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? di(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? di(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Td.exec(e)) ? new qe(t[1], t[2], t[3], 1) : (t = Od.exec(e)) ? new qe(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Rd.exec(e)) ? di(t[1], t[2], t[3], t[4]) : (t = Nd.exec(e)) ? di(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Dd.exec(e)) ? Vn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Ld.exec(e)) ? Vn(t[1], t[2] / 100, t[3] / 100, t[4]) : Un.hasOwnProperty(e) ? Bn(Un[e]) : e === "transparent" ? new qe(NaN, NaN, NaN, 0) : null;
}
function Bn(e) {
  return new qe(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function di(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new qe(e, t, i, n);
}
function qd(e) {
  return e instanceof si || (e = ti(e)), e ? (e = e.rgb(), new qe(e.r, e.g, e.b, e.opacity)) : new qe();
}
function tn(e, t, i, n) {
  return arguments.length === 1 ? qd(e) : new qe(e, t, i, n ?? 1);
}
function qe(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
bn(qe, tn, Ka(si, {
  brighter(e) {
    return e = e == null ? Pi : Math.pow(Pi, e), new qe(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Zt : Math.pow(Zt, e), new qe(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new qe(_t(this.r), _t(this.g), _t(this.b), Ti(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Fn,
  // Deprecated! Use color.formatHex.
  formatHex: Fn,
  formatHex8: Bd,
  formatRgb: jn,
  toString: jn
}));
function Fn() {
  return `#${kt(this.r)}${kt(this.g)}${kt(this.b)}`;
}
function Bd() {
  return `#${kt(this.r)}${kt(this.g)}${kt(this.b)}${kt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function jn() {
  const e = Ti(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${_t(this.r)}, ${_t(this.g)}, ${_t(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Ti(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function _t(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function kt(e) {
  return e = _t(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Vn(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ge(e, t, i, n);
}
function Xa(e) {
  if (e instanceof Ge) return new Ge(e.h, e.s, e.l, e.opacity);
  if (e instanceof si || (e = ti(e)), !e) return new Ge();
  if (e instanceof Ge) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, a = Math.min(t, i, n), o = Math.max(t, i, n), s = NaN, d = o - a, r = (o + a) / 2;
  return d ? (t === o ? s = (i - n) / d + (i < n) * 6 : i === o ? s = (n - t) / d + 2 : s = (t - i) / d + 4, d /= r < 0.5 ? o + a : 2 - o - a, s *= 60) : d = r > 0 && r < 1 ? 0 : s, new Ge(s, d, r, e.opacity);
}
function Fd(e, t, i, n) {
  return arguments.length === 1 ? Xa(e) : new Ge(e, t, i, n ?? 1);
}
function Ge(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
bn(Ge, Fd, Ka(si, {
  brighter(e) {
    return e = e == null ? Pi : Math.pow(Pi, e), new Ge(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Zt : Math.pow(Zt, e), new Ge(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, a = 2 * i - n;
    return new qe(
      Gi(e >= 240 ? e - 240 : e + 120, a, n),
      Gi(e, a, n),
      Gi(e < 120 ? e + 240 : e - 120, a, n),
      this.opacity
    );
  },
  clamp() {
    return new Ge(Wn(this.h), li(this.s), li(this.l), Ti(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Ti(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Wn(this.h)}, ${li(this.s) * 100}%, ${li(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Wn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function li(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Gi(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const Qa = (e) => () => e;
function jd(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Vd(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function Wd(e) {
  return (e = +e) == 1 ? Ja : function(t, i) {
    return i - t ? Vd(t, i, e) : Qa(isNaN(t) ? i : t);
  };
}
function Ja(e, t) {
  var i = t - e;
  return i ? jd(e, i) : Qa(isNaN(e) ? t : e);
}
const Gn = (function e(t) {
  var i = Wd(t);
  function n(a, o) {
    var s = i((a = tn(a)).r, (o = tn(o)).r), d = i(a.g, o.g), r = i(a.b, o.b), c = Ja(a.opacity, o.opacity);
    return function(h) {
      return a.r = s(h), a.g = d(h), a.b = r(h), a.opacity = c(h), a + "";
    };
  }
  return n.gamma = e, n;
})(1);
function lt(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var nn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Hi = new RegExp(nn.source, "g");
function Gd(e) {
  return function() {
    return e;
  };
}
function Hd(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Yd(e, t) {
  var i = nn.lastIndex = Hi.lastIndex = 0, n, a, o, s = -1, d = [], r = [];
  for (e = e + "", t = t + ""; (n = nn.exec(e)) && (a = Hi.exec(t)); )
    (o = a.index) > i && (o = t.slice(i, o), d[s] ? d[s] += o : d[++s] = o), (n = n[0]) === (a = a[0]) ? d[s] ? d[s] += a : d[++s] = a : (d[++s] = null, r.push({ i: s, x: lt(n, a) })), i = Hi.lastIndex;
  return i < t.length && (o = t.slice(i), d[s] ? d[s] += o : d[++s] = o), d.length < 2 ? r[0] ? Hd(r[0].x) : Gd(t) : (t = r.length, function(c) {
    for (var h = 0, m; h < t; ++h) d[(m = r[h]).i] = m.x(c);
    return d.join("");
  });
}
var Hn = 180 / Math.PI, an = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Za(e, t, i, n, a, o) {
  var s, d, r;
  return (s = Math.sqrt(e * e + t * t)) && (e /= s, t /= s), (r = e * i + t * n) && (i -= e * r, n -= t * r), (d = Math.sqrt(i * i + n * n)) && (i /= d, n /= d, r /= d), e * n < t * i && (e = -e, t = -t, r = -r, s = -s), {
    translateX: a,
    translateY: o,
    rotate: Math.atan2(t, e) * Hn,
    skewX: Math.atan(r) * Hn,
    scaleX: s,
    scaleY: d
  };
}
var ci;
function Kd(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? an : Za(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Xd(e) {
  return e == null || (ci || (ci = document.createElementNS("http://www.w3.org/2000/svg", "g")), ci.setAttribute("transform", e), !(e = ci.transform.baseVal.consolidate())) ? an : (e = e.matrix, Za(e.a, e.b, e.c, e.d, e.e, e.f));
}
function eo(e, t, i, n) {
  function a(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, h, m, f, y, v) {
    if (c !== m || h !== f) {
      var I = y.push("translate(", null, t, null, i);
      v.push({ i: I - 4, x: lt(c, m) }, { i: I - 2, x: lt(h, f) });
    } else (m || f) && y.push("translate(" + m + t + f + i);
  }
  function s(c, h, m, f) {
    c !== h ? (c - h > 180 ? h += 360 : h - c > 180 && (c += 360), f.push({ i: m.push(a(m) + "rotate(", null, n) - 2, x: lt(c, h) })) : h && m.push(a(m) + "rotate(" + h + n);
  }
  function d(c, h, m, f) {
    c !== h ? f.push({ i: m.push(a(m) + "skewX(", null, n) - 2, x: lt(c, h) }) : h && m.push(a(m) + "skewX(" + h + n);
  }
  function r(c, h, m, f, y, v) {
    if (c !== m || h !== f) {
      var I = y.push(a(y) + "scale(", null, ",", null, ")");
      v.push({ i: I - 4, x: lt(c, m) }, { i: I - 2, x: lt(h, f) });
    } else (m !== 1 || f !== 1) && y.push(a(y) + "scale(" + m + "," + f + ")");
  }
  return function(c, h) {
    var m = [], f = [];
    return c = e(c), h = e(h), o(c.translateX, c.translateY, h.translateX, h.translateY, m, f), s(c.rotate, h.rotate, m, f), d(c.skewX, h.skewX, m, f), r(c.scaleX, c.scaleY, h.scaleX, h.scaleY, m, f), c = h = null, function(y) {
      for (var v = -1, I = f.length, g; ++v < I; ) m[(g = f[v]).i] = g.x(y);
      return m.join("");
    };
  };
}
var Qd = eo(Kd, "px, ", "px)", "deg)"), Jd = eo(Xd, ", ", ")", ")"), Zd = 1e-12;
function Yn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function el(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function tl(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const il = (function e(t, i, n) {
  function a(o, s) {
    var d = o[0], r = o[1], c = o[2], h = s[0], m = s[1], f = s[2], y = h - d, v = m - r, I = y * y + v * v, g, l;
    if (I < Zd)
      l = Math.log(f / c) / t, g = function(k) {
        return [
          d + k * y,
          r + k * v,
          c * Math.exp(t * k * l)
        ];
      };
    else {
      var u = Math.sqrt(I), x = (f * f - c * c + n * I) / (2 * c * i * u), E = (f * f - c * c - n * I) / (2 * f * i * u), N = Math.log(Math.sqrt(x * x + 1) - x), R = Math.log(Math.sqrt(E * E + 1) - E);
      l = (R - N) / t, g = function(k) {
        var T = k * l, z = Yn(N), Q = c / (i * u) * (z * tl(t * T + N) - el(N));
        return [
          d + Q * y,
          r + Q * v,
          c * z / Yn(t * T + N)
        ];
      };
    }
    return g.duration = l * 1e3 * t / Math.SQRT2, g;
  }
  return a.rho = function(o) {
    var s = Math.max(1e-3, +o), d = s * s, r = d * d;
    return e(s, d, r);
  }, a;
})(Math.SQRT2, 2, 4);
var Lt = 0, Vt = 0, zt = 0, to = 1e3, Oi, Wt, Ri = 0, Et = 0, zi = 0, ii = typeof performance == "object" && performance.now ? performance : Date, io = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function vn() {
  return Et || (io(nl), Et = ii.now() + zi);
}
function nl() {
  Et = 0;
}
function Ni() {
  this._call = this._time = this._next = null;
}
Ni.prototype = no.prototype = {
  constructor: Ni,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? vn() : +i) + (t == null ? 0 : +t), !this._next && Wt !== this && (Wt ? Wt._next = this : Oi = this, Wt = this), this._call = e, this._time = i, on();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, on());
  }
};
function no(e, t, i) {
  var n = new Ni();
  return n.restart(e, t, i), n;
}
function al() {
  vn(), ++Lt;
  for (var e = Oi, t; e; )
    (t = Et - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Lt;
}
function Kn() {
  Et = (Ri = ii.now()) + zi, Lt = Vt = 0;
  try {
    al();
  } finally {
    Lt = 0, sl(), Et = 0;
  }
}
function ol() {
  var e = ii.now(), t = e - Ri;
  t > to && (zi -= t, Ri = e);
}
function sl() {
  for (var e, t = Oi, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : Oi = i);
  Wt = e, on(n);
}
function on(e) {
  if (!Lt) {
    Vt && (Vt = clearTimeout(Vt));
    var t = e - Et;
    t > 24 ? (e < 1 / 0 && (Vt = setTimeout(Kn, e - ii.now() - zi)), zt && (zt = clearInterval(zt))) : (zt || (Ri = ii.now(), zt = setInterval(ol, to)), Lt = 1, io(Kn));
  }
}
function Xn(e, t, i) {
  var n = new Ni();
  return t = t == null ? 0 : +t, n.restart((a) => {
    n.stop(), e(a + t);
  }, t, i), n;
}
var rl = yn("start", "end", "cancel", "interrupt"), dl = [], ao = 0, Qn = 1, sn = 2, _i = 3, Jn = 4, rn = 5, Ci = 6;
function qi(e, t, i, n, a, o) {
  var s = e.__transition;
  if (!s) e.__transition = {};
  else if (i in s) return;
  ll(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: a,
    // For context during callback.
    on: rl,
    tween: dl,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ao
  });
}
function xn(e, t) {
  var i = Ye(e, t);
  if (i.state > ao) throw new Error("too late; already scheduled");
  return i;
}
function Je(e, t) {
  var i = Ye(e, t);
  if (i.state > _i) throw new Error("too late; already running");
  return i;
}
function Ye(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function ll(e, t, i) {
  var n = e.__transition, a;
  n[t] = i, i.timer = no(o, 0, i.time);
  function o(c) {
    i.state = Qn, i.timer.restart(s, i.delay, i.time), i.delay <= c && s(c - i.delay);
  }
  function s(c) {
    var h, m, f, y;
    if (i.state !== Qn) return r();
    for (h in n)
      if (y = n[h], y.name === i.name) {
        if (y.state === _i) return Xn(s);
        y.state === Jn ? (y.state = Ci, y.timer.stop(), y.on.call("interrupt", e, e.__data__, y.index, y.group), delete n[h]) : +h < t && (y.state = Ci, y.timer.stop(), y.on.call("cancel", e, e.__data__, y.index, y.group), delete n[h]);
      }
    if (Xn(function() {
      i.state === _i && (i.state = Jn, i.timer.restart(d, i.delay, i.time), d(c));
    }), i.state = sn, i.on.call("start", e, e.__data__, i.index, i.group), i.state === sn) {
      for (i.state = _i, a = new Array(f = i.tween.length), h = 0, m = -1; h < f; ++h)
        (y = i.tween[h].value.call(e, e.__data__, i.index, i.group)) && (a[++m] = y);
      a.length = m + 1;
    }
  }
  function d(c) {
    for (var h = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(r), i.state = rn, 1), m = -1, f = a.length; ++m < f; )
      a[m].call(e, h);
    i.state === rn && (i.on.call("end", e, e.__data__, i.index, i.group), r());
  }
  function r() {
    i.state = Ci, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function Ei(e, t) {
  var i = e.__transition, n, a, o = !0, s;
  if (i) {
    t = t == null ? null : t + "";
    for (s in i) {
      if ((n = i[s]).name !== t) {
        o = !1;
        continue;
      }
      a = n.state > sn && n.state < rn, n.state = Ci, n.timer.stop(), n.on.call(a ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[s];
    }
    o && delete e.__transition;
  }
}
function cl(e) {
  return this.each(function() {
    Ei(this, e);
  });
}
function pl(e, t) {
  var i, n;
  return function() {
    var a = Je(this, e), o = a.tween;
    if (o !== i) {
      n = i = o;
      for (var s = 0, d = n.length; s < d; ++s)
        if (n[s].name === t) {
          n = n.slice(), n.splice(s, 1);
          break;
        }
    }
    a.tween = n;
  };
}
function ul(e, t, i) {
  var n, a;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Je(this, e), s = o.tween;
    if (s !== n) {
      a = (n = s).slice();
      for (var d = { name: t, value: i }, r = 0, c = a.length; r < c; ++r)
        if (a[r].name === t) {
          a[r] = d;
          break;
        }
      r === c && a.push(d);
    }
    o.tween = a;
  };
}
function ml(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = Ye(this.node(), i).tween, a = 0, o = n.length, s; a < o; ++a)
      if ((s = n[a]).name === e)
        return s.value;
    return null;
  }
  return this.each((t == null ? pl : ul)(i, e, t));
}
function In(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var a = Je(this, n);
    (a.value || (a.value = {}))[t] = i.apply(this, arguments);
  }), function(a) {
    return Ye(a, n).value[t];
  };
}
function oo(e, t) {
  var i;
  return (typeof t == "number" ? lt : t instanceof ti ? Gn : (i = ti(t)) ? (t = i, Gn) : Yd)(e, t);
}
function fl(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function hl(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function gl(e, t, i) {
  var n, a = i + "", o;
  return function() {
    var s = this.getAttribute(e);
    return s === a ? null : s === n ? o : o = t(n = s, i);
  };
}
function yl(e, t, i) {
  var n, a = i + "", o;
  return function() {
    var s = this.getAttributeNS(e.space, e.local);
    return s === a ? null : s === n ? o : o = t(n = s, i);
  };
}
function bl(e, t, i) {
  var n, a, o;
  return function() {
    var s, d = i(this), r;
    return d == null ? void this.removeAttribute(e) : (s = this.getAttribute(e), r = d + "", s === r ? null : s === n && r === a ? o : (a = r, o = t(n = s, d)));
  };
}
function vl(e, t, i) {
  var n, a, o;
  return function() {
    var s, d = i(this), r;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (s = this.getAttributeNS(e.space, e.local), r = d + "", s === r ? null : s === n && r === a ? o : (a = r, o = t(n = s, d)));
  };
}
function xl(e, t) {
  var i = Ui(e), n = i === "transform" ? Jd : oo;
  return this.attrTween(e, typeof t == "function" ? (i.local ? vl : bl)(i, n, In(this, "attr." + e, t)) : t == null ? (i.local ? hl : fl)(i) : (i.local ? yl : gl)(i, n, t));
}
function Il(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function wl(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function kl(e, t) {
  var i, n;
  function a() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && wl(e, o)), i;
  }
  return a._value = t, a;
}
function $l(e, t) {
  var i, n;
  function a() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && Il(e, o)), i;
  }
  return a._value = t, a;
}
function _l(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = Ui(e);
  return this.tween(i, (n.local ? kl : $l)(n, t));
}
function Cl(e, t) {
  return function() {
    xn(this, e).delay = +t.apply(this, arguments);
  };
}
function El(e, t) {
  return t = +t, function() {
    xn(this, e).delay = t;
  };
}
function Sl(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Cl : El)(t, e)) : Ye(this.node(), t).delay;
}
function Al(e, t) {
  return function() {
    Je(this, e).duration = +t.apply(this, arguments);
  };
}
function Ml(e, t) {
  return t = +t, function() {
    Je(this, e).duration = t;
  };
}
function Pl(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Al : Ml)(t, e)) : Ye(this.node(), t).duration;
}
function Tl(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Je(this, e).ease = t;
  };
}
function Ol(e) {
  var t = this._id;
  return arguments.length ? this.each(Tl(t, e)) : Ye(this.node(), t).ease;
}
function Rl(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Je(this, e).ease = i;
  };
}
function Nl(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Rl(this._id, e));
}
function Dl(e) {
  typeof e != "function" && (e = za(e));
  for (var t = this._groups, i = t.length, n = new Array(i), a = 0; a < i; ++a)
    for (var o = t[a], s = o.length, d = n[a] = [], r, c = 0; c < s; ++c)
      (r = o[c]) && e.call(r, r.__data__, c, o) && d.push(r);
  return new it(n, this._parents, this._name, this._id);
}
function Ll(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, a = i.length, o = Math.min(n, a), s = new Array(n), d = 0; d < o; ++d)
    for (var r = t[d], c = i[d], h = r.length, m = s[d] = new Array(h), f, y = 0; y < h; ++y)
      (f = r[y] || c[y]) && (m[y] = f);
  for (; d < n; ++d)
    s[d] = t[d];
  return new it(s, this._parents, this._name, this._id);
}
function Ul(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function zl(e, t, i) {
  var n, a, o = Ul(t) ? xn : Je;
  return function() {
    var s = o(this, e), d = s.on;
    d !== n && (a = (n = d).copy()).on(t, i), s.on = a;
  };
}
function ql(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Ye(this.node(), i).on.on(e) : this.each(zl(i, e, t));
}
function Bl(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Fl() {
  return this.on("end.remove", Bl(this._id));
}
function jl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = hn(e));
  for (var n = this._groups, a = n.length, o = new Array(a), s = 0; s < a; ++s)
    for (var d = n[s], r = d.length, c = o[s] = new Array(r), h, m, f = 0; f < r; ++f)
      (h = d[f]) && (m = e.call(h, h.__data__, f, d)) && ("__data__" in h && (m.__data__ = h.__data__), c[f] = m, qi(c[f], t, i, f, c, Ye(h, i)));
  return new it(o, this._parents, t, i);
}
function Vl(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Ua(e));
  for (var n = this._groups, a = n.length, o = [], s = [], d = 0; d < a; ++d)
    for (var r = n[d], c = r.length, h, m = 0; m < c; ++m)
      if (h = r[m]) {
        for (var f = e.call(h, h.__data__, m, r), y, v = Ye(h, i), I = 0, g = f.length; I < g; ++I)
          (y = f[I]) && qi(y, t, i, I, f, v);
        o.push(f), s.push(h);
      }
  return new it(o, s, t, i);
}
var Wl = oi.prototype.constructor;
function Gl() {
  return new Wl(this._groups, this._parents);
}
function Hl(e, t) {
  var i, n, a;
  return function() {
    var o = Dt(this, e), s = (this.style.removeProperty(e), Dt(this, e));
    return o === s ? null : o === i && s === n ? a : a = t(i = o, n = s);
  };
}
function so(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Yl(e, t, i) {
  var n, a = i + "", o;
  return function() {
    var s = Dt(this, e);
    return s === a ? null : s === n ? o : o = t(n = s, i);
  };
}
function Kl(e, t, i) {
  var n, a, o;
  return function() {
    var s = Dt(this, e), d = i(this), r = d + "";
    return d == null && (r = d = (this.style.removeProperty(e), Dt(this, e))), s === r ? null : s === n && r === a ? o : (a = r, o = t(n = s, d));
  };
}
function Xl(e, t) {
  var i, n, a, o = "style." + t, s = "end." + o, d;
  return function() {
    var r = Je(this, e), c = r.on, h = r.value[o] == null ? d || (d = so(t)) : void 0;
    (c !== i || a !== h) && (n = (i = c).copy()).on(s, a = h), r.on = n;
  };
}
function Ql(e, t, i) {
  var n = (e += "") == "transform" ? Qd : oo;
  return t == null ? this.styleTween(e, Hl(e, n)).on("end.style." + e, so(e)) : typeof t == "function" ? this.styleTween(e, Kl(e, n, In(this, "style." + e, t))).each(Xl(this._id, e)) : this.styleTween(e, Yl(e, n, t), i).on("end.style." + e, null);
}
function Jl(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Zl(e, t, i) {
  var n, a;
  function o() {
    var s = t.apply(this, arguments);
    return s !== a && (n = (a = s) && Jl(e, s, i)), n;
  }
  return o._value = t, o;
}
function ec(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Zl(e, t, i ?? ""));
}
function tc(e) {
  return function() {
    this.textContent = e;
  };
}
function ic(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function nc(e) {
  return this.tween("text", typeof e == "function" ? ic(In(this, "text", e)) : tc(e == null ? "" : e + ""));
}
function ac(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function oc(e) {
  var t, i;
  function n() {
    var a = e.apply(this, arguments);
    return a !== i && (t = (i = a) && ac(a)), t;
  }
  return n._value = e, n;
}
function sc(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, oc(e));
}
function rc() {
  for (var e = this._name, t = this._id, i = ro(), n = this._groups, a = n.length, o = 0; o < a; ++o)
    for (var s = n[o], d = s.length, r, c = 0; c < d; ++c)
      if (r = s[c]) {
        var h = Ye(r, t);
        qi(r, e, i, c, s, {
          time: h.time + h.delay + h.duration,
          delay: 0,
          duration: h.duration,
          ease: h.ease
        });
      }
  return new it(n, this._parents, e, i);
}
function dc() {
  var e, t, i = this, n = i._id, a = i.size();
  return new Promise(function(o, s) {
    var d = { value: s }, r = { value: function() {
      --a === 0 && o();
    } };
    i.each(function() {
      var c = Je(this, n), h = c.on;
      h !== e && (t = (e = h).copy(), t._.cancel.push(d), t._.interrupt.push(d), t._.end.push(r)), c.on = t;
    }), a === 0 && o();
  });
}
var lc = 0;
function it(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function ro() {
  return ++lc;
}
var et = oi.prototype;
it.prototype = {
  constructor: it,
  select: jl,
  selectAll: Vl,
  selectChild: et.selectChild,
  selectChildren: et.selectChildren,
  filter: Dl,
  merge: Ll,
  selection: Gl,
  transition: rc,
  call: et.call,
  nodes: et.nodes,
  node: et.node,
  size: et.size,
  empty: et.empty,
  each: et.each,
  on: ql,
  attr: xl,
  attrTween: _l,
  style: Ql,
  styleTween: ec,
  text: nc,
  textTween: sc,
  remove: Fl,
  tween: ml,
  delay: Sl,
  duration: Pl,
  ease: Ol,
  easeVarying: Nl,
  end: dc,
  [Symbol.iterator]: et[Symbol.iterator]
};
function cc(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var pc = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cc
};
function uc(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function mc(e) {
  var t, i;
  e instanceof it ? (t = e._id, e = e._name) : (t = ro(), (i = pc).time = vn(), e = e == null ? null : e + "");
  for (var n = this._groups, a = n.length, o = 0; o < a; ++o)
    for (var s = n[o], d = s.length, r, c = 0; c < d; ++c)
      (r = s[c]) && qi(r, e, t, c, s, i || uc(r, t));
  return new it(n, this._parents, e, t);
}
oi.prototype.interrupt = cl;
oi.prototype.transition = mc;
const pi = (e) => () => e;
function fc(e, {
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
var Kt = new tt(1, 0, 0);
tt.prototype;
function Yi(e) {
  e.stopImmediatePropagation();
}
function qt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function hc(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function gc() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Zn() {
  return this.__zoom || Kt;
}
function yc(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function bc() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function vc(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], a = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], s = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    a > n ? (n + a) / 2 : Math.min(0, n) || Math.max(0, a),
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s)
  );
}
function xc() {
  var e = hc, t = gc, i = vc, n = yc, a = bc, o = [0, 1 / 0], s = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, r = il, c = yn("start", "zoom", "end"), h, m, f, y = 500, v = 150, I = 0, g = 10;
  function l(O) {
    O.property("__zoom", Zn).on("wheel.zoom", T, { passive: !1 }).on("mousedown.zoom", z).on("dblclick.zoom", Q).filter(a).on("touchstart.zoom", C).on("touchmove.zoom", W).on("touchend.zoom touchcancel.zoom", j).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  l.transform = function(O, G, w, P) {
    var L = O.selection ? O.selection() : O;
    L.property("__zoom", Zn), O !== L ? N(O, G, w, P) : L.interrupt().each(function() {
      R(this, arguments).event(P).start().zoom(null, typeof G == "function" ? G.apply(this, arguments) : G).end();
    });
  }, l.scaleBy = function(O, G, w, P) {
    l.scaleTo(O, function() {
      var L = this.__zoom.k, _ = typeof G == "function" ? G.apply(this, arguments) : G;
      return L * _;
    }, w, P);
  }, l.scaleTo = function(O, G, w, P) {
    l.transform(O, function() {
      var L = t.apply(this, arguments), _ = this.__zoom, b = w == null ? E(L) : typeof w == "function" ? w.apply(this, arguments) : w, A = _.invert(b), S = typeof G == "function" ? G.apply(this, arguments) : G;
      return i(x(u(_, S), b, A), L, s);
    }, w, P);
  }, l.translateBy = function(O, G, w, P) {
    l.transform(O, function() {
      return i(this.__zoom.translate(
        typeof G == "function" ? G.apply(this, arguments) : G,
        typeof w == "function" ? w.apply(this, arguments) : w
      ), t.apply(this, arguments), s);
    }, null, P);
  }, l.translateTo = function(O, G, w, P, L) {
    l.transform(O, function() {
      var _ = t.apply(this, arguments), b = this.__zoom, A = P == null ? E(_) : typeof P == "function" ? P.apply(this, arguments) : P;
      return i(Kt.translate(A[0], A[1]).scale(b.k).translate(
        typeof G == "function" ? -G.apply(this, arguments) : -G,
        typeof w == "function" ? -w.apply(this, arguments) : -w
      ), _, s);
    }, P, L);
  };
  function u(O, G) {
    return G = Math.max(o[0], Math.min(o[1], G)), G === O.k ? O : new tt(G, O.x, O.y);
  }
  function x(O, G, w) {
    var P = G[0] - w[0] * O.k, L = G[1] - w[1] * O.k;
    return P === O.x && L === O.y ? O : new tt(O.k, P, L);
  }
  function E(O) {
    return [(+O[0][0] + +O[1][0]) / 2, (+O[0][1] + +O[1][1]) / 2];
  }
  function N(O, G, w, P) {
    O.on("start.zoom", function() {
      R(this, arguments).event(P).start();
    }).on("interrupt.zoom end.zoom", function() {
      R(this, arguments).event(P).end();
    }).tween("zoom", function() {
      var L = this, _ = arguments, b = R(L, _).event(P), A = t.apply(L, _), S = w == null ? E(A) : typeof w == "function" ? w.apply(L, _) : w, V = Math.max(A[1][0] - A[0][0], A[1][1] - A[0][1]), U = L.__zoom, F = typeof G == "function" ? G.apply(L, _) : G, H = r(U.invert(S).concat(V / U.k), F.invert(S).concat(V / F.k));
      return function(J) {
        if (J === 1) J = F;
        else {
          var le = H(J), Se = V / le[2];
          J = new tt(Se, S[0] - le[0] * Se, S[1] - le[1] * Se);
        }
        b.zoom(null, J);
      };
    });
  }
  function R(O, G, w) {
    return !w && O.__zooming || new k(O, G);
  }
  function k(O, G) {
    this.that = O, this.args = G, this.active = 0, this.sourceEvent = null, this.extent = t.apply(O, G), this.taps = 0;
  }
  k.prototype = {
    event: function(O) {
      return O && (this.sourceEvent = O), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(O, G) {
      return this.mouse && O !== "mouse" && (this.mouse[1] = G.invert(this.mouse[0])), this.touch0 && O !== "touch" && (this.touch0[1] = G.invert(this.touch0[0])), this.touch1 && O !== "touch" && (this.touch1[1] = G.invert(this.touch1[0])), this.that.__zoom = G, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(O) {
      var G = We(this.that).datum();
      c.call(
        O,
        this.that,
        new fc(O, {
          sourceEvent: this.sourceEvent,
          target: l,
          transform: this.that.__zoom,
          dispatch: c
        }),
        G
      );
    }
  };
  function T(O, ...G) {
    if (!e.apply(this, arguments)) return;
    var w = R(this, G).event(O), P = this.__zoom, L = Math.max(o[0], Math.min(o[1], P.k * Math.pow(2, n.apply(this, arguments)))), _ = gt(O);
    if (w.wheel)
      (w.mouse[0][0] !== _[0] || w.mouse[0][1] !== _[1]) && (w.mouse[1] = P.invert(w.mouse[0] = _)), clearTimeout(w.wheel);
    else {
      if (P.k === L) return;
      w.mouse = [_, P.invert(_)], Ei(this), w.start();
    }
    qt(O), w.wheel = setTimeout(b, v), w.zoom("mouse", i(x(u(P, L), w.mouse[0], w.mouse[1]), w.extent, s));
    function b() {
      w.wheel = null, w.end();
    }
  }
  function z(O, ...G) {
    if (f || !e.apply(this, arguments)) return;
    var w = O.currentTarget, P = R(this, G, !0).event(O), L = We(O.view).on("mousemove.zoom", S, !0).on("mouseup.zoom", V, !0), _ = gt(O, w), b = O.clientX, A = O.clientY;
    Ad(O.view), Yi(O), P.mouse = [_, this.__zoom.invert(_)], Ei(this), P.start();
    function S(U) {
      if (qt(U), !P.moved) {
        var F = U.clientX - b, H = U.clientY - A;
        P.moved = F * F + H * H > I;
      }
      P.event(U).zoom("mouse", i(x(P.that.__zoom, P.mouse[0] = gt(U, w), P.mouse[1]), P.extent, s));
    }
    function V(U) {
      L.on("mousemove.zoom mouseup.zoom", null), Md(U.view, P.moved), qt(U), P.event(U).end();
    }
  }
  function Q(O, ...G) {
    if (e.apply(this, arguments)) {
      var w = this.__zoom, P = gt(O.changedTouches ? O.changedTouches[0] : O, this), L = w.invert(P), _ = w.k * (O.shiftKey ? 0.5 : 2), b = i(x(u(w, _), P, L), t.apply(this, G), s);
      qt(O), d > 0 ? We(this).transition().duration(d).call(N, b, P, O) : We(this).call(l.transform, b, P, O);
    }
  }
  function C(O, ...G) {
    if (e.apply(this, arguments)) {
      var w = O.touches, P = w.length, L = R(this, G, O.changedTouches.length === P).event(O), _, b, A, S;
      for (Yi(O), b = 0; b < P; ++b)
        A = w[b], S = gt(A, this), S = [S, this.__zoom.invert(S), A.identifier], L.touch0 ? !L.touch1 && L.touch0[2] !== S[2] && (L.touch1 = S, L.taps = 0) : (L.touch0 = S, _ = !0, L.taps = 1 + !!h);
      h && (h = clearTimeout(h)), _ && (L.taps < 2 && (m = S[0], h = setTimeout(function() {
        h = null;
      }, y)), Ei(this), L.start());
    }
  }
  function W(O, ...G) {
    if (this.__zooming) {
      var w = R(this, G).event(O), P = O.changedTouches, L = P.length, _, b, A, S;
      for (qt(O), _ = 0; _ < L; ++_)
        b = P[_], A = gt(b, this), w.touch0 && w.touch0[2] === b.identifier ? w.touch0[0] = A : w.touch1 && w.touch1[2] === b.identifier && (w.touch1[0] = A);
      if (b = w.that.__zoom, w.touch1) {
        var V = w.touch0[0], U = w.touch0[1], F = w.touch1[0], H = w.touch1[1], J = (J = F[0] - V[0]) * J + (J = F[1] - V[1]) * J, le = (le = H[0] - U[0]) * le + (le = H[1] - U[1]) * le;
        b = u(b, Math.sqrt(J / le)), A = [(V[0] + F[0]) / 2, (V[1] + F[1]) / 2], S = [(U[0] + H[0]) / 2, (U[1] + H[1]) / 2];
      } else if (w.touch0) A = w.touch0[0], S = w.touch0[1];
      else return;
      w.zoom("touch", i(x(b, A, S), w.extent, s));
    }
  }
  function j(O, ...G) {
    if (this.__zooming) {
      var w = R(this, G).event(O), P = O.changedTouches, L = P.length, _, b;
      for (Yi(O), f && clearTimeout(f), f = setTimeout(function() {
        f = null;
      }, y), _ = 0; _ < L; ++_)
        b = P[_], w.touch0 && w.touch0[2] === b.identifier ? delete w.touch0 : w.touch1 && w.touch1[2] === b.identifier && delete w.touch1;
      if (w.touch1 && !w.touch0 && (w.touch0 = w.touch1, delete w.touch1), w.touch0) w.touch0[1] = this.__zoom.invert(w.touch0[0]);
      else if (w.end(), w.taps === 2 && (b = gt(b, this), Math.hypot(m[0] - b[0], m[1] - b[1]) < g)) {
        var A = We(this).on("dblclick.zoom");
        A && A.apply(this, arguments);
      }
    }
  }
  return l.wheelDelta = function(O) {
    return arguments.length ? (n = typeof O == "function" ? O : pi(+O), l) : n;
  }, l.filter = function(O) {
    return arguments.length ? (e = typeof O == "function" ? O : pi(!!O), l) : e;
  }, l.touchable = function(O) {
    return arguments.length ? (a = typeof O == "function" ? O : pi(!!O), l) : a;
  }, l.extent = function(O) {
    return arguments.length ? (t = typeof O == "function" ? O : pi([[+O[0][0], +O[0][1]], [+O[1][0], +O[1][1]]]), l) : t;
  }, l.scaleExtent = function(O) {
    return arguments.length ? (o[0] = +O[0], o[1] = +O[1], l) : [o[0], o[1]];
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
    return arguments.length ? (I = (O = +O) * O, l) : Math.sqrt(I);
  }, l.tapDistance = function(O) {
    return arguments.length ? (g = +O, l) : g;
  }, l;
}
function ea(e, t, i) {
  const n = t - e.x, a = i - e.y, o = e.w / 2, s = e.h / 2;
  if (n === 0 && a === 0) return { x: e.x, y: e.y };
  const d = 1 / Math.max(Math.abs(n) / o, Math.abs(a) / s);
  return { x: e.x + n * d, y: e.y + a * d };
}
function ta(e, t, i) {
  let n = ea(e, t.x, t.y), a = ea(t, e.x, e.y);
  if (i !== 0) {
    const o = Math.hypot(a.x - n.x, a.y - n.y) || 1, s = -(a.y - n.y) / o * i, d = (a.x - n.x) / o * i;
    n = { x: n.x + s, y: n.y + d }, a = { x: a.x + s, y: a.y + d };
  }
  return [n, a];
}
function lo(e, t, i = 0) {
  const n = t.x - e.x, a = t.y - e.y, o = 0.5;
  if (Math.abs(n) <= o || Math.abs(a) <= o) return ta(e, t, i);
  const s = n > 0 ? t.x - t.w / 2 - (e.x + e.w / 2) : e.x - e.w / 2 - (t.x + t.w / 2), d = a > 0 ? t.y - t.h / 2 - (e.y + e.h / 2) : e.y - e.h / 2 - (t.y + t.h / 2), r = Math.abs(n) >= Math.abs(a), c = () => {
    const m = { x: e.x + Math.sign(n) * e.w / 2, y: e.y + i }, f = { x: t.x - Math.sign(n) * t.w / 2, y: t.y + i }, y = (m.x + f.x) / 2 + i;
    return [m, { x: y, y: m.y }, { x: y, y: f.y }, f];
  }, h = () => {
    const m = { x: e.x + i, y: e.y + Math.sign(a) * e.h / 2 }, f = { x: t.x + i, y: t.y - Math.sign(a) * t.h / 2 }, y = (m.y + f.y) / 2 + i;
    return [m, { x: m.x, y }, { x: f.x, y }, f];
  };
  return s >= 0 && (r || d < 0) ? c() : d >= 0 ? h() : s >= 0 ? c() : ta(e, t, i);
}
function Ic(e, t, i) {
  const n = i.x - i.w / 2, a = i.x + i.w / 2, o = i.y - i.h / 2, s = i.y + i.h / 2;
  let d = 0, r = 1;
  const c = t.x - e.x, h = t.y - e.y;
  for (const [m, f] of [
    [-c, e.x - n],
    [c, a - e.x],
    [-h, e.y - o],
    [h, s - e.y]
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
function wc(e, t, i = 28) {
  const n = new Map(e.nodes.map((f) => [f.id, f])), a = (f) => {
    var v;
    const y = /* @__PURE__ */ new Set();
    for (let I = f; I; I = (v = n.get(I)) == null ? void 0 : v.parentId) y.add(I);
    return y;
  }, o = e.nodes.filter((f) => f.kind !== "area"), s = (f) => f.parentId ? Math.min(i, 6) : i, d = /* @__PURE__ */ new Map(), r = (f, y, v) => {
    let I = 0;
    for (let g = 0; g < f.length - 1; g++)
      for (const l of o) {
        if (y.has(l.id)) continue;
        const u = v ?? s(l);
        Ic(f[g], f[g + 1], { x: l.x, y: l.y, w: l.w + 2 * u, h: l.h + 2 * u }) && I++;
      }
    return I;
  }, c = (f) => {
    let y = 0;
    for (let v = 0; v < f.length - 1; v++) y += Math.hypot(f[v + 1].x - f[v].x, f[v + 1].y - f[v].y);
    return y;
  }, h = (f) => ({ x: f.x, y: f.y, w: f.w, h: f.h }), m = (f, y, v) => {
    const I = y - f.x, g = v - f.y, l = f.w / 2, u = f.h / 2;
    if (Math.abs(I) >= Math.abs(g) && Math.abs(g) <= u) return { x: f.x + Math.sign(I) * l, y: v };
    if (Math.abs(g) >= Math.abs(I) && Math.abs(I) <= l) return { x: y, y: f.y + Math.sign(g) * u };
    if (I === 0 && g === 0) return { x: f.x, y: f.y };
    const x = 1 / Math.max(Math.abs(I) / l, Math.abs(g) / u);
    return { x: f.x + I * x, y: f.y + g * x };
  };
  for (const f of e.edges) {
    const y = n.get(f.sourceId), v = n.get(f.targetId);
    if (!y || !v) continue;
    const I = /* @__PURE__ */ new Set([...a(y.id), ...a(v.id)]), g = { x: y.x, y: y.y }, l = { x: v.x, y: v.y }, u = t[f.id];
    let x;
    if (u) {
      if (u.length === 0) continue;
      const j = [
        m(y, u[0].x, u[0].y),
        ...u,
        m(v, u[u.length - 1].x, u[u.length - 1].y)
      ];
      if (x = r(j, I, 2), x === 0) continue;
    } else if (x = r(lo(h(y), h(v)), I), x === 0) continue;
    const E = [[{ x: l.x, y: g.y }], [{ x: g.x, y: l.y }]];
    for (const j of [0.5, 0.38, 0.62, 0.26, 0.74]) {
      const O = g.x + (l.x - g.x) * j, G = g.y + (l.y - g.y) * j;
      E.push([{ x: O, y: g.y }, { x: O, y: l.y }]), E.push([{ x: g.x, y: G }, { x: l.x, y: G }]);
    }
    const N = Math.min(g.x, l.x), R = Math.max(g.x, l.x), k = Math.min(g.y, l.y), T = Math.max(g.y, l.y);
    for (const j of o) {
      if (I.has(j.id)) continue;
      const O = s(j) + 8;
      j.x > N - j.w && j.x < R + j.w && (E.push([{ x: g.x, y: j.y - j.h / 2 - O }, { x: l.x, y: j.y - j.h / 2 - O }]), E.push([{ x: g.x, y: j.y + j.h / 2 + O }, { x: l.x, y: j.y + j.h / 2 + O }])), j.y > k - j.h && j.y < T + j.h && (E.push([{ x: j.x - j.w / 2 - O, y: g.y }, { x: j.x - j.w / 2 - O, y: l.y }]), E.push([{ x: j.x + j.w / 2 + O, y: g.y }, { x: j.x + j.w / 2 + O, y: l.y }]));
    }
    const z = 14;
    let Q = null, C = 1 / 0, W = 1 / 0;
    for (const j of E) {
      const O = [g, ...j, l], G = r(O, I), w = m(y, j[0].x, j[0].y), P = m(v, j[j.length - 1].x, j[j.length - 1].y), L = Math.hypot(j[0].x - w.x, j[0].y - w.y), _ = Math.hypot(j[j.length - 1].x - P.x, j[j.length - 1].y - P.y), b = (L < z ? 1 : 0) + (_ < z ? 1 : 0), A = G * 1e6 + b * 3e3 + c(O) + j.length * 40;
      A < W && (Q = j, W = A, C = G);
    }
    Q && C < x && d.set(f.id, Q.map((j) => ({ x: Math.round(j.x), y: Math.round(j.y) })));
  }
  return d;
}
const co = 12;
function ct(e, t = co) {
  return Math.round(e / t) * t;
}
function ia(e) {
  return {
    xs: [e.x - e.w / 2, e.x, e.x + e.w / 2],
    ys: [e.y - e.h / 2, e.y, e.y + e.h / 2]
  };
}
function kc(e, t, i) {
  const n = (i == null ? void 0 : i.grid) ?? co, a = (i == null ? void 0 : i.threshold) ?? 4;
  if ((i == null ? void 0 : i.enabled) === !1) return { x: e.x, y: e.y, guides: { v: [], h: [] } };
  const o = ia(e);
  let s = null, d = null;
  for (const r of t) {
    const c = ia(r);
    for (const h of c.xs)
      for (const m of o.xs) {
        const f = h - m;
        Math.abs(f) <= a && (!s || Math.abs(f) < Math.abs(s.delta)) && (s = { guide: h, delta: f });
      }
    for (const h of c.ys)
      for (const m of o.ys) {
        const f = h - m;
        Math.abs(f) <= a && (!d || Math.abs(f) < Math.abs(d.delta)) && (d = { guide: h, delta: f });
      }
  }
  return {
    x: s ? e.x + s.delta : ct(e.x, n),
    y: d ? e.y + d.delta : ct(e.y, n),
    guides: { v: s ? [s.guide] : [], h: d ? [d.guide] : [] }
  };
}
var $c = Object.defineProperty, _c = Object.getOwnPropertyDescriptor, ke = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? _c(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (a = (n ? s(t, i, a) : s(a)) || a);
  return n && a && $c(t, i, a), a;
};
function Cc(e, t, i, n) {
  const a = t.x - e.x, o = t.y - e.y, s = n.x - i.x, d = n.y - i.y, r = a * d - o * s;
  if (Math.abs(r) < 1e-9) return null;
  const c = ((i.x - e.x) * d - (i.y - e.y) * s) / r, h = ((i.x - e.x) * o - (i.y - e.y) * a) / r;
  return c <= 0.02 || c >= 0.98 || h <= 0.02 || h >= 0.98 ? null : { x: e.x + c * a, y: e.y + c * o, t: c };
}
function Ec(e, t, i) {
  const n = i.x - t.x, a = i.y - t.y, o = n * n + a * a || 1, s = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * a) / o)), d = t.x + s * n, r = t.y + s * a;
  return { dist: Math.hypot(e.x - d, e.y - r), t: s };
}
function Sc(e) {
  let t = 0;
  for (let n = 0; n < e.length - 1; n++) t += Math.hypot(e[n + 1].x - e[n].x, e[n + 1].y - e[n].y);
  let i = t / 2;
  for (let n = 0; n < e.length - 1; n++) {
    const a = Math.hypot(e[n + 1].x - e[n].x, e[n + 1].y - e[n].y);
    if (a >= i && a > 0) {
      const o = i / a;
      return { x: e[n].x + (e[n + 1].x - e[n].x) * o, y: e[n].y + (e[n + 1].y - e[n].y) * o };
    }
    i -= a;
  }
  return e[Math.floor(e.length / 2)];
}
function Ac(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let a = 0; a < e.length - 1; a++) {
    const o = e[a], s = e[a + 1], d = Math.hypot(s.x - o.x, s.y - o.y) || 1, r = (s.x - o.x) / d, c = (s.y - o.y) / d, h = t.map(([f, y]) => Cc(o, s, f, y)).filter((f) => f !== null).filter((f) => f.t * d > i + 2 && (1 - f.t) * d > i + 2).sort((f, y) => f.t - y.t);
    let m = -1 / 0;
    for (const f of h)
      f.t * d - i <= m + 2 || (n += ` L ${f.x - r * i} ${f.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${f.x + r * i} ${f.y + c * i}`, m = f.t * d + i);
    n += ` L ${s.x} ${s.y}`;
  }
  return n;
}
const Tt = {
  component: ee`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: ee`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  shield: ee`<path d="M6 0.5 L11 2.5 V6 C11 9 8.8 11 6 11.8 C3.2 11 1 9 1 6 V2.5 Z"></path>`,
  note: ee`<path d="M1.5 0.5 H10.5 V7.5 L7 11.5 H1.5 Z"></path><path d="M10.5 7.5 H7 V11.5"></path>`,
  area: ee`<rect x="0.5" y="1.5" width="11" height="9" rx="1" stroke-dasharray="2.4 1.8"></rect>`,
  entity: ee`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  // A value object: a rounded card (immutable value) with its fields stacked inside.
  "value-object": ee`<rect x="1.5" y="1.5" width="9" height="9" rx="2.6"></rect>
    <line x1="3.6" y1="4.6" x2="8.4" y2="4.6"></line>
    <line x1="3.6" y1="7.4" x2="8.4" y2="7.4"></line>`,
  // A field (attribute): a bullet and its value line — one row of a shape.
  field: ee`<circle cx="2.4" cy="6" r="1.3"></circle><line x1="5" y1="6" x2="11" y2="6"></line>`,
  // An operation: a rounded «play/gear» — a behaviour with input→output.
  operation: ee`<circle cx="6" cy="6" r="2.4"></circle>
    <path d="M6 0.8 V2.6 M6 9.4 V11.2 M0.8 6 H2.6 M9.4 6 H11.2" stroke-linecap="round"></path>`,
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
let xe = class extends Ve {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Kt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._guides = null, this._pendingLink = null, this._hoverNodeId = null, this._focusNodeId = null, this._focusNodes = /* @__PURE__ */ new Set(), this._focusEdges = /* @__PURE__ */ new Set(), this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
            const a = this.scene.nodes.filter((o) => this.selectedIds.includes(o.id)).map((o) => ({ id: o.id, kind: o.kind }));
            a.length && this.emit("delete-selection-requested", { items: a });
            return;
          }
          if (this._selectedWaypoint) {
            const a = this.scene.edges.find((o) => o.id === this._selectedWaypoint.edgeId);
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
    this._zoomBehavior = xc().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), We(e).call(this._zoomBehavior);
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
      this.selectedIds.filter((x) => this.scene.nodes.some((E) => E.id === x))
    );
    this.scene.nodes.some((x) => x.id === this.selectedId) && n.add(this.selectedId);
    const a = this.scene.edges.find((x) => x.id === this.selectedId) ?? null, o = n.size > 0 || a !== null, s = o ? this.scene.nodes.filter(
      (x) => n.has(x.id) || a !== null && (x.id === a.sourceId || x.id === a.targetId)
    ) : this.scene.nodes;
    if (!s.length) return;
    const d = this.fitInsets.left ?? 0, r = this.fitInsets.right ?? 0, c = this.fitInsets.top ?? 0, h = this.fitInsets.bottom ?? 0, m = Math.max(80, i.width - d - r), f = Math.max(80, i.height - c - h);
    let y = Math.min(...s.map((x) => x.x - x.w / 2)) - e, v = Math.max(...s.map((x) => x.x + x.w / 2)) + e, I = Math.min(...s.map((x) => x.y - x.h / 2)) - e, g = Math.max(...s.map((x) => x.y + x.h / 2)) + e;
    if (o)
      for (const x of this.scene.edges) {
        if (!(x.id === (a == null ? void 0 : a.id) || n.has(x.sourceId) && n.has(x.targetId))) continue;
        const N = this.edgePolyline(x);
        if (N)
          for (const R of N)
            y = Math.min(y, R.x - e), v = Math.max(v, R.x + e), I = Math.min(I, R.y - e), g = Math.max(g, R.y + e);
      }
    const l = Math.max(0.15, Math.min(m / (v - y), f / (g - I), 1.25)), u = Kt.translate(
      d + m / 2 - l * (y + v) / 2,
      c + f / 2 - l * (I + g) / 2
    ).scale(l);
    We(t).call(this._zoomBehavior.transform, u);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(We(t), e);
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
    for (let o = e.parentId; o; o = (n = this.scene.nodes.find((s) => s.id === o)) == null ? void 0 : n.parentId) {
      const s = this.scene.nodes.find((r) => r.id === o);
      if (!s) break;
      if (this._dragPos && this._dragPos.id === o)
        return { x: e.x + (this._dragPos.x - s.x), y: e.y + (this._dragPos.y - s.y) };
      const d = (a = this._dragGroup) == null ? void 0 : a.get(o);
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
      const n = this.scene.nodes.find((a) => a.id === e.parentId);
      if (n) {
        const a = this.nodePos(n), o = a.x - n.w / 2 + 10 + e.w / 2, s = a.x + n.w / 2 - 10 - e.w / 2, d = a.y - n.h / 2 + 34 + e.h / 2, r = a.y + n.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), s), i = Math.min(Math.max(i, d), r);
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
      const n = this.scene.nodes.find((a) => a.id === e);
      n != null && n.parentId && t.add(n.parentId);
      for (const a of this.scene.nodes) a.parentId === e && t.add(a.id);
      for (const a of this.scene.edges)
        (a.sourceId === e || a.targetId === e) && (i.add(a.id), t.add(a.sourceId), t.add(a.targetId));
    }
    this._focusNodes = t, this._focusEdges = i;
  }
  /** Topmost node at a client-space point (also used by palette drops). */
  nodeIdAtClient(e, t) {
    var n, a;
    const i = ((n = this.shadowRoot) == null ? void 0 : n.elementsFromPoint(e, t)) ?? [];
    for (const o of i) {
      const s = (a = o.closest) == null ? void 0 : a.call(o, "[data-node-id]");
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
    let a = null, o = 1 / 0;
    for (const s of this.scene.nodes) {
      if (s.kind === "area") continue;
      const d = this.nodePos(s), r = Math.max(Math.abs(n.x - d.x) - (s.w ?? 0) / 2, 0), c = Math.max(Math.abs(n.y - d.y) - (s.h ?? 0) / 2, 0), h = Math.hypot(r, c);
      h < o && (o = h, a = s.id);
    }
    return a && o * this._t.k <= i ? a : null;
  }
  /** Topmost edge at a client-space point — note threads can land on relations. */
  edgeIdAtClient(e, t) {
    var n, a;
    const i = ((n = this.shadowRoot) == null ? void 0 : n.elementsFromPoint(e, t)) ?? [];
    for (const o of i) {
      const s = (a = o.closest) == null ? void 0 : a.call(o, "[data-edge-id]");
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
    let a = !1;
    const o = new Set(this.selectedIds), s = o.has(t.id) && this.selectedIds.length > 1 ? this.scene.nodes.filter(
      (g) => o.has(g.id) && !(g.parentId && o.has(g.parentId))
    ) : t.kind === "area" ? this.areaCargo(t) : null, d = s ? new Map(s.map((g) => [g.id, this.nodePos(g)])) : null, r = (g) => (g.shiftKey || g.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !s || g.shiftKey && t.kind === "external-system" && !s, c = s ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, h = c !== null, m = c === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], f = () => {
      const g = [], l = c === "menu" ? this.scene.nodes.filter((u) => u.kind === "ui-app") : this.scene.nodes.filter((u) => u.id === (t.ownerId ?? t.parentId));
      for (const u of l) {
        const x = this.scene.nodes.filter((k) => (k.ownerId ?? k.parentId) === u.id && m.includes(k.kind ?? "") && k.id !== t.id).sort((k, T) => k.y - T.y), E = u.x - u.w / 2 + 10, N = u.x + u.w / 2 - 10;
        for (const k of x) g.push({ x1: E, x2: N, y: k.y - k.h / 2 - 3, appId: u.id, beforeId: k.id });
        const R = x[x.length - 1];
        g.push({
          x1: E,
          x2: N,
          y: R ? R.y + R.h / 2 + 3 : u.y - u.h / 2 + 34 + 8,
          appId: u.id,
          beforeId: null
        });
      }
      return g;
    }, y = (g) => {
      const l = this.nodeIdAt(g), u = l && l !== t.id ? this.scene.nodes.find((x) => x.id === l) : void 0;
      return u ? u.kind === "external-system" ? u.id : u.parentId ?? null : null;
    }, v = (g) => {
      if ((g.buttons & 1) === 0) {
        I(g);
        return;
      }
      const l = this.toScene(g), u = l.x - i.x, x = l.y - i.y;
      if (!(!a && Math.hypot(u, x) < 3 / this._t.k))
        if (a = !0, s && d) {
          const E = /* @__PURE__ */ new Map();
          for (const N of s) {
            const R = d.get(N.id), k = this.clampToParent(N, R.x + u, R.y + x);
            E.set(N.id, { x: k.x, y: k.y });
          }
          if (!g.altKey) {
            const N = E.get(t.id), R = { x: ct(N.x) - N.x, y: ct(N.y) - N.y };
            if (R.x !== 0 || R.y !== 0)
              for (const k of E.values())
                k.x += R.x, k.y += R.y;
          }
          this._dragGroup = E;
        } else if (h) {
          this._dragPos = { id: t.id, x: n.x + u, y: n.y + x }, this._menuSlots || (this._menuSlots = { slots: f(), active: null, nestRowId: null });
          const E = this.scene.nodes.filter(
            (R) => m.includes(R.kind ?? "") && R.id !== t.id && Math.abs(l.x - R.x) <= R.w / 2 + 8
          ), N = c === "menu" ? E.find((R) => Math.abs(l.y - R.y) < R.h * 0.28) : void 0;
          if (N)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: N.id }, this._hoverNodeId = N.id;
          else {
            let R = -1, k = 14;
            this._menuSlots.slots.forEach((T, z) => {
              if (l.x < T.x1 - 24 || l.x > T.x2 + 24) return;
              const Q = Math.abs(l.y - T.y);
              Q < k && (k = Q, R = z);
            }), this._menuSlots = { ...this._menuSlots, active: R >= 0 ? R : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else if (r(g))
          this._dragPos = { id: t.id, x: n.x + u, y: n.y + x }, this._hoverNodeId = y(g), this._guides = null;
        else {
          const E = this.clampToParent(t, n.x + u, n.y + x);
          if (g.altKey)
            this._dragPos = { id: t.id, x: E.x, y: E.y }, this._guides = null;
          else {
            const N = this.scene.nodes.filter((k) => {
              var T;
              if (k.id === t.id) return !1;
              for (let z = k.parentId; z; z = (T = this.scene.nodes.find((Q) => Q.id === z)) == null ? void 0 : T.parentId)
                if (z === t.id) return !1;
              return !0;
            }), R = kc({ ...E, w: t.w, h: t.h }, N, {
              threshold: 5 / this._t.k
            });
            this._dragPos = { id: t.id, x: R.x, y: R.y }, this._guides = R.guides.v.length || R.guides.h.length ? R.guides : null;
          }
          this._hoverNodeId = null;
        }
    }, I = (g) => {
      if (window.removeEventListener("pointermove", v), window.removeEventListener("pointerup", I), this._guides = null, a && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([l, u]) => ({ id: l, x: u.x, y: u.y }))
        });
      else if (a && this._dragPos && h) {
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
      } else if (a && this._dragPos) {
        if (t.kind === "value-object" || t.kind === "entity" || t.kind === "aggregate") {
          const l = this.nodeIdAt(g), u = l && l !== t.id ? this.scene.nodes.find((E) => E.id === l) : null, x = u ? this.scene.edges.some(
            (E) => E.kind === "containment" && E.sourceId === u.id && E.targetId === t.id
          ) : !1;
          if (((u == null ? void 0 : u.kind) === "field" || (u == null ? void 0 : u.kind) === "aggregate" && t.kind !== "aggregate") && !x) {
            this.emit("connect-requested", {
              sourceId: t.id,
              targetId: u.id,
              x: g.clientX,
              y: g.clientY
            }), this._dragPos = null, this._hoverNodeId = null;
            return;
          }
        }
        if (r(g)) {
          const l = y(g);
          if (g.ctrlKey && t.kind === "api") {
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
    window.addEventListener("pointermove", v), window.addEventListener("pointerup", I);
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
    const a = t.kind === "area", o = t.container && !t.parentId, s = a ? 30 : o ? 160 : 90, d = a ? 20 : o ? 90 : 30, r = { x: t.x, y: t.y, w: t.w, h: t.h }, c = o ? this.scene.nodes.filter((l) => l.parentId === t.id) : [], h = Math.min(...c.map((l) => l.x - l.w / 2)), m = Math.max(...c.map((l) => l.x + l.w / 2)), f = Math.min(...c.map((l) => l.y - l.h / 2)), y = Math.max(...c.map((l) => l.y + l.h / 2)), v = Vo(
      c.map((l) => ({ dx: l.x - r.x, dy: l.y - r.y, w: l.w, h: l.h })),
      { w: s, h: d }
    ), I = (l) => {
      if ((l.buttons & 1) === 0) {
        g();
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
      const x = l.altKey ? u : { x: ct(u.x), y: ct(u.y) }, E = r.x - i * r.w / 2, N = r.y - n * r.h / 2, R = i > 0 ? Math.max(x.x, E + s, c.length ? m + 10 : -1 / 0) : Math.min(x.x, E - s, c.length ? h - 10 : 1 / 0), k = n > 0 ? Math.max(x.y, N + d, c.length ? y + 10 : -1 / 0) : Math.min(x.y, N - d, c.length ? f - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (E + R) / 2,
        y: (N + k) / 2,
        w: Math.abs(R - E),
        h: Math.abs(k - N)
      };
    }, g = () => {
      window.removeEventListener("pointermove", I), window.removeEventListener("pointerup", g), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", I), window.addEventListener("pointerup", g);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t, i) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation();
    const n = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: n.x, y: n.y };
    const a = (s) => {
      if ((s.buttons & 1) === 0) {
        window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", o), this._pendingLink = null, this._hoverNodeId = null;
        return;
      }
      const d = this.toScene(s);
      this._pendingLink = { sourceId: t.id, x: d.x, y: d.y }, this._hoverNodeId = this.nodeIdAt(s);
    }, o = (s) => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", o);
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
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", o);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: a } = this.nodePos(e), o = t - n, s = i - a, d = e.w / 2, r = e.h / 2;
    if (o === 0 && s === 0) return { x: n, y: a };
    const c = 1 / Math.max(Math.abs(o) / d, Math.abs(s) / r);
    return { x: n + o * c, y: a + s * c };
  }
  /**
   * Border exit for a routed edge: when the first/last waypoint sits beside the
   * node (its perpendicular coordinate falls within the node's span), leave the
   * facing side aligned to it, so the end segment is horizontal/vertical — this
   * is what keeps ELK's and the auto-router's orthogonal routes orthogonal right
   * up to the box. Otherwise fall back to the plain centre-ray border point.
   */
  orthoBorderPoint(e, t, i) {
    const { x: n, y: a } = this.nodePos(e), o = t - n, s = i - a, d = e.w / 2, r = e.h / 2;
    return Math.abs(o) >= Math.abs(s) && Math.abs(s) <= r ? { x: n + Math.sign(o) * d, y: i } : Math.abs(s) >= Math.abs(o) && Math.abs(o) <= d ? { x: t, y: a + Math.sign(s) * r } : this.borderPoint(e, t, i);
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
      const h = e.targetId.slice(11), m = this.scene.edges.find((v) => v.id === h), f = m && m.id !== e.id ? this.edgePolyline(m) : null;
      if (!f || f.length < 2) return null;
      const y = Sc(f);
      return [this.borderPoint(t, y.x, y.y), y];
    }
    const i = this.scene.nodes.find((h) => h.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], a = this.nodePos(t), o = this.nodePos(i);
    if (!n.length)
      return lo(
        { x: a.x, y: a.y, w: t.w, h: t.h },
        { x: o.x, y: o.y, w: i.w, h: i.h },
        this.edgeOffset(e)
      );
    const s = n[0], d = n[n.length - 1], r = this.orthoBorderPoint(t, s.x, s.y), c = this.orthoBorderPoint(i, d.x, d.y);
    return [r, ...n, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    const n = t[i];
    let a = !1;
    const o = (d) => {
      if (!this._wpDrag) return;
      const r = this.toScene(d);
      if (!a && Math.hypot(r.x - n.x, r.y - n.y) < 4 / this._t.k) return;
      a = !0;
      const c = [...this._wpDrag.points];
      c[this._wpDrag.index] = r, this._wpDrag = { ...this._wpDrag, points: c };
    }, s = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", s), this._wpDrag && a && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", s);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: a } = Ec(t, e[n], e[n + 1]);
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
    let o = !1;
    const s = (r) => {
      if ((r.buttons & 1) === 0) {
        d();
        return;
      }
      const c = this.toScene(r);
      if (o) {
        if (this._wpDrag) {
          const h = [...this._wpDrag.points];
          h[a] = c, this._wpDrag = { ...this._wpDrag, points: h };
        }
      } else {
        if (Math.hypot(c.x - n.x, c.y - n.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const h = [...this.edgePoints[t.id] ?? []];
        h.splice(a, 0, c), this._selectedWaypoint = { edgeId: t.id, index: a }, this._wpDrag = { edgeId: t.id, points: h, index: a };
      }
    }, d = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", d), o && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
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
    return ee`
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
    const n = this.edgeColor(e), a = this.selectedId === e.id, o = a || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), s = Math.floor((t.length - 1) / 2), d = {
      x: (t[s].x + t[s + 1].x) / 2,
      y: (t[s].y + t[s + 1].y) / 2
    }, r = t.slice(1, -1), c = this.spotlighting && !this._focusEdges.has(e.id);
    return ee`
      <g data-edge-ink=${e.id} pointer-events="none" opacity=${e.dim ? 0.18 : c ? 0.1 : e.faint ? 0.4 : 1}>
        <path d=${Ac(t, i)}
              fill="none"
              stroke=${n} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashArray ?? (e.dashed ? "6 4" : "")}
              opacity="0.92"
              marker-start=${e.markerStart ? `url(#${e.markerStart}-${this.markerId(n)})` : e.kind === "contains" ? `url(#diamond-${this.markerId(n)})` : ""}
              marker-end=${e.markerEnd ? `url(#${e.markerEnd}-${this.markerId(n)})` : e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}></path>
        ${e.label ? ee`<text x=${d.x} y=${d.y - 6} text-anchor="middle"
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
        ${a ? r.map((h, m) => {
      var y;
      const f = ((y = this._selectedWaypoint) == null ? void 0 : y.edgeId) === e.id && this._selectedWaypoint.index === m;
      return ee`
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
    let n = 0, a = e.length;
    for (; n < a; ) {
      const o = n + a + 1 >> 1;
      this.measureLabel(`${e.slice(0, o)}…`, i) <= t ? n = o : a = o - 1;
    }
    return n > 0 ? `${e.slice(0, n)}…` : "…";
  }
  renderNode(e) {
    var v, I, g, l;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), a = this._hoverNodeId === e.id, o = this.spotlighting && !this._focusNodes.has(e.id), s = !!e.container, d = !!e.parentId, r = ((v = this._resize) == null ? void 0 : v.id) === e.id ? this._resize.w : e.w, c = ((I = this._resize) == null ? void 0 : I.id) === e.id ? this._resize.h : e.h, h = r / 2, m = c / 2, f = d && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label, y = e.derived ? `${e.tooltip ? `${e.tooltip} — ` : ""}Inferido: stub generado por el sistema (no declarado a mano)` : e.tooltip;
    return ee`
      <g data-node-id=${e.id}
         opacity=${e.dim ? 0.25 : o ? 0.16 : 1}
         transform="translate(${t}, ${i})${a ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (g = this._dragGroup) != null && g.has(e.id) ? "none" : "auto"}
         @pointerenter=${() => this.setFocusNode(e.id)}
         @pointerleave=${() => this.setFocusNode(null)}
         @pointerdown=${(u) => this.onNodePointerDown(u, e)}
         @dblclick=${(u) => {
      u.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? ee`<rect x=${-h - 4} y=${-m - 4} width=${r + 8} height=${c + 8}
                  rx=${d ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-h} y=${-m} width=${r} height=${c} rx=${d ? 6 : 10}
              style=${"fill: " + (e.fill ?? (e.kind === "note" ? "var(--modux-note-fill, #fef9c3)" : "var(--modux-node-fill, #ffffff)")) + "; stroke: " + (a || n ? "var(--modux-primary, #2563eb)" : e.stroke ?? "var(--modux-node-stroke, #94a3b8)")}
              stroke-width=${n || a ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${y ? ee`<title>${y}</title>` : ""}
        </rect>
        ${e.derived ? ee`<text x=${-h + 5} y=${-m + 13} font-size="10" style="fill: var(--modux-derive, #a855f7)"
                  pointer-events="none">✦</text>` : ""}
        ${e.badge ? ee`<text x=${-h} y=${-m - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  style="fill: var(--modux-text-dim, #64748b)" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? ee`<g transform="translate(${h - 13}, ${-m + 13})"
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
        ${e.symbol && Tt[e.symbol] && (!d || s) ? ee`<g transform="translate(${h - (e.collapsible ? 37 : 17)}, ${-m + 5})" fill="none"
                  style=${"stroke: " + (e.stroke ?? "var(--modux-node-stroke, #64748b)")}
                  stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${Tt[e.symbol]}
              </g>` : ""}
        ${d && !s && e.symbol && Tt[e.symbol] ? ee`<g transform="translate(${-h + 8}, -6)" fill="none"
                  style=${"stroke: " + (e.stroke ?? "var(--modux-node-stroke, #64748b)")}
                  stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${Tt[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? ee`
              <foreignObject x=${-h + 6} y=${s ? -m + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${s ? "left" : "center"}; border: 1px solid var(--modux-primary, #2563eb); border-radius: 4px; padding: 3px; background: var(--modux-input-bg, #ffffff); color: var(--modux-text, #334155);"
                  .value=${e.label}
                  @pointerdown=${(u) => u.stopPropagation()}
                  @keydown=${(u) => {
      u.stopPropagation(), u.key === "Enter" && this.commitRename(e, u.target.value), u.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(u) => this.commitRename(e, u.target.value)}
                />
              </foreignObject>` : d && !s ? ee`<text x=${-h + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" style="fill: var(--modux-text, #1e293b)" pointer-events="none">${f}</text>` : s ? ee`<text x=${-h + 12} y=${-m + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" style="fill: var(--modux-text, #1e293b)">${e.label}</text>` : e.kind === "area" ? "" : ee`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" style="fill: var(--modux-text, #1e293b)">${this.fitLabel(e.label, r - 16)}</text>`}
        ${s ? ee`<line x1=${-h + 8} y1=${-m + 28} x2=${h - 8} y2=${-m + 28}
                style="stroke: var(--modux-border, #e2e8f0)" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (d ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-system" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "note" || e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "boundedContext" || e.kind === "ui" || e.kind === "ui-app" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item" || // Archi style: the ex-nested kinds are free boxes now — same handles.
    e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "read-model" || e.kind === "query-service" || e.kind === "scheduled-trigger" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api-impl" || e.kind === "service") ? [
      [h, 0],
      [-h, 0],
      [0, m],
      [0, -m]
    ].map(
      ([u, x]) => ee`
                <circle data-handle cx=${u} cy=${x} r="6"
                        style="fill: var(--modux-primary, #2563eb); stroke: var(--modux-surface, #ffffff)"
                        stroke-width="1.5"
                        @pointerdown=${(E) => this.onHandlePointerDown(E, e)}>
                  <title>${d ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "note" ? "Arrastra hasta cualquier elemento o relación: la nota quedará atada con un hilo" : e.kind === "service" ? "Arrastra hasta un módulo (o su contexto) para desplegarlo en este servicio" : e.kind === "boundedContext" ? "Arrastra hasta otro contexto (elige el patrón DDD), un IdP (identidad) o cualquier elemento (relación ArchiMate)" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${n && this.connectable && ((l = e.extraHandles) != null && l.length) ? e.extraHandles.map(
      (u, x) => ee`
                <g transform="translate(${-h + 24 + x * 20}, ${-m})">
                  <circle data-handle r="7" style=${"fill: " + u.color + "; stroke: var(--modux-surface, #ffffff)"}
                          stroke-width="1.5"
                          @pointerdown=${(E) => this.onHandlePointerDown(E, e, u.kind)}>
                    <title>${u.title}</title>
                  </circle>
                  <circle r="2.4" style="fill: var(--modux-surface, #ffffff)" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${(s || e.resizable) && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([u, x]) => ee`
                <rect data-resize x=${u * h - 6.5} y=${x * m - 6.5} width="13" height="13" rx="2.5"
                      style="fill: var(--modux-primary, #2563eb); stroke: var(--modux-surface, #ffffff)"
                      stroke-width="1.5"
                      style="cursor: ${u * x > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(E) => this.onResizePointerDown(E, e, u, x)}>
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
            style="stroke: var(--modux-primary, #2563eb)" stroke-width="2" stroke-dasharray="4 4" pointer-events="none"></line>
    `;
  }
  // ---- rubber-band multi-selection ------------------------------------------
  startRubberBand(e) {
    const t = this.toScene(e);
    this._rubber = { a: t, b: t };
    let i = !1;
    const n = () => {
      window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", n), this._rubber = null;
    }, a = (s) => {
      if ((s.buttons & 1) === 0) {
        n();
        return;
      }
      const d = this.toScene(s);
      !i && Math.hypot(d.x - t.x, d.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: d });
    }, o = () => {
      if (window.removeEventListener("pointermove", a), window.removeEventListener("pointerup", o), window.removeEventListener("pointercancel", n), i && this._rubber) {
        const { a: s, b: d } = this._rubber, r = Math.min(s.x, d.x), c = Math.max(s.x, d.x), h = Math.min(s.y, d.y), m = Math.max(s.y, d.y), f = this.scene.nodes.filter((y) => {
          const v = this.nodePos(y);
          return v.x >= r && v.x <= c && v.y >= h && v.y <= m;
        }).map((y) => y.id);
        this.emit("nodes-boxed", { ids: f });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", a), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", n);
  }
  renderRubber() {
    if (!this._rubber) return ee``;
    const { a: e, b: t } = this._rubber;
    return ee`
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
    const i = Math.min(...t.map((s) => s.x - s.w / 2)) - e, n = Math.max(...t.map((s) => s.x + s.w / 2)) + e, a = Math.min(...t.map((s) => s.y - s.h / 2)) - e, o = Math.max(...t.map((s) => s.y + s.h / 2)) + e;
    return { minX: i, minY: a, w: n - i, h: o - a };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), a = this._t.k, o = Kt.translate(n.width / 2 - a * e, n.height / 2 - a * t).scale(a);
    We(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), a = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(a, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return $``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), a = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, s = (0 - this._t.y) / this._t.k, d = a.width / this._t.k, r = a.height / this._t.k;
    return $`
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
      var h, m;
      (m = (h = c.currentTarget).hasPointerCapture) != null && m.call(h, c.pointerId) && this.onMinimapPointer(c, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((c) => {
      const h = this.nodePos(c);
      return ee`<rect
              x=${(h.x - c.w / 2 - e.minX) * n}
              y=${(h.y - c.h / 2 - e.minY) * n}
              width=${Math.max(2, c.w * n)}
              height=${Math.max(2, c.h * n)}
              rx="1" style=${"fill: " + (c.fill ?? "var(--modux-border, #e2e8f0)") + "; stroke: var(--modux-node-stroke, #94a3b8)"}
              stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * n}
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
    const e = [...new Set(this.scene.edges.map((a) => this.edgeColor(a)))], t = [], i = [], n = [];
    return this.scene.edges.forEach((a) => {
      const o = this.edgePolyline(a);
      if (o) {
        i.push(this.renderEdgeHit(a, o)), n.push(this.renderEdgeInk(a, o, [...t]));
        for (let s = 0; s < o.length - 1; s++) t.push([o[s], o[s + 1]]);
      }
    }), $`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(a) => {
      const o = a.target;
      o.closest("[data-node-id]") || o.closest("[data-edge-id]") || this._spaceDown || a.button !== 0 || (a.buttons & 1) !== 0 && this.startRubberBand(a);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" style="fill: var(--modux-dots, #e2e8f0)"></circle>
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
          ${this._menuSlots ? ee`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (a, o) => ee`
                    <line x1=${a.x1} y1=${a.y} x2=${a.x2} y2=${a.y}
                          stroke=${o === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${o === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${o === this._menuSlots.active ? ee`<circle cx=${a.x1} cy=${a.y} r="3.5" fill="#0284c7"></circle>
                          <circle cx=${a.x2} cy=${a.y} r="3.5" fill="#0284c7"></circle>` : ""}`
    )}
              </g>` : ""}
          ${this._guides ? ee`
                ${this._guides.v.map(
      (a) => ee`<line x1=${a} y1="-100000" x2=${a} y2="100000"
                        style="stroke: var(--modux-guide, #ec4899)" stroke-width=${1 / this._t.k} pointer-events="none"></line>`
    )}
                ${this._guides.h.map(
      (a) => ee`<line x1="-100000" y1=${a} x2="100000" y2=${a}
                        style="stroke: var(--modux-guide, #ec4899)" stroke-width=${1 / this._t.k} pointer-events="none"></line>`
    )}
              ` : ""}
          ${this.renderPendingLink()}
          ${this.renderRubber()}
        </g>
        ${this.scene.nodes.length === 0 ? ee`<text x="50%" y="45%" text-anchor="middle" font-size="15" style="fill: var(--modux-text-faint, #94a3b8)"
                    font-family="ui-sans-serif, system-ui" pointer-events="none">
                  Lienzo vacío — arrastra elementos de la paleta o crea algo nuevo para empezar
                </text>` : ""}
      </svg>
      ${this.renderMinimap()}
    `;
  }
};
xe.styles = nt`
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
], xe.prototype, "scene", 2);
ke([
  de({ attribute: !1 })
], xe.prototype, "selectedId", 2);
ke([
  de({ attribute: !1 })
], xe.prototype, "selectedIds", 2);
ke([
  de({ type: Boolean })
], xe.prototype, "connectable", 2);
ke([
  de({ attribute: !1 })
], xe.prototype, "edgePoints", 2);
ke([
  B()
], xe.prototype, "_t", 2);
ke([
  B()
], xe.prototype, "_dragPos", 2);
ke([
  B()
], xe.prototype, "_menuSlots", 2);
ke([
  B()
], xe.prototype, "_dragGroup", 2);
ke([
  B()
], xe.prototype, "_guides", 2);
ke([
  B()
], xe.prototype, "_pendingLink", 2);
ke([
  B()
], xe.prototype, "_hoverNodeId", 2);
ke([
  B()
], xe.prototype, "_focusNodeId", 2);
ke([
  B()
], xe.prototype, "_editingId", 2);
ke([
  B()
], xe.prototype, "_spaceDown", 2);
ke([
  B()
], xe.prototype, "_wpDrag", 2);
ke([
  B()
], xe.prototype, "_selectedWaypoint", 2);
ke([
  B()
], xe.prototype, "_resize", 2);
ke([
  B()
], xe.prototype, "_rubber", 2);
ke([
  de({ attribute: !1 })
], xe.prototype, "fitInsets", 2);
xe = ke([
  mt("modux-canvas")
], xe);
const po = nt`
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
`, se = {
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
function ge(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const At = (e) => e.trim().toLowerCase();
function Mc(e, t, i = /* @__PURE__ */ new Set(), n = !1) {
  var C, W, j, O, G;
  const a = { nodes: /* @__PURE__ */ new Map(), edges: [] }, o = new Map(e.boundedContexts.map((w) => [w.id, w.name])), s = e.boundedContexts.flatMap(
    (w) => (w.useCases ?? []).map((P) => ({ ...P, boundedContextId: w.id }))
  ), d = new Set(s.map((w) => w.id)), r = e.aggregates ?? [], c = new Set(
    e.boundedContexts.flatMap((w) => (w.domainServices ?? []).map((P) => P.id))
  ), h = e.boundedContexts.flatMap(
    (w) => (w.domainEvents ?? []).map((P) => ({ ...P, boundedContextId: w.id, application: !1 }))
  ), m = e.boundedContexts.flatMap(
    (w) => (w.applicationEvents ?? []).map((P) => ({ ...P, boundedContextId: w.id, application: !0 }))
  ), f = e.boundedContexts.flatMap(
    (w) => (w.readModels ?? []).map((P) => ({ ...P, boundedContextId: w.id }))
  );
  for (const w of s)
    Oe(a, {
      id: w.id,
      label: w.name,
      x: 0,
      y: 0,
      w: se.command.w,
      h: se.command.h,
      kind: "use-case",
      symbol: w.policy ? "flow" : "gear",
      fill: w.policy ? se.policy.fill : se.command.fill,
      stroke: w.policy ? se.policy.stroke : se.command.stroke,
      badge: w.policy ? "POLICY" : "COMANDO",
      tooltip: w.policy ? `${w.name} — policy de ${o.get(w.boundedContextId) ?? w.boundedContextId} (reacción, no caso de negocio)` : `${w.name} — caso de uso de ${o.get(w.boundedContextId) ?? w.boundedContextId}`
    });
  for (const w of s) {
    const P = w.steps ?? [];
    if (!P.length) continue;
    const L = a.nodes.get(w.id), _ = n || i.has(w.id);
    L && (L.collapsible = !0, L.collapsed = !_), _ && P.forEach((b, A) => {
      Oe(a, {
        id: b.id,
        label: `${A + 1}. ${b.name || b.type || "paso"}`,
        x: 0,
        y: 0,
        w: se.command.w,
        h: 30,
        kind: "use-case-step",
        symbol: "gear",
        fill: "#eff6ff",
        stroke: "#1d4ed8",
        dashed: !!b.customCodeId,
        ownerId: w.id,
        tooltip: `Paso de ${w.name}${b.customCodeId ? " — delega en código a mano" : ""} — arrastra su asa hasta un CODE para delegar en él`
      }), ge(a, {
        id: `esstep:${A === 0 ? w.id : P[A - 1].id}->${b.id}`,
        sourceId: A === 0 ? w.id : P[A - 1].id,
        targetId: b.id,
        kind: "es-step",
        color: "#94a3b8",
        dashed: !0,
        arrow: !0,
        tooltip: `pipeline de ${w.name}`
      });
    });
  }
  for (const w of e.customCodes ?? [])
    Oe(a, {
      id: w.id,
      label: w.name,
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
      tooltip: `${w.name} — código a mano: los pasos Custom delegan en él`
    });
  for (const w of s)
    for (const P of w.steps ?? []) {
      if (!P.customCodeId) continue;
      const L = !a.nodes.has(P.id), _ = L ? w.id : P.id;
      L && a.edges.some((b) => b.kind === "es-custom" && b.sourceId === _ && b.targetId === P.customCodeId) || ge(a, {
        id: `escc:${P.id}`,
        sourceId: _,
        targetId: P.customCodeId,
        kind: "es-custom",
        color: "#0f172a",
        dashed: !0,
        arrow: !0,
        tooltip: L ? `Un paso plegado de ${w.name} delega en este código — expande el comando para verlo` : "El paso delega en código a mano — Supr lo desconecta"
      });
    }
  for (const w of r)
    Oe(a, {
      id: w.id,
      label: w.name,
      x: 0,
      y: 0,
      w: se.aggregate.w,
      h: se.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: se.aggregate.fill,
      stroke: se.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${w.name} — agregado de ${o.get(w.boundedContextId) ?? w.boundedContextId}`
    });
  const y = /* @__PURE__ */ new Map();
  for (const w of [...h, ...m])
    Oe(a, {
      id: w.id,
      label: w.name,
      x: 0,
      y: 0,
      w: se.event.w,
      h: se.event.h,
      kind: w.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: se.event.fill,
      stroke: se.event.stroke,
      badge: w.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${w.name} — evento de ${o.get(w.boundedContextId) ?? w.boundedContextId}`
    }), y.set(At(w.name), w.id);
  const v = (w) => {
    if (!w || !w.trim()) return null;
    const P = y.get(At(w));
    if (P) return P;
    const L = `evname:${At(w)}`;
    return Oe(a, {
      id: L,
      label: w,
      x: 0,
      y: 0,
      w: se.event.w,
      h: se.event.h,
      kind: "event-name",
      symbol: "event",
      fill: se.event.fill,
      stroke: se.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${w} — referenciado por nombre, sin evento declarado en el catálogo`
    }), L;
  }, I = (w) => {
    const P = f.find((_) => _.id === w.id) ?? f.find((_) => w.name && At(_.name) === At(w.name)), L = (P == null ? void 0 : P.id) ?? (w.id || (w.name ? `rm:${At(w.name)}` : null));
    return L ? (Oe(a, {
      id: L,
      label: (P == null ? void 0 : P.name) ?? w.name ?? L,
      x: 0,
      y: 0,
      w: se.readModel.w,
      h: se.readModel.h,
      kind: P ? "read-model" : "derived-read-model",
      fill: se.readModel.fill,
      stroke: se.readModel.stroke,
      dashed: !P,
      badge: "READ MODEL"
    }), L) : null;
  };
  for (const w of e.actorUses ?? []) {
    if (!d.has(w.targetId)) continue;
    const P = (e.actors ?? []).find((L) => L.id === w.actorId);
    P && (Oe(a, {
      id: P.id,
      label: P.name,
      x: 0,
      y: 0,
      w: se.actor.w,
      h: se.actor.h,
      kind: "actor",
      symbol: "person",
      fill: se.actor.fill,
      stroke: se.actor.stroke,
      badge: "ACTOR"
    }), ge(a, {
      id: `es-actor:${P.id}->${w.targetId}`,
      sourceId: P.id,
      targetId: w.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const w of e.aiAgents ?? []) {
    const P = (e.agentUses ?? []).filter((S) => S.agentId === w.id), L = (e.agentExternalUses ?? []).filter((S) => S.agentId === w.id), _ = (e.agentRags ?? []).filter((S) => S.agentId === w.id), b = (e.agentMcpUses ?? []).filter((S) => S.agentId === w.id), A = (e.agentGatewayUses ?? []).some((S) => S.agentId === w.id) || (e.agentApiOpUses ?? []).some((S) => S.agentId === w.id) || (e.agentQueryUses ?? []).some((S) => S.agentId === w.id) || (e.agentDelegations ?? []).some((S) => S.agentId === w.id) || (e.agentTriggers ?? []).some((S) => S.agentId === w.id);
    if (!(!P.length && !L.length && !_.length && !b.length && !A)) {
      Oe(a, {
        id: w.id,
        label: w.name,
        x: 0,
        y: 0,
        w: se.actor.w,
        h: se.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${w.name} — agente de IA (consume por MCP)`
      });
      for (const S of P)
        d.has(S.useCaseId) && ge(a, {
          id: `es-agent:${w.id}->${S.useCaseId}`,
          sourceId: w.id,
          targetId: S.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const S of L) {
        const V = e.externalSystems.find(
          (F) => (F.useCases ?? []).some((H) => H.id === S.externalUseCaseId)
        );
        if (!V) continue;
        const U = (C = (V.useCases ?? []).find((F) => F.id === S.externalUseCaseId)) == null ? void 0 : C.name;
        Oe(a, {
          id: V.id,
          label: V.name,
          x: 0,
          y: 0,
          w: se.external.w,
          h: se.external.h,
          kind: "external-system",
          symbol: "component",
          fill: se.external.fill,
          stroke: se.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ge(a, {
          id: `es-agentx:${w.id}->${S.externalUseCaseId}`,
          sourceId: w.id,
          targetId: V.id,
          kind: "es-agent-external",
          label: U,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: U ? `Llama a ${U} del sistema externo` : void 0
        });
      }
      for (const S of b) {
        const V = e.externalSystems.find(
          (F) => (F.mcpServers ?? []).some((H) => H.id === S.mcpServerId)
        );
        if (!V) continue;
        const U = (W = (V.mcpServers ?? []).find((F) => F.id === S.mcpServerId)) == null ? void 0 : W.name;
        Oe(a, {
          id: V.id,
          label: V.name,
          x: 0,
          y: 0,
          w: se.external.w,
          h: se.external.h,
          kind: "external-system",
          symbol: "component",
          fill: se.external.fill,
          stroke: se.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ge(a, {
          id: `es-agentmcp:${w.id}->${S.mcpServerId}`,
          sourceId: w.id,
          targetId: V.id,
          kind: "es-agent-mcp",
          label: U,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: U ? `Consume las herramientas del servidor MCP ${U}` : void 0
        });
      }
      for (const S of _) {
        const V = (e.rags ?? []).find((U) => U.id === S.ragId);
        if (V) {
          Oe(a, {
            id: V.id,
            label: V.name,
            x: 0,
            y: 0,
            w: se.readModel.w,
            h: se.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${V.name} — base de conocimiento (retrieval)`
          }), ge(a, {
            id: `es-agrag:${w.id}->${V.id}`,
            sourceId: w.id,
            targetId: V.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const U of V.sourceReadModelIds ?? []) {
            const F = I({ id: U });
            F && ge(a, {
              id: `es-ragsrc:${V.id}->${F}`,
              sourceId: F,
              targetId: V.id,
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
  const g = (w) => {
    const P = e.externalSystems.find((L) => L.id === w);
    return P ? (Oe(a, {
      id: P.id,
      label: P.name,
      x: 0,
      y: 0,
      w: se.external.w,
      h: se.external.h,
      kind: "external-system",
      symbol: "component",
      fill: se.external.fill,
      stroke: se.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), P.id) : null;
  };
  for (const w of e.externalCalls ?? []) {
    const P = g(w.externalSystemId);
    !P || !d.has(w.useCaseId) || ge(a, {
      id: `es-extin:${P}->${w.useCaseId}`,
      sourceId: P,
      targetId: w.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const w of e.externalUseCaseCalls ?? []) {
    if (!d.has(w.sourceId)) continue;
    const P = e.externalSystems.find(
      (b) => (b.useCases ?? []).some((A) => A.id === w.targetId)
    ), L = P ? g(P.id) : null;
    if (!L) continue;
    const _ = (j = ((P == null ? void 0 : P.useCases) ?? []).find((b) => b.id === w.targetId)) == null ? void 0 : j.name;
    ge(a, {
      id: `es-extout:${w.sourceId}->${w.targetId}`,
      sourceId: w.sourceId,
      targetId: L,
      kind: "es-command-external",
      label: _,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: _ ? `Llama a ${_} del sistema externo` : void 0
    });
  }
  for (const w of e.aggregateCalls ?? [])
    !d.has(w.sourceId) || !a.nodes.has(w.targetId) || ge(a, {
      id: `es-write:${w.sourceId}->${w.targetId}`,
      sourceId: w.sourceId,
      targetId: w.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const l = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const w of l)
    !a.nodes.has(w.domainEventId) || !(a.nodes.has(w.sourceId) && (d.has(w.sourceId) || r.some((L) => L.id === w.sourceId) || c.has(w.sourceId))) || ge(a, {
      id: `es-emit:${w.sourceId}->${w.domainEventId}`,
      sourceId: w.sourceId,
      targetId: w.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const u = (w, P, L, _, b, A) => (Oe(a, {
    id: w,
    label: P,
    x: 0,
    y: 0,
    w: se.policy.w,
    h: se.policy.h,
    kind: L,
    symbol: "flow",
    fill: se.policy.fill,
    stroke: se.policy.stroke,
    badge: _,
    tooltip: b
  }), w), x = (w, P) => {
    const L = v(w);
    L && ge(a, {
      id: `es-trigger:${L}->${P}`,
      sourceId: L,
      targetId: P,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, E = (w, P) => {
    !P || !d.has(P) || ge(a, {
      id: `es-invoke:${w}->${P}`,
      sourceId: w,
      targetId: P,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const w of e.subscriptions ?? []) {
    const P = u(
      w.id,
      w.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${w.name}${w.eventName ? ` — reacciona a ${w.eventName}` : ""}${w.consumerGroup ? ` · grupo ${w.consumerGroup}` : ""}`
    );
    x(w.eventName, P);
    for (const L of w.actions ?? []) {
      if (L.type === "CallUseCase" && E(P, L.useCaseId), L.type === "StartSaga" && L.sagaId) {
        const _ = `saga:${L.sagaId}`;
        u(_, L.sagaId, "saga", "SAGA"), ge(a, {
          id: `es-saga:${P}->${_}`,
          sourceId: P,
          targetId: _,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (L.type === "UpdateProjection" && L.projectionId) {
        const _ = (e.projections ?? []).find((b) => b.id === L.projectionId);
        _ && ge(a, {
          id: `es-feeds:${P}->${_.id}`,
          sourceId: P,
          targetId: _.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const w of e.projections ?? []) {
    const P = u(
      w.id,
      w.name,
      "projection",
      "PROYECCIÓN",
      `${w.name}${w.readModelName ? ` — materializa ${w.readModelName}` : ""}`
    );
    for (const b of w.handledEventIds) {
      const A = a.nodes.has(b) ? b : null;
      A && ge(a, {
        id: `es-trigger:${A}->${P}`,
        sourceId: A,
        targetId: P,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    w.sourceAggregateId && a.nodes.has(w.sourceAggregateId) && ge(a, {
      id: `es-state:${w.id}`,
      sourceId: w.sourceAggregateId,
      targetId: P,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const L = w.sourceExternalUseCaseId ?? w.sourceExternalTableId;
    if (L) {
      const b = e.externalSystems.find(
        (S) => (S.useCases ?? []).some((V) => V.id === L) || (S.tables ?? []).some((V) => V.id === L)
      ), A = b ? g(b.id) : null;
      if (A) {
        const S = ((O = (b.useCases ?? []).find((V) => V.id === L)) == null ? void 0 : O.name) ?? ((G = (b.tables ?? []).find((V) => V.id === L)) == null ? void 0 : G.name);
        ge(a, {
          id: `es-poll:${w.id}`,
          sourceId: A,
          targetId: P,
          kind: "es-projects-poll",
          label: S,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: S ? `polling de ${S}` : "polling"
        });
      }
    }
    const _ = I({ id: w.readModelId, name: w.readModelName });
    _ && ge(a, {
      id: `es-projects:${P}->${_}`,
      sourceId: P,
      targetId: _,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const w of e.flows) {
    if (w.archetype === "MATERIALIZES") {
      const L = v(w.triggerEvent), _ = I({ name: w.readModelName ?? `${w.triggerEvent}View` });
      L && _ && ge(a, {
        id: `es-mat:${w.id}`,
        sourceId: L,
        targetId: _,
        kind: "es-materializes",
        label: w.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${w.name} [MATERIALIZES]`
      });
      continue;
    }
    const P = u(
      `flow:${w.id}`,
      w.name,
      "flow",
      `POLICY · ${w.archetype}`,
      `Flow ${w.name} [${w.archetype}]`
    );
    if (x(w.triggerEvent, P), E(P, w.targetUseCaseId), !w.targetUseCaseId) {
      const L = g(w.targetId), _ = L ?? `tgt:${w.targetId}`;
      !L && o.has(w.targetId) && Oe(a, {
        id: _,
        label: o.get(w.targetId) ?? w.targetId,
        x: 0,
        y: 0,
        w: se.boundedContext.w,
        h: se.boundedContext.h,
        kind: "boundedContext",
        symbol: "component",
        fill: se.boundedContext.fill,
        stroke: se.boundedContext.stroke,
        badge: "CONTEXTO"
      }), a.nodes.has(_) && ge(a, {
        id: `es-deliver:${w.id}`,
        sourceId: P,
        targetId: _,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const w of e.processes ?? []) {
    const P = u(
      w.id,
      w.name,
      "process",
      `PROCESO${w.sla ? ` · SLA ${w.sla}` : ""}`,
      `${w.name}${w.triggerEvent ? ` — arranca con ${w.triggerEvent}` : ""}`
    );
    x(w.triggerEvent, P);
    for (const _ of w.steps) E(P, _.useCaseId);
    const L = v(w.onCompletionEventName);
    L && ge(a, {
      id: `es-done:${w.id}`,
      sourceId: P,
      targetId: L,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const w of e.workflows ?? []) {
    const P = u(
      w.id,
      w.name,
      "workflow",
      "WORKFLOW",
      `${w.name}${w.triggerEvent ? ` — arranca con ${w.triggerEvent}` : ""}`
    );
    x(w.triggerEvent, P);
    for (const _ of w.steps ?? []) {
      E(P, _.targetUseCaseId);
      for (const b of [_.emittedEventName, _.completionEventName]) {
        const A = v(b);
        A && ge(a, {
          id: `es-wfemit:${w.id}:${A}`,
          sourceId: P,
          targetId: A,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const L = v(w.onCompletionEventName);
    L && ge(a, {
      id: `es-done:${w.id}`,
      sourceId: P,
      targetId: L,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const N = [...a.nodes.values()], R = /* @__PURE__ */ new Map();
  for (const w of a.edges)
    R.has(w.targetId) || R.set(w.targetId, []), R.get(w.targetId).push(w.sourceId);
  const k = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Set(), z = (w) => {
    const P = k.get(w);
    if (P !== void 0) return P;
    if (T.has(w)) return 0;
    T.add(w);
    const L = R.get(w) ?? [], _ = L.length ? 1 + Math.max(...L.map(z)) : 0;
    return T.delete(w), k.set(w, _), _;
  }, Q = /* @__PURE__ */ new Map();
  for (const w of N) {
    const P = t[w.id];
    if (P) {
      w.x = P.x, w.y = P.y;
      continue;
    }
    const L = z(w.id), _ = Q.get(L) ?? 0;
    Q.set(L, _ + 1), w.x = 140 + L * 260, w.y = 110 + _ * 110;
  }
  return { nodes: N, edges: a.edges };
}
const Pc = 190, Tc = 56, na = 180, Oc = 56, Rc = 150, Nc = 44, aa = 250, oa = 100;
function Dc(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (a) => {
    if (i.has(a.id)) return 0;
    i.add(a.id);
    const o = (a.dependsOnStepIds ?? []).map((d) => t.get(d)).filter(Boolean), s = o.length ? 1 + Math.max(...o.map(n)) : 0;
    return i.delete(a.id), s;
  };
  return n(e);
}
function Lc(e, t) {
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
function Uc(e, t, i = /* @__PURE__ */ new Set(), n = !1) {
  var I;
  const a = [], o = [], s = /* @__PURE__ */ new Set(), d = (g) => {
    var l;
    return (l = e.boundedContexts.flatMap((u) => u.useCases ?? []).find((u) => u.id === g)) == null ? void 0 : l.name;
  };
  let r = 140;
  (e.workflows ?? []).forEach((g) => {
    var Q;
    const l = new Map(g.steps.map((C) => [C.id, C])), u = new Map(g.steps.map((C) => [C.id, Dc(C, l)])), x = /* @__PURE__ */ new Map();
    for (const C of g.steps) {
      const W = u.get(C.id) ?? 0;
      x.set(W, (x.get(W) ?? 0) + 1);
    }
    const E = Math.max(1, ...x.values()), N = Lc(e, g);
    if (N && !s.has(N.id)) {
      s.add(N.id);
      const C = t[N.id] ?? { x: 140, y: r };
      a.push({
        id: N.id,
        label: N.label,
        x: C.x,
        y: C.y,
        w: Rc,
        h: Nc,
        kind: N.kind,
        symbol: N.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: N.kind === "aggregate" ? "AGGREGATE" : N.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const R = t[g.id] ?? { x: 420, y: r }, k = n || i.has(g.id);
    a.push({
      id: g.id,
      label: g.name,
      x: R.x,
      y: R.y,
      w: Pc,
      h: Tc,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      collapsible: g.steps.length > 0,
      collapsed: g.steps.length > 0 && !k,
      tooltip: `${g.name}${g.triggerEvent ? ` — arranca con ${g.triggerEvent}` : ""}${g.onCompletionEventName ? ` · emite ${g.onCompletionEventName} al completar` : ""}`
    }), N && o.push({
      id: `wft:${g.id}`,
      sourceId: N.id,
      targetId: g.id,
      kind: "workflow-trigger",
      label: g.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: g.triggerEvent ? `Evento: ${g.triggerEvent}` : void 0
    });
    const T = /* @__PURE__ */ new Map();
    let z = 0;
    for (const C of k ? g.steps : []) {
      const W = u.get(C.id) ?? 0;
      z = Math.max(z, W);
      const j = T.get(W) ?? 0;
      T.set(W, j + 1);
      const O = t[C.id] ?? {
        x: R.x + (W + 1) * aa,
        y: r + (j - (x.get(W) - 1) / 2) * oa
      }, G = d(C.targetUseCaseId);
      a.push({
        ownerId: g.id,
        id: C.id,
        label: C.name,
        x: O.x,
        y: O.y,
        w: C.type === "JOIN" || C.type === "SPLIT" ? 100 : na,
        h: C.type === "JOIN" || C.type === "SPLIT" ? 48 : Oc,
        kind: "workflow-step",
        symbol: C.type === "JOIN" || C.type === "SPLIT" ? "flow" : C.roleId ? "actor" : "event",
        fill: C.type === "JOIN" || C.type === "SPLIT" ? "#f5f3ff" : C.roleId ? "#fef9c3" : "#ffffff",
        stroke: C.roleId && C.type !== "JOIN" && C.type !== "SPLIT" ? "#ca8a04" : "#6d28d9",
        dashed: C.type === "JOIN" || C.type === "SPLIT",
        badge: C.type === "JOIN" ? "⨝ JOIN" : C.type === "SPLIT" ? "⑃ SPLIT" : C.roleId ? `👤 ${C.roleId}${C.formPageId ? " · 📋" : ""}${C.deadline ? ` · ${C.deadline}` : ""}` : G ? `→ ${G}` : "∅ sin use case",
        tooltip: C.type === "JOIN" ? `${C.name} — espera a TODAS sus dependencias antes de seguir` : C.type === "SPLIT" ? `${C.name} — abre ramas paralelas: los pasos que dependan de él arrancan a la vez` : `${C.name}${C.roleId ? ` · tarea HUMANA de ${C.roleId}${C.deadline ? ` (plazo ${C.deadline})` : ""}` : ""}${C.emittedEventName ? ` · emite ${C.emittedEventName}` : ""}${G ? ` · lanza ${G}` : ""}${C.completionEventName ? ` · espera ${C.completionEventName}` : ""}${C.compensationUseCaseId ? " · ⎌ compensable" : ""}`
      });
      const w = (C.dependsOnStepIds ?? []).filter((P) => l.has(P));
      w.length === 0 && o.push({
        id: `wfs:${g.id}:${C.id}`,
        sourceId: g.id,
        targetId: C.id,
        kind: "workflow-start",
        label: C.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const P of w)
        o.push({
          id: `wfdep:${P}->${C.id}`,
          sourceId: P,
          targetId: C.id,
          kind: "workflow-dependency",
          label: C.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${C.name} espera a ${((Q = l.get(P)) == null ? void 0 : Q.name) ?? P}`
        });
    }
    if (g.onCompletionEventName) {
      const C = `done:${g.id}`, W = t[C] ?? { x: R.x + (z + 2) * aa, y: r };
      a.push({
        id: C,
        label: g.onCompletionEventName,
        x: W.x,
        y: W.y,
        w: na,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const j = new Set(g.steps.flatMap((G) => G.dependsOnStepIds ?? [])), O = g.steps.filter((G) => !j.has(G.id));
      for (const G of O.length ? O : [])
        o.push({
          id: `wfd:${g.id}:${G.id}`,
          sourceId: G.id,
          targetId: C,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      g.steps.length || o.push({
        id: `wfd:${g.id}`,
        sourceId: g.id,
        targetId: C,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, E + 1) * oa + 60;
  });
  const c = new Set(a.map((g) => g.id));
  (e.workflowGateways ?? []).forEach((g, l) => {
    const u = t[g.id] ?? { x: 200 + l % 5 * 220, y: 60 };
    a.push({
      id: g.id,
      label: g.name,
      x: u.x,
      y: u.y,
      w: 100,
      h: 48,
      kind: "workflow-gateway",
      symbol: "flow",
      fill: "#f5f3ff",
      stroke: "#6d28d9",
      dashed: !0,
      badge: g.type === "SPLIT" ? g.semantics === "EXCLUSIVE" ? "⑃ EXCLUSIVO" : "⑃ PARALELO" : g.semantics === "ANY" ? "⨝ CUALQUIERA" : "⨝ TODAS",
      tooltip: g.type === "SPLIT" ? `${g.name} — split ${g.semantics === "EXCLUSIVE" ? "exclusivo: elige UNA rama" : "paralelo: abre TODAS las ramas"}; doble click cambia la semántica` : `${g.name} — join que ${g.semantics === "ANY" ? "arranca con CUALQUIER entrada" : "espera a TODAS sus entradas"}; doble click cambia la semántica`
    }), c.add(g.id);
  });
  for (const g of e.workflowGateways ?? []) {
    for (const u of g.sourceIds ?? [])
      c.has(u) && o.push({
        id: `wflink:${u}->${g.id}`,
        sourceId: u,
        targetId: g.id,
        kind: "wf-link",
        color: "#6d28d9",
        arrow: !0,
        tooltip: "fluye al gateway — Supr lo desconecta"
      });
    const l = g.type === "SPLIT" && g.semantics === "EXCLUSIVE";
    for (const u of g.targetIds ?? []) {
      if (!c.has(u)) continue;
      const x = l ? (I = (g.branchConditions ?? []).find((E) => E.targetId === u)) == null ? void 0 : I.expression : void 0;
      o.push({
        id: `wflink:${g.id}->${u}`,
        sourceId: g.id,
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
    const x = (e.actors ?? []).find((N) => N.id === l.roleId), E = l.roleId;
    if (!c.has(E)) {
      const N = a.find((k) => k.id === l.id), R = t[E] ?? {
        x: N ? N.x - 90 : 120 + u * 200,
        y: N ? N.y - 120 : 40
      };
      a.push({
        id: E,
        label: (x == null ? void 0 : x.name) ?? E,
        x: R.x,
        y: R.y,
        w: 130,
        h: 44,
        kind: "actor",
        symbol: "person",
        fill: "#fef9c3",
        stroke: "#ca8a04",
        badge: "ROL",
        tooltip: `${(x == null ? void 0 : x.name) ?? E} — su lista de tareas recibe los pasos humanos conectados`
      }), c.add(E);
    }
    o.push({
      id: `wfrole:${l.id}->${E}`,
      sourceId: E,
      targetId: l.id,
      kind: "wf-role",
      color: "#ca8a04",
      dashed: !0,
      arrow: !0,
      tooltip: "la tarea cae en la lista de este rol — Supr la vuelve automática"
    });
  }), (e.workflows ?? []).flatMap((l) => (l.steps ?? []).filter((u) => u.formPageId && c.has(u.id))).forEach((l, u) => {
    const x = (e.pages ?? []).find((E) => E.id === l.formPageId);
    if (x) {
      if (!c.has(x.id)) {
        const E = a.find((R) => R.id === l.id), N = t[x.id] ?? {
          x: E ? E.x : 200 + u * 220,
          y: E ? E.y + 130 : 60
        };
        a.push({
          id: x.id,
          label: x.name,
          x: N.x,
          y: N.y,
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
      o.push({
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
  for (const g of e.workflows ?? [])
    for (const l of g.steps ?? [])
      !l.handoffWorkflowId || !c.has(l.handoffWorkflowId) || !c.has(l.id) || o.push({
        id: `wflink:${l.id}->${l.handoffWorkflowId}`,
        sourceId: l.id,
        targetId: l.handoffWorkflowId,
        kind: "wf-link",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "el paso entrega a OTRO workflow — Supr lo desconecta"
      });
  const h = /* @__PURE__ */ new Map();
  for (const g of e.workflows ?? [])
    for (const l of g.steps) h.set(l.id, g.id);
  const m = new Set(a.map((g) => g.id)), f = (g) => {
    if (m.has(g)) return g;
    const l = h.get(g);
    return l && m.has(l) ? l : null;
  }, y = /* @__PURE__ */ new Set(), v = [];
  for (const g of o) {
    const l = f(g.sourceId), u = f(g.targetId);
    if (!l || !u || l === u) continue;
    if (l === g.sourceId && u === g.targetId) {
      v.push(g);
      continue;
    }
    const x = `${g.kind}|${l}|${u}`;
    y.has(x) || (y.add(x), v.push({
      ...g,
      sourceId: l,
      targetId: u,
      tooltip: `${g.tooltip ?? g.kind} — de un paso plegado dentro`
    }));
  }
  return { nodes: a, edges: v };
}
const sa = 250, ze = 30, yt = 6, zc = 16, Bt = 190, qc = 60, Bc = 170, ui = 44;
function Fc(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function Ee(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function jc(e) {
  const t = [], i = (n, a, o) => {
    for (const s of n ?? []) {
      const d = [...a, s.label];
      t.push({ entry: s, path: d, depth: o }), i(s.children ?? [], d, o + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Vc(e, t, i = /* @__PURE__ */ new Set(), n = !1) {
  var k, T, z, Q;
  const a = [], o = [], s = e.uiApps ?? [], d = e.pages ?? [], r = (C) => {
    var W;
    return ((W = e.boundedContexts.flatMap((j) => j.useCases ?? []).find((j) => j.id === C)) == null ? void 0 : W.name) ?? C;
  }, c = (C) => {
    var W;
    return ((W = e.boundedContexts.flatMap((j) => j.queryServices ?? []).find((j) => j.id === C)) == null ? void 0 : W.name) ?? C;
  }, h = /* @__PURE__ */ new Map();
  let m = 160;
  for (const C of s) {
    const W = jc(C), j = n || i.has(C.id), O = 90, G = j ? W.length * (ze + yt) : 0, w = t[C.id] ?? { x: 190, y: m + O / 2 };
    m = w.y + O / 2 + G + 70;
    const P = C.type ?? "APP";
    a.push({
      id: C.id,
      label: C.title || C.name,
      x: w.x,
      y: w.y,
      w: sa,
      h: O,
      kind: "ui-app",
      symbol: P === "ORCHESTRATOR" || P === "VIEW_EDITOR" ? "process" : "component",
      fill: P === "ORCHESTRATOR" || P === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: P === "ORCHESTRATOR" || P === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      collapsible: W.length > 0,
      collapsed: W.length > 0 && !j,
      badge: P === "ORCHESTRATOR" ? "ORQUESTADOR" : P === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : P === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: P === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : P === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : P === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: P === "ORCHESTRATOR" ? `${C.name} — orquesta y mantiene estado; solo enseña páginas hijas` : P === "MASTER_DETAIL" ? `${C.name} — cabecera + pestañas (ambas son páginas)` : `App: ${C.name}`
    }), C.modelId && (h.set(C.modelId, {
      label: ((k = (e.models ?? []).find((b) => b.id === C.modelId)) == null ? void 0 : k.name) ?? C.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), o.push({
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
    for (const [b, A, S, V, U] of [
      [C.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [C.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      b && o.push({
        id: `${A === "app-view" ? "appview" : "appedit"}:${C.id}->${b}`,
        sourceId: C.id,
        targetId: b,
        kind: A,
        color: V,
        label: S,
        arrow: !0,
        tooltip: U
      });
    const L = C.homePageId ?? C.homeAppId;
    L && o.push({
      id: `apphome:${C.id}->${L}`,
      sourceId: C.id,
      targetId: L,
      kind: "app-home",
      color: "#16a34a",
      label: "home",
      markerStart: "ball",
      markerEnd: "arrow",
      tooltip: C.homeAppId ? "la app con la que abre (assignment)" : "la página con la que abre la app (assignment)"
    }), P === "MASTER_DETAIL" && C.headerPageId && o.push({
      id: `appheader:${C.id}->${C.headerPageId}`,
      sourceId: C.id,
      targetId: C.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let _ = w.y + O / 2 + 10 + ze / 2;
    for (const { entry: b, path: A, depth: S } of j ? W : []) {
      const V = Fc(C.id, b, A), U = S * zc;
      if (a.push({
        id: V,
        label: b.label,
        x: w.x + U / 2,
        y: _,
        w: sa - 20 - U,
        h: ze,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (T = b.children) != null && T.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (z = b.children) != null && z.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        ownerId: C.id,
        tooltip: (Q = b.children) != null && Q.length ? "Agrupador (con submenú): no puede abrir nada" : b.pageId ? `Abre ${b.pageId}` : b.uiAdapterId ? `Abre la app ${b.uiAdapterId}` : b.useCaseId ? `Lanza ${b.useCaseId}` : b.aggregateId ? `CRUD inferido sobre ${b.aggregateId}` : b.queryOperationId ? `Listado con filtros de ${b.queryOperationId}` : "Entrada de menú sin destino"
      }), _ += ze + yt, b.uiAdapterId && s.some((F) => F.id === b.uiAdapterId) && o.push({
        id: `menuapp:${V}->${b.uiAdapterId}`,
        sourceId: V,
        targetId: b.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), b.useCaseId && e.boundedContexts.some((H) => (H.useCases ?? []).some((J) => J.id === b.useCaseId)) && (h.set(b.useCaseId, {
        label: r(b.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), o.push({
        id: `menuuc:${V}->${b.useCaseId}`,
        sourceId: V,
        targetId: b.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), b.aggregateId && (e.aggregates ?? []).some((F) => F.id === b.aggregateId)) {
        const F = (e.aggregates ?? []).find((H) => H.id === b.aggregateId);
        h.set(F.id, { label: F.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), o.push({
          id: `menuagg:${V}->${F.id}`,
          sourceId: V,
          targetId: F.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (b.queryOperationId) {
        const F = e.boundedContexts.flatMap((J) => J.queryServices ?? []).find((J) => J.id === b.queryServiceId), H = ((F == null ? void 0 : F.operations) ?? []).find((J) => J.id === b.queryOperationId);
        F && H && (h.set(H.id, {
          label: `${H.name} (${F.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), o.push({
          id: `menuqop:${V}->${H.id}`,
          sourceId: V,
          targetId: H.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      b.pageId && d.some((F) => F.id === b.pageId) && o.push({
        id: `menupage:${V}->${b.pageId}`,
        sourceId: V,
        targetId: b.pageId,
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
    var W;
    return ((W = d.find((j) => j.id === C)) == null ? void 0 : W.name) ?? C;
  };
  for (const C of d) {
    const W = t[C.id] ?? { x: 640, y: f }, j = C.type === "WIZARD" ? C.wizardSteps ?? [] : [], O = n || i.has(C.id), G = qc, w = O ? j.length * (ze + yt) : 0;
    f = W.y + G + w + 90, a.push({
      id: C.id,
      label: C.name,
      x: W.x,
      y: W.y,
      w: Bt,
      h: G,
      kind: "page",
      symbol: "interface",
      badge: C.customCodeId ? "CODE" : C.type ?? "PAGE",
      collapsible: j.length > 0,
      collapsed: j.length > 0 && !O,
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
    let P = W.y + G / 2 + 10 + ze / 2;
    (O ? j : []).forEach((L, _) => {
      const b = L.id ?? L.pageId ?? String(_);
      a.push({
        id: `wizrow:${C.id}:${b}`,
        label: `${_ + 1}. ${L.label ?? (L.pageId ? y(L.pageId) : "Paso")}${L.pageId ? "" : " ⌁"}`,
        x: W.x,
        y: P,
        w: Bt - 20,
        h: ze,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: L.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        ownerId: C.id,
        tooltip: L.pageId ? `Paso ${_ + 1}: ${y(L.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${_ + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), P += ze + yt;
    });
    for (const [L, _, b, A] of [
      [C.crudDetailPageId ?? C.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [C.crudCreatePageId ?? C.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      L && o.push({
        id: `${_ === "crud-detail" ? "cruddetail" : "crudnew"}:${C.id}->${L}`,
        sourceId: C.id,
        targetId: L,
        kind: _,
        color: A,
        label: b,
        dashed: !0,
        arrow: !0,
        tooltip: _ === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let L = 0; L < (C.wizardSteps ?? []).length; L++) {
      const _ = (C.wizardSteps ?? [])[L];
      if (!_.pageId) continue;
      const b = _.id ?? _.pageId;
      o.push({
        id: `wizstep:${C.id}:${b}`,
        sourceId: `wizrow:${C.id}:${b}`,
        targetId: _.pageId,
        kind: "wizard-step",
        color: "#7c3aed",
        dashed: !0,
        arrow: !0,
        tooltip: `la página que implementa el paso ${L + 1} — Supr desmapea`
      });
    }
    C.modelId && (h.set(C.modelId, {
      label: C.modelName ?? C.modelId,
      kind: "model",
      symbol: "readmodel",
      stroke: "#8b5cf6"
    }), o.push({
      id: `pgmodel:${C.id}->${C.modelId}`,
      sourceId: C.id,
      targetId: C.modelId,
      kind: "page-model",
      label: "viewmodel",
      color: "#8b5cf6",
      dashed: !0,
      arrow: !0
    }));
    for (const L of C.buttons ?? [])
      L.useCaseId && (h.set(L.useCaseId, {
        label: r(L.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), o.push({
        id: `pgbtn:${C.id}->${L.useCaseId}`,
        sourceId: C.id,
        targetId: L.useCaseId,
        kind: "page-button",
        label: L.label,
        color: "#06b6d4",
        dashed: !0,
        arrow: !0,
        tooltip: L.mappingId ? `Botón «${L.label}» — mapping ${L.mappingId}` : `Botón «${L.label}» — el viewmodel viaja tal cual (sin mapping)`
      }));
    C.listingQueryServiceId && (h.set(C.listingQueryServiceId, {
      label: c(C.listingQueryServiceId),
      kind: "query-service",
      symbol: "lens",
      stroke: "#0284c7"
    }), o.push({
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
  const v = e.buttonGroups ?? [], I = (C) => {
    var W;
    return ((W = v.find((j) => j.id === C)) == null ? void 0 : W.name) ?? C;
  };
  let g = 520;
  for (const C of v) {
    const W = C.buttons ?? [], j = C.groupIds ?? [], O = W.length + j.length, G = n || i.has(C.id), w = t[C.id] ?? { x: 1e3, y: g }, P = 70, L = G ? O * (ze + yt) : 0;
    g = w.y + P + L + 80, a.push({
      id: C.id,
      label: C.name,
      x: w.x,
      y: w.y,
      w: Bt,
      h: P,
      kind: "button-group",
      symbol: "usecase",
      badge: "BOTONES",
      collapsible: O > 0,
      collapsed: O > 0 && !G,
      fill: "#ffffff",
      stroke: "#0e7490",
      extraHandles: [
        { kind: "toolbar", title: "Toolbar: arrastra hasta una página para engancharlo arriba", color: "#0284c7" },
        { kind: "bottom", title: "Botonera: arrastra hasta una página para engancharlo abajo", color: "#7c3aed" }
      ],
      tooltip: `${C.name} — grupo de botones: la paleta añade botones dentro; sus asas lo enganchan al toolbar o la botonera de una página`
    });
    let _ = w.y + P / 2 + 10 + ze / 2;
    for (const b of G ? W : [])
      a.push({
        id: `gbtn:${C.id}:${b.id}`,
        label: b.label ?? b.id,
        x: w.x,
        y: _,
        w: Bt - 20,
        h: ze,
        kind: "group-button",
        symbol: "usecase",
        fill: b.useCaseId || b.apiOperationId ? "#ecfeff" : "#ffffff",
        stroke: "#0e7490",
        dashed: !b.useCaseId && !b.apiOperationId,
        ownerId: C.id,
        tooltip: `${b.label ?? b.id} — arrastra su asa hasta un caso de uso o policy para fijar qué dispara; Supr lo quita del grupo`
      }), _ += ze + yt;
    for (const b of G ? j : [])
      a.push({
        id: `gsub:${C.id}:${b}`,
        label: `▸ ${I(b)}`,
        x: w.x,
        y: _,
        w: Bt - 20,
        h: ze,
        kind: "group-subgroup",
        symbol: "process",
        fill: "#f0fdfa",
        stroke: "#0e7490",
        ownerId: C.id,
        tooltip: `Subgrupo ${I(b)} — Supr lo desanida (el grupo sigue existiendo)`
      }), _ += ze + yt;
  }
  for (const C of v)
    for (const W of C.buttons ?? [])
      !W.useCaseId || !e.boundedContexts.some((O) => (O.useCases ?? []).some((G) => G.id === W.useCaseId)) || (h.set(W.useCaseId, {
        label: r(W.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), o.push({
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
    for (const [j, O] of W)
      for (const G of O)
        v.some((w) => w.id === G) && o.push({
          id: `bargrp:${C.id}:${j}:${G}`,
          sourceId: G,
          targetId: C.id,
          kind: "bar-group",
          color: j === "toolbar" ? "#0284c7" : "#7c3aed",
          label: j,
          dashed: !0,
          arrow: !0,
          tooltip: `Grupo enganchado a la ${j} de ${C.name} — Supr lo desengancha`
        });
  }
  let l = 160;
  for (const C of e.models ?? [])
    h.has(C.id) || h.set(C.id, { label: C.name, kind: "model", symbol: "readmodel", stroke: "#8b5cf6" });
  for (const [C, W] of h) {
    const j = t[C] ?? { x: 1050, y: l };
    l = j.y + ui + 46, a.push({
      id: C,
      label: W.label,
      x: j.x,
      y: j.y,
      w: Bc,
      h: ui,
      kind: W.kind,
      symbol: W.symbol,
      fill: "#ffffff",
      stroke: W.stroke
    });
  }
  let u = 120;
  for (const C of e.identityProviders ?? []) {
    const W = t[C.id] ?? { x: -320, y: u };
    u = W.y + 70 + 40, a.push({
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
  for (const C of s)
    C.identityProviderId && (e.identityProviders ?? []).some((W) => W.id === C.identityProviderId) && o.push({
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
    (C) => s.some((W) => W.id === C.appId) && (e.actors ?? []).some((W) => W.id === C.actorId)
  ), E = [...new Set(x.map((C) => C.actorId))];
  let N = 160;
  for (const C of E) {
    const W = (e.actors ?? []).find((O) => O.id === C), j = t[C] ?? { x: -60, y: N };
    N = j.y + ui + 46, a.push({
      id: C,
      label: W.name,
      x: j.x,
      y: j.y,
      w: 150,
      h: ui,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b"
    });
  }
  for (const C of x)
    o.push({
      id: `actorapp:${C.actorId}->${C.appId}`,
      sourceId: C.actorId,
      targetId: C.appId,
      kind: "actor-app",
      color: "#6366f1",
      arrow: !0
    });
  (e.customCodes ?? []).forEach((C, W) => {
    const j = t[C.id] ?? { x: 1200, y: 120 + W * 90 };
    a.push({
      id: C.id,
      label: C.name,
      x: j.x,
      y: j.y,
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
  const R = new Set(a.map((C) => C.id));
  for (const C of d)
    C.customCodeId && R.has(C.customCodeId) && o.push({
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
      R.has(W) && o.push({
        id: `ccuse:${C.id}->${W}`,
        sourceId: C.id,
        targetId: W,
        kind: "cc-uses",
        color: "#64748b",
        dashed: !0,
        arrow: !0,
        tooltip: `${C.name} usa este elemento — Supr lo desconecta`
      });
  return (e.uis ?? []).forEach((C, W) => {
    const j = t[C.id] ?? { x: 120 + W * 220, y: 40 };
    a.push({
      id: C.id,
      label: C.name,
      x: j.x,
      y: j.y,
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
      a.some((G) => G.id === O) && o.push({
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
      a.some((G) => G.id === O) && o.push({
        id: `uisrv:${C.id}->${O}`,
        sourceId: C.id,
        targetId: O,
        kind: "ui-serving",
        color: "#0ea5e9",
        markerEnd: "open-arrow",
        tooltip: "la UI sirve a este actor (serving) — Supr la desconecta"
      });
  }), { nodes: a, edges: o };
}
const ra = 188, da = 34, la = 10, mi = 24, ca = 6;
function fi(e, t) {
  return `fld:${e}:${t}`;
}
function dn(e) {
  const t = /^fld:([^:]+):(.+)$/.exec(e);
  return t ? { modelId: t[1], fieldId: t[2] } : null;
}
function Wc(e, t) {
  const i = [], n = [], a = e.models ?? [], o = e.modelMappings ?? [], s = (f) => {
    var y;
    return ((y = a.find((v) => v.id === f)) == null ? void 0 : y.name) ?? f ?? "?";
  };
  a.forEach((f, y) => {
    const v = t[f.id] ?? { x: 200 + y % 5 * 260, y: 160 + Math.floor(y / 5) * 220 }, I = f.fields ?? [], g = da + (I.length ? I.length * mi + (I.length - 1) * ca : 10) + la;
    i.push({
      id: f.id,
      label: f.name,
      x: v.x,
      y: v.y,
      w: ra,
      h: g,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      container: !0,
      tooltip: `${f.name} — arrastra el asa hasta otro modelo para crear un mapeado; la paleta añade campos`
    }), I.forEach((l, u) => {
      i.push({
        id: fi(f.id, l.id),
        label: l.name,
        x: v.x,
        y: v.y - g / 2 + da + u * (mi + ca) + mi / 2,
        w: ra - 2 * la,
        h: mi,
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
  const d = new Set(i.map((f) => f.id)), r = (f) => f.fieldId ? fi(f.modelId, f.fieldId) : f.modelId;
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
  for (const f of o)
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
  for (const f of o)
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
        const v = fi(f.sourceModelId, y.sourceFieldId ?? ""), I = fi(f.targetModelId, y.targetFieldId ?? "");
        !d.has(v) || !d.has(I) || n.push({
          id: `maprule:${f.id}:${y.id}`,
          sourceId: v,
          targetId: I,
          kind: "mapping-rule",
          color: "#a78bfa",
          dashed: !0,
          arrow: !0,
          tooltip: `Regla de ${f.name} — Supr la elimina`
        });
      }
    }
  const c = new Set(
    o.filter((f) => f.sourceModelId && f.targetModelId).map((f) => `${f.sourceModelId}->${f.targetModelId}`)
  ), h = new Map(
    e.boundedContexts.flatMap((f) => (f.useCases ?? []).map((y) => [y.id, y]))
  ), m = /* @__PURE__ */ new Set();
  for (const f of e.pages ?? [])
    if (f.modelId)
      for (const y of f.buttons ?? []) {
        if (!y.useCaseId || y.mappingId) continue;
        const v = h.get(y.useCaseId);
        if (!(v != null && v.inputModelId) || v.inputModelId === f.modelId) continue;
        const I = `${f.modelId}->${v.inputModelId}`;
        c.has(I) || m.has(I) || (m.add(I), !(!d.has(f.modelId) || !d.has(v.inputModelId)) && n.push({
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
const Ki = 560, hi = 34, gi = 14, Xi = 150, yi = 40, bi = 12, vi = 150, rt = 40, Gc = (e) => e.startsWith("SOURCE") ? 0 : e === "TRANSFORM" ? 1 : 2, Hc = {
  0: { fill: "#f0f9ff", stroke: "#0284c7", symbol: "lens" },
  1: { fill: "#f0fdfa", stroke: "#0f766e", symbol: "gear" },
  2: { fill: "#f5f3ff", stroke: "#7c3aed", symbol: "event" }
};
function Yc(e, t) {
  const i = [], n = [], a = e.etlFlows ?? [], o = new Map(e.boundedContexts.map((I) => [I.id, I.name])), s = new Map(
    e.boundedContexts.flatMap((I) => [
      ...(I.domainEvents ?? []).map((g) => [g.id, g.name]),
      ...(I.applicationEvents ?? []).map((g) => [g.id, g.name])
    ])
  );
  let d = 140;
  for (const I of a) {
    const g = I.steps ?? [], l = [[], [], []];
    g.forEach((N) => l[Gc(N.type)].push(N));
    const u = Math.max(1, ...l.map((N) => N.length)), x = hi + gi + u * (yi + bi), E = t[I.id] ?? { x: 420, y: d };
    d = E.y + x + 110, i.push({
      id: I.id,
      label: I.name,
      x: E.x,
      y: E.y,
      w: Ki,
      h: x,
      kind: "etl-flow",
      symbol: "gear",
      badge: "ETL",
      container: !0,
      fill: "#ffffff",
      stroke: "#0f766e",
      tooltip: `${I.name} — integrador${I.ownerBoundedContextId ? ` de ${o.get(I.ownerBoundedContextId) ?? I.ownerBoundedContextId}` : ""}: fuentes → transformación → escrituras; la paleta añade transformaciones`
    }), l.forEach((N, R) => {
      const k = E.x - Ki / 2 + gi + Xi / 2 + R * (Ki - 2 * gi - Xi) / 2;
      N.forEach((T, z) => {
        const Q = Hc[R];
        if (i.push({
          id: T.id,
          label: T.name ?? T.id,
          x: k,
          y: E.y - x / 2 + hi + yi / 2 + z * (yi + bi),
          w: Xi,
          h: yi,
          kind: "etl-step",
          symbol: Q.symbol,
          fill: Q.fill,
          stroke: Q.stroke,
          badge: T.type === "SOURCE_PULL" ? "PULL" : T.type === "SOURCE_CONSUMER" ? "CONSUME" : T.type === "TRANSFORM" ? "TRANSFORM" : T.type === "WRITE_API" ? "→ API" : T.type === "WRITE_DB" ? "→ BD" : "→ EVENTO",
          parentId: I.id,
          tooltip: `${T.name ?? T.id} (${T.type})${T.mappingId ? " · aplica un mapeado" : ""} — Supr lo quita del integrador`
        }), R > 0) {
          const C = l[R - 1], W = C[Math.min(z, C.length - 1)];
          W && n.push({
            id: `etlpipe:${I.id}:${W.id}->${T.id}`,
            sourceId: W.id,
            targetId: T.id,
            kind: "etl-pipe",
            color: "#0f766e",
            arrow: !0,
            tooltip: "el dato fluye por el pipeline"
          });
        }
      });
    });
  }
  const r = new Set(i.map((I) => I.id)), c = new Set(a.flatMap((I) => (I.steps ?? []).map((g) => g.externalTableId)).filter(Boolean)), h = new Set(a.flatMap((I) => (I.steps ?? []).map((g) => g.apiId)).filter(Boolean)), m = new Set(a.flatMap((I) => (I.steps ?? []).map((g) => g.eventId)).filter(Boolean));
  let f = 120;
  for (const I of e.externalSystems) {
    const g = (I.tables ?? []).filter((x) => c.has(x.id));
    if (!g.length) continue;
    const l = hi + gi + g.length * (rt + bi), u = t[I.id] ?? { x: -140, y: f };
    f = u.y + l + 90, i.push({
      id: I.id,
      label: I.name,
      x: u.x,
      y: u.y,
      w: vi + 30,
      h: l,
      kind: "external-system",
      symbol: "component",
      badge: "EXTERNAL",
      container: !0,
      fill: "#ffffff",
      stroke: "#64748b",
      dashed: !0,
      tooltip: `${I.name} — sistema externo: sus tablas legacy alimentan (o reciben) integradores`
    }), r.add(I.id), g.forEach((x, E) => {
      i.push({
        id: x.id,
        label: x.name,
        x: u.x,
        y: u.y - l / 2 + hi + rt / 2 + E * (rt + bi),
        w: vi,
        h: rt,
        kind: "external-table",
        symbol: "readmodel",
        fill: "#fefce8",
        stroke: "#a16207",
        parentId: I.id,
        tooltip: `${x.name} — tabla legacy de ${I.name}`
      }), r.add(x.id);
    });
  }
  let y = 120;
  for (const I of e.apis ?? []) {
    if (!h.has(I.id)) continue;
    const g = t[I.id] ?? { x: 1e3, y };
    y = g.y + rt + 70, i.push({
      id: I.id,
      label: I.name,
      x: g.x,
      y: g.y,
      w: vi,
      h: rt,
      kind: "api",
      symbol: "interface",
      badge: "API",
      fill: "#eef2ff",
      stroke: "#4f46e5",
      tooltip: `${I.name} — API que un integrador consume o llama`
    }), r.add(I.id);
  }
  let v = 400;
  for (const I of m) {
    const g = I, l = t[g] ?? { x: 1e3, y: v };
    v = l.y + rt + 70, i.push({
      id: g,
      label: s.get(g) ?? g,
      x: l.x,
      y: l.y,
      w: vi,
      h: rt,
      kind: "domain-event",
      symbol: "event",
      badge: "EVENTO",
      fill: "#fff7ed",
      stroke: "#f59e0b",
      tooltip: "evento que un integrador consume o publica"
    }), r.add(g);
  }
  for (const I of a)
    for (const g of I.steps ?? []) {
      const l = g.externalTableId ?? g.apiId ?? g.eventId;
      if (!l || !r.has(l) || !r.has(g.id)) continue;
      const u = g.type.startsWith("SOURCE");
      n.push({
        id: `etl:${I.id}:${g.id}`,
        sourceId: u ? l : g.id,
        targetId: u ? g.id : l,
        kind: u ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: g.type === "SOURCE_PULL" ? "pull" : g.type === "SOURCE_CONSUMER" ? "consume" : g.type === "WRITE_API" ? "api" : g.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: u ? `${I.name} lee de aquí — Supr quita el paso` : `${I.name} escribe aquí — Supr quita el paso`
      });
    }
  return { nodes: i, edges: n };
}
async function Kc(e, t) {
  var c, h;
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((m) => m.e), n = new i(), a = t == null ? void 0 : t.partitions, o = {
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
      ...a ? { "elk.partitioning.activate": "true" } : {}
    },
    children: e.nodes.map((m) => ({
      id: m.id,
      width: m.w,
      height: m.h,
      ...a && a[m.id] !== void 0 ? { layoutOptions: { "elk.partitioning.partition": String(a[m.id]) } } : {}
    })),
    edges: e.edges.map((m) => ({ id: m.id, sources: [m.sourceId], targets: [m.targetId] }))
  }, s = await n.layout(o), d = {};
  for (const m of s.children ?? [])
    d[m.id] = {
      x: (m.x ?? 0) + (m.width ?? 0) / 2,
      y: (m.y ?? 0) + (m.height ?? 0) / 2
    };
  const r = {};
  for (const m of s.edges ?? []) {
    const f = (h = (c = m.sections) == null ? void 0 : c[0]) == null ? void 0 : h.bendPoints;
    f && f.length && (r[m.id] = f.map((y) => ({ x: y.x, y: y.y })));
  }
  return { nodes: d, edges: r };
}
const Xc = 90, pa = 40, Qc = {
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
}, Jc = 1, Zc = 9, ep = 5;
function tp(e, t) {
  let i = 0, n = 0;
  for (const a of t.edges)
    a.sourceId === e.id && !ua(a.targetId, t) && i++, a.targetId === e.id && !ua(a.sourceId, t) && n++;
  return i > n ? Jc : Zc;
}
function ua(e, t) {
  var i;
  return ((i = t.nodes.find((n) => n.id === e)) == null ? void 0 : i.kind) === "external-system";
}
function ip(e, t) {
  return e.kind === "external-system" ? tp(e, t) : Qc[e.kind] ?? ep;
}
function np(e) {
  const t = [...new Set(Object.values(e).map((a) => Math.round(a.x)))].sort((a, o) => a - o), i = new Map(t.map((a, o) => [a, o])), n = {};
  for (const [a, o] of Object.entries(e)) n[a] = i.get(Math.round(o.x)) ?? 0;
  return n;
}
function ap(e) {
  const t = e.nodes.filter((m) => !m.parentId && m.kind !== "area"), i = {};
  if (!t.length) return i;
  const n = /* @__PURE__ */ new Map();
  for (const m of t) {
    const f = ip(m, e);
    n.has(f) || n.set(f, []), n.get(f).push(m);
  }
  const a = [...n.entries()].sort((m, f) => m[0] - f[0]).map(([, m]) => m);
  for (const m of a)
    m.sort((f, y) => f.label.toLowerCase().localeCompare(y.label.toLowerCase()) || f.id.localeCompare(y.id));
  const o = /* @__PURE__ */ new Map(), s = () => {
    a.forEach(
      (m) => m.forEach((f, y) => o.set(f.id, m.length > 1 ? y / (m.length - 1) : 0.5))
    );
  }, d = (m) => {
    let f = 0, y = 0;
    for (const v of e.edges) {
      const I = v.sourceId === m.id ? v.targetId : v.targetId === m.id ? v.sourceId : null;
      I !== null && o.has(I) && (f += o.get(I), y++);
    }
    return y ? f / y : null;
  };
  for (let m = 0; m < 4; m++) {
    s();
    const f = m % 2 === 0 ? a.slice(1) : a.slice(1).reverse();
    for (const y of f)
      y.sort((v, I) => {
        const g = d(v), l = d(I);
        return g === null && l === null ? 0 : g === null ? 1 : l === null ? -1 : g - l;
      }), s();
  }
  const r = a.map(
    (m) => m.reduce((f, y) => f + y.h, 0) + pa * (m.length - 1)
  ), c = Math.max(...r);
  let h = 0;
  return a.forEach((m, f) => {
    const y = Math.max(...m.map((I) => I.w));
    h += y / 2;
    let v = (c - r[f]) / 2;
    for (const I of m)
      v += I.h / 2, i[I.id] = { x: h, y: v }, v += I.h / 2 + pa;
    h += y / 2 + Xc;
  }), i;
}
function op(e) {
  const t = /* @__PURE__ */ new Set();
  for (const i of e.boundedContexts ?? []) {
    for (const n of i.useCases ?? []) n.derived && t.add(n.id);
    for (const n of i.queryServices ?? []) n.derived && t.add(n.id);
    for (const n of i.domainEvents ?? []) n.derived && t.add(n.id);
  }
  return t;
}
function sp(e, t) {
  return t.size ? {
    ...e,
    nodes: e.nodes.map((i) => t.has(i.id) && !i.derived ? { ...i, derived: !0 } : i)
  } : e;
}
function rp(e) {
  const t = new Set(e.nodes.filter((i) => i.derived).map((i) => i.id));
  return t.size ? {
    ...e,
    nodes: e.nodes.filter((i) => !i.derived),
    edges: e.edges.filter((i) => !t.has(i.sourceId) && !t.has(i.targetId))
  } : e;
}
var dp = Object.defineProperty, lp = Object.getOwnPropertyDescriptor, Be = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? lp(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (a = (n ? s(t, i, a) : s(a)) || a);
  return n && a && dp(t, i, a), a;
};
const cp = /* @__PURE__ */ new Set([
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
let Me = class extends Ve {
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
      const a = e.shiftKey || this._space || e.button === 1, o = a ? null : this.plateAt(e);
      if (!o && !a && !e.altKey) {
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
        mode: o ? "node" : a ? "pan" : "orbit",
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
      var n, a;
      if (!this._drag) return;
      const t = e.clientX - this._drag.x, i = e.clientY - this._drag.y;
      if (this._drag.mode === "connect" && this._connect) {
        const o = this.getBoundingClientRect();
        this._connect = { ...this._connect, x2: e.clientX - o.left, y2: e.clientY - o.top };
        const s = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY), d = (a = s == null ? void 0 : s.closest) == null ? void 0 : a.call(s, ".n3"), r = (d == null ? void 0 : d.dataset.nodeId) ?? null;
        this._hoverTargetId = r !== this._connect.sourceId ? r : null;
        return;
      }
      if (this._drag.mode === "rubber" && this._rubber) {
        Math.hypot(t, i) > 3 && (this._drag.moved = !0);
        const o = this.getBoundingClientRect();
        this._rubber = { ...this._rubber, x2: e.clientX - o.left, y2: e.clientY - o.top };
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
        if (e.mode === "rubber") {
          const i = this._rubber;
          if (this._rubber = null, i && e.moved) {
            const n = this.getBoundingClientRect(), a = Math.min(i.x1, i.x2) + n.left, o = Math.max(i.x1, i.x2) + n.left, s = Math.min(i.y1, i.y2) + n.top, d = Math.max(i.y1, i.y2) + n.top, r = [];
            this.renderRoot.querySelectorAll(".n3").forEach((c) => {
              const h = c.getBoundingClientRect(), m = h.left + h.width / 2, f = h.top + h.height / 2, y = c.dataset.nodeId;
              y && m >= a && m <= o && f >= s && f <= d && r.push(y);
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
      var n, a, o;
      const t = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e.clientX, e.clientY);
      if ((a = t == null ? void 0 : t.closest) != null && a.call(t, ".chev3")) return;
      const i = ((o = t == null ? void 0 : t.closest) == null ? void 0 : o.call(t, ".n3")) ?? this.plateAt(e);
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
    var n, a, o;
    const i = (n = this.shadowRoot) == null ? void 0 : n.elementFromPoint(e, t);
    return ((o = (a = i == null ? void 0 : i.closest) == null ? void 0 : a.call(i, ".n3")) == null ? void 0 : o.dataset.nodeId) ?? null;
  }
  /**
   * A client point → the floor plane (z=0), exactly: rebuild the CSS projection
   * (perspective with its origin + the world transform) as a DOMMatrix and solve
   * the 2×2 system the perspective divide leaves for a point known to sit at z=0.
   */
  sceneFromClient(e, t) {
    const i = this.getBoundingClientRect(), n = i.width * 0.5, a = i.height * 0.42, o = new DOMMatrix();
    o.m34 = -1 / 1600;
    const s = new DOMMatrix().translate(n, a).multiply(o).translate(-n, -a).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), d = s.transformPoint(new DOMPoint(0, 0, 0, 1)), r = s.transformPoint(new DOMPoint(1, 0, 0, 0)), c = s.transformPoint(new DOMPoint(0, 1, 0, 0)), h = e - i.left, m = t - i.top, f = r.x - h * r.w, y = c.x - h * c.w, v = r.y - m * r.w, I = c.y - m * c.w, g = h * d.w - d.x, l = m * d.w - d.y, u = f * I - y * v;
    return u ? { x: (g * I - y * l) / u, y: (f * l - g * v) / u } : { ...this._center };
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
    const i = this.scene.edges.find((d) => d.id === e.targetId.slice(11)), n = i ? t.get(i.sourceId) : void 0, a = i ? t.get(i.targetId) : void 0;
    if (!n || !a) return null;
    const o = this.depths(), s = ((o.get(n.id) ?? 0) + (o.get(a.id) ?? 0)) / 2 * 30 + 2;
    return {
      id: "",
      label: "",
      kind: "edge-anchor",
      x: (n.x + a.x) / 2,
      y: (n.y + a.y) / 2,
      w: 0,
      h: 0,
      z: s
    };
  }
  /** Containment depth: how many parents above the node (0 = floor plate). */
  depths() {
    const e = new Map(this.scene.nodes.map((n) => [n.id, n])), t = /* @__PURE__ */ new Map(), i = (n) => {
      const a = t.get(n.id);
      if (a !== void 0) return a;
      const o = n.ownerId ?? n.parentId, s = o ? e.get(o) : void 0, d = s ? i(s) + 1 : 0;
      return t.set(n.id, d), d;
    };
    for (const n of this.scene.nodes) i(n);
    return t;
  }
  render() {
    const e = this.scene.nodes;
    if (!e.length)
      return $`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((g) => [g.id, g])), n = Math.min(...e.map((g) => g.x - g.w / 2)) - 60, a = Math.max(...e.map((g) => g.x + g.w / 2)) + 60, o = Math.min(...e.map((g) => g.y - g.h / 2)) - 60, s = Math.max(...e.map((g) => g.y + g.h / 2)) + 60, d = (n + a) / 2, r = (o + s) / 2, c = this.getBoundingClientRect(), h = c.width ? Math.min(c.width / (a - n), c.height / (s - o), 1) * 0.9 : 0.5, m = this._k * h;
    this._kUsed = m, this._center = { x: d, y: r };
    const f = 30, y = this._liveMove, v = (g) => g.x + ((y == null ? void 0 : y.id) === g.id ? y.dx : 0), I = (g) => g.y + ((y == null ? void 0 : y.id) === g.id ? y.dy : 0);
    return $`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${m}, ${m}, ${m}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-d}px, ${-r}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${n}px; top: ${o}px"
            width=${a - n}
            height=${s - o}
            viewBox="${n} ${o} ${a - n} ${s - o}"
          >
            ${this.scene.edges.map((g) => {
      const l = i.get(g.sourceId), u = i.get(g.targetId) ?? this.edgeAnchorOf(g, i);
      return !l || !u ? "" : ee`<line
                x1=${v(l)} y1=${I(l)} x2=${v(u)} y2=${I(u)}
                stroke="#000000" stroke-width="2" opacity=${g.dim ? 0.05 : 0.22} />`;
    })}
          </svg>
          ${this.scene.edges.map((g) => {
      const l = i.get(g.sourceId), u = i.get(g.targetId) ?? this.edgeAnchorOf(g, i);
      if (!l || !u) return "";
      const x = (t.get(l.id) ?? 0) * f + 2, E = u.id ? (t.get(u.id) ?? 0) * f + 2 : u.z, N = v(u) - v(l), R = I(u) - I(l), k = E - x, T = Math.hypot(N, R), z = Math.hypot(T, k), Q = Math.atan2(R, N) * 180 / Math.PI, C = Math.atan2(k, T) * 180 / Math.PI, W = g.color ?? "#64748b", j = g.dashed ? `repeating-linear-gradient(90deg, ${W} 0 6px, transparent 6px 10px)` : W;
      return $`<div
              class="edge3"
              style="
                left: ${v(l)}px; top: ${I(l)}px; width: ${z}px; height: 1.7px;
                transform: translateZ(${x}px) rotateZ(${Q}deg) rotateY(${-C}deg);
                background: ${j};
                opacity: ${g.dim ? 0.12 : 0.9};
              "
            ></div>`;
    })}
          ${e.map((g) => {
      if (g.kind === "area")
        return $`<div
                class="area3"
                title=${g.tooltip ?? ""}
                style="left: ${v(g) - g.w / 2}px; top: ${I(g) - g.h / 2}px;
                       width: ${g.w}px; height: ${g.h}px; opacity: ${g.dim ? 0.25 : 1};"
              ></div>`;
      const l = t.get(g.id) ?? 0, u = g.container || l === 0, x = this._hoverTargetId === g.id;
      return $`
              <div
                class="n3 ${g.container ? "container3" : ""} ${this.selectedId === g.id || this._selected.has(g.id) ? "selected3" : ""} ${x ? "hover3" : ""}"
                data-node-id=${g.id}
                data-kind=${g.kind}
                title=${g.tooltip ?? g.label}
                style="
                  opacity: ${g.dim ? 0.25 : 1};
                  left: ${v(g) - g.w / 2}px; top: ${I(g) - g.h / 2}px;
                  width: ${g.w}px; height: ${g.h}px;
                  transform: translateZ(${l * f + (x ? 8 : 0)}px)${x ? " scale(1.06)" : ""};
                  background: ${g.container ? "color-mix(in srgb, " + (g.fill ?? "#ffffff") + " 82%, transparent)" : g.fill ?? "#ffffff"};
                  border-color: ${g.stroke ?? "#64748b"};
                  border-style: ${g.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${u ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${g.badge ? $`<span class="badge3" style="color: ${g.stroke ?? "#94a3b8"}">${g.badge}</span>` : ""}
                <span>${g.label}</span>
                ${g.collapsible ? $`<span
                      class="chev3"
                      data-node-id=${g.id}
                      title=${g.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}
                      >${g.collapsed ? "▸" : "▾"}</span>` : ""}
              </div>
            `;
    })}
          ${(() => {
      const g = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!g || !cp.has(g.kind)) return "";
      const l = (t.get(g.id) ?? 0) * f + 4;
      return [
        [v(g) + g.w / 2, I(g)],
        [v(g) - g.w / 2, I(g)],
        [v(g), I(g) + g.h / 2],
        [v(g), I(g) - g.h / 2]
      ].map(
        ([x, E]) => $`<div
                class="h3"
                data-source-id=${g.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${x}px; top: ${E}px; transform: translateZ(${l}px)"
              ></div>`
      );
    })()}
        </div>
      </div>
      ${this._connect ? $`<svg class="rubber">
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
      ${this._rubber ? $`<div
            class="lasso"
            style="left: ${Math.min(this._rubber.x1, this._rubber.x2)}px; top: ${Math.min(
      this._rubber.y1,
      this._rubber.y2
    )}px; width: ${Math.abs(this._rubber.x2 - this._rubber.x1)}px; height: ${Math.abs(
      this._rubber.y2 - this._rubber.y1
    )}px"
          ></div>` : ""}
      ${this._renaming ? (() => {
      const g = this.renderRoot.querySelector(
        `.n3[data-node-id="${this._renaming.id}"]`
      ), l = this.getBoundingClientRect(), u = g == null ? void 0 : g.getBoundingClientRect(), x = u ? u.left + u.width / 2 - l.left : l.width / 2, E = u ? u.bottom - l.top + 6 : l.height / 2;
      return $`<input
              class="rename3"
              style="left: ${x}px; top: ${E}px"
              .value=${this._renaming.value}
              @pointerdown=${(N) => N.stopPropagation()}
              @input=${(N) => this._renaming = { ...this._renaming, value: N.target.value }}
              @keydown=${(N) => {
        if (N.stopPropagation(), N.key === "Escape" && (this._renaming = null), N.key === "Enter") {
          const R = this._renaming, k = R.value.trim();
          this._renaming = null;
          const T = this.scene.nodes.find((z) => z.id === R.id);
          k && T && k !== T.label && this.emit("node-renamed", { id: R.id, kind: R.kind, name: k });
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
Be([
  de({ attribute: !1 })
], Me.prototype, "scene", 2);
Be([
  de({ attribute: !1 })
], Me.prototype, "selectedId", 2);
Be([
  de({ attribute: !1 })
], Me.prototype, "connectable", 2);
Be([
  B()
], Me.prototype, "_rx", 2);
Be([
  B()
], Me.prototype, "_rz", 2);
Be([
  B()
], Me.prototype, "_k", 2);
Be([
  B()
], Me.prototype, "_pan", 2);
Be([
  B()
], Me.prototype, "_liveMove", 2);
Be([
  B()
], Me.prototype, "_connect", 2);
Be([
  B()
], Me.prototype, "_hoverTargetId", 2);
Be([
  B()
], Me.prototype, "_selected", 2);
Be([
  B()
], Me.prototype, "_rubber", 2);
Be([
  B()
], Me.prototype, "_renaming", 2);
Me = Be([
  mt("modux-tilt")
], Me);
var pp = Object.defineProperty, up = Object.getOwnPropertyDescriptor, we = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? up(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (a = (n ? s(t, i, a) : s(a)) || a);
  return n && a && pp(t, i, a), a;
};
const ma = [
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
let me = class extends Ve {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.pages = [], this.selectedCmpId = null, this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._dragWizKey = null, this._overCmpId = null, this._overCmpPos = "into", this._foreignOver = !1, this._activeTabs = {};
  }
  emitEvent(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  /** The mock control a field renders as — inferred from stereotype, then type. */
  control(e) {
    const t = e.stereotype ?? "";
    return ["textarea", "richText", "html", "markdown"].includes(t) ? $`<div class="control area">…</div>` : ["checkbox", "toggle"].includes(t) || e.type === "BOOLEAN" ? $`<div class="control check"><span class="box"></span>Sí/No</div>` : ["select", "combobox", "listBox", "radio", "choice"].includes(t) || e.type === "ENUM" ? $`<div class="control"><span>Seleccionar…</span><span>▾</span></div>` : t === "password" ? $`<div class="control">••••••••</div>` : t === "email" ? $`<div class="control">nombre@dominio.com</div>` : t === "money" ? $`<div class="control"><span>0,00</span><span>€</span></div>` : t === "slider" ? $`<div class="control">──────●──</div>` : t === "stars" ? $`<div class="control">★★★☆☆</div>` : ["image", "icon"].includes(t) ? $`<div class="control area">🖼</div>` : t === "link" ? $`<div class="control" style="color:#0284c7">enlace ↗</div>` : e.type === "MODEL" ? $`<div class="nested">${e.name} (modelo anidado)</div>` : ["LOCALDATE", "DATE", "LOCALDATETIME"].includes(e.type ?? "") ? $`<div class="control"><span>dd/mm/aaaa</span><span>📅</span></div>` : ["INT", "INTEGER", "LONG", "DOUBLE", "FLOAT", "DECIMAL", "BIGDECIMAL"].includes(e.type ?? "") ? $`<div class="control" style="justify-content:flex-end">0</div>` : $`<div class="control">Texto…</div>`;
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
      for (const o of a ?? [])
        o.id === e && (t = o), i(o.children);
    };
    return i((n = this.page) == null ? void 0 : n.content), t;
  }
  /** The parent of each node in the content tree (null at the root). */
  parentOf(e) {
    var n;
    let t = null;
    const i = (a, o) => {
      for (const s of a ?? [])
        s.id === e && (t = o), i(s.children, s);
    };
    return i((n = this.page) == null ? void 0 : n.content, null), t;
  }
  /** True when `id` lives inside the subtree rooted at `rootId` (or IS it). */
  isWithin(e, t) {
    var o;
    let i = !1;
    const n = (s) => {
      s.id === e && (i = !0);
      for (const d of s.children ?? []) n(d);
    }, a = (s) => {
      for (const d of s ?? [])
        d.id === t ? n(d) : a(d.children);
    };
    return a((o = this.page) == null ? void 0 : o.content), i;
  }
  /** The sibling right after `componentId` under its parent (null when it closes the list). */
  nextSiblingOf(e) {
    var a;
    const t = this.parentOf(e), i = t ? t.children ?? [] : ((a = this.page) == null ? void 0 : a.content) ?? [], n = i.findIndex((o) => o.id === e);
    return n >= 0 ? i[n + 1] ?? null : null;
  }
  /** Sibling slot vs inside, from where the pointer is over the node's box. */
  dropPosFor(e, t) {
    if (e.kind === "tab") return "into";
    const i = t.currentTarget.getBoundingClientRect(), n = (t.clientY - i.top) / Math.max(1, i.height);
    return me.LEAF_KINDS.has(e.kind) ? n < 0.5 ? "before" : "after" : n < 0.2 ? "before" : n > 0.8 ? "after" : "into";
  }
  /** The landing slot for a drop on `target`: a parent + the sibling to slot before. */
  slotFor(e, t) {
    var a;
    if (t === "into" && e.kind === "tabLayout") {
      const o = this._dragCmpId ? this.nodeById(this._dragCmpId) : null;
      if ((o == null ? void 0 : o.kind) === "tab") return { toParentId: e.id, beforeComponentId: null };
      const s = (e.children ?? []).filter((r) => r.kind === "tab"), d = s.find((r) => r.id === this._activeTabs[e.id]) ?? s[0];
      d && (e = d);
    }
    if (t === "into" && !me.LEAF_KINDS.has(e.kind))
      return { toParentId: e.id, beforeComponentId: null };
    const i = this.parentOf(e.id), n = t === "after" ? ((a = this.nextSiblingOf(e.id)) == null ? void 0 : a.id) ?? null : e.id;
    return { toParentId: (i == null ? void 0 : i.id) ?? null, beforeComponentId: n };
  }
  onCmpDrop(e, t, i) {
    var o, s;
    const n = this._dragCmpId;
    if (this._dragCmpId = null, this._overCmpId = null, !n) {
      const d = (o = i == null ? void 0 : i.dataTransfer) == null ? void 0 : o.getData("application/x-modux-cmp");
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
    const a = this.slotFor(e, t);
    a.beforeComponentId !== n && this.emitEvent("component-moved", { componentId: n, ...a });
  }
  /** A progress-like bar, the shared stub for progressBar/meter/taskProgress. */
  barStub(e, t = "#0284c7") {
    return $`<div style="height:8px;border-radius:4px;background:#e2e8f0;overflow:hidden">
      <div style="width:${e}%;height:100%;background:${t}"></div></div>`;
  }
  /** ① — ② — ③ with the given step active: wizard headers and progressSteps. */
  stepsStub(e) {
    return $`<div class="stub-row" style="justify-content:center;gap:0;margin-bottom:6px">
      ${[0, 1, 2].map((t) => $`
        <span class="stub-step ${t <= e ? "on" : ""}">${t + 1}</span>
        ${t < 2 ? $`<span style="width:26px;height:1.5px;background:${t < e ? "#0284c7" : "#e2e8f0"}"></span>` : re}`)}
    </div>`;
  }
  /** One node of the composed page: a labeled, droppable, clickable mockup. */
  renderComponent(e) {
    var r, c, h;
    const t = e.children ?? [], i = (m) => m.map((f) => this.renderComponent(f)), n = $`<div class="placeholder">suelta componentes aquí</div>`;
    let a;
    switch (e.kind) {
      case "horizontalLayout":
        a = $`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "splitLayout": {
        const m = t.slice(0, Math.ceil(t.length / 2)), f = t.slice(Math.ceil(t.length / 2));
        a = $`<div class="row-lay">
          <div class="col-lay">${m.length ? i(m) : n}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? i(f) : n}</div>
        </div>`;
        break;
      }
      case "formLayout":
        a = $`<div class="grid-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        a = $`<div class="grid3-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "tabLayout": {
        const m = t.filter((y) => y.kind === "tab"), f = m.find((y) => y.id === this._activeTabs[e.id]) ?? m[0];
        a = $`
          <div class="tabbar">
            ${m.map(
          (y, v) => $`<span
                class=${y === f ? "on" : ""}
                draggable="true"
                title="Click: ver y seleccionar la pestaña · doble click: configurarla · arrastra para reordenar"
                @click=${(I) => {
            I.stopPropagation(), this._activeTabs = { ...this._activeTabs, [e.id]: y.id }, this.emitEvent("component-selected", { componentId: y.id });
          }}
                @dblclick=${(I) => {
            I.stopPropagation(), this._cmp = { ...y };
          }}
                @dragstart=${(I) => {
            var g, l;
            I.stopPropagation(), this._dragCmpId = y.id, (l = I.dataTransfer) == null || l.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (g = this.page) == null ? void 0 : g.id, componentId: y.id })
            );
          }}
                @dragover=${(I) => {
            var g;
            ((g = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : g.kind) === "tab" && (I.preventDefault(), I.stopPropagation());
          }}
                @drop=${(I) => {
            var E, N;
            const g = this._dragCmpId;
            if (!g || g === y.id || ((E = this.nodeById(g)) == null ? void 0 : E.kind) !== "tab") return;
            I.preventDefault(), I.stopPropagation();
            const l = I.currentTarget.getBoundingClientRect(), x = I.clientX - l.left < l.width / 2 ? y.id : ((N = m[v + 1]) == null ? void 0 : N.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, x !== g && this.emitEvent("component-moved", {
              componentId: g,
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
        a = $`<div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "accordionLayout":
        a = $`<div class="col-lay">
          ${t.length ? t.map(
          (m, f) => $`
                  <div class="acc-bar"><span>${m.title ?? m.label ?? "Sección"}</span><span>${f === 0 ? "▾" : "▸"}</span></div>
                  ${f === 0 ? this.renderComponent(m) : re}
                `
        ) : n}
        </div>`;
        break;
      case "card":
        a = $`<div class="card-box">
          ${e.title ? $`<div class="card-title">${e.title}</div>` : re}
          <div class="col-lay">${t.length ? i(t) : n}</div>
        </div>`;
        break;
      case "boardLayout":
        a = $`<div class="grid3-lay">
          ${t.length ? t.map((m) => $`<div class="board-col">${this.renderComponent(m)}</div>`) : n}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [m, ...f] = t;
        a = $`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${m ? this.renderComponent(m) : $`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${f.length ? i(f) : $`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        a = $`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "carouselLayout":
        a = $`<div class="row-lay">${t.length ? i(t) : n}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        a = $`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : n}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const f = e.modelId && e.modelId === ((r = this.page) == null ? void 0 : r.modelId) ? ((c = this.page) == null ? void 0 : c.viewmodelFields) ?? [] : [];
        a = f.length ? $`<div class="grid-lay">
              ${f.slice(0, 6).map(
          (y) => $`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${y.label ?? y.name}</label>${this.control(y)}</div>`
        )}
            </div>` : $`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const m = (((h = this.page) == null ? void 0 : h.viewmodelFields) ?? []).slice(0, 4);
        a = $`<table>
            <tr>${m.length ? m.map((f) => $`<th>${f.label ?? f.name}</th>`) : $`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => $`<tr>${(m.length ? m : [1, 2, 3]).map(() => $`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? re : $`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        a = $`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const m = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        a = $`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(m)}`;
        break;
      }
      case "text":
        a = $`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        a = $`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        a = $`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      // ---- Mateu design-contract containers ----
      case "section":
        a = $`<div class="acc-bar"><span>${e.title ?? "Sección"}</span></div>
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "zones":
        a = $`<div class="row-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "toolbar":
        a = $`<div class="row-lay" style="align-items:center">
          ${t.length ? i(t) : $`<span class="btn" style="display:inline-block;flex:none">Acción</span>${n}`}
        </div>`;
        break;
      case "pageHeader":
        a = $`<div class="row-lay" style="align-items:center">
          <div style="flex:2;font-size:15px;font-weight:800;color:#0f172a">${e.title ?? "Título de la página"}</div>
          ${t.length ? i(t) : re}
        </div>`;
        break;
      case "hero":
        a = $`<div style="background:#0f172a;color:#f8fafc;border-radius:10px;padding:22px 18px;text-align:center">
            <div style="font-size:17px;font-weight:800">${e.title ?? "Un titular que vende"}</div>
            <div style="font-size:11px;color:#cbd5e1;margin-top:4px">${e.text ?? "El subtítulo que lo explica"}</div>
          </div>
          ${t.length ? $`<div class="col-lay" style="margin-top:6px">${i(t)}</div>` : re}`;
        break;
      case "scoreboard":
        a = $`<div class="grid3-lay">${t.length ? i(t) : $`
          <div class="card-box metric"><div class="num">12</div><div class="cap">KPI</div></div>
          <div class="card-box metric"><div class="num">3,4</div><div class="cap">KPI</div></div>
          <div class="card-box metric"><div class="num">56%</div><div class="cap">KPI</div></div>`}</div>`;
        break;
      case "wizard":
        a = $`${this.stepsStub(0)}
          <div class="col-lay">${t.length ? i(t) : n}</div>`;
        break;
      case "app":
        a = $`<div class="appbar">⛭ ${e.title ?? "app"}</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : n}</div>`;
        break;
      // ---- Mateu design-contract leaves ----
      case "crud":
        a = $`<div class="row-lay" style="align-items:center;margin-bottom:6px">
            <div class="control" style="flex:1">Buscar…</div>
            <span class="btn" style="display:inline-block;flex:none">Nuevo</span>
          </div>
          <table>
            <tr><th>col 1</th><th>col 2</th><th>col 3</th></tr>
            ${[1, 2].map(() => $`<tr><td>···</td><td>···</td><td>···</td></tr>`)}
          </table>`;
        break;
      case "filterBar":
        a = $`<div class="row-lay" style="align-items:center">
          ${["Estado ▾", "Fecha ▾", "Tipo ▾"].map((m) => $`<span class="control" style="flex:none;font-size:11px">${m}</span>`)}
          <div class="control" style="flex:1">Buscar…</div>
        </div>`;
        break;
      case "fab":
        a = $`<div style="display:flex;justify-content:flex-end"><span
          style="width:34px;height:34px;border-radius:50%;background:#0284c7;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700">+</span></div>`;
        break;
      case "appContext":
        a = $`<span class="control" style="display:inline-flex;min-width:130px">${e.label ?? "Contexto"}&nbsp;<span>▾</span></span>`;
        break;
      case "kpi":
      case "stat":
        a = $`<div class="card-box metric"><div class="num">1.234</div><div class="cap">${e.title ?? (e.kind === "kpi" ? "KPI" : "Estadística")}</div></div>`;
        break;
      case "notice":
        a = $`<div class="notice-stub">ℹ️ ${e.text ?? "Un aviso para el usuario"}</div>`;
        break;
      case "banner":
        a = $`<div class="notice-stub" style="background:#fef3c7;border-color:#f59e0b;color:#92400e">📣 ${e.text ?? e.title ?? "Banner destacado"}</div>`;
        break;
      case "calloutCard":
        a = $`<div class="card-box"><div class="card-title">💡 ${e.title ?? "Callout"}</div>
          <div class="text-stub">${e.text ?? "Algo que merece atención especial."}</div></div>`;
        break;
      case "bulletedList":
        a = $`<div class="text-stub">${["Primer punto", "Segundo punto", "Tercer punto"].map((m) => $`<div>• ${m}</div>`)}</div>`;
        break;
      case "statusList":
        a = $`<div class="col-lay" style="gap:3px">${[["#16a34a", "Operativo"], ["#f59e0b", "Degradado"], ["#dc2626", "Caído"]].map(
          ([m, f]) => $`<div class="stub-row"><span class="stub-dot" style="background:${m}"></span>${f}</div>`
        )}</div>`;
        break;
      case "checklist":
        a = $`<div class="col-lay" style="gap:3px">${[["☑", "Hecho"], ["☑", "También hecho"], ["☐", "Pendiente"]].map(
          ([m, f]) => $`<div class="stub-row"><span>${m}</span>${f}</div>`
        )}</div>`;
        break;
      case "fileList":
        a = $`<div class="col-lay" style="gap:3px">${["contrato.pdf · 1,2 MB", "foto.png · 340 KB"].map(
          (m) => $`<div class="stub-row">📄 ${m}</div>`
        )}</div>`;
        break;
      case "separator":
        a = $`<div style="border-top:1.5px solid #e2e8f0;margin:6px 0"></div>`;
        break;
      case "entityHeader":
        a = $`<div style="display:flex;gap:10px;align-items:center">
          <div style="width:34px;height:34px;border-radius:50%;background:#e0f2fe;display:flex;align-items:center;justify-content:center;font-weight:800;color:#0284c7">A</div>
          <div><div style="font-weight:800;color:#0f172a;font-size:13px">${e.title ?? "Entidad"}</div>
            <div style="font-size:10.5px;color:#94a3b8">${e.text ?? "metadatos · estado"}</div></div>
        </div>`;
        break;
      case "emptyState":
        a = $`<div class="empty" style="padding:14px">🗇<br />${e.text ?? "Nada por aquí todavía"}</div>`;
        break;
      case "skeleton":
        a = $`<div class="col-lay" style="gap:5px">${[80, 60, 72].map(
          (m) => $`<div style="height:9px;border-radius:5px;background:#e2e8f0;width:${m}%"></div>`
        )}</div>`;
        break;
      case "progressBar":
        a = this.barStub(40);
        break;
      case "meter":
        a = this.barStub(72, "#16a34a");
        break;
      case "taskProgress":
        a = $`<div class="stub-row" style="margin-bottom:3px">${e.title ?? "Tareas"} · 3/5</div>${this.barStub(60)}`;
        break;
      case "progressSteps":
        a = this.stepsStub(1);
        break;
      case "timeline":
        a = $`<div class="col-lay" style="gap:0">${["Creado", "Aprobado", "Enviado"].map(
          (m, f) => $`<div class="stub-row" style="align-items:stretch;gap:8px">
            <div style="display:flex;flex-direction:column;align-items:center"><span class="stub-dot" style="background:#0284c7"></span>${f < 2 ? $`<span style="flex:1;width:1.5px;background:#e2e8f0;min-height:10px"></span>` : re}</div>
            <span style="padding-bottom:8px">${m}</span></div>`
        )}</div>`;
        break;
      case "calendar":
        a = $`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;font-size:9px;color:#64748b;text-align:center">
          ${["L", "M", "X", "J", "V", "S", "D"].map((m) => $`<span style="font-weight:700">${m}</span>`)}
          ${Array.from({ length: 14 }, (m, f) => $`<span style="padding:2px;border-radius:4px;${f === 9 ? "background:#0284c7;color:#fff" : "background:#f8fafc"}">${f + 1}</span>`)}
        </div>`;
        break;
      case "kanban":
        a = $`<div class="grid3-lay">${["Por hacer", "En curso", "Hecho"].map(
          (m, f) => $`<div class="board-col"><div class="stub-row" style="font-weight:700">${m}</div>
            ${Array.from({ length: 2 - f % 2 }, () => $`<div class="card-box" style="padding:6px;font-size:10px;color:#94a3b8">tarjeta</div>`)}</div>`
        )}</div>`;
        break;
      case "gantt":
        a = $`<div class="col-lay" style="gap:4px">${[[0, 45, "Análisis"], [30, 40, "Diseño"], [55, 45, "Build"]].map(
          ([m, f, y]) => $`<div class="stub-row"><span style="flex:0 0 52px">${y}</span>
            <div style="flex:1;height:9px;border-radius:5px;background:#f1f5f9"><div style="margin-left:${m}%;width:${f}%;height:100%;border-radius:5px;background:#0284c7"></div></div></div>`
        )}</div>`;
        break;
      case "trendChart":
        a = $`<svg viewBox="0 0 100 28" style="width:100%;height:38px" preserveAspectRatio="none">
          <polyline points="0,24 18,18 36,20 54,10 72,13 100,3" fill="none" stroke="#0284c7" stroke-width="2" />
        </svg>`;
        break;
      case "heatmap":
        a = $`<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px">
          ${[3, 6, 2, 8, 5, 1, 7, 4, 9, 2, 6, 3, 8, 5].map((m) => $`<span style="height:12px;border-radius:3px;background:rgba(2,132,199,${m / 10})"></span>`)}
        </div>`;
        break;
      case "funnel":
        a = $`<div class="col-lay" style="gap:3px;align-items:center">${[100, 70, 45, 25].map(
          (m) => $`<div style="width:${m}%;height:11px;border-radius:5px;background:#0284c7;opacity:${m / 100}"></div>`
        )}</div>`;
        break;
      case "orgChart":
        a = $`<div class="col-lay" style="gap:4px;align-items:center">
          <span class="control" style="flex:none;font-size:10px">Dirección</span>
          <div class="row-lay" style="width:80%">${["Área A", "Área B"].map((m) => $`<span class="control" style="font-size:10px;justify-content:center">${m}</span>`)}</div>
        </div>`;
        break;
      case "featureGrid":
        a = $`<div class="grid3-lay">${["⚡ Rápido", "🔒 Seguro", "🧩 Modular"].map(
          (m) => $`<div class="card-box" style="text-align:center;font-size:11px;color:#334155">${m}</div>`
        )}</div>`;
        break;
      case "testimonials":
        a = $`<div class="card-box"><div class="text-stub">«${e.text ?? "Nos cambió la forma de trabajar."}»</div>
          <div style="font-size:10.5px;color:#94a3b8;margin-top:4px">— Cliente contento</div></div>`;
        break;
      case "faq":
        a = $`<div class="col-lay" style="gap:3px">${["¿Cómo empiezo?", "¿Cuánto cuesta?"].map(
          (m) => $`<div class="acc-bar"><span>${m}</span><span>▸</span></div>`
        )}</div>`;
        break;
      case "commentThread":
        a = $`<div class="col-lay" style="gap:4px">${[["Ana", "Esto está casi listo"], ["Luis", "Le doy un repaso y cierro"]].map(
          ([m, f]) => $`<div class="card-box" style="padding:6px 8px"><span style="font-size:10px;font-weight:700;color:#0284c7">${m}</span>
            <span class="text-stub"> ${f}</span></div>`
        )}</div>`;
        break;
      case "comparisonCard":
        a = $`<div class="grid-lay">${["Básico", "Pro"].map(
          (m, f) => $`<div class="card-box" style="text-align:center"><div class="card-title">${m}</div>
            <div class="text-stub">✓ Una cosa<br />${f ? "✓" : "✕"} Otra cosa</div></div>`
        )}</div>`;
        break;
      // ---- Mateu enterprise/booking wave ----
      case "planningBoard":
        a = $`<div class="col-lay" style="gap:4px">${[["Recurso A", 10, 35], ["Recurso B", 40, 30], ["Recurso C", 20, 50]].map(
          ([m, f, y]) => $`<div class="stub-row"><span style="flex:0 0 64px">${m}</span>
            <div style="flex:1;height:14px;border-radius:4px;background:#f1f5f9"><div style="margin-left:${f}%;width:${y}%;height:100%;border-radius:4px;background:#0284c7;opacity:.85"></div></div></div>`
        )}
          <div class="stub-row" style="justify-content:space-between;color:#94a3b8;font-size:9px"><span>lun</span><span>mié</span><span>vie</span><span>dom</span></div>`;
        break;
      case "offerCard":
        a = $`<div class="card-box" style="display:flex;gap:10px;align-items:center">
          <div style="width:44px;height:44px;border-radius:8px;background:#e0f2fe"></div>
          <div style="flex:1"><div class="card-title">${e.title ?? "Una oferta irresistible"}</div>
            <div class="text-stub">✓ Ventaja uno · ✓ Ventaja dos</div></div>
          <span class="btn" style="flex:none">59 € · Añadir</span>
        </div>`;
        break;
      case "addOnPicker":
        a = $`<div class="col-lay" style="gap:3px">${[["🧖", "Spa", "25 €"], ["🍳", "Desayuno", "12 €"]].map(
          ([m, f, y]) => $`<div class="stub-row" style="justify-content:space-between"><span>${m} ${f}</span><span class="btn" style="font-size:10px;padding:2px 8px">${y} +</span></div>`
        )}
          <div class="stub-row" style="justify-content:flex-end;font-weight:700">Total: 37 €</div>`;
        break;
      case "paymentPicker":
        a = $`<div class="col-lay" style="gap:4px">
          <div class="row-lay">${["💳 Tarjeta", "🏦 Transferencia"].map((m, f) => $`<span class="control" style="justify-content:center;font-size:11px;${f === 0 ? "border-color:#0284c7" : ""}">${m}</span>`)}</div>
          <span class="btn" style="text-align:center">Confirmar y pagar</span></div>`;
        break;
      case "pricingTable":
        a = $`<div class="grid-lay">${[["Básico", "9 €/mes", ""], ["Pro", "29 €/mes", "border-color:#0284c7"]].map(
          ([m, f, y]) => $`<div class="card-box" style="text-align:center;${y}"><div class="card-title">${m}</div>
            <div style="font-size:16px;font-weight:800;color:#0f172a">${f}</div>
            <div class="text-stub">✓ Una cosa<br />✓ Otra cosa</div>
            <span class="btn" style="display:inline-block;margin-top:4px;font-size:10px">Elegir</span></div>`
        )}</div>`;
        break;
      case "processMonitor":
        a = $`<div class="col-lay" style="gap:3px">${[["Nóminas", "#16a34a", "OK"], ["Facturación", "#f59e0b", "2 avisos"]].map(
          ([m, f, y]) => $`<div class="stub-row" style="justify-content:space-between"><span><span class="stub-dot" style="background:${f};display:inline-block;margin-right:6px"></span>${m}</span><span style="color:#94a3b8">${y}</span></div>`
        )}</div>`;
        break;
      case "resourceGrid":
        a = $`<div class="grid3-lay">${["Estándar", "Superior ★", "Suite"].map(
          (m, f) => $`<div class="card-box" style="text-align:center;font-size:11px;${f === 1 ? "border-color:#0284c7" : ""}">${m}<br /><span style="color:#94a3b8;font-size:10px">${f === 1 ? "recomendada" : "disponible"}</span></div>`
        )}</div>`;
        break;
      case "taskQueue":
        a = $`<div class="acc-bar"><span>Pendientes (2)</span></div>
          <div class="col-lay" style="gap:3px">${["Revisar contrato", "Llamar al cliente"].map(
          (m) => $`<div class="stub-row">☐ ${m}</div>`
        )}</div>`;
        break;
      case "ledger":
        a = $`<div class="col-lay" style="gap:2px">${[["Habitación", "240 €"], ["Spa", "25 €"], ["Desayuno", "incluido"]].map(
          ([m, f]) => $`<div class="stub-row" style="justify-content:space-between"><span>${m}</span><span>${f}</span></div>`
        )}
          <div class="stub-row" style="justify-content:space-between;font-weight:800;border-top:1.5px solid #e2e8f0;padding-top:3px"><span>Total</span><span>265 €</span></div>`;
        break;
      case "chat":
        a = $`<div class="col-lay" style="gap:4px">
          <div class="card-box" style="padding:6px 8px;max-width:75%">Hola, ¿en qué puedo ayudarte?</div>
          <div class="card-box" style="padding:6px 8px;max-width:75%;align-self:flex-end;background:#e0f2fe">Quería una reserva…</div>
          <div class="control">Escribe un mensaje…</div></div>`;
        break;
      case "markdown":
        a = $`<div class="text-stub"><b># Título</b><br />Texto con <b>**negritas**</b> y <span style="color:#0284c7">[enlaces]</span>…</div>`;
        break;
      case "breadcrumbs":
        a = $`<div class="stub-row" style="color:#94a3b8">Inicio <span>›</span> Sección <span>›</span> <span style="color:#0f172a;font-weight:600">${e.title ?? "Aquí"}</span></div>`;
        break;
      default:
        a = $`<div class="col-lay">${t.length ? i(t) : n}</div>`;
    }
    const o = me.LEAF_KINDS.has(e.kind), s = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), d = (m) => {
      var f, y;
      m.stopPropagation(), this._dragCmpId = e.id, (y = m.dataTransfer) == null || y.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (f = this.page) == null ? void 0 : f.id, componentId: e.id })
      ), m.dataTransfer && (m.dataTransfer.effectAllowed = "move");
    };
    return $`<div
      class="cmp ${o ? "leafcmp" : ""} ${s ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
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
        >${me.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${a}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, i) {
    return $`
        ${i ? $`<table>
              <tr>${t.slice(0, 4).map((n) => $`<th>${n.label ?? n.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => $`<tr>${t.slice(0, 4).map(() => $`<td>···</td>`)}</tr>`)}
            </table>` : re}
        ${t.length ? $`<div class="grid">
              ${t.map(
      (n) => $`
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
            </div>` : $`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    var a, o, s, d, r;
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
    return $`<div class="pop" @click=${(c) => c.stopPropagation()}>
      ${n ? $`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(c) => t({ title: c.target.value })} />` : re}
      ${i === "text" ? $`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(c) => t({ text: c.target.value })} />` : re}
      ${i === "button" || i === "field" ? $`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(c) => t({ label: c.target.value })} />` : re}
      ${i === "button" ? $`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? $`<span class="chip">${((a = this.useCases.find((c) => c.id === e.useCaseId)) == null ? void 0 : a.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : $`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? $`<span class="chip"
                      >${((o = this.mappings.find((c) => c.id === e.mappingId)) == null ? void 0 : o.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : $`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : re}
      ${i === "form" ? $`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? $`<span class="chip"
                      >${((s = this.models.find((c) => c.id === e.modelId)) == null ? void 0 : s.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : $`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>
            <label>Mapping</label>
            <span style="grid-column: 2 / -1">
              ${e.mappingId ? $`<span class="chip"
                      >${((d = this.mappings.find((c) => c.id === e.mappingId)) == null ? void 0 : d.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : $`<span class="vmhint">el viewmodel viaja tal cual al guardar — suelta un mapeado del Catálogo sobre el formulario</span>`}
            </span>` : re}
      ${i === "listing" || i === "crud" ? $`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? $`<span class="chip"
                      >${((r = this.queryOps.find((c) => c.id === e.queryOperationId)) == null ? void 0 : r.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : $`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>
            <label>Ficha</label>
            <select
              style="grid-column: 2 / -1"
              title="La página que abre el click en una fila"
              @change=${(c) => t({ detailPageId: c.target.value || void 0 })}
            >
              <option value="">— sin ficha —</option>
              ${this.pages.filter((c) => {
      var h;
      return c.id !== ((h = this.page) == null ? void 0 : h.id);
    }).map((c) => $`<option value=${c.id} ?selected=${c.id === e.detailPageId}>${c.name}</option>`)}
            </select>` : re}
      ${i === "field" ? $`<label>Estereotipo</label>
            <select @change=${(c) => t({ stereotype: c.target.value || void 0 })}>
              ${ma.map((c) => $`<option value=${c} ?selected=${c === (e.stereotype ?? "regular")}>${c}</option>`)}
            </select>` : re}
      ${i === "tabLayout" ? $`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : re}
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
    const i = (this.page.viewmodelFields ?? []).map((o) => o.fieldId), n = i.indexOf(t), a = i.indexOf(e);
    n < 0 || a < 0 || (i.splice(a, 0, ...i.splice(n, 1)), this.emitEvent("fields-reordered", { fieldIds: i }));
  }
  render() {
    const e = this.page;
    if (!e) return re;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId, n = e.type === "WIZARD";
    return $`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? $`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(a) => this._rename = a.target.value}
              @keydown=${(a) => {
      a.key === "Enter" && this.applyRename(), a.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : $`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
              >${e.name}</span
            >`}
        ${this._route !== null ? $`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(a) => this._route = a.target.value}
              @keydown=${(a) => {
      a.key === "Enter" && this.applyRoute(), a.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : $`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
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
      (a) => $`<span
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
        ${(e.buttons ?? []).some((a) => (a.bar ?? "toolbar") === "toolbar") ? re : $`<span class="zoneph">suelta un caso de uso aquí</span>`}
      </div>
      <div class="vm">
        viewmodel:
        ${e.modelId ? $`<span class="chip"
                >${e.modelName ?? e.modelId}
                <span
                  class="chipx"
                  title="Quitar el viewmodel"
                  @click=${() => this.emitEvent("page-model-changed", { modelId: null })}
                  >✕</span
                ></span
              >` : $`<span class="vmhint"
              >arrastra un modelo del Catálogo hasta el frame — o el asa violeta de la página, en la vista UI</span
            >`}
      </div>
      <div class="body" @click=${() => this.onBodyClick()}>
        ${n ? $`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((a, o) => {
      const s = (e.wizardSteps ?? []).map((r, c) => r.id ?? r.pageId ?? String(c)), d = s[o];
      return $`<span
                      class=${o === 0 ? "on" : ""}
                      draggable="true"
                      title="Paso ${o + 1}${a.pageId ? "" : " (sin página)"} — arrastra para reordenar"
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
        const h = r.currentTarget.getBoundingClientRect(), f = r.clientX - h.left < h.width / 2 ? d : s[o + 1] ?? null;
        f !== c && this.emitEvent("wizard-step-moved", { stepKey: c, beforeStepKey: f });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[o] ?? `${o + 1}.`} ${a.label ?? "Paso"}${a.pageId ? "" : " ⌁"}</span
                    >`;
    }) : $`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : re}
        ${(e.content ?? []).length ? $`<div class="col-lay">${(e.content ?? []).map((a) => this.renderComponent(a))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((a) => a.bar === "bottom").map(
      (a) => $`<span
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
        ${(e.buttons ?? []).some((a) => a.bar === "bottom") ? re : $`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var o, s, d;
      const a = (((o = this.page) == null ? void 0 : o.buttons) ?? []).some((r) => r.useCaseId === this._btn.useCaseId);
      return $`<div class="pop">
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
                ${this._btn.mappingId ? $`<span class="chip"
                        >${((d = this.mappings.find((r) => r.id === this._btn.mappingId)) == null ? void 0 : d.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : $`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${a ? $`<button
                      @click=${() => {
        const r = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: r });
      }}
                    >
                      Quitar
                    </button>` : re}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(a)}>Aplicar</button>
              </div>
            </div>`;
    })() : re}
      ${this._editing ? $`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(a) => this._editing = { ...this._editing, stereotype: a.target.value }}
            >
              ${ma.map(
      (a) => $`<option value=${a} ?selected=${a === this._editing.stereotype}>${a}</option>`
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
          </div>` : re}
    `;
  }
};
me.styles = nt`
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
me.KIND_LABELS = {
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
me.LEAF_KINDS = /* @__PURE__ */ new Set([
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
we([
  de({ attribute: !1 })
], me.prototype, "page", 2);
we([
  de({ type: Boolean, reflect: !0 })
], me.prototype, "framed", 2);
we([
  de({ attribute: !1 })
], me.prototype, "models", 2);
we([
  de({ attribute: !1 })
], me.prototype, "mappings", 2);
we([
  de({ attribute: !1 })
], me.prototype, "useCases", 2);
we([
  de({ attribute: !1 })
], me.prototype, "queryOps", 2);
we([
  de({ attribute: !1 })
], me.prototype, "pages", 2);
we([
  de({ attribute: !1 })
], me.prototype, "selectedCmpId", 2);
we([
  B()
], me.prototype, "_editing", 2);
we([
  B()
], me.prototype, "_dragId", 2);
we([
  B()
], me.prototype, "_overId", 2);
we([
  B()
], me.prototype, "_rename", 2);
we([
  B()
], me.prototype, "_route", 2);
we([
  B()
], me.prototype, "_btn", 2);
we([
  B()
], me.prototype, "_cmp", 2);
we([
  B()
], me.prototype, "_dragCmpId", 2);
we([
  B()
], me.prototype, "_dragWizKey", 2);
we([
  B()
], me.prototype, "_overCmpId", 2);
we([
  B()
], me.prototype, "_overCmpPos", 2);
we([
  B()
], me.prototype, "_foreignOver", 2);
we([
  B()
], me.prototype, "_activeTabs", 2);
me = we([
  mt("modux-page-designer")
], me);
var mp = Object.defineProperty, fp = Object.getOwnPropertyDescriptor, Fe = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? fp(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (a = (n ? s(t, i, a) : s(a)) || a);
  return n && a && mp(t, i, a), a;
};
const uo = 460, hp = 540, gp = 660;
let Pe = class extends Ve {
  constructor() {
    super(...arguments), this.pages = [], this.layout = {}, this.sizes = {}, this.selectedId = null, this.selectedIds = [], this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmp = null, this._t = { x: 40, y: 40, k: 0.85 }, this._live = null, this._liveSize = null, this._drag = null, this.onDown = (e) => {
      if (e.button !== 0) return;
      this.focus();
      const t = e.composedPath(), i = t.find((a) => {
        var o;
        return (o = a.classList) == null ? void 0 : o.contains("frame-grip");
      });
      if (i) {
        const o = i.closest(".frame").dataset.pageId, s = this.sizeOf(o);
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "resize", id: o, x: e.clientX, y: e.clientY, w0: s.w, h0: s.h }, e.preventDefault();
        return;
      }
      const n = t.find((a) => {
        var o;
        return (o = a.classList) == null ? void 0 : o.contains("frame-title");
      });
      if (n) {
        const o = n.closest(".frame").dataset.pageId;
        if (e.shiftKey) {
          this.emit("element-multi-toggled", { id: o }), e.preventDefault();
          return;
        }
        const s = this.pages.findIndex((r) => r.id === o), d = this.posOf(o, s);
        this.emit("element-selected", { elementType: "node", id: o, kind: "page" });
        try {
          this.setPointerCapture(e.pointerId);
        } catch {
          return;
        }
        this._drag = { mode: "frame", id: o, x: e.clientX, y: e.clientY, ox: d.x, oy: d.y, moved: !1 }, e.preventDefault();
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
      const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, a = e.deltaY < 0 ? 1.1 : 1 / 1.1, o = Math.max(0.2, Math.min(2.5, this._t.k * a));
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
    var h, m, f, y, v, I;
    const i = (h = this.shadowRoot) == null ? void 0 : h.elementFromPoint(e, t), n = (m = i == null ? void 0 : i.closest) == null ? void 0 : m.call(i, ".frame");
    if (!n) return null;
    const a = n.dataset.pageId, o = n.querySelector("modux-page-designer"), s = (f = o == null ? void 0 : o.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), d = (y = s == null ? void 0 : s.closest) == null ? void 0 : y.call(s, "[data-btn-uc]");
    if (d != null && d.dataset.btnUc) return `btn:${a}:${d.dataset.btnUc}`;
    const r = (v = s == null ? void 0 : s.closest) == null ? void 0 : v.call(s, "[data-bar]");
    if (r != null && r.dataset.bar) return `bar:${a}:${r.dataset.bar}`;
    const c = (I = s == null ? void 0 : s.closest) == null ? void 0 : I.call(s, "[data-cmp-id]");
    return c ? `cmp:${a}:${c.dataset.cmpId}` : a;
  }
  /**
   * Where a drop at a client point lands: the page, the hovered node (null on the
   * frame's empty body) and the slot — before/after a sibling or inside a layout.
   */
  dropSlotAtClient(e, t) {
    var f, y, v, I;
    const i = (f = this.shadowRoot) == null ? void 0 : f.elementFromPoint(e, t), n = (y = i == null ? void 0 : i.closest) == null ? void 0 : y.call(i, ".frame");
    if (!n) return null;
    const a = n.dataset.pageId, o = n.querySelector("modux-page-designer"), s = (v = o == null ? void 0 : o.shadowRoot) == null ? void 0 : v.elementFromPoint(e, t), d = (I = s == null ? void 0 : s.closest) == null ? void 0 : I.call(s, "[data-cmp-id]");
    if (!d) return { pageId: a, componentId: null, pos: "into" };
    const r = d.dataset.cmpKind ?? "", c = d.getBoundingClientRect(), h = (t - c.top) / Math.max(1, c.height), m = me.LEAF_KINDS.has(r) ? h < 0.5 ? "before" : "after" : h < 0.2 ? "before" : h > 0.8 ? "after" : "into";
    return { pageId: a, componentId: d.dataset.cmpId, pos: m };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: uo, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * hp, y: Math.floor(t / 3) * gp };
  }
  render() {
    return $`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var a, o;
      const i = ((a = this._live) == null ? void 0 : a.id) === e.id ? this._live : this.posOf(e.id, t), n = this.sizeOf(e.id);
      return $`
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
                .selectedCmpId=${((o = this.selectedCmp) == null ? void 0 : o.pageId) === e.id ? this.selectedCmp.componentId : null}
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
      ${this.pages.length ? "" : $`<div class="empty">
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
      width: ${uo}px;
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
Fe([
  de({ attribute: !1 })
], Pe.prototype, "pages", 2);
Fe([
  de({ attribute: !1 })
], Pe.prototype, "layout", 2);
Fe([
  de({ attribute: !1 })
], Pe.prototype, "sizes", 2);
Fe([
  de({ attribute: !1 })
], Pe.prototype, "selectedId", 2);
Fe([
  de({ attribute: !1 })
], Pe.prototype, "selectedIds", 2);
Fe([
  de({ attribute: !1 })
], Pe.prototype, "models", 2);
Fe([
  de({ attribute: !1 })
], Pe.prototype, "mappings", 2);
Fe([
  de({ attribute: !1 })
], Pe.prototype, "useCases", 2);
Fe([
  de({ attribute: !1 })
], Pe.prototype, "queryOps", 2);
Fe([
  de({ attribute: !1 })
], Pe.prototype, "selectedCmp", 2);
Fe([
  B()
], Pe.prototype, "_t", 2);
Fe([
  B()
], Pe.prototype, "_live", 2);
Fe([
  B()
], Pe.prototype, "_liveSize", 2);
Pe = Fe([
  mt("modux-figma")
], Pe);
var yp = Object.defineProperty, bp = Object.getOwnPropertyDescriptor, Re = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? bp(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (a = (n ? s(t, i, a) : s(a)) || a);
  return n && a && yp(t, i, a), a;
};
const vp = {
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
}, Qi = {
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
}, xp = {
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
}, fa = [30, 20, 13, 9.5, 7.5], ha = [0, 180, 118, 80, 58], Ip = 0.055, wp = 0.86, kp = 2600, xi = 240, ga = 0.16, ya = 0.015;
let Ie = class extends Ve {
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
      sessionStorage.setItem(Ie.STORE_KEY, JSON.stringify({
        cam: this.cam,
        nodes: e,
        levels: Object.fromEntries(this.manualLevels)
      }));
    } catch {
    }
  }
  loadState() {
    try {
      const e = sessionStorage.getItem(Ie.STORE_KEY);
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
    const o = 70, s = this.clientWidth || 800, d = this.clientHeight || 600, r = n - t + o * 2, c = a - i + o * 2, h = Math.min(1.5, Math.max(0.25, Math.min(s / r, d / c)));
    this.cam.k = h, this.cam.x = s / 2 - (t + n) / 2 * h, this.cam.y = d / 2 - (i + a) / 2 * h;
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
        const o = e.get(a);
        a = o ? o.ownerId ?? o.parentId : void 0;
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
    const o = `${(a == null ? void 0 : a.key) ?? ""}/${e}:${t}`, s = this.prevByKey.get(o), d = () => (Math.random() - 0.5) * 10;
    return {
      key: o,
      refId: t,
      kind: e,
      label: i,
      color: vp[e] ?? this.pal("--modux-text-dim", "#64748b"),
      depth: n,
      parent: a,
      expanded: (s == null ? void 0 : s.expanded) ?? !1,
      x: (s == null ? void 0 : s.x) ?? (a ? a.x + d() : 0),
      y: (s == null ? void 0 : s.y) ?? (a ? a.y + d() : 0),
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
    const t = this.model, i = e.depth + 1, n = (a, o, s) => this.makeNode(a, o, s, i, e);
    if (this.scene)
      return this.scene.nodes.filter((a) => a.kind !== "area").filter((a) => e.kind === "root" ? !(a.ownerId ?? a.parentId) : (a.ownerId ?? a.parentId) === e.refId).map((a) => {
        const o = n(a.kind || "node", a.id, a.label);
        return a.stroke && (o.color = a.stroke), o;
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
        const a = t.boundedContexts.find((c) => c.id === e.refId);
        if (!a) return [];
        const o = (t.aggregates ?? []).filter((c) => c.boundedContextId === e.refId), s = a.useCases ?? [], d = new Set(o.map((c) => c.id)), r = new Set(
          (t.emissions ?? []).filter((c) => d.has(c.sourceId)).map((c) => c.domainEventId)
        );
        return [
          ...o.length ? [n("group", `aggregates:${e.refId}`, `Agregados · ${o.length}`)] : [],
          ...s.length ? [n("group", `use-cases:${e.refId}`, `Casos de uso · ${s.length}`)] : [],
          ...(a.domainEvents ?? []).filter((c) => !r.has(c.id)).map((c) => n("domain-event", c.id, c.name)),
          ...(a.applicationEvents ?? []).map((c) => n("application-event", c.id, c.name)),
          ...(a.readModels ?? []).map((c) => n("read-model", c.id, c.name)),
          ...(a.domainServices ?? []).map((c) => n("domain-service", c.id, c.name)),
          ...(a.queryServices ?? []).map((c) => n("query-service", c.id, c.name)),
          ...(a.scheduledTriggers ?? []).map((c) => n("scheduled-trigger", c.id, c.name)),
          ...(t.etlFlows ?? []).filter((c) => c.ownerBoundedContextId === e.refId).map((c) => n("etl-flow", c.id, c.name)),
          ...(t.notifications ?? []).filter((c) => c.ownerBoundedContextId === e.refId).map((c) => n("notification", c.id, c.name)),
          ...(t.documents ?? []).filter((c) => c.ownerBoundedContextId === e.refId).map((c) => n("document", c.id, c.name))
        ];
      }
      case "group": {
        const a = e.refId.indexOf(":"), o = e.refId.slice(0, a), s = e.refId.slice(a + 1), d = t.boundedContexts.find((r) => r.id === s);
        return d ? o === "aggregates" ? (t.aggregates ?? []).filter((r) => r.boundedContextId === s).map((r) => n("aggregate", r.id, r.name)) : (d.useCases ?? []).map((r) => n(r.policy ? "policy" : "use-case", r.id, r.name)) : [];
      }
      case "aggregate": {
        const a = new Set(
          (t.emissions ?? []).filter((o) => o.sourceId === e.refId).map((o) => o.domainEventId)
        );
        return [
          ...(t.entities ?? []).filter((o) => o.aggregateId === e.refId).map((o) => n("entity", o.id, o.name)),
          ...t.boundedContexts.flatMap((o) => o.domainEvents ?? []).filter((o) => a.has(o.id)).map((o) => n("domain-event", o.id, o.name))
        ];
      }
      case "external-system": {
        const a = t.externalSystems.find((o) => o.id === e.refId);
        return a ? [
          ...(t.apis ?? []).filter((o) => o.publishedByExternalSystemId === e.refId).map((o) => n("api", o.id, o.name)),
          ...(a.useCases ?? []).map((o) => n("external-use-case", o.id, o.name)),
          ...(a.tables ?? []).map((o) => n("external-table", o.id, o.name)),
          ...(a.mcpServers ?? []).map((o) => n("mcp-server", o.id, o.name))
        ] : [];
      }
      case "api": {
        const a = (t.apis ?? []).find((o) => o.id === e.refId);
        return ((a == null ? void 0 : a.operations) ?? []).map((o) => n("api-operation", o.id, o.name));
      }
      case "ui-app": {
        const a = (t.uiApps ?? []).find((d) => d.id === e.refId);
        if (!a) return [];
        const o = /* @__PURE__ */ new Set(), s = (d) => {
          for (const r of d ?? [])
            r.pageId && o.add(r.pageId), s(r.children);
        };
        s(a.menuItems);
        for (const d of [a.headerPageId, a.homePageId, a.viewPageId, a.editPageId])
          d && o.add(d);
        return [...o].map((d) => (t.pages ?? []).find((r) => r.id === d)).filter((d) => !!d).map((d) => n("page", d.id, d.name));
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
    var o;
    !e.expanded && ((o = e.children) != null && o.length) && this.toggle(e);
    const t = /* @__PURE__ */ new Set(), i = (s) => {
      for (let d = s; d; d = d.parent) t.add(d.key);
    }, n = (s) => {
      t.add(s.key);
      for (const d of s.children ?? []) n(d);
    };
    i(e), n(e);
    const a = this.related.get(e.refId);
    if (a)
      for (const s of this.allNodes)
        s.refId && a.has(s.refId) && i(s);
    this.focusKeys = t;
  }
  tick() {
    this.t += 1 / 60;
    const e = this.visible();
    this.step(e), this.stepFlight(), this.draw(e), (this.frame = (this.frame + 1) % 60) === 0 && this.saveState(), this.raf = requestAnimationFrame(() => this.tick());
  }
  step(e) {
    var o;
    const t = this.t;
    for (const s of e) {
      if (s.parent) {
        const d = (ha[Math.min(s.depth, ha.length - 1)] ?? 60) + Math.min(60, ((((o = s.parent.children) == null ? void 0 : o.length) ?? 1) - 1) * 2.5);
        let r = s.x - s.parent.x, c = s.y - s.parent.y, h = Math.hypot(r, c);
        if (h < 0.01) {
          const v = Math.random() * Math.PI * 2;
          r = Math.cos(v) * 0.1, c = Math.sin(v) * 0.1, h = 0.1;
        }
        const m = Ip * (h - d), f = r / h * m, y = c / h * m;
        s.vx -= f, s.vy -= y, s.parent.vx += f * 0.4, s.parent.vy += y * 0.4;
      } else
        s.vx -= s.x * ya, s.vy -= s.y * ya;
      !this.reducedMotion && this._motion > 0 && (s.vx += Math.sin(t * s.f1 * Math.PI * 2 + s.p1) * ga * this._motion, s.vy += Math.cos(t * s.f2 * Math.PI * 2 + s.p2) * ga * this._motion);
    }
    for (let s = 0; s < e.length; s++) {
      const d = e[s];
      for (let r = s + 1; r < e.length; r++) {
        const c = e[r], h = c.x - d.x, m = c.y - d.y;
        if (Math.abs(h) > xi || Math.abs(m) > xi) continue;
        const f = h * h + m * m;
        if (f > xi * xi || f < 0.01) continue;
        const y = Math.sqrt(f), v = d.depth <= 1 && c.depth <= 1 ? 3 : 1, I = kp * v / f, g = h / y * I, l = m / y * I;
        d.vx -= g, d.vy -= l, c.vx += g, c.vy += l;
      }
    }
    const i = this._motion, n = wp * i + 0.5 * (1 - i), a = (1 - i) * 0.7;
    for (const s of e) {
      if (s === this.dragNode) {
        s.vx = 0, s.vy = 0;
        continue;
      }
      s.vx *= n, s.vy *= n;
      const d = Math.hypot(s.vx, s.vy);
      if (d > 14 && (s.vx = s.vx / d * 14, s.vy = s.vy / d * 14), a > 0 && d < a) {
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
    return (fa[Math.min(e.depth, fa.length - 1)] ?? 7) * e.scale;
  }
  /**
   * Theme palette lookup: the palette rides in on CSS custom properties (they
   * inherit through shadow boundaries), but canvas 2D needs concrete colors.
   */
  pal(e, t) {
    return getComputedStyle(this).getPropertyValue(e).trim() || t;
  }
  draw(e) {
    var o, s;
    const t = this.ctx;
    if (!t || !this.canvas) return;
    const i = this.clientWidth, n = this.clientHeight;
    t.clearRect(0, 0, i, n), t.save(), t.translate(this.cam.x, this.cam.y), t.scale(this.cam.k, this.cam.k), this.drawAreas(t, e), t.lineWidth = 1.3 / this.cam.k;
    for (const d of e)
      d.parent && (t.strokeStyle = d.color + "55", t.beginPath(), t.moveTo(d.parent.x, d.parent.y), t.lineTo(d.x, d.y), t.stroke());
    const a = (d) => `${d}px system-ui, sans-serif`;
    for (const d of e) {
      const r = this.radiusOf(d);
      t.beginPath(), t.arc(d.x, d.y, r, 0, Math.PI * 2), t.fillStyle = d.kind === "note" ? this.pal("--modux-note-fill", "#fef9c3") : d.expanded ? d.color + "22" : this.pal("--modux-node-fill", "#232527"), t.fill(), t.lineWidth = (d === this.hover ? 2.6 : 1.8) / this.cam.k, t.strokeStyle = d.color, t.stroke(), this.drawGlyph(t, d, r);
      const c = ((o = d.children) == null ? void 0 : o.length) ?? 0;
      if (!d.expanded && c > 0) {
        const m = Math.max(7, r * 0.42), f = d.x + r * 0.75, y = d.y + r * 0.75;
        t.beginPath(), t.arc(f, y, m, 0, Math.PI * 2), t.fillStyle = d.color, t.fill(), t.fillStyle = "#ffffff", t.font = a(m * 1.1), t.textAlign = "center", t.textBaseline = "middle", t.fillText(String(c), f, y + 0.5);
      }
      if (d.depth <= 1 || d === this.hover || this.cam.k > 0.65) {
        const m = d.label.length > 22 ? d.label.slice(0, 21) + "…" : d.label;
        t.font = d === this.hover ? `600 ${a(12)}` : a(d.depth <= 1 ? 12 : 10.5), t.fillStyle = d === this.hover ? this.pal("--modux-text", "#0f172a") : this.pal("--modux-text-dim", "#475569"), t.textAlign = "center", t.textBaseline = "top", t.fillText(m, d.x, d.y + r + 4);
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
    const a = Math.min(0.65, (this.t - this.hoverAt) * 2.2);
    if (!(a <= 0.02)) {
      e.save(), e.globalAlpha = a, e.setLineDash([6, 5]), e.lineWidth = 1.4 / this.cam.k;
      for (const o of i) {
        if (o === t || !n.has(o.refId) || o === t.parent || o.parent === t) continue;
        const s = (t.x + o.x) / 2, d = (t.y + o.y) / 2, r = o.x - t.x, c = o.y - t.y, h = 0.18;
        e.strokeStyle = o.color, e.beginPath(), e.moveTo(t.x, t.y), e.quadraticCurveTo(s - c * h, d + r * h, o.x, o.y), e.stroke(), e.setLineDash([]), e.beginPath(), e.arc(o.x, o.y, this.radiusOf(o) + 4, 0, Math.PI * 2), e.stroke(), e.setLineDash([6, 5]);
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
    var o;
    this.areaHulls.clear();
    const i = ((o = this.scene) == null ? void 0 : o.nodes) ?? [], n = i.filter((s) => s.kind === "area");
    if (!n.length) return;
    const a = this.cam.k;
    e.save(), e.setLineDash([5 / a, 4 / a]), e.lineWidth = 1.4 / a;
    for (const s of n) {
      const d = i.filter(
        (y) => y.kind !== "area" && !y.parentId && y.x - y.w / 2 >= s.x - s.w / 2 && y.x + y.w / 2 <= s.x + s.w / 2 && y.y - y.h / 2 >= s.y - s.h / 2 && y.y + y.h / 2 <= s.y + s.h / 2
      ), r = [];
      for (const y of d) {
        const v = this.visibleRepresentative(y.id, t);
        v && r.push({ x: v.x, y: v.y, r: this.radiusOf(v) + 16 });
      }
      if (!r.length) continue;
      const c = Math.min(...r.map((y) => y.x - y.r)), h = Math.max(...r.map((y) => y.x + y.r)), m = Math.min(...r.map((y) => y.y - y.r)), f = Math.max(...r.map((y) => y.y + y.r));
      this.areaHulls.set(s.id, { x: (c + h) / 2, y: (m + f) / 2 }), e.fillStyle = "rgba(148, 163, 184, 0.09)", e.strokeStyle = this.pal("--modux-node-stroke", "#94a3b8"), e.beginPath(), e.roundRect(c, m, h - c, f - m, 18 / a), e.fill(), e.stroke();
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
    const i = (((a = this.scene) == null ? void 0 : a.edges) ?? []).filter((o) => o.kind === "note-link");
    if (!i.length) return;
    const n = this.cam.k;
    e.save(), e.setLineDash([4 / n, 3 / n]), e.strokeStyle = "rgba(202, 138, 4, 0.75)", e.lineWidth = 1.4 / n;
    for (const o of i) {
      if (o.targetId.startsWith("edgeanchor:")) continue;
      const s = this.visibleRepresentative(o.sourceId, t), d = this.visibleRepresentative(o.targetId, t), r = d ?? this.areaHulls.get(o.targetId);
      if (!s || !r || d === s) continue;
      const c = r.x - s.x, h = r.y - s.y, m = Math.hypot(c, h) || 1, f = this.radiusOf(s), y = d ? this.radiusOf(d) : 0;
      e.beginPath(), e.moveTo(s.x + c / m * f, s.y + h / m * f), e.lineTo(r.x - c / m * y, r.y - h / m * y), e.stroke();
    }
    e.restore();
  }
  visibleRepresentative(e, t) {
    var a;
    const i = new Map(t.map((o) => [o.refId, o])), n = new Map((((a = this.scene) == null ? void 0 : a.nodes) ?? []).map((o) => [o.id, o.ownerId ?? o.parentId]));
    for (let o = e; o; o = n.get(o)) {
      const s = i.get(o);
      if (s) return s;
    }
    return null;
  }
  /** Ghost preview: a hovered, folded node whispers its children around it. */
  drawGhosts(e, t) {
    const i = t.children ?? [], n = i.slice(0, 14), a = Math.min(0.55, (this.t - this.hoverAt) * 2.2);
    if (a <= 0.02) return;
    const s = this.radiusOf(t) + 24, d = t.parent ? Math.atan2(t.y - t.parent.y, t.x - t.parent.x) : -Math.PI / 2, r = t.parent ? Math.PI * 1.35 : Math.PI * 2;
    if (e.save(), e.globalAlpha = a, e.setLineDash([3, 3]), e.lineWidth = 1.2 / this.cam.k, n.forEach((c, h) => {
      const m = d - r / 2 + r * (h + 0.5) / n.length, f = this.reducedMotion ? 0 : Math.sin(this.t * c.f1 * Math.PI * 2 + c.p1) * 1.8, y = t.x + Math.cos(m) * (s + f), v = t.y + Math.sin(m) * (s + f);
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
    const { x: a, y: o } = t;
    switch (e.save(), e.strokeStyle = t.color, e.fillStyle = t.color, e.lineWidth = Math.max(1, n * 0.22), e.lineCap = "round", e.lineJoin = "round", e.beginPath(), t.kind) {
      case "note":
        e.moveTo(a - n * 0.8, o - n * 0.9), e.lineTo(a + n * 0.8, o - n * 0.9), e.lineTo(a + n * 0.8, o + n * 0.3), e.lineTo(a + n * 0.2, o + n * 0.9), e.lineTo(a - n * 0.8, o + n * 0.9), e.closePath(), e.moveTo(a + n * 0.8, o + n * 0.3), e.lineTo(a + n * 0.2, o + n * 0.3), e.lineTo(a + n * 0.2, o + n * 0.9), e.stroke();
        break;
      case "group": {
        e.arc(a - n * 0.45, o, n * 0.16, 0, Math.PI * 2), e.moveTo(a + n * 0.16, o), e.arc(a, o, n * 0.16, 0, Math.PI * 2), e.moveTo(a + n * 0.61, o), e.arc(a + n * 0.45, o, n * 0.16, 0, Math.PI * 2), e.fill(), e.beginPath(), e.arc(a, o, n, -Math.PI * 0.35, Math.PI * 0.35), e.moveTo(a - n * Math.cos(Math.PI * 0.35), o + n * Math.sin(Math.PI * 0.35)), e.arc(a, o, n, Math.PI * 0.65, Math.PI * 1.35), e.stroke();
        break;
      }
      case "root":
        e.arc(a, o, n, 0, Math.PI * 2), e.moveTo(a + n * 0.35, o), e.arc(a, o, n * 0.35, 0, Math.PI * 2), e.stroke();
        break;
      case "boundedContext":
        for (const [s, d] of [[-0.55, 0.4], [0.55, 0.4], [0, -0.55]])
          e.moveTo(a + s * n + n * 0.3, o + d * n), e.arc(a + s * n, o + d * n, n * 0.3, 0, Math.PI * 2);
        e.fill();
        break;
      case "aggregate":
        e.moveTo(a, o - n), e.lineTo(a + n, o), e.lineTo(a, o + n), e.lineTo(a - n, o), e.closePath(), e.stroke();
        break;
      case "entity":
      case "external-table":
      case "read-model":
        e.rect(a - n, o - n * 0.8, n * 2, n * 1.6), e.moveTo(a - n, o - n * 0.25), e.lineTo(a + n, o - n * 0.25), e.stroke();
        break;
      case "use-case":
      case "external-use-case":
        e.moveTo(a - n * 0.6, o - n * 0.85), e.lineTo(a + n * 0.85, o), e.lineTo(a - n * 0.6, o + n * 0.85), e.closePath(), e.stroke();
        break;
      case "policy":
      case "domain-event":
      case "application-event":
        e.moveTo(a + n * 0.3, o - n), e.lineTo(a - n * 0.5, o + n * 0.15), e.lineTo(a + n * 0.05, o + n * 0.15), e.lineTo(a - n * 0.3, o + n), e.lineTo(a + n * 0.5, o - n * 0.15), e.lineTo(a - n * 0.05, o - n * 0.15), e.closePath(), e.stroke();
        break;
      case "domain-service":
      case "etl-flow": {
        e.arc(a, o, n * 0.5, 0, Math.PI * 2);
        for (let s = 0; s < 6; s++) {
          const d = s * Math.PI / 3;
          e.moveTo(a + Math.cos(d) * n * 0.55, o + Math.sin(d) * n * 0.55), e.lineTo(a + Math.cos(d) * n, o + Math.sin(d) * n);
        }
        e.stroke();
        break;
      }
      case "query-service":
        e.arc(a - n * 0.25, o - n * 0.25, n * 0.6, 0, Math.PI * 2), e.moveTo(a + n * 0.25, o + n * 0.25), e.lineTo(a + n, o + n), e.stroke();
        break;
      case "scheduled-trigger":
        e.arc(a, o, n, 0, Math.PI * 2), e.moveTo(a, o - n * 0.55), e.lineTo(a, o), e.lineTo(a + n * 0.45, o + n * 0.25), e.stroke();
        break;
      case "notification":
        e.moveTo(a - n * 0.85, o + n * 0.45), e.quadraticCurveTo(a - n * 0.85, o - n, a, o - n), e.quadraticCurveTo(a + n * 0.85, o - n, a + n * 0.85, o + n * 0.45), e.closePath(), e.moveTo(a + n * 0.25, o + n * 0.75), e.arc(a, o + n * 0.75, n * 0.25, 0, Math.PI), e.stroke();
        break;
      case "document":
        e.moveTo(a - n * 0.7, o - n), e.lineTo(a + n * 0.25, o - n), e.lineTo(a + n * 0.7, o - n * 0.55), e.lineTo(a + n * 0.7, o + n), e.lineTo(a - n * 0.7, o + n), e.closePath(), e.moveTo(a + n * 0.25, o - n), e.lineTo(a + n * 0.25, o - n * 0.55), e.lineTo(a + n * 0.7, o - n * 0.55), e.stroke();
        break;
      case "workflow":
        for (const s of [-0.7, 0.1])
          e.moveTo(a + s * n, o - n * 0.7), e.lineTo(a + (s + 0.6) * n, o), e.lineTo(a + s * n, o + n * 0.7);
        e.stroke();
        break;
      case "identity-provider":
        e.arc(a - n * 0.45, o - n * 0.45, n * 0.45, 0, Math.PI * 2), e.moveTo(a - n * 0.1, o - n * 0.1), e.lineTo(a + n * 0.9, o + n * 0.9), e.moveTo(a + n * 0.45, o + n * 0.45), e.lineTo(a + n * 0.85, o + n * 0.05), e.stroke();
        break;
      case "actor":
        e.arc(a, o - n * 0.5, n * 0.42, 0, Math.PI * 2), e.moveTo(a - n * 0.8, o + n), e.quadraticCurveTo(a, o - n * 0.1, a + n * 0.8, o + n), e.stroke();
        break;
      case "ai-agent":
        for (let s = 0; s < 4; s++) {
          const d = s * Math.PI / 2 + Math.PI / 4;
          e.moveTo(a, o), e.lineTo(a + Math.cos(d) * n, o + Math.sin(d) * n), e.moveTo(a, o), e.lineTo(a + Math.cos(d + Math.PI / 4) * n * 0.5, o + Math.sin(d + Math.PI / 4) * n * 0.5);
        }
        e.stroke();
        break;
      case "external-system":
        e.arc(a - n * 0.45, o + n * 0.15, n * 0.45, Math.PI * 0.4, Math.PI * 1.45), e.arc(a + n * 0.1, o - n * 0.35, n * 0.5, Math.PI * 0.95, Math.PI * 1.95), e.arc(a + n * 0.55, o + n * 0.2, n * 0.4, Math.PI * 1.45, Math.PI * 0.55), e.closePath(), e.stroke();
        break;
      case "ui-app":
        for (const [s, d] of [[-1, -1], [0.15, -1], [-1, 0.15], [0.15, 0.15]])
          e.rect(a + s * n, o + d * n, n * 0.85, n * 0.85);
        e.stroke();
        break;
      case "page":
        e.rect(a - n, o - n * 0.8, n * 2, n * 1.6), e.moveTo(a - n, o - n * 0.35), e.lineTo(a + n, o - n * 0.35), e.stroke(), e.beginPath(), e.arc(a - n * 0.7, o - n * 0.57, n * 0.09, 0, Math.PI * 2), e.fill();
        break;
      case "api":
        e.moveTo(a - n * 0.25, o - n), e.lineTo(a - n, o), e.lineTo(a - n * 0.25, o + n), e.moveTo(a + n * 0.25, o - n), e.lineTo(a + n, o), e.lineTo(a + n * 0.25, o + n), e.stroke();
        break;
      case "api-operation":
        e.moveTo(a - n, o), e.lineTo(a + n * 0.7, o), e.moveTo(a + n * 0.1, o - n * 0.5), e.lineTo(a + n * 0.8, o), e.lineTo(a + n * 0.1, o + n * 0.5), e.stroke();
        break;
      case "mcp-server":
        e.arc(a, o + n * 0.25, n * 0.6, 0, Math.PI), e.closePath(), e.moveTo(a - n * 0.35, o + n * 0.25), e.lineTo(a - n * 0.35, o - n * 0.7), e.moveTo(a + n * 0.35, o + n * 0.25), e.lineTo(a + n * 0.35, o - n * 0.7), e.stroke();
        break;
      default:
        e.arc(a, o, n * 0.3, 0, Math.PI * 2), e.fill();
    }
    e.restore();
  }
  /** Hover card: what the node is, what it holds, how to enter. Screen space, clamped to the canvas. */
  drawCard(e, t, i, n) {
    var k, T;
    const a = (t.children ?? []).flatMap(
      (z) => z.kind === "group" ? z.children ?? (z.children = this.childrenOf(z)) : [z]
    ), o = /* @__PURE__ */ new Map();
    for (const z of a) o.set(z.kind, (o.get(z.kind) ?? 0) + 1);
    const s = [];
    for (const [z, Q] of o)
      if (s.push(`${Q} ${Q === 1 ? (Qi[z] ?? z).toLowerCase() : xp[z] ?? z}`), s.length === 4) {
        const C = [...o.keys()].length - 4;
        C > 0 && (s[3] += ` (+${C} tipos más)`);
        break;
      }
    const d = a.slice(0, 6).map((z) => ({ label: z.label.length > 30 ? z.label.slice(0, 29) + "…" : z.label, color: z.color })), r = a.length - d.length, c = t.label, h = Qi[t.kind] ?? t.kind, m = ((k = t.children) != null && k.length ? t.expanded ? "click: plegar" : "click: expandir" : "") + (t.kind !== "root" ? ((T = t.children) != null && T.length ? " · " : "") + "doble click: abrir" : "");
    e.save(), e.font = "600 13px system-ui, sans-serif";
    const f = e.measureText(c).width;
    e.font = "11px system-ui, sans-serif";
    const y = Math.max(
      e.measureText(h).width,
      ...s.map((z) => e.measureText(z).width),
      ...d.map((z) => e.measureText(z.label).width + 12),
      e.measureText(m).width
    ), v = Math.min(300, Math.max(f, y) + 24), I = d.length ? 8 + d.length * 15 + (r > 0 ? 15 : 0) : 0, g = 40 + s.length * 15 + I + (m ? 18 : 0), l = this.radiusOf(t) * this.cam.k, u = this.cam.x + t.x * this.cam.k, x = this.cam.y + t.y * this.cam.k;
    let E = u + l + 14;
    E + v > i - 8 && (E = u - l - 14 - v), E = Math.max(8, Math.min(E, i - v - 8));
    const N = Math.max(8, Math.min(x - 10, n - g - 8));
    e.translate(E, N), e.fillStyle = this.pal("--modux-surface", "rgba(255,255,255,0.96)"), e.strokeStyle = this.pal("--modux-border-strong", "#cbd5e1"), e.lineWidth = 1, e.beginPath(), e.roundRect(0, 0, v, g, 8), e.fill(), e.stroke(), e.fillStyle = this.pal("--modux-text", "#0f172a"), e.font = "600 13px system-ui, sans-serif", e.textAlign = "left", e.textBaseline = "top", e.fillText(c, 12, 9), e.fillStyle = t.color, e.font = "11px system-ui, sans-serif", e.fillText(h, 12, 25), e.fillStyle = this.pal("--modux-text-dim", "#475569"), s.forEach((z, Q) => e.fillText(z, 12, 41 + Q * 15));
    let R = 41 + s.length * 15 + (d.length ? 8 : 0);
    d.forEach((z) => {
      e.fillStyle = z.color, e.beginPath(), e.arc(15, R + 5.5, 2.6, 0, Math.PI * 2), e.fill(), e.fillStyle = this.pal("--modux-text", "#334155"), e.fillText(z.label, 24, R), R += 15;
    }), r > 0 && (e.fillStyle = this.pal("--modux-text-faint", "#94a3b8"), e.fillText(`… y ${r} más`, 24, R)), m && (e.fillStyle = this.pal("--modux-text-faint", "#94a3b8"), e.fillText(m, 12, g - 16)), e.restore();
  }
  // ── Search & fly ──────────────────────────────────────────────────────
  static fold(e) {
    return e.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }
  onSearchInput(e) {
    this._q = e.target.value;
    const t = Ie.fold(this._q.trim());
    this._active = 0, this._sugs = t.length < 2 ? [] : this.allNodes.filter((i) => i.kind !== "root" && Ie.fold(i.label).includes(t)).slice(0, 8);
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
      const a = i[n], o = this.radiusOf(a) + 4 / this.cam.k;
      if ((e - a.x) ** 2 + (t - a.y) ** 2 <= o * o) return a;
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
        const n = Math.min(i.ax, i.bx), a = Math.max(i.ax, i.bx), o = Math.min(i.ay, i.by), s = Math.max(i.ay, i.by), d = this.visible().filter((r) => r.kind !== "root" && r.kind !== "group" && r.refId).filter((r) => r.x >= n && r.x <= a && r.y >= o && r.y <= s).map((r) => r.key);
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
      const i = e.parent ? Math.atan2(e.y - e.parent.y, e.x - e.parent.x) : Math.random() * Math.PI * 2, n = e.parent ? Math.PI * 1.25 : Math.PI * 2, a = e.children;
      a.forEach((o, s) => {
        this.materialize(o.parent);
        const d = i - n / 2 + n * (s + 0.5) / a.length;
        o.x = e.x + Math.cos(d) * 6, o.y = e.y + Math.sin(d) * 6, o.vx = Math.cos(d) * 7, o.vy = Math.sin(d) * 7, o.children || (o.children = this.childrenOf(o));
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
    const t = this.getBoundingClientRect(), i = e.clientX - t.left, n = e.clientY - t.top, a = Math.exp(-e.deltaY * 12e-4), o = Math.min(2.5, Math.max(0.25, this.cam.k * a)), s = o / this.cam.k;
    this.cam.x = i - (i - this.cam.x) * s, this.cam.y = n - (n - this.cam.y) * s, this.cam.k = o;
  }
  render() {
    return $`
      <canvas
        @pointerdown=${this.onPointerDown}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @dblclick=${this.onDblClick}
        @wheel=${this.onWheel}
      ></canvas>
      ${this.renaming ? $`<input
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
        ${this._sugs.length ? $`<ul class="sugs">
              ${this._sugs.map(
      (e, t) => $`<li
                  class=${t === this._active ? "active" : ""}
                  @mouseenter=${() => this._active = t}
                  @click=${() => this.flyToNode(e)}
                >
                  <span class="dot" style="background:${e.color}"></span>
                  <span class="name">${e.label}</span>
                  <span class="path">${this.pathOf(e) || (Qi[e.kind] ?? e.kind)}</span>
                </li>`
    )}
            </ul>` : this._q.trim().length >= 2 ? $`<ul class="sugs"><li class="empty">sin resultados</li></ul>` : null}
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
        ${this._viewNaming ? $`
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
            ` : $`<button
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
Ie.styles = nt`
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
Ie.STORE_KEY = "modux-explorer-state";
Re([
  de({ type: Boolean, reflect: !0 })
], Ie.prototype, "shifted", 2);
Re([
  de({ attribute: !1 })
], Ie.prototype, "scene", 2);
Re([
  de({ attribute: !1 })
], Ie.prototype, "model", 2);
Re([
  B()
], Ie.prototype, "_q", 2);
Re([
  B()
], Ie.prototype, "_sugs", 2);
Re([
  B()
], Ie.prototype, "_active", 2);
Re([
  B()
], Ie.prototype, "_motion", 2);
Re([
  B()
], Ie.prototype, "_threads", 2);
Re([
  B()
], Ie.prototype, "_viewNaming", 2);
Re([
  B()
], Ie.prototype, "_viewName", 2);
Re([
  B()
], Ie.prototype, "selected", 2);
Re([
  B()
], Ie.prototype, "_levels", 2);
Re([
  de()
], Ie.prototype, "sceneKey", 2);
Re([
  B()
], Ie.prototype, "renaming", 2);
Ie = Re([
  mt("modux-explorer")
], Ie);
const ce = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function ni(e) {
  const t = e.participants ?? [], i = new Set(t.map((a) => a.ref)), n = [];
  for (const a of e.messages)
    for (const o of [a.fromRef, a.toRef])
      i.has(o) || (i.add(o), n.push({ ref: o, name: o, type: "UNKNOWN" }));
  return [...t, ...n];
}
function mo(e) {
  const t = [];
  return e.map((i) => {
    const n = Math.max(0, i.depth ?? 0);
    for (let a = 0; a < n; a++) t[a] = t[a] || 1;
    return t[n] = (t[n] || 0) + 1, t.length = n + 1, t.join(".");
  });
}
function fo(e) {
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
function ho(e) {
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
function go(e, t) {
  for (const i of e.boundedContexts) {
    const n = (i.domainEvents ?? []).find((a) => a.name === t) ?? (i.applicationEvents ?? []).find((a) => a.name === t);
    if (n) return n.id;
  }
  return null;
}
function $p(e, t) {
  const i = e.boundedContexts.find(
    (n) => (n.useCases ?? []).some((a) => a.id === t) || (n.queryServices ?? []).some((a) => a.id === t) || (n.readModels ?? []).some((a) => a.id === t)
  );
  return (i == null ? void 0 : i.id) ?? null;
}
function _p(e, t, i) {
  const n = fo(e), a = e.flows.find(
    (d) => d.archetype === "TRIGGERS" && d.triggerEvent && d.targetUseCaseId === i.ref && d.triggerAggregateId === t.ref
  );
  if (a) return { kind: "EVENT", label: a.triggerEvent };
  const o = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ].filter((d) => d.sourceId === t.ref);
  for (const d of o) {
    const r = ho(e).get(d.domainEventId);
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
  const i = fo(e), n = ho(e), a = new Map((t.participants ?? []).map((o) => [o.ref, o]));
  return {
    typeOf: (o) => {
      var s, d;
      return (s = a.get(o)) != null && s.type && a.get(o).type !== "UNKNOWN" ? a.get(o).type : i.get(o) ?? ((d = a.get(o)) == null ? void 0 : d.type) ?? "UNKNOWN";
    },
    nameOf: (o) => {
      var s;
      return ((s = a.get(o)) == null ? void 0 : s.name) ?? n.get(o) ?? o;
    }
  };
}
function Cp(e, t, i) {
  const n = Math.max(0, Math.min(e.length, i)), a = [...e];
  return a.splice(n, 0, t), a;
}
function Ep(e, t, i) {
  const n = e.findIndex((s) => s.id === t);
  if (n < 0) return e;
  const a = e.filter((s) => s.id !== t), o = Math.max(0, Math.min(a.length, i));
  return a.splice(o, 0, e[n]), a;
}
function Sp(e, t) {
  return e.filter((i) => i.id !== t);
}
function Ap(e, t) {
  return {
    ...e,
    participants: (e.participants ?? []).filter((i) => i.ref !== t),
    messages: e.messages.filter((i) => i.fromRef !== t && i.toRef !== t)
  };
}
function ba(e, t, i) {
  var d;
  const n = t.fromRef, a = t.toRef, o = i(n), s = i(a);
  switch (t.kind) {
    case "COMMAND": {
      if (o === "USE_CASE" && s === "USE_CASE")
        return (e.useCaseCalls ?? []).some((r) => r.sourceId === n && r.targetId === a);
      if (o === "USE_CASE" && s === "AGGREGATE")
        return (e.aggregateCalls ?? []).some((r) => r.sourceId === n && r.targetId === a);
      if (o === "ACTOR" && (s === "USE_CASE" || s === "QUERY_SERVICE"))
        return (e.actorUses ?? []).some((r) => r.actorId === n && r.targetId === a);
      if (o === "API_OPERATION" && s === "USE_CASE")
        return (e.apis ?? []).some(
          (r) => r.operations.some((c) => c.id === n && c.targetUseCaseId === a)
        );
      if (o === "EXTERNAL_SYSTEM" && s === "USE_CASE")
        return (e.externalCalls ?? []).some(
          (r) => r.externalSystemId === n && r.useCaseId === a
        );
      if ((o === "PAGE" || o === "APP") && s === "USE_CASE") {
        const r = (e.pages ?? []).find((m) => m.id === n);
        if (r && (r.buttons ?? []).some((m) => m.useCaseId === a)) return !0;
        const c = (e.uiApps ?? []).find((m) => m.id === n), h = (m) => (m ?? []).some(
          (f) => f.useCaseId === a || h(f.children)
        );
        return !!c && h(c.menuItems);
      }
      return o === "AI_AGENT" && s === "USE_CASE" ? (e.agentUses ?? []).some((r) => r.agentId === n && r.useCaseId === a) : !1;
    }
    case "QUERY":
      return o === "USE_CASE" && s === "QUERY_SERVICE" ? (e.queryCalls ?? []).some((r) => r.sourceId === n && r.targetId === a) : o === "ACTOR" && s === "QUERY_SERVICE" ? (e.actorUses ?? []).some((r) => r.actorId === n && r.targetId === a) : o === "AI_AGENT" && s === "QUERY_SERVICE" ? (e.agentQueryUses ?? []).some(
        (r) => r.agentId === n && r.queryServiceId === a
      ) : o === "PAGE" && s === "QUERY_SERVICE" ? (e.pages ?? []).some((r) => r.id === n && r.listingQueryServiceId === a) : s === "READ_MODEL" ? (e.projections ?? []).some((r) => r.readModelId === a) : !1;
    case "EVENT": {
      const r = t.label ?? "", c = go(e, r), h = !!c && [...e.emissions ?? [], ...e.useCaseEmissions ?? []].some(
        (f) => f.sourceId === n && f.domainEventId === c
      ) || // an aggregate-operation emission keyed by NAME (flows reference names, not ids)
      e.flows.some(
        (f) => f.archetype === "TRIGGERS" && f.triggerEvent === r && f.triggerAggregateId === n
      ), m = e.flows.some(
        (f) => f.archetype === "TRIGGERS" && f.triggerEvent === r && f.targetUseCaseId === a
      ) || (e.subscriptions ?? []).some(
        (f) => f.eventName === r && (f.actions ?? []).some((y) => y.type === "CallUseCase" && y.useCaseId === a)
      );
      return h && m;
    }
    case "EXTERNAL": {
      if (o === "USE_CASE" && s === "EXTERNAL_SYSTEM") {
        if ((e.externalUseCaseCalls ?? []).some(
          (h) => h.sourceId === n && h.targetId === a
        )) return !0;
        const c = e.externalSystems.find((h) => h.id === a);
        return !!((d = c == null ? void 0 : c.useCases) != null && d.some(
          (h) => (e.externalUseCaseCalls ?? []).some(
            (m) => m.sourceId === n && m.targetId === h.id
          )
        ));
      }
      return !1;
    }
  }
}
function Mp(e, t, i, n) {
  const a = t.fromRef, o = t.toRef, s = i(a), d = i(o), r = (c) => ({
    commands: [],
    hint: `Este enlace se cablea a mano: ${c}`
  });
  switch (t.kind) {
    case "COMMAND": {
      if (s === "USE_CASE" && d === "USE_CASE")
        return { commands: [{ kind: "add-use-case-call", sourceId: a, targetId: o }] };
      if (s === "USE_CASE" && d === "AGGREGATE")
        return { commands: [{ kind: "add-aggregate-call", sourceId: a, targetId: o }] };
      if (s === "ACTOR" && (d === "USE_CASE" || d === "QUERY_SERVICE"))
        return { commands: [{ kind: "add-actor-use", sourceId: a, targetId: o }] };
      if (s === "API_OPERATION" && d === "USE_CASE") {
        const c = (e.apis ?? []).find((h) => h.operations.some((m) => m.id === a));
        return c ? {
          commands: [
            { kind: "set-api-operation-target", apiId: c.id, id: a, targetUseCaseId: o }
          ]
        } : r("la operación no cuelga de ninguna API del catálogo");
      }
      return r(s === "PAGE" || s === "APP" ? "un botón (o entrada de menú) apuntando al caso de uso, en la ficha de la página/app" : `conecta ${n(a)} → ${n(o)} en el mapa del sistema`);
    }
    case "QUERY":
      return s === "USE_CASE" && d === "QUERY_SERVICE" ? { commands: [{ kind: "add-query-call", sourceId: a, targetId: o }] } : s === "ACTOR" && d === "QUERY_SERVICE" ? { commands: [{ kind: "add-actor-use", sourceId: a, targetId: o }] } : r(s === "PAGE" ? "el listing de la página apuntando al query service, en la ficha de la página" : `conecta ${n(a)} → ${n(o)} en el mapa del sistema`);
    case "EXTERNAL":
      return s === "USE_CASE" && d === "EXTERNAL_SYSTEM" ? { commands: [{ kind: "add-external-uc-call", sourceId: a, targetId: o }] } : r(`conecta ${n(a)} → ${n(o)} en el mapa del sistema`);
    case "EVENT": {
      const c = t.label ?? "";
      if (d !== "USE_CASE")
        return r("el destino de un evento debe ser un caso de uso (la suscripción reacciona)");
      const h = go(e, c);
      if (!h)
        return r(`el evento «${c}» no existe en el catálogo — créalo primero en su contexto`);
      const m = [];
      if ([...e.emissions ?? [], ...e.useCaseEmissions ?? []].some(
        (v) => v.sourceId === a && v.domainEventId === h
      ) || m.push({ kind: "add-emission", sourceId: a, targetId: h }), !e.flows.some(
        (v) => v.archetype === "TRIGGERS" && v.triggerEvent === c && v.targetUseCaseId === o
      )) {
        const v = $p(e, o) ?? "";
        m.push({
          kind: "add-flow",
          id: `flow-${ce(c)}-${ce(n(o))}`,
          name: n(o),
          archetype: "TRIGGERS",
          triggerAggregateId: s === "AGGREGATE" ? a : "",
          triggerDomainServiceId: s === "DOMAIN_SERVICE" ? a : void 0,
          triggerUseCaseId: s === "USE_CASE" ? a : void 0,
          triggerEvent: c,
          targetId: v,
          targetUseCaseId: o
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
function Pp(e) {
  const t = ni(e), i = new Map(t.map((s, d) => [s.ref, `p${d + 1}`])), n = (s, d = !1) => {
    const r = s.replace(/[\r\n;]+/g, " ").trim();
    return d ? r.replace(/:/g, " -") : r;
  }, a = ["sequenceDiagram"];
  for (const s of t)
    a.push(`  participant ${i.get(s.ref)} as ${n(s.name, !0)}`);
  const o = mo(e.messages);
  return e.messages.forEach((s, d) => {
    const r = i.get(s.fromRef), c = i.get(s.toRef);
    if (!r || !c) return;
    const h = s.kind === "EVENT" ? "-->>" : "->>", m = [o[d], s.label ?? "", s.guard ? `[${s.guard}]` : ""].filter(Boolean).join(" ");
    a.push(`  ${r}${h}${c}: ${n(m)}`);
  }), a.join(`
`);
}
function va(e) {
  const t = [], i = (n, a, o, s, d) => t.push({ ref: n, name: a, label: d ? `${a} (${d})` : a, type: o, group: s });
  for (const n of e.actors ?? []) i(n.id, n.name, "ACTOR", "Actores");
  for (const n of e.uiApps ?? []) i(n.id, n.name, "APP", "Apps");
  for (const n of e.pages ?? []) i(n.id, n.name, "PAGE", "Páginas");
  for (const n of e.boundedContexts) {
    for (const a of n.useCases ?? []) i(a.id, a.name, "USE_CASE", "Casos de uso", n.name);
    for (const a of (e.aggregates ?? []).filter((o) => o.boundedContextId === n.id))
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
function Tp(e) {
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
function Ft(e) {
  return [...e.model.aggregates ?? [], ...e.model.entities ?? []];
}
function Op(e, t) {
  var i, n, a, o, s, d, r, c, h, m, f, y, v, I, g;
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
        const E = (N) => {
          for (const R of N ?? [])
            R.modelId === t.id && u.push({ kind: "set-page-component", pageId: x.id, componentId: R.id, modelId: t.id }), E(R.children);
        };
        E(x.content);
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
      const l = (((a = (e.model.pages ?? []).find((u) => u.id === t.pageId)) == null ? void 0 : a.wizardSteps) ?? []).find((u) => (u.id ?? u.pageId) === t.targetId);
      return l ? [{
        kind: "add-page-wizard-step",
        pageId: t.pageId,
        targetId: l.pageId ?? null,
        label: l.label,
        itemId: l.id
      }] : null;
    }
    case "delete-ui-app": {
      const l = (e.model.uiApps ?? []).find((E) => E.id === t.id);
      if (!l) return null;
      const u = [{ kind: "create-ui-app", id: l.id, name: l.name, type: l.type }];
      l.headerPageId && u.push({ kind: "set-app-header-page", appId: l.id, pageId: l.headerPageId }), l.modelId && u.push({ kind: "set-app-model", appId: l.id, modelId: l.modelId }), l.viewPageId && u.push({ kind: "set-app-view-page", appId: l.id, pageId: l.viewPageId }), l.editPageId && u.push({ kind: "set-app-edit-page", appId: l.id, pageId: l.editPageId }), (l.homePageId || l.homeAppId) && u.push({
        kind: "set-app-home-page",
        appId: l.id,
        pageId: l.homePageId ?? null,
        toAppId: l.homeAppId ?? null
      });
      const x = (E, N) => {
        for (const R of E ?? [])
          u.push({
            kind: "add-menu-item",
            appId: l.id,
            label: R.label,
            itemId: R.id,
            parentId: N == null ? void 0 : N.id,
            parentLabel: N && !N.id ? N.label : void 0,
            pageId: R.pageId ?? null
          }), R.uiAdapterId && u.push({ kind: "set-menu-app", appId: l.id, toAppId: R.uiAdapterId, itemId: R.id, label: R.label }), R.useCaseId && u.push({ kind: "set-menu-use-case", appId: l.id, useCaseId: R.useCaseId, itemId: R.id, label: R.label }), R.aggregateId && u.push({ kind: "set-menu-aggregate", appId: l.id, aggregateId: R.aggregateId, itemId: R.id, label: R.label }), R.queryOperationId && u.push({
            kind: "set-menu-query-operation",
            appId: l.id,
            queryServiceId: R.queryServiceId ?? null,
            queryOperationId: R.queryOperationId,
            itemId: R.id,
            label: R.label
          }), x(R.children, R);
      };
      x(l.menuItems);
      for (const E of e.model.actorAppUses ?? [])
        E.appId === t.id && u.push({ kind: "add-actor-app", actorId: E.actorId, appId: t.id });
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
      const l = (e.model.uiApps ?? []).find((E) => E.id === t.appId), u = (E) => {
        for (const N of E ?? []) {
          if (t.itemId ? N.id === t.itemId : N.label === t.label) return N;
          const R = u(N.children);
          if (R) return R;
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
      const l = (e.model.pages ?? []).find((k) => k.id === t.pageId);
      let u = null, x = null, E = null;
      const N = (k, T) => {
        var Q;
        const z = k ?? [];
        for (let C = 0; C < z.length; C++)
          z[C].id === t.componentId && (u = z[C], x = T, E = ((Q = z[C + 1]) == null ? void 0 : Q.id) ?? null), N(z[C].children, z[C]);
      };
      if (N(l == null ? void 0 : l.content, null), !u) return null;
      const R = u;
      return t.kind === "set-page-component" ? [{
        kind: "set-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
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
      }] : t.kind === "move-page-component" ? [{
        kind: "move-page-component",
        pageId: t.pageId,
        componentId: t.componentId,
        parentComponentId: x === null ? null : x.id,
        beforeComponentId: E
      }] : e.rebuildComponentOps(
        t.pageId,
        R,
        x === null ? void 0 : x.id,
        E
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
      const l = (((o = (e.model.pages ?? []).find((u) => u.id === t.pageId)) == null ? void 0 : o.viewmodelFields) ?? []).find((u) => u.fieldId === t.fieldId);
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
    case "add-operation":
      return [{ kind: "remove-operation", id: t.id, aggregateId: t.aggregateId }];
    case "remove-operation": {
      const l = (e.model.aggregates ?? []).find((x) => (x.operations ?? []).some((E) => E.id === t.id)), u = (d = l == null ? void 0 : l.operations) == null ? void 0 : d.find((x) => x.id === t.id);
      return l && u ? [{ kind: "add-operation", id: u.id, name: u.name, aggregateId: l.id }] : null;
    }
    case "set-value-object-aggregate": {
      const l = (e.model.valueObjects ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "set-value-object-aggregate", id: t.id, aggregateId: l.aggregateId }] : null;
    }
    case "set-entity-aggregate": {
      const l = (e.model.entities ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "set-entity-aggregate", id: t.id, aggregateId: l.aggregateId }] : null;
    }
    case "remove-model-field": {
      const l = Ft(e).flatMap((u) => u.fields ?? []).find((u) => u.id === t.fieldId);
      return l ? [{ kind: "add-model-field", modelId: t.modelId, fieldId: t.fieldId, name: l.name }] : null;
    }
    case "set-model-field": {
      const l = Ft(e).flatMap((u) => u.fields ?? []).find((u) => u.id === t.fieldId);
      return l ? [{ kind: "set-model-field", modelId: t.modelId, fieldId: t.fieldId, name: l.name }] : null;
    }
    case "set-model-field-type": {
      const l = Ft(e).flatMap((u) => u.fields ?? []).find((u) => u.id === t.fieldId);
      return l ? [{ kind: "set-model-field-type", modelId: t.modelId, fieldId: t.fieldId, type: l.typeKind, targetId: l.typeRef }] : null;
    }
    case "set-model-field-required": {
      const l = Ft(e).flatMap((u) => u.fields ?? []).find((u) => u.id === t.fieldId);
      return l ? [{ kind: "set-model-field-required", modelId: t.modelId, fieldId: t.fieldId, required: l.required }] : null;
    }
    case "set-model-field-collection": {
      const l = Ft(e).flatMap((u) => u.fields ?? []).find((u) => u.id === t.fieldId);
      return l ? [{ kind: "set-model-field-collection", modelId: t.modelId, fieldId: t.fieldId, collection: !!l.collection }] : null;
    }
    case "add-invariant":
      return [{ kind: "remove-invariant", id: t.id }];
    case "set-invariant-condition": {
      const l = [...e.model.aggregates ?? [], ...e.model.valueObjects ?? [], ...e.model.entities ?? []].flatMap((u) => u.invariants ?? []).find((u) => u.id === t.id);
      return l ? [{ kind: "set-invariant-condition", id: t.id, expression: l.expression ?? "", errorMessage: l.errorMessage ?? "" }] : null;
    }
    case "remove-invariant": {
      const u = [
        ...e.model.aggregates ?? [],
        ...e.model.valueObjects ?? [],
        ...e.model.entities ?? []
      ].find((E) => (E.invariants ?? []).some((N) => N.id === t.id)), x = (r = u == null ? void 0 : u.invariants) == null ? void 0 : r.find((E) => E.id === t.id);
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
    case "add-ui-crud":
      return [{ kind: "remove-ui-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-ui-crud":
      return [{ kind: "add-ui-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-external-crud":
      return [{ kind: "remove-external-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-external-crud":
      return [{ kind: "add-external-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "add-context-crud":
      return [{ kind: "remove-context-crud", sourceId: t.sourceId, targetId: t.targetId }];
    case "remove-context-crud":
      return [{ kind: "add-context-crud", sourceId: t.sourceId, targetId: t.targetId }];
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
      const l = ((c = e.model.boundedContexts.find((u) => u.id === t.id)) == null ? void 0 : c.identityProviderId) ?? ((h = (e.model.uiApps ?? []).find((u) => u.id === t.id)) == null ? void 0 : h.identityProviderId) ?? ((m = (e.model.etlFlows ?? []).find((u) => u.id === t.id)) == null ? void 0 : m.identityProviderId) ?? null;
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
        (x) => (x.scheduledTriggers ?? []).some((E) => E.id === t.id)
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
      const l = (I = (e.model.apis ?? []).find((u) => u.id === t.apiId)) == null ? void 0 : I.operations.find((u) => u.id === t.id);
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
      const l = (g = (e.model.apis ?? []).find((u) => u.id === t.apiId)) == null ? void 0 : g.operations.find((u) => u.id === t.id);
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
      const l = (e.model.processes ?? []).find((E) => E.id === t.processId), u = (l == null ? void 0 : l.steps.findIndex((E) => E.id === t.id)) ?? -1;
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
      const l = (e.model.workflows ?? []).find((E) => E.id === t.workflowId), u = (l == null ? void 0 : l.steps.findIndex((E) => E.id === t.id)) ?? -1;
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
        ...l.steps.filter((E) => E.id !== t.id && (E.dependsOnStepIds ?? []).includes(t.id)).map(
          (E) => ({
            kind: "add-workflow-dependency",
            workflowId: t.workflowId,
            id: E.id,
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
const Rp = [
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
  { id: "external-crud", label: "CRUD (API)", hint: "Sistema externo → agregado: crea la API CRUD y lo cablea como consumidor" },
  { id: "context-crud", label: "CRUD (API)", hint: "Otro contexto → agregado: crea la API CRUD que consumirá" },
  { id: "external-uc-call", label: "Llamada saliente", hint: "Caso de uso nuestro → operación de un sistema externo" },
  { id: "agent-tool", label: "Herramienta IA", hint: "Agente → caso de uso, operación, MCP, gateway, API o query service" },
  { id: "agent-delegate", label: "Delegación IA", hint: "Agente → agente: le delega trabajo" },
  { id: "agent-rag", label: "Conocimiento", hint: "Agente → RAG que fundamenta sus respuestas" },
  { id: "idp-trust", label: "Identidad", hint: "Contexto, app o flujo ETL → IdP cuyos tokens valida" },
  { id: "ui-assignment", label: "Asignación a la UI", hint: "App o página ⇆ UI declarada: se le asigna (assignment)" },
  { id: "ui-composition", label: "Composición (expone la UI)", hint: "Contexto ⇆ UI: el contexto la posee — la única relación posible entre ambos" },
  { id: "ui-serving", label: "Servidumbre (sirve al actor)", hint: "UI ⇆ actor: la interfaz le sirve — la única relación posible entre ambos" }
];
function Di(e, t, i) {
  return Object.entries(Aa).map(([n, a]) => ({
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
function Np(e, t, i) {
  var R;
  const n = e.model, a = [], o = (k, T) => a.push({ id: k, apply: T }), s = new Set(n.boundedContexts.flatMap((k) => (k.useCases ?? []).map((T) => T.id))), d = new Set(n.boundedContexts.flatMap((k) => (k.queryServices ?? []).map((T) => T.id))), r = new Set(n.boundedContexts.flatMap((k) => (k.domainEvents ?? []).map((T) => T.id))), c = new Set(n.boundedContexts.flatMap((k) => (k.applicationEvents ?? []).map((T) => T.id))), h = /* @__PURE__ */ new Set([
    ...(n.aggregates ?? []).map((k) => k.id),
    ...n.boundedContexts.flatMap((k) => (k.domainServices ?? []).map((T) => T.id))
  ]), m = new Set(n.externalSystems.flatMap((k) => (k.useCases ?? []).map((T) => T.id))), f = (k) => (n.aiAgents ?? []).some((T) => T.id === k), y = (k) => (n.actors ?? []).some((T) => T.id === k), v = (k) => n.externalSystems.some((T) => T.id === k), I = (k) => n.boundedContexts.some((T) => T.id === k), g = (k) => (n.aggregates ?? []).some((T) => T.id === k), l = new Set((n.uis ?? []).map((k) => k.id)), u = new Set((n.uiApps ?? []).map((k) => k.id)), x = new Set((n.pages ?? []).map((k) => k.id));
  {
    const k = l.has(t) ? t : l.has(i) ? i : null, T = k === t ? i : t;
    k && I(T) && o("ui-composition", () => {
      e.command({ kind: "set-ui-context", id: k, boundedContextId: T });
    });
  }
  {
    const k = l.has(t) ? t : l.has(i) ? i : null, T = k === t ? i : t;
    k && y(T) && o("ui-serving", () => {
      e.command({ kind: "add-ui-serving", id: k, targetId: T });
    });
  }
  {
    const k = l.has(t) ? t : l.has(i) ? i : null, T = k === t ? i : t;
    k && (u.has(T) || x.has(T)) && o("ui-assignment", () => {
      e.command({ kind: "add-ui-assignment", id: k, targetId: T });
    });
  }
  s.has(t) && s.has(i) && t !== i && o("uc-call", () => {
    (n.useCaseCalls ?? []).some((k) => k.sourceId === t && k.targetId === i) || e.command({ kind: "add-use-case-call", sourceId: t, targetId: i });
  }), s.has(t) && d.has(i) && o("query-call", () => {
    (n.queryCalls ?? []).some((k) => k.sourceId === t && k.targetId === i) || e.command({ kind: "add-query-call", sourceId: t, targetId: i });
  }), s.has(t) && g(i) && o("aggregate-call", () => {
    (n.aggregateCalls ?? []).some((k) => k.sourceId === t && k.targetId === i) || e.command({ kind: "add-aggregate-call", sourceId: t, targetId: i });
  }), (h.has(t) && r.has(i) || s.has(t) && c.has(i)) && o("emission", () => {
    (n.emissions ?? []).some((k) => k.sourceId === t && k.domainEventId === i) || e.command({ kind: "add-emission", sourceId: t, targetId: i });
  }), (r.has(t) || c.has(t)) && s.has(i) && o("flow-triggers", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), (r.has(t) || c.has(t)) && (I(i) || n.boundedContexts.some((k) => (k.readModels ?? []).some((T) => T.id === i))) && o("flow-materializes", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), y(t) && ((s.has(i) || d.has(i) || g(i) || f(i)) && o("actor-use", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), v(i) && o("ext-dep", () => {
    (n.actorExternalDependencies ?? []).some((k) => k.actorId === t && k.externalSystemId === i) || e.command({ kind: "add-actor-external", sourceId: t, targetId: i });
  })), v(t) && (v(i) && t !== i && o("ext-dep", () => {
    (n.externalSystemDependencies ?? []).some((k) => k.sourceId === t && k.targetId === i) || e.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
  }), ((n.apis ?? []).some((k) => k.id === i) || (n.proxyApis ?? []).some((k) => k.id === i)) && o("ext-dep", () => {
    (n.externalSystemDependencies ?? []).some((k) => k.sourceId === t && k.targetId === i) || e.command({ kind: "add-external-dependency", sourceId: t, targetId: i });
  }), s.has(i) && o("external-call", () => {
    (n.externalCalls ?? []).some((k) => k.externalSystemId === t && k.useCaseId === i) || e.command({ kind: "add-external-call", sourceId: t, targetId: i });
  }), g(i) && o("external-crud", () => e.command({ kind: "add-external-crud", sourceId: t, targetId: i }))), I(t) && g(i) && ((R = (n.aggregates ?? []).find((k) => k.id === i)) == null ? void 0 : R.boundedContextId) !== t && o("context-crud", () => e.command({ kind: "add-context-crud", sourceId: t, targetId: i }));
  {
    const k = (Q) => (n.apis ?? []).some((C) => C.id === Q), T = (n.proxyApis ?? []).find((Q) => Q.id === t), z = k(t) ? t : T == null ? void 0 : T.targetApiId;
    (k(t) || T != null && T.targetApiId) && I(i) && (z && o("api-implementation", () => {
      (n.apiImplementations ?? []).some(
        (Q) => Q.apiId === z && Q.boundedContextId === i
      ) || e.command({ kind: "add-api-implementation", apiId: z, boundedContextId: i });
    }), o("api-consumption", () => {
      (n.archimateRelations ?? []).some(
        (Q) => Q.sourceId === t && Q.targetId === i && Q.type === "serving"
      ) || e.command({
        kind: "add-archimate-relation",
        id: `ar-${t}-${i}-serving`,
        sourceId: t,
        targetId: i,
        type: "serving"
      });
    }));
  }
  if (s.has(t) && m.has(i) && o("external-uc-call", () => {
    (n.externalUseCaseCalls ?? []).some((k) => k.sourceId === t && k.targetId === i) || e.command({ kind: "add-external-uc-call", sourceId: t, targetId: i });
  }), f(t)) {
    const k = new Set(n.externalSystems.flatMap((z) => (z.mcpServers ?? []).map((Q) => Q.id))), T = new Set((n.apis ?? []).flatMap((z) => z.operations.map((Q) => Q.id)));
    (s.has(i) || m.has(i) || k.has(i) || (n.mcpGateways ?? []).some((z) => z.id === i) || T.has(i) || (n.apis ?? []).some((z) => z.id === i) || (n.proxyApis ?? []).some((z) => z.id === i) || d.has(i)) && o("agent-tool", () => It(e, "context-map", t, i, void 0, void 0, "__classic")), f(i) && i !== t && o("agent-delegate", () => {
      (n.agentDelegations ?? []).some((z) => z.agentId === t && z.delegateAgentId === i) || e.command({ kind: "add-agent-delegate", sourceId: t, targetId: i });
    }), (n.rags ?? []).some((z) => z.id === i) && o("agent-rag", () => {
      (n.agentRags ?? []).some((z) => z.agentId === t && z.ragId === i) || e.command({ kind: "add-agent-rag", sourceId: t, targetId: i });
    });
  }
  ((k) => (n.identityProviders ?? []).some((T) => T.id === k))(i) && (I(t) || (n.etlFlows ?? []).some((k) => k.id === t) || (n.uiApps ?? []).some((k) => k.id === t)) && o("idp-trust", () => It(e, "context-map", t, i, void 0, void 0, "__classic"));
  const N = /* @__PURE__ */ new Set();
  return a.filter((k) => N.has(k.id) ? !1 : (N.add(k.id), !0)).map((k) => {
    const T = Rp.find((z) => z.id === k.id);
    return { ...k, label: T.label, hint: T.hint };
  });
}
function It(e, t, i, n, a, o, s) {
  var w, P, L;
  const d = new Set((e.model.notes ?? []).map((_) => _.id));
  if (d.has(i) || d.has(n)) {
    const _ = d.has(i) ? i : n, b = d.has(i) ? n : i;
    if (_ === b) return;
    const A = b.startsWith("edge:") ? b.slice(5) : b.replace(/^(tgt:|flow:)/, "");
    e.command({ kind: "note-attach", id: _, targetId: A });
    return;
  }
  if (t === "distribution") {
    const _ = e.sceneFor("distribution"), b = e.model.modules ?? [], A = (F) => {
      for (let H = F; H; ) {
        if (b.some((le) => le.id === H)) return H;
        const J = _.nodes.find((le) => le.id === H);
        H = J ? J.ownerId ?? J.parentId : void 0;
      }
      return null;
    }, S = new Set((e.model.urls ?? []).map((F) => F.id)), V = new Set((e.model.services ?? []).map((F) => F.id));
    if (V.has(i) && S.has(n)) {
      e.command({ kind: "add-service-url", serviceId: i, id: n });
      return;
    }
    if (S.has(i) && V.has(n)) {
      e.command({ kind: "add-service-url", serviceId: n, id: i });
      return;
    }
    const U = A(n);
    if (U && U !== i && (e.model.services ?? []).some((F) => F.id === i)) {
      e.command({ kind: "add-service-module", serviceId: i, id: U });
      return;
    }
    if ((e.model.services ?? []).some((F) => F.id === i)) {
      const F = e.model.boundedContexts.find((le) => le.id === n), H = F ? b.filter((le) => le.boundedContextId === F.id) : [], J = H.find((le) => le.main) ?? H[0];
      if (J) {
        e.command({ kind: "add-service-module", serviceId: i, id: J.id });
        return;
      }
    }
    if (U && U !== i && !b.some((H) => H.id === i) && !e.model.boundedContexts.some((H) => H.id === i)) {
      e.command({ kind: "add-module-element", id: U, elementId: i });
      return;
    }
  }
  if (t === "integrations") {
    It(e, "context-map", i, n, a, o, s);
    return;
  }
  if (t === "eventstorming") {
    const _ = (A) => (e.model.customCodes ?? []).some((S) => S.id === A), b = _(n) ? { stepId: i, ccId: n } : _(i) ? { stepId: n, ccId: i } : null;
    if (b) {
      const A = e.owningUseCaseOf(b.stepId);
      A && e.command({
        kind: "set-use-case-step-custom-code",
        useCaseId: A.id,
        id: b.stepId,
        targetId: b.ccId
      });
      return;
    }
    return;
  }
  if (t === "workflows") {
    const _ = (H) => (e.model.actors ?? []).some((J) => J.id === H);
    if (_(i) !== _(n)) {
      const H = _(i) ? i : n, J = _(i) ? n : i, le = e.owningWorkflowOf(J);
      if (le) {
        e.command({ kind: "set-workflow-step-role", workflowId: le.id, id: J, targetId: H });
        return;
      }
    }
    const b = (H) => (e.model.pages ?? []).some((J) => J.id === H);
    if (b(i) !== b(n)) {
      const H = b(i) ? i : n, J = b(i) ? n : i, le = e.owningWorkflowOf(J);
      if (le) {
        e.command({ kind: "set-workflow-step-form", workflowId: le.id, id: J, targetId: H });
        return;
      }
    }
    const A = e.model.workflowGateways ?? [], S = (H) => A.some((J) => J.id === H);
    if (S(i) || S(n) || (e.model.workflows ?? []).some((H) => H.id === n)) {
      if (i === n) return;
      e.command({ kind: "add-workflow-link", sourceId: i, targetId: n });
      return;
    }
    const V = e.owningWorkflowOf(i), U = e.owningWorkflowOf(n);
    if (!V || V !== U || i === n) return;
    const F = V.steps.find((H) => H.id === n);
    if (((F == null ? void 0 : F.dependsOnStepIds) ?? []).includes(i)) return;
    e.command({
      kind: "add-workflow-dependency",
      workflowId: V.id,
      id: n,
      dependsOnStepId: i
    });
    return;
  }
  if (t === "ui") {
    const _ = e.model.pages ?? [], b = e.model.uiApps ?? [], A = (Z) => b.some((te) => te.id === Z), S = (Z) => _.some((te) => te.id === Z), V = (Z) => (e.model.uis ?? []).some((te) => te.id === Z);
    if (V(i) !== V(n)) {
      const Z = V(i) ? i : n, te = Z === i ? n : i;
      if (A(te) || S(te)) {
        e.command({ kind: "add-ui-assignment", id: Z, targetId: te });
        return;
      }
      if ((e.model.actors ?? []).some((_e) => _e.id === te)) {
        e.command({ kind: "add-ui-serving", id: Z, targetId: te });
        return;
      }
    }
    const U = (Z) => (e.model.customCodes ?? []).some((te) => te.id === Z);
    if (U(i) || U(n)) {
      const Z = U(i) ? i : n, te = U(i) ? n : i;
      if (U(te)) return;
      if (S(te)) {
        e.command({ kind: "set-page-custom-code", id: te, targetId: Z });
        return;
      }
      e.command({ kind: "add-custom-code-use", id: Z, elementId: te });
      return;
    }
    const F = e.model.buttonGroups ?? [], H = (Z) => F.some((te) => te.id === Z);
    if ((s === "toolbar" || s === "bottom") && H(i) && S(n)) {
      e.command({ kind: "add-page-bar-group", pageId: n, id: i, bar: s });
      return;
    }
    if (H(i) && H(n) && i !== n) {
      e.command({ kind: "add-group-subgroup", id: n, targetId: i });
      return;
    }
    const J = /^gbtn:([^:]+):(.+)$/.exec(i);
    if (J) {
      e.model.boundedContexts.some((te) => (te.useCases ?? []).some((_e) => _e.id === n)) ? e.command({ kind: "set-group-button-target", id: J[1], itemId: J[2], useCaseId: n }) : e.emit("modux-notice", { message: "El botón se cablea a un caso de uso o una policy" });
      return;
    }
    if (s === "home" && A(i) && (S(n) || A(n))) {
      if (n === i) return;
      e.command(
        S(n) ? { kind: "set-app-home-page", appId: i, pageId: n } : { kind: "set-app-home-page", appId: i, pageId: null, toAppId: n }
      );
      return;
    }
    if (s === "header" && A(i) && S(n)) {
      e.command({ kind: "set-app-header-page", appId: i, pageId: n });
      return;
    }
    if ((s === "crud-detail" || s === "crud-create") && S(i) && (S(n) || A(n)) && n !== i) {
      const Z = s === "crud-detail" ? "set-crud-detail" : "set-crud-create";
      e.command(
        S(n) ? { kind: Z, pageId: i, targetId: n, toAppId: null } : { kind: Z, pageId: i, targetId: null, toAppId: n }
      );
      return;
    }
    if (s === "viewmodel" && S(i)) {
      (e.model.models ?? []).some((Z) => Z.id === n) ? e.command({ kind: "set-page-model", pageId: i, modelId: n }) : e.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
      return;
    }
    if ((s === "view" || s === "edit") && A(i) && S(n)) {
      e.command({
        kind: s === "view" ? "set-app-view-page" : "set-app-edit-page",
        appId: i,
        pageId: n
      });
      return;
    }
    if (s) return;
    const le = (Z) => /^wizrow:([^:]+):(.+)$/.exec(Z), Se = le(i) ?? le(n);
    if (Se) {
      const Z = le(i) ? n : i;
      S(Z) && Z !== Se[1] && e.command({ kind: "set-wizard-step-page", pageId: Se[1], itemId: Se[2], targetId: Z });
      return;
    }
    const X = _.find((Z) => Z.id === n && Z.type === "WIZARD");
    if (S(i) && X && i !== X.id) {
      (X.wizardSteps ?? []).some((Z) => Z.pageId === i) || e.command({ kind: "add-page-wizard-step", pageId: X.id, targetId: i });
      return;
    }
    if (S(i) && A(n)) {
      const Z = _.find((_e) => _e.id === i), te = b.find((_e) => _e.id === n);
      if (te.type === "MASTER_DETAIL" && !te.headerPageId) {
        e.command({ kind: "set-app-header-page", appId: n, pageId: i }), e.emit("modux-notice", {
          message: `${Z.name} es la cabecera de ${te.name} — las siguientes páginas serán pestañas`
        });
        return;
      }
      e.command({
        kind: "add-menu-item",
        appId: n,
        label: Z.name,
        pageId: i,
        itemId: e.newMenuItemId(Z.name)
      });
      return;
    }
    const ae = e.model.identityProviders ?? [], ye = (Z) => ae.some((te) => te.id === Z);
    if (ye(i) || ye(n)) {
      const Z = ye(i) ? i : n, te = ye(i) ? n : i;
      A(te) ? e.command({ kind: "set-identity-provider", id: te, targetId: Z }) : e.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
      return;
    }
    const Ze = (Z) => (e.model.models ?? []).some((te) => te.id === Z);
    if (Ze(i) || Ze(n)) {
      const Z = Ze(i) ? i : n, te = Ze(i) ? n : i;
      if (S(te)) {
        e.command({ kind: "set-page-model", pageId: te, modelId: Z });
        return;
      }
      if (A(te)) {
        e.command({ kind: "set-app-model", appId: te, modelId: Z });
        return;
      }
      return;
    }
    const fe = Ee(i);
    if (fe != null && fe.itemId && ((w = Ee(n)) != null && w.itemId || A(n))) {
      const Z = Ee(n), te = e.menuEntryIn(fe.appId, fe.itemId);
      if (!te) return;
      if (Z != null && Z.itemId) {
        const _e = e.menuEntryIn(Z.appId, Z.itemId);
        if (!_e) return;
        const De = (St) => (St ?? []).some((ri) => ri.id === Z.itemId || De(ri.children));
        if (fe.appId === Z.appId && (Z.itemId === fe.itemId || De(te.entry.children)))
          return;
        const Le = e.nodeClientRect(n), Ue = Le && o !== void 0 ? (o - Le.top) / Math.max(1, Le.height) : 0.5, ot = Ue < 0.3 ? "before" : Ue > 0.7 ? "after" : "nest";
        if (ot === "nest")
          e.command({
            kind: "move-menu-item",
            appId: fe.appId,
            toAppId: Z.appId,
            itemId: fe.itemId,
            parentId: Z.itemId
          });
        else {
          const St = ot === "before" ? Z.itemId : _e.beforeId ?? void 0;
          if (fe.appId === Z.appId && _e.parentId === te.parentId && St === fe.itemId) return;
          e.command({
            kind: "move-menu-item",
            appId: fe.appId,
            toAppId: Z.appId,
            itemId: fe.itemId,
            parentId: _e.parentId ?? void 0,
            beforeItemId: St
          });
        }
        return;
      }
      if (fe.appId === n && !te.parentId) return;
      e.command({
        kind: "move-menu-item",
        appId: fe.appId,
        toAppId: n,
        itemId: fe.itemId
      });
      return;
    }
    const Ne = Ee(i) ?? Ee(n);
    if (Ne) {
      const Z = Ee(i) ? i : n, te = Ee(i) ? n : i;
      if (((P = e.sceneFor("ui").nodes.find((Ue) => Ue.id === Z)) == null ? void 0 : P.kind) === "menu-group") {
        e.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
        return;
      }
      const _e = e.model.boundedContexts.some(
        (Ue) => (Ue.useCases ?? []).some((ot) => ot.id === te)
      ), De = (e.model.aggregates ?? []).some((Ue) => Ue.id === te), Le = e.model.boundedContexts.flatMap((Ue) => Ue.queryServices ?? []).find((Ue) => (Ue.operations ?? []).some((ot) => ot.id === te));
      S(te) ? e.command({ kind: "set-menu-page", pageId: te, ...Ne }) : A(te) && te !== Ne.appId ? e.command({ kind: "set-menu-app", toAppId: te, ...Ne }) : _e ? e.command({ kind: "set-menu-use-case", useCaseId: te, ...Ne }) : De ? e.command({ kind: "set-menu-aggregate", aggregateId: te, ...Ne }) : Le && e.command({
        kind: "set-menu-query-operation",
        queryServiceId: Le.id,
        queryOperationId: te,
        ...Ne
      });
      return;
    }
    if (A(i) && (e.model.aggregates ?? []).some((Z) => Z.id === n)) {
      e.command({ kind: "add-ui-crud", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.actors ?? []).some((Z) => Z.id === i) && A(n)) {
      (e.model.actorAppUses ?? []).some((Z) => Z.actorId === i && Z.appId === n) || e.command({ kind: "add-actor-app", actorId: i, appId: n });
      return;
    }
    const he = S(i) ? { pageId: i, other: n } : S(n) ? { pageId: n, other: i } : null;
    if (he) {
      const Z = new Set(
        e.model.boundedContexts.flatMap((De) => (De.useCases ?? []).map((Le) => Le.id))
      ), te = new Set(
        e.model.boundedContexts.flatMap((De) => (De.queryServices ?? []).map((Le) => Le.id))
      ), _e = _.find((De) => De.id === he.pageId);
      Z.has(he.other) ? (_e.buttons ?? []).some((De) => De.useCaseId === he.other) || e.command({ kind: "add-page-button", pageId: he.pageId, useCaseId: he.other }) : te.has(he.other) && e.command({ kind: "set-page-listing", pageId: he.pageId, queryServiceId: he.other });
    }
    return;
  }
  if (t === "mappings") {
    const _ = e.model.models ?? [], b = dn(i), A = dn(n), S = e.model.transformations ?? [], V = e.model.customCodes ?? [], U = (X) => V.some((ae) => ae.id === X);
    if (U(i) && S.some((X) => X.id === n)) {
      e.command({ kind: "set-transformation-custom-code", id: n, targetId: i });
      return;
    }
    if (U(n) && S.some((X) => X.id === i)) {
      e.command({ kind: "set-transformation-custom-code", id: i, targetId: n });
      return;
    }
    if (U(i)) {
      const X = (A == null ? void 0 : A.modelId) ?? (_.some((ae) => ae.id === n) ? n : null);
      if (X) {
        const ae = (e.model.modelMappings ?? []).filter(
          (ye) => ye.sourceModelId === X || ye.targetModelId === X
        );
        ae.length === 1 ? e.command({ kind: "set-mapping-custom-code", id: ae[0].id, targetId: i }) : e.emit("modux-notice", {
          message: ae.length ? "El modelo participa en varios mapeados: elige el mapeado desde su ficha" : "Ese modelo no tiene mapeados donde delegar el código"
        });
        return;
      }
      return;
    }
    if (S.some((X) => X.id === n)) {
      if (A || S.some((ae) => ae.id === i)) return;
      const X = b ? { modelId: b.modelId, fieldId: b.fieldId } : _.some((ae) => ae.id === i) ? { modelId: i } : null;
      X && e.command({ kind: "add-transformation-input", id: n, ...X });
      return;
    }
    if (S.some((X) => X.id === i)) {
      const X = A ? { modelId: A.modelId, fieldId: A.fieldId } : _.some((ae) => ae.id === n) ? { modelId: n } : null;
      X && e.command({ kind: "set-transformation-output", id: i, ...X });
      return;
    }
    if (b && A) {
      if (b.modelId === A.modelId) {
        e.emit("modux-notice", { message: "Las reglas mapean campos de modelos DISTINTOS" });
        return;
      }
      let X = (e.model.modelMappings ?? []).find(
        (ae) => ae.sourceModelId === b.modelId && ae.targetModelId === A.modelId
      );
      if (!X) {
        const ae = _.find((he) => he.id === b.modelId), ye = _.find((he) => he.id === A.modelId);
        if (!ae || !ye) return;
        const Ze = (he) => he.replace(/[^a-zA-Z0-9]/g, ""), fe = new Set((e.model.modelMappings ?? []).map((he) => he.id));
        let Ne = `mapping-${ce(ae.name)}-${ce(ye.name)}`;
        for (let he = 2; fe.has(Ne); he++) Ne = `mapping-${ce(ae.name)}-${ce(ye.name)}-${he}`;
        e.command(
          { kind: "add-model-mapping", id: Ne, name: `${Ze(ae.name)}2${Ze(ye.name)}`, sourceId: ae.id, targetId: ye.id },
          !1
        ), X = { id: Ne, name: "", sourceModelId: ae.id, targetModelId: ye.id };
      }
      e.command({
        kind: "add-model-mapping-rule",
        id: X.id,
        sourceId: b.fieldId,
        targetId: A.fieldId
      });
      return;
    }
    if (b && _.some((X) => X.id === n) && n !== b.modelId) {
      e.command({ kind: "move-model-field", modelId: b.modelId, fieldId: b.fieldId, targetId: n });
      return;
    }
    if (!_.some((X) => X.id === i) || !_.some((X) => X.id === n) || i === n || (e.model.modelMappings ?? []).some((X) => X.sourceModelId === i && X.targetModelId === n))
      return;
    const F = _.find((X) => X.id === i), H = _.find((X) => X.id === n), J = (X) => X.replace(/[^a-zA-Z0-9]/g, ""), le = new Set((e.model.modelMappings ?? []).map((X) => X.id));
    let Se = `mapping-${ce(F.name)}-${ce(H.name)}`;
    for (let X = 2; le.has(Se); X++) Se = `mapping-${ce(F.name)}-${ce(H.name)}-${X}`;
    e.command({
      kind: "add-model-mapping",
      id: Se,
      name: `${J(F.name)}2${J(H.name)}`,
      sourceId: i,
      targetId: n
    });
    return;
  }
  if (t === "aggregates") {
    const _ = [...e.model.aggregates ?? [], ...e.model.entities ?? []].flatMap((b) => b.fields ?? []).find((b) => b.id === n);
    if (_) {
      const b = _.modelId;
      b && (e.model.valueObjects ?? []).some((A) => A.id === i) ? e.command({ kind: "set-model-field-type", modelId: b, fieldId: n, type: "value-object", targetId: i }) : b && (e.model.entities ?? []).some((A) => A.id === i) ? e.command({ kind: "set-model-field-type", modelId: b, fieldId: n, type: "entity", targetId: i }) : b && (e.model.models ?? []).some((A) => A.id === i) && e.command({ kind: "set-model-field-type", modelId: b, fieldId: n, type: "model", targetId: i });
      return;
    }
    if ((e.model.aggregates ?? []).some((b) => b.id === n)) {
      const b = (e.model.valueObjects ?? []).find((S) => S.id === i);
      if (b) {
        b.aggregateId !== n && e.command({ kind: "set-value-object-aggregate", id: i, aggregateId: n });
        return;
      }
      const A = (e.model.entities ?? []).find((S) => S.id === i);
      A && A.aggregateId !== n && e.command({ kind: "set-entity-aggregate", id: i, aggregateId: n });
    }
    return;
  }
  if (t !== "context-map") return;
  if (s !== "__classic" && s === void 0) {
    const _ = Np(e, i, n);
    if (_.length === 1) {
      _[0].apply();
      return;
    }
    if (_.length > 1) {
      e.openConnectPicker({
        x: a ?? 0,
        y: o ?? 0,
        options: [..._, ...Di(e, i, n)]
      });
      return;
    }
  }
  const r = /^apiop:(.+)@(.+)$/.exec(i);
  if (r) {
    const [, _, b] = r, A = (e.model.proxyApis ?? []).find((H) => H.id === b), S = (A == null ? void 0 : A.targetApiId) ?? ((L = (e.model.apiImplementations ?? []).find(
      (H) => H.boundedContextId === b && (e.model.apis ?? []).some(
        (J) => J.id === H.apiId && J.operations.some((le) => le.id === _)
      )
    )) == null ? void 0 : L.apiId);
    if (!S) return;
    if (new Set(
      e.model.boundedContexts.flatMap((H) => (H.useCases ?? []).map((J) => J.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-implementation",
        apiId: S,
        operationId: _,
        boundedContextId: b,
        targetUseCaseId: n
      });
      return;
    }
    if (!(A != null && A.targetApiId)) return;
    let U = null;
    if (n === A.targetApiId)
      U = A.targetApiId;
    else {
      const H = /^apiimpl:(.+)@(.+)$/.exec(n);
      H && H[1] === A.targetApiId ? U = H[2] : e.model.boundedContexts.some((J) => J.id === n) && (e.model.apiImplementations ?? []).some(
        (J) => J.apiId === A.targetApiId && J.boundedContextId === n
      ) && (U = n);
    }
    if (!U) return;
    (e.model.proxyOperationRoutes ?? []).some(
      (H) => H.proxyId === A.id && H.operationId === _ && H.targetSiteId === U
    ) || e.command({
      kind: "add-proxy-operation-route",
      proxyId: A.id,
      operationId: _,
      targetSiteId: U
    });
    return;
  }
  const c = new Set((e.model.aiAgents ?? []).map((_) => _.id));
  if (c.has(i)) {
    if (new Set(
      e.model.boundedContexts.flatMap((U) => (U.useCases ?? []).map((F) => F.id))
    ).has(n)) {
      (e.model.agentUses ?? []).some(
        (F) => F.agentId === i && F.useCaseId === n
      ) || e.command({ kind: "add-agent-use", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((U) => (U.useCases ?? []).map((F) => F.id))
    ).has(n)) {
      (e.model.agentExternalUses ?? []).some(
        (F) => F.agentId === i && F.externalUseCaseId === n
      ) || e.command({ kind: "add-agent-external-use", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((U) => (U.mcpServers ?? []).map((F) => F.id))
    ).has(n)) {
      (e.model.agentMcpUses ?? []).some(
        (F) => F.agentId === i && F.mcpServerId === n
      ) || e.command({ kind: "add-agent-mcp", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.mcpGateways ?? []).some((U) => U.id === n)) {
      (e.model.agentGatewayUses ?? []).some(
        (F) => F.agentId === i && F.gatewayId === n
      ) || e.command({ kind: "add-agent-gateway", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      (e.model.apis ?? []).flatMap((U) => U.operations.map((F) => F.id))
    ).has(n)) {
      (e.model.agentApiOpUses ?? []).some(
        (F) => F.agentId === i && F.apiOperationId === n
      ) || e.command({ kind: "add-agent-api-operation", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.apis ?? []).some((U) => U.id === n) || (e.model.proxyApis ?? []).some((U) => U.id === n)) {
      (e.model.agentApiUses ?? []).some(
        (F) => F.agentId === i && F.apiId === n
      ) || e.command({ kind: "add-agent-api", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.boundedContexts.flatMap((U) => (U.queryServices ?? []).map((F) => F.id))
    ).has(n)) {
      (e.model.agentQueryUses ?? []).some(
        (F) => F.agentId === i && F.queryServiceId === n
      ) || e.command({ kind: "add-agent-query", sourceId: i, targetId: n });
      return;
    }
    if (c.has(n) && n !== i) {
      (e.model.agentDelegations ?? []).some(
        (F) => F.agentId === i && F.delegateAgentId === n
      ) || e.command({ kind: "add-agent-delegate", sourceId: i, targetId: n });
      return;
    }
    (e.model.rags ?? []).some((U) => U.id === n) && ((e.model.agentRags ?? []).some(
      (F) => F.agentId === i && F.ragId === n
    ) || e.command({ kind: "add-agent-rag", sourceId: i, targetId: n }));
    return;
  }
  if ((e.model.mcpGateways ?? []).some((_) => _.id === i)) {
    const _ = (e.model.mcpGateways ?? []).find((S) => S.id === i), b = e.model.externalSystems.some((S) => (S.mcpServers ?? []).some((V) => V.id === n)) || (e.model.apis ?? []).some((S) => S.id === n) || (e.model.apis ?? []).some((S) => S.operations.some((V) => V.id === n)) || e.model.boundedContexts.some((S) => (S.useCases ?? []).some((V) => V.id === n)) || (e.model.rags ?? []).some((S) => S.id === n), A = [
      ..._.mcpServerIds ?? [],
      ..._.apiIds ?? [],
      ..._.apiOperationIds ?? [],
      ..._.useCaseIds ?? [],
      ..._.ragIds ?? []
    ].includes(n);
    b && !A && e.command({ kind: "add-gateway-exposure", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.mcpGateways ?? []).some((_) => _.id === n)) return;
  const h = (e.model.rags ?? []).find((_) => _.id === i);
  if (h) {
    if (new Set(
      e.model.boundedContexts.flatMap((A) => (A.readModels ?? []).map((S) => S.id))
    ).has(n) && !(h.sourceReadModelIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (new Set(
      e.model.externalSystems.flatMap((A) => (A.tables ?? []).map((S) => S.id))
    ).has(n) && !(h.sourceExternalTableIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (((e.model.apis ?? []).some((A) => A.id === n) || (e.model.proxyApis ?? []).some((A) => A.id === n)) && !(h.sourceApiIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((A) => A.id === n) && !(h.sourceExternalSystemIds ?? []).includes(n)) {
      e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
      return;
    }
    e.model.boundedContexts.some((A) => A.id === n) && !(h.sourceBoundedContextIds ?? []).includes(n) && e.command({ kind: "add-rag-source", sourceId: i, targetId: n });
    return;
  }
  if ((e.model.rags ?? []).some((_) => _.id === n)) return;
  if ((e.model.workflows ?? []).some((_) => _.id === i)) {
    const _ = (e.model.workflows ?? []).find((S) => S.id === i), b = (e.model.workflows ?? []).find(
      (S) => S.id === n && S.id !== i
    );
    if (b) {
      const S = _.onCompletionEventName || `${_.name.replace(/\s+/g, "")}Completado`;
      b.triggerEvent !== S && e.command({ kind: "set-workflow-trigger", id: n, triggerEvent: S });
      return;
    }
    const A = e.model.boundedContexts.flatMap((S) => S.useCases ?? []).find((S) => S.id === n);
    if (A && !(_.steps ?? []).some((V) => V.targetUseCaseId === n)) {
      const V = `wfs-${ce(A.name)}`;
      let U = V;
      for (let F = 2; (_.steps ?? []).some((H) => H.id === U); F++)
        U = `${V}-${F}`;
      e.command({
        kind: "add-workflow-step",
        workflowId: i,
        id: U,
        name: A.name,
        targetUseCaseId: n
      });
    }
    return;
  }
  if ((e.model.workflows ?? []).some((_) => _.id === n)) {
    const _ = e.model.boundedContexts.flatMap((S) => S.domainEvents ?? []).find((S) => S.id === i), b = e.model.boundedContexts.flatMap((S) => S.applicationEvents ?? []).find((S) => S.id === i), A = _ ?? b;
    if (A) {
      const S = (e.model.emissions ?? []).find((H) => H.domainEventId === i), V = new Set((e.model.aggregates ?? []).map((H) => H.id)), U = new Set(
        e.model.boundedContexts.flatMap((H) => (H.domainServices ?? []).map((J) => J.id))
      ), F = new Set(
        e.model.boundedContexts.flatMap((H) => (H.useCases ?? []).map((J) => J.id))
      );
      e.command({
        kind: "set-workflow-trigger",
        id: n,
        triggerEvent: A.name,
        triggerAggregateId: S && V.has(S.sourceId) ? S.sourceId : void 0,
        triggerDomainServiceId: S && U.has(S.sourceId) ? S.sourceId : void 0,
        triggerUseCaseId: S && F.has(S.sourceId) ? S.sourceId : void 0
      });
    }
    return;
  }
  if ((e.model.proxyApis ?? []).some((_) => _.id === i)) {
    const _ = (e.model.proxyApis ?? []).find((b) => b.id === i);
    if ((e.model.apis ?? []).some((b) => b.id === n)) {
      _.targetApiId !== n && e.command({ kind: "set-proxy-target", id: i, targetId: n });
      return;
    }
    if (e.model.boundedContexts.some((b) => b.id === n)) {
      if (!_.targetApiId) return;
      (e.model.apiImplementations ?? []).some(
        (A) => A.apiId === _.targetApiId && A.boundedContextId === n
      ) || e.command({ kind: "add-api-implementation", apiId: _.targetApiId, boundedContextId: n });
      return;
    }
    e.model.externalSystems.some((b) => b.id === n) && _.publishedByExternalSystemId !== n && e.command({ kind: "set-api-publisher", id: i, targetId: n });
    return;
  }
  if ((e.model.apis ?? []).some((_) => _.id === i)) {
    if (e.model.externalSystems.some((_) => _.id === n)) {
      (e.model.apis ?? []).find((b) => b.id === i).publishedByExternalSystemId !== n && e.command({ kind: "set-api-publisher", id: i, targetId: n });
      return;
    }
    e.model.boundedContexts.some((_) => _.id === n) && ((e.model.apiImplementations ?? []).some(
      (b) => b.apiId === i && b.boundedContextId === n
    ) || e.command({ kind: "add-api-implementation", apiId: i, boundedContextId: n }));
    return;
  }
  const m = new Set((e.model.actors ?? []).map((_) => _.id));
  if (c.has(n)) {
    if ((/* @__PURE__ */ new Set([
      ...e.model.boundedContexts.flatMap((b) => (b.domainEvents ?? []).map((A) => A.id)),
      ...e.model.boundedContexts.flatMap((b) => (b.applicationEvents ?? []).map((A) => A.id))
    ])).has(i)) {
      (e.model.agentTriggers ?? []).some(
        (A) => A.eventId === i && A.agentId === n
      ) || e.command({ kind: "add-agent-trigger", sourceId: i, targetId: n });
      return;
    }
    if (!m.has(i)) return;
  }
  if (m.has(i)) {
    const _ = new Set(
      e.model.boundedContexts.flatMap((A) => (A.useCases ?? []).map((S) => S.id))
    ), b = new Set(
      e.model.boundedContexts.flatMap((A) => (A.queryServices ?? []).map((S) => S.id))
    );
    if (_.has(n) || b.has(n)) {
      (e.model.actorUses ?? []).some(
        (S) => S.actorId === i && S.targetId === n
      ) || e.command({ kind: "add-actor-use", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aggregates ?? []).some((A) => A.id === n)) {
      e.command({ kind: "add-actor-crud", sourceId: i, targetId: n });
      return;
    }
    if (e.model.externalSystems.some((A) => A.id === n)) {
      (e.model.actorExternalDependencies ?? []).some(
        (S) => S.actorId === i && S.externalSystemId === n
      ) || e.command({ kind: "add-actor-external", sourceId: i, targetId: n });
      return;
    }
    if ((e.model.aiAgents ?? []).some((A) => A.id === n)) {
      (e.model.actorAgentUses ?? []).some(
        (S) => S.actorId === i && S.agentId === n
      ) || e.command({ kind: "add-actor-agent", sourceId: i, targetId: n });
      return;
    }
    return;
  }
  const f = e.owningApiOf(i);
  if (f) {
    if (new Set(
      e.model.boundedContexts.flatMap((b) => (b.useCases ?? []).map((A) => A.id))
    ).has(n)) {
      e.command({
        kind: "set-api-operation-target",
        apiId: f.id,
        id: i,
        targetUseCaseId: n
      });
      return;
    }
    if (e.model.boundedContexts.some((b) => b.id === n)) {
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
  const y = (_) => (e.model.notifications ?? []).find((b) => b.id === _);
  if (y(i) || y(n)) {
    const _ = y(i) ?? y(n), b = y(i) ? n : i;
    if (e.model.boundedContexts.some(
      (S) => [...S.domainEvents ?? [], ...S.applicationEvents ?? []].some((V) => V.id === b)
    )) {
      _.eventId !== b && e.command({ kind: "set-notification-event", id: _.id, targetId: b });
      return;
    }
    if ((e.model.actors ?? []).some((S) => S.id === b)) {
      (_.recipientRoleIds ?? []).includes(b) || e.command({ kind: "add-notification-recipient", id: _.id, roleId: b });
      return;
    }
    e.emit("modux-notice", {
      message: "Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)"
    });
    return;
  }
  const v = (_) => (e.model.documents ?? []).find((b) => b.id === _);
  if (v(i) || v(n)) {
    const _ = v(i) ?? v(n), b = v(i) ? n : i;
    if ((e.model.models ?? []).find((U) => U.id === b)) {
      e.command({ kind: "set-document-model", id: _.id, modelId: b });
      return;
    }
    const S = e.model.boundedContexts.flatMap((U) => U.queryServices ?? []).find((U) => U.id === b), V = e.model.boundedContexts.flatMap((U) => (U.queryServices ?? []).flatMap((F) => (F.operations ?? []).map((H) => ({ op: H, qs: F })))).find(({ op: U }) => U.id === b);
    if (S || V) {
      e.command({
        kind: "set-document-query",
        id: _.id,
        queryServiceId: (S == null ? void 0 : S.id) ?? V.qs.id,
        queryOperationId: (V == null ? void 0 : V.op.id) ?? null
      });
      return;
    }
    e.emit("modux-notice", {
      message: "Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)"
    });
    return;
  }
  const I = e.model.identityProviders ?? [], g = (_) => I.find((b) => b.id === _);
  if (g(i) || g(n)) {
    const _ = g(i) ?? g(n), b = g(i) ? n : i;
    if (g(i) && e.model.externalSystems.some((V) => V.id === b)) {
      _.publishedByExternalSystemId !== b && e.command({ kind: "set-idp-publisher", id: _.id, targetId: b });
      return;
    }
    const A = e.model.boundedContexts.some((V) => V.id === b), S = (e.model.etlFlows ?? []).some((V) => V.id === b);
    if (A || S) {
      e.command({ kind: "set-identity-provider", id: b, targetId: _.id });
      return;
    }
    e.emit("modux-notice", {
      message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
    });
    return;
  }
  const l = e.model.etlFlows ?? [], u = (_) => l.find((b) => b.id === _);
  if (u(i) || u(n)) {
    const _ = u(i) ?? u(n), b = u(i) ? n : i, A = !u(i), S = new Set(e.model.externalSystems.flatMap((ae) => (ae.tables ?? []).map((ye) => ye.id))), V = /* @__PURE__ */ new Set([
      ...(e.model.apis ?? []).map((ae) => ae.id),
      ...(e.model.proxyApis ?? []).map((ae) => ae.id)
    ]), U = (e.model.apis ?? []).find((ae) => ae.operations.some((ye) => ye.id === b)), F = new Set(
      e.model.boundedContexts.flatMap((ae) => [
        ...(ae.domainEvents ?? []).map((ye) => ye.id),
        ...(ae.applicationEvents ?? []).map((ye) => ye.id)
      ])
    );
    let H = null, J = {};
    if (S.has(b) ? (H = A ? "SOURCE_PULL" : "WRITE_DB", J = { externalTableId: b }) : U ? (H = A ? "SOURCE_PULL" : "WRITE_API", J = { apiId: U.id, operationId: b }) : V.has(b) ? (H = A ? "SOURCE_PULL" : "WRITE_API", J = { apiId: b }) : F.has(b) && (H = A ? "SOURCE_CONSUMER" : "WRITE_EVENT", J = { targetId: b }), !H) {
      e.emit("modux-notice", {
        message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
      });
      return;
    }
    if ((_.steps ?? []).some(
      (ae) => ae.type === H && (ae.externalTableId ?? ae.operationId ?? ae.apiId ?? ae.eventId) === (J.externalTableId ?? J.operationId ?? J.apiId ?? J.targetId)
    )) return;
    const Se = new Set((_.steps ?? []).map((ae) => ae.id));
    let X = (_.steps ?? []).length + 1;
    for (; Se.has(`ets-${X}`); ) X++;
    e.command({ kind: "add-etl-step", etlFlowId: _.id, id: `ets-${X}`, stepType: H, ...J });
    return;
  }
  const x = e.model.externalSystems.flatMap((_) => _.useCases ?? []).find((_) => _.id === i), E = e.model.externalSystems.flatMap((_) => _.tables ?? []).find((_) => _.id === i);
  if (x || E) {
    const _ = (x ?? E).name, b = x ? { externalUseCaseId: i } : { externalTableId: i }, A = (U) => x ? U.sourceExternalUseCaseId === i : U.sourceExternalTableId === i, S = e.model.boundedContexts.flatMap((U) => U.readModels ?? []).find((U) => U.id === n);
    if (S) {
      (e.model.projections ?? []).some(
        (F) => A(F) && F.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(_)}-${ce(S.name)}`,
        name: `${S.name}Projection`,
        ...b,
        targetId: n
      });
      return;
    }
    const V = e.model.boundedContexts.find((U) => U.id === n);
    if (V) {
      (e.model.projections ?? []).some(
        (F) => A(F) && F.boundedContextId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(_)}-${ce(V.name)}`,
        name: `${_}ViewProjection`,
        ...b,
        boundedContextId: n,
        readModelName: `${_}View`
      });
      return;
    }
    return;
  }
  const N = (e.model.aggregates ?? []).find((_) => _.id === i);
  if (N) {
    const _ = e.model.boundedContexts.flatMap((A) => A.readModels ?? []).find((A) => A.id === n);
    if (_) {
      (e.model.projections ?? []).some(
        (S) => S.sourceAggregateId === i && S.readModelId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(N.name)}-${ce(_.name)}`,
        name: `${_.name}Projection`,
        aggregateId: i,
        targetId: n
      });
      return;
    }
    const b = e.model.boundedContexts.find((A) => A.id === n);
    if (b) {
      (e.model.projections ?? []).some(
        (S) => S.sourceAggregateId === i && S.boundedContextId === n
      ) || e.command({
        kind: "add-projection",
        id: `proj-${ce(N.name)}-${ce(b.name)}`,
        name: `${N.name}ViewProjection`,
        aggregateId: i,
        boundedContextId: n,
        readModelName: `${N.name}View`
      });
      return;
    }
  }
  const R = new Set(
    e.model.boundedContexts.flatMap((_) => (_.domainEvents ?? []).map((b) => b.id))
  ), k = /* @__PURE__ */ new Set([
    ...(e.model.aggregates ?? []).map((_) => _.id),
    ...e.model.boundedContexts.flatMap((_) => (_.domainServices ?? []).map((b) => b.id))
  ]), T = new Set(
    e.model.boundedContexts.flatMap((_) => (_.applicationEvents ?? []).map((b) => b.id))
  ), z = new Set(e.model.boundedContexts.flatMap((_) => (_.useCases ?? []).map((b) => b.id))), Q = new Set(
    e.model.boundedContexts.flatMap((_) => (_.queryServices ?? []).map((b) => b.id))
  );
  if (z.has(i) && Q.has(n)) {
    (e.model.queryCalls ?? []).some(
      (b) => b.sourceId === i && b.targetId === n
    ) || e.command({ kind: "add-query-call", sourceId: i, targetId: n });
    return;
  }
  const C = new Set(
    e.model.externalSystems.flatMap((_) => (_.useCases ?? []).map((b) => b.id))
  );
  if (z.has(i) && C.has(n)) {
    (e.model.externalUseCaseCalls ?? []).some(
      (b) => b.sourceId === i && b.targetId === n
    ) || e.command({ kind: "add-external-uc-call", sourceId: i, targetId: n });
    return;
  }
  if (z.has(i) && z.has(n) && i !== n) {
    (e.model.useCaseCalls ?? []).some(
      (b) => b.sourceId === i && b.targetId === n
    ) || e.command({ kind: "add-use-case-call", sourceId: i, targetId: n });
    return;
  }
  const W = e.model.boundedContexts.flatMap((_) => _.scheduledTriggers ?? []).find((_) => _.id === i);
  if (W && z.has(n)) {
    W.useCaseId !== n && e.command({ kind: "set-scheduled-trigger-target", id: i, targetUseCaseId: n });
    return;
  }
  if (z.has(i) && (e.model.aggregates ?? []).some((_) => _.id === n)) {
    (e.model.aggregateCalls ?? []).some(
      (b) => b.sourceId === i && b.targetId === n
    ) || e.command({ kind: "add-aggregate-call", sourceId: i, targetId: n });
    return;
  }
  if (k.has(i) && R.has(n) || z.has(i) && T.has(n)) {
    (e.model.emissions ?? []).some(
      (b) => b.sourceId === i && b.domainEventId === n
    ) || e.command({ kind: "add-emission", sourceId: i, targetId: n });
    return;
  }
  if (R.has(i) || T.has(i)) {
    const _ = T.has(i), b = e.model.boundedContexts.flatMap((X) => (_ ? X.applicationEvents : X.domainEvents) ?? []).find((X) => X.id === i), A = e.model.boundedContexts.flatMap((X) => (X.useCases ?? []).map((ae) => ({ u: ae, boundedContext: X }))).find(({ u: X }) => X.id === n), S = e.model.boundedContexts.flatMap((X) => (X.readModels ?? []).map((ae) => ({ rm: ae, boundedContext: X }))).find(({ rm: X }) => X.id === n), V = e.model.boundedContexts.find((X) => X.id === n) ?? (S == null ? void 0 : S.boundedContext) ?? (A == null ? void 0 : A.boundedContext);
    if (!b || !V) return;
    const U = new Set((e.model.aggregates ?? []).map((X) => X.id)), F = new Set(
      e.model.boundedContexts.flatMap((X) => (X.domainServices ?? []).map((ae) => ae.id))
    ), H = (e.model.emissions ?? []).find(
      (X) => X.domainEventId === i && (_ ? z.has(X.sourceId) : U.has(X.sourceId) || F.has(X.sourceId))
    );
    if (!H) {
      e.emit("modux-notice", {
        message: _ ? `Declara primero qué caso de uso publica ${b.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${b.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
        kind: "info"
      });
      return;
    }
    const J = !_ && U.has(H.sourceId);
    if (A) {
      if (e.model.flows.some(
        (ae) => ae.archetype === "TRIGGERS" && ae.triggerEvent === b.name && ae.targetUseCaseId === A.u.id
      )) return;
      e.command({
        kind: "add-flow",
        id: `flow-${ce(b.name)}-${ce(A.u.name)}`,
        name: A.u.name,
        archetype: "TRIGGERS",
        triggerAggregateId: J ? H.sourceId : "",
        triggerDomainServiceId: !_ && !J ? H.sourceId : void 0,
        triggerUseCaseId: _ ? H.sourceId : void 0,
        triggerEvent: b.name,
        targetId: V.id,
        targetUseCaseId: A.u.id
      });
      return;
    }
    const le = (S == null ? void 0 : S.rm.name) ?? `${b.name}View`;
    if (e.model.flows.some(
      (X) => X.archetype === "MATERIALIZES" && X.triggerEvent === b.name && X.targetId === V.id && X.readModelName === le
    )) return;
    e.command({
      kind: "add-flow",
      id: `flow-${ce(b.name)}-${ce(le)}`,
      name: le,
      archetype: "MATERIALIZES",
      triggerAggregateId: J ? H.sourceId : "",
      triggerDomainServiceId: !_ && !J ? H.sourceId : void 0,
      triggerUseCaseId: _ ? H.sourceId : void 0,
      triggerEvent: b.name,
      targetId: V.id,
      readModelName: le
    });
    return;
  }
  const j = /* @__PURE__ */ new Set([
    ...k,
    ...z,
    ...Q,
    ...e.model.boundedContexts.flatMap((_) => (_.readModels ?? []).map((b) => b.id))
  ]);
  if (j.has(i) || j.has(n) || R.has(n) || T.has(n))
    return;
  const O = new Set(e.model.externalSystems.map((_) => _.id));
  if (O.has(i)) {
    if (new Set(
      e.model.boundedContexts.flatMap((V) => (V.useCases ?? []).map((U) => U.id))
    ).has(n)) {
      (e.model.externalCalls ?? []).some(
        (U) => U.externalSystemId === i && U.useCaseId === n
      ) || e.command({ kind: "add-external-call", sourceId: i, targetId: n });
      return;
    }
    if (O.has(n) && n !== i) {
      e.openExtDepPicker({ sourceId: i, targetId: n, x: a ?? 0, y: o ?? 0 });
      return;
    }
    const b = (e.model.apis ?? []).find(
      (V) => V.operations.some((U) => U.id === n)
    ), A = /^apiop:(.+)@(.+)$/.exec(n), S = b ? { operationId: n, siteId: b.id } : A ? { operationId: A[1], siteId: A[2] } : null;
    if (S) {
      (e.model.externalOperationUses ?? []).some(
        (U) => U.externalSystemId === i && U.operationId === S.operationId && U.siteId === S.siteId
      ) || e.command({
        kind: "add-external-operation-use",
        sourceId: i,
        operationId: S.operationId,
        targetSiteId: S.siteId
      });
      return;
    }
    if ((e.model.apis ?? []).some((V) => V.id === n) || (e.model.proxyApis ?? []).some((V) => V.id === n)) {
      (e.model.externalSystemDependencies ?? []).some(
        (U) => U.sourceId === i && U.targetId === n
      ) || e.command({ kind: "add-external-dependency", sourceId: i, targetId: n });
      return;
    }
    return;
  }
  if (O.has(n) || m.has(n)) return;
  const G = (_) => e.model.boundedContexts.some((b) => b.id === _);
  if (G(i) && G(n) && i !== n) {
    const _ = e.model.relations.find(
      (b) => b.sourceId === i && b.targetId === n && b.declared
    );
    e.openRelationPicker({
      sourceId: i,
      targetId: n,
      mode: _ ? "edit" : "create",
      x: a ?? 0,
      y: o ?? 0
    });
    return;
  }
  if (i !== n && s === void 0) {
    e.openConnectPicker({
      x: a ?? 0,
      y: o ?? 0,
      options: Di(e, i, n)
    });
    return;
  }
}
function Dp(e, t, i, n, a) {
  var o, s, d;
  if (a === "ui-serving") {
    const r = /^uisrv:(.+)->(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-ui-serving", id: r[1], targetId: r[2] }));
    return;
  }
  if (a === "ui-assignment") {
    const r = /^uiasg:(.+)->(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-ui-assignment", id: r[1], targetId: r[2] }));
    return;
  }
  if (a === "ui" && i === "node") {
    e.clearSelection(), e.command({ kind: "remove-ui", id: n });
    return;
  }
  if (a === "archimate-relation") {
    const r = n.replace(/^archi:/, "");
    e.clearSelection(), e.command({ kind: "remove-archimate-relation", id: r });
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
    const r = /^svcurl:(.+)->(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-service-url", serviceId: r[1], id: r[2] }));
    return;
  }
  if (i === "node" && a === "area") {
    e.clearSelection(), e.command({ kind: "remove-area", id: n });
    return;
  }
  if (i === "edge" && a === "note-link") {
    const r = n.slice(5), c = r.indexOf("->");
    c > 0 && (e.clearSelection(), e.command({ kind: "note-detach", id: r.slice(0, c), targetId: r.slice(c + 2) }));
    return;
  }
  if (a === "invariant" || a === "invariant-containment") {
    const r = a === "invariant" ? n : n.replace(/^protects:.+->/, "");
    e.clearSelection(), e.command({ kind: "remove-invariant", id: r });
    return;
  }
  if (t === "eventstorming" && i === "edge" && a === "es-custom") {
    const r = /^escc:(.+)$/.exec(n), c = r ? e.owningUseCaseOf(r[1]) : null;
    r && c && (e.clearSelection(), e.command({ kind: "set-use-case-step-custom-code", useCaseId: c.id, id: r[1], targetId: null }));
    return;
  }
  if (t === "eventstorming" && i === "node" && a === "custom-code") {
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
        const c = Ee(r[1]);
        c && e.command({ kind: "set-menu-page", pageId: null, ...c });
      } else if (r = /^menuapp:(.+)->[^>]+$/.exec(n)) {
        const c = Ee(r[1]);
        c && e.command({ kind: "set-menu-app", toAppId: null, ...c });
      } else if (r = /^menuuc:(.+)->[^>]+$/.exec(n)) {
        const c = Ee(r[1]);
        c && e.command({ kind: "set-menu-use-case", useCaseId: null, ...c });
      } else if (r = /^menuagg:(.+)->[^>]+$/.exec(n)) {
        const c = Ee(r[1]);
        c && e.command({ kind: "set-menu-aggregate", aggregateId: null, ...c });
      } else if (r = /^menuqop:(.+)->[^>]+$/.exec(n)) {
        const c = Ee(r[1]);
        c && e.command({ kind: "set-menu-query-operation", queryServiceId: null, queryOperationId: null, ...c });
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
      const r = Ee(n);
      r && e.command({ kind: "remove-menu-item", ...r });
      return;
    }
    if (a === "wizard-step-row") {
      const r = /^wizrow:([^:]+):(.+)$/.exec(n);
      r && e.command({ kind: "remove-page-wizard-step", pageId: r[1], targetId: r[2] });
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
      const r = /^gbtn:([^:]+):(.+)$/.exec(n);
      r && e.command({ kind: "remove-group-button", id: r[1], itemId: r[2] });
      return;
    }
    if (a === "group-subgroup") {
      const r = /^gsub:([^:]+):(.+)$/.exec(n);
      r && e.command({ kind: "remove-group-subgroup", id: r[1], targetId: r[2] });
      return;
    }
    if (i === "edge" && a === "bar-group") {
      const r = /^bargrp:([^:]+):[^:]+:(.+)$/.exec(n);
      r && e.command({ kind: "remove-page-bar-group", pageId: r[1], id: r[2] });
      return;
    }
    if (i === "edge" && a === "gbtn-target") {
      const r = /^gbtnt:([^:]+):(.+)$/.exec(n);
      r && e.command({ kind: "set-group-button-target", id: r[1], itemId: r[2], useCaseId: null });
      return;
    }
    if (i === "edge" && a === "ui-custom-page") {
      const r = /^ccpage:(.+)$/.exec(n);
      r && e.command({ kind: "set-page-custom-code", id: r[1], targetId: null });
      return;
    }
    if (i === "edge" && a === "cc-uses") {
      const r = /^ccuse:(.+)->(.+)$/.exec(n);
      r && e.command({ kind: "remove-custom-code-use", id: r[1], elementId: r[2] });
      return;
    }
    return;
  }
  if (t === "mappings" && i === "edge" && a === "model-mapping") {
    const r = /^mapping:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-model-mapping", id: r[1] }));
    return;
  }
  if (t === "mappings" && i === "edge" && a === "mapping-rule") {
    const r = /^maprule:([^:]+):(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-model-mapping-rule", id: r[1], itemId: r[2] }));
    return;
  }
  if (t === "mappings" && i === "node" && a === "model-field") {
    const r = dn(n);
    r && (e.clearSelection(), e.command({ kind: "remove-model-field", modelId: r.modelId, fieldId: r.fieldId }));
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
    const r = /^cctf:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-transformation-custom-code", id: r[1], targetId: null }));
    return;
  }
  if (t === "mappings" && i === "edge" && a === "custom-of-mapping") {
    const r = /^ccmap:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-mapping-custom-code", id: r[1], targetId: null }));
    return;
  }
  if (t === "mappings" && i === "node" && a === "transformation") {
    e.clearSelection(), e.command({ kind: "remove-transformation", id: n });
    return;
  }
  if (t === "mappings" && i === "edge" && a === "transform-input") {
    const r = /^tfin:([^:]+):([^:]+):(.*)$/.exec(n);
    r && (e.clearSelection(), e.command({
      kind: "remove-transformation-input",
      id: r[1],
      modelId: r[2],
      ...r[3] ? { fieldId: r[3] } : {}
    }));
    return;
  }
  if (t === "mappings" && i === "edge" && a === "transform-output") {
    const r = /^tfout:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-transformation-output", id: r[1] }));
    return;
  }
  if (t === "workflows" && i === "edge" && a === "workflow-dependency") {
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
  if (t === "workflows" && i === "node" && a === "workflow-gateway") {
    e.clearSelection(), e.command({ kind: "remove-workflow-gateway", id: n });
    return;
  }
  if (t === "workflows" && i === "edge" && a === "wf-role") {
    const r = /^wfrole:(.+)->(.+)$/.exec(n);
    if (r) {
      const c = e.owningWorkflowOf(r[1]);
      c && (e.clearSelection(), e.command({ kind: "set-workflow-step-role", workflowId: c.id, id: r[1] }));
    }
    return;
  }
  if (t === "workflows" && i === "edge" && a === "wf-form") {
    const r = /^wfform:(.+)->(.+)$/.exec(n);
    if (r) {
      const c = e.owningWorkflowOf(r[1]);
      if (!c) return;
      e.clearSelection(), e.command({ kind: "set-workflow-step-form", workflowId: c.id, id: r[1] });
    }
    return;
  }
  if (t === "workflows" && i === "edge" && a === "wf-link") {
    const r = /^wflink:(.+)->(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-workflow-link", sourceId: r[1], targetId: r[2] }));
    return;
  }
  if (i === "node" && a === "workflow") {
    e.clearSelection(), e.command({ kind: "remove-workflow", id: n });
    return;
  }
  if (i === "node" && a === "workflow-step") {
    const r = e.owningWorkflowOf(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-workflow-step", workflowId: r.id, id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "api-impl-wire") {
    const r = /^apiimplwire:(.+)@(.+)$/.exec(n);
    if (!r) return;
    const [, c, h] = r, m = (o = (e.model.apis ?? []).find(
      (f) => f.operations.some((y) => y.id === c)
    )) == null ? void 0 : o.id;
    if (!m) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation-implementation", apiId: m, operationId: c, boundedContextId: h });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "ext-op-use") {
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
  if (t === "context-map" && i === "edge" && a === "op-route") {
    const r = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(n);
    if (!r) return;
    const [, c, h, m] = r, f = /^apiimpl:.+@(.+)$/.exec(m), y = f ? f[1] : m;
    e.clearSelection(), e.command({ kind: "remove-proxy-operation-route", proxyId: h, operationId: c, targetSiteId: y });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "relation") {
    const r = /^rel:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-relation", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "emission") {
    const r = /^emit:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-emission", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "projection") {
    const r = /^proj:(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-projection", id: r[1] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "uc-call") {
    const r = /^uccall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-use-case-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "notification-trigger") {
    const r = /^notif:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-notification-event", id: r[1], targetId: null }));
    return;
  }
  if (t === "context-map" && i === "edge" && a === "notification-recipient") {
    const r = /^notifto:([^:]+):(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-notification-recipient", id: r[1], roleId: r[2] }));
    return;
  }
  if (t === "context-map" && i === "edge" && a === "document-query") {
    const r = /^docq:(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "set-document-query", id: r[1], queryServiceId: null, queryOperationId: null }));
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
    const r = /^idp(?:trust|svc):(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "set-identity-provider", id: r[1], targetId: null });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "idp-federation") {
    const r = /^idpfed:(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "set-idp-publisher", id: r[1], targetId: null });
    return;
  }
  if (t === "context-map" && i === "node" && a === "identity-provider") {
    e.clearSelection(), e.command({ kind: "remove-identity-provider", id: n });
    return;
  }
  if ((t === "context-map" || t === "integrations") && i === "edge" && (a === "etl-source" || a === "etl-write")) {
    const r = /^etl:([^:]+):(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-etl-step", etlFlowId: r[1], id: r[2] });
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
    const r = /^deploy:(.+)->(.+)$/.exec(n);
    r && (e.clearSelection(), e.command({ kind: "remove-service-module", serviceId: r[1], id: r[2] }));
    return;
  }
  if ((t === "context-map" || t === "distribution") && i === "node" && a === "module") {
    e.clearSelection(), e.command({ kind: "remove-module", id: n });
    return;
  }
  if (t === "distribution" && i === "node") {
    const r = e.sceneFor("distribution"), c = (h) => {
      const m = r.nodes.find((f) => f.id === h);
      return m ? m.ownerId ?? m.parentId : void 0;
    };
    for (let h = c(n); h; ) {
      if ((e.model.modules ?? []).some((m) => m.id === h)) {
        e.clearSelection(), e.command({ kind: "remove-module-element", id: h, elementId: n });
        return;
      }
      h = c(h);
    }
    return;
  }
  if (t === "context-map" && i === "edge" && a === "st-fire") {
    const r = /^stfire:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "set-scheduled-trigger-target", id: r[1], targetUseCaseId: null });
    return;
  }
  if (t === "context-map" && i === "node" && a === "scheduled-trigger") {
    e.clearSelection(), e.command({ kind: "remove-scheduled-trigger", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agg-call") {
    const r = /^aggcall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "qs-call") {
    const r = /^qscall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-query-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "external-call") {
    const r = /^extcall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-external-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "ext-uc-call") {
    const r = /^extuccall:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-external-uc-call", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-use") {
    const r = /^mcp:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-use", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-external-use") {
    const r = /^mcpx:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-external-use", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-mcp") {
    const r = /^mcpsv:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-mcp", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "gateway-exposure") {
    const r = /^gwx:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-gateway-exposure", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-gateway") {
    const r = /^aggw:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-gateway", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-api-op") {
    const r = /^agapi:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api-operation", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-query") {
    const r = /^agqs:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-query", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-delegate") {
    const r = /^agag:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-delegate", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "actor-agent") {
    const r = /^useag:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-actor-agent", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-trigger") {
    const r = /^evag:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-trigger", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (i === "node" && a === "mcp-gateway") {
    e.clearSelection(), e.command({ kind: "remove-mcp-gateway", id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-rag") {
    const r = /^agrag:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-rag", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "rag-source") {
    const r = /^ragsrc:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && (a === "rag-table" || a === "rag-api" || a === "rag-coarse")) {
    const r = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-rag-source", sourceId: r[2], targetId: r[1] });
    return;
  }
  if (i === "node" && a === "rag") {
    e.clearSelection(), e.command({ kind: "remove-rag", id: n });
    return;
  }
  if (i === "node" && a === "rag-content-source") {
    const r = /^ragcs:(.+?):(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-rag-content-source", sourceId: r[1], uri: r[2] });
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
    const r = /^apiwire:(.+)$/.exec(n), c = r ? e.owningApiOf(r[1]) : null;
    if (!r || !c) return;
    e.clearSelection(), e.command({ kind: "set-api-operation-target", apiId: c.id, id: r[1] });
    return;
  }
  if (i === "node" && a === "api") {
    e.clearSelection(), e.command({ kind: "remove-api", id: n });
    return;
  }
  if (i === "node" && a === "api-impl") {
    const r = /^apiimpl:(.+)@(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-api-implementation", apiId: r[1], boundedContextId: r[2] });
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
    const r = e.owningApiOf(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-api-operation", apiId: r.id, id: n });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "actor-use") {
    const r = /^use:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-actor-use", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "actor-ext") {
    const r = /^extdep:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-actor-external", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "ext-dep") {
    const r = /^xdep:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-external-dependency", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "wf-chain") {
    const r = /^wfchain:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "set-workflow-trigger", id: r[2], triggerEvent: "" });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "agent-api") {
    const r = /^agapi:(.+)->(.+)$/.exec(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-agent-api", sourceId: r[1], targetId: r[2] });
    return;
  }
  if (t === "context-map" && i === "edge" && a === "proxy-target") {
    const r = /^pxt:(.+)->(.+)$/.exec(n);
    if (!r || !(e.model.proxyApis ?? []).some((c) => c.id === r[1])) return;
    e.clearSelection(), e.command({ kind: "set-proxy-target", id: r[1], targetId: "" });
    return;
  }
  if (i === "node" && a === "boundedContext") {
    if ((e.model.aggregates ?? []).some((c) => c.boundedContextId === n)) return;
    e.clearSelection(), e.command({ kind: "remove-boundedContext", id: n });
    return;
  }
  if (i === "node" && a === "aggregate") {
    if ((e.model.entities ?? []).some((c) => c.aggregateId === n)) return;
    e.clearSelection(), e.command({ kind: "remove-aggregate", id: n });
    return;
  }
  if (i === "node" && a === "value-object") {
    const r = ((s = (e.model.valueObjects ?? []).find((c) => c.id === n)) == null ? void 0 : s.aggregateId) ?? "";
    e.clearSelection(), e.command({ kind: "remove-value-object", id: n, aggregateId: r });
    return;
  }
  if (i === "node" && a === "entity") {
    const r = ((d = (e.model.entities ?? []).find((c) => c.id === n)) == null ? void 0 : d.aggregateId) ?? "";
    e.clearSelection(), e.command({ kind: "remove-entity", id: n, aggregateId: r });
    return;
  }
  if (i === "node" && a === "field") {
    const r = [...e.model.aggregates ?? [], ...e.model.entities ?? []].flatMap((c) => c.fields ?? []).find((c) => c.id === n);
    e.clearSelection(), r != null && r.modelId && e.command({ kind: "remove-model-field", modelId: r.modelId, fieldId: n });
    return;
  }
  if (i === "node" && a === "operation") {
    const r = (e.model.aggregates ?? []).find((c) => (c.operations ?? []).some((h) => h.id === n));
    e.clearSelection(), e.command({ kind: "remove-operation", id: n, aggregateId: (r == null ? void 0 : r.id) ?? "" });
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
    const r = e.owningProcessOf(n);
    if (!r) return;
    e.clearSelection(), e.command({ kind: "remove-process-step", processId: r.id, id: n });
  }
}
const Lp = [
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
], xa = [
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
  { type: "field", label: "Campo", child: !0, symbol: "field", color: "#64748b", group: "Dominio" },
  { type: "operation", label: "Operación", child: !0, symbol: "operation", color: "#7c3aed", group: "Dominio" },
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
var Up = Object.defineProperty, zp = Object.getOwnPropertyDescriptor, at = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? zp(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (a = (n ? s(t, i, a) : s(a)) || a);
  return n && a && Up(t, i, a), a;
};
const Ii = 36, dt = 20, jt = 210, wi = 176, Mt = 46, Ia = 36, qp = 60, Bp = 46, wa = 60, ka = {
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
}, $a = {
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
}, _a = {
  COMMAND: "Comando",
  QUERY: "Query",
  EVENT: "Evento",
  EXTERNAL: "Externa"
};
let He = class extends Ve {
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
          const o = this.participants(), s = o[a], d = o.find((f) => f.ref === n) ?? { ref: n }, r = this.model ? _p(this.model, d, s) : { kind: "COMMAND" }, c = {
            id: `msg-${crypto.randomUUID().slice(0, 8)}`,
            fromRef: n,
            toRef: s.ref,
            kind: r.kind,
            label: r.label,
            backed: this.model ? ba(
              this.model,
              { fromRef: n, toRef: s.ref, kind: r.kind, label: r.label },
              ln(this.model, t).typeOf
            ) : !1
          }, h = this.indexAtY(i.y), m = ni(t);
          this._selectedMessageId = c.id, this.changed({
            ...t,
            participants: m,
            messages: Cp(t.messages, c, h)
          });
        }
      }
      if (this._reorder) {
        const { id: n, moved: a } = this._reorder;
        if (this._reorder = null, a) {
          const o = this.indexAtY(i.y, n);
          this.changed({ ...t, messages: Ep(t.messages, n, o) });
        }
      }
    };
  }
  emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  // ── layout ──────────────────────────────────────────────────────────────
  participants() {
    return this.interaction ? ni(this.interaction) : [];
  }
  xOf(e) {
    return Ii + wi / 2 + e * jt;
  }
  rowH(e) {
    return e.kind === "COMMAND" || e.kind === "QUERY" ? qp : Bp;
  }
  messageRows() {
    var n;
    const e = ((n = this.interaction) == null ? void 0 : n.messages) ?? [], t = mo(e);
    let i = dt + Mt + Ia;
    return e.map((a, o) => {
      const s = { m: a, y: i, num: t[o] };
      return i += this.rowH(a), s;
    });
  }
  diagramSize() {
    const e = this.participants(), t = this.messageRows(), i = t.length ? t[t.length - 1].y + this.rowH(t[t.length - 1].m) : dt + Mt + Ia;
    return {
      w: Math.max(Ii * 2 + wi + Math.max(0, e.length - 1) * jt + 60, 320),
      h: i + wa
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
    let i = -1, n = jt / 2;
    return t.forEach((a, o) => {
      const s = Math.abs(e - this.xOf(o));
      s < n && (n = s, i = o);
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
          backed: i ? ba(this.model, { ...n, kind: e.kind }, i.typeOf) : n.backed
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
        this._selectedMessageId = null, this.changed({ ...i, messages: Sp(i.messages, n) }), e.preventDefault();
      } else if (this._selectedParticipantRef) {
        const n = this._selectedParticipantRef;
        this._selectedParticipantRef = null, this.changed(Ap(i, n)), e.preventDefault();
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
    const i = this.xOf(t), n = ka[e.type] ?? ka.UNKNOWN, a = this._selectedParticipantRef === e.ref, o = e.name.length > 24 ? `${e.name.slice(0, 22)}…` : e.name;
    return ee`
      <g
        style="cursor: ${this.editable ? "pointer" : "default"}"
        @click=${(s) => {
      var d;
      s.stopPropagation(), (d = this.renderRoot.querySelector("svg")) == null || d.focus(), this._selectedParticipantRef = e.ref, this._selectedMessageId = null;
    }}
      >
        <title>${e.name} — ${$a[e.type] ?? e.type}</title>
        <rect
          x=${i - wi / 2} y=${dt} width=${wi} height=${Mt} rx="10"
          fill=${n.fill}
          style=${"stroke: " + (a ? "var(--modux-primary, #2563eb)" : n.stroke)}
          stroke-width=${a ? 2.2 : 1.4}
        ></rect>
        <text x=${i} y=${dt + 19} text-anchor="middle" font-size="12" font-weight="600" style="fill: var(--modux-text, #1e293b)">${o}</text>
        <text x=${i} y=${dt + 35} text-anchor="middle" font-size="8.5" letter-spacing="0.08em" fill=${n.stroke}>${$a[e.type] ?? e.type}</text>
      </g>
    `;
  }
  renderMessage(e) {
    const { m: t, y: i, num: n } = e, a = this.participants(), o = a.findIndex((E) => E.ref === t.fromRef), s = a.findIndex((E) => E.ref === t.toRef);
    if (o < 0 || s < 0) return ee``;
    const d = this.xOf(o), r = this.xOf(s), c = this.kindStyle(t), h = this._selectedMessageId === t.id, m = t.backed === !1, f = `${t.label ?? ""}${t.guard ? ` [${t.guard}]` : ""}`, y = f.length > 46 ? `${f.slice(0, 44)}…` : f, v = o === s, I = r >= d, g = v || I ? d + 6 : d - 6, l = v ? d + 52 : (d + r) / 2, u = v ? ee`<path
          d="M ${d} ${i} H ${d + 44} V ${i + 16} H ${d + 2}"
          fill="none"
          style=${"stroke: " + c.color}
          stroke-width="1.6"
          stroke-dasharray=${c.dashed ? "5 4" : "none"}
          marker-end="url(#${c.marker})"
        ></path>` : ee`<line
          x1=${I ? d + 2 : d - 2} y1=${i}
          x2=${I ? r - 2 : r + 2} y2=${i}
          style=${"stroke: " + c.color}
          stroke-width="1.6"
          stroke-dasharray=${c.dashed ? "5 4" : "none"}
          marker-end="url(#${c.marker})"
        ></line>`, x = !v && (t.kind === "COMMAND" || t.kind === "QUERY") ? ee`<line
            x1=${I ? r - 2 : r + 2} y1=${i + 16}
            x2=${I ? d + 2 : d - 2} y2=${i + 16}
            style="stroke: var(--modux-edge, #94a3b8)"
            stroke-width="1"
            stroke-dasharray="4 4"
            marker-end="url(#seq-ret)"
          ></line>` : "";
    return ee`
      <g
        style="cursor: ${this.editable ? "grab" : "default"}"
        @pointerdown=${(E) => this.onMessagePointerDown(E, t)}
        @dblclick=${(E) => this.onMessageDblClick(E, t)}
      >
        <title>${m ? "sin respaldo en el modelo — materialízalo o ajústalo" : `${_a[t.kind]}${f ? ` · ${f}` : ""}`}</title>
        ${h ? ee`<line
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
        <text x=${g} y=${i - 6} text-anchor=${I ? "start" : "end"} font-size="10" style="fill: var(--modux-text-dim, #64748b)">${n}</text>
        <text
          x=${l} y=${i - 8} text-anchor=${v ? "start" : "middle"}
          font-size="11.5"
          font-style=${t.kind === "QUERY" ? "italic" : "normal"}
          style=${"fill: " + (m ? "#b45309" : "var(--modux-text, #1e293b)")}
        >${m ? ee`<tspan fill="#b45309">⚠ </tspan>` : ""}${y}</text>
        ${m && this.editable ? ee`<text
              class="materialize"
              x=${I ? r - 4 : r + 4} y=${i - 8}
              text-anchor=${I ? "end" : "start"}
              font-size="12"
              @pointerdown=${(E) => E.stopPropagation()}
              @click=${(E) => {
      E.stopPropagation(), this.emit("interaction-materialize", { messageId: t.id });
    }}
            ><title>Materializar: crea en el modelo la pieza que respalda este mensaje</title>✨</text>` : ""}
      </g>
    `;
  }
  render() {
    var s;
    const e = this.interaction, t = this.participants(), i = this.messageRows(), { w: n, h: a } = this.diagramSize(), o = a - wa + 20;
    return $`
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
      return ee`
              <line
                x1=${c} y1=${dt + Mt} x2=${c} y2=${o}
                style="stroke: var(--modux-border, #cbd5e1)" stroke-width="1.2" stroke-dasharray="6 5"
              ></line>
              ${this.editable ? ee`<rect
                    x=${c - jt / 2 + 10} y=${dt + Mt}
                    width=${jt - 20} height=${Math.max(0, o - dt - Mt)}
                    fill="transparent"
                    style="cursor: crosshair"
                    @pointerdown=${(h) => this.onLifelinePointerDown(h, d.ref)}
                  ><title>Arrastra hasta otra línea de vida para crear un mensaje</title></rect>` : ""}
            `;
    })}
          ${t.map((d, r) => this.renderHeader(d, r))}
          ${i.map((d) => this.renderMessage(d))}
          ${this._connect ? ee`<line
                x1=${this.xOf(t.findIndex((d) => d.ref === this._connect.fromRef))}
                y1=${this._connect.y}
                x2=${this._connect.x}
                y2=${this._connect.y}
                style="stroke: var(--modux-primary, #2563eb)" stroke-width="1.4" stroke-dasharray="5 4"
                marker-end="url(#seq-filled-sync)"
              ></line>` : ""}
          ${(s = this._reorder) != null && s.moved ? ee`<line
                x1=${Ii / 2} y1=${this._reorder.y} x2=${n - Ii / 2} y2=${this._reorder.y}
                style="stroke: var(--modux-primary, #2563eb)" stroke-width="1.4" stroke-dasharray="7 5"
              ></line>` : ""}
        </svg>
        ${e && !t.length && !i.length ? $`<div class="empty">
              Sin participantes todavía — añádelos con «＋ Participante…» y arrastra entre
              líneas de vida para crear mensajes
            </div>` : ""}
        ${this._editor ? $`
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
      (d) => $`<option value=${d} ?selected=${d === this._editor.kind}>
                        ${_a[d]}
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
He.styles = nt`
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
at([
  de({ attribute: !1 })
], He.prototype, "interaction", 2);
at([
  de({ type: Boolean })
], He.prototype, "editable", 2);
at([
  de({ attribute: !1 })
], He.prototype, "model", 2);
at([
  B()
], He.prototype, "_selectedMessageId", 2);
at([
  B()
], He.prototype, "_selectedParticipantRef", 2);
at([
  B()
], He.prototype, "_connect", 2);
at([
  B()
], He.prototype, "_reorder", 2);
at([
  B()
], He.prototype, "_editor", 2);
He = at([
  mt("modux-sequence")
], He);
var Fp = Object.defineProperty, jp = Object.getOwnPropertyDescriptor, ne = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? jp(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (a = (n ? s(t, i, a) : s(a)) || a);
  return n && a && Fp(t, i, a), a;
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
}, Vp = Object.keys(cn);
function Wp(e, t) {
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
    case "field":
      return { elementType: "field", id: e };
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
function Gp(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((a) => a.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let ie = class extends Ve {
  constructor() {
    super(...arguments), this.model = {
      boundedContexts: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._extDepPicker = null, this._selectedId = null, this._paletteOpen = !0, this._yugo = !0, this._showDerived = !0, this.repositories = [], this.dark = !1, this._pendingNames = /* @__PURE__ */ new Set(), this._paletteOpenedForBlank = !1, this._repoPicker = null, this._wfStepPicker = null, this._branchCondEditor = null, this._invariantCondEditor = null, this._paletteFilter = "", this._paletteTab = "new", this._selectedCmp = null, this._cmpClipboard = null, this._fullscreen = !1, this._tilt = !1, this._helpOpen = !1, this._newName = "", this._newBoundedContextId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._interactionId = null, this._editingInteraction = null, this._interactionMode = "authored", this.derivedInteraction = null, this._derivePending = !1, this._interactionPrompt = null, this._interactionDelete = null, this._connectPicker = null, this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._treeOpen = !1, this._deletePicker = null, this.onFullscreenChange = () => {
      this._fullscreen = this.matches(":fullscreen");
    }, this.hostKeydown = (e) => {
      var o;
      const t = e.composedPath()[0], i = ((t == null ? void 0 : t.tagName) ?? "").toLowerCase();
      if (i === "input" || i === "textarea" || i === "select" || e.ctrlKey || e.metaKey || e.altKey) return;
      const n = this.renderRoot.querySelector("modux-canvas"), a = (s) => {
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
        case "c":
        case "C":
        case "r":
        case "R": {
          const s = this._selectedId, d = s ? [...this.model.aggregates ?? [], ...this.model.entities ?? []].flatMap((r) => r.fields ?? []).find((r) => r.id === s) : void 0;
          d != null && d.modelId && (e.preventDefault(), e.key === "c" || e.key === "C" ? this.command({ kind: "set-model-field-collection", modelId: d.modelId, fieldId: d.id, collection: !d.collection }) : this.command({ kind: "set-model-field-required", modelId: d.modelId, fieldId: d.id, required: !d.required }));
          break;
        }
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
          this._helpOpen && (this._helpOpen = !1), this._connectPicker && (this._connectPicker = null), this._invariantCondEditor && (this._invariantCondEditor = null);
          break;
      }
    }, this._gestureEffects = 0, this.onMenuSlotRequested = (e) => {
      const { id: t, appId: i, beforeId: n, nestRowId: a } = e.detail, o = Ee(t);
      if (!(o != null && o.itemId)) return;
      const s = this.menuEntryIn(o.appId, o.itemId);
      if (!s) return;
      const d = (r, c) => (r ?? []).some((h) => h.id === c || d(h.children, c));
      if (a) {
        const r = Ee(a);
        if (!(r != null && r.itemId) || r.itemId === o.itemId || o.appId === r.appId && d(s.entry.children, r.itemId)) return;
        this.command({
          kind: "move-menu-item",
          appId: o.appId,
          toAppId: r.appId,
          itemId: o.itemId,
          parentId: r.itemId
        });
        return;
      }
      if (n) {
        const r = Ee(n);
        if (!(r != null && r.itemId) || r.itemId === o.itemId) return;
        const c = this.menuEntryIn(r.appId, r.itemId);
        if (!c || o.appId === r.appId && d(s.entry.children, r.itemId) || o.appId === r.appId && c.parentId === s.parentId && s.beforeId === r.itemId)
          return;
        this.command({
          kind: "move-menu-item",
          appId: o.appId,
          toAppId: r.appId,
          itemId: o.itemId,
          parentId: c.parentId ?? void 0,
          beforeItemId: r.itemId
        });
        return;
      }
      i && this.command({ kind: "move-menu-item", appId: o.appId, toAppId: i, itemId: o.itemId });
    }, this.onWizardSlotRequested = (e) => {
      var o;
      const { id: t, beforeId: i } = e.detail, n = /^wizrow:([^:]+):(.+)$/.exec(t);
      if (!n) return;
      const a = i ? ((o = /^wizrow:[^:]+:(.+)$/.exec(i)) == null ? void 0 : o[1]) ?? null : null;
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
      const { fromPageId: t, toPageId: i, componentId: n, toParentId: a, beforeComponentId: o } = e.detail, s = this.componentIn(t, n);
      if (!s || t === i) return;
      const d = JSON.parse(JSON.stringify(s.node)), { ops: r } = this.rebuildComponentOps(i, d, a ?? void 0, o);
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
      const a = ft(i[n]);
      if (!(e in a.nodes) && !(e in (a.sizes ?? {}))) continue;
      const o = { ...a.nodes };
      delete o[e];
      const s = { ...a.sizes ?? {} };
      delete s[e], i[n] = { ...a, nodes: o, sizes: s }, t = !0;
    }
    t && (this.layout = i, this.emit("layout-changed", { layout: this.layout }));
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    var t;
    if (e.has("model") && this._pendingNames.clear(), e.has("model") && this.pruneStaleEdgePoints(), e.has("model") && this._interactionMode === "authored" && this._interactionId) {
      const i = (this.model.interactions ?? []).find((n) => n.id === this._interactionId);
      if (i) {
        const n = JSON.parse(JSON.stringify(i)), a = ni(n), o = (((t = this._editingInteraction) == null ? void 0 : t.participants) ?? []).filter(
          (s) => !a.some((d) => d.ref === s.ref) && !n.messages.some((d) => d.fromRef === s.ref || d.toRef === s.ref)
        );
        o.length && (n.participants = [...a, ...o]), this._editingInteraction = n;
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
      const a = ft(i[n]);
      if (a.flat) continue;
      const o = Sa(
        this.model,
        n.startsWith("distribution") ? "distribution" : "unified"
      ), s = /* @__PURE__ */ new Map(), d = (m, f = 0) => {
        if (f > 12) return a.nodes[m] ?? null;
        const y = s.get(m);
        if (y) return y;
        const v = a.nodes[m], I = o.get(m);
        if (!I)
          return v && s.set(m, v), v ?? null;
        if (!v) return null;
        const g = d(I, f + 1), l = g ? { x: g.x + v.x, y: g.y + v.y } : v;
        return s.set(m, l), l;
      }, r = {};
      for (const m of Object.keys(a.nodes))
        r[m] = d(m) ?? a.nodes[m];
      const c = new Set(o.values()), h = { ...a.sizes ?? {} };
      for (const m of Object.keys(h)) c.has(m) && delete h[m];
      i[n] = { ...a, nodes: r, sizes: h, flat: !0 }, t = !0;
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
    const n = { ...this.layout }, a = (h) => ft(n[h]), o = e.detail ?? "contexts", s = o === "detail" && n["context-map@detail"] ? a("context-map@detail") : o === "operations" && n["context-map@operations"] ? a("context-map@operations") : e, d = {
      nodes: { ...s.nodes },
      edges: { ...s.edges },
      sizes: { ...s.sizes ?? {} }
    };
    for (const h of ["context-map", "context-map@detail", "context-map@operations"]) {
      const m = a(h);
      for (const [f, y] of Object.entries(m.nodes)) f in d.nodes || (d.nodes[f] = y);
      for (const [f, y] of Object.entries(m.sizes ?? {})) f in d.sizes || (d.sizes[f] = y);
    }
    const r = /* @__PURE__ */ new Set();
    if (o === "contexts" || o === "distribution")
      for (const h of e.collapsed ?? []) r.add(h);
    else {
      const h = new Set(s.collapsed ?? []);
      for (const m of this.model.boundedContexts) r.add(m.id);
      for (const m of this.model.externalSystems) r.add(m.id);
      if (o === "operations") {
        for (const m of this.model.apis ?? []) r.add(m.id);
        for (const m of this.model.proxyApis ?? []) r.add(m.id);
        for (const m of this.model.apiImplementations ?? [])
          r.add(`apiimpl:${m.apiId}@${m.boundedContextId}`);
      }
      for (const m of h) r.delete(m);
    }
    n["context-map"] = { nodes: d.nodes, edges: d.edges, sizes: d.sizes, expanded: [...r] };
    const c = n["context-map@distribution"];
    if (c && !n.distribution) {
      const h = ft(c);
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
    const i = this.sceneFor(this._view), n = new Set(i.edges.map((d) => d.id)), a = new Set(i.nodes.map((d) => d.id)), o = t.filter((d) => {
      if (n.has(d)) return !1;
      const r = /^(?:[a-z-]+:)?(.+?)->(.+)$/i.exec(d);
      return !!r && a.has(r[1]) && a.has(r[2]);
    });
    if (!o.length) return;
    const s = { ...e.edges };
    o.forEach((d) => delete s[d]), this.writeViewLayout(this._view, { ...e, edges: s });
  }
  /**
   * Expanding a node grows its container over the neighbours: nudge the
   * top-level boxes apart (one undoable step) so the map stays legible.
   * Areas group by overlapping — pushing them apart would defeat them.
   */
  declumpView(e) {
    const t = this.viewLayout(e), i = this.sceneFor(e).nodes.filter(
      (s) => !s.parentId && !s.ownerId && s.kind !== "area"
    ), n = jo(i), a = [...n.keys()].map((s) => ({
      kind: "move-node",
      view: e,
      id: s,
      pos: t.nodes[s] ?? null
    })), o = { ...t.nodes };
    for (const [s, d] of n) {
      const r = i.find((h) => h.id === s), c = t.nodes[s] ?? { x: r.x, y: r.y };
      o[s] = {
        x: Math.round(c.x + (d.x - r.x)),
        y: Math.round(c.y + (d.y - r.y))
      };
    }
    this.writeViewLayout(e, { ...t, nodes: o }), a.length && this.pushUndoEntry(a);
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
    const i = wc(e, t);
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
    const { id: t, x: i, y: n } = e.detail, a = this._view, o = this.viewLayout(a), s = o.nodes[t] ?? null;
    let d = { x: i, y: n };
    const r = this.sceneFor(a), c = r.nodes.find((m) => m.id === t);
    if (c != null && c.parentId) {
      const m = r.nodes.find((f) => f.id === c.parentId);
      m && (d = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(a, { ...o, nodes: { ...o.nodes, [t]: d } });
    const h = [{ kind: "move-node", view: a, id: t, pos: s }];
    if (a === "processes") {
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
    const { id: t, targetId: i, x: n, y: a } = e.detail, o = this.model.externalSystems.find((I) => I.id === t);
    if (o) {
      const I = i ? this.model.externalSystems.find((k) => k.id === i) : null;
      if (i && !I) return;
      for (let k = I; k; ) {
        if (k.id === t) return;
        const T = k.parentExternalSystemId;
        k = T ? this.model.externalSystems.find((z) => z.id === T) ?? null : null;
      }
      const g = (I == null ? void 0 : I.id) ?? null;
      if ((o.parentExternalSystemId ?? null) === g) return;
      const l = this._view, u = this.viewLayout(l), x = this.sceneFor(l), E = g ? x.nodes.find((k) => k.id === g) : void 0, N = E ? { x: n - E.x, y: a - E.y } : { x: n, y: a }, R = g ? (this.model.externalSystemDependencies ?? []).filter(
        (k) => k.sourceId === t && k.targetId === g || k.sourceId === g && k.targetId === t
      ) : [];
      this.pushUndoEntry([
        { kind: "set-external-system-parent", id: t, parentId: o.parentExternalSystemId ?? null },
        ...R.map((k) => ({
          kind: "add-external-dependency",
          sourceId: k.sourceId,
          targetId: k.targetId,
          ...k.type === "CQRS" ? { type: "CQRS" } : {}
        })),
        { kind: "move-node", view: l, id: t, pos: u.nodes[t] ?? null }
      ]), this.command({ kind: "set-external-system-parent", id: t, parentId: g }, !1), this.writeViewLayout(l, { ...u, nodes: { ...u.nodes, [t]: N } });
      return;
    }
    const s = (this.model.apis ?? []).find((I) => I.id === t) ?? (this.model.proxyApis ?? []).find((I) => I.id === t);
    if (!s || i && !this.model.externalSystems.some((I) => I.id === i)) return;
    const d = s.publishedByExternalSystemId ?? "", r = i ?? "";
    if (r === d) return;
    const c = this._view, h = this.viewLayout(c), m = this.sceneFor(c), f = r ? m.nodes.find((I) => I.id === r) : void 0, y = f ? { x: n - f.x, y: a - f.y } : { x: n, y: a }, v = [
      { kind: "set-api-publisher", id: t, targetId: d },
      { kind: "move-node", view: c, id: t, pos: h.nodes[t] ?? null }
    ];
    this.command({ kind: "set-api-publisher", id: t, targetId: r }, !1), this.writeViewLayout(c, { ...h, nodes: { ...h.nodes, [t]: y } }), this.pushUndoEntry(v);
  }
  /**
   * Ctrl-drag dropped an API on an external system: a proxy of that API is born
   * there — named api@host, wired to the API and nested in the host — while the
   * API itself stays where it was. One undo entry removes the whole thing.
   */
  onNodeProxyRequested(e) {
    const { id: t, targetId: i, x: n, y: a } = e.detail, o = (this.model.apis ?? []).find((v) => v.id === t), s = this.model.externalSystems.find((v) => v.id === i);
    if (!o || !s || (this.model.proxyApis ?? []).some(
      (v) => v.targetApiId === t && v.publishedByExternalSystemId === i
    )) return;
    const r = `proxy-${ce(o.name)}-${ce(s.name)}`;
    if ((this.model.proxyApis ?? []).some((v) => v.id === r)) return;
    const c = this._view, h = this.viewLayout(c), f = this.sceneFor(c).nodes.find((v) => v.id === i);
    this.command(
      {
        kind: "add-proxy-api",
        id: r,
        name: `${o.name}@${s.name}`,
        targetId: t,
        boundedContextId: i
      },
      !1
    );
    const y = [{ kind: "remove-proxy-api", id: r }];
    f && (y.push({ kind: "move-node", view: c, id: r, pos: h.nodes[r] ?? null }), this.writeViewLayout(c, {
      ...h,
      nodes: { ...h.nodes, [r]: { x: n - f.x, y: a - f.y } }
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
    const n = await i.text(), a = this.selectedApiId(), o = a ? null : ((r = this.model.externalSystems.find((h) => h.id === this._selectedId)) == null ? void 0 : r.id) ?? null, s = a || o ? null : ((c = this.model.boundedContexts.find((h) => h.id === this._selectedId)) == null ? void 0 : c.id) ?? null;
    if (!a && !o && !s) {
      this.emit("modux-notice", {
        message: "Selecciona la API destino, o el sistema externo o contexto que la publicará, antes de importar"
      });
      return;
    }
    this.emit("modux-import-api", {
      content: n,
      fileName: i.name,
      apiId: a,
      homeExternalId: o,
      homeBoundedContextId: s
    });
  }
  /** One dropdown drives the diagram: the map, the distribution lens, or a specialized view. */
  onDiagramScopeChange(e) {
    e.startsWith("view:") && (this._view = e.slice(5), this._paletteOpen = !0);
  }
  /** Expansion is a sheet preference (persisted with the vista, not undoable). */
  onNodeCollapseToggled(e) {
    const { id: t } = e.detail, i = this._view, n = this.viewLayout(i), a = new Set(n.expanded ?? []), o = !a.has(t);
    o ? a.add(t) : a.delete(t), this.writeViewLayout(i, { ...n, expanded: [...a] }), o && this.declumpView(i);
  }
  /** A multi-selection drag: every position lands in ONE layout write and ONE undo entry. */
  onNodesMoved(e) {
    const { moves: t } = e.detail, i = this._view, n = this.viewLayout(i), a = this.sceneFor(i), o = { ...n.nodes }, s = [];
    for (const { id: d, x: r, y: c } of t) {
      s.push({ kind: "move-node", view: i, id: d, pos: n.nodes[d] ?? null });
      let h = { x: r, y: c };
      const m = a.nodes.find((f) => f.id === d);
      if (m != null && m.parentId) {
        const f = a.nodes.find((y) => y.id === m.parentId);
        f && (h = { x: r - f.x, y: c - f.y });
      }
      o[d] = h;
    }
    if (this.writeViewLayout(i, { ...n, nodes: o }), i === "processes")
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
    const { id: t, x: i, y: n, w: a, h: o } = e.detail, s = this._view, d = this.viewLayout(s), r = this.sceneFor(s), c = r.nodes.find((v) => v.id === t), h = c != null && c.parentId ? r.nodes.find((v) => v.id === c.parentId) : void 0, m = h ? [] : r.nodes.filter((v) => v.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: s, id: t, size: ((y = d.sizes) == null ? void 0 : y[t]) ?? null },
      { kind: "move-node", view: s, id: t, pos: d.nodes[t] ?? null },
      ...m.map((v) => ({ kind: "move-node", view: s, id: v.id, pos: d.nodes[v.id] ?? null }))
    ]);
    const f = {
      ...d.nodes,
      [t]: h ? { x: i - h.x, y: n - h.y } : { x: i, y: n }
    };
    for (const v of m) f[v.id] = { x: v.x - i, y: v.y - n };
    this.writeViewLayout(s, {
      ...d,
      nodes: f,
      sizes: { ...d.sizes ?? {}, [t]: { w: a, h: o } }
    });
  }
  onEdgePointsChanged(e) {
    const { id: t, points: i } = e.detail, n = this._view, a = this.viewLayout(n);
    this.pushUndoEntry([
      { kind: "set-edge-points", view: n, id: t, points: a.edges[t] ?? null }
    ]);
    const o = { ...a.edges };
    o[t] = i, this.writeViewLayout(n, { ...a, edges: o });
  }
  /** Order the owner's steps by their effective x; a changed order becomes a move command. */
  stepReorderCommand(e) {
    const t = this.owningProcessOf(e);
    if (!t) return null;
    const i = $n(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((s) => [s.id, s.x])), a = [...t.steps].sort(
      (s, d) => (n.get(s.id) ?? 0) - (n.get(d.id) ?? 0)
    );
    if (a.every((s, d) => s.id === t.steps[d].id)) return null;
    const o = a.findIndex((s) => s.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: o > 0 ? a[o - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: n, y: a, connectKind: o } = e.detail;
    this.applyConnection(t, i, n, a, o);
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
    return Op(this.gestureHost(), e);
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
          const a = this.uniqueInteractionId(n), o = { id: a, name: n, participants: [], messages: [] };
          this._interactionMode = "authored", this._interactionId = a, this._editingInteraction = o, this.command(xt(o));
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
        this._interactionMode = "authored", this._interactionId = i, this._editingInteraction = n, this.command(xt(n)), this.emit("modux-notice", { message: `Secuencia «${t}» fijada en el modelo` });
      }
    });
  }
  async copyInteractionMermaid() {
    const e = this.currentInteraction();
    if (e)
      try {
        await navigator.clipboard.writeText(Pp(e)), this.emit("modux-notice", { message: "Mermaid copiado al portapapeles" });
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
    const a = va(this.model).find((d) => d.ref === i);
    if (!a) return;
    const o = ni(n);
    if (o.some((d) => d.ref === i)) {
      this.emit("modux-notice", { message: `«${a.name}» ya es participante` });
      return;
    }
    const s = {
      ...n,
      participants: [...o, { ref: i, name: a.name, type: a.type }]
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
    const n = ln(this.model, t), { commands: a, hint: o } = Mp(
      this.model,
      i,
      n.typeOf,
      n.nameOf
    );
    if (!a.length) {
      this.emit("modux-notice", { message: o ?? "Este mensaje no se puede materializar" });
      return;
    }
    const s = a.flatMap((r) => this.inverseOf(r) ?? []);
    for (const r of a) this.command(r, !1);
    s.length && this.pushUndoEntry(s);
    const d = {
      ...t,
      messages: t.messages.map((r) => r.id === i.id ? { ...r, backed: !0 } : r)
    };
    this._editingInteraction = d, this.command(xt(d));
  }
  applyConnection(e, t, i, n, a) {
    const o = this._gestureEffects, s = () => !!(this._connectPicker || this._relationPicker || this._extDepPicker || this._deletePicker || this._invariantCondEditor), d = s();
    if (It(this.gestureHost(), this._view, e, t, i, n, a), this._gestureEffects === o && s() === d && a === void 0 && e !== t && ["context-map", "aggregates", "integrations"].includes(this._view)) {
      const r = this.sceneFor(this._view), c = (h) => r.nodes.some((m) => m.id === h);
      c(e) && c(t) && (this._connectPicker = {
        x: i ?? this.clientWidth / 2,
        y: n ?? 120,
        options: Di(this.gestureHost(), e, t)
      });
    }
  }
  performDelete(e, t, i) {
    Dp(this.gestureHost(), this._view, e, t, i);
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
      rebuildComponentOps: (e, t, i, n, a, o) => this.rebuildComponentOps(e, t, i, n, a, o),
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
    if (i === "field") {
      const a = [...this.model.aggregates ?? [], ...this.model.entities ?? []].flatMap((o) => o.fields ?? []).find((o) => o.id === t);
      a != null && a.modelId && this.command({ kind: "set-model-field", modelId: a.modelId, fieldId: t, name: n });
      return;
    }
    (i === "note" || i === "area" || i === "ui" || i === "page" || i === "ui-app" || i === "url" || i === "boundedContext" || i === "aggregate" || i === "entity" || i === "value-object" || i === "operation" || i === "process-step" || i === "workflow" || i === "workflow-step" || i === "domain-event" || i === "read-model" || i === "domain-service" || i === "query-service" || i === "use-case" || i === "external-use-case" || i === "external-table" || i === "mcp-server" || i === "mcp-gateway" || i === "application-event" || i === "external-system" || i === "actor" || i === "ai-agent" || i === "rag" || i === "api" || i === "proxy-api" || i === "api-operation") && this.command({ kind: "rename-element", type: i, id: t.replace(/^tgt:/, ""), name: n });
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
    const t = new Set(e.memberIds), i = (a, o, s = {}) => $`
      <label
        class="${s.child ? "child" : ""} ${s.implicit && !t.has(a) ? "implicit" : ""}"
        title=${s.implicit && !t.has(a) ? "Ya se ve por su contenedor; márcalo para que sea miembro explícito" : "Miembro de la vista — desmarcar lo quita de la vista, NO del proyecto"}
      >
        <input
          type="checkbox"
          .checked=${t.has(a)}
          @change=${(d) => this.toggleViewMember(a, d.target.checked)}
        />
        ${o}
      </label>
    `, n = (a, o) => o.length ? $`<h4>${a}</h4>${o}` : "";
    return $`
      <aside class="view-tree" @pointerdown=${(a) => a.stopPropagation()}>
        <div class="tree-title">Vista: ${e.name}</div>
        ${n(
      "Contextos",
      this.model.boundedContexts.flatMap((a) => [
        i(a.id, a.name),
        ...(this.model.aggregates ?? []).filter((o) => o.boundedContextId === a.id).map((o) => i(o.id, o.name, { child: !0, implicit: t.has(a.id) }))
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
            const a = Ee(i);
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
    const t = new Set(e.memberIds), i = this.model.boundedContexts.filter((y) => t.has(y.id)), n = new Set(i.map((y) => y.id)), a = this.model.externalSystems.filter((y) => t.has(y.id)), o = new Set(a.map((y) => y.id)), s = (this.model.aggregates ?? []).filter(
      (y) => t.has(y.id) || n.has(y.boundedContextId)
    ), d = new Set(s.map((y) => y.id)), r = (this.model.uiApps ?? []).filter((y) => t.has(y.id)), c = /* @__PURE__ */ new Set(), h = (y) => {
      for (const v of y ?? [])
        v.pageId && c.add(v.pageId), h(v.children);
    };
    r.forEach((y) => h(y.menuItems));
    const m = (this.model.pages ?? []).filter(
      (y) => t.has(y.id) || c.has(y.id)
    ), f = new Set(r.map((y) => y.id));
    return {
      ...this.model,
      uiApps: r,
      pages: m,
      actorAppUses: (this.model.actorAppUses ?? []).filter((y) => f.has(y.appId)),
      boundedContexts: i,
      externalSystems: a,
      relations: this.model.relations.filter(
        (y) => n.has(y.sourceId) && n.has(y.targetId)
      ),
      flows: this.model.flows.filter(
        (y) => t.has(y.id) || (n.has(y.sourceId) || o.has(y.sourceId)) && (n.has(y.targetId) || o.has(y.targetId))
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
        (y) => t.has(y.id) || (y.publishedByExternalSystemId ? o.has(y.publishedByExternalSystemId) : !1)
      ),
      proxyApis: (this.model.proxyApis ?? []).filter(
        (y) => t.has(y.id) || (y.publishedByExternalSystemId ? o.has(y.publishedByExternalSystemId) : !1)
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
      const n = /^wflink:(.+)->(.+)$/.exec(e.detail.id), a = n ? (this.model.workflowGateways ?? []).find((o) => o.id === n[1]) : null;
      if (n && a && a.type === "SPLIT" && a.semantics === "EXCLUSIVE") {
        const o = ((i = (a.branchConditions ?? []).find((s) => s.targetId === n[2])) == null ? void 0 : i.expression) ?? "";
        this._branchCondEditor = { gatewayId: a.id, targetId: n[2], value: o };
      }
      return;
    }
    if (this._view === "workflows" && e.detail.kind === "workflow-gateway") {
      const n = (this.model.workflowGateways ?? []).find((o) => o.id === e.detail.id);
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
      const n = e.detail.id.replace(/^archi:/, ""), a = (this.model.archimateRelations ?? []).find((o) => o.id === n);
      a && (this._connectPicker = {
        x: e.detail.x ?? this.clientWidth / 2,
        y: e.detail.y ?? 120,
        options: [
          {
            id: "invert-direction",
            label: "↔ Invertir sentido",
            hint: "Intercambia origen y destino de la relación",
            apply: () => this.command({ kind: "invert-archimate-relation", id: n })
          },
          ...Di(this.gestureHost(), a.sourceId, a.targetId).map((o) => ({
            ...o,
            label: o.id === `archimate:${a.type}` ? `● ${o.label}` : o.label,
            apply: () => {
              this.command({
                kind: "set-archimate-relation-type",
                id: n,
                type: o.id.replace(/^archimate:/, "")
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
      const n = [...this.model.aggregates ?? [], ...this.model.valueObjects ?? [], ...this.model.entities ?? []].flatMap((a) => a.invariants ?? []).find((a) => a.id === e.detail.id);
      n && (this._invariantCondEditor = {
        id: n.id,
        name: n.name,
        expression: n.expression ?? "",
        errorMessage: n.errorMessage ?? ""
      });
      return;
    }
    const t = e.detail.kind === "process-step" ? Gp(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const n = this.owningWorkflowOf(e.detail.id);
      return n ? { elementType: "workflow", id: n.id } : null;
    })() : Wp(e.detail.id, e.detail.kind);
    t && this.openInDrawer(t);
  }
  /** A fresh menu-entry id, unique across every app's tree (client-generated, like node ids). */
  newMenuItemId(e) {
    const t = /* @__PURE__ */ new Set(), i = (o) => {
      for (const s of o ?? [])
        s.id && t.add(s.id), i(s.children);
    };
    (this.model.uiApps ?? []).forEach((o) => i(o.menuItems));
    const n = `mi-${ce(e)}`;
    let a = n;
    for (let o = 2; t.has(a); o++) a = `${n}-${o}`;
    return a;
  }
  /** A fresh content-node id, unique across every page's tree (client-generated). */
  /** A node (and its parent + next sibling) inside a page's content tree. */
  componentIn(e, t) {
    const i = (this.model.pages ?? []).find((o) => o.id === e);
    let n = null;
    const a = (o, s) => {
      var r;
      const d = o ?? [];
      for (let c = 0; c < d.length; c++)
        d[c].id === t && (n = { node: d[c], parentId: s, beforeId: ((r = d[c + 1]) == null ? void 0 : r.id) ?? null }), a(d[c].children, d[c].id);
    };
    return a(i == null ? void 0 : i.content, null), n;
  }
  /**
   * Commands that recreate `node` (whole subtree) on a page. With `fresh`, every id is
   * newly allocated (paste/duplicate); without it the original ids are kept (undo,
   * cross-page moves). Returns the ops plus the id the root ended up with.
   */
  rebuildComponentOps(e, t, i, n, a = !1, o) {
    const s = o ?? this.allComponentIds(), d = (m) => {
      if (!a) return m.id;
      const f = `cmp-${ce(m.kind)}`;
      let y = f;
      for (let v = 2; s.has(y) || s.has(`${y}-tab-1`); v++) y = `${f}-${v}`;
      return s.add(y), y;
    }, r = [], c = (m, f) => {
      const y = d(m);
      r.push({ kind: "add-page-component", pageId: e, componentId: y, componentKind: m.kind, parentComponentId: f }), m.kind === "tabLayout" && (r.push({ kind: "remove-page-component", pageId: e, componentId: `${y}-tab-1` }), r.push({ kind: "remove-page-component", pageId: e, componentId: `${y}-tab-2` })), r.push({ kind: "set-page-component", pageId: e, componentId: y, ...this.cmpPatch(m) });
      for (const v of m.children ?? []) c(v, y);
      return y;
    }, h = c(t, i);
    return n && r.push({
      kind: "move-page-component",
      pageId: e,
      componentId: h,
      parentComponentId: i ?? null,
      beforeComponentId: n
    }), { ops: r, rootId: h };
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
    var o;
    if (i === t) return;
    const n = (((o = (this.model.pages ?? []).find((s) => s.id === e)) == null ? void 0 : o.wizardSteps) ?? []).map((s) => s.id ?? s.pageId), a = n.indexOf(t);
    a >= 0 && (i ? n[a + 1] === i : a === n.length - 1) || this.command({ kind: "move-page-wizard-step", pageId: e, targetId: t, beforeItemId: i });
  }
  /** A menu entry (with its parent and next sibling) inside an app's tree, by id. */
  menuEntryIn(e, t) {
    const i = (this.model.uiApps ?? []).find((o) => o.id === e);
    let n = null;
    const a = (o, s) => {
      var r;
      const d = o ?? [];
      for (let c = 0; c < d.length; c++)
        d[c].id === t && (n = { entry: d[c], parentId: s, beforeId: ((r = d[c + 1]) == null ? void 0 : r.id) ?? null }), a(d[c].children, d[c].id ?? null);
    };
    return a(i == null ? void 0 : i.menuItems, null), n;
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
      t = this._selectedCmp.pageId, me.LEAF_KINDS.has(d.node.kind) ? (i = d.parentId ?? void 0, n = d.beforeId) : i = d.node.kind === "tabLayout" && e.kind !== "tab" ? (s = (d.node.children ?? [])[0]) == null ? void 0 : s.id : d.node.id;
    } else this._selectedId && (this.model.pages ?? []).some((d) => d.id === this._selectedId) && (t = this._selectedId);
    if (!t) {
      this.emit("modux-notice", { message: "Selecciona el nodo (o el frame) donde pegar" });
      return;
    }
    const { ops: a, rootId: o } = this.rebuildComponentOps(t, e, i, n, !0);
    for (const d of a) this.command(d, !1);
    this.pushUndoEntry([{ kind: "remove-page-component", pageId: t, componentId: o }]), this._selectedCmp = { pageId: t, componentId: o };
  }
  /** The «Diseño» surface: every page as a frame, edited in place (Figma-style). */
  renderFigma() {
    const e = this.viewLayout("design");
    return $`<modux-figma
      .pages=${this.filteredModel().pages ?? []}
      .layout=${e.nodes}
      .sizes=${e.sizes ?? {}}
      @frame-resized=${(t) => {
      var s;
      const { id: i, w: n, h: a } = t.detail, o = this.viewLayout("design");
      this.pushUndoEntry([
        { kind: "resize-node", view: "design", id: i, size: ((s = o.sizes) == null ? void 0 : s[i]) ?? null }
      ]), this.writeViewLayout("design", {
        ...o,
        sizes: { ...o.sizes ?? {}, [i]: { w: n, h: a } }
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
      const { pageId: i, fieldId: n, stereotype: a, colspan: o, label: s } = t.detail;
      this.command({ kind: "set-page-field-config", pageId: i, fieldId: n, stereotype: a, colspan: o, label: s });
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
            (a) => (a.operations ?? []).map((o) => ({ id: o.id, name: `${o.name} (${a.name})` }))
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
    var d, r, c;
    const t = (d = e.dataTransfer) == null ? void 0 : d.getData("application/x-modux-palette");
    if (!t) return;
    e.preventDefault();
    const i = this._view === "design" ? this.renderRoot.querySelector("modux-figma") : this._yugo ? this.renderRoot.querySelector("modux-explorer") : this._tilt ? this.renderRoot.querySelector("modux-tilt") : this.renderRoot.querySelector("modux-canvas");
    if (!i) return;
    const n = i.sceneFromClient(e.clientX, e.clientY);
    let a = ((r = i.nodeIdAtClient(e.clientX, e.clientY)) == null ? void 0 : r.replace(/^(tgt:|flow:)/, "")) ?? null;
    !a && "nodeIdNearClient" in i && (a = ((c = i.nodeIdNearClient(e.clientX, e.clientY)) == null ? void 0 : c.replace(/^(tgt:|flow:)/, "")) ?? null);
    const o = this._view === "design" && "dropSlotAtClient" in i ? i.dropSlotAtClient(e.clientX, e.clientY) : null;
    let s;
    try {
      s = JSON.parse(t);
    } catch {
      return;
    }
    s.new ? this.createFromPalette(s.new, n, a, o) : s.existing && this.placeExistingFromPalette(s.existing, n, a, e.clientX, e.clientY, o);
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
      i.boundedContexts.flatMap((a) => (a.useCases ?? []).map((o) => o.name)),
      i.boundedContexts.flatMap((a) => (a.domainEvents ?? []).map((o) => o.name)),
      i.boundedContexts.flatMap((a) => (a.applicationEvents ?? []).map((o) => o.name)),
      i.boundedContexts.flatMap((a) => (a.readModels ?? []).map((o) => o.name)),
      i.boundedContexts.flatMap((a) => (a.domainServices ?? []).map((o) => o.name)),
      i.boundedContexts.flatMap((a) => (a.queryServices ?? []).map((o) => o.name)),
      i.boundedContexts.flatMap((a) => (a.scheduledTriggers ?? []).map((o) => o.name)),
      (i.aggregates ?? []).map((a) => a.name),
      (i.entities ?? []).map((a) => a.name),
      (i.actors ?? []).map((a) => a.name),
      (i.areas ?? []).map((a) => a.name),
      i.externalSystems.map((a) => a.name),
      i.externalSystems.flatMap((a) => (a.useCases ?? []).map((o) => o.name)),
      i.externalSystems.flatMap((a) => (a.tables ?? []).map((o) => o.name)),
      i.externalSystems.flatMap((a) => (a.mcpServers ?? []).map((o) => o.name)),
      (i.apis ?? []).map((a) => a.name),
      (i.apis ?? []).flatMap((a) => (a.operations ?? []).map((o) => o.name)),
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
      const a = t.nodes.find((o) => o.id === n);
      n = a ? a.ownerId ?? a.parentId : void 0;
    }
    return i;
  }
  /** The container a child kind needs, resolved from whatever the drop landed on. */
  /** The aggregate whose box is nearest to a scene point — the forgiving drop target. */
  nearestAggregateTo(e) {
    const t = this.sceneFor("aggregates").nodes.filter((a) => a.kind === "aggregate");
    let i = null, n = 1 / 0;
    for (const a of t) {
      const o = Math.max(Math.abs(e.x - a.x) - (a.w ?? 0) / 2, 0), s = Math.max(Math.abs(e.y - a.y) - (a.h ?? 0) / 2, 0), d = Math.hypot(o, s);
      d < n && (n = d, i = a.id);
    }
    return i;
  }
  dropContainerFor(e, t) {
    var a, o;
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
    if (e === "invariant" || e === "field") {
      const s = i.find((h) => (this.model.valueObjects ?? []).some((m) => m.id === h));
      if (s) return s;
      const d = i.find((h) => (this.model.entities ?? []).some((m) => m.id === h));
      if (d) return d;
      const r = i.find((h) => (this.model.aggregates ?? []).some((m) => m.id === h));
      if (r) return r;
      const c = i.find((h) => this.model.boundedContexts.some((m) => m.id === h));
      return ((a = (this.model.aggregates ?? []).find((h) => h.boundedContextId === c)) == null ? void 0 : a.id) ?? null;
    }
    if (["read-model", "entity", "value-object", "operation"].includes(e)) {
      const s = i.find((r) => (this.model.aggregates ?? []).some((c) => c.id === r));
      if (s) return s;
      const d = i.find((r) => this.model.boundedContexts.some((c) => c.id === r));
      return ((o = (this.model.aggregates ?? []).find((r) => r.boundedContextId === d)) == null ? void 0 : o.id) ?? null;
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
    const a = xa.find((v) => v.type === e);
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
      const v = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, I = v ? v[1] : i && (this.model.pages ?? []).some((u) => u.id === i) ? i : null;
      if (!I) {
        this.emit("modux-notice", { message: "Suelta el custom code sobre una página o un componente" });
        return;
      }
      const { id: g, name: l } = this.uniquePaletteName("Custom code");
      this.command({ kind: "add-custom-code", id: g, name: l }, !1), v ? (this.command({ kind: "set-page-component-custom-code", pageId: I, componentId: v[2], targetId: g }), this.emit("modux-notice", { message: "Componente CUSTOM — su código se declara en el nodo CODE (vista UI/Mapeados)" })) : (this.command({ kind: "set-page-custom-code", id: I, targetId: g }), this.emit("modux-notice", { message: "Página CUSTOM — cablea desde su CODE lo que usa (vista UI)" }));
      return;
    }
    if (e.startsWith("cmp:")) {
      const v = e.slice(4), I = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, g = I ? I[1] : i && (this.model.pages ?? []).some((N) => N.id === i) ? i : null;
      if (!g) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let l = I ? I[2] : void 0, u = null;
      if (v === "tab") {
        let N = null, R = l ? this.componentIn(g, l) : null;
        for (; R; ) {
          if (R.node.kind === "tabLayout") {
            N = R.node.id;
            break;
          }
          R = R.parentId ? this.componentIn(g, R.parentId) : null;
        }
        if (!N) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const k = this.componentIn(g, N).node, T = this.newComponentId("tab"), z = `Pestaña ${(k.children ?? []).filter((Q) => Q.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: g, componentId: T, componentKind: "tab", parentComponentId: N }, !1), this.command({ kind: "set-page-component", pageId: g, componentId: T, title: z }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: g, componentId: T }]);
        return;
      }
      if (n != null && n.componentId && n.pos !== "into") {
        const N = this.componentIn(g, n.componentId);
        N && N.node.kind === "tab" ? l = N.node.id : N && (l = N.parentId ?? void 0, u = n.pos === "before" ? n.componentId : N.beforeId);
      } else if (l) {
        const N = ((f = this.componentIn(g, l)) == null ? void 0 : f.node) ?? null;
        (N == null ? void 0 : N.kind) === "tabLayout" && (N.children ?? [])[0] && (l = (N.children ?? [])[0].id);
      }
      const x = this.newComponentId(v), E = {
        kind: "add-page-component",
        pageId: g,
        componentId: x,
        componentKind: v,
        parentComponentId: l
      };
      if (!u) {
        this.command(E);
        return;
      }
      this.command(E, !1), this.command(
        { kind: "move-page-component", pageId: g, componentId: x, parentComponentId: l ?? null, beforeComponentId: u },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: g, componentId: x }]);
      return;
    }
    const o = this._view, s = this.sceneFor(o), d = (v, I) => {
      if (this.purgeNodeGeometry(v), I)
        return { kind: "move-node", view: o, id: v, pos: null };
      const g = this.viewLayout(o);
      return this.writeViewLayout(o, {
        ...g,
        nodes: { ...g.nodes, [v]: { x: Math.round(t.x), y: Math.round(t.y) } }
      }), { kind: "move-node", view: o, id: v, pos: null };
    }, r = (v, I, g) => {
      const l = this.inverseOf(v) ?? [];
      this.command(v, !1);
      const u = d(I, g);
      this.pushUndoEntry([...l, u]);
    };
    if (!a.child) {
      const { id: v, name: I } = this.uniquePaletteName(a.label), g = e === "boundedContext" ? { kind: "add-boundedContext", id: v, name: I, subdomainType: "SUPPORTING" } : e === "note" ? { kind: "add-note", id: v, name: I } : e === "area" ? { kind: "add-area", id: v, name: I } : e === "actor" ? { kind: "add-actor", id: v, name: I } : e === "external-system" ? { kind: "add-external-system", id: v, name: I } : e === "ai-agent" ? { kind: "add-ai-agent", id: v, name: I } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: v, name: I, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: v, name: I } : e === "rag" ? { kind: "add-rag", id: v, name: I } : e === "api" ? { kind: "add-api", id: v, name: I } : e === "proxy-api" ? { kind: "add-proxy-api", id: v, name: I } : e === "ui" ? { kind: "add-ui", id: v, name: I } : e === "ui-app" ? { kind: "create-ui-app", id: v, name: I } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: v, name: I, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: v, name: I, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: v, name: I, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: v, name: I } : e === "transformation" ? { kind: "add-transformation", id: v, name: I } : e === "custom-code" ? { kind: "add-custom-code", id: v, name: I } : e === "button-group" ? { kind: "add-button-group", id: v, name: I } : e === "identity-provider" ? { kind: "add-identity-provider", id: v, name: I } : e === "service" ? { kind: "add-service", id: v, name: I } : e === "url" ? { kind: "add-url", id: v, name: I } : {
        kind: "add-workflow",
        id: v,
        name: I,
        completionEventName: `${I.replace(/\s+/g, "")}Completado`
      };
      if (g.kind === "add-ui") {
        const u = this.dropChain(i).find((x) => this.model.boundedContexts.some((E) => E.id === x));
        if (u) {
          r({ ...g, boundedContextId: u }, v);
          return;
        }
      }
      if (g.kind === "create-ui-app") {
        const u = this.dropChain(i).find((x) => this.model.boundedContexts.some((E) => E.id === x));
        if (u) {
          r({ ...g, boundedContextId: u }, v);
          return;
        }
      }
      if (g.kind === "add-external-system") {
        const u = this.dropChain(i).find((x) => this.model.externalSystems.some((E) => E.id === x));
        if (u) {
          r({ ...g, parentId: u }, v), this.emit("modux-notice", { message: "Subsistema creado como parte del sistema" });
          return;
        }
      }
      r(g, v);
      return;
    }
    if (e === "ui-wizard-step") {
      const I = this.dropChain(i).map((x) => {
        var E;
        return ((E = /^wizrow:([^:]+):/.exec(x)) == null ? void 0 : E[1]) ?? x;
      }).find((x) => (this.model.pages ?? []).some((E) => E.id === x && E.type === "WIZARD"));
      if (!I) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const g = ((y = (this.model.pages ?? []).find((x) => x.id === I)) == null ? void 0 : y.wizardSteps) ?? [], l = new Set(g.map((x) => x.id ?? x.pageId));
      let u = g.length + 1;
      for (; l.has(`wzs-${u}`); ) u++;
      this.command({ kind: "add-page-wizard-step", pageId: I, itemId: `wzs-${u}`, label: `Paso ${u}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const v = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", I = v === "CRUD" ? "CRUD" : v === "WIZARD" ? "Wizard" : "Página", { id: g, name: l } = this.uniquePaletteName(I), u = this.dropChain(i), x = u.find((N) => (this.model.uiApps ?? []).some((R) => R.id === N)), E = u.map((N) => {
        var R;
        return ((R = /^wizrow:([^:]+):/.exec(N)) == null ? void 0 : R[1]) ?? N;
      }).find((N) => (this.model.pages ?? []).some((R) => R.id === N && R.type === "WIZARD"));
      if (E) {
        const N = s.nodes.find((k) => k.id === E);
        N && (t.x = N.x + N.w / 2 + 160, t.y = N.y - N.h / 2 + 40), this.command({ kind: "create-ui-page", id: g, name: l, pageType: v }, !1), this.command({ kind: "add-page-wizard-step", pageId: E, targetId: g }, !1);
        const R = d(g);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: g }, R]), this.emit("modux-notice", { message: `${l} creada como paso del wizard` });
        return;
      }
      if (x) {
        const N = s.nodes.find((R) => R.id === x);
        N && (t.x = N.x + N.w / 2 + 160, t.y = N.y - N.h / 2 + 40);
      }
      r(
        x ? { kind: "create-ui-page", id: g, name: l, pageType: v, appId: x, menuLabel: l } : { kind: "create-ui-page", id: g, name: l, pageType: v },
        g
      );
      return;
    }
    if (e === "menu-item") {
      const v = this.dropChain(i), I = v.find((E) => (this.model.uiApps ?? []).some((N) => N.id === E));
      if (!I) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const g = /* @__PURE__ */ new Set(), l = (E) => {
        for (const N of E ?? [])
          g.add(N.label), l(N.children);
      };
      (this.model.uiApps ?? []).forEach((E) => l(E.menuItems));
      let u = "Entrada";
      for (let E = 2; g.has(u); E++) u = `Entrada ${E}`;
      const x = v.map((E) => Ee(E)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: I,
        label: u,
        itemId: this.newMenuItemId(u),
        parentId: x == null ? void 0 : x.itemId,
        parentLabel: x != null && x.itemId || x == null ? void 0 : x.label
      });
      return;
    }
    if (e === "etl-transform") {
      const I = this.dropChain(i).map((u) => (this.model.etlFlows ?? []).find((x) => x.id === u)).find(Boolean);
      if (!I) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const g = new Set((I.steps ?? []).map((u) => u.id));
      let l = (I.steps ?? []).length + 1;
      for (; g.has(`ets-${l}`); ) l++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: I.id,
        id: `ets-${l}`,
        name: `Transformación ${l}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "etl-flow" && !this.dropContainerFor(e, i)) {
      const v = this.uniquePaletteName(a.label);
      r({ kind: "add-etl-flow", id: v.id, name: v.name }, v.id), this.emit("modux-notice", {
        message: "Integrador creado suelto — su contexto dueño se fija en la ficha; cablea fuentes y escrituras aquí"
      });
      return;
    }
    if (e === "workflow-join" || e === "workflow-split") {
      const { id: v, name: I } = this.uniquePaletteName(e === "workflow-join" ? "Join" : "Split");
      r({
        kind: "add-workflow-gateway",
        id: v,
        name: I,
        stepType: e === "workflow-join" ? "JOIN" : "SPLIT"
      }, v), this.emit("modux-notice", {
        message: "Gateway creado suelto — sus líneas dirán de qué workflow es (join: n entradas → 1 salida; split: 1 → n)"
      });
      return;
    }
    if (e === "workflow-step") {
      const I = this.model.workflows ?? [], g = this.dropChain(i), l = g.map((R) => I.find((k) => k.id === R)).find(Boolean), u = g.map((R) => {
        const k = I.find((T) => (T.steps ?? []).some((z) => z.id === R));
        return k ? { owner: k, stepId: R } : null;
      }).find(Boolean);
      let x = l ?? (u == null ? void 0 : u.owner);
      if (!x && I.length === 1 && (x = I[0]), !x) {
        if (!I.length) {
          this.emit("modux-notice", { message: "Crea antes un workflow: los pasos viven en uno" });
          return;
        }
        this._wfStepPicker = { pos: t, stepType: void 0 };
        return;
      }
      const { id: E, name: N } = this.uniquePaletteName(
        "Paso"
      );
      u && (t = { x: t.x + 190, y: t.y }), r(
        {
          kind: "add-workflow-step",
          workflowId: x.id,
          id: E,
          name: N,
          ...u ? { dependsOnStepIds: [u.stepId], afterStepId: u.stepId } : {}
        },
        E
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
      const { id: I, name: g } = this.uniquePaletteName("API"), l = { kind: "add-api", id: I, name: g }, u = this.inverseOf(l) ?? [];
      this.command(l, !1), this.model.externalSystems.some((R) => R.id === v) ? this.command({ kind: "set-api-publisher", id: I, targetId: v }, !1) : this.command({ kind: "add-api-implementation", apiId: I, boundedContextId: v }, !1);
      const x = this.viewLayout(this._view), E = this.sceneFor(this._view).nodes.find((R) => R.id === v), N = E ? { x: Math.round(t.x - E.x), y: Math.round(t.y - E.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...x, nodes: { ...x.nodes, [I]: N } }), this.pushUndoEntry([...u, { kind: "move-node", view: this._view, id: I, pos: null }]);
      return;
    }
    let c = this.dropContainerFor(e, i);
    if (!c && this._view === "aggregates" && ["value-object", "entity", "invariant", "field", "operation"].includes(e) && (c = this.nearestAggregateTo(t)), !c) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : ["entity", "value-object", "invariant", "field", "operation"].includes(e) ? "Suéltalo sobre un agregado (o cerca de uno, en la vista de agregados)" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const { id: h, name: m } = this.uniquePaletteName(a.label);
    if (e === "aggregate")
      r({ kind: "add-aggregate", id: h, name: m, boundedContextId: c }, h, c);
    else if (e === "entity") {
      r({ kind: "add-entity", id: h, name: m, aggregateId: c }, h, c);
      const v = (this.model.aggregates ?? []).find((I) => I.id === c);
      this.emit("modux-notice", { message: `Entidad «${m}» creada en el agregado «${(v == null ? void 0 : v.name) ?? c}»` });
    } else if (e === "value-object") {
      r({ kind: "add-value-object", id: h, name: m, aggregateId: c }, h, c);
      const v = (this.model.aggregates ?? []).find((I) => I.id === c);
      this.emit("modux-notice", { message: `Value object «${m}» creado en el agregado «${(v == null ? void 0 : v.name) ?? c}»` });
    } else if (e === "operation") {
      r({ kind: "add-operation", id: h, name: m, aggregateId: c }, h, c);
      const v = (this.model.aggregates ?? []).find((I) => I.id === c);
      this.emit("modux-notice", {
        message: `Operación «${m}» creada en «${(v == null ? void 0 : v.name) ?? c}» — sus modelos de entrada/salida se editan en la ficha`
      });
    } else if (e === "invariant") {
      this.command({ kind: "add-invariant", ownerId: c, id: h, name: m });
      const v = (this.model.valueObjects ?? []).some((I) => I.id === c) ? "value object" : (this.model.entities ?? []).some((I) => I.id === c) ? "entidad" : "agregado";
      this.emit("modux-notice", {
        message: `Invariante declarado en el ${v} — sus condiciones se detallan en su ficha`
      });
    } else if (e === "field") {
      const v = (this.model.aggregates ?? []).find((g) => g.id === c) ?? (this.model.entities ?? []).find((g) => g.id === c), I = v == null ? void 0 : v.modelId;
      I ? (this.command({ kind: "add-model-field", modelId: I, fieldId: h, name: m }), this.emit("modux-notice", {
        message: `Campo «${m}» creado en «${(v == null ? void 0 : v.name) ?? c}» — arrastra un value object sobre él para tiparlo`
      })) : this.emit("modux-notice", { message: "Suelta el campo sobre un agregado o entidad" });
    } else if (e === "ui-button") {
      const v = (this.model.buttonGroups ?? []).find((l) => l.id === c), I = new Set(((v == null ? void 0 : v.buttons) ?? []).map((l) => l.id));
      let g = ((v == null ? void 0 : v.buttons) ?? []).length + 1;
      for (; I.has(`btn-${g}`); ) g++;
      this.command({ kind: "add-group-button", id: c, itemId: `btn-${g}`, label: m }), this.emit("modux-notice", {
        message: "Botón creado — arrastra su asa hasta un caso de uso o policy para fijar qué dispara"
      });
    } else if (e === "model-field")
      this.command({ kind: "add-model-field", modelId: c, fieldId: h, name: m });
    else if (e === "module")
      r({ kind: "add-module", id: h, name: m, boundedContextId: c }, h, c), this.emit("modux-notice", {
        message: "Módulo creado — arrastra el asa de los elementos del contexto hasta él para distribuirlos"
      });
    else if (e === "use-case" || e === "policy")
      r(
        { kind: "add-use-case", id: h, name: m, boundedContextId: c, ...e === "policy" ? { policy: !0 } : {} },
        h,
        c
      );
    else if (e === "domain-event")
      r({ kind: "add-domain-event", id: h, name: m, boundedContextId: c }, h, c);
    else if (e === "application-event")
      r({ kind: "add-application-event", id: h, name: m, boundedContextId: c }, h, c);
    else if (e === "domain-service")
      r({ kind: "add-domain-service", id: h, name: m, boundedContextId: c }, h, c);
    else if (e === "query-service")
      r({ kind: "add-query-service", id: h, name: m, boundedContextId: c }, h, c);
    else if (e === "scheduled-trigger")
      r({ kind: "add-scheduled-trigger", id: h, name: m, boundedContextId: c }, h, c), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "notification")
      r({ kind: "add-notification", id: h, name: m, boundedContextId: c }, h, c), this.emit("modux-notice", {
        message: "Notificación creada (canal EMAIL) — arrastra un evento hasta ella y de ella a los roles que avisa"
      });
    else if (e === "document")
      r({ kind: "add-document", id: h, name: m, boundedContextId: c }, h, c), this.emit("modux-notice", {
        message: "Documento creado — arrástralo a un modelo (plantilla) o a una consulta (informe)"
      });
    else if (e === "etl-flow")
      r({ kind: "add-etl-flow", id: h, name: m, boundedContextId: c }, h, c), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const v = (this.model.aggregates ?? []).find((I) => I.id === c);
      r({ kind: "add-read-model", id: h, name: m, aggregateId: c }, h, (v == null ? void 0 : v.boundedContextId) ?? c);
    } else if (e === "api-operation") {
      const v = (this.model.apis ?? []).find((x) => x.id === c), I = new Set(((v == null ? void 0 : v.operations) ?? []).map((x) => x.id));
      let g = m, l = `apiop-${c.replace(/^api-/, "")}-${ce(g)}`;
      for (let x = 2; I.has(l); x++)
        g = `${a.label} ${x}`, l = `apiop-${c.replace(/^api-/, "")}-${ce(g)}`;
      r({ kind: "add-api-operation", apiId: c, id: l, name: g }, l, c), s.nodes.some(
        (x) => x.parentId === c && (x.kind === "api-operation" || x.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(v == null ? void 0 : v.name) ?? c} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const v = this.model.boundedContexts.flatMap((u) => u.useCases ?? []).find((u) => u.id === c), I = new Set((v == null ? void 0 : v.stepIds) ?? []);
      let g = m, l = `step-${ce(g)}`;
      for (let u = 2; I.has(l); u++)
        g = `${a.label} ${u}`, l = `step-${ce(g)}`;
      r({ kind: "add-use-case-step", useCaseId: c, id: l, name: g }, l, c), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(v == null ? void 0 : v.name) ?? c} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? r({ kind: "add-external-use-case", id: h, name: m, boundedContextId: c }, h, c) : e === "external-table" ? r({ kind: "add-external-table", id: h, name: m, boundedContextId: c }, h, c) : e === "mcp-server" && r({ kind: "add-mcp-server", id: h, name: m, boundedContextId: c }, h, c);
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
      const y = (this.model.modelMappings ?? []).find((I) => I.id === e);
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
      const v = this.model.boundedContexts.flatMap((I) => I.useCases ?? []).find((I) => I.id === e);
      if (v) {
        if (e === n[2]) return;
        const I = (this.model.pages ?? []).find((l) => l.id === n[1]), g = ((I == null ? void 0 : I.buttons) ?? []).find((l) => l.useCaseId === n[2]);
        if (!g) return;
        if (((I == null ? void 0 : I.buttons) ?? []).some((l) => l.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: n[1], useCaseId: n[2] }, !1), this.command(
          { kind: "add-page-button", pageId: n[1], useCaseId: e, label: g.label, type: g.bar },
          !1
        ), g.mappingId && this.command(
          { kind: "set-page-button", pageId: n[1], useCaseId: e, label: null, mappingId: g.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: n[1], useCaseId: e },
          { kind: "add-page-button", pageId: n[1], useCaseId: n[2], label: g.label, type: g.bar },
          ...g.mappingId ? [{ kind: "set-page-button", pageId: n[1], useCaseId: n[2], label: null, mappingId: g.mappingId }] : []
        ]), this.emit("modux-notice", { message: `El botón lanza ahora ${v.name}` });
        return;
      }
      this.emit("modux-notice", { message: "Sobre un botón se sueltan mapeados o casos de uso del Catálogo" });
      return;
    }
    const a = t ? /^bar:([^:]+):(.+)$/.exec(t) : null;
    if (a) {
      const y = this.model.boundedContexts.flatMap((I) => I.useCases ?? []).find((I) => I.id === e);
      if (!y) {
        this.emit("modux-notice", { message: "En una barra se sueltan CASOS DE USO del Catálogo" });
        return;
      }
      const v = (this.model.pages ?? []).find((I) => I.id === a[1]);
      if (((v == null ? void 0 : v.buttons) ?? []).some((I) => I.useCaseId === e)) {
        this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
        return;
      }
      this.command({ kind: "add-page-button", pageId: a[1], useCaseId: e, type: a[2] }), this.emit("modux-notice", { message: `Botón de ${y.name} en la barra ${a[2] === "bottom" ? "de abajo" : "superior"}` });
      return;
    }
    const o = t ? /^cmp:([^:]+):(.+)$/.exec(t) : null, s = o ? o[1] : t && (this.model.pages ?? []).some((y) => y.id === t) ? t : null;
    if (!s) {
      this.emit("modux-notice", { message: "Suelta el elemento sobre una página o uno de sus componentes" });
      return;
    }
    const d = o ? ((f = this.componentIn(s, o[2])) == null ? void 0 : f.node) ?? null : null, r = this.model.boundedContexts.flatMap((y) => y.useCases ?? []).find((y) => y.id === e);
    if (r) {
      (d == null ? void 0 : d.kind) === "button" ? (this.command({ kind: "set-page-component", pageId: s, componentId: d.id, ...this.cmpPatch(d), useCaseId: e, label: d.label ?? r.name }), this.emit("modux-notice", { message: `El botón lanza ${r.name}` })) : (this.command({ kind: "add-page-button", pageId: s, useCaseId: e }), this.emit("modux-notice", { message: `Botón de ${r.name} añadido a la página` }));
      return;
    }
    const c = (this.model.models ?? []).find((y) => y.id === e);
    if (c) {
      (d == null ? void 0 : d.kind) === "form" ? (this.command({ kind: "set-page-component", pageId: s, componentId: d.id, ...this.cmpPatch(d), modelId: e }), this.emit("modux-notice", { message: `El formulario edita ${c.name}` })) : (this.command({ kind: "set-page-model", pageId: s, modelId: e }), this.emit("modux-notice", { message: `${c.name} es el viewmodel de la página` }));
      return;
    }
    const h = (this.model.modelMappings ?? []).find((y) => y.id === e);
    if (h && ((d == null ? void 0 : d.kind) === "button" || (d == null ? void 0 : d.kind) === "form")) {
      this.command({ kind: "set-page-component", pageId: s, componentId: d.id, ...this.cmpPatch(d), mappingId: e }), this.emit("modux-notice", {
        message: d.kind === "form" ? `El formulario mapea con ${h.name} al guardar` : `El botón mapea con ${h.name}`
      });
      return;
    }
    const m = this.model.boundedContexts.flatMap((y) => (y.queryServices ?? []).flatMap((v) => (v.operations ?? []).map((I) => ({ op: I, qs: v })))).find(({ op: y }) => y.id === e);
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
  placeExistingFromPalette(e, t, i, n, a, o = null) {
    if (this._view === "design") {
      this.dropCatalogOnDesign(e, i, o);
      return;
    }
    if (i && i !== e) {
      this.applyConnection(e, i, n, a);
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
    const c = this.viewLayout(s), h = r.parentId ? d.nodes.find((f) => f.id === r.parentId) : void 0, m = h ? { x: Math.round(t.x - h.x), y: Math.round(t.y - h.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: s, id: e, pos: c.nodes[e] ?? null }]), this.writeViewLayout(s, { ...c, nodes: { ...c.nodes, [e]: m } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "distribution", "workflows", "ui", "design", "mappings", "integrations", "aggregates"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = xa.filter(
      (n) => (this._view === "aggregates" ? ["entity", "value-object", "invariant", "field", "operation"].includes(n.type) : this._view === "workflows" ? ["workflow", "workflow-step", "workflow-join", "workflow-split"].includes(n.type) : this._view === "ui" ? ["ui", "ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider", "custom-code", "button-group", "ui-button"].includes(n.type) : this._view === "design" ? n.type === "page" || n.type === "custom-code" || n.type.startsWith("cmp:") : this._view === "integrations" ? ["etl-flow", "etl-transform", "external-system", "external-table"].includes(n.type) : this._view === "mappings" ? ["ui-model", "model-field", "transformation", "custom-code"].includes(n.type) : !["page", "menu-item", "model-field", "transformation", "custom-code", "ui-button"].includes(n.type) && !n.type.startsWith("cmp:")) && (!e || n.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return $`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(n) => this._paletteFilter = n.target.value}
          />
          ${i === "new" ? $`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${Lp.map((n) => {
      const a = t.filter((o) => o.group === n);
      return a.length ? $`
                        <div class="palette-g">${n}</div>
                        ${a.map(
        (o) => $`
                            <div
                              class="palette-item ${o.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${o.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : o.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(s) => this.onPaletteDragStart(s, { new: o.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${o.color}">
                                ${Tt[o.symbol]}
                              </svg>
                              <span class="pal-label">${o.label.replace(/^(Layout|Componente) · /, "")}</span>
                            </div>
                          `
      )}
                      ` : "";
    })}
              ` : $`
                <div class="palette-h">Catálogo — arrastra para colocar o conectar</div>
                ${this.paletteCatalog().map(
      (n) => $`
                    <div class="palette-g">${n.label}</div>
                    ${n.items.map(
        (a) => $`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(o) => this.onPaletteDragStart(o, { existing: a.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${n.color}">
                            ${Tt[n.symbol]}
                          </svg>
                          <span class="pal-label">${a.name}</span>
                        </div>
                      `
      )}
                  `
    )}
              `}
        </div>
        ${this._view === "workflows" ? "" : $`
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
    var t, i, n, a, o, s, d;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const r = this._newBoundedContextId || ((t = this.model.boundedContexts[0]) == null ? void 0 : t.id);
        if (!r) return;
        this.command({ kind: "add-aggregate", id: `agg-${ce(e)}`, name: e, boundedContextId: r });
      } else if (this._view === "flows") {
        const r = this._newTriggerAggId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id), c = this._newTargetId || ((a = this.model.boundedContexts[0]) == null ? void 0 : a.id), h = this._newTriggerEvent.trim();
        if (!r || !c || !h) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ce(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: r,
          triggerEvent: h,
          targetId: c
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const r = this._newBoundedContextId || ((o = this.model.boundedContexts[0]) == null ? void 0 : o.id);
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
    const i = this.viewLayout(e), n = this.filteredModel(), a = (t == null ? void 0 : t.expandAll) ?? !1, o = e === "aggregates" ? fs(n, i.nodes) : e === "flows" ? ks(n, i.nodes) : e === "processes" ? $n(n, i.nodes) : e === "workflows" ? Uc(n, i.nodes, new Set(i.expanded ?? []), a) : e === "ui" ? Vc(n, i.nodes, new Set(i.expanded ?? []), a) : e === "design" || e === "interactions" ? { nodes: [], edges: [] } : e === "integrations" ? Yc(n, i.nodes) : e === "mappings" ? Wc(n, i.nodes) : e === "eventstorming" ? Mc(n, i.nodes, new Set(i.expanded ?? []), a) : e === "distribution" ? os(n, i.nodes, i.sizes ?? {}, new Set(i.expanded ?? []), a) : as(n, i.nodes, i.sizes ?? {}, new Set(i.expanded ?? []), a);
    if (e !== "design" && e !== "interactions" && (this.withAreas(o, e), this.withNotes(o, e)), this.withDescriptions(o), this.diff)
      for (const d of o.nodes) {
        const r = this.diff[d.id] ?? this.diff[d.id.replace(/^(tgt:|flow:)/, "")];
        r && (d.diffKind = r);
      }
    const s = sp(o, op(n));
    return this._showDerived ? s : rp(s);
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
    var o, s;
    const i = this.model.areas ?? [];
    if (!i.length) return;
    const n = this.viewLayout(t), a = n.sizes ?? {};
    for (const d of i) {
      const r = n.nodes[d.id];
      r && e.nodes.unshift({
        id: d.id,
        label: d.name,
        kind: "area",
        x: r.x,
        y: r.y,
        w: ((o = a[d.id]) == null ? void 0 : o.w) ?? 340,
        h: ((s = a[d.id]) == null ? void 0 : s.h) ?? 220,
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
    const n = this.viewLayout(t), a = new Set(e.nodes.map((c) => c.id)), o = new Set(e.edges.map((c) => c.id)), s = n.sizes ?? {};
    for (const c of i) {
      const h = n.nodes[c.id], m = (g) => a.has(g) ? g : a.has(`tgt:${g}`) ? `tgt:${g}` : a.has(`flow:${g}`) ? `flow:${g}` : null, f = (c.targetIds ?? []).map((g) => ({ raw: g, nodeId: m(g) })).filter((g) => !!g.nodeId), y = (c.edgeRefs ?? []).filter((g) => o.has(g));
      if (!h && !f.length && !y.length) continue;
      const v = f.length ? e.nodes.find((g) => g.id === f[0].nodeId) : void 0, I = h ?? { x: ((v == null ? void 0 : v.x) ?? 0) + 40, y: ((v == null ? void 0 : v.y) ?? 0) - 110 };
      e.nodes.push({
        id: c.id,
        label: c.text,
        kind: "note",
        x: I.x,
        y: I.y,
        w: ((d = s[c.id]) == null ? void 0 : d.w) ?? 150,
        h: ((r = s[c.id]) == null ? void 0 : r.h) ?? 72,
        fill: "#fef9c3",
        symbol: "note",
        resizable: !0
      });
      for (const g of f)
        e.edges.push({
          id: `note:${c.id}->${g.raw}`,
          sourceId: c.id,
          targetId: g.nodeId,
          kind: "note-link",
          dashed: !0,
          color: "#ca8a04"
        });
      for (const g of y)
        e.edges.push({
          id: `note:${c.id}->${g}`,
          sourceId: c.id,
          targetId: `edgeanchor:${g}`,
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
    var g;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((l) => !l.parentId && l.kind !== "area"), n = this._multi.length ? this._multi : this._selectedId ? [this._selectedId] : [], a = n.length > 0, o = new Set(n), s = a ? i.filter((l) => o.has(l.id)) : i;
    if (s.length < 2) return;
    const d = new Set(s.map((l) => l.id)), r = {
      nodes: s,
      edges: t.edges.filter((l) => d.has(l.sourceId) && d.has(l.targetId))
    }, h = e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? void 0 : np(ap(r)), m = await Kc(r, h ? { partitions: h } : void 0), f = this.viewLayout(e);
    if (a) {
      let l = 0, u = 0, x = 0, E = 0;
      for (const T of s) {
        const z = f.nodes[T.id] ?? { x: T.x, y: T.y };
        l += z.x, u += z.y, x += m.nodes[T.id].x, E += m.nodes[T.id].y;
      }
      const N = s.length, R = (l - x) / N, k = (u - E) / N;
      for (const T of Object.keys(m.nodes))
        m.nodes[T] = { x: m.nodes[T].x + R, y: m.nodes[T].y + k };
      for (const T of Object.keys(m.edges))
        m.edges[T] = m.edges[T].map((z) => ({ x: z.x + R, y: z.y + k }));
    }
    const y = a ? r.edges.map((l) => l.id) : [], v = a ? t.edges.filter((l) => d.has(l.sourceId) !== d.has(l.targetId)).map((l) => l.id) : [], I = a ? [.../* @__PURE__ */ new Set([...y, ...v])] : Object.keys(f.edges);
    if (this.pushUndoEntry([
      ...s.map((l) => ({
        kind: "move-node",
        view: e,
        id: l.id,
        pos: f.nodes[l.id] ?? null
      })),
      // relayout rewrites these routes — restore the previous bends on undo
      ...I.map((l) => ({
        kind: "set-edge-points",
        view: e,
        id: l,
        points: f.edges[l] ?? null
      }))
    ]), a) {
      const l = { ...f.nodes };
      for (const x of s) l[x.id] = m.nodes[x.id];
      const u = { ...f.edges };
      for (const x of y) delete u[x];
      Object.assign(u, m.edges);
      for (const x of v) delete u[x];
      this.writeViewLayout(e, { ...f, nodes: l, edges: u });
    } else
      this.writeViewLayout(e, { ...f, nodes: m.nodes, edges: m.edges });
    await this.updateComplete, a || (g = this.renderRoot.querySelector("modux-canvas")) == null || g.fit();
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
    let a = i;
    if (n.length) {
      const s = new Set(n), d = new Set(
        this.sceneFor(e).edges.filter((r) => s.has(r.sourceId) || s.has(r.targetId)).map((r) => r.id)
      );
      a = i.filter((r) => d.has(r));
    }
    if (!a.length) return;
    this.pushUndoEntry(
      a.map((s) => ({
        kind: "set-edge-points",
        view: e,
        id: s,
        points: t.edges[s]
      }))
    );
    const o = { ...t.edges };
    for (const s of a) delete o[s];
    this.writeViewLayout(e, { ...t, edges: o });
  }
  /**
   * Line up the selected top-level nodes on a shared axis: `'row'` gives them a
   * common Y (a horizontal row), `'column'` a common X (a vertical column). The
   * shared value is the selection's centroid, so the group stays put on average
   * and moves the least. Lines of the moved nodes re-route clean on the new
   * positions. One undoable step; needs at least two nodes.
   */
  alignSelection(e) {
    const t = this._view, i = this._multi.length ? this._multi : this._selectedId ? [this._selectedId] : [], n = new Set(i), a = this.sceneFor(t).nodes.filter(
      (y) => n.has(y.id) && !y.parentId && y.kind !== "area"
    );
    if (a.length < 2) return;
    const o = this.viewLayout(t), s = (y) => o.nodes[y.id] ?? { x: y.x, y: y.y }, d = e === "row" ? "y" : "x", r = a.reduce((y, v) => y + s(v)[d], 0) / a.length, c = new Set(a.map((y) => y.id)), h = this.sceneFor(t).edges.filter((y) => c.has(y.sourceId) || c.has(y.targetId)).map((y) => y.id).filter((y) => o.edges[y]);
    this.pushUndoEntry([
      ...a.map((y) => ({ kind: "move-node", view: t, id: y.id, pos: o.nodes[y.id] ?? null })),
      ...h.map((y) => ({ kind: "set-edge-points", view: t, id: y, points: o.edges[y] }))
    ]);
    const m = { ...o.nodes };
    for (const y of a) {
      const v = s(y);
      m[y.id] = d === "y" ? { x: v.x, y: r } : { x: r, y: v.y };
    }
    const f = { ...o.edges };
    for (const y of h) delete f[y];
    this.writeViewLayout(t, { ...o, nodes: m, edges: f });
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
    const e = this.model.interactions ?? [], t = this._interactionMode === "derived", i = Tp(this.model), n = [
      ["Casos de uso", i.filter((d) => d.kind === "USE_CASE")],
      ["Operaciones API", i.filter((d) => d.kind === "API_OPERATION")],
      ["Eventos", i.filter((d) => d.kind === "EVENT")]
    ], a = va(this.model), o = [...new Set(a.map((d) => d.group))], s = !t && !!this._editingInteraction;
    return $`
      <select
        title="Secuencia authoreda del modelo — «＋ Nueva…» crea una vacía"
        @change=${(d) => this.onInteractionPick(d)}
      >
        <option value="" ?selected=${!t && !this._interactionId}>Secuencia: —</option>
        ${e.map(
      (d) => $`<option value=${d.id} ?selected=${!t && this._interactionId === d.id}>
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
      ([d, r]) => $`
              <optgroup label=${d}>
                ${r.map((c) => $`<option value="${c.kind}|${c.ref}">${c.label}</option>`)}
              </optgroup>
            `
    )}
      </select>
      ${t && this.derivedInteraction ? $`<button
            class="tab"
            title="Guardar la secuencia derivada como authoreda en el modelo"
            @click=${() => this.pinDerivedInteraction()}
          >
            📌 Fijar como secuencia
          </button>` : ""}
      ${this.currentInteraction() ? $`<button
            class="tab"
            title="Copiar el sequenceDiagram mermaid de lo visible"
            @click=${() => void this.copyInteractionMermaid()}
          >
            ⧉ Mermaid
          </button>` : ""}
      ${!t && this._interactionId ? $`<button
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
        ${o.map(
      (d) => $`
            <optgroup label=${d}>
              ${a.filter((r) => r.group === d).map((r) => $`<option value=${r.ref}>${r.label}</option>`)}
            </optgroup>
          `
    )}
      </select>
    `;
  }
  /** The «Secuencias» surface: one interaction as lifelines — no canvas Scene. */
  renderInteractionsView() {
    return this._interactionMode === "derived" ? this._derivePending ? $`<div class="seq-status">Derivando la secuencia…</div>` : this.derivedInteraction ? $`<modux-sequence
        .interaction=${this.derivedInteraction}
        .model=${this.model}
      ></modux-sequence>` : $`<div class="seq-status">
          La derivación no está disponible en este servidor (o ese punto de entrada no deriva nada
          todavía) — crea la secuencia a mano con «＋ Nueva…».
        </div>` : this._editingInteraction ? $`<modux-sequence
      .interaction=${this._editingInteraction}
      .model=${this.model}
      editable
      @interaction-changed=${this.onInteractionChanged}
      @interaction-materialize=${this.onInteractionMaterialize}
      @undo-requested=${this.undo}
      @redo-requested=${this.redo}
    ></modux-sequence>` : $`<div class="seq-status">
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
    return $`
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
    return e ? $`
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
    return $`
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
      (t) => $`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
        ${this._activeViewId ? $`
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
      (t) => $`<option value="${t.name} (${t.id})">${t.kind}</option>`
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
        ${this.viewSelection().length || !this._activeViewId && (this._view === "context-map" || this._view === "distribution") ? $`
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
        ${this._view === "aggregates" || this._view === "processes" ? $`<select
              title=${this._view === "aggregates" ? "Contexto del nuevo agregado" : "Contexto dueño del proceso"}
              @change=${(t) => this._newBoundedContextId = t.target.value}
            >
              ${this.model.boundedContexts.map(
      (t) => {
        var i;
        return $`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newBoundedContextId || ((i = this.model.boundedContexts[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" ? $`
              ${this._view === "flows" ? $`<select
                    title="Arquetipo del nuevo flow"
                    @change=${(t) => this._newArchetype = t.target.value}
                  >
                    ${["MATERIALIZES", "TRIGGERS", "ORCHESTRATES", "NOTIFIES"].map(
      (t) => $`<option value=${t} ?selected=${t === this._newArchetype}>${t}</option>`
    )}
                  </select>` : ""}
              <select
                title="Agregado que dispara"
                @change=${(t) => this._newTriggerAggId = t.target.value}
              >
                ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return $`<option
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
              ${this._view === "flows" ? $`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.boundedContexts, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return $`<option
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
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? $`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP", "DATABASE", "BUCKET", "SHAREPOINT", "CONFLUENCE", "DRIVE", "FILESYSTEM", "TICKETING", "CRM"].map(
      (t) => $`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
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
        ${this._view === "processes" && this._selectedId && ((this.model.processes ?? []).some((t) => t.id === this._selectedId) || this.owningProcessOf(this._selectedId)) ? $`
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
      (t) => $`<option value=${t} ?selected=${t === this._newStepType}>${t}</option>`
    )}
              </select>
              ${this._newStepType === "HUMAN" ? $`<input
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
              ${this.owningProcessOf(this._selectedId) ? $`
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
        ${this._view === "workflows" && this._selectedId && ((this.model.workflows ?? []).some((t) => t.id === this._selectedId) || this.owningWorkflowOf(this._selectedId)) ? $`
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
      (t) => $`<option value=${t.id} ?selected=${t.id === this._newStepUseCase}>
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
              ${this.owningWorkflowOf(this._selectedId) ? $`
                    <span class="sep"></span>
                    <select
                      title="Caso de uso destino del paso seleccionado"
                      @change=${(t) => this._editStepUseCase = t.target.value}
                    >
                      <option value="" ?selected=${this._editStepUseCase === ""}>
                        — sin use case —
                      </option>
                      ${this.model.boundedContexts.flatMap((t) => t.useCases ?? []).map(
      (t) => $`<option value=${t.id} ?selected=${t.id === this._editStepUseCase}>
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
        ${this._multi.length >= 2 && !this._yugo ? $`
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
        ${this._view === "workflows" && ((this.model.processes ?? []).length || (this.model.sagas ?? []).length) ? $`<button
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
      ${this._view === "interactions" ? this.renderInteractionsView() : this._view === "design" ? $`${this.renderPalette()}${this.renderFigma()}` : this._yugo ? $`${this.renderPalette()}<modux-explorer
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
        t.detail.members.filter((o) => i.has(o.kind)).map((o) => o.id)
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
          ></modux-explorer>` : this._tilt ? $`
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
          ></modux-tilt>` : $`
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
        ${this._view === "interactions" ? $`Arrastra entre líneas de vida para crear un mensaje · arrastra un mensaje
            verticalmente para reordenarlo · doble click edita etiqueta, guarda y tipo · Supr
            borra el mensaje o el participante seleccionado · ✨ materializa un mensaje sin
            respaldo · una secuencia derivada es de solo lectura hasta fijarla con 📌` : this._view === "context-map" ? $`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema (y un sistema externo dentro/fuera de otro) · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? $`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? $`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : $`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra (si está vacío) · F2 renombra · doble click abre el CRUD ·
            rueda para zoom`}
        · pulsa <b>?</b> para los atajos
      </div>
      ${this.renderRelationPicker()} ${this.renderRepoPicker()} ${this.renderWfStepPicker()} ${this.renderInvariantCondEditor()} ${this.renderBranchCondEditor()} ${this.renderExtDepPicker()} ${this.renderConnectPicker()} ${this.renderDeletePicker()}
      ${this.renderInteractionPrompt()} ${this.renderInteractionDelete()}
      ${this.renderHelpPopover()}
    `;
  }
  /** The keyboard cheatsheet (toggled with ? and closed with Esc or a click outside). */
  renderHelpPopover() {
    return this._helpOpen ? $`
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
      ([t, i]) => $`
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
    ), a = n.length === 1 ? `«${n[0]}»` : `${n.length} elementos (${n.join(", ")})`, o = e.memberIds.length > 0 && t;
    return $`
      <div class="picker-backdrop" @pointerdown=${() => this._deletePicker = null}></div>
      <div
        class="relation-picker"
        style="left: 50%; top: 120px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">
          ${o ? `¿Eliminar ${a}, o solo quitar de la vista?` : `¿Eliminar ${a} del modelo?`}
        </div>
        ${o ? $`
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
    return e ? $`
      <div class="picker-backdrop" @pointerdown=${() => this._connectPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿Qué relación es esta línea?</div>
        ${e.options.map(
      (t) => $`
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
    return $`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(a) => a.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (a) => $`
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
    return e ? $`
      <div class="picker-backdrop" @pointerdown=${() => this._repoPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">Referenciar proyecto del catálogo</div>
        ${this.repositories.map(
      (t) => $`
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
  /** The condition editor of an invariant: its rule expression and the error message. */
  renderInvariantCondEditor() {
    const e = this._invariantCondEditor;
    if (!e) return "";
    const t = () => {
      this.command({ kind: "set-invariant-condition", id: e.id, expression: e.expression, errorMessage: e.errorMessage }), this._invariantCondEditor = null;
    }, i = "width: 260px; margin: 6px 10px; padding: 5px 8px; border: 1px solid var(--modux-border-strong, #cbd5e1); border-radius: 6px; font: 12px system-ui;";
    return $`
      <div class="picker-backdrop" @pointerdown=${() => this._invariantCondEditor = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">⚖ ${e.name} — condición (vacío la quita)</div>
        <input
          style=${i}
          placeholder="expresión — p. ej. importe >= 0"
          .value=${e.expression}
          @input=${(n) => e.expression = n.target.value}
          @keydown=${(n) => {
      n.key === "Enter" && t(), n.key === "Escape" && (this._invariantCondEditor = null);
    }}
        />
        <input
          style=${i}
          placeholder="mensaje de error — p. ej. El importe no puede ser negativo"
          .value=${e.errorMessage}
          @input=${(n) => e.errorMessage = n.target.value}
          @keydown=${(n) => {
      n.key === "Enter" && t(), n.key === "Escape" && (this._invariantCondEditor = null);
    }}
        />
        <button class="picker-item" @click=${t}>Guardar</button>
      </div>
    `;
  }
  /** The condition editor of one EXCLUSIVE-split branch. */
  renderBranchCondEditor() {
    const e = this._branchCondEditor;
    return e ? $`
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
    return e ? $`
      <div class="picker-backdrop" @pointerdown=${() => this._wfStepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${this.clientWidth / 2}px; top:120px"
        @pointerdown=${(t) => t.stopPropagation()}
      >
        <div class="picker-title">¿De qué workflow es el paso?</div>
        ${(this.model.workflows ?? []).map(
      (t) => $`
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
        const o = this.viewLayout(this._view);
        this.writeViewLayout(this._view, {
          ...o,
          nodes: { ...o.nodes, [n]: { x: Math.round(i.pos.x), y: Math.round(i.pos.y) } }
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
    return $`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Vp.map(
      (n) => $`
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
  po,
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
  B()
], ie.prototype, "_view", 2);
ne([
  B()
], ie.prototype, "_relationType", 2);
ne([
  B()
], ie.prototype, "_relationPicker", 2);
ne([
  B()
], ie.prototype, "_extDepPicker", 2);
ne([
  B()
], ie.prototype, "_selectedId", 2);
ne([
  B()
], ie.prototype, "_paletteOpen", 2);
ne([
  B()
], ie.prototype, "_yugo", 2);
ne([
  B()
], ie.prototype, "_showDerived", 2);
ne([
  de({ attribute: !1 })
], ie.prototype, "repositories", 2);
ne([
  de({ type: Boolean, reflect: !0 })
], ie.prototype, "dark", 2);
ne([
  B()
], ie.prototype, "_repoPicker", 2);
ne([
  B()
], ie.prototype, "_wfStepPicker", 2);
ne([
  B()
], ie.prototype, "_branchCondEditor", 2);
ne([
  B()
], ie.prototype, "_invariantCondEditor", 2);
ne([
  B()
], ie.prototype, "_paletteFilter", 2);
ne([
  B()
], ie.prototype, "_paletteTab", 2);
ne([
  B()
], ie.prototype, "_selectedCmp", 2);
ne([
  B()
], ie.prototype, "_fullscreen", 2);
ne([
  B()
], ie.prototype, "_tilt", 2);
ne([
  B()
], ie.prototype, "_helpOpen", 2);
ne([
  B()
], ie.prototype, "_newName", 2);
ne([
  B()
], ie.prototype, "_newBoundedContextId", 2);
ne([
  B()
], ie.prototype, "_newArchetype", 2);
ne([
  B()
], ie.prototype, "_newTriggerAggId", 2);
ne([
  B()
], ie.prototype, "_newTriggerEvent", 2);
ne([
  B()
], ie.prototype, "_newTargetId", 2);
ne([
  B()
], ie.prototype, "_undoStack", 2);
ne([
  B()
], ie.prototype, "_redoStack", 2);
ne([
  B()
], ie.prototype, "_newStepName", 2);
ne([
  B()
], ie.prototype, "_newStepType", 2);
ne([
  B()
], ie.prototype, "_newStepRole", 2);
ne([
  B()
], ie.prototype, "_newStepDeadline", 2);
ne([
  B()
], ie.prototype, "_editStepRole", 2);
ne([
  B()
], ie.prototype, "_editStepDeadline", 2);
ne([
  B()
], ie.prototype, "_editStepComp", 2);
ne([
  B()
], ie.prototype, "_newStepUseCase", 2);
ne([
  B()
], ie.prototype, "_newStepEmits", 2);
ne([
  B()
], ie.prototype, "_editStepUseCase", 2);
ne([
  B()
], ie.prototype, "_editStepEmits", 2);
ne([
  B()
], ie.prototype, "_editStepAwaits", 2);
ne([
  B()
], ie.prototype, "_multi", 2);
ne([
  B()
], ie.prototype, "_newViewName", 2);
ne([
  B()
], ie.prototype, "_interactionId", 2);
ne([
  B()
], ie.prototype, "_editingInteraction", 2);
ne([
  B()
], ie.prototype, "_interactionMode", 2);
ne([
  de({ attribute: !1 })
], ie.prototype, "derivedInteraction", 2);
ne([
  B()
], ie.prototype, "_derivePending", 2);
ne([
  B()
], ie.prototype, "_interactionPrompt", 2);
ne([
  B()
], ie.prototype, "_interactionDelete", 2);
ne([
  B()
], ie.prototype, "_connectPicker", 2);
ne([
  B()
], ie.prototype, "_activeViewId", 2);
ne([
  B()
], ie.prototype, "_newRagSourceType", 2);
ne([
  B()
], ie.prototype, "_newRagSourceUri", 2);
ne([
  B()
], ie.prototype, "_addMemberKey", 2);
ne([
  B()
], ie.prototype, "_treeOpen", 2);
ne([
  B()
], ie.prototype, "_deletePicker", 2);
ie = ne([
  mt("modux-editor")
], ie);
var Hp = Object.defineProperty, Yp = Object.getOwnPropertyDescriptor, $e = (e, t, i, n) => {
  for (var a = n > 1 ? void 0 : n ? Yp(t, i) : t, o = e.length - 1, s; o >= 0; o--)
    (s = e[o]) && (a = (n ? s(t, i, a) : s(a)) || a);
  return n && a && Hp(t, i, a), a;
};
let ve = class extends Ve {
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
    ], t = (n) => ve.TYPE_LABELS[n] ?? n;
    return $`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: n, title: a, mark: o, cls: s }) => {
      const d = this._diff.changes.filter((r) => r.kind === n);
      return d.length ? $`
            <div class="diff-group">${a} (${d.length})</div>
            ${d.map(
        (r) => $`
                <div class="diff-row">
                  <span class="diff-mark ${s}">${o}</span>
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
    var a, o, s;
    const i = (a = this._workspace) == null ? void 0 : a.current;
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
            const h = await r.json();
            h != null && h.message && (c = h.message);
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
    const n = (o = this._workspace) == null ? void 0 : o.current;
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
    return this._tagsOpen ? $`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Versiones etiquetadas</span>
          <button title="Cerrar el listado" @click=${() => this._tagsOpen = !1}>✕</button>
        </div>
        ${this._tags.length ? this._tags.map(
      (e) => $`
                <div class="diff-row">
                  <span class="diff-mark added">🏷</span>
                  <span class="diff-type">${e.date}</span>
                  <span class="diff-name" title=${e.message || e.name}>${e.name}</span>
                </div>
              `
    ) : $`<div class="diff-row"><span class="diff-name">Sin versiones aún — «Etiquetar…» nombra el estado actual</span></div>`}
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
    const { content: t, fileName: i, apiId: n, homeExternalId: a, homeBoundedContextId: o } = e.detail;
    await this.trackWrite(async () => {
      try {
        const s = await fetch(`${this.base}/import-api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: t, fileName: i, apiId: n })
        });
        if (!s.ok) {
          let h = `El servidor rechazó el contrato (${s.status})`;
          try {
            const m = await s.json();
            m != null && m.message && (h = m.message);
          } catch {
          }
          this.showToast(h);
          return;
        }
        const { apiId: d } = await s.json(), r = a ? { kind: "set-api-publisher", id: d, targetId: a } : o ? { kind: "add-api-implementation", apiId: d, boundedContextId: o } : null;
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
    return this._error ? $`<div class="status error">modux editor: ${this._error}</div>` : this._model ? $`
      ${this._workspace ? $`
            <div class="workspace">
              <label>Modelo:</label>
              <span title="El modelo activo se cambia desde el selector «Modelo» de la cabecera">
                ${this._workspace.system ? "Sistema (as-is)" : `Solución: ${((e = this._workspace.solutions.find((i) => i.branch === this._workspace.current)) == null ? void 0 : e.name) ?? this._workspace.current}`}
              </span>
              ${this._creatingSolution ? "" : $`<button @click=${() => this._creatingSolution = !0}>
                    ＋ Nueva solución…
                  </button>`}
              ${this._taggingVersion ? $`
                    <input
                      placeholder="Nombre de la versión…"
                      .value=${this._newTagName}
                      @input=${(i) => this._newTagName = i.target.value}
                      @keydown=${(i) => i.key === "Enter" && void this.createTag()}
                    />
                    <button @click=${() => void this.createTag()}>Etiquetar</button>
                    <button @click=${() => this._taggingVersion = !1}>Cancelar</button>
                  ` : $`<button
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
      return $`<button
                      class="badge solution diff-badge"
                      ?data-open=${this._diffListOpen}
                      title="Cambios respecto al sistema — click para ver el listado"
                      @click=${() => this._diffListOpen = !this._diffListOpen}
                    >
                      ＋${i("ADDED")} ～${i("MODIFIED")} －${i("REMOVED")}
                    </button>`;
    })() : ""}
              ${this._creatingSolution ? $`
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
      return $`
                      ${i === "EXPLORING" ? $`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${i === "PROPOSED" ? $`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${i === "APPROVED" ? $`<button
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
      ${this._mergeFlow ? $`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (i) => $`
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
      ${this._toast ? $`<div
            class="toast ${this._toast.kind}"
            role="alert"
            @click=${() => this._toast = null}
          >
            ${this._toast.kind === "error" ? "⚠" : "ℹ"} ${this._toast.message}
          </div>` : ""}
    ` : $`<div class="status">Cargando el modelo…</div>`;
  }
};
ve.styles = [
  po,
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
ve.TYPE_LABELS = {
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
], ve.prototype, "base", 2);
$e([
  B()
], ve.prototype, "_model", 2);
$e([
  B()
], ve.prototype, "_layout", 2);
$e([
  B()
], ve.prototype, "_error", 2);
$e([
  B()
], ve.prototype, "_saving", 2);
$e([
  B()
], ve.prototype, "_toast", 2);
$e([
  B()
], ve.prototype, "_workspace", 2);
$e([
  B()
], ve.prototype, "_creatingSolution", 2);
$e([
  B()
], ve.prototype, "_newSolutionName", 2);
$e([
  B()
], ve.prototype, "_taggingVersion", 2);
$e([
  B()
], ve.prototype, "_newTagName", 2);
$e([
  B()
], ve.prototype, "_tagsOpen", 2);
$e([
  B()
], ve.prototype, "_tags", 2);
$e([
  B()
], ve.prototype, "_repositories", 2);
$e([
  B()
], ve.prototype, "_diff", 2);
$e([
  B()
], ve.prototype, "_diffListOpen", 2);
$e([
  B()
], ve.prototype, "_mergeFlow", 2);
$e([
  B()
], ve.prototype, "_dark", 2);
$e([
  B()
], ve.prototype, "_derivedInteraction", 2);
ve = $e([
  mt("modux-editor-connected")
], ve);
export {
  Aa as ARCHIMATE_LABEL,
  ns as ARCHIMATE_NOTATION,
  Kp as CONTAINER_HEADER,
  Xp as CONTAINER_INSET,
  xe as ModuxCanvas,
  ie as ModuxEditor,
  ve as ModuxEditorConnected,
  He as ModuxSequence,
  fs as aggregatesScene,
  bt as apiImplNodeId,
  vt as apiOpOccurrenceId,
  Qp as containerFit,
  Vo as containerMinSize,
  as as contextMapScene,
  os as distributionScene,
  Zo as flowCoherence,
  ks as flowsScene,
  ft as normalizeViewLayout,
  Sa as ownershipIndex,
  $n as processesScene,
  Jo as relationEdgeId,
  jo as resolveOverlaps
};
