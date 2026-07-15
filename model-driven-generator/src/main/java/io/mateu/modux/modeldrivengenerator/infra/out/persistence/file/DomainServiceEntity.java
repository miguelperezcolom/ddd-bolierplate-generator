package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

/**
 * A domain service: stateless domain logic that does not belong to any single aggregate.
 * Like aggregates, its operations may declare emitted domain events ({@link OperationEntity#emits}),
 * so a domain service is a first-class emitter on the context map. Owned by a boundedContext through
 * {@code BoundedContextEntity.domainServiceIds}.
 */
public record DomainServiceEntity(
        String id,
        String name,
        String description,
        List<OperationEntity> operations
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    public List<OperationEntity> operations() {
        return operations != null ? operations : List.of();
    }
}
