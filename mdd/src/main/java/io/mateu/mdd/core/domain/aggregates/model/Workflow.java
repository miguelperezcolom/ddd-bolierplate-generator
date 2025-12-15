package io.mateu.mdd.core.domain.aggregates.model;

import java.util.List;

public record Workflow(
        String name,
        String kind,
        String packageName,
        String file,
        List<Trigger> triggers
) {
}
