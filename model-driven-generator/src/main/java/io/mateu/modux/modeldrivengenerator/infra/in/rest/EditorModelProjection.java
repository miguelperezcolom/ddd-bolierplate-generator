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
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.InvariantEntity;
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
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.OperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
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
 * The GET /model projection: everything the graphical editor paints, read
 * from the store in one pass.
 */
@Component
@RequiredArgsConstructor
public class EditorModelProjection {

    private final ModelStore repository;
    private final EditorProjectSupport projects;
    private final FlowContextMapCoherenceService coherenceService;
    private final UiEditorCommands uiCommands;

    public EditorModelDto build() {
        var services = scoped(ServiceEntity.class);
        var useCasesById = scoped(UseCaseEntity.class).stream()
                .collect(Collectors.toMap(UseCaseEntity::id, uc -> uc, (a, b) -> a));
        var domainEventsById = scoped(DomainEventEntity.class).stream()
                .collect(Collectors.toMap(DomainEventEntity::id, ev -> ev, (a, b) -> a));
        var readModelsById = scoped(ReadModelEntity.class).stream()
                .collect(Collectors.toMap(ReadModelEntity::id, rm -> rm, (a, b) -> a));
        var domainServicesById = scoped(DomainServiceEntity.class).stream()
                .collect(Collectors.toMap(DomainServiceEntity::id, ds -> ds, (a, b) -> a));
        var applicationEventsById = scoped(ApplicationEventEntity.class).stream()
                .collect(Collectors.toMap(ApplicationEventEntity::id, ev -> ev, (a, b) -> a));
        var queryServicesByBoundedContext = scoped(QueryServiceEntity.class).stream()
                .filter(qs -> qs.boundedContextId() != null)
                .collect(Collectors.groupingBy(QueryServiceEntity::boundedContextId));
        var scheduledTriggersById = scoped(ScheduledTriggerEntity.class).stream()
                .collect(Collectors.toMap(ScheduledTriggerEntity::id, t -> t, (a, b) -> a));
        // Machine-made stubs (actor/page derivations) get marked so the editor can tell
        // them apart from hand-declared elements — and hide them on demand.
        var derivedIds = DerivedElementIds.from(
                scoped(AggregateEntity.class).stream().map(AggregateEntity::id).toList(),
                scoped(PageEntity.class).stream().map(PageEntity::id).toList());
        // The editor works on the current project: its services' boundedContexts, plus any
        // boundedContext not wired to a service yet (legacy orphans stay visible).
        var currentProject = projects.currentProject().orElse(null);
        var projectServiceIds = currentProject == null || currentProject.serviceIds() == null
                ? java.util.Set.<String>of() : java.util.Set.copyOf(currentProject.serviceIds());
        var allModules = scoped(ModuleEntity.class);
        var wiredElsewhere = services.stream()
                .filter(s2 -> !projectServiceIds.contains(s2.id()))
                .flatMap(s2 -> s2.moduleIds() == null ? java.util.stream.Stream.<String>empty()
                        : s2.moduleIds().stream())
                .map(mid -> allModules.stream().filter(mm -> mm.id().equals(mid)).findFirst().orElse(null))
                .filter(Objects::nonNull)
                .map(ModuleEntity::boundedContextId)
                .collect(java.util.stream.Collectors.toSet());
        var boundedContexts = scoped(BoundedContextEntity.class).stream()
                .filter(m -> !wiredElsewhere.contains(m.id()))
                .map(m -> new BoundedContextDto(
                        m.id(),
                        m.name(),
                        m.subdomainType() == null ? null : m.subdomainType().name(),
                        java.util.Optional.ofNullable(
                                io.mateu.modux.modeldrivengenerator.application.usecases.model.topology.ModuleTopology
                                        .serviceOfBoundedContext(services, allModules, m.id()))
                                .map(ServiceEntity::id)
                                .orElse(null),
                        (m.useCaseIds() == null ? List.<String>of() : m.useCaseIds()).stream()
                                .map(useCasesById::get)
                                .filter(Objects::nonNull)
                                .map(uc -> new UseCaseDto(uc.id(), uc.name(), uc.policy(),
                                        derivedIds.isDerivedUseCase(uc.id()),
                                        (uc.steps() == null ? List.<UseCaseStepEntity>of() : uc.steps()).stream()
                                                .map(UseCaseStepEntity::id).toList(),
                                        uc.inputModelId(),
                                        (uc.steps() == null ? List.<UseCaseStepEntity>of() : uc.steps()).stream()
                                                .map(st -> new UseCaseStepDto(st.id(), st.name(),
                                                        st.type() == null ? null : st.type().name(),
                                                        st.customCodeId()))
                                                .toList()))
                                .toList(),
                        (m.domainEventIds() == null ? List.<String>of() : m.domainEventIds()).stream()
                                .map(domainEventsById::get)
                                .filter(Objects::nonNull)
                                .map(ev -> new DomainEventDto(ev.id(), ev.name(),
                                        derivedIds.isDerivedDomainEvent(ev.id())))
                                .toList(),
                        (m.readModelIds() == null ? List.<String>of() : m.readModelIds()).stream()
                                .map(readModelsById::get)
                                .filter(Objects::nonNull)
                                .map(rm -> new ReadModelDto(rm.id(), rm.name(), rm.aggregateId()))
                                .toList(),
                        m.domainServiceIds().stream()
                                .map(domainServicesById::get)
                                .filter(Objects::nonNull)
                                .map(ds -> new DomainServiceDto(ds.id(), ds.name()))
                                .toList(),
                        m.applicationEventIds().stream()
                                .map(applicationEventsById::get)
                                .filter(Objects::nonNull)
                                .map(ev -> new ApplicationEventDto(ev.id(), ev.name()))
                                .toList(),
                        queryServicesByBoundedContext.getOrDefault(m.id(), List.of()).stream()
                                .map(qs -> new QueryServiceDto(qs.id(), qs.name(),
                                        derivedIds.isDerivedQueryService(qs.id()),
                                        (qs.operations() == null ? List.<QueryOperationEntity>of() : qs.operations()).stream()
                                                .map(op -> new QueryOperationDto(op.id(), op.name()))
                                                .toList()))
                                .toList(),
                        (m.scheduledTriggerIds() == null ? List.<String>of() : m.scheduledTriggerIds()).stream()
                                .map(scheduledTriggersById::get)
                                .filter(Objects::nonNull)
                                .map(t -> new ScheduledTriggerDto(t.id(), t.name(), t.cronExpression(), t.useCaseId()))
                                .toList(),
                        m.identityProviderId(),
                        m.uiAdapterIds()))
                .toList();

        var projects = scoped(ProjectEntity.class);
        var externalSystems = java.util.stream.Stream.ofNullable(currentProject)
                .flatMap(p -> p.externalSystems().stream())
                .map(x -> new ExternalSystemDto(x.id(), x.name(), x.useCases().stream()
                        .map(u -> new ExternalUseCaseDto(u.id(), u.name()))
                        .toList(),
                        x.tables().stream()
                                .map(t -> new ExternalTableDto(t.id(), t.name()))
                                .toList(),
                        x.mcpServers().stream()
                                .map(s -> new McpServerDto(s.id(), s.name(), s.uri()))
                                .toList(),
                        x.referencedRepositoryId(),
                        x.parentExternalSystemId()))
                .toList();
        var flowEntities = scoped(FlowEntity.class);
        var flows = coherenceService.analyze().stream()
                .filter(f -> f.sourceBoundedContextId() != null && f.targetBoundedContextId() != null)
                .map(f -> {
                    var entity = flowEntities.stream()
                            .filter(e -> e.id().equals(f.flowId()))
                            .findFirst();
                    return new FlowDto(
                            f.flowId(),
                            f.flowName(),
                            f.sourceBoundedContextId(),
                            f.targetBoundedContextId(),
                            f.archetype() == null ? null : f.archetype().name(),
                            entity.map(FlowEntity::triggerAggregateId).orElse(null),
                            entity.map(FlowEntity::triggerEvent).orElse(null),
                            entity.map(FlowEntity::targetUseCaseId).orElse(null),
                            entity.map(FlowEntity::readModelName).orElse(null));
                })
                .toList();

        // Fields of an aggregate / entity / Record VO ARE the fields of its Model: one concept
        // (ModelField). The type is derived from how the ModelField points (value object,
        // pure Model, enum or basic type); "required" from a NotNull-family validation.
        var modelsById = scoped(ModelEntity.class).stream()
                .collect(java.util.stream.Collectors.toMap(ModelEntity::id, m -> m, (a, b) -> a));
        java.util.function.Function<String, java.util.List<FieldDto>> fieldsOf = modelId -> {
            if (modelId == null) return java.util.List.of();
            var model = modelsById.get(modelId);
            if (model == null || model.fields() == null) return java.util.List.of();
            return model.fields().stream().map(f -> {
                String typeKind;
                String typeRef;
                if (f.valueObjectId() != null && !f.valueObjectId().isBlank()) {
                    typeKind = "value-object";
                    typeRef = f.valueObjectId();
                } else if (f.entityId() != null && !f.entityId().isBlank()) {
                    typeKind = "entity";
                    typeRef = f.entityId();
                } else if (f.modelId() != null && !f.modelId().isBlank()) {
                    typeKind = "model";
                    typeRef = f.modelId();
                } else if (f.isEnum() && f.enumId() != null && !f.enumId().isBlank()) {
                    typeKind = "enum";
                    typeRef = f.enumId();
                } else {
                    typeKind = "primitive";
                    typeRef = f.type() != null ? f.type().name() : "string";
                }
                var required = f.validations() != null && f.validations().stream().anyMatch(v ->
                        v.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType.NotNull
                        || v.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType.NotEmpty
                        || v.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.model.vo.ModelFieldValidationType.NotBlank);
                return new FieldDto(f.id(), f.name(), required, typeKind, typeRef,
                        f.collection() != null && f.collection(), modelId);
            }).toList();
        };

        var allAggregates = scoped(AggregateEntity.class);
        var aggregates = new ArrayList<AggregateDto>();
        for (var boundedContext : scoped(BoundedContextEntity.class)) {
            if (boundedContext.aggregateIds() == null) continue;
            for (var aggregateId : boundedContext.aggregateIds()) {
                allAggregates.stream()
                        .filter(a -> a.id().equals(aggregateId))
                        .findFirst()
                        .ifPresent(a -> aggregates.add(new AggregateDto(a.id(), a.name(), boundedContext.id(),
                                a.invariants().stream()
                                        .map(i -> invDto(i))
                                        .toList(),
                                fieldsOf.apply(a.modelId()), a.modelId(),
                                (a.operations() == null ? java.util.List.<OperationEntity>of() : a.operations())
                                        .stream()
                                        .map(op -> new AggregateOperationDto(op.id(), op.name(),
                                                op.inputModelId(), op.outputModelId()))
                                        .toList())));
            }
        }

        var entities = scoped(EntityEntity.class).stream()
                .filter(e -> e.parentAggregateId() != null && !e.parentAggregateId().isBlank())
                .map(e -> new EntityDto(e.id(), e.name(), e.parentAggregateId(),
                        e.invariants().stream()
                                .map(i -> invDto(i)).toList(),
                        fieldsOf.apply(e.modelId()), e.modelId()))
                .toList();

        // Value objects, projected under the aggregate that owns them (via valueObjectIds).
        // A VO carries its own shape — Record fields, Enum values or a Wrapper dataType —
        // unlike the flat state Model; this is what lets it host invariants later.
        var allValueObjects = scoped(
                io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ValueObjectEntity.class);
        var valueObjects = new ArrayList<ValueObjectDto>();
        var voSeen = new java.util.HashSet<String>();
        for (var agg : allAggregates) {
            if (agg.valueObjectIds() == null) continue;
            for (var voId : agg.valueObjectIds()) {
                if (voId == null || !voSeen.add(agg.id() + " " + voId)) continue;
                allValueObjects.stream().filter(v -> v.id().equals(voId)).findFirst().ifPresent(v -> {
                    var fieldDtos = (v.fieldsJson() == null || v.fieldsJson().isBlank())
                            ? java.util.List.<ValueObjectFieldDto>of()
                            : io.mateu.core.infra.JsonSerializer.listFromJson(v.fieldsJson(),
                                    io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.ValueObjectField.class)
                            .stream()
                            .map(f -> new ValueObjectFieldDto(f.name(),
                                    f.dataType() != null ? f.dataType().name() : null,
                                    f.stereotype() != null ? f.stereotype().name() : null))
                            .toList();
                    var enumValues = (v.valuesJson() == null || v.valuesJson().isBlank())
                            ? java.util.List.<String>of()
                            : io.mateu.core.infra.JsonSerializer.listFromJson(v.valuesJson(),
                                    io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.EnumValue.class)
                            .stream()
                            .map(io.mateu.modux.modeldrivengenerator.domain.aggregates.valueobject.EnumValue::value)
                            .toList();
                    valueObjects.add(new ValueObjectDto(v.id(), v.name(), agg.id(), v.type(),
                            v.dataType(), fieldDtos, enumValues,
                            v.invariants().stream()
                                    .map(i -> invDto(i)).toList()));
                });
            }
        }

        // A field of aggregate A's state model typed as another aggregate's state
        // model is projected as a cross-aggregate reference (heuristic; the model
        // remains the source of truth).
        var models = scoped(ModelEntity.class);
        var references = new ArrayList<AggregateReferenceDto>();
        for (var source : allAggregates) {
            var stateModel = models.stream()
                    .filter(m -> m.id().equals(source.modelId()))
                    .findFirst();
            if (stateModel.isEmpty() || stateModel.get().fields() == null) continue;
            for (var field : stateModel.get().fields()) {
                if (field.modelId() == null || field.modelId().isBlank()) continue;
                allAggregates.stream()
                        .filter(t -> !t.id().equals(source.id()))
                        .filter(t -> field.modelId().equals(t.modelId()))
                        .findFirst()
                        .ifPresent(t -> references.add(
                                new AggregateReferenceDto(source.id(), t.id(), field.name())));
            }
        }

        var processes = scoped(ProcessEntity.class).stream()
                .map(p -> new ProcessDto(
                        p.id(), p.name(), p.triggerAggregateId(), p.triggerEvent(),
                        p.ownerBoundedContextId(), p.onCompletionEventName(), p.sla(),
                        p.steps().stream()
                                .map(s -> new ProcessStepDto(
                                        s.id(), s.name(),
                                        s.type() == null ? null : s.type().name(),
                                        s.useCaseId(), s.roleId(), s.deadline(),
                                        s.compensationUseCaseId()))
                                .toList()))
                .toList();

        var views = scoped(ViewEntity.class).stream()
                .map(v -> new ViewDto(v.id(), v.name(), v.kind(), v.memberIds()))
                .toList();

        var workflows = scoped(WorkflowEntity.class).stream()
                .map(w -> new WorkflowDto(
                        w.id(), w.name(), w.triggerAggregateId(), w.triggerDomainServiceId(),
                        w.triggerUseCaseId(), w.triggerEvent(), w.onCompletionEventName(),
                        w.steps().stream()
                                .map(s -> new WorkflowStepDto(s.id(), s.name(), s.emittedEventName(),
                                        s.targetUseCaseId(), s.completionEventName(),
                                        s.dependsOnStepIds(), s.type(), s.handoffWorkflowId(),
                                        s.roleId(), s.deadline(), s.compensationUseCaseId(),
                                        s.formPageId()))
                                .toList()))
                .toList();


        // Who publishes what: DOMAIN events are emitted by aggregates (operations
        // declare emitted event NAMES as a CSV in OperationEntity.emits). Use cases
        // publishing through PublishDomainEvent steps is pipeline plumbing, not an
        // emission — application events are the use-case-level concept.
        var eventIdByName = domainEventsById.values().stream()
                .filter(ev -> ev.name() != null)
                .collect(Collectors.toMap(ev -> ev.name().trim().toLowerCase(),
                        DomainEventEntity::id, (a, b) -> a));
        var emissions = new ArrayList<EmissionDto>();
        for (var a : scoped(AggregateEntity.class)) {
            EditorApiController.collectEmissions(a.id(), a.operations(), eventIdByName, emissions);
        }
        for (var ds : scoped(DomainServiceEntity.class)) {
            EditorApiController.collectEmissions(ds.id(), ds.operations(), eventIdByName, emissions);
        }
        for (var uc : scoped(UseCaseEntity.class)) {
            if (uc.steps() == null) continue;
            for (var step : uc.steps()) {
                if (step.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.PublishApplicationEvent
                        && step.applicationEventId() != null) {
                    emissions.add(new EmissionDto(uc.id(), step.applicationEventId()));
                }
            }
        }

        var actors = scoped(RoleEntity.class).stream()
                .map(r -> new ActorDto(r.id(), r.name()))
                .toList();
        var aiAgents = scoped(AiAgentEntity.class).stream()
                .map(a -> new AiAgentDto(a.id(), a.name(), a.external()))
                .toList();
        var agentUses = new ArrayList<AgentUseDto>();
        var agentExternalUses = new ArrayList<AgentExternalUseDto>();
        var agentRags = new ArrayList<AgentRagDto>();
        var agentMcpUses = new ArrayList<AgentMcpUseDto>();
        var agentGatewayUses = new ArrayList<AgentGatewayUseDto>();
        var agentApiOpUses = new ArrayList<AgentApiOpUseDto>();
        var agentApiUses = new ArrayList<AgentApiUseDto>();
        var agentQueryUses = new ArrayList<AgentQueryUseDto>();
        var agentDelegations = new ArrayList<AgentDelegationDto>();
        var agentTriggers = new ArrayList<AgentTriggerDto>();
        for (var agent : scoped(AiAgentEntity.class)) {
            agent.allowedUseCaseIds().forEach(id -> agentUses.add(new AgentUseDto(agent.id(), id)));
            agent.allowedExternalUseCaseIds().forEach(
                    id -> agentExternalUses.add(new AgentExternalUseDto(agent.id(), id)));
            agent.ragIds().forEach(id -> agentRags.add(new AgentRagDto(agent.id(), id)));
            agent.allowedMcpServerIds().forEach(
                    id -> agentMcpUses.add(new AgentMcpUseDto(agent.id(), id)));
            agent.mcpGatewayIds().forEach(
                    id -> agentGatewayUses.add(new AgentGatewayUseDto(agent.id(), id)));
            agent.allowedApiOperationIds().forEach(
                    id -> agentApiOpUses.add(new AgentApiOpUseDto(agent.id(), id)));
            agent.allowedApiIds().forEach(
                    id -> agentApiUses.add(new AgentApiUseDto(agent.id(), id)));
            agent.allowedQueryServiceIds().forEach(
                    id -> agentQueryUses.add(new AgentQueryUseDto(agent.id(), id)));
            agent.delegateAgentIds().forEach(
                    id -> agentDelegations.add(new AgentDelegationDto(agent.id(), id)));
            agent.reactsToEventIds().forEach(
                    id -> agentTriggers.add(new AgentTriggerDto(id, agent.id())));
        }
        var mcpGateways = scoped(McpGatewayEntity.class).stream()
                .map(g -> new McpGatewayDto(g.id(), g.name(), g.mcpServerIds(), g.apiIds(),
                        g.apiOperationIds(), g.useCaseIds(), g.ragIds()))
                .toList();
        var actorAgentUses = new ArrayList<ActorAgentUseDto>();
        for (var role : scoped(RoleEntity.class)) {
            role.aiAgentIds().forEach(id -> actorAgentUses.add(new ActorAgentUseDto(role.id(), id)));
        }
        var rags = scoped(RagEntity.class).stream()
                .map(r -> new RagDto(r.id(), r.name(), r.description(), r.sourceReadModelIds(),
                        r.contentSources().stream()
                                .map(s -> new RagContentSourceDto(s.type(), s.uri()))
                                .toList(),
                        r.sourceExternalTableIds(), r.sourceApiIds(),
                        r.sourceExternalSystemIds(), r.sourceBoundedContextIds()))
                .toList();
        var apis = scoped(ApiEntity.class).stream()
                .map(a -> new ApiDto(a.id(), a.name(), a.operations().stream()
                        .map(op -> new ApiOperationDto(op.id(), op.name(), op.httpMethod(),
                                op.path(), op.targetBoundedContextId(), op.targetUseCaseId(),
                                op.targetQueryServiceId(), op.targetQueryOperationId()))
                        .toList(),
                        a.publishedByExternalSystemId()))
                .toList();

        var useCaseCalls = new ArrayList<UseCaseCallDto>();
        for (var uc : scoped(UseCaseEntity.class)) {
            if (uc.steps() == null) continue;
            for (var step : uc.steps()) {
                if (step.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallUseCase
                        && step.useCaseId() != null) {
                    useCaseCalls.add(new UseCaseCallDto(uc.id(), step.useCaseId()));
                }
            }
        }

        // The eventstorming chain: command → aggregate (write steps), command → domain
        // event (publish steps), plus the event → reaction wiring (subscriptions and
        // projections; flows/processes/workflows are already projected above).
        var aggregateCalls = new ArrayList<AggregateCallDto>();
        var useCaseEmissions = new ArrayList<EmissionDto>();
        for (var uc : scoped(UseCaseEntity.class)) {
            if (uc.steps() == null) continue;
            for (var step : uc.steps()) {
                var type = step.type();
                if ((type == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallAggregateOperation
                        || type == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.SaveAggregate)
                        && step.aggregateId() != null) {
                    aggregateCalls.add(new AggregateCallDto(uc.id(), step.aggregateId()));
                }
                if (type == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.PublishDomainEvent
                        && step.domainEventId() != null) {
                    useCaseEmissions.add(new EmissionDto(uc.id(), step.domainEventId()));
                }
            }
        }
        var subscriptions = scoped(SubscriptionEntity.class).stream()
                .map(s -> new SubscriptionDto(s.id(), s.name(), s.eventName(), s.consumerGroup(),
                        (s.actions() == null ? List.<SubscriptionActionDto>of() : s.actions().stream()
                                .map(a -> new SubscriptionActionDto(
                                        a.type() != null ? a.type().name() : null,
                                        a.useCaseId(), a.sagaId(), a.projectionId()))
                                .toList())))
                .toList();
        var projectionDtos = scoped(ProjectionEntity.class).stream()
                .map(p -> new ProjectionDto(p.id(), p.name(), p.readModelId(),
                        p.readModelId() == null ? null
                                : repository.findById(p.readModelId(), ReadModelEntity.class)
                                        .map(ReadModelEntity::name).orElse(p.readModelId()),
                        (p.handlers() == null ? List.<String>of() : p.handlers().stream()
                                .map(h -> h.domainEventId()).filter(Objects::nonNull).distinct().toList()),
                        p.sourceAggregateId(),
                        scoped(BoundedContextEntity.class).stream()
                                .filter(m -> m.projectionIds() != null
                                        && m.projectionIds().contains(p.id()))
                                .map(BoundedContextEntity::id).findFirst().orElse(null),
                        p.sourceExternalUseCaseId(), p.sourceExternalTableId()))
                .toList();

        var queryCalls = new ArrayList<QueryCallDto>();
        for (var uc : scoped(UseCaseEntity.class)) {
            if (uc.steps() == null) continue;
            for (var step : uc.steps()) {
                if (step.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallQueryService
                        && step.queryServiceId() != null) {
                    queryCalls.add(new QueryCallDto(uc.id(), step.queryServiceId()));
                }
            }
        }
        var externalCalls = new ArrayList<ExternalCallDto>();
        for (var m : scoped(BoundedContextEntity.class)) {
            if (m.acls() == null) continue;
            for (var acl : m.acls()) {
                if (!"INBOUND".equalsIgnoreCase(acl.direction()) || acl.externalSystem() == null) continue;
                for (var ucId : acl.translatedUseCaseIds() == null ? List.<String>of() : acl.translatedUseCaseIds()) {
                    externalCalls.add(new ExternalCallDto(acl.externalSystem(), ucId));
                }
            }
        }
        var externalUseCaseCalls = new ArrayList<ExternalUseCaseCallDto>();
        for (var uc : scoped(UseCaseEntity.class)) {
            if (uc.steps() == null) continue;
            for (var step : uc.steps()) {
                if (step.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallExternalUseCase
                        && step.externalUseCaseId() != null) {
                    externalUseCaseCalls.add(new ExternalUseCaseCallDto(uc.id(), step.externalUseCaseId()));
                }
            }
        }
        var actorUses = new ArrayList<ActorUseDto>();
        var actorExternalDependencies = new ArrayList<ActorExternalDependencyDto>();
        for (var role : scoped(RoleEntity.class)) {
            role.allowedUseCaseIds().forEach(id -> actorUses.add(new ActorUseDto(role.id(), id)));
            role.allowedQueryServiceIds().forEach(id -> actorUses.add(new ActorUseDto(role.id(), id)));
            role.externalSystemIds().forEach(id ->
                    actorExternalDependencies.add(new ActorExternalDependencyDto(role.id(), id)));
        }
        var externalSystemDependencies = new ArrayList<ExternalSystemDependencyDto>();
        if (currentProject != null) {
            for (var x : currentProject.externalSystems()) {
                x.dependsOnExternalSystemIds().forEach(id -> externalSystemDependencies.add(
                        new ExternalSystemDependencyDto(x.id(), id, "DEPENDS")));
                x.dependsOnApiIds().forEach(id -> externalSystemDependencies.add(
                        new ExternalSystemDependencyDto(x.id(), id, "DEPENDS")));
                x.cqrsExternalSystemIds().forEach(id -> externalSystemDependencies.add(
                        new ExternalSystemDependencyDto(x.id(), id, "CQRS")));
            }
        }
        var proxyApis = scoped(ProxyApiEntity.class).stream()
                .map(px -> new ProxyApiDto(px.id(), px.name(), px.targetApiId(),
                        px.publishedByExternalSystemId()))
                .toList();
        var apiImplementations = scoped(ApiEntity.class).stream()
                .flatMap(a -> a.implementedByBoundedContextIds().stream()
                        .map(mid -> new ApiImplementationDto(a.id(), mid)))
                .toList();
        var proxyOperationRoutes = scoped(ProxyApiEntity.class).stream()
                .flatMap(px -> px.operationRoutes().stream()
                        .map(r -> new ProxyOperationRouteDto(px.id(), r.operationId(), r.targetSiteId())))
                .toList();
        var externalOperationUses = java.util.stream.Stream.ofNullable(currentProject)
                .flatMap(pr -> pr.externalSystems().stream())
                .flatMap(x -> x.apiOperationUses().stream()
                        .map(u -> new ExternalOperationUseDto(x.id(), u.operationId(), u.siteId())))
                .toList();
        var apiOperationImplementations = scoped(ApiEntity.class).stream()
                .flatMap(a -> a.operationImplementations().stream()
                        .map(w -> new ApiOperationImplementationDto(a.id(), w.operationId(), w.boundedContextId(), w.useCaseId())))
                .toList();

        // The UI map: apps (menu trees), pages (with their buttons) and who uses which app.
        // Pre-id stores (and entries created before ids existed) self-heal on first read:
        // duplicate labels made selection and gestures ambiguous without a stable identity.
        for (var app : scoped(UiAdapterEntity.class)) {
            var healed = UiEditorCommands.withMenuItemIds(app.menuItems(), new java.util.HashSet<>());
            if (healed != null) {
                repository.save(UiEditorCommands.withMenuItems(app, healed));
            }
        }
        var uiApps = scoped(UiAdapterEntity.class).stream()
                .map(a -> new UiAppDto(a.id(), a.name(), a.title(),
                        (a.menuItems() == null ? List.<UiMenuItemEntity>of() : a.menuItems()).stream()
                                .map(EditorApiController::toMenuEntry)
                                .toList(),
                        a.appType().name(), a.headerPageId(), a.homePageId(), a.homeAppId(),
                        a.modelId(), a.viewPageId(), a.editPageId(), a.identityProviderId()))
                .toList();
        var pages = scoped(PageEntity.class).stream()
                .map(p -> new UiPageDto(p.id(), p.name(), p.type(), p.route(), p.modelId(),
                        p.modelId() == null ? null
                                : repository.findById(p.modelId(), ModelEntity.class)
                                        .map(ModelEntity::name).orElse(null),
                        p.aggregateId(), p.listingQueryServiceId(),
                        java.util.stream.Stream.concat(
                                        (p.toolbar() == null ? List.<PageButtonEntity>of() : p.toolbar()).stream()
                                                .map(b -> new UiPageButtonDto(b.label(), b.useCaseId(), b.mappingId(), "toolbar")),
                                        (p.bottomBar() == null ? List.<PageButtonEntity>of() : p.bottomBar()).stream()
                                                .map(b -> new UiPageButtonDto(b.label(), b.useCaseId(), b.mappingId(), "bottom")))
                                .toList(),
                        uiCommands.uiFields(p),
                        (p.content() == null ? List.<UiComponentNodeEntity>of() : p.content()).stream()
                                .map(EditorApiController::toComponentNode)
                                .toList(),
                        (p.wizardSteps() == null ? List.<PageWizardStepEntity>of() : p.wizardSteps()).stream()
                                .map(s -> new UiWizardStepDto(s.pageId(), s.label(), s.key()))
                                .toList(),
                        p.crudDetailPageId(), p.crudDetailAppId(),
                        p.crudCreatePageId(), p.crudCreateAppId(), p.customCodeId(),
                        p.toolbarGroupIds() == null ? List.of() : p.toolbarGroupIds(),
                        p.bottomBarGroupIds() == null ? List.of() : p.bottomBarGroupIds()))
                .toList();
        var actorAppUses = new ArrayList<ActorAppUseDto>();
        for (var role : scoped(RoleEntity.class)) {
            role.uiAdapterIds().forEach(id -> actorAppUses.add(new ActorAppUseDto(role.id(), id)));
        }

        // Authored sequence scenarios: participants resolved and backing recomputed on read,
        // so the editor always paints the current reality of the mechanisms underneath.
        var interactionCatalog = io.mateu.modux.modeldrivengenerator.application.usecases.interaction.shared.InteractionCatalog
                .from(repository);
        var interactions = scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.InteractionEntity.class)
                .stream()
                .map(i -> io.mateu.modux.modeldrivengenerator.application.usecases.interaction.shared.InteractionDto
                        .authored(i, interactionCatalog))
                .toList();

