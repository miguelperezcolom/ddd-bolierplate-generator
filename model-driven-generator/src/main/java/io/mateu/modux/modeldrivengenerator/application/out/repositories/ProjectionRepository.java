package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.projection.Projection;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.projection.vo.ProjectionId;

public interface ProjectionRepository extends Repository<Projection, ProjectionId> {
}
