package io.mateu.mdd.specdrivengenerator.application.out.query.dtos;

public record ModelValidationDto(
        String id,
        String condition,
        String fieldIds,
        String message
) {
}
