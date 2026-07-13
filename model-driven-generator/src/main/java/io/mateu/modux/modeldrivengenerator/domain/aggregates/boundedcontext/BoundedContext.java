package io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.Invariant;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.Acl;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.BddScenario;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.Bff;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.DomainPolicy;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.BoundedContextId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.BoundedContextName;
import lombok.Getter;

import java.util.List;

@Getter
public class BoundedContext {

    private BoundedContextId id;
    private BoundedContextName name;
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

    public static BoundedContext of(BoundedContextId id, BoundedContextName name, String gitRepository,
                            List<AggregateId> aggregateIds, List<String> entityIds, List<String> valueObjectIds,
                            List<String> useCaseIds, List<String> domainEventIds,
                            List<String> projectionIds,
                            List<String> readModelIds,
                            List<String> subscriptionIds, List<String> sagaIds, List<String> scheduledTriggerIds,
                            List<BddScenario> bddScenarios, String llmSystemPrompt,
                            String tableNamePrefix, boolean autoTableNamePrefix, String version,
                            List<Bff> bffs, List<Acl> acls, List<DomainPolicy> domainPolicies,
                            List<Invariant> invariants) {
        var boundedContext = new BoundedContext();
        boundedContext.id = id;
        boundedContext.name = name;
        boundedContext.gitRepository = gitRepository;
        boundedContext.aggregateIds = aggregateIds != null ? aggregateIds : List.of();
        boundedContext.entityIds = entityIds != null ? entityIds : List.of();
        boundedContext.valueObjectIds = valueObjectIds != null ? valueObjectIds : List.of();
        boundedContext.useCaseIds = useCaseIds != null ? useCaseIds : List.of();
        boundedContext.domainEventIds = domainEventIds != null ? domainEventIds : List.of();
        boundedContext.projectionIds = projectionIds != null ? projectionIds : List.of();
        boundedContext.readModelIds = readModelIds != null ? readModelIds : List.of();
        boundedContext.subscriptionIds = subscriptionIds != null ? subscriptionIds : List.of();
        boundedContext.sagaIds = sagaIds != null ? sagaIds : List.of();
        boundedContext.scheduledTriggerIds = scheduledTriggerIds != null ? scheduledTriggerIds : List.of();
        boundedContext.bddScenarios = bddScenarios != null ? bddScenarios : List.of();
        boundedContext.llmSystemPrompt = llmSystemPrompt;
        boundedContext.tableNamePrefix = tableNamePrefix;
        boundedContext.autoTableNamePrefix = autoTableNamePrefix;
        boundedContext.version = version;
        boundedContext.bffs = bffs != null ? bffs : List.of();
        boundedContext.acls = acls != null ? acls : List.of();
        boundedContext.domainPolicies = domainPolicies != null ? domainPolicies : List.of();
        boundedContext.invariants = invariants != null ? invariants : List.of();
        return boundedContext;
    }

    public static BoundedContext load(String id, String name, String gitRepository,
                              List<String> aggregateIds, List<String> entityIds, List<String> valueObjectIds,
                              List<String> useCaseIds, List<String> domainEventIds,
                              List<String> projectionIds,
                              List<String> readModelIds,
                              List<String> subscriptionIds, List<String> sagaIds, List<String> scheduledTriggerIds,
                              List<BddScenario> bddScenarios, String llmSystemPrompt,
                              String tableNamePrefix, boolean autoTableNamePrefix, String version,
                              List<Bff> bffs, List<Acl> acls, List<DomainPolicy> domainPolicies,
                              List<Invariant> invariants) {
        var boundedContext = new BoundedContext();
        boundedContext.id = new BoundedContextId(id);
        boundedContext.name = new BoundedContextName(name);
        boundedContext.gitRepository = gitRepository;
        boundedContext.aggregateIds = aggregateIds != null ? aggregateIds.stream().map(AggregateId::new).toList() : List.of();
        boundedContext.entityIds = entityIds != null ? entityIds : List.of();
        boundedContext.valueObjectIds = valueObjectIds != null ? valueObjectIds : List.of();
        boundedContext.useCaseIds = useCaseIds != null ? useCaseIds : List.of();
        boundedContext.domainEventIds = domainEventIds != null ? domainEventIds : List.of();
        boundedContext.projectionIds = projectionIds != null ? projectionIds : List.of();
        boundedContext.readModelIds = readModelIds != null ? readModelIds : List.of();
        boundedContext.subscriptionIds = subscriptionIds != null ? subscriptionIds : List.of();
        boundedContext.sagaIds = sagaIds != null ? sagaIds : List.of();
        boundedContext.scheduledTriggerIds = scheduledTriggerIds != null ? scheduledTriggerIds : List.of();
        boundedContext.bddScenarios = bddScenarios != null ? bddScenarios : List.of();
        boundedContext.llmSystemPrompt = llmSystemPrompt;
        boundedContext.tableNamePrefix = tableNamePrefix;
        boundedContext.autoTableNamePrefix = autoTableNamePrefix;
        boundedContext.version = version;
        boundedContext.bffs = bffs != null ? bffs : List.of();
        boundedContext.acls = acls != null ? acls : List.of();
        boundedContext.domainPolicies = domainPolicies != null ? domainPolicies : List.of();
        boundedContext.invariants = invariants != null ? invariants : List.of();
        return boundedContext;
    }

    public void update(BoundedContextName name, String gitRepository,
                       List<AggregateId> aggregateIds, List<String> entityIds, List<String> valueObjectIds,
                       List<String> useCaseIds, List<String> domainEventIds,
                       List<String> projectionIds,
                       List<String> readModelIds,
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
