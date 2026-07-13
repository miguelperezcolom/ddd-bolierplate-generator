import { describe, it, expect } from 'vitest';
import { contextMapScene } from '../context-map.js';
import { baseModel } from './fixtures.js';

const strategicModel = () =>
  baseModel({
    boundedContexts: [
      {
        id: 'mod-reservas',
        name: 'Reservas',
        subdomainType: 'CORE',
        useCases: [{ id: 'uc-book', name: 'Reservar' }],
        domainEvents: [],
      },
      { id: 'mod-facturas', name: 'Facturación', subdomainType: 'SUPPORTING' },
    ],
    aggregates: [{ id: 'agg-reserva', name: 'Reserva', boundedContextId: 'mod-reservas' }],
    externalSystems: [{ id: 'ext-pms', name: 'PMS' }],
    relations: [
      {
        sourceId: 'mod-reservas',
        targetId: 'mod-facturas',
        type: null,
        inferredType: 'CUSTOMER_SUPPLIER',
        declared: false,
        reasons: 'llamada a Facturar',
      },
    ],
  });

describe('contextMapScene — contexts level (the strategic map)', () => {
  const scene = contextMapScene(strategicModel(), {}, 'contexts');

  it('shows contexts and external systems only — no aggregates, no use cases', () => {
    const ids = scene.nodes.map((n) => n.id);
    expect(ids).toContain('mod-reservas');
    expect(ids).toContain('mod-facturas');
    expect(ids).toContain('ext-pms');
    expect(ids).not.toContain('agg-reserva');
    expect(ids).not.toContain('uc-book');
  });

  it('badges the subdomain type', () => {
    const core = scene.nodes.find((n) => n.id === 'mod-reservas')!;
    expect(core.badge).toBe('CORE');
  });

  it('labels the inferred relation with ≈ABBREV (approximation, not annotation)', () => {
    const rel = scene.edges.find((e) => e.kind === 'relation')!;
    expect(rel.label).toMatch(/^≈/);
    expect(rel.tooltip).toContain('INFERIDO');
  });

  it('drops the ≈ when the pair is declared', () => {
    const m = strategicModel();
    m.relations[0] = { ...m.relations[0], type: 'CUSTOMER_SUPPLIER', declared: true };
    const s = contextMapScene(m, {}, 'contexts');
    const rel = s.edges.find((e) => e.kind === 'relation')!;
    expect(rel.label).not.toMatch(/^≈/);
  });
});

describe('contextMapScene — subsystems', () => {
  it('a subsystem never floats top-level: it lives inside its parent', () => {
    const model = baseModel({
      ...strategicModel(),
      externalSystems: [
        { id: 'ext-rumbo', name: 'Rumbo' },
        { id: 'ext-ventus', name: 'Ventus', parentExternalSystemId: 'ext-rumbo' },
      ],
    });
    // even without unfolding, the subsystem shows as a nested chip (coarse form) —
    // it is strategic, like a published API — and never as its own top-level box
    const scene = contextMapScene(model, {}, 'contexts');
    const sub = scene.nodes.find((n) => n.id === 'ext-ventus');
    expect(sub?.parentId).toBe('ext-rumbo');
    expect(sub?.kind).toBe('external-system');
  });

  it('a subsystem\'s published APIs show inside the parent box', () => {
    const model = baseModel({
      ...strategicModel(),
      externalSystems: [
        { id: 'ext-rumbo', name: 'Rumbo' },
        { id: 'ext-ventus', name: 'Ventus', parentExternalSystemId: 'ext-rumbo' },
      ],
      apis: [{ id: 'api-ventus', name: 'Ventus API', operations: [], publishedByExternalSystemId: 'ext-ventus' }],
    });
    const scene = contextMapScene(model, {}, 'contexts');
    const api = scene.nodes.find((n) => n.id === 'api-ventus');
    // the API neither floats top-level nor disappears: it is a chip in Rumbo's box
    expect(api?.parentId).toBe('ext-rumbo');
  });

  it('an orphaned parent reference falls back to top-level', () => {
    const model = baseModel({
      ...strategicModel(),
      externalSystems: [{ id: 'ext-ventus', name: 'Ventus', parentExternalSystemId: 'ext-gone' }],
    });
    const scene = contextMapScene(model, {}, 'contexts');
    expect(scene.nodes.find((n) => n.id === 'ext-ventus')).toBeDefined();
  });
});

describe('contextMapScene — detail level', () => {
  it('unfolds aggregates and use cases inside their context', () => {
    const scene = contextMapScene(strategicModel(), {}, 'detail');
    const agg = scene.nodes.find((n) => n.id === 'agg-reserva')!;
    expect(agg.parentId).toBe('mod-reservas');
    const uc = scene.nodes.find((n) => n.id === 'uc-book')!;
    expect(uc.parentId).toBe('mod-reservas');
  });
});

describe('contextMapScene — distribution level (pure topology)', () => {
  it('hides the strategic cast', () => {
    const scene = contextMapScene(strategicModel(), {}, 'distribution');
    const ids = scene.nodes.map((n) => n.id);
    expect(ids).not.toContain('ext-pms');
    expect(ids).not.toContain('agg-reserva');
  });

  it('keeps a single main module implicit — the context is the deployment target', () => {
    const model = baseModel({
      ...strategicModel(),
      modules: [
        { id: 'mod-reservas-main', name: 'Reservas', boundedContextId: 'mod-reservas', main: true },
      ],
      services: [{ id: 'svc-1', name: 'S1', moduleIds: ['mod-reservas-main'] }],
    });
    const scene = contextMapScene(model, {}, 'distribution');
    expect(scene.nodes.map((n) => n.id)).not.toContain('mod-reservas-main');
    const deploy = scene.edges.find((e) => e.kind === 'deploys')!;
    expect(deploy.targetId).toBe('mod-reservas');
    // the edge still remembers WHICH module it deploys, so Supr keeps working
    expect(deploy.id).toBe('deploy:svc-1->mod-reservas-main');
  });

  it('unfolds the module boxes as soon as a second module joins', () => {
    const model = baseModel({
      ...strategicModel(),
      modules: [
        { id: 'mod-reservas-main', name: 'Reservas', boundedContextId: 'mod-reservas', main: true },
        { id: 'mod-reservas-read', name: 'Reservas read', boundedContextId: 'mod-reservas' },
      ],
      services: [{ id: 'svc-1', name: 'S1', moduleIds: ['mod-reservas-main', 'mod-reservas-read'] }],
    });
    const scene = contextMapScene(model, {}, 'distribution');
    const ids = scene.nodes.map((n) => n.id);
    expect(ids).toContain('mod-reservas-main');
    expect(ids).toContain('mod-reservas-read');
    const deploys = scene.edges.filter((e) => e.kind === 'deploys');
    expect(deploys.map((e) => e.targetId).sort()).toEqual(['mod-reservas-main', 'mod-reservas-read']);
  });
});
