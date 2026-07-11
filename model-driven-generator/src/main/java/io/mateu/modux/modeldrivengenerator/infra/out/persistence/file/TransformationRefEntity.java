package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

/** What a transformation reads or writes: a whole model (fieldId null) or one field. */
public record TransformationRefEntity(
        String modelId,
        String fieldId
) {
}
