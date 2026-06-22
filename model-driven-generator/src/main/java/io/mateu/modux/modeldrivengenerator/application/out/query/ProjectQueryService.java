package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProjectRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface ProjectQueryService extends QueryService<ProjectDto, ProjectRow, String> {
}
