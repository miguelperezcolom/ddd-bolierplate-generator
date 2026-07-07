package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

/**
 * An application event: a fact published by a use case (application layer), as opposed to a
 * domain event, which only aggregates and domain services emit. Both can be materialized into
 * read models of the same or another bounded context. Owned by a module through
 * {@code ModuleEntity.applicationEventIds}; use cases publish it via a PublishApplicationEvent
 * step ({@code UseCaseStepEntity.applicationEventId}).
 */
public record ApplicationEventEntity(
        String id,
        String name,
        String modelId
) implements Identifiable {
}
