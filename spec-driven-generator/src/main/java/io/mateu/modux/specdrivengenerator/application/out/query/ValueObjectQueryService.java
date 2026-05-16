package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ValueObjectDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ValueObjectRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface ValueObjectQueryService extends QueryService<ValueObjectDto, ValueObjectRow, String> {
}
