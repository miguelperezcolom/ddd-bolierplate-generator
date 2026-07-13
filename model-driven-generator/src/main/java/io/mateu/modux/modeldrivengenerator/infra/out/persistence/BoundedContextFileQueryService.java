package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.BoundedContextQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.AclDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.BddScenarioDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.BffDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.DomainPolicyDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.InvariantConditionDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.InvariantDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.BoundedContextDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.BoundedContextRow;

import java.util.List;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoundedContextFileQueryService implements BoundedContextQueryService {

    final ModelStore repository;

    @Override
    public ListingData<BoundedContextRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, BoundedContextEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new BoundedContextRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, BoundedContextEntity.class).map(BoundedContextEntity::name).orElseThrow();
    }

    @Override
    public Optional<BoundedContextDto> getById(String id) {
        return repository.findById(id, BoundedContextEntity.class)
                .map(entity -> new BoundedContextDto(entity.id(), entity.name(), entity.gitRepository(),
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
                                        .map(s -> new BddScenarioDto(s.id(), s.feature(), s.name(), s.tags(), s.steps()))
                                        .toList(),
                        entity.llmSystemPrompt(),
                        entity.tableNamePrefix(), entity.autoTableNamePrefix(), entity.version(),
                        entity.bffs() == null ? List.of() : entity.bffs().stream()
                                .map(b -> new BffDto(b.id(), b.name(), b.clientType(), b.description(), b.basePath(), b.authRequired(), b.exposedUseCaseIds()))
                                .toList(),
                        entity.acls() == null ? List.of() : entity.acls().stream()
                                .map(a -> new AclDto(a.id(), a.name(), a.externalSystem(), a.description(), a.direction(), a.gatewayId(), a.translatedDomainEventIds(), a.translatedUseCaseIds()))
                                .toList(),
                        entity.domainPolicies() == null ? List.<DomainPolicyDto>of() : entity.domainPolicies().stream()
                                .map(p -> new DomainPolicyDto(p.id(), p.name(), p.triggeringEventId(), p.useCaseId(), p.description()))
                                .toList(),
                        entity.invariants() == null ? List.<InvariantDto>of() : entity.invariants().stream()
                                .map(inv -> new InvariantDto(inv.id(), inv.name(),
                                        inv.conditions() == null ? List.of() : inv.conditions().stream()
                                                .map(c -> new InvariantConditionDto(c.id(), c.expression(), c.custom(), c.description(), c.errorMessage()))
                                                .toList()))
                                .toList()));
    }
}
