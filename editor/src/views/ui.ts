import type { ModuxModel, UiAppRef, UiMenuEntryRef } from '../model.js';
import type { Scene, SceneNode, SceneEdge, DiagramLayout } from '../scene.js';
import { CONTAINER_HEADER, CONTAINER_INSET } from '../scene.js';

/**
 * UI view: the model of the user interface, Mateu-shaped. Apps (UiAdapter) are
 * containers holding their menu TREE; pages float free, wired from the menu
 * entries that open them; and every page shows its MVVM wiring: the viewmodel
 * (a Model playing that role), the use cases its buttons invoke and the query
 * service feeding its listing. Actors point at the apps they use.
 */

const APP_W = 250;
const ENTRY_H = 30;
const ENTRY_GAP = 6;
const INDENT = 16;
const PAGE_W = 190;
const PAGE_H = 60;
const CHIP_W = 170;
const CHIP_H = 44;

/** Unambiguous node id: entries with a stable id use it; pre-id entries use their label path. */
export function menuNodeId(appId: string, entry: UiMenuEntryRef, path: string[]): string {
  return entry.id ? `menu:${appId}:id:${entry.id}` : `menu:${appId}:p:${path.join('>')}`;
}

/** The inverse: what a menu node id addresses (itemId when id-based, label when path-based). */
export function parseMenuNodeId(
  id: string,
): { appId: string; itemId?: string; label?: string } | null {
  const m = /^menu:([^:]+):(id|p):(.+)$/.exec(id);
  if (!m) return null;
  return m[2] === 'id'
    ? { appId: m[1], itemId: m[3] }
    : { appId: m[1], label: m[3].split('>').pop() };
}

/** Depth-first flatten of an app's menu tree, with the label path to each entry. */
function flattenMenu(app: UiAppRef): { entry: UiMenuEntryRef; path: string[]; depth: number }[] {
  const out: { entry: UiMenuEntryRef; path: string[]; depth: number }[] = [];
  const walk = (items: UiMenuEntryRef[], prefix: string[], depth: number) => {
    for (const entry of items ?? []) {
      const path = [...prefix, entry.label];
      out.push({ entry, path, depth });
      walk(entry.children ?? [], path, depth + 1);
    }
  };
  walk(app.menuItems ?? [], [], 0);
  return out;
}

