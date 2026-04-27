package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.Project;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.project.vo.ProjectId;

public interface ProjectRepository extends Repository<Project, ProjectId> {
}
