/**
 * That the projection answers for everything the editor's model declares.
 *
 * This exists because it did not, and the failure was silent: the projection covered 39 of the 67
 * fields of `ModuxModel`, so the views that read the other 28 — the APIs, the views, and fourteen
 * lists of EDGES — drew nothing at all and said nothing about it. An empty canvas looks exactly
 * like a model with nothing in it.
 *
 * The list is read from `model.ts` at test time rather than restated here, which is the whole
 * point: a field added to the model with nobody projecting it fails HERE, not in front of a user
 * staring at a blank view.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { project } from '../project.js';
import { ModelStore, type Element } from '../store.js';

/** Every field `ModuxModel` declares. */
function declaredFields(): string[] {
  const source = readFileSync(fileURLToPath(new URL('../../model.ts', import.meta.url)), 'utf8');
  const start = source.indexOf('export interface ModuxModel');
  const body = source.slice(start, source.indexOf('\n}', start));
  return [...body.matchAll(/^ {2}([a-zA-Z]+)\??:/gm)].map((m) => m[1]);
}

describe('the projection covers the model', () => {
  it('emits every field the editor can read', () => {
    const emitted = new Set(Object.keys(project(ModelStore.from({}))));

    const missing = declaredFields().filter((field) => !emitted.has(field));

    expect(missing).toEqual([]);
  });

  /** An empty model must still answer for every field: absent and empty are different things. */
  it('answers with an empty list rather than nothing at all', () => {
    const model = project(ModelStore.from({})) as unknown as Record<string, unknown>;

    for (const field of declaredFields()) {
      expect(model[field], `${field} is missing from an empty projection`).toBeDefined();
    }
  });
});

