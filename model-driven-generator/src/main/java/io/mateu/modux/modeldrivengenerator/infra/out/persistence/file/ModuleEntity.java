package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;
import lombok.Builder;

import java.util.List;

/**
 * A code boundedContext: how a bounded context's elements are DISTRIBUTED into buildable
 * units. The bounded context owns the meaning; the boundedContext owns the packaging (each
 * boundedContext carries its own hexagonal layers, derived from its elements' kinds); the
 * service (ServiceEntity.moduleIds) says where a boundedContext is DEPLOYED.
 */
@Builder(toBuilder = true)
public record ModuleEntity(
        String id,
        String name,
        /** The bounded context this boundedContext distributes elements of. */
        String boundedContextId,
        /** The elements (aggregates, use cases, events…) packaged in this boundedContext. */
        List<String> elementIds
) implements Identifiable {

    public ModuleEntity {
        if (elementIds == null) elementIds = List.of();
    }
}
