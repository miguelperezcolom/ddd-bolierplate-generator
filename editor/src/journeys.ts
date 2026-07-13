import type { JourneyRef } from './model.js';

/**
 * Step numbers for a journey's legs: depth through the afterLegIds DAG gives
 * the number; siblings at the same depth get letters (3a, 3b). A lone leg at
 * its depth is just its number.
 */
export function journeyLegNumbers(journey: JourneyRef): Map<string, string> {
  const legs = journey.legs ?? [];
  const depths = new Map<string, number>();
  // relaxation to a fixed point; cycles cap at legs.length and still render
  for (let round = 0; round <= legs.length; round++) {
    let progress = false;
    for (const leg of legs) {
      const depth =
        Math.max(0, ...(leg.afterLegIds ?? []).map((a) => depths.get(a) ?? 0)) + 1;
      if (depth <= legs.length && depth !== (depths.get(leg.id) ?? 0)) {
        depths.set(leg.id, depth);
        progress = true;
      }
    }
    if (!progress) break;
  }
  const byDepth = new Map<number, string[]>();
  for (const leg of legs) {
    const d = depths.get(leg.id) ?? 1;
    byDepth.set(d, [...(byDepth.get(d) ?? []), leg.id]);
  }
  const numbers = new Map<string, string>();
  for (const [depth, ids] of byDepth) {
    ids.forEach((id, i) => {
      numbers.set(id, ids.length === 1 ? `${depth}` : `${depth}${String.fromCharCode(97 + i)}`);
    });
  }
  return numbers;
}

/**
 * Every root-to-leaf run of the journey's DAG, as ordered leg-id lists: the
 * routes a traveller can take. Bifurcations multiply runs; cycles are cut by
 * the depth guard so a malformed journey still yields something drawable.
 */
export function journeyRuns(journey: JourneyRef): string[][] {
  const legs = journey.legs ?? [];
  const byId = new Map(legs.map((l) => [l.id, l]));
  const successors = new Map<string, string[]>();
  for (const leg of legs) {
    for (const after of leg.afterLegIds ?? []) {
      successors.set(after, [...(successors.get(after) ?? []), leg.id]);
    }
  }
  // The traveller keeps rolling wherever the path physically continues: a leg
  // whose source is this one's target counts as a successor even when nobody
  // declared the link (converging entries drawn later used to strand the run).
  const nextOf = (legId: string, visited: Set<string>): string[] => {
    const leg = byId.get(legId);
    if (!leg) return [];
    const declared = successors.get(legId) ?? [];
    const physical = legs
      .filter((l) => l.sourceId === leg.targetId && l.id !== legId)
      .map((l) => l.id);
    return [...new Set([...declared, ...physical])].filter((id) => !visited.has(id));
  };
  const targets = new Set(legs.map((l) => l.targetId));
  const roots = legs
    .filter((l) => !(l.afterLegIds ?? []).length && !targets.has(l.sourceId))
    .map((l) => l.id);
  if (!roots.length && legs.length) roots.push(legs[0].id); // cycles still tour
  const runs: string[][] = [];
  const walk = (path: string[], visited: Set<string>) => {
    if (path.length > legs.length) return;
    const next = nextOf(path[path.length - 1], visited);
    if (!next.length) {
      runs.push(path);
      return;
    }
    for (const n of next) walk([...path, n], new Set([...visited, n]));
  };
  for (const root of roots) walk([root], new Set([root]));
  return runs;
}
