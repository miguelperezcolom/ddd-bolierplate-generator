package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import java.util.List;

public record AllData(
        List<ProjectEntity> projects,
        List<ServiceEntity> services,
        List<ModuleEntity> modules,
        List<AggregateEntity> aggregates,
        List<EntityEntity> entities,
        List<ValueObjectEntity> valueObjects,
        List<InvariantEntity> invariants,
        List<DomainEventEntity> domainEvents,
        List<UseCaseEntity> useCases,
        List<ModelEntity> models,
        List<GatewayEntity> gateways,
        List<ModelMappingEntity> modelMappings,
        List<SagaEntity> sagas,
        List<ProjectionEntity> projections,
        List<SubscriptionEntity> subscriptions,
        List<ScheduledTriggerEntity> scheduledTriggers,
        List<BusinessRuleEntity> businessRules,
        List<RoleEntity> roles,
        List<PageEntity> pages,
        List<UiAdapterEntity> uiAdapters,
        List<UiShellEntity> uiShells,
        List<ComponentEntity> components,
        List<BddScenarioEntity> bddScenarios,
        List<EnumEntity> enums,
        List<QueryServiceEntity> queryServices,
        List<IntegrationEventEntity> integrationEvents,
        List<ReadModelEntity> readModels,
        List<FlowEntity> flows,
        List<ProcessEntity> processes,
        List<DecisionEntity> decisions,
        List<ViewEntity> views,
        List<DiagramEntity> diagrams,
        List<DomainServiceEntity> domainServices,
        List<ApplicationEventEntity> applicationEvents,
        List<AiAgentEntity> aiAgents,
        List<WorkflowEntity> workflows,
        List<RagEntity> rags
        ) {

    /** An empty model — the starting point when the store file does not exist yet. */
    public static AllData empty() {
        return new AllData(null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null);
    }

    public AllData {
        projects = projects != null ? projects : List.of();
        services = services != null ? services : List.of();
        modules = modules != null ? modules : List.of();
        aggregates = aggregates != null ? aggregates : List.of();
        entities = entities != null ? entities : List.of();
        valueObjects = valueObjects != null ? valueObjects : List.of();
        invariants = invariants != null ? invariants : List.of();
        domainEvents = domainEvents != null ? domainEvents : List.of();
        useCases = useCases != null ? useCases : List.of();
        models = models != null ? models : List.of();
        gateways = gateways != null ? gateways : List.of();
        modelMappings = modelMappings != null ? modelMappings : List.of();
        sagas = sagas != null ? sagas : List.of();
        projections = projections != null ? projections : List.of();
        subscriptions = subscriptions != null ? subscriptions : List.of();
        scheduledTriggers = scheduledTriggers != null ? scheduledTriggers : List.of();
        businessRules = businessRules != null ? businessRules : List.of();
        roles = roles != null ? roles : List.of();
        pages = pages != null ? pages : List.of();
        uiAdapters = uiAdapters != null ? uiAdapters : List.of();
        uiShells = uiShells != null ? uiShells : List.of();
        components = components != null ? components : List.of();
        bddScenarios = bddScenarios != null ? bddScenarios : List.of();
        enums = enums != null ? enums : List.of();
        queryServices = queryServices != null ? queryServices : List.of();
        integrationEvents = integrationEvents != null ? integrationEvents : List.of();
        readModels = readModels != null ? readModels : List.of();
        flows = flows != null ? flows : List.of();
        processes = processes != null ? processes : List.of();
        decisions = decisions != null ? decisions : List.of();
        views = views != null ? views : List.of();
        diagrams = diagrams != null ? diagrams : List.of();
        domainServices = domainServices != null ? domainServices : List.of();
        applicationEvents = applicationEvents != null ? applicationEvents : List.of();
        aiAgents = aiAgents != null ? aiAgents : List.of();
        workflows = workflows != null ? workflows : List.of();
        rags = rags != null ? rags : List.of();
    }
}
