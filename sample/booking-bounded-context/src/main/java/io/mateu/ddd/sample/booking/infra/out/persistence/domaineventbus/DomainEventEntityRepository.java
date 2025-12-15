package io.mateu.ddd.sample.booking.infra.out.persistence.domaineventbus;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface DomainEventEntityRepository extends ReactiveCrudRepository<DomainEventEntity, String> {
}
