package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.entity.Entity;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.entity.vo.EntityId;

public interface EntityRepository extends Repository<Entity, EntityId> {
}
