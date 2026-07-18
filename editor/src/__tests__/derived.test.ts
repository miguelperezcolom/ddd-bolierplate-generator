import { describe, expect, it } from 'vitest';
import { derivedElementIds, hideDerived, markDerived } from '../derived.js';
import type { ModuxModel } from '../model.js';
import type { Scene } from '../scene.js';

const model: ModuxModel = {
  boundedContexts: [
    {
      id: 'bc-reservas',
      name: 'Reservas',
      useCases: [
        { id: 'uc-crearReserva', name: 'CrearReserva', derived: true },
        { id: 'uc-realizar-checkin', name: 'RealizarCheckin' },
      ],
      queryServices: [{ id: 'qs-pagina-reservas', name: 'PaginaReservasQueries', derived: true }],
    },
  ],
} as ModuxModel;

const scene: Scene = {
  nodes: [
    { id: 'reserva', label: 'Reserva', x: 0, y: 0, w: 100, h: 60, kind: 'aggregate' },
    { id: 'uc-crearReserva', label: 'CrearReserva', x: 200, y: 0, w: 100, h: 60, kind: 'usecase' },
    { id: 'nota', label: 'nota', x: 400, y: 0, w: 80, h: 40, kind: 'note' },
  ],
  edges: [
    { id: 'e1', sourceId: 'uc-crearReserva', targetId: 'reserva', kind: 'call' },
    { id: 'e2', sourceId: 'nota', targetId: 'reserva', kind: 'thread' },
  ],
};

describe('derivedElementIds', () => {
  it('collects the ids the projection flags as derived', () => {
    expect(derivedElementIds(model)).toEqual(new Set(['uc-crearReserva', 'qs-pagina-reservas']));
  });
});

describe('markDerived', () => {
  it('tags only the nodes backing a derived element', () => {
    const marked = markDerived(scene, derivedElementIds(model));
    expect(marked.nodes.map((n) => !!n.derived)).toEqual([false, true, false]);
    // The input scene is left untouched.
    expect(scene.nodes[1].derived).toBeUndefined();
  });
});

describe('hideDerived', () => {
  it('drops derived nodes and the edges that touch them', () => {
    const hidden = hideDerived(markDerived(scene, derivedElementIds(model)));
    expect(hidden.nodes.map((n) => n.id)).toEqual(['reserva', 'nota']);
    expect(hidden.edges.map((e) => e.id)).toEqual(['e2']);
  });

  it('is a no-op when nothing is derived', () => {
    expect(hideDerived(scene)).toBe(scene);
  });
});
