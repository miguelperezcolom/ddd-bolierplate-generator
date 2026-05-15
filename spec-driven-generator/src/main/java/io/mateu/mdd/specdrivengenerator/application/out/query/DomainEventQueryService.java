package io.mateu.mdd.specdrivengenerator.application.out.query;

import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.DomainEventDto;
import io.mateu.mdd.specdrivengenerator.application.out.query.dtos.DomainEventRow;
import io.mateu.mdd.specdrivengenerator.application.out.shared.QueryService;

public interface DomainEventQueryService extends QueryService<DomainEventDto, DomainEventRow, String> {
}
