package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.UseCase;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.usecase.vo.UseCaseId;

public interface UseCaseRepository extends Repository<UseCase, UseCaseId> {
}
