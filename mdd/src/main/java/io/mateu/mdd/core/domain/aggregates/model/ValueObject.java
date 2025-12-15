package io.mateu.mdd.core.domain.aggregates.model;

import java.util.List;

public record ValueObject(
        String name,
        String packageName,
        List<Field> fields
) {
}
