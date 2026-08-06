/**
 * The migrations a tree written by an older modux needs on the way in.
 *
 * The failure these guard against is the quiet one: a model that opens fine, draws
 * fine, and has lost its context map — because the loader ignored fields it did not
 * know about. That is exactly what the Java side migrates, and the plugin reads the
 * same trees, so it has to migrate the same way.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  adoptEventConductorStepTypes, deploymentIdFor, EVENT_CONDUCTOR_STEP_TYPES,
  hoistLegacyProjectElements, healMainModules, migrate,
} from '../legacy.js';
import { ModelStore, type Element } from '../store.js';
import { loadTree, writeTree, type FileSystem } from '../tree.js';

function memoryFs(): FileSystem & { files: Map<string, string> } {
  const files = new Map<string, string>();
  return {
    files,
    async list(dir) {
      const prefix = `${dir}/`;
      return [...files.keys()]
        .filter((p) => p.startsWith(prefix) && !p.slice(prefix.length).includes('/'))
        .map((p) => p.slice(prefix.length));
    },
    async listDirs(dir) {
      const prefix = `${dir}/`;
      const dirs = new Set<string>();
      for (const p of files.keys()) {
        if (!p.startsWith(prefix)) continue;
        const slash = p.slice(prefix.length).indexOf('/');
        if (slash > 0) dirs.add(p.slice(prefix.length, prefix.length + slash));
      }
      return [...dirs];
    },
    async read(path) {
      return files.get(path)!;
    },
    async write(path, content) {
      files.set(path, content);
    },
    async delete(path) {
      files.delete(path);
    },
    async exists(path) {
      return files.has(path);
    },
  };
}

/** A project element in the shape a store written before the phase-0 split has. */
const legacyProject = () => ({
  id: 'booking',
  name: 'Booking',
  contextMap: [
    { id: 'rel-a', sourceBoundedContextId: 'bc-1', targetBoundedContextId: 'bc-2', type: 'OPEN_HOST_SERVICE' },
    { id: 'rel-b', sourceBoundedContextId: 'bc-2', targetBoundedContextId: 'bc-3', type: 'CUSTOMER_SUPPLIER' },
  ],
  externalSystems: [{ id: 'ext-pms', name: 'PMS', protocol: 'DATABASE' }],
  tracingProvider: 'OTLP',
  dockerRegistry: 'docker.io/acme',
  tenancyStrategy: 'NONE',
});

describe('hoisting the elements that used to live inside the project', () => {
  it('moves the context map to its own type', () => {
    const store = ModelStore.from({ projects: [legacyProject()] });

    const moved = hoistLegacyProjectElements(store);

    expect(moved.relations).toBe(2);
    expect(store.all('contextMapRelations').map((r) => r.id)).toEqual(['rel-a', 'rel-b']);
    expect(store.get('contextMapRelations', 'rel-a')?.type).toBe('OPEN_HOST_SERVICE');
    expect(store.get('projects', 'booking')?.contextMap).toBeUndefined();
  });

  it('moves the external systems out too', () => {
    const store = ModelStore.from({ projects: [legacyProject()] });

    const moved = hoistLegacyProjectElements(store);

    expect(moved.externalSystems).toBe(1);
    expect(store.get('externalSystems', 'ext-pms')?.name).toBe('PMS');
    expect(store.get('projects', 'booking')?.externalSystems).toBeUndefined();
  });

  it('moves the deployment settings to an element of their own, keyed apart from the project', () => {
    const store = ModelStore.from({ projects: [legacyProject()] });

    const moved = hoistLegacyProjectElements(store);

    const deployment = store.get('deployments', deploymentIdFor('booking'));
    expect(moved.deployments).toBe(1);
    expect(deployment).toMatchObject({ tracingProvider: 'OTLP', dockerRegistry: 'docker.io/acme' });
    // ids are unique across the whole model, so the deployment cannot reuse the project's
    expect(deployment?.id).not.toBe('booking');
    expect(store.get('projects', 'booking')?.tracingProvider).toBeUndefined();
  });

  it('leaves a project that already carries nothing inline untouched', () => {
    const store = ModelStore.from({ projects: [{ id: 'booking', name: 'Booking' }] });

    const moved = hoistLegacyProjectElements(store);

    expect(moved).toEqual({ relations: 0, externalSystems: 0, deployments: 0 });
    expect(store.types()).toEqual(['projects']);
  });

  it('does not overwrite a deployment that was already split out', () => {
    const store = ModelStore.from({
      projects: [legacyProject()],
      deployments: [{ id: deploymentIdFor('booking'), tracingProvider: 'NONE' }],
    });

    hoistLegacyProjectElements(store);

    expect(store.get('deployments', deploymentIdFor('booking'))?.tracingProvider).toBe('NONE');
  });
});

