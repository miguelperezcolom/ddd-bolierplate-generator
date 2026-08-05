package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.modux.modeldrivengenerator.domain.shared.Identifiable;

/**
 * An application event: a fact published by a use case (application layer), as opposed to a
 * domain event, which only aggregates and domain services emit. Both can be materialized into
 * read models of the same or another bounded context. Owned by a boundedContext through
 * {@code BoundedContextEntity.applicationEventIds}; use cases publish it via a PublishApplicationEvent
 * step ({@code UseCaseStepEntity.applicationEventId}).
 */
public record ApplicationEventEntity(
        String id,
        String name,
        String modelId
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId,
        /** Free-text description — shown on hover in the editor, edited in the ficha. */
        String description
) implements Identifiable {

    /** Backward-compatible constructor (pre-description callers). */
    public ApplicationEventEntity(String id, String name, String modelId, String projectId) {
        this(id, name, modelId, projectId, null);
    }
}
