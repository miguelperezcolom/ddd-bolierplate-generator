package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

import io.mateu.uidl.interfaces.Identifiable;
import lombok.Builder;

import java.util.List;

/**
 * A first-class transformation on the mappings map: it takes models and/or fields
 * as INPUTS and produces a model or a field as OUTPUT — all of it declared by
 * wiring relations on the diagram. The generator will pick it up later.
 */
@Builder(toBuilder = true)
public record TransformationEntity(
        String id,
        String name,
        List<TransformationRefEntity> inputs,
        /** The model or field this transformation produces (null while unwired). */
        TransformationRefEntity output,
        /** The hand-written code that implements it (CustomCodeEntity). */
        String customCodeId
) implements Identifiable {

    public TransformationEntity {
        if (inputs == null) inputs = List.of();
    }

    /** Backward-compatible constructor (pre-customCodeId callers and stores). */
    public TransformationEntity(String id, String name, List<TransformationRefEntity> inputs,
                                TransformationRefEntity output) {
        this(id, name, inputs, output, null);
    }
}
