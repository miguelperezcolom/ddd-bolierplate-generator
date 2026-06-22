package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.EntityDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.EntityRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface EntityQueryService extends QueryService<EntityDto, EntityRow, String> {
}
