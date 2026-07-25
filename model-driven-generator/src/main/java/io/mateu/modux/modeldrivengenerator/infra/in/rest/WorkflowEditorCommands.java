package io.mateu.modux.modeldrivengenerator.infra.in.rest;

import io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence.FlowContextMapCoherenceService;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.boundedcontext.vo.SubdomainType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AclEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AiAgentEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ButtonGroupEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CustomCodeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GroupButtonEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.GatewayBranchConditionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowGatewayEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiOperationImplementationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProxyApiEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProxyOperationRouteEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApplicationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ContextMapRelationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramEdgeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramNodeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramPointEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EntityEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalApiOperationUseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemTableEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemUseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.McpGatewayEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.McpServerEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RagContentSourceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RagEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RoleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingRuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.TransformationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.TransformationRefEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.OperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ScheduledTriggerEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageButtonEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EtlFlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DocumentEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IdentityProviderEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.NotificationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EtlStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageWizardStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageFieldConfigEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelFieldEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiComponentNodeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiMenuItemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ViewEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowStepEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Component;
import io.mateu.modux.modeldrivengenerator.infra.in.rest.EditorApiController.*;

/**
 * Workflow commands: workflows, steps (human tasks, forms, hand-offs), loose
 * gateways with their grammar, dependencies, and the process/saga fusion.
 */
@Component
@RequiredArgsConstructor
public class WorkflowEditorCommands {

    private final ModelStore repository;
    private final io.mateu.modux.modeldrivengenerator.infra.out.persistence.WorkflowGatewayGraph workflowGraph;
    private final io.mateu.modux.modeldrivengenerator.infra.out.persistence.WorkflowLoopValidator loopValidator;
    private final EditorProjectSupport projects;

    public void addWorkflow(EditorCommand command) {
        if (repository.findById(command.id(), WorkflowEntity.class).isPresent()) return;
        var steps = command.workflowSteps() == null ? List.<WorkflowStepEntity>of()
                : command.workflowSteps().stream()
                        .map(s -> new WorkflowStepEntity(
                                s.id(), s.name(), s.emittedEventName(), s.targetUseCaseId(),
                                s.completionEventName(), s.dependsOnStepIds(), null))
                        .toList();
        repository.save(new WorkflowEntity(
                command.id(), command.name(), null,
                command.triggerAggregateId(), command.triggerDomainServiceId(),
                command.triggerUseCaseId(), command.triggerEvent(),
                steps, command.completionEventName(), List.of(), null));
    }

    public void removeWorkflow(EditorCommand command) {
        repository.deleteAllById(List.of(command.id()), WorkflowEntity.class);
    }

    /** Points the workflow at the event that starts it (drawn event → workflow). */
    public void setWorkflowTrigger(EditorCommand command) {
        var wf = projects.requireWorkflow(command.id());
        repository.save(wf.toBuilder()
                .triggerAggregateId(command.triggerAggregateId())
                .triggerDomainServiceId(command.triggerDomainServiceId())
                .triggerUseCaseId(command.triggerUseCaseId())
                .triggerEvent(command.triggerEvent())
                .build());
    }

    /**
     * The FUSION: every business process becomes a workflow — same id (references
     * survive), steps as a linear dependency chain, human steps carrying role,
     * deadline, escalation and compensation. The process disappears.
     */
    public void migrateProcessesToWorkflows() {
        for (var process : repository.findAllOfType(ProcessEntity.class)) {
            if (repository.findById(process.id(), WorkflowEntity.class).isPresent()) continue;
            var steps = new ArrayList<WorkflowStepEntity>();
            String previous = null;
            for (var st : process.steps()) {
                steps.add(WorkflowStepEntity.builder()
                        .id(st.id())
                        .name(st.name())
                        .targetUseCaseId(st.useCaseId())
                        .dependsOnStepIds(previous == null ? List.of() : List.of(previous))
                        .description(st.description())
                        .roleId(st.roleId())
                        .deadline(st.deadline())
                        .escalationRoleId(st.escalationRoleId())
                        .compensationUseCaseId(st.compensationUseCaseId())
                        .build());
                previous = st.id();
            }
            repository.save(new WorkflowEntity(process.id(), process.name(), process.description(),
                    process.triggerAggregateId(), null, null, process.triggerEvent(),
                    steps, process.onCompletionEventName(), process.decisionIds(), null));
            repository.deleteAllById(List.of(process.id()), ProcessEntity.class);
        }
    }

