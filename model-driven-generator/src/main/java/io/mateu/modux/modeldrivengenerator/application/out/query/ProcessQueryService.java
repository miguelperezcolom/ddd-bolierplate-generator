package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProcessDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ProcessRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface ProcessQueryService extends QueryService<ProcessDto, ProcessRow, String> {
}
