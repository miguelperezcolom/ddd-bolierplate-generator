package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.projection.Projection;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.projection.vo.ProjectionId;

public interface ProjectionRepository extends Repository<Projection, ProjectionId> {
}
