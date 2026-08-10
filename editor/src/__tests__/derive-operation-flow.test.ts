import { describe, expect, it } from 'vitest';
import {
  deriveOperationFlow, flowNodeCount, type OperationStep,
} from '../derive-operation-flow.js';

describe('deriveOperationFlow', () => {
  it('reads a linear body as an ordered list of categorised nodes', () => {
    const steps: OperationStep[] = [
      { type: 'CheckPrecondition', name: 'guard', condition: 'estaPendiente' },
      { type: 'SetField', name: 'set', fieldName: 'estado', value: 'CONFIRMADA' },
      { type: 'PublishDomainEvent', name: 'ReservaConfirmada' },
    ];

    const flow = deriveOperationFlow(steps);

    expect(flow.map((n) => n.category)).toEqual(['guard', 'mutation', 'event']);
    expect(flow[0].label).toBe('precondition: estaPendiente');
    expect(flow[1].label).toBe('set estado = CONFIRMADA');
    expect(flow[2].label).toBe('emit ReservaConfirmada');
  });

  it('nests control flow as labelled branches', () => {
    const steps: OperationStep[] = [
      {
        type: 'ForEach', itemVar: 'h', collection: 'habitaciones',
        body: [
          {
            type: 'If', condition: 'h.ocupada',
            then: [{ type: 'CallAggregateOperation', name: 'liberar' }],
            else: [{ type: 'Custom', name: 'mark', intent: 'marcar libre' }],
          },
        ],
      },
    ];

    const flow = deriveOperationFlow(steps);

    expect(flow).toHaveLength(1);
    const forEach = flow[0];
    expect(forEach.category).toBe('control');
    expect(forEach.label).toBe('for (h : habitaciones)');
    expect(forEach.branches.map((b) => b.label)).toEqual(['body']);

    const ifNode = forEach.branches[0].nodes[0];
    expect(ifNode.label).toBe('if (h.ocupada)');
    expect(ifNode.branches.map((b) => b.label)).toEqual(['then', 'else']);
    expect(ifNode.branches[0].nodes[0].label).toBe('CallAggregateOperation liberar');
    expect(ifNode.branches[1].nodes[0].label).toBe('custom: marcar libre');
  });

  it('gives every node a stable positional id and counts the whole tree', () => {
    const steps: OperationStep[] = [
      { type: 'ForEach', itemVar: 'x', collection: 'xs', body: [{ type: 'Custom', name: 'a' }] },
      { type: 'CheckPrecondition', condition: 'ok' },
    ];

    const flow = deriveOperationFlow(steps);

    expect(flow[0].id).toBe('op/0');
    expect(flow[0].branches[0].nodes[0].id).toBe('op/0/body/0');
    expect(flowNodeCount(flow)).toBe(3);
  });

  it('is empty for an operation with no steps', () => {
    expect(deriveOperationFlow(undefined)).toEqual([]);
    expect(deriveOperationFlow([])).toEqual([]);
  });
});
