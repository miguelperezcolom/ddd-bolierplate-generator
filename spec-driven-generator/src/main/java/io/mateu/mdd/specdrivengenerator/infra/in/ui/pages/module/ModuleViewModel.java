package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.module;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ModuleDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.module.BddScenarioData;
import io.mateu.mdd.specdrivengenerator.application.usecases.module.create.CreateModuleCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.module.create.CreateModuleUseCase;
import io.mateu.mdd.specdrivengenerator.application.usecases.module.save.SaveModuleCommand;
import io.mateu.mdd.specdrivengenerator.application.usecases.module.save.SaveModuleUseCase;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.AggregateIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.AggregateIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import io.mateu.uidl.annotations.Tab;
import io.mateu.uidl.interfaces.CrudCreationForm;
import io.mateu.uidl.interfaces.CrudEditorForm;
import io.mateu.uidl.interfaces.HttpRequest;
import io.mateu.uidl.interfaces.Identifiable;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class ModuleViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {
    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;
    @NotEmpty String name;
    String gitRepository;
    @Lookup(search = AggregateIdOptionsSupplier.class, label = AggregateIdLabelSupplier.class)
    List<String> aggregates;

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    List<String> useCaseIds;

    @Lookup(search = DomainEventIdOptionsSupplier.class, label = DomainEventIdLabelSupplier.class)
    List<String> domainEventIds;

    String llmSystemPrompt;
    String tableNamePrefix;
    boolean autoTableNamePrefix;

    @Tab("BDD Tests")
    List<BddScenarioViewModel> bddScenarios = new ArrayList<>();

    final CreateModuleUseCase createUseCase;
    final SaveModuleUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateModuleCommand(id, name, gitRepository, aggregates, useCaseIds, domainEventIds, toBddScenarioData(bddScenarios), llmSystemPrompt, tableNamePrefix, autoTableNamePrefix));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveModuleCommand(id, name, gitRepository, aggregates, useCaseIds, domainEventIds, toBddScenarioData(bddScenarios), llmSystemPrompt, tableNamePrefix, autoTableNamePrefix));
    }

    @Override
    public String id() {
        return id;
    }

    public ModuleViewModel load(ModuleDto model) {
        id = model.id();
        name = model.name();
        gitRepository = model.gitRepository();
        aggregates = model.aggregateIds();
        useCaseIds = model.useCaseIds();
        domainEventIds = model.domainEventIds();
        llmSystemPrompt = model.llmSystemPrompt();
        tableNamePrefix = model.tableNamePrefix();
        autoTableNamePrefix = model.autoTableNamePrefix();
        bddScenarios = model.bddScenarios() == null ? new ArrayList<>() :
                model.bddScenarios().stream().map(s -> {
                    var vm = new BddScenarioViewModel();
                    vm.id = s.id();
                    vm.feature = s.feature();
                    vm.name = s.name();
                    vm.tags = s.tags();
                    vm.steps = s.steps();
                    return vm;
                }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        return this;
    }

    private List<BddScenarioData> toBddScenarioData(List<BddScenarioViewModel> scenarios) {
        if (scenarios == null) return List.of();
        return scenarios.stream()
                .map(s -> new BddScenarioData(s.id, s.feature, s.name, s.tags, s.steps))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New aggregate";
    }
}
