package io.mateu.modux.modeldrivengenerator.infra.in.rest;

import io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence.FlowContextMapCoherenceService;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.SubdomainType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApplicationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ContextMapRelationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramEdgeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramNodeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramPointEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EntityEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RoleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.OperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ViewEntity;
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

/**
 * JSON API consumed by the graphical editor web component (editor/ package,
 * &lt;modux-editor-connected&gt;). Serves a projection of the model, applies the
 * editor's mutation commands, and persists the diagram geometry as the store's
 * {@code diagrams} section — a separate structure that only references the
 * authored elements by id, so paint concerns never leak into the elements
 * themselves.
 */
@RestController
@RequestMapping("/modux/editor")
@CrossOrigin
@RequiredArgsConstructor
public class EditorApiController {

    private final CommonFileRepository repository;
    private final FlowContextMapCoherenceService coherenceService;

    // ---- projection -------------------------------------------------------

    public record ModuleDto(String id, String name, String subdomainType, String serviceId,
                            List<UseCaseDto> useCases, List<DomainEventDto> domainEvents,
                            List<ReadModelDto> readModels, List<DomainServiceDto> domainServices,
                            List<ApplicationEventDto> applicationEvents,
                            List<QueryServiceDto> queryServices) {}
    public record DomainServiceDto(String id, String name) {}
    public record ApplicationEventDto(String id, String name) {}
    public record DomainEventDto(String id, String name) {}
    public record ReadModelDto(String id, String name, String aggregateId) {}
    /** Who emits a domain event: an aggregate, through its operations' `emits`. */
    public record EmissionDto(String sourceId, String domainEventId) {}
    public record ExternalSystemDto(String id, String name) {}
    public record RelationDto(String sourceId, String targetId, String type) {}
    public record FlowDto(String id, String name, String sourceId, String targetId, String archetype,
                          String triggerAggregateId, String triggerEvent, String targetUseCaseId,
                          String readModelName) {}
    public record UseCaseDto(String id, String name) {}
    public record AggregateDto(String id, String name, String moduleId) {}
    public record EntityDto(String id, String name, String aggregateId) {}
    public record AggregateReferenceDto(String sourceAggregateId, String targetAggregateId, String label) {}
    public record ProcessStepDto(String id, String name, String type, String useCaseId, String roleId,
                                 String deadline, String compensationUseCaseId) {}
    public record ProcessDto(String id, String name, String triggerAggregateId, String triggerEvent,
                             String ownerModuleId, String onCompletionEventName, String sla,
                             List<ProcessStepDto> steps) {}
    public record ViewDto(String id, String name, String kind, List<String> memberIds) {}
    /** A business actor (RoleEntity) shown on the context map. */
    public record ActorDto(String id, String name) {}
    /** Use case A invokes use case B (a CallUseCase step in A). */
    public record UseCaseCallDto(String sourceId, String targetId) {}
    public record QueryServiceDto(String id, String name) {}
    /** Use case A consumes query service B (a CallQueryService step in A). */
    public record QueryCallDto(String sourceId, String targetId) {}
    /** An actor uses a use case or a query service directly (a UI is derived from it). */
    public record ActorUseDto(String actorId, String targetId) {}

    public record EditorModelDto(
            List<ModuleDto> modules,
            List<ExternalSystemDto> externalSystems,
            List<RelationDto> relations,
            List<FlowDto> flows,
            List<AggregateDto> aggregates,
            List<EntityDto> entities,
            List<AggregateReferenceDto> aggregateReferences,
            List<ProcessDto> processes,
            List<ViewDto> views,
            List<EmissionDto> emissions,
            List<ActorDto> actors,
            List<UseCaseCallDto> useCaseCalls,
            List<QueryCallDto> queryCalls,
            List<ActorUseDto> actorUses) {}

    /**
     * Cheap, order-independent fingerprint of the whole store. The editor
     * listens for changes over SSE (/events) with this endpoint as the
     * polling fallback — both cover edits made from the Mateu CRUDs, another
     * editor instance, or MCP.
     */
    @GetMapping("/version")
    public Map<String, String> version() {
        return Map.of("version", currentVersion());
    }

    private String currentVersion() {
        var elements = repository.allElements();
        var hash = elements.stream().mapToInt(Objects::hashCode).sum() * 31 + elements.size();
        return Integer.toHexString(hash);
    }

    // ---- change push (SSE) -------------------------------------------------

    private final java.util.concurrent.CopyOnWriteArrayList<org.springframework.web.servlet.mvc.method.annotation.SseEmitter> emitters =
            new java.util.concurrent.CopyOnWriteArrayList<>();
    private java.util.concurrent.ScheduledExecutorService watcher;
    private volatile String lastBroadcast;

    @jakarta.annotation.PostConstruct
    void startWatcher() {
        watcher = java.util.concurrent.Executors.newSingleThreadScheduledExecutor(r -> {
            var thread = new Thread(r, "modux-editor-events");
            thread.setDaemon(true);
            return thread;
        });
        watcher.scheduleWithFixedDelay(this::broadcastIfChanged, 2, 2, java.util.concurrent.TimeUnit.SECONDS);
    }

    @jakarta.annotation.PreDestroy
    void stopWatcher() {
        watcher.shutdownNow();
    }

