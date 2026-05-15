package io.mateu.mdd.specdrivengenerator.application.out.query;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.UseCaseDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.UseCaseRow;
import io.mateu.mdd.specdrivengenerator.application.out.shared.QueryService;

public interface UseCaseQueryService extends QueryService<UseCaseDto, UseCaseRow, String> {
}
