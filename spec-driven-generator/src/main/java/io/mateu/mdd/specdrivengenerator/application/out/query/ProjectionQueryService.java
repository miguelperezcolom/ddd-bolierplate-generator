package io.mateu.mdd.specdrivengenerator.application.out.query;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ProjectionDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ProjectionRow;
import io.mateu.mdd.specdrivengenerator.application.out.shared.QueryService;

public interface ProjectionQueryService extends QueryService<ProjectionDto, ProjectionRow, String> {
}
