package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

public record ValueObjectEntity(
        String id,
        String name,
        String type,
        String valuesJson,
        String fieldsJson,
        String dataType,
        /** The project this element belongs to (selection scoping; null = legacy, claimed on open). */
        String projectId
) implements Identifiable {
}
