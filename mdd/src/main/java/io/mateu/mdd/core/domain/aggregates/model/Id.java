package io.mateu.mdd.core.domain.aggregates.model;

public record Id(
        String name,
        String type,
        String generator
) {
}
