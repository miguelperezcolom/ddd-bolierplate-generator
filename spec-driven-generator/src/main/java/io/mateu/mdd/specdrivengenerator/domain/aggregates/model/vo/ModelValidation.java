package io.mateu.mdd.specdrivengenerator.domain.aggregates.model.vo;

public record ModelValidation(
        String id,
        String condition,
        String fieldIds,
        String message
) {
}
