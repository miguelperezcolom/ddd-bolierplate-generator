package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectionDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectionRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface ProjectionQueryService extends QueryService<ProjectionDto, ProjectionRow, String> {
}
