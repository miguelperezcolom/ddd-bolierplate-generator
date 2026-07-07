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
}

export interface ExternalSystemRef {
  id: string;
  name: string;
}

export interface ContextMapRelation {
  /** Upstream side (U/D convention: source is upstream). */
  sourceId: string;
  targetId: string;
  type: ContextMapRelationType;
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
}
