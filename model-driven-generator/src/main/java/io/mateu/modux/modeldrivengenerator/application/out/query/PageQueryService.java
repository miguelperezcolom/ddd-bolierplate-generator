package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.PageDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.PageRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface PageQueryService extends QueryService<PageDto, PageRow, String> {
}
