package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.saga.Saga;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.saga.vo.SagaId;

public interface SagaRepository extends Repository<Saga, SagaId> {
}
