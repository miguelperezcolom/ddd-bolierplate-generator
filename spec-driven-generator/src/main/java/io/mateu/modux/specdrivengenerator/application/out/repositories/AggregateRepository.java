package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate.Aggregate;
import io.mateu.modux.specdrivengenerator.domain.aggregates.aggregate.vo.AggregateId;

public interface AggregateRepository extends Repository<Aggregate, AggregateId> {
}
