package io.mateu.mdd.core.domain.aggregates.model;

import java.util.List;

public record Aggregate(
        String name,
        String packageName,
        Id id,
        List<Field> fields,
        List<Command> commands,
        List<Query> queries
) {
}
