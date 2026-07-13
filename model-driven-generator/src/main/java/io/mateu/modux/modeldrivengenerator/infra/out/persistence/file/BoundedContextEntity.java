package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.SubdomainType;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.Builder;

import java.util.List;

/**
 * Copy-with-changes goes through {@code toBuilder()} — never through a positional constructor:
 * the compat constructors below exist for legacy callers only, and copying through them silently
 * nulls every newer field (that bug shipped three times before the builder was added).
 */
@Builder(toBuilder = true)
public record BoundedContextEntity(
        String id,
        String name,
        String gitRepository,
        List<String> aggregateIds,
        List<String> entityIds,
        List<String> valueObjectIds,
        List<String> useCaseIds,
        List<String> domainEventIds,
        List<String> projectionIds,
        List<String> readModelIds,
        List<String> subscriptionIds,
        List<String> sagaIds,
        List<String> scheduledTriggerIds,
        List<BddScenarioEntity> bddScenarios,
        String llmSystemPrompt,
        String tableNamePrefix,
        boolean autoTableNamePrefix,
        String version,
        List<BffEntity> bffs,
        List<AclEntity> acls,
        List<DomainPolicyEntity> domainPolicies,
        List<InvariantEntity> invariants,
        /** Strategic classification (core/supporting/generic) — drives investment advice and map colouring. */
        SubdomainType subdomainType,
        /** Data-scoped authorization (ABAC-lite): which rows a subject may see/act on. */
        List<AccessPolicyEntity> accessPolicies,
        /** Business metrics declared by intent (measure over events, by time grain and dimensions). */
        List<KpiEntity> kpis,
        /** Architecture decisions (ADRs) this boundedContext traces back to. */
        List<String> decisionIds,
        /** Responsibility of this bounded context, in prose (feeds the design document). */
        String description,
        /** "The read side lives elsewhere": boundedContext that serves this boundedContext's reads (e.g. a CQRS read side). */
        String readSideBoundedContextId,
        /** "The read side lives elsewhere": external system that serves this boundedContext's reads. */
        String readSideExternalSystemId,
        /** How the delegated read side is fed from here (e.g. "CDC", "events", "API"); prose, feeds the HLA. */
        String readSideVia,
        /** Domain services owned by this bounded context (stateless domain logic; they emit domain events). */
        List<String> domainServiceIds,
        /** Application events owned by this bounded context (published by its use cases). */
        List<String> applicationEventIds,
        /** The IdP whose tokens this bounded context validates. */
        String identityProviderId,
        /** UI apps owned by this bounded context (dropped inside it on the context map). */
        List<String> uiAdapterIds
) implements Identifiable {

    /** Backward-compatible constructor (pre-uiAdapterIds callers and stores). */
    public BoundedContextEntity(String id, String name, String gitRepository, List<String> aggregateIds,
                        List<String> entityIds, List<String> valueObjectIds, List<String> useCaseIds,
                        List<String> domainEventIds, List<String> projectionIds, List<String> readModelIds,
                        List<String> subscriptionIds, List<String> sagaIds, List<String> scheduledTriggerIds,
                        List<BddScenarioEntity> bddScenarios, String llmSystemPrompt, String tableNamePrefix,
                        boolean autoTableNamePrefix, String version, List<BffEntity> bffs, List<AclEntity> acls,
                        List<DomainPolicyEntity> domainPolicies, List<InvariantEntity> invariants,
                        SubdomainType subdomainType, List<AccessPolicyEntity> accessPolicies,
                        List<KpiEntity> kpis, List<String> decisionIds, String description,
                        String readSideBoundedContextId, String readSideExternalSystemId, String readSideVia,
                        List<String> domainServiceIds, List<String> applicationEventIds,
                        String identityProviderId) {
        this(id, name, gitRepository, aggregateIds, entityIds, valueObjectIds, useCaseIds,
                domainEventIds, projectionIds, readModelIds, subscriptionIds, sagaIds,
                scheduledTriggerIds, bddScenarios, llmSystemPrompt, tableNamePrefix,
                autoTableNamePrefix, version, bffs, acls, domainPolicies, invariants, subdomainType,
                accessPolicies, kpis, decisionIds, description, readSideBoundedContextId,
                readSideExternalSystemId, readSideVia, domainServiceIds, applicationEventIds,
                identityProviderId, List.of());
    }

    /** Backward-compatible constructor (pre-identityProviderId callers and stores). */
    public BoundedContextEntity(String id, String name, String gitRepository, List<String> aggregateIds,
                        List<String> entityIds, List<String> valueObjectIds, List<String> useCaseIds,
                        List<String> domainEventIds, List<String> projectionIds, List<String> readModelIds,
                        List<String> subscriptionIds, List<String> sagaIds, List<String> scheduledTriggerIds,
                        List<BddScenarioEntity> bddScenarios, String llmSystemPrompt, String tableNamePrefix,
                        boolean autoTableNamePrefix, String version, List<BffEntity> bffs, List<AclEntity> acls,
                        List<DomainPolicyEntity> domainPolicies, List<InvariantEntity> invariants,
                        SubdomainType subdomainType, List<AccessPolicyEntity> accessPolicies,
                        List<KpiEntity> kpis, List<String> decisionIds, String description,
                        String readSideBoundedContextId, String readSideExternalSystemId, String readSideVia,
                        List<String> domainServiceIds, List<String> applicationEventIds) {
        this(id, name, gitRepository, aggregateIds, entityIds, valueObjectIds, useCaseIds,
                domainEventIds, projectionIds, readModelIds, subscriptionIds, sagaIds,
                scheduledTriggerIds, bddScenarios, llmSystemPrompt, tableNamePrefix,
                autoTableNamePrefix, version, bffs, acls, domainPolicies, invariants, subdomainType,
                accessPolicies, kpis, decisionIds, description, readSideBoundedContextId,
                readSideExternalSystemId, readSideVia, domainServiceIds, applicationEventIds, null);
    }

    /** Backward-compatible constructor (pre-domainServiceIds callers and stores). */
    public BoundedContextEntity(String id, String name, String gitRepository,
                        List<String> aggregateIds, List<String> entityIds, List<String> valueObjectIds,
                        List<String> useCaseIds, List<String> domainEventIds, List<String> projectionIds,
                        List<String> readModelIds, List<String> subscriptionIds, List<String> sagaIds,
                        List<String> scheduledTriggerIds, List<BddScenarioEntity> bddScenarios,
                        String llmSystemPrompt, String tableNamePrefix, boolean autoTableNamePrefix,
                        String version, List<BffEntity> bffs, List<AclEntity> acls,
                        List<DomainPolicyEntity> domainPolicies, List<InvariantEntity> invariants,
                        SubdomainType subdomainType, List<AccessPolicyEntity> accessPolicies,
                        List<KpiEntity> kpis, List<String> decisionIds, String description,
                        String readSideBoundedContextId, String readSideExternalSystemId, String readSideVia) {
        this(id, name, gitRepository, aggregateIds, entityIds, valueObjectIds, useCaseIds,
                domainEventIds, projectionIds, readModelIds, subscriptionIds, sagaIds,
                scheduledTriggerIds, bddScenarios, llmSystemPrompt, tableNamePrefix,
                autoTableNamePrefix, version, bffs, acls, domainPolicies, invariants,
                subdomainType, accessPolicies, kpis, decisionIds, description,
                readSideBoundedContextId, readSideExternalSystemId, readSideVia, List.of(), List.of());
    }

    /** Backward-compatible constructor (pre subdomain/accessPolicies/kpis callers and stores). */
    public BoundedContextEntity(String id, String name, String gitRepository,
                        List<String> aggregateIds, List<String> entityIds, List<String> valueObjectIds,
                        List<String> useCaseIds, List<String> domainEventIds, List<String> projectionIds,
                        List<String> readModelIds, List<String> subscriptionIds, List<String> sagaIds,
                        List<String> scheduledTriggerIds, List<BddScenarioEntity> bddScenarios,
                        String llmSystemPrompt, String tableNamePrefix, boolean autoTableNamePrefix,
                        String version, List<BffEntity> bffs, List<AclEntity> acls,
                        List<DomainPolicyEntity> domainPolicies, List<InvariantEntity> invariants) {
        this(id, name, gitRepository, aggregateIds, entityIds, valueObjectIds, useCaseIds,
                domainEventIds, projectionIds, readModelIds, subscriptionIds, sagaIds,
                scheduledTriggerIds, bddScenarios, llmSystemPrompt, tableNamePrefix,
                autoTableNamePrefix, version, bffs, acls, domainPolicies, invariants,
                null, List.of(), List.of(), List.of(), null, null, null, null);
    }

    /** Backward-compatible constructor (pre-decisionIds callers). */
    public BoundedContextEntity(String id, String name, String gitRepository,
                        List<String> aggregateIds, List<String> entityIds, List<String> valueObjectIds,
                        List<String> useCaseIds, List<String> domainEventIds, List<String> projectionIds,
                        List<String> readModelIds, List<String> subscriptionIds, List<String> sagaIds,
                        List<String> scheduledTriggerIds, List<BddScenarioEntity> bddScenarios,
                        String llmSystemPrompt, String tableNamePrefix, boolean autoTableNamePrefix,
                        String version, List<BffEntity> bffs, List<AclEntity> acls,
                        List<DomainPolicyEntity> domainPolicies, List<InvariantEntity> invariants,
                        SubdomainType subdomainType, List<AccessPolicyEntity> accessPolicies,
                        List<KpiEntity> kpis) {
        this(id, name, gitRepository, aggregateIds, entityIds, valueObjectIds, useCaseIds,
                domainEventIds, projectionIds, readModelIds, subscriptionIds, sagaIds,
                scheduledTriggerIds, bddScenarios, llmSystemPrompt, tableNamePrefix,
                autoTableNamePrefix, version, bffs, acls, domainPolicies, invariants,
                subdomainType, accessPolicies, kpis, List.of(), null, null, null, null);
    }

    /** Backward-compatible constructor (pre read-delegation callers). */
    public BoundedContextEntity(String id, String name, String gitRepository,
                        List<String> aggregateIds, List<String> entityIds, List<String> valueObjectIds,
                        List<String> useCaseIds, List<String> domainEventIds, List<String> projectionIds,
                        List<String> readModelIds, List<String> subscriptionIds, List<String> sagaIds,
                        List<String> scheduledTriggerIds, List<BddScenarioEntity> bddScenarios,
                        String llmSystemPrompt, String tableNamePrefix, boolean autoTableNamePrefix,
                        String version, List<BffEntity> bffs, List<AclEntity> acls,
                        List<DomainPolicyEntity> domainPolicies, List<InvariantEntity> invariants,
                        SubdomainType subdomainType, List<AccessPolicyEntity> accessPolicies,
                        List<KpiEntity> kpis, List<String> decisionIds, String description) {
        this(id, name, gitRepository, aggregateIds, entityIds, valueObjectIds, useCaseIds,
                domainEventIds, projectionIds, readModelIds, subscriptionIds, sagaIds,
                scheduledTriggerIds, bddScenarios, llmSystemPrompt, tableNamePrefix,
                autoTableNamePrefix, version, bffs, acls, domainPolicies, invariants,
                subdomainType, accessPolicies, kpis, decisionIds, description, null, null, null);
    }

    public List<AccessPolicyEntity> accessPolicies() {
        return accessPolicies != null ? accessPolicies : List.of();
    }

    public List<KpiEntity> kpis() {
        return kpis != null ? kpis : List.of();
    }

    public List<String> domainServiceIds() {
        return domainServiceIds != null ? domainServiceIds : List.of();
    }

    public List<String> applicationEventIds() {
        return applicationEventIds != null ? applicationEventIds : List.of();
    }

    public List<String> uiAdapterIds() {
        return uiAdapterIds != null ? uiAdapterIds : List.of();
    }
}
