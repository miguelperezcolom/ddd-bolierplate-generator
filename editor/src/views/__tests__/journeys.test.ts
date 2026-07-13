import { describe, it, expect } from 'vitest';
import { journeyLegNumbers, journeyRuns } from '../../journeys.js';

describe('journeyLegNumbers', () => {
  it('numbers a linear journey 1, 2, 3', () => {
    const n = journeyLegNumbers({
      id: 'tr', name: 'T',
      legs: [
        { id: 'a', sourceId: 'x', targetId: 'y' },
        { id: 'b', sourceId: 'y', targetId: 'z', afterLegIds: ['a'] },
        { id: 'c', sourceId: 'z', targetId: 'w', afterLegIds: ['b'] },
      ],
    });
    expect([n.get('a'), n.get('b'), n.get('c')]).toEqual(['1', '2', '3']);
  });

  it('letters the branches: 2a and 2b after the same leg', () => {
    const n = journeyLegNumbers({
      id: 'tr', name: 'T',
      legs: [
        { id: 'a', sourceId: 'x', targetId: 'y' },
        { id: 'b1', sourceId: 'y', targetId: 'z', afterLegIds: ['a'] },
        { id: 'b2', sourceId: 'y', targetId: 'w', afterLegIds: ['a'] },
      ],
    });
    expect(n.get('a')).toBe('1');
    expect([n.get('b1'), n.get('b2')].sort()).toEqual(['2a', '2b']);
  });

  it('survives a cycle without hanging', () => {
    const n = journeyLegNumbers({
      id: 'tr', name: 'T',
      legs: [
        { id: 'a', sourceId: 'x', targetId: 'y', afterLegIds: ['b'] },
        { id: 'b', sourceId: 'y', targetId: 'x', afterLegIds: ['a'] },
      ],
    });
    expect(n.size).toBe(2);
  });
});

describe('journeyRuns', () => {
  it('a bifurcation yields one run per branch, sharing the trunk', () => {
    const runs = journeyRuns({
      id: 'tr', name: 'T',
      legs: [
        { id: 'a', sourceId: 'x', targetId: 'y' },
        { id: 'b1', sourceId: 'y', targetId: 'z', afterLegIds: ['a'] },
        { id: 'b2', sourceId: 'y', targetId: 'w', afterLegIds: ['a'] },
        { id: 'c', sourceId: 'z', targetId: 'v', afterLegIds: ['b1'] },
      ],
    });
    expect(runs).toContainEqual(['a', 'b1', 'c']);
    expect(runs).toContainEqual(['a', 'b2']);
    expect(runs).toHaveLength(2);
  });

  it('two roots tour as two separate runs', () => {
    const runs = journeyRuns({
      id: 'tr', name: 'T',
      legs: [
        { id: 'a', sourceId: 'x', targetId: 'y' },
        { id: 'b', sourceId: 'p', targetId: 'q' },
      ],
    });
    expect(runs).toHaveLength(2);
  });

  it('a converging entry drawn later still tours to the end (physical continuation)', () => {
    const runs = journeyRuns({
      id: 'tr-x', name: 'x',
      legs: [
        { id: 'leg-1', sourceId: 'metabuscador', targetId: 'proxy' },
        { id: 'leg-2', sourceId: 'proxy', targetId: 'api', afterLegIds: ['leg-1'] },
        { id: 'leg-3', sourceId: 'api', targetId: 'tridion', afterLegIds: ['leg-2'] },
        { id: 'leg-4', sourceId: 'tridion', targetId: 'nuevo-motor', afterLegIds: ['leg-3'] },
        { id: 'leg-5', sourceId: 'tridion', targetId: 'rumbo', afterLegIds: ['leg-3'] },
        { id: 'leg-6', sourceId: 'integradores', targetId: 'proxy' },
      ],
    });
    // desde integradores el viaje llega hasta nuevo motor y hasta rumbo
    expect(runs).toContainEqual(['leg-6', 'leg-2', 'leg-3', 'leg-4']);
    expect(runs).toContainEqual(['leg-6', 'leg-2', 'leg-3', 'leg-5']);
    // y desde el metabuscador, también
    expect(runs).toContainEqual(['leg-1', 'leg-2', 'leg-3', 'leg-4']);
    expect(runs).toContainEqual(['leg-1', 'leg-2', 'leg-3', 'leg-5']);
    expect(runs).toHaveLength(4);
  });
});
