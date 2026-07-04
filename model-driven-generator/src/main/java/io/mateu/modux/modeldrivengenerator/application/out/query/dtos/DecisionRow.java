package io.mateu.modux.modeldrivengenerator.application.out.query.dtos;

import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionStatus;
import io.mateu.uidl.annotations.Hidden;

public record DecisionRow(@Hidden String id, String name, DecisionStatus status) {
}
