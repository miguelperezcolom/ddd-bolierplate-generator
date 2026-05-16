package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.saga.Saga;
import io.mateu.modux.specdrivengenerator.domain.aggregates.saga.vo.SagaId;

public interface SagaRepository extends Repository<Saga, SagaId> {
}