    private void broadcastIfChanged() {
        if (emitters.isEmpty()) return;
        var version = currentVersion();
        if (version.equals(lastBroadcast)) return;
        lastBroadcast = version;
        for (var emitter : emitters) {
            try {
                emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter
                        .event().name("version").data(version));
            } catch (Exception e) {
                emitters.remove(emitter);
            }
        }
    }

    /** The server watches its own fingerprint and pushes it; clients never poll while connected. */
    @GetMapping("/events")
    public org.springframework.web.servlet.mvc.method.annotation.SseEmitter events() {
        var emitter = new org.springframework.web.servlet.mvc.method.annotation.SseEmitter(0L);
        emitters.add(emitter);
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        try {
            emitter.send(org.springframework.web.servlet.mvc.method.annotation.SseEmitter
                    .event().name("version").data(currentVersion()));
        } catch (Exception ignored) {
            emitters.remove(emitter);
        }
        return emitter;
    }

    @GetMapping("/model")
    public EditorModelDto model() {
        var services = repository.findAllOfType(ServiceEntity.class);
        var useCasesById = repository.findAllOfType(UseCaseEntity.class).stream()
                .collect(Collectors.toMap(UseCaseEntity::id, uc -> uc, (a, b) -> a));
        var domainEventsById = repository.findAllOfType(DomainEventEntity.class).stream()
                .collect(Collectors.toMap(DomainEventEntity::id, ev -> ev, (a, b) -> a));
        var readModelsById = repository.findAllOfType(ReadModelEntity.class).stream()
                .collect(Collectors.toMap(ReadModelEntity::id, rm -> rm, (a, b) -> a));
        var domainServicesById = repository.findAllOfType(DomainServiceEntity.class).stream()
                .collect(Collectors.toMap(DomainServiceEntity::id, ds -> ds, (a, b) -> a));
        var applicationEventsById = repository.findAllOfType(ApplicationEventEntity.class).stream()
                .collect(Collectors.toMap(ApplicationEventEntity::id, ev -> ev, (a, b) -> a));
        var queryServicesByModule = repository.findAllOfType(QueryServiceEntity.class).stream()
                .filter(qs -> qs.moduleId() != null)
                .collect(Collectors.groupingBy(QueryServiceEntity::moduleId));
        var modules = repository.findAllOfType(ModuleEntity.class).stream()
                .map(m -> new ModuleDto(
                        m.id(),
                        m.name(),
                        m.subdomainType() == null ? null : m.subdomainType().name(),
                        services.stream()
                                .filter(s -> s.moduleIds() != null && s.moduleIds().contains(m.id()))
                                .map(ServiceEntity::id)
                                .findFirst()
                                .orElse(null),
                        (m.useCaseIds() == null ? List.<String>of() : m.useCaseIds()).stream()
                                .map(useCasesById::get)
                                .filter(Objects::nonNull)
                                .map(uc -> new UseCaseDto(uc.id(), uc.name()))
                                .toList(),
                        (m.domainEventIds() == null ? List.<String>of() : m.domainEventIds()).stream()
                                .map(domainEventsById::get)
                                .filter(Objects::nonNull)
                                .map(ev -> new DomainEventDto(ev.id(), ev.name()))
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
                        queryServicesByModule.getOrDefault(m.id(), List.of()).stream()
                                .map(qs -> new QueryServiceDto(qs.id(), qs.name()))
                                .toList()))
                .toList();

        var projects = repository.findAllOfType(ProjectEntity.class);
        var externalSystems = projects.stream()
                .flatMap(p -> p.externalSystems().stream())
                .map(x -> new ExternalSystemDto(x.id(), x.name()))
                .toList();
        var relations = projects.stream()
                .flatMap(p -> p.contextMap().stream())
                .map(r -> new RelationDto(r.sourceModuleId(), r.targetModuleId(), r.type()))
                .toList();

        var flowEntities = repository.findAllOfType(FlowEntity.class);
        var flows = coherenceService.analyze().stream()
                .filter(f -> f.sourceModuleId() != null && f.targetModuleId() != null)
                .map(f -> {
                    var entity = flowEntities.stream()
                            .filter(e -> e.id().equals(f.flowId()))
                            .findFirst();
                    return new FlowDto(
                            f.flowId(),
                            f.flowName(),
                            f.sourceModuleId(),
                            f.targetModuleId(),
                            f.archetype() == null ? null : f.archetype().name(),
                            entity.map(FlowEntity::triggerAggregateId).orElse(null),
                            entity.map(FlowEntity::triggerEvent).orElse(null),
                            entity.map(FlowEntity::targetUseCaseId).orElse(null),
                            entity.map(FlowEntity::readModelName).orElse(null));
                })
                .toList();

        var allAggregates = repository.findAllOfType(AggregateEntity.class);
        var aggregates = new ArrayList<AggregateDto>();
        for (var module : repository.findAllOfType(ModuleEntity.class)) {
            if (module.aggregateIds() == null) continue;
            for (var aggregateId : module.aggregateIds()) {
                allAggregates.stream()
                        .filter(a -> a.id().equals(aggregateId))
                        .findFirst()
                        .ifPresent(a -> aggregates.add(new AggregateDto(a.id(), a.name(), module.id())));
            }
        }

        var entities = repository.findAllOfType(EntityEntity.class).stream()
                .filter(e -> e.parentAggregateId() != null && !e.parentAggregateId().isBlank())
                .map(e -> new EntityDto(e.id(), e.name(), e.parentAggregateId()))
                .toList();

        // A field of aggregate A's state model typed as another aggregate's state
        // model is projected as a cross-aggregate reference (heuristic; the model
        // remains the source of truth).
        var models = repository.findAllOfType(ModelEntity.class);
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

        var processes = repository.findAllOfType(ProcessEntity.class).stream()
                .map(p -> new ProcessDto(
                        p.id(), p.name(), p.triggerAggregateId(), p.triggerEvent(),
                        p.ownerModuleId(), p.onCompletionEventName(), p.sla(),
                        p.steps().stream()
                                .map(s -> new ProcessStepDto(
                                        s.id(), s.name(),
                                        s.type() == null ? null : s.type().name(),
                                        s.useCaseId(), s.roleId(), s.deadline(),
                                        s.compensationUseCaseId()))
                                .toList()))
                .toList();

        var views = repository.findAllOfType(ViewEntity.class).stream()
                .map(v -> new ViewDto(v.id(), v.name(), v.kind(), v.memberIds()))
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
        for (var a : repository.findAllOfType(AggregateEntity.class)) {
            collectEmissions(a.id(), a.operations(), eventIdByName, emissions);
        }
        for (var ds : repository.findAllOfType(DomainServiceEntity.class)) {
            collectEmissions(ds.id(), ds.operations(), eventIdByName, emissions);
        }
        for (var uc : repository.findAllOfType(UseCaseEntity.class)) {
            if (uc.steps() == null) continue;
            for (var step : uc.steps()) {
                if (step.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.PublishApplicationEvent
                        && step.applicationEventId() != null) {
                    emissions.add(new EmissionDto(uc.id(), step.applicationEventId()));
                }
            }
        }

        var actors = repository.findAllOfType(RoleEntity.class).stream()
                .map(r -> new ActorDto(r.id(), r.name()))
                .toList();

        var useCaseCalls = new ArrayList<UseCaseCallDto>();
        for (var uc : repository.findAllOfType(UseCaseEntity.class)) {
            if (uc.steps() == null) continue;
            for (var step : uc.steps()) {
                if (step.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallUseCase
                        && step.useCaseId() != null) {
                    useCaseCalls.add(new UseCaseCallDto(uc.id(), step.useCaseId()));
                }
            }
        }

        var queryCalls = new ArrayList<QueryCallDto>();
        for (var uc : repository.findAllOfType(UseCaseEntity.class)) {
            if (uc.steps() == null) continue;
            for (var step : uc.steps()) {
                if (step.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallQueryService
                        && step.queryServiceId() != null) {
                    queryCalls.add(new QueryCallDto(uc.id(), step.queryServiceId()));
                }
            }
        }
        var actorUses = new ArrayList<ActorUseDto>();
        for (var role : repository.findAllOfType(RoleEntity.class)) {
            role.allowedUseCaseIds().forEach(id -> actorUses.add(new ActorUseDto(role.id(), id)));
            role.allowedQueryServiceIds().forEach(id -> actorUses.add(new ActorUseDto(role.id(), id)));
        }

        return new EditorModelDto(
                modules, externalSystems, relations, flows, aggregates, entities, references, processes,
                views, emissions.stream().distinct().toList(), actors,
                useCaseCalls.stream().distinct().toList(),
                queryCalls.stream().distinct().toList(),
                actorUses.stream().distinct().toList());
    }

    // ---- commands ---------------------------------------------------------

    public record EditorCommand(String kind, String sourceId, String targetId, String type,
                                String id, String name, String subdomainType, String moduleId,
                                String aggregateId,
                                String archetype, String triggerAggregateId, String triggerEvent,
                                String triggerDomainServiceId, String triggerUseCaseId,
                                String readModelName, String targetUseCaseId,
                                List<ProcessStepDto> steps,
                                String processId, String afterStepId, String stepType,
                                String roleId, String deadline, String useCaseId,
                                String compensationUseCaseId,
                                List<String> memberIds) {}

    @PostMapping("/commands")
    public void apply(@RequestBody EditorCommand command) {
        switch (Objects.requireNonNull(command.kind(), "command.kind")) {
            case "add-relation" -> addRelation(command);
            case "remove-relation" -> removeRelation(command);
            case "set-relation-type" -> setRelationType(command);
            case "add-module" -> addModule(command);
            case "add-external-system" -> addExternalSystem(command);
            case "remove-external-system" -> removeExternalSystem(command);
            case "add-actor" -> addActor(command);
            case "remove-actor" -> removeActor(command);
            case "add-aggregate" -> addAggregate(command);
            case "add-domain-event" -> addDomainEvent(command);
            case "add-domain-service" -> addDomainService(command);
            case "add-application-event" -> addApplicationEvent(command);
            case "remove-application-event" -> removeApplicationEvent(command);
            case "remove-domain-service" -> removeDomainService(command);
            case "add-emission" -> addEmission(command);
            case "add-use-case-call" -> addUseCaseCall(command);
            case "remove-use-case-call" -> removeUseCaseCall(command);
            case "add-query-service" -> addQueryService(command);
            case "remove-query-service" -> removeQueryService(command);
            case "add-query-call" -> addQueryCall(command);
            case "remove-query-call" -> removeQueryCall(command);
            case "add-actor-use" -> addActorUse(command);
            case "remove-actor-use" -> removeActorUse(command);
            case "add-actor-crud" -> addActorCrud(command);
            case "remove-actor-crud" -> removeActorCrud(command);
            case "add-read-model" -> addReadModel(command);
            case "remove-read-model" -> removeReadModel(command);
            case "remove-module" -> removeModule(command);
            case "remove-aggregate" -> removeAggregate(command);
            case "remove-domain-event" -> removeDomainEvent(command);
            case "remove-emission" -> removeEmission(command);
            case "rename-element" -> renameElement(command);
            case "add-flow" -> addFlow(command);
            case "remove-flow" -> removeFlow(command);
            case "add-process" -> addProcess(command);
            case "remove-process" -> removeProcess(command);
            case "add-process-step" -> addProcessStep(command);
            case "remove-process-step" -> removeProcessStep(command);
            case "move-process-step" -> moveProcessStep(command);
            case "update-process-step" -> updateProcessStep(command);
            case "add-view" -> addView(command);
            case "remove-view" -> removeView(command);
            default -> throw new IllegalArgumentException("Unknown command kind: " + command.kind());
        }
    }

    /** Command rejections travel to the editor as 400 + plain message (shown as a toast). */
    @org.springframework.web.bind.annotation.ExceptionHandler({
            IllegalArgumentException.class, IllegalStateException.class})
    public org.springframework.http.ResponseEntity<Map<String, String>> onRejected(RuntimeException e) {
        return org.springframework.http.ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
    }

    private void addFlow(EditorCommand command) {
        if (repository.findById(command.id(), FlowEntity.class).isPresent()) return;
        repository.save(new FlowEntity(
                command.id(), command.name(), null,
                command.archetype() == null ? null : FlowArchetype.valueOf(command.archetype()),
                command.triggerAggregateId(), command.triggerEvent(), command.targetId(),
                command.readModelName(), List.of(), command.targetUseCaseId(),
                List.of(), List.of(), List.of(), command.triggerDomainServiceId(),
                command.triggerUseCaseId()));
    }

    private void removeFlow(EditorCommand command) {
        repository.deleteAllById(List.of(command.id()), FlowEntity.class);
    }

    private void addProcess(EditorCommand command) {
        if (repository.findById(command.id(), ProcessEntity.class).isPresent()) return;
        var steps = command.steps() == null ? List.<ProcessStepEntity>of()
                : command.steps().stream()
                        .map(s -> new ProcessStepEntity(
                                s.id(), s.name(),
                                s.type() == null ? null : ProcessStepType.valueOf(s.type()),
                                s.useCaseId(), s.roleId(), s.deadline(), null,
                                s.compensationUseCaseId(), null))
                        .toList();
        repository.save(new ProcessEntity(
                command.id(), command.name(), null,
                command.triggerAggregateId(), command.triggerEvent(), command.moduleId(),
                steps, null, null, List.of()));
    }

    private void removeProcess(EditorCommand command) {
        repository.deleteAllById(List.of(command.id()), ProcessEntity.class);
    }

    private void addProcessStep(EditorCommand command) {
        var process = repository.findById(command.processId(), ProcessEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Proceso desconocido: " + command.processId()));
        if (process.steps().stream().anyMatch(s -> s.id().equals(command.id()))) return;
        var step = new ProcessStepEntity(
                command.id(), command.name(),
                command.stepType() == null ? ProcessStepType.AUTOMATED
                        : ProcessStepType.valueOf(command.stepType()),
                command.useCaseId(), command.roleId(), command.deadline(), null,
                command.compensationUseCaseId(), null);
        var steps = new ArrayList<>(process.steps());
        var index = command.afterStepId() == null ? steps.size()
                : indexAfter(steps, command.afterStepId());
        steps.add(index, step);
        repository.save(withSteps(process, steps));
    }

    private static int indexAfter(List<ProcessStepEntity> steps, String afterStepId) {
        for (int i = 0; i < steps.size(); i++) {
            if (steps.get(i).id().equals(afterStepId)) return i + 1;
        }
        return steps.size();
    }

    private void removeProcessStep(EditorCommand command) {
        var process = repository.findById(command.processId(), ProcessEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Proceso desconocido: " + command.processId()));
        var steps = process.steps().stream().filter(s -> !s.id().equals(command.id())).toList();
        repository.save(withSteps(process, steps));
    }

    private void addView(EditorCommand command) {
        if (repository.findById(command.id(), ViewEntity.class).isPresent()) return;
        repository.save(new ViewEntity(
                command.id(), command.name(), null, "CURATED",
                command.memberIds() == null ? List.of() : command.memberIds(), null));
    }

    private void removeView(EditorCommand command) {
        repository.deleteAllById(List.of(command.id()), ViewEntity.class);
    }

    /** Reposition a step: afterStepId null moves it to the front. */
    private void moveProcessStep(EditorCommand command) {
        var process = repository.findById(command.processId(), ProcessEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Proceso desconocido: " + command.processId()));
        var step = process.steps().stream()
                .filter(s -> s.id().equals(command.id()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Paso desconocido: " + command.id()));
        var steps = new ArrayList<>(process.steps().stream()
                .filter(s -> !s.id().equals(command.id()))
                .toList());
        var index = command.afterStepId() == null ? 0 : indexAfter(steps, command.afterStepId());
        steps.add(index, step);
        repository.save(withSteps(process, steps));
    }

    /** Replaces roleId, deadline and compensationUseCaseId wholesale (null clears). */
    private void updateProcessStep(EditorCommand command) {
        var process = repository.findById(command.processId(), ProcessEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Proceso desconocido: " + command.processId()));
        repository.save(withSteps(process, process.steps().stream()
                .map(s -> s.id().equals(command.id())
                        ? new ProcessStepEntity(s.id(), s.name(), s.type(), s.useCaseId(),
                                command.roleId(), command.deadline(), s.escalationRoleId(),
                                command.compensationUseCaseId(), s.description())
                        : s)
                .toList()));
    }

    /** Record copy with only steps replaced — every other field preserved verbatim. */
    private static ProcessEntity withSteps(ProcessEntity p, List<ProcessStepEntity> steps) {
        return new ProcessEntity(
                p.id(), p.name(), p.description(), p.triggerAggregateId(), p.triggerEvent(),
                p.ownerModuleId(), steps, p.onCompletionEventName(), p.sla(), p.decisionIds());
    }

    private void removeModule(EditorCommand command) {
        var module = repository.findById(command.id(), ModuleEntity.class).orElse(null);
        if (module == null) return;
        if (module.aggregateIds() != null && !module.aggregateIds().isEmpty()) {
            throw new IllegalArgumentException(
                    "El módulo " + command.id() + " tiene agregados; bórralos primero");
        }
        // Drop the strategic relations that mention it, then the module itself.
        var project = owningProject();
        var relations = project.contextMap().stream()
                .filter(r -> !command.id().equals(r.sourceModuleId())
                        && !command.id().equals(r.targetModuleId()))
                .toList();
        if (relations.size() != project.contextMap().size()) {
            repository.save(withContextMap(project, relations));
        }
        repository.deleteAllById(List.of(command.id()), ModuleEntity.class);
    }

    private void removeAggregate(EditorCommand command) {
        var hasEntities = repository.findAllOfType(EntityEntity.class).stream()
                .anyMatch(e -> command.id().equals(e.parentAggregateId()));
        if (hasEntities) {
            throw new IllegalArgumentException(
                    "El agregado " + command.id() + " tiene entidades; bórralas primero");
        }
        repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(command.id()))
                .forEach(m -> repository.save(withAggregateIds(
                        m, m.aggregateIds().stream().filter(id -> !id.equals(command.id())).toList())));
        repository.deleteAllById(List.of(command.id()), AggregateEntity.class);
    }

    private void renameElement(EditorCommand command) {
        switch (Objects.requireNonNull(command.type(), "rename-element.type (elementType)")) {
            case "module" -> repository.findById(command.id(), ModuleEntity.class)
                    .ifPresent(m -> repository.save(m.toBuilder().name(command.name()).build()));
            case "aggregate" -> repository.findById(command.id(), AggregateEntity.class)
                    .ifPresent(a -> repository.save(new AggregateEntity(
                            a.id(), command.name(), a.modelId(), a.persistenceType(), a.idType(),
                            a.tableName(), a.tableSchema(), a.optimisticLockingEnabled(),
                            a.eventSourcingEnabled(), a.snapshotFrequency(), a.operations(),
                            a.invariants(), a.valueObjectIds(), a.lifecycle(), a.audited(),
                            a.decisionIds())));
            case "entity" -> repository.findById(command.id(), EntityEntity.class)
                    .ifPresent(e -> repository.save(new EntityEntity(
                            e.id(), command.name(), e.modelId(), e.parentAggregateId(), e.isCollection())));
            case "actor" -> repository.findById(command.id(), RoleEntity.class)
                    .ifPresent(r -> repository.save(new RoleEntity(
                            r.id(), command.name(), r.allowedUseCaseIds(), r.allowedQueryServiceIds())));
            case "external-system" -> {
                var project = owningProject();
                repository.save(withExternalSystems(project, project.externalSystems().stream()
                        .map(x -> x.id().equals(command.id())
                                ? new ExternalSystemEntity(x.id(), command.name(), x.description(),
                                        x.protocol(), x.direction(), x.gatewayId(), x.owner(),
                                        x.decisionIds())
                                : x)
                        .toList()));
            }
            case "application-event" -> repository.findById(command.id(), ApplicationEventEntity.class)
                    .ifPresent(ev -> repository.save(new ApplicationEventEntity(
                            ev.id(), command.name(), ev.modelId())));
            case "domain-service" -> repository.findById(command.id(), DomainServiceEntity.class)
                    .ifPresent(ds -> repository.save(new DomainServiceEntity(
                            ds.id(), command.name(), ds.description(), ds.operations())));
            case "query-service" -> repository.findById(command.id(), QueryServiceEntity.class)
                    .ifPresent(qs -> repository.save(new QueryServiceEntity(
                            qs.id(), command.name(), qs.moduleId(), qs.description(),
                            qs.operations(), qs.exposedAsGrpc())));
            case "read-model" -> repository.findById(command.id(), ReadModelEntity.class)
                    .ifPresent(rm -> repository.save(new ReadModelEntity(
                            rm.id(), command.name(), rm.moduleId(), rm.description(), rm.modelId(),
                            rm.storageType(), rm.consistency(), rm.aggregateId())));
            case "domain-event" -> repository.findById(command.id(), DomainEventEntity.class)
                    .ifPresent(ev -> repository.save(new DomainEventEntity(
                            ev.id(), command.name(), ev.modelId(), ev.publishAsIntegrationEvent(),
                            ev.integrationModelId(), ev.topicName(), ev.partitions(), ev.retentionMs(),
                            ev.serializationFormat(), ev.compressionType(), ev.deadLetterQueueEnabled(),
                            ev.deadLetterQueueName(), ev.maxDeliveryAttempts(), ev.schemaVersion(),
                            ev.routingKeyField(), ev.replayable())));
            case "process-step" -> repository.findAllOfType(ProcessEntity.class).stream()
                    .filter(p -> p.steps().stream().anyMatch(s -> s.id().equals(command.id())))
                    .findFirst()
                    .ifPresent(p -> repository.save(withSteps(p, p.steps().stream()
                            .map(s -> s.id().equals(command.id())
                                    ? new ProcessStepEntity(s.id(), command.name(), s.type(),
                                            s.useCaseId(), s.roleId(), s.deadline(),
                                            s.escalationRoleId(), s.compensationUseCaseId(),
                                            s.description())
                                    : s)
                            .toList())));
            default -> throw new IllegalArgumentException(
                    "rename-element no soportado para: " + command.type());
        }
    }

    private void addModule(EditorCommand command) {
        if (repository.findById(command.id(), ModuleEntity.class).isPresent()) return;
        repository.save(new ModuleEntity(
                command.id(), command.name(), null,
                List.of(), List.of(), List.of(), List.of(), List.of(), List.of(), List.of(),
                List.of(), List.of(), List.of(), List.of(),
                null, null, false, null,
                List.of(), List.of(), List.of(), List.of(),
                command.subdomainType() == null ? null : SubdomainType.valueOf(command.subdomainType()),
                List.of(), List.of(), List.of(), null, null, null, null));
    }

    private void addAggregate(EditorCommand command) {
        if (repository.findById(command.id(), AggregateEntity.class).isPresent()) return;
        var module = repository.findById(command.moduleId(), ModuleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown module: " + command.moduleId()));
        // Stub state model so the aggregate is referentially complete from birth;
        // fields get filled in later through the CRUD.
        var modelId = "model-" + command.id().replaceFirst("^agg-", "");
        if (repository.findById(modelId, ModelEntity.class).isEmpty()) {
            repository.save(new ModelEntity(modelId, command.name(), List.of(), List.of()));
        }
        repository.save(new AggregateEntity(
                command.id(), command.name(), modelId,
                null, null, null, null, false, false, null,
                List.of(), List.of(), List.of(), null, false, List.of()));
        var aggregateIds = new ArrayList<>(module.aggregateIds() == null ? List.of() : module.aggregateIds());
        aggregateIds.add(command.id());
        repository.save(withAggregateIds(module, aggregateIds));
    }

    private void addDomainEvent(EditorCommand command) {
        if (repository.findById(command.id(), DomainEventEntity.class).isPresent()) return;
        var module = repository.findById(command.moduleId(), ModuleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown module: " + command.moduleId()));
        repository.save(new DomainEventEntity(
                command.id(), command.name(), null,
                false, null, null, null, null, null, null,
                false, null, null, null, null, false));
        // The event belongs to the bounded context through the module's id list.
        var domainEventIds = new ArrayList<>(
                module.domainEventIds() == null ? List.of() : module.domainEventIds());
        domainEventIds.add(command.id());
        repository.save(module.toBuilder().domainEventIds(domainEventIds).build());
    }

    /**
     * Declares that the source (aggregate or domain service) emits the target domain
     * event: the event NAME joins the `emits` CSV of its first operation (a stub
     * operation is created when it has none). Refinable later through the CRUDs.
     * Use cases do not emit domain events — they emit application events.
     */
    private void addEmission(EditorCommand command) {
        // Use case → application event: a PublishApplicationEvent step.
        var applicationEvent = repository.findById(command.targetId(), ApplicationEventEntity.class);
        if (applicationEvent.isPresent()) {
            var uc = repository.findById(command.sourceId(), UseCaseEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Solo los casos de uso emiten eventos de aplicación; emisor desconocido: "
                                    + command.sourceId()));
            var appEvent = applicationEvent.get();
            var steps = new ArrayList<>(uc.steps() == null ? List.of() : uc.steps());
            var alreadyThere = steps.stream().anyMatch(st -> appEvent.id().equals(st.applicationEventId()));
            if (alreadyThere) return;
            steps.add(new UseCaseStepEntity("step-emit-" + appEvent.id(), "publish" + appEvent.name(),
                    io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.PublishApplicationEvent,
                    null, null, null, null, null, null, null, null, null, null, appEvent.id()));
            repository.save(withSteps(uc, steps));
            return;
        }
        var event = repository.findById(command.targetId(), DomainEventEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown domain event: " + command.targetId()));
        var aggregate = repository.findById(command.sourceId(), AggregateEntity.class);
        if (aggregate.isPresent()) {
            var a = aggregate.get();
            var operations = withEmissionAdded(a.operations(), event);
            if (operations != null) repository.save(withOperations(a, operations));
            return;
        }
        var ds = repository.findById(command.sourceId(), DomainServiceEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Solo agregados y servicios de dominio emiten eventos de dominio; emisor desconocido: "
                                + command.sourceId()));
        var operations = withEmissionAdded(ds.operations(), event);
        if (operations != null) {
            repository.save(new DomainServiceEntity(ds.id(), ds.name(), ds.description(), operations));
        }
    }

    /** The operations list with the emission appended, or null when it is already declared. */
    private static List<OperationEntity> withEmissionAdded(List<OperationEntity> current, DomainEventEntity event) {
        var alreadyThere = current.stream().anyMatch(op -> op.emits() != null
                && java.util.Arrays.stream(op.emits().split(","))
                        .anyMatch(n -> n.trim().equalsIgnoreCase(event.name().trim())));
        if (alreadyThere) return null;
        var operations = new ArrayList<>(current);
        if (operations.isEmpty()) {
            operations.add(new OperationEntity("op-emit-" + event.id(), "emit" + event.name(),
                    null, null, null, null, event.name(), "CUSTOM", false, null, null));
        } else {
            var first = operations.get(0);
            var emits = first.emits() == null || first.emits().isBlank()
                    ? event.name() : first.emits() + "," + event.name();
            operations.set(0, withEmits(first, emits));
        }
        return operations;
    }

    private void removeEmission(EditorCommand command) {
        var applicationEvent = repository.findById(command.targetId(), ApplicationEventEntity.class);
        if (applicationEvent.isPresent()) {
            repository.findById(command.sourceId(), UseCaseEntity.class).ifPresent(uc ->
                    repository.save(withSteps(uc, (uc.steps() == null ? List.<UseCaseStepEntity>of() : uc.steps()).stream()
                            .filter(st -> !command.targetId().equals(st.applicationEventId()))
                            .toList())));
            return;
        }
        var event = repository.findById(command.targetId(), DomainEventEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown domain event: " + command.targetId()));
        repository.findById(command.sourceId(), AggregateEntity.class).ifPresent(a ->
                repository.save(withOperations(a, withEmissionRemoved(a.operations(), event))));
        repository.findById(command.sourceId(), DomainServiceEntity.class).ifPresent(ds ->
                repository.save(new DomainServiceEntity(ds.id(), ds.name(), ds.description(),
                        withEmissionRemoved(ds.operations(), event))));
    }

    private static List<OperationEntity> withEmissionRemoved(List<OperationEntity> current, DomainEventEntity event) {
        return current.stream()
                .map(op -> withEmits(op, java.util.Arrays.stream(
                                (op.emits() == null ? "" : op.emits()).split(","))
                        .map(String::trim)
                        .filter(n -> !n.isBlank() && !n.equalsIgnoreCase(event.name().trim()))
                        .collect(Collectors.joining(","))))
                // A stub created just to carry this emission leaves with it.
                .filter(op -> !(op.id().startsWith("op-emit-") && op.emits() == null))
                .toList();
    }

    private void addApplicationEvent(EditorCommand command) {
        if (repository.findById(command.id(), ApplicationEventEntity.class).isPresent()) return;
        var module = repository.findById(command.moduleId(), ModuleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown module: " + command.moduleId()));
        repository.save(new ApplicationEventEntity(command.id(), command.name(), null));
        var applicationEventIds = new ArrayList<>(module.applicationEventIds());
        applicationEventIds.add(command.id());
        repository.save(module.toBuilder().applicationEventIds(applicationEventIds).build());
    }

    private void removeApplicationEvent(EditorCommand command) {
        repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.applicationEventIds().contains(command.id()))
                .forEach(m -> repository.save(m.toBuilder()
                        .applicationEventIds(m.applicationEventIds().stream()
                                .filter(id -> !id.equals(command.id())).toList())
                        .build()));
        // Publishing steps referencing it leave with it.
        for (var uc : repository.findAllOfType(UseCaseEntity.class)) {
            if (uc.steps() == null || uc.steps().stream().noneMatch(st ->
                    command.id().equals(st.applicationEventId()))) continue;
            repository.save(withSteps(uc, uc.steps().stream()
                    .filter(st -> !command.id().equals(st.applicationEventId()))
                    .toList()));
        }
        repository.deleteAllById(List.of(command.id()), ApplicationEventEntity.class);
    }

    /**
     * Use case A invokes use case B: a CallUseCase step is appended to A. When the two
     * live in different bounded contexts this is the seed for a gateway/API later on.
     */
    private void addUseCaseCall(EditorCommand command) {
        var source = repository.findById(command.sourceId(), UseCaseEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown use case: " + command.sourceId()));
        var target = repository.findById(command.targetId(), UseCaseEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown use case: " + command.targetId()));
        if (source.id().equals(target.id())) {
            throw new IllegalArgumentException("Un caso de uso no puede invocarse a sí mismo");
        }
        var steps = new ArrayList<>(source.steps() == null ? List.of() : source.steps());
        var alreadyThere = steps.stream().anyMatch(st ->
                st.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallUseCase
                        && target.id().equals(st.useCaseId()));
        if (alreadyThere) return;
        steps.add(new UseCaseStepEntity("step-call-" + target.id(), "call" + capitalize(target.name()),
                io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallUseCase,
                null, null, null, null, null, target.id(), null, null, null, null, null));
        repository.save(withSteps(source, steps));
    }

    private void removeUseCaseCall(EditorCommand command) {
        repository.findById(command.sourceId(), UseCaseEntity.class).ifPresent(uc ->
                repository.save(withSteps(uc, (uc.steps() == null ? List.<UseCaseStepEntity>of() : uc.steps()).stream()
                        .filter(st -> !(st.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallUseCase
                                && command.targetId().equals(st.useCaseId())))
                        .toList())));
    }

    private void addQueryService(EditorCommand command) {
        if (repository.findById(command.id(), QueryServiceEntity.class).isPresent()) return;
        repository.findById(command.moduleId(), ModuleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown module: " + command.moduleId()));
        repository.save(new QueryServiceEntity(
                command.id(), command.name(), command.moduleId(), null, List.of(), false));
    }

    private void removeQueryService(EditorCommand command) {
        var consumed = repository.findAllOfType(UseCaseEntity.class).stream()
                .anyMatch(uc -> uc.steps() != null && uc.steps().stream()
                        .anyMatch(st -> command.id().equals(st.queryServiceId())));
        if (consumed) {
            throw new IllegalArgumentException(
                    "El query service " + command.id() + " lo consumen casos de uso; quita esas llamadas primero");
        }
        repository.findAllOfType(RoleEntity.class).stream()
                .filter(r -> r.allowedQueryServiceIds().contains(command.id()))
                .forEach(r -> repository.save(new RoleEntity(r.id(), r.name(), r.allowedUseCaseIds(),
                        r.allowedQueryServiceIds().stream().filter(id -> !id.equals(command.id())).toList())));
        repository.deleteAllById(List.of(command.id()), QueryServiceEntity.class);
    }

    /** Use case → query service: a CallQueryService step (works across bounded contexts). */
    private void addQueryCall(EditorCommand command) {
        var source = repository.findById(command.sourceId(), UseCaseEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown use case: " + command.sourceId()));
        var target = repository.findById(command.targetId(), QueryServiceEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown query service: " + command.targetId()));
        var steps = new ArrayList<>(source.steps() == null ? List.of() : source.steps());
        var alreadyThere = steps.stream().anyMatch(st -> target.id().equals(st.queryServiceId()));
        if (alreadyThere) return;
        steps.add(new UseCaseStepEntity("step-query-" + target.id(), "query" + capitalize(target.name()),
                io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallQueryService,
                null, null, null, null, null, null, null, target.id(), null, null, null));
        repository.save(withSteps(source, steps));
    }

    private void removeQueryCall(EditorCommand command) {
        repository.findById(command.sourceId(), UseCaseEntity.class).ifPresent(uc ->
                repository.save(withSteps(uc, (uc.steps() == null ? List.<UseCaseStepEntity>of() : uc.steps()).stream()
                        .filter(st -> !command.targetId().equals(st.queryServiceId()))
                        .toList())));
    }

    /** An actor uses a use case or query service directly — the seed of a derived UI. */
    private void addActorUse(EditorCommand command) {
        var role = repository.findById(command.sourceId(), RoleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown actor: " + command.sourceId()));
        if (repository.findById(command.targetId(), UseCaseEntity.class).isPresent()) {
            if (role.allowedUseCaseIds().contains(command.targetId())) return;
            var ids = new ArrayList<>(role.allowedUseCaseIds());
            ids.add(command.targetId());
            repository.save(new RoleEntity(role.id(), role.name(), ids, role.allowedQueryServiceIds()));
            return;
        }
        if (repository.findById(command.targetId(), QueryServiceEntity.class).isPresent()) {
            if (role.allowedQueryServiceIds().contains(command.targetId())) return;
            var ids = new ArrayList<>(role.allowedQueryServiceIds());
            ids.add(command.targetId());
            repository.save(new RoleEntity(role.id(), role.name(), role.allowedUseCaseIds(), ids));
            return;
        }
        throw new IllegalArgumentException(
                "Un actor solo usa casos de uso o query services; destino desconocido: " + command.targetId());
    }

    private void removeActorUse(EditorCommand command) {
        repository.findById(command.sourceId(), RoleEntity.class).ifPresent(r ->
                repository.save(new RoleEntity(r.id(), r.name(),
                        r.allowedUseCaseIds().stream().filter(id -> !id.equals(command.targetId())).toList(),
                        r.allowedQueryServiceIds().stream().filter(id -> !id.equals(command.targetId())).toList())));
    }

    /**
     * An actor manages an aggregate through a CRUD UI: stub create/update/delete use
     * cases appear in the aggregate's module (with steps anchored to the aggregate) and
     * the actor is allowed on all three. The UI itself derives at generation time.
     */
    private void addActorCrud(EditorCommand command) {
        var role = repository.findById(command.sourceId(), RoleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown actor: " + command.sourceId()));
        var aggregate = repository.findById(command.targetId(), AggregateEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown aggregate: " + command.targetId()));
        var module = repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(aggregate.id()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "El agregado " + aggregate.id() + " no pertenece a ningún módulo"));
        var useCaseIds = new ArrayList<>(module.useCaseIds() == null ? List.of() : module.useCaseIds());
        var allowed = new ArrayList<>(role.allowedUseCaseIds());
        for (var uc : crudUseCases(aggregate)) {
            if (repository.findById(uc.id(), UseCaseEntity.class).isEmpty()) {
                repository.save(uc);
            }
            if (!useCaseIds.contains(uc.id())) useCaseIds.add(uc.id());
            if (!allowed.contains(uc.id())) allowed.add(uc.id());
        }
        repository.save(module.toBuilder().useCaseIds(useCaseIds).build());
        repository.save(new RoleEntity(role.id(), role.name(), allowed, role.allowedQueryServiceIds()));
    }

    private void removeActorCrud(EditorCommand command) {
        var aggregate = repository.findById(command.targetId(), AggregateEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown aggregate: " + command.targetId()));
        var crudIds = crudUseCases(aggregate).stream().map(UseCaseEntity::id).toList();
        repository.findById(command.sourceId(), RoleEntity.class).ifPresent(r ->
                repository.save(new RoleEntity(r.id(), r.name(),
                        r.allowedUseCaseIds().stream().filter(id -> !crudIds.contains(id)).toList(),
                        r.allowedQueryServiceIds())));
        // The stub use cases leave too, unless something else references them by now.
        var referenced = repository.findAllOfType(UseCaseEntity.class).stream()
                .filter(uc -> uc.steps() != null)
                .flatMap(uc -> uc.steps().stream())
                .map(UseCaseStepEntity::useCaseId)
                .filter(Objects::nonNull)
                .collect(java.util.stream.Collectors.toSet());
        var otherActors = repository.findAllOfType(RoleEntity.class).stream()
                .filter(r -> !r.id().equals(command.sourceId()))
                .flatMap(r -> r.allowedUseCaseIds().stream())
                .collect(java.util.stream.Collectors.toSet());
        var removable = crudIds.stream()
                .filter(id -> !referenced.contains(id) && !otherActors.contains(id))
                .toList();
        if (!removable.isEmpty()) {
            repository.findAllOfType(ModuleEntity.class).stream()
                    .filter(m -> m.useCaseIds() != null && m.useCaseIds().stream().anyMatch(removable::contains))
                    .forEach(m -> repository.save(m.toBuilder()
                            .useCaseIds(m.useCaseIds().stream().filter(id -> !removable.contains(id)).toList())
                            .build()));
            repository.deleteAllById(removable, UseCaseEntity.class);
        }
    }

    /** The three stub CRUD use cases for an aggregate, with steps anchored to it. */
    private static List<UseCaseEntity> crudUseCases(AggregateEntity aggregate) {
        var cap = capitalize(aggregate.name());
        return List.of(
                stubUseCase("uc-crear" + capitalize(aggregate.id()), "Crear" + cap, List.of(
                        new UseCaseStepEntity("step-save", "save" + cap,
                                io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.SaveAggregate,
                                aggregate.id(), null, null, null, null, null, null, null, null, null, null))),
                stubUseCase("uc-actualizar" + capitalize(aggregate.id()), "Actualizar" + cap, List.of(
                        new UseCaseStepEntity("step-read", "read" + cap,
                                io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.ReadAggregate,
                                aggregate.id(), null, null, null, null, null, null, null, null, null, null),
                        new UseCaseStepEntity("step-save", "save" + cap,
                                io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.SaveAggregate,
                                aggregate.id(), null, null, null, null, null, null, null, null, null, null))),
                stubUseCase("uc-eliminar" + capitalize(aggregate.id()), "Eliminar" + cap, List.of(
                        new UseCaseStepEntity("step-delete", "delete" + cap,
                                io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.Custom,
                                aggregate.id(), null, null, null, null, null, null, null, null,
                                "Elimina el agregado " + cap, null))));
    }

    /** A minimal, UI-exposed use case stub — fields get refined later through the CRUDs. */
    private static UseCaseEntity stubUseCase(String id, String name, List<UseCaseStepEntity> steps) {
        return new UseCaseEntity(id, name, false, false, false, false, true,
                null, null, steps, List.of(), List.of(), null, null, null, null,
                null, null, null, null, null, false, null, null, null, false, null,
                false, null, null, null, List.of());
    }

    private static String capitalize(String s) {
        return s == null || s.isEmpty() ? s : Character.toUpperCase(s.charAt(0)) + s.substring(1);
    }

    private void addDomainService(EditorCommand command) {
        if (repository.findById(command.id(), DomainServiceEntity.class).isPresent()) return;
        var module = repository.findById(command.moduleId(), ModuleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown module: " + command.moduleId()));
        repository.save(new DomainServiceEntity(command.id(), command.name(), null, List.of()));
        var domainServiceIds = new ArrayList<>(module.domainServiceIds());
        domainServiceIds.add(command.id());
        repository.save(module.toBuilder().domainServiceIds(domainServiceIds).build());
    }

    private void removeDomainService(EditorCommand command) {
        var triggersFlow = repository.findAllOfType(FlowEntity.class).stream()
                .anyMatch(f -> command.id().equals(f.triggerDomainServiceId()));
        if (triggersFlow) {
            throw new IllegalArgumentException(
                    "El servicio de dominio " + command.id() + " dispara flows; bórralos primero");
        }
        repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.domainServiceIds().contains(command.id()))
                .forEach(m -> repository.save(m.toBuilder()
                        .domainServiceIds(m.domainServiceIds().stream()
                                .filter(id -> !id.equals(command.id())).toList())
                        .build()));
        repository.deleteAllById(List.of(command.id()), DomainServiceEntity.class);
    }

    /** Record copy with only emits replaced. */
    private static OperationEntity withEmits(OperationEntity op, String emits) {
        return new OperationEntity(op.id(), op.name(), op.inputModelId(), op.outputModelId(),
                op.preconditions(), op.sets(), emits == null || emits.isBlank() ? null : emits,
                op.type(), op.paginated(), op.defaultPageSize(), op.intent());
    }

    /** Record copy with only operations replaced — every other field preserved verbatim. */
    private static AggregateEntity withOperations(AggregateEntity a, List<OperationEntity> operations) {
        return new AggregateEntity(
                a.id(), a.name(), a.modelId(), a.persistenceType(), a.idType(),
                a.tableName(), a.tableSchema(), a.optimisticLockingEnabled(),
                a.eventSourcingEnabled(), a.snapshotFrequency(), operations,
                a.invariants(), a.valueObjectIds(), a.lifecycle(), a.audited(), a.decisionIds());
    }

    /** Record copy with only steps replaced — every other field preserved verbatim. */
    private static UseCaseEntity withSteps(UseCaseEntity uc, List<UseCaseStepEntity> steps) {
        return new UseCaseEntity(
                uc.id(), uc.name(), uc.exposedAsRest(), uc.exposedAsGrpc(), uc.exposedAsMcp(),
                uc.exposedAsAsync(), uc.exposedAsUi(), uc.inputModelId(), uc.outputModelId(), steps,
                uc.allowedRoles(), uc.allowedScopes(), uc.apiVersion(), uc.mcpDescription(),
                uc.restHttpMethod(), uc.restPath(), uc.asyncRetryCount(), uc.asyncDeadLetterQueue(),
                uc.asyncOrderingKey(), uc.asyncTopicName(), uc.asyncConsumerGroup(), uc.cacheable(),
                uc.cacheTtlSeconds(), uc.timeoutMs(), uc.transactionBoundary(), uc.idempotencyEnabled(),
                uc.idempotencyKeyField(), uc.rateLimitEnabled(), uc.rateLimitRequestsPerSecond(),
                uc.grpcServiceName(), uc.grpcMethodName(), uc.decisionIds());
    }

    /**
     * A read model born from an aggregate: it lives in the aggregate's module and its
     * shape starts as the aggregate's state model (refinable later through the CRUDs).
     */
    private void addReadModel(EditorCommand command) {
        if (repository.findById(command.id(), ReadModelEntity.class).isPresent()) return;
        var aggregate = repository.findById(command.aggregateId(), AggregateEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown aggregate: " + command.aggregateId()));
        var module = repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(aggregate.id()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "El agregado " + aggregate.id() + " no pertenece a ningún módulo"));
        repository.save(new ReadModelEntity(command.id(), command.name(), module.id(),
                null, aggregate.modelId(), null, null, aggregate.id()));
        var readModelIds = new ArrayList<>(
                module.readModelIds() == null ? List.of() : module.readModelIds());
        readModelIds.add(command.id());
        repository.save(module.toBuilder().readModelIds(readModelIds).build());
    }

    private void removeReadModel(EditorCommand command) {
        var feedingProjection = repository.findAllOfType(ProjectionEntity.class).stream()
                .anyMatch(p -> command.id().equals(p.readModelId()));
        if (feedingProjection) {
            throw new IllegalArgumentException(
                    "El read model " + command.id() + " tiene proyecciones; bórralas primero");
        }
        var name = repository.findById(command.id(), ReadModelEntity.class)
                .map(ReadModelEntity::name).orElse(null);
        var materializedByFlow = name != null && repository.findAllOfType(FlowEntity.class).stream()
                .anyMatch(f -> name.equals(f.readModelName()));
        if (materializedByFlow) {
            throw new IllegalArgumentException(
                    "El read model " + name + " lo materializa un flow; borra el flow primero");
        }
        repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.readModelIds() != null && m.readModelIds().contains(command.id()))
                .forEach(m -> repository.save(m.toBuilder()
                        .readModelIds(m.readModelIds().stream()
                                .filter(id -> !id.equals(command.id())).toList())
                        .build()));
        repository.deleteAllById(List.of(command.id()), ReadModelEntity.class);
    }

    private void removeDomainEvent(EditorCommand command) {
        repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.domainEventIds() != null && m.domainEventIds().contains(command.id()))
                .forEach(m -> repository.save(m.toBuilder()
                        .domainEventIds(m.domainEventIds().stream()
                                .filter(id -> !id.equals(command.id())).toList())
                        .build()));
        repository.deleteAllById(List.of(command.id()), DomainEventEntity.class);
    }

    /** Record copy with only aggregateIds replaced — every other field preserved verbatim. */
    private static ModuleEntity withAggregateIds(ModuleEntity m, List<String> aggregateIds) {
        return m.toBuilder().aggregateIds(aggregateIds).build();
    }

    private void addRelation(EditorCommand command) {
        var project = owningProject();
        var alreadyThere = project.contextMap().stream()
                .anyMatch(r -> r.sourceModuleId().equals(command.sourceId())
                        && r.targetModuleId().equals(command.targetId()));
        if (alreadyThere) return;
        var relations = new ArrayList<>(project.contextMap());
        relations.add(new ContextMapRelationEntity(
                "rel-" + command.sourceId() + "-" + command.targetId(),
                null,
                command.sourceId(),
                command.targetId(),
                command.type(),
                null,
                List.of()));
        repository.save(withContextMap(project, relations));
    }

    private void removeRelation(EditorCommand command) {
        var project = owningProject();
        var relations = project.contextMap().stream()
                .filter(r -> !(r.sourceModuleId().equals(command.sourceId())
                        && r.targetModuleId().equals(command.targetId())))
                .toList();
        repository.save(withContextMap(project, relations));
    }

    private void setRelationType(EditorCommand command) {
        var project = owningProject();
        var relations = project.contextMap().stream()
                .map(r -> (r.sourceModuleId().equals(command.sourceId())
                        && r.targetModuleId().equals(command.targetId()))
                        ? new ContextMapRelationEntity(r.id(), r.name(), r.sourceModuleId(),
                                r.targetModuleId(), command.type(), r.description(), r.decisionIds())
                        : r)
                .toList();
        repository.save(withContextMap(project, relations));
    }

    private void addExternalSystem(EditorCommand command) {
        var project = owningProject();
        if (project.externalSystems().stream().anyMatch(x -> x.id().equals(command.id()))) return;
        var externalSystems = new ArrayList<>(project.externalSystems());
        externalSystems.add(new ExternalSystemEntity(
                command.id(), command.name(), null, null, null, null, null, List.of()));
        repository.save(withExternalSystems(project, externalSystems));
    }

    private void removeExternalSystem(EditorCommand command) {
        var notifiedByFlow = repository.findAllOfType(FlowEntity.class).stream()
                .anyMatch(f -> command.id().equals(f.targetModuleId()));
        if (notifiedByFlow) {
            throw new IllegalArgumentException(
                    "El sistema externo " + command.id() + " es destino de flows; bórralos primero");
        }
        var project = owningProject();
        repository.save(withExternalSystems(project, project.externalSystems().stream()
                .filter(x -> !x.id().equals(command.id())).toList()));
    }

    private void addActor(EditorCommand command) {
        if (repository.findById(command.id(), RoleEntity.class).isPresent()) return;
        repository.save(new RoleEntity(command.id(), command.name(), List.of()));
    }

    private void removeActor(EditorCommand command) {
        var usedInProcesses = repository.findAllOfType(ProcessEntity.class).stream()
                .flatMap(pr -> pr.steps().stream())
                .anyMatch(st -> command.id().equals(st.roleId()) || command.id().equals(st.escalationRoleId()));
        if (usedInProcesses) {
            throw new IllegalArgumentException(
                    "El actor " + command.id() + " participa en procesos; desasígnalo primero");
        }
        var allowedInUseCases = repository.findAllOfType(UseCaseEntity.class).stream()
                .anyMatch(uc -> uc.allowedRoles() != null && uc.allowedRoles().contains(command.id()));
        if (allowedInUseCases) {
            throw new IllegalArgumentException(
                    "El actor " + command.id() + " está permitido en casos de uso; desasígnalo primero");
        }
        repository.deleteAllById(List.of(command.id()), RoleEntity.class);
    }

    /** Record copy with only externalSystems replaced — every other field preserved verbatim. */
    private static ProjectEntity withExternalSystems(
            ProjectEntity p, List<ExternalSystemEntity> externalSystems) {
        return new ProjectEntity(
                p.id(), p.name(), p.outputPath(), p.packageName(), p.gitRepository(), p.database(),
                p.dbMigrationTool(), p.terraformProvider(), p.terraformProviderVersion(),
                p.terraformBackendType(), p.iamProvider(), p.messageBrokerType(), p.tracingProvider(),
                p.metricsProvider(), p.loggingProvider(), p.llmProvider(), p.cacheProvider(),
                p.fileStorageProvider(), p.emailProvider(), p.secretsProvider(), p.cicdProvider(),
                p.environments(), p.serviceIds(), p.contextMap(), p.tenancyStrategy(),
                externalSystems, p.objective());
    }

    private ProjectEntity owningProject() {
        return repository.findAllOfType(ProjectEntity.class).stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("No project in the model store"));
    }

    /** Record copy with only contextMap replaced — every other field is preserved verbatim. */
    private static ProjectEntity withContextMap(
            ProjectEntity p, List<ContextMapRelationEntity> contextMap) {
        return new ProjectEntity(
                p.id(), p.name(), p.outputPath(), p.packageName(), p.gitRepository(), p.database(),
                p.dbMigrationTool(), p.terraformProvider(), p.terraformProviderVersion(),
                p.terraformBackendType(), p.iamProvider(), p.messageBrokerType(), p.tracingProvider(),
                p.metricsProvider(), p.loggingProvider(), p.llmProvider(), p.cacheProvider(),
                p.fileStorageProvider(), p.emailProvider(), p.secretsProvider(), p.cicdProvider(),
                p.environments(), p.serviceIds(), contextMap, p.tenancyStrategy(),
                p.externalSystems(), p.objective());
    }

    // ---- layout (diagram geometry, stored in the model store as diagrams) --

    /**
     * The editor speaks its own JSON layout shape (view key → {nodes, edges, sizes, detail});
     * here it is translated to/from {@link DiagramEntity} rows so the geometry lives in the
     * schema-validated store next to the elements it references. Models saved before this
     * existed kept the layout in a modux-editor-layout.json file next to the store; reads fall
     * back to it until the first save migrates the layout into the store.
     */
    @GetMapping(value = "/layout", produces = MediaType.APPLICATION_JSON_VALUE)
    public String layout() throws IOException {
        var diagrams = repository.findAllOfType(DiagramEntity.class);
        if (diagrams.isEmpty()) {
            var file = legacyLayoutFile();
            return Files.exists(file) ? Files.readString(file) : "{}";
        }
        var mapper = new com.fasterxml.jackson.databind.ObjectMapper();
        var root = mapper.createObjectNode();
        for (var diagram : diagrams) {
            var view = root.putObject(diagram.id());
            if (diagram.detail() != null) view.put("detail", diagram.detail());
            var nodes = view.putObject("nodes");
            var sizes = view.putObject("sizes");
            for (var node : diagram.nodes()) {
                var pos = nodes.putObject(node.ref());
                pos.put("x", node.x());
                pos.put("y", node.y());
                if (node.w() != null && node.h() != null) {
                    var size = sizes.putObject(node.ref());
                    size.put("w", node.w());
                    size.put("h", node.h());
                }
            }
            var edges = view.putObject("edges");
            for (var edge : diagram.edges()) {
                var points = edges.putArray(edge.ref());
                for (var point : edge.points()) {
                    var p = points.addObject();
                    p.put("x", point.x());
                    p.put("y", point.y());
                }
            }
        }
        return mapper.writeValueAsString(root);
    }

    /** POST is accepted too: the editor flushes pending edits on page-hide via sendBeacon. */
    @RequestMapping(value = "/layout",
            method = {org.springframework.web.bind.annotation.RequestMethod.PUT,
                      org.springframework.web.bind.annotation.RequestMethod.POST},
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public void saveLayout(@RequestBody String layout) throws IOException {
        var root = new com.fasterxml.jackson.databind.ObjectMapper().readTree(layout);
        var kept = new ArrayList<String>();
        root.properties().forEach(entry -> {
            var diagram = toDiagram(entry.getKey(), entry.getValue());
            if (diagram.nodes().isEmpty() && diagram.edges().isEmpty() && diagram.detail() == null) return;
            repository.save(diagram);
            kept.add(diagram.id());
        });
        var gone = repository.findAllOfType(DiagramEntity.class).stream()
                .map(DiagramEntity::id).filter(id -> !kept.contains(id)).toList();
        if (!gone.isEmpty()) repository.deleteAllById(gone, DiagramEntity.class);
    }

    /** One editor view layout ({nodes, edges, sizes, detail} — or a legacy flat node map) → entity. */
    private DiagramEntity toDiagram(String id, com.fasterxml.jackson.databind.JsonNode view) {
        var v2 = view.get("nodes") != null && view.get("nodes").isObject();
        var nodeMap = v2 ? view.get("nodes") : view; // legacy persisted layouts are a flat node map
        var sizeMap = v2 && view.get("sizes") != null && view.get("sizes").isObject()
                ? view.get("sizes") : null;
        var nodes = new ArrayList<DiagramNodeEntity>();
        nodeMap.properties().forEach(entry -> {
            var pos = entry.getValue();
            if (!pos.isObject() || !pos.has("x") || !pos.has("y")) return;
            var size = sizeMap != null ? sizeMap.get(entry.getKey()) : null;
            nodes.add(new DiagramNodeEntity(entry.getKey(),
                    round1(pos.get("x").asDouble()), round1(pos.get("y").asDouble()),
                    size != null && size.has("w") ? round1(size.get("w").asDouble()) : null,
                    size != null && size.has("h") ? round1(size.get("h").asDouble()) : null));
        });
        var edges = new ArrayList<DiagramEdgeEntity>();
        if (v2 && view.get("edges") != null && view.get("edges").isObject()) {
            view.get("edges").properties().forEach(entry -> {
                if (!entry.getValue().isArray()) return;
                var points = new ArrayList<DiagramPointEntity>();
                entry.getValue().forEach(p -> {
                    if (p.has("x") && p.has("y")) {
                        points.add(new DiagramPointEntity(round1(p.get("x").asDouble()), round1(p.get("y").asDouble())));
                    }
                });
                if (!points.isEmpty()) edges.add(new DiagramEdgeEntity(entry.getKey(), points));
            });
        }
        var detail = view.get("detail") != null && view.get("detail").isTextual()
                ? view.get("detail").asText() : null;
        return new DiagramEntity(id, detail, nodes, edges);
    }

    /** Emissions declared by an emitter's operations (CSV of event names in emits). */
    private static void collectEmissions(String emitterId, List<OperationEntity> operations,
                                         Map<String, String> eventIdByName, List<EmissionDto> out) {
        for (var op : operations) {
            if (op.emits() == null || op.emits().isBlank()) continue;
            for (var eventName : op.emits().split(",")) {
                var eventId = eventIdByName.get(eventName.trim().toLowerCase());
                if (eventId != null) out.add(new EmissionDto(emitterId, eventId));
            }
        }
    }

    /** Coordinates are kept to one decimal — plenty for pixels, and keeps the YAML readable. */
    private static double round1(double value) {
        return Math.round(value * 10) / 10.0;
    }

    private Path legacyLayoutFile() {
        var store = repository.storePath();
        var dir = Files.isDirectory(store) ? store : store.getParent();
        return dir.resolve("modux-editor-layout.json");
    }
}
