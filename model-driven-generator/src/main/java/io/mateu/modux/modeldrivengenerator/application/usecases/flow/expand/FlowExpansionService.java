package io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.flow.Flow;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IntegrationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Function;

/**
 * Expands every {@link Flow} in the model into its structural building blocks, reusing any piece
 * already declared by hand instead of duplicating it (RFC §10.3: reuse by match and warn). The
 * result holds only the derived pieces that are new, ready to be fed to code generation.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class FlowExpansionService {

    final CommonFileRepository repository;
    final FlowExpander expander;
    final FlowExpansionContextResolver resolver;

    public FlowDerivedModel expandAll() {
        var expansions = repository.findAllOfType(FlowEntity.class).stream()
                .map(FlowExpansionService::toDomain)
                .map(flow -> expander.expand(flow, resolver.resolve(flow)))
                .toList();

        return new FlowDerivedModel(
                keepNew(collect(expansions, FlowExpansion::domainEvent), DomainEventEntity.class, DomainEventEntity::name),
                keepNew(collect(expansions, FlowExpansion::payloadModel), ModelEntity.class, ModelEntity::name),
                keepNew(collect(expansions, FlowExpansion::integrationEvent), IntegrationEventEntity.class, IntegrationEventEntity::topicName),
                keepNew(collect(expansions, FlowExpansion::readModel), ReadModelEntity.class, rm -> rm.moduleId() + "/" + rm.name()),
                keepNew(collect(expansions, FlowExpansion::projection), ProjectionEntity.class, ProjectionEntity::name),
                keepNew(collect(expansions, FlowExpansion::subscription), SubscriptionEntity.class, SubscriptionEntity::name),
                keepNew(collect(expansions, FlowExpansion::modelMapping), ModelMappingEntity.class, ModelMappingEntity::name),
                keepNew(collect(expansions, FlowExpansion::saga), SagaEntity.class, SagaEntity::name));
    }

    private static <T> List<T> collect(List<FlowExpansion> expansions, Function<FlowExpansion, T> piece) {
        return expansions.stream().map(piece).filter(java.util.Objects::nonNull).toList();
    }

    private <T> List<T> keepNew(List<T> derived, Class<T> existingType, Function<T, String> key) {
        return keepNew(derived, repository.findAllOfType(existingType), key);
    }

    /** Filters out derived pieces whose key already exists in the hand-declared set, logging reuse. */
    static <T> List<T> keepNew(List<T> derived, List<T> existing, Function<T, String> key) {
        Set<String> existingKeys = new HashSet<>();
        existing.forEach(e -> existingKeys.add(key.apply(e)));
        List<T> result = new ArrayList<>();
        for (T item : derived) {
            var k = key.apply(item);
            if (existingKeys.contains(k)) {
                log.info("Flow expansion reuses existing {} '{}' instead of generating a duplicate",
                        item.getClass().getSimpleName(), k);
            } else {
                existingKeys.add(k); // also dedups derived-vs-derived (two flows producing the same piece)
                result.add(item);
            }
        }
        return result;
    }

    static Flow toDomain(FlowEntity e) {
        return Flow.load(e.id(), e.name(), e.description(),
                e.archetype() != null ? e.archetype().name() : null,
                e.triggerAggregateId(), e.triggerEvent(), e.targetModuleId(),
                e.readModelName(), e.materializedFields(), e.targetUseCaseId(), e.inputMappings(), e.overrides());
    }
}
