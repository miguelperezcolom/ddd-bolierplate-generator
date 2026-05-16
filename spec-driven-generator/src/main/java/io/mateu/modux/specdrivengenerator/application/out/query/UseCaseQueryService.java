package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.UseCaseDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.UseCaseRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface UseCaseQueryService extends QueryService<UseCaseDto, UseCaseRow, String> {
}
