package io.mateu.modux.specdrivengenerator.application.out.repositories;

import io.mateu.modux.specdrivengenerator.application.out.shared.Repository;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.DomainEvent;
import io.mateu.modux.specdrivengenerator.domain.aggregates.domainevent.vo.DomainEventId;

public interface DomainEventRepository extends Repository<DomainEvent, DomainEventId> {
}
