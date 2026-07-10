const oc = 34, ac = 10;
function ji(e, t = 24) {
  const i = new Map(e.map((n) => [n.id, { x: n.x, y: n.y }]));
  for (let n = 0; n < 80; n++) {
    let o = !1;
    for (let a = 0; a < e.length; a++)
      for (let d = a + 1; d < e.length; d++) {
        const c = e[a], p = e[d], I = i.get(c.id), f = i.get(p.id), y = f.x - I.x, h = f.y - I.y, r = (c.w + p.w) / 2 + t - Math.abs(y), u = (c.h + p.h) / 2 + t - Math.abs(h);
        if (!(r <= 0 || u <= 0))
          if (o = !0, r < u) {
            const g = (y >= 0 ? 1 : -1) * r / 2;
            I.x -= g, f.x += g;
          } else {
            const g = (h >= 0 ? 1 : -1) * u / 2;
            I.y -= g, f.y += g;
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
function js(e, t = { w: 160, h: 90 }) {
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
function Ri(e, t, i) {
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
function Xt(e) {
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
const Ys = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, Ks = {
  PARTNERSHIP: "P",
  SHARED_KERNEL: "SK",
  CUSTOMER_SUPPLIER: "C/S",
  CONFORMIST: "CF",
  OPEN_HOST_SERVICE: "OHS",
  ANTI_CORRUPTION_LAYER: "ACL",
  PUBLISHED_LANGUAGE: "PL",
  SEPARATE_WAYS: "SW"
}, Xs = {
  OK: "#16a34a",
  MISSING_RELATION: "#f59e0b",
  REVERSED: "#d97706",
  EXTERNAL: "#64748b",
  INTERNAL: "#94a3b8"
}, We = 168, Ge = 56;
function et(e, t) {
  return `apiimpl:${e}@${t}`;
}
function Je(e, t) {
  return `apiop:${e}@${t}`;
}
const dn = { compact: 0, coarse: 1, full: 2 };
function ln(e, t, i) {
  const s = t === "full" ? "compact" : t === "compact" || i ? "full" : "compact", n = e ? s : t;
  return { form: n, collapsed: dn[e ? t : s] > dn[n] };
}
function jn(e, t) {
  const i = new Map((e.apis ?? []).map((s) => [s.id, s]));
  return (e.apiImplementations ?? []).filter((s) => s.moduleId === t && i.has(s.apiId)).map((s) => ({
    id: et(s.apiId, s.moduleId),
    name: i.get(s.apiId).name,
    kind: "api-impl"
  }));
}
const Yn = 34, Kn = 14, Qs = 14, Ae = 108, Me = 32, Xn = 12, Qn = 10, Nt = 2, Zs = Nt * Ae + (Nt - 1) * Xn + 2 * Kn;
function Js(e, t) {
  return `rel:${e}->${t}`;
}
function eo(e, t) {
  const i = new Set(e.externalSystems.map((s) => s.id));
  return t.sourceId === t.targetId ? "INTERNAL" : i.has(t.sourceId) || i.has(t.targetId) ? "EXTERNAL" : e.relations.some(
    (s) => s.sourceId === t.sourceId && s.targetId === t.targetId && s.declared
  ) ? "OK" : e.relations.some(
    (s) => s.sourceId === t.targetId && s.targetId === t.sourceId && s.declared
  ) ? "REVERSED" : "MISSING_RELATION";
}
function kt(e, t) {
  const i = 2 * Math.PI * e / Math.max(t, 1) - Math.PI / 2;
  return {
    x: 480 + 300 * Math.cos(i),
    y: 340 + 240 * Math.sin(i)
  };
}
const to = { symbol: "flow", fill: "#f3e8ff", stroke: "#7e22ce" }, Zn = {
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
  "etl-flow": { symbol: "gear", fill: "#f0fdfa", stroke: "#0f766e" }
}, Ni = {
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
  "etl-flow": "Integrador ETL — fuentes (pull/consumidor) → transformación → escrituras"
};
function Di(e) {
  const t = Math.max(1, Math.ceil(e / Nt)), i = t * Me + (t - 1) * Qn;
  return { w: Zs, h: Yn + i + Qs };
}
function ni(e, t) {
  const i = e % Nt, s = Math.floor(e / Nt);
  return {
    x: -t.w / 2 + Kn + i * (Ae + Xn) + Ae / 2,
    y: -t.h / 2 + Yn + s * (Me + Qn) + Me / 2
  };
}
function io(e, t, i, s, n, o, a = !1) {
  const d = (e.aggregates ?? []).filter((p) => p.moduleId === t.id), c = [
    // APIs implemented here nest first: strategic-level elements, like an external
    // system's published APIs.
    ...jn(e, t.id),
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
    ...(e.etlFlows ?? []).filter((p) => p.ownerModuleId === t.id).map((p) => ({ id: p.id, name: p.name, kind: "etl-flow" }))
  ];
  if (!c.length)
    return [{ ...s, x: i.x, y: i.y, w: We, h: Ge }];
  if (a) {
    const p = new Map((e.apis ?? []).map((f) => [f.id, f])), I = (e.apiImplementations ?? []).filter((f) => f.moduleId === t.id && p.has(f.apiId)).map((f) => {
      const y = p.get(f.apiId);
      return {
        id: et(f.apiId, f.moduleId),
        name: y.name,
        kind: "api-impl",
        badge: "API",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        tooltip: `${y.name} — la misma API, implementada en ${t.name}`,
        opKind: "api-op-occurrence",
        ops: (y.operations ?? []).map((h) => ({
          id: Je(h.id, t.id),
          name: h.name
        }))
      };
    });
    if (I.length > 0) {
      const f = c.filter((y) => y.kind !== "api-impl");
      return Jn(i, s, I, f, n, o);
    }
  }
  return At(i, s, c, n, o);
}
function Jn(e, t, i, s, n, o, a = /* @__PURE__ */ new Set()) {
  const d = o[t.id] ?? Di(i.length + s.length), c = i.map((h, r) => {
    const u = n[h.id] ?? ni(r, d), g = a.has(h.id) ? [] : h.ops, k = o[h.id] ?? Di(g.length), C = g.map((P, b) => n[P.id] ?? ni(b, k)), O = Ri(
      { x: u.x, y: u.y },
      k,
      C.map((P) => ({ dx: P.x, dy: P.y, w: Ae, h: Me }))
    );
    return { a: h, off: u, ops: g, opOffs: C, fit: O };
  }), p = s.map(
    (h, r) => n[h.id] ?? ni(i.length + r, d)
  ), I = ji(
    [
      ...c.map((h) => ({ id: h.a.id, x: h.fit.x, y: h.fit.y, w: h.fit.w, h: h.fit.h })),
      ...s.map((h, r) => ({
        id: h.id,
        x: p[r].x,
        y: p[r].y,
        w: Ae,
        h: Me
      }))
    ],
    24
  );
  for (const h of c) {
    const r = I.get(h.a.id);
    r && (h.off = { x: h.off.x + (r.x - h.fit.x), y: h.off.y + (r.y - h.fit.y) }, h.fit = { ...h.fit, x: r.x, y: r.y });
  }
  s.forEach((h, r) => {
    const u = I.get(h.id);
    u && (p[r] = { x: u.x, y: u.y });
  });
  const f = Ri(e, d, [
    ...c.map((h) => ({ dx: h.fit.x, dy: h.fit.y, w: h.fit.w, h: h.fit.h })),
    ...p.map((h) => ({ dx: h.x, dy: h.y, w: Ae, h: Me }))
  ]), y = [
    { ...t, x: f.x, y: f.y, w: f.w, h: f.h, container: !0 }
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
        w: Ae,
        h: Me,
        tooltip: `${Ni[h.a.opKind]}: ${r.name}`
      });
    });
  return s.forEach((h, r) => {
    const u = Zn[h.kind];
    y.push({
      id: h.id,
      label: h.name,
      kind: h.kind,
      x: e.x + p[r].x,
      y: e.y + p[r].y,
      w: Ae,
      h: Me,
      symbol: u.symbol,
      fill: u.fill,
      stroke: u.stroke,
      parentId: t.id,
      tooltip: `${Ni[h.kind]} ${h.name}`
    });
  }), y;
}
function At(e, t, i, s, n) {
  const o = n[t.id] ?? Di(i.length), a = i.map((f, y) => s[f.id] ?? ni(y, o)), d = ji(
    i.map((f, y) => ({ id: f.id, x: a[y].x, y: a[y].y, w: Ae, h: Me })),
    10
  );
  i.forEach((f, y) => {
    const h = d.get(f.id);
    h && (a[y] = { x: h.x, y: h.y });
  });
  const c = Ri(
    e,
    o,
    a.map((f) => ({ dx: f.x, dy: f.y, w: Ae, h: Me }))
  ), p = {
    ...t,
    x: c.x,
    y: c.y,
    w: c.w,
    h: c.h,
    container: !0
  }, I = i.map((f, y) => {
    const h = a[y], r = f.policy ? to : Zn[f.kind];
    return {
      id: f.id,
      label: f.name,
      kind: f.kind,
      x: e.x + h.x,
      y: e.y + h.y,
      w: Ae,
      h: Me,
      symbol: r.symbol,
      fill: r.fill,
      stroke: r.stroke,
      parentId: t.id,
      tooltip: `${f.policy ? "Policy" : Ni[f.kind]} ${f.name}`
    };
  });
  return [p, ...I];
}
function no(e, t, i = "contexts", s = {}, n = /* @__PURE__ */ new Set()) {
  const o = n, a = i !== "contexts", d = i === "operations", c = new Set(e.externalSystems.map((l) => l.id)), p = (e.apis ?? []).filter(
    (l) => l.publishedByExternalSystemId && c.has(l.publishedByExternalSystemId)
  ), I = new Set(p.map((l) => l.id)), f = (e.proxyApis ?? []).filter(
    (l) => l.publishedByExternalSystemId && c.has(l.publishedByExternalSystemId)
  ), y = new Set(f.map((l) => l.id)), h = [
    ...e.modules.map((l) => ({ ref: l, external: !1, api: !1, proxy: !1 })),
    ...e.externalSystems.map((l) => ({ ref: l, external: !0, api: !1, proxy: !1 })),
    ...(e.apis ?? []).filter((l) => !I.has(l.id)).map((l) => ({ ref: l, external: !1, api: !0, proxy: !1 })),
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
    const V = t[l.ref.id] ?? kt(T, h.length);
    if ("idp" in l && l.idp) {
      const K = l.ref, ae = !!K.publishedByExternalSystemId;
      return [{
        id: K.id,
        label: K.name,
        kind: "identity-provider",
        symbol: "key",
        fill: ae ? "#ffffff" : "#fefce8",
        stroke: "#ca8a04",
        dashed: ae,
        badge: K.type ?? "IDP",
        tooltip: `${K.name} — emite las identidades que el sistema confía${ae ? " (federado)" : ""}; arrastra un contexto, app o flujo ETL hasta él`,
        x: V.x,
        y: V.y,
        w: We,
        h: Ge
      }];
    }
    if ("etl" in l && l.etl) {
      const K = l.ref;
      return [{
        id: K.id,
        label: K.name,
        kind: "etl-flow",
        symbol: "gear",
        fill: "#f0fdfa",
        stroke: "#0f766e",
        dashed: !0,
        badge: "ETL",
        tooltip: `${K.name} — integrador: fuentes (pull/consumidor) → transformación → escrituras (API/BD/evento)`,
        x: V.x,
        y: V.y,
        w: We,
        h: Ge
      }];
    }
    if ("workflow" in l && l.workflow) {
      const K = l.ref;
      return [{
        id: K.id,
        label: K.name,
        kind: "workflow",
        symbol: "process",
        fill: "#ede9fe",
        stroke: "#6d28d9",
        dashed: !0,
        badge: "WORKFLOW",
        tooltip: `${K.name} — workflow${K.triggerEvent ? ` · arranca con ${K.triggerEvent}` : ""}`,
        x: V.x,
        y: V.y,
        w: We,
        h: Ge
      }];
    }
    if (l.proxy) {
      const K = l.ref, ae = {
        id: K.id,
        label: K.name,
        kind: "proxy-api",
        symbol: "interface",
        fill: "#ecfeff",
        stroke: "#0e7490",
        badge: "PROXY API",
        tooltip: `${K.name} — proxy/cache de una API, consumible como ella`
      };
      if (d && K.targetApiId) {
        const ze = (e.apis ?? []).find((lt) => lt.id === K.targetApiId), Ue = (ze == null ? void 0 : ze.operations) ?? [];
        if (Ue.length > 0)
          return At(
            V,
            ae,
            Ue.map((lt) => ({
              id: Je(lt.id, K.id),
              name: lt.name,
              kind: "api-op-occurrence"
            })),
            t,
            s
          );
      }
      return [{ ...ae, x: V.x, y: V.y, w: We, h: Ge }];
    }
    if (l.api) {
      const K = l.ref, ae = {
        id: K.id,
        label: K.name,
        kind: "api",
        symbol: "interface",
        fill: "#eef2ff",
        stroke: "#4f46e5",
        badge: "API",
        tooltip: `${K.name} — API publicada (sus operaciones apuntan a quien las implementa)`
      };
      return (n.has(K.id) ? !a : a) && K.operations.length > 0 ? At(
        V,
        { ...ae, collapsible: !0, collapsed: !1 },
        K.operations.map(
          (Ue) => ({ id: Ue.id, name: Ue.name, kind: "api-operation" })
        ),
        t,
        s
      ) : [{
        ...ae,
        collapsible: K.operations.length > 0,
        collapsed: K.operations.length > 0,
        x: V.x,
        y: V.y,
        w: We,
        h: Ge
      }];
    }
    if (l.external) {
      const K = l.ref, ae = {
        id: K.id,
        label: K.name,
        kind: "external-system",
        symbol: "component",
        fill: "#ffffff",
        stroke: "#64748b",
        dashed: !0,
        badge: "EXTERNAL",
        tooltip: `${K.name} (sistema externo)`
      }, ze = p.filter((le) => le.publishedByExternalSystemId === K.id), Ue = f.filter((le) => le.publishedByExternalSystemId === K.id), lt = Ue.map(
        (le) => ({ id: le.id, name: le.name, kind: "proxy-api" })
      ), xi = [
        ...(K.useCases ?? []).map(
          (le) => ({ id: le.id, name: le.name, kind: "external-use-case" })
        ),
        ...(K.tables ?? []).map(
          (le) => ({ id: le.id, name: le.name, kind: "external-table" })
        ),
        ...(K.mcpServers ?? []).map(
          (le) => ({ id: le.id, name: le.name, kind: "mcp-server" })
        )
      ], bi = ze.length > 0 || Ue.length > 0, _i = bi || xi.length > 0, { form: Yt, collapsed: ki } = ln(
        n.has(K.id),
        a ? "full" : bi ? "coarse" : "compact",
        xi.length > 0 || d && bi
      ), an = [
        ...lt,
        ...Yt === "full" ? xi : []
      ], $i = d && Yt === "full" ? Ue.filter((le) => {
        const bt = le.targetApiId ? (e.apis ?? []).find((Ie) => Ie.id === le.targetApiId) : void 0;
        return ((bt == null ? void 0 : bt.operations) ?? []).length > 0;
      }) : [];
      if (d && Yt === "full" && (ze.length > 0 || $i.length > 0)) {
        const le = [
          ...ze.map((Ie) => ({
            id: Ie.id,
            name: Ie.name,
            kind: "api",
            badge: "API",
            fill: "#eef2ff",
            stroke: "#4f46e5",
            tooltip: `${Ie.name} — API publicada por ${K.name}`,
            opKind: "api-operation",
            ops: (Ie.operations ?? []).map((_t) => ({ id: _t.id, name: _t.name }))
          })),
          ...$i.map((Ie) => {
            const _t = (e.apis ?? []).find((Kt) => Kt.id === Ie.targetApiId);
            return {
              id: Ie.id,
              name: Ie.name,
              kind: "proxy-api",
              badge: "PROXY API",
              fill: "#ecfeff",
              stroke: "#0e7490",
              tooltip: `${Ie.name} — proxy/cache de ${_t.name}`,
              opKind: "api-op-occurrence",
              ops: (_t.operations ?? []).map((Kt) => ({
                id: Je(Kt.id, Ie.id),
                name: Kt.name
              }))
            };
          })
        ], bt = new Set($i.map((Ie) => Ie.id));
        return Jn(
          V,
          { ...ae, collapsible: !0, collapsed: ki },
          le,
          an.filter((Ie) => !bt.has(Ie.id)),
          t,
          s,
          o
        );
      }
      const rn = Yt === "compact" ? [] : [
        ...ze.map((le) => ({ id: le.id, name: le.name, kind: "api" })),
        ...an
      ];
      return rn.length > 0 ? At(
        V,
        { ...ae, collapsible: _i, collapsed: ki },
        rn,
        t,
        s
      ) : [{
        ...ae,
        collapsible: _i,
        collapsed: _i && ki,
        x: V.x,
        y: V.y,
        w: We,
        h: Ge
      }];
    }
    const J = l.ref, ee = J.subdomainType ?? "GENERIC", de = {
      id: J.id,
      label: J.name,
      kind: "module",
      symbol: "component",
      fill: Ys[ee],
      stroke: "#94a3b8",
      badge: ee,
      tooltip: `${J.name} — subdominio ${ee}`
    }, Ce = jn(e, J.id), wt = (e.aggregates ?? []).some((K) => K.moduleId === J.id) || (J.useCases ?? []).length > 0 || (J.domainEvents ?? []).length > 0 || (J.applicationEvents ?? []).length > 0 || (J.readModels ?? []).length > 0 || (J.domainServices ?? []).length > 0 || (J.queryServices ?? []).length > 0 || (J.scheduledTriggers ?? []).length > 0 || (e.etlFlows ?? []).some((K) => K.ownerModuleId === J.id), Xe = wt || Ce.length > 0, { form: xt, collapsed: dt } = ln(
      n.has(J.id),
      a ? "full" : Ce.length > 0 ? "coarse" : "compact",
      wt
    );
    return xt === "full" && Xe ? io(
      e,
      J,
      V,
      { ...de, collapsible: !0, collapsed: dt },
      t,
      s,
      d
    ) : xt === "coarse" && Ce.length > 0 ? At(
      V,
      { ...de, collapsible: Xe, collapsed: dt },
      Ce,
      t,
      s
    ) : [{
      ...de,
      collapsible: Xe,
      collapsed: Xe && dt,
      x: V.x,
      y: V.y,
      w: We,
      h: Ge
    }];
  }), u = h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + (e.mcpGateways ?? []).length;
  (e.actors ?? []).forEach((l, T) => {
    const V = t[l.id] ?? kt(h.length + T, u);
    r.push({
      id: l.id,
      label: l.name,
      x: V.x,
      y: V.y,
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
    const V = t[l.id] ?? kt(h.length + (e.actors ?? []).length + T, u);
    r.push({
      id: l.id,
      label: l.name,
      x: V.x,
      y: V.y,
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
    const V = t[l.id] ?? kt(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + (e.rags ?? []).length + T,
      u
    );
    r.push({
      id: l.id,
      label: l.name,
      x: V.x,
      y: V.y,
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
  const g = [];
  (e.rags ?? []).forEach((l, T) => {
    const V = t[l.id] ?? kt(
      h.length + (e.actors ?? []).length + (e.aiAgents ?? []).length + T,
      u
    );
    r.push({
      id: l.id,
      label: l.name,
      x: V.x,
      y: V.y,
      w: 132,
      h: 48,
      kind: "rag",
      symbol: "lens",
      fill: "#ecfeff",
      stroke: "#0e7490",
      badge: "RAG",
      tooltip: `${l.name} (base de conocimiento — retrieval para agentes)`
    }), (l.contentSources ?? []).forEach((J, ee) => {
      const de = `ragcs:${l.id}:${J.uri}`, Ce = t[de] ?? { x: V.x + 170, y: V.y - 30 + ee * 44 };
      r.push({
        id: de,
        label: J.uri.replace(/^[a-z+]+:\/\//, "").slice(0, 24),
        x: Ce.x,
        y: Ce.y,
        w: 150,
        h: 34,
        kind: "rag-content-source",
        fill: "#ffffff",
        stroke: "#0e7490",
        dashed: !0,
        badge: J.type,
        tooltip: `${J.type}: ${J.uri}`
      }), g.push({
        id: `ragcse:${l.id}:${J.uri}`,
        sourceId: de,
        targetId: l.id,
        kind: "rag-content",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "alimenta el índice"
      });
    });
  }), r.sort((l, T) => (l.parentId ? 1 : 0) - (T.parentId ? 1 : 0));
  const k = e.relations.map((l) => ({
    id: Js(l.sourceId, l.targetId),
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "relation",
    label: l.type ? Ks[l.type] : "?",
    color: l.declared ? "#475569" : "#94a3b8",
    dashed: !l.declared,
    arrow: !0,
    tooltip: l.type ? `${l.type} (${l.sourceId} upstream → ${l.targetId} downstream)${l.reasons ? ` — ${l.reasons}` : ""}` : `Relación derivada — doble click para elegir el patrón${l.reasons ? ` — ${l.reasons}` : ""}`
  })), C = e.flows.map((l) => {
    var Ce, wt, Xe, xt, dt, K;
    const T = eo(e, l), V = a ? e.modules.find((ae) => ae.id === l.sourceId) : void 0, J = ((Ce = V == null ? void 0 : V.domainEvents) == null ? void 0 : Ce.find((ae) => ae.name === l.triggerEvent)) ?? ((wt = V == null ? void 0 : V.applicationEvents) == null ? void 0 : wt.find((ae) => ae.name === l.triggerEvent)), ee = a && l.readModelName ? (xt = (Xe = e.modules.find((ae) => ae.id === l.targetId)) == null ? void 0 : Xe.readModels) == null ? void 0 : xt.find((ae) => ae.name === l.readModelName) : void 0, de = a && l.targetUseCaseId ? (K = (dt = e.modules.find((ae) => ae.id === l.targetId)) == null ? void 0 : dt.useCases) == null ? void 0 : K.find((ae) => ae.id === l.targetUseCaseId) : void 0;
    return {
      id: `flow:${l.id}`,
      sourceId: (J == null ? void 0 : J.id) ?? l.sourceId,
      targetId: (de == null ? void 0 : de.id) ?? (ee == null ? void 0 : ee.id) ?? l.targetId,
      kind: "flow",
      label: l.name,
      color: Xs[T],
      dashed: !0,
      arrow: !0,
      tooltip: `Flow ${l.name} [${l.archetype}] — ${T}`
    };
  }), O = new Map((e.apis ?? []).map((l) => [l.id, l])), P = new Set(e.modules.map((l) => l.id)), b = (e.apiImplementations ?? []).filter(
    (l) => O.has(l.apiId) && P.has(l.moduleId)
  ), x = new Set(r.map((l) => l.id)), A = a ? (e.emissions ?? []).filter((l) => x.has(l.sourceId) && x.has(l.domainEventId)).map((l) => ({
    id: `emit:${l.sourceId}->${l.domainEventId}`,
    sourceId: l.sourceId,
    targetId: l.domainEventId,
    kind: "emission",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "emite"
  })) : [], L = a ? (e.projections ?? []).map((l) => ({
    p: l,
    source: l.sourceAggregateId ?? l.sourceExternalUseCaseId ?? l.sourceExternalTableId
  })).filter(({ p: l, source: T }) => T && l.readModelId).filter(({ p: l, source: T }) => x.has(T) && x.has(l.readModelId)).map(({ p: l, source: T }) => ({
    id: `proj:${l.id}`,
    sourceId: T,
    targetId: l.readModelId,
    kind: "projection",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: l.sourceAggregateId ? `Proyección ${l.name}: el estado del agregado se materializa en ${l.readModelName ?? l.readModelId}` : `Proyección ${l.name}: polling hacia ${l.readModelName ?? l.readModelId}`
  })) : [], R = (e.apis ?? []).flatMap(
    (l) => l.operations.flatMap((T) => {
      const V = a && T.targetUseCaseId && x.has(T.targetUseCaseId) ? T.targetUseCaseId : T.targetModuleId && x.has(T.targetModuleId) ? T.targetModuleId : (T.targetUseCaseId && !a, null);
      if (!V) return [];
      const J = a && x.has(T.id) ? T.id : l.id;
      return x.has(J) ? [
        {
          id: `apiwire:${T.id}`,
          sourceId: J,
          targetId: V,
          kind: "api-wire",
          color: "#4f46e5",
          dashed: !0,
          arrow: !0,
          tooltip: `${T.name} la implementa ${V}`
        }
      ] : [];
    })
  ), z = a ? (e.useCaseCalls ?? []).filter((l) => x.has(l.sourceId) && x.has(l.targetId)).map((l) => ({
    id: `uccall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "uc-call",
    color: "#0891b2",
    dashed: !0,
    arrow: !0,
    tooltip: "invoca"
  })) : [], D = [
    ...e.modules.filter((l) => l.identityProviderId && x.has(l.id) && x.has(l.identityProviderId)).map((l) => ({
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
    ...(e.etlFlows ?? []).filter((l) => l.identityProviderId && x.has(l.identityProviderId)).flatMap((l) => {
      const T = x.has(l.id) ? l.id : l.ownerModuleId && x.has(l.ownerModuleId) ? l.ownerModuleId : null;
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
    ...(e.identityProviders ?? []).filter((l) => l.publishedByExternalSystemId && x.has(l.id) && x.has(l.publishedByExternalSystemId)).map((l) => ({
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
  ], U = a ? e.modules.flatMap((l) => l.scheduledTriggers ?? []).filter((l) => l.useCaseId && x.has(l.id) && x.has(l.useCaseId)).map((l) => ({
    id: `stfire:${l.id}->${l.useCaseId}`,
    sourceId: l.id,
    targetId: l.useCaseId,
    kind: "st-fire",
    color: "#d97706",
    label: l.cronExpression ?? "cron",
    dashed: !0,
    arrow: !0,
    tooltip: `dispara según ${l.cronExpression ?? "cron"}`
  })) : [], re = a ? (e.aggregateCalls ?? []).filter((l) => x.has(l.sourceId) && x.has(l.targetId)).map((l) => ({
    id: `aggcall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "agg-call",
    color: "#b45309",
    dashed: !0,
    arrow: !0,
    tooltip: "opera sobre el agregado"
  })) : [], m = a ? (e.queryCalls ?? []).filter((l) => x.has(l.sourceId) && x.has(l.targetId)).map((l) => ({
    id: `qscall:${l.sourceId}->${l.targetId}`,
    sourceId: l.sourceId,
    targetId: l.targetId,
    kind: "qs-call",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta"
  })) : [], v = a ? (e.actorUses ?? []).filter((l) => x.has(l.actorId) && x.has(l.targetId)).map((l) => ({
    id: `use:${l.actorId}->${l.targetId}`,
    sourceId: l.actorId,
    targetId: l.targetId,
    kind: "actor-use",
    color: "#6366f1",
    arrow: !0,
    tooltip: "usa (deriva una UI)"
  })) : [], w = (e.actorExternalDependencies ?? []).filter((l) => x.has(l.actorId) && x.has(l.externalSystemId)).map((l) => ({
    id: `extdep:${l.actorId}->${l.externalSystemId}`,
    sourceId: l.actorId,
    targetId: l.externalSystemId,
    kind: "actor-ext",
    color: "#64748b",
    dashed: !0,
    arrow: !0,
    tooltip: "depende de"
  })), _ = new Map([
    ...(e.apis ?? []).filter((l) => l.publishedByExternalSystemId).map((l) => [l.id, l.publishedByExternalSystemId]),
    ...(e.proxyApis ?? []).filter((l) => l.publishedByExternalSystemId).map((l) => [l.id, l.publishedByExternalSystemId])
  ]), M = (l) => x.has(l) ? l : _.get(l) ?? l, S = [
    ...new Map(
      (e.externalSystemDependencies ?? []).map((l) => ({
        sourceId: l.sourceId,
        targetId: M(l.targetId),
        cqrs: l.type === "CQRS"
      })).filter(
        (l) => x.has(l.sourceId) && x.has(l.targetId) && l.sourceId !== l.targetId
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
  ], E = /* @__PURE__ */ new Map();
  for (const l of e.modules) {
    for (const T of l.useCases ?? []) E.set(T.id, l.id);
    for (const T of l.domainEvents ?? []) E.set(T.id, l.id);
    for (const T of l.applicationEvents ?? []) E.set(T.id, l.id);
  }
  const N = (l) => x.has(l) ? l : E.get(l) ?? l, B = /* @__PURE__ */ new Map();
  for (const l of e.modules) {
    for (const T of l.domainEvents ?? []) B.set(T.name, T.id);
    for (const T of l.applicationEvents ?? []) B.set(T.name, T.id);
  }
  const ie = [
    ...new Map(
      (e.workflows ?? []).flatMap(
        (l) => (l.steps ?? []).filter((T) => T.targetUseCaseId).map((T) => ({ sourceId: l.id, targetId: N(T.targetUseCaseId) }))
      ).filter((l) => x.has(l.sourceId) && x.has(l.targetId)).map((l) => [
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
  ], Z = [
    ...new Map(
      (e.workflows ?? []).filter((l) => l.triggerEvent && B.has(l.triggerEvent)).map((l) => ({
        sourceId: N(B.get(l.triggerEvent)),
        targetId: l.id,
        label: l.triggerEvent
      })).filter((l) => x.has(l.sourceId) && x.has(l.targetId)).map((l) => [
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
  ], H = /* @__PURE__ */ new Map();
  for (const l of e.externalSystems)
    for (const T of l.tables ?? []) H.set(T.id, l.id);
  const G = (e.etlFlows ?? []).flatMap(
    (l) => (l.steps ?? []).flatMap((T) => {
      const V = x.has(l.id) ? l.id : l.ownerModuleId && x.has(l.ownerModuleId) ? l.ownerModuleId : null;
      if (!V) return [];
      const J = T.externalTableId ?? T.operationId ?? T.apiId ?? T.eventId;
      if (!J) return [];
      let ee = J;
      if (!x.has(ee) && T.operationId && T.apiId && (ee = T.apiId), !x.has(ee) && T.externalTableId && (ee = H.get(T.externalTableId) ?? ee), x.has(ee) || (ee = M(ee)), x.has(ee) || (ee = E.get(J) ?? ee), !x.has(ee) || ee === V) return [];
      const de = T.type.startsWith("SOURCE");
      return [{
        id: `etl:${l.id}:${T.id}`,
        sourceId: de ? ee : V,
        targetId: de ? V : ee,
        kind: de ? "etl-source" : "etl-write",
        color: "#0f766e",
        label: T.type === "SOURCE_PULL" ? "pull" : T.type === "SOURCE_CONSUMER" ? "consume" : T.type === "WRITE_API" ? "api" : T.type === "WRITE_DB" ? "bd" : "evento",
        dashed: !0,
        arrow: !0,
        tooltip: de ? `${l.name} lee de aquí (${T.type === "SOURCE_PULL" ? "pull" : "consumidor"})` : `${l.name} escribe aquí — Supr quita el paso`
      }];
    })
  ), F = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (l) => (l.sourceExternalTableIds ?? []).map((T) => ({
          sourceId: x.has(T) ? T : H.get(T) ?? T,
          targetId: l.id,
          name: l.name
        }))
      ).filter((l) => x.has(l.sourceId) && x.has(l.targetId)).map((l) => [
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
  ], j = [
    ...new Map(
      (e.rags ?? []).flatMap(
        (l) => (l.sourceApiIds ?? []).map((T) => ({
          sourceId: M(T),
          targetId: l.id,
          name: l.name
        }))
      ).filter((l) => x.has(l.sourceId) && x.has(l.targetId)).map((l) => [
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
  ], he = [
    ...new Map(
      (e.rags ?? []).flatMap((l) => [
        ...(l.sourceExternalSystemIds ?? []).map((T) => ({ sourceId: T, targetId: l.id, name: l.name })),
        ...(l.sourceModuleIds ?? []).map((T) => ({ sourceId: T, targetId: l.id, name: l.name }))
      ]).filter((l) => x.has(l.sourceId) && x.has(l.targetId)).map((l) => [
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
  ], we = [
    ...new Map(
      (e.agentApiUses ?? []).map((l) => ({ sourceId: l.agentId, targetId: M(l.apiId) })).filter((l) => x.has(l.sourceId) && x.has(l.targetId)).map((l) => [
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
  ], Se = (l) => l.onCompletionEventName || `${l.name.replace(/\s+/g, "")}Completado`, ve = (e.workflows ?? []).flatMap(
    (l) => l.triggerEvent ? (e.workflows ?? []).filter((T) => T.id !== l.id && Se(T) === l.triggerEvent).filter((T) => x.has(T.id) && x.has(l.id)).map((T) => ({
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
      (e.proxyApis ?? []).filter((l) => l.targetApiId).map((l) => ({ sourceId: M(l.id), targetId: M(l.targetApiId) })).filter(
        (l) => x.has(l.sourceId) && x.has(l.targetId) && l.sourceId !== l.targetId
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
  ], Gt = b.flatMap((l) => {
    const T = et(l.apiId, l.moduleId);
    if (!x.has(T)) return [];
    const V = [];
    for (const J of (e.proxyApis ?? []).filter((ee) => ee.targetApiId === l.apiId)) {
      const ee = M(J.id);
      x.has(ee) && ee !== T && V.push({
        id: `pxr:${ee}->${T}`,
        sourceId: ee,
        targetId: T,
        kind: "proxy-route",
        color: "#0e7490",
        dashed: !0,
        arrow: !0,
        tooltip: "enruta también a"
      });
    }
    return V;
  }), rt = (e.proxyOperationRoutes ?? []).flatMap((l) => {
    const T = (e.proxyApis ?? []).find((ee) => ee.id === l.proxyId);
    if (!(T != null && T.targetApiId)) return [];
    const V = Je(l.operationId, l.proxyId), J = l.targetSiteId === T.targetApiId ? T.targetApiId : et(T.targetApiId, l.targetSiteId);
    return !x.has(V) || !x.has(J) ? [] : [{
      id: `oproute:${V}->${J}`,
      sourceId: V,
      targetId: J,
      kind: "op-route",
      color: "#0e7490",
      arrow: !0,
      tooltip: "enruta esta operación a"
    }];
  }), jt = [
    ...new Map(
      (e.externalOperationUses ?? []).map((l) => {
        if (!x.has(l.externalSystemId)) return null;
        const T = (e.apis ?? []).find(
          (de) => de.operations.some((Ce) => Ce.id === l.operationId)
        );
        if (!T) return null;
        const V = l.siteId === T.id, J = V ? l.operationId : Je(l.operationId, l.siteId);
        let ee = x.has(J) ? J : null;
        if (!ee)
          if (V || (e.proxyApis ?? []).some((de) => de.id === l.siteId))
            ee = M(l.siteId);
          else {
            const de = et(T.id, l.siteId);
            ee = x.has(de) ? de : l.siteId;
          }
        return !ee || !x.has(ee) || ee === l.externalSystemId ? null : { u: l, target: ee };
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
  ], Os = a ? (e.apiOperationImplementations ?? []).flatMap((l) => {
    if (!x.has(l.useCaseId)) return [];
    const T = x.has(Je(l.operationId, l.moduleId)) ? Je(l.operationId, l.moduleId) : x.has(et(l.apiId, l.moduleId)) ? et(l.apiId, l.moduleId) : x.has(M(l.moduleId)) ? M(l.moduleId) : null;
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
  }) : [], Ts = a ? (e.agentUses ?? []).filter((l) => x.has(l.agentId) && x.has(l.useCaseId)).map((l) => ({
    id: `mcp:${l.agentId}->${l.useCaseId}`,
    sourceId: l.agentId,
    targetId: l.useCaseId,
    kind: "agent-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume por MCP (exposedAsMcp)"
  })) : [], Rs = (e.agentRags ?? []).filter((l) => x.has(l.agentId) && x.has(l.ragId)).map((l) => ({
    id: `agrag:${l.agentId}->${l.ragId}`,
    sourceId: l.agentId,
    targetId: l.ragId,
    kind: "agent-rag",
    color: "#0e7490",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta la base de conocimiento (retrieval)"
  })), Ns = a ? (e.rags ?? []).filter((l) => x.has(l.id)).flatMap(
    (l) => (l.sourceReadModelIds ?? []).filter((T) => x.has(T)).map((T) => ({
      id: `ragsrc:${l.id}->${T}`,
      sourceId: l.id,
      targetId: T,
      kind: "rag-source",
      color: "#0e7490",
      dashed: !0,
      arrow: !0,
      tooltip: `${l.name} indexa este read model`
    }))
  ) : [], Ds = a ? (e.agentExternalUses ?? []).filter((l) => x.has(l.agentId) && x.has(l.externalUseCaseId)).map((l) => ({
    id: `mcpx:${l.agentId}->${l.externalUseCaseId}`,
    sourceId: l.agentId,
    targetId: l.externalUseCaseId,
    kind: "agent-external-use",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación del sistema externo"
  })) : [], Ls = a ? (e.agentMcpUses ?? []).filter((l) => x.has(l.agentId) && x.has(l.mcpServerId)).map((l) => ({
    id: `mcpsv:${l.agentId}->${l.mcpServerId}`,
    sourceId: l.agentId,
    targetId: l.mcpServerId,
    kind: "agent-mcp",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume las herramientas del servidor MCP"
  })) : [], zs = (e.mcpGateways ?? []).flatMap(
    (l) => [
      ...l.mcpServerIds ?? [],
      ...l.apiIds ?? [],
      ...l.apiOperationIds ?? [],
      ...l.useCaseIds ?? [],
      ...l.ragIds ?? []
    ].filter((T) => x.has(l.id) && x.has(T)).map((T) => ({
      id: `gwx:${l.id}->${T}`,
      sourceId: l.id,
      targetId: T,
      kind: "gateway-exposure",
      color: "#7c3aed",
      dashed: !0,
      arrow: !0,
      tooltip: "lo agrega/expone como herramienta MCP"
    }))
  ), Us = (e.agentGatewayUses ?? []).filter((l) => x.has(l.agentId) && x.has(l.gatewayId)).map((l) => ({
    id: `aggw:${l.agentId}->${l.gatewayId}`,
    sourceId: l.agentId,
    targetId: l.gatewayId,
    kind: "agent-gateway",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "consume la superficie de herramientas del gateway MCP"
  })), qs = a ? (e.agentApiOpUses ?? []).filter((l) => x.has(l.agentId) && x.has(l.apiOperationId)).map((l) => ({
    id: `agapi:${l.agentId}->${l.apiOperationId}`,
    sourceId: l.agentId,
    targetId: l.apiOperationId,
    kind: "agent-api-op",
    color: "#9333ea",
    dashed: !0,
    arrow: !0,
    tooltip: "llama a la operación de API como herramienta"
  })) : [], Fs = a ? (e.agentQueryUses ?? []).filter((l) => x.has(l.agentId) && x.has(l.queryServiceId)).map((l) => ({
    id: `agqs:${l.agentId}->${l.queryServiceId}`,
    sourceId: l.agentId,
    targetId: l.queryServiceId,
    kind: "agent-query",
    color: "#0d9488",
    dashed: !0,
    arrow: !0,
    tooltip: "consulta el query service (herramienta de lectura)"
  })) : [], Bs = (e.agentDelegations ?? []).filter((l) => x.has(l.agentId) && x.has(l.delegateAgentId)).map((l) => ({
    id: `agag:${l.agentId}->${l.delegateAgentId}`,
    sourceId: l.agentId,
    targetId: l.delegateAgentId,
    kind: "agent-delegate",
    color: "#9333ea",
    arrow: !0,
    tooltip: "delega trabajo en el otro agente"
  })), Vs = (e.actorAgentUses ?? []).filter((l) => x.has(l.actorId) && x.has(l.agentId)).map((l) => ({
    id: `useag:${l.actorId}->${l.agentId}`,
    sourceId: l.actorId,
    targetId: l.agentId,
    kind: "actor-agent",
    color: "#6366f1",
    arrow: !0,
    tooltip: "habla con el agente (deriva una UI de chat/supervisión)"
  })), Hs = a ? (e.agentTriggers ?? []).filter((l) => x.has(l.eventId) && x.has(l.agentId)).map((l) => ({
    id: `evag:${l.eventId}->${l.agentId}`,
    sourceId: l.eventId,
    targetId: l.agentId,
    kind: "agent-trigger",
    color: "#f59e0b",
    dashed: !0,
    arrow: !0,
    tooltip: "el evento dispara una ejecución del agente (agente reactivo)"
  })) : [], Ws = a ? (e.externalCalls ?? []).filter((l) => x.has(l.externalSystemId) && x.has(l.useCaseId)).map((l) => ({
    id: `extcall:${l.externalSystemId}->${l.useCaseId}`,
    sourceId: l.externalSystemId,
    targetId: l.useCaseId,
    kind: "external-call",
    color: "#7c3aed",
    arrow: !0,
    tooltip: "llama (entra por un ACL)"
  })) : [], Gs = a ? (e.externalUseCaseCalls ?? []).filter((l) => x.has(l.sourceId) && x.has(l.targetId)).map((l) => ({
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
      ...C,
      ...A,
      ...L,
      ...R,
      ...z,
      ...U,
      ...D,
      ...G,
      ...re,
      ...m,
      ...v,
      ...w,
      ...S,
      ...Ve,
      ...Gt,
      ...rt,
      ...jt,
      ...Os,
      ...ie,
      ...Z,
      ...ve,
      ...we,
      ...F,
      ...j,
      ...he,
      ...Ts,
      ...Ds,
      ...Ls,
      ...zs,
      ...Us,
      ...qs,
      ...Fs,
      ...Bs,
      ...Vs,
      ...Hs,
      ...Rs,
      ...Ns,
      ...g,
      ...Ws,
      ...Gs
    ]
  };
}
const so = {
  CORE: "#fef3c7",
  SUPPORTING: "#e0e7ff",
  GENERIC: "#f1f5f9"
}, oo = 176, ao = 60, ro = 140, lo = 40;
function co(e) {
  const t = {}, i = e.aggregates ?? [], s = e.entities ?? [];
  return e.modules.forEach((n, o) => {
    const a = 220 + o * 340;
    i.filter((c) => c.moduleId === n.id).forEach((c, p) => {
      const I = s.filter((y) => y.aggregateId === c.id).length, f = 140 + p * (170 + I * 60);
      t[c.id] = { x: a, y: f }, s.filter((y) => y.aggregateId === c.id).forEach((y, h) => {
        t[y.id] = { x: a + 60, y: f + 100 + h * 60 };
      });
    });
  }), i.filter((n) => !e.modules.some((o) => o.id === n.moduleId)).forEach((n, o) => {
    t[n.id] = { x: 220 + o * 340, y: 640 };
  }), t;
}
function po(e, t) {
  const i = co(e), s = (p) => t[p] ?? i[p] ?? { x: 200, y: 200 }, n = new Map(e.modules.map((p) => [p.id, p])), o = (e.aggregates ?? []).map((p) => {
    const I = n.get(p.moduleId), f = (I == null ? void 0 : I.subdomainType) ?? "GENERIC", y = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: y.x,
      y: y.y,
      w: oo,
      h: ao,
      kind: "aggregate",
      symbol: "aggregate",
      fill: so[f],
      stroke: "#64748b",
      badge: I ? `${I.name.toUpperCase()} · AGGREGATE` : "AGGREGATE",
      tooltip: `Agregado ${p.name}${I ? ` — módulo ${I.name} (${f})` : ""}`
    };
  }), a = (e.entities ?? []).map((p) => {
    const I = s(p.id);
    return {
      id: p.id,
      label: p.name,
      x: I.x,
      y: I.y,
      w: ro,
      h: lo,
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
  })), c = (e.aggregateReferences ?? []).map((p, I) => ({
    id: `aggref:${I}:${p.sourceAggregateId}->${p.targetAggregateId}`,
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
const uo = {
  MATERIALIZES: "#0d9488",
  TRIGGERS: "#2563eb",
  ORCHESTRATES: "#7c3aed",
  NOTIFIES: "#ea580c"
}, mo = 150, ho = 44, fo = 190, go = 56, Io = 160, yo = 48;
function vo(e, t) {
  const i = e.externalSystems.find((n) => n.id === t.targetId);
  if (i) return { id: i.id, label: i.name, external: !0 };
  const s = e.modules.find((n) => n.id === t.targetId);
  return { id: t.targetId, label: (s == null ? void 0 : s.name) ?? t.targetId, external: !1 };
}
function wo(e, t) {
  const i = e.flows, s = [], n = [], o = /* @__PURE__ */ new Set(), a = (d) => {
    var c, p;
    return ((p = (c = e.aggregates) == null ? void 0 : c.find((I) => I.id === d)) == null ? void 0 : p.name) ?? d ?? "?";
  };
  return i.forEach((d, c) => {
    const p = 120 + c * 130, I = uo[d.archetype] ?? "#475569", f = d.triggerAggregateId ?? d.sourceId;
    if (!o.has(f)) {
      o.add(f);
      const g = t[f] ?? { x: 160, y: p };
      s.push({
        id: f,
        label: d.triggerAggregateId ? a(d.triggerAggregateId) : f,
        x: g.x,
        y: g.y,
        w: mo,
        h: ho,
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
      w: fo,
      h: go,
      kind: "flow",
      symbol: "flow",
      fill: "#ffffff",
      stroke: I,
      badge: d.archetype,
      tooltip: `Flow ${d.name} [${d.archetype}]${d.readModelName ? ` → read model ${d.readModelName}` : ""}${d.targetUseCaseId ? ` → use case ${d.targetUseCaseId}` : ""}`
    });
    const r = vo(e, d), u = `tgt:${r.id}`;
    if (!o.has(u)) {
      o.add(u);
      const g = t[u] ?? { x: 790, y: p };
      s.push({
        id: u,
        label: r.label,
        x: g.x,
        y: g.y,
        w: Io,
        h: yo,
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
      sourceId: f,
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
      color: I,
      arrow: !0
    });
  }), { nodes: s, edges: n };
}
const xo = 190, bo = 56, Ei = 170, _o = 52;
function cn(e, t) {
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
      w: xo,
      h: bo,
      kind: "process",
      symbol: "process",
      fill: "#f5f3ff",
      stroke: "#7c3aed",
      badge: `PROCESS${o.sla ? ` · SLA ${o.sla}` : ""}`,
      tooltip: `${o.name}${n(o.ownerModuleId) ? ` — módulo ${n(o.ownerModuleId)}` : ""}${o.triggerEvent ? ` · arranca con ${o.triggerEvent}` : ""}`
    });
    let p = o.id;
    if (o.steps.forEach((I, f) => {
      const y = I.type === "HUMAN", h = t[I.id] ?? { x: 150 + (f + 1) * 240, y: d };
      if (i.push({
        id: I.id,
        label: I.name,
        x: h.x,
        y: h.y,
        w: Ei,
        h: _o,
        kind: "process-step",
        symbol: y ? "person" : "gear",
        fill: y ? "#fef3c7" : "#ffffff",
        stroke: y ? "#d97706" : "#64748b",
        badge: y ? `HUMAN${I.roleId ? ` · ${I.roleId}` : ""}${I.deadline ? ` · ⏱ ${I.deadline}` : ""}` : "AUTOMATED",
        tooltip: `${I.name}${I.useCaseId ? ` — use case ${I.useCaseId}` : ""}${I.deadline ? ` · deadline ${I.deadline}` : ""}`
      }), s.push({
        id: `pe:${o.id}:${f}`,
        sourceId: p,
        targetId: I.id,
        kind: "process-seq",
        label: f === 0 ? o.triggerEvent : void 0,
        color: "#64748b",
        arrow: !0
      }), I.compensationUseCaseId) {
        const r = `comp:${I.id}`, u = t[r] ?? { x: h.x, y: h.y + 90 };
        i.push({
          id: r,
          label: I.compensationUseCaseId,
          x: u.x,
          y: u.y,
          w: Ei,
          h: 36,
          kind: "compensation",
          symbol: "undo",
          fill: "#ffffff",
          stroke: "#dc2626",
          dashed: !0,
          badge: "COMPENSACIÓN"
        }), s.push({
          id: `pc:${I.id}`,
          sourceId: I.id,
          targetId: r,
          kind: "process-compensation",
          color: "#dc2626",
          dashed: !0,
          arrow: !0
        });
      }
      p = I.id;
    }), o.onCompletionEventName) {
      const I = `done:${o.id}`, f = t[I] ?? { x: 150 + (o.steps.length + 1) * 240, y: d };
      i.push({
        id: I,
        label: o.onCompletionEventName,
        x: f.x,
        y: f.y,
        w: Ei,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      }), s.push({
        id: `pd:${o.id}`,
        sourceId: p,
        targetId: I,
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
const si = globalThis, Yi = si.ShadowRoot && (si.ShadyCSS === void 0 || si.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ki = Symbol(), pn = /* @__PURE__ */ new WeakMap();
let es = class {
  constructor(t, i, s) {
    if (this._$cssResult$ = !0, s !== Ki) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = i;
  }
  get styleSheet() {
    let t = this.o;
    const i = this.t;
    if (Yi && t === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (t = pn.get(i)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && pn.set(i, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ko = (e) => new es(typeof e == "string" ? e : e + "", void 0, Ki), yt = (e, ...t) => {
  const i = e.length === 1 ? e[0] : t.reduce((s, n, o) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + e[o + 1], e[0]);
  return new es(i, e, Ki);
}, $o = (e, t) => {
  if (Yi) e.adoptedStyleSheets = t.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of t) {
    const s = document.createElement("style"), n = si.litNonce;
    n !== void 0 && s.setAttribute("nonce", n), s.textContent = i.cssText, e.appendChild(s);
  }
}, un = Yi ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let i = "";
  for (const s of t.cssRules) i += s.cssText;
  return ko(i);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Eo, defineProperty: So, getOwnPropertyDescriptor: Co, getOwnPropertyNames: Ao, getOwnPropertySymbols: Mo, getPrototypeOf: Po } = Object, Ke = globalThis, mn = Ke.trustedTypes, Oo = mn ? mn.emptyScript : "", Si = Ke.reactiveElementPolyfillSupport, Ot = (e, t) => e, li = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? Oo : null;
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
} }, Xi = (e, t) => !Eo(e, t), hn = { attribute: !0, type: String, converter: li, reflect: !1, useDefault: !1, hasChanged: Xi };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Ke.litPropertyMetadata ?? (Ke.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let pt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, i = hn) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(t, i), !i.noAccessor) {
      const s = Symbol(), n = this.getPropertyDescriptor(t, s, i);
      n !== void 0 && So(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    const { get: n, set: o } = Co(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? hn;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ot("elementProperties"))) return;
    const t = Po(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ot("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ot("properties"))) {
      const i = this.properties, s = [...Ao(i), ...Mo(i)];
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
      for (const n of s) i.unshift(un(n));
    } else t !== void 0 && i.push(un(t));
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
    return $o(t, this.constructor.elementStyles), t;
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
      const a = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : li).toAttribute(i, s.type);
      this._$Em = t, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(t, i) {
    var o, a;
    const s = this.constructor, n = s._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const d = s.getPropertyOptions(n), c = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((o = d.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? d.converter : li;
      this._$Em = n;
      const p = c.fromAttribute(i, d.type);
      this[n] = p ?? ((a = this._$Ej) == null ? void 0 : a.get(n)) ?? p, this._$Em = null;
    }
  }
  requestUpdate(t, i, s, n = !1, o) {
    var a;
    if (t !== void 0) {
      const d = this.constructor;
      if (n === !1 && (o = this[t]), s ?? (s = d.getPropertyOptions(t)), !((s.hasChanged ?? Xi)(o, i) || s.useDefault && s.reflect && o === ((a = this._$Ej) == null ? void 0 : a.get(t)) && !this.hasAttribute(d._$Eu(t, s)))) return;
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
pt.elementStyles = [], pt.shadowRootOptions = { mode: "open" }, pt[Ot("elementProperties")] = /* @__PURE__ */ new Map(), pt[Ot("finalized")] = /* @__PURE__ */ new Map(), Si == null || Si({ ReactiveElement: pt }), (Ke.reactiveElementVersions ?? (Ke.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = globalThis, fn = (e) => e, ci = Tt.trustedTypes, gn = ci ? ci.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, ts = "$lit$", Ye = `lit$${Math.random().toFixed(9).slice(2)}$`, is = "?" + Ye, To = `<${is}>`, ot = document, Dt = () => ot.createComment(""), Lt = (e) => e === null || typeof e != "object" && typeof e != "function", Qi = Array.isArray, Ro = (e) => Qi(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", Ci = `[ 	
\f\r]`, $t = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, In = /-->/g, yn = />/g, Qe = RegExp(`>|${Ci}(?:([^\\s"'>=/]+)(${Ci}*=${Ci}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), vn = /'/g, wn = /"/g, ns = /^(?:script|style|textarea|title)$/i, ss = (e) => (t, ...i) => ({ _$litType$: e, strings: t, values: i }), $ = ss(1), X = ss(2), ht = Symbol.for("lit-noChange"), te = Symbol.for("lit-nothing"), xn = /* @__PURE__ */ new WeakMap(), tt = ot.createTreeWalker(ot, 129);
function os(e, t) {
  if (!Qi(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return gn !== void 0 ? gn.createHTML(t) : t;
}
const No = (e, t) => {
  const i = e.length - 1, s = [];
  let n, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = $t;
  for (let d = 0; d < i; d++) {
    const c = e[d];
    let p, I, f = -1, y = 0;
    for (; y < c.length && (a.lastIndex = y, I = a.exec(c), I !== null); ) y = a.lastIndex, a === $t ? I[1] === "!--" ? a = In : I[1] !== void 0 ? a = yn : I[2] !== void 0 ? (ns.test(I[2]) && (n = RegExp("</" + I[2], "g")), a = Qe) : I[3] !== void 0 && (a = Qe) : a === Qe ? I[0] === ">" ? (a = n ?? $t, f = -1) : I[1] === void 0 ? f = -2 : (f = a.lastIndex - I[2].length, p = I[1], a = I[3] === void 0 ? Qe : I[3] === '"' ? wn : vn) : a === wn || a === vn ? a = Qe : a === In || a === yn ? a = $t : (a = Qe, n = void 0);
    const h = a === Qe && e[d + 1].startsWith("/>") ? " " : "";
    o += a === $t ? c + To : f >= 0 ? (s.push(p), c.slice(0, f) + ts + c.slice(f) + Ye + h) : c + Ye + (f === -2 ? d : h);
  }
  return [os(e, o + (e[i] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class zt {
  constructor({ strings: t, _$litType$: i }, s) {
    let n;
    this.parts = [];
    let o = 0, a = 0;
    const d = t.length - 1, c = this.parts, [p, I] = No(t, i);
    if (this.el = zt.createElement(p, s), tt.currentNode = this.el.content, i === 2 || i === 3) {
      const f = this.el.content.firstChild;
      f.replaceWith(...f.childNodes);
    }
    for (; (n = tt.nextNode()) !== null && c.length < d; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const f of n.getAttributeNames()) if (f.endsWith(ts)) {
          const y = I[a++], h = n.getAttribute(f).split(Ye), r = /([.?@])?(.*)/.exec(y);
          c.push({ type: 1, index: o, name: r[2], strings: h, ctor: r[1] === "." ? Lo : r[1] === "?" ? zo : r[1] === "@" ? Uo : Ii }), n.removeAttribute(f);
        } else f.startsWith(Ye) && (c.push({ type: 6, index: o }), n.removeAttribute(f));
        if (ns.test(n.tagName)) {
          const f = n.textContent.split(Ye), y = f.length - 1;
          if (y > 0) {
            n.textContent = ci ? ci.emptyScript : "";
            for (let h = 0; h < y; h++) n.append(f[h], Dt()), tt.nextNode(), c.push({ type: 2, index: ++o });
            n.append(f[y], Dt());
          }
        }
      } else if (n.nodeType === 8) if (n.data === is) c.push({ type: 2, index: o });
      else {
        let f = -1;
        for (; (f = n.data.indexOf(Ye, f + 1)) !== -1; ) c.push({ type: 7, index: o }), f += Ye.length - 1;
      }
      o++;
    }
  }
  static createElement(t, i) {
    const s = ot.createElement("template");
    return s.innerHTML = t, s;
  }
}
function ft(e, t, i = e, s) {
  var a, d;
  if (t === ht) return t;
  let n = s !== void 0 ? (a = i._$Co) == null ? void 0 : a[s] : i._$Cl;
  const o = Lt(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((d = n == null ? void 0 : n._$AO) == null || d.call(n, !1), o === void 0 ? n = void 0 : (n = new o(e), n._$AT(e, i, s)), s !== void 0 ? (i._$Co ?? (i._$Co = []))[s] = n : i._$Cl = n), n !== void 0 && (t = ft(e, n._$AS(e, t.values), n, s)), t;
}
class Do {
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
    const { el: { content: i }, parts: s } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? ot).importNode(i, !0);
    tt.currentNode = n;
    let o = tt.nextNode(), a = 0, d = 0, c = s[0];
    for (; c !== void 0; ) {
      if (a === c.index) {
        let p;
        c.type === 2 ? p = new Vt(o, o.nextSibling, this, t) : c.type === 1 ? p = new c.ctor(o, c.name, c.strings, this, t) : c.type === 6 && (p = new qo(o, this, t)), this._$AV.push(p), c = s[++d];
      }
      a !== (c == null ? void 0 : c.index) && (o = tt.nextNode(), a++);
    }
    return tt.currentNode = ot, n;
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
    this.type = 2, this._$AH = te, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    t = ft(this, t, i), Lt(t) ? t === te || t == null || t === "" ? (this._$AH !== te && this._$AR(), this._$AH = te) : t !== this._$AH && t !== ht && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ro(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== te && Lt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(ot.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: i, _$litType$: s } = t, n = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = zt.createElement(os(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n) this._$AH.p(i);
    else {
      const a = new Do(n, this), d = a.u(this.options);
      a.p(i), this.T(d), this._$AH = a;
    }
  }
  _$AC(t) {
    let i = xn.get(t.strings);
    return i === void 0 && xn.set(t.strings, i = new zt(t)), i;
  }
  k(t) {
    Qi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, n = 0;
    for (const o of t) n === i.length ? i.push(s = new Vt(this.O(Dt()), this.O(Dt()), this, this.options)) : s = i[n], s._$AI(o), n++;
    n < i.length && (this._$AR(s && s._$AB.nextSibling, n), i.length = n);
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, i); t !== this._$AB; ) {
      const n = fn(t).nextSibling;
      fn(t).remove(), t = n;
    }
  }
  setConnected(t) {
    var i;
    this._$AM === void 0 && (this._$Cv = t, (i = this._$AP) == null || i.call(this, t));
  }
}
class Ii {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, i, s, n, o) {
    this.type = 1, this._$AH = te, this._$AN = void 0, this.element = t, this.name = i, this._$AM = n, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = te;
  }
  _$AI(t, i = this, s, n) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = ft(this, t, i, 0), a = !Lt(t) || t !== this._$AH && t !== ht, a && (this._$AH = t);
    else {
      const d = t;
      let c, p;
      for (t = o[0], c = 0; c < o.length - 1; c++) p = ft(this, d[s + c], i, c), p === ht && (p = this._$AH[c]), a || (a = !Lt(p) || p !== this._$AH[c]), p === te ? t = te : t !== te && (t += (p ?? "") + o[c + 1]), this._$AH[c] = p;
    }
    a && !n && this.j(t);
  }
  j(t) {
    t === te ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Lo extends Ii {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === te ? void 0 : t;
  }
}
class zo extends Ii {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== te);
  }
}
class Uo extends Ii {
  constructor(t, i, s, n, o) {
    super(t, i, s, n, o), this.type = 5;
  }
  _$AI(t, i = this) {
    if ((t = ft(this, t, i, 0) ?? te) === ht) return;
    const s = this._$AH, n = t === te && s !== te || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== te && (s === te || n);
    n && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class qo {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    ft(this, t);
  }
}
const Ai = Tt.litHtmlPolyfillSupport;
Ai == null || Ai(zt, Vt), (Tt.litHtmlVersions ?? (Tt.litHtmlVersions = [])).push("3.3.3");
const Fo = (e, t, i) => {
  const s = (i == null ? void 0 : i.renderBefore) ?? t;
  let n = s._$litPart$;
  if (n === void 0) {
    const o = (i == null ? void 0 : i.renderBefore) ?? null;
    s._$litPart$ = n = new Vt(t.insertBefore(Dt(), o), o, void 0, i ?? {});
  }
  return n._$AI(e), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = globalThis;
class Ne extends pt {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Fo(i, this.renderRoot, this.renderOptions);
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
    return ht;
  }
}
var Gn;
Ne._$litElement$ = !0, Ne.finalized = !0, (Gn = nt.litElementHydrateSupport) == null || Gn.call(nt, { LitElement: Ne });
const Mi = nt.litElementPolyfillSupport;
Mi == null || Mi({ LitElement: Ne });
(nt.litElementVersions ?? (nt.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vt = (e) => (t, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(e, t);
  }) : customElements.define(e, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bo = { attribute: !0, type: String, converter: li, reflect: !1, hasChanged: Xi }, Vo = (e = Bo, t, i) => {
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
function oe(e) {
  return (t, i) => typeof i == "object" ? Vo(e, t, i) : ((s, n, o) => {
    const a = n.hasOwnProperty(o);
    return n.constructor.createProperty(o, s), a ? Object.getOwnPropertyDescriptor(n, o) : void 0;
  })(e, t, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function q(e) {
  return oe({ ...e, state: !0, attribute: !1 });
}
var Li = "http://www.w3.org/1999/xhtml";
const bn = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Li,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function yi(e) {
  var t = e += "", i = t.indexOf(":");
  return i >= 0 && (t = e.slice(0, i)) !== "xmlns" && (e = e.slice(i + 1)), bn.hasOwnProperty(t) ? { space: bn[t], local: e } : e;
}
function Ho(e) {
  return function() {
    var t = this.ownerDocument, i = this.namespaceURI;
    return i === Li && t.documentElement.namespaceURI === Li ? t.createElement(e) : t.createElementNS(i, e);
  };
}
function Wo(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function as(e) {
  var t = yi(e);
  return (t.local ? Wo : Ho)(t);
}
function Go() {
}
function Zi(e) {
  return e == null ? Go : function() {
    return this.querySelector(e);
  };
}
function jo(e) {
  typeof e != "function" && (e = Zi(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, d = s[n] = new Array(a), c, p, I = 0; I < a; ++I)
      (c = o[I]) && (p = e.call(c, c.__data__, I, o)) && ("__data__" in c && (p.__data__ = c.__data__), d[I] = p);
  return new ke(s, this._parents);
}
function Yo(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function Ko() {
  return [];
}
function rs(e) {
  return e == null ? Ko : function() {
    return this.querySelectorAll(e);
  };
}
function Xo(e) {
  return function() {
    return Yo(e.apply(this, arguments));
  };
}
function Qo(e) {
  typeof e == "function" ? e = Xo(e) : e = rs(e);
  for (var t = this._groups, i = t.length, s = [], n = [], o = 0; o < i; ++o)
    for (var a = t[o], d = a.length, c, p = 0; p < d; ++p)
      (c = a[p]) && (s.push(e.call(c, c.__data__, p, a)), n.push(c));
  return new ke(s, n);
}
function ds(e) {
  return function() {
    return this.matches(e);
  };
}
function ls(e) {
  return function(t) {
    return t.matches(e);
  };
}
var Zo = Array.prototype.find;
function Jo(e) {
  return function() {
    return Zo.call(this.children, e);
  };
}
function ea() {
  return this.firstElementChild;
}
function ta(e) {
  return this.select(e == null ? ea : Jo(typeof e == "function" ? e : ls(e)));
}
var ia = Array.prototype.filter;
function na() {
  return Array.from(this.children);
}
function sa(e) {
  return function() {
    return ia.call(this.children, e);
  };
}
function oa(e) {
  return this.selectAll(e == null ? na : sa(typeof e == "function" ? e : ls(e)));
}
function aa(e) {
  typeof e != "function" && (e = ds(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, d = s[n] = [], c, p = 0; p < a; ++p)
      (c = o[p]) && e.call(c, c.__data__, p, o) && d.push(c);
  return new ke(s, this._parents);
}
function cs(e) {
  return new Array(e.length);
}
function ra() {
  return new ke(this._enter || this._groups.map(cs), this._parents);
}
function pi(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
pi.prototype = {
  constructor: pi,
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
function da(e) {
  return function() {
    return e;
  };
}
function la(e, t, i, s, n, o) {
  for (var a = 0, d, c = t.length, p = o.length; a < p; ++a)
    (d = t[a]) ? (d.__data__ = o[a], s[a] = d) : i[a] = new pi(e, o[a]);
  for (; a < c; ++a)
    (d = t[a]) && (n[a] = d);
}
function ca(e, t, i, s, n, o, a) {
  var d, c, p = /* @__PURE__ */ new Map(), I = t.length, f = o.length, y = new Array(I), h;
  for (d = 0; d < I; ++d)
    (c = t[d]) && (y[d] = h = a.call(c, c.__data__, d, t) + "", p.has(h) ? n[d] = c : p.set(h, c));
  for (d = 0; d < f; ++d)
    h = a.call(e, o[d], d, o) + "", (c = p.get(h)) ? (s[d] = c, c.__data__ = o[d], p.delete(h)) : i[d] = new pi(e, o[d]);
  for (d = 0; d < I; ++d)
    (c = t[d]) && p.get(y[d]) === c && (n[d] = c);
}
function pa(e) {
  return e.__data__;
}
function ua(e, t) {
  if (!arguments.length) return Array.from(this, pa);
  var i = t ? ca : la, s = this._parents, n = this._groups;
  typeof e != "function" && (e = da(e));
  for (var o = n.length, a = new Array(o), d = new Array(o), c = new Array(o), p = 0; p < o; ++p) {
    var I = s[p], f = n[p], y = f.length, h = ma(e.call(I, I && I.__data__, p, s)), r = h.length, u = d[p] = new Array(r), g = a[p] = new Array(r), k = c[p] = new Array(y);
    i(I, f, u, g, k, h, t);
    for (var C = 0, O = 0, P, b; C < r; ++C)
      if (P = u[C]) {
        for (C >= O && (O = C + 1); !(b = g[O]) && ++O < r; ) ;
        P._next = b || null;
      }
  }
  return a = new ke(a, s), a._enter = d, a._exit = c, a;
}
function ma(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function ha() {
  return new ke(this._exit || this._groups.map(cs), this._parents);
}
function fa(e, t, i) {
  var s = this.enter(), n = this, o = this.exit();
  return typeof e == "function" ? (s = e(s), s && (s = s.selection())) : s = s.append(e + ""), t != null && (n = t(n), n && (n = n.selection())), i == null ? o.remove() : i(o), s && n ? s.merge(n).order() : n;
}
function ga(e) {
  for (var t = e.selection ? e.selection() : e, i = this._groups, s = t._groups, n = i.length, o = s.length, a = Math.min(n, o), d = new Array(n), c = 0; c < a; ++c)
    for (var p = i[c], I = s[c], f = p.length, y = d[c] = new Array(f), h, r = 0; r < f; ++r)
      (h = p[r] || I[r]) && (y[r] = h);
  for (; c < n; ++c)
    d[c] = i[c];
  return new ke(d, this._parents);
}
function Ia() {
  for (var e = this._groups, t = -1, i = e.length; ++t < i; )
    for (var s = e[t], n = s.length - 1, o = s[n], a; --n >= 0; )
      (a = s[n]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function ya(e) {
  e || (e = va);
  function t(f, y) {
    return f && y ? e(f.__data__, y.__data__) : !f - !y;
  }
  for (var i = this._groups, s = i.length, n = new Array(s), o = 0; o < s; ++o) {
    for (var a = i[o], d = a.length, c = n[o] = new Array(d), p, I = 0; I < d; ++I)
      (p = a[I]) && (c[I] = p);
    c.sort(t);
  }
  return new ke(n, this._parents).order();
}
function va(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function wa() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function xa() {
  return Array.from(this);
}
function ba() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length; n < o; ++n) {
      var a = s[n];
      if (a) return a;
    }
  return null;
}
function _a() {
  let e = 0;
  for (const t of this) ++e;
  return e;
}
function ka() {
  return !this.node();
}
function $a(e) {
  for (var t = this._groups, i = 0, s = t.length; i < s; ++i)
    for (var n = t[i], o = 0, a = n.length, d; o < a; ++o)
      (d = n[o]) && e.call(d, d.__data__, o, n);
  return this;
}
function Ea(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Sa(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Ca(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Aa(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Ma(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttribute(e) : this.setAttribute(e, i);
  };
}
function Pa(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, i);
  };
}
function Oa(e, t) {
  var i = yi(e);
  if (arguments.length < 2) {
    var s = this.node();
    return i.local ? s.getAttributeNS(i.space, i.local) : s.getAttribute(i);
  }
  return this.each((t == null ? i.local ? Sa : Ea : typeof t == "function" ? i.local ? Pa : Ma : i.local ? Aa : Ca)(i, t));
}
function ps(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Ta(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Ra(e, t, i) {
  return function() {
    this.style.setProperty(e, t, i);
  };
}
function Na(e, t, i) {
  return function() {
    var s = t.apply(this, arguments);
    s == null ? this.style.removeProperty(e) : this.style.setProperty(e, s, i);
  };
}
function Da(e, t, i) {
  return arguments.length > 1 ? this.each((t == null ? Ta : typeof t == "function" ? Na : Ra)(e, t, i ?? "")) : gt(this.node(), e);
}
function gt(e, t) {
  return e.style.getPropertyValue(t) || ps(e).getComputedStyle(e, null).getPropertyValue(t);
}
function La(e) {
  return function() {
    delete this[e];
  };
}
function za(e, t) {
  return function() {
    this[e] = t;
  };
}
function Ua(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    i == null ? delete this[e] : this[e] = i;
  };
}
function qa(e, t) {
  return arguments.length > 1 ? this.each((t == null ? La : typeof t == "function" ? Ua : za)(e, t)) : this.node()[e];
}
function us(e) {
  return e.trim().split(/^|\s+/);
}
function Ji(e) {
  return e.classList || new ms(e);
}
function ms(e) {
  this._node = e, this._names = us(e.getAttribute("class") || "");
}
ms.prototype = {
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
function hs(e, t) {
  for (var i = Ji(e), s = -1, n = t.length; ++s < n; ) i.add(t[s]);
}
function fs(e, t) {
  for (var i = Ji(e), s = -1, n = t.length; ++s < n; ) i.remove(t[s]);
}
function Fa(e) {
  return function() {
    hs(this, e);
  };
}
function Ba(e) {
  return function() {
    fs(this, e);
  };
}
function Va(e, t) {
  return function() {
    (t.apply(this, arguments) ? hs : fs)(this, e);
  };
}
function Ha(e, t) {
  var i = us(e + "");
  if (arguments.length < 2) {
    for (var s = Ji(this.node()), n = -1, o = i.length; ++n < o; ) if (!s.contains(i[n])) return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Va : t ? Fa : Ba)(i, t));
}
function Wa() {
  this.textContent = "";
}
function Ga(e) {
  return function() {
    this.textContent = e;
  };
}
function ja(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Ya(e) {
  return arguments.length ? this.each(e == null ? Wa : (typeof e == "function" ? ja : Ga)(e)) : this.node().textContent;
}
function Ka() {
  this.innerHTML = "";
}
function Xa(e) {
  return function() {
    this.innerHTML = e;
  };
}
function Qa(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function Za(e) {
  return arguments.length ? this.each(e == null ? Ka : (typeof e == "function" ? Qa : Xa)(e)) : this.node().innerHTML;
}
function Ja() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function er() {
  return this.each(Ja);
}
function tr() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function ir() {
  return this.each(tr);
}
function nr(e) {
  var t = typeof e == "function" ? e : as(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function sr() {
  return null;
}
function or(e, t) {
  var i = typeof e == "function" ? e : as(e), s = t == null ? sr : typeof t == "function" ? t : Zi(t);
  return this.select(function() {
    return this.insertBefore(i.apply(this, arguments), s.apply(this, arguments) || null);
  });
}
function ar() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function rr() {
  return this.each(ar);
}
function dr() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function lr() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function cr(e) {
  return this.select(e ? lr : dr);
}
function pr(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function ur(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function mr(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var i = "", s = t.indexOf(".");
    return s >= 0 && (i = t.slice(s + 1), t = t.slice(0, s)), { type: t, name: i };
  });
}
function hr(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var i = 0, s = -1, n = t.length, o; i < n; ++i)
        o = t[i], (!e.type || o.type === e.type) && o.name === e.name ? this.removeEventListener(o.type, o.listener, o.options) : t[++s] = o;
      ++s ? t.length = s : delete this.__on;
    }
  };
}
function fr(e, t, i) {
  return function() {
    var s = this.__on, n, o = ur(t);
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
function gr(e, t, i) {
  var s = mr(e + ""), n, o = s.length, a;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var c = 0, p = d.length, I; c < p; ++c)
        for (n = 0, I = d[c]; n < o; ++n)
          if ((a = s[n]).type === I.type && a.name === I.name)
            return I.value;
    }
    return;
  }
  for (d = t ? fr : hr, n = 0; n < o; ++n) this.each(d(s[n], t, i));
  return this;
}
function gs(e, t, i) {
  var s = ps(e), n = s.CustomEvent;
  typeof n == "function" ? n = new n(t, i) : (n = s.document.createEvent("Event"), i ? (n.initEvent(t, i.bubbles, i.cancelable), n.detail = i.detail) : n.initEvent(t, !1, !1)), e.dispatchEvent(n);
}
function Ir(e, t) {
  return function() {
    return gs(this, e, t);
  };
}
function yr(e, t) {
  return function() {
    return gs(this, e, t.apply(this, arguments));
  };
}
function vr(e, t) {
  return this.each((typeof t == "function" ? yr : Ir)(e, t));
}
function* wr() {
  for (var e = this._groups, t = 0, i = e.length; t < i; ++t)
    for (var s = e[t], n = 0, o = s.length, a; n < o; ++n)
      (a = s[n]) && (yield a);
}
var Is = [null];
function ke(e, t) {
  this._groups = e, this._parents = t;
}
function Ht() {
  return new ke([[document.documentElement]], Is);
}
function xr() {
  return this;
}
ke.prototype = Ht.prototype = {
  constructor: ke,
  select: jo,
  selectAll: Qo,
  selectChild: ta,
  selectChildren: oa,
  filter: aa,
  data: ua,
  enter: ra,
  exit: ha,
  join: fa,
  merge: ga,
  selection: xr,
  order: Ia,
  sort: ya,
  call: wa,
  nodes: xa,
  node: ba,
  size: _a,
  empty: ka,
  each: $a,
  attr: Oa,
  style: Da,
  property: qa,
  classed: Ha,
  text: Ya,
  html: Za,
  raise: er,
  lower: ir,
  append: nr,
  insert: or,
  remove: rr,
  clone: cr,
  datum: pr,
  on: gr,
  dispatch: vr,
  [Symbol.iterator]: wr
};
function Pe(e) {
  return typeof e == "string" ? new ke([[document.querySelector(e)]], [document.documentElement]) : new ke([[e]], Is);
}
function br(e) {
  let t;
  for (; t = e.sourceEvent; ) e = t;
  return e;
}
function Ze(e, t) {
  if (e = br(e), t === void 0 && (t = e.currentTarget), t) {
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
var _r = { value: () => {
} };
function en() {
  for (var e = 0, t = arguments.length, i = {}, s; e < t; ++e) {
    if (!(s = arguments[e] + "") || s in i || /[\s.]/.test(s)) throw new Error("illegal type: " + s);
    i[s] = [];
  }
  return new oi(i);
}
function oi(e) {
  this._ = e;
}
function kr(e, t) {
  return e.trim().split(/^|\s+/).map(function(i) {
    var s = "", n = i.indexOf(".");
    if (n >= 0 && (s = i.slice(n + 1), i = i.slice(0, n)), i && !t.hasOwnProperty(i)) throw new Error("unknown type: " + i);
    return { type: i, name: s };
  });
}
oi.prototype = en.prototype = {
  constructor: oi,
  on: function(e, t) {
    var i = this._, s = kr(e + "", i), n, o = -1, a = s.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((n = (e = s[o]).type) && (n = $r(i[n], e.name))) return n;
      return;
    }
    if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
    for (; ++o < a; )
      if (n = (e = s[o]).type) i[n] = _n(i[n], e.name, t);
      else if (t == null) for (n in i) i[n] = _n(i[n], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var i in t) e[i] = t[i].slice();
    return new oi(e);
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
function $r(e, t) {
  for (var i = 0, s = e.length, n; i < s; ++i)
    if ((n = e[i]).name === t)
      return n.value;
}
function _n(e, t, i) {
  for (var s = 0, n = e.length; s < n; ++s)
    if (e[s].name === t) {
      e[s] = _r, e = e.slice(0, s).concat(e.slice(s + 1));
      break;
    }
  return i != null && e.push({ name: t, value: i }), e;
}
const zi = { capture: !0, passive: !1 };
function Ui(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Er(e) {
  var t = e.document.documentElement, i = Pe(e).on("dragstart.drag", Ui, zi);
  "onselectstart" in t ? i.on("selectstart.drag", Ui, zi) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Sr(e, t) {
  var i = e.document.documentElement, s = Pe(e).on("dragstart.drag", null);
  t && (s.on("click.drag", Ui, zi), setTimeout(function() {
    s.on("click.drag", null);
  }, 0)), "onselectstart" in i ? s.on("selectstart.drag", null) : (i.style.MozUserSelect = i.__noselect, delete i.__noselect);
}
function tn(e, t, i) {
  e.prototype = t.prototype = i, i.constructor = e;
}
function ys(e, t) {
  var i = Object.create(e.prototype);
  for (var s in t) i[s] = t[s];
  return i;
}
function Wt() {
}
var Ut = 0.7, ui = 1 / Ut, mt = "\\s*([+-]?\\d+)\\s*", qt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", De = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Cr = /^#([0-9a-f]{3,8})$/, Ar = new RegExp(`^rgb\\(${mt},${mt},${mt}\\)$`), Mr = new RegExp(`^rgb\\(${De},${De},${De}\\)$`), Pr = new RegExp(`^rgba\\(${mt},${mt},${mt},${qt}\\)$`), Or = new RegExp(`^rgba\\(${De},${De},${De},${qt}\\)$`), Tr = new RegExp(`^hsl\\(${qt},${De},${De}\\)$`), Rr = new RegExp(`^hsla\\(${qt},${De},${De},${qt}\\)$`), kn = {
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
tn(Wt, Ft, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: $n,
  // Deprecated! Use color.formatHex.
  formatHex: $n,
  formatHex8: Nr,
  formatHsl: Dr,
  formatRgb: En,
  toString: En
});
function $n() {
  return this.rgb().formatHex();
}
function Nr() {
  return this.rgb().formatHex8();
}
function Dr() {
  return vs(this).formatHsl();
}
function En() {
  return this.rgb().formatRgb();
}
function Ft(e) {
  var t, i;
  return e = (e + "").trim().toLowerCase(), (t = Cr.exec(e)) ? (i = t[1].length, t = parseInt(t[1], 16), i === 6 ? Sn(t) : i === 3 ? new xe(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : i === 8 ? Qt(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : i === 4 ? Qt(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Ar.exec(e)) ? new xe(t[1], t[2], t[3], 1) : (t = Mr.exec(e)) ? new xe(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Pr.exec(e)) ? Qt(t[1], t[2], t[3], t[4]) : (t = Or.exec(e)) ? Qt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Tr.exec(e)) ? Mn(t[1], t[2] / 100, t[3] / 100, 1) : (t = Rr.exec(e)) ? Mn(t[1], t[2] / 100, t[3] / 100, t[4]) : kn.hasOwnProperty(e) ? Sn(kn[e]) : e === "transparent" ? new xe(NaN, NaN, NaN, 0) : null;
}
function Sn(e) {
  return new xe(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Qt(e, t, i, s) {
  return s <= 0 && (e = t = i = NaN), new xe(e, t, i, s);
}
function Lr(e) {
  return e instanceof Wt || (e = Ft(e)), e ? (e = e.rgb(), new xe(e.r, e.g, e.b, e.opacity)) : new xe();
}
function qi(e, t, i, s) {
  return arguments.length === 1 ? Lr(e) : new xe(e, t, i, s ?? 1);
}
function xe(e, t, i, s) {
  this.r = +e, this.g = +t, this.b = +i, this.opacity = +s;
}
tn(xe, qi, ys(Wt, {
  brighter(e) {
    return e = e == null ? ui : Math.pow(ui, e), new xe(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ut : Math.pow(Ut, e), new xe(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new xe(st(this.r), st(this.g), st(this.b), mi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Cn,
  // Deprecated! Use color.formatHex.
  formatHex: Cn,
  formatHex8: zr,
  formatRgb: An,
  toString: An
}));
function Cn() {
  return `#${it(this.r)}${it(this.g)}${it(this.b)}`;
}
function zr() {
  return `#${it(this.r)}${it(this.g)}${it(this.b)}${it((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function An() {
  const e = mi(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${st(this.r)}, ${st(this.g)}, ${st(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function mi(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function st(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function it(e) {
  return e = st(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Mn(e, t, i, s) {
  return s <= 0 ? e = t = i = NaN : i <= 0 || i >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Oe(e, t, i, s);
}
function vs(e) {
  if (e instanceof Oe) return new Oe(e.h, e.s, e.l, e.opacity);
  if (e instanceof Wt || (e = Ft(e)), !e) return new Oe();
  if (e instanceof Oe) return e;
  e = e.rgb();
  var t = e.r / 255, i = e.g / 255, s = e.b / 255, n = Math.min(t, i, s), o = Math.max(t, i, s), a = NaN, d = o - n, c = (o + n) / 2;
  return d ? (t === o ? a = (i - s) / d + (i < s) * 6 : i === o ? a = (s - t) / d + 2 : a = (t - i) / d + 4, d /= c < 0.5 ? o + n : 2 - o - n, a *= 60) : d = c > 0 && c < 1 ? 0 : a, new Oe(a, d, c, e.opacity);
}
function Ur(e, t, i, s) {
  return arguments.length === 1 ? vs(e) : new Oe(e, t, i, s ?? 1);
}
function Oe(e, t, i, s) {
  this.h = +e, this.s = +t, this.l = +i, this.opacity = +s;
}
tn(Oe, Ur, ys(Wt, {
  brighter(e) {
    return e = e == null ? ui : Math.pow(ui, e), new Oe(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Ut : Math.pow(Ut, e), new Oe(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, i = this.l, s = i + (i < 0.5 ? i : 1 - i) * t, n = 2 * i - s;
    return new xe(
      Pi(e >= 240 ? e - 240 : e + 120, n, s),
      Pi(e, n, s),
      Pi(e < 120 ? e + 240 : e - 120, n, s),
      this.opacity
    );
  },
  clamp() {
    return new Oe(Pn(this.h), Zt(this.s), Zt(this.l), mi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = mi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Pn(this.h)}, ${Zt(this.s) * 100}%, ${Zt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Pn(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Zt(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Pi(e, t, i) {
  return (e < 60 ? t + (i - t) * e / 60 : e < 180 ? i : e < 240 ? t + (i - t) * (240 - e) / 60 : t) * 255;
}
const ws = (e) => () => e;
function qr(e, t) {
  return function(i) {
    return e + i * t;
  };
}
function Fr(e, t, i) {
  return e = Math.pow(e, i), t = Math.pow(t, i) - e, i = 1 / i, function(s) {
    return Math.pow(e + s * t, i);
  };
}
function Br(e) {
  return (e = +e) == 1 ? xs : function(t, i) {
    return i - t ? Fr(t, i, e) : ws(isNaN(t) ? i : t);
  };
}
function xs(e, t) {
  var i = t - e;
  return i ? qr(e, i) : ws(isNaN(e) ? t : e);
}
const On = (function e(t) {
  var i = Br(t);
  function s(n, o) {
    var a = i((n = qi(n)).r, (o = qi(o)).r), d = i(n.g, o.g), c = i(n.b, o.b), p = xs(n.opacity, o.opacity);
    return function(I) {
      return n.r = a(I), n.g = d(I), n.b = c(I), n.opacity = p(I), n + "";
    };
  }
  return s.gamma = e, s;
})(1);
function je(e, t) {
  return e = +e, t = +t, function(i) {
    return e * (1 - i) + t * i;
  };
}
var Fi = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Oi = new RegExp(Fi.source, "g");
function Vr(e) {
  return function() {
    return e;
  };
}
function Hr(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Wr(e, t) {
  var i = Fi.lastIndex = Oi.lastIndex = 0, s, n, o, a = -1, d = [], c = [];
  for (e = e + "", t = t + ""; (s = Fi.exec(e)) && (n = Oi.exec(t)); )
    (o = n.index) > i && (o = t.slice(i, o), d[a] ? d[a] += o : d[++a] = o), (s = s[0]) === (n = n[0]) ? d[a] ? d[a] += n : d[++a] = n : (d[++a] = null, c.push({ i: a, x: je(s, n) })), i = Oi.lastIndex;
  return i < t.length && (o = t.slice(i), d[a] ? d[a] += o : d[++a] = o), d.length < 2 ? c[0] ? Hr(c[0].x) : Vr(t) : (t = c.length, function(p) {
    for (var I = 0, f; I < t; ++I) d[(f = c[I]).i] = f.x(p);
    return d.join("");
  });
}
var Tn = 180 / Math.PI, Bi = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function bs(e, t, i, s, n, o) {
  var a, d, c;
  return (a = Math.sqrt(e * e + t * t)) && (e /= a, t /= a), (c = e * i + t * s) && (i -= e * c, s -= t * c), (d = Math.sqrt(i * i + s * s)) && (i /= d, s /= d, c /= d), e * s < t * i && (e = -e, t = -t, c = -c, a = -a), {
    translateX: n,
    translateY: o,
    rotate: Math.atan2(t, e) * Tn,
    skewX: Math.atan(c) * Tn,
    scaleX: a,
    scaleY: d
  };
}
var Jt;
function Gr(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Bi : bs(t.a, t.b, t.c, t.d, t.e, t.f);
}
function jr(e) {
  return e == null || (Jt || (Jt = document.createElementNS("http://www.w3.org/2000/svg", "g")), Jt.setAttribute("transform", e), !(e = Jt.transform.baseVal.consolidate())) ? Bi : (e = e.matrix, bs(e.a, e.b, e.c, e.d, e.e, e.f));
}
function _s(e, t, i, s) {
  function n(p) {
    return p.length ? p.pop() + " " : "";
  }
  function o(p, I, f, y, h, r) {
    if (p !== f || I !== y) {
      var u = h.push("translate(", null, t, null, i);
      r.push({ i: u - 4, x: je(p, f) }, { i: u - 2, x: je(I, y) });
    } else (f || y) && h.push("translate(" + f + t + y + i);
  }
  function a(p, I, f, y) {
    p !== I ? (p - I > 180 ? I += 360 : I - p > 180 && (p += 360), y.push({ i: f.push(n(f) + "rotate(", null, s) - 2, x: je(p, I) })) : I && f.push(n(f) + "rotate(" + I + s);
  }
  function d(p, I, f, y) {
    p !== I ? y.push({ i: f.push(n(f) + "skewX(", null, s) - 2, x: je(p, I) }) : I && f.push(n(f) + "skewX(" + I + s);
  }
  function c(p, I, f, y, h, r) {
    if (p !== f || I !== y) {
      var u = h.push(n(h) + "scale(", null, ",", null, ")");
      r.push({ i: u - 4, x: je(p, f) }, { i: u - 2, x: je(I, y) });
    } else (f !== 1 || y !== 1) && h.push(n(h) + "scale(" + f + "," + y + ")");
  }
  return function(p, I) {
    var f = [], y = [];
    return p = e(p), I = e(I), o(p.translateX, p.translateY, I.translateX, I.translateY, f, y), a(p.rotate, I.rotate, f, y), d(p.skewX, I.skewX, f, y), c(p.scaleX, p.scaleY, I.scaleX, I.scaleY, f, y), p = I = null, function(h) {
      for (var r = -1, u = y.length, g; ++r < u; ) f[(g = y[r]).i] = g.x(h);
      return f.join("");
    };
  };
}
var Yr = _s(Gr, "px, ", "px)", "deg)"), Kr = _s(jr, ", ", ")", ")"), Xr = 1e-12;
function Rn(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function Qr(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function Zr(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const Jr = (function e(t, i, s) {
  function n(o, a) {
    var d = o[0], c = o[1], p = o[2], I = a[0], f = a[1], y = a[2], h = I - d, r = f - c, u = h * h + r * r, g, k;
    if (u < Xr)
      k = Math.log(y / p) / t, g = function(A) {
        return [
          d + A * h,
          c + A * r,
          p * Math.exp(t * A * k)
        ];
      };
    else {
      var C = Math.sqrt(u), O = (y * y - p * p + s * u) / (2 * p * i * C), P = (y * y - p * p - s * u) / (2 * y * i * C), b = Math.log(Math.sqrt(O * O + 1) - O), x = Math.log(Math.sqrt(P * P + 1) - P);
      k = (x - b) / t, g = function(A) {
        var L = A * k, R = Rn(b), z = p / (i * C) * (R * Zr(t * L + b) - Qr(b));
        return [
          d + z * h,
          c + z * r,
          p * R / Rn(t * L + b)
        ];
      };
    }
    return g.duration = k * 1e3 * t / Math.SQRT2, g;
  }
  return n.rho = function(o) {
    var a = Math.max(1e-3, +o), d = a * a, c = d * d;
    return e(a, d, c);
  }, n;
})(Math.SQRT2, 2, 4);
var It = 0, Mt = 0, Et = 0, ks = 1e3, hi, Pt, fi = 0, at = 0, vi = 0, Bt = typeof performance == "object" && performance.now ? performance : Date, $s = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function nn() {
  return at || ($s(ed), at = Bt.now() + vi);
}
function ed() {
  at = 0;
}
function gi() {
  this._call = this._time = this._next = null;
}
gi.prototype = Es.prototype = {
  constructor: gi,
  restart: function(e, t, i) {
    if (typeof e != "function") throw new TypeError("callback is not a function");
    i = (i == null ? nn() : +i) + (t == null ? 0 : +t), !this._next && Pt !== this && (Pt ? Pt._next = this : hi = this, Pt = this), this._call = e, this._time = i, Vi();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Vi());
  }
};
function Es(e, t, i) {
  var s = new gi();
  return s.restart(e, t, i), s;
}
function td() {
  nn(), ++It;
  for (var e = hi, t; e; )
    (t = at - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --It;
}
function Nn() {
  at = (fi = Bt.now()) + vi, It = Mt = 0;
  try {
    td();
  } finally {
    It = 0, nd(), at = 0;
  }
}
function id() {
  var e = Bt.now(), t = e - fi;
  t > ks && (vi -= t, fi = e);
}
function nd() {
  for (var e, t = hi, i, s = 1 / 0; t; )
    t._call ? (s > t._time && (s = t._time), e = t, t = t._next) : (i = t._next, t._next = null, t = e ? e._next = i : hi = i);
  Pt = e, Vi(s);
}
function Vi(e) {
  if (!It) {
    Mt && (Mt = clearTimeout(Mt));
    var t = e - at;
    t > 24 ? (e < 1 / 0 && (Mt = setTimeout(Nn, e - Bt.now() - vi)), Et && (Et = clearInterval(Et))) : (Et || (fi = Bt.now(), Et = setInterval(id, ks)), It = 1, $s(Nn));
  }
}
function Dn(e, t, i) {
  var s = new gi();
  return t = t == null ? 0 : +t, s.restart((n) => {
    s.stop(), e(n + t);
  }, t, i), s;
}
var sd = en("start", "end", "cancel", "interrupt"), od = [], Ss = 0, Ln = 1, Hi = 2, ai = 3, zn = 4, Wi = 5, ri = 6;
function wi(e, t, i, s, n, o) {
  var a = e.__transition;
  if (!a) e.__transition = {};
  else if (i in a) return;
  ad(e, i, {
    name: t,
    index: s,
    // For context during callback.
    group: n,
    // For context during callback.
    on: sd,
    tween: od,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Ss
  });
}
function sn(e, t) {
  var i = Te(e, t);
  if (i.state > Ss) throw new Error("too late; already scheduled");
  return i;
}
function Le(e, t) {
  var i = Te(e, t);
  if (i.state > ai) throw new Error("too late; already running");
  return i;
}
function Te(e, t) {
  var i = e.__transition;
  if (!i || !(i = i[t])) throw new Error("transition not found");
  return i;
}
function ad(e, t, i) {
  var s = e.__transition, n;
  s[t] = i, i.timer = Es(o, 0, i.time);
  function o(p) {
    i.state = Ln, i.timer.restart(a, i.delay, i.time), i.delay <= p && a(p - i.delay);
  }
  function a(p) {
    var I, f, y, h;
    if (i.state !== Ln) return c();
    for (I in s)
      if (h = s[I], h.name === i.name) {
        if (h.state === ai) return Dn(a);
        h.state === zn ? (h.state = ri, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete s[I]) : +I < t && (h.state = ri, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete s[I]);
      }
    if (Dn(function() {
      i.state === ai && (i.state = zn, i.timer.restart(d, i.delay, i.time), d(p));
    }), i.state = Hi, i.on.call("start", e, e.__data__, i.index, i.group), i.state === Hi) {
      for (i.state = ai, n = new Array(y = i.tween.length), I = 0, f = -1; I < y; ++I)
        (h = i.tween[I].value.call(e, e.__data__, i.index, i.group)) && (n[++f] = h);
      n.length = f + 1;
    }
  }
  function d(p) {
    for (var I = p < i.duration ? i.ease.call(null, p / i.duration) : (i.timer.restart(c), i.state = Wi, 1), f = -1, y = n.length; ++f < y; )
      n[f].call(e, I);
    i.state === Wi && (i.on.call("end", e, e.__data__, i.index, i.group), c());
  }
  function c() {
    i.state = ri, i.timer.stop(), delete s[t];
    for (var p in s) return;
    delete e.__transition;
  }
}
function di(e, t) {
  var i = e.__transition, s, n, o = !0, a;
  if (i) {
    t = t == null ? null : t + "";
    for (a in i) {
      if ((s = i[a]).name !== t) {
        o = !1;
        continue;
      }
      n = s.state > Hi && s.state < Wi, s.state = ri, s.timer.stop(), s.on.call(n ? "interrupt" : "cancel", e, e.__data__, s.index, s.group), delete i[a];
    }
    o && delete e.__transition;
  }
}
function rd(e) {
  return this.each(function() {
    di(this, e);
  });
}
function dd(e, t) {
  var i, s;
  return function() {
    var n = Le(this, e), o = n.tween;
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
function ld(e, t, i) {
  var s, n;
  if (typeof i != "function") throw new Error();
  return function() {
    var o = Le(this, e), a = o.tween;
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
function cd(e, t) {
  var i = this._id;
  if (e += "", arguments.length < 2) {
    for (var s = Te(this.node(), i).tween, n = 0, o = s.length, a; n < o; ++n)
      if ((a = s[n]).name === e)
        return a.value;
    return null;
  }
  return this.each((t == null ? dd : ld)(i, e, t));
}
function on(e, t, i) {
  var s = e._id;
  return e.each(function() {
    var n = Le(this, s);
    (n.value || (n.value = {}))[t] = i.apply(this, arguments);
  }), function(n) {
    return Te(n, s).value[t];
  };
}
function Cs(e, t) {
  var i;
  return (typeof t == "number" ? je : t instanceof Ft ? On : (i = Ft(t)) ? (t = i, On) : Wr)(e, t);
}
function pd(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function ud(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function md(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = this.getAttribute(e);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function hd(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = this.getAttributeNS(e.space, e.local);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function fd(e, t, i) {
  var s, n, o;
  return function() {
    var a, d = i(this), c;
    return d == null ? void this.removeAttribute(e) : (a = this.getAttribute(e), c = d + "", a === c ? null : a === s && c === n ? o : (n = c, o = t(s = a, d)));
  };
}
function gd(e, t, i) {
  var s, n, o;
  return function() {
    var a, d = i(this), c;
    return d == null ? void this.removeAttributeNS(e.space, e.local) : (a = this.getAttributeNS(e.space, e.local), c = d + "", a === c ? null : a === s && c === n ? o : (n = c, o = t(s = a, d)));
  };
}
function Id(e, t) {
  var i = yi(e), s = i === "transform" ? Kr : Cs;
  return this.attrTween(e, typeof t == "function" ? (i.local ? gd : fd)(i, s, on(this, "attr." + e, t)) : t == null ? (i.local ? ud : pd)(i) : (i.local ? hd : md)(i, s, t));
}
function yd(e, t) {
  return function(i) {
    this.setAttribute(e, t.call(this, i));
  };
}
function vd(e, t) {
  return function(i) {
    this.setAttributeNS(e.space, e.local, t.call(this, i));
  };
}
function wd(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && vd(e, o)), i;
  }
  return n._value = t, n;
}
function xd(e, t) {
  var i, s;
  function n() {
    var o = t.apply(this, arguments);
    return o !== s && (i = (s = o) && yd(e, o)), i;
  }
  return n._value = t, n;
}
function bd(e, t) {
  var i = "attr." + e;
  if (arguments.length < 2) return (i = this.tween(i)) && i._value;
  if (t == null) return this.tween(i, null);
  if (typeof t != "function") throw new Error();
  var s = yi(e);
  return this.tween(i, (s.local ? wd : xd)(s, t));
}
function _d(e, t) {
  return function() {
    sn(this, e).delay = +t.apply(this, arguments);
  };
}
function kd(e, t) {
  return t = +t, function() {
    sn(this, e).delay = t;
  };
}
function $d(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? _d : kd)(t, e)) : Te(this.node(), t).delay;
}
function Ed(e, t) {
  return function() {
    Le(this, e).duration = +t.apply(this, arguments);
  };
}
function Sd(e, t) {
  return t = +t, function() {
    Le(this, e).duration = t;
  };
}
function Cd(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Ed : Sd)(t, e)) : Te(this.node(), t).duration;
}
function Ad(e, t) {
  if (typeof t != "function") throw new Error();
  return function() {
    Le(this, e).ease = t;
  };
}
function Md(e) {
  var t = this._id;
  return arguments.length ? this.each(Ad(t, e)) : Te(this.node(), t).ease;
}
function Pd(e, t) {
  return function() {
    var i = t.apply(this, arguments);
    if (typeof i != "function") throw new Error();
    Le(this, e).ease = i;
  };
}
function Od(e) {
  if (typeof e != "function") throw new Error();
  return this.each(Pd(this._id, e));
}
function Td(e) {
  typeof e != "function" && (e = ds(e));
  for (var t = this._groups, i = t.length, s = new Array(i), n = 0; n < i; ++n)
    for (var o = t[n], a = o.length, d = s[n] = [], c, p = 0; p < a; ++p)
      (c = o[p]) && e.call(c, c.__data__, p, o) && d.push(c);
  return new Be(s, this._parents, this._name, this._id);
}
function Rd(e) {
  if (e._id !== this._id) throw new Error();
  for (var t = this._groups, i = e._groups, s = t.length, n = i.length, o = Math.min(s, n), a = new Array(s), d = 0; d < o; ++d)
    for (var c = t[d], p = i[d], I = c.length, f = a[d] = new Array(I), y, h = 0; h < I; ++h)
      (y = c[h] || p[h]) && (f[h] = y);
  for (; d < s; ++d)
    a[d] = t[d];
  return new Be(a, this._parents, this._name, this._id);
}
function Nd(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    return i >= 0 && (t = t.slice(0, i)), !t || t === "start";
  });
}
function Dd(e, t, i) {
  var s, n, o = Nd(t) ? sn : Le;
  return function() {
    var a = o(this, e), d = a.on;
    d !== s && (n = (s = d).copy()).on(t, i), a.on = n;
  };
}
function Ld(e, t) {
  var i = this._id;
  return arguments.length < 2 ? Te(this.node(), i).on.on(e) : this.each(Dd(i, e, t));
}
function zd(e) {
  return function() {
    var t = this.parentNode;
    for (var i in this.__transition) if (+i !== e) return;
    t && t.removeChild(this);
  };
}
function Ud() {
  return this.on("end.remove", zd(this._id));
}
function qd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = Zi(e));
  for (var s = this._groups, n = s.length, o = new Array(n), a = 0; a < n; ++a)
    for (var d = s[a], c = d.length, p = o[a] = new Array(c), I, f, y = 0; y < c; ++y)
      (I = d[y]) && (f = e.call(I, I.__data__, y, d)) && ("__data__" in I && (f.__data__ = I.__data__), p[y] = f, wi(p[y], t, i, y, p, Te(I, i)));
  return new Be(o, this._parents, t, i);
}
function Fd(e) {
  var t = this._name, i = this._id;
  typeof e != "function" && (e = rs(e));
  for (var s = this._groups, n = s.length, o = [], a = [], d = 0; d < n; ++d)
    for (var c = s[d], p = c.length, I, f = 0; f < p; ++f)
      if (I = c[f]) {
        for (var y = e.call(I, I.__data__, f, c), h, r = Te(I, i), u = 0, g = y.length; u < g; ++u)
          (h = y[u]) && wi(h, t, i, u, y, r);
        o.push(y), a.push(I);
      }
  return new Be(o, a, t, i);
}
var Bd = Ht.prototype.constructor;
function Vd() {
  return new Bd(this._groups, this._parents);
}
function Hd(e, t) {
  var i, s, n;
  return function() {
    var o = gt(this, e), a = (this.style.removeProperty(e), gt(this, e));
    return o === a ? null : o === i && a === s ? n : n = t(i = o, s = a);
  };
}
function As(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Wd(e, t, i) {
  var s, n = i + "", o;
  return function() {
    var a = gt(this, e);
    return a === n ? null : a === s ? o : o = t(s = a, i);
  };
}
function Gd(e, t, i) {
  var s, n, o;
  return function() {
    var a = gt(this, e), d = i(this), c = d + "";
    return d == null && (c = d = (this.style.removeProperty(e), gt(this, e))), a === c ? null : a === s && c === n ? o : (n = c, o = t(s = a, d));
  };
}
function jd(e, t) {
  var i, s, n, o = "style." + t, a = "end." + o, d;
  return function() {
    var c = Le(this, e), p = c.on, I = c.value[o] == null ? d || (d = As(t)) : void 0;
    (p !== i || n !== I) && (s = (i = p).copy()).on(a, n = I), c.on = s;
  };
}
function Yd(e, t, i) {
  var s = (e += "") == "transform" ? Yr : Cs;
  return t == null ? this.styleTween(e, Hd(e, s)).on("end.style." + e, As(e)) : typeof t == "function" ? this.styleTween(e, Gd(e, s, on(this, "style." + e, t))).each(jd(this._id, e)) : this.styleTween(e, Wd(e, s, t), i).on("end.style." + e, null);
}
function Kd(e, t, i) {
  return function(s) {
    this.style.setProperty(e, t.call(this, s), i);
  };
}
function Xd(e, t, i) {
  var s, n;
  function o() {
    var a = t.apply(this, arguments);
    return a !== n && (s = (n = a) && Kd(e, a, i)), s;
  }
  return o._value = t, o;
}
function Qd(e, t, i) {
  var s = "style." + (e += "");
  if (arguments.length < 2) return (s = this.tween(s)) && s._value;
  if (t == null) return this.tween(s, null);
  if (typeof t != "function") throw new Error();
  return this.tween(s, Xd(e, t, i ?? ""));
}
function Zd(e) {
  return function() {
    this.textContent = e;
  };
}
function Jd(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function el(e) {
  return this.tween("text", typeof e == "function" ? Jd(on(this, "text", e)) : Zd(e == null ? "" : e + ""));
}
function tl(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function il(e) {
  var t, i;
  function s() {
    var n = e.apply(this, arguments);
    return n !== i && (t = (i = n) && tl(n)), t;
  }
  return s._value = e, s;
}
function nl(e) {
  var t = "text";
  if (arguments.length < 1) return (t = this.tween(t)) && t._value;
  if (e == null) return this.tween(t, null);
  if (typeof e != "function") throw new Error();
  return this.tween(t, il(e));
}
function sl() {
  for (var e = this._name, t = this._id, i = Ms(), s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var a = s[o], d = a.length, c, p = 0; p < d; ++p)
      if (c = a[p]) {
        var I = Te(c, t);
        wi(c, e, i, p, a, {
          time: I.time + I.delay + I.duration,
          delay: 0,
          duration: I.duration,
          ease: I.ease
        });
      }
  return new Be(s, this._parents, e, i);
}
function ol() {
  var e, t, i = this, s = i._id, n = i.size();
  return new Promise(function(o, a) {
    var d = { value: a }, c = { value: function() {
      --n === 0 && o();
    } };
    i.each(function() {
      var p = Le(this, s), I = p.on;
      I !== e && (t = (e = I).copy(), t._.cancel.push(d), t._.interrupt.push(d), t._.end.push(c)), p.on = t;
    }), n === 0 && o();
  });
}
var al = 0;
function Be(e, t, i, s) {
  this._groups = e, this._parents = t, this._name = i, this._id = s;
}
function Ms() {
  return ++al;
}
var qe = Ht.prototype;
Be.prototype = {
  constructor: Be,
  select: qd,
  selectAll: Fd,
  selectChild: qe.selectChild,
  selectChildren: qe.selectChildren,
  filter: Td,
  merge: Rd,
  selection: Vd,
  transition: sl,
  call: qe.call,
  nodes: qe.nodes,
  node: qe.node,
  size: qe.size,
  empty: qe.empty,
  each: qe.each,
  on: Ld,
  attr: Id,
  attrTween: bd,
  style: Yd,
  styleTween: Qd,
  text: el,
  textTween: nl,
  remove: Ud,
  tween: cd,
  delay: $d,
  duration: Cd,
  ease: Md,
  easeVarying: Od,
  end: ol,
  [Symbol.iterator]: qe[Symbol.iterator]
};
function rl(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var dl = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: rl
};
function ll(e, t) {
  for (var i; !(i = e.__transition) || !(i = i[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return i;
}
function cl(e) {
  var t, i;
  e instanceof Be ? (t = e._id, e = e._name) : (t = Ms(), (i = dl).time = nn(), e = e == null ? null : e + "");
  for (var s = this._groups, n = s.length, o = 0; o < n; ++o)
    for (var a = s[o], d = a.length, c, p = 0; p < d; ++p)
      (c = a[p]) && wi(c, e, t, p, a, i || ll(c, t));
  return new Be(s, this._parents, e, t);
}
Ht.prototype.interrupt = rd;
Ht.prototype.transition = cl;
const ei = (e) => () => e;
function pl(e, {
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
function Fe(e, t, i) {
  this.k = e, this.x = t, this.y = i;
}
Fe.prototype = {
  constructor: Fe,
  scale: function(e) {
    return e === 1 ? this : new Fe(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Fe(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Rt = new Fe(1, 0, 0);
Fe.prototype;
function Ti(e) {
  e.stopImmediatePropagation();
}
function St(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function ul(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function ml() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function Un() {
  return this.__zoom || Rt;
}
function hl(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function fl() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function gl(e, t, i) {
  var s = e.invertX(t[0][0]) - i[0][0], n = e.invertX(t[1][0]) - i[1][0], o = e.invertY(t[0][1]) - i[0][1], a = e.invertY(t[1][1]) - i[1][1];
  return e.translate(
    n > s ? (s + n) / 2 : Math.min(0, s) || Math.max(0, n),
    a > o ? (o + a) / 2 : Math.min(0, o) || Math.max(0, a)
  );
}
function Il() {
  var e = ul, t = ml, i = gl, s = hl, n = fl, o = [0, 1 / 0], a = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, c = Jr, p = en("start", "zoom", "end"), I, f, y, h = 500, r = 150, u = 0, g = 10;
  function k(m) {
    m.property("__zoom", Un).on("wheel.zoom", L, { passive: !1 }).on("mousedown.zoom", R).on("dblclick.zoom", z).filter(n).on("touchstart.zoom", D).on("touchmove.zoom", U).on("touchend.zoom touchcancel.zoom", re).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  k.transform = function(m, v, w, _) {
    var M = m.selection ? m.selection() : m;
    M.property("__zoom", Un), m !== M ? b(m, v, w, _) : M.interrupt().each(function() {
      x(this, arguments).event(_).start().zoom(null, typeof v == "function" ? v.apply(this, arguments) : v).end();
    });
  }, k.scaleBy = function(m, v, w, _) {
    k.scaleTo(m, function() {
      var M = this.__zoom.k, S = typeof v == "function" ? v.apply(this, arguments) : v;
      return M * S;
    }, w, _);
  }, k.scaleTo = function(m, v, w, _) {
    k.transform(m, function() {
      var M = t.apply(this, arguments), S = this.__zoom, E = w == null ? P(M) : typeof w == "function" ? w.apply(this, arguments) : w, N = S.invert(E), B = typeof v == "function" ? v.apply(this, arguments) : v;
      return i(O(C(S, B), E, N), M, a);
    }, w, _);
  }, k.translateBy = function(m, v, w, _) {
    k.transform(m, function() {
      return i(this.__zoom.translate(
        typeof v == "function" ? v.apply(this, arguments) : v,
        typeof w == "function" ? w.apply(this, arguments) : w
      ), t.apply(this, arguments), a);
    }, null, _);
  }, k.translateTo = function(m, v, w, _, M) {
    k.transform(m, function() {
      var S = t.apply(this, arguments), E = this.__zoom, N = _ == null ? P(S) : typeof _ == "function" ? _.apply(this, arguments) : _;
      return i(Rt.translate(N[0], N[1]).scale(E.k).translate(
        typeof v == "function" ? -v.apply(this, arguments) : -v,
        typeof w == "function" ? -w.apply(this, arguments) : -w
      ), S, a);
    }, _, M);
  };
  function C(m, v) {
    return v = Math.max(o[0], Math.min(o[1], v)), v === m.k ? m : new Fe(v, m.x, m.y);
  }
  function O(m, v, w) {
    var _ = v[0] - w[0] * m.k, M = v[1] - w[1] * m.k;
    return _ === m.x && M === m.y ? m : new Fe(m.k, _, M);
  }
  function P(m) {
    return [(+m[0][0] + +m[1][0]) / 2, (+m[0][1] + +m[1][1]) / 2];
  }
  function b(m, v, w, _) {
    m.on("start.zoom", function() {
      x(this, arguments).event(_).start();
    }).on("interrupt.zoom end.zoom", function() {
      x(this, arguments).event(_).end();
    }).tween("zoom", function() {
      var M = this, S = arguments, E = x(M, S).event(_), N = t.apply(M, S), B = w == null ? P(N) : typeof w == "function" ? w.apply(M, S) : w, ie = Math.max(N[1][0] - N[0][0], N[1][1] - N[0][1]), Z = M.__zoom, H = typeof v == "function" ? v.apply(M, S) : v, G = c(Z.invert(B).concat(ie / Z.k), H.invert(B).concat(ie / H.k));
      return function(F) {
        if (F === 1) F = H;
        else {
          var j = G(F), he = ie / j[2];
          F = new Fe(he, B[0] - j[0] * he, B[1] - j[1] * he);
        }
        E.zoom(null, F);
      };
    });
  }
  function x(m, v, w) {
    return !w && m.__zooming || new A(m, v);
  }
  function A(m, v) {
    this.that = m, this.args = v, this.active = 0, this.sourceEvent = null, this.extent = t.apply(m, v), this.taps = 0;
  }
  A.prototype = {
    event: function(m) {
      return m && (this.sourceEvent = m), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(m, v) {
      return this.mouse && m !== "mouse" && (this.mouse[1] = v.invert(this.mouse[0])), this.touch0 && m !== "touch" && (this.touch0[1] = v.invert(this.touch0[0])), this.touch1 && m !== "touch" && (this.touch1[1] = v.invert(this.touch1[0])), this.that.__zoom = v, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(m) {
      var v = Pe(this.that).datum();
      p.call(
        m,
        this.that,
        new pl(m, {
          sourceEvent: this.sourceEvent,
          target: k,
          transform: this.that.__zoom,
          dispatch: p
        }),
        v
      );
    }
  };
  function L(m, ...v) {
    if (!e.apply(this, arguments)) return;
    var w = x(this, v).event(m), _ = this.__zoom, M = Math.max(o[0], Math.min(o[1], _.k * Math.pow(2, s.apply(this, arguments)))), S = Ze(m);
    if (w.wheel)
      (w.mouse[0][0] !== S[0] || w.mouse[0][1] !== S[1]) && (w.mouse[1] = _.invert(w.mouse[0] = S)), clearTimeout(w.wheel);
    else {
      if (_.k === M) return;
      w.mouse = [S, _.invert(S)], di(this), w.start();
    }
    St(m), w.wheel = setTimeout(E, r), w.zoom("mouse", i(O(C(_, M), w.mouse[0], w.mouse[1]), w.extent, a));
    function E() {
      w.wheel = null, w.end();
    }
  }
  function R(m, ...v) {
    if (y || !e.apply(this, arguments)) return;
    var w = m.currentTarget, _ = x(this, v, !0).event(m), M = Pe(m.view).on("mousemove.zoom", B, !0).on("mouseup.zoom", ie, !0), S = Ze(m, w), E = m.clientX, N = m.clientY;
    Er(m.view), Ti(m), _.mouse = [S, this.__zoom.invert(S)], di(this), _.start();
    function B(Z) {
      if (St(Z), !_.moved) {
        var H = Z.clientX - E, G = Z.clientY - N;
        _.moved = H * H + G * G > u;
      }
      _.event(Z).zoom("mouse", i(O(_.that.__zoom, _.mouse[0] = Ze(Z, w), _.mouse[1]), _.extent, a));
    }
    function ie(Z) {
      M.on("mousemove.zoom mouseup.zoom", null), Sr(Z.view, _.moved), St(Z), _.event(Z).end();
    }
  }
  function z(m, ...v) {
    if (e.apply(this, arguments)) {
      var w = this.__zoom, _ = Ze(m.changedTouches ? m.changedTouches[0] : m, this), M = w.invert(_), S = w.k * (m.shiftKey ? 0.5 : 2), E = i(O(C(w, S), _, M), t.apply(this, v), a);
      St(m), d > 0 ? Pe(this).transition().duration(d).call(b, E, _, m) : Pe(this).call(k.transform, E, _, m);
    }
  }
  function D(m, ...v) {
    if (e.apply(this, arguments)) {
      var w = m.touches, _ = w.length, M = x(this, v, m.changedTouches.length === _).event(m), S, E, N, B;
      for (Ti(m), E = 0; E < _; ++E)
        N = w[E], B = Ze(N, this), B = [B, this.__zoom.invert(B), N.identifier], M.touch0 ? !M.touch1 && M.touch0[2] !== B[2] && (M.touch1 = B, M.taps = 0) : (M.touch0 = B, S = !0, M.taps = 1 + !!I);
      I && (I = clearTimeout(I)), S && (M.taps < 2 && (f = B[0], I = setTimeout(function() {
        I = null;
      }, h)), di(this), M.start());
    }
  }
  function U(m, ...v) {
    if (this.__zooming) {
      var w = x(this, v).event(m), _ = m.changedTouches, M = _.length, S, E, N, B;
      for (St(m), S = 0; S < M; ++S)
        E = _[S], N = Ze(E, this), w.touch0 && w.touch0[2] === E.identifier ? w.touch0[0] = N : w.touch1 && w.touch1[2] === E.identifier && (w.touch1[0] = N);
      if (E = w.that.__zoom, w.touch1) {
        var ie = w.touch0[0], Z = w.touch0[1], H = w.touch1[0], G = w.touch1[1], F = (F = H[0] - ie[0]) * F + (F = H[1] - ie[1]) * F, j = (j = G[0] - Z[0]) * j + (j = G[1] - Z[1]) * j;
        E = C(E, Math.sqrt(F / j)), N = [(ie[0] + H[0]) / 2, (ie[1] + H[1]) / 2], B = [(Z[0] + G[0]) / 2, (Z[1] + G[1]) / 2];
      } else if (w.touch0) N = w.touch0[0], B = w.touch0[1];
      else return;
      w.zoom("touch", i(O(E, N, B), w.extent, a));
    }
  }
  function re(m, ...v) {
    if (this.__zooming) {
      var w = x(this, v).event(m), _ = m.changedTouches, M = _.length, S, E;
      for (Ti(m), y && clearTimeout(y), y = setTimeout(function() {
        y = null;
      }, h), S = 0; S < M; ++S)
        E = _[S], w.touch0 && w.touch0[2] === E.identifier ? delete w.touch0 : w.touch1 && w.touch1[2] === E.identifier && delete w.touch1;
      if (w.touch1 && !w.touch0 && (w.touch0 = w.touch1, delete w.touch1), w.touch0) w.touch0[1] = this.__zoom.invert(w.touch0[0]);
      else if (w.end(), w.taps === 2 && (E = Ze(E, this), Math.hypot(f[0] - E[0], f[1] - E[1]) < g)) {
        var N = Pe(this).on("dblclick.zoom");
        N && N.apply(this, arguments);
      }
    }
  }
  return k.wheelDelta = function(m) {
    return arguments.length ? (s = typeof m == "function" ? m : ei(+m), k) : s;
  }, k.filter = function(m) {
    return arguments.length ? (e = typeof m == "function" ? m : ei(!!m), k) : e;
  }, k.touchable = function(m) {
    return arguments.length ? (n = typeof m == "function" ? m : ei(!!m), k) : n;
  }, k.extent = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : ei([[+m[0][0], +m[0][1]], [+m[1][0], +m[1][1]]]), k) : t;
  }, k.scaleExtent = function(m) {
    return arguments.length ? (o[0] = +m[0], o[1] = +m[1], k) : [o[0], o[1]];
  }, k.translateExtent = function(m) {
    return arguments.length ? (a[0][0] = +m[0][0], a[1][0] = +m[1][0], a[0][1] = +m[0][1], a[1][1] = +m[1][1], k) : [[a[0][0], a[0][1]], [a[1][0], a[1][1]]];
  }, k.constrain = function(m) {
    return arguments.length ? (i = m, k) : i;
  }, k.duration = function(m) {
    return arguments.length ? (d = +m, k) : d;
  }, k.interpolate = function(m) {
    return arguments.length ? (c = m, k) : c;
  }, k.on = function() {
    var m = p.on.apply(p, arguments);
    return m === p ? k : m;
  }, k.clickDistance = function(m) {
    return arguments.length ? (u = (m = +m) * m, k) : Math.sqrt(u);
  }, k.tapDistance = function(m) {
    return arguments.length ? (g = +m, k) : g;
  }, k;
}
var yl = Object.defineProperty, vl = Object.getOwnPropertyDescriptor, me = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? vl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && yl(t, i, n), n;
};
function wl(e, t, i, s) {
  const n = t.x - e.x, o = t.y - e.y, a = s.x - i.x, d = s.y - i.y, c = n * d - o * a;
  if (Math.abs(c) < 1e-9) return null;
  const p = ((i.x - e.x) * d - (i.y - e.y) * a) / c, I = ((i.x - e.x) * o - (i.y - e.y) * n) / c;
  return p <= 0.02 || p >= 0.98 || I <= 0.02 || I >= 0.98 ? null : { x: e.x + p * n, y: e.y + p * o, t: p };
}
function xl(e, t, i) {
  const s = i.x - t.x, n = i.y - t.y, o = s * s + n * n || 1, a = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * n) / o)), d = t.x + a * s, c = t.y + a * n;
  return { dist: Math.hypot(e.x - d, e.y - c), t: a };
}
function bl(e, t, i = 7) {
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 0; n < e.length - 1; n++) {
    const o = e[n], a = e[n + 1], d = Math.hypot(a.x - o.x, a.y - o.y) || 1, c = (a.x - o.x) / d, p = (a.y - o.y) / d, I = t.map(([y, h]) => wl(o, a, y, h)).filter((y) => y !== null).filter((y) => y.t * d > i + 2 && (1 - y.t) * d > i + 2).sort((y, h) => y.t - h.t);
    let f = -1 / 0;
    for (const y of I)
      y.t * d - i <= f + 2 || (s += ` L ${y.x - c * i} ${y.y - p * i}`, s += ` A ${i} ${i} 0 0 1 ${y.x + c * i} ${y.y + p * i}`, f = y.t * d + i);
    s += ` L ${a.x} ${a.y}`;
  }
  return s;
}
const ut = {
  component: X`<rect x="3.5" y="0.5" width="8" height="11" rx="1"></rect>
    <rect x="0.5" y="2.5" width="6" height="2.6"></rect>
    <rect x="0.5" y="6.9" width="6" height="2.6"></rect>`,
  aggregate: X`<path d="M6 0.5 L11.5 6 L6 11.5 L0.5 6 Z"></path>`,
  entity: X`<rect x="0.5" y="1.5" width="11" height="9" rx="1"></rect>
    <line x1="0.5" y1="4.6" x2="11.5" y2="4.6"></line>`,
  flow: X`<path d="M0.5 6 H8"></path><path d="M5.5 2.5 L9.5 6 L5.5 9.5"></path>`,
  process: X`<path d="M0.5 3 H7 V0.8 L11.5 6 L7 11.2 V9 H0.5 Z"></path>`,
  person: X`<circle cx="6" cy="3.2" r="2.4"></circle>
    <path d="M1.5 11.5 C1.5 7.6, 10.5 7.6, 10.5 11.5"></path>`,
  clock: X`<circle cx="6" cy="6" r="4.4" fill="none"></circle>
    <path d="M6 3.4 L6 6 L7.9 7.4" fill="none" stroke-linecap="round"></path>`,
  key: X`<circle cx="4.2" cy="4.2" r="2.6" fill="none"></circle>
    <path d="M6 6 L10 10 M8 8 L9.6 6.4 M9 9 L10.6 7.4" fill="none" stroke-linecap="round"></path>`,
  gear: X`<circle cx="6" cy="6" r="2.6"></circle>
    <line x1="6" y1="0.5" x2="6" y2="2.6"></line><line x1="6" y1="9.4" x2="6" y2="11.5"></line>
    <line x1="0.5" y1="6" x2="2.6" y2="6"></line><line x1="9.4" y1="6" x2="11.5" y2="6"></line>`,
  event: X`<circle cx="6" cy="6" r="5"></circle><circle cx="6" cy="6" r="2.6"></circle>`,
  readmodel: X`<path d="M1.5 3 C1.5 1.2 10.5 1.2 10.5 3 V9 C10.5 10.8 1.5 10.8 1.5 9 Z"></path>
    <path d="M1.5 3 C1.5 4.8 10.5 4.8 10.5 3"></path>`,
  lens: X`<circle cx="5" cy="5" r="3.8"></circle>
    <line x1="7.8" y1="7.8" x2="11.2" y2="11.2"></line>`,
  robot: X`<rect x="2" y="4" width="8" height="6.5" rx="1.5"></rect>
    <line x1="6" y1="4" x2="6" y2="1.5"></line><circle cx="6" cy="1.2" r="0.9"></circle>
    <circle cx="4.4" cy="7" r="0.8"></circle><circle cx="7.6" cy="7" r="0.8"></circle>`,
  usecase: X`<ellipse cx="6" cy="6" rx="5.5" ry="3.6"></ellipse>`,
  // ArchiMate application interface: the lollipop (a line ending in a circle).
  interface: X`<line x1="0.5" y1="6" x2="5.6" y2="6"></line>
    <circle cx="8.9" cy="6" r="2.8"></circle>`,
  undo: X`<path d="M10.5 8.5 A4.7 4.7 0 1 0 9.4 2.7"></path>
    <path d="M9.6 0.5 L9.4 3.2 L6.8 2.6"></path>`,
  // An MCP gateway: a plug — many things connect behind one socket.
  plug: X`<path d="M4 0.5 V3.5"></path><path d="M8 0.5 V3.5"></path>
    <path d="M2.5 3.5 H9.5 V6 A3.5 3.5 0 0 1 2.5 6 Z"></path>
    <path d="M6 9.5 V11.5"></path>`
};
let pe = class extends Ne {
  constructor() {
    super(...arguments), this.scene = { nodes: [], edges: [] }, this.selectedId = null, this.selectedIds = [], this.connectable = !0, this.edgePoints = {}, this._t = Rt, this._dragPos = null, this._menuSlots = null, this._dragGroup = null, this._pendingLink = null, this._hoverNodeId = null, this._editingId = null, this._spaceDown = !1, this._wpDrag = null, this._selectedWaypoint = null, this._resize = null, this._rubber = null, this._fitted = !1, this._onWindowSpace = (e) => {
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
    this._zoomBehavior = Il().scaleExtent([0.15, 4]).filter((t) => t.type === "wheel" ? !0 : this._spaceDown && t.button === 0).on("zoom", (t) => {
      this._t = t.transform;
    }), Pe(e).call(this._zoomBehavior);
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
    const n = this.fitInsets.left ?? 0, o = this.fitInsets.right ?? 0, a = this.fitInsets.top ?? 0, d = this.fitInsets.bottom ?? 0, c = Math.max(80, s.width - n - o), p = Math.max(80, s.height - a - d), I = Math.min(...t.map((g) => g.x - g.w / 2)) - e, f = Math.max(...t.map((g) => g.x + g.w / 2)) + e, y = Math.min(...t.map((g) => g.y - g.h / 2)) - e, h = Math.max(...t.map((g) => g.y + g.h / 2)) + e, r = Math.max(0.15, Math.min(c / (f - I), p / (h - y), 1.25)), u = Rt.translate(
      n + c / 2 - r * (I + f) / 2,
      a + p / 2 - r * (y + h) / 2
    ).scale(r);
    Pe(i).call(this._zoomBehavior.transform, u);
  }
  /** Zoom in/out around the viewport centre (keyboard shortcuts, external buttons). */
  zoomBy(e) {
    const t = this.renderRoot.querySelector("svg.main");
    !t || !this._zoomBehavior || this._zoomBehavior.scaleBy(Pe(t), e);
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
      (g) => o.has(g.id) && !(g.parentId && o.has(g.parentId))
    ) : null, d = a ? new Map(a.map((g) => [g.id, this.nodePos(g)])) : null, c = (g) => (g.shiftKey || g.ctrlKey) && (t.kind === "api" || t.kind === "proxy-api") && !a, p = a ? null : t.kind === "menu-item" || t.kind === "menu-group" ? "menu" : t.kind === "wizard-step-row" ? "wizard" : null, I = p !== null, f = p === "menu" ? ["menu-item", "menu-group"] : ["wizard-step-row"], y = () => {
      const g = [], k = p === "menu" ? this.scene.nodes.filter((C) => C.kind === "ui-app") : this.scene.nodes.filter((C) => C.id === t.parentId);
      for (const C of k) {
        const O = this.scene.nodes.filter((A) => A.parentId === C.id && f.includes(A.kind ?? "") && A.id !== t.id).sort((A, L) => A.y - L.y), P = C.x - C.w / 2 + 10, b = C.x + C.w / 2 - 10;
        for (const A of O) g.push({ x1: P, x2: b, y: A.y - A.h / 2 - 3, appId: C.id, beforeId: A.id });
        const x = O[O.length - 1];
        g.push({
          x1: P,
          x2: b,
          y: x ? x.y + x.h / 2 + 3 : C.y - C.h / 2 + 34 + 8,
          appId: C.id,
          beforeId: null
        });
      }
      return g;
    }, h = (g) => {
      const k = this.nodeIdAt(g), C = k && k !== t.id ? this.scene.nodes.find((O) => O.id === k) : void 0;
      return C ? C.kind === "external-system" ? C.id : C.parentId ?? null : null;
    }, r = (g) => {
      if ((g.buttons & 1) === 0) {
        u(g);
        return;
      }
      const k = this.toScene(g), C = k.x - i.x, O = k.y - i.y;
      if (!(!n && Math.hypot(C, O) < 3 / this._t.k))
        if (n = !0, a && d) {
          const P = /* @__PURE__ */ new Map();
          for (const b of a) {
            const x = d.get(b.id), A = this.clampToParent(b, x.x + C, x.y + O);
            P.set(b.id, { x: A.x, y: A.y });
          }
          this._dragGroup = P;
        } else if (I) {
          this._dragPos = { id: t.id, x: s.x + C, y: s.y + O }, this._menuSlots || (this._menuSlots = { slots: y(), active: null, nestRowId: null });
          const P = this.scene.nodes.filter(
            (x) => f.includes(x.kind ?? "") && x.id !== t.id && Math.abs(k.x - x.x) <= x.w / 2 + 8
          ), b = p === "menu" ? P.find((x) => Math.abs(k.y - x.y) < x.h * 0.28) : void 0;
          if (b)
            this._menuSlots = { ...this._menuSlots, active: null, nestRowId: b.id }, this._hoverNodeId = b.id;
          else {
            let x = -1, A = 14;
            this._menuSlots.slots.forEach((L, R) => {
              if (k.x < L.x1 - 24 || k.x > L.x2 + 24) return;
              const z = Math.abs(k.y - L.y);
              z < A && (A = z, x = R);
            }), this._menuSlots = { ...this._menuSlots, active: x >= 0 ? x : null, nestRowId: null }, this._hoverNodeId = null;
          }
        } else c(g) ? (this._dragPos = { id: t.id, x: s.x + C, y: s.y + O }, this._hoverNodeId = h(g)) : (this._dragPos = this.clampToParent(t, s.x + C, s.y + O), this._hoverNodeId = null);
    }, u = (g) => {
      if (window.removeEventListener("pointermove", r), window.removeEventListener("pointerup", u), n && this._dragGroup)
        this.emit("nodes-moved", {
          moves: [...this._dragGroup.entries()].map(([k, C]) => ({ id: k, x: C.x, y: C.y }))
        });
      else if (n && this._dragPos && I) {
        const k = this._menuSlots;
        this._menuSlots = null, this._dragPos = null, this._hoverNodeId = null;
        const C = p === "wizard" ? "wizard-slot-requested" : "menu-slot-requested";
        if (k != null && k.nestRowId)
          this.emit(C, { id: t.id, nestRowId: k.nestRowId });
        else if (k && k.active !== null) {
          const O = k.slots[k.active];
          this.emit(C, { id: t.id, appId: O.appId, beforeId: O.beforeId });
        }
        return;
      } else if (n && this._dragPos) {
        if (c(g)) {
          const k = h(g);
          if (g.ctrlKey && t.kind === "api") {
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
  onResizePointerDown(e, t, i, s) {
    if (e.button !== 0 || (e.buttons & 1) === 0) return;
    e.stopPropagation(), this.focus();
    const n = 160, o = 90, a = { x: t.x, y: t.y, w: t.w, h: t.h }, d = this.scene.nodes.filter((u) => u.parentId === t.id), c = Math.min(...d.map((u) => u.x - u.w / 2)), p = Math.max(...d.map((u) => u.x + u.w / 2)), I = Math.min(...d.map((u) => u.y - u.h / 2)), f = Math.max(...d.map((u) => u.y + u.h / 2)), y = js(
      d.map((u) => ({ dx: u.x - a.x, dy: u.y - a.y, w: u.w, h: u.h })),
      { w: n, h: o }
    ), h = (u) => {
      if ((u.buttons & 1) === 0) {
        r();
        return;
      }
      const g = this.toScene(u);
      if (u.shiftKey) {
        this._resize = {
          id: t.id,
          x: a.x,
          y: a.y,
          w: Math.max(y.w, 2 * Math.abs(g.x - a.x)),
          h: Math.max(y.h, 2 * Math.abs(g.y - a.y))
        };
        return;
      }
      const k = a.x - i * a.w / 2, C = a.y - s * a.h / 2, O = i > 0 ? Math.max(g.x, k + n, d.length ? p + 10 : -1 / 0) : Math.min(g.x, k - n, d.length ? c - 10 : 1 / 0), P = s > 0 ? Math.max(g.y, C + o, d.length ? f + 10 : -1 / 0) : Math.min(g.y, C - o, d.length ? I - 34 : 1 / 0);
      this._resize = {
        id: t.id,
        x: (k + O) / 2,
        y: (C + P) / 2,
        w: Math.abs(O - k),
        h: Math.abs(P - C)
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
    const t = this.scene.nodes.find((I) => I.id === e.sourceId), i = this.scene.nodes.find((I) => I.id === e.targetId);
    if (!t || !i) return null;
    const s = this._wpDrag && this._wpDrag.edgeId === e.id ? this._wpDrag.points : this.edgePoints[e.id] ?? [], n = this.nodePos(t), o = this.nodePos(i), a = s[0] ?? o, d = s[s.length - 1] ?? n;
    let c = this.borderPoint(t, a.x, a.y), p = this.borderPoint(i, d.x, d.y);
    if (!s.length) {
      const I = this.edgeOffset(e);
      if (I !== 0) {
        const f = Math.hypot(p.x - c.x, p.y - c.y) || 1, y = -(p.y - c.y) / f * I, h = (p.x - c.x) / f * I;
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
      const { dist: n } = xl(t, e[s], e[s + 1]);
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
          const I = [...this._wpDrag.points];
          I[n] = p, this._wpDrag = { ...this._wpDrag, points: I };
        }
      } else {
        if (Math.hypot(p.x - s.x, p.y - s.y) < 4 / this._t.k) return;
        o = !0, this.focus();
        const I = [...this.edgePoints[t.id] ?? []];
        I.splice(n, 0, p), this._selectedWaypoint = { edgeId: t.id, index: n }, this._wpDrag = { edgeId: t.id, points: I, index: n };
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
    return X`
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
          ${e.tooltip ? X`<title>${e.tooltip}</title>` : ""}
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
    return X`
      <g data-edge-ink=${e.id} pointer-events="none">
        <path d=${bl(t, i)}
              fill="none"
              stroke=${s} stroke-width=${o ? 3 : 1.6}
              stroke-dasharray=${e.dashed ? "6 4" : ""}
              opacity="0.92"
              marker-end=${e.arrow ? `url(#arrow-${this.markerId(s)})` : ""}></path>
        ${e.label ? X`<text x=${d.x} y=${d.y - 6} text-anchor="middle"
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
        ${n ? c.map((p, I) => {
      var y;
      const f = ((y = this._selectedWaypoint) == null ? void 0 : y.edgeId) === e.id && this._selectedWaypoint.index === I;
      return X`
                <circle data-waypoint cx=${p.x} cy=${p.y} r=${f ? 6 : 5}
                        fill=${f ? "#2563eb" : "#ffffff"}
                        stroke="#2563eb" stroke-width="1.6" pointer-events="all"
                        style="cursor: move"
                        @pointerdown=${(h) => {
        h.button === 0 && (h.stopPropagation(), this.focus(), this._selectedWaypoint = { edgeId: e.id, index: I }, this.startWaypointDrag(e, [...this.edgePoints[e.id] ?? []], I));
      }}
                        @dblclick=${(h) => {
        h.stopPropagation(), this.removeWaypoint(e, I);
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
    const { x: t, y: i } = this.nodePos(e), s = this.selectedId === e.id || this.selectedIds.includes(e.id), n = this._hoverNodeId === e.id, o = !!e.container, a = !!e.parentId, d = ((y = this._resize) == null ? void 0 : y.id) === e.id ? this._resize.w : e.w, c = ((h = this._resize) == null ? void 0 : h.id) === e.id ? this._resize.h : e.h, p = d / 2, I = c / 2, f = a && e.label.length > 14 ? `${e.label.slice(0, 13)}…` : e.label;
    return X`
      <g data-node-id=${e.id}
         transform="translate(${t}, ${i})${n ? " scale(1.06)" : ""}"
         pointer-events=${this._dragPos && this._dragPos.id === e.id || (r = this._dragGroup) != null && r.has(e.id) ? "none" : "auto"}
         @pointerdown=${(g) => this.onNodePointerDown(g, e)}
         @dblclick=${(g) => {
      g.stopPropagation(), this.emit("element-activated", { elementType: "node", id: e.id, kind: e.kind });
    }}>
        ${e.diffKind ? X`<rect x=${-p - 4} y=${-I - 4} width=${d + 8} height=${c + 8}
                  rx=${a ? 9 : 13} fill="none" pointer-events="none"
                  stroke=${e.diffKind === "ADDED" ? "#16a34a" : "#d97706"}
                  stroke-width="2" stroke-dasharray="7 4" opacity="0.9">
                <title>${e.diffKind === "ADDED" ? "Nuevo en esta solución (no existe en el sistema)" : "Modificado respecto al sistema"}</title>
              </rect>` : ""}
        <rect x=${-p} y=${-I} width=${d} height=${c} rx=${a ? 6 : 10}
              fill=${e.fill ?? "#ffffff"}
              stroke=${n || s ? "#2563eb" : e.stroke ?? "#94a3b8"}
              stroke-width=${s || n ? 2.5 : 1.4}
              stroke-dasharray=${e.dashed ? "6 4" : ""}>
          ${e.tooltip ? X`<title>${e.tooltip}</title>` : ""}
        </rect>
        ${e.badge ? X`<text x=${-p} y=${-I - 7} font-size="10" font-family="ui-sans-serif, system-ui"
                  fill="#64748b" letter-spacing="0.08em">${e.badge}</text>` : ""}
        ${e.collapsible ? X`<g transform="translate(${p - 13}, ${-I + 13})"
                  style="cursor: pointer" pointer-events="all"
                  @pointerdown=${(g) => {
      g.stopPropagation(), this.emit("node-collapse-toggled", { id: e.id });
    }}
                  @click=${(g) => g.stopPropagation()}>
                  <rect data-collapse-toggle x="-10" y="-11" width="20" height="20" rx="4"
                        fill="transparent"></rect>
                  <text text-anchor="middle" y="4" font-size="12" fill="#475569"
                        pointer-events="none">${e.collapsed ? "▸" : "▾"}</text>
                  <title>${e.collapsed ? "Expandir: muestra los hijos del nodo" : "Contraer: oculta los hijos"}</title>
                </g>` : ""}
        ${e.symbol && ut[e.symbol] && !a ? X`<g transform="translate(${p - (e.collapsible ? 37 : 17)}, ${-I + 5})" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.1" stroke-linejoin="round"
                  stroke-linecap="round" opacity="0.85" pointer-events="none">
                ${ut[e.symbol]}
              </g>` : ""}
        ${a && e.symbol && ut[e.symbol] ? X`<g transform="translate(${-p + 8}, -6)" fill="none"
                  stroke=${e.stroke ?? "#64748b"} stroke-width="1.2" stroke-linejoin="round"
                  stroke-linecap="round" pointer-events="none">
                ${ut[e.symbol]}
              </g>` : ""}
        ${this._editingId === e.id ? X`
              <foreignObject x=${-p + 6} y=${o ? -I + 6 : -14} width=${e.w - 12} height="28">
                <input
                  style="width: 100%; box-sizing: border-box; font: 600 13px ui-sans-serif, system-ui; text-align: ${o ? "left" : "center"}; border: 1px solid #2563eb; border-radius: 4px; padding: 3px;"
                  .value=${e.label}
                  @pointerdown=${(g) => g.stopPropagation()}
                  @keydown=${(g) => {
      g.stopPropagation(), g.key === "Enter" && this.commitRename(e, g.target.value), g.key === "Escape" && (this._editingId = null);
    }}
                  @blur=${(g) => this.commitRename(e, g.target.value)}
                />
              </foreignObject>` : a ? X`<text x=${-p + 24} y="4" text-anchor="start" font-size="12" font-weight="600"
                font-family="ui-sans-serif, system-ui" fill="#1e293b" pointer-events="none">${f}</text>` : o ? X`<text x=${-p + 12} y=${-I + 21} text-anchor="start" font-size="13"
                  font-weight="700" font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>` : X`<text x="0" y="4" text-anchor="middle" font-size="13" font-weight="600"
                  font-family="ui-sans-serif, system-ui" fill="#1e293b">${e.label}</text>`}
        ${o ? X`<line x1=${-p + 8} y1=${-I + 28} x2=${p - 8} y2=${-I + 28}
                stroke="#e2e8f0" stroke-width="1" pointer-events="none"></line>` : ""}
        ${s && this.connectable && (a ? e.kind === "menu-item" || e.kind === "menu-group" || e.kind === "wizard-step-row" || e.kind === "etl-flow" || e.kind === "scheduled-trigger" || e.kind === "aggregate" || e.kind === "domain-service" || e.kind === "use-case" || e.kind === "domain-event" || e.kind === "application-event" || e.kind === "external-use-case" || e.kind === "external-table" || e.kind === "api-operation" || e.kind === "api-op-occurrence" || e.kind === "api" || e.kind === "api-impl" || e.kind === "proxy-api" : e.kind === "model" || e.kind === "identity-provider" || e.kind === "etl-flow" || e.kind === "external-system" || e.kind === "actor" || e.kind === "ai-agent" || e.kind === "rag" || e.kind === "mcp-gateway" || e.kind === "api" || e.kind === "proxy-api" || e.kind === "workflow" || e.kind === "workflow-step" || e.kind === "page" || e.kind === "menu-item") ? [
      [p, 0],
      [-p, 0],
      [0, I],
      [0, -I]
    ].map(
      ([g, k]) => X`
                <circle data-handle cx=${g} cy=${k} r="6" fill="#2563eb" stroke="#ffffff"
                        stroke-width="1.5"
                        @pointerdown=${(C) => this.onHandlePointerDown(C, e)}>
                  <title>${a ? e.kind === "api" ? "Arrastra hasta otro sistema externo: la API se moverá a ese publicador" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o a otro sistema externo para moverlo" : e.kind === "domain-event" || e.kind === "application-event" ? "Arrastra hasta otro contexto o un read model para materializarlo (flow)" : e.kind === "external-use-case" || e.kind === "external-table" ? "Arrastra hasta un read model o un contexto para proyectarlo (polling)" : e.kind === "api-operation" ? "Arrastra hasta el caso de uso, policy o contexto que la implementa" : e.kind === "api-op-occurrence" ? "Arrastra hasta la implementación que sirve esta operación (la API publicada o la de un bounded context)" : e.kind === "use-case" ? "Arrastra hasta otro caso de uso para invocarlo, o hasta un evento de aplicación para publicarlo" : "Arrastra hasta un evento de dominio para declarar que lo emite" : e.kind === "actor" ? "Arrastra hasta un caso de uso, query service o agregado (deriva una UI), o hasta un sistema externo (dependencia)" : e.kind === "ai-agent" ? "Arrastra hasta una herramienta (caso de uso, query service, operación, servidor MCP, gateway), otro agente o un RAG" : e.kind === "mcp-gateway" ? "Arrastra hasta lo que expone: un servidor MCP, una API, una operación, un caso de uso o un RAG" : e.kind === "rag" ? "Arrastra hasta un read model: el RAG indexará su contenido" : e.kind === "workflow-step" ? "Arrastra hasta otro paso: el destino esperará a que éste complete" : e.kind === "external-system" ? "Arrastra hasta un caso de uso (lo llamará vía ACL), otro sistema externo, una API o un proxy (dependencia)" : e.kind === "api" ? "Arrastra hasta el sistema externo que la publica: la API se anida en él" : e.kind === "proxy-api" ? "Arrastra hasta la API que proxea, o hasta el sistema externo que lo aloja" : e.kind === "workflow" ? "Arrastra hasta un caso de uso: el workflow lo orquestará como un paso" : "Arrastra hasta otro nodo para crear una relación"}</title>
                </circle>`
    ) : ""}
        ${s && this.connectable && ((u = e.extraHandles) != null && u.length) ? e.extraHandles.map(
      (g, k) => X`
                <g transform="translate(${-p + 24 + k * 20}, ${-I})">
                  <circle data-handle r="7" fill=${g.color} stroke="#ffffff" stroke-width="1.5"
                          @pointerdown=${(C) => this.onHandlePointerDown(C, e, g.kind)}>
                    <title>${g.title}</title>
                  </circle>
                  <circle r="2.4" fill="#ffffff" pointer-events="none"></circle>
                </g>`
    ) : ""}
        ${o && s ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(
      ([g, k]) => X`
                <rect data-resize x=${g * p - 6.5} y=${k * I - 6.5} width="13" height="13" rx="2.5"
                      fill="#2563eb" stroke="#ffffff" stroke-width="1.5"
                      style="cursor: ${g * k > 0 ? "nwse" : "nesw"}-resize"
                      @pointerdown=${(C) => this.onResizePointerDown(C, e, g, k)}>
                  <title>Arrastra para cambiar el tamaño (Shift: simétrico desde el centro)</title>
                </rect>`
    ) : ""}
      </g>
    `;
  }
  renderPendingLink() {
    if (!this._pendingLink) return X``;
    const e = this.scene.nodes.find((i) => i.id === this._pendingLink.sourceId);
    if (!e) return X``;
    const t = this.borderPoint(e, this._pendingLink.x, this._pendingLink.y);
    return X`
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
        const { a, b: d } = this._rubber, c = Math.min(a.x, d.x), p = Math.max(a.x, d.x), I = Math.min(a.y, d.y), f = Math.max(a.y, d.y), y = this.scene.nodes.filter((h) => {
          const r = this.nodePos(h);
          return r.x >= c && r.x <= p && r.y >= I && r.y <= f;
        }).map((h) => h.id);
        this.emit("nodes-boxed", { ids: y });
      } else
        this.emit("selection-cleared");
      this._rubber = null;
    };
    window.addEventListener("pointermove", n), window.addEventListener("pointerup", o), window.addEventListener("pointercancel", s);
  }
  renderRubber() {
    if (!this._rubber) return X``;
    const { a: e, b: t } = this._rubber;
    return X`
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
    const s = this.getBoundingClientRect(), n = this._t.k, o = Rt.translate(s.width / 2 - n * e, s.height / 2 - n * t).scale(n);
    Pe(i).call(this._zoomBehavior.transform, o);
  }
  onMinimapPointer(e, t, i) {
    const s = e.currentTarget.getBoundingClientRect(), n = t.minX + (e.clientX - s.left) / i, o = t.minY + (e.clientY - s.top) / i;
    this.centerViewportOn(n, o);
  }
  renderMinimap() {
    const e = this.sceneBounds();
    if (!e || this.scene.nodes.length < 2) return $``;
    const t = 160, i = 110, s = Math.min(t / e.w, i / e.h), n = this.getBoundingClientRect(), o = (0 - this._t.x) / this._t.k, a = (0 - this._t.y) / this._t.k, d = n.width / this._t.k, c = n.height / this._t.k;
    return $`
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
      var I, f;
      (f = (I = p.currentTarget).hasPointerCapture) != null && f.call(I, p.pointerId) && this.onMinimapPointer(p, e, s);
    }}
      >
        <svg viewBox="0 0 ${t} ${i}">
          ${this.scene.nodes.map((p) => {
      const I = this.nodePos(p);
      return X`<rect
              x=${(I.x - p.w / 2 - e.minX) * s}
              y=${(I.y - p.h / 2 - e.minY) * s}
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
    }), $`
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
      (n) => X`
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
          ${this._menuSlots ? X`<g pointer-events="none">
                ${this._menuSlots.slots.map(
      (n, o) => X`
                    <line x1=${n.x1} y1=${n.y} x2=${n.x2} y2=${n.y}
                          stroke=${o === this._menuSlots.active ? "#0284c7" : "#bae6fd"}
                          stroke-width=${o === this._menuSlots.active ? 3.5 : 1.5}
                          stroke-linecap="round"></line>
                    ${o === this._menuSlots.active ? X`<circle cx=${n.x1} cy=${n.y} r="3.5" fill="#0284c7"></circle>
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
pe.styles = yt`
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
me([
  oe({ attribute: !1 })
], pe.prototype, "scene", 2);
me([
  oe({ attribute: !1 })
], pe.prototype, "selectedId", 2);
me([
  oe({ attribute: !1 })
], pe.prototype, "selectedIds", 2);
me([
  oe({ type: Boolean })
], pe.prototype, "connectable", 2);
me([
  oe({ attribute: !1 })
], pe.prototype, "edgePoints", 2);
me([
  q()
], pe.prototype, "_t", 2);
me([
  q()
], pe.prototype, "_dragPos", 2);
me([
  q()
], pe.prototype, "_menuSlots", 2);
me([
  q()
], pe.prototype, "_dragGroup", 2);
me([
  q()
], pe.prototype, "_pendingLink", 2);
me([
  q()
], pe.prototype, "_hoverNodeId", 2);
me([
  q()
], pe.prototype, "_editingId", 2);
me([
  q()
], pe.prototype, "_spaceDown", 2);
me([
  q()
], pe.prototype, "_wpDrag", 2);
me([
  q()
], pe.prototype, "_selectedWaypoint", 2);
me([
  q()
], pe.prototype, "_resize", 2);
me([
  q()
], pe.prototype, "_rubber", 2);
me([
  oe({ attribute: !1 })
], pe.prototype, "fitInsets", 2);
pe = me([
  vt("modux-canvas")
], pe);
const Y = {
  actor: { fill: "#fef9c3", stroke: "#ca8a04", w: 110, h: 40 },
  command: { fill: "#bfdbfe", stroke: "#1d4ed8", w: 150, h: 56 },
  aggregate: { fill: "#fef08a", stroke: "#a16207", w: 160, h: 48 },
  event: { fill: "#fdba74", stroke: "#c2410c", w: 150, h: 56 },
  policy: { fill: "#e9d5ff", stroke: "#7e22ce", w: 170, h: 56 },
  readModel: { fill: "#bbf7d0", stroke: "#15803d", w: 150, h: 48 },
  external: { fill: "#fbcfe8", stroke: "#be185d", w: 150, h: 48 },
  module: { fill: "#e0e7ff", stroke: "#64748b", w: 150, h: 44 }
};
function _e(e, t) {
  e.nodes.has(t.id) || e.nodes.set(t.id, t);
}
function ce(e, t) {
  e.edges.some((i) => i.id === t.id) || e.edges.push(t);
}
const ct = (e) => e.trim().toLowerCase();
function _l(e, t) {
  var R, z, D, U, re;
  const i = { nodes: /* @__PURE__ */ new Map(), edges: [] }, s = new Map(e.modules.map((m) => [m.id, m.name])), n = e.modules.flatMap(
    (m) => (m.useCases ?? []).map((v) => ({ ...v, moduleId: m.id }))
  ), o = new Set(n.map((m) => m.id)), a = e.aggregates ?? [], d = new Set(
    e.modules.flatMap((m) => (m.domainServices ?? []).map((v) => v.id))
  ), c = e.modules.flatMap(
    (m) => (m.domainEvents ?? []).map((v) => ({ ...v, moduleId: m.id, application: !1 }))
  ), p = e.modules.flatMap(
    (m) => (m.applicationEvents ?? []).map((v) => ({ ...v, moduleId: m.id, application: !0 }))
  ), I = e.modules.flatMap(
    (m) => (m.readModels ?? []).map((v) => ({ ...v, moduleId: m.id }))
  );
  for (const m of n)
    _e(i, {
      id: m.id,
      label: m.name,
      x: 0,
      y: 0,
      w: Y.command.w,
      h: Y.command.h,
      kind: "use-case",
      symbol: m.policy ? "flow" : "gear",
      fill: m.policy ? Y.policy.fill : Y.command.fill,
      stroke: m.policy ? Y.policy.stroke : Y.command.stroke,
      badge: m.policy ? "POLICY" : "COMANDO",
      tooltip: m.policy ? `${m.name} — policy de ${s.get(m.moduleId) ?? m.moduleId} (reacción, no caso de negocio)` : `${m.name} — caso de uso de ${s.get(m.moduleId) ?? m.moduleId}`
    });
  for (const m of a)
    _e(i, {
      id: m.id,
      label: m.name,
      x: 0,
      y: 0,
      w: Y.aggregate.w,
      h: Y.aggregate.h,
      kind: "aggregate",
      symbol: "aggregate",
      fill: Y.aggregate.fill,
      stroke: Y.aggregate.stroke,
      badge: "AGREGADO",
      tooltip: `${m.name} — agregado de ${s.get(m.moduleId) ?? m.moduleId}`
    });
  const f = /* @__PURE__ */ new Map();
  for (const m of [...c, ...p])
    _e(i, {
      id: m.id,
      label: m.name,
      x: 0,
      y: 0,
      w: Y.event.w,
      h: Y.event.h,
      kind: m.application ? "application-event" : "domain-event",
      symbol: "event",
      fill: Y.event.fill,
      stroke: Y.event.stroke,
      badge: m.application ? "EVENTO APLICACIÓN" : "EVENTO",
      tooltip: `${m.name} — evento de ${s.get(m.moduleId) ?? m.moduleId}`
    }), f.set(ct(m.name), m.id);
  const y = (m) => {
    if (!m || !m.trim()) return null;
    const v = f.get(ct(m));
    if (v) return v;
    const w = `evname:${ct(m)}`;
    return _e(i, {
      id: w,
      label: m,
      x: 0,
      y: 0,
      w: Y.event.w,
      h: Y.event.h,
      kind: "event-name",
      symbol: "event",
      fill: Y.event.fill,
      stroke: Y.event.stroke,
      dashed: !0,
      badge: "EVENTO (sin declarar)",
      tooltip: `${m} — referenciado por nombre, sin evento declarado en el catálogo`
    }), w;
  }, h = (m) => {
    const v = I.find((_) => _.id === m.id) ?? I.find((_) => m.name && ct(_.name) === ct(m.name)), w = (v == null ? void 0 : v.id) ?? (m.id || (m.name ? `rm:${ct(m.name)}` : null));
    return w ? (_e(i, {
      id: w,
      label: (v == null ? void 0 : v.name) ?? m.name ?? w,
      x: 0,
      y: 0,
      w: Y.readModel.w,
      h: Y.readModel.h,
      kind: v ? "read-model" : "derived-read-model",
      fill: Y.readModel.fill,
      stroke: Y.readModel.stroke,
      dashed: !v,
      badge: "READ MODEL"
    }), w) : null;
  };
  for (const m of e.actorUses ?? []) {
    if (!o.has(m.targetId)) continue;
    const v = (e.actors ?? []).find((w) => w.id === m.actorId);
    v && (_e(i, {
      id: v.id,
      label: v.name,
      x: 0,
      y: 0,
      w: Y.actor.w,
      h: Y.actor.h,
      kind: "actor",
      symbol: "person",
      fill: Y.actor.fill,
      stroke: Y.actor.stroke,
      badge: "ACTOR"
    }), ce(i, {
      id: `es-actor:${v.id}->${m.targetId}`,
      sourceId: v.id,
      targetId: m.targetId,
      kind: "es-actor-command",
      color: "#94a3b8",
      arrow: !0
    }));
  }
  for (const m of e.aiAgents ?? []) {
    const v = (e.agentUses ?? []).filter((E) => E.agentId === m.id), w = (e.agentExternalUses ?? []).filter((E) => E.agentId === m.id), _ = (e.agentRags ?? []).filter((E) => E.agentId === m.id), M = (e.agentMcpUses ?? []).filter((E) => E.agentId === m.id), S = (e.agentGatewayUses ?? []).some((E) => E.agentId === m.id) || (e.agentApiOpUses ?? []).some((E) => E.agentId === m.id) || (e.agentQueryUses ?? []).some((E) => E.agentId === m.id) || (e.agentDelegations ?? []).some((E) => E.agentId === m.id) || (e.agentTriggers ?? []).some((E) => E.agentId === m.id);
    if (!(!v.length && !w.length && !_.length && !M.length && !S)) {
      _e(i, {
        id: m.id,
        label: m.name,
        x: 0,
        y: 0,
        w: Y.actor.w,
        h: Y.actor.h,
        kind: "ai-agent",
        symbol: "robot",
        fill: "#faf5ff",
        stroke: "#9333ea",
        badge: "AGENTE IA",
        tooltip: `${m.name} — agente de IA (consume por MCP)`
      });
      for (const E of v)
        o.has(E.useCaseId) && ce(i, {
          id: `es-agent:${m.id}->${E.useCaseId}`,
          sourceId: m.id,
          targetId: E.useCaseId,
          kind: "es-agent-command",
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: "consume por MCP"
        });
      for (const E of w) {
        const N = e.externalSystems.find(
          (ie) => (ie.useCases ?? []).some((Z) => Z.id === E.externalUseCaseId)
        );
        if (!N) continue;
        const B = (R = (N.useCases ?? []).find((ie) => ie.id === E.externalUseCaseId)) == null ? void 0 : R.name;
        _e(i, {
          id: N.id,
          label: N.name,
          x: 0,
          y: 0,
          w: Y.external.w,
          h: Y.external.h,
          kind: "external-system",
          symbol: "component",
          fill: Y.external.fill,
          stroke: Y.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ce(i, {
          id: `es-agentx:${m.id}->${E.externalUseCaseId}`,
          sourceId: m.id,
          targetId: N.id,
          kind: "es-agent-external",
          label: B,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: B ? `Llama a ${B} del sistema externo` : void 0
        });
      }
      for (const E of M) {
        const N = e.externalSystems.find(
          (ie) => (ie.mcpServers ?? []).some((Z) => Z.id === E.mcpServerId)
        );
        if (!N) continue;
        const B = (z = (N.mcpServers ?? []).find((ie) => ie.id === E.mcpServerId)) == null ? void 0 : z.name;
        _e(i, {
          id: N.id,
          label: N.name,
          x: 0,
          y: 0,
          w: Y.external.w,
          h: Y.external.h,
          kind: "external-system",
          symbol: "component",
          fill: Y.external.fill,
          stroke: Y.external.stroke,
          dashed: !0,
          badge: "EXTERNO"
        }), ce(i, {
          id: `es-agentmcp:${m.id}->${E.mcpServerId}`,
          sourceId: m.id,
          targetId: N.id,
          kind: "es-agent-mcp",
          label: B,
          color: "#9333ea",
          dashed: !0,
          arrow: !0,
          tooltip: B ? `Consume las herramientas del servidor MCP ${B}` : void 0
        });
      }
      for (const E of _) {
        const N = (e.rags ?? []).find((B) => B.id === E.ragId);
        if (N) {
          _e(i, {
            id: N.id,
            label: N.name,
            x: 0,
            y: 0,
            w: Y.readModel.w,
            h: Y.readModel.h,
            kind: "rag",
            fill: "#ecfeff",
            stroke: "#0e7490",
            badge: "RAG",
            tooltip: `${N.name} — base de conocimiento (retrieval)`
          }), ce(i, {
            id: `es-agrag:${m.id}->${N.id}`,
            sourceId: m.id,
            targetId: N.id,
            kind: "es-agent-rag",
            color: "#0e7490",
            dashed: !0,
            arrow: !0,
            tooltip: "consulta (retrieval)"
          });
          for (const B of N.sourceReadModelIds ?? []) {
            const ie = h({ id: B });
            ie && ce(i, {
              id: `es-ragsrc:${N.id}->${ie}`,
              sourceId: ie,
              targetId: N.id,
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
  const r = (m) => {
    const v = e.externalSystems.find((w) => w.id === m);
    return v ? (_e(i, {
      id: v.id,
      label: v.name,
      x: 0,
      y: 0,
      w: Y.external.w,
      h: Y.external.h,
      kind: "external-system",
      symbol: "component",
      fill: Y.external.fill,
      stroke: Y.external.stroke,
      dashed: !0,
      badge: "EXTERNO"
    }), v.id) : null;
  };
  for (const m of e.externalCalls ?? []) {
    const v = r(m.externalSystemId);
    !v || !o.has(m.useCaseId) || ce(i, {
      id: `es-extin:${v}->${m.useCaseId}`,
      sourceId: v,
      targetId: m.useCaseId,
      kind: "es-external-command",
      color: "#be185d",
      dashed: !0,
      arrow: !0
    });
  }
  for (const m of e.externalUseCaseCalls ?? []) {
    if (!o.has(m.sourceId)) continue;
    const v = e.externalSystems.find(
      (M) => (M.useCases ?? []).some((S) => S.id === m.targetId)
    ), w = v ? r(v.id) : null;
    if (!w) continue;
    const _ = (D = ((v == null ? void 0 : v.useCases) ?? []).find((M) => M.id === m.targetId)) == null ? void 0 : D.name;
    ce(i, {
      id: `es-extout:${m.sourceId}->${m.targetId}`,
      sourceId: m.sourceId,
      targetId: w,
      kind: "es-command-external",
      label: _,
      color: "#be185d",
      dashed: !0,
      arrow: !0,
      tooltip: _ ? `Llama a ${_} del sistema externo` : void 0
    });
  }
  for (const m of e.aggregateCalls ?? [])
    !o.has(m.sourceId) || !i.nodes.has(m.targetId) || ce(i, {
      id: `es-write:${m.sourceId}->${m.targetId}`,
      sourceId: m.sourceId,
      targetId: m.targetId,
      kind: "es-command-aggregate",
      color: "#64748b",
      arrow: !0
    });
  const u = [
    ...e.emissions ?? [],
    ...e.useCaseEmissions ?? []
  ];
  for (const m of u)
    !i.nodes.has(m.domainEventId) || !(i.nodes.has(m.sourceId) && (o.has(m.sourceId) || a.some((w) => w.id === m.sourceId) || d.has(m.sourceId))) || ce(i, {
      id: `es-emit:${m.sourceId}->${m.domainEventId}`,
      sourceId: m.sourceId,
      targetId: m.domainEventId,
      kind: "es-emission",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite"
    });
  const g = (m, v, w, _, M, S) => (_e(i, {
    id: m,
    label: v,
    x: 0,
    y: 0,
    w: Y.policy.w,
    h: Y.policy.h,
    kind: w,
    symbol: "flow",
    fill: Y.policy.fill,
    stroke: Y.policy.stroke,
    badge: _,
    tooltip: M
  }), m), k = (m, v) => {
    const w = y(m);
    w && ce(i, {
      id: `es-trigger:${w}->${v}`,
      sourceId: w,
      targetId: v,
      kind: "es-trigger",
      color: "#7e22ce",
      dashed: !0,
      arrow: !0
    });
  }, C = (m, v) => {
    !v || !o.has(v) || ce(i, {
      id: `es-invoke:${m}->${v}`,
      sourceId: m,
      targetId: v,
      kind: "es-invoke",
      color: "#1d4ed8",
      arrow: !0
    });
  };
  for (const m of e.subscriptions ?? []) {
    const v = g(
      m.id,
      m.name,
      "subscription",
      "POLICY · SUBSCRIPTION",
      `${m.name}${m.eventName ? ` — reacciona a ${m.eventName}` : ""}${m.consumerGroup ? ` · grupo ${m.consumerGroup}` : ""}`
    );
    k(m.eventName, v);
    for (const w of m.actions ?? []) {
      if (w.type === "CallUseCase" && C(v, w.useCaseId), w.type === "StartSaga" && w.sagaId) {
        const _ = `saga:${w.sagaId}`;
        g(_, w.sagaId, "saga", "SAGA"), ce(i, {
          id: `es-saga:${v}->${_}`,
          sourceId: v,
          targetId: _,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
      if (w.type === "UpdateProjection" && w.projectionId) {
        const _ = (e.projections ?? []).find((M) => M.id === w.projectionId);
        _ && ce(i, {
          id: `es-feeds:${v}->${_.id}`,
          sourceId: v,
          targetId: _.id,
          kind: "es-invoke",
          color: "#7e22ce",
          arrow: !0
        });
      }
    }
  }
  for (const m of e.projections ?? []) {
    const v = g(
      m.id,
      m.name,
      "projection",
      "PROYECCIÓN",
      `${m.name}${m.readModelName ? ` — materializa ${m.readModelName}` : ""}`
    );
    for (const M of m.handledEventIds) {
      const S = i.nodes.has(M) ? M : null;
      S && ce(i, {
        id: `es-trigger:${S}->${v}`,
        sourceId: S,
        targetId: v,
        kind: "es-trigger",
        color: "#7e22ce",
        dashed: !0,
        arrow: !0
      });
    }
    m.sourceAggregateId && i.nodes.has(m.sourceAggregateId) && ce(i, {
      id: `es-state:${m.id}`,
      sourceId: m.sourceAggregateId,
      targetId: v,
      kind: "es-projects-state",
      color: "#0d9488",
      dashed: !0,
      arrow: !0,
      tooltip: "proyecta su estado"
    });
    const w = m.sourceExternalUseCaseId ?? m.sourceExternalTableId;
    if (w) {
      const M = e.externalSystems.find(
        (E) => (E.useCases ?? []).some((N) => N.id === w) || (E.tables ?? []).some((N) => N.id === w)
      ), S = M ? r(M.id) : null;
      if (S) {
        const E = ((U = (M.useCases ?? []).find((N) => N.id === w)) == null ? void 0 : U.name) ?? ((re = (M.tables ?? []).find((N) => N.id === w)) == null ? void 0 : re.name);
        ce(i, {
          id: `es-poll:${m.id}`,
          sourceId: S,
          targetId: v,
          kind: "es-projects-poll",
          label: E,
          color: "#0d9488",
          dashed: !0,
          arrow: !0,
          tooltip: E ? `polling de ${E}` : "polling"
        });
      }
    }
    const _ = h({ id: m.readModelId, name: m.readModelName });
    _ && ce(i, {
      id: `es-projects:${v}->${_}`,
      sourceId: v,
      targetId: _,
      kind: "es-projects",
      color: "#15803d",
      arrow: !0
    });
  }
  for (const m of e.flows) {
    if (m.archetype === "MATERIALIZES") {
      const w = y(m.triggerEvent), _ = h({ name: m.readModelName ?? `${m.triggerEvent}View` });
      w && _ && ce(i, {
        id: `es-mat:${m.id}`,
        sourceId: w,
        targetId: _,
        kind: "es-materializes",
        label: m.name,
        color: "#0d9488",
        dashed: !0,
        arrow: !0,
        tooltip: `Flow ${m.name} [MATERIALIZES]`
      });
      continue;
    }
    const v = g(
      `flow:${m.id}`,
      m.name,
      "flow",
      `POLICY · ${m.archetype}`,
      `Flow ${m.name} [${m.archetype}]`
    );
    if (k(m.triggerEvent, v), C(v, m.targetUseCaseId), !m.targetUseCaseId) {
      const w = r(m.targetId), _ = w ?? `tgt:${m.targetId}`;
      !w && s.has(m.targetId) && _e(i, {
        id: _,
        label: s.get(m.targetId) ?? m.targetId,
        x: 0,
        y: 0,
        w: Y.module.w,
        h: Y.module.h,
        kind: "module",
        symbol: "component",
        fill: Y.module.fill,
        stroke: Y.module.stroke,
        badge: "CONTEXTO"
      }), i.nodes.has(_) && ce(i, {
        id: `es-deliver:${m.id}`,
        sourceId: v,
        targetId: _,
        kind: "es-deliver",
        color: "#ea580c",
        arrow: !0
      });
    }
  }
  for (const m of e.processes ?? []) {
    const v = g(
      m.id,
      m.name,
      "process",
      `PROCESO${m.sla ? ` · SLA ${m.sla}` : ""}`,
      `${m.name}${m.triggerEvent ? ` — arranca con ${m.triggerEvent}` : ""}`
    );
    k(m.triggerEvent, v);
    for (const _ of m.steps) C(v, _.useCaseId);
    const w = y(m.onCompletionEventName);
    w && ce(i, {
      id: `es-done:${m.id}`,
      sourceId: v,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0,
      tooltip: "emite al completar"
    });
  }
  for (const m of e.workflows ?? []) {
    const v = g(
      m.id,
      m.name,
      "workflow",
      "WORKFLOW",
      `${m.name}${m.triggerEvent ? ` — arranca con ${m.triggerEvent}` : ""}`
    );
    k(m.triggerEvent, v);
    for (const _ of m.steps ?? []) {
      C(v, _.targetUseCaseId);
      for (const M of [_.emittedEventName, _.completionEventName]) {
        const S = y(M);
        S && ce(i, {
          id: `es-wfemit:${m.id}:${S}`,
          sourceId: v,
          targetId: S,
          kind: "es-completion",
          color: "#c2410c",
          arrow: !0
        });
      }
    }
    const w = y(m.onCompletionEventName);
    w && ce(i, {
      id: `es-done:${m.id}`,
      sourceId: v,
      targetId: w,
      kind: "es-completion",
      color: "#c2410c",
      arrow: !0
    });
  }
  const O = [...i.nodes.values()], P = /* @__PURE__ */ new Map();
  for (const m of i.edges)
    P.has(m.targetId) || P.set(m.targetId, []), P.get(m.targetId).push(m.sourceId);
  const b = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Set(), A = (m) => {
    const v = b.get(m);
    if (v !== void 0) return v;
    if (x.has(m)) return 0;
    x.add(m);
    const w = P.get(m) ?? [], _ = w.length ? 1 + Math.max(...w.map(A)) : 0;
    return x.delete(m), b.set(m, _), _;
  }, L = /* @__PURE__ */ new Map();
  for (const m of O) {
    const v = t[m.id];
    if (v) {
      m.x = v.x, m.y = v.y;
      continue;
    }
    const w = A(m.id), _ = L.get(w) ?? 0;
    L.set(w, _ + 1), m.x = 140 + w * 260, m.y = 110 + _ * 110;
  }
  return { nodes: O, edges: i.edges };
}
const kl = 190, $l = 56, qn = 180, El = 56, Sl = 150, Cl = 44, Fn = 250, Bn = 100;
function Al(e, t) {
  const i = /* @__PURE__ */ new Set(), s = (n) => {
    if (i.has(n.id)) return 0;
    i.add(n.id);
    const o = (n.dependsOnStepIds ?? []).map((d) => t.get(d)).filter(Boolean), a = o.length ? 1 + Math.max(...o.map(s)) : 0;
    return i.delete(n.id), a;
  };
  return s(e);
}
function Ml(e, t) {
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
function Pl(e, t) {
  const i = [], s = [], n = /* @__PURE__ */ new Set(), o = (d) => {
    var c;
    return (c = e.modules.flatMap((p) => p.useCases ?? []).find((p) => p.id === d)) == null ? void 0 : c.name;
  };
  let a = 140;
  return (e.workflows ?? []).forEach((d) => {
    var g;
    const c = new Map(d.steps.map((k) => [k.id, k])), p = new Map(d.steps.map((k) => [k.id, Al(k, c)])), I = /* @__PURE__ */ new Map();
    for (const k of d.steps) {
      const C = p.get(k.id) ?? 0;
      I.set(C, (I.get(C) ?? 0) + 1);
    }
    const f = Math.max(1, ...I.values()), y = Ml(e, d);
    if (y && !n.has(y.id)) {
      n.add(y.id);
      const k = t[y.id] ?? { x: 140, y: a };
      i.push({
        id: y.id,
        label: y.label,
        x: k.x,
        y: k.y,
        w: Sl,
        h: Cl,
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
      w: kl,
      h: $l,
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
    for (const k of d.steps) {
      const C = p.get(k.id) ?? 0;
      u = Math.max(u, C);
      const O = r.get(C) ?? 0;
      r.set(C, O + 1);
      const P = t[k.id] ?? {
        x: h.x + (C + 1) * Fn,
        y: a + (O - (I.get(C) - 1) / 2) * Bn
      }, b = o(k.targetUseCaseId);
      i.push({
        id: k.id,
        label: k.name,
        x: P.x,
        y: P.y,
        w: qn,
        h: El,
        kind: "workflow-step",
        symbol: "event",
        fill: "#ffffff",
        stroke: "#6d28d9",
        badge: b ? `→ ${b}` : "∅ sin use case",
        tooltip: `${k.name}${k.emittedEventName ? ` · emite ${k.emittedEventName}` : ""}${b ? ` · lanza ${b}` : ""}${k.completionEventName ? ` · espera ${k.completionEventName}` : ""}`
      });
      const x = (k.dependsOnStepIds ?? []).filter((A) => c.has(A));
      x.length === 0 && s.push({
        id: `wfs:${d.id}:${k.id}`,
        sourceId: d.id,
        targetId: k.id,
        kind: "workflow-start",
        label: k.emittedEventName,
        color: "#6d28d9",
        arrow: !0
      });
      for (const A of x)
        s.push({
          id: `wfdep:${A}->${k.id}`,
          sourceId: A,
          targetId: k.id,
          kind: "workflow-dependency",
          label: k.emittedEventName,
          color: "#6d28d9",
          arrow: !0,
          tooltip: `${k.name} espera a ${((g = c.get(A)) == null ? void 0 : g.name) ?? A}`
        });
    }
    if (d.onCompletionEventName) {
      const k = `done:${d.id}`, C = t[k] ?? { x: h.x + (u + 2) * Fn, y: a };
      i.push({
        id: k,
        label: d.onCompletionEventName,
        x: C.x,
        y: C.y,
        w: qn,
        h: 40,
        kind: "completion-event",
        symbol: "event",
        fill: "#dcfce7",
        stroke: "#16a34a",
        badge: "EVENTO FINAL"
      });
      const O = new Set(d.steps.flatMap((b) => b.dependsOnStepIds ?? [])), P = d.steps.filter((b) => !O.has(b.id));
      for (const b of P.length ? P : [])
        s.push({
          id: `wfd:${d.id}:${b.id}`,
          sourceId: b.id,
          targetId: k,
          kind: "workflow-completion",
          color: "#16a34a",
          arrow: !0
        });
      d.steps.length || s.push({
        id: `wfd:${d.id}`,
        sourceId: d.id,
        targetId: k,
        kind: "workflow-completion",
        color: "#16a34a",
        arrow: !0
      });
    }
    a += Math.max(2, f + 1) * Bn + 60;
  }), { nodes: i, edges: s };
}
const Vn = 250, He = 30, ti = 6, Ol = 16, Hn = 190, Tl = 60, Rl = 170, ii = 44;
function Nl(e, t, i) {
  return t.id ? `menu:${e}:id:${t.id}` : `menu:${e}:p:${i.join(">")}`;
}
function fe(e) {
  const t = /^menu:([^:]+):(id|p):(.+)$/.exec(e);
  return t ? t[2] === "id" ? { appId: t[1], itemId: t[3] } : { appId: t[1], label: t[3].split(">").pop() } : null;
}
function Dl(e) {
  const t = [], i = (s, n, o) => {
    for (const a of s ?? []) {
      const d = [...n, a.label];
      t.push({ entry: a, path: d, depth: o }), i(a.children ?? [], d, o + 1);
    }
  };
  return i(e.menuItems ?? [], [], 0), t;
}
function Ll(e, t) {
  var k, C, O, P;
  const i = [], s = [], n = e.uiApps ?? [], o = e.pages ?? [], a = (b) => {
    var x;
    return ((x = e.modules.flatMap((A) => A.useCases ?? []).find((A) => A.id === b)) == null ? void 0 : x.name) ?? b;
  }, d = (b) => {
    var x;
    return ((x = e.modules.flatMap((A) => A.queryServices ?? []).find((A) => A.id === b)) == null ? void 0 : x.name) ?? b;
  }, c = /* @__PURE__ */ new Map();
  let p = 160;
  for (const b of n) {
    const x = Dl(b), A = Math.max(
      90,
      54 + x.length * (He + ti)
    ), L = t[b.id] ?? { x: 190, y: p + A / 2 };
    p = L.y + A / 2 + 70;
    const R = b.type ?? "APP";
    i.push({
      id: b.id,
      label: b.title || b.name,
      x: L.x,
      y: L.y,
      w: Vn,
      h: A,
      kind: "ui-app",
      symbol: R === "ORCHESTRATOR" || R === "VIEW_EDITOR" ? "process" : "component",
      fill: R === "ORCHESTRATOR" || R === "VIEW_EDITOR" ? "#fdf4ff" : "#f0f9ff",
      stroke: R === "ORCHESTRATOR" || R === "VIEW_EDITOR" ? "#c026d3" : "#0ea5e9",
      container: !0,
      badge: R === "ORCHESTRATOR" ? "ORQUESTADOR" : R === "MASTER_DETAIL" ? "MAESTRO·DETALLE" : R === "VIEW_EDITOR" ? "VISTA·EDITOR" : "APP",
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles: R === "MASTER_DETAIL" ? [{ kind: "header", title: "Cabecera: arrastra hasta la página que hace de cabecera", color: "#0ea5e9" }] : R === "VIEW_EDITOR" ? [
        { kind: "view", title: "Vista: arrastra hasta la página de detalle (solo lectura)", color: "#0891b2" },
        { kind: "edit", title: "Edición: arrastra hasta la página de edición", color: "#e11d48" }
      ] : R === "ORCHESTRATOR" ? void 0 : [{ kind: "home", title: "Home: arrastra hasta la página (o la app) con la que abre", color: "#16a34a" }],
      tooltip: R === "ORCHESTRATOR" ? `${b.name} — orquesta y mantiene estado; solo enseña páginas hijas` : R === "MASTER_DETAIL" ? `${b.name} — cabecera + pestañas (ambas son páginas)` : `App: ${b.name}`
    }), b.modelId && (c.set(b.modelId, {
      label: ((k = (e.models ?? []).find((U) => U.id === b.modelId)) == null ? void 0 : k.name) ?? b.modelId,
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
    for (const [U, re, m, v, w] of [
      [b.viewPageId, "app-view", "vista", "#0891b2", "el detalle solo lectura"],
      [b.editPageId, "app-edit", "edición", "#e11d48", "la vista de edición"]
    ])
      U && s.push({
        id: `${re === "app-view" ? "appview" : "appedit"}:${b.id}->${U}`,
        sourceId: b.id,
        targetId: U,
        kind: re,
        color: v,
        label: m,
        arrow: !0,
        tooltip: w
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
    }), R === "MASTER_DETAIL" && b.headerPageId && s.push({
      id: `appheader:${b.id}->${b.headerPageId}`,
      sourceId: b.id,
      targetId: b.headerPageId,
      kind: "app-header",
      color: "#0ea5e9",
      label: "cabecera",
      arrow: !0,
      tooltip: "la página que hace de cabecera; las demás son pestañas"
    });
    let D = L.y - A / 2 + 34 + 10 + He / 2;
    for (const { entry: U, path: re, depth: m } of x) {
      const v = Nl(b.id, U, re), w = m * Ol;
      if (i.push({
        id: v,
        label: U.label,
        x: L.x + w / 2,
        y: D,
        w: Vn - 20 - w,
        h: He,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: (C = U.children) != null && C.length ? "menu-group" : "menu-item",
        symbol: "process",
        fill: (O = U.children) != null && O.length ? "#f0f9ff" : "#ffffff",
        stroke: "#7dd3fc",
        parentId: b.id,
        tooltip: (P = U.children) != null && P.length ? "Agrupador (con submenú): no puede abrir nada" : U.pageId ? `Abre ${U.pageId}` : U.uiAdapterId ? `Abre la app ${U.uiAdapterId}` : U.useCaseId ? `Lanza ${U.useCaseId}` : U.aggregateId ? `CRUD inferido sobre ${U.aggregateId}` : U.queryOperationId ? `Listado con filtros de ${U.queryOperationId}` : "Entrada de menú sin destino"
      }), D += He + ti, U.uiAdapterId && n.some((_) => _.id === U.uiAdapterId) && s.push({
        id: `menuapp:${v}->${U.uiAdapterId}`,
        sourceId: v,
        targetId: U.uiAdapterId,
        kind: "menu-app",
        color: "#64748b",
        arrow: !0
      }), U.useCaseId && e.modules.some((M) => (M.useCases ?? []).some((S) => S.id === U.useCaseId)) && (c.set(U.useCaseId, {
        label: a(U.useCaseId),
        kind: "use-case",
        symbol: "usecase",
        stroke: "#06b6d4"
      }), s.push({
        id: `menuuc:${v}->${U.useCaseId}`,
        sourceId: v,
        targetId: U.useCaseId,
        kind: "menu-use-case",
        color: "#06b6d4",
        dashed: !0,
        arrow: !0
      })), U.aggregateId && (e.aggregates ?? []).some((_) => _.id === U.aggregateId)) {
        const _ = (e.aggregates ?? []).find((M) => M.id === U.aggregateId);
        c.set(_.id, { label: _.name, kind: "aggregate", symbol: "aggregate", stroke: "#8b5cf6" }), s.push({
          id: `menuagg:${v}->${_.id}`,
          sourceId: v,
          targetId: _.id,
          kind: "menu-aggregate",
          label: "CRUD",
          color: "#8b5cf6",
          dashed: !0,
          arrow: !0
        });
      }
      if (U.queryOperationId) {
        const _ = e.modules.flatMap((S) => S.queryServices ?? []).find((S) => S.id === U.queryServiceId), M = ((_ == null ? void 0 : _.operations) ?? []).find((S) => S.id === U.queryOperationId);
        _ && M && (c.set(M.id, {
          label: `${M.name} (${_.name})`,
          kind: "query-operation",
          symbol: "lens",
          stroke: "#0284c7"
        }), s.push({
          id: `menuqop:${v}->${M.id}`,
          sourceId: v,
          targetId: M.id,
          kind: "menu-query-operation",
          label: "listado",
          color: "#0284c7",
          dashed: !0,
          arrow: !0
        }));
      }
      U.pageId && o.some((_) => _.id === U.pageId) && s.push({
        id: `menupage:${v}->${U.pageId}`,
        sourceId: v,
        targetId: U.pageId,
        kind: "menu-page",
        color: "#64748b",
        arrow: !0
      });
    }
  }
  let I = 160;
  const f = (b) => {
    var x;
    return ((x = o.find((A) => A.id === b)) == null ? void 0 : x.name) ?? b;
  };
  for (const b of o) {
    const x = t[b.id] ?? { x: 640, y: I }, A = b.type === "WIZARD" ? b.wizardSteps ?? [] : [], L = A.length ? 54 + A.length * (He + ti) : Tl;
    I = x.y + L + 90, i.push({
      id: b.id,
      label: b.name,
      x: x.x,
      y: x.y,
      w: Hn,
      h: L,
      kind: "page",
      symbol: "interface",
      badge: b.type ?? "PAGE",
      container: A.length > 0,
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
    let R = x.y - L / 2 + 34 + 10 + He / 2;
    A.forEach((z, D) => {
      const U = z.id ?? z.pageId ?? String(D);
      i.push({
        id: `wizrow:${b.id}:${U}`,
        label: `${D + 1}. ${z.label ?? (z.pageId ? f(z.pageId) : "Paso")}${z.pageId ? "" : " ⌁"}`,
        x: x.x,
        y: R,
        w: Hn - 20,
        h: He,
        kind: "wizard-step-row",
        symbol: "flow",
        fill: z.pageId ? "#faf5ff" : "#ffffff",
        stroke: "#c4b5fd",
        parentId: b.id,
        tooltip: z.pageId ? `Paso ${D + 1}: ${f(z.pageId)} — arrastra el asa hasta otra página para re-mapearlo` : `Paso ${D + 1}, sin página — arrastra el asa hasta la página que lo implementa`
      }), R += He + ti;
    });
    for (const [z, D, U, re] of [
      [b.crudDetailPageId ?? b.crudDetailAppId, "crud-detail", "detalle", "#ea580c"],
      [b.crudCreatePageId ?? b.crudCreateAppId, "crud-create", "nuevo", "#0d9488"]
    ])
      z && s.push({
        id: `${D === "crud-detail" ? "cruddetail" : "crudnew"}:${b.id}->${z}`,
        sourceId: b.id,
        targetId: z,
        kind: D,
        color: re,
        label: U,
        dashed: !0,
        arrow: !0,
        tooltip: D === "crud-detail" ? "lo que abre una fila del CRUD" : "el formulario de nuevo registro"
      });
    for (let z = 0; z < (b.wizardSteps ?? []).length; z++) {
      const D = (b.wizardSteps ?? [])[z];
      if (!D.pageId) continue;
      const U = D.id ?? D.pageId;
      s.push({
        id: `wizstep:${b.id}:${U}`,
        sourceId: `wizrow:${b.id}:${U}`,
        targetId: D.pageId,
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
  for (const [b, x] of c) {
    const A = t[b] ?? { x: 1050, y };
    y = A.y + ii + 46, i.push({
      id: b,
      label: x.label,
      x: A.x,
      y: A.y,
      w: Rl,
      h: ii,
      kind: x.kind,
      symbol: x.symbol,
      fill: "#ffffff",
      stroke: x.stroke
    });
  }
  let h = 120;
  for (const b of e.identityProviders ?? []) {
    const x = t[b.id] ?? { x: -320, y: h };
    h = x.y + 70 + 40, i.push({
      id: b.id,
      label: b.name,
      x: x.x,
      y: x.y,
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
    b.identityProviderId && (e.identityProviders ?? []).some((x) => x.id === b.identityProviderId) && s.push({
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
    (b) => n.some((x) => x.id === b.appId) && (e.actors ?? []).some((x) => x.id === b.actorId)
  ), u = [...new Set(r.map((b) => b.actorId))];
  let g = 160;
  for (const b of u) {
    const x = (e.actors ?? []).find((L) => L.id === b), A = t[b] ?? { x: -60, y: g };
    g = A.y + ii + 46, i.push({
      id: b,
      label: x.name,
      x: A.x,
      y: A.y,
      w: 150,
      h: ii,
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
const zl = 168, Ul = 48;
function ql(e, t) {
  const i = [], s = [], n = e.models ?? [], o = e.modelMappings ?? [], a = (f) => {
    var y;
    return ((y = n.find((h) => h.id === f)) == null ? void 0 : y.name) ?? f ?? "?";
  };
  n.forEach((f, y) => {
    const h = t[f.id] ?? { x: 200 + y % 5 * 260, y: 140 + Math.floor(y / 5) * 150 };
    i.push({
      id: f.id,
      label: f.name,
      x: h.x,
      y: h.y,
      w: zl,
      h: Ul,
      kind: "model",
      symbol: "readmodel",
      fill: "#ffffff",
      stroke: "#8b5cf6",
      badge: "MODEL",
      tooltip: `${f.name} — arrastra el asa hasta otro modelo para crear un mapeado`
    });
  });
  const d = new Set(i.map((f) => f.id));
  for (const f of o)
    !f.sourceModelId || !f.targetModelId || !d.has(f.sourceModelId) || !d.has(f.targetModelId) || s.push({
      id: `mapping:${f.id}`,
      sourceId: f.sourceModelId,
      targetId: f.targetModelId,
      kind: "model-mapping",
      color: "#7c3aed",
      label: f.name,
      arrow: !0,
      tooltip: `${f.name} — las reglas campo a campo viven en su ficha; Supr lo elimina`
    });
  const c = new Set(
    o.filter((f) => f.sourceModelId && f.targetModelId).map((f) => `${f.sourceModelId}->${f.targetModelId}`)
  ), p = new Map(
    e.modules.flatMap((f) => (f.useCases ?? []).map((y) => [y.id, y]))
  ), I = /* @__PURE__ */ new Set();
  for (const f of e.pages ?? [])
    if (f.modelId)
      for (const y of f.buttons ?? []) {
        if (!y.useCaseId || y.mappingId) continue;
        const h = p.get(y.useCaseId);
        if (!(h != null && h.inputModelId) || h.inputModelId === f.modelId) continue;
        const r = `${f.modelId}->${h.inputModelId}`;
        c.has(r) || I.has(r) || (I.add(r), !(!d.has(f.modelId) || !d.has(h.inputModelId)) && s.push({
          id: `mapgap:${f.id}:${y.useCaseId}`,
          sourceId: f.modelId,
          targetId: h.inputModelId,
          kind: "mapping-gap",
          color: "#d97706",
          label: "falta mapear",
          dashed: !0,
          arrow: !0,
          tooltip: `«${y.label}» (página ${f.name}) llama a ${h.name}: falta mapear ${a(f.modelId)} → ${a(h.inputModelId)} — traza la línea para crearlo`
        }));
      }
  return { nodes: i, edges: s };
}
async function Fl(e, t) {
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
var Bl = Object.defineProperty, Vl = Object.getOwnPropertyDescriptor, Re = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Vl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Bl(t, i, n), n;
};
const Hl = /* @__PURE__ */ new Set([
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
let $e = class extends Ne {
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
    const a = new DOMMatrix().translate(s, n).multiply(o).translate(-s, -n).translate(i.width / 2, i.height / 2).translate(this._pan.x, this._pan.y).scale(this._kUsed, this._kUsed, this._kUsed).rotateAxisAngle(1, 0, 0, this._rx).rotateAxisAngle(0, 0, 1, this._rz).translate(-this._center.x, -this._center.y, 0), d = a.transformPoint(new DOMPoint(0, 0, 0, 1)), c = a.transformPoint(new DOMPoint(1, 0, 0, 0)), p = a.transformPoint(new DOMPoint(0, 1, 0, 0)), I = e - i.left, f = t - i.top, y = c.x - I * c.w, h = p.x - I * p.w, r = c.y - f * c.w, u = p.y - f * p.w, g = I * d.w - d.x, k = f * d.w - d.y, C = y * u - h * r;
    return C ? { x: (g * u - h * k) / C, y: (y * k - g * r) / C } : { ...this._center };
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
      return $`<div class="hud">Nada que inclinar — el diagrama está vacío</div>`;
    const t = this.depths(), i = new Map(e.map((g) => [g.id, g])), s = Math.min(...e.map((g) => g.x - g.w / 2)) - 60, n = Math.max(...e.map((g) => g.x + g.w / 2)) + 60, o = Math.min(...e.map((g) => g.y - g.h / 2)) - 60, a = Math.max(...e.map((g) => g.y + g.h / 2)) + 60, d = (s + n) / 2, c = (o + a) / 2, p = this.getBoundingClientRect(), I = p.width ? Math.min(p.width / (n - s), p.height / (a - o), 1) * 0.9 : 0.5, f = this._k * I;
    this._kUsed = f, this._center = { x: d, y: c };
    const y = 30, h = this._liveMove, r = (g) => g.x + ((h == null ? void 0 : h.id) === g.id ? h.dx : 0), u = (g) => g.y + ((h == null ? void 0 : h.id) === g.id ? h.dy : 0);
    return $`
      <div class="stage">
        <div
          class="world"
          style="transform: translate3d(${this._pan.x}px, ${this._pan.y}px, 0) scale3d(${f}, ${f}, ${f}) rotateX(${this._rx}deg) rotateZ(${this._rz}deg) translate3d(${-d}px, ${-c}px, 0)"
        >
          <svg
            class="floor"
            style="left: ${s}px; top: ${o}px"
            width=${n - s}
            height=${a - o}
            viewBox="${s} ${o} ${n - s} ${a - o}"
          >
            ${this.scene.edges.map((g) => {
      const k = i.get(g.sourceId), C = i.get(g.targetId);
      return !k || !C ? "" : X`<line
                x1=${r(k)} y1=${u(k)} x2=${r(C)} y2=${u(C)}
                stroke="#000000" stroke-width="2" opacity="0.22" />`;
    })}
          </svg>
          ${this.scene.edges.map((g) => {
      const k = i.get(g.sourceId), C = i.get(g.targetId);
      if (!k || !C) return "";
      const O = (t.get(k.id) ?? 0) * y + 2, P = (t.get(C.id) ?? 0) * y + 2, b = r(C) - r(k), x = u(C) - u(k), A = P - O, L = Math.hypot(b, x), R = Math.hypot(L, A), z = Math.atan2(x, b) * 180 / Math.PI, D = Math.atan2(A, L) * 180 / Math.PI, U = g.color ?? "#64748b", re = g.dashed ? `repeating-linear-gradient(90deg, ${U} 0 6px, transparent 6px 10px)` : U;
      return $`<div
              class="edge3"
              style="
                left: ${r(k)}px; top: ${u(k)}px; width: ${R}px; height: 1.7px;
                transform: translateZ(${O}px) rotateZ(${z}deg) rotateY(${-D}deg);
                background: ${re};
                opacity: 0.9;
              "
            ></div>`;
    })}
          ${e.map((g) => {
      const k = t.get(g.id) ?? 0, C = g.container || k === 0, O = this._hoverTargetId === g.id;
      return $`
              <div
                class="n3 ${g.container ? "container3" : ""} ${this.selectedId === g.id ? "selected3" : ""} ${O ? "hover3" : ""}"
                data-node-id=${g.id}
                data-kind=${g.kind}
                title=${g.tooltip ?? g.label}
                style="
                  left: ${r(g) - g.w / 2}px; top: ${u(g) - g.h / 2}px;
                  width: ${g.w}px; height: ${g.h}px;
                  transform: translateZ(${k * y + (O ? 8 : 0)}px)${O ? " scale(1.06)" : ""};
                  background: ${g.container ? "color-mix(in srgb, " + (g.fill ?? "#ffffff") + " 82%, transparent)" : g.fill ?? "#ffffff"};
                  border-color: ${g.stroke ?? "#64748b"};
                  border-style: ${g.dashed ? "dashed" : "solid"};
                  color: #1e293b;
                  box-shadow: ${C ? "0 18px 30px rgba(0, 0, 0, 0.45)" : "0 10px 16px rgba(0, 0, 0, 0.35)"};
                "
              >
                ${g.badge ? $`<span class="badge3" style="color: ${g.stroke ?? "#94a3b8"}">${g.badge}</span>` : ""}
                <span>${g.label}</span>
              </div>
            `;
    })}
          ${(() => {
      const g = this.connectable && this.selectedId ? i.get(this.selectedId) : void 0;
      if (!g || !Hl.has(g.kind)) return "";
      const k = (t.get(g.id) ?? 0) * y + 4;
      return [
        [r(g) + g.w / 2, u(g)],
        [r(g) - g.w / 2, u(g)],
        [r(g), u(g) + g.h / 2],
        [r(g), u(g) - g.h / 2]
      ].map(
        ([O, P]) => $`<div
                class="h3"
                data-source-id=${g.id}
                title="Arrastra hasta otro nodo para conectar"
                style="left: ${O}px; top: ${P}px; transform: translateZ(${k}px)"
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
      <div class="hud">
        click selecciona · doble click abre · arrastra una placa para moverla · arrastra el fondo
        para orbitar · shift, espacio o botón central+arrastra panea · rueda para zoom · Supr borra · doble click en el
        fondo resetea
      </div>
    `;
  }
};
$e.styles = yt`
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
Re([
  oe({ attribute: !1 })
], $e.prototype, "scene", 2);
Re([
  oe({ attribute: !1 })
], $e.prototype, "selectedId", 2);
Re([
  oe({ attribute: !1 })
], $e.prototype, "connectable", 2);
Re([
  q()
], $e.prototype, "_rx", 2);
Re([
  q()
], $e.prototype, "_rz", 2);
Re([
  q()
], $e.prototype, "_k", 2);
Re([
  q()
], $e.prototype, "_pan", 2);
Re([
  q()
], $e.prototype, "_liveMove", 2);
Re([
  q()
], $e.prototype, "_connect", 2);
Re([
  q()
], $e.prototype, "_hoverTargetId", 2);
$e = Re([
  vt("modux-tilt")
], $e);
var Wl = Object.defineProperty, Gl = Object.getOwnPropertyDescriptor, ue = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Gl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Wl(t, i, n), n;
};
const Wn = [
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
let se = class extends Ne {
  constructor() {
    super(...arguments), this.page = null, this.framed = !1, this.models = [], this.mappings = [], this.useCases = [], this.queryOps = [], this.selectedCmpId = null, this._editing = null, this._dragId = null, this._overId = null, this._rename = null, this._route = null, this._btn = null, this._cmp = null, this._dragCmpId = null, this._dragWizKey = null, this._overCmpId = null, this._overCmpPos = "into", this._foreignOver = !1, this._activeTabs = {};
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
    return se.LEAF_KINDS.has(e.kind) ? s < 0.5 ? "before" : "after" : s < 0.2 ? "before" : s > 0.8 ? "after" : "into";
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
    if (t === "into" && !se.LEAF_KINDS.has(e.kind))
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
    var c, p, I;
    const t = e.children ?? [], i = (f) => f.map((y) => this.renderComponent(y)), s = $`<div class="placeholder">suelta componentes aquí</div>`;
    let n;
    switch (e.kind) {
      case "horizontalLayout":
        n = $`<div class="row-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "splitLayout": {
        const f = t.slice(0, Math.ceil(t.length / 2)), y = t.slice(Math.ceil(t.length / 2));
        n = $`<div class="row-lay">
          <div class="col-lay">${f.length ? i(f) : s}</div>
          <div class="split-divider"></div>
          <div class="col-lay">${y.length ? i(y) : s}</div>
        </div>`;
        break;
      }
      case "formLayout":
        n = $`<div class="grid-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "gridLayout":
      case "dashboardLayout":
        n = $`<div class="grid3-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "tabLayout": {
        const f = t.filter((h) => h.kind === "tab"), y = f.find((h) => h.id === this._activeTabs[e.id]) ?? f[0];
        n = $`
          <div class="tabbar">
            ${f.map(
          (h, r) => $`<span
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
            var g, k;
            u.stopPropagation(), this._dragCmpId = h.id, (k = u.dataTransfer) == null || k.setData(
              "application/x-modux-cmp",
              JSON.stringify({ pageId: (g = this.page) == null ? void 0 : g.id, componentId: h.id })
            );
          }}
                @dragover=${(u) => {
            var g;
            ((g = this.nodeById(this._dragCmpId ?? "")) == null ? void 0 : g.kind) === "tab" && (u.preventDefault(), u.stopPropagation());
          }}
                @drop=${(u) => {
            var P, b;
            const g = this._dragCmpId;
            if (!g || g === h.id || ((P = this.nodeById(g)) == null ? void 0 : P.kind) !== "tab") return;
            u.preventDefault(), u.stopPropagation();
            const k = u.currentTarget.getBoundingClientRect(), O = u.clientX - k.left < k.width / 2 ? h.id : ((b = f[r + 1]) == null ? void 0 : b.id) ?? null;
            this._dragCmpId = null, this._overCmpId = null, O !== g && this.emitEvent("component-moved", {
              componentId: g,
              toParentId: e.id,
              beforeComponentId: O
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
        n = $`<div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "accordionLayout":
        n = $`<div class="col-lay">
          ${t.length ? t.map(
          (f, y) => $`
                  <div class="acc-bar"><span>${f.title ?? f.label ?? "Sección"}</span><span>${y === 0 ? "▾" : "▸"}</span></div>
                  ${y === 0 ? this.renderComponent(f) : te}
                `
        ) : s}
        </div>`;
        break;
      case "card":
        n = $`<div class="card-box">
          ${e.title ? $`<div class="card-title">${e.title}</div>` : te}
          <div class="col-lay">${t.length ? i(t) : s}</div>
        </div>`;
        break;
      case "boardLayout":
        n = $`<div class="grid3-lay">
          ${t.length ? t.map((f) => $`<div class="board-col">${this.renderComponent(f)}</div>`) : s}
        </div>`;
        break;
      case "masterDetailLayout": {
        const [f, ...y] = t;
        n = $`<div class="row-lay">
          <div class="col-lay" style="flex:0 0 38%">
            ${f ? this.renderComponent(f) : $`<div class="placeholder">maestro</div>`}
          </div>
          <div class="split-divider"></div>
          <div class="col-lay">${y.length ? i(y) : $`<div class="placeholder">detalle</div>`}</div>
        </div>`;
        break;
      }
      case "foldoutLayout":
        n = $`<div class="acc-bar"><span>${e.title ?? "Foldout"}</span><span>▸</span></div>
          <div class="col-lay">${t.length ? i(t) : s}</div>`;
        break;
      case "carouselLayout":
        n = $`<div class="row-lay">${t.length ? i(t) : s}</div>
          <div class="dots-nav">●○○</div>`;
        break;
      case "appLayout":
        n = $`<div class="appbar">⛭ app</div>
          <div class="col-lay" style="padding-top:6px">${t.length ? i(t) : s}</div>`;
        break;
      // ---- leaf components: inference works INSIDE the structure ----
      case "form": {
        const y = e.modelId && e.modelId === ((c = this.page) == null ? void 0 : c.modelId) ? ((p = this.page) == null ? void 0 : p.viewmodelFields) ?? [] : [];
        n = y.length ? $`<div class="grid-lay">
              ${y.slice(0, 6).map(
          (h) => $`<div><label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${h.label ?? h.name}</label>${this.control(h)}</div>`
        )}
            </div>` : $`<div class="grid-lay">
              <div class="control">Texto…</div>
              <div class="control">Texto…</div>
            </div>
            <div class="placeholder">${e.modelId ? `formulario de ${e.modelId}` : "sin model — click para asignar"}</div>`;
        break;
      }
      case "listing": {
        const f = (((I = this.page) == null ? void 0 : I.viewmodelFields) ?? []).slice(0, 4);
        n = $`<table>
            <tr>${f.length ? f.map((y) => $`<th>${y.label ?? y.name}</th>`) : $`<th>col 1</th><th>col 2</th><th>col 3</th>`}</tr>
            ${[1, 2].map(() => $`<tr>${(f.length ? f : [1, 2, 3]).map(() => $`<td>···</td>`)}</tr>`)}
          </table>
          ${e.queryOperationId ? te : $`<div class="placeholder">sin operación de consulta — click para asignar</div>`}`;
        break;
      }
      case "button":
        n = $`<span class="btn" style="display:inline-block">${e.label ?? "Botón"}</span>`;
        break;
      case "field": {
        const f = { fieldId: e.fieldId ?? "", name: e.label ?? "campo", stereotype: e.stereotype ?? void 0 };
        n = $`<label style="display:block;font-size:11px;font-weight:600;color:#334155;margin-bottom:3px">${e.label ?? "Campo"}</label>${this.control(f)}`;
        break;
      }
      case "text":
        n = $`<div class="text-stub">${e.text ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}</div>`;
        break;
      case "metricCard":
        n = $`<div class="card-box metric"><div class="num">123</div><div class="cap">${e.title ?? "Métrica"}</div></div>`;
        break;
      case "menuBar":
        n = $`<div class="menubar-stub"><span>Inicio</span><span>Reservas</span><span>⋯</span></div>`;
        break;
      default:
        n = $`<div class="col-lay">${t.length ? i(t) : s}</div>`;
    }
    const o = se.LEAF_KINDS.has(e.kind), a = this._overCmpId === e.id && (this._dragCmpId || this._foreignOver), d = (f) => {
      var y, h;
      f.stopPropagation(), this._dragCmpId = e.id, (h = f.dataTransfer) == null || h.setData(
        "application/x-modux-cmp",
        JSON.stringify({ pageId: (y = this.page) == null ? void 0 : y.id, componentId: e.id })
      ), f.dataTransfer && (f.dataTransfer.effectAllowed = "move");
    };
    return $`<div
      class="cmp ${o ? "leafcmp" : ""} ${a ? `overcmp over-${this._overCmpPos}` : ""} ${this.selectedCmpId === e.id ? "selcmp" : ""}"
      data-cmp-id=${e.id}
      data-cmp-kind=${e.kind}
      draggable="true"
      @click=${(f) => {
      f.stopPropagation(), this.emitEvent("component-selected", { componentId: e.id });
    }}
      @dblclick=${(f) => {
      f.stopPropagation(), this._cmp = { ...e };
    }}
      @dragstart=${d}
      @dragend=${() => {
      this._dragCmpId = null, this._overCmpId = null, this._foreignOver = !1;
    }}
      @dragover=${(f) => {
      var h;
      f.preventDefault(), f.stopPropagation();
      const y = ((h = f.dataTransfer) == null ? void 0 : h.types) ?? [];
      this._foreignOver = !this._dragCmpId && ([...y].includes("application/x-modux-cmp") || [...y].includes("application/x-modux-palette")), this._overCmpId = e.id, this._overCmpPos = this._dragCmpId || this._foreignOver ? this.dropPosFor(e, f) : "into";
    }}
      @dragleave=${() => this._overCmpId = null}
      @drop=${(f) => {
      var y, h, r;
      this._foreignOver = !1, !(!this._dragCmpId && !((r = (h = (y = f.dataTransfer) == null ? void 0 : y.types) == null ? void 0 : h.includes) != null && r.call(h, "application/x-modux-cmp"))) && (f.preventDefault(), f.stopPropagation(), this.onCmpDrop(e, this._overCmpPos, f));
    }}
    >
      <span
        class="kindchip"
        draggable="true"
        title="Arrastra para mover · click selecciona · doble click configura"
        @dragstart=${d}
        >${se.KIND_LABELS[e.kind] ?? e.kind}${e.title ? ` · ${e.title}` : ""}</span
      >
      ${n}
    </div>`;
  }
  /** The fully inferred body (no content tree): listing stub + viewmodel grid. */
  renderInferredBody(e, t, i) {
    return $`
        ${i ? $`<table>
              <tr>${t.slice(0, 4).map((s) => $`<th>${s.label ?? s.name}</th>`)}</tr>
              ${[1, 2, 3].map(() => $`<tr>${t.slice(0, 4).map(() => $`<td>···</td>`)}</tr>`)}
            </table>` : te}
        ${t.length ? $`<div class="grid">
              ${t.map(
      (s) => $`
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
            </div>` : $`<div class="empty">
              Esta página aún no tiene viewmodel.<br />
              Asigna un <b>Model</b> en su ficha y el formulario se inferirá solo, al estilo Mateu.
            </div>`}
    `;
  }
  /** The content-node declaration editor. */
  renderCmpPop() {
    var n, o, a, d;
    const e = this._cmp;
    if (!e) return te;
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
    return $`<div class="pop" @click=${(c) => c.stopPropagation()}>
      ${s ? $`<label>Título</label>
            <input .value=${e.title ?? ""} @input=${(c) => t({ title: c.target.value })} />` : te}
      ${i === "text" ? $`<label>Texto</label>
            <input style="grid-column: 2 / -1" .value=${e.text ?? ""} @input=${(c) => t({ text: c.target.value })} />` : te}
      ${i === "button" || i === "field" ? $`<label>Etiqueta</label>
            <input .value=${e.label ?? ""} @input=${(c) => t({ label: c.target.value })} />` : te}
      ${i === "button" ? $`<label>Caso de uso</label>
            <span style="grid-column: 2 / -1">
              ${e.useCaseId ? $`<span class="chip">${((n = this.useCases.find((c) => c.id === e.useCaseId)) == null ? void 0 : n.name) ?? e.useCaseId}</span>
                    <span class="vmhint">suelta otro caso de uso sobre el botón para re-apuntarlo</span>` : $`<span class="vmhint">suelta un caso de uso del Catálogo sobre el botón</span>`}
            </span>
            <label>Mapping</label>
            <span>
              ${e.mappingId ? $`<span class="chip"
                      >${((o = this.mappings.find((c) => c.id === e.mappingId)) == null ? void 0 : o.name) ?? e.mappingId}
                      <span class="chipx" title="Quitar el mapping" @click=${() => t({ mappingId: void 0 })}>✕</span></span
                    >` : $`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
            </span>` : te}
      ${i === "form" ? $`<label>Model</label>
            <span style="grid-column: 2 / -1">
              ${e.modelId ? $`<span class="chip"
                      >${((a = this.models.find((c) => c.id === e.modelId)) == null ? void 0 : a.name) ?? e.modelId}
                      <span class="chipx" title="Quitar el modelo" @click=${() => t({ modelId: void 0 })}>✕</span></span
                    >` : $`<span class="vmhint">arrastra un modelo del Catálogo hasta el formulario</span>`}
            </span>` : te}
      ${i === "listing" ? $`<label>Consulta</label>
            <span style="grid-column: 2 / -1">
              ${e.queryOperationId ? $`<span class="chip"
                      >${((d = this.queryOps.find((c) => c.id === e.queryOperationId)) == null ? void 0 : d.name) ?? e.queryOperationId}
                      <span
                        class="chipx"
                        title="Quitar la consulta"
                        @click=${() => t({ queryOperationId: void 0, queryServiceId: void 0 })}
                        >✕</span
                      ></span
                    >` : $`<span class="vmhint">arrastra una operación de consulta del Catálogo hasta el listado</span>`}
            </span>` : te}
      ${i === "field" ? $`<label>Estereotipo</label>
            <select @change=${(c) => t({ stereotype: c.target.value || void 0 })}>
              ${Wn.map((c) => $`<option value=${c} ?selected=${c === (e.stereotype ?? "regular")}>${c}</option>`)}
            </select>` : te}
      ${i === "tabLayout" ? $`<label style="grid-column: 1 / -1; color:#94a3b8">Las pestañas son hijos «tab»: configura su título clicándolas</label>` : te}
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
    if (!e) return te;
    const t = e.viewmodelFields ?? [], i = e.type === "CRUD" || !!e.listingQueryServiceId, s = e.type === "WIZARD";
    return $`
      <div class="chrome">
        <span class="dots"><span></span><span></span><span></span></span>
        ${this._rename !== null ? $`<input
              class="inline"
              style="flex:1"
              .value=${this._rename}
              @input=${(n) => this._rename = n.target.value}
              @keydown=${(n) => {
      n.key === "Enter" && this.applyRename(), n.key === "Escape" && (this._rename = null);
    }}
              @blur=${() => this.applyRename()}
            />` : $`<span class="title" title="Doble click para renombrar" @dblclick=${() => this._rename = e.name}
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
        ([a, d]) => $`<option value=${a} ?selected=${n === a}>${d}</option>`
      );
    })()}
        </select>
        ${this._route !== null ? $`<input
              class="inline"
              style="width:110px"
              .value=${this._route}
              @input=${(n) => this._route = n.target.value}
              @keydown=${(n) => {
      n.key === "Enter" && this.applyRoute(), n.key === "Escape" && (this._route = null);
    }}
              @blur=${() => this.applyRoute()}
            />` : $`<span class="route" title="Click para editar la ruta" @click=${() => this._route = e.route ?? "/"}
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
      (n) => $`<span
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
        ${(e.buttons ?? []).some((n) => (n.bar ?? "toolbar") === "toolbar") ? te : $`<span class="zoneph">suelta un caso de uso aquí</span>`}
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
        ${s ? $`<div class="wizbar">
              ${(e.wizardSteps ?? []).length ? (e.wizardSteps ?? []).map((n, o) => {
      const a = (e.wizardSteps ?? []).map((c, p) => c.id ?? c.pageId ?? String(p)), d = a[o];
      return $`<span
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
        const I = c.currentTarget.getBoundingClientRect(), y = c.clientX - I.left < I.width / 2 ? d : a[o + 1] ?? null;
        y !== p && this.emitEvent("wizard-step-moved", { stepKey: p, beforeStepKey: y });
      }}
                      @dragend=${() => this._dragWizKey = null}
                      >${"①②③④⑤⑥⑦⑧⑨⑩"[o] ?? `${o + 1}.`} ${n.label ?? "Paso"}${n.pageId ? "" : " ⌁"}</span
                    >`;
    }) : $`<span class="on">① Paso 1</span><span>② Paso 2</span><span>③ Paso 3</span>`}
              <span class="wiznext">Siguiente ›</span>
            </div>` : te}
        ${(e.content ?? []).length ? $`<div class="col-lay">${(e.content ?? []).map((n) => this.renderComponent(n))}</div>` : this.renderInferredBody(e, t, i)}
      </div>
      <div class="bottombar" data-bar="bottom" title="Botones de abajo: suelta un caso de uso del Catálogo para crear un botón">
        ${(e.buttons ?? []).filter((n) => n.bar === "bottom").map(
      (n) => $`<span
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
        ${(e.buttons ?? []).some((n) => n.bar === "bottom") ? te : $`<span class="zoneph">botones abajo — suelta un caso de uso aquí</span>`}
      </div>
      ${this.renderCmpPop()}
      ${this._btn ? (() => {
      var o, a, d;
      const n = (((o = this.page) == null ? void 0 : o.buttons) ?? []).some((c) => c.useCaseId === this._btn.useCaseId);
      return $`<div class="pop">
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
                ${this._btn.mappingId ? $`<span class="chip"
                        >${((d = this.mappings.find((c) => c.id === this._btn.mappingId)) == null ? void 0 : d.name) ?? this._btn.mappingId}
                        <span class="chipx" title="Quitar el mapping" @click=${() => this._btn = { ...this._btn, mappingId: "" }}>✕</span></span
                      >` : $`<span class="vmhint">el viewmodel viaja tal cual — suelta un mapeado del Catálogo sobre el botón</span>`}
              </span>
              <div class="actions">
                ${n ? $`<button
                      @click=${() => {
        const c = this._btn.useCaseId;
        this._btn = null, this.emitEvent("button-removed", { useCaseId: c });
      }}
                    >
                      Quitar
                    </button>` : te}
                <button @click=${() => this._btn = null}>Cancelar</button>
                <button class="ok" @click=${() => this.applyButton(n)}>Aplicar</button>
              </div>
            </div>`;
    })() : te}
      ${this._editing ? $`<div class="pop">
            <label>Estereotipo</label>
            <select
              .value=${this._editing.stereotype}
              @change=${(n) => this._editing = { ...this._editing, stereotype: n.target.value }}
            >
              ${Wn.map(
      (n) => $`<option value=${n} ?selected=${n === this._editing.stereotype}>${n}</option>`
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
          </div>` : te}
    `;
  }
};
se.styles = yt`
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
se.KIND_LABELS = {
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
se.LEAF_KINDS = /* @__PURE__ */ new Set([
  "form",
  "listing",
  "button",
  "field",
  "text",
  "metricCard",
  "menuBar"
]);
ue([
  oe({ attribute: !1 })
], se.prototype, "page", 2);
ue([
  oe({ type: Boolean, reflect: !0 })
], se.prototype, "framed", 2);
ue([
  oe({ attribute: !1 })
], se.prototype, "models", 2);
ue([
  oe({ attribute: !1 })
], se.prototype, "mappings", 2);
ue([
  oe({ attribute: !1 })
], se.prototype, "useCases", 2);
ue([
  oe({ attribute: !1 })
], se.prototype, "queryOps", 2);
ue([
  oe({ attribute: !1 })
], se.prototype, "selectedCmpId", 2);
ue([
  q()
], se.prototype, "_editing", 2);
ue([
  q()
], se.prototype, "_dragId", 2);
ue([
  q()
], se.prototype, "_overId", 2);
ue([
  q()
], se.prototype, "_rename", 2);
ue([
  q()
], se.prototype, "_route", 2);
ue([
  q()
], se.prototype, "_btn", 2);
ue([
  q()
], se.prototype, "_cmp", 2);
ue([
  q()
], se.prototype, "_dragCmpId", 2);
ue([
  q()
], se.prototype, "_dragWizKey", 2);
ue([
  q()
], se.prototype, "_overCmpId", 2);
ue([
  q()
], se.prototype, "_overCmpPos", 2);
ue([
  q()
], se.prototype, "_foreignOver", 2);
ue([
  q()
], se.prototype, "_activeTabs", 2);
se = ue([
  vt("modux-page-designer")
], se);
var jl = Object.defineProperty, Yl = Object.getOwnPropertyDescriptor, be = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Yl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && jl(t, i, n), n;
};
const Ps = 460, Kl = 540, Xl = 660;
let ye = class extends Ne {
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
    var I, f, y, h, r, u;
    const i = (I = this.shadowRoot) == null ? void 0 : I.elementFromPoint(e, t), s = (f = i == null ? void 0 : i.closest) == null ? void 0 : f.call(i, ".frame");
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
    const c = d.dataset.cmpKind ?? "", p = d.getBoundingClientRect(), I = (t - p.top) / Math.max(1, p.height), f = se.LEAF_KINDS.has(c) ? I < 0.5 ? "before" : "after" : I < 0.2 ? "before" : I > 0.8 ? "after" : "into";
    return { pageId: n, componentId: d.dataset.cmpId, pos: f };
  }
  /** The frame's size (live resize, stored, or defaults). */
  sizeOf(e) {
    var t;
    return ((t = this._liveSize) == null ? void 0 : t.id) === e ? { w: this._liveSize.w, h: this._liveSize.h } : this.sizes[e] ?? { w: Ps, h: 560 };
  }
  /** The frame's top-left in surface coordinates (layout, live drag, or default grid). */
  posOf(e, t) {
    var i;
    return ((i = this._live) == null ? void 0 : i.id) === e ? { x: this._live.x, y: this._live.y } : this.layout[e] ?? { x: t % 3 * Kl, y: Math.floor(t / 3) * Xl };
  }
  render() {
    return $`
      <div
        class="surface"
        style="transform: translate(${this._t.x}px, ${this._t.y}px) scale(${this._t.k})"
      >
        ${this.pages.map((e, t) => {
      var n;
      const i = this.posOf(e.id, t), s = this.sizeOf(e.id);
      return $`
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
ye.styles = yt`
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
      width: ${Ps}px;
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
be([
  oe({ attribute: !1 })
], ye.prototype, "pages", 2);
be([
  oe({ attribute: !1 })
], ye.prototype, "layout", 2);
be([
  oe({ attribute: !1 })
], ye.prototype, "sizes", 2);
be([
  oe({ attribute: !1 })
], ye.prototype, "selectedId", 2);
be([
  oe({ attribute: !1 })
], ye.prototype, "selectedIds", 2);
be([
  oe({ attribute: !1 })
], ye.prototype, "models", 2);
be([
  oe({ attribute: !1 })
], ye.prototype, "mappings", 2);
be([
  oe({ attribute: !1 })
], ye.prototype, "useCases", 2);
be([
  oe({ attribute: !1 })
], ye.prototype, "queryOps", 2);
be([
  oe({ attribute: !1 })
], ye.prototype, "selectedCmp", 2);
be([
  q()
], ye.prototype, "_t", 2);
be([
  q()
], ye.prototype, "_live", 2);
be([
  q()
], ye.prototype, "_liveSize", 2);
ye = be([
  vt("modux-figma")
], ye);
var Ql = Object.defineProperty, Zl = Object.getOwnPropertyDescriptor, Q = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? Zl(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && Ql(t, i, n), n;
};
const Gi = {
  PARTNERSHIP: { abbr: "P", name: "Partnership" },
  SHARED_KERNEL: { abbr: "SK", name: "Shared Kernel" },
  CUSTOMER_SUPPLIER: { abbr: "C/S", name: "Customer / Supplier" },
  CONFORMIST: { abbr: "CF", name: "Conformist" },
  OPEN_HOST_SERVICE: { abbr: "OHS", name: "Open Host Service" },
  ANTI_CORRUPTION_LAYER: { abbr: "ACL", name: "Anti-Corruption Layer" },
  PUBLISHED_LANGUAGE: { abbr: "PL", name: "Published Language" },
  SEPARATE_WAYS: { abbr: "SW", name: "Separate Ways" }
}, Jl = Object.keys(Gi);
function Ct(e, t, i) {
  const s = i.x - i.w / 2, n = i.x + i.w / 2, o = i.y - i.h / 2, a = i.y + i.h / 2;
  let d = 0, c = 1;
  const p = t.x - e.x, I = t.y - e.y;
  for (const [f, y] of [
    [-p, e.x - s],
    [p, n - e.x],
    [-I, e.y - o],
    [I, a - e.y]
  ]) {
    if (f === 0) {
      if (y < 0) return !1;
      continue;
    }
    const h = y / f;
    if (f < 0) {
      if (h > c) return !1;
      h > d && (d = h);
    } else {
      if (h < d) return !1;
      h < c && (c = h);
    }
  }
  return c - d > 0.02;
}
function ec(e, t, i = 28) {
  var p;
  const s = new Map(e.nodes.map((I) => [I.id, I])), n = (I) => {
    var y;
    const f = /* @__PURE__ */ new Set();
    for (let h = I; h; h = (y = s.get(h)) == null ? void 0 : y.parentId) f.add(h);
    return f;
  }, o = e.nodes, a = (I) => I.parentId ? Math.min(i, 6) : i, d = /* @__PURE__ */ new Map(), c = (I, f, y) => {
    const h = a(y), r = { x: y.x, y: y.y, w: y.w + 2 * h, h: y.h + 2 * h }, u = y.w / 2 + h * 1.5, g = y.h / 2 + h * 1.5, k = { x: y.x - u, y: y.y - g }, C = { x: y.x + u, y: y.y - g }, O = { x: y.x - u, y: y.y + g }, P = { x: y.x + u, y: y.y + g }, b = [];
    for (const x of [k, C, O, P])
      !Ct(I, x, r) && !Ct(x, f, r) && b.push([x]);
    for (const [x, A] of [
      [k, C],
      [C, k],
      [C, P],
      [P, C],
      [P, O],
      [O, P],
      [O, k],
      [k, O]
    ])
      !Ct(I, x, r) && !Ct(A, f, r) && b.push([x, A]);
    return b;
  };
  for (const I of e.edges) {
    if ((p = t[I.id]) != null && p.length) continue;
    const f = s.get(I.sourceId), y = s.get(I.targetId);
    if (!f || !y) continue;
    const h = /* @__PURE__ */ new Set([...n(f.id), ...n(y.id)]), r = [
      { x: f.x, y: f.y },
      { x: y.x, y: y.y }
    ];
    for (let u = 0; u < 12; u++) {
      let g = !1;
      e: for (let k = 0; k < r.length - 1; k++)
        for (const C of o) {
          if (h.has(C.id)) continue;
          const O = a(C), P = { x: C.x, y: C.y, w: C.w + 2 * O, h: C.h + 2 * O };
          if (!Ct(r[k], r[k + 1], P)) continue;
          const b = c(r[k], r[k + 1], C);
          if (!b.length) continue;
          const x = (L) => o.some(
            (R) => R !== C && !h.has(R.id) && Math.abs(L.x - R.x) < R.w / 2 + a(R) / 2 && Math.abs(L.y - R.y) < R.h / 2 + a(R) / 2
          ), A = (L) => {
            let R = 0;
            const z = [r[k], ...L, r[k + 1]];
            for (let D = 0; D < z.length - 1; D++)
              R += Math.hypot(z[D + 1].x - z[D].x, z[D + 1].y - z[D].y);
            return R + (L.some(x) ? 1e4 : 0);
          };
          b.sort((L, R) => A(L) - A(R)), r.splice(k + 1, 0, ...b[0]), g = !0;
          break e;
        }
      if (!g) break;
    }
    r.length > 2 && d.set(
      I.id,
      r.slice(1, -1).map((u) => ({ x: Math.round(u.x), y: Math.round(u.y) }))
    );
  }
  return d;
}
const ne = (e) => e.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
function tc(e, t) {
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
function ic(e, t) {
  const i = (e ?? []).find((s) => s.steps.some((n) => n.id === t));
  return i ? { elementType: "process", id: i.id } : null;
}
let W = class extends Ne {
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
      const { id: t, appId: i, beforeId: s, nestRowId: n } = e.detail, o = fe(t);
      if (!(o != null && o.itemId)) return;
      const a = this.menuEntryIn(o.appId, o.itemId);
      if (!a) return;
      const d = (c, p) => (c ?? []).some((I) => I.id === p || d(I.children, p));
      if (n) {
        const c = fe(n);
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
        const c = fe(s);
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
    return Xt(this.layout[this.layoutKey(e)]);
  }
  writeViewLayout(e, t) {
    this.layout = { ...this.layout, [this.layoutKey(e)]: t }, this.emit("layout-changed", { layout: this.layout });
  }
  /** Adopt the persisted detail level when the host hands us a (re)loaded layout. */
  willUpdate(e) {
    if (e.has("layout")) {
      const t = Xt(this.layout["context-map"]).detail;
      (t === "contexts" || t === "detail" || t === "operations") && (this._detail = t);
    }
  }
  /** Detail level changes persist with the layout, so they survive reloads. */
  setDetail(e) {
    if (e === this._detail) return;
    const t = this.viewLayout("context-map"), i = e === "contexts" ? "context-map" : `context-map@${e}`, s = Xt(this.layout[i]);
    this._detail = e, !Object.keys(s.nodes).length && !Object.keys(s.sizes ?? {}).length && this.writeViewLayout("context-map", {
      nodes: { ...t.nodes },
      edges: { ...t.edges },
      sizes: { ...t.sizes ?? {} }
    });
    const n = Xt(this.layout["context-map"]);
    this.layout = { ...this.layout, "context-map": { ...n, detail: e } }, this.emit("layout-changed", { layout: this.layout });
    const o = this.viewLayout("context-map"), a = this.sceneFor("context-map").nodes.filter((I) => !I.parentId), d = ji(a), c = [...d.keys()].map((I) => ({
      kind: "move-node",
      view: "context-map",
      id: I,
      pos: o.nodes[I] ?? null
    })), p = { ...o.nodes };
    for (const [I, f] of d) {
      const y = a.find((r) => r.id === I), h = o.nodes[I] ?? { x: y.x, y: y.y };
      p[I] = {
        x: Math.round(h.x + (f.x - y.x)),
        y: Math.round(h.y + (f.y - y.y))
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
    const i = ec(e, t);
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
    var t, i, s, n, o, a, d, c, p, I, f, y, h;
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
        const r = (this.model.models ?? []).find((g) => g.id === e.id);
        if (!r) return null;
        const u = [{ kind: "add-model", id: r.id, name: r.name }];
        for (const g of this.model.pages ?? []) {
          g.modelId === e.id && u.push({ kind: "set-page-model", pageId: g.id, modelId: e.id });
          const k = (C) => {
            for (const O of C ?? [])
              O.modelId === e.id && u.push({ kind: "set-page-component", pageId: g.id, componentId: O.id, modelId: e.id }), k(O.children);
          };
          k(g.content);
        }
        for (const g of this.model.uiApps ?? [])
          g.modelId === e.id && u.push({ kind: "set-app-model", appId: g.id, modelId: e.id });
        return u;
      }
      case "set-crud-detail":
      case "set-crud-create": {
        const r = (this.model.pages ?? []).find((g) => g.id === e.pageId), u = e.kind === "set-crud-detail";
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
        const r = (((i = (this.model.pages ?? []).find((g) => g.id === e.pageId)) == null ? void 0 : i.wizardSteps) ?? []).map((g) => g.id ?? g.pageId), u = r.indexOf(e.targetId);
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
        const r = (this.model.uiApps ?? []).find((k) => k.id === e.id);
        if (!r) return null;
        const u = [{ kind: "create-ui-app", id: r.id, name: r.name, type: r.type }];
        r.headerPageId && u.push({ kind: "set-app-header-page", appId: r.id, pageId: r.headerPageId }), r.modelId && u.push({ kind: "set-app-model", appId: r.id, modelId: r.modelId }), r.viewPageId && u.push({ kind: "set-app-view-page", appId: r.id, pageId: r.viewPageId }), r.editPageId && u.push({ kind: "set-app-edit-page", appId: r.id, pageId: r.editPageId }), (r.homePageId || r.homeAppId) && u.push({
          kind: "set-app-home-page",
          appId: r.id,
          pageId: r.homePageId ?? null,
          toAppId: r.homeAppId ?? null
        });
        const g = (k, C) => {
          for (const O of k ?? [])
            u.push({
              kind: "add-menu-item",
              appId: r.id,
              label: O.label,
              itemId: O.id,
              parentId: C == null ? void 0 : C.id,
              parentLabel: C && !C.id ? C.label : void 0,
              pageId: O.pageId ?? null
            }), O.uiAdapterId && u.push({ kind: "set-menu-app", appId: r.id, toAppId: O.uiAdapterId, itemId: O.id, label: O.label }), O.useCaseId && u.push({ kind: "set-menu-use-case", appId: r.id, useCaseId: O.useCaseId, itemId: O.id, label: O.label }), O.aggregateId && u.push({ kind: "set-menu-aggregate", appId: r.id, aggregateId: O.aggregateId, itemId: O.id, label: O.label }), O.queryOperationId && u.push({
              kind: "set-menu-query-operation",
              appId: r.id,
              queryServiceId: O.queryServiceId ?? null,
              queryOperationId: O.queryOperationId,
              itemId: O.id,
              label: O.label
            }), g(O.children, O);
        };
        g(r.menuItems);
        for (const k of this.model.actorAppUses ?? [])
          k.appId === e.id && u.push({ kind: "add-actor-app", actorId: k.actorId, appId: e.id });
        return u;
      }
      case "delete-ui-page": {
        const r = (this.model.pages ?? []).find((g) => g.id === e.id);
        if (!r) return null;
        const u = [
          { kind: "create-ui-page", id: r.id, name: r.name, pageType: r.type ?? "FORM" }
        ];
        r.route && u.push({ kind: "set-page-route", pageId: r.id, path: r.route }), r.modelId && u.push({ kind: "set-page-model", pageId: r.id, modelId: r.modelId }), r.listingQueryServiceId && u.push({ kind: "set-page-listing", pageId: r.id, queryServiceId: r.listingQueryServiceId });
        for (const g of r.buttons ?? [])
          g.useCaseId && (u.push({ kind: "add-page-button", pageId: r.id, useCaseId: g.useCaseId, label: g.label }), g.mappingId && u.push({
            kind: "set-page-button",
            pageId: r.id,
            useCaseId: g.useCaseId,
            label: g.label ?? null,
            mappingId: g.mappingId
          }));
        for (const g of r.viewmodelFields ?? [])
          (g.stereotype || g.colspan || g.label) && u.push({
            kind: "set-page-field-config",
            pageId: r.id,
            fieldId: g.fieldId,
            stereotype: g.stereotype ?? null,
            colspan: g.colspan ?? null,
            label: g.label ?? null
          });
        (r.viewmodelFields ?? []).length && u.push({
          kind: "set-page-field-order",
          pageId: r.id,
          fieldIds: (r.viewmodelFields ?? []).map((g) => g.fieldId)
        });
        for (const g of r.content ?? [])
          u.push(...this.rebuildComponentOps(r.id, g, void 0, null).ops);
        for (const g of r.wizardSteps ?? [])
          u.push({
            kind: "add-page-wizard-step",
            pageId: r.id,
            targetId: g.pageId ?? null,
            label: g.label,
            itemId: g.id
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
          for (const C of k ?? []) {
            if (e.itemId ? C.id === e.itemId : C.label === e.label) return C;
            const O = u(C.children);
            if (O) return O;
          }
          return null;
        }, g = e.itemId || e.label ? u(r == null ? void 0 : r.menuItems) : null;
        return g ? e.kind === "remove-menu-item" ? [{
          kind: "add-menu-item",
          appId: e.appId,
          label: g.label,
          pageId: g.pageId ?? null,
          itemId: g.id
        }] : e.kind === "set-menu-app" ? [{
          kind: "set-menu-app",
          appId: e.appId,
          toAppId: g.uiAdapterId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-use-case" ? [{
          kind: "set-menu-use-case",
          appId: e.appId,
          useCaseId: g.useCaseId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-aggregate" ? [{
          kind: "set-menu-aggregate",
          appId: e.appId,
          aggregateId: g.aggregateId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : e.kind === "set-menu-query-operation" ? [{
          kind: "set-menu-query-operation",
          appId: e.appId,
          queryServiceId: g.queryServiceId ?? null,
          queryOperationId: g.queryOperationId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : [{
          kind: "set-menu-page",
          appId: e.appId,
          pageId: g.pageId ?? null,
          itemId: e.itemId,
          label: e.label
        }] : null;
      }
      case "add-page-button":
        return [{ kind: "remove-page-button", pageId: e.pageId, useCaseId: e.useCaseId }];
      case "remove-page-button": {
        const r = (this.model.pages ?? []).find((g) => g.id === e.pageId), u = ((r == null ? void 0 : r.buttons) ?? []).find((g) => g.useCaseId === e.useCaseId);
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
        const r = (this.model.pages ?? []).find((g) => g.id === e.pageId), u = ((r == null ? void 0 : r.buttons) ?? []).find((g) => g.useCaseId === e.useCaseId);
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
        const r = (this.model.pages ?? []).find((P) => P.id === e.pageId);
        let u = null, g = null, k = null;
        const C = (P, b) => {
          var A;
          const x = P ?? [];
          for (let L = 0; L < x.length; L++)
            x[L].id === e.componentId && (u = x[L], g = b, k = ((A = x[L + 1]) == null ? void 0 : A.id) ?? null), C(x[L].children, x[L]);
        };
        if (C(r == null ? void 0 : r.content, null), !u) return null;
        const O = u;
        return e.kind === "set-page-component" ? [{
          kind: "set-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          title: O.title ?? null,
          text: O.text ?? null,
          label: O.label ?? null,
          useCaseId: O.useCaseId ?? null,
          mappingId: O.mappingId ?? null,
          modelId: O.modelId ?? null,
          queryServiceId: O.queryServiceId ?? null,
          queryOperationId: O.queryOperationId ?? null,
          fieldId: O.fieldId ?? null,
          stereotype: O.stereotype ?? null,
          colspan: O.colspan ?? null
        }] : e.kind === "move-page-component" ? [{
          kind: "move-page-component",
          pageId: e.pageId,
          componentId: e.componentId,
          parentComponentId: g === null ? null : g.id,
          beforeComponentId: k
        }] : this.rebuildComponentOps(
          e.pageId,
          O,
          g === null ? void 0 : g.id,
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
        const r = this.model.modules.find((g) => g.id === e.id);
        if (!r) return null;
        const u = this.model.relations.filter(
          (g) => (g.sourceId === e.id || g.targetId === e.id) && g.type != null
        );
        return [
          { kind: "add-module", id: r.id, name: r.name, subdomainType: r.subdomainType ?? "GENERIC" },
          // Re-annotate the derived pairs this module participated in.
          ...u.map(
            (g) => ({
              kind: "set-relation-type",
              sourceId: g.sourceId,
              targetId: g.targetId,
              type: g.type
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
          const u = (r.queryServices ?? []).find((g) => g.id === e.id);
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
          const u = (r.useCases ?? []).find((g) => g.id === e.id);
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
          const u = (r.useCases ?? []).find((g) => g.id === e.id);
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
      case "add-identity-provider":
        return [{ kind: "remove-identity-provider", id: e.id }];
      case "remove-identity-provider": {
        const r = (this.model.identityProviders ?? []).find((g) => g.id === e.id);
        if (!r) return null;
        const u = [
          { kind: "add-identity-provider", id: r.id, name: r.name, type: r.type }
        ];
        r.publishedByExternalSystemId && u.push({ kind: "set-idp-publisher", id: r.id, targetId: r.publishedByExternalSystemId });
        for (const g of this.model.modules)
          g.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: g.id, targetId: e.id });
        for (const g of this.model.uiApps ?? [])
          g.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: g.id, targetId: e.id });
        for (const g of this.model.etlFlows ?? [])
          g.identityProviderId === e.id && u.push({ kind: "set-identity-provider", id: g.id, targetId: e.id });
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
          (g) => (g.scheduledTriggers ?? []).some((k) => k.id === e.id)
        ), u = ((r == null ? void 0 : r.scheduledTriggers) ?? []).find((g) => g.id === e.id);
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
          const u = (r.mcpServers ?? []).find((g) => g.id === e.id);
          if (u)
            return [
              { kind: "add-mcp-server", id: u.id, name: u.name, moduleId: r.id, uri: u.uri },
              ...(this.model.agentMcpUses ?? []).filter((g) => g.mcpServerId === e.id).map(
                (g) => ({
                  kind: "add-agent-mcp",
                  sourceId: g.agentId,
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
          const u = (r.applicationEvents ?? []).find((g) => g.id === e.id);
          if (u)
            return [{ kind: "add-application-event", id: u.id, name: u.name, moduleId: r.id }];
        }
        return null;
      }
      case "add-domain-service":
        return [{ kind: "remove-domain-service", id: e.id }];
      case "remove-domain-service": {
        for (const r of this.model.modules) {
          const u = (r.domainServices ?? []).find((g) => g.id === e.id);
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
          const u = (r.tables ?? []).find((g) => g.id === e.id);
          if (u) return [{ kind: "add-external-table", id: u.id, name: u.name, moduleId: r.id }];
        }
        return null;
      }
      case "add-rag-content-source":
        return [{ kind: "remove-rag-content-source", sourceId: e.sourceId, uri: e.uri }];
      case "remove-rag-content-source": {
        const r = (f = (I = (this.model.rags ?? []).find((u) => u.id === e.sourceId)) == null ? void 0 : I.contentSources) == null ? void 0 : f.find((u) => u.uri === e.uri);
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
          const u = (r.readModels ?? []).find((g) => g.id === e.id);
          if (u != null && u.aggregateId)
            return [{ kind: "add-read-model", id: u.id, name: u.name, aggregateId: u.aggregateId }];
        }
        return null;
      }
      case "remove-domain-event": {
        for (const r of this.model.modules) {
          const u = (r.domainEvents ?? []).find((g) => g.id === e.id);
          if (u) return [{ kind: "add-domain-event", id: u.id, name: u.name, moduleId: r.id }];
        }
        return null;
      }
      case "rename-element": {
        const u = (e.type === "module" ? this.model.modules : e.type === "aggregate" ? this.model.aggregates ?? [] : e.type === "domain-event" ? this.model.modules.flatMap((g) => g.domainEvents ?? []) : e.type === "read-model" ? this.model.modules.flatMap((g) => g.readModels ?? []) : e.type === "domain-service" ? this.model.modules.flatMap((g) => g.domainServices ?? []) : e.type === "query-service" ? this.model.modules.flatMap((g) => g.queryServices ?? []) : e.type === "use-case" ? this.model.modules.flatMap((g) => g.useCases ?? []) : e.type === "external-use-case" ? this.model.externalSystems.flatMap((g) => g.useCases ?? []) : e.type === "mcp-server" ? this.model.externalSystems.flatMap((g) => g.mcpServers ?? []) : e.type === "application-event" ? this.model.modules.flatMap((g) => g.applicationEvents ?? []) : e.type === "external-system" ? this.model.externalSystems : e.type === "actor" ? this.model.actors ?? [] : e.type === "ai-agent" ? this.model.aiAgents ?? [] : e.type === "mcp-gateway" ? this.model.mcpGateways ?? [] : this.model.entities ?? []).find((g) => g.id === e.id);
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
        const g = r.steps[u];
        return [
          {
            kind: "add-process-step",
            processId: e.processId,
            id: g.id,
            name: g.name,
            stepType: g.type,
            roleId: g.roleId,
            deadline: g.deadline,
            useCaseId: g.useCaseId,
            compensationUseCaseId: g.compensationUseCaseId,
            afterStepId: u > 0 ? r.steps[u - 1].id : void 0
          }
        ];
      }
      case "move-process-step": {
        const r = (this.model.processes ?? []).find((g) => g.id === e.processId), u = (r == null ? void 0 : r.steps.findIndex((g) => g.id === e.id)) ?? -1;
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
        const r = (this.model.processes ?? []).find((g) => g.id === e.processId), u = r == null ? void 0 : r.steps.find((g) => g.id === e.id);
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
        const g = r.steps[u];
        return [
          {
            kind: "add-workflow-step",
            workflowId: e.workflowId,
            id: g.id,
            name: g.name,
            emittedEventName: g.emittedEventName,
            targetUseCaseId: g.targetUseCaseId,
            completionEventName: g.completionEventName,
            dependsOnStepIds: g.dependsOnStepIds,
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
        const r = (this.model.workflows ?? []).find((g) => g.id === e.workflowId), u = r == null ? void 0 : r.steps.find((g) => g.id === e.id);
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
    const c = this.sceneFor(n), p = c.nodes.find((f) => f.id === t);
    if (p != null && p.parentId) {
      const f = c.nodes.find((y) => y.id === p.parentId);
      f && (d = { x: i - f.x, y: s - f.y });
    }
    this.writeViewLayout(n, { ...o, nodes: { ...o.nodes, [t]: d } });
    const I = [{ kind: "move-node", view: n, id: t, pos: a }];
    if (n === "processes") {
      const f = this.stepReorderCommand(t);
      if (f) {
        const y = this.inverseOf(f);
        y && I.unshift(...y), this.command(f, !1);
      }
    }
    this.pushUndoEntry(I);
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
    const c = this._view, p = this.viewLayout(c), I = this.sceneFor(c), f = d ? I.nodes.find((r) => r.id === d) : void 0, y = f ? { x: s - f.x, y: n - f.y } : { x: s, y: n }, h = [
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
    const p = this._view, I = this.viewLayout(p), y = this.sceneFor(p).nodes.find((r) => r.id === i);
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
    y && (h.push({ kind: "move-node", view: p, id: c, pos: I.nodes[c] ?? null }), this.writeViewLayout(p, {
      ...I,
      nodes: { ...I.nodes, [c]: { x: s - y.x, y: n - y.y } }
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
    const s = await i.text(), n = this.selectedApiId(), o = n ? null : ((c = this.model.externalSystems.find((I) => I.id === this._selectedId)) == null ? void 0 : c.id) ?? null, a = n || o ? null : ((p = this.model.modules.find((I) => I.id === this._selectedId)) == null ? void 0 : p.id) ?? null;
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
      let I = { x: c, y: p };
      const f = n.nodes.find((y) => y.id === d);
      if (f != null && f.parentId) {
        const y = n.nodes.find((h) => h.id === f.parentId);
        y && (I = { x: c - y.x, y: p - y.y });
      }
      o[d] = I;
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
    var I;
    const { id: t, x: i, y: s, w: n, h: o } = e.detail, a = this._view, d = this.viewLayout(a), c = this.sceneFor(a).nodes.filter((f) => f.parentId === t);
    this.pushUndoEntry([
      { kind: "resize-node", view: a, id: t, size: ((I = d.sizes) == null ? void 0 : I[t]) ?? null },
      { kind: "move-node", view: a, id: t, pos: d.nodes[t] ?? null },
      ...c.map((f) => ({ kind: "move-node", view: a, id: f.id, pos: d.nodes[f.id] ?? null }))
    ]);
    const p = { ...d.nodes, [t]: { x: i, y: s } };
    for (const f of c) p[f.id] = { x: f.x - i, y: f.y - s };
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
    const i = cn(this.model, this.viewLayout("processes").nodes), s = new Map(i.nodes.map((a) => [a.id, a.x])), n = [...t.steps].sort(
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
    var z, D, U, re;
    if (this._view === "workflows") {
      const m = this.owningWorkflowOf(e), v = this.owningWorkflowOf(t);
      if (!m || m !== v || e === t) return;
      const w = m.steps.find((_) => _.id === t);
      if (((w == null ? void 0 : w.dependsOnStepIds) ?? []).includes(e)) return;
      this.command({
        kind: "add-workflow-dependency",
        workflowId: m.id,
        id: t,
        dependsOnStepId: e
      });
      return;
    }
    if (this._view === "ui") {
      const m = this.model.pages ?? [], v = this.model.uiApps ?? [], w = (F) => v.some((j) => j.id === F), _ = (F) => m.some((j) => j.id === F);
      if (n === "home" && w(e) && (_(t) || w(t))) {
        if (t === e) return;
        this.command(
          _(t) ? { kind: "set-app-home-page", appId: e, pageId: t } : { kind: "set-app-home-page", appId: e, pageId: null, toAppId: t }
        );
        return;
      }
      if (n === "header" && w(e) && _(t)) {
        this.command({ kind: "set-app-header-page", appId: e, pageId: t });
        return;
      }
      if ((n === "crud-detail" || n === "crud-create") && _(e) && (_(t) || w(t)) && t !== e) {
        const F = n === "crud-detail" ? "set-crud-detail" : "set-crud-create";
        this.command(
          _(t) ? { kind: F, pageId: e, targetId: t, toAppId: null } : { kind: F, pageId: e, targetId: null, toAppId: t }
        );
        return;
      }
      if (n === "viewmodel" && _(e)) {
        (this.model.models ?? []).some((F) => F.id === t) ? this.command({ kind: "set-page-model", pageId: e, modelId: t }) : this.emit("modux-notice", { message: "El viewmodel se traza hasta un MODELO de datos" });
        return;
      }
      if ((n === "view" || n === "edit") && w(e) && _(t)) {
        this.command({
          kind: n === "view" ? "set-app-view-page" : "set-app-edit-page",
          appId: e,
          pageId: t
        });
        return;
      }
      if (n) return;
      const M = (F) => /^wizrow:([^:]+):(.+)$/.exec(F), S = M(e) ?? M(t);
      if (S) {
        const F = M(e) ? t : e;
        _(F) && F !== S[1] && this.command({ kind: "set-wizard-step-page", pageId: S[1], itemId: S[2], targetId: F });
        return;
      }
      const E = m.find((F) => F.id === t && F.type === "WIZARD");
      if (_(e) && E && e !== E.id) {
        (E.wizardSteps ?? []).some((F) => F.pageId === e) || this.command({ kind: "add-page-wizard-step", pageId: E.id, targetId: e });
        return;
      }
      if (_(e) && w(t)) {
        const F = m.find((he) => he.id === e), j = v.find((he) => he.id === t);
        if (j.type === "MASTER_DETAIL" && !j.headerPageId) {
          this.command({ kind: "set-app-header-page", appId: t, pageId: e }), this.emit("modux-notice", {
            message: `${F.name} es la cabecera de ${j.name} — las siguientes páginas serán pestañas`
          });
          return;
        }
        this.command({
          kind: "add-menu-item",
          appId: t,
          label: F.name,
          pageId: e,
          itemId: this.newMenuItemId(F.name)
        });
        return;
      }
      const N = this.model.identityProviders ?? [], B = (F) => N.some((j) => j.id === F);
      if (B(e) || B(t)) {
        const F = B(e) ? e : t, j = B(e) ? t : e;
        w(j) ? this.command({ kind: "set-identity-provider", id: j, targetId: F }) : this.emit("modux-notice", { message: "En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)" });
        return;
      }
      const ie = (F) => (this.model.models ?? []).some((j) => j.id === F);
      if (ie(e) || ie(t)) {
        const F = ie(e) ? e : t, j = ie(e) ? t : e;
        if (_(j)) {
          this.command({ kind: "set-page-model", pageId: j, modelId: F });
          return;
        }
        if (w(j)) {
          this.command({ kind: "set-app-model", appId: j, modelId: F });
          return;
        }
        return;
      }
      const Z = fe(e);
      if (Z != null && Z.itemId && ((z = fe(t)) != null && z.itemId || w(t))) {
        const F = fe(t), j = this.menuEntryIn(Z.appId, Z.itemId);
        if (!j) return;
        if (F != null && F.itemId) {
          const he = this.menuEntryIn(F.appId, F.itemId);
          if (!he) return;
          const we = (rt) => (rt ?? []).some((jt) => jt.id === F.itemId || we(jt.children));
          if (Z.appId === F.appId && (F.itemId === Z.itemId || we(j.entry.children)))
            return;
          const Se = (D = this.renderRoot.querySelector("modux-canvas")) == null ? void 0 : D.renderRoot.querySelector(`g[data-node-id="${t}"]`), ve = Se == null ? void 0 : Se.getBoundingClientRect(), Ve = ve && s !== void 0 ? (s - ve.top) / Math.max(1, ve.height) : 0.5, Gt = Ve < 0.3 ? "before" : Ve > 0.7 ? "after" : "nest";
          if (Gt === "nest")
            this.command({
              kind: "move-menu-item",
              appId: Z.appId,
              toAppId: F.appId,
              itemId: Z.itemId,
              parentId: F.itemId
            });
          else {
            const rt = Gt === "before" ? F.itemId : he.beforeId ?? void 0;
            if (Z.appId === F.appId && he.parentId === j.parentId && rt === Z.itemId) return;
            this.command({
              kind: "move-menu-item",
              appId: Z.appId,
              toAppId: F.appId,
              itemId: Z.itemId,
              parentId: he.parentId ?? void 0,
              beforeItemId: rt
            });
          }
          return;
        }
        if (Z.appId === t && !j.parentId) return;
        this.command({
          kind: "move-menu-item",
          appId: Z.appId,
          toAppId: t,
          itemId: Z.itemId
        });
        return;
      }
      const H = fe(e) ?? fe(t);
      if (H) {
        const F = fe(e) ? e : t, j = fe(e) ? t : e;
        if (((U = this.sceneFor("ui").nodes.find((ve) => ve.id === F)) == null ? void 0 : U.kind) === "menu-group") {
          this.emit("modux-notice", { message: "Un agrupador (con submenú) no puede abrir nada" });
          return;
        }
        const he = this.model.modules.some(
          (ve) => (ve.useCases ?? []).some((Ve) => Ve.id === j)
        ), we = (this.model.aggregates ?? []).some((ve) => ve.id === j), Se = this.model.modules.flatMap((ve) => ve.queryServices ?? []).find((ve) => (ve.operations ?? []).some((Ve) => Ve.id === j));
        _(j) ? this.command({ kind: "set-menu-page", pageId: j, ...H }) : w(j) && j !== H.appId ? this.command({ kind: "set-menu-app", toAppId: j, ...H }) : he ? this.command({ kind: "set-menu-use-case", useCaseId: j, ...H }) : we ? this.command({ kind: "set-menu-aggregate", aggregateId: j, ...H }) : Se && this.command({
          kind: "set-menu-query-operation",
          queryServiceId: Se.id,
          queryOperationId: j,
          ...H
        });
        return;
      }
      if ((this.model.actors ?? []).some((F) => F.id === e) && w(t)) {
        (this.model.actorAppUses ?? []).some((F) => F.actorId === e && F.appId === t) || this.command({ kind: "add-actor-app", actorId: e, appId: t });
        return;
      }
      const G = _(e) ? { pageId: e, other: t } : _(t) ? { pageId: t, other: e } : null;
      if (G) {
        const F = new Set(
          this.model.modules.flatMap((we) => (we.useCases ?? []).map((Se) => Se.id))
        ), j = new Set(
          this.model.modules.flatMap((we) => (we.queryServices ?? []).map((Se) => Se.id))
        ), he = m.find((we) => we.id === G.pageId);
        F.has(G.other) ? (he.buttons ?? []).some((we) => we.useCaseId === G.other) || this.command({ kind: "add-page-button", pageId: G.pageId, useCaseId: G.other }) : j.has(G.other) && this.command({ kind: "set-page-listing", pageId: G.pageId, queryServiceId: G.other });
      }
      return;
    }
    if (this._view === "mappings") {
      const m = this.model.models ?? [];
      if (!m.some((E) => E.id === e) || !m.some((E) => E.id === t) || e === t || (this.model.modelMappings ?? []).some((E) => E.sourceModelId === e && E.targetModelId === t))
        return;
      const v = m.find((E) => E.id === e), w = m.find((E) => E.id === t), _ = (E) => E.replace(/[^a-zA-Z0-9]/g, ""), M = new Set((this.model.modelMappings ?? []).map((E) => E.id));
      let S = `mapping-${ne(v.name)}-${ne(w.name)}`;
      for (let E = 2; M.has(S); E++) S = `mapping-${ne(v.name)}-${ne(w.name)}-${E}`;
      this.command({
        kind: "add-model-mapping",
        id: S,
        name: `${_(v.name)}2${_(w.name)}`,
        sourceId: e,
        targetId: t
      });
      return;
    }
    if (this._view !== "context-map") return;
    const o = /^apiop:(.+)@(.+)$/.exec(e);
    if (o) {
      const [, m, v] = o, w = (this.model.proxyApis ?? []).find((N) => N.id === v), _ = (w == null ? void 0 : w.targetApiId) ?? ((re = (this.model.apiImplementations ?? []).find(
        (N) => N.moduleId === v && (this.model.apis ?? []).some(
          (B) => B.id === N.apiId && B.operations.some((ie) => ie.id === m)
        )
      )) == null ? void 0 : re.apiId);
      if (!_) return;
      if (new Set(
        this.model.modules.flatMap((N) => (N.useCases ?? []).map((B) => B.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-implementation",
          apiId: _,
          operationId: m,
          moduleId: v,
          targetUseCaseId: t
        });
        return;
      }
      if (!(w != null && w.targetApiId)) return;
      let S = null;
      if (t === w.targetApiId)
        S = w.targetApiId;
      else {
        const N = /^apiimpl:(.+)@(.+)$/.exec(t);
        N && N[1] === w.targetApiId ? S = N[2] : this.model.modules.some((B) => B.id === t) && (this.model.apiImplementations ?? []).some(
          (B) => B.apiId === w.targetApiId && B.moduleId === t
        ) && (S = t);
      }
      if (!S) return;
      (this.model.proxyOperationRoutes ?? []).some(
        (N) => N.proxyId === w.id && N.operationId === m && N.targetSiteId === S
      ) || this.command({
        kind: "add-proxy-operation-route",
        proxyId: w.id,
        operationId: m,
        targetSiteId: S
      });
      return;
    }
    const a = new Set((this.model.aiAgents ?? []).map((m) => m.id));
    if (a.has(e)) {
      if (new Set(
        this.model.modules.flatMap((S) => (S.useCases ?? []).map((E) => E.id))
      ).has(t)) {
        (this.model.agentUses ?? []).some(
          (E) => E.agentId === e && E.useCaseId === t
        ) || this.command({ kind: "add-agent-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((S) => (S.useCases ?? []).map((E) => E.id))
      ).has(t)) {
        (this.model.agentExternalUses ?? []).some(
          (E) => E.agentId === e && E.externalUseCaseId === t
        ) || this.command({ kind: "add-agent-external-use", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((S) => (S.mcpServers ?? []).map((E) => E.id))
      ).has(t)) {
        (this.model.agentMcpUses ?? []).some(
          (E) => E.agentId === e && E.mcpServerId === t
        ) || this.command({ kind: "add-agent-mcp", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.mcpGateways ?? []).some((S) => S.id === t)) {
        (this.model.agentGatewayUses ?? []).some(
          (E) => E.agentId === e && E.gatewayId === t
        ) || this.command({ kind: "add-agent-gateway", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        (this.model.apis ?? []).flatMap((S) => S.operations.map((E) => E.id))
      ).has(t)) {
        (this.model.agentApiOpUses ?? []).some(
          (E) => E.agentId === e && E.apiOperationId === t
        ) || this.command({ kind: "add-agent-api-operation", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.apis ?? []).some((S) => S.id === t) || (this.model.proxyApis ?? []).some((S) => S.id === t)) {
        (this.model.agentApiUses ?? []).some(
          (E) => E.agentId === e && E.apiId === t
        ) || this.command({ kind: "add-agent-api", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.modules.flatMap((S) => (S.queryServices ?? []).map((E) => E.id))
      ).has(t)) {
        (this.model.agentQueryUses ?? []).some(
          (E) => E.agentId === e && E.queryServiceId === t
        ) || this.command({ kind: "add-agent-query", sourceId: e, targetId: t });
        return;
      }
      if (a.has(t) && t !== e) {
        (this.model.agentDelegations ?? []).some(
          (E) => E.agentId === e && E.delegateAgentId === t
        ) || this.command({ kind: "add-agent-delegate", sourceId: e, targetId: t });
        return;
      }
      (this.model.rags ?? []).some((S) => S.id === t) && ((this.model.agentRags ?? []).some(
        (E) => E.agentId === e && E.ragId === t
      ) || this.command({ kind: "add-agent-rag", sourceId: e, targetId: t }));
      return;
    }
    if ((this.model.mcpGateways ?? []).some((m) => m.id === e)) {
      const m = (this.model.mcpGateways ?? []).find((_) => _.id === e), v = this.model.externalSystems.some((_) => (_.mcpServers ?? []).some((M) => M.id === t)) || (this.model.apis ?? []).some((_) => _.id === t) || (this.model.apis ?? []).some((_) => _.operations.some((M) => M.id === t)) || this.model.modules.some((_) => (_.useCases ?? []).some((M) => M.id === t)) || (this.model.rags ?? []).some((_) => _.id === t), w = [
        ...m.mcpServerIds ?? [],
        ...m.apiIds ?? [],
        ...m.apiOperationIds ?? [],
        ...m.useCaseIds ?? [],
        ...m.ragIds ?? []
      ].includes(t);
      v && !w && this.command({ kind: "add-gateway-exposure", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.mcpGateways ?? []).some((m) => m.id === t)) return;
    const d = (this.model.rags ?? []).find((m) => m.id === e);
    if (d) {
      if (new Set(
        this.model.modules.flatMap((w) => (w.readModels ?? []).map((_) => _.id))
      ).has(t) && !(d.sourceReadModelIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (new Set(
        this.model.externalSystems.flatMap((w) => (w.tables ?? []).map((_) => _.id))
      ).has(t) && !(d.sourceExternalTableIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (((this.model.apis ?? []).some((w) => w.id === t) || (this.model.proxyApis ?? []).some((w) => w.id === t)) && !(d.sourceApiIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((w) => w.id === t) && !(d.sourceExternalSystemIds ?? []).includes(t)) {
        this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
        return;
      }
      this.model.modules.some((w) => w.id === t) && !(d.sourceModuleIds ?? []).includes(t) && this.command({ kind: "add-rag-source", sourceId: e, targetId: t });
      return;
    }
    if ((this.model.rags ?? []).some((m) => m.id === t)) return;
    if ((this.model.workflows ?? []).some((m) => m.id === e)) {
      const m = (this.model.workflows ?? []).find((_) => _.id === e), v = (this.model.workflows ?? []).find(
        (_) => _.id === t && _.id !== e
      );
      if (v) {
        const _ = m.onCompletionEventName || `${m.name.replace(/\s+/g, "")}Completado`;
        v.triggerEvent !== _ && this.command({ kind: "set-workflow-trigger", id: t, triggerEvent: _ });
        return;
      }
      const w = this.model.modules.flatMap((_) => _.useCases ?? []).find((_) => _.id === t);
      if (w && !(m.steps ?? []).some((M) => M.targetUseCaseId === t)) {
        const M = `wfs-${ne(w.name)}`;
        let S = M;
        for (let E = 2; (m.steps ?? []).some((N) => N.id === S); E++)
          S = `${M}-${E}`;
        this.command({
          kind: "add-workflow-step",
          workflowId: e,
          id: S,
          name: w.name,
          targetUseCaseId: t
        });
      }
      return;
    }
    if ((this.model.workflows ?? []).some((m) => m.id === t)) {
      const m = this.model.modules.flatMap((_) => _.domainEvents ?? []).find((_) => _.id === e), v = this.model.modules.flatMap((_) => _.applicationEvents ?? []).find((_) => _.id === e), w = m ?? v;
      if (w) {
        const _ = (this.model.emissions ?? []).find((N) => N.domainEventId === e), M = new Set((this.model.aggregates ?? []).map((N) => N.id)), S = new Set(
          this.model.modules.flatMap((N) => (N.domainServices ?? []).map((B) => B.id))
        ), E = new Set(
          this.model.modules.flatMap((N) => (N.useCases ?? []).map((B) => B.id))
        );
        this.command({
          kind: "set-workflow-trigger",
          id: t,
          triggerEvent: w.name,
          triggerAggregateId: _ && M.has(_.sourceId) ? _.sourceId : void 0,
          triggerDomainServiceId: _ && S.has(_.sourceId) ? _.sourceId : void 0,
          triggerUseCaseId: _ && E.has(_.sourceId) ? _.sourceId : void 0
        });
      }
      return;
    }
    if ((this.model.proxyApis ?? []).some((m) => m.id === e)) {
      const m = (this.model.proxyApis ?? []).find((v) => v.id === e);
      if ((this.model.apis ?? []).some((v) => v.id === t)) {
        m.targetApiId !== t && this.command({ kind: "set-proxy-target", id: e, targetId: t });
        return;
      }
      if (this.model.modules.some((v) => v.id === t)) {
        if (!m.targetApiId) return;
        (this.model.apiImplementations ?? []).some(
          (w) => w.apiId === m.targetApiId && w.moduleId === t
        ) || this.command({ kind: "add-api-implementation", apiId: m.targetApiId, moduleId: t });
        return;
      }
      this.model.externalSystems.some((v) => v.id === t) && m.publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
      return;
    }
    if ((this.model.apis ?? []).some((m) => m.id === e)) {
      if (this.model.externalSystems.some((m) => m.id === t)) {
        (this.model.apis ?? []).find((v) => v.id === e).publishedByExternalSystemId !== t && this.command({ kind: "set-api-publisher", id: e, targetId: t });
        return;
      }
      this.model.modules.some((m) => m.id === t) && ((this.model.apiImplementations ?? []).some(
        (v) => v.apiId === e && v.moduleId === t
      ) || this.command({ kind: "add-api-implementation", apiId: e, moduleId: t }));
      return;
    }
    const c = new Set((this.model.actors ?? []).map((m) => m.id));
    if (a.has(t)) {
      if ((/* @__PURE__ */ new Set([
        ...this.model.modules.flatMap((v) => (v.domainEvents ?? []).map((w) => w.id)),
        ...this.model.modules.flatMap((v) => (v.applicationEvents ?? []).map((w) => w.id))
      ])).has(e)) {
        (this.model.agentTriggers ?? []).some(
          (w) => w.eventId === e && w.agentId === t
        ) || this.command({ kind: "add-agent-trigger", sourceId: e, targetId: t });
        return;
      }
      if (!c.has(e)) return;
    }
    if (c.has(e)) {
      const m = new Set(
        this.model.modules.flatMap((w) => (w.useCases ?? []).map((_) => _.id))
      ), v = new Set(
        this.model.modules.flatMap((w) => (w.queryServices ?? []).map((_) => _.id))
      );
      if (m.has(t) || v.has(t)) {
        (this.model.actorUses ?? []).some(
          (_) => _.actorId === e && _.targetId === t
        ) || this.command({ kind: "add-actor-use", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aggregates ?? []).some((w) => w.id === t)) {
        this.command({ kind: "add-actor-crud", sourceId: e, targetId: t });
        return;
      }
      if (this.model.externalSystems.some((w) => w.id === t)) {
        (this.model.actorExternalDependencies ?? []).some(
          (_) => _.actorId === e && _.externalSystemId === t
        ) || this.command({ kind: "add-actor-external", sourceId: e, targetId: t });
        return;
      }
      if ((this.model.aiAgents ?? []).some((w) => w.id === t)) {
        (this.model.actorAgentUses ?? []).some(
          (_) => _.actorId === e && _.agentId === t
        ) || this.command({ kind: "add-actor-agent", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    const p = this.owningApiOf(e);
    if (p) {
      if (new Set(
        this.model.modules.flatMap((v) => (v.useCases ?? []).map((w) => w.id))
      ).has(t)) {
        this.command({
          kind: "set-api-operation-target",
          apiId: p.id,
          id: e,
          targetUseCaseId: t
        });
        return;
      }
      if (this.model.modules.some((v) => v.id === t)) {
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
    const I = this.model.identityProviders ?? [], f = (m) => I.find((v) => v.id === m);
    if (f(e) || f(t)) {
      const m = f(e) ?? f(t), v = f(e) ? t : e;
      if (f(e) && this.model.externalSystems.some((M) => M.id === v)) {
        m.publishedByExternalSystemId !== v && this.command({ kind: "set-idp-publisher", id: m.id, targetId: v });
        return;
      }
      const w = this.model.modules.some((M) => M.id === v), _ = (this.model.etlFlows ?? []).some((M) => M.id === v);
      if (w || _) {
        this.command({ kind: "set-identity-provider", id: v, targetId: m.id });
        return;
      }
      this.emit("modux-notice", {
        message: "Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa"
      });
      return;
    }
    const y = this.model.etlFlows ?? [], h = (m) => y.find((v) => v.id === m);
    if (h(e) || h(t)) {
      const m = h(e) ?? h(t), v = h(e) ? t : e, w = !h(e), _ = new Set(this.model.externalSystems.flatMap((G) => (G.tables ?? []).map((F) => F.id))), M = /* @__PURE__ */ new Set([
        ...(this.model.apis ?? []).map((G) => G.id),
        ...(this.model.proxyApis ?? []).map((G) => G.id)
      ]), S = (this.model.apis ?? []).find((G) => G.operations.some((F) => F.id === v)), E = new Set(
        this.model.modules.flatMap((G) => [
          ...(G.domainEvents ?? []).map((F) => F.id),
          ...(G.applicationEvents ?? []).map((F) => F.id)
        ])
      );
      let N = null, B = {};
      if (_.has(v) ? (N = w ? "SOURCE_PULL" : "WRITE_DB", B = { externalTableId: v }) : S ? (N = w ? "SOURCE_PULL" : "WRITE_API", B = { apiId: S.id, operationId: v }) : M.has(v) ? (N = w ? "SOURCE_PULL" : "WRITE_API", B = { apiId: v }) : E.has(v) && (N = w ? "SOURCE_CONSUMER" : "WRITE_EVENT", B = { targetId: v }), !N) {
        this.emit("modux-notice", {
          message: "Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos"
        });
        return;
      }
      if ((m.steps ?? []).some(
        (G) => G.type === N && (G.externalTableId ?? G.operationId ?? G.apiId ?? G.eventId) === (B.externalTableId ?? B.operationId ?? B.apiId ?? B.targetId)
      )) return;
      const Z = new Set((m.steps ?? []).map((G) => G.id));
      let H = (m.steps ?? []).length + 1;
      for (; Z.has(`ets-${H}`); ) H++;
      this.command({ kind: "add-etl-step", etlFlowId: m.id, id: `ets-${H}`, stepType: N, ...B });
      return;
    }
    const r = this.model.externalSystems.flatMap((m) => m.useCases ?? []).find((m) => m.id === e), u = this.model.externalSystems.flatMap((m) => m.tables ?? []).find((m) => m.id === e);
    if (r || u) {
      const m = (r ?? u).name, v = r ? { externalUseCaseId: e } : { externalTableId: e }, w = (S) => r ? S.sourceExternalUseCaseId === e : S.sourceExternalTableId === e, _ = this.model.modules.flatMap((S) => S.readModels ?? []).find((S) => S.id === t);
      if (_) {
        (this.model.projections ?? []).some(
          (E) => w(E) && E.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(m)}-${ne(_.name)}`,
          name: `${_.name}Projection`,
          ...v,
          targetId: t
        });
        return;
      }
      const M = this.model.modules.find((S) => S.id === t);
      if (M) {
        (this.model.projections ?? []).some(
          (E) => w(E) && E.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(m)}-${ne(M.name)}`,
          name: `${m}ViewProjection`,
          ...v,
          moduleId: t,
          readModelName: `${m}View`
        });
        return;
      }
      return;
    }
    const g = (this.model.aggregates ?? []).find((m) => m.id === e);
    if (g) {
      const m = this.model.modules.flatMap((w) => w.readModels ?? []).find((w) => w.id === t);
      if (m) {
        (this.model.projections ?? []).some(
          (_) => _.sourceAggregateId === e && _.readModelId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(g.name)}-${ne(m.name)}`,
          name: `${m.name}Projection`,
          aggregateId: e,
          targetId: t
        });
        return;
      }
      const v = this.model.modules.find((w) => w.id === t);
      if (v) {
        (this.model.projections ?? []).some(
          (_) => _.sourceAggregateId === e && _.moduleId === t
        ) || this.command({
          kind: "add-projection",
          id: `proj-${ne(g.name)}-${ne(v.name)}`,
          name: `${g.name}ViewProjection`,
          aggregateId: e,
          moduleId: t,
          readModelName: `${g.name}View`
        });
        return;
      }
    }
    const k = new Set(
      this.model.modules.flatMap((m) => (m.domainEvents ?? []).map((v) => v.id))
    ), C = /* @__PURE__ */ new Set([
      ...(this.model.aggregates ?? []).map((m) => m.id),
      ...this.model.modules.flatMap((m) => (m.domainServices ?? []).map((v) => v.id))
    ]), O = new Set(
      this.model.modules.flatMap((m) => (m.applicationEvents ?? []).map((v) => v.id))
    ), P = new Set(this.model.modules.flatMap((m) => (m.useCases ?? []).map((v) => v.id))), b = new Set(
      this.model.modules.flatMap((m) => (m.queryServices ?? []).map((v) => v.id))
    );
    if (P.has(e) && b.has(t)) {
      (this.model.queryCalls ?? []).some(
        (v) => v.sourceId === e && v.targetId === t
      ) || this.command({ kind: "add-query-call", sourceId: e, targetId: t });
      return;
    }
    const x = new Set(
      this.model.externalSystems.flatMap((m) => (m.useCases ?? []).map((v) => v.id))
    );
    if (P.has(e) && x.has(t)) {
      (this.model.externalUseCaseCalls ?? []).some(
        (v) => v.sourceId === e && v.targetId === t
      ) || this.command({ kind: "add-external-uc-call", sourceId: e, targetId: t });
      return;
    }
    if (P.has(e) && P.has(t) && e !== t) {
      (this.model.useCaseCalls ?? []).some(
        (v) => v.sourceId === e && v.targetId === t
      ) || this.command({ kind: "add-use-case-call", sourceId: e, targetId: t });
      return;
    }
    const A = this.model.modules.flatMap((m) => m.scheduledTriggers ?? []).find((m) => m.id === e);
    if (A && P.has(t)) {
      A.useCaseId !== t && this.command({ kind: "set-scheduled-trigger-target", id: e, targetUseCaseId: t });
      return;
    }
    if (P.has(e) && (this.model.aggregates ?? []).some((m) => m.id === t)) {
      (this.model.aggregateCalls ?? []).some(
        (v) => v.sourceId === e && v.targetId === t
      ) || this.command({ kind: "add-aggregate-call", sourceId: e, targetId: t });
      return;
    }
    if (C.has(e) && k.has(t) || P.has(e) && O.has(t)) {
      (this.model.emissions ?? []).some(
        (v) => v.sourceId === e && v.domainEventId === t
      ) || this.command({ kind: "add-emission", sourceId: e, targetId: t });
      return;
    }
    if (k.has(e) || O.has(e)) {
      const m = O.has(e), v = this.model.modules.flatMap((H) => (m ? H.applicationEvents : H.domainEvents) ?? []).find((H) => H.id === e), w = this.model.modules.flatMap((H) => (H.useCases ?? []).map((G) => ({ u: G, module: H }))).find(({ u: H }) => H.id === t), _ = this.model.modules.flatMap((H) => (H.readModels ?? []).map((G) => ({ rm: G, module: H }))).find(({ rm: H }) => H.id === t), M = this.model.modules.find((H) => H.id === t) ?? (_ == null ? void 0 : _.module) ?? (w == null ? void 0 : w.module);
      if (!v || !M) return;
      const S = new Set((this.model.aggregates ?? []).map((H) => H.id)), E = new Set(
        this.model.modules.flatMap((H) => (H.domainServices ?? []).map((G) => G.id))
      ), N = (this.model.emissions ?? []).find(
        (H) => H.domainEventId === e && (m ? P.has(H.sourceId) : S.has(H.sourceId) || E.has(H.sourceId))
      );
      if (!N) {
        this.emit("modux-notice", {
          message: m ? `Declara primero qué caso de uso publica ${v.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador` : `Declara primero quién emite ${v.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: "info"
        });
        return;
      }
      const B = !m && S.has(N.sourceId);
      if (w) {
        if (this.model.flows.some(
          (G) => G.archetype === "TRIGGERS" && G.triggerEvent === v.name && G.targetUseCaseId === w.u.id
        )) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ne(v.name)}-${ne(w.u.name)}`,
          name: w.u.name,
          archetype: "TRIGGERS",
          triggerAggregateId: B ? N.sourceId : "",
          triggerDomainServiceId: !m && !B ? N.sourceId : void 0,
          triggerUseCaseId: m ? N.sourceId : void 0,
          triggerEvent: v.name,
          targetId: M.id,
          targetUseCaseId: w.u.id
        });
        return;
      }
      const ie = (_ == null ? void 0 : _.rm.name) ?? `${v.name}View`;
      if (this.model.flows.some(
        (H) => H.archetype === "MATERIALIZES" && H.triggerEvent === v.name && H.targetId === M.id && H.readModelName === ie
      )) return;
      this.command({
        kind: "add-flow",
        id: `flow-${ne(v.name)}-${ne(ie)}`,
        name: ie,
        archetype: "MATERIALIZES",
        triggerAggregateId: B ? N.sourceId : "",
        triggerDomainServiceId: !m && !B ? N.sourceId : void 0,
        triggerUseCaseId: m ? N.sourceId : void 0,
        triggerEvent: v.name,
        targetId: M.id,
        readModelName: ie
      });
      return;
    }
    const L = /* @__PURE__ */ new Set([
      ...C,
      ...P,
      ...b,
      ...this.model.modules.flatMap((m) => (m.readModels ?? []).map((v) => v.id))
    ]);
    if (L.has(e) || L.has(t) || k.has(t) || O.has(t))
      return;
    const R = new Set(this.model.externalSystems.map((m) => m.id));
    if (R.has(e)) {
      if (new Set(
        this.model.modules.flatMap((M) => (M.useCases ?? []).map((S) => S.id))
      ).has(t)) {
        (this.model.externalCalls ?? []).some(
          (S) => S.externalSystemId === e && S.useCaseId === t
        ) || this.command({ kind: "add-external-call", sourceId: e, targetId: t });
        return;
      }
      if (R.has(t) && t !== e) {
        this._extDepPicker = { sourceId: e, targetId: t, x: i ?? 0, y: s ?? 0 };
        return;
      }
      const v = (this.model.apis ?? []).find(
        (M) => M.operations.some((S) => S.id === t)
      ), w = /^apiop:(.+)@(.+)$/.exec(t), _ = v ? { operationId: t, siteId: v.id } : w ? { operationId: w[1], siteId: w[2] } : null;
      if (_) {
        (this.model.externalOperationUses ?? []).some(
          (S) => S.externalSystemId === e && S.operationId === _.operationId && S.siteId === _.siteId
        ) || this.command({
          kind: "add-external-operation-use",
          sourceId: e,
          operationId: _.operationId,
          targetSiteId: _.siteId
        });
        return;
      }
      if ((this.model.apis ?? []).some((M) => M.id === t) || (this.model.proxyApis ?? []).some((M) => M.id === t)) {
        (this.model.externalSystemDependencies ?? []).some(
          (S) => S.sourceId === e && S.targetId === t
        ) || this.command({ kind: "add-external-dependency", sourceId: e, targetId: t });
        return;
      }
      return;
    }
    R.has(t) || c.has(t);
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
          const o = fe(n[1]);
          o && this.command({ kind: "set-menu-page", pageId: null, ...o });
        } else if (n = /^menuapp:(.+)->[^>]+$/.exec(t)) {
          const o = fe(n[1]);
          o && this.command({ kind: "set-menu-app", toAppId: null, ...o });
        } else if (n = /^menuuc:(.+)->[^>]+$/.exec(t)) {
          const o = fe(n[1]);
          o && this.command({ kind: "set-menu-use-case", useCaseId: null, ...o });
        } else if (n = /^menuagg:(.+)->[^>]+$/.exec(t)) {
          const o = fe(n[1]);
          o && this.command({ kind: "set-menu-aggregate", aggregateId: null, ...o });
        } else if (n = /^menuqop:(.+)->[^>]+$/.exec(t)) {
          const o = fe(n[1]);
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
        const n = fe(t);
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
    const t = new Set(e.memberIds), i = (n, o, a = {}) => $`
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
    `, s = (n, o) => o.length ? $`<h4>${n}</h4>${o}` : "";
    return $`
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
            const n = fe(i);
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
    ), d = new Set(a.map((h) => h.id)), c = (this.model.uiApps ?? []).filter((h) => t.has(h.id)), p = /* @__PURE__ */ new Set(), I = (h) => {
      for (const r of h ?? [])
        r.pageId && p.add(r.pageId), I(r.children);
    };
    c.forEach((h) => I(h.menuItems));
    const f = (this.model.pages ?? []).filter(
      (h) => t.has(h.id) || p.has(h.id)
    ), y = new Set(c.map((h) => h.id));
    return {
      ...this.model,
      uiApps: c,
      pages: f,
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
    const t = e.detail.kind === "process-step" ? ic(this.model.processes, e.detail.id) : e.detail.kind === "workflow-step" ? (() => {
      const i = this.owningWorkflowOf(e.detail.id);
      return i ? { elementType: "workflow", id: i.id } : null;
    })() : tc(e.detail.id, e.detail.kind);
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
    const a = o ?? this.allComponentIds(), d = (f) => {
      if (!n) return f.id;
      const y = `cmp-${ne(f.kind)}`;
      let h = y;
      for (let r = 2; a.has(h) || a.has(`${h}-tab-1`); r++) h = `${y}-${r}`;
      return a.add(h), h;
    }, c = [], p = (f, y) => {
      const h = d(f);
      c.push({ kind: "add-page-component", pageId: e, componentId: h, componentKind: f.kind, parentComponentId: y }), f.kind === "tabLayout" && (c.push({ kind: "remove-page-component", pageId: e, componentId: `${h}-tab-1` }), c.push({ kind: "remove-page-component", pageId: e, componentId: `${h}-tab-2` })), c.push({
        kind: "set-page-component",
        pageId: e,
        componentId: h,
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
      for (const r of f.children ?? []) p(r, h);
      return h;
    }, I = p(t, i);
    return s && c.push({
      kind: "move-page-component",
      pageId: e,
      componentId: I,
      parentComponentId: i ?? null,
      beforeComponentId: s
    }), { ops: c, rootId: I };
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
      t = this._selectedCmp.pageId, se.LEAF_KINDS.has(d.node.kind) ? (i = d.parentId ?? void 0, s = d.beforeId) : i = d.node.kind === "tabLayout" && e.kind !== "tab" ? (a = (d.node.children ?? [])[0]) == null ? void 0 : a.id : d.node.id;
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
    return $`<modux-figma
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
      "etl-flow"
    ].includes(e)) return s.find((d) => this.model.modules.some((c) => c.id === d)) ?? null;
    if (e === "read-model") {
      const d = s.find((p) => (this.model.aggregates ?? []).some((I) => I.id === p));
      if (d) return d;
      const c = s.find((p) => this.model.modules.some((I) => I.id === p));
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
        if ((this.model.apis ?? []).some((I) => I.id === d)) return d;
        const c = /^apiimpl:(.+)@(.+)$/.exec(d);
        if (c && (this.model.apis ?? []).some((I) => I.id === c[1])) return c[1];
        const p = (this.model.proxyApis ?? []).find((I) => I.id === d);
        if (p != null && p.targetApiId) return p.targetApiId;
      }
      return null;
    }
    return e === "api" ? s.find((d) => this.model.externalSystems.some((c) => c.id === d)) ?? s.find((d) => this.model.modules.some((c) => c.id === d)) ?? null : null;
  }
  createFromPalette(e, t, i, s = null) {
    var h, r, u, g, k, C, O;
    const n = W.PALETTE_NEW.find((P) => P.type === e);
    if (!n) return;
    if (e.startsWith("cmp:")) {
      const P = e.slice(4), b = i ? /^cmp:([^:]+):(.+)$/.exec(i) : null, x = b ? b[1] : i && (this.model.pages ?? []).some((D) => D.id === i) ? i : null;
      if (!x) {
        this.emit("modux-notice", { message: "Suelta el layout/componente sobre una página" });
        return;
      }
      let A = b ? b[2] : void 0, L = null;
      if (P === "tab") {
        let D = null, U = A ? this.componentIn(x, A) : null;
        for (; U; ) {
          if (U.node.kind === "tabLayout") {
            D = U.node.id;
            break;
          }
          U = U.parentId ? this.componentIn(x, U.parentId) : null;
        }
        if (!D) {
          this.emit("modux-notice", { message: "Suelta la pestaña sobre un layout de pestañas" });
          return;
        }
        const re = this.componentIn(x, D).node, m = this.newComponentId("tab"), v = `Pestaña ${(re.children ?? []).filter((w) => w.kind === "tab").length + 1}`;
        this.command({ kind: "add-page-component", pageId: x, componentId: m, componentKind: "tab", parentComponentId: D }, !1), this.command({ kind: "set-page-component", pageId: x, componentId: m, title: v }, !1), this.pushUndoEntry([{ kind: "remove-page-component", pageId: x, componentId: m }]);
        return;
      }
      if (s != null && s.componentId && s.pos !== "into") {
        const D = this.componentIn(x, s.componentId);
        D && D.node.kind === "tab" ? A = D.node.id : D && (A = D.parentId ?? void 0, L = s.pos === "before" ? s.componentId : D.beforeId);
      } else if (A) {
        const D = ((h = this.componentIn(x, A)) == null ? void 0 : h.node) ?? null;
        (D == null ? void 0 : D.kind) === "tabLayout" && (D.children ?? [])[0] && (A = (D.children ?? [])[0].id);
      }
      const R = this.newComponentId(P), z = {
        kind: "add-page-component",
        pageId: x,
        componentId: R,
        componentKind: P,
        parentComponentId: A
      };
      if (!L) {
        this.command(z);
        return;
      }
      this.command(z, !1), this.command(
        { kind: "move-page-component", pageId: x, componentId: R, parentComponentId: A ?? null, beforeComponentId: L },
        !1
      ), this.pushUndoEntry([{ kind: "remove-page-component", pageId: x, componentId: R }]);
      return;
    }
    const o = this._view, a = this.sceneFor(o), d = (P, b) => {
      const x = this.viewLayout(o), A = b ? a.nodes.find((R) => R.id === b) : void 0, L = A ? { x: Math.round(t.x - A.x), y: Math.round(t.y - A.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      return this.writeViewLayout(o, { ...x, nodes: { ...x.nodes, [P]: L } }), { kind: "move-node", view: o, id: P, pos: null };
    }, c = (P, b, x) => {
      const A = this.inverseOf(P) ?? [];
      this.command(P, !1);
      const L = d(b, x);
      this.pushUndoEntry([...A, L]);
    };
    if (!n.child) {
      const P = {
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
      }, { id: b, name: x } = this.uniquePaletteName(n.label, P[e] ?? ""), A = e === "module" ? { kind: "add-module", id: b, name: x, subdomainType: "SUPPORTING" } : e === "actor" ? { kind: "add-actor", id: b, name: x } : e === "external-system" ? { kind: "add-external-system", id: b, name: x } : e === "ai-agent" ? { kind: "add-ai-agent", id: b, name: x } : e === "external-ai-agent" ? { kind: "add-ai-agent", id: b, name: x, external: !0 } : e === "mcp-gateway" ? { kind: "add-mcp-gateway", id: b, name: x } : e === "rag" ? { kind: "add-rag", id: b, name: x } : e === "api" ? { kind: "add-api", id: b, name: x } : e === "proxy-api" ? { kind: "add-proxy-api", id: b, name: x } : e === "ui-app" ? { kind: "create-ui-app", id: b, name: x } : e === "ui-app-orchestrator" ? { kind: "create-ui-app", id: b, name: x, type: "ORCHESTRATOR" } : e === "ui-app-masterdetail" ? { kind: "create-ui-app", id: b, name: x, type: "MASTER_DETAIL" } : e === "ui-app-vieweditor" ? { kind: "create-ui-app", id: b, name: x, type: "VIEW_EDITOR" } : e === "ui-model" ? { kind: "add-model", id: b, name: x } : e === "identity-provider" ? { kind: "add-identity-provider", id: b, name: x } : {
        kind: "add-workflow",
        id: b,
        name: x,
        completionEventName: `${x.replace(/\s+/g, "")}Completado`
      };
      c(A, b);
      return;
    }
    if (e === "ui-wizard-step") {
      const P = [];
      for (let R = i ?? void 0; R; )
        P.push(R), R = (r = a.nodes.find((z) => z.id === R)) == null ? void 0 : r.parentId;
      const b = P.map((R) => {
        var z;
        return ((z = /^wizrow:([^:]+):/.exec(R)) == null ? void 0 : z[1]) ?? R;
      }).find((R) => (this.model.pages ?? []).some((z) => z.id === R && z.type === "WIZARD"));
      if (!b) {
        this.emit("modux-notice", { message: "Suelta el paso sobre un wizard" });
        return;
      }
      const x = ((u = (this.model.pages ?? []).find((R) => R.id === b)) == null ? void 0 : u.wizardSteps) ?? [], A = new Set(x.map((R) => R.id ?? R.pageId));
      let L = x.length + 1;
      for (; A.has(`wzs-${L}`); ) L++;
      this.command({ kind: "add-page-wizard-step", pageId: b, itemId: `wzs-${L}`, label: `Paso ${L}` }), this.emit("modux-notice", { message: "Paso creado — arrastra su asa hasta la página que lo implementa" });
      return;
    }
    if (e === "page" || e === "ui-page-crud" || e === "ui-page-wizard") {
      const P = e === "ui-page-crud" ? "CRUD" : e === "ui-page-wizard" ? "WIZARD" : "PAGE", b = P === "CRUD" ? "CRUD" : P === "WIZARD" ? "Wizard" : "Página", { id: x, name: A } = this.uniquePaletteName(b, "page-"), L = [];
      for (let D = i ?? void 0; D; )
        L.push(D), D = (g = a.nodes.find((U) => U.id === D)) == null ? void 0 : g.parentId;
      const R = L.find((D) => (this.model.uiApps ?? []).some((U) => U.id === D)), z = L.map((D) => {
        var U;
        return ((U = /^wizrow:([^:]+):/.exec(D)) == null ? void 0 : U[1]) ?? D;
      }).find((D) => (this.model.pages ?? []).some((U) => U.id === D && U.type === "WIZARD"));
      if (z) {
        const D = a.nodes.find((re) => re.id === z);
        D && (t.x = D.x + D.w / 2 + 160, t.y = D.y - D.h / 2 + 40), this.command({ kind: "create-ui-page", id: x, name: A, pageType: P }, !1), this.command({ kind: "add-page-wizard-step", pageId: z, targetId: x }, !1);
        const U = d(x);
        this.pushUndoEntry([{ kind: "delete-ui-page", id: x }, U]), this.emit("modux-notice", { message: `${A} creada como paso del wizard` });
        return;
      }
      if (R) {
        const D = a.nodes.find((U) => U.id === R);
        D && (t.x = D.x + D.w / 2 + 160, t.y = D.y - D.h / 2 + 40);
      }
      c(
        R ? { kind: "create-ui-page", id: x, name: A, pageType: P, appId: R, menuLabel: A } : { kind: "create-ui-page", id: x, name: A, pageType: P },
        x
      );
      return;
    }
    if (e === "menu-item") {
      const P = [];
      for (let z = i ?? void 0; z; )
        P.push(z), z = (k = a.nodes.find((D) => D.id === z)) == null ? void 0 : k.parentId;
      const b = P.find((z) => (this.model.uiApps ?? []).some((D) => D.id === z));
      if (!b) {
        this.emit("modux-notice", { message: "Suelta la entrada de menú sobre una app" });
        return;
      }
      const x = /* @__PURE__ */ new Set(), A = (z) => {
        for (const D of z ?? [])
          x.add(D.label), A(D.children);
      };
      (this.model.uiApps ?? []).forEach((z) => A(z.menuItems));
      let L = "Entrada";
      for (let z = 2; x.has(L); z++) L = `Entrada ${z}`;
      const R = P.map((z) => fe(z)).find(Boolean);
      this.command({
        kind: "add-menu-item",
        appId: b,
        label: L,
        itemId: this.newMenuItemId(L),
        parentId: R == null ? void 0 : R.itemId,
        parentLabel: R != null && R.itemId || R == null ? void 0 : R.label
      });
      return;
    }
    if (e === "etl-transform") {
      const P = [];
      for (let L = i ?? void 0; L; )
        P.push(L), L = (C = a.nodes.find((R) => R.id === L)) == null ? void 0 : C.parentId;
      const b = P.map((L) => (this.model.etlFlows ?? []).find((R) => R.id === L)).find(Boolean);
      if (!b) {
        this.emit("modux-notice", { message: "Suelta la transformación sobre un flujo ETL" });
        return;
      }
      const x = new Set((b.steps ?? []).map((L) => L.id));
      let A = (b.steps ?? []).length + 1;
      for (; x.has(`ets-${A}`); ) A++;
      this.command({
        kind: "add-etl-step",
        etlFlowId: b.id,
        id: `ets-${A}`,
        name: `Transformación ${A}`,
        stepType: "TRANSFORM"
      }), this.emit("modux-notice", {
        message: "Transformación añadida — el mapping o el intent se detallan en su ficha"
      });
      return;
    }
    if (e === "workflow-step") {
      const P = this.model.workflows ?? [], b = [];
      for (let D = i ?? void 0; D; )
        b.push(D), D = (O = a.nodes.find((U) => U.id === D)) == null ? void 0 : O.parentId;
      const x = b.map((D) => P.find((U) => U.id === D)).find(Boolean), A = b.map((D) => {
        const U = P.find((re) => (re.steps ?? []).some((m) => m.id === D));
        return U ? { owner: U, stepId: D } : null;
      }).find(Boolean), L = x ?? (A == null ? void 0 : A.owner);
      if (!L) {
        this.emit("modux-notice", {
          message: "Suelta el paso sobre un workflow (o sobre uno de sus pasos para encadenarlo)"
        });
        return;
      }
      const { id: R, name: z } = this.uniquePaletteName("Paso", "wfs-");
      A && (t = { x: t.x + 190, y: t.y }), c(
        {
          kind: "add-workflow-step",
          workflowId: L.id,
          id: R,
          name: z,
          ...A ? { dependsOnStepIds: [A.stepId], afterStepId: A.stepId } : {}
        },
        R
      ), this._view !== "workflows" && this.emit("modux-notice", {
        message: `Paso añadido a ${L.name} — se ve en la vista Workflows`
      });
      return;
    }
    if (e === "api") {
      const P = this.dropContainerFor("api", i);
      if (!P) {
        this.emit("modux-notice", {
          message: "Una API vive en un sistema externo o en un contexto: suéltala sobre uno"
        });
        return;
      }
      const { id: b, name: x } = this.uniquePaletteName("API", "api-"), A = { kind: "add-api", id: b, name: x }, L = this.inverseOf(A) ?? [];
      this.command(A, !1), this.model.externalSystems.some((U) => U.id === P) ? this.command({ kind: "set-api-publisher", id: b, targetId: P }, !1) : this.command({ kind: "add-api-implementation", apiId: b, moduleId: P }, !1);
      const R = this.viewLayout(this._view), z = this.sceneFor(this._view).nodes.find((U) => U.id === P), D = z ? { x: Math.round(t.x - z.x), y: Math.round(t.y - z.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
      this.writeViewLayout(this._view, { ...R, nodes: { ...R.nodes, [b]: D } }), this.pushUndoEntry([...L, { kind: "move-node", view: this._view, id: b, pos: null }]);
      return;
    }
    const p = this.dropContainerFor(e, i);
    if (!p) {
      this.emit("modux-notice", {
        message: e === "api-operation" ? "Suelta la operación sobre una API" : e === "use-case-step" ? "Suelta el paso sobre un caso de uso" : ["external-use-case", "external-table", "mcp-server"].includes(e) ? "Suelta el elemento sobre un sistema externo" : "Suelta el elemento sobre un contexto"
      });
      return;
    }
    const I = {
      aggregate: "agg-",
      "use-case": "uc-",
      policy: "uc-",
      "domain-event": "ev-",
      "application-event": "aev-",
      "domain-service": "ds-",
      "query-service": "qs-",
      "scheduled-trigger": "st-",
      "etl-flow": "etl-",
      "read-model": "rm-",
      "external-use-case": "xuc-",
      "external-table": "tbl-",
      "mcp-server": "mcpsrv-"
    }, { id: f, name: y } = this.uniquePaletteName(n.label, I[e] ?? "");
    if (e === "aggregate")
      c({ kind: "add-aggregate", id: f, name: y, moduleId: p }, f, p);
    else if (e === "use-case" || e === "policy")
      c(
        { kind: "add-use-case", id: f, name: y, moduleId: p, ...e === "policy" ? { policy: !0 } : {} },
        f,
        p
      );
    else if (e === "domain-event")
      c({ kind: "add-domain-event", id: f, name: y, moduleId: p }, f, p);
    else if (e === "application-event")
      c({ kind: "add-application-event", id: f, name: y, moduleId: p }, f, p);
    else if (e === "domain-service")
      c({ kind: "add-domain-service", id: f, name: y, moduleId: p }, f, p);
    else if (e === "query-service")
      c({ kind: "add-query-service", id: f, name: y, moduleId: p }, f, p);
    else if (e === "scheduled-trigger")
      c({ kind: "add-scheduled-trigger", id: f, name: y, moduleId: p }, f, p), this.emit("modux-notice", {
        message: "Trigger creado (cron diario por defecto) — arrástralo a un caso de uso o policy para fijar qué dispara"
      });
    else if (e === "etl-flow")
      c({ kind: "add-etl-flow", id: f, name: y, moduleId: p }, f, p), this.emit("modux-notice", {
        message: "Integrador creado en el contexto — cablea fuentes HACIA él (tabla/API = pull, evento = consumidor) y escrituras DESDE él"
      });
    else if (e === "read-model") {
      const P = (this.model.aggregates ?? []).find((b) => b.id === p);
      c({ kind: "add-read-model", id: f, name: y, aggregateId: p }, f, (P == null ? void 0 : P.moduleId) ?? p);
    } else if (e === "api-operation") {
      const P = (this.model.apis ?? []).find((R) => R.id === p), b = new Set(((P == null ? void 0 : P.operations) ?? []).map((R) => R.id));
      let x = y, A = `apiop-${p.replace(/^api-/, "")}-${ne(x)}`;
      for (let R = 2; b.has(A); R++)
        x = `${n.label} ${R}`, A = `apiop-${p.replace(/^api-/, "")}-${ne(x)}`;
      c({ kind: "add-api-operation", apiId: p, id: A, name: x }, A, p), a.nodes.some(
        (R) => R.parentId === p && (R.kind === "api-operation" || R.kind === "api-op-occurrence")
      ) || this.emit("modux-notice", {
        message: `Operación añadida a ${(P == null ? void 0 : P.name) ?? p} — se ve en el nivel «APIs y operaciones»`
      });
    } else if (e === "use-case-step") {
      const P = this.model.modules.flatMap((L) => L.useCases ?? []).find((L) => L.id === p), b = new Set((P == null ? void 0 : P.stepIds) ?? []);
      let x = y, A = `step-${ne(x)}`;
      for (let L = 2; b.has(A); L++)
        x = `${n.label} ${L}`, A = `step-${ne(x)}`;
      c({ kind: "add-use-case-step", useCaseId: p, id: A, name: x }, A, p), this.emit("modux-notice", {
        message: `Paso Custom añadido a ${(P == null ? void 0 : P.name) ?? p} — detállalo en su ficha; una relación trazada desde el caso de uso crea el paso tipado`
      });
    } else e === "external-use-case" ? c({ kind: "add-external-use-case", id: f, name: y, moduleId: p }, f, p) : e === "external-table" ? c({ kind: "add-external-table", id: f, name: y, moduleId: p }, f, p) : e === "mcp-server" && c({ kind: "add-mcp-server", id: f, name: y, moduleId: p }, f, p);
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
        const u = (this.model.pages ?? []).find((k) => k.id === s[1]), g = ((u == null ? void 0 : u.buttons) ?? []).find((k) => k.useCaseId === s[2]);
        if (!g) return;
        if (((u == null ? void 0 : u.buttons) ?? []).some((k) => k.useCaseId === e)) {
          this.emit("modux-notice", { message: "La página ya tiene un botón para ese caso de uso" });
          return;
        }
        this.command({ kind: "remove-page-button", pageId: s[1], useCaseId: s[2] }, !1), this.command(
          { kind: "add-page-button", pageId: s[1], useCaseId: e, label: g.label, type: g.bar },
          !1
        ), g.mappingId && this.command(
          { kind: "set-page-button", pageId: s[1], useCaseId: e, label: null, mappingId: g.mappingId },
          !1
        ), this.pushUndoEntry([
          { kind: "remove-page-button", pageId: s[1], useCaseId: e },
          { kind: "add-page-button", pageId: s[1], useCaseId: s[2], label: g.label, type: g.bar },
          ...g.mappingId ? [{ kind: "set-page-button", pageId: s[1], useCaseId: s[2], label: null, mappingId: g.mappingId }] : []
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
    const I = (this.model.modelMappings ?? []).find((h) => h.id === e);
    if (I && (d == null ? void 0 : d.kind) === "button") {
      this.command({ kind: "set-page-component", pageId: a, componentId: d.id, mappingId: e }), this.emit("modux-notice", { message: `El botón mapea con ${I.name}` });
      return;
    }
    const f = this.model.modules.flatMap((h) => (h.queryServices ?? []).flatMap((r) => (r.operations ?? []).map((u) => ({ op: u, qs: r })))).find(({ op: h }) => h.id === e);
    if (f) {
      (d == null ? void 0 : d.kind) === "listing" ? this.command({
        kind: "set-page-component",
        pageId: a,
        componentId: d.id,
        queryOperationId: f.op.id,
        queryServiceId: f.qs.id
      }) : this.command({ kind: "set-page-listing", pageId: a, queryServiceId: f.qs.id }), this.emit("modux-notice", { message: `Listado alimentado por ${f.op.name}` });
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
    const p = this.viewLayout(a), I = c.parentId ? d.nodes.find((y) => y.id === c.parentId) : void 0, f = I ? { x: Math.round(t.x - I.x), y: Math.round(t.y - I.y) } : { x: Math.round(t.x), y: Math.round(t.y) };
    this.pushUndoEntry([{ kind: "move-node", view: a, id: e, pos: p.nodes[e] ?? null }]), this.writeViewLayout(a, { ...p, nodes: { ...p.nodes, [e]: f } });
  }
  renderPalette() {
    if (!this._paletteOpen || !["context-map", "workflows", "ui", "design"].includes(this._view)) return "";
    const e = this._paletteFilter.trim().toLowerCase(), t = W.PALETTE_NEW.filter(
      (s) => (this._view === "workflows" ? ["workflow", "workflow-step"].includes(s.type) : this._view === "ui" ? ["ui-app", "ui-app-orchestrator", "ui-app-masterdetail", "ui-app-vieweditor", "page", "ui-page-crud", "ui-page-wizard", "ui-wizard-step", "menu-item", "ui-model", "identity-provider"].includes(s.type) : this._view === "design" ? s.type === "page" || s.type.startsWith("cmp:") : !["ui-app", "page", "menu-item"].includes(s.type) && !s.type.startsWith("cmp:")) && (!e || s.label.toLowerCase().includes(e))
    ), i = this._view === "workflows" ? "new" : this._paletteTab;
    return $`
      <div class="palette ${!this._tilt && this._treeOpen && this._activeViewId ? "shifted" : ""}">
        <div class="palette-body">
          <input
            class="palette-filter"
            placeholder="Filtrar…"
            .value=${this._paletteFilter}
            @input=${(s) => this._paletteFilter = s.target.value}
          />
          ${i === "new" ? $`
                <div class="palette-h">Nuevos — arrastra al lienzo${""}</div>
                ${W.PALETTE_GROUPS.map((s) => {
      const n = t.filter((o) => o.group === s);
      return n.length ? $`
                        <div class="palette-g">${s}</div>
                        ${n.map(
        (o) => $`
                            <div
                              class="palette-item ${o.child ? "palette-child" : ""}"
                              draggable="true"
                              title=${o.type === "workflow-step" ? "Suéltalo sobre un workflow — o sobre uno de sus pasos para encadenarlo" : o.child ? "Suéltalo sobre su contenedor (contexto, sistema externo o API)" : "Suéltalo en el lienzo"}
                              @dragstart=${(a) => this.onPaletteDragStart(a, { new: o.type })}
                            >
                              <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${o.color}">
                                ${ut[o.symbol]}
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
      (s) => $`
                    <div class="palette-g">${s.label}</div>
                    ${s.items.map(
        (n) => $`
                        <div
                          class="palette-item"
                          draggable="true"
                          title="Suéltalo en el lienzo para colocarlo, o sobre un nodo para conectarlo"
                          @dragstart=${(o) => this.onPaletteDragStart(o, { existing: n.id })}
                        >
                          <svg class="pal-ico" viewBox="0 0 12 12" style="color: ${s.color}">
                            ${ut[s.symbol]}
                          </svg>
                          <span class="pal-label">${n.name}</span>
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
    var t, i, s, n, o, a, d;
    const e = this._newName.trim();
    if (e) {
      if (this._view === "aggregates") {
        const c = this._newModuleId || ((t = this.model.modules[0]) == null ? void 0 : t.id);
        if (!c) return;
        this.command({ kind: "add-aggregate", id: `agg-${ne(e)}`, name: e, moduleId: c });
      } else if (this._view === "flows") {
        const c = this._newTriggerAggId || ((s = (i = this.model.aggregates) == null ? void 0 : i[0]) == null ? void 0 : s.id), p = this._newTargetId || ((n = this.model.modules[0]) == null ? void 0 : n.id), I = this._newTriggerEvent.trim();
        if (!c || !p || !I) return;
        this.command({
          kind: "add-flow",
          id: `flow-${ne(e)}`,
          name: e,
          archetype: this._newArchetype,
          triggerAggregateId: c,
          triggerEvent: I,
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
    const t = this.viewLayout(e), i = this.filteredModel(), s = e === "aggregates" ? po(i, t.nodes) : e === "flows" ? wo(i, t.nodes) : e === "processes" ? cn(i, t.nodes) : e === "workflows" ? Pl(i, t.nodes) : e === "ui" ? Ll(i, t.nodes) : e === "design" ? { nodes: [], edges: [] } : e === "mappings" ? ql(i, t.nodes) : e === "eventstorming" ? _l(i, t.nodes) : no(
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
    }, a = await Fl(n, e === "flows" || e === "processes" || e === "workflows" || e === "eventstorming" ? "layered" : "force"), d = this.viewLayout(e);
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
    return $`
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
        <div class="spacer"></div>
        ${this.viewSelection().length ? $`
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
        ${this._view === "aggregates" || this._view === "processes" ? $`<select
              title=${this._view === "aggregates" ? "Módulo del nuevo agregado" : "Módulo dueño del proceso"}
              @change=${(t) => this._newModuleId = t.target.value}
            >
              ${this.model.modules.map(
      (t) => {
        var i;
        return $`<option
                    value=${t.id}
                    ?selected=${t.id === (this._newModuleId || ((i = this.model.modules[0]) == null ? void 0 : i.id))}
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
        var i, s;
        return $`<option
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
              ${this._view === "flows" ? $`<select
                    title="Destino del nuevo flow"
                    @change=${(t) => this._newTargetId = t.target.value}
                  >
                    ${[...this.model.modules, ...this.model.externalSystems].map(
      (t) => {
        var i;
        return $`<option
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
                ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
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
                      ${this.model.modules.flatMap((t) => t.useCases ?? []).map(
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
      ${this._view === "design" ? $`${this.renderPalette()}${this.renderFigma()}` : this._tilt ? $`
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
        ${this._view === "context-map" ? $`Arrastra para reordenar · Shift+arrastrar mueve una API de sistema · Ctrl+arrastrar una API a un sistema crea un proxy · asa azul → crear relación (elige el tipo) · doble click
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
      ${this.renderRelationPicker()} ${this.renderExtDepPicker()} ${this.renderDeletePicker()}
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
      ([t, i]) => $`
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
    return $`
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
    return $`
      <div class="picker-backdrop" @pointerdown=${() => this._extDepPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(n) => n.stopPropagation()}
      >
        <div class="picker-title">Tipo de dependencia</div>
        ${i.map(
      (n) => $`
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
    return $`
      <div class="picker-backdrop" @pointerdown=${() => this._relationPicker = null}></div>
      <div
        class="relation-picker"
        style="left:${e.x}px; top:${e.y}px"
        @pointerdown=${(s) => s.stopPropagation()}
      >
        <div class="picker-title">
          ${e.mode === "create" ? "Tipo de relación" : "Cambiar tipo"}
        </div>
        ${Jl.map(
      (s) => $`
            <button
              class="picker-item ${s === t ? "current" : ""}"
              title=${s}
              @click=${() => this.pickRelationType(s)}
            >
              <span class="abbr">${Gi[s].abbr}</span>
              <span class="name">${Gi[s].name}</span>
            </button>
          `
    )}
      </div>
    `;
  }
};
W.styles = yt`
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
W.PALETTE_GROUPS = [
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
W.PALETTE_NEW = [
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
Q([
  oe({ attribute: !1 })
], W.prototype, "model", 2);
Q([
  oe({ attribute: !1 })
], W.prototype, "layout", 2);
Q([
  oe({ attribute: !1 })
], W.prototype, "diff", 2);
Q([
  q()
], W.prototype, "_view", 2);
Q([
  q()
], W.prototype, "_detail", 2);
Q([
  q()
], W.prototype, "_relationType", 2);
Q([
  q()
], W.prototype, "_relationPicker", 2);
Q([
  q()
], W.prototype, "_extDepPicker", 2);
Q([
  q()
], W.prototype, "_selectedId", 2);
Q([
  q()
], W.prototype, "_paletteOpen", 2);
Q([
  q()
], W.prototype, "_paletteFilter", 2);
Q([
  q()
], W.prototype, "_paletteTab", 2);
Q([
  q()
], W.prototype, "_selectedCmp", 2);
Q([
  q()
], W.prototype, "_fullscreen", 2);
Q([
  q()
], W.prototype, "_tilt", 2);
Q([
  q()
], W.prototype, "_helpOpen", 2);
Q([
  q()
], W.prototype, "_newName", 2);
Q([
  q()
], W.prototype, "_newModuleId", 2);
Q([
  q()
], W.prototype, "_newArchetype", 2);
Q([
  q()
], W.prototype, "_newTriggerAggId", 2);
Q([
  q()
], W.prototype, "_newTriggerEvent", 2);
Q([
  q()
], W.prototype, "_newTargetId", 2);
Q([
  q()
], W.prototype, "_undoStack", 2);
Q([
  q()
], W.prototype, "_redoStack", 2);
Q([
  q()
], W.prototype, "_newStepName", 2);
Q([
  q()
], W.prototype, "_newStepType", 2);
Q([
  q()
], W.prototype, "_newStepRole", 2);
Q([
  q()
], W.prototype, "_newStepDeadline", 2);
Q([
  q()
], W.prototype, "_editStepRole", 2);
Q([
  q()
], W.prototype, "_editStepDeadline", 2);
Q([
  q()
], W.prototype, "_editStepComp", 2);
Q([
  q()
], W.prototype, "_newStepUseCase", 2);
Q([
  q()
], W.prototype, "_newStepEmits", 2);
Q([
  q()
], W.prototype, "_editStepUseCase", 2);
Q([
  q()
], W.prototype, "_editStepEmits", 2);
Q([
  q()
], W.prototype, "_editStepAwaits", 2);
Q([
  q()
], W.prototype, "_multi", 2);
Q([
  q()
], W.prototype, "_newViewName", 2);
Q([
  q()
], W.prototype, "_activeViewId", 2);
Q([
  q()
], W.prototype, "_newRagSourceType", 2);
Q([
  q()
], W.prototype, "_newRagSourceUri", 2);
Q([
  q()
], W.prototype, "_addMemberKey", 2);
Q([
  q()
], W.prototype, "_treeOpen", 2);
Q([
  q()
], W.prototype, "_deletePicker", 2);
W = Q([
  vt("modux-editor")
], W);
var nc = Object.defineProperty, sc = Object.getOwnPropertyDescriptor, Ee = (e, t, i, s) => {
  for (var n = s > 1 ? void 0 : s ? sc(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (n = (s ? a(t, i, n) : a(n)) || n);
  return s && n && nc(t, i, n), n;
};
let ge = class extends Ne {
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
    ], t = (s) => ge.TYPE_LABELS[s] ?? s;
    return $`
      <div class="diff-panel">
        <div class="diff-head">
          <span>Cambios de la solución respecto al sistema</span>
          <button title="Cerrar el listado" @click=${() => this._diffListOpen = !1}>✕</button>
        </div>
        ${e.map(({ kind: s, title: n, mark: o, cls: a }) => {
      const d = this._diff.changes.filter((c) => c.kind === s);
      return d.length ? $`
            <div class="diff-group">${n} (${d.length})</div>
            ${d.map(
        (c) => $`
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
            const I = await c.json();
            I != null && I.message && (p = I.message);
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
          let I = `El servidor rechazó el contrato (${a.status})`;
          try {
            const f = await a.json();
            f != null && f.message && (I = f.message);
          } catch {
          }
          this.showToast(I);
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
              <span class="badge ${this._workspace.system ? "" : "solution"}">
                ${this._workspace.system ? "AS-IS" : "TO-BE"}
              </span>
              ${this._diff && !this._workspace.system ? (() => {
      const i = (s) => this._diff.changes.filter((n) => n.kind === s).length;
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
      var s;
      const i = (s = this._workspace.solutions.find(
        (n) => n.branch === this._workspace.current
      )) == null ? void 0 : s.status;
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
ge.styles = yt`
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
ge.TYPE_LABELS = {
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
Ee([
  oe()
], ge.prototype, "base", 2);
Ee([
  q()
], ge.prototype, "_model", 2);
Ee([
  q()
], ge.prototype, "_layout", 2);
Ee([
  q()
], ge.prototype, "_error", 2);
Ee([
  q()
], ge.prototype, "_saving", 2);
Ee([
  q()
], ge.prototype, "_toast", 2);
Ee([
  q()
], ge.prototype, "_workspace", 2);
Ee([
  q()
], ge.prototype, "_creatingSolution", 2);
Ee([
  q()
], ge.prototype, "_newSolutionName", 2);
Ee([
  q()
], ge.prototype, "_diff", 2);
Ee([
  q()
], ge.prototype, "_diffListOpen", 2);
Ee([
  q()
], ge.prototype, "_mergeFlow", 2);
ge = Ee([
  vt("modux-editor-connected")
], ge);
export {
  oc as CONTAINER_HEADER,
  ac as CONTAINER_INSET,
  pe as ModuxCanvas,
  W as ModuxEditor,
  ge as ModuxEditorConnected,
  po as aggregatesScene,
  et as apiImplNodeId,
  Je as apiOpOccurrenceId,
  Ri as containerFit,
  js as containerMinSize,
  no as contextMapScene,
  eo as flowCoherence,
  wo as flowsScene,
  Xt as normalizeViewLayout,
  cn as processesScene,
  Js as relationEdgeId,
  ji as resolveOverlaps
};
