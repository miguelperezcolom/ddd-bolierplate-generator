package io.mateu.mdd.specdrivengenerator.infra.out.persistence.file;

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
        List<ReadModelEntity> readModels
        ) {

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
        readModels = readModels != null ? readModels : List.of();
    }
}
