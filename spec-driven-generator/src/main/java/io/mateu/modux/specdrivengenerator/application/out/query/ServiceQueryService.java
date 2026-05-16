package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ServiceDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.ServiceRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface ServiceQueryService extends QueryService<ServiceDto, ServiceRow, String> {
}
