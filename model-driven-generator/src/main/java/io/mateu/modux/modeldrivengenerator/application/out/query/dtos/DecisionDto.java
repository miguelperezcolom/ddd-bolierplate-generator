package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionStatus;

public record DecisionDto(
        String id,
        String name,
        String decision,
        String rationale,
        DecisionStatus status,
        String source
) {
}