    /**
     * The other half of the fusion: every saga becomes a workflow — same id, its
     * sequence as a linear chain, and each step's compensation resolved to the
     * USE CASE of its compensating step. Pure compensation steps leave the chain.
     */
    public void migrateSagasToWorkflows() {
        for (var saga : repository.findAllOfType(SagaEntity.class)) {
            if (repository.findById(saga.id(), WorkflowEntity.class).isPresent()) continue;
            var steps = saga.steps() == null ? List.<SagaStepEntity>of() : saga.steps();
            var byId = new java.util.HashMap<String, SagaStepEntity>();
            steps.forEach(st -> byId.put(st.id(), st));
            var compensators = steps.stream()
                    .map(SagaStepEntity::compensatingStepId)
                    .filter(java.util.Objects::nonNull)
                    .collect(java.util.stream.Collectors.toSet());
            var chain = new ArrayList<WorkflowStepEntity>();
            String previous = null;
            for (var st : steps) {
                if (compensators.contains(st.id())) continue; // pure compensation: lives on the step it undoes
                var compensating = st.compensatingStepId() == null ? null : byId.get(st.compensatingStepId());
                var detail = new java.util.ArrayList<String>();
                if (st.aggregateId() != null) {
                    detail.add("opera sobre " + st.aggregateId()
                            + (st.operationId() != null ? "." + st.operationId() : ""));
                }
                if (st.gatewayId() != null) detail.add("llama al gateway " + st.gatewayId());
                if (compensating != null && compensating.useCaseId() == null) {
                    detail.add("compensaba con el paso " + compensating.name());
                }
                chain.add(WorkflowStepEntity.builder()
                        .id(st.id())
                        .name(st.name())
                        .targetUseCaseId(st.useCaseId())
                        .dependsOnStepIds(previous == null ? List.of() : List.of(previous))
                        .compensationUseCaseId(compensating == null ? null : compensating.useCaseId())
                        .description(detail.isEmpty() ? null : String.join(" · ", detail))
                        .build());
                previous = st.id();
            }
            var triggers = saga.triggeringEventIds() == null
                    ? List.<String>of() : saga.triggeringEventIds();
            var notes = new java.util.ArrayList<String>();
            if (triggers.size() > 1) {
                notes.add("también la disparaban: " + String.join(", ", triggers.subList(1, triggers.size())));
            }
            if (saga.timeoutMs() != null) notes.add("timeout de la saga: " + saga.timeoutMs() + " ms");
            if (saga.maxRetries() != null) notes.add("reintentos: " + saga.maxRetries());
            if (saga.deadLetterQueue() != null) notes.add("DLQ: " + saga.deadLetterQueue());
            repository.save(new WorkflowEntity(saga.id(), saga.name(),
                    notes.isEmpty() ? null : String.join(" · ", notes),
                    null, null, null,
                    triggers.isEmpty() ? null : triggers.get(0),
                    chain, null, List.of(), null));
            // the owning contexts let go: workflows live outside every context
            repository.findAllOfType(BoundedContextEntity.class).stream()
                    .filter(mo -> mo.sagaIds() != null && mo.sagaIds().contains(saga.id()))
                    .forEach(mo -> repository.save(mo.toBuilder()
                            .sagaIds(AgentEditorCommands.without(mo.sagaIds(), saga.id())).build()));
            repository.deleteAllById(List.of(saga.id()), SagaEntity.class);
        }
    }

