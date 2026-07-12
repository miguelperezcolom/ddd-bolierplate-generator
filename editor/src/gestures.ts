import type { ModuxModel, UiMenuEntryRef } from './model.js';
import type { ModuxCommand } from './commands.js';
import type { Scene } from './scene.js';
import type { ViewId } from './modux-editor.js';
import { parseMenuNodeId } from './views/ui.js';
import { parseFieldNodeId } from './views/mappings.js';
import { slug } from './ids.js';

/**
 * The whole gesture vocabulary — what a drawn line MEANS and what Supr
 * deletes, per view — extracted from the component: pure functions of
 * (host, view, gesture). The host is the thin surface the editor exposes.
 */
export interface GestureHost {
  readonly model: ModuxModel;
  /** The context-map detail level (the gestures of `distribution` differ). */
  readonly detail: string;
  command(c: ModuxCommand, pushUndo?: boolean): void;
  emit(name: string, detail?: unknown): void;
  sceneFor(view: ViewId): Scene;
  owningProcessOf(stepId: string): ModuxModel['processes'] extends (infer T)[] | undefined ? T | undefined : never;
  owningUseCaseOf(stepId: string): ReturnType<GestureHost['model']['modules'][number]['useCases'] extends (infer U)[] | undefined ? () => U | undefined : never>;
  owningWorkflowOf(stepId: string): ModuxModel['workflows'] extends (infer W)[] | undefined ? W | undefined : never;
  owningApiOf(operationId: string): ModuxModel['apis'] extends (infer A)[] | undefined ? A | undefined : never;
  menuEntryIn(appId: string, itemId: string): {
    entry: UiMenuEntryRef;
    parentId: string | null;
    beforeId: string | null;
  } | null;
  newMenuItemId(label: string): string;
  openExtDepPicker(p: { sourceId: string; targetId: string; x: number; y: number }): void;
  /** Screen rect of a canvas node (menu drops slot by vertical position). */
  nodeClientRect(nodeId: string): DOMRect | null | undefined;
  clearSelection(): void;
}

