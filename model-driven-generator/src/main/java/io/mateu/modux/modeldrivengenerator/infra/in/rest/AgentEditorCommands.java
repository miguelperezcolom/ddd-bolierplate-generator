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
 * AI-side commands: agents and their tools (APIs, queries, delegations),
 * MCP gateways and exposures, RAGs and their sources.
 */
@Component
@RequiredArgsConstructor
public class AgentEditorCommands {

    private final ModelStore repository;
    private final EditorProjectSupport projects;

    public void addAiAgent(EditorCommand command) {
        if (repository.findById(command.id(), AiAgentEntity.class).isPresent()) return;
        repository.save(new AiAgentEntity(command.id(), command.name(), null,
                List.of(), List.of(), List.of(), List.of(),
                Boolean.TRUE.equals(command.external()),
                List.of(), List.of(), List.of(), List.of(), List.of()));
    }

    public void removeAiAgent(EditorCommand command) {
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
            agent.allowedUseCaseIds().forEach(projects::clearMcpExposureIfUnused);
        });
    }

    public void addMcpGateway(EditorCommand command) {
        if (repository.findById(command.id(), McpGatewayEntity.class).isPresent()) return;
        repository.save(new McpGatewayEntity(command.id(), command.name(), null,
                List.of(), List.of(), List.of(), List.of(), List.of(), null));
    }

    /** Removing a gateway also unlinks it from every agent that consumed it. */
    public void removeMcpGateway(EditorCommand command) {
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
    public void addGatewayExposure(EditorCommand command) {
        var gateway = repository.findById(command.sourceId(), McpGatewayEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown MCP gateway: " + command.sourceId()));
        var target = command.targetId();
        if (projects.externalSystems().stream()
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

    public void removeGatewayExposure(EditorCommand command) {
        repository.findById(command.sourceId(), McpGatewayEntity.class).ifPresent(g ->
                repository.save(g
                        .withMcpServerIds(without(g.mcpServerIds(), command.targetId()))
                        .withApiIds(without(g.apiIds(), command.targetId()))
                        .withApiOperationIds(without(g.apiOperationIds(), command.targetId()))
                        .withUseCaseIds(without(g.useCaseIds(), command.targetId()))
                        .withRagIds(without(g.ragIds(), command.targetId()))));
    }

    /** Agent → gateway: the agent consumes the gateway's curated tool surface. */
    public void addAgentGateway(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        repository.findById(command.targetId(), McpGatewayEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown MCP gateway: " + command.targetId()));
        if (agent.mcpGatewayIds().contains(command.targetId())) return;
        repository.save(agent.withMcpGatewayIds(appended(agent.mcpGatewayIds(), command.targetId())));
    }

    public void removeAgentGateway(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withMcpGatewayIds(
                        without(agent.mcpGatewayIds(), command.targetId()))));
    }

    /** Agent → API operation: the operation joins the agent's tool surface. */
    /** The whole API (or proxy) as a tool: every operation of it, present and future. */
    public void addAgentApi(EditorCommand command) {
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

    public void removeAgentApi(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(a ->
                repository.save(a.withAllowedApiIds(
                        without(a.allowedApiIds(), command.targetId()))));
    }

    public void addAgentApiOperation(EditorCommand command) {
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

    public void removeAgentApiOperation(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withAllowedApiOperationIds(
                        without(agent.allowedApiOperationIds(), command.targetId()))));
    }

    /** Agent → query service: a read tool. */
    public void addAgentQuery(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        repository.findById(command.targetId(), QueryServiceEntity.class)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Unknown query service: " + command.targetId()));
        if (agent.allowedQueryServiceIds().contains(command.targetId())) return;
        repository.save(agent.withAllowedQueryServiceIds(
                appended(agent.allowedQueryServiceIds(), command.targetId())));
    }

    public void removeAgentQuery(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withAllowedQueryServiceIds(
                        without(agent.allowedQueryServiceIds(), command.targetId()))));
    }

    /** Agent → agent: delegation. Self-delegation is rejected; cycles are the linter's job. */
    public void addAgentDelegate(EditorCommand command) {
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

    public void removeAgentDelegate(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withDelegateAgentIds(
                        without(agent.delegateAgentIds(), command.targetId()))));
    }

    /** Actor → agent: the person talks to the agent (a chat/supervision UI derives). */
    public void addActorAgent(EditorCommand command) {
        var role = repository.findById(command.sourceId(), RoleEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown actor: " + command.sourceId()));
        repository.findById(command.targetId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.targetId()));
        if (role.aiAgentIds().contains(command.targetId())) return;
        repository.save(role.withAiAgentIds(appended(role.aiAgentIds(), command.targetId())));
    }

    public void removeActorAgent(EditorCommand command) {
        repository.findById(command.sourceId(), RoleEntity.class).ifPresent(role ->
                repository.save(role.withAiAgentIds(
                        without(role.aiAgentIds(), command.targetId()))));
    }

    /** Event → agent: the event triggers a run of the agent (reactive agents). */
    public void addAgentTrigger(EditorCommand command) {
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

    public void removeAgentTrigger(EditorCommand command) {
        repository.findById(command.targetId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withReactsToEventIds(
                        without(agent.reactsToEventIds(), command.sourceId()))));
    }

    /** The API gets (another) implementation site: a bounded context of ours (same API, no copy). */
    public void addApiImplementation(EditorCommand command) {
        var api = repository.findById(command.apiId(), ApiEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown API: " + command.apiId()));
        if (repository.findById(command.boundedContextId(), BoundedContextEntity.class).isEmpty()) {
            throw new IllegalArgumentException("Unknown bounded context: " + command.boundedContextId());
        }
        if (api.implementedByBoundedContextIds().contains(command.boundedContextId())) return;
        repository.save(api.withImplementedByBoundedContextIds(
                appended(api.implementedByBoundedContextIds(), command.boundedContextId())));
    }

    public void removeApiImplementation(EditorCommand command) {
        repository.findById(command.apiId(), ApiEntity.class).ifPresent(api ->
                repository.save(api.withImplementedByBoundedContextIds(
                        without(api.implementedByBoundedContextIds(), command.boundedContextId()))));
    }

    /** Route ONE proxy operation to an implementation site of the API the proxy fronts. */
    public void addProxyOperationRoute(EditorCommand command) {
        var proxy = repository.findById(command.proxyId(), ProxyApiEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown proxy: " + command.proxyId()));
        var route = new ProxyOperationRouteEntity(command.operationId(), command.targetSiteId());
        if (proxy.operationRoutes().contains(route)) return;
        var routes = new java.util.ArrayList<>(proxy.operationRoutes());
        routes.add(route);
        repository.save(proxy.withOperationRoutes(java.util.List.copyOf(routes)));
    }

    public void removeProxyOperationRoute(EditorCommand command) {
        repository.findById(command.proxyId(), ProxyApiEntity.class).ifPresent(proxy -> {
            var routes = proxy.operationRoutes().stream()
                    .filter(r -> !(r.operationId().equals(command.operationId())
                            && r.targetSiteId().equals(command.targetSiteId())))
                    .toList();
            repository.save(proxy.withOperationRoutes(routes));
        });
    }

    /** Per-site wiring: the use case implementing an operation AT an implementation site. */
    public void setApiOperationImplementation(EditorCommand command) {
        var api = repository.findById(command.apiId(), ApiEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown API: " + command.apiId()));
        var wires = new java.util.ArrayList<>(api.operationImplementations().stream()
                .filter(w -> !(w.operationId().equals(command.operationId())
                        && w.boundedContextId().equals(command.boundedContextId())))
                .toList());
        wires.add(new ApiOperationImplementationEntity(
                command.operationId(), command.boundedContextId(), command.targetUseCaseId()));
        repository.save(api.withOperationImplementations(java.util.List.copyOf(wires)));
    }

    public void removeApiOperationImplementation(EditorCommand command) {
        repository.findById(command.apiId(), ApiEntity.class).ifPresent(api ->
                repository.save(api.withOperationImplementations(
                        api.operationImplementations().stream()
                                .filter(w -> !(w.operationId().equals(command.operationId())
                                        && w.boundedContextId().equals(command.boundedContextId())))
                                .toList())));
    }

    /** An external system calls one API operation at a site (published API, proxy or implementation). */
    public void addExternalOperationUse(EditorCommand command) {
        var project = projects.owningProject();
        var externalSystems = new ArrayList<>(projects.externalSystems());
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
        projects.replaceExternalSystems(externalSystems);
    }

    public void removeExternalOperationUse(EditorCommand command) {
        var project = projects.owningProject();
        var externalSystems = new ArrayList<>(projects.externalSystems());
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
                    projects.replaceExternalSystems(externalSystems);
                });
    }

    static List<String> appended(List<String> ids, String id) {
        var copy = new ArrayList<>(ids);
        copy.add(id);
        return copy;
    }

    static List<String> without(List<String> ids, String id) {
        return ids.stream().filter(x -> !x.equals(id)).toList();
    }

    /** Agent → use case: record the consumption and expose the use case through MCP. */
    public void addAgentUse(EditorCommand command) {
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
            repository.save(EditorProjectSupport.withExposedAsMcp(useCase, true));
        }
    }

    public void removeAgentUse(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(withAllowedUseCaseIds(agent, agent.allowedUseCaseIds().stream()
                        .filter(id -> !id.equals(command.targetId())).toList())));
        projects.clearMcpExposureIfUnused(command.targetId());
    }

    /** Agent → external-system operation: the other half of the agent's tool surface. */
    public void addAgentExternalUse(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        var known = projects.externalSystems().stream()
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

    public void removeAgentExternalUse(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withAllowedExternalUseCaseIds(
                        agent.allowedExternalUseCaseIds().stream()
                                .filter(id -> !id.equals(command.targetId())).toList())));
    }

    /** Agent → MCP server published by an external system: another tool surface. */
    public void addAgentMcp(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        var known = projects.externalSystems().stream()
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

    public void removeAgentMcp(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(agent.withAllowedMcpServerIds(
                        agent.allowedMcpServerIds().stream()
                                .filter(id -> !id.equals(command.targetId())).toList())));
    }

    /** Record copy with only allowedUseCaseIds replaced — every other field preserved verbatim. */
    static AiAgentEntity withAllowedUseCaseIds(AiAgentEntity a, List<String> ids) {
        return a.withAllowedUseCaseIds(ids);
    }

    /** Record copy with only ragIds replaced — every other field preserved verbatim. */
    static AiAgentEntity withRagIds(AiAgentEntity a, List<String> ragIds) {
        return a.withRagIds(ragIds);
    }

    public void addRag(EditorCommand command) {
        if (repository.findById(command.id(), RagEntity.class).isPresent()) return;
        repository.save(new RagEntity(command.id(), command.name(), null, List.of()));
    }

    /** Removing a knowledge base also unlinks it from agents and gateways that exposed it. */
    public void removeRag(EditorCommand command) {
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
    public void addAgentRag(EditorCommand command) {
        var agent = repository.findById(command.sourceId(), AiAgentEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown AI agent: " + command.sourceId()));
        repository.findById(command.targetId(), RagEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown RAG: " + command.targetId()));
        if (agent.ragIds().contains(command.targetId())) return;
        var ids = new ArrayList<>(agent.ragIds());
        ids.add(command.targetId());
        repository.save(withRagIds(agent, ids));
    }

    public void removeAgentRag(EditorCommand command) {
        repository.findById(command.sourceId(), AiAgentEntity.class).ifPresent(agent ->
                repository.save(withRagIds(agent, agent.ragIds().stream()
                        .filter(id -> !id.equals(command.targetId())).toList())));
    }

    /** RAG → read model: the knowledge base indexes the read model's content. */
    /** The RAG indexes a read model, an external system's table, or an API/proxy. */
    public void addRagSource(EditorCommand command) {
        var rag = repository.findById(command.sourceId(), RagEntity.class)
                .orElseThrow(() -> new IllegalArgumentException("Unknown RAG: " + command.sourceId()));
        var target = command.targetId();
        if (repository.findById(target, ReadModelEntity.class).isPresent()) {
            if (rag.sourceReadModelIds().contains(target)) return;
            repository.save(rag.withSourceReadModelIds(appended(rag.sourceReadModelIds(), target)));
            return;
        }
        var isExternalTable = projects.externalSystems().stream()
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
        if (projects.externalSystems().stream()
                .anyMatch(x -> x.id().equals(target))) {
            if (rag.sourceExternalSystemIds().contains(target)) return;
            repository.save(rag.withSourceExternalSystemIds(
                    appended(rag.sourceExternalSystemIds(), target)));
            return;
        }
        if (repository.findById(target, BoundedContextEntity.class).isPresent()) {
            if (rag.sourceBoundedContextIds().contains(target)) return;
            repository.save(rag.withSourceBoundedContextIds(appended(rag.sourceBoundedContextIds(), target)));
            return;
        }
        throw new IllegalArgumentException(
                "El RAG indexa read models, tablas externas, APIs, sistemas externos o contextos; destino desconocido: "
                        + target);
    }

    public void removeRagSource(EditorCommand command) {
        repository.findById(command.sourceId(), RagEntity.class).ifPresent(rag ->
                repository.save(rag
                        .withSourceReadModelIds(without(rag.sourceReadModelIds(), command.targetId()))
                        .withSourceExternalTableIds(
                                without(rag.sourceExternalTableIds(), command.targetId()))
                        .withSourceApiIds(without(rag.sourceApiIds(), command.targetId()))
                        .withSourceExternalSystemIds(
                                without(rag.sourceExternalSystemIds(), command.targetId()))
                        .withSourceBoundedContextIds(without(rag.sourceBoundedContextIds(), command.targetId()))));
    }

    /** External content feeding the RAG: a repo, a web site, an FTP server… */
    public void addRagContentSource(EditorCommand command) {
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

    public void removeRagContentSource(EditorCommand command) {
        repository.findById(command.sourceId(), RagEntity.class).ifPresent(rag ->
                repository.save(new RagEntity(rag.id(), rag.name(), rag.description(),
                        rag.sourceReadModelIds(),
                        rag.contentSources().stream()
                                .filter(s -> !s.uri().equals(command.uri())).toList())));
    }

    /** Adds a catalog element to a CURATED view (searchable from the toolbar). */
}
