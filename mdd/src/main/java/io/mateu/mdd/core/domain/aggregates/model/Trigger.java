package io.mateu.mdd.core.domain.aggregates.model;

public record Trigger(
        String onEvent,
        String startProcess
) {
}
