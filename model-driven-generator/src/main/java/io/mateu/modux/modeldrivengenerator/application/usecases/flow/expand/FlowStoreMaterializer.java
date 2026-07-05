package io.mateu.modux.modeldrivengenerator.application.usecases.flow.expand;

import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.CommonFileRepository;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.FlowEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.IntegrationEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModelMappingEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ModuleEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ProjectionEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.ReadModelEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SagaEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.SubscriptionEntity;
import io.mateu.uidl.interfaces.Identifiable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;

/**
 * Materializes flow-derived structural pieces into the in-memory store (and the owning modules'
 * id lists) so the existing code generator picks them up exactly as if they had been declared by
 * hand — without persisting them to disk (flows stay the single source of truth). Always pair
 * {@link #materialize()} with {@link #restore()} in a finally block.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class FlowStoreMaterializer {

    final CommonFileRepository repository;
    final FlowExpander expander;
    final FlowExpansionContextResolver resolver;

    /** Per-module ids to append to the module's domain-event / projection / subscription / saga lists. */
    private record ModuleAdditions(List<String> domainEvents, List<String> projections,
                                   List<String> subscriptions, List<String> sagas) {
        static ModuleAdditions empty() {
            return new ModuleAdditions(new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>());
        }
    }

    public void materialize() {
        var flows = repository.findAllOfType(FlowEntity.class).stream()
                .map(FlowExpansionService::toDomain)
                .toList();
        if (flows.isEmpty()) {
            return;
        }

        var seenModelNames = keys(ModelEntity.class, ModelEntity::name);
        var seenEventNames = keys(DomainEventEntity.class, DomainEventEntity::name);
        var seenTopics = keys(IntegrationEventEntity.class, IntegrationEventEntity::topicName);
        var seenReadModels = keys(ReadModelEntity.class, rm -> rm.moduleId() + "/" + rm.name());
        var seenProjections = keys(ProjectionEntity.class, ProjectionEntity::name);
        var seenSubscriptions = keys(SubscriptionEntity.class, SubscriptionEntity::name);
        var seenMappings = keys(ModelMappingEntity.class, ModelMappingEntity::name);
        var seenSagas = keys(SagaEntity.class, SagaEntity::name);

        Map<String, ModuleAdditions> additions = new HashMap<>();

        for (var flow : flows) {
            var ctx = resolver.resolve(flow);
            var x = expander.expand(flow, ctx);
            var sourceModuleId = ctx.sourceModuleId();
            var targetModuleId = flow.getTargetModuleId();

            saveIfNew(x.payloadModel(), seenModelNames, ModelEntity::name);
            saveIfNew(x.integrationEvent(), seenTopics, IntegrationEventEntity::topicName);
            saveIfNew(x.readModel(), seenReadModels, rm -> rm.moduleId() + "/" + rm.name());
            saveIfNew(x.modelMapping(), seenMappings, ModelMappingEntity::name);

            if (saveIfNew(x.domainEvent(), seenEventNames, DomainEventEntity::name) && sourceModuleId != null) {
                additions.computeIfAbsent(sourceModuleId, k -> ModuleAdditions.empty())
                        .domainEvents().add(x.domainEvent().id());
            }
            if (saveIfNew(x.projection(), seenProjections, ProjectionEntity::name) && targetModuleId != null) {
                additions.computeIfAbsent(targetModuleId, k -> ModuleAdditions.empty())
                        .projections().add(x.projection().id());
            }
            if (saveIfNew(x.subscription(), seenSubscriptions, SubscriptionEntity::name) && targetModuleId != null) {
                additions.computeIfAbsent(targetModuleId, k -> ModuleAdditions.empty())
                        .subscriptions().add(x.subscription().id());
            }
            if (saveIfNew(x.saga(), seenSagas, SagaEntity::name) && targetModuleId != null) {
                additions.computeIfAbsent(targetModuleId, k -> ModuleAdditions.empty())
                        .sagas().add(x.saga().id());
            }
        }

        additions.forEach((moduleId, add) ->
                repository.findById(moduleId, ModuleEntity.class).ifPresent(module ->
                        repository.putTransient(withAppended(module, add))));
    }

    /** Restores the store from disk, discarding the transient flow-derived pieces. */
    public void restore() {
        repository.init();
    }

    private <T extends Identifiable> boolean saveIfNew(T entity, Set<String> seen, Function<T, String> key) {
        if (entity == null) {
            return false;
        }
        var k = key.apply(entity);
        if (seen.contains(k)) {
            log.warn("Flow expansion: a {} matching '{}' already exists; skipping the derived one",
                    entity.getClass().getSimpleName(), k);
            return false;
        }
        seen.add(k);
        repository.putTransient(entity);
        return true;
    }

    private <T> Set<String> keys(Class<T> type, Function<T, String> key) {
        Set<String> set = new HashSet<>();
        repository.findAllOfType(type).forEach(e -> set.add(key.apply(e)));
        return set;
    }

    private static ModuleEntity withAppended(ModuleEntity m, ModuleAdditions add) {
        return m.toBuilder()
                .domainEventIds(concat(m.domainEventIds(), add.domainEvents()))
                .projectionIds(concat(m.projectionIds(), add.projections()))
                .subscriptionIds(concat(m.subscriptionIds(), add.subscriptions()))
                .sagaIds(concat(m.sagaIds(), add.sagas()))
                .build();
    }

    private static List<String> concat(List<String> base, List<String> extra) {
        List<String> result = new ArrayList<>(base != null ? base : List.of());
        result.addAll(extra);
        return result;
    }
}
