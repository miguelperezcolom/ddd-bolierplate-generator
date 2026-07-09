/**
 * JSON projection of the modux meta-model consumed by the editor.
 * The host (Mateu page or standalone demo) builds this from the model store
 * and applies the ModuxCommand mutations the editor emits.
 */

export type SubdomainType = 'CORE' | 'SUPPORTING' | 'GENERIC';

export type ContextMapRelationType =
  | 'PARTNERSHIP'
  | 'SHARED_KERNEL'
  | 'CUSTOMER_SUPPLIER'
  | 'CONFORMIST'
  | 'OPEN_HOST_SERVICE'
  | 'ANTI_CORRUPTION_LAYER'
  | 'PUBLISHED_LANGUAGE'
  | 'SEPARATE_WAYS';

export type FlowArchetype = 'MATERIALIZES' | 'TRIGGERS' | 'ORCHESTRATES' | 'NOTIFIES';

export interface UseCaseRef {
  id: string;
  name: string;
  /** A policy: use-case-shaped reaction logic, not a business use case. */
  policy?: boolean;
}

export interface DomainEventRef {
  id: string;
  name: string;
}

export interface ApplicationEventRef {
  id: string;
  name: string;
}

export interface DomainServiceRef {
  id: string;
  name: string;
}

export interface ReadModelRef {
  id: string;
  name: string;
  /** The aggregate this read model is a view of (optional). */
  aggregateId?: string;
}

/** Who publishes a domain event: an aggregate (operation emits) or a use case (publish step). */
export interface EmissionRef {
  sourceId: string;
  domainEventId: string;
}

/** Use case A invokes use case B (a CallUseCase step in A). */
export interface UseCaseCallRef {
  sourceId: string;
  targetId: string;
}

export interface QueryServiceRef {
  id: string;
  name: string;
}

/** Use case A consumes query service B (a CallQueryService step in A). */
export interface QueryCallRef {
  sourceId: string;
  targetId: string;
}

/** An actor uses a use case or query service directly (a UI is derived from it). */
export interface ActorUseRef {
  actorId: string;
  targetId: string;
}

export interface ActorExternalDependencyRef {
  actorId: string;
  externalSystemId: string;
}

export interface ExternalSystemDependencyRef {
  sourceId: string;
  targetId: string;
  /** DEPENDS (plain, default) or CQRS — only between external systems. */
  type?: string;
}

/** An API proxy/cache: fronts a published API, consumable exactly like it. */
export interface ProxyApiRef {
  id: string;
  name: string;
  targetApiId?: string;
  publishedByExternalSystemId?: string;
}

/**
 * The SAME published API, (also) implemented inside one of our bounded contexts — a
 * strangler migration: N implementation sites coexist and every proxy fronting the API
 * routes to all of them (routing logic / per-operation wiring comes later). References
 * the ApiRef by id: never a copy — renaming or editing operations touches the one API.
 */
export interface ApiImplementationRef {
  apiId: string;
  moduleId: string;
}

/**
 * One proxy OPERATION routed to an implementation SITE of the API the proxy fronts:
 * a bounded context implementing it, or the API itself as published by its external
 * system. The per-operation strangler wiring — some operations go to the new context,
 * the rest to the origin.
 */
export interface ProxyOperationRouteRef {
  proxyId: string;
  operationId: string;
  /** moduleId of the implementing context, or the apiId for "as published". */
  targetSiteId: string;
}

/**
 * An external system calls ONE operation of an API at a given SITE: the API as
 * published (siteId = apiId), a proxy fronting it, or a bounded context implementing it.
 */
export interface ExternalOperationUseRef {
  externalSystemId: string;
  operationId: string;
  siteId: string;
}

/**
 * The use case serving ONE operation AT one site — a bounded context implementing the
 * API, or a proxy fronting it (moduleId holds either id). Per-site: during a strangler
 * migration the same operation may be served differently at each site, and the use case
 * may live in ANOTHER context.
 */
export interface ApiOperationImplementationRef {
  apiId: string;
  operationId: string;
  /** The site: a bounded-context id or a proxy id. */
  moduleId: string;
  useCaseId: string;
}

export interface ModuleRef {
  id: string;
  name: string;
  subdomainType?: SubdomainType;
  serviceId?: string;
  /** Use cases owned by this bounded context (populated for the detailed context map). */
  useCases?: UseCaseRef[];
  /** Domain events owned by this bounded context (populated for the detailed context map). */
  domainEvents?: DomainEventRef[];
  /** Read models owned by this bounded context (populated for the detailed context map). */
  readModels?: ReadModelRef[];
  /** Domain services owned by this bounded context (they emit domain events, like aggregates). */
  domainServices?: DomainServiceRef[];
  /** Application events owned by this bounded context (published by its use cases). */
  applicationEvents?: ApplicationEventRef[];
  /** Query services owned by this bounded context. */
  queryServices?: QueryServiceRef[];
}

export interface ActorRef {
  id: string;
  name: string;
}

