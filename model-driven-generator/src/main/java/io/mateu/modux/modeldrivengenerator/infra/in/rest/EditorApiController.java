package io.mateu.modux.modeldrivengenerator.infra.in.rest;

import io.mateu.modux.modeldrivengenerator.application.usecases.flow.coherence.FlowContextMapCoherenceService;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.vo.FlowArchetype;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.module.vo.SubdomainType;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.process.vo.ProcessStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessStepEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AclEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AiAgentEntity;
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
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.OperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ScheduledTriggerEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageButtonEntity;
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

    private final ModelStore repository;
    private final FlowContextMapCoherenceService coherenceService;
    private final io.mateu.modux.modeldrivengenerator.application.out.ProjectStorePort projectStore;
    private final io.mateu.modux.modeldrivengenerator.application.usecases.project.importapi.ImportApiEntityUseCase importApiEntityUseCase;

    // ---- projection -------------------------------------------------------

    public record ModuleDto(String id, String name, String subdomainType, String serviceId,
                            List<UseCaseDto> useCases, List<DomainEventDto> domainEvents,
                            List<ReadModelDto> readModels, List<DomainServiceDto> domainServices,
                            List<ApplicationEventDto> applicationEvents,
                            List<QueryServiceDto> queryServices,
                            List<ScheduledTriggerDto> scheduledTriggers) {}

    public record ScheduledTriggerDto(String id, String name, String cronExpression, String useCaseId) {}
    public record DomainServiceDto(String id, String name) {}
    public record ApplicationEventDto(String id, String name) {}
    public record DomainEventDto(String id, String name) {}
    public record ReadModelDto(String id, String name, String aggregateId) {}
    /** Who emits a domain event: an aggregate, through its operations' `emits`. */
    public record EmissionDto(String sourceId, String domainEventId) {}
    public record ExternalSystemDto(String id, String name, List<ExternalUseCaseDto> useCases,
                                    List<ExternalTableDto> tables,
                                    List<McpServerDto> mcpServers) {}
    /** A table/dataset owned by an external system — pollable into a read model. */
    public record ExternalTableDto(String id, String name) {}
    /** An MCP server published by an external system — a tool surface for AI agents. */
    public record McpServerDto(String id, String name, String uri) {}
    public record ExternalUseCaseDto(String id, String name) {}
    /** An external system calls one of our use cases in through an INBOUND ACL. */
    public record ExternalCallDto(String externalSystemId, String useCaseId) {}
    /** One of our use cases calls a use case OFFERED by an external system. */
    public record ExternalUseCaseCallDto(String sourceId, String targetId) {}
    /**
     * A strategic relation, 100% COMPUTED from the concrete cross-context dependencies
     * (use case calls, query calls, flows, aggregate references). The stored contextMap
     * entries only ANNOTATE the strategic type; `declared` says whether the pair has one.
     */
    public record RelationDto(String sourceId, String targetId, String type,
                              boolean declared, String reasons) {}
    public record FlowDto(String id, String name, String sourceId, String targetId, String archetype,
                          String triggerAggregateId, String triggerEvent, String targetUseCaseId,
                          String readModelName) {}
    public record UseCaseDto(String id, String name, boolean policy, List<String> stepIds) {}
    public record AggregateDto(String id, String name, String moduleId) {}
    public record EntityDto(String id, String name, String aggregateId) {}
    public record AggregateReferenceDto(String sourceAggregateId, String targetAggregateId, String label) {}
    public record ProcessStepDto(String id, String name, String type, String useCaseId, String roleId,
                                 String deadline, String compensationUseCaseId) {}
    public record ProcessDto(String id, String name, String triggerAggregateId, String triggerEvent,
                             String ownerModuleId, String onCompletionEventName, String sla,
                             List<ProcessStepDto> steps) {}
    public record WorkflowStepDto(String id, String name, String emittedEventName,
                                  String targetUseCaseId, String completionEventName,
                                  List<String> dependsOnStepIds) {}
    /** A cross-context orchestrator living OUTSIDE the bounded contexts (no owner module). */
    public record WorkflowDto(String id, String name, String triggerAggregateId,
                              String triggerDomainServiceId, String triggerUseCaseId,
                              String triggerEvent, String onCompletionEventName,
                              List<WorkflowStepDto> steps) {}
    /** A use case acts on an aggregate (CallAggregateOperation / SaveAggregate step). */
    public record AggregateCallDto(String sourceId, String targetId) {}
    public record SubscriptionActionDto(String type, String useCaseId, String sagaId,
                                        String projectionId) {}
    public record SubscriptionDto(String id, String name, String eventName, String consumerGroup,
                                  List<SubscriptionActionDto> actions) {}
    public record ProjectionDto(String id, String name, String readModelId, String readModelName,
                                List<String> handledEventIds, String sourceAggregateId,
                                String moduleId, String sourceExternalUseCaseId,
                                String sourceExternalTableId) {}
    public record ViewDto(String id, String name, String kind, List<String> memberIds) {}
    /** A business actor (RoleEntity) shown on the context map. */
    public record ActorDto(String id, String name) {}
    /** An AI agent; external = someone else's agent, entering through MCP gateways. */
    public record AiAgentDto(String id, String name, boolean external) {}
    public record AgentUseDto(String agentId, String useCaseId) {}
    /** An AI agent calls an operation offered by an external system. */
    public record AgentExternalUseDto(String agentId, String externalUseCaseId) {}
    /** An AI agent consumes an MCP server published by an external system. */
    public record AgentMcpUseDto(String agentId, String mcpServerId) {}
    /** Our MCP gateway: aggregates MCPs and exposes APIs/operations/use cases/RAGs as MCP. */
    public record McpGatewayDto(String id, String name, List<String> mcpServerIds,
                                List<String> apiIds, List<String> apiOperationIds,
                                List<String> useCaseIds, List<String> ragIds) {}
    /** An AI agent consumes an MCP gateway (one curated tool surface). */
    public record AgentGatewayUseDto(String agentId, String gatewayId) {}
    /** An AI agent calls an API operation as a tool. */
    public record AgentApiOpUseDto(String agentId, String apiOperationId) {}
    /** An agent may call a whole API — or an API proxy — as a tool (every operation). */
    public record AgentApiUseDto(String agentId, String apiId) {}
    /** An AI agent consults a query service as a read tool. */
    public record AgentQueryUseDto(String agentId, String queryServiceId) {}
    /** An AI agent delegates work to another agent. */
    public record AgentDelegationDto(String agentId, String delegateAgentId) {}
    /** An actor talks to an AI agent (a chat/supervision UI derives from it). */
    public record ActorAgentUseDto(String actorId, String agentId) {}
    /** A domain/application event triggers a run of the agent (reactive agents). */
    public record AgentTriggerDto(String eventId, String agentId) {}
    /** A RAG knowledge base, optionally fed from read models and external content. */
    public record RagDto(String id, String name, String description,
                         List<String> sourceReadModelIds,
                         List<RagContentSourceDto> contentSources,
                         List<String> sourceExternalTableIds,
                         List<String> sourceApiIds,
                         List<String> sourceExternalSystemIds,
                         List<String> sourceModuleIds) {}
    public record RagContentSourceDto(String type, String uri) {}
    /** A published API as a first-class element; operations wire to their implementers. */
    public record ApiDto(String id, String name, List<ApiOperationDto> operations,
                         String publishedByExternalSystemId) {}
    public record ApiOperationDto(String id, String name, String httpMethod, String path,
                                  String targetModuleId, String targetUseCaseId) {}
    /** An AI agent grounds its answers on a knowledge base. */
    public record AgentRagDto(String agentId, String ragId) {}
    /** Use case A invokes use case B (a CallUseCase step in A). */
    public record UseCaseCallDto(String sourceId, String targetId) {}
    public record QueryServiceDto(String id, String name, List<QueryOperationDto> operations) {}
    public record QueryOperationDto(String id, String name) {}
    /** Use case A consumes query service B (a CallQueryService step in A). */
    public record QueryCallDto(String sourceId, String targetId) {}
    /** An actor uses a use case or a query service directly (a UI is derived from it). */
    public record ActorUseDto(String actorId, String targetId) {}
    /** An actor depends on an external system (strategic context-map dependency). */
    public record ActorExternalDependencyDto(String actorId, String externalSystemId) {}
    /** An external system depends on another system, a published API or an API proxy.
     * Between systems the relation may be typed: DEPENDS (plain) or CQRS. */
    public record ExternalSystemDependencyDto(String sourceId, String targetId, String type) {}
    /** An API proxy/cache: fronts a published API, consumable exactly like it. */
    public record ProxyApiDto(String id, String name, String targetApiId,
                              String publishedByExternalSystemId) {}
    /** The SAME published API, (also) implemented in one of our bounded contexts. */
    public record ApiImplementationDto(String apiId, String moduleId) {}
    /** One proxy operation routed to an implementation site of the fronted API. */
    public record ProxyOperationRouteDto(String proxyId, String operationId, String targetSiteId) {}
    /** An external system calls one API operation at a site (published API, proxy or implementation). */
    public record ExternalOperationUseDto(String externalSystemId, String operationId, String siteId) {}
    /** The use case implementing one operation at one implementation site. */
    public record ApiOperationImplementationDto(String apiId, String operationId, String moduleId, String useCaseId) {}
    /** A UI app (UiAdapterEntity): the shell an actor opens; its menu tree points at pages. */
    public record UiAppDto(String id, String name, String title, List<UiMenuEntryDto> menuItems,
                           String type, String headerPageId, String homePageId, String homeAppId) {}
    /** One entry of a UI app's menu tree — Mateu menus are trees, hence the recursion. */
    public record UiMenuEntryDto(String label, String icon, String pageId, List<UiMenuEntryDto> children, String id, String uiAdapterId, String useCaseId,
                                  String aggregateId, String queryServiceId, String queryOperationId) {}
    /** A page of the UI map; buttons = toolbar + bottomBar, each firing a use case. */
    public record UiPageDto(String id, String name, String type, String route, String modelId,
                            String modelName, String aggregateId, String listingQueryServiceId,
                            List<UiPageButtonDto> buttons,
                            List<UiFieldDto> viewmodelFields,
                            List<UiComponentNodeDto> content,
                            List<UiWizardStepDto> wizardSteps) {}

    public record UiWizardStepDto(String pageId, String label) {}
    /** A node of a page's content tree: a Mateu layout (with children) or a leaf component. */
    public record UiComponentNodeDto(String id, String kind, String title, String text, String label,
                                     String useCaseId, String mappingId, String modelId,
                                     String queryServiceId, String queryOperationId,
                                     String fieldId, String stereotype, Integer colspan,
                                     List<UiComponentNodeDto> children) {}
    /** A viewmodel field as the page designer sees it: model field + its PageFieldConfig. */
    public record UiFieldDto(String fieldId, String name, String type, String stereotype,
                             Integer colspan, String label, String help) {}
    public record UiPageButtonDto(String label, String useCaseId, String mappingId) {}
    /** An actor uses a UI app (RoleEntity.uiAdapterIds — the actor→app link of the UI map). */
    public record ActorAppUseDto(String actorId, String appId) {}
    /** A bare id+name reference (models, mappings…) for the designer's pickers. */
    public record NamedRefDto(String id, String name) {}

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
            List<ActorUseDto> actorUses,
            List<ExternalCallDto> externalCalls,
            List<ExternalUseCaseCallDto> externalUseCaseCalls,
            List<AiAgentDto> aiAgents,
            List<AgentUseDto> agentUses,
            List<WorkflowDto> workflows,
            List<AggregateCallDto> aggregateCalls,
            List<EmissionDto> useCaseEmissions,
            List<SubscriptionDto> subscriptions,
            List<ProjectionDto> projections,
            List<AgentExternalUseDto> agentExternalUses,
            List<RagDto> rags,
            List<AgentRagDto> agentRags,
            List<ApiDto> apis,
            List<ActorExternalDependencyDto> actorExternalDependencies,
            List<ExternalSystemDependencyDto> externalSystemDependencies,
            List<ProxyApiDto> proxyApis,
            List<AgentMcpUseDto> agentMcpUses,
            List<McpGatewayDto> mcpGateways,
            List<AgentGatewayUseDto> agentGatewayUses,
            List<AgentApiOpUseDto> agentApiOpUses,
            List<AgentApiUseDto> agentApiUses,
            List<AgentQueryUseDto> agentQueryUses,
            List<AgentDelegationDto> agentDelegations,
            List<ActorAgentUseDto> actorAgentUses,
            List<AgentTriggerDto> agentTriggers,
            List<ApiImplementationDto> apiImplementations,
            List<ProxyOperationRouteDto> proxyOperationRoutes,
            List<ExternalOperationUseDto> externalOperationUses,
            List<ApiOperationImplementationDto> apiOperationImplementations,
            List<UiAppDto> uiApps,
            List<UiPageDto> pages,
            List<ActorAppUseDto> actorAppUses,
            List<NamedRefDto> models,
            List<NamedRefDto> modelMappings) {}

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
        var scheduledTriggersById = repository.findAllOfType(ScheduledTriggerEntity.class).stream()
                .collect(Collectors.toMap(ScheduledTriggerEntity::id, t -> t, (a, b) -> a));
        // The editor works on the current project: its services' modules, plus any
        // module not wired to a service yet (legacy orphans stay visible).
        var currentProject = currentProject().orElse(null);
        var projectServiceIds = currentProject == null || currentProject.serviceIds() == null
                ? java.util.Set.<String>of() : java.util.Set.copyOf(currentProject.serviceIds());
        var wiredElsewhere = services.stream()
                .filter(s2 -> !projectServiceIds.contains(s2.id()))
                .flatMap(s2 -> s2.moduleIds() == null ? java.util.stream.Stream.<String>empty()
                        : s2.moduleIds().stream())
                .collect(java.util.stream.Collectors.toSet());
        var modules = repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> !wiredElsewhere.contains(m.id()))
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
                                .map(uc -> new UseCaseDto(uc.id(), uc.name(), uc.policy(),
                                        (uc.steps() == null ? List.<UseCaseStepEntity>of() : uc.steps()).stream()
                                                .map(UseCaseStepEntity::id).toList()))
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
                                .map(qs -> new QueryServiceDto(qs.id(), qs.name(),
                                        (qs.operations() == null ? List.<QueryOperationEntity>of() : qs.operations()).stream()
                                                .map(op -> new QueryOperationDto(op.id(), op.name()))
                                                .toList()))
                                .toList(),
                        (m.scheduledTriggerIds() == null ? List.<String>of() : m.scheduledTriggerIds()).stream()
                                .map(scheduledTriggersById::get)
                                .filter(Objects::nonNull)
                                .map(t -> new ScheduledTriggerDto(t.id(), t.name(), t.cronExpression(), t.useCaseId()))
                                .toList()))
                .toList();

        var projects = repository.findAllOfType(ProjectEntity.class);
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
                                .toList()))
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

        var workflows = repository.findAllOfType(WorkflowEntity.class).stream()
                .map(w -> new WorkflowDto(
                        w.id(), w.name(), w.triggerAggregateId(), w.triggerDomainServiceId(),
                        w.triggerUseCaseId(), w.triggerEvent(), w.onCompletionEventName(),
                        w.steps().stream()
                                .map(s -> new WorkflowStepDto(s.id(), s.name(), s.emittedEventName(),
                                        s.targetUseCaseId(), s.completionEventName(),
                                        s.dependsOnStepIds()))
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
        var aiAgents = repository.findAllOfType(AiAgentEntity.class).stream()
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
        for (var agent : repository.findAllOfType(AiAgentEntity.class)) {
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
        var mcpGateways = repository.findAllOfType(McpGatewayEntity.class).stream()
                .map(g -> new McpGatewayDto(g.id(), g.name(), g.mcpServerIds(), g.apiIds(),
                        g.apiOperationIds(), g.useCaseIds(), g.ragIds()))
                .toList();
        var actorAgentUses = new ArrayList<ActorAgentUseDto>();
        for (var role : repository.findAllOfType(RoleEntity.class)) {
            role.aiAgentIds().forEach(id -> actorAgentUses.add(new ActorAgentUseDto(role.id(), id)));
        }
        var rags = repository.findAllOfType(RagEntity.class).stream()
                .map(r -> new RagDto(r.id(), r.name(), r.description(), r.sourceReadModelIds(),
                        r.contentSources().stream()
                                .map(s -> new RagContentSourceDto(s.type(), s.uri()))
                                .toList(),
                        r.sourceExternalTableIds(), r.sourceApiIds(),
                        r.sourceExternalSystemIds(), r.sourceModuleIds()))
                .toList();
        var apis = repository.findAllOfType(ApiEntity.class).stream()
                .map(a -> new ApiDto(a.id(), a.name(), a.operations().stream()
                        .map(op -> new ApiOperationDto(op.id(), op.name(), op.httpMethod(),
                                op.path(), op.targetModuleId(), op.targetUseCaseId()))
                        .toList(),
                        a.publishedByExternalSystemId()))
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

        // The eventstorming chain: command → aggregate (write steps), command → domain
        // event (publish steps), plus the event → reaction wiring (subscriptions and
        // projections; flows/processes/workflows are already projected above).
        var aggregateCalls = new ArrayList<AggregateCallDto>();
        var useCaseEmissions = new ArrayList<EmissionDto>();
        for (var uc : repository.findAllOfType(UseCaseEntity.class)) {
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
        var subscriptions = repository.findAllOfType(SubscriptionEntity.class).stream()
                .map(s -> new SubscriptionDto(s.id(), s.name(), s.eventName(), s.consumerGroup(),
                        (s.actions() == null ? List.<SubscriptionActionDto>of() : s.actions().stream()
                                .map(a -> new SubscriptionActionDto(
                                        a.type() != null ? a.type().name() : null,
                                        a.useCaseId(), a.sagaId(), a.projectionId()))
                                .toList())))
                .toList();
        var projectionDtos = repository.findAllOfType(ProjectionEntity.class).stream()
                .map(p -> new ProjectionDto(p.id(), p.name(), p.readModelId(),
                        p.readModelId() == null ? null
                                : repository.findById(p.readModelId(), ReadModelEntity.class)
                                        .map(ReadModelEntity::name).orElse(p.readModelId()),
                        (p.handlers() == null ? List.<String>of() : p.handlers().stream()
                                .map(h -> h.domainEventId()).filter(Objects::nonNull).distinct().toList()),
                        p.sourceAggregateId(),
                        repository.findAllOfType(ModuleEntity.class).stream()
                                .filter(m -> m.projectionIds() != null
                                        && m.projectionIds().contains(p.id()))
                                .map(ModuleEntity::id).findFirst().orElse(null),
                        p.sourceExternalUseCaseId(), p.sourceExternalTableId()))
                .toList();

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
        var externalCalls = new ArrayList<ExternalCallDto>();
        for (var m : repository.findAllOfType(ModuleEntity.class)) {
            if (m.acls() == null) continue;
            for (var acl : m.acls()) {
                if (!"INBOUND".equalsIgnoreCase(acl.direction()) || acl.externalSystem() == null) continue;
                for (var ucId : acl.translatedUseCaseIds() == null ? List.<String>of() : acl.translatedUseCaseIds()) {
                    externalCalls.add(new ExternalCallDto(acl.externalSystem(), ucId));
                }
            }
        }
        var externalUseCaseCalls = new ArrayList<ExternalUseCaseCallDto>();
        for (var uc : repository.findAllOfType(UseCaseEntity.class)) {
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
        for (var role : repository.findAllOfType(RoleEntity.class)) {
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
        var proxyApis = repository.findAllOfType(ProxyApiEntity.class).stream()
                .map(px -> new ProxyApiDto(px.id(), px.name(), px.targetApiId(),
                        px.publishedByExternalSystemId()))
                .toList();
        var apiImplementations = repository.findAllOfType(ApiEntity.class).stream()
                .flatMap(a -> a.implementedByModuleIds().stream()
                        .map(mid -> new ApiImplementationDto(a.id(), mid)))
                .toList();
        var proxyOperationRoutes = repository.findAllOfType(ProxyApiEntity.class).stream()
                .flatMap(px -> px.operationRoutes().stream()
                        .map(r -> new ProxyOperationRouteDto(px.id(), r.operationId(), r.targetSiteId())))
                .toList();
        var externalOperationUses = java.util.stream.Stream.ofNullable(currentProject)
                .flatMap(pr -> pr.externalSystems().stream())
                .flatMap(x -> x.apiOperationUses().stream()
                        .map(u -> new ExternalOperationUseDto(x.id(), u.operationId(), u.siteId())))
                .toList();
        var apiOperationImplementations = repository.findAllOfType(ApiEntity.class).stream()
                .flatMap(a -> a.operationImplementations().stream()
                        .map(w -> new ApiOperationImplementationDto(a.id(), w.operationId(), w.moduleId(), w.useCaseId())))
                .toList();

        // The UI map: apps (menu trees), pages (with their buttons) and who uses which app.
        // Pre-id stores (and entries created before ids existed) self-heal on first read:
        // duplicate labels made selection and gestures ambiguous without a stable identity.
        for (var app : repository.findAllOfType(UiAdapterEntity.class)) {
            var healed = withMenuItemIds(app.menuItems(), new java.util.HashSet<>());
            if (healed != null) {
                repository.save(withMenuItems(app, healed));
            }
        }
        var uiApps = repository.findAllOfType(UiAdapterEntity.class).stream()
                .map(a -> new UiAppDto(a.id(), a.name(), a.title(),
                        (a.menuItems() == null ? List.<UiMenuItemEntity>of() : a.menuItems()).stream()
                                .map(EditorApiController::toMenuEntry)
                                .toList(),
                        a.appType().name(), a.headerPageId(), a.homePageId(), a.homeAppId()))
                .toList();
        var pages = repository.findAllOfType(PageEntity.class).stream()
                .map(p -> new UiPageDto(p.id(), p.name(), p.type(), p.route(), p.modelId(),
                        p.modelId() == null ? null
                                : repository.findById(p.modelId(), ModelEntity.class)
                                        .map(ModelEntity::name).orElse(null),
                        p.aggregateId(), p.listingQueryServiceId(),
                        java.util.stream.Stream.concat(
                                        (p.toolbar() == null ? List.<PageButtonEntity>of() : p.toolbar()).stream(),
                                        (p.bottomBar() == null ? List.<PageButtonEntity>of() : p.bottomBar()).stream())
                                .map(b -> new UiPageButtonDto(b.label(), b.useCaseId(), b.mappingId()))
                                .toList(),
                        uiFields(p),
                        (p.content() == null ? List.<UiComponentNodeEntity>of() : p.content()).stream()
                                .map(EditorApiController::toComponentNode)
                                .toList(),
                        (p.wizardSteps() == null ? List.<PageWizardStepEntity>of() : p.wizardSteps()).stream()
                                .map(s -> new UiWizardStepDto(s.pageId(), s.label()))
                                .toList()))
                .toList();
        var actorAppUses = new ArrayList<ActorAppUseDto>();
        for (var role : repository.findAllOfType(RoleEntity.class)) {
            role.uiAdapterIds().forEach(id -> actorAppUses.add(new ActorAppUseDto(role.id(), id)));
        }

        // The strategic map is a projection of the concrete dependency graph:
        // upstream (provider) → downstream (consumer). contextMap entries only
        // annotate the DDD pattern of a derived pair; orphaned annotations
        // (no concrete dependency behind them) are not painted.
        var allModules = repository.findAllOfType(ModuleEntity.class);
        java.util.function.Function<String, String> moduleOfUseCase = ucId -> allModules.stream()
                .filter(m -> m.useCaseIds() != null && m.useCaseIds().contains(ucId))
                .map(ModuleEntity::id).findFirst().orElse(null);
        java.util.function.Function<String, String> moduleOfAggregate = aggId -> allModules.stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(aggId))
                .map(ModuleEntity::id).findFirst().orElse(null);
        var dependencyReasons = new java.util.LinkedHashMap<List<String>, List<String>>();
        java.util.function.BiConsumer<List<String>, String> addDependency = (pair, reason) -> {
            if (pair.get(0) == null || pair.get(1) == null || pair.get(0).equals(pair.get(1))) return;
            dependencyReasons.computeIfAbsent(pair, k -> new ArrayList<>()).add(reason);
        };
        for (var call : useCaseCalls) {
            addDependency.accept(List.of(
                    Objects.toString(moduleOfUseCase.apply(call.targetId()), ""),
                    Objects.toString(moduleOfUseCase.apply(call.sourceId()), "")),
                    "llamada " + call.sourceId() + " → " + call.targetId());
        }
        for (var call : queryCalls) {
            var qsModule = repository.findById(call.targetId(), QueryServiceEntity.class)
                    .map(QueryServiceEntity::moduleId).orElse(null);
            addDependency.accept(List.of(
                    Objects.toString(qsModule, ""),
                    Objects.toString(moduleOfUseCase.apply(call.sourceId()), "")),
                    "consulta " + call.sourceId() + " → " + call.targetId());
        }
        for (var f : flows) {
            addDependency.accept(List.of(
                    Objects.toString(f.sourceId(), ""), Objects.toString(f.targetId(), "")),
                    "flow " + f.name() + " [" + f.archetype() + "]");
        }
        for (var ref : references) {
            addDependency.accept(List.of(
                    Objects.toString(moduleOfAggregate.apply(ref.targetAggregateId()), ""),
                    Objects.toString(moduleOfAggregate.apply(ref.sourceAggregateId()), "")),
                    "referencia " + ref.sourceAggregateId() + " → " + ref.targetAggregateId());
        }
        var annotations = currentProject == null
                ? List.<ContextMapRelationEntity>of() : currentProject.contextMap();
        var relations = dependencyReasons.entrySet().stream()
                .filter(e -> !e.getKey().get(0).isEmpty() && !e.getKey().get(1).isEmpty())
                .map(e -> {
                    var annotation = annotations.stream()
                            .filter(a -> e.getKey().get(0).equals(a.sourceModuleId())
                                    && e.getKey().get(1).equals(a.targetModuleId()))
                            .findFirst().orElse(null);
                    return new RelationDto(e.getKey().get(0), e.getKey().get(1),
                            annotation != null ? annotation.type() : null,
                            annotation != null,
                            String.join(" · ", e.getValue()));
                })
                .toList();

        return new EditorModelDto(
                modules, externalSystems, relations, flows, aggregates, entities, references, processes,
                views, emissions.stream().distinct().toList(), actors,
                useCaseCalls.stream().distinct().toList(),
                queryCalls.stream().distinct().toList(),
                actorUses.stream().distinct().toList(),
                externalCalls.stream().distinct().toList(),
                externalUseCaseCalls.stream().distinct().toList(),
                aiAgents,
                agentUses.stream().distinct().toList(),
                workflows,
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
                repository.findAllOfType(ModelEntity.class).stream()
                        .map(x -> new NamedRefDto(x.id(), x.name())).toList(),
                repository.findAllOfType(ModelMappingEntity.class).stream()
                        .map(x -> new NamedRefDto(x.id(), x.name())).toList());
    }

    private static UiComponentNodeDto toComponentNode(UiComponentNodeEntity node) {
        return new UiComponentNodeDto(node.id(), node.kind(), node.title(), node.text(), node.label(),
                node.useCaseId(), node.mappingId(), node.modelId(),
                node.queryServiceId(), node.queryOperationId(),
                node.fieldId(), node.stereotype(), node.colspan(),
                (node.children() == null ? List.<UiComponentNodeEntity>of() : node.children()).stream()
                        .map(EditorApiController::toComponentNode)
                        .toList());
    }

    private static UiMenuEntryDto toMenuEntry(UiMenuItemEntity item) {
        return new UiMenuEntryDto(item.label(), item.icon(), item.pageId(),
                (item.children() == null ? List.<UiMenuItemEntity>of() : item.children()).stream()
                        .map(EditorApiController::toMenuEntry)
                        .toList(),
                item.id(), item.uiAdapterId(), item.useCaseId(),
                item.aggregateId(), item.queryServiceId(), item.queryOperationId());
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
                                List<String> memberIds,
                                String workflowId, String emittedEventName,
                                String completionEventName, String dependsOnStepId,
                                List<String> dependsOnStepIds,
                                List<WorkflowStepDto> workflowSteps,
                                Boolean policy,
                                String uri, String externalUseCaseId, String externalTableId,
                                String apiId, String httpMethod, String path,
                                Boolean external,
                                String proxyId, String operationId, String targetSiteId,
                                String pageType, String appId, String menuLabel, String label,
                                String pageId, String parentLabel, String queryServiceId,
                                String modelId, String actorId,
                                String fieldId, String stereotype, Integer colspan,
                                List<String> fieldIds,
                                String itemId, String parentId, String toAppId,
                                String queryOperationId, String mappingId,
                                String componentId, String parentComponentId, String componentKind,
                                String beforeComponentId, String title, String text,
                                String cronExpression, String beforeItemId) {}

    public record ImportApiRq(String apiId, String fileName, String content) {}

    /**
     * Imports an OpenAPI/WSDL contract as (or into) a first-class API: with apiId the
     * operations and rq/rs data models land on that node; without it, the node is
     * created from the contract's title.
     */
    @PostMapping("/import-api")
    public java.util.Map<String, String> importApi(@RequestBody ImportApiRq rq) {
        if (rq.content() == null || rq.content().isBlank()) {
            throw new IllegalArgumentException("El contrato está vacío");
        }
        var name = rq.fileName() == null ? "" : rq.fileName().toLowerCase();
        var wsdl = name.endsWith(".wsdl") || name.endsWith(".xml")
                || (!rq.content().contains("openapi") && !rq.content().contains("swagger")
                        && rq.content().contains("definitions"));
        var apiId = importApiEntityUseCase.handle(rq.content(), wsdl, rq.apiId());
        return java.util.Map.of("apiId", apiId);
    }

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
            case "add-ai-agent" -> addAiAgent(command);
            case "remove-ai-agent" -> removeAiAgent(command);
            case "add-agent-use" -> addAgentUse(command);
            case "remove-agent-use" -> removeAgentUse(command);
            case "add-agent-external-use" -> addAgentExternalUse(command);
            case "remove-agent-external-use" -> removeAgentExternalUse(command);
            case "add-rag" -> addRag(command);
            case "remove-rag" -> removeRag(command);
            case "add-agent-rag" -> addAgentRag(command);
            case "remove-agent-rag" -> removeAgentRag(command);
            case "add-rag-source" -> addRagSource(command);
            case "remove-rag-source" -> removeRagSource(command);
            case "add-rag-content-source" -> addRagContentSource(command);
            case "remove-rag-content-source" -> removeRagContentSource(command);
            case "add-view-member" -> addViewMember(command);
            case "remove-view-member" -> removeViewMember(command);
            case "add-external-table" -> addExternalTable(command);
            case "remove-external-table" -> removeExternalTable(command);
            case "add-mcp-server" -> addMcpServer(command);
            case "remove-mcp-server" -> removeMcpServer(command);
            case "add-agent-mcp" -> addAgentMcp(command);
            case "remove-agent-mcp" -> removeAgentMcp(command);
            case "add-mcp-gateway" -> addMcpGateway(command);
            case "remove-mcp-gateway" -> removeMcpGateway(command);
            case "add-gateway-exposure" -> addGatewayExposure(command);
            case "remove-gateway-exposure" -> removeGatewayExposure(command);
            case "add-agent-gateway" -> addAgentGateway(command);
            case "remove-agent-gateway" -> removeAgentGateway(command);
            case "add-agent-api-operation" -> addAgentApiOperation(command);
            case "remove-agent-api-operation" -> removeAgentApiOperation(command);
            case "add-agent-api" -> addAgentApi(command);
            case "remove-agent-api" -> removeAgentApi(command);
            case "add-agent-query" -> addAgentQuery(command);
            case "remove-agent-query" -> removeAgentQuery(command);
            case "add-agent-delegate" -> addAgentDelegate(command);
            case "remove-agent-delegate" -> removeAgentDelegate(command);
            case "add-actor-agent" -> addActorAgent(command);
            case "remove-actor-agent" -> removeActorAgent(command);
            case "add-agent-trigger" -> addAgentTrigger(command);
            case "remove-agent-trigger" -> removeAgentTrigger(command);
            case "add-api-implementation" -> addApiImplementation(command);
            case "remove-api-implementation" -> removeApiImplementation(command);
            case "add-proxy-operation-route" -> addProxyOperationRoute(command);
            case "remove-proxy-operation-route" -> removeProxyOperationRoute(command);
            case "add-external-operation-use" -> addExternalOperationUse(command);
            case "remove-external-operation-use" -> removeExternalOperationUse(command);
            case "set-api-operation-implementation" -> setApiOperationImplementation(command);
            case "remove-api-operation-implementation" -> removeApiOperationImplementation(command);
            case "add-api" -> addApi(command);
            case "remove-api" -> removeApi(command);
            case "add-api-operation" -> addApiOperation(command);
            case "remove-api-operation" -> removeApiOperation(command);
            case "set-api-operation-target" -> setApiOperationTarget(command);
            case "add-aggregate" -> addAggregate(command);
            case "add-domain-event" -> addDomainEvent(command);
            case "add-domain-service" -> addDomainService(command);
            case "add-application-event" -> addApplicationEvent(command);
            case "remove-application-event" -> removeApplicationEvent(command);
            case "remove-domain-service" -> removeDomainService(command);
            case "add-emission" -> addEmission(command);
            case "add-use-case-call" -> addUseCaseCall(command);
            case "remove-use-case-call" -> removeUseCaseCall(command);
            case "add-use-case-step" -> addUseCaseStep(command);
            case "add-scheduled-trigger" -> addScheduledTrigger(command);
            case "remove-scheduled-trigger" -> removeScheduledTrigger(command);
            case "set-scheduled-trigger-target" -> setScheduledTriggerTarget(command);
            case "remove-use-case-step" -> removeUseCaseStep(command);
            case "add-aggregate-call" -> addAggregateCall(command);
            case "remove-aggregate-call" -> removeAggregateCall(command);
            case "add-query-service" -> addQueryService(command);
            case "remove-query-service" -> removeQueryService(command);
            case "add-query-call" -> addQueryCall(command);
            case "remove-query-call" -> removeQueryCall(command);
            case "add-actor-use" -> addActorUse(command);
            case "remove-actor-use" -> removeActorUse(command);
            case "add-actor-crud" -> addActorCrud(command);
            case "add-actor-external" -> addActorExternalDependency(command);
            case "remove-actor-external" -> removeActorExternalDependency(command);
            case "add-external-dependency" -> addExternalSystemDependency(command);
            case "remove-external-dependency" -> removeExternalSystemDependency(command);
            case "set-api-publisher" -> setApiPublisher(command);
            case "add-proxy-api" -> addProxyApi(command);
            case "remove-proxy-api" -> removeProxyApi(command);
            case "set-proxy-target" -> setProxyTarget(command);
            case "remove-actor-crud" -> removeActorCrud(command);
            case "add-use-case" -> addUseCase(command);
            case "remove-use-case" -> removeUseCase(command);
            case "add-external-call" -> addExternalCall(command);
            case "remove-external-call" -> removeExternalCall(command);
            case "add-external-use-case" -> addExternalUseCase(command);
            case "remove-external-use-case" -> removeExternalUseCase(command);
            case "add-external-uc-call" -> addExternalUcCall(command);
            case "remove-external-uc-call" -> removeExternalUcCall(command);
            case "add-read-model" -> addReadModel(command);
            case "remove-read-model" -> removeReadModel(command);
            case "add-projection" -> addProjection(command);
            case "remove-projection" -> removeProjection(command);
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
            case "add-workflow" -> addWorkflow(command);
            case "remove-workflow" -> removeWorkflow(command);
            case "add-workflow-step" -> addWorkflowStep(command);
            case "remove-workflow-step" -> removeWorkflowStep(command);
            case "update-workflow-step" -> updateWorkflowStep(command);
            case "add-workflow-dependency" -> addWorkflowDependency(command);
            case "set-workflow-trigger" -> setWorkflowTrigger(command);
            case "remove-workflow-dependency" -> removeWorkflowDependency(command);
            case "create-ui-app" -> createUiApp(command);
            case "set-app-header-page" -> setAppHeaderPage(command);
            case "set-app-home-page" -> setAppHomePage(command);
            case "add-page-wizard-step" -> addPageWizardStep(command);
            case "remove-page-wizard-step" -> removePageWizardStep(command);
            case "move-page-wizard-step" -> movePageWizardStep(command);
            case "delete-ui-app" -> deleteUiApp(command);
            case "create-ui-page" -> createUiPage(command);
            case "delete-ui-page" -> deleteUiPage(command);
            case "add-menu-item" -> addMenuItem(command);
            case "remove-menu-item" -> removeMenuItem(command);
            case "set-menu-page" -> setMenuPage(command);
            case "move-menu-item" -> moveMenuItem(command);
            case "set-menu-app" -> setMenuApp(command);
            case "set-menu-use-case" -> setMenuUseCase(command);
            case "set-menu-aggregate" -> setMenuAggregate(command);
            case "set-menu-query-operation" -> setMenuQueryOperation(command);
            case "add-page-button" -> addPageButton(command);
            case "remove-page-button" -> removePageButton(command);
            case "set-page-listing" -> setPageListing(command);
            case "set-page-model" -> setPageModel(command);
            case "rename-ui-page" -> renameUiPage(command);
            case "set-page-type" -> setPageType(command);
            case "set-page-route" -> setPageRoute(command);
            case "set-page-button" -> setPageButton(command);
            case "set-page-field-config" -> setPageFieldConfig(command);
            case "set-page-field-order" -> setPageFieldOrder(command);
            case "add-page-component" -> addPageComponent(command);
            case "remove-page-component" -> removePageComponent(command);
            case "set-page-component" -> setPageComponent(command);
            case "move-page-component" -> movePageComponent(command);
            case "add-actor-app" -> addActorApp(command);
            case "remove-actor-app" -> removeActorApp(command);
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

    private void addWorkflow(EditorCommand command) {
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
                steps, command.completionEventName(), List.of()));
    }

    private void removeWorkflow(EditorCommand command) {
        repository.deleteAllById(List.of(command.id()), WorkflowEntity.class);
    }

    /** Points the workflow at the event that starts it (drawn event → workflow). */
    private void setWorkflowTrigger(EditorCommand command) {
        var wf = requireWorkflow(command.id());
        repository.save(new WorkflowEntity(wf.id(), wf.name(), wf.description(),
                command.triggerAggregateId(), command.triggerDomainServiceId(),
                command.triggerUseCaseId(), command.triggerEvent(),
                wf.steps(), wf.onCompletionEventName(), wf.decisionIds()));
    }

    private void addWorkflowStep(EditorCommand command) {
        var workflow = requireWorkflow(command.workflowId());
        if (workflow.steps().stream().anyMatch(s -> s.id().equals(command.id()))) return;
        var step = new WorkflowStepEntity(
                command.id(), command.name(), command.emittedEventName(),
                command.targetUseCaseId(), command.completionEventName(),
                command.dependsOnStepIds(), null);
        var steps = new ArrayList<>(workflow.steps());
        var index = command.afterStepId() == null ? steps.size()
                : indexAfterWorkflowStep(steps, command.afterStepId());
        steps.add(index, step);
        repository.save(withWorkflowSteps(workflow, steps));
    }

    /** Removing a step also drops it from every other step's dependencies. */
    private void removeWorkflowStep(EditorCommand command) {
        var workflow = requireWorkflow(command.workflowId());
        var steps = workflow.steps().stream()
                .filter(s -> !s.id().equals(command.id()))
                .map(s -> s.dependsOnStepIds().contains(command.id())
                        ? withDependsOn(s, s.dependsOnStepIds().stream()
                                .filter(id -> !id.equals(command.id())).toList())
                        : s)
                .toList();
        repository.save(withWorkflowSteps(workflow, steps));
    }

    /** Replaces emittedEventName, targetUseCaseId and completionEventName wholesale (null clears). */
    private void updateWorkflowStep(EditorCommand command) {
        var workflow = requireWorkflow(command.workflowId());
        repository.save(withWorkflowSteps(workflow, workflow.steps().stream()
                .map(s -> s.id().equals(command.id())
                        ? new WorkflowStepEntity(s.id(), s.name(), command.emittedEventName(),
                                command.targetUseCaseId(), command.completionEventName(),
                                s.dependsOnStepIds(), s.description())
                        : s)
                .toList()));
    }

    private void addWorkflowDependency(EditorCommand command) {
        var workflow = requireWorkflow(command.workflowId());
        if (command.id().equals(command.dependsOnStepId())) {
            throw new IllegalArgumentException("Un paso no puede depender de sí mismo");
        }
        if (workflow.steps().stream().noneMatch(s -> s.id().equals(command.dependsOnStepId()))) {
            throw new IllegalArgumentException("Paso desconocido: " + command.dependsOnStepId());
        }
        repository.save(withWorkflowSteps(workflow, workflow.steps().stream()
                .map(s -> s.id().equals(command.id())
                        && !s.dependsOnStepIds().contains(command.dependsOnStepId())
                        ? withDependsOn(s, concat(s.dependsOnStepIds(), command.dependsOnStepId()))
                        : s)
                .toList()));
    }

    private void removeWorkflowDependency(EditorCommand command) {
        var workflow = requireWorkflow(command.workflowId());
        repository.save(withWorkflowSteps(workflow, workflow.steps().stream()
                .map(s -> s.id().equals(command.id())
                        ? withDependsOn(s, s.dependsOnStepIds().stream()
                                .filter(id -> !id.equals(command.dependsOnStepId())).toList())
                        : s)
                .toList()));
    }

    private WorkflowEntity requireWorkflow(String workflowId) {
        return repository.findById(workflowId, WorkflowEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Workflow desconocido: " + workflowId));
    }

    private static int indexAfterWorkflowStep(List<WorkflowStepEntity> steps, String afterStepId) {
        for (int i = 0; i < steps.size(); i++) {
            if (steps.get(i).id().equals(afterStepId)) return i + 1;
        }
        return steps.size();
    }

    private static List<String> concat(List<String> list, String extra) {
        var next = new ArrayList<>(list);
        next.add(extra);
        return List.copyOf(next);
    }

    /** Record copy with only steps replaced — every other field preserved verbatim. */
    private static WorkflowEntity withWorkflowSteps(WorkflowEntity w, List<WorkflowStepEntity> steps) {
        return new WorkflowEntity(
                w.id(), w.name(), w.description(), w.triggerAggregateId(),
                w.triggerDomainServiceId(), w.triggerUseCaseId(), w.triggerEvent(),
                steps, w.onCompletionEventName(), w.decisionIds());
    }

    /** Record copy with only dependsOnStepIds replaced — every other field preserved verbatim. */
    private static WorkflowStepEntity withDependsOn(WorkflowStepEntity s, List<String> dependsOnStepIds) {
        return new WorkflowStepEntity(
                s.id(), s.name(), s.emittedEventName(), s.targetUseCaseId(),
                s.completionEventName(), dependsOnStepIds, s.description());
    }

    /** A new module belongs to the working project: it joins its first service's moduleIds. */
    private void wireModuleIntoCurrentProject(String moduleId) {
        var project = currentProject().orElse(null);
        var serviceId = project == null || project.serviceIds() == null ? null
                : project.serviceIds().stream().findFirst().orElse(null);
        if (serviceId == null) return;
        repository.findById(serviceId, ServiceEntity.class).ifPresent(service -> {
            var moduleIds = new ArrayList<>(service.moduleIds() == null ? List.of() : service.moduleIds());
            if (moduleIds.contains(moduleId)) return;
            moduleIds.add(moduleId);
            // ServiceEntity is huge; a Jackson round-trip copies it safely field-by-field.
            var mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            var node = mapper.valueToTree(service);
            ((com.fasterxml.jackson.databind.node.ObjectNode) node)
                    .set("moduleIds", mapper.valueToTree(moduleIds));
            try {
                repository.save(mapper.treeToValue(node, ServiceEntity.class));
            } catch (com.fasterxml.jackson.core.JacksonException e) {
                throw new IllegalStateException("No se pudo cablear el módulo al servicio", e);
            }
        });
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
            case "ai-agent" -> repository.findById(command.id(), AiAgentEntity.class)
                    .ifPresent(a -> repository.save(a.withName(command.name())));
            case "rag" -> repository.findById(command.id(), RagEntity.class)
                    .ifPresent(r -> repository.save(r.withName(command.name())));
            case "mcp-gateway" -> repository.findById(command.id(), McpGatewayEntity.class)
                    .ifPresent(g -> repository.save(g.withName(command.name())));
            case "api" -> repository.findById(command.id(), ApiEntity.class)
                    .ifPresent(a -> repository.save(a.withName(command.name())));
            case "proxy-api" -> repository.findById(command.id(), ProxyApiEntity.class)
                    .ifPresent(px -> repository.save(px.withName(command.name())));
            case "api-operation" -> repository.findAllOfType(ApiEntity.class).stream()
                    .filter(a -> a.operations().stream().anyMatch(o -> o.id().equals(command.id())))
                    .findFirst()
                    .ifPresent(a -> repository.save(withApiOperations(a, a.operations().stream()
                            .map(o -> o.id().equals(command.id()) ? o.withName(command.name()) : o)
                            .toList())));
            case "external-table" -> {
                var project = owningProject();
                repository.save(withExternalSystems(project, project.externalSystems().stream()
                        .map(x -> withTables(x, x.tables().stream()
                                .map(t -> t.id().equals(command.id())
                                        ? new ExternalSystemTableEntity(
                                                t.id(), command.name(), t.description())
                                        : t)
                                .toList()))
                        .toList()));
            }
            case "mcp-server" -> {
                var project = owningProject();
                repository.save(withExternalSystems(project, project.externalSystems().stream()
                        .map(x -> x.withMcpServers(x.mcpServers().stream()
                                .map(s -> s.id().equals(command.id())
                                        ? new McpServerEntity(
                                                s.id(), command.name(), s.description(), s.uri())
                                        : s)
                                .toList()))
                        .toList()));
            }
            case "actor" -> repository.findById(command.id(), RoleEntity.class)
                    .ifPresent(r -> repository.save(r.withName(command.name())));
            case "external-system" -> {
                var project = owningProject();
                repository.save(withExternalSystems(project, project.externalSystems().stream()
                        .map(x -> x.id().equals(command.id()) ? x.withName(command.name()) : x)
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
            case "use-case" -> repository.findById(command.id(), UseCaseEntity.class)
                    .ifPresent(uc -> repository.save(new UseCaseEntity(
                            uc.id(), command.name(), uc.exposedAsRest(), uc.exposedAsGrpc(),
                            uc.exposedAsMcp(), uc.exposedAsAsync(), uc.exposedAsUi(),
                            uc.inputModelId(), uc.outputModelId(), uc.steps(),
                            uc.allowedRoles(), uc.allowedScopes(), uc.apiVersion(),
                            uc.mcpDescription(), uc.restHttpMethod(), uc.restPath(),
                            uc.asyncRetryCount(), uc.asyncDeadLetterQueue(), uc.asyncOrderingKey(),
                            uc.asyncTopicName(), uc.asyncConsumerGroup(), uc.cacheable(),
                            uc.cacheTtlSeconds(), uc.timeoutMs(), uc.transactionBoundary(),
                            uc.idempotencyEnabled(), uc.idempotencyKeyField(), uc.rateLimitEnabled(),
                            uc.rateLimitRequestsPerSecond(), uc.grpcServiceName(), uc.grpcMethodName(),
                            uc.decisionIds(), uc.policy())));
            case "external-use-case" -> {
                var project = owningProject();
                repository.save(withExternalSystems(project, project.externalSystems().stream()
                        .map(x -> withUseCases(x, x.useCases().stream()
                                .map(u -> u.id().equals(command.id())
                                        ? new ExternalSystemUseCaseEntity(
                                                u.id(), command.name(), u.description())
                                        : u)
                                .toList()))
                        .toList()));
            }
            case "workflow" -> repository.findById(command.id(), WorkflowEntity.class)
                    .ifPresent(w -> repository.save(new WorkflowEntity(
                            w.id(), command.name(), w.description(), w.triggerAggregateId(),
                            w.triggerDomainServiceId(), w.triggerUseCaseId(), w.triggerEvent(),
                            w.steps(), w.onCompletionEventName(), w.decisionIds())));
            case "workflow-step" -> repository.findAllOfType(WorkflowEntity.class).stream()
                    .filter(w -> w.steps().stream().anyMatch(s -> s.id().equals(command.id())))
                    .findFirst()
                    .ifPresent(w -> repository.save(withWorkflowSteps(w, w.steps().stream()
                            .map(s -> s.id().equals(command.id())
                                    ? new WorkflowStepEntity(s.id(), command.name(),
                                            s.emittedEventName(), s.targetUseCaseId(),
                                            s.completionEventName(), s.dependsOnStepIds(),
                                            s.description())
                                    : s)
                            .toList())));
            default -> throw new IllegalArgumentException(
                    "rename-element no soportado para: " + command.type());
        }
    }

    private void addModule(EditorCommand command) {
        if (repository.findById(command.id(), ModuleEntity.class).isPresent()) return;
        wireModuleIntoCurrentProject(command.id());
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
        clearAgentTriggersFor(command.id());
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

    /**
     * A bare step with no counterpart on the map: it stays {@code Custom} — its intent
     * (natural language) is the spec {@code mvn modux:ai-complete} works from. Steps
     * WITH a counterpart are born typed by the connect gestures instead (CallUseCase,
     * CallQueryService, CallAggregateOperation, PublishApplicationEvent…).
     */
    private void addUseCaseStep(EditorCommand command) {
        var uc = repository.findById(command.useCaseId(), UseCaseEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown use case: " + command.useCaseId()));
        var steps = new ArrayList<>(uc.steps() == null ? List.<UseCaseStepEntity>of() : uc.steps());
        if (steps.stream().anyMatch(st -> st.id().equals(command.id()))) return;
        steps.add(new UseCaseStepEntity(command.id(), command.name(),
                io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.Custom,
                null, null, null, null, null, null, null, null, null, null, null));
        repository.save(withSteps(uc, steps));
    }

    private void removeUseCaseStep(EditorCommand command) {
        repository.findById(command.useCaseId(), UseCaseEntity.class).ifPresent(uc ->
                repository.save(withSteps(uc, (uc.steps() == null ? List.<UseCaseStepEntity>of() : uc.steps()).stream()
                        .filter(st -> !st.id().equals(command.id()))
                        .toList())));
    }

    /** Use case → aggregate: a CallAggregateOperation step (the single operation wires itself). */
    private void addAggregateCall(EditorCommand command) {
        var uc = repository.findById(command.sourceId(), UseCaseEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown use case: " + command.sourceId()));
        var aggregate = repository.findById(command.targetId(), AggregateEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown aggregate: " + command.targetId()));
        var steps = new ArrayList<>(uc.steps() == null ? List.<UseCaseStepEntity>of() : uc.steps());
        var alreadyThere = steps.stream().anyMatch(st ->
                (st.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallAggregateOperation
                        || st.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.SaveAggregate)
                        && aggregate.id().equals(st.aggregateId()));
        if (alreadyThere) return;
        var operations = aggregate.operations() == null ? List.<OperationEntity>of() : aggregate.operations();
        var operationId = operations.size() == 1 ? operations.get(0).id() : null;
        steps.add(new UseCaseStepEntity("step-call-" + aggregate.id(), "call" + capitalize(aggregate.name()),
                io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallAggregateOperation,
                aggregate.id(), operationId, null, null, null, null, null, null, null, null, null));
        repository.save(withSteps(uc, steps));
    }

    private void removeAggregateCall(EditorCommand command) {
        repository.findById(command.sourceId(), UseCaseEntity.class).ifPresent(uc ->
                repository.save(withSteps(uc, (uc.steps() == null ? List.<UseCaseStepEntity>of() : uc.steps()).stream()
                        .filter(st -> !((st.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallAggregateOperation
                                || st.type() == io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.SaveAggregate)
                                && command.targetId().equals(st.aggregateId())))
                        .toList())));
    }

    /** A cron task inside a bounded context; the use case it fires is its target. */
    private void addScheduledTrigger(EditorCommand command) {
        if (repository.findById(command.id(), ScheduledTriggerEntity.class).isPresent()) return;
        var module = repository.findById(command.moduleId(), ModuleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown module: " + command.moduleId()));
        repository.save(new ScheduledTriggerEntity(command.id(), command.name(),
                command.cronExpression() != null ? command.cronExpression() : "0 0 * * *",
                null, command.targetUseCaseId(), null, null, null, null, null, null, null, false, false, null));
        var ids = new ArrayList<>(module.scheduledTriggerIds() == null ? List.of() : module.scheduledTriggerIds());
        ids.add(command.id());
        repository.save(module.toBuilder().scheduledTriggerIds(ids).build());
    }

    private void removeScheduledTrigger(EditorCommand command) {
        for (var module : repository.findAllOfType(ModuleEntity.class)) {
            var ids = module.scheduledTriggerIds();
            if (ids != null && ids.contains(command.id())) {
                repository.save(module.toBuilder()
                        .scheduledTriggerIds(without(ids, command.id())).build());
            }
        }
        repository.deleteAllById(List.of(command.id()), ScheduledTriggerEntity.class);
    }

    private void setScheduledTriggerTarget(EditorCommand command) {
        var t = repository.findById(command.id(), ScheduledTriggerEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown scheduled trigger: " + command.id()));
        if (command.targetUseCaseId() != null) {
            repository.findById(command.targetUseCaseId(), UseCaseEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException("Unknown use case: " + command.targetUseCaseId()));
        }
        repository.save(new ScheduledTriggerEntity(t.id(), t.name(), t.cronExpression(), t.timezone(),
                command.targetUseCaseId(), t.modelMappingId(), t.description(), t.executionEnvironment(),
                t.lockProvider(), t.maxExecutionTimeMs(), t.failureNotificationEmail(), t.misfirePolicy(),
                t.allowConcurrentExecution(), t.retryOnFailure(), t.retryCount()));
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
                .forEach(r -> repository.save(r.withAllowedQueryServiceIds(
                        r.allowedQueryServiceIds().stream().filter(id -> !id.equals(command.id())).toList())));
        repository.findAllOfType(AiAgentEntity.class).stream()
                .filter(a -> a.allowedQueryServiceIds().contains(command.id()))
                .forEach(a -> repository.save(a.withAllowedQueryServiceIds(
                        without(a.allowedQueryServiceIds(), command.id()))));
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
            repository.save(role.withAllowedUseCaseIds(ids));
            return;
        }
        if (repository.findById(command.targetId(), QueryServiceEntity.class).isPresent()) {
            if (role.allowedQueryServiceIds().contains(command.targetId())) return;
            var ids = new ArrayList<>(role.allowedQueryServiceIds());
            ids.add(command.targetId());
            repository.save(role.withAllowedQueryServiceIds(ids));
            return;
        }
        throw new IllegalArgumentException(
                "Un actor solo usa casos de uso o query services; destino desconocido: " + command.targetId());
    }

    private void removeActorUse(EditorCommand command) {
        repository.findById(command.sourceId(), RoleEntity.class).ifPresent(r ->
                repository.save(r
                        .withAllowedUseCaseIds(r.allowedUseCaseIds().stream()
                                .filter(id -> !id.equals(command.targetId())).toList())
                        .withAllowedQueryServiceIds(r.allowedQueryServiceIds().stream()
                                .filter(id -> !id.equals(command.targetId())).toList())));
    }

    /** An actor depends on an external system — drawn on the context map as a dependency. */
    private void addActorExternalDependency(EditorCommand command) {
        var role = repository.findById(command.sourceId(), RoleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown actor: " + command.sourceId()));
        var known = owningProject().externalSystems().stream()
                .anyMatch(x -> x.id().equals(command.targetId()));
        if (!known) {
            throw new IllegalArgumentException("Sistema externo desconocido: " + command.targetId());
        }
        if (role.externalSystemIds().contains(command.targetId())) return;
        var ids = new ArrayList<>(role.externalSystemIds());
        ids.add(command.targetId());
        repository.save(role.withExternalSystemIds(ids));
    }

    private void removeActorExternalDependency(EditorCommand command) {
        repository.findById(command.sourceId(), RoleEntity.class).ifPresent(r ->
                repository.save(r.withExternalSystemIds(r.externalSystemIds().stream()
                        .filter(id -> !id.equals(command.targetId())).toList())));
    }

    /**
     * An external system depends on another one — or on a published API, the
     * finer-grained target. Drawn on the context map as a dependency either way.
     */
    private void addExternalSystemDependency(EditorCommand command) {
        if (command.sourceId().equals(command.targetId())) {
            throw new IllegalArgumentException("Un sistema externo no puede depender de sí mismo");
        }
        var project = owningProject();
        var source = project.externalSystems().stream()
                .filter(x -> x.id().equals(command.sourceId())).findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Sistema externo desconocido: " + command.sourceId()));
        var cqrs = "CQRS".equals(command.type());
        if (repository.findById(command.targetId(), ApiEntity.class).isPresent()
                || repository.findById(command.targetId(), ProxyApiEntity.class).isPresent()) {
            if (cqrs) {
                throw new IllegalArgumentException(
                        "La relación CQRS se establece entre sistemas externos");
            }
            if (source.dependsOnApiIds().contains(command.targetId())) return;
            var ids = new ArrayList<>(source.dependsOnApiIds());
            ids.add(command.targetId());
            repository.save(withExternalSystems(project, project.externalSystems().stream()
                    .map(x -> x.id().equals(command.sourceId()) ? x.withDependsOnApiIds(ids) : x)
                    .toList()));
            return;
        }
        if (project.externalSystems().stream().noneMatch(x -> x.id().equals(command.targetId()))) {
            throw new IllegalArgumentException("Sistema externo desconocido: " + command.targetId());
        }
        // The two flavours are exclusive: re-drawing with the other type retypes the edge.
        repository.save(withExternalSystems(project, project.externalSystems().stream()
                .map(x -> {
                    if (!x.id().equals(command.sourceId())) return x;
                    var plainWithout = (List<String>) x.dependsOnExternalSystemIds().stream()
                            .filter(id -> !id.equals(command.targetId())).toList();
                    var cqrsWithout = (List<String>) x.cqrsExternalSystemIds().stream()
                            .filter(id -> !id.equals(command.targetId())).toList();
                    if (cqrs) {
                        var ids = new ArrayList<>(cqrsWithout);
                        ids.add(command.targetId());
                        return x.withDependsOnExternalSystemIds(plainWithout)
                                .withCqrsExternalSystemIds(ids);
                    }
                    var ids = new ArrayList<>(plainWithout);
                    ids.add(command.targetId());
                    return x.withDependsOnExternalSystemIds(ids)
                            .withCqrsExternalSystemIds(cqrsWithout);
                })
                .toList()));
    }

    /** The target may live in any list (system, CQRS, API/proxy): clear it everywhere. */
    private void removeExternalSystemDependency(EditorCommand command) {
        var project = owningProject();
        repository.save(withExternalSystems(project, project.externalSystems().stream()
                .map(x -> x.id().equals(command.sourceId())
                        ? x.withDependsOnExternalSystemIds(x.dependsOnExternalSystemIds().stream()
                                        .filter(id -> !id.equals(command.targetId())).toList())
                                .withDependsOnApiIds(x.dependsOnApiIds().stream()
                                        .filter(id -> !id.equals(command.targetId())).toList())
                                .withCqrsExternalSystemIds(x.cqrsExternalSystemIds().stream()
                                        .filter(id -> !id.equals(command.targetId())).toList())
                        : x)
                .toList()));
    }

    /** Nest an API (or an API proxy) inside its host external system; empty target un-nests. */
    private void setApiPublisher(EditorCommand command) {
        var target = command.targetId();
        if (target != null && !target.isBlank()) {
            var known = owningProject().externalSystems().stream()
                    .anyMatch(x -> x.id().equals(target));
            if (!known) {
                throw new IllegalArgumentException("Sistema externo desconocido: " + target);
            }
        }
        var home = target != null && !target.isBlank() ? target : null;
        var api = repository.findById(command.id(), ApiEntity.class);
        if (api.isPresent()) {
            repository.save(api.get().withPublishedByExternalSystemId(home));
            return;
        }
        var proxy = repository.findById(command.id(), ProxyApiEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown API: " + command.id()));
        repository.save(proxy.withPublishedByExternalSystemId(home));
    }

    /** Optionally born wired: targetId = the API it fronts, moduleId = the host system. */
    private void addProxyApi(EditorCommand command) {
        if (repository.findById(command.id(), ProxyApiEntity.class).isPresent()) return;
        var target = command.targetId();
        if (target != null && !target.isBlank()
                && repository.findById(target, ApiEntity.class).isEmpty()) {
            throw new IllegalArgumentException("API desconocida: " + target);
        }
        var host = command.moduleId();
        if (host != null && !host.isBlank()
                && owningProject().externalSystems().stream().noneMatch(x -> x.id().equals(host))) {
            throw new IllegalArgumentException("Sistema externo desconocido: " + host);
        }
        var targetApi = target == null || target.isBlank() ? null : target;
        var hostId = host == null || host.isBlank() ? null : host;
        repository.save(new ProxyApiEntity(command.id(), command.name(), null, targetApi, hostId));
        if (targetApi != null) {
            repointApiDependencies(targetApi, command.id(), hostId);
        }
    }

    /**
     * A proxy in front of an API takes over its consumers: whoever depended on the
     * API now depends on the proxy (the host itself keeps its direct dependency —
     * that is the proxy's own upstream call). Deleting a wired proxy hands them back.
     */
    private void repointApiDependencies(String fromId, String toId, String exceptSystemId) {
        var project = owningProject();
        repository.save(withExternalSystems(project, project.externalSystems().stream()
                .map(x -> x.dependsOnApiIds().contains(fromId) && !x.id().equals(exceptSystemId)
                        ? x.withDependsOnApiIds(x.dependsOnApiIds().stream()
                                .map(i -> i.equals(fromId) ? toId : i)
                                .distinct()
                                .toList())
                        : x)
                .toList()));
    }

    private void removeProxyApi(EditorCommand command) {
        var proxy = repository.findById(command.id(), ProxyApiEntity.class).orElse(null);
        if (proxy == null) return;
        var dependedOn = currentProject().stream()
                .flatMap(p -> p.externalSystems().stream())
                .anyMatch(x -> x.dependsOnApiIds().contains(command.id()));
        if (dependedOn && proxy.targetApiId() == null) {
            throw new IllegalArgumentException(
                    "El proxy " + command.id() + " tiene sistemas externos que dependen de él; quita esas dependencias primero");
        }
        if (dependedOn) {
            // Hand the consumers back to the API the proxy was fronting.
            repointApiDependencies(command.id(), proxy.targetApiId(), null);
        }
        repository.deleteAllById(List.of(command.id()), ProxyApiEntity.class);
    }

    /** Point the proxy at the published API it fronts; empty target clears the wiring. */
    private void setProxyTarget(EditorCommand command) {
        var proxy = repository.findById(command.id(), ProxyApiEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown proxy: " + command.id()));
        var target = command.targetId();
        if (target != null && !target.isBlank()) {
            if (repository.findById(target, ApiEntity.class).isEmpty()) {
                throw new IllegalArgumentException("API desconocida: " + target);
            }
            repository.save(proxy.withTargetApiId(target));
            repointApiDependencies(target, proxy.id(), proxy.publishedByExternalSystemId());
        } else {
            repository.save(proxy.withTargetApiId(null));
        }
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
        repository.save(role.withAllowedUseCaseIds(allowed));
    }

    private void removeActorCrud(EditorCommand command) {
        var aggregate = repository.findById(command.targetId(), AggregateEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown aggregate: " + command.targetId()));
        var crudIds = crudUseCases(aggregate).stream().map(UseCaseEntity::id).toList();
        repository.findById(command.sourceId(), RoleEntity.class).ifPresent(r ->
                repository.save(r.withAllowedUseCaseIds(
                        r.allowedUseCaseIds().stream().filter(id -> !crudIds.contains(id)).toList())));
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

    private void addUseCase(EditorCommand command) {
        if (repository.findById(command.id(), UseCaseEntity.class).isPresent()) return;
        var module = repository.findById(command.moduleId(), ModuleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown module: " + command.moduleId()));
        // A policy is a use-case-shaped reaction: same catalog, no UI derivation.
        repository.save(stubUseCase(command.id(), command.name(), List.of(), false,
                Boolean.TRUE.equals(command.policy())));
        var useCaseIds = new ArrayList<>(module.useCaseIds() == null ? List.of() : module.useCaseIds());
        useCaseIds.add(command.id());
        repository.save(module.toBuilder().useCaseIds(useCaseIds).build());
    }

    private void removeUseCase(EditorCommand command) {
        var calledByUseCase = repository.findAllOfType(UseCaseEntity.class).stream()
                .filter(uc -> uc.steps() != null)
                .anyMatch(uc -> uc.steps().stream().anyMatch(st -> command.id().equals(st.useCaseId())));
        if (calledByUseCase) {
            throw new IllegalArgumentException(
                    "El caso de uso " + command.id() + " lo invocan otros casos de uso; quita esas llamadas primero");
        }
        var inProcesses = repository.findAllOfType(ProcessEntity.class).stream()
                .flatMap(p -> p.steps().stream())
                .anyMatch(st -> command.id().equals(st.useCaseId()));
        if (inProcesses) {
            throw new IllegalArgumentException(
                    "El caso de uso " + command.id() + " participa en procesos; quítalo primero");
        }
        var triggersFlow = repository.findAllOfType(FlowEntity.class).stream()
                .anyMatch(f -> command.id().equals(f.targetUseCaseId()) || command.id().equals(f.triggerUseCaseId()));
        if (triggersFlow) {
            throw new IllegalArgumentException(
                    "El caso de uso " + command.id() + " participa en flows; bórralos primero");
        }
        var translatedByAcl = repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.acls() != null)
                .flatMap(m -> m.acls().stream())
                .anyMatch(a -> a.translatedUseCaseIds() != null
                        && a.translatedUseCaseIds().contains(command.id()));
        if (translatedByAcl) {
            throw new IllegalArgumentException(
                    "El caso de uso " + command.id() + " lo llama un sistema externo (ACL); quita esa llamada primero");
        }
        repository.findAllOfType(RoleEntity.class).stream()
                .filter(r -> r.allowedUseCaseIds().contains(command.id()))
                .forEach(r -> repository.save(r.withAllowedUseCaseIds(
                        r.allowedUseCaseIds().stream().filter(id -> !id.equals(command.id())).toList())));
        repository.findAllOfType(AiAgentEntity.class).stream()
                .filter(a -> a.allowedUseCaseIds().contains(command.id()))
                .forEach(a -> repository.save(withAllowedUseCaseIds(a,
                        a.allowedUseCaseIds().stream().filter(id -> !id.equals(command.id())).toList())));
        repository.findAllOfType(McpGatewayEntity.class).stream()
                .filter(g -> g.useCaseIds().contains(command.id()))
                .forEach(g -> repository.save(g.withUseCaseIds(
                        without(g.useCaseIds(), command.id()))));
        repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.useCaseIds() != null && m.useCaseIds().contains(command.id()))
                .forEach(m -> repository.save(m.toBuilder()
                        .useCaseIds(m.useCaseIds().stream().filter(id -> !id.equals(command.id())).toList())
                        .build()));
        repository.deleteAllById(List.of(command.id()), UseCaseEntity.class);
    }

    /** An external system calls one of our use cases: an INBOUND ACL in the target module. */
    private void addExternalCall(EditorCommand command) {
        var external = owningProject().externalSystems().stream()
                .filter(x -> x.id().equals(command.sourceId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown external system: " + command.sourceId()));
        repository.findById(command.targetId(), UseCaseEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown use case: " + command.targetId()));
        var module = repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.useCaseIds() != null && m.useCaseIds().contains(command.targetId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "El caso de uso " + command.targetId() + " no pertenece a ningún módulo"));
        var acls = new ArrayList<>(module.acls() == null ? List.of() : module.acls());
        var existing = acls.stream()
                .filter(a -> external.id().equals(a.externalSystem()) && "INBOUND".equalsIgnoreCase(a.direction()))
                .findFirst().orElse(null);
        if (existing != null) {
            if (existing.translatedUseCaseIds() != null
                    && existing.translatedUseCaseIds().contains(command.targetId())) return;
            var ids = new ArrayList<>(existing.translatedUseCaseIds() == null
                    ? List.of() : existing.translatedUseCaseIds());
            ids.add(command.targetId());
            acls.set(acls.indexOf(existing), new AclEntity(existing.id(), existing.name(),
                    existing.externalSystem(), existing.description(), existing.direction(),
                    existing.gatewayId(), existing.translatedDomainEventIds(), ids));
        } else {
            acls.add(new AclEntity("acl-" + external.id() + "-" + module.id(),
                    "Acl" + capitalize(external.name()), external.id(), null, "INBOUND", null,
                    List.of(), List.of(command.targetId())));
        }
        repository.save(module.toBuilder().acls(acls).build());
    }

    private void removeExternalCall(EditorCommand command) {
        repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.acls() != null && m.acls().stream().anyMatch(a ->
                        command.sourceId().equals(a.externalSystem())
                                && "INBOUND".equalsIgnoreCase(a.direction())
                                && a.translatedUseCaseIds() != null
                                && a.translatedUseCaseIds().contains(command.targetId())))
                .forEach(m -> repository.save(m.toBuilder().acls(m.acls().stream()
                        .map(a -> {
                            if (!command.sourceId().equals(a.externalSystem())
                                    || !"INBOUND".equalsIgnoreCase(a.direction())) return a;
                            var ids = a.translatedUseCaseIds().stream()
                                    .filter(id -> !id.equals(command.targetId())).toList();
                            return new AclEntity(a.id(), a.name(), a.externalSystem(), a.description(),
                                    a.direction(), a.gatewayId(), a.translatedDomainEventIds(), ids);
                        })
                        // An ACL created just for this call leaves when it translates nothing.
                        .filter(a -> !(a.id().startsWith("acl-")
                                && (a.translatedUseCaseIds() == null || a.translatedUseCaseIds().isEmpty())
                                && (a.translatedDomainEventIds() == null || a.translatedDomainEventIds().isEmpty())))
                        .toList()).build()));
    }

    /** A use case OFFERED by an external system (moduleId carries the external system id). */
    private void addExternalUseCase(EditorCommand command) {
        var project = owningProject();
        var externalSystems = new ArrayList<>(project.externalSystems());
        var external = externalSystems.stream()
                .filter(x -> x.id().equals(command.moduleId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown external system: " + command.moduleId()));
        if (external.useCases().stream().anyMatch(u -> u.id().equals(command.id()))) return;
        var useCases = new ArrayList<>(external.useCases());
        useCases.add(new ExternalSystemUseCaseEntity(command.id(), command.name(), null));
        externalSystems.set(externalSystems.indexOf(external), withUseCases(external, useCases));
        repository.save(withExternalSystems(project, externalSystems));
    }

    private void removeExternalUseCase(EditorCommand command) {
        var called = repository.findAllOfType(UseCaseEntity.class).stream()
                .filter(uc -> uc.steps() != null)
                .anyMatch(uc -> uc.steps().stream().anyMatch(st -> command.id().equals(st.externalUseCaseId())));
        if (called) {
            throw new IllegalArgumentException(
                    "El caso de uso externo " + command.id() + " lo llaman casos de uso; quita esas llamadas primero");
        }
        var project = owningProject();
        repository.save(withExternalSystems(project, project.externalSystems().stream()
                .map(x -> withUseCases(x, x.useCases().stream()
                        .filter(u -> !u.id().equals(command.id())).toList()))
                .toList()));
    }

    /** Our use case calls an external system's use case: a CallExternalUseCase step. */
    private void addExternalUcCall(EditorCommand command) {
        var source = repository.findById(command.sourceId(), UseCaseEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown use case: " + command.sourceId()));
        var target = owningProject().externalSystems().stream()
                .flatMap(x -> x.useCases().stream())
                .filter(u -> u.id().equals(command.targetId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown external use case: " + command.targetId()));
        var steps = new ArrayList<>(source.steps() == null ? List.of() : source.steps());
        if (steps.stream().anyMatch(st -> target.id().equals(st.externalUseCaseId()))) return;
        steps.add(new UseCaseStepEntity("step-ext-" + target.id(), "call" + capitalize(target.name()),
                io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType.CallExternalUseCase,
                null, null, null, null, null, null, null, null, null, null, null, target.id()));
        repository.save(withSteps(source, steps));
    }

    private void removeExternalUcCall(EditorCommand command) {
        repository.findById(command.sourceId(), UseCaseEntity.class).ifPresent(uc ->
                repository.save(withSteps(uc, (uc.steps() == null ? List.<UseCaseStepEntity>of() : uc.steps()).stream()
                        .filter(st -> !command.targetId().equals(st.externalUseCaseId()))
                        .toList())));
    }

    /** Record copy with only useCases replaced — every other field preserved verbatim. */
    private static ExternalSystemEntity withUseCases(
            ExternalSystemEntity x, List<ExternalSystemUseCaseEntity> useCases) {
        return x.withUseCases(useCases);
    }

    /** Record copy with only tables replaced — every other field preserved verbatim. */
    private static ExternalSystemEntity withTables(
            ExternalSystemEntity x, List<ExternalSystemTableEntity> tables) {
        return x.withTables(tables);
    }

    /** An MCP server published by an external system (moduleId carries the external system id). */
    private void addMcpServer(EditorCommand command) {
        var project = owningProject();
        var externalSystems = new ArrayList<>(project.externalSystems());
        var external = externalSystems.stream()
                .filter(x -> x.id().equals(command.moduleId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown external system: " + command.moduleId()));
        if (external.mcpServers().stream().anyMatch(s -> s.id().equals(command.id()))) return;
        var servers = new ArrayList<>(external.mcpServers());
        servers.add(new McpServerEntity(command.id(), command.name(), null, command.uri()));
        externalSystems.set(externalSystems.indexOf(external), external.withMcpServers(servers));
        repository.save(withExternalSystems(project, externalSystems));
    }

    /** Removing an MCP server also unlinks it from agents and gateways that aggregated it. */
    private void removeMcpServer(EditorCommand command) {
        repository.findAllOfType(AiAgentEntity.class).stream()
                .filter(a -> a.allowedMcpServerIds().contains(command.id()))
                .forEach(a -> repository.save(a.withAllowedMcpServerIds(
                        a.allowedMcpServerIds().stream()
                                .filter(id -> !id.equals(command.id())).toList())));
        repository.findAllOfType(McpGatewayEntity.class).stream()
                .filter(g -> g.mcpServerIds().contains(command.id()))
                .forEach(g -> repository.save(g.withMcpServerIds(
                        without(g.mcpServerIds(), command.id()))));
        var project = owningProject();
        repository.save(withExternalSystems(project, project.externalSystems().stream()
                .map(x -> x.withMcpServers(x.mcpServers().stream()
                        .filter(s -> !s.id().equals(command.id())).toList()))
                .toList()));
    }

    /** A table offered by an external system (moduleId carries the external system id). */
    private void addExternalTable(EditorCommand command) {
        var project = owningProject();
        var externalSystems = new ArrayList<>(project.externalSystems());
        var external = externalSystems.stream()
                .filter(x -> x.id().equals(command.moduleId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown external system: " + command.moduleId()));
        if (external.tables().stream().anyMatch(t -> t.id().equals(command.id()))) return;
        var tables = new ArrayList<>(external.tables());
        tables.add(new ExternalSystemTableEntity(command.id(), command.name(), null));
        externalSystems.set(externalSystems.indexOf(external), withTables(external, tables));
        repository.save(withExternalSystems(project, externalSystems));
    }

    private void removeExternalTable(EditorCommand command) {
        var polled = repository.findAllOfType(ProjectionEntity.class).stream()
                .anyMatch(p -> command.id().equals(p.sourceExternalTableId()));
        if (polled) {
            throw new IllegalArgumentException("La tabla " + command.id()
                    + " la proyectan proyecciones; bórralas primero");
        }
        repository.findAllOfType(RagEntity.class).stream()
                .filter(r -> r.sourceExternalTableIds().contains(command.id()))
                .forEach(r -> repository.save(r.withSourceExternalTableIds(
                        without(r.sourceExternalTableIds(), command.id()))));
        var project = owningProject();
        repository.save(withExternalSystems(project, project.externalSystems().stream()
                .map(x -> withTables(x, x.tables().stream()
                        .filter(t -> !t.id().equals(command.id())).toList()))
                .toList()));
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

    /** UI-exposed stub (the CRUD default). */
    private static UseCaseEntity stubUseCase(String id, String name, List<UseCaseStepEntity> steps) {
        return stubUseCase(id, name, steps, true);
    }

    /** A minimal use case stub — fields get refined later through the CRUDs. */
    private static UseCaseEntity stubUseCase(String id, String name, List<UseCaseStepEntity> steps,
                                             boolean exposedAsUi) {
        return stubUseCase(id, name, steps, exposedAsUi, false);
    }

    private static UseCaseEntity stubUseCase(String id, String name, List<UseCaseStepEntity> steps,
                                             boolean exposedAsUi, boolean policy) {
        return new UseCaseEntity(id, name, false, false, false, false, exposedAsUi,
                null, null, steps, List.of(), List.of(), null, null, null, null,
                null, null, null, null, null, false, null, null, null, false, null,
                false, null, null, null, List.of(), policy);
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
                uc.grpcServiceName(), uc.grpcMethodName(), uc.decisionIds(), uc.policy());
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

    /**
     * A projection SOURCED FROM AN AGGREGATE's state (no event handlers): the aggregate is
     * projected onto a read model — possibly in another bounded context. Without a
     * readModelId a stub read model is born in the target module, shaped after the
     * aggregate's state model. How the state travels is a later decision.
     */
    private void addProjection(EditorCommand command) {
        if (repository.findById(command.id(), ProjectionEntity.class).isPresent()) return;
        // Exactly one source: an aggregate's state, an external operation to poll, or a
        // legacy table to poll.
        AggregateEntity aggregate = null;
        if (command.aggregateId() != null) {
            aggregate = repository.findById(command.aggregateId(), AggregateEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unknown aggregate: " + command.aggregateId()));
        } else if (command.externalUseCaseId() != null) {
            var known = owningProject().externalSystems().stream()
                    .flatMap(x -> x.useCases().stream())
                    .anyMatch(u -> u.id().equals(command.externalUseCaseId()));
            if (!known) {
                throw new IllegalArgumentException(
                        "Unknown external use case: " + command.externalUseCaseId());
            }
        } else if (command.externalTableId() != null) {
            var known = owningProject().externalSystems().stream()
                    .flatMap(x -> x.tables().stream())
                    .anyMatch(t -> t.id().equals(command.externalTableId()));
            if (!known) {
                throw new IllegalArgumentException(
                        "Unknown external table: " + command.externalTableId());
            }
        } else {
            throw new IllegalArgumentException(
                    "La proyección necesita una fuente: agregado, operación externa o tabla");
        }
        String readModelId;
        ModuleEntity owner;
        if (command.targetId() != null
                && repository.findById(command.targetId(), ReadModelEntity.class).isPresent()) {
            readModelId = command.targetId();
            owner = repository.findAllOfType(ModuleEntity.class).stream()
                    .filter(m -> m.readModelIds() != null && m.readModelIds().contains(readModelId))
                    .findFirst()
                    .orElseThrow(() -> new IllegalArgumentException(
                            "El read model " + readModelId + " no pertenece a ningún módulo"));
        } else {
            owner = repository.findById(command.moduleId(), ModuleEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unknown module: " + command.moduleId()));
            readModelId = "rm-" + command.id().replaceFirst("^proj-", "");
            if (repository.findById(readModelId, ReadModelEntity.class).isEmpty()) {
                repository.save(new ReadModelEntity(readModelId,
                        command.readModelName() != null ? command.readModelName()
                                : (aggregate != null ? aggregate.name() + "View" : command.name()),
                        owner.id(), null,
                        aggregate != null ? aggregate.modelId() : null,
                        null, null,
                        aggregate != null ? aggregate.id() : null));
                var readModelIds = new ArrayList<>(
                        owner.readModelIds() == null ? List.of() : owner.readModelIds());
                readModelIds.add(readModelId);
                owner = owner.toBuilder().readModelIds(readModelIds).build();
                repository.save(owner);
            }
        }
        repository.save(new ProjectionEntity(command.id(), command.name(), readModelId,
                List.of(), null, null, null, false, null,
                aggregate != null ? aggregate.id() : null,
                command.externalUseCaseId(), command.externalTableId()));
        var projectionIds = new ArrayList<>(
                owner.projectionIds() == null ? List.of() : owner.projectionIds());
        projectionIds.add(command.id());
        repository.save(owner.toBuilder().projectionIds(projectionIds).build());
    }

    private void removeProjection(EditorCommand command) {
        var updatedBySubscription = repository.findAllOfType(SubscriptionEntity.class).stream()
                .filter(s -> s.actions() != null)
                .anyMatch(s -> s.actions().stream()
                        .anyMatch(a -> command.id().equals(a.projectionId())));
        if (updatedBySubscription) {
            throw new IllegalArgumentException("La proyección " + command.id()
                    + " la actualizan subscriptions; quita esas acciones primero");
        }
        repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.projectionIds() != null && m.projectionIds().contains(command.id()))
                .forEach(m -> repository.save(m.toBuilder()
                        .projectionIds(m.projectionIds().stream()
                                .filter(id -> !id.equals(command.id())).toList())
                        .build()));
        repository.deleteAllById(List.of(command.id()), ProjectionEntity.class);
    }

    /** A published API as a first-class element (usually born from an import). */
    private void addApi(EditorCommand command) {
        if (repository.findById(command.id(), ApiEntity.class).isPresent()) return;
        repository.save(new ApiEntity(command.id(), command.name(), null, List.of()));
    }

    private void removeApi(EditorCommand command) {
        var dependedOn = currentProject().stream()
                .flatMap(p -> p.externalSystems().stream())
                .anyMatch(x -> x.dependsOnApiIds().contains(command.id()));
        if (dependedOn) {
            throw new IllegalArgumentException(
                    "La API " + command.id() + " tiene sistemas externos que dependen de ella; quita esas dependencias primero");
        }
        var proxied = repository.findAllOfType(ProxyApiEntity.class).stream()
                .anyMatch(px -> command.id().equals(px.targetApiId()));
        if (proxied) {
            throw new IllegalArgumentException(
                    "La API " + command.id() + " tiene proxies que apuntan a ella; quita esos proxies primero");
        }
        // Gateways and agents let go of the API and its operations.
        var leavingOpIds = repository.findById(command.id(), ApiEntity.class).stream()
                .flatMap(a -> a.operations().stream()).map(ApiOperationEntity::id)
                .collect(java.util.stream.Collectors.toSet());
        repository.findAllOfType(McpGatewayEntity.class).stream()
                .filter(g -> g.apiIds().contains(command.id())
                        || g.apiOperationIds().stream().anyMatch(leavingOpIds::contains))
                .forEach(g -> repository.save(g
                        .withApiIds(without(g.apiIds(), command.id()))
                        .withApiOperationIds(g.apiOperationIds().stream()
                                .filter(id -> !leavingOpIds.contains(id)).toList())));
        repository.findAllOfType(AiAgentEntity.class).stream()
                .filter(a -> a.allowedApiOperationIds().stream().anyMatch(leavingOpIds::contains))
                .forEach(a -> repository.save(a.withAllowedApiOperationIds(
                        a.allowedApiOperationIds().stream()
                                .filter(id -> !leavingOpIds.contains(id)).toList())));
        repository.deleteAllById(List.of(command.id()), ApiEntity.class);
    }

    private void addApiOperation(EditorCommand command) {
        var api = requireApi(command.apiId());
        if (api.operations().stream().anyMatch(o -> o.id().equals(command.id()))) return;
        var operations = new ArrayList<>(api.operations());
        operations.add(new ApiOperationEntity(command.id(), command.name(),
                command.httpMethod(), command.path(), null,
                command.moduleId(), command.targetUseCaseId()));
        repository.save(withApiOperations(api, operations));
    }

    private void removeApiOperation(EditorCommand command) {
        var api = requireApi(command.apiId());
        // Gateways and agents let go of the operation before it disappears.
        repository.findAllOfType(McpGatewayEntity.class).stream()
                .filter(g -> g.apiOperationIds().contains(command.id()))
                .forEach(g -> repository.save(g.withApiOperationIds(
                        without(g.apiOperationIds(), command.id()))));
        repository.findAllOfType(AiAgentEntity.class).stream()
                .filter(a -> a.allowedApiOperationIds().contains(command.id()))
                .forEach(a -> repository.save(a.withAllowedApiOperationIds(
                        without(a.allowedApiOperationIds(), command.id()))));
        repository.save(withApiOperations(api, api.operations().stream()
                .filter(o -> !o.id().equals(command.id())).toList()));
    }

    /** Wires (or, with both targets null, unwires) the operation to its implementer. */
    private void setApiOperationTarget(EditorCommand command) {
        var api = requireApi(command.apiId());
        if (command.targetUseCaseId() != null
                && repository.findById(command.targetUseCaseId(), UseCaseEntity.class).isEmpty()) {
            throw new IllegalArgumentException("Unknown use case: " + command.targetUseCaseId());
        }
        if (command.moduleId() != null
                && repository.findById(command.moduleId(), ModuleEntity.class).isEmpty()) {
            throw new IllegalArgumentException("Unknown module: " + command.moduleId());
        }
        repository.save(withApiOperations(api, api.operations().stream()
                .map(o -> o.id().equals(command.id())
                        ? o.withTargets(command.moduleId(), command.targetUseCaseId())
                        : o)
                .toList()));
    }

    private ApiEntity requireApi(String apiId) {
        return repository.findById(apiId, ApiEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown API: " + apiId));
    }

    /** Record copy with only operations replaced — every other field preserved verbatim. */
    private static ApiEntity withApiOperations(ApiEntity a, List<ApiOperationEntity> operations) {
        return a.withOperations(operations);
    }

    private void removeDomainEvent(EditorCommand command) {
        repository.findAllOfType(ModuleEntity.class).stream()
                .filter(m -> m.domainEventIds() != null && m.domainEventIds().contains(command.id()))
                .forEach(m -> repository.save(m.toBuilder()
                        .domainEventIds(m.domainEventIds().stream()
                                .filter(id -> !id.equals(command.id())).toList())
                        .build()));
        clearAgentTriggersFor(command.id());
        repository.deleteAllById(List.of(command.id()), DomainEventEntity.class);
    }

    /** Reactive agents let go of an event that is leaving the catalog. */
    private void clearAgentTriggersFor(String eventId) {
        repository.findAllOfType(AiAgentEntity.class).stream()
                .filter(a -> a.reactsToEventIds().contains(eventId))
                .forEach(a -> repository.save(a.withReactsToEventIds(
                        without(a.reactsToEventIds(), eventId))));
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

    /** Upserts the type ANNOTATION of a derived relation (the pair itself is computed). */
    private void setRelationType(EditorCommand command) {
        var project = owningProject();
        var relations = new ArrayList<>(project.contextMap());
        var existing = relations.stream()
                .filter(r -> r.sourceModuleId().equals(command.sourceId())
                        && r.targetModuleId().equals(command.targetId()))
                .findFirst().orElse(null);
        if (existing != null) {
            relations.set(relations.indexOf(existing), new ContextMapRelationEntity(
                    existing.id(), existing.name(), existing.sourceModuleId(),
                    existing.targetModuleId(), command.type(), existing.description(),
                    existing.decisionIds()));
        } else {
            relations.add(new ContextMapRelationEntity(
                    "rel-" + command.sourceId() + "-" + command.targetId(), null,
                    command.sourceId(), command.targetId(), command.type(), null, List.of()));
        }
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
        var dependedOnByActors = repository.findAllOfType(RoleEntity.class).stream()
                .anyMatch(r -> r.externalSystemIds().contains(command.id()));
        if (dependedOnByActors) {
            throw new IllegalArgumentException(
                    "El sistema externo " + command.id() + " tiene actores que dependen de él; quita esas dependencias primero");
        }
        var dependedOnByExternals = owningProject().externalSystems().stream()
                .anyMatch(x -> x.dependsOnExternalSystemIds().contains(command.id())
                        || x.cqrsExternalSystemIds().contains(command.id()));
        if (dependedOnByExternals) {
            throw new IllegalArgumentException(
                    "El sistema externo " + command.id() + " tiene sistemas externos que dependen de él; quita esas dependencias primero");
        }
        // Agents lose their links to the MCP servers leaving with the system.
        var leavingMcpIds = owningProject().externalSystems().stream()
                .filter(x -> x.id().equals(command.id()))
                .flatMap(x -> x.mcpServers().stream())
                .map(McpServerEntity::id)
                .collect(java.util.stream.Collectors.toSet());
        if (!leavingMcpIds.isEmpty()) {
            repository.findAllOfType(AiAgentEntity.class).stream()
                    .filter(a -> a.allowedMcpServerIds().stream().anyMatch(leavingMcpIds::contains))
                    .forEach(a -> repository.save(a.withAllowedMcpServerIds(
                            a.allowedMcpServerIds().stream()
                                    .filter(id -> !leavingMcpIds.contains(id)).toList())));
        }
        repository.findAllOfType(RagEntity.class).stream()
                .filter(r -> r.sourceExternalSystemIds().contains(command.id()))
                .forEach(r -> repository.save(r.withSourceExternalSystemIds(
                        without(r.sourceExternalSystemIds(), command.id()))));
        // The APIs and proxies it published survive as standalone contracts.
        repository.findAllOfType(ApiEntity.class).stream()
                .filter(a -> command.id().equals(a.publishedByExternalSystemId()))
                .forEach(a -> repository.save(a.withPublishedByExternalSystemId(null)));
        repository.findAllOfType(ProxyApiEntity.class).stream()
                .filter(px -> command.id().equals(px.publishedByExternalSystemId()))
                .forEach(px -> repository.save(px.withPublishedByExternalSystemId(null)));
        var project = owningProject();
        repository.save(withExternalSystems(project, project.externalSystems().stream()
                .filter(x -> !x.id().equals(command.id())).toList()));
    }

    private void addAiAgent(EditorCommand command) {
        if (repository.findById(command.id(), AiAgentEntity.class).isPresent()) return;
        repository.save(new AiAgentEntity(command.id(), command.name(), null,
                List.of(), List.of(), List.of(), List.of(),
                Boolean.TRUE.equals(command.external()),
                List.of(), List.of(), List.of(), List.of(), List.of()));
    }

    private void removeAiAgent(EditorCommand command) {
        repository.findById(command.id(), AiAgentEntity.class).ifPresent(agent -> {
            // Whoever pointed at this agent lets go: delegations and actor links.
            repository.findAllOfType(AiAgentEntity.class).stream()
                    .filter(a -> a.delegateAgentIds().contains(agent.id()))
                    .forEach(a -> repository.save(a.withDelegateAgentIds(
                            a.delegateAgentIds().stream()
                                    .filter(id -> !id.equals(agent.id())).toList())));
            repository.findAllOfType(RoleEntity.class).stream()
                    .filter(r -> r.aiAgentIds().contains(agent.id()))
                    .forEach(r -> repository.save(r.withAiAgentIds(
                            r.aiAgentIds().stream()
                                    .filter(id -> !id.equals(agent.id())).toList())));
            repository.deleteAllById(List.of(agent.id()), AiAgentEntity.class);
            // MCP exposure that only this agent justified goes with it.
            agent.allowedUseCaseIds().forEach(this::clearMcpExposureIfUnused);
        });
    }

    private void addMcpGateway(EditorCommand command) {
        if (repository.findById(command.id(), McpGatewayEntity.class).isPresent()) return;
        repository.save(new McpGatewayEntity(command.id(), command.name(), null,
                List.of(), List.of(), List.of(), List.of(), List.of()));
    }

    /** Removing a gateway also unlinks it from every agent that consumed it. */
    private void removeMcpGateway(EditorCommand command) {
        repository.findAllOfType(AiAgentEntity.class).stream()
                .filter(a -> a.mcpGatewayIds().contains(command.id()))
                .forEach(a -> repository.save(a.withMcpGatewayIds(
                        a.mcpGatewayIds().stream()
                                .filter(id -> !id.equals(command.id())).toList())));
        repository.deleteAllById(List.of(command.id()), McpGatewayEntity.class);
    }

    /**
     * Gateway → element: the gateway aggregates/exposes it. The target's kind decides
     * the slot: an external MCP server, a whole API, one API operation, a use case or
     * a RAG (retrieval as a tool).
     */
    private void addGatewayExposure(EditorCommand command) {
        var gateway = repository.findById(command.sourceId(), McpGatewayEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown MCP gateway: " + command.sourceId()));
        var target = command.targetId();
        if (owningProject().externalSystems().stream()
                .flatMap(x -> x.mcpServers().stream()).anyMatch(s -> s.id().equals(target))) {
            if (!gateway.mcpServerIds().contains(target)) {
                repository.save(gateway.withMcpServerIds(appended(gateway.mcpServerIds(), target)));
            }
        } else if (repository.findById(target, ApiEntity.class).isPresent()) {
            if (!gateway.apiIds().contains(target)) {
                repository.save(gateway.withApiIds(appended(gateway.apiIds(), target)));
            }
        } else if (repository.findAllOfType(ApiEntity.class).stream()
                .flatMap(a -> a.operations().stream()).anyMatch(o -> o.id().equals(target))) {
            if (!gateway.apiOperationIds().contains(target)) {
                repository.save(gateway.withApiOperationIds(
                        appended(gateway.apiOperationIds(), target)));
            }
        } else if (repository.findById(target, UseCaseEntity.class).isPresent()) {
            if (!gateway.useCaseIds().contains(target)) {
                repository.save(gateway.withUseCaseIds(appended(gateway.useCaseIds(), target)));
            }
        } else if (repository.findById(target, RagEntity.class).isPresent()) {
            if (!gateway.ragIds().contains(target)) {
                repository.save(gateway.withRagIds(appended(gateway.ragIds(), target)));
            }
        } else {
            throw new IllegalArgumentException(
                    "Un gateway MCP expone servidores MCP, APIs, operaciones, casos de uso o RAGs;"
                            + " destino desconocido: " + target);
        }
    }

    private void removeGatewayExposure(EditorCommand command) {
        repository.findById(command.sourceId(), McpGatewayEntity.class).ifPresent(g ->
                repository.save(g
                        .withMcpServerIds(without(g.mcpServerIds(), command.targetId()))
                        .withApiIds(without(g.apiIds(), command.targetId()))
                        .withApiOperationIds(without(g.apiOperationIds(), command.targetId()))
                        .withUseCaseIds(without(g.useCaseIds(), command.targetId()))
                        .withRagIds(without(g.ragIds(), command.targetId()))));
    }

    /** Agent → gateway: the agent consumes the gateway's curated tool surface. */
    private void addAgentGateway(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        repository.findById(command.targetId(), McpGatewayEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown MCP gateway: " + command.targetId()));
        if (agent.mcpGatewayIds().contains(command.targetId())) return;
        repository.save(agent.withMcpGatewayIds(appended(agent.mcpGatewayIds(), command.targetId())));
    }

    private void removeAgentGateway(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withMcpGatewayIds(
                        without(agent.mcpGatewayIds(), command.targetId()))));
    }

    /** Agent → API operation: the operation joins the agent's tool surface. */
    /** The whole API (or proxy) as a tool: every operation of it, present and future. */
    private void addAgentApi(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown AI agent: " + command.sourceId()));
        if (repository.findById(command.targetId(), ApiEntity.class).isEmpty()
                && repository.findById(command.targetId(), ProxyApiEntity.class).isEmpty()) {
            throw new IllegalArgumentException("API desconocida: " + command.targetId());
        }
        if (agent.allowedApiIds().contains(command.targetId())) return;
        repository.save(agent.withAllowedApiIds(
                appended(agent.allowedApiIds(), command.targetId())));
    }

    private void removeAgentApi(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(a ->
                repository.save(a.withAllowedApiIds(
                        without(a.allowedApiIds(), command.targetId()))));
    }

    private void addAgentApiOperation(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        var known = repository.findAllOfType(ApiEntity.class).stream()
                .flatMap(a -> a.operations().stream())
                .anyMatch(o -> o.id().equals(command.targetId()));
        if (!known) {
            throw new IllegalArgumentException("Unknown API operation: " + command.targetId());
        }
        if (agent.allowedApiOperationIds().contains(command.targetId())) return;
        repository.save(agent.withAllowedApiOperationIds(
                appended(agent.allowedApiOperationIds(), command.targetId())));
    }

    private void removeAgentApiOperation(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withAllowedApiOperationIds(
                        without(agent.allowedApiOperationIds(), command.targetId()))));
    }

    /** Agent → query service: a read tool. */
    private void addAgentQuery(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        repository.findById(command.targetId(), QueryServiceEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown query service: " + command.targetId()));
        if (agent.allowedQueryServiceIds().contains(command.targetId())) return;
        repository.save(agent.withAllowedQueryServiceIds(
                appended(agent.allowedQueryServiceIds(), command.targetId())));
    }

    private void removeAgentQuery(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withAllowedQueryServiceIds(
                        without(agent.allowedQueryServiceIds(), command.targetId()))));
    }

    /** Agent → agent: delegation. Self-delegation is rejected; cycles are the linter's job. */
    private void addAgentDelegate(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        repository.findById(command.targetId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.targetId()));
        if (command.sourceId().equals(command.targetId())) {
            throw new IllegalArgumentException("Un agente no puede delegar en sí mismo");
        }
        if (agent.delegateAgentIds().contains(command.targetId())) return;
        repository.save(agent.withDelegateAgentIds(
                appended(agent.delegateAgentIds(), command.targetId())));
    }

    private void removeAgentDelegate(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withDelegateAgentIds(
                        without(agent.delegateAgentIds(), command.targetId()))));
    }

    /** Actor → agent: the person talks to the agent (a chat/supervision UI derives). */
    private void addActorAgent(EditorCommand command) {
        var role = repository.findById(command.sourceId(), RoleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown actor: " + command.sourceId()));
        repository.findById(command.targetId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.targetId()));
        if (role.aiAgentIds().contains(command.targetId())) return;
        repository.save(role.withAiAgentIds(appended(role.aiAgentIds(), command.targetId())));
    }

    private void removeActorAgent(EditorCommand command) {
        repository.findById(command.sourceId(), RoleEntity.class).ifPresent(role ->
                repository.save(role.withAiAgentIds(
                        without(role.aiAgentIds(), command.targetId()))));
    }

    /** Event → agent: the event triggers a run of the agent (reactive agents). */
    private void addAgentTrigger(EditorCommand command) {
        var agent = repository.findById(command.targetId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.targetId()));
        var eventExists = repository.findById(command.sourceId(), DomainEventEntity.class).isPresent()
                || repository.findById(command.sourceId(), ApplicationEventEntity.class).isPresent();
        if (!eventExists) {
            throw new IllegalArgumentException(
                    "Unknown domain/application event: " + command.sourceId());
        }
        if (agent.reactsToEventIds().contains(command.sourceId())) return;
        repository.save(agent.withReactsToEventIds(
                appended(agent.reactsToEventIds(), command.sourceId())));
    }

    private void removeAgentTrigger(EditorCommand command) {
        repository.findById(command.targetId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withReactsToEventIds(
                        without(agent.reactsToEventIds(), command.sourceId()))));
    }

    /** The API gets (another) implementation site: a bounded context of ours (same API, no copy). */
    private void addApiImplementation(EditorCommand command) {
        var api = repository.findById(command.apiId(), ApiEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown API: " + command.apiId()));
        if (repository.findById(command.moduleId(), ModuleEntity.class).isEmpty()) {
            throw new IllegalArgumentException("Unknown bounded context: " + command.moduleId());
        }
        if (api.implementedByModuleIds().contains(command.moduleId())) return;
        repository.save(api.withImplementedByModuleIds(
                appended(api.implementedByModuleIds(), command.moduleId())));
    }

    private void removeApiImplementation(EditorCommand command) {
        repository.findById(command.apiId(), ApiEntity.class).ifPresent(api ->
                repository.save(api.withImplementedByModuleIds(
                        without(api.implementedByModuleIds(), command.moduleId()))));
    }

    /** Route ONE proxy operation to an implementation site of the API the proxy fronts. */
    private void addProxyOperationRoute(EditorCommand command) {
        var proxy = repository.findById(command.proxyId(), ProxyApiEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown proxy: " + command.proxyId()));
        var route = new ProxyOperationRouteEntity(command.operationId(), command.targetSiteId());
        if (proxy.operationRoutes().contains(route)) return;
        var routes = new java.util.ArrayList<>(proxy.operationRoutes());
        routes.add(route);
        repository.save(proxy.withOperationRoutes(java.util.List.copyOf(routes)));
    }

    private void removeProxyOperationRoute(EditorCommand command) {
        repository.findById(command.proxyId(), ProxyApiEntity.class).ifPresent(proxy -> {
            var routes = proxy.operationRoutes().stream()
                    .filter(r -> !(r.operationId().equals(command.operationId())
                            && r.targetSiteId().equals(command.targetSiteId())))
                    .toList();
            repository.save(proxy.withOperationRoutes(routes));
        });
    }

    /** Per-site wiring: the use case implementing an operation AT an implementation site. */
    private void setApiOperationImplementation(EditorCommand command) {
        var api = repository.findById(command.apiId(), ApiEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown API: " + command.apiId()));
        var wires = new java.util.ArrayList<>(api.operationImplementations().stream()
                .filter(w -> !(w.operationId().equals(command.operationId())
                        && w.moduleId().equals(command.moduleId())))
                .toList());
        wires.add(new ApiOperationImplementationEntity(
                command.operationId(), command.moduleId(), command.targetUseCaseId()));
        repository.save(api.withOperationImplementations(java.util.List.copyOf(wires)));
    }

    private void removeApiOperationImplementation(EditorCommand command) {
        repository.findById(command.apiId(), ApiEntity.class).ifPresent(api ->
                repository.save(api.withOperationImplementations(
                        api.operationImplementations().stream()
                                .filter(w -> !(w.operationId().equals(command.operationId())
                                        && w.moduleId().equals(command.moduleId())))
                                .toList())));
    }

    /** An external system calls one API operation at a site (published API, proxy or implementation). */
    private void addExternalOperationUse(EditorCommand command) {
        var project = owningProject();
        var externalSystems = new ArrayList<>(project.externalSystems());
        var external = externalSystems.stream()
                .filter(x -> x.id().equals(command.sourceId()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown external system: " + command.sourceId()));
        var use = new ExternalApiOperationUseEntity(command.operationId(), command.targetSiteId());
        if (external.apiOperationUses().contains(use)) return;
        var uses = new ArrayList<>(external.apiOperationUses());
        uses.add(use);
        externalSystems.set(externalSystems.indexOf(external),
                external.withApiOperationUses(java.util.List.copyOf(uses)));
        repository.save(withExternalSystems(project, externalSystems));
    }

    private void removeExternalOperationUse(EditorCommand command) {
        var project = owningProject();
        var externalSystems = new ArrayList<>(project.externalSystems());
        externalSystems.stream()
                .filter(x -> x.id().equals(command.sourceId()))
                .findFirst()
                .ifPresent(external -> {
                    var uses = external.apiOperationUses().stream()
                            .filter(u -> !(u.operationId().equals(command.operationId())
                                    && u.siteId().equals(command.targetSiteId())))
                            .toList();
                    externalSystems.set(externalSystems.indexOf(external),
                            external.withApiOperationUses(uses));
                    repository.save(withExternalSystems(project, externalSystems));
                });
    }

    private static List<String> appended(List<String> ids, String id) {
        var copy = new ArrayList<>(ids);
        copy.add(id);
        return copy;
    }

    private static List<String> without(List<String> ids, String id) {
        return ids.stream().filter(x -> !x.equals(id)).toList();
    }

    /** Agent → use case: record the consumption and expose the use case through MCP. */
    private void addAgentUse(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        var useCase = repository.findById(command.targetId(), UseCaseEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown use case: " + command.targetId()));
        if (!agent.allowedUseCaseIds().contains(useCase.id())) {
            var ids = new ArrayList<>(agent.allowedUseCaseIds());
            ids.add(useCase.id());
            repository.save(withAllowedUseCaseIds(agent, ids));
        }
        if (!useCase.exposedAsMcp()) {
            repository.save(withExposedAsMcp(useCase, true));
        }
    }

    private void removeAgentUse(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(withAllowedUseCaseIds(agent, agent.allowedUseCaseIds().stream()
                        .filter(id -> !id.equals(command.targetId())).toList())));
        clearMcpExposureIfUnused(command.targetId());
    }

    /** Agent → external-system operation: the other half of the agent's tool surface. */
    private void addAgentExternalUse(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        var known = owningProject().externalSystems().stream()
                .flatMap(x -> x.useCases().stream())
                .anyMatch(u -> u.id().equals(command.targetId()));
        if (!known) {
            throw new IllegalArgumentException(
                    "Unknown external use case: " + command.targetId());
        }
        if (agent.allowedExternalUseCaseIds().contains(command.targetId())) return;
        var ids = new ArrayList<>(agent.allowedExternalUseCaseIds());
        ids.add(command.targetId());
        repository.save(agent.withAllowedExternalUseCaseIds(ids));
    }

    private void removeAgentExternalUse(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withAllowedExternalUseCaseIds(
                        agent.allowedExternalUseCaseIds().stream()
                                .filter(id -> !id.equals(command.targetId())).toList())));
    }

    /** Agent → MCP server published by an external system: another tool surface. */
    private void addAgentMcp(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        var known = owningProject().externalSystems().stream()
                .flatMap(x -> x.mcpServers().stream())
                .anyMatch(s -> s.id().equals(command.targetId()));
        if (!known) {
            throw new IllegalArgumentException("Unknown MCP server: " + command.targetId());
        }
        if (agent.allowedMcpServerIds().contains(command.targetId())) return;
        var ids = new ArrayList<>(agent.allowedMcpServerIds());
        ids.add(command.targetId());
        repository.save(agent.withAllowedMcpServerIds(ids));
    }

    private void removeAgentMcp(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withAllowedMcpServerIds(
                        agent.allowedMcpServerIds().stream()
                                .filter(id -> !id.equals(command.targetId())).toList())));
    }

    /** Record copy with only allowedUseCaseIds replaced — every other field preserved verbatim. */
    private static AiAgentEntity withAllowedUseCaseIds(AiAgentEntity a, List<String> ids) {
        return a.withAllowedUseCaseIds(ids);
    }

    /** Record copy with only ragIds replaced — every other field preserved verbatim. */
    private static AiAgentEntity withRagIds(AiAgentEntity a, List<String> ragIds) {
        return a.withRagIds(ragIds);
    }

    private void addRag(EditorCommand command) {
        if (repository.findById(command.id(), RagEntity.class).isPresent()) return;
        repository.save(new RagEntity(command.id(), command.name(), null, List.of()));
    }

    /** Removing a knowledge base also unlinks it from agents and gateways that exposed it. */
    private void removeRag(EditorCommand command) {
        repository.findAllOfType(AiAgentEntity.class).stream()
                .filter(a -> a.ragIds().contains(command.id()))
                .forEach(a -> repository.save(withRagIds(a, a.ragIds().stream()
                        .filter(id -> !id.equals(command.id())).toList())));
        repository.findAllOfType(McpGatewayEntity.class).stream()
                .filter(g -> g.ragIds().contains(command.id()))
                .forEach(g -> repository.save(g.withRagIds(without(g.ragIds(), command.id()))));
        repository.deleteAllById(List.of(command.id()), RagEntity.class);
    }

    /** Agent → knowledge base: the agent grounds its answers on this RAG. */
    private void addAgentRag(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        repository.findById(command.targetId(), RagEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown RAG: " + command.targetId()));
        if (agent.ragIds().contains(command.targetId())) return;
        var ids = new ArrayList<>(agent.ragIds());
        ids.add(command.targetId());
        repository.save(withRagIds(agent, ids));
    }

    private void removeAgentRag(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(withRagIds(agent, agent.ragIds().stream()
                        .filter(id -> !id.equals(command.targetId())).toList())));
    }

    /** RAG → read model: the knowledge base indexes the read model's content. */
    /** The RAG indexes a read model, an external system's table, or an API/proxy. */
    private void addRagSource(EditorCommand command) {
        var rag = repository.findById(command.sourceId(), RagEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown RAG: " + command.sourceId()));
        var target = command.targetId();
        if (repository.findById(target, ReadModelEntity.class).isPresent()) {
            if (rag.sourceReadModelIds().contains(target)) return;
            repository.save(rag.withSourceReadModelIds(appended(rag.sourceReadModelIds(), target)));
            return;
        }
        var isExternalTable = currentProject().stream()
                .flatMap(pr -> pr.externalSystems().stream())
                .flatMap(x -> x.tables().stream())
                .anyMatch(t -> t.id().equals(target));
        if (isExternalTable) {
            if (rag.sourceExternalTableIds().contains(target)) return;
            repository.save(rag.withSourceExternalTableIds(
                    appended(rag.sourceExternalTableIds(), target)));
            return;
        }
        if (repository.findById(target, ApiEntity.class).isPresent()
                || repository.findById(target, ProxyApiEntity.class).isPresent()) {
            if (rag.sourceApiIds().contains(target)) return;
            repository.save(rag.withSourceApiIds(appended(rag.sourceApiIds(), target)));
            return;
        }
        if (currentProject().stream().flatMap(pr -> pr.externalSystems().stream())
                .anyMatch(x -> x.id().equals(target))) {
            if (rag.sourceExternalSystemIds().contains(target)) return;
            repository.save(rag.withSourceExternalSystemIds(
                    appended(rag.sourceExternalSystemIds(), target)));
            return;
        }
        if (repository.findById(target, ModuleEntity.class).isPresent()) {
            if (rag.sourceModuleIds().contains(target)) return;
            repository.save(rag.withSourceModuleIds(appended(rag.sourceModuleIds(), target)));
            return;
        }
        throw new IllegalArgumentException(
                "El RAG indexa read models, tablas externas, APIs, sistemas externos o contextos; destino desconocido: "
                        + target);
    }

    private void removeRagSource(EditorCommand command) {
        repository.findById(command.sourceId(), RagEntity.class).ifPresent(rag ->
                repository.save(rag
                        .withSourceReadModelIds(without(rag.sourceReadModelIds(), command.targetId()))
                        .withSourceExternalTableIds(
                                without(rag.sourceExternalTableIds(), command.targetId()))
                        .withSourceApiIds(without(rag.sourceApiIds(), command.targetId()))
                        .withSourceExternalSystemIds(
                                without(rag.sourceExternalSystemIds(), command.targetId()))
                        .withSourceModuleIds(without(rag.sourceModuleIds(), command.targetId()))));
    }

    /** External content feeding the RAG: a repo, a web site, an FTP server… */
    private void addRagContentSource(EditorCommand command) {
        var rag = repository.findById(command.sourceId(), RagEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown RAG: " + command.sourceId()));
        if (command.uri() == null || command.uri().isBlank()) {
            throw new IllegalArgumentException("La fuente necesita una URI");
        }
        if (rag.contentSources().stream().anyMatch(s -> command.uri().equals(s.uri()))) return;
        var sources = new ArrayList<>(rag.contentSources());
        sources.add(new RagContentSourceEntity(
                command.type() == null ? "WEB" : command.type(), command.uri()));
        repository.save(rag.withContentSources(sources));
    }

    private void removeRagContentSource(EditorCommand command) {
        repository.findById(command.sourceId(), RagEntity.class).ifPresent(rag ->
                repository.save(new RagEntity(rag.id(), rag.name(), rag.description(),
                        rag.sourceReadModelIds(),
                        rag.contentSources().stream()
                                .filter(s -> !s.uri().equals(command.uri())).toList())));
    }

    /** Adds a catalog element to a CURATED view (searchable from the toolbar). */
    private void addViewMember(EditorCommand command) {
        var view = repository.findById(command.id(), ViewEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown view: " + command.id()));
        if (view.isComputed()) {
            throw new IllegalArgumentException(
                    "La vista " + view.name() + " es computada; sus miembros se derivan del seed");
        }
        if (view.memberIds().contains(command.targetId())) return;
        var members = new ArrayList<>(view.memberIds());
        members.add(command.targetId());
        repository.save(new ViewEntity(view.id(), view.name(), view.description(), view.kind(),
                members, view.seedId()));
    }

    /** Removes an element from the view WITHOUT touching the element itself. */
    private void removeViewMember(EditorCommand command) {
        repository.findById(command.id(), ViewEntity.class).ifPresent(view ->
                repository.save(new ViewEntity(view.id(), view.name(), view.description(),
                        view.kind(),
                        view.memberIds().stream()
                                .filter(id -> !id.equals(command.targetId())).toList(),
                        view.seedId())));
    }

    /** exposedAsMcp holds only while some agent consumes the use case. */
    private void clearMcpExposureIfUnused(String useCaseId) {
        var stillUsed = repository.findAllOfType(AiAgentEntity.class).stream()
                .anyMatch(a -> a.allowedUseCaseIds().contains(useCaseId));
        if (stillUsed) return;
        repository.findById(useCaseId, UseCaseEntity.class)
                .filter(UseCaseEntity::exposedAsMcp)
                .ifPresent(uc -> repository.save(withExposedAsMcp(uc, false)));
    }

    /** Record copy with only exposedAsMcp replaced — every other field preserved verbatim. */
    private static UseCaseEntity withExposedAsMcp(UseCaseEntity uc, boolean exposedAsMcp) {
        return new UseCaseEntity(
                uc.id(), uc.name(), uc.exposedAsRest(), uc.exposedAsGrpc(), exposedAsMcp,
                uc.exposedAsAsync(), uc.exposedAsUi(), uc.inputModelId(), uc.outputModelId(), uc.steps(),
                uc.allowedRoles(), uc.allowedScopes(), uc.apiVersion(), uc.mcpDescription(),
                uc.restHttpMethod(), uc.restPath(), uc.asyncRetryCount(), uc.asyncDeadLetterQueue(),
                uc.asyncOrderingKey(), uc.asyncTopicName(), uc.asyncConsumerGroup(), uc.cacheable(),
                uc.cacheTtlSeconds(), uc.timeoutMs(), uc.transactionBoundary(), uc.idempotencyEnabled(),
                uc.idempotencyKeyField(), uc.rateLimitEnabled(), uc.rateLimitRequestsPerSecond(),
                uc.grpcServiceName(), uc.grpcMethodName(), uc.decisionIds(), uc.policy());
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

    // ---- UI map commands (apps, pages, menus, buttons, actor→app) ----------

    private void createUiApp(EditorCommand command) {
        if (repository.findById(command.id(), UiAdapterEntity.class).isPresent()) return;
        var appType = command.type() == null || command.type().isBlank()
                ? io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAppType.APP
                : io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAppType.valueOf(command.type());
        repository.save(new UiAdapterEntity(command.id(), command.name(), null,
                command.name(), null, null, List.of(), appType, null, null, null));
    }

    /** MASTER_DETAIL: the page shown as the header; null clears it. */
    private void setAppHeaderPage(EditorCommand command) {
        var app = repository.findById(command.appId(), UiAdapterEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.appId()));
        if (command.pageId() != null && !command.pageId().isBlank()) {
            repository.findById(command.pageId(), PageEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        }
        repository.save(new UiAdapterEntity(app.id(), app.name(), app.serviceId(), app.title(),
                app.path(), app.appVariant(), app.menuItems(), app.appType(),
                command.pageId() == null || command.pageId().isBlank() ? null : command.pageId(),
                app.homePageId(), app.homeAppId()));
    }

    /** What the app opens first — a page (pageId) or another app (toAppId); null clears. */
    private void setAppHomePage(EditorCommand command) {
        var app = repository.findById(command.appId(), UiAdapterEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.appId()));
        if (app.appType() == io.mateu.modux.modeldrivengenerator.domain.aggregates.uiadapter.vo.UiAppType.MASTER_DETAIL) {
            throw new IllegalArgumentException(
                    "Un maestro-detalle no tiene home: solo cabecera y pestañas");
        }
        var pageId = command.pageId() == null || command.pageId().isBlank() ? null : command.pageId();
        var toAppId = command.toAppId() == null || command.toAppId().isBlank() ? null : command.toAppId();
        if (pageId != null) {
            repository.findById(pageId, PageEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + pageId));
        }
        if (toAppId != null) {
            if (toAppId.equals(app.id())) {
                throw new IllegalArgumentException("Una app no puede ser su propia home");
            }
            repository.findById(toAppId, UiAdapterEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + toAppId));
        }
        repository.save(new UiAdapterEntity(app.id(), app.name(), app.serviceId(), app.title(),
                app.path(), app.appVariant(), app.menuItems(), app.appType(), app.headerPageId(),
                toAppId != null ? null : pageId, toAppId));
    }

    /** WIZARD: appends the page as a step (or moves it before another step's page). */
    private void addPageWizardStep(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        var step = repository.findById(command.targetId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.targetId()));
        if (page.id().equals(step.id())) {
            throw new IllegalArgumentException("Un wizard no puede contenerse a sí mismo");
        }
        var steps = new ArrayList<>(page.wizardSteps() == null
                ? List.<PageWizardStepEntity>of() : page.wizardSteps());
        if (steps.stream().anyMatch(s -> step.id().equals(s.pageId()))) return;
        steps.add(new PageWizardStepEntity(step.id(),
                command.label() != null ? command.label() : step.name()));
        repository.save(withWizardSteps(page, steps));
    }

    private void removePageWizardStep(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        var steps = (page.wizardSteps() == null ? List.<PageWizardStepEntity>of() : page.wizardSteps()).stream()
                .filter(s -> !command.targetId().equals(s.pageId()))
                .toList();
        repository.save(withWizardSteps(page, steps));
    }

    /** WIZARD: re-slots the step `targetId` before `beforeItemId` (append when null). */
    private void movePageWizardStep(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        var steps = page.wizardSteps() == null ? List.<PageWizardStepEntity>of() : page.wizardSteps();
        var moving = steps.stream().filter(s -> command.targetId().equals(s.pageId())).findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown wizard step: " + command.targetId()));
        var rest = new ArrayList<>(steps.stream()
                .filter(s -> !command.targetId().equals(s.pageId())).toList());
        var at = command.beforeItemId() == null ? -1
                : java.util.stream.IntStream.range(0, rest.size())
                        .filter(i -> command.beforeItemId().equals(rest.get(i).pageId()))
                        .findFirst().orElse(-1);
        if (at < 0) rest.add(moving); else rest.add(at, moving);
        repository.save(withWizardSteps(page, rest));
    }

    /** Record copy with only wizardSteps replaced. */
    private static PageEntity withWizardSteps(PageEntity page, List<PageWizardStepEntity> steps) {
        return new PageEntity(page.id(), page.name(), page.route(), page.type(),
                page.aggregateId(), page.modelId(), page.componentIds(), page.listingDataSourceType(),
                page.listingGatewayId(), page.toolbar(), page.bottomBar(), page.triggers(), page.rules(),
                page.validations(), page.fieldConfigs(), steps, page.completionActions(),
                page.listingQueryServiceId(), page.content());
    }

    /** Removing an app also unlinks it from every actor that used it. */
    private void deleteUiApp(EditorCommand command) {
        repository.findAllOfType(RoleEntity.class).stream()
                .filter(r -> r.uiAdapterIds().contains(command.id()))
                .forEach(r -> repository.save(r.withUiAdapterIds(
                        without(r.uiAdapterIds(), command.id()))));
        // menu entries of OTHER apps pointing at this one lose their target, not their place
        for (var other : repository.findAllOfType(UiAdapterEntity.class)) {
            if (other.id().equals(command.id())) continue;
            var cleared = withoutMenuAppRefs(other.menuItems(), command.id());
            if (cleared != null) repository.save(withMenuItems(other, cleared));
            var reloaded = repository.findById(other.id(), UiAdapterEntity.class).orElse(other);
            if (command.id().equals(reloaded.homeAppId())) {
                repository.save(new UiAdapterEntity(reloaded.id(), reloaded.name(),
                        reloaded.serviceId(), reloaded.title(), reloaded.path(),
                        reloaded.appVariant(), reloaded.menuItems(), reloaded.appType(),
                        reloaded.headerPageId(), reloaded.homePageId(), null));
            }
        }
        repository.deleteAllById(List.of(command.id()), UiAdapterEntity.class);
    }

    /** The tree with every reference to the given app cleared, or null when there were none. */
    private static List<UiMenuItemEntity> withoutMenuAppRefs(List<UiMenuItemEntity> items,
                                                             String appId) {
        if (items == null) return null;
        var changed = false;
        var copy = new ArrayList<UiMenuItemEntity>();
        for (var item : items) {
            var clearedChildren = withoutMenuAppRefs(item.children(), appId);
            var hit = appId.equals(item.uiAdapterId());
            if (hit || clearedChildren != null) changed = true;
            copy.add(new UiMenuItemEntity(item.label(), item.icon(), item.description(),
                    item.route(), item.pageId(),
                    clearedChildren != null ? clearedChildren
                            : item.children() == null ? List.of() : item.children(),
                    item.id(), hit ? null : item.uiAdapterId(), item.useCaseId(),
                    item.aggregateId(), item.queryServiceId(), item.queryOperationId()));
        }
        return changed ? copy : null;
    }

    private void createUiPage(EditorCommand command) {
        if (repository.findById(command.id(), PageEntity.class).isPresent()) return;
        var type = command.pageType() == null || command.pageType().isBlank()
                ? "PAGE" : command.pageType();
        repository.save(new PageEntity(command.id(), command.name(), "/" + command.id(), type,
                null, null, List.of(), null, null, List.of(), List.of(), List.of(), List.of(),
                List.of(), List.of(), List.of(), List.of(), null, List.of()));
        if (command.appId() == null || command.appId().isBlank()) return;
        // Born reachable: the page hangs from the app's menu right away.
        var app = repository.findById(command.appId(), UiAdapterEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.appId()));
        var label = command.menuLabel() == null || command.menuLabel().isBlank()
                ? command.name() : command.menuLabel();
        var items = new ArrayList<>(app.menuItems() == null
                ? List.<UiMenuItemEntity>of() : app.menuItems());
        items.add(new UiMenuItemEntity(label, null, null, null, command.id(), List.of()));
        repository.save(withMenuItems(app, items));
    }

    /** Removing a page also drops every menu entry pointing at it, in any app at any depth. */
    private void deleteUiPage(EditorCommand command) {
        for (var app : repository.findAllOfType(UiAdapterEntity.class)) {
            var items = app.menuItems() == null ? List.<UiMenuItemEntity>of() : app.menuItems();
            var pruned = withoutMenuEntriesFor(items, command.id());
            var header = command.id().equals(app.headerPageId()) ? null : app.headerPageId();
            var home = command.id().equals(app.homePageId()) ? null : app.homePageId();
            if (!pruned.equals(items)
                    || !java.util.Objects.equals(header, app.headerPageId())
                    || !java.util.Objects.equals(home, app.homePageId())) {
                repository.save(new UiAdapterEntity(app.id(), app.name(), app.serviceId(),
                        app.title(), app.path(), app.appVariant(), pruned, app.appType(),
                        header, home, app.homeAppId()));
            }
        }
        // wizard pages lose the deleted page as a step
        for (var pg : repository.findAllOfType(PageEntity.class)) {
            if (pg.id().equals(command.id()) || pg.wizardSteps() == null) continue;
            var kept = pg.wizardSteps().stream()
                    .filter(s -> !command.id().equals(s.pageId())).toList();
            if (kept.size() != pg.wizardSteps().size()) {
                repository.save(withWizardSteps(pg, kept));
            }
        }
        repository.deleteAllById(List.of(command.id()), PageEntity.class);
    }

    private void addMenuItem(EditorCommand command) {
        var app = repository.findById(command.appId(), UiAdapterEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.appId()));
        var items = app.menuItems() == null ? List.<UiMenuItemEntity>of() : app.menuItems();
        var entry = new UiMenuItemEntity(command.label(), null, null, null,
                command.pageId(), List.of(),
                command.itemId() != null ? command.itemId() : newMenuItemId(items, command.label()));
        var hasParent = (command.parentId() != null && !command.parentId().isBlank())
                || (command.parentLabel() != null && !command.parentLabel().isBlank());
        if (!hasParent) {
            var copy = new ArrayList<>(items);
            copy.add(entry);
            repository.save(withMenuItems(app, copy));
            return;
        }
        var inserted = insertedUnderParent(items, command.parentId(), command.parentLabel(), entry);
        if (inserted == null) {
            throw new IllegalArgumentException(
                    "Unknown menu item: " + (command.parentId() != null ? command.parentId() : command.parentLabel()));
        }
        repository.save(withMenuItems(app, inserted));
    }

    private void removeMenuItem(EditorCommand command) {
        repository.findById(command.appId(), UiAdapterEntity.class).ifPresent(app -> {
            var pruned = withoutFirstMatching(app.menuItems(), command.itemId(), command.label());
            if (pruned != null) {
                repository.save(withMenuItems(app, pruned));
            }
        });
    }

    /** Points a menu entry at an APP — an app is just another UI component, like a page. */
    private void setMenuApp(EditorCommand command) {
        var app = repository.findById(command.appId(), UiAdapterEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.appId()));
        if (command.toAppId() != null) {
            repository.findById(command.toAppId(), UiAdapterEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.toAppId()));
        }
        var updated = withMenuTarget(app.menuItems(), command.itemId(), command.label(),
                item -> retargeted(item, null, command.toAppId(), null, null, null, null));
        if (updated == null) {
            throw new IllegalArgumentException(
                    "Unknown menu item: " + (command.itemId() != null ? command.itemId() : command.label()));
        }
        repository.save(withMenuItems(app, updated));
    }



    /** Points a menu entry at a USE CASE — third kind of target, same exclusivity. */
    private void setMenuUseCase(EditorCommand command) {
        var app = repository.findById(command.appId(), UiAdapterEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.appId()));
        if (command.useCaseId() != null) {
            repository.findById(command.useCaseId(), UseCaseEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unknown use case: " + command.useCaseId()));
        }
        var updated = withMenuTarget(app.menuItems(), command.itemId(), command.label(),
                item -> retargeted(item, null, null, command.useCaseId(), null, null, null));
        if (updated == null) {
            throw new IllegalArgumentException(
                    "Unknown menu item: " + (command.itemId() != null ? command.itemId() : command.label()));
        }
        repository.save(withMenuItems(app, updated));
    }

    /** Points a menu entry at an AGGREGATE — a CRUD over it is inferred downstream. */
    private void setMenuAggregate(EditorCommand command) {
        var app = repository.findById(command.appId(), UiAdapterEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.appId()));
        if (command.aggregateId() != null) {
            repository.findById(command.aggregateId(), AggregateEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unknown aggregate: " + command.aggregateId()));
        }
        var updated = withMenuTarget(app.menuItems(), command.itemId(), command.label(),
                item -> retargeted(item, null, null, null, command.aggregateId(), null, null));
        if (updated == null) {
            throw new IllegalArgumentException(
                    "Unknown menu item: " + (command.itemId() != null ? command.itemId() : command.label()));
        }
        repository.save(withMenuItems(app, updated));
    }

    /** Points a menu entry at a QUERY SERVICE OPERATION — a filtered listing is inferred. */
    private void setMenuQueryOperation(EditorCommand command) {
        var app = repository.findById(command.appId(), UiAdapterEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.appId()));
        if (command.queryOperationId() != null) {
            var service = repository.findById(command.queryServiceId(), QueryServiceEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unknown query service: " + command.queryServiceId()));
            var known = (service.operations() == null ? List.<QueryOperationEntity>of() : service.operations())
                    .stream().anyMatch(op -> command.queryOperationId().equals(op.id()));
            if (!known) {
                throw new IllegalArgumentException("Unknown query operation: "
                        + command.queryOperationId() + " en " + command.queryServiceId());
            }
        }
        var updated = withMenuTarget(app.menuItems(), command.itemId(), command.label(),
                item -> retargeted(item, null, null, null, null,
                        command.queryOperationId() == null ? null : command.queryServiceId(),
                        command.queryOperationId()));
        if (updated == null) {
            throw new IllegalArgumentException(
                    "Unknown menu item: " + (command.itemId() != null ? command.itemId() : command.label()));
        }
        repository.save(withMenuItems(app, updated));
    }

    /** Moves a menu entry (subtree included) to another app's menu root. */
    /**
     * Moves an entry (subtree included) anywhere in the menu forest: to another app,
     * under a parent entry (nesting — the parent becomes a grouper), to the root
     * (promotion), and into a concrete slot (`beforeItemId`). Same-app moves reorder.
     */
    private void moveMenuItem(EditorCommand command) {
        var source = repository.findById(command.appId(), UiAdapterEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.appId()));
        var target = repository.findById(command.toAppId(), UiAdapterEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.toAppId()));
        var entry = findMenuItem(source.menuItems(), command.itemId(), command.label());
        if (entry == null) {
            throw new IllegalArgumentException(
                    "Unknown menu item: " + (command.itemId() != null ? command.itemId() : command.label()));
        }
        if (command.parentId() != null
                && findMenuItem(List.of(entry), command.parentId(), null) != null) {
            throw new IllegalArgumentException("Una opción no puede moverse dentro de sí misma");
        }
        var pruned = withoutFirstMatching(source.menuItems(), command.itemId(), command.label());
        repository.save(withMenuItems(source, pruned == null ? source.menuItems() : pruned));
        var reloaded = repository.findById(command.toAppId(), UiAdapterEntity.class).orElse(target);
        var items = reloaded.menuItems() == null
                ? List.<UiMenuItemEntity>of() : reloaded.menuItems();
        List<UiMenuItemEntity> placed = command.parentId() == null || command.parentId().isBlank()
                ? insertedMenu(items, entry, command.beforeItemId())
                : withMenuChildInserted(items, command.parentId(), entry, command.beforeItemId());
        if (placed == null) {
            throw new IllegalArgumentException("Unknown menu item: " + command.parentId());
        }
        repository.save(withMenuItems(reloaded, placed));
    }

    /** The list with `entry` inserted before `beforeId` (append when null or absent). */
    private static List<UiMenuItemEntity> insertedMenu(List<UiMenuItemEntity> items,
                                                       UiMenuItemEntity entry, String beforeId) {
        var out = new ArrayList<>(items);
        var at = beforeId == null ? -1
                : java.util.stream.IntStream.range(0, out.size())
                        .filter(i -> beforeId.equals(out.get(i).id()))
                        .findFirst().orElse(-1);
        if (at < 0) out.add(entry); else out.add(at, entry);
        return out;
    }

    /** The forest with `entry` hung from the entry `parentId`, wherever it lives; null if absent. */
    private static List<UiMenuItemEntity> withMenuChildInserted(List<UiMenuItemEntity> items,
                                                                String parentId,
                                                                UiMenuItemEntity entry,
                                                                String beforeId) {
        var out = new ArrayList<UiMenuItemEntity>();
        var found = false;
        for (var it : items) {
            if (parentId.equals(it.id())) {
                found = true;
                var children = it.children() == null ? List.<UiMenuItemEntity>of() : it.children();
                out.add(withChildren(it, insertedMenu(children, entry, beforeId)));
                continue;
            }
            var children = it.children() == null ? List.<UiMenuItemEntity>of() : it.children();
            var nested = withMenuChildInserted(children, parentId, entry, beforeId);
            if (nested != null) {
                found = true;
                out.add(withChildren(it, nested));
            } else {
                out.add(it);
            }
        }
        return found ? out : null;
    }


    private static UiMenuItemEntity findMenuItem(List<UiMenuItemEntity> items,
                                                 String itemId, String label) {
        for (var item : items == null ? List.<UiMenuItemEntity>of() : items) {
            if (menuItemMatches(item, itemId, label)) return item;
            var hit = findMenuItem(item.children(), itemId, label);
            if (hit != null) return hit;
        }
        return null;
    }

    /** Points a menu entry (by stable id, or by label on pre-id entries) at a page. */
    private void setMenuPage(EditorCommand command) {
        var app = repository.findById(command.appId(), UiAdapterEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.appId()));
        if (command.pageId() != null) {
            repository.findById(command.pageId(), PageEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        }
        var updated = withMenuTarget(app.menuItems(), command.itemId(), command.label(),
                item -> retargeted(item, command.pageId(), null, null, null, null, null));
        if (updated == null) {
            throw new IllegalArgumentException(
                    "Unknown menu item: " + (command.itemId() != null ? command.itemId() : command.label()));
        }
        repository.save(withMenuItems(app, updated));
    }

    private void addPageButton(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        var useCase = repository.findById(command.useCaseId(), UseCaseEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown use case: " + command.useCaseId()));
        var label = command.label() == null || command.label().isBlank()
                ? useCase.name() : command.label();
        var toolbar = new ArrayList<>(page.toolbar() == null
                ? List.<PageButtonEntity>of() : page.toolbar());
        toolbar.add(new PageButtonEntity(label, null, command.useCaseId(), null, null));
        repository.save(withButtons(page, toolbar, page.bottomBar()));
    }

    private void removePageButton(EditorCommand command) {
        repository.findById(command.pageId(), PageEntity.class).ifPresent(page ->
                repository.save(withButtons(page,
                        withoutUseCaseButtons(page.toolbar(), command.useCaseId()),
                        withoutUseCaseButtons(page.bottomBar(), command.useCaseId()))));
    }

    private void setPageListing(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        if (command.queryServiceId() != null) {
            repository.findById(command.queryServiceId(), QueryServiceEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unknown query service: " + command.queryServiceId()));
        }
        repository.save(withListingQueryServiceId(page, command.queryServiceId()));
    }

    private void setPageModel(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        if (command.modelId() != null) {
            repository.findById(command.modelId(), ModelEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unknown model: " + command.modelId()));
        }
        repository.save(withModelId(page, command.modelId()));
    }

    /** Actor → app: the person opens the app (the actor→app link of the UI map). */
    private void addActorApp(EditorCommand command) {
        var role = repository.findById(command.actorId(), RoleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown actor: " + command.actorId()));
        repository.findById(command.appId(), UiAdapterEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown UI app: " + command.appId()));
        if (role.uiAdapterIds().contains(command.appId())) return;
        repository.save(role.withUiAdapterIds(appended(role.uiAdapterIds(), command.appId())));
    }

    private void removeActorApp(EditorCommand command) {
        repository.findById(command.actorId(), RoleEntity.class).ifPresent(role ->
                repository.save(role.withUiAdapterIds(
                        without(role.uiAdapterIds(), command.appId()))));
    }

    /** Record copy with only menuItems replaced — every other field preserved verbatim. */
    private static UiAdapterEntity withMenuItems(UiAdapterEntity app, List<UiMenuItemEntity> menuItems) {
        return new UiAdapterEntity(app.id(), app.name(), app.serviceId(), app.title(),
                app.path(), app.appVariant(), menuItems, app.appType(), app.headerPageId());
    }

    /** Record copy with only toolbar/bottomBar replaced — every other field preserved verbatim. */
    /**
     * The designer's field list: the viewmodel Model's fields, ordered by the page's
     * fieldConfigs (configured fields first, in config order), each merged with its config.
     */
    private List<UiFieldDto> uiFields(PageEntity p) {
        if (p.modelId() == null) return List.of();
        var model = repository.findById(p.modelId(), ModelEntity.class).orElse(null);
        if (model == null || model.fields() == null) return List.of();
        var configs = p.fieldConfigs() == null ? List.<PageFieldConfigEntity>of() : p.fieldConfigs();
        // Authored YAML often declares fields by name only — the name is the identity then.
        var fieldById = new java.util.LinkedHashMap<String, ModelFieldEntity>();
        model.fields().forEach(f -> fieldById.put(f.id() != null ? f.id() : f.name(), f));
        var order = new ArrayList<String>();
        configs.forEach(c -> { if (fieldById.containsKey(c.fieldId()) && !order.contains(c.fieldId())) order.add(c.fieldId()); });
        fieldById.keySet().forEach(id -> { if (!order.contains(id)) order.add(id); });
        var configById = new java.util.HashMap<String, PageFieldConfigEntity>();
        configs.forEach(c -> configById.putIfAbsent(c.fieldId(), c));
        return order.stream().map(id -> {
            var f = fieldById.get(id);
            var c = configById.get(id);
            var type = f.basicType() ? String.valueOf(f.type()) : f.isEnum() ? "ENUM" : "MODEL";
            return new UiFieldDto(id, f.name(), type,
                    c == null ? null : c.stereotype(), c == null ? null : c.colspan(),
                    c == null ? null : c.label(), c == null ? null : c.help());
        }).toList();
    }

    private void setPageFieldConfig(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("No existe la página " + command.pageId()));
        var configs = new ArrayList<>(page.fieldConfigs() == null
                ? List.<PageFieldConfigEntity>of() : page.fieldConfigs());
        var index = -1;
        for (int i = 0; i < configs.size(); i++) {
            if (configs.get(i).fieldId().equals(command.fieldId())) index = i;
        }
        var previous = index >= 0 ? configs.get(index) : null;
        var next = new PageFieldConfigEntity(command.fieldId(), command.stereotype(), command.colspan(),
                previous == null ? null : previous.style(), previous == null ? null : previous.cssClass(),
                command.label(), previous == null ? null : previous.help());
        if (index >= 0) configs.set(index, next); else configs.add(next);
        repository.save(withFieldConfigs(page, configs));
    }

    private void setPageFieldOrder(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("No existe la página " + command.pageId()));
        var configById = new java.util.HashMap<String, PageFieldConfigEntity>();
        (page.fieldConfigs() == null ? List.<PageFieldConfigEntity>of() : page.fieldConfigs())
                .forEach(c -> configById.putIfAbsent(c.fieldId(), c));
        var configs = command.fieldIds().stream()
                .map(id -> configById.getOrDefault(id,
                        new PageFieldConfigEntity(id, null, null, null, null, null, null)))
                .toList();
        repository.save(withFieldConfigs(page, configs));
    }

    // ---- page content tree -------------------------------------------------

    /**
     * Adds a node to the page's content tree: at the root, or appended to the children of
     * parentComponentId. A new tabLayout is seeded with two tabs so it is usable right away.
     */
    private void addPageComponent(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        var kind = command.componentKind();
        if (!UiComponentNodeEntity.KINDS.contains(kind)) {
            throw new IllegalArgumentException("Unknown component kind: " + kind);
        }
        var node = newComponentNode(command.componentId(), kind);
        var content = page.content() == null
                ? List.<UiComponentNodeEntity>of() : page.content();
        if (command.parentComponentId() == null || command.parentComponentId().isBlank()) {
            requireTabRules(kind, null);
            repository.save(withContent(page, inserted(content, node, null)));
            return;
        }
        var parent = findComponent(content, command.parentComponentId());
        if (parent == null) {
            throw new IllegalArgumentException("Unknown component: " + command.parentComponentId());
        }
        requireTabRules(kind, parent.kind());
        repository.save(withContent(page,
                withChildInserted(content, command.parentComponentId(), node, null)));
    }

    /** A fresh node: everything null but id+kind — except tabLayouts, born with two tabs. */
    private static UiComponentNodeEntity newComponentNode(String id, String kind) {
        var children = "tabLayout".equals(kind)
                ? List.of(
                        new UiComponentNodeEntity(id + "-tab-1", "tab", "Pestaña 1", null, null,
                                null, null, null, null, null, null, null, null, List.of()),
                        new UiComponentNodeEntity(id + "-tab-2", "tab", "Pestaña 2", null, null,
                                null, null, null, null, null, null, null, null, List.of()))
                : List.<UiComponentNodeEntity>of();
        return new UiComponentNodeEntity(id, kind, null, null, null,
                null, null, null, null, null, null, null, null, children);
    }

    /** tab ↔ tabLayout go together: a tabLayout only holds tabs, a tab only hangs from one. */
    private static void requireTabRules(String kind, String parentKind) {
        if ("tabLayout".equals(parentKind) && !"tab".equals(kind)) {
            throw new IllegalArgumentException("A tabLayout only admits tab children");
        }
        if ("tab".equals(kind) && !"tabLayout".equals(parentKind)) {
            throw new IllegalArgumentException("A tab can only hang from a tabLayout");
        }
    }

    /** Prunes the node — subtree included — from the page's content tree. */
    private void removePageComponent(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        var pruned = withoutComponent(page.content(), command.componentId());
        if (pruned == null) {
            throw new IllegalArgumentException("Unknown component: " + command.componentId());
        }
        repository.save(withContent(page, pruned));
    }

    /**
     * Replaces the node's configuration with the given values (null clears), keeping
     * id, kind and children. References are validated when present.
     */
    private void setPageComponent(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        if (command.useCaseId() != null) {
            repository.findById(command.useCaseId(), UseCaseEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unknown use case: " + command.useCaseId()));
        }
        if (command.modelId() != null) {
            repository.findById(command.modelId(), ModelEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unknown model: " + command.modelId()));
        }
        if (command.mappingId() != null) {
            repository.findById(command.mappingId(), ModelMappingEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unknown mapping: " + command.mappingId()));
        }
        if (command.queryServiceId() != null) {
            repository.findById(command.queryServiceId(), QueryServiceEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unknown query service: " + command.queryServiceId()));
        }
        var updated = withComponentReplaced(page.content(), command.componentId(),
                node -> new UiComponentNodeEntity(node.id(), node.kind(),
                        command.title(), command.text(), command.label(),
                        command.useCaseId(), command.mappingId(), command.modelId(),
                        command.queryServiceId(), command.queryOperationId(),
                        command.fieldId(), command.stereotype(), command.colspan(),
                        node.children()));
        if (updated == null) {
            throw new IllegalArgumentException("Unknown component: " + command.componentId());
        }
        repository.save(withContent(page, updated));
    }

    /**
     * Moves a node (subtree included) under toParentId — or to the root — before
     * beforeComponentId, or to the end. A node never moves into its own subtree.
     */
    private void movePageComponent(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        var node = findComponent(page.content(), command.componentId());
        if (node == null) {
            throw new IllegalArgumentException("Unknown component: " + command.componentId());
        }
        var toParentId = command.parentComponentId();
        var toRoot = toParentId == null || toParentId.isBlank();
        if (!toRoot && findComponent(List.of(node), toParentId) != null) {
            throw new IllegalArgumentException(
                    "A component cannot move into its own subtree: " + command.componentId());
        }
        var pruned = withoutComponent(page.content(), command.componentId());
        if (toRoot) {
            requireTabRules(node.kind(), null);
            repository.save(withContent(page,
                    inserted(pruned, node, command.beforeComponentId())));
            return;
        }
        var parent = findComponent(pruned, toParentId);
        if (parent == null) {
            throw new IllegalArgumentException("Unknown component: " + toParentId);
        }
        requireTabRules(node.kind(), parent.kind());
        repository.save(withContent(page,
                withChildInserted(pruned, toParentId, node, command.beforeComponentId())));
    }

    private static UiComponentNodeEntity findComponent(List<UiComponentNodeEntity> nodes, String id) {
        for (var node : nodes == null ? List.<UiComponentNodeEntity>of() : nodes) {
            if (id.equals(node.id())) return node;
            var hit = findComponent(node.children(), id);
            if (hit != null) return hit;
        }
        return null;
    }

    /** The siblings with the node inserted before beforeId (or at the end when null/absent). */
    private static List<UiComponentNodeEntity> inserted(List<UiComponentNodeEntity> siblings,
                                                        UiComponentNodeEntity node, String beforeId) {
        var copy = new ArrayList<>(siblings == null ? List.<UiComponentNodeEntity>of() : siblings);
        var at = copy.size();
        if (beforeId != null) {
            for (int i = 0; i < copy.size(); i++) {
                if (beforeId.equals(copy.get(i).id())) { at = i; break; }
            }
        }
        copy.add(at, node);
        return copy;
    }

    /** The tree with the child inserted into the given parent's children, or null when not found. */
    private static List<UiComponentNodeEntity> withChildInserted(List<UiComponentNodeEntity> nodes,
                                                                 String parentId,
                                                                 UiComponentNodeEntity child,
                                                                 String beforeId) {
        return withComponentReplaced(nodes, parentId,
                parent -> withNodeChildren(parent, inserted(parent.children(), child, beforeId)));
    }

    /** The tree without the given node (subtree included), or null when it was not found. */
    private static List<UiComponentNodeEntity> withoutComponent(List<UiComponentNodeEntity> nodes,
                                                                String id) {
        if (nodes == null) return null;
        for (int i = 0; i < nodes.size(); i++) {
            var node = nodes.get(i);
            if (id.equals(node.id())) {
                var copy = new ArrayList<>(nodes);
                copy.remove(i);
                return copy;
            }
            var prunedChildren = withoutComponent(node.children(), id);
            if (prunedChildren != null) {
                var copy = new ArrayList<>(nodes);
                copy.set(i, withNodeChildren(node, prunedChildren));
                return copy;
            }
        }
        return null;
    }

    /** The tree with the given node replaced by edit(node), or null when it was not found. */
    private static List<UiComponentNodeEntity> withComponentReplaced(
            List<UiComponentNodeEntity> nodes, String id,
            java.util.function.UnaryOperator<UiComponentNodeEntity> edit) {
        if (nodes == null) return null;
        for (int i = 0; i < nodes.size(); i++) {
            var node = nodes.get(i);
            if (id.equals(node.id())) {
                var copy = new ArrayList<>(nodes);
                copy.set(i, edit.apply(node));
                return copy;
            }
            var editedChildren = withComponentReplaced(node.children(), id, edit);
            if (editedChildren != null) {
                var copy = new ArrayList<>(nodes);
                copy.set(i, withNodeChildren(node, editedChildren));
                return copy;
            }
        }
        return null;
    }

    /** Record copy with only children replaced — every other field preserved verbatim. */
    private static UiComponentNodeEntity withNodeChildren(UiComponentNodeEntity node,
                                                          List<UiComponentNodeEntity> children) {
        return new UiComponentNodeEntity(node.id(), node.kind(), node.title(), node.text(),
                node.label(), node.useCaseId(), node.mappingId(), node.modelId(),
                node.queryServiceId(), node.queryOperationId(),
                node.fieldId(), node.stereotype(), node.colspan(), children);
    }

    private void renameUiPage(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        repository.save(new PageEntity(page.id(), command.name(), page.route(), page.type(),
                page.aggregateId(), page.modelId(), page.componentIds(), page.listingDataSourceType(),
                page.listingGatewayId(), page.toolbar(), page.bottomBar(), page.triggers(), page.rules(),
                page.validations(), page.fieldConfigs(), page.wizardSteps(), page.completionActions(),
                page.listingQueryServiceId(), page.content()));
    }

    private void setPageType(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        repository.save(new PageEntity(page.id(), page.name(), page.route(), command.pageType(),
                page.aggregateId(), page.modelId(), page.componentIds(), page.listingDataSourceType(),
                page.listingGatewayId(), page.toolbar(), page.bottomBar(), page.triggers(), page.rules(),
                page.validations(), page.fieldConfigs(), page.wizardSteps(), page.completionActions(),
                page.listingQueryServiceId(), page.content()));
    }

    private void setPageRoute(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        repository.save(new PageEntity(page.id(), page.name(), command.path(), page.type(),
                page.aggregateId(), page.modelId(), page.componentIds(), page.listingDataSourceType(),
                page.listingGatewayId(), page.toolbar(), page.bottomBar(), page.triggers(), page.rules(),
                page.validations(), page.fieldConfigs(), page.wizardSteps(), page.completionActions(),
                page.listingQueryServiceId(), page.content()));
    }

    /** Edits an existing toolbar/bottomBar button (matched by useCaseId): label and mapping. */
    private void setPageButton(EditorCommand command) {
        var page = repository.findById(command.pageId(), PageEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown page: " + command.pageId()));
        if (command.mappingId() != null) {
            repository.findById(command.mappingId(), ModelMappingEntity.class)
                    .orElseThrow(() -> new IllegalArgumentException(
                            "Unknown mapping: " + command.mappingId()));
        }
        java.util.function.Function<List<PageButtonEntity>, List<PageButtonEntity>> edit = buttons ->
                (buttons == null ? List.<PageButtonEntity>of() : buttons).stream()
                        .map(b -> command.useCaseId().equals(b.useCaseId())
                                ? new PageButtonEntity(
                                        command.label() != null && !command.label().isBlank()
                                                ? command.label() : b.label(),
                                        b.icon(), b.useCaseId(), b.actionId(), command.mappingId())
                                : b)
                        .toList();
        repository.save(withButtons(page, edit.apply(page.toolbar()), edit.apply(page.bottomBar())));
    }

    /** Record copy with only fieldConfigs replaced — every other field preserved verbatim. */
    private static PageEntity withFieldConfigs(PageEntity p, List<PageFieldConfigEntity> fieldConfigs) {
        return new PageEntity(p.id(), p.name(), p.route(), p.type(), p.aggregateId(), p.modelId(),
                p.componentIds(), p.listingDataSourceType(), p.listingGatewayId(), p.toolbar(),
                p.bottomBar(), p.triggers(), p.rules(), p.validations(), fieldConfigs,
                p.wizardSteps(), p.completionActions(), p.listingQueryServiceId(), p.content());
    }

    private static PageEntity withButtons(PageEntity p, List<PageButtonEntity> toolbar,
                                          List<PageButtonEntity> bottomBar) {
        return new PageEntity(p.id(), p.name(), p.route(), p.type(), p.aggregateId(), p.modelId(),
                p.componentIds(), p.listingDataSourceType(), p.listingGatewayId(), toolbar,
                bottomBar, p.triggers(), p.rules(), p.validations(), p.fieldConfigs(),
                p.wizardSteps(), p.completionActions(), p.listingQueryServiceId(), p.content());
    }

    /** Record copy with only listingQueryServiceId replaced — every other field preserved verbatim. */
    private static PageEntity withListingQueryServiceId(PageEntity p, String listingQueryServiceId) {
        return new PageEntity(p.id(), p.name(), p.route(), p.type(), p.aggregateId(), p.modelId(),
                p.componentIds(), p.listingDataSourceType(), p.listingGatewayId(), p.toolbar(),
                p.bottomBar(), p.triggers(), p.rules(), p.validations(), p.fieldConfigs(),
                p.wizardSteps(), p.completionActions(), listingQueryServiceId, p.content());
    }

    /** Record copy with only modelId replaced — every other field preserved verbatim. */
    private static PageEntity withModelId(PageEntity p, String modelId) {
        return new PageEntity(p.id(), p.name(), p.route(), p.type(), p.aggregateId(), modelId,
                p.componentIds(), p.listingDataSourceType(), p.listingGatewayId(), p.toolbar(),
                p.bottomBar(), p.triggers(), p.rules(), p.validations(), p.fieldConfigs(),
                p.wizardSteps(), p.completionActions(), p.listingQueryServiceId(), p.content());
    }

    /** Record copy with only content replaced — every other field preserved verbatim. */
    private static PageEntity withContent(PageEntity p, List<UiComponentNodeEntity> content) {
        return new PageEntity(p.id(), p.name(), p.route(), p.type(), p.aggregateId(), p.modelId(),
                p.componentIds(), p.listingDataSourceType(), p.listingGatewayId(), p.toolbar(),
                p.bottomBar(), p.triggers(), p.rules(), p.validations(), p.fieldConfigs(),
                p.wizardSteps(), p.completionActions(), p.listingQueryServiceId(), content);
    }

    private static List<PageButtonEntity> withoutUseCaseButtons(List<PageButtonEntity> buttons,
                                                                String useCaseId) {
        if (buttons == null) return List.of();
        return buttons.stream().filter(b -> !useCaseId.equals(b.useCaseId())).toList();
    }

    /** The menu tree without any entry (at any depth) pointing at the given page. */
    private static List<UiMenuItemEntity> withoutMenuEntriesFor(List<UiMenuItemEntity> items,
                                                                String pageId) {
        if (items == null) return List.of();
        return items.stream()
                .filter(i -> !pageId.equals(i.pageId()))
                .map(i -> withChildren(i, withoutMenuEntriesFor(i.children(), pageId)))
                .toList();
    }

    /**
     * The tree with every entry carrying a UNIQUE stable id — null when it already does
     * (nothing to save then). Duplicates count as missing: the first keeps the id.
     */
    private static List<UiMenuItemEntity> withMenuItemIds(List<UiMenuItemEntity> items,
                                                          java.util.Set<String> used) {
        if (items == null) return null;
        var changed = false;
        var copy = new ArrayList<UiMenuItemEntity>();
        for (var item : items) {
            var id = item.id();
            if (id == null || id.isBlank() || used.contains(id)) {
                id = null; // reassign below, uniquified against everything seen so far
            }
            if (id == null) {
                var base = "mi-" + (item.label() == null ? "entrada" : item.label()).toLowerCase()
                        .replaceAll("[^a-z0-9]+", "-").replaceAll("(^-+|-+$)", "");
                id = base;
                for (var n = 2; used.contains(id); n++) id = base + "-" + n;
                changed = true;
            }
            used.add(id);
            var healedChildren = withMenuItemIds(item.children(), used);
            if (healedChildren != null) changed = true;
            var isGroup = item.children() != null && !item.children().isEmpty();
            if (isGroup && (item.pageId() != null || item.uiAdapterId() != null || item.useCaseId() != null
                    || item.aggregateId() != null || item.queryOperationId() != null)) {
                changed = true; // a parent is a pure grouper — legacy targets are dropped
            }
            copy.add(new UiMenuItemEntity(item.label(), item.icon(), item.description(),
                    item.route(), isGroup ? null : item.pageId(),
                    healedChildren != null ? healedChildren
                            : item.children() == null ? List.of() : item.children(),
                    id, isGroup ? null : item.uiAdapterId(), isGroup ? null : item.useCaseId(),
                    isGroup ? null : item.aggregateId(), isGroup ? null : item.queryServiceId(),
                    isGroup ? null : item.queryOperationId()));
        }
        return changed ? copy : null;
    }

    /** Entry identity: the stable id when both sides have one, the label for pre-id entries. */
    private static boolean menuItemMatches(UiMenuItemEntity item, String itemId, String label) {
        if (itemId != null && !itemId.isBlank()) return itemId.equals(item.id());
        return label != null && label.equals(item.label());
    }

    /** A fresh stable id for a new entry: mi-<slug(label)>, uniquified within the app's tree. */
    private static String newMenuItemId(List<UiMenuItemEntity> items, String label) {
        var used = new java.util.HashSet<String>();
        collectMenuItemIds(items, used);
        var base = "mi-" + (label == null ? "entrada" : label).toLowerCase()
                .replaceAll("[^a-z0-9]+", "-").replaceAll("(^-+|-+$)", "");
        var id = base;
        for (var n = 2; used.contains(id); n++) id = base + "-" + n;
        return id;
    }

    private static void collectMenuItemIds(List<UiMenuItemEntity> items, java.util.Set<String> out) {
        for (var item : items == null ? List.<UiMenuItemEntity>of() : items) {
            if (item.id() != null) out.add(item.id());
            collectMenuItemIds(item.children(), out);
        }
    }

    /** Record copy with only children replaced — id and the rest preserved verbatim. */
    private static UiMenuItemEntity withChildren(UiMenuItemEntity item,
                                                 List<UiMenuItemEntity> children) {
        return new UiMenuItemEntity(item.label(), item.icon(), item.description(), item.route(),
                item.pageId(), children, item.id(), item.uiAdapterId(), item.useCaseId(),
                item.aggregateId(), item.queryServiceId(), item.queryOperationId());
    }

    /**
     * The menu tree with the entry appended under the FIRST matching item (depth-first),
     * or null when nothing matches.
     */
    private static List<UiMenuItemEntity> insertedUnderParent(List<UiMenuItemEntity> items,
                                                              String parentId, String parentLabel,
                                                              UiMenuItemEntity entry) {
        if (items == null) return null;
        for (var i = 0; i < items.size(); i++) {
            var item = items.get(i);
            var children = item.children() == null ? List.<UiMenuItemEntity>of() : item.children();
            List<UiMenuItemEntity> newChildren;
            if (menuItemMatches(item, parentId, parentLabel)) {
                newChildren = new ArrayList<>(children);
                newChildren.add(entry);
                // a parent is a pure grouper: gaining a submenu clears any target it had
                var copy = new ArrayList<>(items);
                copy.set(i, new UiMenuItemEntity(item.label(), item.icon(), item.description(),
                        item.route(), null, newChildren, item.id(), null, null, null, null, null));
                return copy;
            } else {
                newChildren = insertedUnderParent(children, parentId, parentLabel, entry);
            }
            if (newChildren != null) {
                var copy = new ArrayList<>(items);
                copy.set(i, withChildren(item, newChildren));
                return copy;
            }
        }
        return null;
    }

    /**
     * The menu tree without the FIRST matching item (depth-first), or null when nothing
     * matches (nothing to save then).
     */
    private static List<UiMenuItemEntity> withoutFirstMatching(List<UiMenuItemEntity> items,
                                                               String itemId, String label) {
        if (items == null) return null;
        for (var i = 0; i < items.size(); i++) {
            var item = items.get(i);
            if (menuItemMatches(item, itemId, label)) {
                var copy = new ArrayList<>(items);
                copy.remove(i);
                return copy;
            }
            var newChildren = withoutFirstMatching(item.children(), itemId, label);
            if (newChildren != null) {
                var copy = new ArrayList<>(items);
                copy.set(i, withChildren(item, newChildren));
                return copy;
            }
        }
        return null;
    }

    /**
     * The tree with the FIRST matching item's target replaced — an entry opens/fires
     * exactly ONE thing, so every retarget lambda sets ITS target and nulls the rest;
     * null when nothing matches. Entries with a submenu are pure groupers: linking
     * them is rejected (linking = the lambda yields any non-null target).
     */
    private static List<UiMenuItemEntity> withMenuTarget(
            List<UiMenuItemEntity> items, String itemId, String label,
            java.util.function.UnaryOperator<UiMenuItemEntity> retarget) {
        if (items == null) return null;
        for (var i = 0; i < items.size(); i++) {
            var item = items.get(i);
            if (menuItemMatches(item, itemId, label)) {
                var retargeted = retarget.apply(item);
                var links = retargeted.pageId() != null || retargeted.uiAdapterId() != null
                        || retargeted.useCaseId() != null || retargeted.aggregateId() != null
                        || retargeted.queryOperationId() != null;
                if (links && item.children() != null && !item.children().isEmpty()) {
                    throw new IllegalArgumentException(
                            "La entrada «" + item.label() + "» tiene submenú: no puede abrir nada");
                }
                var copy = new ArrayList<>(items);
                copy.set(i, retargeted);
                return copy;
            }
            var newChildren = withMenuTarget(item.children(), itemId, label, retarget);
            if (newChildren != null) {
                var copy = new ArrayList<>(items);
                copy.set(i, withChildren(item, newChildren));
                return copy;
            }
        }
        return null;
    }

    /** The item retargeted: one target set, every other cleared. */
    private static UiMenuItemEntity retargeted(UiMenuItemEntity item, String pageId, String appId,
                                               String useCaseId, String aggregateId,
                                               String queryServiceId, String queryOperationId) {
        return new UiMenuItemEntity(item.label(), item.icon(), item.description(), item.route(),
                pageId, item.children(), item.id(), appId, useCaseId,
                aggregateId, queryServiceId, queryOperationId);
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
        return currentProject().orElseThrow(() -> new IllegalStateException(
                "No hay ningún proyecto en el store — crea uno en Organización → Projects"));
    }

    private Optional<ProjectEntity> currentProject() {
        var projects = repository.findAllOfType(ProjectEntity.class);
        return projectStore.currentProjectId()
                .flatMap(id -> projects.stream().filter(p -> p.id().equals(id)).findFirst())
                .or(() -> projects.stream().findFirst());
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
            if (!diagram.collapsed().isEmpty()) {
                var folded = view.putArray("collapsed");
                diagram.collapsed().forEach(folded::add);
            }
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
            if (diagram.nodes().isEmpty() && diagram.edges().isEmpty()
                    && diagram.detail() == null && diagram.collapsed().isEmpty()) return;
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
        var collapsed = new ArrayList<String>();
        if (v2 && view.get("collapsed") != null && view.get("collapsed").isArray()) {
            view.get("collapsed").forEach(c -> {
                if (c.isTextual()) collapsed.add(c.asText());
            });
        }
        return new DiagramEntity(id, detail, nodes, edges, collapsed);
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
