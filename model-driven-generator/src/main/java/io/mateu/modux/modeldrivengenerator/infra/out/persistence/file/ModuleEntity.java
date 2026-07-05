package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.SubdomainType;
import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ModuleEntity(
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
        /** Architecture decisions (ADRs) this module traces back to. */
        List<String> decisionIds,
        /** Responsibility of this bounded context, in prose (feeds the design document). */
        String description,
        /** "The read side lives elsewhere": module that serves this module's reads (e.g. a CQRS read side). */
        String readSideModuleId,
        /** "The read side lives elsewhere": external system that serves this module's reads. */
        String readSideExternalSystemId,
        /** How the delegated read side is fed from here (e.g. "CDC", "events", "API"); prose, feeds the HLA. */
        String readSideVia
) implements Identifiable {

    /** Backward-compatible constructor (pre subdomain/accessPolicies/kpis callers and stores). */
    public ModuleEntity(String id, String name, String gitRepository,
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
    public ModuleEntity(String id, String name, String gitRepository,
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
    public ModuleEntity(String id, String name, String gitRepository,
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
}
