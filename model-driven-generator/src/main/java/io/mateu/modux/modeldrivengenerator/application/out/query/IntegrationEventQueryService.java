package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.IntegrationEventDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.IntegrationEventRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface IntegrationEventQueryService extends QueryService<IntegrationEventDto, IntegrationEventRow, String> {
}
