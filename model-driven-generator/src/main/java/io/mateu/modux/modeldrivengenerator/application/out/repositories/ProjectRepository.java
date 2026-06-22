package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.Project;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.project.vo.ProjectId;

public interface ProjectRepository extends Repository<Project, ProjectId> {
}
