package io.mateu.modux.modeldrivengenerator.application.usecases.module.create;

import io.mateu.modux.modeldrivengenerator.application.out.repositories.ModuleRepository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.Invariant;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.vo.InvariantCondition;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.vo.InvariantId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.invariant.vo.InvariantName;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.Module;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.Acl;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.BddScenario;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.Bff;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.DomainPolicy;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.ModuleId;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.ModuleName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateModuleUseCase {

    final ModuleRepository repository;

    public void handle(CreateModuleCommand command) {
        var bddScenarios = command.bddScenarios() == null ? List.<BddScenario>of() :
                command.bddScenarios().stream()
                        .map(s -> new BddScenario(s.id(), s.feature(), s.name(), s.tags(), s.steps()))
                        .toList();
        var module = Module.of(new ModuleId(command.id()), new ModuleName(command.name()), command.gitRepository(),
                command.aggregates().stream().map(AggregateId::new).toList(),
                command.entityIds(), command.valueObjectIds(),
                command.useCaseIds(), command.domainEventIds(),
                command.projectionIds(),
                command.readModelIds(),
                command.subscriptionIds(), command.sagaIds(), command.scheduledTriggerIds(),
                bddScenarios, command.llmSystemPrompt(), command.tableNamePrefix(), command.autoTableNamePrefix(), command.version(),
                command.bffs() == null ? List.<Bff>of() : command.bffs().stream()
                        .map(b -> new Bff(b.id(), b.name(), b.clientType(), b.description(), b.basePath(), b.authRequired(), b.exposedUseCaseIds()))
                        .toList(),
                command.acls() == null ? List.<Acl>of() : command.acls().stream()
                        .map(a -> new Acl(a.id(), a.name(), a.externalSystem(), a.description(), a.direction(), a.gatewayId(), a.translatedDomainEventIds(), a.translatedUseCaseIds()))
                        .toList(),
                command.domainPolicies() == null ? List.<DomainPolicy>of() : command.domainPolicies().stream()
                        .map(p -> new DomainPolicy(p.id(), p.name(), p.triggeringEventId(), p.useCaseId(), p.description()))
                        .toList(),
                command.invariants() == null ? List.<Invariant>of() : command.invariants().stream()
                        .map(inv -> Invariant.of(new InvariantId(inv.id()), new InvariantName(inv.name()),
                                inv.conditions() == null ? List.of() : inv.conditions().stream()
                                        .map(c -> new InvariantCondition(c.id(), c.expression(), c.custom(), c.description(), c.errorMessage()))
                                        .toList()))
                        .toList());
        repository.save(module);
    }

}
