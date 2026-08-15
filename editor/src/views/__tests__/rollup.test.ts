import { describe, it, expect } from 'vitest';
import { contextMapScene, rollupOwnershipIndex } from '../context-map.js';
import { baseModel } from './fixtures.js';
import type { ModuxModel } from '../../model.js';

/**
 * Roll-up: a relation drawn at a lower C4 level (an API a context implements, serving a component
 * inside another context) must SURFACE one level up, as an edge between the two contexts — even
 * though the scoped container view has filtered the API and the component nodes away.
 */
const full = (): ModuxModel =>
  baseModel({
    boundedContexts: [
      { id: 'bc-rumbo', name: 'Rumbo' } as never,
      { id: 'bc-rumbonet', name: 'RumboNet', domainServices: [{ id: 'ds-reservas', name: 'Reservas' }] } as never,
    ],
    apis: [{ id: 'api-jdbc', name: 'JDBC' }] as never,
    apiImplementations: [{ apiId: 'api-jdbc', boundedContextId: 'bc-rumbo' }] as never,
    archimateRelations: [
      { id: 'ar1', sourceId: 'api-jdbc', targetId: 'ds-reservas', type: 'serving' },
    ] as never,
  });

// The container view: only the two contexts survive scoping; the API is gone from the model.
const scoped = (): ModuxModel => ({ ...full(), apis: [] });
const nodes = { 'bc-rumbo': { x: 0, y: 0 }, 'bc-rumbonet': { x: 400, y: 0 } };

describe('roll-up of lower-level relations', () => {
  it('homes an API in its implementing context', () => {
    expect(rollupOwnershipIndex(full()).get('api-jdbc')).toBe('bc-rumbo');
  });

  it('surfaces api→component serving as context→context in the scoped view', () => {
    const scene = contextMapScene(scoped(), nodes, {}, new Set(), false, rollupOwnershipIndex(full()));
    const edge = scene.edges.find(
      (e) => e.kind === 'archimate-relation' && e.sourceId === 'bc-rumbo' && e.targetId === 'bc-rumbonet',
    );
    expect(edge).toBeTruthy();
  });

  it('a composition makes the whole own the part, so the part’s relations roll up to it', () => {
    const m = baseModel({
      systems: [{ id: 'whole', name: 'Whole' }, { id: 'part', name: 'Part' }],
      actors: [{ id: 'act', name: 'A' }],
      archimateRelations: [
        { id: 'comp', sourceId: 'whole', targetId: 'part', type: 'composition' },
        { id: 'rel', sourceId: 'part', targetId: 'act', type: 'serving' },
      ] as never,
    });
    // the part is owned by the whole for roll-up
    expect(rollupOwnershipIndex(m).get('part')).toBe('whole');
    // scoped view WITHOUT the part (dropped from the view): its relation re-anchors to the whole
    const scoped: ModuxModel = { ...m, systems: (m.systems ?? []).filter((s) => s.id !== 'part') };
    const scene = contextMapScene(
      scoped, { whole: { x: 0, y: 0 }, act: { x: 300, y: 0 } }, {}, new Set(), false, rollupOwnershipIndex(m),
    );
    expect(scene.edges.some((e) => e.kind === 'archimate-relation' && e.sourceId === 'whole' && e.targetId === 'act')).toBe(true);
  });

  it('drops the edge without the roll-up index (nothing to anchor the filtered API to)', () => {
    const scene = contextMapScene(scoped(), nodes, {}, new Set(), false);
    const edge = scene.edges.find(
      (e) => e.kind === 'archimate-relation' && e.sourceId === 'bc-rumbo' && e.targetId === 'bc-rumbonet',
    );
    expect(edge).toBeFalsy();
  });
});
