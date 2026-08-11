import { describe, expect, it } from 'vitest';
import { kindFromViewFileName, viewFileName, VIEW_IDS } from '../view-kind.js';

describe('view type in the filename (source of truth)', () => {
  it('reads the type from the last dot-segment before the suffix', () => {
    expect(kindFromViewFileName('reservas.aggregates.modux-view.yaml')).toBe('aggregates');
    expect(kindFromViewFileName('reservas.context-map.modux-view.yaml')).toBe('context-map');
    expect(kindFromViewFileName('a.b.c.interactions.modux-view.yaml')).toBe('interactions');
  });

  it('returns null for a legacy name with no type segment, so callers fall back', () => {
    expect(kindFromViewFileName('reservas.modux-view.yaml')).toBeNull();
  });

  it('returns null when the segment is not a known type', () => {
    expect(kindFromViewFileName('reservas.nope.modux-view.yaml')).toBeNull();
  });

  it('returns null for a non-view file', () => {
    expect(kindFromViewFileName('reservas.yaml')).toBeNull();
  });

  it('round-trips every known type through the filename', () => {
    for (const kind of VIEW_IDS) {
      expect(kindFromViewFileName(viewFileName('reservas', kind))).toBe(kind);
    }
  });
});