export interface AiAgentRef {
  id: string;
  name: string;
  /** Someone else's agent: it enters through MCP gateways, never touching internals. */
  external?: boolean;
}

/** Our MCP gateway: aggregates MCPs and exposes APIs/operations/use cases/RAGs as MCP. */
export interface McpGatewayRef {
  id: string;
  name: string;
  mcpServerIds?: string[];
  apiIds?: string[];
  apiOperationIds?: string[];
  useCaseIds?: string[];
  ragIds?: string[];
}

/** An AI agent consumes an MCP gateway (one curated tool surface). */
export interface AgentGatewayUseRef {
  agentId: string;
  gatewayId: string;
}

/** An AI agent calls an API operation as a tool. */
export interface AgentApiOpUseRef {
  agentId: string;
  apiOperationId: string;
}

/** An AI agent consults a query service as a read tool. */
export interface AgentQueryUseRef {
  agentId: string;
  queryServiceId: string;
}

/** An AI agent delegates work to another agent. */
export interface AgentDelegationRef {
  agentId: string;
  delegateAgentId: string;
}

/** An actor talks to an AI agent (a chat/supervision UI derives from it). */
export interface ActorAgentUseRef {
  actorId: string;
  agentId: string;
}

/** A domain/application event triggers a run of the agent (reactive agents). */
export interface AgentTriggerRef {
  eventId: string;
  agentId: string;
}

/** An AI agent consumes a use case through MCP. */
export interface AgentUseRef {
  agentId: string;
  useCaseId: string;
}

/** An AI agent calls an operation offered by an external system. */
export interface AgentExternalUseRef {
  agentId: string;
  externalUseCaseId: string;
}

/** An AI agent consumes an MCP server published by an external system. */
export interface AgentMcpUseRef {
  agentId: string;
  mcpServerId: string;
}

export interface RagContentSourceRef {
  /** REPO, WEB or FTP. */
  type: string;
  uri: string;
}

/** A RAG knowledge base, optionally fed from read models and external content. */
export interface RagRef {
  id: string;
  name: string;
  description?: string;
  sourceReadModelIds?: string[];
  contentSources?: RagContentSourceRef[];
}

/** An AI agent grounds its answers on a knowledge base. */
export interface AgentRagRef {
  agentId: string;
  ragId: string;
}

export interface ApiOperationRef {
  id: string;
  name: string;
  httpMethod?: string;
  path?: string;
  /** Coarse wiring: the bounded context that implements it. */
  targetModuleId?: string;
  /** Fine wiring: the use case (or policy) that implements it. */
  targetUseCaseId?: string;
}

/** A published API as a first-class element on the map. */
export interface ApiRef {
  id: string;
  name: string;
  operations: ApiOperationRef[];
  /** External system publishing this API (nests inside it on the map). */
  publishedByExternalSystemId?: string;
}

export interface ExternalUseCaseRef {
  id: string;
  name: string;
}

export interface ExternalTableRef {
  id: string;
  name: string;
}

/** An MCP server published by an external system — a tool surface for AI agents. */
export interface McpServerRef {
  id: string;
  name: string;
  uri?: string;
}

export interface ExternalSystemRef {
  id: string;
  name: string;
  /** Use cases this external system offers (targets of calls from our use cases). */
  useCases?: ExternalUseCaseRef[];
  /** Tables/datasets it owns — pollable into read models (legacy integration). */
  tables?: ExternalTableRef[];
  /** MCP servers it publishes — consumable by AI agents. */
  mcpServers?: McpServerRef[];
}

/** An external system calls one of our use cases in (INBOUND ACL). */
export interface ExternalCallRef {
  externalSystemId: string;
  useCaseId: string;
}

/** One of our use cases calls a use case offered by an external system. */
export interface ExternalUseCaseCallRef {
  sourceId: string;
  targetId: string;
}

export interface ContextMapRelation {
  /** Upstream side (U/D convention: source is upstream). */
  sourceId: string;
  targetId: string;
  /** The annotated DDD pattern; null while the derived relation is unannotated. */
  type: ContextMapRelationType | null;
  /** Whether the pair carries a type annotation (contextMap entry). */
  declared?: boolean;
  /** The concrete dependencies this relation derives from (tooltip). */
  reasons?: string;
}

export interface FlowRef {
  id: string;
  name: string;
  sourceId: string;
  targetId: string;
  archetype: FlowArchetype;
  triggerAggregateId?: string;
  triggerEvent?: string;
  targetUseCaseId?: string;
  readModelName?: string;
}

export interface ProcessStepRef {
  id: string;
  name: string;
  type: 'AUTOMATED' | 'HUMAN';
  useCaseId?: string;
  roleId?: string;
  deadline?: string;
  compensationUseCaseId?: string;
}

export interface ProcessRef {
  id: string;
  name: string;
  triggerAggregateId?: string;
  triggerEvent?: string;
  ownerModuleId?: string;
  onCompletionEventName?: string;
  sla?: string;
  steps: ProcessStepRef[];
}

