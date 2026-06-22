package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ServiceDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.ServiceRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface ServiceQueryService extends QueryService<ServiceDto, ServiceRow, String> {
}
