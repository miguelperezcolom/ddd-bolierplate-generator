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
        String projectId,
        /** Free-text description — shown on hover in the editor, edited in the ficha. */
        String description
) implements Identifiable {

    /** Backward-compatible constructor (pre-description callers). */
    public ValueObjectEntity(String id, String name, String type, String valuesJson,
            String fieldsJson, String dataType, String projectId) {
        this(id, name, type, valuesJson, fieldsJson, dataType, projectId, null);
    }
}
