package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.SagaDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.SagaRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface SagaQueryService extends QueryService<SagaDto, SagaRow, String> {
}
