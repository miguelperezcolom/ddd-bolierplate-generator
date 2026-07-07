package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.WorkflowDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.WorkflowRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface WorkflowQueryService extends QueryService<WorkflowDto, WorkflowRow, String> {
}