    public void addWorkflowGateway(EditorCommand command) {
        if (repository.findById(command.id(), WorkflowGatewayEntity.class).isPresent()) return;
        var type = "SPLIT".equals(command.stepType()) ? "SPLIT" : "JOIN";
        repository.save(new WorkflowGatewayEntity(command.id(), command.name(), type,
                List.of(), List.of()));
    }

    /** ALL/ANY for a join, PARALLEL/EXCLUSIVE for a split (null back to default). */
    public void setGatewaySemantics(EditorCommand command) {
        var g = repository.findById(command.id(), WorkflowGatewayEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown gateway: " + command.id()));
        var semantics = command.type() == null || command.type().isBlank() ? null : command.type();
        if (semantics != null) {
            var valid = "JOIN".equals(g.type())
                    ? java.util.Set.of("ALL", "ANY")
                    : java.util.Set.of("PARALLEL", "EXCLUSIVE");
            if (!valid.contains(semantics)) {
                throw new IllegalArgumentException("Semántica inválida para un " + g.type() + ": " + semantics);
            }
        }
        repository.save(g.toBuilder().semantics(semantics).build());
    }

    /** The condition guarding ONE branch of an EXCLUSIVE split (blank clears it). */
    public void setGatewayBranchCondition(EditorCommand command) {
        var g = repository.findById(command.id(), WorkflowGatewayEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown gateway: " + command.id()));
        if (!"SPLIT".equals(g.type()) || !"EXCLUSIVE".equals(g.semantics())) {
            throw new IllegalArgumentException("Las condiciones por rama son del split EXCLUSIVO");
        }
        if (!g.targetIds().contains(command.targetId())) {
            throw new IllegalArgumentException("Esa rama no sale de este split: " + command.targetId());
        }
        var kept = g.branchConditions().stream()
                .filter(c -> !c.targetId().equals(command.targetId()))
                .collect(java.util.stream.Collectors.toCollection(ArrayList::new));
        if (command.text() != null && !command.text().isBlank()) {
            kept.add(new GatewayBranchConditionEntity(command.targetId(), command.text().trim()));
        }
        repository.save(g.toBuilder().branchConditions(kept).build());
    }

    public void removeWorkflowGateway(EditorCommand command) {
        // other gateways let go of it on both sides
        repository.findAllOfType(WorkflowGatewayEntity.class).stream()
                .filter(g -> g.sourceIds().contains(command.id()) || g.targetIds().contains(command.id()))
                .forEach(g -> repository.save(g.toBuilder()
                        .sourceIds(AgentEditorCommands.without(g.sourceIds(), command.id()))
                        .targetIds(AgentEditorCommands.without(g.targetIds(), command.id()))
                        .build()));
        repository.deleteAllById(List.of(command.id()), WorkflowGatewayEntity.class);
    }

    /** Whether a step or workflow already flows somewhere (their single outgoing). */
    private boolean hasOutgoing(String nodeId) {
        for (var g : repository.findAllOfType(WorkflowGatewayEntity.class)) {
            if (g.sourceIds().contains(nodeId)) return true;
        }
        for (var wf : repository.findAllOfType(WorkflowEntity.class)) {
            for (var st : wf.steps()) {
                if (st.id().equals(nodeId) && st.handoffWorkflowId() != null) return true;
                if (st.dependsOnStepIds().contains(nodeId)) return true;
            }
        }
        return false;
    }

    /**
     * A flow link between workflow nodes: gateways store their own ends; a step
     * whose target is a WORKFLOW records the hand-off. Enforces the grammar:
     * JOIN n→1, SPLIT 1→n, steps/workflows flow to ONE node, and a gateway never
     * mixes workflows (reaching ANOTHER workflow as target is the exception).
     */
    public void addWorkflowLink(EditorCommand command) {
        var sourceGw = repository.findById(command.sourceId(), WorkflowGatewayEntity.class).orElse(null);
        var targetGw = repository.findById(command.targetId(), WorkflowGatewayEntity.class).orElse(null);
        var targetIsWorkflow = repository.findById(command.targetId(), WorkflowEntity.class).isPresent();
        var srcWf = workflowGraph.workflowOf(command.sourceId()).orElse(null);
        var tgtWf = targetIsWorkflow ? null : workflowGraph.workflowOf(command.targetId()).orElse(null);
        if (srcWf != null && tgtWf != null && !srcWf.equals(tgtWf)) {
            throw new IllegalArgumentException(
                    "Los dos extremos ya pertenecen a workflows distintos: a otro workflow solo se llega apuntando al workflow");
        }
        // a hand-off to another workflow leaves this one (a sink); every other link adds the edge
        // source → target, so reject it now if that edge would close a loop with no conditioned exit
        if (!targetIsWorkflow) {
            loopValidator.assertLinkBounded(srcWf != null ? srcWf : tgtWf,
                    command.sourceId(), command.targetId());
        }
        if (targetGw != null) {
            if ("SPLIT".equals(targetGw.type()) && !targetGw.sourceIds().isEmpty()
                    && !targetGw.sourceIds().contains(command.sourceId())) {
                throw new IllegalArgumentException("Un split solo tiene UNA entrada");
            }
            if (sourceGw == null && hasOutgoing(command.sourceId())) {
                throw new IllegalArgumentException("Ese nodo ya fluye hacia otro sitio: un paso o workflow solo sale a UN nodo");
            }
            if (sourceGw != null) {
                if ("JOIN".equals(sourceGw.type()) && !sourceGw.targetIds().isEmpty()
                        && !sourceGw.targetIds().contains(command.targetId())) {
                    throw new IllegalArgumentException("Un join solo tiene UNA salida");
                }
                if (!sourceGw.targetIds().contains(command.targetId())) {
                    var ids = new ArrayList<>(sourceGw.targetIds());
                    ids.add(command.targetId());
                    repository.save(sourceGw.toBuilder().targetIds(ids).build());
                }
            }
            if (!targetGw.sourceIds().contains(command.sourceId())) {
                var ids = new ArrayList<>(targetGw.sourceIds());
                ids.add(command.sourceId());
                repository.save(targetGw.toBuilder().sourceIds(ids).build());
            }
            return;
        }
        if (sourceGw != null) {
            if ("JOIN".equals(sourceGw.type()) && !sourceGw.targetIds().isEmpty()
                    && !sourceGw.targetIds().contains(command.targetId())) {
                throw new IllegalArgumentException("Un join solo tiene UNA salida");
            }
            if (!sourceGw.targetIds().contains(command.targetId())) {
                var ids = new ArrayList<>(sourceGw.targetIds());
                ids.add(command.targetId());
                repository.save(sourceGw.toBuilder().targetIds(ids).build());
            }
            return;
        }
        // step → workflow: the hand-off, recorded on the step
        if (targetIsWorkflow) {
            for (var wf : repository.findAllOfType(WorkflowEntity.class)) {
                var hit = wf.steps().stream().filter(st -> st.id().equals(command.sourceId())).findFirst();
                if (hit.isEmpty()) continue;
                if (hasOutgoing(command.sourceId())) {
                    throw new IllegalArgumentException("Ese paso ya fluye hacia otro sitio: un paso solo sale a UN nodo");
                }
                repository.save(EditorApiController.withWorkflowSteps(wf, wf.steps().stream()
                        .map(st -> st.id().equals(command.sourceId())
                                ? st.toBuilder().handoffWorkflowId(command.targetId()).build()
                                : st)
                        .toList()));
                return;
            }
            throw new IllegalArgumentException("Unknown step: " + command.sourceId());
        }
        throw new IllegalArgumentException("Ese enlace no involucra a un gateway ni a un workflow");
    }

    public void removeWorkflowLink(EditorCommand command) {
        repository.findById(command.targetId(), WorkflowGatewayEntity.class)
                .filter(g -> g.sourceIds().contains(command.sourceId()))
                .ifPresent(g -> repository.save(g.toBuilder()
                        .sourceIds(AgentEditorCommands.without(g.sourceIds(), command.sourceId())).build()));
        repository.findById(command.sourceId(), WorkflowGatewayEntity.class)
                .filter(g -> g.targetIds().contains(command.targetId()))
                .ifPresent(g -> repository.save(g.toBuilder()
                        .targetIds(AgentEditorCommands.without(g.targetIds(), command.targetId())).build()));
        for (var wf : repository.findAllOfType(WorkflowEntity.class)) {
            if (wf.steps().stream().noneMatch(st -> st.id().equals(command.sourceId())
                    && command.targetId().equals(st.handoffWorkflowId()))) continue;
            repository.save(EditorApiController.withWorkflowSteps(wf, wf.steps().stream()
                    .map(st -> st.id().equals(command.sourceId())
                            ? st.toBuilder().handoffWorkflowId(null).build()
                            : st)
                    .toList()));
        }
    }

    /** The step moves to ANOTHER workflow; dependencies on steps left behind drop. */
    public void moveWorkflowStep(EditorCommand command) {
        var from = projects.requireWorkflow(command.workflowId());
        var to = projects.requireWorkflow(command.targetId());
        if (from.id().equals(to.id())) return;
        var moving = from.steps().stream()
                .filter(s -> s.id().equals(command.id()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown step: " + command.id()));
        repository.save(EditorApiController.withWorkflowSteps(from, from.steps().stream()
                .filter(s -> !s.id().equals(command.id()))
                .map(s -> s.toBuilder()
                        .dependsOnStepIds(s.dependsOnStepIds().stream()
                                .filter(d -> !d.equals(command.id())).toList())
                        .build())
                .toList()));
        var targetIds = new java.util.HashSet<String>();
        to.steps().forEach(s -> targetIds.add(s.id()));
        var landed = moving.toBuilder()
                .dependsOnStepIds(moving.dependsOnStepIds().stream()
                        .filter(targetIds::contains).toList())
                .build();
        var steps = new ArrayList<>(to.steps());
        steps.add(landed);
        repository.save(EditorApiController.withWorkflowSteps(to, steps));
    }

    public void addWorkflowStep(EditorCommand command) {
        var workflow = projects.requireWorkflow(command.workflowId());
        if (workflow.steps().stream().anyMatch(s -> s.id().equals(command.id()))) return;
        var step = WorkflowStepEntity.builder()
                .id(command.id())
                .name(command.name())
                .emittedEventName(command.emittedEventName())
                .targetUseCaseId(command.targetUseCaseId())
                .completionEventName(command.completionEventName())
                .dependsOnStepIds(command.dependsOnStepIds() == null ? List.of() : command.dependsOnStepIds())
                .type(command.stepType() == null || command.stepType().isBlank() ? null : command.stepType())
                .roleId(command.roleId())
                .deadline(command.deadline())
                .compensationUseCaseId(command.compensationUseCaseId())
                .build();
        var steps = new ArrayList<>(workflow.steps());
        var index = command.afterStepId() == null ? steps.size()
                : indexAfterWorkflowStep(steps, command.afterStepId());
        steps.add(index, step);
        repository.save(EditorApiController.withWorkflowSteps(workflow, steps));
    }

    /** Removing a step also drops it from every other step's dependencies. */
    public void removeWorkflowStep(EditorCommand command) {
        var workflow = projects.requireWorkflow(command.workflowId());
        var steps = workflow.steps().stream()
                .filter(s -> !s.id().equals(command.id()))
                .map(s -> s.dependsOnStepIds().contains(command.id())
                        ? EditorApiController.withDependsOn(s, s.dependsOnStepIds().stream()
                                .filter(id -> !id.equals(command.id())).toList())
                        : s)
                .toList();
        repository.save(EditorApiController.withWorkflowSteps(workflow, steps));
    }

    /** Replaces emittedEventName, targetUseCaseId and completionEventName wholesale (null clears). */
    public void updateWorkflowStep(EditorCommand command) {
        var workflow = projects.requireWorkflow(command.workflowId());
        repository.save(EditorApiController.withWorkflowSteps(workflow, workflow.steps().stream()
                .map(s -> s.id().equals(command.id())
                        ? s.toBuilder()
                                .emittedEventName(command.emittedEventName())
                                .targetUseCaseId(command.targetUseCaseId())
                                .completionEventName(command.completionEventName())
                                .build()
                        : s)
                .toList()));
    }

    /** HUMAN step ⇆ its role: who works the task (null clears — back to a system step). */
    public void setWorkflowStepRole(EditorCommand command) {
        var workflow = projects.requireWorkflow(command.workflowId());
        if (workflow.steps().stream().noneMatch(st -> st.id().equals(command.id()))) {
            throw new IllegalArgumentException("Paso desconocido: " + command.id());
        }
        if (command.targetId() != null
                && repository.findById(command.targetId(), RoleEntity.class).isEmpty()) {
            throw new IllegalArgumentException("Rol desconocido: " + command.targetId());
        }
        repository.save(EditorApiController.withWorkflowSteps(workflow, workflow.steps().stream()
                .map(st -> st.id().equals(command.id())
                        ? st.toBuilder().roleId(command.targetId()).build()
                        : st)
                .toList()));
    }

    /** HUMAN step ⇆ its form: the PAGE the forms engine renders as the task (null clears). */
    public void setWorkflowStepForm(EditorCommand command) {
        var workflow = projects.requireWorkflow(command.workflowId());
        if (workflow.steps().stream().noneMatch(st -> st.id().equals(command.id()))) {
            throw new IllegalArgumentException("Paso desconocido: " + command.id());
        }
        if (command.targetId() != null
                && repository.findById(command.targetId(), PageEntity.class).isEmpty()) {
            throw new IllegalArgumentException("Página desconocida: " + command.targetId());
        }
        repository.save(EditorApiController.withWorkflowSteps(workflow, workflow.steps().stream()
                .map(st -> st.id().equals(command.id())
                        ? st.toBuilder().formPageId(command.targetId()).build()
                        : st)
                .toList()));
    }

    public void addWorkflowDependency(EditorCommand command) {
        var workflow = projects.requireWorkflow(command.workflowId());
        if (command.id().equals(command.dependsOnStepId())) {
            throw new IllegalArgumentException("Un paso no puede depender de sí mismo");
        }
        if (workflow.steps().stream().noneMatch(s -> s.id().equals(command.dependsOnStepId()))) {
            throw new IllegalArgumentException("Paso desconocido: " + command.dependsOnStepId());
        }
        var steps = workflow.steps().stream()
                .map(s -> s.id().equals(command.id())
                        && !s.dependsOnStepIds().contains(command.dependsOnStepId())
                        ? EditorApiController.withDependsOn(s, EditorApiController.concat(s.dependsOnStepIds(), command.dependsOnStepId()))
                        : s)
                .toList();
        // a step-dependency cycle can never carry a condition, so it is always an infinite loop
        loopValidator.assertWorkflowBounded(workflow.id(), steps);
        repository.save(EditorApiController.withWorkflowSteps(workflow, steps));
    }

    public void removeWorkflowDependency(EditorCommand command) {
        var workflow = projects.requireWorkflow(command.workflowId());
        repository.save(EditorApiController.withWorkflowSteps(workflow, workflow.steps().stream()
                .map(s -> s.id().equals(command.id())
                        ? EditorApiController.withDependsOn(s, s.dependsOnStepIds().stream()
                                .filter(id -> !id.equals(command.dependsOnStepId())).toList())
                        : s)
                .toList()));
    }


    static int indexAfterWorkflowStep(List<WorkflowStepEntity> steps, String afterStepId) {
        for (int i = 0; i < steps.size(); i++) {
            if (steps.get(i).id().equals(afterStepId)) return i + 1;
        }
        return steps.size();
    }
}
