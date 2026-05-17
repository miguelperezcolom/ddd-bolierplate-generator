package io.mateu.modux.specdrivengenerator.infra.out.persistence.file;

public record PageValidationEntity(
        String condition,
        String fieldId,
        String message
) {
}
