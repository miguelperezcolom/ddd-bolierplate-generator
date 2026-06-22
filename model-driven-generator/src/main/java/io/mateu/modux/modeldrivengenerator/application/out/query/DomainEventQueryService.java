package io.mateu.modux.modeldrivengenerator.application.out.query;

import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.DomainEventDto;
import io.mateu.modux.modeldrivengenerator.application.out.query.dtos.DomainEventRow;
import io.mateu.modux.modeldrivengenerator.application.out.shared.QueryService;

public interface DomainEventQueryService extends QueryService<DomainEventDto, DomainEventRow, String> {
}
