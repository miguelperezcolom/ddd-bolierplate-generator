package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

public record ModelValidationDto(
        String id,
        String condition,
        String fieldIds,
        String message
) {
}
