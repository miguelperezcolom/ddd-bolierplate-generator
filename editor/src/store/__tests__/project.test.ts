import { describe, expect, it } from 'vitest';
import { apply } from '../apply.js';
import { project, projectedTypes, unprojectedTypes } from '../project.js';
import { ModelStore } from '../store.js';

function seeded(): ModelStore {
  const store = ModelStore.from({ services: [{ id: 'svc', name: 'Service' }] });
  apply(store, { kind: 'add-boundedContext', id: 'bc-booking', name: 'Booking', subdomainType: 'CORE' });
  apply(store, { kind: 'add-boundedContext', id: 'bc-billing', name: 'Billing' });
  apply(store, { kind: 'add-aggregate', id: 'agg-booking', name: 'Booking', boundedContextId: 'bc-booking' });
  apply(store, { kind: 'add-entity', id: 'ent-leg', name: 'Leg', aggregateId: 'agg-booking' });
  apply(store, { kind: 'add-relation', sourceId: 'bc-booking', targetId: 'bc-billing', type: 'CUSTOMER_SUPPLIER' });
  return store;
}

describe('projection', () => {
  it('gives the editor the bounded contexts it drew from the server before', () => {
    const model = project(seeded());

    expect(model.boundedContexts.map((bc) => bc.id)).toEqual(['bc-booking', 'bc-billing']);
    expect(model.boundedContexts[0]).toMatchObject({ name: 'Booking', subdomainType: 'CORE' });
  });

  it('resolves which service deploys a context, through its module', () => {
    const model = project(seeded());

    expect(model.boundedContexts[0].serviceId).toBe('svc');
  });

  it('turns stored relations into the endpoint pairs the editor draws', () => {
    const model = project(seeded());

    expect(model.relations).toEqual([
      { sourceId: 'bc-booking', targetId: 'bc-billing', type: 'CUSTOMER_SUPPLIER', declared: true },
    ]);
  });

  it('gives an aggregate the bounded context that lists it', () => {
    const model = project(seeded());

    expect(model.aggregates).toEqual([
      expect.objectContaining({ id: 'agg-booking', boundedContextId: 'bc-booking' }),
    ]);
  });

  it('gives an entity the aggregate it declares as parent', () => {
    const model = project(seeded());

    expect(model.entities).toEqual([
      expect.objectContaining({ id: 'ent-leg', aggregateId: 'agg-booking' }),
    ]);
  });

  it('survives a model with nothing in it', () => {
    const model = project(ModelStore.from({}));

    expect(model.boundedContexts).toEqual([]);
    expect(model.relations).toEqual([]);
  });

  it('reports what it does not cover instead of silently dropping it', () => {
    const store = seeded();
    store.put('pages', { id: 'page-1', name: 'Home' });
    store.put('workflows', { id: 'wf-1', name: 'Checkin' });

    expect(unprojectedTypes(store)).toEqual(['pages', 'workflows']);
    expect(projectedTypes()).toContain('boundedContexts');
  });
});
