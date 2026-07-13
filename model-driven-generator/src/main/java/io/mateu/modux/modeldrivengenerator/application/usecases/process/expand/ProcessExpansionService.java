package io.mateu.modux.modeldrivengenerator.application.usecases.process.expand;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.application.out.store.ModelStore;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.BoundedContextEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Expands every {@link ProcessEntity} in the model into its derived pieces, resolving the naming
 * context (aggregate → boundedContext → service → project) the same way flows do. Lenient: missing
 * references fall back to ids so expansion never hard-fails on an incomplete model.
 */
@Service
@RequiredArgsConstructor
public class ProcessExpansionService {

    final ModelStore repository;
    final ProcessExpander expander;

    public List<ProcessExpansion> expandAll() {
        return repository.findAllOfType(ProcessEntity.class).stream()
                .map(process -> expander.expand(process, resolve(process)))
                .toList();
    }

    public ProcessExpansionContext resolve(ProcessEntity process) {
        return resolve(process,
                repository.findAllOfType(AggregateEntity.class),
                repository.findAllOfType(BoundedContextEntity.class),
                repository.findAllOfType(ServiceEntity.class),
                repository.findAllOfType(ProjectEntity.class),
                repository.findAllOfType(DomainEventEntity.class));
    }

    /** Pure resolution over the given model slices — unit-testable without Spring or files. */
    static ProcessExpansionContext resolve(ProcessEntity process,
                                           List<AggregateEntity> aggregates,
                                           List<BoundedContextEntity> boundedContexts,
                                           List<ServiceEntity> services,
                                           List<ProjectEntity> projects,
                                           List<DomainEventEntity> events) {
        var aggregateId = process.triggerAggregateId();
        var aggregate = aggregates.stream().filter(a -> a.id().equals(aggregateId)).findFirst().orElse(null);
        var aggregateName = aggregate != null ? aggregate.name() : aggregateId;

        var sourceBoundedContext = boundedContexts.stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(aggregateId))
                .findFirst().orElse(null);
        var sourceService = sourceBoundedContext == null ? null : services.stream()
                .filter(s -> s.boundedContextIds().contains(sourceBoundedContext.id()))
                .findFirst().orElse(null);
        var sourceServiceName = sourceService != null ? sourceService.name()
                : (sourceBoundedContext != null ? sourceBoundedContext.name() : aggregateId);

        var projectName = sourceService == null ? "app" : projects.stream()
                .filter(p -> p.serviceIds().contains(sourceService.id()))
                .map(ProjectEntity::name)
                .findFirst().orElse("app");

        var ownerBoundedContext = boundedContexts.stream()
                .filter(m -> m.id().equals(process.ownerBoundedContextId()))
                .findFirst().orElse(null);
        var ownerBoundedContextName = ownerBoundedContext != null ? ownerBoundedContext.name() : process.ownerBoundedContextId();

        var triggerEventId = process.triggerEvent() == null ? null : events.stream()
                .filter(e -> process.triggerEvent().equals(e.name()))
                .map(DomainEventEntity::id)
                .findFirst().orElse(null);

        return new ProcessExpansionContext(projectName, sourceServiceName, aggregateName,
                process.ownerBoundedContextId(), ownerBoundedContextName, triggerEventId);
    }
}
