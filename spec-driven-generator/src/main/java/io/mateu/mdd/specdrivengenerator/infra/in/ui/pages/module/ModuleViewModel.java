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
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.EntityIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.EntityIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ValueObjectIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ValueObjectIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.DomainEventIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ProjectionIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ProjectionIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ReadModelIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ReadModelIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.SubscriptionIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.SubscriptionIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.SagaIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.SagaIdOptionsSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ScheduledTriggerIdLabelSupplier;
import io.mateu.mdd.specdrivengenerator.infra.in.ui.suppliers.ScheduledTriggerIdOptionsSupplier;
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

    @Lookup(search = EntityIdOptionsSupplier.class, label = EntityIdLabelSupplier.class)
    List<String> entityIds;

    @Lookup(search = ValueObjectIdOptionsSupplier.class, label = ValueObjectIdLabelSupplier.class)
    List<String> valueObjectIds;

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    List<String> useCaseIds;

    @Lookup(search = DomainEventIdOptionsSupplier.class, label = DomainEventIdLabelSupplier.class)
    List<String> domainEventIds;

    @Lookup(search = ProjectionIdOptionsSupplier.class, label = ProjectionIdLabelSupplier.class)
    List<String> projectionIds;

    @Lookup(search = ReadModelIdOptionsSupplier.class, label = ReadModelIdLabelSupplier.class)
    List<String> readModelIds;

    @Lookup(search = SubscriptionIdOptionsSupplier.class, label = SubscriptionIdLabelSupplier.class)
    List<String> subscriptionIds;

    @Lookup(search = SagaIdOptionsSupplier.class, label = SagaIdLabelSupplier.class)
    List<String> sagaIds;

    @Lookup(search = ScheduledTriggerIdOptionsSupplier.class, label = ScheduledTriggerIdLabelSupplier.class)
    List<String> scheduledTriggerIds;

    String llmSystemPrompt;
    String tableNamePrefix;
    boolean autoTableNamePrefix;

    @Tab("BDD Tests")
    List<BddScenarioViewModel> bddScenarios = new ArrayList<>();

    final CreateModuleUseCase createUseCase;
    final SaveModuleUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateModuleCommand(id, name, gitRepository, aggregates, entityIds, valueObjectIds, useCaseIds, domainEventIds, projectionIds, readModelIds, subscriptionIds, sagaIds, scheduledTriggerIds, toBddScenarioData(bddScenarios), llmSystemPrompt, tableNamePrefix, autoTableNamePrefix));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveModuleCommand(id, name, gitRepository, aggregates, entityIds, valueObjectIds, useCaseIds, domainEventIds, projectionIds, readModelIds, subscriptionIds, sagaIds, scheduledTriggerIds, toBddScenarioData(bddScenarios), llmSystemPrompt, tableNamePrefix, autoTableNamePrefix));
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
        entityIds = model.entityIds();
        valueObjectIds = model.valueObjectIds();
        useCaseIds = model.useCaseIds();
        domainEventIds = model.domainEventIds();
        projectionIds = model.projectionIds();
        readModelIds = model.readModelIds();
        subscriptionIds = model.subscriptionIds();
        sagaIds = model.sagaIds();
        scheduledTriggerIds = model.scheduledTriggerIds();
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