describe('the edges, which are not stored anywhere', () => {
  /** A model with one of every kind of edge, drawn the way the store actually keeps them. */
  const wired = () => ModelStore.from({
    boundedContexts: [{
      id: 'bc-res', name: 'Reservas',
      aggregateIds: ['agg-reserva'], useCaseIds: ['uc-reservar'], projectionIds: ['proj-1'],
      acls: [{
        id: 'acl-1', externalSystem: 'ext-ota', direction: 'INBOUND',
        translatedUseCaseIds: ['uc-reservar'],
      }],
    }],
    aggregates: [{
      id: 'agg-reserva', name: 'Reserva', modelId: 'm-reserva',
      operations: [{ id: 'op-1', name: 'confirmar', emits: 'ReservaCreada' }],
    }],
    domainEvents: [{ id: 'ev-creada', name: 'ReservaCreada' }],
    applicationEvents: [{ id: 'ev-app', name: 'ReservaVista' }],
    useCases: [{
      id: 'uc-reservar', name: 'Reservar',
      steps: [
        { id: 's1', type: 'CallAggregateOperation', aggregateId: 'agg-reserva', operationId: 'op-1' },
        { id: 's2', type: 'CallUseCase', useCaseId: 'uc-cobrar' },
        { id: 's3', type: 'CallQueryService', queryServiceId: 'qs-dispo' },
        { id: 's4', type: 'CallExternalUseCase', externalUseCaseId: 'ext-uc-1' },
        { id: 's5', type: 'PublishDomainEvent', domainEventId: 'ev-creada' },
        { id: 's6', type: 'PublishApplicationEvent', applicationEventId: 'ev-app' },
      ],
    }],
    roles: [{
      id: 'act-1', name: 'Agente',
      allowedUseCaseIds: ['uc-reservar'], allowedQueryServiceIds: ['qs-dispo'],
      externalSystemIds: ['ext-ota'],
    }],
    externalSystems: [{
      id: 'ext-ota', name: 'OTA',
      dependsOnExternalSystemIds: ['ext-pms'], cqrsExternalSystemIds: ['ext-dwh'],
      apiOperationUses: [{ id: 'u1', operationId: 'op-book', siteId: 'api-1' }],
    }],
    apis: [{
      id: 'api-1', name: 'Booking',
      operations: [{ id: 'op-book', name: 'book', httpMethod: 'POST', targetUseCaseId: 'uc-reservar' }],
      implementedByBoundedContextIds: ['bc-res'],
      operationImplementations: [{ id: 'w1', operationId: 'op-book', boundedContextId: 'bc-res', useCaseId: 'uc-reservar' }],
    }],
    proxyApis: [{
      id: 'px-1', name: 'Proxy', targetApiId: 'api-1',
      operationRoutes: [{ id: 'r1', operationId: 'op-book', targetSiteId: 'bc-res' }],
    }],
    projections: [{ id: 'proj-1', name: 'Dispo', readModelId: 'rm-1' }],
    readModels: [{ id: 'rm-1', name: 'DisponibilidadView' }],
    models: [{ id: 'm-reserva', name: 'Reserva', fields: [{ id: 'f-1', name: 'cliente', modelId: 'm-cliente' }] }],
  });

  const edge = (model: Record<string, any>, field: string) => model[field];

  it('turns a use case’s steps into the calls it makes', () => {
    const model = project(wired()) as Record<string, any>;

    expect(edge(model, 'aggregateCalls')).toEqual([{ sourceId: 'uc-reservar', targetId: 'agg-reserva' }]);
    expect(edge(model, 'useCaseCalls')).toEqual([{ sourceId: 'uc-reservar', targetId: 'uc-cobrar' }]);
    expect(edge(model, 'queryCalls')).toEqual([{ sourceId: 'uc-reservar', targetId: 'qs-dispo' }]);
    expect(edge(model, 'externalUseCaseCalls')).toEqual([{ sourceId: 'uc-reservar', targetId: 'ext-uc-1' }]);
  });

  /** `emits` names the event; the canvas needs its id, so the name has to be resolved. */
  it('resolves an operation’s emitted event NAME back to its id', () => {
    const model = project(wired()) as Record<string, any>;

    expect(edge(model, 'emissions')).toEqual(expect.arrayContaining([
      { sourceId: 'agg-reserva', domainEventId: 'ev-creada' },
      { sourceId: 'uc-reservar', domainEventId: 'ev-app' },
    ]));
    expect(edge(model, 'useCaseEmissions'))
      .toEqual([{ sourceId: 'uc-reservar', domainEventId: 'ev-creada' }]);
  });

  it('reads the inbound ACLs as external systems calling ours', () => {
    const model = project(wired()) as Record<string, any>;

    expect(edge(model, 'externalCalls'))
      .toEqual([{ externalSystemId: 'ext-ota', useCaseId: 'uc-reservar' }]);
  });

  /** A CQRS edge is a different claim from a plain dependency, so it keeps its type. */
  it('keeps a CQRS dependency apart from a plain one', () => {
    const model = project(wired()) as Record<string, any>;

    expect(edge(model, 'externalSystemDependencies')).toEqual([
      { sourceId: 'ext-ota', targetId: 'ext-pms', type: 'DEPENDS' },
      { sourceId: 'ext-ota', targetId: 'ext-dwh', type: 'CQRS' },
    ]);
  });

  it('flattens what an actor may reach', () => {
    const model = project(wired()) as Record<string, any>;

    expect(edge(model, 'actorUses')).toEqual([
      { actorId: 'act-1', targetId: 'uc-reservar' },
      { actorId: 'act-1', targetId: 'qs-dispo' },
    ]);
    expect(edge(model, 'actorExternalDependencies'))
      .toEqual([{ actorId: 'act-1', externalSystemId: 'ext-ota' }]);
  });

  it('projects where an API is implemented and how a proxy routes to it', () => {
    const model = project(wired()) as Record<string, any>;

    expect(edge(model, 'apiImplementations')).toEqual([{ apiId: 'api-1', boundedContextId: 'bc-res' }]);
    expect(edge(model, 'apiOperationImplementations')).toEqual([
      { apiId: 'api-1', operationId: 'op-book', boundedContextId: 'bc-res', useCaseId: 'uc-reservar' },
    ]);
    expect(edge(model, 'proxyOperationRoutes')).toEqual([
      { proxyId: 'px-1', operationId: 'op-book', targetSiteId: 'bc-res' },
    ]);
    expect(edge(model, 'externalOperationUses')).toEqual([
      { externalSystemId: 'ext-ota', operationId: 'op-book', siteId: 'api-1' },
    ]);
  });

  it('resolves a projection’s read model to its name, and its owning context', () => {
    const model = project(wired()) as Record<string, any>;

    expect(model.projections[0]).toMatchObject({
      id: 'proj-1', readModelName: 'DisponibilidadView', boundedContextId: 'bc-res',
    });
  });

  /** A step carries its targets now — without them there is no edge to draw. */
  it('gives each step the refs the edges are read from', () => {
    const model = project(wired());
    const step = model.boundedContexts[0].useCases![0].steps![0] as Element;

    expect(step).toMatchObject({ aggregateId: 'agg-reserva', operationId: 'op-1' });
  });
});