export interface AggregateRef {
  id: string;
  name: string;
  moduleId: string;
}

export interface EntityRef {
  id: string;
  name: string;
  /** Aggregate this entity belongs to (entities-within-aggregates). */
  aggregateId: string;
}

/** Cross-aggregate reference derived server-side from model fields. */
export interface AggregateReference {
  sourceAggregateId: string;
  targetAggregateId: string;
  label?: string;
}

export interface ViewRef {
  id: string;
  name: string;
  kind: 'CURATED' | 'COMPUTED' | string;
  memberIds: string[];
}

/** A use case acts on an aggregate (CallAggregateOperation / SaveAggregate step). */
export interface AggregateCallRef {
  sourceId: string;
  targetId: string;
}

export interface SubscriptionActionRef {
  type: 'CallUseCase' | 'StartSaga' | 'UpdateProjection' | 'Custom' | string;
  useCaseId?: string;
  sagaId?: string;
  projectionId?: string;
}

/** Event listener: reacts to a domain/integration event by name. */
export interface SubscriptionRef {
  id: string;
  name: string;
  eventName?: string;
  consumerGroup?: string;
  actions?: SubscriptionActionRef[];
}

/** Projects domain events — or an aggregate's whole state — into a read model. */
export interface ProjectionRef {
  id: string;
  name: string;
  readModelId?: string;
  readModelName?: string;
  handledEventIds: string[];
  /** Alternative source: the aggregate whose state this projection materializes. */
  sourceAggregateId?: string;
  /** Bounded context that owns the projection (and its read model). */
  moduleId?: string;
  /** Alternative source: an external system's operation, polled. */
  sourceExternalUseCaseId?: string;
  /** Alternative source: a legacy/external system's table, polled. */
  sourceExternalTableId?: string;
}

export interface WorkflowStepRef {
  id: string;
  name: string;
  emittedEventName?: string;
  targetUseCaseId?: string;
  completionEventName?: string;
  dependsOnStepIds?: string[];
}

/** A cross-context orchestrator living OUTSIDE the bounded contexts (no owner module). */
export interface WorkflowRef {
  id: string;
  name: string;
  triggerAggregateId?: string;
  triggerDomainServiceId?: string;
  triggerUseCaseId?: string;
  triggerEvent?: string;
  onCompletionEventName?: string;
  steps: WorkflowStepRef[];
}

export interface ModuxModel {
  modules: ModuleRef[];
  externalSystems: ExternalSystemRef[];
  relations: ContextMapRelation[];
  flows: FlowRef[];
  aggregates?: AggregateRef[];
  entities?: EntityRef[];
  aggregateReferences?: AggregateReference[];
  processes?: ProcessRef[];
  views?: ViewRef[];
  emissions?: EmissionRef[];
  /** Business actors (roles) shown on the context map. */
  actors?: ActorRef[];
  useCaseCalls?: UseCaseCallRef[];
  queryCalls?: QueryCallRef[];
  actorUses?: ActorUseRef[];
  /** Actor → external system dependencies (strategic context-map edges). */
  actorExternalDependencies?: ActorExternalDependencyRef[];
  /** External system → external system dependencies. */
  externalSystemDependencies?: ExternalSystemDependencyRef[];
  proxyApis?: ProxyApiRef[];
  /** APIs (also) implemented in our bounded contexts — same ApiRef, several sites. */
  apiImplementations?: ApiImplementationRef[];
  /** Per-operation routing of proxies to the API's implementation sites. */
  proxyOperationRoutes?: ProxyOperationRouteRef[];
  /** External systems calling specific API operations (at a published API, proxy or implementation). */
  externalOperationUses?: ExternalOperationUseRef[];
  /** Per-site wiring: the use case implementing an operation at a given implementation site. */
  apiOperationImplementations?: ApiOperationImplementationRef[];
  externalCalls?: ExternalCallRef[];
  externalUseCaseCalls?: ExternalUseCaseCallRef[];
  aiAgents?: AiAgentRef[];
  agentUses?: AgentUseRef[];
  agentExternalUses?: AgentExternalUseRef[];
  agentMcpUses?: AgentMcpUseRef[];
  mcpGateways?: McpGatewayRef[];
  agentGatewayUses?: AgentGatewayUseRef[];
  agentApiOpUses?: AgentApiOpUseRef[];
  agentQueryUses?: AgentQueryUseRef[];
  agentDelegations?: AgentDelegationRef[];
  actorAgentUses?: ActorAgentUseRef[];
  agentTriggers?: AgentTriggerRef[];
  rags?: RagRef[];
  agentRags?: AgentRagRef[];
  apis?: ApiRef[];
  workflows?: WorkflowRef[];
  aggregateCalls?: AggregateCallRef[];
  /** Domain events published directly by use cases (PublishDomainEvent steps). */
  useCaseEmissions?: EmissionRef[];
  subscriptions?: SubscriptionRef[];
  projections?: ProjectionRef[];
}
