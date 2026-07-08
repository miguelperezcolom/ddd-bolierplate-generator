package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.RepositoryDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.RepositoryRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface RepositoryQueryService extends QueryService<RepositoryDto, RepositoryRow, String> {
}
