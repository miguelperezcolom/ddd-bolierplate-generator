package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.BoundedContextRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.Invariant;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.vo.InvariantCondition;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.vo.InvariantId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.vo.InvariantName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.BoundedContext;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.Acl;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.BddScenario;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.Bff;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.DomainPolicy;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.BoundedContextId;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AclEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BddScenarioEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BffEntity;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainPolicyEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.InvariantConditionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.InvariantEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoundedContextFileRepository implements BoundedContextRepository {

    final ModelStore repository;

    @Override
    public Optional<BoundedContext> findById(BoundedContextId id) {
        return repository.findById(id.id(), BoundedContextEntity.class)
                .map(entity -> BoundedContext.load(entity.id(), entity.name(), entity.gitRepository(),
                        entity.aggregateIds(),
                        entity.entityIds(),
                        entity.valueObjectIds(),
                        entity.useCaseIds(),
                        entity.domainEventIds(),
                        entity.projectionIds(),
                        entity.readModelIds(),
                        entity.subscriptionIds(),
                        entity.sagaIds(),
                        entity.scheduledTriggerIds(),
                        entity.bddScenarios() == null ? List.of() :
                                entity.bddScenarios().stream()
                                        .map(s -> new BddScenario(s.id(), s.feature(), s.name(), s.tags(), s.steps()))
                                        .toList(),
                        entity.llmSystemPrompt(),
                        entity.tableNamePrefix(), entity.autoTableNamePrefix(), entity.version(),
                        entity.bffs() == null ? List.<Bff>of() : entity.bffs().stream()
                                .map(b -> new Bff(b.id(), b.name(), b.clientType(), b.description(), b.basePath(), b.authRequired(), b.exposedUseCaseIds()))
                                .toList(),
                        entity.acls() == null ? List.<Acl>of() : entity.acls().stream()
                                .map(a -> new Acl(a.id(), a.name(), a.externalSystem(), a.description(), a.direction(), a.gatewayId(), a.translatedDomainEventIds(), a.translatedUseCaseIds()))
                                .toList(),
                        entity.domainPolicies() == null ? List.<DomainPolicy>of() : entity.domainPolicies().stream()
                                .map(p -> new DomainPolicy(p.id(), p.name(), p.triggeringEventId(), p.useCaseId(), p.description()))
                                .toList(),
                        entity.invariants() == null ? List.<Invariant>of() : entity.invariants().stream()
                                .map(inv -> Invariant.of(new InvariantId(inv.id()), new InvariantName(inv.name()),
                                        inv.conditions() == null ? List.of() : inv.conditions().stream()
                                                .map(c -> new InvariantCondition(c.id(), c.expression(), c.custom(), c.description(), c.errorMessage()))
                                                .toList()))
                                .toList()));
    }

    @Override
    public BoundedContext save(BoundedContext entity) {
        var bddScenarioEntities = entity.getBddScenarios() == null ? List.<BddScenarioEntity>of() :
                entity.getBddScenarios().stream()
                        .map(s -> new BddScenarioEntity(s.id(), s.feature(), s.name(), s.tags(), s.steps()))
                        .toList();
        // Carry over fields the domain BoundedContext does not (yet) model, so a UI save never wipes
        // what was authored in the YAML store.
        var existing = repository.findById(entity.getId().id(), BoundedContextEntity.class).orElse(null);
        repository.save(new BoundedContextEntity(entity.getId().id(), entity.getName().name(), entity.getGitRepository(),
                entity.getAggregateIds().stream().map(AggregateId::id).toList(),
                entity.getEntityIds(),
                entity.getValueObjectIds(),
                entity.getUseCaseIds(),
                entity.getDomainEventIds(),
                entity.getProjectionIds(),
                entity.getReadModelIds(),
                entity.getSubscriptionIds(),
                entity.getSagaIds(),
                entity.getScheduledTriggerIds(),
                bddScenarioEntities,
                entity.getLlmSystemPrompt(),
                entity.getTableNamePrefix(), entity.isAutoTableNamePrefix(), entity.getVersion(),
                entity.getBffs() == null ? List.<BffEntity>of() : entity.getBffs().stream()
                        .map(b -> new BffEntity(b.id(), b.name(), b.clientType(), b.description(), b.basePath(), b.authRequired(), b.exposedUseCaseIds()))
                        .toList(),
                entity.getAcls() == null ? List.<AclEntity>of() : entity.getAcls().stream()
                        .map(a -> new AclEntity(a.id(), a.name(), a.externalSystem(), a.description(), a.direction(), a.gatewayId(), a.translatedDomainEventIds(), a.translatedUseCaseIds()))
                        .toList(),
                entity.getDomainPolicies() == null ? List.<DomainPolicyEntity>of() : entity.getDomainPolicies().stream()
                        .map(p -> new DomainPolicyEntity(p.id(), p.name(), p.triggeringEventId(), p.useCaseId(), p.description()))
                        .toList(),
                entity.getInvariants() == null ? List.<InvariantEntity>of() : entity.getInvariants().stream()
                        .map(inv -> new InvariantEntity(inv.getId().id(), inv.getName().name(),
                                inv.getConditions() == null ? List.of() : inv.getConditions().stream()
                                        .map(c -> new InvariantConditionEntity(c.id(), c.expression(), c.custom(), c.description(), c.errorMessage()))
                                        .toList()))
                        .toList(),
                existing != null ? existing.subdomainType() : null,
                existing != null ? existing.accessPolicies() : List.of(),
                existing != null ? existing.kpis() : List.of(),
                existing != null ? existing.decisionIds() : List.of(),
                existing != null ? existing.description() : null,
                existing != null ? existing.readSideBoundedContextId() : null,
                existing != null ? existing.readSideExternalSystemId() : null,
                existing != null ? existing.readSideVia() : null,
                existing != null ? existing.domainServiceIds() : List.of(),
                existing != null ? existing.applicationEventIds() : List.of()));
        return entity;
    }

    @Override
    public void deleteAllById(List<BoundedContextId> selectedIds) {
        repository.deleteAllById(selectedIds.stream().map(BoundedContextId::id).toList(), BoundedContextEntity.class);
    }
}
