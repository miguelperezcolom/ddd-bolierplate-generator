import type { ModuxModel, WorkflowRef, WorkflowStepRef } from '../model.js';
import type { Scene, SceneNode, SceneEdge, DiagramLayout } from '../scene.js';

/**
 * Workflows view: each workflow as a dependency DAG — trigger source →(event,
 * dashed)→ workflow → steps laid out by dependency depth → completion event.
 * Unlike processes (a linear chain), steps run when their dependencies
 * complete; dependency edges are drawn between steps, and a step with none
 * hangs from the workflow itself.
 */

const WF_W = 190;
const WF_H = 56;
const STEP_W = 180;
const STEP_H = 56;
const SRC_W = 150;
const SRC_H = 44;
const COL = 250;
const ROW = 100;

/** Longest dependency path — the step's column inside its workflow. */
function stepDepth(step: WorkflowStepRef, byId: Map<string, WorkflowStepRef>): number {
  const seen = new Set<string>();
  const walk = (s: WorkflowStepRef): number => {
    if (seen.has(s.id)) return 0; // cycle guard: the linter reports it, we still draw
    seen.add(s.id);
    const deps = (s.dependsOnStepIds ?? []).map((id) => byId.get(id)).filter(Boolean) as WorkflowStepRef[];
    const d = deps.length ? 1 + Math.max(...deps.map(walk)) : 0;
    seen.delete(s.id);
    return d;
  };
  return walk(step);
}

function triggerSource(model: ModuxModel, workflow: WorkflowRef):
  | { id: string; label: string; kind: string; symbol: string }
  | null {
  if (workflow.triggerAggregateId) {
    const agg = (model.aggregates ?? []).find((a) => a.id === workflow.triggerAggregateId);
    if (agg) return { id: agg.id, label: agg.name, kind: 'aggregate', symbol: 'aggregate' };
  }
  if (workflow.triggerDomainServiceId) {
    const ds = model.modules
      .flatMap((m) => m.domainServices ?? [])
      .find((x) => x.id === workflow.triggerDomainServiceId);
    if (ds) return { id: ds.id, label: ds.name, kind: 'domain-service', symbol: 'gear' };
  }
  if (workflow.triggerUseCaseId) {
    const uc = model.modules
      .flatMap((m) => m.useCases ?? [])
      .find((x) => x.id === workflow.triggerUseCaseId);
    if (uc) return { id: uc.id, label: uc.name, kind: 'use-case', symbol: 'gear' };
  }
  return null;
}

