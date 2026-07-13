import { describe, it, expect } from 'vitest';
import { journeyLegNumbers } from '../../journeys.js';

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
