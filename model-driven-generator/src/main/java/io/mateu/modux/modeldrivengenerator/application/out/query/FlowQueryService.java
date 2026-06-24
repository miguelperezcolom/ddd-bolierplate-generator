package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.FlowDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.FlowRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface FlowQueryService extends QueryService<FlowDto, FlowRow, String> {
}
