package io.mateu.mdd.core.domain.aggregates.model;

import java.util.List;

public record Enumeration(
        String name,
        String packageName,
        List<String> values
) {
}
