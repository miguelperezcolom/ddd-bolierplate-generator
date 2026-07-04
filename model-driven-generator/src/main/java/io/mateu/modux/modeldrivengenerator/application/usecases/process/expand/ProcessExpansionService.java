package io.mateu.modux.modeldrivengenerator.application.usecases.process.expand;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProcessEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Expands every {@link ProcessEntity} in the model into its derived pieces, resolving the naming
 * context (aggregate → module → service → project) the same way flows do. Lenient: missing
 * references fall back to ids so expansion never hard-fails on an incomplete model.
 */
@Service
@RequiredArgsConstructor
public class ProcessExpansionService {

    final CommonFileRepository repository;
    final ProcessExpander expander;

    public List<ProcessExpansion> expandAll() {
        return repository.findAllOfType(ProcessEntity.class).stream()
                .map(process -> expander.expand(process, resolve(process)))
                .toList();
    }

    public ProcessExpansionContext resolve(ProcessEntity process) {
        return resolve(process,
                repository.findAllOfType(AggregateEntity.class),
                repository.findAllOfType(ModuleEntity.class),
                repository.findAllOfType(ServiceEntity.class),
                repository.findAllOfType(ProjectEntity.class),
                repository.findAllOfType(DomainEventEntity.class));
    }

    /** Pure resolution over the given model slices — unit-testable without Spring or files. */
    static ProcessExpansionContext resolve(ProcessEntity process,
                                           List<AggregateEntity> aggregates,
                                           List<ModuleEntity> modules,
                                           List<ServiceEntity> services,
                                           List<ProjectEntity> projects,
                                           List<DomainEventEntity> events) {
        var aggregateId = process.triggerAggregateId();
        var aggregate = aggregates.stream().filter(a -> a.id().equals(aggregateId)).findFirst().orElse(null);
        var aggregateName = aggregate != null ? aggregate.name() : aggregateId;

        var sourceModule = modules.stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(aggregateId))
                .findFirst().orElse(null);
        var sourceService = sourceModule == null ? null : services.stream()
                .filter(s -> s.moduleIds().contains(sourceModule.id()))
                .findFirst().orElse(null);
        var sourceServiceName = sourceService != null ? sourceService.name()
                : (sourceModule != null ? sourceModule.name() : aggregateId);

        var projectName = sourceService == null ? "app" : projects.stream()
                .filter(p -> p.serviceIds().contains(sourceService.id()))
                .map(ProjectEntity::name)
                .findFirst().orElse("app");

        var ownerModule = modules.stream()
                .filter(m -> m.id().equals(process.ownerModuleId()))
                .findFirst().orElse(null);
        var ownerModuleName = ownerModule != null ? ownerModule.name() : process.ownerModuleId();

        var triggerEventId = process.triggerEvent() == null ? null : events.stream()
                .filter(e -> process.triggerEvent().equals(e.name()))
                .map(DomainEventEntity::id)
                .findFirst().orElse(null);

        return new ProcessExpansionContext(projectName, sourceServiceName, aggregateName,
                process.ownerModuleId(), ownerModuleName, triggerEventId);
    }
}
