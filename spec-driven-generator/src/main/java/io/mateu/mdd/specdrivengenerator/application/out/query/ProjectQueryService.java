package io.mateu.mdd.specdrivengenerator.application.out.query;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ProjectDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ProjectRow;
import io.mateu.mdd.specdrivengenerator.application.out.shared.QueryService;

public interface ProjectQueryService extends QueryService<ProjectDto, ProjectRow, String> {
}
