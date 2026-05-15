package io.mateu.mdd.specdrivengenerator.application.out.repositories;

import io.mateu.mdd.specdrivengenerator.application.out.shared.Repository;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.DomainEvent;
import io.mateu.mdd.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;

public interface DomainEventRepository extends Repository<DomainEvent, DomainEventId> {
}
