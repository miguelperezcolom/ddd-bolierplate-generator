package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ModelDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ModelRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface ModelQueryService extends QueryService<ModelDto, ModelRow, String> {
}
