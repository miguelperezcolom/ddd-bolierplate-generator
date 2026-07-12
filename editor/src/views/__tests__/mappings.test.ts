import { describe, it, expect } from 'vitest';
import { mappingsScene, fieldNodeId, parseFieldNodeId } from '../mappings.js';
import { baseModel } from './fixtures.js';

const mappingModel = () =>
  baseModel({
    models: [
      { id: 'm-in', name: 'ReservaExterna', fields: [{ id: 'f-code', name: 'code' }] },
      { id: 'm-out', name: 'Reserva', fields: [{ id: 'f-id', name: 'id' }] },
    ],
    modelMappings: [
      {
        id: 'map-1',
        name: 'Externa2Reserva',
        sourceModelId: 'm-in',
        targetModelId: 'm-out',
        rules: [{ id: 'r1', sourceFieldId: 'f-code', targetFieldId: 'f-id' }],
      },
    ],
  });

describe('field node ids', () => {
  it('round-trips through the composite id', () => {
    const id = fieldNodeId('m-in', 'f-code');
    expect(parseFieldNodeId(id)).toEqual({ modelId: 'm-in', fieldId: 'f-code' });
  });

  it('rejects ids that are not field nodes', () => {
    expect(parseFieldNodeId('m-in')).toBeNull();
  });
});

describe('mappingsScene', () => {
  const scene = mappingsScene(mappingModel(), {});

  it('draws both models with their fields nested', () => {
    expect(scene.nodes.find((n) => n.id === 'm-in')).toBeTruthy();
    expect(scene.nodes.find((n) => n.id === fieldNodeId('m-in', 'f-code'))?.parentId).toBe('m-in');
  });

  it('wires the field-to-field rule between the two fields', () => {
    expect(
      scene.edges.some(
        (e) =>
          e.sourceId === fieldNodeId('m-in', 'f-code') &&
          e.targetId === fieldNodeId('m-out', 'f-id'),
      ),
    ).toBe(true);
  });
});
