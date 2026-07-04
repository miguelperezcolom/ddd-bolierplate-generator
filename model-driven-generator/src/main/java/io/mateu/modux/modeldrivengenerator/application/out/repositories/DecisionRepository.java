package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.Decision;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.decision.vo.DecisionId;

public interface DecisionRepository extends Repository<Decision, DecisionId> {
}
