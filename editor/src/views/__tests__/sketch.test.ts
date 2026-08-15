import { describe, it, expect } from 'vitest';
import { contextMapScene, rollupOwnershipIndex } from '../context-map.js';
import { baseModel } from './fixtures.js';
import type { ModuxModel } from '../../model.js';

/**
 * Two kinds of relation, told apart structurally:
 *  - FACT: touches a concrete artifact (an API here) → real coupling, solid, rolls up.
 *  - INTENT: a line between two strategic containers, no artifact → a top-down sketch.
 * A sketch with no fact behind it renders PROPOSED (dashed); one a fact realizes is BACKED (merged).
 */
const model = (over: Partial<ModuxModel> = {}): ModuxModel =>
  baseModel({
    boundedContexts: [
      { id: 'bc-a', name: 'A' } as never,
      { id: 'bc-b', name: 'B', domainServices: [{ id: 'ds-b', name: 'Svc' }] } as never,
    ],
    apis: [{ id: 'api-x', name: 'X', operations: [] }] as never,
    apiImplementations: [{ apiId: 'api-x', boundedContextId: 'bc-a' }] as never,
    ...over,
  });

describe('sketch (intent) vs fact', () => {
  it('classifies a context→context line as intent and draws it proposed (dashed)', () => {
    const m = model({ archimateRelations: [{ id: 'r', sourceId: 'bc-a', targetId: 'bc-b', type: 'serving' }] as never });
    const scene = contextMapScene(m, { 'bc-a': { x: 0, y: 0 }, 'bc-b': { x: 300, y: 0 } });
    const edge = scene.edges.find((e) => e.id === 'archi:r')!;
    expect(edge.nature).toBe('intent');
    expect(edge.dashArray).toBe('6 4');
    expect(edge.faint).toBe(true);
  });

  it('classifies a relation touching an API as a fact (solid)', () => {
    const m = model({ archimateRelations: [{ id: 'r', sourceId: 'api-x', targetId: 'ds-b', type: 'serving' }] as never });
    const scene = contextMapScene(m, { 'bc-a': { x: 0, y: 0 }, 'bc-b': { x: 300, y: 0 } }, {}, new Set(['bc-b']));
    const edge = scene.edges.find((e) => e.id === 'archi:r')!;
    expect(edge.nature).toBe('fact');
    expect(edge.dashArray).toBeUndefined();
  });

  it('drops a backed sketch: the rolled-up fact stands for it (one line)', () => {
    // intent bc-a→bc-b AND a fact api-x→ds-b that, with api-x folded away, rolls up to bc-a→bc-b.
    const full = model({
      archimateRelations: [
        { id: 'sk', sourceId: 'bc-a', targetId: 'bc-b', type: 'serving' },
        { id: 'ft', sourceId: 'api-x', targetId: 'ds-b', type: 'serving' },
      ] as never,
    });
    const scoped: ModuxModel = { ...full, apis: [] }; // container view filtered the API away
    const scene = contextMapScene(
      scoped, { 'bc-a': { x: 0, y: 0 }, 'bc-b': { x: 300, y: 0 } }, {}, new Set(), false,
      rollupOwnershipIndex(full),
    );
    // the sketch is gone (backed) …
    expect(scene.edges.find((e) => e.id === 'archi:sk')).toBeUndefined();
    // … and a solid fact now connects the same pair.
    const fact = scene.edges.find((e) => e.kind === 'archimate-relation' && e.sourceId === 'bc-a' && e.targetId === 'bc-b');
    expect(fact).toBeTruthy();
    expect(fact!.dashArray).toBeUndefined();
  });

  it('treats a landscape line (actor→system) as intent, like system→external', () => {
    const m = baseModel({
      systems: [{ id: 'sys', name: 'RIU' }],
      actors: [{ id: 'act', name: 'Cliente' }],
      externalSystems: [{ id: 'ext', name: 'ixo' }],
      archimateRelations: [
        { id: 'a', sourceId: 'act', targetId: 'sys', type: 'serving' },
        { id: 'b', sourceId: 'sys', targetId: 'ext', type: 'serving' },
      ] as never,
    });
    const scene = contextMapScene(m, { sys: { x: 0, y: 0 }, act: { x: -200, y: 0 }, ext: { x: 200, y: 0 } });
    // both are top-down sketches → both proposed (dashed), not one solid and one dashed
    expect(scene.edges.find((e) => e.id === 'archi:a')?.nature).toBe('intent');
    expect(scene.edges.find((e) => e.id === 'archi:b')?.nature).toBe('intent');
  });

  it('honours the escape hatch: nature:fact forces a context→context to be real', () => {
    const m = model({ archimateRelations: [{ id: 'r', sourceId: 'bc-a', targetId: 'bc-b', type: 'serving', nature: 'fact' }] as never });
    const scene = contextMapScene(m, { 'bc-a': { x: 0, y: 0 }, 'bc-b': { x: 300, y: 0 } });
    const edge = scene.edges.find((e) => e.id === 'archi:r')!;
    expect(edge.nature).toBe('fact');
    expect(edge.dashArray).toBeUndefined();
  });
});