        // The strategic map is a projection of the concrete dependency graph:
        // upstream (provider) → downstream (consumer). contextMap entries only
        // annotate the DDD pattern of a derived pair; orphaned annotations
        // (no concrete dependency behind them) are not painted.
        var allBoundedContexts = scoped(BoundedContextEntity.class);
        java.util.function.Function<String, String> boundedContextOfUseCase = ucId -> allBoundedContexts.stream()
                .filter(m -> m.useCaseIds() != null && m.useCaseIds().contains(ucId))
                .map(BoundedContextEntity::id).findFirst().orElse(null);
        java.util.function.Function<String, String> boundedContextOfAggregate = aggId -> allBoundedContexts.stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(aggId))
                .map(BoundedContextEntity::id).findFirst().orElse(null);
        var dependencyReasons = new java.util.LinkedHashMap<List<String>, List<String>>();
        java.util.function.BiConsumer<List<String>, String> addDependency = (pair, reason) -> {
            if (pair.get(0) == null || pair.get(1) == null || pair.get(0).equals(pair.get(1))) return;
            dependencyReasons.computeIfAbsent(pair, k -> new ArrayList<>()).add(reason);
        };
        for (var call : useCaseCalls) {
            addDependency.accept(List.of(
                    Objects.toString(boundedContextOfUseCase.apply(call.targetId()), ""),
                    Objects.toString(boundedContextOfUseCase.apply(call.sourceId()), "")),
                    "llamada " + call.sourceId() + " → " + call.targetId());
        }
        for (var call : queryCalls) {
            var qsBoundedContext = repository.findById(call.targetId(), QueryServiceEntity.class)
                    .map(QueryServiceEntity::boundedContextId).orElse(null);
            addDependency.accept(List.of(
                    Objects.toString(qsBoundedContext, ""),
                    Objects.toString(boundedContextOfUseCase.apply(call.sourceId()), "")),
                    "consulta " + call.sourceId() + " → " + call.targetId());
        }
        for (var f : flows) {
            addDependency.accept(List.of(
                    Objects.toString(f.sourceId(), ""), Objects.toString(f.targetId(), "")),
                    "flow " + f.name() + " [" + f.archetype() + "]");
        }
        for (var ref : references) {
            addDependency.accept(List.of(
                    Objects.toString(boundedContextOfAggregate.apply(ref.targetAggregateId()), ""),
                    Objects.toString(boundedContextOfAggregate.apply(ref.sourceAggregateId()), "")),
                    "referencia " + ref.sourceAggregateId() + " → " + ref.targetAggregateId());
        }
        var annotations = currentProject == null
                ? List.<ContextMapRelationEntity>of() : currentProject.contextMap();
        // The PATTERN of a derived pair can often be read off its dependencies: mutual
        // → partnership; embedded aggregates → shared kernel; events only → published
        // language; one upstream serving many → open host service; direct calls →
        // customer/supplier. The annotation (declared by hand) always wins.
        java.util.function.BiFunction<List<String>, List<String>, String> inferType = (pair, reasons) -> {
            if (dependencyReasons.containsKey(List.of(pair.get(1), pair.get(0)))) return "PARTNERSHIP";
            if (reasons.stream().anyMatch(r -> r.startsWith("referencia "))) return "SHARED_KERNEL";
            var onlyEvents = reasons.stream().allMatch(r -> r.startsWith("flow "));
            if (onlyEvents) return "PUBLISHED_LANGUAGE";
            var downstreamsOfUpstream = dependencyReasons.keySet().stream()
                    .filter(k -> k.get(0).equals(pair.get(0)))
                    .count();
            if (downstreamsOfUpstream >= 2) return "OPEN_HOST_SERVICE";
            return "CUSTOMER_SUPPLIER";
        };
        var relations = new ArrayList<>(dependencyReasons.entrySet().stream()
                .filter(e -> !e.getKey().get(0).isEmpty() && !e.getKey().get(1).isEmpty())
                .map(e -> {
                    var annotation = annotations.stream()
                            .filter(a -> e.getKey().get(0).equals(a.sourceBoundedContextId())
                                    && e.getKey().get(1).equals(a.targetBoundedContextId()))
                            .findFirst().orElse(null);
                    return new RelationDto(e.getKey().get(0), e.getKey().get(1),
                            annotation != null ? annotation.type() : null,
                            inferType.apply(e.getKey(), e.getValue()),
                            annotation != null,
                            String.join(" · ", e.getValue()));
                })
                .toList());
        // Hand-declared relations with no derived dependency yet (e.g. drawn from the
        // explorer between two still-unwired contexts) surface too: intent shows first.
        var derivedPairs = relations.stream()
                .map(r -> r.sourceId() + "->" + r.targetId())
                .collect(java.util.stream.Collectors.toSet());
        annotations.stream()
                .filter(a -> a.type() != null)
                .filter(a -> !derivedPairs.contains(a.sourceBoundedContextId() + "->" + a.targetBoundedContextId()))
                .filter(a -> repository.findById(a.sourceBoundedContextId(), BoundedContextEntity.class).isPresent()
                        && repository.findById(a.targetBoundedContextId(), BoundedContextEntity.class).isPresent())
                .forEach(a -> relations.add(new RelationDto(a.sourceBoundedContextId(), a.targetBoundedContextId(),
                        a.type(), null, true, "declarada a mano — aún sin dependencia concreta")));

        // Element id → description, collected generically so the editor can show it
        // on hover. Types without a description field are simply skipped (nothing
        // to show) until they gain one.
        var descriptions = new java.util.LinkedHashMap<String, String>();
        java.util.function.BiConsumer<String, String> putDesc = (id, d) -> {
            if (id != null && d != null && !d.isBlank()) descriptions.put(id, d);
        };
        scoped(BoundedContextEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(ExternalSystemEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(DomainServiceEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(ApiEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(ProxyApiEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(ReadModelEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(QueryServiceEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(FlowEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(ProcessEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(WorkflowEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(RagEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(AiAgentEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(McpGatewayEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(EtlFlowEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(ScheduledTriggerEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiEntity.class)
                .forEach(e -> putDesc.accept(e.id(), e.description()));
        // Core domain elements (description field added recently).
        scoped(AggregateEntity.class).forEach(e -> {
            putDesc.accept(e.id(), e.description());
            e.operations().forEach(op -> putDesc.accept(op.id(), op.description()));
        });
        scoped(UseCaseEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(DomainEventEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(PageEntity.class).forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EntityEntity.class)
                .forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ValueObjectEntity.class)
                .forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApplicationEventEntity.class)
                .forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RoleEntity.class)
                .forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity.class)
                .forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity.class)
                .forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaEntity.class)
                .forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.NotificationEntity.class)
                .forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity.class)
                .forEach(e -> putDesc.accept(e.id(), e.description()));
        scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity.class)
                .forEach(e -> putDesc.accept(e.id(), e.description()));

        return new EditorModelDto(
                boundedContexts, externalSystems, relations, flows, aggregates, entities, valueObjects, references, processes,
                views, emissions.stream().distinct().toList(), actors,
                useCaseCalls.stream().distinct().toList(),
                queryCalls.stream().distinct().toList(),
                actorUses.stream().distinct().toList(),
                externalCalls.stream().distinct().toList(),
                externalUseCaseCalls.stream().distinct().toList(),
                aiAgents,
                agentUses.stream().distinct().toList(),
                workflows,
                scoped(EtlFlowEntity.class).stream()
                        .map(f -> new EtlFlowDto(f.id(), f.name(), f.ownerBoundedContextId(), f.steps().stream()
                                .map(s -> new EtlStepDto(s.id(), s.name(), s.type(), s.externalTableId(),
                                        s.apiId(), s.operationId(), s.eventId(), s.modelMappingId()))
                                .toList(),
                                f.identityProviderId()))
                        .toList(),
                scoped(IdentityProviderEntity.class).stream()
                        .map(x -> new IdentityProviderDto(x.id(), x.name(), x.type(), x.issuer(),
                                x.publishedByExternalSystemId()))
                        .toList(),
                scoped(NotificationEntity.class).stream()
                        .map(x -> new NotificationDto(x.id(), x.name(), x.ownerBoundedContextId(), x.eventId(),
                                x.channels(), x.recipientRoleIds()))
                        .toList(),
                scoped(DocumentEntity.class).stream()
                        .map(x -> new DocumentDto(x.id(), x.name(), x.ownerBoundedContextId(), x.kind(),
                                x.modelId(), x.queryServiceId(), x.queryOperationId()))
                        .toList(),
                aggregateCalls.stream().distinct().toList(),
                useCaseEmissions.stream().distinct().toList(),
                subscriptions,
                projectionDtos,
                agentExternalUses.stream().distinct().toList(),
                rags,
                agentRags.stream().distinct().toList(),
                apis,
                actorExternalDependencies.stream().distinct().toList(),
                externalSystemDependencies.stream().distinct().toList(),
                proxyApis,
                agentMcpUses.stream().distinct().toList(),
                mcpGateways,
                agentGatewayUses.stream().distinct().toList(),
                agentApiOpUses.stream().distinct().toList(),
                agentApiUses.stream().distinct().toList(),
                agentQueryUses.stream().distinct().toList(),
                agentDelegations.stream().distinct().toList(),
                actorAgentUses.stream().distinct().toList(),
                agentTriggers.stream().distinct().toList(),
                apiImplementations,
                proxyOperationRoutes,
                externalOperationUses,
                apiOperationImplementations,
                uiApps,
                pages,
                actorAppUses.stream().distinct().toList(),
                scoped(ModelEntity.class).stream()
                        .map(x -> new ModelRefDto(x.id(), x.name(),
                                (x.fields() == null ? List.<ModelFieldEntity>of() : x.fields()).stream()
                                        .map(f -> new ModelFieldDto(f.id(), f.name(),
                                                f.type() == null ? null : f.type().name()))
                                        .toList()))
                        .toList(),
                scoped(SagaEntity.class).stream()
                        .map(x -> new NamedRefDto(x.id(), x.name()))
                        .toList(),
                scoped(ModuleEntity.class).stream()
                        .map(x -> new ModuleDto(x.id(), x.name(), x.boundedContextId(), x.elementIds(), x.main()))
                        .toList(),
                services.stream()
                        .map(s -> new ServiceDto(s.id(), s.name(), s.moduleIds(),
                                s.database(), s.outboxEnabled(), s.urlIds()))
                        .toList(),
                scoped(TransformationEntity.class).stream()
                        .map(t -> new TransformationDto(t.id(), t.name(),
                                t.inputs().stream()
                                        .map(r -> new TransformationRefDto(r.modelId(), r.fieldId()))
                                        .toList(),
                                t.output() == null ? null
                                        : new TransformationRefDto(t.output().modelId(), t.output().fieldId()),
                                t.customCodeId()))
                        .toList(),
                scoped(CustomCodeEntity.class).stream()
                        .map(x -> new CustomCodeDto(x.id(), x.name(), x.usedElementIds()))
                        .toList(),
                scoped(ButtonGroupEntity.class).stream()
                        .map(g -> new ButtonGroupDto(g.id(), g.name(),
                                g.buttons().stream()
                                        .map(bt -> new GroupButtonDto(bt.id(), bt.label(), bt.useCaseId(),
                                                bt.apiId(), bt.apiOperationId(), bt.mappingId()))
                                        .toList(),
                                g.groupIds()))
                        .toList(),
                scoped(WorkflowGatewayEntity.class).stream()
                        .map(g -> new WorkflowGatewayDto(g.id(), g.name(), g.type(), g.semantics(),
                                g.sourceIds(), g.targetIds(),
                                g.branchConditions().stream()
                                        .map(c -> new GatewayBranchConditionDto(c.targetId(), c.expression()))
                                        .toList()))
                        .toList(),
                scoped(ModelMappingEntity.class).stream()
                        .map(x -> new MappingRefDto(x.id(), x.name(), x.sourceModelId(), x.targetModelId(),
                                (x.rules() == null ? List.<ModelMappingRuleEntity>of() : x.rules()).stream()
                                        .map(r -> new MappingRuleDto(r.id(), r.sourceFieldId(), r.targetFieldId()))
                                        .toList(),
                                x.customCodeId()))
                        .toList(),
                scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.NoteEntity.class).stream()
                        .map(n -> new EditorApiController.NoteDto(n.id(), n.text(), n.targetIds(), n.edgeRefs()))
                        .toList(),
                scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AreaEntity.class).stream()
                        .map(a -> new EditorApiController.AreaDto(a.id(), a.name()))
                        .toList(),
                scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ArchimateRelationEntity.class).stream()
                        .map(r -> new ArchimateRelationDto(r.id(), r.sourceId(), r.targetId(), r.type(), r.label()))
                        .toList(),
                scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiEntity.class).stream()
                        .map(u -> new UiDto(u.id(), u.name(), u.boundedContextId(), u.appIds(), u.pageIds(), u.actorIds()))
                        .toList(),
                scoped(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UrlEntity.class).stream()
                        .map(u -> new EditorApiController.UrlDto(u.id(), u.name(), u.url()))
                        .toList(),
                interactions,
                descriptions);
    }

    /** An invariant with its PRIMARY condition (expression + error message) surfaced for editing. */
    private static AggregateInvariantDto invDto(InvariantEntity i) {
        var c = i.conditions() != null && !i.conditions().isEmpty() ? i.conditions().get(0) : null;
        return new AggregateInvariantDto(i.id(), i.name(),
                c != null ? c.expression() : null, c != null ? c.errorMessage() : null);
    }

    /** The pool narrowed to the SELECTED project (unstamped legacy elements stay visible). */
    private <T> List<T> scoped(Class<T> type) {
        var current = projects.currentProject()
                .map(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity::id)
                .orElse(null);
        return repository.findAllOfType(type).stream()
                .filter(x -> io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectScope
                        .inProject(x, current))
                .toList();
    }
}
