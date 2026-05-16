package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ProjectDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ProjectRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface ProjectQueryService extends QueryService<ProjectDto, ProjectRow, String> {
}
