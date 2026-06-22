package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.businessrule;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.BusinessRuleActionDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.BusinessRuleConditionDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.BusinessRuleDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.BusinessRuleActionData;
import io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.BusinessRuleConditionData;
import io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.create.CreateBusinessRuleCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.create.CreateBusinessRuleUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.save.SaveBusinessRuleCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.businessrule.save.SaveBusinessRuleUseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.businessrule.vo.BusinessRuleActionType;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModelIdOptionsSupplier;
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
import java.util.stream.Collectors;

@Service
@Scope("prototype")
@RequiredArgsConstructor
public class BusinessRuleViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String description;

    @Lookup(search = ModelIdOptionsSupplier.class, label = ModelIdLabelSupplier.class)
    String modelId;

    Integer priority;

    boolean enabled;

    String ruleGroup;

    @Tab("Conditions")
    List<BusinessRuleConditionViewModel> conditions = new ArrayList<>();

    @Tab("Actions")
    List<BusinessRuleActionViewModel> actions = new ArrayList<>();

    final CreateBusinessRuleUseCase createUseCase;
    final SaveBusinessRuleUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateBusinessRuleCommand(id, name, description, modelId, priority, enabled,
                ruleGroup, toConditionData(conditions), toActionData(actions)));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveBusinessRuleCommand(id, name, description, modelId, priority, enabled,
                ruleGroup, toConditionData(conditions), toActionData(actions)));
    }

    @Override
    public String id() {
        return id;
    }

    public BusinessRuleViewModel load(BusinessRuleDto model) {
        id = model.id();
        name = model.name();
        description = model.description();
        modelId = model.modelId();
        priority = model.priority();
        enabled = model.enabled();
        ruleGroup = model.ruleGroup();
        conditions = model.conditions() == null ? new ArrayList<>() : model.conditions().stream()
                .map(this::toConditionViewModel)
                .collect(Collectors.toCollection(ArrayList::new));
        actions = model.actions() == null ? new ArrayList<>() : model.actions().stream()
                .map(this::toActionViewModel)
                .collect(Collectors.toCollection(ArrayList::new));
        return this;
    }

    private BusinessRuleConditionViewModel toConditionViewModel(BusinessRuleConditionDto c) {
        var vm = new BusinessRuleConditionViewModel();
        vm.id = c.id();
        vm.expression = c.expression();
        vm.description = c.description();
        return vm;
    }

    private BusinessRuleActionViewModel toActionViewModel(BusinessRuleActionDto a) {
        var vm = new BusinessRuleActionViewModel();
        vm.id = a.id();
        vm.type = a.type() != null ? BusinessRuleActionType.valueOf(a.type()) : null;
        vm.fieldId = a.fieldId();
        vm.expression = a.expression();
        vm.useCaseId = a.useCaseId();
        vm.domainEventId = a.domainEventId();
        vm.description = a.description();
        return vm;
    }

    private List<BusinessRuleConditionData> toConditionData(List<BusinessRuleConditionViewModel> conditions) {
        if (conditions == null) return List.of();
        return conditions.stream()
                .map(c -> new BusinessRuleConditionData(c.id, c.expression, c.description))
                .toList();
    }

    private List<BusinessRuleActionData> toActionData(List<BusinessRuleActionViewModel> actions) {
        if (actions == null) return List.of();
        return actions.stream()
                .map(a -> new BusinessRuleActionData(a.id,
                        a.type != null ? a.type.name() : null,
                        a.fieldId, a.expression, a.useCaseId, a.domainEventId, a.description))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New business rule";
    }
}
