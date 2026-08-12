/**
 * The UI half of the projection: apps, pages, models and the furniture around them.
 *
 * Kept apart from `project.ts` because it answers a different question — that one is about what
 * the system MEANS, this one about what it SHOWS — and because it is the half that will keep
 * moving (§6.4).
 *
 * Ported from `EditorModelProjection`.
 */

import type { ModuxModel } from '../model.js';
import { asList, nested, type Element, type ModelStore } from './store.js';

/** Element types this half reads. */
export const UI_PROJECTED_TYPES = [
  'uiAdapters', 'pages', 'mockups', 'modelMappings', 'customCodes', 'buttonGroups', 'transformations',
  'identityProviders', 'notifications', 'documents', 'etlFlows',
];

/** The UI-facing fields of the editor's model, merged into what `project()` builds. */
export function projectUi(store: ModelStore): Partial<ModuxModel> {
  return {
    mockups: store.all('mockups').map((mk) => ({
      id: mk.id,
      name: name(mk),
      pageId: str(mk.pageId),
      content: nested(mk.content) as never,
    })),

    uiApps: store.all('uiAdapters').map((app) => ({
      id: app.id,
      name: name(app),
      title: str(app.title),
      type: str(app.appType),
      menuItems: menu(nested(app.menuItems) as Element[]),
      headerPageId: str(app.headerPageId),
      homePageId: str(app.homePageId),
      homeAppId: str(app.homeAppId),
      modelId: str(app.modelId),
      viewPageId: str(app.viewPageId),
      editPageId: str(app.editPageId),
      identityProviderId: str(app.identityProviderId),
    })),

    pages: store.all('pages').map((page) => ({
      id: page.id,
      name: name(page),
      type: str(page.type),
      route: str(page.route),
      modelId: str(page.modelId),
      modelName: str(store.get('models', str(page.modelId))?.name),
      listingQueryServiceId: str(page.listingQueryServiceId),
      buttons: [
        ...buttons(nested(page.toolbar) as Element[], 'toolbar'),
        ...buttons(nested(page.bottomBar) as Element[], 'bottom'),
      ],
      viewmodelFields: viewmodelFields(store, page),
      content: nested(page.content) as never,
      wizardSteps: nested(page.wizardSteps).map((s) => ({
        id: str(s.key) ?? str(s.id),
        pageId: str(s.pageId),
        label: str(s.label),
      })),
      crudDetailPageId: str(page.crudDetailPageId),
      crudDetailAppId: str(page.crudDetailAppId),
      crudCreatePageId: str(page.crudCreatePageId),
      crudCreateAppId: str(page.crudCreateAppId),
      customCodeId: str(page.customCodeId),
      toolbarGroupIds: asList(page.toolbarGroupIds),
      bottomBarGroupIds: asList(page.bottomBarGroupIds),
    })),

    /** The actor→app edges, flattened out of the actors that hold them. */
    actorAppUses: store.all('roles').flatMap((actor) =>
      asList(actor.uiAdapterIds).map((appId) => ({ actorId: actor.id, appId }))),

    modelMappings: store.all('modelMappings').map((m) => ({
      id: m.id,
      name: name(m),
      sourceModelId: str(m.sourceModelId),
      targetModelId: str(m.targetModelId),
      rules: nested(m.rules).map((r) => ({
        id: r.id,
        sourceFieldId: str(r.sourceFieldId),
        targetFieldId: str(r.targetFieldId),
      })),
      customCodeId: str(m.customCodeId),
    })),

    customCodes: store.all('customCodes').map((c) => ({
      id: c.id,
      name: name(c),
      usedElementIds: asList(c.usedElementIds),
    })),

    buttonGroups: store.all('buttonGroups').map((g) => ({
      id: g.id,
      name: name(g),
      buttons: nested(g.buttons).map((b) => ({
        id: b.id,
        label: str(b.label),
        useCaseId: str(b.useCaseId),
        apiId: str(b.apiId),
        apiOperationId: str(b.operationId),
        mappingId: str(b.mappingId),
      })),
      groupIds: asList(g.groupIds),
    })),

    transformations: store.all('transformations').map((t) => ({
      id: t.id,
      name: name(t),
      inputs: nested(t.inputs).map(ref),
      output: t.output ? ref(t.output as Element) : null,
      customCodeId: str(t.customCodeId),
    })),

    uis: store.all('uis').map((ui) => ({
      id: ui.id,
      name: name(ui),
      boundedContextId: str(ui.boundedContextId),
      appIds: asList(ui.appIds),
      pageIds: asList(ui.pageIds),
      actorIds: asList(ui.actorIds),
    })),
  };
}

/**
 * The page's form as the designer sees it: the viewmodel's fields, ordered by the page's
 * configs — configured ones first, in config order — each merged with its config.
 *
 * The order lives in the configs and the fields live in the model, so neither alone is the
 * answer. A page with no viewmodel has no form to speak of.
 */
function viewmodelFields(store: ModelStore, page: Element): ModuxModel['pages'] extends
  (infer P)[] ? NonNullable<P extends { viewmodelFields?: infer F } ? F : never> : never {
  const model = store.get('models', str(page.modelId));
  if (!model) return [] as never;
  const fields = nested(model.fields) as Element[];
  // hand-authored YAML often declares a field by name only; the name is its identity then
  const byKey = new Map(fields.map((f) => [String(f.id ?? f.name), f]));
  const configs = nested(page.fieldConfigs) as Element[];
  const configByKey = new Map<string, Element>();
  for (const config of configs) {
    const key = String(config.fieldId);
    if (!configByKey.has(key)) configByKey.set(key, config);
  }
  const order = [
    ...configs.map((c) => String(c.fieldId)).filter((k) => byKey.has(k)),
    ...[...byKey.keys()],
  ].filter((key, index, all) => all.indexOf(key) === index);

  return order.map((key) => {
    const field = byKey.get(key)!;
    const config = configByKey.get(key);
    return {
      id: key,
      name: name(field),
      type: fieldType(field),
      stereotype: str(config?.stereotype),
      colspan: config?.colspan as number | undefined,
      label: str(config?.label),
      help: str(config?.help),
    };
  }) as never;
}

/** What the designer shows as a field's type: its basic type, or what kind of reference it is. */
function fieldType(field: Element): string {
  if (field.basicType) return String(field.type ?? 'string');
  if (field.isEnum) return 'ENUM';
  return 'MODEL';
}

/** A menu is a forest all the way down, and the editor draws it as one. */
function menu(items: Element[]): ModuxModel['uiApps'] extends (infer A)[]
  ? NonNullable<A extends { menuItems?: infer M } ? M : never> : never {
  return items.map((item) => ({
    id: str(item.id),
    label: str(item.label) ?? '',
    icon: str(item.icon),
    pageId: str(item.pageId),
    uiAdapterId: str(item.uiAdapterId),
    useCaseId: str(item.useCaseId),
    aggregateId: str(item.aggregateId),
    queryServiceId: str(item.queryServiceId),
    queryOperationId: str(item.queryOperationId),
    children: menu(nested(item.children) as Element[]),
  })) as never;
}

const buttons = (bar: Element[], where: string) => bar.map((b) => ({
  label: str(b.label) ?? '',
  useCaseId: str(b.useCaseId),
  mappingId: str(b.mappingId),
  bar: where,
}));

const ref = (r: Element) => ({ modelId: String(r.modelId), fieldId: str(r.fieldId) ?? null });

const name = (element: Element) => str(element.name) ?? element.id;
const str = (value: unknown) => (typeof value === 'string' && value ? value : undefined);
