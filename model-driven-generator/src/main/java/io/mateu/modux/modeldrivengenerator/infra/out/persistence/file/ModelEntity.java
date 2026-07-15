package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

public record ModelEntity(
        String id,
        String name,
        List<ModelFieldEntity> fields,
        List<ModelValidationEntity> validations
,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {
}
