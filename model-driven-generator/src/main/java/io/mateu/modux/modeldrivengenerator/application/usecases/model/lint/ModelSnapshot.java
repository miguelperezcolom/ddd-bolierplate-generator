package io.mateu.modux.modeldrivengenerator.application.usecases.model.lint;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AiAgentEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApplicationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.InteractionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RagEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RoleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DecisionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EntityEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ContextMapRelationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DeploymentEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IntegrationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.McpGatewayEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowEntity;

import java.util.List;

/** Immutable view of the loaded model that lint rules run against. Pure and unit-testable. */
public record ModelSnapshot(
        List<ProjectEntity> projects,
        List<ServiceEntity> services,
        List<BoundedContextEntity> boundedContexts,
        List<AggregateEntity> aggregates,
        List<ModelEntity> models,
        List<UseCaseEntity> useCases,
        List<DomainEventEntity> domainEvents,
        List<IntegrationEventEntity> integrationEvents,
        List<SubscriptionEntity> subscriptions,
        List<ProjectionEntity> projections,
        List<ReadModelEntity> readModels,
        List<SagaEntity> sagas,
        List<FlowEntity> flows,
        List<ProcessEntity> processes,
        List<DecisionEntity> decisions,
        List<PageEntity> pages,
        List<QueryServiceEntity> queryServices,
        List<ModelMappingEntity> modelMappings,
        List<EntityEntity> entities,
        List<WorkflowEntity> workflows,
        List<AiAgentEntity> aiAgents,
        List<RagEntity> rags,
        List<ApiEntity> apis,
        List<McpGatewayEntity> mcpGateways,
        List<ModuleEntity> modules,
        List<RoleEntity> roles,
        List<UiAdapterEntity> uiAdapters,
        List<DomainServiceEntity> domainServices,
        List<ApplicationEventEntity> applicationEvents,
        List<InteractionEntity> interactions,
        /** Top-level now, no longer nested in the project. */
        List<ExternalSystemEntity> externalSystems,
        List<ContextMapRelationEntity> contextMapRelations,
        List<DeploymentEntity> deployments
) {

    /** Backward-compatible constructor (pre-interactions callers). */
    public ModelSnapshot(List<ProjectEntity> projects, List<ServiceEntity> services,
                         List<BoundedContextEntity> boundedContexts, List<AggregateEntity> aggregates,
                         List<ModelEntity> models, List<UseCaseEntity> useCases,
                         List<DomainEventEntity> domainEvents,
                         List<IntegrationEventEntity> integrationEvents,
                         List<SubscriptionEntity> subscriptions, List<ProjectionEntity> projections,
                         List<ReadModelEntity> readModels, List<SagaEntity> sagas,
                         List<FlowEntity> flows, List<ProcessEntity> processes,
                         List<DecisionEntity> decisions, List<PageEntity> pages,
                         List<QueryServiceEntity> queryServices,
                         List<ModelMappingEntity> modelMappings, List<EntityEntity> entities,
                         List<WorkflowEntity> workflows, List<AiAgentEntity> aiAgents,
                         List<RagEntity> rags, List<ApiEntity> apis, List<McpGatewayEntity> mcpGateways,
                         List<ModuleEntity> modules) {
        this(projects, services, boundedContexts, aggregates, models, useCases, domainEvents,
                integrationEvents, subscriptions, projections, readModels, sagas, flows, processes,
                decisions, pages, queryServices, modelMappings, entities, workflows, aiAgents,
                rags, apis, mcpGateways, modules, null, null, null, null, null, null, null, null);
    }

    /** Backward-compatible constructor (pre-modules callers). */
    public ModelSnapshot(List<ProjectEntity> projects, List<ServiceEntity> services,
                         List<BoundedContextEntity> boundedContexts, List<AggregateEntity> aggregates,
                         List<ModelEntity> models, List<UseCaseEntity> useCases,
                         List<DomainEventEntity> domainEvents,
                         List<IntegrationEventEntity> integrationEvents,
                         List<SubscriptionEntity> subscriptions, List<ProjectionEntity> projections,
                         List<ReadModelEntity> readModels, List<SagaEntity> sagas,
                         List<FlowEntity> flows, List<ProcessEntity> processes,
                         List<DecisionEntity> decisions, List<PageEntity> pages,
                         List<QueryServiceEntity> queryServices,
                         List<ModelMappingEntity> modelMappings, List<EntityEntity> entities,
                         List<WorkflowEntity> workflows, List<AiAgentEntity> aiAgents,
                         List<RagEntity> rags, List<ApiEntity> apis, List<McpGatewayEntity> mcpGateways) {
        this(projects, services, boundedContexts, aggregates, models, useCases, domainEvents,
                integrationEvents, subscriptions, projections, readModels, sagas, flows, processes,
                decisions, pages, queryServices, modelMappings, entities, workflows, aiAgents,
                rags, apis, mcpGateways, null);
    }

    /** Backward-compatible constructor (pre-mcpGateways callers). */
    public ModelSnapshot(List<ProjectEntity> projects, List<ServiceEntity> services,
                         List<BoundedContextEntity> boundedContexts, List<AggregateEntity> aggregates,
                         List<ModelEntity> models, List<UseCaseEntity> useCases,
                         List<DomainEventEntity> domainEvents,
                         List<IntegrationEventEntity> integrationEvents,
                         List<SubscriptionEntity> subscriptions, List<ProjectionEntity> projections,
                         List<ReadModelEntity> readModels, List<SagaEntity> sagas,
                         List<FlowEntity> flows, List<ProcessEntity> processes,
                         List<DecisionEntity> decisions, List<PageEntity> pages,
                         List<QueryServiceEntity> queryServices,
                         List<ModelMappingEntity> modelMappings, List<EntityEntity> entities,
                         List<WorkflowEntity> workflows, List<AiAgentEntity> aiAgents,
                         List<RagEntity> rags, List<ApiEntity> apis) {
        this(projects, services, boundedContexts, aggregates, models, useCases, domainEvents,
                integrationEvents, subscriptions, projections, readModels, sagas, flows, processes,
                decisions, pages, queryServices, modelMappings, entities, workflows, aiAgents,
                rags, apis, null);
    }

    /** Backward-compatible constructor (pre-apis callers). */
    public ModelSnapshot(List<ProjectEntity> projects, List<ServiceEntity> services,
                         List<BoundedContextEntity> boundedContexts, List<AggregateEntity> aggregates,
                         List<ModelEntity> models, List<UseCaseEntity> useCases,
                         List<DomainEventEntity> domainEvents,
                         List<IntegrationEventEntity> integrationEvents,
                         List<SubscriptionEntity> subscriptions, List<ProjectionEntity> projections,
                         List<ReadModelEntity> readModels, List<SagaEntity> sagas,
                         List<FlowEntity> flows, List<ProcessEntity> processes,
                         List<DecisionEntity> decisions, List<PageEntity> pages,
                         List<QueryServiceEntity> queryServices,
                         List<ModelMappingEntity> modelMappings, List<EntityEntity> entities,
                         List<WorkflowEntity> workflows, List<AiAgentEntity> aiAgents,
                         List<RagEntity> rags) {
        this(projects, services, boundedContexts, aggregates, models, useCases, domainEvents,
                integrationEvents, subscriptions, projections, readModels, sagas, flows, processes,
                decisions, pages, queryServices, modelMappings, entities, workflows, aiAgents,
                rags, null);
    }

    /** Backward-compatible constructor (pre-rags callers). */
    public ModelSnapshot(List<ProjectEntity> projects, List<ServiceEntity> services,
                         List<BoundedContextEntity> boundedContexts, List<AggregateEntity> aggregates,
                         List<ModelEntity> models, List<UseCaseEntity> useCases,
                         List<DomainEventEntity> domainEvents,
                         List<IntegrationEventEntity> integrationEvents,
                         List<SubscriptionEntity> subscriptions, List<ProjectionEntity> projections,
                         List<ReadModelEntity> readModels, List<SagaEntity> sagas,
                         List<FlowEntity> flows, List<ProcessEntity> processes,
                         List<DecisionEntity> decisions, List<PageEntity> pages,
                         List<QueryServiceEntity> queryServices,
                         List<ModelMappingEntity> modelMappings, List<EntityEntity> entities,
                         List<WorkflowEntity> workflows, List<AiAgentEntity> aiAgents) {
        this(projects, services, boundedContexts, aggregates, models, useCases, domainEvents,
                integrationEvents, subscriptions, projections, readModels, sagas, flows, processes,
                decisions, pages, queryServices, modelMappings, entities, workflows, aiAgents, null);
    }

    /** Backward-compatible constructor (pre-aiAgents callers). */
    public ModelSnapshot(List<ProjectEntity> projects, List<ServiceEntity> services,
                         List<BoundedContextEntity> boundedContexts, List<AggregateEntity> aggregates,
                         List<ModelEntity> models, List<UseCaseEntity> useCases,
                         List<DomainEventEntity> domainEvents,
                         List<IntegrationEventEntity> integrationEvents,
                         List<SubscriptionEntity> subscriptions, List<ProjectionEntity> projections,
                         List<ReadModelEntity> readModels, List<SagaEntity> sagas,
                         List<FlowEntity> flows, List<ProcessEntity> processes,
                         List<DecisionEntity> decisions, List<PageEntity> pages,
                         List<QueryServiceEntity> queryServices,
                         List<ModelMappingEntity> modelMappings, List<EntityEntity> entities,
                         List<WorkflowEntity> workflows) {
        this(projects, services, boundedContexts, aggregates, models, useCases, domainEvents,
                integrationEvents, subscriptions, projections, readModels, sagas, flows, processes,
                decisions, pages, queryServices, modelMappings, entities, workflows, null);
    }

    /** Backward-compatible constructor (pre-workflows callers). */
    public ModelSnapshot(List<ProjectEntity> projects, List<ServiceEntity> services,
                         List<BoundedContextEntity> boundedContexts, List<AggregateEntity> aggregates,
                         List<ModelEntity> models, List<UseCaseEntity> useCases,
                         List<DomainEventEntity> domainEvents,
                         List<IntegrationEventEntity> integrationEvents,
                         List<SubscriptionEntity> subscriptions, List<ProjectionEntity> projections,
                         List<ReadModelEntity> readModels, List<SagaEntity> sagas,
                         List<FlowEntity> flows, List<ProcessEntity> processes,
                         List<DecisionEntity> decisions, List<PageEntity> pages,
                         List<QueryServiceEntity> queryServices,
                         List<ModelMappingEntity> modelMappings, List<EntityEntity> entities) {
        this(projects, services, boundedContexts, aggregates, models, useCases, domainEvents,
                integrationEvents, subscriptions, projections, readModels, sagas, flows, processes,
                decisions, pages, queryServices, modelMappings, entities, null);
    }

    public ModelSnapshot {
        projects = nvl(projects);
        services = nvl(services);
        boundedContexts = nvl(boundedContexts);
        aggregates = nvl(aggregates);
        models = nvl(models);
        useCases = nvl(useCases);
        domainEvents = nvl(domainEvents);
        integrationEvents = nvl(integrationEvents);
        subscriptions = nvl(subscriptions);
        projections = nvl(projections);
        readModels = nvl(readModels);
        sagas = nvl(sagas);
        flows = nvl(flows);
        processes = nvl(processes);
        decisions = nvl(decisions);
        pages = nvl(pages);
        queryServices = nvl(queryServices);
        modelMappings = nvl(modelMappings);
        entities = nvl(entities);
        workflows = nvl(workflows);
        aiAgents = nvl(aiAgents);
        rags = nvl(rags);
        apis = nvl(apis);
        mcpGateways = nvl(mcpGateways);
        modules = nvl(modules);
        roles = nvl(roles);
        uiAdapters = nvl(uiAdapters);
        domainServices = nvl(domainServices);
        applicationEvents = nvl(applicationEvents);
        interactions = nvl(interactions);
        externalSystems = nvl(externalSystems);
        contextMapRelations = nvl(contextMapRelations);
        deployments = nvl(deployments);
    }

    public static ModelSnapshot from(ModelStore repository) {
        return new ModelSnapshot(
                repository.findAllOfType(ProjectEntity.class),
                repository.findAllOfType(ServiceEntity.class),
                repository.findAllOfType(BoundedContextEntity.class),
                repository.findAllOfType(AggregateEntity.class),
                repository.findAllOfType(ModelEntity.class),
                repository.findAllOfType(UseCaseEntity.class),
                repository.findAllOfType(DomainEventEntity.class),
                repository.findAllOfType(IntegrationEventEntity.class),
                repository.findAllOfType(SubscriptionEntity.class),
                repository.findAllOfType(ProjectionEntity.class),
                repository.findAllOfType(ReadModelEntity.class),
                repository.findAllOfType(SagaEntity.class),
                repository.findAllOfType(FlowEntity.class),
                repository.findAllOfType(ProcessEntity.class),
                repository.findAllOfType(DecisionEntity.class),
                repository.findAllOfType(PageEntity.class),
                repository.findAllOfType(QueryServiceEntity.class),
                repository.findAllOfType(ModelMappingEntity.class),
                repository.findAllOfType(EntityEntity.class),
                repository.findAllOfType(WorkflowEntity.class),
                repository.findAllOfType(AiAgentEntity.class),
                repository.findAllOfType(RagEntity.class),
                repository.findAllOfType(ApiEntity.class),
                repository.findAllOfType(McpGatewayEntity.class),
                repository.findAllOfType(ModuleEntity.class),
                repository.findAllOfType(RoleEntity.class),
                repository.findAllOfType(UiAdapterEntity.class),
                repository.findAllOfType(DomainServiceEntity.class),
                repository.findAllOfType(ApplicationEventEntity.class),
                repository.findAllOfType(InteractionEntity.class),
                repository.findAllOfType(ExternalSystemEntity.class),
                repository.findAllOfType(ContextMapRelationEntity.class),
                repository.findAllOfType(DeploymentEntity.class));
    }

    /** Snapshot with only the given slices — for tests. Everything else is empty. */
    public static ModelSnapshot empty() {
        var constructor = ModelSnapshot.class.getDeclaredConstructors()[0];
        constructor.setAccessible(true);
        try {
            return (ModelSnapshot) constructor.newInstance(new Object[constructor.getParameterCount()]);
        } catch (ReflectiveOperationException e) {
            throw new IllegalStateException("Could not build an empty ModelSnapshot", e);
        }
    }

    private static <T> List<T> nvl(List<T> list) {
        return list != null ? list : List.of();
    }
}
