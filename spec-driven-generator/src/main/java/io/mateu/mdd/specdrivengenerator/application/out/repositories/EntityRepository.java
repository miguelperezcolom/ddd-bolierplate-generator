package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.entity.Entity;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.entity.vo.EntityId;

public interface EntityRepository extends Repository<Entity, EntityId> {
}
