package io.mateu.mdd.core.domain.aggregates.model;

import java.util.List;

public record Model(
        Context context,
        Types types,
        List<Aggregate> aggregates,
        List<Decision> decisions,
        List<Workflow> workflows
) {
}
