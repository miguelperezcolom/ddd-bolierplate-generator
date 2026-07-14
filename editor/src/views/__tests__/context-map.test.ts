import { describe, it, expect } from 'vitest';
import { contextMapScene, distributionScene } from '../context-map.js';
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

describe('contextMapScene — everything folds to chips by default', () => {
  const scene = contextMapScene(strategicModel(), {});

  it('shows contexts and external systems as chips — no aggregates, no use cases', () => {
    const ids = scene.nodes.map((n) => n.id);
    expect(ids).toContain('mod-reservas');
    expect(ids).toContain('mod-facturas');
    expect(ids).toContain('ext-pms');
    expect(ids).not.toContain('agg-reserva');
    expect(ids).not.toContain('uc-book');
  });

  it('a context with content wears the chevron (it hides more)', () => {
    const core = scene.nodes.find((n) => n.id === 'mod-reservas')!;
    expect(core.collapsible).toBe(true);
    expect(core.collapsed).toBe(true);
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
    const s = contextMapScene(m, {});
    const rel = s.edges.find((e) => e.kind === 'relation')!;
    expect(rel.label).not.toMatch(/^≈/);
  });
});

describe('contextMapScene — per-element expansion', () => {
  it('an expanded context unfolds its aggregates and use cases', () => {
    const scene = contextMapScene(strategicModel(), {}, {}, new Set(['mod-reservas']));
    const agg = scene.nodes.find((n) => n.id === 'agg-reserva')!;
    expect(agg.parentId).toBe('mod-reservas');
    const uc = scene.nodes.find((n) => n.id === 'uc-book')!;
    expect(uc.parentId).toBe('mod-reservas');
    // the neighbour stays folded: expansion is per element, not global
    const other = scene.nodes.find((n) => n.id === 'mod-facturas')!;
    expect(scene.nodes.some((n) => n.parentId === 'mod-facturas')).toBe(false);
    expect(other.w).toBeLessThan(200);
  });

  it('an expanded API unfolds its operations; a folded one stays a chip', () => {
    const model = baseModel({
      ...strategicModel(),
      apis: [
        { id: 'api-a', name: 'A', operations: [{ id: 'op-1', name: 'op1' }] },
        { id: 'api-b', name: 'B', operations: [{ id: 'op-2', name: 'op2' }] },
      ],
    });
    const scene = contextMapScene(model, {}, {}, new Set(['api-a']));
    expect(scene.nodes.find((n) => n.id === 'op-1')?.parentId).toBe('api-a');
    expect(scene.nodes.find((n) => n.id === 'op-2')).toBeUndefined();
    const b = scene.nodes.find((n) => n.id === 'api-b')!;
    expect(b.collapsible).toBe(true);
    expect(b.collapsed).toBe(true);
  });

  it('cascade: an API published by an expanded system expands on its own into operations', () => {
    const model = baseModel({
      ...strategicModel(),
      externalSystems: [{ id: 'ext-pms', name: 'PMS' }],
      apis: [{
        id: 'api-pms', name: 'PMS API',
        operations: [{ id: 'op-pms', name: 'consulta' }],
        publishedByExternalSystemId: 'ext-pms',
      }],
    });
    // system folded to coarse chip: the API rides as a chip with its chevron
    const coarse = contextMapScene(model, {});
    const chip = coarse.nodes.find((n) => n.id === 'api-pms')!;
    expect(chip.parentId).toBe('ext-pms');
    expect(chip.collapsible).toBe(true);
    expect(coarse.nodes.find((n) => n.id === 'op-pms')).toBeUndefined();
    // the API expanded: its operations nest inside its own sub-container
    const open = contextMapScene(model, {}, {}, new Set(['api-pms']));
    expect(open.nodes.find((n) => n.id === 'op-pms')?.parentId).toBe('api-pms');
    expect(open.nodes.find((n) => n.id === 'api-pms')?.parentId).toBe('ext-pms');
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
    // a system with ONLY subsystems folds to the plain box (chip hidden)…
    const folded = contextMapScene(model, {});
    expect(folded.nodes.find((n) => n.id === 'ext-ventus')).toBeUndefined();
    // …and unfolds to show the subsystem nested — never as its own top-level box
    const unfolded = contextMapScene(model, {}, undefined, new Set(['ext-rumbo']));
    const sub = unfolded.nodes.find((n) => n.id === 'ext-ventus');
    expect(sub?.parentId).toBe('ext-rumbo');
    expect(sub?.kind).toBe('external-system');
  });

  it("a subsystem's published APIs show inside the parent box", () => {
    const model = baseModel({
      ...strategicModel(),
      externalSystems: [
        { id: 'ext-rumbo', name: 'Rumbo' },
        { id: 'ext-ventus', name: 'Ventus', parentExternalSystemId: 'ext-rumbo' },
      ],
      apis: [{ id: 'api-ventus', name: 'Ventus API', operations: [], publishedByExternalSystemId: 'ext-ventus' }],
    });
    const scene = contextMapScene(model, {});
    const api = scene.nodes.find((n) => n.id === 'api-ventus');
    // the API nests INSIDE the subsystem's chip — moving it there must be visible
    expect(api?.parentId).toBe('ext-ventus');
    const sub = scene.nodes.find((n) => n.id === 'ext-ventus');
    // and the chip grows to hold it (taller than a plain chip) and accepts resize
    expect((sub?.h ?? 0)).toBeGreaterThan(40);
    expect(sub?.resizable).toBe(true);
  });

  it('a subsystem with content wears its own chevron and unfolds use cases and tables', () => {
    const model = baseModel({
      ...strategicModel(),
      externalSystems: [
        { id: 'ext-rumbo', name: 'Rumbo' },
        {
          id: 'ext-ventus', name: 'Ventus', parentExternalSystemId: 'ext-rumbo',
          useCases: [{ id: 'xuc-1', name: 'Disponibilidad' }],
          tables: [{ id: 'xt-1', name: 'RESERVAS' }],
        },
      ],
    });
    const folded = contextMapScene(model, {}, undefined, new Set(['ext-rumbo']));
    const sub = folded.nodes.find((n) => n.id === 'ext-ventus')!;
    expect(sub.collapsible).toBe(true);
    expect(folded.nodes.find((n) => n.id === 'xuc-1')).toBeUndefined();
    const open = contextMapScene(model, {}, undefined, new Set(['ext-rumbo', 'ext-ventus']));
    expect(open.nodes.find((n) => n.id === 'xuc-1')?.parentId).toBe('ext-ventus');
    expect(open.nodes.find((n) => n.id === 'xt-1')?.parentId).toBe('ext-ventus');
  });

  it("a subsystem's API expands on its own into operation rows", () => {
    const model = baseModel({
      ...strategicModel(),
      externalSystems: [
        { id: 'ext-rumbo', name: 'Rumbo' },
        { id: 'ext-ventus', name: 'Ventus', parentExternalSystemId: 'ext-rumbo' },
      ],
      apis: [{
        id: 'api-v', name: 'V API',
        operations: [{ id: 'op-v', name: 'consulta' }],
        publishedByExternalSystemId: 'ext-ventus',
      }],
    });
    // the coarse form already shows the subsystem chip with its API rows
    const folded = contextMapScene(model, {});
    const chip = folded.nodes.find((n) => n.id === 'api-v')!;
    expect(chip.parentId).toBe('ext-ventus');
    expect(chip.collapsible).toBe(true);
    expect(folded.nodes.find((n) => n.id === 'op-v')).toBeUndefined();
    const open = contextMapScene(model, {}, undefined, new Set(['api-v']));
    expect(open.nodes.find((n) => n.id === 'op-v')?.parentId).toBe('ext-ventus');
  });

  it('an implemented API expands even with its context folded to the coarse chip', () => {
    const model = baseModel({
      ...strategicModel(),
      apis: [{ id: 'api-impl', name: 'Impl API', operations: [{ id: 'op-i', name: 'op' }] }],
      apiImplementations: [{ apiId: 'api-impl', boundedContextId: 'mod-reservas' }],
    });
    const coarse = contextMapScene(model, {});
    const chip = coarse.nodes.find((n) => n.id === 'apiimpl:api-impl@mod-reservas')!;
    expect(chip.parentId).toBe('mod-reservas');
    expect(chip.collapsible).toBe(true);
    const open = contextMapScene(model, {}, undefined, new Set(['apiimpl:api-impl@mod-reservas']));
    const occ = open.nodes.find((n) => n.id === 'apiop:op-i@mod-reservas');
    expect(occ?.parentId).toBe('apiimpl:api-impl@mod-reservas');
    // the context itself stays coarse: its use cases did not unfold
    expect(open.nodes.find((n) => n.id === 'uc-book')).toBeUndefined();
  });

  it('an orphaned parent reference falls back to top-level', () => {
    const model = baseModel({
      ...strategicModel(),
      externalSystems: [{ id: 'ext-ventus', name: 'Ventus', parentExternalSystemId: 'ext-gone' }],
    });
    const scene = contextMapScene(model, {});
    expect(scene.nodes.find((n) => n.id === 'ext-ventus')).toBeDefined();
  });
});

describe('distributionScene — the distribution lens (pure topology)', () => {
  it('hides the strategic cast', () => {
    const scene = distributionScene(strategicModel(), {});
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
    const scene = distributionScene(model, {});
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
    const scene = distributionScene(model, {});
    const ids = scene.nodes.map((n) => n.id);
    expect(ids).toContain('mod-reservas-main');
    expect(ids).toContain('mod-reservas-read');
    const deploys = scene.edges.filter((e) => e.kind === 'deploys');
    expect(deploys.map((e) => e.targetId).sort()).toEqual(['mod-reservas-main', 'mod-reservas-read']);
  });
});