export function applyConnectionGesture(
  host: GestureHost,
  view: ViewId,
  sourceId: string,
  targetId: string,
  x?: number,
  y?: number,
  connectKind?: string,
): void {
    // Distribution level: a line means packaging (elemento → módulo) or deployment
    // (servicio → módulo). Anything else falls through to the usual meanings.
    if (view === 'context-map' && host.detail === 'distribution') {
      const scene = host.sceneFor('context-map');
      const codeModules = host.model.codeModules ?? [];
      const boxOf = (id: string): string | null => {
        for (let cur: string | undefined = id; cur; ) {
          if (codeModules.some((cm) => cm.id === cur)) return cur;
          cur = scene.nodes.find((n) => n.id === cur)?.parentId;
        }
        return null;
      };
      const targetBox = boxOf(targetId);
      if (targetBox && targetBox !== sourceId) {
        if ((host.model.services ?? []).some((s) => s.id === sourceId)) {
          host.command({ kind: 'add-service-code-module', serviceId: sourceId, id: targetBox });
          return;
        }
        const isElement =
          !codeModules.some((cm) => cm.id === sourceId) &&
          !host.model.modules.some((mo) => mo.id === sourceId);
        if (isElement) {
          // the backend moves it: an element lives in ONE module of its context
          host.command({ kind: 'add-code-module-element', id: targetBox, elementId: sourceId });
          return;
        }
      }
    }
    // Integraciones: las líneas significan lo mismo que en el mapa de contextos
    // (fuentes, escrituras, eventos) — se aplican bajo sus reglas.
    if (view === 'integrations') {
      applyConnectionGesture(host, 'context-map', sourceId, targetId, x, y, connectKind);
      return;
    }
    // EventStorming: a step dropped on a CODE sticky delegates in that hand-written code.
    if (view === 'eventstorming') {
      const isCC = (id: string) => (host.model.customCodes ?? []).some((cc) => cc.id === id);
      const pair = isCC(targetId)
        ? { stepId: sourceId, ccId: targetId }
        : isCC(sourceId)
          ? { stepId: targetId, ccId: sourceId }
          : null;
      if (pair) {
        const owner = host.owningUseCaseOf(pair.stepId);
        if (owner) {
          host.command({
            kind: 'set-use-case-step-custom-code',
            useCaseId: owner.id,
            id: pair.stepId,
            targetId: pair.ccId,
          });
        }
        return;
      }
      return;
    }
    // In the workflows view, dragging step A → step B declares "B depends on A".
    if (view === 'workflows') {
      // paso ⇆ página: el formulario de la tarea humana (cualquier dirección)
      const isPage = (id: string) => (host.model.pages ?? []).some((p) => p.id === id);
      if (isPage(sourceId) !== isPage(targetId)) {
        const pageId = isPage(sourceId) ? sourceId : targetId;
        const stepId = isPage(sourceId) ? targetId : sourceId;
        const owner = host.owningWorkflowOf(stepId);
        if (owner) {
          host.command({ kind: 'set-workflow-step-form', workflowId: owner.id, id: stepId, targetId: pageId });
          return;
        }
      }
      const gateways = host.model.workflowGateways ?? [];
      const isGateway = (id: string) => gateways.some((g) => g.id === id);
      // gateways y saltos a otro workflow: un solo comando, el backend valida la gramática
      if (isGateway(sourceId) || isGateway(targetId)
          || (host.model.workflows ?? []).some((w) => w.id === targetId)) {
        if (sourceId === targetId) return;
        host.command({ kind: 'add-workflow-link', sourceId, targetId });
        return;
      }
      const sourceOwner = host.owningWorkflowOf(sourceId);
      const targetOwner = host.owningWorkflowOf(targetId);
      if (!sourceOwner || sourceOwner !== targetOwner || sourceId === targetId) return;
      const target = sourceOwner.steps.find((s) => s.id === targetId);
      if ((target?.dependsOnStepIds ?? []).includes(sourceId)) return;
      host.command({
        kind: 'add-workflow-dependency',
        workflowId: sourceOwner.id,
        id: targetId,
        dependsOnStepId: sourceId,
      });
      return;
    }
    if (view === 'ui') {
      const pages = host.model.pages ?? [];
      const apps = host.model.uiApps ?? [];
      const isApp = (id: string) => apps.some((a) => a.id === id);
      const isPage = (id: string) => pages.some((x) => x.id === id);
      const isCC = (id: string) => (host.model.customCodes ?? []).some((cc) => cc.id === id);
      // custom code: página ↔ CODE la hace custom; CODE → cualquier otro elemento = «lo usa»
      if (isCC(sourceId) || isCC(targetId)) {
        const ccId = isCC(sourceId) ? sourceId : targetId;
        const other = isCC(sourceId) ? targetId : sourceId;
        if (isCC(other)) return;
        if (isPage(other)) {
          host.command({ kind: 'set-page-custom-code', id: other, targetId: ccId });
          return;
        }
        host.command({ kind: 'add-custom-code-use', id: ccId, elementId: other });
        return;
      }
      const groups = host.model.buttonGroups ?? [];
      const isGroup = (id: string) => groups.some((g) => g.id === id);
      // grupo → página con asa tipada: engancha a la barra elegida
      if ((connectKind === 'toolbar' || connectKind === 'bottom') && isGroup(sourceId) && isPage(targetId)) {
        host.command({ kind: 'add-page-bar-group', pageId: targetId, id: sourceId, bar: connectKind });
        return;
      }
      // grupo → grupo: se anida como subgrupo
      if (isGroup(sourceId) && isGroup(targetId) && sourceId !== targetId) {
        host.command({ kind: 'add-group-subgroup', id: targetId, targetId: sourceId });
        return;
      }
      // botón del grupo → caso de uso o policy: eso es lo que dispara
      const gbtn = /^gbtn:([^:]+):(.+)$/.exec(sourceId);
      if (gbtn) {
        const isUseCase = host.model.modules.some((mo) => (mo.useCases ?? []).some((u) => u.id === targetId));
        if (isUseCase) {
          host.command({ kind: 'set-group-button-target', id: gbtn[1], itemId: gbtn[2], useCaseId: targetId });
        } else {
          host.emit('modux-notice', { message: 'El botón se cablea a un caso de uso o una policy' });
        }
        return;
      }
      // typed handles first: they say exactly WHAT the line means
      if (connectKind === 'home' && isApp(sourceId) && (isPage(targetId) || isApp(targetId))) {
        if (targetId === sourceId) return;
        host.command(
          isPage(targetId)
            ? { kind: 'set-app-home-page', appId: sourceId, pageId: targetId }
            : { kind: 'set-app-home-page', appId: sourceId, pageId: null, toAppId: targetId },
        );
        return;
      }
      if (connectKind === 'header' && isApp(sourceId) && isPage(targetId)) {
        host.command({ kind: 'set-app-header-page', appId: sourceId, pageId: targetId });
        return;
      }
      if (
        (connectKind === 'crud-detail' || connectKind === 'crud-create') &&
        isPage(sourceId) &&
        (isPage(targetId) || isApp(targetId)) &&
        targetId !== sourceId
      ) {
        const kind = connectKind === 'crud-detail' ? 'set-crud-detail' : 'set-crud-create';
        host.command(
          isPage(targetId)
            ? { kind, pageId: sourceId, targetId, toAppId: null }
            : { kind, pageId: sourceId, targetId: null, toAppId: targetId },
        );
        return;
      }
      if (connectKind === 'viewmodel' && isPage(sourceId)) {
        if ((host.model.models ?? []).some((mo) => mo.id === targetId)) {
          host.command({ kind: 'set-page-model', pageId: sourceId, modelId: targetId });
        } else {
          host.emit('modux-notice', { message: 'El viewmodel se traza hasta un MODELO de datos' });
        }
        return;
      }
      if ((connectKind === 'view' || connectKind === 'edit') && isApp(sourceId) && isPage(targetId)) {
        host.command({
          kind: connectKind === 'view' ? 'set-app-view-page' : 'set-app-edit-page',
          appId: sourceId,
          pageId: targetId,
        });
        return;
      }

      if (connectKind) return; // a typed line means nothing else
      // a step row wired to a page MAPS the step onto it (either direction)
      const rowRef = (id: string) => /^wizrow:([^:]+):(.+)$/.exec(id);
      const rowSide = rowRef(sourceId) ?? rowRef(targetId);
      if (rowSide) {
        const other = rowRef(sourceId) ? targetId : sourceId;
        if (isPage(other) && other !== rowSide[1]) {
          host.command({ kind: 'set-wizard-step-page', pageId: rowSide[1], itemId: rowSide[2], targetId: other });
        }
        return;
      }
      // a page dropped on the WIZARD body joins it as a new (mapped) step
      const wizTarget = pages.find((pg) => pg.id === targetId && pg.type === 'WIZARD');
      if (isPage(sourceId) && wizTarget && sourceId !== wizTarget.id) {
        if (!(wizTarget.wizardSteps ?? []).some((s) => s.pageId === sourceId)) {
          host.command({ kind: 'add-page-wizard-step', pageId: wizTarget.id, targetId: sourceId });
        }
        return;
      }
      // a page dropped on an app (drag or catalog): a menu entry that opens it —
      // except on a headerless MASTER-DETAIL, where the first page IS the header
      if (isPage(sourceId) && isApp(targetId)) {
        const page = pages.find((x) => x.id === sourceId)!;
        const app = apps.find((a) => a.id === targetId)!;
        if (app.type === 'MASTER_DETAIL' && !app.headerPageId) {
          host.command({ kind: 'set-app-header-page', appId: targetId, pageId: sourceId });
          host.emit('modux-notice', {
            message: `${page.name} es la cabecera de ${app.name} — las siguientes páginas serán pestañas`,
          });
          return;
        }
        host.command({
          kind: 'add-menu-item',
          appId: targetId,
          label: page.name,
          pageId: sourceId,
          itemId: host.newMenuItemId(page.name),
        });
        return;
      }
      // an app wired to an IdP: its users authenticate there (either direction)
      const idpsUi = host.model.identityProviders ?? [];
      const isIdp = (id: string) => idpsUi.some((x) => x.id === id);
      if (isIdp(sourceId) || isIdp(targetId)) {
        const idpId = isIdp(sourceId) ? sourceId : targetId;
        const other = isIdp(sourceId) ? targetId : sourceId;
        if (isApp(other)) {
          host.command({ kind: 'set-identity-provider', id: other, targetId: idpId });
        } else {
          host.emit('modux-notice', { message: 'En la vista UI, el IdP se relaciona con las APPS (quién autentica dónde)' });
        }
        return;
      }
      // a model wired to a page or an app becomes its VIEWMODEL (either direction)
      const isModel = (id: string) => (host.model.models ?? []).some((mo) => mo.id === id);
      if (isModel(sourceId) || isModel(targetId)) {
        const modelId = isModel(sourceId) ? sourceId : targetId;
        const other = isModel(sourceId) ? targetId : sourceId;
        if (isPage(other)) {
          host.command({ kind: 'set-page-model', pageId: other, modelId });
          return;
        }
        if (isApp(other)) {
          host.command({ kind: 'set-app-model', appId: other, modelId });
          return;
        }
        return;
      }
      // an entry dragged onto ANOTHER entry moves it: the edges slot it as a sibling,
      // the middle nests it (the target becomes a grouper); onto an app, to its root —
      // including another app's. The subtree travels whole.
      const srcMenu = parseMenuNodeId(sourceId);
      if (srcMenu?.itemId && (parseMenuNodeId(targetId)?.itemId || isApp(targetId))) {
        const tgtMenu = parseMenuNodeId(targetId);
        const src = host.menuEntryIn(srcMenu.appId, srcMenu.itemId);
        if (!src) return;
        if (tgtMenu?.itemId) {
          const tgt = host.menuEntryIn(tgtMenu.appId, tgtMenu.itemId);
          if (!tgt) return;
          // its own subtree is off-limits
          const inSubtree = (items?: UiMenuEntryRef[]): boolean =>
            (items ?? []).some((it) => it.id === tgtMenu.itemId || inSubtree(it.children));
          if (srcMenu.appId === tgtMenu.appId && (tgtMenu.itemId === srcMenu.itemId || inSubtree(src.entry.children))) {
            return;
          }
          // where on the row: edges slot a sibling, the middle nests
          const rect = host.nodeClientRect(targetId);
          const fr = rect && y !== undefined ? (y - rect.top) / Math.max(1, rect.height) : 0.5;
          const pos = fr < 0.3 ? 'before' : fr > 0.7 ? 'after' : 'nest';
          if (pos === 'nest') {
            host.command({
              kind: 'move-menu-item',
              appId: srcMenu.appId,
              toAppId: tgtMenu.appId,
              itemId: srcMenu.itemId,
              parentId: tgtMenu.itemId,
            });
          } else {
            const before = pos === 'before' ? tgtMenu.itemId : (tgt.beforeId ?? undefined);
            if (srcMenu.appId === tgtMenu.appId && tgt.parentId === src.parentId && before === srcMenu.itemId) return;
            host.command({
              kind: 'move-menu-item',
              appId: srcMenu.appId,
              toAppId: tgtMenu.appId,
              itemId: srcMenu.itemId,
              parentId: tgt.parentId ?? undefined,
              beforeItemId: before,
            });
          }
          return;
        }
        // dropped on an app: to its root level (also the promote-to-top gesture)
        if (srcMenu.appId === targetId && !src.parentId) return; // already there
        host.command({
          kind: 'move-menu-item',
          appId: srcMenu.appId,
          toAppId: targetId,
          itemId: srcMenu.itemId,
        });
        return;
      }
      // menu entry ↔ page or app: the entry OPENS that UI component (an app is just
      // another component, like a page) — same gesture, both directions
      const menuRef = parseMenuNodeId(sourceId) ?? parseMenuNodeId(targetId);
      if (menuRef) {
        const menuNodeIdStr = parseMenuNodeId(sourceId) ? sourceId : targetId;
        const other = parseMenuNodeId(sourceId) ? targetId : sourceId;
        if (host.sceneFor('ui').nodes.find((n) => n.id === menuNodeIdStr)?.kind === 'menu-group') {
          host.emit('modux-notice', { message: 'Un agrupador (con submenú) no puede abrir nada' });
          return;
        }
        const isUseCase = host.model.modules.some((mod) =>
          (mod.useCases ?? []).some((u) => u.id === other),
        );
        const isAggregate = (host.model.aggregates ?? []).some((a) => a.id === other);
        const owningQs = host.model.modules
          .flatMap((mod) => mod.queryServices ?? [])
          .find((qs) => (qs.operations ?? []).some((op) => op.id === other));
        if (isPage(other)) {
          host.command({ kind: 'set-menu-page', pageId: other, ...menuRef });
        } else if (isApp(other) && other !== menuRef.appId) {
          host.command({ kind: 'set-menu-app', toAppId: other, ...menuRef });
        } else if (isUseCase) {
          host.command({ kind: 'set-menu-use-case', useCaseId: other, ...menuRef });
        } else if (isAggregate) {
          host.command({ kind: 'set-menu-aggregate', aggregateId: other, ...menuRef });
        } else if (owningQs) {
          host.command({
            kind: 'set-menu-query-operation',
            queryServiceId: owningQs.id,
            queryOperationId: other,
            ...menuRef,
          });
        }
        return;
      }
      // actor → app: the actor uses that app
      if ((host.model.actors ?? []).some((a) => a.id === sourceId) && isApp(targetId)) {
        if (!(host.model.actorAppUses ?? []).some((u) => u.actorId === sourceId && u.appId === targetId)) {
          host.command({ kind: 'add-actor-app', actorId: sourceId, appId: targetId });
        }
        return;
      }
      // page ↔ use case (a toolbar button) / query service (the listing source),
      // in either direction so the catalog can drop system pieces ON the page
      const pair = isPage(sourceId)
        ? { pageId: sourceId, other: targetId }
        : isPage(targetId)
          ? { pageId: targetId, other: sourceId }
          : null;
      if (pair) {
        const useCaseIds = new Set(
          host.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
        );
        const queryServiceIds = new Set(
          host.model.modules.flatMap((m) => (m.queryServices ?? []).map((q) => q.id)),
        );
        const page = pages.find((x) => x.id === pair.pageId)!;
        if (useCaseIds.has(pair.other)) {
          if (!(page.buttons ?? []).some((b) => b.useCaseId === pair.other)) {
            host.command({ kind: 'add-page-button', pageId: pair.pageId, useCaseId: pair.other });
          }
        } else if (queryServiceIds.has(pair.other)) {
          host.command({ kind: 'set-page-listing', pageId: pair.pageId, queryServiceId: pair.other });
        }
      }
      return;
    }
    if (view === 'mappings') {
      const models = host.model.models ?? [];
      const srcField = parseFieldNodeId(sourceId);
      const tgtField = parseFieldNodeId(targetId);
      const transformations = host.model.transformations ?? [];
      const customCodes = host.model.customCodes ?? [];
      const isCustomCode = (id: string) => customCodes.some((cc) => cc.id === id);
      // custom code ↔ transformación: la transformación delega en ese código.
      if (isCustomCode(sourceId) && transformations.some((t) => t.id === targetId)) {
        host.command({ kind: 'set-transformation-custom-code', id: targetId, targetId: sourceId });
        return;
      }
      if (isCustomCode(targetId) && transformations.some((t) => t.id === sourceId)) {
        host.command({ kind: 'set-transformation-custom-code', id: sourceId, targetId });
        return;
      }
      // custom code → un modelo mapeado: el MAPEADO de ese modelo delega en el código
      // (si participa en varios, se elige desde la ficha del mapeado).
      if (isCustomCode(sourceId)) {
        const overModel = tgtField?.modelId ?? (models.some((m) => m.id === targetId) ? targetId : null);
        if (overModel) {
          const involved = (host.model.modelMappings ?? []).filter(
            (mm) => mm.sourceModelId === overModel || mm.targetModelId === overModel,
          );
          if (involved.length === 1) {
            host.command({ kind: 'set-mapping-custom-code', id: involved[0].id, targetId: sourceId });
          } else {
            host.emit('modux-notice', {
              message: involved.length
                ? 'El modelo participa en varios mapeados: elige el mapeado desde su ficha'
                : 'Ese modelo no tiene mapeados donde delegar el código',
            });
          }
          return;
        }
        return;
      }
      // modelo/campo → transformación: una ENTRADA más; transformación → modelo/campo: su SALIDA.
      if (transformations.some((t) => t.id === targetId)) {
        if (tgtField || transformations.some((t) => t.id === sourceId)) return;
        const input = srcField
          ? { modelId: srcField.modelId, fieldId: srcField.fieldId }
          : models.some((m) => m.id === sourceId)
            ? { modelId: sourceId }
            : null;
        if (input) host.command({ kind: 'add-transformation-input', id: targetId, ...input });
        return;
      }
      if (transformations.some((t) => t.id === sourceId)) {
        const output = tgtField
          ? { modelId: tgtField.modelId, fieldId: tgtField.fieldId }
          : models.some((m) => m.id === targetId)
            ? { modelId: targetId }
            : null;
        if (output) host.command({ kind: 'set-transformation-output', id: sourceId, ...output });
        return;
      }
      // campo → campo (de OTRO modelo): una regla del mapeado entre sus modelos,
      // creando el mapeado en el mismo gesto si aún no existe.
      if (srcField && tgtField) {
        if (srcField.modelId === tgtField.modelId) {
          host.emit('modux-notice', { message: 'Las reglas mapean campos de modelos DISTINTOS' });
          return;
        }
        let mapping = (host.model.modelMappings ?? []).find(
          (mm) => mm.sourceModelId === srcField.modelId && mm.targetModelId === tgtField.modelId,
        );
        if (!mapping) {
          const src = models.find((m) => m.id === srcField.modelId);
          const tgt = models.find((m) => m.id === tgtField.modelId);
          if (!src || !tgt) return;
          const clean = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '');
          const taken = new Set((host.model.modelMappings ?? []).map((mm) => mm.id));
          let mid = `mapping-${slug(src.name)}-${slug(tgt.name)}`;
          for (let n = 2; taken.has(mid); n++) mid = `mapping-${slug(src.name)}-${slug(tgt.name)}-${n}`;
          host.command(
            { kind: 'add-model-mapping', id: mid, name: `${clean(src.name)}2${clean(tgt.name)}`, sourceId: src.id, targetId: tgt.id },
            false,
          );
          mapping = { id: mid, name: '', sourceModelId: src.id, targetModelId: tgt.id };
        }
        host.command({
          kind: 'add-model-mapping-rule',
          id: mapping.id,
          sourceId: srcField.fieldId,
          targetId: tgtField.fieldId,
        });
        return;
      }
      // campo → otro modelo: el campo se MUEVE allí (sus reglas caducan).
      if (srcField && models.some((m) => m.id === targetId) && targetId !== srcField.modelId) {
        host.command({ kind: 'move-model-field', modelId: srcField.modelId, fieldId: srcField.fieldId, targetId });
        return;
      }
      if (!models.some((m) => m.id === sourceId) || !models.some((m) => m.id === targetId)) return;
      if (sourceId === targetId) return;
      if ((host.model.modelMappings ?? []).some((mm) => mm.sourceModelId === sourceId && mm.targetModelId === targetId)) {
        return;
      }
      const src = models.find((m) => m.id === sourceId)!;
      const tgt = models.find((m) => m.id === targetId)!;
      const clean = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '');
      const taken = new Set((host.model.modelMappings ?? []).map((mm) => mm.id));
      let id = `mapping-${slug(src.name)}-${slug(tgt.name)}`;
      for (let n = 2; taken.has(id); n++) id = `mapping-${slug(src.name)}-${slug(tgt.name)}-${n}`;
      host.command({
        kind: 'add-model-mapping',
        id,
        name: `${clean(src.name)}2${clean(tgt.name)}`,
        sourceId,
        targetId,
      });
      return;
    }
    if (view !== 'context-map') return;
    // A proxy's operation occurrence → an implementation SITE of the fronted API: the
    // published API node (in its external system) or an api-impl occurrence (in a
    // bounded context; the bare context also counts when it implements the API).
    const opOcc = /^apiop:(.+)@(.+)$/.exec(sourceId);
    if (opOcc) {
      const [, operationId, siteId] = opOcc;
      const px = (host.model.proxyApis ?? []).find((p) => p.id === siteId);
      // The occurrence's API: through the proxy's target, or the site module's implementation.
      const occApiId =
        px?.targetApiId ??
        (host.model.apiImplementations ?? []).find(
          (impl) =>
            impl.moduleId === siteId &&
            (host.model.apis ?? []).some(
              (a) => a.id === impl.apiId && a.operations.some((o) => o.id === operationId),
            ),
        )?.apiId;
      if (!occApiId) return;
      // Occurrence → use case: the fine wiring of the OPERATION itself (any site, same op).
      const occUcIds = new Set(
        host.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      if (occUcIds.has(targetId)) {
        // From an occurrence, the wiring is ALWAYS per-site: the site is the bounded
        // context implementing the API, or the proxy fronting it — the use case serving
        // the operation there may live in any context. (The published chip keeps the
        // global targetUseCaseId wiring.)
        host.command({
          kind: 'set-api-operation-implementation',
          apiId: occApiId,
          operationId,
          moduleId: siteId,
          targetUseCaseId: targetId,
        });
        return;
      }
      // The routing gestures below only make sense from a PROXY's occurrence.
      if (!px?.targetApiId) return;
      let targetSiteId: string | null = null;
      if (targetId === px.targetApiId) {
        targetSiteId = px.targetApiId; // as published
      } else {
        const implTarget = /^apiimpl:(.+)@(.+)$/.exec(targetId);
        if (implTarget && implTarget[1] === px.targetApiId) {
          targetSiteId = implTarget[2];
        } else if (
          host.model.modules.some((m) => m.id === targetId) &&
          (host.model.apiImplementations ?? []).some(
            (impl) => impl.apiId === px.targetApiId && impl.moduleId === targetId,
          )
        ) {
          targetSiteId = targetId;
        }
      }
      if (!targetSiteId) return;
      const already = (host.model.proxyOperationRoutes ?? []).some(
        (r) => r.proxyId === px.id && r.operationId === operationId && r.targetSiteId === targetSiteId,
      );
      if (!already) {
        host.command({
          kind: 'add-proxy-operation-route',
          proxyId: px.id,
          operationId,
          targetSiteId,
        });
      }
      return;
    }
    // Actor and AI-agent drags come first: they may legally end on children (use
    // cases, query services, aggregates) that other gestures treat as off-limits.
    const agentIds = new Set((host.model.aiAgents ?? []).map((a) => a.id));
    if (agentIds.has(sourceId)) {
      const agentUcIds = new Set(
        host.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      if (agentUcIds.has(targetId)) {
        const already = (host.model.agentUses ?? []).some(
          (u) => u.agentId === sourceId && u.useCaseId === targetId,
        );
        if (!already) host.command({ kind: 'add-agent-use', sourceId, targetId });
        return;
      }
      // The other half of the agent's tool surface: external-system operations.
      const agentExtUcIds = new Set(
        host.model.externalSystems.flatMap((x) => (x.useCases ?? []).map((u) => u.id)),
      );
      if (agentExtUcIds.has(targetId)) {
        const already = (host.model.agentExternalUses ?? []).some(
          (u) => u.agentId === sourceId && u.externalUseCaseId === targetId,
        );
        if (!already) host.command({ kind: 'add-agent-external-use', sourceId, targetId });
        return;
      }
      // Or a whole MCP server published by an external system.
      const agentMcpIds = new Set(
        host.model.externalSystems.flatMap((x) => (x.mcpServers ?? []).map((s) => s.id)),
      );
      if (agentMcpIds.has(targetId)) {
        const already = (host.model.agentMcpUses ?? []).some(
          (u) => u.agentId === sourceId && u.mcpServerId === targetId,
        );
        if (!already) host.command({ kind: 'add-agent-mcp', sourceId, targetId });
        return;
      }
      // Or one of our MCP gateways (a curated tool surface).
      if ((host.model.mcpGateways ?? []).some((g) => g.id === targetId)) {
        const already = (host.model.agentGatewayUses ?? []).some(
          (u) => u.agentId === sourceId && u.gatewayId === targetId,
        );
        if (!already) host.command({ kind: 'add-agent-gateway', sourceId, targetId });
        return;
      }
      // Or an API operation as a tool.
      const agentApiOpIds = new Set(
        (host.model.apis ?? []).flatMap((a) => a.operations.map((o) => o.id)),
      );
      if (agentApiOpIds.has(targetId)) {
        const already = (host.model.agentApiOpUses ?? []).some(
          (u) => u.agentId === sourceId && u.apiOperationId === targetId,
        );
        if (!already) host.command({ kind: 'add-agent-api-operation', sourceId, targetId });
        return;
      }
      // Or a WHOLE API — real or proxy — as a tool (every operation of it).
      if (
        (host.model.apis ?? []).some((a) => a.id === targetId) ||
        (host.model.proxyApis ?? []).some((px) => px.id === targetId)
      ) {
        const already = (host.model.agentApiUses ?? []).some(
          (u) => u.agentId === sourceId && u.apiId === targetId,
        );
        if (!already) host.command({ kind: 'add-agent-api', sourceId, targetId });
        return;
      }
      // Or a query service as a read tool.
      const agentQsIds = new Set(
        host.model.modules.flatMap((m) => (m.queryServices ?? []).map((q) => q.id)),
      );
      if (agentQsIds.has(targetId)) {
        const already = (host.model.agentQueryUses ?? []).some(
          (u) => u.agentId === sourceId && u.queryServiceId === targetId,
        );
        if (!already) host.command({ kind: 'add-agent-query', sourceId, targetId });
        return;
      }
      // Or another agent: delegation.
      if (agentIds.has(targetId) && targetId !== sourceId) {
        const already = (host.model.agentDelegations ?? []).some(
          (u) => u.agentId === sourceId && u.delegateAgentId === targetId,
        );
        if (!already) host.command({ kind: 'add-agent-delegate', sourceId, targetId });
        return;
      }
      // Knowledge: the agent grounds its answers on the RAG.
      if ((host.model.rags ?? []).some((r) => r.id === targetId)) {
        const already = (host.model.agentRags ?? []).some(
          (u) => u.agentId === sourceId && u.ragId === targetId,
        );
        if (!already) host.command({ kind: 'add-agent-rag', sourceId, targetId });
      }
      return;
    }
    // The MCP gateway aggregates/exposes whatever it is dragged onto.
    if ((host.model.mcpGateways ?? []).some((g) => g.id === sourceId)) {
      const gw = (host.model.mcpGateways ?? []).find((g) => g.id === sourceId)!;
      const exposable =
        host.model.externalSystems.some((x) => (x.mcpServers ?? []).some((s) => s.id === targetId)) ||
        (host.model.apis ?? []).some((a) => a.id === targetId) ||
        (host.model.apis ?? []).some((a) => a.operations.some((o) => o.id === targetId)) ||
        host.model.modules.some((m) => (m.useCases ?? []).some((u) => u.id === targetId)) ||
        (host.model.rags ?? []).some((r) => r.id === targetId);
      const already = [
        ...(gw.mcpServerIds ?? []),
        ...(gw.apiIds ?? []),
        ...(gw.apiOperationIds ?? []),
        ...(gw.useCaseIds ?? []),
        ...(gw.ragIds ?? []),
      ].includes(targetId);
      if (exposable && !already) {
        host.command({ kind: 'add-gateway-exposure', sourceId, targetId });
      }
      return;
    }
    if ((host.model.mcpGateways ?? []).some((g) => g.id === targetId)) return; // gateways only take agents/exposures
    // Dragging a RAG onto a read model declares its source: the RAG indexes it.
    const rag = (host.model.rags ?? []).find((r) => r.id === sourceId);
    if (rag) {
      const readModelIds = new Set(
        host.model.modules.flatMap((m) => (m.readModels ?? []).map((rm) => rm.id)),
      );
      if (readModelIds.has(targetId) && !(rag.sourceReadModelIds ?? []).includes(targetId)) {
        host.command({ kind: 'add-rag-source', sourceId, targetId });
        return;
      }
      // Structured legacy content: a table owned by an external system.
      const extTableIds = new Set(
        host.model.externalSystems.flatMap((x) => (x.tables ?? []).map((t) => t.id)),
      );
      if (extTableIds.has(targetId) && !(rag.sourceExternalTableIds ?? []).includes(targetId)) {
        host.command({ kind: 'add-rag-source', sourceId, targetId });
        return;
      }
      // Or an API — real or proxy — whose content it indexes by calling it.
      if (
        ((host.model.apis ?? []).some((a) => a.id === targetId) ||
          (host.model.proxyApis ?? []).some((px) => px.id === targetId)) &&
        !(rag.sourceApiIds ?? []).includes(targetId)
      ) {
        host.command({ kind: 'add-rag-source', sourceId, targetId });
        return;
      }
      // Coarse sources: a whole external system, or a whole bounded context.
      if (
        host.model.externalSystems.some((x) => x.id === targetId) &&
        !(rag.sourceExternalSystemIds ?? []).includes(targetId)
      ) {
        host.command({ kind: 'add-rag-source', sourceId, targetId });
        return;
      }
      if (
        host.model.modules.some((mo) => mo.id === targetId) &&
        !(rag.sourceModuleIds ?? []).includes(targetId)
      ) {
        host.command({ kind: 'add-rag-source', sourceId, targetId });
      }
      return;
    }
    if ((host.model.rags ?? []).some((r) => r.id === targetId)) return; // rag targets only make sense from agents
    // Dragging a WORKFLOW onto a use case adds a step orchestrating it; onto
    // ANOTHER workflow, chains them: A's completion event becomes B's trigger.
    if ((host.model.workflows ?? []).some((w) => w.id === sourceId)) {
      const wf = (host.model.workflows ?? []).find((w) => w.id === sourceId)!;
      const targetWf = (host.model.workflows ?? []).find(
        (w) => w.id === targetId && w.id !== sourceId,
      );
      if (targetWf) {
        const completion =
          wf.onCompletionEventName || `${wf.name.replace(/\s+/g, '')}Completado`;
        if (targetWf.triggerEvent !== completion) {
          host.command({ kind: 'set-workflow-trigger', id: targetId, triggerEvent: completion });
        }
        return;
      }
      const uc = host.model.modules
        .flatMap((mo) => mo.useCases ?? [])
        .find((u) => u.id === targetId);
      if (uc) {
        const already = (wf.steps ?? []).some((st) => st.targetUseCaseId === targetId);
        if (!already) {
          const base = `wfs-${slug(uc.name)}`;
          let stepId = base;
          for (let n = 2; (wf.steps ?? []).some((st) => st.id === stepId); n++) {
            stepId = `${base}-${n}`;
          }
          host.command({
            kind: 'add-workflow-step',
            workflowId: sourceId,
            id: stepId,
            name: uc.name,
            targetUseCaseId: targetId,
          });
        }
      }
      return;
    }
    // Dragging an EVENT onto a workflow points its trigger at that event.
    if ((host.model.workflows ?? []).some((w) => w.id === targetId)) {
      const domainEv = host.model.modules
        .flatMap((mo) => mo.domainEvents ?? [])
        .find((ev) => ev.id === sourceId);
      const appEv = host.model.modules
        .flatMap((mo) => mo.applicationEvents ?? [])
        .find((ev) => ev.id === sourceId);
      const ev = domainEv ?? appEv;
      if (ev) {
        // Best effort on the emitter: whoever the emission edges say publishes it.
        const emitter = (host.model.emissions ?? []).find((em) => em.domainEventId === sourceId);
        const aggregateIds2 = new Set((host.model.aggregates ?? []).map((a) => a.id));
        const dsIds2 = new Set(
          host.model.modules.flatMap((mo) => (mo.domainServices ?? []).map((d) => d.id)),
        );
        const ucIds2 = new Set(
          host.model.modules.flatMap((mo) => (mo.useCases ?? []).map((u) => u.id)),
        );
        host.command({
          kind: 'set-workflow-trigger',
          id: targetId,
          triggerEvent: ev.name,
          triggerAggregateId:
            emitter && aggregateIds2.has(emitter.sourceId) ? emitter.sourceId : undefined,
          triggerDomainServiceId:
            emitter && dsIds2.has(emitter.sourceId) ? emitter.sourceId : undefined,
          triggerUseCaseId:
            emitter && ucIds2.has(emitter.sourceId) ? emitter.sourceId : undefined,
        });
      }
      return;
    }
    // Dragging a proxy onto an API wires what it fronts; onto an external system, its host;
    // onto a bounded context, the API it fronts gets an implementation THERE too (the same
    // API — strangler style — and the proxy routes to it as well).
    if ((host.model.proxyApis ?? []).some((px) => px.id === sourceId)) {
      const px = (host.model.proxyApis ?? []).find((x) => x.id === sourceId)!;
      if ((host.model.apis ?? []).some((a) => a.id === targetId)) {
        if (px.targetApiId !== targetId) {
          host.command({ kind: 'set-proxy-target', id: sourceId, targetId });
        }
        return;
      }
      if (host.model.modules.some((m) => m.id === targetId)) {
        if (!px.targetApiId) return; // nothing to implement until the proxy fronts an API
        const already = (host.model.apiImplementations ?? []).some(
          (impl) => impl.apiId === px.targetApiId && impl.moduleId === targetId,
        );
        if (!already) {
          host.command({ kind: 'add-api-implementation', apiId: px.targetApiId, moduleId: targetId });
        }
        return;
      }
      if (host.model.externalSystems.some((x) => x.id === targetId)) {
        if (px.publishedByExternalSystemId !== targetId) {
          host.command({ kind: 'set-api-publisher', id: sourceId, targetId });
        }
      }
      return;
    }
    // Dragging an API onto an external system declares its publisher (it nests inside);
    // onto a bounded context, the sibling gesture of proxy → context: implemented there too.
    if ((host.model.apis ?? []).some((a) => a.id === sourceId)) {
      if (host.model.externalSystems.some((x) => x.id === targetId)) {
        const api = (host.model.apis ?? []).find((a) => a.id === sourceId)!;
        if (api.publishedByExternalSystemId !== targetId) {
          host.command({ kind: 'set-api-publisher', id: sourceId, targetId });
        }
        return;
      }
      if (host.model.modules.some((m) => m.id === targetId)) {
        const already = (host.model.apiImplementations ?? []).some(
          (impl) => impl.apiId === sourceId && impl.moduleId === targetId,
        );
        if (!already) {
          host.command({ kind: 'add-api-implementation', apiId: sourceId, moduleId: targetId });
        }
      }
      return;
    }
    // Agents as target: legal from an actor (talks to it) or from an event (triggers
    // it — reactive agents); the event branch lives further down, past the emission
    // sets it reuses. Anything else pointing at an agent is not a gesture.
    const actorIds = new Set((host.model.actors ?? []).map((a) => a.id));
    if (agentIds.has(targetId)) {
      const eventSourceIds = new Set([
        ...host.model.modules.flatMap((m) => (m.domainEvents ?? []).map((ev) => ev.id)),
        ...host.model.modules.flatMap((m) => (m.applicationEvents ?? []).map((ev) => ev.id)),
      ]);
      if (eventSourceIds.has(sourceId)) {
        const already = (host.model.agentTriggers ?? []).some(
          (t) => t.eventId === sourceId && t.agentId === targetId,
        );
        if (!already) host.command({ kind: 'add-agent-trigger', sourceId, targetId });
        return;
      }
      if (!actorIds.has(sourceId)) return;
    }
    if (actorIds.has(sourceId)) {
      const actorUcIds = new Set(
        host.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      const actorQsIds = new Set(
        host.model.modules.flatMap((m) => (m.queryServices ?? []).map((q) => q.id)),
      );
      if (actorUcIds.has(targetId) || actorQsIds.has(targetId)) {
        const already = (host.model.actorUses ?? []).some(
          (u) => u.actorId === sourceId && u.targetId === targetId,
        );
        if (!already) host.command({ kind: 'add-actor-use', sourceId, targetId });
        return;
      }
      if ((host.model.aggregates ?? []).some((a) => a.id === targetId)) {
        host.command({ kind: 'add-actor-crud', sourceId, targetId });
        return;
      }
      if (host.model.externalSystems.some((x) => x.id === targetId)) {
        const exists = (host.model.actorExternalDependencies ?? []).some(
          (d) => d.actorId === sourceId && d.externalSystemId === targetId,
        );
        if (!exists) host.command({ kind: 'add-actor-external', sourceId, targetId });
        return;
      }
      // The person talks to the agent (a chat/supervision UI derives from it).
      if ((host.model.aiAgents ?? []).some((a) => a.id === targetId)) {
        const exists = (host.model.actorAgentUses ?? []).some(
          (u) => u.actorId === sourceId && u.agentId === targetId,
        );
        if (!exists) host.command({ kind: 'add-actor-agent', sourceId, targetId });
        return;
      }
      return;
    }
    // Dragging an API operation onto its implementer wires the published contract to
    // the domain: a use case (or policy) is the fine wiring, a context the coarse one.
    const owningApi = host.owningApiOf(sourceId);
    if (owningApi) {
      const wireUcIds = new Set(
        host.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      if (wireUcIds.has(targetId)) {
        host.command({
          kind: 'set-api-operation-target',
          apiId: owningApi.id,
          id: sourceId,
          targetUseCaseId: targetId,
        });
        return;
      }
      if (host.model.modules.some((m) => m.id === targetId)) {
        host.command({
          kind: 'set-api-operation-target',
          apiId: owningApi.id,
          id: sourceId,
          moduleId: targetId,
        });
        return;
      }
      return;
    }
    // Notifications: an event wired to one fires it; the notification wired to an
    // actor adds that role as recipient.
    const notifOf = (id: string) => (host.model.notifications ?? []).find((x) => x.id === id);
    if (notifOf(sourceId) || notifOf(targetId)) {
      const notif = notifOf(sourceId) ?? notifOf(targetId)!;
      const other = notifOf(sourceId) ? targetId : sourceId;
      const isEvent = host.model.modules.some((mo) =>
        [...(mo.domainEvents ?? []), ...(mo.applicationEvents ?? [])].some((ev) => ev.id === other),
      );
      if (isEvent) {
        if (notif.eventId !== other) {
          host.command({ kind: 'set-notification-event', id: notif.id, targetId: other });
        }
        return;
      }
      if ((host.model.actors ?? []).some((a2) => a2.id === other)) {
        if (!(notif.recipientRoleIds ?? []).includes(other)) {
          host.command({ kind: 'add-notification-recipient', id: notif.id, roleId: other });
        }
        return;
      }
      host.emit('modux-notice', {
        message: 'Una notificación se dispara con un EVENTO y avisa a ACTORES (roles)',
      });
      return;
    }
    // Documents: wired to a query service (or one of its operations) it becomes a
    // query-fed report.
    const docOf = (id: string) => (host.model.documents ?? []).find((x) => x.id === id);
    if (docOf(sourceId) || docOf(targetId)) {
      const doc = docOf(sourceId) ?? docOf(targetId)!;
      const other = docOf(sourceId) ? targetId : sourceId;
      const asModel = (host.model.models ?? []).find((x) => x.id === other);
      if (asModel) {
        host.command({ kind: 'set-document-model', id: doc.id, modelId: other });
        return;
      }
      const qs = host.model.modules.flatMap((mo) => mo.queryServices ?? []).find((x) => x.id === other);
      const opOwner = host.model.modules
        .flatMap((mo) => (mo.queryServices ?? []).flatMap((x) => (x.operations ?? []).map((op) => ({ op, qs: x }))))
        .find(({ op }) => op.id === other);
      if (qs || opOwner) {
        host.command({
          kind: 'set-document-query',
          id: doc.id,
          queryServiceId: qs?.id ?? opOwner!.qs.id,
          queryOperationId: opOwner?.op.id ?? null,
        });
        return;
      }
      host.emit('modux-notice', {
        message: 'Un informe se alimenta de una CONSULTA (aquí); la plantilla de documento se rellena con un MODELO (suéltalo del Catálogo sobre el documento)',
      });
      return;
    }
    // Identity: wiring an element to an IdP declares the trust — a bounded context
    // validates its tokens, an ETL flow runs as one of its service identities; and
    // an IdP wired to an external system becomes FEDERATED (published by it).
    const idps = host.model.identityProviders ?? [];
    const idpOf = (id: string) => idps.find((x) => x.id === id);
    if (idpOf(sourceId) || idpOf(targetId)) {
      const idp = idpOf(sourceId) ?? idpOf(targetId)!;
      const other = idpOf(sourceId) ? targetId : sourceId;
      if (idpOf(sourceId) && host.model.externalSystems.some((x) => x.id === other)) {
        if (idp.publishedByExternalSystemId !== other) {
          host.command({ kind: 'set-idp-publisher', id: idp.id, targetId: other });
        }
        return;
      }
      const isModule = host.model.modules.some((mo) => mo.id === other);
      const isEtl = (host.model.etlFlows ?? []).some((f) => f.id === other);
      if (isModule || isEtl) {
        host.command({ kind: 'set-identity-provider', id: other, targetId: idp.id });
        return;
      }
      host.emit('modux-notice', {
        message: 'Un IdP se relaciona con contextos y flujos ETL (aquí) o con apps (vista UI); hacia un sistema externo lo federa',
      });
      return;
    }
    // ETL integrator: whatever you wire INTO the flow is a source (a table or an
    // API = pull, an event = consumer); whatever the flow wires OUT to is a write.
    const etlFlowsAll = host.model.etlFlows ?? [];
    const etlOf = (id: string) => etlFlowsAll.find((f) => f.id === id);
    if (etlOf(sourceId) || etlOf(targetId)) {
      const flow = etlOf(sourceId) ?? etlOf(targetId)!;
      const other = etlOf(sourceId) ? targetId : sourceId;
      const isSource = !etlOf(sourceId); // element dragged ONTO the flow
      const tables = new Set(host.model.externalSystems.flatMap((x) => (x.tables ?? []).map((t) => t.id)));
      const apisAll = new Set([
        ...(host.model.apis ?? []).map((a) => a.id),
        ...(host.model.proxyApis ?? []).map((px) => px.id),
      ]);
      const owningApi = (host.model.apis ?? []).find((a) => a.operations.some((o) => o.id === other));
      const evAll = new Set(
        host.model.modules.flatMap((mo) => [
          ...(mo.domainEvents ?? []).map((ev) => ev.id),
          ...(mo.applicationEvents ?? []).map((ev) => ev.id),
        ]),
      );
      let stepType: string | null = null;
      let refs: { externalTableId?: string; apiId?: string; operationId?: string; targetId?: string } = {};
      if (tables.has(other)) {
        stepType = isSource ? 'SOURCE_PULL' : 'WRITE_DB';
        refs = { externalTableId: other };
      } else if (owningApi) {
        stepType = isSource ? 'SOURCE_PULL' : 'WRITE_API';
        refs = { apiId: owningApi.id, operationId: other };
      } else if (apisAll.has(other)) {
        stepType = isSource ? 'SOURCE_PULL' : 'WRITE_API';
        refs = { apiId: other };
      } else if (evAll.has(other)) {
        stepType = isSource ? 'SOURCE_CONSUMER' : 'WRITE_EVENT';
        refs = { targetId: other };
      }
      if (!stepType) {
        host.emit('modux-notice', {
          message: 'Un flujo ETL lee de tablas, APIs y eventos, y escribe en APIs, tablas y eventos',
        });
        return;
      }
      const dup = (flow.steps ?? []).some(
        (s) =>
          s.type === stepType &&
          (s.externalTableId ?? s.operationId ?? s.apiId ?? s.eventId) ===
            (refs.externalTableId ?? refs.operationId ?? refs.apiId ?? refs.targetId),
      );
      if (dup) return;
      const taken = new Set((flow.steps ?? []).map((s) => s.id));
      let n = (flow.steps ?? []).length + 1;
      while (taken.has(`ets-${n}`)) n++;
      host.command({ kind: 'add-etl-step', etlFlowId: flow.id, id: `ets-${n}`, stepType, ...refs });
      return;
    }
    // Dragging an external operation or a legacy table onto a read model (or another
    // context) declares a POLLING projection — the classic legacy integration.
    const externalOp = host.model.externalSystems
      .flatMap((x) => x.useCases ?? [])
      .find((u) => u.id === sourceId);
    const externalTable = host.model.externalSystems
      .flatMap((x) => x.tables ?? [])
      .find((t) => t.id === sourceId);
    if (externalOp || externalTable) {
      const sourceName = (externalOp ?? externalTable)!.name;
      const sourceKey = externalOp
        ? { externalUseCaseId: sourceId }
        : { externalTableId: sourceId };
      const alreadyFrom = (p: import('./model.js').ProjectionRef) =>
        externalOp ? p.sourceExternalUseCaseId === sourceId : p.sourceExternalTableId === sourceId;
      const targetReadModel = host.model.modules
        .flatMap((m) => m.readModels ?? [])
        .find((rm) => rm.id === targetId);
      if (targetReadModel) {
        const exists = (host.model.projections ?? []).some(
          (p) => alreadyFrom(p) && p.readModelId === targetId,
        );
        if (!exists) {
          host.command({
            kind: 'add-projection',
            id: `proj-${slug(sourceName)}-${slug(targetReadModel.name)}`,
            name: `${targetReadModel.name}Projection`,
            ...sourceKey,
            targetId,
          });
        }
        return;
      }
      const targetModule = host.model.modules.find((m) => m.id === targetId);
      if (targetModule) {
        const exists = (host.model.projections ?? []).some(
          (p) => alreadyFrom(p) && p.moduleId === targetId,
        );
        if (!exists) {
          host.command({
            kind: 'add-projection',
            id: `proj-${slug(sourceName)}-${slug(targetModule.name)}`,
            name: `${sourceName}ViewProjection`,
            ...sourceKey,
            moduleId: targetId,
            readModelName: `${sourceName}View`,
          });
        }
        return;
      }
      return;
    }
    // Dragging an aggregate onto a read model (or another context) declares a state
    // projection: the aggregate's state is materialized there. What that implies
    // (CDC, snapshots, replication…) is decided later — this only records the intent.
    const projAggregate = (host.model.aggregates ?? []).find((a) => a.id === sourceId);
    if (projAggregate) {
      const targetReadModel = host.model.modules
        .flatMap((m) => m.readModels ?? [])
        .find((rm) => rm.id === targetId);
      if (targetReadModel) {
        const exists = (host.model.projections ?? []).some(
          (p) => p.sourceAggregateId === sourceId && p.readModelId === targetId,
        );
        if (!exists) {
          host.command({
            kind: 'add-projection',
            id: `proj-${slug(projAggregate.name)}-${slug(targetReadModel.name)}`,
            name: `${targetReadModel.name}Projection`,
            aggregateId: sourceId,
            targetId,
          });
        }
        return;
      }
      const targetModule = host.model.modules.find((m) => m.id === targetId);
      if (targetModule) {
        const exists = (host.model.projections ?? []).some(
          (p) => p.sourceAggregateId === sourceId && p.moduleId === targetId,
        );
        if (!exists) {
          host.command({
            kind: 'add-projection',
            id: `proj-${slug(projAggregate.name)}-${slug(targetModule.name)}`,
            name: `${projAggregate.name}ViewProjection`,
            aggregateId: sourceId,
            moduleId: targetId,
            readModelName: `${projAggregate.name}View`,
          });
        }
        return;
      }
      // any other target (e.g. a domain event) falls through to the gestures below
    }
    // Dragging from an aggregate/use case onto a domain event declares an emission.
    const eventIds = new Set(
      host.model.modules.flatMap((m) => (m.domainEvents ?? []).map((ev) => ev.id)),
    );
    // Only aggregates and domain services emit domain events; use cases emit
    // application events instead.
    const emitterIds = new Set([
      ...(host.model.aggregates ?? []).map((a) => a.id),
      ...host.model.modules.flatMap((m) => (m.domainServices ?? []).map((ds) => ds.id)),
    ]);
    const appEventIds = new Set(
      host.model.modules.flatMap((m) => (m.applicationEvents ?? []).map((ev) => ev.id)),
    );
    const ucIds = new Set(host.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)));
    const qsIds = new Set(
      host.model.modules.flatMap((m) => (m.queryServices ?? []).map((q) => q.id)),
    );
    if (ucIds.has(sourceId) && qsIds.has(targetId)) {
      const already = (host.model.queryCalls ?? []).some(
        (c) => c.sourceId === sourceId && c.targetId === targetId,
      );
      if (!already) host.command({ kind: 'add-query-call', sourceId, targetId });
      return;
    }
    const externalUcIds = new Set(
      host.model.externalSystems.flatMap((x) => (x.useCases ?? []).map((u) => u.id)),
    );
    if (ucIds.has(sourceId) && externalUcIds.has(targetId)) {
      const already = (host.model.externalUseCaseCalls ?? []).some(
        (c) => c.sourceId === sourceId && c.targetId === targetId,
      );
      if (!already) host.command({ kind: 'add-external-uc-call', sourceId, targetId });
      return;
    }
    if (ucIds.has(sourceId) && ucIds.has(targetId) && sourceId !== targetId) {
      const already = (host.model.useCaseCalls ?? []).some(
        (c) => c.sourceId === sourceId && c.targetId === targetId,
      );
      if (!already) host.command({ kind: 'add-use-case-call', sourceId, targetId });
      return;
    }
    // Scheduled trigger → use case (or policy): the cron fires it.
    const sourceTrigger = host.model.modules
      .flatMap((mo) => mo.scheduledTriggers ?? [])
      .find((t) => t.id === sourceId);
    if (sourceTrigger && ucIds.has(targetId)) {
      if (sourceTrigger.useCaseId !== targetId) {
        host.command({ kind: 'set-scheduled-trigger-target', id: sourceId, targetUseCaseId: targetId });
      }
      return;
    }
    // Use case → aggregate: the use case operates on it (a CallAggregateOperation
    // step; the aggregate's single operation wires itself, more stay for the form).
    if (ucIds.has(sourceId) && (host.model.aggregates ?? []).some((a) => a.id === targetId)) {
      const already = (host.model.aggregateCalls ?? []).some(
        (c) => c.sourceId === sourceId && c.targetId === targetId,
      );
      if (!already) host.command({ kind: 'add-aggregate-call', sourceId, targetId });
      return;
    }
    if (
      (emitterIds.has(sourceId) && eventIds.has(targetId)) ||
      (ucIds.has(sourceId) && appEventIds.has(targetId))
    ) {
      const already = (host.model.emissions ?? []).some(
        (em) => em.sourceId === sourceId && em.domainEventId === targetId,
      );
      if (!already) host.command({ kind: 'add-emission', sourceId, targetId });
      return;
    }
    // Dragging an event onto another context (or one of its read models) draws a
    // materialization: a MATERIALIZES flow — the projection/read model/subscription
    // triple stays derived at generation time (flows are the source of truth).
    // (An event onto an AGENT — the reactive-agent gesture — resolved earlier,
    // in the agents-as-target guard.)
    if (eventIds.has(sourceId) || appEventIds.has(sourceId)) {
      const isApplicationEvent = appEventIds.has(sourceId);
      const event = host.model.modules
        .flatMap((m) => (isApplicationEvent ? m.applicationEvents : m.domainEvents) ?? [])
        .find((ev) => ev.id === sourceId);
      const targetUseCase = host.model.modules
        .flatMap((m) => (m.useCases ?? []).map((u) => ({ u, module: m })))
        .find(({ u }) => u.id === targetId);
      const targetReadModel = host.model.modules
        .flatMap((m) => (m.readModels ?? []).map((rm) => ({ rm, module: m })))
        .find(({ rm }) => rm.id === targetId);
      const targetModule =
        host.model.modules.find((m) => m.id === targetId) ??
        targetReadModel?.module ??
        targetUseCase?.module;
      if (!event || !targetModule) return;
      const aggregateIds = new Set((host.model.aggregates ?? []).map((a) => a.id));
      const domainServiceIds = new Set(
        host.model.modules.flatMap((m) => (m.domainServices ?? []).map((ds) => ds.id)),
      );
      const emitter = (host.model.emissions ?? []).find(
        (em) =>
          em.domainEventId === sourceId &&
          (isApplicationEvent
            ? ucIds.has(em.sourceId)
            : aggregateIds.has(em.sourceId) || domainServiceIds.has(em.sourceId)),
      );
      if (!emitter) {
        host.emit('modux-notice', {
          message: isApplicationEvent
            ? `Declara primero qué caso de uso publica ${event.name} (arrastra desde el caso de uso hasta el evento) — el flow necesita su disparador`
            : `Declara primero quién emite ${event.name} (arrastra desde el agregado o servicio de dominio hasta el evento) — el flow necesita su disparador`,
          kind: 'info',
        });
        return;
      }
      const emitterIsAggregate = !isApplicationEvent && aggregateIds.has(emitter.sourceId);
      if (targetUseCase) {
        // Event onto a use case: the TRIGGERS archetype (subscription + CallUseCase derive later).
        const exists = host.model.flows.some(
          (f) =>
            f.archetype === 'TRIGGERS' &&
            f.triggerEvent === event.name &&
            f.targetUseCaseId === targetUseCase.u.id,
        );
        if (exists) return;
        host.command({
          kind: 'add-flow',
          id: `flow-${slug(event.name)}-${slug(targetUseCase.u.name)}`,
          name: targetUseCase.u.name,
          archetype: 'TRIGGERS',
          triggerAggregateId: emitterIsAggregate ? emitter.sourceId : '',
          triggerDomainServiceId:
            !isApplicationEvent && !emitterIsAggregate ? emitter.sourceId : undefined,
          triggerUseCaseId: isApplicationEvent ? emitter.sourceId : undefined,
          triggerEvent: event.name,
          targetId: targetModule.id,
          targetUseCaseId: targetUseCase.u.id,
        });
        return;
      }
      const readModelName = targetReadModel?.rm.name ?? `${event.name}View`;
      const exists = host.model.flows.some(
        (f) =>
          f.archetype === 'MATERIALIZES' &&
          f.triggerEvent === event.name &&
          f.targetId === targetModule.id &&
          f.readModelName === readModelName,
      );
      if (exists) return;
      host.command({
        kind: 'add-flow',
        id: `flow-${slug(event.name)}-${slug(readModelName)}`,
        name: readModelName,
        archetype: 'MATERIALIZES',
        triggerAggregateId: emitterIsAggregate ? emitter.sourceId : '',
        triggerDomainServiceId:
          !isApplicationEvent && !emitterIsAggregate ? emitter.sourceId : undefined,
        triggerUseCaseId: isApplicationEvent ? emitter.sourceId : undefined,
        triggerEvent: event.name,
        targetId: targetModule.id,
        readModelName,
      });
      return;
    }
    // Any other pair touching a nested child is not a strategic relation.
    const childIds = new Set([
      ...emitterIds,
      ...ucIds,
      ...qsIds,
      ...host.model.modules.flatMap((m) => (m.readModels ?? []).map((rm) => rm.id)),
    ]);
    if (
      childIds.has(sourceId) ||
      childIds.has(targetId) ||
      eventIds.has(targetId) ||
      appEventIds.has(targetId)
    ) {
      return;
    }
    const relationExternalIds = new Set(host.model.externalSystems.map((s) => s.id));
    if (relationExternalIds.has(sourceId)) {
      const extUcIds0 = new Set(
        host.model.modules.flatMap((m) => (m.useCases ?? []).map((u) => u.id)),
      );
      if (extUcIds0.has(targetId)) {
        const already = (host.model.externalCalls ?? []).some(
          (c) => c.externalSystemId === sourceId && c.useCaseId === targetId,
        );
        if (!already) host.command({ kind: 'add-external-call', sourceId, targetId });
        return;
      }
      if (relationExternalIds.has(targetId) && targetId !== sourceId) {
        // Between systems the relation has flavours — ask (drawing again retypes).
        host.openExtDepPicker({ sourceId, targetId, x: x ?? 0, y: y ?? 0 });
        return;
      }
      // A specific API operation: the real chip (nested in the published API) or an
      // occurrence at a proxy / bounded-context implementation.
      const realOpApi = (host.model.apis ?? []).find((a) =>
        a.operations.some((o) => o.id === targetId),
      );
      const occTarget = /^apiop:(.+)@(.+)$/.exec(targetId);
      const opUse = realOpApi
        ? { operationId: targetId, siteId: realOpApi.id }
        : occTarget
          ? { operationId: occTarget[1], siteId: occTarget[2] }
          : null;
      if (opUse) {
        const already = (host.model.externalOperationUses ?? []).some(
          (u) =>
            u.externalSystemId === sourceId &&
            u.operationId === opUse.operationId &&
            u.siteId === opUse.siteId,
        );
        if (!already) {
          host.command({
            kind: 'add-external-operation-use',
            sourceId,
            operationId: opUse.operationId,
            targetSiteId: opUse.siteId,
          });
        }
        return;
      }
      if (
        (host.model.apis ?? []).some((a) => a.id === targetId) ||
        (host.model.proxyApis ?? []).some((px) => px.id === targetId)
      ) {
        const exists = (host.model.externalSystemDependencies ?? []).some(
          (d) => d.sourceId === sourceId && d.targetId === targetId,
        );
        if (!exists) host.command({ kind: 'add-external-dependency', sourceId, targetId });
        return;
      }
      return;
    }
    if (relationExternalIds.has(targetId)) return;
    if (actorIds.has(targetId)) return;
    // Strategic relations are 100% derived from the concrete dependencies —
    // there is nothing left to hand-draw between two contexts.
    void x;
    void y;
}

export function performDeleteGesture(
  host: GestureHost,
  view: ViewId,
  elementType: string,
  id: string,
  kind: string,
): void {
  if (kind === 'invariant' || kind === 'invariant-containment') {
    const invariantId = kind === 'invariant' ? id : id.replace(/^protects:.+->/, '');
    host.clearSelection();
    host.command({ kind: 'remove-invariant', id: invariantId });
    return;
  }
    if (view === 'eventstorming' && elementType === 'edge' && kind === 'es-custom') {
      const match = /^escc:(.+)$/.exec(id);
      const owner = match ? host.owningUseCaseOf(match[1]) : null;
      if (match && owner) {
        host.clearSelection();
        host.command({ kind: 'set-use-case-step-custom-code', useCaseId: owner.id, id: match[1], targetId: null });
      }
      return;
    }
    if (view === 'eventstorming' && elementType === 'node' && kind === 'custom-code') {
      host.clearSelection();
      host.command({ kind: 'remove-custom-code', id });
      return;
    }
    if (view === 'ui') {
      if (elementType === 'edge') {
        let m: RegExpExecArray | null;
        if ((m = /^idpauth:(.+)$/.exec(id))) {
          host.command({ kind: 'set-identity-provider', id: m[1], targetId: null });
        } else if ((m = /^appheader:(.+)->(.+)$/.exec(id))) {
          host.command({ kind: 'set-app-header-page', appId: m[1], pageId: null });
        } else if ((m = /^apphome:(.+)->(.+)$/.exec(id))) {
          host.command({ kind: 'set-app-home-page', appId: m[1], pageId: null });
        } else if ((m = /^appmodel:(.+)->(.+)$/.exec(id))) {
          host.command({ kind: 'set-app-model', appId: m[1], modelId: null });
        } else if ((m = /^appview:(.+)->(.+)$/.exec(id))) {
          host.command({ kind: 'set-app-view-page', appId: m[1], pageId: null });
        } else if ((m = /^appedit:(.+)->(.+)$/.exec(id))) {
          host.command({ kind: 'set-app-edit-page', appId: m[1], pageId: null });
        } else if ((m = /^cruddetail:(.+)->(.+)$/.exec(id))) {
          host.command({ kind: 'set-crud-detail', pageId: m[1], targetId: null, toAppId: null });
        } else if ((m = /^crudnew:(.+)->(.+)$/.exec(id))) {
          host.command({ kind: 'set-crud-create', pageId: m[1], targetId: null, toAppId: null });
        } else if ((m = /^wizstep:([^:]+):(.+)$/.exec(id))) {
          // the line is the MAPPING: Supr unmaps the step (the row keeps its place)
          host.command({ kind: 'set-wizard-step-page', pageId: m[1], itemId: m[2], targetId: null });
        } else if ((m = /^pgbtn:(.+)->(.+)$/.exec(id))) {
          host.command({ kind: 'remove-page-button', pageId: m[1], useCaseId: m[2] });
        } else if ((m = /^pglist:(.+)->(.+)$/.exec(id))) {
          host.command({ kind: 'set-page-listing', pageId: m[1], queryServiceId: null });
        } else if ((m = /^pgmodel:(.+)->(.+)$/.exec(id))) {
          host.command({ kind: 'set-page-model', pageId: m[1], modelId: null });
        } else if ((m = /^actorapp:(.+)->(.+)$/.exec(id))) {
          host.command({ kind: 'remove-actor-app', actorId: m[1], appId: m[2] });
        } else if ((m = /^menupage:(.+)->[^>]+$/.exec(id))) {
          const ref = parseMenuNodeId(m[1]);
          if (ref) host.command({ kind: 'set-menu-page', pageId: null, ...ref });
        } else if ((m = /^menuapp:(.+)->[^>]+$/.exec(id))) {
          const ref = parseMenuNodeId(m[1]);
          if (ref) host.command({ kind: 'set-menu-app', toAppId: null, ...ref });
        } else if ((m = /^menuuc:(.+)->[^>]+$/.exec(id))) {
          const ref = parseMenuNodeId(m[1]);
          if (ref) host.command({ kind: 'set-menu-use-case', useCaseId: null, ...ref });
        } else if ((m = /^menuagg:(.+)->[^>]+$/.exec(id))) {
          const ref = parseMenuNodeId(m[1]);
          if (ref) host.command({ kind: 'set-menu-aggregate', aggregateId: null, ...ref });
        } else if ((m = /^menuqop:(.+)->[^>]+$/.exec(id))) {
          const ref = parseMenuNodeId(m[1]);
          if (ref) {
            host.command({ kind: 'set-menu-query-operation', queryServiceId: null, queryOperationId: null, ...ref });
          }
        }
        return;
      }
      if (kind === 'ui-app') {
        host.command({ kind: 'delete-ui-app', id });
        return;
      }
      if (kind === 'page') {
        host.command({ kind: 'delete-ui-page', id });
        return;
      }
      if (kind === 'menu-item' || kind === 'menu-group') {
        const ref = parseMenuNodeId(id);
        if (ref) host.command({ kind: 'remove-menu-item', ...ref });
        return;
      }
      if (kind === 'wizard-step-row') {
        const m = /^wizrow:([^:]+):(.+)$/.exec(id);
        if (m) host.command({ kind: 'remove-page-wizard-step', pageId: m[1], targetId: m[2] });
        return;
      }
      if (kind === 'model') {
        host.command({ kind: 'remove-model', id });
        return;
      }
      if (kind === 'identity-provider') {
        host.command({ kind: 'remove-identity-provider', id });
        return;
      }
      if (kind === 'custom-code') {
        host.command({ kind: 'remove-custom-code', id });
        return;
      }
      if (kind === 'button-group') {
        host.command({ kind: 'remove-button-group', id });
        return;
      }
      if (kind === 'group-button') {
        const m2 = /^gbtn:([^:]+):(.+)$/.exec(id);
        if (m2) host.command({ kind: 'remove-group-button', id: m2[1], itemId: m2[2] });
        return;
      }
      if (kind === 'group-subgroup') {
        const m2 = /^gsub:([^:]+):(.+)$/.exec(id);
        if (m2) host.command({ kind: 'remove-group-subgroup', id: m2[1], targetId: m2[2] });
        return;
      }
      if (elementType === 'edge' && kind === 'bar-group') {
        const m2 = /^bargrp:([^:]+):[^:]+:(.+)$/.exec(id);
        if (m2) host.command({ kind: 'remove-page-bar-group', pageId: m2[1], id: m2[2] });
        return;
      }
      if (elementType === 'edge' && kind === 'gbtn-target') {
        const m2 = /^gbtnt:([^:]+):(.+)$/.exec(id);
        if (m2) host.command({ kind: 'set-group-button-target', id: m2[1], itemId: m2[2], useCaseId: null });
        return;
      }
      if (elementType === 'edge' && kind === 'ui-custom-page') {
        const m2 = /^ccpage:(.+)$/.exec(id);
        if (m2) host.command({ kind: 'set-page-custom-code', id: m2[1], targetId: null });
        return;
      }
      if (elementType === 'edge' && kind === 'cc-uses') {
        const m2 = /^ccuse:(.+)->(.+)$/.exec(id);
        if (m2) host.command({ kind: 'remove-custom-code-use', id: m2[1], elementId: m2[2] });
        return;
      }
      // system chips (use cases, query services, models, actors) are not deletable from here
      return;
    }
    if (view === 'mappings' && elementType === 'edge' && kind === 'model-mapping') {
      const match = /^mapping:(.+)$/.exec(id);
      if (match) {
        host.clearSelection();
        host.command({ kind: 'remove-model-mapping', id: match[1] });
      }
      return;
    }
    if (view === 'mappings' && elementType === 'edge' && kind === 'mapping-rule') {
      const match = /^maprule:([^:]+):(.+)$/.exec(id);
      if (match) {
        host.clearSelection();
        host.command({ kind: 'remove-model-mapping-rule', id: match[1], itemId: match[2] });
      }
      return;
    }
    if (view === 'mappings' && elementType === 'node' && kind === 'model-field') {
      const ref = parseFieldNodeId(id);
      if (ref) {
        host.clearSelection();
        host.command({ kind: 'remove-model-field', modelId: ref.modelId, fieldId: ref.fieldId });
      }
      return;
    }
    if (view === 'mappings' && elementType === 'node' && kind === 'model') {
      host.clearSelection();
      host.command({ kind: 'remove-model', id });
      return;
    }
    if (view === 'mappings' && elementType === 'node' && kind === 'custom-code') {
      host.clearSelection();
      host.command({ kind: 'remove-custom-code', id });
      return;
    }
    if (view === 'mappings' && elementType === 'edge' && kind === 'custom-of-transformation') {
      const match = /^cctf:(.+)$/.exec(id);
      if (match) {
        host.clearSelection();
        host.command({ kind: 'set-transformation-custom-code', id: match[1], targetId: null });
      }
      return;
    }
    if (view === 'mappings' && elementType === 'edge' && kind === 'custom-of-mapping') {
      const match = /^ccmap:(.+)$/.exec(id);
      if (match) {
        host.clearSelection();
        host.command({ kind: 'set-mapping-custom-code', id: match[1], targetId: null });
      }
      return;
    }
    if (view === 'mappings' && elementType === 'node' && kind === 'transformation') {
      host.clearSelection();
      host.command({ kind: 'remove-transformation', id });
      return;
    }
    if (view === 'mappings' && elementType === 'edge' && kind === 'transform-input') {
      const match = /^tfin:([^:]+):([^:]+):(.*)$/.exec(id);
      if (match) {
        host.clearSelection();
        host.command({
          kind: 'remove-transformation-input',
          id: match[1],
          modelId: match[2],
          ...(match[3] ? { fieldId: match[3] } : {}),
        });
      }
      return;
    }
    if (view === 'mappings' && elementType === 'edge' && kind === 'transform-output') {
      const match = /^tfout:(.+)$/.exec(id);
      if (match) {
        host.clearSelection();
        host.command({ kind: 'set-transformation-output', id: match[1] });
      }
      return;
    }
    if (view === 'workflows' && elementType === 'edge' && kind === 'workflow-dependency') {
      const match = /^wfdep:(.+)->(.+)$/.exec(id);
      if (!match) return;
      const owner = host.owningWorkflowOf(match[2]);
      if (!owner) return;
      host.clearSelection();
      host.command({
        kind: 'remove-workflow-dependency',
        workflowId: owner.id,
        id: match[2],
        dependsOnStepId: match[1],
      });
      return;
    }
    if (view === 'workflows' && elementType === 'node' && kind === 'workflow-gateway') {
      host.clearSelection();
      host.command({ kind: 'remove-workflow-gateway', id });
      return;
    }
    if (view === 'workflows' && elementType === 'edge' && kind === 'wf-form') {
      const match = /^wfform:(.+)->(.+)$/.exec(id);
      if (match) {
        const owner = host.owningWorkflowOf(match[1]);
        if (!owner) return;
        host.clearSelection();
        host.command({ kind: 'set-workflow-step-form', workflowId: owner.id, id: match[1] });
      }
      return;
    }
    if (view === 'workflows' && elementType === 'edge' && kind === 'wf-link') {
      const match = /^wflink:(.+)->(.+)$/.exec(id);
      if (match) {
        host.clearSelection();
        host.command({ kind: 'remove-workflow-link', sourceId: match[1], targetId: match[2] });
      }
      return;
    }
    if (elementType === 'node' && kind === 'workflow') {
      host.clearSelection();
      host.command({ kind: 'remove-workflow', id });
      return;
    }
    if (elementType === 'node' && kind === 'workflow-step') {
      const owner = host.owningWorkflowOf(id);
      if (!owner) return;
      host.clearSelection();
      host.command({ kind: 'remove-workflow-step', workflowId: owner.id, id });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'api-impl-wire') {
      // Edge ids are `apiimplwire:<operationId>@<moduleId>` (see context-map.ts).
      const match = /^apiimplwire:(.+)@(.+)$/.exec(id);
      if (!match) return;
      const [, operationId, moduleId] = match;
      const apiId = (host.model.apis ?? []).find((a) =>
        a.operations.some((o) => o.id === operationId),
      )?.id;
      if (!apiId) return;
      host.clearSelection();
      host.command({ kind: 'remove-api-operation-implementation', apiId, operationId, moduleId });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'ext-op-use') {
      // Edge ids are `extopuse:<systemId>-><operationId>@<siteId>` (see context-map.ts).
      const match = /^extopuse:(.+)->(.+)@(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({
        kind: 'remove-external-operation-use',
        sourceId: match[1],
        operationId: match[2],
        targetSiteId: match[3],
      });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'op-route') {
      // Edge ids are `oproute:apiop:<opId>@<proxyId>-><targetNodeId>` (see context-map.ts).
      const match = /^oproute:apiop:(.+)@(.+)->(.+)$/.exec(id);
      if (!match) return;
      const [, operationId, proxyId, targetNodeId] = match;
      const implTarget = /^apiimpl:.+@(.+)$/.exec(targetNodeId);
      const targetSiteId = implTarget ? implTarget[1] : targetNodeId;
      host.clearSelection();
      host.command({ kind: 'remove-proxy-operation-route', proxyId, operationId, targetSiteId });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'relation') {
      // Edge ids for relations are `rel:<sourceId>-><targetId>` (see relationEdgeId).
      const match = /^rel:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-relation', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'emission') {
      const match = /^emit:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-emission', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'projection') {
      const match = /^proj:(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-projection', id: match[1] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'uc-call') {
      const match = /^uccall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-use-case-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'notification-trigger') {
      const match = /^notif:(.+)$/.exec(id);
      if (match) {
        host.clearSelection();
        host.command({ kind: 'set-notification-event', id: match[1], targetId: null });
      }
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'notification-recipient') {
      const match = /^notifto:([^:]+):(.+)$/.exec(id);
      if (match) {
        host.clearSelection();
        host.command({ kind: 'remove-notification-recipient', id: match[1], roleId: match[2] });
      }
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'document-query') {
      const match = /^docq:(.+)$/.exec(id);
      if (match) {
        host.clearSelection();
        host.command({ kind: 'set-document-query', id: match[1], queryServiceId: null, queryOperationId: null });
      }
      return;
    }
    if (view === 'context-map' && elementType === 'node' && kind === 'notification') {
      host.clearSelection();
      host.command({ kind: 'remove-notification', id });
      return;
    }
    if (view === 'context-map' && elementType === 'node' && kind === 'document') {
      host.clearSelection();
      host.command({ kind: 'remove-document', id });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && (kind === 'idp-trust' || kind === 'idp-service')) {
      const match = /^idp(?:trust|svc):(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'set-identity-provider', id: match[1], targetId: null });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'idp-federation') {
      const match = /^idpfed:(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'set-idp-publisher', id: match[1], targetId: null });
      return;
    }
    if (view === 'context-map' && elementType === 'node' && kind === 'identity-provider') {
      host.clearSelection();
      host.command({ kind: 'remove-identity-provider', id });
      return;
    }
    if ((view === 'context-map' || view === 'integrations') && elementType === 'edge' && (kind === 'etl-source' || kind === 'etl-write')) {
      const match = /^etl:([^:]+):(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-etl-step', etlFlowId: match[1], id: match[2] });
      return;
    }
    if ((view === 'context-map' || view === 'integrations') && elementType === 'node' && kind === 'etl-flow') {
      host.clearSelection();
      host.command({ kind: 'remove-etl-flow', id });
      return;
    }
    if (view === 'context-map' && elementType === 'node' && kind === 'ui-app') {
      host.clearSelection();
      host.command({ kind: 'delete-ui-app', id });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'deploys') {
      const match = /^deploy:(.+)->(.+)$/.exec(id);
      if (match) {
        host.clearSelection();
        host.command({ kind: 'remove-service-code-module', serviceId: match[1], id: match[2] });
      }
      return;
    }
    if (view === 'context-map' && elementType === 'node' && kind === 'code-module') {
      host.clearSelection();
      host.command({ kind: 'remove-code-module', id });
      return;
    }
    if (view === 'context-map' && host.detail === 'distribution' && elementType === 'node') {
      // Supr on a chip inside a module box UNPACKS it — the element itself survives.
      const scene = host.sceneFor('context-map');
      for (let cur = scene.nodes.find((n) => n.id === id)?.parentId; cur; ) {
        if ((host.model.codeModules ?? []).some((cm) => cm.id === cur)) {
          host.clearSelection();
          host.command({ kind: 'remove-code-module-element', id: cur, elementId: id });
          return;
        }
        cur = scene.nodes.find((n) => n.id === cur)?.parentId;
      }
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'st-fire') {
      const match = /^stfire:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'set-scheduled-trigger-target', id: match[1], targetUseCaseId: null });
      return;
    }
    if (view === 'context-map' && elementType === 'node' && kind === 'scheduled-trigger') {
      host.clearSelection();
      host.command({ kind: 'remove-scheduled-trigger', id });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'agg-call') {
      const match = /^aggcall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-aggregate-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'qs-call') {
      const match = /^qscall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-query-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'external-call') {
      const match = /^extcall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-external-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'ext-uc-call') {
      const match = /^extuccall:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-external-uc-call', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'agent-use') {
      const match = /^mcp:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-agent-use', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'agent-external-use') {
      const match = /^mcpx:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-agent-external-use', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'agent-mcp') {
      const match = /^mcpsv:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-agent-mcp', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'gateway-exposure') {
      const match = /^gwx:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-gateway-exposure', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'agent-gateway') {
      const match = /^aggw:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-agent-gateway', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'agent-api-op') {
      const match = /^agapi:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-agent-api-operation', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'agent-query') {
      const match = /^agqs:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-agent-query', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'agent-delegate') {
      const match = /^agag:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-agent-delegate', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'actor-agent') {
      const match = /^useag:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-actor-agent', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'agent-trigger') {
      const match = /^evag:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-agent-trigger', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (elementType === 'node' && kind === 'mcp-gateway') {
      host.clearSelection();
      host.command({ kind: 'remove-mcp-gateway', id });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'agent-rag') {
      const match = /^agrag:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-agent-rag', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'rag-source') {
      const match = /^ragsrc:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-rag-source', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (
      view === 'context-map' &&
      elementType === 'edge' &&
      (kind === 'rag-table' || kind === 'rag-api' || kind === 'rag-coarse')
    ) {
      // ragtbl/ragapi/ragcoarse run source→rag; the command speaks rag→source.
      const match = /^rag(?:tbl|api|coarse):(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-rag-source', sourceId: match[2], targetId: match[1] });
      return;
    }
    if (elementType === 'node' && kind === 'rag') {
      host.clearSelection();
      host.command({ kind: 'remove-rag', id });
      return;
    }
    if (elementType === 'node' && kind === 'rag-content-source') {
      const match = /^ragcs:(.+?):(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-rag-content-source', sourceId: match[1], uri: match[2] });
      return;
    }
    if (elementType === 'node' && kind === 'external-table') {
      host.clearSelection();
      host.command({ kind: 'remove-external-table', id });
      return;
    }
    if (elementType === 'node' && kind === 'mcp-server') {
      host.clearSelection();
      host.command({ kind: 'remove-mcp-server', id });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'api-wire') {
      const match = /^apiwire:(.+)$/.exec(id);
      const owner = match ? host.owningApiOf(match[1]) : null;
      if (!match || !owner) return;
      host.clearSelection();
      // Unwire: clearing both targets leaves the operation published but unimplemented.
      host.command({ kind: 'set-api-operation-target', apiId: owner.id, id: match[1] });
      return;
    }
    if (elementType === 'node' && kind === 'api') {
      host.clearSelection();
      host.command({ kind: 'remove-api', id });
      return;
    }
    // An API-implementation occurrence: deleting it removes the implementation SITE,
    // never the API itself (which lives on, published where it was).
    if (elementType === 'node' && kind === 'api-impl') {
      const match = /^apiimpl:(.+)@(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-api-implementation', apiId: match[1], moduleId: match[2] });
      return;
    }
    if (elementType === 'node' && kind === 'proxy-api') {
      host.clearSelection();
      host.command({ kind: 'remove-proxy-api', id });
      return;
    }
    if (view === 'context-map' && elementType === 'node' && kind === 'workflow') {
      host.clearSelection();
      host.command({ kind: 'remove-workflow', id });
      return;
    }
    if (elementType === 'node' && kind === 'api-operation') {
      const owner = host.owningApiOf(id);
      if (!owner) return;
      host.clearSelection();
      host.command({ kind: 'remove-api-operation', apiId: owner.id, id });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'actor-use') {
      const match = /^use:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-actor-use', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'actor-ext') {
      const match = /^extdep:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-actor-external', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'ext-dep') {
      const match = /^xdep:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-external-dependency', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'wf-chain') {
      const match = /^wfchain:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'set-workflow-trigger', id: match[2], triggerEvent: '' });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'agent-api') {
      const match = /^agapi:(.+)->(.+)$/.exec(id);
      if (!match) return;
      host.clearSelection();
      host.command({ kind: 'remove-agent-api', sourceId: match[1], targetId: match[2] });
      return;
    }
    if (view === 'context-map' && elementType === 'edge' && kind === 'proxy-target') {
      const match = /^pxt:(.+)->(.+)$/.exec(id);
      if (!match) return;
      // Only the real wiring is deletable — a rolled-up summary edge (host → host) is not.
      if (!(host.model.proxyApis ?? []).some((px) => px.id === match[1])) return;
      host.clearSelection();
      host.command({ kind: 'set-proxy-target', id: match[1], targetId: '' });
      return;
    }
    if (elementType === 'node' && kind === 'module') {
      const hasAggregates = (host.model.aggregates ?? []).some((a) => a.moduleId === id);
      if (hasAggregates) return; // integrity guard: empty the module first
      host.clearSelection();
      host.command({ kind: 'remove-module', id });
      return;
    }
    if (elementType === 'node' && kind === 'aggregate') {
      const hasEntities = (host.model.entities ?? []).some((x) => x.aggregateId === id);
      if (hasEntities) return;
      host.clearSelection();
      host.command({ kind: 'remove-aggregate', id });
      return;
    }
    if (elementType === 'node' && kind === 'domain-event') {
      host.clearSelection();
      host.command({ kind: 'remove-domain-event', id });
      return;
    }
    if (elementType === 'node' && kind === 'read-model') {
      host.clearSelection();
      host.command({ kind: 'remove-read-model', id });
      return;
    }
    if (elementType === 'node' && kind === 'domain-service') {
      host.clearSelection();
      host.command({ kind: 'remove-domain-service', id });
      return;
    }
    if (elementType === 'node' && kind === 'query-service') {
      host.clearSelection();
      host.command({ kind: 'remove-query-service', id });
      return;
    }
    if (elementType === 'node' && kind === 'use-case') {
      host.clearSelection();
      host.command({ kind: 'remove-use-case', id });
      return;
    }
    if (elementType === 'node' && kind === 'external-use-case') {
      host.clearSelection();
      host.command({ kind: 'remove-external-use-case', id });
      return;
    }
    if (elementType === 'node' && kind === 'application-event') {
      host.clearSelection();
      host.command({ kind: 'remove-application-event', id });
      return;
    }
    if (elementType === 'node' && kind === 'external-system') {
      host.clearSelection();
      host.command({ kind: 'remove-external-system', id });
      return;
    }
    if (elementType === 'node' && kind === 'actor') {
      host.clearSelection();
      host.command({ kind: 'remove-actor', id });
      return;
    }
    if (elementType === 'node' && kind === 'ai-agent') {
      host.clearSelection();
      host.command({ kind: 'remove-ai-agent', id });
      return;
    }
    if (elementType === 'node' && kind === 'flow') {
      host.clearSelection();
      host.command({ kind: 'remove-flow', id: id.replace(/^flow:/, '') });
      return;
    }
    if (elementType === 'node' && kind === 'process') {
      host.clearSelection();
      host.command({ kind: 'remove-process', id });
      return;
    }
    if (elementType === 'node' && kind === 'process-step') {
      const owner = host.owningProcessOf(id);
      if (!owner) return;
      host.clearSelection();
      host.command({ kind: 'remove-process-step', processId: owner.id, id });
    }
}
