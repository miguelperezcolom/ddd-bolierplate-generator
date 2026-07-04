package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.DecisionDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.DecisionRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface DecisionQueryService extends QueryService<DecisionDto, DecisionRow, String> {
}
