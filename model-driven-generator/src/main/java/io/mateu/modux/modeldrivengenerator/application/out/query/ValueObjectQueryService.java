package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ValueObjectDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ValueObjectRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface ValueObjectQueryService extends QueryService<ValueObjectDto, ValueObjectRow, String> {
}
