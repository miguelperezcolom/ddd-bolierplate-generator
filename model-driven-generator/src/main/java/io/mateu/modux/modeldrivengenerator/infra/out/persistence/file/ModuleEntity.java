package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;
import lombok.Builder;

import java.util.List;

/**
 * A module: how a bounded context's elements are DISTRIBUTED into buildable
 * units. The bounded context owns the meaning; the module owns the packaging (each
 * module carries its own hexagonal layers, derived from its elements' kinds); the
 * service (ServiceEntity.moduleIds) says where a module is DEPLOYED.
 *
 * Every bounded context has exactly one MAIN module, created with it; elements
 * not explicitly packaged in another module belong to the main one implicitly.
 */
@Builder(toBuilder = true)
public record ModuleEntity(
        String id,
        String name,
        /** The bounded context this module distributes elements of. */
        String boundedContextId,
        /** The elements (aggregates, use cases, events…) explicitly packaged here. */
        List<String> elementIds,
        /** The bounded context's default module: it holds every undistributed element. */
        boolean main
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {

    public ModuleEntity {
        if (elementIds == null) elementIds = List.of();
    }
}
