package io.mateu.modux.modeldrivengenerator.application.usecases.interaction.shared;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.interaction.vo.InteractionParticipantType;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AiAgentEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApiOperationEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ApplicationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ExternalSystemEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.PageEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.QueryServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.RoleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UiAdapterEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.WorkflowEntity;

import java.util.List;

/**
 * The slices of the model an interaction can point at, resolved once and shared by the
 * backing resolver, the derivation and the projection. Participants are looked up here by
 * ref (ids are unique across the whole store; on legacy collisions the FIRST type in the
 * {@link #typeOf} order wins).
 */
public record InteractionCatalog(
        List<RoleEntity> actors,
        List<UiAdapterEntity> apps,
        List<PageEntity> pages,
        List<UseCaseEntity> useCases,
        List<AggregateEntity> aggregates,
        List<DomainServiceEntity> domainServices,
        List<QueryServiceEntity> queryServices,
        List<ReadModelEntity> readModels,
        List<ExternalSystemEntity> externalSystems,
        List<ApiEntity> apis,
        List<AiAgentEntity> aiAgents,
        List<ProcessEntity> processes,
        List<WorkflowEntity> workflows,
        List<FlowEntity> flows,
        List<SubscriptionEntity> subscriptions,
        List<DomainEventEntity> domainEvents,
        List<ApplicationEventEntity> applicationEvents
) {

    public InteractionCatalog {
        actors = nvl(actors);
        apps = nvl(apps);
        pages = nvl(pages);
        useCases = nvl(useCases);
        aggregates = nvl(aggregates);
        domainServices = nvl(domainServices);
        queryServices = nvl(queryServices);
        readModels = nvl(readModels);
        externalSystems = nvl(externalSystems);
        apis = nvl(apis);
        aiAgents = nvl(aiAgents);
        processes = nvl(processes);
        workflows = nvl(workflows);
        flows = nvl(flows);
        subscriptions = nvl(subscriptions);
        domainEvents = nvl(domainEvents);
        applicationEvents = nvl(applicationEvents);
    }

    /** The whole store as a catalog. Unscoped on purpose: derivation and backing follow
     * references wherever they point, even across project selections. */
    public static InteractionCatalog from(ModelStore repository) {
        return new InteractionCatalog(
                repository.findAllOfType(RoleEntity.class),
                repository.findAllOfType(UiAdapterEntity.class),
                repository.findAllOfType(PageEntity.class),
                repository.findAllOfType(UseCaseEntity.class),
                repository.findAllOfType(AggregateEntity.class),
                repository.findAllOfType(DomainServiceEntity.class),
                repository.findAllOfType(QueryServiceEntity.class),
                repository.findAllOfType(ReadModelEntity.class),
                repository.findAllOfType(ExternalSystemEntity.class),
                repository.findAllOfType(ApiEntity.class),
                repository.findAllOfType(AiAgentEntity.class),
                repository.findAllOfType(ProcessEntity.class),
                repository.findAllOfType(WorkflowEntity.class),
                repository.findAllOfType(FlowEntity.class),
                repository.findAllOfType(SubscriptionEntity.class),
                repository.findAllOfType(DomainEventEntity.class),
                repository.findAllOfType(ApplicationEventEntity.class));
    }

    /** The participant type of a ref, or UNKNOWN when nothing in the catalog has that id. */
    public InteractionParticipantType typeOf(String ref) {
        if (ref == null) return InteractionParticipantType.UNKNOWN;
        if (actors.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.ACTOR;
        if (apps.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.APP;
        if (pages.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.PAGE;
        if (useCases.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.USE_CASE;
        if (aggregates.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.AGGREGATE;
        if (domainServices.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.DOMAIN_SERVICE;
        if (queryServices.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.QUERY_SERVICE;
        if (readModels.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.READ_MODEL;
        if (externalSystems.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.EXTERNAL_SYSTEM;
        if (apis.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.API;
        if (apiOperation(ref) != null) return InteractionParticipantType.API_OPERATION;
        if (aiAgents.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.AI_AGENT;
        if (processes.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.PROCESS;
        if (workflows.stream().anyMatch(x -> ref.equals(x.id()))) return InteractionParticipantType.WORKFLOW;
        return InteractionParticipantType.UNKNOWN;
    }

    /** Display name of a participant; falls back to the ref itself when it dangles. */
    public String nameOf(String ref) {
        if (ref == null) return null;
        var named = java.util.stream.Stream.<java.util.function.Supplier<String>>of(
                () -> actors.stream().filter(x -> ref.equals(x.id())).map(RoleEntity::name).findFirst().orElse(null),
                () -> apps.stream().filter(x -> ref.equals(x.id())).map(UiAdapterEntity::name).findFirst().orElse(null),
                () -> pages.stream().filter(x -> ref.equals(x.id())).map(PageEntity::name).findFirst().orElse(null),
                () -> useCases.stream().filter(x -> ref.equals(x.id())).map(UseCaseEntity::name).findFirst().orElse(null),
                () -> aggregates.stream().filter(x -> ref.equals(x.id())).map(AggregateEntity::name).findFirst().orElse(null),
                () -> domainServices.stream().filter(x -> ref.equals(x.id())).map(DomainServiceEntity::name).findFirst().orElse(null),
                () -> queryServices.stream().filter(x -> ref.equals(x.id())).map(QueryServiceEntity::name).findFirst().orElse(null),
                () -> readModels.stream().filter(x -> ref.equals(x.id())).map(ReadModelEntity::name).findFirst().orElse(null),
                () -> externalSystems.stream().filter(x -> ref.equals(x.id())).map(ExternalSystemEntity::name).findFirst().orElse(null),
                () -> apis.stream().filter(x -> ref.equals(x.id())).map(ApiEntity::name).findFirst().orElse(null),
                () -> {
                    var op = apiOperation(ref);
                    return op != null ? op.name() : null;
                },
                () -> aiAgents.stream().filter(x -> ref.equals(x.id())).map(AiAgentEntity::name).findFirst().orElse(null),
                () -> processes.stream().filter(x -> ref.equals(x.id())).map(ProcessEntity::name).findFirst().orElse(null),
                () -> workflows.stream().filter(x -> ref.equals(x.id())).map(WorkflowEntity::name).findFirst().orElse(null));
        return named.map(java.util.function.Supplier::get)
                .filter(java.util.Objects::nonNull)
                .findFirst()
                .orElse(ref);
    }

    public UseCaseEntity useCase(String id) {
        return useCases.stream().filter(x -> x.id().equals(id)).findFirst().orElse(null);
    }

    public AggregateEntity aggregate(String id) {
        return aggregates.stream().filter(x -> x.id().equals(id)).findFirst().orElse(null);
    }

    public QueryServiceEntity queryService(String id) {
        return queryServices.stream().filter(x -> x.id().equals(id)).findFirst().orElse(null);
    }

    public ReadModelEntity readModel(String id) {
        return readModels.stream().filter(x -> x.id().equals(id)).findFirst().orElse(null);
    }

    /** The operation with that id, wherever it is published (operations live inside their API). */
    public ApiOperationEntity apiOperation(String operationId) {
        return apis.stream()
                .flatMap(a -> a.operations().stream())
                .filter(op -> op.id() != null && op.id().equals(operationId))
                .findFirst()
                .orElse(null);
    }

    /** The external system OFFERING that external use case (target of CallExternalUseCase steps). */
    public ExternalSystemEntity externalSystemOfUseCase(String externalUseCaseId) {
        if (externalUseCaseId == null) return null;
        return externalSystems.stream()
                .filter(x -> x.useCases().stream().anyMatch(u -> externalUseCaseId.equals(u.id())))
                .findFirst()
                .orElse(null);
    }

    /** The NAME of a domain event id (flows, processes and subscriptions match by name). */
    public String domainEventName(String domainEventId) {
        return domainEvents.stream()
                .filter(e -> e.id().equals(domainEventId))
                .map(DomainEventEntity::name)
                .findFirst()
                .orElse(null);
    }

    /** The NAME of an application event id. */
    public String applicationEventName(String applicationEventId) {
        return applicationEvents.stream()
                .filter(e -> e.id().equals(applicationEventId))
                .map(ApplicationEventEntity::name)
                .findFirst()
                .orElse(null);
    }

    /** Event names match leniently everywhere (emissions are a CSV of names typed by hand). */
    public static boolean sameEventName(String a, String b) {
        return a != null && b != null && a.trim().equalsIgnoreCase(b.trim());
    }

    private static <T> List<T> nvl(List<T> list) {
        return list != null ? list : List.of();
    }
}
