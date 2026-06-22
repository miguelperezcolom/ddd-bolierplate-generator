package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record QueryServiceEntity(
        String id,
        String name,
        String moduleId,
        String description,
        List<QueryOperationEntity> operations
) implements Identifiable {
}