export function uiScene(model: ModuxModel, layout: DiagramLayout): Scene {
  const nodes: SceneNode[] = [];
  const edges: SceneEdge[] = [];
  const apps = model.uiApps ?? [];
  const pages = model.pages ?? [];

  const useCaseName = (id: string) =>
    model.modules.flatMap((m) => m.useCases ?? []).find((u) => u.id === id)?.name ?? id;
  const queryName = (id: string) =>
    model.modules.flatMap((m) => m.queryServices ?? []).find((q) => q.id === id)?.name ?? id;

  const chipMeta = new Map<string, { label: string; kind: string; symbol: string; stroke: string }>();

  // ---- apps: containers with their menu tree stacked inside ---------------
  let appY = 160;
  for (const app of apps) {
    const entries = flattenMenu(app);
    const h = Math.max(
      90,
      CONTAINER_HEADER + CONTAINER_INSET * 2 + entries.length * (ENTRY_H + ENTRY_GAP),
    );
    const pos = layout[app.id] ?? { x: 190, y: appY + h / 2 };
    appY = pos.y + h / 2 + 70;
    const appType = app.type ?? 'APP';
    nodes.push({
      id: app.id,
      label: app.title || app.name,
      x: pos.x,
      y: pos.y,
      w: APP_W,
      h,
      kind: 'ui-app',
      symbol: appType === 'ORCHESTRATOR' || appType === 'VIEW_EDITOR' ? 'process' : 'component',
      fill: appType === 'ORCHESTRATOR' || appType === 'VIEW_EDITOR' ? '#fdf4ff' : '#f0f9ff',
      stroke: appType === 'ORCHESTRATOR' || appType === 'VIEW_EDITOR' ? '#c026d3' : '#0ea5e9',
      container: true,
      badge:
        appType === 'ORCHESTRATOR'
          ? 'ORQUESTADOR'
          : appType === 'MASTER_DETAIL'
            ? 'MAESTRO·DETALLE'
            : appType === 'VIEW_EDITOR'
              ? 'VISTA·EDITOR'
              : 'APP',
      // only a plain APP has a home; MD is header+tabs, the orchestrator only child pages
      extraHandles:
        appType === 'MASTER_DETAIL'
          ? [{ kind: 'header', title: 'Cabecera: arrastra hasta la página que hace de cabecera', color: '#0ea5e9' }]
          : appType === 'VIEW_EDITOR'
            ? [
                { kind: 'view', title: 'Vista: arrastra hasta la página de detalle (solo lectura)', color: '#0891b2' },
                { kind: 'edit', title: 'Edición: arrastra hasta la página de edición', color: '#e11d48' },
              ]
            : appType === 'ORCHESTRATOR'
              ? undefined
              : [{ kind: 'home', title: 'Home: arrastra hasta la página (o la app) con la que abre', color: '#16a34a' }],
      tooltip:
        appType === 'ORCHESTRATOR'
          ? `${app.name} — orquesta y mantiene estado; solo enseña páginas hijas`
          : appType === 'MASTER_DETAIL'
            ? `${app.name} — cabecera + pestañas (ambas son páginas)`
            : `App: ${app.name}`,
    });
    if (app.modelId) {
      chipMeta.set(app.modelId, {
        label: (model.models ?? []).find((mo) => mo.id === app.modelId)?.name ?? app.modelId,
        kind: 'model',
        symbol: 'readmodel',
        stroke: '#8b5cf6',
      });
      edges.push({
        id: `appmodel:${app.id}->${app.modelId}`,
        sourceId: app.id,
        targetId: app.modelId,
        kind: 'app-model',
        label: 'estado',
        color: '#8b5cf6',
        dashed: true,
        arrow: true,
        tooltip: 'el viewmodel de la app: el estado que mantiene y comparte con sus páginas',
      });
    }
    for (const [pid, kindName, label, color, tip] of [
      [app.viewPageId, 'app-view', 'vista', '#0891b2', 'el detalle solo lectura'],
      [app.editPageId, 'app-edit', 'edición', '#e11d48', 'la vista de edición'],
    ] as const) {
      if (!pid) continue;
      edges.push({
        id: `${kindName === 'app-view' ? 'appview' : 'appedit'}:${app.id}->${pid}`,
        sourceId: app.id,
        targetId: pid,
        kind: kindName,
        color,
        label,
        arrow: true,
        tooltip: tip,
      });
    }
    const home = app.homePageId ?? app.homeAppId;
    if (home) {
      edges.push({
        id: `apphome:${app.id}->${home}`,
        sourceId: app.id,
        targetId: home,
        kind: 'app-home',
        color: '#16a34a',
        label: 'home',
        arrow: true,
        tooltip: app.homeAppId ? 'la app con la que abre' : 'la página con la que abre la app',
      });
    }
    if (appType === 'MASTER_DETAIL' && app.headerPageId) {
      edges.push({
        id: `appheader:${app.id}->${app.headerPageId}`,
        sourceId: app.id,
        targetId: app.headerPageId,
        kind: 'app-header',
        color: '#0ea5e9',
        label: 'cabecera',
        arrow: true,
        tooltip: 'la página que hace de cabecera; las demás son pestañas',
      });
    }
    let entryY = pos.y - h / 2 + CONTAINER_HEADER + CONTAINER_INSET + ENTRY_H / 2;
    for (const { entry, path, depth } of entries) {
      const id = menuNodeId(app.id, entry, path);
      const indent = depth * INDENT;
      nodes.push({
        id,
        label: entry.label,
        x: pos.x + indent / 2,
        y: entryY,
        w: APP_W - CONTAINER_INSET * 2 - indent,
        h: ENTRY_H,
        // a parent entry is a pure grouper: it offers no handles and takes no target
        kind: entry.children?.length ? 'menu-group' : 'menu-item',
        symbol: 'process',
        fill: entry.children?.length ? '#f0f9ff' : '#ffffff',
        stroke: '#7dd3fc',
        parentId: app.id,
        tooltip: entry.children?.length
          ? 'Agrupador (con submenú): no puede abrir nada'
          : entry.pageId
            ? `Abre ${entry.pageId}`
            : entry.uiAdapterId
              ? `Abre la app ${entry.uiAdapterId}`
              : entry.useCaseId
                ? `Lanza ${entry.useCaseId}`
                : entry.aggregateId
                  ? `CRUD inferido sobre ${entry.aggregateId}`
                  : entry.queryOperationId
                    ? `Listado con filtros de ${entry.queryOperationId}`
                    : 'Entrada de menú sin destino',
      });
      entryY += ENTRY_H + ENTRY_GAP;
      if (entry.uiAdapterId && apps.some((a) => a.id === entry.uiAdapterId)) {
        edges.push({
          id: `menuapp:${id}->${entry.uiAdapterId}`,
          sourceId: id,
          targetId: entry.uiAdapterId,
          kind: 'menu-app',
          color: '#64748b',
          arrow: true,
        });
      }
      if (entry.useCaseId) {
        const known = model.modules.some((mod) => (mod.useCases ?? []).some((u) => u.id === entry.useCaseId));
        if (known) {
          chipMeta.set(entry.useCaseId, {
            label: useCaseName(entry.useCaseId),
            kind: 'use-case',
            symbol: 'usecase',
            stroke: '#06b6d4',
          });
          edges.push({
            id: `menuuc:${id}->${entry.useCaseId}`,
            sourceId: id,
            targetId: entry.useCaseId,
            kind: 'menu-use-case',
            color: '#06b6d4',
            dashed: true,
            arrow: true,
          });
        }
      }
      if (entry.aggregateId && (model.aggregates ?? []).some((a) => a.id === entry.aggregateId)) {
        const agg = (model.aggregates ?? []).find((a) => a.id === entry.aggregateId)!;
        chipMeta.set(agg.id, { label: agg.name, kind: 'aggregate', symbol: 'aggregate', stroke: '#8b5cf6' });
        edges.push({
          id: `menuagg:${id}->${agg.id}`,
          sourceId: id,
          targetId: agg.id,
          kind: 'menu-aggregate',
          label: 'CRUD',
          color: '#8b5cf6',
          dashed: true,
          arrow: true,
        });
      }
      if (entry.queryOperationId) {
        const qs = model.modules
          .flatMap((mod) => mod.queryServices ?? [])
          .find((x) => x.id === entry.queryServiceId);
        const op = (qs?.operations ?? []).find((o) => o.id === entry.queryOperationId);
        if (qs && op) {
          chipMeta.set(op.id, {
            label: `${op.name} (${qs.name})`,
            kind: 'query-operation',
            symbol: 'lens',
            stroke: '#0284c7',
          });
          edges.push({
            id: `menuqop:${id}->${op.id}`,
            sourceId: id,
            targetId: op.id,
            kind: 'menu-query-operation',
            label: 'listado',
            color: '#0284c7',
            dashed: true,
            arrow: true,
          });
        }
      }
      if (entry.pageId && pages.some((p) => p.id === entry.pageId)) {
        edges.push({
          id: `menupage:${id}->${entry.pageId}`,
          sourceId: id,
          targetId: entry.pageId,
          kind: 'menu-page',
          color: '#64748b',
          arrow: true,
        });
      }
    }
  }

  // ---- pages, each with its MVVM satellites -------------------------------
  let pageY = 160;
  const pageNameOf = (pid: string) => pages.find((x) => x.id === pid)?.name ?? pid;
  for (const page of pages) {
    const pos = layout[page.id] ?? { x: 640, y: pageY };
    const wizSteps = page.type === 'WIZARD' ? (page.wizardSteps ?? []) : [];
    // a wizard with steps is a CONTAINER: its steps stack inside as ordered rows
    const h = wizSteps.length
      ? CONTAINER_HEADER + CONTAINER_INSET * 2 + wizSteps.length * (ENTRY_H + ENTRY_GAP)
      : PAGE_H;
    pageY = pos.y + h + 90;
    nodes.push({
      id: page.id,
      label: page.name,
      x: pos.x,
      y: pos.y,
      w: PAGE_W,
      h,
      kind: 'page',
      symbol: 'interface',
      badge: page.type ?? 'PAGE',
      container: wizSteps.length > 0,
      extraHandles:
        page.type === 'CRUD'
            ? [
                { kind: 'crud-detail', title: 'Detalle: arrastra hasta la página o app que abre una fila', color: '#ea580c' },
                { kind: 'crud-create', title: 'Alta: arrastra hasta la página o app del nuevo registro', color: '#0d9488' },
              ]
            : undefined,
      fill: '#ffffff',
      stroke: '#0284c7',
      tooltip: page.route ? `${page.type ?? 'PAGE'} · ${page.route}` : (page.type ?? 'PAGE'),
    });
    let stepY = pos.y - h / 2 + CONTAINER_HEADER + CONTAINER_INSET + ENTRY_H / 2;
    wizSteps.forEach((step, i) => {
      const key = step.id ?? step.pageId ?? String(i);
      nodes.push({
        id: `wizrow:${page.id}:${key}`,
        label: `${i + 1}. ${step.label ?? (step.pageId ? pageNameOf(step.pageId) : 'Paso')}${step.pageId ? '' : ' ⌁'}`,
        x: pos.x,
        y: stepY,
        w: PAGE_W - CONTAINER_INSET * 2,
        h: ENTRY_H,
        kind: 'wizard-step-row',
        symbol: 'flow',
        fill: step.pageId ? '#faf5ff' : '#ffffff',
        stroke: '#c4b5fd',
        parentId: page.id,
        tooltip: step.pageId
          ? `Paso ${i + 1}: ${pageNameOf(step.pageId)} — arrastra el asa hasta otra página para re-mapearlo`
          : `Paso ${i + 1}, sin página — arrastra el asa hasta la página que lo implementa`,
      });
      stepY += ENTRY_H + ENTRY_GAP;
    });
    for (const [target, kindName, label, color] of [
      [page.crudDetailPageId ?? page.crudDetailAppId, 'crud-detail', 'detalle', '#ea580c'],
      [page.crudCreatePageId ?? page.crudCreateAppId, 'crud-create', 'nuevo', '#0d9488'],
    ] as const) {
      if (!target) continue;
      edges.push({
        id: `${kindName === 'crud-detail' ? 'cruddetail' : 'crudnew'}:${page.id}->${target}`,
        sourceId: page.id,
        targetId: target,
        kind: kindName,
        color,
        label,
        dashed: true,
        arrow: true,
        tooltip: kindName === 'crud-detail' ? 'lo que abre una fila del CRUD' : 'el formulario de nuevo registro',
      });
    }
    for (let i = 0; i < (page.wizardSteps ?? []).length; i++) {
      const step = (page.wizardSteps ?? [])[i];
      if (!step.pageId) continue;
      edges.push({
        id: `wizstep:${page.id}->${step.pageId}`,
        sourceId: page.id,
        targetId: step.pageId,
        kind: 'wizard-step',
        color: '#7c3aed',
        label: `paso ${i + 1}`,
        dashed: true,
        arrow: true,
        tooltip: step.label ? `paso ${i + 1}: ${step.label}` : `paso ${i + 1}`,
      });
    }
    if (page.modelId) {
      chipMeta.set(page.modelId, {
        label: page.modelName ?? page.modelId,
        kind: 'model',
        symbol: 'readmodel',
        stroke: '#8b5cf6',
      });
      edges.push({
        id: `pgmodel:${page.id}->${page.modelId}`,
        sourceId: page.id,
        targetId: page.modelId,
        kind: 'page-model',
        label: 'viewmodel',
        color: '#8b5cf6',
        dashed: true,
        arrow: true,
      });
    }
    for (const button of page.buttons ?? []) {
      if (!button.useCaseId) continue;
      chipMeta.set(button.useCaseId, {
        label: useCaseName(button.useCaseId),
        kind: 'use-case',
        symbol: 'usecase',
        stroke: '#06b6d4',
      });
      edges.push({
        id: `pgbtn:${page.id}->${button.useCaseId}`,
        sourceId: page.id,
        targetId: button.useCaseId,
        kind: 'page-button',
        label: button.label,
        color: '#06b6d4',
        dashed: true,
        arrow: true,
        tooltip: button.mappingId
          ? `Botón «${button.label}» — mapping ${button.mappingId}`
          : `Botón «${button.label}» — el viewmodel viaja tal cual (sin mapping)`,
      });
    }
    if (page.listingQueryServiceId) {
      chipMeta.set(page.listingQueryServiceId, {
        label: queryName(page.listingQueryServiceId),
        kind: 'query-service',
        symbol: 'lens',
        stroke: '#0284c7',
      });
      edges.push({
        id: `pglist:${page.id}->${page.listingQueryServiceId}`,
        sourceId: page.id,
        targetId: page.listingQueryServiceId,
        kind: 'page-listing',
        label: 'listado',
        color: '#0284c7',
        dashed: true,
        arrow: true,
      });
    }
  }

  // referenced system pieces, drawn once as satellite chips
  let chipY = 160;
  for (const mo of model.models ?? []) {
    if (!chipMeta.has(mo.id)) {
      chipMeta.set(mo.id, { label: mo.name, kind: 'model', symbol: 'readmodel', stroke: '#8b5cf6' });
    }
  }
  for (const [id, meta] of chipMeta) {
    const pos = layout[id] ?? { x: 1050, y: chipY };
    chipY = pos.y + CHIP_H + 46;
    nodes.push({
      id,
      label: meta.label,
      x: pos.x,
      y: pos.y,
      w: CHIP_W,
      h: CHIP_H,
      kind: meta.kind,
      symbol: meta.symbol,
      fill: '#ffffff',
      stroke: meta.stroke,
    });
  }

  // ---- actors → apps -------------------------------------------------------
  const uses = (model.actorAppUses ?? []).filter(
    (u) => apps.some((a) => a.id === u.appId) && (model.actors ?? []).some((a) => a.id === u.actorId),
  );
  const usedActorIds = [...new Set(uses.map((u) => u.actorId))];
  let actorY = 160;
  for (const actorId of usedActorIds) {
    const actor = (model.actors ?? []).find((a) => a.id === actorId)!;
    const pos = layout[actorId] ?? { x: -60, y: actorY };
    actorY = pos.y + CHIP_H + 46;
    nodes.push({
      id: actorId,
      label: actor.name,
      x: pos.x,
      y: pos.y,
      w: 150,
      h: CHIP_H,
      kind: 'actor',
      symbol: 'person',
      fill: '#ffffff',
      stroke: '#64748b',
    });
  }
  for (const use of uses) {
    edges.push({
      id: `actorapp:${use.actorId}->${use.appId}`,
      sourceId: use.actorId,
      targetId: use.appId,
      kind: 'actor-app',
      color: '#6366f1',
      arrow: true,
    });
  }

  return { nodes, edges };
}
