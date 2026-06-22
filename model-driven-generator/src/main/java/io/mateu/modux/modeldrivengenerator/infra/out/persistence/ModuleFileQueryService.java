package io.mateu.modux.modeldrivengenerator.infra.out.persistence;

import io.mateu.modux.modeldrivengenerator.application.out.query.ModuleQueryService;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.AclDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.BddScenarioDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.BffDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.DomainPolicyDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.InvariantConditionDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.InvariantDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModuleDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ModuleRow;

import java.util.List;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.uidl.data.ListingData;
import io.mateu.uidl.data.Page;
import io.mateu.uidl.data.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModuleFileQueryService implements ModuleQueryService {

    final CommonFileRepository repository;

    @Override
    public ListingData<ModuleRow> findAll(String searchText, Object filters, Pageable pageable) {
        var data = repository.findAll(searchText, filters, pageable, ModuleEntity.class);
        return new ListingData<>(new Page<>(
                data.page().searchSignature(),
                data.page().pageSize(),
                data.page().pageNumber(),
                data.page().totalElements(),
                data.page().content().stream()
                        .map(entity -> new ModuleRow(entity.id(), entity.name()))
                        .toList()));
    }

    @Override
    public String getLabel(String id) {
        return repository.findById(id, ModuleEntity.class).map(ModuleEntity::name).orElseThrow();
    }

    @Override
    public Optional<ModuleDto> getById(String id) {
        return repository.findById(id, ModuleEntity.class)
                .map(entity -> new ModuleDto(entity.id(), entity.name(), entity.gitRepository(),
                        entity.aggregateIds(),
                        entity.entityIds(),
                        entity.valueObjectIds(),
                        entity.useCaseIds(),
                        entity.domainEventIds(),
                        entity.projectionIds(),
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
