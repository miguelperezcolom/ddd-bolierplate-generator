package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.projection.Projection;
import io.mateu.modux.specdrivengenerator.domain.aggregates.projection.vo.ProjectionId;

public interface ProjectionRepository extends Repository<Projection, ProjectionId> {
}
