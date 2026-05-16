package io.mateu.mdd.specdrivengenerator.infra.in.ui.pages.module;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ModuleDto;
import io.mateu.mdd.specdrivengenerator.application.usecases.module.AclData;
import io.mateu.mdd.specdrivengenerator.application.usecases.module.BddScenarioData;
import io.mateu.mdd.specdrivengenerator.application.usecases.module.BffData;
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
    String version;

    @Tab("BDD Tests")
    List<BddScenarioViewModel> bddScenarios = new ArrayList<>();

    @Tab("BFF")
    List<BffViewModel> bffs = new ArrayList<>();

    @Tab("ACL")
    List<AclViewModel> acls = new ArrayList<>();

    final CreateModuleUseCase createUseCase;
    final SaveModuleUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateModuleCommand(id, name, gitRepository, aggregates, entityIds, valueObjectIds, useCaseIds, domainEventIds, projectionIds, readModelIds, subscriptionIds, sagaIds, scheduledTriggerIds, toBddScenarioData(bddScenarios), llmSystemPrompt, tableNamePrefix, autoTableNamePrefix, version, toBffData(bffs), toAclData(acls)));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveModuleCommand(id, name, gitRepository, aggregates, entityIds, valueObjectIds, useCaseIds, domainEventIds, projectionIds, readModelIds, subscriptionIds, sagaIds, scheduledTriggerIds, toBddScenarioData(bddScenarios), llmSystemPrompt, tableNamePrefix, autoTableNamePrefix, version, toBffData(bffs), toAclData(acls)));
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
        version = model.version();
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
        bffs = model.bffs() == null ? new ArrayList<>() :
                model.bffs().stream().map(b -> {
                    var vm = new BffViewModel();
                    vm.id = b.id();
                    vm.name = b.name();
                    vm.clientType = b.clientType();
                    vm.description = b.description();
                    vm.basePath = b.basePath();
                    vm.authRequired = b.authRequired();
                    vm.exposedUseCaseIds = b.exposedUseCaseIds() != null ? new ArrayList<>(b.exposedUseCaseIds()) : new ArrayList<>();
                    vm.exposedReadModelIds = b.exposedReadModelIds() != null ? new ArrayList<>(b.exposedReadModelIds()) : new ArrayList<>();
                    return vm;
                }).collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        acls = model.acls() == null ? new ArrayList<>() :
                model.acls().stream().map(a -> {
                    var vm = new AclViewModel();
                    vm.id = a.id();
                    vm.name = a.name();
                    vm.externalSystem = a.externalSystem();
                    vm.description = a.description();
                    vm.direction = a.direction();
                    vm.gatewayId = a.gatewayId();
                    vm.translatedDomainEventIds = a.translatedDomainEventIds() != null ? new ArrayList<>(a.translatedDomainEventIds()) : new ArrayList<>();
                    vm.translatedUseCaseIds = a.translatedUseCaseIds() != null ? new ArrayList<>(a.translatedUseCaseIds()) : new ArrayList<>();
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

    private List<BffData> toBffData(List<BffViewModel> list) {
        if (list == null) return List.of();
        return list.stream()
                .map(b -> new BffData(b.id, b.name, b.clientType, b.description, b.basePath, b.authRequired, b.exposedUseCaseIds, b.exposedReadModelIds))
                .toList();
    }

    private List<AclData> toAclData(List<AclViewModel> list) {
        if (list == null) return List.of();
        return list.stream()
                .map(a -> new AclData(a.id, a.name, a.externalSystem, a.description, a.direction, a.gatewayId, a.translatedDomainEventIds, a.translatedUseCaseIds))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New aggregate";
    }
}
