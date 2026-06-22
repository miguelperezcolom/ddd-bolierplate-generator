package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.Saga;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.saga.vo.SagaId;

public interface SagaRepository extends Repository<Saga, SagaId> {
}
