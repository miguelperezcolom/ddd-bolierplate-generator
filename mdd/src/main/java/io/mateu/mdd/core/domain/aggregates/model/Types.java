package io.mateu.mdd.core.domain.aggregates.model;

import java.util.List;

public record Types(
        List<ValueObject> valueObjects,
        List<Enumeration> enums) {
}
