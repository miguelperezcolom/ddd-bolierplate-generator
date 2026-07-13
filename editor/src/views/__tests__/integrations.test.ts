import { describe, it, expect } from 'vitest';
import { integrationsScene } from '../integrations.js';
import { baseModel } from './fixtures.js';

const etlModel = () =>
  baseModel({
    boundedContexts: [{ id: 'mod-reservas', name: 'Reservas' }],
    externalSystems: [
      { id: 'ext-pms', name: 'PMS', tables: [{ id: 'tbl-rooms', name: 'ROOMS' }] },
    ],
    etlFlows: [
      {
        id: 'etl-noche',
        name: 'Carga nocturna',
        ownerBoundedContextId: 'mod-reservas',
        steps: [
          { id: 'st-pull', name: 'Leer ROOMS', type: 'SOURCE_TABLE', externalTableId: 'tbl-rooms' },
          { id: 'st-map', name: 'Normalizar', type: 'TRANSFORM' },
          { id: 'st-write', name: 'Publicar', type: 'WRITE_EVENT', eventId: 'ev-loaded' },
        ],
      },
    ],
  });

describe('integrationsScene', () => {
  const scene = integrationsScene(etlModel(), {});

  it('draws the integrator as a container with its steps inside', () => {
    const flow = scene.nodes.find((n) => n.id === 'etl-noche')!;
    expect(flow.kind).toBe('etl-flow');
    for (const stepId of ['st-pull', 'st-map', 'st-write']) {
      expect(scene.nodes.find((n) => n.id === stepId)?.parentId).toBe('etl-noche');
    }
  });

  it('lays the pipeline out by phase: source < transform < write', () => {
    const x = (id: string) => scene.nodes.find((n) => n.id === id)!.x;
    expect(x('st-pull')).toBeLessThan(x('st-map'));
    expect(x('st-map')).toBeLessThan(x('st-write'));
  });

  it('surfaces the external system with the table the pipeline reads', () => {
    const ids = scene.nodes.map((n) => n.id);
    expect(ids).toContain('ext-pms');
    expect(ids).toContain('tbl-rooms');
  });

  it('wires the read: table → source step, ids matching the context map convention', () => {
    expect(
      scene.edges.some((e) => e.id.startsWith('etl:etl-noche:st-pull')),
    ).toBe(true);
  });
});
