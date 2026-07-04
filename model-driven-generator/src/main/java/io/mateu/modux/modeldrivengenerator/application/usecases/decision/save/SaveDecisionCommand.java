package io.mateu.modux.modeldrivengenerator.application.usecases.decision.save;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionStatus;

public record SaveDecisionCommand(
        String id,
        String name,
        String decision,
        String rationale,
        DecisionStatus status,
        String source
) {
}
