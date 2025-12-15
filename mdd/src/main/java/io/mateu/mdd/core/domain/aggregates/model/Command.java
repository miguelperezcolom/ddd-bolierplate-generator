package io.mateu.mdd.core.domain.aggregates.model;

import java.util.List;

public record Command(
        String name,
        String style,
        List<Field> args,
        String domainLogic
) {
}
