package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ReadModelDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ReadModelRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface ReadModelQueryService extends QueryService<ReadModelDto, ReadModelRow, String> {
}
