package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;
import lombok.Builder;

import java.util.List;

/**
 * A code module: how a bounded context's elements are DISTRIBUTED into buildable
 * units. The bounded context owns the meaning; the module owns the packaging (each
 * module carries its own hexagonal layers, derived from its elements' kinds); the
 * service (ServiceEntity.codeModuleIds) says where a module is DEPLOYED.
 */
@Builder(toBuilder = true)
public record CodeModuleEntity(
        String id,
        String name,
        /** The bounded context this module distributes elements of. */
        String moduleId,
        /** The elements (aggregates, use cases, events…) packaged in this module. */
        List<String> elementIds
) implements Identifiable {

    public CodeModuleEntity {
        if (elementIds == null) elementIds = List.of();
    }
}
