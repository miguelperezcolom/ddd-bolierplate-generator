package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ComponentDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ComponentRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface ComponentQueryService extends QueryService<ComponentDto, ComponentRow, String> {
}
