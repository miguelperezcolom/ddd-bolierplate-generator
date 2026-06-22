package io.mateu.modux.modeldrivengenerator.application.out.repositories;

import io.mateu.modux.modeldrivengenerator.application.out.shared.Repository;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.domainevent.DomainEvent;
import io.mateu.modux.modeldrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;

public interface DomainEventRepository extends Repository<DomainEvent, DomainEventId> {
}
