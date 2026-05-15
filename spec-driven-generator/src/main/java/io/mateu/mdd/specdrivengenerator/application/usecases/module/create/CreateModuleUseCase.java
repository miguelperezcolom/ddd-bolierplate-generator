package io.mateu.mdd.specdrivengenerator.application.usecases.module.create;

import io.mateu.mdd.specdrivengenerator.application.out.repositories.ModuleRepository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.Module;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.BddScenario;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.ModuleId;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.module.vo.ModuleName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CreateModuleUseCase {

    final ModuleRepository repository;

    public void handle(CreateModuleCommand command) {
        var bddScenarios = command.bddScenarios() == null ? List.of() :
                command.bddScenarios().stream()
                        .map(s -> new BddScenario(s.id(), s.feature(), s.name(), s.tags(), s.steps()))
                        .toList();
        var module = Module.of(new ModuleId(command.id()), new ModuleName(command.name()), command.gitRepository(),
                command.aggregates().stream().map(AggregateId::new).toList(),
                command.useCaseIds(), command.domainEventIds(),
                bddScenarios, command.llmSystemPrompt(), command.tableNamePrefix(), command.autoTableNamePrefix());
        repository.save(module);
    }

}
