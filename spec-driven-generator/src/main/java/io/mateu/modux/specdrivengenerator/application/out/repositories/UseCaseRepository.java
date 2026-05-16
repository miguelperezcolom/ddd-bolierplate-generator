package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.usecase.UseCase;
import io.mateu.modux.specdrivengenerator.domain.aggregates.usecase.vo.UseCaseId;

public interface UseCaseRepository extends Repository<UseCase, UseCaseId> {
}
