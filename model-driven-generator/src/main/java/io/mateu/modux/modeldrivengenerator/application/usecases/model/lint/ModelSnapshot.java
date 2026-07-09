package io.mateu.modux.modeldrivengenerator.application.usecases.model.lint;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AiAgentEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RagEntity;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DecisionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.EntityEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IntegrationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
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
        List<ModuleEntity> modules,
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
        List<McpGatewayEntity> mcpGateways
) {

    /** Backward-compatible constructor (pre-mcpGateways callers). */
    public ModelSnapshot(List<ProjectEntity> projects, List<ServiceEntity> services,
                         List<ModuleEntity> modules, List<AggregateEntity> aggregates,
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
        this(projects, services, modules, aggregates, models, useCases, domainEvents,
                integrationEvents, subscriptions, projections, readModels, sagas, flows, processes,
                decisions, pages, queryServices, modelMappings, entities, workflows, aiAgents,
                rags, apis, null);
    }

    /** Backward-compatible constructor (pre-apis callers). */
    public ModelSnapshot(List<ProjectEntity> projects, List<ServiceEntity> services,
                         List<ModuleEntity> modules, List<AggregateEntity> aggregates,
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
        this(projects, services, modules, aggregates, models, useCases, domainEvents,
                integrationEvents, subscriptions, projections, readModels, sagas, flows, processes,
                decisions, pages, queryServices, modelMappings, entities, workflows, aiAgents,
                rags, null);
    }

    /** Backward-compatible constructor (pre-rags callers). */
    public ModelSnapshot(List<ProjectEntity> projects, List<ServiceEntity> services,
                         List<ModuleEntity> modules, List<AggregateEntity> aggregates,
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
        this(projects, services, modules, aggregates, models, useCases, domainEvents,
                integrationEvents, subscriptions, projections, readModels, sagas, flows, processes,
                decisions, pages, queryServices, modelMappings, entities, workflows, aiAgents, null);
    }

    /** Backward-compatible constructor (pre-aiAgents callers). */
    public ModelSnapshot(List<ProjectEntity> projects, List<ServiceEntity> services,
                         List<ModuleEntity> modules, List<AggregateEntity> aggregates,
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
        this(projects, services, modules, aggregates, models, useCases, domainEvents,
                integrationEvents, subscriptions, projections, readModels, sagas, flows, processes,
                decisions, pages, queryServices, modelMappings, entities, workflows, null);
    }

    /** Backward-compatible constructor (pre-workflows callers). */
    public ModelSnapshot(List<ProjectEntity> projects, List<ServiceEntity> services,
                         List<ModuleEntity> modules, List<AggregateEntity> aggregates,
                         List<ModelEntity> models, List<UseCaseEntity> useCases,
                         List<DomainEventEntity> domainEvents,
                         List<IntegrationEventEntity> integrationEvents,
                         List<SubscriptionEntity> subscriptions, List<ProjectionEntity> projections,
                         List<ReadModelEntity> readModels, List<SagaEntity> sagas,
                         List<FlowEntity> flows, List<ProcessEntity> processes,
                         List<DecisionEntity> decisions, List<PageEntity> pages,
                         List<QueryServiceEntity> queryServices,
                         List<ModelMappingEntity> modelMappings, List<EntityEntity> entities) {
        this(projects, services, modules, aggregates, models, useCases, domainEvents,
                integrationEvents, subscriptions, projections, readModels, sagas, flows, processes,
                decisions, pages, queryServices, modelMappings, entities, null);
    }

    public ModelSnapshot {
        projects = nvl(projects);
        services = nvl(services);
        modules = nvl(modules);
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
    }

    public static ModelSnapshot from(ModelStore repository) {
        return new ModelSnapshot(
                repository.findAllOfType(ProjectEntity.class),
                repository.findAllOfType(ServiceEntity.class),
                repository.findAllOfType(ModuleEntity.class),
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
                repository.findAllOfType(McpGatewayEntity.class));
    }

    /** Snapshot with only the given slices — for tests. Everything else is empty. */
    public static ModelSnapshot empty() {
        return new ModelSnapshot(null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null);
    }

    private static <T> List<T> nvl(List<T> list) {
        return list != null ? list : List.of();
    }
}
