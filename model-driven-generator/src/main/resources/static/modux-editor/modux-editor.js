const $d = 34, bd = 10;
function In(e, t = { w: 160, h: 90 }) {
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
function $n(e, t, i) {
  let n = t.w / 2, s = t.w / 2, o = t.h / 2, r = t.h / 2;
  for (const a of i)
    n = Math.max(n, -a.dx + a.w / 2 + 10), s = Math.max(s, a.dx + a.w / 2 + 10), o = Math.max(o, -a.dy + a.h / 2 + 34), r = Math.max(r, a.dy + a.h / 2 + 10);
  return {
    x: e.x + (s - n) / 2,
    y: e.y + (r - o) / 2,
    w: n + s,
    h: o + r
  };
}
function bn(e) {
  if (!e) return { nodes: {}, edges: {}, sizes: {} };
  if ("nodes" in e && typeof e.nodes == "object" && !("x" in e.nodes)) {
    const t = e;
    return { nodes: t.nodes ?? {}, edges: t.edges ?? {}, sizes: t.sizes ?? {}, detail: t.detail };
  }
  return { nodes: e, edges: {}, sizes: {} };
}
const kn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, En = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Sn = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, dt = 168, lt = 56, Hi = 34, qi = 14, Cn = 14, Fe = 108, Ke = 32, Vi = 12, Fi = 10, We = 2, An = We * Fe + (We - 1) * Vi + 2 * qi;
function Mn(e, t) {
  return `rel:${e}->${t}`;
}
function Nn(e, t) {
  const i = new Set(e.externalSystems.map((n) => n.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (n) => n.sourceId === t.sourceId && n.targetId === t.targetId && n.declared
  ) ? "OK" : e.relations.some(
    (n) => n.sourceId === t.targetId && n.targetId === t.sourceId && n.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function it(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const Tn = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Pn = {
  aggregate: { symbol: "aggregate", fill: "#f5f3ff", stroke: "#8b5cf6" },
  "use-case": { symbol: "usecase", fill: "#ecfeff", stroke: "#06b6d4" },
  "domain-event": { symbol: "event", fill: "#fff7ed", stroke: "#f59e0b" },
  "application-event": { symbol: "event", fill: "#fefce8", stroke: "#eab308" },
  "read-model": { symbol: "readmodel", fill: "#ecfdf5", stroke: "#10b981" },
  "domain-service": { symbol: "gear", fill: "#fff1f2", stroke: "#f43f5e" },
  "query-service": { symbol: "lens", fill: "#f0f9ff", stroke: "#0284c7" },
  "external-use-case": { symbol: "usecase", fill: "#f8fafc", stroke: "#64748b" },
  "external-table": { symbol: "readmodel", fill: "#fefce8", stroke: "#a16207" },
  "api-operation": { symbol: "usecase", fill: "#eef2ff", stroke: "#4f46e5" }
}, Rn = {
  aggregate: "Agregado",
  "use-case": "Caso de uso",
  "domain-event": "Evento de dominio",
  "application-event": "Evento de aplicación",
  "read-model": "Read model",
  "domain-service": "Servicio de dominio",
  "query-service": "Query service",
  "external-use-case": "Caso de uso externo",
  "external-table": "Tabla (legacy)",
  "api-operation": "Operación de API"
};
function On(e) {
  const t = Math.max(1, Math.ceil(e / We)), i = t * Ke + (t - 1) * Fi;
  return { w: An, h: Hi + i + Cn };
}
function Un(e, t) {
  const i = e % We, n = Math.floor(e / We);
  return {
    x: -t.w / 2 + qi + i * (Fe + Vi) + Fe / 2,
    y: -t.h / 2 + Hi + n * (Ke + Fi) + Ke / 2
  };
}
function Dn(e, t, i, n, s, o) {
  const a = [
    ...(e.aggregates ?? []).filter((d) => d.moduleId === t.id).map((d) => ({ id: d.id, name: d.name, kind: "aggregate" })),
    ...(t.useCases ?? []).map(
      (d) => ({ id: d.id, name: d.name, kind: "use-case", policy: d.policy })
    ),
    ...(t.domainEvents ?? []).map(
      (d) => ({ id: d.id, name: d.name, kind: "domain-event" })
    ),
    ...(t.readModels ?? []).map(
      (d) => ({ id: d.id, name: d.name, kind: "read-model" })
    ),
    ...(t.domainServices ?? []).map(
      (d) => ({ id: d.id, name: d.name, kind: "domain-service" })
    ),
    ...(t.applicationEvents ?? []).map(
      (d) => ({ id: d.id, name: d.name, kind: "application-event" })
    ),
    ...(t.queryServices ?? []).map(
      (d) => ({ id: d.id, name: d.name, kind: "query-service" })
    )
  ];
  return a.length ? Ut(i, n, a, s, o) : [{ ...n, x: i.x, y: i.y, w: dt, h: lt }];
}
function Ut(e, t, i, n, s) {
  const o = s[t.id] ?? On(i.length), r = i.map((l, m) => n[l.id] ?? Un(m, o)), a = $n(
    e,
    o,
    r.map((l) => ({ dx: l.x, dy: l.y, w: Fe, h: Ke }))
  ), d = {
    ...t,
    x: a.x,
    y: a.y,
    w: a.w,
    h: a.h,
    container: !0
  }, c = i.map((l, m) => {
    const g = r[m], _ = l.policy ? Tn : Pn[l.kind];
    return {
      id: l.id,
      label: l.name,
      kind: l.kind,
      x: e.x + g.x,
      y: e.y + g.y,
      w: Fe,
      h: Ke,
      symbol: _.symbol,
      fill: _.fill,
      stroke: _.stroke,
      parentId: t.id,
      tooltip: `${l.policy ? "Policy" : Rn[l.kind]} ${l.name}`
    };
  });
  return [d, ...c];
}
function Ln(e, t, i = !1, n = {}) {
  const s = [
    ...e.modules.map((p) => ({ ref: p, external: !1, api: !1 })),
    ...e.externalSystems.map((p) => ({ ref: p, external: !0, api: !1 })),
    ...(e.apis ?? []).map((p) => ({ ref: p, external: !1, api: !0 }))
  ], o = s.flatMap((p, A) => {
    const R = t[p.ref.id] ?? it(A, s.length);
    if (p.api) {
      const u = p.ref, w = {
        id: u.id,
        label: u.name,
        kind: "api",
        symbol: "component",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${u.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return i && u.operations.length > 0 ? Ut(
        R,
        w,
        u.operations.map(
          (f) => ({ id: f.id, name: f.name, kind: "api-operation" })
        ),
        t,
        n
      ) : [{ ...w, x: R.x, y: R.y, w: dt, h: lt }];
    }
    if (p.external) {
      const u = p.ref, w = {
        id: u.id,
        label: u.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${u.name} (sistema externo)`
      };
      return i && ((u.useCases ?? []).length > 0 || (u.tables ?? []).length > 0) ? Ut(
        R,
        w,
        [
          ...(u.useCases ?? []).map(
            (f) => ({ id: f.id, name: f.name, kind: "external-use-case" })
          ),
          ...(u.tables ?? []).map(
            (f) => ({ id: f.id, name: f.name, kind: "external-table" })
          )
        ],
        t,
        n
      ) : [{ ...w, x: R.x, y: R.y, w: dt, h: lt }];
    }
    const H = p.ref, K = H.subdomainType ?? "GENERIC", h = {
      id: H.id,
      label: H.name,
      kind: "module",
      symbol: "component",
      fill: kn[K],
      stroke: "#94a3b8",
      badge: K,
      tooltip: `${H.name} — subdominio ${K}`
    };
    return i ? Dn(e, H, R, h, t, n) : [{ ...h, x: R.x, y: R.y, w: dt, h: lt }];
  }), r = s.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length;
  (e.actors ?? []).forEach((p, A) => {
    const R = t[p.id] ?? it(s.length + A, r);
    o.push({
      id: p.id,
      label: p.name,
      x: R.x,
      y: R.y,
      w: 132,
      h: 48,
      kind: "actor",
      symbol: "person",
      fill: "#ffffff",
      stroke: "#64748b",
      badge: "ACTOR",
      tooltip: `${p.name} (actor)`
    });
  }), (e.aiAgents ?? []).forEach((p, A) => {
    const R = t[p.id] ?? it(s.length + (e.actors ?? []).length + A, r);
    o.push({
      id: p.id,
      label: p.name,
      x: R.x,
      y: R.y,
      w: 132,
      h: 48,
      kind: "ai-agent",
      symbol: "robot",
      fill: "#faf5ff",
      stroke: "#9333ea",
      badge: "AGENTE IA",
      tooltip: `${p.name} (agente de IA — consume por MCP)`
    });
  });
  const a = [];
  (e.rags ?? []).forEach((p, A) => {
    const R = t[p.id] ?? it(
      s.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + A,
      r
    );
    o.push({
      id: p.id,
      label: p.name,
      x: R.x,
      y: R.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${p.name} (base de conocimiento — retrieval para agentes)`
    }), (p.contentSources ?? []).forEach((H, K) => {
      const h = `ragcs:${p.id}:${H.uri}`, u = t[h] ?? { x: R.x + 170, y: R.y - 30 + K * 44 };
      o.push({
        id: h,
        label: H.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: u.x,
        y: u.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: H.type,
        tooltip: `${H.type}: ${H.uri}`
      }), a.push({
        id: `ragcse:${p.id}:${H.uri}`,
        sourceId: h,
        targetId: p.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), o.sort((p, A) => (p.parentId ? 1 : 0) - (A.parentId ? 1 : 0));
  const d = e.relations.map((p) => ({
    id: Mn(p.sourceId, p.targetId),
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "relation",
    label: p.type ? En[p.type] : "?",
    color: p.declared ? "#475569" : "#94a3b8",
    dashed: !p.declared,
    arrow: !0,
    tooltip: p.type ? `${p.type} (${p.sourceId} upstream → ${p.targetId} downstream)${p.reasons ? ` — ${p.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${p.reasons ? ` — ${p.reasons}` : ""}`
  })), c = e.flows.map((p) => {
    var u, w, f, v, I, T;
    const A = Nn(e, p), R = i ? e.modules.find((C) => C.id === p.sourceId) : void 0, H = ((u = R == null ? void 0 : R.domainEvents) == null ? void 0 : u.find((C) => C.name === p.triggerEvent)) ?? ((w = R == null ? void 0 : R.applicationEvents) == null ? void 0 : w.find((C) => C.name === p.triggerEvent)), K = i && p.readModelName ? (v = (f = e.modules.find((C) => C.id === p.targetId)) == null ? void 0 : f.readModels) == null ? void 0 : v.find((C) => C.name === p.readModelName) : void 0, h = i && p.targetUseCaseId ? (T = (I = e.modules.find((C) => C.id === p.targetId)) == null ? void 0 : I.useCases) == null ? void 0 : T.find((C) => C.id === p.targetUseCaseId) : void 0;
    return {
      id: `flow:${p.id}`,
      sourceId: (H == null ? void 0 : H.id) ?? p.sourceId,
      targetId: (h == null ? void 0 : h.id) ?? (K == null ? void 0 : K.id) ?? p.targetId,
      kind: "flow",
      label: p.name,
      color: Sn[A],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${p.name} [${p.archetype}] — ${A}`
    };
  }), l = new Set(o.map((p) => p.id)), m = i ? (e.emissions ?? []).filter((p) => l.has(p.sourceId) && l.has(p.domainEventId)).map((p) => ({
    id: `emit:${p.sourceId}->${p.domainEventId}`,
    sourceId: p.sourceId,
    targetId: p.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], g = i ? (e.projections ?? []).map((p) => ({
    p,
    source: p.sourceAggregateId ?? p.sourceExternalUseCaseId ?? p.sourceExternalTableId
  })).filter(({ p, source: A }) => A && p.readModelId).filter(({ p, source: A }) => l.has(A) && l.has(p.readModelId)).map(({ p, source: A }) => ({
    id: `proj:${p.id}`,
    sourceId: A,
    targetId: p.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: p.sourceAggregateId ? `Proyección ${p.name}: el estado del agregado se materializa en ${p.readModelName ?? p.readModelId}` : `Proyección ${p.name}: polling hacia ${p.readModelName ?? p.readModelId}`
  })) : [], _ = (e.apis ?? []).flatMap(
    (p) => p.operations.flatMap((A) => {
      const R = i && l.has(A.id) ? A.id : p.id;
      if (!l.has(R)) return [];
      const H = i && A.targetUseCaseId && l.has(A.targetUseCaseId) ? A.targetUseCaseId : A.targetModuleId && l.has(A.targetModuleId) ? A.targetModuleId : (A.targetUseCaseId && !i, null);
      return H ? [
        {
          id: `apiwire:${A.id}`,
          sourceId: R,
          targetId: H,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${A.name} la implementa ${H}`
        }
      ] : [];
    })
  ), b = i ? (e.useCaseCalls ?? []).filter((p) => l.has(p.sourceId) && l.has(p.targetId)).map((p) => ({
    id: `uccall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], k = i ? (e.queryCalls ?? []).filter((p) => l.has(p.sourceId) && l.has(p.targetId)).map((p) => ({
    id: `qscall:${p.sourceId}->${p.targetId}`,
    sourceId: p.sourceId,
    targetId: p.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], P = i ? (e.actorUses ?? []).filter((p) => l.has(p.actorId) && l.has(p.targetId)).map((p) => ({
    id: `use:${p.actorId}->${p.targetId}`,
    sourceId: p.actorId,
    targetId: p.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], x = (e.actorExternalDependencies ?? []).filter((p) => l.has(p.actorId) && l.has(p.externalSystemId)).map((p) => ({
    id: `extdep:${p.actorId}->${p.externalSystemId}`,
    sourceId: p.actorId,
    targetId: p.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), U = i ? (e.agentUses ?? []).filter((p) => l.has(p.agentId) && l.has(p.useCaseId)).map((p) => ({
    id: `mcp:${p.agentId}->${p.useCaseId}`,
    sourceId: p.agentId,
    targetId: p.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], V = (e.agentRags ?? []).filter((p) => l.has(p.agentId) && l.has(p.ragId)).map((p) => ({
    id: `agrag:${p.agentId}->${p.ragId}`,
    sourceId: p.agentId,
    targetId: p.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), y = i ? (e.rags ?? []).filter((p) => l.has(p.id)).flatMap(
    (p) => (p.sourceReadModelIds ?? []).filter((A) => l.has(A)).map((A) => ({
      id: `ragsrc:${p.id}->${A}`,
      sourceId: p.id,
      targetId: A,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${p.name} indexa este read model`
    }))
  ) : [], $ = i ? (e.agentExternalUses ?? []).filter((p) => l.has(p.agentId) && l.has(p.externalUseCaseId)).map((p) => ({
    id: `mcpx:${p.agentId}->${p.externalUseCaseId}`,
    sourceId: p.agentId,
    targetId: p.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], E = i ? (e.externalCalls ?? []).filter((p) => l.has(p.externalSystemId) && l.has(p.useCaseId)).map((p) => ({
    id: `extcall:${p.externalSystemId}->${p.useCaseId}`,
    sourceId: p.externalSystemId,
    targetId: p.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], S = i ? (e.externalUseCaseCalls ?? []).filter((p) => l.has(p.sourceId) && l.has(p.targetId)).map((p) => ({
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
    nodes: o,
    edges: [
      ...d,
      ...c,
      ...m,
      ...g,
      ..._,
      ...b,
      ...k,
      ...P,
      ...x,
      ...U,
      ...$,
      ...V,
      ...y,
      ...a,
      ...E,
      ...S
    ]
  };
}
const zn = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Hn = 176, qn = 60, Vn = 140, Fn = 40;
function Kn(e) {
  const t = {}, i = e.aggregates ?? [], n = e.entities ?? [];
  return e.modules.forEach((s, o) => {
    const r = 220 + o * 340;
    i.filter((d) => d.moduleId === s.id).forEach((d, c) => {
      const l = n.filter((g) => g.aggregateId === d.id).length, m = 140 + c * (170 + l * 60);
      t[d.id] = { x: r, y: m }, n.filter((g) => g.aggregateId === d.id).forEach((g, _) => {
        t[g.id] = { x: r + 60, y: m + 100 + _ * 60 };
      });
    });
  }), i.filter((s) => !e.modules.some((o) => o.id === s.moduleId)).forEach((s, o) => {
    t[s.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function Wn(e, t) {
  const i = Kn(e), n = (c) => t[c] ?? i[c] ?? { x: 200, y: 200 }, s = new Map(e.modules.map((c) => [c.id, c])), o = (e.aggregates ?? []).map((c) => {
    const l = s.get(c.moduleId), m = (l == null ? void 0 : l.subdomainType) ?? "GENERIC", g = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: g.x,
      y: g.y,
      w: Hn,
      h: qn,
      kind: "aggregate",
      symbol: "aggregate",
      fill: zn[m],
      stroke: "#64748b",
      badge: l ? `${l.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${c.name}${l ? ` — módulo ${l.name} (${m})` : ""}`
    };
  }), r = (e.entities ?? []).map((c) => {
    const l = n(c.id);
    return {
      id: c.id,
      label: c.name,
      x: l.x,
      y: l.y,
      w: Vn,
      h: Fn,
      kind: "entity",
      symbol: "entity",
      fill: "#ffffff",
      stroke: "#94a3b8",
      badge: "ENTITY",
      tooltip: `Entidad ${c.name} (dentro del agregado)`
    };
  }), a = (e.entities ?? []).map((c) => ({
    id: `contains:${c.aggregateId}->${c.id}`,
    sourceId: c.aggregateId,
    targetId: c.id,
    kind: "containment",
    color: "#94a3b8",
    dashed: !0,
    tooltip: "Entidad dentro del agregado"
  })), d = (e.aggregateReferences ?? []).map((c, l) => ({
    id: `aggref:${l}:${c.sourceAggregateId}->${c.targetAggregateId}`,
    sourceId: c.sourceAggregateId,
    targetId: c.targetAggregateId,
    kind: "aggregate-reference",
    label: c.label,
    color: "#475569",
    arrow: !0,
    tooltip: c.label ? `Referencia: ${c.label}` : "Referencia entre agregados"
  }));
  return {
    nodes: [...o, ...r],
    edges: [...a, ...d]
  };
}
const Bn = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, Gn = 150, Yn = 44, Xn = 190, jn = 56, Zn = 160, Qn = 48;
function Jn(e, t) {
  const i = e.externalSystems.find((s) => s.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const n = e.modules.find((s) => s.id === t.targetId);
  return { id: t.targetId, label: (n == null ? void 0 : n.name) ?? t.targetId, external: !1 };
}
function es(e, t) {
  const i = e.flows, n = [], s = [], o = /* @__PURE__ */ new Set(), r = (a) => {
    var d, c;
    return ((c = (d = e.aggregates) == null ? void 0 : d.find((l) => l.id === a)) == null ? void 0 : c.name) ?? a ?? "?";
  };
  return i.forEach((a, d) => {
    const c = 120 + d * 130, l = Bn[a.archetype] ?? "#475569", m = a.triggerAggregateId ?? a.sourceId;
    if (!o.has(m)) {
      o.add(m);
      const P = t[m] ?? { x: 160, y: c };
      n.push({
        id: m,
        label: a.triggerAggregateId ? r(a.triggerAggregateId) : m,
        x: P.x,
        y: P.y,
        w: Gn,
        h: Yn,
        kind: a.triggerAggregateId ? "aggregate" : "module",
        symbol: a.triggerAggregateId ? "aggregate" : "component",
        fill: "#ffffff",
        stroke: "#64748b",
        badge: a.triggerAggregateId ? "AGGREGATE" : "MODULE"
      });
    }
    const g = `flow:${a.id}`, _ = t[g] ?? { x: 470, y: c };
    n.push({
      id: g,
      label: a.name,
      x: _.x,
      y: _.y,
      w: Xn,
      h: jn,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: l,
      badge: a.archetype,
      tooltip: `Flow ${a.name} [${a.archetype}]${a.readModelName ? ` → read model ${a.readModelName}` : ""}${a.targetUseCaseId ? ` → use case ${a.targetUseCaseId}` : ""}`
    });
    const b = Jn(e, a), k = `tgt:${b.id}`;
    if (!o.has(k)) {
      o.add(k);
      const P = t[k] ?? { x: 790, y: c };
      n.push({
        id: k,
        label: b.label,
        x: P.x,
        y: P.y,
        w: Zn,
        h: Qn,
        kind: b.external ? "external-system" : "module",
        symbol: "component",
        fill: b.external ? "#ffffff" : "#e0e7ff",
        stroke: "#64748b",
        dashed: b.external,
        badge: b.external ? "EXTERNAL" : "MODULE"
      });
    }
    s.push({
      id: `fe:${a.id}:in`,
      sourceId: m,
      targetId: g,
      kind: "flow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    }), s.push({
      id: `fe:${a.id}:out`,
      sourceId: g,
      targetId: k,
      kind: "flow-delivery",
      color: l,
      arrow: !0
    });
  }), { nodes: n, edges: s };
}
const ts = 190, is = 56, Ct = 170, ns = 52;
function ri(e, t) {
  const i = [], n = [], s = (o) => {
    var r;
    return (r = e.modules.find((a) => a.id === o)) == null ? void 0 : r.name;
  };
  return (e.processes ?? []).forEach((o, r) => {
    const a = 140 + r * 240, d = t[o.id] ?? { x: 150, y: a };
    i.push({
      id: o.id,
      label: o.name,
      x: d.x,
      y: d.y,
      w: ts,
      h: is,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${s(o.ownerModuleId) ? ` — módulo ${s(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let c = o.id;
    if (o.steps.forEach((l, m) => {
      const g = l.type === "HUMAN", _ = t[l.id] ?? { x: 150 + (m + 1) * 240, y: a };
      if (i.push({
        id: l.id,
        label: l.name,
        x: _.x,
        y: _.y,
        w: Ct,
        h: ns,
        kind: "process-step",
        symbol: g ? "person" : "gear",
        fill: g ? "#fef3c7" : "#ffffff",
        stroke: g ? "#d97706" : "#64748b",
        badge: g ? `HUMAN${l.roleId ? ` · ${l.roleId}` : ""}${l.deadline ? ` · ⏱ ${l.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${l.name}${l.useCaseId ? ` — use case ${l.useCaseId}` : ""}${l.deadline ? ` · deadline ${l.deadline}` : ""}`
      }), n.push({
        id: `pe:${o.id}:${m}`,
        sourceId: c,
        targetId: l.id,
        kind: "process-seq",
        label: m === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), l.compensationUseCaseId) {
        const b = `comp:${l.id}`, k = t[b] ?? { x: _.x, y: _.y + 90 };
        i.push({
          id: b,
          label: l.compensationUseCaseId,
          x: k.x,
          y: k.y,
          w: Ct,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), n.push({
          id: `pc:${l.id}`,
          sourceId: l.id,
          targetId: b,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      c = l.id;
    }), o.onCompletionEventName) {
      const l = `done:${o.id}`, m = t[l] ?? { x: 150 + (o.steps.length + 1) * 240, y: a };
      i.push({
        id: l,
        label: o.onCompletionEventName,
        x: m.x,
        y: m.y,
        w: Ct,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), n.push({
        id: `pd:${o.id}`,
        sourceId: c,
        targetId: l,
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
const ct = globalThis, Gt = ct.ShadowRoot && (ct.ShadyCSS === void 0 || ct.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Yt = Symbol(), ai = /* @__PURE__ */ new WeakMap();
let Ki = class {
  constructor(t, i, n) {
    if (this._$cssResult$ = !0, n !== Yt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Gt && t === void 0) {
      const n = i !== void 0 && i.length === 1;
      n && (t = ai.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && ai.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ss = (e) => new Ki(typeof e == "string" ? e : e + "", void 0, Yt), Xt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((n, s, o) => n + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new Ki(i, e, Yt);
}, os = (e, t) => {
  if (Gt) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const n = document.createElement("style"), s = ct.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = i.cssText, e.appendChild(n);
  }
}, di = Gt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const n of t.cssRules) i += n.cssText;
  return ss(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: rs, defineProperty: as, getOwnPropertyDescriptor: ds, getOwnPropertyNames: ls, getOwnPropertySymbols: cs, getPrototypeOf: us } = Object, ve = globalThis, li = ve.trustedTypes, hs = li ? li.emptyScript : "", At = ve.reactiveElementPolyfillSupport, He = (e, t) => e, mt = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? hs : null;
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
} }, jt = (e, t) => !rs(e, t), ci = { attribute: !0, type: String, converter: mt, reflect: !1, useDefault: !1, hasChanged: jt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), ve.litPropertyMetadata ?? (ve.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let Ae = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = ci) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, i);
      s !== void 0 && as(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, i, n) {
    const { get: s, set: o } = ds(this.prototype, t) ?? { get() {
      return this[i];
    }, set(r) {
      this[i] = r;
    } };
    return { get: s, set(r) {
      const a = s == null ? void 0 : s.call(this);
      o == null || o.call(this, r), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ci;
  }
  static _$Ei() {
    if (this.hasOwnProperty(He("elementProperties"))) return;
    const t = us(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(He("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(He("properties"))) {
      const i = this.properties, n = [...ls(i), ...cs(i)];
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
      for (const s of n) i.unshift(di(s));
    } else t !== void 0 && i.push(di(t));
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
    return os(t, this.constructor.elementStyles), t;
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
      const r = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : mt).toAttribute(i, n.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, r;
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const a = n.getPropertyOptions(s), d = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : mt;
      this._$Em = s;
      const c = d.fromAttribute(i, a.type);
      this[s] = c ?? ((r = this._$Ej) == null ? void 0 : r.get(s)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, i, n, s = !1, o) {
    var r;
    if (t !== void 0) {
      const a = this.constructor;
      if (s === !1 && (o = this[t]), n ?? (n = a.getPropertyOptions(t)), !((n.hasChanged ?? jt)(o, i) || n.useDefault && n.reflect && o === ((r = this._$Ej) == null ? void 0 : r.get(t)) && !this.hasAttribute(a._$Eu(t, n)))) return;
      this.C(t, i, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, i, { useDefault: n, reflect: s, wrapped: o }, r) {
    n && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? i ?? this[t]), o !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (i = void 0), this._$AL.set(t, i)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, r] of s) {
        const { wrapped: a } = r, d = this[o];
        a !== !0 || this._$AL.has(o) || d === void 0 || this.C(o, void 0, r, d);
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
Ae.elementStyles = [], Ae.shadowRootOptions = { mode: "open" }, Ae[He("elementProperties")] = /* @__PURE__ */ new Map(), Ae[He("finalized")] = /* @__PURE__ */ new Map(), At == null || At({ ReactiveElement: Ae }), (ve.reactiveElementVersions ?? (ve.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = globalThis, ui = (e) => e, gt = qe.trustedTypes, hi = gt ? gt.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, Wi = "$lit$", we = `lit$${Math.random().toFixed(9).slice(2)}$`, Bi = "?" + we, ps = `<${Bi}>`, Ee = document, Be = () => Ee.createComment(""), Ge = (e) => e === null || typeof e != "object" && typeof e != "function", Zt = Array.isArray, fs = (e) => Zt(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Mt = `[ 	
\f\r]`, Oe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pi = /-->/g, fi = />/g, _e = RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mi = /'/g, gi = /"/g, Gi = /^(?:script|style|textarea|title)$/i, Yi = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), M = Yi(1), z = Yi(2), Ne = Symbol.for("lit-noChange"), G = Symbol.for("lit-nothing"), wi = /* @__PURE__ */ new WeakMap(), xe = Ee.createTreeWalker(Ee, 129);
function Xi(e, t) {
  if (!Zt(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return hi !== void 0 ? hi.createHTML(t) : t;
}
const ms = (e, t) => {
  const i = e.length - 1, n = [];
  let s, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = Oe;
  for (let a = 0; a < i; a++) {
    const d = e[a];
    let c, l, m = -1, g = 0;
    for (; g < d.length && (r.lastIndex = g, l = r.exec(d), l !== null); ) g = r.lastIndex, r === Oe ? l[1] === "!--" ? r = pi : l[1] !== void 0 ? r = fi : l[2] !== void 0 ? (Gi.test(l[2]) && (s = RegExp("</" + l[2], "g")), r = _e) : l[3] !== void 0 && (r = _e) : r === _e ? l[0] === ">" ? (r = s ?? Oe, m = -1) : l[1] === void 0 ? m = -2 : (m = r.lastIndex - l[2].length, c = l[1], r = l[3] === void 0 ? _e : l[3] === '"' ? gi : mi) : r === gi || r === mi ? r = _e : r === pi || r === fi ? r = Oe : (r = _e, s = void 0);
    const _ = r === _e && e[a + 1].startsWith("/>") ? " " : "";
    o += r === Oe ? d + ps : m >= 0 ? (n.push(c), d.slice(0, m) + Wi + d.slice(m) + we + _) : d + we + (m === -2 ? a : _);
  }
  return [Xi(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Ye {
  constructor({ strings: t, _$litType$: i }, n) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const a = t.length - 1, d = this.parts, [c, l] = ms(t, i);
    if (this.el = Ye.createElement(c, n), xe.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = xe.nextNode()) !== null && d.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(Wi)) {
          const g = l[r++], _ = s.getAttribute(m).split(we), b = /([.?@])?(.*)/.exec(g);
          d.push({ type: 1, index: o, name: b[2], strings: _, ctor: b[1] === "." ? ws : b[1] === "?" ? vs : b[1] === "@" ? _s : $t }), s.removeAttribute(m);
        } else m.startsWith(we) && (d.push({ type: 6, index: o }), s.removeAttribute(m));
        if (Gi.test(s.tagName)) {
          const m = s.textContent.split(we), g = m.length - 1;
          if (g > 0) {
            s.textContent = gt ? gt.emptyScript : "";
            for (let _ = 0; _ < g; _++) s.append(m[_], Be()), xe.nextNode(), d.push({ type: 2, index: ++o });
            s.append(m[g], Be());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Bi) d.push({ type: 2, index: o });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(we, m + 1)) !== -1; ) d.push({ type: 7, index: o }), m += we.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const n = Ee.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Te(e, t, i = e, n) {
  var r, a;
  if (t === Ne) return t;
  let s = n !== void 0 ? (r = i._$Co) == null ? void 0 : r[n] : i._$Cl;
  const o = Ge(t) ? void 0 : t._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((a = s == null ? void 0 : s._$AO) == null || a.call(s, !1), o === void 0 ? s = void 0 : (s = new o(e), s._$AT(e, i, n)), n !== void 0 ? (i._$Co ?? (i._$Co = []))[n] = s : i._$Cl = s), s !== void 0 && (t = Te(e, s._$AS(e, t.values), s, n)), t;
}
class gs {
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
    const { el: { content: i }, parts: n } = this._$AD, s = ((t == null ? void 0 : t.creationScope) ?? Ee).importNode(i, !0);
    xe.currentNode = s;
    let o = xe.nextNode(), r = 0, a = 0, d = n[0];
    for (; d !== void 0; ) {
      if (r === d.index) {
        let c;
        d.type === 2 ? c = new Je(o, o.nextSibling, this, t) : d.type === 1 ? c = new d.ctor(o, d.name, d.strings, this, t) : d.type === 6 && (c = new ys(o, this, t)), this._$AV.push(c), d = n[++a];
      }
      r !== (d == null ? void 0 : d.index) && (o = xe.nextNode(), r++);
    }
    return xe.currentNode = Ee, s;
  }
  p(t) {
    let i = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, i), i += n.strings.length - 2) : n._$AI(t[i])), i++;
  }
}
class Je {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, i, n, s) {
    this.type = 2, this._$AH = G, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = n, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    t = Te(this, t, i), Ge(t) ? t === G || t == null || t === "" ? (this._$AH !== G && this._$AR(), this._$AH = G) : t !== this._$AH && t !== Ne && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : fs(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== G && Ge(this._$AH) ? this._$AA.nextSibling.data = t : this.T(Ee.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Ye.createElement(Xi(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(i);
    else {
      const r = new gs(s, this), a = r.u(this.options);
      r.p(i), this.T(a), this._$AH = r;
    }
  }
  _$AC(t) {
    let i = wi.get(t.strings);
    return i === void 0 && wi.set(t.strings, i = new Ye(t)), i;
  }
  k(t) {
    Zt(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let n, s = 0;
    for (const o of t) s === i.length ? i.push(n = new Je(this.O(Be()), this.O(Be()), this, this.options)) : n = i[s], n._$AI(o), s++;
    s < i.length && (this._$AR(n && n._$AB.nextSibling, s), i.length = s);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, i); t !== this._$AB; ) {
      const s = ui(t).nextSibling;
      ui(t).remove(), t = s;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class $t {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, n, s, o) {
    this.type = 1, this._$AH = G, this._$AN = void 0, this.element = t, this.name = i, this._$AM = s, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = G;
  }
  _$AI(t, i = this, n, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0) t = Te(this, t, i, 0), r = !Ge(t) || t !== this._$AH && t !== Ne, r && (this._$AH = t);
    else {
      const a = t;
      let d, c;
      for (t = o[0], d = 0; d < o.length - 1; d++) c = Te(this, a[n + d], i, d), c === Ne && (c = this._$AH[d]), r || (r = !Ge(c) || c !== this._$AH[d]), c === G ? t = G : t !== G && (t += (c ?? "") + o[d + 1]), this._$AH[d] = c;
    }
    r && !s && this.j(t);
  }
  j(t) {
    t === G ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ws extends $t {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === G ? void 0 : t;
  }
}
class vs extends $t {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== G);
  }
}
class _s extends $t {
  constructor(t, i, n, s, o) {
    super(t, i, n, s, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = Te(this, t, i, 0) ?? G) === Ne) return;
    const n = this._$AH, s = t === G && n !== G || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== G && (n === G || s);
    s && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ys {
  constructor(t, i, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Te(this, t);
  }
}
const Nt = qe.litHtmlPolyfillSupport;
Nt == null || Nt(Ye, Je), (qe.litHtmlVersions ?? (qe.litHtmlVersions = [])).push("3.3.3");
const xs = (e, t, i) => {
  const n = (i == null ? void 0 : i.renderBefore) ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    n._$litPart$ = s = new Je(t.insertBefore(Be(), o), o, void 0, i ?? {});
  }
  return s._$AI(e), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = globalThis;
class be extends Ae {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = xs(i, this.renderRoot, this.renderOptions);
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
    return Ne;
  }
}
var zi;
be._$litElement$ = !0, be.finalized = !0, (zi = $e.litElementHydrateSupport) == null || zi.call($e, { LitElement: be });
const Tt = $e.litElementPolyfillSupport;
Tt == null || Tt({ LitElement: be });
($e.litElementVersions ?? ($e.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Is = { attribute: !0, type: String, converter: mt, reflect: !1, hasChanged: jt }, $s = (e = Is, t, i) => {
  const { kind: n, metadata: s } = i;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), n === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(i.name, e), n === "accessor") {
    const { name: r } = i;
    return { set(a) {
      const d = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(r, d, e, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(r, void 0, e, a), a;
    } };
  }
  if (n === "setter") {
    const { name: r } = i;
    return function(a) {
      const d = this[r];
      t.call(this, a), this.requestUpdate(r, d, e, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function le(e) {
  return (t, i) => typeof i == "object" ? $s(e, t, i) : ((n, s, o) => {
    const r = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, n), r ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function N(e) {
  return le({ ...e, state: !0, attribute: !1 });
}
var Dt = "http://www.w3.org/1999/xhtml";
const vi = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Dt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function bt(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), vi.hasOwnProperty(t) ? { space: vi[t], local: e } : e;
}
function bs(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Dt && t.documentElement.namespaceURI === Dt ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function ks(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function ji(e) {
  var t = bt(e);
  return (t.local ? ks : bs)(t);
}
function Es() {
}
function Jt(e) {
  return e == null ? Es : function() {
    return this.querySelector(e);
  };
}
function Ss(e) {
  typeof e != "function" && (e = Jt(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = new Array(r), d, c, l = 0; l < r; ++l)
      (d = o[l]) && (c = e.call(d, d.__data__, l, o)) && ("__data__" in d && (c.__data__ = d.__data__), a[l] = c);
  return new J(n, this._parents);
}
function Cs(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function As() {
  return [];
}
function Zi(e) {
  return e == null ? As : function() {
    return this.querySelectorAll(e);
  };
}
function Ms(e) {
  return function() {
    return Cs(e.apply(this, arguments));
  };
}
function Ns(e) {
  typeof e == "function" ? e = Ms(e) : e = Zi(e);
  for (var t = this._groups, i = t.length, n = [], s = [], o = 0; o < i; ++o)
    for (var r = t[o], a = r.length, d, c = 0; c < a; ++c)
      (d = r[c]) && (n.push(e.call(d, d.__data__, c, r)), s.push(d));
  return new J(n, s);
}
function Qi(e) {
  return function() {
    return this.matches(e);
  };
}
function Ji(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Ts = Array.prototype.find;
function Ps(e) {
  return function() {
    return Ts.call(this.children, e);
  };
}
function Rs() {
  return this.firstElementChild;
}
function Os(e) {
  return this.select(e == null ? Rs : Ps(typeof e == "function" ? e : Ji(e)));
}
var Us = Array.prototype.filter;
function Ds() {
  return Array.from(this.children);
}
function Ls(e) {
  return function() {
    return Us.call(this.children, e);
  };
}
function zs(e) {
  return this.selectAll(e == null ? Ds : Ls(typeof e == "function" ? e : Ji(e)));
}
function Hs(e) {
  typeof e != "function" && (e = Qi(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], d, c = 0; c < r; ++c)
      (d = o[c]) && e.call(d, d.__data__, c, o) && a.push(d);
  return new J(n, this._parents);
}
function en(e) {
  return new Array(e.length);
}
function qs() {
  return new J(this._enter || this._groups.map(en), this._parents);
}
function wt(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
wt.prototype = {
  constructor: wt,
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
function Vs(e) {
  return function() {
    return e;
  };
}
function Fs(e, t, i, n, s, o) {
  for (var r = 0, a, d = t.length, c = o.length; r < c; ++r)
    (a = t[r]) ? (a.__data__ = o[r], n[r] = a) : i[r] = new wt(e, o[r]);
  for (; r < d; ++r)
    (a = t[r]) && (s[r] = a);
}
function Ks(e, t, i, n, s, o, r) {
  var a, d, c = /* @__PURE__ */ new Map(), l = t.length, m = o.length, g = new Array(l), _;
  for (a = 0; a < l; ++a)
    (d = t[a]) && (g[a] = _ = r.call(d, d.__data__, a, t) + "", c.has(_) ? s[a] = d : c.set(_, d));
  for (a = 0; a < m; ++a)
    _ = r.call(e, o[a], a, o) + "", (d = c.get(_)) ? (n[a] = d, d.__data__ = o[a], c.delete(_)) : i[a] = new wt(e, o[a]);
  for (a = 0; a < l; ++a)
    (d = t[a]) && c.get(g[a]) === d && (s[a] = d);
}
function Ws(e) {
  return e.__data__;
}
function Bs(e, t) {
  if (!arguments.length) return Array.from(this, Ws);
  var i = t ? Ks : Fs, n = this._parents, s = this._groups;
  typeof e != "function" && (e = Vs(e));
  for (var o = s.length, r = new Array(o), a = new Array(o), d = new Array(o), c = 0; c < o; ++c) {
    var l = n[c], m = s[c], g = m.length, _ = Gs(e.call(l, l && l.__data__, c, n)), b = _.length, k = a[c] = new Array(b), P = r[c] = new Array(b), x = d[c] = new Array(g);
    i(l, m, k, P, x, _, t);
    for (var U = 0, V = 0, y, $; U < b; ++U)
      if (y = k[U]) {
        for (U >= V && (V = U + 1); !($ = P[V]) && ++V < b; ) ;
        y._next = $ || null;
      }
  }
  return r = new J(r, n), r._enter = a, r._exit = d, r;
}
function Gs(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ys() {
  return new J(this._exit || this._groups.map(en), this._parents);
}
function Xs(e, t, i) {
  var n = this.enter(), s = this, o = this.exit();
  return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), i == null ? o.remove() : i(o), n && s ? n.merge(s).order() : s;
}
function js(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, n = t._groups, s = i.length, o = n.length, r = Math.min(s, o), a = new Array(s), d = 0; d < r; ++d)
    for (var c = i[d], l = n[d], m = c.length, g = a[d] = new Array(m), _, b = 0; b < m; ++b)
      (_ = c[b] || l[b]) && (g[b] = _);
  for (; d < s; ++d)
    a[d] = i[d];
  return new J(a, this._parents);
}
function Zs() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var n = e[t], s = n.length - 1, o = n[s], r; --s >= 0; )
      (r = n[s]) && (o && r.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(r, o), o = r);
  return this;
}
function Qs(e) {
  e || (e = Js);
  function t(m, g) {
    return m && g ? e(m.__data__, g.__data__) : !m - !g;
  }
  for (var i = this._groups, n = i.length, s = new Array(n), o = 0; o < n; ++o) {
    for (var r = i[o], a = r.length, d = s[o] = new Array(a), c, l = 0; l < a; ++l)
      (c = r[l]) && (d[l] = c);
    d.sort(t);
  }
  return new J(s, this._parents).order();
}
function Js(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function eo() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function to() {
  return Array.from(this);
}
function io() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length; s < o; ++s) {
      var r = n[s];
      if (r) return r;
    }
  return null;
}
function no() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function so() {
  return !this.node();
}
function oo(e) {
  for (var t = this._groups, i = 0, n = t.length; i < n; ++i)
    for (var s = t[i], o = 0, r = s.length, a; o < r; ++o)
      (a = s[o]) && e.call(a, a.__data__, o, s);
  return this;
}
function ro(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ao(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function lo(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function co(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function uo(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function ho(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function po(e, t) {
  var i = bt(e);
  if (arguments.length < 2) {
    var n = this.node();
    return i.local ? n.getAttributeNS(i.space, i.local) : n.getAttribute(i);
  }
  return this.each((t == null ? i.local ? ao : ro : typeof t == "function" ? i.local ? ho : uo : i.local ? co : lo)(i, t));
}
function tn(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function fo(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function mo(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function go(e, t, i) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, i);
  };
}
function wo(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? fo : typeof t == "function" ? go : mo)(e, t, i ?? "")) : Pe(this.node(), e);
}
function Pe(e, t) {
  return e.style.getPropertyValue(t) || tn(e).getComputedStyle(e, null).getPropertyValue(t);
}
function vo(e) {
  return function() {
    delete this[e];
  };
}
function _o(e, t) {
  return function() {
    this[e] = t;
  };
}
function yo(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function xo(e, t) {
  return arguments.length > 1 ? this.each((t == null ? vo : typeof t == "function" ? yo : _o)(e, t)) : this.node()[e];
}
function nn(e) {
  return e.trim().split(/^|\s+/);
}
function ei(e) {
  return e.classList || new sn(e);
}
function sn(e) {
  this._node = e, this._names = nn(e.getAttribute("class") || "");
}
sn.prototype = {
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
function on(e, t) {
  for (var i = ei(e), n = -1, s = t.length; ++n < s; ) i.add(t[n]);
}
function rn(e, t) {
  for (var i = ei(e), n = -1, s = t.length; ++n < s; ) i.remove(t[n]);
}
function Io(e) {
  return function() {
    on(this, e);
  };
}
function $o(e) {
  return function() {
    rn(this, e);
  };
}
function bo(e, t) {
  return function() {
    (t.apply(this, arguments) ? on : rn)(this, e);
  };
}
function ko(e, t) {
  var i = nn(e + "");
  if (arguments.length < 2) {
    for (var n = ei(this.node()), s = -1, o = i.length; ++s < o; ) if (!n.contains(i[s])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? bo : t ? Io : $o)(i, t));
}
function Eo() {
  this.textContent = "";
}
function So(e) {
  return function() {
    this.textContent = e;
  };
}
function Co(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Ao(e) {
  return arguments.length ? this.each(e == null ? Eo : (typeof e == "function" ? Co : So)(e)) : this.node().textContent;
}
function Mo() {
  this.innerHTML = "";
}
function No(e) {
  return function() {
    this.innerHTML = e;
  };
}
function To(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Po(e) {
  return arguments.length ? this.each(e == null ? Mo : (typeof e == "function" ? To : No)(e)) : this.node().innerHTML;
}
function Ro() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Oo() {
  return this.each(Ro);
}
function Uo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Do() {
  return this.each(Uo);
}
function Lo(e) {
  var t = typeof e == "function" ? e : ji(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function zo() {
  return null;
}
function Ho(e, t) {
  var i = typeof e == "function" ? e : ji(e), n = t == null ? zo : typeof t == "function" ? t : Jt(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), n.apply(this, arguments) || null);
  });
}
function qo() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function Vo() {
  return this.each(qo);
}
function Fo() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ko() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Wo(e) {
  return this.select(e ? Ko : Fo);
}
function Bo(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function Go(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Yo(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", n = t.indexOf(".");
    return n >= 0 && (i = t.slice(n + 1), t = t.slice(0, n)), { type: t, name: i };
  });
}
function Xo(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, n = -1, s = t.length, o; i < s; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++n] = o;
      ++n ? t.length = n : delete this.__on;
    }
  };
}
function jo(e, t, i) {
  return function() {
    var n = this.__on, s, o = Go(t);
    if (n) {
      for (var r = 0, a = n.length; r < a; ++r)
        if ((s = n[r]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = o, s.options = i), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, o, i), s = { type: e.type, name: e.name, value: t, listener: o, options: i }, n ? n.push(s) : this.__on = [s];
  };
}
function Zo(e, t, i) {
  var n = Yo(e + ""), s, o = n.length, r;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var d = 0, c = a.length, l; d < c; ++d)
        for (s = 0, l = a[d]; s < o; ++s)
          if ((r = n[s]).type === l.type && r.name === l.name)
            return l.value;
    }
    return;
  }
  for (a = t ? jo : Xo, s = 0; s < o; ++s) this.each(a(n[s], t, i));
  return this;
}
function an(e, t, i) {
  var n = tn(e), s = n.CustomEvent;
  typeof s == "function" ? s = new s(t, i) : (s = n.document.createEvent("Event"), i ? (s.initEvent(t, i.bubbles, i.cancelable), s.detail = i.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function Qo(e, t) {
  return function() {
    return an(this, e, t);
  };
}
function Jo(e, t) {
  return function() {
    return an(this, e, t.apply(this, arguments));
  };
}
function er(e, t) {
  return this.each((typeof t == "function" ? Jo : Qo)(e, t));
}
function* tr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var n = e[t], s = 0, o = n.length, r; s < o; ++s)
      (r = n[s]) && (yield r);
}
var dn = [null];
function J(e, t) {
  this._groups = e, this._parents = t;
}
function et() {
  return new J([[document.documentElement]], dn);
}
function ir() {
  return this;
}
J.prototype = et.prototype = {
  constructor: J,
  select: Ss,
  selectAll: Ns,
  selectChild: Os,
  selectChildren: zs,
  filter: Hs,
  data: Bs,
  enter: qs,
  exit: Ys,
  join: Xs,
  merge: js,
  selection: ir,
  order: Zs,
  sort: Qs,
  call: eo,
  nodes: to,
  node: io,
  size: no,
  empty: so,
  each: oo,
  attr: po,
  style: wo,
  property: xo,
  classed: ko,
  text: Ao,
  html: Po,
  raise: Oo,
  lower: Do,
  append: Lo,
  insert: Ho,
  remove: Vo,
  clone: Wo,
  datum: Bo,
  on: Zo,
  dispatch: er,
  [Symbol.iterator]: tr
};
function ae(e) {
  return typeof e == "string" ? new J([[document.querySelector(e)]], [document.documentElement]) : new J([[e]], dn);
}
function nr(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function ye(e, t) {
  if (e = nr(e), t === void 0 && (t = e.currentTarget), t) {
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
var sr = { value: () => {
} };
function ti() {
  for (var e = 0, t = arguments.length, i = {}, n; e < t; ++e) {
    if (!(n = arguments[e] + "") || n in i || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
    i[n] = [];
  }
  return new ut(i);
}
function ut(e) {
  this._ = e;
}
function or(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var n = "", s = i.indexOf(".");
    if (s >= 0 && (n = i.slice(s + 1), i = i.slice(0, s)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: n };
  });
}
ut.prototype = ti.prototype = {
  constructor: ut,
  on: function(e, t) {
    var i = this._, n = or(e + "", i), s, o = -1, r = n.length;
    if (arguments.length < 2) {
      for (; ++o < r; ) if ((s = (e = n[o]).type) && (s = rr(i[s], e.name))) return s;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < r; )
      if (s = (e = n[o]).type) i[s] = _i(i[s], e.name, t);
      else if (t == null) for (s in i) i[s] = _i(i[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new ut(e);
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
function rr(e, t) {
  for (var i = 0, n = e.length, s; i < n; ++i)
    if ((s = e[i]).name === t)
      return s.value;
}
function _i(e, t, i) {
  for (var n = 0, s = e.length; n < s; ++n)
    if (e[n].name === t) {
      e[n] = sr, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const Lt = { capture: !0, passive: !1 };
function zt(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ar(e) {
  var t = e.document.documentElement, i = ae(e).on("dragstart.drag", zt, Lt);
  "onselectstart" in t ? i.on("selectstart.drag", zt, Lt) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function dr(e, t) {
  var i = e.document.documentElement, n = ae(e).on("dragstart.drag", null);
  t && (n.on("click.drag", zt, Lt), setTimeout(function() {
    n.on("click.drag", null);
  }, 0)), "onselectstart" in i ? n.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function ii(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function ln(e, t) {
  var i = Object.create(e.prototype);
  for (var n in t) i[n] = t[n];
  return i;
}
function tt() {
}
var Xe = 0.7, vt = 1 / Xe, Me = "\\s*([+-]?\\d+)\\s*", je = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", de = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", lr = /^#([0-9a-f]{3,8})$/, cr = new RegExp(`^rgb\\(${Me},${Me},${Me}\\)$`), ur = new RegExp(`^rgb\\(${de},${de},${de}\\)$`), hr = new RegExp(`^rgba\\(${Me},${Me},${Me},${je}\\)$`), pr = new RegExp(`^rgba\\(${de},${de},${de},${je}\\)$`), fr = new RegExp(`^hsl\\(${je},${de},${de}\\)$`), mr = new RegExp(`^hsla\\(${je},${de},${de},${je}\\)$`), yi = {
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
ii(tt, Ze, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: xi,
  // Deprecated! Use color.formatHex.
  formatHex: xi,
  formatHex8: gr,
  formatHsl: wr,
  formatRgb: Ii,
  toString: Ii
});
function xi() {
  return this.rgb().formatHex();
}
function gr() {
  return this.rgb().formatHex8();
}
function wr() {
  return cn(this).formatHsl();
}
function Ii() {
  return this.rgb().formatRgb();
}
function Ze(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = lr.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? $i(t) : i === 3 ? new Z(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? nt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? nt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = cr.exec(e)) ? new Z(t[1], t[2], t[3], 1) : (t = ur.exec(e)) ? new Z(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = hr.exec(e)) ? nt(t[1], t[2], t[3], t[4]) : (t = pr.exec(e)) ? nt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = fr.exec(e)) ? Ei(t[1], t[2] / 100, t[3] / 100, 1) : (t = mr.exec(e)) ? Ei(t[1], t[2] / 100, t[3] / 100, t[4]) : yi.hasOwnProperty(e) ? $i(yi[e]) : e === "transparent" ? new Z(NaN, NaN, NaN, 0) : null;
}
function $i(e) {
  return new Z(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function nt(e, t, i, n) {
  return n <= 0 && (e = t = i = NaN), new Z(e, t, i, n);
}
function vr(e) {
  return e instanceof tt || (e = Ze(e)), e ? (e = e.rgb(), new Z(e.r, e.g, e.b, e.opacity)) : new Z();
}
function Ht(e, t, i, n) {
  return arguments.length === 1 ? vr(e) : new Z(e, t, i, n ?? 1);
}
function Z(e, t, i, n) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +n;
}
ii(Z, Ht, ln(tt, {
  brighter(e) {
    return e = e == null ? vt : Math.pow(vt, e), new Z(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xe : Math.pow(Xe, e), new Z(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Z(ke(this.r), ke(this.g), ke(this.b), _t(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: bi,
  // Deprecated! Use color.formatHex.
  formatHex: bi,
  formatHex8: _r,
  formatRgb: ki,
  toString: ki
}));
function bi() {
  return `#${Ie(this.r)}${Ie(this.g)}${Ie(this.b)}`;
}
function _r() {
  return `#${Ie(this.r)}${Ie(this.g)}${Ie(this.b)}${Ie((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ki() {
  const e = _t(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ke(this.r)}, ${ke(this.g)}, ${ke(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function _t(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ke(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Ie(e) {
  return e = ke(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Ei(e, t, i, n) {
  return n <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new se(e, t, i, n);
}
function cn(e) {
  if (e instanceof se) return new se(e.h, e.s, e.l, e.opacity);
  if (e instanceof tt || (e = Ze(e)), !e) return new se();
  if (e instanceof se) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, n = e.b / 255, s = Math.min(t, i, n), o = Math.max(t, i, n), r = NaN, a = o - s, d = (o + s) / 2;
  return a ? (t === o ? r = (i - n) / a + (i < n) * 6 : i === o ? r = (n - t) / a + 2 : r = (t - i) / a + 4, a /= d < 0.5 ? o + s : 2 - o - s, r *= 60) : a = d > 0 && d < 1 ? 0 : r, new se(r, a, d, e.opacity);
}
function yr(e, t, i, n) {
  return arguments.length === 1 ? cn(e) : new se(e, t, i, n ?? 1);
}
function se(e, t, i, n) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +n;
}
ii(se, yr, ln(tt, {
  brighter(e) {
    return e = e == null ? vt : Math.pow(vt, e), new se(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Xe : Math.pow(Xe, e), new se(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, n = i + (i < 0.5 ? i : 1 - i) * t, s = 2 * i - n;
    return new Z(
      Pt(e >= 240 ? e - 240 : e + 120, s, n),
      Pt(e, s, n),
      Pt(e < 120 ? e + 240 : e - 120, s, n),
      this.opacity
    );
  },
  clamp() {
    return new se(Si(this.h), st(this.s), st(this.l), _t(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = _t(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Si(this.h)}, ${st(this.s) * 100}%, ${st(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Si(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function st(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Pt(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const un = (e) => () => e;
function xr(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Ir(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(n) {
    return Math.pow(e + n * t, i);
  };
}
function $r(e) {
  return (e = +e) == 1 ? hn : function(t, i) {
    return i - t ? Ir(t, i, e) : un(isNaN(t) ? i : t);
  };
}
function hn(e, t) {
  var i = t - e;
  return i ? xr(e, i) : un(isNaN(e) ? t : e);
}
const Ci = (function e(t) {
  var i = $r(t);
  function n(s, o) {
    var r = i((s = Ht(s)).r, (o = Ht(o)).r), a = i(s.g, o.g), d = i(s.b, o.b), c = hn(s.opacity, o.opacity);
    return function(l) {
      return s.r = r(l), s.g = a(l), s.b = d(l), s.opacity = c(l), s + "";
    };
  }
  return n.gamma = e, n;
})(1);
function ge(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var qt = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Rt = new RegExp(qt.source, "g");
function br(e) {
  return function() {
    return e;
  };
}
function kr(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Er(e, t) {
  var i = qt.lastIndex = Rt.lastIndex = 0, n, s, o, r = -1, a = [], d = [];
  for (e = e + "", t = t + ""; (n = qt.exec(e)) && (s = Rt.exec(t)); )
    (o = s.index) > i && (o = t.slice(i, o), a[r] ? a[r] += o : a[++r] = o), (n = n[0]) === (s = s[0]) ? a[r] ? a[r] += s : a[++r] = s : (a[++r] = null, d.push({ i: r, x: ge(n, s) })), i = Rt.lastIndex;
  return i < t.length && (o = t.slice(i), a[r] ? a[r] += o : a[++r] = o), a.length < 2 ? d[0] ? kr(d[0].x) : br(t) : (t = d.length, function(c) {
    for (var l = 0, m; l < t; ++l) a[(m = d[l]).i] = m.x(c);
    return a.join("");
  });
}
var Ai = 180 / Math.PI, Vt = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function pn(e, t, i, n, s, o) {
  var r, a, d;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (d = e * i + t * n) && (i -= e * d, n -= t * d), (a = Math.sqrt(i * i + n * n)) && (i /= a, n /= a, d /= a), e * n < t * i && (e = -e, t = -t, d = -d, r = -r), {
    translateX: s,
    translateY: o,
    rotate: Math.atan2(t, e) * Ai,
    skewX: Math.atan(d) * Ai,
    scaleX: r,
    scaleY: a
  };
}
var ot;
function Sr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Vt : pn(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Cr(e) {
  return e == null || (ot || (ot = document.createElementNS("http://www.w3.org/2000/svg", "g")), ot.setAttribute("transform", e), !(e = ot.transform.baseVal.consolidate())) ? Vt : (e = e.matrix, pn(e.a, e.b, e.c, e.d, e.e, e.f));
}
function fn(e, t, i, n) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function o(c, l, m, g, _, b) {
    if (c !== m || l !== g) {
      var k = _.push("translate(", null, t, null, i);
      b.push({ i: k - 4, x: ge(c, m) }, { i: k - 2, x: ge(l, g) });
    } else (m || g) && _.push("translate(" + m + t + g + i);
  }
  function r(c, l, m, g) {
    c !== l ? (c - l > 180 ? l += 360 : l - c > 180 && (c += 360), g.push({ i: m.push(s(m) + "rotate(", null, n) - 2, x: ge(c, l) })) : l && m.push(s(m) + "rotate(" + l + n);
  }
  function a(c, l, m, g) {
    c !== l ? g.push({ i: m.push(s(m) + "skewX(", null, n) - 2, x: ge(c, l) }) : l && m.push(s(m) + "skewX(" + l + n);
  }
  function d(c, l, m, g, _, b) {
    if (c !== m || l !== g) {
      var k = _.push(s(_) + "scale(", null, ",", null, ")");
      b.push({ i: k - 4, x: ge(c, m) }, { i: k - 2, x: ge(l, g) });
    } else (m !== 1 || g !== 1) && _.push(s(_) + "scale(" + m + "," + g + ")");
  }
  return function(c, l) {
    var m = [], g = [];
    return c = e(c), l = e(l), o(c.translateX, c.translateY, l.translateX, l.translateY, m, g), r(c.rotate, l.rotate, m, g), a(c.skewX, l.skewX, m, g), d(c.scaleX, c.scaleY, l.scaleX, l.scaleY, m, g), c = l = null, function(_) {
      for (var b = -1, k = g.length, P; ++b < k; ) m[(P = g[b]).i] = P.x(_);
      return m.join("");
    };
  };
}
var Ar = fn(Sr, "px, ", "px)", "deg)"), Mr = fn(Cr, ", ", ")", ")"), Nr = 1e-12;
function Mi(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Tr(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Pr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Rr = (function e(t, i, n) {
  function s(o, r) {
    var a = o[0], d = o[1], c = o[2], l = r[0], m = r[1], g = r[2], _ = l - a, b = m - d, k = _ * _ + b * b, P, x;
    if (k < Nr)
      x = Math.log(g / c) / t, P = function(S) {
        return [
          a + S * _,
          d + S * b,
          c * Math.exp(t * S * x)
        ];
      };
    else {
      var U = Math.sqrt(k), V = (g * g - c * c + n * k) / (2 * c * i * U), y = (g * g - c * c - n * k) / (2 * g * i * U), $ = Math.log(Math.sqrt(V * V + 1) - V), E = Math.log(Math.sqrt(y * y + 1) - y);
      x = (E - $) / t, P = function(S) {
        var p = S * x, A = Mi($), R = c / (i * U) * (A * Pr(t * p + $) - Tr($));
        return [
          a + R * _,
          d + R * b,
          c * A / Mi(t * p + $)
        ];
      };
    }
    return P.duration = x * 1e3 * t / Math.SQRT2, P;
  }
  return s.rho = function(o) {
    var r = Math.max(1e-3, +o), a = r * r, d = a * a;
    return e(r, a, d);
  }, s;
})(Math.SQRT2, 2, 4);
var Re = 0, Le = 0, Ue = 0, mn = 1e3, yt, ze, xt = 0, Se = 0, kt = 0, Qe = typeof performance == "object" && performance.now ? performance : Date, gn = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function ni() {
  return Se || (gn(Or), Se = Qe.now() + kt);
}
function Or() {
  Se = 0;
}
function It() {
  this._call = this._time = this._next = null;
}
It.prototype = wn.prototype = {
  constructor: It,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? ni() : +i) + (t == null ? 0 : +t), !this._next && ze !== this && (ze ? ze._next = this : yt = this, ze = this), this._call = e, this._time = i, Ft();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Ft());
  }
};
function wn(e, t, i) {
  var n = new It();
  return n.restart(e, t, i), n;
}
function Ur() {
  ni(), ++Re;
  for (var e = yt, t; e; )
    (t = Se - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Re;
}
function Ni() {
  Se = (xt = Qe.now()) + kt, Re = Le = 0;
  try {
    Ur();
  } finally {
    Re = 0, Lr(), Se = 0;
  }
}
function Dr() {
  var e = Qe.now(), t = e - xt;
  t > mn && (kt -= t, xt = e);
}
function Lr() {
  for (var e, t = yt, i, n = 1 / 0; t; )
    t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : yt = i);
  ze = e, Ft(n);
}
function Ft(e) {
  if (!Re) {
    Le && (Le = clearTimeout(Le));
    var t = e - Se;
    t > 24 ? (e < 1 / 0 && (Le = setTimeout(Ni, e - Qe.now() - kt)), Ue && (Ue = clearInterval(Ue))) : (Ue || (xt = Qe.now(), Ue = setInterval(Dr, mn)), Re = 1, gn(Ni));
  }
}
function Ti(e, t, i) {
  var n = new It();
  return t = t == null ? 0 : +t, n.restart((s) => {
    n.stop(), e(s + t);
  }, t, i), n;
}
var zr = ti("start", "end", "cancel", "interrupt"), Hr = [], vn = 0, Pi = 1, Kt = 2, ht = 3, Ri = 4, Wt = 5, pt = 6;
function Et(e, t, i, n, s, o) {
  var r = e.__transition;
  if (!r) e.__transition = {};
  else if (i in r) return;
  qr(e, i, {
    name: t,
    index: n,
    // For context during callback.
    group: s,
    // For context during callback.
    on: zr,
    tween: Hr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: vn
  });
}
function si(e, t) {
  var i = oe(e, t);
  if (i.state > vn) throw new Error("too late; already scheduled");
  return i;
}
function ce(e, t) {
  var i = oe(e, t);
  if (i.state > ht) throw new Error("too late; already running");
  return i;
}
function oe(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function qr(e, t, i) {
  var n = e.__transition, s;
  n[t] = i, i.timer = wn(o, 0, i.time);
  function o(c) {
    i.state = Pi, i.timer.restart(r, i.delay, i.time), i.delay <= c && r(c - i.delay);
  }
  function r(c) {
    var l, m, g, _;
    if (i.state !== Pi) return d();
    for (l in n)
      if (_ = n[l], _.name === i.name) {
        if (_.state === ht) return Ti(r);
        _.state === Ri ? (_.state = pt, _.timer.stop(), _.on.call("interrupt", e, e.__data__, _.index, _.group), delete n[l]) : +l < t && (_.state = pt, _.timer.stop(), _.on.call("cancel", e, e.__data__, _.index, _.group), delete n[l]);
      }
    if (Ti(function() {
      i.state === ht && (i.state = Ri, i.timer.restart(a, i.delay, i.time), a(c));
    }), i.state = Kt, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Kt) {
      for (i.state = ht, s = new Array(g = i.tween.length), l = 0, m = -1; l < g; ++l)
        (_ = i.tween[l].value.call(e, e.__data__, i.index, i.group)) && (s[++m] = _);
      s.length = m + 1;
    }
  }
  function a(c) {
    for (var l = c < i.duration ? i.ease.call(null, c / i.duration) : (i.timer.restart(d), i.state = Wt, 1), m = -1, g = s.length; ++m < g; )
      s[m].call(e, l);
    i.state === Wt && (i.on.call("end", e, e.__data__, i.index, i.group), d());
  }
  function d() {
    i.state = pt, i.timer.stop(), delete n[t];
    for (var c in n) return;
    delete e.__transition;
  }
}
function ft(e, t) {
  var i = e.__transition, n, s, o = !0, r;
  if (i) {
    t = t == null ? null : t + "";
    for (r in i) {
      if ((n = i[r]).name !== t) {
        o = !1;
        continue;
      }
      s = n.state > Kt && n.state < Wt, n.state = pt, n.timer.stop(), n.on.call(s ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete i[r];
    }
    o && delete e.__transition;
  }
}
function Vr(e) {
  return this.each(function() {
    ft(this, e);
  });
}
function Fr(e, t) {
  var i, n;
  return function() {
    var s = ce(this, e), o = s.tween;
    if (o !== i) {
      n = i = o;
      for (var r = 0, a = n.length; r < a; ++r)
        if (n[r].name === t) {
          n = n.slice(), n.splice(r, 1);
          break;
        }
    }
    s.tween = n;
  };
}
function Kr(e, t, i) {
  var n, s;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = ce(this, e), r = o.tween;
    if (r !== n) {
      s = (n = r).slice();
      for (var a = { name: t, value: i }, d = 0, c = s.length; d < c; ++d)
        if (s[d].name === t) {
          s[d] = a;
          break;
        }
      d === c && s.push(a);
    }
    o.tween = s;
  };
}
function Wr(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var n = oe(this.node(), i).tween, s = 0, o = n.length, r; s < o; ++s)
      if ((r = n[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? Fr : Kr)(i, e, t));
}
function oi(e, t, i) {
  var n = e._id;
  return e.each(function() {
    var s = ce(this, n);
    (s.value || (s.value = {}))[t] = i.apply(this, arguments);
  }), function(s) {
    return oe(s, n).value[t];
  };
}
function _n(e, t) {
  var i;
  return (typeof t == "number" ? ge : t instanceof Ze ? Ci : (i = Ze(t)) ? (t = i, Ci) : Er)(e, t);
}
function Br(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Gr(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Yr(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Xr(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function jr(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), d;
    return a == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), d = a + "", r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a)));
  };
}
function Zr(e, t, i) {
  var n, s, o;
  return function() {
    var r, a = i(this), d;
    return a == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), d = a + "", r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a)));
  };
}
function Qr(e, t) {
  var i = bt(e), n = i === "transform" ? Mr : _n;
  return this.attrTween(e, typeof t == "function" ? (i.local ? Zr : jr)(i, n, oi(this, "attr." + e, t)) : t == null ? (i.local ? Gr : Br)(i) : (i.local ? Xr : Yr)(i, n, t));
}
function Jr(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function ea(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function ta(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && ea(e, o)), i;
  }
  return s._value = t, s;
}
function ia(e, t) {
  var i, n;
  function s() {
    var o = t.apply(this, arguments);
    return o !== n && (i = (n = o) && Jr(e, o)), i;
  }
  return s._value = t, s;
}
function na(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var n = bt(e);
  return this.tween(i, (n.local ? ta : ia)(n, t));
}
function sa(e, t) {
  return function() {
    si(this, e).delay = +t.apply(this, arguments);
  };
}
function oa(e, t) {
  return t = +t, function() {
    si(this, e).delay = t;
  };
}
function ra(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? sa : oa)(t, e)) : oe(this.node(), t).delay;
}
function aa(e, t) {
  return function() {
    ce(this, e).duration = +t.apply(this, arguments);
  };
}
function da(e, t) {
  return t = +t, function() {
    ce(this, e).duration = t;
  };
}
function la(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? aa : da)(t, e)) : oe(this.node(), t).duration;
}
function ca(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    ce(this, e).ease = t;
  };
}
function ua(e) {
  var t = this._id;
  return arguments.length ? this.each(ca(t, e)) : oe(this.node(), t).ease;
}
function ha(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    ce(this, e).ease = i;
  };
}
function pa(e) {
  if (typeof e != "function") throw new Error();
  return this.each(ha(this._id, e));
}
function fa(e) {
  typeof e != "function" && (e = Qi(e));
  for (var t = this._groups, i = t.length, n = new Array(i), s = 0; s < i; ++s)
    for (var o = t[s], r = o.length, a = n[s] = [], d, c = 0; c < r; ++c)
      (d = o[c]) && e.call(d, d.__data__, c, o) && a.push(d);
  return new me(n, this._parents, this._name, this._id);
}
function ma(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, n = t.length, s = i.length, o = Math.min(n, s), r = new Array(n), a = 0; a < o; ++a)
    for (var d = t[a], c = i[a], l = d.length, m = r[a] = new Array(l), g, _ = 0; _ < l; ++_)
      (g = d[_] || c[_]) && (m[_] = g);
  for (; a < n; ++a)
    r[a] = t[a];
  return new me(r, this._parents, this._name, this._id);
}
function ga(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function wa(e, t, i) {
  var n, s, o = ga(t) ? si : ce;
  return function() {
    var r = o(this, e), a = r.on;
    a !== n && (s = (n = a).copy()).on(t, i), r.on = s;
  };
}
function va(e, t) {
  var i = this._id;
  return arguments.length < 2 ? oe(this.node(), i).on.on(e) : this.each(wa(i, e, t));
}
function _a(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function ya() {
  return this.on("end.remove", _a(this._id));
}
function xa(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Jt(e));
  for (var n = this._groups, s = n.length, o = new Array(s), r = 0; r < s; ++r)
    for (var a = n[r], d = a.length, c = o[r] = new Array(d), l, m, g = 0; g < d; ++g)
      (l = a[g]) && (m = e.call(l, l.__data__, g, a)) && ("__data__" in l && (m.__data__ = l.__data__), c[g] = m, Et(c[g], t, i, g, c, oe(l, i)));
  return new me(o, this._parents, t, i);
}
function Ia(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Zi(e));
  for (var n = this._groups, s = n.length, o = [], r = [], a = 0; a < s; ++a)
    for (var d = n[a], c = d.length, l, m = 0; m < c; ++m)
      if (l = d[m]) {
        for (var g = e.call(l, l.__data__, m, d), _, b = oe(l, i), k = 0, P = g.length; k < P; ++k)
          (_ = g[k]) && Et(_, t, i, k, g, b);
        o.push(g), r.push(l);
      }
  return new me(o, r, t, i);
}
var $a = et.prototype.constructor;
function ba() {
  return new $a(this._groups, this._parents);
}
function ka(e, t) {
  var i, n, s;
  return function() {
    var o = Pe(this, e), r = (this.style.removeProperty(e), Pe(this, e));
    return o === r ? null : o === i && r === n ? s : s = t(i = o, n = r);
  };
}
function yn(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ea(e, t, i) {
  var n, s = i + "", o;
  return function() {
    var r = Pe(this, e);
    return r === s ? null : r === n ? o : o = t(n = r, i);
  };
}
function Sa(e, t, i) {
  var n, s, o;
  return function() {
    var r = Pe(this, e), a = i(this), d = a + "";
    return a == null && (d = a = (this.style.removeProperty(e), Pe(this, e))), r === d ? null : r === n && d === s ? o : (s = d, o = t(n = r, a));
  };
}
function Ca(e, t) {
  var i, n, s, o = "style." + t, r = "end." + o, a;
  return function() {
    var d = ce(this, e), c = d.on, l = d.value[o] == null ? a || (a = yn(t)) : void 0;
    (c !== i || s !== l) && (n = (i = c).copy()).on(r, s = l), d.on = n;
  };
}
function Aa(e, t, i) {
  var n = (e += "") == "transform" ? Ar : _n;
  return t == null ? this.styleTween(e, ka(e, n)).on("end.style." + e, yn(e)) : typeof t == "function" ? this.styleTween(e, Sa(e, n, oi(this, "style." + e, t))).each(Ca(this._id, e)) : this.styleTween(e, Ea(e, n, t), i).on("end.style." + e, null);
}
function Ma(e, t, i) {
  return function(n) {
    this.style.setProperty(e, t.call(this, n), i);
  };
}
function Na(e, t, i) {
  var n, s;
  function o() {
    var r = t.apply(this, arguments);
    return r !== s && (n = (s = r) && Ma(e, r, i)), n;
  }
  return o._value = t, o;
}
function Ta(e, t, i) {
  var n = "style." + (e += "");
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (t == null) return this.tween(n, null);
  if (typeof t != "function") throw new Error();
  return this.tween(n, Na(e, t, i ?? ""));
}
function Pa(e) {
  return function() {
    this.textContent = e;
  };
}
function Ra(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function Oa(e) {
  return this.tween("text", typeof e == "function" ? Ra(oi(this, "text", e)) : Pa(e == null ? "" : e + ""));
}
function Ua(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function Da(e) {
  var t, i;
  function n() {
    var s = e.apply(this, arguments);
    return s !== i && (t = (i = s) && Ua(s)), t;
  }
  return n._value = e, n;
}
function La(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, Da(e));
}
function za() {
  for (var e = this._name, t = this._id, i = xn(), n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, d, c = 0; c < a; ++c)
      if (d = r[c]) {
        var l = oe(d, t);
        Et(d, e, i, c, r, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new me(n, this._parents, e, i);
}
function Ha() {
  var e, t, i = this, n = i._id, s = i.size();
  return new Promise(function(o, r) {
    var a = { value: r }, d = { value: function() {
      --s === 0 && o();
    } };
    i.each(function() {
      var c = ce(this, n), l = c.on;
      l !== e && (t = (e = l).copy(), t._.cancel.push(a), t._.interrupt.push(a), t._.end.push(d)), c.on = t;
    }), s === 0 && o();
  });
}
var qa = 0;
function me(e, t, i, n) {
  this._groups = e, this._parents = t, this._name = i, this._id = n;
}
function xn() {
  return ++qa;
}
var pe = et.prototype;
me.prototype = {
  constructor: me,
  select: xa,
  selectAll: Ia,
  selectChild: pe.selectChild,
  selectChildren: pe.selectChildren,
  filter: fa,
  merge: ma,
  selection: ba,
  transition: za,
  call: pe.call,
  nodes: pe.nodes,
  node: pe.node,
  size: pe.size,
  empty: pe.empty,
  each: pe.each,
  on: va,
  attr: Qr,
  attrTween: na,
  style: Aa,
  styleTween: Ta,
  text: Oa,
  textTween: La,
  remove: ya,
  tween: Wr,
  delay: ra,
  duration: la,
  ease: ua,
  easeVarying: pa,
  end: Ha,
  [Symbol.iterator]: pe[Symbol.iterator]
};
function Va(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var Fa = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Va
};
function Ka(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function Wa(e) {
  var t, i;
  e instanceof me ? (t = e._id, e = e._name) : (t = xn(), (i = Fa).time = ni(), e = e == null ? null : e + "");
  for (var n = this._groups, s = n.length, o = 0; o < s; ++o)
    for (var r = n[o], a = r.length, d, c = 0; c < a; ++c)
      (d = r[c]) && Et(d, e, t, c, r, i || Ka(d, t));
  return new me(n, this._parents, e, t);
}
et.prototype.interrupt = Vr;
et.prototype.transition = Wa;
const rt = (e) => () => e;
function Ba(e, {
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
function fe(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
fe.prototype = {
  constructor: fe,
  scale: function(e) {
    return e === 1 ? this : new fe(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new fe(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Ve = new fe(1, 0, 0);
fe.prototype;
function Ot(e) {
  e.stopImmediatePropagation();
}
function De(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Ga(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function Ya() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Oi() {
  return this.__zoom || Ve;
}
function Xa(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function ja() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Za(e, t, i) {
  var n = e.invertX(t[0][0]) - i[0][0], s = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], r = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    s > n ? (n + s) / 2 : Math.min(0, n) || Math.max(0, s),
    r > o ? (o + r) / 2 : Math.min(0, o) || Math.max(0, r)
  );
}
function Qa() {
  var e = Ga, t = Ya, i = Za, n = Xa, s = ja, o = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], a = 250, d = Rr, c = ti("start", "zoom", "end"), l, m, g, _ = 500, b = 150, k = 0, P = 10;
  function x(u) {
    u.property("__zoom", Oi).on("wheel.zoom", p, { passive: !1 }).on("mousedown.zoom", A).on("dblclick.zoom", R).filter(s).on("touchstart.zoom", H).on("touchmove.zoom", K).on("touchend.zoom touchcancel.zoom", h).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  x.transform = function(u, w, f, v) {
    var I = u.selection ? u.selection() : u;
    I.property("__zoom", Oi), u !== I ? $(u, w, f, v) : I.interrupt().each(function() {
      E(this, arguments).event(v).start().zoom(null, typeof w == "function" ? w.apply(this, arguments) : w).end();
    });
  }, x.scaleBy = function(u, w, f, v) {
    x.scaleTo(u, function() {
      var I = this.__zoom.k, T = typeof w == "function" ? w.apply(this, arguments) : w;
      return I * T;
    }, f, v);
  }, x.scaleTo = function(u, w, f, v) {
    x.transform(u, function() {
      var I = t.apply(this, arguments), T = this.__zoom, C = f == null ? y(I) : typeof f == "function" ? f.apply(this, arguments) : f, F = T.invert(C), B = typeof w == "function" ? w.apply(this, arguments) : w;
      return i(V(U(T, B), C, F), I, r);
    }, f, v);
  }, x.translateBy = function(u, w, f, v) {
    x.transform(u, function() {
      return i(this.__zoom.translate(
        typeof w == "function" ? w.apply(this, arguments) : w,
        typeof f == "function" ? f.apply(this, arguments) : f
      ), t.apply(this, arguments), r);
    }, null, v);
  }, x.translateTo = function(u, w, f, v, I) {
    x.transform(u, function() {
      var T = t.apply(this, arguments), C = this.__zoom, F = v == null ? y(T) : typeof v == "function" ? v.apply(this, arguments) : v;
      return i(Ve.translate(F[0], F[1]).scale(C.k).translate(
        typeof w == "function" ? -w.apply(this, arguments) : -w,
        typeof f == "function" ? -f.apply(this, arguments) : -f
      ), T, r);
    }, v, I);
  };
  function U(u, w) {
    return w = Math.max(o[0], Math.min(o[1], w)), w === u.k ? u : new fe(w, u.x, u.y);
  }
  function V(u, w, f) {
    var v = w[0] - f[0] * u.k, I = w[1] - f[1] * u.k;
    return v === u.x && I === u.y ? u : new fe(u.k, v, I);
  }
  function y(u) {
    return [(+u[0][0] + +u[1][0]) / 2, (+u[0][1] + +u[1][1]) / 2];
  }
  function $(u, w, f, v) {
    u.on("start.zoom", function() {
      E(this, arguments).event(v).start();
    }).on("interrupt.zoom end.zoom", function() {
      E(this, arguments).event(v).end();
    }).tween("zoom", function() {
      var I = this, T = arguments, C = E(I, T).event(v), F = t.apply(I, T), B = f == null ? y(F) : typeof f == "function" ? f.apply(I, T) : f, re = Math.max(F[1][0] - F[0][0], F[1][1] - F[0][1]), X = I.__zoom, ie = typeof w == "function" ? w.apply(I, T) : w, ue = d(X.invert(B).concat(re / X.k), ie.invert(B).concat(re / ie.k));
      return function(ne) {
        if (ne === 1) ne = ie;
        else {
          var he = ue(ne), St = re / he[2];
          ne = new fe(St, B[0] - he[0] * St, B[1] - he[1] * St);
        }
        C.zoom(null, ne);
      };
    });
  }
  function E(u, w, f) {
    return !f && u.__zooming || new S(u, w);
  }
  function S(u, w) {
    this.that = u, this.args = w, this.active = 0, this.sourceEvent = null, this.extent = t.apply(u, w), this.taps = 0;
  }
  S.prototype = {
    event: function(u) {
      return u && (this.sourceEvent = u), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(u, w) {
      return this.mouse && u !== "mouse" && (this.mouse[1] = w.invert(this.mouse[0])), this.touch0 && u !== "touch" && (this.touch0[1] = w.invert(this.touch0[0])), this.touch1 && u !== "touch" && (this.touch1[1] = w.invert(this.touch1[0])), this.that.__zoom = w, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(u) {
      var w = ae(this.that).datum();
      c.call(
        u,
        this.that,
        new Ba(u, {
          sourceEvent: this.sourceEvent,
          target: x,
          transform: this.that.__zoom,
          dispatch: c
        }),
        w
      );
    }
  };
  function p(u, ...w) {
    if (!e.apply(this, arguments)) return;
    var f = E(this, w).event(u), v = this.__zoom, I = Math.max(o[0], Math.min(o[1], v.k * Math.pow(2, n.apply(this, arguments)))), T = ye(u);
    if (f.wheel)
      (f.mouse[0][0] !== T[0] || f.mouse[0][1] !== T[1]) && (f.mouse[1] = v.invert(f.mouse[0] = T)), clearTimeout(f.wheel);
    else {
      if (v.k === I) return;
      f.mouse = [T, v.invert(T)], ft(this), f.start();
    }
    De(u), f.wheel = setTimeout(C, b), f.zoom("mouse", i(V(U(v, I), f.mouse[0], f.mouse[1]), f.extent, r));
    function C() {
      f.wheel = null, f.end();
    }
  }
  function A(u, ...w) {
    if (g || !e.apply(this, arguments)) return;
    var f = u.currentTarget, v = E(this, w, !0).event(u), I = ae(u.view).on("mousemove.zoom", B, !0).on("mouseup.zoom", re, !0), T = ye(u, f), C = u.clientX, F = u.clientY;
    ar(u.view), Ot(u), v.mouse = [T, this.__zoom.invert(T)], ft(this), v.start();
    function B(X) {
      if (De(X), !v.moved) {
        var ie = X.clientX - C, ue = X.clientY - F;
        v.moved = ie * ie + ue * ue > k;
      }
      v.event(X).zoom("mouse", i(V(v.that.__zoom, v.mouse[0] = ye(X, f), v.mouse[1]), v.extent, r));
    }
    function re(X) {
      I.on("mousemove.zoom mouseup.zoom", null), dr(X.view, v.moved), De(X), v.event(X).end();
    }
  }
  function R(u, ...w) {
    if (e.apply(this, arguments)) {
      var f = this.__zoom, v = ye(u.changedTouches ? u.changedTouches[0] : u, this), I = f.invert(v), T = f.k * (u.shiftKey ? 0.5 : 2), C = i(V(U(f, T), v, I), t.apply(this, w), r);
      De(u), a > 0 ? ae(this).transition().duration(a).call($, C, v, u) : ae(this).call(x.transform, C, v, u);
    }
  }
  function H(u, ...w) {
    if (e.apply(this, arguments)) {
      var f = u.touches, v = f.length, I = E(this, w, u.changedTouches.length === v).event(u), T, C, F, B;
      for (Ot(u), C = 0; C < v; ++C)
        F = f[C], B = ye(F, this), B = [B, this.__zoom.invert(B), F.identifier], I.touch0 ? !I.touch1 && I.touch0[2] !== B[2] && (I.touch1 = B, I.taps = 0) : (I.touch0 = B, T = !0, I.taps = 1 + !!l);
      l && (l = clearTimeout(l)), T && (I.taps < 2 && (m = B[0], l = setTimeout(function() {
        l = null;
      }, _)), ft(this), I.start());
    }
  }
  function K(u, ...w) {
    if (this.__zooming) {
      var f = E(this, w).event(u), v = u.changedTouches, I = v.length, T, C, F, B;
      for (De(u), T = 0; T < I; ++T)
        C = v[T], F = ye(C, this), f.touch0 && f.touch0[2] === C.identifier ? f.touch0[0] = F : f.touch1 && f.touch1[2] === C.identifier && (f.touch1[0] = F);
      if (C = f.that.__zoom, f.touch1) {
        var re = f.touch0[0], X = f.touch0[1], ie = f.touch1[0], ue = f.touch1[1], ne = (ne = ie[0] - re[0]) * ne + (ne = ie[1] - re[1]) * ne, he = (he = ue[0] - X[0]) * he + (he = ue[1] - X[1]) * he;
        C = U(C, Math.sqrt(ne / he)), F = [(re[0] + ie[0]) / 2, (re[1] + ie[1]) / 2], B = [(X[0] + ue[0]) / 2, (X[1] + ue[1]) / 2];
      } else if (f.touch0) F = f.touch0[0], B = f.touch0[1];
      else return;
      f.zoom("touch", i(V(C, F, B), f.extent, r));
    }
  }
  function h(u, ...w) {
    if (this.__zooming) {
      var f = E(this, w).event(u), v = u.changedTouches, I = v.length, T, C;
      for (Ot(u), g && clearTimeout(g), g = setTimeout(function() {
        g = null;
      }, _), T = 0; T < I; ++T)
        C = v[T], f.touch0 && f.touch0[2] === C.identifier ? delete f.touch0 : f.touch1 && f.touch1[2] === C.identifier && delete f.touch1;
      if (f.touch1 && !f.touch0 && (f.touch0 = f.touch1, delete f.touch1), f.touch0) f.touch0[1] = this.__zoom.invert(f.touch0[0]);
      else if (f.end(), f.taps === 2 && (C = ye(C, this), Math.hypot(m[0] - C[0], m[1] - C[1]) < P)) {
        var F = ae(this).on("dblclick.zoom");
        F && F.apply(this, arguments);
      }
    }
  }
  return x.wheelDelta = function(u) {
    return arguments.length ? (n = typeof u == "function" ? u : rt(+u), x) : n;
  }, x.filter = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : rt(!!u), x) : e;
  }, x.touchable = function(u) {
    return arguments.length ? (s = typeof u == "function" ? u : rt(!!u), x) : s;
  }, x.extent = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : rt([[+u[0][0], +u[0][1]], [+u[1][0], +u[1][1]]]), x) : t;
  }, x.scaleExtent = function(u) {
    return arguments.length ? (o[0] = +u[0], o[1] = +u[1], x) : [o[0], o[1]];
  }, x.translateExtent = function(u) {
    return arguments.length ? (r[0][0] = +u[0][0], r[1][0] = +u[1][0], r[0][1] = +u[0][1], r[1][1] = +u[1][1], x) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, x.constrain = function(u) {
    return arguments.length ? (i = u, x) : i;
  }, x.duration = function(u) {
    return arguments.length ? (a = +u, x) : a;
  }, x.interpolate = function(u) {
    return arguments.length ? (d = u, x) : d;
  }, x.on = function() {
    var u = c.on.apply(c, arguments);
    return u === c ? x : u;
  }, x.clickDistance = function(u) {
    return arguments.length ? (k = (u = +u) * u, x) : Math.sqrt(k);
  }, x.tapDistance = function(u) {
    return arguments.length ? (P = +u, x) : P;
  }, x;
}
var Ja = Object.defineProperty, ed = Object.getOwnPropertyDescriptor, j = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? ed(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && Ja(t, i, s), s;
};
function td(e, t, i, n) {
  const s = t.x - e.x, o = t.y - e.y, r = n.x - i.x, a = n.y - i.y, d = s * a - o * r;
  if (Math.abs(d) < 1e-9) return null;
  const c = ((i.x - e.x) * a - (i.y - e.y) * r) / d, l = ((i.x - e.x) * o - (i.y - e.y) * s) / d;
  return c <= 0.02 || c >= 0.98 || l <= 0.02 || l >= 0.98 ? null : { x: e.x + c * s, y: e.y + c * o, t: c };
}
function id(e, t, i) {
  const n = i.x - t.x, s = i.y - t.y, o = n * n + s * s || 1, r = Math.max(0, Math.min(1, ((e.x - t.x) * n + (e.y - t.y) * s) / o)), a = t.x + r * n, d = t.y + r * s;
  return { dist: Math.hypot(e.x - a, e.y - d), t: r };
}
function nd(e, t, i = 7) {
  let n = `M ${e[0].x} ${e[0].y}`;
  for (let s = 0; s < e.length - 1; s++) {
    const o = e[s], r = e[s + 1], a = Math.hypot(r.x - o.x, r.y - o.y) || 1, d = (r.x - o.x) / a, c = (r.y - o.y) / a, l = t.map(([g, _]) => td(o, r, g, _)).filter((g) => g !== null).filter((g) => g.t * a > i + 2 && (1 - g.t) * a > i + 2).sort((g, _) => g.t - _.t);
    let m = -1 / 0;
    for (const g of l)
      g.t * a - i <= m + 2 || (n += ` L ${g.x - d * i} ${g.y - c * i}`, n += ` A ${i} ${i} 0 0 1 ${g.x + d * i} ${g.y + c * i}`, m = g.t * a + i);
    n += ` L ${r.x} ${r.y}`;
  }
  return n;
}
const at = {
  component: z`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: z`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: z`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: z`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: z`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: z`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  gear: z`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: z`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: z`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: z`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: z`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: z`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  undo: z`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`
};
let Y = class extends be {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Ve, this._dragPos = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onKeyUp = (e) => {
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
          if (this._selectedWaypoint) {
            const s = this.scene.edges.find((o) => o.id === this._selectedWaypoint.edgeId);
            s && (e.preventDefault(), this.removeWaypoint(s, this._selectedWaypoint.index), this._selectedWaypoint = null);
            return;
          }
          if (!this.selectedId) return;
          const t = this.scene.edges.find((s) => s.id === this.selectedId), i = this.scene.nodes.find((s) => s.id === this.selectedId);
          if (i != null && i.parentId && !t && i.kind !== "domain-event" && i.kind !== "application-event" && i.kind !== "read-model" && i.kind !== "domain-service" && i.kind !== "query-service" && i.kind !== "use-case" && i.kind !== "external-use-case")
            return;
          const n = t ?? i;
          n && (e.preventDefault(), this.emit("delete-requested", {
            elementType: t ? "edge" : "node",
            id: n.id,
            kind: n.kind
          }));
        }
      }
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.tabIndex = 0, this.addEventListener("keydown", this._onKeyDown), this.addEventListener("keyup", this._onKeyUp), this.addEventListener("blur", this._onBlur);
  }
  disconnectedCallback() {
    this.removeEventListener("keydown", this._onKeyDown), this.removeEventListener("keyup", this._onKeyUp), this.removeEventListener("blur", this._onBlur), super.disconnectedCallback();
  }
  commitRename(e, t) {
    if (this._editingId !== e.id) return;
    this._editingId = null;
    const i = t.trim();
    i && i !== e.label && this.emit("node-renamed", { id: e.id, kind: e.kind, name: i });
  }
  firstUpdated() {
    const e = this.renderRoot.querySelector("svg.main");
    this._zoomBehavior = Qa().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), ae(e).call(this._zoomBehavior);
  }
  willUpdate(e) {
    var t;
    if (e.has("scene") && (this._dragPos = null), this._selectedWaypoint && (e.has("selectedId") || e.has("edgePoints"))) {
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
  /** Center and scale the viewport so the whole scene is visible. */
  fit(e = 60) {
    const t = this.scene.nodes, i = this.renderRoot.querySelector("svg.main");
    if (!t.length || !i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect();
    if (n.width === 0 || n.height === 0) return;
    const s = Math.min(...t.map((l) => l.x - l.w / 2)) - e, o = Math.max(...t.map((l) => l.x + l.w / 2)) + e, r = Math.min(...t.map((l) => l.y - l.h / 2)) - e, a = Math.max(...t.map((l) => l.y + l.h / 2)) + e, d = Math.max(0.15, Math.min(n.width / (o - s), n.height / (a - r), 1.25)), c = Ve.translate(n.width / 2 - d * (s + o) / 2, n.height / 2 - d * (r + a) / 2).scale(d);
    ae(i).call(this._zoomBehavior.transform, c);
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
    if (this._dragPos && this._dragPos.id === e.id)
      return { x: this._dragPos.x, y: this._dragPos.y };
    if (this._resize && this._resize.id === e.id)
      return { x: this._resize.x, y: this._resize.y };
    if (e.parentId && this._dragPos && this._dragPos.id === e.parentId) {
      const t = this.scene.nodes.find((i) => i.id === e.parentId);
      if (t)
        return { x: e.x + (this._dragPos.x - t.x), y: e.y + (this._dragPos.y - t.y) };
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
        const s = this.nodePos(n), o = s.x - n.w / 2 + 10 + e.w / 2, r = s.x + n.w / 2 - 10 - e.w / 2, a = s.y - n.h / 2 + 34 + e.h / 2, d = s.y + n.h / 2 - 10 - e.h / 2;
        t = Math.min(Math.max(t, o), r), i = Math.min(Math.max(i, a), d);
      }
    }
    return { id: e.id, x: t, y: i };
  }
  onNodePointerDown(e, t) {
    if (e.button !== 0 || this._spaceDown) return;
    e.stopPropagation(), this.focus();
    const i = this.toScene(e), n = this.nodePos(t);
    let s = !1;
    const o = (a) => {
      const d = this.toScene(a), c = d.x - i.x, l = d.y - i.y;
      !s && Math.hypot(c, l) < 3 / this._t.k || (s = !0, this._dragPos = this.clampToParent(t, n.x + c, n.y + l));
    }, r = () => {
      window.removeEventListener("pointermove", o), window.removeEventListener("pointerup", r), s && this._dragPos ? this.emit("node-moved", { id: t.id, x: this._dragPos.x, y: this._dragPos.y }) : e.shiftKey ? this.emit("element-multi-toggled", { id: t.id, kind: t.kind }) : this.emit("element-selected", { elementType: "node", id: t.id, kind: t.kind });
    };
    window.addEventListener("pointermove", o), window.addEventListener("pointerup", r);
  }
  // ---- container resize ----------------------------------------------------
  /**
   * Corner-handle drag resizes a container. The dragged corner follows the
   * pointer while the opposite corner stays anchored; with Shift held the
   * resize is symmetric about the centre. Children never leave the box: they
   * keep their absolute position, so each edge stops at the outermost child.
   */
  onResizePointerDown(e, t, i, n) {
    if (e.button !== 0) return;
    e.stopPropagation(), this.focus();
    const s = 160, o = 90, r = { x: t.x, y: t.y, w: t.w, h: t.h }, a = this.scene.nodes.filter((k) => k.parentId === t.id), d = Math.min(...a.map((k) => k.x - k.w / 2)), c = Math.max(...a.map((k) => k.x + k.w / 2)), l = Math.min(...a.map((k) => k.y - k.h / 2)), m = Math.max(...a.map((k) => k.y + k.h / 2)), g = In(
      a.map((k) => ({ dx: k.x - r.x, dy: k.y - r.y, w: k.w, h: k.h })),
      { w: s, h: o }
    ), _ = (k) => {
      const P = this.toScene(k);
      if (k.shiftKey) {
        this._resize = {
          id: t.id,
          x: r.x,
          y: r.y,
          w: Math.max(g.w, 2 * Math.abs(P.x - r.x)),
          h: Math.max(g.h, 2 * Math.abs(P.y - r.y))
        };
        return;
      }
      const x = r.x - i * r.w / 2, U = r.y - n * r.h / 2, V = i > 0 ? Math.max(P.x, x + s, a.length ? c + 10 : -1 / 0) : Math.min(P.x, x - s, a.length ? d - 10 : 1 / 0), y = n > 0 ? Math.max(P.y, U + o, a.length ? m + 10 : -1 / 0) : Math.min(P.y, U - o, a.length ? l - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (x + V) / 2,
        y: (U + y) / 2,
        w: Math.abs(V - x),
        h: Math.abs(y - U)
      };
    }, b = () => {
      window.removeEventListener("pointermove", _), window.removeEventListener("pointerup", b), this._resize && this._resize.id === t.id && this.emit("node-resized", { ...this._resize }), this._resize = null;
    };
    window.addEventListener("pointermove", _), window.addEventListener("pointerup", b);
  }
  // ---- edge drawing (connect gesture) -------------------------------------
  onHandlePointerDown(e, t) {
    if (e.button !== 0) return;
    e.stopPropagation();
    const i = this.toScene(e);
    this._pendingLink = { sourceId: t.id, x: i.x, y: i.y };
    const n = (o) => {
      var c;
      const r = this.toScene(o);
      this._pendingLink = { sourceId: t.id, x: r.x, y: r.y };
      const a = (c = this.shadowRoot) == null ? void 0 : c.elementFromPoint(o.clientX, o.clientY), d = a == null ? void 0 : a.closest("[data-node-id]");
      this._hoverNodeId = d ? d.getAttribute("data-node-id") : null;
    }, s = (o) => {
      var d, c;
      window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s);
      const r = (d = this.shadowRoot) == null ? void 0 : d.elementFromPoint(o.clientX, o.clientY), a = (c = r == null ? void 0 : r.closest("[data-node-id]")) == null ? void 0 : c.getAttribute("data-node-id");
      a && a !== t.id && this.emit("connect-requested", {
        sourceId: t.id,
        targetId: a,
        x: o.clientX,
        y: o.clientY
      }), this._pendingLink = null, this._hoverNodeId = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", s);
  }
  // ---- geometry helpers ----------------------------------------------------
  /** Point on the border of `node` along the line towards (tx, ty). */
  borderPoint(e, t, i) {
    const { x: n, y: s } = this.nodePos(e), o = t - n, r = i - s, a = e.w / 2, d = e.h / 2;
    if (o === 0 && r === 0) return { x: n, y: s };
    const c = 1 / Math.max(Math.abs(o) / a, Math.abs(r) / d);
    return { x: n + o * c, y: s + r * c };
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
    const t = this.scene.nodes.find((l) => l.id === e.sourceId), i = this.scene.nodes.find((l) => l.id === e.targetId);
    if (!t || !i) return null;
    const n = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], s = this.nodePos(t), o = this.nodePos(i), r = n[0] ?? o, a = n[n.length - 1] ?? s;
    let d = this.borderPoint(t, r.x, r.y), c = this.borderPoint(i, a.x, a.y);
    if (!n.length) {
      const l = this.edgeOffset(e);
      if (l !== 0) {
        const m = Math.hypot(c.x - d.x, c.y - d.y) || 1, g = -(c.y - d.y) / m * l, _ = (c.x - d.x) / m * l;
        d = { x: d.x + g, y: d.y + _ }, c = { x: c.x + g, y: c.y + _ };
      }
    }
    return [d, ...n, c];
  }
  // ---- edge waypoints (split & adjust) -------------------------------------
  startWaypointDrag(e, t, i) {
    this._wpDrag = { edgeId: e.id, points: t, index: i };
    let n = !1;
    const s = (r) => {
      if (!this._wpDrag) return;
      n = !0;
      const a = this.toScene(r), d = [...this._wpDrag.points];
      d[this._wpDrag.index] = a, this._wpDrag = { ...this._wpDrag, points: d };
    }, o = () => {
      window.removeEventListener("pointermove", s), window.removeEventListener("pointerup", o), this._wpDrag && n && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", s), window.addEventListener("pointerup", o);
  }
  /** Index of the polyline segment nearest to point `p`. */
  nearestSegment(e, t) {
    let i = { seg: 0, dist: 1 / 0 };
    for (let n = 0; n < e.length - 1; n++) {
      const { dist: s } = id(t, e[n], e[n + 1]);
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
    if (e.button !== 0 || this.selectedId !== t.id) return;
    e.stopPropagation();
    const n = this.toScene(e), s = this.nearestSegment(i, n);
    let o = !1;
    const r = (d) => {
      const c = this.toScene(d);
      if (o) {
        if (this._wpDrag) {
          const l = [...this._wpDrag.points];
          l[s] = c, this._wpDrag = { ...this._wpDrag, points: l };
        }
      } else {
        if (Math.hypot(c.x - n.x, c.y - n.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const l = [...this.edgePoints[t.id] ?? []];
        l.splice(s, 0, c), this._selectedWaypoint = { edgeId: t.id, index: s }, this._wpDrag = { edgeId: t.id, points: l, index: s };
      }
    }, a = () => {
      window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", a), o && this._wpDrag && this.emit("edge-points-changed", { id: this._wpDrag.edgeId, points: this._wpDrag.points }), this._wpDrag = null;
    };
    window.addEventListener("pointermove", r), window.addEventListener("pointerup", a);
  }
  removeWaypoint(e, t) {
    const i = [...this.edgePoints[e.id] ?? []];
    i.splice(t, 1), this.emit("edge-points-changed", { id: e.id, points: i });
  }
  renderEdge(e, t, i) {
    const n = e.color ?? "#64748b", s = this.selectedId === e.id, o = s || this.selectedIds.includes(e.sourceId) && this.selectedIds.includes(e.targetId), r = Math.floor((t.length - 1) / 2), a = {
      x: (t[r].x + t[r + 1].x) / 2,
      y: (t[r].y + t[r + 1].y) / 2
    }, d = t.slice(1, -1), c = t.map((l) => `${l.x},${l.y}`).join(" ");
    return z`
      <g data-edge-id=${e.id}>
        <polyline class="edge-hit" points=${c}
              fill="none" stroke="transparent" stroke-width="14"
              @click=${(l) => {
      l.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
              @dblclick=${(l) => {
      l.stopPropagation(), this.focus(), this.addWaypointAt(e, t, this.toScene(l));
    }}
              @pointerdown=${(l) => this.onEdgeHitPointerDown(l, e, t)}>
          ${e.tooltip ? z`<title>${e.tooltip}</title>` : ""}
        </polyline>
        <path d=${nd(t, i)}
              fill="none"
              stroke=${n} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(n)})` : ""}
              pointer-events="none"></path>
        ${e.label ? z`<text x=${a.x} y=${a.y - 6} text-anchor="middle" style="cursor: pointer"
                  font-size="11" font-family="ui-sans-serif, system-ui" fill=${n}
                  paint-order="stroke" stroke="var(--modux-canvas-bg, #fafafa)" stroke-width="3"
                  @click=${(l) => {
      l.stopPropagation(), this.focus(), this.emit("element-selected", { elementType: "edge", id: e.id, kind: e.kind });
    }}
                  @dblclick=${(l) => {
      l.stopPropagation(), this.emit("element-activated", {
        elementType: "edge",
        id: e.id,
        kind: e.kind,
        x: l.clientX,
        y: l.clientY
      });
    }}>
                  ${e.label}
                </text>` : ""}
        ${s ? d.map((l, m) => {
      var _;
      const g = ((_ = this._selectedWaypoint) == null ? void 0 : _.edgeId) === e.id && this._selectedWaypoint.index === m;
      return z`
                <circle data-waypoint cx=${l.x} cy=${l.y} r=${g ? 6 : 5}
                        fill=${g ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" style="cursor: move"
                        @pointerdown=${(b) => {
        b.button === 0 && (b.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: m }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], m));
      }}
                        @dblclick=${(b) => {
        b.stopPropagation(), this.removeWaypoint(e, m);
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
    var g, _;
    const { x: t, y: i } = this.nodePos(e), n = this.selectedId === e.id || this.selectedIds.includes(e.id), s = this._hoverNodeId === e.id, o = !!e.container, r = !!e.parentId, a = ((g = this._resize) == null ? void 0 : g.id) === e.id ? this._resize.w : e.w, d = ((_ = this._resize) == null ? void 0 : _.id) === e.id ? this._resize.h : e.h, c = a / 2, l = d / 2, m = r && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return z`
      <g data-node-id=${e.id} transform="translate(${t}, ${i})"
         @pointerdown=${(b) => this.onNodePointerDown(b, e)}
         @dblclick=${(b) => {
      b.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? z`<rect x=${-c - 4} y=${-l - 4} width=${a + 8} height=${d + 8}
                  rx=${r ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-c} y=${-l} width=${a} height=${d} rx=${r ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${s || n ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${n || s ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? z`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? z`<text x=${-c} y=${-l - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.symbol && at[e.symbol] && !r ? z`<g transform="translate(${c - 17}, ${-l + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${at[e.symbol]}
              </g>` : ""}
        ${r && e.symbol && at[e.symbol] ? z`<g transform="translate(${-c + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${at[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? z`
              <foreignObject x=${-c + 6} y=${o ? -l + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(b) => b.stopPropagation()}
                  @keydown=${(b) => {
      b.stopPropagation(), b.key === "Enter" && this.commitRename(e, b.target.value), b.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(b) => this.commitRename(e, b.target.value)}
                />
              </foreignObject>` : r ? z`<text x=${-c + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${m}</text>` : o ? z`<text x=${-c + 12} y=${-l + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : z`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? z`<line x1=${-c + 8} y1=${-l + 28} x2=${c - 8} y2=${-l + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${n && this.connectable && (r ? e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" : e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "workflow-step") ? [
      [c, 0],
      [-c, 0],
      [0, l],
      [0, -l]
    ].map(
      ([b, k]) => z`
                <circle data-handle cx=${b} cy=${k} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(P) => this.onHandlePointerDown(P, e)}>
                  <title>${r ? e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta un caso de uso, una operación externa o un RAG: el agente lo usará" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${o && n ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([b, k]) => z`
                <rect data-resize x=${b * c - 6.5} y=${k * l - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${b * k > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(P) => this.onResizePointerDown(P, e, b, k)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return z``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return z``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return z`
      <line x1=${t.x} y1=${t.y} x2=${this._pendingLink.x} y2=${this._pendingLink.y}
            stroke="#2563eb" stroke-width="2" stroke-dasharray="4 4" pointer-events="none"></line>
    `;
  }
  // ---- rubber-band multi-selection ------------------------------------------
  startRubberBand(e) {
    const t = this.toScene(e);
    this._rubber = { a: t, b: t };
    let i = !1;
    const n = (o) => {
      const r = this.toScene(o);
      !i && Math.hypot(r.x - t.x, r.y - t.y) < 4 / this._t.k || (i = !0, this._rubber = { a: t, b: r });
    }, s = () => {
      if (window.removeEventListener("pointermove", n), window.removeEventListener("pointerup", s), i && this._rubber) {
        const { a: o, b: r } = this._rubber, a = Math.min(o.x, r.x), d = Math.max(o.x, r.x), c = Math.min(o.y, r.y), l = Math.max(o.y, r.y), m = this.scene.nodes.filter((g) => {
          const _ = this.nodePos(g);
          return _.x >= a && _.x <= d && _.y >= c && _.y <= l;
        }).map((g) => g.id);
        this.emit("nodes-boxed", { ids: m });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", s);
  }
  renderRubber() {
    if (!this._rubber) return z``;
    const { a: e, b: t } = this._rubber;
    return z`
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
    const i = Math.min(...t.map((r) => r.x - r.w / 2)) - e, n = Math.max(...t.map((r) => r.x + r.w / 2)) + e, s = Math.min(...t.map((r) => r.y - r.h / 2)) - e, o = Math.max(...t.map((r) => r.y + r.h / 2)) + e;
    return { minX: i, minY: s, w: n - i, h: o - s };
  }
  centerViewportOn(e, t) {
    const i = this.renderRoot.querySelector("svg.main");
    if (!i || !this._zoomBehavior) return;
    const n = this.getBoundingClientRect(), s = this._t.k, o = Ve.translate(n.width / 2 - s * e, n.height / 2 - s * t).scale(s);
    ae(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const n = e.currentTarget.getBoundingClientRect(), s = t.minX + (e.clientX - n.left) / i, o = t.minY + (e.clientY - n.top) / i;
    this.centerViewportOn(s, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return M``;
    const t = 160, i = 110, n = Math.min(t / e.w, i / e.h), s = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, r = (0 - this._t.y) / this._t.k, a = s.width / this._t.k, d = s.height / this._t.k;
    return M`
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
      var l, m;
      (m = (l = c.currentTarget).hasPointerCapture) != null && m.call(l, c.pointerId) && this.onMinimapPointer(c, e, n);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((c) => {
      const l = this.nodePos(c);
      return z`<rect
              x=${(l.x - c.w / 2 - e.minX) * n}
              y=${(l.y - c.h / 2 - e.minY) * n}
              width=${Math.max(2, c.w * n)}
              height=${Math.max(2, c.h * n)}
              rx="1" fill=${c.fill ?? "#e2e8f0"} stroke="#94a3b8" stroke-width="0.4"></rect>`;
    })}
          <rect
            x=${(o - e.minX) * n}
            y=${(r - e.minY) * n}
            width=${a * n}
            height=${d * n}
            fill="rgba(37, 99, 235, 0.08)" stroke="#2563eb" stroke-width="1"></rect>
        </svg>
      </div>
    `;
  }
  render() {
    const e = [...new Set(this.scene.edges.map((r) => r.color ?? "#64748b"))], t = [], i = this.scene.edges.map((r) => {
      const a = this.edgePolyline(r);
      if (!a) return z``;
      const d = this.renderEdge(r, a, [...t]);
      for (let c = 0; c < a.length - 1; c++) t.push([a[c], a[c + 1]]);
      return d;
    }), n = new Set(this.scene.nodes.filter((r) => r.parentId).map((r) => r.id)), s = [], o = [];
    return this.scene.edges.forEach((r, a) => {
      (n.has(r.sourceId) || n.has(r.targetId) ? o : s).push(
        i[a]
      );
    }), M`
      <svg
        class="main ${this._pendingLink ? "linking" : ""} ${this._spaceDown ? "panning" : ""}"
        @pointerdown=${(r) => {
      const a = r.target;
      a.closest("[data-node-id]") || a.closest("[data-edge-id]") || this._spaceDown || r.button !== 0 || this.startRubberBand(r);
    }}
      >
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e2e8f0"></circle>
          </pattern>
          ${e.map(
      (r) => z`
              <marker id="arrow-${this.markerId(r)}" viewBox="0 0 10 10" refX="9" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill=${r}></path>
              </marker>`
    )}
        </defs>
        <g transform="translate(${this._t.x}, ${this._t.y}) scale(${this._t.k})">
          <rect x="-100000" y="-100000" width="200000" height="200000" fill="url(#dots)"
                pointer-events="none"></rect>
          ${s}
          ${this.scene.nodes.filter((r) => !r.parentId).map((r) => this.renderNode(r))}
          ${o}
          ${this.scene.nodes.filter((r) => r.parentId).map((r) => this.renderNode(r))}
          ${this.renderPendingLink()}
          ${this.renderRubber()}
        </g>
      </svg>
      ${this.renderMinimap()}
    `;
  }
};
Y.styles = Xt`
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
j([
  le({ attribute: !1 })
], Y.prototype, "scene", 2);
j([
  le({ attribute: !1 })
], Y.prototype, "selectedId", 2);
j([
  le({ attribute: !1 })
], Y.prototype, "selectedIds", 2);
j([
  le({ type: Boolean })
], Y.prototype, "connectable", 2);
j([
  le({ attribute: !1 })
], Y.prototype, "edgePoints", 2);
j([
  N()
], Y.prototype, "_t", 2);
j([
  N()
], Y.prototype, "_dragPos", 2);
j([
  N()
], Y.prototype, "_pendingLink", 2);
j([
  N()
], Y.prototype, "_hoverNodeId", 2);
j([
  N()
], Y.prototype, "_editingId", 2);
j([
  N()
], Y.prototype, "_spaceDown", 2);
j([
  N()
], Y.prototype, "_wpDrag", 2);
j([
  N()
], Y.prototype, "_selectedWaypoint", 2);
j([
  N()
], Y.prototype, "_resize", 2);
j([
  N()
], Y.prototype, "_rubber", 2);
Y = j([
  Qt("modux-canvas")
], Y);
const O = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function ee(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function W(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const Ce = (e) => e.trim().toLowerCase();
function sd(e, t) {
  var A, R, H, K;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, n = new Map(e.modules.map((h) => [h.id, h.name])), s = e.modules.flatMap(
    (h) => (h.useCases ?? []).map((u) => ({ ...u, moduleId: h.id }))
  ), o = new Set(s.map((h) => h.id)), r = e.aggregates ?? [], a = new Set(
    e.modules.flatMap((h) => (h.domainServices ?? []).map((u) => u.id))
  ), d = e.modules.flatMap(
    (h) => (h.domainEvents ?? []).map((u) => ({ ...u, moduleId: h.id, application: !1 }))
  ), c = e.modules.flatMap(
    (h) => (h.applicationEvents ?? []).map((u) => ({ ...u, moduleId: h.id, application: !0 }))
  ), l = e.modules.flatMap(
    (h) => (h.readModels ?? []).map((u) => ({ ...u, moduleId: h.id }))
  );
  for (const h of s)
    ee(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: O.command.w,
      h: O.command.h,
      kind: "use-case",
      symbol: h.policy ? "flow" : "gear",
      fill: h.policy ? O.policy.fill : O.command.fill,
      stroke: h.policy ? O.policy.stroke : O.command.stroke,
      badge: h.policy ? "POLICY" : "COMANDO",
      tooltip: h.policy ? `${h.name} — policy de ${n.get(h.moduleId) ?? h.moduleId} (reacción, no caso de negocio)` : `${h.name} — caso de uso de ${n.get(h.moduleId) ?? h.moduleId}`
    });
  for (const h of r)
    ee(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: O.aggregate.w,
      h: O.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: O.aggregate.fill,
      stroke: O.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${h.name} — agregado de ${n.get(h.moduleId) ?? h.moduleId}`
    });
  const m = /* @__PURE__ */ new Map();
  for (const h of [...d, ...c])
    ee(i, {
      id: h.id,
      label: h.name,
      x: 0,
      y: 0,
      w: O.event.w,
      h: O.event.h,
      kind: h.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: O.event.fill,
      stroke: O.event.stroke,
      badge: h.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${h.name} — evento de ${n.get(h.moduleId) ?? h.moduleId}`
    }), m.set(Ce(h.name), h.id);
  const g = (h) => {
    if (!h || !h.trim()) return null;
    const u = m.get(Ce(h));
    if (u) return u;
    const w = `evname:${Ce(h)}`;
    return ee(i, {
      id: w,
      label: h,
      x: 0,
      y: 0,
      w: O.event.w,
      h: O.event.h,
      kind: "event-name",
      symbol: "event",
      fill: O.event.fill,
      stroke: O.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${h} — referenciado por nombre, sin evento declarado en el catálogo`
    }), w;
  }, _ = (h) => {
    const u = l.find((f) => f.id === h.id) ?? l.find((f) => h.name && Ce(f.name) === Ce(h.name)), w = (u == null ? void 0 : u.id) ?? (h.id || (h.name ? `rm:${Ce(h.name)}` : null));
    return w ? (ee(i, {
      id: w,
      label: (u == null ? void 0 : u.name) ?? h.name ?? w,
      x: 0,
      y: 0,
      w: O.readModel.w,
      h: O.readModel.h,
      kind: u ? "read-model" : "derived-read-model",
      fill: O.readModel.fill,
      stroke: O.readModel.stroke,
      dashed: !u,
      badge: "READ MODEL"
    }), w) : null;
  };
  for (const h of e.actorUses ?? []) {
    if (!o.has(h.targetId)) continue;
    const u = (e.actors ?? []).find((w) => w.id === h.actorId);
    u && (ee(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: O.actor.w,
      h: O.actor.h,
      kind: "actor",
      symbol: "person",
      fill: O.actor.fill,
      stroke: O.actor.stroke,
      badge: "ACTOR"
    }), W(i, {
      id: `es-actor:${u.id}->${h.targetId}`,
      sourceId: u.id,
      targetId: h.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const h of e.aiAgents ?? []) {
    const u = (e.agentUses ?? []).filter((v) => v.agentId === h.id), w = (e.agentExternalUses ?? []).filter((v) => v.agentId === h.id), f = (e.agentRags ?? []).filter((v) => v.agentId === h.id);
    if (!(!u.length && !w.length && !f.length)) {
      ee(i, {
        id: h.id,
        label: h.name,
        x: 0,
        y: 0,
        w: O.actor.w,
        h: O.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${h.name} — agente de IA (consume por MCP)`
      });
      for (const v of u)
        o.has(v.useCaseId) && W(i, {
          id: `es-agent:${h.id}->${v.useCaseId}`,
          sourceId: h.id,
          targetId: v.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const v of w) {
        const I = e.externalSystems.find(
          (C) => (C.useCases ?? []).some((F) => F.id === v.externalUseCaseId)
        );
        if (!I) continue;
        const T = (A = (I.useCases ?? []).find((C) => C.id === v.externalUseCaseId)) == null ? void 0 : A.name;
        ee(i, {
          id: I.id,
          label: I.name,
          x: 0,
          y: 0,
          w: O.external.w,
          h: O.external.h,
          kind: "external-system",
          symbol: "component",
          fill: O.external.fill,
          stroke: O.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), W(i, {
          id: `es-agentx:${h.id}->${v.externalUseCaseId}`,
          sourceId: h.id,
          targetId: I.id,
          kind: "es-agent-external",
          label: T,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: T ? `Llama a ${T} del sistema externo` : void 0
        });
      }
      for (const v of f) {
        const I = (e.rags ?? []).find((T) => T.id === v.ragId);
        if (I) {
          ee(i, {
            id: I.id,
            label: I.name,
            x: 0,
            y: 0,
            w: O.readModel.w,
            h: O.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${I.name} — base de conocimiento (retrieval)`
          }), W(i, {
            id: `es-agrag:${h.id}->${I.id}`,
            sourceId: h.id,
            targetId: I.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const T of I.sourceReadModelIds ?? []) {
            const C = _({ id: T });
            C && W(i, {
              id: `es-ragsrc:${I.id}->${C}`,
              sourceId: C,
              targetId: I.id,
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
  const b = (h) => {
    const u = e.externalSystems.find((w) => w.id === h);
    return u ? (ee(i, {
      id: u.id,
      label: u.name,
      x: 0,
      y: 0,
      w: O.external.w,
      h: O.external.h,
      kind: "external-system",
      symbol: "component",
      fill: O.external.fill,
      stroke: O.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), u.id) : null;
  };
  for (const h of e.externalCalls ?? []) {
    const u = b(h.externalSystemId);
    !u || !o.has(h.useCaseId) || W(i, {
      id: `es-extin:${u}->${h.useCaseId}`,
      sourceId: u,
      targetId: h.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const h of e.externalUseCaseCalls ?? []) {
    if (!o.has(h.sourceId)) continue;
    const u = e.externalSystems.find(
      (v) => (v.useCases ?? []).some((I) => I.id === h.targetId)
    ), w = u ? b(u.id) : null;
    if (!w) continue;
    const f = (R = ((u == null ? void 0 : u.useCases) ?? []).find((v) => v.id === h.targetId)) == null ? void 0 : R.name;
    W(i, {
      id: `es-extout:${h.sourceId}->${h.targetId}`,
      sourceId: h.sourceId,
      targetId: w,
      kind: "es-command-external",
      label: f,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: f ? `Llama a ${f} del sistema externo` : void 0
    });
  }
  for (const h of e.aggregateCalls ?? [])
    !o.has(h.sourceId) || !i.nodes.has(h.targetId) || W(i, {
      id: `es-write:${h.sourceId}->${h.targetId}`,
      sourceId: h.sourceId,
      targetId: h.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const k = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const h of k)
    !i.nodes.has(h.domainEventId) || !(i.nodes.has(h.sourceId) && (o.has(h.sourceId) || r.some((w) => w.id === h.sourceId) || a.has(h.sourceId))) || W(i, {
      id: `es-emit:${h.sourceId}->${h.domainEventId}`,
      sourceId: h.sourceId,
      targetId: h.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const P = (h, u, w, f, v, I) => (ee(i, {
    id: h,
    label: u,
    x: 0,
    y: 0,
    w: O.policy.w,
    h: O.policy.h,
    kind: w,
    symbol: "flow",
    fill: O.policy.fill,
    stroke: O.policy.stroke,
    badge: f,
    tooltip: v
  }), h), x = (h, u) => {
    const w = g(h);
    w && W(i, {
      id: `es-trigger:${w}->${u}`,
      sourceId: w,
      targetId: u,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, U = (h, u) => {
    !u || !o.has(u) || W(i, {
      id: `es-invoke:${h}->${u}`,
      sourceId: h,
      targetId: u,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const h of e.subscriptions ?? []) {
    const u = P(
      h.id,
      h.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${h.name}${h.eventName ? ` — reacciona a ${h.eventName}` : ""}${h.consumerGroup ? ` · grupo ${h.consumerGroup}` : ""}`
    );
    x(h.eventName, u);
    for (const w of h.actions ?? []) {
      if (w.type === "CallUseCase" && U(u, w.useCaseId), w.type === "StartSaga" && w.sagaId) {
        const f = `saga:${w.sagaId}`;
        P(f, w.sagaId, "saga", "SAGA"), W(i, {
          id: `es-saga:${u}->${f}`,
          sourceId: u,
          targetId: f,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (w.type === "UpdateProjection" && w.projectionId) {
        const f = (e.projections ?? []).find((v) => v.id === w.projectionId);
        f && W(i, {
          id: `es-feeds:${u}->${f.id}`,
          sourceId: u,
          targetId: f.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const h of e.projections ?? []) {
    const u = P(
      h.id,
      h.name,
      "projection",
      "PROYECCIÓN",
      `${h.name}${h.readModelName ? ` — materializa ${h.readModelName}` : ""}`
    );
    for (const v of h.handledEventIds) {
      const I = i.nodes.has(v) ? v : null;
      I && W(i, {
        id: `es-trigger:${I}->${u}`,
        sourceId: I,
        targetId: u,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    h.sourceAggregateId && i.nodes.has(h.sourceAggregateId) && W(i, {
      id: `es-state:${h.id}`,
      sourceId: h.sourceAggregateId,
      targetId: u,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const w = h.sourceExternalUseCaseId ?? h.sourceExternalTableId;
    if (w) {
      const v = e.externalSystems.find(
        (T) => (T.useCases ?? []).some((C) => C.id === w) || (T.tables ?? []).some((C) => C.id === w)
      ), I = v ? b(v.id) : null;
      if (I) {
        const T = ((H = (v.useCases ?? []).find((C) => C.id === w)) == null ? void 0 : H.name) ?? ((K = (v.tables ?? []).find((C) => C.id === w)) == null ? void 0 : K.name);
        W(i, {
          id: `es-poll:${h.id}`,
          sourceId: I,
          targetId: u,
          kind: "es-projects-poll",
          label: T,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: T ? `polling de ${T}` : "polling"
        });
      }
    }
    const f = _({ id: h.readModelId, name: h.readModelName });
    f && W(i, {
      id: `es-projects:${u}->${f}`,
      sourceId: u,
      targetId: f,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const h of e.flows) {
    if (h.archetype === "MATERIALIZES") {
      const w = g(h.triggerEvent), f = _({ name: h.readModelName ?? `${h.triggerEvent}View` });
      w && f && W(i, {
        id: `es-mat:${h.id}`,
        sourceId: w,
        targetId: f,
        kind: "es-materializes",
        label: h.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${h.name} [MATERIALIZES]`
      });
      continue;
    }
    const u = P(
      `flow:${h.id}`,
      h.name,
      "flow",
      `POLICY · ${h.archetype}`,
      `Flow ${h.name} [${h.archetype}]`
    );
    if (x(h.triggerEvent, u), U(u, h.targetUseCaseId), !h.targetUseCaseId) {
      const w = b(h.targetId), f = w ?? `tgt:${h.targetId}`;
      !w && n.has(h.targetId) && ee(i, {
        id: f,
        label: n.get(h.targetId) ?? h.targetId,
        x: 0,
        y: 0,
        w: O.module.w,
        h: O.module.h,
        kind: "module",
        symbol: "component",
        fill: O.module.fill,
        stroke: O.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(f) && W(i, {
        id: `es-deliver:${h.id}`,
        sourceId: u,
        targetId: f,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const h of e.processes ?? []) {
    const u = P(
      h.id,
      h.name,
      "process",
      `PROCESO${h.sla ? ` · SLA ${h.sla}` : ""}`,
      `${h.name}${h.triggerEvent ? ` — arranca con ${h.triggerEvent}` : ""}`
    );
    x(h.triggerEvent, u);
    for (const f of h.steps) U(u, f.useCaseId);
    const w = g(h.onCompletionEventName);
    w && W(i, {
      id: `es-done:${h.id}`,
      sourceId: u,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const h of e.workflows ?? []) {
    const u = P(
      h.id,
      h.name,
      "workflow",
      "WORKFLOW",
      `${h.name}${h.triggerEvent ? ` — arranca con ${h.triggerEvent}` : ""}`
    );
    x(h.triggerEvent, u);
    for (const f of h.steps ?? []) {
      U(u, f.targetUseCaseId);
      for (const v of [f.emittedEventName, f.completionEventName]) {
        const I = g(v);
        I && W(i, {
          id: `es-wfemit:${h.id}:${I}`,
          sourceId: u,
          targetId: I,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const w = g(h.onCompletionEventName);
    w && W(i, {
      id: `es-done:${h.id}`,
      sourceId: u,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const V = [...i.nodes.values()], y = /* @__PURE__ */ new Map();
  for (const h of i.edges)
    y.has(h.targetId) || y.set(h.targetId, []), y.get(h.targetId).push(h.sourceId);
  const $ = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Set(), S = (h) => {
    const u = $.get(h);
    if (u !== void 0) return u;
    if (E.has(h)) return 0;
    E.add(h);
    const w = y.get(h) ?? [], f = w.length ? 1 + Math.max(...w.map(S)) : 0;
    return E.delete(h), $.set(h, f), f;
  }, p = /* @__PURE__ */ new Map();
  for (const h of V) {
    const u = t[h.id];
    if (u) {
      h.x = u.x, h.y = u.y;
      continue;
    }
    const w = S(h.id), f = p.get(w) ?? 0;
    p.set(w, f + 1), h.x = 140 + w * 260, h.y = 110 + f * 110;
  }
  return { nodes: V, edges: i.edges };
}
const od = 190, rd = 56, Ui = 180, ad = 56, dd = 150, ld = 44, Di = 250, Li = 100;
function cd(e, t) {
  const i = /* @__PURE__ */ new Set(), n = (s) => {
    if (i.has(s.id)) return 0;
    i.add(s.id);
    const o = (s.dependsOnStepIds ?? []).map((a) => t.get(a)).filter(Boolean), r = o.length ? 1 + Math.max(...o.map(n)) : 0;
    return i.delete(s.id), r;
  };
  return n(e);
}
function ud(e, t) {
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
function hd(e, t) {
  const i = [], n = [], s = /* @__PURE__ */ new Set(), o = (a) => {
    var d;
    return (d = e.modules.flatMap((c) => c.useCases ?? []).find((c) => c.id === a)) == null ? void 0 : d.name;
  };
  let r = 140;
  return (e.workflows ?? []).forEach((a) => {
    var P;
    const d = new Map(a.steps.map((x) => [x.id, x])), c = new Map(a.steps.map((x) => [x.id, cd(x, d)])), l = /* @__PURE__ */ new Map();
    for (const x of a.steps) {
      const U = c.get(x.id) ?? 0;
      l.set(U, (l.get(U) ?? 0) + 1);
    }
    const m = Math.max(1, ...l.values()), g = ud(e, a);
    if (g && !s.has(g.id)) {
      s.add(g.id);
      const x = t[g.id] ?? { x: 140, y: r };
      i.push({
        id: g.id,
        label: g.label,
        x: x.x,
        y: x.y,
        w: dd,
        h: ld,
        kind: g.kind,
        symbol: g.symbol,
        fill: "#ffffff",
        stroke: "#64748b",
        badge: g.kind === "aggregate" ? "AGGREGATE" : g.kind === "domain-service" ? "DOMAIN SERVICE" : "USE CASE"
      });
    }
    const _ = t[a.id] ?? { x: 420, y: r };
    i.push({
      id: a.id,
      label: a.name,
      x: _.x,
      y: _.y,
      w: od,
      h: rd,
      kind: "workflow",
      symbol: "process",
      fill: "#ede9fe",
      stroke: "#6d28d9",
      badge: "WORKFLOW",
      tooltip: `${a.name}${a.triggerEvent ? ` — arranca con ${a.triggerEvent}` : ""}${a.onCompletionEventName ? ` · emite ${a.onCompletionEventName} al completar` : ""}`
    }), g && n.push({
      id: `wft:${a.id}`,
      sourceId: g.id,
      targetId: a.id,
      kind: "workflow-trigger",
      label: a.triggerEvent,
      color: "#94a3b8",
      dashed: !0,
      arrow: !0,
      tooltip: a.triggerEvent ? `Evento: ${a.triggerEvent}` : void 0
    });
    const b = /* @__PURE__ */ new Map();
    let k = 0;
    for (const x of a.steps) {
      const U = c.get(x.id) ?? 0;
      k = Math.max(k, U);
      const V = b.get(U) ?? 0;
      b.set(U, V + 1);
      const y = t[x.id] ?? {
        x: _.x + (U + 1) * Di,
        y: r + (V - (l.get(U) - 1) / 2) * Li
      }, $ = o(x.targetUseCaseId);
      i.push({
        id: x.id,
        label: x.name,
        x: y.x,
        y: y.y,
        w: Ui,
        h: ad,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: $ ? `→ ${$}` : "∅ sin use case",
        tooltip: `${x.name}${x.emittedEventName ? ` · emite ${x.emittedEventName}` : ""}${$ ? ` · lanza ${$}` : ""}${x.completionEventName ? ` · espera ${x.completionEventName}` : ""}`
      });
      const E = (x.dependsOnStepIds ?? []).filter((S) => d.has(S));
      E.length === 0 && n.push({
        id: `wfs:${a.id}:${x.id}`,
        sourceId: a.id,
        targetId: x.id,
        kind: "workflow-start",
        label: x.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const S of E)
        n.push({
          id: `wfdep:${S}->${x.id}`,
          sourceId: S,
          targetId: x.id,
          kind: "workflow-dependency",
          label: x.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${x.name} espera a ${((P = d.get(S)) == null ? void 0 : P.name) ?? S}`
        });
    }
    if (a.onCompletionEventName) {
      const x = `done:${a.id}`, U = t[x] ?? { x: _.x + (k + 2) * Di, y: r };
      i.push({
        id: x,
        label: a.onCompletionEventName,
        x: U.x,
        y: U.y,
        w: Ui,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const V = new Set(a.steps.flatMap(($) => $.dependsOnStepIds ?? [])), y = a.steps.filter(($) => !V.has($.id));
      for (const $ of y.length ? y : [])
        n.push({
          id: `wfd:${a.id}:${$.id}`,
          sourceId: $.id,
          targetId: x,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      a.steps.length || n.push({
        id: `wfd:${a.id}`,
        sourceId: a.id,
        targetId: x,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    r += Math.max(2, m + 1) * Li + 60;
  }), { nodes: i, edges: n };
}
async function pd(e, t) {
  const { default: i } = await import("./elk.bundled-94VUq91b.js").then((d) => d.e), n = new i(), o = {
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
    children: e.nodes.map((d) => ({ id: d.id, width: d.w, height: d.h })),
    edges: e.edges.map((d) => ({ id: d.id, sources: [d.sourceId], targets: [d.targetId] }))
  }, r = await n.layout(o), a = {};
  for (const d of r.children ?? [])
    a[d.id] = {
      x: (d.x ?? 0) + (d.width ?? 0) / 2,
      y: (d.y ?? 0) + (d.height ?? 0) / 2
    };
  return a;
}
var fd = Object.defineProperty, md = Object.getOwnPropertyDescriptor, L = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? md(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && fd(t, i, s), s;
};
const Bt = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, gd = Object.keys(Bt), wd = [
  { id: "context-map", label: "Context map", ready: !0 },
  { id: "aggregates", label: "Agregados", ready: !0 },
  { id: "flows", label: "Flows", ready: !0 },
  { id: "processes", label: "Procesos", ready: !0 },
  { id: "workflows", label: "Workflows", ready: !0 },
  { id: "eventstorming", label: "EventStorming", ready: !0 }
], vd = ["CORE", "SUPPORTING", "GENERIC"], q = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function _d(e, t) {
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
    default:
      return null;
  }
}
function yd(e, t) {
  const i = (e ?? []).find((n) => n.steps.some((s) => s.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let D = class extends be {
  constructor() {
    super(...arguments), this.model = {
      modules: [],
      externalSystems: [],
      relations: [],
      flows: []
    }, this.layout = {}, this.diff = null, this._view = "context-map", this._detail = "contexts", this._relationType = "CUSTOMER_SUPPLIER", this._relationPicker = null, this._selectedId = null, this._newName = "", this._newSubdomain = "SUPPORTING", this._newModuleId = "", this._newContextMapKind = "module", this._newAggregateId = "", this._newExternalId = "", this._newApiId = "", this._newArchetype = "TRIGGERS", this._newTriggerAggId = "", this._newTriggerEvent = "", this._newTargetId = "", this._undoStack = [], this._redoStack = [], this._newStepName = "", this._newStepType = "AUTOMATED", this._newStepRole = "", this._newStepDeadline = "", this._editStepRole = "", this._editStepDeadline = "", this._editStepComp = "", this._newStepUseCase = "", this._newStepEmits = "", this._editStepUseCase = "", this._editStepEmits = "", this._editStepAwaits = "", this._multi = [], this._newViewName = "", this._activeViewId = "", this._newRagSourceType = "WEB", this._newRagSourceUri = "", this._addMemberKey = "", this._deletePicker = null;
  }
  emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  command(e, t = !0) {
    if (t) {
      const i = this.inverseOf(e);
      i && this.pushUndoEntry(i);
    }
    this.emit("modux-command", { command: e });
  }
  viewLayout(e) {
    return bn(this.layout[e]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [e]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = this.viewLayout("context-map").detail;
      (t === "contexts" || t === "detail") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    this._detail = e, e !== "detail" && this._newContextMapKind !== "module" && this._newContextMapKind !== "external-system" && this._newContextMapKind !== "actor" && this._newContextMapKind !== "ai-agent" && this._newContextMapKind !== "rag" && this._newContextMapKind !== "api" && (this._newContextMapKind = "module"), this.writeViewLayout("context-map", { ...this.viewLayout("context-map"), detail: e });
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
    var t, i, n, s;
    switch (e.kind) {
      case "add-relation":
        return [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-relation": {
        const o = this.model.relations.find(
          (r) => r.sourceId === e.sourceId && r.targetId === e.targetId
        );
        return o && o.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: o.type }] : null;
      }
      case "set-relation-type": {
        const o = this.model.relations.find(
          (r) => r.sourceId === e.sourceId && r.targetId === e.targetId
        );
        return o && o.type ? [{ kind: "set-relation-type", sourceId: e.sourceId, targetId: e.targetId, type: o.type }] : [{ kind: "remove-relation", sourceId: e.sourceId, targetId: e.targetId }];
      }
      case "add-module":
        return [{ kind: "remove-module", id: e.id }];
      case "remove-module": {
        const o = this.model.modules.find((a) => a.id === e.id);
        if (!o) return null;
        const r = this.model.relations.filter(
          (a) => (a.sourceId === e.id || a.targetId === e.id) && a.type != null
        );
        return [
          { kind: "add-module", id: o.id, name: o.name, subdomainType: o.subdomainType ?? "GENERIC" },
          // Re-annotate the derived pairs this module participated in.
          ...r.map(
            (a) => ({
              kind: "set-relation-type",
              sourceId: a.sourceId,
              targetId: a.targetId,
              type: a.type
            })
          )
        ];
      }
      case "add-aggregate":
        return [{ kind: "remove-aggregate", id: e.id }];
      case "remove-aggregate": {
        const o = (this.model.aggregates ?? []).find((r) => r.id === e.id);
        return o ? [{ kind: "add-aggregate", id: o.id, name: o.name, moduleId: o.moduleId }] : null;
      }
      case "add-domain-event":
        return [{ kind: "remove-domain-event", id: e.id }];
      case "add-query-service":
        return [{ kind: "remove-query-service", id: e.id }];
      case "remove-query-service": {
        for (const o of this.model.modules) {
          const r = (o.queryServices ?? []).find((a) => a.id === e.id);
          if (r) return [{ kind: "add-query-service", id: r.id, name: r.name, moduleId: o.id }];
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
      case "add-actor-crud":
        return [{ kind: "remove-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-actor-crud":
        return [{ kind: "add-actor-crud", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-use-case":
        return [{ kind: "remove-use-case", id: e.id }];
      case "remove-use-case": {
        for (const o of this.model.modules) {
          const r = (o.useCases ?? []).find((a) => a.id === e.id);
          if (r)
            return [
              { kind: "add-use-case", id: r.id, name: r.name, moduleId: o.id, policy: r.policy }
            ];
        }
        return null;
      }
      case "add-external-use-case":
        return [{ kind: "remove-external-use-case", id: e.id }];
      case "remove-external-use-case": {
        for (const o of this.model.externalSystems) {
          const r = (o.useCases ?? []).find((a) => a.id === e.id);
          if (r)
            return [{ kind: "add-external-use-case", id: r.id, name: r.name, moduleId: o.id }];
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
      case "add-emission":
        return [{ kind: "remove-emission", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-emission":
        return [{ kind: "add-emission", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-external-system":
        return [{ kind: "remove-external-system", id: e.id }];
      case "remove-external-system": {
        const o = this.model.externalSystems.find((r) => r.id === e.id);
        return o ? [{ kind: "add-external-system", id: o.id, name: o.name }] : null;
      }
      case "add-ai-agent":
        return [{ kind: "remove-ai-agent", id: e.id }];
      case "remove-ai-agent": {
        const o = (this.model.aiAgents ?? []).find((r) => r.id === e.id);
        return o ? [{ kind: "add-ai-agent", id: o.id, name: o.name }] : null;
      }
      case "add-agent-use":
        return [{ kind: "remove-agent-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-use":
        return [{ kind: "add-agent-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-agent-external-use":
        return [{ kind: "remove-agent-external-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "remove-agent-external-use":
        return [{ kind: "add-agent-external-use", sourceId: e.sourceId, targetId: e.targetId }];
      case "add-rag":
        return [{ kind: "remove-rag", id: e.id }];
      case "remove-rag": {
        const o = (this.model.rags ?? []).find((r) => r.id === e.id);
        return o ? [
          { kind: "add-rag", id: o.id, name: o.name },
          ...(this.model.agentRags ?? []).filter((r) => r.ragId === e.id).map(
            (r) => ({
              kind: "add-agent-rag",
              sourceId: r.agentId,
              targetId: e.id
            })
          ),
          ...(o.sourceReadModelIds ?? []).map(
            (r) => ({ kind: "add-rag-source", sourceId: e.id, targetId: r })
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
        const o = (this.model.actors ?? []).find((r) => r.id === e.id);
        return o ? [{ kind: "add-actor", id: o.id, name: o.name }] : null;
      }
      case "add-application-event":
        return [{ kind: "remove-application-event", id: e.id }];
      case "remove-application-event": {
        for (const o of this.model.modules) {
          const r = (o.applicationEvents ?? []).find((a) => a.id === e.id);
          if (r)
            return [{ kind: "add-application-event", id: r.id, name: r.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const o of this.model.modules) {
          const r = (o.domainServices ?? []).find((a) => a.id === e.id);
          if (r) return [{ kind: "add-domain-service", id: r.id, name: r.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-read-model":
        return [{ kind: "remove-read-model", id: e.id }];
      case "add-projection":
        return [{ kind: "remove-projection", id: e.id }];
      case "remove-projection": {
        const o = (this.model.projections ?? []).find((r) => r.id === e.id);
        return o && (o.sourceAggregateId || o.sourceExternalUseCaseId || o.sourceExternalTableId) ? [
          {
            kind: "add-projection",
            id: o.id,
            name: o.name,
            aggregateId: o.sourceAggregateId,
            externalUseCaseId: o.sourceExternalUseCaseId,
            externalTableId: o.sourceExternalTableId,
            targetId: o.readModelId,
            moduleId: o.moduleId
          }
        ] : null;
      }
      case "add-external-table":
        return [{ kind: "remove-external-table", id: e.id }];
      case "remove-external-table": {
        for (const o of this.model.externalSystems) {
          const r = (o.tables ?? []).find((a) => a.id === e.id);
          if (r) return [{ kind: "add-external-table", id: r.id, name: r.name, moduleId: o.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const o = (i = (t = (this.model.rags ?? []).find((r) => r.id === e.sourceId)) == null ? void 0 : t.contentSources) == null ? void 0 : i.find((r) => r.uri === e.uri);
        return o ? [
          {
            kind: "add-rag-content-source",
            sourceId: e.sourceId,
            type: o.type,
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
        const o = (this.model.apis ?? []).find((r) => r.id === e.id);
        return o ? [
          { kind: "add-api", id: o.id, name: o.name },
          ...o.operations.map(
            (r) => ({
              kind: "add-api-operation",
              apiId: o.id,
              id: r.id,
              name: r.name,
              httpMethod: r.httpMethod,
              path: r.path,
              moduleId: r.targetModuleId,
              targetUseCaseId: r.targetUseCaseId
            })
          )
        ] : null;
      }
      case "add-api-operation":
        return [{ kind: "remove-api-operation", apiId: e.apiId, id: e.id }];
      case "remove-api-operation": {
        const o = (n = (this.model.apis ?? []).find((r) => r.id === e.apiId)) == null ? void 0 : n.operations.find((r) => r.id === e.id);
        return o ? [
          {
            kind: "add-api-operation",
            apiId: e.apiId,
            id: o.id,
            name: o.name,
            httpMethod: o.httpMethod,
            path: o.path,
            moduleId: o.targetModuleId,
            targetUseCaseId: o.targetUseCaseId
          }
        ] : null;
      }
      case "set-api-operation-target": {
        const o = (s = (this.model.apis ?? []).find((r) => r.id === e.apiId)) == null ? void 0 : s.operations.find((r) => r.id === e.id);
        return o ? [
          {
            kind: "set-api-operation-target",
            apiId: e.apiId,
            id: e.id,
            moduleId: o.targetModuleId,
            targetUseCaseId: o.targetUseCaseId
          }
        ] : null;
      }
      case "remove-read-model": {
        for (const o of this.model.modules) {
          const r = (o.readModels ?? []).find((a) => a.id === e.id);
          if (r != null && r.aggregateId)
            return [{ kind: "add-read-model", id: r.id, name: r.name, aggregateId: r.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const o of this.model.modules) {
          const r = (o.domainEvents ?? []).find((a) => a.id === e.id);
          if (r) return [{ kind: "add-domain-event", id: r.id, name: r.name, moduleId: o.id }];
        }
        return null;
      }
      case "rename-element": {
        const r = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((a) => a.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((a) => a.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((a) => a.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((a) => a.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((a) => a.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((a) => a.useCases ?? []) : e.type === "application-event" ? this.model.modules.flatMap((a) => a.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : this.model.entities ?? []).find((a) => a.id === e.id);
        return r ? [{ kind: "rename-element", type: e.type, id: e.id, name: r.name }] : null;
      }
      case "add-flow":
        return [{ kind: "remove-flow", id: e.id }];
      case "remove-flow": {
        const o = this.model.flows.find((r) => r.id === e.id);
        return o ? [
          {
            kind: "add-flow",
            id: o.id,
            name: o.name,
            archetype: o.archetype,
            triggerAggregateId: o.triggerAggregateId ?? "",
            triggerEvent: o.triggerEvent ?? "",
            targetId: o.targetId,
            readModelName: o.readModelName,
            targetUseCaseId: o.targetUseCaseId
          }
        ] : null;
      }
      case "add-view":
        return [{ kind: "remove-view", id: e.id }];
      case "remove-view": {
        const o = (this.model.views ?? []).find((r) => r.id === e.id);
        return o ? [{ kind: "add-view", id: o.id, name: o.name, memberIds: o.memberIds }] : null;
      }
      case "add-process":
        return [{ kind: "remove-process", id: e.id }];
      case "add-process-step":
        return [{ kind: "remove-process-step", processId: e.processId, id: e.id }];
      case "remove-process-step": {
        const o = (this.model.processes ?? []).find((d) => d.id === e.processId), r = (o == null ? void 0 : o.steps.findIndex((d) => d.id === e.id)) ?? -1;
        if (!o || r < 0) return null;
        const a = o.steps[r];
        return [
          {
            kind: "add-process-step",
            processId: e.processId,
            id: a.id,
            name: a.name,
            stepType: a.type,
            roleId: a.roleId,
            deadline: a.deadline,
            useCaseId: a.useCaseId,
            compensationUseCaseId: a.compensationUseCaseId,
            afterStepId: r > 0 ? o.steps[r - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const o = (this.model.processes ?? []).find((a) => a.id === e.processId), r = (o == null ? void 0 : o.steps.findIndex((a) => a.id === e.id)) ?? -1;
        return !o || r < 0 ? null : [
          {
            kind: "move-process-step",
            processId: e.processId,
            id: e.id,
            afterStepId: r > 0 ? o.steps[r - 1].id : void 0
          }
        ];
      }
      case "update-process-step": {
        const o = (this.model.processes ?? []).find((a) => a.id === e.processId), r = o == null ? void 0 : o.steps.find((a) => a.id === e.id);
        return r ? [
          {
            kind: "update-process-step",
            processId: e.processId,
            id: e.id,
            roleId: r.roleId,
            deadline: r.deadline,
            compensationUseCaseId: r.compensationUseCaseId
          }
        ] : null;
      }
      case "remove-process": {
        const o = (this.model.processes ?? []).find((r) => r.id === e.id);
        return o ? [
          {
            kind: "add-process",
            id: o.id,
            name: o.name,
            moduleId: o.ownerModuleId ?? "",
            triggerAggregateId: o.triggerAggregateId,
            triggerEvent: o.triggerEvent,
            steps: o.steps
          }
        ] : null;
      }
      case "add-workflow":
        return [{ kind: "remove-workflow", id: e.id }];
      case "remove-workflow": {
        const o = (this.model.workflows ?? []).find((r) => r.id === e.id);
        return o ? [
          {
            kind: "add-workflow",
            id: o.id,
            name: o.name,
            triggerAggregateId: o.triggerAggregateId,
            triggerDomainServiceId: o.triggerDomainServiceId,
            triggerUseCaseId: o.triggerUseCaseId,
            triggerEvent: o.triggerEvent,
            completionEventName: o.onCompletionEventName,
            workflowSteps: o.steps
          }
        ] : null;
      }
      case "add-workflow-step":
        return [{ kind: "remove-workflow-step", workflowId: e.workflowId, id: e.id }];
      case "remove-workflow-step": {
        const o = (this.model.workflows ?? []).find((d) => d.id === e.workflowId), r = (o == null ? void 0 : o.steps.findIndex((d) => d.id === e.id)) ?? -1;
        if (!o || r < 0) return null;
        const a = o.steps[r];
        return [
          {
            kind: "add-workflow-step",
            workflowId: e.workflowId,
            id: a.id,
            name: a.name,
            emittedEventName: a.emittedEventName,
            targetUseCaseId: a.targetUseCaseId,
            completionEventName: a.completionEventName,
            dependsOnStepIds: a.dependsOnStepIds,
            afterStepId: r > 0 ? o.steps[r - 1].id : void 0
          },
          // Removing a step also strips it from its dependents; restore those edges.
          ...o.steps.filter((d) => d.id !== e.id && (d.dependsOnStepIds ?? []).includes(e.id)).map(
            (d) => ({
              kind: "add-workflow-dependency",
              workflowId: e.workflowId,
              id: d.id,
              dependsOnStepId: e.id
            })
          )
        ];
      }
      case "update-workflow-step": {
        const o = (this.model.workflows ?? []).find((a) => a.id === e.workflowId), r = o == null ? void 0 : o.steps.find((a) => a.id === e.id);
        return r ? [
          {
            kind: "update-workflow-step",
            workflowId: e.workflowId,
            id: e.id,
            emittedEventName: r.emittedEventName,
            targetUseCaseId: r.targetUseCaseId,
            completionEventName: r.completionEventName
          }
        ] : null;
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
    const { id: t, x: i, y: n } = e.detail, s = this._view, o = this.viewLayout(s), r = o.nodes[t] ?? null;
    let a = { x: i, y: n };
    const d = this.sceneFor(s), c = d.nodes.find((m) => m.id === t);
    if (c != null && c.parentId) {
      const m = d.nodes.find((g) => g.id === c.parentId);
      m && (a = { x: i - m.x, y: n - m.y });
    }
    this.writeViewLayout(s, { ...o, nodes: { ...o.nodes, [t]: a } });
    const l = [{ kind: "move-node", view: s, id: t, pos: r }];
    if (s === "processes") {
      const m = this.stepReorderCommand(t);
      if (m) {
        const g = this.inverseOf(m);
        g && l.unshift(...g), this.command(m, !1);
      }
    }
    this.pushUndoEntry(l);
  }
  onNodeResized(e) {
    var l;
    const { id: t, x: i, y: n, w: s, h: o } = e.detail, r = this._view, a = this.viewLayout(r), d = this.sceneFor(r).nodes.filter((m) => m.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: r, id: t, size: ((l = a.sizes) == null ? void 0 : l[t]) ?? null },
      { kind: "move-node", view: r, id: t, pos: a.nodes[t] ?? null },
      ...d.map((m) => ({ kind: "move-node", view: r, id: m.id, pos: a.nodes[m.id] ?? null }))
    ]);
    const c = { ...a.nodes, [t]: { x: i, y: n } };
    for (const m of d) c[m.id] = { x: m.x - i, y: m.y - n };
    this.writeViewLayout(r, {
      ...a,
      nodes: c,
      sizes: { ...a.sizes ?? {}, [t]: { w: s, h: o } }
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
    const i = ri(this.model, this.viewLayout("processes").nodes), n = new Map(i.nodes.map((r) => [r.id, r.x])), s = [...t.steps].sort(
      (r, a) => (n.get(r.id) ?? 0) - (n.get(a.id) ?? 0)
    );
    if (s.every((r, a) => r.id === t.steps[a].id)) return null;
    const o = s.findIndex((r) => r.id === e);
    return {
      kind: "move-process-step",
      processId: t.id,
      id: e,
      afterStepId: o > 0 ? s[o - 1].id : void 0
    };
  }
  onConnectRequested(e) {
    const { sourceId: t, targetId: i, x: n, y: s } = e.detail;
    if (this._view === "workflows") {
      const y = this.owningWorkflowOf(t), $ = this.owningWorkflowOf(i);
      if (!y || y !== $ || t === i) return;
      const E = y.steps.find((S) => S.id === i);
      if (((E == null ? void 0 : E.dependsOnStepIds) ?? []).includes(t)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: y.id,
        id: i,
        dependsOnStepId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const o = new Set((this.model.aiAgents ?? []).map((y) => y.id));
    if (o.has(t)) {
      if (new Set(
        this.model.modules.flatMap((E) => (E.useCases ?? []).map((S) => S.id))
      ).has(i)) {
        (this.model.agentUses ?? []).some(
          (S) => S.agentId === t && S.useCaseId === i
        ) || this.command({ kind: "add-agent-use", sourceId: t, targetId: i });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((E) => (E.useCases ?? []).map((S) => S.id))
      ).has(i)) {
        (this.model.agentExternalUses ?? []).some(
          (S) => S.agentId === t && S.externalUseCaseId === i
        ) || this.command({ kind: "add-agent-external-use", sourceId: t, targetId: i });
        return;
      }
      (this.model.rags ?? []).some((E) => E.id === i) && ((this.model.agentRags ?? []).some(
        (S) => S.agentId === t && S.ragId === i
      ) || this.command({ kind: "add-agent-rag", sourceId: t, targetId: i }));
      return;
    }
    const r = (this.model.rags ?? []).find((y) => y.id === t);
    if (r) {
      new Set(
        this.model.modules.flatMap(($) => ($.readModels ?? []).map((E) => E.id))
      ).has(i) && !(r.sourceReadModelIds ?? []).includes(i) && this.command({ kind: "add-rag-source", sourceId: t, targetId: i });
      return;
    }
    if ((this.model.rags ?? []).some((y) => y.id === i) || o.has(i)) return;
    const a = new Set((this.model.actors ?? []).map((y) => y.id));
    if (a.has(t)) {
      const y = new Set(
        this.model.modules.flatMap((E) => (E.useCases ?? []).map((S) => S.id))
      ), $ = new Set(
        this.model.modules.flatMap((E) => (E.queryServices ?? []).map((S) => S.id))
      );
      if (y.has(i) || $.has(i)) {
        (this.model.actorUses ?? []).some(
          (S) => S.actorId === t && S.targetId === i
        ) || this.command({ kind: "add-actor-use", sourceId: t, targetId: i });
        return;
      }
      if ((this.model.aggregates ?? []).some((E) => E.id === i)) {
        this.command({ kind: "add-actor-crud", sourceId: t, targetId: i });
        return;
      }
      if (this.model.externalSystems.some((E) => E.id === i)) {
        (this.model.actorExternalDependencies ?? []).some(
          (S) => S.actorId === t && S.externalSystemId === i
        ) || this.command({ kind: "add-actor-external", sourceId: t, targetId: i });
        return;
      }
      return;
    }
    const d = this.owningApiOf(t);
    if (d) {
      if (new Set(
        this.model.modules.flatMap(($) => ($.useCases ?? []).map((E) => E.id))
      ).has(i)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: d.id,
          id: t,
          targetUseCaseId: i
        });
        return;
      }
      if (this.model.modules.some(($) => $.id === i)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: d.id,
          id: t,
          moduleId: i
        });
        return;
      }
      return;
    }
    const c = this.model.externalSystems.flatMap((y) => y.useCases ?? []).find((y) => y.id === t), l = this.model.externalSystems.flatMap((y) => y.tables ?? []).find((y) => y.id === t);
    if (c || l) {
      const y = (c ?? l).name, $ = c ? { externalUseCaseId: t } : { externalTableId: t }, E = (A) => c ? A.sourceExternalUseCaseId === t : A.sourceExternalTableId === t, S = this.model.modules.flatMap((A) => A.readModels ?? []).find((A) => A.id === i);
      if (S) {
        (this.model.projections ?? []).some(
          (R) => E(R) && R.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(y)}-${q(S.name)}`,
          name: `${S.name}Projection`,
          ...$,
          targetId: i
        });
        return;
      }
      const p = this.model.modules.find((A) => A.id === i);
      if (p) {
        (this.model.projections ?? []).some(
          (R) => E(R) && R.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(y)}-${q(p.name)}`,
          name: `${y}ViewProjection`,
          ...$,
          moduleId: i,
          readModelName: `${y}View`
        });
        return;
      }
      return;
    }
    const m = (this.model.aggregates ?? []).find((y) => y.id === t);
    if (m) {
      const y = this.model.modules.flatMap((E) => E.readModels ?? []).find((E) => E.id === i);
      if (y) {
        (this.model.projections ?? []).some(
          (S) => S.sourceAggregateId === t && S.readModelId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(m.name)}-${q(y.name)}`,
          name: `${y.name}Projection`,
          aggregateId: t,
          targetId: i
        });
        return;
      }
      const $ = this.model.modules.find((E) => E.id === i);
      if ($) {
        (this.model.projections ?? []).some(
          (S) => S.sourceAggregateId === t && S.moduleId === i
        ) || this.command({
          kind: "add-projection",
          id: `proj-${q(m.name)}-${q($.name)}`,
          name: `${m.name}ViewProjection`,
          aggregateId: t,
          moduleId: i,
          readModelName: `${m.name}View`
        });
        return;
      }
    }
    const g = new Set(
      this.model.modules.flatMap((y) => (y.domainEvents ?? []).map(($) => $.id))
    ), _ = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((y) => y.id),
      ...this.model.modules.flatMap((y) => (y.domainServices ?? []).map(($) => $.id))
    ]), b = new Set(
      this.model.modules.flatMap((y) => (y.applicationEvents ?? []).map(($) => $.id))
    ), k = new Set(this.model.modules.flatMap((y) => (y.useCases ?? []).map(($) => $.id))), P = new Set(
      this.model.modules.flatMap((y) => (y.queryServices ?? []).map(($) => $.id))
    );
    if (k.has(t) && P.has(i)) {
      (this.model.queryCalls ?? []).some(
        ($) => $.sourceId === t && $.targetId === i
      ) || this.command({ kind: "add-query-call", sourceId: t, targetId: i });
      return;
    }
    const x = new Set(
      this.model.externalSystems.flatMap((y) => (y.useCases ?? []).map(($) => $.id))
    );
    if (k.has(t) && x.has(i)) {
      (this.model.externalUseCaseCalls ?? []).some(
        ($) => $.sourceId === t && $.targetId === i
      ) || this.command({ kind: "add-external-uc-call", sourceId: t, targetId: i });
      return;
    }
    if (k.has(t) && k.has(i) && t !== i) {
      (this.model.useCaseCalls ?? []).some(
        ($) => $.sourceId === t && $.targetId === i
      ) || this.command({ kind: "add-use-case-call", sourceId: t, targetId: i });
      return;
    }
    if (_.has(t) && g.has(i) || k.has(t) && b.has(i)) {
      (this.model.emissions ?? []).some(
        ($) => $.sourceId === t && $.domainEventId === i
      ) || this.command({ kind: "add-emission", sourceId: t, targetId: i });
      return;
    }
    if (g.has(t) || b.has(t)) {
      const y = b.has(t), $ = this.model.modules.flatMap((w) => (y ? w.applicationEvents : w.domainEvents) ?? []).find((w) => w.id === t), E = this.model.modules.flatMap((w) => (w.useCases ?? []).map((f) => ({ u: f, module: w }))).find(({ u: w }) => w.id === i), S = this.model.modules.flatMap((w) => (w.readModels ?? []).map((f) => ({ rm: f, module: w }))).find(({ rm: w }) => w.id === i), p = this.model.modules.find((w) => w.id === i) ?? (S == null ? void 0 : S.module) ?? (E == null ? void 0 : E.module);
      if (!$ || !p) return;
      const A = new Set((this.model.aggregates ?? []).map((w) => w.id)), R = new Set(
        this.model.modules.flatMap((w) => (w.domainServices ?? []).map((f) => f.id))
      ), H = (this.model.emissions ?? []).find(
        (w) => w.domainEventId === t && (y ? k.has(w.sourceId) : A.has(w.sourceId) || R.has(w.sourceId))
      );
      if (!H) {
        this.emit("modux-notice", {
          message: y ? `Declara primero qué caso de uso publica ${$.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${$.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const K = !y && A.has(H.sourceId);
      if (E) {
        if (this.model.flows.some(
          (f) => f.archetype === "TRIGGERS" && f.triggerEvent === $.name && f.targetUseCaseId === E.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${q($.name)}-${q(E.u.name)}`,
          name: E.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: K ? H.sourceId : "",
          triggerDomainServiceId: !y && !K ? H.sourceId : void 0,
          triggerUseCaseId: y ? H.sourceId : void 0,
          triggerEvent: $.name,
          targetId: p.id,
          targetUseCaseId: E.u.id
        });
        return;
      }
      const h = (S == null ? void 0 : S.rm.name) ?? `${$.name}View`;
      if (this.model.flows.some(
        (w) => w.archetype === "MATERIALIZES" && w.triggerEvent === $.name && w.targetId === p.id && w.readModelName === h
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${q($.name)}-${q(h)}`,
        name: h,
        archetype: "MATERIALIZES",
        triggerAggregateId: K ? H.sourceId : "",
        triggerDomainServiceId: !y && !K ? H.sourceId : void 0,
        triggerUseCaseId: y ? H.sourceId : void 0,
        triggerEvent: $.name,
        targetId: p.id,
        readModelName: h
      });
      return;
    }
    const U = /* @__PURE__ */ new Set([
      ..._,
      ...k,
      ...P,
      ...this.model.modules.flatMap((y) => (y.readModels ?? []).map(($) => $.id))
    ]);
    if (U.has(t) || U.has(i) || g.has(i) || b.has(i))
      return;
    const V = new Set(this.model.externalSystems.map((y) => y.id));
    if (V.has(t)) {
      new Set(
        this.model.modules.flatMap(($) => ($.useCases ?? []).map((E) => E.id))
      ).has(i) && ((this.model.externalCalls ?? []).some(
        (E) => E.externalSystemId === t && E.useCaseId === i
      ) || this.command({ kind: "add-external-call", sourceId: t, targetId: i }));
      return;
    }
    V.has(i) || a.has(i);
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
  onDeleteRequested(e) {
    const { elementType: t, id: i, kind: n } = e.detail;
    if (this._activeViewId && t === "node") {
      const s = this.memberIdOf(i, n), o = (this.model.views ?? []).find((r) => r.id === this._activeViewId);
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
    if (this._view === "workflows" && e === "edge" && i === "workflow-dependency") {
      const n = /^wfdep:(.+)->(.+)$/.exec(t);
      if (!n) return;
      const s = this.owningWorkflowOf(n[2]);
      if (!s) return;
      this._selectedId = null, this.command({
        kind: "remove-workflow-dependency",
        workflowId: s.id,
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
    if (this._view === "context-map" && e === "edge" && i === "api-wire") {
      const n = /^apiwire:(.+)$/.exec(t), s = n ? this.owningApiOf(n[1]) : null;
      if (!n || !s) return;
      this._selectedId = null, this.command({ kind: "set-api-operation-target", apiId: s.id, id: n[1] });
      return;
    }
    if (e === "node" && i === "api") {
      this._selectedId = null, this.command({ kind: "remove-api", id: t });
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
    if (e === "node" && i === "module") {
      if ((this.model.aggregates ?? []).some((s) => s.moduleId === t)) return;
      this._selectedId = null, this.command({ kind: "remove-module", id: t });
      return;
    }
    if (e === "node" && i === "aggregate") {
      if ((this.model.entities ?? []).some((s) => s.aggregateId === t)) return;
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
    const { id: t, kind: i, name: n } = e.detail;
    (i === "module" || i === "aggregate" || i === "entity" || i === "process-step" || i === "workflow" || i === "workflow-step" || i === "domain-event" || i === "read-model" || i === "domain-service" || i === "query-service" || i === "use-case" || i === "external-use-case" || i === "external-table" || i === "application-event" || i === "external-system" || i === "actor" || i === "ai-agent" || i === "rag" || i === "api" || i === "api-operation") && this.command({ kind: "rename-element", type: i, id: t.replace(/^tgt:/, ""), name: n });
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
      id: `step-${q(e)}`,
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
      id: `wfstep-${q(e)}`,
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
      ...(this.model.workflows ?? []).map((i) => ({ id: i.id, name: i.name, kind: "workflow" }))
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
    this._multi = this._multi.includes(t) ? this._multi.filter((i) => i !== t) : [...this._multi, t];
  }
  onNodesBoxed(e) {
    this._multi = e.detail.ids;
  }
  /** Canvas node ids → catalog element ids (view members). */
  memberIdsFromSelection() {
    const e = this.sceneFor(this._view), t = /* @__PURE__ */ new Set();
    for (const i of this._multi) {
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
            t.add(i);
            break;
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
    !e || !t.length || (this.command({ kind: "add-view", id: `view-${q(e)}`, name: e, memberIds: t }), this._newViewName = "", this._multi = []);
  }
  /** Model scoped to the active modux View (CURATED members + their context). */
  filteredModel() {
    if (!this._activeViewId) return this.model;
    const e = (this.model.views ?? []).find((d) => d.id === this._activeViewId);
    if (!e) return this.model;
    const t = new Set(e.memberIds), i = this.model.modules.filter((d) => t.has(d.id)), n = new Set(i.map((d) => d.id)), s = this.model.externalSystems.filter((d) => t.has(d.id)), o = new Set(s.map((d) => d.id)), r = (this.model.aggregates ?? []).filter(
      (d) => t.has(d.id) || n.has(d.moduleId)
    ), a = new Set(r.map((d) => d.id));
    return {
      ...this.model,
      modules: i,
      externalSystems: s,
      relations: this.model.relations.filter(
        (d) => n.has(d.sourceId) && n.has(d.targetId)
      ),
      flows: this.model.flows.filter(
        (d) => t.has(d.id) || (n.has(d.sourceId) || o.has(d.sourceId)) && (n.has(d.targetId) || o.has(d.targetId))
      ),
      aggregates: r,
      entities: (this.model.entities ?? []).filter((d) => a.has(d.aggregateId)),
      aggregateReferences: (this.model.aggregateReferences ?? []).filter(
        (d) => a.has(d.sourceAggregateId) && a.has(d.targetAggregateId)
      ),
      processes: (this.model.processes ?? []).filter(
        (d) => t.has(d.id) || (d.ownerModuleId ? n.has(d.ownerModuleId) : !1)
      ),
      // Workflows have no owner module (they live outside the contexts): member-only.
      workflows: (this.model.workflows ?? []).filter((d) => t.has(d.id))
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
    const t = e.detail.kind === "process-step" ? yd(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : _d(e.detail.id, e.detail.kind);
    t && this.emit("modux-activate", t);
  }
  createElementFromToolbar() {
    var t, i, n, s, o, r, a, d, c, l, m, g, _, b, k, P, x, U, V, y, $, E, S, p, A, R, H, K, h, u, w;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "context-map")
        if (this._newContextMapKind === "external-system")
          this.command({ kind: "add-external-system", id: `ext-${q(e)}`, name: e });
        else if (this._newContextMapKind === "actor")
          this.command({ kind: "add-actor", id: q(e), name: e });
        else if (this._newContextMapKind === "ai-agent")
          this.command({ kind: "add-ai-agent", id: `agent-${q(e)}`, name: e });
        else if (this._newContextMapKind === "rag")
          this.command({ kind: "add-rag", id: `rag-${q(e)}`, name: e });
        else if (this._newContextMapKind === "api")
          this.command({ kind: "add-api", id: `api-${q(e)}`, name: e });
        else if (this._detail === "detail" && this._newContextMapKind === "api-operation") {
          const f = (t = (this.model.apis ?? []).find((I) => I.id === this._selectedId)) == null ? void 0 : t.id, v = this._newApiId || f || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id);
          if (!v) return;
          this.command({
            kind: "add-api-operation",
            apiId: v,
            id: `apiop-${v.replace(/^api-/, "")}-${q(e)}`,
            name: e
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "domain-event") {
          const f = (s = this.model.modules.find((I) => I.id === this._selectedId)) == null ? void 0 : s.id, v = this._newModuleId || f || ((o = this.model.modules[0]) == null ? void 0 : o.id);
          if (!v) return;
          this.command({ kind: "add-domain-event", id: `ev-${q(e)}`, name: e, moduleId: v });
        } else if (this._detail === "detail" && this._newContextMapKind === "application-event") {
          const f = (r = this.model.modules.find((I) => I.id === this._selectedId)) == null ? void 0 : r.id, v = this._newModuleId || f || ((a = this.model.modules[0]) == null ? void 0 : a.id);
          if (!v) return;
          this.command({ kind: "add-application-event", id: `aev-${q(e)}`, name: e, moduleId: v });
        } else if (this._detail === "detail" && this._newContextMapKind === "domain-service") {
          const f = (d = this.model.modules.find((I) => I.id === this._selectedId)) == null ? void 0 : d.id, v = this._newModuleId || f || ((c = this.model.modules[0]) == null ? void 0 : c.id);
          if (!v) return;
          this.command({ kind: "add-domain-service", id: `ds-${q(e)}`, name: e, moduleId: v });
        } else if (this._detail === "detail" && this._newContextMapKind === "query-service") {
          const f = (l = this.model.modules.find((I) => I.id === this._selectedId)) == null ? void 0 : l.id, v = this._newModuleId || f || ((m = this.model.modules[0]) == null ? void 0 : m.id);
          if (!v) return;
          this.command({ kind: "add-query-service", id: `qs-${q(e)}`, name: e, moduleId: v });
        } else if (this._detail === "detail" && this._newContextMapKind === "use-case") {
          const f = (g = this.model.modules.find((I) => I.id === this._selectedId)) == null ? void 0 : g.id, v = this._newModuleId || f || ((_ = this.model.modules[0]) == null ? void 0 : _.id);
          if (!v) return;
          this.command({ kind: "add-use-case", id: `uc-${q(e)}`, name: e, moduleId: v });
        } else if (this._detail === "detail" && this._newContextMapKind === "policy") {
          const f = (b = this.model.modules.find((I) => I.id === this._selectedId)) == null ? void 0 : b.id, v = this._newModuleId || f || ((k = this.model.modules[0]) == null ? void 0 : k.id);
          if (!v) return;
          this.command({ kind: "add-use-case", id: `uc-${q(e)}`, name: e, moduleId: v, policy: !0 });
        } else if (this._detail === "detail" && this._newContextMapKind === "external-use-case") {
          const f = (P = this.model.externalSystems.find((I) => I.id === this._selectedId)) == null ? void 0 : P.id, v = this._newExternalId || f || ((x = this.model.externalSystems[0]) == null ? void 0 : x.id);
          if (!v) return;
          this.command({
            kind: "add-external-use-case",
            id: `xuc-${q(e)}`,
            name: e,
            moduleId: v
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "external-table") {
          const f = (U = this.model.externalSystems.find((I) => I.id === this._selectedId)) == null ? void 0 : U.id, v = this._newExternalId || f || ((V = this.model.externalSystems[0]) == null ? void 0 : V.id);
          if (!v) return;
          this.command({
            kind: "add-external-table",
            id: `tbl-${q(e)}`,
            name: e,
            moduleId: v
          });
        } else if (this._detail === "detail" && this._newContextMapKind === "read-model") {
          const f = (y = (this.model.aggregates ?? []).find((I) => I.id === this._selectedId)) == null ? void 0 : y.id, v = this._newAggregateId || f || ((E = ($ = this.model.aggregates) == null ? void 0 : $[0]) == null ? void 0 : E.id);
          if (!v) return;
          this.command({ kind: "add-read-model", id: `rm-${q(e)}`, name: e, aggregateId: v });
        } else
          this.command({
            kind: "add-module",
            id: `mod-${q(e)}`,
            name: e,
            subdomainType: this._newSubdomain
          });
      else if (this._view === "aggregates") {
        const f = this._newModuleId || ((S = this.model.modules[0]) == null ? void 0 : S.id);
        if (!f) return;
        this.command({ kind: "add-aggregate", id: `agg-${q(e)}`, name: e, moduleId: f });
      } else if (this._view === "flows") {
        const f = this._newTriggerAggId || ((A = (p = this.model.aggregates) == null ? void 0 : p[0]) == null ? void 0 : A.id), v = this._newTargetId || ((R = this.model.modules[0]) == null ? void 0 : R.id), I = this._newTriggerEvent.trim();
        if (!f || !v || !I) return;
        this.command({
          kind: "add-flow",
          id: `flow-${q(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: f,
          triggerEvent: I,
          targetId: v
        }), this._newTriggerEvent = "";
      } else if (this._view === "processes") {
        const f = this._newModuleId || ((H = this.model.modules[0]) == null ? void 0 : H.id);
        if (!f) return;
        this.command({
          kind: "add-process",
          id: `proc-${q(e)}`,
          name: e,
          moduleId: f,
          triggerAggregateId: this._newTriggerAggId || ((h = (K = this.model.aggregates) == null ? void 0 : K[0]) == null ? void 0 : h.id),
          triggerEvent: this._newTriggerEvent.trim() || void 0
        }), this._newTriggerEvent = "";
      } else this._view === "workflows" && (this.command({
        kind: "add-workflow",
        id: `wf-${q(e)}`,
        name: e,
        triggerAggregateId: this._newTriggerAggId || ((w = (u = this.model.aggregates) == null ? void 0 : u[0]) == null ? void 0 : w.id),
        triggerEvent: this._newTriggerEvent.trim() || void 0,
        completionEventName: `${e.replace(/\s+/g, "")}Completado`
      }), this._newTriggerEvent = "");
      this._newName = "";
    }
  }
  sceneFor(e) {
    const t = this.viewLayout(e), i = this.filteredModel(), n = e === "aggregates" ? Wn(i, t.nodes) : e === "flows" ? es(i, t.nodes) : e === "processes" ? ri(i, t.nodes) : e === "workflows" ? hd(i, t.nodes) : e === "eventstorming" ? sd(i, t.nodes) : Ln(i, t.nodes, this._detail === "detail", t.sizes ?? {});
    if (this.diff)
      for (const s of n.nodes) {
        const o = this.diff[s.id] ?? this.diff[s.id.replace(/^(tgt:|flow:)/, "")];
        o && (s.diffKind = o);
      }
    return n;
  }
  /** ELK layout for the current view, applied as ONE undoable composite move. */
  async runAutoLayout() {
    var d;
    const e = this._view, t = this.sceneFor(e);
    if (!t.nodes.length) return;
    const i = t.nodes.filter((c) => !c.parentId), n = new Set(i.map((c) => c.id)), s = {
      nodes: i,
      edges: t.edges.filter((c) => n.has(c.sourceId) && n.has(c.targetId))
    }, r = await pd(s, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), a = this.viewLayout(e);
    this.pushUndoEntry([
      ...i.map((c) => ({
        kind: "move-node",
        view: e,
        id: c.id,
        pos: a.nodes[c.id] ?? null
      })),
      // manual bends no longer make sense after relayout — restore them on undo
      ...Object.keys(a.edges).map((c) => ({
        kind: "set-edge-points",
        view: e,
        id: c,
        points: a.edges[c]
      }))
    ]), this.writeViewLayout(e, { nodes: r, edges: {}, sizes: a.sizes }), await this.updateComplete, (d = this.renderRoot.querySelector("modux-canvas")) == null || d.fit();
  }
  render() {
    const e = this.sceneFor(this._view);
    return M`
      <div class="toolbar">
        <div class="tabs">
          ${wd.map(
      (t) => M`
              <button
                class="tab"
                ?data-active=${this._view === t.id}
                ?disabled=${!t.ready}
                title=${t.ready ? "" : "Próximamente"}
                @click=${() => this._view = t.id}
              >
                ${t.label}
              </button>
            `
    )}
        </div>
        <select
          title="Limitar el lienzo a una vista del modelo"
          @change=${(t) => this._activeViewId = t.target.value}
        >
          <option value="" ?selected=${this._activeViewId === ""}>Vista: todo el modelo</option>
          ${(this.model.views ?? []).filter((t) => t.kind === "CURATED").map(
      (t) => M`<option value=${t.id} ?selected=${t.id === this._activeViewId}>
                  Vista: ${t.name}
                </option>`
    )}
        </select>
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
            ` : ""}
        <div class="spacer"></div>
        ${this._multi.length ? M`
              <input
                class="new-name"
                placeholder="Nombre de la vista…"
                .value=${this._newViewName}
                @input=${(t) => this._newViewName = t.target.value}
                @keydown=${(t) => t.key === "Enter" && this.createViewFromSelection()}
              />
              <button class="tab" title="Crear una vista modux con la selección" @click=${this.createViewFromSelection}>
                ⊞ Vista (${this._multi.length})
              </button>
              <span class="sep"></span>
            ` : ""}
        <input
          class="new-name"
          ?hidden=${this._view === "eventstorming"}
          placeholder=${{
      "context-map": this._newContextMapKind === "external-system" ? "Nuevo sistema externo…" : this._newContextMapKind === "actor" ? "Nuevo actor…" : this._newContextMapKind === "ai-agent" ? "Nuevo agente de IA…" : this._newContextMapKind === "rag" ? "Nuevo RAG…" : this._newContextMapKind === "api" ? "Nueva API…" : this._detail !== "detail" || this._newContextMapKind === "module" ? "Nuevo contexto…" : this._newContextMapKind === "domain-event" ? "Nuevo evento de dominio…" : this._newContextMapKind === "application-event" ? "Nuevo evento de aplicación…" : this._newContextMapKind === "domain-service" ? "Nuevo servicio de dominio…" : this._newContextMapKind === "policy" ? "Nueva policy…" : this._newContextMapKind === "use-case" ? "Nuevo caso de uso…" : this._newContextMapKind === "query-service" ? "Nuevo query service…" : this._newContextMapKind === "external-use-case" ? "Nuevo caso de uso externo…" : this._newContextMapKind === "external-table" ? "Nueva tabla externa…" : this._newContextMapKind === "api-operation" ? "Nueva operación de API…" : "Nuevo read model…",
      aggregates: "Nuevo agregado…",
      flows: "Nuevo flow…",
      processes: "Nuevo proceso…",
      workflows: "Nuevo workflow…",
      eventstorming: ""
    }[this._view]}
          .value=${this._newName}
          @input=${(t) => this._newName = t.target.value}
          @keydown=${(t) => t.key === "Enter" && this.createElementFromToolbar()}
        />
        ${this._view === "context-map" ? M`<select
              title="Qué crear en el lienzo"
              @change=${(t) => this._newContextMapKind = t.target.value}
            >
              <option value="module" ?selected=${this._newContextMapKind === "module"}>
                Contexto
              </option>
              <option
                value="external-system"
                ?selected=${this._newContextMapKind === "external-system"}
              >
                Sistema externo
              </option>
              <option value="actor" ?selected=${this._newContextMapKind === "actor"}>
                Actor
              </option>
              <option value="ai-agent" ?selected=${this._newContextMapKind === "ai-agent"}>
                Agente de IA
              </option>
              <option value="rag" ?selected=${this._newContextMapKind === "rag"}>
                RAG (base de conocimiento)
              </option>
              <option value="api" ?selected=${this._newContextMapKind === "api"}>
                API publicada
              </option>
              ${this._detail === "detail" ? M`
                    <option
                      value="domain-event"
                      ?selected=${this._newContextMapKind === "domain-event"}
                    >
                      Evento de dominio
                    </option>
                    <option
                      value="application-event"
                      ?selected=${this._newContextMapKind === "application-event"}
                    >
                      Evento de aplicación
                    </option>
                    <option
                      value="read-model"
                      ?selected=${this._newContextMapKind === "read-model"}
                    >
                      Read model
                    </option>
                    <option
                      value="domain-service"
                      ?selected=${this._newContextMapKind === "domain-service"}
                    >
                      Servicio de dominio
                    </option>
                    <option
                      value="query-service"
                      ?selected=${this._newContextMapKind === "query-service"}
                    >
                      Query service
                    </option>
                    <option value="use-case" ?selected=${this._newContextMapKind === "use-case"}>
                      Caso de uso
                    </option>
                    <option value="policy" ?selected=${this._newContextMapKind === "policy"}>
                      Policy
                    </option>
                    <option
                      value="external-use-case"
                      ?selected=${this._newContextMapKind === "external-use-case"}
                    >
                      Caso de uso externo
                    </option>
                    <option
                      value="external-table"
                      ?selected=${this._newContextMapKind === "external-table"}
                    >
                      Tabla externa (legacy)
                    </option>
                    <option
                      value="api-operation"
                      ?selected=${this._newContextMapKind === "api-operation"}
                    >
                      Operación de API
                    </option>
                  ` : ""}
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && (this._newContextMapKind === "external-use-case" || this._newContextMapKind === "external-table") ? M`<select
              title="Sistema externo que ofrece el caso de uso"
              @change=${(t) => this._newExternalId = t.target.value}
            >
              ${this.model.externalSystems.map(
      (t) => {
        var i;
        return M`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newExternalId || ((i = this.model.externalSystems[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "api-operation" ? M`<select
              title="API dueña de la nueva operación"
              @change=${(t) => this._newApiId = t.target.value}
            >
              ${(this.model.apis ?? []).map(
      (t) => {
        var i, n;
        return M`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newApiId || ((n = (i = this.model.apis) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._detail === "detail" && this._newContextMapKind === "read-model" ? M`<select
              title="Agregado del que es vista el read model"
              @change=${(t) => this._newAggregateId = t.target.value}
            >
              ${(this.model.aggregates ?? []).map(
      (t) => {
        var i, n;
        return M`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newAggregateId || ((n = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : n.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "context-map" && this._newContextMapKind === "module" ? M`<select
              title="Subdominio del nuevo contexto"
              @change=${(t) => this._newSubdomain = t.target.value}
            >
              ${vd.map(
      (t) => M`<option value=${t} ?selected=${t === this._newSubdomain}>${t}</option>`
    )}
            </select>` : ""}
        ${this._view === "aggregates" || this._view === "processes" || this._view === "context-map" && this._detail === "detail" && (this._newContextMapKind === "domain-event" || this._newContextMapKind === "application-event" || this._newContextMapKind === "domain-service" || this._newContextMapKind === "query-service" || this._newContextMapKind === "use-case" || this._newContextMapKind === "policy") ? M`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : this._view === "processes" ? "Módulo dueño del proceso" : "Contexto dueño del nuevo elemento"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return M`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
                  >
                    ${t.name}
                  </option>`;
      }
    )}
            </select>` : ""}
        ${this._view === "flows" || this._view === "processes" || this._view === "workflows" ? M`
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
        var i, n;
        return M`<option
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
              ${this._view === "flows" ? M`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return M`<option
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
          ?hidden=${this._view === "eventstorming"}
          @click=${this.createElementFromToolbar}
        >
          ＋ Crear
        </button>
        ${this._view === "context-map" && this._selectedId && (this.model.rags ?? []).some((t) => t.id === this._selectedId) ? M`
              <span class="sep"></span>
              <select
                title="Tipo de fuente de contenido del RAG"
                @change=${(t) => this._newRagSourceType = t.target.value}
              >
                ${["WEB", "REPO", "FTP"].map(
      (t) => M`<option value=${t} ?selected=${t === this._newRagSourceType}>${t}</option>`
    )}
              </select>
              <input
                class="new-name"
                placeholder="URI de la fuente…"
                title="Repo, web o servidor FTP que alimenta el RAG"
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
                ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
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
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
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
        <label ?hidden=${this._view !== "context-map"}>Detalle:</label>
        <select
          ?hidden=${this._view !== "context-map"}
          title="Nivel de detalle: contextos, o sus agregados y casos de uso"
          .value=${this._detail}
          @change=${(t) => this.setDetail(t.target.value)}
        >
          <option value="contexts" ?selected=${this._detail === "contexts"}>Contextos</option>
          <option value="detail" ?selected=${this._detail === "detail"}>
            Agregados y casos de uso
          </option>
        </select>
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
      </div>
      <modux-canvas
        .scene=${e}
        .edgePoints=${this.viewLayout(this._view).edges}
        .selectedId=${this._selectedId}
        .selectedIds=${this._multi}
        .connectable=${this._view === "context-map" || this._view === "workflows"}
        @node-moved=${this.onNodeMoved}
        @node-resized=${this.onNodeResized}
        @connect-requested=${this.onConnectRequested}
        @delete-requested=${this.onDeleteRequested}
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
      <div class="hint">
        ${this._view === "context-map" ? M`Arrastra para reordenar · asa azul → crear relación (elige el tipo) · doble click
            en la etiqueta cambia el tipo · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra la relación o el contexto vacío seleccionado · F2 renombra
            · rueda para zoom` : this._view === "eventstorming" ? M`Vista derivada del modelo: comando azul → agregado amarillo → evento naranja →
              policy lila → read model verde · se edita desde las otras vistas o los CRUD (doble
              click abre el CRUD) · ✨ Auto-layout ordena la narrativa · rueda para zoom` : this._view === "workflows" ? M`Arrastra un paso sobre otro con el asa para declarar dependencia (B espera a A)
                · Supr borra el paso o la dependencia seleccionada · F2 renombra · doble click abre
                el CRUD · espacio+arrastra mueve el lienzo · rueda para zoom` : M`Arrastra para reordenar · arrastra en vacío para seleccionar · espacio+arrastra
            mueve el lienzo · Supr borra (si está vacío) · F2 renombra · doble click abre el CRUD ·
            rueda para zoom`}
      </div>
      ${this.renderRelationPicker()} ${this.renderDeletePicker()}
    `;
  }
  /** With a View active, Supr on a member asks: drop from the model, or only from the view? */
  renderDeletePicker() {
    if (!this._deletePicker) return "";
    const t = (this.model.views ?? []).find((i) => i.id === this._activeViewId);
    return M`
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
  renderRelationPicker() {
    var i;
    const e = this._relationPicker;
    if (!e) return "";
    const t = e.mode === "edit" ? (i = this.model.relations.find(
      (n) => n.sourceId === e.sourceId && n.targetId === e.targetId
    )) == null ? void 0 : i.type : this._relationType;
    return M`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${gd.map(
      (n) => M`
            <button
              class="picker-item ${n === t ? "current" : ""}"
              title=${n}
              @click=${() => this.pickRelationType(n)}
            >
              <span class="abbr">${Bt[n].abbr}</span>
              <span class="name">${Bt[n].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
D.styles = Xt`
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
    modux-canvas {
      flex: 1;
      min-height: 0;
    }
  `;
L([
  le({ attribute: !1 })
], D.prototype, "model", 2);
L([
  le({ attribute: !1 })
], D.prototype, "layout", 2);
L([
  le({ attribute: !1 })
], D.prototype, "diff", 2);
L([
  N()
], D.prototype, "_view", 2);
L([
  N()
], D.prototype, "_detail", 2);
L([
  N()
], D.prototype, "_relationType", 2);
L([
  N()
], D.prototype, "_relationPicker", 2);
L([
  N()
], D.prototype, "_selectedId", 2);
L([
  N()
], D.prototype, "_newName", 2);
L([
  N()
], D.prototype, "_newSubdomain", 2);
L([
  N()
], D.prototype, "_newModuleId", 2);
L([
  N()
], D.prototype, "_newContextMapKind", 2);
L([
  N()
], D.prototype, "_newAggregateId", 2);
L([
  N()
], D.prototype, "_newExternalId", 2);
L([
  N()
], D.prototype, "_newApiId", 2);
L([
  N()
], D.prototype, "_newArchetype", 2);
L([
  N()
], D.prototype, "_newTriggerAggId", 2);
L([
  N()
], D.prototype, "_newTriggerEvent", 2);
L([
  N()
], D.prototype, "_newTargetId", 2);
L([
  N()
], D.prototype, "_undoStack", 2);
L([
  N()
], D.prototype, "_redoStack", 2);
L([
  N()
], D.prototype, "_newStepName", 2);
L([
  N()
], D.prototype, "_newStepType", 2);
L([
  N()
], D.prototype, "_newStepRole", 2);
L([
  N()
], D.prototype, "_newStepDeadline", 2);
L([
  N()
], D.prototype, "_editStepRole", 2);
L([
  N()
], D.prototype, "_editStepDeadline", 2);
L([
  N()
], D.prototype, "_editStepComp", 2);
L([
  N()
], D.prototype, "_newStepUseCase", 2);
L([
  N()
], D.prototype, "_newStepEmits", 2);
L([
  N()
], D.prototype, "_editStepUseCase", 2);
L([
  N()
], D.prototype, "_editStepEmits", 2);
L([
  N()
], D.prototype, "_editStepAwaits", 2);
L([
  N()
], D.prototype, "_multi", 2);
L([
  N()
], D.prototype, "_newViewName", 2);
L([
  N()
], D.prototype, "_activeViewId", 2);
L([
  N()
], D.prototype, "_newRagSourceType", 2);
L([
  N()
], D.prototype, "_newRagSourceUri", 2);
L([
  N()
], D.prototype, "_addMemberKey", 2);
L([
  N()
], D.prototype, "_deletePicker", 2);
D = L([
  Qt("modux-editor")
], D);
var xd = Object.defineProperty, Id = Object.getOwnPropertyDescriptor, te = (e, t, i, n) => {
  for (var s = n > 1 ? void 0 : n ? Id(t, i) : t, o = e.length - 1, r; o >= 0; o--)
    (r = e[o]) && (s = (n ? r(t, i, s) : r(s)) || s);
  return n && s && xd(t, i, s), s;
};
let Q = class extends be {
  constructor() {
    super(...arguments), this.base = "/modux/editor", this._model = null, this._layout = {}, this._error = null, this._saving = !1, this._toast = null, this._workspace = null, this._creatingSolution = !1, this._newSolutionName = "", this._diff = null, this._mergeFlow = null, this._layoutDirty = !1, this._lastVersion = null, this._pendingVersion = null, this._interacting = !1, this._onPointerDown = () => this._interacting = !0, this._onPointerUp = () => {
      if (this._interacting = !1, this._pendingVersion) {
        const e = this._pendingVersion;
        this._pendingVersion = null, this.onVersionSignal(e);
      }
    }, this._onPageHide = () => {
      this._layoutDirty && (this._layoutDirty = !1, navigator.sendBeacon(
        `${this.base}/layout`,
        new Blob([JSON.stringify(this._layout)], { type: "application/json" })
      ));
    };
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
  async onVersionSignal(e) {
    var i;
    if (!this._model) return;
    if (this._saving || this._interacting) {
      this._pendingVersion = e;
      return;
    }
    const t = this._lastVersion !== null && e !== this._lastVersion;
    this._lastVersion = e, t && (await this.reload(), (i = this.renderRoot.querySelector("modux-editor")) == null || i.clearHistory(), this.showToast(
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
    if (!this._workspace || this._workspace.system) {
      this._diff = null;
      return;
    }
    try {
      const e = await fetch(`${this.base}/solutions/diff`);
      this._diff = e.ok ? await e.json() : null;
    } catch {
      this._diff = null;
    }
  }
  /** create / switch / discard / status / merge against the solutions API, then reload. */
  async solutionOp(e, t) {
    var i;
    this._saving = !0;
    try {
      const n = await fetch(`${this.base}/solutions/${e}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t)
      });
      if (!n.ok) {
        let s = `El servidor rechazó la operación (${n.status})`;
        try {
          const o = await n.json();
          o != null && o.message && (s = o.message);
        } catch {
        }
        this.showToast(s);
        return;
      }
      this._workspace = await n.json(), await this.reload(), await this.refreshDiff(), (i = this.renderRoot.querySelector("modux-editor")) == null || i.clearHistory();
    } catch (n) {
      this.showToast(String(n));
    } finally {
      this._saving = !1;
    }
  }
  onWorkspaceSelect(e) {
    const t = e.target.value;
    if (t === "__new__") {
      this._creatingSolution = !0;
      return;
    }
    this._workspace && t !== this._workspace.current && this.solutionOp("switch", { branch: t });
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
  async onCommand(e) {
    const { command: t } = e.detail;
    this._saving = !0;
    try {
      const i = await fetch(`${this.base}/commands`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(t)
      });
      if (!i.ok) {
        let o = `El servidor rechazó el comando (${i.status})`;
        try {
          const r = await i.json();
          r != null && r.message && (o = r.message);
        } catch {
        }
        this.showToast(o);
        return;
      }
      const [n, s] = await Promise.all([
        fetch(`${this.base}/model`),
        fetch(`${this.base}/version`)
      ]);
      n.ok && (this._model = await n.json()), s.ok && (this._lastVersion = (await s.json()).version), await this.refreshDiff();
    } catch (i) {
      this.showToast(String(i));
    } finally {
      if (this._saving = !1, this._pendingVersion) {
        const i = this._pendingVersion;
        this._pendingVersion = null, this.onVersionSignal(i);
      }
    }
  }
  onLayoutChanged(e) {
    this._layout = e.detail.layout, this._layoutDirty = !0, window.clearTimeout(this._layoutTimer), this._layoutTimer = window.setTimeout(() => {
      this._layoutDirty = !1, fetch(`${this.base}/layout`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this._layout)
      });
    }, 600);
  }
  render() {
    var e;
    return this._error ? M`<div class="status error">modux editor: ${this._error}</div>` : this._model ? M`
      ${this._workspace ? M`
            <div class="workspace">
              <label>Modelo:</label>
              <select @change=${this.onWorkspaceSelect} title="Sistema (as-is) o una solución (to-be)">
                <option value="main" ?selected=${this._workspace.system}>Sistema (as-is)</option>
                ${this._workspace.solutions.map(
      (t) => M`<option value=${t.branch} ?selected=${t.branch === this._workspace.current}>
                      Solución: ${t.name}${t.status ? ` · ${t.status}` : ""}
                    </option>`
    )}
                <option value="__new__">＋ Nueva solución…</option>
              </select>
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const t = (n) => this._diff.changes.filter((s) => s.kind === n).length, i = this._diff.changes.filter((n) => n.kind === "REMOVED").map((n) => n.name ?? n.id);
      return M`<span
                      class="badge solution"
                      title=${i.length ? `Eliminados respecto al sistema: ${i.join(", ")}` : "Cambios respecto al sistema"}
                    >
                      ＋${t("ADDED")} ～${t("MODIFIED")} －${t("REMOVED")}
                    </span>`;
    })() : ""}
              ${this._creatingSolution ? M`
                    <input
                      placeholder="Nombre de la solución…"
                      .value=${this._newSolutionName}
                      @input=${(t) => this._newSolutionName = t.target.value}
                      @keydown=${(t) => t.key === "Enter" && this.createSolution()}
                    />
                    <button @click=${this.createSolution}>Crear</button>
                    <button @click=${() => this._creatingSolution = !1}>Cancelar</button>
                  ` : ""}
              ${!this._workspace.system && !this._creatingSolution ? (() => {
      var i;
      const t = (i = this._workspace.solutions.find(
        (n) => n.branch === this._workspace.current
      )) == null ? void 0 : i.status;
      return M`
                      ${t === "EXPLORING" ? M`<button
                            title="La solución queda propuesta para revisión"
                            @click=${() => void this.solutionOp("status", { status: "PROPOSED" })}
                          >
                            → Proponer
                          </button>` : ""}
                      ${t === "PROPOSED" ? M`<button
                            title="Aprueba la solución — exige lint verde y ninguna decisión abierta"
                            @click=${() => void this.solutionOp("status", { status: "APPROVED" })}
                          >
                            ✓ Aprobar
                          </button>` : ""}
                      ${t === "APPROVED" ? M`<button
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
      ${this._mergeFlow ? M`
            <div class="merge-panel">
              <div class="merge-title">
                ${this._mergeFlow.conflicts.length} elemento(s) cambiados en el sistema Y en la
                solución — elige qué versión queda:
              </div>
              ${this._mergeFlow.conflicts.map(
      (t) => M`
                  <div class="merge-row">
                    <span class="merge-el">${t.type} · ${t.name ?? t.id}</span>
                    <label title=${t.system ?? "(eliminado en el sistema)"}>
                      <input
                        type="radio"
                        name=${t.key}
                        .checked=${this._mergeFlow.resolutions[t.key] === "system"}
                        @change=${() => this._mergeFlow = {
        ...this._mergeFlow,
        resolutions: { ...this._mergeFlow.resolutions, [t.key]: "system" }
      }}
                      />
                      Sistema
                    </label>
                    <label title=${t.solution ?? "(eliminado en la solución)"}>
                      <input
                        type="radio"
                        name=${t.key}
                        .checked=${this._mergeFlow.resolutions[t.key] === "solution"}
                        @change=${() => this._mergeFlow = {
        ...this._mergeFlow,
        resolutions: { ...this._mergeFlow.resolutions, [t.key]: "solution" }
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
      (t) => !this._mergeFlow.resolutions[t.key]
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
        .diff=${this._diff && !((e = this._workspace) != null && e.system) ? Object.fromEntries(
      this._diff.changes.filter((t) => t.kind !== "REMOVED").map((t) => [t.id, t.kind])
    ) : null}
        @modux-command=${this.onCommand}
        @layout-changed=${this.onLayoutChanged}
        @modux-notice=${(t) => this.showToast(t.detail.message, t.detail.kind ?? "info")}
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
Q.styles = Xt`
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
te([
  le()
], Q.prototype, "base", 2);
te([
  N()
], Q.prototype, "_model", 2);
te([
  N()
], Q.prototype, "_layout", 2);
te([
  N()
], Q.prototype, "_error", 2);
te([
  N()
], Q.prototype, "_saving", 2);
te([
  N()
], Q.prototype, "_toast", 2);
te([
  N()
], Q.prototype, "_workspace", 2);
te([
  N()
], Q.prototype, "_creatingSolution", 2);
te([
  N()
], Q.prototype, "_newSolutionName", 2);
te([
  N()
], Q.prototype, "_diff", 2);
te([
  N()
], Q.prototype, "_mergeFlow", 2);
Q = te([
  Qt("modux-editor-connected")
], Q);
export {
  $d as CONTAINER_HEADER,
  bd as CONTAINER_INSET,
  Y as ModuxCanvas,
  D as ModuxEditor,
  Q as ModuxEditorConnected,
  Wn as aggregatesScene,
  $n as containerFit,
  In as containerMinSize,
  Ln as contextMapScene,
  Nn as flowCoherence,
  es as flowsScene,
  bn as normalizeViewLayout,
  ri as processesScene,
  Mn as relationEdgeId
};
