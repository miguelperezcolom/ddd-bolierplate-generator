package io.mateu.modux.modeldrivengenerator.infra.out.persistence.file;

public record ModelValidationEntity(
        String id,
        String condition,
        String fieldIds,
        String message
) {
}
