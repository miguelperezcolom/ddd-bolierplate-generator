package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.aggregate.Aggregate;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.aggregate.vo.AggregateId;

public interface AggregateRepository extends Repository<Aggregate, AggregateId> {
}
