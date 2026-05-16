package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.Project;
import io.mateu.modux.specdrivengenerator.domain.aggregates.project.vo.ProjectId;

public interface ProjectRepository extends Repository<Project, ProjectId> {
}
