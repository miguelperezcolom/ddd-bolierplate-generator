package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.entity.Entity;
import io.mateu.modux.specdrivengenerator.domain.aggregates.entity.vo.EntityId;

public interface EntityRepository extends Repository<Entity, EntityId> {
}
