package io.mateu.mdd.specdrivengenerator.application.out.query;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.AggregateDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.AggregateRow;
import io.mateu.mdd.specdrivengenerator.application.out.shared.QueryService;

public interface AggregateQueryService extends QueryService<AggregateDto, AggregateRow, String> {
}
