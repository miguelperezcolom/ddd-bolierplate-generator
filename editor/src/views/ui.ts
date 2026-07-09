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
    nodes.push({
      id: app.id,
      label: app.title || app.name,
      x: pos.x,
      y: pos.y,
      w: APP_W,
      h,
      kind: 'ui-app',
      symbol: 'component',
      fill: '#f0f9ff',
      stroke: '#0ea5e9',
      container: true,
      tooltip: `App: ${app.name}`,
    });
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
        kind: 'menu-item',
        symbol: 'process',
        fill: '#ffffff',
        stroke: '#7dd3fc',
        parentId: app.id,
        tooltip: entry.pageId
          ? `Abre ${entry.pageId}`
          : entry.uiAdapterId
            ? `Abre la app ${entry.uiAdapterId}`
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
  const chipMeta = new Map<string, { label: string; kind: string; symbol: string; stroke: string }>();
  let pageY = 160;
  for (const page of pages) {
    const pos = layout[page.id] ?? { x: 640, y: pageY };
    pageY = pos.y + PAGE_H + 90;
    nodes.push({
      id: page.id,
      label: page.name,
      x: pos.x,
      y: pos.y,
      w: PAGE_W,
      h: PAGE_H,
      kind: 'page',
      symbol: 'interface',
      badge: page.type ?? 'FORM',
      fill: '#ffffff',
      stroke: '#0284c7',
      tooltip: page.route ? `${page.type ?? 'FORM'} · ${page.route}` : (page.type ?? 'FORM'),
    });
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
