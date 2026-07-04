package io.mateu.modux.modeldrivengenerator.application.usecases.decision.create;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionStatus;

public record CreateDecisionCommand(
        String id,
        String name,
        String decision,
        String rationale,
        DecisionStatus status,
        String source
) {
}