export function workflowsScene(model: ModuxModel, layout: DiagramLayout): Scene {
  const nodes: SceneNode[] = [];
  const edges: SceneEdge[] = [];
  const seenSources = new Set<string>();

  const useCaseName = (id: string | undefined) =>
    model.modules.flatMap((m) => m.useCases ?? []).find((u) => u.id === id)?.name;

  let rowY = 140;
  (model.workflows ?? []).forEach((workflow) => {
    const byId = new Map(workflow.steps.map((s) => [s.id, s]));
    const depths = new Map(workflow.steps.map((s) => [s.id, stepDepth(s, byId)]));
    const lanes = new Map<number, number>();
    for (const s of workflow.steps) {
      const d = depths.get(s.id) ?? 0;
      lanes.set(d, (lanes.get(d) ?? 0) + 1);
    }
    const bandRows = Math.max(1, ...lanes.values());

    // trigger source (shared across workflows, like the flows view)
    const source = triggerSource(model, workflow);
    if (source && !seenSources.has(source.id)) {
      seenSources.add(source.id);
      const pos = layout[source.id] ?? { x: 140, y: rowY };
      nodes.push({
        id: source.id,
        label: source.label,
        x: pos.x,
        y: pos.y,
        w: SRC_W,
        h: SRC_H,
        kind: source.kind,
        symbol: source.symbol,
        fill: '#ffffff',
        stroke: '#64748b',
        badge: source.kind === 'aggregate' ? 'AGGREGATE'
          : source.kind === 'domain-service' ? 'DOMAIN SERVICE' : 'USE CASE',
      });
    }

    const wfPos = layout[workflow.id] ?? { x: 420, y: rowY };
    nodes.push({
      id: workflow.id,
      label: workflow.name,
      x: wfPos.x,
      y: wfPos.y,
      w: WF_W,
      h: WF_H,
      kind: 'workflow',
      symbol: 'process',
      fill: '#ede9fe',
      stroke: '#6d28d9',
      badge: 'WORKFLOW',
      tooltip: `${workflow.name}${workflow.triggerEvent ? ` — arranca con ${workflow.triggerEvent}` : ''}${workflow.onCompletionEventName ? ` · emite ${workflow.onCompletionEventName} al completar` : ''}`,
    });
    if (source) {
      edges.push({
        id: `wft:${workflow.id}`,
        sourceId: source.id,
        targetId: workflow.id,
        kind: 'workflow-trigger',
        label: workflow.triggerEvent,
        color: '#94a3b8',
        dashed: true,
        arrow: true,
        tooltip: workflow.triggerEvent ? `Evento: ${workflow.triggerEvent}` : undefined,
      });
    }

    // steps, one column per dependency depth
    const placed = new Map<number, number>();
    let maxDepth = 0;
    for (const step of workflow.steps) {
      const d = depths.get(step.id) ?? 0;
      maxDepth = Math.max(maxDepth, d);
      const lane = placed.get(d) ?? 0;
      placed.set(d, lane + 1);
      const pos = layout[step.id] ?? {
        x: wfPos.x + (d + 1) * COL,
        y: rowY + (lane - (lanes.get(d)! - 1) / 2) * ROW,
      };
      const target = useCaseName(step.targetUseCaseId);
      nodes.push({
        id: step.id,
        label: step.name,
        x: pos.x,
        y: pos.y,
        w: STEP_W,
        h: STEP_H,
        kind: 'workflow-step',
        symbol: 'event',
        fill: '#ffffff',
        stroke: '#6d28d9',
        badge: target ? `→ ${target}` : '∅ sin use case',
        tooltip: `${step.name}${step.emittedEventName ? ` · emite ${step.emittedEventName}` : ''}${target ? ` · lanza ${target}` : ''}${step.completionEventName ? ` · espera ${step.completionEventName}` : ''}`,
      });
      const deps = (step.dependsOnStepIds ?? []).filter((id) => byId.has(id));
      if (deps.length === 0) {
        edges.push({
          id: `wfs:${workflow.id}:${step.id}`,
          sourceId: workflow.id,
          targetId: step.id,
          kind: 'workflow-start',
          label: step.emittedEventName,
          color: '#6d28d9',
          arrow: true,
        });
      }
      for (const dep of deps) {
        edges.push({
          id: `wfdep:${dep}->${step.id}`,
          sourceId: dep,
          targetId: step.id,
          kind: 'workflow-dependency',
          label: step.emittedEventName,
          color: '#6d28d9',
          arrow: true,
          tooltip: `${step.name} espera a ${byId.get(dep)?.name ?? dep}`,
        });
      }
    }

    if (workflow.onCompletionEventName) {
      const doneId = `done:${workflow.id}`;
      const donePos = layout[doneId] ?? { x: wfPos.x + (maxDepth + 2) * COL, y: rowY };
      nodes.push({
        id: doneId,
        label: workflow.onCompletionEventName,
        x: donePos.x,
        y: donePos.y,
        w: STEP_W,
        h: 40,
        kind: 'completion-event',
        symbol: 'event',
        fill: '#dcfce7',
        stroke: '#16a34a',
        badge: 'EVENTO FINAL',
      });
      // The workflow completes when its sinks (steps nobody depends on) do.
      const depended = new Set(workflow.steps.flatMap((s) => s.dependsOnStepIds ?? []));
      const sinks = workflow.steps.filter((s) => !depended.has(s.id));
      for (const sink of sinks.length ? sinks : []) {
        edges.push({
          id: `wfd:${workflow.id}:${sink.id}`,
          sourceId: sink.id,
          targetId: doneId,
          kind: 'workflow-completion',
          color: '#16a34a',
          arrow: true,
        });
      }
      if (!workflow.steps.length) {
        edges.push({
          id: `wfd:${workflow.id}`,
          sourceId: workflow.id,
          targetId: doneId,
          kind: 'workflow-completion',
          color: '#16a34a',
          arrow: true,
        });
      }
    }

    rowY += Math.max(2, bandRows + 1) * ROW + 60;
  });

  return { nodes, edges };
}
