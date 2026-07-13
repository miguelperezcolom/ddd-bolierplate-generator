import type { ModuxModel } from '../../model.js';

/** The smallest legal model: required collections present, everything else opt-in. */
export function baseModel(overrides: Partial<ModuxModel> = {}): ModuxModel {
  return {
    boundedContexts: [],
    externalSystems: [],
    relations: [],
    flows: [],
    ...overrides,
  } as ModuxModel;
}
