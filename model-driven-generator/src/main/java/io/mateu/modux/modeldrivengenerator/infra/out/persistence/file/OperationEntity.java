package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record OperationEntity(
        String id,
        String name,
        String inputModelId,
        String outputModelId,
        String preconditions,
        String sets,
        String emits,
        String type,
        boolean paginated,
        Integer defaultPageSize
) implements Identifiable {
}
