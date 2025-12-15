package io.mateu.mdd.core.domain.aggregates.model;

public record Field(
        String name,
        String type,
        String defaultValue
) {
}
