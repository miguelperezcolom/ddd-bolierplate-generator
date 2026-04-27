package io.mateu.mdd.specdrivengenerator.application.out.query;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ValueObjectDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ValueObjectRow;
import io.mateu.mdd.specdrivengenerator.application.out.shared.QueryService;

public interface ValueObjectQueryService extends QueryService<ValueObjectDto, ValueObjectRow, String> {
}
