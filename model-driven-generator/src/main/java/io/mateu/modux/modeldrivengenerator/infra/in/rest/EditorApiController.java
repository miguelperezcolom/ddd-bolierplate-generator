package io.mateu.modux.modeldrivengenerator.infra.in.rest;

import io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence.FlowContextMapCoherenceService;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.SubdomainType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ContextMapRelationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramEdgeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramNodeEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DiagramPointEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EntityEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
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
                            List<UseCaseDto> useCases, List<DomainEventDto> domainEvents) {}
    public record DomainEventDto(String id, String name) {}
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

    public record EditorModelDto(
            List<ModuleDto> modules,
            List<ExternalSystemDto> externalSystems,
            List<RelationDto> relations,
            List<FlowDto> flows,
            List<AggregateDto> aggregates,
            List<EntityDto> entities,
            List<AggregateReferenceDto> aggregateReferences,
            List<ProcessDto> processes,
            List<ViewDto> views) {}

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

        return new EditorModelDto(
                modules, externalSystems, relations, flows, aggregates, entities, references, processes,
                views);
    }

    // ---- commands ---------------------------------------------------------

    public record EditorCommand(String kind, String sourceId, String targetId, String type,
                                String id, String name, String subdomainType, String moduleId,
                                String archetype, String triggerAggregateId, String triggerEvent,
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
            case "add-aggregate" -> addAggregate(command);
            case "add-domain-event" -> addDomainEvent(command);
            case "remove-module" -> removeModule(command);
            case "remove-aggregate" -> removeAggregate(command);
            case "remove-domain-event" -> removeDomainEvent(command);
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
                List.of(), List.of(), List.of()));
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
                    .ifPresent(m -> repository.save(new ModuleEntity(
                            m.id(), command.name(), m.gitRepository(), m.aggregateIds(), m.entityIds(),
                            m.valueObjectIds(), m.useCaseIds(), m.domainEventIds(), m.projectionIds(),
                            m.readModelIds(), m.subscriptionIds(), m.sagaIds(), m.scheduledTriggerIds(),
                            m.bddScenarios(), m.llmSystemPrompt(), m.tableNamePrefix(),
                            m.autoTableNamePrefix(), m.version(), m.bffs(), m.acls(), m.domainPolicies(),
                            m.invariants(), m.subdomainType(), m.accessPolicies(), m.kpis(),
                            m.decisionIds(), m.description(), m.readSideModuleId(),
                            m.readSideExternalSystemId(), m.readSideVia())));
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
        return new ModuleEntity(
                m.id(), m.name(), m.gitRepository(), aggregateIds, m.entityIds(), m.valueObjectIds(),
                m.useCaseIds(), m.domainEventIds(), m.projectionIds(), m.readModelIds(),
                m.subscriptionIds(), m.sagaIds(), m.scheduledTriggerIds(), m.bddScenarios(),
                m.llmSystemPrompt(), m.tableNamePrefix(), m.autoTableNamePrefix(), m.version(),
                m.bffs(), m.acls(), m.domainPolicies(), m.invariants(), m.subdomainType(),
                m.accessPolicies(), m.kpis(), m.decisionIds(), m.description(),
                m.readSideModuleId(), m.readSideExternalSystemId(), m.readSideVia());
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
