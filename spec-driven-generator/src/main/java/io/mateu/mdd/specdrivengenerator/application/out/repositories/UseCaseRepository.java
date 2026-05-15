package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.UseCase;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseId;

public interface UseCaseRepository extends Repository<UseCase, UseCaseId> {
}
