package io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.Flow;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelFieldEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ServiceEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseEntity;
import io.mateu.uidl.data.FieldDataType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Resolves the {@link FlowExpansionContext} a flow needs from the rest of the model:
 * triggerAggregate → name + owning module → service → project, the target module name, and the
 * types of the materialized fields (read from the aggregate's model). Lenient: missing
 * references fall back to ids / string so expansion never hard-fails on an incomplete model.
 */
@Service
@RequiredArgsConstructor
public class FlowExpansionContextResolver {

    final CommonFileRepository repository;

    public FlowExpansionContext resolve(Flow flow) {
        // The domain Flow does not (yet) model the alternative domain-service trigger;
        // read it from the stored entity.
        var triggerDomainServiceId = repository
                .findById(flow.getId().id(), io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity.class)
                .map(io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity::triggerDomainServiceId)
                .orElse(null);
        return resolve(flow, triggerDomainServiceId,
                repository.findAllOfType(AggregateEntity.class),
                repository.findAllOfType(ModuleEntity.class),
                repository.findAllOfType(ServiceEntity.class),
                repository.findAllOfType(ProjectEntity.class),
                repository.findAllOfType(ModelEntity.class),
                repository.findAllOfType(UseCaseEntity.class));
    }

    /** Pre-domain-service-trigger overload, kept for existing tests. */
    static FlowExpansionContext resolve(Flow flow,
                                        List<AggregateEntity> aggregates,
                                        List<ModuleEntity> modules,
                                        List<ServiceEntity> services,
                                        List<ProjectEntity> projects,
                                        List<ModelEntity> models,
                                        List<UseCaseEntity> useCases) {
        return resolve(flow, null, aggregates, modules, services, projects, models, useCases);
    }

    /** Pure resolution over the given model slices — unit-testable without Spring or files. */
    static FlowExpansionContext resolve(Flow flow,
                                        String triggerDomainServiceId,
                                        List<AggregateEntity> aggregates,
                                        List<ModuleEntity> modules,
                                        List<ServiceEntity> services,
                                        List<ProjectEntity> projects,
                                        List<ModelEntity> models,
                                        List<UseCaseEntity> useCases) {
        var aggregateId = flow.getTriggerAggregateId();

        var aggregate = aggregates.stream().filter(a -> a.id().equals(aggregateId)).findFirst().orElse(null);
        var aggregateName = aggregate != null ? aggregate.name() : aggregateId;

        var sourceModule = modules.stream()
                .filter(m -> m.aggregateIds() != null && m.aggregateIds().contains(aggregateId))
                .findFirst()
                // Alternative trigger: the module owning the emitting domain service.
                .orElseGet(() -> triggerDomainServiceId == null ? null : modules.stream()
                        .filter(m -> m.domainServiceIds().contains(triggerDomainServiceId))
                        .findFirst().orElse(null));

        var sourceService = sourceModule == null ? null : services.stream()
                .filter(s -> s.moduleIds().contains(sourceModule.id()))
                .findFirst().orElse(null);
        var sourceServiceName = sourceService != null ? sourceService.name()
                : (sourceModule != null ? sourceModule.name() : aggregateId);

        var projectName = sourceService == null ? "app" : projects.stream()
                .filter(p -> p.serviceIds().contains(sourceService.id()))
                .map(ProjectEntity::name)
                .findFirst().orElse("app");

        var targetModule = modules.stream()
                .filter(m -> m.id().equals(flow.getTargetModuleId()))
                .findFirst().orElse(null);
        var targetModuleName = targetModule != null ? targetModule.name() : flow.getTargetModuleId();

        Map<String, FieldDataType> fieldTypes = new HashMap<>();
        if (aggregate != null && aggregate.modelId() != null) {
            models.stream()
                    .filter(m -> m.id().equals(aggregate.modelId()))
                    .findFirst()
                    .ifPresent(model -> {
                        var fields = model.fields() != null ? model.fields() : List.<ModelFieldEntity>of();
                        var byName = new HashMap<String, FieldDataType>();
                        fields.forEach(f -> byName.put(f.name(), f.type()));
                        var declared = flow.getMaterializedFields() != null ? flow.getMaterializedFields() : List.<String>of();
                        declared.forEach(name -> fieldTypes.put(name,
                                byName.getOrDefault(name, FieldDataType.string)));
                    });
        }

        var targetUseCase = flow.getTargetUseCaseId() == null ? null : useCases.stream()
                .filter(u -> u.id().equals(flow.getTargetUseCaseId()))
                .findFirst().orElse(null);
        var targetUseCaseName = targetUseCase != null ? targetUseCase.name() : flow.getTargetUseCaseId();
        var targetUseCaseInputModelId = targetUseCase != null ? targetUseCase.inputModelId() : null;

        var sourceModuleId = sourceModule != null ? sourceModule.id() : null;

        return new FlowExpansionContext(projectName, sourceServiceName, aggregateName, targetModuleName, fieldTypes,
                targetUseCaseName, targetUseCaseInputModelId, sourceModuleId);
    }
}
