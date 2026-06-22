package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

public record PageValidationEntity(
        String condition,
        String fieldId,
        String message
) {
}
