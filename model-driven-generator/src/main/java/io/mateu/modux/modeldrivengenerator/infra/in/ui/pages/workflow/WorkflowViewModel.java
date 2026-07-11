package io.mateu.modux.modeldrivengenerator.infra.in.ui.pages.workflow;

import io.mateu.core.infra.valuegenerators.UUIDValueGenerator;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.WorkflowDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.WorkflowStepDto;
import io.mateu.modux.modeldrivengenerator.application.usecases.workflow.create.CreateWorkflowCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.workflow.create.CreateWorkflowUseCase;
import io.mateu.modux.modeldrivengenerator.application.usecases.workflow.save.SaveWorkflowCommand;
import io.mateu.modux.modeldrivengenerator.application.usecases.workflow.save.SaveWorkflowUseCase;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.AggregateIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.AggregateIdOptionsSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdLabelSupplier;
import io.mateu.modux.modeldrivengenerator.infra.in.ui.suppliers.UseCaseIdOptionsSupplier;
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
public class WorkflowViewModel implements Identifiable, CrudEditorForm<String>, CrudCreationForm<String> {

    @GeneratedValue(UUIDValueGenerator.class)
    @Hidden
    String id;

    @NotEmpty
    String name;

    String description;

    @Tab("Trigger")
    @Lookup(search = AggregateIdOptionsSupplier.class, label = AggregateIdLabelSupplier.class)
    @Help("Aggregate emitting the domain event that starts the workflow.")
    String triggerAggregateId;

    @Help("Alternative trigger: domain service emitting the trigger event.")
    String triggerDomainServiceId;

    @Lookup(search = UseCaseIdOptionsSupplier.class, label = UseCaseIdLabelSupplier.class)
    @Help("Alternative trigger: use case publishing the trigger APPLICATION event.")
    String triggerUseCaseId;

    String triggerEvent;

    @Tab("Steps")
    List<WorkflowStepViewModel> steps = new ArrayList<>();

    @Tab("Completion")
    @Help("Event published when every step completes. Defaults to <Name>Completed.")
    String onCompletionEventName;

    @Tab("Ramas")
    @Help("Las ramas de los splits EXCLUSIVOS de este workflow, con la condición que elige cada una. Las ramas se trazan en el diagrama; aquí se editan sus expresiones (vacía = sin condición).")
    List<WorkflowBranchConditionViewModel> branchConditions = new ArrayList<>();

    final CreateWorkflowUseCase createUseCase;
    final SaveWorkflowUseCase saveUseCase;
    final io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore modelStore;
    final io.mateu.modux.modeldrivengenerator.infra.out.persistence.WorkflowGatewayGraph workflowGraph;

    @Override
    public String create(HttpRequest httpRequest) {
        createUseCase.handle(new CreateWorkflowCommand(id, name, description,
                triggerAggregateId, triggerDomainServiceId, triggerUseCaseId, triggerEvent,
                toStepDtos(steps), onCompletionEventName));
        return id;
    }

    @Override
    public void save(HttpRequest httpRequest) {
        saveUseCase.handle(new SaveWorkflowCommand(id, name, description,
                triggerAggregateId, triggerDomainServiceId, triggerUseCaseId, triggerEvent,
                toStepDtos(steps), onCompletionEventName));
        saveBranchConditions();
    }

    /** Persists the edited expressions onto their gateways (full replace per gateway). */
    private void saveBranchConditions() {
        var byGateway = (branchConditions == null
                ? List.<WorkflowBranchConditionViewModel>of() : branchConditions).stream()
                .filter(c -> c.gatewayId != null)
                .collect(Collectors.groupingBy(c -> c.gatewayId));
        for (var entry : byGateway.entrySet()) {
            var gateway = modelStore.findById(entry.getKey(),
                    io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowGatewayEntity.class)
                    .orElse(null);
            if (gateway == null) continue;
            var conditions = entry.getValue().stream()
                    .filter(c -> c.expression != null && !c.expression.isBlank())
                    .filter(c -> gateway.targetIds().contains(c.targetId))
                    .map(c -> new io.mateu.modux.modeldrivengenerator.infra.out.persistence.file
                            .GatewayBranchConditionEntity(c.targetId, c.expression.trim()))
                    .toList();
            modelStore.save(gateway.toBuilder().branchConditions(conditions).build());
        }
    }

    @Override
    public String id() {
        return id;
    }

    public WorkflowViewModel load(WorkflowDto model) {
        id = model.id();
        name = model.name();
        description = model.description();
        triggerAggregateId = model.triggerAggregateId();
        triggerDomainServiceId = model.triggerDomainServiceId();
        triggerUseCaseId = model.triggerUseCaseId();
        triggerEvent = model.triggerEvent();
        steps = model.steps() == null ? new ArrayList<>() :
                model.steps().stream().map(s -> {
                    var vm = new WorkflowStepViewModel();
                    vm.id = s.id();
                    vm.name = s.name();
                    vm.emittedEventName = s.emittedEventName();
                    vm.targetUseCaseId = s.targetUseCaseId();
                    vm.completionEventName = s.completionEventName();
                    vm.dependsOnStepIds = s.dependsOnStepIds() == null
                            ? new ArrayList<>() : new ArrayList<>(s.dependsOnStepIds());
                    vm.description = s.description();
                    vm.roleId = s.roleId();
                    vm.deadline = s.deadline();
                    vm.escalationRoleId = s.escalationRoleId();
                    vm.compensationUseCaseId = s.compensationUseCaseId();
                    vm.type = s.type();
                    vm.handoffWorkflowId = s.handoffWorkflowId();
                    return vm;
                }).collect(Collectors.toCollection(ArrayList::new));
        onCompletionEventName = model.onCompletionEventName();
        // the EXCLUSIVE splits belonging (by inference) to this workflow, one row per branch
        branchConditions = modelStore.findAllOfType(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowGatewayEntity.class)
                .stream()
                .filter(g -> "SPLIT".equals(g.type()) && "EXCLUSIVE".equals(g.semantics()))
                .filter(g -> id.equals(workflowGraph.workflowOf(g.id()).orElse(null)))
                .flatMap(g -> g.targetIds().stream()
                        .map(t -> new WorkflowBranchConditionViewModel(g.id(), g.name(), t,
                                g.branchConditions().stream()
                                        .filter(c -> t.equals(c.targetId()))
                                        .map(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file
                                                .GatewayBranchConditionEntity::expression)
                                        .findFirst().orElse(null))))
                .collect(Collectors.toCollection(ArrayList::new));
        return this;
    }

    private static List<WorkflowStepDto> toStepDtos(List<WorkflowStepViewModel> steps) {
        if (steps == null) return List.of();
        return steps.stream()
                .map(s -> new WorkflowStepDto(s.id, s.name, s.emittedEventName, s.targetUseCaseId,
                        s.completionEventName, s.dependsOnStepIds, s.description,
                        s.type, s.handoffWorkflowId, s.roleId, s.deadline, s.escalationRoleId,
                        s.compensationUseCaseId))
                .toList();
    }

    @Override
    public String toString() {
        return id != null ? name : "New workflow";
    }
}
