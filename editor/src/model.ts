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
}

/** An API proxy/cache: fronts a published API, consumable exactly like it. */
export interface ProxyApiRef {
  id: string;
  name: string;
  targetApiId?: string;
  publishedByExternalSystemId?: string;
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

export interface ExternalSystemRef {
  id: string;
  name: string;
  /** Use cases this external system offers (targets of calls from our use cases). */
  useCases?: ExternalUseCaseRef[];
  /** Tables/datasets it owns — pollable into read models (legacy integration). */
  tables?: ExternalTableRef[];
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
  externalCalls?: ExternalCallRef[];
  externalUseCaseCalls?: ExternalUseCaseCallRef[];
  aiAgents?: AiAgentRef[];
  agentUses?: AgentUseRef[];
  agentExternalUses?: AgentExternalUseRef[];
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
