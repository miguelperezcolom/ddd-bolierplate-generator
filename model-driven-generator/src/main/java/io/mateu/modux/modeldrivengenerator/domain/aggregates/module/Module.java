package io.mateu.modux.modeldrivengenerator.domain.aggregates.module;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.Invariant;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.Acl;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.BddScenario;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.Bff;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.DomainPolicy;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.ModuleId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.ModuleName;
import lombok.Getter;

import java.util.List;

@Getter
public class Module {

    private ModuleId id;
    private ModuleName name;
    private String gitRepository;
    private List<AggregateId> aggregateIds;
    private List<String> entityIds;
    private List<String> valueObjectIds;
    private List<String> useCaseIds;
    private List<String> domainEventIds;
    private List<String> projectionIds;
    private List<String> readModelIds;
    private List<String> subscriptionIds;
    private List<String> sagaIds;
    private List<String> scheduledTriggerIds;
    private List<BddScenario> bddScenarios;
    private String llmSystemPrompt;
    private String tableNamePrefix;
    private boolean autoTableNamePrefix;
    private String version;
    private List<Bff> bffs;
    private List<Acl> acls;
    private List<DomainPolicy> domainPolicies;
    private List<Invariant> invariants;

    public static Module of(ModuleId id, ModuleName name, String gitRepository,
                            List<AggregateId> aggregateIds, List<String> entityIds, List<String> valueObjectIds,
                            List<String> useCaseIds, List<String> domainEventIds,
                            List<String> projectionIds, List<String> readModelIds,
                            List<String> subscriptionIds, List<String> sagaIds, List<String> scheduledTriggerIds,
                            List<BddScenario> bddScenarios, String llmSystemPrompt,
                            String tableNamePrefix, boolean autoTableNamePrefix, String version,
                            List<Bff> bffs, List<Acl> acls, List<DomainPolicy> domainPolicies,
                            List<Invariant> invariants) {
        var module = new Module();
        module.id = id;
        module.name = name;
        module.gitRepository = gitRepository;
        module.aggregateIds = aggregateIds != null ? aggregateIds : List.of();
        module.entityIds = entityIds != null ? entityIds : List.of();
        module.valueObjectIds = valueObjectIds != null ? valueObjectIds : List.of();
        module.useCaseIds = useCaseIds != null ? useCaseIds : List.of();
        module.domainEventIds = domainEventIds != null ? domainEventIds : List.of();
        module.projectionIds = projectionIds != null ? projectionIds : List.of();
        module.readModelIds = readModelIds != null ? readModelIds : List.of();
        module.subscriptionIds = subscriptionIds != null ? subscriptionIds : List.of();
        module.sagaIds = sagaIds != null ? sagaIds : List.of();
        module.scheduledTriggerIds = scheduledTriggerIds != null ? scheduledTriggerIds : List.of();
        module.bddScenarios = bddScenarios != null ? bddScenarios : List.of();
        module.llmSystemPrompt = llmSystemPrompt;
        module.tableNamePrefix = tableNamePrefix;
        module.autoTableNamePrefix = autoTableNamePrefix;
        module.version = version;
        module.bffs = bffs != null ? bffs : List.of();
        module.acls = acls != null ? acls : List.of();
        module.domainPolicies = domainPolicies != null ? domainPolicies : List.of();
        module.invariants = invariants != null ? invariants : List.of();
        return module;
    }

    public static Module load(String id, String name, String gitRepository,
                              List<String> aggregateIds, List<String> entityIds, List<String> valueObjectIds,
                              List<String> useCaseIds, List<String> domainEventIds,
                              List<String> projectionIds, List<String> readModelIds,
                              List<String> subscriptionIds, List<String> sagaIds, List<String> scheduledTriggerIds,
                              List<BddScenario> bddScenarios, String llmSystemPrompt,
                              String tableNamePrefix, boolean autoTableNamePrefix, String version,
                              List<Bff> bffs, List<Acl> acls, List<DomainPolicy> domainPolicies,
                              List<Invariant> invariants) {
        var module = new Module();
        module.id = new ModuleId(id);
        module.name = new ModuleName(name);
        module.gitRepository = gitRepository;
        module.aggregateIds = aggregateIds != null ? aggregateIds.stream().map(AggregateId::new).toList() : List.of();
        module.entityIds = entityIds != null ? entityIds : List.of();
        module.valueObjectIds = valueObjectIds != null ? valueObjectIds : List.of();
        module.useCaseIds = useCaseIds != null ? useCaseIds : List.of();
        module.domainEventIds = domainEventIds != null ? domainEventIds : List.of();
        module.projectionIds = projectionIds != null ? projectionIds : List.of();
        module.readModelIds = readModelIds != null ? readModelIds : List.of();
        module.subscriptionIds = subscriptionIds != null ? subscriptionIds : List.of();
        module.sagaIds = sagaIds != null ? sagaIds : List.of();
        module.scheduledTriggerIds = scheduledTriggerIds != null ? scheduledTriggerIds : List.of();
        module.bddScenarios = bddScenarios != null ? bddScenarios : List.of();
        module.llmSystemPrompt = llmSystemPrompt;
        module.tableNamePrefix = tableNamePrefix;
        module.autoTableNamePrefix = autoTableNamePrefix;
        module.version = version;
        module.bffs = bffs != null ? bffs : List.of();
        module.acls = acls != null ? acls : List.of();
        module.domainPolicies = domainPolicies != null ? domainPolicies : List.of();
        module.invariants = invariants != null ? invariants : List.of();
        return module;
    }

    public void update(ModuleName name, String gitRepository,
                       List<AggregateId> aggregateIds, List<String> entityIds, List<String> valueObjectIds,
                       List<String> useCaseIds, List<String> domainEventIds,
                       List<String> projectionIds, List<String> readModelIds,
                       List<String> subscriptionIds, List<String> sagaIds, List<String> scheduledTriggerIds,
                       List<BddScenario> bddScenarios, String llmSystemPrompt,
                       String tableNamePrefix, boolean autoTableNamePrefix, String version,
                       List<Bff> bffs, List<Acl> acls, List<DomainPolicy> domainPolicies,
                       List<Invariant> invariants) {
        this.name = name;
        this.gitRepository = gitRepository;
        this.aggregateIds = aggregateIds != null ? aggregateIds : List.of();
        this.entityIds = entityIds != null ? entityIds : List.of();
        this.valueObjectIds = valueObjectIds != null ? valueObjectIds : List.of();
        this.useCaseIds = useCaseIds != null ? useCaseIds : List.of();
        this.domainEventIds = domainEventIds != null ? domainEventIds : List.of();
        this.projectionIds = projectionIds != null ? projectionIds : List.of();
        this.readModelIds = readModelIds != null ? readModelIds : List.of();
        this.subscriptionIds = subscriptionIds != null ? subscriptionIds : List.of();
        this.sagaIds = sagaIds != null ? sagaIds : List.of();
        this.scheduledTriggerIds = scheduledTriggerIds != null ? scheduledTriggerIds : List.of();
        this.bddScenarios = bddScenarios != null ? bddScenarios : List.of();
        this.llmSystemPrompt = llmSystemPrompt;
        this.tableNamePrefix = tableNamePrefix;
        this.autoTableNamePrefix = autoTableNamePrefix;
        this.version = version;
        this.bffs = bffs != null ? bffs : List.of();
        this.acls = acls != null ? acls : List.of();
        this.domainPolicies = domainPolicies != null ? domainPolicies : List.of();
        this.invariants = invariants != null ? invariants : List.of();
    }
}
