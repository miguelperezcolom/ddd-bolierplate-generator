/**
 * The orchestration half of the projection: workflows, their gateways, AI agents and RAGs.
 *
 * Most of it is flattening. The store keeps «who may reach what» as lists ON the agent, because
 * that is what a file per element wants; the editor draws EDGES, so each list becomes one edge
 * per member. Doing it here, once, is what keeps the views from each re-deriving it.
 *
 * Ported from `EditorModelProjection`.
 */

import type { ModuxModel } from '../model.js';
import { asList, nested, type Element, type ModelStore } from './store.js';

export const ORCHESTRATION_PROJECTED_TYPES = [
  'workflows', 'workflowGateways', 'aiAgents', 'mcpGateways', 'rags',
];

/** Each agent list, and what the edge it produces is called. */
const AGENT_EDGES = [
  ['agentUses', 'allowedUseCaseIds', 'useCaseId'],
  ['agentExternalUses', 'allowedExternalUseCaseIds', 'externalUseCaseId'],
  ['agentMcpUses', 'allowedMcpServerIds', 'mcpServerId'],
  ['agentGatewayUses', 'mcpGatewayIds', 'gatewayId'],
  ['agentApiOpUses', 'allowedApiOperationIds', 'apiOperationId'],
  ['agentApiUses', 'allowedApiIds', 'apiId'],
  ['agentQueryUses', 'allowedQueryServiceIds', 'queryServiceId'],
  ['agentDelegations', 'delegateAgentIds', 'delegateAgentId'],
  ['agentRags', 'ragIds', 'ragId'],
] as const;

export function projectOrchestration(store: ModelStore): Partial<ModuxModel> {
  const edges = Object.fromEntries(AGENT_EDGES.map(([edge, list, field]) => [
    edge,
    store.all('aiAgents').flatMap((agent) =>
      asList(agent[list]).map((id) => ({ agentId: agent.id, [field]: id }))),
  ]));

  return {
    ...edges,

    workflows: store.all('workflows').map((wf) => ({
      id: wf.id,
      name: name(wf),
      triggerAggregateId: str(wf.triggerAggregateId),
      triggerDomainServiceId: str(wf.triggerDomainServiceId),
      triggerUseCaseId: str(wf.triggerUseCaseId),
      triggerEvent: str(wf.triggerEvent),
      onCompletionEventName: str(wf.completionEventName),
      steps: nested(wf.steps).map((s) => ({
        id: s.id,
        name: name(s as Element),
        type: str(s.type),
        handoffWorkflowId: str(s.handoffWorkflowId),
        roleId: str(s.roleId),
        deadline: str(s.deadline),
        compensationUseCaseId: str(s.compensationUseCaseId),
        formPageId: str(s.formPageId),
        emittedEventName: str(s.emittedEventName),
        targetUseCaseId: str(s.targetUseCaseId),
        completionEventName: str(s.completionEventName),
        dependsOnStepIds: asList(s.dependsOnStepIds),
      })),
    })),

    workflowGateways: store.all('workflowGateways').map((g) => ({
      id: g.id,
      name: name(g),
      type: str(g.type),
      semantics: str(g.semantics),
      sourceIds: asList(g.sourceIds),
      targetIds: asList(g.targetIds),
      branchConditions: nested(g.branchConditions).map((c) => ({
        targetId: String(c.targetId),
        expression: str(c.expression),
      })),
    })),

    aiAgents: store.all('aiAgents').map((a) => ({
      id: a.id,
      name: name(a),
      external: a.external === true,
    })),

    mcpGateways: store.all('mcpGateways').map((g) => ({
      id: g.id,
      name: name(g),
      mcpServerIds: asList(g.mcpServerIds),
      apiIds: asList(g.apiIds),
      apiOperationIds: asList(g.apiOperationIds),
      useCaseIds: asList(g.useCaseIds),
      ragIds: asList(g.ragIds),
    })),

    rags: store.all('rags').map((r) => ({
      id: r.id,
      name: name(r),
      description: str(r.description),
      sourceReadModelIds: asList(r.sourceReadModelIds),
      contentSources: nested(r.contentSources).map((s) => ({
        type: str(s.type) ?? 'WEB',
        uri: String(s.uri),
      })),
    })),

    /** Actor → agent and event → agent: held on the other side, so gathered from there. */
    actorAgentUses: store.all('roles').flatMap((actor) =>
      asList(actor.aiAgentIds).map((agentId) => ({ actorId: actor.id, agentId }))),

    agentTriggers: store.all('aiAgents').flatMap((agent) =>
      asList(agent.reactsToEventIds).map((eventId) => ({ eventId, agentId: agent.id }))),
  } as Partial<ModuxModel>;
}

const name = (element: Element) => str(element.name) ?? element.id;
const str = (value: unknown) => (typeof value === 'string' && value ? value : undefined);
