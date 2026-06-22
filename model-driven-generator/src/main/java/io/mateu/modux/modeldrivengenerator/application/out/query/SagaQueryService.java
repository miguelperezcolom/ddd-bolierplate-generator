package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.SagaDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.SagaRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface SagaQueryService extends QueryService<SagaDto, SagaRow, String> {
}
