package io.mateu.mdd.specdrivengenerator.application.out.query;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ServiceDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.ServiceRow;
import io.mateu.mdd.specdrivengenerator.application.out.shared.QueryService;

public interface ServiceQueryService extends QueryService<ServiceDto, ServiceRow, String> {
}
