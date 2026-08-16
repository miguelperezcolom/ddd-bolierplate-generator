import { describe, it, expect } from 'vitest';
import { contextMapScene, distributionScene, rollupOwnershipIndex } from '../context-map.js';
import { baseModel } from './fixtures.js';
import type { ModuxModel } from '../../model.js';

/**
 * A first-class `system` GROUPS bounded contexts (C4: System Landscape → System → Container).
 * It renders as a container (contexts nest inside on expand), and — the headline — a coupling
 * drawn deep inside one system rolls up to a SYSTEM→SYSTEM edge at the landscape level.
 */
const grouped = (): ModuxModel =>
  baseModel({
    systems: [
      { id: 'sys-riu', name: 'RIU' },
      { id: 'sys-third', name: 'Tercero' },
    ],
    boundedContexts: [
      { id: 'bc-net', name: 'RumboNet', parentSystemId: 'sys-riu', domainServices: [{ id: 'ds-res', name: 'Reservas' }] } as never,
      { id: 'bc-rumbo', name: 'Rumbo', parentSystemId: 'sys-riu' } as never,
      { id: 'bc-far', name: 'Lejano', parentSystemId: 'sys-third' } as never,
    ],
    apis: [{ id: 'api-jdbc', name: 'JDBC', operations: [] }] as never,
    apiImplementations: [{ apiId: 'api-jdbc', boundedContextId: 'bc-far' }] as never,
    archimateRelations: [{ id: 'ar1', sourceId: 'api-jdbc', targetId: 'ds-res', type: 'serving' }] as never,
  });

describe('system grouping element', () => {
  it('renders a system as one collapsed node, its contexts hidden from the top level', () => {
    const scene = contextMapScene(grouped(), { 'sys-riu': { x: 0, y: 0 }, 'sys-third': { x: 400, y: 0 } });
    expect(scene.nodes.find((n) => n.id === 'sys-riu')?.kind).toBe('system');
    // grouped contexts do NOT appear top-level while the system is collapsed
    expect(scene.nodes.find((n) => n.id === 'bc-net')).toBeUndefined();
  });

  it('nests its contexts as container children when expanded', () => {
    const scene = contextMapScene(grouped(), { 'sys-riu': { x: 0, y: 0 } }, {}, new Set(['sys-riu']));
    const ctx = scene.nodes.find((n) => n.id === 'bc-net');
    expect(ctx?.kind).toBe('boundedContext');
    expect(ctx?.resizable).toBe(true);
    expect(scene.edges.some((e) => e.kind === 'contains' && e.sourceId === 'sys-riu' && e.targetId === 'bc-net')).toBe(true);
  });

  it('still shows grouped contexts top-level in the distribution lens', () => {
    const scene = distributionScene(grouped(), { 'bc-net': { x: 0, y: 0 } });
    expect(scene.nodes.find((n) => n.id === 'bc-net')?.kind).toBe('boundedContext');
    expect(scene.nodes.find((n) => n.id === 'sys-riu')).toBeUndefined();
  });

  it('homes a context in its system for roll-up', () => {
    expect(rollupOwnershipIndex(grouped()).get('bc-net')).toBe('sys-riu');
  });

  it('rolls a deep cross-system coupling up to a system→system edge at the landscape level', () => {
    // Landscape view: only the two systems survive scoping; API and component nodes are gone.
    const scoped: ModuxModel = { ...grouped(), apis: [] };
    const scene = contextMapScene(
      scoped,
      { 'sys-riu': { x: 0, y: 0 }, 'sys-third': { x: 400, y: 0 } },
      {},
      new Set(),
      false,
      rollupOwnershipIndex(grouped()),
    );
    const edge = scene.edges.find(
      (e) => e.kind === 'archimate-relation' && e.sourceId === 'sys-third' && e.targetId === 'sys-riu',
    );
    expect(edge).toBeTruthy();
  });
});
