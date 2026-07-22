package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;

import java.util.List;

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
        String description,
        /** The rules this value object protects — a VO can carry invariants, unlike a plain model. */
        List<InvariantEntity> invariants,
        /**
         * A RECORD value object IS a Model with invariants on the outside: its structure lives in
         * the referenced Model (its fields). Null for Enum/Wrapper. Replaces the legacy fieldsJson.
         */
        String modelId
) implements Identifiable {

    /** The invariants, never null. */
    public List<InvariantEntity> invariants() {
        return invariants != null ? invariants : List.of();
    }

    /** Backward-compatible constructor (pre-modelId callers). */
    public ValueObjectEntity(String id, String name, String type, String valuesJson,
            String fieldsJson, String dataType, String projectId, String description,
            List<InvariantEntity> invariants) {
        this(id, name, type, valuesJson, fieldsJson, dataType, projectId, description, invariants, null);
    }

    /** Backward-compatible constructor (pre-invariants callers). */
    public ValueObjectEntity(String id, String name, String type, String valuesJson,
            String fieldsJson, String dataType, String projectId, String description) {
        this(id, name, type, valuesJson, fieldsJson, dataType, projectId, description, List.of(), null);
    }

    /** Backward-compatible constructor (pre-description callers). */
    public ValueObjectEntity(String id, String name, String type, String valuesJson,
            String fieldsJson, String dataType, String projectId) {
        this(id, name, type, valuesJson, fieldsJson, dataType, projectId, null, List.of());
    }
}
