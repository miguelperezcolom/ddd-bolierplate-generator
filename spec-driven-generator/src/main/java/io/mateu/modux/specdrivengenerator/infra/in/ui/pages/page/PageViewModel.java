package io.mateu.modux.specdrivengenerator.infra.in.ui.pages.page;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.PageDto;
import io.mateu.modux.specdrivengenerator.application.usecases.page.create.CreatePageCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.page.create.CreatePageUseCase;
import io.mateu.modux.specdrivengenerator.application.usecases.page.save.SavePageCommand;
import io.mateu.modux.specdrivengenerator.application.usecases.page.save.SavePageUseCase;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageFieldStereotype;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageListingDataSourceType;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageRuleAction;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageRuleFieldAttribute;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageRuleResult;
import io.mateu.modux.specdrivengenerator.domain.aggregates.page.vo.PageTriggerType;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.AggregateIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.AggregateIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ComponentIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ComponentIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.GatewayIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.GatewayIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ReadModelIdLabelSupplier;
import io.mateu.modux.specdrivengenerator.infra.in.ui.suppliers.ReadModelIdOptionsSupplier;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.PageButtonEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.PageFieldConfigEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.PageRuleEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.PageTriggerEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.PageValidationEntity;
import io.mateu.modux.specdrivengenerator.infra.out.persistence.file.PageWizardStepEntity;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Hidden;
import io.mateu.uidl.annotations.Lookup;
import io.mateu.uidl.annotations.MasterDetail;
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
public class PageViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String route;

    PageType type;

    @Hidden("state['type'] != 'CRUD'")
    @Lookup(search = AggregateIdOptionsSupplier.class, label = AggregateIdLabelSupplier.class)
    String aggregateId;

    @Hidden("state['type'] != 'FORM'")
    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String modelId;

    @Hidden("state['type'] != 'DASHBOARD'")
    @Lookup(search = ComponentIdOptionsSupplier.class, label = ComponentIdLabelSupplier.class)
    List<String> componentIds;

    @Hidden("state['type'] != 'CRUD'")
    PageListingDataSourceType listingDataSourceType;

    @Hidden("state['type'] != 'CRUD' || state['listingDataSourceType'] != 'QUERY_SERVICE'")
    @Lookup(search = ReadModelIdOptionsSupplier.class, label = ReadModelIdLabelSupplier.class)
    String listingQueryServiceId;

    @Hidden("state['type'] != 'CRUD' || state['listingDataSourceType'] != 'GATEWAY'")
    @Lookup(search = GatewayIdOptionsSupplier.class, label = GatewayIdLabelSupplier.class)
    String listingGatewayId;

    @Tab
    @MasterDetail(minHeightWhenDetailVisible = "16rem")
    List<PageButtonViewModel> toolbar;

    @Tab
    @MasterDetail(minHeightWhenDetailVisible = "16rem")
    List<PageButtonViewModel> bottomBar;

    @Tab
    @MasterDetail(minHeightWhenDetailVisible = "16rem")
    List<PageTriggerViewModel> triggers;

    @Tab
    @MasterDetail(minHeightWhenDetailVisible = "16rem")
    List<PageRuleViewModel> rules;

    @Tab
    @MasterDetail(minHeightWhenDetailVisible = "16rem")
    List<PageValidationViewModel> validations;

    @Tab
    @MasterDetail(minHeightWhenDetailVisible = "16rem")
    List<PageFieldConfigViewModel> fieldConfigs;

    @Hidden("state['type'] != 'WIZARD'")
    @Tab
    @MasterDetail(minHeightWhenDetailVisible = "16rem")
    List<PageWizardStepViewModel> wizardSteps;

    @Hidden("state['type'] != 'WIZARD'")
    @Tab
    @MasterDetail(minHeightWhenDetailVisible = "16rem")
    List<PageButtonViewModel> completionActions;

    final CreatePageUseCase createUseCase;
    final SavePageUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreatePageCommand(id, name, route, type, aggregateId, modelId, componentIds,
                listingDataSourceType, listingQueryServiceId, listingGatewayId,
                toolbar != null ? toolbar.stream()
                        .map(v -> new PageButtonEntity(v.label(), v.icon(), v.useCaseId(), v.actionId()))
                        .toList() : List.of(),
                bottomBar != null ? bottomBar.stream()
                        .map(v -> new PageButtonEntity(v.label(), v.icon(), v.useCaseId(), v.actionId()))
                        .toList() : List.of(),
                triggers != null ? triggers.stream()
                        .map(v -> new PageTriggerEntity(
                                v.type() != null ? v.type().name() : null,
                                v.actionId(), v.timeoutMillis(), v.times(), v.condition(),
                                v.calledActionId(), v.propertyName(), v.eventName()))
                        .toList() : List.of(),
                rules != null ? rules.stream()
                        .map(v -> new PageRuleEntity(
                                v.filter(),
                                v.action() != null ? v.action().name() : null,
                                v.fieldName(),
                                v.fieldAttribute() != null ? v.fieldAttribute().name() : null,
                                v.value(), v.expression(), v.actionId(),
                                v.result() != null ? v.result().name() : null))
                        .toList() : List.of(),
                validations != null ? validations.stream()
                        .map(v -> new PageValidationEntity(v.condition(), v.fieldId(), v.message()))
                        .toList() : List.of(),
                fieldConfigs != null ? fieldConfigs.stream()
                        .map(v -> new PageFieldConfigEntity(v.fieldId(),
                                v.stereotype() != null ? v.stereotype().name() : null,
                                v.colspan(), v.style(), v.cssClass(), v.label(), v.help()))
                        .toList() : List.of(),
                wizardSteps != null ? wizardSteps.stream()
                        .map(v -> new PageWizardStepEntity(v.pageId(), v.label()))
                        .toList() : List.of(),
                completionActions != null ? completionActions.stream()
                        .map(v -> new PageButtonEntity(v.label(), v.icon(), v.useCaseId(), v.actionId()))
                        .toList() : List.of()));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SavePageCommand(id, name, route, type, aggregateId, modelId, componentIds,
                listingDataSourceType, listingQueryServiceId, listingGatewayId,
                toolbar != null ? toolbar.stream()
                        .map(v -> new PageButtonEntity(v.label(), v.icon(), v.useCaseId(), v.actionId()))
                        .toList() : List.of(),
                bottomBar != null ? bottomBar.stream()
                        .map(v -> new PageButtonEntity(v.label(), v.icon(), v.useCaseId(), v.actionId()))
                        .toList() : List.of(),
                triggers != null ? triggers.stream()
                        .map(v -> new PageTriggerEntity(
                                v.type() != null ? v.type().name() : null,
                                v.actionId(), v.timeoutMillis(), v.times(), v.condition(),
                                v.calledActionId(), v.propertyName(), v.eventName()))
                        .toList() : List.of(),
                rules != null ? rules.stream()
                        .map(v -> new PageRuleEntity(
                                v.filter(),
                                v.action() != null ? v.action().name() : null,
                                v.fieldName(),
                                v.fieldAttribute() != null ? v.fieldAttribute().name() : null,
                                v.value(), v.expression(), v.actionId(),
                                v.result() != null ? v.result().name() : null))
                        .toList() : List.of(),
                validations != null ? validations.stream()
                        .map(v -> new PageValidationEntity(v.condition(), v.fieldId(), v.message()))
                        .toList() : List.of(),
                fieldConfigs != null ? fieldConfigs.stream()
                        .map(v -> new PageFieldConfigEntity(v.fieldId(),
                                v.stereotype() != null ? v.stereotype().name() : null,
                                v.colspan(), v.style(), v.cssClass(), v.label(), v.help()))
                        .toList() : List.of(),
                wizardSteps != null ? wizardSteps.stream()
                        .map(v -> new PageWizardStepEntity(v.pageId(), v.label()))
                        .toList() : List.of(),
                completionActions != null ? completionActions.stream()
                        .map(v -> new PageButtonEntity(v.label(), v.icon(), v.useCaseId(), v.actionId()))
                        .toList() : List.of()));
    }

    @Override
    public String id() {
        return id;
    }

    public PageViewModel load(PageDto model) {
        id = model.id();
        name = model.name();
        route = model.route();
        type = model.type();
        aggregateId = model.aggregateId();
        modelId = model.modelId();
        componentIds = model.componentIds();
        listingDataSourceType = model.listingDataSourceType() != null
                ? PageListingDataSourceType.valueOf(model.listingDataSourceType()) : null;
        listingQueryServiceId = model.listingQueryServiceId();
        listingGatewayId = model.listingGatewayId();
        toolbar = model.toolbar() != null ? new ArrayList<>(model.toolbar().stream()
                .map(e -> new PageButtonViewModel(e.label(), e.icon(), e.useCaseId(), e.actionId()))
                .toList()) : new ArrayList<>();
        bottomBar = model.bottomBar() != null ? new ArrayList<>(model.bottomBar().stream()
                .map(e -> new PageButtonViewModel(e.label(), e.icon(), e.useCaseId(), e.actionId()))
                .toList()) : new ArrayList<>();
        triggers = model.triggers() != null ? new ArrayList<>(model.triggers().stream()
                .map(e -> new PageTriggerViewModel(
                        e.type() != null ? PageTriggerType.valueOf(e.type()) : null,
                        e.actionId(), e.timeoutMillis(), e.times(), e.condition(),
                        e.calledActionId(), e.propertyName(), e.eventName()))
                .toList()) : new ArrayList<>();
        rules = model.rules() != null ? new ArrayList<>(model.rules().stream()
                .map(e -> new PageRuleViewModel(
                        e.filter(),
                        e.action() != null ? PageRuleAction.valueOf(e.action()) : null,
                        e.fieldName(),
                        e.fieldAttribute() != null ? PageRuleFieldAttribute.valueOf(e.fieldAttribute()) : null,
                        e.value(), e.expression(), e.actionId(),
                        e.result() != null ? PageRuleResult.valueOf(e.result()) : null))
                .toList()) : new ArrayList<>();
        validations = model.validations() != null ? new ArrayList<>(model.validations().stream()
                .map(e -> new PageValidationViewModel(e.condition(), e.fieldId(), e.message()))
                .toList()) : new ArrayList<>();
        fieldConfigs = model.fieldConfigs() != null ? new ArrayList<>(model.fieldConfigs().stream()
                .map(e -> new PageFieldConfigViewModel(e.fieldId(),
                        e.stereotype() != null ? PageFieldStereotype.valueOf(e.stereotype()) : null,
                        e.colspan(), e.style(), e.cssClass(), e.label(), e.help()))
                .toList()) : new ArrayList<>();
        wizardSteps = model.wizardSteps() != null ? new ArrayList<>(model.wizardSteps().stream()
                .map(e -> new PageWizardStepViewModel(e.pageId(), e.label()))
                .toList()) : new ArrayList<>();
        completionActions = model.completionActions() != null ? new ArrayList<>(model.completionActions().stream()
                .map(e -> new PageButtonViewModel(e.label(), e.icon(), e.useCaseId(), e.actionId()))
                .toList()) : new ArrayList<>();
        return this;
    }

    @Override
    public String toString() {
        return id != null ? name : "New page";
    }
}
