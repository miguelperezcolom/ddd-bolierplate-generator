package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.process;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProcessDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProcessStepDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.process.create.CreateProcessCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.process.create.CreateProcessUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.process.save.SaveProcessCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.process.save.SaveProcessUseCase;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.AggregateIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.AggregateIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModuleIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.ModuleIdOptionsSupplier;
import io.mateu.uidl.annotations.GeneratedValue;
import io.mateu.uidl.annotations.Help;
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
public class ProcessViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String description;

    @Tab("Trigger")
    @Lookup(search = AggregateIdOptionsSupplier.class, label = AggregateIdLabelSupplier.class)
    String triggerAggregateId;
    String triggerEvent;

    @Tab("Steps")
    @Lookup(search = ModuleIdOptionsSupplier.class, label = ModuleIdLabelSupplier.class)
    @Help("Bounded context that owns/orchestrates the process.")
    String ownerModuleId;

    List<ProcessStepViewModel> steps = new ArrayList<>();

    @Tab("Completion")
    @Help("Event published when the last step completes. Defaults to <Name>Completed.")
    String onCompletionEventName;

    @Help("End-to-end SLA as an ISO-8601 duration, e.g. P3D.")
    String sla;

    final CreateProcessUseCase createUseCase;
    final SaveProcessUseCase saveUseCase;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateProcessCommand(id, name, description,
                triggerAggregateId, triggerEvent, ownerModuleId,
                toStepDtos(steps), onCompletionEventName, sla));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveProcessCommand(id, name, description,
                triggerAggregateId, triggerEvent, ownerModuleId,
                toStepDtos(steps), onCompletionEventName, sla));
    }

    @Override
    public String id() {
        return id;
    }

    public ProcessViewModel load(ProcessDto model) {
        id = model.id();
        name = model.name();
        description = model.description();
        triggerAggregateId = model.triggerAggregateId();
        triggerEvent = model.triggerEvent();
        ownerModuleId = model.ownerModuleId();
        steps = model.steps() == null ? new ArrayList<>() :
                model.steps().stream().map(s -> {
                    var vm = new ProcessStepViewModel();
                    vm.id = s.id();
                    vm.name = s.name();
                    vm.type = s.type();
                    vm.useCaseId = s.useCaseId();
                    vm.roleId = s.roleId();
                    vm.deadline = s.deadline();
                    vm.escalationRoleId = s.escalationRoleId();
                    vm.compensationUseCaseId = s.compensationUseCaseId();
                    vm.description = s.description();
                    return vm;
                }).collect(Collectors.toCollection(ArrayList::new));
        onCompletionEventName = model.onCompletionEventName();
        sla = model.sla();
        return this;
    }

    private static List<ProcessStepDto> toStepDtos(List<ProcessStepViewModel> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new ProcessStepDto(s.id, s.name, s.type, s.useCaseId, s.roleId,
                        s.deadline, s.escalationRoleId, s.compensationUseCaseId, s.description))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New process";
    }
}
