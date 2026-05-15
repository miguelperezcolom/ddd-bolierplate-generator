package io.mateu.mdd.specdrivengenerator.application.out.query;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SagaDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.SagaRow;
import io.mateu.mdd.specdrivengenerator.application.out.shared.QueryService;

public interface SagaQueryService extends QueryService<SagaDto, SagaRow, String> {
}
