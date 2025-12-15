package io.mateu.mdd.core.domain.aggregates.model;

import java.util.List;

public record Decision(
        String name,
        String kind,
        String engine,
        String dmnKey,
        List<Field> input,
        List<Field> output
) {
}
