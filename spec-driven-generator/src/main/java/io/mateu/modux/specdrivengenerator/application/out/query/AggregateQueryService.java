package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.AggregateDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.AggregateRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface AggregateQueryService extends QueryService<AggregateDto, AggregateRow, String> {
}
