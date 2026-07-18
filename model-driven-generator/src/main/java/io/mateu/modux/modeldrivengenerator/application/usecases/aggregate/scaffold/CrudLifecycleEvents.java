package io.mateu.modux.modeldrivengenerator.application.usecases.aggregate.scaffold;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseStepType;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.AggregateEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.DomainEventEntity;
import io.mateu.modux.modeldrivengenerator.infra.out.persistence.file.UseCaseStepEntity;

import java.util.List;

/**
 * The three lifecycle domain events every CRUD over an aggregate implies —
 * {Agregado}Creado/a, {Agregado}Modificado/a, {Agregado}Eliminado/a — with deterministic
 * ids so re-deriving updates instead of duplicating. Shared by the page derivation and
 * the actor-CRUD gesture. The participle follows the aggregate name's gender (names
 * ending in «a» take the feminine form), matching the hand-authored samples.
 */
public final class CrudLifecycleEvents {

    private CrudLifecycleEvents() {}

    /** A lifecycle event descriptor: deterministic id and display name. */
    public record LifecycleEvent(String id, String name) {}

    /** create → Creado/a, update → Modificado/a, delete → Eliminado/a. */
    public static List<LifecycleEvent> lifecycleOf(String aggregateId, String aggregateName) {
        return List.of(
                event(aggregateId, aggregateName, "Cread"),
                event(aggregateId, aggregateName, "Modificad"),
                event(aggregateId, aggregateName, "Eliminad"));
    }

    /** The minimal catalog entries for the three lifecycle events of `aggregate`. */
    public static List<DomainEventEntity> forAggregate(AggregateEntity aggregate) {
        return lifecycleOf(aggregate.id(), aggregate.name()).stream()
                .map(e -> new DomainEventEntity(e.id(), e.name(), null, false, null, null, null,
                        null, null, null, false, null, null, null, null, false, null))
                .toList();
    }

    /** The PublishDomainEvent step a CRUD use case appends for its lifecycle event. */
    public static UseCaseStepEntity publishStep(LifecycleEvent event) {
        return new UseCaseStepEntity("step-publish-" + event.id(), "publish" + event.name(),
                UseCaseStepType.PublishDomainEvent, null, null, null, null, event.id(),
                null, null, null, null, null, null, null);
    }

    private static LifecycleEvent event(String aggregateId, String aggregateName, String stem) {
        var participle = stem + (feminine(aggregateName) ? "a" : "o");
        return new LifecycleEvent("ev-" + aggregateId + participle, aggregateName + participle);
    }

    private static boolean feminine(String name) {
        return name != null && name.trim().endsWith("a");
    }
}