describe('healing main modules', () => {
  it('gives a context with no modules at all the one it is born with', () => {
    const store = ModelStore.from({ boundedContexts: [{ id: 'bc-1', name: 'Reservas' }] });

    expect(healMainModules(store)).toBe(1);
    expect(store.get('modules', 'bc-1-main')).toMatchObject({
      name: 'Reservas', boundedContextId: 'bc-1', main: true,
    });
  });

  /** Java's `mainModuleOf` falls back to the first module, so this context already has one. */
  it('leaves a context whose module is simply not flagged alone', () => {
    const store = ModelStore.from({
      boundedContexts: [{ id: 'bc-1', name: 'Reservas' }],
      modules: [{ id: 'mod-legacy', boundedContextId: 'bc-1' }],
    });

    expect(healMainModules(store)).toBe(0);
    expect(store.all('modules').map((m) => m.id)).toEqual(['mod-legacy']);
  });
});

describe('a legacy tree read from disk', () => {
  it('comes back with its relations, and with the migration pending a write', async () => {
    const fs = memoryFs();
    await writeTree(fs, 'modux', ModelStore.from({ projects: [legacyProject()] }));

    const store = await loadTree(fs, 'modux');

    expect(store.all('contextMapRelations')).toHaveLength(2);
    // nothing was written just to open the model; the new shape lands on the next flush
    expect(fs.files.has('modux/contextMapRelations/rel-a.yaml')).toBe(false);
    expect(store.changes().written.map((c) => `${c.type}/${c.id}`)).toEqual(
      expect.arrayContaining(['contextMapRelations/rel-a', 'externalSystems/ext-pms', 'projects/booking']),
    );
  });

  it('is a no-op on a tree that is already current', async () => {
    const fs = memoryFs();
    const current = ModelStore.from({ projects: [{ id: 'booking', name: 'Booking' }] });
    await writeTree(fs, 'modux', current);

    const store = await loadTree(fs, 'modux');

    expect(store.changes()).toEqual({ written: [], deleted: [] });
  });

  it('migrates once: reading the migrated tree back finds nothing left to do', () => {
    const store = ModelStore.from({ projects: [legacyProject()] });
    migrate(store);

    const again = ModelStore.from(store.toData());

    expect(migrate(again)).toEqual({ relations: 0, externalSystems: 0, deployments: 0 });
  });
});

describe('speaking EventConductor’s language', () => {
  const workflow = (step: Record<string, unknown>) =>
    ModelStore.from({ workflows: [{ id: 'wf-1', name: 'Checkin', steps: [{ id: 's1', ...step }] }] });
  const typeOf = (store: ModelStore) =>
    (store.get('workflows', 'wf-1')!.steps as Element[])[0].type;

  function migrated(store: ModelStore): ModelStore {
    migrate(store);
    return store;
  }

  /**
   * The list is not restated here, it is READ from EventConductor's own schema. Two hand-kept
   * copies agreeing with each other while the engine moved on is exactly how modux ended up
   * emitting ACTION for human tasks.
   */
  it('knows the step types EventConductor actually declares', () => {
    const schema = JSON.parse(readFileSync(fileURLToPath(new URL(
      '../../../../model-driven-generator/src/main/resources/eventconductor/'
      + 'workflow-definition-schema.json', import.meta.url)), 'utf8'));

    const declared: string[] = schema.$defs.Step.properties.type.enum;

    expect([...EVENT_CONDUCTOR_STEP_TYPES].sort()).toEqual([...declared].sort());
  });

  it('calls a step with somebody assigned a user task', () => {
    expect(typeOf(migrated(workflow({ roleId: 'act-1' })))).toBe('USER_TASK');
    expect(typeOf(migrated(workflow({ formPageId: 'pg-1' })))).toBe('USER_TASK');
  });

  it('calls a step with nobody assigned an action', () => {
    expect(typeOf(migrated(workflow({ type: 'TASK' })))).toBe('ACTION');
    expect(typeOf(migrated(workflow({})))).toBe('ACTION');
  });

  it('renames a split to a fork', () => {
    expect(typeOf(migrated(workflow({ type: 'SPLIT' })))).toBe('FORK');
  });

  /** An explicit engine type wins, even over a role that would otherwise imply USER_TASK. */
  it('leaves a step that already speaks the engine’s language alone', () => {
    expect(typeOf(migrated(workflow({ type: 'WAIT_FOR_MESSAGE', roleId: 'act-1' }))))
      .toBe('WAIT_FOR_MESSAGE');
  });

  it('adopts once', () => {
    const store = workflow({ roleId: 'act-1' });
    expect(adoptEventConductorStepTypes(store)).toBe(1);
    expect(adoptEventConductorStepTypes(store)).toBe(0);
  });
});
