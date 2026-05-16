package io.mateu.modux.specdrivengenerator.application.out.query;

import io.mateu.modux.specdrivengenerator.application.out.query.dtos.DomainEventDto;
import io.mateu.modux.specdrivengenerator.application.out.query.dtos.DomainEventRow;
import io.mateu.modux.specdrivengenerator.application.out.shared.QueryService;

public interface DomainEventQueryService extends QueryService<DomainEventDto, DomainEventRow, String> {
}
